import { defineComponent as Q, shallowRef as zo, h as $a, ref as nt, onMounted as oe, onUnmounted as Be, watch as It, toRaw as Ma, nextTick as Rt, version as al, isProxy as Vo, computed as D, toRef as rt, openBlock as b, createElementBlock as w, createVNode as z, unref as F, createElementVNode as r, Fragment as q, renderList as et, normalizeStyle as gt, normalizeClass as H, toDisplayString as A, createCommentVNode as O, onBeforeUnmount as No, createStaticVNode as os, withDirectives as Zt, vShow as vn, useSlots as Ea, renderSlot as $t, Comment as sl, createBlock as K, resolveDynamicComponent as Xe, withCtx as I, createTextVNode as vt, vModelSelect as ol, Transition as gn, Teleport as Pa, withModifiers as ue, withKeys as qn, vModelText as Ne, useAttrs as jo, mergeProps as Un } from "vue";
import * as is from "echarts/core";
import { TooltipComponent as il, TitleComponent as ll } from "echarts/components";
import { SankeyChart as rl } from "echarts/charts";
import { CanvasRenderer as cl } from "echarts/renderers";
import Pt from "moment";
function Dn(e) {
  return e + 0.5 | 0;
}
const Ce = (e, t, n) => Math.max(Math.min(e, n), t);
function dn(e) {
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
const Jt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Sa = [..."0123456789ABCDEF"], ul = (e) => Sa[e & 15], dl = (e) => Sa[(e & 240) >> 4] + Sa[e & 15], An = (e) => (e & 240) >> 4 === (e & 15), hl = (e) => An(e.r) && An(e.g) && An(e.b) && An(e.a);
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
function kl(e) {
  var t = hl(e) ? ul : dl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + gl(e.a, t) : void 0;
}
const pl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Wo(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function ml(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function bl(e, t, n) {
  const a = Wo(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function vl(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Ia(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let c, u, d;
  return o !== i && (d = o - i, u = l > 0.5 ? d / (2 - o - i) : d / (o + i), c = vl(n, a, s, d, o), c = c * 60 + 0.5), [c | 0, u || 0, l];
}
function Ra(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(De);
}
function Oa(e, t, n) {
  return Ra(Wo, e, t, n);
}
function yl(e, t, n) {
  return Ra(bl, e, t, n);
}
function _l(e, t, n) {
  return Ra(ml, e, t, n);
}
function Ho(e) {
  return (e % 360 + 360) % 360;
}
function xl(e) {
  const t = pl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? dn(+t[5]) : De(+t[5]));
  const s = Ho(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = yl(s, o, i) : t[1] === "hsv" ? a = _l(s, o, i) : a = Oa(s, o, i), {
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
      n = t[8] ? dn(i) : Ce(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? dn(a) : Ce(a, 0, 255)), s = 255 & (t[4] ? dn(s) : Ce(s, 0, 255)), o = 255 & (t[6] ? dn(o) : Ce(o, 0, 255)), {
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
function us(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = De(e[3]))) : (t = Yo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = De(t.a)), t;
}
function Bl(e) {
  return e.charAt(0) === "r" ? Dl(e) : xl(e);
}
class yn {
  constructor(t) {
    if (t instanceof yn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = us(t) : n === "string" && (a = fl(t) || Ml(t) || Bl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Yo(this._rgb);
    return t && (t.a = ge(t.a)), t;
  }
  set rgb(t) {
    this._rgb = us(t);
  }
  rgbString() {
    return this._valid ? Al(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? kl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Cl(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, s = t.rgb;
      let o;
      const i = n === o ? 0.5 : n, l = 2 * i - 1, c = a.a - s.a, u = ((l * c === -1 ? l : (l + c) / (1 + l * c)) + 1) / 2;
      o = 1 - u, a.r = 255 & u * a.r + o * s.r + 0.5, a.g = 255 & u * a.g + o * s.g + 0.5, a.b = 255 & u * a.b + o * s.b + 0.5, a.a = i * a.a + (1 - i) * s.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Tl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new yn(this.rgb);
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
function de() {
}
const Ll = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function xt(e) {
  return e == null;
}
function Ot(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function yt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ee(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function ie(e, t) {
  return ee(e) ? e : t;
}
function dt(e, t) {
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
  else if (yt(e))
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
  if (yt(e)) {
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
  yt(s) && yt(o) ? _n(s, o, a) : t[e] = Gn(o);
}
function _n(e, t, n) {
  const a = Ot(t) ? t : [
    t
  ], s = a.length;
  if (!yt(e))
    return e;
  n = n || {};
  const o = n.merger || El;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !yt(i))
      continue;
    const c = Object.keys(i);
    for (let u = 0, d = c.length; u < d; ++u)
      o(c[u], e, i, n);
  }
  return e;
}
function kn(e, t) {
  return _n(e, t, {
    merger: Pl
  });
}
function Pl(e, t, n) {
  if (!qo(e))
    return;
  const a = t[e], s = n[e];
  yt(a) && yt(s) ? kn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Gn(s));
}
const ds = {
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
  return (ds[t] || (ds[t] = Rl(t)))(e);
}
function za(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const xn = (e) => typeof e < "u", Ae = (e) => typeof e == "function", hs = (e, t) => {
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
function pn(e, t, n) {
  return Math.abs(e - t) < n;
}
function gs(e) {
  const t = Math.round(e);
  e = pn(e, t, e / 1e3) ? t : e;
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
function ke(e) {
  return e * (Ct / 180);
}
function Yl(e) {
  return e * (180 / Ct);
}
function ks(e) {
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
  const s = se(e), o = se(t), i = se(n), l = se(o - s), c = se(i - s), u = se(s - o), d = se(s - i);
  return s === o || s === i || a && o === i || l > c && u < d;
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
function ps(e, t) {
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
    const { iScale: i, vScale: l, _parsed: c } = e, u = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: p, minDefined: _, maxDefined: k } = i.getUserBounds();
    if (_) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Ve(c, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ve(t, d, i.getPixelForValue(h)).lo
      ), u) {
        const m = c.slice(0, s + 1).reverse().findIndex((v) => !xt(v[l.axis]));
        s -= Math.max(0, m);
      }
      s = Wt(s, 0, a - 1);
    }
    if (k) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        Ve(c, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ve(t, d, i.getPixelForValue(p), !0).hi + 1
      );
      if (u) {
        const v = c.slice(m - 1).findIndex((g) => !xt(g[l.axis]));
        m += Math.max(0, v);
      }
      o = Wt(m, s, a) - s;
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
const Ln = (e) => e === 0 || e === 1, ms = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Bt / n)), bs = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Bt / n) + 1, mn = {
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
  easeInElastic: (e) => Ln(e) ? e : ms(e, 0.075, 0.3),
  easeOutElastic: (e) => Ln(e) ? e : bs(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ln(e) ? e : e < 0.5 ? 0.5 * ms(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * bs(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - mn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? mn.easeInBounce(e * 2) * 0.5 : mn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function ja(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function vs(e) {
  return ja(e) ? e : new yn(e);
}
function ca(e) {
  return ja(e) ? e : new yn(e).saturate(0.5).darken(0.1).hexString();
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
const ys = /* @__PURE__ */ new Map();
function or(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = ys.get(n);
  return a || (a = new Intl.NumberFormat(e, t), ys.set(n, a)), a;
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
      const u = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (u < 1e-4 || u > 1e15) && (s = "scientific"), o = lr(e, n);
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
function bn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ua(e, t, n) {
  return typeof t == "string" ? _n(bn(e, t), n) : _n(bn(e, ""), t);
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
    return ua(this, t, n);
  }
  get(t) {
    return bn(this, t);
  }
  describe(t, n) {
    return ua(Aa, t, n);
  }
  override(t, n) {
    return ua(He, t, n);
  }
  route(t, n, a, s) {
    const o = bn(this, t), i = bn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const c = this[l], u = i[s];
          return yt(c) ? Object.assign({}, u, c) : dt(c, u);
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
function ur(e) {
  return !e || xt(e.size) || xt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function _s(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Pe(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function xs(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ta(e, t, n, a) {
  ei(e, t, n, a, null);
}
function ei(e, t, n, a, s) {
  let o, i, l, c, u, d, h, p;
  const _ = t.pointStyle, k = t.rotation, m = t.radius;
  let v = (k || 0) * Vl;
  if (_ && typeof _ == "object" && (o = _.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(v), e.drawImage(_, -_.width / 2, -_.height / 2, _.width, _.height), e.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (e.beginPath(), _) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, m, 0, 0, Bt) : e.arc(n, a, m, 0, Bt), e.closePath();
        break;
      case "triangle":
        d = s ? s / 2 : m, e.moveTo(n + Math.sin(v) * d, a - Math.cos(v) * m), v += fs, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * m), v += fs, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * m), e.closePath();
        break;
      case "rectRounded":
        u = m * 0.516, c = m - u, i = Math.cos(v + Ee) * c, h = Math.cos(v + Ee) * (s ? s / 2 - u : c), l = Math.sin(v + Ee) * c, p = Math.sin(v + Ee) * (s ? s / 2 - u : c), e.arc(n - h, a - l, u, v - Ct, v - zt), e.arc(n + p, a - i, u, v - zt, v), e.arc(n + h, a + l, u, v, v + zt), e.arc(n - p, a + i, u, v + zt, v + Ct), e.closePath();
        break;
      case "rect":
        if (!k) {
          c = Math.SQRT1_2 * m, d = s ? s / 2 : c, e.rect(n - d, a - c, 2 * d, 2 * c);
          break;
        }
        v += Ee;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, p = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + p, a - i), e.lineTo(n + h, a + l), e.lineTo(n - p, a + i), e.closePath();
        break;
      case "crossRot":
        v += Ee;
      /* falls through */
      case "cross":
        h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, p = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "star":
        h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, p = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i), v += Ee, h = Math.cos(v) * (s ? s / 2 : m), i = Math.cos(v) * m, l = Math.sin(v) * m, p = Math.sin(v) * (s ? s / 2 : m), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
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
function $n(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Ha(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ya(e) {
  e.restore();
}
function dr(e, t, n, a, s) {
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
  t.translation && e.translate(t.translation[0], t.translation[1]), xt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function gr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, c = n - o.actualBoundingBoxAscent, u = n + o.actualBoundingBoxDescent, d = s.strikethrough ? (c + u) / 2 : u;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function kr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Mn(e, t, n, a, s, o = {}) {
  const i = Ot(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, u;
  for (e.save(), e.font = s.string, fr(e, o), c = 0; c < i.length; ++c)
    u = i[c], o.backdrop && kr(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), xt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(u, n, a, o.maxWidth)), e.fillText(u, n, a, o.maxWidth), gr(e, n, a, u, o), a += Number(s.lineHeight);
  e.restore();
}
function Qn(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ct, Ct, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Ct, zt, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, zt, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -zt, !0), e.lineTo(n + i.topLeft, a);
}
const pr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, mr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function br(e, t) {
  const n = ("" + e).match(pr);
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
const vr = (e) => +e || 0;
function Ka(e, t) {
  const n = {}, a = yt(t), s = a ? Object.keys(t) : t, o = yt(e) ? a ? (i) => dt(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = vr(o(i));
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
  let n = dt(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = dt(e.style, t.style);
  a && !("" + a).match(mr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: dt(e.family, t.family),
    lineHeight: br(dt(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: dt(e.weight, t.weight),
    string: ""
  };
  return s.string = ur(s), s;
}
function Fn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function yr(e, t, n) {
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
    set(l, c, u) {
      const d = l._storage || (l._storage = s());
      return l[c] = d[c] = u, delete l._keys, !0;
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
      return si(o, i, () => xr(o, i, l));
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
const _r = (e, t) => e ? e + za(t) : t, Ua = (e, t) => yt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function si(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function xr(e, t, n) {
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
  if (yt(t[0])) {
    const c = t, u = s._scopes.filter((d) => d !== c);
    t = [];
    for (const d of c) {
      const h = Xa(u, s, e, d);
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
  return Ot(s) && yt(n) ? n : s || {};
}
function Dr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = ii(_r(o, e), n), typeof s < "u")
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
  let u = l / (l + c), d = c / (l + c);
  u = isNaN(u) ? 0 : u, d = isNaN(d) ? 0 : d;
  const h = a * u, p = a * d;
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
function Lr(e, t, n) {
  const a = e.length;
  let s, o, i, l, c, u = Je(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (c = u, u = Je(e, d + 1), !(!c || !u)) {
      if (pn(t[d], 0, Tr)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      s = n[d] / t[d], o = n[d + 1] / t[d], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = s * i * t[d], n[d + 1] = o * i * t[d]);
    }
}
function Fr(e, t, n = "x") {
  const a = li(n), s = e.length;
  let o, i, l, c = Je(e, 0);
  for (let u = 0; u < s; ++u) {
    if (i = l, l = c, c = Je(e, u + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (o = (d - i[n]) / 3, l[`cp1${n}`] = d - o, l[`cp1${a}`] = h - o * t[u]), c && (o = (c[n] - d) / 3, l[`cp2${n}`] = d + o, l[`cp2${a}`] = h + o * t[u]);
  }
}
function Er(e, t = "x") {
  const n = li(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, c, u = Je(e, 0);
  for (i = 0; i < a; ++i)
    if (l = c, c = u, u = Je(e, i + 1), !!c) {
      if (u) {
        const d = u[t] - c[t];
        s[i] = d !== 0 ? (u[n] - c[n]) / d : 0;
      }
      o[i] = l ? u ? ce(s[i - 1]) !== ce(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
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
  if (t.spanGaps && (e = e.filter((u) => !u.skip)), t.cubicInterpolationMode === "monotone")
    Er(e, s);
  else {
    let u = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], c = Br(u, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = c.previous.x, l.cp1y = c.previous.y, l.cp2x = c.next.x, l.cp2y = c.next.y, u = l;
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
    const u = t.getBoundingClientRect();
    l = a.clientX - u.left, c = a.clientY - u.top, i = !0;
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
  const { canvas: n, currentDevicePixelRatio: a } = t, s = na(n), o = s.boxSizing === "border-box", i = je(s, "padding"), l = je(s, "border", "width"), { x: c, y: u, box: d } = Vr(e, n), h = i.left + (d && l.left), p = i.top + (d && l.top);
  let { width: _, height: k } = t;
  return o && (_ -= i.width + l.width, k -= i.height + l.height), {
    x: Math.round((c - h) / _ * n.width / a),
    y: Math.round((u - p) / k * n.height / a)
  };
}
function Nr(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && Za(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = na(o), c = je(l, "border", "width"), u = je(l, "padding");
      t = i.width - u.width - c.width, n = i.height - u.height - c.height, a = Jn(l.maxWidth, o, "clientWidth"), s = Jn(l.maxHeight, o, "clientHeight");
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
  let { width: u, height: d } = c;
  if (s.boxSizing === "content-box") {
    const p = je(s, "border", "width"), _ = je(s, "padding");
    u -= _.width + p.width, d -= _.height + p.height;
  }
  return u = Math.max(0, u - o.width), d = Math.max(0, a ? u / a : d - o.height), u = Me(Math.min(u, i, c.maxWidth)), d = Me(Math.min(d, l, c.maxHeight)), u && !d && (d = Me(u / 2)), (t !== void 0 || n !== void 0) && a && c.height && d > c.height && (d = c.height, u = Me(Math.floor(d * a))), {
    width: u,
    height: d
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
  }, i = ze(e, s, n), l = ze(s, o, n), c = ze(o, t, n), u = ze(i, l, n), d = ze(l, c, n);
  return ze(u, d, n);
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
function ui(e) {
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
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = ui(a), c = t.length;
  let { start: u, end: d, loop: h } = e, p, _;
  if (h) {
    for (u += c, d += c, p = 0, _ = c; p < _ && i(l(t[u % c][a]), s, o); ++p)
      u--, d--;
    u %= c, d %= c;
  }
  return d < u && (d += c), {
    start: u,
    end: d,
    loop: h,
    style: e.style
  };
}
function Xr(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: c, normalize: u } = ui(a), { start: d, end: h, loop: p, style: _ } = Ur(e, t, n), k = [];
  let m = !1, v = null, g, f, y;
  const x = () => c(s, y, g) && l(s, y) !== 0, M = () => l(o, g) === 0 || c(o, y, g), S = () => m || x(), C = () => !m || M();
  for (let $ = d, L = d; $ <= h; ++$)
    f = t[$ % i], !f.skip && (g = u(f[a]), g !== y && (m = c(g, s, o), v === null && S() && (v = l(g, s) === 0 ? $ : L), v !== null && C() && (k.push(Ss({
      start: v,
      end: $,
      loop: p,
      count: i,
      style: _
    })), v = null), L = $, y = g));
  return v !== null && k.push(Ss({
    start: v,
    end: h,
    loop: p,
    count: i,
    style: _
  })), k;
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
    const u = e[c % s];
    u.skip || u.stop ? l.skip || (a = !1, o.push({
      start: t % s,
      end: (c - 1) % s,
      loop: a
    }), t = i = u.stop ? c : null) : (i = c, l.skip && (t = c)), l = u;
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
  const c = l < i ? l + s : l, u = !!e._fullLoop && i === 0 && l === s - 1;
  return Ds(e, Qr(n, i, c, u), n, t);
}
function Ds(e, t, n, a) {
  return !a || !a.setContext || !n ? t : tc(e, t, n, a);
}
function tc(e, t, n, a) {
  const s = e._chart.getContext(), o = As(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, c = n.length, u = [];
  let d = o, h = t[0].start, p = h;
  function _(k, m, v, g) {
    const f = l ? -1 : 1;
    if (k !== m) {
      for (k += c; n[k % c].skip; )
        k -= f;
      for (; n[m % c].skip; )
        m += f;
      k % c !== m % c && (u.push({
        start: k % c,
        end: m % c,
        loop: v,
        style: g
      }), d = g, h = m % c);
    }
  }
  for (const k of t) {
    h = l ? h : k.start;
    let m = n[h % c], v;
    for (p = h + 1; p <= k.end; p++) {
      const g = n[p % c];
      v = As(a.setContext(Ye(s, {
        type: "segment",
        p0: m,
        p1: g,
        p0DataIndex: (p - 1) % c,
        p1DataIndex: p % c,
        datasetIndex: i
      }))), ec(v, d) && _(h, p - 1, k.loop, d), m = g, d = v;
    }
    h < p - 1 && _(h, p - 1, k.loop, d);
  }
  return u;
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
    const a = vs(e || Ts), s = a.valid && vs(t || Ts);
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
    this._active = !0, this._fn = t.fn || oc[t.type || typeof i], this._easing = mn[t.easing] || mn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
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
class di {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!yt(t))
      return;
    const n = Object.keys(Ft.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!yt(o))
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
      const u = i[c];
      if (u.charAt(0) === "$")
        continue;
      if (u === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const d = n[u];
      let h = o[u];
      const p = a.get(u);
      if (h)
        if (p && h.active()) {
          h.update(p, d, l);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        t[u] = d;
        continue;
      }
      o[u] = h = new ic(p, t, u, d), s.push(h);
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
function uc(e) {
  let t, n, a, s;
  return yt(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
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
  let i, l, c, u;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, l = s.length; i < l; ++i) {
    if (c = +s[i], c === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    u = e.values[c], ee(u) && (o || t === 0 || ce(t) === ce(u)) && (t += u);
  }
  return !d && !a.all ? 0 : t;
}
function dc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let c, u, d;
  for (c = 0, u = i.length; c < u; ++c)
    d = i[c], l[c] = {
      [s]: d,
      [o]: e[d]
    };
  return l;
}
function da(e, t) {
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
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, c = o.axis, u = i.axis, d = hc(o, i, a), h = t.length;
  let p;
  for (let _ = 0; _ < h; ++_) {
    const k = t[_], { [c]: m, [u]: v } = k, g = k._stacks || (k._stacks = {});
    p = g[u] = gc(s, d, m), p[l] = v, p._top = Fs(p, i, !0, a.type), p._bottom = Fs(p, i, !1, a.type);
    const f = p._visualValues || (p._visualValues = {});
    f[l] = v;
  }
}
function ha(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function kc(e, t) {
  return Ye(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function pc(e, t, n) {
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
const fa = (e) => e === "reset" || e === "none", Ps = (e, t) => t ? e : Object.assign({}, e), mc = (e, t, n) => e && !t.hidden && t._stacked && {
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
    this.configure(), this.linkScales(), t._stacked = da(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && en(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, p, _, k) => h === "x" ? p : h === "r" ? k : _, o = n.xAxisID = dt(a.xAxisID, ha(t, "x")), i = n.yAxisID = dt(a.yAxisID, ha(t, "y")), l = n.rAxisID = dt(a.rAxisID, ha(t, "r")), c = n.indexAxis, u = n.iAxisID = s(c, o, i, l), d = n.vAxisID = s(c, i, o, l);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(u), n.vScale = this.getScaleForId(d);
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
    this._data && ps(this._data, this), t._stacked && en(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (yt(n)) {
      const s = this._cachedMeta;
      this._data = dc(n, s);
    } else if (a !== n) {
      if (a) {
        ps(a, this);
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
    n._stacked = da(n.vScale, n), n.stack !== a.stack && (s = !0, en(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Es(this, n._parsed), n._stacked = da(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let c = t === 0 && n === s.length ? !0 : a._sorted, u = t > 0 && a._parsed[t - 1], d, h, p;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, p = s;
    else {
      Ot(s[t]) ? p = this.parseArrayData(a, s, t, n) : yt(s[t]) ? p = this.parseObjectData(a, s, t, n) : p = this.parsePrimitiveData(a, s, t, n);
      const _ = () => h[l] === null || u && h[l] < u[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = p[d], c && (_() && (c = !1), u = h);
      a._sorted = c;
    }
    i && Es(this, p);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, c = i.axis, u = o.getLabels(), d = o === i, h = new Array(s);
    let p, _, k;
    for (p = 0, _ = s; p < _; ++p)
      k = p + a, h[p] = {
        [l]: d || o.parse(u[k], k),
        [c]: i.parse(n[k], k)
      };
    return h;
  }
  parseArrayData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, l = new Array(s);
    let c, u, d, h;
    for (c = 0, u = s; c < u; ++c)
      d = c + a, h = n[d], l[c] = {
        x: o.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return l;
  }
  parseObjectData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: c = "y" } = this._parsing, u = new Array(s);
    let d, h, p, _;
    for (d = 0, h = s; d < h; ++d)
      p = d + a, _ = n[p], u[d] = {
        x: o.parse(We(_, l), p),
        y: i.parse(We(_, c), p)
      };
    return u;
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
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), c = mc(n, a, this.chart), u = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = fc(l);
    let p, _;
    function k() {
      _ = s[p];
      const m = _[l.axis];
      return !ee(_[t.axis]) || d > m || h < m;
    }
    for (p = 0; p < i && !(!k() && (this.updateRangeFromParsed(u, t, _, c), o)); ++p)
      ;
    if (o) {
      for (p = i - 1; p >= 0; --p)
        if (!k()) {
          this.updateRangeFromParsed(u, t, _, c);
          break;
        }
    }
    return u;
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
    this.update(t || "default"), n._clip = uc(dt(this.options.clip, cc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, s = a.data || [], o = n.chartArea, i = [], l = this._drawStart || 0, c = this._drawCount || s.length - l, u = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(t, o, l, c), d = l; d < l + c; ++d) {
      const h = s[d];
      h.hidden || (h.active && u ? i.push(h) : h.draw(t, o));
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
      o = i.$context || (i.$context = pc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
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
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], c = this.enableOptionSharing && xn(a);
    if (l)
      return Ps(l, c);
    const u = this.chart.config, d = u.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = u.getOptionScopes(this.getDataset(), d), _ = Object.keys(Ft.elements[t]), k = () => this.getContext(a, s, n), m = u.resolveNamedOptions(p, _, k, h);
    return m.$shared && (m.$shared = c, o[i] = Object.freeze(Ps(m, c))), m;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let c;
    if (s.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), p = d.getOptionScopes(this.getDataset(), h);
      c = d.createResolver(p, this.getContext(t, a, n));
    }
    const u = new di(s, c && c.animations);
    return c && c._cacheable && (o[i] = Object.freeze(u)), u;
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
    for (const [l, c, u] of this._syncList)
      this[l](c, u);
    this._syncList = [];
    const s = a.length, o = n.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, n, a = !0) {
    const s = this._cachedMeta, o = s.data, i = t + n;
    let l;
    const c = (u) => {
      for (u.length += n, l = u.length - 1; l >= i; l--)
        u[l] = u[l - n];
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
function bc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = Zo(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function vc(e) {
  const t = e.iScale, n = bc(t, e.type);
  let a = t._length, s, o, i, l;
  const c = () => {
    i === 32767 || i === -32768 || (xn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), c();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), c();
  return a;
}
function yc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return xt(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function _c(e, t, n, a) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const c = n.categoryPercentage;
  i === null && (i = o - (l === null ? t.end - t.start : l - o)), l === null && (l = o + o - i);
  const u = o - (o - Math.min(i, l)) / 2 * c;
  return {
    chunk: Math.abs(l - i) / 2 * c / a,
    ratio: n.barPercentage,
    start: u
  };
}
function xc(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let c = i, u = l;
  Math.abs(i) > Math.abs(l) && (c = l, u = i), t[n.axis] = u, t._custom = {
    barStart: c,
    barEnd: u,
    start: s,
    end: o,
    min: i,
    max: l
  };
}
function fi(e, t, n, a) {
  return Ot(e) ? xc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Is(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, c = [];
  let u, d, h, p;
  for (u = n, d = n + a; u < d; ++u)
    p = t[u], h = {}, h[s.axis] = l || s.parse(i[u], u), c.push(fi(p, h, o, u));
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
  const { start: i, end: l, reverse: c, top: u, bottom: d } = Cc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = u : (n._bottom || 0) === a ? s = d : (o[Rs(d, i, l, c)] = !0, s = u)), o[Rs(s, i, l, c)] = !0, e.borderSkipped = o;
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
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: c = "y" } = this._parsing, u = o.axis === "x" ? l : c, d = i.axis === "x" ? l : c, h = [];
    let p, _, k, m;
    for (p = a, _ = a + s; p < _; ++p)
      m = n[p], k = {}, k[o.axis] = o.parse(We(m, u), p), h.push(fi(We(m, d), k, i, p));
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, c = l.getBasePixel(), u = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(n, s);
    for (let _ = n; _ < n + a; _++) {
      const k = this.getParsed(_), m = o || xt(k[l.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(_), v = this._calculateBarIndexPixels(_, d), g = (k._stacks || {})[l.axis], f = {
        horizontal: u,
        base: m.base,
        enableBorderRadius: !g || ga(k._custom) || i === g._top || i === g._bottom,
        x: u ? m.head : v.center,
        y: u ? v.center : m.head,
        height: u ? v.size : Math.abs(m.size),
        width: u ? Math.abs(m.size) : v.size
      };
      p && (f.options = h || this.resolveDataElementOptions(_, t[_].active ? "active" : s));
      const y = f.options || t[_].options;
      $c(f, y, g, i), Sc(f, y, d.ratio), this.updateElement(t[_], _, f, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), c = l && l[a.axis], u = (d) => {
      const h = d._parsed.find((_) => _[a.axis] === c), p = h && h[d.vScale.axis];
      if (xt(p) || isNaN(p))
        return !0;
    };
    for (const d of s)
      if (!(n !== void 0 && u(d)) && ((o === !1 || i.indexOf(d.stack) === -1 || o === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
      min: l || vc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, c = this.getParsed(t), u = c._custom, d = ga(u);
    let h = c[n.axis], p = 0, _ = a ? this.applyStack(n, c, a) : h, k, m;
    _ !== h && (p = _ - h, _ = h), d && (h = u.barStart, _ = u.barEnd - u.barStart, h !== 0 && ce(h) !== ce(u.barEnd) && (p = 0), p += h);
    const v = !xt(o) && !d ? o : p;
    let g = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? k = n.getPixelForValue(p + _) : k = g, m = k - g, Math.abs(m) < i) {
      m = wc(m, n, l) * i, h === l && (g -= m / 2);
      const f = n.getPixelForDecimal(0), y = n.getPixelForDecimal(1), x = Math.min(f, y), M = Math.max(f, y);
      g = Math.max(Math.min(g, M), x), k = g + m, a && !d && (c._stacks[n.axis]._visualValues[s] = n.getValueForPixel(k) - n.getValueForPixel(g));
    }
    if (g === n.getPixelForValue(l)) {
      const f = ce(m) * n.getLineWidthForValue(l) / 2;
      g += f, m -= f;
    }
    return {
      size: m,
      base: g,
      head: k,
      center: k + m / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = dt(s.maxBarThickness, 1 / 0);
    let l, c;
    const u = this._getAxisCount();
    if (n.grouped) {
      const d = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? _c(t, n, s, d * u) : yc(t, n, s, d * u), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, _ = this._getAxis().indexOf(dt(p, this.getFirstScaleIdForIndexAxis())), k = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + _;
      l = h.start + h.chunk * k + h.chunk / 2, c = Math.min(i, h.chunk * h.ratio);
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
    const l = e, c = l + t, u = Math.cos(l), d = Math.sin(l), h = Math.cos(c), p = Math.sin(c), _ = (y, x, M) => Cn(y, l, c, !0) ? 1 : Math.max(x, x * n, M, M * n), k = (y, x, M) => Cn(y, l, c, !0) ? -1 : Math.min(x, x * n, M, M * n), m = _(0, u, h), v = _(zt, d, p), g = k(Ct, u, h), f = k(Ct + zt, d, p);
    a = (m - g) / 2, s = (v - f) / 2, o = -(m + g) / 2, i = -(v + f) / 2;
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
            return n.labels.length && n.datasets.length ? n.labels.map((c, u) => {
              const h = t.getDatasetMeta(0).controller.getStyle(u);
              return {
                text: c,
                fillStyle: h.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(u),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: s,
                pointStyle: a,
                borderRadius: i && (l || h.borderRadius),
                index: u
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
      if (yt(a[t])) {
        const { key: c = "value" } = this._parsing;
        o = (u) => +We(a[u], c);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ke(this.options.rotation - 90);
  }
  _getCircumference() {
    return ke(this.options.circumference);
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), c = Math.min(Fl(this.options.cutout, l), 1), u = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: _, offsetX: k, offsetY: m } = Ac(h, d, c), v = (a.width - i) / p, g = (a.height - i) / _, f = Math.max(Math.min(v, g) / 2, 0), y = Ko(this.options.radius, f), x = Math.max(y * c, 0), M = (y - x) / this._getVisibleDatasetWeightTotal();
    this.offsetX = k * y, this.offsetY = m * y, s.total = this.calculateTotal(), this.outerRadius = y - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * u, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Bt);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, u = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, p = o && u.animateScale, _ = p ? 0 : this.innerRadius, k = p ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: v } = this._getSharedOptions(n, s);
    let g = this._getRotation(), f;
    for (f = 0; f < n; ++f)
      g += this._circumference(f, o);
    for (f = n; f < n + a; ++f) {
      const y = this._circumference(f, o), x = t[f], M = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + y,
        circumference: y,
        outerRadius: k,
        innerRadius: _
      };
      v && (M.options = m || this.resolveDataElementOptions(f, x.active ? "active" : s)), g += y, this.updateElement(x, f, M, s);
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
    return Math.max(dt(this.chart.data.datasets[t].weight, 1), 0);
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
    const u = this.resolveDatasetElementOptions(t);
    this.options.showLine || (u.borderWidth = 0), u.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: u
    }, t), this.updateElements(s, l, c, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: c, _dataset: u } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, s), p = i.axis, _ = l.axis, { spanGaps: k, segment: m } = this.options, v = wn(k) ? k : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || s === "none", f = n + a, y = t.length;
    let x = n > 0 && this.getParsed(n - 1);
    for (let M = 0; M < y; ++M) {
      const S = t[M], C = g ? S : {};
      if (M < n || M >= f) {
        C.skip = !0;
        continue;
      }
      const $ = this.getParsed(M), L = xt($[_]), T = C[p] = i.getPixelForValue($[p], M), B = C[_] = o || L ? l.getBasePixel() : l.getPixelForValue(c ? this.applyStack(l, $, c) : $[_], M);
      C.skip = isNaN(T) || isNaN(B) || L, C.stop = M > 0 && Math.abs($[p] - x[p]) > v, m && (C.parsed = $, C.raw = u.data[M]), h && (C.options = d || this.resolveDataElementOptions(M, S.active ? "active" : s)), g || this.updateElement(S, M, C, s), x = $;
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
    const u = l._reversePixels ? Ul : Ve;
    if (a) {
      if (s._sharedOptions) {
        const d = o[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const p = u(o, t, n - h), _ = u(o, t, n + h);
          return {
            lo: p.lo,
            hi: _.hi
          };
        }
      }
    } else {
      const d = u(o, t, n);
      if (c) {
        const { vScale: h } = s._cachedMeta, { _parsed: p } = e, _ = p.slice(0, d.lo + 1).reverse().findIndex((m) => !xt(m[h.axis]));
        d.lo -= Math.max(0, _);
        const k = p.slice(d.hi).findIndex((m) => !xt(m[h.axis]));
        d.hi += Math.max(0, k);
      }
      return d;
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
    const { index: u, data: d } = o[l], { lo: h, hi: p } = Ec(o[l], t, i, s);
    for (let _ = h; _ <= p; ++_) {
      const k = d[_];
      k.skip || a(k, u, _);
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
function ka(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || sa(e, n, t, function(l, c, u) {
    !s && !$n(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: c,
      index: u
    });
  }, !0), o;
}
function Ic(e, t, n, a) {
  let s = [];
  function o(i, l, c) {
    const { startAngle: u, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Xo(i, {
      x: t.x,
      y: t.y
    });
    Cn(h, u, d) && s.push({
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
  function u(d, h, p) {
    const _ = d.inRange(t.x, t.y, s);
    if (a && !_)
      return;
    const k = d.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(k)) && !_)
      return;
    const v = l(t, k);
    v < c ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: p
      }
    ], c = v) : v === c && i.push({
      element: d,
      datasetIndex: h,
      index: p
    });
  }
  return sa(e, n, t, u), i;
}
function pa(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Ic(e, t, n, s) : Rc(e, t, n, a, s, o);
}
function zs(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return sa(e, n, t, (c, u, d) => {
    c[i] && c[i](t[n], s) && (o.push({
      element: c,
      datasetIndex: u,
      index: d
    }), l = l || c.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var Oc = {
  modes: {
    index(e, t, n, a) {
      const s = Oe(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? ka(e, s, o, a, i) : pa(e, s, o, !1, a, i), c = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((u) => {
        const d = l[0].index, h = u.data[d];
        h && !h.skip && c.push({
          element: h,
          datasetIndex: u.index,
          index: d
        });
      }), c) : [];
    },
    dataset(e, t, n, a) {
      const s = Oe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? ka(e, s, o, a, i) : pa(e, s, o, !1, a, i);
      if (l.length > 0) {
        const c = l[0].datasetIndex, u = e.getDatasetMeta(c).data;
        l = [];
        for (let d = 0; d < u.length; ++d)
          l.push({
            element: u[d],
            datasetIndex: c,
            index: d
          });
      }
      return l;
    },
    point(e, t, n, a) {
      const s = Oe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return ka(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = Oe(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return pa(e, s, o, n.intersect, a, i);
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
    const { fullSize: c } = l.box, u = n[l.stack], d = u && l.stackWeight / u.weight;
    l.horizontal ? (l.width = d ? d * a : c && t.availableWidth, l.height = s) : (l.width = a, l.height = d ? d * s : c && t.availableHeight);
  }
  return n;
}
function jc(e) {
  const t = zc(e), n = an(t.filter((u) => u.box.fullSize), !0), a = an(nn(t, "left"), !0), s = an(nn(t, "right")), o = an(nn(t, "top"), !0), i = an(nn(t, "bottom")), l = Vs(t, "x"), c = Vs(t, "y");
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
function ki(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Wc(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!yt(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && ki(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - Ns(i, e, "left", "right")), c = Math.max(0, t.outerHeight - Ns(i, e, "top", "bottom")), u = l !== e.w, d = c !== e.h;
  return e.w = l, e.h = c, n.horizontal ? {
    same: u,
    other: d
  } : {
    same: d,
    other: u
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
  let o, i, l, c, u, d;
  for (o = 0, i = e.length, u = 0; o < i; ++o) {
    l = e[o], c = l.box, c.update(l.width || t.w, l.height || t.h, Yc(l.horizontal, t));
    const { same: h, other: p } = Wc(t, n, l, a);
    u |= h && s.length, d = d || p, c.fullSize || s.push(l);
  }
  return u && hn(s, t, n, a) || d;
}
function In(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function js(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const c = l.box, u = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / u.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, p = u.size || c.height;
      xn(u.start) && (i = u.start), c.fullSize ? In(c, s.left, i, n.outerWidth - s.right - s.left, p) : In(c, t.left + u.placed, i, h, p), u.start = i, u.placed += h, i = c.bottom;
    } else {
      const h = t.h * d, p = u.size || c.width;
      xn(u.start) && (o = u.start), c.fullSize ? In(c, o, s.top, p, n.outerHeight - s.bottom - s.top) : In(c, o, t.top + u.placed, p, h), u.start = o, u.placed += h, o = c.right;
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
    const s = ne(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = jc(e.boxes), c = l.vertical, u = l.horizontal;
    wt(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const d = c.reduce((m, v) => v.box.options && v.box.options.display === !1 ? m : m + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / d,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, s);
    ki(p, ne(a));
    const _ = Object.assign({
      maxPadding: p,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), k = Nc(c.concat(u), h);
    hn(l.fullSize, _, h, k), hn(c, _, h, k), hn(u, _, h, k) && hn(c, _, h, k), Hc(_), js(l.leftAndTop, _, h, k), _.x += _.w, _.y += _.h, js(l.rightAndBottom, _, h, k), e.chartArea = {
      left: _.left,
      top: _.top,
      right: _.left + _.w,
      bottom: _.top + _.h,
      height: _.h,
      width: _.w
    }, wt(l.chartArea, (m) => {
      const v = m.box;
      Object.assign(v, e.chartArea), v.update(_.w, _.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class pi {
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
class Kc extends pi {
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
const mi = Wr ? {
  passive: !0
} : !1;
function Xc(e, t, n) {
  e && e.addEventListener(t, n, mi);
}
function Gc(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, mi);
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
function bi() {
  const e = window.devicePixelRatio;
  e !== Hs && (Hs = e, Sn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function tu(e, t) {
  Sn.size || window.addEventListener("resize", bi), Sn.set(e, t);
}
function eu(e) {
  Sn.delete(e), Sn.size || window.removeEventListener("resize", bi);
}
function nu(e, t, n) {
  const a = e.canvas, s = a && Za(a);
  if (!s)
    return;
  const o = Jo((l, c) => {
    const u = s.clientWidth;
    n(l, c), u < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const c = l[0], u = c.contentRect.width, d = c.contentRect.height;
    u === 0 && d === 0 || o(u, d);
  });
  return i.observe(s), tu(e, o), i;
}
function ma(e, t, n) {
  n && n.disconnect(), t === "resize" && eu(e);
}
function au(e, t, n) {
  const a = e.canvas, s = Jo((o) => {
    e.ctx !== null && n(Zc(o, e));
  }, e);
  return Xc(a, t, s), s;
}
class su extends pi {
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
      xt(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
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
      resize: nu
    }[n] || au;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: ma,
      detach: ma,
      resize: ma
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
function ou(e) {
  return !Ga() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Kc : su;
}
let me = class {
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
function iu(e, t) {
  const n = e.options.ticks, a = lu(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? cu(t) : [], i = o.length, l = o[0], c = o[i - 1], u = [];
  if (i > s)
    return uu(t, u, o, i / s), u;
  const d = ru(o, t, s);
  if (i > 0) {
    let h, p;
    const _ = i > 1 ? Math.round((c - l) / (i - 1)) : null;
    for (Rn(t, u, d, xt(_) ? 0 : l - _, l), h = 0, p = i - 1; h < p; h++)
      Rn(t, u, d, o[h], o[h + 1]);
    return Rn(t, u, d, c, xt(_) ? t.length : c + _), u;
  }
  return Rn(t, u, d), u;
}
function lu(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function ru(e, t, n) {
  const a = du(e), s = t.length / n;
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
function cu(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function uu(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function Rn(e, t, n, a, s) {
  const o = dt(a, 0), i = Math.min(dt(s, e.length), e.length);
  let l = 0, c, u, d;
  for (n = Math.ceil(n), s && (c = s - a, n = c / Math.floor(c / n)), d = o; d < 0; )
    l++, d = Math.round(o + l * n);
  for (u = Math.max(o, 0); u < i; u++)
    u === d && (t.push(e[u]), l++, d = Math.round(o + l * n));
}
function du(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const hu = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ys = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Ks = (e, t) => Math.min(t || e, e);
function qs(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function fu(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let c = e.getPixelForTick(s), u;
  if (!(n && (a === 1 ? u = Math.max(c - o, i - c) : t === 0 ? u = (e.getPixelForTick(1) - c) / 2 : u = (c - e.getPixelForTick(s - 1)) / 2, c += s < t ? u : -u, c < o - l || c > i + l)))
    return c;
}
function gu(e, t) {
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
function ku(e, t) {
  return Ye(e, {
    scale: t,
    type: "scale"
  });
}
function pu(e, t, n) {
  return Ye(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function mu(e, t, n) {
  let a = Na(e);
  return (n && t !== "right" || !n && t === "right") && (a = hu(a)), a;
}
function bu(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: c } = e, { chartArea: u, scales: d } = c;
  let h = 0, p, _, k;
  const m = i - s, v = l - o;
  if (e.isHorizontal()) {
    if (_ = jt(a, o, l), yt(n)) {
      const g = Object.keys(n)[0], f = n[g];
      k = d[g].getPixelForValue(f) + m - t;
    } else n === "center" ? k = (u.bottom + u.top) / 2 + m - t : k = Ys(e, n, t);
    p = l - o;
  } else {
    if (yt(n)) {
      const g = Object.keys(n)[0], f = n[g];
      _ = d[g].getPixelForValue(f) - v + t;
    } else n === "center" ? _ = (u.left + u.right) / 2 - v + t : _ = Ys(e, n, t);
    k = jt(a, i, s), h = n === "left" ? -zt : zt;
  }
  return {
    titleX: _,
    titleY: k,
    maxWidth: p,
    rotation: h
  };
}
class tn extends me {
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
    for (let c = 0, u = l.length; c < u; ++c)
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = yr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = l < this.ticks.length;
    this._convertTicksToLabels(c ? qs(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = iu(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    let i = s, l, c, u;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, p = d.highest.height, _ = Wt(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : _ / (a - 1), h + 6 > l && (l = _ / (a - (t.offset ? 0.5 : 1)), c = this.maxHeight - sn(t.grid) - n.padding - Us(t.title, this.chart.options.font), u = Math.sqrt(h * h + p * p), i = Yl(Math.min(Math.asin(Wt((d.highest.height + 6) / l, -1, 1)), Math.asin(Wt(c / u, -1, 1)) - Math.asin(Wt(p / u, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
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
        const { first: u, last: d, widest: h, highest: p } = this._getLabelSizes(), _ = a.padding * 2, k = ke(this.labelRotation), m = Math.cos(k), v = Math.sin(k);
        if (l) {
          const g = a.mirror ? 0 : v * h.width + m * p.height;
          t.height = Math.min(this.maxHeight, t.height + g + _);
        } else {
          const g = a.mirror ? 0 : m * h.width + v * p.height;
          t.width = Math.min(this.maxWidth, t.width + g + _);
        }
        this._calculatePadding(u, d, v, m);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, c = this.labelRotation !== 0, u = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, _ = 0;
      c ? u ? (p = s * t.width, _ = a * n.height) : (p = a * t.height, _ = s * n.width) : o === "start" ? _ = n.width : o === "end" ? p = t.width : o !== "inner" && (p = t.width / 2, _ = n.width / 2), this.paddingLeft = Math.max((p - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((_ - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      o === "start" ? (d = 0, h = t.height) : o === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
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
      xt(t[n].label) && (t.splice(n, 1), a--, n--);
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
    let u = 0, d = 0, h, p, _, k, m, v, g, f, y, x, M;
    for (h = 0; h < n; h += c) {
      if (k = t[h].label, m = this._resolveTickFontOptions(h), s.font = v = m.string, g = o[v] = o[v] || {
        data: {},
        gc: []
      }, f = m.lineHeight, y = x = 0, !xt(k) && !Ot(k))
        y = _s(s, g.data, g.gc, y, k), x = f;
      else if (Ot(k))
        for (p = 0, _ = k.length; p < _; ++p)
          M = k[p], !xt(M) && !Ot(M) && (y = _s(s, g.data, g.gc, y, M), x += f);
      i.push(y), l.push(x), u = Math.max(y, u), d = Math.max(x, d);
    }
    gu(o, n);
    const S = i.indexOf(u), C = l.indexOf(d), $ = (L) => ({
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
      return a.$context || (a.$context = pu(this.getContext(), t, a));
    }
    return this.$context || (this.$context = ku(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = ke(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, c = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? c * a > l * s ? l / a : c / s : c * s < l * a ? c / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, c = o.offset, u = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), p = sn(o), _ = [], k = l.setContext(this.getContext()), m = k.display ? k.width : 0, v = m / 2, g = function(W) {
      return Pe(a, W, m);
    };
    let f, y, x, M, S, C, $, L, T, B, E, P;
    if (i === "top")
      f = g(this.bottom), C = this.bottom - p, L = f - v, B = g(t.top) + v, P = t.bottom;
    else if (i === "bottom")
      f = g(this.top), B = t.top, P = g(t.bottom) - v, C = f + v, L = this.top + p;
    else if (i === "left")
      f = g(this.right), S = this.right - p, $ = f - v, T = g(t.left) + v, E = t.right;
    else if (i === "right")
      f = g(this.left), T = t.left, E = g(t.right) - v, S = f + v, $ = this.left + p;
    else if (n === "x") {
      if (i === "center")
        f = g((t.top + t.bottom) / 2 + 0.5);
      else if (yt(i)) {
        const W = Object.keys(i)[0], J = i[W];
        f = g(this.chart.scales[W].getPixelForValue(J));
      }
      B = t.top, P = t.bottom, C = f + v, L = C + p;
    } else if (n === "y") {
      if (i === "center")
        f = g((t.left + t.right) / 2);
      else if (yt(i)) {
        const W = Object.keys(i)[0], J = i[W];
        f = g(this.chart.scales[W].getPixelForValue(J));
      }
      S = f - v, $ = S - p, T = t.left, E = t.right;
    }
    const N = dt(s.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / N));
    for (y = 0; y < h; y += Y) {
      const W = this.getContext(y), J = o.setContext(W), tt = l.setContext(W), lt = J.lineWidth, bt = J.color, kt = tt.dash || [], ct = tt.dashOffset, Mt = J.tickWidth, st = J.tickColor, Et = J.tickBorderDash || [], At = J.tickBorderDashOffset;
      x = fu(this, y, c), x !== void 0 && (M = Pe(a, x, lt), u ? S = $ = T = E = M : C = L = B = P = M, _.push({
        tx1: S,
        ty1: C,
        tx2: $,
        ty2: L,
        x1: T,
        y1: B,
        x2: E,
        y2: P,
        width: lt,
        color: bt,
        borderDash: kt,
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
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: c, crossAlign: u, padding: d, mirror: h } = o, p = sn(a.grid), _ = p + d, k = h ? -d : _, m = -ke(this.labelRotation), v = [];
    let g, f, y, x, M, S, C, $, L, T, B, E, P = "middle";
    if (s === "top")
      S = this.bottom - k, C = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      S = this.top + k, C = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const Y = this._getYAxisLabelAlignment(p);
      C = Y.textAlign, M = Y.x;
    } else if (s === "right") {
      const Y = this._getYAxisLabelAlignment(p);
      C = Y.textAlign, M = Y.x;
    } else if (n === "x") {
      if (s === "center")
        S = (t.top + t.bottom) / 2 + _;
      else if (yt(s)) {
        const Y = Object.keys(s)[0], W = s[Y];
        S = this.chart.scales[Y].getPixelForValue(W) + _;
      }
      C = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        M = (t.left + t.right) / 2 - _;
      else if (yt(s)) {
        const Y = Object.keys(s)[0], W = s[Y];
        M = this.chart.scales[Y].getPixelForValue(W);
      }
      C = this._getYAxisLabelAlignment(p).textAlign;
    }
    n === "y" && (c === "start" ? P = "top" : c === "end" && (P = "bottom"));
    const N = this._getLabelSizes();
    for (g = 0, f = l.length; g < f; ++g) {
      y = l[g], x = y.label;
      const Y = o.setContext(this.getContext(g));
      $ = this.getPixelForTick(g) + o.labelOffset, L = this._resolveTickFontOptions(g), T = L.lineHeight, B = Ot(x) ? x.length : 1;
      const W = B / 2, J = Y.color, tt = Y.textStrokeColor, lt = Y.textStrokeWidth;
      let bt = C;
      i ? (M = $, C === "inner" && (g === f - 1 ? bt = this.options.reverse ? "left" : "right" : g === 0 ? bt = this.options.reverse ? "right" : "left" : bt = "center"), s === "top" ? u === "near" || m !== 0 ? E = -B * T + T / 2 : u === "center" ? E = -N.highest.height / 2 - W * T + T : E = -N.highest.height + T / 2 : u === "near" || m !== 0 ? E = T / 2 : u === "center" ? E = N.highest.height / 2 - W * T : E = N.highest.height - B * T, h && (E *= -1), m !== 0 && !Y.showLabelBackdrop && (M += T / 2 * Math.sin(m))) : (S = $, E = (1 - B) * T / 2);
      let kt;
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
        switch (C) {
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
        kt = {
          left: At,
          top: Et,
          width: st + ct.width,
          height: Mt + ct.height,
          color: Y.backdropColor
        };
      }
      v.push({
        label: x,
        font: L,
        textOffset: E,
        options: {
          rotation: m,
          color: J,
          strokeColor: tt,
          strokeWidth: lt,
          textAlign: bt,
          textBaseline: P,
          translation: [
            M,
            S
          ],
          backdrop: kt
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-ke(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), l = t + o, c = i.widest.width;
    let u, d;
    return n === "left" ? s ? (d = this.right + o, a === "near" ? u = "left" : a === "center" ? (u = "center", d += c / 2) : (u = "right", d += c)) : (d = this.right - l, a === "near" ? u = "right" : a === "center" ? (u = "center", d -= c / 2) : (u = "left", d = this.left)) : n === "right" ? s ? (d = this.left + o, a === "near" ? u = "right" : a === "center" ? (u = "center", d -= c / 2) : (u = "left", d -= c)) : (d = this.left + l, a === "near" ? u = "left" : a === "center" ? (u = "center", d += c / 2) : (u = "right", d = this.right)) : u = "right", {
      textAlign: u,
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
    const l = (c, u, d) => {
      !d.width || !d.color || (a.save(), a.lineWidth = d.width, a.strokeStyle = d.color, a.setLineDash(d.borderDash || []), a.lineDashOffset = d.borderDashOffset, a.beginPath(), a.moveTo(c.x, c.y), a.lineTo(u.x, u.y), a.stroke(), a.restore());
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
    let u, d, h, p;
    this.isHorizontal() ? (u = Pe(t, this.left, i) - i / 2, d = Pe(t, this.right, l) + l / 2, h = p = c) : (h = Pe(t, this.top, i) - i / 2, p = Pe(t, this.bottom, l) + l / 2, u = d = c), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(u, h), n.lineTo(d, p), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && Ha(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, c = i.font, u = i.label, d = i.textOffset;
      Mn(a, u, 0, d, c, l);
    }
    s && Ya(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Ht(a.font), i = ne(a.padding), l = a.align;
    let c = o.lineHeight / 2;
    n === "bottom" || n === "center" || yt(n) ? (c += i.bottom, Ot(a.text) && (c += o.lineHeight * (a.text.length - 1))) : c += i.top;
    const { titleX: u, titleY: d, maxWidth: h, rotation: p } = bu(this, c, n, l);
    Mn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: p,
      textAlign: mu(l, n, s),
      textBaseline: "middle",
      translation: [
        u,
        d
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = dt(t.grid && t.grid.z, -1), s = dt(t.border && t.border.z, 0);
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
    _u(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, vu(t, i, a), this.override && Ft.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in Ft[s] && (delete Ft[s][a], this.override && delete He[a]);
  }
}
function vu(e, t, n) {
  const a = _n(/* @__PURE__ */ Object.create(null), [
    n ? Ft.get(n) : {},
    Ft.get(t),
    e.defaults
  ]);
  Ft.set(t, a), e.defaultRoutes && yu(t, e.defaultRoutes), e.descriptors && Ft.describe(t, e.descriptors);
}
function yu(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), c = i.join(".");
    Ft.route(o, s, c, l);
  });
}
function _u(e) {
  return "id" in e && "defaults" in e;
}
class xu {
  constructor() {
    this.controllers = new On(aa, "datasets", !0), this.elements = new On(me, "elements"), this.plugins = new On(Object, "plugins"), this.scales = new On(tn, "scales"), this._typedRegistries = [
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
var re = /* @__PURE__ */ new xu();
class wu {
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
    xt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = dt(a.options && a.options.plugins, {}), o = Cu(a);
    return s === !1 && !n ? [] : Mu(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((c) => l.plugin.id === c.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function Cu(e) {
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
function $u(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Mu(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const c = l.id, u = $u(a[c], s);
    u !== null && o.push({
      plugin: l,
      options: Su(e.config, {
        plugin: l,
        local: n[c]
      }, u, i)
    });
  }
  return o;
}
function Su(e, { plugin: t, local: n }, a, s) {
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
function Du(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Au(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Xs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Tu(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function La(e, ...t) {
  if (Xs(e))
    return e;
  for (const n of t) {
    const a = n.axis || Tu(n.position) || e.length > 1 && Xs(e[0].toLowerCase());
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
function Bu(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return Gs(e, "x", n[0]) || Gs(e, "y", n[0]);
  }
  return {};
}
function Lu(e, t) {
  const n = He[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ba(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!yt(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const c = La(i, l, Bu(i, e), Ft.scales[l.type]), u = Au(c, s), d = n.scales || {};
    o[i] = kn(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      l,
      d[c],
      d[u]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, c = i.indexAxis || Ba(l, t), d = (He[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const p = Du(h, c), _ = i[p + "AxisID"] || p;
      o[_] = o[_] || /* @__PURE__ */ Object.create(null), kn(o[_], [
        {
          axis: p
        },
        a[_],
        d[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    kn(l, [
      Ft.scales[l.type],
      Ft.scale
    ]);
  }), o;
}
function vi(e) {
  const t = e.options || (e.options = {});
  t.plugins = dt(t.plugins, {}), t.scales = Lu(e, t);
}
function yi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Fu(e) {
  return e = e || {}, e.data = yi(e.data), vi(e), e;
}
const Zs = /* @__PURE__ */ new Map(), _i = /* @__PURE__ */ new Set();
function zn(e, t) {
  let n = Zs.get(e);
  return n || (n = t(), Zs.set(e, n), _i.add(n)), n;
}
const on = (e, t, n) => {
  const a = We(t, n);
  a !== void 0 && e.add(a);
};
class Eu {
  constructor(t) {
    this._config = Fu(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this.clearCache(), vi(t);
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
    n.forEach((d) => {
      t && (c.add(t), d.forEach((h) => on(c, t, h))), d.forEach((h) => on(c, s, h)), d.forEach((h) => on(c, He[o] || {}, h)), d.forEach((h) => on(c, Ft, h)), d.forEach((h) => on(c, Aa, h));
    });
    const u = Array.from(c);
    return u.length === 0 && u.push(/* @__PURE__ */ Object.create(null)), _i.has(n) && i.set(n, u), u;
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
    if (Iu(i, n)) {
      o.$shared = !1, a = Ae(a) ? a() : a;
      const u = this.createResolver(t, a, l);
      c = Qe(i, a, u);
    }
    for (const u of n)
      o[u] = c[u];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = Qs(this._resolverCache, t, a);
    return yt(n) ? Qe(o, n, void 0, s) : o;
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
const Pu = (e) => yt(e) && Object.getOwnPropertyNames(e).some((t) => Ae(e[t]));
function Iu(e, t) {
  const { isScriptable: n, isIndexable: a } = ai(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Ae(l) || Pu(l)) || i && Ot(l))
      return !0;
  }
  return !1;
}
var Ru = "4.5.1";
const Ou = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Js(e, t) {
  return e === "top" || e === "bottom" || Ou.indexOf(e) === -1 && t === "x";
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
function zu(e) {
  const t = e.chart, n = t.options.animation;
  Dt(n && n.onProgress, [
    e
  ], t);
}
function xi(e) {
  return Ga() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Yn = {}, no = (e) => {
  const t = xi(e);
  return Object.values(Yn).filter((n) => n.canvas === t).pop();
};
function Vu(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function Nu(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Te = class {
  static defaults = Ft;
  static instances = Yn;
  static overrides = He;
  static registry = re;
  static version = Ru;
  static getChart = no;
  static register(...t) {
    re.add(...t), ao();
  }
  static unregister(...t) {
    re.remove(...t), ao();
  }
  constructor(t, n) {
    const a = this.config = new Eu(n), s = xi(t), o = no(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || ou(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), c = l && l.canvas, u = c && c.height, d = c && c.width;
    if (this.id = Ll(), this.ctx = l, this.canvas = c, this.width = d, this.height = u, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new wu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Zl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Yn[this.id] = this, !l || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    he.listen(this, "complete", eo), he.listen(this, "progress", zu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return xt(t) ? n && o ? o : s ? a / s : null : t;
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
    return xs(this.canvas, this.ctx), this;
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
      const l = n[i], c = La(i, l), u = c === "r", d = c === "x";
      return {
        options: l,
        dposition: u ? "chartArea" : d ? "bottom" : "left",
        dtype: u ? "radialLinear" : d ? "category" : "linear"
      };
    }))), wt(o, (i) => {
      const l = i.options, c = l.id, u = La(c, l), d = dt(l.type, i.dtype);
      (l.position === void 0 || Js(l.position, u) !== Js(i.dposition)) && (l.position = i.dposition), s[c] = !0;
      let h = null;
      if (c in a && a[c].type === d)
        h = a[c];
      else {
        const p = re.getScale(d);
        h = new p({
          id: c,
          type: d,
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
        const c = re.getController(l), { datasetElementType: u, dataElementType: d } = Ft.datasets[l];
        Object.assign(c, {
          dataElementType: re.getElement(d),
          datasetElementType: u && re.getElement(u)
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
    for (let u = 0, d = this.data.datasets.length; u < d; u++) {
      const { controller: h } = this.getDatasetMeta(u), p = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || wt(o, (u) => {
      u.reset();
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
      Vu(t, s, i);
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
    xn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), xs(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Yn[this.id], this.notifyPlugins("afterDestroy");
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
    const t = this._responsiveListeners, n = this.platform, a = (c, u) => {
      n.addEventListener(this, c, u), t[c] = u;
    }, s = (c, u) => {
      t[c] && (n.removeEventListener(this, c, u), delete t[c]);
    }, o = (c, u) => {
      this.canvas && this.resize(c, u);
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
      const u = i && this.getDatasetMeta(i.datasetIndex).controller;
      u && u[s + "HoverStyle"](i.element, i.datasetIndex, i.index);
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
    const s = this.options.hover, o = (c, u) => c.filter((d) => !u.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = o(n, t), l = a ? t : o(t, n);
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
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), c = Ol(t), u = Nu(t, this._lastEvent, a, c);
    a && (this._lastEvent = null, Dt(o.onHover, [
      t,
      l,
      this
    ], this), c && Dt(o.onClick, [
      t,
      l,
      this
    ], this));
    const d = !Xn(l, s);
    return (d || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = u, d;
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
function ju(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: c } = t, { borderWidth: u, borderJoinStyle: d } = c, h = Math.min(u / i, se(a - n));
  if (e.beginPath(), e.arc(s, o, i - u / 2, a + h / 2, n - h / 2), l > 0) {
    const p = Math.min(u / l, se(a - n));
    e.arc(s, o, l + u / 2, n - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(u / 2, i * se(a - n));
    if (d === "round")
      e.arc(s, o, p, n - Ct / 2, a + Ct / 2, !0);
    else if (d === "bevel") {
      const _ = 2 * p * p, k = -_ * Math.cos(n + Ct / 2) + s, m = -_ * Math.sin(n + Ct / 2) + o, v = _ * Math.cos(a + Ct / 2) + s, g = _ * Math.sin(a + Ct / 2) + o;
      e.lineTo(k, m), e.lineTo(v, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Wu(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: c } = t;
  let u = s / l;
  e.beginPath(), e.arc(o, i, l, a - u, n + u), c > s ? (u = s / c, e.arc(o, i, c, n + u, a - u, !0)) : e.arc(o, i, s, n + zt, a - zt), e.closePath(), e.clip();
}
function Hu(e) {
  return Ka(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Yu(e, t, n, a) {
  const s = Hu(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (c) => {
    const u = (n - Math.min(o, c)) * a / 2;
    return Wt(c, 0, Math.min(o, u));
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
  const { x: i, y: l, startAngle: c, pixelMargin: u, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - u, 0), p = d > 0 ? d + a + n + u : 0;
  let _ = 0;
  const k = s - c;
  if (a) {
    const Y = d > 0 ? d - a : 0, W = h > 0 ? h - a : 0, J = (Y + W) / 2, tt = J !== 0 ? k * J / (J + a) : k;
    _ = (k - tt) / 2;
  }
  const m = Math.max(1e-3, k * h - n / Ct) / h, v = (k - m) / 2, g = c + v + _, f = s - v - _, { outerStart: y, outerEnd: x, innerStart: M, innerEnd: S } = Yu(t, p, h, f - g), C = h - y, $ = h - x, L = g + y / C, T = f - x / $, B = p + M, E = p + S, P = g + M / B, N = f - S / E;
  if (e.beginPath(), o) {
    const Y = (L + T) / 2;
    if (e.arc(i, l, h, L, Y), e.arc(i, l, h, Y, T), x > 0) {
      const lt = qe($, T, i, l);
      e.arc(lt.x, lt.y, x, T, f + zt);
    }
    const W = qe(E, f, i, l);
    if (e.lineTo(W.x, W.y), S > 0) {
      const lt = qe(E, N, i, l);
      e.arc(lt.x, lt.y, S, f + zt, N + Math.PI);
    }
    const J = (f - S / p + (g + M / p)) / 2;
    if (e.arc(i, l, p, f - S / p, J, !0), e.arc(i, l, p, J, g + M / p, !0), M > 0) {
      const lt = qe(B, P, i, l);
      e.arc(lt.x, lt.y, M, P + Math.PI, g - zt);
    }
    const tt = qe(C, g, i, l);
    if (e.lineTo(tt.x, tt.y), y > 0) {
      const lt = qe(C, L, i, l);
      e.arc(lt.x, lt.y, y, g - zt, L);
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
function Ku(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let c = t.endAngle;
  if (o) {
    ea(e, t, n, a, c, s);
    for (let u = 0; u < o; ++u)
      e.fill();
    isNaN(l) || (c = i + (l % Bt || Bt));
  }
  return ea(e, t, n, a, c, s), e.fill(), c;
}
function qu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: c } = t, { borderWidth: u, borderJoinStyle: d, borderDash: h, borderDashOffset: p, borderRadius: _ } = c, k = c.borderAlign === "inner";
  if (!u)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, k ? (e.lineWidth = u * 2, e.lineJoin = d || "round") : (e.lineWidth = u, e.lineJoin = d || "bevel");
  let m = t.endAngle;
  if (o) {
    ea(e, t, n, a, m, s);
    for (let v = 0; v < o; ++v)
      e.stroke();
    isNaN(l) || (m = i + (l % Bt || Bt));
  }
  k && Wu(e, t, m), c.selfJoin && m - i >= Ct && _ === 0 && d !== "miter" && ju(e, t, m), o || (ea(e, t, n, a, m, s), e.stroke());
}
class Uu extends me {
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
    }), { startAngle: l, endAngle: c, innerRadius: u, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, _ = dt(h, c - l), k = Cn(o, l, c) && l !== c, m = _ >= Bt || k, v = $e(i, u + p, d + p);
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
    ], t), { offset: c, spacing: u } = this.options, d = (s + o) / 2, h = (i + l + u + c) / 2;
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
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Bt ? Math.floor(a / Bt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const c = 1 - Math.sin(Math.min(Ct, a || 0)), u = s * c;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, Ku(t, this, u, o, i), qu(t, this, u, o, i), t.restore();
  }
}
function wi(e, t, n = t) {
  e.lineCap = dt(n.borderCapStyle, t.borderCapStyle), e.setLineDash(dt(n.borderDash, t.borderDash)), e.lineDashOffset = dt(n.borderDashOffset, t.borderDashOffset), e.lineJoin = dt(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = dt(n.borderWidth, t.borderWidth), e.strokeStyle = dt(n.borderColor, t.borderColor);
}
function Xu(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Gu(e) {
  return e.stepped ? dr : e.tension || e.cubicInterpolationMode === "monotone" ? hr : Xu;
}
function Ci(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, c = Math.max(s, i), u = Math.min(o, l), d = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: c,
    loop: t.loop,
    ilen: u < c && !d ? a + u - c : u - c
  };
}
function Zu(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: c, ilen: u } = Ci(s, n, a), d = Gu(o);
  let { move: h = !0, reverse: p } = a || {}, _, k, m;
  for (_ = 0; _ <= u; ++_)
    k = s[(l + (p ? u - _ : _)) % i], !k.skip && (h ? (e.moveTo(k.x, k.y), h = !1) : d(e, m, k, p, o.stepped), m = k);
  return c && (k = s[(l + (p ? u : 0)) % i], d(e, m, k, p, o.stepped)), !!c;
}
function Qu(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Ci(s, n, a), { move: c = !0, reverse: u } = a || {};
  let d = 0, h = 0, p, _, k, m, v, g;
  const f = (x) => (i + (u ? l - x : x)) % o, y = () => {
    m !== v && (e.lineTo(d, v), e.lineTo(d, m), e.lineTo(d, g));
  };
  for (c && (_ = s[f(0)], e.moveTo(_.x, _.y)), p = 0; p <= l; ++p) {
    if (_ = s[f(p)], _.skip)
      continue;
    const x = _.x, M = _.y, S = x | 0;
    S === k ? (M < m ? m = M : M > v && (v = M), d = (h * d + x) / ++h) : (y(), e.lineTo(x, M), k = S, h = 0, m = v = M), g = M;
  }
  y();
}
function Fa(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Qu : Zu;
}
function Ju(e) {
  return e.stepped ? Hr : e.tension || e.cubicInterpolationMode === "monotone" ? Yr : ze;
}
function td(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), wi(e, t.options), e.stroke(s);
}
function ed(e, t, n, a) {
  const { segments: s, options: o } = t, i = Fa(t);
  for (const l of s)
    wi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const nd = typeof Path2D == "function";
function ad(e, t, n, a) {
  nd && !t.options.segment ? td(e, t, n, a) : ed(e, t, n, a);
}
class sd extends me {
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
    const l = [], c = Ju(a);
    let u, d;
    for (u = 0, d = i.length; u < d; ++u) {
      const { start: h, end: p } = i[u], _ = o[h], k = o[p];
      if (_ === k) {
        l.push(_);
        continue;
      }
      const m = Math.abs((s - _[n]) / (k[n] - _[n])), v = c(_, k, m, a.stepped);
      v[n] = t[n], l.push(v);
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
    (this.points || []).length && o.borderWidth && (t.save(), ad(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function so(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class od extends me {
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
  let l, c, u, d, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, s), c = Math.max(n, s), u = a - h, d = a + h) : (h = o / 2, l = n - h, c = n + h, u = Math.min(a, s), d = Math.max(a, s)), {
    left: l,
    top: u,
    right: c,
    bottom: d
  };
}
function Se(e, t, n, a) {
  return e ? 0 : Wt(t, n, a);
}
function id(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = ni(a);
  return {
    t: Se(s.top, o.top, 0, n),
    r: Se(s.right, o.right, 0, t),
    b: Se(s.bottom, o.bottom, 0, n),
    l: Se(s.left, o.left, 0, t)
  };
}
function ld(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = Ge(s), i = Math.min(t, n), l = e.borderSkipped, c = a || yt(s);
  return {
    topLeft: Se(!c || l.top || l.left, o.topLeft, 0, i),
    topRight: Se(!c || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Se(!c || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Se(!c || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function rd(e) {
  const t = $i(e), n = t.right - t.left, a = t.bottom - t.top, s = id(e, n / 2, a / 2), o = ld(e, n / 2, a / 2);
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
function ba(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && $i(e, a);
  return l && (s || $e(t, l.left, l.right)) && (o || $e(n, l.top, l.bottom));
}
function cd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function ud(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function va(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class dd extends me {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = rd(this), l = cd(i.radius) ? Qn : ud;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, va(i, n, o)), t.clip(), l(t, va(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, va(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return ba(this, t, n, a);
  }
  inXRange(t, n) {
    return ba(this, t, null, n);
  }
  inYRange(t, n) {
    return ba(this, null, t, n);
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
}, hd = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class io extends me {
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
    let u, d;
    n.font = s.string, this.isHorizontal() ? (u = this.maxWidth, d = this._fitRows(i, o, l, c) + 10) : (d = this.maxHeight, u = this._fitCols(i, s, l, c) + 10), this.width = Math.min(u, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], u = this.lineWidths = [
      0
    ], d = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, _ = -d;
    return this.legendItems.forEach((k, m) => {
      const v = a + n / 2 + o.measureText(k.text).width;
      (m === 0 || u[u.length - 1] + v + 2 * l > i) && (h += d, u[u.length - (m > 0 ? 0 : 1)] = 0, _ += d, p++), c[m] = {
        left: 0,
        top: _,
        row: p,
        width: v,
        height: s
      }, u[u.length - 1] += v + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], u = this.columnSizes = [], d = i - t;
    let h = l, p = 0, _ = 0, k = 0, m = 0;
    return this.legendItems.forEach((v, g) => {
      const { itemWidth: f, itemHeight: y } = fd(a, n, o, v, s);
      g > 0 && _ + y + 2 * l > d && (h += p + l, u.push({
        width: p,
        height: _
      }), k += p + l, m++, p = _ = 0), c[g] = {
        left: k,
        top: _,
        col: m,
        width: f,
        height: y
      }, p = Math.max(p, f), _ += y + l;
    }), h += p, u.push({
      width: p,
      height: _
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = Ze(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, c = jt(a, this.left + s, this.right - this.lineWidths[l]);
      for (const u of n)
        l !== u.row && (l = u.row, c = jt(a, this.left + s, this.right - this.lineWidths[l])), u.top += this.top + t + s, u.left = i.leftForLtr(i.x(c), u.width), c += u.width + s;
    } else {
      let l = 0, c = jt(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const u of n)
        u.col !== l && (l = u.col, c = jt(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), u.top = c, u.left += this.left + s, u.left = i.leftForLtr(i.x(u.left), u.width), c += u.height + s;
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
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = Ft.color, c = Ze(t.rtl, this.left, this.width), u = Ht(i.font), { padding: d } = i, h = u.size, p = h / 2;
    let _;
    this.drawTitle(), s.textAlign = c.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = u.string;
    const { boxWidth: k, boxHeight: m, itemHeight: v } = oo(i, h), g = function(S, C, $) {
      if (isNaN(k) || k <= 0 || isNaN(m) || m < 0)
        return;
      s.save();
      const L = dt($.lineWidth, 1);
      if (s.fillStyle = dt($.fillStyle, l), s.lineCap = dt($.lineCap, "butt"), s.lineDashOffset = dt($.lineDashOffset, 0), s.lineJoin = dt($.lineJoin, "miter"), s.lineWidth = L, s.strokeStyle = dt($.strokeStyle, l), s.setLineDash(dt($.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: $.pointStyle,
          rotation: $.rotation,
          borderWidth: L
        }, B = c.xPlus(S, k / 2), E = C + p;
        ei(s, T, B, E, i.pointStyleWidth && k);
      } else {
        const T = C + Math.max((h - m) / 2, 0), B = c.leftForLtr(S, k), E = Ge($.borderRadius);
        s.beginPath(), Object.values(E).some((P) => P !== 0) ? Qn(s, {
          x: B,
          y: T,
          w: k,
          h: m,
          radius: E
        }) : s.rect(B, T, k, m), s.fill(), L !== 0 && s.stroke();
      }
      s.restore();
    }, f = function(S, C, $) {
      Mn(s, $.text, S, C + v / 2, u, {
        strikethrough: $.hidden,
        textAlign: c.textAlign($.textAlign)
      });
    }, y = this.isHorizontal(), x = this._computeTitleHeight();
    y ? _ = {
      x: jt(o, this.left + d, this.right - a[0]),
      y: this.top + d + x,
      line: 0
    } : _ = {
      x: this.left + d,
      y: jt(o, this.top + x + d, this.bottom - n[0].height),
      line: 0
    }, ri(this.ctx, t.textDirection);
    const M = v + d;
    this.legendItems.forEach((S, C) => {
      s.strokeStyle = S.fontColor, s.fillStyle = S.fontColor;
      const $ = s.measureText(S.text).width, L = c.textAlign(S.textAlign || (S.textAlign = i.textAlign)), T = k + p + $;
      let B = _.x, E = _.y;
      c.setWidth(this.width), y ? C > 0 && B + T + d > this.right && (E = _.y += M, _.line++, B = _.x = jt(o, this.left + d, this.right - a[_.line])) : C > 0 && E + M > this.bottom && (B = _.x = B + n[_.line].width + d, _.line++, E = _.y = jt(o, this.top + x + d, this.bottom - n[_.line].height));
      const P = c.x(B);
      if (g(P, E, S), B = Ql(L, B + k + p, y ? B + T : this.right, t.rtl), f(c.x(B), E, S), y)
        _.x += T + d;
      else if (typeof S.text != "string") {
        const N = u.lineHeight;
        _.y += Mi(S, N) + d;
      } else
        _.y += M;
    }), ci(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Ht(n.font), s = ne(n.padding);
    if (!n.display)
      return;
    const o = Ze(t.rtl, this.left, this.width), i = this.ctx, l = n.position, c = a.size / 2, u = s.top + c;
    let d, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), d = this.top + u, h = jt(t.align, h, this.right - p);
    else {
      const k = this.columnSizes.reduce((m, v) => Math.max(m, v.height), 0);
      d = u + jt(t.align, this.top, this.bottom - k - t.labels.padding - this._computeTitleHeight());
    }
    const _ = jt(l, h, h + p);
    i.textAlign = o.textAlign(Na(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Mn(i, n.text, _, d, a);
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
    if (!pd(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = hd(s, a);
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
function fd(e, t, n, a, s) {
  const o = gd(a, e, t, n), i = kd(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function gd(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function kd(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Mi(t, n)), a;
}
function Mi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function pd(e, t) {
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
          const u = c.controller.getStyle(n ? 0 : void 0), d = ne(u.borderWidth);
          return {
            text: t[c.index].label,
            fillStyle: u.backgroundColor,
            fontColor: o,
            hidden: !c.visible,
            lineCap: u.borderCapStyle,
            lineDash: u.borderDash,
            lineDashOffset: u.borderDashOffset,
            lineJoin: u.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: u.borderColor,
            pointStyle: a || u.pointStyle,
            rotation: u.rotation,
            textAlign: s || u.textAlign,
            borderRadius: i && (l || u.borderRadius),
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
class Si extends me {
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
    let c = 0, u, d, h;
    return this.isHorizontal() ? (d = jt(l, a, o), h = n + t, u = o - a) : (i.position === "left" ? (d = a + t, h = jt(l, s, n), c = Ct * -0.5) : (d = o - t, h = jt(l, n, s), c = Ct * 0.5), u = s - n), {
      titleX: d,
      titleY: h,
      maxWidth: u,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = Ht(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: c, rotation: u } = this._drawArgs(o);
    Mn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: c,
      rotation: u,
      textAlign: Na(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function md(e, t) {
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
    md(e, n);
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
        const u = c.getCenterPoint(), d = Da(t, u);
        d < s && (s = d, l = c);
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
function bd(e, t) {
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
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, c = Ht(t.bodyFont), u = Ht(t.titleFont), d = Ht(t.footerFont), h = o.length, p = s.length, _ = a.length, k = ne(t.padding);
  let m = k.height, v = 0, g = a.reduce((x, M) => x + M.before.length + M.lines.length + M.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (m += h * u.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const x = t.displayColors ? Math.max(l, c.lineHeight) : c.lineHeight;
    m += _ * x + (g - _) * c.lineHeight + (g - 1) * t.bodySpacing;
  }
  p && (m += t.footerMarginTop + p * d.lineHeight + (p - 1) * t.footerSpacing);
  let f = 0;
  const y = function(x) {
    v = Math.max(v, n.measureText(x).width + f);
  };
  return n.save(), n.font = u.string, wt(e.title, y), n.font = c.string, wt(e.beforeBody.concat(e.afterBody), y), f = t.displayColors ? i + 2 + t.boxPadding : 0, wt(a, (x) => {
    wt(x.before, y), wt(x.lines, y), wt(x.after, y);
  }), f = 0, n.font = d.string, wt(e.footer, y), n.restore(), v += k.width, {
    width: v,
    height: m
  };
}
function vd(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function yd(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function _d(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: c } } = e;
  let u = "center";
  return a === "center" ? u = s <= (l + c) / 2 ? "left" : "right" : s <= o / 2 ? u = "left" : s >= i - o / 2 && (u = "right"), yd(u, e, t, n) && (u = "center"), u;
}
function ro(e, t, n) {
  const a = n.yAlign || t.yAlign || vd(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || _d(e, t, n, a),
    yAlign: a
  };
}
function xd(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function wd(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function co(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: c } = n, u = s + o, { topLeft: d, topRight: h, bottomLeft: p, bottomRight: _ } = Ge(i);
  let k = xd(t, l);
  const m = wd(t, c, u);
  return c === "center" ? l === "left" ? k += u : l === "right" && (k -= u) : l === "left" ? k -= Math.max(d, p) + s : l === "right" && (k += Math.max(h, _) + s), {
    x: Wt(k, 0, a.width - t.width),
    y: Wt(m, 0, a.height - t.height)
  };
}
function Vn(e, t, n) {
  const a = ne(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function uo(e) {
  return le([], fe(e));
}
function Cd(e, t, n) {
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
  beforeTitle: de,
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
  afterTitle: de,
  beforeBody: de,
  beforeLabel: de,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return xt(n) || (t += n), t;
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
  afterLabel: de,
  afterBody: de,
  beforeFooter: de,
  footer: de,
  afterFooter: de
};
function qt(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Ai[t].call(n, a) : s;
}
class fo extends me {
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new di(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Cd(this.chart.getContext(), this, this._tooltipItems));
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
    let l = [], c, u;
    for (c = 0, u = n.length; c < u; ++c)
      l.push(bd(this.chart, n[c]));
    return t.filter && (l = l.filter((d, h, p) => t.filter(d, h, p, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), wt(l, (d) => {
      const h = ho(t.callbacks, d);
      s.push(qt(h, "labelColor", this, d)), o.push(qt(h, "labelPointStyle", this, d)), i.push(qt(h, "labelTextColor", this, d));
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
      const c = this._size = lo(this, a), u = Object.assign({}, l, c), d = ro(this.chart, a, u), h = co(a, u, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, o = {
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: c, topRight: u, bottomLeft: d, bottomRight: h } = Ge(l), { x: p, y: _ } = t, { width: k, height: m } = n;
    let v, g, f, y, x, M;
    return o === "center" ? (x = _ + m / 2, s === "left" ? (v = p, g = v - i, y = x + i, M = x - i) : (v = p + k, g = v + i, y = x - i, M = x + i), f = v) : (s === "left" ? g = p + Math.max(c, d) + i : s === "right" ? g = p + k - Math.max(u, h) - i : g = this.caretX, o === "top" ? (y = _, x = y - i, v = g - i, f = g + i) : (y = _ + m, x = y + i, v = g + i, f = g - i), M = y), {
      x1: v,
      x2: g,
      x3: f,
      y1: y,
      y2: x,
      y3: M
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, c;
    if (o) {
      const u = Ze(a.rtl, this.x, this.width);
      for (t.x = Vn(this, a.titleAlign, a), n.textAlign = u.textAlign(a.titleAlign), n.textBaseline = "middle", i = Ht(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, c = 0; c < o; ++c)
        n.fillText(s[c], u.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, c + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: c, boxWidth: u } = o, d = Ht(o.bodyFont), h = Vn(this, "left", o), p = s.x(h), _ = c < d.lineHeight ? (d.lineHeight - c) / 2 : 0, k = n.y + _;
    if (o.usePointStyle) {
      const m = {
        radius: Math.min(u, c) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = s.leftForLtr(p, u) + u / 2, g = k + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ta(t, m, v, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ta(t, m, v, g);
    } else {
      t.lineWidth = yt(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const m = s.leftForLtr(p, u), v = s.leftForLtr(s.xPlus(p, 1), u - 2), g = Ge(i.borderRadius);
      Object.values(g).some((f) => f !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Qn(t, {
        x: m,
        y: k,
        w: u,
        h: c,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Qn(t, {
        x: v,
        y: k + 1,
        w: u - 2,
        h: c - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(m, k, u, c), t.strokeRect(m, k, u, c), t.fillStyle = i.backgroundColor, t.fillRect(v, k + 1, u - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: c, boxWidth: u, boxPadding: d } = a, h = Ht(a.bodyFont);
    let p = h.lineHeight, _ = 0;
    const k = Ze(a.rtl, this.x, this.width), m = function($) {
      n.fillText($, k.x(t.x + _), t.y + p / 2), t.y += p + o;
    }, v = k.textAlign(i);
    let g, f, y, x, M, S, C;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Vn(this, v, a), n.fillStyle = a.bodyColor, wt(this.beforeBody, m), _ = l && v !== "right" ? i === "center" ? u / 2 + d : u + 2 + d : 0, x = 0, S = s.length; x < S; ++x) {
      for (g = s[x], f = this.labelTextColors[x], n.fillStyle = f, wt(g.before, m), y = g.lines, l && y.length && (this._drawColorBox(n, t, x, k, a), p = Math.max(h.lineHeight, c)), M = 0, C = y.length; M < C; ++M)
        m(y[M]), p = h.lineHeight;
      wt(g.after, m);
    }
    _ = 0, p = h.lineHeight, wt(this.afterBody, m), t.y -= o;
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
    const { xAlign: o, yAlign: i } = this, { x: l, y: c } = t, { width: u, height: d } = a, { topLeft: h, topRight: p, bottomLeft: _, bottomRight: k } = Ge(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, c), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + u - p, c), n.quadraticCurveTo(l + u, c, l + u, c + p), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + u, c + d - k), n.quadraticCurveTo(l + u, c + d, l + u - k, c + d), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + _, c + d), n.quadraticCurveTo(l, c + d, l, c + d - _), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, c + h), n.quadraticCurveTo(l, c, l + h, c), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = fn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = lo(this, t), c = Object.assign({}, i, this._size), u = ro(n, t, c), d = co(t, c, u, n);
      (s._to !== d.x || o._to !== d.y) && (this.xAlign = u.xAlign, this.yAlign = u.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
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
      const u = this.chart.getDatasetMeta(l);
      if (!u)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: u.data[c],
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
const $d = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Md(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return $d(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const Sd = (e, t) => e === null ? null : Wt(Math.round(e), 0, t);
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
    if (xt(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Md(a, t, dt(n, t), this._addedLabels), Sd(n, a.length - 1);
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
function Dd(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: c, count: u, maxTicks: d, maxDigits: h, includeBounds: p } = e, _ = o || 1, k = d - 1, { min: m, max: v } = t, g = !xt(i), f = !xt(l), y = !xt(u), x = (v - m) / (h + 1);
  let M = gs((v - m) / k / _) * _, S, C, $, L;
  if (M < 1e-14 && !g && !f)
    return [
      {
        value: m
      },
      {
        value: v
      }
    ];
  L = Math.ceil(v / M) - Math.floor(m / M), L > k && (M = gs(L * M / k / _) * _), xt(c) || (S = Math.pow(10, c), M = Math.ceil(M * S) / S), s === "ticks" ? (C = Math.floor(m / M) * M, $ = Math.ceil(v / M) * M) : (C = m, $ = v), g && f && o && Wl((l - i) / o, M / 1e3) ? (L = Math.round(Math.min((l - i) / M, d)), M = (l - i) / L, C = i, $ = l) : y ? (C = g ? i : C, $ = f ? l : $, L = u - 1, M = ($ - C) / L) : (L = ($ - C) / M, pn(L, Math.round(L), M / 1e3) ? L = Math.round(L) : L = Math.ceil(L));
  const T = Math.max(ks(M), ks(C));
  S = Math.pow(10, xt(c) ? T : c), C = Math.round(C * S) / S, $ = Math.round($ * S) / S;
  let B = 0;
  for (g && (p && C !== i ? (n.push({
    value: i
  }), C < i && B++, pn(Math.round((C + B * M) * S) / S, i, ko(i, x, e)) && B++) : C < i && B++); B < L; ++B) {
    const E = Math.round((C + B * M) * S) / S;
    if (f && E > l)
      break;
    n.push({
      value: E
    });
  }
  return f && p && $ !== l ? n.length && pn(n[n.length - 1].value, l, ko(l, x, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!f || $ === l) && n.push({
    value: $
  }), n;
}
function ko(e, t, { horizontal: n, minRotation: a }) {
  const s = ke(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Ad extends tn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return xt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (c) => s = n ? s : c, l = (c) => o = a ? o : c;
    if (t) {
      const c = ce(s), u = ce(o);
      c < 0 && u < 0 ? l(0) : c > 0 && u > 0 && i(0);
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
    }, o = this._range || this, i = Dd(s, o);
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
class Bi extends Ad {
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
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = ke(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
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
function po(e, t) {
  return e - t;
}
function mo(e, t) {
  if (xt(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ee(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (wn(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function bo(e, t, n, a) {
  const s = Xt.length;
  for (let o = Xt.indexOf(e); o < s - 1; ++o) {
    const i = oa[Xt[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return Xt[o];
  }
  return Xt[s - 1];
}
function Td(e, t, n, a, s) {
  for (let o = Xt.length - 1; o >= Xt.indexOf(n); o--) {
    const i = Xt[o];
    if (oa[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return Xt[n ? Xt.indexOf(n) : 0];
}
function Bd(e) {
  for (let t = Xt.indexOf(e) + 1, n = Xt.length; t < n; ++t)
    if (oa[Xt[t]].common)
      return Xt[t];
}
function vo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = Va(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Ld(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, c;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    c = n[l], c >= 0 && (t[c].major = !0);
  return t;
}
function yo(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Ld(e, a, s, n);
}
class _o extends tn {
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
    s.init(n), kn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
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
    const t = this.options, n = this._adapter, a = t.time.unit || "day";
    let { min: s, max: o, minDefined: i, maxDefined: l } = this.getUserBounds();
    function c(u) {
      !i && !isNaN(u.min) && (s = Math.min(s, u.min)), !l && !isNaN(u.max) && (o = Math.max(o, u.max));
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
    return this._unit = n.unit || (a.autoSkip ? bo(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Td(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Bd(this._unit), this.initOffsets(s), t.reverse && l.reverse(), yo(this, l, this._majorUnit);
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
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || bo(o.minUnit, n, a, this._getLabelCapacity(n)), l = dt(s.ticks.stepSize, 1), c = i === "week" ? o.isoWeekday : !1, u = wn(c) || c === !0, d = {};
    let h = n, p, _;
    if (u && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, u ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const k = s.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, _ = 0; p < a; p = +t.add(p, l, i), _++)
      vo(d, p, k);
    return (p === a || s.bounds === "ticks" || _ === 1) && vo(d, p, k), Object.keys(d).sort(po).map((m) => +m);
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
    const l = o.time.displayFormats, c = this._unit, u = this._majorUnit, d = c && l[c], h = u && l[u], p = a[n], _ = u && h && p && p.major;
    return this._adapter.format(t, s || (_ ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = ke(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, yo(this, [
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
      t.push(mo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Zo(t.sort(po));
  }
}
function Nn(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, c;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = Ve(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: c } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = Ve(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: c } = e[s]);
  const u = i - o;
  return u ? l + (c - l) * (t - o) / u : l;
}
class CC extends _o {
  static id = "timeseries";
  static defaults = _o.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = Nn(n, this.min), this._tableRange = Nn(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, s = [], o = [];
    let i, l, c, u, d;
    for (i = 0, l = t.length; i < l; ++i)
      u = t[i], u >= n && u <= a && s.push(u);
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
      d = s[i + 1], c = s[i - 1], u = s[i], Math.round((d + c) / 2) !== u && o.push({
        time: u,
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
}, Fd = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Ed = {
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
  ...Fd
}, Pd = al[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Ue(e) {
  return Vo(e) ? Ma(e) : e;
}
function Id(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Vo(t) ? new Proxy(e, {}) : e;
}
function Rd(e, t) {
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
function Od(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Fi(n, e.labels), Ei(n, e.datasets, t), n;
}
const zd = Q({
  props: Ed,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = nt(null), o = zo(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: u, data: d, options: h, plugins: p, datasetIdKey: _ } = e, k = Od(d, _), m = Id(k, d);
      o.value = new Te(s.value, {
        type: u,
        data: m,
        options: {
          ...h
        },
        plugins: p
      });
    }, l = () => {
      const u = Ma(o.value);
      u && (e.destroyDelay > 0 ? setTimeout(() => {
        u.destroy(), o.value = null;
      }, e.destroyDelay) : (u.destroy(), o.value = null));
    }, c = (u) => {
      u.update(e.updateMode);
    };
    return oe(i), Be(l), It([
      () => e.options,
      () => e.data
    ], (u, d) => {
      let [h, p] = u, [_, k] = d;
      const m = Ma(o.value);
      if (!m)
        return;
      let v = !1;
      if (h) {
        const g = Ue(h), f = Ue(_);
        g && g !== f && (Rd(m, g), v = !0);
      }
      if (p) {
        const g = Ue(p.labels), f = Ue(k.labels), y = Ue(p.datasets), x = Ue(k.datasets);
        g !== f && (Fi(m.config.data, g), v = !0), y && y !== x && (Ei(m.config.data, y, e.datasetIdKey), v = !0);
      }
      v && Rt(() => {
        c(m);
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
      }), () => $a(zd, Pd({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Vd = /* @__PURE__ */ es("bar", Dc), Nd = /* @__PURE__ */ es("line", Bc), jd = /* @__PURE__ */ es("pie", Lc), xo = {
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
}, Wd = [
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
  const t = nt("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = D(() => e?.value ? e.value : t.value), o = D(() => s.value === "dark"), i = D(() => o.value ? wo : xo), l = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((u) => {
      for (const d of u)
        d.attributeName === "class" && (t.value = a());
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
    lightColors: xo,
    darkColors: wo,
    chartSeriesColors: Wd
  };
}
const ns = 5, as = 8, Hd = /^x\d*$/, Yd = /^y\d*$/;
function Pi(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, c = l && typeof l == "object" ? { ...l } : {};
    Hd.test(s) && (c.maxTicksLimit = as, c.autoSkip = !0, c.minRotation = 0, c.maxRotation = 0, c.autoSkipPadding = c.autoSkipPadding ?? 8), Yd.test(s) && (c.maxTicksLimit = ns), i.ticks = c, a[s] = i;
  }
  return t.scales = a, t;
}
const Ut = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Kd = ["titleFont", "bodyFont", "footerFont"];
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
        const d = { ...c }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.ticks = d;
      }
      const u = l.title;
      if (u && typeof u == "object") {
        const d = { ...u }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.title = d;
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
        const u = { ...c }, d = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...d, family: t }, l.labels = u;
      }
      s.legend = l;
    }
    const i = s.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const c of Kd) {
        const u = l[c];
        u && typeof u == "object" && (l[c] = { ...u, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const qd = { class: "ku:relative ku:h-[230px] ku:w-full ku:shrink-0 ku:bg-transparent ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Co = 10, Ud = /* @__PURE__ */ Q({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Te.register(Ti, Bi, dd, Di, ts, Ja), Te.defaults.font.family = Ut;
    const { isDark: a, colors: s } = ut(rt(n, "theme")), o = D(() => n.data), i = (u) => typeof u == "string" ? u.charAt(0).toUpperCase() + u.slice(1).toLowerCase() : u;
    function l(u, d) {
      if (d == null) return u;
      if (Array.isArray(d) || typeof d != "object" || u == null || Array.isArray(u) || typeof u != "object") return d;
      const h = { ...u };
      for (const p of Object.keys(d)) {
        const _ = d[p];
        _ !== void 0 && (h[p] = l(u[p], _));
      }
      return h;
    }
    const c = D(() => {
      const u = {
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
                return h.data.datasets.map((_, k) => {
                  const m = Array.isArray(_.backgroundColor) ? _.backgroundColor[0] : _.backgroundColor, v = Array.isArray(_.borderColor) ? _.borderColor[0] : _.borderColor, g = typeof v == "string" && v.length > 0 ? v : typeof m == "string" && m.length > 0 ? m : s.value.textSecondary;
                  return {
                    text: i(_.label || ""),
                    fillStyle: typeof m == "string" ? m : g,
                    strokeStyle: g,
                    lineWidth: 0,
                    fontColor: g,
                    hidden: !h.isDatasetVisible(k),
                    index: k,
                    datasetIndex: k
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
                let p = String(i(h.dataset.label || ""));
                return p && (p += ": "), h.parsed.y !== null && (p += h.parsed.y), p;
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
                const p = this.getLabelForValue(h);
                return i(p);
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
      }, d = n.options ? l(u, n.options) : u;
      return Ii(
        Pi(d)
      );
    });
    return t({ isDark: a }), (u, d) => (b(), w("div", qd, [
      z(F(Vd), {
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
}, pe = /* @__PURE__ */ at(Ud, [["__scopeId", "data-v-a40b2afd"]]), Xd = { class: "chart-line-root ku:flex ku:h-full ku:min-h-[230px] ku:w-full ku:shrink-0 ku:flex-col ku:bg-transparent ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] ku:min-w-0" }, Gd = { class: "chart-line-canvas-host ku:relative ku:min-h-0 ku:w-full ku:flex-1" }, Zd = {
  key: 0,
  class: "chart-line-indicators ku:mt-0 ku:flex ku:shrink-0 ku:list-none ku:flex-nowrap ku:items-center ku:justify-center ku:gap-x-4 ku:overflow-x-auto ku:overflow-y-hidden ku:px-1 ku:pb-0.5 ku:pt-0.5",
  role: "list"
}, Qd = ["aria-pressed", "aria-label", "onClick"], Jd = {
  class: "ku:inline-flex ku:shrink-0 ku:items-center",
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
      od,
      sd,
      Di,
      ts,
      Ja
    ), Te.defaults.font.family = Ut;
    const a = nt(null), { isDark: s, colors: o } = ut(rt(n, "theme")), i = D(() => o.value.bgCard), l = D(() => {
      const m = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((v) => {
          const g = v.borderColor, f = Array.isArray(g) ? g[0] : g, y = typeof f == "string" && f.length > 0 ? f : o.value.textSecondary, x = v.pointBackgroundColor !== void 0 ? v.pointBackgroundColor : m, M = v.pointHoverBackgroundColor !== void 0 ? v.pointHoverBackgroundColor : x, S = v.pointBorderWidth ?? 2, C = v.pointHoverBorderWidth ?? S;
          return {
            ...v,
            fill: v.fill ?? !1,
            pointBackgroundColor: x,
            pointHoverBackgroundColor: M,
            pointBorderColor: v.pointBorderColor ?? y,
            pointHoverBorderColor: v.pointHoverBorderColor ?? y,
            pointBorderWidth: S,
            pointHoverBorderWidth: C
          };
        })
      };
    }), c = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m;
    function u(m) {
      const v = m.borderColor, g = Array.isArray(v) ? v[0] : v;
      return typeof g == "string" && g.length > 0 ? g : o.value.textSecondary;
    }
    const d = D(
      () => l.value.datasets.map((m, v) => ({
        key: `${m.label ?? "dataset"}-${v}`,
        label: c(m.label || ""),
        color: u(m)
      }))
    ), h = nt([]);
    It(
      () => l.value.datasets.length,
      (m) => {
        const v = Array.from({ length: m }, (g, f) => h.value[f] ?? !0);
        h.value = v;
      },
      { immediate: !0 }
    );
    function p(m) {
      const g = a.value?.chart;
      if (!g || m < 0 || m >= g.data.datasets.length) return;
      const f = !g.isDatasetVisible(m);
      g.setDatasetVisibility(m, f), h.value[m] = f, g.update();
    }
    function _(m, v) {
      if (v == null) return m;
      if (Array.isArray(v) || typeof v != "object" || m == null || Array.isArray(m) || typeof m != "object") return v;
      const g = { ...m };
      for (const f of Object.keys(v)) {
        const y = v[f];
        y !== void 0 && (g[f] = _(m[f], y));
      }
      return g;
    }
    const k = D(() => {
      const m = {
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
                let y = String(c(f.dataset.label || ""));
                return y && (y += ": "), f.parsed.y !== null && (y += f.parsed.y), y;
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
      }, v = n.options ? _(m, n.options) : m;
      return Ii(
        Pi(v)
      );
    });
    return t({ isDark: s }), (m, v) => (b(), w("div", Xd, [
      r("div", Gd, [
        z(F(Nd), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: k.value
        }, null, 8, ["data", "options"])
      ]),
      d.value.length > 0 ? (b(), w("ul", Zd, [
        (b(!0), w(q, null, et(d.value, (g, f) => (b(), w("li", {
          key: g.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: H(["ku:inline-flex ku:cursor-pointer ku:items-center ku:gap-1 ku:border-0 ku:bg-transparent ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] ku:text-[11px] ku:font-medium ku:leading-snug ku:transition-opacity outline-none ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:focus-visible:ring-offset-2 ku:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] ku:dark:focus-visible:ring-offset-[#1a1a1d]", h.value[f] !== !1 ? "ku:opacity-100" : "ku:opacity-45 line-through"]),
            style: gt({ color: g.color }),
            "aria-pressed": h.value[f] !== !1,
            "aria-label": `${g.label}. ${h.value[f] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (y) => p(f)
          }, [
            r("span", Jd, [
              v[0] || (v[0] = r("span", { class: "ku:h-0.5 ku:w-2 ku:shrink-0 ku:rounded-full ku:bg-current" }, null, -1)),
              r("span", {
                class: "ku:relative ku:z-[1] ku:box-border ku:size-2 ku:shrink-0 ku:rounded-full ku:border-2 ku:bg-transparent",
                style: gt({ borderColor: g.color })
              }, null, 4),
              v[1] || (v[1] = r("span", { class: "ku:h-0.5 ku:w-2 ku:shrink-0 ku:rounded-full ku:bg-current" }, null, -1))
            ]),
            r("span", null, A(g.label), 1)
          ], 14, Qd)
        ]))), 128))
      ])) : O("", !0)
    ]));
  }
}), be = /* @__PURE__ */ at(th, [["__scopeId", "data-v-9c951cf9"]]), eh = { class: "chart-container" }, nh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ah = /* @__PURE__ */ Q({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Te.register(Uu, ts, Ja);
    const { isDark: a, colors: s } = ut(rt(n, "theme")), o = n.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, l = D(() => n.options ? n.options : {
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
              const u = c.data;
              return u.labels.length && u.datasets.length ? u.labels.map((d, h) => {
                const _ = c.getDatasetMeta(0).controller.getStyle(h), m = u.datasets[0].data[h], v = typeof _.backgroundColor == "string" && _.backgroundColor.length > 0 ? _.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(d)}: ${m}`,
                  fillStyle: _.backgroundColor,
                  strokeStyle: _.borderColor,
                  lineWidth: _.borderWidth,
                  lineDash: _.borderDash,
                  lineDashOffset: _.borderDashOffset,
                  lineJoin: _.borderJoinStyle,
                  fontColor: v,
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
              const u = c.label || "", d = c.parsed || 0, h = c.dataset.data.reduce((_, k) => _ + k, 0), p = (d / h * 100).toFixed(1);
              return `${i(u)}: ${d} (${p}%)`;
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
    return t({ isDark: a }), (c, u) => (b(), w("div", eh, [
      z(F(jd), {
        data: F(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ia = /* @__PURE__ */ at(ah, [["__scopeId", "data-v-0f7806d6"]]), sh = { class: "chart-container" }, oh = ["viewBox"], ih = ["transform"], lh = ["x", "width", "fill", "stroke"], rh = ["fill"], ch = ["x1", "y1", "x2", "y2", "stroke"], uh = ["points", "fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], hh = ["x", "y", "fill"], fh = ["x1", "y1", "x2", "y2", "stroke"], gh = ["points", "fill"], kh = ["transform"], ph = ["y1", "y2"], mh = ["y1", "y2"], bh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y", "height"], _h = ["y1", "y2"], xh = ["y1", "y2"], wh = ["y1", "y2"], Ch = ["y1", "y2"], $h = ["y", "height"], Mh = ["cy", "stroke", "onMouseenter"], Sh = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["cy", "stroke", "onMouseenter"], Th = ["y1", "y2", "onMouseenter"], Bh = ["y1", "y2", "onMouseenter"], Lh = ["x", "y", "fill"], Fh = ["x", "y", "fill"], Eh = ["transform"], Ph = { transform: "translate(-200, 0)" }, Ih = ["stroke"], Rh = ["fill"], Oh = { transform: "translate(-130, 0)" }, zh = ["stroke"], Vh = ["fill"], Nh = { transform: "translate(-60, 0)" }, jh = ["stroke"], Wh = ["fill"], Hh = { transform: "translate(10, 0)" }, Yh = ["stroke"], Kh = ["fill"], qh = { transform: "translate(80, 0)" }, Uh = ["fill"], Xh = { transform: "translate(150, 0)" }, Gh = ["fill"], Zh = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a } = ut(rt(n, "theme")), s = D(() => ({
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
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, l = (p, _) => {
      const k = p.currentTarget.closest("svg");
      if (!k) return;
      const m = k.getBoundingClientRect(), v = k.createSVGPoint();
      v.x = p.clientX - m.left, v.y = p.clientY - m.top, o.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: _
      };
    }, c = (p) => {
      if (o.value.visible) {
        const _ = p.currentTarget, k = _.getBoundingClientRect(), m = _.createSVGPoint();
        m.x = p.clientX - k.left, m.y = p.clientY - k.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, u = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const p = [], k = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const v = m, g = (v - 1) / 9, f = n.chartMargin + k - g * k;
        p.push({ value: v, y: f });
      }
      return p;
    });
    return t({ isDark: a }), (p, _) => (b(), w("div", sh, [
      (b(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "ku:w-full boxplot-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: c,
        onMouseleave: u
      }, [
        o.value.visible ? (b(), w("g", {
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
        }, null, 8, uh),
        (b(!0), w(q, null, et(h.value, (k, m) => (b(), w(q, { key: m }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: k.y,
            x2: e.chartMargin,
            y2: k.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, dh),
          r("text", {
            x: e.chartMargin - 12,
            y: k.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(k.value), 9, hh)
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
        (b(!0), w(q, null, et(e.boxplotData, (k, m) => (b(), w(q, { key: m }, [
          r("g", {
            transform: `translate(${k.centerX}, 0)`
          }, [
            k.isTotal ? (b(), w(q, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: k.minY,
                x2: 0,
                y2: k.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ph),
              r("line", {
                x1: 0,
                y1: k.q3Y,
                x2: 0,
                y2: k.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, mh),
              r("line", {
                x1: -18,
                y1: k.minY,
                x2: 18,
                y2: k.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
              r("line", {
                x1: -18,
                y1: k.maxY,
                x2: 18,
                y2: k.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              r("rect", {
                x: -24,
                y: k.q3Y,
                width: "48",
                height: k.q1Y - k.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, yh)
            ], 64)) : (b(), w(q, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: k.minY,
                x2: 0,
                y2: k.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _h),
              r("line", {
                x1: 0,
                y1: k.q3Y,
                x2: 0,
                y2: k.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xh),
              r("line", {
                x1: -18,
                y1: k.minY,
                x2: 18,
                y2: k.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              r("line", {
                x1: -18,
                y1: k.maxY,
                x2: 18,
                y2: k.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ch),
              r("rect", {
                x: -24,
                y: k.q3Y,
                width: "48",
                height: k.q1Y - k.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, $h)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: k.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${k.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            r("circle", {
              cx: 0,
              cy: k.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${k.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            r("circle", {
              cx: 0,
              cy: k.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${k.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            r("circle", {
              cx: 0,
              cy: k.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${k.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            r("line", {
              x1: -24,
              y1: k.medianY,
              x2: 24,
              y2: k.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "ku:hover-line",
              onMouseenter: (v) => l(v, `Median: ${k.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Th),
            k.averageY ? (b(), w("line", {
              key: 2,
              x1: -24,
              y1: k.averageY,
              x2: 24,
              y2: k.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "ku:hover-line",
              onMouseenter: (v) => l(v, `Avg: ${k.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Bh)) : O("", !0)
          ], 8, kh),
          r("text", {
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(k.label)), 9, Lh),
          k.responseCount ? (b(), w("text", {
            key: 0,
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(k.responseCount), 9, Fh)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), w("g", {
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
}), Qh = /* @__PURE__ */ at(Zh, [["__scopeId", "data-v-7afffa58"]]), Jh = { class: "chart-container" }, tf = ["viewBox"], ef = ["x1", "y1", "x2", "y2", "stroke"], nf = ["points", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], sf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x", "y", "fill"], lf = ["x", "y", "fill", "transform"], rf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["points", "fill"], uf = ["transform"], df = ["y1", "y2", "stroke", "onMouseenter"], hf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], ff = ["x1", "y1", "x2", "y2", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], kf = ["cy", "stroke", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], mf = ["x", "y", "fill"], bf = ["x", "y", "fill"], vf = ["transform"], yf = { transform: "translate(-180, 0)" }, _f = ["stroke"], xf = ["fill"], wf = { transform: "translate(-120, 0)" }, Cf = ["fill"], $f = { transform: "translate(-60, 0)" }, Mf = ["fill"], Sf = { transform: "translate(0, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(60, 0)" }, Bf = ["fill"], Lf = { transform: "translate(130, 0)" }, Ff = ["fill"], Ef = ["transform"], Pf = ["x", "y", "width", "height", "fill", "stroke"], If = ["y", "fill"], Rf = ["y", "fill"], jn = 10, Of = 14, ya = 13, $o = 4, Mo = 12, zf = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), o = jn + ya + $o + Mo + jn, i = D(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(f, y, x) {
      const M = x ? 0.6 : 0.535;
      return Math.ceil(Math.max(f, 1) * y * M);
    }
    function c(f, y) {
      return Math.max(
        l(f.length, ya, !0),
        l(y.length, Mo, !1),
        52
      ) + Of * 2;
    }
    function u(f, y, x, M) {
      const S = x / 2, C = 6, $ = Math.min(
        Math.max(f, S + C),
        n.chartWidth - S - C
      ), L = C + M + 10, T = n.chartHeight - C + 10, B = Math.min(Math.max(y, L), T);
      return { x: $, y: B };
    }
    const d = D(() => ({
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
    }), p = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, _ = (f, y, x) => {
      const M = f.currentTarget.closest("svg");
      if (!M) return;
      const S = M.getBoundingClientRect(), C = M.createSVGPoint();
      C.x = f.clientX - S.left, C.y = f.clientY - S.top;
      let $ = p(y.label), L = "";
      switch (x) {
        case "body":
          L = `Q1: ${y.q1.toFixed(1)} | Q3: ${y.q3.toFixed(1)}`;
          break;
        case "wick":
          L = `Min: ${y.low.toFixed(1)} | Max: ${y.high.toFixed(1)}`;
          break;
        case "median":
          L = `Median: ${y.median.toFixed(1)}`;
          break;
        case "average":
          L = `Average: ${y.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          L = `Min: ${y.low.toFixed(1)}`;
          break;
        case "max":
          L = `Max: ${y.high.toFixed(1)}`;
          break;
      }
      const T = c($, L), B = o;
      let E = C.x, P = C.y - 20;
      const N = u(E, P, T, B);
      E = N.x, P = N.y, h.value = {
        visible: !0,
        x: E,
        y: P,
        title: $,
        text: L,
        width: T,
        height: B
      };
    }, k = (f) => {
      if (h.value.visible) {
        const y = f.currentTarget, x = y.getBoundingClientRect(), M = y.createSVGPoint();
        M.x = f.clientX - x.left, M.y = f.clientY - x.top;
        let S = M.x, C = M.y - 20;
        const $ = u(S, C, h.value.width, h.value.height);
        h.value.x = $.x, h.value.y = $.y;
      }
    }, m = () => {
      h.value.visible = !1;
    }, v = () => {
      h.value.visible = !1;
    }, g = D(() => {
      const f = [], x = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let M = 1; M <= 10; M++) {
        const S = M, C = (S - 1) / 9, $ = n.chartMargin + x - C * x;
        f.push({ value: S, y: $ });
      }
      return f;
    });
    return t({ isDark: a }), (f, y) => (b(), w("div", Jh, [
      (b(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: gt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: k,
        onMouseleave: m
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
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, ef),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, nf),
        (b(!0), w(q, null, et(g.value, (x, M) => (b(), w("line", {
          key: `grid-${M}`,
          x1: e.chartMargin,
          y1: x.y,
          x2: e.chartWidth - e.chartMargin,
          y2: x.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, af))), 128)),
        (b(!0), w(q, null, et(g.value, (x, M) => (b(), w(q, { key: M }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: x.y,
            x2: e.chartMargin,
            y2: x.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, sf),
          r("text", {
            x: e.chartMargin - 12,
            y: x.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(x.value), 9, of)
        ], 64))), 128)),
        r("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(p(e.yAxisLabel)), 9, lf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, rf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, cf),
        (b(!0), w(q, null, et(e.candlestickData, (x, M) => (b(), w(q, { key: M }, [
          r("g", {
            transform: `translate(${x.centerX}, 0)`
          }, [
            r("line", {
              x1: 0,
              y1: x.highY,
              x2: 0,
              y2: x.lowY,
              stroke: x.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "ku:hover-line",
              onMouseenter: (S) => _(S, x, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, df),
            r("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(x.q1Y, x.q3Y) - (Math.abs(x.q3Y - x.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(x.q3Y - x.q1Y)),
              fill: x.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: x.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "ku:hover-rect",
              onMouseenter: (S) => _(S, x, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, hf),
            x.medianY ? (b(), w("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: x.medianY,
              x2: e.candleWidth / 2,
              y2: x.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "ku:hover-line",
              onMouseenter: (S) => _(S, x, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ff)) : O("", !0),
            x.averageY ? (b(), w("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: x.averageY,
              x2: e.candleWidth / 2,
              y2: x.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "ku:hover-line",
              onMouseenter: (S) => _(S, x, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, gf)) : O("", !0),
            r("circle", {
              cx: 0,
              cy: x.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => _(S, x, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, kf),
            r("circle", {
              cx: 0,
              cy: x.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => _(S, x, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, pf)
          ], 8, uf),
          r("text", {
            x: x.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(p(x.label)), 9, mf),
          x.responseCount ? (b(), w("text", {
            key: 0,
            x: x.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(x.responseCount), 9, bf)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), w("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", yf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, _f),
            r("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, xf)
          ]),
          r("g", wf, [
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
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Cf)
          ]),
          r("g", $f, [
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
              fill: d.value.legendText,
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
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Df),
            r("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Af)
          ]),
          r("g", Tf, [
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
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Bf)
          ]),
          r("g", Lf, [
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
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Ff)
          ])
        ], 8, vf)) : O("", !0),
        h.value.visible ? (b(), w("g", {
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
            y: -h.value.height - 10 + jn + ya + $o,
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
}), Ri = /* @__PURE__ */ at(zf, [["__scopeId", "data-v-1ba97793"]]), Vf = ["viewBox"], Nf = ["x1", "y1", "x2", "y2", "stroke"], jf = ["x1", "y1", "x2", "y2", "stroke"], Wf = ["points", "fill"], Hf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x", "y", "fill"], Kf = ["x", "y", "fill", "transform"], qf = ["x1", "y1", "x2", "y2", "stroke"], Uf = ["points", "fill"], Xf = ["x1", "y1", "x2", "y2", "stroke"], Gf = ["x", "y", "fill"], Zf = ["x", "y", "fill"], Qf = ["d"], Jf = ["x", "y", "width", "height", "onMouseenter"], tg = ["x1", "y1", "x2", "y2"], eg = ["x", "y"], ng = ["x1", "y1", "x2", "y2"], ag = ["x", "y"], sg = ["x1", "y1", "x2", "y2"], og = ["x", "y"], ig = ["x1", "y1", "x2", "y2"], lg = ["x", "y"], rg = ["x1", "y1", "x2", "y2"], cg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], hg = ["transform"], fg = { transform: "translate(-220, 0)" }, gg = ["fill"], kg = { transform: "translate(-140, 0)" }, pg = ["fill"], mg = { transform: "translate(-80, 0)" }, bg = ["fill"], vg = { transform: "translate(-20, 0)" }, yg = ["fill"], _g = { transform: "translate(60, 0)" }, xg = ["fill"], wg = { transform: "translate(130, 0)" }, Cg = ["fill"], $g = { transform: "translate(180, 0)" }, Mg = ["fill"], Sg = ["transform"], Dg = ["x", "y", "width", "height", "fill", "stroke"], Ag = ["y", "fill"], Tg = ["y", "fill"], Wn = 10, Bg = 14, _a = 13, So = 12, Do = 4, Lg = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), o = Wn + _a + Do + So + Wn, i = D(() => ({
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
        l(V.length, _a, !0),
        l(G.length, So, !1),
        52
      ) + Bg * 2;
    }
    function u(V, G, Z, it) {
      const pt = Z / 2, mt = 6, St = Math.min(
        Math.max(V, pt + mt),
        n.chartWidth - pt - mt
      ), Vt = mt + it + 10, Lt = n.chartHeight - mt + 10, R = Math.min(Math.max(G, Vt), Lt);
      return { x: St, y: R };
    }
    const d = D(() => ({
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
    }), p = D(() => n.chartWidth - n.chartMargin * 2), _ = D(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), k = D(() => p.value / 10 * 0.6), m = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const V = Math.max(...n.histogram.map((Z) => Z.count || 0), 1), G = Math.max(1, Math.ceil(V * 0.2));
      return V + G;
    }), v = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const V = n.averageScore || 0;
      let G = 0, Z = 0;
      if (n.histogram.forEach((pt) => {
        const mt = pt.count || 0;
        G += mt;
        const St = pt.score - V;
        Z += mt * (St * St);
      }), G === 0) return 1;
      const it = Z / G;
      return Math.sqrt(it) || 1;
    }), g = (V, G, Z) => {
      if (Z === 0) return 0;
      const it = 1 / (Z * Math.sqrt(2 * Math.PI)), pt = -0.5 * Math.pow((V - G) / Z, 2);
      return it * Math.exp(pt);
    }, f = D(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && v.value === 0) return null;
      const V = n.averageScore, G = v.value, Z = 100, pt = Math.max(...n.histogram.map((Lt) => Lt.count || 0), 1) / m.value * _.value;
      if (pt <= 0) return null;
      let mt = 0;
      for (let Lt = 0; Lt <= Z; Lt++) {
        const R = 1 + 9 * (Lt / Z), j = g(R, V, G);
        j > mt && (mt = j);
      }
      if (mt <= 0) return null;
      const St = pt / mt, Vt = [];
      for (let Lt = 0; Lt <= Z; Lt++) {
        const R = 1 + 9 * (Lt / Z), j = g(R, V, G) * St, X = x(R);
        if (X !== null) {
          const ft = n.chartHeight - n.chartBottomMargin - j;
          Vt.push(`${Lt === 0 ? "M" : "L"} ${X} ${ft}`);
        }
      }
      return Vt.join(" ");
    }), y = D(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const V = p.value / 10;
      return n.histogram.map((G, Z) => {
        const it = n.chartMargin + (Z + 0.5) * V, pt = G.count > 0 ? G.count / m.value * _.value : 0, mt = n.chartHeight - n.chartBottomMargin - pt;
        return {
          score: G.score,
          count: G.count,
          x: it,
          y: mt,
          height: pt
        };
      });
    }), x = (V) => {
      if (V < 1 || V > 10) return null;
      const G = p.value / 10;
      return n.chartMargin + (V - 0.5) * G;
    }, M = D(() => x(n.minScore)), S = D(() => x(n.maxScore)), C = D(() => x(n.q1Score)), $ = D(() => x(n.medianScore)), L = D(() => x(n.q3Score)), T = D(() => x(n.averageScore)), B = D(() => n.minScore), E = D(() => n.maxScore), P = D(() => n.q1Score), N = D(() => n.medianScore), Y = D(() => n.q3Score), W = D(() => n.averageScore), J = D(() => {
      const V = [], G = n.chartMargin - 8, Z = 18;
      C.value !== null && V.push({
        x: C.value,
        y: G,
        value: n.q1Score,
        label: `Q1: ${P.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), $.value !== null && V.push({
        x: $.value,
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
      }), V.sort((mt, St) => (mt.x || 0) - (St.x || 0));
      const it = [[], [], []];
      V.forEach((mt) => {
        if (mt.x === null) return;
        let St = -1;
        for (let Vt = 0; Vt < it.length; Vt++) {
          let Lt = !1;
          for (const R of it[Vt]) {
            if (R.x === null) continue;
            const j = Math.abs(mt.x - R.x), X = (mt.width + R.width) / 2 + 10;
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
        St === -1 && (St = it.length - 1), mt.y = G - St * Z, it[St].push(mt);
      });
      const pt = 15;
      return V.forEach((mt) => {
        mt.y < pt && (mt.y = pt);
      }), V;
    }), tt = (V) => J.value.find((Z) => Z.id === V)?.y || n.chartMargin - 10, lt = D(() => {
      const V = [];
      for (let Z = 0; Z <= 5; Z++) {
        const it = Math.round(m.value / 5 * Z), pt = n.chartHeight - n.chartBottomMargin - Z / 5 * _.value;
        V.push({ value: it, y: pt });
      }
      return V;
    });
    function bt(V, G, Z) {
      const it = V.createSVGPoint();
      it.x = G, it.y = Z;
      const pt = V.getScreenCTM();
      if (!pt) {
        const St = V.getBoundingClientRect();
        return { x: G - St.left, y: Z - St.top };
      }
      const mt = it.matrixTransform(pt.inverse());
      return { x: mt.x, y: mt.y };
    }
    const kt = (V, G) => {
      n.interactive && Mt(V, G);
    }, ct = () => {
      n.interactive && At();
    }, Mt = (V, G) => {
      const Z = V.currentTarget.closest("svg");
      if (!Z) return;
      const { x: it, y: pt } = bt(Z, V.clientX, V.clientY), mt = `Score: ${G.score}`, St = `Count: ${Number(G.count ?? 0).toLocaleString()}`, Vt = c(mt, St), Lt = o, R = typeof G?.x == "number" ? G.x : it;
      let j = pt - 20;
      const X = u(R, j, Vt, Lt);
      h.value = {
        visible: !0,
        x: X.x,
        y: X.y,
        title: mt,
        text: St,
        width: Vt,
        height: Lt,
        anchorX: typeof G?.x == "number" ? G.x : null
      };
    }, st = (V) => {
      if (n.interactive && h.value.visible) {
        const G = V.currentTarget, { x: Z, y: it } = bt(G, V.clientX, V.clientY), pt = h.value.anchorX, mt = pt != null && Number.isFinite(pt) ? pt : Z;
        let St = it - 20;
        const Vt = u(mt, St, h.value.width, h.value.height);
        h.value.x = Vt.x, h.value.y = Vt.y;
      }
    }, Et = () => {
      At();
    }, At = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (V, G) => (b(), w("div", {
      class: H(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (b(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "ku:w-full histogram-svg",
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
        (b(!0), w(q, null, et(lt.value, (Z, it) => (b(), w("line", {
          key: `grid-${it}`,
          x1: e.chartMargin,
          y1: Z.y,
          x2: e.chartWidth - e.chartMargin,
          y2: Z.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Nf))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, jf),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Wf),
        (b(!0), w(q, null, et(lt.value, (Z, it) => (b(), w(q, {
          key: `y-tick-${it}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: Z.y,
            x2: e.chartMargin,
            y2: Z.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Hf),
          r("text", {
            x: e.chartMargin - 12,
            y: Z.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(Z.value), 9, Yf)
        ], 64))), 128)),
        r("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
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
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, qf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Uf),
        (b(!0), w(q, null, et(y.value, (Z, it) => (b(), w(q, {
          key: `tick-${it}`
        }, [
          r("line", {
            x1: Z.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: Z.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xf),
          r("text", {
            x: Z.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(Z.score), 9, Gf)
        ], 64))), 128)),
        r("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Zf),
        f.value ? (b(), w("path", {
          key: 0,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Qf)) : O("", !0),
        (b(!0), w(q, null, et(y.value, (Z, it) => (b(), w("rect", {
          key: `bar-${it}`,
          x: Z.x - k.value / 2,
          y: Z.y,
          width: k.value,
          height: Z.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (pt) => kt(pt, Z),
          onMouseleave: ct,
          style: gt({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Jf))), 128)),
        M.value ? (b(), w("line", {
          key: 1,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, tg)) : O("", !0),
        M.value ? (b(), w("text", {
          key: 2,
          x: M.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(B.value.toFixed(1)), 9, eg)) : O("", !0),
        C.value ? (b(), w("line", {
          key: 3,
          x1: C.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ng)) : O("", !0),
        C.value ? (b(), w("text", {
          key: 4,
          x: C.value,
          y: tt("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(P.value.toFixed(1)), 9, ag)) : O("", !0),
        $.value ? (b(), w("line", {
          key: 5,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, sg)) : O("", !0),
        $.value ? (b(), w("text", {
          key: 6,
          x: $.value,
          y: tt("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(N.value.toFixed(1)), 9, og)) : O("", !0),
        T.value ? (b(), w("line", {
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
        T.value ? (b(), w("text", {
          key: 8,
          x: T.value,
          y: tt("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(W.value.toFixed(1)), 9, lg)) : O("", !0),
        L.value ? (b(), w("line", {
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
        L.value ? (b(), w("text", {
          key: 10,
          x: L.value,
          y: tt("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(Y.value.toFixed(1)), 9, cg)) : O("", !0),
        S.value ? (b(), w("line", {
          key: 11,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ug)) : O("", !0),
        S.value ? (b(), w("text", {
          key: 12,
          x: S.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(E.value.toFixed(1)), 9, dg)) : O("", !0),
        e.showLegend ? (b(), w("g", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, gg)
          ]),
          r("g", kg, [
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, pg)
          ]),
          r("g", mg, [
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, bg)
          ]),
          r("g", vg, [
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, yg)
          ]),
          r("g", _g, [
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, xg)
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
              fill: d.value.legendText,
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Mg)
          ])
        ], 8, hg)) : O("", !0),
        e.interactive && h.value.visible ? (b(), w("g", {
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
            y: -h.value.height - 10 + Wn + _a + Do,
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
}), Oi = /* @__PURE__ */ at(Lg, [["__scopeId", "data-v-336d5e9f"]]), Fg = 639, zi = 1024;
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
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Fg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${zi}px)`), s = window.matchMedia("ku:(min-width: 1025px)"), o = () => {
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
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), { breakpoint: o } = Eg(), i = nt(null), l = nt(!0), c = nt(!1);
    let u = null;
    const d = {
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
    }), p = (S, C) => {
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
        const E = $.slice(T, B), P = E.lastIndexOf(" ");
        if (P > 0)
          for (L.push($.slice(T, T + P).trim()), T += P; T < $.length && $[T] === " "; ) T += 1;
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
    ], k = () => {
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
        color: n.nodeColors[C.name] || _[$ % _.length],
        borderRadius: 8
      }
    })), v = (S) => (C) => {
      const $ = C.dataType === "node", L = s.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if ($) {
        const Y = S.filter((tt) => tt.target === C.name), W = S.filter((tt) => tt.source === C.name), J = Y.length > 0 ? Y.reduce((tt, lt) => tt + (lt.originalValue || lt.value), 0) : W.reduce((tt, lt) => tt + (lt.originalValue || lt.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${C.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${J.toLocaleString()}</div>`;
      }
      const B = C.data?.source || C.source || "Unknown", E = C.data?.target || C.target || "Unknown", P = C.data?.originalValue || C.data?.value || C.value || 0, N = C.data?.label || `${P.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${B} → ${E}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, g = () => {
      if (!u || !n.data.nodes?.length || !n.data.links?.length) return;
      const S = h.value, C = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: L, links: T } = k(), B = m(L), E = {
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
              itemStyle: d.style,
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
                    return p(N, Math.max(4, S.labelCharsPerLine));
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
        u.setOption(E), u.resize();
      } catch (L) {
        console.error("Error setting Sankey chart ku:options:", L), c.value = !0;
      }
    }, f = async () => {
      if (i.value)
        try {
          u = is.init(i.value), g(), window.addEventListener("resize", x);
        } catch (S) {
          console.error("Error initializing Sankey ku:chart:", S), c.value = !0;
        } finally {
          l.value = !1;
        }
    }, y = async (S = 40) => {
      await Rt();
      for (let C = 0; C < S; C++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await f();
        await new Promise(($) => setTimeout($, 50));
      }
      await f(), setTimeout(x, 50);
    }, x = () => u?.resize(), M = () => {
      window.removeEventListener("resize", x), u && (u.dispose(), u = null);
    };
    return oe(() => i.value && y()), No(M), It(() => n.data, g, { deep: !0 }), It(a, g), It(o, g), t({ isDark: a }), (S, C) => (b(), w("div", Pg, [
      c.value ? (b(), w("div", {
        key: 0,
        class: "error-state",
        style: gt({ height: e.height })
      }, [...C[0] || (C[0] = [
        os('<div class="error-content" data-v-20e2d779><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-20e2d779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-20e2d779></path></svg><p class="error-title" data-v-20e2d779>Chart could not be loaded</p><p class="error-description" data-v-20e2d779>Please check the data format.</p></div>', 1)
      ])], 4)) : (b(), w("div", Ig, [
        Zt(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: gt({ height: e.height })
        }, null, 4), [
          [vn, !l.value]
        ]),
        Zt(r("div", {
          class: "loading-state",
          style: gt({ height: e.height })
        }, [...C[1] || (C[1] = [
          os('<div class="loading-container" data-v-20e2d779><div class="sankey-loader" data-v-20e2d779><div class="flow flow-1" data-v-20e2d779></div><div class="flow flow-2" data-v-20e2d779></div><div class="flow flow-3" data-v-20e2d779></div><div class="flow flow-4" data-v-20e2d779></div></div><p class="loading-text" data-v-20e2d779>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [vn, l.value]
        ])
      ]))
    ]));
  }
}), Le = /* @__PURE__ */ at(Rg, [["__scopeId", "data-v-20e2d779"]]), Og = ["open"], zg = { class: "card-header metric-collapsible__summary" }, Vg = { class: "header-content metric-header-content" }, Ng = { class: "metric-header-content__main" }, jg = { class: "metric-header-content__text" }, Wg = {
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
}, tk = {
  key: 0,
  class: "card-subtitle"
}, ek = {
  key: 0,
  class: "metric-header-content__export"
}, nk = {
  key: 0,
  class: "cmc-header-aside"
}, ak = { class: "chart-metric-container__body" }, sk = /* @__PURE__ */ Q({
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
          const u = c.children;
          return typeof u == "string" && u.trim().length > 0;
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
    return (l, c) => e.collapsible ? (b(), w("details", {
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
                e.title ? (b(), w("h3", Wg, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (b(), w("p", Hg, A(e.subtitle), 1)) : O("", !0),
              $t(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (b(), w("div", Yg, [
              $t(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), w("div", Kg, [
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
    ], 40, Og)) : (b(), w("div", Ug, [
      r("div", Xg, [
        r("div", Gg, [
          r("div", Zg, [
            r("div", Qg, [
              $t(l.$slots, "title", {}, () => [
                e.title ? (b(), w("h3", Jg, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (b(), w("p", tk, A(e.subtitle), 1)) : O("", !0),
              $t(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (b(), w("div", ek, [
              $t(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), w("div", nk, [
            $t(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ])
      ]),
      r("div", ak, [
        $t(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ht = /* @__PURE__ */ at(sk, [["__scopeId", "data-v-3c4aac03"]]);
function ok(e, t) {
  return b(), w("svg", {
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
  return b(), w("svg", {
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
  return b(), w("svg", {
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
function ik(e, t) {
  return b(), w("svg", {
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
  return b(), w("svg", {
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
function lk(e, t) {
  return b(), w("svg", {
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
function rk(e, t) {
  return b(), w("svg", {
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
function ck(e, t) {
  return b(), w("svg", {
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
function uk(e, t) {
  return b(), w("svg", {
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
  return b(), w("svg", {
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
const dk = {
  key: 0,
  class: "footer-divider"
}, hk = {
  key: 0,
  class: "export-label"
}, fk = { class: "export-buttons" }, gk = ["disabled"], kk = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, pk = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, mk = ["disabled"], bk = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, vk = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, yk = /* @__PURE__ */ Q({
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
    return (c, u) => (b(), K(Xe(s.value), {
      class: H(o.value)
    }, {
      default: I(() => [
        e.variant === "footer" ? (b(), w("div", dk)) : O("", !0),
        r("div", {
          class: H(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (b(), w("span", hk, "Export")) : O("", !0),
          r("div", fk, [
            i("pdf") ? (b(), w("button", {
              key: 0,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: u[0] || (u[0] = (d) => l("pdf"))
            }, [
              e.loading ? (b(), w("svg", kk, [...u[2] || (u[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), w("svg", pk, [...u[3] || (u[3] = [
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
              u[4] || (u[4] = r("span", null, "PDF", -1))
            ], 10, gk)) : O("", !0),
            i("csv") ? (b(), w("button", {
              key: 1,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: u[1] || (u[1] = (d) => l("csv"))
            }, [
              e.loading ? (b(), w("svg", bk, [...u[5] || (u[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), w("svg", vk, [...u[6] || (u[6] = [
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
              u[7] || (u[7] = r("span", null, "CSV", -1))
            ], 10, mk)) : O("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Tt = /* @__PURE__ */ at(yk, [["__scopeId", "data-v-33a9d528"]]), _k = { class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0 ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xk = {
  key: 0,
  class: "ku:flex ku:min-h-[320px] ku:flex-col ku:items-center ku:justify-center ku:px-4"
}, wk = { class: "ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5" }, Ck = {
  key: 1,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-4 ku:sm:gap-6"
}, $k = { class: "ku:w-full ku:shrink-0 ku:sm:pr-2" }, Mk = {
  key: 2,
  class: "ku:flex ku:min-h-[280px] ku:w-full ku:items-center ku:justify-center"
}, Sk = { class: "ku:max-w-[360px] ku:text-center" }, Dk = { class: "ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] ku:shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ak = /* @__PURE__ */ Q({
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
    }, s = e, o = n, i = (k) => {
      o("export", k);
    }, l = [30, 50, 70, 50, 40], c = ["", "ku:delay-100", "ku:delay-200", "ku:delay-300", "ku:delay-[400ms]"], u = rt(s, "theme"), d = rt(s, "options"), { isDark: h } = ut(u), p = (k) => {
      const m = new Date(k), v = String(m.getDate()).padStart(2, "0"), g = String(m.getMonth() + 1).padStart(2, "0");
      return `${v}-${g}`;
    }, _ = D(() => {
      const k = s.data?.agents_by_day || {}, m = Object.keys(k).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.map((M) => p(M)), g = /* @__PURE__ */ new Set();
      for (const M of Object.values(k))
        for (const S of Object.keys(M))
          g.add(S);
      const f = Array.from(g), y = (M) => M, x = f.map((M) => ({
        label: M,
        data: m.map((S) => k[S]?.[M] || 0),
        backgroundColor: `${a[M] || "#94a3b8"}80`,
        borderColor: y(a[M] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: v,
        datasets: x
      };
    });
    return t({ isDark: h }), (k, m) => (b(), K(ht, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", _k, [
          e.loading ? (b(), w("div", xk, [
            r("div", wk, [
              (b(), w(q, null, et(l, (v, g) => r("div", {
                key: g,
                class: H(["ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300", c[g]]),
                style: gt({ height: `${v}%` })
              }, null, 6)), 64))
            ]),
            m[0] || (m[0] = r("p", { class: "ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : _.value.labels && _.value.labels.length ? (b(), w("section", Ck, [
            r("div", $k, [
              z(pe, {
                data: _.value,
                stacked: !0,
                theme: u.value,
                options: d.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (b(), w("section", Mk, [
            r("div", Sk, [
              r("div", Dk, [
                z(F(Kt), { class: "ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              m[1] || (m[1] = r("p", { class: "ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
              m[2] || (m[2] = r("p", { class: "ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Tk = { class: "ku:flex ku:w-full ku:min-w-0 ku:justify-center" }, Bk = { class: "ku:flex ku:max-w-full ku:min-w-0 ku:items-center ku:gap-2" }, Lk = { class: "ku:min-w-0 ku:truncate ku:text-[12px] ku:leading-normal" }, Fk = { class: "ku:text-[14px] ku:font-bold ku:leading-tight ku:text-[color:var(--kiut-text-primary,#1e293b)]" }, Ek = {
  key: 0,
  class: "ku:min-w-0 ku:w-full ku:truncate ku:text-[10px] ku:leading-normal"
}, Pk = /* @__PURE__ */ Q({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (b(), w("div", {
      class: H(["card-info ku:box-border ku:flex ku:w-full ku:min-w-0 ku:flex-col ku:items-center ku:justify-center ku:gap-1 ku:overflow-hidden ku:rounded-2xl ku:px-3 ku:py-2 ku:text-center ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] ku:text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "ku:h-[75px]" : "ku:h-[58px]"])
    }, [
      r("div", Tk, [
        r("div", Bk, [
          e.color ? (b(), w("span", {
            key: 0,
            class: "ku:inline-block ku:h-2.5 ku:w-2.5 ku:shrink-0 ku:rounded-full ku:align-middle",
            style: gt({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", Lk, A(e.title), 1)
        ])
      ]),
      r("p", Fk, A(e.value), 1),
      e.subvalue ? (b(), w("p", Ek, A(e.subvalue), 1)) : O("", !0)
    ], 2));
  }
}), ot = /* @__PURE__ */ at(Pk, [["__scopeId", "data-v-bbc5ff24"]]), Ik = {
  key: 0,
  class: "ku:relative ku:flex ku:h-2 ku:w-2 ku:shrink-0 ku:items-center ku:justify-center",
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
      "ku:border ku:border-emerald-200 ku:bg-emerald-50",
      "ku:dark:border-emerald-800/80 ku:dark:bg-emerald-950/40"
    ] : [
      "ku:border ku:border-transparent ku:bg-slate-100 ku:dark:border-slate-700/80 ku:dark:bg-slate-800/90"
    ]), o = D(() => t.statusLive === !0 ? "ku:text-emerald-700 ku:dark:text-emerald-300" : "ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-300"), i = D(() => {
      const l = t.outlined;
      switch (t.color) {
        case "purple":
          return l ? "ku:border ku:border-violet-500 ku:bg-transparent ku:text-violet-700 ku:dark:border-violet-400 ku:dark:text-violet-300" : "ku:border ku:border-violet-200 ku:bg-violet-50 ku:text-violet-700 ku:dark:border-violet-700 ku:dark:bg-violet-950/40 ku:dark:text-violet-300";
        case "warning":
          return l ? "ku:border ku:border-amber-500 ku:bg-transparent ku:text-amber-800 ku:dark:border-amber-400 ku:dark:text-amber-200" : "ku:border ku:border-amber-200 ku:bg-amber-50 ku:text-amber-800 ku:dark:border-amber-800 ku:dark:bg-amber-950/35 ku:dark:text-amber-200";
        case "success":
          return l ? "ku:border ku:border-emerald-500 ku:bg-transparent ku:text-emerald-800 ku:dark:border-emerald-400 ku:dark:text-emerald-200" : "ku:border ku:border-emerald-200 ku:bg-emerald-50 ku:text-emerald-800 ku:dark:border-emerald-800 ku:dark:bg-emerald-950/35 ku:dark:text-emerald-200";
        case "danger":
          return l ? "ku:border ku:border-red-500 ku:bg-transparent ku:text-red-800 ku:dark:border-red-400 ku:dark:text-red-200" : "ku:border ku:border-red-200 ku:bg-red-50 ku:text-red-800 ku:dark:border-red-800 ku:dark:bg-red-950/35 ku:dark:text-red-200";
        case "orange":
          return l ? "ku:border ku:border-orange-500 ku:bg-transparent ku:text-orange-800 ku:dark:border-orange-400 ku:dark:text-orange-200" : "ku:border ku:border-orange-200 ku:bg-orange-50 ku:text-orange-800 ku:dark:border-orange-800 ku:dark:bg-orange-950/35 ku:dark:text-orange-200";
        default:
          return l ? "ku:border ku:border-slate-400 ku:bg-transparent ku:text-[color:var(--kiut-text-primary)] ku:dark:border-slate-500 ku:dark:text-slate-200" : "ku:border ku:border-slate-200 ku:bg-slate-100 ku:text-[color:var(--kiut-text-primary)] ku:dark:border-slate-600 ku:dark:bg-slate-800 ku:dark:text-slate-200";
      }
    });
    return (l, c) => n.value ? (b(), w("span", {
      key: 0,
      role: "status",
      class: H(["ku:inline-flex ku:w-min ku:max-w-full ku:min-h-[22px] ku:items-center ku:gap-2 ku:whitespace-nowrap ku:rounded-full ku:px-3 ku:py-1 ku:text-center ku:text-xs ku:font-['Inter',system-ui,sans-serif] ku:leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (b(), w("span", Ik, [...c[0] || (c[0] = [
        r("span", { class: "ku:absolute ku:inline-flex ku:h-full ku:w-full ku:animate-ping ku:rounded-full ku:bg-emerald-500/50 ku:dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "ku:relative ku:inline-flex ku:h-2 ku:w-2 ku:rounded-full ku:bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      r("span", {
        class: H(["ku:min-w-0 ku:flex-1 ku:text-center", o.value])
      }, A(a.value), 3)
    ], 2)) : (b(), w("span", {
      key: 1,
      class: H(["ku:inline-flex ku:w-min ku:max-w-full ku:min-h-[22px] ku:items-center ku:justify-center ku:whitespace-nowrap ku:rounded-full ku:px-3 ku:py-1 ku:text-center ku:text-xs ku:font-['Inter',system-ui,sans-serif] ku:font-semibold ku:leading-snug ku:tracking-tight", i.value])
    }, [
      $t(l.$slots, "default", {}, () => [
        vt(A(e.label), 1)
      ])
    ], 2));
  }
}), U = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), _t = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), we = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Rk = {
  class: "kiut-table-root ku:table-section ku:flex ku:w-full ku:min-w-0 ku:flex-col ku:rounded-xl ku:font-sans ku:antialiased ku:text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Ok = { class: "ku:overflow-x-auto" }, zk = { class: "ku:w-full ku:table-auto ku:border-collapse ku:text-left ku:text-[14px] ku:leading-normal" }, Vk = /* @__PURE__ */ Q({
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
    function s(m) {
      return m == null || m === "" ? a : String(m);
    }
    function o(m) {
      return m === "center" ? "ku:text-center" : m === "right" ? "ku:text-right" : "ku:text-left";
    }
    function i(m) {
      return `cell-${m}`;
    }
    function l(m, v) {
      return m[v];
    }
    function c(m, v) {
      if (typeof t.rowKey == "function")
        return t.rowKey(m);
      const g = m[t.rowKey];
      return typeof g == "string" || typeof g == "number" ? g : v;
    }
    function u(m, v) {
      return c(m, v);
    }
    const d = D(() => t.rows?.length ?? 0), h = D(() => d.value > t.maxVisibleRows), p = D(() => Math.max(0, d.value - t.maxVisibleRows)), _ = D(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), k = D(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (m, v) => (b(), w("div", Rk, [
      r("div", Ok, [
        r("table", zk, [
          r("thead", null, [
            r("tr", null, [
              (b(!0), w(q, null, et(e.columns, (g) => (b(), w("th", {
                key: g.key,
                scope: "col",
                class: H(["kiut-table-th ku:whitespace-nowrap ku:px-3 ku:py-2 ku:text-left ku:text-[#9191a1]", [o(g.align), g.headerClass]])
              }, A(g.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (b(!0), w(q, null, et(_.value, (g, f) => (b(), w("tr", {
              key: u(g, f)
            }, [
              (b(!0), w(q, null, et(e.columns, (y) => (b(), w("td", {
                key: `${f}-${y.key}`,
                class: H(["kiut-table-td ku:px-3 ku:py-2 ku:text-[color:var(--kiut-text-primary,#1e293b)]", [o(y.align), y.cellClass]])
              }, [
                $t(m.$slots, i(y.key), {
                  row: g,
                  column: y,
                  value: l(g, y.key)
                }, () => [
                  vt(A(s(l(g, y.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (b(), w("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: v[0] || (v[0] = (g) => n.value = !n.value)
      }, [
        vt(A(n.value ? e.viewLessLabel : k.value) + " ", 1),
        (b(), w("svg", {
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
      ])) : O("", !0)
    ]));
  }
}), Qt = /* @__PURE__ */ at(Vk, [["__scopeId", "data-v-7bdcfecf"]]), Nk = {
  key: 0,
  class: "loading-state"
}, jk = {
  key: 1,
  class: "error-state"
}, Wk = { class: "error-content" }, Hk = { class: "error-description" }, Yk = {
  key: 2,
  class: "card-body"
}, Kk = { class: "chart-section" }, qk = { class: "chart-wrapper" }, Uk = { class: "payment-success-summary" }, Xk = {
  key: 0,
  class: "booking-daily-section"
}, Gk = { class: "ku:w-full ku:min-w-0" }, Zk = { class: "ku:font-medium" }, Qk = { class: "percentage-text" }, Jk = { class: "badges-container" }, tp = {
  key: 0,
  class: "badges-container"
}, ep = {
  key: 1,
  class: "percentage-text"
}, np = { class: "badges-container" }, ap = {
  key: 1,
  class: "ku:empty-state"
}, sp = /* @__PURE__ */ Q({
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
      (f, y) => new Date(f.date).getTime() - new Date(y.date).getTime()
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
    ), u = D(() => a.data?.total_payment_success_value || []), d = D(() => {
      const f = u.value;
      return f.length === 0 ? k(0) : f.map((y) => `${y.currency} ${k(y.total_value)}`).join(" · ");
    }), h = (f) => f.payment_success_value || [], p = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce((y, x) => y + (x.count || 0), 0), _ = (f) => _t(f), k = (f) => f == null ? "0" : we(f);
    D(() => (a.data?.total_payment_success_value || []).reduce((f, y) => f + (y.total_value || 0), 0));
    const m = D(() => {
      const f = a.data, y = f.total_booking_initiated || 0, x = f.total_booking_started || 0, M = f.total_payment_initiated || 0, S = f.total_not_found || 0, C = f.total_cancelled || 0, $ = f.total_no_pending_balance || 0, L = f.total_errors || 0, T = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce((J, tt) => J + (tt.count || 0), 0), B = f.total_payment_failed || 0, E = Math.max(0, y - x), P = Math.max(0, x - M - S - C - $ - L), N = (J, tt) => {
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
      return x > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: N(x, y)
      }), E > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: N(E, y)
      }), M > 0 && W.push({
        source: "Started",
        target: "Payment Initiated",
        value: M,
        label: N(M, x)
      }), S > 0 && W.push({
        source: "Started",
        target: "Not Found",
        value: S,
        label: N(S, x)
      }), C > 0 && W.push({
        source: "Started",
        target: "Cancelled",
        value: C,
        label: N(C, x)
      }), $ > 0 && W.push({
        source: "Started",
        target: "No Pending Balance",
        value: $,
        label: N($, x)
      }), L > 0 && W.push({
        source: "Started",
        target: "Errors",
        value: L,
        label: N(L, x)
      }), P > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: N(P, x)
      }), T > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, M)
      }), B > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, M)
      }), { nodes: Y, links: W };
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
    }, g = (f, y) => !y || y === 0 ? "0%" : `${Math.round(f / y * 100)}%`;
    return (f, y) => (b(), K(ht, {
      class: "booking-manager-root ku:h-full ku:min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading && !a.error ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), w("div", Nk, [...y[0] || (y[0] = [
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
        ])])) : a.error ? (b(), w("div", jk, [
          r("div", Wk, [
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
            r("p", Hk, A(a.error), 1)
          ])
        ])) : (b(), w("div", Yk, [
          r("section", Kk, [
            r("div", qk, [
              z(Le, {
                data: m.value,
                "node-colors": v,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", Uk, [
            z(ot, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (b(), w("section", Xk, [
            y[3] || (y[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Gk, [
              z(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  r("span", Zk, A(F(Pt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: x }) => [
                  r("span", null, A(F(U)(Number(x.booking_initiated_count))), 1)
                ]),
                "cell-started": I(({ row: x }) => [
                  r("span", null, [
                    vt(A(F(U)(Number(x.booking_started_count))) + " ", 1),
                    r("span", Qk, " (" + A(g(Number(x.booking_started_count), Number(x.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": I(({ row: x }) => [
                  r("span", null, A(F(U)(Number(x.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": I(({ row: x }) => [
                  r("div", Jk, [
                    z(Nt, { color: "success" }, {
                      default: I(() => [
                        vt(" Success: " + A(F(U)(p(x))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "danger" }, {
                      default: I(() => [
                        vt(" Failed: " + A(F(U)(Number(x.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": I(({ row: x }) => [
                  h(x).length > 0 ? (b(), w("div", tp, [
                    (b(!0), w(q, null, et(h(x), (M) => (b(), w("span", {
                      key: `${x.date}-${M.currency}`,
                      class: "badge badge-currency"
                    }, A(M.currency) + " " + A(_(M.total_value)), 1))), 128))
                  ])) : (b(), w("span", ep, "N/A"))
                ]),
                "cell-outcomes": I(({ row: x }) => [
                  r("div", np, [
                    z(Nt, { color: "danger" }, {
                      default: I(() => [
                        vt(" Not Found: " + A(x.not_found_count ? F(U)(Number(x.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "warning" }, {
                      default: I(() => [
                        vt(" Cancelled: " + A(x.cancelled_count ? F(U)(Number(x.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "orange" }, {
                      default: I(() => [
                        vt(" No Balance: " + A(x.no_pending_balance_count ? F(U)(Number(x.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    z(Nt, { color: "danger" }, {
                      default: I(() => [
                        vt(" Errors: " + A(x.error_count ? F(U)(Number(x.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), w("section", ap, [...y[4] || (y[4] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No booking manager data available"),
              r("p", { class: "ku:empty-description" }, "No booking manager data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }));
  }
}), op = /* @__PURE__ */ at(sp, [["__scopeId", "data-v-a8767661"]]), ip = {
  key: 0,
  class: "loading-state"
}, lp = {
  key: 1,
  class: "card-body"
}, rp = {
  key: 0,
  class: "chart-section"
}, cp = { class: "chart-wrapper" }, up = {
  key: 1,
  class: "checkin-daily-section"
}, dp = { class: "ku:w-full ku:min-w-0" }, hp = { class: "ku:font-medium" }, fp = { class: "cell-success" }, gp = { class: "cell-danger" }, kp = {
  key: 0,
  class: "reasons-list"
}, pp = { class: "reason-name" }, mp = { class: "reason-count" }, bp = {
  key: 1,
  class: "no-reasons"
}, vp = {
  key: 2,
  class: "ku:empty-state"
}, yp = {
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
    ], u = D(
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
    ), d = D(() => {
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
    }), p = D(() => {
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
      return (h.value.unrecovered_by_step || []).forEach((x) => {
        const S = x.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), C = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        f[S] = C[S] || "#DC2626";
      }), f;
    }), _ = (f, y) => !y || y === 0 ? "0%" : `${Math.round(f / y * 100)}%`, k = (f, y) => {
      const x = U(f), M = _(f, y);
      return `${x} (${M})`;
    }, m = (f) => f.reduce((y, x) => y + x.failed_count, 0), v = D(() => {
      const f = [], y = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: f, links: y };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const x = d.value.total_checkin_initiated, M = d.value.total_checkin_init, S = d.value.total_checkin_init_abandoned, C = M - S, $ = d.value.total_checkin_started, L = d.value.total_checkin_completed, T = d.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], E = B.reduce((W, J) => W + J.count, 0);
      if (M > 0) {
        const W = Math.round(M / x * 100);
        y.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${W}%)`
        });
      }
      const P = x - M;
      if (P > 0) {
        const W = Math.round(P / x * 100);
        f.push({ name: "Abandoned (Init)" }), y.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: P,
          label: `${P.toLocaleString()} (${W}%)`
        });
      }
      if (S > 0) {
        const W = Math.round(S / x * 100);
        f.push({ name: "Abandoned (Started)" }), y.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: S,
          label: `${S.toLocaleString()} (${W}%)`
        });
      }
      if (C > 0) {
        const W = Math.round(C / x * 100);
        y.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: C,
          label: `${C.toLocaleString()} (${W}%)`
        });
      }
      if ($ > 0) {
        const W = Math.round($ / x * 100);
        y.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${W}%)`
        });
      }
      if (L > 0) {
        const W = Math.round(L / $ * 100);
        y.push({
          source: "Number of Passengers",
          target: "Completed",
          value: L,
          label: `${L.toLocaleString()} (${W}%)`
        });
      }
      if (B.length > 0 && E > 0) {
        f.push({ name: "Unrecovered" });
        const W = Math.round(E / $ * 100);
        y.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${W}%)`
        }), B.forEach((J) => {
          const lt = J.step_name.replace(/_/g, " ").split(" ").map((kt) => kt.charAt(0).toUpperCase() + kt.slice(1)).join(" "), bt = Math.round(J.count / $ * 100);
          f.push({ name: lt }), y.push({
            source: "Unrecovered",
            target: lt,
            value: J.count,
            label: `${J.count.toLocaleString()} (${bt}%)`
          });
        });
      }
      const N = $ - (L + E);
      if (N > 0) {
        const W = Math.round(N / $ * 100);
        f.push({ name: "Abandoned (Flow)" }), y.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${W}%)`
        });
      }
      const Y = L - T;
      if (Y > 0) {
        const W = Math.round(Y / $ * 100);
        f.push({ name: "BP Error" }), y.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${W}%)`
        });
      }
      if (T > 0) {
        const W = Math.round(T / $ * 100);
        y.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${W}%)`
        });
      }
      return { nodes: f, links: y };
    }), g = () => {
      const f = d.value.checkin_by_day || [], y = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((x) => {
        const M = y.find(
          (S) => S.date === x.date
        );
        return {
          ...x,
          failed_steps: M?.steps || []
        };
      }), l.value.sort((x, M) => new Date(x.date) - new Date(M.date));
    };
    return It(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        g();
      },
      { deep: !0, immediate: !0 }
    ), (f, y) => (b(), K(ht, {
      class: "checkin-metrics-root ku:h-full ku:min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (b(), w("div", ip, [...y[0] || (y[0] = [
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
        ])])) : (b(), w("div", lp, [
          v.value.nodes.length > 0 ? (b(), w("section", rp, [
            r("div", cp, [
              z(Le, {
                data: v.value,
                height: "500px",
                "node-colors": p.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), w("section", up, [
            r("div", dp, [
              z(Qt, {
                columns: c,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  r("span", hp, A(F(Pt)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: x }) => [
                  r("span", null, A(F(U)(x.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: x }) => [
                  r("span", null, A(k(x.checkin_init_count, x.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": I(({ row: x }) => [
                  r("span", null, A(F(U)(x.checkin_started_count)), 1)
                ]),
                "cell-completed": I(({ row: x }) => [
                  r("span", null, A(k(x.checkin_completed_count, x.checkin_started_count)), 1)
                ]),
                "cell-closed": I(({ row: x }) => [
                  r("span", fp, A(k(x.checkin_closed_count, x.checkin_started_count)), 1)
                ]),
                "cell-failed": I(({ row: x }) => [
                  r("span", gp, A(k(m(x.failed_steps), x.checkin_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: x }) => [
                  x.failed_steps && x.failed_steps.length > 0 ? (b(), w("div", kp, [
                    (b(!0), w(q, null, et(x.failed_steps, (M) => (b(), w("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      r("span", pp, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", mp, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), w("div", bp, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), w("section", vp, [...y[1] || (y[1] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No check-in data available"),
              r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see check-in performance data.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["collapsible", "default-open"]));
  }
}, Wi = /* @__PURE__ */ at(yp, [["__scopeId", "data-v-07c16cf5"]]), _p = {
  key: 0,
  class: "loading-state"
}, xp = {
  key: 1,
  class: "card-body"
}, wp = {
  key: 0,
  class: "sankey-section"
}, Cp = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, $p = { class: "ku:w-full ku:min-w-0" }, Mp = { class: "ku:font-medium ku:whitespace-nowrap" }, Sp = { class: "cell-success" }, Dp = { class: "cell-danger" }, Ap = {
  key: 0,
  class: "reasons-list"
}, Tp = { class: "reason-name" }, Bp = { class: "reason-count" }, Lp = {
  key: 1,
  class: "no-reasons"
}, Fp = {
  key: 2,
  class: "ku:empty-state"
}, Ep = { class: "ku:empty-state-content" }, Pp = { class: "ku:empty-icon-wrapper" }, Ip = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ut(rt(a, "theme")), l = (g) => g == null ? "0" : g.toLocaleString(), c = (g) => {
      const [f, y, x] = g.split("-").map(Number);
      return Pt([f, y - 1, x]).format("MMM DD");
    }, u = (g) => g.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), d = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, h = (g, f) => {
      const y = g || 0, x = f || 0, M = l(y), S = d(y, x);
      return `${M} (${S})`;
    }, p = D(() => ({
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
      const g = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], y = a.failedData?.unrecovered_by_day || [];
      return g.map((M) => {
        const S = f.find(($) => $.date === M.date), C = y.find(($) => $.date === M.date);
        return {
          ...M,
          failed_steps: S?.steps || [],
          unrecovered_count: C?.unrecovered_count || 0
        };
      }).sort((M, S) => new Date(M.date).getTime() - new Date(S.date).getTime());
    }), k = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], m = D(
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
    ), v = D(() => {
      const g = [], f = [], y = /* @__PURE__ */ new Set(), x = (V) => {
        y.has(V) || (g.push({ name: V }), y.add(V));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: g, links: f };
      x("Checkin Init"), x("Booking Retrieval"), x("Booking Retrieved"), x("Completed"), x("Closed with BP");
      const M = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_record_locator_init || 0, C = a.checkinData.total_record_locator_init_abandoned || 0, $ = a.checkinData.total_checkin_pre_init_abandoned_error, L = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = $ != null || L != null, B = T ? Math.max(Number($) || 0, 0) : 0, E = T ? Math.max(Number(L) || 0, 0) : 0, P = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = P != null || N != null, W = Y ? Math.max(Number(P) || 0, 0) : 0, J = Y ? Math.max(Number(N) || 0, 0) : 0, tt = Y ? Math.max(C - W - J, 0) : C, lt = S - C, bt = a.checkinData.total_record_locator_started || 0, kt = a.checkinData.total_record_locator_completed || 0, ct = a.checkinData.total_record_locator_closed || 0, Mt = a.checkinData.total_record_locator_unrecovered || 0;
      if (S > 0) {
        const V = Math.round(S / M * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: S,
          label: `${S.toLocaleString()} (${V}%)`
        });
      }
      const st = M - S;
      if (T) {
        if (E > 0) {
          const V = Math.round(E / M * 100);
          x("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${V}%)`
          });
        }
        if (B > 0) {
          const V = Math.round(B / M * 100);
          x("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${V}%)`
          });
        }
      } else if (st > 0) {
        const V = Math.round(st / M * 100);
        x("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: st,
          label: `${st.toLocaleString()} (${V}%)`
        });
      }
      if (Y) {
        if (W > 0) {
          const V = Math.round(W / M * 100);
          x("Error"), f.push({
            source: "Booking Retrieval",
            target: "Error",
            value: W,
            label: `${W.toLocaleString()} (${V}%)`
          });
        }
        if (J > 0) {
          const V = Math.round(J / M * 100);
          x("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: J,
            label: `${J.toLocaleString()} (${V}%)`
          });
        }
        if (tt > 0) {
          const V = Math.round(tt / M * 100);
          x("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${V}%)`
          });
        }
      } else if (C > 0) {
        const V = Math.round(C / M * 100);
        x("Abandoned (Started)"), f.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${V}%)`
        });
      }
      if (lt > 0) {
        const V = Math.round(lt / M * 100);
        f.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: lt,
          label: `${lt.toLocaleString()} (${V}%)`
        });
      }
      if (kt > 0) {
        const V = Math.round(kt / bt * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: kt,
          label: `${kt.toLocaleString()} (${V}%)`
        });
      }
      if (Mt > 0) {
        x("Errors");
        const V = Math.round(Mt / bt * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: Mt,
          label: `${Mt.toLocaleString()} (${V}%)`
        });
      }
      const Et = bt - (kt + Mt);
      if (Et > 0) {
        const V = Math.round(Et / bt * 100);
        x("Abandoned (Flow)"), f.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Et,
          label: `${Et.toLocaleString()} (${V}%)`
        });
      }
      const At = kt - ct;
      if (At > 0) {
        const V = Math.round(At / bt * 100);
        x("BP Error"), f.push({
          source: "Completed",
          target: "BP Error",
          value: At,
          label: `${At.toLocaleString()} (${V}%)`
        });
      }
      if (ct > 0) {
        const V = Math.round(ct / bt * 100);
        f.push({
          source: "Completed",
          target: "Closed with BP",
          value: ct,
          label: `${ct.toLocaleString()} (${V}%)`
        });
      }
      return { nodes: g, links: f };
    });
    return t({ isDark: i }), (g, f) => (b(), K(ht, {
      class: "checkin-metrics-root ku:h-full ku:min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), w("div", _p, [...f[0] || (f[0] = [
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
        ])])) : (b(), w("div", xp, [
          v.value.nodes.length > 0 ? (b(), w("div", wp, [
            z(Le, {
              data: v.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : O("", !0),
          _.value && _.value.length > 0 ? (b(), w("div", Cp, [
            r("div", $p, [
              z(Qt, {
                columns: k,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: y }) => [
                  r("span", Mp, A(c(String(y.date))), 1)
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
                  r("span", Sp, A(h(y.record_locator_closed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-failed": I(({ row: y }) => [
                  r("span", Dp, A(h(y.unrecovered_count, y.record_locator_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: y }) => [
                  Array.isArray(y.failed_steps) && y.failed_steps.length > 0 ? (b(), w("div", Ap, [
                    (b(!0), w(q, null, et(y.failed_steps, (x) => (b(), w("div", {
                      key: x.step_name,
                      class: "reason-item"
                    }, [
                      r("span", Tp, A(u(x.step_name)) + ":", 1),
                      r("span", Bp, A(x.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), w("div", Lp, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), w("div", Fp, [
            r("div", Ep, [
              r("div", Pp, [
                z(F(Kt), { class: "ku:empty-icon" })
              ]),
              f[1] || (f[1] = r("p", { class: "ku:empty-title" }, "No check-in data available", -1)),
              f[2] || (f[2] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Rp = /* @__PURE__ */ at(Ip, [["__scopeId", "data-v-d0dee1b5"]]), Op = {
  key: 0,
  class: "loading-state"
}, zp = {
  key: 1,
  class: "card-body"
}, Vp = {
  key: 0,
  class: "chart-section"
}, Np = { class: "chart-wrapper" }, jp = {
  key: 1,
  class: "record-locator-daily-section"
}, Wp = { class: "ku:w-full ku:min-w-0" }, Hp = { class: "cell-plain ku:font-medium" }, Yp = { class: "cell-plain ku:text-center" }, Kp = { class: "cell-plain ku:text-center" }, qp = { class: "cell-plain ku:text-center" }, Up = { class: "cell-plain ku:text-center" }, Xp = { class: "cell-plain ku:text-center success-value" }, Gp = { class: "cell-plain ku:text-center failed-value" }, Zp = { class: "cell-plain ku:text-center warning-value" }, Qp = { class: "cell-plain ku:text-center" }, Jp = { class: "cell-plain ku:text-center failed-value" }, tm = {
  key: 2,
  class: "ku:empty-state"
}, em = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ut(rt(a, "theme")), l = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
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
    ], u = [
      { key: "createPayment", label: "Create Payment", align: "center" },
      { key: "failedPayment", label: "Failed Payment", align: "center" }
    ], d = D(
      () => a.isAvianca ? [...c, ...u] : c
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
    ), p = D(() => a.data), _ = D(() => ({
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
    })), k = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, m = (g, f) => {
      const y = U(g), x = k(g, f);
      return `${y} (${x})`;
    }, v = D(() => {
      const g = [], f = [], y = /* @__PURE__ */ new Set(), x = (st) => {
        y.has(st) || (g.push({ name: st }), y.add(st));
      };
      if (!p.value.total_checkin_initiated)
        return { nodes: g, links: f };
      x("Checkin Init"), x("Booking retrive"), x("Checkin Started"), x("Checkin Completed"), x("Checkin Closed");
      const M = p.value.total_checkin_initiated, S = p.value.total_record_locator_init, C = p.value.total_record_locator_started, $ = p.value.total_record_locator_completed, L = p.value.total_record_locator_closed, T = p.value.total_record_locator_failed, B = p.value.total_record_locator_abandoned, E = p.value.total_record_locator_init_abandoned, P = p.value.total_checkin_pre_init_abandoned_error, N = p.value.total_checkin_pre_init_abandoned_voluntary, Y = P != null || N != null, W = Y ? Math.max(Number(P) || 0, 0) : 0, J = Y ? Math.max(Number(N) || 0, 0) : 0, tt = p.value.total_record_locator_init_abandoned_error, lt = p.value.total_record_locator_init_abandoned_voluntary, bt = tt != null || lt != null, kt = bt ? Math.max(Number(tt) || 0, 0) : 0, ct = bt ? Math.max(Number(lt) || 0, 0) : 0;
      if (S > 0) {
        const st = Math.round(S / M * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${st}%)`
        });
      }
      const Mt = M - S;
      if (Y) {
        if (J > 0) {
          const st = Math.round(J / M * 100);
          x("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: J,
            label: `${J.toLocaleString()} (${st}%)`
          });
        }
        if (W > 0) {
          const st = Math.round(W / M * 100);
          x("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: W,
            label: `${W.toLocaleString()} (${st}%)`
          });
        }
      } else if (Mt > 0) {
        const st = Math.round(Mt / M * 100);
        x("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Mt,
          label: `${Mt.toLocaleString()} (${st}%)`
        });
      }
      if (C > 0) {
        const st = Math.round(C / M * 100);
        f.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: C,
          label: `${C.toLocaleString()} (${st}%)`
        });
      }
      if (bt) {
        if (kt > 0) {
          const st = Math.round(kt / M * 100);
          x("Error"), f.push({
            source: "Booking retrive",
            target: "Error",
            value: kt,
            label: `${kt.toLocaleString()} (${st}%)`
          });
        }
        if (ct > 0) {
          const st = Math.round(ct / M * 100);
          x("Abandoned (Started)"), f.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: ct,
            label: `${ct.toLocaleString()} (${st}%)`
          });
        }
      } else if (E > 0) {
        const st = Math.round(E / M * 100);
        x("Abandoned (Started)"), f.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${st}%)`
        });
      }
      if ($ > 0) {
        const st = Math.round($ / C * 100);
        f.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: $,
          label: `${$.toLocaleString()} (${st}%)`
        });
      }
      if (L > 0) {
        const st = Math.round(L / C * 100);
        f.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: L,
          label: `${L.toLocaleString()} (${st}%)`
        });
      }
      if (T > 0) {
        const st = Math.round(T / C * 100);
        x("Checkin Failed"), f.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${st}%)`
        });
      }
      if (B > 0) {
        const st = Math.round(B / C * 100);
        x("Abandoned (Flow)"), f.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${st}%)`
        });
      }
      return { nodes: g, links: f };
    });
    return t({ isDark: i }), (g, f) => (b(), K(ht, {
      class: "record-locator-root ku:h-full ku:min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), w("div", Op, [...f[0] || (f[0] = [
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
        ])])) : (b(), w("div", zp, [
          v.value.nodes.length > 0 ? (b(), w("section", Vp, [
            r("div", Np, [
              z(Le, {
                data: v.value,
                height: "500px",
                "node-colors": _.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), w("section", jp, [
            r("div", Wp, [
              z(Qt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: y }) => [
                  r("span", Hp, A(F(Pt)(String(y.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: y }) => [
                  r("span", Yp, A(F(U)(y.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: y }) => [
                  r("span", Kp, A(m(y.record_locator_init_count, y.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": I(({ row: y }) => [
                  r("span", qp, A(F(U)(y.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": I(({ row: y }) => [
                  r("span", Up, A(m(y.record_locator_completed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": I(({ row: y }) => [
                  r("span", Xp, A(m(y.record_locator_closed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": I(({ row: y }) => [
                  r("span", Gp, A(m(y.record_locator_failed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": I(({ row: y }) => [
                  r("span", Zp, A(m(y.record_locator_abandoned_count, y.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": I(({ row: y }) => [
                  r("span", Qp, A(F(U)(y.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": I(({ row: y }) => [
                  r("span", Jp, A(F(U)(y.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (b(), w("section", tm, [...f[1] || (f[1] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No record locator data available"),
              r("p", { class: "ku:empty-description" }, "No record locator data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["collapsible"]));
  }
}), Hi = /* @__PURE__ */ at(em, [["__scopeId", "data-v-2f532bb2"]]), nm = {
  key: 0,
  class: "loading-state"
}, am = {
  key: 1,
  class: "card-body"
}, sm = {
  key: 0,
  class: "checkin-segments-daily-section"
}, om = { class: "ku:w-full ku:min-w-0" }, im = { class: "segment-plain" }, lm = { class: "segment-plain" }, rm = { class: "segment-plain" }, cm = { class: "percentage-value" }, um = { class: "percentage-value" }, dm = { class: "percentage-value success" }, hm = {
  key: 1,
  class: "ku:empty-state"
}, fm = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ut(rt(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], c = D(
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
    ), u = (p, _) => !_ || _ === 0 || !p ? "0%" : `${Math.round(p / _ * 100)}%`, d = (p) => !p || p === "None" ? "-" : String(p).trim().replace(/_[0-9]+$/i, ""), h = (p) => {
      const _ = d(p?.departure_airport), k = d(p?.arrival_airport);
      return _ === "-" || k === "-" ? !1 : _ === k;
    };
    return t({ isDark: i }), (p, _) => (b(), K(ht, {
      class: "checkin-segments-root ku:h-full ku:min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), w("div", nm, [..._[0] || (_[0] = [
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
        ])])) : (b(), w("div", am, [
          a.data.length > 0 ? (b(), w("section", sm, [
            r("div", om, [
              z(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": I(({ row: k }) => [
                  r("span", im, A(d(k.departure_airport)), 1)
                ]),
                "cell-connection": I(({ row: k }) => [
                  r("span", {
                    class: H(["segment-plain", {
                      "segment-plain--muted": d(k.conexion_airport) === "-"
                    }])
                  }, A(d(k.conexion_airport)), 3)
                ]),
                "cell-arrival": I(({ row: k }) => [
                  r("span", lm, A(d(k.arrival_airport)), 1)
                ]),
                "cell-trip": I(({ row: k }) => [
                  r("span", rm, A(h(k) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": I(({ row: k }) => [
                  vt(A(F(U)(k.segment_init_count)), 1)
                ]),
                "cell-started": I(({ row: k }) => [
                  r("span", cm, A(u(k.segment_started_count, k.segment_init_count)), 1)
                ]),
                "cell-completed": I(({ row: k }) => [
                  r("span", um, A(u(k.segment_completed_count, k.segment_init_count)), 1)
                ]),
                "cell-closed": I(({ row: k }) => [
                  r("span", dm, A(u(k.segment_closed_count, k.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), w("section", hm, [..._[1] || (_[1] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No segment data available"),
              r("p", { class: "ku:empty-description" }, "No flight segment data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }, 8, ["collapsible", "default-open"]));
  }
}), Yi = /* @__PURE__ */ at(fm, [["__scopeId", "data-v-fab2e0b2"]]), gm = { class: "checkin-container__body" }, km = /* @__PURE__ */ Q({
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
    function c(h, p) {
      a("export", { source: h, format: p });
    }
    function u(h) {
      return typeof h == "object" && h !== null && "source" in h;
    }
    function d(h) {
      if (u(h)) {
        a("export", h);
        return;
      }
      c("checkinSegments", h);
    }
    return (h, p) => (b(), K(ht, {
      class: "checkin-container-root ku:w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", gm, [
          e.showCheckin ? (b(), K(Wi, {
            key: 0,
            class: "ku:w-full ku:min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[0] || (p[0] = (_) => c("checkin", _))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : O("", !0),
          z(Hi, {
            collapsible: !1,
            loading: o.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[1] || (p[1] = (_) => c("recordLocator", _))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          z(Yi, {
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
    }, 8, ["default-open"]));
  }
}), pm = /* @__PURE__ */ at(km, [["__scopeId", "data-v-3f7bc17d"]]), mm = {
  key: 0,
  class: "loading-state"
}, bm = {
  key: 1,
  class: "card-body"
}, vm = { class: "chart-section" }, ym = { class: "chart-wrapper" }, _m = {
  key: 1,
  class: "ku:empty-chart"
}, xm = { class: "payment-success-summary" }, wm = {
  key: 0,
  class: "disruption-daily-section"
}, Cm = { class: "ku:w-full ku:min-w-0" }, $m = { class: "ku:font-medium ku:text-center" }, Mm = { class: "ku:text-center" }, Sm = { class: "ku:text-center" }, Dm = { class: "percentage-text" }, Am = { class: "ku:text-center" }, Tm = { class: "abandoned-value" }, Bm = { class: "badges-container badges-wrap" }, Lm = { class: "badges-container badges-wrap" }, Fm = {
  key: 1,
  class: "ku:empty-state"
}, Em = /* @__PURE__ */ Q({
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
    ), u = D(() => a.data?.total_payment_success || []), d = D(() => {
      const g = u.value;
      return g.length === 0 ? p(0) : g.map((f) => `${f.currency} ${p(f.total_value)}`).join(" · ");
    }), h = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, p = (g) => _t(g), _ = (g) => (g ?? []).reduce((f, y) => f + (y.count ?? 0), 0), k = (g) => typeof g.sell_success_count == "number" ? g.sell_success_count : _(g.payment_success_total), m = D(() => {
      const g = a.data, f = g.total_disruption_conversations || 0, y = g.total_disruption_initiated || 0, x = g.total_voluntary || 0, M = g.total_involuntary || 0, S = g.total_accepted || 0, C = g.total_confirmed || 0, $ = typeof g.total_sell_success == "number" ? g.total_sell_success : _(g.total_payment_success), L = g.total_sell_failed || 0, T = Math.max(0, f - y), B = Math.max(0, y - x - M), E = Math.max(0, M - S), P = Math.max(0, x - C), N = L, Y = Math.max(0, C - $ - N), W = (lt, bt) => {
        const kt = bt > 0 ? Math.round(lt / bt * 100) : 0;
        return `${lt.toLocaleString()} (${kt}%)`;
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
      return y > 0 && tt.push({
        source: "Initiated",
        target: "Started",
        value: y,
        label: W(y, f)
      }), T > 0 && tt.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: W(T, f)
      }), x > 0 && tt.push({
        source: "Started",
        target: "Voluntary",
        value: x,
        label: W(x, f)
      }), M > 0 && tt.push({
        source: "Started",
        target: "Involuntary",
        value: M,
        label: W(M, f)
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
      }), C > 0 && tt.push({
        source: "Voluntary",
        target: "Confirmed",
        value: C,
        label: W(C, f)
      }), P > 0 && tt.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: W(P, f)
      }), $ > 0 && tt.push({
        source: "Confirmed",
        target: "Paid",
        value: $,
        label: W($, f)
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
    return (g, f) => (b(), K(ht, {
      class: "disruption-metrics-root ku:h-full ku:min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), w("div", mm, [...f[0] || (f[0] = [
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
        ])])) : (b(), w("div", bm, [
          r("section", vm, [
            r("div", ym, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (b(), K(Le, {
                key: 0,
                data: m.value,
                "node-colors": v,
                height: "500px"
              }, null, 8, ["data"])) : (b(), w("div", _m, [...f[1] || (f[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", xm, [
            z(ot, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (b(), w("section", wm, [
            f[2] || (f[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Cm, [
              z(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: y }) => [
                  r("span", $m, A(F(Pt)(String(y.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: y }) => [
                  r("span", Mm, A(F(U)(Number(y.disruption_conversations))), 1)
                ]),
                "cell-started": I(({ row: y }) => [
                  r("span", Sm, [
                    vt(A(F(U)(Number(y.disruption_initiated_count))) + " ", 1),
                    r("span", Dm, " (" + A(h(Number(y.disruption_initiated_count), Number(y.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": I(({ row: y }) => [
                  r("span", Am, [
                    r("span", Tm, A(F(U)(Number(y.disruption_initiated_count) - Number(y.voluntary_count) - Number(y.involuntary_count))) + " (" + A(h(Number(y.disruption_initiated_count) - Number(y.voluntary_count) - Number(y.involuntary_count), Number(y.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": I(({ row: y }) => [
                  r("div", Bm, [
                    (b(!0), w(q, null, et([y], (x, M) => (b(), w(q, { key: M }, [
                      z(Nt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: I(() => [
                          vt(" VOL " + A(F(U)(x.voluntary_count)) + " (" + A(h(x.voluntary_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "success" }, {
                        default: I(() => [
                          vt(" Confirm " + A(F(U)(x.confirmed_count)) + " (" + A(h(x.confirmed_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "warning" }, {
                        default: I(() => [
                          vt(" Not Confirm " + A(F(U)(x.voluntary_count - x.confirmed_count)) + " (" + A(h(x.voluntary_count - x.confirmed_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "danger" }, {
                        default: I(() => [
                          vt(" Reject " + A(F(U)(x.sell_failed_count)) + " (" + A(h(x.sell_failed_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "orange" }, {
                        default: I(() => [
                          vt(" Not Paid " + A(F(U)(Math.max(0, x.confirmed_count - k(x) - x.sell_failed_count))) + " (" + A(h(Math.max(0, x.confirmed_count - k(x) - x.sell_failed_count), x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: I(() => [
                          vt(" Finish " + A(F(U)(k(x))) + " (" + A(h(k(x), x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (b(!0), w(q, null, et(x.payment_success_total || [], (S) => (b(), K(Nt, {
                        key: `${x.date}-${S.currency}`,
                        color: "neutral"
                      }, {
                        default: I(() => [
                          vt(A(S.currency) + " " + A(p(S.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": I(({ row: y }) => [
                  r("div", Lm, [
                    (b(!0), w(q, null, et([y], (x, M) => (b(), w(q, { key: M }, [
                      z(Nt, { color: "purple" }, {
                        default: I(() => [
                          vt(" INV " + A(F(U)(x.involuntary_count)) + " (" + A(h(x.involuntary_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "danger" }, {
                        default: I(() => [
                          vt(" Human " + A(F(U)(x.involuntary_count - x.accepted_count)) + " (" + A(h(x.involuntary_count - x.accepted_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Nt, { color: "success" }, {
                        default: I(() => [
                          vt(" Accept " + A(F(U)(x.accepted_count)) + " (" + A(h(x.accepted_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), w("section", Fm, [...f[3] || (f[3] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No disruption data available"),
              r("p", { class: "ku:empty-description" }, "No disruption data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }));
  }
}), Pm = /* @__PURE__ */ at(Em, [["__scopeId", "data-v-04323e4d"]]), Im = {
  key: 0,
  class: "ku:flex ku:min-h-[380px] ku:flex-1 ku:flex-col ku:items-center ku:justify-center ku:px-4"
}, Rm = { class: "ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5" }, Om = {
  key: 0,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-3"
}, zm = { class: "chart-line-area ku:flex ku:h-[230px] ku:w-full ku:min-w-0 ku:shrink-0 ku:flex-col ku:overflow-hidden" }, Vm = {
  key: 1,
  class: "ku:flex ku:min-h-[280px] ku:flex-1 ku:items-center ku:justify-center"
}, Nm = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "ku:delay-100", "ku:delay-200", "ku:delay-300", "ku:delay-[400ms]"], o = e, i = n, l = (v) => {
      i("export", v);
    }, c = rt(o, "theme"), { isDark: u } = ut(c), d = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = nt({ labels: [], datasets: [] }), p = D(
      () => o.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), _ = D(() => {
      const v = p.value, g = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, f = (M) => g > 0 ? (M / g * 100).toFixed(1) : "0.0", y = v.total_faq_events, x = y > 0 ? `${(v.total_documents_found / y * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: d.airline_information,
          value: `${f(v.total_airline_information_retrieved)}%`,
          subvalue: `${U(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: d.booking_info,
          value: `${f(v.total_booking_info_retrieved)}%`,
          subvalue: `${U(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: d.flight_status,
          value: `${f(v.total_flight_status_retrieved)}%`,
          subvalue: `${U(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: U(v.total_documents_found),
          subvalue: x
        }
      ];
    }), k = D(() => {
      const v = _.value.length;
      return v <= 1 ? "ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:gap-4" : v === 2 ? "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:gap-4" : v === 3 ? "ku:grid ku:w-full ku:grid-cols-3 ku:gap-3 ku:sm:gap-4" : "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:grid-cols-4 ku:sm:gap-4";
    }), m = (v) => {
      if (!v) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const g = v.faq_by_day || [];
      if (g.length > 0) {
        const f = g.map((S) => Pt(S.date).format("MMM DD")), y = g.map((S) => S.airline_information_retrieved_count || 0), x = g.map((S) => S.flight_status_retrieved_count || 0), M = g.map((S) => S.booking_info_retrieved_count || 0);
        h.value = {
          labels: f,
          datasets: [
            {
              label: "Airline Information",
              data: y,
              borderColor: d.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: x,
              borderColor: d.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: M,
              borderColor: d.booking_info,
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
      (v) => {
        m(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: u }), (v, g) => (b(), K(ht, {
      class: "ku:w-full ku:min-h-0 ku:self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: H(["ku:flex ku:min-h-0 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "ku:flex-1" : "ku:w-full ku:shrink-0"])
        }, [
          o.loading ? (b(), w("div", Im, [
            r("div", Rm, [
              (b(), w(q, null, et(a, (f, y) => r("div", {
                key: y,
                class: H(["ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300", s[y]]),
                style: gt({ height: `${f}%` })
              }, null, 6)), 64))
            ]),
            g[0] || (g[0] = r("p", { class: "ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (b(), w(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), w("section", Om, [
              r("div", zm, [
                z(be, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", {
                class: H(k.value)
              }, [
                (b(!0), w(q, null, et(_.value, (f) => (b(), K(ot, {
                  key: f.name,
                  color: f.color,
                  title: f.label,
                  value: f.value,
                  subvalue: f.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : (b(), w("section", Vm, [...g[1] || (g[1] = [
              r("div", { class: "ku:max-w-[360px] ku:px-4 ku:text-center" }, [
                r("div", { class: "ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] ku:shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                  r("svg", {
                    class: "ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]",
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
                r("p", { class: "ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                r("p", { class: "ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), jm = /* @__PURE__ */ at(Nm, [["__scopeId", "data-v-35812ad7"]]), Wm = {
  key: 0,
  class: "ku:flex ku:min-h-[380px] ku:flex-1 ku:flex-col ku:items-center ku:justify-center ku:px-4"
}, Hm = { class: "ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5" }, Ym = {
  key: 0,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-3"
}, Km = { class: "chart-line-area ku:flex ku:h-[230px] ku:w-full ku:min-w-0 ku:shrink-0 ku:flex-col ku:overflow-hidden" }, qm = {
  key: 1,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-4 ku:sm:gap-6"
}, Um = {
  key: 2,
  class: "ku:flex ku:min-h-[280px] ku:flex-1 ku:items-center ku:justify-center"
}, Xm = { class: "ku:max-w-[360px] ku:px-4 ku:text-center" }, Gm = { class: "ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] ku:shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Zm = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "ku:delay-100", "ku:delay-200", "ku:delay-300", "ku:delay-[400ms]"], o = {
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
    }, u = rt(i, "theme"), { isDark: d } = ut(u), h = D(() => {
      const m = i.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const x of Object.values(m))
        for (const M of Object.keys(x))
          g.add(M);
      const y = Array.from(g).map((x) => {
        const M = x.toLowerCase(), S = o[M] || o[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: v.map((C) => m[C]?.[x] || 0),
          borderColor: S
        };
      });
      return {
        labels: v.map((x) => Pt(x).format("MMM DD")),
        datasets: y
      };
    }), p = D(() => {
      const m = i.data?.agents_by_day || {}, v = {};
      for (const f of Object.values(m))
        for (const [y, x] of Object.entries(f))
          v[y] = (v[y] || 0) + x;
      const g = Object.values(v).reduce((f, y) => f + y, 0);
      return g === 0 ? [] : Object.entries(v).sort(([, f], [, y]) => y - f).map(([f, y]) => {
        const x = f.toLowerCase();
        return {
          name: f,
          label: f.charAt(0).toUpperCase() + f.slice(1).replace(/_/g, " "),
          total: y,
          percentage: (y / g * 100).toFixed(1),
          color: o[x] || o[f] || "#94a3b8"
        };
      });
    }), _ = D(() => p.value.slice(0, 4)), k = D(() => {
      const m = _.value.length;
      return m <= 1 ? "ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:gap-4" : m === 2 ? "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:gap-4" : m === 3 ? "ku:grid ku:w-full ku:grid-cols-3 ku:gap-3 ku:sm:gap-4" : "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:grid-cols-4 ku:sm:gap-4";
    });
    return t({ isDark: d }), (m, v) => (b(), K(ht, {
      class: "ku:w-full ku:min-h-0 ku:self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !i.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: c
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: H(["ku:flex ku:min-h-0 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "ku:flex-1" : "ku:w-full ku:shrink-0"])
        }, [
          i.loading ? (b(), w("div", Wm, [
            r("div", Hm, [
              (b(), w(q, null, et(a, (g, f) => r("div", {
                key: f,
                class: H(["ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300", s[f]]),
                style: gt({ height: `${g}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (b(), w(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), w("section", Ym, [
              r("div", Km, [
                z(be, {
                  data: h.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              _.value.length ? (b(), w("div", {
                key: 0,
                class: H(k.value)
              }, [
                (b(!0), w(q, null, et(_.value, (g) => (b(), K(ot, {
                  key: g.name,
                  color: g.color,
                  title: g.label,
                  value: `${g.percentage}%`,
                  subvalue: `${F(U)(g.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : O("", !0)
            ])) : p.value.length ? (b(), w("section", qm, [
              r("div", {
                class: H(k.value)
              }, [
                (b(!0), w(q, null, et(_.value, (g) => (b(), K(ot, {
                  key: g.name,
                  color: g.color,
                  title: g.label,
                  value: `${g.percentage}%`,
                  subvalue: `${F(U)(g.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : O("", !0),
            p.value.length ? O("", !0) : (b(), w("section", Um, [
              r("div", Xm, [
                r("div", Gm, [
                  z(F(Kt), { class: "ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[1] || (v[1] = r("p", { class: "ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                v[2] || (v[2] = r("p", { class: "ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), Qm = /* @__PURE__ */ at(Zm, [["__scopeId", "data-v-bc35dae0"]]), Jm = {
  key: 0,
  class: "loading-state"
}, t0 = {
  key: 1,
  class: "card-body"
}, e0 = {
  key: 0,
  class: "chart-section"
}, n0 = {
  key: 1,
  class: "ku:empty-state"
}, a0 = {
  key: 2,
  class: "comparison-section"
}, s0 = { class: "comparison-grid" }, o0 = /* @__PURE__ */ Q({
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
    }, s = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = n, l = (k) => {
      i("export", k);
    }, { isDark: c } = ut(rt(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const u = D(() => {
      const k = /* @__PURE__ */ new Set();
      for (const m of o.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(m.channels))
          k.add(v);
      return Array.from(k).sort();
    }), d = (k, m) => a[k.toLowerCase()] ?? s[m % s.length];
    function h(k) {
      return k.replace(/_/g, " ").toUpperCase();
    }
    function p(k) {
      if (k.delta === null) return "No previous data";
      const m = U(k.previous), v = `${Math.abs(k.delta).toFixed(1)}%`;
      return k.delta === 0 ? `0.0% vs prev. period (${m})` : `${k.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${m})`;
    }
    const _ = D(() => {
      const k = o.data?.sales_by_channel_by_day ?? [];
      if (k.length === 0) return { labels: [], datasets: [] };
      const m = k.map((g) => Pt(g.date).format("MMM-DD")), v = u.value.map((g, f) => ({
        label: g,
        data: k.map((y) => y.channels[g] ?? 0),
        backgroundColor: d(g, f),
        borderRadius: 4
      }));
      return { labels: m, datasets: v };
    });
    return t({ isDark: c }), (k, m) => (b(), K(ht, {
      class: "sales-channel-root ku:h-full ku:min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (b(), w("div", Jm, [...m[0] || (m[0] = [
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
        ])])) : (b(), w("div", t0, [
          _.value.labels.length > 0 ? (b(), w("section", e0, [
            z(pe, {
              data: _.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (b(), w("section", n0, [...m[1] || (m[1] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No sales data available"),
              r("p", { class: "ku:empty-description" }, "No sales by channel data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])])),
          e.channelComparison.length > 0 ? (b(), w("section", a0, [
            r("div", s0, [
              (b(!0), w(q, null, et(e.channelComparison, (v, g) => (b(), K(F(ot), {
                key: v.channel,
                color: d(v.channel, g),
                title: h(v.channel),
                value: F(U)(v.current),
                subvalue: p(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Ki = /* @__PURE__ */ at(o0, [["__scopeId", "data-v-88fefbd1"]]), i0 = {
  key: 0,
  class: "loading-state"
}, l0 = {
  key: 1,
  class: "card-body"
}, r0 = {
  key: 0,
  class: "chart-section"
}, c0 = { class: "chart-wrapper" }, u0 = {
  key: 1,
  class: "ku:empty-state"
}, d0 = { class: "seller-value-cards" }, h0 = {
  key: 2,
  class: "seller-daily-section"
}, f0 = { class: "ku:w-full ku:min-w-0" }, g0 = { class: "sl-cell ku:font-medium" }, k0 = { class: "sl-cell ku:text-center" }, p0 = { class: "sl-cell ku:text-center" }, m0 = { class: "sl-cell ku:text-center" }, b0 = { class: "sl-cell ku:text-center" }, v0 = { class: "sl-cell ku:text-center" }, y0 = { class: "sl-cell ku:text-center success-value" }, _0 = {
  key: 0,
  class: "currency-cell-list"
}, x0 = {
  key: 1,
  class: "ku:empty-cell"
}, w0 = { class: "sl-cell ku:text-center success-value" }, C0 = { class: "sl-cell ku:text-center" }, $0 = { class: "sl-cell ku:text-center success-value" }, M0 = {
  key: 0,
  class: "currency-cell-list"
}, S0 = {
  key: 1,
  class: "ku:empty-cell"
}, D0 = { class: "sl-cell ku:text-center success-value" }, A0 = { class: "sl-cell ku:text-center" }, T0 = { class: "sl-cell ku:text-center success-value" }, B0 = {
  key: 0,
  class: "currency-cell-list"
}, L0 = { key: 1 }, F0 = {
  key: 0,
  class: "failed-reasons"
}, E0 = { class: "reason-name" }, P0 = { class: "reason-count" }, I0 = {
  key: 1,
  class: "ku:empty-cell"
}, R0 = /* @__PURE__ */ Q({
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
    }, { isDark: l } = ut(rt(s, "theme")), c = D(() => {
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
    }), u = [
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
    ], d = D(
      () => c.value.map((B) => ({
        id: B.date,
        ...B
      }))
    ), h = D(() => s.sellerData), p = D(() => s.failedData), _ = D(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), k = D(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), m = D(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), v = D(() => {
      const B = _.value;
      return B.length > 0 ? B.map((E) => `${E.currency} ${we(E.total_value)}`).join(" · ") : T(s.sellerData.total_value_sell_success);
    });
    function g(B) {
      return B.length > 0 ? B.map((E) => `${E.currency} ${we(E.total_value)}`).join(" · ") : "—";
    }
    const f = D(
      () => g(k.value)
    ), y = D(
      () => g(m.value)
    ), x = D(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: E = 0,
        total_sell_booking_created: P = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: W = 0,
        total_sell_success_bank_transfer: J = 0,
        total_sell_success_cash: tt = 0
      } = h.value, { failed_by_reason_by_day: lt = [] } = p.value;
      if (B === 0) return { nodes: [], links: [] };
      const bt = Math.max(0, N - (J ?? 0) - (tt ?? 0)), kt = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: E },
        { name: "Booking Created", value: P },
        { name: "Sell Success", value: bt }
      ], ct = [], Mt = B - E;
      if (Mt > 0) {
        const V = Math.round(Mt / B * 100);
        kt.push({ name: "Abandoned (Init)", value: Mt }), ct.push({
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
        const it = Z.reason, pt = Z.failed_count;
        V[it] = (V[it] || 0) + pt;
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
        kt.push({ name: "Bank Transfer", value: Y }), ct.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: Y,
          label: `${Y.toLocaleString()} (${V}%)`
        });
      }
      if (W > 0) {
        const V = Math.round(W / B * 100);
        kt.push({ name: "Cash Option", value: W }), ct.push({
          source: "Booking Created",
          target: "Cash Option",
          value: W,
          label: `${W.toLocaleString()} (${V}%)`
        });
      }
      if (bt > 0) {
        const V = Math.round(bt / B * 100);
        ct.push({
          source: "Booking Created",
          target: "Sell Success",
          value: bt,
          label: `${bt.toLocaleString()} (${V}%)`
        });
      }
      if ((J ?? 0) > 0) {
        const V = Math.round((J ?? 0) / B * 100);
        kt.push({ name: "Bank Transfer Success", value: J ?? 0 }), ct.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: J ?? 0,
          label: `${(J ?? 0).toLocaleString()} (${V}%)`
        });
      }
      if ((tt ?? 0) > 0) {
        const V = Math.round((tt ?? 0) / B * 100);
        kt.push({ name: "Cash Option Success", value: tt ?? 0 }), ct.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: tt ?? 0,
          label: `${(tt ?? 0).toLocaleString()} (${V}%)`
        });
      }
      const Et = P - bt - Y - W;
      if (Et > 0) {
        const V = Math.round(Et / B * 100);
        kt.push({ name: "Failed at Completion", value: Et }), ct.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Et,
          label: `${Et.toLocaleString()} (${V}%)`
        });
      }
      const At = E - P;
      if (At > 0) {
        const V = Math.round(At / B * 100);
        kt.push({ name: "Failed at Booking", value: At }), ct.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: At,
          label: `${At.toLocaleString()} (${V}%)`
        });
      }
      if (Object.keys(st).length > 0) {
        const V = Object.values(st).reduce((Z, it) => Z + it, 0), G = At - V;
        if (Object.entries(st).filter(([, Z]) => Z > 0).sort(([, Z], [, it]) => it - Z).forEach(([Z, it]) => {
          const pt = Math.round(it / B * 100);
          kt.push({ name: `Failed: ${Z}`, value: it }), ct.push({
            source: "Failed at Booking",
            target: `Failed: ${Z}`,
            value: it,
            label: `${it.toLocaleString()} (${pt}%)`
          });
        }), G > 0) {
          const Z = Math.round(G / B * 100);
          kt.push({ name: "ku:Failed: Without Reason", value: G }), ct.push({
            source: "Failed at Booking",
            target: "ku:Failed: Without Reason",
            value: G,
            label: `${G.toLocaleString()} (${Z}%)`
          });
        }
      }
      return { nodes: kt, links: ct };
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
      "ku:Failed: rejected": "#F87171",
      "ku:Failed: payment_processing": "#EF4444",
      "ku:Failed: seat_selection": "#F87171",
      "ku:Failed: booking_validation": "#EF4444",
      "ku:Failed: flight_availability": "#DC2626",
      "ku:Failed: passenger_data": "#F87171",
      "ku:Failed: system_error": "#DC2626",
      "ku:Failed: timeout": "#EF4444",
      "ku:Failed: Without Reason": "#F87171"
    }, S = D(() => M), C = (B, E) => !E || E === 0 ? "0%" : `${Math.round(B / E * 100)}%`, $ = (B, E) => {
      const P = U(B), N = C(B, E);
      return `${P} (${N})`;
    }, L = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((E, P) => E + (P.total_value || 0), 0) : 0, T = (B) => we(L(B));
    return t({ isDark: l }), (B, E) => (b(), K(ht, {
      class: "seller-metrics-root ku:h-full ku:min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: I(() => [
        e.enableExport && !s.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        s.loading ? (b(), w("div", i0, [...E[0] || (E[0] = [
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
        ])])) : (b(), w("div", l0, [
          x.value.nodes.length > 0 ? (b(), w("section", r0, [
            r("div", c0, [
              z(Le, {
                data: x.value,
                "node-colors": S.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (b(), w("section", u0, [...E[1] || (E[1] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No sales data available"),
              r("p", { class: "ku:empty-description" }, "No sales data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])])),
          r("section", d0, [
            z(ot, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
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
              value: y.value
            }, null, 8, ["value"])
          ]),
          c.value && c.value.length > 0 ? (b(), w("section", h0, [
            r("div", f0, [
              z(Qt, {
                columns: u,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: P }) => [
                  r("span", g0, A(F(Pt)(String(P.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": I(({ row: P }) => [
                  r("span", k0, A(F(U)(Number(P.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": I(({ row: P }) => [
                  r("span", p0, A($(P.sell_started_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-getQuote": I(({ row: P }) => [
                  r("span", m0, A($(P.sell_get_quote_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": I(({ row: P }) => [
                  r("span", b0, A($(P.sell_booking_created_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": I(({ row: P }) => [
                  r("span", v0, A(F(U)(Number(P.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": I(({ row: P }) => [
                  r("span", y0, [
                    Array.isArray(P.daily_value_sell_success_bank_transfer) && P.daily_value_sell_success_bank_transfer.length > 0 ? (b(), w("div", _0, [
                      (b(!0), w(q, null, et(P.daily_value_sell_success_bank_transfer, (N) => (b(), w("span", {
                        key: `${P.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(we)(N.total_value)), 1))), 128))
                    ])) : (b(), w("span", x0, "-"))
                  ])
                ]),
                "cell-btSuccess": I(({ row: P }) => [
                  r("span", w0, A(F(U)(Number(P.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": I(({ row: P }) => [
                  r("span", C0, A(F(U)(Number(P.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": I(({ row: P }) => [
                  r("span", $0, [
                    Array.isArray(P.daily_value_sell_success_cash) && P.daily_value_sell_success_cash.length > 0 ? (b(), w("div", M0, [
                      (b(!0), w(q, null, et(P.daily_value_sell_success_cash, (N) => (b(), w("span", {
                        key: `${P.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(we)(N.total_value)), 1))), 128))
                    ])) : (b(), w("span", S0, "-"))
                  ])
                ]),
                "cell-cashSuccess": I(({ row: P }) => [
                  r("span", D0, A(F(U)(Number(P.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": I(({ row: P }) => [
                  r("span", A0, A($(P.sell_success_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": I(({ row: P }) => [
                  r("span", T0, [
                    Array.isArray(P.daily_value_sell_success) && P.daily_value_sell_success.length > 0 ? (b(), w("div", B0, [
                      (b(!0), w(q, null, et(P.daily_value_sell_success, (N) => (b(), w("span", {
                        key: `${P.date}-${N.currency}`
                      }, A(N.currency) + " " + A(F(we)(N.total_value)), 1))), 128))
                    ])) : (b(), w("span", L0, A(T(P.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": I(({ row: P }) => [
                  (P.reasons || []).length > 0 ? (b(), w("div", F0, [
                    (b(!0), w(q, null, et(P.reasons || [], (N) => (b(), w("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", E0, A(N.reason) + ":", 1),
                      r("span", P0, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), w("div", I0, "-"))
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
}), qi = /* @__PURE__ */ at(R0, [["__scopeId", "data-v-29e3c7b6"]]), O0 = { class: "seller-container__body" }, z0 = /* @__PURE__ */ Q({
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
    function c(u, d) {
      a("export", { source: u, format: d });
    }
    return (u, d) => (b(), K(ht, {
      class: "seller-container-root ku:w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", O0, [
          z(qi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => c("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          z(Ki, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: d[1] || (d[1] = (h) => c("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), V0 = /* @__PURE__ */ at(z0, [["__scopeId", "data-v-0d48410a"]]), N0 = {
  key: 0,
  class: "card-body"
}, j0 = {
  key: 0,
  class: "chart-section"
}, W0 = {
  key: 1,
  class: "ku:empty-state"
}, H0 = { class: "ku:empty-state-content" }, Y0 = { class: "ku:empty-icon-wrapper" }, K0 = {
  key: 1,
  class: "loading-state"
}, q0 = /* @__PURE__ */ Q({
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
    }, { isDark: l, colors: c } = ut(rt(s, "theme")), u = D(() => {
      const p = (s.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const _ = p.reduce(
        (v, g) => v + (Number(g.conversations) || 0),
        0
      ), k = p.map((v) => {
        const g = v.agent_type?.toLowerCase();
        return a[g] || "#94a3b8";
      }), m = k.map((v) => `${v}80`);
      return {
        labels: p.map((v) => {
          const g = Number(v.conversations) || 0, f = _ ? g / _ * 100 : 0;
          return `${v.agent_type} - ${g.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((v) => v.conversations),
            backgroundColor: m,
            borderColor: k,
            borderWidth: 2
          }
        ]
      };
    }), d = D(() => s.options ? s.options : {
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
              const p = (h.label || "").toString().split(" - ")[0], _ = Number(h.parsed) || 0, k = (h.dataset.data || []).reduce(
                (v, g) => v + (Number(g) || 0),
                0
              ), m = k ? _ / k * 100 : 0;
              return `${p}: ${_.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, p) => (b(), K(ht, {
      class: "ku:top-agents-root ku:h-full ku:min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), w("div", K0, [...p[2] || (p[2] = [
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
        ])])) : (b(), w("div", N0, [
          u.value.labels && u.value.labels.length ? (b(), w("section", j0, [
            z(ia, {
              data: u.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (b(), w("section", W0, [
            r("div", H0, [
              r("div", Y0, [
                z(F(ik), { class: "ku:empty-icon" })
              ]),
              p[0] || (p[0] = r("p", { class: "ku:empty-title" }, "No top agents data", -1)),
              p[1] || (p[1] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }));
  }
}), U0 = /* @__PURE__ */ at(q0, [["__scopeId", "data-v-b3ca85fa"]]), X0 = {
  key: 0,
  class: "loading-state"
}, G0 = {
  key: 1,
  class: "card-body"
}, Z0 = {
  key: 0,
  class: "payment-methods-section"
}, Q0 = { class: "payment-methods-grid" }, J0 = {
  key: 1,
  class: "ku:empty-state"
}, tb = { class: "ku:empty-state-content" }, eb = { class: "ku:empty-icon-wrapper" }, nb = {
  key: 2,
  class: "payment-method-daily-section"
}, ab = { class: "ku:w-full ku:min-w-0" }, sb = { class: "ku:font-medium" }, ob = { class: "ku:text-center" }, ib = { class: "ku:text-center success-value" }, lb = {
  key: 0,
  class: "currency-cell-list"
}, rb = { class: "payment-tags" }, cb = { class: "tag-name" }, ub = {
  key: 0,
  class: "tag-amount"
}, db = {
  key: 1,
  class: "tag-amount"
}, hb = { class: "tag-count" }, fb = {
  key: 3,
  class: "ku:empty-table-state"
}, gb = "Not Registered", kb = /* @__PURE__ */ Q({
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
    const a = e, s = n, { isDark: o } = ut(rt(a, "theme")), i = nt(!1), l = nt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), c = D(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), u = D(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = D(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((C, $) => Pt(C.date).valueOf() - Pt($.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], p = D(
      () => d.value.map((C) => ({
        id: C.date,
        date: C.date,
        total_count: C.total_count,
        total_amount: C.total_amount,
        total_amount_by_currency: C.total_amount_by_currency,
        payment_methods: C.payment_methods
      }))
    ), _ = (C) => {
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
    }, k = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [C, $] = a.dates.map((T) => Pt(T).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, C, $);
          l.value = _(L);
        } catch (C) {
          console.error("Error fetching payment method ku:metrics:", C), l.value = _(null);
        } finally {
          i.value = !1;
        }
      }
    }, m = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], v = (C) => !C || C.toLowerCase() === "unknown" ? gb : C.replace(/_/g, " "), g = (C) => C == null ? "$0.00" : _t(C), f = (C) => {
      const $ = C.total_amount_by_currency;
      return $ && $.length > 0 ? $.map((L) => `${L.currency} ${g(L.total_value)}`).join(" · ") : g(C.total_amount);
    }, y = (C) => C ? Pt(C).format("MMM DD") : "-", x = (C) => C == null || Number.isNaN(Number(C)) ? 0 : Number(C), M = (C) => {
      s("export", C);
    };
    function S() {
      const C = a.data;
      C && (Array.isArray(C.payment_method_breakdown) && C.payment_method_breakdown.length > 0 || Array.isArray(C.payment_method_by_day) && C.payment_method_by_day.length > 0) && (i.value = !1, l.value = _(C));
    }
    return oe(() => {
      a.data ? S() : k();
    }), It(
      () => a.data,
      (C) => {
        C && S();
      },
      { deep: !0 }
    ), It(
      () => a.dates,
      (C) => {
        a.data || C && C[0] && C[1] && k();
      },
      { deep: !0 }
    ), t({ isDark: o }), (C, $) => (b(), K(ht, {
      class: "payment-method-root ku:h-full ku:min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, {
      headerExport: I(() => [
        e.enableExport && !i.value ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: M,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        i.value ? (b(), w("div", X0, [...$[0] || ($[0] = [
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
        ])])) : (b(), w("div", G0, [
          c.value ? (b(), w("section", Z0, [
            $[1] || ($[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", Q0, [
              (b(!0), w(q, null, et(l.value.payment_method_breakdown, (L, T) => (b(), K(ot, {
                key: L.payment_method,
                class: "payment-method-card-item ku:min-w-0",
                color: m[T % m.length],
                title: v(L.payment_method),
                value: f(L),
                subvalue: `${x(L.count)} ${x(L.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (b(), w("section", J0, [
            r("div", tb, [
              r("div", eb, [
                z(F(uk), { class: "ku:empty-icon" })
              ]),
              $[2] || ($[2] = r("p", { class: "ku:empty-title" }, "No payment data available", -1)),
              $[3] || ($[3] = r("p", { class: "ku:empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          u.value ? (b(), w("section", nb, [
            $[5] || ($[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", ab, [
              z(Qt, {
                columns: h,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: L }) => [
                  r("span", sb, A(y(String(L.date))), 1)
                ]),
                "cell-totalSales": I(({ row: L }) => [
                  r("span", ob, A(F(U)(L.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": I(({ row: L }) => [
                  r("span", ib, [
                    Array.isArray(L.total_amount_by_currency) && L.total_amount_by_currency.length > 0 ? (b(), w("div", lb, [
                      (b(!0), w(q, null, et(L.total_amount_by_currency, (T) => (b(), w("span", {
                        key: `${L.date}-${T.currency}`
                      }, A(T.currency) + " " + A(g(T.total_value)), 1))), 128))
                    ])) : (b(), w(q, { key: 1 }, [
                      vt(A(g(Number(L.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": I(({ row: L }) => [
                  r("div", rb, [
                    (b(!0), w(q, null, et(Array.isArray(L.payment_methods) ? L.payment_methods : [], (T) => (b(), w("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", cb, A(v(T.payment_method)), 1),
                      $[4] || ($[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (b(), w("span", ub, A(g(T.total_amount)), 1)) : (b(), w("span", db, A(T.total_amount_by_currency.map((B) => `${B.currency} ${g(B.total_value)}`).join(" / ")), 1)),
                      r("span", hb, "(" + A(x(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : c.value ? (b(), w("div", fb, [...$[6] || ($[6] = [
            r("p", { class: "ku:empty-table-text" }, "No daily breakdown available", -1)
          ])])) : O("", !0)
        ]))
      ]),
      _: 1
    }));
  }
}), pb = /* @__PURE__ */ at(kb, [["__scopeId", "data-v-3f4c6760"]]), mb = { class: "kiut-table-wrap ku:overflow-hidden ku:rounded-xl ku:border ku:border-[#e5e7eb] ku:bg-[color:var(--kiut-bg-secondary)] ku:shadow-sm ku:dark:border-[color:var(--kiut-border-light)]" }, bb = { class: "ku:overflow-x-auto" }, vb = { class: "kiut-table ku:w-full ku:min-w-[640px] ku:border-collapse ku:text-left ku:text-sm" }, yb = { class: "ku:h-12 ku:border-b ku:border-[#e5e7eb] ku:bg-[#eaeaec80] ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[#23232f80]" }, _b = {
  key: 0,
  scope: "col",
  class: "ku:w-12 ku:px-4 ku:py-3 ku:text-center ku:align-middle"
}, xb = ["checked", "aria-label"], wb = {
  key: 0,
  class: "ku:w-12 ku:bg-transparent ku:px-4 ku:py-3 ku:text-center ku:align-middle"
}, Cb = ["checked", "aria-label", "onChange"], $b = /* @__PURE__ */ Q({
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
  emits: ["ku:update:selectedKeys"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = nt(null);
    function o(f) {
      return `cell-${f}`;
    }
    function i(f) {
      return f === "center" ? "ku:text-center" : f === "right" ? "ku:text-right" : "ku:text-left";
    }
    function l(f, y) {
      if (typeof n.rowKey == "function")
        return n.rowKey(f);
      const x = f[n.rowKey];
      return x != null ? String(x) : `__index_${y}`;
    }
    function c(f, y) {
      return f[y];
    }
    function u(f) {
      return f == null || typeof f == "object" ? "" : String(f);
    }
    function d(f, y) {
      return l(f, y);
    }
    const h = D(() => n.rows.map((f, y) => l(f, y)));
    function p(f, y) {
      const x = l(f, y);
      return n.selectedKeys.includes(x);
    }
    const _ = D(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((f) => n.selectedKeys.includes(f))), k = D(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const f = h.value.filter((y) => n.selectedKeys.includes(y));
      return f.length > 0 && f.length < n.rows.length;
    });
    It(
      [k, _, () => n.selectable],
      async () => {
        await Rt();
        const f = s.value;
        f && (f.indeterminate = k.value && !_.value);
      },
      { immediate: !0 }
    );
    function m() {
      if (n.selectable)
        if (_.value) {
          const f = n.selectedKeys.filter((y) => !h.value.includes(y));
          a("ku:update:selectedKeys", f);
        } else {
          const f = new Set(n.selectedKeys);
          h.value.forEach((y) => f.add(y)), a("ku:update:selectedKeys", [...f]);
        }
    }
    function v(f, y) {
      if (!n.selectable) return;
      const x = l(f, y);
      n.selectedKeys.includes(x) ? a(
        "ku:update:selectedKeys",
        n.selectedKeys.filter((S) => S !== x)
      ) : a("ku:update:selectedKeys", [...n.selectedKeys, x]);
    }
    function g(f, y) {
      const x = l(f, y);
      return `${n.ariaLabelSelectRow} ${x}`;
    }
    return (f, y) => (b(), w("div", mb, [
      r("div", bb, [
        r("table", vb, [
          r("thead", null, [
            r("tr", yb, [
              e.selectable ? (b(), w("th", _b, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: _.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: m
                }, null, 40, xb)
              ])) : O("", !0),
              (b(!0), w(q, null, et(e.columns, (x) => (b(), w("th", {
                key: x.key,
                scope: "col",
                class: H([
                  "ku:px-4 ku:py-3 ku:font-semibold ku:tracking-tight ku:text-[color:var(--kiut-text-table-header)]",
                  i(x.align),
                  x.headerClass ?? ""
                ])
              }, A(x.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (b(!0), w(q, null, et(e.rows, (x, M) => (b(), w("tr", {
              key: d(x, M),
              class: "ku:h-14 ku:border-b ku:border-[#e5e7eb] ku:bg-transparent ku:transition-colors ku:hover:[background:var(--kiut-bg-table-hover)] ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[#141419]"
            }, [
              e.selectable ? (b(), w("td", wb, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(x, M),
                  "aria-label": g(x, M),
                  onChange: (S) => v(x, M)
                }, null, 40, Cb)
              ])) : O("", !0),
              (b(!0), w(q, null, et(e.columns, (S) => (b(), w("td", {
                key: S.key,
                class: H([
                  "ku:bg-transparent ku:px-4 ku:py-3 ku:align-middle ku:text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                $t(f.$slots, o(S.key), {
                  row: x,
                  column: S,
                  value: c(x, S.key)
                }, () => [
                  vt(A(u(c(x, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Ui = /* @__PURE__ */ at($b, [["__scopeId", "data-v-dcf6648e"]]), Mb = {
  key: 0,
  class: "loading-state"
}, Sb = {
  key: 1,
  class: "card-body"
}, Db = { class: "ku:summary-cards" }, Ab = {
  key: 0,
  class: "ku:summary-card enqueued-card"
}, Tb = { class: "ku:summary-card-content" }, Bb = { class: "card-content enqueued-content" }, Lb = { class: "card-value enqueued-value" }, Fb = { class: "ku:summary-card assigned-card" }, Eb = { class: "ku:summary-card-content" }, Pb = { class: "card-content" }, Ib = { class: "card-value assigned-value" }, Rb = { class: "card-content" }, Ob = { class: "card-value assigned-value" }, zb = { class: "ku:summary-card closed-card" }, Vb = { class: "ku:summary-card-content" }, Nb = { class: "card-content" }, jb = { class: "card-value closed-value" }, Wb = { class: "card-content" }, Hb = { class: "card-value closed-value" }, Yb = {
  key: 0,
  class: "agents-section"
}, Kb = { class: "date-header" }, qb = { class: "date-title" }, Ub = { class: "date-stats" }, Xb = {
  key: 0,
  class: "stat-item enqueued-stat"
}, Gb = { class: "stat-value" }, Zb = { class: "stat-item assigned-stat" }, Qb = { class: "stat-value" }, Jb = { class: "stat-value" }, tv = { class: "stat-item closed-stat" }, ev = { class: "stat-value" }, nv = { class: "stat-value" }, av = { class: "ku:w-full ku:min-w-0" }, sv = { class: "ah-cell name-cell" }, ov = { class: "ah-cell email-cell" }, iv = { class: "metric-cell-content" }, lv = { class: "badge assigned-badge" }, rv = { class: "metric-cell-avg" }, cv = { class: "metric-cell-content" }, uv = { class: "badge closed-badge" }, dv = { class: "metric-cell-avg" }, hv = ["onClick"], fv = {
  key: 1,
  class: "ku:empty-state"
}, xa = 3, gv = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ut(rt(a, "theme")), l = D(() => {
      const $ = a.data?.agents_by_day && a.data.agents_by_day.length > 0, L = (a.data?.total_enqueued ?? 0) > 0;
      return $ || L;
    }), c = D(() => {
      if (!l.value) return {};
      const $ = {};
      for (const B of a.data.agents_by_day)
        $[B.date] || ($[B.date] = []), $[B.date].push(B);
      const L = Object.keys($).sort((B, E) => new Date(B).getTime() - new Date(E).getTime()), T = {};
      for (const B of L)
        T[B] = $[B];
      return T;
    }), u = nt({});
    function d($) {
      u.value = {
        ...u.value,
        [$]: !u.value[$]
      };
    }
    function h($, L) {
      return u.value[$] ? L : L.slice(0, xa);
    }
    function p($) {
      return Math.max(0, $.length - xa);
    }
    function _($) {
      return $.length > xa;
    }
    const k = [
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
    const v = ($) => $ == null ? "0" : U($), g = ($) => {
      if ($ == null)
        return "AVG";
      if ($ < 60)
        return `${Math.round($)}s`;
      const L = Math.round($), T = Math.floor(L / 60), B = L % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const E = Math.floor(T / 60), P = T % 60;
      return `${E}h ${P}m`;
    }, f = ($) => {
      const L = new Date($), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return L.toLocaleDateString("en-US", T);
    }, y = ($) => $[0]?.day_total_enqueued ?? 0, x = ($) => $[0]?.day_total_assigned ?? 0, M = ($) => $[0]?.day_total_closed ?? 0, S = ($) => $[0]?.day_avg_time_to_assign_seconds ?? null, C = ($) => $[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), ($, L) => (b(), K(ht, {
      class: "agent-human-conv-root ku:h-full ku:min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), w("div", Mb, [...L[0] || (L[0] = [
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
        ])])) : (b(), w("div", Sb, [
          r("div", Db, [
            e.data.total_enqueued ? (b(), w("div", Ab, [
              L[2] || (L[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Tb, [
                r("div", Bb, [
                  L[1] || (L[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", Lb, A(v(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : O("", !0),
            r("div", Fb, [
              L[5] || (L[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Eb, [
                r("div", Pb, [
                  L[3] || (L[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", Ib, A(v(e.data.total_assigned)), 1)
                ]),
                r("div", Rb, [
                  L[4] || (L[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", Ob, A(g(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", zb, [
              L[8] || (L[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Vb, [
                r("div", Nb, [
                  L[6] || (L[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", jb, A(v(e.data.total_closed)), 1)
                ]),
                r("div", Wb, [
                  L[7] || (L[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", Hb, A(g(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (b(), w("div", Yb, [
            (b(!0), w(q, null, et(c.value, (T, B) => (b(), w("div", {
              key: B,
              class: "date-group"
            }, [
              r("div", Kb, [
                r("h4", qb, A(f(B)), 1),
                r("div", Ub, [
                  y(T) ? (b(), w("span", Xb, [
                    r("span", Gb, A(v(y(T))), 1),
                    L[9] || (L[9] = vt(" Enqueued ", -1))
                  ])) : O("", !0),
                  r("span", Zb, [
                    r("span", Qb, A(v(x(T))), 1),
                    L[10] || (L[10] = vt(" Assigned ", -1)),
                    r("span", Jb, A(g(S(T))), 1)
                  ]),
                  r("span", tv, [
                    r("span", ev, A(v(M(T))), 1),
                    L[11] || (L[11] = vt(" Closed ", -1)),
                    r("span", nv, A(g(C(T))), 1)
                  ])
                ])
              ]),
              r("div", av, [
                z(Ui, {
                  columns: k,
                  rows: m(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": I(({ row: E }) => [
                    r("span", sv, A(E.agent_name || "-"), 1)
                  ]),
                  "cell-email": I(({ row: E }) => [
                    r("span", ov, A(E.agent_email), 1)
                  ]),
                  "cell-assigned": I(({ row: E }) => [
                    r("div", iv, [
                      r("span", lv, A(v(Number(E.assigned_count))), 1),
                      r("span", rv, A(g(Number(E.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": I(({ row: E }) => [
                    r("div", cv, [
                      r("span", uv, A(v(Number(E.closed_count))), 1),
                      r("span", dv, A(g(Number(E.avg_conversation_duration_seconds))), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              _(T) ? (b(), w("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (E) => d(String(B))
              }, [
                vt(A(u.value[B] ? "View less" : `View more (${p(T)} rows)`) + " ", 1),
                (b(), w("svg", {
                  class: H(["view-more-icon", { "view-more-icon-rotated": u.value[B] }]),
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
              ], 8, hv)) : O("", !0)
            ]))), 128))
          ])) : (b(), w("div", fv, [...L[13] || (L[13] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No agent human conversation data available"),
              r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }));
  }
}), kv = /* @__PURE__ */ at(gv, [["__scopeId", "data-v-7ee8e918"]]), pv = {
  key: 0,
  class: "ku:flex ku:min-h-[380px] ku:flex-1 ku:flex-col ku:items-center ku:justify-center ku:px-4"
}, mv = { class: "ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5" }, bv = {
  key: 0,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-3"
}, vv = { class: "chart-line-area ku:flex ku:h-[230px] ku:w-full ku:min-w-0 ku:shrink-0 ku:flex-col ku:overflow-hidden" }, yv = {
  key: 1,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-4 ku:sm:gap-6"
}, _v = {
  key: 2,
  class: "ku:flex ku:min-h-[280px] ku:flex-1 ku:items-center ku:justify-center"
}, xv = { class: "ku:max-w-[360px] ku:px-4 ku:text-center" }, wv = { class: "ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] ku:shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Cv = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "ku:delay-100", "ku:delay-200", "ku:delay-300", "ku:delay-[400ms]"], o = e, i = n, l = (g) => {
      i("export", g);
    }, c = rt(o, "theme"), { isDark: u } = ut(c), d = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = nt({ labels: [], datasets: [] }), p = D(
      () => o.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), _ = D(() => {
      const g = p.value.total_by_channel || {}, f = Object.values(g).reduce((y, x) => y + x, 0);
      return f === 0 ? [] : Object.entries(g).sort(([, y], [, x]) => x - y).map(([y, x]) => ({
        name: y,
        label: y.toUpperCase(),
        total: x,
        percentage: (x / f * 100).toFixed(1),
        color: d[y.toLowerCase()] || "#9ca3af"
      }));
    }), k = D(() => _.value.slice(0, 4)), m = D(() => {
      const g = k.value.length;
      return g <= 1 ? "ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:gap-4" : g === 2 ? "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:gap-4" : g === 3 ? "ku:grid ku:w-full ku:grid-cols-3 ku:gap-3 ku:sm:gap-4" : "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:grid-cols-4 ku:sm:gap-4";
    }), v = (g) => {
      if (!g || !g.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const f = g.channels_by_day, y = Object.keys(f).sort();
      if (y.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const C of Object.values(f))
        for (const $ of Object.keys(C))
          x.add($);
      const S = Array.from(x).map((C) => {
        const $ = C.toLowerCase(), L = d[$] || "#9ca3af";
        return {
          label: C.toUpperCase(),
          data: y.map((T) => f[T]?.[C] || 0),
          borderColor: L
        };
      });
      h.value = {
        labels: y.map((C) => Pt(C).format("MMM DD")),
        datasets: S
      };
    };
    return It(
      () => o.data,
      (g) => {
        v(g ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: u }), (g, f) => (b(), K(ht, {
      class: "ku:w-full ku:min-h-0 ku:self-start",
      title: "Interactions by Channel",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", {
          class: H(["ku:flex ku:min-h-0 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "ku:flex-1" : "ku:w-full ku:shrink-0"])
        }, [
          o.loading ? (b(), w("div", pv, [
            r("div", mv, [
              (b(), w(q, null, et(a, (y, x) => r("div", {
                key: x,
                class: H(["ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300", s[x]]),
                style: gt({ height: `${y}%` })
              }, null, 6)), 64))
            ]),
            f[0] || (f[0] = r("p", { class: "ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (b(), w(q, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), w("section", bv, [
              r("div", vv, [
                z(be, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              k.value.length ? (b(), w("div", {
                key: 0,
                class: H(m.value)
              }, [
                (b(!0), w(q, null, et(k.value, (y) => (b(), K(ot, {
                  key: y.name,
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${F(U)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : O("", !0)
            ])) : _.value.length ? (b(), w("section", yv, [
              r("div", {
                class: H(m.value)
              }, [
                (b(!0), w(q, null, et(k.value, (y) => (b(), K(ot, {
                  key: y.name,
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${F(U)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : O("", !0),
            _.value.length ? O("", !0) : (b(), w("section", _v, [
              r("div", xv, [
                r("div", wv, [
                  z(F(Kt), { class: "ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                f[1] || (f[1] = r("p", { class: "ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                f[2] || (f[2] = r("p", { class: "ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), $v = /* @__PURE__ */ at(Cv, [["__scopeId", "data-v-65562e53"]]), Mv = {
  key: 0,
  class: "card-body"
}, Sv = { class: "chart-container" }, Dv = { class: "triage-table-block ku:w-full ku:min-w-0" }, Av = { class: "triage-row-label" }, Tv = {
  key: 1,
  class: "triage-count"
}, Bv = {
  key: 1,
  class: "triage-count"
}, Lv = {
  key: 1,
  class: "triage-count"
}, Fv = {
  key: 1,
  class: "triage-count"
}, Ev = {
  key: 1,
  class: "triage-count"
}, Pv = {
  key: 1,
  class: "ku:empty-state"
}, Iv = { class: "ku:empty-state-content" }, Rv = { class: "ku:empty-icon-wrapper" }, Ov = {
  key: 1,
  class: "loading-state"
}, zv = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = ut(rt(a, "theme")), c = D(() => {
      const y = a.data?.combinations || {}, x = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [M, S] of Object.entries(y)) {
        const C = M.split("+").filter(Boolean);
        if (!C.includes("triage")) continue;
        const $ = C.filter((L) => L !== "triage").length;
        $ >= 4 ? x["4p"] += Number(S) || 0 : x[$] += Number(S) || 0;
      }
      return x;
    }), u = D(() => {
      const y = c.value;
      return y[0] + y[1] + y[2] + y[3] + y["4p"] || 0;
    }), d = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const y = u.value;
      if (!y) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const x = c.value;
      return {
        pct0: x[0] / y * 100,
        pct1: x[1] / y * 100,
        pct2: x[2] / y * 100,
        pct3: x[3] / y * 100,
        pct4p: x["4p"] / y * 100
      };
    }), p = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], _ = D(() => {
      const y = h.value, x = c.value;
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
          b0: x[0],
          b1: x[1],
          b2: x[2],
          b3: x[3],
          b4p: x["4p"]
        }
      ];
    }), k = {
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
    }, m = (y) => y?.replace("80", "") || "#888888", v = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: k.c0,
          borderColor: m(k.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: k.c1,
          borderColor: m(k.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: k.c2,
          borderColor: m(k.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: k.c3,
          borderColor: m(k.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: k.c4p,
          borderColor: m(k.c4p),
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
    return t({ isDark: i }), (y, x) => (b(), K(ht, {
      class: "triage-combinations-root ku:h-full ku:min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        e.loading ? (b(), w("div", Ov, [...x[2] || (x[2] = [
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
        ])])) : (b(), w("div", Mv, [
          d.value ? (b(), w(q, { key: 0 }, [
            r("div", Sv, [
              z(pe, {
                data: v.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            z(ot, {
              class: "ku:w-full ku:min-w-0",
              title: "Total",
              value: F(U)(u.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", Dv, [
              z(Qt, {
                columns: p,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": I(({ row: M }) => [
                  r("span", Av, A(M.metric), 1)
                ]),
                "cell-b0": I(({ row: M }) => [
                  M.id === "pct" ? (b(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(k.c0) })
                  }, A(f(Number(M.b0))) + "%", 5)) : (b(), w("span", Tv, A(F(U)(Number(M.b0))), 1))
                ]),
                "cell-b1": I(({ row: M }) => [
                  M.id === "pct" ? (b(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(k.c1) })
                  }, A(f(Number(M.b1))) + "%", 5)) : (b(), w("span", Bv, A(F(U)(Number(M.b1))), 1))
                ]),
                "cell-b2": I(({ row: M }) => [
                  M.id === "pct" ? (b(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(k.c2) })
                  }, A(f(Number(M.b2))) + "%", 5)) : (b(), w("span", Lv, A(F(U)(Number(M.b2))), 1))
                ]),
                "cell-b3": I(({ row: M }) => [
                  M.id === "pct" ? (b(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(k.c3) })
                  }, A(f(Number(M.b3))) + "%", 5)) : (b(), w("span", Fv, A(F(U)(Number(M.b3))), 1))
                ]),
                "cell-b4p": I(({ row: M }) => [
                  M.id === "pct" ? (b(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: m(k.c4p) })
                  }, A(f(Number(M.b4p))) + "%", 5)) : (b(), w("span", Ev, A(F(U)(Number(M.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (b(), w("div", Pv, [
            r("div", Iv, [
              r("div", Rv, [
                z(F(Kt), { class: "ku:empty-icon" })
              ]),
              x[0] || (x[0] = r("p", { class: "ku:empty-title" }, "No triage combinations data", -1)),
              x[1] || (x[1] = r("p", { class: "ku:empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }));
  }
}), Vv = /* @__PURE__ */ at(zv, [["__scopeId", "data-v-70d83a20"]]), Nv = {
  key: 0,
  class: "loading-state"
}, jv = {
  key: 1,
  class: "card-body"
}, Wv = {
  key: 0,
  class: "distribution-with-total ku:flex ku:w-full ku:min-w-0 ku:flex-1 ku:flex-col ku:gap-3 ku:min-h-0"
}, Hv = { class: "pie-section" }, Yv = {
  key: 1,
  class: "ku:empty-state"
}, Kv = /* @__PURE__ */ Q({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), o = [
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
    ), u = D(
      () => (n.data?.items || []).reduce((_, k) => _ + k.count, 0)
    ), d = D(() => {
      const _ = {};
      for (const k of n.data?.items || [])
        _[k.language] = (_[k.language] || 0) + k.count;
      return Object.entries(_).map(([k, m]) => ({ language: k, count: m })).sort((k, m) => m.count - k.count);
    }), h = D(() => ({
      labels: d.value.map((_) => l(_.language)),
      datasets: [{
        data: d.value.map((_) => _.count),
        backgroundColor: d.value.map((_, k) => o[k % o.length] + "80"),
        borderColor: d.value.map((_, k) => o[k % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), p = D(() => ({
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
              const k = _.raw || 0, m = u.value > 0 ? (k / u.value * 100).toFixed(1) : "0";
              return ` ${_.label}: ${k} (${m}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (_, k) => (b(), K(ht, {
      class: "ku:select-language-root ku:h-full ku:min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: I(() => [
        n.loading ? (b(), w("div", Nv, [...k[0] || (k[0] = [
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
        ])])) : (b(), w("div", jv, [
          c.value ? (b(), w("div", Wv, [
            r("section", Hv, [
              z(ia, {
                data: h.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            z(ot, {
              class: "ku:shrink-0",
              title: "Total",
              value: F(U)(u.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (b(), w("section", Yv, [...k[1] || (k[1] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No language data available"),
              r("p", { class: "ku:empty-description" }, "No language selection data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }));
  }
}), qv = /* @__PURE__ */ at(Kv, [["__scopeId", "data-v-76fac02a"]]), Uv = {
  key: 0,
  class: "loading-state"
}, Xv = {
  key: 1,
  class: "card-body"
}, Gv = {
  key: 0,
  class: "guardrails-daily-section"
}, Zv = { class: "ku:w-full ku:min-w-0" }, Qv = { class: "ku:font-medium" }, Jv = { class: "ku:font-semibold" }, ty = { class: "type-badges-row" }, ey = { class: "guardrails-kpis ku:grid ku:grid-cols-2 ku:gap-3 ku:lg:grid-cols-4" }, ny = {
  key: 1,
  class: "ku:empty-state"
}, ay = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ut(rt(a, "theme")), l = D(
      () => a.data?.items && a.data.items.length > 0
    ), c = D(
      () => (a.data?.items || []).reduce((v, g) => v + g.count, 0)
    ), u = (v) => {
      const g = {};
      for (const x of a.data?.items || [])
        g[x[v]] = (g[x[v]] || 0) + x.count;
      const f = Object.entries(g).sort((x, M) => M[1] - x[1]);
      if (f.length === 0) return { name: "—", pct: 0 };
      const y = c.value;
      return {
        name: f[0][0],
        pct: y > 0 ? Math.round(f[0][1] / y * 100) : 0
      };
    }, d = D(() => u("guardrail_type")), h = D(() => u("guardrail_action")), p = D(() => u("guardrail_source")), _ = D(() => {
      const v = {};
      for (const g of a.data?.items || [])
        v[g.date] || (v[g.date] = {}), v[g.date][g.guardrail_type] = (v[g.date][g.guardrail_type] || 0) + g.count;
      return Object.entries(v).map(([g, f]) => ({
        date: g,
        total: Object.values(f).reduce((y, x) => y + x, 0),
        types: Object.entries(f).map(([y, x]) => ({ type: y, count: x })).sort((y, x) => x.count - y.count)
      })).sort((g, f) => new Date(g.date).getTime() - new Date(f.date).getTime());
    }), k = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], m = D(
      () => _.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, g) => (b(), K(ht, {
      class: "guardrails-root ku:h-full ku:min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), w("div", Uv, [...g[0] || (g[0] = [
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
        ])])) : (b(), w("div", Xv, [
          l.value ? (b(), w(q, { key: 0 }, [
            _.value.length > 0 ? (b(), w("section", Gv, [
              r("div", Zv, [
                z(Qt, {
                  columns: k,
                  rows: m.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": I(({ row: f }) => [
                    r("span", Qv, A(F(Pt)(String(f.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": I(({ row: f }) => [
                    r("span", Jv, A(F(U)(f.total)), 1)
                  ]),
                  "cell-types": I(({ row: f }) => [
                    r("div", ty, [
                      (b(!0), w(q, null, et(f.types, (y) => (b(), w("span", {
                        key: y.type,
                        class: "type-count-badge"
                      }, A(y.type) + " (" + A(y.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("section", ey, [
              z(ot, {
                title: "Total Events",
                value: F(U)(c.value)
              }, null, 8, ["value"]),
              z(ot, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                title: "Top source",
                value: p.value.name,
                subvalue: p.value.pct > 0 ? `(${p.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (b(), w("section", ny, [...g[1] || (g[1] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No guardrail events"),
              r("p", { class: "ku:empty-description" }, "No content safety events found for the selected period. This is a good sign!")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }));
  }
}), sy = /* @__PURE__ */ at(ay, [["__scopeId", "data-v-e5e6df5c"]]), oy = {
  key: 0,
  class: "loading-state"
}, iy = {
  key: 1,
  class: "card-body"
}, ly = { class: "chart-section" }, ry = { class: "chart-wrapper" }, cy = {
  key: 1,
  class: "ku:empty-chart"
}, uy = { class: "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:grid-cols-3 ku:sm:gap-4 ku:lg:grid-cols-5" }, dy = {
  key: 0,
  class: "dn-failure-section"
}, hy = { class: "ku:w-full ku:min-w-0" }, fy = { class: "failure-reason" }, gy = { class: "failure-count" }, ky = { class: "impact-bar-container" }, py = { class: "impact-label" }, my = { class: "dn-trend-health-block ku:flex ku:flex-col ku:gap-0" }, by = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, vy = { class: "dn-trend-chart-area ku:min-h-[280px] ku:w-full ku:min-w-0 ku:flex-1" }, yy = { class: "system-health" }, _y = { class: "system-health-content" }, xy = { class: "ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:grid-cols-3 ku:sm:gap-4" }, wy = {
  key: 1,
  class: "ku:empty-state"
}, Cy = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = ut(rt(a, "theme")), c = D(() => {
      const S = a.data?.documentCounts?.items || [], C = a.data?.processingCounts?.items || [];
      return S.length > 0 || C.length > 0;
    }), u = D(() => {
      const S = a.data?.documentCounts?.items || [];
      return {
        processing_started: S.reduce((C, $) => C + $.processing_started, 0),
        processing_completed: S.reduce((C, $) => C + $.processing_completed, 0),
        processing_failed: S.reduce((C, $) => C + $.processing_failed, 0),
        row_count_total: S.reduce((C, $) => C + $.row_count_total, 0)
      };
    }), d = D(() => {
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
    }), h = D(() => u.value.row_count_total || d.value.processing_started), p = D(() => Math.max(0, h.value - d.value.notification_sent)), _ = (S, C) => C ? `${Math.round(S / C * 100)}%` : "0%", k = D(() => {
      const S = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Notification failed", count: d.value.notification_failed },
        { reason: "Other", count: d.value.dq_other }
      ].filter((C) => C.count > 0).sort((C, $) => $.count - C.count);
      return S.length > 0 ? S[0] : { reason: "None", count: 0 };
    }), m = D(() => {
      const S = h.value;
      return [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Notification failed", count: d.value.notification_failed },
        { reason: "Other", count: d.value.dq_other }
      ].map((C) => ({
        ...C,
        impactPct: S > 0 ? Math.round(C.count / S * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], g = D(
      () => m.value.map((S) => ({
        id: S.reason,
        reason: S.reason,
        count: S.count,
        impactPct: S.impactPct
      }))
    ), f = D(() => {
      const S = h.value, C = d.value.processing_success, $ = Math.max(0, C - d.value.totalDqErrors), L = d.value.notification_sent, T = Math.max(0, S - C), B = d.value.totalDqErrors, E = Math.max(0, $ - L), P = (W, J) => {
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
      return C > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: C, label: P(C, S) }), T > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: P(T, S) }), $ > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: $, label: P($, S) }), B > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: P(B, S) }), L > 0 && Y.push({ source: "Contactable", target: "Notified", value: L, label: P(L, S) }), E > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: E, label: P(E, S) }), { nodes: N, links: Y };
    }), y = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, x = D(() => {
      const S = [...a.data?.processingCounts?.items || []].sort(
        (P, N) => new Date(P.date).getTime() - new Date(N.date).getTime()
      ), C = a.data?.documentCounts?.items || [], $ = {};
      for (const P of C)
        $[P.date] = ($[P.date] || 0) + P.row_count_total;
      const L = [.../* @__PURE__ */ new Set([...S.map((P) => P.date), ...C.map((P) => P.date)])].sort(), T = L.map((P) => Pt(P).format("MMM DD")), B = L.map((P) => {
        const N = S.find((J) => J.date === P), Y = N?.notification_sent || 0, W = $[P] || N?.processing_started || 0;
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
    return t({ isDark: i }), (S, C) => (b(), K(ht, {
      class: "dn-metrics-root ku:h-full ku:min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, {
      headerExport: I(() => [
        e.enableExport && !a.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        a.loading ? (b(), w("div", oy, [...C[0] || (C[0] = [
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
        ])])) : (b(), w("div", iy, [
          c.value ? (b(), w(q, { key: 0 }, [
            r("section", ly, [
              C[2] || (C[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", ry, [
                f.value.nodes.length > 0 && f.value.links.length > 0 ? (b(), K(Le, {
                  key: 0,
                  data: f.value,
                  "node-colors": y,
                  height: "350px"
                }, null, 8, ["data"])) : (b(), w("div", cy, [...C[1] || (C[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", uy, [
              z(ot, {
                color: "#3b82f6",
                title: "Total Records",
                value: F(U)(u.value.row_count_total)
              }, null, 8, ["value"]),
              z(ot, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: F(U)(h.value)
              }, null, 8, ["value"]),
              z(ot, {
                color: "#10b981",
                title: "Successfully Notified",
                value: F(U)(d.value.notification_sent),
                subvalue: _(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                color: "#ef4444",
                title: "Not Notified",
                value: F(U)(p.value),
                subvalue: _(p.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ot, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: k.value.reason,
                subvalue: k.value.count > 0 ? `${F(U)(k.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            m.value.length > 0 ? (b(), w("section", dy, [
              C[3] || (C[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", hy, [
                z(Qt, {
                  columns: v,
                  rows: g.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": I(({ row: $ }) => [
                    r("span", fy, A($.reason), 1)
                  ]),
                  "cell-count": I(({ row: $ }) => [
                    r("span", gy, A(F(U)($.count)), 1)
                  ]),
                  "cell-impact": I(({ row: $ }) => [
                    r("div", ky, [
                      r("div", {
                        class: "impact-bar",
                        style: gt({ width: $.impactPct + "%" })
                      }, null, 4),
                      r("span", py, A($.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("div", my, [
              x.value.labels.length > 0 ? (b(), w("section", by, [
                C[4] || (C[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", vy, [
                  z(be, {
                    data: x.value,
                    options: M.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : O("", !0),
              r("details", yy, [
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
                  vt(" System Health Details ")
                ], -1)),
                r("div", _y, [
                  r("div", xy, [
                    z(ot, {
                      title: "Docs Started",
                      value: F(U)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Docs Completed",
                      value: F(U)(u.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Docs Failed",
                      value: F(U)(u.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Processing Started",
                      value: F(U)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Processing Success",
                      value: F(U)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    z(ot, {
                      title: "Notification Failed",
                      value: F(U)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (b(), w("section", wy, [...C[6] || (C[6] = [
            r("div", { class: "ku:empty-state-content" }, [
              r("div", { class: "ku:empty-icon-wrapper" }, [
                r("svg", {
                  class: "ku:empty-icon",
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
              r("p", { class: "ku:empty-title" }, "No disruption notifier data"),
              r("p", { class: "ku:empty-description" }, "No disruption notification data found for the selected period. Try adjusting the date range.")
            ], -1)
          ])]))
        ]))
      ]),
      _: 1
    }));
  }
}), $y = /* @__PURE__ */ at(Cy, [["__scopeId", "data-v-365dd094"]]), My = { class: "highlight-inner" }, Sy = {
  key: 0,
  class: "loading-state"
}, Dy = {
  key: 1,
  class: "card-body"
}, Ay = { class: "metric-value" }, Ty = /* @__PURE__ */ Q({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ut(rt(n, "theme")), s = D(() => U(n.totalConversations)), o = D(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const u = n.previousTotalConversations;
      return u === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - u) / u * 100;
    }), l = D(() => {
      const u = i.value.toFixed(1);
      return i.value > 0 ? `+${u}% vs prev.` : `${u}% vs prev.`;
    }), c = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (u, d) => (b(), K(ht, {
      title: "",
      collapsible: !1,
      class: H(["total-conv-metric", "ku:w-full", { "total-conv-metric--dark": F(a) }])
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
                d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              })
            ])
          ])
        ], -1)
      ])]),
      headerAside: I(() => [
        !e.loading && o.value ? (b(), w("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", My, [
          e.loading ? (b(), w("div", Sy, [...d[1] || (d[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), w("div", Dy, [
            r("span", Ay, A(s.value), 1),
            d[2] || (d[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), By = /* @__PURE__ */ at(Ty, [["__scopeId", "data-v-362b82bc"]]), Ly = { class: "highlight-inner" }, Fy = {
  key: 0,
  class: "loading-state"
}, Ey = {
  key: 1,
  class: "card-body"
}, Py = { class: "metric-value" }, Iy = /* @__PURE__ */ Q({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ut(rt(n, "theme")), s = D(() => `${n.csatP95.toFixed(1)}`), o = D(
      () => n.previousCsatP95 !== null && n.previousCsatP95 !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const u = n.previousCsatP95;
      return u === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - u) / u * 100;
    }), l = D(() => {
      const u = i.value.toFixed(1);
      return i.value > 0 ? `+${u}% vs prev.` : `${u}% vs prev.`;
    }), c = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (u, d) => (b(), K(ht, {
      collapsible: !1,
      class: H(["csat-p95-metric", "ku:w-full", { "csat-p95-metric--dark": F(a) }])
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
                d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
              })
            ])
          ])
        ], -1)
      ])]),
      headerAside: I(() => [
        !e.loading && o.value ? (b(), w("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", Ly, [
          e.loading ? (b(), w("div", Fy, [...d[1] || (d[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), w("div", Ey, [
            r("span", Py, A(s.value), 1),
            d[2] || (d[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ry = /* @__PURE__ */ at(Iy, [["__scopeId", "data-v-7bd36a06"]]), Oy = {
  key: 0,
  class: "loading-state"
}, zy = {
  key: 1,
  class: "card-body"
}, Vy = { class: "chart-wrapper" }, Ny = { class: "overview-card-infos ku:mt-4 ku:flex ku:w-full ku:flex-col ku:gap-3 ku:sm:flex-row ku:sm:gap-4" }, jy = {
  key: 2,
  class: "ku:empty-state"
}, Wy = 500, Hy = 60, Yy = 80, Ky = {
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
    const a = n, s = (u) => {
      a("export", u);
    }, o = e, { isDark: i } = ut(rt(o, "theme")), l = D(() => o.data), c = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (u, d) => (b(), K(ht, {
      class: "nps-overview-root ku:h-full ku:min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (b(), w("div", Oy, [...d[0] || (d[0] = [
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
        ])])) : l.value && l.value.total_nps_responses > 0 ? (b(), w("div", zy, [
          r("div", Vy, [
            z(Oi, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": c.value,
              "chart-height": Wy,
              "chart-margin": Hy,
              "chart-bottom-margin": Yy
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", Ny, [
            z(ot, {
              class: "ku:min-w-0 ku:flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (b(), K(ot, {
              key: 0,
              class: "ku:min-w-0 ku:flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : O("", !0)
          ])
        ])) : (b(), w("div", jy, [...d[1] || (d[1] = [
          r("div", { class: "ku:empty-state-content" }, [
            r("div", { class: "ku:empty-icon-wrapper" }, [
              r("svg", {
                class: "ku:empty-icon",
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
            r("p", { class: "ku:empty-title" }, "No NPS data available"),
            r("p", { class: "ku:empty-description" }, "No NPS data found for the selected period. Try adjusting the date range.")
          ], -1)
        ])]))
      ]),
      _: 1
    }));
  }
}, Xi = /* @__PURE__ */ at(Ky, [["__scopeId", "data-v-c60fc44f"]]), qy = {
  key: 0,
  class: "loading-state"
}, Uy = {
  key: 1,
  class: "card-body"
}, Xy = { class: "tooltip-content" }, Gy = { class: "tooltip-title" }, Zy = { class: "tooltip-stats" }, Qy = { class: "tooltip-stat-row" }, Jy = { class: "tooltip-value" }, t1 = { class: "tooltip-stat-row" }, e1 = { class: "tooltip-value" }, n1 = { class: "tooltip-stat-row" }, a1 = { class: "tooltip-value" }, s1 = { class: "tooltip-stat-row" }, o1 = { class: "tooltip-value" }, i1 = { class: "tooltip-stat-row" }, l1 = { class: "tooltip-value" }, r1 = { class: "tooltip-stat-row" }, c1 = { class: "tooltip-value" }, u1 = { class: "ku:mt-4 ku:flex ku:w-full ku:justify-start" }, d1 = {
  key: 2,
  class: "ku:empty-state"
}, To = 400, ln = 60, Bo = 90, Lo = 120, h1 = {
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
    }, o = e, { isDark: i } = ut(rt(o, "theme")), l = D(() => o.data), c = nt(null), u = nt({
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
    }), d = D(() => {
      if (!l.value || !l.value.nps_by_day) return 800;
      const v = l.value.nps_by_day.length;
      return Math.max(800, ln * 2 + v * Lo);
    }), h = (v, g) => {
      const y = (v - 1) / 9;
      return ln + g - y * g;
    }, p = (v) => v ? Pt(v).format("DD-MM-YYYY") : "", _ = D(() => {
      if (!l.value || !l.value.nps_by_day || l.value.nps_by_day.length === 0)
        return [];
      const v = [], g = To - ln - Bo;
      return l.value.nps_by_day.forEach((f, y) => {
        const x = f.min_score || 0, M = f.q1_score || 0, S = f.median_score || 0, C = f.q3_score || 0, $ = f.max_score || 0, L = f.average_score || 0;
        v.push({
          label: p(f.date),
          responseCount: f.nps_responses_count || 0,
          isTotal: !1,
          low: x,
          q1: M,
          median: S,
          q3: C,
          high: $,
          average: L,
          highY: h($, g),
          lowY: h(x, g),
          q1Y: h(M, g),
          q3Y: h(C, g),
          medianY: h(S, g),
          averageY: L > 0 ? h(L, g) : null,
          centerX: ln + (y + 1) * Lo
        });
      }), v;
    }), k = (v, g) => {
      if (!c.value || !g || g.horizontal) return;
      const f = c.value.getBoundingClientRect(), y = v.clientX, x = v.clientY, M = 140, S = 160, C = 10, $ = 15;
      let L = y - f.left - M / 2, T = x - f.top - S - $;
      L = Math.max(C, Math.min(L, f.width - M - C)), T < C && (T = x - f.top + $), T = Math.max(C, Math.min(T, f.height - S - C)), u.value = {
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
    }, m = () => {
      u.value.visible = !1;
    };
    return t({ isDark: i }), (v, g) => (b(), K(ht, {
      class: "nps-daily-root ku:h-full ku:min-h-0",
      title: "CSAT Daily Metrics",
      subtitle: "Daily CSAT Distribution",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !o.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        o.loading ? (b(), w("div", qy, [...g[0] || (g[0] = [
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
        ])])) : l.value && l.value.nps_by_day && l.value.nps_by_day.length > 0 ? (b(), w("div", Uy, [
          r("div", {
            class: "chart-wrapper",
            ref_key: "chartContainerRef",
            ref: c
          }, [
            _.value && _.value.length > 0 ? (b(), K(Ri, {
              key: 0,
              "candlestick-data": _.value,
              "chart-width": d.value,
              "chart-height": To,
              "chart-margin": ln,
              "chart-bottom-margin": Bo,
              "show-legend": !0,
              rotation: 0,
              "candle-width": 30,
              onCandleHover: k,
              onCandleLeave: m
            }, null, 8, ["candlestick-data", "chart-width"])) : O("", !0),
            u.value.visible ? (b(), w("div", {
              key: 1,
              class: "tooltip-overlay",
              style: gt({
                left: `${u.value.x}px`,
                top: `${u.value.y}px`
              })
            }, [
              r("div", Xy, [
                r("div", Gy, A(u.value.date), 1),
                g[7] || (g[7] = r("div", { class: "tooltip-divider" }, null, -1)),
                r("div", Zy, [
                  r("div", Qy, [
                    g[1] || (g[1] = r("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                    r("span", Jy, A(u.value.min), 1)
                  ]),
                  r("div", t1, [
                    g[2] || (g[2] = r("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                    r("span", e1, A(u.value.q1), 1)
                  ]),
                  r("div", n1, [
                    g[3] || (g[3] = r("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                    r("span", a1, A(u.value.median), 1)
                  ]),
                  r("div", s1, [
                    g[4] || (g[4] = r("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                    r("span", o1, A(u.value.avg), 1)
                  ]),
                  r("div", i1, [
                    g[5] || (g[5] = r("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                    r("span", l1, A(u.value.q3), 1)
                  ]),
                  r("div", r1, [
                    g[6] || (g[6] = r("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                    r("span", c1, A(u.value.max), 1)
                  ])
                ])
              ])
            ], 4)) : O("", !0)
          ], 512),
          r("div", u1, [
            z(ot, {
              title: "Days",
              value: String(l.value.nps_by_day.length),
              class: "ku:min-w-0 ku:w-full ku:max-w-xs"
            }, null, 8, ["value"])
          ])
        ])) : (b(), w("div", d1, [...g[8] || (g[8] = [
          r("div", { class: "ku:empty-state-content" }, [
            r("div", { class: "ku:empty-icon-wrapper" }, [
              r("svg", {
                class: "ku:empty-icon",
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
            r("p", { class: "ku:empty-title" }, "No daily NPS data available"),
            r("p", { class: "ku:empty-description" }, "No daily NPS data found for the selected period. Try adjusting the date range.")
          ], -1)
        ])]))
      ]),
      _: 1
    }));
  }
}, Gi = /* @__PURE__ */ at(h1, [["__scopeId", "data-v-f5086385"]]), f1 = { class: "nps-metrics-container" }, g1 = {
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
    return (s, o) => (b(), w("div", f1, [
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
}, Zi = /* @__PURE__ */ at(g1, [["__scopeId", "data-v-25fe3b80"]]), k1 = { class: "csat-container__body" }, p1 = /* @__PURE__ */ Q({
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
    return (s, o) => (b(), K(ht, {
      class: "csat-container-root ku:w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", k1, [
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
}), m1 = /* @__PURE__ */ at(p1, [["__scopeId", "data-v-263a3282"]]), b1 = { class: "highlight-inner" }, v1 = {
  key: 0,
  class: "loading-state"
}, y1 = {
  key: 1,
  class: "card-body"
}, _1 = { class: "metric-row" }, x1 = { class: "metric-currency" }, w1 = { class: "metric-value" }, C1 = /* @__PURE__ */ Q({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ut(rt(n, "theme")), s = D(() => we(n.totalRevenue)), o = D(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const u = n.previousTotalRevenue;
      return u === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - u) / u * 100;
    }), l = D(() => {
      const u = i.value.toFixed(1);
      return i.value > 0 ? `+${u}% vs prev.` : `${u}% vs prev.`;
    }), c = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (u, d) => (b(), K(ht, {
      collapsible: !1,
      class: H(["ai-revenue-metric", "ku:w-full", { "ai-revenue-metric--dark": F(a) }])
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
        !e.loading && o.value ? (b(), w("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", b1, [
          e.loading ? (b(), w("div", v1, [...d[1] || (d[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), w("div", y1, [
            r("div", _1, [
              r("span", x1, A(n.currencyCode), 1),
              r("span", w1, A(s.value), 1)
            ]),
            d[2] || (d[2] = r("span", { class: "metric-label" }, "AI Revenue", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), $1 = /* @__PURE__ */ at(C1, [["__scopeId", "data-v-59bed766"]]), M1 = { class: "ku:flex ku:justify-end" }, S1 = {
  key: 0,
  class: "ku:flex ku:min-h-[380px] ku:flex-1 ku:flex-col ku:items-center ku:justify-center ku:px-4"
}, D1 = { class: "ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5" }, A1 = {
  key: 0,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-4 ku:sm:gap-6"
}, T1 = { class: "chart-line-area ku:flex ku:h-[230px] ku:w-full ku:min-w-0 ku:shrink-0 ku:flex-col ku:overflow-hidden" }, B1 = { class: "ku:flex ku:flex-wrap ku:gap-4" }, L1 = { class: "ku:text-[var(--kiut-text-primary,#111827)]" }, F1 = { class: "ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:grid-cols-2 ku:lg:grid-cols-5" }, E1 = { class: "ku:flex ku:items-center ku:gap-2 ku:truncate ku:text-sm ku:font-medium ku:text-[var(--kiut-text-secondary,#6b7280)]" }, P1 = { class: "ku:truncate" }, I1 = { class: "ku:mt-1 ku:text-2xl ku:font-bold ku:text-[var(--kiut-text-primary,#111827)]" }, R1 = {
  key: 1,
  class: "ku:flex ku:min-h-[280px] ku:flex-1 ku:items-center ku:justify-center"
}, O1 = /* @__PURE__ */ Q({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = [30, 50, 70, 50, 40], i = ["", "ku:delay-100", "ku:delay-200", "ku:delay-300", "ku:delay-[400ms]"], l = rt(a, "theme"), { isDark: c } = ut(l), u = nt(a.breakdownBy), d = D(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), h = nt({ labels: [], datasets: [] }), p = nt([]), _ = nt([]), k = ["#3b82f6", "#f59e0b", "#06b6d4", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"], m = (y) => k[y % k.length], v = () => {
      s("changeBreakdown", u.value);
    }, g = (y) => {
      if (!y) return "";
      const M = y.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, f = (y) => {
      if (u.value === "all") {
        const T = y?.escalations_by_day ?? [];
        if (!T.length) {
          h.value = { labels: [], datasets: [] }, p.value = [], _.value = [];
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
        }, p.value = [], _.value = [];
        return;
      }
      const x = y?.breakdown_by_day ?? [], M = y?.breakdown_items ?? [];
      if (!x.length) {
        h.value = { labels: [], datasets: [] }, p.value = [], _.value = [];
        return;
      }
      const S = [...x].sort((T, B) => T.date.localeCompare(B.date)), C = M.slice(0, 5).map((T) => T.key), $ = S.map((T) => Pt(T.date).format("MMM DD")), L = C.map((T, B) => {
        const E = M.find((P) => P.key === T);
        return {
          label: g(E?.label || T),
          data: S.map((P) => {
            const N = P.items.find((Y) => Y.key === T);
            return Number(N?.percentage || 0);
          }),
          borderColor: m(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      h.value = {
        labels: $,
        datasets: L
      }, p.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        percentage: Number(T.percentage || 0),
        color: m(B)
      })), _.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        color: m(B)
      }));
    };
    return It(
      () => a.data,
      (y) => {
        f(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), It(
      () => a.breakdownBy,
      (y) => {
        u.value = y, f(d.value);
      }
    ), t({ isDark: c }), (y, x) => (b(), K(ht, {
      class: "ku:w-full ku:min-h-0 ku:self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1
    }, {
      headerAside: I(() => [
        r("div", M1, [
          Zt(r("select", {
            "onUpdate:modelValue": x[0] || (x[0] = (M) => u.value = M),
            class: "ku:rounded-xl ku:border ku:border-[var(--kiut-border-light,#d1d5db)] ku:bg-[var(--kiut-bg-card,#ffffff)] ku:px-3 ku:py-2 ku:text-sm ku:text-[var(--kiut-text-primary,#111827)] ku:dark:border-[var(--kiut-border-light,#374151)] ku:dark:bg-[var(--kiut-bg-card,#111827)] ku:dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: v
          }, [...x[1] || (x[1] = [
            r("option", { value: "all" }, "All", -1),
            r("option", { value: "agent" }, "By Agent", -1),
            r("option", { value: "channel" }, "By Channel", -1),
            r("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [ol, u.value]
          ])
        ])
      ]),
      default: I(() => [
        r("div", {
          class: H(["ku:flex ku:min-h-0 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "ku:flex-1" : "ku:w-full ku:shrink-0"])
        }, [
          a.loading ? (b(), w("div", S1, [
            r("div", D1, [
              (b(), w(q, null, et(o, (M, S) => r("div", {
                key: S,
                class: H(["ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70", i[S]]),
                style: gt({ height: `${M}%` })
              }, null, 6)), 64))
            ]),
            x[2] || (x[2] = r("p", { class: "ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading human escalations... ", -1))
          ])) : (b(), w(q, { key: 1 }, [
            h.value.labels && h.value.labels.length && h.value.datasets.length ? (b(), w("section", A1, [
              r("div", T1, [
                z(be, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", B1, [
                (b(!0), w(q, null, et(_.value, (M) => (b(), w("div", {
                  key: `legend-${M.key}`,
                  class: "ku:inline-flex ku:items-center ku:gap-2 ku:text-sm"
                }, [
                  r("span", {
                    class: "ku:inline-block ku:h-2.5 ku:w-2.5 ku:rounded-full",
                    style: gt({ backgroundColor: M.color })
                  }, null, 4),
                  r("span", L1, A(M.label), 1)
                ]))), 128))
              ]),
              r("div", F1, [
                (b(!0), w(q, null, et(p.value, (M) => (b(), w("div", {
                  key: `card-${M.key}`,
                  class: "ku:rounded-xl ku:border ku:border-[var(--kiut-border-light,#e5e7eb)] ku:p-3"
                }, [
                  r("p", E1, [
                    r("span", {
                      class: "ku:inline-block ku:h-2.5 ku:w-2.5 ku:rounded-full",
                      style: gt({ backgroundColor: M.color })
                    }, null, 4),
                    r("span", P1, A(M.label), 1)
                  ]),
                  r("p", I1, A(M.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (b(), w("section", R1, [...x[3] || (x[3] = [
              r("div", { class: "ku:max-w-[360px] ku:px-4 ku:text-center" }, [
                r("p", { class: "ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                r("p", { class: "ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), z1 = /* @__PURE__ */ at(O1, [["__scopeId", "data-v-5e6a68fe"]]), V1 = { class: "highlight-inner" }, N1 = {
  key: 0,
  class: "loading-state"
}, j1 = {
  key: 1,
  class: "card-body"
}, W1 = { class: "metric-value" }, H1 = /* @__PURE__ */ Q({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e) {
    const t = e, { isDark: n } = ut(rt(t, "theme")), a = D(() => `${Number(t.escalationRatePercentage || 0).toFixed(2)}%`), s = D(
      () => t.previousEscalationRatePercentage !== null && t.previousEscalationRatePercentage !== void 0
    ), o = D(() => {
      if (!s.value) return 0;
      const c = t.previousEscalationRatePercentage;
      return c === 0 ? t.escalationRatePercentage > 0 ? 100 : 0 : (t.escalationRatePercentage - c) / c * 100;
    }), i = D(() => {
      const c = o.value.toFixed(1);
      return o.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), l = D(() => o.value > 0 ? "change-badge--up" : o.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return (c, u) => (b(), K(ht, {
      collapsible: !1,
      class: H(["human-escalations-metric", "ku:w-full", { "human-escalations-metric--dark": F(n) }])
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
        !e.loading && s.value ? (b(), w("div", {
          key: 0,
          class: H(["change-badge", l.value])
        }, A(i.value), 3)) : O("", !0)
      ]),
      default: I(() => [
        r("div", V1, [
          e.loading ? (b(), w("div", N1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), w("div", j1, [
            r("span", W1, A(a.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Human Escalations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Y1 = /* @__PURE__ */ at(H1, [["__scopeId", "data-v-8eaf412c"]]), K1 = { class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0 ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, q1 = {
  key: 0,
  class: "ku:flex ku:min-h-[320px] ku:flex-col ku:items-center ku:justify-center ku:px-4"
}, U1 = { class: "ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5" }, X1 = {
  key: 1,
  class: "ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0"
}, G1 = { class: "ku:flex ku:h-[230px] ku:max-h-[230px] ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0 ku:mb-4" }, Z1 = { class: "ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:grid-cols-2" }, Q1 = {
  key: 2,
  class: "ku:flex ku:min-h-[280px] ku:w-full ku:items-center ku:justify-center"
}, J1 = { class: "ku:max-w-[360px] ku:text-center" }, t_ = { class: "ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, e_ = {
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
    const t = e, { isDark: n, colors: a } = ut(rt(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "ku:delay-100", "ku:delay-200", "ku:delay-300", "ku:delay-[400ms]"], i = D(() => {
      const u = t.data ?? {}, d = u.daily, h = u.days, p = Array.isArray(d) && d.length > 0, _ = Array.isArray(h) && h.length > 0 && Array.isArray(u.allocatedCostSeries) && u.allocatedCostSeries.length === h.length;
      let k = [];
      return p ? k = d : _ && (k = h.map((m, v) => ({
        date: m,
        allocated_cost: u.allocatedCostSeries[v] ?? 0,
        aws_cost: u.awsCostSeries[v] ?? 0,
        airline_conversations: u.airlineConversationsSeries[v] ?? 0
      }))), {
        daily: k,
        total_allocated_cost: u.total_allocated_cost ?? u.totalAllocated ?? 0,
        total_cost: u.total_cost ?? u.total ?? 0,
        total_conversations: u.total_conversations ?? u.totalConversations ?? 0,
        total_airline_conversations: u.total_airline_conversations ?? u.totalAirlineConversations ?? 0,
        airline_name: u.airline_name
      };
    }), l = D(() => {
      const u = i.value.daily;
      return {
        labels: u.map((h) => h.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: u.map((h) => h.allocated_cost),
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
            data: u.map((h) => h.aws_cost),
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
            data: u.map((h) => h.airline_conversations),
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
            label(u) {
              const d = u.dataset.label ? `${u.dataset.label}: ` : "", h = u.parsed.y;
              return u.dataset.yAxisID === "y" ? d + _t(h) : d + String(h);
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
            callback: (u) => _t(u)
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
    return (u, d) => (b(), K(ht, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", K1, [
          e.loading ? (b(), w("div", q1, [
            r("div", U1, [
              (b(), w(q, null, et(s, (h, p) => r("div", {
                key: p,
                class: H(["ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300", o[p]]),
                style: gt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = r("p", { class: "ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (b(), w("div", X1, [
            r("div", G1, [
              z(be, {
                class: "ku:h-full ku:min-h-0 ku:w-full",
                data: l.value,
                options: c.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", Z1, [
              z(ot, {
                color: F(a).primaryLight,
                title: "Total Allocated",
                value: F(_t)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(ot, {
                color: "#FF9900",
                title: "Total AWS",
                value: F(_t)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (b(), w("section", Q1, [
            r("div", J1, [
              r("div", t_, [
                z(F(Kt), { class: "ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              d[1] || (d[1] = r("p", { class: "ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              d[2] || (d[2] = r("p", { class: "ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}, n_ = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, a_ = {
  key: 0,
  class: "card-body"
}, s_ = {
  key: 0,
  class: "chart-section"
}, o_ = { class: "chart-container" }, i_ = { class: "ku:mt-auto ku:grid ku:grid-cols-2 ku:gap-3 ku:sm:grid-cols-3 ku:max-[768px]:gap-2" }, l_ = {
  key: 1,
  class: "ku:empty-state"
}, r_ = { class: "ku:empty-state-content" }, c_ = { class: "ku:empty-icon-wrapper" }, u_ = {
  key: 1,
  class: "loading-state"
}, rn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Fo = 10, d_ = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = ut(rt(a, "theme")), i = (k) => {
      const m = new Date(k), v = String(m.getDate()).padStart(2, "0"), g = String(m.getMonth() + 1).padStart(2, "0");
      return `${v}-${g}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = D(() => {
      const k = a.data?.costs_by_day || {};
      return Object.values(k).reduce((m, v) => m + (v.input_cost || 0), 0);
    }), u = D(() => {
      const k = a.data?.costs_by_day || {};
      return Object.values(k).reduce((m, v) => m + (v.output_cost || 0), 0);
    }), d = D(() => {
      const k = a.data?.costs_by_day || {};
      return Object.values(k).reduce((m, v) => m + (v.cache_read_cost || 0), 0);
    }), h = D(() => {
      const k = a.data?.costs_by_day || {};
      return Object.values(k).reduce((m, v) => m + (v.cache_write_cost || 0), 0);
    }), p = D(() => {
      const k = a.data?.costs_by_day || {}, m = Object.keys(k).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.map((f) => i(f)), g = [
        {
          label: "Input Cost",
          data: m.map((f) => k[f]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: m.map((f) => k[f]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: m.map((f) => k[f]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: m.map((f) => k[f]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
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
            label: function(k) {
              let m = k.dataset.label || "";
              return m && (m += ": "), k.parsed.y !== null && (m += _t(k.parsed.y)), m;
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
            callback: function(k) {
              return _t(k);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (k, m) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", n_, [
          e.loading ? (b(), w("div", u_, [...m[2] || (m[2] = [
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
          ])])) : (b(), w("div", a_, [
            p.value.labels && p.value.labels.length ? (b(), w("section", s_, [
              r("div", o_, [
                z(pe, {
                  data: p.value,
                  options: _.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", i_, [
                z(ot, {
                  title: "Total Cost",
                  value: F(_t)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(ot, {
                  title: "Input Cost",
                  value: F(_t)(c.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Output Cost",
                  value: F(_t)(u.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Cache Read",
                  value: F(_t)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Cache Write",
                  value: F(_t)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                z(ot, {
                  title: "Avg / Conv.",
                  value: F(_t)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (b(), w("section", l_, [
              r("div", r_, [
                r("div", c_, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                m[0] || (m[0] = r("p", { class: "ku:empty-title" }, "No cost usage data", -1)),
                m[1] || (m[1] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), h_ = /* @__PURE__ */ at(d_, [["__scopeId", "data-v-20f70fe8"]]), f_ = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, g_ = {
  key: 0,
  class: "card-body"
}, k_ = {
  key: 0,
  class: "chart-section"
}, p_ = { class: "chart-container" }, m_ = { class: "ku:mt-auto ku:flex ku:w-full ku:min-w-0 ku:flex-nowrap ku:items-stretch ku:gap-2 ku:sm:gap-3" }, b_ = {
  key: 1,
  class: "ku:empty-state"
}, v_ = { class: "ku:empty-state-content" }, y_ = { class: "ku:empty-icon-wrapper" }, __ = {
  key: 1,
  class: "loading-state"
}, cn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Eo = 10, x_ = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = ut(rt(a, "theme")), i = (d) => {
      const h = new Date(d), p = String(h.getDate()).padStart(2, "0"), _ = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${_}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = D(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((k) => i(k)), _ = [
        {
          label: "Input Tokens",
          data: h.map((k) => d[k]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((k) => d[k]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((k) => d[k]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((k) => d[k]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: _
      };
    }), u = D(() => a.options ? a.options : {
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
    return t({ isDark: s }), (d, h) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", f_, [
          e.loading ? (b(), w("div", __, [...h[2] || (h[2] = [
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
          ])])) : (b(), w("div", g_, [
            c.value.labels && c.value.labels.length ? (b(), w("section", k_, [
              r("div", p_, [
                z(pe, {
                  data: c.value,
                  options: u.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", m_, [
                z(ot, {
                  class: "ku:min-w-0 ku:flex-1",
                  title: "Total Tokens",
                  value: F(U)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(ot, {
                  class: "ku:min-w-0 ku:flex-1",
                  title: "Input",
                  value: F(U)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ot, {
                  class: "ku:min-w-0 ku:flex-1",
                  title: "Output",
                  value: F(U)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ot, {
                  class: "ku:min-w-0 ku:flex-1",
                  title: "Cache Read",
                  value: F(U)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ot, {
                  class: "ku:min-w-0 ku:flex-1",
                  title: "Cache Write",
                  value: F(U)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (b(), w("section", b_, [
              r("div", v_, [
                r("div", y_, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                h[0] || (h[0] = r("p", { class: "ku:empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), w_ = /* @__PURE__ */ at(x_, [["__scopeId", "data-v-d5ac2551"]]), C_ = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $_ = {
  key: 0,
  class: "card-body"
}, M_ = {
  key: 0,
  class: "chart-section"
}, S_ = { class: "chart-container" }, D_ = { class: "ku:mt-4 ku:w-full ku:min-w-0" }, A_ = {
  key: 1,
  class: "ku:empty-state"
}, T_ = { class: "ku:empty-state-content" }, B_ = { class: "ku:empty-icon-wrapper" }, L_ = {
  key: 1,
  class: "loading-state"
}, F_ = /* @__PURE__ */ Q({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), o = (u) => {
      const d = new Date(u), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(
      () => U(n.data?.total_conversations ?? 0)
    ), l = D(() => {
      const u = n.data?.conversations_by_day || {}, d = Object.keys(u).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((_) => o(_)), p = [
        {
          label: "Conversations",
          data: d.map((_) => u[_] || 0),
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
            label: function(u) {
              let d = u.dataset.label || "";
              return d && (d += ": "), u.parsed.y !== null && (d += u.parsed.y), d;
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
    return t({ isDark: a }), (u, d) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", C_, [
          e.loading ? (b(), w("div", L_, [...d[2] || (d[2] = [
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
          ])])) : (b(), w("div", $_, [
            l.value.labels && l.value.labels.length ? (b(), w("section", M_, [
              r("div", S_, [
                z(be, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", D_, [
                z(ot, {
                  class: "ku:min-w-0 ku:w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (b(), w("section", A_, [
              r("div", T_, [
                r("div", B_, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                d[0] || (d[0] = r("p", { class: "ku:empty-title" }, "No conversation count data", -1)),
                d[1] || (d[1] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), E_ = /* @__PURE__ */ at(F_, [["__scopeId", "data-v-ae169624"]]), P_ = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, I_ = {
  key: 0,
  class: "card-body"
}, R_ = {
  key: 0,
  class: "charts-grid"
}, O_ = { class: "chart-section" }, z_ = { class: "chart-container" }, V_ = { class: "chart-section" }, N_ = { class: "chart-container" }, j_ = {
  key: 1,
  class: "ku:empty-state"
}, W_ = { class: "ku:empty-state-content" }, H_ = { class: "ku:empty-icon-wrapper" }, Y_ = {
  key: 1,
  class: "loading-state"
}, K_ = /* @__PURE__ */ Q({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), o = D(() => n.data?.top_agents && n.data.top_agents.length > 0), i = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, _) => (_.total_cost || 0) - (p.total_cost || 0)) : []), l = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, _) => (_.total_tokens || 0) - (p.total_tokens || 0)) : []), c = D(() => {
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
    }), u = D(() => {
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
    }), d = D(() => n.options ? n.options : {
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
              const _ = p.label, k = n.data?.top_agents?.find((m) => m.agent_type === _);
              return k ? [
                `Total Cost: ${_t(k.total_cost)}`,
                `Input Cost: ${_t(k.total_input_tokens_cost)}`,
                `Output Cost: ${_t(k.total_output_tokens_cost)}`,
                `Cache Read: ${_t(k.total_read_tokens_cost)}`,
                `Cache Write: ${_t(k.total_write_tokens_cost)}`
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
              return _t(p);
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const _ = p.label, k = n.data?.top_agents?.find((m) => m.agent_type === _);
              return k ? [
                `Total Tokens: ${k.total_tokens.toLocaleString()}`,
                `Input Tokens: ${k.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${k.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${k.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${k.total_write_tokens.toLocaleString()}`
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
    return t({ isDark: a }), (p, _) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", P_, [
          e.loading ? (b(), w("div", Y_, [..._[4] || (_[4] = [
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
          ])])) : (b(), w("div", I_, [
            o.value ? (b(), w("div", R_, [
              r("section", O_, [
                _[0] || (_[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", z_, [
                  z(pe, {
                    data: c.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", V_, [
                _[1] || (_[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", N_, [
                  z(pe, {
                    data: u.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (b(), w("section", j_, [
              r("div", W_, [
                r("div", H_, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                _[2] || (_[2] = r("p", { class: "ku:empty-title" }, "No top agents data", -1)),
                _[3] || (_[3] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), q_ = /* @__PURE__ */ at(K_, [["__scopeId", "data-v-1bd503f6"]]), U_ = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, X_ = {
  key: 0,
  class: "card-body"
}, G_ = {
  key: 0,
  class: "chart-section"
}, Z_ = { class: "chart-container" }, Q_ = {
  key: 1,
  class: "ku:empty-state"
}, J_ = { class: "ku:empty-state-content" }, tx = { class: "ku:empty-icon-wrapper" }, ex = {
  key: 1,
  class: "loading-state"
}, nx = /* @__PURE__ */ Q({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), o = {
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
    ) : []), l = D(() => i.value.length > 0), c = D(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), u = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((m) => {
        const v = m.agent_type?.toLowerCase();
        return (o[v] || "#a78bfa") + "80";
      }), _ = h.map((m) => {
        const v = m.agent_type?.toLowerCase();
        return o[v] || "#a78bfa";
      });
      return {
        labels: h.map((m) => {
          const v = m.conversations || 0, g = c.value ? v / c.value * 100 : 0;
          return `${m.agent_type} - ${v.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((m) => m.conversations || 0),
            backgroundColor: p,
            borderColor: _,
            borderWidth: 2
          }
        ]
      };
    }), d = D(() => n.options ? n.options : {
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
              const p = (h.label || "").toString(), _ = Number(h.parsed) || 0, k = (h.dataset.data || []).reduce((v, g) => v + (Number(g) || 0), 0), m = k ? _ / k * 100 : 0;
              return `${p}: ${_.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, p) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", U_, [
          e.loading ? (b(), w("div", ex, [...p[2] || (p[2] = [
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
          ])])) : (b(), w("div", X_, [
            l.value ? (b(), w("section", G_, [
              r("div", Z_, [
                z(ia, {
                  data: u.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), w("section", Q_, [
              r("div", J_, [
                r("div", tx, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                p[0] || (p[0] = r("p", { class: "ku:empty-title" }, "No top agents data", -1)),
                p[1] || (p[1] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), ax = /* @__PURE__ */ at(nx, [["__scopeId", "data-v-6b21a04b"]]), sx = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ox = {
  key: 0,
  class: "card-body"
}, ix = {
  key: 0,
  class: "chart-section"
}, lx = { class: "chart-container" }, rx = {
  key: 1,
  class: "ku:empty-state"
}, cx = { class: "ku:empty-state-content" }, ux = { class: "ku:empty-icon-wrapper" }, dx = {
  key: 1,
  class: "loading-state"
}, hx = /* @__PURE__ */ Q({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ut(rt(n, "theme")), o = (u) => {
      const d = new Date(u), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(() => {
      const u = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(u) && u.length > 0)
        return !0;
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), l = D(() => {
      const u = n.costData?.daily_mean_cost_per_conversation || [];
      if (u.length > 0) {
        const v = [...u].sort((g, f) => g.date.localeCompare(f.date));
        return {
          labels: v.map((g) => o(g.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((g) => Number(g.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, _ = Object.keys(d).filter((v) => h[v]).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const k = _.map((v) => o(v)), m = _.map((v) => {
        const g = d[v]?.total_cost || 0, f = h[v] || 0;
        return f > 0 ? g / f : 0;
      });
      return {
        labels: k,
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
            label: function(u) {
              let d = u.dataset.label || "";
              return d && (d += ": "), u.parsed.y !== null && (d += _t(u.parsed.y)), d;
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
            callback: function(u) {
              return _t(u);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (u, d) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", sx, [
          e.loading ? (b(), w("div", dx, [...d[2] || (d[2] = [
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
          ])])) : (b(), w("div", ox, [
            i.value ? (b(), w("section", ix, [
              r("div", lx, [
                z(be, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), w("section", rx, [
              r("div", cx, [
                r("div", ux, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                d[0] || (d[0] = r("p", { class: "ku:empty-title" }, "No daily cost trends data", -1)),
                d[1] || (d[1] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), fx = /* @__PURE__ */ at(hx, [["__scopeId", "data-v-4794fcb2"]]);
function Yt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const gx = { class: "tabs ku:text-sm" }, kx = ["aria-label"], px = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], mx = { class: "ku:truncate ku:whitespace-nowrap ku:font-medium ku:tracking-tight" }, bx = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = nt([]), o = `tabs-${Yt()}`, i = (k) => `${o}-tab-${k}`, l = D(
      () => n.items.map((k, m) => k.disabled ? -1 : m).filter((k) => k >= 0)
    );
    function c(k) {
      return k.value === n.modelValue;
    }
    function u(k) {
      const m = c(k), g = `${n.fullWidth ? "ku:relative ku:flex ku:min-w-0 ku:flex-1" : "ku:relative ku:inline-flex ku:max-w-full ku:shrink-0"} ku:items-stretch ku:cursor-pointer ku:rounded-lg ku:border ku:border-transparent ku:text-center ku:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary-light)] ku:focus-visible:ring-offset-2 ku:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] ku:dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] ku:active:scale-[0.99] ku:motion-reduce:active:scale-100`;
      return k.disabled ? `${g} ku:cursor-not-allowed ku:opacity-40` : m ? `${g} ku:bg-white ku:text-[color:var(--kiut-text-primary)] ku:shadow-sm ku:ring-1 ku:ring-black/[0.04] ku:dark:bg-black/45 ku:dark:text-[color:var(--kiut-text-primary)] ku:dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] ku:dark:ring-white/[0.06]` : `${g} ku:text-[color:var(--kiut-text-secondary)] ku:hover:text-[color:var(--kiut-text-primary)] ku:dark:text-[color:var(--kiut-text-muted)] ku:dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(k, m) {
      k === m || n.items.find((g) => g.value === k)?.disabled || (a("update:modelValue", k), a("change", { value: k, previousValue: m }));
    }
    function h(k, m) {
      a("tab-click", { value: k.value, originalEvent: m }), !k.disabled && (d(k.value, n.modelValue), Rt(() => {
        s.value[n.items.indexOf(k)]?.focus();
      }));
    }
    function p(k, m) {
      const v = n.items.length;
      if (v === 0) return 0;
      let g = k;
      for (let f = 0; f < v; f++)
        if (g = (g + m + v) % v, !n.items[g]?.disabled) return g;
      return k;
    }
    async function _(k, m) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(k.key)) return;
      k.preventDefault();
      let g = m;
      k.key === "ArrowLeft" ? g = p(m, -1) : k.key === "ArrowRight" ? g = p(m, 1) : k.key === "Home" ? g = l.value[0] ?? 0 : k.key === "End" && (g = l.value[l.value.length - 1] ?? m);
      const f = n.items[g];
      !f || f.disabled || (d(f.value, n.modelValue), await Rt(), s.value[g]?.focus());
    }
    return (k, m) => (b(), w("div", gx, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: H([
          "ku:box-border ku:min-h-10 ku:flex-wrap ku:items-center ku:gap-0.5 ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-slate-100/95 ku:px-0.5 ku:py-1 ku:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] ku:transition-colors ku:dark:bg-[color:var(--kiut-bg-secondary)] ku:dark:shadow-none",
          e.fullWidth ? "ku:flex ku:w-full" : "ku:inline-flex ku:w-fit ku:max-w-full"
        ])
      }, [
        (b(!0), w(q, null, et(e.items, (v, g) => (b(), w("button", {
          id: i(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": c(v),
          "aria-disabled": v.disabled === !0,
          tabindex: c(v) ? 0 : -1,
          class: H(u(v)),
          onClick: (f) => h(v, f),
          onKeydown: (f) => _(f, g)
        }, [
          r("span", {
            class: H(["tabs-tab__label ku:flex ku:min-h-0 ku:min-w-0 ku:items-center ku:justify-center ku:gap-2 ku:px-3", [
              { "ku:min-w-0 ku:flex-1": e.fullWidth },
              c(v) && "ku:py-1"
            ]])
          }, [
            v.icon ? (b(), K(Xe(v.icon), {
              key: 0,
              class: "ku:h-[1.125rem] ku:w-[1.125rem] ku:shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            r("span", mx, A(v.label), 1)
          ], 2)
        ], 42, px))), 128))
      ], 10, kx),
      k.$slots.default ? (b(), K(gn, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: I(() => [
          (b(), w("div", {
            key: e.modelValue,
            class: "tabs-panel ku:mt-4"
          }, [
            $t(k.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), Qi = /* @__PURE__ */ at(bx, [["__scopeId", "data-v-85a1960b"]]), vx = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yx = {
  key: 0,
  class: "loading-state"
}, _x = {
  key: 1,
  class: "card-body"
}, xx = {
  key: 0,
  class: "model-usage-table-block"
}, wx = { class: "ku:w-full ku:min-w-0" }, Cx = {
  key: 1,
  class: "ku:empty-state"
}, $x = { class: "ku:empty-state-content" }, Mx = { class: "ku:empty-icon-wrapper" }, Sx = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (k) => {
      s("export", k);
    }, { isDark: i } = ut(rt(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], c = nt("by_model"), u = D(() => c.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = D(() => [
      { key: "name", label: c.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = D(
      () => Object.entries(u.value).map(([k, m]) => ({
        id: k,
        name: k,
        avgCost: _(m.avg_cost_per_message),
        avgTokens: p(m.avg_tokens_per_message),
        messageCount: p(m.message_count),
        totalCost: _(m.total_cost),
        totalTokens: p(m.total_tokens)
      }))
    ), p = (k) => k == null ? "0" : U(k), _ = (k) => k == null ? "$0.00" : _t(k);
    return t({ isDark: i }), (k, m) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", vx, [
          e.loading ? (b(), w("div", yx, [...m[1] || (m[1] = [
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
          ])])) : (b(), w("div", _x, [
            z(Qi, {
              modelValue: c.value,
              "onUpdate:modelValue": m[0] || (m[0] = (v) => c.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: I(() => [
                u.value && Object.keys(u.value).length > 0 ? (b(), w("div", xx, [
                  r("div", wx, [
                    z(Qt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (b(), w("div", Cx, [
                  r("div", $x, [
                    r("div", Mx, [
                      z(F(Kt), { class: "ku:empty-icon" })
                    ]),
                    m[2] || (m[2] = r("p", { class: "ku:empty-title" }, "No model usage data available", -1)),
                    m[3] || (m[3] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), Dx = /* @__PURE__ */ at(Sx, [["__scopeId", "data-v-384f99f8"]]), Ax = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tx = {
  key: 0,
  class: "loading-state"
}, Bx = {
  key: 1,
  class: "card-body"
}, Lx = {
  key: 0,
  class: "message-roles-table-block"
}, Fx = { class: "ku:w-full ku:min-w-0" }, Ex = {
  key: 1,
  class: "ku:empty-state"
}, Px = { class: "ku:empty-state-content" }, Ix = { class: "ku:empty-icon-wrapper" }, Rx = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ut(rt(a, "theme")), l = ["assistant", "system", "user"], c = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], u = D(() => a.data?.total_by_role || {}), d = D(
      () => l.map((m) => ({
        id: m,
        role: k(m),
        avgCost: _(u.value[m]?.avg_cost_per_message),
        avgTokens: p(u.value[m]?.avg_tokens_per_message),
        messageCount: p(u.value[m]?.message_count),
        totalCost: _(u.value[m]?.total_cost),
        totalTokens: p(u.value[m]?.total_tokens)
      }))
    ), h = D(() => Object.keys(u.value).length > 0), p = (m) => m == null ? "0" : U(m), _ = (m) => m == null ? "$0.00" : _t(m), k = (m) => m.charAt(0).toUpperCase() + m.slice(1);
    return t({ isDark: i }), (m, v) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", Ax, [
          e.loading ? (b(), w("div", Tx, [...v[0] || (v[0] = [
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
          ])])) : (b(), w("div", Bx, [
            h.value ? (b(), w("div", Lx, [
              r("div", Fx, [
                z(Qt, {
                  columns: c,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (b(), w("div", Ex, [
              r("div", Px, [
                r("div", Ix, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                v[1] || (v[1] = r("p", { class: "ku:empty-title" }, "No message role data available", -1)),
                v[2] || (v[2] = r("p", { class: "ku:empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ox = /* @__PURE__ */ at(Rx, [["__scopeId", "data-v-85948ce8"]]), zx = { class: "ku:flex ku:min-h-0 ku:flex-1 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vx = {
  key: 0,
  class: "card-body"
}, Nx = {
  key: 0,
  class: "chart-section"
}, jx = { class: "chart-container" }, Wx = { class: "kpi-grid" }, Hx = {
  key: 1,
  class: "ku:empty-state"
}, Yx = { class: "ku:empty-state-content" }, Kx = { class: "ku:empty-icon-wrapper" }, qx = {
  key: 1,
  class: "loading-state"
}, Ux = /* @__PURE__ */ Q({
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
    }, { isDark: i, colors: l } = ut(rt(a, "theme")), c = {
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
    }, u = (f) => f.agent_type || f.agent_id || f.agent_name || "", d = (f) => f.agent_name ? f.agent_name : u(f).split("_").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (f) => {
      const y = u(f).toLowerCase();
      for (const [x, M] of Object.entries(c))
        if (y.includes(x))
          return M;
      return "#9ca3af";
    }, p = D(() => [...a.data?.top_agents || []].sort((y, x) => x.avg_cost_per_conversation - y.avg_cost_per_conversation)), _ = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((f, y) => f + y.conversations, 0)), k = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((f, y) => f + y.total_cost, 0)), m = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : _.value === 0 ? 0 : k.value / _.value), v = D(() => {
      const f = p.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const y = f.map((S) => d(S)), x = f.map((S) => S.avg_cost_per_conversation), M = f.map((S) => h(S));
      return {
        labels: y,
        datasets: [
          {
            label: "USD per conversation",
            data: x,
            backgroundColor: M.map((S) => `${S}80`),
            borderColor: M,
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
              const y = p.value[f.dataIndex];
              return [
                `Cost: ${_t(f.parsed.x)}`,
                `Conversations: ${U(y.conversations)}`,
                `Total Cost: ${_t(y.total_cost)}`
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
              return _t(f);
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
    return t({ isDark: i }), (f, y) => (b(), K(ht, {
      class: "ku:h-full ku:min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: I(() => [
        e.enableExport && !e.loading ? (b(), K(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: I(() => [
        r("div", zx, [
          e.loading ? (b(), w("div", qx, [...y[2] || (y[2] = [
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
          ])])) : (b(), w("div", Vx, [
            v.value.labels && v.value.labels.length ? (b(), w("section", Nx, [
              r("div", jx, [
                z(pe, {
                  data: v.value,
                  options: g.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Wx, [
                z(F(ot), {
                  title: "Total Agents",
                  value: String(p.value.length)
                }, null, 8, ["value"]),
                z(F(ot), {
                  title: "Total Conversations",
                  value: F(U)(_.value)
                }, null, 8, ["value"]),
                z(F(ot), {
                  title: "Total Cost",
                  value: F(_t)(k.value)
                }, null, 8, ["value"]),
                z(F(ot), {
                  title: "Avg Cost / Conv.",
                  value: F(_t)(m.value)
                }, null, 8, ["value"])
              ])
            ])) : (b(), w("section", Hx, [
              r("div", Yx, [
                r("div", Kx, [
                  z(F(Kt), { class: "ku:empty-icon" })
                ]),
                y[0] || (y[0] = r("p", { class: "ku:empty-title" }, "No cost per conversation data", -1)),
                y[1] || (y[1] = r("p", { class: "ku:empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Xx = /* @__PURE__ */ at(Ux, [["__scopeId", "data-v-7c083fbd"]]);
function Gx(e, t) {
  return b(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Zx(e, t) {
  return b(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Qx = ["aria-label"], Jx = { class: "ku:flex ku:flex-wrap ku:items-center ku:gap-x-2 ku:gap-y-1.5" }, t2 = { class: "ku:shrink-0 ku:font-medium ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400" }, e2 = { class: "ku:flex ku:min-w-0 ku:flex-1 ku:flex-wrap ku:items-center ku:gap-1.5" }, n2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], a2 = { class: "ku:truncate" }, s2 = {
  key: 0,
  class: "ku:ml-0.5 ku:inline-flex ku:min-h-[1.125rem] ku:min-w-[1.125rem] ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:bg-[color:var(--kiut-primary)]/20 ku:px-1 ku:text-[10px] ku:font-semibold ku:tabular-nums ku:text-[color:var(--kiut-primary-default)] ku:dark:bg-[color:var(--kiut-primary)]/25 ku:dark:text-[color:var(--kiut-primary-light)]"
}, o2 = {
  key: 0,
  class: "ku:mt-2 ku:flex ku:flex-wrap ku:items-center ku:gap-x-3 ku:gap-y-1.5"
}, i2 = { class: "ku:flex ku:min-w-0 ku:flex-wrap ku:items-center ku:gap-1.5" }, l2 = ["aria-label", "onClick"], r2 = ["aria-label", "onClick"], c2 = ["aria-label"], u2 = ["aria-label"], d2 = {
  key: 1,
  class: "ku:space-y-2"
}, h2 = ["for"], f2 = ["id", "placeholder", "onKeydown"], g2 = { class: "ku:text-xs ku:font-medium ku:leading-tight ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400" }, k2 = ["aria-label"], p2 = { class: "ku:flex ku:cursor-pointer ku:items-center ku:gap-2.5 ku:rounded-md ku:px-2 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:transition ku:hover:bg-black/[0.04] ku:dark:text-slate-100 ku:dark:hover:bg-white/[0.06]" }, m2 = ["checked", "onChange"], b2 = { class: "ku:min-w-0 ku:flex-1" }, v2 = { class: "ku:text-xs ku:font-medium ku:leading-tight ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400" }, y2 = { class: "ku:flex ku:flex-wrap ku:items-end ku:gap-2" }, _2 = { class: "ku:min-w-[120px] ku:flex-1" }, x2 = ["for"], w2 = ["id"], C2 = { class: "ku:min-w-[120px] ku:flex-1" }, $2 = ["for"], M2 = ["id"], S2 = /* @__PURE__ */ Q({
  name: "Filters",
  __name: "Filters",
  props: {
    filterDefinitions: {},
    modelValue: {},
    label: { default: "ku:Filtros:" },
    clearLabel: { default: "Limpiar filtros" },
    regionAriaLabel: { default: "Filtros" }
  },
  emits: ["ku:update:modelValue", "change"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Ea(), i = `${`kiut-filters-${Yt()}`}-panel`, l = nt(null), c = /* @__PURE__ */ new Map(), u = nt(null), d = nt(!1), h = nt({}), p = nt(null), _ = nt(""), k = nt([]), m = nt(""), v = nt(""), g = D(() => u.value ? n.filterDefinitions.find((R) => R.id === u.value) ?? null : null), f = D(() => {
      const R = g.value;
      if (R)
        return R.type === "text" ? _.value : R.type === "select" ? k.value : { start: m.value, end: v.value };
    });
    function y(R, j) {
      j && j instanceof HTMLElement ? c.set(R, j) : c.delete(R);
    }
    function x(R) {
      return n.modelValue[R];
    }
    function M(R) {
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
      if (R.type === "select") return M(j).length === 0;
      if (R.type === "dateRange") {
        const X = j;
        return !X?.start?.trim() || !X?.end?.trim();
      }
      return !0;
    }
    const C = D(
      () => n.filterDefinitions.some((R) => !S(R, x(R.id)))
    ), $ = D(() => {
      const R = [];
      for (const j of n.filterDefinitions) {
        const X = x(j.id);
        if (!S(j, X)) {
          if (j.type === "text")
            R.push({ kind: "text", def: j, key: j.id });
          else if (j.type === "dateRange")
            R.push({ kind: "dateRange", def: j, key: j.id });
          else if (j.type === "select")
            for (const ft of M(X))
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
      return R.type !== "select" ? 0 : M(x(R.id)).length;
    }
    function T(R) {
      const j = x(R.id), X = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${X}: ${String(j ?? "").trim()}`;
      if (R.type === "select") {
        const el = M(j).map((ss) => R.options.find((nl) => nl.value === ss)?.label ?? ss);
        return `${X}: ${el.join(", ")}`;
      }
      const ft = j, Gt = E(ft.start), _e = E(ft.end);
      return `${X}: ${Gt} – ${_e}`;
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
      const j = u.value === R.id && d.value, X = !S(R, x(R.id));
      return j || X ? "ku:border ku:border-solid ku:border-[color:var(--kiut-primary)] ku:bg-[color:var(--kiut-primary)]/10 ku:text-[color:var(--kiut-primary-default)] ku:dark:border-[color:var(--kiut-primary-light)] ku:dark:bg-[color:var(--kiut-primary)]/15 ku:dark:text-[color:var(--kiut-primary-light)]" : "ku:border ku:border-dashed ku:border-[#838395] ku:text-[color:var(--kiut-text-secondary)] ku:hover:border-[#838395] ku:hover:bg-slate-50 ku:dark:border-[#838395] ku:dark:text-slate-400 ku:dark:hover:border-[#838395] ku:dark:hover:bg-white/[0.04]";
    }
    function N(R) {
      return S(R, x(R.id)) ? pt(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function Y(R) {
      const j = x(R.id);
      if (R.type === "text") {
        _.value = j != null ? String(j) : "";
        return;
      }
      if (R.type === "select") {
        k.value = [...M(j)];
        return;
      }
      const X = j;
      m.value = X?.start?.trim() ?? "", v.value = X?.end?.trim() ?? "";
    }
    function W() {
      const R = g.value;
      if (!R || R.type !== "select") return;
      const j = { ...n.modelValue };
      k.value.length === 0 ? delete j[R.id] : j[R.id] = [...k.value], a("ku:update:modelValue", j), a("change", j);
    }
    function J(R) {
      const j = k.value.indexOf(R);
      j >= 0 ? k.value = k.value.filter((X, ft) => ft !== j) : k.value = [...k.value, R], W();
    }
    function tt(R) {
      if (!R) return;
      p.value = R;
      const j = R.getBoundingClientRect(), X = 300;
      let ft = j.left;
      const Gt = window.innerWidth - X - 12;
      ft > Gt && (ft = Math.max(12, Gt)), ft < 12 && (ft = 12);
      const _e = j.bottom + 8;
      h.value = {
        top: `${_e}px`,
        left: `${ft}px`,
        width: `${Math.min(X, window.innerWidth - 24)}px`
      };
    }
    function lt(R, j) {
      if (u.value === R.id && d.value) {
        st();
        return;
      }
      d.value && u.value !== R.id && st(), u.value = R.id, d.value = !0, Y(R), Rt().then(async () => {
        tt(j.currentTarget), await Rt(), kt();
      });
    }
    function bt(R, j) {
      if (u.value === R.id && d.value) {
        st();
        return;
      }
      d.value && u.value !== R.id && st(), u.value = R.id, d.value = !0, Y(R), Rt().then(async () => {
        const X = c.get(R.id) ?? j.currentTarget;
        tt(X), await Rt(), kt();
      });
    }
    function kt() {
      const R = l.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, ku:[href], textarea, ku:[tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function ct() {
      d.value = !1, u.value = null, p.value = null;
    }
    function Mt(R) {
      const j = g.value;
      if (!j) return;
      if (j.type === "text") {
        _.value = R != null ? String(R) : "";
        return;
      }
      if (j.type === "select") {
        k.value = Array.isArray(R) ? R.filter((ft) => typeof ft == "string") : M(R);
        return;
      }
      const X = R;
      m.value = X?.start?.trim() ?? "", v.value = X?.end?.trim() ?? "";
    }
    function st() {
      const R = g.value;
      if (!R) return;
      if (R.type === "text") {
        const Gt = _.value.trim(), _e = { ...n.modelValue };
        Gt === "" ? delete _e[R.id] : _e[R.id] = Gt, a("ku:update:modelValue", _e), a("change", _e), ct();
        return;
      }
      if (R.type === "select") {
        W(), ct();
        return;
      }
      const j = m.value.trim(), X = v.value.trim(), ft = { ...n.modelValue };
      !j || !X || j > X ? delete ft[R.id] : ft[R.id] = { start: j, end: X }, a("ku:update:modelValue", ft), a("change", ft), ct();
    }
    function Et(R) {
      const j = { ...n.modelValue };
      delete j[R], a("ku:update:modelValue", j), a("change", j), u.value === R && ct();
    }
    function At(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        Et(R.def.id);
        return;
      }
      const j = { ...n.modelValue }, ft = M(j[R.def.id]).filter((Gt) => Gt !== R.optionValue);
      ft.length === 0 ? delete j[R.def.id] : j[R.def.id] = ft, a("ku:update:modelValue", j), a("change", j), u.value === R.def.id && Y(R.def);
    }
    function V() {
      const R = {};
      a("ku:update:modelValue", R), a("change", R), ct();
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
    function pt(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const mt = D(() => n.clearLabel);
    function St(R) {
      if (!d.value || !l.value) return;
      const j = R.target;
      if (!(l.value.contains(j) || (j instanceof Element ? j : null)?.closest("ku:[data-kiut-filter-chip]"))) {
        for (const ft of c.values())
          if (ft?.contains(j)) return;
        st();
      }
    }
    function Vt(R) {
      R.key === "Escape" && d.value && (R.preventDefault(), ct());
    }
    function Lt() {
      !d.value || !p.value || tt(p.value);
    }
    return oe(() => {
      document.addEventListener("mousedown", St, !0), window.addEventListener("keydown", Vt, !0), window.addEventListener("resize", Lt);
    }), No(() => {
      document.removeEventListener("mousedown", St, !0), window.removeEventListener("keydown", Vt, !0), window.removeEventListener("resize", Lt);
    }), It(
      () => n.modelValue,
      () => {
        const R = g.value;
        R && d.value && !s.panel && Y(R);
      },
      { deep: !0 }
    ), (R, j) => (b(), w("div", {
      class: "kiut-filters ku:font-[Inter] ku:text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", Jx, [
        r("span", t2, A(e.label), 1),
        r("div", e2, [
          (b(!0), w(q, null, et(e.filterDefinitions, (X) => (b(), w("button", {
            key: `pill-${X.id}`,
            ref_for: !0,
            ref: (ft) => y(X.id, ft),
            type: "button",
            class: H(["ku:inline-flex ku:h-[26px] ku:max-w-full ku:shrink-0 ku:items-center ku:gap-0.5 ku:rounded-full ku:px-2 ku:font-medium ku:transition-colors", P(X)]),
            "aria-label": N(X),
            "aria-expanded": u.value === X.id,
            "aria-haspopup": !0,
            "aria-controls": u.value === X.id ? i : void 0,
            onClick: (ft) => bt(X, ft)
          }, [
            z(F(Gx), {
              class: "ku:h-2.5 ku:w-2.5 ku:shrink-0",
              "aria-hidden": "true"
            }),
            r("span", a2, A(X.label), 1),
            X.type === "select" && L(X) > 0 ? (b(), w("span", s2, A(L(X)), 1)) : O("", !0)
          ], 10, n2))), 128))
        ])
      ]),
      C.value ? (b(), w("div", o2, [
        r("div", i2, [
          (b(!0), w(q, null, et($.value, (X) => (b(), w("div", {
            key: X.key,
            "data-kiut-filter-chip": "",
            class: "ku:inline-flex ku:h-[26px] ku:max-w-full ku:items-center ku:gap-1 ku:rounded-full ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-slate-100/90 ku:pl-2 ku:pr-1 ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-white/[0.08] ku:dark:text-slate-100"
          }, [
            r("button", {
              type: "button",
              class: "ku:min-w-0 ku:flex-1 ku:truncate ku:text-left ku:transition ku:hover:opacity-90",
              "aria-label": it(X),
              onClick: (ft) => lt(X.def, ft)
            }, [
              $t(R.$slots, "formatChip", {
                filter: X.def,
                value: x(X.def.id),
                optionValue: X.kind === "select" ? X.optionValue : void 0
              }, () => [
                vt(A(B(X)), 1)
              ], !0)
            ], 8, l2),
            r("button", {
              type: "button",
              class: "ku:shrink-0 ku:rounded ku:p-0.5 ku:text-[color:var(--kiut-text-muted)] ku:transition ku:hover:bg-black/5 ku:hover:text-[color:var(--kiut-text-primary)] ku:dark:hover:bg-white/10 ku:dark:hover:text-slate-100",
              "aria-label": Z(X),
              onClick: (ft) => At(X)
            }, [
              z(F(Zx), {
                class: "ku:h-3.5 ku:w-3.5",
                "aria-hidden": "true"
              })
            ], 8, r2)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "ku:shrink-0 ku:text-[color:var(--kiut-text-secondary)] ku:underline-offset-2 ku:transition ku:hover:text-[color:var(--kiut-primary)] ku:hover:underline ku:dark:text-slate-400 ku:dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": mt.value,
          onClick: V
        }, A(e.clearLabel), 9, c2)
      ])) : O("", !0),
      (b(), K(Pa, { to: "body" }, [
        u.value && d.value ? (b(), w("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": G.value,
          class: "ku:fixed ku:z-[100] ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-3 ku:shadow-lg ku:dark:bg-[#252528]",
          style: gt(h.value),
          onKeydown: j[3] || (j[3] = ue(() => {
          }, ["stop"]))
        }, [
          g.value ? (b(), w(q, { key: 0 }, [
            R.$slots.panel ? $t(R.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: st,
              value: f.value,
              updateValue: Mt
            }, void 0, !0) : (b(), w("div", d2, [
              g.value.type === "text" ? (b(), w(q, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "ku:block ku:text-xs ku:font-medium ku:leading-tight ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400"
                }, A(g.value.label), 9, h2),
                Zt(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": j[0] || (j[0] = (X) => _.value = X),
                  type: "text",
                  class: "ku:w-full ku:rounded-md ku:border ku:border-[color:var(--kiut-border-table)] ku:bg-white ku:px-2 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:ring-[color:var(--kiut-primary)]/25 ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:dark:bg-[#1e1e20] ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: qn(ue(st, ["prevent"]), ["enter"])
                }, null, 40, f2), [
                  [Ne, _.value]
                ])
              ], 64)) : g.value.type === "select" ? (b(), w(q, { key: 1 }, [
                r("p", g2, A(g.value.label), 1),
                r("ul", {
                  class: "ku:max-h-[min(280px,50vh)] ku:space-y-0.5 ku:overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (b(!0), w(q, null, et(g.value.options, (X) => (b(), w("li", {
                    key: X.value
                  }, [
                    r("label", p2, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox ku:shrink-0",
                        checked: k.value.includes(X.value),
                        onChange: (ft) => J(X.value)
                      }, null, 40, m2),
                      r("span", b2, A(X.label), 1)
                    ])
                  ]))), 128))
                ], 8, k2)
              ], 64)) : g.value.type === "dateRange" ? (b(), w(q, { key: 2 }, [
                r("p", v2, A(g.value.label), 1),
                r("div", y2, [
                  r("div", _2, [
                    r("label", {
                      for: `${i}-start`,
                      class: "ku:mb-0.5 ku:block ku:text-xs ku:leading-tight ku:text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, x2),
                    Zt(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": j[1] || (j[1] = (X) => m.value = X),
                      type: "date",
                      class: "ku:w-full ku:rounded-md ku:border ku:border-[color:var(--kiut-border-table)] ku:bg-white ku:px-1.5 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:dark:bg-[#1e1e20] ku:dark:text-slate-100"
                    }, null, 8, w2), [
                      [Ne, m.value]
                    ])
                  ]),
                  r("div", C2, [
                    r("label", {
                      for: `${i}-end`,
                      class: "ku:mb-0.5 ku:block ku:text-xs ku:leading-tight ku:text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, $2),
                    Zt(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": j[2] || (j[2] = (X) => v.value = X),
                      type: "date",
                      class: "ku:w-full ku:rounded-md ku:border ku:border-[color:var(--kiut-border-table)] ku:bg-white ku:px-1.5 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:dark:bg-[#1e1e20] ku:dark:text-slate-100"
                    }, null, 8, M2), [
                      [Ne, v.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, u2)) : O("", !0)
      ]))
    ], 8, Qx));
  }
}), D2 = /* @__PURE__ */ at(S2, [["__scopeId", "data-v-cc28b3ef"]]), ae = "ku:mb-1.5 ku:block ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100", ve = "ku:min-h-[2.75rem] ku:w-full ku:rounded-xl ku:border ku:border-gray-300 ku:bg-white ku:px-3 ku:py-2 ku:text-sm ku:font-sans ku:text-[color:var(--kiut-text-primary)] ku:shadow-sm ku:outline-none ku:transition ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:focus:ring-offset-0 ku:disabled:cursor-not-allowed ku:disabled:opacity-50 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)] ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500", A2 = "ku:min-h-[5.5rem] ku:w-full ku:resize-y ku:rounded-xl ku:border ku:border-gray-300 ku:bg-white ku:px-3 ku:py-2 ku:text-sm ku:font-sans ku:leading-normal ku:text-[color:var(--kiut-text-primary)] ku:shadow-sm ku:outline-none ku:transition ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:focus:ring-offset-0 ku:disabled:cursor-not-allowed ku:disabled:opacity-50 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)] ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500", Fe = "ku:border-red-500 ku:focus:border-red-500 ku:focus:ring-red-500/25 ku:dark:border-red-400", ye = "ku:mt-1 ku:text-xs ku:font-medium ku:text-red-600 ku:dark:text-red-400", T2 = { class: "ku:font-sans" }, B2 = ["for"], L2 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], F2 = ["id"], E2 = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-input-text-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue,
      set: (c) => a("ku:update:modelValue", c)
    });
    return (c, u) => (b(), w("div", T2, [
      e.label ? (b(), w("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, B2)) : O("", !0),
      Zt(r("input", {
        id: o.value,
        "onUpdate:modelValue": u[0] || (u[0] = (d) => l.value = d),
        type: "text",
        autocomplete: "off",
        class: H([F(ve), e.invalid ? F(Fe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, L2), [
        [Ne, l.value]
      ]),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, F2)) : O("", !0)
    ]));
  }
}), P2 = { class: "ku:font-sans" }, I2 = ["for"], R2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], O2 = ["id"], z2 = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-input-textarea-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue,
      set: (c) => a("ku:update:modelValue", c)
    });
    return (c, u) => (b(), w("div", P2, [
      e.label ? (b(), w("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, I2)) : O("", !0),
      Zt(r("textarea", {
        id: o.value,
        "onUpdate:modelValue": u[0] || (u[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: H([F(A2), e.invalid ? F(Fe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, R2), [
        [Ne, l.value]
      ]),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, O2)) : O("", !0)
    ]));
  }
}), V2 = { class: "ku:font-sans" }, N2 = ["for"], j2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], W2 = ["for"], H2 = ["title"], Y2 = ["aria-label"], K2 = ["id"], q2 = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-input-file-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = nt(null), c = D(() => n.modelValue?.name ?? n.placeholder);
    function u(h) {
      const _ = h.target.files?.[0] ?? null;
      a("ku:update:modelValue", _);
    }
    function d() {
      a("ku:update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, p) => (b(), w("div", V2, [
      e.label ? (b(), w("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, N2)) : O("", !0),
      r("div", {
        class: H([
          F(ve),
          "ku:flex ku:items-center ku:gap-2 ku:focus-within:ring-2 ku:focus-within:ring-offset-0",
          e.invalid ? "ku:focus-within:border-red-500 ku:focus-within:ring-red-500/25 ku:dark:focus-within:border-red-400" : "ku:focus-within:border-[color:var(--kiut-primary)] ku:focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? F(Fe) : "",
          e.disabled ? "ku:pointer-events-none" : ""
        ])
      }, [
        r("input", {
          id: o.value,
          ref_key: "fileInputRef",
          ref: l,
          type: "file",
          class: "ku:sr-only ku:focus:outline-none ku:focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: u
        }, null, 40, j2),
        r("label", {
          for: o.value,
          class: H(["ku:inline-flex ku:shrink-0 ku:cursor-pointer ku:items-center ku:gap-1.5 ku:rounded-lg ku:border ku:border-gray-200 ku:bg-gray-50 ku:px-2.5 ku:py-1.5 ku:text-xs ku:font-semibold ku:text-[color:var(--kiut-text-primary)] ku:transition ku:hover:bg-gray-100 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-white/[0.06] ku:dark:hover:bg-white/[0.1]", e.disabled ? "ku:cursor-not-allowed ku:opacity-50" : ""])
        }, [
          z(F(ok), {
            class: "ku:h-4 ku:w-4 ku:shrink-0 ku:text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          vt(" " + A(e.chooseLabel), 1)
        ], 10, W2),
        r("span", {
          class: "ku:min-w-0 ku:flex-1 ku:truncate ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100",
          title: c.value || void 0
        }, A(c.value), 9, H2),
        e.modelValue && !e.disabled ? (b(), w("button", {
          key: 0,
          type: "button",
          class: "ku:inline-flex ku:shrink-0 ku:rounded-lg ku:p-1.5 ku:text-[color:var(--kiut-text-muted)] ku:transition ku:hover:bg-gray-100 ku:hover:text-[color:var(--kiut-text-primary)] ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:dark:hover:bg-white/[0.08] ku:dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          z(F(ji), {
            class: "ku:h-4 ku:w-4",
            "aria-hidden": "true"
          })
        ], 8, Y2)) : O("", !0)
      ], 2),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, K2)) : O("", !0)
    ]));
  }
}), U2 = { class: "ku:font-sans" }, X2 = ["for"], G2 = { class: "ku:relative" }, Z2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Q2 = ["id"], J2 = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-input-datetime-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => n.modelValue ?? "");
    function c(u) {
      const d = u.target.value;
      a("ku:update:modelValue", d === "" ? null : d);
    }
    return (u, d) => (b(), w("div", U2, [
      e.label ? (b(), w("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, X2)) : O("", !0),
      r("div", G2, [
        z(F(Vi), {
          class: "ku:pointer-events-none ku:absolute ku:left-3 ku:top-1/2 ku:h-5 ku:w-5 -translate-y-1/2 ku:text-gray-500 ku:dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: H([
            F(ve),
            "ku:pl-10",
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
        }, null, 42, Z2)
      ]),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, Q2)) : O("", !0)
    ]));
  }
}), tw = { class: "ku:font-sans" }, ew = ["for"], nw = { class: "ku:relative" }, aw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], sw = ["id"], ow = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    function n(h) {
      const p = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!p) return null;
      const _ = Number(p[1]), k = Number(p[2]);
      return !Number.isInteger(_) || !Number.isInteger(k) || _ < 0 || _ > 23 || k < 0 || k > 59 ? null : `${String(_).padStart(2, "0")}:${String(k).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Yt()}`, l = D(() => s.id ?? i), c = D(() => `${l.value}-err`), u = D(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function d(h) {
      const p = h.target.value;
      o("ku:update:modelValue", a(p));
    }
    return (h, p) => (b(), w("div", tw, [
      e.label ? (b(), w("label", {
        key: 0,
        for: l.value,
        class: H(F(ae))
      }, A(e.label), 11, ew)) : O("", !0),
      r("div", nw, [
        z(F(ck), {
          class: "ku:pointer-events-none ku:absolute ku:left-3 ku:top-1/2 ku:h-5 ku:w-5 -translate-y-1/2 ku:text-gray-500 ku:dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: u.value,
          type: "time",
          autocomplete: "off",
          class: H([
            F(ve),
            "ku:pl-10",
            e.invalid ? F(Fe) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          onInput: d
        }, null, 42, aw)
      ]),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: c.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, sw)) : O("", !0)
    ]));
  }
}), iw = { class: "ku:font-sans" }, lw = ["for"], rw = {
  key: 0,
  class: "ku:order-1 ku:text-center ku:text-sm ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-400"
}, cw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], uw = {
  key: 1,
  class: "ku:text-center ku:text-sm ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-400"
}, dw = {
  key: 2,
  class: "ku:grid ku:w-full ku:max-w-full ku:grid-cols-[1fr_auto_1fr] ku:items-start ku:gap-x-3 ku:text-sm ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-400"
}, hw = { class: "ku:min-w-0 ku:text-left ku:leading-snug" }, fw = { class: "ku:max-w-[min(100%,12rem)] ku:shrink ku:px-1 ku:text-center ku:leading-snug" }, gw = { class: "ku:min-w-0 ku:text-right ku:leading-snug" }, kw = {
  key: 3,
  class: "ku:order-3 ku:text-center ku:text-sm ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-400"
}, pw = {
  key: 4,
  class: "ku:order-4 ku:text-center ku:text-sm ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-400"
}, mw = ["id"], bw = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-input-range-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
      const _ = [];
      return n.errorText && _.push(i.value), _.length ? _.join(" ") : void 0;
    }), c = D(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), u = D(() => !!(n.captionMin || n.captionMax)), d = D(() => {
      const { min: _, max: k, modelValue: m } = n;
      if (k === _) return 0;
      const v = (m - _) / (k - _);
      return Math.min(100, Math.max(0, v * 100));
    }), h = D(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function p(_) {
      const k = Number(_.target.value);
      a("ku:update:modelValue", Number.isNaN(k) ? n.min : k);
    }
    return (_, k) => (b(), w("div", iw, [
      e.label ? (b(), w("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, lw)) : O("", !0),
      r("div", {
        class: H(["ku:flex ku:flex-col ku:items-center ku:gap-2", (e.orientation === "vertical", "ku:w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (b(), w("p", rw, A(e.captionMax), 1)) : O("", !0),
        r("div", {
          class: H(["ku:flex ku:items-center ku:justify-center", [
            e.orientation === "vertical" ? "ku:order-2 ku:h-[var(--kiut-range-length)] ku:w-11 ku:shrink-0" : "ku:order-none ku:w-full ku:py-1"
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
              "kiut-range-input ku:block ku:appearance-none ku:bg-transparent ku:focus:outline-none ku:disabled:cursor-not-allowed ku:disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal ku:w-full"
            ]),
            onInput: p
          }, null, 42, cw)
        ], 6),
        e.orientation === "horizontal" && c.value ? (b(), w("p", uw, A(e.caption), 1)) : e.orientation === "horizontal" && u.value ? (b(), w("div", dw, [
          r("span", hw, A(e.captionMin), 1),
          r("span", fw, A(e.caption), 1),
          r("span", gw, A(e.captionMax), 1)
        ])) : O("", !0),
        e.orientation === "vertical" && e.captionMin ? (b(), w("p", kw, A(e.captionMin), 1)) : O("", !0),
        e.orientation === "vertical" && e.caption ? (b(), w("p", pw, A(e.caption), 1)) : O("", !0)
      ], 2),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, mw)) : O("", !0)
    ]));
  }
}), vw = /* @__PURE__ */ at(bw, [["__scopeId", "data-v-e72cf4e4"]]), yw = { class: "ku:font-sans" }, _w = ["for"], xw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], ww = ["id"], Cw = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-input-number-${Yt()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
      switch (n.align) {
        case "start":
          return "ku:text-start";
        case "end":
          return "ku:text-end";
        default:
          return "ku:text-center";
      }
    }), c = D(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function u(d) {
      const h = d.target.value;
      if (h === "") {
        a("ku:update:modelValue", null);
        return;
      }
      const p = Number(h);
      a("ku:update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (d, h) => (b(), w("div", yw, [
      e.label ? (b(), w("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, _w)) : O("", !0),
      r("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: u,
        class: H([
          F(ve),
          e.invalid ? F(Fe) : "",
          l.value,
          "ku:[appearance:textfield] ku:[&::-webkit-inner-spin-button]:appearance-none ku:[&::-webkit-outer-spin-button]:appearance-none"
        ]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        min: e.min,
        max: e.max,
        step: e.step,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 42, xw),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, ww)) : O("", !0)
    ]));
  }
}), $w = { class: "ku:font-sans" }, Mw = ["for"], Sw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Dw = ["disabled"], Aw = ["id"], Tw = "#3b82f6", Bw = "#aabbcc", Lw = "ku:flex ku:min-h-[2.75rem] ku:w-full ku:items-center ku:gap-3 ku:rounded-xl ku:border ku:border-gray-300 ku:bg-white ku:px-3 ku:py-2 ku:text-sm ku:font-sans ku:shadow-sm ku:outline-none ku:transition ku:focus-within:border-[color:var(--kiut-primary)] ku:focus-within:ring-2 ku:focus-within:ring-[color:var(--kiut-primary)]/25 ku:focus-within:ring-offset-0 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)]", Fw = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    function n(k) {
      const m = k.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(m);
      if (v) return `#${v[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(m);
      if (g) {
        const [f, y, x] = g[1].split("");
        return `#${f}${f}${y}${y}${x}${x}`.toLowerCase();
      }
      return null;
    }
    function a(k) {
      return n(k) ?? Tw;
    }
    const s = e, o = t, i = `kiut-input-color-${Yt()}`, l = D(() => s.id ?? i), c = D(() => `${l.value}-err`), u = D(() => a(s.modelValue)), d = nt(u.value), h = nt(!1);
    It(u, (k) => {
      h.value || (d.value = k);
    });
    function p(k) {
      const m = k.target, v = n(m.value);
      v && o("ku:update:modelValue", v);
    }
    function _() {
      h.value = !1;
      const k = n(d.value);
      k ? (d.value = k, o("ku:update:modelValue", k)) : d.value = u.value;
    }
    return It(d, (k) => {
      if (!h.value) return;
      const m = n(k);
      m && o("ku:update:modelValue", m);
    }), (k, m) => (b(), w("div", $w, [
      e.label ? (b(), w("label", {
        key: 0,
        for: l.value,
        class: H(F(ae))
      }, A(e.label), 11, Mw)) : O("", !0),
      r("div", {
        class: H([
          Lw,
          e.invalid ? F(Fe) : "",
          e.disabled ? "ku:cursor-not-allowed ku:opacity-50" : ""
        ])
      }, [
        r("input", {
          id: l.value,
          type: "color",
          value: u.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          class: "ku:h-9 ku:w-11 ku:shrink-0 ku:cursor-pointer ku:rounded-lg ku:border ku:border-gray-200 ku:bg-[color:var(--kiut-bg-secondary)] ku:p-0.5 ku:shadow-inner ku:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/35 ku:disabled:cursor-not-allowed ku:dark:border-slate-600 ku:dark:bg-slate-800/80",
          onInput: p
        }, null, 40, Sw),
        e.showHexInput ? Zt((b(), w("input", {
          key: 0,
          "onUpdate:modelValue": m[0] || (m[0] = (v) => d.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "ku:min-h-0 ku:min-w-0 ku:flex-1 ku:border-0 ku:bg-transparent ku:p-0 ku:font-mono ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:ring-0 ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:ring-0 ku:disabled:cursor-not-allowed ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500",
          placeholder: Bw,
          onFocus: m[1] || (m[1] = (v) => h.value = !0),
          onBlur: _
        }, null, 40, Dw)), [
          [Ne, d.value]
        ]) : O("", !0)
      ], 2),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: c.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, Aw)) : O("", !0)
    ]));
  }
});
function Ji(e, t) {
  return b(), w("svg", {
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
const Ew = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Pw = ["aria-selected", "onClick", "onMouseenter"], Iw = {
  key: 0,
  class: "ku:flex ku:w-5 ku:shrink-0 ku:justify-center",
  "aria-hidden": "true"
}, Rw = { class: "ku:min-w-0 ku:flex-1" }, tl = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-select-${Yt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = nt(null), u = nt(null), d = nt(null), h = nt(!1), p = nt(0), _ = nt({});
    function k() {
      const B = u.value;
      if (!B) return;
      const E = B.getBoundingClientRect();
      _.value = {
        top: `${E.bottom - 3}px`,
        left: `${E.left}px`,
        width: `${E.width}px`
      };
    }
    const m = D(() => n.options.filter((B) => !B.disabled)), v = D(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), g = D(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((E) => E.value === n.modelValue)?.label ?? String(n.modelValue));
    function f(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function y(B) {
      return n.modelValue === B.value;
    }
    function x(B, E) {
      const P = y(B), N = p.value === E;
      return [
        "ku:flex ku:cursor-pointer ku:items-center ku:gap-1.5 ku:px-2 ku:py-2 ku:text-sm ku:outline-none ku:transition-colors",
        P ? "ku:mx-1 ku:rounded-lg ku:bg-[color:var(--kiut-primary)] ku:font-medium ku:text-white" : "ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100",
        !P && N ? "ku:bg-slate-100 ku:dark:bg-white/5" : ""
      ];
    }
    function M(B) {
      a("ku:update:modelValue", B.value), h.value = !1;
    }
    function S() {
      n.disabled || (h.value = !h.value);
    }
    function C(B) {
      if (B.stopPropagation(), !n.disabled && (S(), h.value)) {
        k();
        const E = Math.max(
          0,
          m.value.findIndex((P) => P.value === n.modelValue)
        );
        p.value = E, Rt(() => d.value?.focus());
      }
    }
    function $(B) {
      if (!h.value) return;
      const E = B.target, P = c.value, N = d.value;
      P && !P.contains(E) && (!N || !N.contains(E)) && (h.value = !1);
    }
    function L(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, k(), p.value = Math.max(
        0,
        m.value.findIndex((E) => E.value === n.modelValue)
      ), Rt(() => d.value?.focus())));
    }
    function T(B) {
      const E = m.value;
      if (E.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), h.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), p.value = Math.min(p.value + 1, E.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (B.key === "Enter") {
          B.preventDefault();
          const P = E[p.value];
          P && M(P);
        }
      }
    }
    return oe(() => {
      document.addEventListener("click", $);
    }), Be(() => {
      document.removeEventListener("click", $);
    }), (B, E) => (b(), w("div", {
      ref_key: "rootRef",
      ref: c,
      class: "ku:relative ku:font-sans"
    }, [
      e.label ? (b(), w("label", {
        key: 0,
        id: o,
        class: H(F(ae))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: u,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(ve),
          "ku:flex ku:items-center ku:justify-between ku:gap-2 ku:text-left",
          h.value ? "ku:border-[color:var(--kiut-primary)] ku:ring-2 ku:ring-[color:var(--kiut-primary)]/25" : ""
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
          class: H(["ku:min-w-0 ku:flex-1 ku:truncate", e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-500" : ""])
        }, A(g.value), 3),
        z(F(Ni), {
          class: H(["ku:h-5 ku:w-5 ku:shrink-0 ku:text-gray-400 ku:transition-transform ku:dark:text-slate-500", h.value ? "ku:rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Ew),
      (b(), K(Pa, { to: "body" }, [
        Zt(r("ul", {
          id: l,
          ref_key: "listRef",
          ref: d,
          role: "listbox",
          tabindex: "-1",
          style: gt(_.value),
          class: "ku:fixed ku:z-[300] ku:max-h-60 ku:overflow-auto ku:rounded-xl ku:border ku:border-gray-300 ku:bg-[color:var(--kiut-bg-secondary)] ku:py-1 ku:shadow-lg ku:dark:border-[color:var(--kiut-border-light)]",
          onKeydown: ue(T, ["stop"])
        }, [
          (b(!0), w(q, null, et(m.value, (P, N) => (b(), w("li", {
            key: f(P),
            role: "option",
            "aria-selected": y(P),
            class: H(x(P, N)),
            onClick: ue((Y) => M(P), ["stop"]),
            onMouseenter: (Y) => p.value = N
          }, [
            e.showOptionCheck ? (b(), w("span", Iw, [
              y(P) ? (b(), K(F(Ji), {
                key: 0,
                class: "ku:h-4 ku:w-4 ku:text-white"
              })) : O("", !0)
            ])) : O("", !0),
            r("span", Rw, A(P.label), 1)
          ], 42, Pw))), 128))
        ], 36), [
          [vn, h.value]
        ])
      ]))
    ], 512));
  }
}), Ow = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], zw = { class: "ku:min-h-[1.25rem] ku:min-w-0 ku:flex-1 ku:max-h-32 ku:overflow-y-auto ku:py-0.5" }, Vw = {
  key: 0,
  class: "ku:block ku:truncate ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-500"
}, Nw = {
  key: 1,
  class: "ku:flex ku:flex-wrap ku:gap-1"
}, jw = { class: "ku:truncate" }, Ww = ["aria-selected", "onClick", "onMouseenter"], Hw = {
  class: "ku:flex ku:w-5 ku:shrink-0 ku:justify-center",
  "aria-hidden": "true"
}, Yw = { class: "ku:min-w-0 ku:flex-1" }, Kw = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-multiselect-${Yt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = nt(null), u = nt(null), d = nt(!1), h = nt(0), p = D(() => n.options.filter((T) => !T.disabled)), _ = D(() => new Set(n.modelValue ?? [])), k = D(
      () => n.options.filter((T) => _.value.has(T.value))
    ), m = D(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = k.value.length;
      return B === 0 ? T : `${T}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function v(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function g(T) {
      return _.value.has(T.value);
    }
    function f(T, B) {
      const E = g(T), P = h.value === B;
      return [
        "ku:flex ku:cursor-pointer ku:items-center ku:gap-1.5 ku:px-2 ku:py-2 ku:text-sm ku:outline-none ku:transition-colors",
        E ? "ku:mx-1 ku:rounded-lg ku:bg-[color:var(--kiut-primary)] ku:font-medium ku:text-white" : "ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100",
        !E && P ? "ku:bg-slate-100 ku:dark:bg-white/5" : ""
      ];
    }
    function y(T) {
      const B = [...n.modelValue ?? []], E = B.indexOf(T.value);
      E >= 0 ? B.splice(E, 1) : B.push(T.value), a("ku:update:modelValue", B);
    }
    function x() {
      const T = p.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = _.value, E = T.findIndex((P) => B.has(P.value));
      h.value = E >= 0 ? E : 0;
    }
    function M() {
      n.disabled || (d.value = !d.value);
    }
    function S(T) {
      T.stopPropagation(), !n.disabled && (M(), d.value && (x(), Rt(() => u.value?.focus())));
    }
    function C(T) {
      if (!d.value) return;
      const B = c.value;
      B && !B.contains(T.target) && (d.value = !1);
    }
    function $(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), d.value || (d.value = !0, x(), Rt(() => u.value?.focus())));
    }
    function L(T) {
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
          E && y(E);
        }
      }
    }
    return oe(() => {
      document.addEventListener("click", C);
    }), Be(() => {
      document.removeEventListener("click", C);
    }), (T, B) => (b(), w("div", {
      ref_key: "rootRef",
      ref: c,
      class: "ku:relative ku:font-sans"
    }, [
      e.label ? (b(), w("label", {
        key: 0,
        id: o,
        class: H(F(ae))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(ve),
          "ku:flex ku:items-start ku:justify-between ku:gap-2 ku:text-left",
          d.value ? "ku:border-[color:var(--kiut-primary)] ku:ring-2 ku:ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: S,
        onKeydown: $
      }, [
        r("div", zw, [
          k.value.length === 0 ? (b(), w("span", Vw, A(e.placeholder), 1)) : (b(), w("div", Nw, [
            (b(!0), w(q, null, et(k.value, (E) => (b(), w("span", {
              key: v(E),
              class: "ku:inline-flex ku:max-w-full ku:items-center ku:rounded-md ku:bg-slate-100 ku:px-2 ku:py-0.5 ku:text-xs ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-white/10 ku:dark:text-slate-100"
            }, [
              r("span", jw, A(E.label), 1)
            ]))), 128))
          ]))
        ]),
        z(F(Ni), {
          class: H(["ku:mt-0.5 ku:h-5 ku:w-5 ku:shrink-0 ku:text-gray-400 ku:transition-transform ku:dark:text-slate-500", d.value ? "ku:rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Ow),
      Zt(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: u,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "ku:absolute ku:left-0 ku:right-0 ku:z-50 ku:mt-[-3px] ku:max-h-60 ku:overflow-auto ku:rounded-xl ku:border ku:border-gray-300 ku:bg-[color:var(--kiut-bg-secondary)] ku:py-1 ku:shadow-lg ku:dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ue(L, ["stop"])
      }, [
        (b(!0), w(q, null, et(p.value, (E, P) => (b(), w("li", {
          key: v(E),
          role: "option",
          "aria-selected": g(E),
          class: H(f(E, P)),
          onClick: ue((N) => y(E), ["stop"]),
          onMouseenter: (N) => h.value = P
        }, [
          r("span", Hw, [
            g(E) ? (b(), K(F(Ji), {
              key: 0,
              class: "ku:h-4 ku:w-4 ku:text-white"
            })) : O("", !0)
          ]),
          r("span", Yw, A(E.label), 1)
        ], 42, Ww))), 128))
      ], 544), [
        [vn, d.value]
      ])
    ], 512));
  }
}), qw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Uw = { class: "ku:sr-only" }, Xw = /* @__PURE__ */ Q({
  name: "Toggle",
  __name: "Toggle",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean },
    id: {},
    ariaLabel: { default: "Interruptor" }
  },
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s() {
      n.disabled || a("ku:update:modelValue", !n.modelValue);
    }
    return (o, i) => (b(), w("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: H([
        "ku:relative ku:inline-flex ku:h-8 ku:w-[3.75rem] ku:shrink-0 ku:cursor-pointer ku:items-center ku:rounded-full ku:p-0.5 ku:shadow-sm ku:transition-colors",
        "ku:focus-visible:outline ku:focus-visible:outline-2 ku:focus-visible:outline-offset-2 ku:focus-visible:outline-[color:var(--kiut-primary)]",
        "ku:disabled:cursor-not-allowed ku:disabled:opacity-50",
        e.modelValue ? "ku:bg-[color:var(--kiut-primary)]" : "ku:bg-[#DEDEE3] ku:dark:bg-slate-600"
      ]),
      onClick: s,
      onKeydown: [
        qn(ue(s, ["prevent", "stop"]), ["space"]),
        qn(ue(s, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: H(["ku:pointer-events-none ku:inline-block ku:h-7 ku:w-7 ku:translate-x-0 ku:transform ku:rounded-full ku:bg-white ku:shadow-sm ku:transition-transform ku:duration-200 ku:ease-out", e.modelValue ? "ku:translate-x-7" : "ku:translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", Uw, A(e.ariaLabel), 1)
    ], 42, qw));
  }
}), Gw = { class: "ku:font-sans" }, Zw = ["for"], Qw = { class: "ku:flex ku:gap-2" }, Jw = { class: "ku:w-[7.5rem] ku:shrink-0" }, t5 = { class: "ku:min-w-0 ku:flex-1" }, e5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], n5 = ["id"], a5 = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-phone-${Yt()}`, o = D(() => n.id ?? `${s}-num`), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue.prefix,
      set: (u) => a("ku:update:modelValue", { ...n.modelValue, prefix: u })
    }), c = D({
      get: () => n.modelValue.number,
      set: (u) => a("ku:update:modelValue", { ...n.modelValue, number: u })
    });
    return (u, d) => (b(), w("div", Gw, [
      e.label ? (b(), w("label", {
        key: 0,
        for: o.value,
        class: H(F(ae))
      }, A(e.label), 11, Zw)) : O("", !0),
      r("div", Qw, [
        r("div", Jw, [
          z(tl, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        r("div", t5, [
          Zt(r("input", {
            id: o.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => c.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: H([F(ve), e.invalid ? F(Fe) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, e5), [
            [Ne, c.value]
          ])
        ])
      ]),
      e.errorText ? (b(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(ye)),
        role: "alert"
      }, A(e.errorText), 11, n5)) : O("", !0)
    ]));
  }
}), s5 = ["role", "aria-label"], o5 = { class: "ku:flex ku:flex-wrap ku:gap-2" }, i5 = ["aria-checked", "role", "onClick"], l5 = { class: "ku:flex ku:h-4 ku:w-4 ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:border-2 ku:border-[color:var(--kiut-primary)] ku:bg-white ku:transition ku:dark:bg-[color:var(--kiut-bg-secondary)]" }, r5 = {
  key: 0,
  class: "ku:h-2 ku:w-2 ku:rounded-full ku:bg-[color:var(--kiut-primary)]"
}, c5 = { class: "ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100" }, u5 = /* @__PURE__ */ Q({
  name: "SelectablePills",
  __name: "SelectablePills",
  props: {
    items: {},
    multiple: { type: Boolean, default: !1 },
    modelValue: {},
    ariaLabel: { default: "Opciones" }
  },
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = D(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(c) {
      return n.multiple ? s.value.includes(c.value) : n.modelValue === c.value;
    }
    function i(c) {
      return [
        "ku:inline-flex ku:max-w-full ku:items-center ku:gap-2 ku:rounded-xl ku:border ku:px-3 ku:py-2 ku:text-left ku:transition",
        "ku:focus-visible:outline ku:focus-visible:outline-2 ku:focus-visible:outline-offset-2 ku:focus-visible:outline-[color:var(--kiut-primary)]",
        o(c) ? "ku:border-[color:var(--kiut-primary)]/50 ku:bg-violet-50/80 ku:dark:bg-violet-950/30" : "ku:border-gray-300 ku:bg-white ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(c) {
      if (n.multiple) {
        const u = Array.isArray(n.modelValue) ? [...n.modelValue] : [], d = u.indexOf(c.value);
        d >= 0 ? u.splice(d, 1) : u.push(c.value), a("ku:update:modelValue", u);
        return;
      }
      a("ku:update:modelValue", c.value);
    }
    return (c, u) => (b(), w("div", {
      class: "ku:font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", o5, [
        (b(!0), w(q, null, et(e.items, (d) => (b(), w("button", {
          key: d.value,
          type: "button",
          class: H(i(d)),
          "aria-checked": o(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          r("span", l5, [
            o(d) ? (b(), w("span", r5)) : O("", !0)
          ]),
          d.dotColor ? (b(), w("span", {
            key: 0,
            class: "ku:h-2 ku:w-2 ku:shrink-0 ku:rounded-full",
            style: gt({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", c5, A(d.label), 1)
        ], 10, i5))), 128))
      ])
    ], 8, s5));
  }
}), d5 = ["aria-label"], h5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], f5 = { class: "ku:truncate ku:px-3 ku:py-2 ku:text-sm ku:font-medium" }, g5 = /* @__PURE__ */ Q({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Yt()}`, o = (m) => `${s}-seg-${m}`, i = nt([]);
    function l(m, v) {
      m instanceof HTMLButtonElement ? i.value[v] = m : i.value[v] = null;
    }
    function c(m) {
      return m.value === n.modelValue;
    }
    function u(m) {
      const v = c(m), g = "ku:flex ku:min-w-0 ku:flex-1 ku:cursor-pointer ku:items-center ku:justify-center ku:rounded-md ku:outline-none ku:transition-colors ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:focus-visible:ring-offset-2 ku:focus-visible:ring-offset-white ku:dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return m.disabled ? `${g} cursor-not-allowed opacity-40` : v ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(m) {
      m.disabled || m.value !== n.modelValue && a("ku:update:modelValue", m.value);
    }
    function h(m, v, g) {
      d(m), Rt(() => i.value[v]?.focus());
    }
    const p = D(
      () => n.items.map((m, v) => m.disabled ? -1 : v).filter((m) => m >= 0)
    );
    function _(m, v) {
      const g = n.items.length;
      if (g === 0) return 0;
      let f = m;
      for (let y = 0; y < g; y++)
        if (f = (f + v + g) % g, !n.items[f]?.disabled) return f;
      return m;
    }
    function k(m, v) {
      if (m.key === "ArrowRight" || m.key === "ArrowDown") {
        m.preventDefault();
        const g = _(v, 1), f = n.items[g];
        f && d(f), Rt(() => i.value[g]?.focus());
      } else if (m.key === "ArrowLeft" || m.key === "ArrowUp") {
        m.preventDefault();
        const g = _(v, -1), f = n.items[g];
        f && d(f), Rt(() => i.value[g]?.focus());
      } else if (m.key === "Home") {
        m.preventDefault();
        const g = p.value[0];
        if (g !== void 0) {
          const f = n.items[g];
          f && d(f), Rt(() => i.value[g]?.focus());
        }
      } else if (m.key === "End") {
        m.preventDefault();
        const g = p.value[p.value.length - 1];
        if (g !== void 0) {
          const f = n.items[g];
          f && d(f), Rt(() => i.value[g]?.focus());
        }
      }
    }
    return (m, v) => (b(), w("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "ku:inline-flex ku:w-full ku:max-w-full ku:rounded-lg ku:border ku:border-gray-300 ku:bg-transparent ku:p-0.5 ku:font-sans ku:dark:border-[color:var(--kiut-border-light)]"
    }, [
      (b(!0), w(q, null, et(e.items, (g, f) => (b(), w("button", {
        id: o(g.value),
        key: g.value,
        ref_for: !0,
        ref: (y) => l(y, f),
        type: "button",
        role: "tab",
        "aria-selected": c(g),
        "aria-disabled": g.disabled === !0,
        tabindex: c(g) ? 0 : -1,
        class: H(u(g)),
        onClick: (y) => h(g, f),
        onKeydown: (y) => k(y, f)
      }, [
        r("span", f5, A(g.label), 1)
      ], 42, h5))), 128))
    ], 8, d5));
  }
});
function Re(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function un(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function xe(e) {
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
function k5(e, t) {
  return la(e, t) >= 0;
}
function p5(e, t) {
  return la(e, t) <= 0;
}
function m5(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const b5 = [
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
], v5 = [
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
  return `${b5[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Oo(e) {
  return `${v5[e.getMonth()]} ${e.getFullYear()}`;
}
const y5 = ["aria-expanded", "aria-labelledby", "aria-label"], _5 = ["onKeydown"], x5 = { class: "ku:mb-4 ku:flex ku:items-center ku:justify-between ku:gap-2" }, w5 = { class: "ku:flex ku:min-w-0 ku:flex-1 ku:justify-center ku:gap-8 ku:text-center ku:text-sm ku:font-semibold ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100" }, C5 = { class: "ku:min-w-0 ku:truncate" }, $5 = { class: "ku:min-w-0 ku:truncate" }, M5 = { class: "ku:flex ku:flex-col ku:gap-6 ku:sm:flex-row ku:sm:gap-8" }, S5 = { class: "ku:mb-2 ku:grid ku:grid-cols-7 ku:gap-1 ku:text-center ku:text-[11px] ku:font-medium ku:uppercase ku:tracking-wide ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400" }, D5 = { class: "ku:grid ku:grid-cols-7 ku:gap-y-1" }, A5 = ["disabled", "onClick"], T5 = /* @__PURE__ */ Q({
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
  emits: ["ku:update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `${`kiut-drp-${Yt()}`}-lbl`, i = nt(null), l = nt(null), c = nt(!1), u = nt(null), d = nt(wa(/* @__PURE__ */ new Date())), h = D(() => {
      const $ = wa(d.value);
      return [$, Po($, 1)];
    }), p = D(() => n.ariaLabel ?? n.placeholder), _ = D(
      () => n.panelAlign === "end" ? "ku:right-0 ku:left-auto" : "ku:left-0 ku:right-auto"
    ), k = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], m = D(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const $ = Re(n.modelValue.start), L = Re(n.modelValue.end);
      return `${Ro($)} – ${Ro(L)}`;
    });
    function v($, L) {
      return $.getMonth() === L.getMonth() && $.getFullYear() === L.getFullYear();
    }
    function g($) {
      const L = xe($);
      if (n.minDate) {
        const T = xe(Re(n.minDate));
        if (Ca(L, T)) return !0;
      }
      if (n.maxDate) {
        const T = xe(Re(n.maxDate));
        if (Ca(T, L)) return !0;
      }
      return !1;
    }
    function f($, L) {
      const T = v(L, $), B = n.modelValue.start ? xe(Re(n.modelValue.start)) : null, E = n.modelValue.end ? xe(Re(n.modelValue.end)) : null, P = xe(L), N = T ? "ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100" : "ku:text-slate-400 ku:dark:text-slate-500";
      if (!B || !E)
        return `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const Y = k5(P, B) && p5(P, E), W = Io(P, B), J = Io(P, E);
      return W || J ? "ku:bg-[color:var(--kiut-primary)] ku:font-semibold ku:text-white ku:shadow-sm" : Y ? `${N} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function y($) {
      if (g($)) return;
      const L = xe($);
      if (!u.value) {
        u.value = new Date(L), a("ku:update:modelValue", { start: un(L), end: un(L) });
        return;
      }
      let B = xe(u.value), E = new Date(L);
      Ca(E, B) && ([B, E] = [E, B]), a("ku:update:modelValue", { start: un(B), end: un(E) }), u.value = null, c.value = !1;
    }
    function x($) {
      d.value = Po(d.value, $);
    }
    function M() {
      c.value = !1;
    }
    function S($) {
      if ($?.stopPropagation(), !c.value) {
        if (c.value = !0, u.value = null, n.modelValue.start)
          try {
            d.value = wa(Re(n.modelValue.start));
          } catch {
          }
        Rt(() => l.value?.focus());
      }
    }
    function C($) {
      if (!c.value) return;
      const L = i.value;
      L && !L.contains($.target) && (c.value = !1);
    }
    return It(c, ($) => {
      $ && (u.value = null);
    }), oe(() => {
      document.addEventListener("click", C);
    }), Be(() => {
      document.removeEventListener("click", C);
    }), ($, L) => (b(), w("div", {
      ref_key: "rootRef",
      ref: i,
      class: "ku:relative ku:font-sans"
    }, [
      e.label ? (b(), w("label", {
        key: 0,
        id: o,
        class: H(F(ae))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        type: "button",
        class: H([F(ve), "ku:flex ku:w-full ku:items-center ku:gap-2 ku:text-left"]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onFocus: S,
        onClick: S
      }, [
        z(F(Vi), {
          class: "ku:h-5 ku:w-5 ku:shrink-0 ku:text-gray-500 ku:dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: H(["ku:min-w-0 ku:flex-1 ku:truncate", !e.modelValue.start || !e.modelValue.end ? "ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-500" : ""])
        }, A(m.value), 3)
      ], 42, y5),
      Zt(r("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: H([
          _.value,
          "ku:absolute ku:top-full ku:z-[120] ku:mt-2 ku:w-[min(calc(100vw-2rem),720px)] ku:max-w-[100vw] ku:rounded-2xl ku:border ku:border-gray-300 ku:bg-[color:var(--kiut-bg-secondary)] ku:p-4 ku:shadow-xl outline-none ku:dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: qn(ue(M, ["stop"]), ["escape"])
      }, [
        r("div", x5, [
          r("button", {
            type: "button",
            class: "ku:inline-flex ku:h-9 ku:w-9 ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:border ku:border-gray-300 ku:text-gray-600 ku:transition ku:hover:bg-black/[0.04] ku:focus-visible:outline ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/30 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:text-slate-300 ku:dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: L[0] || (L[0] = (T) => x(-1))
          }, [
            z(F(lk), {
              class: "ku:h-5 ku:w-5",
              "aria-hidden": "true"
            })
          ]),
          r("div", w5, [
            r("span", C5, A(F(Oo)(h.value[0])), 1),
            r("span", $5, A(F(Oo)(h.value[1])), 1)
          ]),
          r("button", {
            type: "button",
            class: "ku:inline-flex ku:h-9 ku:w-9 ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:border ku:border-gray-300 ku:text-gray-600 ku:transition ku:hover:bg-black/[0.04] ku:focus-visible:outline ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/30 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:text-slate-300 ku:dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: L[1] || (L[1] = (T) => x(1))
          }, [
            z(F(rk), {
              class: "ku:h-5 ku:w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        r("div", M5, [
          (b(!0), w(q, null, et(h.value, (T) => (b(), w("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "ku:min-w-0 ku:flex-1"
          }, [
            r("div", S5, [
              (b(), w(q, null, et(k, (B) => r("span", { key: B }, A(B), 1)), 64))
            ]),
            r("div", D5, [
              (b(!0), w(q, null, et(F(m5)(T), (B) => (b(), w("button", {
                key: F(un)(B),
                type: "button",
                disabled: g(B),
                class: H(["ku:relative ku:flex ku:h-9 ku:items-center ku:justify-center ku:rounded-lg ku:text-sm ku:outline-none ku:transition ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40", f(T, B)]),
                onClick: (E) => y(B)
              }, A(B.getDate()), 11, A5))), 128))
            ])
          ]))), 128))
        ])
      ], 42, _5), [
        [vn, c.value]
      ])
    ], 512));
  }
}), B5 = {
  key: 0,
  class: "group ku:relative ku:inline-flex ku:shrink-0"
}, L5 = ["type", "disabled", "aria-label"], F5 = {
  key: 1,
  class: "ku:min-w-0 ku:truncate"
}, E5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "ku:pointer-events-none ku:absolute ku:bottom-full ku:left-1/2 ku:z-50 ku:mb-2 ku:-translate-x-1/2 ku:whitespace-nowrap ku:rounded-lg ku:bg-white ku:px-3 ku:py-1.5 ku:font-sans ku:text-xs ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:opacity-0 ku:shadow-lg ku:shadow-slate-900/10 ku:ring-1 ku:ring-black/5 ku:transition-opacity ku:duration-150 ku:will-change-[opacity,visibility] ku:invisible ku:group-hover:visible ku:group-hover:opacity-100 ku:group-focus-within:visible ku:group-focus-within:opacity-100 ku:dark:bg-slate-800 ku:dark:text-slate-100 ku:dark:shadow-black/40 ku:dark:ring-white/10"
}, P5 = ["type", "disabled", "aria-label"], I5 = {
  key: 1,
  class: "ku:min-w-0 ku:truncate"
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
      const d = n["aria-label"];
      if (typeof d == "string" && d.length > 0) return d;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = D(() => {
      const d = n.type;
      return d === "submit" || d === "reset" || d === "button" ? d : "button";
    }), c = D(() => {
      const { class: d, type: h, "aria-label": p, ..._ } = n;
      return _;
    }), u = D(() => t.variant === "primary" ? [
      "ku:px-4 ku:py-2.5",
      "ku:bg-[color:var(--kiut-primary)] ku:text-white ku:shadow-sm",
      "ku:hover:bg-[color:var(--kiut-primary-hover)] ku:active:bg-[color:var(--kiut-primary-dark)]",
      "ku:dark:text-white ku:dark:hover:brightness-110 ku:dark:active:brightness-95"
    ] : t.variant === "secondary" ? [
      "ku:px-4 ku:py-2.5",
      "ku:border ku:border-slate-200 ku:bg-slate-50 ku:text-[color:var(--kiut-text-primary)]",
      "ku:hover:border-slate-300 ku:hover:bg-slate-100",
      "ku:active:bg-slate-200/80",
      "ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-slate-800/80 ku:dark:text-slate-100",
      "ku:dark:hover:border-white/[0.18] ku:dark:hover:bg-slate-800",
      "ku:dark:active:bg-slate-700/90"
    ] : t.tone === "danger" ? [
      "ku:h-9 ku:w-9 ku:min-h-9 ku:min-w-9 ku:shrink-0 ku:border-0 ku:bg-transparent ku:p-0 ku:shadow-none",
      "ku:text-red-600",
      "ku:hover:bg-red-600 ku:hover:text-white",
      "ku:active:bg-red-700 ku:active:text-white",
      "ku:dark:text-red-400 ku:dark:hover:bg-red-600 ku:dark:hover:text-white",
      "ku:dark:active:bg-red-700"
    ] : [
      "ku:h-9 ku:w-9 ku:min-h-9 ku:min-w-9 ku:shrink-0 ku:border-0 ku:bg-transparent ku:p-0 ku:shadow-none",
      "ku:text-[color:var(--kiut-text-primary)]",
      "ku:hover:bg-[color:var(--kiut-primary)] ku:hover:text-white",
      "ku:active:bg-[color:var(--kiut-primary-dark)] ku:active:text-white",
      "ku:dark:text-slate-200",
      "ku:dark:hover:bg-[color:var(--kiut-primary)] ku:dark:hover:text-white",
      "ku:dark:active:bg-[color:var(--kiut-primary-dark)]"
    ]);
    return (d, h) => a.value ? (b(), w("span", B5, [
      r("button", Un({
        type: l.value,
        class: ["ku:inline-flex ku:items-center ku:justify-center ku:gap-2 ku:rounded-xl ku:font-sans ku:text-sm ku:font-semibold ku:tracking-tight ku:transition-colors ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:focus-visible:ring-offset-2 ku:disabled:pointer-events-none ku:disabled:opacity-45 ku:dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [u.value, F(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        d.$slots.icon ? (b(), w("span", {
          key: 0,
          class: H(["ku:inline-flex ku:shrink-0", s.value ? "ku:[&>svg]:size-4" : "ku:[&>svg]:h-[1.125rem] ku:[&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          $t(d.$slots, "icon")
        ], 2)) : O("", !0),
        o.value ? (b(), w("span", F5, [
          $t(d.$slots, "default")
        ])) : O("", !0)
      ], 16, L5),
      r("span", E5, A(e.tooltip), 1)
    ])) : (b(), w("button", Un({
      key: 1,
      type: l.value,
      class: ["ku:inline-flex ku:items-center ku:justify-center ku:gap-2 ku:rounded-xl ku:font-sans ku:text-sm ku:font-semibold ku:tracking-tight ku:transition-colors ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:focus-visible:ring-offset-2 ku:disabled:pointer-events-none ku:disabled:opacity-45 ku:dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [u.value, F(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      d.$slots.icon ? (b(), w("span", {
        key: 0,
        class: H(["ku:inline-flex ku:shrink-0", s.value ? "ku:[&>svg]:size-4" : "ku:[&>svg]:h-[1.125rem] ku:[&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        $t(d.$slots, "icon")
      ], 2)) : O("", !0),
      o.value ? (b(), w("span", I5, [
        $t(d.$slots, "default")
      ])) : O("", !0)
    ], 16, P5));
  }
}), R5 = {
  key: 0,
  class: "ku:fixed ku:inset-0 ku:z-[200] ku:flex ku:items-center ku:justify-center ku:p-4 ku:[font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, O5 = { class: "ku:min-w-0 ku:flex-1 ku:space-y-1" }, z5 = {
  key: 0,
  class: "ku:text-sm ku:leading-snug ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400"
}, V5 = { class: "ku:min-h-0 ku:flex-1 ku:overflow-y-auto ku:px-6 ku:py-6" }, N5 = { class: "ku:flex ku:shrink-0 ku:justify-end ku:gap-3 ku:px-6 ku:pb-6 ku:pt-2" }, j5 = /* @__PURE__ */ Q({
  name: "Modal",
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    subtitle: {},
    cancelLabel: { default: "Cancelar" },
    confirmLabel: { default: "Guardar" }
  },
  emits: ["ku:update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `${`kiut-modal-${Yt()}`}-title`, i = nt(null);
    function l() {
      a("cancel"), a("ku:update:modelValue", !1);
    }
    function c() {
      a("confirm");
    }
    function u(d) {
      n.modelValue && d.key === "Escape" && (d.preventDefault(), l());
    }
    return It(
      () => n.modelValue,
      (d) => {
        d && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), oe(() => {
      document.addEventListener("keydown", u);
    }), Be(() => {
      document.removeEventListener("keydown", u);
    }), (d, h) => (b(), K(Pa, { to: "body" }, [
      z(gn, { name: "kiut-modal" }, {
        default: I(() => [
          e.modelValue ? (b(), w("div", R5, [
            r("div", {
              class: "ku:absolute ku:inset-0 ku:bg-slate-900/50 ku:backdrop-blur-[2px] ku:dark:bg-black/60",
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
              class: "kiut-modal-panel ku:relative ku:z-10 ku:flex ku:max-h-[min(90vh,880px)] ku:w-full ku:max-w-lg ku:flex-col ku:overflow-hidden ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:shadow-[var(--kiut-shadow-card)] ku:dark:bg-[#252528] ku:dark:shadow-black/40",
              onClick: h[0] || (h[0] = ue(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: H(["ku:flex ku:shrink-0 ku:justify-between ku:gap-4 ku:border-b ku:border-slate-100 ku:bg-slate-50/50 ku:px-6 ku:py-5 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-white/[0.02]", e.subtitle ? "ku:items-start" : "ku:items-center"])
              }, [
                r("div", O5, [
                  r("h2", {
                    id: o,
                    class: "ku:text-xl ku:font-semibold ku:leading-tight ku:tracking-tight ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (b(), w("p", z5, A(e.subtitle), 1)) : O("", !0)
                ]),
                z(Kn, {
                  variant: "action",
                  type: "button",
                  class: "ku:shrink-0",
                  onClick: l
                }, {
                  icon: I(() => [
                    z(F(ji), { class: "ku:h-5 ku:w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              r("div", V5, [
                $t(d.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", N5, [
                z(Kn, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: I(() => [
                    vt(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                z(Kn, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: I(() => [
                    vt(A(e.confirmLabel), 1)
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
}), W5 = /* @__PURE__ */ at(j5, [["__scopeId", "data-v-9a1a621a"]]), H5 = { class: "ku:text-left ku:font-['Inter',system-ui,sans-serif]" }, Y5 = {
  key: 0,
  class: ""
}, K5 = {
  key: 0,
  class: "ku:flex ku:min-w-0 ku:flex-col ku:gap-1.5 ku:mb-4"
}, q5 = {
  key: 0,
  class: "ku:flex ku:min-w-0 ku:flex-1 ku:flex-wrap ku:items-center ku:gap-2"
}, U5 = {
  key: 1,
  class: "ku:flex ku:shrink-0 ku:flex-wrap ku:items-center ku:gap-2"
}, X5 = /* @__PURE__ */ Q({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Ea(), n = D(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (b(), w("section", H5, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (b(), w("header", Y5, [
        a.$slots.description ? (b(), w("div", K5, [
          $t(a.$slots, "description")
        ])) : O("", !0),
        a.$slots.filters || a.$slots.actions ? (b(), w("div", {
          key: 1,
          class: H(["ku:flex ku:flex-wrap ku:gap-2 ku:items-center", n.value])
        }, [
          a.$slots.filters ? (b(), w("div", q5, [
            $t(a.$slots, "filters")
          ])) : O("", !0),
          a.$slots.actions ? (b(), w("div", U5, [
            $t(a.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0)
      ])) : O("", !0),
      a.$slots.content || a.$slots.default ? (b(), w("div", {
        key: 1,
        class: H({
          "ku:mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        $t(a.$slots, "content", {}, () => [
          $t(a.$slots, "default")
        ])
      ], 2)) : O("", !0)
    ]));
  }
}), G5 = { class: "ku:flex ku:flex-1 ku:min-h-0" }, Z5 = {
  key: 0,
  class: "ku:flex ku:justify-center ku:items-center ku:my-4 ku:shrink-0"
}, Q5 = {
  class: "ku:flex-1 ku:overflow-y-auto ku:p-1 ku:flex ku:flex-col ku:gap-1",
  "aria-label": "Sections"
}, J5 = ["aria-current", "data-has-active", "title", "onClick"], tC = {
  key: 1,
  class: "footer-section ku:shrink-0 ku:border-t ku:[background-color:var(--kiut-lateral-bg)]"
}, eC = { class: "ku:px-4 ku:py-4 ku:shrink-0" }, nC = { class: "ku:text-[12px] ku:font-bold ku:uppercase ku:tracking-widest ku:text-start ku:[color:var(--kiut-text-subtitle)]" }, aC = {
  class: "ku:flex-1 ku:overflow-y-auto ku:px-1 ku:pb-3 ku:flex ku:flex-col ku:gap-0.5",
  "aria-label": "Section items"
}, sC = ["data-nav-id", "aria-current", "onClick"], oC = { class: "ku:flex ku:items-center ku:justify-between ku:px-5 ku:py-3 ku:shrink-0" }, iC = { class: "ku:text-xs ku:font-bold ku:uppercase ku:tracking-widest ku:[color:var(--kiut-text-muted)]" }, lC = {
  class: "ku:overflow-y-auto ku:flex-1 ku:px-3 ku:pb-5 ku:flex ku:flex-col ku:gap-1",
  "aria-label": "Section items"
}, rC = ["data-nav-id", "aria-current", "onClick"], cC = { class: "ku:truncate ku:text-[15px]" }, uC = ["aria-current", "data-has-active", "onClick"], dC = {
  key: 0,
  class: "ku:absolute ku:top-0 ku:w-1/2 ku:h-0.5 ku:rounded-full ku:[background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, hC = { class: "ku:text-[9px] ku:font-semibold ku:leading-none ku:truncate ku:w-full ku:text-center ku:px-0.5" }, fC = /* @__PURE__ */ Q({
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
    function u() {
      typeof window > "u" || (c.value = window.innerWidth < a.mobileBreakpoint);
    }
    oe(() => {
      u(), window.addEventListener("resize", u);
    }), Be(() => {
      window.removeEventListener("resize", u);
    });
    const d = D(() => {
      const g = a.sections.find((f) => f.id === a.selectedSectionId);
      return g?.items?.length ? g : null;
    });
    function h(g) {
      return a.activePath ? a.activePath === g.path || a.activePath.startsWith(g.path + "/") : !1;
    }
    function p(g) {
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
    function k(g, f) {
      s("navigate", { section: g, item: f });
    }
    function m() {
      s("update:selectedSectionId", null);
    }
    function v(g, f) {
      k(g, f), m();
    }
    return (g, f) => c.value ? (b(), w("div", Un({
      key: 1,
      class: "kiut-app-shell-nav ku:font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      z(gn, { name: "ksn-overlay" }, {
        default: I(() => [
          d.value ? (b(), w("div", {
            key: 0,
            class: "ku:fixed ku:inset-0 ku:bg-black/40 ku:z-40",
            "aria-hidden": "true",
            onClick: m
          })) : O("", !0)
        ]),
        _: 1
      }),
      z(gn, { name: "ksn-sheet" }, {
        default: I(() => [
          d.value ? (b(), w("div", {
            key: 0,
            class: "mobile-subsections ku:fixed ku:left-0 ku:right-0 ku:bottom-0 ku:z-50 ku:[background-color:var(--kiut-lateral-bg)] ku:rounded-t-2xl ku:shadow-2xl ku:border-t ku:max-h-[70vh] ku:flex ku:flex-col",
            style: gt({ paddingBottom: a.mobileBarHeight })
          }, [
            f[3] || (f[3] = r("div", { class: "ku:flex ku:justify-center ku:pt-3 ku:pb-1 ku:shrink-0" }, [
              r("div", { class: "ku:w-10 ku:h-1 ku:rounded-full ku:[background-color:var(--kiut-lateral-border-color)] ku:dark:bg-purple-500/30" })
            ], -1)),
            r("div", oC, [
              r("p", iC, A(d.value.label), 1),
              r("button", {
                type: "button",
                class: "ku:w-8 ku:h-8 ku:flex ku:items-center ku:justify-center ku:rounded-lg ku:[color:var(--kiut-text-muted)] ku:hover:bg-purple-50 ku:hover:text-purple-700 ku:dark:hover:bg-purple-500/20 ku:dark:hover:text-purple-300 ku:transition-colors",
                "aria-label": "Close",
                onClick: m
              }, [...f[2] || (f[2] = [
                r("svg", {
                  class: "ku:w-4 ku:h-4",
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
            r("nav", lC, [
              (b(!0), w(q, null, et(d.value.items, (y) => (b(), w("button", {
                key: y.id,
                type: "button",
                "data-nav-id": y.id,
                "aria-current": h(y) ? "page" : void 0,
                class: "ksn-item-btn group ku:flex ku:items-center ku:gap-3 ku:w-full ku:text-left ku:px-4 ku:rounded-xl ku:font-medium ku:transition-all ku:duration-200 ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[var(--kiut-primary)]/20 ku:min-h-[52px]",
                onClick: (x) => v(d.value, y)
              }, [
                y.icon ? (b(), K(Xe(y.icon), {
                  key: 0,
                  class: "ku:shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : O("", !0),
                r("span", cC, A(y.label), 1)
              ], 8, rC))), 128))
            ])
          ], 4)) : O("", !0)
        ]),
        _: 1
      }),
      r("nav", {
        class: "ksn-mobile-bar ku:fixed ku:bottom-0 ku:left-0 ku:right-0 ku:z-50 ku:border-t ku:flex ku:items-stretch ku:justify-around ku:overflow-hidden",
        style: gt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (b(!0), w(q, null, et(e.sections, (y) => (b(), w("button", {
          key: y.id,
          type: "button",
          "aria-current": e.selectedSectionId === y.id ? "true" : void 0,
          "data-has-active": p(y) ? "true" : void 0,
          class: "ksn-section-btn ku:relative ku:flex-1 ku:flex ku:flex-col ku:items-center ku:justify-center ku:gap-1 ku:py-1 ku:px-0.5 ku:min-w-0 ku:transition-colors ku:duration-200 ku:focus-visible:outline-2 ku:focus-visible:ring-2 ku:focus-visible:ring-inset",
          onClick: (x) => _(y)
        }, [
          e.selectedSectionId === y.id || p(y) ? (b(), w("span", dC)) : O("", !0),
          y.icon ? (b(), K(Xe(y.icon), {
            key: 1,
            class: "ku:shrink-0",
            style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          r("span", hC, A(y.label), 1)
        ], 8, uC))), 128))
      ], 4)
    ], 16)) : (b(), w("aside", Un({
      key: 0,
      class: "kiut-app-shell-nav ku:flex ku:flex-col ku:h-full ku:overflow-hidden ku:font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", G5, [
        r("div", {
          class: "primary-rail ku:flex ku:flex-col ku:shrink-0 ku:[background-color:var(--kiut-lateral-bg)] ku:border-r ku:justify-center",
          style: gt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: f[0] || (f[0] = (y) => n.value = !0),
          onMouseleave: f[1] || (f[1] = (y) => n.value = !1)
        }, [
          g.$slots.logo ? (b(), w("div", Z5, [
            $t(g.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : O("", !0),
          r("nav", Q5, [
            (b(!0), w(q, null, et(e.sections, (y) => (b(), w("button", {
              key: y.id,
              type: "button",
              "aria-current": e.selectedSectionId === y.id ? "true" : void 0,
              "data-has-active": p(y) ? "true" : void 0,
              title: y.label,
              class: "ksn-section-btn group ku:relative ku:flex ku:flex-row ku:items-center ku:justify-start ku:gap-1 ku:px-3 ku:py-2.5 ku:rounded-xl ku:transition-all ku:duration-200 ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (x) => _(y)
            }, [
              y.icon ? (b(), K(Xe(y.icon), {
                key: 0,
                class: "ku:shrink-0",
                style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : O("", !0),
              r("span", {
                class: "ku:leading-tight ku:font-semibold ku:tracking-wide ku:text-left ku:w-full ku:truncate ku:px-1 color-",
                style: gt({ fontSize: e.primaryFontSize })
              }, A(y.label), 5)
            ], 8, J5))), 128))
          ]),
          g.$slots.footer ? (b(), w("div", tC, [
            $t(g.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : O("", !0)
        ], 36),
        z(gn, { name: "ksn-sub" }, {
          default: I(() => [
            d.value ? (b(), w("div", {
              key: "secondary",
              class: "secondary-panel ku:flex ku:flex-col ku:shrink-0 ku:[background-color:var(--kiut-lateral-bg)] ku:border-r ku:[border-color:var(--kiut-lateral-border-color)] ku:overflow-hidden",
              style: gt({ width: e.secondaryWidth })
            }, [
              r("div", eC, [
                r("p", nC, A(d.value.label), 1)
              ]),
              r("nav", aC, [
                (b(!0), w(q, null, et(d.value.items, (y) => (b(), w("button", {
                  key: y.id,
                  type: "button",
                  "data-nav-id": y.id,
                  "aria-current": h(y) ? "page" : void 0,
                  class: "ksn-item-btn group ku:flex ku:items-center ku:gap-2.5 ku:w-full ku:text-left ku:px-3 ku:py-2.5 ku:rounded-lg ku:text-sm ku:font-medium ku:transition-all ku:duration-200 ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (x) => k(d.value, y)
                }, [
                  y.icon ? (b(), K(Xe(y.icon), {
                    key: 0,
                    style: gt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : O("", !0),
                  r("span", {
                    class: "ku:truncate",
                    style: gt({ fontSize: e.secondaryFontSize })
                  }, A(y.label), 5)
                ], 8, sC))), 128))
              ])
            ], 4)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), gC = /* @__PURE__ */ at(fC, [["__scopeId", "data-v-2bb0973e"]]), $C = {
  install(e) {
    e.component("KiutChartBar", pe), e.component("KiutChartLine", be), e.component("KiutPieChart", ia), e.component("KiutBoxplotChart", Qh), e.component("KiutCandlestickChart", Ri), e.component("KiutHistogramChart", Oi), e.component("KiutSankeyChart", Le), e.component("KiutAgentsPerDay", Ak), e.component("KiutBookingManager", op), e.component("KiutCheckin", Wi), e.component("KiutCheckinContainer", pm), e.component("KiutCheckinMetrics", Rp), e.component("KiutCheckinSegments", Yi), e.component("KiutDisruption", Pm), e.component("KiutFAQ", jm), e.component("KiutMessagesPerAgent", Qm), e.component("KiutRecordLocator", Hi), e.component("KiutSalesByChannel", Ki), e.component("KiutSeller", qi), e.component("KiutSellerContainer", V0), e.component("KiutTopAgents", U0), e.component("KiutPaymentMethod", pb), e.component("KiutAgentHumanConversations", kv), e.component("KiutChannelMetrics", $v), e.component("KiutTriageCombinations", Vv), e.component("KiutSelectLanguage", qv), e.component("KiutGuardrails", sy), e.component("KiutDisruptionNotifier", $y), e.component("KiutTotalConversationsCard", By), e.component("KiutCsatP95Card", Ry), e.component("KiutCSATContainer", m1), e.component("KiutAiGeneratedRevenueCard", $1), e.component("KiutHumanEscalations", z1), e.component("KiutHumanEscalationsCard", Y1), e.component("KiutNpsDailyMetrics", Gi), e.component("KiutNpsMetrics", Zi), e.component("KiutNpsOverviewMetrics", Xi), e.component("KiutAWSCost", e_), e.component("KiutCostUsage", h_), e.component("KiutTokenUsage", w_), e.component("KiutConversationCount", E_), e.component("KiutTopAgentsAnalysis", q_), e.component("KiutTopAgentsPie", ax), e.component("KiutDailyCostTrends", fx), e.component("KiutModelUsage", Dx), e.component("KiutMessageRoles", Ox), e.component("KiutCostPerConversations", Xx), e.component("Tabs", Qi), e.component("Table", Ui), e.component("Filters", D2), e.component("InputText", E2), e.component("InputTextarea", z2), e.component("InputFile", q2), e.component("InputDateTime", J2), e.component("InputTime", ow), e.component("InputRange", vw), e.component("InputNumber", Cw), e.component("InputColorPicker", Fw), e.component("Select", tl), e.component("MultiSelect", Kw), e.component("Toggle", Xw), e.component("InputPhone", a5), e.component("SelectablePills", u5), e.component("SegmentedControl", g5), e.component("DateRangePicker", T5), e.component("Tag", Nt), e.component("Button", Kn), e.component("Modal", W5), e.component("Section", X5), e.component("KiutAppShellNavigation", gC);
  }
};
export {
  e_ as AWSCost,
  kv as AgentHumanConversations,
  Ak as AgentsPerDay,
  $1 as AiGeneratedRevenueCard,
  gC as AppShellNavigation,
  op as BookingManager,
  Qh as BoxplotChart,
  Kn as Button,
  m1 as CSATContainer,
  Ri as CandlestickChart,
  $v as ChannelMetrics,
  pe as ChartBar,
  be as ChartLine,
  Wi as Checkin,
  pm as CheckinContainer,
  Rp as CheckinMetrics,
  Yi as CheckinSegments,
  E_ as ConversationCount,
  Xx as CostPerConversations,
  h_ as CostUsage,
  Ry as CsatP95Card,
  fx as DailyCostTrends,
  T5 as DateRangePicker,
  Pm as Disruption,
  $y as DisruptionNotifier,
  jm as FAQ,
  D2 as Filters,
  sy as Guardrails,
  Oi as HistogramChart,
  z1 as HumanEscalations,
  Y1 as HumanEscalationsCard,
  Fw as InputColorPicker,
  J2 as InputDateTime,
  q2 as InputFile,
  Cw as InputNumber,
  a5 as InputPhone,
  vw as InputRange,
  E2 as InputText,
  z2 as InputTextarea,
  ow as InputTime,
  $C as KiutUIPlugin,
  Ox as MessageRoles,
  Qm as MessagesPerAgent,
  W5 as Modal,
  Dx as ModelUsage,
  Kw as MultiSelect,
  Gi as NpsDailyMetrics,
  Zi as NpsMetrics,
  Xi as NpsOverviewMetrics,
  pb as PaymentMethod,
  ia as PieChart,
  Hi as RecordLocator,
  Ki as SalesByChannel,
  Le as SankeyChart,
  X5 as Section,
  g5 as SegmentedControl,
  tl as Select,
  qv as SelectLanguage,
  u5 as SelectablePills,
  qi as Seller,
  V0 as SellerContainer,
  Ui as Table,
  Qi as Tabs,
  Nt as Tag,
  Xw as Toggle,
  w_ as TokenUsage,
  U0 as TopAgents,
  q_ as TopAgentsAnalysis,
  ax as TopAgentsPie,
  By as TotalConversationsCard,
  Vv as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
