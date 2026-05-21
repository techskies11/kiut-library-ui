import { defineComponent as Q, shallowRef as zo, h as $a, ref as nt, onMounted as oe, onUnmounted as Be, watch as It, toRaw as Ma, nextTick as Rt, version as al, isProxy as Vo, computed as D, toRef as rt, openBlock as v, createElementBlock as k, createVNode as z, unref as F, createElementVNode as r, Fragment as q, renderList as et, normalizeStyle as gt, normalizeClass as H, toDisplayString as A, createCommentVNode as O, onBeforeUnmount as No, createStaticVNode as os, withDirectives as Zt, vShow as yn, useSlots as Ea, renderSlot as $t, Comment as sl, createBlock as K, resolveDynamicComponent as Xe, withCtx as I, createTextVNode as yt, vModelSelect as ol, Transition as gn, Teleport as Pa, withModifiers as de, withKeys as qn, vModelText as Ne, useAttrs as jo, mergeProps as Un } from "vue";
import * as is from "echarts/core";
import { TooltipComponent as il, TitleComponent as ll } from "echarts/components";
import { SankeyChart as rl } from "echarts/charts";
import { CanvasRenderer as cl } from "echarts/renderers";
import Pt from "moment";
function Dn(e) {
  return e + 0.5 | 0;
}
const Ce = (e, t, n) => Math.max(Math.min(e, n), t);
function un(e) {
  return Ce(Dn(e * 2.55), 0, 255);
}
function De(e) {
  return Ce(Dn(e * 255), 0, 255);
}
function ge(e) {
  return Ce(Dn(e / 2.55) / 100, 0, 1);
}
function ls(e) {
  return Ce(Dn(e * 100), 0, 100);
}
const Jt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Sa = [..."0123456789ABCDEF"], dl = (e) => Sa[e & 15], ul = (e) => Sa[(e & 240) >> 4] + Sa[e & 15], An = (e) => (e & 240) >> 4 === (e & 15), hl = (e) => An(e.r) && An(e.g) && An(e.b) && An(e.a);
function fl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Jt[e[1]] * 17,
    g: 255 & Jt[e[2]] * 17,
    b: 255 & Jt[e[3]] * 17,
    a: t === 5 ? Jt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Jt[e[1]] << 4 | Jt[e[2]],
    g: Jt[e[3]] << 4 | Jt[e[4]],
    b: Jt[e[5]] << 4 | Jt[e[6]],
    a: t === 9 ? Jt[e[7]] << 4 | Jt[e[8]] : 255
  })), n;
}
const gl = (e, t) => e < 255 ? t(e) : "";
function pl(e) {
  var t = hl(e) ? dl : ul;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + gl(e.a, t) : void 0;
}
const ml = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Wo(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function bl(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function vl(e, t, n) {
  const a = Wo(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function yl(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Ia(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let c, d, u;
  return o !== i && (u = o - i, d = l > 0.5 ? u / (2 - o - i) : u / (o + i), c = yl(n, a, s, u, o), c = c * 60 + 0.5), [c | 0, d || 0, l];
}
function Ra(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(De);
}
function Oa(e, t, n) {
  return Ra(Wo, e, t, n);
}
function _l(e, t, n) {
  return Ra(vl, e, t, n);
}
function xl(e, t, n) {
  return Ra(bl, e, t, n);
}
function Ho(e) {
  return (e % 360 + 360) % 360;
}
function kl(e) {
  const t = ml.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? un(+t[5]) : De(+t[5]));
  const s = Ho(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = _l(s, o, i) : t[1] === "hsv" ? a = xl(s, o, i) : a = Oa(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function wl(e, t) {
  var n = Ia(e);
  n[0] = Ho(n[0] + t), n = Oa(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Cl(e) {
  if (!e)
    return;
  const t = Ia(e), n = t[0], a = ls(t[1]), s = ls(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${ge(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const rs = {
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
}, cs = {
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
function $l() {
  const e = {}, t = Object.keys(cs), n = Object.keys(rs);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, rs[o]);
    o = parseInt(cs[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Tn;
function Ml(e) {
  Tn || (Tn = $l(), Tn.transparent = [0, 0, 0, 0]);
  const t = Tn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Sl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Dl(e) {
  const t = Sl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? un(i) : Ce(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? un(a) : Ce(a, 0, 255)), s = 255 & (t[4] ? un(s) : Ce(s, 0, 255)), o = 255 & (t[6] ? un(o) : Ce(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function Al(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${ge(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ra = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Ke = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Tl(e, t, n) {
  const a = Ke(ge(e.r)), s = Ke(ge(e.g)), o = Ke(ge(e.b));
  return {
    r: De(ra(a + n * (Ke(ge(t.r)) - a))),
    g: De(ra(s + n * (Ke(ge(t.g)) - s))),
    b: De(ra(o + n * (Ke(ge(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Bn(e, t, n) {
  if (e) {
    let a = Ia(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = Oa(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Yo(e, t) {
  return e && Object.assign(t || {}, e);
}
function ds(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = De(e[3]))) : (t = Yo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = De(t.a)), t;
}
function Bl(e) {
  return e.charAt(0) === "r" ? Dl(e) : kl(e);
}
class _n {
  constructor(t) {
    if (t instanceof _n)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = ds(t) : n === "string" && (a = fl(t) || Ml(t) || Bl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Yo(this._rgb);
    return t && (t.a = ge(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ds(t);
  }
  rgbString() {
    return this._valid ? Al(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? pl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Cl(this._rgb) : void 0;
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
    return t && (this._rgb = Tl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new _n(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = De(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Dn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Bn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Bn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Bn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Bn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return wl(this._rgb, t), this;
  }
}
function ue() {
}
const Ll = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function kt(e) {
  return e == null;
}
function Ot(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function _t(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ee(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function ie(e, t) {
  return ee(e) ? e : t;
}
function ut(e, t) {
  return typeof e > "u" ? t : e;
}
const Fl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Ko = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Dt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function wt(e, t, n, a) {
  let s, o, i;
  if (Ot(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (_t(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function Xn(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function Gn(e) {
  if (Ot(e))
    return e.map(Gn);
  if (_t(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = Gn(e[n[s]]);
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
function El(e, t, n, a) {
  if (!qo(e))
    return;
  const s = t[e], o = n[e];
  _t(s) && _t(o) ? xn(s, o, a) : t[e] = Gn(o);
}
function xn(e, t, n) {
  const a = Ot(t) ? t : [
    t
  ], s = a.length;
  if (!_t(e))
    return e;
  n = n || {};
  const o = n.merger || El;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !_t(i))
      continue;
    const c = Object.keys(i);
    for (let d = 0, u = c.length; d < u; ++d)
      o(c[d], e, i, n);
  }
  return e;
}
function pn(e, t) {
  return xn(e, t, {
    merger: Pl
  });
}
function Pl(e, t, n) {
  if (!qo(e))
    return;
  const a = t[e], s = n[e];
  _t(a) && _t(s) ? pn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Gn(s));
}
const us = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Il(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Rl(e) {
  const t = Il(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function We(e, t) {
  return (us[t] || (us[t] = Rl(t)))(e);
}
function za(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const kn = (e) => typeof e < "u", Ae = (e) => typeof e == "function", hs = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Ol(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ct = Math.PI, Bt = 2 * Ct, zl = Bt + Ct, Zn = Number.POSITIVE_INFINITY, Vl = Ct / 180, zt = Ct / 2, Ee = Ct / 4, fs = Ct * 2 / 3, Uo = Math.log10, ce = Math.sign;
function mn(e, t, n) {
  return Math.abs(e - t) < n;
}
function gs(e) {
  const t = Math.round(e);
  e = mn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Uo(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Nl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function jl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function wn(e) {
  return !jl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Wl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Hl(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function pe(e) {
  return e * (Ct / 180);
}
function Yl(e) {
  return e * (180 / Ct);
}
function ps(e) {
  if (!ee(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Xo(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * Ct && (o += Bt), {
    angle: o,
    distance: s
  };
}
function Da(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Kl(e, t) {
  return (e - t + zl) % Bt - Ct;
}
function se(e) {
  return (e % Bt + Bt) % Bt;
}
function Cn(e, t, n, a) {
  const s = se(e), o = se(t), i = se(n), l = se(o - s), c = se(i - s), d = se(s - o), u = se(s - i);
  return s === o || s === i || a && o === i || l > c && d < u;
}
function Wt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function ql(e) {
  return Wt(e, -32768, 32767);
}
function $e(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Va(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const Ve = (e, t, n, a) => Va(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), Ul = (e, t, n) => Va(e, n, (a) => e[a][t] >= n);
function Xl(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const Go = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Gl(e, t) {
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
  }), Go.forEach((n) => {
    const a = "_onData" + za(n), s = e[n];
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
function ms(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (Go.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Zo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Qo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Jo(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, Qo.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function Zl(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Na = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", jt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, Ql = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Jl(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: b, minDefined: _, maxDefined: m } = i.getUserBounds();
    if (_) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Ve(c, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ve(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const p = c.slice(0, s + 1).reverse().findIndex((y) => !kt(y[l.axis]));
        s -= Math.max(0, p);
      }
      s = Wt(s, 0, a - 1);
    }
    if (m) {
      let p = Math.max(
        // @ts-expect-error Need to type _parsed
        Ve(c, i.axis, b, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ve(t, u, i.getPixelForValue(b), !0).hi + 1
      );
      if (d) {
        const y = c.slice(p - 1).findIndex((g) => !kt(g[l.axis]));
        p += Math.max(0, y);
      }
      o = Wt(p, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function tr(e) {
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
const Ln = (e) => e === 0 || e === 1, bs = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Bt / n)), vs = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Bt / n) + 1, bn = {
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
  easeInOutSine: (e) => -0.5 * (Math.cos(Ct * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Ln(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Ln(e) ? e : bs(e, 0.075, 0.3),
  easeOutElastic: (e) => Ln(e) ? e : vs(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ln(e) ? e : e < 0.5 ? 0.5 * bs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * vs(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - bn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? bn.easeInBounce(e * 2) * 0.5 : bn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function ja(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ys(e) {
  return ja(e) ? e : new _n(e);
}
function ca(e) {
  return ja(e) ? e : new _n(e).saturate(0.5).darken(0.1).hexString();
}
const er = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], nr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function ar(e) {
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
      properties: nr
    },
    numbers: {
      type: "number",
      properties: er
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
function sr(e) {
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
const _s = /* @__PURE__ */ new Map();
function or(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = _s.get(n);
  return a || (a = new Intl.NumberFormat(e, t), _s.set(n, a)), a;
}
function Wa(e, t, n) {
  return or(t, n).format(e);
}
const ir = {
  values(e) {
    return Ot(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const d = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (d < 1e-4 || d > 1e15) && (s = "scientific"), o = lr(e, n);
    }
    const i = Uo(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), c = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(c, this.options.ticks.format), Wa(e, a, c);
  }
};
function lr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var ti = {
  formatters: ir
};
function rr(e) {
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
      callback: ti.formatters.values,
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
const He = /* @__PURE__ */ Object.create(null), Aa = /* @__PURE__ */ Object.create(null);
function vn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function da(e, t, n) {
  return typeof t == "string" ? xn(vn(e, t), n) : xn(vn(e, ""), t);
}
class cr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => ca(s.backgroundColor), this.hoverBorderColor = (a, s) => ca(s.borderColor), this.hoverColor = (a, s) => ca(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return da(this, t, n);
  }
  get(t) {
    return vn(this, t);
  }
  describe(t, n) {
    return da(Aa, t, n);
  }
  override(t, n) {
    return da(He, t, n);
  }
  route(t, n, a, s) {
    const o = vn(this, t), i = vn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const c = this[l], d = i[s];
          return _t(c) ? Object.assign({}, d, c) : ut(c, d);
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
var Ft = /* @__PURE__ */ new cr({
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
  ar,
  sr,
  rr
]);
function dr(e) {
  return !e || kt(e.size) || kt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function xs(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Pe(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function ks(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ta(e, t, n, a) {
  ei(e, t, n, a, null);
}
function ei(e, t, n, a, s) {
  let o, i, l, c, d, u, h, b;
  const _ = t.pointStyle, m = t.rotation, p = t.radius;
  let y = (m || 0) * Vl;
  if (_ && typeof _ == "object" && (o = _.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(y), e.drawImage(_, -_.width / 2, -_.height / 2, _.width, _.height), e.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (e.beginPath(), _) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, p, 0, 0, Bt) : e.arc(n, a, p, 0, Bt), e.closePath();
        break;
      case "triangle":
        u = s ? s / 2 : p, e.moveTo(n + Math.sin(y) * u, a - Math.cos(y) * p), y += fs, e.lineTo(n + Math.sin(y) * u, a - Math.cos(y) * p), y += fs, e.lineTo(n + Math.sin(y) * u, a - Math.cos(y) * p), e.closePath();
        break;
      case "rectRounded":
        d = p * 0.516, c = p - d, i = Math.cos(y + Ee) * c, h = Math.cos(y + Ee) * (s ? s / 2 - d : c), l = Math.sin(y + Ee) * c, b = Math.sin(y + Ee) * (s ? s / 2 - d : c), e.arc(n - h, a - l, d, y - Ct, y - zt), e.arc(n + b, a - i, d, y - zt, y), e.arc(n + h, a + l, d, y, y + zt), e.arc(n - b, a + i, d, y + zt, y + Ct), e.closePath();
        break;
      case "rect":
        if (!m) {
          c = Math.SQRT1_2 * p, u = s ? s / 2 : c, e.rect(n - u, a - c, 2 * u, 2 * c);
          break;
        }
        y += Ee;
      /* falls through */
      case "rectRot":
        h = Math.cos(y) * (s ? s / 2 : p), i = Math.cos(y) * p, l = Math.sin(y) * p, b = Math.sin(y) * (s ? s / 2 : p), e.moveTo(n - h, a - l), e.lineTo(n + b, a - i), e.lineTo(n + h, a + l), e.lineTo(n - b, a + i), e.closePath();
        break;
      case "crossRot":
        y += Ee;
      /* falls through */
      case "cross":
        h = Math.cos(y) * (s ? s / 2 : p), i = Math.cos(y) * p, l = Math.sin(y) * p, b = Math.sin(y) * (s ? s / 2 : p), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + b, a - i), e.lineTo(n - b, a + i);
        break;
      case "star":
        h = Math.cos(y) * (s ? s / 2 : p), i = Math.cos(y) * p, l = Math.sin(y) * p, b = Math.sin(y) * (s ? s / 2 : p), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + b, a - i), e.lineTo(n - b, a + i), y += Ee, h = Math.cos(y) * (s ? s / 2 : p), i = Math.cos(y) * p, l = Math.sin(y) * p, b = Math.sin(y) * (s ? s / 2 : p), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + b, a - i), e.lineTo(n - b, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(y) * p, l = Math.sin(y) * p, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(y) * (s ? s / 2 : p), a + Math.sin(y) * p);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function $n(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Ha(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ya(e) {
  e.restore();
}
function ur(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function hr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function fr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), kt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function gr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, c = n - o.actualBoundingBoxAscent, d = n + o.actualBoundingBoxDescent, u = s.strikethrough ? (c + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function pr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Mn(e, t, n, a, s, o = {}) {
  const i = Ot(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = s.string, fr(e, o), c = 0; c < i.length; ++c)
    d = i[c], o.backdrop && pr(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), kt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, n, a, o.maxWidth)), e.fillText(d, n, a, o.maxWidth), gr(e, n, a, d, o), a += Number(s.lineHeight);
  e.restore();
}
function Qn(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ct, Ct, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Ct, zt, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, zt, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -zt, !0), e.lineTo(n + i.topLeft, a);
}
const mr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, br = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function vr(e, t) {
  const n = ("" + e).match(mr);
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
const yr = (e) => +e || 0;
function Ka(e, t) {
  const n = {}, a = _t(t), s = a ? Object.keys(t) : t, o = _t(e) ? a ? (i) => ut(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = yr(o(i));
  return n;
}
function ni(e) {
  return Ka(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ge(e) {
  return Ka(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ne(e) {
  const t = ni(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Ht(e, t) {
  e = e || {}, t = t || Ft.font;
  let n = ut(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = ut(e.style, t.style);
  a && !("" + a).match(br) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: ut(e.family, t.family),
    lineHeight: vr(ut(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: ut(e.weight, t.weight),
    string: ""
  };
  return s.string = dr(s), s;
}
function Fn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function _r(e, t, n) {
  const { min: a, max: s } = e, o = Ko(t, (s - a) / 2), i = (l, c) => n && l === 0 ? 0 : l + c;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function Ye(e, t) {
  return Object.assign(Object.create(e), t);
}
function qa(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = ii("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => qa([
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
      return si(l, c, () => Dr(c, t, e, l));
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
      return Cs(l).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Cs(l);
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
function Qe(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ai(e, a),
    setContext: (o) => Qe(e, o, n, a),
    override: (o) => Qe(e.override(o), t, n, a)
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
      return si(o, i, () => kr(o, i, l));
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
function ai(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Ae(n) ? n : () => n,
    isIndexable: Ae(a) ? a : () => a
  };
}
const xr = (e, t) => e ? e + za(t) : t, Ua = (e, t) => _t(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function si(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function kr(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Ae(l) && i.isScriptable(t) && (l = wr(t, l, e, n)), Ot(l) && l.length && (l = Cr(t, l, e, i.isIndexable)), Ua(t, l) && (l = Qe(l, s, o && o[t], i)), l;
}
function wr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let c = t(o, i || a);
  return l.delete(e), Ua(e, c) && (c = Xa(s._scopes, s, e, c)), c;
}
function Cr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (_t(t[0])) {
    const c = t, d = s._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const h = Xa(d, s, e, u);
      t.push(Qe(h, o, i && i[e], l));
    }
  }
  return t;
}
function oi(e, t, n) {
  return Ae(e) ? e(t, n) : e;
}
const $r = (e, t) => e === !0 ? t : typeof e == "string" ? We(t, e) : void 0;
function Mr(e, t, n, a, s) {
  for (const o of t) {
    const i = $r(n, o);
    if (i) {
      e.add(i);
      const l = oi(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function Xa(e, t, n, a) {
  const s = t._rootScopes, o = oi(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let c = ws(l, i, n, o || n, a);
  return c === null || typeof o < "u" && o !== n && (c = ws(l, i, o, c, a), c === null) ? !1 : qa(Array.from(l), [
    ""
  ], s, o, () => Sr(t, n, a));
}
function ws(e, t, n, a, s) {
  for (; n; )
    n = Mr(e, t, n, a, s);
  return n;
}
function Sr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Ot(s) && _t(n) ? n : s || {};
}
function Dr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = ii(xr(o, e), n), typeof s < "u")
      return Ua(e, s) ? Xa(n, a, e, s) : s;
}
function ii(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function Cs(e) {
  let t = e._keys;
  return t || (t = e._keys = Ar(e._scopes)), t;
}
function Ar(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Tr = Number.EPSILON || 1e-14, Je = (e, t) => t < e.length && !e[t].skip && e[t], li = (e) => e === "x" ? "y" : "x";
function Br(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Da(o, s), c = Da(i, o);
  let d = l / (l + c), u = c / (l + c);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = a * d, b = a * u;
  return {
    previous: {
      x: o.x - h * (i.x - s.x),
      y: o.y - h * (i.y - s.y)
    },
    next: {
      x: o.x + b * (i.x - s.x),
      y: o.y + b * (i.y - s.y)
    }
  };
}
function Lr(e, t, n) {
  const a = e.length;
  let s, o, i, l, c, d = Je(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (c = d, d = Je(e, u + 1), !(!c || !d)) {
      if (mn(t[u], 0, Tr)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      s = n[u] / t[u], o = n[u + 1] / t[u], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[u] = s * i * t[u], n[u + 1] = o * i * t[u]);
    }
}
function Fr(e, t, n = "x") {
  const a = li(n), s = e.length;
  let o, i, l, c = Je(e, 0);
  for (let d = 0; d < s; ++d) {
    if (i = l, l = c, c = Je(e, d + 1), !l)
      continue;
    const u = l[n], h = l[a];
    i && (o = (u - i[n]) / 3, l[`cp1${n}`] = u - o, l[`cp1${a}`] = h - o * t[d]), c && (o = (c[n] - u) / 3, l[`cp2${n}`] = u + o, l[`cp2${a}`] = h + o * t[d]);
  }
}
function Er(e, t = "x") {
  const n = li(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, c, d = Je(e, 0);
  for (i = 0; i < a; ++i)
    if (l = c, c = d, d = Je(e, i + 1), !!c) {
      if (d) {
        const u = d[t] - c[t];
        s[i] = u !== 0 ? (d[n] - c[n]) / u : 0;
      }
      o[i] = l ? d ? ce(s[i - 1]) !== ce(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Lr(e, s, o), Fr(e, o, t);
}
function En(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Pr(e, t) {
  let n, a, s, o, i, l = $n(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && $n(e[n + 1], t), o && (s = e[n], i && (s.cp1x = En(s.cp1x, t.left, t.right), s.cp1y = En(s.cp1y, t.top, t.bottom)), l && (s.cp2x = En(s.cp2x, t.left, t.right), s.cp2y = En(s.cp2y, t.top, t.bottom)));
}
function Ir(e, t, n, a, s) {
  let o, i, l, c;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Er(e, s);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], c = Br(d, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = c.previous.x, l.cp1y = c.previous.y, l.cp2x = c.next.x, l.cp2y = c.next.y, d = l;
  }
  t.capBezierPoints && Pr(e, n);
}
function Ga() {
  return typeof window < "u" && typeof document < "u";
}
function Za(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Jn(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const na = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Rr(e, t) {
  return na(e).getPropertyValue(t);
}
const Or = [
  "top",
  "right",
  "bottom",
  "left"
];
function je(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = Or[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const zr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Vr(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, c;
  if (zr(s, o, e.target))
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
function Oe(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = na(n), o = s.boxSizing === "border-box", i = je(s, "padding"), l = je(s, "border", "width"), { x: c, y: d, box: u } = Vr(e, n), h = i.left + (u && l.left), b = i.top + (u && l.top);
  let { width: _, height: m } = t;
  return o && (_ -= i.width + l.width, m -= i.height + l.height), {
    x: Math.round((c - h) / _ * n.width / a),
    y: Math.round((d - b) / m * n.height / a)
  };
}
function Nr(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && Za(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = na(o), c = je(l, "border", "width"), d = je(l, "padding");
      t = i.width - d.width - c.width, n = i.height - d.height - c.height, a = Jn(l.maxWidth, o, "clientWidth"), s = Jn(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || Zn,
    maxHeight: s || Zn
  };
}
const Me = (e) => Math.round(e * 10) / 10;
function jr(e, t, n, a) {
  const s = na(e), o = je(s, "margin"), i = Jn(s.maxWidth, e, "clientWidth") || Zn, l = Jn(s.maxHeight, e, "clientHeight") || Zn, c = Nr(e, t, n);
  let { width: d, height: u } = c;
  if (s.boxSizing === "content-box") {
    const b = je(s, "border", "width"), _ = je(s, "padding");
    d -= _.width + b.width, u -= _.height + b.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, a ? d / a : u - o.height), d = Me(Math.min(d, i, c.maxWidth)), u = Me(Math.min(u, l, c.maxHeight)), d && !u && (u = Me(d / 2)), (t !== void 0 || n !== void 0) && a && c.height && u > c.height && (u = c.height, d = Me(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function $s(e, t, n) {
  const a = t || 1, s = Me(e.height * a), o = Me(e.width * a);
  e.height = Me(e.height), e.width = Me(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Wr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Ga() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ms(e, t) {
  const n = Rr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ze(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Hr(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Yr(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = ze(e, s, n), l = ze(s, o, n), c = ze(o, t, n), d = ze(i, l, n), u = ze(l, c, n);
  return ze(d, u, n);
}
const Kr = function(e, t) {
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
}, qr = function() {
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
function Ze(e, t, n) {
  return e ? Kr(t, n) : qr();
}
function ri(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ci(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function di(e) {
  return e === "angle" ? {
    between: Cn,
    compare: Kl,
    normalize: se
  } : {
    between: $e,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Ss({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function Ur(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = di(a), c = t.length;
  let { start: d, end: u, loop: h } = e, b, _;
  if (h) {
    for (d += c, u += c, b = 0, _ = c; b < _ && i(l(t[d % c][a]), s, o); ++b)
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
function Xr(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: c, normalize: d } = di(a), { start: u, end: h, loop: b, style: _ } = Ur(e, t, n), m = [];
  let p = !1, y = null, g, f, x;
  const w = () => c(s, x, g) && l(s, x) !== 0, C = () => l(o, g) === 0 || c(o, x, g), S = () => p || w(), $ = () => !p || C();
  for (let M = u, L = u; M <= h; ++M)
    f = t[M % i], !f.skip && (g = d(f[a]), g !== x && (p = c(g, s, o), y === null && S() && (y = l(g, s) === 0 ? M : L), y !== null && $() && (m.push(Ss({
      start: y,
      end: M,
      loop: b,
      count: i,
      style: _
    })), y = null), L = M, x = g));
  return y !== null && m.push(Ss({
    start: y,
    end: h,
    loop: b,
    count: i,
    style: _
  })), m;
}
function Gr(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = Xr(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function Zr(e, t, n, a) {
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
function Qr(e, t, n, a) {
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
function Jr(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = Zr(n, s, o, a);
  if (a === !0)
    return Ds(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const c = l < i ? l + s : l, d = !!e._fullLoop && i === 0 && l === s - 1;
  return Ds(e, Qr(n, i, c, d), n, t);
}
function Ds(e, t, n, a) {
  return !a || !a.setContext || !n ? t : tc(e, t, n, a);
}
function tc(e, t, n, a) {
  const s = e._chart.getContext(), o = As(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, c = n.length, d = [];
  let u = o, h = t[0].start, b = h;
  function _(m, p, y, g) {
    const f = l ? -1 : 1;
    if (m !== p) {
      for (m += c; n[m % c].skip; )
        m -= f;
      for (; n[p % c].skip; )
        p += f;
      m % c !== p % c && (d.push({
        start: m % c,
        end: p % c,
        loop: y,
        style: g
      }), u = g, h = p % c);
    }
  }
  for (const m of t) {
    h = l ? h : m.start;
    let p = n[h % c], y;
    for (b = h + 1; b <= m.end; b++) {
      const g = n[b % c];
      y = As(a.setContext(Ye(s, {
        type: "segment",
        p0: p,
        p1: g,
        p0DataIndex: (b - 1) % c,
        p1DataIndex: b % c,
        datasetIndex: i
      }))), ec(y, u) && _(h, b - 1, m.loop, u), p = g, u = y;
    }
    h < b - 1 && _(h, b - 1, m.loop, u);
  }
  return d;
}
function As(e) {
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
function ec(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return ja(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Pn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function nc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Pn(n, t, "left"),
    right: Pn(n, t, "right"),
    top: Pn(a, t, "top"),
    bottom: Pn(a, t, "bottom")
  } : t;
}
function ac(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = nc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class sc {
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
    this._request || (this._running = !0, this._request = Qo.call(window, () => {
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
var he = /* @__PURE__ */ new sc();
const Ts = "transparent", oc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = ys(e || Ts), s = a.valid && ys(t || Ts);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class ic {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Fn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Fn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || oc[t.type || typeof i], this._easing = bn[t.easing] || bn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Fn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Fn([
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
class ui {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!_t(t))
      return;
    const n = Object.keys(Ft.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!_t(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (Ot(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = rc(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && lc(t.options.$animations, a).then(() => {
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
      const b = a.get(d);
      if (h)
        if (b && h.active()) {
          h.update(b, u, l);
          continue;
        } else
          h.cancel();
      if (!b || !b.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new ic(b, t, d, u), s.push(h);
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
      return he.add(this._chart, a), !0;
  }
}
function lc(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function rc(e, t) {
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
function Bs(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function cc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Bs(e, n), s = Bs(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function dc(e) {
  let t, n, a, s;
  return _t(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function hi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Ls(e, t, n, a = {}) {
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
    d = e.values[c], ee(d) && (o || t === 0 || ce(t) === ce(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function uc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let c, d, u;
  for (c = 0, d = i.length; c < d; ++c)
    u = i[c], l[c] = {
      [s]: u,
      [o]: e[u]
    };
  return l;
}
function ua(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function hc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function fc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function gc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Fs(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function Es(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, c = o.axis, d = i.axis, u = hc(o, i, a), h = t.length;
  let b;
  for (let _ = 0; _ < h; ++_) {
    const m = t[_], { [c]: p, [d]: y } = m, g = m._stacks || (m._stacks = {});
    b = g[d] = gc(s, u, p), b[l] = y, b._top = Fs(b, i, !0, a.type), b._bottom = Fs(b, i, !1, a.type);
    const f = b._visualValues || (b._visualValues = {});
    f[l] = y;
  }
}
function ha(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function pc(e, t) {
  return Ye(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function mc(e, t, n) {
  return Ye(e, {
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
function en(e, t) {
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
const fa = (e) => e === "reset" || e === "none", Ps = (e, t) => t ? e : Object.assign({}, e), bc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: hi(n, !0),
  values: null
};
class aa {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ua(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && en(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, b, _, m) => h === "x" ? b : h === "r" ? m : _, o = n.xAxisID = ut(a.xAxisID, ha(t, "x")), i = n.yAxisID = ut(a.yAxisID, ha(t, "y")), l = n.rAxisID = ut(a.rAxisID, ha(t, "r")), c = n.indexAxis, d = n.iAxisID = s(c, o, i, l), u = n.vAxisID = s(c, i, o, l);
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
    this._data && ms(this._data, this), t._stacked && en(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (_t(n)) {
      const s = this._cachedMeta;
      this._data = uc(n, s);
    } else if (a !== n) {
      if (a) {
        ms(a, this);
        const s = this._cachedMeta;
        en(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && Gl(n, this), this._syncList = [], this._data = n;
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
    n._stacked = ua(n.vScale, n), n.stack !== a.stack && (s = !0, en(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Es(this, n._parsed), n._stacked = ua(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let c = t === 0 && n === s.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, h, b;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, b = s;
    else {
      Ot(s[t]) ? b = this.parseArrayData(a, s, t, n) : _t(s[t]) ? b = this.parseObjectData(a, s, t, n) : b = this.parsePrimitiveData(a, s, t, n);
      const _ = () => h[l] === null || d && h[l] < d[l];
      for (u = 0; u < n; ++u)
        a._parsed[u + t] = h = b[u], c && (_() && (c = !1), d = h);
      a._sorted = c;
    }
    i && Es(this, b);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, c = i.axis, d = o.getLabels(), u = o === i, h = new Array(s);
    let b, _, m;
    for (b = 0, _ = s; b < _; ++b)
      m = b + a, h[b] = {
        [l]: u || o.parse(d[m], m),
        [c]: i.parse(n[m], m)
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
    let u, h, b, _;
    for (u = 0, h = s; u < h; ++u)
      b = u + a, _ = n[b], d[u] = {
        x: o.parse(We(_, l), b),
        y: i.parse(We(_, c), b)
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
      keys: hi(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Ls(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Ls(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), c = bc(n, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = fc(l);
    let b, _;
    function m() {
      _ = s[b];
      const p = _[l.axis];
      return !ee(_[t.axis]) || u > p || h < p;
    }
    for (b = 0; b < i && !(!m() && (this.updateRangeFromParsed(d, t, _, c), o)); ++b)
      ;
    if (o) {
      for (b = i - 1; b >= 0; --b)
        if (!m()) {
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
      i = n[s][t.axis], ee(i) && a.push(i);
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
    this.update(t || "default"), n._clip = dc(ut(this.options.clip, cc(n.xScale, n.yScale, this.getMaxOverflow())));
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
      o = i.$context || (i.$context = mc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = pc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], c = this.enableOptionSharing && kn(a);
    if (l)
      return Ps(l, c);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], b = d.getOptionScopes(this.getDataset(), u), _ = Object.keys(Ft.elements[t]), m = () => this.getContext(a, s, n), p = d.resolveNamedOptions(b, _, m, h);
    return p.$shared && (p.$shared = c, o[i] = Object.freeze(Ps(p, c))), p;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let c;
    if (s.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, n), b = u.getOptionScopes(this.getDataset(), h);
      c = u.createResolver(b, this.getContext(t, a, n));
    }
    const d = new ui(s, c && c.animations);
    return c && c._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || fa(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    fa(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !fa(n) && this._resolveAnimations(void 0, n).update(t, a);
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
      a._stacked && en(a, s);
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
function vc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = Zo(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function yc(e) {
  const t = e.iScale, n = vc(t, e.type);
  let a = t._length, s, o, i, l;
  const c = () => {
    i === 32767 || i === -32768 || (kn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), c();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), c();
  return a;
}
function _c(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return kt(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function xc(e, t, n, a) {
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
function kc(e, t, n, a) {
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
function fi(e, t, n, a) {
  return Ot(e) ? kc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Is(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, c = [];
  let d, u, h, b;
  for (d = n, u = n + a; d < u; ++d)
    b = t[d], h = {}, h[s.axis] = l || s.parse(i[d], d), c.push(fi(b, h, o, d));
  return c;
}
function ga(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function wc(e, t, n) {
  return e !== 0 ? ce(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Cc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function $c(e, t, n, a) {
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
  const { start: i, end: l, reverse: c, top: d, bottom: u } = Cc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = d : (n._bottom || 0) === a ? s = u : (o[Rs(u, i, l, c)] = !0, s = d)), o[Rs(s, i, l, c)] = !0, e.borderSkipped = o;
}
function Rs(e, t, n, a) {
  return a ? (e = Mc(e, t, n), e = Os(e, n, t)) : e = Os(e, t, n), e;
}
function Mc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Os(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Sc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Dc extends aa {
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
    return Is(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return Is(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? l : c, u = i.axis === "x" ? l : c, h = [];
    let b, _, m, p;
    for (b = a, _ = a + s; b < _; ++b)
      p = n[b], m = {}, m[o.axis] = o.parse(We(p, d), b), h.push(fi(We(p, u), m, i, b));
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
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = ga(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, c = l.getBasePixel(), d = l.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: b } = this._getSharedOptions(n, s);
    for (let _ = n; _ < n + a; _++) {
      const m = this.getParsed(_), p = o || kt(m[l.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(_), y = this._calculateBarIndexPixels(_, u), g = (m._stacks || {})[l.axis], f = {
        horizontal: d,
        base: p.base,
        enableBorderRadius: !g || ga(m._custom) || i === g._top || i === g._bottom,
        x: d ? p.head : y.center,
        y: d ? y.center : p.head,
        height: d ? y.size : Math.abs(p.size),
        width: d ? Math.abs(p.size) : y.size
      };
      b && (f.options = h || this.resolveDataElementOptions(_, t[_].active ? "active" : s));
      const x = f.options || t[_].options;
      $c(f, x, g, i), Sc(f, x, u.ratio), this.updateElement(t[_], _, f, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), c = l && l[a.axis], d = (u) => {
      const h = u._parsed.find((_) => _[a.axis] === c), b = h && h[u.vScale.axis];
      if (kt(b) || isNaN(b))
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
      t[ut(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || yc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, c = this.getParsed(t), d = c._custom, u = ga(d);
    let h = c[n.axis], b = 0, _ = a ? this.applyStack(n, c, a) : h, m, p;
    _ !== h && (b = _ - h, _ = h), u && (h = d.barStart, _ = d.barEnd - d.barStart, h !== 0 && ce(h) !== ce(d.barEnd) && (b = 0), b += h);
    const y = !kt(o) && !u ? o : b;
    let g = n.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? m = n.getPixelForValue(b + _) : m = g, p = m - g, Math.abs(p) < i) {
      p = wc(p, n, l) * i, h === l && (g -= p / 2);
      const f = n.getPixelForDecimal(0), x = n.getPixelForDecimal(1), w = Math.min(f, x), C = Math.max(f, x);
      g = Math.max(Math.min(g, C), w), m = g + p, a && !u && (c._stacks[n.axis]._visualValues[s] = n.getValueForPixel(m) - n.getValueForPixel(g));
    }
    if (g === n.getPixelForValue(l)) {
      const f = ce(p) * n.getLineWidthForValue(l) / 2;
      g += f, p -= f;
    }
    return {
      size: p,
      base: g,
      head: m,
      center: m + p / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = ut(s.maxBarThickness, 1 / 0);
    let l, c;
    const d = this._getAxisCount();
    if (n.grouped) {
      const u = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? xc(t, n, s, u * d) : _c(t, n, s, u * d), b = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, _ = this._getAxis().indexOf(ut(b, this.getFirstScaleIdForIndexAxis())), m = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + _;
      l = h.start + h.chunk * m + h.chunk / 2, c = Math.min(i, h.chunk * h.ratio);
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
function Ac(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Bt) {
    const l = e, c = l + t, d = Math.cos(l), u = Math.sin(l), h = Math.cos(c), b = Math.sin(c), _ = (x, w, C) => Cn(x, l, c, !0) ? 1 : Math.max(w, w * n, C, C * n), m = (x, w, C) => Cn(x, l, c, !0) ? -1 : Math.min(w, w * n, C, C * n), p = _(0, d, h), y = _(zt, u, b), g = m(Ct, d, h), f = m(Ct + zt, u, b);
    a = (p - g) / 2, s = (y - f) / 2, o = -(p + g) / 2, i = -(y + f) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Tc extends aa {
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
      if (_t(a[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +We(a[d], c);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return pe(this.options.rotation - 90);
  }
  _getCircumference() {
    return pe(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Bt, n = -Bt;
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), c = Math.min(Fl(this.options.cutout, l), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: b, ratioY: _, offsetX: m, offsetY: p } = Ac(h, u, c), y = (a.width - i) / b, g = (a.height - i) / _, f = Math.max(Math.min(y, g) / 2, 0), x = Ko(this.options.radius, f), w = Math.max(x * c, 0), C = (x - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = m * x, this.offsetY = p * x, s.total = this.calculateTotal(), this.outerRadius = x - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Bt);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, d = i.options.animation, u = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, b = o && d.animateScale, _ = b ? 0 : this.innerRadius, m = b ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: y } = this._getSharedOptions(n, s);
    let g = this._getRotation(), f;
    for (f = 0; f < n; ++f)
      g += this._circumference(f, o);
    for (f = n; f < n + a; ++f) {
      const x = this._circumference(f, o), w = t[f], C = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + x,
        circumference: x,
        outerRadius: m,
        innerRadius: _
      };
      y && (C.options = p || this.resolveDataElementOptions(f, w.active ? "active" : s)), g += x, this.updateElement(w, f, C, s);
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
    return n > 0 && !isNaN(t) ? Bt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = Wa(n._parsed[t], a.options.locale);
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
    return Math.max(ut(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Bc extends aa {
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
    let { start: l, count: c } = Jl(n, s, i);
    this._drawStart = l, this._drawCount = c, tr(n) && (l = 0, c = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(s, l, c, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(n, s), b = i.axis, _ = l.axis, { spanGaps: m, segment: p } = this.options, y = wn(m) ? m : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || s === "none", f = n + a, x = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let C = 0; C < x; ++C) {
      const S = t[C], $ = g ? S : {};
      if (C < n || C >= f) {
        $.skip = !0;
        continue;
      }
      const M = this.getParsed(C), L = kt(M[_]), T = $[b] = i.getPixelForValue(M[b], C), B = $[_] = o || L ? l.getBasePixel() : l.getPixelForValue(c ? this.applyStack(l, M, c) : M[_], C);
      $.skip = isNaN(T) || isNaN(B) || L, $.stop = C > 0 && Math.abs(M[b] - w[b]) > y, p && ($.parsed = M, $.raw = d.data[C]), h && ($.options = u || this.resolveDataElementOptions(C, S.active ? "active" : s)), g || this.updateElement(S, C, $, s), w = M;
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
class Lc extends Tc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Ie() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Qa {
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
    Object.assign(Qa.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Ie();
  }
  parse() {
    return Ie();
  }
  format() {
    return Ie();
  }
  add() {
    return Ie();
  }
  diff() {
    return Ie();
  }
  startOf() {
    return Ie();
  }
  endOf() {
    return Ie();
  }
}
var Fc = {
  _date: Qa
};
function Ec(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const d = l._reversePixels ? Ul : Ve;
    if (a) {
      if (s._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const b = d(o, t, n - h), _ = d(o, t, n + h);
          return {
            lo: b.lo,
            hi: _.hi
          };
        }
      }
    } else {
      const u = d(o, t, n);
      if (c) {
        const { vScale: h } = s._cachedMeta, { _parsed: b } = e, _ = b.slice(0, u.lo + 1).reverse().findIndex((p) => !kt(p[h.axis]));
        u.lo -= Math.max(0, _);
        const m = b.slice(u.hi).findIndex((p) => !kt(p[h.axis]));
        u.hi += Math.max(0, m);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function sa(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, c = o.length; l < c; ++l) {
    const { index: d, data: u } = o[l], { lo: h, hi: b } = Ec(o[l], t, i, s);
    for (let _ = h; _ <= b; ++_) {
      const m = u[_];
      m.skip || a(m, d, _);
    }
  }
}
function Pc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function pa(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || sa(e, n, t, function(l, c, d) {
    !s && !$n(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function Ic(e, t, n, a) {
  let s = [];
  function o(i, l, c) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Xo(i, {
      x: t.x,
      y: t.y
    });
    Cn(h, d, u) && s.push({
      element: i,
      datasetIndex: l,
      index: c
    });
  }
  return sa(e, n, t, o), s;
}
function Rc(e, t, n, a, s, o) {
  let i = [];
  const l = Pc(n);
  let c = Number.POSITIVE_INFINITY;
  function d(u, h, b) {
    const _ = u.inRange(t.x, t.y, s);
    if (a && !_)
      return;
    const m = u.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(m)) && !_)
      return;
    const y = l(t, m);
    y < c ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: b
      }
    ], c = y) : y === c && i.push({
      element: u,
      datasetIndex: h,
      index: b
    });
  }
  return sa(e, n, t, d), i;
}
function ma(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Ic(e, t, n, s) : Rc(e, t, n, a, s, o);
}
function zs(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return sa(e, n, t, (c, d, u) => {
    c[i] && c[i](t[n], s) && (o.push({
      element: c,
      datasetIndex: d,
      index: u
    }), l = l || c.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var Oc = {
  modes: {
    index(e, t, n, a) {
      const s = Oe(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? pa(e, s, o, a, i) : ma(e, s, o, !1, a, i), c = [];
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
      const s = Oe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? pa(e, s, o, a, i) : ma(e, s, o, !1, a, i);
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
      const s = Oe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return pa(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = Oe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return ma(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = Oe(t, e);
      return zs(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = Oe(t, e);
      return zs(e, s, "y", n.intersect, a);
    }
  }
};
const gi = [
  "left",
  "top",
  "right",
  "bottom"
];
function nn(e, t) {
  return e.filter((n) => n.pos === t);
}
function Vs(e, t) {
  return e.filter((n) => gi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function an(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function zc(e) {
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
function Vc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !gi.includes(s))
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
function Nc(e, t) {
  const n = Vc(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: c } = l.box, d = n[l.stack], u = d && l.stackWeight / d.weight;
    l.horizontal ? (l.width = u ? u * a : c && t.availableWidth, l.height = s) : (l.width = a, l.height = u ? u * s : c && t.availableHeight);
  }
  return n;
}
function jc(e) {
  const t = zc(e), n = an(t.filter((d) => d.box.fullSize), !0), a = an(nn(t, "left"), !0), s = an(nn(t, "right")), o = an(nn(t, "top"), !0), i = an(nn(t, "bottom")), l = Vs(t, "x"), c = Vs(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(c).concat(i).concat(l),
    chartArea: nn(t, "chartArea"),
    vertical: a.concat(s).concat(c),
    horizontal: o.concat(i).concat(l)
  };
}
function Ns(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function pi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Wc(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!_t(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && pi(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - Ns(i, e, "left", "right")), c = Math.max(0, t.outerHeight - Ns(i, e, "top", "bottom")), d = l !== e.w, u = c !== e.h;
  return e.w = l, e.h = c, n.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Hc(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Yc(e, t) {
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
function hn(e, t, n, a) {
  const s = [];
  let o, i, l, c, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    l = e[o], c = l.box, c.update(l.width || t.w, l.height || t.h, Yc(l.horizontal, t));
    const { same: h, other: b } = Wc(t, n, l, a);
    d |= h && s.length, u = u || b, c.fullSize || s.push(l);
  }
  return d && hn(s, t, n, a) || u;
}
function In(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function js(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const c = l.box, d = a[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / d.weight || 1;
    if (l.horizontal) {
      const h = t.w * u, b = d.size || c.height;
      kn(d.start) && (i = d.start), c.fullSize ? In(c, s.left, i, n.outerWidth - s.right - s.left, b) : In(c, t.left + d.placed, i, h, b), d.start = i, d.placed += h, i = c.bottom;
    } else {
      const h = t.h * u, b = d.size || c.width;
      kn(d.start) && (o = d.start), c.fullSize ? In(c, o, s.top, b, n.outerHeight - s.bottom - s.top) : In(c, o, t.top + d.placed, b, h), d.start = o, d.placed += h, o = c.right;
    }
  }
  t.x = o, t.y = i;
}
var te = {
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
    const s = ne(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = jc(e.boxes), c = l.vertical, d = l.horizontal;
    wt(e.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const u = c.reduce((p, y) => y.box.options && y.box.options.display === !1 ? p : p + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), b = Object.assign({}, s);
    pi(b, ne(a));
    const _ = Object.assign({
      maxPadding: b,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), m = Nc(c.concat(d), h);
    hn(l.fullSize, _, h, m), hn(c, _, h, m), hn(d, _, h, m) && hn(c, _, h, m), Hc(_), js(l.leftAndTop, _, h, m), _.x += _.w, _.y += _.h, js(l.rightAndBottom, _, h, m), e.chartArea = {
      left: _.left,
      top: _.top,
      right: _.left + _.w,
      bottom: _.top + _.h,
      height: _.h,
      width: _.w
    }, wt(l.chartArea, (p) => {
      const y = p.box;
      Object.assign(y, e.chartArea), y.update(_.w, _.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class mi {
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
class Kc extends mi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Hn = "$chartjs", qc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ws = (e) => e === null || e === "";
function Uc(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[Hn] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Ws(s)) {
    const o = Ms(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Ws(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ms(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const bi = Wr ? {
  passive: !0
} : !1;
function Xc(e, t, n) {
  e && e.addEventListener(t, n, bi);
}
function Gc(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, bi);
}
function Zc(e, t) {
  const n = qc[e.type] || e.type, { x: a, y: s } = Oe(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function ta(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function Qc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ta(l.addedNodes, a), i = i && !ta(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Jc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ta(l.removedNodes, a), i = i && !ta(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Sn = /* @__PURE__ */ new Map();
let Hs = 0;
function vi() {
  const e = window.devicePixelRatio;
  e !== Hs && (Hs = e, Sn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function td(e, t) {
  Sn.size || window.addEventListener("resize", vi), Sn.set(e, t);
}
function ed(e) {
  Sn.delete(e), Sn.size || window.removeEventListener("resize", vi);
}
function nd(e, t, n) {
  const a = e.canvas, s = a && Za(a);
  if (!s)
    return;
  const o = Jo((l, c) => {
    const d = s.clientWidth;
    n(l, c), d < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const c = l[0], d = c.contentRect.width, u = c.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(s), td(e, o), i;
}
function ba(e, t, n) {
  n && n.disconnect(), t === "resize" && ed(e);
}
function ad(e, t, n) {
  const a = e.canvas, s = Jo((o) => {
    e.ctx !== null && n(Zc(o, e));
  }, e);
  return Xc(a, t, s), s;
}
class sd extends mi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Uc(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Hn])
      return !1;
    const a = n[Hn].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      kt(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[Hn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: Qc,
      detach: Jc,
      resize: nd
    }[n] || ad;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: ba,
      detach: ba,
      resize: ba
    }[n] || Gc)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return jr(t, n, a, s);
  }
  isAttached(t) {
    const n = t && Za(t);
    return !!(n && n.isConnected);
  }
}
function od(e) {
  return !Ga() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Kc : sd;
}
let be = class {
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
    return wn(this.x) && wn(this.y);
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
function id(e, t) {
  const n = e.options.ticks, a = ld(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? cd(t) : [], i = o.length, l = o[0], c = o[i - 1], d = [];
  if (i > s)
    return dd(t, d, o, i / s), d;
  const u = rd(o, t, s);
  if (i > 0) {
    let h, b;
    const _ = i > 1 ? Math.round((c - l) / (i - 1)) : null;
    for (Rn(t, d, u, kt(_) ? 0 : l - _, l), h = 0, b = i - 1; h < b; h++)
      Rn(t, d, u, o[h], o[h + 1]);
    return Rn(t, d, u, c, kt(_) ? t.length : c + _), d;
  }
  return Rn(t, d, u), d;
}
function ld(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function rd(e, t, n) {
  const a = ud(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = Nl(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const c = o[i];
    if (c > s)
      return c;
  }
  return Math.max(s, 1);
}
function cd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function dd(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function Rn(e, t, n, a, s) {
  const o = ut(a, 0), i = Math.min(ut(s, e.length), e.length);
  let l = 0, c, d, u;
  for (n = Math.ceil(n), s && (c = s - a, n = c / Math.floor(c / n)), u = o; u < 0; )
    l++, u = Math.round(o + l * n);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), l++, u = Math.round(o + l * n));
}
function ud(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const hd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ys = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Ks = (e, t) => Math.min(t || e, e);
function qs(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function fd(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let c = e.getPixelForTick(s), d;
  if (!(n && (a === 1 ? d = Math.max(c - o, i - c) : t === 0 ? d = (e.getPixelForTick(1) - c) / 2 : d = (c - e.getPixelForTick(s - 1)) / 2, c += s < t ? d : -d, c < o - l || c > i + l)))
    return c;
}
function gd(e, t) {
  wt(e, (n) => {
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
function Us(e, t) {
  if (!e.display)
    return 0;
  const n = Ht(e.font, t), a = ne(e.padding);
  return (Ot(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function pd(e, t) {
  return Ye(e, {
    scale: t,
    type: "scale"
  });
}
function md(e, t, n) {
  return Ye(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function bd(e, t, n) {
  let a = Na(e);
  return (n && t !== "right" || !n && t === "right") && (a = hd(a)), a;
}
function vd(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: c } = e, { chartArea: d, scales: u } = c;
  let h = 0, b, _, m;
  const p = i - s, y = l - o;
  if (e.isHorizontal()) {
    if (_ = jt(a, o, l), _t(n)) {
      const g = Object.keys(n)[0], f = n[g];
      m = u[g].getPixelForValue(f) + p - t;
    } else n === "center" ? m = (d.bottom + d.top) / 2 + p - t : m = Ys(e, n, t);
    b = l - o;
  } else {
    if (_t(n)) {
      const g = Object.keys(n)[0], f = n[g];
      _ = u[g].getPixelForValue(f) - y + t;
    } else n === "center" ? _ = (d.left + d.right) / 2 - y + t : _ = Ys(e, n, t);
    m = jt(a, i, s), h = n === "left" ? -zt : zt;
  }
  return {
    titleX: _,
    titleY: m,
    maxWidth: b,
    rotation: h
  };
}
class tn extends be {
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
    return t = ie(t, Number.POSITIVE_INFINITY), n = ie(n, Number.NEGATIVE_INFINITY), a = ie(a, Number.POSITIVE_INFINITY), s = ie(s, Number.NEGATIVE_INFINITY), {
      min: ie(t, a),
      max: ie(n, s),
      minDefined: ee(t),
      maxDefined: ee(n)
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
      min: ie(n, ie(a, n)),
      max: ie(a, ie(n, a))
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = _r(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = l < this.ticks.length;
    this._convertTicksToLabels(c ? qs(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = id(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = Dt(n.callback, [
        o.value,
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
    const t = this.options, n = t.ticks, a = Ks(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, c, d;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, b = u.highest.height, _ = Wt(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : _ / (a - 1), h + 6 > l && (l = _ / (a - (t.offset ? 0.5 : 1)), c = this.maxHeight - sn(t.grid) - n.padding - Us(t.title, this.chart.options.font), d = Math.sqrt(h * h + b * b), i = Yl(Math.min(Math.asin(Wt((u.highest.height + 6) / l, -1, 1)), Math.asin(Wt(c / d, -1, 1)) - Math.asin(Wt(b / d, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
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
      const c = Us(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = sn(o) + c) : (t.height = this.maxHeight, t.width = sn(o) + c), a.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: b } = this._getLabelSizes(), _ = a.padding * 2, m = pe(this.labelRotation), p = Math.cos(m), y = Math.sin(m);
        if (l) {
          const g = a.mirror ? 0 : y * h.width + p * b.height;
          t.height = Math.min(this.maxHeight, t.height + g + _);
        } else {
          const g = a.mirror ? 0 : p * h.width + y * b.height;
          t.width = Math.min(this.maxWidth, t.width + g + _);
        }
        this._calculatePadding(d, u, y, p);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, c = this.labelRotation !== 0, d = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let b = 0, _ = 0;
      c ? d ? (b = s * t.width, _ = a * n.height) : (b = a * t.height, _ = s * n.width) : o === "start" ? _ = n.width : o === "end" ? b = t.width : o !== "inner" && (b = t.width / 2, _ = n.width / 2), this.paddingLeft = Math.max((b - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((_ - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = n.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = n.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
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
      n < a.length && (a = qs(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], c = Math.floor(n / Ks(n, a));
    let d = 0, u = 0, h, b, _, m, p, y, g, f, x, w, C;
    for (h = 0; h < n; h += c) {
      if (m = t[h].label, p = this._resolveTickFontOptions(h), s.font = y = p.string, g = o[y] = o[y] || {
        data: {},
        gc: []
      }, f = p.lineHeight, x = w = 0, !kt(m) && !Ot(m))
        x = xs(s, g.data, g.gc, x, m), w = f;
      else if (Ot(m))
        for (b = 0, _ = m.length; b < _; ++b)
          C = m[b], !kt(C) && !Ot(C) && (x = xs(s, g.data, g.gc, x, C), w += f);
      i.push(x), l.push(w), d = Math.max(x, d), u = Math.max(w, u);
    }
    gd(o, n);
    const S = i.indexOf(d), $ = l.indexOf(u), M = (L) => ({
      width: i[L] || 0,
      height: l[L] || 0
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
    return ql(this._alignToPixels ? Pe(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = md(this.getContext(), t, a));
    }
    return this.$context || (this.$context = pd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = pe(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, c = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? c * a > l * s ? l / a : c / s : c * s < l * a ? c / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, c = o.offset, d = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), b = sn(o), _ = [], m = l.setContext(this.getContext()), p = m.display ? m.width : 0, y = p / 2, g = function(W) {
      return Pe(a, W, p);
    };
    let f, x, w, C, S, $, M, L, T, B, E, P;
    if (i === "top")
      f = g(this.bottom), $ = this.bottom - b, L = f - y, B = g(t.top) + y, P = t.bottom;
    else if (i === "bottom")
      f = g(this.top), B = t.top, P = g(t.bottom) - y, $ = f + y, L = this.top + b;
    else if (i === "left")
      f = g(this.right), S = this.right - b, M = f - y, T = g(t.left) + y, E = t.right;
    else if (i === "right")
      f = g(this.left), T = t.left, E = g(t.right) - y, S = f + y, M = this.left + b;
    else if (n === "x") {
      if (i === "center")
        f = g((t.top + t.bottom) / 2 + 0.5);
      else if (_t(i)) {
        const W = Object.keys(i)[0], J = i[W];
        f = g(this.chart.scales[W].getPixelForValue(J));
      }
      B = t.top, P = t.bottom, $ = f + y, L = $ + b;
    } else if (n === "y") {
      if (i === "center")
        f = g((t.left + t.right) / 2);
      else if (_t(i)) {
        const W = Object.keys(i)[0], J = i[W];
        f = g(this.chart.scales[W].getPixelForValue(J));
      }
      S = f - y, M = S - b, T = t.left, E = t.right;
    }
    const N = ut(s.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / N));
    for (x = 0; x < h; x += Y) {
      const W = this.getContext(x), J = o.setContext(W), tt = l.setContext(W), lt = J.lineWidth, vt = J.color, pt = tt.dash || [], ct = tt.dashOffset, Mt = J.tickWidth, st = J.tickColor, Et = J.tickBorderDash || [], At = J.tickBorderDashOffset;
      w = fd(this, x, c), w !== void 0 && (C = Pe(a, w, lt), d ? S = M = T = E = C : $ = L = B = P = C, _.push({
        tx1: S,
        ty1: $,
        tx2: M,
        ty2: L,
        x1: T,
        y1: B,
        x2: E,
        y2: P,
        width: lt,
        color: vt,
        borderDash: pt,
        borderDashOffset: ct,
        tickWidth: Mt,
        tickColor: st,
        tickBorderDash: Et,
        tickBorderDashOffset: At
      }));
    }
    return this._ticksLength = h, this._borderValue = f, _;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: c, crossAlign: d, padding: u, mirror: h } = o, b = sn(a.grid), _ = b + u, m = h ? -u : _, p = -pe(this.labelRotation), y = [];
    let g, f, x, w, C, S, $, M, L, T, B, E, P = "middle";
    if (s === "top")
      S = this.bottom - m, $ = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      S = this.top + m, $ = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const Y = this._getYAxisLabelAlignment(b);
      $ = Y.textAlign, C = Y.x;
    } else if (s === "right") {
      const Y = this._getYAxisLabelAlignment(b);
      $ = Y.textAlign, C = Y.x;
    } else if (n === "x") {
      if (s === "center")
        S = (t.top + t.bottom) / 2 + _;
      else if (_t(s)) {
        const Y = Object.keys(s)[0], W = s[Y];
        S = this.chart.scales[Y].getPixelForValue(W) + _;
      }
      $ = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        C = (t.left + t.right) / 2 - _;
      else if (_t(s)) {
        const Y = Object.keys(s)[0], W = s[Y];
        C = this.chart.scales[Y].getPixelForValue(W);
      }
      $ = this._getYAxisLabelAlignment(b).textAlign;
    }
    n === "y" && (c === "start" ? P = "top" : c === "end" && (P = "bottom"));
    const N = this._getLabelSizes();
    for (g = 0, f = l.length; g < f; ++g) {
      x = l[g], w = x.label;
      const Y = o.setContext(this.getContext(g));
      M = this.getPixelForTick(g) + o.labelOffset, L = this._resolveTickFontOptions(g), T = L.lineHeight, B = Ot(w) ? w.length : 1;
      const W = B / 2, J = Y.color, tt = Y.textStrokeColor, lt = Y.textStrokeWidth;
      let vt = $;
      i ? (C = M, $ === "inner" && (g === f - 1 ? vt = this.options.reverse ? "left" : "right" : g === 0 ? vt = this.options.reverse ? "right" : "left" : vt = "center"), s === "top" ? d === "near" || p !== 0 ? E = -B * T + T / 2 : d === "center" ? E = -N.highest.height / 2 - W * T + T : E = -N.highest.height + T / 2 : d === "near" || p !== 0 ? E = T / 2 : d === "center" ? E = N.highest.height / 2 - W * T : E = N.highest.height - B * T, h && (E *= -1), p !== 0 && !Y.showLabelBackdrop && (C += T / 2 * Math.sin(p))) : (S = M, E = (1 - B) * T / 2);
      let pt;
      if (Y.showLabelBackdrop) {
        const ct = ne(Y.backdropPadding), Mt = N.heights[g], st = N.widths[g];
        let Et = E - ct.top, At = 0 - ct.left;
        switch (P) {
          case "middle":
            Et -= Mt / 2;
            break;
          case "bottom":
            Et -= Mt;
            break;
        }
        switch ($) {
          case "center":
            At -= st / 2;
            break;
          case "right":
            At -= st;
            break;
          case "inner":
            g === f - 1 ? At -= st : g > 0 && (At -= st / 2);
            break;
        }
        pt = {
          left: At,
          top: Et,
          width: st + ct.width,
          height: Mt + ct.height,
          color: Y.backdropColor
        };
      }
      y.push({
        label: w,
        font: L,
        textOffset: E,
        options: {
          rotation: p,
          color: J,
          strokeColor: tt,
          strokeWidth: lt,
          textAlign: vt,
          textBaseline: P,
          translation: [
            C,
            S
          ],
          backdrop: pt
        }
      });
    }
    return y;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-pe(this.labelRotation))
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
    let d, u, h, b;
    this.isHorizontal() ? (d = Pe(t, this.left, i) - i / 2, u = Pe(t, this.right, l) + l / 2, h = b = c) : (h = Pe(t, this.top, i) - i / 2, b = Pe(t, this.bottom, l) + l / 2, d = u = c), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(d, h), n.lineTo(u, b), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && Ha(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, c = i.font, d = i.label, u = i.textOffset;
      Mn(a, d, 0, u, c, l);
    }
    s && Ya(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Ht(a.font), i = ne(a.padding), l = a.align;
    let c = o.lineHeight / 2;
    n === "bottom" || n === "center" || _t(n) ? (c += i.bottom, Ot(a.text) && (c += o.lineHeight * (a.text.length - 1))) : c += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: b } = vd(this, c, n, l);
    Mn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: b,
      textAlign: bd(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = ut(t.grid && t.grid.z, -1), s = ut(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== tn.prototype.draw ? [
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
    return Ht(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class On {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    xd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, yd(t, i, a), this.override && Ft.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in Ft[s] && (delete Ft[s][a], this.override && delete He[a]);
  }
}
function yd(e, t, n) {
  const a = xn(/* @__PURE__ */ Object.create(null), [
    n ? Ft.get(n) : {},
    Ft.get(t),
    e.defaults
  ]);
  Ft.set(t, a), e.defaultRoutes && _d(t, e.defaultRoutes), e.descriptors && Ft.describe(t, e.descriptors);
}
function _d(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), c = i.join(".");
    Ft.route(o, s, c, l);
  });
}
function xd(e) {
  return "id" in e && "defaults" in e;
}
class kd {
  constructor() {
    this.controllers = new On(aa, "datasets", !0), this.elements = new On(be, "elements"), this.plugins = new On(Object, "plugins"), this.scales = new On(tn, "scales"), this._typedRegistries = [
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
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : wt(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const s = za(t);
    Dt(a["before" + s], [], a), n[t](a), Dt(a["after" + s], [], a);
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
var re = /* @__PURE__ */ new kd();
class wd {
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
      if (Dt(l, c, i) === !1 && s.cancelable)
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
    const a = t && t.config, s = ut(a.options && a.options.plugins, {}), o = Cd(a);
    return s === !1 && !n ? [] : Md(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((c) => l.plugin.id === c.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function Cd(e) {
  const t = {}, n = [], a = Object.keys(re.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(re.getPlugin(a[o]));
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
function $d(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Md(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const c = l.id, d = $d(a[c], s);
    d !== null && o.push({
      plugin: l,
      options: Sd(e.config, {
        plugin: l,
        local: n[c]
      }, d, i)
    });
  }
  return o;
}
function Sd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ba(e, t) {
  const n = Ft.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Dd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Ad(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Xs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Td(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function La(e, ...t) {
  if (Xs(e))
    return e;
  for (const n of t) {
    const a = n.axis || Td(n.position) || e.length > 1 && Xs(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Gs(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Bd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return Gs(e, "x", n[0]) || Gs(e, "y", n[0]);
  }
  return {};
}
function Ld(e, t) {
  const n = He[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ba(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!_t(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const c = La(i, l, Bd(i, e), Ft.scales[l.type]), d = Ad(c, s), u = n.scales || {};
    o[i] = pn(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      l,
      u[c],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, c = i.indexAxis || Ba(l, t), u = (He[l] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const b = Dd(h, c), _ = i[b + "AxisID"] || b;
      o[_] = o[_] || /* @__PURE__ */ Object.create(null), pn(o[_], [
        {
          axis: b
        },
        a[_],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    pn(l, [
      Ft.scales[l.type],
      Ft.scale
    ]);
  }), o;
}
function yi(e) {
  const t = e.options || (e.options = {});
  t.plugins = ut(t.plugins, {}), t.scales = Ld(e, t);
}
function _i(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Fd(e) {
  return e = e || {}, e.data = _i(e.data), yi(e), e;
}
const Zs = /* @__PURE__ */ new Map(), xi = /* @__PURE__ */ new Set();
function zn(e, t) {
  let n = Zs.get(e);
  return n || (n = t(), Zs.set(e, n), xi.add(n)), n;
}
const on = (e, t, n) => {
  const a = We(t, n);
  a !== void 0 && e.add(a);
};
class Ed {
  constructor(t) {
    this._config = Fd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    return zn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return zn(`${t}.transition.${n}`, () => [
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
    return zn(`${t}-${n}`, () => [
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
    return zn(`${a}-plugin-${n}`, () => [
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
      t && (c.add(t), u.forEach((h) => on(c, t, h))), u.forEach((h) => on(c, s, h)), u.forEach((h) => on(c, He[o] || {}, h)), u.forEach((h) => on(c, Ft, h)), u.forEach((h) => on(c, Aa, h));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), xi.has(n) && i.set(n, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      He[n] || {},
      Ft.datasets[n] || {},
      {
        type: n
      },
      Ft,
      Aa
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Qs(this._resolverCache, t, s);
    let c = i;
    if (Id(i, n)) {
      o.$shared = !1, a = Ae(a) ? a() : a;
      const d = this.createResolver(t, a, l);
      c = Qe(i, a, d);
    }
    for (const d of n)
      o[d] = c[d];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = Qs(this._resolverCache, t, a);
    return _t(n) ? Qe(o, n, void 0, s) : o;
  }
}
function Qs(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: qa(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const Pd = (e) => _t(e) && Object.getOwnPropertyNames(e).some((t) => Ae(e[t]));
function Id(e, t) {
  const { isScriptable: n, isIndexable: a } = ai(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Ae(l) || Pd(l)) || i && Ot(l))
      return !0;
  }
  return !1;
}
var Rd = "4.5.1";
const Od = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Js(e, t) {
  return e === "top" || e === "bottom" || Od.indexOf(e) === -1 && t === "x";
}
function to(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function eo(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Dt(n && n.onComplete, [
    e
  ], t);
}
function zd(e) {
  const t = e.chart, n = t.options.animation;
  Dt(n && n.onProgress, [
    e
  ], t);
}
function ki(e) {
  return Ga() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Yn = {}, no = (e) => {
  const t = ki(e);
  return Object.values(Yn).filter((n) => n.canvas === t).pop();
};
function Vd(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function Nd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Te = class {
  static defaults = Ft;
  static instances = Yn;
  static overrides = He;
  static registry = re;
  static version = Rd;
  static getChart = no;
  static register(...t) {
    re.add(...t), ao();
  }
  static unregister(...t) {
    re.remove(...t), ao();
  }
  constructor(t, n) {
    const a = this.config = new Ed(n), s = ki(t), o = no(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || od(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), c = l && l.canvas, d = c && c.height, u = c && c.width;
    if (this.id = Ll(), this.ctx = l, this.canvas = c, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new wd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Zl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Yn[this.id] = this, !l || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    he.listen(this, "complete", eo), he.listen(this, "progress", zd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return kt(t) ? n && o ? o : s ? a / s : null : t;
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
    return re;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : $s(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return ks(this.canvas, this.ctx), this;
  }
  stop() {
    return he.stop(this), this;
  }
  resize(t, n) {
    he.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, $s(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Dt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    wt(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], c = La(i, l), d = c === "r", u = c === "x";
      return {
        options: l,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), wt(o, (i) => {
      const l = i.options, c = l.id, d = La(c, l), u = ut(l.type, i.dtype);
      (l.position === void 0 || Js(l.position, d) !== Js(i.dposition)) && (l.position = i.dposition), s[c] = !0;
      let h = null;
      if (c in a && a[c].type === u)
        h = a[c];
      else {
        const b = re.getScale(u);
        h = new b({
          id: c,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), wt(s, (i, l) => {
      i || delete a[l];
    }), wt(a, (i) => {
      te.configure(this, i, i.options), te.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(to("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Ba(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const c = re.getController(l), { datasetElementType: d, dataElementType: u } = Ft.datasets[l];
        Object.assign(c, {
          dataElementType: re.getElement(u),
          datasetElementType: d && re.getElement(d)
        }), i.controller = new c(this, a), t.push(i.controller);
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
      const { controller: h } = this.getDatasetMeta(d), b = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(b), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || wt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(to("z", "_idx"));
    const { _active: l, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    wt(this.scales, (t) => {
      te.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!hs(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      Vd(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!hs(s, a(o)))
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
    te.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], wt(this.boxes, (s) => {
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
        this._updateDataset(n, Ae(t) ? t({
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
    }) !== !1 && (he.has(this) ? this.attached && !he.running(this) && he.start(this) : (this.draw(), eo({
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
    }, s = ac(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && Ha(n, s), t.controller.draw(), s && Ya(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return $n(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = Oc.modes[n];
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
    return this.$context || (this.$context = Ye(null, {
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
    kn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), he.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ks(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Yn[this.id], this.notifyPlugins("afterDestroy");
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
    wt(this.options.events, (o) => a(o, s));
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
    wt(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, wt(this._responsiveListeners, (t, n) => {
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
    !Xn(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
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
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), c = Ol(t), d = Nd(t, this._lastEvent, a, c);
    a && (this._lastEvent = null, Dt(o.onHover, [
      t,
      l,
      this
    ], this), c && Dt(o.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Xn(l, s);
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
function ao() {
  return wt(Te.instances, (e) => e._plugins.invalidate());
}
function jd(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: c } = t, { borderWidth: d, borderJoinStyle: u } = c, h = Math.min(d / i, se(a - n));
  if (e.beginPath(), e.arc(s, o, i - d / 2, a + h / 2, n - h / 2), l > 0) {
    const b = Math.min(d / l, se(a - n));
    e.arc(s, o, l + d / 2, n - b / 2, a + b / 2, !0);
  } else {
    const b = Math.min(d / 2, i * se(a - n));
    if (u === "round")
      e.arc(s, o, b, n - Ct / 2, a + Ct / 2, !0);
    else if (u === "bevel") {
      const _ = 2 * b * b, m = -_ * Math.cos(n + Ct / 2) + s, p = -_ * Math.sin(n + Ct / 2) + o, y = _ * Math.cos(a + Ct / 2) + s, g = _ * Math.sin(a + Ct / 2) + o;
      e.lineTo(m, p), e.lineTo(y, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Wd(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: c } = t;
  let d = s / l;
  e.beginPath(), e.arc(o, i, l, a - d, n + d), c > s ? (d = s / c, e.arc(o, i, c, n + d, a - d, !0)) : e.arc(o, i, s, n + zt, a - zt), e.closePath(), e.clip();
}
function Hd(e) {
  return Ka(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Yd(e, t, n, a) {
  const s = Hd(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (c) => {
    const d = (n - Math.min(o, c)) * a / 2;
    return Wt(c, 0, Math.min(o, d));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Wt(s.innerStart, 0, i),
    innerEnd: Wt(s.innerEnd, 0, i)
  };
}
function qe(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function ea(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: c, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + a + n - d, 0), b = u > 0 ? u + a + n + d : 0;
  let _ = 0;
  const m = s - c;
  if (a) {
    const Y = u > 0 ? u - a : 0, W = h > 0 ? h - a : 0, J = (Y + W) / 2, tt = J !== 0 ? m * J / (J + a) : m;
    _ = (m - tt) / 2;
  }
  const p = Math.max(1e-3, m * h - n / Ct) / h, y = (m - p) / 2, g = c + y + _, f = s - y - _, { outerStart: x, outerEnd: w, innerStart: C, innerEnd: S } = Yd(t, b, h, f - g), $ = h - x, M = h - w, L = g + x / $, T = f - w / M, B = b + C, E = b + S, P = g + C / B, N = f - S / E;
  if (e.beginPath(), o) {
    const Y = (L + T) / 2;
    if (e.arc(i, l, h, L, Y), e.arc(i, l, h, Y, T), w > 0) {
      const lt = qe(M, T, i, l);
      e.arc(lt.x, lt.y, w, T, f + zt);
    }
    const W = qe(E, f, i, l);
    if (e.lineTo(W.x, W.y), S > 0) {
      const lt = qe(E, N, i, l);
      e.arc(lt.x, lt.y, S, f + zt, N + Math.PI);
    }
    const J = (f - S / b + (g + C / b)) / 2;
    if (e.arc(i, l, b, f - S / b, J, !0), e.arc(i, l, b, J, g + C / b, !0), C > 0) {
      const lt = qe(B, P, i, l);
      e.arc(lt.x, lt.y, C, P + Math.PI, g - zt);
    }
    const tt = qe($, g, i, l);
    if (e.lineTo(tt.x, tt.y), x > 0) {
      const lt = qe($, L, i, l);
      e.arc(lt.x, lt.y, x, g - zt, L);
    }
  } else {
    e.moveTo(i, l);
    const Y = Math.cos(L) * h + i, W = Math.sin(L) * h + l;
    e.lineTo(Y, W);
    const J = Math.cos(T) * h + i, tt = Math.sin(T) * h + l;
    e.lineTo(J, tt);
  }
  e.closePath();
}
function Kd(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let c = t.endAngle;
  if (o) {
    ea(e, t, n, a, c, s);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(l) || (c = i + (l % Bt || Bt));
  }
  return ea(e, t, n, a, c, s), e.fill(), c;
}
function qd(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: c } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: b, borderRadius: _ } = c, m = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = b, m ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let p = t.endAngle;
  if (o) {
    ea(e, t, n, a, p, s);
    for (let y = 0; y < o; ++y)
      e.stroke();
    isNaN(l) || (p = i + (l % Bt || Bt));
  }
  m && Wd(e, t, p), c.selfJoin && p - i >= Ct && _ === 0 && u !== "miter" && jd(e, t, p), o || (ea(e, t, n, a, p, s), e.stroke());
}
class Ud extends be {
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
    ], a), { angle: o, distance: i } = Xo(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), b = (this.options.spacing + this.options.borderWidth) / 2, _ = ut(h, c - l), m = Cn(o, l, c) && l !== c, p = _ >= Bt || m, y = $e(i, d + b, u + b);
    return p && y;
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
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Bt ? Math.floor(a / Bt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const c = 1 - Math.sin(Math.min(Ct, a || 0)), d = s * c;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, Kd(t, this, d, o, i), qd(t, this, d, o, i), t.restore();
  }
}
function wi(e, t, n = t) {
  e.lineCap = ut(n.borderCapStyle, t.borderCapStyle), e.setLineDash(ut(n.borderDash, t.borderDash)), e.lineDashOffset = ut(n.borderDashOffset, t.borderDashOffset), e.lineJoin = ut(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ut(n.borderWidth, t.borderWidth), e.strokeStyle = ut(n.borderColor, t.borderColor);
}
function Xd(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Gd(e) {
  return e.stepped ? ur : e.tension || e.cubicInterpolationMode === "monotone" ? hr : Xd;
}
function Ci(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, c = Math.max(s, i), d = Math.min(o, l), u = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: c,
    loop: t.loop,
    ilen: d < c && !u ? a + d - c : d - c
  };
}
function Zd(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: c, ilen: d } = Ci(s, n, a), u = Gd(o);
  let { move: h = !0, reverse: b } = a || {}, _, m, p;
  for (_ = 0; _ <= d; ++_)
    m = s[(l + (b ? d - _ : _)) % i], !m.skip && (h ? (e.moveTo(m.x, m.y), h = !1) : u(e, p, m, b, o.stepped), p = m);
  return c && (m = s[(l + (b ? d : 0)) % i], u(e, p, m, b, o.stepped)), !!c;
}
function Qd(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Ci(s, n, a), { move: c = !0, reverse: d } = a || {};
  let u = 0, h = 0, b, _, m, p, y, g;
  const f = (w) => (i + (d ? l - w : w)) % o, x = () => {
    p !== y && (e.lineTo(u, y), e.lineTo(u, p), e.lineTo(u, g));
  };
  for (c && (_ = s[f(0)], e.moveTo(_.x, _.y)), b = 0; b <= l; ++b) {
    if (_ = s[f(b)], _.skip)
      continue;
    const w = _.x, C = _.y, S = w | 0;
    S === m ? (C < p ? p = C : C > y && (y = C), u = (h * u + w) / ++h) : (x(), e.lineTo(w, C), m = S, h = 0, p = y = C), g = C;
  }
  x();
}
function Fa(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Qd : Zd;
}
function Jd(e) {
  return e.stepped ? Hr : e.tension || e.cubicInterpolationMode === "monotone" ? Yr : ze;
}
function tu(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), wi(e, t.options), e.stroke(s);
}
function eu(e, t, n, a) {
  const { segments: s, options: o } = t, i = Fa(t);
  for (const l of s)
    wi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const nu = typeof Path2D == "function";
function au(e, t, n, a) {
  nu && !t.options.segment ? tu(e, t, n, a) : eu(e, t, n, a);
}
class su extends be {
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
      Ir(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Jr(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = Gr(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], c = Jd(a);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: b } = i[d], _ = o[h], m = o[b];
      if (_ === m) {
        l.push(_);
        continue;
      }
      const p = Math.abs((s - _[n]) / (m[n] - _[n])), y = c(_, m, p, a.stepped);
      y[n] = t[n], l.push(y);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Fa(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Fa(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), au(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function so(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class ou extends be {
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
    return so(this, t, "x", n);
  }
  inYRange(t, n) {
    return so(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !$n(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ta(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function $i(e, t) {
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
function Se(e, t, n, a) {
  return e ? 0 : Wt(t, n, a);
}
function iu(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = ni(a);
  return {
    t: Se(s.top, o.top, 0, n),
    r: Se(s.right, o.right, 0, t),
    b: Se(s.bottom, o.bottom, 0, n),
    l: Se(s.left, o.left, 0, t)
  };
}
function lu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = Ge(s), i = Math.min(t, n), l = e.borderSkipped, c = a || _t(s);
  return {
    topLeft: Se(!c || l.top || l.left, o.topLeft, 0, i),
    topRight: Se(!c || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Se(!c || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Se(!c || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function ru(e) {
  const t = $i(e), n = t.right - t.left, a = t.bottom - t.top, s = iu(e, n / 2, a / 2), o = lu(e, n / 2, a / 2);
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
function va(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && $i(e, a);
  return l && (s || $e(t, l.left, l.right)) && (o || $e(n, l.top, l.bottom));
}
function cu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function du(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ya(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class uu extends be {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = ru(this), l = cu(i.radius) ? Qn : du;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, ya(i, n, o)), t.clip(), l(t, ya(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, ya(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return va(this, t, n, a);
  }
  inXRange(t, n) {
    return va(this, t, null, n);
  }
  inYRange(t, n) {
    return va(this, null, t, n);
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
const oo = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, hu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class io extends be {
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
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, s) => t.sort(a, s, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, s = Ht(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: c } = oo(a, o);
    let d, u;
    n.font = s.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, l, c) + 10) : (u = this.maxHeight, d = this._fitCols(i, s, l, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let b = -1, _ = -u;
    return this.legendItems.forEach((m, p) => {
      const y = a + n / 2 + o.measureText(m.text).width;
      (p === 0 || d[d.length - 1] + y + 2 * l > i) && (h += u, d[d.length - (p > 0 ? 0 : 1)] = 0, _ += u, b++), c[p] = {
        left: 0,
        top: _,
        row: b,
        width: y,
        height: s
      }, d[d.length - 1] += y + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = l, b = 0, _ = 0, m = 0, p = 0;
    return this.legendItems.forEach((y, g) => {
      const { itemWidth: f, itemHeight: x } = fu(a, n, o, y, s);
      g > 0 && _ + x + 2 * l > u && (h += b + l, d.push({
        width: b,
        height: _
      }), m += b + l, p++, b = _ = 0), c[g] = {
        left: m,
        top: _,
        col: p,
        width: f,
        height: x
      }, b = Math.max(b, f), _ += x + l;
    }), h += b, d.push({
      width: b,
      height: _
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = Ze(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, c = jt(a, this.left + s, this.right - this.lineWidths[l]);
      for (const d of n)
        l !== d.row && (l = d.row, c = jt(a, this.left + s, this.right - this.lineWidths[l])), d.top += this.top + t + s, d.left = i.leftForLtr(i.x(c), d.width), c += d.width + s;
    } else {
      let l = 0, c = jt(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const d of n)
        d.col !== l && (l = d.col, c = jt(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), d.top = c, d.left += this.left + s, d.left = i.leftForLtr(i.x(d.left), d.width), c += d.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ha(t, this), this._draw(), Ya(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = Ft.color, c = Ze(t.rtl, this.left, this.width), d = Ht(i.font), { padding: u } = i, h = d.size, b = h / 2;
    let _;
    this.drawTitle(), s.textAlign = c.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = d.string;
    const { boxWidth: m, boxHeight: p, itemHeight: y } = oo(i, h), g = function(S, $, M) {
      if (isNaN(m) || m <= 0 || isNaN(p) || p < 0)
        return;
      s.save();
      const L = ut(M.lineWidth, 1);
      if (s.fillStyle = ut(M.fillStyle, l), s.lineCap = ut(M.lineCap, "butt"), s.lineDashOffset = ut(M.lineDashOffset, 0), s.lineJoin = ut(M.lineJoin, "miter"), s.lineWidth = L, s.strokeStyle = ut(M.strokeStyle, l), s.setLineDash(ut(M.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: M.pointStyle,
          rotation: M.rotation,
          borderWidth: L
        }, B = c.xPlus(S, m / 2), E = $ + b;
        ei(s, T, B, E, i.pointStyleWidth && m);
      } else {
        const T = $ + Math.max((h - p) / 2, 0), B = c.leftForLtr(S, m), E = Ge(M.borderRadius);
        s.beginPath(), Object.values(E).some((P) => P !== 0) ? Qn(s, {
          x: B,
          y: T,
          w: m,
          h: p,
          radius: E
        }) : s.rect(B, T, m, p), s.fill(), L !== 0 && s.stroke();
      }
      s.restore();
    }, f = function(S, $, M) {
      Mn(s, M.text, S, $ + y / 2, d, {
        strikethrough: M.hidden,
        textAlign: c.textAlign(M.textAlign)
      });
    }, x = this.isHorizontal(), w = this._computeTitleHeight();
    x ? _ = {
      x: jt(o, this.left + u, this.right - a[0]),
      y: this.top + u + w,
      line: 0
    } : _ = {
      x: this.left + u,
      y: jt(o, this.top + w + u, this.bottom - n[0].height),
      line: 0
    }, ri(this.ctx, t.textDirection);
    const C = y + u;
    this.legendItems.forEach((S, $) => {
      s.strokeStyle = S.fontColor, s.fillStyle = S.fontColor;
      const M = s.measureText(S.text).width, L = c.textAlign(S.textAlign || (S.textAlign = i.textAlign)), T = m + b + M;
      let B = _.x, E = _.y;
      c.setWidth(this.width), x ? $ > 0 && B + T + u > this.right && (E = _.y += C, _.line++, B = _.x = jt(o, this.left + u, this.right - a[_.line])) : $ > 0 && E + C > this.bottom && (B = _.x = B + n[_.line].width + u, _.line++, E = _.y = jt(o, this.top + w + u, this.bottom - n[_.line].height));
      const P = c.x(B);
      if (g(P, E, S), B = Ql(L, B + m + b, x ? B + T : this.right, t.rtl), f(c.x(B), E, S), x)
        _.x += T + u;
      else if (typeof S.text != "string") {
        const N = d.lineHeight;
        _.y += Mi(S, N) + u;
      } else
        _.y += C;
    }), ci(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Ht(n.font), s = ne(n.padding);
    if (!n.display)
      return;
    const o = Ze(t.rtl, this.left, this.width), i = this.ctx, l = n.position, c = a.size / 2, d = s.top + c;
    let u, h = this.left, b = this.width;
    if (this.isHorizontal())
      b = Math.max(...this.lineWidths), u = this.top + d, h = jt(t.align, h, this.right - b);
    else {
      const m = this.columnSizes.reduce((p, y) => Math.max(p, y.height), 0);
      u = d + jt(t.align, this.top, this.bottom - m - t.labels.padding - this._computeTitleHeight());
    }
    const _ = jt(l, h, h + b);
    i.textAlign = o.textAlign(Na(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Mn(i, n.text, _, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Ht(t.font), a = ne(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if ($e(t, this.left, this.right) && $e(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], $e(t, s.left, s.left + s.width) && $e(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!mu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = hu(s, a);
      s && !o && Dt(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && Dt(n.onHover, [
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
function fu(e, t, n, a, s) {
  const o = gu(a, e, t, n), i = pu(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function gu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function pu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Mi(t, n)), a;
}
function Mi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function mu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Ja = {
  id: "legend",
  _element: io,
  start(e, t, n) {
    const a = e.legend = new io({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    te.configure(e, a, n), te.addBox(e, a);
  },
  stop(e) {
    te.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    te.configure(e, a, n), a.options = n;
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
          const d = c.controller.getStyle(n ? 0 : void 0), u = ne(d.borderWidth);
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
class Si extends be {
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
    const s = Ot(a.text) ? a.text.length : 1;
    this._padding = ne(a.padding);
    const o = s * Ht(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let c = 0, d, u, h;
    return this.isHorizontal() ? (u = jt(l, a, o), h = n + t, d = o - a) : (i.position === "left" ? (u = a + t, h = jt(l, s, n), c = Ct * -0.5) : (u = o - t, h = jt(l, n, s), c = Ct * 0.5), d = s - n), {
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
    const a = Ht(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: c, rotation: d } = this._drawArgs(o);
    Mn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: c,
      rotation: d,
      textAlign: Na(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function bu(e, t) {
  const n = new Si({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  te.configure(e, n, t), te.addBox(e, n), e.titleBlock = n;
}
var Di = {
  id: "title",
  _element: Si,
  start(e, t, n) {
    bu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    te.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    te.configure(e, a, n), a.options = n;
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
const fn = {
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
        const d = c.getCenterPoint(), u = Da(t, d);
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
function le(e, t) {
  return t && (Ot(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function fe(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function vu(e, t) {
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
function lo(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, c = Ht(t.bodyFont), d = Ht(t.titleFont), u = Ht(t.footerFont), h = o.length, b = s.length, _ = a.length, m = ne(t.padding);
  let p = m.height, y = 0, g = a.reduce((w, C) => w + C.before.length + C.lines.length + C.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (p += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const w = t.displayColors ? Math.max(l, c.lineHeight) : c.lineHeight;
    p += _ * w + (g - _) * c.lineHeight + (g - 1) * t.bodySpacing;
  }
  b && (p += t.footerMarginTop + b * u.lineHeight + (b - 1) * t.footerSpacing);
  let f = 0;
  const x = function(w) {
    y = Math.max(y, n.measureText(w).width + f);
  };
  return n.save(), n.font = d.string, wt(e.title, x), n.font = c.string, wt(e.beforeBody.concat(e.afterBody), x), f = t.displayColors ? i + 2 + t.boxPadding : 0, wt(a, (w) => {
    wt(w.before, x), wt(w.lines, x), wt(w.after, x);
  }), f = 0, n.font = u.string, wt(e.footer, x), n.restore(), y += m.width, {
    width: y,
    height: p
  };
}
function yu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function _u(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function xu(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: c } } = e;
  let d = "center";
  return a === "center" ? d = s <= (l + c) / 2 ? "left" : "right" : s <= o / 2 ? d = "left" : s >= i - o / 2 && (d = "right"), _u(d, e, t, n) && (d = "center"), d;
}
function ro(e, t, n) {
  const a = n.yAlign || t.yAlign || yu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || xu(e, t, n, a),
    yAlign: a
  };
}
function ku(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function wu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function co(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: c } = n, d = s + o, { topLeft: u, topRight: h, bottomLeft: b, bottomRight: _ } = Ge(i);
  let m = ku(t, l);
  const p = wu(t, c, d);
  return c === "center" ? l === "left" ? m += d : l === "right" && (m -= d) : l === "left" ? m -= Math.max(u, b) + s : l === "right" && (m += Math.max(h, _) + s), {
    x: Wt(m, 0, a.width - t.width),
    y: Wt(p, 0, a.height - t.height)
  };
}
function Vn(e, t, n) {
  const a = ne(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function uo(e) {
  return le([], fe(e));
}
function Cu(e, t, n) {
  return Ye(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function ho(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Ai = {
  beforeTitle: ue,
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
  afterTitle: ue,
  beforeBody: ue,
  beforeLabel: ue,
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
  afterLabel: ue,
  afterBody: ue,
  beforeFooter: ue,
  footer: ue,
  afterFooter: ue
};
function qt(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Ai[t].call(n, a) : s;
}
class fo extends be {
  static positioners = fn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new ui(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Cu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = qt(a, "beforeTitle", this, t), o = qt(a, "title", this, t), i = qt(a, "afterTitle", this, t);
    let l = [];
    return l = le(l, fe(s)), l = le(l, fe(o)), l = le(l, fe(i)), l;
  }
  getBeforeBody(t, n) {
    return uo(qt(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return wt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = ho(a, o);
      le(i.before, fe(qt(l, "beforeLabel", this, o))), le(i.lines, qt(l, "label", this, o)), le(i.after, fe(qt(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return uo(qt(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = qt(a, "beforeFooter", this, t), o = qt(a, "footer", this, t), i = qt(a, "afterFooter", this, t);
    let l = [];
    return l = le(l, fe(s)), l = le(l, fe(o)), l = le(l, fe(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], c, d;
    for (c = 0, d = n.length; c < d; ++c)
      l.push(vu(this.chart, n[c]));
    return t.filter && (l = l.filter((u, h, b) => t.filter(u, h, b, a))), t.itemSort && (l = l.sort((u, h) => t.itemSort(u, h, a))), wt(l, (u) => {
      const h = ho(t.callbacks, u);
      s.push(qt(h, "labelColor", this, u)), o.push(qt(h, "labelPointStyle", this, u)), i.push(qt(h, "labelTextColor", this, u));
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
      const l = fn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const c = this._size = lo(this, a), d = Object.assign({}, l, c), u = ro(this.chart, a, d), h = co(a, d, u, this.chart);
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: c, topRight: d, bottomLeft: u, bottomRight: h } = Ge(l), { x: b, y: _ } = t, { width: m, height: p } = n;
    let y, g, f, x, w, C;
    return o === "center" ? (w = _ + p / 2, s === "left" ? (y = b, g = y - i, x = w + i, C = w - i) : (y = b + m, g = y + i, x = w - i, C = w + i), f = y) : (s === "left" ? g = b + Math.max(c, u) + i : s === "right" ? g = b + m - Math.max(d, h) - i : g = this.caretX, o === "top" ? (x = _, w = x - i, y = g - i, f = g + i) : (x = _ + p, w = x + i, y = g + i, f = g - i), C = x), {
      x1: y,
      x2: g,
      x3: f,
      y1: x,
      y2: w,
      y3: C
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, c;
    if (o) {
      const d = Ze(a.rtl, this.x, this.width);
      for (t.x = Vn(this, a.titleAlign, a), n.textAlign = d.textAlign(a.titleAlign), n.textBaseline = "middle", i = Ht(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, c = 0; c < o; ++c)
        n.fillText(s[c], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, c + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: c, boxWidth: d } = o, u = Ht(o.bodyFont), h = Vn(this, "left", o), b = s.x(h), _ = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, m = n.y + _;
    if (o.usePointStyle) {
      const p = {
        radius: Math.min(d, c) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, y = s.leftForLtr(b, d) + d / 2, g = m + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ta(t, p, y, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ta(t, p, y, g);
    } else {
      t.lineWidth = _t(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const p = s.leftForLtr(b, d), y = s.leftForLtr(s.xPlus(b, 1), d - 2), g = Ge(i.borderRadius);
      Object.values(g).some((f) => f !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Qn(t, {
        x: p,
        y: m,
        w: d,
        h: c,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Qn(t, {
        x: y,
        y: m + 1,
        w: d - 2,
        h: c - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(p, m, d, c), t.strokeRect(p, m, d, c), t.fillStyle = i.backgroundColor, t.fillRect(y, m + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: c, boxWidth: d, boxPadding: u } = a, h = Ht(a.bodyFont);
    let b = h.lineHeight, _ = 0;
    const m = Ze(a.rtl, this.x, this.width), p = function(M) {
      n.fillText(M, m.x(t.x + _), t.y + b / 2), t.y += b + o;
    }, y = m.textAlign(i);
    let g, f, x, w, C, S, $;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Vn(this, y, a), n.fillStyle = a.bodyColor, wt(this.beforeBody, p), _ = l && y !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, w = 0, S = s.length; w < S; ++w) {
      for (g = s[w], f = this.labelTextColors[w], n.fillStyle = f, wt(g.before, p), x = g.lines, l && x.length && (this._drawColorBox(n, t, w, m, a), b = Math.max(h.lineHeight, c)), C = 0, $ = x.length; C < $; ++C)
        p(x[C]), b = h.lineHeight;
      wt(g.after, p);
    }
    _ = 0, b = h.lineHeight, wt(this.afterBody, p), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const c = Ze(a.rtl, this.x, this.width);
      for (t.x = Vn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = c.textAlign(a.footerAlign), n.textBaseline = "middle", i = Ht(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: c } = t, { width: d, height: u } = a, { topLeft: h, topRight: b, bottomLeft: _, bottomRight: m } = Ge(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, c), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + d - b, c), n.quadraticCurveTo(l + d, c, l + d, c + b), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + d, c + u - m), n.quadraticCurveTo(l + d, c + u, l + d - m, c + u), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + _, c + u), n.quadraticCurveTo(l, c + u, l, c + u - _), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, c + h), n.quadraticCurveTo(l, c, l + h, c), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = fn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = lo(this, t), c = Object.assign({}, i, this._size), d = ro(n, t, c), u = co(t, c, d, n);
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
    const i = ne(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), ri(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), ci(t, n.textDirection), t.restore());
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
    }), o = !Xn(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), c = n || !Xn(i, o) || l;
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
    const { caretX: a, caretY: s, options: o } = this, i = fn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var ts = {
  id: "tooltip",
  _element: fo,
  positioners: fn,
  afterInit(e, t, n) {
    n && (e.tooltip = new fo({
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
    callbacks: Ai
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
const $u = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Mu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return $u(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const Su = (e, t) => e === null ? null : Wt(Math.round(e), 0, t);
function go(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ti extends tn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: go
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
    if (kt(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Mu(a, t, ut(n, t), this._addedLabels), Su(n, a.length - 1);
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
    return go.call(this, t);
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
function Du(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: c, count: d, maxTicks: u, maxDigits: h, includeBounds: b } = e, _ = o || 1, m = u - 1, { min: p, max: y } = t, g = !kt(i), f = !kt(l), x = !kt(d), w = (y - p) / (h + 1);
  let C = gs((y - p) / m / _) * _, S, $, M, L;
  if (C < 1e-14 && !g && !f)
    return [
      {
        value: p
      },
      {
        value: y
      }
    ];
  L = Math.ceil(y / C) - Math.floor(p / C), L > m && (C = gs(L * C / m / _) * _), kt(c) || (S = Math.pow(10, c), C = Math.ceil(C * S) / S), s === "ticks" ? ($ = Math.floor(p / C) * C, M = Math.ceil(y / C) * C) : ($ = p, M = y), g && f && o && Wl((l - i) / o, C / 1e3) ? (L = Math.round(Math.min((l - i) / C, u)), C = (l - i) / L, $ = i, M = l) : x ? ($ = g ? i : $, M = f ? l : M, L = d - 1, C = (M - $) / L) : (L = (M - $) / C, mn(L, Math.round(L), C / 1e3) ? L = Math.round(L) : L = Math.ceil(L));
  const T = Math.max(ps(C), ps($));
  S = Math.pow(10, kt(c) ? T : c), $ = Math.round($ * S) / S, M = Math.round(M * S) / S;
  let B = 0;
  for (g && (b && $ !== i ? (n.push({
    value: i
  }), $ < i && B++, mn(Math.round(($ + B * C) * S) / S, i, po(i, w, e)) && B++) : $ < i && B++); B < L; ++B) {
    const E = Math.round(($ + B * C) * S) / S;
    if (f && E > l)
      break;
    n.push({
      value: E
    });
  }
  return f && b && M !== l ? n.length && mn(n[n.length - 1].value, l, po(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!f || M === l) && n.push({
    value: M
  }), n;
}
function po(e, t, { horizontal: n, minRotation: a }) {
  const s = pe(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Au extends tn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return kt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (c) => s = n ? s : c, l = (c) => o = a ? o : c;
    if (t) {
      const c = ce(s), d = ce(o);
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
    }, o = this._range || this, i = Du(s, o);
    return t.bounds === "ticks" && Hl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return Wa(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Bi extends Au {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ti.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ee(t) ? t : 0, this.max = ee(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = pe(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const oa = {
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
}, Xt = /* @__PURE__ */ Object.keys(oa);
function mo(e, t) {
  return e - t;
}
function bo(e, t) {
  if (kt(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ee(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (wn(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function vo(e, t, n, a) {
  const s = Xt.length;
  for (let o = Xt.indexOf(e); o < s - 1; ++o) {
    const i = oa[Xt[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return Xt[o];
  }
  return Xt[s - 1];
}
function Tu(e, t, n, a, s) {
  for (let o = Xt.length - 1; o >= Xt.indexOf(n); o--) {
    const i = Xt[o];
    if (oa[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return Xt[n ? Xt.indexOf(n) : 0];
}
function Bu(e) {
  for (let t = Xt.indexOf(e) + 1, n = Xt.length; t < n; ++t)
    if (oa[Xt[t]].common)
      return Xt[t];
}
function yo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = Va(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Lu(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, c;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    c = n[l], c >= 0 && (t[c].major = !0);
  return t;
}
function _o(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Lu(e, a, s, n);
}
class xo extends tn {
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
    const a = t.time || (t.time = {}), s = this._adapter = new Fc._date(t.adapters.date);
    s.init(n), pn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : bo(this, t);
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
    (!i || !l) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), s = ee(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = ee(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const o = this.min, i = this.max, l = Xl(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? vo(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Tu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Bu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), _o(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Wt(n, 0, i), a = Wt(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || vo(o.minUnit, n, a, this._getLabelCapacity(n)), l = ut(s.ticks.stepSize, 1), c = i === "week" ? o.isoWeekday : !1, d = wn(c) || c === !0, u = {};
    let h = n, b, _;
    if (d && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, d ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const m = s.ticks.source === "data" && this.getDataTimestamps();
    for (b = h, _ = 0; b < a; b = +t.add(b, l, i), _++)
      yo(u, b, m);
    return (b === a || s.bounds === "ticks" || _ === 1) && yo(u, b, m), Object.keys(u).sort(mo).map((p) => +p);
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
      return Dt(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, c = this._unit, d = this._majorUnit, u = c && l[c], h = d && l[d], b = a[n], _ = d && h && b && b.major;
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = pe(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, _o(this, [
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
      t.push(bo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Zo(t.sort(mo));
  }
}
function Nn(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, c;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = Ve(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: c } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = Ve(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: c } = e[s]);
  const d = i - o;
  return d ? l + (c - l) * (t - o) / d : l;
}
class AC extends xo {
  static id = "timeseries";
  static defaults = xo.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = Nn(n, this.min), this._tableRange = Nn(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (Nn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return Nn(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Li = {
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
}, Fu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Eu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Li,
  ...Fu
}, Pu = al[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Ue(e) {
  return Vo(e) ? Ma(e) : e;
}
function Iu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Vo(t) ? new Proxy(e, {}) : e;
}
function Ru(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Fi(e, t) {
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
function Ou(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Fi(n, e.labels), Ei(n, e.datasets, t), n;
}
const zu = Q({
  props: Eu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = nt(null), o = zo(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: d, data: u, options: h, plugins: b, datasetIdKey: _ } = e, m = Ou(u, _), p = Iu(m, u);
      o.value = new Te(s.value, {
        type: d,
        data: p,
        options: {
          ...h
        },
        plugins: b
      });
    }, l = () => {
      const d = Ma(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, c = (d) => {
      d.update(e.updateMode);
    };
    return oe(i), Be(l), It([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, b] = d, [_, m] = u;
      const p = Ma(o.value);
      if (!p)
        return;
      let y = !1;
      if (h) {
        const g = Ue(h), f = Ue(_);
        g && g !== f && (Ru(p, g), y = !0);
      }
      if (b) {
        const g = Ue(b.labels), f = Ue(m.labels), x = Ue(b.datasets), w = Ue(m.datasets);
        g !== f && (Fi(p.config.data, g), y = !0), x && x !== w && (Ei(p.config.data, x, e.datasetIdKey), y = !0);
      }
      y && Rt(() => {
        c(p);
      });
    }, {
      deep: !0
    }), () => $a("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      $a("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function es(e, t) {
  return Te.register(t), Q({
    props: Li,
    setup(n, a) {
      let { expose: s } = a;
      const o = zo(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => $a(zu, Pu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Vu = /* @__PURE__ */ es("bar", Dc), Nu = /* @__PURE__ */ es("line", Bc), ju = /* @__PURE__ */ es("pie", Lc), ko = {
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
}, wo = {
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
}, Wu = [
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
function dt(e) {
  const t = nt("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = D(() => e?.value ? e.value : t.value), o = D(() => s.value === "dark"), i = D(() => o.value ? wo : ko), l = () => {
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
  return oe(() => {
    l();
  }), Be(() => {
    c();
  }), e && It(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: ko,
    darkColors: wo,
    chartSeriesColors: Wu
  };
}
const ns = 5, as = 8, Hu = /^x\d*$/, Yu = /^y\d*$/;
function Pi(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, c = l && typeof l == "object" ? { ...l } : {};
    Hu.test(s) && (c.maxTicksLimit = as, c.autoSkip = !0, c.minRotation = 0, c.maxRotation = 0, c.autoSkipPadding = c.autoSkipPadding ?? 8), Yu.test(s) && (c.maxTicksLimit = ns), i.ticks = c, a[s] = i;
  }
  return t.scales = a, t;
}
const Ut = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ku = ["titleFont", "bodyFont", "footerFont"];
function Ii(e, t = Ut) {
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
      for (const c of Ku) {
        const d = l[c];
        d && typeof d == "object" && (l[c] = { ...d, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const qu = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Co = 10, Uu = /* @__PURE__ */ Q({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Te.register(Ti, Bi, uu, Di, ts, Ja), Te.defaults.font.family = Ut;
    const { isDark: a, colors: s } = dt(rt(n, "theme")), o = D(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d;
    function l(d, u) {
      if (u == null) return d;
      if (Array.isArray(u) || typeof u != "object" || d == null || Array.isArray(d) || typeof d != "object") return u;
      const h = { ...d };
      for (const b of Object.keys(u)) {
        const _ = u[b];
        _ !== void 0 && (h[b] = l(d[b], _));
      }
      return h;
    }
    const c = D(() => {
      const d = {
        font: {
          family: Ut
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
                family: Ut,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Co,
              boxHeight: Co,
              usePointStyle: !1,
              generateLabels: function(h) {
                return h.data.datasets.map((_, m) => {
                  const p = Array.isArray(_.backgroundColor) ? _.backgroundColor[0] : _.backgroundColor, y = Array.isArray(_.borderColor) ? _.borderColor[0] : _.borderColor, g = typeof y == "string" && y.length > 0 ? y : typeof p == "string" && p.length > 0 ? p : s.value.textSecondary;
                  return {
                    text: i(_.label || ""),
                    fillStyle: typeof p == "string" ? p : g,
                    strokeStyle: g,
                    lineWidth: 0,
                    fontColor: g,
                    hidden: !h.isDatasetVisible(m),
                    index: m,
                    datasetIndex: m
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
              family: Ut,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: Ut,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(h) {
                return h.length > 0 ? String(i(h[0].label)) : "";
              },
              label: function(h) {
                let b = String(i(h.dataset.label || ""));
                return b && (b += ": "), h.parsed.y !== null && (b += h.parsed.y), b;
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
              maxTicksLimit: ns,
              font: {
                family: Ut,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
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
              maxTicksLimit: as,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Ut,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(h) {
                const b = this.getLabelForValue(h);
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
      }, u = n.options ? l(d, n.options) : d;
      return Ii(
        Pi(u)
      );
    });
    return t({ isDark: a }), (d, u) => (v(), k("div", qu, [
      z(F(Vu), {
        data: o.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), at = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, me = /* @__PURE__ */ at(Uu, [["__scopeId", "data-v-86711d87"]]), Xu = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Gu = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Zu = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Qu = ["aria-pressed", "aria-label", "onClick"], Ju = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, th = /* @__PURE__ */ Q({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Te.register(
      Ti,
      Bi,
      ou,
      su,
      Di,
      ts,
      Ja
    ), Te.defaults.font.family = Ut;
    const a = nt(null), { isDark: s, colors: o } = dt(rt(n, "theme")), i = D(() => o.value.bgCard), l = D(() => {
      const p = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((y) => {
          const g = y.borderColor, f = Array.isArray(g) ? g[0] : g, x = typeof f == "string" && f.length > 0 ? f : o.value.textSecondary, w = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : p, C = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : w, S = y.pointBorderWidth ?? 2, $ = y.pointHoverBorderWidth ?? S;
          return {
            ...y,
            fill: y.fill ?? !1,
            pointBackgroundColor: w,
            pointHoverBackgroundColor: C,
            pointBorderColor: y.pointBorderColor ?? x,
            pointHoverBorderColor: y.pointHoverBorderColor ?? x,
            pointBorderWidth: S,
            pointHoverBorderWidth: $
          };
        })
      };
    }), c = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p;
    function d(p) {
      const y = p.borderColor, g = Array.isArray(y) ? y[0] : y;
      return typeof g == "string" && g.length > 0 ? g : o.value.textSecondary;
    }
    const u = D(
      () => l.value.datasets.map((p, y) => ({
        key: `${p.label ?? "dataset"}-${y}`,
        label: c(p.label || ""),
        color: d(p)
      }))
    ), h = nt([]);
    It(
      () => l.value.datasets.length,
      (p) => {
        const y = Array.from({ length: p }, (g, f) => h.value[f] ?? !0);
        h.value = y;
      },
      { immediate: !0 }
    );
    function b(p) {
      const g = a.value?.chart;
      if (!g || p < 0 || p >= g.data.datasets.length) return;
      const f = !g.isDatasetVisible(p);
      g.setDatasetVisibility(p, f), h.value[p] = f, g.update();
    }
    function _(p, y) {
      if (y == null) return p;
      if (Array.isArray(y) || typeof y != "object" || p == null || Array.isArray(p) || typeof p != "object") return y;
      const g = { ...p };
      for (const f of Object.keys(y)) {
        const x = y[f];
        x !== void 0 && (g[f] = _(p[f], x));
      }
      return g;
    }
    const m = D(() => {
      const p = {
        font: {
          family: Ut
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
              family: Ut,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: Ut,
              size: 13
            },
            callbacks: {
              title: function(f) {
                return f.length > 0 ? String(c(f[0].label)) : "";
              },
              label: function(f) {
                let x = String(c(f.dataset.label || ""));
                return x && (x += ": "), f.parsed.y !== null && (x += f.parsed.y), x;
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
              maxTicksLimit: as,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Ut,
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
              maxTicksLimit: ns,
              font: {
                family: Ut,
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
      }, y = n.options ? _(p, n.options) : p;
      return Ii(
        Pi(y)
      );
    });
    return t({ isDark: s }), (p, y) => (v(), k("div", Xu, [
      r("div", Gu, [
        z(F(Nu), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: m.value
        }, null, 8, ["data", "options"])
      ]),
      u.value.length > 0 ? (v(), k("ul", Zu, [
        (v(!0), k(q, null, et(u.value, (g, f) => (v(), k("li", {
          key: g.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: H(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", h.value[f] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: gt({ color: g.color }),
            "aria-pressed": h.value[f] !== !1,
            "aria-label": `${g.label}. ${h.value[f] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (x) => b(f)
          }, [
            r("span", Ju, [
              y[0] || (y[0] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              r("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: gt({ borderColor: g.color })
              }, null, 4),
              y[1] || (y[1] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            r("span", null, A(g.label), 1)
          ], 14, Qu)
        ]))), 128))
      ])) : O("", !0)
    ]));
  }
}), ve = /* @__PURE__ */ at(th, [["__scopeId", "data-v-e1b1d261"]]), eh = { class: "chart-container" }, nh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ah = /* @__PURE__ */ Q({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Te.register(Ud, ts, Ja);
    const { isDark: a, colors: s } = dt(rt(n, "theme")), o = n.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, l = D(() => n.options ? n.options : {
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
              family: nh,
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
                const _ = c.getDatasetMeta(0).controller.getStyle(h), p = d.datasets[0].data[h], y = typeof _.backgroundColor == "string" && _.backgroundColor.length > 0 ? _.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(u)}: ${p}`,
                  fillStyle: _.backgroundColor,
                  strokeStyle: _.borderColor,
                  lineWidth: _.borderWidth,
                  lineDash: _.borderDash,
                  lineDashOffset: _.borderDashOffset,
                  lineJoin: _.borderJoinStyle,
                  fontColor: y,
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
              const d = c.label || "", u = c.parsed || 0, h = c.dataset.data.reduce((_, m) => _ + m, 0), b = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${b}%)`;
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
    return t({ isDark: a }), (c, d) => (v(), k("div", eh, [
      z(F(ju), {
        data: F(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ia = /* @__PURE__ */ at(ah, [["__scopeId", "data-v-0f7806d6"]]), sh = { class: "chart-container" }, oh = ["viewBox"], ih = ["transform"], lh = ["x", "width", "fill", "stroke"], rh = ["fill"], ch = ["x1", "y1", "x2", "y2", "stroke"], dh = ["points", "fill"], uh = ["x1", "y1", "x2", "y2", "stroke"], hh = ["x", "y", "fill"], fh = ["x1", "y1", "x2", "y2", "stroke"], gh = ["points", "fill"], ph = ["transform"], mh = ["y1", "y2"], bh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y", "height"], xh = ["y1", "y2"], kh = ["y1", "y2"], wh = ["y1", "y2"], Ch = ["y1", "y2"], $h = ["y", "height"], Mh = ["cy", "stroke", "onMouseenter"], Sh = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["cy", "stroke", "onMouseenter"], Th = ["y1", "y2", "onMouseenter"], Bh = ["y1", "y2", "onMouseenter"], Lh = ["x", "y", "fill"], Fh = ["x", "y", "fill"], Eh = ["transform"], Ph = { transform: "translate(-200, 0)" }, Ih = ["stroke"], Rh = ["fill"], Oh = { transform: "translate(-130, 0)" }, zh = ["stroke"], Vh = ["fill"], Nh = { transform: "translate(-60, 0)" }, jh = ["stroke"], Wh = ["fill"], Hh = { transform: "translate(10, 0)" }, Yh = ["stroke"], Kh = ["fill"], qh = { transform: "translate(80, 0)" }, Uh = ["fill"], Xh = { transform: "translate(150, 0)" }, Gh = ["fill"], Zh = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a } = dt(rt(n, "theme")), s = D(() => ({
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
    })), o = nt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b, l = (b, _) => {
      const m = b.currentTarget.closest("svg");
      if (!m) return;
      const p = m.getBoundingClientRect(), y = m.createSVGPoint();
      y.x = b.clientX - p.left, y.y = b.clientY - p.top, o.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: _
      };
    }, c = (b) => {
      if (o.value.visible) {
        const _ = b.currentTarget, m = _.getBoundingClientRect(), p = _.createSVGPoint();
        p.x = b.clientX - m.left, p.y = b.clientY - m.top, o.value.x = p.x, o.value.y = p.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const b = [], m = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let p = 1; p <= 10; p++) {
        const y = p, g = (y - 1) / 9, f = n.chartMargin + m - g * m;
        b.push({ value: y, y: f });
      }
      return b;
    });
    return t({ isDark: a }), (b, _) => (v(), k("div", sh, [
      (v(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (v(), k("g", {
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
          }, null, 8, lh),
          r("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(o.value.text), 9, rh)
        ], 8, ih)) : O("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, ch),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, dh),
        (v(!0), k(q, null, et(h.value, (m, p) => (v(), k(q, { key: p }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: m.y,
            x2: e.chartMargin,
            y2: m.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, uh),
          r("text", {
            x: e.chartMargin - 12,
            y: m.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(m.value), 9, hh)
        ], 64))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, fh),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, gh),
        (v(!0), k(q, null, et(e.boxplotData, (m, p) => (v(), k(q, { key: p }, [
          r("g", {
            transform: `translate(${m.centerX}, 0)`
          }, [
            m.isTotal ? (v(), k(q, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, mh),
              r("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
              r("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              r("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, yh),
              r("rect", {
                x: -24,
                y: m.q3Y,
                width: "48",
                height: m.q1Y - m.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, _h)
            ], 64)) : (v(), k(q, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xh),
              r("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kh),
              r("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              r("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ch),
              r("rect", {
                x: -24,
                y: m.q3Y,
                width: "48",
                height: m.q1Y - m.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, $h)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: m.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Min: ${m.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            r("circle", {
              cx: 0,
              cy: m.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Q1: ${m.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            r("circle", {
              cx: 0,
              cy: m.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Q3: ${m.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            r("circle", {
              cx: 0,
              cy: m.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Max: ${m.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            r("line", {
              x1: -24,
              y1: m.medianY,
              x2: 24,
              y2: m.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (y) => l(y, `Median: ${m.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Th),
            m.averageY ? (v(), k("line", {
              key: 2,
              x1: -24,
              y1: m.averageY,
              x2: 24,
              y2: m.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (y) => l(y, `Avg: ${m.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Bh)) : O("", !0)
          ], 8, ph),
          r("text", {
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(m.label)), 9, Lh),
          m.responseCount ? (v(), k("text", {
            key: 0,
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(m.responseCount), 9, Fh)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (v(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", Ph, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ih),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Rh)
          ]),
          r("g", Oh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, zh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Vh)
          ]),
          r("g", Nh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, jh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Wh)
          ]),
          r("g", Hh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Yh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Kh)
          ]),
          r("g", qh, [
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
            }, " Avg ", 8, Uh)
          ]),
          r("g", Xh, [
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
            }, " Median ", 8, Gh)
          ])
        ], 8, Eh)) : O("", !0)
      ], 44, oh))
    ]));
  }
}), Qh = /* @__PURE__ */ at(Zh, [["__scopeId", "data-v-9ac5c075"]]), Jh = { class: "chart-container" }, tf = ["viewBox"], ef = ["x1", "y1", "x2", "y2", "stroke"], nf = ["points", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], sf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x", "y", "fill"], lf = ["x", "y", "fill", "transform"], rf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["points", "fill"], df = ["transform"], uf = ["y1", "y2", "stroke", "onMouseenter"], hf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], ff = ["x1", "y1", "x2", "y2", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], mf = ["cy", "stroke", "onMouseenter"], bf = ["x", "y", "fill"], vf = ["x", "y", "fill"], yf = ["transform"], _f = { transform: "translate(-180, 0)" }, xf = ["stroke"], kf = ["fill"], wf = { transform: "translate(-120, 0)" }, Cf = ["fill"], $f = { transform: "translate(-60, 0)" }, Mf = ["fill"], Sf = { transform: "translate(0, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(60, 0)" }, Bf = ["fill"], Lf = { transform: "translate(130, 0)" }, Ff = ["fill"], Ef = ["transform"], Pf = ["x", "y", "width", "height", "fill", "stroke"], If = ["y", "fill"], Rf = ["y", "fill"], jn = 10, Of = 14, _a = 13, $o = 4, Mo = 12, zf = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = jn + _a + $o + Mo + jn, i = D(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(f, x, w) {
      const C = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(f, 1) * x * C);
    }
    function c(f, x) {
      return Math.max(
        l(f.length, _a, !0),
        l(x.length, Mo, !1),
        52
      ) + Of * 2;
    }
    function d(f, x, w, C) {
      const S = w / 2, $ = 6, M = Math.min(
        Math.max(f, S + $),
        n.chartWidth - S - $
      ), L = $ + C + 10, T = n.chartHeight - $ + 10, B = Math.min(Math.max(x, L), T);
      return { x: M, y: B };
    }
    const u = D(() => ({
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
    }), b = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, _ = (f, x, w) => {
      const C = f.currentTarget.closest("svg");
      if (!C) return;
      const S = C.getBoundingClientRect(), $ = C.createSVGPoint();
      $.x = f.clientX - S.left, $.y = f.clientY - S.top;
      let M = b(x.label), L = "";
      switch (w) {
        case "body":
          L = `Q1: ${x.q1.toFixed(1)} | Q3: ${x.q3.toFixed(1)}`;
          break;
        case "wick":
          L = `Min: ${x.low.toFixed(1)} | Max: ${x.high.toFixed(1)}`;
          break;
        case "median":
          L = `Median: ${x.median.toFixed(1)}`;
          break;
        case "average":
          L = `Average: ${x.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          L = `Min: ${x.low.toFixed(1)}`;
          break;
        case "max":
          L = `Max: ${x.high.toFixed(1)}`;
          break;
      }
      const T = c(M, L), B = o;
      let E = $.x, P = $.y - 20;
      const N = d(E, P, T, B);
      E = N.x, P = N.y, h.value = {
        visible: !0,
        x: E,
        y: P,
        title: M,
        text: L,
        width: T,
        height: B
      };
    }, m = (f) => {
      if (h.value.visible) {
        const x = f.currentTarget, w = x.getBoundingClientRect(), C = x.createSVGPoint();
        C.x = f.clientX - w.left, C.y = f.clientY - w.top;
        let S = C.x, $ = C.y - 20;
        const M = d(S, $, h.value.width, h.value.height);
        h.value.x = M.x, h.value.y = M.y;
      }
    }, p = () => {
      h.value.visible = !1;
    }, y = () => {
      h.value.visible = !1;
    }, g = D(() => {
      const f = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let C = 1; C <= 10; C++) {
        const S = C, $ = (S - 1) / 9, M = n.chartMargin + w - $ * w;
        f.push({ value: S, y: M });
      }
      return f;
    });
    return t({ isDark: a }), (f, x) => (v(), k("div", Jh, [
      (v(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: gt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: m,
        onMouseleave: p
      }, [
        x[4] || (x[4] = r("defs", null, [
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
        }, null, 8, ef),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, nf),
        (v(!0), k(q, null, et(g.value, (w, C) => (v(), k("line", {
          key: `grid-${C}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, af))), 128)),
        (v(!0), k(q, null, et(g.value, (w, C) => (v(), k(q, { key: C }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, sf),
          r("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, of)
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
        }, A(b(e.yAxisLabel)), 9, lf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, rf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, cf),
        (v(!0), k(q, null, et(e.candlestickData, (w, C) => (v(), k(q, { key: C }, [
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
              onMouseenter: (S) => _(S, w, "wick"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, uf),
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
              onMouseenter: (S) => _(S, w, "body"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, hf),
            w.medianY ? (v(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => _(S, w, "median"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, ff)) : O("", !0),
            w.averageY ? (v(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => _(S, w, "average"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, gf)) : O("", !0),
            r("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => _(S, w, "min"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            r("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => _(S, w, "max"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, mf)
          ], 8, df),
          r("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(b(w.label)), 9, bf),
          w.responseCount ? (v(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, vf)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (v(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", _f, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, xf),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, kf)
          ]),
          r("g", wf, [
            x[0] || (x[0] = r("rect", {
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
            }, " Q1 ", 8, Cf)
          ]),
          r("g", $f, [
            x[1] || (x[1] = r("rect", {
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
            }, " Q3 ", 8, Mf)
          ]),
          r("g", Sf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
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
            }, " Max ", 8, Af)
          ]),
          r("g", Tf, [
            x[2] || (x[2] = r("line", {
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
            }, " Avg ", 8, Bf)
          ]),
          r("g", Lf, [
            x[3] || (x[3] = r("line", {
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
            }, " Median ", 8, Ff)
          ])
        ], 8, yf)) : O("", !0),
        h.value.visible ? (v(), k("g", {
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
          }, null, 8, Pf),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + jn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, If),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + jn + _a + $o,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Rf)
        ], 8, Ef)) : O("", !0)
      ], 44, tf))
    ]));
  }
}), Ri = /* @__PURE__ */ at(zf, [["__scopeId", "data-v-22efd66d"]]), Vf = ["viewBox"], Nf = ["x1", "y1", "x2", "y2", "stroke"], jf = ["x1", "y1", "x2", "y2", "stroke"], Wf = ["points", "fill"], Hf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x", "y", "fill"], Kf = ["x", "y", "fill", "transform"], qf = ["x1", "y1", "x2", "y2", "stroke"], Uf = ["points", "fill"], Xf = ["x1", "y1", "x2", "y2", "stroke"], Gf = ["x", "y", "fill"], Zf = ["x", "y", "fill"], Qf = ["d"], Jf = ["x", "y", "width", "height", "onMouseenter"], tg = ["x1", "y1", "x2", "y2"], eg = ["x", "y"], ng = ["x1", "y1", "x2", "y2"], ag = ["x", "y"], sg = ["x1", "y1", "x2", "y2"], og = ["x", "y"], ig = ["x1", "y1", "x2", "y2"], lg = ["x", "y"], rg = ["x1", "y1", "x2", "y2"], cg = ["x", "y"], dg = ["x1", "y1", "x2", "y2"], ug = ["x", "y"], hg = ["transform"], fg = { transform: "translate(-220, 0)" }, gg = ["fill"], pg = { transform: "translate(-140, 0)" }, mg = ["fill"], bg = { transform: "translate(-80, 0)" }, vg = ["fill"], yg = { transform: "translate(-20, 0)" }, _g = ["fill"], xg = { transform: "translate(60, 0)" }, kg = ["fill"], wg = { transform: "translate(130, 0)" }, Cg = ["fill"], $g = { transform: "translate(180, 0)" }, Mg = ["fill"], Sg = ["transform"], Dg = ["x", "y", "width", "height", "fill", "stroke"], Ag = ["y", "fill"], Tg = ["y", "fill"], Wn = 10, Bg = 14, xa = 13, So = 12, Do = 4, Lg = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = Wn + xa + Do + So + Wn, i = D(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(V, G, Z) {
      const it = Z ? 0.6 : 0.535;
      return Math.ceil(Math.max(V, 1) * G * it);
    }
    function c(V, G) {
      return Math.max(
        l(V.length, xa, !0),
        l(G.length, So, !1),
        52
      ) + Bg * 2;
    }
    function d(V, G, Z, it) {
      const mt = Z / 2, bt = 6, St = Math.min(
        Math.max(V, mt + bt),
        n.chartWidth - mt - bt
      ), Vt = bt + it + 10, Lt = n.chartHeight - bt + 10, R = Math.min(Math.max(G, Vt), Lt);
      return { x: St, y: R };
    }
    const u = D(() => ({
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
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), b = D(() => n.chartWidth - n.chartMargin * 2), _ = D(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), m = D(() => b.value / 10 * 0.6), p = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const V = Math.max(...n.histogram.map((Z) => Z.count || 0), 1), G = Math.max(1, Math.ceil(V * 0.2));
      return V + G;
    }), y = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const V = n.averageScore || 0;
      let G = 0, Z = 0;
      if (n.histogram.forEach((mt) => {
        const bt = mt.count || 0;
        G += bt;
        const St = mt.score - V;
        Z += bt * (St * St);
      }), G === 0) return 1;
      const it = Z / G;
      return Math.sqrt(it) || 1;
    }), g = (V, G, Z) => {
      if (Z === 0) return 0;
      const it = 1 / (Z * Math.sqrt(2 * Math.PI)), mt = -0.5 * Math.pow((V - G) / Z, 2);
      return it * Math.exp(mt);
    }, f = D(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && y.value === 0) return null;
      const V = n.averageScore, G = y.value, Z = 100, mt = Math.max(...n.histogram.map((Lt) => Lt.count || 0), 1) / p.value * _.value;
      if (mt <= 0) return null;
      let bt = 0;
      for (let Lt = 0; Lt <= Z; Lt++) {
        const R = 1 + 9 * (Lt / Z), j = g(R, V, G);
        j > bt && (bt = j);
      }
      if (bt <= 0) return null;
      const St = mt / bt, Vt = [];
      for (let Lt = 0; Lt <= Z; Lt++) {
        const R = 1 + 9 * (Lt / Z), j = g(R, V, G) * St, X = w(R);
        if (X !== null) {
          const ft = n.chartHeight - n.chartBottomMargin - j;
          Vt.push(`${Lt === 0 ? "M" : "L"} ${X} ${ft}`);
        }
      }
      return Vt.join(" ");
    }), x = D(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const V = b.value / 10;
      return n.histogram.map((G, Z) => {
        const it = n.chartMargin + (Z + 0.5) * V, mt = G.count > 0 ? G.count / p.value * _.value : 0, bt = n.chartHeight - n.chartBottomMargin - mt;
        return {
          score: G.score,
          count: G.count,
          x: it,
          y: bt,
          height: mt
        };
      });
    }), w = (V) => {
      if (V < 1 || V > 10) return null;
      const G = b.value / 10;
      return n.chartMargin + (V - 0.5) * G;
    }, C = D(() => w(n.minScore)), S = D(() => w(n.maxScore)), $ = D(() => w(n.q1Score)), M = D(() => w(n.medianScore)), L = D(() => w(n.q3Score)), T = D(() => w(n.averageScore)), B = D(() => n.minScore), E = D(() => n.maxScore), P = D(() => n.q1Score), N = D(() => n.medianScore), Y = D(() => n.q3Score), W = D(() => n.averageScore), J = D(() => {
      const V = [], G = n.chartMargin - 8, Z = 18;
      $.value !== null && V.push({
        x: $.value,
        y: G,
        value: n.q1Score,
        label: `Q1: ${P.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), M.value !== null && V.push({
        x: M.value,
        y: G - Z,
        value: n.medianScore,
        label: `Median: ${N.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && V.push({
        x: T.value,
        y: G - Z,
        value: n.averageScore,
        label: `Avg: ${W.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), L.value !== null && V.push({
        x: L.value,
        y: G,
        value: n.q3Score,
        label: `Q3: ${Y.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), V.sort((bt, St) => (bt.x || 0) - (St.x || 0));
      const it = [[], [], []];
      V.forEach((bt) => {
        if (bt.x === null) return;
        let St = -1;
        for (let Vt = 0; Vt < it.length; Vt++) {
          let Lt = !1;
          for (const R of it[Vt]) {
            if (R.x === null) continue;
            const j = Math.abs(bt.x - R.x), X = (bt.width + R.width) / 2 + 10;
            if (j < X) {
              Lt = !0;
              break;
            }
          }
          if (!Lt) {
            St = Vt;
            break;
          }
        }
        St === -1 && (St = it.length - 1), bt.y = G - St * Z, it[St].push(bt);
      });
      const mt = 15;
      return V.forEach((bt) => {
        bt.y < mt && (bt.y = mt);
      }), V;
    }), tt = (V) => J.value.find((Z) => Z.id === V)?.y || n.chartMargin - 10, lt = D(() => {
      const V = [];
      for (let Z = 0; Z <= 5; Z++) {
        const it = Math.round(p.value / 5 * Z), mt = n.chartHeight - n.chartBottomMargin - Z / 5 * _.value;
        V.push({ value: it, y: mt });
      }
      return V;
    });
    function vt(V, G, Z) {
      const it = V.createSVGPoint();
      it.x = G, it.y = Z;
      const mt = V.getScreenCTM();
      if (!mt) {
        const St = V.getBoundingClientRect();
        return { x: G - St.left, y: Z - St.top };
      }
      const bt = it.matrixTransform(mt.inverse());
      return { x: bt.x, y: bt.y };
    }
    const pt = (V, G) => {
      n.interactive && Mt(V, G);
    }, ct = () => {
      n.interactive && At();
    }, Mt = (V, G) => {
      const Z = V.currentTarget.closest("svg");
      if (!Z) return;
      const { x: it, y: mt } = vt(Z, V.clientX, V.clientY), bt = `Score: ${G.score}`, St = `Count: ${Number(G.count ?? 0).toLocaleString()}`, Vt = c(bt, St), Lt = o, R = typeof G?.x == "number" ? G.x : it;
      let j = mt - 20;
      const X = d(R, j, Vt, Lt);
      h.value = {
        visible: !0,
        x: X.x,
        y: X.y,
        title: bt,
        text: St,
        width: Vt,
        height: Lt,
        anchorX: typeof G?.x == "number" ? G.x : null
      };
    }, st = (V) => {
      if (n.interactive && h.value.visible) {
        const G = V.currentTarget, { x: Z, y: it } = vt(G, V.clientX, V.clientY), mt = h.value.anchorX, bt = mt != null && Number.isFinite(mt) ? mt : Z;
        let St = it - 20;
        const Vt = d(bt, St, h.value.width, h.value.height);
        h.value.x = Vt.x, h.value.y = Vt.y;
      }
    }, Et = () => {
      At();
    }, At = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (V, G) => (v(), k("div", {
      class: H(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (v(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: st,
        onMouseleave: Et
      }, [
        G[7] || (G[7] = r("defs", null, [
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
        (v(!0), k(q, null, et(lt.value, (Z, it) => (v(), k("line", {
          key: `grid-${it}`,
          x1: e.chartMargin,
          y1: Z.y,
          x2: e.chartWidth - e.chartMargin,
          y2: Z.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Nf))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, jf),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Wf),
        (v(!0), k(q, null, et(lt.value, (Z, it) => (v(), k(q, {
          key: `y-tick-${it}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: Z.y,
            x2: e.chartMargin,
            y2: Z.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Hf),
          r("text", {
            x: e.chartMargin - 12,
            y: Z.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(Z.value), 9, Yf)
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
        }, " Count ", 8, Kf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, qf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Uf),
        (v(!0), k(q, null, et(x.value, (Z, it) => (v(), k(q, {
          key: `tick-${it}`
        }, [
          r("line", {
            x1: Z.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: Z.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xf),
          r("text", {
            x: Z.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(Z.score), 9, Gf)
        ], 64))), 128)),
        r("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Zf),
        f.value ? (v(), k("path", {
          key: 0,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Qf)) : O("", !0),
        (v(!0), k(q, null, et(x.value, (Z, it) => (v(), k("rect", {
          key: `bar-${it}`,
          x: Z.x - m.value / 2,
          y: Z.y,
          width: m.value,
          height: Z.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (mt) => pt(mt, Z),
          onMouseleave: ct,
          style: gt({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Jf))), 128)),
        C.value ? (v(), k("line", {
          key: 1,
          x1: C.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, tg)) : O("", !0),
        C.value ? (v(), k("text", {
          key: 2,
          x: C.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(B.value.toFixed(1)), 9, eg)) : O("", !0),
        $.value ? (v(), k("line", {
          key: 3,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ng)) : O("", !0),
        $.value ? (v(), k("text", {
          key: 4,
          x: $.value,
          y: tt("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(P.value.toFixed(1)), 9, ag)) : O("", !0),
        M.value ? (v(), k("line", {
          key: 5,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, sg)) : O("", !0),
        M.value ? (v(), k("text", {
          key: 6,
          x: M.value,
          y: tt("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(N.value.toFixed(1)), 9, og)) : O("", !0),
        T.value ? (v(), k("line", {
          key: 7,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, ig)) : O("", !0),
        T.value ? (v(), k("text", {
          key: 8,
          x: T.value,
          y: tt("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(W.value.toFixed(1)), 9, lg)) : O("", !0),
        L.value ? (v(), k("line", {
          key: 9,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, rg)) : O("", !0),
        L.value ? (v(), k("text", {
          key: 10,
          x: L.value,
          y: tt("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(Y.value.toFixed(1)), 9, cg)) : O("", !0),
        S.value ? (v(), k("line", {
          key: 11,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, dg)) : O("", !0),
        S.value ? (v(), k("text", {
          key: 12,
          x: S.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(E.value.toFixed(1)), 9, ug)) : O("", !0),
        e.showLegend ? (v(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          r("g", fg, [
            G[0] || (G[0] = r("line", {
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
            }, " Gaussian ", 8, gg)
          ]),
          r("g", pg, [
            G[1] || (G[1] = r("line", {
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
            }, " Min ", 8, mg)
          ]),
          r("g", bg, [
            G[2] || (G[2] = r("line", {
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
            }, " Q1 ", 8, vg)
          ]),
          r("g", yg, [
            G[3] || (G[3] = r("line", {
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
            }, " Median ", 8, _g)
          ]),
          r("g", xg, [
            G[4] || (G[4] = r("line", {
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
            }, " Avg ", 8, kg)
          ]),
          r("g", wg, [
            G[5] || (G[5] = r("line", {
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
            }, " Q3 ", 8, Cg)
          ]),
          r("g", $g, [
            G[6] || (G[6] = r("line", {
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
            }, " Max ", 8, Mg)
          ])
        ], 8, hg)) : O("", !0),
        e.interactive && h.value.visible ? (v(), k("g", {
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
          }, null, 8, Dg),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Wn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Ag),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Wn + xa + Do,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Tg)
        ], 8, Sg)) : O("", !0)
      ], 44, Vf))
    ], 2));
  }
}), Oi = /* @__PURE__ */ at(Lg, [["__scopeId", "data-v-a1e39e34"]]), Fg = 639, zi = 1024;
function Ao(e) {
  return e < 640 ? "mobile" : e <= zi ? "tablet" : "desktop";
}
function Eg() {
  const e = nt(
    typeof window > "u" ? "desktop" : Ao(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Ao(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  oe(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Fg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${zi}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), Be(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = D(() => e.value === "mobile"), l = D(() => e.value === "tablet"), c = D(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: c
  };
}
const Pg = { class: "chart-container" }, Ig = {
  key: 1,
  class: "chart-wrapper"
}, Rg = /* @__PURE__ */ Q({
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
    is.use([il, ll, rl, cl]);
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), { breakpoint: o } = Eg(), i = nt(null), l = nt(!0), c = nt(!1);
    let d = null;
    const u = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = D(() => {
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
    }), b = (S, $) => {
      const M = S.trim();
      if (!M || $ < 1) return S;
      if (M.length <= $) return M;
      const L = [];
      let T = 0;
      for (; T < M.length; ) {
        const B = Math.min(T + $, M.length);
        if (B >= M.length) {
          const N = M.slice(T).trim();
          N && L.push(N);
          break;
        }
        const E = M.slice(T, B), P = E.lastIndexOf(" ");
        if (P > 0)
          for (L.push(M.slice(T, T + P).trim()), T += P; T < M.length && M[T] === " "; ) T += 1;
        else
          L.push(E), T = B;
      }
      return L.join(`
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
    ], m = () => {
      const S = n.data.links.filter(
        (T) => T.source && T.target && typeof T.value == "number"
      ), $ = Math.max(...S.map((T) => T.value), 1), M = Math.max(1, $ * 0.01), L = S.map((T) => ({
        ...T,
        originalValue: T.value,
        value: T.value < $ * 0.01 ? M : T.value
      }));
      return {
        nodes: n.data.nodes.filter((T) => T.name),
        links: L
      };
    }, p = (S) => S.map(($, M) => ({
      ...$,
      itemStyle: {
        color: n.nodeColors[$.name] || _[M % _.length],
        borderRadius: 8
      }
    })), y = (S) => ($) => {
      const M = $.dataType === "node", L = s.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if (M) {
        const Y = S.filter((tt) => tt.target === $.name), W = S.filter((tt) => tt.source === $.name), J = Y.length > 0 ? Y.reduce((tt, lt) => tt + (lt.originalValue || lt.value), 0) : W.reduce((tt, lt) => tt + (lt.originalValue || lt.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${$.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${J.toLocaleString()}</div>`;
      }
      const B = $.data?.source || $.source || "Unknown", E = $.data?.target || $.target || "Unknown", P = $.data?.originalValue || $.data?.value || $.value || 0, N = $.data?.label || `${P.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${B} → ${E}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, g = () => {
      if (!d || !n.data.nodes?.length || !n.data.links?.length) return;
      const S = h.value, $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", M = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: L, links: T } = m(), B = p(L), E = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: y(T),
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
              itemStyle: u.style,
              label: {
                show: !0,
                position: S.labelPosition,
                /** Dark: external labels (e.g. mobile `right`) use light text; inside nodes stay dark for contrast on pastel bars. */
                color: S.labelPosition === "right" && a.value ? s.value.textPrimary : "#0f172a",
                fontWeight: 600,
                fontSize: S.labelFontSize,
                ...S.labelWrap && S.labelLineHeight > 0 ? { lineHeight: S.labelLineHeight } : {},
                ...S.labelWrap && S.labelTextWidth > 0 ? { width: S.labelTextWidth, overflow: "none" } : {},
                ...S.labelDistance > 0 ? { distance: S.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (P) => {
                  const N = P.name || "";
                  if (S.labelWrap)
                    return b(N, Math.max(4, S.labelCharsPerLine));
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
                formatter: (P) => {
                  const N = P.data?.originalValue || P.value || 0;
                  return P.data?.label || `${N.toLocaleString()}`;
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
        d.setOption(E), d.resize();
      } catch (L) {
        console.error("Error setting Sankey chart options:", L), c.value = !0;
      }
    }, f = async () => {
      if (i.value)
        try {
          d = is.init(i.value), g(), window.addEventListener("resize", w);
        } catch (S) {
          console.error("Error initializing Sankey chart:", S), c.value = !0;
        } finally {
          l.value = !1;
        }
    }, x = async (S = 40) => {
      await Rt();
      for (let $ = 0; $ < S; $++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await f();
        await new Promise((M) => setTimeout(M, 50));
      }
      await f(), setTimeout(w, 50);
    }, w = () => d?.resize(), C = () => {
      window.removeEventListener("resize", w), d && (d.dispose(), d = null);
    };
    return oe(() => i.value && x()), No(C), It(() => n.data, g, { deep: !0 }), It(a, g), It(o, g), t({ isDark: a }), (S, $) => (v(), k("div", Pg, [
      c.value ? (v(), k("div", {
        key: 0,
        class: "error-state",
        style: gt({ height: e.height })
      }, [...$[0] || ($[0] = [
        os('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (v(), k("div", Ig, [
        Zt(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: gt({ height: e.height })
        }, null, 4), [
          [yn, !l.value]
        ]),
        Zt(r("div", {
          class: "loading-state",
          style: gt({ height: e.height })
        }, [...$[1] || ($[1] = [
          os('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [yn, l.value]
        ])
      ]))
    ]));
  }
}), Le = /* @__PURE__ */ at(Rg, [["__scopeId", "data-v-eb927194"]]), Og = ["open"], zg = { class: "card-header metric-collapsible__summary" }, Vg = { class: "header-content metric-header-content" }, Ng = { class: "metric-header-content__main" }, jg = { class: "metric-header-content__text" }, Wg = {
  key: 0,
  class: "card-title"
}, Hg = {
  key: 0,
  class: "card-subtitle"
}, Yg = {
  key: 0,
  class: "metric-header-content__export"
}, Kg = {
  key: 0,
  class: "cmc-header-aside"
}, qg = { class: "chart-metric-container__body" }, Ug = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Xg = { class: "card-header" }, Gg = { class: "header-content metric-header-content" }, Zg = { class: "metric-header-content__main" }, Qg = { class: "metric-header-content__text" }, Jg = {
  key: 0,
  class: "card-title"
}, tp = {
  key: 0,
  class: "card-subtitle"
}, ep = {
  key: 0,
  class: "metric-header-content__export"
}, np = {
  key: 0,
  class: "cmc-header-aside"
}, ap = { class: "chart-metric-container__body" }, sp = /* @__PURE__ */ Q({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = nt(t.defaultOpen), a = Ea();
    function s(l) {
      return l.some((c) => {
        if (c.type === sl) return !1;
        if (c.type === Text) {
          const d = c.children;
          return typeof d == "string" && d.trim().length > 0;
        }
        return !!c.type;
      });
    }
    const o = D(() => {
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? s(l()) : !1;
    });
    It(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const c = l.currentTarget;
      c?.tagName === "DETAILS" && (n.value = c.open);
    }
    return (l, c) => e.collapsible ? (v(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      r("summary", zg, [
        r("div", Vg, [
          r("div", Ng, [
            r("div", jg, [
              $t(l.$slots, "title", {}, () => [
                e.title ? (v(), k("h3", Wg, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (v(), k("p", Hg, A(e.subtitle), 1)) : O("", !0),
              $t(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (v(), k("div", Yg, [
              $t(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (v(), k("div", Kg, [
            $t(l.$slots, "headerAside", {}, void 0, !0)
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
      r("div", qg, [
        $t(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, Og)) : (v(), k("div", Ug, [
      r("div", Xg, [
        r("div", Gg, [
          r("div", Zg, [
            r("div", Qg, [
              $t(l.$slots, "title", {}, () => [
                e.title ? (v(), k("h3", Jg, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (v(), k("p", tp, A(e.subtitle), 1)) : O("", !0),
              $t(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (v(), k("div", ep, [
              $t(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (v(), k("div", np, [
            $t(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ])
      ]),
      r("div", ap, [
        $t(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ht = /* @__PURE__ */ at(sp, [["__scopeId", "data-v-3c4aac03"]]);
function op(e, t) {
  return v(), k("svg", {
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
function Vi(e, t) {
  return v(), k("svg", {
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
function Kt(e, t) {
  return v(), k("svg", {
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
function ip(e, t) {
  return v(), k("svg", {
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
function Ni(e, t) {
  return v(), k("svg", {
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
function lp(e, t) {
  return v(), k("svg", {
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
  return v(), k("svg", {
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
  return v(), k("svg", {
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
function dp(e, t) {
  return v(), k("svg", {
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
  return v(), k("svg", {
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
const up = {
  key: 0,
  class: "footer-divider"
}, hp = {
  key: 0,
  class: "export-label"
}, fp = { class: "export-buttons" }, gp = ["disabled"], pp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, mp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, bp = ["disabled"], vp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, yp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, _p = /* @__PURE__ */ Q({
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
    ), i = (c) => n.formats.includes(c), l = (c) => {
      n.loading || a("export", c);
    };
    return (c, d) => (v(), K(Xe(s.value), {
      class: H(o.value)
    }, {
      default: I(() => [
        e.variant === "footer" ? (v(), k("div", up)) : O("", !0),
        r("div", {
          class: H(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (v(), k("span", hp, "Export")) : O("", !0),
          r("div", fp, [
            i("pdf") ? (v(), k("button", {
              key: 0,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: d[0] || (d[0] = (u) => l("pdf"))
            }, [
              e.loading ? (v(), k("svg", pp, [...d[2] || (d[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (v(), k("svg", mp, [...d[3] || (d[3] = [
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
            ], 10, gp)) : O("", !0),
            i("csv") ? (v(), k("button", {
              key: 1,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: d[1] || (d[1] = (u) => l("csv"))
            }, [
              e.loading ? (v(), k("svg", vp, [...d[5] || (d[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (v(), k("svg", yp, [...d[6] || (d[6] = [
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
            ], 10, bp)) : O("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Tt = /* @__PURE__ */ at(_p, [["__scopeId", "data-v-33a9d528"]]), xp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, kp = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, wp = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Cp = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, $p = { class: "w-full shrink-0 sm:pr-2" }, Mp = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Sp = { class: "max-w-[360px] text-center" }, Dp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ap = /* @__PURE__ */ Q({
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
    }, l = [30, 50, 70, 50, 40], c = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], d = rt(s, "theme"), u = rt(s, "options"), { isDark: h } = dt(d), b = (m) => {
      const p = new Date(m), y = String(p.getDate()).padStart(2, "0"), g = String(p.getMonth() + 1).padStart(2, "0");
      return `${y}-${g}`;
    }, _ = D(() => {
      const m = s.data?.agents_by_day || {}, p = Object.keys(m).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const y = p.map((C) => b(C)), g = /* @__PURE__ */ new Set();
      for (const C of Object.values(m))
        for (const S of Object.keys(C))
          g.add(S);
      const f = Array.from(g), x = (C) => C, w = f.map((C) => ({
        label: C,
        data: p.map((S) => m[S]?.[C] || 0),
        backgroundColor: `${a[C] || "#94a3b8"}80`,
        borderColor: x(a[C] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: y,
        datasets: w
      };
    });
    return t({ isDark: h }), (m, p) => (v(), K(ht, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", xp, [
          e.loading ? (v(), k("div", kp, [
            r("div", wp, [
              (v(), k(q, null, et(l, (y, g) => r("div", {
                key: g,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", c[g]]),
                style: gt({ height: `${y}%` })
              }, null, 6)), 64))
            ]),
            p[0] || (p[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : _.value.labels && _.value.labels.length ? (v(), k("section", Cp, [
            r("div", $p, [
              z(me, {
                data: _.value,
                stacked: !0,
                theme: d.value,
                options: u.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (v(), k("section", Mp, [
            r("div", Sp, [
              r("div", Dp, [
                z(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              p[1] || (p[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
              p[2] || (p[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Tp = { class: "flex w-full min-w-0 justify-center" }, Bp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Lp = { class: "min-w-0 truncate text-[12px] leading-normal" }, Fp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Ep = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Pp = /* @__PURE__ */ Q({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (v(), k("div", {
      class: H(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      r("div", Tp, [
        r("div", Bp, [
          e.color ? (v(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: gt({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", Lp, A(e.title), 1)
        ])
      ]),
      r("p", Fp, A(e.value), 1),
      e.subvalue ? (v(), k("p", Ep, A(e.subvalue), 1)) : O("", !0)
    ], 2));
  }
}), ot = /* @__PURE__ */ at(Pp, [["__scopeId", "data-v-945ff8fb"]]), Ip = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Nt = /* @__PURE__ */ Q({
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
        default:
          return l ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (l, c) => n.value ? (v(), k("span", {
      key: 0,
      role: "status",
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (v(), k("span", Ip, [...c[0] || (c[0] = [
        r("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      r("span", {
        class: H(["min-w-0 flex-1 text-center", o.value])
      }, A(a.value), 3)
    ], 2)) : (v(), k("span", {
      key: 1,
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      $t(l.$slots, "default", {}, () => [
        yt(A(e.label), 1)
      ])
    ], 2));
  }
}), U = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), xt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), we = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Rp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Op = { class: "overflow-x-auto" }, zp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Vp = /* @__PURE__ */ Q({
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
    function s(p) {
      return p == null || p === "" ? a : String(p);
    }
    function o(p) {
      return p === "center" ? "text-center" : p === "right" ? "text-right" : "text-left";
    }
    function i(p) {
      return `cell-${p}`;
    }
    function l(p, y) {
      return p[y];
    }
    function c(p, y) {
      if (typeof t.rowKey == "function")
        return t.rowKey(p);
      const g = p[t.rowKey];
      return typeof g == "string" || typeof g == "number" ? g : y;
    }
    function d(p, y) {
      return c(p, y);
    }
    const u = D(() => t.rows?.length ?? 0), h = D(() => u.value > t.maxVisibleRows), b = D(() => Math.max(0, u.value - t.maxVisibleRows)), _ = D(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), m = D(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(b.value))
    );
    return (p, y) => (v(), k("div", Rp, [
      r("div", Op, [
        r("table", zp, [
          r("thead", null, [
            r("tr", null, [
              (v(!0), k(q, null, et(e.columns, (g) => (v(), k("th", {
                key: g.key,
                scope: "col",
                class: H(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [o(g.align), g.headerClass]])
              }, A(g.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (v(!0), k(q, null, et(_.value, (g, f) => (v(), k("tr", {
              key: d(g, f)
            }, [
              (v(!0), k(q, null, et(e.columns, (x) => (v(), k("td", {
                key: `${f}-${x.key}`,
                class: H(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [o(x.align), x.cellClass]])
              }, [
                $t(p.$slots, i(x.key), {
                  row: g,
                  column: x,
                  value: l(g, x.key)
                }, () => [
                  yt(A(s(l(g, x.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (v(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: y[0] || (y[0] = (g) => n.value = !n.value)
      }, [
        yt(A(n.value ? e.viewLessLabel : m.value) + " ", 1),
        (v(), k("svg", {
          class: H(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...y[1] || (y[1] = [
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
}), Qt = /* @__PURE__ */ at(Vp, [["__scopeId", "data-v-58cfdc5e"]]), Np = {
  key: 0,
  class: "loading-state"
}, jp = {
  key: 1,
  class: "error-state"
}, Wp = { class: "error-content" }, Hp = { class: "error-description" }, Yp = {
  key: 2,
  class: "card-body"
}, Kp = { class: "chart-section" }, qp = { class: "chart-wrapper" }, Up = { class: "payment-success-summary" }, Xp = {
  key: 0,
  class: "booking-daily-section"
}, Gp = { class: "w-full min-w-0" }, Zp = { class: "font-medium" }, Qp = { class: "percentage-text" }, Jp = { class: "badges-container" }, tm = {
  key: 0,
  class: "badges-container"
}, em = {
  key: 1,
  class: "percentage-text"
}, nm = { class: "badges-container" }, am = {
  key: 1,
  class: "empty-state"
}, sm = /* @__PURE__ */ Q({
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
    }, i = D(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (f, x) => new Date(f.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], c = D(
      () => i.value.map((f) => ({
        id: f.date,
        ...f
      }))
    ), d = D(() => a.data?.total_payment_success_value || []), u = D(() => {
      const f = d.value;
      return f.length === 0 ? m(0) : f.map((x) => `${x.currency} ${m(x.total_value)}`).join(" · ");
    }), h = (f) => f.payment_success_value || [], b = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce((x, w) => x + (w.count || 0), 0), _ = (f) => xt(f), m = (f) => f == null ? "0" : we(f);
    D(() => (a.data?.total_payment_success_value || []).reduce((f, x) => f + (x.total_value || 0), 0));
    const p = D(() => {
      const f = a.data, x = f.total_booking_initiated || 0, w = f.total_booking_started || 0, C = f.total_payment_initiated || 0, S = f.total_not_found || 0, $ = f.total_cancelled || 0, M = f.total_no_pending_balance || 0, L = f.total_errors || 0, T = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce((J, tt) => J + (tt.count || 0), 0), B = f.total_payment_failed || 0, E = Math.max(0, x - w), P = Math.max(0, w - C - S - $ - M - L), N = (J, tt) => {
        const lt = tt > 0 ? Math.round(J / tt * 100) : 0;
        return `${U(J)} (${lt}%)`;
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
      }), E > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: N(E, x)
      }), C > 0 && W.push({
        source: "Started",
        target: "Payment Initiated",
        value: C,
        label: N(C, w)
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
      }), L > 0 && W.push({
        source: "Started",
        target: "Errors",
        value: L,
        label: N(L, w)
      }), P > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: N(P, w)
      }), T > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, C)
      }), B > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, C)
      }), { nodes: Y, links: W };
    }), y = {
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
    }, g = (f, x) => !x || x === 0 ? "0%" : `${Math.round(f / x * 100)}%`;
    return (f, x) => (v(), K(ht, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading && !a.error ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (v(), k("div", Np, [...x[0] || (x[0] = [
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
        ])])) : a.error ? (v(), k("div", jp, [
          r("div", Wp, [
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
            r("p", Hp, A(a.error), 1)
          ])
        ])) : (v(), k("div", Yp, [
          r("section", Kp, [
            r("div", qp, [
              z(Le, {
                data: p.value,
                "node-colors": y,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", Up, [
            z(ot, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (v(), k("section", Xp, [
            x[3] || (x[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Gp, [
              z(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: w }) => [
                  r("span", Zp, A(F(Pt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: w }) => [
                  r("span", null, A(F(U)(Number(w.booking_initiated_count))), 1)
                ]),
                "cell-started": I(({ row: w }) => [
                  r("span", null, [
                    yt(A(F(U)(Number(w.booking_started_count))) + " ", 1),
                    r("span", Qp, " (" + A(g(Number(w.booking_started_count), Number(w.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": I(({ row: w }) => [
                  r("span", null, A(F(U)(Number(w.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": I(({ row: w }) => [
                  r("div", Jp, [
                    z(Nt, { color: "success" }, {
                      default: I(() => [
                        yt(" Success: " + A(F(U)(b(w))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "danger" }, {
                      default: I(() => [
                        yt(" Failed: " + A(F(U)(Number(w.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": I(({ row: w }) => [
                  h(w).length > 0 ? (v(), k("div", tm, [
                    (v(!0), k(q, null, et(h(w), (C) => (v(), k("span", {
                      key: `${w.date}-${C.currency}`,
                      class: "badge badge-currency"
                    }, A(C.currency) + " " + A(_(C.total_value)), 1))), 128))
                  ])) : (v(), k("span", em, "N/A"))
                ]),
                "cell-outcomes": I(({ row: w }) => [
                  r("div", nm, [
                    z(Nt, { color: "danger" }, {
                      default: I(() => [
                        yt(" Not Found: " + A(w.not_found_count ? F(U)(Number(w.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "warning" }, {
                      default: I(() => [
                        yt(" Cancelled: " + A(w.cancelled_count ? F(U)(Number(w.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "orange" }, {
                      default: I(() => [
                        yt(" No Balance: " + A(w.no_pending_balance_count ? F(U)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "danger" }, {
                      default: I(() => [
                        yt(" Errors: " + A(w.error_count ? F(U)(Number(w.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (v(), k("section", am, [...x[4] || (x[4] = [
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
}), om = /* @__PURE__ */ at(sm, [["__scopeId", "data-v-37b8c59e"]]), im = {
  key: 0,
  class: "loading-state"
}, lm = {
  key: 1,
  class: "card-body"
}, rm = {
  key: 0,
  class: "chart-section"
}, cm = { class: "chart-wrapper" }, dm = {
  key: 1,
  class: "checkin-daily-section"
}, um = { class: "w-full min-w-0" }, hm = { class: "font-medium" }, fm = { class: "cell-success" }, gm = { class: "cell-danger" }, pm = {
  key: 0,
  class: "reasons-list"
}, mm = { class: "reason-name" }, bm = { class: "reason-count" }, vm = {
  key: 1,
  class: "no-reasons"
}, ym = {
  key: 2,
  class: "empty-state"
}, _m = {
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
    }, l = nt([]), c = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], d = D(
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
    ), u = D(() => {
      const f = s.data;
      return f && (Array.isArray(f.checkin_by_day) && f.checkin_by_day.length > 0 || (f.total_checkin_initiated ?? 0) > 0) ? { ...o, ...f } : s.checkinData ?? o;
    }), h = D(() => {
      const f = s.data;
      return f && (Array.isArray(f.failed_by_step_by_day) && f.failed_by_step_by_day.length > 0 || Array.isArray(f.unrecovered_by_step) && f.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: f.total_checkin_failed ?? 0,
        total_checkin_unrecovered: f.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: f.failed_by_step_by_day ?? [],
        unrecovered_by_step: f.unrecovered_by_step ?? [],
        unrecovered_by_day: f.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), b = D(() => {
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
        const S = w.step_name.replace(/_/g, " ").split(" ").map((M) => M.charAt(0).toUpperCase() + M.slice(1)).join(" "), $ = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        f[S] = $[S] || "#DC2626";
      }), f;
    }), _ = (f, x) => !x || x === 0 ? "0%" : `${Math.round(f / x * 100)}%`, m = (f, x) => {
      const w = U(f), C = _(f, x);
      return `${w} (${C})`;
    }, p = (f) => f.reduce((x, w) => x + w.failed_count, 0), y = D(() => {
      const f = [], x = [];
      if (!u.value.total_checkin_initiated)
        return { nodes: f, links: x };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const w = u.value.total_checkin_initiated, C = u.value.total_checkin_init, S = u.value.total_checkin_init_abandoned, $ = C - S, M = u.value.total_checkin_started, L = u.value.total_checkin_completed, T = u.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], E = B.reduce((W, J) => W + J.count, 0);
      if (C > 0) {
        const W = Math.round(C / w * 100);
        x.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: C,
          label: `${C.toLocaleString()} (${W}%)`
        });
      }
      const P = w - C;
      if (P > 0) {
        const W = Math.round(P / w * 100);
        f.push({ name: "Abandoned (Init)" }), x.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: P,
          label: `${P.toLocaleString()} (${W}%)`
        });
      }
      if (S > 0) {
        const W = Math.round(S / w * 100);
        f.push({ name: "Abandoned (Started)" }), x.push({
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
      if (L > 0) {
        const W = Math.round(L / M * 100);
        x.push({
          source: "Number of Passengers",
          target: "Completed",
          value: L,
          label: `${L.toLocaleString()} (${W}%)`
        });
      }
      if (B.length > 0 && E > 0) {
        f.push({ name: "Unrecovered" });
        const W = Math.round(E / M * 100);
        x.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${W}%)`
        }), B.forEach((J) => {
          const lt = J.step_name.replace(/_/g, " ").split(" ").map((pt) => pt.charAt(0).toUpperCase() + pt.slice(1)).join(" "), vt = Math.round(J.count / M * 100);
          f.push({ name: lt }), x.push({
            source: "Unrecovered",
            target: lt,
            value: J.count,
            label: `${J.count.toLocaleString()} (${vt}%)`
          });
        });
      }
      const N = M - (L + E);
      if (N > 0) {
        const W = Math.round(N / M * 100);
        f.push({ name: "Abandoned (Flow)" }), x.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${W}%)`
        });
      }
      const Y = L - T;
      if (Y > 0) {
        const W = Math.round(Y / M * 100);
        f.push({ name: "BP Error" }), x.push({
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
      return { nodes: f, links: x };
    }), g = () => {
      const f = u.value.checkin_by_day || [], x = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((w) => {
        const C = x.find(
          (S) => S.date === w.date
        );
        return {
          ...w,
          failed_steps: C?.steps || []
        };
      }), l.value.sort((w, C) => new Date(w.date) - new Date(C.date));
    };
    return It(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        g();
      },
      { deep: !0, immediate: !0 }
    ), (f, x) => (v(), K(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (v(), k("div", im, [...x[0] || (x[0] = [
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
        ])])) : (v(), k("div", lm, [
          y.value.nodes.length > 0 ? (v(), k("section", rm, [
            r("div", cm, [
              z(Le, {
                data: y.value,
                height: "500px",
                "node-colors": b.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (v(), k("section", dm, [
            r("div", um, [
              z(Qt, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: w }) => [
                  r("span", hm, A(F(Pt)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: w }) => [
                  r("span", null, A(F(U)(w.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: w }) => [
                  r("span", null, A(m(w.checkin_init_count, w.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": I(({ row: w }) => [
                  r("span", null, A(F(U)(w.checkin_started_count)), 1)
                ]),
                "cell-completed": I(({ row: w }) => [
                  r("span", null, A(m(w.checkin_completed_count, w.checkin_started_count)), 1)
                ]),
                "cell-closed": I(({ row: w }) => [
                  r("span", fm, A(m(w.checkin_closed_count, w.checkin_started_count)), 1)
                ]),
                "cell-failed": I(({ row: w }) => [
                  r("span", gm, A(m(p(w.failed_steps), w.checkin_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: w }) => [
                  w.failed_steps && w.failed_steps.length > 0 ? (v(), k("div", pm, [
                    (v(!0), k(q, null, et(w.failed_steps, (C) => (v(), k("div", {
                      key: C.step_name,
                      class: "reason-item"
                    }, [
                      r("span", mm, A(C.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", bm, A(C.failed_count), 1)
                    ]))), 128))
                  ])) : (v(), k("div", vm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (v(), k("section", ym, [...x[1] || (x[1] = [
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
}, Wi = /* @__PURE__ */ at(_m, [["__scopeId", "data-v-54e40783"]]), xm = {
  key: 0,
  class: "loading-state"
}, km = {
  key: 1,
  class: "card-body"
}, wm = {
  key: 0,
  class: "sankey-section"
}, Cm = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, $m = { class: "w-full min-w-0" }, Mm = { class: "font-medium whitespace-nowrap" }, Sm = { class: "cell-success" }, Dm = { class: "cell-danger" }, Am = {
  key: 0,
  class: "reasons-list"
}, Tm = { class: "reason-name" }, Bm = { class: "reason-count" }, Lm = {
  key: 1,
  class: "no-reasons"
}, Fm = {
  key: 2,
  class: "empty-state"
}, Em = { class: "empty-state-content" }, Pm = { class: "empty-icon-wrapper" }, Im = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (g) => {
      s("export", g);
    }, { isDark: i } = dt(rt(a, "theme")), l = (g) => g == null ? "0" : g.toLocaleString(), c = (g) => {
      const [f, x, w] = g.split("-").map(Number);
      return Pt([f, x - 1, w]).format("MMM DD");
    }, d = (g) => g.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), u = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, h = (g, f) => {
      const x = g || 0, w = f || 0, C = l(x), S = u(x, w);
      return `${C} (${S})`;
    }, b = D(() => ({
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
    })), _ = D(() => {
      const g = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return g.map((C) => {
        const S = f.find((M) => M.date === C.date), $ = x.find((M) => M.date === C.date);
        return {
          ...C,
          failed_steps: S?.steps || [],
          unrecovered_count: $?.unrecovered_count || 0
        };
      }).sort((C, S) => new Date(C.date).getTime() - new Date(S.date).getTime());
    }), m = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], p = D(
      () => _.value.map((g) => ({
        id: g.date,
        date: g.date,
        checkin_initiated: g.checkin_initiated,
        record_locator_init_count: g.record_locator_init_count,
        record_locator_started_count: g.record_locator_started_count,
        record_locator_completed_count: g.record_locator_completed_count,
        record_locator_closed_count: g.record_locator_closed_count,
        unrecovered_count: g.unrecovered_count,
        failed_steps: g.failed_steps
      }))
    ), y = D(() => {
      const g = [], f = [], x = /* @__PURE__ */ new Set(), w = (V) => {
        x.has(V) || (g.push({ name: V }), x.add(V));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: g, links: f };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const C = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_record_locator_init || 0, $ = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, L = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = M != null || L != null, B = T ? Math.max(Number(M) || 0, 0) : 0, E = T ? Math.max(Number(L) || 0, 0) : 0, P = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = P != null || N != null, W = Y ? Math.max(Number(P) || 0, 0) : 0, J = Y ? Math.max(Number(N) || 0, 0) : 0, tt = Y ? Math.max($ - W - J, 0) : $, lt = S - $, vt = a.checkinData.total_record_locator_started || 0, pt = a.checkinData.total_record_locator_completed || 0, ct = a.checkinData.total_record_locator_closed || 0, Mt = a.checkinData.total_record_locator_unrecovered || 0;
      if (S > 0) {
        const V = Math.round(S / C * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: S,
          label: `${S.toLocaleString()} (${V}%)`
        });
      }
      const st = C - S;
      if (T) {
        if (E > 0) {
          const V = Math.round(E / C * 100);
          w("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${V}%)`
          });
        }
        if (B > 0) {
          const V = Math.round(B / C * 100);
          w("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${V}%)`
          });
        }
      } else if (st > 0) {
        const V = Math.round(st / C * 100);
        w("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: st,
          label: `${st.toLocaleString()} (${V}%)`
        });
      }
      if (Y) {
        if (W > 0) {
          const V = Math.round(W / C * 100);
          w("Error"), f.push({
            source: "Booking Retrieval",
            target: "Error",
            value: W,
            label: `${W.toLocaleString()} (${V}%)`
          });
        }
        if (J > 0) {
          const V = Math.round(J / C * 100);
          w("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: J,
            label: `${J.toLocaleString()} (${V}%)`
          });
        }
        if (tt > 0) {
          const V = Math.round(tt / C * 100);
          w("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${V}%)`
          });
        }
      } else if ($ > 0) {
        const V = Math.round($ / C * 100);
        w("Abandoned (Started)"), f.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${V}%)`
        });
      }
      if (lt > 0) {
        const V = Math.round(lt / C * 100);
        f.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: lt,
          label: `${lt.toLocaleString()} (${V}%)`
        });
      }
      if (pt > 0) {
        const V = Math.round(pt / vt * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: pt,
          label: `${pt.toLocaleString()} (${V}%)`
        });
      }
      if (Mt > 0) {
        w("Errors");
        const V = Math.round(Mt / vt * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: Mt,
          label: `${Mt.toLocaleString()} (${V}%)`
        });
      }
      const Et = vt - (pt + Mt);
      if (Et > 0) {
        const V = Math.round(Et / vt * 100);
        w("Abandoned (Flow)"), f.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Et,
          label: `${Et.toLocaleString()} (${V}%)`
        });
      }
      const At = pt - ct;
      if (At > 0) {
        const V = Math.round(At / vt * 100);
        w("BP Error"), f.push({
          source: "Completed",
          target: "BP Error",
          value: At,
          label: `${At.toLocaleString()} (${V}%)`
        });
      }
      if (ct > 0) {
        const V = Math.round(ct / vt * 100);
        f.push({
          source: "Completed",
          target: "Closed with BP",
          value: ct,
          label: `${ct.toLocaleString()} (${V}%)`
        });
      }
      return { nodes: g, links: f };
    });
    return t({ isDark: i }), (g, f) => (v(), K(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (v(), k("div", xm, [...f[0] || (f[0] = [
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
        ])])) : (v(), k("div", km, [
          y.value.nodes.length > 0 ? (v(), k("div", wm, [
            z(Le, {
              data: y.value,
              height: "500px",
              "node-colors": b.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : O("", !0),
          _.value && _.value.length > 0 ? (v(), k("div", Cm, [
            r("div", $m, [
              z(Qt, {
                columns: m,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  r("span", Mm, A(c(String(x.date))), 1)
                ]),
                "cell-checkinInit": I(({ row: x }) => [
                  r("span", null, A(l(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": I(({ row: x }) => [
                  r("span", null, A(h(x.record_locator_init_count, x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": I(({ row: x }) => [
                  r("span", null, A(h(x.record_locator_started_count, x.record_locator_init_count)), 1)
                ]),
                "cell-completed": I(({ row: x }) => [
                  r("span", null, A(h(x.record_locator_completed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-closed": I(({ row: x }) => [
                  r("span", Sm, A(h(x.record_locator_closed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-failed": I(({ row: x }) => [
                  r("span", Dm, A(h(x.unrecovered_count, x.record_locator_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: x }) => [
                  Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (v(), k("div", Am, [
                    (v(!0), k(q, null, et(x.failed_steps, (w) => (v(), k("div", {
                      key: w.step_name,
                      class: "reason-item"
                    }, [
                      r("span", Tm, A(d(w.step_name)) + ":", 1),
                      r("span", Bm, A(w.failed_count), 1)
                    ]))), 128))
                  ])) : (v(), k("div", Lm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (v(), k("div", Fm, [
            r("div", Em, [
              r("div", Pm, [
                z(F(Kt), { class: "empty-icon" })
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
}), Rm = /* @__PURE__ */ at(Im, [["__scopeId", "data-v-00f07618"]]), Om = {
  key: 0,
  class: "loading-state"
}, zm = {
  key: 1,
  class: "card-body"
}, Vm = {
  key: 0,
  class: "chart-section"
}, Nm = { class: "chart-wrapper" }, jm = {
  key: 1,
  class: "record-locator-daily-section"
}, Wm = { class: "w-full min-w-0" }, Hm = { class: "cell-plain font-medium" }, Ym = { class: "cell-plain text-center" }, Km = { class: "cell-plain text-center" }, qm = { class: "cell-plain text-center" }, Um = { class: "cell-plain text-center" }, Xm = { class: "cell-plain text-center success-value" }, Gm = { class: "cell-plain text-center failed-value" }, Zm = { class: "cell-plain text-center warning-value" }, Qm = { class: "cell-plain text-center" }, Jm = { class: "cell-plain text-center failed-value" }, t0 = {
  key: 2,
  class: "empty-state"
}, e0 = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (g) => {
      s("export", g);
    }, { isDark: i } = dt(rt(a, "theme")), l = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (g, f) => new Date(g.date).getTime() - new Date(f.date).getTime()
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
    ], u = D(
      () => a.isAvianca ? [...c, ...d] : c
    ), h = D(
      () => l.value.map((g) => ({
        id: g.date,
        date: g.date,
        checkin_initiated: g.checkin_initiated,
        record_locator_init_count: g.record_locator_init_count,
        record_locator_started_count: g.record_locator_started_count,
        record_locator_completed_count: g.record_locator_completed_count,
        record_locator_closed_count: g.record_locator_closed_count,
        record_locator_failed_count: g.record_locator_failed_count,
        record_locator_abandoned_count: g.record_locator_abandoned_count,
        record_locator_create_payment_count: g.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: g.record_locator_create_payment_failed_count
      }))
    ), b = D(() => a.data), _ = D(() => ({
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
    })), m = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, p = (g, f) => {
      const x = U(g), w = m(g, f);
      return `${x} (${w})`;
    }, y = D(() => {
      const g = [], f = [], x = /* @__PURE__ */ new Set(), w = (st) => {
        x.has(st) || (g.push({ name: st }), x.add(st));
      };
      if (!b.value.total_checkin_initiated)
        return { nodes: g, links: f };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const C = b.value.total_checkin_initiated, S = b.value.total_record_locator_init, $ = b.value.total_record_locator_started, M = b.value.total_record_locator_completed, L = b.value.total_record_locator_closed, T = b.value.total_record_locator_failed, B = b.value.total_record_locator_abandoned, E = b.value.total_record_locator_init_abandoned, P = b.value.total_checkin_pre_init_abandoned_error, N = b.value.total_checkin_pre_init_abandoned_voluntary, Y = P != null || N != null, W = Y ? Math.max(Number(P) || 0, 0) : 0, J = Y ? Math.max(Number(N) || 0, 0) : 0, tt = b.value.total_record_locator_init_abandoned_error, lt = b.value.total_record_locator_init_abandoned_voluntary, vt = tt != null || lt != null, pt = vt ? Math.max(Number(tt) || 0, 0) : 0, ct = vt ? Math.max(Number(lt) || 0, 0) : 0;
      if (S > 0) {
        const st = Math.round(S / C * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${st}%)`
        });
      }
      const Mt = C - S;
      if (Y) {
        if (J > 0) {
          const st = Math.round(J / C * 100);
          w("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: J,
            label: `${J.toLocaleString()} (${st}%)`
          });
        }
        if (W > 0) {
          const st = Math.round(W / C * 100);
          w("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: W,
            label: `${W.toLocaleString()} (${st}%)`
          });
        }
      } else if (Mt > 0) {
        const st = Math.round(Mt / C * 100);
        w("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Mt,
          label: `${Mt.toLocaleString()} (${st}%)`
        });
      }
      if ($ > 0) {
        const st = Math.round($ / C * 100);
        f.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: $,
          label: `${$.toLocaleString()} (${st}%)`
        });
      }
      if (vt) {
        if (pt > 0) {
          const st = Math.round(pt / C * 100);
          w("Error"), f.push({
            source: "Booking retrive",
            target: "Error",
            value: pt,
            label: `${pt.toLocaleString()} (${st}%)`
          });
        }
        if (ct > 0) {
          const st = Math.round(ct / C * 100);
          w("Abandoned (Started)"), f.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: ct,
            label: `${ct.toLocaleString()} (${st}%)`
          });
        }
      } else if (E > 0) {
        const st = Math.round(E / C * 100);
        w("Abandoned (Started)"), f.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${st}%)`
        });
      }
      if (M > 0) {
        const st = Math.round(M / $ * 100);
        f.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: M,
          label: `${M.toLocaleString()} (${st}%)`
        });
      }
      if (L > 0) {
        const st = Math.round(L / $ * 100);
        f.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: L,
          label: `${L.toLocaleString()} (${st}%)`
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
      return { nodes: g, links: f };
    });
    return t({ isDark: i }), (g, f) => (v(), K(ht, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (v(), k("div", Om, [...f[0] || (f[0] = [
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
        ])])) : (v(), k("div", zm, [
          y.value.nodes.length > 0 ? (v(), k("section", Vm, [
            r("div", Nm, [
              z(Le, {
                data: y.value,
                height: "500px",
                "node-colors": _.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (v(), k("section", jm, [
            r("div", Wm, [
              z(Qt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  r("span", Hm, A(F(Pt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: x }) => [
                  r("span", Ym, A(F(U)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: x }) => [
                  r("span", Km, A(p(x.record_locator_init_count, x.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": I(({ row: x }) => [
                  r("span", qm, A(F(U)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": I(({ row: x }) => [
                  r("span", Um, A(p(x.record_locator_completed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": I(({ row: x }) => [
                  r("span", Xm, A(p(x.record_locator_closed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": I(({ row: x }) => [
                  r("span", Gm, A(p(x.record_locator_failed_count, x.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": I(({ row: x }) => [
                  r("span", Zm, A(p(x.record_locator_abandoned_count, x.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": I(({ row: x }) => [
                  r("span", Qm, A(F(U)(x.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": I(({ row: x }) => [
                  r("span", Jm, A(F(U)(x.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (v(), k("section", t0, [...f[1] || (f[1] = [
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
}), Hi = /* @__PURE__ */ at(e0, [["__scopeId", "data-v-5d48fcb3"]]), n0 = {
  key: 0,
  class: "loading-state"
}, a0 = {
  key: 1,
  class: "card-body"
}, s0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, o0 = { class: "w-full min-w-0" }, i0 = { class: "segment-plain" }, l0 = { class: "segment-plain" }, r0 = { class: "segment-plain" }, c0 = { class: "percentage-value" }, d0 = { class: "percentage-value" }, u0 = { class: "percentage-value success" }, h0 = {
  key: 1,
  class: "empty-state"
}, f0 = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = dt(rt(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], c = D(
      () => a.data.map((b, _) => ({
        id: `segment-${_}-${b.departure_airport}-${b.arrival_airport}-${b.segment_init_count}-${b.segment_started_count}`,
        departure_airport: b.departure_airport,
        conexion_airport: b.conexion_airport,
        arrival_airport: b.arrival_airport,
        segment_init_count: b.segment_init_count,
        segment_started_count: b.segment_started_count,
        segment_completed_count: b.segment_completed_count,
        segment_closed_count: b.segment_closed_count
      }))
    ), d = (b, _) => !_ || _ === 0 || !b ? "0%" : `${Math.round(b / _ * 100)}%`, u = (b) => !b || b === "None" ? "-" : String(b).trim().replace(/_[0-9]+$/i, ""), h = (b) => {
      const _ = u(b?.departure_airport), m = u(b?.arrival_airport);
      return _ === "-" || m === "-" ? !1 : _ === m;
    };
    return t({ isDark: i }), (b, _) => (v(), K(ht, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (v(), k("div", n0, [..._[0] || (_[0] = [
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
        ])])) : (v(), k("div", a0, [
          a.data.length > 0 ? (v(), k("section", s0, [
            r("div", o0, [
              z(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": I(({ row: m }) => [
                  r("span", i0, A(u(m.departure_airport)), 1)
                ]),
                "cell-connection": I(({ row: m }) => [
                  r("span", {
                    class: H(["segment-plain", {
                      "segment-plain--muted": u(m.conexion_airport) === "-"
                    }])
                  }, A(u(m.conexion_airport)), 3)
                ]),
                "cell-arrival": I(({ row: m }) => [
                  r("span", l0, A(u(m.arrival_airport)), 1)
                ]),
                "cell-trip": I(({ row: m }) => [
                  r("span", r0, A(h(m) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": I(({ row: m }) => [
                  yt(A(F(U)(m.segment_init_count)), 1)
                ]),
                "cell-started": I(({ row: m }) => [
                  r("span", c0, A(d(m.segment_started_count, m.segment_init_count)), 1)
                ]),
                "cell-completed": I(({ row: m }) => [
                  r("span", d0, A(d(m.segment_completed_count, m.segment_init_count)), 1)
                ]),
                "cell-closed": I(({ row: m }) => [
                  r("span", u0, A(d(m.segment_closed_count, m.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (v(), k("section", h0, [..._[1] || (_[1] = [
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
}), Yi = /* @__PURE__ */ at(f0, [["__scopeId", "data-v-b6fca91a"]]), g0 = { class: "checkin-container__body" }, p0 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = D(() => n.loading || n.checkinLoading);
    D(() => n.loading || n.checkinMetricsLoading);
    const o = D(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = D(() => n.loading || n.segmentsLoading), l = D(() => n.recordLocatorData ?? n.checkinMetricsData);
    function c(h, b) {
      a("export", { source: h, format: b });
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
    return (h, b) => (v(), K(ht, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", g0, [
          e.showCheckin ? (v(), K(Wi, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: b[0] || (b[0] = (_) => c("checkin", _))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : O("", !0),
          z(Hi, {
            collapsible: !1,
            loading: o.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: b[1] || (b[1] = (_) => c("recordLocator", _))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          z(Yi, {
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
}), m0 = /* @__PURE__ */ at(p0, [["__scopeId", "data-v-90d88bae"]]), b0 = {
  key: 0,
  class: "loading-state"
}, v0 = {
  key: 1,
  class: "card-body"
}, y0 = { class: "chart-section" }, _0 = { class: "chart-wrapper" }, x0 = {
  key: 1,
  class: "empty-chart"
}, k0 = { class: "payment-success-summary" }, w0 = {
  key: 0,
  class: "disruption-daily-section"
}, C0 = { class: "w-full min-w-0" }, $0 = { class: "font-medium text-center" }, M0 = { class: "text-center" }, S0 = { class: "text-center" }, D0 = { class: "percentage-text" }, A0 = { class: "text-center" }, T0 = { class: "abandoned-value" }, B0 = { class: "badges-container badges-wrap" }, L0 = { class: "badges-container badges-wrap" }, F0 = {
  key: 1,
  class: "empty-state"
}, E0 = /* @__PURE__ */ Q({
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
    function n(g) {
      return g;
    }
    const a = e, s = t, o = (g) => {
      s("export", g);
    }, i = D(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (g, f) => new Date(g.date).getTime() - new Date(f.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], c = D(
      () => i.value.map((g) => ({
        id: g.date,
        ...g
      }))
    ), d = D(() => a.data?.total_payment_success || []), u = D(() => {
      const g = d.value;
      return g.length === 0 ? b(0) : g.map((f) => `${f.currency} ${b(f.total_value)}`).join(" · ");
    }), h = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, b = (g) => xt(g), _ = (g) => (g ?? []).reduce((f, x) => f + (x.count ?? 0), 0), m = (g) => typeof g.sell_success_count == "number" ? g.sell_success_count : _(g.payment_success_total), p = D(() => {
      const g = a.data, f = g.total_disruption_conversations || 0, x = g.total_disruption_initiated || 0, w = g.total_voluntary || 0, C = g.total_involuntary || 0, S = g.total_accepted || 0, $ = g.total_confirmed || 0, M = typeof g.total_sell_success == "number" ? g.total_sell_success : _(g.total_payment_success), L = g.total_sell_failed || 0, T = Math.max(0, f - x), B = Math.max(0, x - w - C), E = Math.max(0, C - S), P = Math.max(0, w - $), N = L, Y = Math.max(0, $ - M - N), W = (lt, vt) => {
        const pt = vt > 0 ? Math.round(lt / vt * 100) : 0;
        return `${lt.toLocaleString()} (${pt}%)`;
      }, J = [
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
        label: W(x, f)
      }), T > 0 && tt.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: W(T, f)
      }), w > 0 && tt.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: W(w, f)
      }), C > 0 && tt.push({
        source: "Started",
        target: "Involuntary",
        value: C,
        label: W(C, f)
      }), B > 0 && tt.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: W(B, f)
      }), S > 0 && tt.push({
        source: "Involuntary",
        target: "Accepted",
        value: S,
        label: W(S, f)
      }), E > 0 && tt.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: E,
        label: W(E, f)
      }), $ > 0 && tt.push({
        source: "Voluntary",
        target: "Confirmed",
        value: $,
        label: W($, f)
      }), P > 0 && tt.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: W(P, f)
      }), M > 0 && tt.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: W(M, f)
      }), N > 0 && tt.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: W(N, f)
      }), Y > 0 && tt.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: W(Y, f)
      }), { nodes: J, links: tt };
    }), y = {
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
    return (g, f) => (v(), K(ht, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (v(), k("div", b0, [...f[0] || (f[0] = [
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
        ])])) : (v(), k("div", v0, [
          r("section", y0, [
            r("div", _0, [
              p.value.nodes.length > 0 && p.value.links.length > 0 ? (v(), K(Le, {
                key: 0,
                data: p.value,
                "node-colors": y,
                height: "500px"
              }, null, 8, ["data"])) : (v(), k("div", x0, [...f[1] || (f[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", k0, [
            z(ot, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (v(), k("section", w0, [
            f[2] || (f[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", C0, [
              z(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  r("span", $0, A(F(Pt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: x }) => [
                  r("span", M0, A(F(U)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": I(({ row: x }) => [
                  r("span", S0, [
                    yt(A(F(U)(Number(x.disruption_initiated_count))) + " ", 1),
                    r("span", D0, " (" + A(h(Number(x.disruption_initiated_count), Number(x.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": I(({ row: x }) => [
                  r("span", A0, [
                    r("span", T0, A(F(U)(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count))) + " (" + A(h(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count), Number(x.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": I(({ row: x }) => [
                  r("div", B0, [
                    (v(!0), k(q, null, et([x], (w, C) => (v(), k(q, { key: C }, [
                      z(Nt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: I(() => [
                          yt(" VOL " + A(F(U)(w.voluntary_count)) + " (" + A(h(w.voluntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "success" }, {
                        default: I(() => [
                          yt(" Confirm " + A(F(U)(w.confirmed_count)) + " (" + A(h(w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "warning" }, {
                        default: I(() => [
                          yt(" Not Confirm " + A(F(U)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(w.voluntary_count - w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "danger" }, {
                        default: I(() => [
                          yt(" Reject " + A(F(U)(w.sell_failed_count)) + " (" + A(h(w.sell_failed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "orange" }, {
                        default: I(() => [
                          yt(" Not Paid " + A(F(U)(Math.max(0, w.confirmed_count - m(w) - w.sell_failed_count))) + " (" + A(h(Math.max(0, w.confirmed_count - m(w) - w.sell_failed_count), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: I(() => [
                          yt(" Finish " + A(F(U)(m(w))) + " (" + A(h(m(w), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (v(!0), k(q, null, et(w.payment_success_total || [], (S) => (v(), K(Nt, {
                        key: `${w.date}-${S.currency}`,
                        color: "neutral"
                      }, {
                        default: I(() => [
                          yt(A(S.currency) + " " + A(b(S.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": I(({ row: x }) => [
                  r("div", L0, [
                    (v(!0), k(q, null, et([x], (w, C) => (v(), k(q, { key: C }, [
                      z(Nt, { color: "purple" }, {
                        default: I(() => [
                          yt(" INV " + A(F(U)(w.involuntary_count)) + " (" + A(h(w.involuntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "danger" }, {
                        default: I(() => [
                          yt(" Human " + A(F(U)(w.involuntary_count - w.accepted_count)) + " (" + A(h(w.involuntary_count - w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "success" }, {
                        default: I(() => [
                          yt(" Accept " + A(F(U)(w.accepted_count)) + " (" + A(h(w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (v(), k("section", F0, [...f[3] || (f[3] = [
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
}), P0 = /* @__PURE__ */ at(E0, [["__scopeId", "data-v-c9b67dfc"]]), I0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, R0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, O0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, z0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, V0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, N0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, j0 = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (p) => {
      i("export", p);
    }, c = rt(o, "theme"), { isDark: d } = dt(c), u = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = nt({ labels: [], datasets: [] }), b = D(
      () => o.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), _ = D(() => {
      const p = b.value, y = p.total_airline_information_retrieved + p.total_booking_info_retrieved + p.total_flight_status_retrieved, g = (w) => y > 0 ? (w / y * 100).toFixed(1) : "0.0", f = p.total_faq_events, x = f > 0 ? `${(p.total_documents_found / f * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: u.airline_information,
          value: `${g(p.total_airline_information_retrieved)}%`,
          subvalue: `${U(p.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: u.booking_info,
          value: `${g(p.total_booking_info_retrieved)}%`,
          subvalue: `${U(p.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: u.flight_status,
          value: `${g(p.total_flight_status_retrieved)}%`,
          subvalue: `${U(p.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: U(p.total_documents_found),
          subvalue: x
        }
      ];
    }), m = (p) => {
      if (!p) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const y = p.faq_by_day || [];
      if (y.length > 0) {
        const g = y.map((C) => Pt(C.date).format("MMM DD")), f = y.map((C) => C.airline_information_retrieved_count || 0), x = y.map((C) => C.flight_status_retrieved_count || 0), w = y.map((C) => C.booking_info_retrieved_count || 0);
        h.value = {
          labels: g,
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
              data: x,
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
    return It(
      () => o.data,
      (p) => {
        m(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: d }), (p, y) => (v(), K(ht, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (v(), k("div", I0, [
            r("div", R0, [
              (v(), k(q, null, et(a, (g, f) => r("div", {
                key: f,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[f]]),
                style: gt({ height: `${g}%` })
              }, null, 6)), 64))
            ]),
            y[0] || (y[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (v(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (v(), k("section", O0, [
              r("div", z0, [
                z(ve, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", V0, [
                (v(!0), k(q, null, et(_.value, (g) => (v(), K(ot, {
                  key: g.name,
                  class: "min-w-0",
                  color: g.color,
                  title: g.label,
                  value: g.value,
                  subvalue: g.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (v(), k("section", N0, [...y[1] || (y[1] = [
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
}), W0 = /* @__PURE__ */ at(j0, [["__scopeId", "data-v-791a0ba7"]]), H0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, Y0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, K0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, q0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, U0 = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, X0 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, G0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, Z0 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Q0 = { class: "max-w-[360px] px-4 text-center" }, J0 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, tb = /* @__PURE__ */ Q({
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
    }, i = e, l = n, c = (m) => {
      l("export", m);
    }, d = rt(i, "theme"), { isDark: u } = dt(d), h = D(() => {
      const m = i.data?.agents_by_day || {}, p = Object.keys(m).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const y = /* @__PURE__ */ new Set();
      for (const x of Object.values(m))
        for (const w of Object.keys(x))
          y.add(w);
      const f = Array.from(y).map((x) => {
        const w = x.toLowerCase(), C = o[w] || o[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: p.map((S) => m[S]?.[x] || 0),
          borderColor: C
        };
      });
      return {
        labels: p.map((x) => Pt(x).format("MMM DD")),
        datasets: f
      };
    }), b = D(() => {
      const m = i.data?.agents_by_day || {}, p = {};
      for (const g of Object.values(m))
        for (const [f, x] of Object.entries(g))
          p[f] = (p[f] || 0) + x;
      const y = Object.values(p).reduce((g, f) => g + f, 0);
      return y === 0 ? [] : Object.entries(p).sort(([, g], [, f]) => f - g).map(([g, f]) => {
        const x = g.toLowerCase();
        return {
          name: g,
          label: g.charAt(0).toUpperCase() + g.slice(1).replace(/_/g, " "),
          total: f,
          percentage: (f / y * 100).toFixed(1),
          color: o[x] || o[g] || "#94a3b8"
        };
      });
    }), _ = D(() => b.value.slice(0, 4));
    return t({ isDark: u }), (m, p) => (v(), K(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !i.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: c
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          i.loading ? (v(), k("div", H0, [
            r("div", Y0, [
              (v(), k(q, null, et(a, (y, g) => r("div", {
                key: g,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[g]]),
                style: gt({ height: `${y}%` })
              }, null, 6)), 64))
            ]),
            p[0] || (p[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (v(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (v(), k("section", K0, [
              r("div", q0, [
                z(ve, {
                  data: h.value,
                  options: e.options,
                  theme: d.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              _.value.length ? (v(), k("div", U0, [
                (v(!0), k(q, null, et(_.value, (y) => (v(), K(ot, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${F(U)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])) : O("", !0)
            ])) : b.value.length ? (v(), k("section", X0, [
              r("div", G0, [
                (v(!0), k(q, null, et(_.value, (y) => (v(), K(ot, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${F(U)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : O("", !0),
            b.value.length ? O("", !0) : (v(), k("section", Z0, [
              r("div", Q0, [
                r("div", J0, [
                  z(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                p[1] || (p[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                p[2] || (p[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), eb = /* @__PURE__ */ at(tb, [["__scopeId", "data-v-443fc360"]]), nb = {
  key: 0,
  class: "loading-state"
}, ab = {
  key: 1,
  class: "card-body"
}, sb = {
  key: 0,
  class: "chart-section"
}, ob = {
  key: 1,
  class: "empty-state"
}, ib = {
  key: 2,
  class: "comparison-section"
}, lb = { class: "comparison-grid" }, rb = /* @__PURE__ */ Q({
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
    }, s = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = n, l = (m) => {
      i("export", m);
    }, { isDark: c } = dt(rt(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const d = D(() => {
      const m = /* @__PURE__ */ new Set();
      for (const p of o.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(p.channels))
          m.add(y);
      return Array.from(m).sort();
    }), u = (m, p) => a[m.toLowerCase()] ?? s[p % s.length];
    function h(m) {
      return m.replace(/_/g, " ").toUpperCase();
    }
    function b(m) {
      if (m.delta === null) return "No previous data";
      const p = U(m.previous), y = `${Math.abs(m.delta).toFixed(1)}%`;
      return m.delta === 0 ? `0.0% vs prev. period (${p})` : `${m.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${p})`;
    }
    const _ = D(() => {
      const m = o.data?.sales_by_channel_by_day ?? [];
      if (m.length === 0) return { labels: [], datasets: [] };
      const p = m.map((g) => Pt(g.date).format("MMM-DD")), y = d.value.map((g, f) => ({
        label: g,
        data: m.map((x) => x.channels[g] ?? 0),
        backgroundColor: u(g, f),
        borderRadius: 4
      }));
      return { labels: p, datasets: y };
    });
    return t({ isDark: c }), (m, p) => (v(), K(ht, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (v(), k("div", nb, [...p[0] || (p[0] = [
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
        ])])) : (v(), k("div", ab, [
          _.value.labels.length > 0 ? (v(), k("section", sb, [
            z(me, {
              data: _.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (v(), k("section", ob, [...p[1] || (p[1] = [
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
          e.channelComparison.length > 0 ? (v(), k("section", ib, [
            r("div", lb, [
              (v(!0), k(q, null, et(e.channelComparison, (y, g) => (v(), K(F(ot), {
                key: y.channel,
                color: u(y.channel, g),
                title: h(y.channel),
                value: F(U)(y.current),
                subvalue: b(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Ki = /* @__PURE__ */ at(rb, [["__scopeId", "data-v-1896c562"]]), cb = {
  key: 0,
  class: "loading-state"
}, db = {
  key: 1,
  class: "card-body"
}, ub = {
  key: 0,
  class: "chart-section"
}, hb = { class: "chart-wrapper" }, fb = {
  key: 1,
  class: "empty-state"
}, gb = { class: "seller-value-cards" }, pb = {
  key: 2,
  class: "seller-daily-section"
}, mb = { class: "w-full min-w-0" }, bb = { class: "sl-cell font-medium" }, vb = { class: "sl-cell text-center" }, yb = { class: "sl-cell text-center" }, _b = { class: "sl-cell text-center" }, xb = { class: "sl-cell text-center" }, kb = { class: "sl-cell text-center" }, wb = { class: "sl-cell text-center success-value" }, Cb = {
  key: 0,
  class: "currency-cell-list"
}, $b = {
  key: 1,
  class: "empty-cell"
}, Mb = { class: "sl-cell text-center success-value" }, Sb = { class: "sl-cell text-center" }, Db = { class: "sl-cell text-center success-value" }, Ab = {
  key: 0,
  class: "currency-cell-list"
}, Tb = {
  key: 1,
  class: "empty-cell"
}, Bb = { class: "sl-cell text-center success-value" }, Lb = { class: "sl-cell text-center" }, Fb = { class: "sl-cell text-center success-value" }, Eb = {
  key: 0,
  class: "currency-cell-list"
}, Pb = { key: 1 }, Ib = {
  key: 0,
  class: "failed-reasons"
}, Rb = { class: "reason-name" }, Ob = { class: "reason-count" }, zb = {
  key: 1,
  class: "empty-cell"
}, Vb = /* @__PURE__ */ Q({
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
    }, { isDark: l } = dt(rt(s, "theme")), c = D(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const B = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((E) => {
        const P = B.findIndex((N) => N.date === E.date);
        P !== -1 ? B[P] = { ...B[P], reasons: E.reasons } : B.push({
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
      }), B.sort((E, P) => new Date(E.date).getTime() - new Date(P.date).getTime());
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
    ], u = D(
      () => c.value.map((B) => ({
        id: B.date,
        ...B
      }))
    ), h = D(() => s.sellerData), b = D(() => s.failedData), _ = D(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), m = D(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), p = D(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), y = D(() => {
      const B = _.value;
      return B.length > 0 ? B.map((E) => `${E.currency} ${we(E.total_value)}`).join(" · ") : T(s.sellerData.total_value_sell_success);
    });
    function g(B) {
      return B.length > 0 ? B.map((E) => `${E.currency} ${we(E.total_value)}`).join(" · ") : "—";
    }
    const f = D(
      () => g(m.value)
    ), x = D(
      () => g(p.value)
    ), w = D(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: E = 0,
        total_sell_booking_created: P = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: W = 0,
        total_sell_success_bank_transfer: J = 0,
        total_sell_success_cash: tt = 0
      } = h.value, { failed_by_reason_by_day: lt = [] } = b.value;
      if (B === 0) return { nodes: [], links: [] };
      const vt = Math.max(0, N - (J ?? 0) - (tt ?? 0)), pt = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: E },
        { name: "Booking Created", value: P },
        { name: "Sell Success", value: vt }
      ], ct = [], Mt = B - E;
      if (Mt > 0) {
        const V = Math.round(Mt / B * 100);
        pt.push({ name: "Abandoned (Init)", value: Mt }), ct.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: Mt,
          label: `${Mt.toLocaleString()} (${V}%)`
        });
      }
      if (E > 0) {
        const V = Math.round(E / B * 100);
        ct.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: E,
          label: `${E.toLocaleString()} (${V}%)`
        });
      }
      const st = lt.reduce((V, G) => (G.reasons && Array.isArray(G.reasons) && G.reasons.forEach((Z) => {
        const it = Z.reason, mt = Z.failed_count;
        V[it] = (V[it] || 0) + mt;
      }), V), {});
      if (P > 0) {
        const V = Math.round(P / B * 100);
        ct.push({
          source: "Sell Started",
          target: "Booking Created",
          value: P,
          label: `${P.toLocaleString()} (${V}%)`
        });
      }
      if (Y > 0) {
        const V = Math.round(Y / B * 100);
        pt.push({ name: "Bank Transfer", value: Y }), ct.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: Y,
          label: `${Y.toLocaleString()} (${V}%)`
        });
      }
      if (W > 0) {
        const V = Math.round(W / B * 100);
        pt.push({ name: "Cash Option", value: W }), ct.push({
          source: "Booking Created",
          target: "Cash Option",
          value: W,
          label: `${W.toLocaleString()} (${V}%)`
        });
      }
      if (vt > 0) {
        const V = Math.round(vt / B * 100);
        ct.push({
          source: "Booking Created",
          target: "Sell Success",
          value: vt,
          label: `${vt.toLocaleString()} (${V}%)`
        });
      }
      if ((J ?? 0) > 0) {
        const V = Math.round((J ?? 0) / B * 100);
        pt.push({ name: "Bank Transfer Success", value: J ?? 0 }), ct.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: J ?? 0,
          label: `${(J ?? 0).toLocaleString()} (${V}%)`
        });
      }
      if ((tt ?? 0) > 0) {
        const V = Math.round((tt ?? 0) / B * 100);
        pt.push({ name: "Cash Option Success", value: tt ?? 0 }), ct.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: tt ?? 0,
          label: `${(tt ?? 0).toLocaleString()} (${V}%)`
        });
      }
      const Et = P - vt - Y - W;
      if (Et > 0) {
        const V = Math.round(Et / B * 100);
        pt.push({ name: "Failed at Completion", value: Et }), ct.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Et,
          label: `${Et.toLocaleString()} (${V}%)`
        });
      }
      const At = E - P;
      if (At > 0) {
        const V = Math.round(At / B * 100);
        pt.push({ name: "Failed at Booking", value: At }), ct.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: At,
          label: `${At.toLocaleString()} (${V}%)`
        });
      }
      if (Object.keys(st).length > 0) {
        const V = Object.values(st).reduce((Z, it) => Z + it, 0), G = At - V;
        if (Object.entries(st).filter(([, Z]) => Z > 0).sort(([, Z], [, it]) => it - Z).forEach(([Z, it]) => {
          const mt = Math.round(it / B * 100);
          pt.push({ name: `Failed: ${Z}`, value: it }), ct.push({
            source: "Failed at Booking",
            target: `Failed: ${Z}`,
            value: it,
            label: `${it.toLocaleString()} (${mt}%)`
          });
        }), G > 0) {
          const Z = Math.round(G / B * 100);
          pt.push({ name: "Failed: Without Reason", value: G }), ct.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: G,
            label: `${G.toLocaleString()} (${Z}%)`
          });
        }
      }
      return { nodes: pt, links: ct };
    }), C = {
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
    }, S = D(() => C), $ = (B, E) => !E || E === 0 ? "0%" : `${Math.round(B / E * 100)}%`, M = (B, E) => {
      const P = U(B), N = $(B, E);
      return `${P} (${N})`;
    }, L = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((E, P) => E + (P.total_value || 0), 0) : 0, T = (B) => we(L(B));
    return t({ isDark: l }), (B, E) => (v(), K(ht, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (v(), k("div", cb, [...E[0] || (E[0] = [
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
        ])])) : (v(), k("div", db, [
          w.value.nodes.length > 0 ? (v(), k("section", ub, [
            r("div", hb, [
              z(Le, {
                data: w.value,
                "node-colors": S.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (v(), k("section", fb, [...E[1] || (E[1] = [
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
          r("section", gb, [
            z(ot, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: y.value
            }, null, 8, ["value"]),
            z(ot, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: f.value
            }, null, 8, ["value"]),
            z(ot, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: x.value
            }, null, 8, ["value"])
          ]),
          c.value && c.value.length > 0 ? (v(), k("section", pb, [
            r("div", mb, [
              z(Qt, {
                columns: d,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: P }) => [
                  r("span", bb, A(F(Pt)(String(P.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": I(({ row: P }) => [
                  r("span", vb, A(F(U)(Number(P.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": I(({ row: P }) => [
                  r("span", yb, A(M(P.sell_started_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-getQuote": I(({ row: P }) => [
                  r("span", _b, A(M(P.sell_get_quote_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": I(({ row: P }) => [
                  r("span", xb, A(M(P.sell_booking_created_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": I(({ row: P }) => [
                  r("span", kb, A(F(U)(Number(P.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": I(({ row: P }) => [
                  r("span", wb, [
                    Array.isArray(P.daily_value_sell_success_bank_transfer) && P.daily_value_sell_success_bank_transfer.length > 0 ? (v(), k("div", Cb, [
                      (v(!0), k(q, null, et(P.daily_value_sell_success_bank_transfer, (N) => (v(), k("span", {
                        key: `${P.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(we)(N.total_value)), 1))), 128))
                    ])) : (v(), k("span", $b, "-"))
                  ])
                ]),
                "cell-btSuccess": I(({ row: P }) => [
                  r("span", Mb, A(F(U)(Number(P.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": I(({ row: P }) => [
                  r("span", Sb, A(F(U)(Number(P.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": I(({ row: P }) => [
                  r("span", Db, [
                    Array.isArray(P.daily_value_sell_success_cash) && P.daily_value_sell_success_cash.length > 0 ? (v(), k("div", Ab, [
                      (v(!0), k(q, null, et(P.daily_value_sell_success_cash, (N) => (v(), k("span", {
                        key: `${P.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(we)(N.total_value)), 1))), 128))
                    ])) : (v(), k("span", Tb, "-"))
                  ])
                ]),
                "cell-cashSuccess": I(({ row: P }) => [
                  r("span", Bb, A(F(U)(Number(P.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": I(({ row: P }) => [
                  r("span", Lb, A(M(P.sell_success_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": I(({ row: P }) => [
                  r("span", Fb, [
                    Array.isArray(P.daily_value_sell_success) && P.daily_value_sell_success.length > 0 ? (v(), k("div", Eb, [
                      (v(!0), k(q, null, et(P.daily_value_sell_success, (N) => (v(), k("span", {
                        key: `${P.date}-${N.currency}`
                      }, A(N.currency) + " " + A(F(we)(N.total_value)), 1))), 128))
                    ])) : (v(), k("span", Pb, A(T(P.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": I(({ row: P }) => [
                  (P.reasons || []).length > 0 ? (v(), k("div", Ib, [
                    (v(!0), k(q, null, et(P.reasons || [], (N) => (v(), k("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", Rb, A(N.reason) + ":", 1),
                      r("span", Ob, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (v(), k("div", zb, "-"))
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
}), qi = /* @__PURE__ */ at(Vb, [["__scopeId", "data-v-ac189380"]]), Nb = { class: "seller-container__body" }, jb = /* @__PURE__ */ Q({
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
    function c(d, u) {
      a("export", { source: d, format: u });
    }
    return (d, u) => (v(), K(ht, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", Nb, [
          z(qi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: u[0] || (u[0] = (h) => c("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          z(Ki, {
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
}), Wb = /* @__PURE__ */ at(jb, [["__scopeId", "data-v-878fdbc6"]]), Hb = {
  key: 0,
  class: "card-body"
}, Yb = {
  key: 0,
  class: "chart-section"
}, Kb = {
  key: 1,
  class: "empty-state"
}, qb = { class: "empty-state-content" }, Ub = { class: "empty-icon-wrapper" }, Xb = {
  key: 1,
  class: "loading-state"
}, Gb = /* @__PURE__ */ Q({
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
    }, { isDark: l, colors: c } = dt(rt(s, "theme")), d = D(() => {
      const b = (s.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const _ = b.reduce(
        (y, g) => y + (Number(g.conversations) || 0),
        0
      ), m = b.map((y) => {
        const g = y.agent_type?.toLowerCase();
        return a[g] || "#94a3b8";
      }), p = m.map((y) => `${y}80`);
      return {
        labels: b.map((y) => {
          const g = Number(y.conversations) || 0, f = _ ? g / _ * 100 : 0;
          return `${y.agent_type} - ${g.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: b.map((y) => y.conversations),
            backgroundColor: p,
            borderColor: m,
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
              const b = (h.label || "").toString().split(" - ")[0], _ = Number(h.parsed) || 0, m = (h.dataset.data || []).reduce(
                (y, g) => y + (Number(g) || 0),
                0
              ), p = m ? _ / m * 100 : 0;
              return `${b}: ${_.toLocaleString()} (${p.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, b) => (v(), K(ht, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (v(), k("div", Xb, [...b[2] || (b[2] = [
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
        ])])) : (v(), k("div", Hb, [
          d.value.labels && d.value.labels.length ? (v(), k("section", Yb, [
            z(ia, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (v(), k("section", Kb, [
            r("div", qb, [
              r("div", Ub, [
                z(F(ip), { class: "empty-icon" })
              ]),
              b[0] || (b[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
              b[1] || (b[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }));
  }
}), Zb = /* @__PURE__ */ at(Gb, [["__scopeId", "data-v-bd0d1b11"]]), Qb = {
  key: 0,
  class: "loading-state"
}, Jb = {
  key: 1,
  class: "card-body"
}, tv = {
  key: 0,
  class: "payment-methods-section"
}, ev = { class: "payment-methods-grid" }, nv = {
  key: 1,
  class: "empty-state"
}, av = { class: "empty-state-content" }, sv = { class: "empty-icon-wrapper" }, ov = {
  key: 2,
  class: "payment-method-daily-section"
}, iv = { class: "w-full min-w-0" }, lv = { class: "font-medium" }, rv = { class: "text-center" }, cv = { class: "text-center success-value" }, dv = {
  key: 0,
  class: "currency-cell-list"
}, uv = { class: "payment-tags" }, hv = { class: "tag-name" }, fv = {
  key: 0,
  class: "tag-amount"
}, gv = {
  key: 1,
  class: "tag-amount"
}, pv = { class: "tag-count" }, mv = {
  key: 3,
  class: "empty-table-state"
}, bv = "Not Registered", vv = /* @__PURE__ */ Q({
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
    const a = e, s = n, { isDark: o } = dt(rt(a, "theme")), i = nt(!1), l = nt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), c = D(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), d = D(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = D(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort(($, M) => Pt($.date).valueOf() - Pt(M.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], b = D(
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
      const M = ($.payment_method_breakdown || []).map((T) => ({
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
        payment_method_breakdown: M,
        payment_method_by_day: L
      };
    }, m = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [$, M] = a.dates.map((T) => Pt(T).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, $, M);
          l.value = _(L);
        } catch ($) {
          console.error("Error fetching payment method metrics:", $), l.value = _(null);
        } finally {
          i.value = !1;
        }
      }
    }, p = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], y = ($) => !$ || $.toLowerCase() === "unknown" ? bv : $.replace(/_/g, " "), g = ($) => $ == null ? "$0.00" : xt($), f = ($) => {
      const M = $.total_amount_by_currency;
      return M && M.length > 0 ? M.map((L) => `${L.currency} ${g(L.total_value)}`).join(" · ") : g($.total_amount);
    }, x = ($) => $ ? Pt($).format("MMM DD") : "-", w = ($) => $ == null || Number.isNaN(Number($)) ? 0 : Number($), C = ($) => {
      s("export", $);
    };
    function S() {
      const $ = a.data;
      $ && (Array.isArray($.payment_method_breakdown) && $.payment_method_breakdown.length > 0 || Array.isArray($.payment_method_by_day) && $.payment_method_by_day.length > 0) && (i.value = !1, l.value = _($));
    }
    return oe(() => {
      a.data ? S() : m();
    }), It(
      () => a.data,
      ($) => {
        $ && S();
      },
      { deep: !0 }
    ), It(
      () => a.dates,
      ($) => {
        a.data || $ && $[0] && $[1] && m();
      },
      { deep: !0 }
    ), t({ isDark: o }), ($, M) => (v(), K(ht, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, {
      headerExport: I(() => [
        e.enableExport && !i.value ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: C,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        i.value ? (v(), k("div", Qb, [...M[0] || (M[0] = [
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
        ])])) : (v(), k("div", Jb, [
          c.value ? (v(), k("section", tv, [
            M[1] || (M[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", ev, [
              (v(!0), k(q, null, et(l.value.payment_method_breakdown, (L, T) => (v(), K(ot, {
                key: L.payment_method,
                class: "payment-method-card-item min-w-0",
                color: p[T % p.length],
                title: y(L.payment_method),
                value: f(L),
                subvalue: `${w(L.count)} ${w(L.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (v(), k("section", nv, [
            r("div", av, [
              r("div", sv, [
                z(F(dp), { class: "empty-icon" })
              ]),
              M[2] || (M[2] = r("p", { class: "empty-title" }, "No payment data available", -1)),
              M[3] || (M[3] = r("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          d.value ? (v(), k("section", ov, [
            M[5] || (M[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", iv, [
              z(Qt, {
                columns: h,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: L }) => [
                  r("span", lv, A(x(String(L.date))), 1)
                ]),
                "cell-totalSales": I(({ row: L }) => [
                  r("span", rv, A(F(U)(L.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": I(({ row: L }) => [
                  r("span", cv, [
                    Array.isArray(L.total_amount_by_currency) && L.total_amount_by_currency.length > 0 ? (v(), k("div", dv, [
                      (v(!0), k(q, null, et(L.total_amount_by_currency, (T) => (v(), k("span", {
                        key: `${L.date}-${T.currency}`
                      }, A(T.currency) + " " + A(g(T.total_value)), 1))), 128))
                    ])) : (v(), k(q, { key: 1 }, [
                      yt(A(g(Number(L.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": I(({ row: L }) => [
                  r("div", uv, [
                    (v(!0), k(q, null, et(Array.isArray(L.payment_methods) ? L.payment_methods : [], (T) => (v(), k("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", hv, A(y(T.payment_method)), 1),
                      M[4] || (M[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (v(), k("span", fv, A(g(T.total_amount)), 1)) : (v(), k("span", gv, A(T.total_amount_by_currency.map((B) => `${B.currency} ${g(B.total_value)}`).join(" / ")), 1)),
                      r("span", pv, "(" + A(w(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : c.value ? (v(), k("div", mv, [...M[6] || (M[6] = [
            r("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : O("", !0)
        ]))
      ]),
      _: 1
    }));
  }
}), yv = /* @__PURE__ */ at(vv, [["__scopeId", "data-v-87045b37"]]), _v = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, xv = { class: "overflow-x-auto" }, kv = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, wv = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Cv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, $v = ["checked", "aria-label"], Mv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Sv = ["checked", "aria-label", "onChange"], Dv = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = nt(null);
    function o(f) {
      return `cell-${f}`;
    }
    function i(f) {
      return f === "center" ? "text-center" : f === "right" ? "text-right" : "text-left";
    }
    function l(f, x) {
      if (typeof n.rowKey == "function")
        return n.rowKey(f);
      const w = f[n.rowKey];
      return w != null ? String(w) : `__index_${x}`;
    }
    function c(f, x) {
      return f[x];
    }
    function d(f) {
      return f == null || typeof f == "object" ? "" : String(f);
    }
    function u(f, x) {
      return l(f, x);
    }
    const h = D(() => n.rows.map((f, x) => l(f, x)));
    function b(f, x) {
      const w = l(f, x);
      return n.selectedKeys.includes(w);
    }
    const _ = D(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((f) => n.selectedKeys.includes(f))), m = D(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const f = h.value.filter((x) => n.selectedKeys.includes(x));
      return f.length > 0 && f.length < n.rows.length;
    });
    It(
      [m, _, () => n.selectable],
      async () => {
        await Rt();
        const f = s.value;
        f && (f.indeterminate = m.value && !_.value);
      },
      { immediate: !0 }
    );
    function p() {
      if (n.selectable)
        if (_.value) {
          const f = n.selectedKeys.filter((x) => !h.value.includes(x));
          a("update:selectedKeys", f);
        } else {
          const f = new Set(n.selectedKeys);
          h.value.forEach((x) => f.add(x)), a("update:selectedKeys", [...f]);
        }
    }
    function y(f, x) {
      if (!n.selectable) return;
      const w = l(f, x);
      n.selectedKeys.includes(w) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((S) => S !== w)
      ) : a("update:selectedKeys", [...n.selectedKeys, w]);
    }
    function g(f, x) {
      const w = l(f, x);
      return `${n.ariaLabelSelectRow} ${w}`;
    }
    return (f, x) => (v(), k("div", _v, [
      r("div", xv, [
        r("table", kv, [
          r("thead", null, [
            r("tr", wv, [
              e.selectable ? (v(), k("th", Cv, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: _.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: p
                }, null, 40, $v)
              ])) : O("", !0),
              (v(!0), k(q, null, et(e.columns, (w) => (v(), k("th", {
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
            (v(!0), k(q, null, et(e.rows, (w, C) => (v(), k("tr", {
              key: u(w, C),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (v(), k("td", Mv, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: b(w, C),
                  "aria-label": g(w, C),
                  onChange: (S) => y(w, C)
                }, null, 40, Sv)
              ])) : O("", !0),
              (v(!0), k(q, null, et(e.columns, (S) => (v(), k("td", {
                key: S.key,
                class: H([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                $t(f.$slots, o(S.key), {
                  row: w,
                  column: S,
                  value: c(w, S.key)
                }, () => [
                  yt(A(d(c(w, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Ui = /* @__PURE__ */ at(Dv, [["__scopeId", "data-v-95fc0bc9"]]), Av = {
  key: 0,
  class: "loading-state"
}, Tv = {
  key: 1,
  class: "card-body"
}, Bv = { class: "summary-cards" }, Lv = {
  key: 0,
  class: "summary-card enqueued-card"
}, Fv = { class: "summary-card-content" }, Ev = { class: "card-content enqueued-content" }, Pv = { class: "card-value enqueued-value" }, Iv = { class: "summary-card assigned-card" }, Rv = { class: "summary-card-content" }, Ov = { class: "card-content" }, zv = { class: "card-value assigned-value" }, Vv = { class: "card-content" }, Nv = { class: "card-value assigned-value" }, jv = { class: "summary-card closed-card" }, Wv = { class: "summary-card-content" }, Hv = { class: "card-content" }, Yv = { class: "card-value closed-value" }, Kv = { class: "card-content" }, qv = { class: "card-value closed-value" }, Uv = {
  key: 0,
  class: "agents-section"
}, Xv = { class: "date-header" }, Gv = { class: "date-title" }, Zv = { class: "date-stats" }, Qv = {
  key: 0,
  class: "stat-item enqueued-stat"
}, Jv = { class: "stat-value" }, ty = { class: "stat-item assigned-stat" }, ey = { class: "stat-value" }, ny = { class: "stat-value" }, ay = { class: "stat-item closed-stat" }, sy = { class: "stat-value" }, oy = { class: "stat-value" }, iy = { class: "w-full min-w-0" }, ly = { class: "ah-cell name-cell" }, ry = { class: "ah-cell email-cell" }, cy = { class: "metric-cell-content" }, dy = { class: "badge assigned-badge" }, uy = { class: "metric-cell-avg" }, hy = { class: "metric-cell-content" }, fy = { class: "badge closed-badge" }, gy = { class: "metric-cell-avg" }, py = ["onClick"], my = {
  key: 1,
  class: "empty-state"
}, ka = 3, by = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (M) => {
      s("export", M);
    }, { isDark: i } = dt(rt(a, "theme")), l = D(() => {
      const M = a.data?.agents_by_day && a.data.agents_by_day.length > 0, L = (a.data?.total_enqueued ?? 0) > 0;
      return M || L;
    }), c = D(() => {
      if (!l.value) return {};
      const M = {};
      for (const B of a.data.agents_by_day)
        M[B.date] || (M[B.date] = []), M[B.date].push(B);
      const L = Object.keys(M).sort((B, E) => new Date(B).getTime() - new Date(E).getTime()), T = {};
      for (const B of L)
        T[B] = M[B];
      return T;
    }), d = nt({});
    function u(M) {
      d.value = {
        ...d.value,
        [M]: !d.value[M]
      };
    }
    function h(M, L) {
      return d.value[M] ? L : L.slice(0, ka);
    }
    function b(M) {
      return Math.max(0, M.length - ka);
    }
    function _(M) {
      return M.length > ka;
    }
    const m = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function p(M, L) {
      return h(M, L).map((T, B) => ({
        id: `${M}-${T.agent_email}-${B}`,
        agent_name: T.agent_name,
        agent_email: T.agent_email,
        assigned_count: T.assigned_count,
        closed_count: T.closed_count,
        avg_time_to_assign_seconds: T.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: T.avg_conversation_duration_seconds
      }));
    }
    const y = (M) => M == null ? "0" : U(M), g = (M) => {
      if (M == null)
        return "AVG";
      if (M < 60)
        return `${Math.round(M)}s`;
      const L = Math.round(M), T = Math.floor(L / 60), B = L % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const E = Math.floor(T / 60), P = T % 60;
      return `${E}h ${P}m`;
    }, f = (M) => {
      const L = new Date(M), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return L.toLocaleDateString("en-US", T);
    }, x = (M) => M[0]?.day_total_enqueued ?? 0, w = (M) => M[0]?.day_total_assigned ?? 0, C = (M) => M[0]?.day_total_closed ?? 0, S = (M) => M[0]?.day_avg_time_to_assign_seconds ?? null, $ = (M) => M[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (M, L) => (v(), K(ht, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (v(), k("div", Av, [...L[0] || (L[0] = [
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
        ])])) : (v(), k("div", Tv, [
          r("div", Bv, [
            e.data.total_enqueued ? (v(), k("div", Lv, [
              L[2] || (L[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Fv, [
                r("div", Ev, [
                  L[1] || (L[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", Pv, A(y(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : O("", !0),
            r("div", Iv, [
              L[5] || (L[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Rv, [
                r("div", Ov, [
                  L[3] || (L[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", zv, A(y(e.data.total_assigned)), 1)
                ]),
                r("div", Vv, [
                  L[4] || (L[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", Nv, A(g(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", jv, [
              L[8] || (L[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Wv, [
                r("div", Hv, [
                  L[6] || (L[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", Yv, A(y(e.data.total_closed)), 1)
                ]),
                r("div", Kv, [
                  L[7] || (L[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", qv, A(g(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (v(), k("div", Uv, [
            (v(!0), k(q, null, et(c.value, (T, B) => (v(), k("div", {
              key: B,
              class: "date-group"
            }, [
              r("div", Xv, [
                r("h4", Gv, A(f(B)), 1),
                r("div", Zv, [
                  x(T) ? (v(), k("span", Qv, [
                    r("span", Jv, A(y(x(T))), 1),
                    L[9] || (L[9] = yt(" Enqueued ", -1))
                  ])) : O("", !0),
                  r("span", ty, [
                    r("span", ey, A(y(w(T))), 1),
                    L[10] || (L[10] = yt(" Assigned ", -1)),
                    r("span", ny, A(g(S(T))), 1)
                  ]),
                  r("span", ay, [
                    r("span", sy, A(y(C(T))), 1),
                    L[11] || (L[11] = yt(" Closed ", -1)),
                    r("span", oy, A(g($(T))), 1)
                  ])
                ])
              ]),
              r("div", iy, [
                z(Ui, {
                  columns: m,
                  rows: p(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": I(({ row: E }) => [
                    r("span", ly, A(E.agent_name || "-"), 1)
                  ]),
                  "cell-email": I(({ row: E }) => [
                    r("span", ry, A(E.agent_email), 1)
                  ]),
                  "cell-assigned": I(({ row: E }) => [
                    r("div", cy, [
                      r("span", dy, A(y(Number(E.assigned_count))), 1),
                      r("span", uy, A(g(Number(E.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": I(({ row: E }) => [
                    r("div", hy, [
                      r("span", fy, A(y(Number(E.closed_count))), 1),
                      r("span", gy, A(g(Number(E.avg_conversation_duration_seconds))), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              _(T) ? (v(), k("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (E) => u(String(B))
              }, [
                yt(A(d.value[B] ? "View less" : `View more (${b(T)} rows)`) + " ", 1),
                (v(), k("svg", {
                  class: H(["view-more-icon", { "view-more-icon-rotated": d.value[B] }]),
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
              ], 8, py)) : O("", !0)
            ]))), 128))
          ])) : (v(), k("div", my, [...L[13] || (L[13] = [
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
}), vy = /* @__PURE__ */ at(by, [["__scopeId", "data-v-e74dc150"]]), yy = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, _y = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, xy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ky = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, wy = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, Cy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, $y = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, My = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Sy = { class: "max-w-[360px] px-4 text-center" }, Dy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ay = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (y) => {
      i("export", y);
    }, c = rt(o, "theme"), { isDark: d } = dt(c), u = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = nt({ labels: [], datasets: [] }), b = D(
      () => o.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), _ = D(() => {
      const y = b.value.total_by_channel || {}, g = Object.values(y).reduce((f, x) => f + x, 0);
      return g === 0 ? [] : Object.entries(y).sort(([, f], [, x]) => x - f).map(([f, x]) => ({
        name: f,
        label: f.toUpperCase(),
        total: x,
        percentage: (x / g * 100).toFixed(1),
        color: u[f.toLowerCase()] || "#9ca3af"
      }));
    }), m = D(() => _.value.slice(0, 4)), p = (y) => {
      if (!y || !y.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const g = y.channels_by_day, f = Object.keys(g).sort();
      if (f.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const S of Object.values(g))
        for (const $ of Object.keys(S))
          x.add($);
      const C = Array.from(x).map((S) => {
        const $ = S.toLowerCase(), M = u[$] || "#9ca3af";
        return {
          label: S.toUpperCase(),
          data: f.map((L) => g[L]?.[S] || 0),
          borderColor: M
        };
      });
      h.value = {
        labels: f.map((S) => Pt(S).format("MMM DD")),
        datasets: C
      };
    };
    return It(
      () => o.data,
      (y) => {
        p(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: d }), (y, g) => (v(), K(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Channel",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (v(), k("div", yy, [
            r("div", _y, [
              (v(), k(q, null, et(a, (f, x) => r("div", {
                key: x,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[x]]),
                style: gt({ height: `${f}%` })
              }, null, 6)), 64))
            ]),
            g[0] || (g[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (v(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (v(), k("section", xy, [
              r("div", ky, [
                z(ve, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              m.value.length ? (v(), k("div", wy, [
                (v(!0), k(q, null, et(m.value, (f) => (v(), K(ot, {
                  key: f.name,
                  class: "min-w-0",
                  color: f.color,
                  title: f.label,
                  value: `${f.percentage}%`,
                  subvalue: `${F(U)(f.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])) : O("", !0)
            ])) : _.value.length ? (v(), k("section", Cy, [
              r("div", $y, [
                (v(!0), k(q, null, et(m.value, (f) => (v(), K(ot, {
                  key: f.name,
                  class: "min-w-0",
                  color: f.color,
                  title: f.label,
                  value: `${f.percentage}%`,
                  subvalue: `${F(U)(f.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : O("", !0),
            _.value.length ? O("", !0) : (v(), k("section", My, [
              r("div", Sy, [
                r("div", Dy, [
                  z(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                g[1] || (g[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                g[2] || (g[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), Ty = /* @__PURE__ */ at(Ay, [["__scopeId", "data-v-d8c2846f"]]), By = {
  key: 0,
  class: "card-body"
}, Ly = { class: "chart-container" }, Fy = { class: "triage-table-block w-full min-w-0" }, Ey = { class: "triage-row-label" }, Py = {
  key: 1,
  class: "triage-count"
}, Iy = {
  key: 1,
  class: "triage-count"
}, Ry = {
  key: 1,
  class: "triage-count"
}, Oy = {
  key: 1,
  class: "triage-count"
}, zy = {
  key: 1,
  class: "triage-count"
}, Vy = {
  key: 1,
  class: "empty-state"
}, Ny = { class: "empty-state-content" }, jy = { class: "empty-icon-wrapper" }, Wy = {
  key: 1,
  class: "loading-state"
}, Hy = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), c = D(() => {
      const x = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [C, S] of Object.entries(x)) {
        const $ = C.split("+").filter(Boolean);
        if (!$.includes("triage")) continue;
        const M = $.filter((L) => L !== "triage").length;
        M >= 4 ? w["4p"] += Number(S) || 0 : w[M] += Number(S) || 0;
      }
      return w;
    }), d = D(() => {
      const x = c.value;
      return x[0] + x[1] + x[2] + x[3] + x["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const x = d.value;
      if (!x) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = c.value;
      return {
        pct0: w[0] / x * 100,
        pct1: w[1] / x * 100,
        pct2: w[2] / x * 100,
        pct3: w[3] / x * 100,
        pct4p: w["4p"] / x * 100
      };
    }), b = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], _ = D(() => {
      const x = h.value, w = c.value;
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
    }, p = (x) => x?.replace("80", "") || "#888888", y = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: m.c0,
          borderColor: p(m.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: m.c1,
          borderColor: p(m.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: m.c2,
          borderColor: p(m.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: m.c3,
          borderColor: p(m.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: m.c4p,
          borderColor: p(m.c4p),
          borderWidth: 1
        }
      ]
    })), g = D(() => ({
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
    })), f = (x) => `${(Number(x) || 0).toFixed(0)}`;
    return t({ isDark: i }), (x, w) => (v(), K(ht, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (v(), k("div", Wy, [...w[2] || (w[2] = [
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
        ])])) : (v(), k("div", By, [
          u.value ? (v(), k(q, { key: 0 }, [
            r("div", Ly, [
              z(me, {
                data: y.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            z(ot, {
              class: "w-full min-w-0",
              title: "Total",
              value: F(U)(d.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", Fy, [
              z(Qt, {
                columns: b,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": I(({ row: C }) => [
                  r("span", Ey, A(C.metric), 1)
                ]),
                "cell-b0": I(({ row: C }) => [
                  C.id === "pct" ? (v(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: p(m.c0) })
                  }, A(f(Number(C.b0))) + "%", 5)) : (v(), k("span", Py, A(F(U)(Number(C.b0))), 1))
                ]),
                "cell-b1": I(({ row: C }) => [
                  C.id === "pct" ? (v(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: p(m.c1) })
                  }, A(f(Number(C.b1))) + "%", 5)) : (v(), k("span", Iy, A(F(U)(Number(C.b1))), 1))
                ]),
                "cell-b2": I(({ row: C }) => [
                  C.id === "pct" ? (v(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: p(m.c2) })
                  }, A(f(Number(C.b2))) + "%", 5)) : (v(), k("span", Ry, A(F(U)(Number(C.b2))), 1))
                ]),
                "cell-b3": I(({ row: C }) => [
                  C.id === "pct" ? (v(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: p(m.c3) })
                  }, A(f(Number(C.b3))) + "%", 5)) : (v(), k("span", Oy, A(F(U)(Number(C.b3))), 1))
                ]),
                "cell-b4p": I(({ row: C }) => [
                  C.id === "pct" ? (v(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: p(m.c4p) })
                  }, A(f(Number(C.b4p))) + "%", 5)) : (v(), k("span", zy, A(F(U)(Number(C.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (v(), k("div", Vy, [
            r("div", Ny, [
              r("div", jy, [
                z(F(Kt), { class: "empty-icon" })
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
}), Yy = /* @__PURE__ */ at(Hy, [["__scopeId", "data-v-d684dd65"]]), Ky = {
  key: 0,
  class: "loading-state"
}, qy = {
  key: 1,
  class: "card-body"
}, Uy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, Xy = { class: "pie-section" }, Gy = {
  key: 1,
  class: "empty-state"
}, Zy = /* @__PURE__ */ Q({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = [
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
    }, l = (_) => i[_]?.label || _.toUpperCase(), c = D(
      () => n.data?.items && n.data.items.length > 0
    ), d = D(
      () => (n.data?.items || []).reduce((_, m) => _ + m.count, 0)
    ), u = D(() => {
      const _ = {};
      for (const m of n.data?.items || [])
        _[m.language] = (_[m.language] || 0) + m.count;
      return Object.entries(_).map(([m, p]) => ({ language: m, count: p })).sort((m, p) => p.count - m.count);
    }), h = D(() => ({
      labels: u.value.map((_) => l(_.language)),
      datasets: [{
        data: u.value.map((_) => _.count),
        backgroundColor: u.value.map((_, m) => o[m % o.length] + "80"),
        borderColor: u.value.map((_, m) => o[m % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), b = D(() => ({
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
              const m = _.raw || 0, p = d.value > 0 ? (m / d.value * 100).toFixed(1) : "0";
              return ` ${_.label}: ${m} (${p}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (_, m) => (v(), K(ht, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: I(() => [
        n.loading ? (v(), k("div", Ky, [...m[0] || (m[0] = [
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
        ])])) : (v(), k("div", qy, [
          c.value ? (v(), k("div", Uy, [
            r("section", Xy, [
              z(ia, {
                data: h.value,
                options: b.value
              }, null, 8, ["data", "options"])
            ]),
            z(ot, {
              class: "shrink-0",
              title: "Total",
              value: F(U)(d.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (v(), k("section", Gy, [...m[1] || (m[1] = [
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
}), Qy = /* @__PURE__ */ at(Zy, [["__scopeId", "data-v-8c32a3b3"]]), Jy = {
  key: 0,
  class: "loading-state"
}, t1 = {
  key: 1,
  class: "card-body"
}, e1 = {
  key: 0,
  class: "guardrails-daily-section"
}, n1 = { class: "w-full min-w-0" }, a1 = { class: "font-medium" }, s1 = { class: "font-semibold" }, o1 = { class: "type-badges-row" }, i1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, l1 = {
  key: 1,
  class: "empty-state"
}, r1 = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, { isDark: i } = dt(rt(a, "theme")), l = D(
      () => a.data?.items && a.data.items.length > 0
    ), c = D(
      () => (a.data?.items || []).reduce((y, g) => y + g.count, 0)
    ), d = (y) => {
      const g = {};
      for (const w of a.data?.items || [])
        g[w[y]] = (g[w[y]] || 0) + w.count;
      const f = Object.entries(g).sort((w, C) => C[1] - w[1]);
      if (f.length === 0) return { name: "—", pct: 0 };
      const x = c.value;
      return {
        name: f[0][0],
        pct: x > 0 ? Math.round(f[0][1] / x * 100) : 0
      };
    }, u = D(() => d("guardrail_type")), h = D(() => d("guardrail_action")), b = D(() => d("guardrail_source")), _ = D(() => {
      const y = {};
      for (const g of a.data?.items || [])
        y[g.date] || (y[g.date] = {}), y[g.date][g.guardrail_type] = (y[g.date][g.guardrail_type] || 0) + g.count;
      return Object.entries(y).map(([g, f]) => ({
        date: g,
        total: Object.values(f).reduce((x, w) => x + w, 0),
        types: Object.entries(f).map(([x, w]) => ({ type: x, count: w })).sort((x, w) => w.count - x.count)
      })).sort((g, f) => new Date(g.date).getTime() - new Date(f.date).getTime());
    }), m = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], p = D(
      () => _.value.map((y) => ({
        id: y.date,
        date: y.date,
        total: y.total,
        types: y.types
      }))
    );
    return t({ isDark: i }), (y, g) => (v(), K(ht, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (v(), k("div", Jy, [...g[0] || (g[0] = [
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
        ])])) : (v(), k("div", t1, [
          l.value ? (v(), k(q, { key: 0 }, [
            _.value.length > 0 ? (v(), k("section", e1, [
              r("div", n1, [
                z(Qt, {
                  columns: m,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": I(({ row: f }) => [
                    r("span", a1, A(F(Pt)(String(f.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": I(({ row: f }) => [
                    r("span", s1, A(F(U)(f.total)), 1)
                  ]),
                  "cell-types": I(({ row: f }) => [
                    r("div", o1, [
                      (v(!0), k(q, null, et(f.types, (x) => (v(), k("span", {
                        key: x.type,
                        class: "type-count-badge"
                      }, A(x.type) + " (" + A(x.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("section", i1, [
              z(ot, {
                title: "Total Events",
                value: F(U)(c.value)
              }, null, 8, ["value"]),
              z(ot, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                title: "Top source",
                value: b.value.name,
                subvalue: b.value.pct > 0 ? `(${b.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (v(), k("section", l1, [...g[1] || (g[1] = [
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
}), c1 = /* @__PURE__ */ at(r1, [["__scopeId", "data-v-88422424"]]), d1 = {
  key: 0,
  class: "loading-state"
}, u1 = {
  key: 1,
  class: "card-body"
}, h1 = { class: "chart-section" }, f1 = { class: "chart-wrapper" }, g1 = {
  key: 1,
  class: "empty-chart"
}, p1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, m1 = {
  key: 0,
  class: "dn-failure-section"
}, b1 = { class: "w-full min-w-0" }, v1 = { class: "failure-reason" }, y1 = { class: "failure-count" }, _1 = { class: "impact-bar-container" }, x1 = { class: "impact-label" }, k1 = { class: "dn-trend-health-block flex flex-col gap-0" }, w1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, C1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, $1 = { class: "system-health" }, M1 = { class: "system-health-content" }, S1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, D1 = {
  key: 1,
  class: "empty-state"
}, A1 = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), c = D(() => {
      const S = a.data?.documentCounts?.items || [], $ = a.data?.processingCounts?.items || [];
      return S.length > 0 || $.length > 0;
    }), d = D(() => {
      const S = a.data?.documentCounts?.items || [];
      return {
        processing_started: S.reduce(($, M) => $ + M.processing_started, 0),
        processing_completed: S.reduce(($, M) => $ + M.processing_completed, 0),
        processing_failed: S.reduce(($, M) => $ + M.processing_failed, 0),
        row_count_total: S.reduce(($, M) => $ + M.row_count_total, 0)
      };
    }), u = D(() => {
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
        totalDqErrors: S.reduce(($, M) => $ + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other, 0)
      };
    }), h = D(() => d.value.row_count_total || u.value.processing_started), b = D(() => Math.max(0, h.value - u.value.notification_sent)), _ = (S, $) => $ ? `${Math.round(S / $ * 100)}%` : "0%", m = D(() => {
      const S = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter(($) => $.count > 0).sort(($, M) => M.count - $.count);
      return S.length > 0 ? S[0] : { reason: "None", count: 0 };
    }), p = D(() => {
      const S = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map(($) => ({
        ...$,
        impactPct: S > 0 ? Math.round($.count / S * 100) : 0
      }));
    }), y = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], g = D(
      () => p.value.map((S) => ({
        id: S.reason,
        reason: S.reason,
        count: S.count,
        impactPct: S.impactPct
      }))
    ), f = D(() => {
      const S = h.value, $ = u.value.processing_success, M = Math.max(0, $ - u.value.totalDqErrors), L = u.value.notification_sent, T = Math.max(0, S - $), B = u.value.totalDqErrors, E = Math.max(0, M - L), P = (W, J) => {
        const tt = J > 0 ? Math.round(W / J * 100) : 0;
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
      return $ > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: $, label: P($, S) }), T > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: P(T, S) }), M > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: M, label: P(M, S) }), B > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: P(B, S) }), L > 0 && Y.push({ source: "Contactable", target: "Notified", value: L, label: P(L, S) }), E > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: E, label: P(E, S) }), { nodes: N, links: Y };
    }), x = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = D(() => {
      const S = [...a.data?.processingCounts?.items || []].sort(
        (P, N) => new Date(P.date).getTime() - new Date(N.date).getTime()
      ), $ = a.data?.documentCounts?.items || [], M = {};
      for (const P of $)
        M[P.date] = (M[P.date] || 0) + P.row_count_total;
      const L = [.../* @__PURE__ */ new Set([...S.map((P) => P.date), ...$.map((P) => P.date)])].sort(), T = L.map((P) => Pt(P).format("MMM DD")), B = L.map((P) => {
        const N = S.find((J) => J.date === P), Y = N?.notification_sent || 0, W = M[P] || N?.processing_started || 0;
        return W > 0 ? Math.round(Y / W * 100) : 0;
      }), E = L.map((P) => S.find((Y) => Y.date === P)?.notification_sent || 0);
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
    }), C = D(() => ({
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
    return t({ isDark: i }), (S, $) => (v(), K(ht, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (v(), k("div", d1, [...$[0] || ($[0] = [
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
        ])])) : (v(), k("div", u1, [
          c.value ? (v(), k(q, { key: 0 }, [
            r("section", h1, [
              $[2] || ($[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", f1, [
                f.value.nodes.length > 0 && f.value.links.length > 0 ? (v(), K(Le, {
                  key: 0,
                  data: f.value,
                  "node-colors": x,
                  height: "350px"
                }, null, 8, ["data"])) : (v(), k("div", g1, [...$[1] || ($[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", p1, [
              z(ot, {
                color: "#3b82f6",
                title: "Total Records",
                value: F(U)(d.value.row_count_total)
              }, null, 8, ["value"]),
              z(ot, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: F(U)(h.value)
              }, null, 8, ["value"]),
              z(ot, {
                color: "#10b981",
                title: "Successfully Notified",
                value: F(U)(u.value.notification_sent),
                subvalue: _(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                color: "#ef4444",
                title: "Not Notified",
                value: F(U)(b.value),
                subvalue: _(b.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: m.value.reason,
                subvalue: m.value.count > 0 ? `${F(U)(m.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            p.value.length > 0 ? (v(), k("section", m1, [
              $[3] || ($[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", b1, [
                z(Qt, {
                  columns: y,
                  rows: g.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": I(({ row: M }) => [
                    r("span", v1, A(M.reason), 1)
                  ]),
                  "cell-count": I(({ row: M }) => [
                    r("span", y1, A(F(U)(M.count)), 1)
                  ]),
                  "cell-impact": I(({ row: M }) => [
                    r("div", _1, [
                      r("div", {
                        class: "impact-bar",
                        style: gt({ width: M.impactPct + "%" })
                      }, null, 4),
                      r("span", x1, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("div", k1, [
              w.value.labels.length > 0 ? (v(), k("section", w1, [
                $[4] || ($[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", C1, [
                  z(ve, {
                    data: w.value,
                    options: C.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : O("", !0),
              r("details", $1, [
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
                r("div", M1, [
                  r("div", S1, [
                    z(ot, {
                      title: "Docs Started",
                      value: F(U)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Docs Completed",
                      value: F(U)(d.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Docs Failed",
                      value: F(U)(d.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Processing Started",
                      value: F(U)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Processing Success",
                      value: F(U)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Notification Failed",
                      value: F(U)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (v(), k("section", D1, [...$[6] || ($[6] = [
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
}), T1 = /* @__PURE__ */ at(A1, [["__scopeId", "data-v-b99a7ade"]]), B1 = { class: "highlight-inner" }, L1 = {
  key: 0,
  class: "loading-state"
}, F1 = {
  key: 1,
  class: "card-body"
}, E1 = { class: "metric-value" }, P1 = /* @__PURE__ */ Q({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), s = D(() => U(n.totalConversations)), o = D(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const d = n.previousTotalConversations;
      return d === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - d) / d * 100;
    }), l = D(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (v(), K(ht, {
      title: "",
      collapsible: !1,
      class: H(["total-conv-metric", "w-full", { "total-conv-metric--dark": F(a) }])
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
        !e.loading && o.value ? (v(), k("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", B1, [
          e.loading ? (v(), k("div", L1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (v(), k("div", F1, [
            r("span", E1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), I1 = /* @__PURE__ */ at(P1, [["__scopeId", "data-v-f7e693e9"]]), R1 = { class: "highlight-inner" }, O1 = {
  key: 0,
  class: "loading-state"
}, z1 = {
  key: 1,
  class: "card-body"
}, V1 = { class: "metric-value" }, N1 = /* @__PURE__ */ Q({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), s = D(() => `${n.csatP95.toFixed(1)}`), o = D(
      () => n.previousCsatP95 !== null && n.previousCsatP95 !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const d = n.previousCsatP95;
      return d === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - d) / d * 100;
    }), l = D(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (v(), K(ht, {
      collapsible: !1,
      class: H(["csat-p95-metric", "w-full", { "csat-p95-metric--dark": F(a) }])
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
        !e.loading && o.value ? (v(), k("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", R1, [
          e.loading ? (v(), k("div", O1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (v(), k("div", z1, [
            r("span", V1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), j1 = /* @__PURE__ */ at(N1, [["__scopeId", "data-v-86f3d7c7"]]), W1 = {
  key: 0,
  class: "loading-state"
}, H1 = {
  key: 1,
  class: "card-body"
}, Y1 = { class: "chart-wrapper" }, K1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, q1 = {
  key: 2,
  class: "empty-state"
}, U1 = 500, X1 = 60, G1 = 80, Z1 = {
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
    }, o = e, { isDark: i } = dt(rt(o, "theme")), l = D(() => o.data), c = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (v(), K(ht, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (v(), k("div", W1, [...u[0] || (u[0] = [
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
        ])])) : l.value && l.value.total_nps_responses > 0 ? (v(), k("div", H1, [
          r("div", Y1, [
            z(Oi, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": c.value,
              "chart-height": U1,
              "chart-margin": X1,
              "chart-bottom-margin": G1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", K1, [
            z(ot, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (v(), K(ot, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : O("", !0)
          ])
        ])) : (v(), k("div", q1, [...u[1] || (u[1] = [
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
}, Xi = /* @__PURE__ */ at(Z1, [["__scopeId", "data-v-9076e01c"]]), Q1 = {
  key: 0,
  class: "loading-state"
}, J1 = {
  key: 1,
  class: "card-body"
}, t_ = { class: "tooltip-content" }, e_ = { class: "tooltip-title" }, n_ = { class: "tooltip-stats" }, a_ = { class: "tooltip-stat-row" }, s_ = { class: "tooltip-value" }, o_ = { class: "tooltip-stat-row" }, i_ = { class: "tooltip-value" }, l_ = { class: "tooltip-stat-row" }, r_ = { class: "tooltip-value" }, c_ = { class: "tooltip-stat-row" }, d_ = { class: "tooltip-value" }, u_ = { class: "tooltip-stat-row" }, h_ = { class: "tooltip-value" }, f_ = { class: "tooltip-stat-row" }, g_ = { class: "tooltip-value" }, p_ = { class: "mt-4 flex w-full justify-start" }, m_ = {
  key: 2,
  class: "empty-state"
}, To = 400, ln = 60, Bo = 90, Lo = 120, b_ = {
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
    const a = n, s = (y) => {
      a("export", y);
    }, o = e, { isDark: i } = dt(rt(o, "theme")), l = D(() => o.data), c = nt(null), d = nt({
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
      const y = l.value.nps_by_day.length;
      return Math.max(800, ln * 2 + y * Lo);
    }), h = (y, g) => {
      const x = (y - 1) / 9;
      return ln + g - x * g;
    }, b = (y) => y ? Pt(y).format("DD-MM-YYYY") : "", _ = D(() => {
      if (!l.value || !l.value.nps_by_day || l.value.nps_by_day.length === 0)
        return [];
      const y = [], g = To - ln - Bo;
      return l.value.nps_by_day.forEach((f, x) => {
        const w = f.min_score || 0, C = f.q1_score || 0, S = f.median_score || 0, $ = f.q3_score || 0, M = f.max_score || 0, L = f.average_score || 0;
        y.push({
          label: b(f.date),
          responseCount: f.nps_responses_count || 0,
          isTotal: !1,
          low: w,
          q1: C,
          median: S,
          q3: $,
          high: M,
          average: L,
          highY: h(M, g),
          lowY: h(w, g),
          q1Y: h(C, g),
          q3Y: h($, g),
          medianY: h(S, g),
          averageY: L > 0 ? h(L, g) : null,
          centerX: ln + (x + 1) * Lo
        });
      }), y;
    }), m = (y, g) => {
      if (!c.value || !g || g.horizontal) return;
      const f = c.value.getBoundingClientRect(), x = y.clientX, w = y.clientY, C = 140, S = 160, $ = 10, M = 15;
      let L = x - f.left - C / 2, T = w - f.top - S - M;
      L = Math.max($, Math.min(L, f.width - C - $)), T < $ && (T = w - f.top + M), T = Math.max($, Math.min(T, f.height - S - $)), d.value = {
        visible: !0,
        x: L,
        y: T,
        date: g.label || "",
        min: g.low !== void 0 ? g.low.toFixed(1) : "N/A",
        max: g.high !== void 0 ? g.high.toFixed(1) : "N/A",
        q1: g.open !== void 0 ? g.open.toFixed(1) : "N/A",
        avg: g.average !== void 0 && g.average > 0 ? g.average.toFixed(1) : "N/A",
        q3: g.close !== void 0 ? g.close.toFixed(1) : "N/A",
        median: g.median !== void 0 ? g.median.toFixed(1) : "N/A"
      };
    }, p = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (y, g) => (v(), K(ht, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT Daily Metrics",
      subtitle: "Daily CSAT Distribution",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (v(), k("div", Q1, [...g[0] || (g[0] = [
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
        ])])) : l.value && l.value.nps_by_day && l.value.nps_by_day.length > 0 ? (v(), k("div", J1, [
          r("div", {
            class: "chart-wrapper",
            ref_key: "chartContainerRef",
            ref: c
          }, [
            _.value && _.value.length > 0 ? (v(), K(Ri, {
              key: 0,
              "candlestick-data": _.value,
              "chart-width": u.value,
              "chart-height": To,
              "chart-margin": ln,
              "chart-bottom-margin": Bo,
              "show-legend": !0,
              rotation: 0,
              "candle-width": 30,
              onCandleHover: m,
              onCandleLeave: p
            }, null, 8, ["candlestick-data", "chart-width"])) : O("", !0),
            d.value.visible ? (v(), k("div", {
              key: 1,
              class: "tooltip-overlay",
              style: gt({
                left: `${d.value.x}px`,
                top: `${d.value.y}px`
              })
            }, [
              r("div", t_, [
                r("div", e_, A(d.value.date), 1),
                g[7] || (g[7] = r("div", { class: "tooltip-divider" }, null, -1)),
                r("div", n_, [
                  r("div", a_, [
                    g[1] || (g[1] = r("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                    r("span", s_, A(d.value.min), 1)
                  ]),
                  r("div", o_, [
                    g[2] || (g[2] = r("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                    r("span", i_, A(d.value.q1), 1)
                  ]),
                  r("div", l_, [
                    g[3] || (g[3] = r("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                    r("span", r_, A(d.value.median), 1)
                  ]),
                  r("div", c_, [
                    g[4] || (g[4] = r("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                    r("span", d_, A(d.value.avg), 1)
                  ]),
                  r("div", u_, [
                    g[5] || (g[5] = r("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                    r("span", h_, A(d.value.q3), 1)
                  ]),
                  r("div", f_, [
                    g[6] || (g[6] = r("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                    r("span", g_, A(d.value.max), 1)
                  ])
                ])
              ])
            ], 4)) : O("", !0)
          ], 512),
          r("div", p_, [
            z(ot, {
              title: "Days",
              value: String(l.value.nps_by_day.length),
              class: "min-w-0 w-full max-w-xs"
            }, null, 8, ["value"])
          ])
        ])) : (v(), k("div", m_, [...g[8] || (g[8] = [
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
      _: 1
    }));
  }
}, Gi = /* @__PURE__ */ at(b_, [["__scopeId", "data-v-ea5a3e73"]]), v_ = { class: "nps-metrics-container" }, y_ = {
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
    return (s, o) => (v(), k("div", v_, [
      z(Xi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      z(Gi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Zi = /* @__PURE__ */ at(y_, [["__scopeId", "data-v-25fe3b80"]]), __ = { class: "csat-container__body" }, x_ = /* @__PURE__ */ Q({
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
    return (s, o) => (v(), K(ht, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", __, [
          z(Zi, {
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
}), k_ = /* @__PURE__ */ at(x_, [["__scopeId", "data-v-29e9904b"]]), w_ = { class: "highlight-inner" }, C_ = {
  key: 0,
  class: "loading-state"
}, $_ = {
  key: 1,
  class: "card-body"
}, M_ = { class: "metric-row" }, S_ = { class: "metric-currency" }, D_ = { class: "metric-value" }, A_ = /* @__PURE__ */ Q({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), s = D(() => we(n.totalRevenue)), o = D(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const d = n.previousTotalRevenue;
      return d === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - d) / d * 100;
    }), l = D(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (v(), K(ht, {
      collapsible: !1,
      class: H(["ai-revenue-metric", "w-full", { "ai-revenue-metric--dark": F(a) }])
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
        !e.loading && o.value ? (v(), k("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", w_, [
          e.loading ? (v(), k("div", C_, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (v(), k("div", $_, [
            r("div", M_, [
              r("span", S_, A(n.currencyCode), 1),
              r("span", D_, A(s.value), 1)
            ]),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "AI Revenue", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), T_ = /* @__PURE__ */ at(A_, [["__scopeId", "data-v-6a1564d6"]]), B_ = { class: "flex justify-end" }, L_ = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, F_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, E_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, P_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, I_ = { class: "flex flex-wrap gap-4" }, R_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, O_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, z_ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, V_ = { class: "truncate" }, N_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, j_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, W_ = /* @__PURE__ */ Q({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = [30, 50, 70, 50, 40], i = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], l = rt(a, "theme"), { isDark: c } = dt(l), d = nt(a.breakdownBy), u = D(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), h = nt({ labels: [], datasets: [] }), b = nt([]), _ = nt([]), m = ["#3b82f6", "#f59e0b", "#06b6d4", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"], p = (x) => m[x % m.length], y = () => {
      s("changeBreakdown", d.value);
    }, g = (x) => {
      if (!x) return "";
      const C = x.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return C ? C.charAt(0).toUpperCase() + C.slice(1) : "";
    }, f = (x) => {
      if (d.value === "all") {
        const T = x?.escalations_by_day ?? [];
        if (!T.length) {
          h.value = { labels: [], datasets: [] }, b.value = [], _.value = [];
          return;
        }
        const B = [...T].sort((E, P) => E.date.localeCompare(P.date));
        h.value = {
          labels: B.map((E) => Pt(E.date).format("MMM DD")),
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
        }, b.value = [], _.value = [];
        return;
      }
      const w = x?.breakdown_by_day ?? [], C = x?.breakdown_items ?? [];
      if (!w.length) {
        h.value = { labels: [], datasets: [] }, b.value = [], _.value = [];
        return;
      }
      const S = [...w].sort((T, B) => T.date.localeCompare(B.date)), $ = C.slice(0, 5).map((T) => T.key), M = S.map((T) => Pt(T.date).format("MMM DD")), L = $.map((T, B) => {
        const E = C.find((P) => P.key === T);
        return {
          label: g(E?.label || T),
          data: S.map((P) => {
            const N = P.items.find((Y) => Y.key === T);
            return Number(N?.percentage || 0);
          }),
          borderColor: p(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      h.value = {
        labels: M,
        datasets: L
      }, b.value = C.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        percentage: Number(T.percentage || 0),
        color: p(B)
      })), _.value = C.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        color: p(B)
      }));
    };
    return It(
      () => a.data,
      (x) => {
        f(x ?? null);
      },
      { deep: !0, immediate: !0 }
    ), It(
      () => a.breakdownBy,
      (x) => {
        d.value = x, f(u.value);
      }
    ), t({ isDark: c }), (x, w) => (v(), K(ht, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1
    }, {
      headerAside: I(() => [
        r("div", B_, [
          Zt(r("select", {
            "onUpdate:modelValue": w[0] || (w[0] = (C) => d.value = C),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [...w[1] || (w[1] = [
            r("option", { value: "all" }, "All", -1),
            r("option", { value: "agent" }, "By Agent", -1),
            r("option", { value: "channel" }, "By Channel", -1),
            r("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [ol, d.value]
          ])
        ])
      ]),
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (v(), k("div", L_, [
            r("div", F_, [
              (v(), k(q, null, et(o, (C, S) => r("div", {
                key: S,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70", i[S]]),
                style: gt({ height: `${C}%` })
              }, null, 6)), 64))
            ]),
            w[2] || (w[2] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading human escalations... ", -1))
          ])) : (v(), k(q, { key: 1 }, [
            h.value.labels && h.value.labels.length && h.value.datasets.length ? (v(), k("section", E_, [
              r("div", P_, [
                z(ve, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", I_, [
                (v(!0), k(q, null, et(_.value, (C) => (v(), k("div", {
                  key: `legend-${C.key}`,
                  class: "inline-flex items-center gap-2 text-sm"
                }, [
                  r("span", {
                    class: "inline-block h-2.5 w-2.5 rounded-full",
                    style: gt({ backgroundColor: C.color })
                  }, null, 4),
                  r("span", R_, A(C.label), 1)
                ]))), 128))
              ]),
              r("div", O_, [
                (v(!0), k(q, null, et(b.value, (C) => (v(), k("div", {
                  key: `card-${C.key}`,
                  class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                }, [
                  r("p", z_, [
                    r("span", {
                      class: "inline-block h-2.5 w-2.5 rounded-full",
                      style: gt({ backgroundColor: C.color })
                    }, null, 4),
                    r("span", V_, A(C.label), 1)
                  ]),
                  r("p", N_, A(C.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (v(), k("section", j_, [...w[3] || (w[3] = [
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
}), H_ = /* @__PURE__ */ at(W_, [["__scopeId", "data-v-809d3c8c"]]), Y_ = { class: "highlight-inner" }, K_ = {
  key: 0,
  class: "loading-state"
}, q_ = {
  key: 1,
  class: "card-body"
}, U_ = { class: "metric-value" }, X_ = /* @__PURE__ */ Q({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e) {
    const t = e, { isDark: n } = dt(rt(t, "theme")), a = D(() => `${Number(t.escalationRatePercentage || 0).toFixed(2)}%`), s = D(
      () => t.previousEscalationRatePercentage !== null && t.previousEscalationRatePercentage !== void 0
    ), o = D(() => {
      if (!s.value) return 0;
      const c = t.previousEscalationRatePercentage;
      return c === 0 ? t.escalationRatePercentage > 0 ? 100 : 0 : (t.escalationRatePercentage - c) / c * 100;
    }), i = D(() => {
      const c = o.value.toFixed(1);
      return o.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), l = D(() => o.value > 0 ? "change-badge--up" : o.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return (c, d) => (v(), K(ht, {
      collapsible: !1,
      class: H(["human-escalations-metric", "w-full", { "human-escalations-metric--dark": F(n) }])
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
        !e.loading && s.value ? (v(), k("div", {
          key: 0,
          class: H(["change-badge", l.value])
        }, A(i.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", Y_, [
          e.loading ? (v(), k("div", K_, [...d[1] || (d[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (v(), k("div", q_, [
            r("span", U_, A(a.value), 1),
            d[2] || (d[2] = r("span", { class: "metric-label" }, "Human Escalations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), G_ = /* @__PURE__ */ at(X_, [["__scopeId", "data-v-a4480f29"]]), Z_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, J_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, tx = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, ex = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, nx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, ax = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, sx = { class: "max-w-[360px] text-center" }, ox = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, ix = {
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
    const t = e, { isDark: n, colors: a } = dt(rt(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = D(() => {
      const d = t.data ?? {}, u = d.daily, h = d.days, b = Array.isArray(u) && u.length > 0, _ = Array.isArray(h) && h.length > 0 && Array.isArray(d.allocatedCostSeries) && d.allocatedCostSeries.length === h.length;
      let m = [];
      return b ? m = u : _ && (m = h.map((p, y) => ({
        date: p,
        allocated_cost: d.allocatedCostSeries[y] ?? 0,
        aws_cost: d.awsCostSeries[y] ?? 0,
        airline_conversations: d.airlineConversationsSeries[y] ?? 0
      }))), {
        daily: m,
        total_allocated_cost: d.total_allocated_cost ?? d.totalAllocated ?? 0,
        total_cost: d.total_cost ?? d.total ?? 0,
        total_conversations: d.total_conversations ?? d.totalConversations ?? 0,
        total_airline_conversations: d.total_airline_conversations ?? d.totalAirlineConversations ?? 0,
        airline_name: d.airline_name
      };
    }), l = D(() => {
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
    }), c = D(() => ({
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
              return d.dataset.yAxisID === "y" ? u + xt(h) : u + String(h);
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
            callback: (d) => xt(d)
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
    return (d, u) => (v(), K(ht, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Z_, [
          e.loading ? (v(), k("div", Q_, [
            r("div", J_, [
              (v(), k(q, null, et(s, (h, b) => r("div", {
                key: b,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[b]]),
                style: gt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            u[0] || (u[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (v(), k("div", tx, [
            r("div", ex, [
              z(ve, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: c.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", nx, [
              z(ot, {
                color: F(a).primaryLight,
                title: "Total Allocated",
                value: F(xt)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(ot, {
                color: "#FF9900",
                title: "Total AWS",
                value: F(xt)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (v(), k("section", ax, [
            r("div", sx, [
              r("div", ox, [
                z(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, lx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, rx = {
  key: 0,
  class: "card-body"
}, cx = {
  key: 0,
  class: "chart-section"
}, dx = { class: "chart-container" }, ux = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, hx = {
  key: 1,
  class: "empty-state"
}, fx = { class: "empty-state-content" }, gx = { class: "empty-icon-wrapper" }, px = {
  key: 1,
  class: "loading-state"
}, rn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Fo = 10, mx = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = dt(rt(a, "theme")), i = (m) => {
      const p = new Date(m), y = String(p.getDate()).padStart(2, "0"), g = String(p.getMonth() + 1).padStart(2, "0");
      return `${y}-${g}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = D(() => {
      const m = a.data?.costs_by_day || {};
      return Object.values(m).reduce((p, y) => p + (y.input_cost || 0), 0);
    }), d = D(() => {
      const m = a.data?.costs_by_day || {};
      return Object.values(m).reduce((p, y) => p + (y.output_cost || 0), 0);
    }), u = D(() => {
      const m = a.data?.costs_by_day || {};
      return Object.values(m).reduce((p, y) => p + (y.cache_read_cost || 0), 0);
    }), h = D(() => {
      const m = a.data?.costs_by_day || {};
      return Object.values(m).reduce((p, y) => p + (y.cache_write_cost || 0), 0);
    }), b = D(() => {
      const m = a.data?.costs_by_day || {}, p = Object.keys(m).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const y = p.map((f) => i(f)), g = [
        {
          label: "Input Cost",
          data: p.map((f) => m[f]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: p.map((f) => m[f]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: p.map((f) => m[f]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: p.map((f) => m[f]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: g
      };
    }), _ = D(() => a.options ? a.options : {
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
              family: rn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Fo,
            boxHeight: Fo,
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
            family: rn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: rn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(m) {
              let p = m.dataset.label || "";
              return p && (p += ": "), m.parsed.y !== null && (p += xt(m.parsed.y)), p;
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
            font: { family: rn, size: 12, weight: "500" },
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
            font: { family: rn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(m) {
              return xt(m);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (m, p) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", lx, [
          e.loading ? (v(), k("div", px, [...p[2] || (p[2] = [
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
          ])])) : (v(), k("div", rx, [
            b.value.labels && b.value.labels.length ? (v(), k("section", cx, [
              r("div", dx, [
                z(me, {
                  data: b.value,
                  options: _.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", ux, [
                z(ot, {
                  title: "Total Cost",
                  value: F(xt)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(ot, {
                  title: "Input Cost",
                  value: F(xt)(c.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Output Cost",
                  value: F(xt)(d.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Cache Read",
                  value: F(xt)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Cache Write",
                  value: F(xt)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Avg / Conv.",
                  value: F(xt)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (v(), k("section", hx, [
              r("div", fx, [
                r("div", gx, [
                  z(F(Kt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = r("p", { class: "empty-title" }, "No cost usage data", -1)),
                p[1] || (p[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), bx = /* @__PURE__ */ at(mx, [["__scopeId", "data-v-39a5448c"]]), vx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yx = {
  key: 0,
  class: "card-body"
}, _x = {
  key: 0,
  class: "chart-section"
}, xx = { class: "chart-container" }, kx = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, wx = {
  key: 1,
  class: "empty-state"
}, Cx = { class: "empty-state-content" }, $x = { class: "empty-icon-wrapper" }, Mx = {
  key: 1,
  class: "loading-state"
}, cn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Eo = 10, Sx = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = dt(rt(a, "theme")), i = (u) => {
      const h = new Date(u), b = String(h.getDate()).padStart(2, "0"), _ = String(h.getMonth() + 1).padStart(2, "0");
      return `${b}-${_}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const b = h.map((m) => i(m)), _ = [
        {
          label: "Input Tokens",
          data: h.map((m) => u[m]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((m) => u[m]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((m) => u[m]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((m) => u[m]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: _
      };
    }), d = D(() => a.options ? a.options : {
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
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Eo,
            boxHeight: Eo,
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
            family: cn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: cn,
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
            font: { family: cn, size: 12, weight: "500" },
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
            font: { family: cn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (u, h) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", vx, [
          e.loading ? (v(), k("div", Mx, [...h[2] || (h[2] = [
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
          ])])) : (v(), k("div", yx, [
            c.value.labels && c.value.labels.length ? (v(), k("section", _x, [
              r("div", xx, [
                z(me, {
                  data: c.value,
                  options: d.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", kx, [
                z(ot, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: F(U)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(ot, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: F(U)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ot, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: F(U)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ot, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: F(U)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ot, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: F(U)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (v(), k("section", wx, [
              r("div", Cx, [
                r("div", $x, [
                  z(F(Kt), { class: "empty-icon" })
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
}), Dx = /* @__PURE__ */ at(Sx, [["__scopeId", "data-v-70c6f3c7"]]), Ax = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tx = {
  key: 0,
  class: "card-body"
}, Bx = {
  key: 0,
  class: "chart-section"
}, Lx = { class: "chart-container" }, Fx = { class: "mt-4 w-full min-w-0" }, Ex = {
  key: 1,
  class: "empty-state"
}, Px = { class: "empty-state-content" }, Ix = { class: "empty-icon-wrapper" }, Rx = {
  key: 1,
  class: "loading-state"
}, Ox = /* @__PURE__ */ Q({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(
      () => U(n.data?.total_conversations ?? 0)
    ), l = D(() => {
      const d = n.data?.conversations_by_day || {}, u = Object.keys(d).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const h = u.map((_) => o(_)), b = [
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
        datasets: b
      };
    }), c = D(() => n.options ? n.options : {
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
    return t({ isDark: a }), (d, u) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Ax, [
          e.loading ? (v(), k("div", Rx, [...u[2] || (u[2] = [
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
          ])])) : (v(), k("div", Tx, [
            l.value.labels && l.value.labels.length ? (v(), k("section", Bx, [
              r("div", Lx, [
                z(ve, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", Fx, [
                z(ot, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (v(), k("section", Ex, [
              r("div", Px, [
                r("div", Ix, [
                  z(F(Kt), { class: "empty-icon" })
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
}), zx = /* @__PURE__ */ at(Ox, [["__scopeId", "data-v-b33e8627"]]), Vx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Nx = {
  key: 0,
  class: "card-body"
}, jx = {
  key: 0,
  class: "charts-grid"
}, Wx = { class: "chart-section" }, Hx = { class: "chart-container" }, Yx = { class: "chart-section" }, Kx = { class: "chart-container" }, qx = {
  key: 1,
  class: "empty-state"
}, Ux = { class: "empty-state-content" }, Xx = { class: "empty-icon-wrapper" }, Gx = {
  key: 1,
  class: "loading-state"
}, Zx = /* @__PURE__ */ Q({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = D(() => n.data?.top_agents && n.data.top_agents.length > 0), i = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((b, _) => (_.total_cost || 0) - (b.total_cost || 0)) : []), l = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((b, _) => (_.total_tokens || 0) - (b.total_tokens || 0)) : []), c = D(() => {
      const b = i.value;
      return b.length === 0 ? { labels: [], datasets: [] } : {
        labels: b.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: b.map((_) => _.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = D(() => {
      const b = l.value;
      return b.length === 0 ? { labels: [], datasets: [] } : {
        labels: b.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: b.map((_) => _.total_tokens || 0),
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
            title: function(b) {
              return b[0]?.label || "";
            },
            label: function(b) {
              const _ = b.label, m = n.data?.top_agents?.find((p) => p.agent_type === _);
              return m ? [
                `Total Cost: ${xt(m.total_cost)}`,
                `Input Cost: ${xt(m.total_input_tokens_cost)}`,
                `Output Cost: ${xt(m.total_output_tokens_cost)}`,
                `Cache Read: ${xt(m.total_read_tokens_cost)}`,
                `Cache Write: ${xt(m.total_write_tokens_cost)}`
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
            callback: function(b) {
              return xt(b);
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
            title: function(b) {
              return b[0]?.label || "";
            },
            label: function(b) {
              const _ = b.label, m = n.data?.top_agents?.find((p) => p.agent_type === _);
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
            callback: function(b) {
              return b.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (b, _) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Vx, [
          e.loading ? (v(), k("div", Gx, [..._[4] || (_[4] = [
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
          ])])) : (v(), k("div", Nx, [
            o.value ? (v(), k("div", jx, [
              r("section", Wx, [
                _[0] || (_[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", Hx, [
                  z(me, {
                    data: c.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", Yx, [
                _[1] || (_[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", Kx, [
                  z(me, {
                    data: d.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (v(), k("section", qx, [
              r("div", Ux, [
                r("div", Xx, [
                  z(F(Kt), { class: "empty-icon" })
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
}), Qx = /* @__PURE__ */ at(Zx, [["__scopeId", "data-v-a5014772"]]), Jx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, tk = {
  key: 0,
  class: "card-body"
}, ek = {
  key: 0,
  class: "chart-section"
}, nk = { class: "chart-container" }, ak = {
  key: 1,
  class: "empty-state"
}, sk = { class: "empty-state-content" }, ok = { class: "empty-icon-wrapper" }, ik = {
  key: 1,
  class: "loading-state"
}, lk = /* @__PURE__ */ Q({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = {
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
    ) : []), l = D(() => i.value.length > 0), c = D(() => i.value.reduce((h, b) => h + (b.conversations || 0), 0)), d = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const b = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return (o[y] || "#a78bfa") + "80";
      }), _ = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return o[y] || "#a78bfa";
      });
      return {
        labels: h.map((p) => {
          const y = p.conversations || 0, g = c.value ? y / c.value * 100 : 0;
          return `${p.agent_type} - ${y.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((p) => p.conversations || 0),
            backgroundColor: b,
            borderColor: _,
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
              const b = (h.label || "").toString(), _ = Number(h.parsed) || 0, m = (h.dataset.data || []).reduce((y, g) => y + (Number(g) || 0), 0), p = m ? _ / m * 100 : 0;
              return `${b}: ${_.toLocaleString()} (${p.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, b) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Jx, [
          e.loading ? (v(), k("div", ik, [...b[2] || (b[2] = [
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
          ])])) : (v(), k("div", tk, [
            l.value ? (v(), k("section", ek, [
              r("div", nk, [
                z(ia, {
                  data: d.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (v(), k("section", ak, [
              r("div", sk, [
                r("div", ok, [
                  z(F(Kt), { class: "empty-icon" })
                ]),
                b[0] || (b[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                b[1] || (b[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), rk = /* @__PURE__ */ at(lk, [["__scopeId", "data-v-14445b91"]]), ck = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, dk = {
  key: 0,
  class: "card-body"
}, uk = {
  key: 0,
  class: "chart-section"
}, hk = { class: "chart-container" }, fk = {
  key: 1,
  class: "empty-state"
}, gk = { class: "empty-state-content" }, pk = { class: "empty-icon-wrapper" }, mk = {
  key: 1,
  class: "loading-state"
}, bk = /* @__PURE__ */ Q({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(() => {
      const d = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), l = D(() => {
      const d = n.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const y = [...d].sort((g, f) => g.date.localeCompare(f.date));
        return {
          labels: y.map((g) => o(g.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: y.map((g) => Number(g.value) || 0),
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
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, _ = Object.keys(u).filter((y) => h[y]).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const m = _.map((y) => o(y)), p = _.map((y) => {
        const g = u[y]?.total_cost || 0, f = h[y] || 0;
        return f > 0 ? g / f : 0;
      });
      return {
        labels: m,
        datasets: [
          {
            label: "Mean USD/conv",
            data: p,
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
    }), c = D(() => n.options ? n.options : {
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
              return u && (u += ": "), d.parsed.y !== null && (u += xt(d.parsed.y)), u;
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
              return xt(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", ck, [
          e.loading ? (v(), k("div", mk, [...u[2] || (u[2] = [
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
          ])])) : (v(), k("div", dk, [
            i.value ? (v(), k("section", uk, [
              r("div", hk, [
                z(ve, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (v(), k("section", fk, [
              r("div", gk, [
                r("div", pk, [
                  z(F(Kt), { class: "empty-icon" })
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
}), vk = /* @__PURE__ */ at(bk, [["__scopeId", "data-v-1e8204ea"]]);
function Yt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const yk = { class: "tabs text-sm" }, _k = ["aria-label"], xk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], kk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, wk = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = nt([]), o = `tabs-${Yt()}`, i = (m) => `${o}-tab-${m}`, l = D(
      () => n.items.map((m, p) => m.disabled ? -1 : p).filter((m) => m >= 0)
    );
    function c(m) {
      return m.value === n.modelValue;
    }
    function d(m) {
      const p = c(m), g = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return m.disabled ? `${g} cursor-not-allowed opacity-40` : p ? `${g} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${g} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(m, p) {
      m === p || n.items.find((g) => g.value === m)?.disabled || (a("update:modelValue", m), a("change", { value: m, previousValue: p }));
    }
    function h(m, p) {
      a("tab-click", { value: m.value, originalEvent: p }), !m.disabled && (u(m.value, n.modelValue), Rt(() => {
        s.value[n.items.indexOf(m)]?.focus();
      }));
    }
    function b(m, p) {
      const y = n.items.length;
      if (y === 0) return 0;
      let g = m;
      for (let f = 0; f < y; f++)
        if (g = (g + p + y) % y, !n.items[g]?.disabled) return g;
      return m;
    }
    async function _(m, p) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(m.key)) return;
      m.preventDefault();
      let g = p;
      m.key === "ArrowLeft" ? g = b(p, -1) : m.key === "ArrowRight" ? g = b(p, 1) : m.key === "Home" ? g = l.value[0] ?? 0 : m.key === "End" && (g = l.value[l.value.length - 1] ?? p);
      const f = n.items[g];
      !f || f.disabled || (u(f.value, n.modelValue), await Rt(), s.value[g]?.focus());
    }
    return (m, p) => (v(), k("div", yk, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: H([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (v(!0), k(q, null, et(e.items, (y, g) => (v(), k("button", {
          id: i(y.value),
          key: y.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": c(y),
          "aria-disabled": y.disabled === !0,
          tabindex: c(y) ? 0 : -1,
          class: H(d(y)),
          onClick: (f) => h(y, f),
          onKeydown: (f) => _(f, g)
        }, [
          r("span", {
            class: H(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (v(), K(Xe(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            r("span", kk, A(y.label), 1)
          ], 2)
        ], 42, xk))), 128))
      ], 10, _k),
      m.$slots.default ? (v(), K(gn, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: I(() => [
          (v(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            $t(m.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), Qi = /* @__PURE__ */ at(wk, [["__scopeId", "data-v-f9c367eb"]]), Ck = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $k = {
  key: 0,
  class: "loading-state"
}, Mk = {
  key: 1,
  class: "card-body"
}, Sk = {
  key: 0,
  class: "model-usage-table-block"
}, Dk = { class: "w-full min-w-0" }, Ak = {
  key: 1,
  class: "empty-state"
}, Tk = { class: "empty-state-content" }, Bk = { class: "empty-icon-wrapper" }, Lk = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = dt(rt(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], c = nt("by_model"), d = D(() => c.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), u = D(() => [
      { key: "name", label: c.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = D(
      () => Object.entries(d.value).map(([m, p]) => ({
        id: m,
        name: m,
        avgCost: _(p.avg_cost_per_message),
        avgTokens: b(p.avg_tokens_per_message),
        messageCount: b(p.message_count),
        totalCost: _(p.total_cost),
        totalTokens: b(p.total_tokens)
      }))
    ), b = (m) => m == null ? "0" : U(m), _ = (m) => m == null ? "$0.00" : xt(m);
    return t({ isDark: i }), (m, p) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", Ck, [
          e.loading ? (v(), k("div", $k, [...p[1] || (p[1] = [
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
          ])])) : (v(), k("div", Mk, [
            z(Qi, {
              modelValue: c.value,
              "onUpdate:modelValue": p[0] || (p[0] = (y) => c.value = y),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: I(() => [
                d.value && Object.keys(d.value).length > 0 ? (v(), k("div", Sk, [
                  r("div", Dk, [
                    z(Qt, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (v(), k("div", Ak, [
                  r("div", Tk, [
                    r("div", Bk, [
                      z(F(Kt), { class: "empty-icon" })
                    ]),
                    p[2] || (p[2] = r("p", { class: "empty-title" }, "No model usage data available", -1)),
                    p[3] || (p[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), Fk = /* @__PURE__ */ at(Lk, [["__scopeId", "data-v-0c23d620"]]), Ek = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Pk = {
  key: 0,
  class: "loading-state"
}, Ik = {
  key: 1,
  class: "card-body"
}, Rk = {
  key: 0,
  class: "message-roles-table-block"
}, Ok = { class: "w-full min-w-0" }, zk = {
  key: 1,
  class: "empty-state"
}, Vk = { class: "empty-state-content" }, Nk = { class: "empty-icon-wrapper" }, jk = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (p) => {
      s("export", p);
    }, { isDark: i } = dt(rt(a, "theme")), l = ["assistant", "system", "user"], c = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], d = D(() => a.data?.total_by_role || {}), u = D(
      () => l.map((p) => ({
        id: p,
        role: m(p),
        avgCost: _(d.value[p]?.avg_cost_per_message),
        avgTokens: b(d.value[p]?.avg_tokens_per_message),
        messageCount: b(d.value[p]?.message_count),
        totalCost: _(d.value[p]?.total_cost),
        totalTokens: b(d.value[p]?.total_tokens)
      }))
    ), h = D(() => Object.keys(d.value).length > 0), b = (p) => p == null ? "0" : U(p), _ = (p) => p == null ? "$0.00" : xt(p), m = (p) => p.charAt(0).toUpperCase() + p.slice(1);
    return t({ isDark: i }), (p, y) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", Ek, [
          e.loading ? (v(), k("div", Pk, [...y[0] || (y[0] = [
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
          ])])) : (v(), k("div", Ik, [
            h.value ? (v(), k("div", Rk, [
              r("div", Ok, [
                z(Qt, {
                  columns: c,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (v(), k("div", zk, [
              r("div", Vk, [
                r("div", Nk, [
                  z(F(Kt), { class: "empty-icon" })
                ]),
                y[1] || (y[1] = r("p", { class: "empty-title" }, "No message role data available", -1)),
                y[2] || (y[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Wk = /* @__PURE__ */ at(jk, [["__scopeId", "data-v-362c0dbc"]]), Hk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Yk = {
  key: 0,
  class: "card-body"
}, Kk = {
  key: 0,
  class: "chart-section"
}, qk = { class: "chart-container" }, Uk = { class: "kpi-grid" }, Xk = {
  key: 1,
  class: "empty-state"
}, Gk = { class: "empty-state-content" }, Zk = { class: "empty-icon-wrapper" }, Qk = {
  key: 1,
  class: "loading-state"
}, Jk = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), c = {
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
      const x = d(f).toLowerCase();
      for (const [w, C] of Object.entries(c))
        if (x.includes(w))
          return C;
      return "#9ca3af";
    }, b = D(() => [...a.data?.top_agents || []].sort((x, w) => w.avg_cost_per_conversation - x.avg_cost_per_conversation)), _ = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : b.value.reduce((f, x) => f + x.conversations, 0)), m = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : b.value.reduce((f, x) => f + x.total_cost, 0)), p = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : _.value === 0 ? 0 : m.value / _.value), y = D(() => {
      const f = b.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const x = f.map((S) => u(S)), w = f.map((S) => S.avg_cost_per_conversation), C = f.map((S) => h(S));
      return {
        labels: x,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: C.map((S) => `${S}80`),
            borderColor: C,
            borderWidth: 1
          }
        ]
      };
    }), g = D(() => a.options ? a.options : {
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
              const x = b.value[f.dataIndex];
              return [
                `Cost: ${xt(f.parsed.x)}`,
                `Conversations: ${U(x.conversations)}`,
                `Total Cost: ${xt(x.total_cost)}`
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
    return t({ isDark: i }), (f, x) => (v(), K(ht, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (v(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", Hk, [
          e.loading ? (v(), k("div", Qk, [...x[2] || (x[2] = [
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
          ])])) : (v(), k("div", Yk, [
            y.value.labels && y.value.labels.length ? (v(), k("section", Kk, [
              r("div", qk, [
                z(me, {
                  data: y.value,
                  options: g.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Uk, [
                z(F(ot), {
                  title: "Total Agents",
                  value: String(b.value.length)
                }, null, 8, ["value"]),
                z(F(ot), {
                  title: "Total Conversations",
                  value: F(U)(_.value)
                }, null, 8, ["value"]),
                z(F(ot), {
                  title: "Total Cost",
                  value: F(xt)(m.value)
                }, null, 8, ["value"]),
                z(F(ot), {
                  title: "Avg Cost / Conv.",
                  value: F(xt)(p.value)
                }, null, 8, ["value"])
              ])
            ])) : (v(), k("section", Xk, [
              r("div", Gk, [
                r("div", Zk, [
                  z(F(Kt), { class: "empty-icon" })
                ]),
                x[0] || (x[0] = r("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                x[1] || (x[1] = r("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), t2 = /* @__PURE__ */ at(Jk, [["__scopeId", "data-v-49068ad7"]]);
function e2(e, t) {
  return v(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function n2(e, t) {
  return v(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const a2 = ["aria-label"], s2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, o2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, i2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, l2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], r2 = { class: "truncate" }, c2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, d2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, u2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, h2 = ["aria-label", "onClick"], f2 = ["aria-label", "onClick"], g2 = ["aria-label"], p2 = ["aria-label"], m2 = {
  key: 1,
  class: "space-y-2"
}, b2 = ["for"], v2 = ["id", "placeholder", "onKeydown"], y2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, _2 = ["aria-label"], x2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, k2 = ["checked", "onChange"], w2 = { class: "min-w-0 flex-1" }, C2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, $2 = { class: "flex flex-wrap items-end gap-2" }, M2 = { class: "min-w-[120px] flex-1" }, S2 = ["for"], D2 = ["id"], A2 = { class: "min-w-[120px] flex-1" }, T2 = ["for"], B2 = ["id"], L2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = Ea(), i = `${`kiut-filters-${Yt()}`}-panel`, l = nt(null), c = /* @__PURE__ */ new Map(), d = nt(null), u = nt(!1), h = nt({}), b = nt(null), _ = nt(""), m = nt([]), p = nt(""), y = nt(""), g = D(() => d.value ? n.filterDefinitions.find((R) => R.id === d.value) ?? null : null), f = D(() => {
      const R = g.value;
      if (R)
        return R.type === "text" ? _.value : R.type === "select" ? m.value : { start: p.value, end: y.value };
    });
    function x(R, j) {
      j && j instanceof HTMLElement ? c.set(R, j) : c.delete(R);
    }
    function w(R) {
      return n.modelValue[R];
    }
    function C(R) {
      if (R == null) return [];
      if (Array.isArray(R))
        return R.filter((j) => typeof j == "string" && j.trim() !== "");
      if (typeof R == "string") {
        const j = R.trim();
        return j ? [j] : [];
      }
      return [];
    }
    function S(R, j) {
      if (j == null) return !0;
      if (R.type === "text") return String(j).trim() === "";
      if (R.type === "select") return C(j).length === 0;
      if (R.type === "dateRange") {
        const X = j;
        return !X?.start?.trim() || !X?.end?.trim();
      }
      return !0;
    }
    const $ = D(
      () => n.filterDefinitions.some((R) => !S(R, w(R.id)))
    ), M = D(() => {
      const R = [];
      for (const j of n.filterDefinitions) {
        const X = w(j.id);
        if (!S(j, X)) {
          if (j.type === "text")
            R.push({ kind: "text", def: j, key: j.id });
          else if (j.type === "dateRange")
            R.push({ kind: "dateRange", def: j, key: j.id });
          else if (j.type === "select")
            for (const ft of C(X))
              R.push({
                kind: "select",
                def: j,
                optionValue: ft,
                key: `${j.id}::${ft}`
              });
        }
      }
      return R;
    });
    function L(R) {
      return R.type !== "select" ? 0 : C(w(R.id)).length;
    }
    function T(R) {
      const j = w(R.id), X = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${X}: ${String(j ?? "").trim()}`;
      if (R.type === "select") {
        const el = C(j).map((ss) => R.options.find((nl) => nl.value === ss)?.label ?? ss);
        return `${X}: ${el.join(", ")}`;
      }
      const ft = j, Gt = E(ft.start), xe = E(ft.end);
      return `${X}: ${Gt} – ${xe}`;
    }
    function B(R) {
      return R.kind === "text" || R.kind === "dateRange" ? T(R.def) : R.def.options.find((X) => X.value === R.optionValue)?.label ?? R.optionValue;
    }
    function E(R) {
      if (!R) return "";
      const j = Pt(R, "YYYY-MM-DD", !0);
      return j.isValid() ? j.format("L") : R;
    }
    function P(R) {
      const j = d.value === R.id && u.value, X = !S(R, w(R.id));
      return j || X ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(R) {
      return S(R, w(R.id)) ? mt(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function Y(R) {
      const j = w(R.id);
      if (R.type === "text") {
        _.value = j != null ? String(j) : "";
        return;
      }
      if (R.type === "select") {
        m.value = [...C(j)];
        return;
      }
      const X = j;
      p.value = X?.start?.trim() ?? "", y.value = X?.end?.trim() ?? "";
    }
    function W() {
      const R = g.value;
      if (!R || R.type !== "select") return;
      const j = { ...n.modelValue };
      m.value.length === 0 ? delete j[R.id] : j[R.id] = [...m.value], a("update:modelValue", j), a("change", j);
    }
    function J(R) {
      const j = m.value.indexOf(R);
      j >= 0 ? m.value = m.value.filter((X, ft) => ft !== j) : m.value = [...m.value, R], W();
    }
    function tt(R) {
      if (!R) return;
      b.value = R;
      const j = R.getBoundingClientRect(), X = 300;
      let ft = j.left;
      const Gt = window.innerWidth - X - 12;
      ft > Gt && (ft = Math.max(12, Gt)), ft < 12 && (ft = 12);
      const xe = j.bottom + 8;
      h.value = {
        top: `${xe}px`,
        left: `${ft}px`,
        width: `${Math.min(X, window.innerWidth - 24)}px`
      };
    }
    function lt(R, j) {
      if (d.value === R.id && u.value) {
        st();
        return;
      }
      u.value && d.value !== R.id && st(), d.value = R.id, u.value = !0, Y(R), Rt().then(async () => {
        tt(j.currentTarget), await Rt(), pt();
      });
    }
    function vt(R, j) {
      if (d.value === R.id && u.value) {
        st();
        return;
      }
      u.value && d.value !== R.id && st(), d.value = R.id, u.value = !0, Y(R), Rt().then(async () => {
        const X = c.get(R.id) ?? j.currentTarget;
        tt(X), await Rt(), pt();
      });
    }
    function pt() {
      const R = l.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function ct() {
      u.value = !1, d.value = null, b.value = null;
    }
    function Mt(R) {
      const j = g.value;
      if (!j) return;
      if (j.type === "text") {
        _.value = R != null ? String(R) : "";
        return;
      }
      if (j.type === "select") {
        m.value = Array.isArray(R) ? R.filter((ft) => typeof ft == "string") : C(R);
        return;
      }
      const X = R;
      p.value = X?.start?.trim() ?? "", y.value = X?.end?.trim() ?? "";
    }
    function st() {
      const R = g.value;
      if (!R) return;
      if (R.type === "text") {
        const Gt = _.value.trim(), xe = { ...n.modelValue };
        Gt === "" ? delete xe[R.id] : xe[R.id] = Gt, a("update:modelValue", xe), a("change", xe), ct();
        return;
      }
      if (R.type === "select") {
        W(), ct();
        return;
      }
      const j = p.value.trim(), X = y.value.trim(), ft = { ...n.modelValue };
      !j || !X || j > X ? delete ft[R.id] : ft[R.id] = { start: j, end: X }, a("update:modelValue", ft), a("change", ft), ct();
    }
    function Et(R) {
      const j = { ...n.modelValue };
      delete j[R], a("update:modelValue", j), a("change", j), d.value === R && ct();
    }
    function At(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        Et(R.def.id);
        return;
      }
      const j = { ...n.modelValue }, ft = C(j[R.def.id]).filter((Gt) => Gt !== R.optionValue);
      ft.length === 0 ? delete j[R.def.id] : j[R.def.id] = ft, a("update:modelValue", j), a("change", j), d.value === R.def.id && Y(R.def);
    }
    function V() {
      const R = {};
      a("update:modelValue", R), a("change", R), ct();
    }
    const G = D(() => {
      const R = g.value;
      return R ? `Editar filtro: ${R.label}` : "Filtro";
    });
    function Z(R) {
      const j = R.def.label.replace(/^\+\s*/, "");
      return R.kind === "select" ? `Quitar ${R.def.options.find((Gt) => Gt.value === R.optionValue)?.label ?? R.optionValue} del filtro ${j}` : `Quitar filtro ${j}`;
    }
    function it(R) {
      const j = R.def.label.replace(/^\+\s*/, "");
      if (R.kind === "select") {
        const ft = R.def.options.find((Gt) => Gt.value === R.optionValue)?.label ?? R.optionValue;
        return `Editar filtro ${j}: ${ft}`;
      }
      return `Editar filtro ${j}`;
    }
    function mt(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const bt = D(() => n.clearLabel);
    function St(R) {
      if (!u.value || !l.value) return;
      const j = R.target;
      if (!(l.value.contains(j) || (j instanceof Element ? j : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ft of c.values())
          if (ft?.contains(j)) return;
        st();
      }
    }
    function Vt(R) {
      R.key === "Escape" && u.value && (R.preventDefault(), ct());
    }
    function Lt() {
      !u.value || !b.value || tt(b.value);
    }
    return oe(() => {
      document.addEventListener("mousedown", St, !0), window.addEventListener("keydown", Vt, !0), window.addEventListener("resize", Lt);
    }), No(() => {
      document.removeEventListener("mousedown", St, !0), window.removeEventListener("keydown", Vt, !0), window.removeEventListener("resize", Lt);
    }), It(
      () => n.modelValue,
      () => {
        const R = g.value;
        R && u.value && !s.panel && Y(R);
      },
      { deep: !0 }
    ), (R, j) => (v(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", s2, [
        r("span", o2, A(e.label), 1),
        r("div", i2, [
          (v(!0), k(q, null, et(e.filterDefinitions, (X) => (v(), k("button", {
            key: `pill-${X.id}`,
            ref_for: !0,
            ref: (ft) => x(X.id, ft),
            type: "button",
            class: H(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", P(X)]),
            "aria-label": N(X),
            "aria-expanded": d.value === X.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === X.id ? i : void 0,
            onClick: (ft) => vt(X, ft)
          }, [
            z(F(e2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            r("span", r2, A(X.label), 1),
            X.type === "select" && L(X) > 0 ? (v(), k("span", c2, A(L(X)), 1)) : O("", !0)
          ], 10, l2))), 128))
        ])
      ]),
      $.value ? (v(), k("div", d2, [
        r("div", u2, [
          (v(!0), k(q, null, et(M.value, (X) => (v(), k("div", {
            key: X.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            r("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": it(X),
              onClick: (ft) => lt(X.def, ft)
            }, [
              $t(R.$slots, "formatChip", {
                filter: X.def,
                value: w(X.def.id),
                optionValue: X.kind === "select" ? X.optionValue : void 0
              }, () => [
                yt(A(B(X)), 1)
              ], !0)
            ], 8, h2),
            r("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Z(X),
              onClick: (ft) => At(X)
            }, [
              z(F(n2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, f2)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": bt.value,
          onClick: V
        }, A(e.clearLabel), 9, g2)
      ])) : O("", !0),
      (v(), K(Pa, { to: "body" }, [
        d.value && u.value ? (v(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": G.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: gt(h.value),
          onKeydown: j[3] || (j[3] = de(() => {
          }, ["stop"]))
        }, [
          g.value ? (v(), k(q, { key: 0 }, [
            R.$slots.panel ? $t(R.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: st,
              value: f.value,
              updateValue: Mt
            }, void 0, !0) : (v(), k("div", m2, [
              g.value.type === "text" ? (v(), k(q, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(g.value.label), 9, b2),
                Zt(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": j[0] || (j[0] = (X) => _.value = X),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: qn(de(st, ["prevent"]), ["enter"])
                }, null, 40, v2), [
                  [Ne, _.value]
                ])
              ], 64)) : g.value.type === "select" ? (v(), k(q, { key: 1 }, [
                r("p", y2, A(g.value.label), 1),
                r("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (v(!0), k(q, null, et(g.value.options, (X) => (v(), k("li", {
                    key: X.value
                  }, [
                    r("label", x2, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: m.value.includes(X.value),
                        onChange: (ft) => J(X.value)
                      }, null, 40, k2),
                      r("span", w2, A(X.label), 1)
                    ])
                  ]))), 128))
                ], 8, _2)
              ], 64)) : g.value.type === "dateRange" ? (v(), k(q, { key: 2 }, [
                r("p", C2, A(g.value.label), 1),
                r("div", $2, [
                  r("div", M2, [
                    r("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, S2),
                    Zt(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": j[1] || (j[1] = (X) => p.value = X),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, D2), [
                      [Ne, p.value]
                    ])
                  ]),
                  r("div", A2, [
                    r("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, T2),
                    Zt(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": j[2] || (j[2] = (X) => y.value = X),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, B2), [
                      [Ne, y.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, p2)) : O("", !0)
      ]))
    ], 8, a2));
  }
}), F2 = /* @__PURE__ */ at(L2, [["__scopeId", "data-v-f38e0100"]]), ae = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ye = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", E2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Fe = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", _e = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", P2 = { class: "font-sans" }, I2 = ["for"], R2 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], O2 = ["id"], z2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-text-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue,
      set: (c) => a("update:modelValue", c)
    });
    return (c, d) => (v(), k("div", P2, [
      e.label ? (v(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, I2)) : O("", !0),
      Zt(r("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => l.value = u),
        type: "text",
        autocomplete: "off",
        class: H([F(ye), e.invalid ? F(Fe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, R2), [
        [Ne, l.value]
      ]),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, O2)) : O("", !0)
    ]));
  }
}), V2 = { class: "font-sans" }, N2 = ["for"], j2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], W2 = ["id"], H2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-textarea-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue,
      set: (c) => a("update:modelValue", c)
    });
    return (c, d) => (v(), k("div", V2, [
      e.label ? (v(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, N2)) : O("", !0),
      Zt(r("textarea", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: H([F(E2), e.invalid ? F(Fe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, j2), [
        [Ne, l.value]
      ]),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, W2)) : O("", !0)
    ]));
  }
}), Y2 = { class: "font-sans" }, K2 = ["for"], q2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], U2 = ["for"], X2 = ["title"], G2 = ["aria-label"], Z2 = ["id"], Q2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-file-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = nt(null), c = D(() => n.modelValue?.name ?? n.placeholder);
    function d(h) {
      const _ = h.target.files?.[0] ?? null;
      a("update:modelValue", _);
    }
    function u() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, b) => (v(), k("div", Y2, [
      e.label ? (v(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, K2)) : O("", !0),
      r("div", {
        class: H([
          F(ye),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? F(Fe) : "",
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
        }, null, 40, q2),
        r("label", {
          for: o.value,
          class: H(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          z(F(op), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          yt(" " + A(e.chooseLabel), 1)
        ], 10, U2),
        r("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: c.value || void 0
        }, A(c.value), 9, X2),
        e.modelValue && !e.disabled ? (v(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          z(F(ji), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, G2)) : O("", !0)
      ], 2),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, Z2)) : O("", !0)
    ]));
  }
}), J2 = { class: "font-sans" }, tw = ["for"], ew = { class: "relative" }, nw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], aw = ["id"], sw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-datetime-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => n.modelValue ?? "");
    function c(d) {
      const u = d.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (v(), k("div", J2, [
      e.label ? (v(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, tw)) : O("", !0),
      r("div", ew, [
        z(F(Vi), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: H([
            F(ye),
            "pl-10",
            e.invalid ? F(Fe) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: c
        }, null, 42, nw)
      ]),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, aw)) : O("", !0)
    ]));
  }
}), ow = { class: "font-sans" }, iw = ["for"], lw = { class: "relative" }, rw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], cw = ["id"], dw = /* @__PURE__ */ Q({
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
      const b = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!b) return null;
      const _ = Number(b[1]), m = Number(b[2]);
      return !Number.isInteger(_) || !Number.isInteger(m) || _ < 0 || _ > 23 || m < 0 || m > 59 ? null : `${String(_).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Yt()}`, l = D(() => s.id ?? i), c = D(() => `${l.value}-err`), d = D(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function u(h) {
      const b = h.target.value;
      o("update:modelValue", a(b));
    }
    return (h, b) => (v(), k("div", ow, [
      e.label ? (v(), k("label", {
        key: 0,
        for: l.value,
        class: H(F(ae))
      }, A(e.label), 11, iw)) : O("", !0),
      r("div", lw, [
        z(F(cp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: H([
            F(ye),
            "pl-10",
            e.invalid ? F(Fe) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          onInput: u
        }, null, 42, rw)
      ]),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: c.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, cw)) : O("", !0)
    ]));
  }
}), uw = { class: "font-sans" }, hw = ["for"], fw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, gw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], pw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, mw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, bw = { class: "min-w-0 text-left leading-snug" }, vw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, yw = { class: "min-w-0 text-right leading-snug" }, _w = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, xw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, kw = ["id"], ww = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-range-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
      const _ = [];
      return n.errorText && _.push(i.value), _.length ? _.join(" ") : void 0;
    }), c = D(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), d = D(() => !!(n.captionMin || n.captionMax)), u = D(() => {
      const { min: _, max: m, modelValue: p } = n;
      if (m === _) return 0;
      const y = (p - _) / (m - _);
      return Math.min(100, Math.max(0, y * 100));
    }), h = D(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function b(_) {
      const m = Number(_.target.value);
      a("update:modelValue", Number.isNaN(m) ? n.min : m);
    }
    return (_, m) => (v(), k("div", uw, [
      e.label ? (v(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, hw)) : O("", !0),
      r("div", {
        class: H(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (v(), k("p", fw, A(e.captionMax), 1)) : O("", !0),
        r("div", {
          class: H(["flex items-center justify-center", [
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
            class: H([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: b
          }, null, 42, gw)
        ], 6),
        e.orientation === "horizontal" && c.value ? (v(), k("p", pw, A(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (v(), k("div", mw, [
          r("span", bw, A(e.captionMin), 1),
          r("span", vw, A(e.caption), 1),
          r("span", yw, A(e.captionMax), 1)
        ])) : O("", !0),
        e.orientation === "vertical" && e.captionMin ? (v(), k("p", _w, A(e.captionMin), 1)) : O("", !0),
        e.orientation === "vertical" && e.caption ? (v(), k("p", xw, A(e.caption), 1)) : O("", !0)
      ], 2),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, kw)) : O("", !0)
    ]));
  }
}), Cw = /* @__PURE__ */ at(ww, [["__scopeId", "data-v-a1343418"]]), $w = { class: "font-sans" }, Mw = ["for"], Sw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Dw = ["id"], Aw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-number-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), c = D(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const b = Number(h);
      a("update:modelValue", Number.isNaN(b) ? null : b);
    }
    return (u, h) => (v(), k("div", $w, [
      e.label ? (v(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, Mw)) : O("", !0),
      r("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: d,
        class: H([
          F(ye),
          e.invalid ? F(Fe) : "",
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
      }, null, 42, Sw),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, Dw)) : O("", !0)
    ]));
  }
}), Tw = { class: "font-sans" }, Bw = ["for"], Lw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Fw = ["disabled"], Ew = ["id"], Pw = "#3b82f6", Iw = "#aabbcc", Rw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Ow = /* @__PURE__ */ Q({
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
    function n(m) {
      const p = m.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(p);
      if (y) return `#${y[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(p);
      if (g) {
        const [f, x, w] = g[1].split("");
        return `#${f}${f}${x}${x}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(m) {
      return n(m) ?? Pw;
    }
    const s = e, o = t, i = `kiut-input-color-${Yt()}`, l = D(() => s.id ?? i), c = D(() => `${l.value}-err`), d = D(() => a(s.modelValue)), u = nt(d.value), h = nt(!1);
    It(d, (m) => {
      h.value || (u.value = m);
    });
    function b(m) {
      const p = m.target, y = n(p.value);
      y && o("update:modelValue", y);
    }
    function _() {
      h.value = !1;
      const m = n(u.value);
      m ? (u.value = m, o("update:modelValue", m)) : u.value = d.value;
    }
    return It(u, (m) => {
      if (!h.value) return;
      const p = n(m);
      p && o("update:modelValue", p);
    }), (m, p) => (v(), k("div", Tw, [
      e.label ? (v(), k("label", {
        key: 0,
        for: l.value,
        class: H(F(ae))
      }, A(e.label), 11, Bw)) : O("", !0),
      r("div", {
        class: H([
          Rw,
          e.invalid ? F(Fe) : "",
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
          onInput: b
        }, null, 40, Lw),
        e.showHexInput ? Zt((v(), k("input", {
          key: 0,
          "onUpdate:modelValue": p[0] || (p[0] = (y) => u.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Iw,
          onFocus: p[1] || (p[1] = (y) => h.value = !0),
          onBlur: _
        }, null, 40, Fw)), [
          [Ne, u.value]
        ]) : O("", !0)
      ], 2),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: c.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, Ew)) : O("", !0)
    ]));
  }
});
function Ji(e, t) {
  return v(), k("svg", {
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
const zw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Vw = ["aria-selected", "onClick", "onMouseenter"], Nw = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, jw = { class: "min-w-0 flex-1" }, tl = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-select-${Yt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = nt(null), d = nt(null), u = nt(null), h = nt(!1), b = nt(0), _ = nt({});
    function m() {
      const B = d.value;
      if (!B) return;
      const E = B.getBoundingClientRect();
      _.value = {
        top: `${E.bottom - 3}px`,
        left: `${E.left}px`,
        width: `${E.width}px`
      };
    }
    const p = D(() => n.options.filter((B) => !B.disabled)), y = D(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), g = D(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((E) => E.value === n.modelValue)?.label ?? String(n.modelValue));
    function f(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function x(B) {
      return n.modelValue === B.value;
    }
    function w(B, E) {
      const P = x(B), N = b.value === E;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        P ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !P && N ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function C(B) {
      a("update:modelValue", B.value), h.value = !1;
    }
    function S() {
      n.disabled || (h.value = !h.value);
    }
    function $(B) {
      if (B.stopPropagation(), !n.disabled && (S(), h.value)) {
        m();
        const E = Math.max(
          0,
          p.value.findIndex((P) => P.value === n.modelValue)
        );
        b.value = E, Rt(() => u.value?.focus());
      }
    }
    function M(B) {
      if (!h.value) return;
      const E = B.target, P = c.value, N = u.value;
      P && !P.contains(E) && (!N || !N.contains(E)) && (h.value = !1);
    }
    function L(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, m(), b.value = Math.max(
        0,
        p.value.findIndex((E) => E.value === n.modelValue)
      ), Rt(() => u.value?.focus())));
    }
    function T(B) {
      const E = p.value;
      if (E.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), h.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), b.value = Math.min(b.value + 1, E.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), b.value = Math.max(b.value - 1, 0);
          return;
        }
        if (B.key === "Enter") {
          B.preventDefault();
          const P = E[b.value];
          P && C(P);
        }
      }
    }
    return oe(() => {
      document.addEventListener("click", M);
    }), Be(() => {
      document.removeEventListener("click", M);
    }), (B, E) => (v(), k("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (v(), k("label", {
        key: 0,
        id: o,
        class: H(F(ae))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: d,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(ye),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: $,
        onKeydown: L
      }, [
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(g.value), 3),
        z(F(Ni), {
          class: H(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, zw),
      (v(), K(Pa, { to: "body" }, [
        Zt(r("ul", {
          id: l,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: gt(_.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: de(T, ["stop"])
        }, [
          (v(!0), k(q, null, et(p.value, (P, N) => (v(), k("li", {
            key: f(P),
            role: "option",
            "aria-selected": x(P),
            class: H(w(P, N)),
            onClick: de((Y) => C(P), ["stop"]),
            onMouseenter: (Y) => b.value = N
          }, [
            e.showOptionCheck ? (v(), k("span", Nw, [
              x(P) ? (v(), K(F(Ji), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : O("", !0)
            ])) : O("", !0),
            r("span", jw, A(P.label), 1)
          ], 42, Vw))), 128))
        ], 36), [
          [yn, h.value]
        ])
      ]))
    ], 512));
  }
}), Ww = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Hw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Yw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Kw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, qw = { class: "truncate" }, Uw = ["aria-selected", "onClick", "onMouseenter"], Xw = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Gw = { class: "min-w-0 flex-1" }, Zw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-multiselect-${Yt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = nt(null), d = nt(null), u = nt(!1), h = nt(0), b = D(() => n.options.filter((T) => !T.disabled)), _ = D(() => new Set(n.modelValue ?? [])), m = D(
      () => n.options.filter((T) => _.value.has(T.value))
    ), p = D(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = m.value.length;
      return B === 0 ? T : `${T}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function y(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function g(T) {
      return _.value.has(T.value);
    }
    function f(T, B) {
      const E = g(T), P = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && P ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function x(T) {
      const B = [...n.modelValue ?? []], E = B.indexOf(T.value);
      E >= 0 ? B.splice(E, 1) : B.push(T.value), a("update:modelValue", B);
    }
    function w() {
      const T = b.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = _.value, E = T.findIndex((P) => B.has(P.value));
      h.value = E >= 0 ? E : 0;
    }
    function C() {
      n.disabled || (u.value = !u.value);
    }
    function S(T) {
      T.stopPropagation(), !n.disabled && (C(), u.value && (w(), Rt(() => d.value?.focus())));
    }
    function $(T) {
      if (!u.value) return;
      const B = c.value;
      B && !B.contains(T.target) && (u.value = !1);
    }
    function M(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), u.value || (u.value = !0, w(), Rt(() => d.value?.focus())));
    }
    function L(T) {
      const B = b.value;
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
    return oe(() => {
      document.addEventListener("click", $);
    }), Be(() => {
      document.removeEventListener("click", $);
    }), (T, B) => (v(), k("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (v(), k("label", {
        key: 0,
        id: o,
        class: H(F(ae))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(ye),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onClick: S,
        onKeydown: M
      }, [
        r("div", Hw, [
          m.value.length === 0 ? (v(), k("span", Yw, A(e.placeholder), 1)) : (v(), k("div", Kw, [
            (v(!0), k(q, null, et(m.value, (E) => (v(), k("span", {
              key: y(E),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              r("span", qw, A(E.label), 1)
            ]))), 128))
          ]))
        ]),
        z(F(Ni), {
          class: H(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Ww),
      Zt(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: de(L, ["stop"])
      }, [
        (v(!0), k(q, null, et(b.value, (E, P) => (v(), k("li", {
          key: y(E),
          role: "option",
          "aria-selected": g(E),
          class: H(f(E, P)),
          onClick: de((N) => x(E), ["stop"]),
          onMouseenter: (N) => h.value = P
        }, [
          r("span", Xw, [
            g(E) ? (v(), K(F(Ji), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : O("", !0)
          ]),
          r("span", Gw, A(E.label), 1)
        ], 42, Uw))), 128))
      ], 544), [
        [yn, u.value]
      ])
    ], 512));
  }
}), Qw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Jw = { class: "sr-only" }, t5 = /* @__PURE__ */ Q({
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
    return (o, i) => (v(), k("button", {
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
        qn(de(s, ["prevent", "stop"]), ["space"]),
        qn(de(s, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: H(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", Jw, A(e.ariaLabel), 1)
    ], 42, Qw));
  }
}), e5 = { class: "font-sans" }, n5 = ["for"], a5 = { class: "flex gap-2" }, s5 = { class: "w-[7.5rem] shrink-0" }, o5 = { class: "min-w-0 flex-1" }, i5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], l5 = ["id"], r5 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-phone-${Yt()}`, o = D(() => n.id ?? `${s}-num`), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue.prefix,
      set: (d) => a("update:modelValue", { ...n.modelValue, prefix: d })
    }), c = D({
      get: () => n.modelValue.number,
      set: (d) => a("update:modelValue", { ...n.modelValue, number: d })
    });
    return (d, u) => (v(), k("div", e5, [
      e.label ? (v(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, n5)) : O("", !0),
      r("div", a5, [
        r("div", s5, [
          z(tl, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        r("div", o5, [
          Zt(r("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => c.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: H([F(ye), e.invalid ? F(Fe) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, i5), [
            [Ne, c.value]
          ])
        ])
      ]),
      e.errorText ? (v(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, l5)) : O("", !0)
    ]));
  }
}), c5 = ["role", "aria-label"], d5 = { class: "flex flex-wrap gap-2" }, u5 = ["aria-checked", "role", "onClick"], h5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, f5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, g5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, p5 = /* @__PURE__ */ Q({
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
    return (c, d) => (v(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", d5, [
        (v(!0), k(q, null, et(e.items, (u) => (v(), k("button", {
          key: u.value,
          type: "button",
          class: H(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(u)
        }, [
          r("span", h5, [
            o(u) ? (v(), k("span", f5)) : O("", !0)
          ]),
          u.dotColor ? (v(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: gt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", g5, A(u.label), 1)
        ], 10, u5))), 128))
      ])
    ], 8, c5));
  }
}), m5 = ["aria-label"], b5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], v5 = { class: "truncate px-3 py-2 text-sm font-medium" }, y5 = /* @__PURE__ */ Q({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Yt()}`, o = (p) => `${s}-seg-${p}`, i = nt([]);
    function l(p, y) {
      p instanceof HTMLButtonElement ? i.value[y] = p : i.value[y] = null;
    }
    function c(p) {
      return p.value === n.modelValue;
    }
    function d(p) {
      const y = c(p), g = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return p.disabled ? `${g} cursor-not-allowed opacity-40` : y ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(p) {
      p.disabled || p.value !== n.modelValue && a("update:modelValue", p.value);
    }
    function h(p, y, g) {
      u(p), Rt(() => i.value[y]?.focus());
    }
    const b = D(
      () => n.items.map((p, y) => p.disabled ? -1 : y).filter((p) => p >= 0)
    );
    function _(p, y) {
      const g = n.items.length;
      if (g === 0) return 0;
      let f = p;
      for (let x = 0; x < g; x++)
        if (f = (f + y + g) % g, !n.items[f]?.disabled) return f;
      return p;
    }
    function m(p, y) {
      if (p.key === "ArrowRight" || p.key === "ArrowDown") {
        p.preventDefault();
        const g = _(y, 1), f = n.items[g];
        f && u(f), Rt(() => i.value[g]?.focus());
      } else if (p.key === "ArrowLeft" || p.key === "ArrowUp") {
        p.preventDefault();
        const g = _(y, -1), f = n.items[g];
        f && u(f), Rt(() => i.value[g]?.focus());
      } else if (p.key === "Home") {
        p.preventDefault();
        const g = b.value[0];
        if (g !== void 0) {
          const f = n.items[g];
          f && u(f), Rt(() => i.value[g]?.focus());
        }
      } else if (p.key === "End") {
        p.preventDefault();
        const g = b.value[b.value.length - 1];
        if (g !== void 0) {
          const f = n.items[g];
          f && u(f), Rt(() => i.value[g]?.focus());
        }
      }
    }
    return (p, y) => (v(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (v(!0), k(q, null, et(e.items, (g, f) => (v(), k("button", {
        id: o(g.value),
        key: g.value,
        ref_for: !0,
        ref: (x) => l(x, f),
        type: "button",
        role: "tab",
        "aria-selected": c(g),
        "aria-disabled": g.disabled === !0,
        tabindex: c(g) ? 0 : -1,
        class: H(d(g)),
        onClick: (x) => h(g, f),
        onKeydown: (x) => m(x, f)
      }, [
        r("span", v5, A(g.label), 1)
      ], 42, b5))), 128))
    ], 8, m5));
  }
});
function Re(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function dn(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function ke(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function wa(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Po(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function la(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Io(e, t) {
  return la(e, t) === 0;
}
function Ca(e, t) {
  return la(e, t) < 0;
}
function _5(e, t) {
  return la(e, t) >= 0;
}
function x5(e, t) {
  return la(e, t) <= 0;
}
function k5(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const w5 = [
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
], C5 = [
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
function Ro(e) {
  return `${w5[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Oo(e) {
  return `${C5[e.getMonth()]} ${e.getFullYear()}`;
}
const $5 = ["aria-expanded", "aria-labelledby", "aria-label"], M5 = ["onKeydown"], S5 = { class: "mb-4 flex items-center justify-between gap-2" }, D5 = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, A5 = { class: "min-w-0 truncate" }, T5 = { class: "min-w-0 truncate" }, B5 = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, L5 = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, F5 = { class: "grid grid-cols-7 gap-y-1" }, E5 = ["disabled", "onClick"], P5 = /* @__PURE__ */ Q({
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
    const n = e, a = t, o = `${`kiut-drp-${Yt()}`}-lbl`, i = nt(null), l = nt(null), c = nt(!1), d = nt(null), u = nt(wa(/* @__PURE__ */ new Date())), h = D(() => {
      const M = wa(u.value);
      return [M, Po(M, 1)];
    }), b = D(() => n.ariaLabel ?? n.placeholder), _ = D(
      () => n.panelAlign === "end" ? "right-0 left-auto" : "left-0 right-auto"
    ), m = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], p = D(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const M = Re(n.modelValue.start), L = Re(n.modelValue.end);
      return `${Ro(M)} – ${Ro(L)}`;
    });
    function y(M, L) {
      return M.getMonth() === L.getMonth() && M.getFullYear() === L.getFullYear();
    }
    function g(M) {
      const L = ke(M);
      if (n.minDate) {
        const T = ke(Re(n.minDate));
        if (Ca(L, T)) return !0;
      }
      if (n.maxDate) {
        const T = ke(Re(n.maxDate));
        if (Ca(T, L)) return !0;
      }
      return !1;
    }
    function f(M, L) {
      const T = y(L, M), B = n.modelValue.start ? ke(Re(n.modelValue.start)) : null, E = n.modelValue.end ? ke(Re(n.modelValue.end)) : null, P = ke(L), N = T ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!B || !E)
        return `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const Y = _5(P, B) && x5(P, E), W = Io(P, B), J = Io(P, E);
      return W || J ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : Y ? `${N} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function x(M) {
      if (g(M)) return;
      const L = ke(M);
      if (!d.value) {
        d.value = new Date(L), a("update:modelValue", { start: dn(L), end: dn(L) });
        return;
      }
      let B = ke(d.value), E = new Date(L);
      Ca(E, B) && ([B, E] = [E, B]), a("update:modelValue", { start: dn(B), end: dn(E) }), d.value = null, c.value = !1;
    }
    function w(M) {
      u.value = Po(u.value, M);
    }
    function C() {
      c.value = !1;
    }
    function S(M) {
      if (M?.stopPropagation(), !c.value) {
        if (c.value = !0, d.value = null, n.modelValue.start)
          try {
            u.value = wa(Re(n.modelValue.start));
          } catch {
          }
        Rt(() => l.value?.focus());
      }
    }
    function $(M) {
      if (!c.value) return;
      const L = i.value;
      L && !L.contains(M.target) && (c.value = !1);
    }
    return It(c, (M) => {
      M && (d.value = null);
    }), oe(() => {
      document.addEventListener("click", $);
    }), Be(() => {
      document.removeEventListener("click", $);
    }), (M, L) => (v(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (v(), k("label", {
        key: 0,
        id: o,
        class: H(F(ae))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        type: "button",
        class: H([F(ye), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onFocus: S,
        onClick: S
      }, [
        z(F(Vi), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(p.value), 3)
      ], 42, $5),
      Zt(r("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: H([
          _.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: qn(de(C, ["stop"]), ["escape"])
      }, [
        r("div", S5, [
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: L[0] || (L[0] = (T) => w(-1))
          }, [
            z(F(lp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          r("div", D5, [
            r("span", A5, A(F(Oo)(h.value[0])), 1),
            r("span", T5, A(F(Oo)(h.value[1])), 1)
          ]),
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: L[1] || (L[1] = (T) => w(1))
          }, [
            z(F(rp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        r("div", B5, [
          (v(!0), k(q, null, et(h.value, (T) => (v(), k("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            r("div", L5, [
              (v(), k(q, null, et(m, (B) => r("span", { key: B }, A(B), 1)), 64))
            ]),
            r("div", F5, [
              (v(!0), k(q, null, et(F(k5)(T), (B) => (v(), k("button", {
                key: F(dn)(B),
                type: "button",
                disabled: g(B),
                class: H(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", f(T, B)]),
                onClick: (E) => x(B)
              }, A(B.getDate()), 11, E5))), 128))
            ])
          ]))), 128))
        ])
      ], 42, M5), [
        [yn, c.value]
      ])
    ], 512));
  }
}), I5 = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, R5 = ["type", "disabled", "aria-label"], O5 = {
  key: 1,
  class: "min-w-0 truncate"
}, z5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, V5 = ["type", "disabled", "aria-label"], N5 = {
  key: 1,
  class: "min-w-0 truncate"
}, Kn = /* @__PURE__ */ Q({
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
    const t = e, n = jo(), a = D(() => !!t.tooltip?.trim()), s = D(() => t.variant === "action"), o = D(() => !s.value), i = D(() => {
      const u = n["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = D(() => {
      const u = n.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), c = D(() => {
      const { class: u, type: h, "aria-label": b, ..._ } = n;
      return _;
    }), d = D(() => t.variant === "primary" ? [
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
    return (u, h) => a.value ? (v(), k("span", I5, [
      r("button", Un({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, F(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        u.$slots.icon ? (v(), k("span", {
          key: 0,
          class: H(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          $t(u.$slots, "icon")
        ], 2)) : O("", !0),
        o.value ? (v(), k("span", O5, [
          $t(u.$slots, "default")
        ])) : O("", !0)
      ], 16, R5),
      r("span", z5, A(e.tooltip), 1)
    ])) : (v(), k("button", Un({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, F(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      u.$slots.icon ? (v(), k("span", {
        key: 0,
        class: H(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        $t(u.$slots, "icon")
      ], 2)) : O("", !0),
      o.value ? (v(), k("span", N5, [
        $t(u.$slots, "default")
      ])) : O("", !0)
    ], 16, V5));
  }
}), j5 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, W5 = { class: "min-w-0 flex-1 space-y-1" }, H5 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, Y5 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, K5 = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, q5 = /* @__PURE__ */ Q({
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
    const n = e, a = t, o = `${`kiut-modal-${Yt()}`}-title`, i = nt(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function c() {
      a("confirm");
    }
    function d(u) {
      n.modelValue && u.key === "Escape" && (u.preventDefault(), l());
    }
    return It(
      () => n.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), oe(() => {
      document.addEventListener("keydown", d);
    }), Be(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (v(), K(Pa, { to: "body" }, [
      z(gn, { name: "kiut-modal" }, {
        default: I(() => [
          e.modelValue ? (v(), k("div", j5, [
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
              onClick: h[0] || (h[0] = de(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: H(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                r("div", W5, [
                  r("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (v(), k("p", H5, A(e.subtitle), 1)) : O("", !0)
                ]),
                z(Kn, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: I(() => [
                    z(F(ji), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              r("div", Y5, [
                $t(u.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", K5, [
                z(Kn, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: I(() => [
                    yt(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                z(Kn, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: I(() => [
                    yt(A(e.confirmLabel), 1)
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
}), U5 = /* @__PURE__ */ at(q5, [["__scopeId", "data-v-4ed7bb14"]]), X5 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, G5 = {
  key: 0,
  class: ""
}, Z5 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, Q5 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, J5 = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, tC = /* @__PURE__ */ Q({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Ea(), n = D(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (v(), k("section", X5, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (v(), k("header", G5, [
        a.$slots.description ? (v(), k("div", Z5, [
          $t(a.$slots, "description")
        ])) : O("", !0),
        a.$slots.filters || a.$slots.actions ? (v(), k("div", {
          key: 1,
          class: H(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (v(), k("div", Q5, [
            $t(a.$slots, "filters")
          ])) : O("", !0),
          a.$slots.actions ? (v(), k("div", J5, [
            $t(a.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0)
      ])) : O("", !0),
      a.$slots.content || a.$slots.default ? (v(), k("div", {
        key: 1,
        class: H({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        $t(a.$slots, "content", {}, () => [
          $t(a.$slots, "default")
        ])
      ], 2)) : O("", !0)
    ]));
  }
}), eC = { class: "flex flex-1 min-h-0" }, nC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, aC = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, sC = ["aria-current", "data-has-active", "title", "onClick"], oC = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, iC = { class: "px-4 py-4 shrink-0" }, lC = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, rC = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, cC = ["data-nav-id", "aria-current", "onClick"], dC = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, uC = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, hC = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, fC = ["data-nav-id", "aria-current", "onClick"], gC = { class: "truncate text-[15px]" }, pC = ["aria-current", "data-has-active", "onClick"], mC = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, bC = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, vC = /* @__PURE__ */ Q({
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
    const n = nt(!1), a = e, s = t, o = jo(), { class: i, ...l } = o, c = nt(!1);
    function d() {
      typeof window > "u" || (c.value = window.innerWidth < a.mobileBreakpoint);
    }
    oe(() => {
      d(), window.addEventListener("resize", d);
    }), Be(() => {
      window.removeEventListener("resize", d);
    });
    const u = D(() => {
      const g = a.sections.find((f) => f.id === a.selectedSectionId);
      return g?.items?.length ? g : null;
    });
    function h(g) {
      return a.activePath ? a.activePath === g.path || a.activePath.startsWith(g.path + "/") : !1;
    }
    function b(g) {
      return g.items?.length ? g.items.some(h) : !a.activePath || !g.path ? !1 : a.activePath === g.path || a.activePath.startsWith(g.path + "/");
    }
    function _(g) {
      if (!g.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: g,
          item: { id: g.id, label: g.label, path: g.path }
        });
        return;
      }
      const f = a.selectedSectionId === g.id ? null : g.id;
      s("update:selectedSectionId", f);
    }
    function m(g, f) {
      s("navigate", { section: g, item: f });
    }
    function p() {
      s("update:selectedSectionId", null);
    }
    function y(g, f) {
      m(g, f), p();
    }
    return (g, f) => c.value ? (v(), k("div", Un({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      z(gn, { name: "ksn-overlay" }, {
        default: I(() => [
          u.value ? (v(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: p
          })) : O("", !0)
        ]),
        _: 1
      }),
      z(gn, { name: "ksn-sheet" }, {
        default: I(() => [
          u.value ? (v(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: gt({ paddingBottom: a.mobileBarHeight })
          }, [
            f[3] || (f[3] = r("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              r("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            r("div", dC, [
              r("p", uC, A(u.value.label), 1),
              r("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: p
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
            r("nav", hC, [
              (v(!0), k(q, null, et(u.value.items, (x) => (v(), k("button", {
                key: x.id,
                type: "button",
                "data-nav-id": x.id,
                "aria-current": h(x) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => y(u.value, x)
              }, [
                x.icon ? (v(), K(Xe(x.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : O("", !0),
                r("span", gC, A(x.label), 1)
              ], 8, fC))), 128))
            ])
          ], 4)) : O("", !0)
        ]),
        _: 1
      }),
      r("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: gt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (v(!0), k(q, null, et(e.sections, (x) => (v(), k("button", {
          key: x.id,
          type: "button",
          "aria-current": e.selectedSectionId === x.id ? "true" : void 0,
          "data-has-active": b(x) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => _(x)
        }, [
          e.selectedSectionId === x.id || b(x) ? (v(), k("span", mC)) : O("", !0),
          x.icon ? (v(), K(Xe(x.icon), {
            key: 1,
            class: "shrink-0",
            style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          r("span", bC, A(x.label), 1)
        ], 8, pC))), 128))
      ], 4)
    ], 16)) : (v(), k("aside", Un({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", eC, [
        r("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: gt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: f[0] || (f[0] = (x) => n.value = !0),
          onMouseleave: f[1] || (f[1] = (x) => n.value = !1)
        }, [
          g.$slots.logo ? (v(), k("div", nC, [
            $t(g.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : O("", !0),
          r("nav", aC, [
            (v(!0), k(q, null, et(e.sections, (x) => (v(), k("button", {
              key: x.id,
              type: "button",
              "aria-current": e.selectedSectionId === x.id ? "true" : void 0,
              "data-has-active": b(x) ? "true" : void 0,
              title: x.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => _(x)
            }, [
              x.icon ? (v(), K(Xe(x.icon), {
                key: 0,
                class: "shrink-0",
                style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : O("", !0),
              r("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: gt({ fontSize: e.primaryFontSize })
              }, A(x.label), 5)
            ], 8, sC))), 128))
          ]),
          g.$slots.footer ? (v(), k("div", oC, [
            $t(g.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : O("", !0)
        ], 36),
        z(gn, { name: "ksn-sub" }, {
          default: I(() => [
            u.value ? (v(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: gt({ width: e.secondaryWidth })
            }, [
              r("div", iC, [
                r("p", lC, A(u.value.label), 1)
              ]),
              r("nav", rC, [
                (v(!0), k(q, null, et(u.value.items, (x) => (v(), k("button", {
                  key: x.id,
                  type: "button",
                  "data-nav-id": x.id,
                  "aria-current": h(x) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => m(u.value, x)
                }, [
                  x.icon ? (v(), K(Xe(x.icon), {
                    key: 0,
                    style: gt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : O("", !0),
                  r("span", {
                    class: "truncate",
                    style: gt({ fontSize: e.secondaryFontSize })
                  }, A(x.label), 5)
                ], 8, cC))), 128))
              ])
            ], 4)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), yC = /* @__PURE__ */ at(vC, [["__scopeId", "data-v-e0ccb96c"]]), TC = {
  install(e) {
    e.component("KiutChartBar", me), e.component("KiutChartLine", ve), e.component("KiutPieChart", ia), e.component("KiutBoxplotChart", Qh), e.component("KiutCandlestickChart", Ri), e.component("KiutHistogramChart", Oi), e.component("KiutSankeyChart", Le), e.component("KiutAgentsPerDay", Ap), e.component("KiutBookingManager", om), e.component("KiutCheckin", Wi), e.component("KiutCheckinContainer", m0), e.component("KiutCheckinMetrics", Rm), e.component("KiutCheckinSegments", Yi), e.component("KiutDisruption", P0), e.component("KiutFAQ", W0), e.component("KiutMessagesPerAgent", eb), e.component("KiutRecordLocator", Hi), e.component("KiutSalesByChannel", Ki), e.component("KiutSeller", qi), e.component("KiutSellerContainer", Wb), e.component("KiutTopAgents", Zb), e.component("KiutPaymentMethod", yv), e.component("KiutAgentHumanConversations", vy), e.component("KiutChannelMetrics", Ty), e.component("KiutTriageCombinations", Yy), e.component("KiutSelectLanguage", Qy), e.component("KiutGuardrails", c1), e.component("KiutDisruptionNotifier", T1), e.component("KiutTotalConversationsCard", I1), e.component("KiutCsatP95Card", j1), e.component("KiutCSATContainer", k_), e.component("KiutAiGeneratedRevenueCard", T_), e.component("KiutHumanEscalations", H_), e.component("KiutHumanEscalationsCard", G_), e.component("KiutNpsDailyMetrics", Gi), e.component("KiutNpsMetrics", Zi), e.component("KiutNpsOverviewMetrics", Xi), e.component("KiutAWSCost", ix), e.component("KiutCostUsage", bx), e.component("KiutTokenUsage", Dx), e.component("KiutConversationCount", zx), e.component("KiutTopAgentsAnalysis", Qx), e.component("KiutTopAgentsPie", rk), e.component("KiutDailyCostTrends", vk), e.component("KiutModelUsage", Fk), e.component("KiutMessageRoles", Wk), e.component("KiutCostPerConversations", t2), e.component("Tabs", Qi), e.component("Table", Ui), e.component("Filters", F2), e.component("InputText", z2), e.component("InputTextarea", H2), e.component("InputFile", Q2), e.component("InputDateTime", sw), e.component("InputTime", dw), e.component("InputRange", Cw), e.component("InputNumber", Aw), e.component("InputColorPicker", Ow), e.component("Select", tl), e.component("MultiSelect", Zw), e.component("Toggle", t5), e.component("InputPhone", r5), e.component("SelectablePills", p5), e.component("SegmentedControl", y5), e.component("DateRangePicker", P5), e.component("Tag", Nt), e.component("Button", Kn), e.component("Modal", U5), e.component("Section", tC), e.component("KiutAppShellNavigation", yC);
  }
};
export {
  ix as AWSCost,
  vy as AgentHumanConversations,
  Ap as AgentsPerDay,
  T_ as AiGeneratedRevenueCard,
  yC as AppShellNavigation,
  om as BookingManager,
  Qh as BoxplotChart,
  Kn as Button,
  k_ as CSATContainer,
  Ri as CandlestickChart,
  Ty as ChannelMetrics,
  me as ChartBar,
  ve as ChartLine,
  Wi as Checkin,
  m0 as CheckinContainer,
  Rm as CheckinMetrics,
  Yi as CheckinSegments,
  zx as ConversationCount,
  t2 as CostPerConversations,
  bx as CostUsage,
  j1 as CsatP95Card,
  vk as DailyCostTrends,
  P5 as DateRangePicker,
  P0 as Disruption,
  T1 as DisruptionNotifier,
  W0 as FAQ,
  F2 as Filters,
  c1 as Guardrails,
  Oi as HistogramChart,
  H_ as HumanEscalations,
  G_ as HumanEscalationsCard,
  Ow as InputColorPicker,
  sw as InputDateTime,
  Q2 as InputFile,
  Aw as InputNumber,
  r5 as InputPhone,
  Cw as InputRange,
  z2 as InputText,
  H2 as InputTextarea,
  dw as InputTime,
  TC as KiutUIPlugin,
  Wk as MessageRoles,
  eb as MessagesPerAgent,
  U5 as Modal,
  Fk as ModelUsage,
  Zw as MultiSelect,
  Gi as NpsDailyMetrics,
  Zi as NpsMetrics,
  Xi as NpsOverviewMetrics,
  yv as PaymentMethod,
  ia as PieChart,
  Hi as RecordLocator,
  Ki as SalesByChannel,
  Le as SankeyChart,
  tC as Section,
  y5 as SegmentedControl,
  tl as Select,
  Qy as SelectLanguage,
  p5 as SelectablePills,
  qi as Seller,
  Wb as SellerContainer,
  Ui as Table,
  Qi as Tabs,
  Nt as Tag,
  t5 as Toggle,
  Dx as TokenUsage,
  Zb as TopAgents,
  Qx as TopAgentsAnalysis,
  rk as TopAgentsPie,
  I1 as TotalConversationsCard,
  Yy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
