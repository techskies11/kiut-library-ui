import { defineComponent as fe, shallowRef as Ai, h as He, ref as ne, onMounted as et, onUnmounted as at, watch as Te, toRaw as so, nextTick as We, version as or, isProxy as Ti, computed as C, toRef as $e, openBlock as g, createElementBlock as x, normalizeStyle as _e, createVNode as N, unref as T, createElementVNode as d, Fragment as he, renderList as pe, normalizeClass as q, toDisplayString as A, createCommentVNode as E, onBeforeUnmount as Bi, createStaticVNode as io, useSlots as bo, renderSlot as ke, Transition as ct, withCtx as I, Comment as sr, createBlock as te, resolveDynamicComponent as rt, createTextVNode as De, Teleport as Wt, withDirectives as Je, withModifiers as Be, vModelText as Pt, vShow as Kt, mergeProps as bt, createSlots as Sn, useAttrs as en, withKeys as $a, inject as Li } from "vue";
import * as Ko from "echarts/core";
import { TooltipComponent as ir, TitleComponent as lr } from "echarts/components";
import { SankeyChart as rr } from "echarts/charts";
import { CanvasRenderer as cr } from "echarts/renderers";
import Ne from "moment";
function tn(e) {
  return e + 0.5 | 0;
}
const Gt = (e, t, a) => Math.max(Math.min(e, a), t);
function Oa(e) {
  return Gt(tn(e * 2.55), 0, 255);
}
function ea(e) {
  return Gt(tn(e * 255), 0, 255);
}
function Nt(e) {
  return Gt(tn(e / 2.55) / 100, 0, 1);
}
function Uo(e) {
  return Gt(tn(e * 100), 0, 100);
}
const yt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, lo = [..."0123456789ABCDEF"], dr = (e) => lo[e & 15], ur = (e) => lo[(e & 240) >> 4] + lo[e & 15], sn = (e) => (e & 240) >> 4 === (e & 15), hr = (e) => sn(e.r) && sn(e.g) && sn(e.b) && sn(e.a);
function fr(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & yt[e[1]] * 17,
    g: 255 & yt[e[2]] * 17,
    b: 255 & yt[e[3]] * 17,
    a: t === 5 ? yt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: yt[e[1]] << 4 | yt[e[2]],
    g: yt[e[3]] << 4 | yt[e[4]],
    b: yt[e[5]] << 4 | yt[e[6]],
    a: t === 9 ? yt[e[7]] << 4 | yt[e[8]] : 255
  })), a;
}
const gr = (e, t) => e < 255 ? t(e) : "";
function mr(e) {
  var t = hr(e) ? dr : ur;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + gr(e.a, t) : void 0;
}
const pr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ri(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function vr(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function br(e, t, a) {
  const n = Ri(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function yr(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function yo(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), l = (s + i) / 2;
  let r, c, u;
  return s !== i && (u = s - i, c = l > 0.5 ? u / (2 - s - i) : u / (s + i), r = yr(a, n, o, u, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function xo(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(ea);
}
function ko(e, t, a) {
  return xo(Ri, e, t, a);
}
function xr(e, t, a) {
  return xo(br, e, t, a);
}
function kr(e, t, a) {
  return xo(vr, e, t, a);
}
function Pi(e) {
  return (e % 360 + 360) % 360;
}
function _r(e) {
  const t = pr.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Oa(+t[5]) : ea(+t[5]));
  const o = Pi(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = xr(o, s, i) : t[1] === "hsv" ? n = kr(o, s, i) : n = ko(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function wr(e, t) {
  var a = yo(e);
  a[0] = Pi(a[0] + t), a = ko(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function Cr(e) {
  if (!e)
    return;
  const t = yo(e), a = t[0], n = Uo(t[1]), o = Uo(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Nt(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const Yo = {
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
}, qo = {
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
function $r() {
  const e = {}, t = Object.keys(qo), a = Object.keys(Yo);
  let n, o, s, i, l;
  for (n = 0; n < t.length; n++) {
    for (i = l = t[n], o = 0; o < a.length; o++)
      s = a[o], l = l.replace(s, Yo[s]);
    s = parseInt(qo[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let ln;
function Sr(e) {
  ln || (ln = $r(), ln.transparent = [0, 0, 0, 0]);
  const t = ln[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Mr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Dr(e) {
  const t = Mr.exec(e);
  let a = 255, n, o, s;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? Oa(i) : Gt(i * 255, 0, 255);
    }
    return n = +t[1], o = +t[3], s = +t[5], n = 255 & (t[2] ? Oa(n) : Gt(n, 0, 255)), o = 255 & (t[4] ? Oa(o) : Gt(o, 0, 255)), s = 255 & (t[6] ? Oa(s) : Gt(s, 0, 255)), {
      r: n,
      g: o,
      b: s,
      a
    };
  }
}
function Ar(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Nt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const jn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, va = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Tr(e, t, a) {
  const n = va(Nt(e.r)), o = va(Nt(e.g)), s = va(Nt(e.b));
  return {
    r: ea(jn(n + a * (va(Nt(t.r)) - n))),
    g: ea(jn(o + a * (va(Nt(t.g)) - o))),
    b: ea(jn(s + a * (va(Nt(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function rn(e, t, a) {
  if (e) {
    let n = yo(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = ko(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function Ii(e, t) {
  return e && Object.assign(t || {}, e);
}
function Xo(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ea(e[3]))) : (t = Ii(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ea(t.a)), t;
}
function Br(e) {
  return e.charAt(0) === "r" ? Dr(e) : _r(e);
}
class Ka {
  constructor(t) {
    if (t instanceof Ka)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Xo(t) : a === "string" && (n = fr(t) || Sr(t) || Br(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ii(this._rgb);
    return t && (t.a = Nt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Xo(t);
  }
  rgbString() {
    return this._valid ? Ar(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? mr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Cr(this._rgb) : void 0;
  }
  mix(t, a) {
    if (t) {
      const n = this.rgb, o = t.rgb;
      let s;
      const i = a === s ? 0.5 : a, l = 2 * i - 1, r = n.a - o.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      s = 1 - c, n.r = 255 & c * n.r + s * o.r + 0.5, n.g = 255 & c * n.g + s * o.g + 0.5, n.b = 255 & c * n.b + s * o.b + 0.5, n.a = i * n.a + (1 - i) * o.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, a) {
    return t && (this._rgb = Tr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new Ka(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ea(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = tn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return rn(this._rgb, 2, t), this;
  }
  darken(t) {
    return rn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return rn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return rn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return wr(this._rgb, t), this;
  }
}
function Ft() {
}
const Lr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ie(e) {
  return e == null;
}
function Ze(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Le(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function wt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Bt(e, t) {
  return wt(e) ? e : t;
}
function Ae(e, t) {
  return typeof e > "u" ? t : e;
}
const Rr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Ei = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function je(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Ee(e, t, a, n) {
  let o, s, i;
  if (Ze(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(a, e[o], o);
  else if (Le(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(a, e[i[o]], i[o]);
}
function Mn(e, t) {
  let a, n, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, n = e.length; a < n; ++a)
    if (o = e[a], s = t[a], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function Dn(e) {
  if (Ze(e))
    return e.map(Dn);
  if (Le(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let o = 0;
    for (; o < n; ++o)
      t[a[o]] = Dn(e[a[o]]);
    return t;
  }
  return e;
}
function Fi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Pr(e, t, a, n) {
  if (!Fi(e))
    return;
  const o = t[e], s = a[e];
  Le(o) && Le(s) ? Ua(o, s, n) : t[e] = Dn(s);
}
function Ua(e, t, a) {
  const n = Ze(t) ? t : [
    t
  ], o = n.length;
  if (!Le(e))
    return e;
  a = a || {};
  const s = a.merger || Pr;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = n[l], !Le(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, u = r.length; c < u; ++c)
      s(r[c], e, i, a);
  }
  return e;
}
function za(e, t) {
  return Ua(e, t, {
    merger: Ir
  });
}
function Ir(e, t, a) {
  if (!Fi(e))
    return;
  const n = t[e], o = a[e];
  Le(n) && Le(o) ? za(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Dn(o));
}
const Go = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Er(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function Fr(e) {
  const t = Er(e);
  return (a) => {
    for (const n of t) {
      if (n === "")
        break;
      a = a && a[n];
    }
    return a;
  };
}
function fa(e, t) {
  return (Go[t] || (Go[t] = Fr(t)))(e);
}
function _o(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ya = (e) => typeof e < "u", ta = (e) => typeof e == "function", Zo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Or(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Oe = Math.PI, Ue = 2 * Oe, Vr = Ue + Oe, An = Number.POSITIVE_INFINITY, Nr = Oe / 180, Qe = Oe / 2, sa = Oe / 4, Qo = Oe * 2 / 3, Oi = Math.log10, It = Math.sign;
function ja(e, t, a) {
  return Math.abs(e - t) < a;
}
function Jo(e) {
  const t = Math.round(e);
  e = ja(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Oi(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function zr(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function jr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function qa(e) {
  return !jr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Hr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Wr(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function zt(e) {
  return e * (Oe / 180);
}
function Kr(e) {
  return e * (180 / Oe);
}
function es(e) {
  if (!wt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Vi(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Oe && (s += Ue), {
    angle: s,
    distance: o
  };
}
function ro(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Ur(e, t) {
  return (e - t + Vr) % Ue - Oe;
}
function St(e) {
  return (e % Ue + Ue) % Ue;
}
function Xa(e, t, a, n) {
  const o = St(e), s = St(t), i = St(a), l = St(s - o), r = St(i - o), c = St(o - s), u = St(o - i);
  return o === s || o === i || n && s === i || l > r && c < u;
}
function it(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Yr(e) {
  return it(e, -32768, 32767);
}
function Zt(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function wo(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ua = (e, t, a, n) => wo(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), qr = (e, t, a) => wo(e, a, (n) => e[n][t] >= a);
function Xr(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const Ni = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Gr(e, t) {
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
  }), Ni.forEach((a) => {
    const n = "_onData" + _o(a), o = e[a];
    Object.defineProperty(e, a, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[n] == "function" && l[n](...s);
        }), i;
      }
    });
  });
}
function ts(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && (Ni.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function zi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const ji = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Hi(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, ji.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function Zr(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const Co = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", nt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Qr = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Jr(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: f, max: h, minDefined: v, maxDefined: m } = i.getUserBounds();
    if (v) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ua(r, u, f).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ua(t, u, i.getPixelForValue(f)).lo
      ), c) {
        const b = r.slice(0, o + 1).reverse().findIndex((p) => !Ie(p[l.axis]));
        o -= Math.max(0, b);
      }
      o = it(o, 0, n - 1);
    }
    if (m) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(r, i.axis, h, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, u, i.getPixelForValue(h), !0).hi + 1
      );
      if (c) {
        const p = r.slice(b - 1).findIndex((y) => !Ie(y[l.axis]));
        b += Math.max(0, p);
      }
      s = it(b, o, n) - o;
    } else
      s = n - o;
  }
  return {
    start: o,
    count: s
  };
}
function ec(e) {
  const { xScale: t, yScale: a, _scaleRanges: n } = e, o = {
    xmin: t.min,
    xmax: t.max,
    ymin: a.min,
    ymax: a.max
  };
  if (!n)
    return e._scaleRanges = o, !0;
  const s = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== a.min || n.ymax !== a.max;
  return Object.assign(n, o), s;
}
const cn = (e) => e === 0 || e === 1, as = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ue / a)), ns = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ue / a) + 1, Ha = {
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
  easeInSine: (e) => -Math.cos(e * Qe) + 1,
  easeOutSine: (e) => Math.sin(e * Qe),
  easeInOutSine: (e) => -0.5 * (Math.cos(Oe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => cn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => cn(e) ? e : as(e, 0.075, 0.3),
  easeOutElastic: (e) => cn(e) ? e : ns(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return cn(e) ? e : e < 0.5 ? 0.5 * as(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * ns(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ha.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ha.easeInBounce(e * 2) * 0.5 : Ha.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function $o(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function os(e) {
  return $o(e) ? e : new Ka(e);
}
function Hn(e) {
  return $o(e) ? e : new Ka(e).saturate(0.5).darken(0.1).hexString();
}
const tc = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], ac = [
  "color",
  "borderColor",
  "backgroundColor"
];
function nc(e) {
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
      properties: ac
    },
    numbers: {
      type: "number",
      properties: tc
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
function oc(e) {
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
const ss = /* @__PURE__ */ new Map();
function sc(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = ss.get(a);
  return n || (n = new Intl.NumberFormat(e, t), ss.set(a, n)), n;
}
function So(e, t, a) {
  return sc(t, a).format(e);
}
const ic = {
  values(e) {
    return Ze(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let o, s = e;
    if (a.length > 1) {
      const c = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = lc(e, a);
    }
    const i = Oi(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), So(e, n, r);
  }
};
function lc(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Wi = {
  formatters: ic
};
function rc(e) {
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
      callback: Wi.formatters.values,
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
const ga = /* @__PURE__ */ Object.create(null), co = /* @__PURE__ */ Object.create(null);
function Wa(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let n = 0, o = a.length; n < o; ++n) {
    const s = a[n];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Wn(e, t, a) {
  return typeof t == "string" ? Ua(Wa(e, t), a) : Ua(Wa(e, ""), t);
}
class cc {
  constructor(t, a) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (n) => n.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => Hn(o.backgroundColor), this.hoverBorderColor = (n, o) => Hn(o.borderColor), this.hoverColor = (n, o) => Hn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return Wn(this, t, a);
  }
  get(t) {
    return Wa(this, t);
  }
  describe(t, a) {
    return Wn(co, t, a);
  }
  override(t, a) {
    return Wn(ga, t, a);
  }
  route(t, a, n, o) {
    const s = Wa(this, t), i = Wa(this, n), l = "_" + a;
    Object.defineProperties(s, {
      [l]: {
        value: s[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return Le(r) ? Object.assign({}, c, r) : Ae(r, c);
        },
        set(r) {
          this[l] = r;
        }
      }
    });
  }
  apply(t) {
    t.forEach((a) => a(this));
  }
}
var qe = /* @__PURE__ */ new cc({
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
  nc,
  oc,
  rc
]);
function dc(e) {
  return !e || Ie(e.size) || Ie(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function is(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ia(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function ls(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function uo(e, t, a, n) {
  Ki(e, t, a, n, null);
}
function Ki(e, t, a, n, o) {
  let s, i, l, r, c, u, f, h;
  const v = t.pointStyle, m = t.rotation, b = t.radius;
  let p = (m || 0) * Nr;
  if (v && typeof v == "object" && (s = v.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(p), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, b, 0, 0, Ue) : e.arc(a, n, b, 0, Ue), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : b, e.moveTo(a + Math.sin(p) * u, n - Math.cos(p) * b), p += Qo, e.lineTo(a + Math.sin(p) * u, n - Math.cos(p) * b), p += Qo, e.lineTo(a + Math.sin(p) * u, n - Math.cos(p) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, r = b - c, i = Math.cos(p + sa) * r, f = Math.cos(p + sa) * (o ? o / 2 - c : r), l = Math.sin(p + sa) * r, h = Math.sin(p + sa) * (o ? o / 2 - c : r), e.arc(a - f, n - l, c, p - Oe, p - Qe), e.arc(a + h, n - i, c, p - Qe, p), e.arc(a + f, n + l, c, p, p + Qe), e.arc(a - h, n + i, c, p + Qe, p + Oe), e.closePath();
        break;
      case "rect":
        if (!m) {
          r = Math.SQRT1_2 * b, u = o ? o / 2 : r, e.rect(a - u, n - r, 2 * u, 2 * r);
          break;
        }
        p += sa;
      /* falls through */
      case "rectRot":
        f = Math.cos(p) * (o ? o / 2 : b), i = Math.cos(p) * b, l = Math.sin(p) * b, h = Math.sin(p) * (o ? o / 2 : b), e.moveTo(a - f, n - l), e.lineTo(a + h, n - i), e.lineTo(a + f, n + l), e.lineTo(a - h, n + i), e.closePath();
        break;
      case "crossRot":
        p += sa;
      /* falls through */
      case "cross":
        f = Math.cos(p) * (o ? o / 2 : b), i = Math.cos(p) * b, l = Math.sin(p) * b, h = Math.sin(p) * (o ? o / 2 : b), e.moveTo(a - f, n - l), e.lineTo(a + f, n + l), e.moveTo(a + h, n - i), e.lineTo(a - h, n + i);
        break;
      case "star":
        f = Math.cos(p) * (o ? o / 2 : b), i = Math.cos(p) * b, l = Math.sin(p) * b, h = Math.sin(p) * (o ? o / 2 : b), e.moveTo(a - f, n - l), e.lineTo(a + f, n + l), e.moveTo(a + h, n - i), e.lineTo(a - h, n + i), p += sa, f = Math.cos(p) * (o ? o / 2 : b), i = Math.cos(p) * b, l = Math.sin(p) * b, h = Math.sin(p) * (o ? o / 2 : b), e.moveTo(a - f, n - l), e.lineTo(a + f, n + l), e.moveTo(a + h, n - i), e.lineTo(a - h, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(p) * b, l = Math.sin(p) * b, e.moveTo(a - i, n - l), e.lineTo(a + i, n + l);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(p) * (o ? o / 2 : b), n + Math.sin(p) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Ga(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function Mo(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Do(e) {
  e.restore();
}
function uc(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function hc(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function fc(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ie(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function gc(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, u = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function mc(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Za(e, t, a, n, o, s = {}) {
  const i = Ze(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, fc(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && mc(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Ie(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), gc(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function Tn(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Oe, Oe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Oe, Qe, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Qe, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Qe, !0), e.lineTo(a + i.topLeft, n);
}
const pc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, vc = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function bc(e, t) {
  const a = ("" + e).match(pc);
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
const yc = (e) => +e || 0;
function Ao(e, t) {
  const a = {}, n = Le(t), o = n ? Object.keys(t) : t, s = Le(e) ? n ? (i) => Ae(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = yc(s(i));
  return a;
}
function Ui(e) {
  return Ao(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function wa(e) {
  return Ao(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Ct(e) {
  const t = Ui(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function lt(e, t) {
  e = e || {}, t = t || qe.font;
  let a = Ae(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = Ae(e.style, t.style);
  n && !("" + n).match(vc) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: Ae(e.family, t.family),
    lineHeight: bc(Ae(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: Ae(e.weight, t.weight),
    string: ""
  };
  return o.string = dc(o), o;
}
function dn(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function xc(e, t, a) {
  const { min: n, max: o } = e, s = Ei(t, (o - n) / 2), i = (l, r) => a && l === 0 ? 0 : l + r;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ma(e, t) {
  return Object.assign(Object.create(e), t);
}
function To(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Gi("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (l) => To([
      l,
      ...e
    ], t, s, n)
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
      return qi(l, r, () => Dc(r, t, e, l));
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
      return cs(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return cs(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const u = l._storage || (l._storage = o());
      return l[r] = u[r] = c, delete l._keys, !0;
    }
  });
}
function Sa(e, t, a, n) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Yi(e, n),
    setContext: (s) => Sa(e, s, a, n),
    override: (s) => Sa(e.override(s), t, a, n)
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
      return qi(s, i, () => _c(s, i, l));
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
function Yi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: n = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: a,
    indexable: n,
    isScriptable: ta(a) ? a : () => a,
    isIndexable: ta(n) ? n : () => n
  };
}
const kc = (e, t) => e ? e + _o(t) : t, Bo = (e, t) => Le(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function qi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function _c(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = n[t];
  return ta(l) && i.isScriptable(t) && (l = wc(t, l, e, a)), Ze(l) && l.length && (l = Cc(t, l, e, i.isIndexable)), Bo(t, l) && (l = Sa(l, o, s && s[t], i)), l;
}
function wc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = a;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || n);
  return l.delete(e), Bo(e, r) && (r = Lo(o._scopes, o, e, r)), r;
}
function Cc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Le(t[0])) {
    const r = t, c = o._scopes.filter((u) => u !== r);
    t = [];
    for (const u of r) {
      const f = Lo(c, o, e, u);
      t.push(Sa(f, s, i && i[e], l));
    }
  }
  return t;
}
function Xi(e, t, a) {
  return ta(e) ? e(t, a) : e;
}
const $c = (e, t) => e === !0 ? t : typeof e == "string" ? fa(t, e) : void 0;
function Sc(e, t, a, n, o) {
  for (const s of t) {
    const i = $c(a, s);
    if (i) {
      e.add(i);
      const l = Xi(i._fallback, a, o);
      if (typeof l < "u" && l !== a && l !== n)
        return l;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function Lo(e, t, a, n) {
  const o = t._rootScopes, s = Xi(t._fallback, a, n), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(n);
  let r = rs(l, i, a, s || a, n);
  return r === null || typeof s < "u" && s !== a && (r = rs(l, i, s, r, n), r === null) ? !1 : To(Array.from(l), [
    ""
  ], o, s, () => Mc(t, a, n));
}
function rs(e, t, a, n, o) {
  for (; a; )
    a = Sc(e, t, a, n, o);
  return a;
}
function Mc(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return Ze(o) && Le(a) ? a : o || {};
}
function Dc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Gi(kc(s, e), a), typeof o < "u")
      return Bo(e, o) ? Lo(a, n, e, o) : o;
}
function Gi(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function cs(e) {
  let t = e._keys;
  return t || (t = e._keys = Ac(e._scopes)), t;
}
function Ac(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const Tc = Number.EPSILON || 1e-14, Ma = (e, t) => t < e.length && !e[t].skip && e[t], Zi = (e) => e === "x" ? "y" : "x";
function Bc(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, l = ro(s, o), r = ro(i, s);
  let c = l / (l + r), u = r / (l + r);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const f = n * c, h = n * u;
  return {
    previous: {
      x: s.x - f * (i.x - o.x),
      y: s.y - f * (i.y - o.y)
    },
    next: {
      x: s.x + h * (i.x - o.x),
      y: s.y + h * (i.y - o.y)
    }
  };
}
function Lc(e, t, a) {
  const n = e.length;
  let o, s, i, l, r, c = Ma(e, 0);
  for (let u = 0; u < n - 1; ++u)
    if (r = c, c = Ma(e, u + 1), !(!r || !c)) {
      if (ja(t[u], 0, Tc)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      o = a[u] / t[u], s = a[u + 1] / t[u], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), a[u] = o * i * t[u], a[u + 1] = s * i * t[u]);
    }
}
function Rc(e, t, a = "x") {
  const n = Zi(a), o = e.length;
  let s, i, l, r = Ma(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = Ma(e, c + 1), !l)
      continue;
    const u = l[a], f = l[n];
    i && (s = (u - i[a]) / 3, l[`cp1${a}`] = u - s, l[`cp1${n}`] = f - s * t[c]), r && (s = (r[a] - u) / 3, l[`cp2${a}`] = u + s, l[`cp2${n}`] = f + s * t[c]);
  }
}
function Pc(e, t = "x") {
  const a = Zi(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, l, r, c = Ma(e, 0);
  for (i = 0; i < n; ++i)
    if (l = r, r = c, c = Ma(e, i + 1), !!r) {
      if (c) {
        const u = c[t] - r[t];
        o[i] = u !== 0 ? (c[a] - r[a]) / u : 0;
      }
      s[i] = l ? c ? It(o[i - 1]) !== It(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  Lc(e, o, s), Rc(e, s, t);
}
function un(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function Ic(e, t) {
  let a, n, o, s, i, l = Ga(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = l, l = a < n - 1 && Ga(e[a + 1], t), s && (o = e[a], i && (o.cp1x = un(o.cp1x, t.left, t.right), o.cp1y = un(o.cp1y, t.top, t.bottom)), l && (o.cp2x = un(o.cp2x, t.left, t.right), o.cp2y = un(o.cp2y, t.top, t.bottom)));
}
function Ec(e, t, a, n, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Pc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = Bc(c, l, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Ic(e, a);
}
function Ro() {
  return typeof window < "u" && typeof document < "u";
}
function Po(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Bn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const En = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Fc(e, t) {
  return En(e).getPropertyValue(t);
}
const Oc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ha(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = Oc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Vc = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Nc(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, l, r;
  if (Vc(o, s, e.target))
    l = o, r = s;
  else {
    const c = t.getBoundingClientRect();
    l = n.clientX - c.left, r = n.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: r,
    box: i
  };
}
function ca(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: n } = t, o = En(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), l = ha(o, "border", "width"), { x: r, y: c, box: u } = Nc(e, a), f = i.left + (u && l.left), h = i.top + (u && l.top);
  let { width: v, height: m } = t;
  return s && (v -= i.width + l.width, m -= i.height + l.height), {
    x: Math.round((r - f) / v * a.width / n),
    y: Math.round((c - h) / m * a.height / n)
  };
}
function zc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && Po(e);
    if (!s)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = En(s), r = ha(l, "border", "width"), c = ha(l, "padding");
      t = i.width - c.width - r.width, a = i.height - c.height - r.height, n = Bn(l.maxWidth, s, "clientWidth"), o = Bn(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: n || An,
    maxHeight: o || An
  };
}
const Qt = (e) => Math.round(e * 10) / 10;
function jc(e, t, a, n) {
  const o = En(e), s = ha(o, "margin"), i = Bn(o.maxWidth, e, "clientWidth") || An, l = Bn(o.maxHeight, e, "clientHeight") || An, r = zc(e, t, a);
  let { width: c, height: u } = r;
  if (o.boxSizing === "content-box") {
    const h = ha(o, "border", "width"), v = ha(o, "padding");
    c -= v.width + h.width, u -= v.height + h.height;
  }
  return c = Math.max(0, c - s.width), u = Math.max(0, n ? c / n : u - s.height), c = Qt(Math.min(c, i, r.maxWidth)), u = Qt(Math.min(u, l, r.maxHeight)), c && !u && (u = Qt(c / 2)), (t !== void 0 || a !== void 0) && n && r.height && u > r.height && (u = r.height, c = Qt(Math.floor(u * n))), {
    width: c,
    height: u
  };
}
function ds(e, t, a) {
  const n = t || 1, o = Qt(e.height * n), s = Qt(e.width * n);
  e.height = Qt(e.height), e.width = Qt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Hc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Ro() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function us(e, t) {
  const a = Fc(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function da(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Wc(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Kc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = da(e, o, a), l = da(o, s, a), r = da(s, t, a), c = da(i, l, a), u = da(l, r, a);
  return da(c, u, a);
}
const Uc = function(e, t) {
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
    xPlus(a, n) {
      return a - n;
    },
    leftForLtr(a, n) {
      return a - n;
    }
  };
}, Yc = function() {
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
function Ca(e, t, a) {
  return e ? Uc(t, a) : Yc();
}
function Qi(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Ji(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function el(e) {
  return e === "angle" ? {
    between: Xa,
    compare: Ur,
    normalize: St
  } : {
    between: Zt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function hs({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function qc(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: l } = el(n), r = t.length;
  let { start: c, end: u, loop: f } = e, h, v;
  if (f) {
    for (c += r, u += r, h = 0, v = r; h < v && i(l(t[c % r][n]), o, s); ++h)
      c--, u--;
    c %= r, u %= r;
  }
  return u < c && (u += r), {
    start: c,
    end: u,
    loop: f,
    style: e.style
  };
}
function Xc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: l, between: r, normalize: c } = el(n), { start: u, end: f, loop: h, style: v } = qc(e, t, a), m = [];
  let b = !1, p = null, y, k, _;
  const w = () => r(o, _, y) && l(o, _) !== 0, $ = () => l(s, y) === 0 || r(s, _, y), D = () => b || w(), M = () => !b || $();
  for (let F = u, z = u; F <= f; ++F)
    k = t[F % i], !k.skip && (y = c(k[n]), y !== _ && (b = r(y, o, s), p === null && D() && (p = l(y, o) === 0 ? F : z), p !== null && M() && (m.push(hs({
      start: p,
      end: F,
      loop: h,
      count: i,
      style: v
    })), p = null), z = F, _ = y));
  return p !== null && m.push(hs({
    start: p,
    end: f,
    loop: h,
    count: i,
    style: v
  })), m;
}
function Gc(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = Xc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function Zc(e, t, a, n) {
  let o = 0, s = t - 1;
  if (a && !n)
    for (; o < t && !e[o].skip; )
      o++;
  for (; o < t && e[o].skip; )
    o++;
  for (o %= t, a && (s += o); s > o && e[s % t].skip; )
    s--;
  return s %= t, {
    start: o,
    end: s
  };
}
function Qc(e, t, a, n) {
  const o = e.length, s = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= a; ++r) {
    const c = e[r % o];
    c.skip || c.stop ? l.skip || (n = !1, s.push({
      start: t % o,
      end: (r - 1) % o,
      loop: n
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: n
  }), s;
}
function Jc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = Zc(a, o, s, n);
  if (n === !0)
    return fs(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], a, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return fs(e, Qc(a, i, r, c), a, t);
}
function fs(e, t, a, n) {
  return !n || !n.setContext || !a ? t : ed(e, t, a, n);
}
function ed(e, t, a, n) {
  const o = e._chart.getContext(), s = gs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = a.length, c = [];
  let u = s, f = t[0].start, h = f;
  function v(m, b, p, y) {
    const k = l ? -1 : 1;
    if (m !== b) {
      for (m += r; a[m % r].skip; )
        m -= k;
      for (; a[b % r].skip; )
        b += k;
      m % r !== b % r && (c.push({
        start: m % r,
        end: b % r,
        loop: p,
        style: y
      }), u = y, f = b % r);
    }
  }
  for (const m of t) {
    f = l ? f : m.start;
    let b = a[f % r], p;
    for (h = f + 1; h <= m.end; h++) {
      const y = a[h % r];
      p = gs(n.setContext(ma(o, {
        type: "segment",
        p0: b,
        p1: y,
        p0DataIndex: (h - 1) % r,
        p1DataIndex: h % r,
        datasetIndex: i
      }))), td(p, u) && v(f, h - 1, m.loop, u), b = y, u = p;
    }
    f < h - 1 && v(f, h - 1, m.loop, u);
  }
  return c;
}
function gs(e) {
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
function td(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return $o(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function hn(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function ad(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: hn(a, t, "left"),
    right: hn(a, t, "right"),
    top: hn(n, t, "top"),
    bottom: hn(n, t, "bottom")
  } : t;
}
function nd(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = ad(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class od {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, a, n, o) {
    const s = a.listeners[o], i = a.duration;
    s.forEach((l) => l({
      chart: t,
      initial: a.initial,
      numSteps: i,
      currentStep: Math.min(n - a.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = ji.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let a = 0;
    this._charts.forEach((n, o) => {
      if (!n.running || !n.items.length)
        return;
      const s = n.items;
      let i = s.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = s[i], r._active ? (r._total > n.duration && (n.duration = r._total), r.tick(t), l = !0) : (s[i] = s[s.length - 1], s.pop());
      l && (o.draw(), this._notify(o, n, t, "progress")), s.length || (n.running = !1, this._notify(o, n, t, "complete"), n.initial = !1), a += s.length;
    }), this._lastDate = t, a === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const a = this._charts;
    let n = a.get(t);
    return n || (n = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, a.set(t, n)), n;
  }
  listen(t, a, n) {
    this._getAnims(t).listeners[a].push(n);
  }
  add(t, a) {
    !a || !a.length || this._getAnims(t).items.push(...a);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const a = this._charts.get(t);
    a && (a.running = !0, a.start = Date.now(), a.duration = a.items.reduce((n, o) => Math.max(n, o._duration), 0), this._refresh());
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
    const n = a.items;
    let o = n.length - 1;
    for (; o >= 0; --o)
      n[o].cancel();
    a.items = [], this._notify(t, a, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Ot = /* @__PURE__ */ new od();
const ms = "transparent", sd = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = os(e || ms), o = n.valid && os(t || ms);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class id {
  constructor(t, a, n, o) {
    const s = a[n];
    o = dn([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = dn([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || sd[t.type || typeof i], this._easing = Ha[t.easing] || Ha.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, n) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = n - this._start, i = this._duration - s;
      this._start = n, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = dn([
        t.to,
        a,
        o,
        t.from
      ]), this._from = dn([
        t.from,
        o,
        a
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const a = t - this._start, n = this._duration, o = this._prop, s = this._from, i = this._loop, l = this._to;
    let r;
    if (this._active = s !== l && (i || a < n), !this._active) {
      this._target[o] = l, this._notify(!0);
      return;
    }
    if (a < 0) {
      this._target[o] = s;
      return;
    }
    r = a / n % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[o] = this._fn(s, l, r);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((a, n) => {
      t.push({
        res: a,
        rej: n
      });
    });
  }
  _notify(t) {
    const a = t ? "res" : "rej", n = this._promises || [];
    for (let o = 0; o < n.length; o++)
      n[o][a]();
  }
}
class tl {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!Le(t))
      return;
    const a = Object.keys(qe.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Le(s))
        return;
      const i = {};
      for (const l of a)
        i[l] = s[l];
      (Ze(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !n.has(l)) && n.set(l, i);
      });
    });
  }
  _animateOptions(t, a) {
    const n = a.options, o = rd(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && ld(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), s;
  }
  _createAnimations(t, a) {
    const n = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(a), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, a));
        continue;
      }
      const u = a[c];
      let f = s[c];
      const h = n.get(c);
      if (f)
        if (h && f.active()) {
          f.update(h, u, l);
          continue;
        } else
          f.cancel();
      if (!h || !h.duration) {
        t[c] = u;
        continue;
      }
      s[c] = f = new id(h, t, c, u), o.push(f);
    }
    return o;
  }
  update(t, a) {
    if (this._properties.size === 0) {
      Object.assign(t, a);
      return;
    }
    const n = this._createAnimations(t, a);
    if (n.length)
      return Ot.add(this._chart, n), !0;
  }
}
function ld(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function rd(e, t) {
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
function ps(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function cd(e, t, a) {
  if (a === !1)
    return !1;
  const n = ps(e, a), o = ps(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function dd(e) {
  let t, a, n, o;
  return Le(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function al(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function vs(e, t, a, n = {}) {
  const o = e.keys, s = n.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, l = o.length; i < l; ++i) {
    if (r = +o[i], r === a) {
      if (u = !0, n.all)
        continue;
      break;
    }
    c = e.values[r], wt(c) && (s || t === 0 || It(t) === It(c)) && (t += c);
  }
  return !u && !n.all ? 0 : t;
}
function ud(e, t) {
  const { iScale: a, vScale: n } = t, o = a.axis === "x" ? "x" : "y", s = n.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, u;
  for (r = 0, c = i.length; r < c; ++r)
    u = i[r], l[r] = {
      [o]: u,
      [s]: e[u]
    };
  return l;
}
function Kn(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function hd(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function fd(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function gd(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function bs(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function ys(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: l } = n, r = s.axis, c = i.axis, u = hd(s, i, n), f = t.length;
  let h;
  for (let v = 0; v < f; ++v) {
    const m = t[v], { [r]: b, [c]: p } = m, y = m._stacks || (m._stacks = {});
    h = y[c] = gd(o, u, b), h[l] = p, h._top = bs(h, i, !0, n.type), h._bottom = bs(h, i, !1, n.type);
    const k = h._visualValues || (h._visualValues = {});
    k[l] = p;
  }
}
function Un(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function md(e, t) {
  return ma(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function pd(e, t, a) {
  return ma(e, {
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
function Ta(e, t) {
  const a = e.controller.index, n = e.vScale && e.vScale.axis;
  if (n) {
    t = t || e._parsed;
    for (const o of t) {
      const s = o._stacks;
      if (!s || s[n] === void 0 || s[n][a] === void 0)
        return;
      delete s[n][a], s[n]._visualValues !== void 0 && s[n]._visualValues[a] !== void 0 && delete s[n]._visualValues[a];
    }
  }
}
const Yn = (e) => e === "reset" || e === "none", xs = (e, t) => t ? e : Object.assign({}, e), vd = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: al(a, !0),
  values: null
};
class Fn {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Kn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ta(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (f, h, v, m) => f === "x" ? h : f === "r" ? m : v, s = a.xAxisID = Ae(n.xAxisID, Un(t, "x")), i = a.yAxisID = Ae(n.yAxisID, Un(t, "y")), l = a.rAxisID = Ae(n.rAxisID, Un(t, "r")), r = a.indexAxis, c = a.iAxisID = o(r, s, i, l), u = a.vAxisID = o(r, i, s, l);
    a.xScale = this.getScaleForId(s), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(l), a.iScale = this.getScaleForId(c), a.vScale = this.getScaleForId(u);
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
    this._data && ts(this._data, this), t._stacked && Ta(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Le(a)) {
      const o = this._cachedMeta;
      this._data = ud(a, o);
    } else if (n !== a) {
      if (n) {
        ts(n, this);
        const o = this._cachedMeta;
        Ta(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && Gr(a, this), this._syncList = [], this._data = a;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const a = this._cachedMeta, n = this.getDataset();
    let o = !1;
    this._dataCheck();
    const s = a._stacked;
    a._stacked = Kn(a.vScale, a), a.stack !== n.stack && (o = !0, Ta(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (ys(this, a._parsed), a._stacked = Kn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, l = s.axis;
    let r = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], u, f, h;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, h = o;
    else {
      Ze(o[t]) ? h = this.parseArrayData(n, o, t, a) : Le(o[t]) ? h = this.parseObjectData(n, o, t, a) : h = this.parsePrimitiveData(n, o, t, a);
      const v = () => f[l] === null || c && f[l] < c[l];
      for (u = 0; u < a; ++u)
        n._parsed[u + t] = f = h[u], r && (v() && (r = !1), c = f);
      n._sorted = r;
    }
    i && ys(this, h);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), u = s === i, f = new Array(o);
    let h, v, m;
    for (h = 0, v = o; h < v; ++h)
      m = h + n, f[h] = {
        [l]: u || s.parse(c[m], m),
        [r]: i.parse(a[m], m)
      };
    return f;
  }
  parseArrayData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, l = new Array(o);
    let r, c, u, f;
    for (r = 0, c = o; r < c; ++r)
      u = r + n, f = a[u], l[r] = {
        x: s.parse(f[0], u),
        y: i.parse(f[1], u)
      };
    return l;
  }
  parseObjectData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(o);
    let u, f, h, v;
    for (u = 0, f = o; u < f; ++u)
      h = u + n, v = a[h], c[u] = {
        x: s.parse(fa(v, l), h),
        y: i.parse(fa(v, r), h)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, a, n) {
    const o = this.chart, s = this._cachedMeta, i = a[t.axis], l = {
      keys: al(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return vs(l, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const l = o && n._stacks[a.axis];
    o && l && (o.values = l, i = vs(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, l = this._getOtherScale(t), r = vd(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: f } = fd(l);
    let h, v;
    function m() {
      v = o[h];
      const b = v[l.axis];
      return !wt(v[t.axis]) || u > b || f < b;
    }
    for (h = 0; h < i && !(!m() && (this.updateRangeFromParsed(c, t, v, r), s)); ++h)
      ;
    if (s) {
      for (h = i - 1; h >= 0; --h)
        if (!m()) {
          this.updateRangeFromParsed(c, t, v, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, n = [];
    let o, s, i;
    for (o = 0, s = a.length; o < s; ++o)
      i = a[o][t.axis], wt(i) && n.push(i);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = a.iScale, o = a.vScale, s = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(s[n.axis]) : "",
      value: o ? "" + o.getLabelForValue(s[o.axis]) : ""
    };
  }
  _update(t) {
    const a = this._cachedMeta;
    this.update(t || "default"), a._clip = dd(Ae(this.options.clip, cd(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, n = this._cachedMeta, o = n.data || [], s = a.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let u;
    for (n.dataset && n.dataset.draw(t, s, l, r), u = l; u < l + r; ++u) {
      const f = o[u];
      f.hidden || (f.active && c ? i.push(f) : f.draw(t, s));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, s);
  }
  getStyle(t, a) {
    const n = a ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, a, n) {
    const o = this.getDataset();
    let s;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      s = i.$context || (i.$context = pd(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = md(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!a, s.mode = n, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", n) {
    const o = a === "active", s = this._cachedDataOpts, i = t + "-" + a, l = s[i], r = this.enableOptionSharing && Ya(n);
    if (l)
      return xs(l, r);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), f = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], h = c.getOptionScopes(this.getDataset(), u), v = Object.keys(qe.elements[t]), m = () => this.getContext(n, o, a), b = c.resolveNamedOptions(h, v, m, f);
    return b.$shared && (b.$shared = r, s[i] = Object.freeze(xs(b, r))), b;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const u = this.chart.config, f = u.datasetAnimationScopeKeys(this._type, a), h = u.getOptionScopes(this.getDataset(), f);
      r = u.createResolver(h, this.getContext(t, n, a));
    }
    const c = new tl(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || Yn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    Yn(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !Yn(a) && this._resolveAnimations(void 0, a).update(t, n);
  }
  _setStyle(t, a, n, o) {
    t.active = o;
    const s = this.getStyle(a, o);
    this._resolveAnimations(a, n, o).update(t, {
      options: !o && this.getSharedOptions(s) || s
    });
  }
  removeHoverStyle(t, a, n) {
    this._setStyle(t, n, "active", !1);
  }
  setHoverStyle(t, a, n) {
    this._setStyle(t, n, "active", !0);
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
    const a = this._data, n = this._cachedMeta.data;
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const o = n.length, s = a.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, a, n = !0) {
    const o = this._cachedMeta, s = o.data, i = t + a;
    let l;
    const r = (c) => {
      for (c.length += a, l = c.length - 1; l >= i; l--)
        c[l] = c[l - a];
    };
    for (r(s), l = t; l < i; ++l)
      s[l] = new this.dataElementType();
    this._parsing && r(o._parsed), this.parse(t, a), n && this.updateElements(s, t, a, "reset");
  }
  updateElements(t, a, n, o) {
  }
  _removeElements(t, a) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const o = n._parsed.splice(t, a);
      n._stacked && Ta(n, o);
    }
    n.data.splice(t, a);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [a, n, o] = t;
      this[a](n, o);
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
    const n = arguments.length - 2;
    n && this._sync([
      "_insertElements",
      t,
      n
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
function bd(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = zi(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function yd(e) {
  const t = e.iScale, a = bd(t, e.type);
  let n = t._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (Ya(l) && (n = Math.min(n, Math.abs(i - l) || n)), l = i);
  };
  for (o = 0, s = a.length; o < s; ++o)
    i = t.getPixelForValue(a[o]), r();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), r();
  return n;
}
function xd(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Ie(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function kd(e, t, a, n) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, l = e < o.length - 1 ? o[e + 1] : null;
  const r = a.categoryPercentage;
  i === null && (i = s - (l === null ? t.end - t.start : l - s)), l === null && (l = s + s - i);
  const c = s - (s - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / n,
    ratio: a.barPercentage,
    start: c
  };
}
function _d(e, t, a, n) {
  const o = a.parse(e[0], n), s = a.parse(e[1], n), i = Math.min(o, s), l = Math.max(o, s);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[a.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function nl(e, t, a, n) {
  return Ze(e) ? _d(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function ks(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, u, f, h;
  for (c = a, u = a + n; c < u; ++c)
    h = t[c], f = {}, f[o.axis] = l || o.parse(i[c], c), r.push(nl(h, f, s, c));
  return r;
}
function qn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function wd(e, t, a) {
  return e !== 0 ? It(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function Cd(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function $d(e, t, a, n) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: u } = Cd(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = u : (s[_s(u, i, l, r)] = !0, o = c)), s[_s(o, i, l, r)] = !0, e.borderSkipped = s;
}
function _s(e, t, a, n) {
  return n ? (e = Sd(e, t, a), e = ws(e, a, t)) : e = ws(e, t, a), e;
}
function Sd(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function ws(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function Md(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class Dd extends Fn {
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
  parsePrimitiveData(t, a, n, o) {
    return ks(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return ks(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, u = i.axis === "x" ? l : r, f = [];
    let h, v, m, b;
    for (h = n, v = n + o; h < v; ++h)
      b = a[h], m = {}, m[s.axis] = s.parse(fa(b, c), h), f.push(nl(fa(b, u), m, i, h));
    return f;
  }
  updateRangeFromParsed(t, a, n, o) {
    super.updateRangeFromParsed(t, a, n, o);
    const s = n._custom;
    s && a === this._cachedMeta.vScale && (t.min = Math.min(t.min, s.min), t.max = Math.max(t.max, s.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, l = qn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + n.getLabelForValue(s[n.axis]),
      value: l
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
  updateElements(t, a, n, o) {
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), u = this._getRuler(), { sharedOptions: f, includeOptions: h } = this._getSharedOptions(a, o);
    for (let v = a; v < a + n; v++) {
      const m = this.getParsed(v), b = s || Ie(m[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), p = this._calculateBarIndexPixels(v, u), y = (m._stacks || {})[l.axis], k = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !y || qn(m._custom) || i === y._top || i === y._bottom,
        x: c ? b.head : p.center,
        y: c ? p.center : b.head,
        height: c ? p.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : p.size
      };
      h && (k.options = f || this.resolveDataElementOptions(v, t[v].active ? "active" : o));
      const _ = k.options || t[v].options;
      $d(k, _, y, i), Md(k, _, u.ratio), this.updateElement(t[v], v, k, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), s = n.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(a), r = l && l[n.axis], c = (u) => {
      const f = u._parsed.find((v) => v[n.axis] === r), h = f && f[u.vScale.axis];
      if (Ie(h) || isNaN(h))
        return !0;
    };
    for (const u of o)
      if (!(a !== void 0 && c(u)) && ((s === !1 || i.indexOf(u.stack) === -1 || s === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    return Object.keys(t).filter((n) => t[n].axis === a).shift();
  }
  _getAxis() {
    const t = {}, a = this.getFirstScaleIdForIndexAxis();
    for (const n of this.chart.data.datasets)
      t[Ae(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, a)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, a, n) {
    const o = this._getStacks(t, n), s = a !== void 0 ? o.indexOf(a) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const t = this.options, a = this._cachedMeta, n = a.iScale, o = [];
    let s, i;
    for (s = 0, i = a.data.length; s < i; ++s)
      o.push(n.getPixelForValue(this.getParsed(s)[n.axis], s));
    const l = t.barThickness;
    return {
      min: l || yd(a),
      pixels: o,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(t), c = r._custom, u = qn(c);
    let f = r[a.axis], h = 0, v = n ? this.applyStack(a, r, n) : f, m, b;
    v !== f && (h = v - f, v = f), u && (f = c.barStart, v = c.barEnd - c.barStart, f !== 0 && It(f) !== It(c.barEnd) && (h = 0), h += f);
    const p = !Ie(s) && !u ? s : h;
    let y = a.getPixelForValue(p);
    if (this.chart.getDataVisibility(t) ? m = a.getPixelForValue(h + v) : m = y, b = m - y, Math.abs(b) < i) {
      b = wd(b, a, l) * i, f === l && (y -= b / 2);
      const k = a.getPixelForDecimal(0), _ = a.getPixelForDecimal(1), w = Math.min(k, _), $ = Math.max(k, _);
      y = Math.max(Math.min(y, $), w), m = y + b, n && !u && (r._stacks[a.axis]._visualValues[o] = a.getValueForPixel(m) - a.getValueForPixel(y));
    }
    if (y === a.getPixelForValue(l)) {
      const k = It(b) * a.getLineWidthForValue(l) / 2;
      y += k, b -= k;
    }
    return {
      size: b,
      base: y,
      head: m,
      center: m + b / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = Ae(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = s ? this._getStackCount(t) : a.stackCount, f = o.barThickness === "flex" ? kd(t, a, o, u * c) : xd(t, a, o, u * c), h = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(Ae(h, this.getFirstScaleIdForIndexAxis())), m = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + v;
      l = f.start + f.chunk * m + f.chunk / 2, r = Math.min(i, f.chunk * f.ratio);
    } else
      l = n.getPixelForValue(this.getParsed(t)[n.axis], t), r = Math.min(i, a.min * a.ratio);
    return {
      base: l - r / 2,
      head: l + r / 2,
      center: l,
      size: r
    };
  }
  draw() {
    const t = this._cachedMeta, a = t.vScale, n = t.data, o = n.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[a.axis] !== null && !n[s].hidden && n[s].draw(this._ctx);
  }
}
function Ad(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < Ue) {
    const l = e, r = l + t, c = Math.cos(l), u = Math.sin(l), f = Math.cos(r), h = Math.sin(r), v = (_, w, $) => Xa(_, l, r, !0) ? 1 : Math.max(w, w * a, $, $ * a), m = (_, w, $) => Xa(_, l, r, !0) ? -1 : Math.min(w, w * a, $, $ * a), b = v(0, c, f), p = v(Qe, u, h), y = m(Oe, c, f), k = m(Oe + Qe, u, h);
    n = (b - y) / 2, o = (p - k) / 2, s = -(b + y) / 2, i = -(p + k) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class Td extends Fn {
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
            const a = t.data, { labels: { pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = t.legend.options;
            return a.labels.length && a.datasets.length ? a.labels.map((r, c) => {
              const f = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
                fillStyle: f.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: f.borderDash,
                lineDashOffset: f.borderDashOffset,
                lineJoin: f.borderJoinStyle,
                lineWidth: f.borderWidth,
                strokeStyle: f.borderColor,
                textAlign: o,
                pointStyle: n,
                borderRadius: i && (l || f.borderRadius),
                index: c
              };
            }) : [];
          }
        },
        onClick(t, a, n) {
          n.chart.toggleDataVisibility(a.index), n.chart.update();
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
    const n = this.getDataset().data, o = this._cachedMeta;
    if (this._parsing === !1)
      o._parsed = n;
    else {
      let s = (r) => +n[r];
      if (Le(n[t])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +fa(n[c], r);
      }
      let i, l;
      for (i = t, l = t + a; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return zt(this.options.rotation - 90);
  }
  _getCircumference() {
    return zt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ue, a = -Ue;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const o = this.chart.getDatasetMeta(n).controller, s = o._getRotation(), i = o._getCircumference();
        t = Math.min(t, s), a = Math.max(a, s + i);
      }
    return {
      rotation: t,
      circumference: a - t
    };
  }
  update(t) {
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(n.width, n.height) - i) / 2, 0), r = Math.min(Rr(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: f } = this._getRotationExtents(), { ratioX: h, ratioY: v, offsetX: m, offsetY: b } = Ad(f, u, r), p = (n.width - i) / h, y = (n.height - i) / v, k = Math.max(Math.min(p, y) / 2, 0), _ = Ei(this.options.radius, k), w = Math.max(_ * r, 0), $ = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = m * _, this.offsetY = b * _, o.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, f = (l.top + l.bottom) / 2, h = s && c.animateScale, v = h ? 0 : this.innerRadius, m = h ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: p } = this._getSharedOptions(a, o);
    let y = this._getRotation(), k;
    for (k = 0; k < a; ++k)
      y += this._circumference(k, s);
    for (k = a; k < a + n; ++k) {
      const _ = this._circumference(k, s), w = t[k], $ = {
        x: u + this.offsetX,
        y: f + this.offsetY,
        startAngle: y,
        endAngle: y + _,
        circumference: _,
        outerRadius: m,
        innerRadius: v
      };
      p && ($.options = b || this.resolveDataElementOptions(k, w.active ? "active" : o)), y += _, this.updateElement(w, k, $, o);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, a = t.data;
    let n = 0, o;
    for (o = 0; o < a.length; o++) {
      const s = t._parsed[o];
      s !== null && !isNaN(s) && this.chart.getDataVisibility(o) && !a[o].hidden && (n += Math.abs(s));
    }
    return n;
  }
  calculateCircumference(t) {
    const a = this._cachedMeta.total;
    return a > 0 && !isNaN(t) ? Ue * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = So(a._parsed[t], n.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let a = 0;
    const n = this.chart;
    let o, s, i, l, r;
    if (!t) {
      for (o = 0, s = n.data.datasets.length; o < s; ++o)
        if (n.isDatasetVisible(o)) {
          i = n.getDatasetMeta(o), t = i.data, l = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (o = 0, s = t.length; o < s; ++o)
      r = l.resolveDataElementOptions(o), r.borderAlign !== "inner" && (a = Math.max(a, r.borderWidth || 0, r.hoverBorderWidth || 0));
    return a;
  }
  getMaxOffset(t) {
    let a = 0;
    for (let n = 0, o = t.length; n < o; ++n) {
      const s = this.resolveDataElementOptions(n);
      a = Math.max(a, s.offset || 0, s.hoverOffset || 0);
    }
    return a;
  }
  _getRingWeightOffset(t) {
    let a = 0;
    for (let n = 0; n < t; ++n)
      this.chart.isDatasetVisible(n) && (a += this._getRingWeight(n));
    return a;
  }
  _getRingWeight(t) {
    return Math.max(Ae(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Bd extends Fn {
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
    const a = this._cachedMeta, { dataset: n, data: o = [], _dataset: s } = a, i = this.chart._animationsDisabled;
    let { start: l, count: r } = Jr(a, o, i);
    this._drawStart = l, this._drawCount = r, ec(a) && (l = 0, r = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: f } = this._getSharedOptions(a, o), h = i.axis, v = l.axis, { spanGaps: m, segment: b } = this.options, p = qa(m) ? m : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || s || o === "none", k = a + n, _ = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < _; ++$) {
      const D = t[$], M = y ? D : {};
      if ($ < a || $ >= k) {
        M.skip = !0;
        continue;
      }
      const F = this.getParsed($), z = Ie(F[v]), W = M[h] = i.getPixelForValue(F[h], $), S = M[v] = s || z ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, F, r) : F[v], $);
      M.skip = isNaN(W) || isNaN(S) || z, M.stop = $ > 0 && Math.abs(F[h] - w[h]) > p, b && (M.parsed = F, M.raw = c.data[$]), f && (M.options = u || this.resolveDataElementOptions($, D.active ? "active" : o)), y || this.updateElement(D, $, M, o), w = F;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, a = t.dataset, n = a.options && a.options.borderWidth || 0, o = t.data || [];
    if (!o.length)
      return n;
    const s = o[0].size(this.resolveDataElementOptions(0)), i = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
    return Math.max(n, s, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class Ld extends Td {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function la() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Io {
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
    Object.assign(Io.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return la();
  }
  parse() {
    return la();
  }
  format() {
    return la();
  }
  add() {
    return la();
  }
  diff() {
    return la();
  }
  startOf() {
    return la();
  }
  endOf() {
    return la();
  }
}
var Rd = {
  _date: Io
};
function Pd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? qr : ua;
    if (n) {
      if (o._sharedOptions) {
        const u = s[0], f = typeof u.getRange == "function" && u.getRange(t);
        if (f) {
          const h = c(s, t, a - f), v = c(s, t, a + f);
          return {
            lo: h.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const u = c(s, t, a);
      if (r) {
        const { vScale: f } = o._cachedMeta, { _parsed: h } = e, v = h.slice(0, u.lo + 1).reverse().findIndex((b) => !Ie(b[f.axis]));
        u.lo -= Math.max(0, v);
        const m = h.slice(u.hi).findIndex((b) => !Ie(b[f.axis]));
        u.hi += Math.max(0, m);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function On(e, t, a, n, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: u } = s[l], { lo: f, hi: h } = Pd(s[l], t, i, o);
    for (let v = f; v <= h; ++v) {
      const m = u[v];
      m.skip || n(m, c, v);
    }
  }
}
function Id(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, o) {
    const s = t ? Math.abs(n.x - o.x) : 0, i = a ? Math.abs(n.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Xn(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || On(e, a, t, function(l, r, c) {
    !o && !Ga(l, e.chartArea, 0) || l.inRange(t.x, t.y, n) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function Ed(e, t, a, n) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: f } = Vi(i, {
      x: t.x,
      y: t.y
    });
    Xa(f, c, u) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return On(e, a, t, s), o;
}
function Fd(e, t, a, n, o, s) {
  let i = [];
  const l = Id(a);
  let r = Number.POSITIVE_INFINITY;
  function c(u, f, h) {
    const v = u.inRange(t.x, t.y, o);
    if (n && !v)
      return;
    const m = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(m)) && !v)
      return;
    const p = l(t, m);
    p < r ? (i = [
      {
        element: u,
        datasetIndex: f,
        index: h
      }
    ], r = p) : p === r && i.push({
      element: u,
      datasetIndex: f,
      index: h
    });
  }
  return On(e, a, t, c), i;
}
function Gn(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? Ed(e, t, a, o) : Fd(e, t, a, n, o, s);
}
function Cs(e, t, a, n, o) {
  const s = [], i = a === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return On(e, a, t, (r, c, u) => {
    r[i] && r[i](t[a], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: u
    }), l = l || r.inRange(t.x, t.y, o));
  }), n && !l ? [] : s;
}
var Od = {
  modes: {
    index(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "x", i = a.includeInvisible || !1, l = a.intersect ? Xn(e, o, s, n, i) : Gn(e, o, s, !1, n, i), r = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = l[0].index, f = c.data[u];
        f && !f.skip && r.push({
          element: f,
          datasetIndex: c.index,
          index: u
        });
      }), r) : [];
    },
    dataset(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      let l = a.intersect ? Xn(e, o, s, n, i) : Gn(e, o, s, !1, n, i);
      if (l.length > 0) {
        const r = l[0].datasetIndex, c = e.getDatasetMeta(r).data;
        l = [];
        for (let u = 0; u < c.length; ++u)
          l.push({
            element: c[u],
            datasetIndex: r,
            index: u
          });
      }
      return l;
    },
    point(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Xn(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Gn(e, o, s, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const o = ca(t, e);
      return Cs(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = ca(t, e);
      return Cs(e, o, "y", a.intersect, n);
    }
  }
};
const ol = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ba(e, t) {
  return e.filter((a) => a.pos === t);
}
function $s(e, t) {
  return e.filter((a) => ol.indexOf(a.pos) === -1 && a.box.axis === t);
}
function La(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Vd(e) {
  const t = [];
  let a, n, o, s, i, l;
  for (a = 0, n = (e || []).length; a < n; ++a)
    o = e[a], { position: s, options: { stack: i, stackWeight: l = 1 } } = o, t.push({
      index: a,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: l
    });
  return t;
}
function Nd(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !ol.includes(o))
      continue;
    const i = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += s;
  }
  return t;
}
function zd(e, t) {
  const a = Nd(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = a[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * n : r && t.availableWidth, l.height = o) : (l.width = n, l.height = u ? u * o : r && t.availableHeight);
  }
  return a;
}
function jd(e) {
  const t = Vd(e), a = La(t.filter((c) => c.box.fullSize), !0), n = La(Ba(t, "left"), !0), o = La(Ba(t, "right")), s = La(Ba(t, "top"), !0), i = La(Ba(t, "bottom")), l = $s(t, "x"), r = $s(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: Ba(t, "chartArea"),
    vertical: n.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function Ss(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function sl(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Hd(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Le(o)) {
    a.size && (e[o] -= a.size);
    const f = n[a.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, a.horizontal ? s.height : s.width), a.size = f.size / f.count, e[o] += a.size;
  }
  s.getPadding && sl(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - Ss(i, e, "left", "right")), r = Math.max(0, t.outerHeight - Ss(i, e, "top", "bottom")), c = l !== e.w, u = r !== e.h;
  return e.w = l, e.h = r, a.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Wd(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Kd(e, t) {
  const a = t.maxPadding;
  function n(o) {
    const s = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return o.forEach((i) => {
      s[i] = Math.max(t[i], a[i]);
    }), s;
  }
  return n(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Va(e, t, a, n) {
  const o = [];
  let s, i, l, r, c, u;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, Kd(l.horizontal, t));
    const { same: f, other: h } = Hd(t, a, l, n);
    c |= f && o.length, u = u || h, r.fullSize || o.push(l);
  }
  return c && Va(o, t, a, n) || u;
}
function fn(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function Ms(e, t, a, n) {
  const o = a.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = n[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const f = t.w * u, h = c.size || r.height;
      Ya(c.start) && (i = c.start), r.fullSize ? fn(r, o.left, i, a.outerWidth - o.right - o.left, h) : fn(r, t.left + c.placed, i, f, h), c.start = i, c.placed += f, i = r.bottom;
    } else {
      const f = t.h * u, h = c.size || r.width;
      Ya(c.start) && (s = c.start), r.fullSize ? fn(r, s, o.top, h, a.outerHeight - o.bottom - o.top) : fn(r, s, t.top + c.placed, h, f), c.start = s, c.placed += f, s = r.right;
    }
  }
  t.x = s, t.y = i;
}
var xt = {
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
  update(e, t, a, n) {
    if (!e)
      return;
    const o = Ct(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), l = jd(e.boxes), r = l.vertical, c = l.horizontal;
    Ee(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const u = r.reduce((b, p) => p.box.options && p.box.options.display === !1 ? b : b + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), h = Object.assign({}, o);
    sl(h, Ct(n));
    const v = Object.assign({
      maxPadding: h,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), m = zd(r.concat(c), f);
    Va(l.fullSize, v, f, m), Va(r, v, f, m), Va(c, v, f, m) && Va(r, v, f, m), Wd(v), Ms(l.leftAndTop, v, f, m), v.x += v.w, v.y += v.h, Ms(l.rightAndBottom, v, f, m), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Ee(l.chartArea, (b) => {
      const p = b.box;
      Object.assign(p, e.chartArea), p.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class il {
  acquireContext(t, a) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, a, n) {
  }
  removeEventListener(t, a, n) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, a, n, o) {
    return a = Math.max(0, a || t.width), n = n || t.height, {
      width: a,
      height: Math.max(0, o ? Math.floor(a / o) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Ud extends il {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const wn = "$chartjs", Yd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ds = (e) => e === null || e === "";
function qd(e, t) {
  const a = e.style, n = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[wn] = {
    initial: {
      height: n,
      width: o,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", Ds(o)) {
    const s = us(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (Ds(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = us(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const ll = Hc ? {
  passive: !0
} : !1;
function Xd(e, t, a) {
  e && e.addEventListener(t, a, ll);
}
function Gd(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, ll);
}
function Zd(e, t) {
  const a = Yd[e.type] || e.type, { x: n, y: o } = ca(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: o !== void 0 ? o : null
  };
}
function Ln(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Qd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || Ln(l.addedNodes, n), i = i && !Ln(l.removedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Jd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || Ln(l.removedNodes, n), i = i && !Ln(l.addedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Qa = /* @__PURE__ */ new Map();
let As = 0;
function rl() {
  const e = window.devicePixelRatio;
  e !== As && (As = e, Qa.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function eu(e, t) {
  Qa.size || window.addEventListener("resize", rl), Qa.set(e, t);
}
function tu(e) {
  Qa.delete(e), Qa.size || window.removeEventListener("resize", rl);
}
function au(e, t, a) {
  const n = e.canvas, o = n && Po(n);
  if (!o)
    return;
  const s = Hi((l, r) => {
    const c = o.clientWidth;
    a(l, r), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, u = r.contentRect.height;
    c === 0 && u === 0 || s(c, u);
  });
  return i.observe(o), eu(e, s), i;
}
function Zn(e, t, a) {
  a && a.disconnect(), t === "resize" && tu(e);
}
function nu(e, t, a) {
  const n = e.canvas, o = Hi((s) => {
    e.ctx !== null && a(Zd(s, e));
  }, e);
  return Xd(n, t, o), o;
}
class ou extends il {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (qd(t, a), n) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[wn])
      return !1;
    const n = a[wn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = n[s];
      Ie(i) ? a.removeAttribute(s) : a.setAttribute(s, i);
    });
    const o = n.style || {};
    return Object.keys(o).forEach((s) => {
      a.style[s] = o[s];
    }), a.width = a.width, delete a[wn], !0;
  }
  addEventListener(t, a, n) {
    this.removeEventListener(t, a);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: Qd,
      detach: Jd,
      resize: au
    }[a] || nu;
    o[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), o = n[a];
    if (!o)
      return;
    ({
      attach: Zn,
      detach: Zn,
      resize: Zn
    }[a] || Gd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return jc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && Po(t);
    return !!(a && a.isConnected);
  }
}
function su(e) {
  return !Ro() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ud : ou;
}
let Ut = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: a, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: a,
      y: n
    };
  }
  hasValue() {
    return qa(this.x) && qa(this.y);
  }
  getProps(t, a) {
    const n = this.$animations;
    if (!a || !n)
      return this;
    const o = {};
    return t.forEach((s) => {
      o[s] = n[s] && n[s].active() ? n[s]._to : this[s];
    }), o;
  }
};
function iu(e, t) {
  const a = e.options.ticks, n = lu(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? cu(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return du(t, c, s, i / o), c;
  const u = ru(s, t, o);
  if (i > 0) {
    let f, h;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (gn(t, c, u, Ie(v) ? 0 : l - v, l), f = 0, h = i - 1; f < h; f++)
      gn(t, c, u, s[f], s[f + 1]);
    return gn(t, c, u, r, Ie(v) ? t.length : r + v), c;
  }
  return gn(t, c, u), c;
}
function lu(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function ru(e, t, a) {
  const n = uu(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = zr(n);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function cu(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function du(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function gn(e, t, a, n, o) {
  const s = Ae(n, 0), i = Math.min(Ae(o, e.length), e.length);
  let l = 0, r, c, u;
  for (a = Math.ceil(a), o && (r = o - n, a = r / Math.floor(r / a)), u = s; u < 0; )
    l++, u = Math.round(s + l * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(s + l * a));
}
function uu(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const hu = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ts = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Bs = (e, t) => Math.min(t || e, e);
function Ls(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function fu(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function gu(e, t) {
  Ee(e, (a) => {
    const n = a.gc, o = n.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete a.data[n[s]];
      n.splice(0, o);
    }
  });
}
function Ra(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Rs(e, t) {
  if (!e.display)
    return 0;
  const a = lt(e.font, t), n = Ct(e.padding);
  return (Ze(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function mu(e, t) {
  return ma(e, {
    scale: t,
    type: "scale"
  });
}
function pu(e, t, a) {
  return ma(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function vu(e, t, a) {
  let n = Co(e);
  return (a && t !== "right" || !a && t === "right") && (n = hu(n)), n;
}
function bu(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: u } = r;
  let f = 0, h, v, m;
  const b = i - o, p = l - s;
  if (e.isHorizontal()) {
    if (v = nt(n, s, l), Le(a)) {
      const y = Object.keys(a)[0], k = a[y];
      m = u[y].getPixelForValue(k) + b - t;
    } else a === "center" ? m = (c.bottom + c.top) / 2 + b - t : m = Ts(e, a, t);
    h = l - s;
  } else {
    if (Le(a)) {
      const y = Object.keys(a)[0], k = a[y];
      v = u[y].getPixelForValue(k) - p + t;
    } else a === "center" ? v = (c.left + c.right) / 2 - p + t : v = Ts(e, a, t);
    m = nt(n, i, o), f = a === "left" ? -Qe : Qe;
  }
  return {
    titleX: v,
    titleY: m,
    maxWidth: h,
    rotation: f
  };
}
class Aa extends Ut {
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
    let { _userMin: t, _userMax: a, _suggestedMin: n, _suggestedMax: o } = this;
    return t = Bt(t, Number.POSITIVE_INFINITY), a = Bt(a, Number.NEGATIVE_INFINITY), n = Bt(n, Number.POSITIVE_INFINITY), o = Bt(o, Number.NEGATIVE_INFINITY), {
      min: Bt(t, n),
      max: Bt(a, o),
      minDefined: wt(t),
      maxDefined: wt(a)
    };
  }
  getMinMax(t) {
    let { min: a, max: n, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: a,
        max: n
      };
    const l = this.getMatchingVisibleMetas();
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), o || (a = Math.min(a, i.min)), s || (n = Math.max(n, i.max));
    return a = s && a > n ? n : a, n = o && a > n ? a : n, {
      min: Bt(a, Bt(n, a)),
      max: Bt(n, Bt(a, n))
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
    je(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, a, n) {
    const { beginAtZero: o, grace: s, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = xc(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? Ls(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = iu(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    je(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    je(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    je(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), je(this.options[t], [
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
    je(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let n, o, s;
    for (n = 0, o = t.length; n < o; n++)
      s = t[n], s.label = je(a.callback, [
        s.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    je(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    je(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, n = Bs(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const u = this._getLabelSizes(), f = u.widest.width, h = u.highest.height, v = it(this.chart.width - f, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / n : v / (n - 1), f + 6 > l && (l = v / (n - (t.offset ? 0.5 : 1)), r = this.maxHeight - Ra(t.grid) - a.padding - Rs(t.title, this.chart.options.font), c = Math.sqrt(f * f + h * h), i = Kr(Math.min(Math.asin(it((u.highest.height + 6) / l, -1, 1)), Math.asin(it(r / c, -1, 1)) - Math.asin(it(h / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    je(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    je(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: n, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = Rs(o, a.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Ra(s) + r) : (t.height = this.maxHeight, t.width = Ra(s) + r), n.display && this.ticks.length) {
        const { first: c, last: u, widest: f, highest: h } = this._getLabelSizes(), v = n.padding * 2, m = zt(this.labelRotation), b = Math.cos(m), p = Math.sin(m);
        if (l) {
          const y = n.mirror ? 0 : p * f.width + b * h.height;
          t.height = Math.min(this.maxHeight, t.height + y + v);
        } else {
          const y = n.mirror ? 0 : b * f.width + p * h.height;
          t.width = Math.min(this.maxWidth, t.width + y + v);
        }
        this._calculatePadding(c, u, p, b);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let h = 0, v = 0;
      r ? c ? (h = o * t.width, v = n * a.height) : (h = n * t.height, v = o * a.width) : s === "start" ? v = a.width : s === "end" ? h = t.width : s !== "inner" && (h = t.width / 2, v = a.width / 2), this.paddingLeft = Math.max((h - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((v - f + i) * this.width / (this.width - f), 0);
    } else {
      let u = a.height / 2, f = t.height / 2;
      s === "start" ? (u = 0, f = t.height) : s === "end" && (u = a.height, f = 0), this.paddingTop = u + i, this.paddingBottom = f + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    je(this.options.afterFit, [
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
    let a, n;
    for (a = 0, n = t.length; a < n; a++)
      Ie(t[a].label) && (t.splice(a, 1), n--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let n = this.ticks;
      a < n.length && (n = Ls(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(a / Bs(a, n));
    let c = 0, u = 0, f, h, v, m, b, p, y, k, _, w, $;
    for (f = 0; f < a; f += r) {
      if (m = t[f].label, b = this._resolveTickFontOptions(f), o.font = p = b.string, y = s[p] = s[p] || {
        data: {},
        gc: []
      }, k = b.lineHeight, _ = w = 0, !Ie(m) && !Ze(m))
        _ = is(o, y.data, y.gc, _, m), w = k;
      else if (Ze(m))
        for (h = 0, v = m.length; h < v; ++h)
          $ = m[h], !Ie($) && !Ze($) && (_ = is(o, y.data, y.gc, _, $), w += k);
      i.push(_), l.push(w), c = Math.max(_, c), u = Math.max(w, u);
    }
    gu(s, a);
    const D = i.indexOf(c), M = l.indexOf(u), F = (z) => ({
      width: i[z] || 0,
      height: l[z] || 0
    });
    return {
      first: F(0),
      last: F(a - 1),
      widest: F(D),
      highest: F(M),
      widths: i,
      heights: l
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
    return Yr(this._alignToPixels ? ia(this.chart, a, 0) : a);
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
      const n = a[t];
      return n.$context || (n.$context = pu(this.getContext(), t, n));
    }
    return this.$context || (this.$context = mu(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = zt(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * n > l * o ? l / n : r / o : r * o < l * n ? r / n : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), f = this.ticks.length + (r ? 1 : 0), h = Ra(s), v = [], m = l.setContext(this.getContext()), b = m.display ? m.width : 0, p = b / 2, y = function(Q) {
      return ia(n, Q, b);
    };
    let k, _, w, $, D, M, F, z, W, S, L, B;
    if (i === "top")
      k = y(this.bottom), M = this.bottom - h, z = k - p, S = y(t.top) + p, B = t.bottom;
    else if (i === "bottom")
      k = y(this.top), S = t.top, B = y(t.bottom) - p, M = k + p, z = this.top + h;
    else if (i === "left")
      k = y(this.right), D = this.right - h, F = k - p, W = y(t.left) + p, L = t.right;
    else if (i === "right")
      k = y(this.left), W = t.left, L = y(t.right) - p, D = k + p, F = this.left + h;
    else if (a === "x") {
      if (i === "center")
        k = y((t.top + t.bottom) / 2 + 0.5);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], re = i[Q];
        k = y(this.chart.scales[Q].getPixelForValue(re));
      }
      S = t.top, B = t.bottom, M = k + p, z = M + h;
    } else if (a === "y") {
      if (i === "center")
        k = y((t.left + t.right) / 2);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], re = i[Q];
        k = y(this.chart.scales[Q].getPixelForValue(re));
      }
      D = k - p, F = D - h, W = t.left, L = t.right;
    }
    const j = Ae(o.ticks.maxTicksLimit, f), H = Math.max(1, Math.ceil(f / j));
    for (_ = 0; _ < f; _ += H) {
      const Q = this.getContext(_), re = s.setContext(Q), ue = l.setContext(Q), X = re.lineWidth, oe = re.color, R = ue.dash || [], U = ue.dashOffset, Y = re.tickWidth, V = re.tickColor, le = re.tickBorderDash || [], ce = re.tickBorderDashOffset;
      w = fu(this, _, r), w !== void 0 && ($ = ia(n, w, X), c ? D = F = W = L = $ : M = z = S = B = $, v.push({
        tx1: D,
        ty1: M,
        tx2: F,
        ty2: z,
        x1: W,
        y1: S,
        x2: L,
        y2: B,
        width: X,
        color: oe,
        borderDash: R,
        borderDashOffset: U,
        tickWidth: Y,
        tickColor: V,
        tickBorderDash: le,
        tickBorderDashOffset: ce
      }));
    }
    return this._ticksLength = f, this._borderValue = k, v;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: u, mirror: f } = s, h = Ra(n.grid), v = h + u, m = f ? -u : v, b = -zt(this.labelRotation), p = [];
    let y, k, _, w, $, D, M, F, z, W, S, L, B = "middle";
    if (o === "top")
      D = this.bottom - m, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      D = this.top + m, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const H = this._getYAxisLabelAlignment(h);
      M = H.textAlign, $ = H.x;
    } else if (o === "right") {
      const H = this._getYAxisLabelAlignment(h);
      M = H.textAlign, $ = H.x;
    } else if (a === "x") {
      if (o === "center")
        D = (t.top + t.bottom) / 2 + v;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        D = this.chart.scales[H].getPixelForValue(Q) + v;
      }
      M = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - v;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        $ = this.chart.scales[H].getPixelForValue(Q);
      }
      M = this._getYAxisLabelAlignment(h).textAlign;
    }
    a === "y" && (r === "start" ? B = "top" : r === "end" && (B = "bottom"));
    const j = this._getLabelSizes();
    for (y = 0, k = l.length; y < k; ++y) {
      _ = l[y], w = _.label;
      const H = s.setContext(this.getContext(y));
      F = this.getPixelForTick(y) + s.labelOffset, z = this._resolveTickFontOptions(y), W = z.lineHeight, S = Ze(w) ? w.length : 1;
      const Q = S / 2, re = H.color, ue = H.textStrokeColor, X = H.textStrokeWidth;
      let oe = M;
      i ? ($ = F, M === "inner" && (y === k - 1 ? oe = this.options.reverse ? "left" : "right" : y === 0 ? oe = this.options.reverse ? "right" : "left" : oe = "center"), o === "top" ? c === "near" || b !== 0 ? L = -S * W + W / 2 : c === "center" ? L = -j.highest.height / 2 - Q * W + W : L = -j.highest.height + W / 2 : c === "near" || b !== 0 ? L = W / 2 : c === "center" ? L = j.highest.height / 2 - Q * W : L = j.highest.height - S * W, f && (L *= -1), b !== 0 && !H.showLabelBackdrop && ($ += W / 2 * Math.sin(b))) : (D = F, L = (1 - S) * W / 2);
      let R;
      if (H.showLabelBackdrop) {
        const U = Ct(H.backdropPadding), Y = j.heights[y], V = j.widths[y];
        let le = L - U.top, ce = 0 - U.left;
        switch (B) {
          case "middle":
            le -= Y / 2;
            break;
          case "bottom":
            le -= Y;
            break;
        }
        switch (M) {
          case "center":
            ce -= V / 2;
            break;
          case "right":
            ce -= V;
            break;
          case "inner":
            y === k - 1 ? ce -= V : y > 0 && (ce -= V / 2);
            break;
        }
        R = {
          left: ce,
          top: le,
          width: V + U.width,
          height: Y + U.height,
          color: H.backdropColor
        };
      }
      p.push({
        label: w,
        font: z,
        textOffset: L,
        options: {
          rotation: b,
          color: re,
          strokeColor: ue,
          strokeWidth: X,
          textAlign: oe,
          textBaseline: B,
          translation: [
            $,
            D
          ],
          backdrop: R
        }
      });
    }
    return p;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-zt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return a.align === "start" ? o = "left" : a.align === "end" ? o = "right" : a.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: n, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), l = t + s, r = i.widest.width;
    let c, u;
    return a === "left" ? o ? (u = this.right + s, n === "near" ? c = "left" : n === "center" ? (c = "center", u += r / 2) : (c = "right", u += r)) : (u = this.right - l, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= r / 2) : (c = "left", u = this.left)) : a === "right" ? o ? (u = this.left + s, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= r / 2) : (c = "left", u -= r)) : (u = this.left + l, n === "near" ? c = "left" : n === "center" ? (c = "center", u += r / 2) : (c = "right", u = this.right)) : c = "right", {
      textAlign: c,
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
    const { ctx: t, options: { backgroundColor: a }, left: n, top: o, width: s, height: i } = this;
    a && (t.save(), t.fillStyle = a, t.fillRect(n, o, s, i), t.restore());
  }
  getLineWidthForValue(t) {
    const a = this.options.grid;
    if (!this._isVisible() || !a.display)
      return 0;
    const o = this.ticks.findIndex((s) => s.value === t);
    return o >= 0 ? a.setContext(this.getContext(o)).lineWidth : 0;
  }
  drawGrid(t) {
    const a = this.options.grid, n = this.ctx, o = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let s, i;
    const l = (r, c, u) => {
      !u.width || !u.color || (n.save(), n.lineWidth = u.width, n.strokeStyle = u.color, n.setLineDash(u.borderDash || []), n.lineDashOffset = u.borderDashOffset, n.beginPath(), n.moveTo(r.x, r.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (a.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const r = o[s];
        a.drawOnChartArea && l({
          x: r.x1,
          y: r.y1
        }, {
          x: r.x2,
          y: r.y2
        }, r), a.drawTicks && l({
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
    const { chart: t, ctx: a, options: { border: n, grid: o } } = this, s = n.setContext(this.getContext()), i = n.display ? s.width : 0;
    if (!i)
      return;
    const l = o.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, u, f, h;
    this.isHorizontal() ? (c = ia(t, this.left, i) - i / 2, u = ia(t, this.right, l) + l / 2, f = h = r) : (f = ia(t, this.top, i) - i / 2, h = ia(t, this.bottom, l) + l / 2, c = u = r), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, f), a.lineTo(u, h), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && Mo(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, u = i.textOffset;
      Za(n, c, 0, u, r, l);
    }
    o && Do(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = lt(n.font), i = Ct(n.padding), l = n.align;
    let r = s.lineHeight / 2;
    a === "bottom" || a === "center" || Le(a) ? (r += i.bottom, Ze(n.text) && (r += s.lineHeight * (n.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: u, maxWidth: f, rotation: h } = bu(this, r, a, l);
    Za(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: f,
      rotation: h,
      textAlign: vu(l, a, o),
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
    const t = this.options, a = t.ticks && t.ticks.z || 0, n = Ae(t.grid && t.grid.z, -1), o = Ae(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Aa.prototype.draw ? [
      {
        z: a,
        draw: (s) => {
          this.draw(s);
        }
      }
    ] : [
      {
        z: n,
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
        z: a,
        draw: (s) => {
          this.drawLabels(s);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const a = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", o = [];
    let s, i;
    for (s = 0, i = a.length; s < i; ++s) {
      const l = a[s];
      l[n] === this.id && (!t || l.type === t) && o.push(l);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const a = this.options.ticks.setContext(this.getContext(t));
    return lt(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class mn {
  constructor(t, a, n) {
    this.type = t, this.scope = a, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let n;
    ku(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, yu(t, i, n), this.override && qe.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in qe[o] && (delete qe[o][n], this.override && delete ga[n]);
  }
}
function yu(e, t, a) {
  const n = Ua(/* @__PURE__ */ Object.create(null), [
    a ? qe.get(a) : {},
    qe.get(t),
    e.defaults
  ]);
  qe.set(t, n), e.defaultRoutes && xu(t, e.defaultRoutes), e.descriptors && qe.describe(t, e.descriptors);
}
function xu(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), l = i.pop(), r = i.join(".");
    qe.route(s, o, r, l);
  });
}
function ku(e) {
  return "id" in e && "defaults" in e;
}
class _u {
  constructor() {
    this.controllers = new mn(Fn, "datasets", !0), this.elements = new mn(Ut, "elements"), this.plugins = new mn(Object, "plugins"), this.scales = new mn(Aa, "scales"), this._typedRegistries = [
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
  _each(t, a, n) {
    [
      ...a
    ].forEach((o) => {
      const s = n || this._getRegistryForType(o);
      n || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Ee(o, (i) => {
        const l = n || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, a, n) {
    const o = _o(t);
    je(n["before" + o], [], n), a[t](n), je(n["after" + o], [], n);
  }
  _getRegistryForType(t) {
    for (let a = 0; a < this._typedRegistries.length; a++) {
      const n = this._typedRegistries[a];
      if (n.isForType(t))
        return n;
    }
    return this.plugins;
  }
  _get(t, a, n) {
    const o = a.get(t);
    if (o === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return o;
  }
}
var Rt = /* @__PURE__ */ new _u();
class wu {
  constructor() {
    this._init = void 0;
  }
  notify(t, a, n, o) {
    if (a === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const s = o ? this._descriptors(t).filter(o) : this._descriptors(t), i = this._notify(s, t, a, n);
    return a === "afterDestroy" && (this._notify(s, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, a, n, o) {
    o = o || {};
    for (const s of t) {
      const i = s.plugin, l = i[n], r = [
        a,
        o,
        s.options
      ];
      if (je(l, r, i) === !1 && o.cancelable)
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
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const n = t && t.config, o = Ae(n.options && n.options.plugins, {}), s = Cu(n);
    return o === !1 && !a ? [] : Su(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function Cu(e) {
  const t = {}, a = [], n = Object.keys(Rt.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push(Rt.getPlugin(n[s]));
  const o = e.plugins || [];
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    a.indexOf(i) === -1 && (a.push(i), t[i.id] = !0);
  }
  return {
    plugins: a,
    localIds: t
  };
}
function $u(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Su(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = $u(n[r], o);
    c !== null && s.push({
      plugin: l,
      options: Mu(e.config, {
        plugin: l,
        local: a[r]
      }, c, i)
    });
  }
  return s;
}
function Mu(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ho(e, t) {
  const a = qe.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function Du(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function Au(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Ps(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Tu(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function fo(e, ...t) {
  if (Ps(e))
    return e;
  for (const a of t) {
    const n = a.axis || Tu(a.position) || e.length > 1 && Ps(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Is(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Bu(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Is(e, "x", a[0]) || Is(e, "y", a[0]);
  }
  return {};
}
function Lu(e, t) {
  const a = ga[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = ho(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const l = n[i];
    if (!Le(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = fo(i, l, Bu(i, e), qe.scales[l.type]), c = Au(r, o), u = a.scales || {};
    s[i] = za(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      u[r],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || ho(l, t), u = (ga[l] || {}).scales || {};
    Object.keys(u).forEach((f) => {
      const h = Du(f, r), v = i[h + "AxisID"] || h;
      s[v] = s[v] || /* @__PURE__ */ Object.create(null), za(s[v], [
        {
          axis: h
        },
        n[v],
        u[f]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    za(l, [
      qe.scales[l.type],
      qe.scale
    ]);
  }), s;
}
function cl(e) {
  const t = e.options || (e.options = {});
  t.plugins = Ae(t.plugins, {}), t.scales = Lu(e, t);
}
function dl(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Ru(e) {
  return e = e || {}, e.data = dl(e.data), cl(e), e;
}
const Es = /* @__PURE__ */ new Map(), ul = /* @__PURE__ */ new Set();
function pn(e, t) {
  let a = Es.get(e);
  return a || (a = t(), Es.set(e, a), ul.add(a)), a;
}
const Pa = (e, t, a) => {
  const n = fa(t, a);
  n !== void 0 && e.add(n);
};
class Pu {
  constructor(t) {
    this._config = Ru(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = dl(t);
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
    this.clearCache(), cl(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return pn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return pn(`${t}.transition.${a}`, () => [
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
    return pn(`${t}-${a}`, () => [
      [
        `datasets.${t}.elements.${a}`,
        `datasets.${t}`,
        `elements.${a}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const a = t.id, n = this.type;
    return pn(`${n}-plugin-${a}`, () => [
      [
        `plugins.${a}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, a) {
    const n = this._scopeCache;
    let o = n.get(t);
    return (!o || a) && (o = /* @__PURE__ */ new Map(), n.set(t, o)), o;
  }
  getOptionScopes(t, a, n) {
    const { options: o, type: s } = this, i = this._cachedScopes(t, n), l = i.get(a);
    if (l)
      return l;
    const r = /* @__PURE__ */ new Set();
    a.forEach((u) => {
      t && (r.add(t), u.forEach((f) => Pa(r, t, f))), u.forEach((f) => Pa(r, o, f)), u.forEach((f) => Pa(r, ga[s] || {}, f)), u.forEach((f) => Pa(r, qe, f)), u.forEach((f) => Pa(r, co, f));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), ul.has(a) && i.set(a, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      ga[a] || {},
      qe.datasets[a] || {},
      {
        type: a
      },
      qe,
      co
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Fs(this._resolverCache, t, o);
    let r = i;
    if (Eu(i, a)) {
      s.$shared = !1, n = ta(n) ? n() : n;
      const c = this.createResolver(t, n, l);
      r = Sa(i, n, c);
    }
    for (const c of a)
      s[c] = r[c];
    return s;
  }
  createResolver(t, a, n = [
    ""
  ], o) {
    const { resolver: s } = Fs(this._resolverCache, t, n);
    return Le(a) ? Sa(s, a, void 0, o) : s;
  }
}
function Fs(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: To(t, a),
    subPrefixes: a.filter((l) => !l.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const Iu = (e) => Le(e) && Object.getOwnPropertyNames(e).some((t) => ta(e[t]));
function Eu(e, t) {
  const { isScriptable: a, isIndexable: n } = Yi(e);
  for (const o of t) {
    const s = a(o), i = n(o), l = (i || s) && e[o];
    if (s && (ta(l) || Iu(l)) || i && Ze(l))
      return !0;
  }
  return !1;
}
var Fu = "4.5.1";
const Ou = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Os(e, t) {
  return e === "top" || e === "bottom" || Ou.indexOf(e) === -1 && t === "x";
}
function Vs(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function Ns(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), je(a && a.onComplete, [
    e
  ], t);
}
function Vu(e) {
  const t = e.chart, a = t.options.animation;
  je(a && a.onProgress, [
    e
  ], t);
}
function hl(e) {
  return Ro() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Cn = {}, zs = (e) => {
  const t = hl(e);
  return Object.values(Cn).filter((a) => a.canvas === t).pop();
};
function Nu(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function zu(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let aa = class {
  static defaults = qe;
  static instances = Cn;
  static overrides = ga;
  static registry = Rt;
  static version = Fu;
  static getChart = zs;
  static register(...t) {
    Rt.add(...t), js();
  }
  static unregister(...t) {
    Rt.remove(...t), js();
  }
  constructor(t, a) {
    const n = this.config = new Pu(a), o = hl(t), s = zs(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || su(o))(), this.platform.updateConfig(n);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, u = r && r.width;
    if (this.id = Lr(), this.ctx = l, this.canvas = r, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new wu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Zr((f) => this.update(f), i.resizeDelay || 0), this._dataChanges = [], Cn[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ot.listen(this, "complete", Ns), Ot.listen(this, "progress", Vu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: n, height: o, _aspectRatio: s } = this;
    return Ie(t) ? a && s ? s : o ? n / o : null : t;
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
    return Rt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ds(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return ls(this.canvas, this.ctx), this;
  }
  stop() {
    return Ot.stop(this), this;
  }
  resize(t, a) {
    Ot.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const n = this.options, o = this.canvas, s = n.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, a, s), l = n.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, ds(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), je(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    Ee(a, (n, o) => {
      n.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, o = Object.keys(n).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    a && (s = s.concat(Object.keys(a).map((i) => {
      const l = a[i], r = fo(i, l), c = r === "r", u = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), Ee(s, (i) => {
      const l = i.options, r = l.id, c = fo(r, l), u = Ae(l.type, i.dtype);
      (l.position === void 0 || Os(l.position, c) !== Os(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let f = null;
      if (r in n && n[r].type === u)
        f = n[r];
      else {
        const h = Rt.getScale(u);
        f = new h({
          id: r,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[f.id] = f;
      }
      f.init(l, t);
    }), Ee(o, (i, l) => {
      i || delete n[l];
    }), Ee(n, (i) => {
      xt.configure(this, i, i.options), xt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, n = t.length;
    if (t.sort((o, s) => o.index - s.index), n > a) {
      for (let o = a; o < n; ++o)
        this._destroyDatasetMeta(o);
      t.splice(a, n - a);
    }
    this._sortedMetasets = t.slice(0).sort(Vs("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: a } } = this;
    t.length > a.length && delete this._stacks, t.forEach((n, o) => {
      a.filter((s) => s === n._dataset).length === 0 && this._destroyDatasetMeta(o);
    });
  }
  buildOrUpdateControllers() {
    const t = [], a = this.data.datasets;
    let n, o;
    for (this._removeUnreferencedMetasets(), n = 0, o = a.length; n < o; n++) {
      const s = a[n];
      let i = this.getDatasetMeta(n);
      const l = s.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = l, i.indexAxis = s.indexAxis || ho(l, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const r = Rt.getController(l), { datasetElementType: c, dataElementType: u } = qe.datasets[l];
        Object.assign(r, {
          dataElementType: Rt.getElement(u),
          datasetElementType: c && Rt.getElement(c)
        }), i.controller = new r(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Ee(this.data.datasets, (t, a) => {
      this.getDatasetMeta(a).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const a = this.config;
    a.update();
    const n = this._options = a.createResolver(a.chartOptionScopes(), this.getContext()), o = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const s = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: f } = this.getDatasetMeta(c), h = !o && s.indexOf(f) === -1;
      f.buildOrUpdateElements(h), i = Math.max(+f.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Ee(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Vs("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Ee(this.scales, (t) => {
      xt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Zo(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      Nu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!Zo(o, n(s)))
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
    xt.update(this, this.width, this.height, t);
    const a = this.chartArea, n = a.width <= 0 || a.height <= 0;
    this._layers = [], Ee(this.boxes, (o) => {
      n && o.position === "chartArea" || (o.configure && o.configure(), this._layers.push(...o._layers()));
    }, this), this._layers.forEach((o, s) => {
      o._idx = s;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let a = 0, n = this.data.datasets.length; a < n; ++a)
        this.getDatasetMeta(a).controller.configure();
      for (let a = 0, n = this.data.datasets.length; a < n; ++a)
        this._updateDataset(a, ta(t) ? t({
          datasetIndex: a
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, a) {
    const n = this.getDatasetMeta(t), o = {
      meta: n,
      index: t,
      mode: a,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", o) !== !1 && (n.controller._update(a), o.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", o));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Ot.has(this) ? this.attached && !Ot.running(this) && Ot.start(this) : (this.draw(), Ns({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: o } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, o);
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
    const a = this._sortedMetasets, n = [];
    let o, s;
    for (o = 0, s = a.length; o < s; ++o) {
      const i = a[o];
      (!t || i.visible) && n.push(i);
    }
    return n;
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
    const a = this.ctx, n = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, o = nd(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && Mo(a, o), t.controller.draw(), o && Do(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Ga(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = Od.modes[a];
    return typeof s == "function" ? s(this, t, n, o) : [];
  }
  getDatasetMeta(t) {
    const a = this.data.datasets[t], n = this._metasets;
    let o = n.filter((s) => s && s._dataset === a).pop();
    return o || (o = {
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
    }, n.push(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = ma(null, {
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
    const n = this.getDatasetMeta(t);
    return typeof n.hidden == "boolean" ? !n.hidden : !a.hidden;
  }
  setDatasetVisibility(t, a) {
    const n = this.getDatasetMeta(t);
    n.hidden = !a;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, a, n) {
    const o = n ? "show" : "hide", s = this.getDatasetMeta(t), i = s.controller._resolveAnimations(void 0, o);
    Ya(a) ? (s.data[a].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), i.update(s, {
      visible: n
    }), this.update((l) => l.datasetIndex === t ? o : void 0));
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
    for (this.stop(), Ot.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ls(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete Cn[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, a = this.platform, n = (s, i) => {
      a.addEventListener(this, s, i), t[s] = i;
    }, o = (s, i, l) => {
      s.offsetX = i, s.offsetY = l, this._eventHandler(s);
    };
    Ee(this.options.events, (s) => n(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, a = this.platform, n = (r, c) => {
      a.addEventListener(this, r, c), t[r] = c;
    }, o = (r, c) => {
      t[r] && (a.removeEventListener(this, r, c), delete t[r]);
    }, s = (r, c) => {
      this.canvas && this.resize(r, c);
    };
    let i;
    const l = () => {
      o("attach", l), this.attached = !0, this.resize(), n("resize", s), n("detach", i);
    };
    i = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), n("attach", l);
    }, a.isAttached(this.canvas) ? l() : i();
  }
  unbindEvents() {
    Ee(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, Ee(this._responsiveListeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, a, n) {
    const o = n ? "set" : "remove";
    let s, i, l, r;
    for (a === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const a = this._active || [], n = t.map(({ datasetIndex: s, index: i }) => {
      const l = this.getDatasetMeta(s);
      if (!l)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
        element: l.data[i],
        index: i
      };
    });
    !Mn(n, a) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, a));
  }
  notifyPlugins(t, a, n) {
    return this._plugins.notify(this, t, a, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, n) {
    const o = this.options.hover, s = (r, c) => r.filter((u) => !c.some((f) => u.datasetIndex === f.datasetIndex && u.index === f.index)), i = s(a, t), l = n ? t : s(t, a);
    i.length && this.updateHoverStyle(i, o.mode, !1), l.length && o.mode && this.updateHoverStyle(l, o.mode, !0);
  }
  _eventHandler(t, a) {
    const n = {
      event: t,
      replay: a,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, o = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, o) === !1)
      return;
    const s = this._handleEvent(t, a, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, o), (s || n.changed) && this.render(), this;
  }
  _handleEvent(t, a, n) {
    const { _active: o = [], options: s } = this, i = a, l = this._getActiveElements(t, o, n, i), r = Or(t), c = zu(t, this._lastEvent, n, r);
    n && (this._lastEvent = null, je(s.onHover, [
      t,
      l,
      this
    ], this), r && je(s.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Mn(l, o);
    return (u || a) && (this._active = l, this._updateHoverStyles(l, o, a)), this._lastEvent = c, u;
  }
  _getActiveElements(t, a, n, o) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return a;
    const s = this.options.hover;
    return this.getElementsAtEventForMode(t, s.mode, s, o);
  }
};
function js() {
  return Ee(aa.instances, (e) => e._plugins.invalidate());
}
function ju(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: u } = r, f = Math.min(c / i, St(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + f / 2, a - f / 2), l > 0) {
    const h = Math.min(c / l, St(n - a));
    e.arc(o, s, l + c / 2, a - h / 2, n + h / 2, !0);
  } else {
    const h = Math.min(c / 2, i * St(n - a));
    if (u === "round")
      e.arc(o, s, h, a - Oe / 2, n + Oe / 2, !0);
    else if (u === "bevel") {
      const v = 2 * h * h, m = -v * Math.cos(a + Oe / 2) + o, b = -v * Math.sin(a + Oe / 2) + s, p = v * Math.cos(n + Oe / 2) + o, y = v * Math.sin(n + Oe / 2) + s;
      e.lineTo(m, b), e.lineTo(p, y);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Hu(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, n - c, a + c), r > o ? (c = o / r, e.arc(s, i, r, a + c, n - c, !0)) : e.arc(s, i, o, a + Qe, n - Qe), e.closePath(), e.clip();
}
function Wu(e) {
  return Ao(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Ku(e, t, a, n) {
  const o = Wu(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), l = (r) => {
    const c = (a - Math.min(s, r)) * n / 2;
    return it(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: it(o.innerStart, 0, i),
    innerEnd: it(o.innerEnd, 0, i)
  };
}
function ba(e, t, a, n) {
  return {
    x: a + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function Rn(e, t, a, n, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: u } = t, f = Math.max(t.outerRadius + n + a - c, 0), h = u > 0 ? u + n + a + c : 0;
  let v = 0;
  const m = o - r;
  if (n) {
    const H = u > 0 ? u - n : 0, Q = f > 0 ? f - n : 0, re = (H + Q) / 2, ue = re !== 0 ? m * re / (re + n) : m;
    v = (m - ue) / 2;
  }
  const b = Math.max(1e-3, m * f - a / Oe) / f, p = (m - b) / 2, y = r + p + v, k = o - p - v, { outerStart: _, outerEnd: w, innerStart: $, innerEnd: D } = Ku(t, h, f, k - y), M = f - _, F = f - w, z = y + _ / M, W = k - w / F, S = h + $, L = h + D, B = y + $ / S, j = k - D / L;
  if (e.beginPath(), s) {
    const H = (z + W) / 2;
    if (e.arc(i, l, f, z, H), e.arc(i, l, f, H, W), w > 0) {
      const X = ba(F, W, i, l);
      e.arc(X.x, X.y, w, W, k + Qe);
    }
    const Q = ba(L, k, i, l);
    if (e.lineTo(Q.x, Q.y), D > 0) {
      const X = ba(L, j, i, l);
      e.arc(X.x, X.y, D, k + Qe, j + Math.PI);
    }
    const re = (k - D / h + (y + $ / h)) / 2;
    if (e.arc(i, l, h, k - D / h, re, !0), e.arc(i, l, h, re, y + $ / h, !0), $ > 0) {
      const X = ba(S, B, i, l);
      e.arc(X.x, X.y, $, B + Math.PI, y - Qe);
    }
    const ue = ba(M, y, i, l);
    if (e.lineTo(ue.x, ue.y), _ > 0) {
      const X = ba(M, z, i, l);
      e.arc(X.x, X.y, _, y - Qe, z);
    }
  } else {
    e.moveTo(i, l);
    const H = Math.cos(z) * f + i, Q = Math.sin(z) * f + l;
    e.lineTo(H, Q);
    const re = Math.cos(W) * f + i, ue = Math.sin(W) * f + l;
    e.lineTo(re, ue);
  }
  e.closePath();
}
function Uu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (s) {
    Rn(e, t, a, n, r, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ue || Ue));
  }
  return Rn(e, t, a, n, r, o), e.fill(), r;
}
function Yu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: u, borderDash: f, borderDashOffset: h, borderRadius: v } = r, m = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(f || []), e.lineDashOffset = h, m ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (s) {
    Rn(e, t, a, n, b, o);
    for (let p = 0; p < s; ++p)
      e.stroke();
    isNaN(l) || (b = i + (l % Ue || Ue));
  }
  m && Hu(e, t, b), r.selfJoin && b - i >= Oe && v === 0 && u !== "miter" && ju(e, t, b), s || (Rn(e, t, a, n, b, o), e.stroke());
}
class qu extends Ut {
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
  inRange(t, a, n) {
    const o = this.getProps([
      "x",
      "y"
    ], n), { angle: s, distance: i } = Vi(o, {
      x: t,
      y: a
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), h = (this.options.spacing + this.options.borderWidth) / 2, v = Ae(f, r - l), m = Xa(s, l, r) && l !== r, b = v >= Ue || m, p = Zt(i, c + h, u + h);
    return b && p;
  }
  getCenterPoint(t) {
    const { x: a, y: n, startAngle: o, endAngle: s, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, u = (o + s) / 2, f = (i + l + c + r) / 2;
    return {
      x: a + Math.cos(u) * f,
      y: n + Math.sin(u) * f
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: a, circumference: n } = this, o = (a.offset || 0) / 4, s = (a.spacing || 0) / 2, i = a.circular;
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > Ue ? Math.floor(n / Ue) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(Oe, n || 0)), c = o * r;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Uu(t, this, c, s, i), Yu(t, this, c, s, i), t.restore();
  }
}
function fl(e, t, a = t) {
  e.lineCap = Ae(a.borderCapStyle, t.borderCapStyle), e.setLineDash(Ae(a.borderDash, t.borderDash)), e.lineDashOffset = Ae(a.borderDashOffset, t.borderDashOffset), e.lineJoin = Ae(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = Ae(a.borderWidth, t.borderWidth), e.strokeStyle = Ae(a.borderColor, t.borderColor);
}
function Xu(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Gu(e) {
  return e.stepped ? uc : e.tension || e.cubicInterpolationMode === "monotone" ? hc : Xu;
}
function gl(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), u = o < i && s < i || o > l && s > l;
  return {
    count: n,
    start: r,
    loop: t.loop,
    ilen: c < r && !u ? n + c - r : c - r
  };
}
function Zu(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = gl(o, a, n), u = Gu(s);
  let { move: f = !0, reverse: h } = n || {}, v, m, b;
  for (v = 0; v <= c; ++v)
    m = o[(l + (h ? c - v : v)) % i], !m.skip && (f ? (e.moveTo(m.x, m.y), f = !1) : u(e, b, m, h, s.stepped), b = m);
  return r && (m = o[(l + (h ? c : 0)) % i], u(e, b, m, h, s.stepped)), !!r;
}
function Qu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: l } = gl(o, a, n), { move: r = !0, reverse: c } = n || {};
  let u = 0, f = 0, h, v, m, b, p, y;
  const k = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    b !== p && (e.lineTo(u, p), e.lineTo(u, b), e.lineTo(u, y));
  };
  for (r && (v = o[k(0)], e.moveTo(v.x, v.y)), h = 0; h <= l; ++h) {
    if (v = o[k(h)], v.skip)
      continue;
    const w = v.x, $ = v.y, D = w | 0;
    D === m ? ($ < b ? b = $ : $ > p && (p = $), u = (f * u + w) / ++f) : (_(), e.lineTo(w, $), m = D, f = 0, b = p = $), y = $;
  }
  _();
}
function go(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Qu : Zu;
}
function Ju(e) {
  return e.stepped ? Wc : e.tension || e.cubicInterpolationMode === "monotone" ? Kc : da;
}
function eh(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), fl(e, t.options), e.stroke(o);
}
function th(e, t, a, n) {
  const { segments: o, options: s } = t, i = go(t);
  for (const l of o)
    fl(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const ah = typeof Path2D == "function";
function nh(e, t, a, n) {
  ah && !t.options.segment ? eh(e, t, a, n) : th(e, t, a, n);
}
class oh extends Ut {
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
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const o = n.spanGaps ? this._loop : this._fullLoop;
      Ec(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Jc(this, this.options.segment));
  }
  first() {
    const t = this.segments, a = this.points;
    return t.length && a[t[0].start];
  }
  last() {
    const t = this.segments, a = this.points, n = t.length;
    return n && a[t[n - 1].end];
  }
  interpolate(t, a) {
    const n = this.options, o = t[a], s = this.points, i = Gc(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = Ju(n);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: f, end: h } = i[c], v = s[f], m = s[h];
      if (v === m) {
        l.push(v);
        continue;
      }
      const b = Math.abs((o - v[a]) / (m[a] - v[a])), p = r(v, m, b, n.stepped);
      p[a] = t[a], l.push(p);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, a, n) {
    return go(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = go(this);
    let i = this._loop;
    a = a || 0, n = n || this.points.length - a;
    for (const l of o)
      i &= s(t, this, l, {
        start: a,
        end: a + n - 1
      });
    return !!i;
  }
  draw(t, a, n, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (t.save(), nh(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Hs(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class sh extends Ut {
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
  inRange(t, a, n) {
    const o = this.options, { x: s, y: i } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(t - s, 2) + Math.pow(a - i, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(t, a) {
    return Hs(this, t, "x", a);
  }
  inYRange(t, a) {
    return Hs(this, t, "y", a);
  }
  getCenterPoint(t) {
    const { x: a, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: a,
      y: n
    };
  }
  size(t) {
    t = t || this.options || {};
    let a = t.radius || 0;
    a = Math.max(a, a && t.hoverRadius || 0);
    const n = a && t.borderWidth || 0;
    return (a + n) * 2;
  }
  draw(t, a) {
    const n = this.options;
    this.skip || n.radius < 0.1 || !Ga(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, uo(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function ml(e, t) {
  const { x: a, y: n, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, u, f;
  return e.horizontal ? (f = i / 2, l = Math.min(a, o), r = Math.max(a, o), c = n - f, u = n + f) : (f = s / 2, l = a - f, r = a + f, c = Math.min(n, o), u = Math.max(n, o)), {
    left: l,
    top: c,
    right: r,
    bottom: u
  };
}
function Jt(e, t, a, n) {
  return e ? 0 : it(t, a, n);
}
function ih(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = Ui(n);
  return {
    t: Jt(o.top, s.top, 0, a),
    r: Jt(o.right, s.right, 0, t),
    b: Jt(o.bottom, s.bottom, 0, a),
    l: Jt(o.left, s.left, 0, t)
  };
}
function lh(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = wa(o), i = Math.min(t, a), l = e.borderSkipped, r = n || Le(o);
  return {
    topLeft: Jt(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Jt(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Jt(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Jt(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function rh(e) {
  const t = ml(e), a = t.right - t.left, n = t.bottom - t.top, o = ih(e, a / 2, n / 2), s = lh(e, a / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: a,
      h: n,
      radius: s
    },
    inner: {
      x: t.left + o.l,
      y: t.top + o.t,
      w: a - o.l - o.r,
      h: n - o.t - o.b,
      radius: {
        topLeft: Math.max(0, s.topLeft - Math.max(o.t, o.l)),
        topRight: Math.max(0, s.topRight - Math.max(o.t, o.r)),
        bottomLeft: Math.max(0, s.bottomLeft - Math.max(o.b, o.l)),
        bottomRight: Math.max(0, s.bottomRight - Math.max(o.b, o.r))
      }
    }
  };
}
function Qn(e, t, a, n) {
  const o = t === null, s = a === null, l = e && !(o && s) && ml(e, n);
  return l && (o || Zt(t, l.left, l.right)) && (s || Zt(a, l.top, l.bottom));
}
function ch(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function dh(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Jn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, o = e.y !== a.y ? -t : 0, s = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - o;
  return {
    x: e.x + n,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class uh extends Ut {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = rh(this), l = ch(i.radius) ? Tn : dh;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, Jn(i, a, s)), t.clip(), l(t, Jn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), l(t, Jn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return Qn(this, t, a, n);
  }
  inXRange(t, a) {
    return Qn(this, t, null, a);
  }
  inYRange(t, a) {
    return Qn(this, null, t, a);
  }
  getCenterPoint(t) {
    const { x: a, y: n, base: o, horizontal: s } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: s ? (a + o) / 2 : a,
      y: s ? n : (n + o) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
const Ws = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, hh = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Ks extends Ut {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, a, n) {
    this.maxWidth = t, this.maxHeight = a, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let a = je(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (a = a.filter((n) => t.filter(n, this.chart.data))), t.sort && (a = a.sort((n, o) => t.sort(n, o, this.chart.data))), this.options.reverse && a.reverse(), this.legendItems = a;
  }
  fit() {
    const { options: t, ctx: a } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, o = lt(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = Ws(n, s);
    let c, u;
    a.font = o.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, s, l, r) + 10) : (u = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = o + l;
    let f = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let h = -1, v = -u;
    return this.legendItems.forEach((m, b) => {
      const p = n + a / 2 + s.measureText(m.text).width;
      (b === 0 || c[c.length - 1] + p + 2 * l > i) && (f += u, c[c.length - (b > 0 ? 0 : 1)] = 0, v += u, h++), r[b] = {
        left: 0,
        top: v,
        row: h,
        width: p,
        height: o
      }, c[c.length - 1] += p + l;
    }), f;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let f = l, h = 0, v = 0, m = 0, b = 0;
    return this.legendItems.forEach((p, y) => {
      const { itemWidth: k, itemHeight: _ } = fh(n, a, s, p, o);
      y > 0 && v + _ + 2 * l > u && (f += h + l, c.push({
        width: h,
        height: v
      }), m += h + l, b++, h = v = 0), r[y] = {
        left: m,
        top: v,
        col: b,
        width: k,
        height: _
      }, h = Math.max(h, k), v += _ + l;
    }), f += h, c.push({
      width: h,
      height: v
    }), f;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: n, labels: { padding: o }, rtl: s } } = this, i = Ca(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = nt(n, this.left + o, this.right - this.lineWidths[l]);
      for (const c of a)
        l !== c.row && (l = c.row, r = nt(n, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = nt(n, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of a)
        c.col !== l && (l = c.col, r = nt(n, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Mo(t, this), this._draw(), Do(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, l = qe.color, r = Ca(t.rtl, this.left, this.width), c = lt(i.font), { padding: u } = i, f = c.size, h = f / 2;
    let v;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: m, boxHeight: b, itemHeight: p } = Ws(i, f), y = function(D, M, F) {
      if (isNaN(m) || m <= 0 || isNaN(b) || b < 0)
        return;
      o.save();
      const z = Ae(F.lineWidth, 1);
      if (o.fillStyle = Ae(F.fillStyle, l), o.lineCap = Ae(F.lineCap, "butt"), o.lineDashOffset = Ae(F.lineDashOffset, 0), o.lineJoin = Ae(F.lineJoin, "miter"), o.lineWidth = z, o.strokeStyle = Ae(F.strokeStyle, l), o.setLineDash(Ae(F.lineDash, [])), i.usePointStyle) {
        const W = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: F.pointStyle,
          rotation: F.rotation,
          borderWidth: z
        }, S = r.xPlus(D, m / 2), L = M + h;
        Ki(o, W, S, L, i.pointStyleWidth && m);
      } else {
        const W = M + Math.max((f - b) / 2, 0), S = r.leftForLtr(D, m), L = wa(F.borderRadius);
        o.beginPath(), Object.values(L).some((B) => B !== 0) ? Tn(o, {
          x: S,
          y: W,
          w: m,
          h: b,
          radius: L
        }) : o.rect(S, W, m, b), o.fill(), z !== 0 && o.stroke();
      }
      o.restore();
    }, k = function(D, M, F) {
      Za(o, F.text, D, M + p / 2, c, {
        strikethrough: F.hidden,
        textAlign: r.textAlign(F.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? v = {
      x: nt(s, this.left + u, this.right - n[0]),
      y: this.top + u + w,
      line: 0
    } : v = {
      x: this.left + u,
      y: nt(s, this.top + w + u, this.bottom - a[0].height),
      line: 0
    }, Qi(this.ctx, t.textDirection);
    const $ = p + u;
    this.legendItems.forEach((D, M) => {
      o.strokeStyle = D.fontColor, o.fillStyle = D.fontColor;
      const F = o.measureText(D.text).width, z = r.textAlign(D.textAlign || (D.textAlign = i.textAlign)), W = m + h + F;
      let S = v.x, L = v.y;
      r.setWidth(this.width), _ ? M > 0 && S + W + u > this.right && (L = v.y += $, v.line++, S = v.x = nt(s, this.left + u, this.right - n[v.line])) : M > 0 && L + $ > this.bottom && (S = v.x = S + a[v.line].width + u, v.line++, L = v.y = nt(s, this.top + w + u, this.bottom - a[v.line].height));
      const B = r.x(S);
      if (y(B, L, D), S = Qr(z, S + m + h, _ ? S + W : this.right, t.rtl), k(r.x(S), L, D), _)
        v.x += W + u;
      else if (typeof D.text != "string") {
        const j = c.lineHeight;
        v.y += pl(D, j) + u;
      } else
        v.y += $;
    }), Ji(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = lt(a.font), o = Ct(a.padding);
    if (!a.display)
      return;
    const s = Ca(t.rtl, this.left, this.width), i = this.ctx, l = a.position, r = n.size / 2, c = o.top + r;
    let u, f = this.left, h = this.width;
    if (this.isHorizontal())
      h = Math.max(...this.lineWidths), u = this.top + c, f = nt(t.align, f, this.right - h);
    else {
      const m = this.columnSizes.reduce((b, p) => Math.max(b, p.height), 0);
      u = c + nt(t.align, this.top, this.bottom - m - t.labels.padding - this._computeTitleHeight());
    }
    const v = nt(l, f, f + h);
    i.textAlign = s.textAlign(Co(l)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Za(i, a.text, v, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = lt(t.font), n = Ct(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, o, s;
    if (Zt(t, this.left, this.right) && Zt(a, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, n = 0; n < s.length; ++n)
        if (o = s[n], Zt(t, o.left, o.left + o.width) && Zt(a, o.top, o.top + o.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!ph(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = hh(o, n);
      o && !s && je(a.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = n, n && !s && je(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && je(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function fh(e, t, a, n, o) {
  const s = gh(n, e, t, a), i = mh(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function gh(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function mh(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = pl(t, a)), n;
}
function pl(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function ph(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Eo = {
  id: "legend",
  _element: Ks,
  start(e, t, a) {
    const n = e.legend = new Ks({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    xt.configure(e, n, a), xt.addBox(e, n);
  },
  stop(e) {
    xt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const n = e.legend;
    xt.configure(e, n, a), n.options = a;
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
      const n = t.datasetIndex, o = a.chart;
      o.isDatasetVisible(n) ? (o.hide(n), t.hidden = !0) : (o.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(a ? 0 : void 0), u = Ct(c.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
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
class vl extends Ut {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, a) {
    const n = this.options;
    if (this.left = 0, this.top = 0, !n.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = a;
    const o = Ze(n.text) ? n.text.length : 1;
    this._padding = Ct(n.padding);
    const s = o * lt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: n, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, u, f;
    return this.isHorizontal() ? (u = nt(l, n, s), f = a + t, c = s - n) : (i.position === "left" ? (u = n + t, f = nt(l, o, a), r = Oe * -0.5) : (u = s - t, f = nt(l, a, o), r = Oe * 0.5), c = o - a), {
      titleX: u,
      titleY: f,
      maxWidth: c,
      rotation: r
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const n = lt(a.font), s = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Za(t, a.text, 0, 0, n, {
      color: a.color,
      maxWidth: r,
      rotation: c,
      textAlign: Co(a.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function vh(e, t) {
  const a = new vl({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  xt.configure(e, a, t), xt.addBox(e, a), e.titleBlock = a;
}
var bl = {
  id: "title",
  _element: vl,
  start(e, t, a) {
    vh(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    xt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const n = e.titleBlock;
    xt.configure(e, n, a), n.options = a;
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
const Na = {
  average(e) {
    if (!e.length)
      return !1;
    let t, a, n = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, a = e.length; t < a; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        n.add(r.x), o += r.y, ++s;
      }
    }
    return s === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((l, r) => l + r) / n.size,
      y: o / s
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let a = t.x, n = t.y, o = Number.POSITIVE_INFINITY, s, i, l;
    for (s = 0, i = e.length; s < i; ++s) {
      const r = e[s].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), u = ro(t, c);
        u < o && (o = u, l = r);
      }
    }
    if (l) {
      const r = l.tooltipPosition();
      a = r.x, n = r.y;
    }
    return {
      x: a,
      y: n
    };
  }
};
function Lt(e, t) {
  return t && (Ze(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Vt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function bh(e, t) {
  const { element: a, datasetIndex: n, index: o } = t, s = e.getDatasetMeta(n).controller, { label: i, value: l } = s.getLabelAndValue(o);
  return {
    chart: e,
    label: i,
    parsed: s.getParsed(o),
    raw: e.data.datasets[n].data[o],
    formattedValue: l,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: n,
    element: a
  };
}
function Us(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = lt(t.bodyFont), c = lt(t.titleFont), u = lt(t.footerFont), f = s.length, h = o.length, v = n.length, m = Ct(t.padding);
  let b = m.height, p = 0, y = n.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (y += e.beforeBody.length + e.afterBody.length, f && (b += f * c.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    b += v * w + (y - v) * r.lineHeight + (y - 1) * t.bodySpacing;
  }
  h && (b += t.footerMarginTop + h * u.lineHeight + (h - 1) * t.footerSpacing);
  let k = 0;
  const _ = function(w) {
    p = Math.max(p, a.measureText(w).width + k);
  };
  return a.save(), a.font = c.string, Ee(e.title, _), a.font = r.string, Ee(e.beforeBody.concat(e.afterBody), _), k = t.displayColors ? i + 2 + t.boxPadding : 0, Ee(n, (w) => {
    Ee(w.before, _), Ee(w.lines, _), Ee(w.after, _);
  }), k = 0, a.font = u.string, Ee(e.footer, _), a.restore(), p += m.width, {
    width: p,
    height: b
  };
}
function yh(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function xh(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function kh(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return n === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), xh(c, e, t, a) && (c = "center"), c;
}
function Ys(e, t, a) {
  const n = a.yAlign || t.yAlign || yh(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || kh(e, t, a, n),
    yAlign: n
  };
}
function _h(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function wh(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function qs(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = a, c = o + s, { topLeft: u, topRight: f, bottomLeft: h, bottomRight: v } = wa(i);
  let m = _h(t, l);
  const b = wh(t, r, c);
  return r === "center" ? l === "left" ? m += c : l === "right" && (m -= c) : l === "left" ? m -= Math.max(u, h) + o : l === "right" && (m += Math.max(f, v) + o), {
    x: it(m, 0, n.width - t.width),
    y: it(b, 0, n.height - t.height)
  };
}
function vn(e, t, a) {
  const n = Ct(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Xs(e) {
  return Lt([], Vt(e));
}
function Ch(e, t, a) {
  return ma(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function Gs(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const yl = {
  beforeTitle: Ft,
  title(e) {
    if (e.length > 0) {
      const t = e[0], a = t.chart.data.labels, n = a ? a.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (n > 0 && t.dataIndex < n)
        return a[t.dataIndex];
    }
    return "";
  },
  afterTitle: Ft,
  beforeBody: Ft,
  beforeLabel: Ft,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return Ie(a) || (t += a), t;
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
  afterLabel: Ft,
  afterBody: Ft,
  beforeFooter: Ft,
  footer: Ft,
  afterFooter: Ft
};
function ht(e, t, a, n) {
  const o = e[t].call(a, n);
  return typeof o > "u" ? yl[t].call(a, n) : o;
}
class Zs extends Ut {
  static positioners = Na;
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new tl(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Ch(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = ht(n, "beforeTitle", this, t), s = ht(n, "title", this, t), i = ht(n, "afterTitle", this, t);
    let l = [];
    return l = Lt(l, Vt(o)), l = Lt(l, Vt(s)), l = Lt(l, Vt(i)), l;
  }
  getBeforeBody(t, a) {
    return Xs(ht(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Ee(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Gs(n, s);
      Lt(i.before, Vt(ht(l, "beforeLabel", this, s))), Lt(i.lines, ht(l, "label", this, s)), Lt(i.after, Vt(ht(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Xs(ht(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = ht(n, "beforeFooter", this, t), s = ht(n, "footer", this, t), i = ht(n, "afterFooter", this, t);
    let l = [];
    return l = Lt(l, Vt(o)), l = Lt(l, Vt(s)), l = Lt(l, Vt(i)), l;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = a.length; r < c; ++r)
      l.push(bh(this.chart, a[r]));
    return t.filter && (l = l.filter((u, f, h) => t.filter(u, f, h, n))), t.itemSort && (l = l.sort((u, f) => t.itemSort(u, f, n))), Ee(l, (u) => {
      const f = Gs(t.callbacks, u);
      o.push(ht(f, "labelColor", this, u)), s.push(ht(f, "labelPointStyle", this, u)), i.push(ht(f, "labelTextColor", this, u));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, a) {
    const n = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const l = Na[n.position].call(this, o, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const r = this._size = Us(this, n), c = Object.assign({}, l, r), u = Ys(this.chart, n, c), f = qs(n, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, s = {
        opacity: 1,
        x: f.x,
        y: f.y,
        width: r.width,
        height: r.height,
        caretX: l.x,
        caretY: l.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, s && this._resolveAnimations().update(this, s), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: a
    });
  }
  drawCaret(t, a, n, o) {
    const s = this.getCaretPosition(t, n, o);
    a.lineTo(s.x1, s.y1), a.lineTo(s.x2, s.y2), a.lineTo(s.x3, s.y3);
  }
  getCaretPosition(t, a, n) {
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = n, { topLeft: r, topRight: c, bottomLeft: u, bottomRight: f } = wa(l), { x: h, y: v } = t, { width: m, height: b } = a;
    let p, y, k, _, w, $;
    return s === "center" ? (w = v + b / 2, o === "left" ? (p = h, y = p - i, _ = w + i, $ = w - i) : (p = h + m, y = p + i, _ = w - i, $ = w + i), k = p) : (o === "left" ? y = h + Math.max(r, u) + i : o === "right" ? y = h + m - Math.max(c, f) - i : y = this.caretX, s === "top" ? (_ = v, w = _ - i, p = y - i, k = y + i) : (_ = v + b, w = _ + i, p = y + i, k = y - i), $ = _), {
      x1: p,
      x2: y,
      x3: k,
      y1: _,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, a, n) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = Ca(n.rtl, this.x, this.width);
      for (t.x = vn(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = lt(n.titleFont), l = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, r = 0; r < s; ++r)
        a.fillText(o[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === s && (t.y += n.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, a, n, o, s) {
    const i = this.labelColors[n], l = this.labelPointStyles[n], { boxHeight: r, boxWidth: c } = s, u = lt(s.bodyFont), f = vn(this, "left", s), h = o.x(f), v = r < u.lineHeight ? (u.lineHeight - r) / 2 : 0, m = a.y + v;
    if (s.usePointStyle) {
      const b = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, p = o.leftForLtr(h, c) + c / 2, y = m + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, uo(t, b, p, y), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, uo(t, b, p, y);
    } else {
      t.lineWidth = Le(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = o.leftForLtr(h, c), p = o.leftForLtr(o.xPlus(h, 1), c - 2), y = wa(i.borderRadius);
      Object.values(y).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, Tn(t, {
        x: b,
        y: m,
        w: c,
        h: r,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Tn(t, {
        x: p,
        y: m + 1,
        w: c - 2,
        h: r - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(b, m, c, r), t.strokeRect(b, m, c, r), t.fillStyle = i.backgroundColor, t.fillRect(p, m + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: u } = n, f = lt(n.bodyFont);
    let h = f.lineHeight, v = 0;
    const m = Ca(n.rtl, this.x, this.width), b = function(F) {
      a.fillText(F, m.x(t.x + v), t.y + h / 2), t.y += h + s;
    }, p = m.textAlign(i);
    let y, k, _, w, $, D, M;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = f.string, t.x = vn(this, p, n), a.fillStyle = n.bodyColor, Ee(this.beforeBody, b), v = l && p !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, w = 0, D = o.length; w < D; ++w) {
      for (y = o[w], k = this.labelTextColors[w], a.fillStyle = k, Ee(y.before, b), _ = y.lines, l && _.length && (this._drawColorBox(a, t, w, m, n), h = Math.max(f.lineHeight, r)), $ = 0, M = _.length; $ < M; ++$)
        b(_[$]), h = f.lineHeight;
      Ee(y.after, b);
    }
    v = 0, h = f.lineHeight, Ee(this.afterBody, b), t.y -= s;
  }
  drawFooter(t, a, n) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = Ca(n.rtl, this.x, this.width);
      for (t.x = vn(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = r.textAlign(n.footerAlign), a.textBaseline = "middle", i = lt(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, l = 0; l < s; ++l)
        a.fillText(o[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, a, n, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: u } = n, { topLeft: f, topRight: h, bottomLeft: v, bottomRight: m } = wa(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(l + f, r), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(l + c - h, r), a.quadraticCurveTo(l + c, r, l + c, r + h), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(l + c, r + u - m), a.quadraticCurveTo(l + c, r + u, l + c - m, r + u), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(l + v, r + u), a.quadraticCurveTo(l, r + u, l, r + u - v), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(l, r + f), a.quadraticCurveTo(l, r, l + f, r), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Na[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = Us(this, t), r = Object.assign({}, i, this._size), c = Ys(a, t, r), u = qs(t, r, c, a);
      (o._to !== u.x || s._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const a = this.options.setContext(this.getContext());
    let n = this.opacity;
    if (!n)
      return;
    this._updateAnimationTarget(a);
    const o = {
      width: this.width,
      height: this.height
    }, s = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const i = Ct(a.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && l && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), Qi(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Ji(t, a.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, a) {
    const n = this._active, o = t.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), s = !Mn(n, o), i = this._positionChanged(o, a);
    (s || i) && (this._active = o, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, n = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, a, n), l = this._positionChanged(i, t), r = a || !Mn(i, s) || l;
    return r && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, a))), r;
  }
  _getActiveElements(t, a, n, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!o)
      return a.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, s.mode, s, n);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(t, a) {
    const { caretX: n, caretY: o, options: s } = this, i = Na[s.position].call(this, t, a);
    return i !== !1 && (n !== i.x || o !== i.y);
  }
}
var Fo = {
  id: "tooltip",
  _element: Zs,
  positioners: Na,
  afterInit(e, t, a) {
    a && (e.tooltip = new Zs({
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
    callbacks: yl
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
const $h = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function Sh(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return $h(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const Mh = (e, t) => e === null ? null : it(Math.round(e), 0, t);
function Qs(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class xl extends Aa {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Qs
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const a = this._addedLabels;
    if (a.length) {
      const n = this.getLabels();
      for (const { index: o, label: s } of a)
        n[o] === s && n.splice(o, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, a) {
    if (Ie(t))
      return null;
    const n = this.getLabels();
    return a = isFinite(a) && n[a] === t ? a : Sh(n, t, Ae(a, t), this._addedLabels), Mh(a, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: a } = this.getUserBounds();
    let { min: n, max: o } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), a || (o = this.getLabels().length - 1)), this.min = n, this.max = o;
  }
  buildTicks() {
    const t = this.min, a = this.max, n = this.options.offset, o = [];
    let s = this.getLabels();
    s = t === 0 && a === s.length - 1 ? s : s.slice(t, a + 1), this._valueRange = Math.max(s.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let i = t; i <= a; i++)
      o.push({
        value: i
      });
    return o;
  }
  getLabelForValue(t) {
    return Qs.call(this, t);
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
function Dh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: u, maxDigits: f, includeBounds: h } = e, v = s || 1, m = u - 1, { min: b, max: p } = t, y = !Ie(i), k = !Ie(l), _ = !Ie(c), w = (p - b) / (f + 1);
  let $ = Jo((p - b) / m / v) * v, D, M, F, z;
  if ($ < 1e-14 && !y && !k)
    return [
      {
        value: b
      },
      {
        value: p
      }
    ];
  z = Math.ceil(p / $) - Math.floor(b / $), z > m && ($ = Jo(z * $ / m / v) * v), Ie(r) || (D = Math.pow(10, r), $ = Math.ceil($ * D) / D), o === "ticks" ? (M = Math.floor(b / $) * $, F = Math.ceil(p / $) * $) : (M = b, F = p), y && k && s && Hr((l - i) / s, $ / 1e3) ? (z = Math.round(Math.min((l - i) / $, u)), $ = (l - i) / z, M = i, F = l) : _ ? (M = y ? i : M, F = k ? l : F, z = c - 1, $ = (F - M) / z) : (z = (F - M) / $, ja(z, Math.round(z), $ / 1e3) ? z = Math.round(z) : z = Math.ceil(z));
  const W = Math.max(es($), es(M));
  D = Math.pow(10, Ie(r) ? W : r), M = Math.round(M * D) / D, F = Math.round(F * D) / D;
  let S = 0;
  for (y && (h && M !== i ? (a.push({
    value: i
  }), M < i && S++, ja(Math.round((M + S * $) * D) / D, i, Js(i, w, e)) && S++) : M < i && S++); S < z; ++S) {
    const L = Math.round((M + S * $) * D) / D;
    if (k && L > l)
      break;
    a.push({
      value: L
    });
  }
  return k && h && F !== l ? a.length && ja(a[a.length - 1].value, l, Js(l, w, e)) ? a[a.length - 1].value = l : a.push({
    value: l
  }) : (!k || F === l) && a.push({
    value: F
  }), a;
}
function Js(e, t, { horizontal: a, minRotation: n }) {
  const o = zt(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class Ah extends Aa {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return Ie(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: n } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = a ? o : r, l = (r) => s = n ? s : r;
    if (t) {
      const r = It(o), c = It(s);
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
    let { maxTicksLimit: a, stepSize: n } = t, o;
    return n ? (o = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, o > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${o} ticks. Limiting to 1000.`), o = 1e3)) : (o = this.computeTickLimit(), a = a || 11), a && (o = Math.min(a, o)), o;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, a = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const o = {
      maxTicks: n,
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
    }, s = this._range || this, i = Dh(o, s);
    return t.bounds === "ticks" && Wr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let a = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const o = (n - a) / Math.max(t.length - 1, 1) / 2;
      a -= o, n += o;
    }
    this._startValue = a, this._endValue = n, this._valueRange = n - a;
  }
  getLabelForValue(t) {
    return So(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class kl extends Ah {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Wi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = wt(t) ? t : 0, this.max = wt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = zt(this.options.ticks.minRotation), o = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Vn = {
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
}, gt = /* @__PURE__ */ Object.keys(Vn);
function ei(e, t) {
  return e - t;
}
function ti(e, t) {
  if (Ie(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), wt(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (qa(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function ai(e, t, a, n) {
  const o = gt.length;
  for (let s = gt.indexOf(e); s < o - 1; ++s) {
    const i = Vn[gt[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (l * i.size)) <= n)
      return gt[s];
  }
  return gt[o - 1];
}
function Th(e, t, a, n, o) {
  for (let s = gt.length - 1; s >= gt.indexOf(a); s--) {
    const i = gt[s];
    if (Vn[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return gt[a ? gt.indexOf(a) : 0];
}
function Bh(e) {
  for (let t = gt.indexOf(e) + 1, a = gt.length; t < a; ++t)
    if (Vn[gt[t]].common)
      return gt[t];
}
function ni(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = wo(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function Lh(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, n))
    r = a[l], r >= 0 && (t[r].major = !0);
  return t;
}
function oi(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, n.push({
      value: l,
      major: !1
    });
  return s === 0 || !a ? n : Lh(e, n, o, a);
}
class si extends Aa {
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
    const n = t.time || (t.time = {}), o = this._adapter = new Rd._date(t.adapters.date);
    o.init(a), za(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : ti(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, a = this._adapter, n = t.time.unit || "day";
    let { min: o, max: s, minDefined: i, maxDefined: l } = this.getUserBounds();
    function r(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !l && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), o = wt(o) && !isNaN(o) ? o : +a.startOf(Date.now(), n), s = wt(s) && !isNaN(s) ? s : +a.endOf(Date.now(), n) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let a = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
    return t.length && (a = t[0], n = t[t.length - 1]), {
      min: a,
      max: n
    };
  }
  buildTicks() {
    const t = this.options, a = t.time, n = t.ticks, o = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && o.length && (this.min = this._userMin || o[0], this.max = this._userMax || o[o.length - 1]);
    const s = this.min, i = this.max, l = Xr(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? ai(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : Th(this, l.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Bh(this._unit), this.initOffsets(o), t.reverse && l.reverse(), oi(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, n = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - o : a = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = s : n = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = it(a, 0, i), n = it(n, 0, i), this._offsets = {
      start: a,
      end: n,
      factor: 1 / (a + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || ai(s.minUnit, a, n, this._getLabelCapacity(a)), l = Ae(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = qa(r) || r === !0, u = {};
    let f = a, h, v;
    if (c && (f = +t.startOf(f, "isoWeek", r)), f = +t.startOf(f, c ? "day" : i), t.diff(n, a, i) > 1e5 * l)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + l + " " + i);
    const m = o.ticks.source === "data" && this.getDataTimestamps();
    for (h = f, v = 0; h < n; h = +t.add(h, l, i), v++)
      ni(u, h, m);
    return (h === n || o.bounds === "ticks" || v === 1) && ni(u, h, m), Object.keys(u).sort(ei).map((b) => +b);
  }
  getLabelForValue(t) {
    const a = this._adapter, n = this.options.time;
    return n.tooltipFormat ? a.format(t, n.tooltipFormat) : a.format(t, n.displayFormats.datetime);
  }
  format(t, a) {
    const o = this.options.time.displayFormats, s = this._unit, i = a || o[s];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, a, n, o) {
    const s = this.options, i = s.ticks.callback;
    if (i)
      return je(i, [
        t,
        a,
        n
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, u = r && l[r], f = c && l[c], h = n[a], v = c && f && h && h.major;
    return this._adapter.format(t, o || (v ? f : u));
  }
  generateTickLabels(t) {
    let a, n, o;
    for (a = 0, n = t.length; a < n; ++a)
      o = t[a], o.label = this._tickFormatFunction(o.value, a, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const a = this._offsets, n = this.getDecimalForValue(t);
    return this.getPixelForDecimal((a.start + n) * a.factor);
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(t) {
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = zt(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: n * s + l * i,
      h: n * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, oi(this, [
      t
    ], this._majorUnit), o), i = this._getLabelSize(s), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], a, n;
    if (t.length)
      return t;
    const o = this.getMatchingVisibleMetas();
    if (this._normalized && o.length)
      return this._cache.data = o[0].controller.getAllParsedValues(this);
    for (a = 0, n = o.length; a < n; ++a)
      t = t.concat(o[a].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let a, n;
    if (t.length)
      return t;
    const o = this.getLabels();
    for (a = 0, n = o.length; a < n; ++a)
      t.push(ti(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return zi(t.sort(ei));
  }
}
function bn(e, t, a) {
  let n = 0, o = e.length - 1, s, i, l, r;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ua(e, "pos", t)), { pos: s, time: l } = e[n], { pos: i, time: r } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ua(e, "time", t)), { time: s, pos: l } = e[n], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class $M extends si {
  static id = "timeseries";
  static defaults = si.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = bn(a, this.min), this._tableRange = bn(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: n } = this, o = [], s = [];
    let i, l, r, c, u;
    for (i = 0, l = t.length; i < l; ++i)
      c = t[i], c >= a && c <= n && o.push(c);
    if (o.length < 2)
      return [
        {
          time: a,
          pos: 0
        },
        {
          time: n,
          pos: 1
        }
      ];
    for (i = 0, l = o.length; i < l; ++i)
      u = o[i + 1], r = o[i - 1], c = o[i], Math.round((u + r) / 2) !== c && s.push({
        time: c,
        pos: i / (l - 1)
      });
    return s;
  }
  _generate() {
    const t = this.min, a = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(a) || n.length === 1) && n.push(a), n.sort((o, s) => o - s);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const a = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return a.length && n.length ? t = this.normalize(a.concat(n)) : t = a.length ? a : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (bn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return bn(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const _l = {
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
}, Rh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Ph = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ..._l,
  ...Rh
}, Ih = or[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ya(e) {
  return Ti(e) ? so(e) : e;
}
function Eh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ti(t) ? new Proxy(e, {}) : e;
}
function Fh(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function wl(e, t) {
  e.labels = t;
}
function Cl(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function Oh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return wl(a, e.labels), Cl(a, e.datasets, t), a;
}
const Vh = fe({
  props: Ph,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = ne(null), s = Ai(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: f, plugins: h, datasetIdKey: v } = e, m = Oh(u, v), b = Eh(m, u);
      s.value = new aa(o.value, {
        type: c,
        data: b,
        options: {
          ...f
        },
        plugins: h
      });
    }, l = () => {
      const c = so(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return et(i), at(l), Te([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [f, h] = c, [v, m] = u;
      const b = so(s.value);
      if (!b)
        return;
      let p = !1;
      if (f) {
        const y = ya(f), k = ya(v);
        y && y !== k && (Fh(b, y), p = !0);
      }
      if (h) {
        const y = ya(h.labels), k = ya(m.labels), _ = ya(h.datasets), w = ya(m.datasets);
        y !== k && (wl(b.config.data, y), p = !0), _ && _ !== w && (Cl(b.config.data, _, e.datasetIdKey), p = !0);
      }
      p && We(() => {
        r(b);
      });
    }, {
      deep: !0
    }), () => He("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      He("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function Oo(e, t) {
  return aa.register(t), fe({
    props: _l,
    setup(a, n) {
      let { expose: o } = n;
      const s = Ai(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => He(Vh, Ih({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Nh = /* @__PURE__ */ Oo("bar", Dd), zh = /* @__PURE__ */ Oo("line", Bd), jh = /* @__PURE__ */ Oo("pie", Ld), ii = {
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
}, li = {
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
}, Hh = [
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
  const t = ne("light");
  let a = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? li : ii), l = () => {
    typeof document > "u" || (t.value = n(), a = new MutationObserver((c) => {
      for (const u of c)
        u.attributeName === "class" && (t.value = n());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, r = () => {
    a && (a.disconnect(), a = null);
  };
  return et(() => {
    l();
  }), at(() => {
    r();
  }), e && Te(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: ii,
    darkColors: li,
    chartSeriesColors: Hh
  };
}
const Ja = 5, Vo = 8, Wh = /^x\d*$/, Kh = /^y\d*$/;
function $l(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (Wh.test(o) && (r.maxTicksLimit = Vo, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), Kh.test(o)) {
      if (i.type === "category") {
        i.ticks = r, n[o] = i;
        continue;
      }
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), u = Number(i.max ?? i.suggestedMax ?? 0), f = Number(r.stepSize);
        u > c && f > 0 ? r.maxTicksLimit = Math.floor((u - c) / f) + 1 : r.maxTicksLimit = Ja;
      } else
        r.maxTicksLimit = Ja;
    }
    i.ticks = r, n[o] = i;
  }
  return t.scales = n, t;
}
const ft = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Uh = ["titleFont", "bodyFont", "footerFont"];
function Sl(e, t = ft) {
  if (!e || typeof e != "object") return e;
  const a = { ...e }, n = typeof a.font == "object" && a.font !== null ? a.font : {};
  if (a.font = { ...n, family: t }, a.scales && typeof a.scales == "object") {
    const o = { ...a.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const u = { ...r }, f = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...f, family: t }, l.ticks = u;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const u = { ...c }, f = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...f, family: t }, l.title = u;
      }
      o[s] = l;
    }
    a.scales = o;
  }
  if (a.plugins && typeof a.plugins == "object") {
    const o = { ...a.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const l = { ...s }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, u = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...u, family: t }, l.labels = c;
      }
      o.legend = l;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of Uh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    a.plugins = o;
  }
  return a;
}
const ri = 10, Yh = /* @__PURE__ */ fe({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    uppercaseLegendLabels: { type: Boolean },
    theme: {},
    heightPx: {},
    categoryLabelMaxLength: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(xl, kl, uh, bl, Fo, Eo), aa.defaults.font.family = ft;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data), i = (h) => typeof h == "string" ? h.charAt(0).toUpperCase() + h.slice(1).toLowerCase() : h, l = (h) => typeof h != "string" ? h : a.uppercaseLegendLabels ? h.toUpperCase() : i(h), r = (h, v) => h.length <= v ? h : `${h.slice(0, Math.max(1, v - 1))}…`;
    function c(h, v) {
      if (v == null) return h;
      if (Array.isArray(v) || typeof v != "object" || h == null || Array.isArray(h) || typeof h != "object") return v;
      const m = { ...h };
      for (const b of Object.keys(v)) {
        const p = v[b];
        p !== void 0 && (m[b] = c(h[b], p));
      }
      return m;
    }
    const u = C(() => {
      const h = {
        font: {
          family: ft
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
                family: ft,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: ri,
              boxHeight: ri,
              usePointStyle: !1,
              generateLabels: function(m) {
                return m.data.datasets.map((p, y) => {
                  const k = Array.isArray(p.backgroundColor) ? p.backgroundColor[0] : p.backgroundColor, _ = Array.isArray(p.borderColor) ? p.borderColor[0] : p.borderColor, w = typeof _ == "string" && _.length > 0 ? _ : typeof k == "string" && k.length > 0 ? k : o.value.textSecondary;
                  return {
                    text: l(p.label || ""),
                    fillStyle: typeof k == "string" ? k : w,
                    strokeStyle: w,
                    lineWidth: 0,
                    fontColor: w,
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
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
            bodyColor: n.value ? "#d1d5db" : "#e2e8f0",
            borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: ft,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: ft,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(m) {
                return m.length > 0 ? String(i(m[0].label)) : "";
              },
              label: function(m) {
                let b = String(i(m.dataset.label || ""));
                b && (b += ": ");
                const y = (m.chart?.options?.indexAxis ?? "x") === "y" ? m.parsed.x : m.parsed.y;
                return y != null && (b += y), b;
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
            stacked: a.stacked || !1,
            grid: {
              color: o.value.gridLines
            },
            ticks: {
              maxTicksLimit: Ja,
              font: {
                family: ft,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(m) {
                return i(m);
              }
            }
          },
          x: {
            display: !0,
            stacked: a.stacked || !1,
            offset: !0,
            grid: {
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: Vo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ft,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(m) {
                const b = this.getLabelForValue(m);
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
      }, v = a.options ? c(h, a.options) : h;
      if (v.indexAxis === "y") {
        v.scales = v.scales ?? {}, v.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...v.scales.x
        };
        const { beginAtZero: m, ticks: b, ...p } = v.scales.y ?? {}, y = a.data.labels?.length ?? 0, k = a.categoryLabelMaxLength ?? 20;
        v.scales.y = {
          type: "category",
          ...p,
          ticks: {
            ...b,
            autoSkip: !1,
            maxTicksLimit: y > 0 ? y : Ja,
            callback: function(_) {
              const w = this.getLabelForValue(_), $ = typeof w == "string" ? w : String(w ?? "");
              return r($, k);
            }
          }
        };
      }
      return Sl(
        $l(v)
      );
    }), f = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (h, v) => (g(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: _e({ height: `${f.value}px` })
    }, [
      N(T(Nh), {
        data: s.value,
        options: u.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), ve = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, $t = /* @__PURE__ */ ve(Yh, [["__scopeId", "data-v-1d64fb88"]]), qh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Xh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Gh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Zh = ["aria-pressed", "aria-label", "onClick"], Qh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Jh = /* @__PURE__ */ fe({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(
      xl,
      kl,
      sh,
      oh,
      bl,
      Fo,
      Eo
    ), aa.defaults.font.family = ft;
    const n = ne(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const p = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((y) => {
          const k = y.borderColor, _ = Array.isArray(k) ? k[0] : k, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, $ = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : p, D = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : $, M = y.pointBorderWidth ?? 2, F = y.pointHoverBorderWidth ?? M;
          return {
            ...y,
            fill: y.fill ?? !1,
            clip: y.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: D,
            pointBorderColor: y.pointBorderColor ?? w,
            pointHoverBorderColor: y.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: F
          };
        })
      };
    }), r = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, c = (p) => typeof p != "string" ? p : a.uppercaseLegendLabels ? p.toUpperCase() : r(p);
    function u(p) {
      const y = p.borderColor, k = Array.isArray(y) ? y[0] : y;
      return typeof k == "string" && k.length > 0 ? k : s.value.textSecondary;
    }
    const f = C(
      () => l.value.datasets.map((p, y) => ({
        key: `${p.label ?? "dataset"}-${y}`,
        label: c(p.label || ""),
        color: u(p)
      }))
    ), h = ne([]);
    Te(
      () => l.value.datasets.length,
      (p) => {
        const y = Array.from({ length: p }, (k, _) => h.value[_] ?? !0);
        h.value = y;
      },
      { immediate: !0 }
    );
    function v(p) {
      const k = n.value?.chart;
      if (!k || p < 0 || p >= k.data.datasets.length) return;
      const _ = !k.isDatasetVisible(p);
      k.setDatasetVisibility(p, _), h.value[p] = _, k.update();
    }
    function m(p, y) {
      if (y == null) return p;
      if (Array.isArray(y) || typeof y != "object" || p == null || Array.isArray(p) || typeof p != "object") return y;
      const k = { ...p };
      for (const _ of Object.keys(y)) {
        const w = y[_];
        w !== void 0 && (k[_] = m(p[_], w));
      }
      return k;
    }
    const b = C(() => {
      const p = {
        font: {
          family: ft
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
              family: ft,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: ft,
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
              maxTicksLimit: Vo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ft,
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
              maxTicksLimit: Ja,
              font: {
                family: ft,
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
      }, y = a.options ? m(p, a.options) : p;
      return Sl(
        $l(y)
      );
    });
    return t({ isDark: o }), (p, y) => (g(), x("div", qh, [
      d("div", Xh, [
        N(T(zh), {
          ref_key: "lineChartRef",
          ref: n,
          data: l.value,
          options: b.value
        }, null, 8, ["data", "options"])
      ]),
      f.value.length > 0 ? (g(), x("ul", Gh, [
        (g(!0), x(he, null, pe(f.value, (k, _) => (g(), x("li", {
          key: k.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: q(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", h.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: _e({ color: k.color }),
            "aria-pressed": h.value[_] !== !1,
            "aria-label": `${k.label}. ${h.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(_)
          }, [
            d("span", Qh, [
              y[0] || (y[0] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              d("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: _e({ borderColor: k.color })
              }, null, 4),
              y[1] || (y[1] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            d("span", null, A(k.label), 1)
          ], 14, Zh)
        ]))), 128))
      ])) : E("", !0)
    ]));
  }
}), mt = /* @__PURE__ */ ve(Jh, [["__scopeId", "data-v-426e23d5"]]), ef = { class: "chart-container" }, tf = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", af = /* @__PURE__ */ fe({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(qu, Fo, Eo);
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = a.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => a.options ? a.options : {
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
              family: tf,
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
              return c.labels.length && c.datasets.length ? c.labels.map((u, f) => {
                const v = r.getDatasetMeta(0).controller.getStyle(f), b = c.datasets[0].data[f], p = typeof v.backgroundColor == "string" && v.backgroundColor.length > 0 ? v.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${b}`,
                  fillStyle: v.backgroundColor,
                  strokeStyle: v.borderColor,
                  lineWidth: v.borderWidth,
                  lineDash: v.borderDash,
                  lineDashOffset: v.borderDashOffset,
                  lineJoin: v.borderJoinStyle,
                  fontColor: p,
                  hidden: !r.getDataVisibility(f),
                  index: f
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: n.value ? "#d1d5db" : "#e2e8f0",
          borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const c = r.label || "", u = r.parsed || 0, f = r.dataset.data.reduce((v, m) => v + m, 0), h = (u / f * 100).toFixed(1);
              return `${i(c)}: ${u} (${h}%)`;
            }
          }
        }
      },
      elements: {
        arc: {
          borderWidth: 2,
          borderColor: n.value ? "#1a1a1d" : "#ffffff",
          hoverOffset: 8
        }
      },
      animation: {
        animateRotate: !0,
        animateScale: !0
      }
    });
    return t({ isDark: n }), (r, c) => (g(), x("div", ef, [
      N(T(jh), {
        data: T(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Nn = /* @__PURE__ */ ve(af, [["__scopeId", "data-v-0f7806d6"]]), nf = { class: "chart-container" }, of = ["viewBox"], sf = ["transform"], lf = ["x", "width", "fill", "stroke"], rf = ["fill"], cf = ["x1", "y1", "x2", "y2", "stroke"], df = ["points", "fill"], uf = ["x1", "y1", "x2", "y2", "stroke"], hf = ["x", "y", "fill"], ff = ["x1", "y1", "x2", "y2", "stroke"], gf = ["points", "fill"], mf = ["transform"], pf = ["y1", "y2"], vf = ["y1", "y2"], bf = ["y1", "y2"], yf = ["y1", "y2"], xf = ["y", "height"], kf = ["y1", "y2"], _f = ["y1", "y2"], wf = ["y1", "y2"], Cf = ["y1", "y2"], $f = ["y", "height"], Sf = ["cy", "stroke", "onMouseenter"], Mf = ["cy", "stroke", "onMouseenter"], Df = ["cy", "stroke", "onMouseenter"], Af = ["cy", "stroke", "onMouseenter"], Tf = ["y1", "y2", "onMouseenter"], Bf = ["y1", "y2", "onMouseenter"], Lf = ["x", "y", "fill"], Rf = ["x", "y", "fill"], Pf = ["transform"], If = { transform: "translate(-200, 0)" }, Ef = ["stroke"], Ff = ["fill"], Of = { transform: "translate(-130, 0)" }, Vf = ["stroke"], Nf = ["fill"], zf = { transform: "translate(-60, 0)" }, jf = ["stroke"], Hf = ["fill"], Wf = { transform: "translate(10, 0)" }, Kf = ["stroke"], Uf = ["fill"], Yf = { transform: "translate(80, 0)" }, qf = ["fill"], Xf = { transform: "translate(150, 0)" }, Gf = ["fill"], Zf = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n } = Me($e(a, "theme")), o = C(() => ({
      // Tooltip
      tooltipBg: n.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: n.value ? "#f8f9fa" : "#f1f5f9",
      // Axis
      axis: n.value ? "#9ca3af" : "#475569",
      // Ticks
      tickLine: n.value ? "#4b5563" : "#cbd5e1",
      tickText: n.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: n.value ? "#d1d5db" : "#475569",
      legendText: n.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: n.value ? "#1a1a1d" : "#ffffff"
    })), s = ne({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (h) => typeof h == "string" ? h.charAt(0).toUpperCase() + h.slice(1).toLowerCase() : h, l = (h, v) => {
      const m = h.currentTarget.closest("svg");
      if (!m) return;
      const b = m.getBoundingClientRect(), p = m.createSVGPoint();
      p.x = h.clientX - b.left, p.y = h.clientY - b.top, s.value = {
        visible: !0,
        x: p.x,
        y: p.y - 20,
        text: v
      };
    }, r = (h) => {
      if (s.value.visible) {
        const v = h.currentTarget, m = v.getBoundingClientRect(), b = v.createSVGPoint();
        b.x = h.clientX - m.left, b.y = h.clientY - m.top, s.value.x = b.x, s.value.y = b.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, f = C(() => {
      const h = [], m = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const p = b, y = (p - 1) / 9, k = a.chartMargin + m - y * m;
        h.push({ value: p, y: k });
      }
      return h;
    });
    return t({ isDark: n }), (h, v) => (g(), x("div", nf, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: _e(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (g(), x("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          d("rect", {
            x: -(s.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, lf),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, rf)
        ], 8, sf)) : E("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, cf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, df),
        (g(!0), x(he, null, pe(f.value, (m, b) => (g(), x(he, { key: b }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: m.y,
            x2: e.chartMargin,
            y2: m.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, uf),
          d("text", {
            x: e.chartMargin - 12,
            y: m.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(m.value), 9, hf)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, ff),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, gf),
        (g(!0), x(he, null, pe(e.boxplotData, (m, b) => (g(), x(he, { key: b }, [
          d("g", {
            transform: `translate(${m.centerX}, 0)`
          }, [
            m.isTotal ? (g(), x(he, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, pf),
              d("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vf),
              d("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bf),
              d("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, yf),
              d("rect", {
                x: -24,
                y: m.q3Y,
                width: "48",
                height: m.q1Y - m.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, xf)
            ], 64)) : (g(), x(he, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kf),
              d("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _f),
              d("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wf),
              d("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Cf),
              d("rect", {
                x: -24,
                y: m.q3Y,
                width: "48",
                height: m.q1Y - m.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, $f)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: m.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Min: ${m.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sf),
            d("circle", {
              cx: 0,
              cy: m.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Q1: ${m.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mf),
            d("circle", {
              cx: 0,
              cy: m.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Q3: ${m.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Df),
            d("circle", {
              cx: 0,
              cy: m.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Max: ${m.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Af),
            d("line", {
              x1: -24,
              y1: m.medianY,
              x2: 24,
              y2: m.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (p) => l(p, `Median: ${m.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Tf),
            m.averageY ? (g(), x("line", {
              key: 2,
              x1: -24,
              y1: m.averageY,
              x2: 24,
              y2: m.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (p) => l(p, `Avg: ${m.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Bf)) : E("", !0)
          ], 8, mf),
          d("text", {
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(m.label)), 9, Lf),
          m.responseCount ? (g(), x("text", {
            key: 0,
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(m.responseCount), 9, Rf)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (g(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", If, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ef),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Ff)
          ]),
          d("g", Of, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Vf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Nf)
          ]),
          d("g", zf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, jf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Hf)
          ]),
          d("g", Wf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Kf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Uf)
          ]),
          d("g", Yf, [
            v[0] || (v[0] = d("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "18",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, qf)
          ]),
          d("g", Xf, [
            v[1] || (v[1] = d("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            d("text", {
              x: "18",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Gf)
          ])
        ], 8, Pf)) : E("", !0)
      ], 44, of))
    ]));
  }
}), Qf = /* @__PURE__ */ ve(Zf, [["__scopeId", "data-v-9ac5c075"]]), Jf = { class: "chart-container" }, eg = ["viewBox"], tg = ["x1", "y1", "x2", "y2", "stroke"], ag = ["points", "fill"], ng = ["x1", "y1", "x2", "y2", "stroke"], og = ["x1", "y1", "x2", "y2", "stroke"], sg = ["x", "y", "fill"], ig = ["x", "y", "fill", "transform"], lg = ["x1", "y1", "x2", "y2", "stroke"], rg = ["points", "fill"], cg = ["transform"], dg = ["y1", "y2", "stroke", "onMouseenter"], ug = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], hg = ["x1", "y1", "x2", "y2", "onMouseenter"], fg = ["x1", "y1", "x2", "y2", "onMouseenter"], gg = ["cy", "stroke", "onMouseenter"], mg = ["cy", "stroke", "onMouseenter"], pg = ["x", "y", "fill"], vg = ["x", "y", "fill"], bg = ["transform"], yg = { transform: "translate(-180, 0)" }, xg = ["stroke"], kg = ["fill"], _g = { transform: "translate(-120, 0)" }, wg = ["fill"], Cg = { transform: "translate(-60, 0)" }, $g = ["fill"], Sg = { transform: "translate(0, 0)" }, Mg = ["stroke"], Dg = ["fill"], Ag = { transform: "translate(60, 0)" }, Tg = ["fill"], Bg = { transform: "translate(130, 0)" }, Lg = ["fill"], Rg = ["transform"], Pg = ["x", "y", "width", "height", "fill", "stroke"], Ig = ["y", "fill"], Eg = ["y", "fill"], yn = 10, Fg = 14, eo = 13, ci = 4, di = 12, Og = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = yn + eo + ci + di + yn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(k, _, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(k, 1) * _ * $);
    }
    function r(k, _) {
      return Math.max(
        l(k.length, eo, !0),
        l(_.length, di, !1),
        52
      ) + Fg * 2;
    }
    function c(k, _, w, $) {
      const D = w / 2, M = 6, F = Math.min(
        Math.max(k, D + M),
        a.chartWidth - D - M
      ), z = M + $ + 10, W = a.chartHeight - M + 10, S = Math.min(Math.max(_, z), W);
      return { x: F, y: S };
    }
    const u = C(() => ({
      // Axis
      axis: n.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: n.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: n.value ? "#4b5563" : "#cbd5e1",
      tickText: n.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: n.value ? "#d1d5db" : "#475569",
      legendText: n.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: n.value ? "#1a1a1d" : "#ffffff"
    })), f = ne({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), h = (k) => typeof k == "string" ? k.charAt(0).toUpperCase() + k.slice(1).toLowerCase() : k, v = (k, _, w) => {
      const $ = k.currentTarget.closest("svg");
      if (!$) return;
      const D = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = k.clientX - D.left, M.y = k.clientY - D.top;
      let F = h(_.label), z = "";
      switch (w) {
        case "body":
          z = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          z = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          z = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          z = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          z = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          z = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const W = r(F, z), S = s;
      let L = M.x, B = M.y - 20;
      const j = c(L, B, W, S);
      L = j.x, B = j.y, f.value = {
        visible: !0,
        x: L,
        y: B,
        title: F,
        text: z,
        width: W,
        height: S
      };
    }, m = (k) => {
      if (f.value.visible) {
        const _ = k.currentTarget, w = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = k.clientX - w.left, $.y = k.clientY - w.top;
        let D = $.x, M = $.y - 20;
        const F = c(D, M, f.value.width, f.value.height);
        f.value.x = F.x, f.value.y = F.y;
      }
    }, b = () => {
      f.value.visible = !1;
    }, p = () => {
      f.value.visible = !1;
    }, y = C(() => {
      const k = [], w = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const D = $, M = (D - 1) / 9, F = a.chartMargin + w - M * w;
        k.push({ value: D, y: F });
      }
      return k;
    });
    return t({ isDark: n }), (k, _) => (g(), x("div", Jf, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: _e(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: m,
        onMouseleave: b
      }, [
        _[4] || (_[4] = d("defs", null, [
          d("filter", {
            id: "candlestick-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            d("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, tg),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, ag),
        (g(!0), x(he, null, pe(y.value, (w, $) => (g(), x("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, ng))), 128)),
        (g(!0), x(he, null, pe(y.value, (w, $) => (g(), x(he, { key: $ }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, og),
          d("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, sg)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(h(e.yAxisLabel)), 9, ig),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, lg),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, rg),
        (g(!0), x(he, null, pe(e.candlestickData, (w, $) => (g(), x(he, { key: $ }, [
          d("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (D) => v(D, w, "wick"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, dg),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (D) => v(D, w, "body"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, ug),
            w.medianY ? (g(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (D) => v(D, w, "median"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, hg)) : E("", !0),
            w.averageY ? (g(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (D) => v(D, w, "average"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, fg)) : E("", !0),
            d("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => v(D, w, "min"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, gg),
            d("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => v(D, w, "max"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, mg)
          ], 8, cg),
          d("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(h(w.label)), 9, pg),
          w.responseCount ? (g(), x("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, vg)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (g(), x("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", yg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, xg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, kg)
          ]),
          d("g", _g, [
            _[0] || (_[0] = d("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, wg)
          ]),
          d("g", Cg, [
            _[1] || (_[1] = d("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, $g)
          ]),
          d("g", Sg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Mg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Dg)
          ]),
          d("g", Ag, [
            _[2] || (_[2] = d("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "18",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Tg)
          ]),
          d("g", Bg, [
            _[3] || (_[3] = d("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            d("text", {
              x: "18",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Lg)
          ])
        ], 8, bg)) : E("", !0),
        f.value.visible ? (g(), x("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${f.value.x}, ${f.value.y})`
        }, [
          d("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -f.value.width / 2,
            y: -f.value.height - 10,
            width: f.value.width,
            height: f.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, Pg),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.title), 9, Ig),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + yn + eo + ci,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.text), 9, Eg)
        ], 8, Rg)) : E("", !0)
      ], 44, eg))
    ]));
  }
}), Vg = /* @__PURE__ */ ve(Og, [["__scopeId", "data-v-22efd66d"]]), Ng = ["viewBox"], zg = ["x1", "y1", "x2", "y2", "stroke"], jg = ["x1", "y1", "x2", "y2", "stroke"], Hg = ["points", "fill"], Wg = ["x1", "y1", "x2", "y2", "stroke"], Kg = ["x", "y", "fill"], Ug = ["x", "y", "fill", "transform"], Yg = ["x1", "y1", "x2", "y2", "stroke"], qg = ["points", "fill"], Xg = ["x1", "y1", "x2", "y2", "stroke"], Gg = ["x", "y", "fill"], Zg = ["x", "y", "fill"], Qg = ["d"], Jg = ["x", "y", "width", "height", "onMouseenter"], em = ["x1", "y1", "x2", "y2"], tm = ["x", "y"], am = ["x1", "y1", "x2", "y2"], nm = ["x", "y"], om = ["x1", "y1", "x2", "y2"], sm = ["x", "y"], im = ["x1", "y1", "x2", "y2"], lm = ["x", "y"], rm = ["x1", "y1", "x2", "y2"], cm = ["x", "y"], dm = ["x1", "y1", "x2", "y2"], um = ["x", "y"], hm = ["transform"], fm = { transform: "translate(-220, 0)" }, gm = ["fill"], mm = { transform: "translate(-140, 0)" }, pm = ["fill"], vm = { transform: "translate(-80, 0)" }, bm = ["fill"], ym = { transform: "translate(-20, 0)" }, xm = ["fill"], km = { transform: "translate(60, 0)" }, _m = ["fill"], wm = { transform: "translate(130, 0)" }, Cm = ["fill"], $m = { transform: "translate(180, 0)" }, Sm = ["fill"], Mm = ["transform"], Dm = ["x", "y", "width", "height", "fill", "stroke"], Am = ["y", "fill"], Tm = ["y", "fill"], xn = 10, Bm = 14, to = 13, ui = 12, hi = 4, Lm = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = xn + to + hi + ui + xn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(ee, G, P) {
      const Z = P ? 0.6 : 0.535;
      return Math.ceil(Math.max(ee, 1) * G * Z);
    }
    function r(ee, G) {
      return Math.max(
        l(ee.length, to, !0),
        l(G.length, ui, !1),
        52
      ) + Bm * 2;
    }
    function c(ee, G, P, Z) {
      const ae = P / 2, O = 6, J = Math.min(
        Math.max(ee, ae + O),
        a.chartWidth - ae - O
      ), se = O + Z + 10, me = a.chartHeight - O + 10, Ce = Math.min(Math.max(G, se), me);
      return { x: J, y: Ce };
    }
    const u = C(() => ({
      // Axis
      axis: n.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: n.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: n.value ? "#4b5563" : "#cbd5e1",
      tickText: n.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: n.value ? "#d1d5db" : "#475569",
      legendText: n.value ? "#d1d5db" : "#475569"
    })), f = ne({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), h = C(
      () => a.chartMarginRight ?? a.chartMargin
    ), v = C(() => a.chartMargin + a.plotInset), m = C(
      () => a.chartWidth - h.value - a.plotInset
    ), b = C(() => Math.max(m.value - v.value, 1)), p = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), y = C(() => b.value / 10 * 0.52);
    function k(ee) {
      if (ee < 1 || ee > 10) return null;
      const G = b.value / 10;
      return v.value + (ee - 0.5) * G;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (ee, G) => {
        const P = G + 1, Z = k(P);
        return Z === null ? null : { score: P, x: Z };
      }).filter((ee) => ee !== null)
    ), w = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = Math.max(...a.histogram.map((P) => P.count || 0), 1), G = Math.max(1, Math.ceil(ee * 0.2));
      return ee + G;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = a.averageScore || 0;
      let G = 0, P = 0;
      if (a.histogram.forEach((ae) => {
        const O = ae.count || 0;
        G += O;
        const J = ae.score - ee;
        P += O * (J * J);
      }), G === 0) return 1;
      const Z = P / G;
      return Math.sqrt(Z) || 1;
    }), D = (ee, G, P) => {
      if (P === 0) return 0;
      const Z = 1 / (P * Math.sqrt(2 * Math.PI)), ae = -0.5 * Math.pow((ee - G) / P, 2);
      return Z * Math.exp(ae);
    }, M = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const ee = a.averageScore, G = $.value, P = 100, ae = Math.max(...a.histogram.map((me) => me.count || 0), 1) / w.value * p.value;
      if (ae <= 0) return null;
      let O = 0;
      for (let me = 0; me <= P; me++) {
        const Ce = 1 + 9 * (me / P), we = D(Ce, ee, G);
        we > O && (O = we);
      }
      if (O <= 0) return null;
      const J = ae / O, se = [];
      for (let me = 0; me <= P; me++) {
        const Ce = 1 + 9 * (me / P), we = D(Ce, ee, G) * J, Re = k(Ce);
        if (Re !== null) {
          const Pe = a.chartHeight - a.chartBottomMargin - we;
          se.push(`${me === 0 ? "M" : "L"} ${Re} ${Pe}`);
        }
      }
      return se.join(" ");
    }), F = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const ee = b.value / 10;
      return a.histogram.map((G) => {
        const P = Number(G.score);
        if (!Number.isFinite(P) || P < 1 || P > 10)
          return null;
        const Z = v.value + (P - 0.5) * ee, ae = G.count > 0 ? G.count / w.value * p.value : 0, O = a.chartHeight - a.chartBottomMargin - ae;
        return {
          score: P,
          count: G.count,
          x: Z,
          y: O,
          height: ae
        };
      }).filter((G) => G !== null);
    }), z = C(() => k(a.minScore)), W = C(() => k(a.maxScore)), S = C(() => k(a.q1Score)), L = C(() => k(a.medianScore)), B = C(() => k(a.q3Score)), j = C(() => k(a.averageScore)), H = C(() => a.minScore), Q = C(() => a.maxScore), re = C(() => a.q1Score), ue = C(() => a.medianScore), X = C(() => a.q3Score), oe = C(() => a.averageScore), R = C(() => {
      const ee = [], G = a.chartMargin - 8, P = 18;
      S.value !== null && ee.push({
        x: S.value,
        y: G,
        value: a.q1Score,
        label: `Q1: ${re.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && ee.push({
        x: L.value,
        y: G - P,
        value: a.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), j.value !== null && ee.push({
        x: j.value,
        y: G - P,
        value: a.averageScore,
        label: `Avg: ${oe.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && ee.push({
        x: B.value,
        y: G,
        value: a.q3Score,
        label: `Q3: ${X.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), ee.sort((O, J) => (O.x || 0) - (J.x || 0));
      const Z = [[], [], []];
      ee.forEach((O) => {
        if (O.x === null) return;
        let J = -1;
        for (let se = 0; se < Z.length; se++) {
          let me = !1;
          for (const Ce of Z[se]) {
            if (Ce.x === null) continue;
            const we = Math.abs(O.x - Ce.x), Re = (O.width + Ce.width) / 2 + 10;
            if (we < Re) {
              me = !0;
              break;
            }
          }
          if (!me) {
            J = se;
            break;
          }
        }
        J === -1 && (J = Z.length - 1), O.y = G - J * P, Z[J].push(O);
      });
      const ae = 15;
      return ee.forEach((O) => {
        O.y < ae && (O.y = ae);
      }), ee;
    }), U = (ee) => R.value.find((P) => P.id === ee)?.y || a.chartMargin - 10, Y = C(() => {
      const ee = [];
      for (let P = 0; P <= 5; P++) {
        const Z = Math.round(w.value / 5 * P), ae = a.chartHeight - a.chartBottomMargin - P / 5 * p.value;
        ee.push({ value: Z, y: ae });
      }
      return ee;
    });
    function V(ee, G, P) {
      const Z = ee.createSVGPoint();
      Z.x = G, Z.y = P;
      const ae = ee.getScreenCTM();
      if (!ae) {
        const J = ee.getBoundingClientRect();
        return { x: G - J.left, y: P - J.top };
      }
      const O = Z.matrixTransform(ae.inverse());
      return { x: O.x, y: O.y };
    }
    const le = (ee, G) => {
      a.interactive && xe(ee, G);
    }, ce = () => {
      a.interactive && de();
    }, xe = (ee, G) => {
      const P = ee.currentTarget.closest("svg");
      if (!P) return;
      const { x: Z, y: ae } = V(P, ee.clientX, ee.clientY), O = `Score: ${G.score}`, J = `Count: ${Number(G.count ?? 0).toLocaleString()}`, se = r(O, J), me = s, Ce = typeof G?.x == "number" ? G.x : Z;
      let we = ae - 20;
      const Re = c(Ce, we, se, me);
      f.value = {
        visible: !0,
        x: Re.x,
        y: Re.y,
        title: O,
        text: J,
        width: se,
        height: me,
        anchorX: typeof G?.x == "number" ? G.x : null
      };
    }, K = (ee) => {
      if (a.interactive && f.value.visible) {
        const G = ee.currentTarget, { x: P, y: Z } = V(G, ee.clientX, ee.clientY), ae = f.value.anchorX, O = ae != null && Number.isFinite(ae) ? ae : P;
        let J = Z - 20;
        const se = c(O, J, f.value.width, f.value.height);
        f.value.x = se.x, f.value.y = se.y;
      }
    }, ie = () => {
      de();
    }, de = () => {
      f.value.visible = !1, f.value.anchorX = null;
    };
    return t({ isDark: n }), (ee, G) => (g(), x("div", {
      class: q(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: _e(`min-height: ${e.chartHeight}px;`),
        onMousemove: K,
        onMouseleave: ie
      }, [
        G[7] || (G[7] = d("defs", null, [
          d("filter", {
            id: "histogram-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            d("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        (g(!0), x(he, null, pe(Y.value, (P, Z) => (g(), x("line", {
          key: `grid-${Z}`,
          x1: v.value,
          y1: P.y,
          x2: m.value,
          y2: P.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, zg))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, jg),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Hg),
        (g(!0), x(he, null, pe(Y.value, (P, Z) => (g(), x(he, {
          key: `y-tick-${Z}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: P.y,
            x2: e.chartMargin,
            y2: P.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Wg),
          d("text", {
            x: e.chartMargin - 12,
            y: P.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(P.value), 9, Kg)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Ug),
        d("line", {
          x1: v.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Yg),
        d("polygon", {
          points: `${m.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${m.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${m.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, qg),
        (g(!0), x(he, null, pe(_.value, (P) => (g(), x(he, {
          key: `tick-${P.score}`
        }, [
          d("line", {
            x1: P.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: P.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xg),
          d("text", {
            x: P.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(P.score), 9, Gg)
        ], 64))), 128)),
        d("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Zg),
        M.value ? (g(), x("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Qg)) : E("", !0),
        (g(!0), x(he, null, pe(F.value, (P, Z) => (g(), x("rect", {
          key: `bar-${Z}`,
          x: P.x - y.value / 2,
          y: P.y,
          width: y.value,
          height: P.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (ae) => le(ae, P),
          onMouseleave: ce,
          style: _e({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Jg))), 128)),
        e.showStatLabels && z.value ? (g(), x("line", {
          key: 1,
          x1: z.value,
          y1: e.chartMargin,
          x2: z.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, em)) : E("", !0),
        e.showStatLabels && z.value ? (g(), x("text", {
          key: 2,
          x: z.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(H.value.toFixed(1)), 9, tm)) : E("", !0),
        e.showStatLabels && S.value ? (g(), x("line", {
          key: 3,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, am)) : E("", !0),
        e.showStatLabels && S.value ? (g(), x("text", {
          key: 4,
          x: S.value,
          y: U("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(re.value.toFixed(1)), 9, nm)) : E("", !0),
        e.showStatLabels && L.value ? (g(), x("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, om)) : E("", !0),
        e.showStatLabels && L.value ? (g(), x("text", {
          key: 6,
          x: L.value,
          y: U("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(ue.value.toFixed(1)), 9, sm)) : E("", !0),
        e.showStatLabels && j.value ? (g(), x("line", {
          key: 7,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, im)) : E("", !0),
        e.showStatLabels && j.value ? (g(), x("text", {
          key: 8,
          x: j.value,
          y: U("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(oe.value.toFixed(1)), 9, lm)) : E("", !0),
        e.showStatLabels && B.value ? (g(), x("line", {
          key: 9,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, rm)) : E("", !0),
        e.showStatLabels && B.value ? (g(), x("text", {
          key: 10,
          x: B.value,
          y: U("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(X.value.toFixed(1)), 9, cm)) : E("", !0),
        e.showStatLabels && W.value ? (g(), x("line", {
          key: 11,
          x1: W.value,
          y1: e.chartMargin,
          x2: W.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, dm)) : E("", !0),
        e.showStatLabels && W.value ? (g(), x("text", {
          key: 12,
          x: W.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(Q.value.toFixed(1)), 9, um)) : E("", !0),
        e.showLegend ? (g(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", fm, [
            G[0] || (G[0] = d("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            d("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, gm)
          ]),
          d("g", mm, [
            G[1] || (G[1] = d("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, pm)
          ]),
          d("g", vm, [
            G[2] || (G[2] = d("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, bm)
          ]),
          d("g", ym, [
            G[3] || (G[3] = d("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, xm)
          ]),
          d("g", km, [
            G[4] || (G[4] = d("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, _m)
          ]),
          d("g", wm, [
            G[5] || (G[5] = d("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Cm)
          ]),
          d("g", $m, [
            G[6] || (G[6] = d("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            d("text", {
              x: "24",
              y: "4",
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Sm)
          ])
        ], 8, hm)) : E("", !0),
        e.interactive && f.value.visible ? (g(), x("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${f.value.x}, ${f.value.y})`
        }, [
          d("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -f.value.width / 2,
            y: -f.value.height - 10,
            width: f.value.width,
            height: f.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, Dm),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + xn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.title), 9, Am),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + xn + to + hi,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.text), 9, Tm)
        ], 8, Mm)) : E("", !0)
      ], 44, Ng))
    ], 2));
  }
}), Ml = /* @__PURE__ */ ve(Lm, [["__scopeId", "data-v-8f9da805"]]), Rm = 639, Dl = 1024;
function fi(e) {
  return e < 640 ? "mobile" : e <= Dl ? "tablet" : "desktop";
}
function Pm() {
  const e = ne(
    typeof window > "u" ? "desktop" : fi(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = fi(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  et(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${Rm}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${Dl}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, a.addEventListener("change", s), n.addEventListener("change", s), o.addEventListener("change", s));
  }), at(() => {
    !s || !a || !n || !o || (a.removeEventListener("change", s), n.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => e.value === "mobile"), l = C(() => e.value === "tablet"), r = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const Et = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${Et(e, t)})`, Im = { class: "chart-container" }, Em = {
  key: 0,
  class: "loading-state loading-overlay"
}, ra = 12, Fm = /* @__PURE__ */ fe({
  __name: "SankeyChart",
  props: {
    data: { default: () => ({ nodes: [], links: [] }) },
    title: { default: "" },
    height: { default: "500px" },
    nodeColors: { default: () => ({}) },
    useGradient: { type: Boolean, default: !0 },
    nodeGap: { default: 16 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    Ko.use([ir, lr, rr, cr]);
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = Pm(), i = ne(null), l = ne(!0), r = ne(!1);
    let c = null, u = null;
    const f = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "2%", bottom: "2%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, h = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, v = {
      success: 0,
      abandon: 1,
      error: 2
    }, m = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, b = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, p = C(() => {
      const K = s.value;
      return K === "mobile" ? {
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
      } : K === "tablet" ? {
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
        contentMargins: { ...f.margins }
      } : {
        orient: "horizontal",
        nodeWidth: f.node.width,
        nodeGap: a.nodeGap,
        labelPosition: "inside",
        labelFontSize: 11,
        edgeLabelShow: !0,
        edgeLabelFontSize: 10,
        labelWrap: !0,
        labelCharsPerLine: 12,
        labelLineHeight: 15,
        labelTextWidth: 0,
        labelDistance: 0,
        contentMargins: { ...f.margins }
      };
    }), y = (K) => {
      const ie = K.replace(/_/g, " ").replace(/\s+/g, " ").trim(), de = ie.match(/^Failed:\s*(.+)$/i);
      return de ? `Failed:
${de[1].trim()}` : ie;
    }, k = (K, ie) => {
      const de = K.trim();
      if (!de || ie < 1 || de.length <= ie) return de;
      const ee = [];
      let G = 0;
      for (; G < de.length; ) {
        const P = Math.min(G + ie, de.length);
        if (P >= de.length) {
          const O = de.slice(G).trim();
          O && ee.push(O);
          break;
        }
        const Z = de.slice(G, P), ae = Z.lastIndexOf(" ");
        if (ae > 0)
          for (ee.push(de.slice(G, G + ae).trim()), G += ae; G < de.length && de[G] === " "; ) G += 1;
        else
          ee.push(Z), G = P;
      }
      return ee.join(`
`);
    }, _ = (K, ie) => {
      const de = K.trim();
      return !de || ie < 1 ? K : de.split(`
`).map((ee) => k(ee.trim(), ie)).filter(Boolean).join(`
`);
    }, w = (K) => K.status ? K.status : m.test(K.name) ? "abandon" : b.test(K.name) ? "error" : "success", $ = (K) => K.originalValue ?? K.value, D = (K, ie) => {
      const de = new Set(ie.map((G) => G.target)), ee = K.filter((G) => !de.has(G.name));
      for (const G of ee) {
        if (typeof G.value == "number" && G.value > 0) return G.value;
        const P = ie.filter((Z) => Z.source === G.name);
        if (P.length > 0)
          return P.reduce((Z, ae) => Z + $(ae), 0);
      }
      return ie.reduce((G, P) => Math.max(G, $(P)), 0);
    }, M = (K, ie) => {
      const de = /* @__PURE__ */ new Map(), ee = new Set(ie.map((P) => P.target)), G = K.filter((P) => !ee.has(P.name)).map((P) => ({ name: P.name, depth: 0 }));
      for (; G.length > 0; ) {
        const { name: P, depth: Z } = G.shift(), ae = de.get(P);
        if (!(ae !== void 0 && ae >= Z)) {
          de.set(P, Z);
          for (const O of ie)
            O.source === P && G.push({ name: O.target, depth: Z + 1 });
        }
      }
      for (const P of K)
        de.has(P.name) || de.set(P.name, 0);
      return de;
    }, F = (K, ie) => {
      const de = /* @__PURE__ */ new Map(), ee = new Set(ie.map((ae) => ae.target)), G = K.filter((ae) => !ee.has(ae.name));
      let P = 0;
      const Z = (ae) => {
        let O = ae;
        for (; O && !de.has(O); )
          de.set(O, P), P += 1, O = ie.filter(
            (se) => se.source === O && w({ name: se.target }) === "success"
          ).sort((se, me) => $(me) - $(se))[0]?.target;
      };
      return G.forEach((ae) => Z(ae.name)), de;
    }, z = (K, ie, de) => {
      const ee = w(K);
      if (ee === "success" && de.has(K.name))
        return de.get(K.name);
      if (ee === "success") {
        const G = ie.filter((Z) => Z.target === K.name);
        return 200 + (G.length ? Math.min(
          ...G.map(
            (Z) => de.has(Z.source) ? (de.get(Z.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ee === "abandon" ? 1e3 : 2e3;
    }, W = (K, ie) => {
      const de = M(K, ie), ee = F(K, ie);
      return [...K].sort((G, P) => {
        const Z = de.get(G.name) ?? 0, ae = de.get(P.name) ?? 0;
        if (Z !== ae) return Z - ae;
        const O = v[w(G)], J = v[w(P)];
        if (O !== J) return O - J;
        const se = z(G, ie, ee), me = z(P, ie, ee);
        if (se !== me) return se - me;
        const Ce = typeof G.order == "number" ? G.order : Number.MAX_SAFE_INTEGER, we = typeof P.order == "number" ? P.order : Number.MAX_SAFE_INTEGER;
        return Ce !== we ? Ce - we : G.name.localeCompare(P.name);
      });
    }, S = (K, ie, de, ee) => {
      const P = _(K, ee).split(`
`), Z = ie * 0.58, O = Math.max(...P.map((se) => se.length), 1) * Z, J = P.length * de;
      return {
        lines: P,
        width: O,
        height: J,
        nodeWidth: O + ra * 2
      };
    }, L = (K, ie, de, ee) => {
      const G = typeof K.label == "string" && K.label ? K.label : K.name, P = `${y(G)}
(${Et(de, ee)})`;
      return _(P, ie);
    }, B = (K, ie) => {
      const de = ie.filter((ee) => ee.target === K.name);
      return de.length > 0 ? de.reduce((ee, G) => ee + $(G), 0) : typeof K.value == "number" ? K.value : ie.filter((ee) => ee.source === K.name).reduce((ee, G) => ee + $(G), 0);
    }, j = (K, ie, de) => {
      const ee = ie.find((G) => G.name === K);
      return ee ? B(ee, de) : de.filter((G) => G.source === K).reduce((G, P) => G + $(P), 0);
    }, H = (K, ie, de, ee) => {
      const G = j(K, de, ee);
      return `${ie.toLocaleString()} (${Et(ie, G)})`;
    }, Q = (K, ie = 0) => {
      if (ie > 0) return ie;
      const de = K.match(/^(\d+(?:\.\d+)?)px$/);
      if (de) return Number(de[1]);
      const ee = K.match(/^(\d+(?:\.\d+)?)vh$/);
      return ee && typeof window < "u" ? Number(ee[1]) / 100 * window.innerHeight : 500;
    }, re = (K, ie, de, ee, G) => {
      if (!ie.length || !K.length || G <= 0) return K;
      const P = K.map((we) => ({ ...we })), Z = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), ae = Math.max(4, de.labelCharsPerLine), O = Math.max(ee * 0.88, 260), J = M(ie, P), se = /* @__PURE__ */ new Map();
      ie.forEach((we) => {
        const Re = J.get(we.name) ?? 0;
        se.set(Re, (se.get(Re) ?? 0) + 1);
      });
      const me = (we) => {
        const Pe = ie.find((oa) => oa.name === we)?.displayLabel || we, qt = S(Pe, de.labelFontSize, Z, ae).height + ra * 2, pa = J.get(we) ?? 0, nn = se.get(pa) ?? 1, on = (Math.max(nn, 1) - 1) * de.nodeGap / Math.max(nn, 1), zn = Math.max(O - on, qt);
        return Math.max(1, qt / zn * G);
      }, Ce = (we) => {
        const Re = P.filter((Pe) => Pe.target === we);
        return Re.length > 0 ? Re.reduce((Pe, Xe) => Pe + Xe.value, 0) : P.filter((Pe) => Pe.source === we).reduce((Pe, Xe) => Pe + Xe.value, 0);
      };
      for (let we = 0; we < 16; we += 1) {
        let Re = !1;
        for (const Pe of ie) {
          const Xe = me(Pe.name), qt = Ce(Pe.name);
          if (qt >= Xe) continue;
          const pa = P.filter((oa) => oa.target === Pe.name), nn = P.filter((oa) => oa.source === Pe.name), on = pa.length > 0 ? pa : nn;
          if (on.length === 0) continue;
          const zn = Xe / Math.max(qt, 1e-6);
          on.forEach((oa) => {
            oa.value *= zn;
          }), Re = !0;
        }
        if (!Re) break;
      }
      return P;
    }, ue = (K, ie, de) => {
      const ee = D(K, ie), G = W(K, ie), P = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), Z = Math.max(4, de.labelCharsPerLine);
      let ae = de.nodeWidth;
      const O = [], J = G.map((me, Ce) => {
        const we = w(me), Re = L(
          me,
          Z,
          B(me, ie),
          ee
        );
        O.push(Re);
        const Pe = S(Re, de.labelFontSize, P, Z);
        de.orient === "vertical" ? ae = Math.max(ae, Pe.height + ra * 2) : ae = Math.max(ae, Pe.nodeWidth);
        const Xe = a.nodeColors[me.name] || h[we] || X[Ce % X.length], qt = Math.max(Math.ceil(Pe.nodeWidth - ra * 2), 48);
        return {
          ...me,
          displayLabel: Re,
          label: {
            width: qt,
            overflow: "none",
            lineHeight: P,
            fontSize: de.labelFontSize
          },
          itemStyle: {
            color: Xe,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let se = { ...de.contentMargins };
      if (de.orient === "vertical") {
        const me = Math.max(
          ...O.map(
            (we) => S(we, de.labelFontSize, P, Z).width
          ),
          0
        ), Ce = typeof se.right == "number" ? se.right : 10;
        se = {
          ...se,
          right: Math.max(Ce, me + ra + de.labelDistance)
        };
      }
      return { nodes: J, maxNodeWidth: ae, contentMargins: se, originTotal: ee };
    }, X = [
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
    ], oe = () => {
      const K = a.data.links.filter(
        (G) => G.source && G.target && typeof G.value == "number"
      ), ie = Math.max(...K.map((G) => G.value), 1), de = Math.max(1, ie * 0.01), ee = K.map((G) => ({
        ...G,
        originalValue: G.value,
        value: G.value < ie * 0.01 ? de : G.value
      }));
      return {
        nodes: a.data.nodes.filter((G) => G.name),
        links: ee
      };
    }, R = (K, ie, de) => (ee) => {
      const G = ee.dataType === "node", P = o.value.tooltipText, Z = n.value ? "#d1d5db" : "#e2e8f0";
      if (G) {
        const me = ie.filter((Pe) => Pe.target === ee.name), Ce = ie.filter((Pe) => Pe.source === ee.name), we = me.length > 0 ? me.reduce((Pe, Xe) => Pe + (Xe.originalValue || Xe.value), 0) : Ce.reduce((Pe, Xe) => Pe + (Xe.originalValue || Xe.value), 0), Re = Et(we, de);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${P};">${ee.name} (${Re})</div><div style="color: ${Z}; font-size: 12px;">Count: ${we.toLocaleString()}</div>`;
      }
      const ae = ee.data?.source || ee.source || "Unknown", O = ee.data?.target || ee.target || "Unknown", J = Number(ee.data?.originalValue ?? ee.data?.value ?? ee.value ?? 0), se = H(ae, J, K, ie);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${P};">${ae} → ${O}</div><div style="color: ${Z}; font-size: 12px;">Flow: ${se}</div>`;
    }, U = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const K = p.value, ie = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", de = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ee = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", G = K.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: P, links: Z } = oe(), { nodes: ae, maxNodeWidth: O, contentMargins: J, originTotal: se } = ue(
          P,
          Z,
          K
        ), me = Q(a.height, i.value?.clientHeight ?? 0), Ce = re(
          Z,
          ae,
          {
            labelFontSize: K.labelFontSize,
            labelLineHeight: K.labelLineHeight || Math.round(K.labelFontSize * 1.25),
            labelCharsPerLine: K.labelCharsPerLine,
            nodeGap: K.nodeGap
          },
          me,
          se
        ), we = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: R(P, Ce, se),
            backgroundColor: o.value.tooltipBg,
            borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              data: ae,
              links: Ce,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: de,
                  opacity: 1
                }
              },
              lineStyle: {
                color: ie,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...f.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: K.labelPosition,
                color: G,
                fontWeight: 700,
                fontSize: K.labelFontSize,
                lineHeight: K.labelLineHeight || Math.round(K.labelFontSize * 1.25),
                padding: ra,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...K.orient === "horizontal" ? { width: Math.max(O - ra * 2, 48), overflow: "none" } : K.labelWrap && K.labelTextWidth > 0 ? { width: K.labelTextWidth, overflow: "none" } : {},
                ...K.labelDistance > 0 ? { distance: K.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => Re.data?.displayLabel || Re.name || ""
              },
              edgeLabel: K.edgeLabelShow ? {
                show: !0,
                fontSize: K.edgeLabelFontSize,
                color: ee,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => {
                  const Pe = Number(Re.data?.originalValue ?? Re.value ?? 0), Xe = Re.data?.source || Re.source || "";
                  return H(Xe, Pe, P, Ce);
                }
              } : { show: !1 },
              nodeAlign: f.node.align,
              nodeGap: K.nodeGap,
              nodeWidth: O,
              layoutIterations: f.node.iterations,
              orient: K.orient,
              draggable: !1,
              ...J
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: f.animation.duration,
          animationEasing: f.animation.easing
        };
        c.setOption(we), c.resize();
      } catch (P) {
        console.error("Error setting Sankey chart options:", P), r.value = !0;
      }
    }, Y = async () => {
      if (i.value)
        try {
          c = Ko.init(i.value), U(), window.addEventListener("resize", ce);
        } catch (K) {
          console.error("Error initializing Sankey chart:", K), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, V = () => {
      const K = i.value;
      return !!(K && K.clientWidth > 0 && K.clientHeight > 0);
    }, le = async () => {
      if (await We(), V()) return Y();
      await new Promise((K) => {
        const ie = i.value;
        if (!ie) {
          K();
          return;
        }
        u = new ResizeObserver(() => {
          V() && (u?.disconnect(), u = null, Y().then(K));
        }), u.observe(ie);
      });
    }, ce = () => c?.resize(), xe = () => {
      window.removeEventListener("resize", ce), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return et(() => le()), Bi(xe), Te(() => a.data, U, { deep: !0 }), Te(n, U), Te(s, U), t({ isDark: n }), (K, ie) => (g(), x("div", Im, [
      r.value ? (g(), x("div", {
        key: 0,
        class: "error-state",
        style: _e({ height: e.height })
      }, [...ie[0] || (ie[0] = [
        io('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (g(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: _e({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (g(), x("div", Em, [...ie[1] || (ie[1] = [
          io('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : E("", !0)
      ], 4))
    ]));
  }
}), Yt = /* @__PURE__ */ ve(Fm, [["__scopeId", "data-v-c2130602"]]), Om = ["open"], Vm = { class: "card-header metric-collapsible__summary" }, Nm = { class: "header-content metric-header-content" }, zm = { class: "metric-header-content__main" }, jm = { class: "metric-header-content__text" }, Hm = { class: "metric-header-content__loaded" }, Wm = {
  key: 0,
  class: "card-title"
}, Km = {
  key: 0,
  class: "card-subtitle"
}, Um = {
  key: 0,
  class: "metric-header-content__export"
}, Ym = {
  key: 0,
  class: "cmc-header-aside"
}, qm = {
  key: 0,
  class: "chart-metric-container__body"
}, Xm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Gm = { key: "body-content" }, Zm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Qm = { class: "card-header" }, Jm = { class: "header-content metric-header-content" }, ep = { class: "metric-header-content__main" }, tp = { class: "metric-header-content__text" }, ap = { class: "metric-header-content__loaded" }, np = {
  key: 0,
  class: "card-title"
}, op = {
  key: 0,
  class: "card-subtitle"
}, sp = {
  key: 0,
  class: "metric-header-content__export"
}, ip = {
  key: 0,
  class: "cmc-header-aside"
}, lp = {
  key: 0,
  class: "chart-metric-container__body"
}, rp = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, cp = { key: "body-content" }, dp = /* @__PURE__ */ fe({
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
    const a = e, n = t;
    function o(m) {
      return m === !0;
    }
    const s = ne(null), i = ne(o(a.defaultOpen)), l = ne(o(a.defaultOpen)), r = bo();
    function c(m) {
      return m.some((b) => {
        if (b.type === sr) return !1;
        if (b.type === Text) {
          const p = b.children;
          return typeof p == "string" && p.trim().length > 0;
        }
        return !!b.type;
      });
    }
    const u = C(() => a.collapsible ? a.lazyMount ? l.value : i.value : !0), f = C(() => a.loading && u.value), h = C(() => {
      if (a.collapsible && !i.value) return !1;
      const m = r.headerExport;
      return m ? c(m()) : !1;
    });
    Te(
      () => a.defaultOpen,
      (m) => {
        if (!a.collapsible) return;
        const b = o(m);
        i.value = b, b && (l.value = !0), s.value && s.value.open !== b && (s.value.open = b);
      }
    ), et(() => {
      !a.collapsible || !s.value || (s.value.open = i.value);
    });
    function v(m) {
      const b = m.currentTarget;
      if (b?.tagName !== "DETAILS") return;
      const p = i.value, y = b.open;
      if (i.value = y, y && !p) {
        const k = !l.value;
        l.value = !0, k && n("open");
      }
      n("toggle", y);
    }
    return (m, b) => e.collapsible ? (g(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: v
    }, [
      d("summary", Vm, [
        d("div", Nm, [
          d("div", zm, [
            d("div", jm, [
              d("div", Hm, [
                ke(m.$slots, "title", {}, () => [
                  e.title ? (g(), x("h3", Wm, A(e.title), 1)) : E("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", Km, A(e.subtitle), 1)) : E("", !0),
                ke(m.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            h.value ? (g(), x("div", Um, [
              ke(m.$slots, "headerExport", {}, void 0, !0)
            ])) : E("", !0)
          ]),
          m.$slots.headerAside ? (g(), x("div", Ym, [
            ke(m.$slots, "headerAside", {}, void 0, !0)
          ])) : E("", !0)
        ]),
        b[0] || (b[0] = d("svg", {
          class: "metric-collapsible__chevron",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          })
        ], -1))
      ]),
      u.value ? (g(), x("div", qm, [
        N(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: I(() => [
            f.value ? (g(), x("div", Xm, [
              ke(m.$slots, "loading", {}, () => [
                b[1] || (b[1] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (g(), x("div", Gm, [
              ke(m.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : E("", !0)
    ], 40, Om)) : (g(), x("div", Zm, [
      d("div", Qm, [
        d("div", Jm, [
          d("div", ep, [
            d("div", tp, [
              d("div", ap, [
                ke(m.$slots, "title", {}, () => [
                  e.title ? (g(), x("h3", np, A(e.title), 1)) : E("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", op, A(e.subtitle), 1)) : E("", !0),
                ke(m.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            h.value ? (g(), x("div", sp, [
              ke(m.$slots, "headerExport", {}, void 0, !0)
            ])) : E("", !0)
          ]),
          m.$slots.headerAside ? (g(), x("div", ip, [
            ke(m.$slots, "headerAside", {}, void 0, !0)
          ])) : E("", !0)
        ])
      ]),
      u.value ? (g(), x("div", lp, [
        N(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: I(() => [
            f.value ? (g(), x("div", rp, [
              ke(m.$slots, "loading", {}, () => [
                b[2] || (b[2] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (g(), x("div", cp, [
              ke(m.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : E("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ ve(dp, [["__scopeId", "data-v-ade4038f"]]);
function up(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
    })
  ]);
}
function hp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    })
  ]);
}
function mo(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function No(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function dt(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
function fp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function gp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function na(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function zo(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function jo(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function Al(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function mp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    })
  ]);
}
function gi(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    })
  ]);
}
function pp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    })
  ]);
}
function vp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    })
  ]);
}
function mi(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    }),
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ]);
}
function bp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
    })
  ]);
}
function Ho(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    })
  ]);
}
function yp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
    })
  ]);
}
function xp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    })
  ]);
}
function kp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    })
  ]);
}
function _p(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })
  ]);
}
function wp(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function po(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const Cp = {
  key: 0,
  class: "footer-divider"
}, $p = {
  key: 0,
  class: "export-label"
}, Sp = { class: "export-buttons" }, Mp = ["disabled"], Dp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Ap = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Tp = ["disabled"], Bp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Lp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Rp = /* @__PURE__ */ fe({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = C(() => a.variant === "footer" ? "footer" : "div"), s = C(
      () => a.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => a.formats.includes(r), l = (r) => {
      a.loading || n("export", r);
    };
    return (r, c) => (g(), te(rt(o.value), {
      class: q(s.value)
    }, {
      default: I(() => [
        e.variant === "footer" ? (g(), x("div", Cp)) : E("", !0),
        d("div", {
          class: q(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (g(), x("span", $p, "Export")) : E("", !0),
          d("div", Sp, [
            i("pdf") ? (g(), x("button", {
              key: 0,
              type: "button",
              class: q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (g(), x("svg", Dp, [...c[2] || (c[2] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", Ap, [...c[3] || (c[3] = [
                d("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                d("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                d("line", {
                  x1: "16",
                  y1: "13",
                  x2: "8",
                  y2: "13"
                }, null, -1),
                d("line", {
                  x1: "16",
                  y1: "17",
                  x2: "8",
                  y2: "17"
                }, null, -1),
                d("polyline", { points: "10 9 9 9 8 9" }, null, -1)
              ])])),
              c[4] || (c[4] = d("span", null, "PDF", -1))
            ], 10, Mp)) : E("", !0),
            i("csv") ? (g(), x("button", {
              key: 1,
              type: "button",
              class: q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (g(), x("svg", Bp, [...c[5] || (c[5] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", Lp, [...c[6] || (c[6] = [
                d("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                d("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                d("line", {
                  x1: "12",
                  y1: "18",
                  x2: "12",
                  y2: "12"
                }, null, -1),
                d("line", {
                  x1: "9",
                  y1: "15",
                  x2: "15",
                  y2: "15"
                }, null, -1)
              ])])),
              c[7] || (c[7] = d("span", null, "CSV", -1))
            ], 10, Tp)) : E("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), ze = /* @__PURE__ */ ve(Rp, [["__scopeId", "data-v-ebfab47f"]]), Pp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ip = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ep = { class: "w-full shrink-0 sm:pr-2" }, Fp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Op = { class: "max-w-[360px] text-center" }, Vp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Np = /* @__PURE__ */ fe({
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
    const n = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, o = e, s = a, i = (h) => {
      s("export", h);
    }, l = $e(o, "theme"), r = $e(o, "options"), { isDark: c } = Me(l), u = (h) => {
      const v = new Date(h), m = String(v.getDate()).padStart(2, "0"), b = String(v.getMonth() + 1).padStart(2, "0");
      return `${m}-${b}`;
    }, f = C(() => {
      const h = o.data?.agents_by_day || {}, v = Object.keys(h).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const m = v.map((_) => u(_)), b = /* @__PURE__ */ new Set();
      for (const _ of Object.values(h))
        for (const w of Object.keys(_))
          b.add(w);
      const p = Array.from(b), y = (_) => _, k = p.map((_) => ({
        label: _,
        data: v.map((w) => h[w]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: y(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: m,
        datasets: k
      };
    });
    return t({ isDark: c }), (h, v) => (g(), te(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Pp, [
          N(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: I(() => [
              f.value.labels && f.value.labels.length ? (g(), x("section", Ip, [
                d("div", Ep, [
                  N($t, {
                    data: f.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (g(), x("section", Fp, [
                d("div", Op, [
                  d("div", Vp, [
                    N(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  v[0] || (v[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  v[1] || (v[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), zp = /* @__PURE__ */ ve(Np, [["__scopeId", "data-v-f8d0ec91"]]), jp = { class: "flex w-full min-w-0 justify-center" }, Hp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Wp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Kp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Up = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Yp = /* @__PURE__ */ fe({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (g(), x("div", {
      class: q(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", jp, [
        d("div", Hp, [
          e.color ? (g(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: _e({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          d("span", Wp, A(e.title), 1)
        ])
      ]),
      d("p", Kp, A(e.value), 1),
      e.subvalue ? (g(), x("p", Up, A(e.subvalue), 1)) : E("", !0)
    ], 2));
  }
}), be = /* @__PURE__ */ ve(Yp, [["__scopeId", "data-v-0d546967"]]), Tl = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function Bl(e, t) {
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
const qp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ge = /* @__PURE__ */ fe({
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
    const t = e, a = C(
      () => t.statusLive === !0 || t.statusLive === !1
    ), n = C(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), o = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(
      () => Bl(t.color, t.outlined)
    );
    return (l, r) => a.value ? (g(), x("span", {
      key: 0,
      role: "status",
      class: q(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (g(), x("span", qp, [...r[0] || (r[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      d("span", {
        class: q(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (g(), x("span", {
      key: 1,
      class: q([T(Tl), i.value])
    }, [
      ke(l.$slots, "default", {}, () => [
        De(A(e.label), 1)
      ])
    ], 2));
  }
}), ge = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Fe = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Xt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Xp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Gp = { class: "overflow-x-auto" }, Zp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Qp = ["aria-sort", "onClick"], Jp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, e0 = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, t0 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, a0 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne(!1), s = "—";
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
    function u(w, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(w);
      const D = w[a.rowKey];
      return typeof D == "string" || typeof D == "number" ? D : $;
    }
    function f(w, $) {
      return u(w, $);
    }
    function h(w) {
      return a.sortKey === w && a.sortDirection != null;
    }
    function v(w) {
      n("sort", w);
    }
    function m(w) {
      return h(w) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const b = C(() => a.rows?.length ?? 0), p = C(() => b.value > a.maxVisibleRows), y = C(() => Math.max(0, b.value - a.maxVisibleRows)), k = C(() => a.rows?.length ? o.value || !p.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), _ = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(y.value))
    );
    return (w, $) => (g(), x("div", Xp, [
      d("div", Gp, [
        d("table", Zp, [
          d("thead", null, [
            d("tr", null, [
              (g(!0), x(he, null, pe(e.columns, (D) => (g(), x("th", {
                key: D.key,
                scope: "col",
                class: q(["kiut-table-th whitespace-nowrap px-3 py-2 text-[#9191a1]", [l(D.align), D.headerClass]])
              }, [
                D.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: q(["kiut-table-sort-btn inline-flex items-center gap-1", l(D.align)]),
                  "aria-sort": m(D.key),
                  onClick: (M) => v(D.key)
                }, [
                  d("span", null, A(D.label), 1),
                  d("span", Jp, [
                    h(D.key) ? (g(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", e0, "↑")) : e.sortDirection === "desc" ? (g(), x("span", t0, "↓")) : E("", !0)
                    ], 64)) : (g(), x(he, { key: 1 }, [
                      $[1] || ($[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Qp)) : (g(), x(he, { key: 1 }, [
                  De(A(D.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(he, null, pe(k.value, (D, M) => (g(), x("tr", {
              key: f(D, M)
            }, [
              (g(!0), x(he, null, pe(e.columns, (F) => (g(), x("td", {
                key: `${M}-${F.key}`,
                class: q(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(F.align), F.cellClass]])
              }, [
                ke(w.$slots, r(F.key), {
                  row: D,
                  column: F,
                  value: c(D, F.key)
                }, () => [
                  De(A(i(c(D, F.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      p.value ? (g(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (D) => o.value = !o.value)
      }, [
        De(A(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (g(), x("svg", {
          class: q(["view-more-icon", { "view-more-icon-rotated": o.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...$[3] || ($[3] = [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : E("", !0)
    ]));
  }
}), pt = /* @__PURE__ */ ve(a0, [["__scopeId", "data-v-7bdbf1bb"]]), n0 = {
  key: "error",
  class: "error-state"
}, o0 = { class: "error-content" }, s0 = { class: "error-description" }, i0 = {
  key: "content",
  class: "card-body"
}, l0 = { class: "chart-section" }, r0 = { class: "chart-wrapper" }, c0 = { class: "payment-success-summary" }, d0 = {
  key: 0,
  class: "booking-daily-section"
}, u0 = { class: "w-full min-w-0" }, h0 = { class: "font-medium" }, f0 = { class: "percentage-text" }, g0 = { class: "badges-container" }, m0 = {
  key: 0,
  class: "badges-container"
}, p0 = {
  key: 1,
  class: "percentage-text"
}, v0 = { class: "badges-container" }, b0 = {
  key: 1,
  class: "empty-state"
}, y0 = /* @__PURE__ */ fe({
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
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    function a(p) {
      return p;
    }
    const n = e, o = t, s = (p) => {
      o("export", p);
    }, i = C(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated by agent", align: "center" },
      { key: "started", label: "Booking Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Started", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "center" },
      { key: "paymentValue", label: "Payment Value", align: "center" },
      { key: "outcomes", label: "Outcomes", align: "center" }
    ], r = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => n.data?.total_payment_success_value || []), u = C(() => {
      const p = c.value;
      return p.length === 0 ? v(0) : p.map(
        (y) => `${y.currency} ${v(y.total_value)}`
      ).join(" · ");
    }), f = (p) => p.payment_success_value || [], h = (p) => typeof p.payment_success_count == "number" ? p.payment_success_count : (p.payment_success_value || []).reduce(
      (y, k) => y + (k.count || 0),
      0
    ), v = (p) => p == null ? "0" : Xt(p);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (p, y) => p + (y.total_value || 0),
      0
    ));
    const m = C(() => {
      const p = n.data, y = p.total_booking_initiated || 0, k = p.total_booking_started || 0, _ = p.total_payment_initiated || 0, w = p.total_not_found || 0, $ = p.total_cancelled || 0, D = p.total_no_pending_balance || 0, M = p.total_errors || 0, F = typeof p.total_payment_success == "number" ? p.total_payment_success : (p.total_payment_success_value || []).reduce(
        (H, Q) => H + (Q.count || 0),
        0
      ), z = p.total_payment_failed || 0, W = Math.max(0, y - k), S = Math.max(
        0,
        k - _ - w - $ - D - M
      ), L = (H, Q) => ye(H, Q), B = [
        { name: "Initiated by agent", status: "success" },
        { name: "Booking Started", status: "success" },
        { name: "Payment Started", status: "success" },
        { name: "Not Found", status: "error" },
        { name: "Cancelled", status: "abandon" },
        { name: "No Pending Balance", status: "abandon" },
        { name: "Errors", status: "error" },
        { name: "Booking Success", status: "success" },
        { name: "Error: Payment Failed", status: "error" },
        { name: "Abandoned: No Response", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], j = [];
      return k > 0 && j.push({
        source: "Initiated by agent",
        target: "Booking Started",
        value: k,
        label: L(k, y)
      }), W > 0 && j.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: W,
        label: L(W, y)
      }), _ > 0 && j.push({
        source: "Booking Started",
        target: "Payment Started",
        value: _,
        label: L(_, y)
      }), w > 0 && j.push({
        source: "Booking Started",
        target: "Not Found",
        value: w,
        label: L(w, y)
      }), $ > 0 && j.push({
        source: "Booking Started",
        target: "Cancelled",
        value: $,
        label: L($, y)
      }), D > 0 && j.push({
        source: "Booking Started",
        target: "No Pending Balance",
        value: D,
        label: L(D, y)
      }), M > 0 && j.push({
        source: "Booking Started",
        target: "Errors",
        value: M,
        label: L(M, y)
      }), S > 0 && j.push({
        source: "Booking Started",
        target: "Abandoned (Start)",
        value: S,
        label: L(S, y)
      }), F > 0 && j.push({
        source: "Payment Started",
        target: "Booking Success",
        value: F,
        label: L(F, y)
      }), z > 0 && j.push({
        source: "Payment Started",
        target: "Error: Payment Failed",
        value: z,
        label: L(z, y)
      }), { nodes: B, links: j };
    }), b = (p, y) => Et(p, y);
    return (p, y) => (g(), te(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (k) => o("open"))
    }, {
      headerExport: I(() => [
        e.enableExport && !n.loading && !n.error ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        N(ct, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: I(() => [
            n.error ? (g(), x("div", n0, [
              d("div", o0, [
                y[1] || (y[1] = d("div", { class: "error-icon-wrapper" }, [
                  d("svg", {
                    class: "error-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    })
                  ])
                ], -1)),
                y[2] || (y[2] = d("p", { class: "error-title" }, "Error loading data", -1)),
                d("p", s0, A(n.error), 1)
              ])
            ])) : (g(), x("div", i0, [
              d("section", l0, [
                d("div", r0, [
                  N(Yt, {
                    data: m.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              d("section", c0, [
                N(be, {
                  color: "#22c55e",
                  title: "Booking Success Value",
                  value: u.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (g(), x("section", d0, [
                y[3] || (y[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", u0, [
                  N(pt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": I(({ row: k }) => [
                      d("span", h0, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": I(({ row: k }) => [
                      d("span", null, A(T(ge)(Number(k.booking_initiated_count))), 1)
                    ]),
                    "cell-started": I(({ row: k }) => [
                      d("span", null, [
                        De(A(T(ge)(Number(k.booking_started_count))) + " ", 1),
                        d("span", f0, " (" + A(b(
                          Number(k.booking_started_count),
                          Number(k.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": I(({ row: k }) => [
                      d("span", null, A(T(ge)(Number(k.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": I(({ row: k }) => [
                      d("div", g0, [
                        N(Ge, { color: "success" }, {
                          default: I(() => [
                            De(" Booking Success: " + A(T(ge)(
                              h(k)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: I(() => [
                            De(" Payment Failed: " + A(T(ge)(Number(k.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": I(({ row: k }) => [
                      f(k).length > 0 ? (g(), x("div", m0, [
                        (g(!0), x(he, null, pe(f(
                          k
                        ), (_) => (g(), x("span", {
                          key: `${k.date}-${_.currency}`,
                          class: "badge badge-currency"
                        }, A(_.currency) + " " + A(v(_.total_value)), 1))), 128))
                      ])) : (g(), x("span", p0, "N/A"))
                    ]),
                    "cell-outcomes": I(({ row: k }) => [
                      d("div", v0, [
                        N(Ge, { color: "danger" }, {
                          default: I(() => [
                            De(" Not Found: " + A(k.not_found_count ? T(ge)(Number(k.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "warning" }, {
                          default: I(() => [
                            De(" Cancelled: " + A(k.cancelled_count ? T(ge)(Number(k.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "orange" }, {
                          default: I(() => [
                            De(" No Balance: " + A(k.no_pending_balance_count ? T(ge)(Number(k.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: I(() => [
                            De(" Errors: " + A(k.error_count ? T(ge)(Number(k.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (g(), x("section", b0, [...y[4] || (y[4] = [
                d("div", { class: "empty-state-content" }, [
                  d("div", { class: "empty-icon-wrapper" }, [
                    d("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      d("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      })
                    ])
                  ]),
                  d("p", { class: "empty-title" }, "No booking manager data available"),
                  d("p", { class: "empty-description" }, " No booking manager data found for the selected period. Try adjusting the date range. ")
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
}), x0 = /* @__PURE__ */ ve(y0, [["__scopeId", "data-v-e1f0043e"]]), k0 = { class: "card-body" }, _0 = {
  key: 0,
  class: "chart-section"
}, w0 = { class: "chart-wrapper" }, C0 = {
  key: 1,
  class: "checkin-daily-section"
}, $0 = { class: "w-full min-w-0" }, S0 = { class: "font-medium" }, M0 = { class: "cell-success" }, D0 = { class: "cell-danger" }, A0 = {
  key: 0,
  class: "reasons-list"
}, T0 = { class: "reason-name" }, B0 = { class: "reason-count" }, L0 = {
  key: 1,
  class: "no-reasons"
}, R0 = {
  key: 2,
  class: "empty-state"
}, P0 = {
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
    const a = t, n = (w) => {
      a("export", w);
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
    }, l = ne([]), r = [
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
    }, u = C(
      () => o.showPaymentLinks ? [...r, c] : r
    ), f = C(
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
    ), h = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.checkin_by_day) && w.checkin_by_day.length > 0 || (w.total_checkin_initiated ?? 0) > 0) ? { ...s, ...w } : o.checkinData ?? s;
    }), v = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), m = (w, $) => !$ || $ === 0 ? "0.0%" : Et(w, $), b = (w, $) => {
      const D = ge(w), M = m(w, $);
      return `${D} (${M})`;
    }, p = (w) => w.reduce(($, D) => $ + D.failed_count, 0), y = C(() => {
      const w = [], $ = [], D = /* @__PURE__ */ new Set(), M = (ee, G = {}) => {
        D.has(ee) || (w.push({ name: ee, ...G }), D.add(ee));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      M("Checkin Init", { value: h.value.total_checkin_initiated }), M("Booking retrive"), M("Booking retrive success"), M("Number of Passengers"), M("Completed"), M("Closed with BP");
      const F = h.value.total_checkin_initiated, z = h.value.total_checkin_init, W = h.value.total_checkin_init_abandoned || 0, S = h.value.total_checkin_pre_init_abandoned_error, L = h.value.total_checkin_pre_init_abandoned_voluntary, B = S != null || L != null, j = B ? Math.max(Number(S) || 0, 0) : 0, H = B ? Math.max(Number(L) || 0, 0) : 0, Q = h.value.total_checkin_init_abandoned_error, re = h.value.total_checkin_init_abandoned_voluntary, ue = Q != null || re != null, X = ue ? Math.max(Number(Q) || 0, 0) : 0, oe = ue ? Math.max(Number(re) || 0, 0) : 0, R = ue ? Math.max(W - X - oe, 0) : W, U = z - W, Y = h.value.total_checkin_started, V = h.value.total_checkin_completed, le = h.value.total_checkin_closed, ce = v.value.unrecovered_by_step || [], xe = ce.reduce(
        (ee, G) => ee + G.count,
        0
      );
      z > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: z,
        label: ye(z, F)
      });
      const K = F - z;
      B ? (H > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ye(H, F)
      })), j > 0 && (M("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: j,
        label: ye(j, F)
      }))) : K > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, F)
      })), ue ? (X > 0 && (M("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: X,
        label: ye(X, F)
      })), oe > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: oe,
        label: ye(oe, F)
      })), R > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ye(R, F)
      }))) : W > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: W,
        label: ye(W, F)
      })), U > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: U,
        label: ye(U, F)
      }), Y > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: Y,
        label: ye(Y, F)
      }), V > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: V,
        label: ye(V, F)
      }), ce.length > 0 && xe > 0 && (M("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: xe,
        label: ye(xe, F)
      }), ce.forEach((ee, G) => {
        const Z = ee.step_name.replace(/_/g, " ").split(" ").map((ae) => ae.charAt(0).toUpperCase() + ae.slice(1)).join(" ");
        M(Z, { status: "error", order: G + 1 }), $.push({
          source: "Unrecovered",
          target: Z,
          value: ee.count,
          label: ye(ee.count, F)
        });
      }));
      const ie = Y - (V + xe);
      ie > 0 && (M("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: ie,
        label: ye(ie, F)
      }));
      const de = V - le;
      return de > 0 && (M("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: de,
        label: ye(de, F)
      })), le > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: le,
        label: ye(le, F)
      }), { nodes: w, links: $ };
    }), k = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, _ = () => {
      const w = h.value.checkin_by_day || [], $ = v.value.failed_by_step_by_day || [], D = k();
      if (w.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...w].map((M) => {
        const F = $.find(
          (W) => W.date === M.date
        ), z = D.find(
          (W) => W.date === M.date
        );
        return {
          ...M,
          failed_steps: F?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? z?.record_locator_create_payment_count ?? 0
        };
      }), l.value.sort((M, F) => new Date(M.date) - new Date(F.date));
    };
    return Te(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (g(), te(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", k0, [
          y.value.nodes.length > 0 ? (g(), x("section", _0, [
            d("div", w0, [
              N(Yt, {
                data: y.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : E("", !0),
          l.value && l.value.length > 0 ? (g(), x("section", C0, [
            d("div", $0, [
              N(pt, {
                columns: u.value,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: D }) => [
                  d("span", S0, A(T(Ne)(String(D.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: D }) => [
                  d("span", null, A(T(ge)(D.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: D }) => [
                  d("span", null, A(b(
                    D.checkin_init_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": I(({ row: D }) => [
                  d("span", null, A(T(ge)(D.checkin_started_count)), 1)
                ]),
                "cell-completed": I(({ row: D }) => [
                  d("span", null, A(b(
                    D.checkin_completed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": I(({ row: D }) => [
                  d("span", M0, A(b(
                    D.checkin_closed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": I(({ row: D }) => [
                  d("span", D0, A(b(
                    p(D.failed_steps),
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": I(({ row: D }) => [
                  D.failed_steps && D.failed_steps.length > 0 ? (g(), x("div", A0, [
                    (g(!0), x(he, null, pe(D.failed_steps, (M) => (g(), x("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      d("span", T0, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", B0, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", L0, "-"))
                ]),
                "cell-createPayment": I(({ row: D }) => [
                  d("span", null, A(T(ge)(D.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", R0, [...$[0] || ($[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No check-in data available"),
              d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in performance data. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, I0 = /* @__PURE__ */ ve(P0, [["__scopeId", "data-v-ae5fc0f7"]]), E0 = { class: "card-body" }, F0 = {
  key: 0,
  class: "sankey-section"
}, O0 = {
  key: 1,
  class: "empty-state"
}, V0 = { class: "empty-state-content" }, N0 = { class: "empty-icon-wrapper" }, z0 = /* @__PURE__ */ fe({
  __name: "CheckinMetrics",
  props: {
    initiallyOpen: { type: Boolean, default: !1 },
    collapsible: { type: Boolean, default: !0 },
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
    exportLoading: { type: Boolean, default: !1 },
    isAvianca: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (f) => {
      o("export", f);
    }, { isDark: i } = Me($e(n, "theme")), l = /* @__PURE__ */ new Set([
      "choose_boardingpass",
      "boarding_pass",
      "generate_boarding_pass"
    ]), r = (f) => {
      if (!f) return !1;
      const h = f.toLowerCase().trim();
      return l.has(h) || h.includes("boarding_pass");
    }, c = (f) => {
      const h = f?.failed_by_step_by_day || [];
      let v = 0;
      for (const m of h)
        for (const b of m.steps || [])
          r(b.step_name) && (v += b.failed_count || 0);
      if (v > 0) return v;
      for (const m of f?.unrecovered_by_step || [])
        r(m.step_name) && (v += m.count || 0);
      return v;
    }, u = C(() => {
      const f = [], h = [], v = /* @__PURE__ */ new Set(), m = (ee, G = {}) => {
        v.has(ee) || (f.push({ name: ee, ...G }), v.add(ee));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: f, links: h };
      const b = n.checkinData.total_checkin_initiated || 0;
      m("Initiated by agent", { value: b }), m("Check In Started"), m("Check In Success"), m("Boarding Pass Issued");
      const p = n.checkinData.total_record_locator_init || 0, y = n.checkinData.total_record_locator_init_abandoned || 0, k = n.checkinData.total_checkin_pre_init_abandoned_error, _ = n.checkinData.total_checkin_pre_init_abandoned_voluntary, w = k != null || _ != null, $ = w ? Math.max(Number(k) || 0, 0) : 0, D = w ? Math.max(Number(_) || 0, 0) : 0, M = n.checkinData.total_record_locator_init_abandoned_error, F = n.checkinData.total_record_locator_init_abandoned_voluntary, z = M != null || F != null, W = z ? Math.max(Number(M) || 0, 0) : 0, S = z ? Math.max(Number(F) || 0, 0) : 0, L = z ? Math.max(y - W - S, 0) : y, B = Math.max(p - y, 0), j = n.checkinData.total_record_locator_started || 0, H = n.checkinData.total_record_locator_completed || 0, Q = n.checkinData.total_record_locator_closed || 0, re = n.checkinData.total_record_locator_unrecovered || 0, ue = Math.max(b - p, 0), X = $ + W, oe = w ? D + (z ? S + L : y) : ue + (z ? S + L : y);
      B > 0 && h.push({
        source: "Initiated by agent",
        target: "Check In Started",
        value: B,
        label: ye(B, b)
      }), oe > 0 && (m("Abandoned: No booking provided", { status: "abandon" }), h.push({
        source: "Initiated by agent",
        target: "Abandoned: No booking provided",
        value: oe,
        label: ye(oe, b)
      }));
      const R = n.checkinData.total_checkin_retrieval_user_error, U = n.checkinData.total_checkin_retrieval_business_rule, Y = n.checkinData.total_checkin_retrieval_tech_error, V = n.checkinData.total_checkin_retrieval_unknown_error, le = R != null || U != null || Y != null || V != null, ce = (ee, G) => {
        const P = Math.max(Number(G) || 0, 0);
        P > 0 && (m(ee, { status: "error" }), h.push({
          source: "Initiated by agent",
          target: ee,
          value: P,
          label: ye(P, b)
        }));
      };
      le ? (ce("Error: User error", R), ce("Error: Business rule", U), ce("Error: Tech error", Y), ce("Error: Unknown error", V)) : X > 0 && (m("Error: On Retrieval", { status: "error" }), h.push({
        source: "Initiated by agent",
        target: "Error: On Retrieval",
        value: X,
        label: ye(X, b)
      })), Q > 0 && h.push({
        source: "Check In Started",
        target: "Check In Success",
        value: Q,
        label: ye(Q, b)
      });
      const xe = c(n.failedData), K = Math.min(xe, Math.max(Q - H, 0));
      H > 0 && h.push({
        source: "Check In Success",
        target: "Boarding Pass Issued",
        value: H,
        label: ye(H, b)
      }), K > 0 && (m("Error: BP Not Issued", { status: "error" }), h.push({
        source: "Check In Success",
        target: "Error: BP Not Issued",
        value: K,
        label: ye(K, b)
      }));
      const ie = Math.max(Q - H - K, 0);
      if (ie > 0) {
        const ee = n.isAvianca ? "Abandoned after Closed" : "Abandoned: Check In Incomplete";
        m(ee, { status: "abandon" }), h.push({
          source: "Check In Success",
          target: ee,
          value: ie,
          label: ye(ie, b)
        });
      }
      re > 0 && (m("Error: On Check In Process", { status: "error" }), h.push({
        source: "Check In Started",
        target: "Error: On Check In Process",
        value: re,
        label: ye(re, b)
      }));
      const de = Math.max(j - Q - re, 0);
      return de > 0 && (m("Abandoned: Check In Incomplete", { status: "abandon" }), h.push({
        source: "Check In Started",
        target: "Abandoned: Check In Incomplete",
        value: de,
        label: ye(de, b)
      })), { nodes: f, links: h };
    });
    return t({ isDark: i }), (f, h) => (g(), te(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", E0, [
          u.value.nodes.length > 0 ? (g(), x("div", F0, [
            N(Yt, {
              data: u.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : (g(), x("div", O0, [
            d("div", V0, [
              d("div", N0, [
                N(T(dt), { class: "empty-icon" })
              ]),
              h[0] || (h[0] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
              h[1] || (h[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Ll = /* @__PURE__ */ ve(z0, [["__scopeId", "data-v-5a03deab"]]);
function Pn(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function j0(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Ke() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ut = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", tt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", H0 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", W0 = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function pi(e = "neutral") {
  return `${W0} kiut-select-option-badge--${e}`;
}
const K0 = { class: "flex flex-row gap-3 items-center" }, U0 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, Y0 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], q0 = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, X0 = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, G0 = { class: "relative" }, Z0 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, Q0 = ["placeholder", "aria-label"], J0 = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, ev = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, tv = ["aria-selected", "onClick", "onMouseenter"], av = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, nv = { class: "min-w-0 flex-1 truncate" }, Tt = /* @__PURE__ */ fe({
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
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: void 0 },
    invalid: { type: Boolean },
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-select-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = `${o}-err`, c = C(() => a.invalid ?? !1), u = ne(null), f = ne(null), h = ne(null), v = ne(null), m = ne(null), b = ne(!1), p = ne(0), y = ne(""), k = ne({});
    function _() {
      const V = f.value;
      if (!V) return;
      const le = V.getBoundingClientRect();
      k.value = {
        top: `${le.bottom - 3}px`,
        left: `${le.left}px`,
        width: `${le.width}px`
      };
    }
    const w = C(() => a.options.filter((V) => !V.disabled)), $ = C(() => {
      if (!a.searchable) return w.value;
      const V = y.value.trim().toLowerCase();
      return V ? w.value.filter(
        (le) => le.label.toLowerCase().includes(V) || le.badge?.label.toLowerCase().includes(V)
      ) : w.value;
    }), D = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), M = C(
      () => a.options.find((V) => V.value === a.modelValue) ?? null
    ), F = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : M.value?.label ?? String(a.modelValue)), z = C(() => M.value?.leadingClass);
    function W(V) {
      return `${String(V.value)}-${V.label}`;
    }
    function S(V) {
      return a.modelValue === V.value;
    }
    function L(V, le) {
      const ce = S(V), xe = p.value === le, K = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        K ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        ce ? K ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && xe ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      p.value = Math.max(
        0,
        $.value.findIndex((V) => V.value === a.modelValue)
      );
    }
    function j() {
      if (a.searchable) {
        m.value?.focus();
        return;
      }
      v.value?.focus();
    }
    function H() {
      _(), y.value = "", B(), We(() => j());
    }
    function Q() {
      b.value = !1, y.value = "";
    }
    function re(V) {
      n("update:modelValue", V.value), Q();
    }
    function ue() {
      if (!a.disabled) {
        if (b.value) {
          Q();
          return;
        }
        b.value = !0, H();
      }
    }
    function X(V) {
      V.stopPropagation(), !a.disabled && ue();
    }
    function oe(V) {
      if (!b.value) return;
      const le = V.target, ce = u.value, xe = h.value;
      ce && !ce.contains(le) && (!xe || !xe.contains(le)) && Q();
    }
    function R(V) {
      a.disabled || (V.key === "ArrowDown" || V.key === "Enter" || V.key === " ") && (V.preventDefault(), b.value || (b.value = !0, H()));
    }
    function U(V) {
      const le = $.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (V.key === "ArrowDown") {
        if (V.preventDefault(), le.length === 0) return;
        p.value = 0, v.value?.focus();
        return;
      }
      if (V.key === "ArrowUp") {
        if (V.preventDefault(), le.length === 0) return;
        p.value = le.length - 1, v.value?.focus();
        return;
      }
      if (V.key === "Enter") {
        V.preventDefault();
        const ce = le[p.value];
        ce && re(ce);
      }
    }
    function Y(V) {
      const le = $.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (le.length !== 0) {
        if (V.key === "ArrowDown") {
          V.preventDefault(), p.value = Math.min(p.value + 1, le.length - 1);
          return;
        }
        if (V.key === "ArrowUp") {
          if (V.preventDefault(), p.value === 0 && a.searchable) {
            m.value?.focus();
            return;
          }
          p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (V.key === "Enter") {
          V.preventDefault();
          const ce = le[p.value];
          ce && re(ce);
        }
      }
    }
    return Te(y, () => {
      p.value = 0;
    }), et(() => {
      document.addEventListener("click", oe);
    }), at(() => {
      document.removeEventListener("click", oe);
    }), (V, le) => (g(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", K0, [
        V.$slots.icon ? (g(), x("span", U0, [
          ke(V.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          class: q(T(ut))
        }, A(e.label), 3)) : E("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: f,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          T(tt),
          c.value ? T(Dt) : "",
          b.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": b.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : D.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: X,
        onKeydown: R
      }, [
        d("span", q0, [
          z.value ? (g(), x("span", {
            key: 0,
            class: q([z.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : E("", !0),
          M.value?.leadingIcon ? (g(), x("span", {
            key: 1,
            class: q([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              M.value.leadingIconWrapperClass
            ])
          }, [
            (g(), te(rt(M.value.leadingIcon), {
              class: q(["h-4 w-4", M.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : E("", !0),
          d("span", {
            class: q([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(F.value), 3),
          M.value?.badge ? (g(), x("span", {
            key: 2,
            class: q(T(pi)(M.value.badge.variant))
          }, A(M.value.badge.label), 3)) : E("", !0)
        ]),
        N(T(na), {
          class: q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", b.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Y0),
      e.errorText ? (g(), x("p", {
        key: 0,
        id: r,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : E("", !0),
      (g(), te(Wt, { to: "body" }, [
        Je(d("div", {
          ref_key: "panelRef",
          ref: h,
          style: _e(k.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (g(), x("div", X0, [
            d("div", G0, [
              d("span", Z0, [
                N(T(Ho), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
              ]),
              Je(d("input", {
                ref_key: "searchInputRef",
                ref: m,
                "onUpdate:modelValue": le[0] || (le[0] = (ce) => y.value = ce),
                type: "search",
                class: q([T(tt), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: le[1] || (le[1] = Be(() => {
                }, ["stop"])),
                onKeydown: Be(U, ["stop"])
              }, null, 42, Q0), [
                [Pt, y.value]
              ])
            ])
          ])) : E("", !0),
          e.listSectionLabel ? (g(), x("p", J0, A(e.listSectionLabel), 1)) : E("", !0),
          d("ul", {
            id: l,
            ref_key: "listRef",
            ref: v,
            role: "listbox",
            tabindex: "-1",
            class: q(
              e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"
            ),
            onKeydown: Be(Y, ["stop"])
          }, [
            $.value.length === 0 ? (g(), x("li", ev, A(e.noResultsText), 1)) : E("", !0),
            (g(!0), x(he, null, pe($.value, (ce, xe) => (g(), x("li", {
              key: W(ce),
              role: "option",
              "aria-selected": S(ce),
              class: q(L(ce, xe)),
              onClick: Be((K) => re(ce), ["stop"]),
              onMouseenter: (K) => p.value = xe
            }, [
              ce.leadingClass ? (g(), x("span", {
                key: 0,
                class: q([ce.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : E("", !0),
              e.showOptionCheck ? (g(), x("span", av, [
                S(ce) ? (g(), te(T(Pn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : E("", !0)
              ])) : E("", !0),
              ce.leadingIcon ? (g(), x("span", {
                key: 2,
                class: q([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  ce.leadingIconWrapperClass
                ])
              }, [
                (g(), te(rt(ce.leadingIcon), {
                  class: q(["h-4 w-4", ce.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : E("", !0),
              d("span", nv, A(ce.label), 1),
              ce.badge ? (g(), x("span", {
                key: 3,
                class: q(T(pi)(ce.badge.variant))
              }, A(ce.badge.label), 3)) : E("", !0)
            ], 42, tv))), 128))
          ], 34)
        ], 4), [
          [Kt, b.value]
        ])
      ]))
    ], 512));
  }
});
function Wo(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function Rl(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, l) => s(i, l, n, o)).map((i) => {
    const l = Wo(i, a);
    return l.length === 0 ? i : {
      ...i,
      [a]: Rl(l, t)
    };
  });
}
function Pl(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((u, f) => {
    const h = l(u, o + f), v = Wo(u, s), m = v.length > 0, b = i.has(h);
    c.push({
      row: u,
      key: h,
      depth: a,
      hasChildren: m,
      isExpanded: b,
      parentKey: n
    }), m && b && (r === void 0 || a < r) && c.push(
      ...Pl(v, t, a + 1, h, 0)
    );
  }), c;
}
function Il(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, l = [];
  return e.forEach((r, c) => {
    const u = s(r, n + c), f = Wo(r, o), h = f.length > 0, v = {
      depth: a,
      isChild: a > 0,
      hasChildren: h
    };
    (i?.(r, v) ?? !0) && l.push(u), f.length > 0 && l.push(
      ...Il(f, t, a + 1, 0)
    );
  }), l;
}
const ov = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, sv = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, iv = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, lv = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, rv = ["checked", "aria-label"], cv = ["aria-sort", "onClick"], dv = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, uv = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, hv = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, fv = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, gv = ["checked", "aria-label", "onChange"], mv = ["aria-expanded", "aria-label", "onClick"], pv = ["aria-expanded", "aria-label", "onClick"], vv = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, bv = { class: "min-w-0 flex-1" }, yv = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne(null), s = ne([...a.defaultExpandedKeys]), i = C({
      get() {
        return a.expandedKeys ?? s.value;
      },
      set(R) {
        s.value = R, n("update:expandedKeys", R);
      }
    }), l = C(
      () => new Set(i.value)
    ), r = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: l.value,
      resolveRowKey: m,
      maxDepth: a.maxDepth
    })), u = C(() => {
      const { sortKey: R, sortDirection: U, sortCompare: Y, rows: V } = a;
      return !R || !U || !Y ? V : a.expandable ? Rl(V, {
        childrenKey: a.childrenKey,
        sortKey: R,
        sortDirection: U,
        compare: Y
      }) : [...V].sort((le, ce) => Y(le, ce, R, U));
    }), f = C(() => a.expandable ? Pl(u.value, c.value) : u.value.map((R, U) => ({
      row: R,
      key: m(R, U),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function h(R) {
      return `cell-${R}`;
    }
    function v(R) {
      return R === "center" ? "text-center" : R === "right" ? "text-right" : "text-left";
    }
    function m(R, U) {
      if (typeof a.rowKey == "function")
        return a.rowKey(R);
      const Y = R[a.rowKey];
      return Y != null ? String(Y) : `__index_${U}`;
    }
    function b(R, U) {
      return R[U];
    }
    function p(R) {
      return R == null || typeof R == "object" ? "" : String(R);
    }
    function y(R) {
      return a.expandable && R === r.value;
    }
    function k(R) {
      return R.hasChildren || (a.isRowExpandable?.(R.row) ?? !1);
    }
    function _(R, U) {
      return {
        row: R.row,
        column: U,
        value: b(R.row, U.key),
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren,
        expanded: R.isExpanded
      };
    }
    function w(R) {
      if (!k(R)) return;
      const U = new Set(i.value);
      U.has(R.key) ? (U.delete(R.key), n("collapse", R.key, R.row)) : (a.singleExpand && U.clear(), U.add(R.key), n("expand", R.key, R.row)), i.value = [...U];
    }
    function $(R) {
      return {
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren
      };
    }
    function D(R, U) {
      return a.isRowSelectable?.(R, U) ?? !0;
    }
    function M(R) {
      return D(R.row, $(R));
    }
    function F(R) {
      return a.selectable && k(R) && !M(R);
    }
    function z(R) {
      return k(R) && !F(R);
    }
    function W(R) {
      return z(R) ? !1 : R.depth > 0 ? !0 : a.selectable && !k(R);
    }
    const S = C(() => {
      const { isRowSelectable: R } = a;
      return a.expandable ? Il(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: m,
        isRowSelectable: R
      }) : u.value.map((U, Y) => ({
        row: U,
        key: m(U, Y),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: U, context: Y }) => D(U, Y)).map(({ key: U }) => U);
    });
    function L(R) {
      const U = String(R);
      return a.selectedKeys.some((Y) => String(Y) === U);
    }
    const B = C(() => !a.selectable || S.value.length === 0 ? !1 : S.value.every(
      (R) => a.selectedKeys.some((U) => String(U) === String(R))
    )), j = C(() => {
      if (!a.selectable || S.value.length === 0) return !1;
      const R = S.value.filter(
        (U) => a.selectedKeys.some((Y) => String(Y) === String(U))
      );
      return R.length > 0 && R.length < S.value.length;
    });
    Te(
      [j, B, () => a.selectable],
      async () => {
        await We();
        const R = o.value;
        R && (R.indeterminate = j.value && !B.value);
      },
      { immediate: !0 }
    );
    function H() {
      if (a.selectable)
        if (B.value) {
          const R = new Set(
            S.value.map((Y) => String(Y))
          ), U = a.selectedKeys.filter(
            (Y) => !R.has(String(Y))
          );
          n("update:selectedKeys", U);
        } else {
          const R = new Set(a.selectedKeys.map((U) => String(U)));
          S.value.forEach((U) => R.add(String(U))), n("update:selectedKeys", [...R]);
        }
    }
    function Q(R) {
      if (!a.selectable) return;
      const U = String(R), Y = f.value.find((le) => String(le.key) === U);
      if (Y && !M(Y) || !Y && !S.value.some((le) => String(le) === U))
        return;
      a.selectedKeys.some((le) => String(le) === U) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((le) => String(le) !== U)
      ) : n("update:selectedKeys", [...a.selectedKeys, U]);
    }
    function re(R) {
      return `${a.ariaLabelSelectRow} ${R}`;
    }
    function ue(R) {
      n("sort", R);
    }
    function X(R) {
      return a.sortKey === R && a.sortDirection != null;
    }
    function oe(R) {
      return X(R) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (R, U) => (g(), x("div", ov, [
      d("div", sv, [
        d("table", {
          class: q([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", iv, [
              e.selectable ? (g(), x("th", lv, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: H
                }, null, 40, rv)
              ])) : E("", !0),
              (g(!0), x(he, null, pe(e.columns, (Y) => (g(), x("th", {
                key: Y.key,
                scope: "col",
                class: q([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  y(Y.key) && e.selectable ? "!pl-0" : "",
                  v(Y.align),
                  Y.headerClass ?? ""
                ])
              }, [
                Y.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: q(["kiut-table-sort-btn inline-flex items-center gap-1", v(Y.align)]),
                  "aria-sort": oe(Y.key),
                  onClick: (V) => ue(Y.key)
                }, [
                  d("span", null, A(Y.label), 1),
                  d("span", dv, [
                    X(Y.key) ? (g(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", uv, "↑")) : e.sortDirection === "desc" ? (g(), x("span", hv, "↓")) : E("", !0)
                    ], 64)) : (g(), x(he, { key: 1 }, [
                      U[0] || (U[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      U[1] || (U[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, cv)) : (g(), x(he, { key: 1 }, [
                  De(A(Y.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(he, null, pe(f.value, (Y) => (g(), x("tr", {
              key: Y.key,
              class: q([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                Y.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (g(), x("td", fv, [
                M(Y) ? (g(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: L(Y.key),
                  "aria-label": re(Y.key),
                  onChange: (V) => Q(Y.key)
                }, null, 40, gv)) : F(Y) ? (g(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": Y.isExpanded,
                  "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Be((V) => w(Y), ["stop"])
                }, [
                  N(T(na), {
                    class: q(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, mv)) : E("", !0)
              ])) : E("", !0),
              (g(!0), x(he, null, pe(e.columns, (V) => (g(), x("td", {
                key: V.key,
                class: q([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  y(V.key) ? "pl-0 pr-2" : "px-2",
                  v(V.align),
                  V.cellClass ?? ""
                ])
              }, [
                y(V.key) ? (g(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: _e({ paddingLeft: `${Y.depth * 1.25}rem` })
                }, [
                  ke(R.$slots, "row-expand", {
                    row: Y.row,
                    expanded: Y.isExpanded,
                    hasChildren: Y.hasChildren,
                    depth: Y.depth,
                    toggle: () => w(Y)
                  }, () => [
                    z(Y) ? (g(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": Y.isExpanded,
                      "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Be((le) => w(Y), ["stop"])
                    }, [
                      N(T(na), {
                        class: q(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, pv)) : W(Y) ? (g(), x("span", vv)) : E("", !0)
                  ], !0),
                  d("div", bv, [
                    ke(R.$slots, h(V.key), bt({ ref_for: !0 }, _(Y, V)), () => [
                      De(A(p(b(Y.row, V.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(R.$slots, h(V.key), bt({
                  key: 1,
                  ref_for: !0
                }, _(Y, V)), () => [
                  De(A(p(b(Y.row, V.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), El = /* @__PURE__ */ ve(yv, [["__scopeId", "data-v-b3104817"]]), xv = { class: "error-reasons-table-wrap table-section" }, kv = { class: "metric-cell" }, _v = { class: "metric-cell" }, ao = 5, wv = /* @__PURE__ */ fe({
  __name: "ErrorReasonsTable",
  props: {
    rows: {}
  },
  setup(e) {
    const t = e, a = [
      {
        key: "category_label",
        label: "Category / Raw log",
        align: "left",
        headerClass: "w-[58%]",
        cellClass: "error-reasons-label-cell"
      },
      {
        key: "error_count",
        label: "Count",
        align: "center",
        headerClass: "w-[16%]",
        cellClass: "error-reasons-metric-cell"
      },
      {
        key: "percentage",
        label: "%",
        align: "center",
        headerClass: "w-[16%]",
        cellClass: "error-reasons-metric-cell"
      }
    ], n = ne(!1), o = ne([]);
    Te(
      () => t.rows,
      () => {
        n.value = !1, o.value = [];
      }
    );
    const s = C(() => t.rows.length), i = C(() => s.value > ao), l = C(() => Math.max(0, s.value - ao)), r = C(() => n.value || !i.value ? t.rows : t.rows.slice(0, ao)), c = (f) => f.toLocaleString(), u = (f) => `${f.toFixed(1)}%`;
    return (f, h) => (g(), x("div", xv, [
      N(El, {
        columns: a,
        rows: r.value,
        "row-key": "id",
        expandable: "",
        "expand-column-key": "category_label",
        "fixed-layout": "",
        "expanded-keys": o.value,
        "onUpdate:expandedKeys": h[0] || (h[0] = (v) => o.value = v)
      }, {
        "cell-category_label": I(({ row: v, depth: m }) => [
          d("span", {
            class: q([
              "category-cell",
              m === 0 ? "category-cell--parent" : "category-cell--child"
            ])
          }, A(v.category_label), 3)
        ]),
        "cell-error_count": I(({ row: v }) => [
          d("span", kv, A(c(Number(v.error_count))), 1)
        ]),
        "cell-percentage": I(({ row: v }) => [
          d("span", _v, A(u(Number(v.percentage))), 1)
        ]),
        _: 1
      }, 8, ["rows", "expanded-keys"]),
      i.value ? (g(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: h[1] || (h[1] = (v) => n.value = !n.value)
      }, [
        De(A(n.value ? "View less" : `View more (${l.value} rows)`) + " ", 1),
        (g(), x("svg", {
          class: q(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...h[2] || (h[2] = [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : E("", !0)
    ]));
  }
}), vi = /* @__PURE__ */ ve(wv, [["__scopeId", "data-v-0332587f"]]), Cv = { class: "stage-select flex justify-end" }, $v = { class: "card-body" }, Sv = {
  key: 0,
  class: "error-reasons-content"
}, Mv = { class: "total-summary" }, Dv = { class: "total-summary__value" }, Av = { class: "total-summary__value" }, Tv = { class: "total-summary__value" }, Bv = { class: "section-title" }, Lv = {
  key: 0,
  class: "section-subtitle"
}, Rv = {
  key: 2,
  class: "section-empty"
}, Pv = {
  key: 1,
  class: "table-section"
}, Iv = {
  key: 1,
  class: "empty-state"
}, Ev = { class: "empty-state-content" }, Fv = { class: "empty-icon-wrapper" }, Ov = /* @__PURE__ */ fe({
  __name: "CheckinErrorReasons",
  props: {
    initiallyOpen: { type: Boolean, default: !1 },
    collapsible: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    stage: { default: "on_retrieve" },
    errorReasons: { default: null }
  },
  emits: ["update:stage"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = [
      { label: "On Retrieve", value: "on_retrieve" },
      { label: "On Check In Process", value: "on_check_in_process" }
    ], s = (p) => p == null ? "0" : p.toLocaleString(), i = (p) => {
      (p === "on_retrieve" || p === "on_check_in_process") && n("update:stage", p);
    }, l = C(() => a.errorReasons), r = C(() => a.stage === "on_check_in_process"), c = C(() => l.value?.total_errors ?? 0), u = C(() => l.value?.total_unrecovered ?? 0), f = C(() => l.value?.total_bp_not_issued ?? 0), h = (p, y) => ({
      id: `${y}-${p.category_key}`,
      category_label: p.category_label,
      error_count: p.error_count,
      percentage: p.percentage,
      children: (p.raw_logs || []).map((k, _) => ({
        id: `${y}-${p.category_key}-log-${_}`,
        category_label: k.message,
        error_count: k.count,
        percentage: k.percentage_of_total,
        children: []
      }))
    }), v = C(() => (l.value?.categories ?? []).map((y) => h(y, "retrieve"))), m = C(() => {
      const p = l.value?.categories ?? [], y = p.filter((_) => _.outcome_group === "unrecovered"), k = p.filter((_) => _.outcome_group === "bp_not_issued");
      return [
        {
          key: "unrecovered",
          title: "Error: On Check In Process",
          subtitle: "Reservations that failed before PSS close (unrecovered)",
          rows: y.map((_) => h(_, "unrecovered"))
        },
        {
          key: "bp_not_issued",
          title: "Error: BP Not Issued",
          subtitle: "Closed reservations where boarding pass was not issued",
          rows: k.map((_) => h(_, "bp-not-issued"))
        }
      ];
    }), b = C(() => l.value ? (l.value.categories?.length ?? 0) > 0 || l.value.total_errors > 0 : !1);
    return (p, y) => (g(), te(Se, {
      class: "checkin-error-reasons-root h-full min-h-0",
      title: "Check-in Error Reasons",
      subtitle: "Each failed event counts once",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerAside: I(() => [
        d("div", Cv, [
          N(Tt, {
            "model-value": e.stage,
            options: o,
            "aria-label-trigger": "Check-in error stage",
            "show-option-check": !1,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value"])
        ])
      ]),
      default: I(() => [
        d("div", $v, [
          b.value ? (g(), x("div", Sv, [
            d("p", Mv, [
              y[4] || (y[4] = De(" Total errors: ", -1)),
              d("span", Dv, A(s(c.value)), 1),
              r.value ? (g(), x(he, { key: 0 }, [
                y[0] || (y[0] = d("span", { class: "total-summary__divider" }, "·", -1)),
                y[1] || (y[1] = De(" Unrecovered: ", -1)),
                d("span", Av, A(s(u.value)), 1),
                y[2] || (y[2] = d("span", { class: "total-summary__divider" }, "·", -1)),
                y[3] || (y[3] = De(" BP not issued: ", -1)),
                d("span", Tv, A(s(f.value)), 1)
              ], 64)) : E("", !0)
            ]),
            r.value ? (g(!0), x(he, { key: 0 }, pe(m.value, (k) => (g(), x("section", {
              key: k.key,
              class: "table-section error-reasons-section"
            }, [
              d("h4", Bv, A(k.title), 1),
              k.subtitle ? (g(), x("p", Lv, A(k.subtitle), 1)) : E("", !0),
              k.rows.length > 0 ? (g(), te(vi, {
                key: 1,
                rows: k.rows
              }, null, 8, ["rows"])) : (g(), x("p", Rv, "No errors in this cohort."))
            ]))), 128)) : (g(), x("section", Pv, [
              v.value.length > 0 ? (g(), te(vi, {
                key: 0,
                rows: v.value
              }, null, 8, ["rows"])) : E("", !0)
            ]))
          ])) : (g(), x("div", Iv, [
            d("div", Ev, [
              d("div", Fv, [
                N(T(vp), { class: "empty-icon" })
              ]),
              y[5] || (y[5] = d("p", { class: "empty-title" }, "No error reasons for this stage", -1)),
              y[6] || (y[6] = d("p", { class: "empty-description" }, " Try another stage or adjust the date range to see terminal check-in failures. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Vv = /* @__PURE__ */ ve(Ov, [["__scopeId", "data-v-a0beb33a"]]), Nv = ["aria-label", "aria-expanded"], kn = 8, xa = 12, bi = /* @__PURE__ */ fe({
  __name: "CardMetricInfo",
  props: {
    title: {},
    text: {},
    dark: { type: Boolean }
  },
  setup(e) {
    const t = e, a = ne(!1), n = ne({
      top: "0px",
      left: "0px"
    }), o = ne(null), s = ne(null), i = C(
      () => t.dark ? "bg-[#8b5cf6] hover:bg-[#a78bfa] focus-visible:ring-[#8b5cf6]/50 focus-visible:ring-offset-[#1a1a23]" : "bg-[#7c3aed] hover:bg-[#6d28d9] focus-visible:ring-[#7c3aed]/40"
    );
    function l() {
      a.value = !1;
    }
    function r() {
      const h = o.value, v = s.value;
      if (!h || !v) return;
      const m = h.getBoundingClientRect(), b = v.getBoundingClientRect(), p = m.top - xa, y = window.innerHeight - m.bottom - xa, k = p >= b.height + kn, _ = y >= b.height + kn;
      let $ = k || !_ && p >= y ? m.top - b.height - kn : m.bottom + kn;
      $ = Math.max(
        xa,
        Math.min($, window.innerHeight - b.height - xa)
      );
      let D = m.left + m.width / 2 - b.width / 2;
      D = Math.max(
        xa,
        Math.min(D, window.innerWidth - b.width - xa)
      ), n.value = {
        top: `${$}px`,
        left: `${D}px`
      };
    }
    async function c() {
      if (!t.text.trim()) return;
      a.value = !0, await We();
      const h = s.value;
      h && (h.style.visibility = "hidden", r(), h.style.visibility = "visible");
    }
    function u() {
      a.value && l();
    }
    function f(h) {
      h.key === "Escape" && l();
    }
    return window.addEventListener("scroll", u, !0), window.addEventListener("resize", u), window.addEventListener("keydown", f), at(() => {
      window.removeEventListener("scroll", u, !0), window.removeEventListener("resize", u), window.removeEventListener("keydown", f);
    }), (h, v) => (g(), x(he, null, [
      d("button", {
        ref_key: "triggerRef",
        ref: o,
        type: "button",
        class: q(["inline-flex size-3.5 shrink-0 cursor-help items-center justify-center rounded-full text-[8px] font-bold leading-none text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1", i.value]),
        "aria-label": `About ${e.title}`,
        "aria-expanded": a.value,
        onMouseenter: c,
        onMouseleave: l,
        onFocus: c,
        onBlur: l
      }, " i ", 42, Nv),
      (g(), te(Wt, { to: "body" }, [
        a.value ? (g(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: s,
          role: "tooltip",
          class: q([
            "pointer-events-none w-max max-w-[min(20rem,calc(100vw-1.5rem))] rounded-xl px-3 py-2.5 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] shadow-lg",
            e.dark ? "bg-[#25252e] text-white shadow-black/50 ring-1 ring-white/10" : "bg-white text-slate-900 shadow-slate-900/10 ring-1 ring-black/10"
          ]),
          style: _e({
            position: "fixed",
            top: n.value.top,
            left: n.value.left,
            zIndex: 1100
          })
        }, [
          d("p", {
            class: q(["m-0 text-[13px] font-semibold leading-5", e.dark ? "text-white" : "text-slate-900"])
          }, A(e.title), 3),
          d("p", {
            class: q(["m-0 mt-1 text-[12px] font-normal leading-4", e.dark ? "text-[#b4b4be]" : "text-slate-500"])
          }, A(e.text), 3)
        ], 6)) : E("", !0)
      ]))
    ], 64));
  }
}), zv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, jv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Hv = {
  key: "title-content",
  class: "header-title-group"
}, Wv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Kv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Uv = { class: "metric-label-text" }, Yv = {
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
}, Qv = { class: "card-body" }, Jv = { class: "metric-row" }, eb = {
  key: 0,
  class: "metric-prefix"
}, tb = {
  key: 0,
  class: "metric-label metric-label--row"
}, ab = /* @__PURE__ */ fe({
  __name: "CardMetric",
  props: {
    label: {},
    value: {},
    prefix: { default: void 0 },
    valueSize: { default: "default" },
    labelPosition: { default: "below" },
    tooltip: { default: void 0 },
    tooltipTitle: { default: void 0 },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    currentValue: { default: 0 },
    previousValue: { default: null }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = Me($e(a, "theme")), o = C(() => a.labelPosition === "header"), s = C(() => a.tooltip?.trim() || ""), i = C(() => a.tooltipTitle?.trim() || a.label), l = C(
      () => a.previousValue !== null && a.previousValue !== void 0
    ), r = C(() => {
      if (!l.value) return 0;
      const f = a.previousValue;
      return f === 0 ? a.currentValue > 0 ? 100 : 0 : (a.currentValue - f) / f * 100;
    }), c = C(() => {
      const f = r.value;
      if (Number.isNaN(f)) return "-";
      const h = f.toFixed(1);
      return f > 0 ? `+${h}%` : `${h}%`;
    }), u = C(() => r.value > 0 ? "change-badge--up" : r.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: r }), (f, h) => (g(), te(Se, {
      collapsible: !1,
      class: q([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": T(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: I(() => [
        N(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: I(() => [
            e.loading ? (g(), x("div", zv, [
              h[0] || (h[0] = d("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (g(), x("div", jv)) : E("", !0)
            ])) : (g(), x("div", Hv, [
              d("div", Wv, [
                ke(f.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (g(), x("span", Kv, [
                d("span", Uv, A(e.label), 1),
                s.value ? (g(), te(bi, {
                  key: 0,
                  title: i.value,
                  text: s.value,
                  dark: T(n)
                }, null, 8, ["title", "text", "dark"])) : E("", !0)
              ])) : E("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: I(() => [
        N(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: I(() => [
            e.loading ? (g(), x("div", Yv)) : (g(), x("div", qv, [
              ke(f.$slots, "headerAside", {}, () => [
                l.value ? (g(), x("div", {
                  key: 0,
                  class: q(["change-badge", u.value])
                }, A(c.value), 3)) : E("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: I(() => [
        N(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: I(() => [
            e.loading ? (g(), x("div", Xv, [
              h[1] || (h[1] = d("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? E("", !0) : (g(), x("div", Gv))
            ])) : (g(), x("div", Zv, [
              d("div", Qv, [
                ke(f.$slots, "value", {}, () => [
                  d("div", Jv, [
                    e.prefix ? (g(), x("span", eb, A(e.prefix), 1)) : E("", !0),
                    d("span", {
                      class: q(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? E("", !0) : (g(), x("span", tb, [
                  d("span", null, A(e.label), 1),
                  s.value ? (g(), te(bi, {
                    key: 0,
                    title: i.value,
                    text: s.value,
                    dark: T(n)
                  }, null, 8, ["title", "text", "dark"])) : E("", !0)
                ]))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), Ye = /* @__PURE__ */ ve(ab, [["__scopeId", "data-v-342ccc27"]]);
function nb(e, t) {
  return t == null ? null : t === 0 ? e > 0 ? 100 : 0 : (e - t) / t * 100;
}
function ob(e) {
  const t = e.toFixed(1);
  return e > 0 ? `+${t}%` : `${t}%`;
}
function sb(e, t = !1) {
  const a = t ? -e : e;
  return a > 0 ? "change-badge--up" : a < 0 ? "change-badge--down" : "change-badge--neutral";
}
function yi(e, t, a = !1) {
  const n = nb(e, t);
  return n === null ? null : {
    label: ob(n),
    class: sb(n, a)
  };
}
function no(e) {
  return `${Number(e || 0).toFixed(1)}%`;
}
const ib = {
  initiated: "Check-in Initiated",
  success: "% Check-in Success",
  errors: "% Errors",
  abandon: "% Abandon"
}, lb = { class: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4" }, rb = { class: "kpi-value-with-count" }, cb = { class: "kpi-value-with-count__main" }, db = {
  key: 0,
  class: "kpi-value-with-count__secondary"
}, ub = { class: "kpi-value-with-count" }, hb = { class: "kpi-value-with-count__main" }, fb = {
  key: 0,
  class: "kpi-value-with-count__secondary"
}, gb = { class: "kpi-value-with-count" }, mb = { class: "kpi-value-with-count__main" }, pb = {
  key: 0,
  class: "kpi-value-with-count__secondary"
}, vb = /* @__PURE__ */ fe({
  __name: "CheckinKPI",
  props: {
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    labels: { default: () => ({}) },
    checkinInitiated: { default: 0 },
    previousCheckinInitiated: { default: null },
    successRatePct: { default: 0 },
    successCount: { default: 0 },
    previousSuccessRatePct: { default: null },
    errorRatePct: { default: 0 },
    errorCount: { default: 0 },
    previousErrorRatePct: { default: null },
    abandonRatePct: { default: 0 },
    abandonCount: { default: 0 },
    previousAbandonRatePct: { default: null }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = Me($e(a, "theme")), o = C(() => ({
      ...ib,
      ...a.labels
    }));
    function s(b) {
      return ge(b);
    }
    function i(b) {
      return b ? `(${s(b)})` : null;
    }
    const l = C(() => no(a.successRatePct)), r = C(() => i(a.successCount)), c = C(() => no(a.errorRatePct)), u = C(() => i(a.errorCount)), f = C(
      () => yi(a.errorRatePct, a.previousErrorRatePct, !0)
    ), h = C(() => no(a.abandonRatePct)), v = C(() => i(a.abandonCount)), m = C(
      () => yi(a.abandonRatePct, a.previousAbandonRatePct, !0)
    );
    return t({ isDark: n }), (b, p) => (g(), x("div", {
      class: q(["checkin-kpi w-full", { "checkin-kpi--dark": T(n) }]),
      "data-testid": "checkin-kpi"
    }, [
      d("div", lb, [
        N(Ye, {
          label: o.value.initiated,
          "label-position": "header",
          value: s(e.checkinInitiated),
          loading: e.loading,
          theme: e.theme,
          "current-value": e.checkinInitiated,
          "previous-value": e.previousCheckinInitiated
        }, {
          icon: I(() => [
            N(T(yp), { class: "w-2 h-2" })
          ]),
          _: 1
        }, 8, ["label", "value", "loading", "theme", "current-value", "previous-value"]),
        N(Ye, {
          label: o.value.success,
          "label-position": "header",
          value: l.value,
          loading: e.loading,
          theme: e.theme,
          "current-value": e.successRatePct,
          "previous-value": e.previousSuccessRatePct
        }, {
          icon: I(() => [
            N(T(gp), { class: "w-2 h-2" })
          ]),
          value: I(() => [
            d("div", rb, [
              d("span", cb, A(l.value), 1),
              r.value ? (g(), x("span", db, A(r.value), 1)) : E("", !0)
            ])
          ]),
          _: 1
        }, 8, ["label", "value", "loading", "theme", "current-value", "previous-value"]),
        N(Ye, {
          label: o.value.errors,
          "label-position": "header",
          value: c.value,
          loading: e.loading,
          theme: e.theme,
          "current-value": e.errorRatePct,
          "previous-value": null
        }, Sn({
          icon: I(() => [
            N(T(wp), { class: "w-1 h-1" })
          ]),
          value: I(() => [
            d("div", ub, [
              d("span", hb, A(c.value), 1),
              u.value ? (g(), x("span", fb, A(u.value), 1)) : E("", !0)
            ])
          ]),
          _: 2
        }, [
          f.value ? {
            name: "headerAside",
            fn: I(() => [
              d("div", {
                class: q(["percent-trend-badge", f.value.class])
              }, A(f.value.label), 3)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["label", "value", "loading", "theme", "current-value"]),
        N(Ye, {
          label: o.value.abandon,
          "label-position": "header",
          value: h.value,
          loading: e.loading,
          theme: e.theme,
          "current-value": e.abandonRatePct,
          "previous-value": null
        }, Sn({
          icon: I(() => [
            N(T(up), { class: "w-1 h-1" })
          ]),
          value: I(() => [
            d("div", gb, [
              d("span", mb, A(h.value), 1),
              v.value ? (g(), x("span", pb, A(v.value), 1)) : E("", !0)
            ])
          ]),
          _: 2
        }, [
          m.value ? {
            name: "headerAside",
            fn: I(() => [
              d("div", {
                class: q(["percent-trend-badge", m.value.class])
              }, A(m.value.label), 3)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["label", "value", "loading", "theme", "current-value"])
      ])
    ], 2));
  }
}), Fl = /* @__PURE__ */ ve(vb, [["__scopeId", "data-v-0339579d"]]), bb = { class: "card-body" }, yb = {
  key: 0,
  class: "checkin-segments-daily-section"
}, xb = { class: "w-full min-w-0" }, kb = { class: "segment-plain" }, _b = { class: "segment-plain" }, wb = { class: "segment-plain" }, Cb = { class: "percentage-value" }, $b = { class: "percentage-value" }, Sb = { class: "percentage-value success" }, Mb = {
  key: 1,
  class: "empty-state"
}, Db = /* @__PURE__ */ fe({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (h) => {
      o("export", h);
    }, { isDark: i } = Me($e(n, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" }
    ], r = C(
      () => n.data.map((h, v) => ({
        id: `segment-${v}-${h.departure_airport}-${h.arrival_airport}-${h.segment_init_count}-${h.segment_started_count}`,
        departure_airport: h.departure_airport,
        conexion_airport: h.conexion_airport,
        arrival_airport: h.arrival_airport,
        segment_init_count: h.segment_init_count,
        segment_started_count: h.segment_started_count,
        segment_completed_count: h.segment_completed_count,
        segment_closed_count: h.segment_closed_count
      }))
    ), c = (h, v) => !v || v === 0 || !h ? "0%" : `${Math.round(h / v * 100)}%`, u = (h) => !h || h === "None" ? "-" : String(h).trim().replace(/_[0-9]+$/i, ""), f = (h) => {
      const v = u(h?.departure_airport), m = u(h?.arrival_airport);
      return v === "-" || m === "-" ? !1 : v === m;
    };
    return t({ isDark: i }), (h, v) => (g(), te(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !n.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", bb, [
          n.data.length > 0 ? (g(), x("section", yb, [
            d("div", xb, [
              N(pt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": I(({ row: m }) => [
                  d("span", kb, A(u(m.departure_airport)), 1)
                ]),
                "cell-connection": I(({ row: m }) => [
                  d("span", {
                    class: q(["segment-plain", {
                      "segment-plain--muted": u(m.conexion_airport) === "-"
                    }])
                  }, A(u(m.conexion_airport)), 3)
                ]),
                "cell-arrival": I(({ row: m }) => [
                  d("span", _b, A(u(m.arrival_airport)), 1)
                ]),
                "cell-trip": I(({ row: m }) => [
                  d("span", wb, A(f(m) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": I(({ row: m }) => [
                  De(A(T(ge)(m.segment_init_count)), 1)
                ]),
                "cell-started": I(({ row: m }) => [
                  d("span", Cb, A(c(
                    m.segment_started_count,
                    m.segment_init_count
                  )), 1)
                ]),
                "cell-closed": I(({ row: m }) => [
                  d("span", $b, A(c(
                    m.segment_closed_count,
                    m.segment_init_count
                  )), 1)
                ]),
                "cell-completed": I(({ row: m }) => [
                  d("span", Sb, A(c(
                    m.segment_completed_count,
                    m.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (g(), x("section", Mb, [...v[0] || (v[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No segment data available"),
              d("p", { class: "empty-description" }, " No flight segment data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Ol = /* @__PURE__ */ ve(Db, [["__scopeId", "data-v-9a9d7a34"]]);
function oo(e, t) {
  return t ? e / t * 100 : 0;
}
function xi(e, t) {
  const a = e?.total_checkin_initiated ?? 0, n = e?.total_record_locator_closed ?? 0, o = e?.total_record_locator_failed ?? t?.total_checkin_failed ?? 0, s = (e?.total_checkin_pre_init_abandoned_error ?? 0) + (e?.total_checkin_pre_init_abandoned_voluntary ?? 0) + (e?.total_record_locator_init_abandoned ?? 0);
  return {
    checkinInitiated: a,
    successRatePct: oo(n, a),
    successCount: n,
    errorRatePct: oo(o, a),
    errorCount: o,
    abandonRatePct: oo(s, a),
    abandonCount: s
  };
}
function Ab(e, t) {
  return t ? {
    ...e,
    previousCheckinInitiated: t.checkinInitiated ?? null,
    previousSuccessRatePct: t.successRatePct ?? null,
    previousErrorRatePct: t.errorRatePct ?? null,
    previousAbandonRatePct: t.abandonRatePct ?? null
  } : {
    ...e,
    previousCheckinInitiated: null,
    previousSuccessRatePct: null,
    previousErrorRatePct: null,
    previousAbandonRatePct: null
  };
}
const Tb = { class: "checkin-container__body" }, Bb = /* @__PURE__ */ fe({
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
    showKpi: { type: Boolean, default: !0 },
    kpiLoading: { type: Boolean },
    kpiProps: {},
    kpiLabels: {},
    previousCheckinData: {},
    previousCheckinFailedData: {},
    checkinData: {},
    checkinFailedData: {},
    segmentsData: {},
    showPaymentLinks: { type: Boolean, default: !1 }
  },
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = C(
      () => a.loading ? !1 : a.kpiLoading ?? a.checkinLoading
    ), s = C(
      () => a.loading ? !1 : a.checkinLoading
    ), i = C(
      () => a.loading ? !1 : a.segmentsLoading
    ), l = C(() => {
      const f = xi(
        a.checkinData,
        a.checkinFailedData
      ), h = xi(
        a.previousCheckinData,
        a.previousCheckinFailedData
      );
      return {
        ...Ab(f, h),
        ...a.kpiProps,
        labels: {
          ...a.kpiProps?.labels,
          ...a.kpiLabels
        }
      };
    });
    function r(f, h) {
      n("export", { source: f, format: h });
    }
    function c(f) {
      return typeof f == "object" && f !== null && "source" in f;
    }
    function u(f) {
      if (c(f)) {
        n("export", f);
        return;
      }
      r("checkinSegments", f);
    }
    return (f, h) => (g(), te(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: h[1] || (h[1] = (v) => n("open"))
    }, {
      default: I(() => [
        d("div", Tb, [
          e.showKpi ? (g(), te(Fl, bt({ key: 0 }, l.value, {
            loading: o.value,
            theme: e.theme
          }), null, 16, ["loading", "theme"])) : E("", !0),
          e.showCheckin ? (g(), te(Ll, {
            key: 1,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            "is-avianca": e.showPaymentLinks,
            onExport: h[0] || (h[0] = (v) => r("checkin", v))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "is-avianca"])) : E("", !0),
          N(Ol, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: i.value,
            data: e.segmentsData ?? [],
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: u
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Lb = /* @__PURE__ */ ve(Bb, [["__scopeId", "data-v-89794351"]]), Rb = { class: "card-body" }, Pb = { class: "chart-section" }, Ib = { class: "chart-wrapper" }, Eb = {
  key: 1,
  class: "empty-chart"
}, Fb = { class: "payment-success-summary" }, Ob = {
  key: 0,
  class: "disruption-daily-section"
}, Vb = { class: "w-full min-w-0" }, Nb = { class: "font-medium text-center" }, zb = { class: "text-center" }, jb = { class: "text-center" }, Hb = { class: "percentage-text" }, Wb = { class: "text-center" }, Kb = { class: "abandoned-value" }, Ub = { class: "badges-container badges-wrap" }, Yb = { class: "badges-container badges-wrap" }, qb = {
  key: 1,
  class: "empty-state"
}, Xb = /* @__PURE__ */ fe({
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
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    function a(p) {
      return p;
    }
    const n = e, o = t, s = (p) => {
      o("export", p);
    }, i = C(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated by agent", align: "center" },
      { key: "started", label: "Disruption started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "center" },
      { key: "involuntary", label: "Involuntary", align: "center" }
    ], r = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => n.data?.total_payment_success || []), u = C(() => {
      const p = c.value;
      return p.length === 0 ? h(0) : p.map((y) => `${y.currency} ${h(y.total_value)}`).join(" · ");
    }), f = (p, y) => Et(p, y), h = (p) => Fe(p), v = (p) => (p ?? []).reduce((y, k) => y + (k.count ?? 0), 0), m = (p) => typeof p.sell_success_count == "number" ? p.sell_success_count : v(p.payment_success_total), b = C(() => {
      const p = n.data, y = p.total_disruption_conversations || 0, k = p.total_disruption_initiated || 0, _ = p.total_voluntary || 0, w = p.total_involuntary || 0, $ = p.total_accepted || 0, D = p.total_confirmed || 0, M = typeof p.total_sell_success == "number" ? p.total_sell_success : v(p.total_payment_success), F = p.total_sell_failed || 0, z = Math.max(0, y - k), W = Math.max(
        0,
        k - _ - w
      ), S = Math.max(0, w - $), L = Math.max(0, _ - D), B = F, j = Math.max(0, D - M - B), H = (ue, X) => ye(ue, X), Q = [
        { name: "Initiated by agent", status: "success" },
        { name: "Disruption started", status: "success" },
        { name: "Voluntary", status: "success" },
        { name: "Selected", status: "success" },
        { name: "Voluntary change success", status: "success" },
        { name: "Not Paid", status: "abandon" },
        { name: "Error: payment rejected", status: "error" },
        { name: "Not Confirmed", status: "abandon" },
        { name: "Involuntary", status: "success" },
        { name: "Involuntary change accepted", status: "success" },
        { name: "Redirect to Human", status: "error" },
        { name: "Abandoned: No Response", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], re = [];
      return k > 0 && re.push({
        source: "Initiated by agent",
        target: "Disruption started",
        value: k,
        label: H(k, y)
      }), z > 0 && re.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: z,
        label: H(z, y)
      }), _ > 0 && re.push({
        source: "Disruption started",
        target: "Voluntary",
        value: _,
        label: H(_, y)
      }), w > 0 && re.push({
        source: "Disruption started",
        target: "Involuntary",
        value: w,
        label: H(w, y)
      }), W > 0 && re.push({
        source: "Disruption started",
        target: "Abandoned (Start)",
        value: W,
        label: H(W, y)
      }), $ > 0 && re.push({
        source: "Involuntary",
        target: "Involuntary change accepted",
        value: $,
        label: H($, y)
      }), S > 0 && re.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: S,
        label: H(S, y)
      }), D > 0 && re.push({
        source: "Voluntary",
        target: "Selected",
        value: D,
        label: H(D, y)
      }), L > 0 && re.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: H(L, y)
      }), M > 0 && re.push({
        source: "Selected",
        target: "Voluntary change success",
        value: M,
        label: H(M, y)
      }), B > 0 && re.push({
        source: "Selected",
        target: "Error: payment rejected",
        value: B,
        label: H(B, y)
      }), j > 0 && re.push({
        source: "Selected",
        target: "Not Paid",
        value: j,
        label: H(j, y)
      }), { nodes: Q, links: re };
    });
    return (p, y) => (g(), te(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (k) => o("open"))
    }, {
      headerExport: I(() => [
        e.enableExport && !n.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Rb, [
          d("section", Pb, [
            d("div", Ib, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (g(), te(Yt, {
                key: 0,
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (g(), x("div", Eb, [...y[1] || (y[1] = [
                d("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          d("section", Fb, [
            N(be, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (g(), x("section", Ob, [
            y[2] || (y[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", Vb, [
              N(pt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: k }) => [
                  d("span", Nb, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: k }) => [
                  d("span", zb, A(T(ge)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": I(({ row: k }) => [
                  d("span", jb, [
                    De(A(T(ge)(Number(k.disruption_initiated_count))) + " ", 1),
                    d("span", Hb, " (" + A(f(
                      Number(k.disruption_initiated_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": I(({ row: k }) => [
                  d("span", Wb, [
                    d("span", Kb, A(T(ge)(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count)
                    )) + " (" + A(f(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": I(({ row: k }) => [
                  d("div", Ub, [
                    (g(!0), x(he, null, pe([k], (_, w) => (g(), x(he, { key: w }, [
                      N(Ge, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: I(() => [
                          De(" VOL " + A(T(ge)(_.voluntary_count)) + " (" + A(f(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: I(() => [
                          De(" Selected " + A(T(ge)(_.confirmed_count)) + " (" + A(f(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "warning" }, {
                        default: I(() => [
                          De(" Not Confirm " + A(T(ge)(_.voluntary_count - _.confirmed_count)) + " (" + A(f(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: I(() => [
                          De(" Payment rejected " + A(T(ge)(_.sell_failed_count)) + " (" + A(f(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "orange" }, {
                        default: I(() => [
                          De(" Not Paid " + A(T(ge)(
                            Math.max(
                              0,
                              _.confirmed_count - m(_) - _.sell_failed_count
                            )
                          )) + " (" + A(f(
                            Math.max(
                              0,
                              _.confirmed_count - m(_) - _.sell_failed_count
                            ),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: I(() => [
                          De(" Voluntary change success " + A(T(ge)(m(_))) + " (" + A(f(
                            m(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (g(!0), x(he, null, pe(_.payment_success_total || [], ($) => (g(), te(Ge, {
                        key: `${_.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: I(() => [
                          De(A($.currency) + " " + A(h($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": I(({ row: k }) => [
                  d("div", Yb, [
                    (g(!0), x(he, null, pe([k], (_, w) => (g(), x(he, { key: w }, [
                      N(Ge, { color: "purple" }, {
                        default: I(() => [
                          De(" INV " + A(T(ge)(_.involuntary_count)) + " (" + A(f(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: I(() => [
                          De(" Human " + A(T(ge)(_.involuntary_count - _.accepted_count)) + " (" + A(f(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: I(() => [
                          De(" Involuntary change accepted " + A(T(ge)(_.accepted_count)) + " (" + A(f(
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
          ])) : (g(), x("section", qb, [...y[3] || (y[3] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No disruption data available"),
              d("p", { class: "empty-description" }, " No disruption data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Gb = /* @__PURE__ */ ve(Xb, [["__scopeId", "data-v-d98cd735"]]), Zb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Qb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Jb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ey = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ty = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, ay = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ny = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (v) => {
      o("export", v);
    }, i = $e(n, "theme"), { isDark: l } = Me(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = ne({
      labels: [],
      datasets: []
    }), u = C(
      () => n.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), f = C(() => {
      const v = u.value, m = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, b = (k) => m > 0 ? (k / m * 100).toFixed(1) : "0.0", p = v.total_faq_events, y = p > 0 ? `${(v.total_documents_found / p * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${b(v.total_airline_information_retrieved)}%`,
          subvalue: `${ge(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${b(v.total_booking_info_retrieved)}%`,
          subvalue: `${ge(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${b(v.total_flight_status_retrieved)}%`,
          subvalue: `${ge(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: ge(v.total_documents_found),
          subvalue: y
        }
      ];
    }), h = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const m = v.faq_by_day || [];
      if (m.length > 0) {
        const b = m.map(
          (_) => Ne(_.date).format("MMM DD")
        ), p = m.map(
          (_) => _.airline_information_retrieved_count || 0
        ), y = m.map(
          (_) => _.flight_status_retrieved_count || 0
        ), k = m.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: b,
          datasets: [
            {
              label: "Airline Information",
              data: p,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: y,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: k,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Te(
      () => n.data,
      (v) => {
        h(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (v, m) => (g(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQs",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !n.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Zb, [
          d("div", Qb, [
            c.value.labels && c.value.labels.length ? (g(), x("section", Jb, [
              d("div", ey, [
                N(mt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              d("div", ty, [
                (g(!0), x(he, null, pe(f.value, (b) => (g(), te(be, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: b.value,
                  subvalue: b.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (g(), x("section", ay, [...m[0] || (m[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("div", { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                  d("svg", {
                    class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])
                ]),
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), oy = /* @__PURE__ */ ve(ny, [["__scopeId", "data-v-74ceae76"]]), kt = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), sy = {
  key: 0,
  class: "w-52"
}, iy = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ly = { class: "w-full shrink-0 flex min-h-0 flex-col" }, ry = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, cy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, dy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, uy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, hy = { class: "max-w-[360px] px-4 text-center" }, fy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, gy = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, my = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, py = /* @__PURE__ */ fe({
  __name: "MessagesPerAgent",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    title: { default: "Interactions by Agent" },
    subtitle: { default: "Responses sent by AI agents" },
    unit: { default: "msgs" },
    totalConversations: { default: void 0 },
    emptyTitle: { default: "No agent interactions data" },
    emptyDescription: { default: "Try adjusting the date range or check your filters to see agent interaction trends." },
    breakdownBy: { default: "" },
    breakdownOptions: { default: () => [] },
    showSummaryCards: { type: Boolean, default: !0 },
    maxSeries: { default: void 0 }
  },
  emits: ["export", "changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = {
      all: "#8b5cf6",
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308",
      unassigned: "#64748B"
    }, o = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], s = e, i = a, l = (k) => {
      i("export", k);
    }, r = (k) => {
      i("changeBreakdown", String(k));
    }, c = (k) => {
      const _ = k.toLowerCase(), w = n[_] || n[k];
      if (w) return w;
      const $ = Array.from(_).reduce(
        (D, M) => (D << 5) - D + M.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs($) % o.length];
    }, u = $e(s, "theme"), { isDark: f } = Me(u), h = (k) => {
      const _ = kt(k).replace(/_/g, " ");
      return _.charAt(0).toUpperCase() + _.slice(1);
    }, v = C(() => {
      const k = {};
      for (const _ of Object.values(s.data?.agents_by_day || {}))
        for (const [w, $] of Object.entries(_))
          k[w] = (k[w] || 0) + $;
      return k;
    }), m = C(() => {
      const k = s.data?.agents_by_day || {}, _ = Object.keys(k).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const $ = Object.keys(v.value).sort(
        (D, M) => v.value[M] - v.value[D] || D.localeCompare(M)
      ).slice(0, s.maxSeries).map((D) => ({
        label: h(D),
        data: _.map((M) => k[M]?.[D] || 0),
        borderColor: c(D)
      }));
      return {
        labels: _.map((D) => Ne(D).format("MMM DD")),
        datasets: $
      };
    }), b = C(() => {
      const k = Object.values(v.value).reduce((w, $) => w + $, 0), _ = s.totalConversations ?? k;
      return _ === 0 ? [] : Object.entries(v.value).sort(([, w], [, $]) => $ - w).map(([w, $]) => ({
        name: w,
        label: h(w),
        total: $,
        percentage: ($ / _ * 100).toFixed(1),
        color: c(w)
      }));
    }), p = C(() => b.value.slice(0, 4)), y = C(() => {
      const k = p.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    });
    return t({ isDark: f }), (k, _) => (g(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: I(() => [
        s.breakdownOptions.length ? (g(), x("div", sy, [
          N(Tt, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": r
          }, null, 8, ["model-value", "options"])
        ])) : E("", !0)
      ]),
      headerExport: I(() => [
        e.enableExport && !s.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", iy, [
          d("div", ly, [
            m.value.labels && m.value.labels.length ? (g(), x("section", ry, [
              d("div", cy, [
                N(mt, {
                  data: m.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && p.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(y.value)
              }, [
                (g(!0), x(he, null, pe(p.value, (w) => (g(), te(be, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : s.showSummaryCards && b.value.length ? (g(), x("section", dy, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: _e(y.value)
              }, [
                (g(!0), x(he, null, pe(p.value, (w) => (g(), te(be, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : E("", !0),
            b.value.length ? E("", !0) : (g(), x("section", uy, [
              d("div", hy, [
                d("div", fy, [
                  N(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", gy, A(s.emptyTitle), 1),
                d("p", my, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Vl = /* @__PURE__ */ ve(py, [["__scopeId", "data-v-c2fc7beb"]]), vy = { class: "card-body" }, by = {
  key: 0,
  class: "chart-section"
}, yy = { class: "chart-wrapper" }, xy = {
  key: 1,
  class: "record-locator-daily-section"
}, ky = { class: "w-full min-w-0" }, _y = { class: "cell-plain font-medium" }, wy = { class: "cell-plain text-center" }, Cy = { class: "cell-plain text-center" }, $y = { class: "cell-plain text-center" }, Sy = { class: "cell-plain text-center" }, My = { class: "cell-plain text-center success-value" }, Dy = { class: "cell-plain text-center failed-value" }, Ay = { class: "cell-plain text-center warning-value" }, Ty = { class: "cell-plain text-center" }, By = { class: "cell-plain text-center failed-value" }, Ly = {
  key: 2,
  class: "empty-state"
}, Ry = /* @__PURE__ */ fe({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (p) => {
      o("export", p);
    }, { isDark: i } = Me($e(n, "theme")), l = C(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
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
    ], u = C(
      () => n.isAvianca ? [...r, ...c] : r
    ), f = C(
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
    ), h = C(() => n.data), v = (p, y) => Et(p, y), m = (p, y) => {
      const k = ge(p), _ = v(p, y);
      return `${k} (${_})`;
    }, b = C(() => {
      const p = [], y = [], k = /* @__PURE__ */ new Set(), _ = (Y) => {
        k.has(Y) || (p.push({ name: Y }), k.add(Y));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: p, links: y };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = h.value.total_checkin_initiated, $ = h.value.total_record_locator_init, D = h.value.total_record_locator_started, M = h.value.total_record_locator_completed, F = h.value.total_record_locator_closed, z = h.value.total_record_locator_failed, W = h.value.total_record_locator_abandoned, S = h.value.total_record_locator_init_abandoned, L = h.value.total_checkin_pre_init_abandoned_error, B = h.value.total_checkin_pre_init_abandoned_voluntary, j = L != null || B != null, H = j ? Math.max(Number(L) || 0, 0) : 0, Q = j ? Math.max(Number(B) || 0, 0) : 0, re = h.value.total_record_locator_init_abandoned_error, ue = h.value.total_record_locator_init_abandoned_voluntary, X = re != null || ue != null, oe = X ? Math.max(Number(re) || 0, 0) : 0, R = X ? Math.max(Number(ue) || 0, 0) : 0;
      $ > 0 && y.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ye($, w)
      });
      const U = w - $;
      return j ? (Q > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, w)
      })), H > 0 && (_("Booking not retreived"), y.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, w)
      }))) : U > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: U,
        label: ye(U, w)
      })), D > 0 && y.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: D,
        label: ye(D, w)
      }), X ? (oe > 0 && (_("Error"), y.push({
        source: "Booking retrive",
        target: "Error",
        value: oe,
        label: ye(oe, w)
      })), R > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ye(R, w)
      }))) : S > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: S,
        label: ye(S, w)
      })), M > 0 && y.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ye(M, w)
      }), F > 0 && y.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: F,
        label: ye(F, w)
      }), z > 0 && (_("Checkin Failed"), y.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: z,
        label: ye(z, w)
      })), W > 0 && (_("Abandoned (Flow)"), y.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: W,
        label: ye(W, w)
      })), { nodes: p, links: y };
    });
    return t({ isDark: i }), (p, y) => (g(), te(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !n.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", vy, [
          b.value.nodes.length > 0 ? (g(), x("section", by, [
            d("div", yy, [
              N(Yt, {
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : E("", !0),
          l.value && l.value.length > 0 ? (g(), x("section", xy, [
            d("div", ky, [
              N(pt, {
                columns: u.value,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: k }) => [
                  d("span", _y, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: k }) => [
                  d("span", wy, A(T(ge)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: k }) => [
                  d("span", Cy, A(m(
                    k.record_locator_init_count,
                    k.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": I(({ row: k }) => [
                  d("span", $y, A(T(ge)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": I(({ row: k }) => [
                  d("span", Sy, A(m(
                    k.record_locator_completed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": I(({ row: k }) => [
                  d("span", My, A(m(
                    k.record_locator_closed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": I(({ row: k }) => [
                  d("span", Dy, A(m(
                    k.record_locator_failed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": I(({ row: k }) => [
                  d("span", Ay, A(m(
                    k.record_locator_abandoned_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": I(({ row: k }) => [
                  d("span", Ty, A(T(ge)(
                    k.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": I(({ row: k }) => [
                  d("span", By, A(T(ge)(
                    k.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", Ly, [...y[0] || (y[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No record locator data available"),
              d("p", { class: "empty-description" }, " No record locator data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), Py = /* @__PURE__ */ ve(Ry, [["__scopeId", "data-v-f904c66a"]]), Iy = { class: "card-body" }, Ey = {
  key: 0,
  class: "chart-section"
}, Fy = {
  key: 1,
  class: "empty-state"
}, Oy = {
  key: 2,
  class: "comparison-section"
}, Vy = { class: "comparison-grid" }, Ny = /* @__PURE__ */ fe({
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
  setup(e, { expose: t, emit: a }) {
    const n = {
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
    ], s = e, i = a, l = (m) => {
      i("export", m);
    }, { isDark: r } = Me($e(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const m = /* @__PURE__ */ new Set();
      for (const b of s.data?.sales_by_channel_by_day ?? [])
        for (const p of Object.keys(b.channels))
          m.add(p);
      return Array.from(m).sort();
    }), u = (m, b) => n[m.toLowerCase()] ?? o[b % o.length];
    function f(m) {
      return m.replace(/_/g, " ").toUpperCase();
    }
    function h(m) {
      if (m.delta === null) return "No previous data";
      const b = ge(m.previous), p = `${Math.abs(m.delta).toFixed(1)}%`;
      return m.delta === 0 ? `0.0% vs prev. period (${b})` : `${m.delta > 0 ? "↑" : "↓"} ${p} vs prev. period (${b})`;
    }
    const v = C(() => {
      const m = s.data?.sales_by_channel_by_day ?? [];
      if (m.length === 0) return { labels: [], datasets: [] };
      const b = m.map((y) => Ne(y.date).format("MMM-DD")), p = c.value.map((y, k) => ({
        label: y,
        data: m.map((_) => _.channels[y] ?? 0),
        backgroundColor: u(y, k),
        borderRadius: 4
      }));
      return { labels: b, datasets: p };
    });
    return t({ isDark: r }), (m, b) => (g(), te(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Iy, [
          v.value.labels.length > 0 ? (g(), x("section", Ey, [
            N($t, {
              data: v.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (g(), x("section", Fy, [...b[0] || (b[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No sales data available"),
              d("p", { class: "empty-description" }, " No sales by channel data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          e.channelComparison.length > 0 ? (g(), x("section", Oy, [
            d("div", Vy, [
              (g(!0), x(he, null, pe(e.channelComparison, (p, y) => (g(), te(T(be), {
                key: p.channel,
                color: u(p.channel, y),
                title: f(p.channel),
                value: T(ge)(p.current),
                subvalue: h(p)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Nl = /* @__PURE__ */ ve(Ny, [["__scopeId", "data-v-4879d791"]]), zy = { class: "card-body" }, jy = {
  key: 0,
  class: "chart-section"
}, Hy = { class: "chart-wrapper" }, Wy = {
  key: 1,
  class: "empty-state"
}, Ky = { class: "seller-value-cards" }, Uy = {
  key: 2,
  class: "seller-daily-section"
}, Yy = { class: "w-full min-w-0" }, qy = { class: "sl-cell font-medium" }, Xy = { class: "sl-cell text-center" }, Gy = { class: "sl-cell text-center" }, Zy = { class: "sl-cell text-center" }, Qy = { class: "sl-cell text-center" }, Jy = { class: "sl-cell text-center success-value" }, e1 = {
  key: 0,
  class: "currency-cell-list"
}, t1 = {
  key: 1,
  class: "empty-cell"
}, a1 = { class: "sl-cell text-center success-value" }, n1 = { class: "sl-cell text-center success-value" }, o1 = {
  key: 0,
  class: "currency-cell-list"
}, s1 = {
  key: 1,
  class: "empty-cell"
}, i1 = { class: "sl-cell text-center success-value" }, l1 = { class: "sl-cell text-center" }, r1 = { class: "sl-cell text-center success-value" }, c1 = {
  key: 0,
  class: "currency-cell-list"
}, d1 = { key: 1 }, u1 = {
  key: 0,
  class: "failed-reasons"
}, h1 = { class: "reason-name" }, f1 = { class: "reason-count" }, g1 = {
  key: 1,
  class: "empty-cell"
}, m1 = /* @__PURE__ */ fe({
  __name: "Seller",
  props: {
    sellerData: { default: () => ({
      total_seller_conversations: 0,
      total_sell_started: 0,
      total_sell_get_quote: 0,
      total_sell_booking_created: 0,
      total_sell_success: 0,
      total_value_sell_success: 0,
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
    initiallyOpen: { type: Boolean, default: !0 },
    showPaymentMethodDetails: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    function n(S) {
      return S;
    }
    const o = e, s = a, i = (S) => {
      s("export", S);
    }, { isDark: l } = Me($e(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const S = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((L) => {
        const B = S.findIndex(
          (j) => j.date === L.date
        );
        B !== -1 ? S[B] = { ...S[B], reasons: L.reasons } : S.push({
          date: L.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: L.reasons
        });
      }), S.sort(
        (L, B) => new Date(L.date).getTime() - new Date(B.date).getTime()
      );
    }), c = C(() => {
      const S = [
        { key: "date", label: "Date", align: "center" },
        { key: "sellInitiated", label: "Initiated by agent", align: "center" },
        { key: "sellStarted", label: "Sell Started", align: "center" },
        { key: "getQuote", label: "Get Quote", align: "center" },
        { key: "bookingCreated", label: "Booking Created", align: "center" }
      ];
      return o.showPaymentMethodDetails && S.push(
        { key: "btValue", label: "BT Success Value", align: "center" },
        { key: "btSuccess", label: "BT Success", align: "center" },
        { key: "coValue", label: "CO Success Value", align: "center" },
        { key: "cashSuccess", label: "Cash Success", align: "center" }
      ), S.push(
        { key: "sellSuccess", label: "Sell Success", align: "center" },
        { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
        { key: "failed", label: "Failed", align: "center" }
      ), S;
    }), u = C(
      () => r.value.map((S) => ({
        id: S.date,
        ...S
      }))
    ), f = C(() => o.sellerData), h = C(() => o.failedData), v = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), m = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), p = C(() => {
      const S = v.value;
      return S.length > 0 ? S.map(
        (L) => `${L.currency} ${Xt(L.total_value)}`
      ).join(" · ") : W(o.sellerData.total_value_sell_success);
    });
    function y(S) {
      return S.length > 0 ? S.map(
        (L) => `${L.currency} ${Xt(L.total_value)}`
      ).join(" · ") : "—";
    }
    const k = C(
      () => y(m.value)
    ), _ = C(
      () => y(b.value)
    ), w = (S) => S.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), $ = (S) => `Failed:
${w(S)}`, D = C(() => {
      const {
        total_seller_conversations: S = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: j = 0,
        total_sell_success_bank_transfer: H = 0,
        total_sell_success_cash: Q = 0
      } = f.value, { failed_by_reason_by_day: re = [] } = h.value;
      if (S === 0) return { nodes: [], links: [] };
      const ue = j, X = [
        { name: "Initiated by agent", value: S, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: B, status: "success" },
        { name: "Sell Success", value: ue, status: "success" }
      ], oe = [], R = S - L;
      R > 0 && (X.push({
        name: "Abandoned: No Response",
        value: R,
        status: "abandon"
      }), oe.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: R,
        label: ye(R, S)
      })), L > 0 && oe.push({
        source: "Initiated by agent",
        target: "Sell Started",
        value: L,
        label: ye(L, S)
      });
      const U = re.reduce(
        (le, ce) => (ce.reasons && Array.isArray(ce.reasons) && ce.reasons.forEach((xe) => {
          const K = xe.reason, ie = xe.failed_count;
          le[K] = (le[K] || 0) + ie;
        }), le),
        {}
      );
      B > 0 && oe.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: ye(B, S)
      }), (H ?? 0) > 0 && (X.push({
        name: "Bank Transfer",
        value: H ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: H ?? 0,
        label: ye(H ?? 0, S)
      })), (Q ?? 0) > 0 && (X.push({
        name: "Cash Option",
        value: Q ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Q ?? 0,
        label: ye(Q ?? 0, S)
      })), ue > 0 && oe.push({
        source: "Booking Created",
        target: "Sell Success",
        value: ue,
        label: ye(ue, S)
      });
      const Y = B - ue - (H ?? 0) - (Q ?? 0);
      Y > 0 && (X.push({
        name: "Failed at Completion",
        value: Y,
        status: "error"
      }), oe.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: Y,
        label: ye(Y, S)
      }));
      const V = L - B;
      if (V > 0 && (X.push({
        name: "Failed at Booking",
        value: V,
        status: "error"
      }), oe.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: V,
        label: ye(V, S)
      })), Object.keys(U).length > 0) {
        const le = Object.values(U).reduce(
          (xe, K) => xe + K,
          0
        ), ce = V - le;
        Object.entries(U).filter(([, xe]) => xe > 0).sort(([, xe], [, K]) => K - xe).forEach(([xe, K]) => {
          const ie = `Failed: ${xe}`;
          X.push({
            name: ie,
            value: K,
            status: "error",
            label: $(xe)
          }), oe.push({
            source: "Failed at Booking",
            target: ie,
            value: K,
            label: ye(K, S)
          });
        }), ce > 0 && (X.push({
          name: "Failed: Without Reason",
          value: ce,
          status: "error",
          label: `Failed:
Without Reason`
        }), oe.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: ce,
          label: ye(ce, S)
        }));
      }
      return {
        nodes: X,
        links: oe
      };
    }), M = (S, L) => Et(S, L), F = (S, L) => {
      const B = ge(S), j = M(S, L);
      return `${B} (${j})`;
    }, z = (S) => S == null ? 0 : typeof S == "number" ? S : Array.isArray(S) ? S.reduce((L, B) => L + (B.total_value || 0), 0) : 0, W = (S) => Xt(z(S));
    return t({ isDark: l }), (S, L) => (g(), te(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", zy, [
          D.value.nodes.length > 0 ? (g(), x("section", jy, [
            d("div", Hy, [
              N(Yt, {
                data: D.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (g(), x("section", Wy, [...L[0] || (L[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No sales data available"),
              d("p", { class: "empty-description" }, " No sales data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          d("section", Ky, [
            N(be, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: p.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (g(), x(he, { key: 0 }, [
              N(be, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: k.value
              }, null, 8, ["value"]),
              N(be, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: _.value
              }, null, 8, ["value"])
            ], 64)) : E("", !0)
          ]),
          r.value && r.value.length > 0 ? (g(), x("section", Uy, [
            d("div", Yy, [
              N(pt, {
                columns: c.value,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: B }) => [
                  d("span", qy, A(T(Ne)(String(B.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": I(({ row: B }) => [
                  d("span", Xy, A(T(ge)(Number(B.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": I(({ row: B }) => [
                  d("span", Gy, A(F(
                    B.sell_started_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": I(({ row: B }) => [
                  d("span", Zy, A(F(
                    B.sell_get_quote_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": I(({ row: B }) => [
                  d("span", Qy, A(F(
                    B.sell_booking_created_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": I(({ row: B }) => [
                  d("span", Jy, [
                    Array.isArray(
                      B.daily_value_sell_success_bank_transfer
                    ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (g(), x("div", e1, [
                      (g(!0), x(he, null, pe(B.daily_value_sell_success_bank_transfer, (j) => (g(), x("span", {
                        key: `${B.date}-bt-success-${j.currency}`
                      }, A(j.currency) + " " + A(T(Xt)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", t1, "-"))
                  ])
                ]),
                "cell-btSuccess": I(({ row: B }) => [
                  d("span", a1, A(T(ge)(
                    Number(
                      B.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": I(({ row: B }) => [
                  d("span", n1, [
                    Array.isArray(
                      B.daily_value_sell_success_cash
                    ) && B.daily_value_sell_success_cash.length > 0 ? (g(), x("div", o1, [
                      (g(!0), x(he, null, pe(B.daily_value_sell_success_cash, (j) => (g(), x("span", {
                        key: `${B.date}-co-success-${j.currency}`
                      }, A(j.currency) + " " + A(T(Xt)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", s1, "-"))
                  ])
                ]),
                "cell-cashSuccess": I(({ row: B }) => [
                  d("span", i1, A(T(ge)(
                    Number(B.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": I(({ row: B }) => [
                  d("span", l1, A(F(
                    B.sell_success_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": I(({ row: B }) => [
                  d("span", r1, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (g(), x("div", c1, [
                      (g(!0), x(he, null, pe(B.daily_value_sell_success, (j) => (g(), x("span", {
                        key: `${B.date}-${j.currency}`
                      }, A(j.currency) + " " + A(T(Xt)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", d1, A(W(
                      B.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": I(({ row: B }) => [
                  (B.reasons || []).length > 0 ? (g(), x("div", u1, [
                    (g(!0), x(he, null, pe(B.reasons || [], (j) => (g(), x("div", {
                      key: j.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", h1, A(j.reason) + ":", 1),
                      d("span", f1, A(j.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", g1, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), zl = /* @__PURE__ */ ve(m1, [["__scopeId", "data-v-fad285e5"]]), p1 = { class: "seller-container__body" }, v1 = /* @__PURE__ */ fe({
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
    showPaymentMethodDetails: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    sellerData: {},
    failedData: {},
    salesByChannelData: {},
    channelComparison: { default: () => [] }
  },
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = C(
      () => a.loading ? !1 : a.sellerLoading
    ), s = C(
      () => a.loading ? !1 : a.salesByChannelLoading
    ), i = C(() => a.exportLoading || a.sellerExportLoading), l = C(() => a.exportLoading || a.salesByChannelExportLoading);
    function r(c, u) {
      n("export", { source: c, format: u });
    }
    return (c, u) => (g(), te(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[2] || (u[2] = (f) => n("open"))
    }, {
      default: I(() => [
        d("div", p1, [
          N(zl, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            "show-payment-method-details": e.showPaymentMethodDetails,
            onExport: u[0] || (u[0] = (f) => r("seller", f))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading", "show-payment-method-details"]),
          N(Nl, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: u[1] || (u[1] = (f) => r("salesByChannel", f))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), b1 = /* @__PURE__ */ ve(v1, [["__scopeId", "data-v-34a76e0c"]]), y1 = { class: "card-body" }, x1 = {
  key: 0,
  class: "chart-section"
}, k1 = { class: "chart-wrapper" }, _1 = {
  key: 1,
  class: "empty-state"
}, w1 = { class: "ancillaries-value-cards" }, C1 = {
  key: 2,
  class: "ancillaries-daily-section"
}, $1 = { class: "w-full min-w-0" }, S1 = { class: "sl-cell font-medium" }, M1 = { class: "sl-cell text-center" }, D1 = { class: "sl-cell text-center" }, A1 = { class: "sl-cell text-center" }, T1 = { class: "sl-cell text-center" }, B1 = {
  key: 0,
  class: "failed-reasons"
}, L1 = { class: "reason-name" }, R1 = { class: "reason-count" }, P1 = {
  key: 1,
  class: "empty-cell"
}, I1 = /* @__PURE__ */ fe({
  __name: "Ancillaries",
  props: {
    ancillariesData: { default: () => ({
      total_ancillaries_offered: 0,
      total_ancillaries_selected: 0,
      total_ancillaries_declined: 0,
      total_ancillaries_paid: 0,
      ancillaries_cr: 0,
      declined_by_reason: [],
      ancillaries_by_day: [],
      declined_by_reason_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    initiallyOpen: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    function a(y) {
      return y;
    }
    const n = e, { isDark: o } = Me($e(n, "theme")), s = C(
      () => n.ancillariesData?.total_ancillaries_offered || 0
    ), i = C(
      () => n.ancillariesData?.total_ancillaries_selected || 0
    ), l = C(
      () => n.ancillariesData?.total_ancillaries_declined || 0
    ), r = C(
      () => n.ancillariesData?.total_ancillaries_paid || 0
    ), c = C(
      () => n.ancillariesData?.ancillaries_cr || 0
    ), u = C(
      () => `${Number(c.value || 0).toFixed(1)}%`
    ), f = (y) => y.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), h = (y) => `Declined:
${f(y)}`, v = C(() => {
      const y = s.value, k = i.value, _ = l.value, w = r.value, $ = n.ancillariesData?.declined_by_reason || [];
      if (y === 0) return { nodes: [], links: [] };
      const D = [
        { name: "Offered", value: y, status: "success" },
        { name: "Selected", value: k, status: "success" }
      ], M = [];
      if (k > 0 && M.push({
        source: "Offered",
        target: "Selected",
        value: k,
        label: ye(k, y)
      }), w > 0) {
        D.push({ name: "Paid", value: w, status: "success" });
        const L = k > 0 ? "Selected" : "Offered", B = k > 0 ? k : y;
        M.push({
          source: L,
          target: "Paid",
          value: w,
          label: ye(w, B)
        });
      }
      const F = $.reduce(
        (L, B) => (B.count > 0 && (L[B.reason] = (L[B.reason] || 0) + B.count), L),
        {}
      ), z = Object.values(F).reduce((L, B) => L + B, 0), W = Math.max(0, _ - z);
      Object.entries(F).sort(([, L], [, B]) => B - L).forEach(([L, B]) => {
        const j = `Declined: ${L}`;
        D.push({
          name: j,
          value: B,
          status: "error",
          label: h(L)
        }), M.push({
          source: "Offered",
          target: j,
          value: B,
          label: ye(B, y)
        });
      }), W > 0 && (D.push({
        name: "Declined: Without Reason",
        value: W,
        status: "error",
        label: `Declined:
Without Reason`
      }), M.push({
        source: "Offered",
        target: "Declined: Without Reason",
        value: W,
        label: ye(W, y)
      }));
      const S = Math.max(
        0,
        y - k - _
      );
      return S > 0 && (D.push({
        name: "No Response",
        value: S,
        status: "abandon"
      }), M.push({
        source: "Offered",
        target: "No Response",
        value: S,
        label: ye(S, y)
      })), { nodes: D, links: M };
    }), m = C(() => {
      const y = [...n.ancillariesData?.ancillaries_by_day || []];
      return (n.ancillariesData?.declined_by_reason_by_day || []).forEach((_) => {
        const w = y.findIndex(($) => $.date === _.date);
        w !== -1 ? y[w] = { ...y[w], reasons: _.reasons } : y.push({
          date: _.date,
          offered_count: 0,
          selected_count: 0,
          declined_count: 0,
          paid_count: 0,
          reasons: _.reasons
        });
      }), y.sort(
        (_, w) => new Date(_.date).getTime() - new Date(w.date).getTime()
      );
    }), b = C(() => [
      { key: "date", label: "Date", align: "center" },
      { key: "offered", label: "Offered", align: "center" },
      { key: "selected", label: "Selected", align: "center" },
      { key: "paid", label: "Paid", align: "center" },
      { key: "declined", label: "Declined", align: "center" },
      { key: "reasons", label: "Decline Reasons", align: "left" }
    ]), p = C(
      () => m.value.map((y) => ({
        id: y.date,
        ...y
      }))
    );
    return t({
      isDark: o,
      formatSankeyPercentage: Et
    }), (y, k) => (g(), te(Se, {
      class: "ancillaries-metrics-root h-full min-h-0",
      title: "Ancillaries",
      subtitle: "Ancillary offer conversion funnel",
      "default-open": e.initiallyOpen,
      loading: n.loading
    }, {
      default: I(() => [
        d("div", y1, [
          v.value.nodes.length > 0 ? (g(), x("section", x1, [
            d("div", k1, [
              N(Yt, {
                data: v.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (g(), x("section", _1, [...k[0] || (k[0] = [
            d("div", { class: "empty-state-content" }, [
              d("p", { class: "empty-title" }, "No ancillaries data available"),
              d("p", { class: "empty-description" }, " No ancillary funnel events found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          d("section", w1, [
            N(be, {
              class: "ancillaries-value-card",
              color: "var(--kiut-success)",
              title: "Ancillaries CR",
              value: u.value
            }, null, 8, ["value"]),
            N(be, {
              class: "ancillaries-value-card",
              color: "var(--kiut-primary, #5d4b93)",
              title: "Offered",
              value: T(ge)(s.value)
            }, null, 8, ["value"]),
            N(be, {
              class: "ancillaries-value-card",
              color: "var(--kiut-success)",
              title: "Selected",
              value: T(ge)(i.value)
            }, null, 8, ["value"]),
            N(be, {
              class: "ancillaries-value-card",
              color: "var(--kiut-primary, #5d4b93)",
              title: "Paid",
              value: T(ge)(r.value)
            }, null, 8, ["value"]),
            N(be, {
              class: "ancillaries-value-card",
              color: "var(--kiut-error, #ef4444)",
              title: "Declined",
              value: T(ge)(l.value)
            }, null, 8, ["value"])
          ]),
          p.value.length > 0 ? (g(), x("section", C1, [
            d("div", $1, [
              N(pt, {
                columns: b.value,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: _ }) => [
                  d("span", S1, A(T(Ne)(String(_.date)).format("MMM DD")), 1)
                ]),
                "cell-offered": I(({ row: _ }) => [
                  d("span", M1, A(T(ge)(Number(_.offered_count) || 0)), 1)
                ]),
                "cell-selected": I(({ row: _ }) => [
                  d("span", D1, A(T(ge)(Number(_.selected_count) || 0)), 1)
                ]),
                "cell-paid": I(({ row: _ }) => [
                  d("span", A1, A(T(ge)(Number(_.paid_count) || 0)), 1)
                ]),
                "cell-declined": I(({ row: _ }) => [
                  d("span", T1, A(T(ge)(Number(_.declined_count) || 0)), 1)
                ]),
                "cell-reasons": I(({ row: _ }) => [
                  (_.reasons || []).length > 0 ? (g(), x("div", B1, [
                    (g(!0), x(he, null, pe(_.reasons || [], (w) => (g(), x("div", {
                      key: w.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", L1, A(w.reason) + ":", 1),
                      d("span", R1, A(w.count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", P1, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), E1 = /* @__PURE__ */ ve(I1, [["__scopeId", "data-v-42f742c3"]]), F1 = /* @__PURE__ */ fe({
  __name: "AncillariesCR",
  props: {
    ancillariesCr: { default: 0 },
    previousAncillariesCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(
      () => `${Number(a.ancillariesCr || 0).toFixed(1)}%`
    ), s = C(() => T(n.value?.isDark) ?? !1), i = C(
      () => T(n.value?.changePercent) ?? 0
    );
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "Ancillaries CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.ancillariesCr,
      "previous-value": e.previousAncillariesCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M12 3v18" }),
          d("path", { d: "M5 8h14" }),
          d("path", { d: "M7 12h10" }),
          d("path", { d: "M9 16h6" }),
          d("rect", {
            x: "4",
            y: "4",
            width: "16",
            height: "16",
            rx: "2"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), O1 = { class: "card-body" }, V1 = {
  key: 0,
  class: "chart-section"
}, N1 = {
  key: 1,
  class: "empty-state"
}, z1 = { class: "empty-state-content" }, j1 = { class: "empty-icon-wrapper" }, H1 = /* @__PURE__ */ fe({
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
    const n = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, o = e, s = a, i = (f) => {
      s("export", f);
    }, { isDark: l, colors: r } = Me($e(o, "theme")), c = C(() => {
      const h = (o.data?.top_agents || []).filter(
        (p) => p.agent_type?.toLowerCase() !== "triage"
      );
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const v = h.reduce(
        (p, y) => p + (Number(y.conversations) || 0),
        0
      ), m = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return n[y] || "#94a3b8";
      }), b = m.map((p) => `${p}80`);
      return {
        labels: h.map((p) => {
          const y = Number(p.conversations) || 0, k = v ? y / v * 100 : 0;
          return `${kt(p.agent_type)} - ${y.toLocaleString()} (${k.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((p) => p.conversations),
            backgroundColor: b,
            borderColor: m,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => o.options ? o.options : {
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
            label: (f) => {
              const h = (f.label || "").toString().split(" - ")[0], v = Number(f.parsed) || 0, m = (f.dataset.data || []).reduce(
                (p, y) => p + (Number(y) || 0),
                0
              ), b = m ? v / m * 100 : 0;
              return `${h}: ${v.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (f, h) => (g(), te(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", O1, [
          c.value.labels && c.value.labels.length ? (g(), x("section", V1, [
            N(Nn, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (g(), x("section", N1, [
            d("div", z1, [
              d("div", j1, [
                N(T(fp), { class: "empty-icon" })
              ]),
              h[0] || (h[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
              h[1] || (h[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), W1 = /* @__PURE__ */ ve(H1, [["__scopeId", "data-v-34a998ae"]]), K1 = { class: "card-body" }, U1 = {
  key: 0,
  class: "payment-methods-section"
}, Y1 = { class: "payment-methods-grid" }, q1 = {
  key: 1,
  class: "empty-state"
}, X1 = { class: "empty-state-content" }, G1 = { class: "empty-icon-wrapper" }, Z1 = {
  key: 2,
  class: "payment-method-daily-section"
}, Q1 = { class: "w-full min-w-0" }, J1 = { class: "font-medium" }, ex = { class: "text-center" }, tx = { class: "text-center success-value" }, ax = {
  key: 0,
  class: "currency-cell-list"
}, nx = { class: "payment-tags" }, ox = { class: "tag-name" }, sx = {
  key: 0,
  class: "tag-amount"
}, ix = {
  key: 1,
  class: "tag-amount"
}, lx = { class: "tag-count" }, rx = {
  key: 3,
  class: "empty-table-state"
}, cx = "Not Registered", dx = /* @__PURE__ */ fe({
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
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, { isDark: s } = Me($e(n, "theme")), i = ne(!1), l = ne({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((M, F) => Ne(M.date).valueOf() - Ne(F.date).valueOf())), f = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], h = C(
      () => u.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), v = (M) => {
      if (!M)
        return {
          airline_name: n.airlineName,
          start_date: "",
          end_date: "",
          total_conversations: 0,
          total_amount: 0,
          total_amount_by_currency: [],
          payment_method_breakdown: [],
          payment_method_by_day: []
        };
      const F = (M.payment_method_breakdown || []).map(
        (W) => ({
          payment_method: W.payment_method || "Unknown",
          total_amount: W.total_amount ?? 0,
          count: W.count ?? 0,
          total_amount_by_currency: W.total_amount_by_currency ?? []
        })
      ), z = (M.payment_method_by_day || []).map((W) => ({
        date: W.date || "",
        total_count: W.total_count ?? 0,
        total_amount: W.total_amount ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? [],
        payment_methods: (W.payment_methods || []).map((S) => ({
          payment_method: S.payment_method || "Unknown",
          total_amount: S.total_amount ?? 0,
          count: S.count ?? 0,
          total_amount_by_currency: S.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: M.airline_name || n.airlineName,
        start_date: M.start_date || "",
        end_date: M.end_date || "",
        total_conversations: M.total_conversations ?? 0,
        total_amount: M.total_amount ?? 0,
        total_sell_usd: M.total_sell_usd,
        total_amount_by_currency: M.total_amount_by_currency ?? [],
        payment_method_breakdown: F,
        payment_method_by_day: z
      };
    }, m = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [M, F] = n.dates.map(
            (W) => Ne(W).format("YYYY-MM-DD")
          ), z = await n.fetchFunction(
            n.airlineName,
            M,
            F
          );
          l.value = v(z);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), l.value = v(null);
        } finally {
          i.value = !1;
        }
      }
    }, b = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], p = (M) => !M || M.toLowerCase() === "unknown" ? cx : M.replace(/_/g, " "), y = (M) => M == null ? "$0.00" : Fe(M), k = (M) => {
      const F = M.total_amount_by_currency;
      return F && F.length > 0 ? F.map((z) => `${z.currency} ${y(z.total_value)}`).join(" · ") : y(M.total_amount);
    }, _ = (M) => M ? Ne(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function D() {
      const M = n.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, l.value = v(M));
    }
    return et(() => {
      n.data ? D() : m();
    }), Te(
      () => n.data,
      (M) => {
        M && D();
      },
      { deep: !0 }
    ), Te(
      () => n.dates,
      (M) => {
        n.data || M && M[0] && M[1] && m();
      },
      { deep: !0 }
    ), t({ isDark: s }), (M, F) => (g(), te(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: F[0] || (F[0] = (z) => o("open"))
    }, {
      headerExport: I(() => [
        e.enableExport && !i.value ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", K1, [
          r.value ? (g(), x("section", U1, [
            F[1] || (F[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", Y1, [
              (g(!0), x(he, null, pe(l.value.payment_method_breakdown, (z, W) => (g(), te(be, {
                key: z.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[W % b.length],
                title: p(z.payment_method),
                value: k(z),
                subvalue: `${w(z.count)} ${w(z.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (g(), x("section", q1, [
            d("div", X1, [
              d("div", G1, [
                N(T(mp), { class: "empty-icon" })
              ]),
              F[2] || (F[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              F[3] || (F[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (g(), x("section", Z1, [
            F[5] || (F[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", Q1, [
              N(pt, {
                columns: f,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: z }) => [
                  d("span", J1, A(_(String(z.date))), 1)
                ]),
                "cell-totalSales": I(({ row: z }) => [
                  d("span", ex, A(T(ge)(z.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": I(({ row: z }) => [
                  d("span", tx, [
                    Array.isArray(z.total_amount_by_currency) && z.total_amount_by_currency.length > 0 ? (g(), x("div", ax, [
                      (g(!0), x(he, null, pe(z.total_amount_by_currency, (W) => (g(), x("span", {
                        key: `${z.date}-${W.currency}`
                      }, A(W.currency) + " " + A(y(W.total_value)), 1))), 128))
                    ])) : (g(), x(he, { key: 1 }, [
                      De(A(y(Number(z.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": I(({ row: z }) => [
                  d("div", nx, [
                    (g(!0), x(he, null, pe(Array.isArray(z.payment_methods) ? z.payment_methods : [], (W) => (g(), x("div", {
                      key: W.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", ox, A(p(W.payment_method)), 1),
                      F[4] || (F[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (g(), x("span", sx, A(y(W.total_amount)), 1)) : (g(), x("span", ix, A(W.total_amount_by_currency.map(
                        (S) => `${S.currency} ${y(S.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", lx, "(" + A(w(W.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (g(), x("div", rx, [...F[6] || (F[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ux = /* @__PURE__ */ ve(dx, [["__scopeId", "data-v-168637eb"]]), hx = { class: "card-body" }, fx = { class: "kpi-closed-value" }, gx = { class: "kpi-closed-value__main" }, mx = {
  key: 0,
  class: "kpi-closed-value__pct"
}, px = { class: "table-view-select flex justify-end" }, vx = { class: "table-section w-full min-w-0" }, bx = { class: "cell-plain" }, yx = { class: "cell-plain" }, xx = { class: "cell-plain cell-plain--muted" }, kx = { class: "cell-plain" }, _x = { class: "cell-plain cell-plain--orange" }, wx = { class: "cell-plain cell-plain--red" }, Cx = { class: "cell-plain cell-plain--muted" }, $x = { class: "cell-plain cell-plain--muted" }, Sx = { class: "cell-plain cell-plain--muted" }, Mx = { class: "cell-plain" }, Dx = { class: "cell-plain" }, Ax = {
  key: 2,
  class: "empty-state"
}, Tx = 6, Bx = /* @__PURE__ */ fe({
  __name: "AgentHumanConversations",
  props: {
    data: { default: () => ({
      total_assigned: 0,
      total_closed: 0,
      total_enqueued: 0,
      total_transferred: 0,
      total_abandoned: 0,
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
    previousTotalTransferred: { default: null },
    previousTotalAbandoned: { default: null },
    previousAvgTimeToAssignSeconds: { default: null },
    previousAvgConversationDurationSeconds: { default: null }
  },
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (P) => {
      o("export", P);
    }, { isDark: i } = Me($e(n, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(P) {
      const Z = P?.trim() ?? "";
      return Z.length > 0 && !l.has(Z);
    }
    function c(P) {
      if (!r(P.agent_email)) return !1;
      const Z = P.assigned_count ?? 0, ae = P.closed_count ?? 0, O = P.transferred_count ?? 0, J = P.abandoned_count ?? 0;
      return Z > 0 || ae > 0 || O > 0 || J > 0;
    }
    function u(P) {
      return P.closed_count ?? 0;
    }
    function f(P) {
      return P.transferred_count ?? 0;
    }
    function h(P) {
      return P.abandoned_count ?? 0;
    }
    function v(P) {
      const Z = P?.trim();
      return Z || "—";
    }
    function m(P) {
      const Z = P?.trim();
      return Z || "—";
    }
    function b(P) {
      return P == null ? "0" : ee(P);
    }
    const p = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), y = C(() => p.value.length > 0), k = C(() => {
      const P = (n.data?.total_enqueued ?? 0) > 0, Z = (n.data?.total_transferred ?? 0) > 0, ae = (n.data?.total_abandoned ?? 0) > 0;
      return y.value || P || Z || ae;
    }), _ = ne("by_date"), w = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], $ = ne("date"), D = ne("desc");
    Te(_, (P) => {
      P === "aggregated" ? ($.value = "name", D.value = "asc") : ($.value = "date", D.value = "desc");
    });
    function M(P, Z) {
      return Z == null ? null : Z === 0 ? P > 0 ? 100 : 0 : (P - Z) / Z * 100;
    }
    function F(P) {
      const Z = P.toFixed(1);
      return P > 0 ? `+${Z}%` : `${Z}%`;
    }
    function z(P, Z = !1) {
      const ae = Z ? -P : P;
      return ae > 0 ? "change-badge--up" : ae < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function W(P, Z) {
      if (P === null) return null;
      const ae = M(P, Z);
      return ae === null ? null : {
        label: F(ae),
        class: z(ae, !0)
      };
    }
    function S(P) {
      if (P == null || P === "") return null;
      if (typeof P == "number")
        return Number.isFinite(P) ? P : null;
      const Z = P.trim();
      if (!Z) return null;
      if (Z.includes(":")) {
        const O = Z.split(":").map(Number);
        return O.length !== 3 || O.some(isNaN) ? null : O[0] * 3600 + O[1] * 60 + O[2];
      }
      const ae = Number(Z);
      return Number.isFinite(ae) ? ae : null;
    }
    function L(P) {
      const Z = Math.round(P), ae = Math.floor(Z / 3600), O = Math.floor(Z % 3600 / 60), J = Z % 60;
      return `${String(ae).padStart(2, "0")}:${String(O).padStart(2, "0")}:${String(J).padStart(2, "0")}`;
    }
    function B(P) {
      const Z = S(P);
      return Z === null ? "—" : typeof P == "string" && P.includes(":") ? P.trim() : L(Z);
    }
    const j = C(() => n.data?.total_enqueued ?? 0), H = C(() => n.data?.total_closed ?? 0), Q = C(() => n.data?.total_transferred ?? 0), re = C(() => n.data?.total_abandoned ?? 0), ue = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), X = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), oe = C(() => j.value <= 0 ? null : `(${(H.value / j.value * 100).toFixed(1)}%)`), R = C(
      () => W(
        S(ue.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), U = C(
      () => W(
        S(X.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function Y(P, Z) {
      return {
        id: `${P.date}-${P.agent_email}-${Z}`,
        date: P.date,
        dateSort: new Date(P.date).getTime(),
        agent_name: P.agent_name ?? "",
        agent_email: P.agent_email,
        handled: u(P),
        transferred: f(P),
        abandoned: h(P),
        connected_at: P.connected_at ?? null,
        disconnected_at: P.disconnected_at ?? null,
        online_time_display: P.online_time_seconds == null || P.online_time_seconds === "" ? null : B(P.online_time_seconds),
        avg_assignation_seconds: S(P.avg_time_to_assign_seconds),
        avg_resolution_seconds: S(P.avg_conversation_duration_seconds),
        avg_assignation_display: B(P.avg_time_to_assign_seconds),
        avg_resolution_display: B(P.avg_conversation_duration_seconds)
      };
    }
    function V(P) {
      const Z = /* @__PURE__ */ new Map();
      for (const ae of P) {
        if (!c(ae)) continue;
        const O = ae.agent_email.trim();
        Z.has(O) || Z.set(O, {
          agent_name: ae.agent_name?.trim() ?? "",
          agent_email: O,
          handled: 0,
          transferred: 0,
          abandoned: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const J = Z.get(O), se = ae.assigned_count ?? 0, me = ae.closed_count ?? 0;
        J.handled += u(ae), J.transferred += f(ae), J.abandoned += h(ae), ae.agent_name?.trim() && (J.agent_name = ae.agent_name.trim());
        const Ce = S(ae.avg_time_to_assign_seconds);
        Ce !== null && se > 0 && (J.assignSum += Ce * se, J.assignWeight += se);
        const we = S(ae.avg_conversation_duration_seconds);
        we !== null && me > 0 && (J.resolutionSum += we * me, J.resolutionWeight += me);
      }
      return Array.from(Z.values()).map((ae, O) => {
        const J = ae.assignWeight > 0 ? ae.assignSum / ae.assignWeight : null, se = ae.resolutionWeight > 0 ? ae.resolutionSum / ae.resolutionWeight : null;
        return {
          id: `agg-${ae.agent_email}-${O}`,
          agent_name: ae.agent_name,
          agent_email: ae.agent_email,
          handled: ae.handled,
          transferred: ae.transferred,
          abandoned: ae.abandoned,
          connected_at: null,
          disconnected_at: null,
          online_time_display: null,
          avg_assignation_seconds: J,
          avg_resolution_seconds: se,
          avg_assignation_display: J !== null ? L(J) : "—",
          avg_resolution_display: se !== null ? L(se) : "—"
        };
      });
    }
    const le = C(() => {
      const P = p.value;
      return _.value === "aggregated" ? V(P) : P.map(Y);
    });
    function ce(P, Z, ae, O) {
      const J = O === "asc" ? 1 : -1;
      let se = 0;
      switch (ae) {
        case "date":
          se = (P.dateSort ?? 0) - (Z.dateSort ?? 0);
          break;
        case "name":
          se = (P.agent_name || "").localeCompare(Z.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          se = P.agent_email.localeCompare(Z.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          se = P.handled - Z.handled;
          break;
        case "transferred":
          se = P.transferred - Z.transferred;
          break;
        case "abandoned":
          se = (P.abandoned ?? 0) - (Z.abandoned ?? 0);
          break;
        case "avgAssignation":
          se = (P.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (Z.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          se = (P.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (Z.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (se !== 0) return se * J;
      if (_.value === "by_date" && ae !== "date") {
        const me = (Z.dateSort ?? 0) - (P.dateSort ?? 0);
        if (me !== 0) return me;
      }
      return (P.agent_name || "").localeCompare(Z.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const xe = C(() => {
      const P = [...le.value];
      return P.sort((Z, ae) => ce(Z, ae, $.value, D.value)), P;
    }), K = C(
      () => xe.value
    ), ie = C(() => {
      const P = [];
      return _.value === "by_date" && P.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), P.push(
        { key: "name", label: "Name", align: "left", sortable: !0 },
        { key: "email", label: "Email", align: "left", sortable: !0 },
        { key: "handled", label: "Handled", align: "center", sortable: !0 },
        {
          key: "transferred",
          label: "Transferred",
          align: "center",
          sortable: !0
        },
        {
          key: "abandoned",
          label: "Abandoned",
          align: "center",
          sortable: !0
        },
        {
          key: "connected",
          label: "Connected",
          align: "center",
          sortable: !1
        },
        {
          key: "disconnected",
          label: "Disconnected",
          align: "center",
          sortable: !1
        },
        {
          key: "onlineTime",
          label: "Online time",
          align: "center",
          sortable: !1
        },
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
      ), P;
    });
    function de(P) {
      const Z = P;
      if ($.value === Z) {
        D.value = D.value === "asc" ? "desc" : "asc";
        return;
      }
      $.value = Z, Z === "date" ? D.value = "desc" : Z === "name" || Z === "email" ? D.value = "asc" : D.value = "desc";
    }
    const ee = (P) => P == null ? "0" : ge(P), G = (P) => new Date(P).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (P, Z) => (g(), te(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: Z[1] || (Z[1] = (ae) => o("open"))
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", hx, [
          k.value ? (g(), x("div", {
            key: 0,
            class: q(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4", { "agent-human-conv--dark": T(i) }])
          }, [
            N(Ye, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ee(j.value),
              theme: e.theme,
              "current-value": j.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: I(() => [...Z[2] || (Z[2] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(Ye, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ee(H.value),
              theme: e.theme,
              "current-value": H.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: I(() => [...Z[3] || (Z[3] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1)
              ])]),
              value: I(() => [
                d("div", fx, [
                  d("span", gx, A(ee(H.value)), 1),
                  oe.value ? (g(), x("span", mx, A(oe.value), 1)) : E("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(Ye, {
              label: "Transferred",
              "label-position": "header",
              value: ee(Q.value),
              theme: e.theme,
              "current-value": Q.value,
              "previous-value": e.previousTotalTransferred
            }, {
              icon: I(() => [...Z[4] || (Z[4] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(Ye, {
              label: "Abandoned",
              "label-position": "header",
              value: ee(re.value),
              theme: e.theme,
              "current-value": re.value,
              "previous-value": e.previousTotalAbandoned
            }, {
              icon: I(() => [...Z[5] || (Z[5] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(Ye, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: B(ue.value),
              theme: e.theme,
              "current-value": S(ue.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Sn({
              icon: I(() => [
                Z[6] || (Z[6] = d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              R.value ? {
                name: "headerAside",
                fn: I(() => [
                  d("div", {
                    class: q(["duration-trend-badge", R.value.class])
                  }, A(R.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(Ye, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: B(X.value),
              theme: e.theme,
              "current-value": S(X.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Sn({
              icon: I(() => [
                Z[7] || (Z[7] = d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              U.value ? {
                name: "headerAside",
                fn: I(() => [
                  d("div", {
                    class: q(["duration-trend-badge", U.value.class])
                  }, A(U.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : E("", !0),
          y.value ? (g(), te(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: I(() => [
              d("div", px, [
                N(Tt, {
                  modelValue: _.value,
                  "onUpdate:modelValue": Z[0] || (Z[0] = (ae) => _.value = ae),
                  options: w,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: I(() => [
              d("div", vx, [
                (g(), te(pt, {
                  key: `${_.value}-${$.value}-${D.value}`,
                  columns: ie.value,
                  rows: K.value,
                  "sort-key": $.value,
                  "sort-direction": D.value,
                  "max-visible-rows": Tx,
                  "row-key": "id",
                  onSort: de
                }, {
                  "cell-date": I(({ row: ae }) => [
                    d("span", bx, A(G(String(ae.date))), 1)
                  ]),
                  "cell-name": I(({ row: ae }) => [
                    d("span", yx, A(v(ae.agent_name)), 1)
                  ]),
                  "cell-email": I(({ row: ae }) => [
                    d("span", xx, A(ae.agent_email), 1)
                  ]),
                  "cell-handled": I(({ row: ae }) => [
                    d("span", kx, A(ee(Number(ae.handled))), 1)
                  ]),
                  "cell-transferred": I(({ row: ae }) => [
                    d("span", _x, A(ee(Number(ae.transferred))), 1)
                  ]),
                  "cell-abandoned": I(({ row: ae }) => [
                    d("span", wx, A(b(ae.abandoned)), 1)
                  ]),
                  "cell-connected": I(({ row: ae }) => [
                    d("span", Cx, A(m(ae.connected_at)), 1)
                  ]),
                  "cell-disconnected": I(({ row: ae }) => [
                    d("span", $x, A(m(ae.disconnected_at)), 1)
                  ]),
                  "cell-onlineTime": I(({ row: ae }) => [
                    d("span", Sx, A(m(ae.online_time_display)), 1)
                  ]),
                  "cell-avgAssignation": I(({ row: ae }) => [
                    d("span", Mx, A(ae.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": I(({ row: ae }) => [
                    d("span", Dx, A(ae.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : k.value ? E("", !0) : (g(), x("div", Ax, [...Z[8] || (Z[8] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No agent human conversation data available"),
              d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Lx = /* @__PURE__ */ ve(Bx, [["__scopeId", "data-v-96b44a98"]]), Rx = {
  key: 0,
  class: "w-52"
}, Px = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ix = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Ex = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Fx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ox = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Vx = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Nx = { class: "max-w-[360px] px-4 text-center" }, zx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, jx = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, Hx = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, ki = 5, Wx = /* @__PURE__ */ fe({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    title: { default: "Conversations by Channel" },
    subtitle: { default: "Conversations sent by AI agents" },
    unit: { default: "msgs" },
    totalConversations: { default: void 0 },
    emptyTitle: { default: "No channel metrics data available" },
    emptyDescription: { default: "No channel data found for the selected period. Try adjusting the date range." },
    breakdownBy: { default: "" },
    breakdownOptions: { default: () => [] },
    showSummaryCards: { type: Boolean, default: !0 }
  },
  emits: ["export", "changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (k) => {
      o("export", k);
    }, i = (k) => {
      o("changeBreakdown", String(k));
    }, l = $e(n, "theme"), { isDark: r } = Me(l), c = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], f = (k) => {
      const _ = k.toLowerCase(), w = c[_];
      if (w) return w;
      const $ = Array.from(_).reduce(
        (D, M) => (D << 5) - D + M.charCodeAt(0) | 0,
        0
      );
      return u[Math.abs($) % u.length];
    }, h = ne({
      labels: [],
      datasets: []
    }), v = C(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), m = C(() => {
      const k = v.value.total_by_channel || {}, _ = Object.values(k).reduce(
        ($, D) => $ + D,
        0
      ), w = n.totalConversations ?? _;
      return w === 0 ? [] : Object.entries(k).sort(([, $], [, D]) => D - $).map(([$, D]) => ({
        name: $,
        label: $.toUpperCase(),
        total: D,
        percentage: (D / w * 100).toFixed(1),
        color: f($)
      }));
    }), b = C(
      () => m.value.slice(0, ki)
    ), p = C(() => {
      const k = Math.min(b.value.length, ki);
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), y = (k) => {
      if (!k || !k.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const _ = k.channels_by_day, w = Object.keys(_).sort();
      if (w.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const $ = /* @__PURE__ */ new Set();
      for (const F of Object.values(_))
        for (const z of Object.keys(F))
          $.add(z);
      const M = Array.from($).map((F) => ({
        label: F.toUpperCase(),
        data: w.map((z) => _[z]?.[F] || 0),
        borderColor: f(F)
      }));
      h.value = {
        labels: w.map((F) => Ne(F).format("MMM DD")),
        datasets: M
      };
    };
    return Te(
      () => n.data,
      (k) => {
        y(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (k, _) => (g(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: I(() => [
        n.breakdownOptions.length ? (g(), x("div", Rx, [
          N(Tt, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : E("", !0)
      ]),
      headerExport: I(() => [
        e.enableExport && !n.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Px, [
          d("div", Ix, [
            h.value.labels && h.value.labels.length ? (g(), x("section", Ex, [
              d("div", Fx, [
                N(mt, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && b.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(p.value)
              }, [
                (g(!0), x(he, null, pe(b.value, (w) => (g(), te(be, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : n.showSummaryCards && m.value.length ? (g(), x("section", Ox, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: _e(p.value)
              }, [
                (g(!0), x(he, null, pe(b.value, (w) => (g(), te(be, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : E("", !0),
            m.value.length ? E("", !0) : (g(), x("section", Vx, [
              d("div", Nx, [
                d("div", zx, [
                  N(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", jx, A(n.emptyTitle), 1),
                d("p", Hx, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), jl = /* @__PURE__ */ ve(Wx, [["__scopeId", "data-v-987b8c34"]]), Kx = /* @__PURE__ */ fe({
  __name: "ConversationVolume",
  props: {
    data: { default: null },
    loading: { type: Boolean, default: !1 },
    breakdownBy: { default: "all" },
    breakdownOptions: { default: () => [] },
    titles: { default: () => ({
      all: "Conversations",
      resolution_mode: "Conversations by Resolution Mode",
      agent: "Conversations by Agent",
      channel: "Conversations by Channel",
      agent_channel: "Conversations by Agent and Channel"
    }) },
    subtitle: { default: "Conversations over time" },
    emptyTitle: { default: "No conversation data" },
    emptyDescription: { default: "Try adjusting the date range or filters." }
  },
  emits: ["changeBreakdown"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = C(() => a.data?.total_conversations ?? 0), s = C(() => a.data?.breakdown_by_day ?? {}), i = C(() => a.titles[a.breakdownBy]), l = C(() => ({ agents_by_day: s.value })), r = C(() => ({
      channels_by_day: s.value,
      total_by_channel: Object.fromEntries(
        (a.data?.breakdown_items ?? []).map((c) => [c.key, c.total_conversations])
      ),
      total_conversations: o.value
    }));
    return (c, u) => a.breakdownBy === "channel" ? (g(), te(jl, {
      key: 0,
      data: r.value,
      loading: a.loading,
      title: i.value,
      subtitle: a.subtitle,
      "breakdown-by": a.breakdownBy,
      "breakdown-options": a.breakdownOptions,
      unit: "convs",
      "total-conversations": o.value,
      "empty-title": a.emptyTitle,
      "empty-description": a.emptyDescription,
      onChangeBreakdown: u[0] || (u[0] = (f) => n("changeBreakdown", f))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (g(), te(Vl, {
      key: 1,
      data: l.value,
      loading: a.loading,
      title: i.value,
      subtitle: a.subtitle,
      "breakdown-by": a.breakdownBy,
      "breakdown-options": a.breakdownOptions,
      unit: "convs",
      "total-conversations": o.value,
      "max-series": a.breakdownBy === "agent_channel" ? 7 : void 0,
      "show-summary-cards": a.breakdownBy !== "all",
      "empty-title": a.emptyTitle,
      "empty-description": a.emptyDescription,
      onChangeBreakdown: u[1] || (u[1] = (f) => n("changeBreakdown", f))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "max-series", "show-summary-cards", "empty-title", "empty-description"]));
  }
}), Ux = { class: "card-body" }, Yx = { class: "chart-container" }, qx = { class: "triage-table-block w-full min-w-0" }, Xx = { class: "triage-row-label" }, Gx = {
  key: 1,
  class: "triage-count"
}, Zx = {
  key: 1,
  class: "triage-count"
}, Qx = {
  key: 1,
  class: "triage-count"
}, Jx = {
  key: 1,
  class: "triage-count"
}, ek = {
  key: 1,
  class: "triage-count"
}, tk = {
  key: 1,
  class: "empty-state"
}, ak = { class: "empty-state-content" }, nk = { class: "empty-icon-wrapper" }, ok = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (_) => {
      o("export", _);
    }, { isDark: i, colors: l } = Me(
      $e(n, "theme")
    ), r = C(() => {
      const _ = n.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, D] of Object.entries(_)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const F = M.filter((z) => z !== "triage").length;
        F >= 4 ? w["4p"] += Number(D) || 0 : w[F] += Number(D) || 0;
      }
      return w;
    }), c = C(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), u = C(() => Object.keys(n.data?.combinations || {}).length > 0), f = C(() => {
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
    }), h = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = C(() => {
      const _ = f.value, w = r.value;
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
    }), m = {
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
    }, b = (_) => _?.replace("80", "") || "#888888", p = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [f.value.pct0],
          backgroundColor: m.c0,
          borderColor: b(m.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [f.value.pct1],
          backgroundColor: m.c1,
          borderColor: b(m.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [f.value.pct2],
          backgroundColor: m.c2,
          borderColor: b(m.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [f.value.pct3],
          backgroundColor: m.c3,
          borderColor: b(m.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [f.value.pct4p],
          backgroundColor: m.c4p,
          borderColor: b(m.c4p),
          borderWidth: 1
        }
      ]
    })), y = C(() => ({
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
    })), k = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (g(), te(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Ux, [
          u.value ? (g(), x(he, { key: 0 }, [
            d("div", Yx, [
              N($t, {
                data: p.value,
                options: y.value
              }, null, 8, ["data", "options"])
            ]),
            N(be, {
              class: "w-full min-w-0",
              title: "Total",
              value: T(ge)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", qx, [
              N(pt, {
                columns: h,
                rows: v.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": I(({ row: $ }) => [
                  d("span", Xx, A($.metric), 1)
                ]),
                "cell-b0": I(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(m.c0) })
                  }, A(k(Number($.b0))) + "%", 5)) : (g(), x("span", Gx, A(T(ge)(Number($.b0))), 1))
                ]),
                "cell-b1": I(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(m.c1) })
                  }, A(k(Number($.b1))) + "%", 5)) : (g(), x("span", Zx, A(T(ge)(Number($.b1))), 1))
                ]),
                "cell-b2": I(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(m.c2) })
                  }, A(k(Number($.b2))) + "%", 5)) : (g(), x("span", Qx, A(T(ge)(Number($.b2))), 1))
                ]),
                "cell-b3": I(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(m.c3) })
                  }, A(k(Number($.b3))) + "%", 5)) : (g(), x("span", Jx, A(T(ge)(Number($.b3))), 1))
                ]),
                "cell-b4p": I(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(m.c4p) })
                  }, A(k(Number($.b4p))) + "%", 5)) : (g(), x("span", ek, A(T(ge)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (g(), x("div", tk, [
            d("div", ak, [
              d("div", nk, [
                N(T(dt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = d("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), sk = /* @__PURE__ */ ve(ok, [["__scopeId", "data-v-be7d2c0c"]]), ik = { class: "card-body" }, lk = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, rk = { class: "pie-section" }, ck = {
  key: 1,
  class: "empty-state"
}, dk = /* @__PURE__ */ fe({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = [
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
      () => a.data?.items && a.data.items.length > 0
    ), c = C(
      () => (a.data?.items || []).reduce((v, m) => v + m.count, 0)
    ), u = C(() => {
      const v = {};
      for (const m of a.data?.items || [])
        v[m.language] = (v[m.language] || 0) + m.count;
      return Object.entries(v).map(([m, b]) => ({ language: m, count: b })).sort((m, b) => b.count - m.count);
    }), f = C(() => ({
      labels: u.value.map((v) => l(v.language)),
      datasets: [
        {
          data: u.value.map((v) => v.count),
          backgroundColor: u.value.map(
            (v, m) => s[m % s.length] + "80"
          ),
          borderColor: u.value.map(
            (v, m) => s[m % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), h = C(() => ({
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
          borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
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
              const m = v.raw || 0, b = c.value > 0 ? (m / c.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${m} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (v, m) => (g(), te(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: I(() => [
        d("div", ik, [
          r.value ? (g(), x("div", lk, [
            d("section", rk, [
              N(Nn, {
                data: f.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ]),
            N(be, {
              class: "shrink-0",
              title: "Total",
              value: T(ge)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (g(), x("section", ck, [...m[0] || (m[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No language data available"),
              d("p", { class: "empty-description" }, " No language selection data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), uk = /* @__PURE__ */ ve(dk, [["__scopeId", "data-v-9385c088"]]), hk = { class: "card-body" }, fk = {
  key: 0,
  class: "guardrails-daily-section"
}, gk = { class: "w-full min-w-0" }, mk = { class: "font-medium" }, pk = { class: "font-semibold" }, vk = { class: "type-badges-row" }, bk = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, yk = {
  key: 1,
  class: "empty-state"
}, xk = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (p) => {
      o("export", p);
    }, { isDark: i } = Me($e(n, "theme")), l = C(
      () => n.data?.items && n.data.items.length > 0
    ), r = C(
      () => (n.data?.items || []).reduce((p, y) => p + y.count, 0)
    ), c = (p) => {
      const y = {};
      for (const w of n.data?.items || [])
        y[w[p]] = (y[w[p]] || 0) + w.count;
      const k = Object.entries(y).sort((w, $) => $[1] - w[1]);
      if (k.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: k[0][0],
        pct: _ > 0 ? Math.round(k[0][1] / _ * 100) : 0
      };
    }, u = C(() => c("guardrail_type")), f = C(() => c("guardrail_action")), h = C(() => c("guardrail_source")), v = C(() => {
      const p = {};
      for (const y of n.data?.items || [])
        p[y.date] || (p[y.date] = {}), p[y.date][y.guardrail_type] = (p[y.date][y.guardrail_type] || 0) + y.count;
      return Object.entries(p).map(([y, k]) => ({
        date: y,
        total: Object.values(k).reduce((_, w) => _ + w, 0),
        types: Object.entries(k).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((y, k) => new Date(y.date).getTime() - new Date(k.date).getTime());
    }), m = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], b = C(
      () => v.value.map((p) => ({
        id: p.date,
        date: p.date,
        total: p.total,
        types: p.types
      }))
    );
    return t({ isDark: i }), (p, y) => (g(), te(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !n.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", hk, [
          l.value ? (g(), x(he, { key: 0 }, [
            v.value.length > 0 ? (g(), x("section", fk, [
              d("div", gk, [
                N(pt, {
                  columns: m,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": I(({ row: k }) => [
                    d("span", mk, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": I(({ row: k }) => [
                    d("span", pk, A(T(ge)(k.total)), 1)
                  ]),
                  "cell-types": I(({ row: k }) => [
                    d("div", vk, [
                      (g(!0), x(he, null, pe(k.types, (_) => (g(), x("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : E("", !0),
            d("section", bk, [
              N(be, {
                title: "Total Events",
                value: T(ge)(r.value)
              }, null, 8, ["value"]),
              N(be, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(be, {
                title: "Top action",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(be, {
                title: "Top source",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (g(), x("section", yk, [...y[0] || (y[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No guardrail events"),
              d("p", { class: "empty-description" }, "No content safety events found for the selected period. This is a good sign!")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), kk = /* @__PURE__ */ ve(xk, [["__scopeId", "data-v-c042ede0"]]), _k = { class: "card-body" }, wk = { class: "chart-section" }, Ck = { class: "chart-wrapper" }, $k = {
  key: 1,
  class: "empty-chart"
}, Sk = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, Mk = {
  key: 0,
  class: "dn-failure-section"
}, Dk = { class: "w-full min-w-0" }, Ak = { class: "failure-reason" }, Tk = { class: "failure-count" }, Bk = { class: "impact-bar-container" }, Lk = { class: "impact-label" }, Rk = { class: "dn-trend-health-block flex flex-col gap-0" }, Pk = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, Ik = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, Ek = { class: "system-health" }, Fk = { class: "system-health-content" }, Ok = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, Vk = {
  key: 1,
  class: "empty-state"
}, Nk = /* @__PURE__ */ fe({
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
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = ($) => {
      o("export", $);
    }, { isDark: i, colors: l } = Me($e(n, "theme")), r = C(() => {
      const $ = n.data?.documentCounts?.items || [], D = n.data?.processingCounts?.items || [];
      return $.length > 0 || D.length > 0;
    }), c = C(() => {
      const $ = n.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((D, M) => D + M.processing_started, 0),
        processing_completed: $.reduce((D, M) => D + M.processing_completed, 0),
        processing_failed: $.reduce((D, M) => D + M.processing_failed, 0),
        row_count_total: $.reduce((D, M) => D + M.row_count_total, 0)
      };
    }), u = C(() => {
      const $ = n.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((D, M) => D + M.processing_started, 0),
        processing_success: $.reduce((D, M) => D + M.processing_success, 0),
        notification_sent: $.reduce((D, M) => D + M.notification_sent, 0),
        notification_failed: $.reduce((D, M) => D + M.notification_failed, 0),
        dq_phone: $.reduce((D, M) => D + M.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((D, M) => D + M.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((D, M) => D + M.dq_error_booking_not_found, 0),
        dq_other: $.reduce((D, M) => D + M.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (D, M) => D + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), f = C(
      () => c.value.row_count_total || u.value.processing_started
    ), h = C(
      () => Math.max(0, f.value - u.value.notification_sent)
    ), v = ($, D) => D ? `${Math.round($ / D * 100)}%` : "0%", m = C(() => {
      const $ = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].filter((D) => D.count > 0).sort((D, M) => M.count - D.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), b = C(() => {
      const $ = f.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].map((D) => ({
        ...D,
        impactPct: $ > 0 ? Math.round(D.count / $ * 100) : 0
      }));
    }), p = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], y = C(
      () => b.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), k = C(() => {
      const $ = f.value, D = u.value.processing_success, M = Math.max(0, D - u.value.totalDqErrors), F = u.value.notification_sent, z = Math.max(0, $ - D), W = u.value.totalDqErrors, S = Math.max(0, M - F), L = (H, Q) => ye(H, Q), B = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], j = [];
      return D > 0 && j.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: D,
        label: L(D, $)
      }), z > 0 && j.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: z,
        label: L(z, $)
      }), M > 0 && j.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: L(M, $)
      }), W > 0 && j.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: W,
        label: L(W, $)
      }), F > 0 && j.push({
        source: "Contactable",
        target: "Notified",
        value: F,
        label: L(F, $)
      }), S > 0 && j.push({
        source: "Contactable",
        target: "Not Delivered",
        value: S,
        label: L(S, $)
      }), { nodes: B, links: j };
    }), _ = C(() => {
      const $ = [...n.data?.processingCounts?.items || []].sort(
        (L, B) => new Date(L.date).getTime() - new Date(B.date).getTime()
      ), D = n.data?.documentCounts?.items || [], M = {};
      for (const L of D)
        M[L.date] = (M[L.date] || 0) + L.row_count_total;
      const F = [
        .../* @__PURE__ */ new Set([
          ...$.map((L) => L.date),
          ...D.map((L) => L.date)
        ])
      ].sort(), z = F.map((L) => Ne(L).format("MMM DD")), W = F.map((L) => {
        const B = $.find((Q) => Q.date === L), j = B?.notification_sent || 0, H = M[L] || B?.processing_started || 0;
        return H > 0 ? Math.round(j / H * 100) : 0;
      }), S = F.map((L) => $.find((j) => j.date === L)?.notification_sent || 0);
      return {
        labels: z,
        datasets: [
          {
            label: "Success Rate (%)",
            data: W,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: S,
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
    return t({ isDark: i }), ($, D) => (g(), te(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: D[0] || (D[0] = (M) => o("open"))
    }, {
      headerExport: I(() => [
        e.enableExport && !n.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", _k, [
          r.value ? (g(), x(he, { key: 0 }, [
            d("section", wk, [
              D[2] || (D[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", Ck, [
                k.value.nodes.length > 0 && k.value.links.length > 0 ? (g(), te(Yt, {
                  key: 0,
                  data: k.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (g(), x("div", $k, [...D[1] || (D[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", Sk, [
              N(be, {
                color: "#3b82f6",
                title: "Total Records",
                value: T(ge)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(be, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: T(ge)(f.value)
              }, null, 8, ["value"]),
              N(be, {
                color: "#10b981",
                title: "Successfully Notified",
                value: T(ge)(u.value.notification_sent),
                subvalue: v(u.value.notification_sent, f.value)
              }, null, 8, ["value", "subvalue"]),
              N(be, {
                color: "#ef4444",
                title: "Not Notified",
                value: T(ge)(h.value),
                subvalue: v(h.value, f.value)
              }, null, 8, ["value", "subvalue"]),
              N(be, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: m.value.reason,
                subvalue: m.value.count > 0 ? `${T(ge)(m.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (g(), x("section", Mk, [
              D[3] || (D[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", Dk, [
                N(pt, {
                  columns: p,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": I(({ row: M }) => [
                    d("span", Ak, A(M.reason), 1)
                  ]),
                  "cell-count": I(({ row: M }) => [
                    d("span", Tk, A(T(ge)(M.count)), 1)
                  ]),
                  "cell-impact": I(({ row: M }) => [
                    d("div", Bk, [
                      d("div", {
                        class: "impact-bar",
                        style: _e({ width: M.impactPct + "%" })
                      }, null, 4),
                      d("span", Lk, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : E("", !0),
            d("div", Rk, [
              _.value.labels.length > 0 ? (g(), x("section", Pk, [
                D[4] || (D[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", Ik, [
                  N(mt, {
                    data: _.value,
                    options: w.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : E("", !0),
              d("details", Ek, [
                D[5] || (D[5] = d("summary", { class: "system-health-toggle" }, [
                  d("svg", {
                    class: "toggle-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ]),
                  De(" System Health Details ")
                ], -1)),
                d("div", Fk, [
                  d("div", Ok, [
                    N(be, {
                      title: "Docs Started",
                      value: T(ge)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(be, {
                      title: "Docs Completed",
                      value: T(ge)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(be, {
                      title: "Docs Failed",
                      value: T(ge)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(be, {
                      title: "Processing Started",
                      value: T(ge)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    N(be, {
                      title: "Processing Success",
                      value: T(ge)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    N(be, {
                      title: "Notification Failed",
                      value: T(ge)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (g(), x("section", Vk, [...D[6] || (D[6] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No disruption notifier data"),
              d("p", { class: "empty-description" }, " No disruption notification data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), zk = /* @__PURE__ */ ve(Nk, [["__scopeId", "data-v-2342d485"]]), jk = "Total number of conversations initiated during the selected period.", Hk = /* @__PURE__ */ fe({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: jk }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => ge(a.totalConversations)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "Total Conversations",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), Wk = "Score of the top 5% most satisfied customers. If it drops, it serves as an alert that the remaining 95% are receiving worse service and overall quality is declining.", Kk = /* @__PURE__ */ fe({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: Wk }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "CSAT P95",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), Uk = /* @__PURE__ */ fe({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M3 12h3l2-6 4 12 3-8 2 2h4"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Yk = {
  key: 0,
  class: "card-body"
}, qk = { class: "chart-wrapper" }, Xk = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, Gk = {
  key: 1,
  class: "empty-state"
}, Zk = 520, Qk = 300, Jk = 40, e_ = 48, t_ = 48, a_ = {
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
    const n = a, o = (r) => {
      n("export", r);
    }, s = e, { isDark: i } = Me($e(s, "theme")), l = C(() => s.data);
    return t({ isDark: i }), (r, c) => (g(), te(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        l.value && l.value.total_nps_responses > 0 ? (g(), x("div", Yk, [
          d("div", qk, [
            N(Ml, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": Zk,
              "chart-height": Qk,
              "chart-margin": Jk,
              "chart-margin-right": e_,
              "chart-bottom-margin": t_,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", Xk, [
            N(be, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (g(), te(be, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : E("", !0)
          ])
        ])) : (g(), x("div", Gk, [...c[0] || (c[0] = [
          d("div", { class: "empty-state-content" }, [
            d("div", { class: "empty-icon-wrapper" }, [
              d("svg", {
                class: "empty-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                d("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              ])
            ]),
            d("p", { class: "empty-title" }, "No NPS data available"),
            d("p", { class: "empty-description" }, " No NPS data found for the selected period. Try adjusting the date range. ")
          ], -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Hl = /* @__PURE__ */ ve(a_, [["__scopeId", "data-v-e98fe9b2"]]), n_ = {
  key: 0,
  class: "card-body"
}, o_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, s_ = {
  key: 1,
  class: "empty-state"
}, i_ = {
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
    const a = t, n = (c) => {
      a("export", c);
    }, o = e, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
      labels: s.value.map((c) => Ne(c.date).format("DD-MM-YYYY")),
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
              const u = Number(c);
              return !Number.isInteger(u) || u < 0 || u > 10 ? "" : String(u);
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
    return (c, u) => (g(), te(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        i.value ? (g(), x("div", n_, [
          d("div", o_, [
            N(mt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", s_, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Wl = /* @__PURE__ */ ve(i_, [["__scopeId", "data-v-5207cfa7"]]), l_ = {
  key: 0,
  class: "card-body"
}, r_ = {
  key: 1,
  class: "empty-state"
}, c_ = /* @__PURE__ */ fe({
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
    const t = e, a = C(
      () => t.data?.resolution_breakdown || []
    ), n = C(
      () => a.value.some((i) => Number(i.count || 0) > 0)
    ), o = C(() => {
      const i = a.value;
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
    return (i, l) => (g(), te(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: I(() => [
        n.value ? (g(), x("div", l_, [
          N($t, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (g(), x("div", r_, [...l[0] || (l[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), d_ = /* @__PURE__ */ ve(c_, [["__scopeId", "data-v-6849ef24"]]), u_ = {
  key: 0,
  class: "card-body"
}, h_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, f_ = {
  key: 1,
  class: "empty-state"
}, g_ = /* @__PURE__ */ fe({
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
    const a = t, n = (c) => {
      a("export", c);
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
    return (c, u) => (g(), te(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        i.value ? (g(), x("div", u_, [
          d("div", h_, [
            N(mt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", f_, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), m_ = /* @__PURE__ */ ve(g_, [["__scopeId", "data-v-72955d9a"]]), p_ = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, v_ = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Kl = {
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
    const a = t, n = (u) => {
      a("export", u);
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), l = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = C(() => l.value > 0), c = C(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (u, f) => (g(), x("div", p_, [
      d("div", v_, [
        N(Hl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        N(Wl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (g(), x("div", {
        key: 0,
        class: q(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (g(), te(d_, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : E("", !0),
        i.value ? (g(), te(m_, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])) : E("", !0)
      ], 2)) : E("", !0)
    ]));
  }
}, b_ = { class: "csat-container__body" }, y_ = /* @__PURE__ */ fe({
  __name: "CSATContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    data: { default: void 0 },
    showResolutionChart: { type: Boolean, default: !1 },
    showCsatPulseChart: { type: Boolean, default: !1 }
  },
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const a = t;
    function n(o) {
      a("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (g(), te(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: I(() => [
        d("div", b_, [
          N(Kl, {
            data: e.data,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: n
          }, null, 8, ["data", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), x_ = /* @__PURE__ */ ve(y_, [["__scopeId", "data-v-37178ba1"]]), k_ = "Sum of all sales made across all flows (check-in, seller, ancillaries, booking manager, disruptions) in all currencies, converted to the selected currency.", __ = /* @__PURE__ */ fe({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: k_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => Xt(a.totalRevenue)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "AI Revenue",
      value: o.value,
      prefix: e.currencyCode,
      "value-size": "large",
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.75",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }),
          d("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
          d("path", { d: "M12 18V6" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "prefix", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), w_ = { class: "flex justify-end" }, C_ = { class: "w-52" }, $_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, S_ = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, M_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, D_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, A_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, T_ = /* @__PURE__ */ fe({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: l } = Me(s), r = ne(n.breakdownBy), c = C(() => n.data?.currency ?? "USD"), u = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], f = C(() => {
      const L = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return L ? `AI Generated Revenue by ${L}` : "AI Generated Revenue";
    }), h = C(() => r.value === "payment_method"), v = [
      "#8b5cf6",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], m = (S) => v[S % v.length], b = (S) => {
      if (!S) return "0";
      const L = Math.abs(S);
      return L >= 1e6 ? (S / 1e6).toFixed(2) + "M" : L >= 1e5 ? (S / 1e3).toFixed(1) + "K" : Math.round(S).toLocaleString();
    }, p = (S) => !S || S === "unknown" ? "Unknown" : kt(S).split(/[_|]/).map((L) => L ? L.charAt(0).toUpperCase() + L.slice(1) : "").join(" "), y = ne({
      labels: [],
      datasets: []
    }), k = ne([]), _ = C(() => {
      const S = Math.min(k.value.length, 5);
      if (!(S <= 0))
        return { gridTemplateColumns: `repeat(${S}, minmax(0, 1fr))` };
    }), w = (S) => {
      const L = S?.ai_revenue_by_day ?? [], B = S?.breakdown ?? [];
      if (!L.length) {
        y.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const j = [...L].sort((X, oe) => X.date.localeCompare(oe.date)), H = j.map((X) => Ne(X.date).format("MMM DD")), Q = "ai_revenue";
      if (r.value === "all") {
        y.value = {
          labels: H,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: j.map((X) => Number(X[Q] ?? 0)),
              borderColor: v[0],
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, k.value = [];
        return;
      }
      const ue = B.slice(0, 7).map((X) => X.key).map((X, oe) => {
        const R = m(oe), U = j.map((Y) => {
          const V = (Y.breakdown ?? {})[X];
          return V ? Number(V[Q] ?? 0) : 0;
        });
        return h.value ? {
          label: p(X),
          data: U,
          backgroundColor: R,
          borderColor: R,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: p(X),
          data: U,
          borderColor: R,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      y.value = { labels: H, datasets: ue }, k.value = B.slice(0, 5).map((X, oe) => ({
        key: X.key,
        label: p(X.key),
        amount: `${c.value} ${b(X.total)}`,
        percentage: Number(X.percentage ?? 0),
        color: m(oe)
      }));
    }, $ = C(() => ({
      callback: (S) => `${c.value} ${b(Number(S))}`,
      color: l.value.textSecondary,
      padding: 8
    })), D = C(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), M = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: $.value
    })), F = C(() => ({
      scales: {
        x: D.value,
        y: M.value
      }
    })), z = C(() => ({
      scales: {
        x: { ...D.value, stacked: !0 },
        y: { ...M.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (S) => w(S ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (S) => {
        r.value = S, w(n.data ?? null);
      }
    );
    const W = (S) => {
      r.value = String(S), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (S, L) => (g(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: f.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: I(() => [
        d("div", w_, [
          d("div", C_, [
            N(Tt, {
              "model-value": r.value,
              options: u,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: I(() => [
        d("div", {
          class: q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: I(() => [
              n.loading ? (g(), x("div", $_, [...L[0] || (L[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", S_, [
                y.value.labels && y.value.labels.length && y.value.datasets.length ? (g(), x("section", M_, [
                  d("div", D_, [
                    h.value ? (g(), te($t, {
                      key: 0,
                      data: y.value,
                      options: z.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (g(), te(mt, {
                      key: 1,
                      data: y.value,
                      options: F.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: _e(_.value)
                  }, [
                    (g(!0), x(he, null, pe(k.value, (B) => (g(), te(be, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : E("", !0)
                ])) : (g(), x("section", A_, [...L[1] || (L[1] = [
                  d("div", { class: "max-w-[360px] px-4 text-center" }, [
                    d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No revenue data available "),
                    d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No AI revenue found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), B_ = /* @__PURE__ */ ve(T_, [["__scopeId", "data-v-4f72028b"]]), L_ = { class: "flex justify-end" }, R_ = { class: "w-52" }, P_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, I_ = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, E_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, F_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, O_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, V_ = /* @__PURE__ */ fe({
  __name: "TransactionsChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: l } = Me(s), r = ne(n.breakdownBy), c = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], u = C(() => {
      const L = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return L ? `Transactions by ${L}` : "Transactions";
    }), f = C(() => r.value === "payment_method"), h = [
      "#8b5cf6",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], v = (S) => h[S % h.length], m = (S) => {
      if (!S) return "0";
      const L = Math.abs(S);
      return L >= 1e6 ? (S / 1e6).toFixed(2) + "M" : L >= 1e5 ? (S / 1e3).toFixed(1) + "K" : Math.round(S).toLocaleString();
    }, b = (S) => !S || S === "unknown" ? "Unknown" : kt(S).split(/[_|]/).map((L) => L ? L.charAt(0).toUpperCase() + L.slice(1) : "").join(" "), p = ne({
      labels: [],
      datasets: []
    }), y = ne([]), k = C(() => {
      const S = Math.min(y.value.length, 5);
      if (!(S <= 0))
        return { gridTemplateColumns: `repeat(${S}, minmax(0, 1fr))` };
    }), _ = (S) => Object.values(S ?? {}).reduce((L, B) => L + Number(B ?? 0), 0), w = (S) => {
      const L = S?.breakdown ?? [];
      if (r.value === "all") {
        const ue = S?.sales_by_channel_by_day ?? [];
        if (!ue.length) {
          p.value = { labels: [], datasets: [] }, y.value = [];
          return;
        }
        const X = [...ue].sort((oe, R) => oe.date.localeCompare(R.date));
        p.value = {
          labels: X.map((oe) => Ne(oe.date).format("MMM DD")),
          datasets: [
            {
              label: "Transactions",
              data: X.map((oe) => _(oe.channels)),
              borderColor: h[0],
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, y.value = [];
        return;
      }
      const B = S?.transactions_by_day ?? [];
      if (!B.length) {
        p.value = { labels: [], datasets: [] }, y.value = [];
        return;
      }
      const j = [...B].sort((ue, X) => ue.date.localeCompare(X.date)), H = j.map((ue) => Ne(ue.date).format("MMM DD")), re = L.slice(0, 7).map((ue) => ue.key).map((ue, X) => {
        const oe = v(X), R = j.map((U) => Number((U.breakdown ?? {})[ue] ?? 0));
        return f.value ? {
          label: b(ue),
          data: R,
          backgroundColor: oe,
          borderColor: oe,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: b(ue),
          data: R,
          borderColor: oe,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      p.value = { labels: H, datasets: re }, y.value = L.slice(0, 5).map((ue, X) => ({
        key: ue.key,
        label: b(ue.key),
        amount: m(ue.count),
        percentage: Number(ue.percentage ?? 0),
        color: v(X)
      }));
    }, $ = C(() => ({
      callback: (S) => m(Number(S)),
      color: l.value.textSecondary,
      padding: 8
    })), D = C(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), M = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: $.value
    })), F = C(() => ({
      scales: {
        x: D.value,
        y: M.value
      }
    })), z = C(() => ({
      scales: {
        x: { ...D.value, stacked: !0 },
        y: { ...M.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (S) => w(S ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (S) => {
        r.value = S, w(n.data ?? null);
      }
    );
    const W = (S) => {
      r.value = String(S), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (S, L) => (g(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "Number of transactions generated by agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: I(() => [
        d("div", L_, [
          d("div", R_, [
            N(Tt, {
              "model-value": r.value,
              options: c,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: I(() => [
        d("div", {
          class: q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: I(() => [
              n.loading ? (g(), x("div", P_, [...L[0] || (L[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", I_, [
                p.value.labels && p.value.labels.length && p.value.datasets.length ? (g(), x("section", E_, [
                  d("div", F_, [
                    f.value ? (g(), te($t, {
                      key: 0,
                      data: p.value,
                      options: z.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (g(), te(mt, {
                      key: 1,
                      data: p.value,
                      options: F.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  y.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: _e(k.value)
                  }, [
                    (g(!0), x(he, null, pe(y.value, (B) => (g(), te(be, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : E("", !0)
                ])) : (g(), x("section", O_, [...L[1] || (L[1] = [
                  d("div", { class: "max-w-[360px] px-4 text-center" }, [
                    d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No transaction data available "),
                    d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No transactions found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), N_ = /* @__PURE__ */ ve(V_, [["__scopeId", "data-v-df15ed82"]]), _i = 1, z_ = /* @__PURE__ */ fe({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = C(() => a.totalConversations * _i), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * _i), l = C(() => ge(s.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const h = i.value;
      return h === 0 ? s.value > 0 ? 100 : 0 : (s.value - h) / h * 100;
    }), u = C(() => {
      const h = c.value.toFixed(1);
      return c.value > 0 ? `+${h}%` : `${h}%`;
    }), f = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (h, v) => (g(), te(Ye, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...v[0] || (v[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" })
        ], -1)
      ])]),
      headerAside: I(() => [
        r.value ? (g(), x("div", {
          key: 0,
          class: q(["change-badge", f.value, { "change-badge--dark": T(o) }])
        }, A(u.value), 3)) : E("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), j_ = /* @__PURE__ */ ve(z_, [["__scopeId", "data-v-411e0735"]]), H_ = { class: "flex justify-end" }, W_ = { class: "w-52" }, K_ = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, U_ = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Y_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, q_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, X_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, G_ = /* @__PURE__ */ fe({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = ($) => {
      o("export", $);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" }
    ], l = $e(n, "theme"), { isDark: r } = Me(l), c = ne(n.breakdownBy || "all"), u = C(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), f = ne({
      labels: [],
      datasets: []
    }), h = ne([]), v = C(() => {
      const $ = h.value.length;
      if (!($ <= 0))
        return { gridTemplateColumns: `repeat(${$}, minmax(0, 1fr))` };
    }), m = ne(
      []
    ), b = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], p = ($) => b[$ % b.length], y = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: ($) => `${$}%`
          }
        }
      }
    }, k = ($) => {
      c.value = String($), o("changeBreakdown", c.value), w(u.value);
    }, _ = ($) => {
      if (!$) return "";
      const M = $.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, w = ($) => {
      if (c.value === "all") {
        const L = $?.escalations_by_day ?? [];
        if (!L.length) {
          f.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
          return;
        }
        const B = [...L].sort((j, H) => j.date.localeCompare(H.date));
        f.value = {
          labels: B.map((j) => Ne(j.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: B.map(
                (j) => Number(j.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, h.value = [], m.value = [];
        return;
      }
      const D = $?.breakdown_by_day ?? [], M = $?.breakdown_items ?? [];
      if (!D.length) {
        f.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
        return;
      }
      const F = [...D].sort(
        (L, B) => L.date.localeCompare(B.date)
      ), z = M.slice(0, 5).map((L) => L.key), W = F.map((L) => Ne(L.date).format("MMM DD")), S = z.map((L, B) => {
        const j = M.find((H) => H.key === L);
        return {
          label: _(j?.label || L),
          data: F.map((H) => {
            const Q = H.items.find((re) => re.key === L);
            return Number(Q?.percentage || 0);
          }),
          borderColor: p(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      f.value = {
        labels: W,
        datasets: S
      }, h.value = M.slice(0, 5).map((L, B) => ({
        key: L.key,
        label: _(L.label),
        percentage: Number(L.percentage || 0),
        color: p(B)
      })), m.value = M.slice(0, 5).map((L, B) => ({
        key: L.key,
        label: _(L.label),
        color: p(B)
      }));
    };
    return Te(
      () => n.data,
      ($) => {
        w($ ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      ($) => {
        c.value = $, w(u.value);
      }
    ), t({ isDark: r }), ($, D) => (g(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      headerAside: I(() => [
        d("div", H_, [
          d("div", W_, [
            N(Tt, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": k
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: I(() => [
        d("div", K_, [
          d("div", U_, [
            f.value.labels && f.value.labels.length && f.value.datasets.length ? (g(), x("section", Y_, [
              d("div", q_, [
                N(mt, {
                  data: f.value,
                  options: y,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(v.value)
              }, [
                (g(!0), x(he, null, pe(h.value, (M) => (g(), te(be, {
                  key: `card-${M.key}`,
                  class: "min-w-0",
                  color: M.color,
                  title: M.label,
                  value: `${M.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : E("", !0)
            ])) : (g(), x("section", X_, [...D[0] || (D[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Z_ = /* @__PURE__ */ ve(G_, [["__scopeId", "data-v-23d909e1"]]), Q_ = "Percentage of conversations transferred to a human out of the total initiated conversations.", J_ = /* @__PURE__ */ fe({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: Q_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "Human Escalations",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m17.25 15.75 4.5 4.5"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m21.75 15.75-4.5 4.5"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
});
function vo(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const e2 = { class: "flex justify-end" }, t2 = { class: "w-52" }, a2 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, n2 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, o2 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, s2 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, i2 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, l2 = "#8b5cf6", r2 = "#9ca3af", c2 = "#94a3b8", d2 = /* @__PURE__ */ fe({
  __name: "AvgResolutionTime",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["changeBreakdown", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (X) => {
      o("export", X);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" },
      { value: "resolution_mode", label: "Resolution Mode" },
      { value: "channel", label: "Channel" },
      { value: "agent_channel", label: "Channel & Agent" }
    ], l = $e(n, "theme"), { isDark: r } = Me(l), c = ne(n.breakdownBy), u = C(() => {
      const oe = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return oe ? `Average resolution time by ${oe}` : "Average resolution time";
    }), f = (X) => {
      c.value = String(X), o("changeBreakdown", c.value);
    }, h = [
      { key: "ai_agent", label: "AI Agent", color: "#8b5cf6" },
      { key: "human", label: "Human", color: "#f59e0b" },
      { key: "hybrid", label: "AI + Human", color: "#06b6d4" }
    ], v = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, m = (X) => v[X.toLowerCase()] || r2, b = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, p = (X) => b[X.toLowerCase()] || c2, y = (X) => {
      const [oe] = X.split("|").map((R) => R.trim());
      return p(oe || X);
    }, k = (X) => {
      if (!X) return "Unknown";
      const oe = kt(X).replace(/_/g, " ").trim();
      return oe ? oe.charAt(0).toUpperCase() + oe.slice(1) : "Unknown";
    }, _ = C(() => n.data ?? {
      ai_agent_total_conversations: 0,
      ai_agent_avg_resolution_time_seconds: null,
      ai_agent_avg_resolution_time_formatted: null,
      human_total_conversations: 0,
      human_avg_resolution_time_seconds: null,
      human_avg_resolution_time_formatted: null,
      hybrid_total_conversations: 0,
      hybrid_avg_resolution_time_seconds: null,
      hybrid_avg_resolution_time_formatted: null,
      overall_total_conversations: 0,
      overall_avg_resolution_time_seconds: null,
      overall_avg_resolution_time_formatted: null,
      resolution_time_by_day: {},
      overall_resolution_time_by_day: {},
      channel_breakdown_items: [],
      channel_resolution_time_by_day: {},
      agent_breakdown_items: [],
      agent_resolution_time_by_day: {},
      agent_channel_breakdown_items: [],
      agent_channel_resolution_time_by_day: {}
    }), w = ne({
      labels: [],
      datasets: []
    }), $ = C(() => {
      const X = _.value, oe = {
        ai_agent: X.ai_agent_total_conversations,
        human: X.human_total_conversations,
        hybrid: X.hybrid_total_conversations
      }, R = {
        ai_agent: X.ai_agent_avg_resolution_time_formatted,
        human: X.human_avg_resolution_time_formatted,
        hybrid: X.hybrid_avg_resolution_time_formatted
      };
      return h.map((U) => ({
        key: U.key,
        label: U.label,
        color: U.color,
        formattedValue: R[U.key] || "-",
        subvalue: `${oe[U.key] || 0} conversations`
      }));
    }), D = (X, oe) => X.map((R) => ({
      key: R.key,
      label: k(R.label),
      color: oe(R.key),
      formattedValue: R.avg_resolution_time_formatted || "-",
      subvalue: `${R.total_conversations} conversations (${R.percentage.toFixed(1)}%)`
    })), M = C(
      () => D(_.value.channel_breakdown_items ?? [], m)
    ), F = C(
      () => D(_.value.agent_breakdown_items ?? [], p)
    ), z = C(
      () => D(
        _.value.agent_channel_breakdown_items ?? [],
        y
      )
    ), W = C(() => {
      switch (c.value) {
        case "channel":
          return M.value;
        case "agent":
          return F.value;
        case "agent_channel":
          return z.value;
        case "resolution_mode":
          return $.value;
        default:
          return [];
      }
    }), S = C(() => {
      const X = W.value.length;
      if (!(X <= 0))
        return { gridTemplateColumns: `repeat(${X}, minmax(0, 1fr))` };
    }), L = (X) => X == null ? null : Number((X / 60).toFixed(2)), B = ne([]), j = (X) => {
      const oe = X?.overall_resolution_time_by_day ?? {}, R = Object.keys(oe).sort((U, Y) => U.localeCompare(Y));
      if (!R.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = [R.map((U) => oe[U] ?? null)], w.value = {
        labels: R.map((U) => Ne(U).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: B.value[0].map((U) => L(U)),
            borderColor: l2,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, H = (X) => {
      const oe = X?.resolution_time_by_day ?? {}, R = Object.keys(oe).sort((U, Y) => U.localeCompare(Y));
      if (!R.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = h.map(
        (U) => R.map((Y) => oe[Y]?.[U.key] ?? null)
      ), w.value = {
        labels: R.map((U) => Ne(U).format("MMM DD")),
        datasets: h.map((U, Y) => ({
          label: U.label,
          data: B.value[Y].map((V) => L(V)),
          borderColor: U.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, Q = (X, oe, R) => {
      const U = Object.keys(X).sort((V, le) => V.localeCompare(le));
      if (!U.length || !oe.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      const Y = oe.map((V) => V.key);
      B.value = Y.map((V) => U.map((le) => X[le]?.[V] ?? null)), w.value = {
        labels: U.map((V) => Ne(V).format("MMM DD")),
        datasets: Y.map((V, le) => {
          const ce = oe.find((xe) => xe.key === V);
          return {
            label: k(ce?.label || V),
            data: B.value[le].map((xe) => L(xe)),
            borderColor: R(V),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, re = (X) => {
      switch (c.value) {
        case "channel":
          Q(
            X?.channel_resolution_time_by_day ?? {},
            X?.channel_breakdown_items ?? [],
            m
          );
          return;
        case "agent":
          Q(
            X?.agent_resolution_time_by_day ?? {},
            X?.agent_breakdown_items ?? [],
            p
          );
          return;
        case "agent_channel":
          Q(
            X?.agent_channel_resolution_time_by_day ?? {},
            X?.agent_channel_breakdown_items ?? [],
            y
          );
          return;
        case "resolution_mode":
          H(X);
          return;
        default:
          j(X);
      }
    }, ue = C(() => ({
      scales: {
        y: {
          min: 0,
          ticks: {
            callback: (X) => `${X}m`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (X) => {
              const oe = X.dataset.label || "", R = B.value[X.datasetIndex]?.[X.dataIndex];
              return R == null ? `${oe}: -` : `${oe}: ${vo(R)}`;
            }
          }
        }
      }
    }));
    return Te(
      () => n.data,
      (X) => {
        re(X ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (X) => {
        c.value = X, re(n.data ?? null);
      }
    ), t({ isDark: r }), (X, oe) => (g(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      headerAside: I(() => [
        d("div", e2, [
          d("div", t2, [
            N(Tt, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": f
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: I(() => [
        d("div", a2, [
          d("div", n2, [
            w.value.labels.length && w.value.datasets.length ? (g(), x("section", o2, [
              d("div", s2, [
                N(mt, {
                  data: w.value,
                  options: ue.value,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              W.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(S.value)
              }, [
                (g(!0), x(he, null, pe(W.value, (R) => (g(), te(be, {
                  key: `card-${R.key}`,
                  class: "min-w-0",
                  color: R.color,
                  title: R.label,
                  value: R.formattedValue,
                  subvalue: R.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : (g(), x("section", i2, [...oe[0] || (oe[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No resolution time data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No conversations found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), u2 = /* @__PURE__ */ ve(d2, [["__scopeId", "data-v-05854dc5"]]), h2 = { class: "art-values__item" }, f2 = { class: "art-values__number" }, g2 = { class: "art-values__item" }, m2 = { class: "art-values__number" }, p2 = "Average time from the first message to the resolution of each conversation, broken down by resolver: AI Agent vs. Human.", v2 = /* @__PURE__ */ fe({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: p2 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = C(() => vo(a.aiAgentAvgResolutionTimeSeconds)), i = C(() => vo(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (l, r) => (g(), te(Ye, {
      label: "Average Resolution Time",
      value: s.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          })
        ], -1)
      ])]),
      value: I(() => [
        d("div", {
          class: q(["art-values", { "art-values--dark": T(o) }])
        }, [
          d("div", h2, [
            d("span", f2, A(s.value), 1),
            r[1] || (r[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          r[3] || (r[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", g2, [
            d("span", m2, A(i.value), 1),
            r[2] || (r[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme"]));
  }
}), b2 = /* @__PURE__ */ ve(v2, [["__scopeId", "data-v-39d7bf7a"]]), y2 = "Percentage of Check In Success relative to Check In Started.", x2 = /* @__PURE__ */ fe({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: y2 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "Check-in CR",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.checkinCr,
      "previous-value": e.previousCheckinCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M2 22h20" }),
          d("path", { d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), k2 = "Percentage of Sell Success relative to Sell Started.", _2 = /* @__PURE__ */ fe({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: k2 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "Seller CR",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.sellerCr,
      "previous-value": e.previousSellerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M16 10a4 4 0 0 1-8 0" }),
          d("path", { d: "M3.103 6.034h17.794" }),
          d("path", { d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), w2 = "Percentage of Booking Success relative to Booking Started.", C2 = /* @__PURE__ */ fe({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: w2 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (g(), te(Ye, {
      label: "Booking Manager CR",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.bookingManagerCr,
      "previous-value": e.previousBookingManagerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: I(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "m15 11-1 9" }),
          d("path", { d: "m19 11-4-7" }),
          d("path", { d: "M2 11h20" }),
          d("path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" }),
          d("path", { d: "M4.5 15.5h15" }),
          d("path", { d: "m5 11 4-7" }),
          d("path", { d: "m9 11 1 9" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), $2 = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, S2 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, M2 = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, D2 = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, A2 = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, T2 = { class: "max-w-[360px] text-center" }, B2 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, L2 = {
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
    const t = e, { isDark: a, colors: n } = Me($e(t, "theme")), o = C(() => {
      const l = t.data ?? {}, r = l.daily, c = l.days, u = Array.isArray(r) && r.length > 0, f = Array.isArray(c) && c.length > 0 && Array.isArray(l.allocatedCostSeries) && l.allocatedCostSeries.length === c.length;
      let h = [];
      return u ? h = r : f && (h = c.map((v, m) => ({
        date: v,
        allocated_cost: l.allocatedCostSeries[m] ?? 0,
        aws_cost: l.awsCostSeries[m] ?? 0,
        airline_conversations: l.airlineConversationsSeries[m] ?? 0
      }))), {
        daily: h,
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
            borderColor: n.value.primaryLight,
            backgroundColor: a.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
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
            borderColor: n.value.info,
            backgroundColor: a.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
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
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: n.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0,
          callbacks: {
            label(l) {
              const r = l.dataset.label ? `${l.dataset.label}: ` : "", c = l.parsed.y;
              return l.dataset.yAxisID === "y" ? r + Fe(c) : r + String(c);
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
            color: n.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 },
            callback: (l) => Fe(l)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        }
      }
    }));
    return (l, r) => (g(), te(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        d("div", $2, [
          o.value.daily.length > 0 ? (g(), x("div", S2, [
            d("div", M2, [
              N(mt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", D2, [
              N(be, {
                color: T(n).primaryLight,
                title: "Total Allocated",
                value: T(Fe)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              N(be, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Fe)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (g(), x("section", A2, [
            d("div", T2, [
              d("div", B2, [
                N(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              r[0] || (r[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              r[1] || (r[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, R2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, P2 = { class: "card-body" }, I2 = {
  key: 0,
  class: "chart-section"
}, E2 = { class: "chart-container" }, F2 = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, O2 = {
  key: 1,
  class: "empty-state"
}, V2 = { class: "empty-state-content" }, N2 = { class: "empty-icon-wrapper" }, Ia = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", wi = 10, z2 = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (m) => {
      const b = new Date(m), p = String(b.getDate()).padStart(2, "0"), y = String(b.getMonth() + 1).padStart(2, "0");
      return `${p}-${y}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((b, p) => b + (p.input_cost || 0), 0);
    }), c = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((b, p) => b + (p.output_cost || 0), 0);
    }), u = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((b, p) => b + (p.cache_read_cost || 0), 0);
    }), f = C(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((b, p) => b + (p.cache_write_cost || 0), 0);
    }), h = C(() => {
      const m = n.data?.costs_by_day || {}, b = Object.keys(m).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const p = b.map((k) => i(k)), y = [
        {
          label: "Input Cost",
          data: b.map((k) => m[k]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((k) => m[k]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((k) => m[k]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((k) => m[k]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: y
      };
    }), v = C(() => n.options ? n.options : {
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
              family: Ia,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: wi,
            boxHeight: wi,
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
            family: Ia,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Ia,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(m) {
              let b = m.dataset.label || "";
              return b && (b += ": "), m.parsed.y !== null && (b += Fe(m.parsed.y)), b;
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
            font: { family: Ia, size: 12, weight: "500" },
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
            font: { family: Ia, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(m) {
              return Fe(m);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (m, b) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        d("div", R2, [
          d("div", P2, [
            h.value.labels && h.value.labels.length ? (g(), x("section", I2, [
              d("div", E2, [
                N($t, {
                  data: h.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", F2, [
                N(be, {
                  title: "Total Cost",
                  value: T(Fe)(e.data.total_cost)
                }, null, 8, ["value"]),
                N(be, {
                  title: "Input Cost",
                  value: T(Fe)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                N(be, {
                  title: "Output Cost",
                  value: T(Fe)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                N(be, {
                  title: "Cache Read",
                  value: T(Fe)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                N(be, {
                  title: "Cache Write",
                  value: T(Fe)(f.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                N(be, {
                  title: "Avg / Conv.",
                  value: T(Fe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", O2, [
              d("div", V2, [
                d("div", N2, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                b[0] || (b[0] = d("p", { class: "empty-title" }, "No cost usage data", -1)),
                b[1] || (b[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), j2 = /* @__PURE__ */ ve(z2, [["__scopeId", "data-v-e1c4a95b"]]), H2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, W2 = { class: "card-body" }, K2 = {
  key: 0,
  class: "chart-section"
}, U2 = { class: "chart-container" }, Y2 = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, q2 = {
  key: 1,
  class: "empty-state"
}, X2 = { class: "empty-state-content" }, G2 = { class: "empty-icon-wrapper" }, Ea = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ci = 10, Z2 = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (u) => {
      const f = new Date(u), h = String(f.getDate()).padStart(2, "0"), v = String(f.getMonth() + 1).padStart(2, "0");
      return `${h}-${v}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const u = n.data?.tokens_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const h = f.map((m) => i(m)), v = [
        {
          label: "Input Tokens",
          data: f.map((m) => u[m]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: f.map((m) => u[m]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: f.map((m) => u[m]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: f.map((m) => u[m]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: h,
        datasets: v
      };
    }), c = C(() => n.options ? n.options : {
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
              family: Ea,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: Ci,
            boxHeight: Ci,
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
            family: Ea,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Ea,
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
            font: { family: Ea, size: 12, weight: "500" },
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
            font: { family: Ea, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (u, f) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        d("div", H2, [
          d("div", W2, [
            r.value.labels && r.value.labels.length ? (g(), x("section", K2, [
              d("div", U2, [
                N($t, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", Y2, [
                N(be, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(ge)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(be, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(ge)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                N(be, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(ge)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                N(be, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(ge)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                N(be, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(ge)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (g(), x("section", q2, [
              d("div", X2, [
                d("div", G2, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                f[0] || (f[0] = d("p", { class: "empty-title" }, "No token usage data", -1)),
                f[1] || (f[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Q2 = /* @__PURE__ */ ve(Z2, [["__scopeId", "data-v-554d3cda"]]), J2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ew = { class: "card-body" }, tw = {
  key: 0,
  class: "chart-section"
}, aw = { class: "chart-container" }, nw = { class: "mt-4 w-full min-w-0" }, ow = {
  key: 1,
  class: "empty-state"
}, sw = { class: "empty-state-content" }, iw = { class: "empty-icon-wrapper" }, lw = /* @__PURE__ */ fe({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = (c) => {
      const u = new Date(c), f = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${f}`;
    }, i = C(
      () => ge(a.data?.total_conversations ?? 0)
    ), l = C(() => {
      const c = a.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((v) => s(v)), h = [
        {
          label: "Conversations",
          data: u.map((v) => c[v] || 0),
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
        labels: f,
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
    return t({ isDark: n }), (c, u) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        d("div", J2, [
          d("div", ew, [
            l.value.labels && l.value.labels.length ? (g(), x("section", tw, [
              d("div", aw, [
                N(mt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", nw, [
                N(be, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", ow, [
              d("div", sw, [
                d("div", iw, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = d("p", { class: "empty-title" }, "No conversation count data", -1)),
                u[1] || (u[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), rw = /* @__PURE__ */ ve(lw, [["__scopeId", "data-v-311f443a"]]), cw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, dw = { class: "card-body" }, uw = {
  key: 0,
  class: "charts-grid"
}, hw = { class: "chart-section" }, fw = { class: "chart-container" }, gw = { class: "chart-section" }, mw = { class: "chart-container" }, pw = {
  key: 1,
  class: "empty-state"
}, vw = { class: "empty-state-content" }, bw = { class: "empty-icon-wrapper" }, yw = /* @__PURE__ */ fe({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((h, v) => (v.total_cost || 0) - (h.total_cost || 0)) : []), l = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((h, v) => (v.total_tokens || 0) - (h.total_tokens || 0)) : []), r = C(() => {
      const h = i.value;
      return h.length === 0 ? { labels: [], datasets: [] } : {
        labels: h.map((v) => kt(v.agent_type)),
        datasets: [
          {
            label: "Total Cost",
            data: h.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const h = l.value;
      return h.length === 0 ? { labels: [], datasets: [] } : {
        labels: h.map((v) => kt(v.agent_type)),
        datasets: [
          {
            label: "Total Tokens",
            data: h.map((v) => v.total_tokens || 0),
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
            title: function(h) {
              return h[0]?.label || "";
            },
            label: function(h) {
              const v = h.label, m = a.data?.top_agents?.find(
                (b) => kt(b.agent_type) === v
              );
              return m ? [
                `Total Cost: ${Fe(m.total_cost)}`,
                `Input Cost: ${Fe(m.total_input_tokens_cost)}`,
                `Output Cost: ${Fe(m.total_output_tokens_cost)}`,
                `Cache Read: ${Fe(m.total_read_tokens_cost)}`,
                `Cache Write: ${Fe(m.total_write_tokens_cost)}`
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
            callback: function(h) {
              return Fe(h);
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
            title: function(h) {
              return h[0]?.label || "";
            },
            label: function(h) {
              const v = h.label, m = a.data?.top_agents?.find(
                (b) => kt(b.agent_type) === v
              );
              return m ? [
                `Total Tokens: ${m.total_tokens.toLocaleString()}`,
                `Input Tokens: ${m.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${m.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${m.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${m.total_write_tokens.toLocaleString()}`
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
            callback: function(h) {
              return h.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, v) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        d("div", cw, [
          d("div", dw, [
            s.value ? (g(), x("div", uw, [
              d("section", hw, [
                v[0] || (v[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", fw, [
                  N($t, {
                    data: r.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", gw, [
                v[1] || (v[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", mw, [
                  N($t, {
                    data: c.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (g(), x("section", pw, [
              d("div", vw, [
                d("div", bw, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                v[2] || (v[2] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                v[3] || (v[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), xw = /* @__PURE__ */ ve(yw, [["__scopeId", "data-v-ae26eabc"]]), kw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, _w = { class: "card-body" }, ww = {
  key: 0,
  class: "chart-section"
}, Cw = { class: "chart-container" }, $w = {
  key: 1,
  class: "empty-state"
}, Sw = { class: "empty-state-content" }, Mw = { class: "empty-icon-wrapper" }, Dw = /* @__PURE__ */ fe({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = {
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
    ) : []), l = C(() => i.value.length > 0), r = C(() => i.value.reduce((f, h) => f + (h.conversations || 0), 0)), c = C(() => {
      const f = i.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const h = f.map((b) => {
        const p = b.agent_type?.toLowerCase();
        return (s[p] || "#a78bfa") + "80";
      }), v = f.map((b) => {
        const p = b.agent_type?.toLowerCase();
        return s[p] || "#a78bfa";
      });
      return {
        labels: f.map((b) => {
          const p = b.conversations || 0, y = r.value ? p / r.value * 100 : 0;
          return `${kt(b.agent_type)} - ${p.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((b) => b.conversations || 0),
            backgroundColor: h,
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
            label: (f) => {
              const h = (f.label || "").toString(), v = Number(f.parsed) || 0, m = (f.dataset.data || []).reduce((p, y) => p + (Number(y) || 0), 0), b = m ? v / m * 100 : 0;
              return `${h}: ${v.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, h) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        d("div", kw, [
          d("div", _w, [
            l.value ? (g(), x("section", ww, [
              d("div", Cw, [
                N(Nn, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", $w, [
              d("div", Sw, [
                d("div", Mw, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                h[1] || (h[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Aw = /* @__PURE__ */ ve(Dw, [["__scopeId", "data-v-a909b73c"]]), Tw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bw = { class: "card-body" }, Lw = {
  key: 0,
  class: "chart-section"
}, Rw = { class: "chart-container" }, Pw = {
  key: 1,
  class: "empty-state"
}, Iw = { class: "empty-state-content" }, Ew = { class: "empty-icon-wrapper" }, Fw = /* @__PURE__ */ fe({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = (c) => {
      const u = new Date(c), f = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${f}`;
    }, i = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(f).length > 0;
    }), l = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const p = [...c].sort((y, k) => y.date.localeCompare(k.date));
        return {
          labels: p.map((y) => s(y.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: p.map((y) => Number(y.value) || 0),
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
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {}, v = Object.keys(u).filter((p) => f[p]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const m = v.map((p) => s(p)), b = v.map((p) => {
        const y = u[p]?.total_cost || 0, k = f[p] || 0;
        return k > 0 ? y / k : 0;
      });
      return {
        labels: m,
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
            label: function(c) {
              let u = c.dataset.label || "";
              return u && (u += ": "), c.parsed.y !== null && (u += Fe(c.parsed.y)), u;
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
              return Fe(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, u) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: I(() => [
        d("div", Tw, [
          d("div", Bw, [
            i.value ? (g(), x("section", Lw, [
              d("div", Rw, [
                N(mt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", Pw, [
              d("div", Iw, [
                d("div", Ew, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = d("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                u[1] || (u[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ow = /* @__PURE__ */ ve(Fw, [["__scopeId", "data-v-ae6c48b1"]]), Vw = { class: "tabs text-sm" }, Nw = ["aria-label"], zw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], jw = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Hw = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne([]), s = `tabs-${Ke()}`, i = (m) => `${s}-tab-${m}`, l = C(
      () => a.items.map((m, b) => m.disabled ? -1 : b).filter((m) => m >= 0)
    );
    function r(m) {
      return m.value === a.modelValue;
    }
    function c(m) {
      const b = r(m), y = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return m.disabled ? `${y} cursor-not-allowed opacity-40` : b ? `${y} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${y} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(m, b) {
      m === b || a.items.find((y) => y.value === m)?.disabled || (n("update:modelValue", m), n("change", { value: m, previousValue: b }));
    }
    function f(m, b) {
      n("tab-click", { value: m.value, originalEvent: b }), !m.disabled && (u(m.value, a.modelValue), We(() => {
        o.value[a.items.indexOf(m)]?.focus();
      }));
    }
    function h(m, b) {
      const p = a.items.length;
      if (p === 0) return 0;
      let y = m;
      for (let k = 0; k < p; k++)
        if (y = (y + b + p) % p, !a.items[y]?.disabled) return y;
      return m;
    }
    async function v(m, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(m.key)) return;
      m.preventDefault();
      let y = b;
      m.key === "ArrowLeft" ? y = h(b, -1) : m.key === "ArrowRight" ? y = h(b, 1) : m.key === "Home" ? y = l.value[0] ?? 0 : m.key === "End" && (y = l.value[l.value.length - 1] ?? b);
      const k = a.items[y];
      !k || k.disabled || (u(k.value, a.modelValue), await We(), o.value[y]?.focus());
    }
    return (m, b) => (g(), x("div", Vw, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: q([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (g(!0), x(he, null, pe(e.items, (p, y) => (g(), x("button", {
          id: i(p.value),
          key: p.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": r(p),
          "aria-disabled": p.disabled === !0,
          tabindex: r(p) ? 0 : -1,
          class: q(c(p)),
          onClick: (k) => f(p, k),
          onKeydown: (k) => v(k, y)
        }, [
          d("span", {
            class: q(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            p.icon ? (g(), te(rt(p.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            d("span", jw, A(p.label), 1)
          ], 2)
        ], 42, zw))), 128))
      ], 10, Nw),
      m.$slots.default ? (g(), te(ct, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: I(() => [
          (g(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(m.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : E("", !0)
    ]));
  }
}), Ul = /* @__PURE__ */ ve(Hw, [["__scopeId", "data-v-f9c367eb"]]), Ww = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Kw = { class: "card-body" }, Uw = {
  key: 0,
  class: "model-usage-table-block"
}, Yw = { class: "w-full min-w-0" }, qw = {
  key: 1,
  class: "empty-state"
}, Xw = { class: "empty-state-content" }, Gw = { class: "empty-icon-wrapper" }, Zw = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (m) => {
      o("export", m);
    }, { isDark: i } = Me($e(n, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = ne("by_model"), c = C(() => r.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), u = C(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), f = C(
      () => Object.entries(c.value).map(([m, b]) => ({
        id: m,
        name: m,
        avgCost: v(b.avg_cost_per_message),
        avgTokens: h(b.avg_tokens_per_message),
        messageCount: h(b.message_count),
        totalCost: v(b.total_cost),
        totalTokens: h(b.total_tokens)
      }))
    ), h = (m) => m == null ? "0" : ge(m), v = (m) => m == null ? "$0.00" : Fe(m);
    return t({ isDark: i }), (m, b) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Ww, [
          d("div", Kw, [
            N(Ul, {
              modelValue: r.value,
              "onUpdate:modelValue": b[0] || (b[0] = (p) => r.value = p),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: I(() => [
                c.value && Object.keys(c.value).length > 0 ? (g(), x("div", Uw, [
                  d("div", Yw, [
                    N(pt, {
                      columns: u.value,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (g(), x("div", qw, [
                  d("div", Xw, [
                    d("div", Gw, [
                      N(T(dt), { class: "empty-icon" })
                    ]),
                    b[1] || (b[1] = d("p", { class: "empty-title" }, "No model usage data available", -1)),
                    b[2] || (b[2] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), Qw = /* @__PURE__ */ ve(Zw, [["__scopeId", "data-v-48a6cc07"]]), Jw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, e5 = { class: "card-body" }, t5 = {
  key: 0,
  class: "message-roles-table-block"
}, a5 = { class: "w-full min-w-0" }, n5 = {
  key: 1,
  class: "empty-state"
}, o5 = { class: "empty-state-content" }, s5 = { class: "empty-icon-wrapper" }, i5 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (b) => {
      o("export", b);
    }, { isDark: i } = Me($e(n, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => n.data?.total_by_role || {}), u = C(
      () => l.map((b) => ({
        id: b,
        role: m(b),
        avgCost: v(c.value[b]?.avg_cost_per_message),
        avgTokens: h(c.value[b]?.avg_tokens_per_message),
        messageCount: h(c.value[b]?.message_count),
        totalCost: v(c.value[b]?.total_cost),
        totalTokens: h(c.value[b]?.total_tokens)
      }))
    ), f = C(() => Object.keys(c.value).length > 0), h = (b) => b == null ? "0" : ge(b), v = (b) => b == null ? "$0.00" : Fe(b), m = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, p) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", Jw, [
          d("div", e5, [
            f.value ? (g(), x("div", t5, [
              d("div", a5, [
                N(pt, {
                  columns: r,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (g(), x("div", n5, [
              d("div", o5, [
                d("div", s5, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = d("p", { class: "empty-title" }, "No message role data available", -1)),
                p[1] || (p[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), l5 = /* @__PURE__ */ ve(i5, [["__scopeId", "data-v-d38e854e"]]), r5 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, c5 = { class: "card-body" }, d5 = {
  key: 0,
  class: "chart-section"
}, u5 = { class: "chart-container" }, h5 = { class: "kpi-grid" }, f5 = {
  key: 1,
  class: "empty-state"
}, g5 = { class: "empty-state-content" }, m5 = { class: "empty-icon-wrapper" }, p5 = 40, v5 = 230, b5 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (_) => {
      o("export", _);
    }, { isDark: i, colors: l } = Me($e(n, "theme")), r = {
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", u = (_) => _.agent_name ? kt(_.agent_name) : kt(c(_)).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), f = (_) => {
      const w = c(_).toLowerCase();
      for (const [$, D] of Object.entries(r))
        if (w.includes($))
          return D;
      return "#9ca3af";
    }, h = C(() => [...n.data?.top_agents || []].sort((w, $) => $.avg_cost_per_conversation - w.avg_cost_per_conversation)), v = C(
      () => Math.max(v5, h.value.length * p5 + 32)
    ), m = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : h.value.reduce((_, w) => _ + w.conversations, 0)), b = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : h.value.reduce((_, w) => _ + w.total_cost, 0)), p = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : m.value === 0 ? 0 : b.value / m.value), y = C(() => {
      const _ = h.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const w = _.map((M) => u(M)), $ = _.map((M) => M.avg_cost_per_conversation), D = _.map((M) => f(M));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: $,
            backgroundColor: D.map((M) => `${M}80`),
            borderColor: D,
            borderWidth: 1
          }
        ]
      };
    }), k = C(() => n.options ? n.options : {
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
            title: function(_) {
              const w = h.value[_[0]?.dataIndex];
              return w ? u(w) : "";
            },
            label: function(_) {
              const w = h.value[_.dataIndex];
              return [
                `Cost: ${Fe(_.parsed.x)}`,
                `Conversations: ${ge(w.conversations)}`,
                `Total Cost: ${Fe(w.total_cost)}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          type: "linear",
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
            callback: function(_) {
              return Fe(_);
            }
          }
        },
        y: {
          type: "category",
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
    return t({ isDark: i }), (_, w) => (g(), te(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (g(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: I(() => [
        d("div", r5, [
          d("div", c5, [
            y.value.labels && y.value.labels.length ? (g(), x("section", d5, [
              d("div", u5, [
                N($t, {
                  data: y.value,
                  options: k.value,
                  "height-px": v.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", h5, [
                N(T(be), {
                  title: "Total Agents",
                  value: String(h.value.length)
                }, null, 8, ["value"]),
                N(T(be), {
                  title: "Total Conversations",
                  value: T(ge)(m.value)
                }, null, 8, ["value"]),
                N(T(be), {
                  title: "Total Cost",
                  value: T(Fe)(b.value)
                }, null, 8, ["value"]),
                N(T(be), {
                  title: "Avg Cost / Conv.",
                  value: T(Fe)(p.value)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", f5, [
              d("div", g5, [
                d("div", m5, [
                  N(T(dt), { class: "empty-icon" })
                ]),
                w[0] || (w[0] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                w[1] || (w[1] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), y5 = /* @__PURE__ */ ve(b5, [["__scopeId", "data-v-2a8f51ca"]]), $i = /* @__PURE__ */ fe({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (g(), x("svg", {
      class: q(["inline-flex shrink-0 animate-spin", a.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...o[0] || (o[0] = [
      d("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), x5 = ["disabled", "aria-expanded", "aria-label"], k5 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, _5 = { class: "min-w-0 truncate" }, w5 = ["disabled", "onClick", "onMouseenter"], C5 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, $5 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, S5 = { class: "min-w-0 flex-1 text-left" }, M5 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, D5 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, A5 = ["disabled", "aria-expanded", "aria-label"], T5 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, B5 = ["disabled", "onClick", "onMouseenter"], L5 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, R5 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, P5 = { class: "min-w-0 flex-1 text-left" }, I5 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, E5 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, F5 = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, O5 = ["type", "disabled", "aria-busy", "aria-label"], V5 = {
  key: 2,
  class: "min-w-0 truncate"
}, N5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, z5 = ["type", "disabled", "aria-busy", "aria-label"], j5 = {
  key: 2,
  class: "min-w-0 truncate"
}, Mt = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = en(), s = C(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = C(() => a.variant === "dropdown"), l = C(() => a.variant === "split"), r = C(() => a.variant === "action"), c = C(() => !r.value && !l.value), u = C(() => a.disabled || a.loading), f = C(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), h = C(() => {
      const R = o["aria-label"];
      if (typeof R == "string" && R.length > 0) return R;
      if ((r.value || l.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), v = C(() => {
      const R = o.type;
      return R === "submit" || R === "reset" || R === "button" ? R : "button";
    }), m = C(() => {
      const { class: R, type: U, "aria-label": Y, ...V } = o;
      return V;
    }), b = C(() => a.variant === "primary" || a.variant === "dropdown" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : a.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100",
      "dark:hover:border-white/[0.18] dark:hover:bg-slate-800",
      "dark:active:bg-slate-700/90"
    ] : a.tone === "danger" ? [
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
    ]), p = `kiut-button-menu-${Ke()}`, y = `${p}-btn`, k = `${p}-menu`, _ = ne(null), w = ne(null), $ = ne(null), D = ne(!1), M = ne(0), F = ne({}), z = C(() => a.options.filter((R) => !R.disabled));
    function W(R) {
      return `${R.value}-${R.label}`;
    }
    function S() {
      const R = w.value;
      if (!R) return;
      const U = R.getBoundingClientRect(), Y = {
        top: `${U.bottom - 3}px`,
        minWidth: `max(${U.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (Y.right = `${window.innerWidth - U.right}px`, Y.left = "auto") : (Y.left = `${U.left}px`, Y.right = "auto"), F.value = Y;
    }
    function L(R) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === R ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      D.value = !1;
    }
    function j() {
      S(), M.value = 0, We(() => $.value?.focus());
    }
    function H() {
      if (!a.disabled) {
        if (D.value) {
          B();
          return;
        }
        D.value = !0, j();
      }
    }
    function Q(R) {
      R.disabled || (n("select", R), B());
    }
    function re(R) {
      R.stopPropagation(), H();
    }
    function ue(R) {
      if (!D.value) return;
      const U = R.target, Y = _.value, V = $.value;
      Y && !Y.contains(U) && (!V || !V.contains(U)) && B();
    }
    function X(R) {
      a.disabled || (R.key === "ArrowDown" || R.key === "Enter" || R.key === " ") && (R.preventDefault(), D.value || (D.value = !0, j()));
    }
    function oe(R) {
      const U = z.value;
      if (R.key === "Escape") {
        R.preventDefault(), B(), w.value?.focus();
        return;
      }
      if (U.length !== 0) {
        if (R.key === "ArrowDown") {
          R.preventDefault(), M.value = Math.min(M.value + 1, U.length - 1);
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (R.key === "Enter" || R.key === " ") {
          R.preventDefault();
          const Y = U[M.value];
          Y && Q(Y);
        }
      }
    }
    return et(() => {
      document.addEventListener("click", ue);
    }), at(() => {
      document.removeEventListener("click", ue);
    }), (R, U) => i.value ? (g(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", bt({
        ref_key: "buttonRef",
        ref: w,
        id: y,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": h.value
      }, m.value, {
        onClick: re,
        onKeydown: X
      }), [
        R.$slots.icon ? (g(), x("span", k5, [
          ke(R.$slots, "icon")
        ])) : E("", !0),
        d("span", _5, [
          ke(R.$slots, "default")
        ]),
        N(T(na), {
          class: q(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", D.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, x5),
      (g(), te(Wt, { to: "body" }, [
        Je(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: _e(F.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (g(!0), x(he, null, pe(z.value, (Y, V) => (g(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: q(L(V)),
            onClick: Be((le) => Q(Y), ["stop"]),
            onMouseenter: (le) => M.value = V
          }, [
            Y.icon ? (g(), x("span", C5, [
              (g(), te(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", $5)),
            d("span", S5, [
              d("span", M5, A(Y.label), 1),
              Y.description ? (g(), x("span", D5, A(Y.description), 1)) : E("", !0)
            ])
          ], 42, w5))), 128))
        ], 36), [
          [Kt, D.value]
        ])
      ]))
    ], 512)) : l.value ? (g(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", bt({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": h.value
      }, m.value, {
        onClick: re,
        onKeydown: X
      }), [
        R.$slots.icon ? (g(), x("span", T5, [
          ke(R.$slots, "icon")
        ])) : E("", !0)
      ], 16, A5),
      (g(), te(Wt, { to: "body" }, [
        Je(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: _e(F.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (g(!0), x(he, null, pe(z.value, (Y, V) => (g(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: q(L(V)),
            onClick: Be((le) => Q(Y), ["stop"]),
            onMouseenter: (le) => M.value = V
          }, [
            Y.icon ? (g(), x("span", L5, [
              (g(), te(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", R5)),
            d("span", P5, [
              d("span", I5, A(Y.label), 1),
              Y.description ? (g(), x("span", E5, A(Y.description), 1)) : E("", !0)
            ])
          ], 42, B5))), 128))
        ], 36), [
          [Kt, D.value]
        ])
      ]))
    ], 512)) : s.value ? (g(), x("span", F5, [
      d("button", bt({
        type: v.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [f.value, b.value, T(o).class]],
        disabled: u.value,
        "aria-busy": e.loading || void 0,
        "aria-label": h.value
      }, m.value), [
        e.loading ? (g(), te($i, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : R.$slots.icon ? (g(), x("span", {
          key: 1,
          class: q(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(R.$slots, "icon")
        ], 2)) : E("", !0),
        c.value ? (g(), x("span", V5, [
          ke(R.$slots, "default")
        ])) : E("", !0)
      ], 16, O5),
      d("span", N5, A(e.tooltip), 1)
    ])) : (g(), x("button", bt({
      key: 3,
      type: v.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [f.value, b.value, T(o).class]],
      disabled: u.value,
      "aria-busy": e.loading || void 0,
      "aria-label": h.value
    }, m.value), [
      e.loading ? (g(), te($i, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : R.$slots.icon ? (g(), x("span", {
        key: 1,
        class: q(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(R.$slots, "icon")
      ], 2)) : E("", !0),
      c.value ? (g(), x("span", j5, [
        ke(R.$slots, "default")
      ])) : E("", !0)
    ], 16, z5));
  }
}), H5 = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], W5 = { class: "sr-only" }, Yl = /* @__PURE__ */ fe({
  name: "Toggle",
  __name: "Toggle",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean },
    id: {},
    size: { default: "md" },
    ariaLabel: { default: "Interruptor" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t;
    function o() {
      a.disabled || n("update:modelValue", !a.modelValue);
    }
    return (s, i) => (g(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "data-kiut-toggle-size": e.size,
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: q([
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        e.size === "sm" ? "h-6 w-11" : "h-8 w-[3.75rem]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        $a(Be(o, ["prevent", "stop"]), ["space"]),
        $a(Be(o, ["prevent"]), ["enter"])
      ]
    }, [
      d("span", {
        class: q(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", W5, A(e.ariaLabel), 1)
    ], 42, H5));
  }
}), K5 = {
  method: "MÉTODO",
  name: "NOMBRE",
  url: "URL",
  status: "STATUS",
  version: "VERSIÓN",
  updated: "ACTUALIZADO",
  active: "ACTIVO",
  actions: "ACCIONES",
  historialTitle: "HISTORIAL DE VERSIONES",
  emptyHistory: "Sin versiones previas.",
  view: "Ver",
  run: "Ejecutar",
  edit: "Editar",
  delete: "Eliminar",
  createDraft: "Crear draft",
  viewVersion: "Ver",
  createDraftFromVersion: "Crear draft",
  expandRow: "Expandir fila",
  collapseRow: "Contraer fila",
  toggleActive: "Activar o desactivar",
  loadingHistory: "Cargando historial de versiones"
}, U5 = [
  {
    key: "method",
    label: "MÉTODO",
    type: "method",
    headerClass: "w-28",
    cellClass: "w-28"
  },
  {
    key: "name",
    label: "NOMBRE",
    type: "name",
    headerClass: "min-w-0",
    cellClass: "min-w-0"
  },
  {
    key: "url",
    label: "URL",
    type: "url",
    headerClass: "min-w-0",
    cellClass: "min-w-0"
  },
  {
    key: "status",
    label: "STATUS",
    type: "status",
    headerClass: "w-32",
    cellClass: "w-32"
  },
  {
    key: "version",
    label: "VERSIÓN",
    type: "version",
    headerClass: "w-20",
    cellClass: "w-20"
  },
  {
    key: "updated",
    label: "ACTUALIZADO",
    type: "updated",
    headerClass: "w-28",
    cellClass: "w-28"
  },
  {
    key: "actions",
    label: "ACCIONES",
    type: "actions",
    align: "right",
    headerClass: "w-28",
    cellClass: "w-28",
    actions: ["view", "run", "edit"]
  }
], SM = [
  {
    key: "name",
    label: "NOMBRE",
    type: "name",
    headerClass: "min-w-0",
    cellClass: "min-w-0"
  },
  {
    key: "status",
    label: "STATUS",
    type: "status",
    headerClass: "w-32",
    cellClass: "w-32"
  },
  {
    key: "version",
    label: "VERSIÓN",
    type: "version",
    headerClass: "w-20",
    cellClass: "w-20"
  },
  {
    key: "updated",
    label: "ACTUALIZADO",
    type: "updated",
    headerClass: "w-28",
    cellClass: "w-28"
  },
  {
    key: "active",
    label: "ACTIVO",
    type: "active",
    align: "center",
    headerClass: "w-24",
    cellClass: "w-24"
  },
  {
    key: "actions",
    label: "ACCIONES",
    type: "actions",
    align: "right",
    headerClass: "w-36",
    cellClass: "w-36",
    actions: ["view", "createDraft", "edit", "delete"]
  }
], Y5 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, q5 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, X5 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, G5 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Z5 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, Q5 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, J5 = ["aria-expanded", "aria-label", "onClick"], eC = { class: "min-w-0 flex-1" }, tC = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, aC = ["colspan"], nC = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, oC = ["aria-label"], sC = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, iC = {
  key: 2,
  class: "space-y-2"
}, lC = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, rC = ["title"], cC = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, dC = { class: "ml-auto flex shrink-0 items-center gap-2" }, uC = /* @__PURE__ */ fe({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => U5 },
    rowKey: { type: [String, Function], default: "id" },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    expandColumnKey: { default: void 0 },
    labels: { default: () => ({}) },
    historySkeletonCount: { default: 2 }
  },
  emits: ["update:expandedKeys", "expand", "collapse", "view", "run", "edit", "delete", "createDraft", "toggleActive", "viewVersion", "createDraftFromVersion"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = ne([...a.defaultExpandedKeys]), s = C({
      get() {
        return a.expandedKeys ?? o.value;
      },
      set(S) {
        o.value = S, n("update:expandedKeys", S);
      }
    }), i = C(() => ({
      ...K5,
      ...a.labels
    })), l = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), r = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(S) {
      return `cell-${S}`;
    }
    function u(S, L, B) {
      return {
        row: S,
        column: L,
        index: B,
        expanded: b(S, B)
      };
    }
    function f(S) {
      const L = S.key;
      return S.label ? S.label : L in i.value ? i.value[L] : S.key;
    }
    function h(S) {
      return S === "center" ? "text-center" : S === "right" ? "text-right" : "text-left";
    }
    function v(S) {
      return S === l.value;
    }
    function m(S, L) {
      if (typeof a.rowKey == "function")
        return a.rowKey(S);
      const B = S[a.rowKey];
      return B != null ? String(B) : `__index_${L}`;
    }
    function b(S, L) {
      return s.value.includes(m(S, L));
    }
    function p(S) {
      return S.versionsLoading === !0;
    }
    function y(S, L) {
      const B = m(S, L), j = new Set(s.value);
      j.has(B) ? (j.delete(B), n("collapse", B, S)) : (a.singleExpand && j.clear(), j.add(B), n("expand", B, S)), s.value = [...j];
    }
    function k(S) {
      return S.type ?? S.key;
    }
    function _(S) {
      return r[S] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function w(S) {
      return S === "published" ? "success" : "warning";
    }
    function $(S) {
      const L = S instanceof Date ? S : new Date(S);
      return Number.isNaN(L.getTime()) ? String(S) : L.toLocaleDateString("es-ES");
    }
    function D(S) {
      const L = S instanceof Date ? S : new Date(S);
      return Number.isNaN(L.getTime()) ? String(S) : L.toLocaleString("es-ES");
    }
    function M(S) {
      return He("div", { class: "min-w-0" }, [
        He(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          S.name
        ),
        S.description ? He(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          S.description
        ) : null
      ]);
    }
    function F(S) {
      return S.method ? He(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            _(S.method)
          ]
        },
        S.method
      ) : null;
    }
    function z(S, L) {
      const B = L.actions ?? ["view", "edit"], j = [];
      for (const H of B)
        H === "view" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", S)
            },
            { icon: () => He(mi, { class: "h-4 w-4" }) }
          )
        ) : H === "run" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", S)
            },
            { icon: () => He(kp, { class: "h-4 w-4" }) }
          )
        ) : H === "edit" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", S)
            },
            { icon: () => He(xp, { class: "h-4 w-4" }) }
          )
        ) : H === "createDraft" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", S)
            },
            { icon: () => He(gi, { class: "h-4 w-4" }) }
          )
        ) : H === "delete" && j.push(
          He(
            Mt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", S)
            },
            { icon: () => He(_p, { class: "h-4 w-4" }) }
          )
        );
      return He(
        "div",
        { class: "flex items-center justify-end gap-1" },
        j
      );
    }
    function W(S, L, B) {
      switch (k(L)) {
        case "name":
          return M(S);
        case "method":
          return F(S);
        case "url":
          return S.url ? He(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: S.url
            },
            S.url
          ) : null;
        case "status":
          return He(
            Ge,
            { color: w(S.status), outlined: !1 },
            () => S.status
          );
        case "version":
          return He("span", {}, S.version);
        case "updated":
          return He(
            "span",
            { class: "whitespace-nowrap text-xs" },
            $(S.updatedAt)
          );
        case "active":
          return He(Yl, {
            modelValue: S.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (H) => n("toggleActive", S, H)
          });
        case "actions":
          return z(S, L);
        default:
          return He("span", {}, String(S[L.key] ?? ""));
      }
    }
    return (S, L) => (g(), x("div", Y5, [
      d("div", q5, [
        d("table", X5, [
          d("thead", null, [
            d("tr", G5, [
              (g(!0), x(he, null, pe(e.columns, (B) => (g(), x("th", {
                key: B.key,
                scope: "col",
                class: q([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  h(B.align),
                  B.headerClass ?? ""
                ])
              }, A(f(B)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(he, null, pe(e.rows, (B, j) => (g(), x(he, {
              key: m(B, j)
            }, [
              d("tr", Z5, [
                (g(!0), x(he, null, pe(e.columns, (H) => (g(), x("td", {
                  key: H.key,
                  class: q([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    h(H.align),
                    H.cellClass ?? ""
                  ])
                }, [
                  ke(S.$slots, c(H.key), bt({ ref_for: !0 }, u(B, H, j)), () => [
                    v(H.key) ? (g(), x("div", Q5, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": b(B, j),
                        "aria-label": b(B, j) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (Q) => y(B, j)
                      }, [
                        N(T(na), {
                          class: q(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !b(B, j) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, J5),
                      d("div", eC, [
                        (g(), te(rt(() => W(B, H))))
                      ])
                    ])) : (g(), te(rt(() => W(B, H)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              b(B, j) ? (g(), x("tr", tC, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", nC, A(i.value.historialTitle), 1),
                  p(B) ? (g(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (g(!0), x(he, null, pe(e.historySkeletonCount, (H) => (g(), x("div", {
                      key: H,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...L[0] || (L[0] = [
                      io('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, oC)) : B.versions?.length ? (g(), x("div", iC, [
                    (g(!0), x(he, null, pe(B.versions, (H) => (g(), x("div", {
                      key: H.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(S.$slots, "history-item", {
                        version: H,
                        row: B
                      }, () => [
                        N(Ge, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: I(() => [
                            De(A(H.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", lC, A(H.version), 1),
                        H.method ? (g(), x("span", {
                          key: 0,
                          class: q(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(H.method)])
                        }, A(H.method), 3)) : E("", !0),
                        H.url ? (g(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: H.url
                        }, A(H.url), 9, rC)) : E("", !0),
                        d("span", cC, A(D(H.updatedAt)), 1)
                      ], !0),
                      d("div", dC, [
                        ke(S.$slots, "history-actions", {
                          version: H,
                          row: B
                        }, () => [
                          N(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("viewVersion", H, B)
                          }, {
                            icon: I(() => [
                              N(T(mi), { class: "h-4 w-4" })
                            ]),
                            default: I(() => [
                              De(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          N(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("createDraftFromVersion", H, B)
                          }, {
                            icon: I(() => [
                              N(T(gi), { class: "h-4 w-4" })
                            ]),
                            default: I(() => [
                              De(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (g(), x("p", sC, A(i.value.emptyHistory), 1))
                ], 8, aC)
              ])) : E("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), hC = /* @__PURE__ */ ve(uC, [["__scopeId", "data-v-177ecafb"]]);
function Si(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function fC(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function gC(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function mC(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function pC(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function vC(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function bC(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function yC(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const xC = ["aria-label"], kC = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, _C = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, wC = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, CC = ["aria-label", "aria-expanded", "aria-controls", "onClick"], $C = { class: "truncate" }, SC = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, MC = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, DC = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, AC = ["aria-label", "onClick"], TC = ["aria-label", "onClick"], BC = ["aria-label"], LC = ["aria-label"], RC = {
  key: 1,
  class: "space-y-2"
}, PC = ["for"], IC = ["id", "placeholder", "onKeydown"], EC = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, FC = ["aria-label"], OC = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, VC = ["checked", "onChange"], NC = { class: "min-w-0 flex-1" }, zC = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, jC = { class: "flex flex-wrap items-end gap-2" }, HC = { class: "min-w-[120px] flex-1" }, WC = ["for"], KC = ["id"], UC = { class: "min-w-[120px] flex-1" }, YC = ["for"], qC = ["id"], XC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = bo(), i = `${`kiut-filters-${Ke()}`}-panel`, l = ne(null), r = /* @__PURE__ */ new Map(), c = ne(null), u = ne(!1), f = ne({}), h = ne(null), v = ne(""), m = ne([]), b = ne(""), p = ne(""), y = C(() => c.value ? a.filterDefinitions.find((O) => O.id === c.value) ?? null : null), k = C(() => {
      const O = y.value;
      if (O)
        return O.type === "text" ? v.value : O.type === "select" ? m.value : { start: b.value, end: p.value };
    });
    function _(O, J) {
      J && J instanceof HTMLElement ? r.set(O, J) : r.delete(O);
    }
    function w(O) {
      return a.modelValue[O];
    }
    function $(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((J) => typeof J == "string" && J.trim() !== "");
      if (typeof O == "string") {
        const J = O.trim();
        return J ? [J] : [];
      }
      return [];
    }
    function D(O, J) {
      if (J == null) return !0;
      if (O.type === "text") return String(J).trim() === "";
      if (O.type === "select") return $(J).length === 0;
      if (O.type === "dateRange") {
        const se = J;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => a.filterDefinitions.some((O) => !D(O, w(O.id)))
    ), F = C(() => {
      const O = [];
      for (const J of a.filterDefinitions) {
        const se = w(J.id);
        if (!D(J, se)) {
          if (J.type === "text")
            O.push({ kind: "text", def: J, key: J.id });
          else if (J.type === "dateRange")
            O.push({ kind: "dateRange", def: J, key: J.id });
          else if (J.type === "select")
            for (const me of $(se))
              O.push({
                kind: "select",
                def: J,
                optionValue: me,
                key: `${J.id}::${me}`
              });
        }
      }
      return O;
    });
    function z(O) {
      return O.type !== "select" ? 0 : $(w(O.id)).length;
    }
    function W(O) {
      const J = w(O.id), se = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${se}: ${String(J ?? "").trim()}`;
      if (O.type === "select") {
        const Pe = $(J).map((Xe) => O.options.find((pa) => pa.value === Xe)?.label ?? Xe);
        return `${se}: ${Pe.join(", ")}`;
      }
      const me = J, Ce = L(me.start), we = L(me.end);
      return `${se}: ${Ce} – ${we}`;
    }
    function S(O) {
      return O.kind === "text" || O.kind === "dateRange" ? W(O.def) : O.def.options.find((se) => se.value === O.optionValue)?.label ?? O.optionValue;
    }
    function L(O) {
      if (!O) return "";
      const J = Ne(O, "YYYY-MM-DD", !0);
      return J.isValid() ? J.format("L") : O;
    }
    function B(O) {
      const J = c.value === O.id && u.value, se = !D(O, w(O.id));
      return J || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function j(O) {
      return D(O, w(O.id)) ? ee(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function H(O) {
      const J = w(O.id);
      if (O.type === "text") {
        v.value = J != null ? String(J) : "";
        return;
      }
      if (O.type === "select") {
        m.value = [...$(J)];
        return;
      }
      const se = J;
      b.value = se?.start?.trim() ?? "", p.value = se?.end?.trim() ?? "";
    }
    function Q() {
      const O = y.value;
      if (!O || O.type !== "select") return;
      const J = { ...a.modelValue };
      m.value.length === 0 ? delete J[O.id] : J[O.id] = [...m.value], n("update:modelValue", J), n("change", J);
    }
    function re(O) {
      const J = m.value.indexOf(O);
      J >= 0 ? m.value = m.value.filter((se, me) => me !== J) : m.value = [...m.value, O], Q();
    }
    function ue(O) {
      if (!O) return;
      h.value = O;
      const J = O.getBoundingClientRect(), se = 300;
      let me = J.left;
      const Ce = window.innerWidth - se - 12;
      me > Ce && (me = Math.max(12, Ce)), me < 12 && (me = 12);
      const we = J.bottom + 8;
      f.value = {
        top: `${we}px`,
        left: `${me}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function X(O, J) {
      if (c.value === O.id && u.value) {
        V();
        return;
      }
      u.value && c.value !== O.id && V(), c.value = O.id, u.value = !0, H(O), We().then(async () => {
        ue(J.currentTarget), await We(), R();
      });
    }
    function oe(O, J) {
      if (c.value === O.id && u.value) {
        V();
        return;
      }
      u.value && c.value !== O.id && V(), c.value = O.id, u.value = !0, H(O), We().then(async () => {
        const se = r.get(O.id) ?? J.currentTarget;
        ue(se), await We(), R();
      });
    }
    function R() {
      const O = l.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function U() {
      u.value = !1, c.value = null, h.value = null;
    }
    function Y(O) {
      const J = y.value;
      if (!J) return;
      if (J.type === "text") {
        v.value = O != null ? String(O) : "";
        return;
      }
      if (J.type === "select") {
        m.value = Array.isArray(O) ? O.filter((me) => typeof me == "string") : $(O);
        return;
      }
      const se = O;
      b.value = se?.start?.trim() ?? "", p.value = se?.end?.trim() ?? "";
    }
    function V() {
      const O = y.value;
      if (!O) return;
      if (O.type === "text") {
        const Ce = v.value.trim(), we = { ...a.modelValue };
        Ce === "" ? delete we[O.id] : we[O.id] = Ce, n("update:modelValue", we), n("change", we), U();
        return;
      }
      if (O.type === "select") {
        Q(), U();
        return;
      }
      const J = b.value.trim(), se = p.value.trim(), me = { ...a.modelValue };
      !J || !se || J > se ? delete me[O.id] : me[O.id] = { start: J, end: se }, n("update:modelValue", me), n("change", me), U();
    }
    function le(O) {
      const J = { ...a.modelValue };
      delete J[O], n("update:modelValue", J), n("change", J), c.value === O && U();
    }
    function ce(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        le(O.def.id);
        return;
      }
      const J = { ...a.modelValue }, me = $(J[O.def.id]).filter((Ce) => Ce !== O.optionValue);
      me.length === 0 ? delete J[O.def.id] : J[O.def.id] = me, n("update:modelValue", J), n("change", J), c.value === O.def.id && H(O.def);
    }
    function xe() {
      const O = {};
      n("update:modelValue", O), n("change", O), U();
    }
    const K = C(() => {
      const O = y.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function ie(O) {
      const J = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((Ce) => Ce.value === O.optionValue)?.label ?? O.optionValue} del filtro ${J}` : `Quitar filtro ${J}`;
    }
    function de(O) {
      const J = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const me = O.def.options.find((Ce) => Ce.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${J}: ${me}`;
      }
      return `Editar filtro ${J}`;
    }
    function ee(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const G = C(() => a.clearLabel);
    function P(O) {
      if (!u.value || !l.value) return;
      const J = O.target;
      if (!(l.value.contains(J) || (J instanceof Element ? J : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const me of r.values())
          if (me?.contains(J)) return;
        V();
      }
    }
    function Z(O) {
      O.key === "Escape" && u.value && (O.preventDefault(), U());
    }
    function ae() {
      !u.value || !h.value || ue(h.value);
    }
    return et(() => {
      document.addEventListener("mousedown", P, !0), window.addEventListener("keydown", Z, !0), window.addEventListener("resize", ae);
    }), Bi(() => {
      document.removeEventListener("mousedown", P, !0), window.removeEventListener("keydown", Z, !0), window.removeEventListener("resize", ae);
    }), Te(
      () => a.modelValue,
      () => {
        const O = y.value;
        O && u.value && !o.panel && H(O);
      },
      { deep: !0 }
    ), (O, J) => (g(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", kC, [
        d("span", _C, A(e.label), 1),
        d("div", wC, [
          (g(!0), x(he, null, pe(e.filterDefinitions, (se) => (g(), x("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (me) => _(se.id, me),
            type: "button",
            class: q(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", B(se)]),
            "aria-label": j(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (me) => oe(se, me)
          }, [
            N(T(pC), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", $C, A(se.label), 1),
            se.type === "select" && z(se) > 0 ? (g(), x("span", SC, A(z(se)), 1)) : E("", !0)
          ], 10, CC))), 128))
        ])
      ]),
      M.value ? (g(), x("div", MC, [
        d("div", DC, [
          (g(!0), x(he, null, pe(F.value, (se) => (g(), x("div", {
            key: se.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(se),
              onClick: (me) => X(se.def, me)
            }, [
              ke(O.$slots, "formatChip", {
                filter: se.def,
                value: w(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                De(A(S(se)), 1)
              ], !0)
            ], 8, AC),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": ie(se),
              onClick: (me) => ce(se)
            }, [
              N(T(yC), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, TC)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": G.value,
          onClick: xe
        }, A(e.clearLabel), 9, BC)
      ])) : E("", !0),
      (g(), te(Wt, { to: "body" }, [
        c.value && u.value ? (g(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": K.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: _e(f.value),
          onKeydown: J[3] || (J[3] = Be(() => {
          }, ["stop"]))
        }, [
          y.value ? (g(), x(he, { key: 0 }, [
            O.$slots.panel ? ke(O.$slots, "panel", {
              key: 0,
              filter: y.value,
              close: V,
              value: k.value,
              updateValue: Y
            }, void 0, !0) : (g(), x("div", RC, [
              y.value.type === "text" ? (g(), x(he, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(y.value.label), 9, PC),
                Je(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": J[0] || (J[0] = (se) => v.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: y.value.placeholder ?? "…",
                  onKeydown: $a(Be(V, ["prevent"]), ["enter"])
                }, null, 40, IC), [
                  [Pt, v.value]
                ])
              ], 64)) : y.value.type === "select" ? (g(), x(he, { key: 1 }, [
                d("p", EC, A(y.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": y.value.label,
                  "aria-multiselectable": !0
                }, [
                  (g(!0), x(he, null, pe(y.value.options, (se) => (g(), x("li", {
                    key: se.value
                  }, [
                    d("label", OC, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: m.value.includes(se.value),
                        onChange: (me) => re(se.value)
                      }, null, 40, VC),
                      d("span", NC, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, FC)
              ], 64)) : y.value.type === "dateRange" ? (g(), x(he, { key: 2 }, [
                d("p", zC, A(y.value.label), 1),
                d("div", jC, [
                  d("div", HC, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, WC),
                    Je(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": J[1] || (J[1] = (se) => b.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, KC), [
                      [Pt, b.value]
                    ])
                  ]),
                  d("div", UC, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, YC),
                    Je(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": J[2] || (J[2] = (se) => p.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, qC), [
                      [Pt, p.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, LC)) : E("", !0)
      ]))
    ], 8, xC));
  }
}), GC = /* @__PURE__ */ ve(XC, [["__scopeId", "data-v-f38e0100"]]), ZC = { class: "font-sans" }, QC = ["for"], JC = { class: "relative" }, e$ = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], t$ = ["id"], ql = /* @__PURE__ */ fe({
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
    errorText: {},
    icon: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = en(), s = Li("$pcForm", null), i = `kiut-input-text-${Ke()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (y) => {
        u.value = y ?? "";
      }
    ), et(() => {
      s && c.value && s.register?.(c.value, {});
    }), at(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? u.value : u.value), h = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function v(y) {
      const k = y.target.value;
      u.value = k, n("update:modelValue", k);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(y);
    }
    function m(y) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(y);
    }
    function b(y) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(y);
    }
    const p = C(() => {
      const { name: y, id: k, type: _, ...w } = o;
      return w;
    });
    return (y, k) => (g(), x("div", ZC, [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: q(T(ut))
      }, A(e.label), 11, QC)) : E("", !0),
      d("div", JC, [
        e.icon ? (g(), te(rt(e.icon), {
          key: 0,
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        })) : E("", !0),
        d("input", bt(p.value, {
          id: l.value,
          name: c.value,
          type: e.type,
          autocomplete: "off",
          class: [
            T(tt),
            e.icon ? "pl-10" : "",
            h.value ? T(Dt) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": h.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: v,
          onChange: m,
          onBlur: b
        }), null, 16, e$)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, t$)) : E("", !0)
    ]));
  }
}), a$ = { class: "font-sans" }, n$ = ["for"], o$ = { class: "relative" }, s$ = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], i$ = ["aria-label"], l$ = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, r$ = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, c$ = ["id"], d$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = en(), s = Li("$pcForm", null), i = `kiut-input-password-${Ke()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = ne(!1), f = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (k) => {
        k !== void 0 && k !== f.value && (f.value = k);
      }
    ), et(() => {
      s && c.value && s.register?.(c.value, {});
    }), at(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? f.value : f.value), v = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function m(k) {
      const _ = k.target.value;
      f.value = _, n("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(k);
    }
    function b(k) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(k);
    }
    function p(k) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(k);
    }
    const y = C(() => {
      const { name: k, id: _, ...w } = o;
      return w;
    });
    return (k, _) => (g(), x("div", a$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: q(T(ut))
      }, A(e.label), 11, n$)) : E("", !0),
      d("div", o$, [
        d("input", bt(y.value, {
          id: l.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(tt), v.value ? T(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: h.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: m,
          onChange: b,
          onBlur: p
        }), null, 16, s$),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (g(), x("svg", r$, [..._[2] || (_[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (g(), x("svg", l$, [..._[1] || (_[1] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            }, null, -1),
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, null, -1)
          ])]))
        ], 8, i$)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, c$)) : E("", !0)
    ]));
  }
}), u$ = { class: "font-sans" }, h$ = ["for"], f$ = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], g$ = ["id"], m$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-textarea-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C({
      get: () => a.modelValue,
      set: (r) => n("update:modelValue", r)
    });
    return (r, c) => (g(), x("div", u$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: q(T(ut))
      }, A(e.label), 11, h$)) : E("", !0),
      Je(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: q([T(H0), e.invalid ? T(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, f$), [
        [Pt, l.value]
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, g$)) : E("", !0)
    ]));
  }
}), p$ = { class: "font-sans" }, v$ = ["for"], b$ = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], y$ = ["for"], x$ = ["title"], k$ = ["aria-label"], _$ = {
  key: 2,
  class: "space-y-3"
}, w$ = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], C$ = ["for"], $$ = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, S$ = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, M$ = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, D$ = { class: "flex items-start gap-2" }, A$ = { class: "min-w-0 flex-1 space-y-2" }, T$ = { class: "flex items-center gap-2" }, B$ = ["title"], L$ = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, R$ = ["aria-label", "onClick"], P$ = ["id"], I$ = /* @__PURE__ */ fe({
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
    clearAriaLabel: { default: "Quitar archivo" },
    multiple: { type: Boolean, default: !1 },
    maxFiles: { default: 50 },
    showDescriptions: { type: Boolean, default: !1 },
    descriptionLabel: { default: "Descripción" },
    descriptionPlaceholder: { default: "Ingresa una descripción" },
    removeFileAriaLabel: { default: "Quitar archivo" },
    filesCountLabel: {},
    submitted: { type: Boolean, default: !1 },
    descriptionErrorText: { default: "" },
    requireDescriptions: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-input-file-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = ne(null), r = C(
      () => a.multiple ? null : a.modelValue
    ), c = C(() => {
      if (!a.multiple) return [];
      const M = a.modelValue;
      return Array.isArray(M) ? M : [];
    }), u = C(
      () => r.value?.name ?? a.placeholder
    ), f = C(
      () => a.multiple && c.value.length >= a.maxFiles
    ), h = C(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function v(M) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && M.description.trim() === "";
    }
    function m(M) {
      return M < 1024 ? `${M} B` : M < 1024 * 1024 ? `${(M / 1024).toFixed(1)} KB` : `${(M / (1024 * 1024)).toFixed(1)} MB`;
    }
    function b(M) {
      return {
        id: `file-${Ke()}`,
        file: M,
        description: ""
      };
    }
    function p(M, F) {
      return M.some(
        (z) => z.file.name === F.name && z.file.size === F.size && z.file.lastModified === F.lastModified
      );
    }
    function y() {
      l.value && (l.value.value = "");
    }
    function k(M) {
      const z = M.target.files?.[0] ?? null;
      n("update:modelValue", z);
    }
    function _(M) {
      const F = M.target, z = Array.from(F.files ?? []);
      if (z.length === 0) return;
      const W = [...c.value];
      for (const S of z) {
        if (W.length >= a.maxFiles) break;
        p(W, S) || W.push(b(S));
      }
      n("update:modelValue", W), y();
    }
    function w() {
      n("update:modelValue", null), y();
    }
    function $(M) {
      n(
        "update:modelValue",
        c.value.filter((F) => F.id !== M)
      );
    }
    function D(M, F) {
      n(
        "update:modelValue",
        c.value.map(
          (z) => z.id === M ? { ...z, description: F } : z
        )
      );
    }
    return (M, F) => (g(), x("div", p$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: q(T(ut))
      }, A(e.label), 11, v$)) : E("", !0),
      e.multiple ? (g(), x("div", _$, [
        d("div", {
          class: q([
            T(tt),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? T(Dt) : "",
            e.disabled ? "pointer-events-none" : ""
          ])
        }, [
          d("input", {
            id: s.value,
            ref_key: "fileInputRef",
            ref: l,
            type: "file",
            multiple: "",
            class: "sr-only focus:outline-none focus:ring-0",
            name: e.name,
            accept: e.accept,
            disabled: e.disabled || f.value,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0,
            onChange: _
          }, null, 40, w$),
          d("label", {
            for: s.value,
            class: q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || f.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            N(T(mo), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            De(" " + A(e.chooseLabel), 1)
          ], 10, C$),
          d("span", $$, A(h.value), 1),
          e.filesCountLabel ? (g(), x("span", S$, A(e.filesCountLabel), 1)) : E("", !0)
        ], 2),
        c.value.length > 0 ? (g(), x("ul", M$, [
          (g(!0), x(he, null, pe(c.value, (z) => (g(), x("li", {
            key: z.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", D$, [
              N(T(pp), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", A$, [
                d("div", T$, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: z.file.name
                  }, A(z.file.name), 9, B$),
                  d("span", L$, A(m(z.file.size)), 1),
                  e.disabled ? E("", !0) : (g(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (W) => $(z.id)
                  }, [
                    N(T(po), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, R$))
                ]),
                e.showDescriptions ? (g(), te(ql, {
                  key: 0,
                  "model-value": z.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: v(z),
                  "error-text": v(z) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (W) => D(z.id, W)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : E("", !0)
              ])
            ])
          ]))), 128))
        ])) : E("", !0)
      ])) : (g(), x("div", {
        key: 1,
        class: q([
          T(tt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(Dt) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        d("input", {
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
          onChange: k
        }, null, 40, b$),
        d("label", {
          for: s.value,
          class: q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(T(mo), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          De(" " + A(e.chooseLabel), 1)
        ], 10, y$),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, x$),
        r.value && !e.disabled ? (g(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: w
        }, [
          N(T(po), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, k$)) : E("", !0)
      ], 2)),
      e.errorText ? (g(), x("p", {
        key: 3,
        id: i.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, P$)) : E("", !0)
    ]));
  }
}), E$ = ["for"], F$ = { class: "flex w-full min-w-0 items-center gap-3" }, O$ = ["for", "aria-label"], V$ = ["src"], N$ = ["id", "accept", "disabled"], z$ = ["id", "value", "placeholder", "disabled"], j$ = /* @__PURE__ */ fe({
  name: "ImageUploadCircle",
  inheritAttrs: !1,
  __name: "ImageUploadCircle",
  props: {
    modelValue: { default: "" },
    label: {},
    id: {},
    accept: { default: ".png,.jpg,.jpeg,.gif,.webp,.svg,image/*" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    showUrlInput: { type: Boolean, default: !0 },
    urlPlaceholder: {},
    uploadAriaLabel: {},
    size: { default: "md" },
    urlInputClass: {}
  },
  emits: ["update:modelValue", "select"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = ne(!1), s = ne(null), i = `kiut-image-upload-circle-${Ke()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-url`), c = C(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), u = C(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), f = C(() => !a.disabled && !a.loading);
    Te(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function h(m) {
      const b = m.target, p = b.files?.[0];
      p && n("select", p), b.value = "";
    }
    function v(m) {
      n("update:modelValue", m.target.value);
    }
    return (m, b) => (g(), x("div", bt({ class: "font-sans flex w-full flex-col gap-2" }, m.$attrs), [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: q(T(ut))
      }, A(e.label), 11, E$)) : E("", !0),
      d("div", F$, [
        d("label", {
          for: l.value,
          class: q(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            f.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (g(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: b[0] || (b[0] = (p) => o.value = !0)
          }, null, 40, V$)) : e.loading ? (g(), te(T(hp), {
            key: 1,
            class: q([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (g(), te(T(mo), {
            key: 2,
            class: q([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, O$),
        d("input", {
          id: l.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: h
        }, null, 40, N$),
        e.showUrlInput ? (g(), x("div", {
          key: 0,
          class: q(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          d("input", {
            id: r.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: q([T(tt), "w-full min-w-0"]),
            onInput: v
          }, null, 42, z$)
        ], 2)) : E("", !0)
      ])
    ], 16));
  }
}), H$ = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, W$ = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, K$ = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, U$ = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, Y$ = {
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
}, q$ = {
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
}, X$ = [
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
function G$(e = "en") {
  return H$[e];
}
function Z$(e = "en") {
  return W$[e];
}
function Xl(e = "en") {
  return X$.map((t) => ({ id: t, label: q$[e][t] }));
}
function Q$(e = "en") {
  return "Presets";
}
Xl("es");
function ot(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function st(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function Ve(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function _t(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Da(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function J$(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Fa(e, t) {
  return J$(e, -t);
}
function e4(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Gl(e, t = /* @__PURE__ */ new Date()) {
  const a = Ve(t);
  switch (e) {
    case "today":
      return { start: a, end: a };
    case "yesterday": {
      const n = Fa(a, 1);
      return { start: n, end: n };
    }
    case "last7":
      return { start: Fa(a, 6), end: a };
    case "last14":
      return { start: Fa(a, 13), end: a };
    case "last30":
      return { start: Fa(a, 29), end: a };
    case "last90":
      return { start: Fa(a, 89), end: a };
    case "thisMonth":
      return { start: _t(a), end: a };
    case "lastMonth": {
      const n = _t(Da(a, -1));
      return { start: n, end: e4(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function Zl(e, t, a) {
  let n = Ve(e.start), o = Ve(e.end);
  if (t) {
    const s = Ve(ot(t));
    Ht(n, s) && (n = s), Ht(o, s) && (o = s);
  }
  if (a) {
    const s = Ve(ot(a));
    $n(n, s) && (n = s), $n(o, s) && (o = s);
  }
  return $n(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function t4(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = Zl(Gl(t, a), n, o);
  return st(s.start) === e.start && st(s.end) === e.end;
}
function an(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < n ? -1 : a > n ? 1 : 0;
}
function vt(e, t) {
  return an(e, t) === 0;
}
function Ht(e, t) {
  return an(e, t) < 0;
}
function $n(e, t) {
  return an(e, t) > 0;
}
function Ql(e, t) {
  return an(e, t) >= 0;
}
function Jl(e, t) {
  return an(e, t) <= 0;
}
function er(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function a4(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function _a(e) {
  if (!e?.trim()) return null;
  const t = K$.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), l = new Date(a, n - 1, o, s, i);
  return Number.isNaN(l.getTime()) ? null : l;
}
function n4(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function o4(e) {
  const t = _a(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function s4(e, t = "es") {
  const a = _a(e);
  if (!a) return "";
  const n = new Intl.DateTimeFormat(t, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(a), o = new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  }).format(a);
  return `${n} · ${o}`;
}
function Mi(e, t) {
  return e.getTime() < t.getTime();
}
function Di(e, t) {
  return e.getTime() > t.getTime();
}
function In(e, t = "en") {
  return `${U$[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function jt(e, t = "en") {
  return `${Y$[t][e.getMonth()]} ${e.getFullYear()}`;
}
const i4 = ["name", "value"], l4 = { class: "flex flex-row gap-3 items-center" }, r4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, c4 = ["for"], d4 = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], u4 = ["aria-label", "onKeydown"], h4 = { class: "p-3" }, f4 = { class: "mb-4 flex items-center justify-between gap-2" }, g4 = ["aria-label"], m4 = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, p4 = ["aria-label"], v4 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, b4 = { class: "grid grid-cols-7 gap-y-2" }, y4 = ["disabled", "onClick"], x4 = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, k4 = { class: "relative" }, _4 = ["value", "disabled", "min", "max", "step", "aria-label"], w4 = /* @__PURE__ */ fe({
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
    placeholder: { default: "Seleccionar…" },
    locale: { default: "es" },
    min: {},
    max: {},
    step: { default: 60 },
    panelAlign: { default: "start" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-input-datetime-${Ke()}`, s = `${o}-label`, i = C(() => a.id ?? `${o}-btn`), l = `${o}-panel`, r = `${o}-err`, c = ne(null), u = ne(null), f = ne(null), h = ne(!1), v = ne(_t(/* @__PURE__ */ new Date())), m = ne(null), b = ne("00:00"), p = C(() => !!a.modelValue), y = C(() => Z$(a.locale)), k = C(() => a4(v.value)), _ = C(() => a.placeholder), w = C(() => a.modelValue ? s4(a.modelValue, a.locale) : a.placeholder), $ = C(() => {
      const K = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${K}` : `left-0 right-auto ${K}`;
    }), D = C(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), M = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), F = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), z = C(
      () => a.locale === "es" ? "Hora" : "Time"
    ), W = C(() => _a(a.min)), S = C(() => _a(a.max)), L = C(() => {
      if (!(!m.value || !W.value) && vt(m.value, W.value))
        return `${String(W.value.getHours()).padStart(2, "0")}:${String(W.value.getMinutes()).padStart(2, "0")}`;
    }), B = C(() => {
      if (!(!m.value || !S.value) && vt(m.value, S.value))
        return `${String(S.value.getHours()).padStart(2, "0")}:${String(S.value.getMinutes()).padStart(2, "0")}`;
    });
    function j(K, ie) {
      return K.getMonth() === ie.getMonth() && K.getFullYear() === ie.getFullYear();
    }
    function H(K) {
      const ie = Ve(K);
      return !!(W.value && Ht(ie, Ve(W.value)) || S.value && $n(ie, Ve(S.value)));
    }
    function Q(K) {
      const ie = j(K, v.value), de = H(K), ee = m.value ? vt(K, m.value) : !1;
      if (de)
        return "rounded-lg text-[#61616b] opacity-40";
      let G = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return ee && (G = "rounded-lg bg-[#895af6] font-semibold text-white"), ie || (G = `${G} opacity-30`), G;
    }
    function re() {
      const K = _a(a.modelValue);
      if (K) {
        m.value = Ve(K), b.value = o4(a.modelValue), v.value = _t(K);
        return;
      }
      m.value = null, b.value = "00:00", v.value = _t(/* @__PURE__ */ new Date());
    }
    function ue(K) {
      if (!m.value) return K;
      let ie = _a(
        `${st(m.value)}T${K}`
      );
      return ie ? (W.value && vt(m.value, W.value) && Mi(ie, W.value) && (ie = W.value), S.value && vt(m.value, S.value) && Di(ie, S.value) && (ie = S.value), `${String(ie.getHours()).padStart(2, "0")}:${String(ie.getMinutes()).padStart(2, "0")}`) : K;
    }
    function X() {
      if (!m.value) {
        n("update:modelValue", null);
        return;
      }
      const K = ue(b.value);
      b.value = K;
      const ie = new Date(
        m.value.getFullYear(),
        m.value.getMonth(),
        m.value.getDate(),
        Number(K.slice(0, 2)),
        Number(K.slice(3, 5))
      ), de = n4(ie);
      W.value && Mi(ie, W.value) || S.value && Di(ie, S.value) || n("update:modelValue", de);
    }
    function oe(K) {
      H(K) || (m.value = Ve(K), b.value = ue(b.value), X());
    }
    function R(K) {
      const ie = K.target.value;
      ie && (b.value = ie, X());
    }
    function U(K) {
      v.value = Da(v.value, K);
    }
    function Y() {
      h.value = !1;
    }
    function V() {
      a.disabled || (re(), h.value = !0, We(() => f.value?.focus()));
    }
    function le(K) {
      if (K.stopPropagation(), !a.disabled) {
        if (h.value) {
          Y();
          return;
        }
        V();
      }
    }
    function ce(K) {
      a.disabled || (K.key === "ArrowDown" || K.key === "Enter" || K.key === " ") && (K.preventDefault(), h.value || V());
    }
    function xe(K) {
      if (!h.value) return;
      const ie = c.value;
      ie && !ie.contains(K.target) && Y();
    }
    return Te(
      () => a.modelValue,
      () => {
        h.value || re();
      }
    ), et(() => {
      re(), document.addEventListener("click", xe);
    }), at(() => {
      document.removeEventListener("click", xe);
    }), (K, ie) => (g(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (g(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, i4)) : E("", !0),
      d("div", l4, [
        K.$slots.icon ? (g(), x("span", r4, [
          ke(K.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: q(T(ut))
        }, A(e.label), 11, c4)) : E("", !0)
      ]),
      d("button", {
        id: i.value,
        ref_key: "buttonRef",
        ref: u,
        type: "button",
        disabled: e.disabled,
        class: q([
          T(tt),
          "flex w-full items-center gap-2 text-left",
          e.invalid ? T(Dt) : "",
          h.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "dialog",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : _.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: le,
        onKeydown: ce
      }, [
        N(T(No), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            p.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(w.value), 3)
      ], 42, d4),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : E("", !0),
      Je(d("div", {
        ref_key: "panelRef",
        ref: f,
        id: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": D.value,
        class: q([
          $.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Be(Y, ["stop"]), ["escape"])
      }, [
        d("div", h4, [
          d("div", f4, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": M.value,
              onClick: ie[0] || (ie[0] = Be((de) => U(-1), ["stop"]))
            }, [
              N(T(zo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, g4),
            d("span", m4, A(T(jt)(v.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": F.value,
              onClick: ie[1] || (ie[1] = Be((de) => U(1), ["stop"]))
            }, [
              N(T(jo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, p4)
          ]),
          d("div", v4, [
            (g(!0), x(he, null, pe(y.value, (de) => (g(), x("span", { key: de }, A(de), 1))), 128))
          ]),
          d("div", b4, [
            (g(!0), x(he, null, pe(k.value, (de) => (g(), x("button", {
              key: T(st)(de),
              type: "button",
              disabled: H(de),
              class: q(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", Q(de)]),
              onClick: Be((ee) => oe(de), ["stop"])
            }, A(de.getDate()), 11, y4))), 128))
          ])
        ]),
        d("div", x4, [
          d("div", k4, [
            N(T(Al), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: b.value,
              type: "time",
              autocomplete: "off",
              class: q([T(tt), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !m.value,
              min: L.value,
              max: B.value,
              step: e.step,
              "aria-label": z.value,
              onInput: R,
              onClick: ie[2] || (ie[2] = Be(() => {
              }, ["stop"]))
            }, null, 42, _4)
          ])
        ])
      ], 42, u4), [
        [Kt, h.value]
      ])
    ], 512));
  }
}), C4 = { class: "font-sans" }, $4 = { class: "flex flex-row gap-3 items-center" }, S4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, M4 = ["for"], D4 = { class: "relative" }, A4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], T4 = ["id"], B4 = /* @__PURE__ */ fe({
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
      const h = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(f.trim());
      if (!h) return null;
      const v = Number(h[1]), m = Number(h[2]);
      return !Number.isInteger(v) || !Number.isInteger(m) || v < 0 || v > 23 || m < 0 || m > 59 ? null : `${String(v).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
    function n(f) {
      return f === "" ? null : a(f);
    }
    const o = e, s = t, i = `kiut-input-time-${Ke()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(f) {
      const h = f.target.value;
      s("update:modelValue", n(h));
    }
    return (f, h) => (g(), x("div", C4, [
      d("div", $4, [
        f.$slots.icon ? (g(), x("span", S4, [
          ke(f.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          for: l.value,
          class: q(T(ut))
        }, A(e.label), 11, M4)) : E("", !0)
      ]),
      d("div", D4, [
        N(T(Al), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: q([
            T(tt),
            "pl-10",
            e.invalid ? T(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: u
        }, null, 42, A4)
      ]),
      e.errorText ? (g(), x("p", {
        key: 0,
        id: r.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, T4)) : E("", !0)
    ]));
  }
}), L4 = { class: "font-sans" }, R4 = ["for"], P4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, I4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], E4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, F4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, O4 = { class: "min-w-0 text-left leading-snug" }, V4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, N4 = { class: "min-w-0 text-right leading-snug" }, z4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, j4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, H4 = ["id"], W4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-range-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      const v = [];
      return a.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: v, max: m, modelValue: b } = a;
      if (m === v) return 0;
      const p = (b - v) / (m - v);
      return Math.min(100, Math.max(0, p * 100));
    }), f = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function h(v) {
      const m = Number(v.target.value);
      n("update:modelValue", Number.isNaN(m) ? a.min : m);
    }
    return (v, m) => (g(), x("div", L4, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: q(T(ut))
      }, A(e.label), 11, R4)) : E("", !0),
      d("div", {
        class: q(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (g(), x("p", P4, A(e.captionMax), 1)) : E("", !0),
        d("div", {
          class: q(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: _e(f.value)
        }, [
          d("input", {
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
            class: q([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: h
          }, null, 42, I4)
        ], 6),
        e.orientation === "horizontal" && r.value ? (g(), x("p", E4, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (g(), x("div", F4, [
          d("span", O4, A(e.captionMin), 1),
          d("span", V4, A(e.caption), 1),
          d("span", N4, A(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (g(), x("p", z4, A(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (g(), x("p", j4, A(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, H4)) : E("", !0)
    ]));
  }
}), K4 = /* @__PURE__ */ ve(W4, [["__scopeId", "data-v-ce7263e4"]]), U4 = { class: "font-sans" }, Y4 = ["for"], q4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], X4 = ["id"], G4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-number-${Ke()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = C(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(u) {
      const f = u.target.value;
      if (f === "") {
        n("update:modelValue", null);
        return;
      }
      const h = Number(f);
      n("update:modelValue", Number.isNaN(h) ? null : h);
    }
    return (u, f) => (g(), x("div", U4, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: q(T(ut))
      }, A(e.label), 11, Y4)) : E("", !0),
      d("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: q([
          T(tt),
          e.invalid ? T(Dt) : "",
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
      }, null, 42, q4),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, X4)) : E("", !0)
    ]));
  }
}), Z4 = { class: "font-sans" }, Q4 = ["for"], J4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], eS = ["disabled"], tS = ["id"], aS = "#3b82f6", nS = "#aabbcc", oS = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", sS = /* @__PURE__ */ fe({
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
    function a(m) {
      const b = m.trim(), p = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (p) return `#${p[1].toLowerCase()}`;
      const y = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (y) {
        const [k, _, w] = y[1].split("");
        return `#${k}${k}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function n(m) {
      return a(m) ?? aS;
    }
    const o = e, s = t, i = `kiut-input-color-${Ke()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n(o.modelValue)), u = ne(c.value), f = ne(!1);
    Te(c, (m) => {
      f.value || (u.value = m);
    });
    function h(m) {
      const b = m.target, p = a(b.value);
      p && s("update:modelValue", p);
    }
    function v() {
      f.value = !1;
      const m = a(u.value);
      m ? (u.value = m, s("update:modelValue", m)) : u.value = c.value;
    }
    return Te(u, (m) => {
      if (!f.value) return;
      const b = a(m);
      b && s("update:modelValue", b);
    }), (m, b) => (g(), x("div", Z4, [
      e.label ? (g(), x("label", {
        key: 0,
        for: l.value,
        class: q(T(ut))
      }, A(e.label), 11, Q4)) : E("", !0),
      d("div", {
        class: q([
          oS,
          e.invalid ? T(Dt) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        d("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: h
        }, null, 40, J4),
        e.showHexInput ? Je((g(), x("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (p) => u.value = p),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: nS,
          onFocus: b[1] || (b[1] = (p) => f.value = !0),
          onBlur: v
        }, null, 40, eS)), [
          [Pt, u.value]
        ]) : E("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: r.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, tS)) : E("", !0)
    ]));
  }
}), tr = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, ar = [
  {
    id: "smileys",
    emojis: [
      { char: "😀", terms: ["feliz", "happy", "sonrisa", "grin"] },
      { char: "😃", terms: ["feliz", "happy", "ojos", "smile"] },
      { char: "😄", terms: ["feliz", "happy", "sonrisa"] },
      { char: "😁", terms: ["feliz", "beam", "sonrisa"] },
      { char: "😆", terms: ["risa", "laugh", "squint"] },
      { char: "😅", terms: ["risa", "sudor", "nervioso"] },
      { char: "🤣", terms: ["risa", "rofl", "laugh"] },
      { char: "😂", terms: ["risa", "llorar", "joy", "tears"] },
      { char: "🙂", terms: ["sonrisa", "smile", "slight"] },
      { char: "🙃", terms: ["invertido", "upsidedown"] },
      { char: "😉", terms: ["guiño", "wink"] },
      { char: "😊", terms: ["sonrisa", "blush", "timido"] },
      { char: "😇", terms: ["angel", "halo", "inocente", "santo"] },
      { char: "🥰", terms: ["amor", "love", "corazon"] },
      { char: "😍", terms: ["amor", "heart eyes", "corazon"] },
      { char: "🤩", terms: ["estrella", "star", "wow"] },
      { char: "😘", terms: ["beso", "kiss"] },
      { char: "☺️", terms: ["sonrisa", "smile"] },
      { char: "😚", terms: ["beso", "kiss"] },
      { char: "🥲", terms: ["sonrisa", "lagrima", "gratitud"] },
      { char: "😋", terms: ["rico", "yummy", "delicioso"] },
      { char: "😛", terms: ["lengua", "tongue", "playful"] },
      { char: "😜", terms: ["lengua", "wink", "travieso"] },
      { char: "🤪", terms: ["loco", "zany", "divertido"] },
      { char: "🤗", terms: ["abrazo", "hug"] },
      { char: "🤭", terms: ["ups", "oops", "timido"] },
      { char: "🤫", terms: ["shh", "silencio", "secret"] },
      { char: "🤔", terms: ["pensar", "think", "duda"] },
      { char: "🤐", terms: ["silencio", "zip", "boca"] },
      { char: "😐", terms: ["neutral", "serio"] },
      { char: "😶", terms: ["sin boca", "silencio"] },
      { char: "😌", terms: ["aliviado", "relieved", "calma"] },
      { char: "😴", terms: ["dormir", "sleep", "sueno"] },
      { char: "😷", terms: ["mask", "mascarilla", "enfermo"] },
      { char: "🤒", terms: ["enfermo", "sick", "termometro"] },
      { char: "🤕", terms: ["herido", "injured", "vendaje"] },
      { char: "🥳", terms: ["fiesta", "party", "celebracion"] },
      { char: "🥸", terms: ["disfraz", "disguise"] },
      { char: "😎", terms: ["cool", "gafas", "sunglasses"] },
      { char: "🤓", terms: ["nerd", "estudioso"] },
      { char: "😮", terms: ["sorpresa", "wow", "open mouth"] },
      { char: "😯", terms: ["sorpresa", "hushed"] },
      { char: "😲", terms: ["asombrado", "astonished"] },
      { char: "😳", terms: ["sonrojo", "flushed", "verguenza"] },
      { char: "🥺", terms: ["por favor", "please", "puppy"] },
      { char: "😢", terms: ["triste", "sad", "cry"] },
      { char: "😭", terms: ["llorar", "cry", "sad"] },
      { char: "😱", terms: ["susto", "scream", "shock"] },
      { char: "🫡", terms: ["saludo", "salute", "respeto"] }
    ]
  },
  {
    id: "gestures",
    emojis: [
      { char: "👍", terms: ["ok", "bien", "thumbs up", "like"] },
      { char: "👏", terms: ["aplauso", "clap", "bravo"] },
      { char: "🙏", terms: ["gracias", "thanks", "please", "rezo"] },
      { char: "🙌", terms: ["celebrar", "raise hands", "hurra"] },
      { char: "👌", terms: ["ok", "perfecto", "bien"] },
      { char: "✌️", terms: ["paz", "peace", "victoria"] },
      { char: "🤝", terms: ["apretón", "handshake", "acuerdo"] },
      { char: "💪", terms: ["fuerte", "strong", "musculo"] },
      { char: "🤞", terms: ["suerte", "fingers crossed", "cruzar"] },
      { char: "👋", terms: ["hola", "wave", "adios", "saludo"] },
      { char: "🫶", terms: ["corazon", "heart hands", "amor"] },
      { char: "👐", terms: ["manos", "open hands", "abrazo"] },
      { char: "👇", terms: ["abajo", "down", "señalar"] },
      { char: "👆", terms: ["arriba", "up", "señalar"] },
      { char: "☝️", terms: ["arriba", "up", "uno"] },
      { char: "🤙", terms: ["llamar", "call", "shaka"] },
      { char: "✋", terms: ["alto", "stop", "mano"] },
      { char: "🖐️", terms: ["mano", "hi", "cinco"] }
    ]
  },
  {
    id: "symbols",
    emojis: [
      { char: "❤️", terms: ["corazon", "heart", "amor", "love"] },
      { char: "🧡", terms: ["corazon", "naranja", "orange"] },
      { char: "💛", terms: ["corazon", "amarillo", "yellow"] },
      { char: "💚", terms: ["corazon", "verde", "green"] },
      { char: "💙", terms: ["corazon", "azul", "blue"] },
      { char: "💜", terms: ["corazon", "morado", "purple"] },
      { char: "🤍", terms: ["corazon", "blanco", "white"] },
      { char: "💕", terms: ["corazones", "hearts", "amor"] },
      { char: "💞", terms: ["corazones", "revolving", "amor"] },
      { char: "💓", terms: ["corazon", "latido", "beating"] },
      { char: "💗", terms: ["corazon", "creciendo", "growing"] },
      { char: "💖", terms: ["corazon", "brillo", "sparkling"] },
      { char: "💘", terms: ["corazon", "flecha", "cupid"] },
      { char: "💝", terms: ["corazon", "regalo", "gift"] },
      { char: "⭐", terms: ["estrella", "star"] },
      { char: "🌟", terms: ["estrella", "brillo", "glow"] },
      { char: "✨", terms: ["brillo", "sparkles", "magic"] },
      { char: "⚡", terms: ["rayo", "lightning", "energia"] },
      { char: "✅", terms: ["check", "ok", "listo", "done"] },
      { char: "✔️", terms: ["check", "ok", "marcar"] },
      { char: "☑️", terms: ["check", "casilla", "box"] },
      { char: "💯", terms: ["cien", "100", "perfecto"] },
      { char: "ℹ️", terms: ["info", "informacion"] },
      { char: "❓", terms: ["pregunta", "question"] },
      { char: "❗", terms: ["importante", "exclamation"] },
      { char: "➕", terms: ["mas", "plus", "sumar"] },
      { char: "➖", terms: ["menos", "minus"] }
    ]
  },
  {
    id: "travel",
    emojis: [
      { char: "✈️", terms: ["avion", "plane", "vuelo", "flight"] },
      { char: "🛫", terms: ["despegue", "departure", "vuelo"] },
      { char: "🛬", terms: ["aterrizaje", "arrival", "vuelo"] },
      { char: "🧳", terms: ["maleta", "luggage", "equipaje"] },
      { char: "🛄", terms: ["equipaje", "baggage", "reclamar"] },
      { char: "🎫", terms: ["boleto", "ticket", "entrada"] },
      { char: "🗺️", terms: ["mapa", "map", "ruta"] },
      { char: "🌍", terms: ["mundo", "world", "globo", "europa"] },
      { char: "🌎", terms: ["mundo", "americas", "globo"] },
      { char: "🌏", terms: ["mundo", "asia", "globo"] },
      { char: "🏖️", terms: ["playa", "beach", "vacaciones"] },
      { char: "🏝️", terms: ["isla", "island", "vacaciones"] },
      { char: "🌅", terms: ["amanecer", "sunrise", "sol"] },
      { char: "🌄", terms: ["montaña", "sunrise", "amanecer"] },
      { char: "🚗", terms: ["auto", "car", "coche"] },
      { char: "🚕", terms: ["taxi", "cab"] },
      { char: "🚌", terms: ["bus", "autobus"] },
      { char: "🏨", terms: ["hotel", "hospedaje"] },
      { char: "🛩️", terms: ["avion", "small plane"] },
      { char: "🚂", terms: ["tren", "train"] },
      { char: "🚆", terms: ["tren", "tram", "metro"] },
      { char: "🚢", terms: ["barco", "ship", "crucero"] },
      { char: "⛵", terms: ["velero", "sailboat", "barco"] },
      { char: "🗼", terms: ["torre", "tower", "landmark"] },
      { char: "🏛️", terms: ["monumento", "classical", "edificio"] }
    ]
  },
  {
    id: "objects",
    emojis: [
      { char: "📱", terms: ["telefono", "phone", "mobile", "celular"] },
      { char: "💻", terms: ["laptop", "computadora", "computer"] },
      { char: "⌚", terms: ["reloj", "watch", "hora"] },
      { char: "📷", terms: ["camara", "camera", "foto"] },
      { char: "🎁", terms: ["regalo", "gift", "present"] },
      { char: "🎉", terms: ["fiesta", "party", "celebracion"] },
      { char: "🎊", terms: ["confeti", "confetti", "fiesta"] },
      { char: "🎈", terms: ["globo", "balloon", "fiesta"] },
      { char: "📅", terms: ["calendario", "calendar", "fecha"] },
      { char: "📆", terms: ["calendario", "date", "fecha"] },
      { char: "✉️", terms: ["correo", "email", "carta", "mail"] },
      { char: "📧", terms: ["email", "correo"] },
      { char: "📝", terms: ["nota", "memo", "escribir"] },
      { char: "📋", terms: ["clipboard", "lista", "checklist"] },
      { char: "📌", terms: ["pin", "chincheta", "fijar"] },
      { char: "📎", terms: ["clip", "adjunto", "paperclip"] },
      { char: "🔗", terms: ["link", "enlace", "url"] },
      { char: "🔑", terms: ["llave", "key", "acceso"] },
      { char: "💡", terms: ["idea", "bombilla", "light"] },
      { char: "🔔", terms: ["campana", "bell", "notificacion"] },
      { char: "📞", terms: ["telefono", "call", "llamar"] },
      { char: "☎️", terms: ["telefono", "phone"] },
      { char: "🛍️", terms: ["compras", "shopping", "bolsa"] },
      { char: "🧾", terms: ["recibo", "receipt", "factura"] }
    ]
  }
];
function iS(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function lS(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (l) => s || iS(l, n)
    ).map((l) => l.char);
    return {
      id: o.id,
      label: t[o.id],
      emojis: i
    };
  }).filter((o) => o.emojis.length > 0) : e.map((o) => ({
    id: o.id,
    label: t[o.id],
    emojis: o.emojis.map((s) => s.char)
  }));
}
function MM(e) {
  const t = {
    ...tr,
    ...e
  };
  return ar.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function rS(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function cS(e, t) {
  return `${e}${t}`;
}
const dS = ["disabled", "aria-expanded", "aria-label"], uS = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, hS = {
  key: 0,
  class: "truncate text-sm"
}, fS = ["aria-label"], gS = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, mS = ["disabled", "placeholder", "aria-label"], pS = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, vS = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, bS = { class: "grid grid-cols-8 gap-0.5" }, yS = ["disabled", "aria-label", "onClick"], xS = { class: "text-[1.35rem] leading-none" }, kS = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, _S = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, wS = /* @__PURE__ */ fe({
  name: "EmojiPicker",
  __name: "EmojiPicker",
  props: {
    draft: { default: "" },
    categories: {},
    categoryLabels: {},
    triggerLabel: {},
    searchPlaceholder: { default: "Search emoji…" },
    emptySearchText: { default: "No emojis match your search." },
    hint: {},
    disabled: { type: Boolean },
    ariaLabel: { default: "Emoji picker" },
    ariaLabelTrigger: {}
  },
  emits: ["update:draft", "select", "open", "close"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-emoji-picker-${Ke()}`, s = `${o}-btn`, i = `${o}-panel`, l = ne(null), r = ne(null), c = ne(null), u = ne(null), f = ne(!1), h = ne(""), v = ne({}), m = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), b = C(() => ({
      ...tr,
      ...a.categoryLabels
    })), p = C(() => new Set(rS(a.draft))), y = C(() => {
      if (a.categories?.length) {
        const B = h.value.trim().toLowerCase();
        return B ? a.categories.map((j) => ({
          ...j,
          emojis: j.emojis.filter((H) => H.includes(B) || j.label.toLowerCase().includes(B) ? !0 : j.id.toLowerCase().includes(B))
        })).filter((j) => j.emojis.length > 0) : a.categories;
      }
      return lS(
        ar,
        b.value,
        h.value
      );
    });
    function k() {
      const B = r.value;
      if (!B) return;
      const j = B.getBoundingClientRect(), H = 320, Q = 8, re = 8;
      let ue = j.right - H;
      ue < re && (ue = j.left), ue + H > window.innerWidth - re && (ue = Math.max(re, window.innerWidth - H - re));
      const X = Math.max(160, j.top - Q - re);
      v.value = {
        bottom: `${window.innerHeight - j.top + Q}px`,
        left: `${ue}px`,
        width: `${H}px`,
        maxHeight: `${X}px`
      };
    }
    function _(B) {
      const j = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return p.value.has(B) ? `${j} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : j;
    }
    function w(B) {
      if (a.disabled) return;
      const j = cS(a.draft ?? "", B);
      n("update:draft", j), n("select", B);
    }
    function $() {
      h.value = "", n("open"), We(() => {
        k(), u.value?.focus();
      });
    }
    function D() {
      f.value && (f.value = !1, h.value = "", n("close"), r.value?.focus());
    }
    function M() {
      if (!a.disabled) {
        if (f.value) {
          D();
          return;
        }
        f.value = !0, $();
      }
    }
    function F(B) {
      B.stopPropagation(), M();
    }
    function z(B) {
      if (!f.value) return;
      const j = B.target, H = l.value, Q = c.value;
      H && !H.contains(j) && (!Q || !Q.contains(j)) && D();
    }
    function W(B) {
      a.disabled || ((B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), f.value || (f.value = !0, $())), B.key === "Escape" && f.value && (B.preventDefault(), D()));
    }
    function S(B) {
      B.key === "Escape" && (B.preventDefault(), D());
    }
    function L() {
      f.value && k();
    }
    return et(() => {
      document.addEventListener("click", z), window.addEventListener("resize", L), window.addEventListener("scroll", L, !0);
    }), at(() => {
      document.removeEventListener("click", z), window.removeEventListener("resize", L), window.removeEventListener("scroll", L, !0);
    }), (B, j) => (g(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: r,
        id: s,
        type: "button",
        disabled: e.disabled,
        class: q([
          T(tt),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          f.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": f.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": m.value,
        onClick: F,
        onKeydown: W
      }, [
        d("span", uS, [
          ke(B.$slots, "icon", {}, () => [
            N(T(bp), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (g(), x("span", hS, A(e.triggerLabel), 1)) : E("", !0),
        e.triggerLabel ? (g(), te(T(na), {
          key: 1,
          class: q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", f.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : E("", !0)
      ], 42, dS),
      (g(), te(Wt, { to: "body" }, [
        Je(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: _e(v.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: j[2] || (j[2] = Be(() => {
          }, ["stop"])),
          onKeydown: Be(S, ["stop"])
        }, [
          d("div", gS, [
            Je(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": j[0] || (j[0] = (H) => h.value = H),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: j[1] || (j[1] = Be(() => {
              }, ["stop"]))
            }, null, 8, mS), [
              [Pt, h.value]
            ])
          ]),
          d("div", pS, [
            y.value.length > 0 ? (g(!0), x(he, { key: 0 }, pe(y.value, (H) => (g(), x("section", {
              key: H.id
            }, [
              d("h3", vS, A(H.label), 1),
              d("div", bS, [
                (g(!0), x(he, null, pe(H.emojis, (Q) => (g(), x("button", {
                  key: `${H.id}-${Q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${Q} to input`,
                  class: q(_(Q)),
                  onClick: Be((re) => w(Q), ["stop"])
                }, [
                  d("span", xS, A(Q), 1)
                ], 10, yS))), 128))
              ])
            ]))), 128)) : (g(), x("p", kS, A(e.emptySearchText), 1))
          ]),
          e.hint ? (g(), x("p", _S, A(e.hint), 1)) : E("", !0)
        ], 44, fS), [
          [Kt, f.value]
        ])
      ]))
    ], 512));
  }
}), CS = /* @__PURE__ */ fe({
  name: "LanguageSelect",
  __name: "LanguageSelect",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar idioma…" },
    disabled: { type: Boolean },
    showOptionCheck: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar por nombre…" },
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: "Idioma" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = C(
      () => a.options.map((i) => ({
        value: i.value,
        label: i.label,
        disabled: i.disabled,
        leadingClass: i.flagClass
      }))
    );
    function s(i) {
      n("update:modelValue", i);
    }
    return (i, l) => (g(), te(Tt, {
      "model-value": e.modelValue,
      options: o.value,
      label: e.label,
      "aria-label-trigger": e.ariaLabelTrigger,
      placeholder: e.placeholder,
      disabled: e.disabled,
      "show-option-check": e.showOptionCheck,
      searchable: "",
      "search-placeholder": e.searchPlaceholder,
      "no-results-text": e.noResultsText,
      "list-section-label": e.listSectionLabel,
      "onUpdate:modelValue": s
    }, null, 8, ["model-value", "options", "label", "aria-label-trigger", "placeholder", "disabled", "show-option-check", "search-placeholder", "no-results-text", "list-section-label"]));
  }
}), $S = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, SS = { class: "relative" }, MS = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, DS = ["placeholder", "aria-label", "disabled"], AS = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, TS = ["aria-label"], BS = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, LS = ["aria-selected", "onClick", "onMouseenter"], RS = { class: "min-w-0 flex-1 truncate" }, PS = /* @__PURE__ */ fe({
  name: "LanguagePicker",
  __name: "LanguagePicker",
  props: {
    modelValue: {},
    options: {},
    disabled: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar por nombre…" },
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: "Idioma" },
    listMaxHeightClass: { default: "max-h-60" }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, i = `${`kiut-language-picker-${Ke()}`}-listbox`, l = ne(null), r = ne(null), c = ne(""), u = ne(0), f = C(() => n.options.filter((w) => !w.disabled)), h = C(() => {
      const w = c.value.trim().toLowerCase();
      return w ? f.value.filter(($) => $.label.toLowerCase().includes(w)) : f.value;
    });
    function v(w) {
      return `${w.value}-${w.label}`;
    }
    function m(w) {
      return n.modelValue === w.value;
    }
    function b(w, $) {
      const D = m(w), M = u.value === $;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        D ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !D && M ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function p() {
      u.value = Math.max(
        0,
        h.value.findIndex((w) => w.value === n.modelValue)
      );
    }
    function y(w) {
      w.disabled || o("update:modelValue", w.value);
    }
    function k(w) {
      const $ = h.value;
      if (w.key === "ArrowDown") {
        if (w.preventDefault(), $.length === 0) return;
        u.value = 0, r.value?.focus();
        return;
      }
      if (w.key === "ArrowUp") {
        if (w.preventDefault(), $.length === 0) return;
        u.value = $.length - 1, r.value?.focus();
        return;
      }
      if (w.key === "Enter") {
        w.preventDefault();
        const D = $[u.value];
        D && y(D);
      }
    }
    function _(w) {
      const $ = h.value;
      if ($.length !== 0) {
        if (w.key === "ArrowDown") {
          w.preventDefault(), u.value = Math.min(u.value + 1, $.length - 1);
          return;
        }
        if (w.key === "ArrowUp") {
          if (w.preventDefault(), u.value === 0) {
            l.value?.focus();
            return;
          }
          u.value = Math.max(u.value - 1, 0);
          return;
        }
        if (w.key === "Enter") {
          w.preventDefault();
          const D = $[u.value];
          D && y(D);
        }
      }
    }
    return Te(c, () => {
      u.value = 0;
    }), Te(
      () => n.modelValue,
      () => {
        p();
      },
      { immediate: !0 }
    ), t({
      focusSearch: () => l.value?.focus()
    }), (w, $) => (g(), x("div", {
      class: q(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", $S, [
        d("div", SS, [
          d("span", MS, [
            N(T(Ho), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Je(d("input", {
            ref_key: "searchInputRef",
            ref: l,
            "onUpdate:modelValue": $[0] || ($[0] = (D) => c.value = D),
            type: "search",
            class: q([T(tt), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: k
          }, null, 42, DS), [
            [Pt, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (g(), x("p", AS, A(e.listSectionLabel), 1)) : E("", !0),
      d("ul", {
        id: i,
        ref_key: "listRef",
        ref: r,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: q([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: _
      }, [
        h.value.length === 0 ? (g(), x("li", BS, A(e.noResultsText), 1)) : E("", !0),
        (g(!0), x(he, null, pe(h.value, (D, M) => (g(), x("li", {
          key: v(D),
          role: "option",
          "aria-selected": m(D),
          class: q(b(D, M)),
          onClick: (F) => y(D),
          onMouseenter: (F) => u.value = M
        }, [
          D.flagClass ? (g(), x("span", {
            key: 0,
            class: q([D.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : E("", !0),
          d("span", RS, A(D.label), 1)
        ], 42, LS))), 128))
      ], 42, TS)
    ], 2));
  }
}), IS = { class: "flex flex-row gap-3 items-center" }, ES = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, FS = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], OS = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, VS = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, NS = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, zS = { class: "truncate" }, jS = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, HS = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, WS = { class: "relative" }, KS = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, US = ["placeholder", "aria-label"], YS = ["aria-checked", "disabled"], qS = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, XS = ["aria-selected", "onClick", "onMouseenter"], GS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, ZS = { class: "min-w-0 flex-1" }, QS = /* @__PURE__ */ fe({
  name: "MultiSelect",
  __name: "MultiSelect",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar…" },
    disabled: { type: Boolean },
    searchable: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar…" },
    noResultsText: { default: "Sin resultados" },
    showSelectAll: { type: Boolean, default: !1 },
    selectAllLabel: { default: "Seleccionar todas" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-multiselect-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = ne(null), c = ne(null), u = ne(null), f = ne(null), h = ne(!1), v = ne(0), m = ne(""), b = C(() => a.options.filter((V) => !V.disabled)), p = C(() => {
      if (!a.searchable) return b.value;
      const V = m.value.trim().toLowerCase();
      return V ? b.value.filter(
        (le) => le.label.toLowerCase().includes(V)
      ) : b.value;
    }), y = C(() => new Set(a.modelValue ?? [])), k = C(
      () => b.value.filter((V) => y.value.has(V.value)).length
    ), _ = C(
      () => b.value.length > 0 && k.value === b.value.length
    ), w = C(
      () => k.value > 0 && !_.value
    ), $ = C(
      () => w.value ? "mixed" : _.value
    ), D = C(
      () => a.options.filter((V) => y.value.has(V.value))
    ), M = C(() => {
      const V = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", le = D.value.length;
      return le === 0 ? V : `${V}, ${le} seleccionada${le === 1 ? "" : "s"}`;
    });
    function F(V) {
      return `${String(V.value)}-${V.label}`;
    }
    function z(V) {
      return y.value.has(V.value);
    }
    function W(V, le) {
      const ce = z(V), xe = v.value === le;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ce ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && xe ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S(V) {
      const le = [...a.modelValue ?? []], ce = le.indexOf(V.value);
      ce >= 0 ? le.splice(ce, 1) : le.push(V.value), n("update:modelValue", le);
    }
    function L() {
      const V = new Set(b.value.map((ce) => ce.value)), le = (a.modelValue ?? []).filter(
        (ce) => !V.has(ce)
      );
      n(
        "update:modelValue",
        _.value ? le : [...le, ...b.value.map((ce) => ce.value)]
      );
    }
    function B() {
      const V = p.value;
      if (V.length === 0) {
        v.value = 0;
        return;
      }
      const le = y.value, ce = V.findIndex((xe) => le.has(xe.value));
      v.value = ce >= 0 ? ce : 0;
    }
    function j() {
      if (a.searchable) {
        u.value?.focus();
        return;
      }
      if (a.showSelectAll) {
        f.value?.focus();
        return;
      }
      c.value?.focus();
    }
    function H() {
      m.value = "", B(), We(() => j());
    }
    function Q() {
      h.value = !1, m.value = "";
    }
    function re() {
      if (!a.disabled) {
        if (h.value) {
          Q();
          return;
        }
        h.value = !0, H();
      }
    }
    function ue(V) {
      V.stopPropagation(), !a.disabled && re();
    }
    function X(V) {
      if (!h.value) return;
      const le = r.value;
      le && !le.contains(V.target) && Q();
    }
    function oe(V) {
      a.disabled || (V.key === "ArrowDown" || V.key === "Enter" || V.key === " ") && (V.preventDefault(), h.value || (h.value = !0, H()));
    }
    function R(V) {
      const le = p.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (V.key === "ArrowDown") {
        if (V.preventDefault(), a.showSelectAll) {
          f.value?.focus();
          return;
        }
        if (le.length === 0) return;
        v.value = 0, c.value?.focus();
        return;
      }
      if (V.key === "ArrowUp") {
        if (V.preventDefault(), le.length === 0) return;
        v.value = le.length - 1, c.value?.focus();
        return;
      }
      if (V.key === "Enter") {
        V.preventDefault();
        const ce = le[v.value];
        ce && S(ce);
      }
    }
    function U(V) {
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (V.key === "ArrowDown" && p.value.length > 0) {
        V.preventDefault(), v.value = 0, c.value?.focus();
        return;
      }
      V.key === "ArrowUp" && a.searchable && (V.preventDefault(), u.value?.focus());
    }
    function Y(V) {
      const le = p.value;
      if (V.key === "Escape") {
        V.preventDefault(), Q();
        return;
      }
      if (le.length !== 0) {
        if (V.key === "ArrowDown") {
          V.preventDefault(), v.value = Math.min(v.value + 1, le.length - 1);
          return;
        }
        if (V.key === "ArrowUp") {
          if (V.preventDefault(), v.value === 0 && a.showSelectAll) {
            f.value?.focus();
            return;
          }
          if (v.value === 0 && a.searchable) {
            u.value?.focus();
            return;
          }
          v.value = Math.max(v.value - 1, 0);
          return;
        }
        if (V.key === "Enter" || V.key === " ") {
          V.preventDefault();
          const ce = le[v.value];
          ce && S(ce);
        }
      }
    }
    return Te(m, () => {
      v.value = 0;
    }), et(() => {
      document.addEventListener("click", X);
    }), at(() => {
      document.removeEventListener("click", X);
    }), (V, le) => (g(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      d("div", IS, [
        V.$slots.icon ? (g(), x("span", ES, [
          ke(V.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          class: q(T(ut))
        }, A(e.label), 3)) : E("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          T(tt),
          "flex items-start justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : M.value,
        onClick: ue,
        onKeydown: oe
      }, [
        d("div", OS, [
          D.value.length === 0 ? (g(), x("span", VS, A(e.placeholder), 1)) : (g(), x("div", NS, [
            (g(!0), x(he, null, pe(D.value, (ce) => (g(), x("span", {
              key: F(ce),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", zS, A(ce.label), 1)
            ]))), 128))
          ]))
        ]),
        N(T(na), {
          class: q(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, FS),
      Je(d("div", jS, [
        e.searchable ? (g(), x("div", HS, [
          d("div", WS, [
            d("span", KS, [
              N(T(Ho), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Je(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": le[0] || (le[0] = (ce) => m.value = ce),
              type: "search",
              class: q([T(tt), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: le[1] || (le[1] = Be(() => {
              }, ["stop"])),
              onKeydown: Be(R, ["stop"])
            }, null, 42, US), [
              [Pt, m.value]
            ])
          ])
        ])) : E("", !0),
        e.showSelectAll ? (g(), x("button", {
          key: 1,
          ref_key: "selectAllRef",
          ref: f,
          type: "button",
          role: "checkbox",
          "aria-checked": $.value,
          disabled: b.value.length === 0,
          class: "flex w-full items-center gap-2 border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--kiut-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:text-slate-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5",
          onClick: Be(L, ["stop"]),
          onKeydown: U
        }, [
          d("span", {
            class: q([
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-400 transition-colors dark:border-slate-500",
              _.value || w.value ? "border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]" : ""
            ]),
            "aria-hidden": "true"
          }, [
            w.value ? (g(), te(T(j0), {
              key: 0,
              class: "h-3 w-3"
            })) : _.value ? (g(), te(T(Pn), {
              key: 1,
              class: "h-3 w-3"
            })) : E("", !0)
          ], 2),
          d("span", null, A(e.selectAllLabel), 1)
        ], 40, YS)) : E("", !0),
        d("ul", {
          id: l,
          ref_key: "listRef",
          ref: c,
          role: "listbox",
          tabindex: "-1",
          "aria-multiselectable": "true",
          class: "max-h-60 overflow-auto py-1",
          onKeydown: Be(Y, ["stop"])
        }, [
          p.value.length === 0 ? (g(), x("li", qS, A(e.noResultsText), 1)) : E("", !0),
          (g(!0), x(he, null, pe(p.value, (ce, xe) => (g(), x("li", {
            key: F(ce),
            role: "option",
            "aria-selected": z(ce),
            class: q(W(ce, xe)),
            onClick: Be((K) => S(ce), ["stop"]),
            onMouseenter: (K) => v.value = xe
          }, [
            d("span", GS, [
              z(ce) ? (g(), te(T(Pn), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : E("", !0)
            ]),
            d("span", ZS, A(ce.label), 1)
          ], 42, XS))), 128))
        ], 544)
      ], 512), [
        [Kt, h.value]
      ])
    ], 512));
  }
}), JS = { class: "font-sans" }, e3 = ["for"], t3 = { class: "flex gap-2" }, a3 = { class: "w-[7.5rem] shrink-0" }, n3 = { class: "min-w-0 flex-1" }, o3 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], s3 = ["id"], i3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-phone-${Ke()}`, s = C(() => a.id ?? `${o}-num`), i = C(() => `${s.value}-err`), l = C({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), r = C({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, u) => (g(), x("div", JS, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: q(T(ut))
      }, A(e.label), 11, e3)) : E("", !0),
      d("div", t3, [
        d("div", a3, [
          N(Tt, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1,
            searchable: "",
            "search-placeholder": "Buscar país…"
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", n3, [
          Je(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (f) => r.value = f),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: q([T(tt), e.invalid ? T(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, o3), [
            [Pt, r.value]
          ])
        ])
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: q(T(At)),
        role: "alert"
      }, A(e.errorText), 11, s3)) : E("", !0)
    ]));
  }
}), l3 = ["role", "aria-label"], r3 = { class: "flex flex-wrap gap-2" }, c3 = ["aria-checked", "role", "onClick"], d3 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, u3 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, h3 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, f3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = C(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
    function s(r) {
      return a.multiple ? o.value.includes(r.value) : a.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(r) {
      if (a.multiple) {
        const c = Array.isArray(a.modelValue) ? [...a.modelValue] : [], u = c.indexOf(r.value);
        u >= 0 ? c.splice(u, 1) : c.push(r.value), n("update:modelValue", c);
        return;
      }
      n("update:modelValue", r.value);
    }
    return (r, c) => (g(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", r3, [
        (g(!0), x(he, null, pe(e.items, (u) => (g(), x("button", {
          key: u.value,
          type: "button",
          class: q(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (f) => l(u)
        }, [
          d("span", d3, [
            s(u) ? (g(), x("span", u3)) : E("", !0)
          ]),
          u.dotColor ? (g(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: _e({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          d("span", h3, A(u.label), 1)
        ], 10, c3))), 128))
      ])
    ], 8, l3));
  }
}), g3 = ["aria-label"], m3 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], p3 = { class: "truncate px-3 py-2 text-sm font-medium" }, v3 = /* @__PURE__ */ fe({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${Ke()}`, s = (b) => `${o}-seg-${b}`, i = ne([]);
    function l(b, p) {
      b instanceof HTMLButtonElement ? i.value[p] = b : i.value[p] = null;
    }
    function r(b) {
      return b.value === a.modelValue;
    }
    function c(b) {
      const p = r(b), y = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return b.disabled ? `${y} cursor-not-allowed opacity-40` : p ? `${y} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${y} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(b) {
      b.disabled || b.value !== a.modelValue && n("update:modelValue", b.value);
    }
    function f(b, p, y) {
      u(b), We(() => i.value[p]?.focus());
    }
    const h = C(
      () => a.items.map((b, p) => b.disabled ? -1 : p).filter((b) => b >= 0)
    );
    function v(b, p) {
      const y = a.items.length;
      if (y === 0) return 0;
      let k = b;
      for (let _ = 0; _ < y; _++)
        if (k = (k + p + y) % y, !a.items[k]?.disabled) return k;
      return b;
    }
    function m(b, p) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const y = v(p, 1), k = a.items[y];
        k && u(k), We(() => i.value[y]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const y = v(p, -1), k = a.items[y];
        k && u(k), We(() => i.value[y]?.focus());
      } else if (b.key === "Home") {
        b.preventDefault();
        const y = h.value[0];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), We(() => i.value[y]?.focus());
        }
      } else if (b.key === "End") {
        b.preventDefault();
        const y = h.value[h.value.length - 1];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), We(() => i.value[y]?.focus());
        }
      }
    }
    return (b, p) => (g(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (g(!0), x(he, null, pe(e.items, (y, k) => (g(), x("button", {
        id: s(y.value),
        key: y.value,
        ref_for: !0,
        ref: (_) => l(_, k),
        type: "button",
        role: "tab",
        "aria-selected": r(y),
        "aria-disabled": y.disabled === !0,
        tabindex: r(y) ? 0 : -1,
        class: q(c(y)),
        onClick: (_) => f(y, k),
        onKeydown: (_) => m(_, k)
      }, [
        d("span", p3, A(y.label), 1)
      ], 42, m3))), 128))
    ], 8, g3));
  }
}), b3 = ["aria-expanded", "aria-labelledby", "aria-label"], y3 = ["onKeydown"], x3 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, k3 = { class: "mb-4 flex items-center justify-between gap-2" }, _3 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, w3 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, C3 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, $3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, S3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, M3 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, D3 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, A3 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, T3 = ["disabled", "onClick"], B3 = "rounded-lg text-[#61616b]", L3 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", R3 = "opacity-30", P3 = "bg-[#6b35e9] font-medium text-white", I3 = "bg-[#895af6] font-semibold text-white", E3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-drp-${Ke()}`}-lbl`, i = ne(null), l = ne(null), r = ne(!1), c = ne(null), u = ne(_t(/* @__PURE__ */ new Date())), f = C(() => !!(a.modelValue.start && a.modelValue.end)), h = C(() => {
      const S = _t(u.value);
      return [S, Da(S, 1)];
    }), v = C(() => a.ariaLabel ?? a.placeholder), m = C(() => {
      const S = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${S}` : `left-0 right-auto ${S}`;
    }), b = C(
      () => `${jt(h.value[0])} – ${jt(h.value[1])}`
    ), p = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], y = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const S = ot(a.modelValue.start), L = ot(a.modelValue.end);
      return `${In(S)} – ${In(L)}`;
    });
    function k(S, L) {
      return S.getMonth() === L.getMonth() && S.getFullYear() === L.getFullYear();
    }
    function _(S) {
      const L = Ve(S);
      if (a.minDate) {
        const B = Ve(ot(a.minDate));
        if (Ht(L, B)) return !0;
      }
      if (a.maxDate) {
        const B = Ve(ot(a.maxDate));
        if (Ht(B, L)) return !0;
      }
      return !1;
    }
    function w(S, L, B) {
      const j = vt(S, L), H = vt(S, B);
      if (j && H) return "rounded-lg";
      const Q = j || S.getDay() === 0, re = H || S.getDay() === 6;
      return Q && re ? "rounded-lg" : Q ? "rounded-l-lg" : re ? "rounded-r-lg" : "rounded-none";
    }
    function $(S, L) {
      const B = k(L, S), j = _(L), H = a.modelValue.start ? Ve(ot(a.modelValue.start)) : null, Q = a.modelValue.end ? Ve(ot(a.modelValue.end)) : null, re = Ve(L);
      if (j)
        return B3;
      let ue = L3;
      if (H && Q && Ql(re, H) && Jl(re, Q)) {
        const oe = vt(re, H), R = vt(re, Q);
        ue = `${w(re, H, Q)} ${oe || R ? I3 : P3}`;
      }
      return B || (ue = `${ue} ${R3}`), ue;
    }
    function D(S) {
      if (_(S)) return;
      const L = Ve(S);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: st(L), end: st(L) });
        return;
      }
      let j = Ve(c.value), H = new Date(L);
      Ht(H, j) && ([j, H] = [H, j]), n("update:modelValue", { start: st(j), end: st(H) }), c.value = null, r.value = !1;
    }
    function M(S) {
      u.value = Da(u.value, S);
    }
    function F() {
      r.value = !1;
    }
    function z(S) {
      if (S?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = _t(ot(a.modelValue.start));
          } catch {
          }
        We(() => l.value?.focus());
      }
    }
    function W(S) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(S.target) && (r.value = !1);
    }
    return Te(r, (S) => {
      S && (c.value = null);
    }), et(() => {
      document.addEventListener("click", W);
    }), at(() => {
      document.removeEventListener("click", W);
    }), (S, L) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: q(T(ut))
      }, A(e.label), 3)) : E("", !0),
      d("button", {
        type: "button",
        class: q([
          T(tt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: z,
        onClick: z
      }, [
        N(T(No), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(y.value), 3)
      ], 42, b3),
      Je(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: q([
          m.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Be(F, ["stop"]), ["escape"])
      }, [
        d("div", x3, [
          d("div", k3, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (B) => M(-1))
            }, [
              N(T(zo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", _3, [
              d("span", w3, A(b.value), 1),
              d("div", C3, [
                d("span", $3, A(T(jt)(h.value[0])), 1),
                d("span", S3, A(T(jt)(h.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (B) => M(1))
            }, [
              N(T(jo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", M3, [
            (g(!0), x(he, null, pe(h.value, (B) => (g(), x("div", {
              key: `${B.getFullYear()}-${B.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", D3, [
                (g(), x(he, null, pe(p, (j) => d("span", { key: j }, A(j), 1)), 64))
              ]),
              d("div", A3, [
                (g(!0), x(he, null, pe(T(er)(B), (j) => (g(), x("button", {
                  key: T(st)(j),
                  type: "button",
                  disabled: _(j),
                  class: q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(B, j)]),
                  onClick: (H) => D(j)
                }, A(j.getDate()), 11, T3))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, y3), [
        [Kt, r.value]
      ])
    ], 512));
  }
}), F3 = ["aria-expanded", "aria-labelledby", "aria-label"], O3 = ["aria-label", "onKeydown"], V3 = { class: "flex flex-col sm:flex-row" }, N3 = ["aria-label"], z3 = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, j3 = { class: "flex flex-col gap-0.5" }, H3 = ["onClick"], W3 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, K3 = { class: "mb-4 flex items-center justify-between gap-2" }, U3 = ["aria-label"], Y3 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, q3 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, X3 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, G3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, Z3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, Q3 = ["aria-label"], J3 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, e8 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, t8 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, a8 = ["disabled", "onClick"], n8 = "rounded-lg text-[#61616b]", o8 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", s8 = "opacity-30", i8 = "bg-[#6b35e9] font-medium text-white", l8 = "bg-[#895af6] font-semibold text-white", r8 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-dpp-${Ke()}`}-lbl`, i = ne(null), l = ne(null), r = ne(!1), c = ne(null), u = ne(_t(/* @__PURE__ */ new Date())), f = C(() => !!(a.modelValue.start && a.modelValue.end)), h = C(() => {
      const oe = _t(u.value);
      return [oe, Da(oe, 1)];
    }), v = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), m = C(() => a.ariaLabel ?? v.value), b = C(() => Xl(a.locale)), p = C(() => Q$(a.locale)), y = C(() => G$(a.locale)), k = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), D = C(() => {
      const oe = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${oe}` : `left-0 right-auto ${oe}`;
    }), M = C(
      () => `${jt(h.value[0], a.locale)} – ${jt(h.value[1], a.locale)}`
    ), F = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return v.value;
      const oe = ot(a.modelValue.start), R = ot(a.modelValue.end);
      return `${In(oe, a.locale)} – ${In(R, a.locale)}`;
    });
    function z(oe, R) {
      return oe.getMonth() === R.getMonth() && oe.getFullYear() === R.getFullYear();
    }
    function W(oe) {
      const R = Ve(oe);
      if (a.minDate) {
        const U = Ve(ot(a.minDate));
        if (Ht(R, U)) return !0;
      }
      if (a.maxDate) {
        const U = Ve(ot(a.maxDate));
        if (Ht(U, R)) return !0;
      }
      return !1;
    }
    function S(oe, R, U) {
      const Y = vt(oe, R), V = vt(oe, U);
      if (Y && V) return "rounded-lg";
      const le = Y || oe.getDay() === 0, ce = V || oe.getDay() === 6;
      return le && ce ? "rounded-lg" : le ? "rounded-l-lg" : ce ? "rounded-r-lg" : "rounded-none";
    }
    function L(oe) {
      const R = t4(
        a.modelValue,
        oe,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), U = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return R ? `${U} font-medium` : U;
    }
    function B(oe, R) {
      const U = z(R, oe), Y = W(R), V = a.modelValue.start ? Ve(ot(a.modelValue.start)) : null, le = a.modelValue.end ? Ve(ot(a.modelValue.end)) : null, ce = Ve(R);
      if (Y)
        return n8;
      let xe = o8;
      if (V && le && Ql(ce, V) && Jl(ce, le)) {
        const ie = vt(ce, V), de = vt(ce, le);
        xe = `${S(ce, V, le)} ${ie || de ? l8 : i8}`;
      }
      return U || (xe = `${xe} ${s8}`), xe;
    }
    function j(oe) {
      const R = Zl(Gl(oe), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: st(R.start),
        end: st(R.end)
      }), u.value = _t(R.start), c.value = null, r.value = !1;
    }
    function H(oe) {
      if (W(oe)) return;
      const R = Ve(oe);
      if (!c.value) {
        c.value = new Date(R), n("update:modelValue", { start: st(R), end: st(R) });
        return;
      }
      let Y = Ve(c.value), V = new Date(R);
      Ht(V, Y) && ([Y, V] = [V, Y]), n("update:modelValue", { start: st(Y), end: st(V) }), c.value = null, r.value = !1;
    }
    function Q(oe) {
      u.value = Da(u.value, oe);
    }
    function re() {
      r.value = !1;
    }
    function ue(oe) {
      if (oe.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, a.modelValue.start)
        try {
          u.value = _t(ot(a.modelValue.start));
        } catch {
        }
      We(() => l.value?.focus());
    }
    function X(oe) {
      if (!r.value) return;
      const R = i.value;
      R && !R.contains(oe.target) && (r.value = !1);
    }
    return Te(r, (oe) => {
      oe && (c.value = null);
    }), et(() => {
      document.addEventListener("click", X);
    }), at(() => {
      document.removeEventListener("click", X);
    }), (oe, R) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: q(T(ut))
      }, A(e.label), 3)) : E("", !0),
      d("button", {
        type: "button",
        class: q([
          T(tt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: ue
      }, [
        N(T(No), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(F.value), 3)
      ], 10, F3),
      Je(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: q([
          D.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Be(re, ["stop"]), ["escape"])
      }, [
        d("div", V3, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": k.value
          }, [
            d("p", z3, A(p.value), 1),
            d("ul", j3, [
              (g(!0), x(he, null, pe(b.value, (U) => (g(), x("li", {
                key: U.id
              }, [
                d("button", {
                  type: "button",
                  class: q(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(U.id)]),
                  onClick: (Y) => j(U.id)
                }, A(U.label), 11, H3)
              ]))), 128))
            ])
          ], 8, N3),
          d("div", W3, [
            d("div", K3, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: R[0] || (R[0] = (U) => Q(-1))
              }, [
                N(T(zo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, U3),
              d("div", Y3, [
                d("span", q3, A(M.value), 1),
                d("div", X3, [
                  d("span", G3, A(T(jt)(h.value[0], e.locale)), 1),
                  d("span", Z3, A(T(jt)(h.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: R[1] || (R[1] = (U) => Q(1))
              }, [
                N(T(jo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, Q3)
            ]),
            d("div", J3, [
              (g(!0), x(he, null, pe(h.value, (U) => (g(), x("div", {
                key: `${U.getFullYear()}-${U.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", e8, [
                  (g(!0), x(he, null, pe(y.value, (Y) => (g(), x("span", { key: Y }, A(Y), 1))), 128))
                ]),
                d("div", t8, [
                  (g(!0), x(he, null, pe(T(er)(U), (Y) => (g(), x("button", {
                    key: T(st)(Y),
                    type: "button",
                    disabled: W(Y),
                    class: q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", B(U, Y)]),
                    onClick: (V) => H(Y)
                  }, A(Y.getDate()), 11, a8))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, O3), [
        [Kt, r.value]
      ])
    ], 512));
  }
}), c8 = { class: "kiut-translation-count-badge__content" }, d8 = { class: "kiut-translation-count-badge__title" }, u8 = { class: "kiut-translation-count-badge__pills" }, h8 = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, _n = 8, ka = 12, f8 = /* @__PURE__ */ fe({
  name: "TranslationCountBadge",
  __name: "TranslationCountBadge",
  props: {
    label: {},
    tooltipTitle: {},
    items: {},
    variant: {},
    pulse: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = ne(!1), n = ne("top"), o = ne({
      top: "0px",
      left: "0px"
    }), s = ne(null), i = ne(null), l = C(() => {
      const v = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${v} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${v} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${v} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), r = C(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function u() {
      const v = s.value, m = i.value;
      if (!v || !m) return;
      const b = v.getBoundingClientRect(), p = m.getBoundingClientRect(), y = b.top - ka, k = window.innerHeight - b.bottom - ka, _ = y >= p.height + _n, w = k >= p.height + _n;
      let $ = "top";
      _ ? $ = "top" : w ? $ = "bottom" : $ = k >= y ? "bottom" : "top", n.value = $;
      let D = $ === "top" ? b.top - p.height - _n : b.bottom + _n;
      D = Math.max(
        ka,
        Math.min(D, window.innerHeight - p.height - ka)
      );
      let M = b.left + b.width / 2 - p.width / 2;
      M = Math.max(
        ka,
        Math.min(M, window.innerWidth - p.width - ka)
      ), o.value = {
        top: `${D}px`,
        left: `${M}px`
      };
    }
    async function f() {
      if (!t.items.length) return;
      a.value = !0, await We();
      const v = i.value;
      v && (v.style.visibility = "hidden", u(), v.style.visibility = "visible");
    }
    function h() {
      a.value && c();
    }
    return window.addEventListener("scroll", h, !0), window.addEventListener("resize", h), at(() => {
      window.removeEventListener("scroll", h, !0), window.removeEventListener("resize", h);
    }), (v, m) => (g(), x(he, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: q([l.value, e.pulse && "animate-pulse"]),
        onMouseenter: f,
        onMouseleave: c,
        onFocus: f,
        onBlur: c
      }, A(e.label), 35),
      (g(), te(Wt, { to: "body" }, [
        a.value && e.items.length ? (g(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: i,
          role: "tooltip",
          class: q(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: _e({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: f,
          onMouseleave: c
        }, [
          d("div", c8, [
            d("span", d8, A(e.tooltipTitle), 1),
            d("div", u8, [
              (g(!0), x(he, null, pe(e.items, (b) => (g(), x("span", {
                key: b.id,
                class: q(r.value)
              }, [
                De(A(b.label) + " ", 1),
                b.note ? (g(), x("span", h8, " (" + A(b.note) + ") ", 1)) : E("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : E("", !0)
      ]))
    ], 64));
  }
}), g8 = ["disabled", "aria-expanded", "aria-label"], m8 = { class: "min-w-0 flex-1 truncate" }, p8 = ["aria-selected", "onClick", "onMouseenter"], v8 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, b8 = { class: "min-w-0 flex-1" }, y8 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-tag-select-${Ke()}`}-listbox`, i = ne(null), l = ne(null), r = ne(null), c = ne(null), u = ne(!1), f = ne(0), h = ne({}), v = C(() => a.options.filter((Q) => !Q.disabled)), m = C(
      () => a.options.find((Q) => Q.value === a.modelValue) ?? null
    ), b = C(() => m.value?.color ?? "neutral"), p = C(
      () => Bl(b.value, a.outlined)
    ), y = C(() => m.value ? m.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : v.value[0]?.label ?? "Seleccionar…"), k = C(
      () => a.ariaLabel ?? `Estado: ${y.value}`
    );
    function _() {
      const Q = l.value;
      if (!Q) return;
      const re = Q.getBoundingClientRect();
      h.value = {
        top: `${re.bottom + 4}px`,
        left: `${re.left}px`,
        minWidth: `${re.width}px`
      };
    }
    function w(Q) {
      return `${String(Q.value)}-${Q.label}`;
    }
    function $(Q) {
      return a.modelValue === Q.value;
    }
    function D(Q, re) {
      const ue = $(Q), X = f.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && X ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      f.value = Math.max(
        0,
        v.value.findIndex((Q) => Q.value === a.modelValue)
      );
    }
    function F() {
      _(), M(), We(() => c.value?.focus());
    }
    function z() {
      u.value = !1;
    }
    function W(Q) {
      n("update:modelValue", Q.value), z();
    }
    function S() {
      if (!a.disabled) {
        if (u.value) {
          z();
          return;
        }
        u.value = !0, F();
      }
    }
    function L(Q) {
      Q.stopPropagation(), !a.disabled && S();
    }
    function B(Q) {
      if (!u.value) return;
      const re = Q.target, ue = i.value, X = r.value;
      ue && !ue.contains(re) && (!X || !X.contains(re)) && z();
    }
    function j(Q) {
      a.disabled || (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), u.value || (u.value = !0, F()));
    }
    function H(Q) {
      const re = v.value;
      if (Q.key === "Escape") {
        Q.preventDefault(), z(), l.value?.focus();
        return;
      }
      if (re.length !== 0) {
        if (Q.key === "ArrowDown") {
          Q.preventDefault(), f.value = Math.min(f.value + 1, re.length - 1);
          return;
        }
        if (Q.key === "ArrowUp") {
          Q.preventDefault(), f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (Q.key === "Enter") {
          Q.preventDefault();
          const ue = re[f.value];
          ue && W(ue);
        }
      }
    }
    return et(() => {
      document.addEventListener("click", B);
    }), at(() => {
      document.removeEventListener("click", B);
    }), (Q, re) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: l,
        type: "button",
        disabled: e.disabled,
        class: q([
          T(Tl),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          p.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": k.value,
        onClick: L,
        onKeydown: j
      }, [
        d("span", m8, A(y.value), 1),
        N(T(na), {
          class: q(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, g8),
      (g(), te(Wt, { to: "body" }, [
        Je(d("div", {
          ref_key: "panelRef",
          ref: r,
          style: _e(h.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          d("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Be(H, ["stop"])
          }, [
            (g(!0), x(he, null, pe(v.value, (ue, X) => (g(), x("li", {
              key: w(ue),
              role: "option",
              "aria-selected": $(ue),
              class: q(D(ue, X)),
              onClick: Be((oe) => W(ue), ["stop"]),
              onMouseenter: (oe) => f.value = X
            }, [
              d("span", v8, [
                $(ue) ? (g(), te(T(Pn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : E("", !0)
              ]),
              d("span", b8, A(ue.label), 1)
            ], 42, p8))), 128))
          ], 544)
        ], 4), [
          [Kt, u.value]
        ])
      ]))
    ], 512));
  }
}), x8 = ["aria-label"], k8 = { class: "flex flex-col gap-1" }, _8 = { class: "flex flex-row gap-3 items-center" }, w8 = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, C8 = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, $8 = /* @__PURE__ */ fe({
  __name: "Banner",
  props: {
    id: { default: "banner-warning" },
    title: { default: "Mantenimiento programado de plataforma" },
    description: { default: "El servicio completo estará fuera de línea durante la ventana de mantenimiento. No se procesarán conversaciones ni notificaciones." },
    date_start: {},
    date_final: {},
    subtitle_date_start: {},
    subtitle_date_final: {},
    variant: { default: "warning" }
  },
  setup(e) {
    const t = en(), a = e, n = {
      warning: gC,
      info: mC,
      success: fC,
      feature: vC,
      danger: bC
    }, o = {
      warning: {
        container: "bg-orange-50 border-orange-300 dark:bg-stone-800 dark:border-yellow-800",
        title: "text-orange-400",
        description: "text-stone-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-orange-400",
        container_icon: "bg-orange-200/50 dark:bg-orange-300/20",
        icon_date: "text-stone-400"
      },
      info: {
        container: "bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
        title: "text-blue-700 dark:text-blue-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-blue-500 dark:text-blue-400",
        container_icon: "bg-blue-200/50 dark:bg-blue-300/20",
        icon_date: "text-slate-400"
      },
      success: {
        container: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800",
        title: "text-emerald-700 dark:text-emerald-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-emerald-500 dark:text-emerald-400",
        container_icon: "bg-emerald-200/50 dark:bg-emerald-300/20",
        icon_date: "text-slate-400"
      },
      feature: {
        container: "bg-violet-50 border-violet-200 dark:bg-violet-950/40 dark:border-violet-800",
        title: "text-violet-700 dark:text-violet-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-violet-500 dark:text-violet-400",
        container_icon: "bg-violet-200/50 dark:bg-violet-300/20",
        icon_date: "text-slate-400"
      },
      danger: {
        container: "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800",
        title: "text-red-700 dark:text-red-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-red-500 dark:text-red-400",
        container_icon: "bg-red-200/50 dark:bg-red-300/20",
        icon_date: "text-slate-400"
      }
    }, s = C(() => o[a.variant]), i = C(() => n[a.variant]);
    return (l, r) => (g(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: q([
        s.value.container,
        T(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      d("div", {
        class: q([
          s.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        d("span", {
          class: q([
            s.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          ke(l.$slots, "icon", {}, () => [
            (g(), te(rt(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", k8, [
        d("h1", {
          class: q([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: q([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", _8, [
          a.date_start ? (g(), x("div", w8, [
            d("span", {
              class: q([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                N(T(Si))
              ])
            ], 2),
            a.subtitle_date_start ? (g(), x("span", {
              key: 0,
              class: q([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : E("", !0),
            d("span", {
              class: q([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : E("", !0),
          a.date_final ? (g(), x("div", C8, [
            d("span", {
              class: q([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                N(T(Si))
              ])
            ], 2),
            a.subtitle_date_final ? (g(), x("span", {
              key: 0,
              class: q([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : E("", !0),
            d("span", {
              class: q([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : E("", !0)
        ])
      ])
    ], 10, x8));
  }
}), S8 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, M8 = ["id"], D8 = { class: "min-w-0 flex-1 space-y-1" }, A8 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, T8 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, B8 = {
  key: 0,
  class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2"
}, L8 = /* @__PURE__ */ fe({
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
    headerBorder: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    showFooter: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, n = C(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${Ke()}`}-title`, l = ne(null);
    function r() {
      a.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function u(f) {
      if (a.modelValue && f.key === "Escape") {
        if (a.loading) return;
        f.preventDefault(), r();
      }
    }
    return Te(
      () => a.modelValue,
      (f) => {
        f && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), et(() => {
      document.addEventListener("keydown", u);
    }), at(() => {
      document.removeEventListener("keydown", u);
    }), (f, h) => (g(), te(Wt, { to: "body" }, [
      N(ct, { name: "kiut-modal" }, {
        default: I(() => [
          e.modelValue ? (g(), x("div", S8, [
            d("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            d("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: _e(n.value),
              onClick: h[0] || (h[0] = Be(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: q(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", D8, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (g(), x("p", A8, A(e.subtitle), 1)) : E("", !0)
                ]),
                N(Mt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: I(() => [
                    N(T(po), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              d("div", T8, [
                ke(f.$slots, "default", {}, void 0, !0)
              ]),
              e.showFooter ? (g(), x("footer", B8, [
                N(Mt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: I(() => [
                    De(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                N(Mt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: I(() => [
                    De(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])) : E("", !0)
            ], 12, M8)
          ])) : E("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), R8 = /* @__PURE__ */ ve(L8, [["__scopeId", "data-v-1ab330ef"]]), P8 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, I8 = {
  key: 0,
  class: ""
}, E8 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, F8 = { class: "flex min-w-0 flex-1 items-center" }, O8 = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, V8 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, N8 = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, z8 = /* @__PURE__ */ fe({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = bo(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (g(), x("section", P8, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (g(), x("header", I8, [
        n.$slots.description ? (g(), x("div", E8, [
          ke(n.$slots, "description")
        ])) : E("", !0),
        n.$slots.tabs ? (g(), x("div", {
          key: 1,
          class: q(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", F8, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (g(), x("div", O8, [
            ke(n.$slots, "actions")
          ])) : E("", !0)
        ], 2)) : E("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (g(), x("div", {
          key: 2,
          class: q([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (g(), x("div", V8, [
            ke(n.$slots, "filters")
          ])) : E("", !0),
          n.$slots.actions ? (g(), x("div", N8, [
            ke(n.$slots, "actions")
          ])) : E("", !0)
        ], 2)) : E("", !0)
      ])) : E("", !0),
      n.$slots.content || n.$slots.default ? (g(), x("div", {
        key: 1,
        class: q({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : E("", !0)
    ]));
  }
}), j8 = { class: "flex flex-1 min-h-0" }, H8 = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, W8 = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, K8 = ["aria-current", "data-has-active", "title", "onClick"], U8 = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, Y8 = { class: "px-4 py-4 shrink-0" }, q8 = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, X8 = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, G8 = ["data-nav-id", "aria-current", "onClick"], Z8 = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, Q8 = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, J8 = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, eM = ["data-nav-id", "aria-current", "onClick"], tM = { class: "truncate text-[15px]" }, aM = ["aria-current", "data-has-active", "onClick"], nM = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, oM = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, sM = /* @__PURE__ */ fe({
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
    const a = ne(!1), n = e, o = t, s = en(), { class: i, ...l } = s, r = ne(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < n.mobileBreakpoint);
    }
    et(() => {
      c(), window.addEventListener("resize", c);
    }), at(() => {
      window.removeEventListener("resize", c);
    });
    const u = C(() => {
      const y = n.sections.find((k) => k.id === n.selectedSectionId);
      return y?.items?.length ? y : null;
    });
    function f(y) {
      return n.activePath ? n.activePath === y.path || n.activePath.startsWith(y.path + "/") : !1;
    }
    function h(y) {
      return y.items?.length ? y.items.some(f) : !n.activePath || !y.path ? !1 : n.activePath === y.path || n.activePath.startsWith(y.path + "/");
    }
    function v(y) {
      if (!y.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: y,
          item: { id: y.id, label: y.label, path: y.path }
        });
        return;
      }
      const k = n.selectedSectionId === y.id ? null : y.id;
      o("update:selectedSectionId", k);
    }
    function m(y, k) {
      o("navigate", { section: y, item: k });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function p(y, k) {
      m(y, k), b();
    }
    return (y, k) => r.value ? (g(), x("div", bt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      N(ct, { name: "ksn-overlay" }, {
        default: I(() => [
          u.value ? (g(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : E("", !0)
        ]),
        _: 1
      }),
      N(ct, { name: "ksn-sheet" }, {
        default: I(() => [
          u.value ? (g(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: _e({ paddingBottom: n.mobileBarHeight })
          }, [
            k[3] || (k[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", Z8, [
              d("p", Q8, A(u.value.label), 1),
              d("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
              }, [...k[2] || (k[2] = [
                d("svg", {
                  class: "w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round"
                }, [
                  d("path", { d: "M18 6L6 18M6 6l12 12" })
                ], -1)
              ])])
            ]),
            d("nav", J8, [
              (g(!0), x(he, null, pe(u.value.items, (_) => (g(), x("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": f(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => p(u.value, _)
              }, [
                _.icon ? (g(), te(rt(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : E("", !0),
                d("span", tM, A(_.label), 1)
              ], 8, eM))), 128))
            ])
          ], 4)) : E("", !0)
        ]),
        _: 1
      }),
      d("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: _e({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (g(!0), x(he, null, pe(e.sections, (_) => (g(), x("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": h(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(_)
        }, [
          e.selectedSectionId === _.id || h(_) ? (g(), x("span", nM)) : E("", !0),
          _.icon ? (g(), te(rt(_.icon), {
            key: 1,
            class: "shrink-0",
            style: _e({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : E("", !0),
          d("span", oM, A(_.label), 1)
        ], 8, aM))), 128))
      ], 4)
    ], 16)) : (g(), x("aside", bt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      d("div", j8, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: _e({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: k[0] || (k[0] = (_) => a.value = !0),
          onMouseleave: k[1] || (k[1] = (_) => a.value = !1)
        }, [
          y.$slots.logo ? (g(), x("div", H8, [
            ke(y.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : E("", !0),
          d("nav", W8, [
            (g(!0), x(he, null, pe(e.sections, (_) => (g(), x("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": h(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(_)
            }, [
              _.icon ? (g(), te(rt(_.icon), {
                key: 0,
                class: "shrink-0",
                style: _e({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : E("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: _e({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, K8))), 128))
          ]),
          y.$slots.footer ? (g(), x("div", U8, [
            ke(y.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : E("", !0)
        ], 36),
        N(ct, { name: "ksn-sub" }, {
          default: I(() => [
            u.value ? (g(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: _e({ width: e.secondaryWidth })
            }, [
              d("div", Y8, [
                d("p", q8, A(u.value.label), 1)
              ]),
              d("nav", X8, [
                (g(!0), x(he, null, pe(u.value.items, (_) => (g(), x("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": f(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => m(u.value, _)
                }, [
                  _.icon ? (g(), te(rt(_.icon), {
                    key: 0,
                    style: _e({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : E("", !0),
                  d("span", {
                    class: "truncate",
                    style: _e({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, G8))), 128))
              ])
            ], 4)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), iM = /* @__PURE__ */ ve(sM, [["__scopeId", "data-v-e0ccb96c"]]), lM = ["aria-label"], rM = {
  key: 0,
  class: "shrink-0 px-4 py-4"
}, cM = { class: "text-start text-[12px] font-bold uppercase tracking-widest [color:var(--kiut-text-subtitle)]" }, dM = ["aria-label"], uM = ["data-nav-id", "data-testid", "disabled", "aria-current", "onClick"], hM = {
  key: 1,
  class: "h-3.5 w-3.5 shrink-0 opacity-70",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, fM = /* @__PURE__ */ fe({
  name: "VerticalNavPanel",
  __name: "VerticalNavPanel",
  props: {
    items: {},
    modelValue: {},
    title: {},
    ariaLabel: { default: "Section navigation" },
    panelWidth: { default: "14rem" },
    fontSize: { default: "14px" },
    iconSize: { default: "16px" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = e, n = t;
    function o(i) {
      return i.value === a.modelValue;
    }
    function s(i) {
      if (i.disabled || i.value === a.modelValue) return;
      const l = a.modelValue;
      n("update:modelValue", i.value), n("change", { value: i.value, previousValue: l });
    }
    return (i, l) => (g(), x("aside", {
      class: "kiut-vertical-nav-panel flex shrink-0 flex-col overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] [background-color:var(--kiut-lateral-bg)] font-['Inter',system-ui,sans-serif]",
      style: _e({ width: e.panelWidth }),
      role: "navigation",
      "aria-label": e.ariaLabel
    }, [
      e.title ? (g(), x("div", rM, [
        d("p", cM, A(e.title), 1)
      ])) : E("", !0),
      d("nav", {
        class: q(["flex flex-1 flex-col gap-0.5 overflow-y-auto px-1 pb-3", { "pt-2": !e.title }]),
        "aria-label": e.title || e.ariaLabel
      }, [
        (g(!0), x(he, null, pe(e.items, (r) => (g(), x("button", {
          key: r.value,
          type: "button",
          "data-nav-id": r.value,
          "data-testid": r.testId,
          disabled: r.disabled === !0,
          "aria-current": o(r) ? "true" : void 0,
          class: "kvnp-item group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 disabled:cursor-not-allowed disabled:opacity-40",
          onClick: (c) => s(r)
        }, [
          r.icon ? (g(), te(rt(r.icon), {
            key: 0,
            class: "shrink-0",
            style: _e({ width: e.iconSize, height: e.iconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : E("", !0),
          d("span", {
            class: "min-w-0 flex-1 truncate",
            style: _e({ fontSize: e.fontSize })
          }, A(r.label), 5),
          o(r) ? (g(), x("svg", hM, [...l[0] || (l[0] = [
            d("path", { d: "M9 6l6 6-6 6" }, null, -1)
          ])])) : E("", !0)
        ], 8, uM))), 128))
      ], 10, dM)
    ], 12, lM));
  }
}), nr = /* @__PURE__ */ ve(fM, [["__scopeId", "data-v-cf2cdc84"]]), gM = { class: "kiut-module-nav-layout flex min-h-0 w-full flex-col gap-4 md:flex-row md:items-start" }, mM = { class: "min-w-0 flex-1" }, pM = /* @__PURE__ */ fe({
  name: "ModuleNavLayout",
  __name: "ModuleNavLayout",
  props: {
    items: {},
    modelValue: {},
    title: {},
    ariaLabel: { default: "Section navigation" },
    panelWidth: { default: "14rem" },
    fontSize: { default: "14px" },
    iconSize: { default: "16px" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, o) => (g(), x("div", gM, [
      N(nr, {
        title: e.title,
        items: e.items,
        "model-value": e.modelValue,
        "aria-label": e.ariaLabel,
        "panel-width": e.panelWidth,
        "font-size": e.fontSize,
        "icon-size": e.iconSize,
        "onUpdate:modelValue": o[0] || (o[0] = (s) => a("update:modelValue", s)),
        onChange: o[1] || (o[1] = (s) => a("change", s))
      }, null, 8, ["title", "items", "model-value", "aria-label", "panel-width", "font-size", "icon-size"]),
      d("div", mM, [
        n.$slots.default ? (g(), te(ct, {
          key: 0,
          name: "module-nav-panel",
          mode: "out-in"
        }, {
          default: I(() => [
            (g(), x("div", {
              key: e.modelValue,
              class: "module-nav-panel"
            }, [
              ke(n.$slots, "default", { active: e.modelValue }, void 0, !0)
            ]))
          ]),
          _: 3
        })) : ke(n.$slots, "default", { key: 1 }, void 0, !0)
      ])
    ]));
  }
}), vM = /* @__PURE__ */ ve(pM, [["__scopeId", "data-v-6f3134eb"]]), DM = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", mt), e.component("KiutPieChart", Nn), e.component("KiutBoxplotChart", Qf), e.component("KiutCandlestickChart", Vg), e.component("KiutHistogramChart", Ml), e.component("KiutSankeyChart", Yt), e.component("KiutAgentsPerDay", zp), e.component("KiutBookingManager", x0), e.component("KiutCheckin", I0), e.component("KiutCheckinContainer", Lb), e.component("KiutCheckinMetrics", Ll), e.component("KiutCheckinErrorReasons", Vv), e.component("KiutCheckinSegments", Ol), e.component("KiutDisruption", Gb), e.component("KiutFAQ", oy), e.component("KiutMessagesPerAgent", Vl), e.component("KiutRecordLocator", Py), e.component("KiutSalesByChannel", Nl), e.component("KiutSeller", zl), e.component("KiutSellerContainer", b1), e.component("KiutAncillaries", E1), e.component("KiutAncillariesCR", F1), e.component("KiutTopAgents", W1), e.component("KiutPaymentMethod", ux), e.component("KiutAgentHumanConversations", Lx), e.component("KiutChannelMetrics", jl), e.component("KiutConversationVolume", Kx), e.component("KiutTriageCombinations", sk), e.component("KiutSelectLanguage", uk), e.component("KiutGuardrails", kk), e.component("KiutDisruptionNotifier", zk), e.component("KiutTotalConversationsCard", Hk), e.component("KiutCsatP95Card", Kk), e.component("KiutCsatPulseCard", Uk), e.component("KiutCSATContainer", x_), e.component("KiutAiGeneratedRevenueCard", __), e.component("KiutAiGeneratedChart", B_), e.component("KiutTransactionsChart", N_), e.component("KiutCostCard", j_), e.component("KiutHumanEscalations", Z_), e.component("KiutHumanEscalationsCard", J_), e.component("KiutAvgResolutionTime", u2), e.component("KiutAvgResolutionTimeCard", b2), e.component("KiutCheckinCR", x2), e.component("KiutCheckinKPI", Fl), e.component("KiutSellerCR", _2), e.component("KiutBookingManagerCR", C2), e.component("KiutNpsDailyMetrics", Wl), e.component("KiutNpsMetrics", Kl), e.component("KiutNpsOverviewMetrics", Hl), e.component("KiutAWSCost", L2), e.component("KiutCostUsage", j2), e.component("KiutTokenUsage", Q2), e.component("KiutConversationCount", rw), e.component("KiutTopAgentsAnalysis", xw), e.component("KiutTopAgentsPie", Aw), e.component("KiutDailyCostTrends", Ow), e.component("KiutModelUsage", Qw), e.component("KiutMessageRoles", l5), e.component("KiutCostPerConversations", y5), e.component("Tabs", Ul), e.component("Table", El), e.component("TableVersions", hC), e.component("Filters", GC), e.component("InputText", ql), e.component("InputPassword", d$), e.component("InputTextarea", m$), e.component("InputFile", I$), e.component("ImageUploadCircle", j$), e.component("InputDateTime", w4), e.component("InputTime", B4), e.component("InputRange", K4), e.component("InputNumber", G4), e.component("InputColorPicker", sS), e.component("EmojiPicker", wS), e.component("Select", Tt), e.component("LanguageSelect", CS), e.component("LanguagePicker", PS), e.component("MultiSelect", QS), e.component("Toggle", Yl), e.component("InputPhone", i3), e.component("SelectablePills", f3), e.component("SegmentedControl", v3), e.component("DateRangePicker", E3), e.component("DatePickerPresets", r8), e.component("Tag", Ge), e.component("TagSelect", y8), e.component("TranslationCountBadge", f8), e.component("Button", Mt), e.component("Banner", $8), e.component("Modal", R8), e.component("Section", z8), e.component("KiutAppShellNavigation", iM), e.component("ModuleNavLayout", vM), e.component("VerticalNavPanel", nr);
  }
};
export {
  L2 as AWSCost,
  Lx as AgentHumanConversations,
  zp as AgentsPerDay,
  B_ as AiGeneratedChart,
  __ as AiGeneratedRevenueCard,
  E1 as Ancillaries,
  F1 as AncillariesCR,
  iM as AppShellNavigation,
  u2 as AvgResolutionTime,
  b2 as AvgResolutionTimeCard,
  $8 as Banner,
  x0 as BookingManager,
  C2 as BookingManagerCR,
  Qf as BoxplotChart,
  Mt as Button,
  x_ as CSATContainer,
  Vg as CandlestickChart,
  jl as ChannelMetrics,
  $t as ChartBar,
  mt as ChartLine,
  I0 as Checkin,
  x2 as CheckinCR,
  Lb as CheckinContainer,
  Vv as CheckinErrorReasons,
  Fl as CheckinKPI,
  Ll as CheckinMetrics,
  Ol as CheckinSegments,
  rw as ConversationCount,
  Kx as ConversationVolume,
  j_ as CostCard,
  y5 as CostPerConversations,
  j2 as CostUsage,
  Kk as CsatP95Card,
  Uk as CsatPulseCard,
  tr as DEFAULT_CATEGORY_LABELS,
  ib as DEFAULT_CHECKIN_KPI_LABELS,
  ar as DEFAULT_EMOJI_CATALOG,
  K5 as DEFAULT_TABLE_VERSIONS_LABELS,
  Ow as DailyCostTrends,
  r8 as DatePickerPresets,
  E3 as DateRangePicker,
  Gb as Disruption,
  zk as DisruptionNotifier,
  U5 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  wS as EmojiPicker,
  oy as FAQ,
  GC as Filters,
  kk as Guardrails,
  Ml as HistogramChart,
  Z_ as HumanEscalations,
  J_ as HumanEscalationsCard,
  j$ as ImageUploadCircle,
  sS as InputColorPicker,
  w4 as InputDateTime,
  I$ as InputFile,
  G4 as InputNumber,
  d$ as InputPassword,
  i3 as InputPhone,
  K4 as InputRange,
  ql as InputText,
  m$ as InputTextarea,
  B4 as InputTime,
  DM as KiutUIPlugin,
  PS as LanguagePicker,
  CS as LanguageSelect,
  l5 as MessageRoles,
  Vl as MessagesPerAgent,
  R8 as Modal,
  Qw as ModelUsage,
  vM as ModuleNavLayout,
  QS as MultiSelect,
  Wl as NpsDailyMetrics,
  Kl as NpsMetrics,
  Hl as NpsOverviewMetrics,
  ux as PaymentMethod,
  Nn as PieChart,
  SM as RESOURCE_TABLE_VERSIONS_COLUMNS,
  Py as RecordLocator,
  Nl as SalesByChannel,
  Yt as SankeyChart,
  z8 as Section,
  v3 as SegmentedControl,
  Tt as Select,
  uk as SelectLanguage,
  f3 as SelectablePills,
  zl as Seller,
  _2 as SellerCR,
  b1 as SellerContainer,
  El as Table,
  hC as TableVersions,
  Ul as Tabs,
  Ge as Tag,
  y8 as TagSelect,
  Yl as Toggle,
  Q2 as TokenUsage,
  W1 as TopAgents,
  xw as TopAgentsAnalysis,
  Aw as TopAgentsPie,
  Hk as TotalConversationsCard,
  N_ as TransactionsChart,
  f8 as TranslationCountBadge,
  sk as TriageCombinations,
  nr as VerticalNavPanel,
  cS as appendEmojiToDraft,
  MM as buildDefaultCategories,
  rS as extractEmojis,
  lS as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
