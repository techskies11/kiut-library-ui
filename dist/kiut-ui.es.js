import { defineComponent as J, shallowRef as zo, h as Ba, ref as ot, onMounted as te, onUnmounted as ue, watch as Bt, toRaw as La, nextTick as Ot, version as dl, isProxy as No, computed as C, toRef as ft, openBlock as b, createElementBlock as k, createVNode as V, unref as L, createElementVNode as r, Fragment as X, renderList as it, normalizeStyle as pt, normalizeClass as Y, toDisplayString as A, createCommentVNode as O, onBeforeUnmount as jo, createStaticVNode as hs, withDirectives as Jt, vShow as an, useSlots as za, renderSlot as Dt, Comment as ul, createBlock as q, resolveDynamicComponent as tn, withCtx as I, createTextVNode as xt, vModelSelect as hl, Transition as _n, Teleport as Na, withModifiers as ae, withKeys as $n, vModelText as Ke, useAttrs as ca, inject as Ho, mergeProps as sn } from "vue";
import * as fs from "echarts/core";
import { TooltipComponent as fl, TitleComponent as gl } from "echarts/components";
import { SankeyChart as pl } from "echarts/charts";
import { CanvasRenderer as ml } from "echarts/renderers";
import Rt from "moment";
function En(e) {
  return e + 0.5 | 0;
}
const Ae = (e, t, n) => Math.max(Math.min(e, n), t);
function bn(e) {
  return Ae(En(e * 2.55), 0, 255);
}
function Ee(e) {
  return Ae(En(e * 255), 0, 255);
}
function ke(e) {
  return Ae(En(e / 2.55) / 100, 0, 1);
}
function gs(e) {
  return Ae(En(e * 100), 0, 100);
}
const oe = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Fa = [..."0123456789ABCDEF"], bl = (e) => Fa[e & 15], vl = (e) => Fa[(e & 240) >> 4] + Fa[e & 15], Rn = (e) => (e & 240) >> 4 === (e & 15), yl = (e) => Rn(e.r) && Rn(e.g) && Rn(e.b) && Rn(e.a);
function _l(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & oe[e[1]] * 17,
    g: 255 & oe[e[2]] * 17,
    b: 255 & oe[e[3]] * 17,
    a: t === 5 ? oe[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: oe[e[1]] << 4 | oe[e[2]],
    g: oe[e[3]] << 4 | oe[e[4]],
    b: oe[e[5]] << 4 | oe[e[6]],
    a: t === 9 ? oe[e[7]] << 4 | oe[e[8]] : 255
  })), n;
}
const xl = (e, t) => e < 255 ? t(e) : "";
function kl(e) {
  var t = yl(e) ? bl : vl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + xl(e.a, t) : void 0;
}
const wl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Wo(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function Cl(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function $l(e, t, n) {
  const a = Wo(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function Ml(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function ja(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let c, d, u;
  return o !== i && (u = o - i, d = l > 0.5 ? u / (2 - o - i) : u / (o + i), c = Ml(n, a, s, u, o), c = c * 60 + 0.5), [c | 0, d || 0, l];
}
function Ha(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Ee);
}
function Wa(e, t, n) {
  return Ha(Wo, e, t, n);
}
function Sl(e, t, n) {
  return Ha($l, e, t, n);
}
function Dl(e, t, n) {
  return Ha(Cl, e, t, n);
}
function Yo(e) {
  return (e % 360 + 360) % 360;
}
function Al(e) {
  const t = wl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? bn(+t[5]) : Ee(+t[5]));
  const s = Yo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Sl(s, o, i) : t[1] === "hsv" ? a = Dl(s, o, i) : a = Wa(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Tl(e, t) {
  var n = ja(e);
  n[0] = Yo(n[0] + t), n = Wa(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Bl(e) {
  if (!e)
    return;
  const t = ja(e), n = t[0], a = gs(t[1]), s = gs(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${ke(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const ps = {
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
}, ms = {
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
function Ll() {
  const e = {}, t = Object.keys(ms), n = Object.keys(ps);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, ps[o]);
    o = parseInt(ms[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let On;
function Fl(e) {
  On || (On = Ll(), On.transparent = [0, 0, 0, 0]);
  const t = On[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Pl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function El(e) {
  const t = Pl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? bn(i) : Ae(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? bn(a) : Ae(a, 0, 255)), s = 255 & (t[4] ? bn(s) : Ae(s, 0, 255)), o = 255 & (t[6] ? bn(o) : Ae(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function Il(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${ke(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const pa = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Ze = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Rl(e, t, n) {
  const a = Ze(ke(e.r)), s = Ze(ke(e.g)), o = Ze(ke(e.b));
  return {
    r: Ee(pa(a + n * (Ze(ke(t.r)) - a))),
    g: Ee(pa(s + n * (Ze(ke(t.g)) - s))),
    b: Ee(pa(o + n * (Ze(ke(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Vn(e, t, n) {
  if (e) {
    let a = ja(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = Wa(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Ko(e, t) {
  return e && Object.assign(t || {}, e);
}
function bs(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Ee(e[3]))) : (t = Ko(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ee(t.a)), t;
}
function Ol(e) {
  return e.charAt(0) === "r" ? El(e) : Al(e);
}
class Mn {
  constructor(t) {
    if (t instanceof Mn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = bs(t) : n === "string" && (a = _l(t) || Fl(t) || Ol(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ko(this._rgb);
    return t && (t.a = ke(t.a)), t;
  }
  set rgb(t) {
    this._rgb = bs(t);
  }
  rgbString() {
    return this._valid ? Il(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? kl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Bl(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, s = t.rgb;
      let o;
      const i = n === o ? 0.5 : n, l = 2 * i - 1, c = a.a - s.a, d = ((l * c === -1 ? l : (l + c) / (1 + l * c)) + 1) / 2;
      o = 1 - d, a.r = 255 & d * a.r + o * s.r + 0.5, a.g = 255 & d * a.g + o * s.g + 0.5, a.b = 255 & d * a.b + o * s.b + 0.5, a.a = i * a.a + (1 - i) * s.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Rl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Mn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ee(t), this;
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
    return Vn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Vn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Vn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Vn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Tl(this._rgb, t), this;
  }
}
function ye() {
}
const Vl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ct(e) {
  return e == null;
}
function Vt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function kt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function le(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function fe(e, t) {
  return le(e) ? e : t;
}
function mt(e, t) {
  return typeof e > "u" ? t : e;
}
const zl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Uo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Tt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function $t(e, t, n, a) {
  let s, o, i;
  if (Vt(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (kt(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function ea(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function na(e) {
  if (Vt(e))
    return e.map(na);
  if (kt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = na(e[n[s]]);
    return t;
  }
  return e;
}
function qo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Nl(e, t, n, a) {
  if (!qo(e))
    return;
  const s = t[e], o = n[e];
  kt(s) && kt(o) ? Sn(s, o, a) : t[e] = na(o);
}
function Sn(e, t, n) {
  const a = Vt(t) ? t : [
    t
  ], s = a.length;
  if (!kt(e))
    return e;
  n = n || {};
  const o = n.merger || Nl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !kt(i))
      continue;
    const c = Object.keys(i);
    for (let d = 0, u = c.length; d < u; ++d)
      o(c[d], e, i, n);
  }
  return e;
}
function xn(e, t) {
  return Sn(e, t, {
    merger: jl
  });
}
function jl(e, t, n) {
  if (!qo(e))
    return;
  const a = t[e], s = n[e];
  kt(a) && kt(s) ? xn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = na(s));
}
const vs = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Hl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Wl(e) {
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
function qe(e, t) {
  return (vs[t] || (vs[t] = Wl(t)))(e);
}
function Ya(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Dn = (e) => typeof e < "u", Re = (e) => typeof e == "function", ys = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Yl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Mt = Math.PI, Pt = 2 * Mt, Kl = Pt + Mt, aa = Number.POSITIVE_INFINITY, Ul = Mt / 180, zt = Mt / 2, ze = Mt / 4, _s = Mt * 2 / 3, Xo = Math.log10, me = Math.sign;
function kn(e, t, n) {
  return Math.abs(e - t) < n;
}
function xs(e) {
  const t = Math.round(e);
  e = kn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Xo(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function ql(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function Xl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function An(e) {
  return !Xl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Gl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Zl(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function we(e) {
  return e * (Mt / 180);
}
function Ql(e) {
  return e * (180 / Mt);
}
function ks(e) {
  if (!le(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Go(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * Mt && (o += Pt), {
    angle: o,
    distance: s
  };
}
function Pa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Jl(e, t) {
  return (e - t + Kl) % Pt - Mt;
}
function de(e) {
  return (e % Pt + Pt) % Pt;
}
function Tn(e, t, n, a) {
  const s = de(e), o = de(t), i = de(n), l = de(o - s), c = de(i - s), d = de(s - o), u = de(s - i);
  return s === o || s === i || a && o === i || l > c && d < u;
}
function Kt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function tr(e) {
  return Kt(e, -32768, 32767);
}
function Te(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Ka(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const Ye = (e, t, n, a) => Ka(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), er = (e, t, n) => Ka(e, n, (a) => e[a][t] >= n);
function nr(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const Zo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function ar(e, t) {
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
  }), Zo.forEach((n) => {
    const a = "_onData" + Ya(n), s = e[n];
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
function ws(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (Zo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Qo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Jo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ti(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, Jo.call(window, () => {
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
const Ua = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Wt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, or = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function ir(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: p, minDefined: _, maxDefined: g } = i.getUserBounds();
    if (_) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Ye(c, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ye(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const v = c.slice(0, s + 1).reverse().findIndex((x) => !Ct(x[l.axis]));
        s -= Math.max(0, v);
      }
      s = Kt(s, 0, a - 1);
    }
    if (g) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        Ye(c, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ye(t, u, i.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const x = c.slice(v - 1).findIndex((m) => !Ct(m[l.axis]));
        v += Math.max(0, x);
      }
      o = Kt(v, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function lr(e) {
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
const zn = (e) => e === 0 || e === 1, Cs = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Pt / n)), $s = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Pt / n) + 1, wn = {
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
  easeInSine: (e) => -Math.cos(e * zt) + 1,
  easeOutSine: (e) => Math.sin(e * zt),
  easeInOutSine: (e) => -0.5 * (Math.cos(Mt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => zn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => zn(e) ? e : Cs(e, 0.075, 0.3),
  easeOutElastic: (e) => zn(e) ? e : $s(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return zn(e) ? e : e < 0.5 ? 0.5 * Cs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * $s(e * 2 - 1, 0.1125, 0.45);
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
function qa(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ms(e) {
  return qa(e) ? e : new Mn(e);
}
function ma(e) {
  return qa(e) ? e : new Mn(e).saturate(0.5).darken(0.1).hexString();
}
const rr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], cr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function dr(e) {
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
      properties: cr
    },
    numbers: {
      type: "number",
      properties: rr
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
function ur(e) {
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
const Ss = /* @__PURE__ */ new Map();
function hr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = Ss.get(n);
  return a || (a = new Intl.NumberFormat(e, t), Ss.set(n, a)), a;
}
function Xa(e, t, n) {
  return hr(t, n).format(e);
}
const fr = {
  values(e) {
    return Vt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const d = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (d < 1e-4 || d > 1e15) && (s = "scientific"), o = gr(e, n);
    }
    const i = Xo(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), c = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(c, this.options.ticks.format), Xa(e, a, c);
  }
};
function gr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var ei = {
  formatters: fr
};
function pr(e) {
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
      callback: ei.formatters.values,
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
const Xe = /* @__PURE__ */ Object.create(null), Ea = /* @__PURE__ */ Object.create(null);
function Cn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ba(e, t, n) {
  return typeof t == "string" ? Sn(Cn(e, t), n) : Sn(Cn(e, ""), t);
}
class mr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => ma(s.backgroundColor), this.hoverBorderColor = (a, s) => ma(s.borderColor), this.hoverColor = (a, s) => ma(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return ba(this, t, n);
  }
  get(t) {
    return Cn(this, t);
  }
  describe(t, n) {
    return ba(Ea, t, n);
  }
  override(t, n) {
    return ba(Xe, t, n);
  }
  route(t, n, a, s) {
    const o = Cn(this, t), i = Cn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const c = this[l], d = i[s];
          return kt(c) ? Object.assign({}, d, c) : mt(c, d);
        },
        set(c) {
          this[l] = c;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var It = /* @__PURE__ */ new mr({
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
  dr,
  ur,
  pr
]);
function br(e) {
  return !e || Ct(e.size) || Ct(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Ds(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Ne(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function As(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ia(e, t, n, a) {
  ni(e, t, n, a, null);
}
function ni(e, t, n, a, s) {
  let o, i, l, c, d, u, h, p;
  const _ = t.pointStyle, g = t.rotation, v = t.radius;
  let x = (g || 0) * Ul;
  if (_ && typeof _ == "object" && (o = _.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(x), e.drawImage(_, -_.width / 2, -_.height / 2, _.width, _.height), e.restore();
    return;
  }
  if (!(isNaN(v) || v <= 0)) {
    switch (e.beginPath(), _) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, v, 0, 0, Pt) : e.arc(n, a, v, 0, Pt), e.closePath();
        break;
      case "triangle":
        u = s ? s / 2 : v, e.moveTo(n + Math.sin(x) * u, a - Math.cos(x) * v), x += _s, e.lineTo(n + Math.sin(x) * u, a - Math.cos(x) * v), x += _s, e.lineTo(n + Math.sin(x) * u, a - Math.cos(x) * v), e.closePath();
        break;
      case "rectRounded":
        d = v * 0.516, c = v - d, i = Math.cos(x + ze) * c, h = Math.cos(x + ze) * (s ? s / 2 - d : c), l = Math.sin(x + ze) * c, p = Math.sin(x + ze) * (s ? s / 2 - d : c), e.arc(n - h, a - l, d, x - Mt, x - zt), e.arc(n + p, a - i, d, x - zt, x), e.arc(n + h, a + l, d, x, x + zt), e.arc(n - p, a + i, d, x + zt, x + Mt), e.closePath();
        break;
      case "rect":
        if (!g) {
          c = Math.SQRT1_2 * v, u = s ? s / 2 : c, e.rect(n - u, a - c, 2 * u, 2 * c);
          break;
        }
        x += ze;
      /* falls through */
      case "rectRot":
        h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + p, a - i), e.lineTo(n + h, a + l), e.lineTo(n - p, a + i), e.closePath();
        break;
      case "crossRot":
        x += ze;
      /* falls through */
      case "cross":
        h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "star":
        h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i), x += ze, h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(x) * v, l = Math.sin(x) * v, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(x) * (s ? s / 2 : v), a + Math.sin(x) * v);
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
function Ga(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Za(e) {
  e.restore();
}
function vr(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function yr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function _r(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ct(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function xr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, c = n - o.actualBoundingBoxAscent, d = n + o.actualBoundingBoxDescent, u = s.strikethrough ? (c + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function kr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Ln(e, t, n, a, s, o = {}) {
  const i = Vt(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = s.string, _r(e, o), c = 0; c < i.length; ++c)
    d = i[c], o.backdrop && kr(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), Ct(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, n, a, o.maxWidth)), e.fillText(d, n, a, o.maxWidth), xr(e, n, a, d, o), a += Number(s.lineHeight);
  e.restore();
}
function sa(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Mt, Mt, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Mt, zt, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, zt, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -zt, !0), e.lineTo(n + i.topLeft, a);
}
const wr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Cr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function $r(e, t) {
  const n = ("" + e).match(wr);
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
const Mr = (e) => +e || 0;
function Qa(e, t) {
  const n = {}, a = kt(t), s = a ? Object.keys(t) : t, o = kt(e) ? a ? (i) => mt(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = Mr(o(i));
  return n;
}
function ai(e) {
  return Qa(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function en(e) {
  return Qa(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function re(e) {
  const t = ai(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Ut(e, t) {
  e = e || {}, t = t || It.font;
  let n = mt(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = mt(e.style, t.style);
  a && !("" + a).match(Cr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: mt(e.family, t.family),
    lineHeight: $r(mt(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: mt(e.weight, t.weight),
    string: ""
  };
  return s.string = br(s), s;
}
function Nn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function Sr(e, t, n) {
  const { min: a, max: s } = e, o = Uo(t, (s - a) / 2), i = (l, c) => n && l === 0 ? 0 : l + c;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function Ge(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ja(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = li("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => Ja([
      l,
      ...e
    ], t, o, a)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, c) {
      return delete l[c], delete l._keys, delete e[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, c) {
      return oi(l, c, () => Er(c, t, e, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, c) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], c);
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
    has(l, c) {
      return Bs(l).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Bs(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, c, d) {
      const u = l._storage || (l._storage = s());
      return l[c] = u[c] = d, delete l._keys, !0;
    }
  });
}
function on(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: si(e, a),
    setContext: (o) => on(e, o, n, a),
    override: (o) => on(e.override(o), t, n, a)
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
      return oi(o, i, () => Ar(o, i, l));
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
function si(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Re(n) ? n : () => n,
    isIndexable: Re(a) ? a : () => a
  };
}
const Dr = (e, t) => e ? e + Ya(t) : t, ts = (e, t) => kt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function oi(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Ar(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Re(l) && i.isScriptable(t) && (l = Tr(t, l, e, n)), Vt(l) && l.length && (l = Br(t, l, e, i.isIndexable)), ts(t, l) && (l = on(l, s, o && o[t], i)), l;
}
function Tr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let c = t(o, i || a);
  return l.delete(e), ts(e, c) && (c = es(s._scopes, s, e, c)), c;
}
function Br(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (kt(t[0])) {
    const c = t, d = s._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const h = es(d, s, e, u);
      t.push(on(h, o, i && i[e], l));
    }
  }
  return t;
}
function ii(e, t, n) {
  return Re(e) ? e(t, n) : e;
}
const Lr = (e, t) => e === !0 ? t : typeof e == "string" ? qe(t, e) : void 0;
function Fr(e, t, n, a, s) {
  for (const o of t) {
    const i = Lr(n, o);
    if (i) {
      e.add(i);
      const l = ii(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function es(e, t, n, a) {
  const s = t._rootScopes, o = ii(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let c = Ts(l, i, n, o || n, a);
  return c === null || typeof o < "u" && o !== n && (c = Ts(l, i, o, c, a), c === null) ? !1 : Ja(Array.from(l), [
    ""
  ], s, o, () => Pr(t, n, a));
}
function Ts(e, t, n, a, s) {
  for (; n; )
    n = Fr(e, t, n, a, s);
  return n;
}
function Pr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Vt(s) && kt(n) ? n : s || {};
}
function Er(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = li(Dr(o, e), n), typeof s < "u")
      return ts(e, s) ? es(n, a, e, s) : s;
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
function Bs(e) {
  let t = e._keys;
  return t || (t = e._keys = Ir(e._scopes)), t;
}
function Ir(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Rr = Number.EPSILON || 1e-14, ln = (e, t) => t < e.length && !e[t].skip && e[t], ri = (e) => e === "x" ? "y" : "x";
function Or(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Pa(o, s), c = Pa(i, o);
  let d = l / (l + c), u = c / (l + c);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = a * d, p = a * u;
  return {
    previous: {
      x: o.x - h * (i.x - s.x),
      y: o.y - h * (i.y - s.y)
    },
    next: {
      x: o.x + p * (i.x - s.x),
      y: o.y + p * (i.y - s.y)
    }
  };
}
function Vr(e, t, n) {
  const a = e.length;
  let s, o, i, l, c, d = ln(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (c = d, d = ln(e, u + 1), !(!c || !d)) {
      if (kn(t[u], 0, Rr)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      s = n[u] / t[u], o = n[u + 1] / t[u], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[u] = s * i * t[u], n[u + 1] = o * i * t[u]);
    }
}
function zr(e, t, n = "x") {
  const a = ri(n), s = e.length;
  let o, i, l, c = ln(e, 0);
  for (let d = 0; d < s; ++d) {
    if (i = l, l = c, c = ln(e, d + 1), !l)
      continue;
    const u = l[n], h = l[a];
    i && (o = (u - i[n]) / 3, l[`cp1${n}`] = u - o, l[`cp1${a}`] = h - o * t[d]), c && (o = (c[n] - u) / 3, l[`cp2${n}`] = u + o, l[`cp2${a}`] = h + o * t[d]);
  }
}
function Nr(e, t = "x") {
  const n = ri(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, c, d = ln(e, 0);
  for (i = 0; i < a; ++i)
    if (l = c, c = d, d = ln(e, i + 1), !!c) {
      if (d) {
        const u = d[t] - c[t];
        s[i] = u !== 0 ? (d[n] - c[n]) / u : 0;
      }
      o[i] = l ? d ? me(s[i - 1]) !== me(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Vr(e, s, o), zr(e, o, t);
}
function jn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function jr(e, t) {
  let n, a, s, o, i, l = Bn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && Bn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = jn(s.cp1x, t.left, t.right), s.cp1y = jn(s.cp1y, t.top, t.bottom)), l && (s.cp2x = jn(s.cp2x, t.left, t.right), s.cp2y = jn(s.cp2y, t.top, t.bottom)));
}
function Hr(e, t, n, a, s) {
  let o, i, l, c;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Nr(e, s);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], c = Or(d, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = c.previous.x, l.cp1y = c.previous.y, l.cp2x = c.next.x, l.cp2y = c.next.y, d = l;
  }
  t.capBezierPoints && jr(e, n);
}
function ns() {
  return typeof window < "u" && typeof document < "u";
}
function as(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function oa(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const da = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Wr(e, t) {
  return da(e).getPropertyValue(t);
}
const Yr = [
  "top",
  "right",
  "bottom",
  "left"
];
function Ue(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = Yr[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Kr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Ur(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, c;
  if (Kr(s, o, e.target))
    l = s, c = o;
  else {
    const d = t.getBoundingClientRect();
    l = a.clientX - d.left, c = a.clientY - d.top, i = !0;
  }
  return {
    x: l,
    y: c,
    box: i
  };
}
function He(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = da(n), o = s.boxSizing === "border-box", i = Ue(s, "padding"), l = Ue(s, "border", "width"), { x: c, y: d, box: u } = Ur(e, n), h = i.left + (u && l.left), p = i.top + (u && l.top);
  let { width: _, height: g } = t;
  return o && (_ -= i.width + l.width, g -= i.height + l.height), {
    x: Math.round((c - h) / _ * n.width / a),
    y: Math.round((d - p) / g * n.height / a)
  };
}
function qr(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && as(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = da(o), c = Ue(l, "border", "width"), d = Ue(l, "padding");
      t = i.width - d.width - c.width, n = i.height - d.height - c.height, a = oa(l.maxWidth, o, "clientWidth"), s = oa(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || aa,
    maxHeight: s || aa
  };
}
const Be = (e) => Math.round(e * 10) / 10;
function Xr(e, t, n, a) {
  const s = da(e), o = Ue(s, "margin"), i = oa(s.maxWidth, e, "clientWidth") || aa, l = oa(s.maxHeight, e, "clientHeight") || aa, c = qr(e, t, n);
  let { width: d, height: u } = c;
  if (s.boxSizing === "content-box") {
    const p = Ue(s, "border", "width"), _ = Ue(s, "padding");
    d -= _.width + p.width, u -= _.height + p.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, a ? d / a : u - o.height), d = Be(Math.min(d, i, c.maxWidth)), u = Be(Math.min(u, l, c.maxHeight)), d && !u && (u = Be(d / 2)), (t !== void 0 || n !== void 0) && a && c.height && u > c.height && (u = c.height, d = Be(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function Ls(e, t, n) {
  const a = t || 1, s = Be(e.height * a), o = Be(e.width * a);
  e.height = Be(e.height), e.width = Be(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Gr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ns() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Fs(e, t) {
  const n = Wr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function We(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Zr(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Qr(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = We(e, s, n), l = We(s, o, n), c = We(o, t, n), d = We(i, l, n), u = We(l, c, n);
  return We(d, u, n);
}
const Jr = function(e, t) {
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
function nn(e, t, n) {
  return e ? Jr(t, n) : tc();
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
    between: Tn,
    compare: Jl,
    normalize: de
  } : {
    between: Te,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Ps({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function ec(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = ui(a), c = t.length;
  let { start: d, end: u, loop: h } = e, p, _;
  if (h) {
    for (d += c, u += c, p = 0, _ = c; p < _ && i(l(t[d % c][a]), s, o); ++p)
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
function nc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: c, normalize: d } = ui(a), { start: u, end: h, loop: p, style: _ } = ec(e, t, n), g = [];
  let v = !1, x = null, m, f, y;
  const w = () => c(s, y, m) && l(s, y) !== 0, M = () => l(o, m) === 0 || c(o, y, m), D = () => v || w(), $ = () => !v || M();
  for (let S = u, F = u; S <= h; ++S)
    f = t[S % i], !f.skip && (m = d(f[a]), m !== y && (v = c(m, s, o), x === null && D() && (x = l(m, s) === 0 ? S : F), x !== null && $() && (g.push(Ps({
      start: x,
      end: S,
      loop: p,
      count: i,
      style: _
    })), x = null), F = S, y = m));
  return x !== null && g.push(Ps({
    start: x,
    end: h,
    loop: p,
    count: i,
    style: _
  })), g;
}
function ac(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = nc(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function sc(e, t, n, a) {
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
function oc(e, t, n, a) {
  const s = e.length, o = [];
  let i = t, l = e[t], c;
  for (c = t + 1; c <= n; ++c) {
    const d = e[c % s];
    d.skip || d.stop ? l.skip || (a = !1, o.push({
      start: t % s,
      end: (c - 1) % s,
      loop: a
    }), t = i = d.stop ? c : null) : (i = c, l.skip && (t = c)), l = d;
  }
  return i !== null && o.push({
    start: t % s,
    end: i % s,
    loop: a
  }), o;
}
function ic(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = sc(n, s, o, a);
  if (a === !0)
    return Es(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const c = l < i ? l + s : l, d = !!e._fullLoop && i === 0 && l === s - 1;
  return Es(e, oc(n, i, c, d), n, t);
}
function Es(e, t, n, a) {
  return !a || !a.setContext || !n ? t : lc(e, t, n, a);
}
function lc(e, t, n, a) {
  const s = e._chart.getContext(), o = Is(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, c = n.length, d = [];
  let u = o, h = t[0].start, p = h;
  function _(g, v, x, m) {
    const f = l ? -1 : 1;
    if (g !== v) {
      for (g += c; n[g % c].skip; )
        g -= f;
      for (; n[v % c].skip; )
        v += f;
      g % c !== v % c && (d.push({
        start: g % c,
        end: v % c,
        loop: x,
        style: m
      }), u = m, h = v % c);
    }
  }
  for (const g of t) {
    h = l ? h : g.start;
    let v = n[h % c], x;
    for (p = h + 1; p <= g.end; p++) {
      const m = n[p % c];
      x = Is(a.setContext(Ge(s, {
        type: "segment",
        p0: v,
        p1: m,
        p0DataIndex: (p - 1) % c,
        p1DataIndex: p % c,
        datasetIndex: i
      }))), rc(x, u) && _(h, p - 1, g.loop, u), v = m, u = x;
    }
    h < p - 1 && _(h, p - 1, g.loop, u);
  }
  return d;
}
function Is(e) {
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
function rc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return qa(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Hn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function cc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Hn(n, t, "left"),
    right: Hn(n, t, "right"),
    top: Hn(a, t, "top"),
    bottom: Hn(a, t, "bottom")
  } : t;
}
function dc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = cc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class uc {
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
    this._request || (this._running = !0, this._request = Jo.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, s) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, l = !1, c;
      for (; i >= 0; --i)
        c = o[i], c._active ? (c._total > a.duration && (a.duration = c._total), c.tick(t), l = !0) : (o[i] = o[o.length - 1], o.pop());
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
var _e = /* @__PURE__ */ new uc();
const Rs = "transparent", hc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Ms(e || Rs), s = a.valid && Ms(t || Rs);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class fc {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Nn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Nn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || hc[t.type || typeof i], this._easing = wn[t.easing] || wn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Nn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Nn([
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
    let c;
    if (this._active = o !== l && (i || n < a), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = o;
      return;
    }
    c = n / a % 2, c = i && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[s] = this._fn(o, l, c);
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
class hi {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!kt(t))
      return;
    const n = Object.keys(It.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!kt(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (Vt(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = pc(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && gc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const a = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let c;
    for (c = i.length - 1; c >= 0; --c) {
      const d = i[c];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const u = n[d];
      let h = o[d];
      const p = a.get(d);
      if (h)
        if (p && h.active()) {
          h.update(p, u, l);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new fc(p, t, d, u), s.push(h);
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
      return _e.add(this._chart, a), !0;
  }
}
function gc(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function pc(e, t) {
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
function Os(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function mc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Os(e, n), s = Os(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function bc(e) {
  let t, n, a, s;
  return kt(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function fi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Vs(e, t, n, a = {}) {
  const s = e.keys, o = a.mode === "single";
  let i, l, c, d;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, l = s.length; i < l; ++i) {
    if (c = +s[i], c === n) {
      if (u = !0, a.all)
        continue;
      break;
    }
    d = e.values[c], le(d) && (o || t === 0 || me(t) === me(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function vc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let c, d, u;
  for (c = 0, d = i.length; c < d; ++c)
    u = i[c], l[c] = {
      [s]: u,
      [o]: e[u]
    };
  return l;
}
function va(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function yc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function _c(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function xc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function zs(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function Ns(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, c = o.axis, d = i.axis, u = yc(o, i, a), h = t.length;
  let p;
  for (let _ = 0; _ < h; ++_) {
    const g = t[_], { [c]: v, [d]: x } = g, m = g._stacks || (g._stacks = {});
    p = m[d] = xc(s, u, v), p[l] = x, p._top = zs(p, i, !0, a.type), p._bottom = zs(p, i, !1, a.type);
    const f = p._visualValues || (p._visualValues = {});
    f[l] = x;
  }
}
function ya(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function kc(e, t) {
  return Ge(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function wc(e, t, n) {
  return Ge(e, {
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
function cn(e, t) {
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
const _a = (e) => e === "reset" || e === "none", js = (e, t) => t ? e : Object.assign({}, e), Cc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: fi(n, !0),
  values: null
};
class ua {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = va(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && cn(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, p, _, g) => h === "x" ? p : h === "r" ? g : _, o = n.xAxisID = mt(a.xAxisID, ya(t, "x")), i = n.yAxisID = mt(a.yAxisID, ya(t, "y")), l = n.rAxisID = mt(a.rAxisID, ya(t, "r")), c = n.indexAxis, d = n.iAxisID = s(c, o, i, l), u = n.vAxisID = s(c, i, o, l);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(d), n.vScale = this.getScaleForId(u);
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
    this._data && ws(this._data, this), t._stacked && cn(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (kt(n)) {
      const s = this._cachedMeta;
      this._data = vc(n, s);
    } else if (a !== n) {
      if (a) {
        ws(a, this);
        const s = this._cachedMeta;
        cn(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && ar(n, this), this._syncList = [], this._data = n;
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
    n._stacked = va(n.vScale, n), n.stack !== a.stack && (s = !0, cn(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Ns(this, n._parsed), n._stacked = va(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let c = t === 0 && n === s.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, h, p;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, p = s;
    else {
      Vt(s[t]) ? p = this.parseArrayData(a, s, t, n) : kt(s[t]) ? p = this.parseObjectData(a, s, t, n) : p = this.parsePrimitiveData(a, s, t, n);
      const _ = () => h[l] === null || d && h[l] < d[l];
      for (u = 0; u < n; ++u)
        a._parsed[u + t] = h = p[u], c && (_() && (c = !1), d = h);
      a._sorted = c;
    }
    i && Ns(this, p);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, c = i.axis, d = o.getLabels(), u = o === i, h = new Array(s);
    let p, _, g;
    for (p = 0, _ = s; p < _; ++p)
      g = p + a, h[p] = {
        [l]: u || o.parse(d[g], g),
        [c]: i.parse(n[g], g)
      };
    return h;
  }
  parseArrayData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, l = new Array(s);
    let c, d, u, h;
    for (c = 0, d = s; c < d; ++c)
      u = c + a, h = n[u], l[c] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return l;
  }
  parseObjectData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: c = "y" } = this._parsing, d = new Array(s);
    let u, h, p, _;
    for (u = 0, h = s; u < h; ++u)
      p = u + a, _ = n[p], d[u] = {
        x: o.parse(qe(_, l), p),
        y: i.parse(qe(_, c), p)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, a) {
    const s = this.chart, o = this._cachedMeta, i = n[t.axis], l = {
      keys: fi(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Vs(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Vs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), c = Cc(n, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = _c(l);
    let p, _;
    function g() {
      _ = s[p];
      const v = _[l.axis];
      return !le(_[t.axis]) || u > v || h < v;
    }
    for (p = 0; p < i && !(!g() && (this.updateRangeFromParsed(d, t, _, c), o)); ++p)
      ;
    if (o) {
      for (p = i - 1; p >= 0; --p)
        if (!g()) {
          this.updateRangeFromParsed(d, t, _, c);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let s, o, i;
    for (s = 0, o = n.length; s < o; ++s)
      i = n[s][t.axis], le(i) && a.push(i);
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
    this.update(t || "default"), n._clip = bc(mt(this.options.clip, mc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, s = a.data || [], o = n.chartArea, i = [], l = this._drawStart || 0, c = this._drawCount || s.length - l, d = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, o, l, c), u = l; u < l + c; ++u) {
      const h = s[u];
      h.hidden || (h.active && d ? i.push(h) : h.draw(t, o));
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
      o = i.$context || (i.$context = wc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = kc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], c = this.enableOptionSharing && Dn(a);
    if (l)
      return js(l, c);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), _ = Object.keys(It.elements[t]), g = () => this.getContext(a, s, n), v = d.resolveNamedOptions(p, _, g, h);
    return v.$shared && (v.$shared = c, o[i] = Object.freeze(js(v, c))), v;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let c;
    if (s.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, n), p = u.getOptionScopes(this.getDataset(), h);
      c = u.createResolver(p, this.getContext(t, a, n));
    }
    const d = new hi(s, c && c.animations);
    return c && c._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || _a(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    _a(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !_a(n) && this._resolveAnimations(void 0, n).update(t, a);
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
    for (const [l, c, d] of this._syncList)
      this[l](c, d);
    this._syncList = [];
    const s = a.length, o = n.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, n, a = !0) {
    const s = this._cachedMeta, o = s.data, i = t + n;
    let l;
    const c = (d) => {
      for (d.length += n, l = d.length - 1; l >= i; l--)
        d[l] = d[l - n];
    };
    for (c(o), l = t; l < i; ++l)
      o[l] = new this.dataElementType();
    this._parsing && c(s._parsed), this.parse(t, n), a && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, a, s) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const s = a._parsed.splice(t, n);
      a._stacked && cn(a, s);
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
function $c(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = Qo(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function Mc(e) {
  const t = e.iScale, n = $c(t, e.type);
  let a = t._length, s, o, i, l;
  const c = () => {
    i === 32767 || i === -32768 || (Dn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), c();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), c();
  return a;
}
function Sc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return Ct(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Dc(e, t, n, a) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const c = n.categoryPercentage;
  i === null && (i = o - (l === null ? t.end - t.start : l - o)), l === null && (l = o + o - i);
  const d = o - (o - Math.min(i, l)) / 2 * c;
  return {
    chunk: Math.abs(l - i) / 2 * c / a,
    ratio: n.barPercentage,
    start: d
  };
}
function Ac(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let c = i, d = l;
  Math.abs(i) > Math.abs(l) && (c = l, d = i), t[n.axis] = d, t._custom = {
    barStart: c,
    barEnd: d,
    start: s,
    end: o,
    min: i,
    max: l
  };
}
function gi(e, t, n, a) {
  return Vt(e) ? Ac(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Hs(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, c = [];
  let d, u, h, p;
  for (d = n, u = n + a; d < u; ++d)
    p = t[d], h = {}, h[s.axis] = l || s.parse(i[d], d), c.push(gi(p, h, o, d));
  return c;
}
function xa(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Tc(e, t, n) {
  return e !== 0 ? me(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Bc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function Lc(e, t, n, a) {
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
  const { start: i, end: l, reverse: c, top: d, bottom: u } = Bc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = d : (n._bottom || 0) === a ? s = u : (o[Ws(u, i, l, c)] = !0, s = d)), o[Ws(s, i, l, c)] = !0, e.borderSkipped = o;
}
function Ws(e, t, n, a) {
  return a ? (e = Fc(e, t, n), e = Ys(e, n, t)) : e = Ys(e, t, n), e;
}
function Fc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Ys(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Pc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Ec extends ua {
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
    return Hs(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return Hs(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? l : c, u = i.axis === "x" ? l : c, h = [];
    let p, _, g, v;
    for (p = a, _ = a + s; p < _; ++p)
      v = n[p], g = {}, g[o.axis] = o.parse(qe(v, d), p), h.push(gi(qe(v, u), g, i, p));
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
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = xa(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, c = l.getBasePixel(), d = l.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(n, s);
    for (let _ = n; _ < n + a; _++) {
      const g = this.getParsed(_), v = o || Ct(g[l.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(_), x = this._calculateBarIndexPixels(_, u), m = (g._stacks || {})[l.axis], f = {
        horizontal: d,
        base: v.base,
        enableBorderRadius: !m || xa(g._custom) || i === m._top || i === m._bottom,
        x: d ? v.head : x.center,
        y: d ? x.center : v.head,
        height: d ? x.size : Math.abs(v.size),
        width: d ? Math.abs(v.size) : x.size
      };
      p && (f.options = h || this.resolveDataElementOptions(_, t[_].active ? "active" : s));
      const y = f.options || t[_].options;
      Lc(f, y, m, i), Pc(f, y, u.ratio), this.updateElement(t[_], _, f, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), c = l && l[a.axis], d = (u) => {
      const h = u._parsed.find((_) => _[a.axis] === c), p = h && h[u.vScale.axis];
      if (Ct(p) || isNaN(p))
        return !0;
    };
    for (const u of s)
      if (!(n !== void 0 && d(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
      t[mt(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || Mc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, c = this.getParsed(t), d = c._custom, u = xa(d);
    let h = c[n.axis], p = 0, _ = a ? this.applyStack(n, c, a) : h, g, v;
    _ !== h && (p = _ - h, _ = h), u && (h = d.barStart, _ = d.barEnd - d.barStart, h !== 0 && me(h) !== me(d.barEnd) && (p = 0), p += h);
    const x = !Ct(o) && !u ? o : p;
    let m = n.getPixelForValue(x);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(p + _) : g = m, v = g - m, Math.abs(v) < i) {
      v = Tc(v, n, l) * i, h === l && (m -= v / 2);
      const f = n.getPixelForDecimal(0), y = n.getPixelForDecimal(1), w = Math.min(f, y), M = Math.max(f, y);
      m = Math.max(Math.min(m, M), w), g = m + v, a && !u && (c._stacks[n.axis]._visualValues[s] = n.getValueForPixel(g) - n.getValueForPixel(m));
    }
    if (m === n.getPixelForValue(l)) {
      const f = me(v) * n.getLineWidthForValue(l) / 2;
      m += f, v -= f;
    }
    return {
      size: v,
      base: m,
      head: g,
      center: g + v / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = mt(s.maxBarThickness, 1 / 0);
    let l, c;
    const d = this._getAxisCount();
    if (n.grouped) {
      const u = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? Dc(t, n, s, u * d) : Sc(t, n, s, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, _ = this._getAxis().indexOf(mt(p, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + _;
      l = h.start + h.chunk * g + h.chunk / 2, c = Math.min(i, h.chunk * h.ratio);
    } else
      l = a.getPixelForValue(this.getParsed(t)[a.axis], t), c = Math.min(i, n.min * n.ratio);
    return {
      base: l - c / 2,
      head: l + c / 2,
      center: l,
      size: c
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, s = a.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[n.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function Ic(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Pt) {
    const l = e, c = l + t, d = Math.cos(l), u = Math.sin(l), h = Math.cos(c), p = Math.sin(c), _ = (y, w, M) => Tn(y, l, c, !0) ? 1 : Math.max(w, w * n, M, M * n), g = (y, w, M) => Tn(y, l, c, !0) ? -1 : Math.min(w, w * n, M, M * n), v = _(0, d, h), x = _(zt, u, p), m = g(Mt, d, h), f = g(Mt + zt, u, p);
    a = (v - m) / 2, s = (x - f) / 2, o = -(v + m) / 2, i = -(x + f) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Rc extends ua {
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
            return n.labels.length && n.datasets.length ? n.labels.map((c, d) => {
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
                textAlign: s,
                pointStyle: a,
                borderRadius: i && (l || h.borderRadius),
                index: d
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
      let o = (c) => +a[c];
      if (kt(a[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +qe(a[d], c);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return we(this.options.rotation - 90);
  }
  _getCircumference() {
    return we(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Pt, n = -Pt;
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), c = Math.min(zl(this.options.cutout, l), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: _, offsetX: g, offsetY: v } = Ic(h, u, c), x = (a.width - i) / p, m = (a.height - i) / _, f = Math.max(Math.min(x, m) / 2, 0), y = Uo(this.options.radius, f), w = Math.max(y * c, 0), M = (y - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * y, this.offsetY = v * y, s.total = this.calculateTotal(), this.outerRadius = y - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Pt);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, d = i.options.animation, u = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, p = o && d.animateScale, _ = p ? 0 : this.innerRadius, g = p ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: x } = this._getSharedOptions(n, s);
    let m = this._getRotation(), f;
    for (f = 0; f < n; ++f)
      m += this._circumference(f, o);
    for (f = n; f < n + a; ++f) {
      const y = this._circumference(f, o), w = t[f], M = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: m,
        endAngle: m + y,
        circumference: y,
        outerRadius: g,
        innerRadius: _
      };
      x && (M.options = v || this.resolveDataElementOptions(f, w.active ? "active" : s)), m += y, this.updateElement(w, f, M, s);
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
    return n > 0 && !isNaN(t) ? Pt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = Xa(n._parsed[t], a.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let s, o, i, l, c;
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
      c = l.resolveDataElementOptions(s), c.borderAlign !== "inner" && (n = Math.max(n, c.borderWidth || 0, c.hoverBorderWidth || 0));
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
    return Math.max(mt(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Oc extends ua {
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
    let { start: l, count: c } = ir(n, s, i);
    this._drawStart = l, this._drawCount = c, lr(n) && (l = 0, c = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(s, l, c, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(n, s), p = i.axis, _ = l.axis, { spanGaps: g, segment: v } = this.options, x = An(g) ? g : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || o || s === "none", f = n + a, y = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let M = 0; M < y; ++M) {
      const D = t[M], $ = m ? D : {};
      if (M < n || M >= f) {
        $.skip = !0;
        continue;
      }
      const S = this.getParsed(M), F = Ct(S[_]), T = $[p] = i.getPixelForValue(S[p], M), B = $[_] = o || F ? l.getBasePixel() : l.getPixelForValue(c ? this.applyStack(l, S, c) : S[_], M);
      $.skip = isNaN(T) || isNaN(B) || F, $.stop = M > 0 && Math.abs(S[p] - w[p]) > x, v && ($.parsed = S, $.raw = d.data[M]), h && ($.options = u || this.resolveDataElementOptions(M, D.active ? "active" : s)), m || this.updateElement(D, M, $, s), w = S;
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
class Vc extends Rc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function je() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ss {
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
    Object.assign(ss.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return je();
  }
  parse() {
    return je();
  }
  format() {
    return je();
  }
  add() {
    return je();
  }
  diff() {
    return je();
  }
  startOf() {
    return je();
  }
  endOf() {
    return je();
  }
}
var zc = {
  _date: ss
};
function Nc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const d = l._reversePixels ? er : Ye;
    if (a) {
      if (s._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const p = d(o, t, n - h), _ = d(o, t, n + h);
          return {
            lo: p.lo,
            hi: _.hi
          };
        }
      }
    } else {
      const u = d(o, t, n);
      if (c) {
        const { vScale: h } = s._cachedMeta, { _parsed: p } = e, _ = p.slice(0, u.lo + 1).reverse().findIndex((v) => !Ct(v[h.axis]));
        u.lo -= Math.max(0, _);
        const g = p.slice(u.hi).findIndex((v) => !Ct(v[h.axis]));
        u.hi += Math.max(0, g);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function ha(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, c = o.length; l < c; ++l) {
    const { index: d, data: u } = o[l], { lo: h, hi: p } = Nc(o[l], t, i, s);
    for (let _ = h; _ <= p; ++_) {
      const g = u[_];
      g.skip || a(g, d, _);
    }
  }
}
function jc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function ka(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || ha(e, n, t, function(l, c, d) {
    !s && !Bn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function Hc(e, t, n, a) {
  let s = [];
  function o(i, l, c) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Go(i, {
      x: t.x,
      y: t.y
    });
    Tn(h, d, u) && s.push({
      element: i,
      datasetIndex: l,
      index: c
    });
  }
  return ha(e, n, t, o), s;
}
function Wc(e, t, n, a, s, o) {
  let i = [];
  const l = jc(n);
  let c = Number.POSITIVE_INFINITY;
  function d(u, h, p) {
    const _ = u.inRange(t.x, t.y, s);
    if (a && !_)
      return;
    const g = u.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(g)) && !_)
      return;
    const x = l(t, g);
    x < c ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: p
      }
    ], c = x) : x === c && i.push({
      element: u,
      datasetIndex: h,
      index: p
    });
  }
  return ha(e, n, t, d), i;
}
function wa(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Hc(e, t, n, s) : Wc(e, t, n, a, s, o);
}
function Ks(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return ha(e, n, t, (c, d, u) => {
    c[i] && c[i](t[n], s) && (o.push({
      element: c,
      datasetIndex: d,
      index: u
    }), l = l || c.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var Yc = {
  modes: {
    index(e, t, n, a) {
      const s = He(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? ka(e, s, o, a, i) : wa(e, s, o, !1, a, i), c = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = l[0].index, h = d.data[u];
        h && !h.skip && c.push({
          element: h,
          datasetIndex: d.index,
          index: u
        });
      }), c) : [];
    },
    dataset(e, t, n, a) {
      const s = He(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? ka(e, s, o, a, i) : wa(e, s, o, !1, a, i);
      if (l.length > 0) {
        const c = l[0].datasetIndex, d = e.getDatasetMeta(c).data;
        l = [];
        for (let u = 0; u < d.length; ++u)
          l.push({
            element: d[u],
            datasetIndex: c,
            index: u
          });
      }
      return l;
    },
    point(e, t, n, a) {
      const s = He(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return ka(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = He(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return wa(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = He(t, e);
      return Ks(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = He(t, e);
      return Ks(e, s, "y", n.intersect, a);
    }
  }
};
const pi = [
  "left",
  "top",
  "right",
  "bottom"
];
function dn(e, t) {
  return e.filter((n) => n.pos === t);
}
function Us(e, t) {
  return e.filter((n) => pi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function un(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function Kc(e) {
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
function Uc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !pi.includes(s))
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
function qc(e, t) {
  const n = Uc(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: c } = l.box, d = n[l.stack], u = d && l.stackWeight / d.weight;
    l.horizontal ? (l.width = u ? u * a : c && t.availableWidth, l.height = s) : (l.width = a, l.height = u ? u * s : c && t.availableHeight);
  }
  return n;
}
function Xc(e) {
  const t = Kc(e), n = un(t.filter((d) => d.box.fullSize), !0), a = un(dn(t, "left"), !0), s = un(dn(t, "right")), o = un(dn(t, "top"), !0), i = un(dn(t, "bottom")), l = Us(t, "x"), c = Us(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(c).concat(i).concat(l),
    chartArea: dn(t, "chartArea"),
    vertical: a.concat(s).concat(c),
    horizontal: o.concat(i).concat(l)
  };
}
function qs(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function mi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Gc(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!kt(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && mi(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - qs(i, e, "left", "right")), c = Math.max(0, t.outerHeight - qs(i, e, "top", "bottom")), d = l !== e.w, u = c !== e.h;
  return e.w = l, e.h = c, n.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Zc(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Qc(e, t) {
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
function vn(e, t, n, a) {
  const s = [];
  let o, i, l, c, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    l = e[o], c = l.box, c.update(l.width || t.w, l.height || t.h, Qc(l.horizontal, t));
    const { same: h, other: p } = Gc(t, n, l, a);
    d |= h && s.length, u = u || p, c.fullSize || s.push(l);
  }
  return d && vn(s, t, n, a) || u;
}
function Wn(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function Xs(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const c = l.box, d = a[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / d.weight || 1;
    if (l.horizontal) {
      const h = t.w * u, p = d.size || c.height;
      Dn(d.start) && (i = d.start), c.fullSize ? Wn(c, s.left, i, n.outerWidth - s.right - s.left, p) : Wn(c, t.left + d.placed, i, h, p), d.start = i, d.placed += h, i = c.bottom;
    } else {
      const h = t.h * u, p = d.size || c.width;
      Dn(d.start) && (o = d.start), c.fullSize ? Wn(c, o, s.top, p, n.outerHeight - s.bottom - s.top) : Wn(c, o, t.top + d.placed, p, h), d.start = o, d.placed += h, o = c.right;
    }
  }
  t.x = o, t.y = i;
}
var ie = {
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
    const s = re(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = Xc(e.boxes), c = l.vertical, d = l.horizontal;
    $t(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const u = c.reduce((v, x) => x.box.options && x.box.options.display === !1 ? v : v + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, s);
    mi(p, re(a));
    const _ = Object.assign({
      maxPadding: p,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), g = qc(c.concat(d), h);
    vn(l.fullSize, _, h, g), vn(c, _, h, g), vn(d, _, h, g) && vn(c, _, h, g), Zc(_), Xs(l.leftAndTop, _, h, g), _.x += _.w, _.y += _.h, Xs(l.rightAndBottom, _, h, g), e.chartArea = {
      left: _.left,
      top: _.top,
      right: _.left + _.w,
      bottom: _.top + _.h,
      height: _.h,
      width: _.w
    }, $t(l.chartArea, (v) => {
      const x = v.box;
      Object.assign(x, e.chartArea), x.update(_.w, _.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class bi {
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
class Jc extends bi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Qn = "$chartjs", td = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Gs = (e) => e === null || e === "";
function ed(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[Qn] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Gs(s)) {
    const o = Fs(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Gs(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Fs(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const vi = Gr ? {
  passive: !0
} : !1;
function nd(e, t, n) {
  e && e.addEventListener(t, n, vi);
}
function ad(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, vi);
}
function sd(e, t) {
  const n = td[e.type] || e.type, { x: a, y: s } = He(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function ia(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function od(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ia(l.addedNodes, a), i = i && !ia(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function id(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ia(l.removedNodes, a), i = i && !ia(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Fn = /* @__PURE__ */ new Map();
let Zs = 0;
function yi() {
  const e = window.devicePixelRatio;
  e !== Zs && (Zs = e, Fn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function ld(e, t) {
  Fn.size || window.addEventListener("resize", yi), Fn.set(e, t);
}
function rd(e) {
  Fn.delete(e), Fn.size || window.removeEventListener("resize", yi);
}
function cd(e, t, n) {
  const a = e.canvas, s = a && as(a);
  if (!s)
    return;
  const o = ti((l, c) => {
    const d = s.clientWidth;
    n(l, c), d < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const c = l[0], d = c.contentRect.width, u = c.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(s), ld(e, o), i;
}
function Ca(e, t, n) {
  n && n.disconnect(), t === "resize" && rd(e);
}
function dd(e, t, n) {
  const a = e.canvas, s = ti((o) => {
    e.ctx !== null && n(sd(o, e));
  }, e);
  return nd(a, t, s), s;
}
class ud extends bi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (ed(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Qn])
      return !1;
    const a = n[Qn].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      Ct(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[Qn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: od,
      detach: id,
      resize: cd
    }[n] || dd;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: Ca,
      detach: Ca,
      resize: Ca
    }[n] || ad)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return Xr(t, n, a, s);
  }
  isAttached(t) {
    const n = t && as(t);
    return !!(n && n.isConnected);
  }
}
function hd(e) {
  return !ns() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Jc : ud;
}
let $e = class {
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
    const s = {};
    return t.forEach((o) => {
      s[o] = a[o] && a[o].active() ? a[o]._to : this[o];
    }), s;
  }
};
function fd(e, t) {
  const n = e.options.ticks, a = gd(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? md(t) : [], i = o.length, l = o[0], c = o[i - 1], d = [];
  if (i > s)
    return bd(t, d, o, i / s), d;
  const u = pd(o, t, s);
  if (i > 0) {
    let h, p;
    const _ = i > 1 ? Math.round((c - l) / (i - 1)) : null;
    for (Yn(t, d, u, Ct(_) ? 0 : l - _, l), h = 0, p = i - 1; h < p; h++)
      Yn(t, d, u, o[h], o[h + 1]);
    return Yn(t, d, u, c, Ct(_) ? t.length : c + _), d;
  }
  return Yn(t, d, u), d;
}
function gd(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function pd(e, t, n) {
  const a = vd(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = ql(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const c = o[i];
    if (c > s)
      return c;
  }
  return Math.max(s, 1);
}
function md(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function bd(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function Yn(e, t, n, a, s) {
  const o = mt(a, 0), i = Math.min(mt(s, e.length), e.length);
  let l = 0, c, d, u;
  for (n = Math.ceil(n), s && (c = s - a, n = c / Math.floor(c / n)), u = o; u < 0; )
    l++, u = Math.round(o + l * n);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), l++, u = Math.round(o + l * n));
}
function vd(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const yd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Qs = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Js = (e, t) => Math.min(t || e, e);
function to(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function _d(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let c = e.getPixelForTick(s), d;
  if (!(n && (a === 1 ? d = Math.max(c - o, i - c) : t === 0 ? d = (e.getPixelForTick(1) - c) / 2 : d = (c - e.getPixelForTick(s - 1)) / 2, c += s < t ? d : -d, c < o - l || c > i + l)))
    return c;
}
function xd(e, t) {
  $t(e, (n) => {
    const a = n.gc, s = a.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[a[o]];
      a.splice(0, s);
    }
  });
}
function hn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function eo(e, t) {
  if (!e.display)
    return 0;
  const n = Ut(e.font, t), a = re(e.padding);
  return (Vt(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function kd(e, t) {
  return Ge(e, {
    scale: t,
    type: "scale"
  });
}
function wd(e, t, n) {
  return Ge(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Cd(e, t, n) {
  let a = Ua(e);
  return (n && t !== "right" || !n && t === "right") && (a = yd(a)), a;
}
function $d(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: c } = e, { chartArea: d, scales: u } = c;
  let h = 0, p, _, g;
  const v = i - s, x = l - o;
  if (e.isHorizontal()) {
    if (_ = Wt(a, o, l), kt(n)) {
      const m = Object.keys(n)[0], f = n[m];
      g = u[m].getPixelForValue(f) + v - t;
    } else n === "center" ? g = (d.bottom + d.top) / 2 + v - t : g = Qs(e, n, t);
    p = l - o;
  } else {
    if (kt(n)) {
      const m = Object.keys(n)[0], f = n[m];
      _ = u[m].getPixelForValue(f) - x + t;
    } else n === "center" ? _ = (d.left + d.right) / 2 - x + t : _ = Qs(e, n, t);
    g = Wt(a, i, s), h = n === "left" ? -zt : zt;
  }
  return {
    titleX: _,
    titleY: g,
    maxWidth: p,
    rotation: h
  };
}
class rn extends $e {
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
    return t = fe(t, Number.POSITIVE_INFINITY), n = fe(n, Number.NEGATIVE_INFINITY), a = fe(a, Number.POSITIVE_INFINITY), s = fe(s, Number.NEGATIVE_INFINITY), {
      min: fe(t, a),
      max: fe(n, s),
      minDefined: le(t),
      maxDefined: le(n)
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
    for (let c = 0, d = l.length; c < d; ++c)
      i = l[c].controller.getMinMax(this, t), s || (n = Math.min(n, i.min)), o || (a = Math.max(a, i.max));
    return n = o && n > a ? a : n, a = s && n > a ? n : a, {
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
    Tt(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Sr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = l < this.ticks.length;
    this._convertTicksToLabels(c ? to(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = fd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
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
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Tt(this.options[t], [
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
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = Tt(n.callback, [
        o.value,
        a,
        t
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
    const t = this.options, n = t.ticks, a = Js(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, c, d;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, p = u.highest.height, _ = Kt(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : _ / (a - 1), h + 6 > l && (l = _ / (a - (t.offset ? 0.5 : 1)), c = this.maxHeight - hn(t.grid) - n.padding - eo(t.title, this.chart.options.font), d = Math.sqrt(h * h + p * p), i = Ql(Math.min(Math.asin(Kt((u.highest.height + 6) / l, -1, 1)), Math.asin(Kt(c / d, -1, 1)) - Math.asin(Kt(p / d, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
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
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: s, grid: o } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const c = eo(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = hn(o) + c) : (t.height = this.maxHeight, t.width = hn(o) + c), a.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: p } = this._getLabelSizes(), _ = a.padding * 2, g = we(this.labelRotation), v = Math.cos(g), x = Math.sin(g);
        if (l) {
          const m = a.mirror ? 0 : x * h.width + v * p.height;
          t.height = Math.min(this.maxHeight, t.height + m + _);
        } else {
          const m = a.mirror ? 0 : v * h.width + x * p.height;
          t.width = Math.min(this.maxWidth, t.width + m + _);
        }
        this._calculatePadding(d, u, x, v);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, c = this.labelRotation !== 0, d = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, _ = 0;
      c ? d ? (p = s * t.width, _ = a * n.height) : (p = a * t.height, _ = s * n.width) : o === "start" ? _ = n.width : o === "end" ? p = t.width : o !== "inner" && (p = t.width / 2, _ = n.width / 2), this.paddingLeft = Math.max((p - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((_ - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = n.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = n.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
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
      Ct(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = to(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], c = Math.floor(n / Js(n, a));
    let d = 0, u = 0, h, p, _, g, v, x, m, f, y, w, M;
    for (h = 0; h < n; h += c) {
      if (g = t[h].label, v = this._resolveTickFontOptions(h), s.font = x = v.string, m = o[x] = o[x] || {
        data: {},
        gc: []
      }, f = v.lineHeight, y = w = 0, !Ct(g) && !Vt(g))
        y = Ds(s, m.data, m.gc, y, g), w = f;
      else if (Vt(g))
        for (p = 0, _ = g.length; p < _; ++p)
          M = g[p], !Ct(M) && !Vt(M) && (y = Ds(s, m.data, m.gc, y, M), w += f);
      i.push(y), l.push(w), d = Math.max(y, d), u = Math.max(w, u);
    }
    xd(o, n);
    const D = i.indexOf(d), $ = l.indexOf(u), S = (F) => ({
      width: i[F] || 0,
      height: l[F] || 0
    });
    return {
      first: S(0),
      last: S(n - 1),
      widest: S(D),
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
    return tr(this._alignToPixels ? Ne(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = wd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = kd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = we(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, c = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? c * a > l * s ? l / a : c / s : c * s < l * a ? c / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, c = o.offset, d = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), p = hn(o), _ = [], g = l.setContext(this.getContext()), v = g.display ? g.width : 0, x = v / 2, m = function(j) {
      return Ne(a, j, v);
    };
    let f, y, w, M, D, $, S, F, T, B, P, E;
    if (i === "top")
      f = m(this.bottom), $ = this.bottom - p, F = f - x, B = m(t.top) + x, E = t.bottom;
    else if (i === "bottom")
      f = m(this.top), B = t.top, E = m(t.bottom) - x, $ = f + x, F = this.top + p;
    else if (i === "left")
      f = m(this.right), D = this.right - p, S = f - x, T = m(t.left) + x, P = t.right;
    else if (i === "right")
      f = m(this.left), T = t.left, P = m(t.right) - x, D = f + x, S = this.left + p;
    else if (n === "x") {
      if (i === "center")
        f = m((t.top + t.bottom) / 2 + 0.5);
      else if (kt(i)) {
        const j = Object.keys(i)[0], Q = i[j];
        f = m(this.chart.scales[j].getPixelForValue(Q));
      }
      B = t.top, E = t.bottom, $ = f + x, F = $ + p;
    } else if (n === "y") {
      if (i === "center")
        f = m((t.left + t.right) / 2);
      else if (kt(i)) {
        const j = Object.keys(i)[0], Q = i[j];
        f = m(this.chart.scales[j].getPixelForValue(Q));
      }
      D = f - x, S = D - p, T = t.left, P = t.right;
    }
    const N = mt(s.ticks.maxTicksLimit, h), K = Math.max(1, Math.ceil(h / N));
    for (y = 0; y < h; y += K) {
      const j = this.getContext(y), Q = o.setContext(j), tt = l.setContext(j), ct = Q.lineWidth, z = Q.color, U = tt.dash || [], G = tt.dashOffset, rt = Q.tickWidth, st = Q.tickColor, St = Q.tickBorderDash || [], _t = Q.tickBorderDashOffset;
      w = _d(this, y, c), w !== void 0 && (M = Ne(a, w, ct), d ? D = S = T = P = M : $ = F = B = E = M, _.push({
        tx1: D,
        ty1: $,
        tx2: S,
        ty2: F,
        x1: T,
        y1: B,
        x2: P,
        y2: E,
        width: ct,
        color: z,
        borderDash: U,
        borderDashOffset: G,
        tickWidth: rt,
        tickColor: st,
        tickBorderDash: St,
        tickBorderDashOffset: _t
      }));
    }
    return this._ticksLength = h, this._borderValue = f, _;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: c, crossAlign: d, padding: u, mirror: h } = o, p = hn(a.grid), _ = p + u, g = h ? -u : _, v = -we(this.labelRotation), x = [];
    let m, f, y, w, M, D, $, S, F, T, B, P, E = "middle";
    if (s === "top")
      D = this.bottom - g, $ = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      D = this.top + g, $ = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const K = this._getYAxisLabelAlignment(p);
      $ = K.textAlign, M = K.x;
    } else if (s === "right") {
      const K = this._getYAxisLabelAlignment(p);
      $ = K.textAlign, M = K.x;
    } else if (n === "x") {
      if (s === "center")
        D = (t.top + t.bottom) / 2 + _;
      else if (kt(s)) {
        const K = Object.keys(s)[0], j = s[K];
        D = this.chart.scales[K].getPixelForValue(j) + _;
      }
      $ = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        M = (t.left + t.right) / 2 - _;
      else if (kt(s)) {
        const K = Object.keys(s)[0], j = s[K];
        M = this.chart.scales[K].getPixelForValue(j);
      }
      $ = this._getYAxisLabelAlignment(p).textAlign;
    }
    n === "y" && (c === "start" ? E = "top" : c === "end" && (E = "bottom"));
    const N = this._getLabelSizes();
    for (m = 0, f = l.length; m < f; ++m) {
      y = l[m], w = y.label;
      const K = o.setContext(this.getContext(m));
      S = this.getPixelForTick(m) + o.labelOffset, F = this._resolveTickFontOptions(m), T = F.lineHeight, B = Vt(w) ? w.length : 1;
      const j = B / 2, Q = K.color, tt = K.textStrokeColor, ct = K.textStrokeWidth;
      let z = $;
      i ? (M = S, $ === "inner" && (m === f - 1 ? z = this.options.reverse ? "left" : "right" : m === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), s === "top" ? d === "near" || v !== 0 ? P = -B * T + T / 2 : d === "center" ? P = -N.highest.height / 2 - j * T + T : P = -N.highest.height + T / 2 : d === "near" || v !== 0 ? P = T / 2 : d === "center" ? P = N.highest.height / 2 - j * T : P = N.highest.height - B * T, h && (P *= -1), v !== 0 && !K.showLabelBackdrop && (M += T / 2 * Math.sin(v))) : (D = S, P = (1 - B) * T / 2);
      let U;
      if (K.showLabelBackdrop) {
        const G = re(K.backdropPadding), rt = N.heights[m], st = N.widths[m];
        let St = P - G.top, _t = 0 - G.left;
        switch (E) {
          case "middle":
            St -= rt / 2;
            break;
          case "bottom":
            St -= rt;
            break;
        }
        switch ($) {
          case "center":
            _t -= st / 2;
            break;
          case "right":
            _t -= st;
            break;
          case "inner":
            m === f - 1 ? _t -= st : m > 0 && (_t -= st / 2);
            break;
        }
        U = {
          left: _t,
          top: St,
          width: st + G.width,
          height: rt + G.height,
          color: K.backdropColor
        };
      }
      x.push({
        label: w,
        font: F,
        textOffset: P,
        options: {
          rotation: v,
          color: Q,
          strokeColor: tt,
          strokeWidth: ct,
          textAlign: z,
          textBaseline: E,
          translation: [
            M,
            D
          ],
          backdrop: U
        }
      });
    }
    return x;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-we(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), l = t + o, c = i.widest.width;
    let d, u;
    return n === "left" ? s ? (u = this.right + o, a === "near" ? d = "left" : a === "center" ? (d = "center", u += c / 2) : (d = "right", u += c)) : (u = this.right - l, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= c / 2) : (d = "left", u = this.left)) : n === "right" ? s ? (u = this.left + o, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= c / 2) : (d = "left", u -= c)) : (u = this.left + l, a === "near" ? d = "left" : a === "center" ? (d = "center", u += c / 2) : (d = "right", u = this.right)) : d = "right", {
      textAlign: d,
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
    const l = (c, d, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(c.x, c.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (o = 0, i = s.length; o < i; ++o) {
        const c = s[o];
        n.drawOnChartArea && l({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), n.drawTicks && l({
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
    const { chart: t, ctx: n, options: { border: a, grid: s } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let d, u, h, p;
    this.isHorizontal() ? (d = Ne(t, this.left, i) - i / 2, u = Ne(t, this.right, l) + l / 2, h = p = c) : (h = Ne(t, this.top, i) - i / 2, p = Ne(t, this.bottom, l) + l / 2, d = u = c), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(d, h), n.lineTo(u, p), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && Ga(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, c = i.font, d = i.label, u = i.textOffset;
      Ln(a, d, 0, u, c, l);
    }
    s && Za(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Ut(a.font), i = re(a.padding), l = a.align;
    let c = o.lineHeight / 2;
    n === "bottom" || n === "center" || kt(n) ? (c += i.bottom, Vt(a.text) && (c += o.lineHeight * (a.text.length - 1))) : c += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: p } = $d(this, c, n, l);
    Ln(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: p,
      textAlign: Cd(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = mt(t.grid && t.grid.z, -1), s = mt(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== rn.prototype.draw ? [
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
    return Ut(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Kn {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Dd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, Md(t, i, a), this.override && It.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in It[s] && (delete It[s][a], this.override && delete Xe[a]);
  }
}
function Md(e, t, n) {
  const a = Sn(/* @__PURE__ */ Object.create(null), [
    n ? It.get(n) : {},
    It.get(t),
    e.defaults
  ]);
  It.set(t, a), e.defaultRoutes && Sd(t, e.defaultRoutes), e.descriptors && It.describe(t, e.descriptors);
}
function Sd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), c = i.join(".");
    It.route(o, s, c, l);
  });
}
function Dd(e) {
  return "id" in e && "defaults" in e;
}
class Ad {
  constructor() {
    this.controllers = new Kn(ua, "datasets", !0), this.elements = new Kn($e, "elements"), this.plugins = new Kn(Object, "plugins"), this.scales = new Kn(rn, "scales"), this._typedRegistries = [
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
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : $t(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const s = Ya(t);
    Tt(a["before" + s], [], a), n[t](a), Tt(a["after" + s], [], a);
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
var pe = /* @__PURE__ */ new Ad();
class Td {
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
      const i = o.plugin, l = i[a], c = [
        n,
        s,
        o.options
      ];
      if (Tt(l, c, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Ct(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = mt(a.options && a.options.plugins, {}), o = Bd(a);
    return s === !1 && !n ? [] : Fd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((c) => l.plugin.id === c.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function Bd(e) {
  const t = {}, n = [], a = Object.keys(pe.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(pe.getPlugin(a[o]));
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
function Ld(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Fd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const c = l.id, d = Ld(a[c], s);
    d !== null && o.push({
      plugin: l,
      options: Pd(e.config, {
        plugin: l,
        local: n[c]
      }, d, i)
    });
  }
  return o;
}
function Pd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ra(e, t) {
  const n = It.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Ed(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Id(e, t) {
  return e === t ? "_index_" : "_value_";
}
function no(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Rd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Oa(e, ...t) {
  if (no(e))
    return e;
  for (const n of t) {
    const a = n.axis || Rd(n.position) || e.length > 1 && no(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ao(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Od(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return ao(e, "x", n[0]) || ao(e, "y", n[0]);
  }
  return {};
}
function Vd(e, t) {
  const n = Xe[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ra(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!kt(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const c = Oa(i, l, Od(i, e), It.scales[l.type]), d = Id(c, s), u = n.scales || {};
    o[i] = xn(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      l,
      u[c],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, c = i.indexAxis || Ra(l, t), u = (Xe[l] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const p = Ed(h, c), _ = i[p + "AxisID"] || p;
      o[_] = o[_] || /* @__PURE__ */ Object.create(null), xn(o[_], [
        {
          axis: p
        },
        a[_],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    xn(l, [
      It.scales[l.type],
      It.scale
    ]);
  }), o;
}
function _i(e) {
  const t = e.options || (e.options = {});
  t.plugins = mt(t.plugins, {}), t.scales = Vd(e, t);
}
function xi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function zd(e) {
  return e = e || {}, e.data = xi(e.data), _i(e), e;
}
const so = /* @__PURE__ */ new Map(), ki = /* @__PURE__ */ new Set();
function Un(e, t) {
  let n = so.get(e);
  return n || (n = t(), so.set(e, n), ki.add(n)), n;
}
const fn = (e, t, n) => {
  const a = qe(t, n);
  a !== void 0 && e.add(a);
};
class Nd {
  constructor(t) {
    this._config = zd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    return Un(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return Un(`${t}.transition.${n}`, () => [
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
    return Un(`${t}-${n}`, () => [
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
    return Un(`${a}-plugin-${n}`, () => [
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
    const c = /* @__PURE__ */ new Set();
    n.forEach((u) => {
      t && (c.add(t), u.forEach((h) => fn(c, t, h))), u.forEach((h) => fn(c, s, h)), u.forEach((h) => fn(c, Xe[o] || {}, h)), u.forEach((h) => fn(c, It, h)), u.forEach((h) => fn(c, Ea, h));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), ki.has(n) && i.set(n, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Xe[n] || {},
      It.datasets[n] || {},
      {
        type: n
      },
      It,
      Ea
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = oo(this._resolverCache, t, s);
    let c = i;
    if (Hd(i, n)) {
      o.$shared = !1, a = Re(a) ? a() : a;
      const d = this.createResolver(t, a, l);
      c = on(i, a, d);
    }
    for (const d of n)
      o[d] = c[d];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = oo(this._resolverCache, t, a);
    return kt(n) ? on(o, n, void 0, s) : o;
  }
}
function oo(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: Ja(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const jd = (e) => kt(e) && Object.getOwnPropertyNames(e).some((t) => Re(e[t]));
function Hd(e, t) {
  const { isScriptable: n, isIndexable: a } = si(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Re(l) || jd(l)) || i && Vt(l))
      return !0;
  }
  return !1;
}
var Wd = "4.5.1";
const Yd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function io(e, t) {
  return e === "top" || e === "bottom" || Yd.indexOf(e) === -1 && t === "x";
}
function lo(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function ro(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Tt(n && n.onComplete, [
    e
  ], t);
}
function Kd(e) {
  const t = e.chart, n = t.options.animation;
  Tt(n && n.onProgress, [
    e
  ], t);
}
function wi(e) {
  return ns() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Jn = {}, co = (e) => {
  const t = wi(e);
  return Object.values(Jn).filter((n) => n.canvas === t).pop();
};
function Ud(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function qd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Oe = class {
  static defaults = It;
  static instances = Jn;
  static overrides = Xe;
  static registry = pe;
  static version = Wd;
  static getChart = co;
  static register(...t) {
    pe.add(...t), uo();
  }
  static unregister(...t) {
    pe.remove(...t), uo();
  }
  constructor(t, n) {
    const a = this.config = new Nd(n), s = wi(t), o = co(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || hd(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), c = l && l.canvas, d = c && c.height, u = c && c.width;
    if (this.id = Vl(), this.ctx = l, this.canvas = c, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Td(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = sr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Jn[this.id] = this, !l || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    _e.listen(this, "complete", ro), _e.listen(this, "progress", Kd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return Ct(t) ? n && o ? o : s ? a / s : null : t;
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
    return pe;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ls(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return As(this.canvas, this.ctx), this;
  }
  stop() {
    return _e.stop(this), this;
  }
  resize(t, n) {
    _e.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Ls(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Tt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    $t(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], c = Oa(i, l), d = c === "r", u = c === "x";
      return {
        options: l,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), $t(o, (i) => {
      const l = i.options, c = l.id, d = Oa(c, l), u = mt(l.type, i.dtype);
      (l.position === void 0 || io(l.position, d) !== io(i.dposition)) && (l.position = i.dposition), s[c] = !0;
      let h = null;
      if (c in a && a[c].type === u)
        h = a[c];
      else {
        const p = pe.getScale(u);
        h = new p({
          id: c,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), $t(s, (i, l) => {
      i || delete a[l];
    }), $t(a, (i) => {
      ie.configure(this, i, i.options), ie.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(lo("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Ra(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const c = pe.getController(l), { datasetElementType: d, dataElementType: u } = It.datasets[l];
        Object.assign(c, {
          dataElementType: pe.getElement(u),
          datasetElementType: d && pe.getElement(d)
        }), i.controller = new c(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    $t(this.data.datasets, (t, n) => {
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
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: h } = this.getDatasetMeta(d), p = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || $t(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(lo("z", "_idx"));
    const { _active: l, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    $t(this.scales, (t) => {
      ie.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!ys(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      Ud(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!ys(s, a(o)))
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
    ie.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], $t(this.boxes, (s) => {
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
        this._updateDataset(n, Re(t) ? t({
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
    }) !== !1 && (_e.has(this) ? this.attached && !_e.running(this) && _e.start(this) : (this.draw(), ro({
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
    }, s = dc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && Ga(n, s), t.controller.draw(), s && Za(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Bn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = Yc.modes[n];
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
    return this.$context || (this.$context = Ge(null, {
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
    Dn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), _e.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), As(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Jn[this.id], this.notifyPlugins("afterDestroy");
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
    $t(this.options.events, (o) => a(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (c, d) => {
      n.addEventListener(this, c, d), t[c] = d;
    }, s = (c, d) => {
      t[c] && (n.removeEventListener(this, c, d), delete t[c]);
    }, o = (c, d) => {
      this.canvas && this.resize(c, d);
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
    $t(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, $t(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const s = a ? "set" : "remove";
    let o, i, l, c;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), l = 0, c = t.length; l < c; ++l) {
      i = t[l];
      const d = i && this.getDatasetMeta(i.datasetIndex).controller;
      d && d[s + "HoverStyle"](i.element, i.datasetIndex, i.index);
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
    !ea(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const s = this.options.hover, o = (c, d) => c.filter((u) => !d.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(n, t), l = a ? t : o(t, n);
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
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), c = Yl(t), d = qd(t, this._lastEvent, a, c);
    a && (this._lastEvent = null, Tt(o.onHover, [
      t,
      l,
      this
    ], this), c && Tt(o.onClick, [
      t,
      l,
      this
    ], this));
    const u = !ea(l, s);
    return (u || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = d, u;
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
function uo() {
  return $t(Oe.instances, (e) => e._plugins.invalidate());
}
function Xd(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: c } = t, { borderWidth: d, borderJoinStyle: u } = c, h = Math.min(d / i, de(a - n));
  if (e.beginPath(), e.arc(s, o, i - d / 2, a + h / 2, n - h / 2), l > 0) {
    const p = Math.min(d / l, de(a - n));
    e.arc(s, o, l + d / 2, n - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(d / 2, i * de(a - n));
    if (u === "round")
      e.arc(s, o, p, n - Mt / 2, a + Mt / 2, !0);
    else if (u === "bevel") {
      const _ = 2 * p * p, g = -_ * Math.cos(n + Mt / 2) + s, v = -_ * Math.sin(n + Mt / 2) + o, x = _ * Math.cos(a + Mt / 2) + s, m = _ * Math.sin(a + Mt / 2) + o;
      e.lineTo(g, v), e.lineTo(x, m);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Gd(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: c } = t;
  let d = s / l;
  e.beginPath(), e.arc(o, i, l, a - d, n + d), c > s ? (d = s / c, e.arc(o, i, c, n + d, a - d, !0)) : e.arc(o, i, s, n + zt, a - zt), e.closePath(), e.clip();
}
function Zd(e) {
  return Qa(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Qd(e, t, n, a) {
  const s = Zd(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (c) => {
    const d = (n - Math.min(o, c)) * a / 2;
    return Kt(c, 0, Math.min(o, d));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Kt(s.innerStart, 0, i),
    innerEnd: Kt(s.innerEnd, 0, i)
  };
}
function Qe(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function la(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: c, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + a + n - d, 0), p = u > 0 ? u + a + n + d : 0;
  let _ = 0;
  const g = s - c;
  if (a) {
    const K = u > 0 ? u - a : 0, j = h > 0 ? h - a : 0, Q = (K + j) / 2, tt = Q !== 0 ? g * Q / (Q + a) : g;
    _ = (g - tt) / 2;
  }
  const v = Math.max(1e-3, g * h - n / Mt) / h, x = (g - v) / 2, m = c + x + _, f = s - x - _, { outerStart: y, outerEnd: w, innerStart: M, innerEnd: D } = Qd(t, p, h, f - m), $ = h - y, S = h - w, F = m + y / $, T = f - w / S, B = p + M, P = p + D, E = m + M / B, N = f - D / P;
  if (e.beginPath(), o) {
    const K = (F + T) / 2;
    if (e.arc(i, l, h, F, K), e.arc(i, l, h, K, T), w > 0) {
      const ct = Qe(S, T, i, l);
      e.arc(ct.x, ct.y, w, T, f + zt);
    }
    const j = Qe(P, f, i, l);
    if (e.lineTo(j.x, j.y), D > 0) {
      const ct = Qe(P, N, i, l);
      e.arc(ct.x, ct.y, D, f + zt, N + Math.PI);
    }
    const Q = (f - D / p + (m + M / p)) / 2;
    if (e.arc(i, l, p, f - D / p, Q, !0), e.arc(i, l, p, Q, m + M / p, !0), M > 0) {
      const ct = Qe(B, E, i, l);
      e.arc(ct.x, ct.y, M, E + Math.PI, m - zt);
    }
    const tt = Qe($, m, i, l);
    if (e.lineTo(tt.x, tt.y), y > 0) {
      const ct = Qe($, F, i, l);
      e.arc(ct.x, ct.y, y, m - zt, F);
    }
  } else {
    e.moveTo(i, l);
    const K = Math.cos(F) * h + i, j = Math.sin(F) * h + l;
    e.lineTo(K, j);
    const Q = Math.cos(T) * h + i, tt = Math.sin(T) * h + l;
    e.lineTo(Q, tt);
  }
  e.closePath();
}
function Jd(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let c = t.endAngle;
  if (o) {
    la(e, t, n, a, c, s);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(l) || (c = i + (l % Pt || Pt));
  }
  return la(e, t, n, a, c, s), e.fill(), c;
}
function tu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: c } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: p, borderRadius: _ } = c, g = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, g ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let v = t.endAngle;
  if (o) {
    la(e, t, n, a, v, s);
    for (let x = 0; x < o; ++x)
      e.stroke();
    isNaN(l) || (v = i + (l % Pt || Pt));
  }
  g && Gd(e, t, v), c.selfJoin && v - i >= Mt && _ === 0 && u !== "miter" && Xd(e, t, v), o || (la(e, t, n, a, v, s), e.stroke());
}
class eu extends $e {
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
    ], a), { angle: o, distance: i } = Go(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, _ = mt(h, c - l), g = Tn(o, l, c) && l !== c, v = _ >= Pt || g, x = Te(i, d + p, u + p);
    return v && x;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: s, endAngle: o, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: c, spacing: d } = this.options, u = (s + o) / 2, h = (i + l + d + c) / 2;
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
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Pt ? Math.floor(a / Pt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const c = 1 - Math.sin(Math.min(Mt, a || 0)), d = s * c;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, Jd(t, this, d, o, i), tu(t, this, d, o, i), t.restore();
  }
}
function Ci(e, t, n = t) {
  e.lineCap = mt(n.borderCapStyle, t.borderCapStyle), e.setLineDash(mt(n.borderDash, t.borderDash)), e.lineDashOffset = mt(n.borderDashOffset, t.borderDashOffset), e.lineJoin = mt(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = mt(n.borderWidth, t.borderWidth), e.strokeStyle = mt(n.borderColor, t.borderColor);
}
function nu(e, t, n) {
  e.lineTo(n.x, n.y);
}
function au(e) {
  return e.stepped ? vr : e.tension || e.cubicInterpolationMode === "monotone" ? yr : nu;
}
function $i(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, c = Math.max(s, i), d = Math.min(o, l), u = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: c,
    loop: t.loop,
    ilen: d < c && !u ? a + d - c : d - c
  };
}
function su(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: c, ilen: d } = $i(s, n, a), u = au(o);
  let { move: h = !0, reverse: p } = a || {}, _, g, v;
  for (_ = 0; _ <= d; ++_)
    g = s[(l + (p ? d - _ : _)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : u(e, v, g, p, o.stepped), v = g);
  return c && (g = s[(l + (p ? d : 0)) % i], u(e, v, g, p, o.stepped)), !!c;
}
function ou(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = $i(s, n, a), { move: c = !0, reverse: d } = a || {};
  let u = 0, h = 0, p, _, g, v, x, m;
  const f = (w) => (i + (d ? l - w : w)) % o, y = () => {
    v !== x && (e.lineTo(u, x), e.lineTo(u, v), e.lineTo(u, m));
  };
  for (c && (_ = s[f(0)], e.moveTo(_.x, _.y)), p = 0; p <= l; ++p) {
    if (_ = s[f(p)], _.skip)
      continue;
    const w = _.x, M = _.y, D = w | 0;
    D === g ? (M < v ? v = M : M > x && (x = M), u = (h * u + w) / ++h) : (y(), e.lineTo(w, M), g = D, h = 0, v = x = M), m = M;
  }
  y();
}
function Va(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? ou : su;
}
function iu(e) {
  return e.stepped ? Zr : e.tension || e.cubicInterpolationMode === "monotone" ? Qr : We;
}
function lu(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), Ci(e, t.options), e.stroke(s);
}
function ru(e, t, n, a) {
  const { segments: s, options: o } = t, i = Va(t);
  for (const l of s)
    Ci(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const cu = typeof Path2D == "function";
function du(e, t, n, a) {
  cu && !t.options.segment ? lu(e, t, n, a) : ru(e, t, n, a);
}
class uu extends $e {
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
      Hr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = ic(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = ac(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], c = iu(a);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: p } = i[d], _ = o[h], g = o[p];
      if (_ === g) {
        l.push(_);
        continue;
      }
      const v = Math.abs((s - _[n]) / (g[n] - _[n])), x = c(_, g, v, a.stepped);
      x[n] = t[n], l.push(x);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Va(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Va(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), du(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function ho(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class hu extends $e {
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
    return ho(this, t, "x", n);
  }
  inYRange(t, n) {
    return ho(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Bn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ia(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Mi(e, t) {
  const { x: n, y: a, base: s, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, c, d, u, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, s), c = Math.max(n, s), d = a - h, u = a + h) : (h = o / 2, l = n - h, c = n + h, d = Math.min(a, s), u = Math.max(a, s)), {
    left: l,
    top: d,
    right: c,
    bottom: u
  };
}
function Le(e, t, n, a) {
  return e ? 0 : Kt(t, n, a);
}
function fu(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = ai(a);
  return {
    t: Le(s.top, o.top, 0, n),
    r: Le(s.right, o.right, 0, t),
    b: Le(s.bottom, o.bottom, 0, n),
    l: Le(s.left, o.left, 0, t)
  };
}
function gu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = en(s), i = Math.min(t, n), l = e.borderSkipped, c = a || kt(s);
  return {
    topLeft: Le(!c || l.top || l.left, o.topLeft, 0, i),
    topRight: Le(!c || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Le(!c || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Le(!c || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function pu(e) {
  const t = Mi(e), n = t.right - t.left, a = t.bottom - t.top, s = fu(e, n / 2, a / 2), o = gu(e, n / 2, a / 2);
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
function $a(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && Mi(e, a);
  return l && (s || Te(t, l.left, l.right)) && (o || Te(n, l.top, l.bottom));
}
function mu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function bu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Ma(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class vu extends $e {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = pu(this), l = mu(i.radius) ? sa : bu;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, Ma(i, n, o)), t.clip(), l(t, Ma(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, Ma(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return $a(this, t, n, a);
  }
  inXRange(t, n) {
    return $a(this, t, null, n);
  }
  inYRange(t, n) {
    return $a(this, null, t, n);
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
const fo = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, yu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class go extends $e {
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
    let n = Tt(t.generateLabels, [
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
    const a = t.labels, s = Ut(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: c } = fo(a, o);
    let d, u;
    n.font = s.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, l, c) + 10) : (u = this.maxHeight, d = this._fitCols(i, s, l, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, _ = -u;
    return this.legendItems.forEach((g, v) => {
      const x = a + n / 2 + o.measureText(g.text).width;
      (v === 0 || d[d.length - 1] + x + 2 * l > i) && (h += u, d[d.length - (v > 0 ? 0 : 1)] = 0, _ += u, p++), c[v] = {
        left: 0,
        top: _,
        row: p,
        width: x,
        height: s
      }, d[d.length - 1] += x + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = l, p = 0, _ = 0, g = 0, v = 0;
    return this.legendItems.forEach((x, m) => {
      const { itemWidth: f, itemHeight: y } = _u(a, n, o, x, s);
      m > 0 && _ + y + 2 * l > u && (h += p + l, d.push({
        width: p,
        height: _
      }), g += p + l, v++, p = _ = 0), c[m] = {
        left: g,
        top: _,
        col: v,
        width: f,
        height: y
      }, p = Math.max(p, f), _ += y + l;
    }), h += p, d.push({
      width: p,
      height: _
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = nn(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, c = Wt(a, this.left + s, this.right - this.lineWidths[l]);
      for (const d of n)
        l !== d.row && (l = d.row, c = Wt(a, this.left + s, this.right - this.lineWidths[l])), d.top += this.top + t + s, d.left = i.leftForLtr(i.x(c), d.width), c += d.width + s;
    } else {
      let l = 0, c = Wt(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const d of n)
        d.col !== l && (l = d.col, c = Wt(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), d.top = c, d.left += this.left + s, d.left = i.leftForLtr(i.x(d.left), d.width), c += d.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ga(t, this), this._draw(), Za(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = It.color, c = nn(t.rtl, this.left, this.width), d = Ut(i.font), { padding: u } = i, h = d.size, p = h / 2;
    let _;
    this.drawTitle(), s.textAlign = c.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = d.string;
    const { boxWidth: g, boxHeight: v, itemHeight: x } = fo(i, h), m = function(D, $, S) {
      if (isNaN(g) || g <= 0 || isNaN(v) || v < 0)
        return;
      s.save();
      const F = mt(S.lineWidth, 1);
      if (s.fillStyle = mt(S.fillStyle, l), s.lineCap = mt(S.lineCap, "butt"), s.lineDashOffset = mt(S.lineDashOffset, 0), s.lineJoin = mt(S.lineJoin, "miter"), s.lineWidth = F, s.strokeStyle = mt(S.strokeStyle, l), s.setLineDash(mt(S.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: S.pointStyle,
          rotation: S.rotation,
          borderWidth: F
        }, B = c.xPlus(D, g / 2), P = $ + p;
        ni(s, T, B, P, i.pointStyleWidth && g);
      } else {
        const T = $ + Math.max((h - v) / 2, 0), B = c.leftForLtr(D, g), P = en(S.borderRadius);
        s.beginPath(), Object.values(P).some((E) => E !== 0) ? sa(s, {
          x: B,
          y: T,
          w: g,
          h: v,
          radius: P
        }) : s.rect(B, T, g, v), s.fill(), F !== 0 && s.stroke();
      }
      s.restore();
    }, f = function(D, $, S) {
      Ln(s, S.text, D, $ + x / 2, d, {
        strikethrough: S.hidden,
        textAlign: c.textAlign(S.textAlign)
      });
    }, y = this.isHorizontal(), w = this._computeTitleHeight();
    y ? _ = {
      x: Wt(o, this.left + u, this.right - a[0]),
      y: this.top + u + w,
      line: 0
    } : _ = {
      x: this.left + u,
      y: Wt(o, this.top + w + u, this.bottom - n[0].height),
      line: 0
    }, ci(this.ctx, t.textDirection);
    const M = x + u;
    this.legendItems.forEach((D, $) => {
      s.strokeStyle = D.fontColor, s.fillStyle = D.fontColor;
      const S = s.measureText(D.text).width, F = c.textAlign(D.textAlign || (D.textAlign = i.textAlign)), T = g + p + S;
      let B = _.x, P = _.y;
      c.setWidth(this.width), y ? $ > 0 && B + T + u > this.right && (P = _.y += M, _.line++, B = _.x = Wt(o, this.left + u, this.right - a[_.line])) : $ > 0 && P + M > this.bottom && (B = _.x = B + n[_.line].width + u, _.line++, P = _.y = Wt(o, this.top + w + u, this.bottom - n[_.line].height));
      const E = c.x(B);
      if (m(E, P, D), B = or(F, B + g + p, y ? B + T : this.right, t.rtl), f(c.x(B), P, D), y)
        _.x += T + u;
      else if (typeof D.text != "string") {
        const N = d.lineHeight;
        _.y += Si(D, N) + u;
      } else
        _.y += M;
    }), di(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Ut(n.font), s = re(n.padding);
    if (!n.display)
      return;
    const o = nn(t.rtl, this.left, this.width), i = this.ctx, l = n.position, c = a.size / 2, d = s.top + c;
    let u, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, h = Wt(t.align, h, this.right - p);
    else {
      const g = this.columnSizes.reduce((v, x) => Math.max(v, x.height), 0);
      u = d + Wt(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const _ = Wt(l, h, h + p);
    i.textAlign = o.textAlign(Ua(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Ln(i, n.text, _, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Ut(t.font), a = re(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (Te(t, this.left, this.right) && Te(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], Te(t, s.left, s.left + s.width) && Te(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!wu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = yu(s, a);
      s && !o && Tt(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && Tt(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Tt(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function _u(e, t, n, a, s) {
  const o = xu(a, e, t, n), i = ku(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function xu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function ku(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Si(t, n)), a;
}
function Si(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function wu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var os = {
  id: "legend",
  _element: go,
  start(e, t, n) {
    const a = e.legend = new go({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ie.configure(e, a, n), ie.addBox(e, a);
  },
  stop(e) {
    ie.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ie.configure(e, a, n), a.options = n;
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
        return e._getSortedDatasetMetas().map((c) => {
          const d = c.controller.getStyle(n ? 0 : void 0), u = re(d.borderWidth);
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
            pointStyle: a || d.pointStyle,
            rotation: d.rotation,
            textAlign: s || d.textAlign,
            borderRadius: i && (l || d.borderRadius),
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
class Di extends $e {
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
    const s = Vt(a.text) ? a.text.length : 1;
    this._padding = re(a.padding);
    const o = s * Ut(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let c = 0, d, u, h;
    return this.isHorizontal() ? (u = Wt(l, a, o), h = n + t, d = o - a) : (i.position === "left" ? (u = a + t, h = Wt(l, s, n), c = Mt * -0.5) : (u = o - t, h = Wt(l, n, s), c = Mt * 0.5), d = s - n), {
      titleX: u,
      titleY: h,
      maxWidth: d,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = Ut(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: c, rotation: d } = this._drawArgs(o);
    Ln(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: c,
      rotation: d,
      textAlign: Ua(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function Cu(e, t) {
  const n = new Di({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ie.configure(e, n, t), ie.addBox(e, n), e.titleBlock = n;
}
var Ai = {
  id: "title",
  _element: Di,
  start(e, t, n) {
    Cu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ie.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ie.configure(e, a, n), a.options = n;
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
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const c = l.tooltipPosition();
        a.add(c.x), s += c.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, c) => l + c) / a.size,
      y: s / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, s = Number.POSITIVE_INFINITY, o, i, l;
    for (o = 0, i = e.length; o < i; ++o) {
      const c = e[o].element;
      if (c && c.hasValue()) {
        const d = c.getCenterPoint(), u = Pa(t, d);
        u < s && (s = u, l = c);
      }
    }
    if (l) {
      const c = l.tooltipPosition();
      n = c.x, a = c.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function ge(e, t) {
  return t && (Vt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function xe(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function $u(e, t) {
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
function po(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, c = Ut(t.bodyFont), d = Ut(t.titleFont), u = Ut(t.footerFont), h = o.length, p = s.length, _ = a.length, g = re(t.padding);
  let v = g.height, x = 0, m = a.reduce((w, M) => w + M.before.length + M.lines.length + M.after.length, 0);
  if (m += e.beforeBody.length + e.afterBody.length, h && (v += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), m) {
    const w = t.displayColors ? Math.max(l, c.lineHeight) : c.lineHeight;
    v += _ * w + (m - _) * c.lineHeight + (m - 1) * t.bodySpacing;
  }
  p && (v += t.footerMarginTop + p * u.lineHeight + (p - 1) * t.footerSpacing);
  let f = 0;
  const y = function(w) {
    x = Math.max(x, n.measureText(w).width + f);
  };
  return n.save(), n.font = d.string, $t(e.title, y), n.font = c.string, $t(e.beforeBody.concat(e.afterBody), y), f = t.displayColors ? i + 2 + t.boxPadding : 0, $t(a, (w) => {
    $t(w.before, y), $t(w.lines, y), $t(w.after, y);
  }), f = 0, n.font = u.string, $t(e.footer, y), n.restore(), x += g.width, {
    width: x,
    height: v
  };
}
function Mu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Su(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function Du(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: c } } = e;
  let d = "center";
  return a === "center" ? d = s <= (l + c) / 2 ? "left" : "right" : s <= o / 2 ? d = "left" : s >= i - o / 2 && (d = "right"), Su(d, e, t, n) && (d = "center"), d;
}
function mo(e, t, n) {
  const a = n.yAlign || t.yAlign || Mu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Du(e, t, n, a),
    yAlign: a
  };
}
function Au(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Tu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function bo(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: c } = n, d = s + o, { topLeft: u, topRight: h, bottomLeft: p, bottomRight: _ } = en(i);
  let g = Au(t, l);
  const v = Tu(t, c, d);
  return c === "center" ? l === "left" ? g += d : l === "right" && (g -= d) : l === "left" ? g -= Math.max(u, p) + s : l === "right" && (g += Math.max(h, _) + s), {
    x: Kt(g, 0, a.width - t.width),
    y: Kt(v, 0, a.height - t.height)
  };
}
function qn(e, t, n) {
  const a = re(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function vo(e) {
  return ge([], xe(e));
}
function Bu(e, t, n) {
  return Ge(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function yo(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Ti = {
  beforeTitle: ye,
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
  afterTitle: ye,
  beforeBody: ye,
  beforeLabel: ye,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Ct(n) || (t += n), t;
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
  afterLabel: ye,
  afterBody: ye,
  beforeFooter: ye,
  footer: ye,
  afterFooter: ye
};
function Xt(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Ti[t].call(n, a) : s;
}
class _o extends $e {
  static positioners = yn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new hi(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Bu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = Xt(a, "beforeTitle", this, t), o = Xt(a, "title", this, t), i = Xt(a, "afterTitle", this, t);
    let l = [];
    return l = ge(l, xe(s)), l = ge(l, xe(o)), l = ge(l, xe(i)), l;
  }
  getBeforeBody(t, n) {
    return vo(Xt(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return $t(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = yo(a, o);
      ge(i.before, xe(Xt(l, "beforeLabel", this, o))), ge(i.lines, Xt(l, "label", this, o)), ge(i.after, xe(Xt(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return vo(Xt(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = Xt(a, "beforeFooter", this, t), o = Xt(a, "footer", this, t), i = Xt(a, "afterFooter", this, t);
    let l = [];
    return l = ge(l, xe(s)), l = ge(l, xe(o)), l = ge(l, xe(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], c, d;
    for (c = 0, d = n.length; c < d; ++c)
      l.push($u(this.chart, n[c]));
    return t.filter && (l = l.filter((u, h, p) => t.filter(u, h, p, a))), t.itemSort && (l = l.sort((u, h) => t.itemSort(u, h, a))), $t(l, (u) => {
      const h = yo(t.callbacks, u);
      s.push(Xt(h, "labelColor", this, u)), o.push(Xt(h, "labelPointStyle", this, u)), i.push(Xt(h, "labelTextColor", this, u));
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
      const l = yn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const c = this._size = po(this, a), d = Object.assign({}, l, c), u = mo(this.chart, a, d), h = bo(a, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: c.width,
        height: c.height,
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: c, topRight: d, bottomLeft: u, bottomRight: h } = en(l), { x: p, y: _ } = t, { width: g, height: v } = n;
    let x, m, f, y, w, M;
    return o === "center" ? (w = _ + v / 2, s === "left" ? (x = p, m = x - i, y = w + i, M = w - i) : (x = p + g, m = x + i, y = w - i, M = w + i), f = x) : (s === "left" ? m = p + Math.max(c, u) + i : s === "right" ? m = p + g - Math.max(d, h) - i : m = this.caretX, o === "top" ? (y = _, w = y - i, x = m - i, f = m + i) : (y = _ + v, w = y + i, x = m + i, f = m - i), M = y), {
      x1: x,
      x2: m,
      x3: f,
      y1: y,
      y2: w,
      y3: M
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, c;
    if (o) {
      const d = nn(a.rtl, this.x, this.width);
      for (t.x = qn(this, a.titleAlign, a), n.textAlign = d.textAlign(a.titleAlign), n.textBaseline = "middle", i = Ut(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, c = 0; c < o; ++c)
        n.fillText(s[c], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, c + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: c, boxWidth: d } = o, u = Ut(o.bodyFont), h = qn(this, "left", o), p = s.x(h), _ = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, g = n.y + _;
    if (o.usePointStyle) {
      const v = {
        radius: Math.min(d, c) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, x = s.leftForLtr(p, d) + d / 2, m = g + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ia(t, v, x, m), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ia(t, v, x, m);
    } else {
      t.lineWidth = kt(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const v = s.leftForLtr(p, d), x = s.leftForLtr(s.xPlus(p, 1), d - 2), m = en(i.borderRadius);
      Object.values(m).some((f) => f !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, sa(t, {
        x: v,
        y: g,
        w: d,
        h: c,
        radius: m
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), sa(t, {
        x,
        y: g + 1,
        w: d - 2,
        h: c - 2,
        radius: m
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(v, g, d, c), t.strokeRect(v, g, d, c), t.fillStyle = i.backgroundColor, t.fillRect(x, g + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: c, boxWidth: d, boxPadding: u } = a, h = Ut(a.bodyFont);
    let p = h.lineHeight, _ = 0;
    const g = nn(a.rtl, this.x, this.width), v = function(S) {
      n.fillText(S, g.x(t.x + _), t.y + p / 2), t.y += p + o;
    }, x = g.textAlign(i);
    let m, f, y, w, M, D, $;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = qn(this, x, a), n.fillStyle = a.bodyColor, $t(this.beforeBody, v), _ = l && x !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, w = 0, D = s.length; w < D; ++w) {
      for (m = s[w], f = this.labelTextColors[w], n.fillStyle = f, $t(m.before, v), y = m.lines, l && y.length && (this._drawColorBox(n, t, w, g, a), p = Math.max(h.lineHeight, c)), M = 0, $ = y.length; M < $; ++M)
        v(y[M]), p = h.lineHeight;
      $t(m.after, v);
    }
    _ = 0, p = h.lineHeight, $t(this.afterBody, v), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const c = nn(a.rtl, this.x, this.width);
      for (t.x = qn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = c.textAlign(a.footerAlign), n.textBaseline = "middle", i = Ut(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: c } = t, { width: d, height: u } = a, { topLeft: h, topRight: p, bottomLeft: _, bottomRight: g } = en(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, c), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + d - p, c), n.quadraticCurveTo(l + d, c, l + d, c + p), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + d, c + u - g), n.quadraticCurveTo(l + d, c + u, l + d - g, c + u), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + _, c + u), n.quadraticCurveTo(l, c + u, l, c + u - _), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, c + h), n.quadraticCurveTo(l, c, l + h, c), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = yn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = po(this, t), c = Object.assign({}, i, this._size), d = mo(n, t, c), u = bo(t, c, d, n);
      (s._to !== u.x || o._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
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
    const i = re(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), ci(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), di(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, s = t.map(({ datasetIndex: l, index: c }) => {
      const d = this.chart.getDatasetMeta(l);
      if (!d)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: d.data[c],
        index: c
      };
    }), o = !ea(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), c = n || !ea(i, o) || l;
    return c && (this._active = i, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), c;
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
    const { caretX: a, caretY: s, options: o } = this, i = yn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var is = {
  id: "tooltip",
  _element: _o,
  positioners: yn,
  afterInit(e, t, n) {
    n && (e.tooltip = new _o({
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
const Lu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Fu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return Lu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const Pu = (e, t) => e === null ? null : Kt(Math.round(e), 0, t);
function xo(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Bi extends rn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: xo
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
    if (Ct(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Fu(a, t, mt(n, t), this._addedLabels), Pu(n, a.length - 1);
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
    return xo.call(this, t);
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
function Eu(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: c, count: d, maxTicks: u, maxDigits: h, includeBounds: p } = e, _ = o || 1, g = u - 1, { min: v, max: x } = t, m = !Ct(i), f = !Ct(l), y = !Ct(d), w = (x - v) / (h + 1);
  let M = xs((x - v) / g / _) * _, D, $, S, F;
  if (M < 1e-14 && !m && !f)
    return [
      {
        value: v
      },
      {
        value: x
      }
    ];
  F = Math.ceil(x / M) - Math.floor(v / M), F > g && (M = xs(F * M / g / _) * _), Ct(c) || (D = Math.pow(10, c), M = Math.ceil(M * D) / D), s === "ticks" ? ($ = Math.floor(v / M) * M, S = Math.ceil(x / M) * M) : ($ = v, S = x), m && f && o && Gl((l - i) / o, M / 1e3) ? (F = Math.round(Math.min((l - i) / M, u)), M = (l - i) / F, $ = i, S = l) : y ? ($ = m ? i : $, S = f ? l : S, F = d - 1, M = (S - $) / F) : (F = (S - $) / M, kn(F, Math.round(F), M / 1e3) ? F = Math.round(F) : F = Math.ceil(F));
  const T = Math.max(ks(M), ks($));
  D = Math.pow(10, Ct(c) ? T : c), $ = Math.round($ * D) / D, S = Math.round(S * D) / D;
  let B = 0;
  for (m && (p && $ !== i ? (n.push({
    value: i
  }), $ < i && B++, kn(Math.round(($ + B * M) * D) / D, i, ko(i, w, e)) && B++) : $ < i && B++); B < F; ++B) {
    const P = Math.round(($ + B * M) * D) / D;
    if (f && P > l)
      break;
    n.push({
      value: P
    });
  }
  return f && p && S !== l ? n.length && kn(n[n.length - 1].value, l, ko(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!f || S === l) && n.push({
    value: S
  }), n;
}
function ko(e, t, { horizontal: n, minRotation: a }) {
  const s = we(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Iu extends rn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Ct(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (c) => s = n ? s : c, l = (c) => o = a ? o : c;
    if (t) {
      const c = me(s), d = me(o);
      c < 0 && d < 0 ? l(0) : c > 0 && d > 0 && i(0);
    }
    if (s === o) {
      let c = o === 0 ? 1 : Math.abs(o * 0.05);
      l(o + c), t || i(s - c);
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
    }, o = this._range || this, i = Eu(s, o);
    return t.bounds === "ticks" && Zl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return Xa(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Li extends Iu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ei.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = le(t) ? t : 0, this.max = le(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = we(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const fa = {
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
}, Qt = /* @__PURE__ */ Object.keys(fa);
function wo(e, t) {
  return e - t;
}
function Co(e, t) {
  if (Ct(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), le(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (An(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function $o(e, t, n, a) {
  const s = Qt.length;
  for (let o = Qt.indexOf(e); o < s - 1; ++o) {
    const i = fa[Qt[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return Qt[o];
  }
  return Qt[s - 1];
}
function Ru(e, t, n, a, s) {
  for (let o = Qt.length - 1; o >= Qt.indexOf(n); o--) {
    const i = Qt[o];
    if (fa[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return Qt[n ? Qt.indexOf(n) : 0];
}
function Ou(e) {
  for (let t = Qt.indexOf(e) + 1, n = Qt.length; t < n; ++t)
    if (fa[Qt[t]].common)
      return Qt[t];
}
function Mo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = Ka(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Vu(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, c;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    c = n[l], c >= 0 && (t[c].major = !0);
  return t;
}
function So(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Vu(e, a, s, n);
}
class Do extends rn {
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
    const a = t.time || (t.time = {}), s = this._adapter = new zc._date(t.adapters.date);
    s.init(n), xn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Co(this, t);
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
    function c(d) {
      !i && !isNaN(d.min) && (s = Math.min(s, d.min)), !l && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!i || !l) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), s = le(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = le(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const o = this.min, i = this.max, l = nr(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? $o(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Ru(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Ou(this._unit), this.initOffsets(s), t.reverse && l.reverse(), So(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Kt(n, 0, i), a = Kt(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || $o(o.minUnit, n, a, this._getLabelCapacity(n)), l = mt(s.ticks.stepSize, 1), c = i === "week" ? o.isoWeekday : !1, d = An(c) || c === !0, u = {};
    let h = n, p, _;
    if (d && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, d ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, _ = 0; p < a; p = +t.add(p, l, i), _++)
      Mo(u, p, g);
    return (p === a || s.bounds === "ticks" || _ === 1) && Mo(u, p, g), Object.keys(u).sort(wo).map((v) => +v);
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
      return Tt(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, c = this._unit, d = this._majorUnit, u = c && l[c], h = d && l[d], p = a[n], _ = d && h && p && p.major;
    return this._adapter.format(t, s || (_ ? h : u));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = we(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, So(this, [
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
      t.push(Co(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Qo(t.sort(wo));
  }
}
function Xn(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, c;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = Ye(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: c } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = Ye(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: c } = e[s]);
  const d = i - o;
  return d ? l + (c - l) * (t - o) / d : l;
}
class T$ extends Do {
  static id = "timeseries";
  static defaults = Do.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = Xn(n, this.min), this._tableRange = Xn(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, s = [], o = [];
    let i, l, c, d, u;
    for (i = 0, l = t.length; i < l; ++i)
      d = t[i], d >= n && d <= a && s.push(d);
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
      u = s[i + 1], c = s[i - 1], d = s[i], Math.round((u + c) / 2) !== d && o.push({
        time: d,
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
    return (Xn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return Xn(this._table, a * this._tableRange + this._minPos, !0);
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
}, zu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Nu = {
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
  ...zu
}, ju = dl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Je(e) {
  return No(e) ? La(e) : e;
}
function Hu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return No(t) ? new Proxy(e, {}) : e;
}
function Wu(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Pi(e, t) {
  e.labels = t;
}
function Ei(e, t, n) {
  const a = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[n] === s[n]);
    return !o || !s.data || a.includes(o) ? {
      ...s
    } : (a.push(o), Object.assign(o, s), o);
  });
}
function Yu(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Pi(n, e.labels), Ei(n, e.datasets, t), n;
}
const Ku = J({
  props: Nu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = ot(null), o = zo(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: d, data: u, options: h, plugins: p, datasetIdKey: _ } = e, g = Yu(u, _), v = Hu(g, u);
      o.value = new Oe(s.value, {
        type: d,
        data: v,
        options: {
          ...h
        },
        plugins: p
      });
    }, l = () => {
      const d = La(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, c = (d) => {
      d.update(e.updateMode);
    };
    return te(i), ue(l), Bt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, p] = d, [_, g] = u;
      const v = La(o.value);
      if (!v)
        return;
      let x = !1;
      if (h) {
        const m = Je(h), f = Je(_);
        m && m !== f && (Wu(v, m), x = !0);
      }
      if (p) {
        const m = Je(p.labels), f = Je(g.labels), y = Je(p.datasets), w = Je(g.datasets);
        m !== f && (Pi(v.config.data, m), x = !0), y && y !== w && (Ei(v.config.data, y, e.datasetIdKey), x = !0);
      }
      x && Ot(() => {
        c(v);
      });
    }, {
      deep: !0
    }), () => Ba("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      Ba("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ls(e, t) {
  return Oe.register(t), J({
    props: Fi,
    setup(n, a) {
      let { expose: s } = a;
      const o = zo(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => Ba(Ku, ju({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Uu = /* @__PURE__ */ ls("bar", Ec), qu = /* @__PURE__ */ ls("line", Oc), Xu = /* @__PURE__ */ ls("pie", Vc), Ao = {
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
}, To = {
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
}, Gu = [
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
function gt(e) {
  const t = ot("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = C(() => e?.value ? e.value : t.value), o = C(() => s.value === "dark"), i = C(() => o.value ? To : Ao), l = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((d) => {
      for (const u of d)
        u.attributeName === "class" && (t.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, c = () => {
    n && (n.disconnect(), n = null);
  };
  return te(() => {
    l();
  }), ue(() => {
    c();
  }), e && Bt(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ao,
    darkColors: To,
    chartSeriesColors: Gu
  };
}
const rs = 5, cs = 8, Zu = /^x\d*$/, Qu = /^y\d*$/;
function Ii(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, c = l && typeof l == "object" ? { ...l } : {};
    Zu.test(s) && (c.maxTicksLimit = cs, c.autoSkip = !0, c.minRotation = 0, c.maxRotation = 0, c.autoSkipPadding = c.autoSkipPadding ?? 8), Qu.test(s) && (c.maxTicksLimit = rs), i.ticks = c, a[s] = i;
  }
  return t.scales = a, t;
}
const Gt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ju = ["titleFont", "bodyFont", "footerFont"];
function Ri(e, t = Gt) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const s = { ...n.scales };
    for (const o of Object.keys(s)) {
      const i = s[o];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, c = l.ticks;
      if (c && typeof c == "object") {
        const u = { ...c }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, l.ticks = u;
      }
      const d = l.title;
      if (d && typeof d == "object") {
        const u = { ...d }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, l.title = u;
      }
      s[o] = l;
    }
    n.scales = s;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const s = { ...n.plugins }, o = s.legend;
    if (o && typeof o == "object") {
      const l = { ...o }, c = l.labels;
      if (c && typeof c == "object") {
        const d = { ...c }, u = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...u, family: t }, l.labels = d;
      }
      s.legend = l;
    }
    const i = s.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const c of Ju) {
        const d = l[c];
        d && typeof d == "object" && (l[c] = { ...d, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const th = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bo = 10, eh = /* @__PURE__ */ J({
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
    Oe.register(Bi, Li, vu, Ai, is, os), Oe.defaults.font.family = Gt;
    const { isDark: a, colors: s } = gt(ft(n, "theme")), o = C(() => n.data), i = (u) => typeof u == "string" ? u.charAt(0).toUpperCase() + u.slice(1).toLowerCase() : u, l = (u) => typeof u != "string" ? u : n.uppercaseLegendLabels ? u.toUpperCase() : i(u);
    function c(u, h) {
      if (h == null) return u;
      if (Array.isArray(h) || typeof h != "object" || u == null || Array.isArray(u) || typeof u != "object") return h;
      const p = { ...u };
      for (const _ of Object.keys(h)) {
        const g = h[_];
        g !== void 0 && (p[_] = c(u[_], g));
      }
      return p;
    }
    const d = C(() => {
      const u = {
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
              boxWidth: Bo,
              boxHeight: Bo,
              usePointStyle: !1,
              generateLabels: function(p) {
                return p.data.datasets.map((g, v) => {
                  const x = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, m = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, f = typeof m == "string" && m.length > 0 ? m : typeof x == "string" && x.length > 0 ? x : s.value.textSecondary;
                  return {
                    text: l(g.label || ""),
                    fillStyle: typeof x == "string" ? x : f,
                    strokeStyle: f,
                    lineWidth: 0,
                    fontColor: f,
                    hidden: !p.isDatasetVisible(v),
                    index: v,
                    datasetIndex: v
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
                let _ = String(i(p.dataset.label || ""));
                return _ && (_ += ": "), p.parsed.y !== null && (_ += p.parsed.y), _;
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
              maxTicksLimit: rs,
              font: {
                family: Gt,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
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
              maxTicksLimit: cs,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Gt,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(p) {
                const _ = this.getLabelForValue(p);
                return i(_);
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
      }, h = n.options ? c(u, n.options) : u;
      return Ri(
        Ii(h)
      );
    });
    return t({ isDark: a }), (u, h) => (b(), k("div", th, [
      V(L(Uu), {
        data: o.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), lt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, be = /* @__PURE__ */ lt(eh, [["__scopeId", "data-v-ee7ca6f2"]]), nh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, ah = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, sh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, oh = ["aria-pressed", "aria-label", "onClick"], ih = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, lh = /* @__PURE__ */ J({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Oe.register(
      Bi,
      Li,
      hu,
      uu,
      Ai,
      is,
      os
    ), Oe.defaults.font.family = Gt;
    const a = ot(null), { isDark: s, colors: o } = gt(ft(n, "theme")), i = C(() => o.value.bgCard), l = C(() => {
      const x = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((m) => {
          const f = m.borderColor, y = Array.isArray(f) ? f[0] : f, w = typeof y == "string" && y.length > 0 ? y : o.value.textSecondary, M = m.pointBackgroundColor !== void 0 ? m.pointBackgroundColor : x, D = m.pointHoverBackgroundColor !== void 0 ? m.pointHoverBackgroundColor : M, $ = m.pointBorderWidth ?? 2, S = m.pointHoverBorderWidth ?? $;
          return {
            ...m,
            fill: m.fill ?? !1,
            pointBackgroundColor: M,
            pointHoverBackgroundColor: D,
            pointBorderColor: m.pointBorderColor ?? w,
            pointHoverBorderColor: m.pointHoverBorderColor ?? w,
            pointBorderWidth: $,
            pointHoverBorderWidth: S
          };
        })
      };
    }), c = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, d = (x) => typeof x != "string" ? x : n.uppercaseLegendLabels ? x.toUpperCase() : c(x);
    function u(x) {
      const m = x.borderColor, f = Array.isArray(m) ? m[0] : m;
      return typeof f == "string" && f.length > 0 ? f : o.value.textSecondary;
    }
    const h = C(
      () => l.value.datasets.map((x, m) => ({
        key: `${x.label ?? "dataset"}-${m}`,
        label: d(x.label || ""),
        color: u(x)
      }))
    ), p = ot([]);
    Bt(
      () => l.value.datasets.length,
      (x) => {
        const m = Array.from({ length: x }, (f, y) => p.value[y] ?? !0);
        p.value = m;
      },
      { immediate: !0 }
    );
    function _(x) {
      const f = a.value?.chart;
      if (!f || x < 0 || x >= f.data.datasets.length) return;
      const y = !f.isDatasetVisible(x);
      f.setDatasetVisibility(x, y), p.value[x] = y, f.update();
    }
    function g(x, m) {
      if (m == null) return x;
      if (Array.isArray(m) || typeof m != "object" || x == null || Array.isArray(x) || typeof x != "object") return m;
      const f = { ...x };
      for (const y of Object.keys(m)) {
        const w = m[y];
        w !== void 0 && (f[y] = g(x[y], w));
      }
      return f;
    }
    const v = C(() => {
      const x = {
        font: {
          family: Gt
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
              family: Gt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: Gt,
              size: 13
            },
            callbacks: {
              title: function(y) {
                return y.length > 0 ? String(c(y[0].label)) : "";
              },
              label: function(y) {
                let w = String(c(y.dataset.label || ""));
                return w && (w += ": "), y.parsed.y !== null && (w += y.parsed.y), w;
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
              maxTicksLimit: cs,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Gt,
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
              maxTicksLimit: rs,
              font: {
                family: Gt,
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
      }, m = n.options ? g(x, n.options) : x;
      return Ri(
        Ii(m)
      );
    });
    return t({ isDark: s }), (x, m) => (b(), k("div", nh, [
      r("div", ah, [
        V(L(qu), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: v.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (b(), k("ul", sh, [
        (b(!0), k(X, null, it(h.value, (f, y) => (b(), k("li", {
          key: f.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: Y(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", p.value[y] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: pt({ color: f.color }),
            "aria-pressed": p.value[y] !== !1,
            "aria-label": `${f.label}. ${p.value[y] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => _(y)
          }, [
            r("span", ih, [
              m[0] || (m[0] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              r("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: pt({ borderColor: f.color })
              }, null, 4),
              m[1] || (m[1] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            r("span", null, A(f.label), 1)
          ], 14, oh)
        ]))), 128))
      ])) : O("", !0)
    ]));
  }
}), he = /* @__PURE__ */ lt(lh, [["__scopeId", "data-v-fc764ffb"]]), rh = { class: "chart-container" }, ch = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", dh = /* @__PURE__ */ J({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Oe.register(eu, is, os);
    const { isDark: a, colors: s } = gt(ft(n, "theme")), o = n.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, l = C(() => n.options ? n.options : {
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
              family: ch,
              size: 13,
              weight: 500
            },
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(c) {
              const d = c.data;
              return d.labels.length && d.datasets.length ? d.labels.map((u, h) => {
                const _ = c.getDatasetMeta(0).controller.getStyle(h), v = d.datasets[0].data[h], x = typeof _.backgroundColor == "string" && _.backgroundColor.length > 0 ? _.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(u)}: ${v}`,
                  fillStyle: _.backgroundColor,
                  strokeStyle: _.borderColor,
                  lineWidth: _.borderWidth,
                  lineDash: _.borderDash,
                  lineDashOffset: _.borderDashOffset,
                  lineJoin: _.borderJoinStyle,
                  fontColor: x,
                  hidden: !c.getDataVisibility(h),
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
            title: function(c) {
              return c.length > 0 ? String(i(c[0].label)) : "";
            },
            label: function(c) {
              const d = c.label || "", u = c.parsed || 0, h = c.dataset.data.reduce((_, g) => _ + g, 0), p = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${p}%)`;
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
    return t({ isDark: a }), (c, d) => (b(), k("div", rh, [
      V(L(Xu), {
        data: L(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ga = /* @__PURE__ */ lt(dh, [["__scopeId", "data-v-0f7806d6"]]), uh = { class: "chart-container" }, hh = ["viewBox"], fh = ["transform"], gh = ["x", "width", "fill", "stroke"], ph = ["fill"], mh = ["x1", "y1", "x2", "y2", "stroke"], bh = ["points", "fill"], vh = ["x1", "y1", "x2", "y2", "stroke"], yh = ["x", "y", "fill"], _h = ["x1", "y1", "x2", "y2", "stroke"], xh = ["points", "fill"], kh = ["transform"], wh = ["y1", "y2"], Ch = ["y1", "y2"], $h = ["y1", "y2"], Mh = ["y1", "y2"], Sh = ["y", "height"], Dh = ["y1", "y2"], Ah = ["y1", "y2"], Th = ["y1", "y2"], Bh = ["y1", "y2"], Lh = ["y", "height"], Fh = ["cy", "stroke", "onMouseenter"], Ph = ["cy", "stroke", "onMouseenter"], Eh = ["cy", "stroke", "onMouseenter"], Ih = ["cy", "stroke", "onMouseenter"], Rh = ["y1", "y2", "onMouseenter"], Oh = ["y1", "y2", "onMouseenter"], Vh = ["x", "y", "fill"], zh = ["x", "y", "fill"], Nh = ["transform"], jh = { transform: "translate(-200, 0)" }, Hh = ["stroke"], Wh = ["fill"], Yh = { transform: "translate(-130, 0)" }, Kh = ["stroke"], Uh = ["fill"], qh = { transform: "translate(-60, 0)" }, Xh = ["stroke"], Gh = ["fill"], Zh = { transform: "translate(10, 0)" }, Qh = ["stroke"], Jh = ["fill"], tf = { transform: "translate(80, 0)" }, ef = ["fill"], nf = { transform: "translate(150, 0)" }, af = ["fill"], sf = /* @__PURE__ */ J({
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
    const n = e, { isDark: a } = gt(ft(n, "theme")), s = C(() => ({
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
    })), o = ot({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, l = (p, _) => {
      const g = p.currentTarget.closest("svg");
      if (!g) return;
      const v = g.getBoundingClientRect(), x = g.createSVGPoint();
      x.x = p.clientX - v.left, x.y = p.clientY - v.top, o.value = {
        visible: !0,
        x: x.x,
        y: x.y - 20,
        text: _
      };
    }, c = (p) => {
      if (o.value.visible) {
        const _ = p.currentTarget, g = _.getBoundingClientRect(), v = _.createSVGPoint();
        v.x = p.clientX - g.left, v.y = p.clientY - g.top, o.value.x = v.x, o.value.y = v.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const p = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const x = v, m = (x - 1) / 9, f = n.chartMargin + g - m * g;
        p.push({ value: x, y: f });
      }
      return p;
    });
    return t({ isDark: a }), (p, _) => (b(), k("div", uh, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: pt(`min-height: ${e.chartHeight}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (b(), k("g", {
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
          }, null, 8, gh),
          r("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(o.value.text), 9, ph)
        ], 8, fh)) : O("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, mh),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, bh),
        (b(!0), k(X, null, it(h.value, (g, v) => (b(), k(X, { key: v }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, vh),
          r("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(g.value), 9, yh)
        ], 64))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, _h),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, xh),
        (b(!0), k(X, null, it(e.boxplotData, (g, v) => (b(), k(X, { key: v }, [
          r("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (b(), k(X, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, wh),
              r("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ch),
              r("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, $h),
              r("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Mh),
              r("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Sh)
            ], 64)) : (b(), k(X, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Dh),
              r("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ah),
              r("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Th),
              r("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Bh),
              r("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Lh)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Fh),
            r("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ph),
            r("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Eh),
            r("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ih),
            r("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (x) => l(x, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Rh),
            g.averageY ? (b(), k("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (x) => l(x, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Oh)) : O("", !0)
          ], 8, kh),
          r("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(g.label)), 9, Vh),
          g.responseCount ? (b(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(g.responseCount), 9, zh)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", jh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Hh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Wh)
          ]),
          r("g", Yh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Kh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Uh)
          ]),
          r("g", qh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Xh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Gh)
          ]),
          r("g", Zh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Qh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Jh)
          ]),
          r("g", tf, [
            _[0] || (_[0] = r("line", {
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
            }, " Avg ", 8, ef)
          ]),
          r("g", nf, [
            _[1] || (_[1] = r("line", {
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
            }, " Median ", 8, af)
          ])
        ], 8, Nh)) : O("", !0)
      ], 44, hh))
    ]));
  }
}), of = /* @__PURE__ */ lt(sf, [["__scopeId", "data-v-9ac5c075"]]), lf = { class: "chart-container" }, rf = ["viewBox"], cf = ["x1", "y1", "x2", "y2", "stroke"], df = ["points", "fill"], uf = ["x1", "y1", "x2", "y2", "stroke"], hf = ["x1", "y1", "x2", "y2", "stroke"], ff = ["x", "y", "fill"], gf = ["x", "y", "fill", "transform"], pf = ["x1", "y1", "x2", "y2", "stroke"], mf = ["points", "fill"], bf = ["transform"], vf = ["y1", "y2", "stroke", "onMouseenter"], yf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], _f = ["x1", "y1", "x2", "y2", "onMouseenter"], xf = ["x1", "y1", "x2", "y2", "onMouseenter"], kf = ["cy", "stroke", "onMouseenter"], wf = ["cy", "stroke", "onMouseenter"], Cf = ["x", "y", "fill"], $f = ["x", "y", "fill"], Mf = ["transform"], Sf = { transform: "translate(-180, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(-120, 0)" }, Bf = ["fill"], Lf = { transform: "translate(-60, 0)" }, Ff = ["fill"], Pf = { transform: "translate(0, 0)" }, Ef = ["stroke"], If = ["fill"], Rf = { transform: "translate(60, 0)" }, Of = ["fill"], Vf = { transform: "translate(130, 0)" }, zf = ["fill"], Nf = ["transform"], jf = ["x", "y", "width", "height", "fill", "stroke"], Hf = ["y", "fill"], Wf = ["y", "fill"], Gn = 10, Yf = 14, Sa = 13, Lo = 4, Fo = 12, Kf = /* @__PURE__ */ J({
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
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), o = Gn + Sa + Lo + Fo + Gn, i = C(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(f, y, w) {
      const M = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(f, 1) * y * M);
    }
    function c(f, y) {
      return Math.max(
        l(f.length, Sa, !0),
        l(y.length, Fo, !1),
        52
      ) + Yf * 2;
    }
    function d(f, y, w, M) {
      const D = w / 2, $ = 6, S = Math.min(
        Math.max(f, D + $),
        n.chartWidth - D - $
      ), F = $ + M + 10, T = n.chartHeight - $ + 10, B = Math.min(Math.max(y, F), T);
      return { x: S, y: B };
    }
    const u = C(() => ({
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
    }), p = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, _ = (f, y, w) => {
      const M = f.currentTarget.closest("svg");
      if (!M) return;
      const D = M.getBoundingClientRect(), $ = M.createSVGPoint();
      $.x = f.clientX - D.left, $.y = f.clientY - D.top;
      let S = p(y.label), F = "";
      switch (w) {
        case "body":
          F = `Q1: ${y.q1.toFixed(1)} | Q3: ${y.q3.toFixed(1)}`;
          break;
        case "wick":
          F = `Min: ${y.low.toFixed(1)} | Max: ${y.high.toFixed(1)}`;
          break;
        case "median":
          F = `Median: ${y.median.toFixed(1)}`;
          break;
        case "average":
          F = `Average: ${y.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          F = `Min: ${y.low.toFixed(1)}`;
          break;
        case "max":
          F = `Max: ${y.high.toFixed(1)}`;
          break;
      }
      const T = c(S, F), B = o;
      let P = $.x, E = $.y - 20;
      const N = d(P, E, T, B);
      P = N.x, E = N.y, h.value = {
        visible: !0,
        x: P,
        y: E,
        title: S,
        text: F,
        width: T,
        height: B
      };
    }, g = (f) => {
      if (h.value.visible) {
        const y = f.currentTarget, w = y.getBoundingClientRect(), M = y.createSVGPoint();
        M.x = f.clientX - w.left, M.y = f.clientY - w.top;
        let D = M.x, $ = M.y - 20;
        const S = d(D, $, h.value.width, h.value.height);
        h.value.x = S.x, h.value.y = S.y;
      }
    }, v = () => {
      h.value.visible = !1;
    }, x = () => {
      h.value.visible = !1;
    }, m = C(() => {
      const f = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let M = 1; M <= 10; M++) {
        const D = M, $ = (D - 1) / 9, S = n.chartMargin + w - $ * w;
        f.push({ value: D, y: S });
      }
      return f;
    });
    return t({ isDark: a }), (f, y) => (b(), k("div", lf, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: pt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: v
      }, [
        y[4] || (y[4] = r("defs", null, [
          r("filter", {
            id: "candlestick-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            r("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, cf),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, df),
        (b(!0), k(X, null, it(m.value, (w, M) => (b(), k("line", {
          key: `grid-${M}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, uf))), 128)),
        (b(!0), k(X, null, it(m.value, (w, M) => (b(), k(X, { key: M }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, hf),
          r("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, ff)
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
        }, A(p(e.yAxisLabel)), 9, gf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, pf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, mf),
        (b(!0), k(X, null, it(e.candlestickData, (w, M) => (b(), k(X, { key: M }, [
          r("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            r("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (D) => _(D, w, "wick"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            r("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (D) => _(D, w, "body"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, yf),
            w.medianY ? (b(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (D) => _(D, w, "median"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, _f)) : O("", !0),
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
              onMouseenter: (D) => _(D, w, "average"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, xf)) : O("", !0),
            r("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => _(D, w, "min"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, kf),
            r("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => _(D, w, "max"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, wf)
          ], 8, bf),
          r("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(p(w.label)), 9, Cf),
          w.responseCount ? (b(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, $f)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", Sf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Df),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Af)
          ]),
          r("g", Tf, [
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
            }, " Q1 ", 8, Bf)
          ]),
          r("g", Lf, [
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
            }, " Q3 ", 8, Ff)
          ]),
          r("g", Pf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ef),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, If)
          ]),
          r("g", Rf, [
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
            }, " Avg ", 8, Of)
          ]),
          r("g", Vf, [
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
            }, " Median ", 8, zf)
          ])
        ], 8, Mf)) : O("", !0),
        h.value.visible ? (b(), k("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          r("rect", {
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
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Gn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Hf),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Gn + Sa + Lo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Wf)
        ], 8, Nf)) : O("", !0)
      ], 44, rf))
    ]));
  }
}), Uf = /* @__PURE__ */ lt(Kf, [["__scopeId", "data-v-22efd66d"]]), qf = ["viewBox"], Xf = ["x1", "y1", "x2", "y2", "stroke"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["points", "fill"], Qf = ["x1", "y1", "x2", "y2", "stroke"], Jf = ["x", "y", "fill"], tg = ["x", "y", "fill", "transform"], eg = ["x1", "y1", "x2", "y2", "stroke"], ng = ["points", "fill"], ag = ["x1", "y1", "x2", "y2", "stroke"], sg = ["x", "y", "fill"], og = ["x", "y", "fill"], ig = ["d"], lg = ["x", "y", "width", "height", "onMouseenter"], rg = ["x1", "y1", "x2", "y2"], cg = ["x", "y"], dg = ["x1", "y1", "x2", "y2"], ug = ["x", "y"], hg = ["x1", "y1", "x2", "y2"], fg = ["x", "y"], gg = ["x1", "y1", "x2", "y2"], pg = ["x", "y"], mg = ["x1", "y1", "x2", "y2"], bg = ["x", "y"], vg = ["x1", "y1", "x2", "y2"], yg = ["x", "y"], _g = ["transform"], xg = { transform: "translate(-220, 0)" }, kg = ["fill"], wg = { transform: "translate(-140, 0)" }, Cg = ["fill"], $g = { transform: "translate(-80, 0)" }, Mg = ["fill"], Sg = { transform: "translate(-20, 0)" }, Dg = ["fill"], Ag = { transform: "translate(60, 0)" }, Tg = ["fill"], Bg = { transform: "translate(130, 0)" }, Lg = ["fill"], Fg = { transform: "translate(180, 0)" }, Pg = ["fill"], Eg = ["transform"], Ig = ["x", "y", "width", "height", "fill", "stroke"], Rg = ["y", "fill"], Og = ["y", "fill"], Zn = 10, Vg = 14, Da = 13, Po = 12, Eo = 4, zg = /* @__PURE__ */ J({
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
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), o = Zn + Da + Eo + Po + Zn, i = C(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(H, et, nt) {
      const dt = nt ? 0.6 : 0.535;
      return Math.ceil(Math.max(H, 1) * et * dt);
    }
    function c(H, et) {
      return Math.max(
        l(H.length, Da, !0),
        l(et.length, Po, !1),
        52
      ) + Vg * 2;
    }
    function d(H, et, nt, dt) {
      const vt = nt / 2, yt = 6, At = Math.min(
        Math.max(H, vt + yt),
        n.chartWidth - vt - yt
      ), Nt = yt + dt + 10, Et = n.chartHeight - yt + 10, R = Math.min(Math.max(et, Nt), Et);
      return { x: At, y: R };
    }
    const u = C(() => ({
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
    }), p = C(() => n.chartWidth - n.chartMargin * 2), _ = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), g = C(() => p.value / 10 * 0.6), v = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const H = Math.max(...n.histogram.map((nt) => nt.count || 0), 1), et = Math.max(1, Math.ceil(H * 0.2));
      return H + et;
    }), x = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const H = n.averageScore || 0;
      let et = 0, nt = 0;
      if (n.histogram.forEach((vt) => {
        const yt = vt.count || 0;
        et += yt;
        const At = vt.score - H;
        nt += yt * (At * At);
      }), et === 0) return 1;
      const dt = nt / et;
      return Math.sqrt(dt) || 1;
    }), m = (H, et, nt) => {
      if (nt === 0) return 0;
      const dt = 1 / (nt * Math.sqrt(2 * Math.PI)), vt = -0.5 * Math.pow((H - et) / nt, 2);
      return dt * Math.exp(vt);
    }, f = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && x.value === 0) return null;
      const H = n.averageScore, et = x.value, nt = 100, vt = Math.max(...n.histogram.map((Et) => Et.count || 0), 1) / v.value * _.value;
      if (vt <= 0) return null;
      let yt = 0;
      for (let Et = 0; Et <= nt; Et++) {
        const R = 1 + 9 * (Et / nt), W = m(R, H, et);
        W > yt && (yt = W);
      }
      if (yt <= 0) return null;
      const At = vt / yt, Nt = [];
      for (let Et = 0; Et <= nt; Et++) {
        const R = 1 + 9 * (Et / nt), W = m(R, H, et) * At, at = w(R);
        if (at !== null) {
          const bt = n.chartHeight - n.chartBottomMargin - W;
          Nt.push(`${Et === 0 ? "M" : "L"} ${at} ${bt}`);
        }
      }
      return Nt.join(" ");
    }), y = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const H = p.value / 10;
      return n.histogram.map((et, nt) => {
        const dt = n.chartMargin + (nt + 0.5) * H, vt = et.count > 0 ? et.count / v.value * _.value : 0, yt = n.chartHeight - n.chartBottomMargin - vt;
        return {
          score: et.score,
          count: et.count,
          x: dt,
          y: yt,
          height: vt
        };
      });
    }), w = (H) => {
      if (H < 1 || H > 10) return null;
      const et = p.value / 10;
      return n.chartMargin + (H - 0.5) * et;
    }, M = C(() => w(n.minScore)), D = C(() => w(n.maxScore)), $ = C(() => w(n.q1Score)), S = C(() => w(n.medianScore)), F = C(() => w(n.q3Score)), T = C(() => w(n.averageScore)), B = C(() => n.minScore), P = C(() => n.maxScore), E = C(() => n.q1Score), N = C(() => n.medianScore), K = C(() => n.q3Score), j = C(() => n.averageScore), Q = C(() => {
      const H = [], et = n.chartMargin - 8, nt = 18;
      $.value !== null && H.push({
        x: $.value,
        y: et,
        value: n.q1Score,
        label: `Q1: ${E.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), S.value !== null && H.push({
        x: S.value,
        y: et - nt,
        value: n.medianScore,
        label: `Median: ${N.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && H.push({
        x: T.value,
        y: et - nt,
        value: n.averageScore,
        label: `Avg: ${j.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), F.value !== null && H.push({
        x: F.value,
        y: et,
        value: n.q3Score,
        label: `Q3: ${K.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), H.sort((yt, At) => (yt.x || 0) - (At.x || 0));
      const dt = [[], [], []];
      H.forEach((yt) => {
        if (yt.x === null) return;
        let At = -1;
        for (let Nt = 0; Nt < dt.length; Nt++) {
          let Et = !1;
          for (const R of dt[Nt]) {
            if (R.x === null) continue;
            const W = Math.abs(yt.x - R.x), at = (yt.width + R.width) / 2 + 10;
            if (W < at) {
              Et = !0;
              break;
            }
          }
          if (!Et) {
            At = Nt;
            break;
          }
        }
        At === -1 && (At = dt.length - 1), yt.y = et - At * nt, dt[At].push(yt);
      });
      const vt = 15;
      return H.forEach((yt) => {
        yt.y < vt && (yt.y = vt);
      }), H;
    }), tt = (H) => Q.value.find((nt) => nt.id === H)?.y || n.chartMargin - 10, ct = C(() => {
      const H = [];
      for (let nt = 0; nt <= 5; nt++) {
        const dt = Math.round(v.value / 5 * nt), vt = n.chartHeight - n.chartBottomMargin - nt / 5 * _.value;
        H.push({ value: dt, y: vt });
      }
      return H;
    });
    function z(H, et, nt) {
      const dt = H.createSVGPoint();
      dt.x = et, dt.y = nt;
      const vt = H.getScreenCTM();
      if (!vt) {
        const At = H.getBoundingClientRect();
        return { x: et - At.left, y: nt - At.top };
      }
      const yt = dt.matrixTransform(vt.inverse());
      return { x: yt.x, y: yt.y };
    }
    const U = (H, et) => {
      n.interactive && rt(H, et);
    }, G = () => {
      n.interactive && _t();
    }, rt = (H, et) => {
      const nt = H.currentTarget.closest("svg");
      if (!nt) return;
      const { x: dt, y: vt } = z(nt, H.clientX, H.clientY), yt = `Score: ${et.score}`, At = `Count: ${Number(et.count ?? 0).toLocaleString()}`, Nt = c(yt, At), Et = o, R = typeof et?.x == "number" ? et.x : dt;
      let W = vt - 20;
      const at = d(R, W, Nt, Et);
      h.value = {
        visible: !0,
        x: at.x,
        y: at.y,
        title: yt,
        text: At,
        width: Nt,
        height: Et,
        anchorX: typeof et?.x == "number" ? et.x : null
      };
    }, st = (H) => {
      if (n.interactive && h.value.visible) {
        const et = H.currentTarget, { x: nt, y: dt } = z(et, H.clientX, H.clientY), vt = h.value.anchorX, yt = vt != null && Number.isFinite(vt) ? vt : nt;
        let At = dt - 20;
        const Nt = d(yt, At, h.value.width, h.value.height);
        h.value.x = Nt.x, h.value.y = Nt.y;
      }
    }, St = () => {
      _t();
    }, _t = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (H, et) => (b(), k("div", {
      class: Y(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: pt(`min-height: ${e.chartHeight}px;`),
        onMousemove: st,
        onMouseleave: St
      }, [
        et[7] || (et[7] = r("defs", null, [
          r("filter", {
            id: "histogram-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            r("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        (b(!0), k(X, null, it(ct.value, (nt, dt) => (b(), k("line", {
          key: `grid-${dt}`,
          x1: e.chartMargin,
          y1: nt.y,
          x2: e.chartWidth - e.chartMargin,
          y2: nt.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Xf))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Gf),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Zf),
        (b(!0), k(X, null, it(ct.value, (nt, dt) => (b(), k(X, {
          key: `y-tick-${dt}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: nt.y,
            x2: e.chartMargin,
            y2: nt.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Qf),
          r("text", {
            x: e.chartMargin - 12,
            y: nt.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(nt.value), 9, Jf)
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
        }, " Count ", 8, tg),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, eg),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, ng),
        (b(!0), k(X, null, it(y.value, (nt, dt) => (b(), k(X, {
          key: `tick-${dt}`
        }, [
          r("line", {
            x1: nt.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: nt.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ag),
          r("text", {
            x: nt.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(nt.score), 9, sg)
        ], 64))), 128)),
        r("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, og),
        f.value ? (b(), k("path", {
          key: 0,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, ig)) : O("", !0),
        (b(!0), k(X, null, it(y.value, (nt, dt) => (b(), k("rect", {
          key: `bar-${dt}`,
          x: nt.x - g.value / 2,
          y: nt.y,
          width: g.value,
          height: nt.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (vt) => U(vt, nt),
          onMouseleave: G,
          style: pt({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, lg))), 128)),
        M.value ? (b(), k("line", {
          key: 1,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, rg)) : O("", !0),
        M.value ? (b(), k("text", {
          key: 2,
          x: M.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(B.value.toFixed(1)), 9, cg)) : O("", !0),
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
        }, null, 8, dg)) : O("", !0),
        $.value ? (b(), k("text", {
          key: 4,
          x: $.value,
          y: tt("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(E.value.toFixed(1)), 9, ug)) : O("", !0),
        S.value ? (b(), k("line", {
          key: 5,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, hg)) : O("", !0),
        S.value ? (b(), k("text", {
          key: 6,
          x: S.value,
          y: tt("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(N.value.toFixed(1)), 9, fg)) : O("", !0),
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
        }, null, 8, gg)) : O("", !0),
        T.value ? (b(), k("text", {
          key: 8,
          x: T.value,
          y: tt("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(j.value.toFixed(1)), 9, pg)) : O("", !0),
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
        }, null, 8, mg)) : O("", !0),
        F.value ? (b(), k("text", {
          key: 10,
          x: F.value,
          y: tt("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(K.value.toFixed(1)), 9, bg)) : O("", !0),
        D.value ? (b(), k("line", {
          key: 11,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, vg)) : O("", !0),
        D.value ? (b(), k("text", {
          key: 12,
          x: D.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(P.value.toFixed(1)), 9, yg)) : O("", !0),
        e.showLegend ? (b(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          r("g", xg, [
            et[0] || (et[0] = r("line", {
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
            }, " Gaussian ", 8, kg)
          ]),
          r("g", wg, [
            et[1] || (et[1] = r("line", {
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
            }, " Min ", 8, Cg)
          ]),
          r("g", $g, [
            et[2] || (et[2] = r("line", {
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
            }, " Q1 ", 8, Mg)
          ]),
          r("g", Sg, [
            et[3] || (et[3] = r("line", {
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
            }, " Median ", 8, Dg)
          ]),
          r("g", Ag, [
            et[4] || (et[4] = r("line", {
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
            }, " Avg ", 8, Tg)
          ]),
          r("g", Bg, [
            et[5] || (et[5] = r("line", {
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
            }, " Q3 ", 8, Lg)
          ]),
          r("g", Fg, [
            et[6] || (et[6] = r("line", {
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
            }, " Max ", 8, Pg)
          ])
        ], 8, _g)) : O("", !0),
        e.interactive && h.value.visible ? (b(), k("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          r("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, Ig),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Zn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Rg),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Zn + Da + Eo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Og)
        ], 8, Eg)) : O("", !0)
      ], 44, qf))
    ], 2));
  }
}), Oi = /* @__PURE__ */ lt(zg, [["__scopeId", "data-v-a1e39e34"]]), Ng = 639, Vi = 1024;
function Io(e) {
  return e < 640 ? "mobile" : e <= Vi ? "tablet" : "desktop";
}
function jg() {
  const e = ot(
    typeof window > "u" ? "desktop" : Io(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Io(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  te(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Ng}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Vi}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), ue(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = C(() => e.value === "mobile"), l = C(() => e.value === "tablet"), c = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: c
  };
}
const Hg = { class: "chart-container" }, Wg = {
  key: 1,
  class: "chart-wrapper"
}, Yg = /* @__PURE__ */ J({
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
    fs.use([fl, gl, pl, ml]);
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), { breakpoint: o } = jg(), i = ot(null), l = ot(!0), c = ot(!1);
    let d = null;
    const u = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = C(() => {
      const D = o.value;
      return D === "mobile" ? {
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
      } : D === "tablet" ? {
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
    }), p = (D, $) => {
      const S = D.trim();
      if (!S || $ < 1) return D;
      if (S.length <= $) return S;
      const F = [];
      let T = 0;
      for (; T < S.length; ) {
        const B = Math.min(T + $, S.length);
        if (B >= S.length) {
          const N = S.slice(T).trim();
          N && F.push(N);
          break;
        }
        const P = S.slice(T, B), E = P.lastIndexOf(" ");
        if (E > 0)
          for (F.push(S.slice(T, T + E).trim()), T += E; T < S.length && S[T] === " "; ) T += 1;
        else
          F.push(P), T = B;
      }
      return F.join(`
`);
    }, _ = [
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
    ], g = () => {
      const D = n.data.links.filter(
        (T) => T.source && T.target && typeof T.value == "number"
      ), $ = Math.max(...D.map((T) => T.value), 1), S = Math.max(1, $ * 0.01), F = D.map((T) => ({
        ...T,
        originalValue: T.value,
        value: T.value < $ * 0.01 ? S : T.value
      }));
      return {
        nodes: n.data.nodes.filter((T) => T.name),
        links: F
      };
    }, v = (D) => D.map(($, S) => ({
      ...$,
      itemStyle: {
        color: n.nodeColors[$.name] || _[S % _.length],
        borderRadius: 8
      }
    })), x = (D) => ($) => {
      const S = $.dataType === "node", F = s.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const K = D.filter((tt) => tt.target === $.name), j = D.filter((tt) => tt.source === $.name), Q = K.length > 0 ? K.reduce((tt, ct) => tt + (ct.originalValue || ct.value), 0) : j.reduce((tt, ct) => tt + (ct.originalValue || ct.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${$.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${Q.toLocaleString()}</div>`;
      }
      const B = $.data?.source || $.source || "Unknown", P = $.data?.target || $.target || "Unknown", E = $.data?.originalValue || $.data?.value || $.value || 0, N = $.data?.label || `${E.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${B} → ${P}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, m = () => {
      if (!d || !n.data.nodes?.length || !n.data.links?.length) return;
      const D = h.value, $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", S = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: F, links: T } = g(), B = v(F), P = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: x(T),
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
                position: D.labelPosition,
                /** Dark: external labels (e.g. mobile `right`) use light text; inside nodes stay dark for contrast on pastel bars. */
                color: D.labelPosition === "right" && a.value ? s.value.textPrimary : "#0f172a",
                fontWeight: 600,
                fontSize: D.labelFontSize,
                ...D.labelWrap && D.labelLineHeight > 0 ? { lineHeight: D.labelLineHeight } : {},
                ...D.labelWrap && D.labelTextWidth > 0 ? { width: D.labelTextWidth, overflow: "none" } : {},
                ...D.labelDistance > 0 ? { distance: D.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (E) => {
                  const N = E.name || "";
                  if (D.labelWrap)
                    return p(N, Math.max(4, D.labelCharsPerLine));
                  const K = D.labelMaxChars;
                  return N.length > K ? `${N.substring(0, K)}...` : N;
                }
              },
              edgeLabel: D.edgeLabelShow ? {
                show: !0,
                fontSize: D.edgeLabelFontSize,
                color: s.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (E) => {
                  const N = E.data?.originalValue || E.value || 0;
                  return E.data?.label || `${N.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: u.node.align,
              nodeGap: D.nodeGap,
              nodeWidth: D.nodeWidth,
              layoutIterations: u.node.iterations,
              orient: D.orient,
              draggable: !1,
              ...D.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: u.animation.duration,
          animationEasing: u.animation.easing
        };
        d.setOption(P), d.resize();
      } catch (F) {
        console.error("Error setting Sankey chart options:", F), c.value = !0;
      }
    }, f = async () => {
      if (i.value)
        try {
          d = fs.init(i.value), m(), window.addEventListener("resize", w);
        } catch (D) {
          console.error("Error initializing Sankey chart:", D), c.value = !0;
        } finally {
          l.value = !1;
        }
    }, y = async (D = 40) => {
      await Ot();
      for (let $ = 0; $ < D; $++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await f();
        await new Promise((S) => setTimeout(S, 50));
      }
      await f(), setTimeout(w, 50);
    }, w = () => d?.resize(), M = () => {
      window.removeEventListener("resize", w), d && (d.dispose(), d = null);
    };
    return te(() => i.value && y()), jo(M), Bt(() => n.data, m, { deep: !0 }), Bt(a, m), Bt(o, m), t({ isDark: a }), (D, $) => (b(), k("div", Hg, [
      c.value ? (b(), k("div", {
        key: 0,
        class: "error-state",
        style: pt({ height: e.height })
      }, [...$[0] || ($[0] = [
        hs('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (b(), k("div", Wg, [
        Jt(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: pt({ height: e.height })
        }, null, 4), [
          [an, !l.value]
        ]),
        Jt(r("div", {
          class: "loading-state",
          style: pt({ height: e.height })
        }, [...$[1] || ($[1] = [
          hs('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [an, l.value]
        ])
      ]))
    ]));
  }
}), Ve = /* @__PURE__ */ lt(Yg, [["__scopeId", "data-v-eb927194"]]), Kg = ["open"], Ug = { class: "card-header metric-collapsible__summary" }, qg = { class: "header-content metric-header-content" }, Xg = { class: "metric-header-content__main" }, Gg = { class: "metric-header-content__text" }, Zg = {
  key: 0,
  class: "card-title"
}, Qg = {
  key: 0,
  class: "card-subtitle"
}, Jg = {
  key: 0,
  class: "metric-header-content__export"
}, tp = {
  key: 0,
  class: "cmc-header-aside"
}, ep = { class: "chart-metric-container__body" }, np = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, ap = { class: "card-header" }, sp = { class: "header-content metric-header-content" }, op = { class: "metric-header-content__main" }, ip = { class: "metric-header-content__text" }, lp = {
  key: 0,
  class: "card-title"
}, rp = {
  key: 0,
  class: "card-subtitle"
}, cp = {
  key: 0,
  class: "metric-header-content__export"
}, dp = {
  key: 0,
  class: "cmc-header-aside"
}, up = { class: "chart-metric-container__body" }, hp = /* @__PURE__ */ J({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = ot(t.defaultOpen), a = za();
    function s(l) {
      return l.some((c) => {
        if (c.type === ul) return !1;
        if (c.type === Text) {
          const d = c.children;
          return typeof d == "string" && d.trim().length > 0;
        }
        return !!c.type;
      });
    }
    const o = C(() => {
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? s(l()) : !1;
    });
    Bt(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const c = l.currentTarget;
      c?.tagName === "DETAILS" && (n.value = c.open);
    }
    return (l, c) => e.collapsible ? (b(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      r("summary", Ug, [
        r("div", qg, [
          r("div", Xg, [
            r("div", Gg, [
              Dt(l.$slots, "title", {}, () => [
                e.title ? (b(), k("h3", Zg, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (b(), k("p", Qg, A(e.subtitle), 1)) : O("", !0),
              Dt(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (b(), k("div", Jg, [
              Dt(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", tp, [
            Dt(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ]),
        c[0] || (c[0] = r("svg", {
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
      r("div", ep, [
        Dt(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, Kg)) : (b(), k("div", np, [
      r("div", ap, [
        r("div", sp, [
          r("div", op, [
            r("div", ip, [
              Dt(l.$slots, "title", {}, () => [
                e.title ? (b(), k("h3", lp, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (b(), k("p", rp, A(e.subtitle), 1)) : O("", !0),
              Dt(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (b(), k("div", cp, [
              Dt(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", dp, [
            Dt(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ])
      ]),
      r("div", up, [
        Dt(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ht = /* @__PURE__ */ lt(hp, [["__scopeId", "data-v-3c4aac03"]]);
function fp(e, t) {
  return b(), k("svg", {
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
function ds(e, t) {
  return b(), k("svg", {
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
  return b(), k("svg", {
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
function gp(e, t) {
  return b(), k("svg", {
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
function zi(e, t) {
  return b(), k("svg", {
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
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5 8.25 12l7.5-7.5"
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
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function pp(e, t) {
  return b(), k("svg", {
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
function mp(e, t) {
  return b(), k("svg", {
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
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const bp = {
  key: 0,
  class: "footer-divider"
}, vp = {
  key: 0,
  class: "export-label"
}, yp = { class: "export-buttons" }, _p = ["disabled"], xp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, kp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, wp = ["disabled"], Cp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, $p = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Mp = /* @__PURE__ */ J({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = C(() => n.variant === "footer" ? "footer" : "div"), o = C(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (c) => n.formats.includes(c), l = (c) => {
      n.loading || a("export", c);
    };
    return (c, d) => (b(), q(tn(s.value), {
      class: Y(o.value)
    }, {
      default: I(() => [
        e.variant === "footer" ? (b(), k("div", bp)) : O("", !0),
        r("div", {
          class: Y(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (b(), k("span", vp, "Export")) : O("", !0),
          r("div", yp, [
            i("pdf") ? (b(), k("button", {
              key: 0,
              type: "button",
              class: Y(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: d[0] || (d[0] = (u) => l("pdf"))
            }, [
              e.loading ? (b(), k("svg", xp, [...d[2] || (d[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", kp, [...d[3] || (d[3] = [
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
              d[4] || (d[4] = r("span", null, "PDF", -1))
            ], 10, _p)) : O("", !0),
            i("csv") ? (b(), k("button", {
              key: 1,
              type: "button",
              class: Y(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: d[1] || (d[1] = (u) => l("csv"))
            }, [
              e.loading ? (b(), k("svg", Cp, [...d[5] || (d[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", $p, [...d[6] || (d[6] = [
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
              d[7] || (d[7] = r("span", null, "CSV", -1))
            ], 10, wp)) : O("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Lt = /* @__PURE__ */ lt(Mp, [["__scopeId", "data-v-33a9d528"]]), Sp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Dp = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, Ap = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Tp = {
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
    }, s = e, o = n, i = (g) => {
      o("export", g);
    }, l = [30, 50, 70, 50, 40], c = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], d = ft(s, "theme"), u = ft(s, "options"), { isDark: h } = gt(d), p = (g) => {
      const v = new Date(g), x = String(v.getDate()).padStart(2, "0"), m = String(v.getMonth() + 1).padStart(2, "0");
      return `${x}-${m}`;
    }, _ = C(() => {
      const g = s.data?.agents_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const x = v.map((M) => p(M)), m = /* @__PURE__ */ new Set();
      for (const M of Object.values(g))
        for (const D of Object.keys(M))
          m.add(D);
      const f = Array.from(m), y = (M) => M, w = f.map((M) => ({
        label: M,
        data: v.map((D) => g[D]?.[M] || 0),
        backgroundColor: `${a[M] || "#94a3b8"}80`,
        borderColor: y(a[M] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: x,
        datasets: w
      };
    });
    return t({ isDark: h }), (g, v) => (b(), q(ht, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", Sp, [
          e.loading ? (b(), k("div", Dp, [
            r("div", Ap, [
              (b(), k(X, null, it(l, (x, m) => r("div", {
                key: m,
                class: Y(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", c[m]]),
                style: pt({ height: `${x}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : _.value.labels && _.value.labels.length ? (b(), k("section", Tp, [
            r("div", Bp, [
              V(be, {
                data: _.value,
                stacked: !0,
                theme: d.value,
                options: u.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (b(), k("section", Lp, [
            r("div", Fp, [
              r("div", Pp, [
                V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              v[1] || (v[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
              v[2] || (v[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ip = { class: "flex w-full min-w-0 justify-center" }, Rp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Op = { class: "min-w-0 truncate text-[12px] leading-normal" }, Vp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, zp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Np = /* @__PURE__ */ J({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (b(), k("div", {
      class: Y(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      r("div", Ip, [
        r("div", Rp, [
          e.color ? (b(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: pt({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", Op, A(e.title), 1)
        ])
      ]),
      r("p", Vp, A(e.value), 1),
      e.subvalue ? (b(), k("p", zp, A(e.subvalue), 1)) : O("", !0)
    ], 2));
  }
}), ut = /* @__PURE__ */ lt(Np, [["__scopeId", "data-v-945ff8fb"]]), jp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ht = /* @__PURE__ */ J({
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
    ), s = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(() => {
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
    return (l, c) => n.value ? (b(), k("span", {
      key: 0,
      role: "status",
      class: Y(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (b(), k("span", jp, [...c[0] || (c[0] = [
        r("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      r("span", {
        class: Y(["min-w-0 flex-1 text-center", o.value])
      }, A(a.value), 3)
    ], 2)) : (b(), k("span", {
      key: 1,
      class: Y(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Dt(l.$slots, "default", {}, () => [
        xt(A(e.label), 1)
      ])
    ], 2));
  }
}), Z = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), wt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), De = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Hp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Wp = { class: "overflow-x-auto" }, Yp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Kp = /* @__PURE__ */ J({
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
    const t = e, n = ot(!1), a = "—";
    function s(v) {
      return v == null || v === "" ? a : String(v);
    }
    function o(v) {
      return v === "center" ? "text-center" : v === "right" ? "text-right" : "text-left";
    }
    function i(v) {
      return `cell-${v}`;
    }
    function l(v, x) {
      return v[x];
    }
    function c(v, x) {
      if (typeof t.rowKey == "function")
        return t.rowKey(v);
      const m = v[t.rowKey];
      return typeof m == "string" || typeof m == "number" ? m : x;
    }
    function d(v, x) {
      return c(v, x);
    }
    const u = C(() => t.rows?.length ?? 0), h = C(() => u.value > t.maxVisibleRows), p = C(() => Math.max(0, u.value - t.maxVisibleRows)), _ = C(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), g = C(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (v, x) => (b(), k("div", Hp, [
      r("div", Wp, [
        r("table", Yp, [
          r("thead", null, [
            r("tr", null, [
              (b(!0), k(X, null, it(e.columns, (m) => (b(), k("th", {
                key: m.key,
                scope: "col",
                class: Y(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [o(m.align), m.headerClass]])
              }, A(m.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (b(!0), k(X, null, it(_.value, (m, f) => (b(), k("tr", {
              key: d(m, f)
            }, [
              (b(!0), k(X, null, it(e.columns, (y) => (b(), k("td", {
                key: `${f}-${y.key}`,
                class: Y(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [o(y.align), y.cellClass]])
              }, [
                Dt(v.$slots, i(y.key), {
                  row: m,
                  column: y,
                  value: l(m, y.key)
                }, () => [
                  xt(A(s(l(m, y.key))), 1)
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
        xt(A(n.value ? e.viewLessLabel : g.value) + " ", 1),
        (b(), k("svg", {
          class: Y(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...x[1] || (x[1] = [
          r("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : O("", !0)
    ]));
  }
}), se = /* @__PURE__ */ lt(Kp, [["__scopeId", "data-v-58cfdc5e"]]), Up = {
  key: 0,
  class: "loading-state"
}, qp = {
  key: 1,
  class: "error-state"
}, Xp = { class: "error-content" }, Gp = { class: "error-description" }, Zp = {
  key: 2,
  class: "card-body"
}, Qp = { class: "chart-section" }, Jp = { class: "chart-wrapper" }, tm = { class: "payment-success-summary" }, em = {
  key: 0,
  class: "booking-daily-section"
}, nm = { class: "w-full min-w-0" }, am = { class: "font-medium" }, sm = { class: "percentage-text" }, om = { class: "badges-container" }, im = {
  key: 0,
  class: "badges-container"
}, lm = {
  key: 1,
  class: "percentage-text"
}, rm = { class: "badges-container" }, cm = {
  key: 1,
  class: "empty-state"
}, dm = /* @__PURE__ */ J({
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
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (f, y) => new Date(f.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], c = C(
      () => i.value.map((f) => ({
        id: f.date,
        ...f
      }))
    ), d = C(() => a.data?.total_payment_success_value || []), u = C(() => {
      const f = d.value;
      return f.length === 0 ? g(0) : f.map((y) => `${y.currency} ${g(y.total_value)}`).join(" · ");
    }), h = (f) => f.payment_success_value || [], p = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce((y, w) => y + (w.count || 0), 0), _ = (f) => wt(f), g = (f) => f == null ? "0" : De(f);
    C(() => (a.data?.total_payment_success_value || []).reduce((f, y) => f + (y.total_value || 0), 0));
    const v = C(() => {
      const f = a.data, y = f.total_booking_initiated || 0, w = f.total_booking_started || 0, M = f.total_payment_initiated || 0, D = f.total_not_found || 0, $ = f.total_cancelled || 0, S = f.total_no_pending_balance || 0, F = f.total_errors || 0, T = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce((Q, tt) => Q + (tt.count || 0), 0), B = f.total_payment_failed || 0, P = Math.max(0, y - w), E = Math.max(0, w - M - D - $ - S - F), N = (Q, tt) => {
        const ct = tt > 0 ? Math.round(Q / tt * 100) : 0;
        return `${Z(Q)} (${ct}%)`;
      }, K = [
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
        label: N(w, y)
      }), P > 0 && j.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: N(P, y)
      }), M > 0 && j.push({
        source: "Started",
        target: "Payment Initiated",
        value: M,
        label: N(M, w)
      }), D > 0 && j.push({
        source: "Started",
        target: "Not Found",
        value: D,
        label: N(D, w)
      }), $ > 0 && j.push({
        source: "Started",
        target: "Cancelled",
        value: $,
        label: N($, w)
      }), S > 0 && j.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: N(S, w)
      }), F > 0 && j.push({
        source: "Started",
        target: "Errors",
        value: F,
        label: N(F, w)
      }), E > 0 && j.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: N(E, w)
      }), T > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, M)
      }), B > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, M)
      }), { nodes: K, links: j };
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
    }, m = (f, y) => !y || y === 0 ? "0%" : `${Math.round(f / y * 100)}%`;
    return (f, y) => (b(), q(ht, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading && !a.error ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), k("div", Up, [...y[0] || (y[0] = [
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
        ])])) : a.error ? (b(), k("div", qp, [
          r("div", Xp, [
            y[1] || (y[1] = r("div", { class: "error-icon-wrapper" }, [
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
            y[2] || (y[2] = r("p", { class: "error-title" }, "Error loading data", -1)),
            r("p", Gp, A(a.error), 1)
          ])
        ])) : (b(), k("div", Zp, [
          r("section", Qp, [
            r("div", Jp, [
              V(Ve, {
                data: v.value,
                "node-colors": x,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", tm, [
            V(ut, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (b(), k("section", em, [
            y[3] || (y[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", nm, [
              V(se, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: w }) => [
                  r("span", am, A(L(Rt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: w }) => [
                  r("span", null, A(L(Z)(Number(w.booking_initiated_count))), 1)
                ]),
                "cell-started": I(({ row: w }) => [
                  r("span", null, [
                    xt(A(L(Z)(Number(w.booking_started_count))) + " ", 1),
                    r("span", sm, " (" + A(m(Number(w.booking_started_count), Number(w.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": I(({ row: w }) => [
                  r("span", null, A(L(Z)(Number(w.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": I(({ row: w }) => [
                  r("div", om, [
                    V(Ht, { color: "success" }, {
                      default: I(() => [
                        xt(" Success: " + A(L(Z)(p(w))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Ht, { color: "danger" }, {
                      default: I(() => [
                        xt(" Failed: " + A(L(Z)(Number(w.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": I(({ row: w }) => [
                  h(w).length > 0 ? (b(), k("div", im, [
                    (b(!0), k(X, null, it(h(w), (M) => (b(), k("span", {
                      key: `${w.date}-${M.currency}`,
                      class: "badge badge-currency"
                    }, A(M.currency) + " " + A(_(M.total_value)), 1))), 128))
                  ])) : (b(), k("span", lm, "N/A"))
                ]),
                "cell-outcomes": I(({ row: w }) => [
                  r("div", rm, [
                    V(Ht, { color: "danger" }, {
                      default: I(() => [
                        xt(" Not Found: " + A(w.not_found_count ? L(Z)(Number(w.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Ht, { color: "warning" }, {
                      default: I(() => [
                        xt(" Cancelled: " + A(w.cancelled_count ? L(Z)(Number(w.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Ht, { color: "orange" }, {
                      default: I(() => [
                        xt(" No Balance: " + A(w.no_pending_balance_count ? L(Z)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Ht, { color: "danger" }, {
                      default: I(() => [
                        xt(" Errors: " + A(w.error_count ? L(Z)(Number(w.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", cm, [...y[4] || (y[4] = [
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
      _: 1
    }));
  }
}), um = /* @__PURE__ */ lt(dm, [["__scopeId", "data-v-37b8c59e"]]), hm = {
  key: 0,
  class: "loading-state"
}, fm = {
  key: 1,
  class: "card-body"
}, gm = {
  key: 0,
  class: "chart-section"
}, pm = { class: "chart-wrapper" }, mm = {
  key: 1,
  class: "checkin-daily-section"
}, bm = { class: "w-full min-w-0" }, vm = { class: "font-medium" }, ym = { class: "cell-success" }, _m = { class: "cell-danger" }, xm = {
  key: 0,
  class: "reasons-list"
}, km = { class: "reason-name" }, wm = { class: "reason-count" }, Cm = {
  key: 1,
  class: "no-reasons"
}, $m = {
  key: 2,
  class: "empty-state"
}, Mm = {
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
    }, l = ot([]), c = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], d = C(
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
    ), u = C(() => {
      const f = s.data;
      return f && (Array.isArray(f.checkin_by_day) && f.checkin_by_day.length > 0 || (f.total_checkin_initiated ?? 0) > 0) ? { ...o, ...f } : s.checkinData ?? o;
    }), h = C(() => {
      const f = s.data;
      return f && (Array.isArray(f.failed_by_step_by_day) && f.failed_by_step_by_day.length > 0 || Array.isArray(f.unrecovered_by_step) && f.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: f.total_checkin_failed ?? 0,
        total_checkin_unrecovered: f.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: f.failed_by_step_by_day ?? [],
        unrecovered_by_step: f.unrecovered_by_step ?? [],
        unrecovered_by_day: f.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), p = C(() => {
      const f = {
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
        const D = w.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), $ = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        f[D] = $[D] || "#DC2626";
      }), f;
    }), _ = (f, y) => !y || y === 0 ? "0%" : `${Math.round(f / y * 100)}%`, g = (f, y) => {
      const w = Z(f), M = _(f, y);
      return `${w} (${M})`;
    }, v = (f) => f.reduce((y, w) => y + w.failed_count, 0), x = C(() => {
      const f = [], y = [];
      if (!u.value.total_checkin_initiated)
        return { nodes: f, links: y };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const w = u.value.total_checkin_initiated, M = u.value.total_checkin_init, D = u.value.total_checkin_init_abandoned, $ = M - D, S = u.value.total_checkin_started, F = u.value.total_checkin_completed, T = u.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], P = B.reduce((j, Q) => j + Q.count, 0);
      if (M > 0) {
        const j = Math.round(M / w * 100);
        y.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${j}%)`
        });
      }
      const E = w - M;
      if (E > 0) {
        const j = Math.round(E / w * 100);
        f.push({ name: "Abandoned (Init)" }), y.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: E,
          label: `${E.toLocaleString()} (${j}%)`
        });
      }
      if (D > 0) {
        const j = Math.round(D / w * 100);
        f.push({ name: "Abandoned (Started)" }), y.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: D,
          label: `${D.toLocaleString()} (${j}%)`
        });
      }
      if ($ > 0) {
        const j = Math.round($ / w * 100);
        y.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: $,
          label: `${$.toLocaleString()} (${j}%)`
        });
      }
      if (S > 0) {
        const j = Math.round(S / w * 100);
        y.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${j}%)`
        });
      }
      if (F > 0) {
        const j = Math.round(F / S * 100);
        y.push({
          source: "Number of Passengers",
          target: "Completed",
          value: F,
          label: `${F.toLocaleString()} (${j}%)`
        });
      }
      if (B.length > 0 && P > 0) {
        f.push({ name: "Unrecovered" });
        const j = Math.round(P / S * 100);
        y.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: P,
          label: `${P.toLocaleString()} (${j}%)`
        }), B.forEach((Q) => {
          const ct = Q.step_name.replace(/_/g, " ").split(" ").map((U) => U.charAt(0).toUpperCase() + U.slice(1)).join(" "), z = Math.round(Q.count / S * 100);
          f.push({ name: ct }), y.push({
            source: "Unrecovered",
            target: ct,
            value: Q.count,
            label: `${Q.count.toLocaleString()} (${z}%)`
          });
        });
      }
      const N = S - (F + P);
      if (N > 0) {
        const j = Math.round(N / S * 100);
        f.push({ name: "Abandoned (Flow)" }), y.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${j}%)`
        });
      }
      const K = F - T;
      if (K > 0) {
        const j = Math.round(K / S * 100);
        f.push({ name: "BP Error" }), y.push({
          source: "Completed",
          target: "BP Error",
          value: K,
          label: `${K.toLocaleString()} (${j}%)`
        });
      }
      if (T > 0) {
        const j = Math.round(T / S * 100);
        y.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${j}%)`
        });
      }
      return { nodes: f, links: y };
    }), m = () => {
      const f = u.value.checkin_by_day || [], y = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((w) => {
        const M = y.find(
          (D) => D.date === w.date
        );
        return {
          ...w,
          failed_steps: M?.steps || []
        };
      }), l.value.sort((w, M) => new Date(w.date) - new Date(M.date));
    };
    return Bt(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        m();
      },
      { deep: !0, immediate: !0 }
    ), (f, y) => (b(), q(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (b(), k("div", hm, [...y[0] || (y[0] = [
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
        ])])) : (b(), k("div", fm, [
          x.value.nodes.length > 0 ? (b(), k("section", gm, [
            r("div", pm, [
              V(Ve, {
                data: x.value,
                height: "500px",
                "node-colors": p.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", mm, [
            r("div", bm, [
              V(se, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: w }) => [
                  r("span", vm, A(L(Rt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: w }) => [
                  r("span", null, A(L(Z)(w.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: w }) => [
                  r("span", null, A(g(w.checkin_init_count, w.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": I(({ row: w }) => [
                  r("span", null, A(L(Z)(w.checkin_started_count)), 1)
                ]),
                "cell-completed": I(({ row: w }) => [
                  r("span", null, A(g(w.checkin_completed_count, w.checkin_started_count)), 1)
                ]),
                "cell-closed": I(({ row: w }) => [
                  r("span", ym, A(g(w.checkin_closed_count, w.checkin_started_count)), 1)
                ]),
                "cell-failed": I(({ row: w }) => [
                  r("span", _m, A(g(v(w.failed_steps), w.checkin_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: w }) => [
                  w.failed_steps && w.failed_steps.length > 0 ? (b(), k("div", xm, [
                    (b(!0), k(X, null, it(w.failed_steps, (M) => (b(), k("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      r("span", km, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", wm, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Cm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", $m, [...y[1] || (y[1] = [
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
      _: 1
    }, 8, ["collapsible", "default-open"]));
  }
}, Wi = /* @__PURE__ */ lt(Mm, [["__scopeId", "data-v-54e40783"]]), Sm = {
  key: 0,
  class: "loading-state"
}, Dm = {
  key: 1,
  class: "card-body"
}, Am = {
  key: 0,
  class: "sankey-section"
}, Tm = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Bm = { class: "w-full min-w-0" }, Lm = { class: "font-medium whitespace-nowrap" }, Fm = { class: "cell-success" }, Pm = { class: "cell-danger" }, Em = {
  key: 0,
  class: "reasons-list"
}, Im = { class: "reason-name" }, Rm = { class: "reason-count" }, Om = {
  key: 1,
  class: "no-reasons"
}, Vm = {
  key: 2,
  class: "empty-state"
}, zm = { class: "empty-state-content" }, Nm = { class: "empty-icon-wrapper" }, jm = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = gt(ft(a, "theme")), l = (m) => m == null ? "0" : m.toLocaleString(), c = (m) => {
      const [f, y, w] = m.split("-").map(Number);
      return Rt([f, y - 1, w]).format("MMM DD");
    }, d = (m) => m.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), u = (m, f) => !f || f === 0 ? "0%" : `${Math.round(m / f * 100)}%`, h = (m, f) => {
      const y = m || 0, w = f || 0, M = l(y), D = u(y, w);
      return `${M} (${D})`;
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
    })), _ = C(() => {
      const m = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], y = a.failedData?.unrecovered_by_day || [];
      return m.map((M) => {
        const D = f.find((S) => S.date === M.date), $ = y.find((S) => S.date === M.date);
        return {
          ...M,
          failed_steps: D?.steps || [],
          unrecovered_count: $?.unrecovered_count || 0
        };
      }).sort((M, D) => new Date(M.date).getTime() - new Date(D.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], v = C(
      () => _.value.map((m) => ({
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
      const m = [], f = [], y = /* @__PURE__ */ new Set(), w = (H) => {
        y.has(H) || (m.push({ name: H }), y.add(H));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: m, links: f };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const M = a.checkinData.total_checkin_initiated || 0, D = a.checkinData.total_record_locator_init || 0, $ = a.checkinData.total_record_locator_init_abandoned || 0, S = a.checkinData.total_checkin_pre_init_abandoned_error, F = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = S != null || F != null, B = T ? Math.max(Number(S) || 0, 0) : 0, P = T ? Math.max(Number(F) || 0, 0) : 0, E = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, K = E != null || N != null, j = K ? Math.max(Number(E) || 0, 0) : 0, Q = K ? Math.max(Number(N) || 0, 0) : 0, tt = K ? Math.max($ - j - Q, 0) : $, ct = D - $, z = a.checkinData.total_record_locator_started || 0, U = a.checkinData.total_record_locator_completed || 0, G = a.checkinData.total_record_locator_closed || 0, rt = a.checkinData.total_record_locator_unrecovered || 0;
      if (D > 0) {
        const H = Math.round(D / M * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: D,
          label: `${D.toLocaleString()} (${H}%)`
        });
      }
      const st = M - D;
      if (T) {
        if (P > 0) {
          const H = Math.round(P / M * 100);
          w("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: P,
            label: `${P.toLocaleString()} (${H}%)`
          });
        }
        if (B > 0) {
          const H = Math.round(B / M * 100);
          w("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${H}%)`
          });
        }
      } else if (st > 0) {
        const H = Math.round(st / M * 100);
        w("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: st,
          label: `${st.toLocaleString()} (${H}%)`
        });
      }
      if (K) {
        if (j > 0) {
          const H = Math.round(j / M * 100);
          w("Error"), f.push({
            source: "Booking Retrieval",
            target: "Error",
            value: j,
            label: `${j.toLocaleString()} (${H}%)`
          });
        }
        if (Q > 0) {
          const H = Math.round(Q / M * 100);
          w("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: Q,
            label: `${Q.toLocaleString()} (${H}%)`
          });
        }
        if (tt > 0) {
          const H = Math.round(tt / M * 100);
          w("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${H}%)`
          });
        }
      } else if ($ > 0) {
        const H = Math.round($ / M * 100);
        w("Abandoned (Started)"), f.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${H}%)`
        });
      }
      if (ct > 0) {
        const H = Math.round(ct / M * 100);
        f.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: ct,
          label: `${ct.toLocaleString()} (${H}%)`
        });
      }
      if (U > 0) {
        const H = Math.round(U / z * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: U,
          label: `${U.toLocaleString()} (${H}%)`
        });
      }
      if (rt > 0) {
        w("Errors");
        const H = Math.round(rt / z * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: rt,
          label: `${rt.toLocaleString()} (${H}%)`
        });
      }
      const St = z - (U + rt);
      if (St > 0) {
        const H = Math.round(St / z * 100);
        w("Abandoned (Flow)"), f.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: St,
          label: `${St.toLocaleString()} (${H}%)`
        });
      }
      const _t = U - G;
      if (_t > 0) {
        const H = Math.round(_t / z * 100);
        w("BP Error"), f.push({
          source: "Completed",
          target: "BP Error",
          value: _t,
          label: `${_t.toLocaleString()} (${H}%)`
        });
      }
      if (G > 0) {
        const H = Math.round(G / z * 100);
        f.push({
          source: "Completed",
          target: "Closed with BP",
          value: G,
          label: `${G.toLocaleString()} (${H}%)`
        });
      }
      return { nodes: m, links: f };
    });
    return t({ isDark: i }), (m, f) => (b(), q(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), k("div", Sm, [...f[0] || (f[0] = [
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
        ])])) : (b(), k("div", Dm, [
          x.value.nodes.length > 0 ? (b(), k("div", Am, [
            V(Ve, {
              data: x.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : O("", !0),
          _.value && _.value.length > 0 ? (b(), k("div", Tm, [
            r("div", Bm, [
              V(se, {
                columns: g,
                rows: v.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: y }) => [
                  r("span", Lm, A(c(String(y.date))), 1)
                ]),
                "cell-checkinInit": I(({ row: y }) => [
                  r("span", null, A(l(y.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": I(({ row: y }) => [
                  r("span", null, A(h(y.record_locator_init_count, y.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": I(({ row: y }) => [
                  r("span", null, A(h(y.record_locator_started_count, y.record_locator_init_count)), 1)
                ]),
                "cell-completed": I(({ row: y }) => [
                  r("span", null, A(h(y.record_locator_completed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-closed": I(({ row: y }) => [
                  r("span", Fm, A(h(y.record_locator_closed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-failed": I(({ row: y }) => [
                  r("span", Pm, A(h(y.unrecovered_count, y.record_locator_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: y }) => [
                  Array.isArray(y.failed_steps) && y.failed_steps.length > 0 ? (b(), k("div", Em, [
                    (b(!0), k(X, null, it(y.failed_steps, (w) => (b(), k("div", {
                      key: w.step_name,
                      class: "reason-item"
                    }, [
                      r("span", Im, A(d(w.step_name)) + ":", 1),
                      r("span", Rm, A(w.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Om, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("div", Vm, [
            r("div", zm, [
              r("div", Nm, [
                V(L(qt), { class: "empty-icon" })
              ]),
              f[1] || (f[1] = r("p", { class: "empty-title" }, "No check-in data available", -1)),
              f[2] || (f[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Hm = /* @__PURE__ */ lt(jm, [["__scopeId", "data-v-00f07618"]]), Wm = {
  key: 0,
  class: "loading-state"
}, Ym = {
  key: 1,
  class: "card-body"
}, Km = {
  key: 0,
  class: "chart-section"
}, Um = { class: "chart-wrapper" }, qm = {
  key: 1,
  class: "record-locator-daily-section"
}, Xm = { class: "w-full min-w-0" }, Gm = { class: "cell-plain font-medium" }, Zm = { class: "cell-plain text-center" }, Qm = { class: "cell-plain text-center" }, Jm = { class: "cell-plain text-center" }, t0 = { class: "cell-plain text-center" }, e0 = { class: "cell-plain text-center success-value" }, n0 = { class: "cell-plain text-center failed-value" }, a0 = { class: "cell-plain text-center warning-value" }, s0 = { class: "cell-plain text-center" }, o0 = { class: "cell-plain text-center failed-value" }, i0 = {
  key: 2,
  class: "empty-state"
}, l0 = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = gt(ft(a, "theme")), l = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (m, f) => new Date(m.date).getTime() - new Date(f.date).getTime()
    ) : []), c = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "checkinStarted", label: "Checkin Started", align: "center" },
      { key: "checkinCompleted", label: "Checkin Completed (%)", align: "center" },
      { key: "checkinClosed", label: "Checkin Closed (%)", align: "center" },
      { key: "checkinFailed", label: "Checkin Failed (%)", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" }
    ], d = [
      { key: "createPayment", label: "Create Payment", align: "center" },
      { key: "failedPayment", label: "Failed Payment", align: "center" }
    ], u = C(
      () => a.isAvianca ? [...c, ...d] : c
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
    ), p = C(() => a.data), _ = C(() => ({
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
    })), g = (m, f) => !f || f === 0 ? "0%" : `${Math.round(m / f * 100)}%`, v = (m, f) => {
      const y = Z(m), w = g(m, f);
      return `${y} (${w})`;
    }, x = C(() => {
      const m = [], f = [], y = /* @__PURE__ */ new Set(), w = (st) => {
        y.has(st) || (m.push({ name: st }), y.add(st));
      };
      if (!p.value.total_checkin_initiated)
        return { nodes: m, links: f };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const M = p.value.total_checkin_initiated, D = p.value.total_record_locator_init, $ = p.value.total_record_locator_started, S = p.value.total_record_locator_completed, F = p.value.total_record_locator_closed, T = p.value.total_record_locator_failed, B = p.value.total_record_locator_abandoned, P = p.value.total_record_locator_init_abandoned, E = p.value.total_checkin_pre_init_abandoned_error, N = p.value.total_checkin_pre_init_abandoned_voluntary, K = E != null || N != null, j = K ? Math.max(Number(E) || 0, 0) : 0, Q = K ? Math.max(Number(N) || 0, 0) : 0, tt = p.value.total_record_locator_init_abandoned_error, ct = p.value.total_record_locator_init_abandoned_voluntary, z = tt != null || ct != null, U = z ? Math.max(Number(tt) || 0, 0) : 0, G = z ? Math.max(Number(ct) || 0, 0) : 0;
      if (D > 0) {
        const st = Math.round(D / M * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: D,
          label: `${D.toLocaleString()} (${st}%)`
        });
      }
      const rt = M - D;
      if (K) {
        if (Q > 0) {
          const st = Math.round(Q / M * 100);
          w("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: Q,
            label: `${Q.toLocaleString()} (${st}%)`
          });
        }
        if (j > 0) {
          const st = Math.round(j / M * 100);
          w("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: j,
            label: `${j.toLocaleString()} (${st}%)`
          });
        }
      } else if (rt > 0) {
        const st = Math.round(rt / M * 100);
        w("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: rt,
          label: `${rt.toLocaleString()} (${st}%)`
        });
      }
      if ($ > 0) {
        const st = Math.round($ / M * 100);
        f.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: $,
          label: `${$.toLocaleString()} (${st}%)`
        });
      }
      if (z) {
        if (U > 0) {
          const st = Math.round(U / M * 100);
          w("Error"), f.push({
            source: "Booking retrive",
            target: "Error",
            value: U,
            label: `${U.toLocaleString()} (${st}%)`
          });
        }
        if (G > 0) {
          const st = Math.round(G / M * 100);
          w("Abandoned (Started)"), f.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: G,
            label: `${G.toLocaleString()} (${st}%)`
          });
        }
      } else if (P > 0) {
        const st = Math.round(P / M * 100);
        w("Abandoned (Started)"), f.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${st}%)`
        });
      }
      if (S > 0) {
        const st = Math.round(S / $ * 100);
        f.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: S,
          label: `${S.toLocaleString()} (${st}%)`
        });
      }
      if (F > 0) {
        const st = Math.round(F / $ * 100);
        f.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: F,
          label: `${F.toLocaleString()} (${st}%)`
        });
      }
      if (T > 0) {
        const st = Math.round(T / $ * 100);
        w("Checkin Failed"), f.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${st}%)`
        });
      }
      if (B > 0) {
        const st = Math.round(B / $ * 100);
        w("Abandoned (Flow)"), f.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${st}%)`
        });
      }
      return { nodes: m, links: f };
    });
    return t({ isDark: i }), (m, f) => (b(), q(ht, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), k("div", Wm, [...f[0] || (f[0] = [
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
        ])])) : (b(), k("div", Ym, [
          x.value.nodes.length > 0 ? (b(), k("section", Km, [
            r("div", Um, [
              V(Ve, {
                data: x.value,
                height: "500px",
                "node-colors": _.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", qm, [
            r("div", Xm, [
              V(se, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: y }) => [
                  r("span", Gm, A(L(Rt)(String(y.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: y }) => [
                  r("span", Zm, A(L(Z)(y.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: y }) => [
                  r("span", Qm, A(v(y.record_locator_init_count, y.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": I(({ row: y }) => [
                  r("span", Jm, A(L(Z)(y.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": I(({ row: y }) => [
                  r("span", t0, A(v(y.record_locator_completed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": I(({ row: y }) => [
                  r("span", e0, A(v(y.record_locator_closed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": I(({ row: y }) => [
                  r("span", n0, A(v(y.record_locator_failed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": I(({ row: y }) => [
                  r("span", a0, A(v(y.record_locator_abandoned_count, y.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": I(({ row: y }) => [
                  r("span", s0, A(L(Z)(y.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": I(({ row: y }) => [
                  r("span", o0, A(L(Z)(y.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (b(), k("section", i0, [...f[1] || (f[1] = [
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
      _: 1
    }, 8, ["collapsible"]));
  }
}), Yi = /* @__PURE__ */ lt(l0, [["__scopeId", "data-v-5d48fcb3"]]), r0 = {
  key: 0,
  class: "loading-state"
}, c0 = {
  key: 1,
  class: "card-body"
}, d0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, u0 = { class: "w-full min-w-0" }, h0 = { class: "segment-plain" }, f0 = { class: "segment-plain" }, g0 = { class: "segment-plain" }, p0 = { class: "percentage-value" }, m0 = { class: "percentage-value" }, b0 = { class: "percentage-value success" }, v0 = {
  key: 1,
  class: "empty-state"
}, y0 = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (p) => {
      s("export", p);
    }, { isDark: i } = gt(ft(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], c = C(
      () => a.data.map((p, _) => ({
        id: `segment-${_}-${p.departure_airport}-${p.arrival_airport}-${p.segment_init_count}-${p.segment_started_count}`,
        departure_airport: p.departure_airport,
        conexion_airport: p.conexion_airport,
        arrival_airport: p.arrival_airport,
        segment_init_count: p.segment_init_count,
        segment_started_count: p.segment_started_count,
        segment_completed_count: p.segment_completed_count,
        segment_closed_count: p.segment_closed_count
      }))
    ), d = (p, _) => !_ || _ === 0 || !p ? "0%" : `${Math.round(p / _ * 100)}%`, u = (p) => !p || p === "None" ? "-" : String(p).trim().replace(/_[0-9]+$/i, ""), h = (p) => {
      const _ = u(p?.departure_airport), g = u(p?.arrival_airport);
      return _ === "-" || g === "-" ? !1 : _ === g;
    };
    return t({ isDark: i }), (p, _) => (b(), q(ht, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), k("div", r0, [..._[0] || (_[0] = [
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
        ])])) : (b(), k("div", c0, [
          a.data.length > 0 ? (b(), k("section", d0, [
            r("div", u0, [
              V(se, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": I(({ row: g }) => [
                  r("span", h0, A(u(g.departure_airport)), 1)
                ]),
                "cell-connection": I(({ row: g }) => [
                  r("span", {
                    class: Y(["segment-plain", {
                      "segment-plain--muted": u(g.conexion_airport) === "-"
                    }])
                  }, A(u(g.conexion_airport)), 3)
                ]),
                "cell-arrival": I(({ row: g }) => [
                  r("span", f0, A(u(g.arrival_airport)), 1)
                ]),
                "cell-trip": I(({ row: g }) => [
                  r("span", g0, A(h(g) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": I(({ row: g }) => [
                  xt(A(L(Z)(g.segment_init_count)), 1)
                ]),
                "cell-started": I(({ row: g }) => [
                  r("span", p0, A(d(g.segment_started_count, g.segment_init_count)), 1)
                ]),
                "cell-completed": I(({ row: g }) => [
                  r("span", m0, A(d(g.segment_completed_count, g.segment_init_count)), 1)
                ]),
                "cell-closed": I(({ row: g }) => [
                  r("span", b0, A(d(g.segment_closed_count, g.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", v0, [..._[1] || (_[1] = [
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
      _: 1
    }, 8, ["collapsible", "default-open"]));
  }
}), Ki = /* @__PURE__ */ lt(y0, [["__scopeId", "data-v-b6fca91a"]]), _0 = { class: "checkin-container__body" }, x0 = /* @__PURE__ */ J({
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
    const n = e, a = t, s = C(() => n.loading || n.checkinLoading);
    C(() => n.loading || n.checkinMetricsLoading);
    const o = C(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = C(() => n.loading || n.segmentsLoading), l = C(() => n.recordLocatorData ?? n.checkinMetricsData);
    function c(h, p) {
      a("export", { source: h, format: p });
    }
    function d(h) {
      return typeof h == "object" && h !== null && "source" in h;
    }
    function u(h) {
      if (d(h)) {
        a("export", h);
        return;
      }
      c("checkinSegments", h);
    }
    return (h, p) => (b(), q(ht, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", _0, [
          e.showCheckin ? (b(), q(Wi, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[0] || (p[0] = (_) => c("checkin", _))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : O("", !0),
          V(Yi, {
            collapsible: !1,
            loading: o.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[1] || (p[1] = (_) => c("recordLocator", _))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          V(Ki, {
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
    }, 8, ["default-open"]));
  }
}), k0 = /* @__PURE__ */ lt(x0, [["__scopeId", "data-v-90d88bae"]]), w0 = {
  key: 0,
  class: "loading-state"
}, C0 = {
  key: 1,
  class: "card-body"
}, $0 = { class: "chart-section" }, M0 = { class: "chart-wrapper" }, S0 = {
  key: 1,
  class: "empty-chart"
}, D0 = { class: "payment-success-summary" }, A0 = {
  key: 0,
  class: "disruption-daily-section"
}, T0 = { class: "w-full min-w-0" }, B0 = { class: "font-medium text-center" }, L0 = { class: "text-center" }, F0 = { class: "text-center" }, P0 = { class: "percentage-text" }, E0 = { class: "text-center" }, I0 = { class: "abandoned-value" }, R0 = { class: "badges-container badges-wrap" }, O0 = { class: "badges-container badges-wrap" }, V0 = {
  key: 1,
  class: "empty-state"
}, z0 = /* @__PURE__ */ J({
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
    const a = e, s = t, o = (m) => {
      s("export", m);
    }, i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (m, f) => new Date(m.date).getTime() - new Date(f.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], c = C(
      () => i.value.map((m) => ({
        id: m.date,
        ...m
      }))
    ), d = C(() => a.data?.total_payment_success || []), u = C(() => {
      const m = d.value;
      return m.length === 0 ? p(0) : m.map((f) => `${f.currency} ${p(f.total_value)}`).join(" · ");
    }), h = (m, f) => !f || f === 0 ? "0%" : `${Math.round(m / f * 100)}%`, p = (m) => wt(m), _ = (m) => (m ?? []).reduce((f, y) => f + (y.count ?? 0), 0), g = (m) => typeof m.sell_success_count == "number" ? m.sell_success_count : _(m.payment_success_total), v = C(() => {
      const m = a.data, f = m.total_disruption_conversations || 0, y = m.total_disruption_initiated || 0, w = m.total_voluntary || 0, M = m.total_involuntary || 0, D = m.total_accepted || 0, $ = m.total_confirmed || 0, S = typeof m.total_sell_success == "number" ? m.total_sell_success : _(m.total_payment_success), F = m.total_sell_failed || 0, T = Math.max(0, f - y), B = Math.max(0, y - w - M), P = Math.max(0, M - D), E = Math.max(0, w - $), N = F, K = Math.max(0, $ - S - N), j = (ct, z) => {
        const U = z > 0 ? Math.round(ct / z * 100) : 0;
        return `${ct.toLocaleString()} (${U}%)`;
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
      return y > 0 && tt.push({
        source: "Initiated",
        target: "Started",
        value: y,
        label: j(y, f)
      }), T > 0 && tt.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: j(T, f)
      }), w > 0 && tt.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: j(w, f)
      }), M > 0 && tt.push({
        source: "Started",
        target: "Involuntary",
        value: M,
        label: j(M, f)
      }), B > 0 && tt.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: j(B, f)
      }), D > 0 && tt.push({
        source: "Involuntary",
        target: "Accepted",
        value: D,
        label: j(D, f)
      }), P > 0 && tt.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: P,
        label: j(P, f)
      }), $ > 0 && tt.push({
        source: "Voluntary",
        target: "Confirmed",
        value: $,
        label: j($, f)
      }), E > 0 && tt.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: E,
        label: j(E, f)
      }), S > 0 && tt.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: j(S, f)
      }), N > 0 && tt.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: j(N, f)
      }), K > 0 && tt.push({
        source: "Confirmed",
        target: "Not Paid",
        value: K,
        label: j(K, f)
      }), { nodes: Q, links: tt };
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
    return (m, f) => (b(), q(ht, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), k("div", w0, [...f[0] || (f[0] = [
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
        ])])) : (b(), k("div", C0, [
          r("section", $0, [
            r("div", M0, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (b(), q(Ve, {
                key: 0,
                data: v.value,
                "node-colors": x,
                height: "500px"
              }, null, 8, ["data"])) : (b(), k("div", S0, [...f[1] || (f[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", D0, [
            V(ut, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (b(), k("section", A0, [
            f[2] || (f[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", T0, [
              V(se, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: y }) => [
                  r("span", B0, A(L(Rt)(String(y.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: y }) => [
                  r("span", L0, A(L(Z)(Number(y.disruption_conversations))), 1)
                ]),
                "cell-started": I(({ row: y }) => [
                  r("span", F0, [
                    xt(A(L(Z)(Number(y.disruption_initiated_count))) + " ", 1),
                    r("span", P0, " (" + A(h(Number(y.disruption_initiated_count), Number(y.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": I(({ row: y }) => [
                  r("span", E0, [
                    r("span", I0, A(L(Z)(Number(y.disruption_initiated_count) - Number(y.voluntary_count) - Number(y.involuntary_count))) + " (" + A(h(Number(y.disruption_initiated_count) - Number(y.voluntary_count) - Number(y.involuntary_count), Number(y.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": I(({ row: y }) => [
                  r("div", R0, [
                    (b(!0), k(X, null, it([y], (w, M) => (b(), k(X, { key: M }, [
                      V(Ht, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: I(() => [
                          xt(" VOL " + A(L(Z)(w.voluntary_count)) + " (" + A(h(w.voluntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Ht, { color: "success" }, {
                        default: I(() => [
                          xt(" Confirm " + A(L(Z)(w.confirmed_count)) + " (" + A(h(w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Ht, { color: "warning" }, {
                        default: I(() => [
                          xt(" Not Confirm " + A(L(Z)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(w.voluntary_count - w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Ht, { color: "danger" }, {
                        default: I(() => [
                          xt(" Reject " + A(L(Z)(w.sell_failed_count)) + " (" + A(h(w.sell_failed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Ht, { color: "orange" }, {
                        default: I(() => [
                          xt(" Not Paid " + A(L(Z)(Math.max(0, w.confirmed_count - g(w) - w.sell_failed_count))) + " (" + A(h(Math.max(0, w.confirmed_count - g(w) - w.sell_failed_count), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Ht, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: I(() => [
                          xt(" Finish " + A(L(Z)(g(w))) + " (" + A(h(g(w), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (b(!0), k(X, null, it(w.payment_success_total || [], (D) => (b(), q(Ht, {
                        key: `${w.date}-${D.currency}`,
                        color: "neutral"
                      }, {
                        default: I(() => [
                          xt(A(D.currency) + " " + A(p(D.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": I(({ row: y }) => [
                  r("div", O0, [
                    (b(!0), k(X, null, it([y], (w, M) => (b(), k(X, { key: M }, [
                      V(Ht, { color: "purple" }, {
                        default: I(() => [
                          xt(" INV " + A(L(Z)(w.involuntary_count)) + " (" + A(h(w.involuntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Ht, { color: "danger" }, {
                        default: I(() => [
                          xt(" Human " + A(L(Z)(w.involuntary_count - w.accepted_count)) + " (" + A(h(w.involuntary_count - w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Ht, { color: "success" }, {
                        default: I(() => [
                          xt(" Accept " + A(L(Z)(w.accepted_count)) + " (" + A(h(w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", V0, [...f[3] || (f[3] = [
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
      _: 1
    }));
  }
}), N0 = /* @__PURE__ */ lt(z0, [["__scopeId", "data-v-c9b67dfc"]]), j0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, H0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, W0 = {
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
  setup(e, { expose: t, emit: n }) {
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (v) => {
      i("export", v);
    }, c = ft(o, "theme"), { isDark: d } = gt(c), u = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = ot({ labels: [], datasets: [] }), p = C(
      () => o.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), _ = C(() => {
      const v = p.value, x = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, m = (w) => x > 0 ? (w / x * 100).toFixed(1) : "0.0", f = v.total_faq_events, y = f > 0 ? `${(v.total_documents_found / f * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: u.airline_information,
          value: `${m(v.total_airline_information_retrieved)}%`,
          subvalue: `${Z(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: u.booking_info,
          value: `${m(v.total_booking_info_retrieved)}%`,
          subvalue: `${Z(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: u.flight_status,
          value: `${m(v.total_flight_status_retrieved)}%`,
          subvalue: `${Z(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: Z(v.total_documents_found),
          subvalue: y
        }
      ];
    }), g = (v) => {
      if (!v) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const x = v.faq_by_day || [];
      if (x.length > 0) {
        const m = x.map((M) => Rt(M.date).format("MMM DD")), f = x.map((M) => M.airline_information_retrieved_count || 0), y = x.map((M) => M.flight_status_retrieved_count || 0), w = x.map((M) => M.booking_info_retrieved_count || 0);
        h.value = {
          labels: m,
          datasets: [
            {
              label: "Airline Information",
              data: f,
              borderColor: u.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: y,
              borderColor: u.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: w,
              borderColor: u.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        h.value = { labels: [], datasets: [] };
    };
    return Bt(
      () => o.data,
      (v) => {
        g(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: d }), (v, x) => (b(), q(ht, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: Y(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (b(), k("div", j0, [
            r("div", H0, [
              (b(), k(X, null, it(a, (m, f) => r("div", {
                key: f,
                class: Y(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[f]]),
                style: pt({ height: `${m}%` })
              }, null, 6)), 64))
            ]),
            x[0] || (x[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (b(), k(X, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), k("section", W0, [
              r("div", Y0, [
                V(he, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", K0, [
                (b(!0), k(X, null, it(_.value, (m) => (b(), q(ut, {
                  key: m.name,
                  class: "min-w-0",
                  color: m.color,
                  title: m.label,
                  value: m.value,
                  subvalue: m.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (b(), k("section", U0, [...x[1] || (x[1] = [
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
      _: 1
    }));
  }
}), X0 = /* @__PURE__ */ lt(q0, [["__scopeId", "data-v-791a0ba7"]]), G0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, Z0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Q0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, J0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, tb = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, eb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, nb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, ab = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, sb = { class: "max-w-[360px] px-4 text-center" }, ob = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ib = /* @__PURE__ */ J({
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
    }, i = e, l = n, c = (g) => {
      l("export", g);
    }, d = ft(i, "theme"), { isDark: u } = gt(d), h = C(() => {
      const g = i.data?.agents_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const x = /* @__PURE__ */ new Set();
      for (const y of Object.values(g))
        for (const w of Object.keys(y))
          x.add(w);
      const f = Array.from(x).map((y) => {
        const w = y.toLowerCase(), M = o[w] || o[y] || "#94a3b8";
        return {
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          data: v.map((D) => g[D]?.[y] || 0),
          borderColor: M
        };
      });
      return {
        labels: v.map((y) => Rt(y).format("MMM DD")),
        datasets: f
      };
    }), p = C(() => {
      const g = i.data?.agents_by_day || {}, v = {};
      for (const m of Object.values(g))
        for (const [f, y] of Object.entries(m))
          v[f] = (v[f] || 0) + y;
      const x = Object.values(v).reduce((m, f) => m + f, 0);
      return x === 0 ? [] : Object.entries(v).sort(([, m], [, f]) => f - m).map(([m, f]) => {
        const y = m.toLowerCase();
        return {
          name: m,
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          total: f,
          percentage: (f / x * 100).toFixed(1),
          color: o[y] || o[m] || "#94a3b8"
        };
      });
    }), _ = C(() => p.value.slice(0, 4));
    return t({ isDark: u }), (g, v) => (b(), q(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !i.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: c
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: Y(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          i.loading ? (b(), k("div", G0, [
            r("div", Z0, [
              (b(), k(X, null, it(a, (x, m) => r("div", {
                key: m,
                class: Y(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[m]]),
                style: pt({ height: `${x}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (b(), k(X, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), k("section", Q0, [
              r("div", J0, [
                V(he, {
                  data: h.value,
                  options: e.options,
                  theme: d.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              _.value.length ? (b(), k("div", tb, [
                (b(!0), k(X, null, it(_.value, (x) => (b(), q(ut, {
                  key: x.name,
                  class: "min-w-0",
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${L(Z)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])) : O("", !0)
            ])) : p.value.length ? (b(), k("section", eb, [
              r("div", nb, [
                (b(!0), k(X, null, it(_.value, (x) => (b(), q(ut, {
                  key: x.name,
                  class: "min-w-0",
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${L(Z)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : O("", !0),
            p.value.length ? O("", !0) : (b(), k("section", ab, [
              r("div", sb, [
                r("div", ob, [
                  V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[1] || (v[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                v[2] || (v[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), lb = /* @__PURE__ */ lt(ib, [["__scopeId", "data-v-443fc360"]]), rb = {
  key: 0,
  class: "loading-state"
}, cb = {
  key: 1,
  class: "card-body"
}, db = {
  key: 0,
  class: "chart-section"
}, ub = {
  key: 1,
  class: "empty-state"
}, hb = {
  key: 2,
  class: "comparison-section"
}, fb = { class: "comparison-grid" }, gb = /* @__PURE__ */ J({
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
    }, s = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = n, l = (g) => {
      i("export", g);
    }, { isDark: c } = gt(ft(o, "theme"));
    C(() => o.data?.total_sell_success ?? 0);
    const d = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const x of Object.keys(v.channels))
          g.add(x);
      return Array.from(g).sort();
    }), u = (g, v) => a[g.toLowerCase()] ?? s[v % s.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function p(g) {
      if (g.delta === null) return "No previous data";
      const v = Z(g.previous), x = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${v})` : `${g.delta > 0 ? "↑" : "↓"} ${x} vs prev. period (${v})`;
    }
    const _ = C(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const v = g.map((m) => Rt(m.date).format("MMM-DD")), x = d.value.map((m, f) => ({
        label: m,
        data: g.map((y) => y.channels[m] ?? 0),
        backgroundColor: u(m, f),
        borderRadius: 4
      }));
      return { labels: v, datasets: x };
    });
    return t({ isDark: c }), (g, v) => (b(), q(ht, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (b(), k("div", rb, [...v[0] || (v[0] = [
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
        ])])) : (b(), k("div", cb, [
          _.value.labels.length > 0 ? (b(), k("section", db, [
            V(be, {
              data: _.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (b(), k("section", ub, [...v[1] || (v[1] = [
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
          e.channelComparison.length > 0 ? (b(), k("section", hb, [
            r("div", fb, [
              (b(!0), k(X, null, it(e.channelComparison, (x, m) => (b(), q(L(ut), {
                key: x.channel,
                color: u(x.channel, m),
                title: h(x.channel),
                value: L(Z)(x.current),
                subvalue: p(x)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Ui = /* @__PURE__ */ lt(gb, [["__scopeId", "data-v-1896c562"]]), pb = {
  key: 0,
  class: "loading-state"
}, mb = {
  key: 1,
  class: "card-body"
}, bb = {
  key: 0,
  class: "chart-section"
}, vb = { class: "chart-wrapper" }, yb = {
  key: 1,
  class: "empty-state"
}, _b = { class: "seller-value-cards" }, xb = {
  key: 2,
  class: "seller-daily-section"
}, kb = { class: "w-full min-w-0" }, wb = { class: "sl-cell font-medium" }, Cb = { class: "sl-cell text-center" }, $b = { class: "sl-cell text-center" }, Mb = { class: "sl-cell text-center" }, Sb = { class: "sl-cell text-center" }, Db = { class: "sl-cell text-center" }, Ab = { class: "sl-cell text-center success-value" }, Tb = {
  key: 0,
  class: "currency-cell-list"
}, Bb = {
  key: 1,
  class: "empty-cell"
}, Lb = { class: "sl-cell text-center success-value" }, Fb = { class: "sl-cell text-center" }, Pb = { class: "sl-cell text-center success-value" }, Eb = {
  key: 0,
  class: "currency-cell-list"
}, Ib = {
  key: 1,
  class: "empty-cell"
}, Rb = { class: "sl-cell text-center success-value" }, Ob = { class: "sl-cell text-center" }, Vb = { class: "sl-cell text-center success-value" }, zb = {
  key: 0,
  class: "currency-cell-list"
}, Nb = { key: 1 }, jb = {
  key: 0,
  class: "failed-reasons"
}, Hb = { class: "reason-name" }, Wb = { class: "reason-count" }, Yb = {
  key: 1,
  class: "empty-cell"
}, Kb = /* @__PURE__ */ J({
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
    }, { isDark: l } = gt(ft(s, "theme")), c = C(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const B = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((P) => {
        const E = B.findIndex((N) => N.date === P.date);
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
      }), B.sort((P, E) => new Date(P.date).getTime() - new Date(E.date).getTime());
    }), d = [
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
    ], u = C(
      () => c.value.map((B) => ({
        id: B.date,
        ...B
      }))
    ), h = C(() => s.sellerData), p = C(() => s.failedData), _ = C(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), g = C(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), v = C(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), x = C(() => {
      const B = _.value;
      return B.length > 0 ? B.map((P) => `${P.currency} ${De(P.total_value)}`).join(" · ") : T(s.sellerData.total_value_sell_success);
    });
    function m(B) {
      return B.length > 0 ? B.map((P) => `${P.currency} ${De(P.total_value)}`).join(" · ") : "—";
    }
    const f = C(
      () => m(g.value)
    ), y = C(
      () => m(v.value)
    ), w = C(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: P = 0,
        total_sell_booking_created: E = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: K = 0,
        total_sell_cash_option: j = 0,
        total_sell_success_bank_transfer: Q = 0,
        total_sell_success_cash: tt = 0
      } = h.value, { failed_by_reason_by_day: ct = [] } = p.value;
      if (B === 0) return { nodes: [], links: [] };
      const z = Math.max(0, N - (Q ?? 0) - (tt ?? 0)), U = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: P },
        { name: "Booking Created", value: E },
        { name: "Sell Success", value: z }
      ], G = [], rt = B - P;
      if (rt > 0) {
        const H = Math.round(rt / B * 100);
        U.push({ name: "Abandoned (Init)", value: rt }), G.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: rt,
          label: `${rt.toLocaleString()} (${H}%)`
        });
      }
      if (P > 0) {
        const H = Math.round(P / B * 100);
        G.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: P,
          label: `${P.toLocaleString()} (${H}%)`
        });
      }
      const st = ct.reduce((H, et) => (et.reasons && Array.isArray(et.reasons) && et.reasons.forEach((nt) => {
        const dt = nt.reason, vt = nt.failed_count;
        H[dt] = (H[dt] || 0) + vt;
      }), H), {});
      if (E > 0) {
        const H = Math.round(E / B * 100);
        G.push({
          source: "Sell Started",
          target: "Booking Created",
          value: E,
          label: `${E.toLocaleString()} (${H}%)`
        });
      }
      if (K > 0) {
        const H = Math.round(K / B * 100);
        U.push({ name: "Bank Transfer", value: K }), G.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: K,
          label: `${K.toLocaleString()} (${H}%)`
        });
      }
      if (j > 0) {
        const H = Math.round(j / B * 100);
        U.push({ name: "Cash Option", value: j }), G.push({
          source: "Booking Created",
          target: "Cash Option",
          value: j,
          label: `${j.toLocaleString()} (${H}%)`
        });
      }
      if (z > 0) {
        const H = Math.round(z / B * 100);
        G.push({
          source: "Booking Created",
          target: "Sell Success",
          value: z,
          label: `${z.toLocaleString()} (${H}%)`
        });
      }
      if ((Q ?? 0) > 0) {
        const H = Math.round((Q ?? 0) / B * 100);
        U.push({ name: "Bank Transfer Success", value: Q ?? 0 }), G.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: Q ?? 0,
          label: `${(Q ?? 0).toLocaleString()} (${H}%)`
        });
      }
      if ((tt ?? 0) > 0) {
        const H = Math.round((tt ?? 0) / B * 100);
        U.push({ name: "Cash Option Success", value: tt ?? 0 }), G.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: tt ?? 0,
          label: `${(tt ?? 0).toLocaleString()} (${H}%)`
        });
      }
      const St = E - z - K - j;
      if (St > 0) {
        const H = Math.round(St / B * 100);
        U.push({ name: "Failed at Completion", value: St }), G.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: St,
          label: `${St.toLocaleString()} (${H}%)`
        });
      }
      const _t = P - E;
      if (_t > 0) {
        const H = Math.round(_t / B * 100);
        U.push({ name: "Failed at Booking", value: _t }), G.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: _t,
          label: `${_t.toLocaleString()} (${H}%)`
        });
      }
      if (Object.keys(st).length > 0) {
        const H = Object.values(st).reduce((nt, dt) => nt + dt, 0), et = _t - H;
        if (Object.entries(st).filter(([, nt]) => nt > 0).sort(([, nt], [, dt]) => dt - nt).forEach(([nt, dt]) => {
          const vt = Math.round(dt / B * 100);
          U.push({ name: `Failed: ${nt}`, value: dt }), G.push({
            source: "Failed at Booking",
            target: `Failed: ${nt}`,
            value: dt,
            label: `${dt.toLocaleString()} (${vt}%)`
          });
        }), et > 0) {
          const nt = Math.round(et / B * 100);
          U.push({ name: "Failed: Without Reason", value: et }), G.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: et,
            label: `${et.toLocaleString()} (${nt}%)`
          });
        }
      }
      return { nodes: U, links: G };
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
    }, D = C(() => M), $ = (B, P) => !P || P === 0 ? "0%" : `${Math.round(B / P * 100)}%`, S = (B, P) => {
      const E = Z(B), N = $(B, P);
      return `${E} (${N})`;
    }, F = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((P, E) => P + (E.total_value || 0), 0) : 0, T = (B) => De(F(B));
    return t({ isDark: l }), (B, P) => (b(), q(ht, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (b(), k("div", pb, [...P[0] || (P[0] = [
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
        ])])) : (b(), k("div", mb, [
          w.value.nodes.length > 0 ? (b(), k("section", bb, [
            r("div", vb, [
              V(Ve, {
                data: w.value,
                "node-colors": D.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (b(), k("section", yb, [...P[1] || (P[1] = [
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
          r("section", _b, [
            V(ut, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: x.value
            }, null, 8, ["value"]),
            V(ut, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: f.value
            }, null, 8, ["value"]),
            V(ut, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: y.value
            }, null, 8, ["value"])
          ]),
          c.value && c.value.length > 0 ? (b(), k("section", xb, [
            r("div", kb, [
              V(se, {
                columns: d,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: E }) => [
                  r("span", wb, A(L(Rt)(String(E.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": I(({ row: E }) => [
                  r("span", Cb, A(L(Z)(Number(E.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": I(({ row: E }) => [
                  r("span", $b, A(S(E.sell_started_count, E.seller_conversations || E.sell_started_count)), 1)
                ]),
                "cell-getQuote": I(({ row: E }) => [
                  r("span", Mb, A(S(E.sell_get_quote_count, E.seller_conversations || E.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": I(({ row: E }) => [
                  r("span", Sb, A(S(E.sell_booking_created_count, E.seller_conversations || E.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": I(({ row: E }) => [
                  r("span", Db, A(L(Z)(Number(E.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": I(({ row: E }) => [
                  r("span", Ab, [
                    Array.isArray(E.daily_value_sell_success_bank_transfer) && E.daily_value_sell_success_bank_transfer.length > 0 ? (b(), k("div", Tb, [
                      (b(!0), k(X, null, it(E.daily_value_sell_success_bank_transfer, (N) => (b(), k("span", {
                        key: `${E.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(L(De)(N.total_value)), 1))), 128))
                    ])) : (b(), k("span", Bb, "-"))
                  ])
                ]),
                "cell-btSuccess": I(({ row: E }) => [
                  r("span", Lb, A(L(Z)(Number(E.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": I(({ row: E }) => [
                  r("span", Fb, A(L(Z)(Number(E.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": I(({ row: E }) => [
                  r("span", Pb, [
                    Array.isArray(E.daily_value_sell_success_cash) && E.daily_value_sell_success_cash.length > 0 ? (b(), k("div", Eb, [
                      (b(!0), k(X, null, it(E.daily_value_sell_success_cash, (N) => (b(), k("span", {
                        key: `${E.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(L(De)(N.total_value)), 1))), 128))
                    ])) : (b(), k("span", Ib, "-"))
                  ])
                ]),
                "cell-cashSuccess": I(({ row: E }) => [
                  r("span", Rb, A(L(Z)(Number(E.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": I(({ row: E }) => [
                  r("span", Ob, A(S(E.sell_success_count, E.seller_conversations || E.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": I(({ row: E }) => [
                  r("span", Vb, [
                    Array.isArray(E.daily_value_sell_success) && E.daily_value_sell_success.length > 0 ? (b(), k("div", zb, [
                      (b(!0), k(X, null, it(E.daily_value_sell_success, (N) => (b(), k("span", {
                        key: `${E.date}-${N.currency}`
                      }, A(N.currency) + " " + A(L(De)(N.total_value)), 1))), 128))
                    ])) : (b(), k("span", Nb, A(T(E.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": I(({ row: E }) => [
                  (E.reasons || []).length > 0 ? (b(), k("div", jb, [
                    (b(!0), k(X, null, it(E.reasons || [], (N) => (b(), k("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", Hb, A(N.reason) + ":", 1),
                      r("span", Wb, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Yb, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), qi = /* @__PURE__ */ lt(Kb, [["__scopeId", "data-v-ac189380"]]), Ub = { class: "seller-container__body" }, qb = /* @__PURE__ */ J({
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
    const n = e, a = t, s = C(() => n.loading || n.sellerLoading), o = C(() => n.loading || n.salesByChannelLoading), i = C(() => n.exportLoading || n.sellerExportLoading), l = C(() => n.exportLoading || n.salesByChannelExportLoading);
    function c(d, u) {
      a("export", { source: d, format: u });
    }
    return (d, u) => (b(), q(ht, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", Ub, [
          V(qi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: u[0] || (u[0] = (h) => c("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          V(Ui, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: u[1] || (u[1] = (h) => c("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Xb = /* @__PURE__ */ lt(qb, [["__scopeId", "data-v-878fdbc6"]]), Gb = {
  key: 0,
  class: "card-body"
}, Zb = {
  key: 0,
  class: "chart-section"
}, Qb = {
  key: 1,
  class: "empty-state"
}, Jb = { class: "empty-state-content" }, tv = { class: "empty-icon-wrapper" }, ev = {
  key: 1,
  class: "loading-state"
}, nv = /* @__PURE__ */ J({
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
    }, { isDark: l, colors: c } = gt(ft(s, "theme")), d = C(() => {
      const p = (s.data?.top_agents || []).filter(
        (x) => x.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const _ = p.reduce(
        (x, m) => x + (Number(m.conversations) || 0),
        0
      ), g = p.map((x) => {
        const m = x.agent_type?.toLowerCase();
        return a[m] || "#94a3b8";
      }), v = g.map((x) => `${x}80`);
      return {
        labels: p.map((x) => {
          const m = Number(x.conversations) || 0, f = _ ? m / _ * 100 : 0;
          return `${x.agent_type} - ${m.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((x) => x.conversations),
            backgroundColor: v,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => s.options ? s.options : {
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
              const p = (h.label || "").toString().split(" - ")[0], _ = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (x, m) => x + (Number(m) || 0),
                0
              ), v = g ? _ / g * 100 : 0;
              return `${p}: ${_.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, p) => (b(), q(ht, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), k("div", ev, [...p[2] || (p[2] = [
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
        ])])) : (b(), k("div", Gb, [
          d.value.labels && d.value.labels.length ? (b(), k("section", Zb, [
            V(ga, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (b(), k("section", Qb, [
            r("div", Jb, [
              r("div", tv, [
                V(L(gp), { class: "empty-icon" })
              ]),
              p[0] || (p[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
              p[1] || (p[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }));
  }
}), av = /* @__PURE__ */ lt(nv, [["__scopeId", "data-v-bd0d1b11"]]), sv = {
  key: 0,
  class: "loading-state"
}, ov = {
  key: 1,
  class: "card-body"
}, iv = {
  key: 0,
  class: "payment-methods-section"
}, lv = { class: "payment-methods-grid" }, rv = {
  key: 1,
  class: "empty-state"
}, cv = { class: "empty-state-content" }, dv = { class: "empty-icon-wrapper" }, uv = {
  key: 2,
  class: "payment-method-daily-section"
}, hv = { class: "w-full min-w-0" }, fv = { class: "font-medium" }, gv = { class: "text-center" }, pv = { class: "text-center success-value" }, mv = {
  key: 0,
  class: "currency-cell-list"
}, bv = { class: "payment-tags" }, vv = { class: "tag-name" }, yv = {
  key: 0,
  class: "tag-amount"
}, _v = {
  key: 1,
  class: "tag-amount"
}, xv = { class: "tag-count" }, kv = {
  key: 3,
  class: "empty-table-state"
}, wv = "Not Registered", Cv = /* @__PURE__ */ J({
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
    const a = e, s = n, { isDark: o } = gt(ft(a, "theme")), i = ot(!1), l = ot({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), c = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), d = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort(($, S) => Rt($.date).valueOf() - Rt(S.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], p = C(
      () => u.value.map(($) => ({
        id: $.date,
        date: $.date,
        total_count: $.total_count,
        total_amount: $.total_amount,
        total_amount_by_currency: $.total_amount_by_currency,
        payment_methods: $.payment_methods
      }))
    ), _ = ($) => {
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
      })), F = ($.payment_method_by_day || []).map((T) => ({
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
        payment_method_by_day: F
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [$, S] = a.dates.map((T) => Rt(T).format("YYYY-MM-DD")), F = await a.fetchFunction(a.airlineName, $, S);
          l.value = _(F);
        } catch ($) {
          console.error("Error fetching payment method metrics:", $), l.value = _(null);
        } finally {
          i.value = !1;
        }
      }
    }, v = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], x = ($) => !$ || $.toLowerCase() === "unknown" ? wv : $.replace(/_/g, " "), m = ($) => $ == null ? "$0.00" : wt($), f = ($) => {
      const S = $.total_amount_by_currency;
      return S && S.length > 0 ? S.map((F) => `${F.currency} ${m(F.total_value)}`).join(" · ") : m($.total_amount);
    }, y = ($) => $ ? Rt($).format("MMM DD") : "-", w = ($) => $ == null || Number.isNaN(Number($)) ? 0 : Number($), M = ($) => {
      s("export", $);
    };
    function D() {
      const $ = a.data;
      $ && (Array.isArray($.payment_method_breakdown) && $.payment_method_breakdown.length > 0 || Array.isArray($.payment_method_by_day) && $.payment_method_by_day.length > 0) && (i.value = !1, l.value = _($));
    }
    return te(() => {
      a.data ? D() : g();
    }), Bt(
      () => a.data,
      ($) => {
        $ && D();
      },
      { deep: !0 }
    ), Bt(
      () => a.dates,
      ($) => {
        a.data || $ && $[0] && $[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: o }), ($, S) => (b(), q(ht, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, {
      headerExport: I(() => [
        e.enableExport && !i.value ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: M,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        i.value ? (b(), k("div", sv, [...S[0] || (S[0] = [
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
        ])])) : (b(), k("div", ov, [
          c.value ? (b(), k("section", iv, [
            S[1] || (S[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", lv, [
              (b(!0), k(X, null, it(l.value.payment_method_breakdown, (F, T) => (b(), q(ut, {
                key: F.payment_method,
                class: "payment-method-card-item min-w-0",
                color: v[T % v.length],
                title: x(F.payment_method),
                value: f(F),
                subvalue: `${w(F.count)} ${w(F.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (b(), k("section", rv, [
            r("div", cv, [
              r("div", dv, [
                V(L(mp), { class: "empty-icon" })
              ]),
              S[2] || (S[2] = r("p", { class: "empty-title" }, "No payment data available", -1)),
              S[3] || (S[3] = r("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          d.value ? (b(), k("section", uv, [
            S[5] || (S[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", hv, [
              V(se, {
                columns: h,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: F }) => [
                  r("span", fv, A(y(String(F.date))), 1)
                ]),
                "cell-totalSales": I(({ row: F }) => [
                  r("span", gv, A(L(Z)(F.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": I(({ row: F }) => [
                  r("span", pv, [
                    Array.isArray(F.total_amount_by_currency) && F.total_amount_by_currency.length > 0 ? (b(), k("div", mv, [
                      (b(!0), k(X, null, it(F.total_amount_by_currency, (T) => (b(), k("span", {
                        key: `${F.date}-${T.currency}`
                      }, A(T.currency) + " " + A(m(T.total_value)), 1))), 128))
                    ])) : (b(), k(X, { key: 1 }, [
                      xt(A(m(Number(F.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": I(({ row: F }) => [
                  r("div", bv, [
                    (b(!0), k(X, null, it(Array.isArray(F.payment_methods) ? F.payment_methods : [], (T) => (b(), k("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", vv, A(x(T.payment_method)), 1),
                      S[4] || (S[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (b(), k("span", yv, A(m(T.total_amount)), 1)) : (b(), k("span", _v, A(T.total_amount_by_currency.map((B) => `${B.currency} ${m(B.total_value)}`).join(" / ")), 1)),
                      r("span", xv, "(" + A(w(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : c.value ? (b(), k("div", kv, [...S[6] || (S[6] = [
            r("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : O("", !0)
        ]))
      ]),
      _: 1
    }));
  }
}), $v = /* @__PURE__ */ lt(Cv, [["__scopeId", "data-v-87045b37"]]), Mv = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Sv = { class: "overflow-x-auto" }, Dv = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, Av = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Tv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Bv = ["checked", "aria-label"], Lv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Fv = ["checked", "aria-label", "onChange"], Pv = /* @__PURE__ */ J({
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
    const n = e, a = t, s = ot(null);
    function o(f) {
      return `cell-${f}`;
    }
    function i(f) {
      return f === "center" ? "text-center" : f === "right" ? "text-right" : "text-left";
    }
    function l(f, y) {
      if (typeof n.rowKey == "function")
        return n.rowKey(f);
      const w = f[n.rowKey];
      return w != null ? String(w) : `__index_${y}`;
    }
    function c(f, y) {
      return f[y];
    }
    function d(f) {
      return f == null || typeof f == "object" ? "" : String(f);
    }
    function u(f, y) {
      return l(f, y);
    }
    const h = C(() => n.rows.map((f, y) => l(f, y)));
    function p(f, y) {
      const w = l(f, y);
      return n.selectedKeys.includes(w);
    }
    const _ = C(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((f) => n.selectedKeys.includes(f))), g = C(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const f = h.value.filter((y) => n.selectedKeys.includes(y));
      return f.length > 0 && f.length < n.rows.length;
    });
    Bt(
      [g, _, () => n.selectable],
      async () => {
        await Ot();
        const f = s.value;
        f && (f.indeterminate = g.value && !_.value);
      },
      { immediate: !0 }
    );
    function v() {
      if (n.selectable)
        if (_.value) {
          const f = n.selectedKeys.filter((y) => !h.value.includes(y));
          a("update:selectedKeys", f);
        } else {
          const f = new Set(n.selectedKeys);
          h.value.forEach((y) => f.add(y)), a("update:selectedKeys", [...f]);
        }
    }
    function x(f, y) {
      if (!n.selectable) return;
      const w = l(f, y);
      n.selectedKeys.includes(w) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((D) => D !== w)
      ) : a("update:selectedKeys", [...n.selectedKeys, w]);
    }
    function m(f, y) {
      const w = l(f, y);
      return `${n.ariaLabelSelectRow} ${w}`;
    }
    return (f, y) => (b(), k("div", Mv, [
      r("div", Sv, [
        r("table", Dv, [
          r("thead", null, [
            r("tr", Av, [
              e.selectable ? (b(), k("th", Tv, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: _.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: v
                }, null, 40, Bv)
              ])) : O("", !0),
              (b(!0), k(X, null, it(e.columns, (w) => (b(), k("th", {
                key: w.key,
                scope: "col",
                class: Y([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(w.align),
                  w.headerClass ?? ""
                ])
              }, A(w.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (b(!0), k(X, null, it(e.rows, (w, M) => (b(), k("tr", {
              key: u(w, M),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (b(), k("td", Lv, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(w, M),
                  "aria-label": m(w, M),
                  onChange: (D) => x(w, M)
                }, null, 40, Fv)
              ])) : O("", !0),
              (b(!0), k(X, null, it(e.columns, (D) => (b(), k("td", {
                key: D.key,
                class: Y([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(D.align),
                  D.cellClass ?? ""
                ])
              }, [
                Dt(f.$slots, o(D.key), {
                  row: w,
                  column: D,
                  value: c(w, D.key)
                }, () => [
                  xt(A(d(c(w, D.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Xi = /* @__PURE__ */ lt(Pv, [["__scopeId", "data-v-95fc0bc9"]]), Ev = {
  key: 0,
  class: "loading-state"
}, Iv = {
  key: 1,
  class: "card-body"
}, Rv = { class: "summary-cards" }, Ov = {
  key: 0,
  class: "summary-card enqueued-card"
}, Vv = { class: "summary-card-content" }, zv = { class: "card-content enqueued-content" }, Nv = { class: "card-value enqueued-value" }, jv = { class: "summary-card assigned-card" }, Hv = { class: "summary-card-content" }, Wv = { class: "card-content" }, Yv = { class: "card-value assigned-value" }, Kv = { class: "card-content" }, Uv = { class: "card-value assigned-value" }, qv = { class: "summary-card closed-card" }, Xv = { class: "summary-card-content" }, Gv = { class: "card-content" }, Zv = { class: "card-value closed-value" }, Qv = { class: "card-content" }, Jv = { class: "card-value closed-value" }, ty = {
  key: 0,
  class: "agents-section"
}, ey = { class: "date-header" }, ny = { class: "date-title" }, ay = { class: "date-stats" }, sy = {
  key: 0,
  class: "stat-item enqueued-stat"
}, oy = { class: "stat-value" }, iy = { class: "stat-item assigned-stat" }, ly = { class: "stat-value" }, ry = { class: "stat-value" }, cy = { class: "stat-item closed-stat" }, dy = { class: "stat-value" }, uy = { class: "stat-value" }, hy = { class: "w-full min-w-0" }, fy = { class: "ah-cell name-cell" }, gy = { class: "ah-cell email-cell" }, py = { class: "metric-cell-content" }, my = { class: "badge assigned-badge" }, by = { class: "metric-cell-avg" }, vy = { class: "metric-cell-content" }, yy = { class: "badge closed-badge" }, _y = { class: "metric-cell-avg" }, xy = ["onClick"], ky = {
  key: 1,
  class: "empty-state"
}, Aa = 3, wy = /* @__PURE__ */ J({
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
    }, { isDark: i } = gt(ft(a, "theme")), l = C(() => {
      const S = a.data?.agents_by_day && a.data.agents_by_day.length > 0, F = (a.data?.total_enqueued ?? 0) > 0;
      return S || F;
    }), c = C(() => {
      if (!l.value) return {};
      const S = {};
      for (const B of a.data.agents_by_day)
        S[B.date] || (S[B.date] = []), S[B.date].push(B);
      const F = Object.keys(S).sort((B, P) => new Date(B).getTime() - new Date(P).getTime()), T = {};
      for (const B of F)
        T[B] = S[B];
      return T;
    }), d = ot({});
    function u(S) {
      d.value = {
        ...d.value,
        [S]: !d.value[S]
      };
    }
    function h(S, F) {
      return d.value[S] ? F : F.slice(0, Aa);
    }
    function p(S) {
      return Math.max(0, S.length - Aa);
    }
    function _(S) {
      return S.length > Aa;
    }
    const g = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function v(S, F) {
      return h(S, F).map((T, B) => ({
        id: `${S}-${T.agent_email}-${B}`,
        agent_name: T.agent_name,
        agent_email: T.agent_email,
        assigned_count: T.assigned_count,
        closed_count: T.closed_count,
        avg_time_to_assign_seconds: T.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: T.avg_conversation_duration_seconds
      }));
    }
    const x = (S) => S == null ? "0" : Z(S), m = (S) => {
      if (S == null)
        return "AVG";
      if (S < 60)
        return `${Math.round(S)}s`;
      const F = Math.round(S), T = Math.floor(F / 60), B = F % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const P = Math.floor(T / 60), E = T % 60;
      return `${P}h ${E}m`;
    }, f = (S) => {
      const F = new Date(S), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return F.toLocaleDateString("en-US", T);
    }, y = (S) => S[0]?.day_total_enqueued ?? 0, w = (S) => S[0]?.day_total_assigned ?? 0, M = (S) => S[0]?.day_total_closed ?? 0, D = (S) => S[0]?.day_avg_time_to_assign_seconds ?? null, $ = (S) => S[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (S, F) => (b(), q(ht, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), k("div", Ev, [...F[0] || (F[0] = [
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
        ])])) : (b(), k("div", Iv, [
          r("div", Rv, [
            e.data.total_enqueued ? (b(), k("div", Ov, [
              F[2] || (F[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Vv, [
                r("div", zv, [
                  F[1] || (F[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", Nv, A(x(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : O("", !0),
            r("div", jv, [
              F[5] || (F[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Hv, [
                r("div", Wv, [
                  F[3] || (F[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", Yv, A(x(e.data.total_assigned)), 1)
                ]),
                r("div", Kv, [
                  F[4] || (F[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", Uv, A(m(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", qv, [
              F[8] || (F[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Xv, [
                r("div", Gv, [
                  F[6] || (F[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", Zv, A(x(e.data.total_closed)), 1)
                ]),
                r("div", Qv, [
                  F[7] || (F[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", Jv, A(m(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (b(), k("div", ty, [
            (b(!0), k(X, null, it(c.value, (T, B) => (b(), k("div", {
              key: B,
              class: "date-group"
            }, [
              r("div", ey, [
                r("h4", ny, A(f(B)), 1),
                r("div", ay, [
                  y(T) ? (b(), k("span", sy, [
                    r("span", oy, A(x(y(T))), 1),
                    F[9] || (F[9] = xt(" Enqueued ", -1))
                  ])) : O("", !0),
                  r("span", iy, [
                    r("span", ly, A(x(w(T))), 1),
                    F[10] || (F[10] = xt(" Assigned ", -1)),
                    r("span", ry, A(m(D(T))), 1)
                  ]),
                  r("span", cy, [
                    r("span", dy, A(x(M(T))), 1),
                    F[11] || (F[11] = xt(" Closed ", -1)),
                    r("span", uy, A(m($(T))), 1)
                  ])
                ])
              ]),
              r("div", hy, [
                V(Xi, {
                  columns: g,
                  rows: v(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": I(({ row: P }) => [
                    r("span", fy, A(P.agent_name || "-"), 1)
                  ]),
                  "cell-email": I(({ row: P }) => [
                    r("span", gy, A(P.agent_email), 1)
                  ]),
                  "cell-assigned": I(({ row: P }) => [
                    r("div", py, [
                      r("span", my, A(x(Number(P.assigned_count))), 1),
                      r("span", by, A(m(Number(P.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": I(({ row: P }) => [
                    r("div", vy, [
                      r("span", yy, A(x(Number(P.closed_count))), 1),
                      r("span", _y, A(m(Number(P.avg_conversation_duration_seconds))), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              _(T) ? (b(), k("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (P) => u(String(B))
              }, [
                xt(A(d.value[B] ? "View less" : `View more (${p(T)} rows)`) + " ", 1),
                (b(), k("svg", {
                  class: Y(["view-more-icon", { "view-more-icon-rotated": d.value[B] }]),
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [...F[12] || (F[12] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  }, null, -1)
                ])], 2))
              ], 8, xy)) : O("", !0)
            ]))), 128))
          ])) : (b(), k("div", ky, [...F[13] || (F[13] = [
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
      _: 1
    }));
  }
}), Cy = /* @__PURE__ */ lt(wy, [["__scopeId", "data-v-e74dc150"]]), $y = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, My = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Sy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Dy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ay = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ty = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, By = { class: "max-w-[360px] px-4 text-center" }, Ly = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ro = 5, Fy = /* @__PURE__ */ J({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (m) => {
      i("export", m);
    }, c = ft(o, "theme"), { isDark: d } = gt(c), u = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = ot({ labels: [], datasets: [] }), p = C(
      () => o.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), _ = C(() => {
      const m = p.value.total_by_channel || {}, f = Object.values(m).reduce((y, w) => y + w, 0);
      return f === 0 ? [] : Object.entries(m).sort(([, y], [, w]) => w - y).map(([y, w]) => ({
        name: y,
        label: y.toUpperCase(),
        total: w,
        percentage: (w / f * 100).toFixed(1),
        color: u[y.toLowerCase()] || "#9ca3af"
      }));
    }), g = C(() => _.value.slice(0, Ro)), v = C(() => {
      const m = Math.min(g.value.length, Ro);
      if (!(m <= 0))
        return { gridTemplateColumns: `repeat(${m}, minmax(0, 1fr))` };
    }), x = (m) => {
      if (!m || !m.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const f = m.channels_by_day, y = Object.keys(f).sort();
      if (y.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const w = /* @__PURE__ */ new Set();
      for (const $ of Object.values(f))
        for (const S of Object.keys($))
          w.add(S);
      const D = Array.from(w).map(($) => {
        const S = $.toLowerCase(), F = u[S] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: y.map((T) => f[T]?.[$] || 0),
          borderColor: F
        };
      });
      h.value = {
        labels: y.map(($) => Rt($).format("MMM DD")),
        datasets: D
      };
    };
    return Bt(
      () => o.data,
      (m) => {
        x(m ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: d }), (m, f) => (b(), q(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Channel",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: Y(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (b(), k("div", $y, [
            r("div", My, [
              (b(), k(X, null, it(a, (y, w) => r("div", {
                key: w,
                class: Y(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[w]]),
                style: pt({ height: `${y}%` })
              }, null, 6)), 64))
            ]),
            f[0] || (f[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (b(), k(X, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), k("section", Sy, [
              r("div", Dy, [
                V(he, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              g.value.length ? (b(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: pt(v.value)
              }, [
                (b(!0), k(X, null, it(g.value, (y) => (b(), q(ut, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${L(Z)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : _.value.length ? (b(), k("section", Ay, [
              r("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: pt(v.value)
              }, [
                (b(!0), k(X, null, it(g.value, (y) => (b(), q(ut, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${L(Z)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : O("", !0),
            _.value.length ? O("", !0) : (b(), k("section", Ty, [
              r("div", By, [
                r("div", Ly, [
                  V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                f[1] || (f[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                f[2] || (f[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), Py = /* @__PURE__ */ lt(Fy, [["__scopeId", "data-v-a464c58f"]]), Ey = {
  key: 0,
  class: "card-body"
}, Iy = { class: "chart-container" }, Ry = { class: "triage-table-block w-full min-w-0" }, Oy = { class: "triage-row-label" }, Vy = {
  key: 1,
  class: "triage-count"
}, zy = {
  key: 1,
  class: "triage-count"
}, Ny = {
  key: 1,
  class: "triage-count"
}, jy = {
  key: 1,
  class: "triage-count"
}, Hy = {
  key: 1,
  class: "triage-count"
}, Wy = {
  key: 1,
  class: "empty-state"
}, Yy = { class: "empty-state-content" }, Ky = { class: "empty-icon-wrapper" }, Uy = {
  key: 1,
  class: "loading-state"
}, qy = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, { isDark: i, colors: l } = gt(ft(a, "theme")), c = C(() => {
      const y = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [M, D] of Object.entries(y)) {
        const $ = M.split("+").filter(Boolean);
        if (!$.includes("triage")) continue;
        const S = $.filter((F) => F !== "triage").length;
        S >= 4 ? w["4p"] += Number(D) || 0 : w[S] += Number(D) || 0;
      }
      return w;
    }), d = C(() => {
      const y = c.value;
      return y[0] + y[1] + y[2] + y[3] + y["4p"] || 0;
    }), u = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
      const y = d.value;
      if (!y) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = c.value;
      return {
        pct0: w[0] / y * 100,
        pct1: w[1] / y * 100,
        pct2: w[2] / y * 100,
        pct3: w[3] / y * 100,
        pct4p: w["4p"] / y * 100
      };
    }), p = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], _ = C(() => {
      const y = h.value, w = c.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: y.pct0,
          b1: y.pct1,
          b2: y.pct2,
          b3: y.pct3,
          b4p: y.pct4p
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
    }, v = (y) => y?.replace("80", "") || "#888888", x = C(() => ({
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
            label: (y) => `${y.dataset.label} intent(s): ${Number(y.raw || 0).toFixed(0)}%`
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
    })), f = (y) => `${(Number(y) || 0).toFixed(0)}`;
    return t({ isDark: i }), (y, w) => (b(), q(ht, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), k("div", Uy, [...w[2] || (w[2] = [
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
        ])])) : (b(), k("div", Ey, [
          u.value ? (b(), k(X, { key: 0 }, [
            r("div", Iy, [
              V(be, {
                data: x.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            V(ut, {
              class: "w-full min-w-0",
              title: "Total",
              value: L(Z)(d.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", Ry, [
              V(se, {
                columns: p,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": I(({ row: M }) => [
                  r("span", Oy, A(M.metric), 1)
                ]),
                "cell-b0": I(({ row: M }) => [
                  M.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: pt({ color: v(g.c0) })
                  }, A(f(Number(M.b0))) + "%", 5)) : (b(), k("span", Vy, A(L(Z)(Number(M.b0))), 1))
                ]),
                "cell-b1": I(({ row: M }) => [
                  M.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: pt({ color: v(g.c1) })
                  }, A(f(Number(M.b1))) + "%", 5)) : (b(), k("span", zy, A(L(Z)(Number(M.b1))), 1))
                ]),
                "cell-b2": I(({ row: M }) => [
                  M.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: pt({ color: v(g.c2) })
                  }, A(f(Number(M.b2))) + "%", 5)) : (b(), k("span", Ny, A(L(Z)(Number(M.b2))), 1))
                ]),
                "cell-b3": I(({ row: M }) => [
                  M.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: pt({ color: v(g.c3) })
                  }, A(f(Number(M.b3))) + "%", 5)) : (b(), k("span", jy, A(L(Z)(Number(M.b3))), 1))
                ]),
                "cell-b4p": I(({ row: M }) => [
                  M.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: pt({ color: v(g.c4p) })
                  }, A(f(Number(M.b4p))) + "%", 5)) : (b(), k("span", Hy, A(L(Z)(Number(M.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (b(), k("div", Wy, [
            r("div", Yy, [
              r("div", Ky, [
                V(L(qt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = r("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = r("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }));
  }
}), Xy = /* @__PURE__ */ lt(qy, [["__scopeId", "data-v-d684dd65"]]), Gy = {
  key: 0,
  class: "loading-state"
}, Zy = {
  key: 1,
  class: "card-body"
}, Qy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, Jy = { class: "pie-section" }, t1 = {
  key: 1,
  class: "empty-state"
}, e1 = /* @__PURE__ */ J({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), o = [
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
    }, l = (_) => i[_]?.label || _.toUpperCase(), c = C(
      () => n.data?.items && n.data.items.length > 0
    ), d = C(
      () => (n.data?.items || []).reduce((_, g) => _ + g.count, 0)
    ), u = C(() => {
      const _ = {};
      for (const g of n.data?.items || [])
        _[g.language] = (_[g.language] || 0) + g.count;
      return Object.entries(_).map(([g, v]) => ({ language: g, count: v })).sort((g, v) => v.count - g.count);
    }), h = C(() => ({
      labels: u.value.map((_) => l(_.language)),
      datasets: [{
        data: u.value.map((_) => _.count),
        backgroundColor: u.value.map((_, g) => o[g % o.length] + "80"),
        borderColor: u.value.map((_, g) => o[g % o.length]),
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
            label: (_) => {
              const g = _.raw || 0, v = d.value > 0 ? (g / d.value * 100).toFixed(1) : "0";
              return ` ${_.label}: ${g} (${v}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (_, g) => (b(), q(ht, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: I(() => [
        n.loading ? (b(), k("div", Gy, [...g[0] || (g[0] = [
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
        ])])) : (b(), k("div", Zy, [
          c.value ? (b(), k("div", Qy, [
            r("section", Jy, [
              V(ga, {
                data: h.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            V(ut, {
              class: "shrink-0",
              title: "Total",
              value: L(Z)(d.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (b(), k("section", t1, [...g[1] || (g[1] = [
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
}), n1 = /* @__PURE__ */ lt(e1, [["__scopeId", "data-v-8c32a3b3"]]), a1 = {
  key: 0,
  class: "loading-state"
}, s1 = {
  key: 1,
  class: "card-body"
}, o1 = {
  key: 0,
  class: "guardrails-daily-section"
}, i1 = { class: "w-full min-w-0" }, l1 = { class: "font-medium" }, r1 = { class: "font-semibold" }, c1 = { class: "type-badges-row" }, d1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, u1 = {
  key: 1,
  class: "empty-state"
}, h1 = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (x) => {
      s("export", x);
    }, { isDark: i } = gt(ft(a, "theme")), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), c = C(
      () => (a.data?.items || []).reduce((x, m) => x + m.count, 0)
    ), d = (x) => {
      const m = {};
      for (const w of a.data?.items || [])
        m[w[x]] = (m[w[x]] || 0) + w.count;
      const f = Object.entries(m).sort((w, M) => M[1] - w[1]);
      if (f.length === 0) return { name: "—", pct: 0 };
      const y = c.value;
      return {
        name: f[0][0],
        pct: y > 0 ? Math.round(f[0][1] / y * 100) : 0
      };
    }, u = C(() => d("guardrail_type")), h = C(() => d("guardrail_action")), p = C(() => d("guardrail_source")), _ = C(() => {
      const x = {};
      for (const m of a.data?.items || [])
        x[m.date] || (x[m.date] = {}), x[m.date][m.guardrail_type] = (x[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(x).map(([m, f]) => ({
        date: m,
        total: Object.values(f).reduce((y, w) => y + w, 0),
        types: Object.entries(f).map(([y, w]) => ({ type: y, count: w })).sort((y, w) => w.count - y.count)
      })).sort((m, f) => new Date(m.date).getTime() - new Date(f.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], v = C(
      () => _.value.map((x) => ({
        id: x.date,
        date: x.date,
        total: x.total,
        types: x.types
      }))
    );
    return t({ isDark: i }), (x, m) => (b(), q(ht, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), k("div", a1, [...m[0] || (m[0] = [
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
        ])])) : (b(), k("div", s1, [
          l.value ? (b(), k(X, { key: 0 }, [
            _.value.length > 0 ? (b(), k("section", o1, [
              r("div", i1, [
                V(se, {
                  columns: g,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": I(({ row: f }) => [
                    r("span", l1, A(L(Rt)(String(f.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": I(({ row: f }) => [
                    r("span", r1, A(L(Z)(f.total)), 1)
                  ]),
                  "cell-types": I(({ row: f }) => [
                    r("div", c1, [
                      (b(!0), k(X, null, it(f.types, (y) => (b(), k("span", {
                        key: y.type,
                        class: "type-count-badge"
                      }, A(y.type) + " (" + A(y.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("section", d1, [
              V(ut, {
                title: "Total Events",
                value: L(Z)(c.value)
              }, null, 8, ["value"]),
              V(ut, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
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
          ], 64)) : (b(), k("section", u1, [...m[1] || (m[1] = [
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
      _: 1
    }));
  }
}), f1 = /* @__PURE__ */ lt(h1, [["__scopeId", "data-v-88422424"]]), g1 = {
  key: 0,
  class: "loading-state"
}, p1 = {
  key: 1,
  class: "card-body"
}, m1 = { class: "chart-section" }, b1 = { class: "chart-wrapper" }, v1 = {
  key: 1,
  class: "empty-chart"
}, y1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, _1 = {
  key: 0,
  class: "dn-failure-section"
}, x1 = { class: "w-full min-w-0" }, k1 = { class: "failure-reason" }, w1 = { class: "failure-count" }, C1 = { class: "impact-bar-container" }, $1 = { class: "impact-label" }, M1 = { class: "dn-trend-health-block flex flex-col gap-0" }, S1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, D1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, A1 = { class: "system-health" }, T1 = { class: "system-health-content" }, B1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, L1 = {
  key: 1,
  class: "empty-state"
}, F1 = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (D) => {
      s("export", D);
    }, { isDark: i, colors: l } = gt(ft(a, "theme")), c = C(() => {
      const D = a.data?.documentCounts?.items || [], $ = a.data?.processingCounts?.items || [];
      return D.length > 0 || $.length > 0;
    }), d = C(() => {
      const D = a.data?.documentCounts?.items || [];
      return {
        processing_started: D.reduce(($, S) => $ + S.processing_started, 0),
        processing_completed: D.reduce(($, S) => $ + S.processing_completed, 0),
        processing_failed: D.reduce(($, S) => $ + S.processing_failed, 0),
        row_count_total: D.reduce(($, S) => $ + S.row_count_total, 0)
      };
    }), u = C(() => {
      const D = a.data?.processingCounts?.items || [];
      return {
        processing_started: D.reduce(($, S) => $ + S.processing_started, 0),
        processing_success: D.reduce(($, S) => $ + S.processing_success, 0),
        notification_sent: D.reduce(($, S) => $ + S.notification_sent, 0),
        notification_failed: D.reduce(($, S) => $ + S.notification_failed, 0),
        dq_phone: D.reduce(($, S) => $ + S.dq_error_phone_not_found, 0),
        dq_flight: D.reduce(($, S) => $ + S.dq_error_flight_not_found, 0),
        dq_booking: D.reduce(($, S) => $ + S.dq_error_booking_not_found, 0),
        dq_other: D.reduce(($, S) => $ + S.dq_error_other, 0),
        totalDqErrors: D.reduce(($, S) => $ + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = C(() => d.value.row_count_total || u.value.processing_started), p = C(() => Math.max(0, h.value - u.value.notification_sent)), _ = (D, $) => $ ? `${Math.round(D / $ * 100)}%` : "0%", g = C(() => {
      const D = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter(($) => $.count > 0).sort(($, S) => S.count - $.count);
      return D.length > 0 ? D[0] : { reason: "None", count: 0 };
    }), v = C(() => {
      const D = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map(($) => ({
        ...$,
        impactPct: D > 0 ? Math.round($.count / D * 100) : 0
      }));
    }), x = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], m = C(
      () => v.value.map((D) => ({
        id: D.reason,
        reason: D.reason,
        count: D.count,
        impactPct: D.impactPct
      }))
    ), f = C(() => {
      const D = h.value, $ = u.value.processing_success, S = Math.max(0, $ - u.value.totalDqErrors), F = u.value.notification_sent, T = Math.max(0, D - $), B = u.value.totalDqErrors, P = Math.max(0, S - F), E = (j, Q) => {
        const tt = Q > 0 ? Math.round(j / Q * 100) : 0;
        return `${j.toLocaleString()} (${tt}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], K = [];
      return $ > 0 && K.push({ source: "Records Detected", target: "Valid Reservations", value: $, label: E($, D) }), T > 0 && K.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: E(T, D) }), S > 0 && K.push({ source: "Valid Reservations", target: "Contactable", value: S, label: E(S, D) }), B > 0 && K.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: E(B, D) }), F > 0 && K.push({ source: "Contactable", target: "Notified", value: F, label: E(F, D) }), P > 0 && K.push({ source: "Contactable", target: "Not Delivered", value: P, label: E(P, D) }), { nodes: N, links: K };
    }), y = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = C(() => {
      const D = [...a.data?.processingCounts?.items || []].sort(
        (E, N) => new Date(E.date).getTime() - new Date(N.date).getTime()
      ), $ = a.data?.documentCounts?.items || [], S = {};
      for (const E of $)
        S[E.date] = (S[E.date] || 0) + E.row_count_total;
      const F = [.../* @__PURE__ */ new Set([...D.map((E) => E.date), ...$.map((E) => E.date)])].sort(), T = F.map((E) => Rt(E).format("MMM DD")), B = F.map((E) => {
        const N = D.find((Q) => Q.date === E), K = N?.notification_sent || 0, j = S[E] || N?.processing_started || 0;
        return j > 0 ? Math.round(K / j * 100) : 0;
      }), P = F.map((E) => D.find((K) => K.date === E)?.notification_sent || 0);
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
    }), M = C(() => ({
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
            label: (D) => D.datasetIndex === 0 ? ` Success Rate: ${D.raw}%` : ` Notifications: ${D.raw}`
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
            callback: (D) => `${D}%`
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
    return t({ isDark: i }), (D, $) => (b(), q(ht, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), k("div", g1, [...$[0] || ($[0] = [
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
        ])])) : (b(), k("div", p1, [
          c.value ? (b(), k(X, { key: 0 }, [
            r("section", m1, [
              $[2] || ($[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", b1, [
                f.value.nodes.length > 0 && f.value.links.length > 0 ? (b(), q(Ve, {
                  key: 0,
                  data: f.value,
                  "node-colors": y,
                  height: "350px"
                }, null, 8, ["data"])) : (b(), k("div", v1, [...$[1] || ($[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", y1, [
              V(ut, {
                color: "#3b82f6",
                title: "Total Records",
                value: L(Z)(d.value.row_count_total)
              }, null, 8, ["value"]),
              V(ut, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: L(Z)(h.value)
              }, null, 8, ["value"]),
              V(ut, {
                color: "#10b981",
                title: "Successfully Notified",
                value: L(Z)(u.value.notification_sent),
                subvalue: _(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              V(ut, {
                color: "#ef4444",
                title: "Not Notified",
                value: L(Z)(p.value),
                subvalue: _(p.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              V(ut, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: g.value.reason,
                subvalue: g.value.count > 0 ? `${L(Z)(g.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            v.value.length > 0 ? (b(), k("section", _1, [
              $[3] || ($[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", x1, [
                V(se, {
                  columns: x,
                  rows: m.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": I(({ row: S }) => [
                    r("span", k1, A(S.reason), 1)
                  ]),
                  "cell-count": I(({ row: S }) => [
                    r("span", w1, A(L(Z)(S.count)), 1)
                  ]),
                  "cell-impact": I(({ row: S }) => [
                    r("div", C1, [
                      r("div", {
                        class: "impact-bar",
                        style: pt({ width: S.impactPct + "%" })
                      }, null, 4),
                      r("span", $1, A(S.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("div", M1, [
              w.value.labels.length > 0 ? (b(), k("section", S1, [
                $[4] || ($[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", D1, [
                  V(he, {
                    data: w.value,
                    options: M.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : O("", !0),
              r("details", A1, [
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
                  xt(" System Health Details ")
                ], -1)),
                r("div", T1, [
                  r("div", B1, [
                    V(ut, {
                      title: "Docs Started",
                      value: L(Z)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Docs Completed",
                      value: L(Z)(d.value.processing_completed)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Docs Failed",
                      value: L(Z)(d.value.processing_failed)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Processing Started",
                      value: L(Z)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Processing Success",
                      value: L(Z)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    V(ut, {
                      title: "Notification Failed",
                      value: L(Z)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (b(), k("section", L1, [...$[6] || ($[6] = [
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
      _: 1
    }));
  }
}), P1 = /* @__PURE__ */ lt(F1, [["__scopeId", "data-v-b99a7ade"]]), E1 = { class: "highlight-inner" }, I1 = {
  key: 0,
  class: "loading-state"
}, R1 = {
  key: 1,
  class: "card-body"
}, O1 = { class: "metric-value" }, V1 = /* @__PURE__ */ J({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = gt(ft(n, "theme")), s = C(() => Z(n.totalConversations)), o = C(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = n.previousTotalConversations;
      return d === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - d) / d * 100;
    }), l = C(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), q(ht, {
      title: "",
      collapsible: !1,
      class: Y(["total-conv-metric", "w-full", { "total-conv-metric--dark": L(a) }])
    }, {
      title: I(() => [...u[0] || (u[0] = [
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
      headerAside: I(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: Y(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", E1, [
          e.loading ? (b(), k("div", I1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", R1, [
            r("span", O1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), z1 = /* @__PURE__ */ lt(V1, [["__scopeId", "data-v-f7e693e9"]]), N1 = { class: "highlight-inner" }, j1 = {
  key: 0,
  class: "loading-state"
}, H1 = {
  key: 1,
  class: "card-body"
}, W1 = { class: "metric-value" }, Y1 = /* @__PURE__ */ J({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = gt(ft(n, "theme")), s = C(() => `${n.csatP95.toFixed(1)}`), o = C(
      () => n.previousCsatP95 !== null && n.previousCsatP95 !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = n.previousCsatP95;
      return d === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - d) / d * 100;
    }), l = C(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), q(ht, {
      collapsible: !1,
      class: Y(["csat-p95-metric", "w-full", { "csat-p95-metric--dark": L(a) }])
    }, {
      title: I(() => [...u[0] || (u[0] = [
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
      headerAside: I(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: Y(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", N1, [
          e.loading ? (b(), k("div", j1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", H1, [
            r("span", W1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), K1 = /* @__PURE__ */ lt(Y1, [["__scopeId", "data-v-86f3d7c7"]]), U1 = { class: "highlight-inner" }, q1 = {
  key: 0,
  class: "loading-state"
}, X1 = {
  key: 1,
  class: "card-body"
}, G1 = { class: "metric-value" }, Z1 = /* @__PURE__ */ J({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = gt(ft(n, "theme")), s = C(() => `${n.csatPulse.toFixed(1)}%`), o = C(() => n.previousCsatPulse !== null && n.previousCsatPulse !== void 0), i = C(() => {
      if (!o.value) return 0;
      const d = n.previousCsatPulse;
      return d === 0 ? n.csatPulse > 0 ? 100 : 0 : (n.csatPulse - d) / Math.abs(d) * 100;
    }), l = C(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), q(ht, {
      collapsible: !1,
      class: Y(["csat-pulse-metric", "w-full", { "csat-pulse-metric--dark": L(a) }])
    }, {
      title: I(() => [...u[0] || (u[0] = [
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
                d: "M3 12h3l2-6 4 12 3-8 2 2h4"
              })
            ])
          ])
        ], -1)
      ])]),
      headerAside: I(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: Y(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", U1, [
          e.loading ? (b(), k("div", q1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", X1, [
            r("span", G1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT Pulse", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Q1 = /* @__PURE__ */ lt(Z1, [["__scopeId", "data-v-77fbe3a3"]]), J1 = {
  key: 0,
  class: "loading-state"
}, t_ = {
  key: 1,
  class: "card-body"
}, e_ = { class: "chart-wrapper" }, n_ = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, a_ = {
  key: 2,
  class: "empty-state"
}, s_ = 500, o_ = 60, i_ = 80, l_ = {
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
    const a = n, s = (d) => {
      a("export", d);
    }, o = e, { isDark: i } = gt(ft(o, "theme")), l = C(() => o.data), c = C(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (b(), q(ht, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (b(), k("div", J1, [...u[0] || (u[0] = [
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
        ])])) : l.value && l.value.total_nps_responses > 0 ? (b(), k("div", t_, [
          r("div", e_, [
            V(Oi, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": c.value,
              "chart-height": s_,
              "chart-margin": o_,
              "chart-bottom-margin": i_
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", n_, [
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
        ])) : (b(), k("div", a_, [...u[1] || (u[1] = [
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
      _: 1
    }));
  }
}, Gi = /* @__PURE__ */ lt(l_, [["__scopeId", "data-v-9076e01c"]]), r_ = {
  key: 0,
  class: "loading-state"
}, c_ = {
  key: 1,
  class: "card-body"
}, d_ = {
  key: 2,
  class: "empty-state"
}, u_ = {
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
    const n = t, a = (d) => {
      n("export", d);
    }, s = e, o = C(() => s.data?.csat_p95_by_day || []), i = C(() => o.value.length > 0), l = C(() => ({
      labels: o.value.map((d) => Rt(d.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: o.value.map((d) => Number(d.p95_score || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), c = {
      scales: {
        y: {
          min: 0,
          max: 11,
          ticks: {
            callback: (d) => Number(d).toFixed(2)
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (d) => d.parsed.y.toFixed(2)
          }
        }
      }
    };
    return (d, u) => (b(), q(ht, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT P95 by Date",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (b(), k("div", r_, [...u[0] || (u[0] = [
          r("p", { class: "loading-text" }, "Loading daily CSAT P95...", -1)
        ])])) : i.value ? (b(), k("div", c_, [
          V(he, {
            data: l.value,
            options: c,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", d_, [...u[1] || (u[1] = [
          r("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          r("p", { class: "empty-description" }, "No CSAT P95 points were found for the selected date range.", -1)
        ])]))
      ]),
      _: 1
    }));
  }
}, Zi = /* @__PURE__ */ lt(u_, [["__scopeId", "data-v-bab6b204"]]), h_ = {
  key: 0,
  class: "loading-state"
}, f_ = {
  key: 1,
  class: "card-body"
}, g_ = {
  key: 2,
  class: "empty-state"
}, p_ = /* @__PURE__ */ J({
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
    const t = e, n = C(() => t.data?.resolution_breakdown || []), a = C(() => n.value.some((i) => Number(i.count || 0) > 0)), s = C(() => {
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
    return (i, l) => (b(), q(ht, {
      class: "nps-resolution-root h-full min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1
    }, {
      default: I(() => [
        t.loading ? (b(), k("div", h_, [...l[0] || (l[0] = [
          r("p", { class: "loading-text" }, "Loading resolution data...", -1)
        ])])) : a.value ? (b(), k("div", f_, [
          V(be, {
            data: s.value,
            options: o,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", g_, [...l[1] || (l[1] = [
          r("p", { class: "empty-title" }, "No resolution answers available", -1),
          r("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }));
  }
}), m_ = /* @__PURE__ */ lt(p_, [["__scopeId", "data-v-4ebea197"]]), b_ = {
  key: 0,
  class: "loading-state"
}, v_ = {
  key: 1,
  class: "card-body"
}, y_ = {
  key: 2,
  class: "empty-state"
}, __ = /* @__PURE__ */ J({
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
    const t = e, n = C(() => t.data?.csat_pulse_by_day || []), a = C(() => n.value.length > 0), s = C(() => ({
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
    return (i, l) => (b(), q(ht, {
      class: "nps-pulse-root h-full min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1
    }, {
      default: I(() => [
        t.loading ? (b(), k("div", b_, [...l[0] || (l[0] = [
          r("p", { class: "loading-text" }, "Loading CSAT Pulse trend...", -1)
        ])])) : a.value ? (b(), k("div", v_, [
          V(he, {
            data: s.value,
            options: o,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", y_, [...l[1] || (l[1] = [
          r("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          r("p", { class: "empty-description" }, "No CSAT pulse points were found for the selected date range.", -1)
        ])]))
      ]),
      _: 1
    }));
  }
}), x_ = /* @__PURE__ */ lt(__, [["__scopeId", "data-v-ba9603d9"]]), k_ = { class: "nps-metrics-container" }, w_ = {
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
    }, s = e, o = C(() => s.showResolutionChart), i = C(() => s.showCsatPulseChart);
    return (l, c) => (b(), k("div", k_, [
      V(Gi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      V(Zi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      o.value ? (b(), q(m_, {
        key: 0,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : O("", !0),
      i.value ? (b(), q(x_, {
        key: 1,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : O("", !0)
    ]));
  }
}, Qi = /* @__PURE__ */ lt(w_, [["__scopeId", "data-v-101623e8"]]), C_ = { class: "csat-container__body" }, $_ = /* @__PURE__ */ J({
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
    return (s, o) => (b(), q(ht, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", C_, [
          V(Qi, {
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
    }, 8, ["default-open"]));
  }
}), M_ = /* @__PURE__ */ lt($_, [["__scopeId", "data-v-a04cdc67"]]), S_ = { class: "highlight-inner" }, D_ = {
  key: 0,
  class: "loading-state"
}, A_ = {
  key: 1,
  class: "card-body"
}, T_ = { class: "metric-row" }, B_ = { class: "metric-currency" }, L_ = { class: "metric-value" }, F_ = /* @__PURE__ */ J({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = gt(ft(n, "theme")), s = C(() => De(n.totalRevenue)), o = C(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = n.previousTotalRevenue;
      return d === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - d) / d * 100;
    }), l = C(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), q(ht, {
      collapsible: !1,
      class: Y(["ai-revenue-metric", "w-full", { "ai-revenue-metric--dark": L(a) }])
    }, {
      title: I(() => [...u[0] || (u[0] = [
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
      headerAside: I(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: Y(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", S_, [
          e.loading ? (b(), k("div", D_, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", A_, [
            r("div", T_, [
              r("span", B_, A(n.currencyCode), 1),
              r("span", L_, A(s.value), 1)
            ]),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "AI Revenue", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), P_ = /* @__PURE__ */ lt(F_, [["__scopeId", "data-v-6a1564d6"]]), E_ = { class: "flex justify-end" }, I_ = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, R_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, O_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, V_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, z_ = { class: "flex flex-wrap gap-4" }, N_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, j_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, H_ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, W_ = { class: "truncate" }, Y_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, K_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, U_ = /* @__PURE__ */ J({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = [30, 50, 70, 50, 40], i = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], l = ft(a, "theme"), { isDark: c } = gt(l), d = ot(a.breakdownBy), u = C(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), h = ot({ labels: [], datasets: [] }), p = ot([]), _ = ot([]), g = ["#3b82f6", "#f59e0b", "#06b6d4", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"], v = (y) => g[y % g.length], x = () => {
      s("changeBreakdown", d.value);
    }, m = (y) => {
      if (!y) return "";
      const M = y.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, f = (y) => {
      if (d.value === "all") {
        const T = y?.escalations_by_day ?? [];
        if (!T.length) {
          h.value = { labels: [], datasets: [] }, p.value = [], _.value = [];
          return;
        }
        const B = [...T].sort((P, E) => P.date.localeCompare(E.date));
        h.value = {
          labels: B.map((P) => Rt(P.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: B.map((P) => Number(P.escalation_rate_percentage || 0)),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, p.value = [], _.value = [];
        return;
      }
      const w = y?.breakdown_by_day ?? [], M = y?.breakdown_items ?? [];
      if (!w.length) {
        h.value = { labels: [], datasets: [] }, p.value = [], _.value = [];
        return;
      }
      const D = [...w].sort((T, B) => T.date.localeCompare(B.date)), $ = M.slice(0, 5).map((T) => T.key), S = D.map((T) => Rt(T.date).format("MMM DD")), F = $.map((T, B) => {
        const P = M.find((E) => E.key === T);
        return {
          label: m(P?.label || T),
          data: D.map((E) => {
            const N = E.items.find((K) => K.key === T);
            return Number(N?.percentage || 0);
          }),
          borderColor: v(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      h.value = {
        labels: S,
        datasets: F
      }, p.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: m(T.label),
        percentage: Number(T.percentage || 0),
        color: v(B)
      })), _.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: m(T.label),
        color: v(B)
      }));
    };
    return Bt(
      () => a.data,
      (y) => {
        f(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Bt(
      () => a.breakdownBy,
      (y) => {
        d.value = y, f(u.value);
      }
    ), t({ isDark: c }), (y, w) => (b(), q(ht, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1
    }, {
      headerAside: I(() => [
        r("div", E_, [
          Jt(r("select", {
            "onUpdate:modelValue": w[0] || (w[0] = (M) => d.value = M),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: x
          }, [...w[1] || (w[1] = [
            r("option", { value: "all" }, "All", -1),
            r("option", { value: "agent" }, "By Agent", -1),
            r("option", { value: "channel" }, "By Channel", -1),
            r("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [hl, d.value]
          ])
        ])
      ]),
      default: I(() => [
        r("div", {
          class: Y(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (b(), k("div", I_, [
            r("div", R_, [
              (b(), k(X, null, it(o, (M, D) => r("div", {
                key: D,
                class: Y(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70", i[D]]),
                style: pt({ height: `${M}%` })
              }, null, 6)), 64))
            ]),
            w[2] || (w[2] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading human escalations... ", -1))
          ])) : (b(), k(X, { key: 1 }, [
            h.value.labels && h.value.labels.length && h.value.datasets.length ? (b(), k("section", O_, [
              r("div", V_, [
                V(he, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", z_, [
                (b(!0), k(X, null, it(_.value, (M) => (b(), k("div", {
                  key: `legend-${M.key}`,
                  class: "inline-flex items-center gap-2 text-sm"
                }, [
                  r("span", {
                    class: "inline-block h-2.5 w-2.5 rounded-full",
                    style: pt({ backgroundColor: M.color })
                  }, null, 4),
                  r("span", N_, A(M.label), 1)
                ]))), 128))
              ]),
              r("div", j_, [
                (b(!0), k(X, null, it(p.value, (M) => (b(), k("div", {
                  key: `card-${M.key}`,
                  class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                }, [
                  r("p", H_, [
                    r("span", {
                      class: "inline-block h-2.5 w-2.5 rounded-full",
                      style: pt({ backgroundColor: M.color })
                    }, null, 4),
                    r("span", W_, A(M.label), 1)
                  ]),
                  r("p", Y_, A(M.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (b(), k("section", K_, [...w[3] || (w[3] = [
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
}), q_ = /* @__PURE__ */ lt(U_, [["__scopeId", "data-v-809d3c8c"]]), X_ = { class: "highlight-inner" }, G_ = {
  key: 0,
  class: "loading-state"
}, Z_ = {
  key: 1,
  class: "card-body"
}, Q_ = { class: "metric-value" }, J_ = /* @__PURE__ */ J({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e) {
    const t = e, { isDark: n } = gt(ft(t, "theme")), a = C(() => `${Number(t.escalationRatePercentage || 0).toFixed(2)}%`), s = C(
      () => t.previousEscalationRatePercentage !== null && t.previousEscalationRatePercentage !== void 0
    ), o = C(() => {
      if (!s.value) return 0;
      const c = t.previousEscalationRatePercentage;
      return c === 0 ? t.escalationRatePercentage > 0 ? 100 : 0 : (t.escalationRatePercentage - c) / c * 100;
    }), i = C(() => {
      const c = o.value.toFixed(1);
      return o.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), l = C(() => o.value > 0 ? "change-badge--up" : o.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return (c, d) => (b(), q(ht, {
      collapsible: !1,
      class: Y(["human-escalations-metric", "w-full", { "human-escalations-metric--dark": L(n) }])
    }, {
      title: I(() => [...d[0] || (d[0] = [
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
      headerAside: I(() => [
        !e.loading && s.value ? (b(), k("div", {
          key: 0,
          class: Y(["change-badge", l.value])
        }, A(i.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", X_, [
          e.loading ? (b(), k("div", G_, [...d[1] || (d[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", Z_, [
            r("span", Q_, A(a.value), 1),
            d[2] || (d[2] = r("span", { class: "metric-label" }, "Human Escalations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), tx = /* @__PURE__ */ lt(J_, [["__scopeId", "data-v-a4480f29"]]), ex = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, nx = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, ax = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, sx = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, ox = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, ix = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, lx = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, rx = { class: "max-w-[360px] text-center" }, cx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, dx = {
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
    const t = e, { isDark: n, colors: a } = gt(ft(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = C(() => {
      const d = t.data ?? {}, u = d.daily, h = d.days, p = Array.isArray(u) && u.length > 0, _ = Array.isArray(h) && h.length > 0 && Array.isArray(d.allocatedCostSeries) && d.allocatedCostSeries.length === h.length;
      let g = [];
      return p ? g = u : _ && (g = h.map((v, x) => ({
        date: v,
        allocated_cost: d.allocatedCostSeries[x] ?? 0,
        aws_cost: d.awsCostSeries[x] ?? 0,
        airline_conversations: d.airlineConversationsSeries[x] ?? 0
      }))), {
        daily: g,
        total_allocated_cost: d.total_allocated_cost ?? d.totalAllocated ?? 0,
        total_cost: d.total_cost ?? d.total ?? 0,
        total_conversations: d.total_conversations ?? d.totalConversations ?? 0,
        total_airline_conversations: d.total_airline_conversations ?? d.totalAirlineConversations ?? 0,
        airline_name: d.airline_name
      };
    }), l = C(() => {
      const d = i.value.daily;
      return {
        labels: d.map((h) => h.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: d.map((h) => h.allocated_cost),
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
            data: d.map((h) => h.aws_cost),
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
            data: d.map((h) => h.airline_conversations),
            borderColor: a.value.info,
            backgroundColor: n.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), c = C(() => ({
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
            label(d) {
              const u = d.dataset.label ? `${d.dataset.label}: ` : "", h = d.parsed.y;
              return d.dataset.yAxisID === "y" ? u + wt(h) : u + String(h);
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
            callback: (d) => wt(d)
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
    return (d, u) => (b(), q(ht, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", ex, [
          e.loading ? (b(), k("div", nx, [
            r("div", ax, [
              (b(), k(X, null, it(s, (h, p) => r("div", {
                key: p,
                class: Y(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[p]]),
                style: pt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            u[0] || (u[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (b(), k("div", sx, [
            r("div", ox, [
              V(he, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: c.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", ix, [
              V(ut, {
                color: L(a).primaryLight,
                title: "Total Allocated",
                value: L(wt)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              V(ut, {
                color: "#FF9900",
                title: "Total AWS",
                value: L(wt)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (b(), k("section", lx, [
            r("div", rx, [
              r("div", cx, [
                V(L(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, ux = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, hx = {
  key: 0,
  class: "card-body"
}, fx = {
  key: 0,
  class: "chart-section"
}, gx = { class: "chart-container" }, px = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, mx = {
  key: 1,
  class: "empty-state"
}, bx = { class: "empty-state-content" }, vx = { class: "empty-icon-wrapper" }, yx = {
  key: 1,
  class: "loading-state"
}, gn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Oo = 10, _x = /* @__PURE__ */ J({
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
    const a = e, { isDark: s, colors: o } = gt(ft(a, "theme")), i = (g) => {
      const v = new Date(g), x = String(v.getDate()).padStart(2, "0"), m = String(v.getMonth() + 1).padStart(2, "0");
      return `${x}-${m}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, x) => v + (x.input_cost || 0), 0);
    }), d = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, x) => v + (x.output_cost || 0), 0);
    }), u = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, x) => v + (x.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((v, x) => v + (x.cache_write_cost || 0), 0);
    }), p = C(() => {
      const g = a.data?.costs_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const x = v.map((f) => i(f)), m = [
        {
          label: "Input Cost",
          data: v.map((f) => g[f]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: v.map((f) => g[f]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: v.map((f) => g[f]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: v.map((f) => g[f]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: x,
        datasets: m
      };
    }), _ = C(() => a.options ? a.options : {
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
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Oo,
            boxHeight: Oo,
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
            label: function(g) {
              let v = g.dataset.label || "";
              return v && (v += ": "), g.parsed.y !== null && (v += wt(g.parsed.y)), v;
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
            font: { family: gn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return wt(g);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (g, v) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", ux, [
          e.loading ? (b(), k("div", yx, [...v[2] || (v[2] = [
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
          ])])) : (b(), k("div", hx, [
            p.value.labels && p.value.labels.length ? (b(), k("section", fx, [
              r("div", gx, [
                V(be, {
                  data: p.value,
                  options: _.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", px, [
                V(ut, {
                  title: "Total Cost",
                  value: L(wt)(e.data.total_cost)
                }, null, 8, ["value"]),
                V(ut, {
                  title: "Input Cost",
                  value: L(wt)(c.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Output Cost",
                  value: L(wt)(d.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Cache Read",
                  value: L(wt)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Cache Write",
                  value: L(wt)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                V(ut, {
                  title: "Avg / Conv.",
                  value: L(wt)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", mx, [
              r("div", bx, [
                r("div", vx, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = r("p", { class: "empty-title" }, "No cost usage data", -1)),
                v[1] || (v[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), xx = /* @__PURE__ */ lt(_x, [["__scopeId", "data-v-39a5448c"]]), kx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, wx = {
  key: 0,
  class: "card-body"
}, Cx = {
  key: 0,
  class: "chart-section"
}, $x = { class: "chart-container" }, Mx = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, Sx = {
  key: 1,
  class: "empty-state"
}, Dx = { class: "empty-state-content" }, Ax = { class: "empty-icon-wrapper" }, Tx = {
  key: 1,
  class: "loading-state"
}, pn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Vo = 10, Bx = /* @__PURE__ */ J({
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
    const a = e, { isDark: s, colors: o } = gt(ft(a, "theme")), i = (u) => {
      const h = new Date(u), p = String(h.getDate()).padStart(2, "0"), _ = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${_}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = C(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((g) => i(g)), _ = [
        {
          label: "Input Tokens",
          data: h.map((g) => u[g]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((g) => u[g]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((g) => u[g]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((g) => u[g]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: _
      };
    }), d = C(() => a.options ? a.options : {
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
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Vo,
            boxHeight: Vo,
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
            font: { family: pn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (u, h) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", kx, [
          e.loading ? (b(), k("div", Tx, [...h[2] || (h[2] = [
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
          ])])) : (b(), k("div", wx, [
            c.value.labels && c.value.labels.length ? (b(), k("section", Cx, [
              r("div", $x, [
                V(be, {
                  data: c.value,
                  options: d.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Mx, [
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: L(Z)(e.data.total_tokens)
                }, null, 8, ["value"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: L(Z)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: L(Z)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: L(Z)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                V(ut, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: L(Z)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (b(), k("section", Sx, [
              r("div", Dx, [
                r("div", Ax, [
                  V(L(qt), { class: "empty-icon" })
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
}), Lx = /* @__PURE__ */ lt(Bx, [["__scopeId", "data-v-70c6f3c7"]]), Fx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Px = {
  key: 0,
  class: "card-body"
}, Ex = {
  key: 0,
  class: "chart-section"
}, Ix = { class: "chart-container" }, Rx = { class: "mt-4 w-full min-w-0" }, Ox = {
  key: 1,
  class: "empty-state"
}, Vx = { class: "empty-state-content" }, zx = { class: "empty-icon-wrapper" }, Nx = {
  key: 1,
  class: "loading-state"
}, jx = /* @__PURE__ */ J({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => Z(n.data?.total_conversations ?? 0)
    ), l = C(() => {
      const d = n.data?.conversations_by_day || {}, u = Object.keys(d).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const h = u.map((_) => o(_)), p = [
        {
          label: "Conversations",
          data: u.map((_) => d[_] || 0),
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
            label: function(d) {
              let u = d.dataset.label || "";
              return u && (u += ": "), d.parsed.y !== null && (u += d.parsed.y), u;
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
    return t({ isDark: a }), (d, u) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Fx, [
          e.loading ? (b(), k("div", Nx, [...u[2] || (u[2] = [
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
          ])])) : (b(), k("div", Px, [
            l.value.labels && l.value.labels.length ? (b(), k("section", Ex, [
              r("div", Ix, [
                V(he, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", Rx, [
                V(ut, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Ox, [
              r("div", Vx, [
                r("div", zx, [
                  V(L(qt), { class: "empty-icon" })
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
}), Hx = /* @__PURE__ */ lt(jx, [["__scopeId", "data-v-b33e8627"]]), Wx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Yx = {
  key: 0,
  class: "card-body"
}, Kx = {
  key: 0,
  class: "charts-grid"
}, Ux = { class: "chart-section" }, qx = { class: "chart-container" }, Xx = { class: "chart-section" }, Gx = { class: "chart-container" }, Zx = {
  key: 1,
  class: "empty-state"
}, Qx = { class: "empty-state-content" }, Jx = { class: "empty-icon-wrapper" }, tk = {
  key: 1,
  class: "loading-state"
}, ek = /* @__PURE__ */ J({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), o = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, _) => (_.total_cost || 0) - (p.total_cost || 0)) : []), l = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, _) => (_.total_tokens || 0) - (p.total_tokens || 0)) : []), c = C(() => {
      const p = i.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: p.map((_) => _.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = C(() => {
      const p = l.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: p.map((_) => _.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = C(() => n.options ? n.options : {
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const _ = p.label, g = n.data?.top_agents?.find((v) => v.agent_type === _);
              return g ? [
                `Total Cost: ${wt(g.total_cost)}`,
                `Input Cost: ${wt(g.total_input_tokens_cost)}`,
                `Output Cost: ${wt(g.total_output_tokens_cost)}`,
                `Cache Read: ${wt(g.total_read_tokens_cost)}`,
                `Cache Write: ${wt(g.total_write_tokens_cost)}`
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
            callback: function(p) {
              return wt(p);
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const _ = p.label, g = n.data?.top_agents?.find((v) => v.agent_type === _);
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
            callback: function(p) {
              return p.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (p, _) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Wx, [
          e.loading ? (b(), k("div", tk, [..._[4] || (_[4] = [
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
          ])])) : (b(), k("div", Yx, [
            o.value ? (b(), k("div", Kx, [
              r("section", Ux, [
                _[0] || (_[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", qx, [
                  V(be, {
                    data: c.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", Xx, [
                _[1] || (_[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", Gx, [
                  V(be, {
                    data: d.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (b(), k("section", Zx, [
              r("div", Qx, [
                r("div", Jx, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                _[2] || (_[2] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                _[3] || (_[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), nk = /* @__PURE__ */ lt(ek, [["__scopeId", "data-v-a5014772"]]), ak = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, sk = {
  key: 0,
  class: "card-body"
}, ok = {
  key: 0,
  class: "chart-section"
}, ik = { class: "chart-container" }, lk = {
  key: 1,
  class: "empty-state"
}, rk = { class: "empty-state-content" }, ck = { class: "empty-icon-wrapper" }, dk = {
  key: 1,
  class: "loading-state"
}, uk = /* @__PURE__ */ J({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), o = {
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
    ) : []), l = C(() => i.value.length > 0), c = C(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), d = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((v) => {
        const x = v.agent_type?.toLowerCase();
        return (o[x] || "#a78bfa") + "80";
      }), _ = h.map((v) => {
        const x = v.agent_type?.toLowerCase();
        return o[x] || "#a78bfa";
      });
      return {
        labels: h.map((v) => {
          const x = v.conversations || 0, m = c.value ? x / c.value * 100 : 0;
          return `${v.agent_type} - ${x.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((v) => v.conversations || 0),
            backgroundColor: p,
            borderColor: _,
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
              const p = (h.label || "").toString(), _ = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((x, m) => x + (Number(m) || 0), 0), v = g ? _ / g * 100 : 0;
              return `${p}: ${_.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, p) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", ak, [
          e.loading ? (b(), k("div", dk, [...p[2] || (p[2] = [
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
          ])])) : (b(), k("div", sk, [
            l.value ? (b(), k("section", ok, [
              r("div", ik, [
                V(ga, {
                  data: d.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", lk, [
              r("div", rk, [
                r("div", ck, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                p[1] || (p[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), hk = /* @__PURE__ */ lt(uk, [["__scopeId", "data-v-14445b91"]]), fk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gk = {
  key: 0,
  class: "card-body"
}, pk = {
  key: 0,
  class: "chart-section"
}, mk = { class: "chart-container" }, bk = {
  key: 1,
  class: "empty-state"
}, vk = { class: "empty-state-content" }, yk = { class: "empty-icon-wrapper" }, _k = {
  key: 1,
  class: "loading-state"
}, xk = /* @__PURE__ */ J({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = gt(ft(n, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const d = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), l = C(() => {
      const d = n.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const x = [...d].sort((m, f) => m.date.localeCompare(f.date));
        return {
          labels: x.map((m) => o(m.date)),
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
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, _ = Object.keys(u).filter((x) => h[x]).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const g = _.map((x) => o(x)), v = _.map((x) => {
        const m = u[x]?.total_cost || 0, f = h[x] || 0;
        return f > 0 ? m / f : 0;
      });
      return {
        labels: g,
        datasets: [
          {
            label: "Mean USD/conv",
            data: v,
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
            label: function(d) {
              let u = d.dataset.label || "";
              return u && (u += ": "), d.parsed.y !== null && (u += wt(d.parsed.y)), u;
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
            callback: function(d) {
              return wt(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", fk, [
          e.loading ? (b(), k("div", _k, [...u[2] || (u[2] = [
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
          ])])) : (b(), k("div", gk, [
            i.value ? (b(), k("section", pk, [
              r("div", mk, [
                V(he, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", bk, [
              r("div", vk, [
                r("div", yk, [
                  V(L(qt), { class: "empty-icon" })
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
}), kk = /* @__PURE__ */ lt(xk, [["__scopeId", "data-v-1e8204ea"]]);
function jt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const wk = { class: "tabs text-sm" }, Ck = ["aria-label"], $k = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Mk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Sk = /* @__PURE__ */ J({
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
    const n = e, a = t, s = ot([]), o = `tabs-${jt()}`, i = (g) => `${o}-tab-${g}`, l = C(
      () => n.items.map((g, v) => g.disabled ? -1 : v).filter((g) => g >= 0)
    );
    function c(g) {
      return g.value === n.modelValue;
    }
    function d(g) {
      const v = c(g), m = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${m} cursor-not-allowed opacity-40` : v ? `${m} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${m} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(g, v) {
      g === v || n.items.find((m) => m.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: v }));
    }
    function h(g, v) {
      a("tab-click", { value: g.value, originalEvent: v }), !g.disabled && (u(g.value, n.modelValue), Ot(() => {
        s.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function p(g, v) {
      const x = n.items.length;
      if (x === 0) return 0;
      let m = g;
      for (let f = 0; f < x; f++)
        if (m = (m + v + x) % x, !n.items[m]?.disabled) return m;
      return g;
    }
    async function _(g, v) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let m = v;
      g.key === "ArrowLeft" ? m = p(v, -1) : g.key === "ArrowRight" ? m = p(v, 1) : g.key === "Home" ? m = l.value[0] ?? 0 : g.key === "End" && (m = l.value[l.value.length - 1] ?? v);
      const f = n.items[m];
      !f || f.disabled || (u(f.value, n.modelValue), await Ot(), s.value[m]?.focus());
    }
    return (g, v) => (b(), k("div", wk, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Y([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (b(!0), k(X, null, it(e.items, (x, m) => (b(), k("button", {
          id: i(x.value),
          key: x.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": c(x),
          "aria-disabled": x.disabled === !0,
          tabindex: c(x) ? 0 : -1,
          class: Y(d(x)),
          onClick: (f) => h(x, f),
          onKeydown: (f) => _(f, m)
        }, [
          r("span", {
            class: Y(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            x.icon ? (b(), q(tn(x.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            r("span", Mk, A(x.label), 1)
          ], 2)
        ], 42, $k))), 128))
      ], 10, Ck),
      g.$slots.default ? (b(), q(_n, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: I(() => [
          (b(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Dt(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), Ji = /* @__PURE__ */ lt(Sk, [["__scopeId", "data-v-f9c367eb"]]), Dk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ak = {
  key: 0,
  class: "loading-state"
}, Tk = {
  key: 1,
  class: "card-body"
}, Bk = {
  key: 0,
  class: "model-usage-table-block"
}, Lk = { class: "w-full min-w-0" }, Fk = {
  key: 1,
  class: "empty-state"
}, Pk = { class: "empty-state-content" }, Ek = { class: "empty-icon-wrapper" }, Ik = /* @__PURE__ */ J({
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
    }, { isDark: i } = gt(ft(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], c = ot("by_model"), d = C(() => c.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), u = C(() => [
      { key: "name", label: c.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(d.value).map(([g, v]) => ({
        id: g,
        name: g,
        avgCost: _(v.avg_cost_per_message),
        avgTokens: p(v.avg_tokens_per_message),
        messageCount: p(v.message_count),
        totalCost: _(v.total_cost),
        totalTokens: p(v.total_tokens)
      }))
    ), p = (g) => g == null ? "0" : Z(g), _ = (g) => g == null ? "$0.00" : wt(g);
    return t({ isDark: i }), (g, v) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", Dk, [
          e.loading ? (b(), k("div", Ak, [...v[1] || (v[1] = [
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
          ])])) : (b(), k("div", Tk, [
            V(Ji, {
              modelValue: c.value,
              "onUpdate:modelValue": v[0] || (v[0] = (x) => c.value = x),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: I(() => [
                d.value && Object.keys(d.value).length > 0 ? (b(), k("div", Bk, [
                  r("div", Lk, [
                    V(se, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (b(), k("div", Fk, [
                  r("div", Pk, [
                    r("div", Ek, [
                      V(L(qt), { class: "empty-icon" })
                    ]),
                    v[2] || (v[2] = r("p", { class: "empty-title" }, "No model usage data available", -1)),
                    v[3] || (v[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), Rk = /* @__PURE__ */ lt(Ik, [["__scopeId", "data-v-0c23d620"]]), Ok = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vk = {
  key: 0,
  class: "loading-state"
}, zk = {
  key: 1,
  class: "card-body"
}, Nk = {
  key: 0,
  class: "message-roles-table-block"
}, jk = { class: "w-full min-w-0" }, Hk = {
  key: 1,
  class: "empty-state"
}, Wk = { class: "empty-state-content" }, Yk = { class: "empty-icon-wrapper" }, Kk = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (v) => {
      s("export", v);
    }, { isDark: i } = gt(ft(a, "theme")), l = ["assistant", "system", "user"], c = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], d = C(() => a.data?.total_by_role || {}), u = C(
      () => l.map((v) => ({
        id: v,
        role: g(v),
        avgCost: _(d.value[v]?.avg_cost_per_message),
        avgTokens: p(d.value[v]?.avg_tokens_per_message),
        messageCount: p(d.value[v]?.message_count),
        totalCost: _(d.value[v]?.total_cost),
        totalTokens: p(d.value[v]?.total_tokens)
      }))
    ), h = C(() => Object.keys(d.value).length > 0), p = (v) => v == null ? "0" : Z(v), _ = (v) => v == null ? "$0.00" : wt(v), g = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, x) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", Ok, [
          e.loading ? (b(), k("div", Vk, [...x[0] || (x[0] = [
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
          ])])) : (b(), k("div", zk, [
            h.value ? (b(), k("div", Nk, [
              r("div", jk, [
                V(se, {
                  columns: c,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (b(), k("div", Hk, [
              r("div", Wk, [
                r("div", Yk, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                x[1] || (x[1] = r("p", { class: "empty-title" }, "No message role data available", -1)),
                x[2] || (x[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Uk = /* @__PURE__ */ lt(Kk, [["__scopeId", "data-v-362c0dbc"]]), qk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Xk = {
  key: 0,
  class: "card-body"
}, Gk = {
  key: 0,
  class: "chart-section"
}, Zk = { class: "chart-container" }, Qk = { class: "kpi-grid" }, Jk = {
  key: 1,
  class: "empty-state"
}, t2 = { class: "empty-state-content" }, e2 = { class: "empty-icon-wrapper" }, n2 = {
  key: 1,
  class: "loading-state"
}, a2 = /* @__PURE__ */ J({
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
    const a = e, s = n, o = (f) => {
      s("export", f);
    }, { isDark: i, colors: l } = gt(ft(a, "theme")), c = {
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
    }, d = (f) => f.agent_type || f.agent_id || f.agent_name || "", u = (f) => f.agent_name ? f.agent_name : d(f).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (f) => {
      const y = d(f).toLowerCase();
      for (const [w, M] of Object.entries(c))
        if (y.includes(w))
          return M;
      return "#9ca3af";
    }, p = C(() => [...a.data?.top_agents || []].sort((y, w) => w.avg_cost_per_conversation - y.avg_cost_per_conversation)), _ = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((f, y) => f + y.conversations, 0)), g = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((f, y) => f + y.total_cost, 0)), v = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : _.value === 0 ? 0 : g.value / _.value), x = C(() => {
      const f = p.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const y = f.map((D) => u(D)), w = f.map((D) => D.avg_cost_per_conversation), M = f.map((D) => h(D));
      return {
        labels: y,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: M.map((D) => `${D}80`),
            borderColor: M,
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
            label: function(f) {
              const y = p.value[f.dataIndex];
              return [
                `Cost: ${wt(f.parsed.x)}`,
                `Conversations: ${Z(y.conversations)}`,
                `Total Cost: ${wt(y.total_cost)}`
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
              return wt(f);
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
    return t({ isDark: i }), (f, y) => (b(), q(ht, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), q(L(Lt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", qk, [
          e.loading ? (b(), k("div", n2, [...y[2] || (y[2] = [
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
          ])])) : (b(), k("div", Xk, [
            x.value.labels && x.value.labels.length ? (b(), k("section", Gk, [
              r("div", Zk, [
                V(be, {
                  data: x.value,
                  options: m.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Qk, [
                V(L(ut), {
                  title: "Total Agents",
                  value: String(p.value.length)
                }, null, 8, ["value"]),
                V(L(ut), {
                  title: "Total Conversations",
                  value: L(Z)(_.value)
                }, null, 8, ["value"]),
                V(L(ut), {
                  title: "Total Cost",
                  value: L(wt)(g.value)
                }, null, 8, ["value"]),
                V(L(ut), {
                  title: "Avg Cost / Conv.",
                  value: L(wt)(v.value)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Jk, [
              r("div", t2, [
                r("div", e2, [
                  V(L(qt), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = r("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                y[1] || (y[1] = r("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), s2 = /* @__PURE__ */ lt(a2, [["__scopeId", "data-v-49068ad7"]]);
function o2(e, t) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function i2(e, t) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const l2 = ["aria-label"], r2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, c2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, d2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, u2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], h2 = { class: "truncate" }, f2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, g2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, p2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, m2 = ["aria-label", "onClick"], b2 = ["aria-label", "onClick"], v2 = ["aria-label"], y2 = ["aria-label"], _2 = {
  key: 1,
  class: "space-y-2"
}, x2 = ["for"], k2 = ["id", "placeholder", "onKeydown"], w2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, C2 = ["aria-label"], $2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, M2 = ["checked", "onChange"], S2 = { class: "min-w-0 flex-1" }, D2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, A2 = { class: "flex flex-wrap items-end gap-2" }, T2 = { class: "min-w-[120px] flex-1" }, B2 = ["for"], L2 = ["id"], F2 = { class: "min-w-[120px] flex-1" }, P2 = ["for"], E2 = ["id"], I2 = /* @__PURE__ */ J({
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
    const n = e, a = t, s = za(), i = `${`kiut-filters-${jt()}`}-panel`, l = ot(null), c = /* @__PURE__ */ new Map(), d = ot(null), u = ot(!1), h = ot({}), p = ot(null), _ = ot(""), g = ot([]), v = ot(""), x = ot(""), m = C(() => d.value ? n.filterDefinitions.find((R) => R.id === d.value) ?? null : null), f = C(() => {
      const R = m.value;
      if (R)
        return R.type === "text" ? _.value : R.type === "select" ? g.value : { start: v.value, end: x.value };
    });
    function y(R, W) {
      W && W instanceof HTMLElement ? c.set(R, W) : c.delete(R);
    }
    function w(R) {
      return n.modelValue[R];
    }
    function M(R) {
      if (R == null) return [];
      if (Array.isArray(R))
        return R.filter((W) => typeof W == "string" && W.trim() !== "");
      if (typeof R == "string") {
        const W = R.trim();
        return W ? [W] : [];
      }
      return [];
    }
    function D(R, W) {
      if (W == null) return !0;
      if (R.type === "text") return String(W).trim() === "";
      if (R.type === "select") return M(W).length === 0;
      if (R.type === "dateRange") {
        const at = W;
        return !at?.start?.trim() || !at?.end?.trim();
      }
      return !0;
    }
    const $ = C(
      () => n.filterDefinitions.some((R) => !D(R, w(R.id)))
    ), S = C(() => {
      const R = [];
      for (const W of n.filterDefinitions) {
        const at = w(W.id);
        if (!D(W, at)) {
          if (W.type === "text")
            R.push({ kind: "text", def: W, key: W.id });
          else if (W.type === "dateRange")
            R.push({ kind: "dateRange", def: W, key: W.id });
          else if (W.type === "select")
            for (const bt of M(at))
              R.push({
                kind: "select",
                def: W,
                optionValue: bt,
                key: `${W.id}::${bt}`
              });
        }
      }
      return R;
    });
    function F(R) {
      return R.type !== "select" ? 0 : M(w(R.id)).length;
    }
    function T(R) {
      const W = w(R.id), at = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${at}: ${String(W ?? "").trim()}`;
      if (R.type === "select") {
        const rl = M(W).map((us) => R.options.find((cl) => cl.value === us)?.label ?? us);
        return `${at}: ${rl.join(", ")}`;
      }
      const bt = W, ne = P(bt.start), Se = P(bt.end);
      return `${at}: ${ne} – ${Se}`;
    }
    function B(R) {
      return R.kind === "text" || R.kind === "dateRange" ? T(R.def) : R.def.options.find((at) => at.value === R.optionValue)?.label ?? R.optionValue;
    }
    function P(R) {
      if (!R) return "";
      const W = Rt(R, "YYYY-MM-DD", !0);
      return W.isValid() ? W.format("L") : R;
    }
    function E(R) {
      const W = d.value === R.id && u.value, at = !D(R, w(R.id));
      return W || at ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(R) {
      return D(R, w(R.id)) ? vt(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function K(R) {
      const W = w(R.id);
      if (R.type === "text") {
        _.value = W != null ? String(W) : "";
        return;
      }
      if (R.type === "select") {
        g.value = [...M(W)];
        return;
      }
      const at = W;
      v.value = at?.start?.trim() ?? "", x.value = at?.end?.trim() ?? "";
    }
    function j() {
      const R = m.value;
      if (!R || R.type !== "select") return;
      const W = { ...n.modelValue };
      g.value.length === 0 ? delete W[R.id] : W[R.id] = [...g.value], a("update:modelValue", W), a("change", W);
    }
    function Q(R) {
      const W = g.value.indexOf(R);
      W >= 0 ? g.value = g.value.filter((at, bt) => bt !== W) : g.value = [...g.value, R], j();
    }
    function tt(R) {
      if (!R) return;
      p.value = R;
      const W = R.getBoundingClientRect(), at = 300;
      let bt = W.left;
      const ne = window.innerWidth - at - 12;
      bt > ne && (bt = Math.max(12, ne)), bt < 12 && (bt = 12);
      const Se = W.bottom + 8;
      h.value = {
        top: `${Se}px`,
        left: `${bt}px`,
        width: `${Math.min(at, window.innerWidth - 24)}px`
      };
    }
    function ct(R, W) {
      if (d.value === R.id && u.value) {
        st();
        return;
      }
      u.value && d.value !== R.id && st(), d.value = R.id, u.value = !0, K(R), Ot().then(async () => {
        tt(W.currentTarget), await Ot(), U();
      });
    }
    function z(R, W) {
      if (d.value === R.id && u.value) {
        st();
        return;
      }
      u.value && d.value !== R.id && st(), d.value = R.id, u.value = !0, K(R), Ot().then(async () => {
        const at = c.get(R.id) ?? W.currentTarget;
        tt(at), await Ot(), U();
      });
    }
    function U() {
      const R = l.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function G() {
      u.value = !1, d.value = null, p.value = null;
    }
    function rt(R) {
      const W = m.value;
      if (!W) return;
      if (W.type === "text") {
        _.value = R != null ? String(R) : "";
        return;
      }
      if (W.type === "select") {
        g.value = Array.isArray(R) ? R.filter((bt) => typeof bt == "string") : M(R);
        return;
      }
      const at = R;
      v.value = at?.start?.trim() ?? "", x.value = at?.end?.trim() ?? "";
    }
    function st() {
      const R = m.value;
      if (!R) return;
      if (R.type === "text") {
        const ne = _.value.trim(), Se = { ...n.modelValue };
        ne === "" ? delete Se[R.id] : Se[R.id] = ne, a("update:modelValue", Se), a("change", Se), G();
        return;
      }
      if (R.type === "select") {
        j(), G();
        return;
      }
      const W = v.value.trim(), at = x.value.trim(), bt = { ...n.modelValue };
      !W || !at || W > at ? delete bt[R.id] : bt[R.id] = { start: W, end: at }, a("update:modelValue", bt), a("change", bt), G();
    }
    function St(R) {
      const W = { ...n.modelValue };
      delete W[R], a("update:modelValue", W), a("change", W), d.value === R && G();
    }
    function _t(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        St(R.def.id);
        return;
      }
      const W = { ...n.modelValue }, bt = M(W[R.def.id]).filter((ne) => ne !== R.optionValue);
      bt.length === 0 ? delete W[R.def.id] : W[R.def.id] = bt, a("update:modelValue", W), a("change", W), d.value === R.def.id && K(R.def);
    }
    function H() {
      const R = {};
      a("update:modelValue", R), a("change", R), G();
    }
    const et = C(() => {
      const R = m.value;
      return R ? `Editar filtro: ${R.label}` : "Filtro";
    });
    function nt(R) {
      const W = R.def.label.replace(/^\+\s*/, "");
      return R.kind === "select" ? `Quitar ${R.def.options.find((ne) => ne.value === R.optionValue)?.label ?? R.optionValue} del filtro ${W}` : `Quitar filtro ${W}`;
    }
    function dt(R) {
      const W = R.def.label.replace(/^\+\s*/, "");
      if (R.kind === "select") {
        const bt = R.def.options.find((ne) => ne.value === R.optionValue)?.label ?? R.optionValue;
        return `Editar filtro ${W}: ${bt}`;
      }
      return `Editar filtro ${W}`;
    }
    function vt(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const yt = C(() => n.clearLabel);
    function At(R) {
      if (!u.value || !l.value) return;
      const W = R.target;
      if (!(l.value.contains(W) || (W instanceof Element ? W : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const bt of c.values())
          if (bt?.contains(W)) return;
        st();
      }
    }
    function Nt(R) {
      R.key === "Escape" && u.value && (R.preventDefault(), G());
    }
    function Et() {
      !u.value || !p.value || tt(p.value);
    }
    return te(() => {
      document.addEventListener("mousedown", At, !0), window.addEventListener("keydown", Nt, !0), window.addEventListener("resize", Et);
    }), jo(() => {
      document.removeEventListener("mousedown", At, !0), window.removeEventListener("keydown", Nt, !0), window.removeEventListener("resize", Et);
    }), Bt(
      () => n.modelValue,
      () => {
        const R = m.value;
        R && u.value && !s.panel && K(R);
      },
      { deep: !0 }
    ), (R, W) => (b(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", r2, [
        r("span", c2, A(e.label), 1),
        r("div", d2, [
          (b(!0), k(X, null, it(e.filterDefinitions, (at) => (b(), k("button", {
            key: `pill-${at.id}`,
            ref_for: !0,
            ref: (bt) => y(at.id, bt),
            type: "button",
            class: Y(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", E(at)]),
            "aria-label": N(at),
            "aria-expanded": d.value === at.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === at.id ? i : void 0,
            onClick: (bt) => z(at, bt)
          }, [
            V(L(o2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            r("span", h2, A(at.label), 1),
            at.type === "select" && F(at) > 0 ? (b(), k("span", f2, A(F(at)), 1)) : O("", !0)
          ], 10, u2))), 128))
        ])
      ]),
      $.value ? (b(), k("div", g2, [
        r("div", p2, [
          (b(!0), k(X, null, it(S.value, (at) => (b(), k("div", {
            key: at.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            r("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": dt(at),
              onClick: (bt) => ct(at.def, bt)
            }, [
              Dt(R.$slots, "formatChip", {
                filter: at.def,
                value: w(at.def.id),
                optionValue: at.kind === "select" ? at.optionValue : void 0
              }, () => [
                xt(A(B(at)), 1)
              ], !0)
            ], 8, m2),
            r("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": nt(at),
              onClick: (bt) => _t(at)
            }, [
              V(L(i2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, b2)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": yt.value,
          onClick: H
        }, A(e.clearLabel), 9, v2)
      ])) : O("", !0),
      (b(), q(Na, { to: "body" }, [
        d.value && u.value ? (b(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": et.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: pt(h.value),
          onKeydown: W[3] || (W[3] = ae(() => {
          }, ["stop"]))
        }, [
          m.value ? (b(), k(X, { key: 0 }, [
            R.$slots.panel ? Dt(R.$slots, "panel", {
              key: 0,
              filter: m.value,
              close: st,
              value: f.value,
              updateValue: rt
            }, void 0, !0) : (b(), k("div", _2, [
              m.value.type === "text" ? (b(), k(X, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(m.value.label), 9, x2),
                Jt(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": W[0] || (W[0] = (at) => _.value = at),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: m.value.placeholder ?? "…",
                  onKeydown: $n(ae(st, ["prevent"]), ["enter"])
                }, null, 40, k2), [
                  [Ke, _.value]
                ])
              ], 64)) : m.value.type === "select" ? (b(), k(X, { key: 1 }, [
                r("p", w2, A(m.value.label), 1),
                r("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": m.value.label,
                  "aria-multiselectable": !0
                }, [
                  (b(!0), k(X, null, it(m.value.options, (at) => (b(), k("li", {
                    key: at.value
                  }, [
                    r("label", $2, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(at.value),
                        onChange: (bt) => Q(at.value)
                      }, null, 40, M2),
                      r("span", S2, A(at.label), 1)
                    ])
                  ]))), 128))
                ], 8, C2)
              ], 64)) : m.value.type === "dateRange" ? (b(), k(X, { key: 2 }, [
                r("p", D2, A(m.value.label), 1),
                r("div", A2, [
                  r("div", T2, [
                    r("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, B2),
                    Jt(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": W[1] || (W[1] = (at) => v.value = at),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, L2), [
                      [Ke, v.value]
                    ])
                  ]),
                  r("div", F2, [
                    r("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, P2),
                    Jt(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": W[2] || (W[2] = (at) => x.value = at),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, E2), [
                      [Ke, x.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, y2)) : O("", !0)
      ]))
    ], 8, l2));
  }
}), R2 = /* @__PURE__ */ lt(I2, [["__scopeId", "data-v-f38e0100"]]), ee = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ce = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", O2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Me = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", ve = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", V2 = { class: "font-sans" }, z2 = ["for"], N2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], j2 = ["id"], H2 = /* @__PURE__ */ J({
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
    const n = e, a = t, s = ca(), o = Ho("$pcForm", null), i = `kiut-input-text-${jt()}`, l = C(() => n.id ?? i), c = C(() => `${l.value}-err`), d = C(() => n.name ?? s.name ?? ""), u = ot(n.modelValue ?? "");
    Bt(
      () => n.modelValue,
      (m) => {
        u.value = m ?? "";
      }
    ), te(() => {
      o && d.value && o.register?.(d.value, {});
    }), ue(() => {
      o && d.value && o.deregister?.(d.value);
    });
    const h = C(() => o && d.value ? o.fields?.[d.value]?.states?.value ?? u.value : u.value), p = C(() => o && d.value ? o.fields?.[d.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function _(m) {
      const f = m.target.value;
      u.value = f, a("update:modelValue", f);
      const y = o?.fields?.[d.value]?.props;
      y?.onInput && y.onInput(m);
    }
    function g(m) {
      const f = o?.fields?.[d.value]?.props;
      f?.onChange && f.onChange(m);
    }
    function v(m) {
      const f = o?.fields?.[d.value]?.props;
      f?.onBlur && f.onBlur(m);
    }
    const x = C(() => {
      const { name: m, id: f, type: y, ...w } = s;
      return w;
    });
    return (m, f) => (b(), k("div", V2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: Y(L(ee))
      }, A(e.label), 11, z2)) : O("", !0),
      r("input", sn(x.value, {
        id: l.value,
        name: d.value,
        type: e.type,
        autocomplete: "off",
        class: [L(ce), p.value ? L(Me) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": p.value ? "true" : void 0,
        "aria-describedby": e.errorText ? c.value : void 0,
        onInput: _,
        onChange: g,
        onBlur: v
      }), null, 16, N2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: c.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, j2)) : O("", !0)
    ]));
  }
}), W2 = { class: "font-sans" }, Y2 = ["for"], K2 = { class: "relative" }, U2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], q2 = ["aria-label"], X2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, G2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Z2 = ["id"], Q2 = /* @__PURE__ */ J({
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
    const n = e, a = t, s = ca(), o = Ho("$pcForm", null), i = `kiut-input-password-${jt()}`, l = C(() => n.id ?? i), c = C(() => `${l.value}-err`), d = C(() => n.name ?? s.name ?? ""), u = ot(!1), h = ot(n.modelValue ?? "");
    Bt(
      () => n.modelValue,
      (f) => {
        f !== void 0 && f !== h.value && (h.value = f);
      }
    ), te(() => {
      o && d.value && o.register?.(d.value, {});
    }), ue(() => {
      o && d.value && o.deregister?.(d.value);
    });
    const p = C(() => o && d.value ? o.fields?.[d.value]?.states?.value ?? h.value : h.value), _ = C(() => o && d.value ? o.fields?.[d.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(f) {
      const y = f.target.value;
      h.value = y, a("update:modelValue", y);
      const w = o?.fields?.[d.value]?.props;
      w?.onInput && w.onInput(f);
    }
    function v(f) {
      const y = o?.fields?.[d.value]?.props;
      y?.onChange && y.onChange(f);
    }
    function x(f) {
      const y = o?.fields?.[d.value]?.props;
      y?.onBlur && y.onBlur(f);
    }
    const m = C(() => {
      const { name: f, id: y, ...w } = s;
      return w;
    });
    return (f, y) => (b(), k("div", W2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: Y(L(ee))
      }, A(e.label), 11, Y2)) : O("", !0),
      r("div", K2, [
        r("input", sn(m.value, {
          id: l.value,
          name: d.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [L(ce), _.value ? L(Me) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: p.value,
          "aria-invalid": _.value ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          onInput: g,
          onChange: v,
          onBlur: x
        }), null, 16, U2),
        r("button", {
          type: "button",
          tabindex: "-1",
          onClick: y[0] || (y[0] = (w) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (b(), k("svg", G2, [...y[2] || (y[2] = [
            r("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (b(), k("svg", X2, [...y[1] || (y[1] = [
            r("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            }, null, -1),
            r("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, null, -1)
          ])]))
        ], 8, q2)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: c.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, Z2)) : O("", !0)
    ]));
  }
}), J2 = { class: "font-sans" }, tw = ["for"], ew = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], nw = ["id"], aw = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-input-textarea-${jt()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C({
      get: () => n.modelValue,
      set: (c) => a("update:modelValue", c)
    });
    return (c, d) => (b(), k("div", J2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: Y(L(ee))
      }, A(e.label), 11, tw)) : O("", !0),
      Jt(r("textarea", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: Y([L(O2), e.invalid ? L(Me) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, ew), [
        [Ke, l.value]
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, nw)) : O("", !0)
    ]));
  }
}), sw = { class: "font-sans" }, ow = ["for"], iw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], lw = ["for"], rw = ["title"], cw = ["aria-label"], dw = ["id"], uw = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-input-file-${jt()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = ot(null), c = C(() => n.modelValue?.name ?? n.placeholder);
    function d(h) {
      const _ = h.target.files?.[0] ?? null;
      a("update:modelValue", _);
    }
    function u() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, p) => (b(), k("div", sw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: Y(L(ee))
      }, A(e.label), 11, ow)) : O("", !0),
      r("div", {
        class: Y([
          L(ce),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? L(Me) : "",
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
          onChange: d
        }, null, 40, iw),
        r("label", {
          for: o.value,
          class: Y(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          V(L(fp), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          xt(" " + A(e.chooseLabel), 1)
        ], 10, lw),
        r("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: c.value || void 0
        }, A(c.value), 9, rw),
        e.modelValue && !e.disabled ? (b(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          V(L(Hi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, cw)) : O("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, dw)) : O("", !0)
    ]));
  }
}), hw = { class: "font-sans" }, fw = ["for"], gw = { class: "relative" }, pw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], mw = ["id"], bw = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-input-datetime-${jt()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => n.modelValue ?? "");
    function c(d) {
      const u = d.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (b(), k("div", hw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: Y(L(ee))
      }, A(e.label), 11, fw)) : O("", !0),
      r("div", gw, [
        V(L(ds), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: Y([
            L(ce),
            "pl-10",
            e.invalid ? L(Me) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: c
        }, null, 42, pw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, mw)) : O("", !0)
    ]));
  }
}), vw = { class: "font-sans" }, yw = ["for"], _w = { class: "relative" }, xw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], kw = ["id"], ww = /* @__PURE__ */ J({
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
      const _ = Number(p[1]), g = Number(p[2]);
      return !Number.isInteger(_) || !Number.isInteger(g) || _ < 0 || _ > 23 || g < 0 || g > 59 ? null : `${String(_).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${jt()}`, l = C(() => s.id ?? i), c = C(() => `${l.value}-err`), d = C(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function u(h) {
      const p = h.target.value;
      o("update:modelValue", a(p));
    }
    return (h, p) => (b(), k("div", vw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: Y(L(ee))
      }, A(e.label), 11, yw)) : O("", !0),
      r("div", _w, [
        V(L(pp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: Y([
            L(ce),
            "pl-10",
            e.invalid ? L(Me) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          onInput: u
        }, null, 42, xw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: c.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, kw)) : O("", !0)
    ]));
  }
}), Cw = { class: "font-sans" }, $w = ["for"], Mw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Sw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], Dw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Aw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Tw = { class: "min-w-0 text-left leading-snug" }, Bw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Lw = { class: "min-w-0 text-right leading-snug" }, Fw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Pw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Ew = ["id"], Iw = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-input-range-${jt()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => {
      const _ = [];
      return n.errorText && _.push(i.value), _.length ? _.join(" ") : void 0;
    }), c = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), d = C(() => !!(n.captionMin || n.captionMax)), u = C(() => {
      const { min: _, max: g, modelValue: v } = n;
      if (g === _) return 0;
      const x = (v - _) / (g - _);
      return Math.min(100, Math.max(0, x * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function p(_) {
      const g = Number(_.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (_, g) => (b(), k("div", Cw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: Y(L(ee))
      }, A(e.label), 11, $w)) : O("", !0),
      r("div", {
        class: Y(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (b(), k("p", Mw, A(e.captionMax), 1)) : O("", !0),
        r("div", {
          class: Y(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: pt(h.value)
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
            class: Y([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, Sw)
        ], 6),
        e.orientation === "horizontal" && c.value ? (b(), k("p", Dw, A(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (b(), k("div", Aw, [
          r("span", Tw, A(e.captionMin), 1),
          r("span", Bw, A(e.caption), 1),
          r("span", Lw, A(e.captionMax), 1)
        ])) : O("", !0),
        e.orientation === "vertical" && e.captionMin ? (b(), k("p", Fw, A(e.captionMin), 1)) : O("", !0),
        e.orientation === "vertical" && e.caption ? (b(), k("p", Pw, A(e.caption), 1)) : O("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, Ew)) : O("", !0)
    ]));
  }
}), Rw = /* @__PURE__ */ lt(Iw, [["__scopeId", "data-v-a1343418"]]), Ow = { class: "font-sans" }, Vw = ["for"], zw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Nw = ["id"], jw = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-input-number-${jt()}`, o = C(() => n.id ?? s), i = C(() => `${o.value}-err`), l = C(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), c = C(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const p = Number(h);
      a("update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (u, h) => (b(), k("div", Ow, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: Y(L(ee))
      }, A(e.label), 11, Vw)) : O("", !0),
      r("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: d,
        class: Y([
          L(ce),
          e.invalid ? L(Me) : "",
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
      }, null, 42, zw),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, Nw)) : O("", !0)
    ]));
  }
}), Hw = { class: "font-sans" }, Ww = ["for"], Yw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Kw = ["disabled"], Uw = ["id"], qw = "#3b82f6", Xw = "#aabbcc", Gw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Zw = /* @__PURE__ */ J({
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
      const v = g.trim(), x = /^#?([0-9a-fA-F]{6})$/.exec(v);
      if (x) return `#${x[1].toLowerCase()}`;
      const m = /^#?([0-9a-fA-F]{3})$/.exec(v);
      if (m) {
        const [f, y, w] = m[1].split("");
        return `#${f}${f}${y}${y}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? qw;
    }
    const s = e, o = t, i = `kiut-input-color-${jt()}`, l = C(() => s.id ?? i), c = C(() => `${l.value}-err`), d = C(() => a(s.modelValue)), u = ot(d.value), h = ot(!1);
    Bt(d, (g) => {
      h.value || (u.value = g);
    });
    function p(g) {
      const v = g.target, x = n(v.value);
      x && o("update:modelValue", x);
    }
    function _() {
      h.value = !1;
      const g = n(u.value);
      g ? (u.value = g, o("update:modelValue", g)) : u.value = d.value;
    }
    return Bt(u, (g) => {
      if (!h.value) return;
      const v = n(g);
      v && o("update:modelValue", v);
    }), (g, v) => (b(), k("div", Hw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: Y(L(ee))
      }, A(e.label), 11, Ww)) : O("", !0),
      r("div", {
        class: Y([
          Gw,
          e.invalid ? L(Me) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        r("input", {
          id: l.value,
          type: "color",
          value: d.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: p
        }, null, 40, Yw),
        e.showHexInput ? Jt((b(), k("input", {
          key: 0,
          "onUpdate:modelValue": v[0] || (v[0] = (x) => u.value = x),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Xw,
          onFocus: v[1] || (v[1] = (x) => h.value = !0),
          onBlur: _
        }, null, 40, Kw)), [
          [Ke, u.value]
        ]) : O("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: c.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, Uw)) : O("", !0)
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
    r("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const Qw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Jw = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, t5 = ["placeholder", "aria-label"], e5 = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, n5 = ["aria-selected", "onClick", "onMouseenter"], a5 = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, s5 = { class: "min-w-0 flex-1" }, el = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-select-${jt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = ot(null), d = ot(null), u = ot(null), h = ot(null), p = ot(null), _ = ot(!1), g = ot(0), v = ot(""), x = ot({});
    function m() {
      const z = d.value;
      if (!z) return;
      const U = z.getBoundingClientRect();
      x.value = {
        top: `${U.bottom - 3}px`,
        left: `${U.left}px`,
        width: `${U.width}px`
      };
    }
    const f = C(() => n.options.filter((z) => !z.disabled)), y = C(() => {
      if (!n.searchable) return f.value;
      const z = v.value.trim().toLowerCase();
      return z ? f.value.filter((U) => U.label.toLowerCase().includes(z)) : f.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), M = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((U) => U.value === n.modelValue)?.label ?? String(n.modelValue));
    function D(z) {
      return `${String(z.value)}-${z.label}`;
    }
    function $(z) {
      return n.modelValue === z.value;
    }
    function S(z, U) {
      const G = $(z), rt = g.value === U;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        G ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !G && rt ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function F() {
      g.value = Math.max(
        0,
        y.value.findIndex((z) => z.value === n.modelValue)
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
      m(), v.value = "", F(), Ot(() => T());
    }
    function P() {
      _.value = !1, v.value = "";
    }
    function E(z) {
      a("update:modelValue", z.value), P();
    }
    function N() {
      if (!n.disabled) {
        if (_.value) {
          P();
          return;
        }
        _.value = !0, B();
      }
    }
    function K(z) {
      z.stopPropagation(), !n.disabled && N();
    }
    function j(z) {
      if (!_.value) return;
      const U = z.target, G = c.value, rt = u.value;
      G && !G.contains(U) && (!rt || !rt.contains(U)) && P();
    }
    function Q(z) {
      n.disabled || (z.key === "ArrowDown" || z.key === "Enter" || z.key === " ") && (z.preventDefault(), _.value || (_.value = !0, B()));
    }
    function tt(z) {
      const U = y.value;
      if (z.key === "Escape") {
        z.preventDefault(), P();
        return;
      }
      if (z.key === "ArrowDown") {
        if (z.preventDefault(), U.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (z.key === "ArrowUp") {
        if (z.preventDefault(), U.length === 0) return;
        g.value = U.length - 1, h.value?.focus();
        return;
      }
      if (z.key === "Enter") {
        z.preventDefault();
        const G = U[g.value];
        G && E(G);
      }
    }
    function ct(z) {
      const U = y.value;
      if (z.key === "Escape") {
        z.preventDefault(), P();
        return;
      }
      if (U.length !== 0) {
        if (z.key === "ArrowDown") {
          z.preventDefault(), g.value = Math.min(g.value + 1, U.length - 1);
          return;
        }
        if (z.key === "ArrowUp") {
          if (z.preventDefault(), g.value === 0 && n.searchable) {
            p.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (z.key === "Enter") {
          z.preventDefault();
          const G = U[g.value];
          G && E(G);
        }
      }
    }
    return Bt(v, () => {
      g.value = 0;
    }), te(() => {
      document.addEventListener("click", j);
    }), ue(() => {
      document.removeEventListener("click", j);
    }), (z, U) => (b(), k("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: o,
        class: Y(L(ee))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: d,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Y([
          L(ce),
          "flex items-center justify-between gap-2 text-left",
          _.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": _.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: K,
        onKeydown: Q
      }, [
        r("span", {
          class: Y([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(M.value), 3),
        V(L(zi), {
          class: Y(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", _.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Qw),
      (b(), q(Na, { to: "body" }, [
        Jt(r("div", {
          ref_key: "panelRef",
          ref: u,
          style: pt(x.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (b(), k("div", Jw, [
            Jt(r("input", {
              ref_key: "searchInputRef",
              ref: p,
              "onUpdate:modelValue": U[0] || (U[0] = (G) => v.value = G),
              type: "search",
              class: Y([L(ce), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: U[1] || (U[1] = ae(() => {
              }, ["stop"])),
              onKeydown: ae(tt, ["stop"])
            }, null, 42, t5), [
              [Ke, v.value]
            ])
          ])) : O("", !0),
          r("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: ae(ct, ["stop"])
          }, [
            y.value.length === 0 ? (b(), k("li", e5, A(e.noResultsText), 1)) : O("", !0),
            (b(!0), k(X, null, it(y.value, (G, rt) => (b(), k("li", {
              key: D(G),
              role: "option",
              "aria-selected": $(G),
              class: Y(S(G, rt)),
              onClick: ae((st) => E(G), ["stop"]),
              onMouseenter: (st) => g.value = rt
            }, [
              e.showOptionCheck ? (b(), k("span", a5, [
                $(G) ? (b(), q(L(tl), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : O("", !0)
              ])) : O("", !0),
              r("span", s5, A(G.label), 1)
            ], 42, n5))), 128))
          ], 544)
        ], 4), [
          [an, _.value]
        ])
      ]))
    ], 512));
  }
}), o5 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], i5 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, l5 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, r5 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, c5 = { class: "truncate" }, d5 = ["aria-selected", "onClick", "onMouseenter"], u5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, h5 = { class: "min-w-0 flex-1" }, f5 = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-multiselect-${jt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = ot(null), d = ot(null), u = ot(!1), h = ot(0), p = C(() => n.options.filter((T) => !T.disabled)), _ = C(() => new Set(n.modelValue ?? [])), g = C(
      () => n.options.filter((T) => _.value.has(T.value))
    ), v = C(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = g.value.length;
      return B === 0 ? T : `${T}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function x(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function m(T) {
      return _.value.has(T.value);
    }
    function f(T, B) {
      const P = m(T), E = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        P ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !P && E ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function y(T) {
      const B = [...n.modelValue ?? []], P = B.indexOf(T.value);
      P >= 0 ? B.splice(P, 1) : B.push(T.value), a("update:modelValue", B);
    }
    function w() {
      const T = p.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = _.value, P = T.findIndex((E) => B.has(E.value));
      h.value = P >= 0 ? P : 0;
    }
    function M() {
      n.disabled || (u.value = !u.value);
    }
    function D(T) {
      T.stopPropagation(), !n.disabled && (M(), u.value && (w(), Ot(() => d.value?.focus())));
    }
    function $(T) {
      if (!u.value) return;
      const B = c.value;
      B && !B.contains(T.target) && (u.value = !1);
    }
    function S(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), u.value || (u.value = !0, w(), Ot(() => d.value?.focus())));
    }
    function F(T) {
      const B = p.value;
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
          const P = B[h.value];
          P && y(P);
        }
      }
    }
    return te(() => {
      document.addEventListener("click", $);
    }), ue(() => {
      document.removeEventListener("click", $);
    }), (T, B) => (b(), k("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: o,
        class: Y(L(ee))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Y([
          L(ce),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: D,
        onKeydown: S
      }, [
        r("div", i5, [
          g.value.length === 0 ? (b(), k("span", l5, A(e.placeholder), 1)) : (b(), k("div", r5, [
            (b(!0), k(X, null, it(g.value, (P) => (b(), k("span", {
              key: x(P),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              r("span", c5, A(P.label), 1)
            ]))), 128))
          ]))
        ]),
        V(L(zi), {
          class: Y(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, o5),
      Jt(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ae(F, ["stop"])
      }, [
        (b(!0), k(X, null, it(p.value, (P, E) => (b(), k("li", {
          key: x(P),
          role: "option",
          "aria-selected": m(P),
          class: Y(f(P, E)),
          onClick: ae((N) => y(P), ["stop"]),
          onMouseenter: (N) => h.value = E
        }, [
          r("span", u5, [
            m(P) ? (b(), q(L(tl), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : O("", !0)
          ]),
          r("span", h5, A(P.label), 1)
        ], 42, d5))), 128))
      ], 544), [
        [an, u.value]
      ])
    ], 512));
  }
}), g5 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], p5 = { class: "sr-only" }, m5 = /* @__PURE__ */ J({
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
    return (o, i) => (b(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: Y([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: s,
      onKeydown: [
        $n(ae(s, ["prevent", "stop"]), ["space"]),
        $n(ae(s, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: Y(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", p5, A(e.ariaLabel), 1)
    ], 42, g5));
  }
}), b5 = { class: "font-sans" }, v5 = ["for"], y5 = { class: "flex gap-2" }, _5 = { class: "w-[7.5rem] shrink-0" }, x5 = { class: "min-w-0 flex-1" }, k5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], w5 = ["id"], C5 = /* @__PURE__ */ J({
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
    const n = e, a = t, s = `kiut-phone-${jt()}`, o = C(() => n.id ?? `${s}-num`), i = C(() => `${o.value}-err`), l = C({
      get: () => n.modelValue.prefix,
      set: (d) => a("update:modelValue", { ...n.modelValue, prefix: d })
    }), c = C({
      get: () => n.modelValue.number,
      set: (d) => a("update:modelValue", { ...n.modelValue, number: d })
    });
    return (d, u) => (b(), k("div", b5, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: Y(L(ee))
      }, A(e.label), 11, v5)) : O("", !0),
      r("div", y5, [
        r("div", _5, [
          V(el, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        r("div", x5, [
          Jt(r("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => c.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Y([L(ce), e.invalid ? L(Me) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, k5), [
            [Ke, c.value]
          ])
        ])
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: Y(L(ve)),
        role: "alert"
      }, A(e.errorText), 11, w5)) : O("", !0)
    ]));
  }
}), $5 = ["role", "aria-label"], M5 = { class: "flex flex-wrap gap-2" }, S5 = ["aria-checked", "role", "onClick"], D5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, A5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, T5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, B5 = /* @__PURE__ */ J({
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
    const n = e, a = t, s = C(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(c) {
      return n.multiple ? s.value.includes(c.value) : n.modelValue === c.value;
    }
    function i(c) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(c) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(c) {
      if (n.multiple) {
        const d = Array.isArray(n.modelValue) ? [...n.modelValue] : [], u = d.indexOf(c.value);
        u >= 0 ? d.splice(u, 1) : d.push(c.value), a("update:modelValue", d);
        return;
      }
      a("update:modelValue", c.value);
    }
    return (c, d) => (b(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", M5, [
        (b(!0), k(X, null, it(e.items, (u) => (b(), k("button", {
          key: u.value,
          type: "button",
          class: Y(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(u)
        }, [
          r("span", D5, [
            o(u) ? (b(), k("span", A5)) : O("", !0)
          ]),
          u.dotColor ? (b(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: pt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", T5, A(u.label), 1)
        ], 10, S5))), 128))
      ])
    ], 8, $5));
  }
}), L5 = ["aria-label"], F5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], P5 = { class: "truncate px-3 py-2 text-sm font-medium" }, E5 = /* @__PURE__ */ J({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${jt()}`, o = (v) => `${s}-seg-${v}`, i = ot([]);
    function l(v, x) {
      v instanceof HTMLButtonElement ? i.value[x] = v : i.value[x] = null;
    }
    function c(v) {
      return v.value === n.modelValue;
    }
    function d(v) {
      const x = c(v), m = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return v.disabled ? `${m} cursor-not-allowed opacity-40` : x ? `${m} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${m} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(v) {
      v.disabled || v.value !== n.modelValue && a("update:modelValue", v.value);
    }
    function h(v, x, m) {
      u(v), Ot(() => i.value[x]?.focus());
    }
    const p = C(
      () => n.items.map((v, x) => v.disabled ? -1 : x).filter((v) => v >= 0)
    );
    function _(v, x) {
      const m = n.items.length;
      if (m === 0) return 0;
      let f = v;
      for (let y = 0; y < m; y++)
        if (f = (f + x + m) % m, !n.items[f]?.disabled) return f;
      return v;
    }
    function g(v, x) {
      if (v.key === "ArrowRight" || v.key === "ArrowDown") {
        v.preventDefault();
        const m = _(x, 1), f = n.items[m];
        f && u(f), Ot(() => i.value[m]?.focus());
      } else if (v.key === "ArrowLeft" || v.key === "ArrowUp") {
        v.preventDefault();
        const m = _(x, -1), f = n.items[m];
        f && u(f), Ot(() => i.value[m]?.focus());
      } else if (v.key === "Home") {
        v.preventDefault();
        const m = p.value[0];
        if (m !== void 0) {
          const f = n.items[m];
          f && u(f), Ot(() => i.value[m]?.focus());
        }
      } else if (v.key === "End") {
        v.preventDefault();
        const m = p.value[p.value.length - 1];
        if (m !== void 0) {
          const f = n.items[m];
          f && u(f), Ot(() => i.value[m]?.focus());
        }
      }
    }
    return (v, x) => (b(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (b(!0), k(X, null, it(e.items, (m, f) => (b(), k("button", {
        id: o(m.value),
        key: m.value,
        ref_for: !0,
        ref: (y) => l(y, f),
        type: "button",
        role: "tab",
        "aria-selected": c(m),
        "aria-disabled": m.disabled === !0,
        tabindex: c(m) ? 0 : -1,
        class: Y(d(m)),
        onClick: (y) => h(m, f),
        onKeydown: (y) => g(y, f)
      }, [
        r("span", P5, A(m.label), 1)
      ], 42, F5))), 128))
    ], 8, L5));
  }
}), I5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, R5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, O5 = {
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
}, V5 = {
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
}, z5 = [
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
function N5(e = "en") {
  return I5[e];
}
function nl(e = "en") {
  return z5.map((t) => ({ id: t, label: V5[e][t] }));
}
function j5(e = "en") {
  return "Presets";
}
nl("es");
function Yt(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function Zt(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function Ft(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Ce(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Pn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function H5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ft(n);
}
function mn(e, t) {
  return H5(e, -t);
}
function W5(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function al(e, t = /* @__PURE__ */ new Date()) {
  const n = Ft(t);
  switch (e) {
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
      return { start: a, end: W5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function sl(e, t, n) {
  let a = Ft(e.start), s = Ft(e.end);
  if (t) {
    const o = Ft(Yt(t));
    Ie(a, o) && (a = o), Ie(s, o) && (s = o);
  }
  if (n) {
    const o = Ft(Yt(n));
    Ta(a, o) && (a = o), Ta(s, o) && (s = o);
  }
  return Ta(a, s) ? { start: s, end: a } : { start: a, end: s };
}
function Y5(e, t, n = /* @__PURE__ */ new Date(), a, s) {
  if (!e.start || !e.end) return !1;
  const o = sl(al(t, n), a, s);
  return Zt(o.start) === e.start && Zt(o.end) === e.end;
}
function In(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Fe(e, t) {
  return In(e, t) === 0;
}
function Ie(e, t) {
  return In(e, t) < 0;
}
function Ta(e, t) {
  return In(e, t) > 0;
}
function ol(e, t) {
  return In(e, t) >= 0;
}
function il(e, t) {
  return In(e, t) <= 0;
}
function ll(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
function ra(e, t = "en") {
  return `${R5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Pe(e, t = "en") {
  return `${O5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const K5 = ["aria-expanded", "aria-labelledby", "aria-label"], U5 = ["onKeydown"], q5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, X5 = { class: "mb-4 flex items-center justify-between gap-2" }, G5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, Z5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, Q5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, J5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, tC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, eC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, nC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, aC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, sC = ["disabled", "onClick"], oC = "rounded-lg text-[#61616b]", iC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", lC = "opacity-30", rC = "bg-[#6b35e9] font-medium text-white", cC = "bg-[#895af6] font-semibold text-white", dC = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `${`kiut-drp-${jt()}`}-lbl`, i = ot(null), l = ot(null), c = ot(!1), d = ot(null), u = ot(Ce(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), p = C(() => {
      const B = Ce(u.value);
      return [B, Pn(B, 1)];
    }), _ = C(() => n.ariaLabel ?? n.placeholder), g = C(() => {
      const B = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${B}` : `left-0 right-auto ${B}`;
    }), v = C(
      () => `${Pe(p.value[0])} – ${Pe(p.value[1])}`
    ), x = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], m = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const B = Yt(n.modelValue.start), P = Yt(n.modelValue.end);
      return `${ra(B)} – ${ra(P)}`;
    });
    function f(B, P) {
      return B.getMonth() === P.getMonth() && B.getFullYear() === P.getFullYear();
    }
    function y(B) {
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
      const N = Fe(B, P), K = Fe(B, E);
      if (N && K) return "rounded-lg";
      const j = N || B.getDay() === 0, Q = K || B.getDay() === 6;
      return j && Q ? "rounded-lg" : j ? "rounded-l-lg" : Q ? "rounded-r-lg" : "rounded-none";
    }
    function M(B, P) {
      const E = f(P, B), N = y(P), K = n.modelValue.start ? Ft(Yt(n.modelValue.start)) : null, j = n.modelValue.end ? Ft(Yt(n.modelValue.end)) : null, Q = Ft(P);
      if (N)
        return oC;
      let tt = iC;
      if (K && j && ol(Q, K) && il(Q, j)) {
        const z = Fe(Q, K), U = Fe(Q, j);
        tt = `${w(Q, K, j)} ${z || U ? cC : rC}`;
      }
      return E || (tt = `${tt} ${lC}`), tt;
    }
    function D(B) {
      if (y(B)) return;
      const P = Ft(B);
      if (!d.value) {
        d.value = new Date(P), a("update:modelValue", { start: Zt(P), end: Zt(P) });
        return;
      }
      let N = Ft(d.value), K = new Date(P);
      Ie(K, N) && ([N, K] = [K, N]), a("update:modelValue", { start: Zt(N), end: Zt(K) }), d.value = null, c.value = !1;
    }
    function $(B) {
      u.value = Pn(u.value, B);
    }
    function S() {
      c.value = !1;
    }
    function F(B) {
      if (B?.stopPropagation(), !c.value) {
        if (c.value = !0, d.value = null, n.modelValue.start)
          try {
            u.value = Ce(Yt(n.modelValue.start));
          } catch {
          }
        Ot(() => l.value?.focus());
      }
    }
    function T(B) {
      if (!c.value) return;
      const P = i.value;
      P && !P.contains(B.target) && (c.value = !1);
    }
    return Bt(c, (B) => {
      B && (d.value = null);
    }), te(() => {
      document.addEventListener("click", T);
    }), ue(() => {
      document.removeEventListener("click", T);
    }), (B, P) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: o,
        class: Y(L(ee))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        type: "button",
        class: Y([
          L(ce),
          "flex w-full items-center gap-2 text-left",
          c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : _.value,
        onFocus: F,
        onClick: F
      }, [
        V(L(ds), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: Y([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(m.value), 3)
      ], 42, K5),
      Jt(r("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Y([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $n(ae(S, ["stop"]), ["escape"])
      }, [
        r("div", q5, [
          r("div", X5, [
            r("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: P[0] || (P[0] = (E) => $(-1))
            }, [
              V(L(Ni), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            r("div", G5, [
              r("span", Z5, A(v.value), 1),
              r("div", Q5, [
                r("span", J5, A(L(Pe)(p.value[0])), 1),
                r("span", tC, A(L(Pe)(p.value[1])), 1)
              ])
            ]),
            r("button", {
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
          r("div", eC, [
            (b(!0), k(X, null, it(p.value, (E) => (b(), k("div", {
              key: `${E.getFullYear()}-${E.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              r("div", nC, [
                (b(), k(X, null, it(x, (N) => r("span", { key: N }, A(N), 1)), 64))
              ]),
              r("div", aC, [
                (b(!0), k(X, null, it(L(ll)(E), (N) => (b(), k("button", {
                  key: L(Zt)(N),
                  type: "button",
                  disabled: y(N),
                  class: Y(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", M(E, N)]),
                  onClick: (K) => D(N)
                }, A(N.getDate()), 11, sC))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, U5), [
        [an, c.value]
      ])
    ], 512));
  }
}), uC = ["aria-expanded", "aria-labelledby", "aria-label"], hC = ["aria-label", "onKeydown"], fC = { class: "flex flex-col sm:flex-row" }, gC = ["aria-label"], pC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, mC = { class: "flex flex-col gap-0.5" }, bC = ["onClick"], vC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, yC = { class: "mb-4 flex items-center justify-between gap-2" }, _C = ["aria-label"], xC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, kC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, wC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, CC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, $C = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, MC = ["aria-label"], SC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, DC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, AC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, TC = ["disabled", "onClick"], BC = "rounded-lg text-[#61616b]", LC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", FC = "opacity-30", PC = "bg-[#6b35e9] font-medium text-white", EC = "bg-[#895af6] font-semibold text-white", IC = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `${`kiut-dpp-${jt()}`}-lbl`, i = ot(null), l = ot(null), c = ot(!1), d = ot(null), u = ot(Ce(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), p = C(() => {
      const z = Ce(u.value);
      return [z, Pn(z, 1)];
    }), _ = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => n.ariaLabel ?? _.value), v = C(() => nl(n.locale)), x = C(() => j5(n.locale)), m = C(() => N5(n.locale)), f = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), y = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), M = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), D = C(() => {
      const z = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${z}` : `left-0 right-auto ${z}`;
    }), $ = C(
      () => `${Pe(p.value[0], n.locale)} – ${Pe(p.value[1], n.locale)}`
    ), S = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return _.value;
      const z = Yt(n.modelValue.start), U = Yt(n.modelValue.end);
      return `${ra(z, n.locale)} – ${ra(U, n.locale)}`;
    });
    function F(z, U) {
      return z.getMonth() === U.getMonth() && z.getFullYear() === U.getFullYear();
    }
    function T(z) {
      const U = Ft(z);
      if (n.minDate) {
        const G = Ft(Yt(n.minDate));
        if (Ie(U, G)) return !0;
      }
      if (n.maxDate) {
        const G = Ft(Yt(n.maxDate));
        if (Ie(G, U)) return !0;
      }
      return !1;
    }
    function B(z, U, G) {
      const rt = Fe(z, U), st = Fe(z, G);
      if (rt && st) return "rounded-lg";
      const St = rt || z.getDay() === 0, _t = st || z.getDay() === 6;
      return St && _t ? "rounded-lg" : St ? "rounded-l-lg" : _t ? "rounded-r-lg" : "rounded-none";
    }
    function P(z) {
      const U = Y5(
        n.modelValue,
        z,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), G = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return U ? `${G} font-medium` : G;
    }
    function E(z, U) {
      const G = F(U, z), rt = T(U), st = n.modelValue.start ? Ft(Yt(n.modelValue.start)) : null, St = n.modelValue.end ? Ft(Yt(n.modelValue.end)) : null, _t = Ft(U);
      if (rt)
        return BC;
      let H = LC;
      if (st && St && ol(_t, st) && il(_t, St)) {
        const nt = Fe(_t, st), dt = Fe(_t, St);
        H = `${B(_t, st, St)} ${nt || dt ? EC : PC}`;
      }
      return G || (H = `${H} ${FC}`), H;
    }
    function N(z) {
      const U = sl(al(z), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: Zt(U.start),
        end: Zt(U.end)
      }), u.value = Ce(U.start), d.value = null, c.value = !1;
    }
    function K(z) {
      if (T(z)) return;
      const U = Ft(z);
      if (!d.value) {
        d.value = new Date(U), a("update:modelValue", { start: Zt(U), end: Zt(U) });
        return;
      }
      let rt = Ft(d.value), st = new Date(U);
      Ie(st, rt) && ([rt, st] = [st, rt]), a("update:modelValue", { start: Zt(rt), end: Zt(st) }), d.value = null, c.value = !1;
    }
    function j(z) {
      u.value = Pn(u.value, z);
    }
    function Q() {
      c.value = !1;
    }
    function tt(z) {
      if (z.stopPropagation(), c.value) {
        c.value = !1;
        return;
      }
      if (c.value = !0, d.value = null, n.modelValue.start)
        try {
          u.value = Ce(Yt(n.modelValue.start));
        } catch {
        }
      Ot(() => l.value?.focus());
    }
    function ct(z) {
      if (!c.value) return;
      const U = i.value;
      U && !U.contains(z.target) && (c.value = !1);
    }
    return Bt(c, (z) => {
      z && (d.value = null);
    }), te(() => {
      document.addEventListener("click", ct);
    }), ue(() => {
      document.removeEventListener("click", ct);
    }), (z, U) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: o,
        class: Y(L(ee))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        type: "button",
        class: Y([
          L(ce),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: tt
      }, [
        V(L(ds), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: Y([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(S.value), 3)
      ], 10, uC),
      Jt(r("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": M.value,
        class: Y([
          D.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $n(ae(Q, ["stop"]), ["escape"])
      }, [
        r("div", fC, [
          r("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": f.value
          }, [
            r("p", pC, A(x.value), 1),
            r("ul", mC, [
              (b(!0), k(X, null, it(v.value, (G) => (b(), k("li", {
                key: G.id
              }, [
                r("button", {
                  type: "button",
                  class: Y(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", P(G.id)]),
                  onClick: (rt) => N(G.id)
                }, A(G.label), 11, bC)
              ]))), 128))
            ])
          ], 8, gC),
          r("div", vC, [
            r("div", yC, [
              r("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": y.value,
                onClick: U[0] || (U[0] = (G) => j(-1))
              }, [
                V(L(Ni), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, _C),
              r("div", xC, [
                r("span", kC, A($.value), 1),
                r("div", wC, [
                  r("span", CC, A(L(Pe)(p.value[0], e.locale)), 1),
                  r("span", $C, A(L(Pe)(p.value[1], e.locale)), 1)
                ])
              ]),
              r("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: U[1] || (U[1] = (G) => j(1))
              }, [
                V(L(ji), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, MC)
            ]),
            r("div", SC, [
              (b(!0), k(X, null, it(p.value, (G) => (b(), k("div", {
                key: `${G.getFullYear()}-${G.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                r("div", DC, [
                  (b(!0), k(X, null, it(m.value, (rt) => (b(), k("span", { key: rt }, A(rt), 1))), 128))
                ]),
                r("div", AC, [
                  (b(!0), k(X, null, it(L(ll)(G), (rt) => (b(), k("button", {
                    key: L(Zt)(rt),
                    type: "button",
                    disabled: T(rt),
                    class: Y(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", E(G, rt)]),
                    onClick: (st) => K(rt)
                  }, A(rt.getDate()), 11, TC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, hC), [
        [an, c.value]
      ])
    ], 512));
  }
}), RC = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, OC = ["type", "disabled", "aria-label"], VC = {
  key: 1,
  class: "min-w-0 truncate"
}, zC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, NC = ["type", "disabled", "aria-label"], jC = {
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
    const t = e, n = ca(), a = C(() => !!t.tooltip?.trim()), s = C(() => t.variant === "action"), o = C(() => !s.value), i = C(() => {
      const u = n["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = C(() => {
      const u = n.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), c = C(() => {
      const { class: u, type: h, "aria-label": p, ..._ } = n;
      return _;
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
    return (u, h) => a.value ? (b(), k("span", RC, [
      r("button", sn({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, L(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        u.$slots.icon ? (b(), k("span", {
          key: 0,
          class: Y(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Dt(u.$slots, "icon")
        ], 2)) : O("", !0),
        o.value ? (b(), k("span", VC, [
          Dt(u.$slots, "default")
        ])) : O("", !0)
      ], 16, OC),
      r("span", zC, A(e.tooltip), 1)
    ])) : (b(), k("button", sn({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, L(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      u.$slots.icon ? (b(), k("span", {
        key: 0,
        class: Y(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Dt(u.$slots, "icon")
      ], 2)) : O("", !0),
      o.value ? (b(), k("span", jC, [
        Dt(u.$slots, "default")
      ])) : O("", !0)
    ], 16, NC));
  }
}), HC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, WC = { class: "min-w-0 flex-1 space-y-1" }, YC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, KC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, UC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, qC = /* @__PURE__ */ J({
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
    const n = e, a = t, o = `${`kiut-modal-${jt()}`}-title`, i = ot(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function c() {
      a("confirm");
    }
    function d(u) {
      n.modelValue && u.key === "Escape" && (u.preventDefault(), l());
    }
    return Bt(
      () => n.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), te(() => {
      document.addEventListener("keydown", d);
    }), ue(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (b(), q(Na, { to: "body" }, [
      V(_n, { name: "kiut-modal" }, {
        default: I(() => [
          e.modelValue ? (b(), k("div", HC, [
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
              onClick: h[0] || (h[0] = ae(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: Y(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                r("div", WC, [
                  r("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (b(), k("p", YC, A(e.subtitle), 1)) : O("", !0)
                ]),
                V(ta, {
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
              r("div", KC, [
                Dt(u.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", UC, [
                V(ta, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: I(() => [
                    xt(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                V(ta, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: I(() => [
                    xt(A(e.confirmLabel), 1)
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
}), XC = /* @__PURE__ */ lt(qC, [["__scopeId", "data-v-4ed7bb14"]]), GC = { class: "text-left font-['Inter',system-ui,sans-serif]" }, ZC = {
  key: 0,
  class: ""
}, QC = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, JC = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, t$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, e$ = /* @__PURE__ */ J({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = za(), n = C(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (b(), k("section", GC, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (b(), k("header", ZC, [
        a.$slots.description ? (b(), k("div", QC, [
          Dt(a.$slots, "description")
        ])) : O("", !0),
        a.$slots.filters || a.$slots.actions ? (b(), k("div", {
          key: 1,
          class: Y(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (b(), k("div", JC, [
            Dt(a.$slots, "filters")
          ])) : O("", !0),
          a.$slots.actions ? (b(), k("div", t$, [
            Dt(a.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0)
      ])) : O("", !0),
      a.$slots.content || a.$slots.default ? (b(), k("div", {
        key: 1,
        class: Y({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        Dt(a.$slots, "content", {}, () => [
          Dt(a.$slots, "default")
        ])
      ], 2)) : O("", !0)
    ]));
  }
}), n$ = { class: "flex flex-1 min-h-0" }, a$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, s$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, o$ = ["aria-current", "data-has-active", "title", "onClick"], i$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, l$ = { class: "px-4 py-4 shrink-0" }, r$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, c$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, d$ = ["data-nav-id", "aria-current", "onClick"], u$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, h$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, f$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, g$ = ["data-nav-id", "aria-current", "onClick"], p$ = { class: "truncate text-[15px]" }, m$ = ["aria-current", "data-has-active", "onClick"], b$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, v$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, y$ = /* @__PURE__ */ J({
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
    const n = ot(!1), a = e, s = t, o = ca(), { class: i, ...l } = o, c = ot(!1);
    function d() {
      typeof window > "u" || (c.value = window.innerWidth < a.mobileBreakpoint);
    }
    te(() => {
      d(), window.addEventListener("resize", d);
    }), ue(() => {
      window.removeEventListener("resize", d);
    });
    const u = C(() => {
      const m = a.sections.find((f) => f.id === a.selectedSectionId);
      return m?.items?.length ? m : null;
    });
    function h(m) {
      return a.activePath ? a.activePath === m.path || a.activePath.startsWith(m.path + "/") : !1;
    }
    function p(m) {
      return m.items?.length ? m.items.some(h) : !a.activePath || !m.path ? !1 : a.activePath === m.path || a.activePath.startsWith(m.path + "/");
    }
    function _(m) {
      if (!m.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: m,
          item: { id: m.id, label: m.label, path: m.path }
        });
        return;
      }
      const f = a.selectedSectionId === m.id ? null : m.id;
      s("update:selectedSectionId", f);
    }
    function g(m, f) {
      s("navigate", { section: m, item: f });
    }
    function v() {
      s("update:selectedSectionId", null);
    }
    function x(m, f) {
      g(m, f), v();
    }
    return (m, f) => c.value ? (b(), k("div", sn({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      V(_n, { name: "ksn-overlay" }, {
        default: I(() => [
          u.value ? (b(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: v
          })) : O("", !0)
        ]),
        _: 1
      }),
      V(_n, { name: "ksn-sheet" }, {
        default: I(() => [
          u.value ? (b(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: pt({ paddingBottom: a.mobileBarHeight })
          }, [
            f[3] || (f[3] = r("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              r("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            r("div", u$, [
              r("p", h$, A(u.value.label), 1),
              r("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: v
              }, [...f[2] || (f[2] = [
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
            r("nav", f$, [
              (b(!0), k(X, null, it(u.value.items, (y) => (b(), k("button", {
                key: y.id,
                type: "button",
                "data-nav-id": y.id,
                "aria-current": h(y) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => x(u.value, y)
              }, [
                y.icon ? (b(), q(tn(y.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : O("", !0),
                r("span", p$, A(y.label), 1)
              ], 8, g$))), 128))
            ])
          ], 4)) : O("", !0)
        ]),
        _: 1
      }),
      r("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: pt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (b(!0), k(X, null, it(e.sections, (y) => (b(), k("button", {
          key: y.id,
          type: "button",
          "aria-current": e.selectedSectionId === y.id ? "true" : void 0,
          "data-has-active": p(y) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => _(y)
        }, [
          e.selectedSectionId === y.id || p(y) ? (b(), k("span", b$)) : O("", !0),
          y.icon ? (b(), q(tn(y.icon), {
            key: 1,
            class: "shrink-0",
            style: pt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          r("span", v$, A(y.label), 1)
        ], 8, m$))), 128))
      ], 4)
    ], 16)) : (b(), k("aside", sn({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", n$, [
        r("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: pt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: f[0] || (f[0] = (y) => n.value = !0),
          onMouseleave: f[1] || (f[1] = (y) => n.value = !1)
        }, [
          m.$slots.logo ? (b(), k("div", a$, [
            Dt(m.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : O("", !0),
          r("nav", s$, [
            (b(!0), k(X, null, it(e.sections, (y) => (b(), k("button", {
              key: y.id,
              type: "button",
              "aria-current": e.selectedSectionId === y.id ? "true" : void 0,
              "data-has-active": p(y) ? "true" : void 0,
              title: y.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => _(y)
            }, [
              y.icon ? (b(), q(tn(y.icon), {
                key: 0,
                class: "shrink-0",
                style: pt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : O("", !0),
              r("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: pt({ fontSize: e.primaryFontSize })
              }, A(y.label), 5)
            ], 8, o$))), 128))
          ]),
          m.$slots.footer ? (b(), k("div", i$, [
            Dt(m.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : O("", !0)
        ], 36),
        V(_n, { name: "ksn-sub" }, {
          default: I(() => [
            u.value ? (b(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: pt({ width: e.secondaryWidth })
            }, [
              r("div", l$, [
                r("p", r$, A(u.value.label), 1)
              ]),
              r("nav", c$, [
                (b(!0), k(X, null, it(u.value.items, (y) => (b(), k("button", {
                  key: y.id,
                  type: "button",
                  "data-nav-id": y.id,
                  "aria-current": h(y) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(u.value, y)
                }, [
                  y.icon ? (b(), q(tn(y.icon), {
                    key: 0,
                    style: pt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : O("", !0),
                  r("span", {
                    class: "truncate",
                    style: pt({ fontSize: e.secondaryFontSize })
                  }, A(y.label), 5)
                ], 8, d$))), 128))
              ])
            ], 4)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), _$ = /* @__PURE__ */ lt(y$, [["__scopeId", "data-v-e0ccb96c"]]), B$ = {
  install(e) {
    e.component("KiutChartBar", be), e.component("KiutChartLine", he), e.component("KiutPieChart", ga), e.component("KiutBoxplotChart", of), e.component("KiutCandlestickChart", Uf), e.component("KiutHistogramChart", Oi), e.component("KiutSankeyChart", Ve), e.component("KiutAgentsPerDay", Ep), e.component("KiutBookingManager", um), e.component("KiutCheckin", Wi), e.component("KiutCheckinContainer", k0), e.component("KiutCheckinMetrics", Hm), e.component("KiutCheckinSegments", Ki), e.component("KiutDisruption", N0), e.component("KiutFAQ", X0), e.component("KiutMessagesPerAgent", lb), e.component("KiutRecordLocator", Yi), e.component("KiutSalesByChannel", Ui), e.component("KiutSeller", qi), e.component("KiutSellerContainer", Xb), e.component("KiutTopAgents", av), e.component("KiutPaymentMethod", $v), e.component("KiutAgentHumanConversations", Cy), e.component("KiutChannelMetrics", Py), e.component("KiutTriageCombinations", Xy), e.component("KiutSelectLanguage", n1), e.component("KiutGuardrails", f1), e.component("KiutDisruptionNotifier", P1), e.component("KiutTotalConversationsCard", z1), e.component("KiutCsatP95Card", K1), e.component("KiutCsatPulseCard", Q1), e.component("KiutCSATContainer", M_), e.component("KiutAiGeneratedRevenueCard", P_), e.component("KiutHumanEscalations", q_), e.component("KiutHumanEscalationsCard", tx), e.component("KiutNpsDailyMetrics", Zi), e.component("KiutNpsMetrics", Qi), e.component("KiutNpsOverviewMetrics", Gi), e.component("KiutAWSCost", dx), e.component("KiutCostUsage", xx), e.component("KiutTokenUsage", Lx), e.component("KiutConversationCount", Hx), e.component("KiutTopAgentsAnalysis", nk), e.component("KiutTopAgentsPie", hk), e.component("KiutDailyCostTrends", kk), e.component("KiutModelUsage", Rk), e.component("KiutMessageRoles", Uk), e.component("KiutCostPerConversations", s2), e.component("Tabs", Ji), e.component("Table", Xi), e.component("Filters", R2), e.component("InputText", H2), e.component("InputPassword", Q2), e.component("InputTextarea", aw), e.component("InputFile", uw), e.component("InputDateTime", bw), e.component("InputTime", ww), e.component("InputRange", Rw), e.component("InputNumber", jw), e.component("InputColorPicker", Zw), e.component("Select", el), e.component("MultiSelect", f5), e.component("Toggle", m5), e.component("InputPhone", C5), e.component("SelectablePills", B5), e.component("SegmentedControl", E5), e.component("DateRangePicker", dC), e.component("DatePickerPresets", IC), e.component("Tag", Ht), e.component("Button", ta), e.component("Modal", XC), e.component("Section", e$), e.component("KiutAppShellNavigation", _$);
  }
};
export {
  dx as AWSCost,
  Cy as AgentHumanConversations,
  Ep as AgentsPerDay,
  P_ as AiGeneratedRevenueCard,
  _$ as AppShellNavigation,
  um as BookingManager,
  of as BoxplotChart,
  ta as Button,
  M_ as CSATContainer,
  Uf as CandlestickChart,
  Py as ChannelMetrics,
  be as ChartBar,
  he as ChartLine,
  Wi as Checkin,
  k0 as CheckinContainer,
  Hm as CheckinMetrics,
  Ki as CheckinSegments,
  Hx as ConversationCount,
  s2 as CostPerConversations,
  xx as CostUsage,
  K1 as CsatP95Card,
  Q1 as CsatPulseCard,
  kk as DailyCostTrends,
  IC as DatePickerPresets,
  dC as DateRangePicker,
  N0 as Disruption,
  P1 as DisruptionNotifier,
  X0 as FAQ,
  R2 as Filters,
  f1 as Guardrails,
  Oi as HistogramChart,
  q_ as HumanEscalations,
  tx as HumanEscalationsCard,
  Zw as InputColorPicker,
  bw as InputDateTime,
  uw as InputFile,
  jw as InputNumber,
  Q2 as InputPassword,
  C5 as InputPhone,
  Rw as InputRange,
  H2 as InputText,
  aw as InputTextarea,
  ww as InputTime,
  B$ as KiutUIPlugin,
  Uk as MessageRoles,
  lb as MessagesPerAgent,
  XC as Modal,
  Rk as ModelUsage,
  f5 as MultiSelect,
  Zi as NpsDailyMetrics,
  Qi as NpsMetrics,
  Gi as NpsOverviewMetrics,
  $v as PaymentMethod,
  ga as PieChart,
  Yi as RecordLocator,
  Ui as SalesByChannel,
  Ve as SankeyChart,
  e$ as Section,
  E5 as SegmentedControl,
  el as Select,
  n1 as SelectLanguage,
  B5 as SelectablePills,
  qi as Seller,
  Xb as SellerContainer,
  Xi as Table,
  Ji as Tabs,
  Ht as Tag,
  m5 as Toggle,
  Lx as TokenUsage,
  av as TopAgents,
  nk as TopAgentsAnalysis,
  hk as TopAgentsPie,
  z1 as TotalConversationsCard,
  Xy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
