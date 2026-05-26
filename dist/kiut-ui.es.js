import { defineComponent as Z, shallowRef as No, h as Sa, ref as et, onMounted as Qt, onUnmounted as he, watch as Ft, toRaw as Da, nextTick as Ot, version as ol, isProxy as jo, computed as D, toRef as rt, openBlock as _, createElementBlock as w, createVNode as R, unref as F, createElementVNode as r, Fragment as K, renderList as nt, normalizeStyle as gt, normalizeClass as W, toDisplayString as A, createCommentVNode as V, onBeforeUnmount as Ho, createStaticVNode as ls, withDirectives as ae, vShow as xn, useSlots as Ea, renderSlot as $t, createBlock as tt, resolveDynamicComponent as Xe, withCtx as E, createSlots as Tt, createTextVNode as yt, vModelSelect as il, Transition as mn, Teleport as Ra, withModifiers as ue, withKeys as Xn, vModelText as Ge, useAttrs as aa, inject as Wo, mergeProps as Je } from "vue";
import * as rs from "echarts/core";
import { TooltipComponent as ll, TitleComponent as rl } from "echarts/components";
import { SankeyChart as cl } from "echarts/charts";
import { CanvasRenderer as dl } from "echarts/renderers";
import Rt from "moment";
function Tn(e) {
  return e + 0.5 | 0;
}
const Se = (e, t, n) => Math.max(Math.min(e, n), t);
function fn(e) {
  return Se(Tn(e * 2.55), 0, 255);
}
function Be(e) {
  return Se(Tn(e * 255), 0, 255);
}
function ve(e) {
  return Se(Tn(e / 2.55) / 100, 0, 1);
}
function cs(e) {
  return Se(Tn(e * 100), 0, 100);
}
const ee = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Aa = [..."0123456789ABCDEF"], ul = (e) => Aa[e & 15], hl = (e) => Aa[(e & 240) >> 4] + Aa[e & 15], Bn = (e) => (e & 240) >> 4 === (e & 15), fl = (e) => Bn(e.r) && Bn(e.g) && Bn(e.b) && Bn(e.a);
function gl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & ee[e[1]] * 17,
    g: 255 & ee[e[2]] * 17,
    b: 255 & ee[e[3]] * 17,
    a: t === 5 ? ee[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: ee[e[1]] << 4 | ee[e[2]],
    g: ee[e[3]] << 4 | ee[e[4]],
    b: ee[e[5]] << 4 | ee[e[6]],
    a: t === 9 ? ee[e[7]] << 4 | ee[e[8]] : 255
  })), n;
}
const pl = (e, t) => e < 255 ? t(e) : "";
function ml(e) {
  var t = fl(e) ? ul : hl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + pl(e.a, t) : void 0;
}
const bl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Yo(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function vl(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function yl(e, t, n) {
  const a = Yo(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function _l(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Oa(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let d, c, u;
  return o !== i && (u = o - i, c = l > 0.5 ? u / (2 - o - i) : u / (o + i), d = _l(n, a, s, u, o), d = d * 60 + 0.5), [d | 0, c || 0, l];
}
function Va(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Be);
}
function za(e, t, n) {
  return Va(Yo, e, t, n);
}
function xl(e, t, n) {
  return Va(yl, e, t, n);
}
function kl(e, t, n) {
  return Va(vl, e, t, n);
}
function Ko(e) {
  return (e % 360 + 360) % 360;
}
function wl(e) {
  const t = bl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? fn(+t[5]) : Be(+t[5]));
  const s = Ko(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = xl(s, o, i) : t[1] === "hsv" ? a = kl(s, o, i) : a = za(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Cl(e, t) {
  var n = Oa(e);
  n[0] = Ko(n[0] + t), n = za(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function $l(e) {
  if (!e)
    return;
  const t = Oa(e), n = t[0], a = cs(t[1]), s = cs(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${ve(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const ds = {
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
}, us = {
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
function Ml() {
  const e = {}, t = Object.keys(us), n = Object.keys(ds);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, ds[o]);
    o = parseInt(us[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Ln;
function Sl(e) {
  Ln || (Ln = Ml(), Ln.transparent = [0, 0, 0, 0]);
  const t = Ln[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Dl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Al(e) {
  const t = Dl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? fn(i) : Se(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? fn(a) : Se(a, 0, 255)), s = 255 & (t[4] ? fn(s) : Se(s, 0, 255)), o = 255 & (t[6] ? fn(o) : Se(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function Tl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${ve(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const da = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Ke = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Bl(e, t, n) {
  const a = Ke(ve(e.r)), s = Ke(ve(e.g)), o = Ke(ve(e.b));
  return {
    r: Be(da(a + n * (Ke(ve(t.r)) - a))),
    g: Be(da(s + n * (Ke(ve(t.g)) - s))),
    b: Be(da(o + n * (Ke(ve(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Fn(e, t, n) {
  if (e) {
    let a = Oa(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = za(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function qo(e, t) {
  return e && Object.assign(t || {}, e);
}
function hs(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Be(e[3]))) : (t = qo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Be(t.a)), t;
}
function Ll(e) {
  return e.charAt(0) === "r" ? Al(e) : wl(e);
}
class kn {
  constructor(t) {
    if (t instanceof kn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = hs(t) : n === "string" && (a = gl(t) || Sl(t) || Ll(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = qo(this._rgb);
    return t && (t.a = ve(t.a)), t;
  }
  set rgb(t) {
    this._rgb = hs(t);
  }
  rgbString() {
    return this._valid ? Tl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? ml(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? $l(this._rgb) : void 0;
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
    return t && (this._rgb = Bl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new kn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Be(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Tn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Fn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Fn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Fn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Fn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Cl(this._rgb, t), this;
  }
}
function pe() {
}
const Fl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function kt(e) {
  return e == null;
}
function Vt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function _t(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function se(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function le(e, t) {
  return se(e) ? e : t;
}
function ut(e, t) {
  return typeof e > "u" ? t : e;
}
const Il = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Uo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Dt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function wt(e, t, n, a) {
  let s, o, i;
  if (Vt(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (_t(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function Gn(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function Zn(e) {
  if (Vt(e))
    return e.map(Zn);
  if (_t(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = Zn(e[n[s]]);
    return t;
  }
  return e;
}
function Xo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Pl(e, t, n, a) {
  if (!Xo(e))
    return;
  const s = t[e], o = n[e];
  _t(s) && _t(o) ? wn(s, o, a) : t[e] = Zn(o);
}
function wn(e, t, n) {
  const a = Vt(t) ? t : [
    t
  ], s = a.length;
  if (!_t(e))
    return e;
  n = n || {};
  const o = n.merger || Pl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !_t(i))
      continue;
    const d = Object.keys(i);
    for (let c = 0, u = d.length; c < u; ++c)
      o(d[c], e, i, n);
  }
  return e;
}
function bn(e, t) {
  return wn(e, t, {
    merger: El
  });
}
function El(e, t, n) {
  if (!Xo(e))
    return;
  const a = t[e], s = n[e];
  _t(a) && _t(s) ? bn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Zn(s));
}
const fs = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Rl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Ol(e) {
  const t = Rl(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function He(e, t) {
  return (fs[t] || (fs[t] = Ol(t)))(e);
}
function Na(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Cn = (e) => typeof e < "u", Le = (e) => typeof e == "function", gs = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Vl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ct = Math.PI, Lt = 2 * Ct, zl = Lt + Ct, Qn = Number.POSITIVE_INFINITY, Nl = Ct / 180, zt = Ct / 2, Pe = Ct / 4, ps = Ct * 2 / 3, Go = Math.log10, de = Math.sign;
function vn(e, t, n) {
  return Math.abs(e - t) < n;
}
function ms(e) {
  const t = Math.round(e);
  e = vn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Go(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function jl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function Hl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function $n(e) {
  return !Hl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Wl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Yl(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ye(e) {
  return e * (Ct / 180);
}
function Kl(e) {
  return e * (180 / Ct);
}
function bs(e) {
  if (!se(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Zo(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * Ct && (o += Lt), {
    angle: o,
    distance: s
  };
}
function Ta(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function ql(e, t) {
  return (e - t + zl) % Lt - Ct;
}
function ie(e) {
  return (e % Lt + Lt) % Lt;
}
function Mn(e, t, n, a) {
  const s = ie(e), o = ie(t), i = ie(n), l = ie(o - s), d = ie(i - s), c = ie(s - o), u = ie(s - i);
  return s === o || s === i || a && o === i || l > d && c < u;
}
function Yt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Ul(e) {
  return Yt(e, -32768, 32767);
}
function De(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function ja(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const Ne = (e, t, n, a) => ja(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), Xl = (e, t, n) => ja(e, n, (a) => e[a][t] >= n);
function Gl(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const Qo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Zl(e, t) {
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
  }), Qo.forEach((n) => {
    const a = "_onData" + Na(n), s = e[n];
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
function vs(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (Qo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Jo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const ti = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ei(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, ti.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function Ql(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Ha = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Wt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, Jl = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function tr(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: d } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: m, minDefined: x, maxDefined: p } = i.getUserBounds();
    if (x) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Ne(d, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ne(t, u, i.getPixelForValue(h)).lo
      ), c) {
        const b = d.slice(0, s + 1).reverse().findIndex((y) => !kt(y[l.axis]));
        s -= Math.max(0, b);
      }
      s = Yt(s, 0, a - 1);
    }
    if (p) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        Ne(d, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ne(t, u, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const y = d.slice(b - 1).findIndex((g) => !kt(g[l.axis]));
        b += Math.max(0, y);
      }
      o = Yt(b, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function er(e) {
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
const In = (e) => e === 0 || e === 1, ys = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Lt / n)), _s = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Lt / n) + 1, yn = {
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
  easeInOutExpo: (e) => In(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => In(e) ? e : ys(e, 0.075, 0.3),
  easeOutElastic: (e) => In(e) ? e : _s(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return In(e) ? e : e < 0.5 ? 0.5 * ys(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * _s(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - yn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? yn.easeInBounce(e * 2) * 0.5 : yn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Wa(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function xs(e) {
  return Wa(e) ? e : new kn(e);
}
function ua(e) {
  return Wa(e) ? e : new kn(e).saturate(0.5).darken(0.1).hexString();
}
const nr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], ar = [
  "color",
  "borderColor",
  "backgroundColor"
];
function sr(e) {
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
      properties: ar
    },
    numbers: {
      type: "number",
      properties: nr
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
function or(e) {
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
const ks = /* @__PURE__ */ new Map();
function ir(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = ks.get(n);
  return a || (a = new Intl.NumberFormat(e, t), ks.set(n, a)), a;
}
function Ya(e, t, n) {
  return ir(t, n).format(e);
}
const lr = {
  values(e) {
    return Vt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = rr(e, n);
    }
    const i = Go(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), d = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(d, this.options.ticks.format), Ya(e, a, d);
  }
};
function rr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var ni = {
  formatters: lr
};
function cr(e) {
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
const We = /* @__PURE__ */ Object.create(null), Ba = /* @__PURE__ */ Object.create(null);
function _n(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ha(e, t, n) {
  return typeof t == "string" ? wn(_n(e, t), n) : wn(_n(e, ""), t);
}
class dr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => ua(s.backgroundColor), this.hoverBorderColor = (a, s) => ua(s.borderColor), this.hoverColor = (a, s) => ua(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return ha(this, t, n);
  }
  get(t) {
    return _n(this, t);
  }
  describe(t, n) {
    return ha(Ba, t, n);
  }
  override(t, n) {
    return ha(We, t, n);
  }
  route(t, n, a, s) {
    const o = _n(this, t), i = _n(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const d = this[l], c = i[s];
          return _t(d) ? Object.assign({}, c, d) : ut(d, c);
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
var Pt = /* @__PURE__ */ new dr({
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
  sr,
  or,
  cr
]);
function ur(e) {
  return !e || kt(e.size) || kt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function ws(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Ee(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function Cs(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function La(e, t, n, a) {
  ai(e, t, n, a, null);
}
function ai(e, t, n, a, s) {
  let o, i, l, d, c, u, h, m;
  const x = t.pointStyle, p = t.rotation, b = t.radius;
  let y = (p || 0) * Nl;
  if (x && typeof x == "object" && (o = x.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(y), e.drawImage(x, -x.width / 2, -x.height / 2, x.width, x.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), x) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, b, 0, 0, Lt) : e.arc(n, a, b, 0, Lt), e.closePath();
        break;
      case "triangle":
        u = s ? s / 2 : b, e.moveTo(n + Math.sin(y) * u, a - Math.cos(y) * b), y += ps, e.lineTo(n + Math.sin(y) * u, a - Math.cos(y) * b), y += ps, e.lineTo(n + Math.sin(y) * u, a - Math.cos(y) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, d = b - c, i = Math.cos(y + Pe) * d, h = Math.cos(y + Pe) * (s ? s / 2 - c : d), l = Math.sin(y + Pe) * d, m = Math.sin(y + Pe) * (s ? s / 2 - c : d), e.arc(n - h, a - l, c, y - Ct, y - zt), e.arc(n + m, a - i, c, y - zt, y), e.arc(n + h, a + l, c, y, y + zt), e.arc(n - m, a + i, c, y + zt, y + Ct), e.closePath();
        break;
      case "rect":
        if (!p) {
          d = Math.SQRT1_2 * b, u = s ? s / 2 : d, e.rect(n - u, a - d, 2 * u, 2 * d);
          break;
        }
        y += Pe;
      /* falls through */
      case "rectRot":
        h = Math.cos(y) * (s ? s / 2 : b), i = Math.cos(y) * b, l = Math.sin(y) * b, m = Math.sin(y) * (s ? s / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + m, a - i), e.lineTo(n + h, a + l), e.lineTo(n - m, a + i), e.closePath();
        break;
      case "crossRot":
        y += Pe;
      /* falls through */
      case "cross":
        h = Math.cos(y) * (s ? s / 2 : b), i = Math.cos(y) * b, l = Math.sin(y) * b, m = Math.sin(y) * (s ? s / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "star":
        h = Math.cos(y) * (s ? s / 2 : b), i = Math.cos(y) * b, l = Math.sin(y) * b, m = Math.sin(y) * (s ? s / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i), y += Pe, h = Math.cos(y) * (s ? s / 2 : b), i = Math.cos(y) * b, l = Math.sin(y) * b, m = Math.sin(y) * (s ? s / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(y) * b, l = Math.sin(y) * b, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(y) * (s ? s / 2 : b), a + Math.sin(y) * b);
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
function Ka(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function qa(e) {
  e.restore();
}
function hr(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function fr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function gr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), kt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function pr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, d = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, u = s.strikethrough ? (d + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function mr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Dn(e, t, n, a, s, o = {}) {
  const i = Vt(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let d, c;
  for (e.save(), e.font = s.string, gr(e, o), d = 0; d < i.length; ++d)
    c = i[d], o.backdrop && mr(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), kt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), pr(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function Jn(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ct, Ct, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Ct, zt, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, zt, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -zt, !0), e.lineTo(n + i.topLeft, a);
}
const br = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, vr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function yr(e, t) {
  const n = ("" + e).match(br);
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
const _r = (e) => +e || 0;
function Ua(e, t) {
  const n = {}, a = _t(t), s = a ? Object.keys(t) : t, o = _t(e) ? a ? (i) => ut(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = _r(o(i));
  return n;
}
function si(e) {
  return Ua(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ze(e) {
  return Ua(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function oe(e) {
  const t = si(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Kt(e, t) {
  e = e || {}, t = t || Pt.font;
  let n = ut(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = ut(e.style, t.style);
  a && !("" + a).match(vr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: ut(e.family, t.family),
    lineHeight: yr(ut(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: ut(e.weight, t.weight),
    string: ""
  };
  return s.string = ur(s), s;
}
function Pn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function xr(e, t, n) {
  const { min: a, max: s } = e, o = Uo(t, (s - a) / 2), i = (l, d) => n && l === 0 ? 0 : l + d;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function Ye(e, t) {
  return Object.assign(Object.create(e), t);
}
function Xa(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = ri("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => Xa([
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
      return ii(l, d, () => Ar(d, t, e, l));
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
      return Ms(l).includes(d);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Ms(l);
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
function tn(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: oi(e, a),
    setContext: (o) => tn(e, o, n, a),
    override: (o) => tn(e.override(o), t, n, a)
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
      return ii(o, i, () => wr(o, i, l));
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
function oi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Le(n) ? n : () => n,
    isIndexable: Le(a) ? a : () => a
  };
}
const kr = (e, t) => e ? e + Na(t) : t, Ga = (e, t) => _t(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ii(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function wr(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Le(l) && i.isScriptable(t) && (l = Cr(t, l, e, n)), Vt(l) && l.length && (l = $r(t, l, e, i.isIndexable)), Ga(t, l) && (l = tn(l, s, o && o[t], i)), l;
}
function Cr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let d = t(o, i || a);
  return l.delete(e), Ga(e, d) && (d = Za(s._scopes, s, e, d)), d;
}
function $r(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (_t(t[0])) {
    const d = t, c = s._scopes.filter((u) => u !== d);
    t = [];
    for (const u of d) {
      const h = Za(c, s, e, u);
      t.push(tn(h, o, i && i[e], l));
    }
  }
  return t;
}
function li(e, t, n) {
  return Le(e) ? e(t, n) : e;
}
const Mr = (e, t) => e === !0 ? t : typeof e == "string" ? He(t, e) : void 0;
function Sr(e, t, n, a, s) {
  for (const o of t) {
    const i = Mr(n, o);
    if (i) {
      e.add(i);
      const l = li(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function Za(e, t, n, a) {
  const s = t._rootScopes, o = li(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let d = $s(l, i, n, o || n, a);
  return d === null || typeof o < "u" && o !== n && (d = $s(l, i, o, d, a), d === null) ? !1 : Xa(Array.from(l), [
    ""
  ], s, o, () => Dr(t, n, a));
}
function $s(e, t, n, a, s) {
  for (; n; )
    n = Sr(e, t, n, a, s);
  return n;
}
function Dr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Vt(s) && _t(n) ? n : s || {};
}
function Ar(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = ri(kr(o, e), n), typeof s < "u")
      return Ga(e, s) ? Za(n, a, e, s) : s;
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
function Ms(e) {
  let t = e._keys;
  return t || (t = e._keys = Tr(e._scopes)), t;
}
function Tr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Br = Number.EPSILON || 1e-14, en = (e, t) => t < e.length && !e[t].skip && e[t], ci = (e) => e === "x" ? "y" : "x";
function Lr(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Ta(o, s), d = Ta(i, o);
  let c = l / (l + d), u = d / (l + d);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const h = a * c, m = a * u;
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
function Fr(e, t, n) {
  const a = e.length;
  let s, o, i, l, d, c = en(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (d = c, c = en(e, u + 1), !(!d || !c)) {
      if (vn(t[u], 0, Br)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      s = n[u] / t[u], o = n[u + 1] / t[u], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[u] = s * i * t[u], n[u + 1] = o * i * t[u]);
    }
}
function Ir(e, t, n = "x") {
  const a = ci(n), s = e.length;
  let o, i, l, d = en(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = l, l = d, d = en(e, c + 1), !l)
      continue;
    const u = l[n], h = l[a];
    i && (o = (u - i[n]) / 3, l[`cp1${n}`] = u - o, l[`cp1${a}`] = h - o * t[c]), d && (o = (d[n] - u) / 3, l[`cp2${n}`] = u + o, l[`cp2${a}`] = h + o * t[c]);
  }
}
function Pr(e, t = "x") {
  const n = ci(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, d, c = en(e, 0);
  for (i = 0; i < a; ++i)
    if (l = d, d = c, c = en(e, i + 1), !!d) {
      if (c) {
        const u = c[t] - d[t];
        s[i] = u !== 0 ? (c[n] - d[n]) / u : 0;
      }
      o[i] = l ? c ? de(s[i - 1]) !== de(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Fr(e, s, o), Ir(e, o, t);
}
function En(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Er(e, t) {
  let n, a, s, o, i, l = Sn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && Sn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = En(s.cp1x, t.left, t.right), s.cp1y = En(s.cp1y, t.top, t.bottom)), l && (s.cp2x = En(s.cp2x, t.left, t.right), s.cp2y = En(s.cp2y, t.top, t.bottom)));
}
function Rr(e, t, n, a, s) {
  let o, i, l, d;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Pr(e, s);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], d = Lr(c, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = d.previous.x, l.cp1y = d.previous.y, l.cp2x = d.next.x, l.cp2y = d.next.y, c = l;
  }
  t.capBezierPoints && Er(e, n);
}
function Qa() {
  return typeof window < "u" && typeof document < "u";
}
function Ja(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ta(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const sa = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Or(e, t) {
  return sa(e).getPropertyValue(t);
}
const Vr = [
  "top",
  "right",
  "bottom",
  "left"
];
function je(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = Vr[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const zr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Nr(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, d;
  if (zr(s, o, e.target))
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
function Ve(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = sa(n), o = s.boxSizing === "border-box", i = je(s, "padding"), l = je(s, "border", "width"), { x: d, y: c, box: u } = Nr(e, n), h = i.left + (u && l.left), m = i.top + (u && l.top);
  let { width: x, height: p } = t;
  return o && (x -= i.width + l.width, p -= i.height + l.height), {
    x: Math.round((d - h) / x * n.width / a),
    y: Math.round((c - m) / p * n.height / a)
  };
}
function jr(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && Ja(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = sa(o), d = je(l, "border", "width"), c = je(l, "padding");
      t = i.width - c.width - d.width, n = i.height - c.height - d.height, a = ta(l.maxWidth, o, "clientWidth"), s = ta(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || Qn,
    maxHeight: s || Qn
  };
}
const Ae = (e) => Math.round(e * 10) / 10;
function Hr(e, t, n, a) {
  const s = sa(e), o = je(s, "margin"), i = ta(s.maxWidth, e, "clientWidth") || Qn, l = ta(s.maxHeight, e, "clientHeight") || Qn, d = jr(e, t, n);
  let { width: c, height: u } = d;
  if (s.boxSizing === "content-box") {
    const m = je(s, "border", "width"), x = je(s, "padding");
    c -= x.width + m.width, u -= x.height + m.height;
  }
  return c = Math.max(0, c - o.width), u = Math.max(0, a ? c / a : u - o.height), c = Ae(Math.min(c, i, d.maxWidth)), u = Ae(Math.min(u, l, d.maxHeight)), c && !u && (u = Ae(c / 2)), (t !== void 0 || n !== void 0) && a && d.height && u > d.height && (u = d.height, c = Ae(Math.floor(u * a))), {
    width: c,
    height: u
  };
}
function Ss(e, t, n) {
  const a = t || 1, s = Ae(e.height * a), o = Ae(e.width * a);
  e.height = Ae(e.height), e.width = Ae(e.width);
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
    Qa() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ds(e, t) {
  const n = Or(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ze(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Yr(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Kr(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = ze(e, s, n), l = ze(s, o, n), d = ze(o, t, n), c = ze(i, l, n), u = ze(l, d, n);
  return ze(c, u, n);
}
const qr = function(e, t) {
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
}, Ur = function() {
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
function Qe(e, t, n) {
  return e ? qr(t, n) : Ur();
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
    between: Mn,
    compare: ql,
    normalize: ie
  } : {
    between: De,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function As({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function Xr(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = hi(a), d = t.length;
  let { start: c, end: u, loop: h } = e, m, x;
  if (h) {
    for (c += d, u += d, m = 0, x = d; m < x && i(l(t[c % d][a]), s, o); ++m)
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
function Gr(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: d, normalize: c } = hi(a), { start: u, end: h, loop: m, style: x } = Xr(e, t, n), p = [];
  let b = !1, y = null, g, f, v;
  const k = () => d(s, v, g) && l(s, v) !== 0, M = () => l(o, g) === 0 || d(o, v, g), S = () => b || k(), C = () => !b || M();
  for (let $ = u, L = u; $ <= h; ++$)
    f = t[$ % i], !f.skip && (g = c(f[a]), g !== v && (b = d(g, s, o), y === null && S() && (y = l(g, s) === 0 ? $ : L), y !== null && C() && (p.push(As({
      start: y,
      end: $,
      loop: m,
      count: i,
      style: x
    })), y = null), L = $, v = g));
  return y !== null && p.push(As({
    start: y,
    end: h,
    loop: m,
    count: i,
    style: x
  })), p;
}
function Zr(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = Gr(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function Qr(e, t, n, a) {
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
function Jr(e, t, n, a) {
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
function tc(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = Qr(n, s, o, a);
  if (a === !0)
    return Ts(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const d = l < i ? l + s : l, c = !!e._fullLoop && i === 0 && l === s - 1;
  return Ts(e, Jr(n, i, d, c), n, t);
}
function Ts(e, t, n, a) {
  return !a || !a.setContext || !n ? t : ec(e, t, n, a);
}
function ec(e, t, n, a) {
  const s = e._chart.getContext(), o = Bs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, d = n.length, c = [];
  let u = o, h = t[0].start, m = h;
  function x(p, b, y, g) {
    const f = l ? -1 : 1;
    if (p !== b) {
      for (p += d; n[p % d].skip; )
        p -= f;
      for (; n[b % d].skip; )
        b += f;
      p % d !== b % d && (c.push({
        start: p % d,
        end: b % d,
        loop: y,
        style: g
      }), u = g, h = b % d);
    }
  }
  for (const p of t) {
    h = l ? h : p.start;
    let b = n[h % d], y;
    for (m = h + 1; m <= p.end; m++) {
      const g = n[m % d];
      y = Bs(a.setContext(Ye(s, {
        type: "segment",
        p0: b,
        p1: g,
        p0DataIndex: (m - 1) % d,
        p1DataIndex: m % d,
        datasetIndex: i
      }))), nc(y, u) && x(h, m - 1, p.loop, u), b = g, u = y;
    }
    h < m - 1 && x(h, m - 1, p.loop, u);
  }
  return c;
}
function Bs(e) {
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
function nc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return Wa(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Rn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function ac(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Rn(n, t, "left"),
    right: Rn(n, t, "right"),
    top: Rn(a, t, "top"),
    bottom: Rn(a, t, "bottom")
  } : t;
}
function sc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = ac(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class oc {
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
    this._request || (this._running = !0, this._request = ti.call(window, () => {
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
var me = /* @__PURE__ */ new oc();
const Ls = "transparent", ic = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = xs(e || Ls), s = a.valid && xs(t || Ls);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class lc {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Pn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Pn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || ic[t.type || typeof i], this._easing = yn[t.easing] || yn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Pn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Pn([
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
class fi {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!_t(t))
      return;
    const n = Object.keys(Pt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!_t(o))
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
    const a = n.options, s = cc(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && rc(t.options.$animations, a).then(() => {
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
      const m = a.get(c);
      if (h)
        if (m && h.active()) {
          h.update(m, u, l);
          continue;
        } else
          h.cancel();
      if (!m || !m.duration) {
        t[c] = u;
        continue;
      }
      o[c] = h = new lc(m, t, c, u), s.push(h);
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
      return me.add(this._chart, a), !0;
  }
}
function rc(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function cc(e, t) {
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
function Fs(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function dc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Fs(e, n), s = Fs(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function uc(e) {
  let t, n, a, s;
  return _t(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function gi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Is(e, t, n, a = {}) {
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
    c = e.values[d], se(c) && (o || t === 0 || de(t) === de(c)) && (t += c);
  }
  return !u && !a.all ? 0 : t;
}
function hc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let d, c, u;
  for (d = 0, c = i.length; d < c; ++d)
    u = i[d], l[d] = {
      [s]: u,
      [o]: e[u]
    };
  return l;
}
function fa(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function fc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function gc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function pc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Ps(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function Es(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, d = o.axis, c = i.axis, u = fc(o, i, a), h = t.length;
  let m;
  for (let x = 0; x < h; ++x) {
    const p = t[x], { [d]: b, [c]: y } = p, g = p._stacks || (p._stacks = {});
    m = g[c] = pc(s, u, b), m[l] = y, m._top = Ps(m, i, !0, a.type), m._bottom = Ps(m, i, !1, a.type);
    const f = m._visualValues || (m._visualValues = {});
    f[l] = y;
  }
}
function ga(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function mc(e, t) {
  return Ye(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function bc(e, t, n) {
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
function an(e, t) {
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
const pa = (e) => e === "reset" || e === "none", Rs = (e, t) => t ? e : Object.assign({}, e), vc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: gi(n, !0),
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
    this.configure(), this.linkScales(), t._stacked = fa(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && an(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, m, x, p) => h === "x" ? m : h === "r" ? p : x, o = n.xAxisID = ut(a.xAxisID, ga(t, "x")), i = n.yAxisID = ut(a.yAxisID, ga(t, "y")), l = n.rAxisID = ut(a.rAxisID, ga(t, "r")), d = n.indexAxis, c = n.iAxisID = s(d, o, i, l), u = n.vAxisID = s(d, i, o, l);
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
    this._data && vs(this._data, this), t._stacked && an(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (_t(n)) {
      const s = this._cachedMeta;
      this._data = hc(n, s);
    } else if (a !== n) {
      if (a) {
        vs(a, this);
        const s = this._cachedMeta;
        an(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && Zl(n, this), this._syncList = [], this._data = n;
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
    n._stacked = fa(n.vScale, n), n.stack !== a.stack && (s = !0, an(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Es(this, n._parsed), n._stacked = fa(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let d = t === 0 && n === s.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], u, h, m;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, m = s;
    else {
      Vt(s[t]) ? m = this.parseArrayData(a, s, t, n) : _t(s[t]) ? m = this.parseObjectData(a, s, t, n) : m = this.parsePrimitiveData(a, s, t, n);
      const x = () => h[l] === null || c && h[l] < c[l];
      for (u = 0; u < n; ++u)
        a._parsed[u + t] = h = m[u], d && (x() && (d = !1), c = h);
      a._sorted = d;
    }
    i && Es(this, m);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, d = i.axis, c = o.getLabels(), u = o === i, h = new Array(s);
    let m, x, p;
    for (m = 0, x = s; m < x; ++m)
      p = m + a, h[m] = {
        [l]: u || o.parse(c[p], p),
        [d]: i.parse(n[p], p)
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
    let u, h, m, x;
    for (u = 0, h = s; u < h; ++u)
      m = u + a, x = n[m], c[u] = {
        x: o.parse(He(x, l), m),
        y: i.parse(He(x, d), m)
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
      keys: gi(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Is(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Is(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), d = vc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = gc(l);
    let m, x;
    function p() {
      x = s[m];
      const b = x[l.axis];
      return !se(x[t.axis]) || u > b || h < b;
    }
    for (m = 0; m < i && !(!p() && (this.updateRangeFromParsed(c, t, x, d), o)); ++m)
      ;
    if (o) {
      for (m = i - 1; m >= 0; --m)
        if (!p()) {
          this.updateRangeFromParsed(c, t, x, d);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let s, o, i;
    for (s = 0, o = n.length; s < o; ++s)
      i = n[s][t.axis], se(i) && a.push(i);
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
    this.update(t || "default"), n._clip = uc(ut(this.options.clip, dc(n.xScale, n.yScale, this.getMaxOverflow())));
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
      o = i.$context || (i.$context = bc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = mc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], d = this.enableOptionSharing && Cn(a);
    if (l)
      return Rs(l, d);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), u), x = Object.keys(Pt.elements[t]), p = () => this.getContext(a, s, n), b = c.resolveNamedOptions(m, x, p, h);
    return b.$shared && (b.$shared = d, o[i] = Object.freeze(Rs(b, d))), b;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let d;
    if (s.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, n), m = u.getOptionScopes(this.getDataset(), h);
      d = u.createResolver(m, this.getContext(t, a, n));
    }
    const c = new fi(s, d && d.animations);
    return d && d._cacheable && (o[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || pa(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    pa(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !pa(n) && this._resolveAnimations(void 0, n).update(t, a);
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
      a._stacked && an(a, s);
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
function yc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = Jo(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function _c(e) {
  const t = e.iScale, n = yc(t, e.type);
  let a = t._length, s, o, i, l;
  const d = () => {
    i === 32767 || i === -32768 || (Cn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), d();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), d();
  return a;
}
function xc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return kt(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function kc(e, t, n, a) {
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
function wc(e, t, n, a) {
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
function pi(e, t, n, a) {
  return Vt(e) ? wc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Os(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, d = [];
  let c, u, h, m;
  for (c = n, u = n + a; c < u; ++c)
    m = t[c], h = {}, h[s.axis] = l || s.parse(i[c], c), d.push(pi(m, h, o, c));
  return d;
}
function ma(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Cc(e, t, n) {
  return e !== 0 ? de(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function $c(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function Mc(e, t, n, a) {
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
  const { start: i, end: l, reverse: d, top: c, bottom: u } = $c(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = c : (n._bottom || 0) === a ? s = u : (o[Vs(u, i, l, d)] = !0, s = c)), o[Vs(s, i, l, d)] = !0, e.borderSkipped = o;
}
function Vs(e, t, n, a) {
  return a ? (e = Sc(e, t, n), e = zs(e, n, t)) : e = zs(e, t, n), e;
}
function Sc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function zs(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Dc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Ac extends oa {
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
    return Os(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return Os(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: d = "y" } = this._parsing, c = o.axis === "x" ? l : d, u = i.axis === "x" ? l : d, h = [];
    let m, x, p, b;
    for (m = a, x = a + s; m < x; ++m)
      b = n[m], p = {}, p[o.axis] = o.parse(He(b, c), m), h.push(pi(He(b, u), p, i, m));
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
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = ma(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, d = l.getBasePixel(), c = l.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: m } = this._getSharedOptions(n, s);
    for (let x = n; x < n + a; x++) {
      const p = this.getParsed(x), b = o || kt(p[l.axis]) ? {
        base: d,
        head: d
      } : this._calculateBarValuePixels(x), y = this._calculateBarIndexPixels(x, u), g = (p._stacks || {})[l.axis], f = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !g || ma(p._custom) || i === g._top || i === g._bottom,
        x: c ? b.head : y.center,
        y: c ? y.center : b.head,
        height: c ? y.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : y.size
      };
      m && (f.options = h || this.resolveDataElementOptions(x, t[x].active ? "active" : s));
      const v = f.options || t[x].options;
      Mc(f, v, g, i), Dc(f, v, u.ratio), this.updateElement(t[x], x, f, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), d = l && l[a.axis], c = (u) => {
      const h = u._parsed.find((x) => x[a.axis] === d), m = h && h[u.vScale.axis];
      if (kt(m) || isNaN(m))
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
      min: l || _c(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, d = this.getParsed(t), c = d._custom, u = ma(c);
    let h = d[n.axis], m = 0, x = a ? this.applyStack(n, d, a) : h, p, b;
    x !== h && (m = x - h, x = h), u && (h = c.barStart, x = c.barEnd - c.barStart, h !== 0 && de(h) !== de(c.barEnd) && (m = 0), m += h);
    const y = !kt(o) && !u ? o : m;
    let g = n.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? p = n.getPixelForValue(m + x) : p = g, b = p - g, Math.abs(b) < i) {
      b = Cc(b, n, l) * i, h === l && (g -= b / 2);
      const f = n.getPixelForDecimal(0), v = n.getPixelForDecimal(1), k = Math.min(f, v), M = Math.max(f, v);
      g = Math.max(Math.min(g, M), k), p = g + b, a && !u && (d._stacks[n.axis]._visualValues[s] = n.getValueForPixel(p) - n.getValueForPixel(g));
    }
    if (g === n.getPixelForValue(l)) {
      const f = de(b) * n.getLineWidthForValue(l) / 2;
      g += f, b -= f;
    }
    return {
      size: b,
      base: g,
      head: p,
      center: p + b / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = ut(s.maxBarThickness, 1 / 0);
    let l, d;
    const c = this._getAxisCount();
    if (n.grouped) {
      const u = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? kc(t, n, s, u * c) : xc(t, n, s, u * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, x = this._getAxis().indexOf(ut(m, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + x;
      l = h.start + h.chunk * p + h.chunk / 2, d = Math.min(i, h.chunk * h.ratio);
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
function Tc(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Lt) {
    const l = e, d = l + t, c = Math.cos(l), u = Math.sin(l), h = Math.cos(d), m = Math.sin(d), x = (v, k, M) => Mn(v, l, d, !0) ? 1 : Math.max(k, k * n, M, M * n), p = (v, k, M) => Mn(v, l, d, !0) ? -1 : Math.min(k, k * n, M, M * n), b = x(0, c, h), y = x(zt, u, m), g = p(Ct, c, h), f = p(Ct + zt, u, m);
    a = (b - g) / 2, s = (y - f) / 2, o = -(b + g) / 2, i = -(y + f) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Bc extends oa {
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
      if (_t(a[t])) {
        const { key: d = "value" } = this._parsing;
        o = (c) => +He(a[c], d);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ye(this.options.rotation - 90);
  }
  _getCircumference() {
    return ye(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Lt, n = -Lt;
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), d = Math.min(Il(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: m, ratioY: x, offsetX: p, offsetY: b } = Tc(h, u, d), y = (a.width - i) / m, g = (a.height - i) / x, f = Math.max(Math.min(y, g) / 2, 0), v = Uo(this.options.radius, f), k = Math.max(v * d, 0), M = (v - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * v, this.offsetY = b * v, s.total = this.calculateTotal(), this.outerRadius = v - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Lt);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, m = o && c.animateScale, x = m ? 0 : this.innerRadius, p = m ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: y } = this._getSharedOptions(n, s);
    let g = this._getRotation(), f;
    for (f = 0; f < n; ++f)
      g += this._circumference(f, o);
    for (f = n; f < n + a; ++f) {
      const v = this._circumference(f, o), k = t[f], M = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + v,
        circumference: v,
        outerRadius: p,
        innerRadius: x
      };
      y && (M.options = b || this.resolveDataElementOptions(f, k.active ? "active" : s)), g += v, this.updateElement(k, f, M, s);
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
    return n > 0 && !isNaN(t) ? Lt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = Ya(n._parsed[t], a.options.locale);
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
    return Math.max(ut(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Lc extends oa {
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
    let { start: l, count: d } = tr(n, s, i);
    this._drawStart = l, this._drawCount = d, er(n) && (l = 0, d = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, l, d, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: d, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(n, s), m = i.axis, x = l.axis, { spanGaps: p, segment: b } = this.options, y = $n(p) ? p : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || s === "none", f = n + a, v = t.length;
    let k = n > 0 && this.getParsed(n - 1);
    for (let M = 0; M < v; ++M) {
      const S = t[M], C = g ? S : {};
      if (M < n || M >= f) {
        C.skip = !0;
        continue;
      }
      const $ = this.getParsed(M), L = kt($[x]), T = C[m] = i.getPixelForValue($[m], M), B = C[x] = o || L ? l.getBasePixel() : l.getPixelForValue(d ? this.applyStack(l, $, d) : $[x], M);
      C.skip = isNaN(T) || isNaN(B) || L, C.stop = M > 0 && Math.abs($[m] - k[m]) > y, b && (C.parsed = $, C.raw = c.data[M]), h && (C.options = u || this.resolveDataElementOptions(M, S.active ? "active" : s)), g || this.updateElement(S, M, C, s), k = $;
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
class Fc extends Bc {
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
class ts {
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
    Object.assign(ts.prototype, t);
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
var Ic = {
  _date: ts
};
function Pc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const c = l._reversePixels ? Xl : Ne;
    if (a) {
      if (s._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const m = c(o, t, n - h), x = c(o, t, n + h);
          return {
            lo: m.lo,
            hi: x.hi
          };
        }
      }
    } else {
      const u = c(o, t, n);
      if (d) {
        const { vScale: h } = s._cachedMeta, { _parsed: m } = e, x = m.slice(0, u.lo + 1).reverse().findIndex((b) => !kt(b[h.axis]));
        u.lo -= Math.max(0, x);
        const p = m.slice(u.hi).findIndex((b) => !kt(b[h.axis]));
        u.hi += Math.max(0, p);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function ia(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, d = o.length; l < d; ++l) {
    const { index: c, data: u } = o[l], { lo: h, hi: m } = Pc(o[l], t, i, s);
    for (let x = h; x <= m; ++x) {
      const p = u[x];
      p.skip || a(p, c, x);
    }
  }
}
function Ec(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function ba(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || ia(e, n, t, function(l, d, c) {
    !s && !Sn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: d,
      index: c
    });
  }, !0), o;
}
function Rc(e, t, n, a) {
  let s = [];
  function o(i, l, d) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Zo(i, {
      x: t.x,
      y: t.y
    });
    Mn(h, c, u) && s.push({
      element: i,
      datasetIndex: l,
      index: d
    });
  }
  return ia(e, n, t, o), s;
}
function Oc(e, t, n, a, s, o) {
  let i = [];
  const l = Ec(n);
  let d = Number.POSITIVE_INFINITY;
  function c(u, h, m) {
    const x = u.inRange(t.x, t.y, s);
    if (a && !x)
      return;
    const p = u.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(p)) && !x)
      return;
    const y = l(t, p);
    y < d ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: m
      }
    ], d = y) : y === d && i.push({
      element: u,
      datasetIndex: h,
      index: m
    });
  }
  return ia(e, n, t, c), i;
}
function va(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Rc(e, t, n, s) : Oc(e, t, n, a, s, o);
}
function Ns(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return ia(e, n, t, (d, c, u) => {
    d[i] && d[i](t[n], s) && (o.push({
      element: d,
      datasetIndex: c,
      index: u
    }), l = l || d.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var Vc = {
  modes: {
    index(e, t, n, a) {
      const s = Ve(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? ba(e, s, o, a, i) : va(e, s, o, !1, a, i), d = [];
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
      const s = Ve(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? ba(e, s, o, a, i) : va(e, s, o, !1, a, i);
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
      const s = Ve(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return ba(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = Ve(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return va(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = Ve(t, e);
      return Ns(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = Ve(t, e);
      return Ns(e, s, "y", n.intersect, a);
    }
  }
};
const mi = [
  "left",
  "top",
  "right",
  "bottom"
];
function sn(e, t) {
  return e.filter((n) => n.pos === t);
}
function js(e, t) {
  return e.filter((n) => mi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function on(e, t) {
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
function Nc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !mi.includes(s))
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
function jc(e, t) {
  const n = Nc(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: d } = l.box, c = n[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * a : d && t.availableWidth, l.height = s) : (l.width = a, l.height = u ? u * s : d && t.availableHeight);
  }
  return n;
}
function Hc(e) {
  const t = zc(e), n = on(t.filter((c) => c.box.fullSize), !0), a = on(sn(t, "left"), !0), s = on(sn(t, "right")), o = on(sn(t, "top"), !0), i = on(sn(t, "bottom")), l = js(t, "x"), d = js(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(d).concat(i).concat(l),
    chartArea: sn(t, "chartArea"),
    vertical: a.concat(s).concat(d),
    horizontal: o.concat(i).concat(l)
  };
}
function Hs(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function bi(e, t) {
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
  o.getPadding && bi(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - Hs(i, e, "left", "right")), d = Math.max(0, t.outerHeight - Hs(i, e, "top", "bottom")), c = l !== e.w, u = d !== e.h;
  return e.w = l, e.h = d, n.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Yc(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Kc(e, t) {
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
function gn(e, t, n, a) {
  const s = [];
  let o, i, l, d, c, u;
  for (o = 0, i = e.length, c = 0; o < i; ++o) {
    l = e[o], d = l.box, d.update(l.width || t.w, l.height || t.h, Kc(l.horizontal, t));
    const { same: h, other: m } = Wc(t, n, l, a);
    c |= h && s.length, u = u || m, d.fullSize || s.push(l);
  }
  return c && gn(s, t, n, a) || u;
}
function On(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function Ws(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const d = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * u, m = c.size || d.height;
      Cn(c.start) && (i = c.start), d.fullSize ? On(d, s.left, i, n.outerWidth - s.right - s.left, m) : On(d, t.left + c.placed, i, h, m), c.start = i, c.placed += h, i = d.bottom;
    } else {
      const h = t.h * u, m = c.size || d.width;
      Cn(c.start) && (o = c.start), d.fullSize ? On(d, o, s.top, m, n.outerHeight - s.bottom - s.top) : On(d, o, t.top + c.placed, m, h), c.start = o, c.placed += h, o = d.right;
    }
  }
  t.x = o, t.y = i;
}
var ne = {
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
    const s = oe(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = Hc(e.boxes), d = l.vertical, c = l.horizontal;
    wt(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const u = d.reduce((b, y) => y.box.options && y.box.options.display === !1 ? b : b + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), m = Object.assign({}, s);
    bi(m, oe(a));
    const x = Object.assign({
      maxPadding: m,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), p = jc(d.concat(c), h);
    gn(l.fullSize, x, h, p), gn(d, x, h, p), gn(c, x, h, p) && gn(d, x, h, p), Yc(x), Ws(l.leftAndTop, x, h, p), x.x += x.w, x.y += x.h, Ws(l.rightAndBottom, x, h, p), e.chartArea = {
      left: x.left,
      top: x.top,
      right: x.left + x.w,
      bottom: x.top + x.h,
      height: x.h,
      width: x.w
    }, wt(l.chartArea, (b) => {
      const y = b.box;
      Object.assign(y, e.chartArea), y.update(x.w, x.h, {
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
class qc extends vi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Kn = "$chartjs", Uc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ys = (e) => e === null || e === "";
function Xc(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[Kn] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Ys(s)) {
    const o = Ds(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Ys(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ds(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const yi = Wr ? {
  passive: !0
} : !1;
function Gc(e, t, n) {
  e && e.addEventListener(t, n, yi);
}
function Zc(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, yi);
}
function Qc(e, t) {
  const n = Uc[e.type] || e.type, { x: a, y: s } = Ve(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function ea(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function Jc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ea(l.addedNodes, a), i = i && !ea(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function td(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ea(l.removedNodes, a), i = i && !ea(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const An = /* @__PURE__ */ new Map();
let Ks = 0;
function _i() {
  const e = window.devicePixelRatio;
  e !== Ks && (Ks = e, An.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function ed(e, t) {
  An.size || window.addEventListener("resize", _i), An.set(e, t);
}
function nd(e) {
  An.delete(e), An.size || window.removeEventListener("resize", _i);
}
function ad(e, t, n) {
  const a = e.canvas, s = a && Ja(a);
  if (!s)
    return;
  const o = ei((l, d) => {
    const c = s.clientWidth;
    n(l, d), c < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const d = l[0], c = d.contentRect.width, u = d.contentRect.height;
    c === 0 && u === 0 || o(c, u);
  });
  return i.observe(s), ed(e, o), i;
}
function ya(e, t, n) {
  n && n.disconnect(), t === "resize" && nd(e);
}
function sd(e, t, n) {
  const a = e.canvas, s = ei((o) => {
    e.ctx !== null && n(Qc(o, e));
  }, e);
  return Gc(a, t, s), s;
}
class od extends vi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Xc(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Kn])
      return !1;
    const a = n[Kn].initial;
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
    }), n.width = n.width, delete n[Kn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: Jc,
      detach: td,
      resize: ad
    }[n] || sd;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: ya,
      detach: ya,
      resize: ya
    }[n] || Zc)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return Hr(t, n, a, s);
  }
  isAttached(t) {
    const n = t && Ja(t);
    return !!(n && n.isConnected);
  }
}
function id(e) {
  return !Qa() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? qc : od;
}
let xe = class {
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
    return $n(this.x) && $n(this.y);
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
function ld(e, t) {
  const n = e.options.ticks, a = rd(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? dd(t) : [], i = o.length, l = o[0], d = o[i - 1], c = [];
  if (i > s)
    return ud(t, c, o, i / s), c;
  const u = cd(o, t, s);
  if (i > 0) {
    let h, m;
    const x = i > 1 ? Math.round((d - l) / (i - 1)) : null;
    for (Vn(t, c, u, kt(x) ? 0 : l - x, l), h = 0, m = i - 1; h < m; h++)
      Vn(t, c, u, o[h], o[h + 1]);
    return Vn(t, c, u, d, kt(x) ? t.length : d + x), c;
  }
  return Vn(t, c, u), c;
}
function rd(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function cd(e, t, n) {
  const a = hd(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = jl(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const d = o[i];
    if (d > s)
      return d;
  }
  return Math.max(s, 1);
}
function dd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function ud(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function Vn(e, t, n, a, s) {
  const o = ut(a, 0), i = Math.min(ut(s, e.length), e.length);
  let l = 0, d, c, u;
  for (n = Math.ceil(n), s && (d = s - a, n = d / Math.floor(d / n)), u = o; u < 0; )
    l++, u = Math.round(o + l * n);
  for (c = Math.max(o, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(o + l * n));
}
function hd(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const fd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, qs = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Us = (e, t) => Math.min(t || e, e);
function Xs(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function gd(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let d = e.getPixelForTick(s), c;
  if (!(n && (a === 1 ? c = Math.max(d - o, i - d) : t === 0 ? c = (e.getPixelForTick(1) - d) / 2 : c = (d - e.getPixelForTick(s - 1)) / 2, d += s < t ? c : -c, d < o - l || d > i + l)))
    return d;
}
function pd(e, t) {
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
function ln(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Gs(e, t) {
  if (!e.display)
    return 0;
  const n = Kt(e.font, t), a = oe(e.padding);
  return (Vt(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function md(e, t) {
  return Ye(e, {
    scale: t,
    type: "scale"
  });
}
function bd(e, t, n) {
  return Ye(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function vd(e, t, n) {
  let a = Ha(e);
  return (n && t !== "right" || !n && t === "right") && (a = fd(a)), a;
}
function yd(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: d } = e, { chartArea: c, scales: u } = d;
  let h = 0, m, x, p;
  const b = i - s, y = l - o;
  if (e.isHorizontal()) {
    if (x = Wt(a, o, l), _t(n)) {
      const g = Object.keys(n)[0], f = n[g];
      p = u[g].getPixelForValue(f) + b - t;
    } else n === "center" ? p = (c.bottom + c.top) / 2 + b - t : p = qs(e, n, t);
    m = l - o;
  } else {
    if (_t(n)) {
      const g = Object.keys(n)[0], f = n[g];
      x = u[g].getPixelForValue(f) - y + t;
    } else n === "center" ? x = (c.left + c.right) / 2 - y + t : x = qs(e, n, t);
    p = Wt(a, i, s), h = n === "left" ? -zt : zt;
  }
  return {
    titleX: x,
    titleY: p,
    maxWidth: m,
    rotation: h
  };
}
class nn extends xe {
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
    return t = le(t, Number.POSITIVE_INFINITY), n = le(n, Number.NEGATIVE_INFINITY), a = le(a, Number.POSITIVE_INFINITY), s = le(s, Number.NEGATIVE_INFINITY), {
      min: le(t, a),
      max: le(n, s),
      minDefined: se(t),
      maxDefined: se(n)
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
      min: le(n, le(a, n)),
      max: le(a, le(n, a))
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = xr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const d = l < this.ticks.length;
    this._convertTicksToLabels(d ? Xs(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = ld(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), d && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    const t = this.options, n = t.ticks, a = Us(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, d, c;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, m = u.highest.height, x = Yt(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : x / (a - 1), h + 6 > l && (l = x / (a - (t.offset ? 0.5 : 1)), d = this.maxHeight - ln(t.grid) - n.padding - Gs(t.title, this.chart.options.font), c = Math.sqrt(h * h + m * m), i = Kl(Math.min(Math.asin(Yt((u.highest.height + 6) / l, -1, 1)), Math.asin(Yt(d / c, -1, 1)) - Math.asin(Yt(m / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
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
      const d = Gs(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = ln(o) + d) : (t.height = this.maxHeight, t.width = ln(o) + d), a.display && this.ticks.length) {
        const { first: c, last: u, widest: h, highest: m } = this._getLabelSizes(), x = a.padding * 2, p = ye(this.labelRotation), b = Math.cos(p), y = Math.sin(p);
        if (l) {
          const g = a.mirror ? 0 : y * h.width + b * m.height;
          t.height = Math.min(this.maxHeight, t.height + g + x);
        } else {
          const g = a.mirror ? 0 : b * h.width + y * m.height;
          t.width = Math.min(this.maxWidth, t.width + g + x);
        }
        this._calculatePadding(c, u, y, b);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, d = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let m = 0, x = 0;
      d ? c ? (m = s * t.width, x = a * n.height) : (m = a * t.height, x = s * n.width) : o === "start" ? x = n.width : o === "end" ? m = t.width : o !== "inner" && (m = t.width / 2, x = n.width / 2), this.paddingLeft = Math.max((m - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((x - h + i) * this.width / (this.width - h), 0);
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
      n < a.length && (a = Xs(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], d = Math.floor(n / Us(n, a));
    let c = 0, u = 0, h, m, x, p, b, y, g, f, v, k, M;
    for (h = 0; h < n; h += d) {
      if (p = t[h].label, b = this._resolveTickFontOptions(h), s.font = y = b.string, g = o[y] = o[y] || {
        data: {},
        gc: []
      }, f = b.lineHeight, v = k = 0, !kt(p) && !Vt(p))
        v = ws(s, g.data, g.gc, v, p), k = f;
      else if (Vt(p))
        for (m = 0, x = p.length; m < x; ++m)
          M = p[m], !kt(M) && !Vt(M) && (v = ws(s, g.data, g.gc, v, M), k += f);
      i.push(v), l.push(k), c = Math.max(v, c), u = Math.max(k, u);
    }
    pd(o, n);
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
    return Ul(this._alignToPixels ? Ee(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = bd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = md(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = ye(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, d = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? d * a > l * s ? l / a : d / s : d * s < l * a ? d / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, d = o.offset, c = this.isHorizontal(), h = this.ticks.length + (d ? 1 : 0), m = ln(o), x = [], p = l.setContext(this.getContext()), b = p.display ? p.width : 0, y = b / 2, g = function(H) {
      return Ee(a, H, b);
    };
    let f, v, k, M, S, C, $, L, T, B, I, P;
    if (i === "top")
      f = g(this.bottom), C = this.bottom - m, L = f - y, B = g(t.top) + y, P = t.bottom;
    else if (i === "bottom")
      f = g(this.top), B = t.top, P = g(t.bottom) - y, C = f + y, L = this.top + m;
    else if (i === "left")
      f = g(this.right), S = this.right - m, $ = f - y, T = g(t.left) + y, I = t.right;
    else if (i === "right")
      f = g(this.left), T = t.left, I = g(t.right) - y, S = f + y, $ = this.left + m;
    else if (n === "x") {
      if (i === "center")
        f = g((t.top + t.bottom) / 2 + 0.5);
      else if (_t(i)) {
        const H = Object.keys(i)[0], Q = i[H];
        f = g(this.chart.scales[H].getPixelForValue(Q));
      }
      B = t.top, P = t.bottom, C = f + y, L = C + m;
    } else if (n === "y") {
      if (i === "center")
        f = g((t.left + t.right) / 2);
      else if (_t(i)) {
        const H = Object.keys(i)[0], Q = i[H];
        f = g(this.chart.scales[H].getPixelForValue(Q));
      }
      S = f - y, $ = S - m, T = t.left, I = t.right;
    }
    const N = ut(s.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / N));
    for (v = 0; v < h; v += Y) {
      const H = this.getContext(v), Q = o.setContext(H), J = l.setContext(H), lt = Q.lineWidth, vt = Q.color, pt = J.dash || [], ct = J.dashOffset, Mt = Q.tickWidth, st = Q.tickColor, Et = Q.tickBorderDash || [], At = Q.tickBorderDashOffset;
      k = gd(this, v, d), k !== void 0 && (M = Ee(a, k, lt), c ? S = $ = T = I = M : C = L = B = P = M, x.push({
        tx1: S,
        ty1: C,
        tx2: $,
        ty2: L,
        x1: T,
        y1: B,
        x2: I,
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
    return this._ticksLength = h, this._borderValue = f, x;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: d, crossAlign: c, padding: u, mirror: h } = o, m = ln(a.grid), x = m + u, p = h ? -u : x, b = -ye(this.labelRotation), y = [];
    let g, f, v, k, M, S, C, $, L, T, B, I, P = "middle";
    if (s === "top")
      S = this.bottom - p, C = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      S = this.top + p, C = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const Y = this._getYAxisLabelAlignment(m);
      C = Y.textAlign, M = Y.x;
    } else if (s === "right") {
      const Y = this._getYAxisLabelAlignment(m);
      C = Y.textAlign, M = Y.x;
    } else if (n === "x") {
      if (s === "center")
        S = (t.top + t.bottom) / 2 + x;
      else if (_t(s)) {
        const Y = Object.keys(s)[0], H = s[Y];
        S = this.chart.scales[Y].getPixelForValue(H) + x;
      }
      C = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        M = (t.left + t.right) / 2 - x;
      else if (_t(s)) {
        const Y = Object.keys(s)[0], H = s[Y];
        M = this.chart.scales[Y].getPixelForValue(H);
      }
      C = this._getYAxisLabelAlignment(m).textAlign;
    }
    n === "y" && (d === "start" ? P = "top" : d === "end" && (P = "bottom"));
    const N = this._getLabelSizes();
    for (g = 0, f = l.length; g < f; ++g) {
      v = l[g], k = v.label;
      const Y = o.setContext(this.getContext(g));
      $ = this.getPixelForTick(g) + o.labelOffset, L = this._resolveTickFontOptions(g), T = L.lineHeight, B = Vt(k) ? k.length : 1;
      const H = B / 2, Q = Y.color, J = Y.textStrokeColor, lt = Y.textStrokeWidth;
      let vt = C;
      i ? (M = $, C === "inner" && (g === f - 1 ? vt = this.options.reverse ? "left" : "right" : g === 0 ? vt = this.options.reverse ? "right" : "left" : vt = "center"), s === "top" ? c === "near" || b !== 0 ? I = -B * T + T / 2 : c === "center" ? I = -N.highest.height / 2 - H * T + T : I = -N.highest.height + T / 2 : c === "near" || b !== 0 ? I = T / 2 : c === "center" ? I = N.highest.height / 2 - H * T : I = N.highest.height - B * T, h && (I *= -1), b !== 0 && !Y.showLabelBackdrop && (M += T / 2 * Math.sin(b))) : (S = $, I = (1 - B) * T / 2);
      let pt;
      if (Y.showLabelBackdrop) {
        const ct = oe(Y.backdropPadding), Mt = N.heights[g], st = N.widths[g];
        let Et = I - ct.top, At = 0 - ct.left;
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
        pt = {
          left: At,
          top: Et,
          width: st + ct.width,
          height: Mt + ct.height,
          color: Y.backdropColor
        };
      }
      y.push({
        label: k,
        font: L,
        textOffset: I,
        options: {
          rotation: b,
          color: Q,
          strokeColor: J,
          strokeWidth: lt,
          textAlign: vt,
          textBaseline: P,
          translation: [
            M,
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
    if (-ye(this.labelRotation))
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
    let c, u, h, m;
    this.isHorizontal() ? (c = Ee(t, this.left, i) - i / 2, u = Ee(t, this.right, l) + l / 2, h = m = d) : (h = Ee(t, this.top, i) - i / 2, m = Ee(t, this.bottom, l) + l / 2, c = u = d), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(c, h), n.lineTo(u, m), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && Ka(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, d = i.font, c = i.label, u = i.textOffset;
      Dn(a, c, 0, u, d, l);
    }
    s && qa(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Kt(a.font), i = oe(a.padding), l = a.align;
    let d = o.lineHeight / 2;
    n === "bottom" || n === "center" || _t(n) ? (d += i.bottom, Vt(a.text) && (d += o.lineHeight * (a.text.length - 1))) : d += i.top;
    const { titleX: c, titleY: u, maxWidth: h, rotation: m } = yd(this, d, n, l);
    Dn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: m,
      textAlign: vd(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = ut(t.grid && t.grid.z, -1), s = ut(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== nn.prototype.draw ? [
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
    return Kt(n.font);
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
    kd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, _d(t, i, a), this.override && Pt.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in Pt[s] && (delete Pt[s][a], this.override && delete We[a]);
  }
}
function _d(e, t, n) {
  const a = wn(/* @__PURE__ */ Object.create(null), [
    n ? Pt.get(n) : {},
    Pt.get(t),
    e.defaults
  ]);
  Pt.set(t, a), e.defaultRoutes && xd(t, e.defaultRoutes), e.descriptors && Pt.describe(t, e.descriptors);
}
function xd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), d = i.join(".");
    Pt.route(o, s, d, l);
  });
}
function kd(e) {
  return "id" in e && "defaults" in e;
}
class wd {
  constructor() {
    this.controllers = new zn(oa, "datasets", !0), this.elements = new zn(xe, "elements"), this.plugins = new zn(Object, "plugins"), this.scales = new zn(nn, "scales"), this._typedRegistries = [
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
    const s = Na(t);
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
var ce = /* @__PURE__ */ new wd();
class Cd {
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
      if (Dt(l, d, i) === !1 && s.cancelable)
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
    const a = t && t.config, s = ut(a.options && a.options.plugins, {}), o = $d(a);
    return s === !1 && !n ? [] : Sd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((d) => l.plugin.id === d.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function $d(e) {
  const t = {}, n = [], a = Object.keys(ce.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(ce.getPlugin(a[o]));
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
function Md(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Sd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const d = l.id, c = Md(a[d], s);
    c !== null && o.push({
      plugin: l,
      options: Dd(e.config, {
        plugin: l,
        local: n[d]
      }, c, i)
    });
  }
  return o;
}
function Dd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Fa(e, t) {
  const n = Pt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Ad(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Td(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Zs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Bd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Ia(e, ...t) {
  if (Zs(e))
    return e;
  for (const n of t) {
    const a = n.axis || Bd(n.position) || e.length > 1 && Zs(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Qs(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Ld(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return Qs(e, "x", n[0]) || Qs(e, "y", n[0]);
  }
  return {};
}
function Fd(e, t) {
  const n = We[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Fa(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!_t(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const d = Ia(i, l, Ld(i, e), Pt.scales[l.type]), c = Td(d, s), u = n.scales || {};
    o[i] = bn(/* @__PURE__ */ Object.create(null), [
      {
        axis: d
      },
      l,
      u[d],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, d = i.indexAxis || Fa(l, t), u = (We[l] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const m = Ad(h, d), x = i[m + "AxisID"] || m;
      o[x] = o[x] || /* @__PURE__ */ Object.create(null), bn(o[x], [
        {
          axis: m
        },
        a[x],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    bn(l, [
      Pt.scales[l.type],
      Pt.scale
    ]);
  }), o;
}
function xi(e) {
  const t = e.options || (e.options = {});
  t.plugins = ut(t.plugins, {}), t.scales = Fd(e, t);
}
function ki(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Id(e) {
  return e = e || {}, e.data = ki(e.data), xi(e), e;
}
const Js = /* @__PURE__ */ new Map(), wi = /* @__PURE__ */ new Set();
function Nn(e, t) {
  let n = Js.get(e);
  return n || (n = t(), Js.set(e, n), wi.add(n)), n;
}
const rn = (e, t, n) => {
  const a = He(t, n);
  a !== void 0 && e.add(a);
};
class Pd {
  constructor(t) {
    this._config = Id(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    return Nn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return Nn(`${t}.transition.${n}`, () => [
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
    return Nn(`${t}-${n}`, () => [
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
    return Nn(`${a}-plugin-${n}`, () => [
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
      t && (d.add(t), u.forEach((h) => rn(d, t, h))), u.forEach((h) => rn(d, s, h)), u.forEach((h) => rn(d, We[o] || {}, h)), u.forEach((h) => rn(d, Pt, h)), u.forEach((h) => rn(d, Ba, h));
    });
    const c = Array.from(d);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), wi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      We[n] || {},
      Pt.datasets[n] || {},
      {
        type: n
      },
      Pt,
      Ba
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = to(this._resolverCache, t, s);
    let d = i;
    if (Rd(i, n)) {
      o.$shared = !1, a = Le(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      d = tn(i, a, c);
    }
    for (const c of n)
      o[c] = d[c];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = to(this._resolverCache, t, a);
    return _t(n) ? tn(o, n, void 0, s) : o;
  }
}
function to(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: Xa(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const Ed = (e) => _t(e) && Object.getOwnPropertyNames(e).some((t) => Le(e[t]));
function Rd(e, t) {
  const { isScriptable: n, isIndexable: a } = oi(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Le(l) || Ed(l)) || i && Vt(l))
      return !0;
  }
  return !1;
}
var Od = "4.5.1";
const Vd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function eo(e, t) {
  return e === "top" || e === "bottom" || Vd.indexOf(e) === -1 && t === "x";
}
function no(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function ao(e) {
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
function Ci(e) {
  return Qa() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const qn = {}, so = (e) => {
  const t = Ci(e);
  return Object.values(qn).filter((n) => n.canvas === t).pop();
};
function Nd(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function jd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Fe = class {
  static defaults = Pt;
  static instances = qn;
  static overrides = We;
  static registry = ce;
  static version = Od;
  static getChart = so;
  static register(...t) {
    ce.add(...t), oo();
  }
  static unregister(...t) {
    ce.remove(...t), oo();
  }
  constructor(t, n) {
    const a = this.config = new Pd(n), s = Ci(t), o = so(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || id(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), d = l && l.canvas, c = d && d.height, u = d && d.width;
    if (this.id = Fl(), this.ctx = l, this.canvas = d, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Cd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ql((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], qn[this.id] = this, !l || !d) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    me.listen(this, "complete", ao), me.listen(this, "progress", zd), this._initialize(), this.attached && this.update();
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
    return ce;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ss(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Cs(this.canvas, this.ctx), this;
  }
  stop() {
    return me.stop(this), this;
  }
  resize(t, n) {
    me.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), d = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Ss(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Dt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(d) && this.render());
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
      const l = n[i], d = Ia(i, l), c = d === "r", u = d === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), wt(o, (i) => {
      const l = i.options, d = l.id, c = Ia(d, l), u = ut(l.type, i.dtype);
      (l.position === void 0 || eo(l.position, c) !== eo(i.dposition)) && (l.position = i.dposition), s[d] = !0;
      let h = null;
      if (d in a && a[d].type === u)
        h = a[d];
      else {
        const m = ce.getScale(u);
        h = new m({
          id: d,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), wt(s, (i, l) => {
      i || delete a[l];
    }), wt(a, (i) => {
      ne.configure(this, i, i.options), ne.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(no("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Fa(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const d = ce.getController(l), { datasetElementType: c, dataElementType: u } = Pt.datasets[l];
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
      const { controller: h } = this.getDatasetMeta(c), m = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(m), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || wt(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(no("z", "_idx"));
    const { _active: l, _lastEvent: d } = this;
    d ? this._eventHandler(d, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    wt(this.scales, (t) => {
      ne.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!gs(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      Nd(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!gs(s, a(o)))
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
    ne.update(this, this.width, this.height, t);
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
        this._updateDataset(n, Le(t) ? t({
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
    }) !== !1 && (me.has(this) ? this.attached && !me.running(this) && me.start(this) : (this.draw(), ao({
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
    }, s = sc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && Ka(n, s), t.controller.draw(), s && qa(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Sn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = Vc.modes[n];
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
    Cn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), me.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Cs(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete qn[this.id], this.notifyPlugins("afterDestroy");
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
    }, s = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, s) === !1)
      return;
    const o = this._handleEvent(t, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, s), (o || a.changed) && this.render(), this;
  }
  _handleEvent(t, n, a) {
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), d = Vl(t), c = jd(t, this._lastEvent, a, d);
    a && (this._lastEvent = null, Dt(o.onHover, [
      t,
      l,
      this
    ], this), d && Dt(o.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Gn(l, s);
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
function oo() {
  return wt(Fe.instances, (e) => e._plugins.invalidate());
}
function Hd(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: d } = t, { borderWidth: c, borderJoinStyle: u } = d, h = Math.min(c / i, ie(a - n));
  if (e.beginPath(), e.arc(s, o, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const m = Math.min(c / l, ie(a - n));
    e.arc(s, o, l + c / 2, n - m / 2, a + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * ie(a - n));
    if (u === "round")
      e.arc(s, o, m, n - Ct / 2, a + Ct / 2, !0);
    else if (u === "bevel") {
      const x = 2 * m * m, p = -x * Math.cos(n + Ct / 2) + s, b = -x * Math.sin(n + Ct / 2) + o, y = x * Math.cos(a + Ct / 2) + s, g = x * Math.sin(a + Ct / 2) + o;
      e.lineTo(p, b), e.lineTo(y, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Wd(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: d } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), d > s ? (c = s / d, e.arc(o, i, d, n + c, a - c, !0)) : e.arc(o, i, s, n + zt, a - zt), e.closePath(), e.clip();
}
function Yd(e) {
  return Ua(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Kd(e, t, n, a) {
  const s = Yd(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (d) => {
    const c = (n - Math.min(o, d)) * a / 2;
    return Yt(d, 0, Math.min(o, c));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Yt(s.innerStart, 0, i),
    innerEnd: Yt(s.innerEnd, 0, i)
  };
}
function qe(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function na(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: d, pixelMargin: c, innerRadius: u } = t, h = Math.max(t.outerRadius + a + n - c, 0), m = u > 0 ? u + a + n + c : 0;
  let x = 0;
  const p = s - d;
  if (a) {
    const Y = u > 0 ? u - a : 0, H = h > 0 ? h - a : 0, Q = (Y + H) / 2, J = Q !== 0 ? p * Q / (Q + a) : p;
    x = (p - J) / 2;
  }
  const b = Math.max(1e-3, p * h - n / Ct) / h, y = (p - b) / 2, g = d + y + x, f = s - y - x, { outerStart: v, outerEnd: k, innerStart: M, innerEnd: S } = Kd(t, m, h, f - g), C = h - v, $ = h - k, L = g + v / C, T = f - k / $, B = m + M, I = m + S, P = g + M / B, N = f - S / I;
  if (e.beginPath(), o) {
    const Y = (L + T) / 2;
    if (e.arc(i, l, h, L, Y), e.arc(i, l, h, Y, T), k > 0) {
      const lt = qe($, T, i, l);
      e.arc(lt.x, lt.y, k, T, f + zt);
    }
    const H = qe(I, f, i, l);
    if (e.lineTo(H.x, H.y), S > 0) {
      const lt = qe(I, N, i, l);
      e.arc(lt.x, lt.y, S, f + zt, N + Math.PI);
    }
    const Q = (f - S / m + (g + M / m)) / 2;
    if (e.arc(i, l, m, f - S / m, Q, !0), e.arc(i, l, m, Q, g + M / m, !0), M > 0) {
      const lt = qe(B, P, i, l);
      e.arc(lt.x, lt.y, M, P + Math.PI, g - zt);
    }
    const J = qe(C, g, i, l);
    if (e.lineTo(J.x, J.y), v > 0) {
      const lt = qe(C, L, i, l);
      e.arc(lt.x, lt.y, v, g - zt, L);
    }
  } else {
    e.moveTo(i, l);
    const Y = Math.cos(L) * h + i, H = Math.sin(L) * h + l;
    e.lineTo(Y, H);
    const Q = Math.cos(T) * h + i, J = Math.sin(T) * h + l;
    e.lineTo(Q, J);
  }
  e.closePath();
}
function qd(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let d = t.endAngle;
  if (o) {
    na(e, t, n, a, d, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(l) || (d = i + (l % Lt || Lt));
  }
  return na(e, t, n, a, d, s), e.fill(), d;
}
function Ud(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: d } = t, { borderWidth: c, borderJoinStyle: u, borderDash: h, borderDashOffset: m, borderRadius: x } = d, p = d.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = m, p ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (o) {
    na(e, t, n, a, b, s);
    for (let y = 0; y < o; ++y)
      e.stroke();
    isNaN(l) || (b = i + (l % Lt || Lt));
  }
  p && Wd(e, t, b), d.selfJoin && b - i >= Ct && x === 0 && u !== "miter" && Hd(e, t, b), o || (na(e, t, n, a, b, s), e.stroke());
}
class Xd extends xe {
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
    ], a), { angle: o, distance: i } = Zo(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: d, innerRadius: c, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), m = (this.options.spacing + this.options.borderWidth) / 2, x = ut(h, d - l), p = Mn(o, l, d) && l !== d, b = x >= Lt || p, y = De(i, c + m, u + m);
    return b && y;
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
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Lt ? Math.floor(a / Lt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const d = 1 - Math.sin(Math.min(Ct, a || 0)), c = s * d;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, qd(t, this, c, o, i), Ud(t, this, c, o, i), t.restore();
  }
}
function $i(e, t, n = t) {
  e.lineCap = ut(n.borderCapStyle, t.borderCapStyle), e.setLineDash(ut(n.borderDash, t.borderDash)), e.lineDashOffset = ut(n.borderDashOffset, t.borderDashOffset), e.lineJoin = ut(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ut(n.borderWidth, t.borderWidth), e.strokeStyle = ut(n.borderColor, t.borderColor);
}
function Gd(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Zd(e) {
  return e.stepped ? hr : e.tension || e.cubicInterpolationMode === "monotone" ? fr : Gd;
}
function Mi(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, d = Math.max(s, i), c = Math.min(o, l), u = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: d,
    loop: t.loop,
    ilen: c < d && !u ? a + c - d : c - d
  };
}
function Qd(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: d, ilen: c } = Mi(s, n, a), u = Zd(o);
  let { move: h = !0, reverse: m } = a || {}, x, p, b;
  for (x = 0; x <= c; ++x)
    p = s[(l + (m ? c - x : x)) % i], !p.skip && (h ? (e.moveTo(p.x, p.y), h = !1) : u(e, b, p, m, o.stepped), b = p);
  return d && (p = s[(l + (m ? c : 0)) % i], u(e, b, p, m, o.stepped)), !!d;
}
function Jd(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Mi(s, n, a), { move: d = !0, reverse: c } = a || {};
  let u = 0, h = 0, m, x, p, b, y, g;
  const f = (k) => (i + (c ? l - k : k)) % o, v = () => {
    b !== y && (e.lineTo(u, y), e.lineTo(u, b), e.lineTo(u, g));
  };
  for (d && (x = s[f(0)], e.moveTo(x.x, x.y)), m = 0; m <= l; ++m) {
    if (x = s[f(m)], x.skip)
      continue;
    const k = x.x, M = x.y, S = k | 0;
    S === p ? (M < b ? b = M : M > y && (y = M), u = (h * u + k) / ++h) : (v(), e.lineTo(k, M), p = S, h = 0, b = y = M), g = M;
  }
  v();
}
function Pa(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Jd : Qd;
}
function tu(e) {
  return e.stepped ? Yr : e.tension || e.cubicInterpolationMode === "monotone" ? Kr : ze;
}
function eu(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), $i(e, t.options), e.stroke(s);
}
function nu(e, t, n, a) {
  const { segments: s, options: o } = t, i = Pa(t);
  for (const l of s)
    $i(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const au = typeof Path2D == "function";
function su(e, t, n, a) {
  au && !t.options.segment ? eu(e, t, n, a) : nu(e, t, n, a);
}
class ou extends xe {
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
      Rr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = tc(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = Zr(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], d = tu(a);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: h, end: m } = i[c], x = o[h], p = o[m];
      if (x === p) {
        l.push(x);
        continue;
      }
      const b = Math.abs((s - x[n]) / (p[n] - x[n])), y = d(x, p, b, a.stepped);
      y[n] = t[n], l.push(y);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Pa(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Pa(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), su(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function io(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class iu extends xe {
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
    return io(this, t, "x", n);
  }
  inYRange(t, n) {
    return io(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Sn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, La(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Si(e, t) {
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
function Te(e, t, n, a) {
  return e ? 0 : Yt(t, n, a);
}
function lu(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = si(a);
  return {
    t: Te(s.top, o.top, 0, n),
    r: Te(s.right, o.right, 0, t),
    b: Te(s.bottom, o.bottom, 0, n),
    l: Te(s.left, o.left, 0, t)
  };
}
function ru(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = Ze(s), i = Math.min(t, n), l = e.borderSkipped, d = a || _t(s);
  return {
    topLeft: Te(!d || l.top || l.left, o.topLeft, 0, i),
    topRight: Te(!d || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Te(!d || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Te(!d || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function cu(e) {
  const t = Si(e), n = t.right - t.left, a = t.bottom - t.top, s = lu(e, n / 2, a / 2), o = ru(e, n / 2, a / 2);
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
function _a(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && Si(e, a);
  return l && (s || De(t, l.left, l.right)) && (o || De(n, l.top, l.bottom));
}
function du(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function uu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function xa(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class hu extends xe {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = cu(this), l = du(i.radius) ? Jn : uu;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, xa(i, n, o)), t.clip(), l(t, xa(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, xa(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return _a(this, t, n, a);
  }
  inXRange(t, n) {
    return _a(this, t, null, n);
  }
  inYRange(t, n) {
    return _a(this, null, t, n);
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
const lo = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, fu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class ro extends xe {
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
    const a = t.labels, s = Kt(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: d } = lo(a, o);
    let c, u;
    n.font = s.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, o, l, d) + 10) : (u = this.maxHeight, c = this._fitCols(i, s, l, d) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, d = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let m = -1, x = -u;
    return this.legendItems.forEach((p, b) => {
      const y = a + n / 2 + o.measureText(p.text).width;
      (b === 0 || c[c.length - 1] + y + 2 * l > i) && (h += u, c[c.length - (b > 0 ? 0 : 1)] = 0, x += u, m++), d[b] = {
        left: 0,
        top: x,
        row: m,
        width: y,
        height: s
      }, c[c.length - 1] += y + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, d = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let h = l, m = 0, x = 0, p = 0, b = 0;
    return this.legendItems.forEach((y, g) => {
      const { itemWidth: f, itemHeight: v } = gu(a, n, o, y, s);
      g > 0 && x + v + 2 * l > u && (h += m + l, c.push({
        width: m,
        height: x
      }), p += m + l, b++, m = x = 0), d[g] = {
        left: p,
        top: x,
        col: b,
        width: f,
        height: v
      }, m = Math.max(m, f), x += v + l;
    }), h += m, c.push({
      width: m,
      height: x
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = Qe(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, d = Wt(a, this.left + s, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, d = Wt(a, this.left + s, this.right - this.lineWidths[l])), c.top += this.top + t + s, c.left = i.leftForLtr(i.x(d), c.width), d += c.width + s;
    } else {
      let l = 0, d = Wt(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, d = Wt(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), c.top = d, c.left += this.left + s, c.left = i.leftForLtr(i.x(c.left), c.width), d += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ka(t, this), this._draw(), qa(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = Pt.color, d = Qe(t.rtl, this.left, this.width), c = Kt(i.font), { padding: u } = i, h = c.size, m = h / 2;
    let x;
    this.drawTitle(), s.textAlign = d.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: p, boxHeight: b, itemHeight: y } = lo(i, h), g = function(S, C, $) {
      if (isNaN(p) || p <= 0 || isNaN(b) || b < 0)
        return;
      s.save();
      const L = ut($.lineWidth, 1);
      if (s.fillStyle = ut($.fillStyle, l), s.lineCap = ut($.lineCap, "butt"), s.lineDashOffset = ut($.lineDashOffset, 0), s.lineJoin = ut($.lineJoin, "miter"), s.lineWidth = L, s.strokeStyle = ut($.strokeStyle, l), s.setLineDash(ut($.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: $.pointStyle,
          rotation: $.rotation,
          borderWidth: L
        }, B = d.xPlus(S, p / 2), I = C + m;
        ai(s, T, B, I, i.pointStyleWidth && p);
      } else {
        const T = C + Math.max((h - b) / 2, 0), B = d.leftForLtr(S, p), I = Ze($.borderRadius);
        s.beginPath(), Object.values(I).some((P) => P !== 0) ? Jn(s, {
          x: B,
          y: T,
          w: p,
          h: b,
          radius: I
        }) : s.rect(B, T, p, b), s.fill(), L !== 0 && s.stroke();
      }
      s.restore();
    }, f = function(S, C, $) {
      Dn(s, $.text, S, C + y / 2, c, {
        strikethrough: $.hidden,
        textAlign: d.textAlign($.textAlign)
      });
    }, v = this.isHorizontal(), k = this._computeTitleHeight();
    v ? x = {
      x: Wt(o, this.left + u, this.right - a[0]),
      y: this.top + u + k,
      line: 0
    } : x = {
      x: this.left + u,
      y: Wt(o, this.top + k + u, this.bottom - n[0].height),
      line: 0
    }, di(this.ctx, t.textDirection);
    const M = y + u;
    this.legendItems.forEach((S, C) => {
      s.strokeStyle = S.fontColor, s.fillStyle = S.fontColor;
      const $ = s.measureText(S.text).width, L = d.textAlign(S.textAlign || (S.textAlign = i.textAlign)), T = p + m + $;
      let B = x.x, I = x.y;
      d.setWidth(this.width), v ? C > 0 && B + T + u > this.right && (I = x.y += M, x.line++, B = x.x = Wt(o, this.left + u, this.right - a[x.line])) : C > 0 && I + M > this.bottom && (B = x.x = B + n[x.line].width + u, x.line++, I = x.y = Wt(o, this.top + k + u, this.bottom - n[x.line].height));
      const P = d.x(B);
      if (g(P, I, S), B = Jl(L, B + p + m, v ? B + T : this.right, t.rtl), f(d.x(B), I, S), v)
        x.x += T + u;
      else if (typeof S.text != "string") {
        const N = c.lineHeight;
        x.y += Di(S, N) + u;
      } else
        x.y += M;
    }), ui(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Kt(n.font), s = oe(n.padding);
    if (!n.display)
      return;
    const o = Qe(t.rtl, this.left, this.width), i = this.ctx, l = n.position, d = a.size / 2, c = s.top + d;
    let u, h = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), u = this.top + c, h = Wt(t.align, h, this.right - m);
    else {
      const p = this.columnSizes.reduce((b, y) => Math.max(b, y.height), 0);
      u = c + Wt(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const x = Wt(l, h, h + m);
    i.textAlign = o.textAlign(Ha(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Dn(i, n.text, x, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Kt(t.font), a = oe(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (De(t, this.left, this.right) && De(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], De(t, s.left, s.left + s.width) && De(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!bu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = fu(s, a);
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
function gu(e, t, n, a, s) {
  const o = pu(a, e, t, n), i = mu(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function pu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function mu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Di(t, n)), a;
}
function Di(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function bu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var es = {
  id: "legend",
  _element: ro,
  start(e, t, n) {
    const a = e.legend = new ro({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ne.configure(e, a, n), ne.addBox(e, a);
  },
  stop(e) {
    ne.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ne.configure(e, a, n), a.options = n;
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
          const c = d.controller.getStyle(n ? 0 : void 0), u = oe(c.borderWidth);
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
class Ai extends xe {
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
    this._padding = oe(a.padding);
    const o = s * Kt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let d = 0, c, u, h;
    return this.isHorizontal() ? (u = Wt(l, a, o), h = n + t, c = o - a) : (i.position === "left" ? (u = a + t, h = Wt(l, s, n), d = Ct * -0.5) : (u = o - t, h = Wt(l, n, s), d = Ct * 0.5), c = s - n), {
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
    const a = Kt(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: d, rotation: c } = this._drawArgs(o);
    Dn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: d,
      rotation: c,
      textAlign: Ha(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function vu(e, t) {
  const n = new Ai({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ne.configure(e, n, t), ne.addBox(e, n), e.titleBlock = n;
}
var Ti = {
  id: "title",
  _element: Ai,
  start(e, t, n) {
    vu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ne.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ne.configure(e, a, n), a.options = n;
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
const pn = {
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
        const c = d.getCenterPoint(), u = Ta(t, c);
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
function re(e, t) {
  return t && (Vt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function be(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function yu(e, t) {
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
function co(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, d = Kt(t.bodyFont), c = Kt(t.titleFont), u = Kt(t.footerFont), h = o.length, m = s.length, x = a.length, p = oe(t.padding);
  let b = p.height, y = 0, g = a.reduce((k, M) => k + M.before.length + M.lines.length + M.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (b += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const k = t.displayColors ? Math.max(l, d.lineHeight) : d.lineHeight;
    b += x * k + (g - x) * d.lineHeight + (g - 1) * t.bodySpacing;
  }
  m && (b += t.footerMarginTop + m * u.lineHeight + (m - 1) * t.footerSpacing);
  let f = 0;
  const v = function(k) {
    y = Math.max(y, n.measureText(k).width + f);
  };
  return n.save(), n.font = c.string, wt(e.title, v), n.font = d.string, wt(e.beforeBody.concat(e.afterBody), v), f = t.displayColors ? i + 2 + t.boxPadding : 0, wt(a, (k) => {
    wt(k.before, v), wt(k.lines, v), wt(k.after, v);
  }), f = 0, n.font = u.string, wt(e.footer, v), n.restore(), y += p.width, {
    width: y,
    height: b
  };
}
function _u(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function xu(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function ku(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: d } } = e;
  let c = "center";
  return a === "center" ? c = s <= (l + d) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), xu(c, e, t, n) && (c = "center"), c;
}
function uo(e, t, n) {
  const a = n.yAlign || t.yAlign || _u(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || ku(e, t, n, a),
    yAlign: a
  };
}
function wu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Cu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function ho(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: d } = n, c = s + o, { topLeft: u, topRight: h, bottomLeft: m, bottomRight: x } = Ze(i);
  let p = wu(t, l);
  const b = Cu(t, d, c);
  return d === "center" ? l === "left" ? p += c : l === "right" && (p -= c) : l === "left" ? p -= Math.max(u, m) + s : l === "right" && (p += Math.max(h, x) + s), {
    x: Yt(p, 0, a.width - t.width),
    y: Yt(b, 0, a.height - t.height)
  };
}
function jn(e, t, n) {
  const a = oe(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function fo(e) {
  return re([], be(e));
}
function $u(e, t, n) {
  return Ye(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function go(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Bi = {
  beforeTitle: pe,
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
  afterTitle: pe,
  beforeBody: pe,
  beforeLabel: pe,
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
  afterLabel: pe,
  afterBody: pe,
  beforeFooter: pe,
  footer: pe,
  afterFooter: pe
};
function Ut(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Bi[t].call(n, a) : s;
}
class po extends xe {
  static positioners = pn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new fi(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = $u(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = Ut(a, "beforeTitle", this, t), o = Ut(a, "title", this, t), i = Ut(a, "afterTitle", this, t);
    let l = [];
    return l = re(l, be(s)), l = re(l, be(o)), l = re(l, be(i)), l;
  }
  getBeforeBody(t, n) {
    return fo(Ut(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return wt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = go(a, o);
      re(i.before, be(Ut(l, "beforeLabel", this, o))), re(i.lines, Ut(l, "label", this, o)), re(i.after, be(Ut(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return fo(Ut(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = Ut(a, "beforeFooter", this, t), o = Ut(a, "footer", this, t), i = Ut(a, "afterFooter", this, t);
    let l = [];
    return l = re(l, be(s)), l = re(l, be(o)), l = re(l, be(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], d, c;
    for (d = 0, c = n.length; d < c; ++d)
      l.push(yu(this.chart, n[d]));
    return t.filter && (l = l.filter((u, h, m) => t.filter(u, h, m, a))), t.itemSort && (l = l.sort((u, h) => t.itemSort(u, h, a))), wt(l, (u) => {
      const h = go(t.callbacks, u);
      s.push(Ut(h, "labelColor", this, u)), o.push(Ut(h, "labelPointStyle", this, u)), i.push(Ut(h, "labelTextColor", this, u));
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
      const l = pn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const d = this._size = co(this, a), c = Object.assign({}, l, d), u = uo(this.chart, a, c), h = ho(a, c, u, this.chart);
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: d, topRight: c, bottomLeft: u, bottomRight: h } = Ze(l), { x: m, y: x } = t, { width: p, height: b } = n;
    let y, g, f, v, k, M;
    return o === "center" ? (k = x + b / 2, s === "left" ? (y = m, g = y - i, v = k + i, M = k - i) : (y = m + p, g = y + i, v = k - i, M = k + i), f = y) : (s === "left" ? g = m + Math.max(d, u) + i : s === "right" ? g = m + p - Math.max(c, h) - i : g = this.caretX, o === "top" ? (v = x, k = v - i, y = g - i, f = g + i) : (v = x + b, k = v + i, y = g + i, f = g - i), M = v), {
      x1: y,
      x2: g,
      x3: f,
      y1: v,
      y2: k,
      y3: M
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, d;
    if (o) {
      const c = Qe(a.rtl, this.x, this.width);
      for (t.x = jn(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Kt(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, d = 0; d < o; ++d)
        n.fillText(s[d], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, d + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: d, boxWidth: c } = o, u = Kt(o.bodyFont), h = jn(this, "left", o), m = s.x(h), x = d < u.lineHeight ? (u.lineHeight - d) / 2 : 0, p = n.y + x;
    if (o.usePointStyle) {
      const b = {
        radius: Math.min(c, d) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, y = s.leftForLtr(m, c) + c / 2, g = p + d / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, La(t, b, y, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, La(t, b, y, g);
    } else {
      t.lineWidth = _t(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = s.leftForLtr(m, c), y = s.leftForLtr(s.xPlus(m, 1), c - 2), g = Ze(i.borderRadius);
      Object.values(g).some((f) => f !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Jn(t, {
        x: b,
        y: p,
        w: c,
        h: d,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Jn(t, {
        x: y,
        y: p + 1,
        w: c - 2,
        h: d - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(b, p, c, d), t.strokeRect(b, p, c, d), t.fillStyle = i.backgroundColor, t.fillRect(y, p + 1, c - 2, d - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: d, boxWidth: c, boxPadding: u } = a, h = Kt(a.bodyFont);
    let m = h.lineHeight, x = 0;
    const p = Qe(a.rtl, this.x, this.width), b = function($) {
      n.fillText($, p.x(t.x + x), t.y + m / 2), t.y += m + o;
    }, y = p.textAlign(i);
    let g, f, v, k, M, S, C;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = jn(this, y, a), n.fillStyle = a.bodyColor, wt(this.beforeBody, b), x = l && y !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, k = 0, S = s.length; k < S; ++k) {
      for (g = s[k], f = this.labelTextColors[k], n.fillStyle = f, wt(g.before, b), v = g.lines, l && v.length && (this._drawColorBox(n, t, k, p, a), m = Math.max(h.lineHeight, d)), M = 0, C = v.length; M < C; ++M)
        b(v[M]), m = h.lineHeight;
      wt(g.after, b);
    }
    x = 0, m = h.lineHeight, wt(this.afterBody, b), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const d = Qe(a.rtl, this.x, this.width);
      for (t.x = jn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = d.textAlign(a.footerAlign), n.textBaseline = "middle", i = Kt(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: d } = t, { width: c, height: u } = a, { topLeft: h, topRight: m, bottomLeft: x, bottomRight: p } = Ze(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, d), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - m, d), n.quadraticCurveTo(l + c, d, l + c, d + m), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, d + u - p), n.quadraticCurveTo(l + c, d + u, l + c - p, d + u), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + x, d + u), n.quadraticCurveTo(l, d + u, l, d + u - x), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, d + h), n.quadraticCurveTo(l, d, l + h, d), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = pn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = co(this, t), d = Object.assign({}, i, this._size), c = uo(n, t, d), u = ho(t, d, c, n);
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
    const i = oe(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), di(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), ui(t, n.textDirection), t.restore());
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
    }), o = !Gn(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), d = n || !Gn(i, o) || l;
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
    const { caretX: a, caretY: s, options: o } = this, i = pn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var ns = {
  id: "tooltip",
  _element: po,
  positioners: pn,
  afterInit(e, t, n) {
    n && (e.tooltip = new po({
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
const Mu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Su(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return Mu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const Du = (e, t) => e === null ? null : Yt(Math.round(e), 0, t);
function mo(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Li extends nn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: mo
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
    return n = isFinite(n) && a[n] === t ? n : Su(a, t, ut(n, t), this._addedLabels), Du(n, a.length - 1);
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
    return mo.call(this, t);
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
function Au(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: d, count: c, maxTicks: u, maxDigits: h, includeBounds: m } = e, x = o || 1, p = u - 1, { min: b, max: y } = t, g = !kt(i), f = !kt(l), v = !kt(c), k = (y - b) / (h + 1);
  let M = ms((y - b) / p / x) * x, S, C, $, L;
  if (M < 1e-14 && !g && !f)
    return [
      {
        value: b
      },
      {
        value: y
      }
    ];
  L = Math.ceil(y / M) - Math.floor(b / M), L > p && (M = ms(L * M / p / x) * x), kt(d) || (S = Math.pow(10, d), M = Math.ceil(M * S) / S), s === "ticks" ? (C = Math.floor(b / M) * M, $ = Math.ceil(y / M) * M) : (C = b, $ = y), g && f && o && Wl((l - i) / o, M / 1e3) ? (L = Math.round(Math.min((l - i) / M, u)), M = (l - i) / L, C = i, $ = l) : v ? (C = g ? i : C, $ = f ? l : $, L = c - 1, M = ($ - C) / L) : (L = ($ - C) / M, vn(L, Math.round(L), M / 1e3) ? L = Math.round(L) : L = Math.ceil(L));
  const T = Math.max(bs(M), bs(C));
  S = Math.pow(10, kt(d) ? T : d), C = Math.round(C * S) / S, $ = Math.round($ * S) / S;
  let B = 0;
  for (g && (m && C !== i ? (n.push({
    value: i
  }), C < i && B++, vn(Math.round((C + B * M) * S) / S, i, bo(i, k, e)) && B++) : C < i && B++); B < L; ++B) {
    const I = Math.round((C + B * M) * S) / S;
    if (f && I > l)
      break;
    n.push({
      value: I
    });
  }
  return f && m && $ !== l ? n.length && vn(n[n.length - 1].value, l, bo(l, k, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!f || $ === l) && n.push({
    value: $
  }), n;
}
function bo(e, t, { horizontal: n, minRotation: a }) {
  const s = ye(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Tu extends nn {
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
      const d = de(s), c = de(o);
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
    }, o = this._range || this, i = Au(s, o);
    return t.bounds === "ticks" && Yl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return Ya(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Fi extends Tu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ni.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = se(t) ? t : 0, this.max = se(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = ye(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const la = {
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
}, Gt = /* @__PURE__ */ Object.keys(la);
function vo(e, t) {
  return e - t;
}
function yo(e, t) {
  if (kt(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), se(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && ($n(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function _o(e, t, n, a) {
  const s = Gt.length;
  for (let o = Gt.indexOf(e); o < s - 1; ++o) {
    const i = la[Gt[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return Gt[o];
  }
  return Gt[s - 1];
}
function Bu(e, t, n, a, s) {
  for (let o = Gt.length - 1; o >= Gt.indexOf(n); o--) {
    const i = Gt[o];
    if (la[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return Gt[n ? Gt.indexOf(n) : 0];
}
function Lu(e) {
  for (let t = Gt.indexOf(e) + 1, n = Gt.length; t < n; ++t)
    if (la[Gt[t]].common)
      return Gt[t];
}
function xo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = ja(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Fu(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, d;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    d = n[l], d >= 0 && (t[d].major = !0);
  return t;
}
function ko(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Fu(e, a, s, n);
}
class wo extends nn {
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
    const a = t.time || (t.time = {}), s = this._adapter = new Ic._date(t.adapters.date);
    s.init(n), bn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : yo(this, t);
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
    (!i || !l) && (d(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && d(this.getMinMax(!1))), s = se(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = se(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const o = this.min, i = this.max, l = Gl(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? _o(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Bu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Lu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), ko(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Yt(n, 0, i), a = Yt(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || _o(o.minUnit, n, a, this._getLabelCapacity(n)), l = ut(s.ticks.stepSize, 1), d = i === "week" ? o.isoWeekday : !1, c = $n(d) || d === !0, u = {};
    let h = n, m, x;
    if (c && (h = +t.startOf(h, "isoWeek", d)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const p = s.ticks.source === "data" && this.getDataTimestamps();
    for (m = h, x = 0; m < a; m = +t.add(m, l, i), x++)
      xo(u, m, p);
    return (m === a || s.bounds === "ticks" || x === 1) && xo(u, m, p), Object.keys(u).sort(vo).map((b) => +b);
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
    const l = o.time.displayFormats, d = this._unit, c = this._majorUnit, u = d && l[d], h = c && l[c], m = a[n], x = c && h && m && m.major;
    return this._adapter.format(t, s || (x ? h : u));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = ye(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, ko(this, [
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
      t.push(yo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Jo(t.sort(vo));
  }
}
function Hn(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, d;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = Ne(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: d } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = Ne(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: d } = e[s]);
  const c = i - o;
  return c ? l + (d - l) * (t - o) / c : l;
}
class IC extends wo {
  static id = "timeseries";
  static defaults = wo.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = Hn(n, this.min), this._tableRange = Hn(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (Hn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return Hn(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Ii = {
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
}, Iu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Pu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ii,
  ...Iu
}, Eu = ol[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Ue(e) {
  return jo(e) ? Da(e) : e;
}
function Ru(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return jo(t) ? new Proxy(e, {}) : e;
}
function Ou(e, t) {
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
function Vu(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Pi(n, e.labels), Ei(n, e.datasets, t), n;
}
const zu = Z({
  props: Pu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = et(null), o = No(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: u, options: h, plugins: m, datasetIdKey: x } = e, p = Vu(u, x), b = Ru(p, u);
      o.value = new Fe(s.value, {
        type: c,
        data: b,
        options: {
          ...h
        },
        plugins: m
      });
    }, l = () => {
      const c = Da(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, d = (c) => {
      c.update(e.updateMode);
    };
    return Qt(i), he(l), Ft([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [h, m] = c, [x, p] = u;
      const b = Da(o.value);
      if (!b)
        return;
      let y = !1;
      if (h) {
        const g = Ue(h), f = Ue(x);
        g && g !== f && (Ou(b, g), y = !0);
      }
      if (m) {
        const g = Ue(m.labels), f = Ue(p.labels), v = Ue(m.datasets), k = Ue(p.datasets);
        g !== f && (Pi(b.config.data, g), y = !0), v && v !== k && (Ei(b.config.data, v, e.datasetIdKey), y = !0);
      }
      y && Ot(() => {
        d(b);
      });
    }, {
      deep: !0
    }), () => Sa("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      Sa("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function as(e, t) {
  return Fe.register(t), Z({
    props: Ii,
    setup(n, a) {
      let { expose: s } = a;
      const o = No(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => Sa(zu, Eu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Nu = /* @__PURE__ */ as("bar", Ac), ju = /* @__PURE__ */ as("line", Lc), Hu = /* @__PURE__ */ as("pie", Fc), Co = {
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
}, $o = {
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
  const t = et("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = D(() => e?.value ? e.value : t.value), o = D(() => s.value === "dark"), i = D(() => o.value ? $o : Co), l = () => {
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
  return Qt(() => {
    l();
  }), he(() => {
    d();
  }), e && Ft(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Co,
    darkColors: $o,
    chartSeriesColors: Wu
  };
}
const ss = 5, os = 8, Yu = /^x\d*$/, Ku = /^y\d*$/;
function Ri(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, d = l && typeof l == "object" ? { ...l } : {};
    Yu.test(s) && (d.maxTicksLimit = os, d.autoSkip = !0, d.minRotation = 0, d.maxRotation = 0, d.autoSkipPadding = d.autoSkipPadding ?? 8), Ku.test(s) && (d.maxTicksLimit = ss), i.ticks = d, a[s] = i;
  }
  return t.scales = a, t;
}
const Xt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", qu = ["titleFont", "bodyFont", "footerFont"];
function Oi(e, t = Xt) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const s = { ...n.scales };
    for (const o of Object.keys(s)) {
      const i = s[o];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, d = l.ticks;
      if (d && typeof d == "object") {
        const u = { ...d }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, l.ticks = u;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const u = { ...c }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, l.title = u;
      }
      s[o] = l;
    }
    n.scales = s;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const s = { ...n.plugins }, o = s.legend;
    if (o && typeof o == "object") {
      const l = { ...o }, d = l.labels;
      if (d && typeof d == "object") {
        const c = { ...d }, u = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...u, family: t }, l.labels = c;
      }
      s.legend = l;
    }
    const i = s.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const d of qu) {
        const c = l[d];
        c && typeof c == "object" && (l[d] = { ...c, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const Uu = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Mo = 10, Xu = /* @__PURE__ */ Z({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Fe.register(Li, Fi, hu, Ti, ns, es), Fe.defaults.font.family = Xt;
    const { isDark: a, colors: s } = dt(rt(n, "theme")), o = D(() => n.data), i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c;
    function l(c, u) {
      if (u == null) return c;
      if (Array.isArray(u) || typeof u != "object" || c == null || Array.isArray(c) || typeof c != "object") return u;
      const h = { ...c };
      for (const m of Object.keys(u)) {
        const x = u[m];
        x !== void 0 && (h[m] = l(c[m], x));
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
              boxWidth: Mo,
              boxHeight: Mo,
              usePointStyle: !1,
              generateLabels: function(h) {
                return h.data.datasets.map((x, p) => {
                  const b = Array.isArray(x.backgroundColor) ? x.backgroundColor[0] : x.backgroundColor, y = Array.isArray(x.borderColor) ? x.borderColor[0] : x.borderColor, g = typeof y == "string" && y.length > 0 ? y : typeof b == "string" && b.length > 0 ? b : s.value.textSecondary;
                  return {
                    text: i(x.label || ""),
                    fillStyle: typeof b == "string" ? b : g,
                    strokeStyle: g,
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
            backgroundColor: s.value.tooltipBg,
            titleColor: s.value.tooltipText,
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
              maxTicksLimit: ss,
              font: {
                family: Xt,
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
              maxTicksLimit: os,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Xt,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
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
      }, u = n.options ? l(c, n.options) : c;
      return Oi(
        Ri(u)
      );
    });
    return t({ isDark: a }), (c, u) => (_(), w("div", Uu, [
      R(F(Nu), {
        data: o.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), at = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, _e = /* @__PURE__ */ at(Xu, [["__scopeId", "data-v-86711d87"]]), Gu = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Zu = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Qu = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Ju = ["aria-pressed", "aria-label", "onClick"], th = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, eh = /* @__PURE__ */ Z({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Fe.register(
      Li,
      Fi,
      iu,
      ou,
      Ti,
      ns,
      es
    ), Fe.defaults.font.family = Xt;
    const a = et(null), { isDark: s, colors: o } = dt(rt(n, "theme")), i = D(() => o.value.bgCard), l = D(() => {
      const b = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((y) => {
          const g = y.borderColor, f = Array.isArray(g) ? g[0] : g, v = typeof f == "string" && f.length > 0 ? f : o.value.textSecondary, k = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : b, M = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : k, S = y.pointBorderWidth ?? 2, C = y.pointHoverBorderWidth ?? S;
          return {
            ...y,
            fill: y.fill ?? !1,
            pointBackgroundColor: k,
            pointHoverBackgroundColor: M,
            pointBorderColor: y.pointBorderColor ?? v,
            pointHoverBorderColor: y.pointHoverBorderColor ?? v,
            pointBorderWidth: S,
            pointHoverBorderWidth: C
          };
        })
      };
    }), d = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b;
    function c(b) {
      const y = b.borderColor, g = Array.isArray(y) ? y[0] : y;
      return typeof g == "string" && g.length > 0 ? g : o.value.textSecondary;
    }
    const u = D(
      () => l.value.datasets.map((b, y) => ({
        key: `${b.label ?? "dataset"}-${y}`,
        label: d(b.label || ""),
        color: c(b)
      }))
    ), h = et([]);
    Ft(
      () => l.value.datasets.length,
      (b) => {
        const y = Array.from({ length: b }, (g, f) => h.value[f] ?? !0);
        h.value = y;
      },
      { immediate: !0 }
    );
    function m(b) {
      const g = a.value?.chart;
      if (!g || b < 0 || b >= g.data.datasets.length) return;
      const f = !g.isDatasetVisible(b);
      g.setDatasetVisibility(b, f), h.value[b] = f, g.update();
    }
    function x(b, y) {
      if (y == null) return b;
      if (Array.isArray(y) || typeof y != "object" || b == null || Array.isArray(b) || typeof b != "object") return y;
      const g = { ...b };
      for (const f of Object.keys(y)) {
        const v = y[f];
        v !== void 0 && (g[f] = x(b[f], v));
      }
      return g;
    }
    const p = D(() => {
      const b = {
        font: {
          family: Xt
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
              family: Xt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: Xt,
              size: 13
            },
            callbacks: {
              title: function(f) {
                return f.length > 0 ? String(d(f[0].label)) : "";
              },
              label: function(f) {
                let v = String(d(f.dataset.label || ""));
                return v && (v += ": "), f.parsed.y !== null && (v += f.parsed.y), v;
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
              maxTicksLimit: os,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Xt,
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
              maxTicksLimit: ss,
              font: {
                family: Xt,
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
      }, y = n.options ? x(b, n.options) : b;
      return Oi(
        Ri(y)
      );
    });
    return t({ isDark: s }), (b, y) => (_(), w("div", Gu, [
      r("div", Zu, [
        R(F(ju), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: p.value
        }, null, 8, ["data", "options"])
      ]),
      u.value.length > 0 ? (_(), w("ul", Qu, [
        (_(!0), w(K, null, nt(u.value, (g, f) => (_(), w("li", {
          key: g.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: W(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", h.value[f] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: gt({ color: g.color }),
            "aria-pressed": h.value[f] !== !1,
            "aria-label": `${g.label}. ${h.value[f] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (v) => m(f)
          }, [
            r("span", th, [
              y[0] || (y[0] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              r("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: gt({ borderColor: g.color })
              }, null, 4),
              y[1] || (y[1] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            r("span", null, A(g.label), 1)
          ], 14, Ju)
        ]))), 128))
      ])) : V("", !0)
    ]));
  }
}), ke = /* @__PURE__ */ at(eh, [["__scopeId", "data-v-e1b1d261"]]), nh = { class: "chart-container" }, ah = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", sh = /* @__PURE__ */ Z({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Fe.register(Xd, ns, es);
    const { isDark: a, colors: s } = dt(rt(n, "theme")), o = n.data, i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = D(() => n.options ? n.options : {
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
              family: ah,
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
                const x = d.getDatasetMeta(0).controller.getStyle(h), b = c.datasets[0].data[h], y = typeof x.backgroundColor == "string" && x.backgroundColor.length > 0 ? x.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(u)}: ${b}`,
                  fillStyle: x.backgroundColor,
                  strokeStyle: x.borderColor,
                  lineWidth: x.borderWidth,
                  lineDash: x.borderDash,
                  lineDashOffset: x.borderDashOffset,
                  lineJoin: x.borderJoinStyle,
                  fontColor: y,
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
              const c = d.label || "", u = d.parsed || 0, h = d.dataset.data.reduce((x, p) => x + p, 0), m = (u / h * 100).toFixed(1);
              return `${i(c)}: ${u} (${m}%)`;
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
    return t({ isDark: a }), (d, c) => (_(), w("div", nh, [
      R(F(Hu), {
        data: F(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ra = /* @__PURE__ */ at(sh, [["__scopeId", "data-v-0f7806d6"]]), oh = { class: "chart-container" }, ih = ["viewBox"], lh = ["transform"], rh = ["x", "width", "fill", "stroke"], ch = ["fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], uh = ["points", "fill"], hh = ["x1", "y1", "x2", "y2", "stroke"], fh = ["x", "y", "fill"], gh = ["x1", "y1", "x2", "y2", "stroke"], ph = ["points", "fill"], mh = ["transform"], bh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y", "height"], kh = ["y1", "y2"], wh = ["y1", "y2"], Ch = ["y1", "y2"], $h = ["y1", "y2"], Mh = ["y", "height"], Sh = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["cy", "stroke", "onMouseenter"], Th = ["cy", "stroke", "onMouseenter"], Bh = ["y1", "y2", "onMouseenter"], Lh = ["y1", "y2", "onMouseenter"], Fh = ["x", "y", "fill"], Ih = ["x", "y", "fill"], Ph = ["transform"], Eh = { transform: "translate(-200, 0)" }, Rh = ["stroke"], Oh = ["fill"], Vh = { transform: "translate(-130, 0)" }, zh = ["stroke"], Nh = ["fill"], jh = { transform: "translate(-60, 0)" }, Hh = ["stroke"], Wh = ["fill"], Yh = { transform: "translate(10, 0)" }, Kh = ["stroke"], qh = ["fill"], Uh = { transform: "translate(80, 0)" }, Xh = ["fill"], Gh = { transform: "translate(150, 0)" }, Zh = ["fill"], Qh = /* @__PURE__ */ Z({
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
    })), o = et({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m, x) => {
      const p = m.currentTarget.closest("svg");
      if (!p) return;
      const b = p.getBoundingClientRect(), y = p.createSVGPoint();
      y.x = m.clientX - b.left, y.y = m.clientY - b.top, o.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: x
      };
    }, d = (m) => {
      if (o.value.visible) {
        const x = m.currentTarget, p = x.getBoundingClientRect(), b = x.createSVGPoint();
        b.x = m.clientX - p.left, b.y = m.clientY - p.top, o.value.x = b.x, o.value.y = b.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const m = [], p = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const y = b, g = (y - 1) / 9, f = n.chartMargin + p - g * p;
        m.push({ value: y, y: f });
      }
      return m;
    });
    return t({ isDark: a }), (m, x) => (_(), w("div", oh, [
      (_(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: d,
        onMouseleave: c
      }, [
        o.value.visible ? (_(), w("g", {
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
          }, null, 8, rh),
          r("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(o.value.text), 9, ch)
        ], 8, lh)) : V("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, dh),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, uh),
        (_(!0), w(K, null, nt(h.value, (p, b) => (_(), w(K, { key: b }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, hh),
          r("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(p.value), 9, fh)
        ], 64))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, gh),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, ph),
        (_(!0), w(K, null, nt(e.boxplotData, (p, b) => (_(), w(K, { key: b }, [
          r("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            p.isTotal ? (_(), w(K, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
              r("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              r("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, yh),
              r("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, _h),
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
              }, null, 8, xh)
            ], 64)) : (_(), w(K, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kh),
              r("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              r("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ch),
              r("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, $h),
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
              }, null, 8, Mh)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: p.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Min: ${p.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            r("circle", {
              cx: 0,
              cy: p.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Q1: ${p.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            r("circle", {
              cx: 0,
              cy: p.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Q3: ${p.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            r("circle", {
              cx: 0,
              cy: p.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => l(y, `Max: ${p.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Th),
            r("line", {
              x1: -24,
              y1: p.medianY,
              x2: 24,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (y) => l(y, `Median: ${p.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Bh),
            p.averageY ? (_(), w("line", {
              key: 2,
              x1: -24,
              y1: p.averageY,
              x2: 24,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (y) => l(y, `Avg: ${p.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Lh)) : V("", !0)
          ], 8, mh),
          r("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(p.label)), 9, Fh),
          p.responseCount ? (_(), w("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(p.responseCount), 9, Ih)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), w("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", Eh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Rh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Oh)
          ]),
          r("g", Vh, [
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
            }, " Q1 ", 8, Nh)
          ]),
          r("g", jh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
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
            }, " Q3 ", 8, Wh)
          ]),
          r("g", Yh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
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
            }, " Max ", 8, qh)
          ]),
          r("g", Uh, [
            x[0] || (x[0] = r("line", {
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
            }, " Avg ", 8, Xh)
          ]),
          r("g", Gh, [
            x[1] || (x[1] = r("line", {
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
            }, " Median ", 8, Zh)
          ])
        ], 8, Ph)) : V("", !0)
      ], 44, ih))
    ]));
  }
}), Jh = /* @__PURE__ */ at(Qh, [["__scopeId", "data-v-9ac5c075"]]), tf = { class: "chart-container" }, ef = ["viewBox"], nf = ["x1", "y1", "x2", "y2", "stroke"], af = ["points", "fill"], sf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x1", "y1", "x2", "y2", "stroke"], lf = ["x", "y", "fill"], rf = ["x", "y", "fill", "transform"], cf = ["x1", "y1", "x2", "y2", "stroke"], df = ["points", "fill"], uf = ["transform"], hf = ["y1", "y2", "stroke", "onMouseenter"], ff = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], pf = ["x1", "y1", "x2", "y2", "onMouseenter"], mf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], vf = ["x", "y", "fill"], yf = ["x", "y", "fill"], _f = ["transform"], xf = { transform: "translate(-180, 0)" }, kf = ["stroke"], wf = ["fill"], Cf = { transform: "translate(-120, 0)" }, $f = ["fill"], Mf = { transform: "translate(-60, 0)" }, Sf = ["fill"], Df = { transform: "translate(0, 0)" }, Af = ["stroke"], Tf = ["fill"], Bf = { transform: "translate(60, 0)" }, Lf = ["fill"], Ff = { transform: "translate(130, 0)" }, If = ["fill"], Pf = ["transform"], Ef = ["x", "y", "width", "height", "fill", "stroke"], Rf = ["y", "fill"], Of = ["y", "fill"], Wn = 10, Vf = 14, ka = 13, So = 4, Do = 12, zf = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = Wn + ka + So + Do + Wn, i = D(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(f, v, k) {
      const M = k ? 0.6 : 0.535;
      return Math.ceil(Math.max(f, 1) * v * M);
    }
    function d(f, v) {
      return Math.max(
        l(f.length, ka, !0),
        l(v.length, Do, !1),
        52
      ) + Vf * 2;
    }
    function c(f, v, k, M) {
      const S = k / 2, C = 6, $ = Math.min(
        Math.max(f, S + C),
        n.chartWidth - S - C
      ), L = C + M + 10, T = n.chartHeight - C + 10, B = Math.min(Math.max(v, L), T);
      return { x: $, y: B };
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
    })), h = et({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), m = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, x = (f, v, k) => {
      const M = f.currentTarget.closest("svg");
      if (!M) return;
      const S = M.getBoundingClientRect(), C = M.createSVGPoint();
      C.x = f.clientX - S.left, C.y = f.clientY - S.top;
      let $ = m(v.label), L = "";
      switch (k) {
        case "body":
          L = `Q1: ${v.q1.toFixed(1)} | Q3: ${v.q3.toFixed(1)}`;
          break;
        case "wick":
          L = `Min: ${v.low.toFixed(1)} | Max: ${v.high.toFixed(1)}`;
          break;
        case "median":
          L = `Median: ${v.median.toFixed(1)}`;
          break;
        case "average":
          L = `Average: ${v.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          L = `Min: ${v.low.toFixed(1)}`;
          break;
        case "max":
          L = `Max: ${v.high.toFixed(1)}`;
          break;
      }
      const T = d($, L), B = o;
      let I = C.x, P = C.y - 20;
      const N = c(I, P, T, B);
      I = N.x, P = N.y, h.value = {
        visible: !0,
        x: I,
        y: P,
        title: $,
        text: L,
        width: T,
        height: B
      };
    }, p = (f) => {
      if (h.value.visible) {
        const v = f.currentTarget, k = v.getBoundingClientRect(), M = v.createSVGPoint();
        M.x = f.clientX - k.left, M.y = f.clientY - k.top;
        let S = M.x, C = M.y - 20;
        const $ = c(S, C, h.value.width, h.value.height);
        h.value.x = $.x, h.value.y = $.y;
      }
    }, b = () => {
      h.value.visible = !1;
    }, y = () => {
      h.value.visible = !1;
    }, g = D(() => {
      const f = [], k = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let M = 1; M <= 10; M++) {
        const S = M, C = (S - 1) / 9, $ = n.chartMargin + k - C * k;
        f.push({ value: S, y: $ });
      }
      return f;
    });
    return t({ isDark: a }), (f, v) => (_(), w("div", tf, [
      (_(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: gt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: p,
        onMouseleave: b
      }, [
        v[4] || (v[4] = r("defs", null, [
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
        }, null, 8, nf),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, af),
        (_(!0), w(K, null, nt(g.value, (k, M) => (_(), w("line", {
          key: `grid-${M}`,
          x1: e.chartMargin,
          y1: k.y,
          x2: e.chartWidth - e.chartMargin,
          y2: k.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, sf))), 128)),
        (_(!0), w(K, null, nt(g.value, (k, M) => (_(), w(K, { key: M }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: k.y,
            x2: e.chartMargin,
            y2: k.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, of),
          r("text", {
            x: e.chartMargin - 12,
            y: k.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(k.value), 9, lf)
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
        }, A(m(e.yAxisLabel)), 9, rf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, cf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, df),
        (_(!0), w(K, null, nt(e.candlestickData, (k, M) => (_(), w(K, { key: M }, [
          r("g", {
            transform: `translate(${k.centerX}, 0)`
          }, [
            r("line", {
              x1: 0,
              y1: k.highY,
              x2: 0,
              y2: k.lowY,
              stroke: k.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (S) => x(S, k, "wick"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, hf),
            r("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(k.q1Y, k.q3Y) - (Math.abs(k.q3Y - k.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(k.q3Y - k.q1Y)),
              fill: k.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: k.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (S) => x(S, k, "body"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, ff),
            k.medianY ? (_(), w("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: k.medianY,
              x2: e.candleWidth / 2,
              y2: k.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => x(S, k, "median"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, gf)) : V("", !0),
            k.averageY ? (_(), w("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: k.averageY,
              x2: e.candleWidth / 2,
              y2: k.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => x(S, k, "average"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, pf)) : V("", !0),
            r("circle", {
              cx: 0,
              cy: k.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => x(S, k, "min"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, mf),
            r("circle", {
              cx: 0,
              cy: k.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => x(S, k, "max"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, bf)
          ], 8, uf),
          r("text", {
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(m(k.label)), 9, vf),
          k.responseCount ? (_(), w("text", {
            key: 0,
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(k.responseCount), 9, yf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), w("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", xf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, kf),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, wf)
          ]),
          r("g", Cf, [
            v[0] || (v[0] = r("rect", {
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
            }, " Q1 ", 8, $f)
          ]),
          r("g", Mf, [
            v[1] || (v[1] = r("rect", {
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
            }, " Q3 ", 8, Sf)
          ]),
          r("g", Df, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Af),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Tf)
          ]),
          r("g", Bf, [
            v[2] || (v[2] = r("line", {
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
            }, " Avg ", 8, Lf)
          ]),
          r("g", Ff, [
            v[3] || (v[3] = r("line", {
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
            }, " Median ", 8, If)
          ])
        ], 8, _f)) : V("", !0),
        h.value.visible ? (_(), w("g", {
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
          }, null, 8, Ef),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Wn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Rf),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Wn + ka + So,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Of)
        ], 8, Pf)) : V("", !0)
      ], 44, ef))
    ]));
  }
}), Vi = /* @__PURE__ */ at(zf, [["__scopeId", "data-v-22efd66d"]]), Nf = ["viewBox"], jf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["x1", "y1", "x2", "y2", "stroke"], Wf = ["points", "fill"], Yf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["x", "y", "fill"], qf = ["x", "y", "fill", "transform"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Xf = ["points", "fill"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["x", "y", "fill"], Qf = ["x", "y", "fill"], Jf = ["d"], tg = ["x", "y", "width", "height", "onMouseenter"], eg = ["x1", "y1", "x2", "y2"], ng = ["x", "y"], ag = ["x1", "y1", "x2", "y2"], sg = ["x", "y"], og = ["x1", "y1", "x2", "y2"], ig = ["x", "y"], lg = ["x1", "y1", "x2", "y2"], rg = ["x", "y"], cg = ["x1", "y1", "x2", "y2"], dg = ["x", "y"], ug = ["x1", "y1", "x2", "y2"], hg = ["x", "y"], fg = ["transform"], gg = { transform: "translate(-220, 0)" }, pg = ["fill"], mg = { transform: "translate(-140, 0)" }, bg = ["fill"], vg = { transform: "translate(-80, 0)" }, yg = ["fill"], _g = { transform: "translate(-20, 0)" }, xg = ["fill"], kg = { transform: "translate(60, 0)" }, wg = ["fill"], Cg = { transform: "translate(130, 0)" }, $g = ["fill"], Mg = { transform: "translate(180, 0)" }, Sg = ["fill"], Dg = ["transform"], Ag = ["x", "y", "width", "height", "fill", "stroke"], Tg = ["y", "fill"], Bg = ["y", "fill"], Yn = 10, Lg = 14, wa = 13, Ao = 12, To = 4, Fg = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = Yn + wa + To + Ao + Yn, i = D(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(z, X, G) {
      const it = G ? 0.6 : 0.535;
      return Math.ceil(Math.max(z, 1) * X * it);
    }
    function d(z, X) {
      return Math.max(
        l(z.length, wa, !0),
        l(X.length, Ao, !1),
        52
      ) + Lg * 2;
    }
    function c(z, X, G, it) {
      const mt = G / 2, bt = 6, St = Math.min(
        Math.max(z, mt + bt),
        n.chartWidth - mt - bt
      ), Nt = bt + it + 10, It = n.chartHeight - bt + 10, O = Math.min(Math.max(X, Nt), It);
      return { x: St, y: O };
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
    })), h = et({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), m = D(() => n.chartWidth - n.chartMargin * 2), x = D(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), p = D(() => m.value / 10 * 0.6), b = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const z = Math.max(...n.histogram.map((G) => G.count || 0), 1), X = Math.max(1, Math.ceil(z * 0.2));
      return z + X;
    }), y = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const z = n.averageScore || 0;
      let X = 0, G = 0;
      if (n.histogram.forEach((mt) => {
        const bt = mt.count || 0;
        X += bt;
        const St = mt.score - z;
        G += bt * (St * St);
      }), X === 0) return 1;
      const it = G / X;
      return Math.sqrt(it) || 1;
    }), g = (z, X, G) => {
      if (G === 0) return 0;
      const it = 1 / (G * Math.sqrt(2 * Math.PI)), mt = -0.5 * Math.pow((z - X) / G, 2);
      return it * Math.exp(mt);
    }, f = D(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && y.value === 0) return null;
      const z = n.averageScore, X = y.value, G = 100, mt = Math.max(...n.histogram.map((It) => It.count || 0), 1) / b.value * x.value;
      if (mt <= 0) return null;
      let bt = 0;
      for (let It = 0; It <= G; It++) {
        const O = 1 + 9 * (It / G), j = g(O, z, X);
        j > bt && (bt = j);
      }
      if (bt <= 0) return null;
      const St = mt / bt, Nt = [];
      for (let It = 0; It <= G; It++) {
        const O = 1 + 9 * (It / G), j = g(O, z, X) * St, U = k(O);
        if (U !== null) {
          const ft = n.chartHeight - n.chartBottomMargin - j;
          Nt.push(`${It === 0 ? "M" : "L"} ${U} ${ft}`);
        }
      }
      return Nt.join(" ");
    }), v = D(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const z = m.value / 10;
      return n.histogram.map((X, G) => {
        const it = n.chartMargin + (G + 0.5) * z, mt = X.count > 0 ? X.count / b.value * x.value : 0, bt = n.chartHeight - n.chartBottomMargin - mt;
        return {
          score: X.score,
          count: X.count,
          x: it,
          y: bt,
          height: mt
        };
      });
    }), k = (z) => {
      if (z < 1 || z > 10) return null;
      const X = m.value / 10;
      return n.chartMargin + (z - 0.5) * X;
    }, M = D(() => k(n.minScore)), S = D(() => k(n.maxScore)), C = D(() => k(n.q1Score)), $ = D(() => k(n.medianScore)), L = D(() => k(n.q3Score)), T = D(() => k(n.averageScore)), B = D(() => n.minScore), I = D(() => n.maxScore), P = D(() => n.q1Score), N = D(() => n.medianScore), Y = D(() => n.q3Score), H = D(() => n.averageScore), Q = D(() => {
      const z = [], X = n.chartMargin - 8, G = 18;
      C.value !== null && z.push({
        x: C.value,
        y: X,
        value: n.q1Score,
        label: `Q1: ${P.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), $.value !== null && z.push({
        x: $.value,
        y: X - G,
        value: n.medianScore,
        label: `Median: ${N.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && z.push({
        x: T.value,
        y: X - G,
        value: n.averageScore,
        label: `Avg: ${H.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), L.value !== null && z.push({
        x: L.value,
        y: X,
        value: n.q3Score,
        label: `Q3: ${Y.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), z.sort((bt, St) => (bt.x || 0) - (St.x || 0));
      const it = [[], [], []];
      z.forEach((bt) => {
        if (bt.x === null) return;
        let St = -1;
        for (let Nt = 0; Nt < it.length; Nt++) {
          let It = !1;
          for (const O of it[Nt]) {
            if (O.x === null) continue;
            const j = Math.abs(bt.x - O.x), U = (bt.width + O.width) / 2 + 10;
            if (j < U) {
              It = !0;
              break;
            }
          }
          if (!It) {
            St = Nt;
            break;
          }
        }
        St === -1 && (St = it.length - 1), bt.y = X - St * G, it[St].push(bt);
      });
      const mt = 15;
      return z.forEach((bt) => {
        bt.y < mt && (bt.y = mt);
      }), z;
    }), J = (z) => Q.value.find((G) => G.id === z)?.y || n.chartMargin - 10, lt = D(() => {
      const z = [];
      for (let G = 0; G <= 5; G++) {
        const it = Math.round(b.value / 5 * G), mt = n.chartHeight - n.chartBottomMargin - G / 5 * x.value;
        z.push({ value: it, y: mt });
      }
      return z;
    });
    function vt(z, X, G) {
      const it = z.createSVGPoint();
      it.x = X, it.y = G;
      const mt = z.getScreenCTM();
      if (!mt) {
        const St = z.getBoundingClientRect();
        return { x: X - St.left, y: G - St.top };
      }
      const bt = it.matrixTransform(mt.inverse());
      return { x: bt.x, y: bt.y };
    }
    const pt = (z, X) => {
      n.interactive && Mt(z, X);
    }, ct = () => {
      n.interactive && At();
    }, Mt = (z, X) => {
      const G = z.currentTarget.closest("svg");
      if (!G) return;
      const { x: it, y: mt } = vt(G, z.clientX, z.clientY), bt = `Score: ${X.score}`, St = `Count: ${Number(X.count ?? 0).toLocaleString()}`, Nt = d(bt, St), It = o, O = typeof X?.x == "number" ? X.x : it;
      let j = mt - 20;
      const U = c(O, j, Nt, It);
      h.value = {
        visible: !0,
        x: U.x,
        y: U.y,
        title: bt,
        text: St,
        width: Nt,
        height: It,
        anchorX: typeof X?.x == "number" ? X.x : null
      };
    }, st = (z) => {
      if (n.interactive && h.value.visible) {
        const X = z.currentTarget, { x: G, y: it } = vt(X, z.clientX, z.clientY), mt = h.value.anchorX, bt = mt != null && Number.isFinite(mt) ? mt : G;
        let St = it - 20;
        const Nt = c(bt, St, h.value.width, h.value.height);
        h.value.x = Nt.x, h.value.y = Nt.y;
      }
    }, Et = () => {
      At();
    }, At = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (z, X) => (_(), w("div", {
      class: W(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (_(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: st,
        onMouseleave: Et
      }, [
        X[7] || (X[7] = r("defs", null, [
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
        (_(!0), w(K, null, nt(lt.value, (G, it) => (_(), w("line", {
          key: `grid-${it}`,
          x1: e.chartMargin,
          y1: G.y,
          x2: e.chartWidth - e.chartMargin,
          y2: G.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, jf))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Hf),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Wf),
        (_(!0), w(K, null, nt(lt.value, (G, it) => (_(), w(K, {
          key: `y-tick-${it}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: G.y,
            x2: e.chartMargin,
            y2: G.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Yf),
          r("text", {
            x: e.chartMargin - 12,
            y: G.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(G.value), 9, Kf)
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
        }, " Count ", 8, qf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Uf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Xf),
        (_(!0), w(K, null, nt(v.value, (G, it) => (_(), w(K, {
          key: `tick-${it}`
        }, [
          r("line", {
            x1: G.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: G.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Gf),
          r("text", {
            x: G.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(G.score), 9, Zf)
        ], 64))), 128)),
        r("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Qf),
        f.value ? (_(), w("path", {
          key: 0,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Jf)) : V("", !0),
        (_(!0), w(K, null, nt(v.value, (G, it) => (_(), w("rect", {
          key: `bar-${it}`,
          x: G.x - p.value / 2,
          y: G.y,
          width: p.value,
          height: G.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (mt) => pt(mt, G),
          onMouseleave: ct,
          style: gt({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, tg))), 128)),
        M.value ? (_(), w("line", {
          key: 1,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, eg)) : V("", !0),
        M.value ? (_(), w("text", {
          key: 2,
          x: M.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(B.value.toFixed(1)), 9, ng)) : V("", !0),
        C.value ? (_(), w("line", {
          key: 3,
          x1: C.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ag)) : V("", !0),
        C.value ? (_(), w("text", {
          key: 4,
          x: C.value,
          y: J("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(P.value.toFixed(1)), 9, sg)) : V("", !0),
        $.value ? (_(), w("line", {
          key: 5,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, og)) : V("", !0),
        $.value ? (_(), w("text", {
          key: 6,
          x: $.value,
          y: J("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(N.value.toFixed(1)), 9, ig)) : V("", !0),
        T.value ? (_(), w("line", {
          key: 7,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, lg)) : V("", !0),
        T.value ? (_(), w("text", {
          key: 8,
          x: T.value,
          y: J("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(H.value.toFixed(1)), 9, rg)) : V("", !0),
        L.value ? (_(), w("line", {
          key: 9,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, cg)) : V("", !0),
        L.value ? (_(), w("text", {
          key: 10,
          x: L.value,
          y: J("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(Y.value.toFixed(1)), 9, dg)) : V("", !0),
        S.value ? (_(), w("line", {
          key: 11,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ug)) : V("", !0),
        S.value ? (_(), w("text", {
          key: 12,
          x: S.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(I.value.toFixed(1)), 9, hg)) : V("", !0),
        e.showLegend ? (_(), w("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          r("g", gg, [
            X[0] || (X[0] = r("line", {
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
            }, " Gaussian ", 8, pg)
          ]),
          r("g", mg, [
            X[1] || (X[1] = r("line", {
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
            }, " Min ", 8, bg)
          ]),
          r("g", vg, [
            X[2] || (X[2] = r("line", {
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
            }, " Q1 ", 8, yg)
          ]),
          r("g", _g, [
            X[3] || (X[3] = r("line", {
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
            }, " Median ", 8, xg)
          ]),
          r("g", kg, [
            X[4] || (X[4] = r("line", {
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
            }, " Avg ", 8, wg)
          ]),
          r("g", Cg, [
            X[5] || (X[5] = r("line", {
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
            }, " Q3 ", 8, $g)
          ]),
          r("g", Mg, [
            X[6] || (X[6] = r("line", {
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
            }, " Max ", 8, Sg)
          ])
        ], 8, fg)) : V("", !0),
        e.interactive && h.value.visible ? (_(), w("g", {
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
          }, null, 8, Ag),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Tg),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Yn + wa + To,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Bg)
        ], 8, Dg)) : V("", !0)
      ], 44, Nf))
    ], 2));
  }
}), zi = /* @__PURE__ */ at(Fg, [["__scopeId", "data-v-a1e39e34"]]), Ig = 639, Ni = 1024;
function Bo(e) {
  return e < 640 ? "mobile" : e <= Ni ? "tablet" : "desktop";
}
function Pg() {
  const e = et(
    typeof window > "u" ? "desktop" : Bo(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Bo(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  Qt(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Ig}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Ni}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), he(() => {
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
const Eg = { class: "chart-container" }, Rg = {
  key: 1,
  class: "chart-wrapper"
}, Og = /* @__PURE__ */ Z({
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
    rs.use([ll, rl, cl, dl]);
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), { breakpoint: o } = Pg(), i = et(null), l = et(!0), d = et(!1);
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
    }), m = (S, C) => {
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
        const I = $.slice(T, B), P = I.lastIndexOf(" ");
        if (P > 0)
          for (L.push($.slice(T, T + P).trim()), T += P; T < $.length && $[T] === " "; ) T += 1;
        else
          L.push(I), T = B;
      }
      return L.join(`
`);
    }, x = [
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
    }, b = (S) => S.map((C, $) => ({
      ...C,
      itemStyle: {
        color: n.nodeColors[C.name] || x[$ % x.length],
        borderRadius: 8
      }
    })), y = (S) => (C) => {
      const $ = C.dataType === "node", L = s.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if ($) {
        const Y = S.filter((J) => J.target === C.name), H = S.filter((J) => J.source === C.name), Q = Y.length > 0 ? Y.reduce((J, lt) => J + (lt.originalValue || lt.value), 0) : H.reduce((J, lt) => J + (lt.originalValue || lt.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${C.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${Q.toLocaleString()}</div>`;
      }
      const B = C.data?.source || C.source || "Unknown", I = C.data?.target || C.target || "Unknown", P = C.data?.originalValue || C.data?.value || C.value || 0, N = C.data?.label || `${P.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${B} → ${I}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, g = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const S = h.value, C = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: L, links: T } = p(), B = b(L), I = {
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
                    return m(N, Math.max(4, S.labelCharsPerLine));
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
        c.setOption(I), c.resize();
      } catch (L) {
        console.error("Error setting Sankey chart options:", L), d.value = !0;
      }
    }, f = async () => {
      if (i.value)
        try {
          c = rs.init(i.value), g(), window.addEventListener("resize", k);
        } catch (S) {
          console.error("Error initializing Sankey chart:", S), d.value = !0;
        } finally {
          l.value = !1;
        }
    }, v = async (S = 40) => {
      await Ot();
      for (let C = 0; C < S; C++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await f();
        await new Promise(($) => setTimeout($, 50));
      }
      await f(), setTimeout(k, 50);
    }, k = () => c?.resize(), M = () => {
      window.removeEventListener("resize", k), c && (c.dispose(), c = null);
    };
    return Qt(() => i.value && v()), Ho(M), Ft(() => n.data, g, { deep: !0 }), Ft(a, g), Ft(o, g), t({ isDark: a }), (S, C) => (_(), w("div", Eg, [
      d.value ? (_(), w("div", {
        key: 0,
        class: "error-state",
        style: gt({ height: e.height })
      }, [...C[0] || (C[0] = [
        ls('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (_(), w("div", Rg, [
        ae(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: gt({ height: e.height })
        }, null, 4), [
          [xn, !l.value]
        ]),
        ae(r("div", {
          class: "loading-state",
          style: gt({ height: e.height })
        }, [...C[1] || (C[1] = [
          ls('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [xn, l.value]
        ])
      ]))
    ]));
  }
}), Ie = /* @__PURE__ */ at(Og, [["__scopeId", "data-v-eb927194"]]), Vg = ["open"], zg = { class: "card-header metric-collapsible__summary" }, Ng = { class: "header-content metric-header-content" }, jg = { class: "metric-header-content__main" }, Hg = { class: "metric-header-content__text" }, Wg = {
  key: 0,
  class: "card-title"
}, Yg = {
  key: 0,
  class: "card-subtitle"
}, Kg = {
  key: 0,
  class: "metric-header-content__export"
}, qg = {
  key: 0,
  class: "cmc-header-aside"
}, Ug = { class: "chart-metric-container__body" }, Xg = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Gg = { class: "card-header" }, Zg = { class: "header-content metric-header-content" }, Qg = { class: "metric-header-content__main" }, Jg = { class: "metric-header-content__text" }, tp = {
  key: 0,
  class: "card-title"
}, ep = {
  key: 0,
  class: "card-subtitle"
}, np = {
  key: 0,
  class: "metric-header-content__export"
}, ap = {
  key: 0,
  class: "cmc-header-aside"
}, sp = { class: "chart-metric-container__body" }, op = /* @__PURE__ */ Z({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = et(t.defaultOpen), a = Ea(), s = D(() => a.headerExport ? !t.collapsible || n.value : !1);
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
    return (i, l) => e.collapsible ? (_(), w("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: o
    }, [
      r("summary", zg, [
        r("div", Ng, [
          r("div", jg, [
            r("div", Hg, [
              $t(i.$slots, "title", {}, () => [
                e.title ? (_(), w("h3", Wg, A(e.title), 1)) : V("", !0)
              ], !0),
              e.subtitle ? (_(), w("p", Yg, A(e.subtitle), 1)) : V("", !0),
              $t(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            s.value ? (_(), w("div", Kg, [
              $t(i.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          i.$slots.headerAside ? (_(), w("div", qg, [
            $t(i.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
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
      r("div", Ug, [
        $t(i.$slots, "default", {}, void 0, !0)
      ])
    ], 40, Vg)) : (_(), w("div", Xg, [
      r("div", Gg, [
        r("div", Zg, [
          r("div", Qg, [
            r("div", Jg, [
              $t(i.$slots, "title", {}, () => [
                e.title ? (_(), w("h3", tp, A(e.title), 1)) : V("", !0)
              ], !0),
              e.subtitle ? (_(), w("p", ep, A(e.subtitle), 1)) : V("", !0),
              $t(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            s.value ? (_(), w("div", np, [
              $t(i.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          i.$slots.headerAside ? (_(), w("div", ap, [
            $t(i.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ])
      ]),
      r("div", sp, [
        $t(i.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ht = /* @__PURE__ */ at(op, [["__scopeId", "data-v-ec720d6f"]]);
function ip(e, t) {
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
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
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
function lp(e, t) {
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
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Hi(e, t) {
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
      d: "M15.75 19.5 8.25 12l7.5-7.5"
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
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function dp(e, t) {
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
function up(e, t) {
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
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
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
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const hp = {
  key: 0,
  class: "footer-divider"
}, fp = {
  key: 0,
  class: "export-label"
}, gp = { class: "export-buttons" }, pp = ["disabled"], mp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, bp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, vp = ["disabled"], yp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, _p = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, xp = /* @__PURE__ */ Z({
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
    return (d, c) => (_(), tt(Xe(s.value), {
      class: W(o.value)
    }, {
      default: E(() => [
        e.variant === "footer" ? (_(), w("div", hp)) : V("", !0),
        r("div", {
          class: W(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (_(), w("span", fp, "Export")) : V("", !0),
          r("div", gp, [
            i("pdf") ? (_(), w("button", {
              key: 0,
              type: "button",
              class: W(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (_(), w("svg", mp, [...c[2] || (c[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (_(), w("svg", bp, [...c[3] || (c[3] = [
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
            ], 10, pp)) : V("", !0),
            i("csv") ? (_(), w("button", {
              key: 1,
              type: "button",
              class: W(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (_(), w("svg", yp, [...c[5] || (c[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (_(), w("svg", _p, [...c[6] || (c[6] = [
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
            ], 10, vp)) : V("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Bt = /* @__PURE__ */ at(xp, [["__scopeId", "data-v-32629e66"]]), kp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, wp = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, Cp = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, $p = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Mp = { class: "w-full shrink-0 sm:pr-2" }, Sp = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Dp = { class: "max-w-[360px] text-center" }, Ap = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Tp = /* @__PURE__ */ Z({
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
    }, s = e, o = n, i = (p) => {
      o("export", p);
    }, l = [30, 50, 70, 50, 40], d = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], c = rt(s, "theme"), u = rt(s, "options"), { isDark: h } = dt(c), m = (p) => {
      const b = new Date(p), y = String(b.getDate()).padStart(2, "0"), g = String(b.getMonth() + 1).padStart(2, "0");
      return `${y}-${g}`;
    }, x = D(() => {
      const p = s.data?.agents_by_day || {}, b = Object.keys(p).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const y = b.map((M) => m(M)), g = /* @__PURE__ */ new Set();
      for (const M of Object.values(p))
        for (const S of Object.keys(M))
          g.add(S);
      const f = Array.from(g), v = (M) => M, k = f.map((M) => ({
        label: M,
        data: b.map((S) => p[S]?.[M] || 0),
        backgroundColor: `${a[M] || "#94a3b8"}80`,
        borderColor: v(a[M] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: y,
        datasets: k
      };
    });
    return t({ isDark: h }), (p, b) => (_(), tt(ht, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, Tt({
      default: E(() => [
        r("div", kp, [
          e.loading ? (_(), w("div", wp, [
            r("div", Cp, [
              (_(), w(K, null, nt(l, (y, g) => r("div", {
                key: g,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", d[g]]),
                style: gt({ height: `${y}%` })
              }, null, 6)), 64))
            ]),
            b[0] || (b[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : x.value.labels && x.value.labels.length ? (_(), w("section", $p, [
            r("div", Mp, [
              R(_e, {
                data: x.value,
                stacked: !0,
                theme: c.value,
                options: u.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (_(), w("section", Sp, [
            r("div", Dp, [
              r("div", Ap, [
                R(F(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              b[1] || (b[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
              b[2] || (b[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
            ])
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), Bp = { class: "flex w-full min-w-0 justify-center" }, Lp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Fp = { class: "min-w-0 truncate text-[12px] leading-normal" }, Ip = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Pp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Ep = /* @__PURE__ */ Z({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (_(), w("div", {
      class: W(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[72px]" : "h-[58px]"])
    }, [
      r("div", Bp, [
        r("div", Lp, [
          e.color ? (_(), w("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: gt({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          r("span", Fp, A(e.title), 1)
        ])
      ]),
      r("p", Ip, A(e.value), 1),
      e.subvalue ? (_(), w("p", Pp, A(e.subvalue), 1)) : V("", !0)
    ], 2));
  }
}), ot = /* @__PURE__ */ at(Ep, [["__scopeId", "data-v-49db84b0"]]), Rp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, jt = /* @__PURE__ */ Z({
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
    return (l, d) => n.value ? (_(), w("span", {
      key: 0,
      role: "status",
      class: W(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (_(), w("span", Rp, [...d[0] || (d[0] = [
        r("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : V("", !0),
      r("span", {
        class: W(["min-w-0 flex-1 text-center", o.value])
      }, A(a.value), 3)
    ], 2)) : (_(), w("span", {
      key: 1,
      class: W(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      $t(l.$slots, "default", {}, () => [
        yt(A(e.label), 1)
      ])
    ], 2));
  }
}), q = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), xt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Me = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Op = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Vp = { class: "overflow-x-auto" }, zp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Np = /* @__PURE__ */ Z({
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
    const t = e, n = et(!1), a = "—";
    function s(b) {
      return b == null || b === "" ? a : String(b);
    }
    function o(b) {
      return b === "center" ? "text-center" : b === "right" ? "text-right" : "text-left";
    }
    function i(b) {
      return `cell-${b}`;
    }
    function l(b, y) {
      return b[y];
    }
    function d(b, y) {
      if (typeof t.rowKey == "function")
        return t.rowKey(b);
      const g = b[t.rowKey];
      return typeof g == "string" || typeof g == "number" ? g : y;
    }
    function c(b, y) {
      return d(b, y);
    }
    const u = D(() => t.rows?.length ?? 0), h = D(() => u.value > t.maxVisibleRows), m = D(() => Math.max(0, u.value - t.maxVisibleRows)), x = D(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), p = D(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(m.value))
    );
    return (b, y) => (_(), w("div", Op, [
      r("div", Vp, [
        r("table", zp, [
          r("thead", null, [
            r("tr", null, [
              (_(!0), w(K, null, nt(e.columns, (g) => (_(), w("th", {
                key: g.key,
                scope: "col",
                class: W(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [o(g.align), g.headerClass]])
              }, A(g.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (_(!0), w(K, null, nt(x.value, (g, f) => (_(), w("tr", {
              key: c(g, f)
            }, [
              (_(!0), w(K, null, nt(e.columns, (v) => (_(), w("td", {
                key: `${f}-${v.key}`,
                class: W(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [o(v.align), v.cellClass]])
              }, [
                $t(b.$slots, i(v.key), {
                  row: g,
                  column: v,
                  value: l(g, v.key)
                }, () => [
                  yt(A(s(l(g, v.key))), 1)
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
        onClick: y[0] || (y[0] = (g) => n.value = !n.value)
      }, [
        yt(A(n.value ? e.viewLessLabel : p.value) + " ", 1),
        (_(), w("svg", {
          class: W(["view-more-icon", { "view-more-icon-rotated": n.value }]),
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
      ])) : V("", !0)
    ]));
  }
}), Jt = /* @__PURE__ */ at(Np, [["__scopeId", "data-v-58cfdc5e"]]), jp = {
  key: 0,
  class: "loading-state"
}, Hp = {
  key: 1,
  class: "error-state"
}, Wp = { class: "error-content" }, Yp = { class: "error-description" }, Kp = {
  key: 2,
  class: "card-body"
}, qp = { class: "chart-section" }, Up = { class: "chart-wrapper" }, Xp = { class: "payment-success-summary" }, Gp = {
  key: 0,
  class: "booking-daily-section"
}, Zp = { class: "w-full min-w-0" }, Qp = { class: "font-medium" }, Jp = { class: "percentage-text" }, tm = { class: "badges-container" }, em = {
  key: 0,
  class: "badges-container"
}, nm = {
  key: 1,
  class: "percentage-text"
}, am = { class: "badges-container" }, sm = {
  key: 1,
  class: "empty-state"
}, om = /* @__PURE__ */ Z({
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
      (f, v) => new Date(f.date).getTime() - new Date(v.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], d = D(
      () => i.value.map((f) => ({
        id: f.date,
        ...f
      }))
    ), c = D(() => a.data?.total_payment_success_value || []), u = D(() => {
      const f = c.value;
      return f.length === 0 ? p(0) : f.map((v) => `${v.currency} ${p(v.total_value)}`).join(" · ");
    }), h = (f) => f.payment_success_value || [], m = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce((v, k) => v + (k.count || 0), 0), x = (f) => xt(f), p = (f) => f == null ? "0" : Me(f);
    D(() => (a.data?.total_payment_success_value || []).reduce((f, v) => f + (v.total_value || 0), 0));
    const b = D(() => {
      const f = a.data, v = f.total_booking_initiated || 0, k = f.total_booking_started || 0, M = f.total_payment_initiated || 0, S = f.total_not_found || 0, C = f.total_cancelled || 0, $ = f.total_no_pending_balance || 0, L = f.total_errors || 0, T = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce((Q, J) => Q + (J.count || 0), 0), B = f.total_payment_failed || 0, I = Math.max(0, v - k), P = Math.max(0, k - M - S - C - $ - L), N = (Q, J) => {
        const lt = J > 0 ? Math.round(Q / J * 100) : 0;
        return `${q(Q)} (${lt}%)`;
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
      ], H = [];
      return k > 0 && H.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: N(k, v)
      }), I > 0 && H.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: I,
        label: N(I, v)
      }), M > 0 && H.push({
        source: "Started",
        target: "Payment Initiated",
        value: M,
        label: N(M, k)
      }), S > 0 && H.push({
        source: "Started",
        target: "Not Found",
        value: S,
        label: N(S, k)
      }), C > 0 && H.push({
        source: "Started",
        target: "Cancelled",
        value: C,
        label: N(C, k)
      }), $ > 0 && H.push({
        source: "Started",
        target: "No Pending Balance",
        value: $,
        label: N($, k)
      }), L > 0 && H.push({
        source: "Started",
        target: "Errors",
        value: L,
        label: N(L, k)
      }), P > 0 && H.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: N(P, k)
      }), T > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, M)
      }), B > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, M)
      }), { nodes: Y, links: H };
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
    }, g = (f, v) => !v || v === 0 ? "0%" : `${Math.round(f / v * 100)}%`;
    return (f, v) => (_(), tt(ht, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis"
    }, Tt({
      default: E(() => [
        a.loading ? (_(), w("div", jp, [...v[0] || (v[0] = [
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
        ])])) : a.error ? (_(), w("div", Hp, [
          r("div", Wp, [
            v[1] || (v[1] = r("div", { class: "error-icon-wrapper" }, [
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
            v[2] || (v[2] = r("p", { class: "error-title" }, "Error loading data", -1)),
            r("p", Yp, A(a.error), 1)
          ])
        ])) : (_(), w("div", Kp, [
          r("section", qp, [
            r("div", Up, [
              R(Ie, {
                data: b.value,
                "node-colors": y,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", Xp, [
            R(ot, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (_(), w("section", Gp, [
            v[3] || (v[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Zp, [
              R(Jt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  r("span", Qp, A(F(Rt)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": E(({ row: k }) => [
                  r("span", null, A(F(q)(Number(k.booking_initiated_count))), 1)
                ]),
                "cell-started": E(({ row: k }) => [
                  r("span", null, [
                    yt(A(F(q)(Number(k.booking_started_count))) + " ", 1),
                    r("span", Jp, " (" + A(g(Number(k.booking_started_count), Number(k.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": E(({ row: k }) => [
                  r("span", null, A(F(q)(Number(k.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": E(({ row: k }) => [
                  r("div", tm, [
                    R(jt, { color: "success" }, {
                      default: E(() => [
                        yt(" Success: " + A(F(q)(m(k))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "danger" }, {
                      default: E(() => [
                        yt(" Failed: " + A(F(q)(Number(k.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": E(({ row: k }) => [
                  h(k).length > 0 ? (_(), w("div", em, [
                    (_(!0), w(K, null, nt(h(k), (M) => (_(), w("span", {
                      key: `${k.date}-${M.currency}`,
                      class: "badge badge-currency"
                    }, A(M.currency) + " " + A(x(M.total_value)), 1))), 128))
                  ])) : (_(), w("span", nm, "N/A"))
                ]),
                "cell-outcomes": E(({ row: k }) => [
                  r("div", am, [
                    R(jt, { color: "danger" }, {
                      default: E(() => [
                        yt(" Not Found: " + A(k.not_found_count ? F(q)(Number(k.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "warning" }, {
                      default: E(() => [
                        yt(" Cancelled: " + A(k.cancelled_count ? F(q)(Number(k.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "orange" }, {
                      default: E(() => [
                        yt(" No Balance: " + A(k.no_pending_balance_count ? F(q)(Number(k.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "danger" }, {
                      default: E(() => [
                        yt(" Errors: " + A(k.error_count ? F(q)(Number(k.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), w("section", sm, [...v[4] || (v[4] = [
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
        fn: E(() => [
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
}), im = /* @__PURE__ */ at(om, [["__scopeId", "data-v-d4f6350a"]]), lm = {
  key: 0,
  class: "loading-state"
}, rm = {
  key: 1,
  class: "card-body"
}, cm = {
  key: 0,
  class: "chart-section"
}, dm = { class: "chart-wrapper" }, um = {
  key: 1,
  class: "checkin-daily-section"
}, hm = { class: "w-full min-w-0" }, fm = { class: "font-medium" }, gm = { class: "cell-success" }, pm = { class: "cell-danger" }, mm = {
  key: 0,
  class: "reasons-list"
}, bm = { class: "reason-name" }, vm = { class: "reason-count" }, ym = {
  key: 1,
  class: "no-reasons"
}, _m = {
  key: 2,
  class: "empty-state"
}, xm = {
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
    }, l = et([]), d = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], c = D(
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
    }), m = D(() => {
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
      return (h.value.unrecovered_by_step || []).forEach((k) => {
        const S = k.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), C = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        f[S] = C[S] || "#DC2626";
      }), f;
    }), x = (f, v) => !v || v === 0 ? "0%" : `${Math.round(f / v * 100)}%`, p = (f, v) => {
      const k = q(f), M = x(f, v);
      return `${k} (${M})`;
    }, b = (f) => f.reduce((v, k) => v + k.failed_count, 0), y = D(() => {
      const f = [], v = [];
      if (!u.value.total_checkin_initiated)
        return { nodes: f, links: v };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const k = u.value.total_checkin_initiated, M = u.value.total_checkin_init, S = u.value.total_checkin_init_abandoned, C = M - S, $ = u.value.total_checkin_started, L = u.value.total_checkin_completed, T = u.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], I = B.reduce((H, Q) => H + Q.count, 0);
      if (M > 0) {
        const H = Math.round(M / k * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${H}%)`
        });
      }
      const P = k - M;
      if (P > 0) {
        const H = Math.round(P / k * 100);
        f.push({ name: "Abandoned (Init)" }), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: P,
          label: `${P.toLocaleString()} (${H}%)`
        });
      }
      if (S > 0) {
        const H = Math.round(S / k * 100);
        f.push({ name: "Abandoned (Started)" }), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: S,
          label: `${S.toLocaleString()} (${H}%)`
        });
      }
      if (C > 0) {
        const H = Math.round(C / k * 100);
        v.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: C,
          label: `${C.toLocaleString()} (${H}%)`
        });
      }
      if ($ > 0) {
        const H = Math.round($ / k * 100);
        v.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${H}%)`
        });
      }
      if (L > 0) {
        const H = Math.round(L / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Completed",
          value: L,
          label: `${L.toLocaleString()} (${H}%)`
        });
      }
      if (B.length > 0 && I > 0) {
        f.push({ name: "Unrecovered" });
        const H = Math.round(I / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: I,
          label: `${I.toLocaleString()} (${H}%)`
        }), B.forEach((Q) => {
          const lt = Q.step_name.replace(/_/g, " ").split(" ").map((pt) => pt.charAt(0).toUpperCase() + pt.slice(1)).join(" "), vt = Math.round(Q.count / $ * 100);
          f.push({ name: lt }), v.push({
            source: "Unrecovered",
            target: lt,
            value: Q.count,
            label: `${Q.count.toLocaleString()} (${vt}%)`
          });
        });
      }
      const N = $ - (L + I);
      if (N > 0) {
        const H = Math.round(N / $ * 100);
        f.push({ name: "Abandoned (Flow)" }), v.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${H}%)`
        });
      }
      const Y = L - T;
      if (Y > 0) {
        const H = Math.round(Y / $ * 100);
        f.push({ name: "BP Error" }), v.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${H}%)`
        });
      }
      if (T > 0) {
        const H = Math.round(T / $ * 100);
        v.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${H}%)`
        });
      }
      return { nodes: f, links: v };
    }), g = () => {
      const f = u.value.checkin_by_day || [], v = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((k) => {
        const M = v.find(
          (S) => S.date === k.date
        );
        return {
          ...k,
          failed_steps: M?.steps || []
        };
      }), l.value.sort((k, M) => new Date(k.date) - new Date(M.date));
    };
    return Ft(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        g();
      },
      { deep: !0, immediate: !0 }
    ), (f, v) => (_(), tt(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, Tt({
      default: E(() => [
        s.loading ? (_(), w("div", lm, [...v[0] || (v[0] = [
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
        ])])) : (_(), w("div", rm, [
          y.value.nodes.length > 0 ? (_(), w("section", cm, [
            r("div", dm, [
              R(Ie, {
                data: y.value,
                height: "500px",
                "node-colors": m.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : V("", !0),
          l.value && l.value.length > 0 ? (_(), w("section", um, [
            r("div", hm, [
              R(Jt, {
                columns: d,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  r("span", fm, A(F(Rt)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: k }) => [
                  r("span", null, A(F(q)(k.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: k }) => [
                  r("span", null, A(p(k.checkin_init_count, k.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": E(({ row: k }) => [
                  r("span", null, A(F(q)(k.checkin_started_count)), 1)
                ]),
                "cell-completed": E(({ row: k }) => [
                  r("span", null, A(p(k.checkin_completed_count, k.checkin_started_count)), 1)
                ]),
                "cell-closed": E(({ row: k }) => [
                  r("span", gm, A(p(k.checkin_closed_count, k.checkin_started_count)), 1)
                ]),
                "cell-failed": E(({ row: k }) => [
                  r("span", pm, A(p(b(k.failed_steps), k.checkin_started_count)), 1)
                ]),
                "cell-reasons": E(({ row: k }) => [
                  k.failed_steps && k.failed_steps.length > 0 ? (_(), w("div", mm, [
                    (_(!0), w(K, null, nt(k.failed_steps, (M) => (_(), w("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      r("span", bm, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", vm, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), w("div", ym, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), w("section", _m, [...v[1] || (v[1] = [
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
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}, Yi = /* @__PURE__ */ at(xm, [["__scopeId", "data-v-1beb998a"]]), km = {
  key: 0,
  class: "loading-state"
}, wm = {
  key: 1,
  class: "card-body"
}, Cm = {
  key: 0,
  class: "sankey-section"
}, $m = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Mm = { class: "w-full min-w-0" }, Sm = { class: "font-medium whitespace-nowrap" }, Dm = { class: "cell-success" }, Am = { class: "cell-danger" }, Tm = {
  key: 0,
  class: "reasons-list"
}, Bm = { class: "reason-name" }, Lm = { class: "reason-count" }, Fm = {
  key: 1,
  class: "no-reasons"
}, Im = {
  key: 2,
  class: "empty-state"
}, Pm = { class: "empty-state-content" }, Em = { class: "empty-icon-wrapper" }, Rm = /* @__PURE__ */ Z({
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
    }, { isDark: i } = dt(rt(a, "theme")), l = (g) => g == null ? "0" : g.toLocaleString(), d = (g) => {
      const [f, v, k] = g.split("-").map(Number);
      return Rt([f, v - 1, k]).format("MMM DD");
    }, c = (g) => g.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), u = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, h = (g, f) => {
      const v = g || 0, k = f || 0, M = l(v), S = u(v, k);
      return `${M} (${S})`;
    }, m = D(() => ({
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
    })), x = D(() => {
      const g = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], v = a.failedData?.unrecovered_by_day || [];
      return g.map((M) => {
        const S = f.find(($) => $.date === M.date), C = v.find(($) => $.date === M.date);
        return {
          ...M,
          failed_steps: S?.steps || [],
          unrecovered_count: C?.unrecovered_count || 0
        };
      }).sort((M, S) => new Date(M.date).getTime() - new Date(S.date).getTime());
    }), p = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], b = D(
      () => x.value.map((g) => ({
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
      const g = [], f = [], v = /* @__PURE__ */ new Set(), k = (z) => {
        v.has(z) || (g.push({ name: z }), v.add(z));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: g, links: f };
      k("Checkin Init"), k("Booking Retrieval"), k("Booking Retrieved"), k("Completed"), k("Closed with BP");
      const M = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_record_locator_init || 0, C = a.checkinData.total_record_locator_init_abandoned || 0, $ = a.checkinData.total_checkin_pre_init_abandoned_error, L = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = $ != null || L != null, B = T ? Math.max(Number($) || 0, 0) : 0, I = T ? Math.max(Number(L) || 0, 0) : 0, P = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = P != null || N != null, H = Y ? Math.max(Number(P) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, J = Y ? Math.max(C - H - Q, 0) : C, lt = S - C, vt = a.checkinData.total_record_locator_started || 0, pt = a.checkinData.total_record_locator_completed || 0, ct = a.checkinData.total_record_locator_closed || 0, Mt = a.checkinData.total_record_locator_unrecovered || 0;
      if (S > 0) {
        const z = Math.round(S / M * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: S,
          label: `${S.toLocaleString()} (${z}%)`
        });
      }
      const st = M - S;
      if (T) {
        if (I > 0) {
          const z = Math.round(I / M * 100);
          k("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: I,
            label: `${I.toLocaleString()} (${z}%)`
          });
        }
        if (B > 0) {
          const z = Math.round(B / M * 100);
          k("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${z}%)`
          });
        }
      } else if (st > 0) {
        const z = Math.round(st / M * 100);
        k("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: st,
          label: `${st.toLocaleString()} (${z}%)`
        });
      }
      if (Y) {
        if (H > 0) {
          const z = Math.round(H / M * 100);
          k("Error"), f.push({
            source: "Booking Retrieval",
            target: "Error",
            value: H,
            label: `${H.toLocaleString()} (${z}%)`
          });
        }
        if (Q > 0) {
          const z = Math.round(Q / M * 100);
          k("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: Q,
            label: `${Q.toLocaleString()} (${z}%)`
          });
        }
        if (J > 0) {
          const z = Math.round(J / M * 100);
          k("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: J,
            label: `${J.toLocaleString()} (${z}%)`
          });
        }
      } else if (C > 0) {
        const z = Math.round(C / M * 100);
        k("Abandoned (Started)"), f.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${z}%)`
        });
      }
      if (lt > 0) {
        const z = Math.round(lt / M * 100);
        f.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: lt,
          label: `${lt.toLocaleString()} (${z}%)`
        });
      }
      if (pt > 0) {
        const z = Math.round(pt / vt * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: pt,
          label: `${pt.toLocaleString()} (${z}%)`
        });
      }
      if (Mt > 0) {
        k("Errors");
        const z = Math.round(Mt / vt * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: Mt,
          label: `${Mt.toLocaleString()} (${z}%)`
        });
      }
      const Et = vt - (pt + Mt);
      if (Et > 0) {
        const z = Math.round(Et / vt * 100);
        k("Abandoned (Flow)"), f.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Et,
          label: `${Et.toLocaleString()} (${z}%)`
        });
      }
      const At = pt - ct;
      if (At > 0) {
        const z = Math.round(At / vt * 100);
        k("BP Error"), f.push({
          source: "Completed",
          target: "BP Error",
          value: At,
          label: `${At.toLocaleString()} (${z}%)`
        });
      }
      if (ct > 0) {
        const z = Math.round(ct / vt * 100);
        f.push({
          source: "Completed",
          target: "Closed with BP",
          value: ct,
          label: `${ct.toLocaleString()} (${z}%)`
        });
      }
      return { nodes: g, links: f };
    });
    return t({ isDark: i }), (g, f) => (_(), tt(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, Tt({
      default: E(() => [
        e.loading ? (_(), w("div", km, [...f[0] || (f[0] = [
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
        ])])) : (_(), w("div", wm, [
          y.value.nodes.length > 0 ? (_(), w("div", Cm, [
            R(Ie, {
              data: y.value,
              height: "500px",
              "node-colors": m.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : V("", !0),
          x.value && x.value.length > 0 ? (_(), w("div", $m, [
            r("div", Mm, [
              R(Jt, {
                columns: p,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: v }) => [
                  r("span", Sm, A(d(String(v.date))), 1)
                ]),
                "cell-checkinInit": E(({ row: v }) => [
                  r("span", null, A(l(v.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": E(({ row: v }) => [
                  r("span", null, A(h(v.record_locator_init_count, v.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": E(({ row: v }) => [
                  r("span", null, A(h(v.record_locator_started_count, v.record_locator_init_count)), 1)
                ]),
                "cell-completed": E(({ row: v }) => [
                  r("span", null, A(h(v.record_locator_completed_count, v.record_locator_started_count)), 1)
                ]),
                "cell-closed": E(({ row: v }) => [
                  r("span", Dm, A(h(v.record_locator_closed_count, v.record_locator_started_count)), 1)
                ]),
                "cell-failed": E(({ row: v }) => [
                  r("span", Am, A(h(v.unrecovered_count, v.record_locator_started_count)), 1)
                ]),
                "cell-reasons": E(({ row: v }) => [
                  Array.isArray(v.failed_steps) && v.failed_steps.length > 0 ? (_(), w("div", Tm, [
                    (_(!0), w(K, null, nt(v.failed_steps, (k) => (_(), w("div", {
                      key: k.step_name,
                      class: "reason-item"
                    }, [
                      r("span", Bm, A(c(k.step_name)) + ":", 1),
                      r("span", Lm, A(k.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), w("div", Fm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), w("div", Im, [
            r("div", Pm, [
              r("div", Em, [
                R(F(qt), { class: "empty-icon" })
              ]),
              f[1] || (f[1] = r("p", { class: "empty-title" }, "No check-in data available", -1)),
              f[2] || (f[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: E(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), Om = /* @__PURE__ */ at(Rm, [["__scopeId", "data-v-4b78de4b"]]), Vm = {
  key: 0,
  class: "loading-state"
}, zm = {
  key: 1,
  class: "card-body"
}, Nm = {
  key: 0,
  class: "chart-section"
}, jm = { class: "chart-wrapper" }, Hm = {
  key: 1,
  class: "record-locator-daily-section"
}, Wm = { class: "w-full min-w-0" }, Ym = { class: "cell-plain font-medium" }, Km = { class: "cell-plain text-center" }, qm = { class: "cell-plain text-center" }, Um = { class: "cell-plain text-center" }, Xm = { class: "cell-plain text-center" }, Gm = { class: "cell-plain text-center success-value" }, Zm = { class: "cell-plain text-center failed-value" }, Qm = { class: "cell-plain text-center warning-value" }, Jm = { class: "cell-plain text-center" }, t0 = { class: "cell-plain text-center failed-value" }, e0 = {
  key: 2,
  class: "empty-state"
}, n0 = /* @__PURE__ */ Z({
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
    ), m = D(() => a.data), x = D(() => ({
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
    })), p = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, b = (g, f) => {
      const v = q(g), k = p(g, f);
      return `${v} (${k})`;
    }, y = D(() => {
      const g = [], f = [], v = /* @__PURE__ */ new Set(), k = (st) => {
        v.has(st) || (g.push({ name: st }), v.add(st));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: g, links: f };
      k("Checkin Init"), k("Booking retrive"), k("Checkin Started"), k("Checkin Completed"), k("Checkin Closed");
      const M = m.value.total_checkin_initiated, S = m.value.total_record_locator_init, C = m.value.total_record_locator_started, $ = m.value.total_record_locator_completed, L = m.value.total_record_locator_closed, T = m.value.total_record_locator_failed, B = m.value.total_record_locator_abandoned, I = m.value.total_record_locator_init_abandoned, P = m.value.total_checkin_pre_init_abandoned_error, N = m.value.total_checkin_pre_init_abandoned_voluntary, Y = P != null || N != null, H = Y ? Math.max(Number(P) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, J = m.value.total_record_locator_init_abandoned_error, lt = m.value.total_record_locator_init_abandoned_voluntary, vt = J != null || lt != null, pt = vt ? Math.max(Number(J) || 0, 0) : 0, ct = vt ? Math.max(Number(lt) || 0, 0) : 0;
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
        if (Q > 0) {
          const st = Math.round(Q / M * 100);
          k("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: Q,
            label: `${Q.toLocaleString()} (${st}%)`
          });
        }
        if (H > 0) {
          const st = Math.round(H / M * 100);
          k("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: H,
            label: `${H.toLocaleString()} (${st}%)`
          });
        }
      } else if (Mt > 0) {
        const st = Math.round(Mt / M * 100);
        k("Abandoned (Init)"), f.push({
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
      if (vt) {
        if (pt > 0) {
          const st = Math.round(pt / M * 100);
          k("Error"), f.push({
            source: "Booking retrive",
            target: "Error",
            value: pt,
            label: `${pt.toLocaleString()} (${st}%)`
          });
        }
        if (ct > 0) {
          const st = Math.round(ct / M * 100);
          k("Abandoned (Started)"), f.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: ct,
            label: `${ct.toLocaleString()} (${st}%)`
          });
        }
      } else if (I > 0) {
        const st = Math.round(I / M * 100);
        k("Abandoned (Started)"), f.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: I,
          label: `${I.toLocaleString()} (${st}%)`
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
        k("Checkin Failed"), f.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${st}%)`
        });
      }
      if (B > 0) {
        const st = Math.round(B / C * 100);
        k("Abandoned (Flow)"), f.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${st}%)`
        });
      }
      return { nodes: g, links: f };
    });
    return t({ isDark: i }), (g, f) => (_(), tt(ht, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible
    }, Tt({
      default: E(() => [
        a.loading ? (_(), w("div", Vm, [...f[0] || (f[0] = [
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
        ])])) : (_(), w("div", zm, [
          y.value.nodes.length > 0 ? (_(), w("section", Nm, [
            r("div", jm, [
              R(Ie, {
                data: y.value,
                height: "500px",
                "node-colors": x.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : V("", !0),
          l.value && l.value.length > 0 ? (_(), w("section", Hm, [
            r("div", Wm, [
              R(Jt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: v }) => [
                  r("span", Ym, A(F(Rt)(String(v.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: v }) => [
                  r("span", Km, A(F(q)(v.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: v }) => [
                  r("span", qm, A(b(v.record_locator_init_count, v.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": E(({ row: v }) => [
                  r("span", Um, A(F(q)(v.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": E(({ row: v }) => [
                  r("span", Xm, A(b(v.record_locator_completed_count, v.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": E(({ row: v }) => [
                  r("span", Gm, A(b(v.record_locator_closed_count, v.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": E(({ row: v }) => [
                  r("span", Zm, A(b(v.record_locator_failed_count, v.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": E(({ row: v }) => [
                  r("span", Qm, A(b(v.record_locator_abandoned_count, v.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": E(({ row: v }) => [
                  r("span", Jm, A(F(q)(v.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": E(({ row: v }) => [
                  r("span", t0, A(F(q)(v.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (_(), w("section", e0, [...f[1] || (f[1] = [
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
        fn: E(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible"]));
  }
}), Ki = /* @__PURE__ */ at(n0, [["__scopeId", "data-v-9cee2d59"]]), a0 = {
  key: 0,
  class: "loading-state"
}, s0 = {
  key: 1,
  class: "card-body"
}, o0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, i0 = { class: "w-full min-w-0" }, l0 = { class: "segment-plain" }, r0 = { class: "segment-plain" }, c0 = { class: "segment-plain" }, d0 = { class: "percentage-value" }, u0 = { class: "percentage-value" }, h0 = { class: "percentage-value success" }, f0 = {
  key: 1,
  class: "empty-state"
}, g0 = /* @__PURE__ */ Z({
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
    }, { isDark: i } = dt(rt(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], d = D(
      () => a.data.map((m, x) => ({
        id: `segment-${x}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, x) => !x || x === 0 || !m ? "0%" : `${Math.round(m / x * 100)}%`, u = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), h = (m) => {
      const x = u(m?.departure_airport), p = u(m?.arrival_airport);
      return x === "-" || p === "-" ? !1 : x === p;
    };
    return t({ isDark: i }), (m, x) => (_(), tt(ht, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, Tt({
      default: E(() => [
        a.loading ? (_(), w("div", a0, [...x[0] || (x[0] = [
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
        ])])) : (_(), w("div", s0, [
          a.data.length > 0 ? (_(), w("section", o0, [
            r("div", i0, [
              R(Jt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": E(({ row: p }) => [
                  r("span", l0, A(u(p.departure_airport)), 1)
                ]),
                "cell-connection": E(({ row: p }) => [
                  r("span", {
                    class: W(["segment-plain", {
                      "segment-plain--muted": u(p.conexion_airport) === "-"
                    }])
                  }, A(u(p.conexion_airport)), 3)
                ]),
                "cell-arrival": E(({ row: p }) => [
                  r("span", r0, A(u(p.arrival_airport)), 1)
                ]),
                "cell-trip": E(({ row: p }) => [
                  r("span", c0, A(h(p) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": E(({ row: p }) => [
                  yt(A(F(q)(p.segment_init_count)), 1)
                ]),
                "cell-started": E(({ row: p }) => [
                  r("span", d0, A(c(p.segment_started_count, p.segment_init_count)), 1)
                ]),
                "cell-completed": E(({ row: p }) => [
                  r("span", u0, A(c(p.segment_completed_count, p.segment_init_count)), 1)
                ]),
                "cell-closed": E(({ row: p }) => [
                  r("span", h0, A(c(p.segment_closed_count, p.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), w("section", f0, [...x[1] || (x[1] = [
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
        fn: E(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible", "default-open"]));
  }
}), qi = /* @__PURE__ */ at(g0, [["__scopeId", "data-v-22b55b09"]]), p0 = { class: "checkin-container__body" }, m0 = /* @__PURE__ */ Z({
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
    function d(h, m) {
      a("export", { source: h, format: m });
    }
    function c(h) {
      return typeof h == "object" && h !== null && "source" in h;
    }
    function u(h) {
      if (c(h)) {
        a("export", h);
        return;
      }
      d("checkinSegments", h);
    }
    return (h, m) => (_(), tt(ht, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: E(() => [
        r("div", p0, [
          e.showCheckin ? (_(), tt(Yi, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[0] || (m[0] = (x) => d("checkin", x))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : V("", !0),
          R(Ki, {
            collapsible: !1,
            loading: o.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[1] || (m[1] = (x) => d("recordLocator", x))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          R(qi, {
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
}), b0 = /* @__PURE__ */ at(m0, [["__scopeId", "data-v-90d88bae"]]), v0 = {
  key: 0,
  class: "loading-state"
}, y0 = {
  key: 1,
  class: "card-body"
}, _0 = { class: "chart-section" }, x0 = { class: "chart-wrapper" }, k0 = {
  key: 1,
  class: "empty-chart"
}, w0 = { class: "payment-success-summary" }, C0 = {
  key: 0,
  class: "disruption-daily-section"
}, $0 = { class: "w-full min-w-0" }, M0 = { class: "font-medium text-center" }, S0 = { class: "text-center" }, D0 = { class: "text-center" }, A0 = { class: "percentage-text" }, T0 = { class: "text-center" }, B0 = { class: "abandoned-value" }, L0 = { class: "badges-container badges-wrap" }, F0 = { class: "badges-container badges-wrap" }, I0 = {
  key: 1,
  class: "empty-state"
}, P0 = /* @__PURE__ */ Z({
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
    ], d = D(
      () => i.value.map((g) => ({
        id: g.date,
        ...g
      }))
    ), c = D(() => a.data?.total_payment_success || []), u = D(() => {
      const g = c.value;
      return g.length === 0 ? m(0) : g.map((f) => `${f.currency} ${m(f.total_value)}`).join(" · ");
    }), h = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, m = (g) => xt(g), x = (g) => (g ?? []).reduce((f, v) => f + (v.count ?? 0), 0), p = (g) => typeof g.sell_success_count == "number" ? g.sell_success_count : x(g.payment_success_total), b = D(() => {
      const g = a.data, f = g.total_disruption_conversations || 0, v = g.total_disruption_initiated || 0, k = g.total_voluntary || 0, M = g.total_involuntary || 0, S = g.total_accepted || 0, C = g.total_confirmed || 0, $ = typeof g.total_sell_success == "number" ? g.total_sell_success : x(g.total_payment_success), L = g.total_sell_failed || 0, T = Math.max(0, f - v), B = Math.max(0, v - k - M), I = Math.max(0, M - S), P = Math.max(0, k - C), N = L, Y = Math.max(0, C - $ - N), H = (lt, vt) => {
        const pt = vt > 0 ? Math.round(lt / vt * 100) : 0;
        return `${lt.toLocaleString()} (${pt}%)`;
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
      ], J = [];
      return v > 0 && J.push({
        source: "Initiated",
        target: "Started",
        value: v,
        label: H(v, f)
      }), T > 0 && J.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: H(T, f)
      }), k > 0 && J.push({
        source: "Started",
        target: "Voluntary",
        value: k,
        label: H(k, f)
      }), M > 0 && J.push({
        source: "Started",
        target: "Involuntary",
        value: M,
        label: H(M, f)
      }), B > 0 && J.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: H(B, f)
      }), S > 0 && J.push({
        source: "Involuntary",
        target: "Accepted",
        value: S,
        label: H(S, f)
      }), I > 0 && J.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: I,
        label: H(I, f)
      }), C > 0 && J.push({
        source: "Voluntary",
        target: "Confirmed",
        value: C,
        label: H(C, f)
      }), P > 0 && J.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: H(P, f)
      }), $ > 0 && J.push({
        source: "Confirmed",
        target: "Paid",
        value: $,
        label: H($, f)
      }), N > 0 && J.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: H(N, f)
      }), Y > 0 && J.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: H(Y, f)
      }), { nodes: Q, links: J };
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
    return (g, f) => (_(), tt(ht, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking"
    }, Tt({
      default: E(() => [
        a.loading ? (_(), w("div", v0, [...f[0] || (f[0] = [
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
        ])])) : (_(), w("div", y0, [
          r("section", _0, [
            r("div", x0, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (_(), tt(Ie, {
                key: 0,
                data: b.value,
                "node-colors": y,
                height: "500px"
              }, null, 8, ["data"])) : (_(), w("div", k0, [...f[1] || (f[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", w0, [
            R(ot, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (_(), w("section", C0, [
            f[2] || (f[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", $0, [
              R(Jt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: v }) => [
                  r("span", M0, A(F(Rt)(String(v.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": E(({ row: v }) => [
                  r("span", S0, A(F(q)(Number(v.disruption_conversations))), 1)
                ]),
                "cell-started": E(({ row: v }) => [
                  r("span", D0, [
                    yt(A(F(q)(Number(v.disruption_initiated_count))) + " ", 1),
                    r("span", A0, " (" + A(h(Number(v.disruption_initiated_count), Number(v.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": E(({ row: v }) => [
                  r("span", T0, [
                    r("span", B0, A(F(q)(Number(v.disruption_initiated_count) - Number(v.voluntary_count) - Number(v.involuntary_count))) + " (" + A(h(Number(v.disruption_initiated_count) - Number(v.voluntary_count) - Number(v.involuntary_count), Number(v.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": E(({ row: v }) => [
                  r("div", L0, [
                    (_(!0), w(K, null, nt([v], (k, M) => (_(), w(K, { key: M }, [
                      R(jt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: E(() => [
                          yt(" VOL " + A(F(q)(k.voluntary_count)) + " (" + A(h(k.voluntary_count, k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "success" }, {
                        default: E(() => [
                          yt(" Confirm " + A(F(q)(k.confirmed_count)) + " (" + A(h(k.confirmed_count, k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "warning" }, {
                        default: E(() => [
                          yt(" Not Confirm " + A(F(q)(k.voluntary_count - k.confirmed_count)) + " (" + A(h(k.voluntary_count - k.confirmed_count, k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "danger" }, {
                        default: E(() => [
                          yt(" Reject " + A(F(q)(k.sell_failed_count)) + " (" + A(h(k.sell_failed_count, k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "orange" }, {
                        default: E(() => [
                          yt(" Not Paid " + A(F(q)(Math.max(0, k.confirmed_count - p(k) - k.sell_failed_count))) + " (" + A(h(Math.max(0, k.confirmed_count - p(k) - k.sell_failed_count), k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: E(() => [
                          yt(" Finish " + A(F(q)(p(k))) + " (" + A(h(p(k), k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (_(!0), w(K, null, nt(k.payment_success_total || [], (S) => (_(), tt(jt, {
                        key: `${k.date}-${S.currency}`,
                        color: "neutral"
                      }, {
                        default: E(() => [
                          yt(A(S.currency) + " " + A(m(S.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": E(({ row: v }) => [
                  r("div", F0, [
                    (_(!0), w(K, null, nt([v], (k, M) => (_(), w(K, { key: M }, [
                      R(jt, { color: "purple" }, {
                        default: E(() => [
                          yt(" INV " + A(F(q)(k.involuntary_count)) + " (" + A(h(k.involuntary_count, k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "danger" }, {
                        default: E(() => [
                          yt(" Human " + A(F(q)(k.involuntary_count - k.accepted_count)) + " (" + A(h(k.involuntary_count - k.accepted_count, k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "success" }, {
                        default: E(() => [
                          yt(" Accept " + A(F(q)(k.accepted_count)) + " (" + A(h(k.accepted_count, k.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (_(), w("section", I0, [...f[3] || (f[3] = [
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
        fn: E(() => [
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
}), E0 = /* @__PURE__ */ at(P0, [["__scopeId", "data-v-0aeb0a8c"]]), R0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, O0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, V0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, z0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, N0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, j0 = /* @__PURE__ */ Z({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (y) => {
      i("export", y);
    }, d = rt(o, "theme"), { isDark: c } = dt(d), u = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = et({ labels: [], datasets: [] }), m = D(
      () => o.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), x = D(() => {
      const y = m.value, g = y.total_airline_information_retrieved + y.total_booking_info_retrieved + y.total_flight_status_retrieved, f = (M) => g > 0 ? (M / g * 100).toFixed(1) : "0.0", v = y.total_faq_events, k = v > 0 ? `${(y.total_documents_found / v * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: u.airline_information,
          value: `${f(y.total_airline_information_retrieved)}%`,
          subvalue: `${q(y.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: u.booking_info,
          value: `${f(y.total_booking_info_retrieved)}%`,
          subvalue: `${q(y.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: u.flight_status,
          value: `${f(y.total_flight_status_retrieved)}%`,
          subvalue: `${q(y.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: q(y.total_documents_found),
          subvalue: k
        }
      ];
    }), p = D(() => {
      const y = x.value.length;
      return y <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : y === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : y === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    }), b = (y) => {
      if (!y) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const g = y.faq_by_day || [];
      if (g.length > 0) {
        const f = g.map((S) => Rt(S.date).format("MMM DD")), v = g.map((S) => S.airline_information_retrieved_count || 0), k = g.map((S) => S.flight_status_retrieved_count || 0), M = g.map((S) => S.booking_info_retrieved_count || 0);
        h.value = {
          labels: f,
          datasets: [
            {
              label: "Airline Information",
              data: v,
              borderColor: u.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: k,
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
      (y) => {
        b(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: c }), (y, g) => (_(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, Tt({
      default: E(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (_(), w("div", R0, [
            r("div", O0, [
              (_(), w(K, null, nt(a, (f, v) => r("div", {
                key: v,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[v]]),
                style: gt({ height: `${f}%` })
              }, null, 6)), 64))
            ]),
            g[0] || (g[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (_(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), w("section", V0, [
              r("div", z0, [
                R(ke, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", {
                class: W(p.value)
              }, [
                (_(!0), w(K, null, nt(x.value, (f) => (_(), tt(ot, {
                  key: f.name,
                  color: f.color,
                  title: f.label,
                  value: f.value,
                  subvalue: f.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : (_(), w("section", N0, [...g[1] || (g[1] = [
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
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), H0 = /* @__PURE__ */ at(j0, [["__scopeId", "data-v-92007b9a"]]), W0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, Y0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, K0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, q0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, U0 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, X0 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, G0 = { class: "max-w-[360px] px-4 text-center" }, Z0 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Q0 = /* @__PURE__ */ Z({
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
    }, i = e, l = n, d = (b) => {
      l("export", b);
    }, c = rt(i, "theme"), { isDark: u } = dt(c), h = D(() => {
      const b = i.data?.agents_by_day || {}, y = Object.keys(b).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const k of Object.values(b))
        for (const M of Object.keys(k))
          g.add(M);
      const v = Array.from(g).map((k) => {
        const M = k.toLowerCase(), S = o[M] || o[k] || "#94a3b8";
        return {
          label: k.charAt(0).toUpperCase() + k.slice(1).replace(/_/g, " "),
          data: y.map((C) => b[C]?.[k] || 0),
          borderColor: S
        };
      });
      return {
        labels: y.map((k) => Rt(k).format("MMM DD")),
        datasets: v
      };
    }), m = D(() => {
      const b = i.data?.agents_by_day || {}, y = {};
      for (const f of Object.values(b))
        for (const [v, k] of Object.entries(f))
          y[v] = (y[v] || 0) + k;
      const g = Object.values(y).reduce((f, v) => f + v, 0);
      return g === 0 ? [] : Object.entries(y).sort(([, f], [, v]) => v - f).map(([f, v]) => {
        const k = f.toLowerCase();
        return {
          name: f,
          label: f.charAt(0).toUpperCase() + f.slice(1).replace(/_/g, " "),
          total: v,
          percentage: (v / g * 100).toFixed(1),
          color: o[k] || o[f] || "#94a3b8"
        };
      });
    }), x = D(() => m.value.slice(0, 4)), p = D(() => {
      const b = x.value.length;
      return b <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : b === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : b === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    });
    return t({ isDark: u }), (b, y) => (_(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, Tt({
      default: E(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          i.loading ? (_(), w("div", W0, [
            r("div", Y0, [
              (_(), w(K, null, nt(a, (g, f) => r("div", {
                key: f,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[f]]),
                style: gt({ height: `${g}%` })
              }, null, 6)), 64))
            ]),
            y[0] || (y[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (_(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), w("section", K0, [
              r("div", q0, [
                R(ke, {
                  data: h.value,
                  options: e.options,
                  theme: c.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              x.value.length ? (_(), w("div", {
                key: 0,
                class: W(p.value)
              }, [
                (_(!0), w(K, null, nt(x.value, (g) => (_(), tt(ot, {
                  key: g.name,
                  color: g.color,
                  title: g.label,
                  value: `${g.percentage}%`,
                  subvalue: `${F(q)(g.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : V("", !0)
            ])) : m.value.length ? (_(), w("section", U0, [
              r("div", {
                class: W(p.value)
              }, [
                (_(!0), w(K, null, nt(x.value, (g) => (_(), tt(ot, {
                  key: g.name,
                  color: g.color,
                  title: g.label,
                  value: `${g.percentage}%`,
                  subvalue: `${F(q)(g.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : V("", !0),
            m.value.length ? V("", !0) : (_(), w("section", X0, [
              r("div", G0, [
                r("div", Z0, [
                  R(F(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                y[1] || (y[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                y[2] || (y[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 2
    }, [
      e.enableExport && !i.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), J0 = /* @__PURE__ */ at(Q0, [["__scopeId", "data-v-75264875"]]), tb = {
  key: 0,
  class: "loading-state"
}, eb = {
  key: 1,
  class: "card-body"
}, nb = {
  key: 0,
  class: "chart-section"
}, ab = {
  key: 1,
  class: "empty-state"
}, sb = {
  key: 2,
  class: "comparison-section"
}, ob = { class: "comparison-grid" }, ib = /* @__PURE__ */ Z({
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
    }, s = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = n, l = (p) => {
      i("export", p);
    }, { isDark: d } = dt(rt(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const c = D(() => {
      const p = /* @__PURE__ */ new Set();
      for (const b of o.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(b.channels))
          p.add(y);
      return Array.from(p).sort();
    }), u = (p, b) => a[p.toLowerCase()] ?? s[b % s.length];
    function h(p) {
      return p.replace(/_/g, " ").toUpperCase();
    }
    function m(p) {
      if (p.delta === null) return "No previous data";
      const b = q(p.previous), y = `${Math.abs(p.delta).toFixed(1)}%`;
      return p.delta === 0 ? `0.0% vs prev. period (${b})` : `${p.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${b})`;
    }
    const x = D(() => {
      const p = o.data?.sales_by_channel_by_day ?? [];
      if (p.length === 0) return { labels: [], datasets: [] };
      const b = p.map((g) => Rt(g.date).format("MMM-DD")), y = c.value.map((g, f) => ({
        label: g,
        data: p.map((v) => v.channels[g] ?? 0),
        backgroundColor: u(g, f),
        borderRadius: 4
      }));
      return { labels: b, datasets: y };
    });
    return t({ isDark: d }), (p, b) => (_(), tt(ht, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, Tt({
      default: E(() => [
        o.loading ? (_(), w("div", tb, [...b[0] || (b[0] = [
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
        ])])) : (_(), w("div", eb, [
          x.value.labels.length > 0 ? (_(), w("section", nb, [
            R(_e, {
              data: x.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (_(), w("section", ab, [...b[1] || (b[1] = [
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
          e.channelComparison.length > 0 ? (_(), w("section", sb, [
            r("div", ob, [
              (_(!0), w(K, null, nt(e.channelComparison, (y, g) => (_(), tt(F(ot), {
                key: y.channel,
                color: u(y.channel, g),
                title: h(y.channel),
                value: F(q)(y.current),
                subvalue: m(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : V("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), Ui = /* @__PURE__ */ at(ib, [["__scopeId", "data-v-4f47ed67"]]), lb = {
  key: 0,
  class: "loading-state"
}, rb = {
  key: 1,
  class: "card-body"
}, cb = {
  key: 0,
  class: "chart-section"
}, db = { class: "chart-wrapper" }, ub = {
  key: 1,
  class: "empty-state"
}, hb = { class: "seller-value-cards" }, fb = {
  key: 2,
  class: "seller-daily-section"
}, gb = { class: "w-full min-w-0" }, pb = { class: "sl-cell font-medium" }, mb = { class: "sl-cell text-center" }, bb = { class: "sl-cell text-center" }, vb = { class: "sl-cell text-center" }, yb = { class: "sl-cell text-center" }, _b = { class: "sl-cell text-center" }, xb = { class: "sl-cell text-center success-value" }, kb = {
  key: 0,
  class: "currency-cell-list"
}, wb = {
  key: 1,
  class: "empty-cell"
}, Cb = { class: "sl-cell text-center success-value" }, $b = { class: "sl-cell text-center" }, Mb = { class: "sl-cell text-center success-value" }, Sb = {
  key: 0,
  class: "currency-cell-list"
}, Db = {
  key: 1,
  class: "empty-cell"
}, Ab = { class: "sl-cell text-center success-value" }, Tb = { class: "sl-cell text-center" }, Bb = { class: "sl-cell text-center success-value" }, Lb = {
  key: 0,
  class: "currency-cell-list"
}, Fb = { key: 1 }, Ib = {
  key: 0,
  class: "failed-reasons"
}, Pb = { class: "reason-name" }, Eb = { class: "reason-count" }, Rb = {
  key: 1,
  class: "empty-cell"
}, Ob = /* @__PURE__ */ Z({
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
    }, { isDark: l } = dt(rt(s, "theme")), d = D(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const B = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((I) => {
        const P = B.findIndex((N) => N.date === I.date);
        P !== -1 ? B[P] = { ...B[P], reasons: I.reasons } : B.push({
          date: I.date,
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
          reasons: I.reasons
        });
      }), B.sort((I, P) => new Date(I.date).getTime() - new Date(P.date).getTime());
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
    ), h = D(() => s.sellerData), m = D(() => s.failedData), x = D(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), p = D(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), b = D(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), y = D(() => {
      const B = x.value;
      return B.length > 0 ? B.map((I) => `${I.currency} ${Me(I.total_value)}`).join(" · ") : T(s.sellerData.total_value_sell_success);
    });
    function g(B) {
      return B.length > 0 ? B.map((I) => `${I.currency} ${Me(I.total_value)}`).join(" · ") : "—";
    }
    const f = D(
      () => g(p.value)
    ), v = D(
      () => g(b.value)
    ), k = D(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: I = 0,
        total_sell_booking_created: P = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: H = 0,
        total_sell_success_bank_transfer: Q = 0,
        total_sell_success_cash: J = 0
      } = h.value, { failed_by_reason_by_day: lt = [] } = m.value;
      if (B === 0) return { nodes: [], links: [] };
      const vt = Math.max(0, N - (Q ?? 0) - (J ?? 0)), pt = [
        { name: "Sell Initiated", value: B },
        { name: "Sell Started", value: I },
        { name: "Booking Created", value: P },
        { name: "Sell Success", value: vt }
      ], ct = [], Mt = B - I;
      if (Mt > 0) {
        const z = Math.round(Mt / B * 100);
        pt.push({ name: "Abandoned (Init)", value: Mt }), ct.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: Mt,
          label: `${Mt.toLocaleString()} (${z}%)`
        });
      }
      if (I > 0) {
        const z = Math.round(I / B * 100);
        ct.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: I,
          label: `${I.toLocaleString()} (${z}%)`
        });
      }
      const st = lt.reduce((z, X) => (X.reasons && Array.isArray(X.reasons) && X.reasons.forEach((G) => {
        const it = G.reason, mt = G.failed_count;
        z[it] = (z[it] || 0) + mt;
      }), z), {});
      if (P > 0) {
        const z = Math.round(P / B * 100);
        ct.push({
          source: "Sell Started",
          target: "Booking Created",
          value: P,
          label: `${P.toLocaleString()} (${z}%)`
        });
      }
      if (Y > 0) {
        const z = Math.round(Y / B * 100);
        pt.push({ name: "Bank Transfer", value: Y }), ct.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: Y,
          label: `${Y.toLocaleString()} (${z}%)`
        });
      }
      if (H > 0) {
        const z = Math.round(H / B * 100);
        pt.push({ name: "Cash Option", value: H }), ct.push({
          source: "Booking Created",
          target: "Cash Option",
          value: H,
          label: `${H.toLocaleString()} (${z}%)`
        });
      }
      if (vt > 0) {
        const z = Math.round(vt / B * 100);
        ct.push({
          source: "Booking Created",
          target: "Sell Success",
          value: vt,
          label: `${vt.toLocaleString()} (${z}%)`
        });
      }
      if ((Q ?? 0) > 0) {
        const z = Math.round((Q ?? 0) / B * 100);
        pt.push({ name: "Bank Transfer Success", value: Q ?? 0 }), ct.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: Q ?? 0,
          label: `${(Q ?? 0).toLocaleString()} (${z}%)`
        });
      }
      if ((J ?? 0) > 0) {
        const z = Math.round((J ?? 0) / B * 100);
        pt.push({ name: "Cash Option Success", value: J ?? 0 }), ct.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: J ?? 0,
          label: `${(J ?? 0).toLocaleString()} (${z}%)`
        });
      }
      const Et = P - vt - Y - H;
      if (Et > 0) {
        const z = Math.round(Et / B * 100);
        pt.push({ name: "Failed at Completion", value: Et }), ct.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Et,
          label: `${Et.toLocaleString()} (${z}%)`
        });
      }
      const At = I - P;
      if (At > 0) {
        const z = Math.round(At / B * 100);
        pt.push({ name: "Failed at Booking", value: At }), ct.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: At,
          label: `${At.toLocaleString()} (${z}%)`
        });
      }
      if (Object.keys(st).length > 0) {
        const z = Object.values(st).reduce((G, it) => G + it, 0), X = At - z;
        if (Object.entries(st).filter(([, G]) => G > 0).sort(([, G], [, it]) => it - G).forEach(([G, it]) => {
          const mt = Math.round(it / B * 100);
          pt.push({ name: `Failed: ${G}`, value: it }), ct.push({
            source: "Failed at Booking",
            target: `Failed: ${G}`,
            value: it,
            label: `${it.toLocaleString()} (${mt}%)`
          });
        }), X > 0) {
          const G = Math.round(X / B * 100);
          pt.push({ name: "Failed: Without Reason", value: X }), ct.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: X,
            label: `${X.toLocaleString()} (${G}%)`
          });
        }
      }
      return { nodes: pt, links: ct };
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
    }, S = D(() => M), C = (B, I) => !I || I === 0 ? "0%" : `${Math.round(B / I * 100)}%`, $ = (B, I) => {
      const P = q(B), N = C(B, I);
      return `${P} (${N})`;
    }, L = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((I, P) => I + (P.total_value || 0), 0) : 0, T = (B) => Me(L(B));
    return t({ isDark: l }), (B, I) => (_(), tt(ht, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, Tt({
      default: E(() => [
        s.loading ? (_(), w("div", lb, [...I[0] || (I[0] = [
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
        ])])) : (_(), w("div", rb, [
          k.value.nodes.length > 0 ? (_(), w("section", cb, [
            r("div", db, [
              R(Ie, {
                data: k.value,
                "node-colors": S.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (_(), w("section", ub, [...I[1] || (I[1] = [
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
          r("section", hb, [
            R(ot, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: y.value
            }, null, 8, ["value"]),
            R(ot, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: f.value
            }, null, 8, ["value"]),
            R(ot, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: v.value
            }, null, 8, ["value"])
          ]),
          d.value && d.value.length > 0 ? (_(), w("section", fb, [
            r("div", gb, [
              R(Jt, {
                columns: c,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: P }) => [
                  r("span", pb, A(F(Rt)(String(P.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": E(({ row: P }) => [
                  r("span", mb, A(F(q)(Number(P.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": E(({ row: P }) => [
                  r("span", bb, A($(P.sell_started_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-getQuote": E(({ row: P }) => [
                  r("span", vb, A($(P.sell_get_quote_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": E(({ row: P }) => [
                  r("span", yb, A($(P.sell_booking_created_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": E(({ row: P }) => [
                  r("span", _b, A(F(q)(Number(P.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": E(({ row: P }) => [
                  r("span", xb, [
                    Array.isArray(P.daily_value_sell_success_bank_transfer) && P.daily_value_sell_success_bank_transfer.length > 0 ? (_(), w("div", kb, [
                      (_(!0), w(K, null, nt(P.daily_value_sell_success_bank_transfer, (N) => (_(), w("span", {
                        key: `${P.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(Me)(N.total_value)), 1))), 128))
                    ])) : (_(), w("span", wb, "-"))
                  ])
                ]),
                "cell-btSuccess": E(({ row: P }) => [
                  r("span", Cb, A(F(q)(Number(P.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": E(({ row: P }) => [
                  r("span", $b, A(F(q)(Number(P.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": E(({ row: P }) => [
                  r("span", Mb, [
                    Array.isArray(P.daily_value_sell_success_cash) && P.daily_value_sell_success_cash.length > 0 ? (_(), w("div", Sb, [
                      (_(!0), w(K, null, nt(P.daily_value_sell_success_cash, (N) => (_(), w("span", {
                        key: `${P.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(Me)(N.total_value)), 1))), 128))
                    ])) : (_(), w("span", Db, "-"))
                  ])
                ]),
                "cell-cashSuccess": E(({ row: P }) => [
                  r("span", Ab, A(F(q)(Number(P.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": E(({ row: P }) => [
                  r("span", Tb, A($(P.sell_success_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": E(({ row: P }) => [
                  r("span", Bb, [
                    Array.isArray(P.daily_value_sell_success) && P.daily_value_sell_success.length > 0 ? (_(), w("div", Lb, [
                      (_(!0), w(K, null, nt(P.daily_value_sell_success, (N) => (_(), w("span", {
                        key: `${P.date}-${N.currency}`
                      }, A(N.currency) + " " + A(F(Me)(N.total_value)), 1))), 128))
                    ])) : (_(), w("span", Fb, A(T(P.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": E(({ row: P }) => [
                  (P.reasons || []).length > 0 ? (_(), w("div", Ib, [
                    (_(!0), w(K, null, nt(P.reasons || [], (N) => (_(), w("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", Pb, A(N.reason) + ":", 1),
                      r("span", Eb, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (_(), w("div", Rb, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : V("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), Xi = /* @__PURE__ */ at(Ob, [["__scopeId", "data-v-aba5c6c5"]]), Vb = { class: "seller-container__body" }, zb = /* @__PURE__ */ Z({
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
    return (c, u) => (_(), tt(ht, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: E(() => [
        r("div", Vb, [
          R(Xi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: u[0] || (u[0] = (h) => d("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          R(Ui, {
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
}), Nb = /* @__PURE__ */ at(zb, [["__scopeId", "data-v-878fdbc6"]]), jb = {
  key: 0,
  class: "card-body"
}, Hb = {
  key: 0,
  class: "chart-section"
}, Wb = {
  key: 1,
  class: "empty-state"
}, Yb = { class: "empty-state-content" }, Kb = { class: "empty-icon-wrapper" }, qb = {
  key: 1,
  class: "loading-state"
}, Ub = /* @__PURE__ */ Z({
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
    }, { isDark: l, colors: d } = dt(rt(s, "theme")), c = D(() => {
      const m = (s.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const x = m.reduce(
        (y, g) => y + (Number(g.conversations) || 0),
        0
      ), p = m.map((y) => {
        const g = y.agent_type?.toLowerCase();
        return a[g] || "#94a3b8";
      }), b = p.map((y) => `${y}80`);
      return {
        labels: m.map((y) => {
          const g = Number(y.conversations) || 0, f = x ? g / x * 100 : 0;
          return `${y.agent_type} - ${g.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((y) => y.conversations),
            backgroundColor: b,
            borderColor: p,
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
              const m = (h.label || "").toString().split(" - ")[0], x = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce(
                (y, g) => y + (Number(g) || 0),
                0
              ), b = p ? x / p * 100 : 0;
              return `${m}: ${x.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, m) => (_(), tt(ht, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, Tt({
      default: E(() => [
        e.loading ? (_(), w("div", qb, [...m[2] || (m[2] = [
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
        ])])) : (_(), w("div", jb, [
          c.value.labels && c.value.labels.length ? (_(), w("section", Hb, [
            R(ra, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (_(), w("section", Wb, [
            r("div", Yb, [
              r("div", Kb, [
                R(F(lp), { class: "empty-icon" })
              ]),
              m[0] || (m[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
              m[1] || (m[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), Xb = /* @__PURE__ */ at(Ub, [["__scopeId", "data-v-b027642a"]]), Gb = {
  key: 0,
  class: "loading-state"
}, Zb = {
  key: 1,
  class: "card-body"
}, Qb = {
  key: 0,
  class: "payment-methods-section"
}, Jb = { class: "payment-methods-grid" }, tv = {
  key: 1,
  class: "empty-state"
}, ev = { class: "empty-state-content" }, nv = { class: "empty-icon-wrapper" }, av = {
  key: 2,
  class: "payment-method-daily-section"
}, sv = { class: "w-full min-w-0" }, ov = { class: "font-medium" }, iv = { class: "text-center" }, lv = { class: "text-center success-value" }, rv = {
  key: 0,
  class: "currency-cell-list"
}, cv = { class: "payment-tags" }, dv = { class: "tag-name" }, uv = {
  key: 0,
  class: "tag-amount"
}, hv = {
  key: 1,
  class: "tag-amount"
}, fv = { class: "tag-count" }, gv = {
  key: 3,
  class: "empty-table-state"
}, pv = "Not Registered", mv = /* @__PURE__ */ Z({
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
    const a = e, s = n, { isDark: o } = dt(rt(a, "theme")), i = et(!1), l = et({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), d = D(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = D(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = D(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((C, $) => Rt(C.date).valueOf() - Rt($.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = D(
      () => u.value.map((C) => ({
        id: C.date,
        date: C.date,
        total_count: C.total_count,
        total_amount: C.total_amount,
        total_amount_by_currency: C.total_amount_by_currency,
        payment_methods: C.payment_methods
      }))
    ), x = (C) => {
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
    }, p = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [C, $] = a.dates.map((T) => Rt(T).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, C, $);
          l.value = x(L);
        } catch (C) {
          console.error("Error fetching payment method metrics:", C), l.value = x(null);
        } finally {
          i.value = !1;
        }
      }
    }, b = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], y = (C) => !C || C.toLowerCase() === "unknown" ? pv : C.replace(/_/g, " "), g = (C) => C == null ? "$0.00" : xt(C), f = (C) => {
      const $ = C.total_amount_by_currency;
      return $ && $.length > 0 ? $.map((L) => `${L.currency} ${g(L.total_value)}`).join(" · ") : g(C.total_amount);
    }, v = (C) => C ? Rt(C).format("MMM DD") : "-", k = (C) => C == null || Number.isNaN(Number(C)) ? 0 : Number(C), M = (C) => {
      s("export", C);
    };
    function S() {
      const C = a.data;
      C && (Array.isArray(C.payment_method_breakdown) && C.payment_method_breakdown.length > 0 || Array.isArray(C.payment_method_by_day) && C.payment_method_by_day.length > 0) && (i.value = !1, l.value = x(C));
    }
    return Qt(() => {
      a.data ? S() : p();
    }), Ft(
      () => a.data,
      (C) => {
        C && S();
      },
      { deep: !0 }
    ), Ft(
      () => a.dates,
      (C) => {
        a.data || C && C[0] && C[1] && p();
      },
      { deep: !0 }
    ), t({ isDark: o }), (C, $) => (_(), tt(ht, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, Tt({
      default: E(() => [
        i.value ? (_(), w("div", Gb, [...$[0] || ($[0] = [
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
        ])])) : (_(), w("div", Zb, [
          d.value ? (_(), w("section", Qb, [
            $[1] || ($[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", Jb, [
              (_(!0), w(K, null, nt(l.value.payment_method_breakdown, (L, T) => (_(), tt(ot, {
                key: L.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[T % b.length],
                title: y(L.payment_method),
                value: f(L),
                subvalue: `${k(L.count)} ${k(L.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (_(), w("section", tv, [
            r("div", ev, [
              r("div", nv, [
                R(F(up), { class: "empty-icon" })
              ]),
              $[2] || ($[2] = r("p", { class: "empty-title" }, "No payment data available", -1)),
              $[3] || ($[3] = r("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          c.value ? (_(), w("section", av, [
            $[5] || ($[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", sv, [
              R(Jt, {
                columns: h,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: L }) => [
                  r("span", ov, A(v(String(L.date))), 1)
                ]),
                "cell-totalSales": E(({ row: L }) => [
                  r("span", iv, A(F(q)(L.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": E(({ row: L }) => [
                  r("span", lv, [
                    Array.isArray(L.total_amount_by_currency) && L.total_amount_by_currency.length > 0 ? (_(), w("div", rv, [
                      (_(!0), w(K, null, nt(L.total_amount_by_currency, (T) => (_(), w("span", {
                        key: `${L.date}-${T.currency}`
                      }, A(T.currency) + " " + A(g(T.total_value)), 1))), 128))
                    ])) : (_(), w(K, { key: 1 }, [
                      yt(A(g(Number(L.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": E(({ row: L }) => [
                  r("div", cv, [
                    (_(!0), w(K, null, nt(Array.isArray(L.payment_methods) ? L.payment_methods : [], (T) => (_(), w("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", dv, A(y(T.payment_method)), 1),
                      $[4] || ($[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (_(), w("span", uv, A(g(T.total_amount)), 1)) : (_(), w("span", hv, A(T.total_amount_by_currency.map((B) => `${B.currency} ${g(B.total_value)}`).join(" / ")), 1)),
                      r("span", fv, "(" + A(k(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : d.value ? (_(), w("div", gv, [...$[6] || ($[6] = [
            r("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : V("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !i.value ? {
        name: "headerExport",
        fn: E(() => [
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
}), bv = /* @__PURE__ */ at(mv, [["__scopeId", "data-v-21b6865b"]]), vv = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, yv = { class: "overflow-x-auto" }, _v = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, xv = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, kv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, wv = ["checked", "aria-label"], Cv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, $v = ["checked", "aria-label", "onChange"], Mv = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = et(null);
    function o(f) {
      return `cell-${f}`;
    }
    function i(f) {
      return f === "center" ? "text-center" : f === "right" ? "text-right" : "text-left";
    }
    function l(f, v) {
      if (typeof n.rowKey == "function")
        return n.rowKey(f);
      const k = f[n.rowKey];
      return k != null ? String(k) : `__index_${v}`;
    }
    function d(f, v) {
      return f[v];
    }
    function c(f) {
      return f == null || typeof f == "object" ? "" : String(f);
    }
    function u(f, v) {
      return l(f, v);
    }
    const h = D(() => n.rows.map((f, v) => l(f, v)));
    function m(f, v) {
      const k = l(f, v);
      return n.selectedKeys.includes(k);
    }
    const x = D(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((f) => n.selectedKeys.includes(f))), p = D(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const f = h.value.filter((v) => n.selectedKeys.includes(v));
      return f.length > 0 && f.length < n.rows.length;
    });
    Ft(
      [p, x, () => n.selectable],
      async () => {
        await Ot();
        const f = s.value;
        f && (f.indeterminate = p.value && !x.value);
      },
      { immediate: !0 }
    );
    function b() {
      if (n.selectable)
        if (x.value) {
          const f = n.selectedKeys.filter((v) => !h.value.includes(v));
          a("update:selectedKeys", f);
        } else {
          const f = new Set(n.selectedKeys);
          h.value.forEach((v) => f.add(v)), a("update:selectedKeys", [...f]);
        }
    }
    function y(f, v) {
      if (!n.selectable) return;
      const k = l(f, v);
      n.selectedKeys.includes(k) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((S) => S !== k)
      ) : a("update:selectedKeys", [...n.selectedKeys, k]);
    }
    function g(f, v) {
      const k = l(f, v);
      return `${n.ariaLabelSelectRow} ${k}`;
    }
    return (f, v) => (_(), w("div", vv, [
      r("div", yv, [
        r("table", _v, [
          r("thead", null, [
            r("tr", xv, [
              e.selectable ? (_(), w("th", kv, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: x.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: b
                }, null, 40, wv)
              ])) : V("", !0),
              (_(!0), w(K, null, nt(e.columns, (k) => (_(), w("th", {
                key: k.key,
                scope: "col",
                class: W([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(k.align),
                  k.headerClass ?? ""
                ])
              }, A(k.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (_(!0), w(K, null, nt(e.rows, (k, M) => (_(), w("tr", {
              key: u(k, M),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (_(), w("td", Cv, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: m(k, M),
                  "aria-label": g(k, M),
                  onChange: (S) => y(k, M)
                }, null, 40, $v)
              ])) : V("", !0),
              (_(!0), w(K, null, nt(e.columns, (S) => (_(), w("td", {
                key: S.key,
                class: W([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                $t(f.$slots, o(S.key), {
                  row: k,
                  column: S,
                  value: d(k, S.key)
                }, () => [
                  yt(A(c(d(k, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Gi = /* @__PURE__ */ at(Mv, [["__scopeId", "data-v-95fc0bc9"]]), Sv = {
  key: 0,
  class: "loading-state"
}, Dv = {
  key: 1,
  class: "card-body"
}, Av = { class: "summary-cards" }, Tv = {
  key: 0,
  class: "summary-card enqueued-card"
}, Bv = { class: "summary-card-content" }, Lv = { class: "card-content enqueued-content" }, Fv = { class: "card-value enqueued-value" }, Iv = { class: "summary-card assigned-card" }, Pv = { class: "summary-card-content" }, Ev = { class: "card-content" }, Rv = { class: "card-value assigned-value" }, Ov = { class: "card-content" }, Vv = { class: "card-value assigned-value" }, zv = { class: "summary-card closed-card" }, Nv = { class: "summary-card-content" }, jv = { class: "card-content" }, Hv = { class: "card-value closed-value" }, Wv = { class: "card-content" }, Yv = { class: "card-value closed-value" }, Kv = {
  key: 0,
  class: "agents-section"
}, qv = { class: "date-header" }, Uv = { class: "date-title" }, Xv = { class: "date-stats" }, Gv = {
  key: 0,
  class: "stat-item enqueued-stat"
}, Zv = { class: "stat-value" }, Qv = { class: "stat-item assigned-stat" }, Jv = { class: "stat-value" }, ty = { class: "stat-value" }, ey = { class: "stat-item closed-stat" }, ny = { class: "stat-value" }, ay = { class: "stat-value" }, sy = { class: "w-full min-w-0" }, oy = { class: "ah-cell name-cell" }, iy = { class: "ah-cell email-cell" }, ly = { class: "metric-cell-content" }, ry = { class: "badge assigned-badge" }, cy = { class: "metric-cell-avg" }, dy = { class: "metric-cell-content" }, uy = { class: "badge closed-badge" }, hy = { class: "metric-cell-avg" }, fy = ["onClick"], gy = {
  key: 1,
  class: "empty-state"
}, Ca = 3, py = /* @__PURE__ */ Z({
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
    }, { isDark: i } = dt(rt(a, "theme")), l = D(() => {
      const $ = a.data?.agents_by_day && a.data.agents_by_day.length > 0, L = (a.data?.total_enqueued ?? 0) > 0;
      return $ || L;
    }), d = D(() => {
      if (!l.value) return {};
      const $ = {};
      for (const B of a.data.agents_by_day)
        $[B.date] || ($[B.date] = []), $[B.date].push(B);
      const L = Object.keys($).sort((B, I) => new Date(B).getTime() - new Date(I).getTime()), T = {};
      for (const B of L)
        T[B] = $[B];
      return T;
    }), c = et({});
    function u($) {
      c.value = {
        ...c.value,
        [$]: !c.value[$]
      };
    }
    function h($, L) {
      return c.value[$] ? L : L.slice(0, Ca);
    }
    function m($) {
      return Math.max(0, $.length - Ca);
    }
    function x($) {
      return $.length > Ca;
    }
    const p = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function b($, L) {
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
    const y = ($) => $ == null ? "0" : q($), g = ($) => {
      if ($ == null)
        return "AVG";
      if ($ < 60)
        return `${Math.round($)}s`;
      const L = Math.round($), T = Math.floor(L / 60), B = L % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const I = Math.floor(T / 60), P = T % 60;
      return `${I}h ${P}m`;
    }, f = ($) => {
      const L = new Date($), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return L.toLocaleDateString("en-US", T);
    }, v = ($) => $[0]?.day_total_enqueued ?? 0, k = ($) => $[0]?.day_total_assigned ?? 0, M = ($) => $[0]?.day_total_closed ?? 0, S = ($) => $[0]?.day_avg_time_to_assign_seconds ?? null, C = ($) => $[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), ($, L) => (_(), tt(ht, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, Tt({
      default: E(() => [
        e.loading ? (_(), w("div", Sv, [...L[0] || (L[0] = [
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
        ])])) : (_(), w("div", Dv, [
          r("div", Av, [
            e.data.total_enqueued ? (_(), w("div", Tv, [
              L[2] || (L[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Bv, [
                r("div", Lv, [
                  L[1] || (L[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", Fv, A(y(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : V("", !0),
            r("div", Iv, [
              L[5] || (L[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Pv, [
                r("div", Ev, [
                  L[3] || (L[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", Rv, A(y(e.data.total_assigned)), 1)
                ]),
                r("div", Ov, [
                  L[4] || (L[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", Vv, A(g(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", zv, [
              L[8] || (L[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Nv, [
                r("div", jv, [
                  L[6] || (L[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", Hv, A(y(e.data.total_closed)), 1)
                ]),
                r("div", Wv, [
                  L[7] || (L[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", Yv, A(g(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (_(), w("div", Kv, [
            (_(!0), w(K, null, nt(d.value, (T, B) => (_(), w("div", {
              key: B,
              class: "date-group"
            }, [
              r("div", qv, [
                r("h4", Uv, A(f(B)), 1),
                r("div", Xv, [
                  v(T) ? (_(), w("span", Gv, [
                    r("span", Zv, A(y(v(T))), 1),
                    L[9] || (L[9] = yt(" Enqueued ", -1))
                  ])) : V("", !0),
                  r("span", Qv, [
                    r("span", Jv, A(y(k(T))), 1),
                    L[10] || (L[10] = yt(" Assigned ", -1)),
                    r("span", ty, A(g(S(T))), 1)
                  ]),
                  r("span", ey, [
                    r("span", ny, A(y(M(T))), 1),
                    L[11] || (L[11] = yt(" Closed ", -1)),
                    r("span", ay, A(g(C(T))), 1)
                  ])
                ])
              ]),
              r("div", sy, [
                R(Gi, {
                  columns: p,
                  rows: b(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": E(({ row: I }) => [
                    r("span", oy, A(I.agent_name || "-"), 1)
                  ]),
                  "cell-email": E(({ row: I }) => [
                    r("span", iy, A(I.agent_email), 1)
                  ]),
                  "cell-assigned": E(({ row: I }) => [
                    r("div", ly, [
                      r("span", ry, A(y(Number(I.assigned_count))), 1),
                      r("span", cy, A(g(Number(I.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": E(({ row: I }) => [
                    r("div", dy, [
                      r("span", uy, A(y(Number(I.closed_count))), 1),
                      r("span", hy, A(g(Number(I.avg_conversation_duration_seconds))), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              x(T) ? (_(), w("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (I) => u(String(B))
              }, [
                yt(A(c.value[B] ? "View less" : `View more (${m(T)} rows)`) + " ", 1),
                (_(), w("svg", {
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
              ], 8, fy)) : V("", !0)
            ]))), 128))
          ])) : (_(), w("div", gy, [...L[13] || (L[13] = [
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
        fn: E(() => [
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
}), my = /* @__PURE__ */ at(py, [["__scopeId", "data-v-d6171363"]]), by = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, vy = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, yy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, _y = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, xy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ky = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, wy = { class: "max-w-[360px] px-4 text-center" }, Cy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, $y = /* @__PURE__ */ Z({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (g) => {
      i("export", g);
    }, d = rt(o, "theme"), { isDark: c } = dt(d), u = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = et({ labels: [], datasets: [] }), m = D(
      () => o.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), x = D(() => {
      const g = m.value.total_by_channel || {}, f = Object.values(g).reduce((v, k) => v + k, 0);
      return f === 0 ? [] : Object.entries(g).sort(([, v], [, k]) => k - v).map(([v, k]) => ({
        name: v,
        label: v.toUpperCase(),
        total: k,
        percentage: (k / f * 100).toFixed(1),
        color: u[v.toLowerCase()] || "#9ca3af"
      }));
    }), p = D(() => x.value.slice(0, 4)), b = D(() => {
      const g = p.value.length;
      return g <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : g === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : g === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    }), y = (g) => {
      if (!g || !g.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const f = g.channels_by_day, v = Object.keys(f).sort();
      if (v.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const k = /* @__PURE__ */ new Set();
      for (const C of Object.values(f))
        for (const $ of Object.keys(C))
          k.add($);
      const S = Array.from(k).map((C) => {
        const $ = C.toLowerCase(), L = u[$] || "#9ca3af";
        return {
          label: C.toUpperCase(),
          data: v.map((T) => f[T]?.[C] || 0),
          borderColor: L
        };
      });
      h.value = {
        labels: v.map((C) => Rt(C).format("MMM DD")),
        datasets: S
      };
    };
    return Ft(
      () => o.data,
      (g) => {
        y(g ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: c }), (g, f) => (_(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Channel",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, Tt({
      default: E(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (_(), w("div", by, [
            r("div", vy, [
              (_(), w(K, null, nt(a, (v, k) => r("div", {
                key: k,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[k]]),
                style: gt({ height: `${v}%` })
              }, null, 6)), 64))
            ]),
            f[0] || (f[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (_(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (_(), w("section", yy, [
              r("div", _y, [
                R(ke, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              p.value.length ? (_(), w("div", {
                key: 0,
                class: W(b.value)
              }, [
                (_(!0), w(K, null, nt(p.value, (v) => (_(), tt(ot, {
                  key: v.name,
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${F(q)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : V("", !0)
            ])) : x.value.length ? (_(), w("section", xy, [
              r("div", {
                class: W(b.value)
              }, [
                (_(!0), w(K, null, nt(p.value, (v) => (_(), tt(ot, {
                  key: v.name,
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${F(q)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : V("", !0),
            x.value.length ? V("", !0) : (_(), w("section", ky, [
              r("div", wy, [
                r("div", Cy, [
                  R(F(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                f[1] || (f[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                f[2] || (f[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 2
    }, [
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), My = /* @__PURE__ */ at($y, [["__scopeId", "data-v-567110f7"]]), Sy = {
  key: 0,
  class: "card-body"
}, Dy = { class: "chart-container" }, Ay = { class: "triage-table-block w-full min-w-0" }, Ty = { class: "triage-row-label" }, By = {
  key: 1,
  class: "triage-count"
}, Ly = {
  key: 1,
  class: "triage-count"
}, Fy = {
  key: 1,
  class: "triage-count"
}, Iy = {
  key: 1,
  class: "triage-count"
}, Py = {
  key: 1,
  class: "triage-count"
}, Ey = {
  key: 1,
  class: "empty-state"
}, Ry = { class: "empty-state-content" }, Oy = { class: "empty-icon-wrapper" }, Vy = {
  key: 1,
  class: "loading-state"
}, zy = /* @__PURE__ */ Z({
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
    const a = e, s = n, o = (v) => {
      s("export", v);
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), d = D(() => {
      const v = a.data?.combinations || {}, k = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [M, S] of Object.entries(v)) {
        const C = M.split("+").filter(Boolean);
        if (!C.includes("triage")) continue;
        const $ = C.filter((L) => L !== "triage").length;
        $ >= 4 ? k["4p"] += Number(S) || 0 : k[$] += Number(S) || 0;
      }
      return k;
    }), c = D(() => {
      const v = d.value;
      return v[0] + v[1] + v[2] + v[3] + v["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const v = c.value;
      if (!v) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const k = d.value;
      return {
        pct0: k[0] / v * 100,
        pct1: k[1] / v * 100,
        pct2: k[2] / v * 100,
        pct3: k[3] / v * 100,
        pct4p: k["4p"] / v * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], x = D(() => {
      const v = h.value, k = d.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: v.pct0,
          b1: v.pct1,
          b2: v.pct2,
          b3: v.pct3,
          b4p: v.pct4p
        },
        {
          id: "count",
          metric: "Count",
          b0: k[0],
          b1: k[1],
          b2: k[2],
          b3: k[3],
          b4p: k["4p"]
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
    }, b = (v) => v?.replace("80", "") || "#888888", y = D(() => ({
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
            label: (v) => `${v.dataset.label} intent(s): ${Number(v.raw || 0).toFixed(0)}%`
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
    })), f = (v) => `${(Number(v) || 0).toFixed(0)}`;
    return t({ isDark: i }), (v, k) => (_(), tt(ht, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, Tt({
      default: E(() => [
        e.loading ? (_(), w("div", Vy, [...k[2] || (k[2] = [
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
        ])])) : (_(), w("div", Sy, [
          u.value ? (_(), w(K, { key: 0 }, [
            r("div", Dy, [
              R(_e, {
                data: y.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            R(ot, {
              class: "w-full min-w-0",
              title: "Total",
              value: F(q)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", Ay, [
              R(Jt, {
                columns: m,
                rows: x.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": E(({ row: M }) => [
                  r("span", Ty, A(M.metric), 1)
                ]),
                "cell-b0": E(({ row: M }) => [
                  M.id === "pct" ? (_(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c0) })
                  }, A(f(Number(M.b0))) + "%", 5)) : (_(), w("span", By, A(F(q)(Number(M.b0))), 1))
                ]),
                "cell-b1": E(({ row: M }) => [
                  M.id === "pct" ? (_(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c1) })
                  }, A(f(Number(M.b1))) + "%", 5)) : (_(), w("span", Ly, A(F(q)(Number(M.b1))), 1))
                ]),
                "cell-b2": E(({ row: M }) => [
                  M.id === "pct" ? (_(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c2) })
                  }, A(f(Number(M.b2))) + "%", 5)) : (_(), w("span", Fy, A(F(q)(Number(M.b2))), 1))
                ]),
                "cell-b3": E(({ row: M }) => [
                  M.id === "pct" ? (_(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c3) })
                  }, A(f(Number(M.b3))) + "%", 5)) : (_(), w("span", Iy, A(F(q)(Number(M.b3))), 1))
                ]),
                "cell-b4p": E(({ row: M }) => [
                  M.id === "pct" ? (_(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c4p) })
                  }, A(f(Number(M.b4p))) + "%", 5)) : (_(), w("span", Py, A(F(q)(Number(M.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (_(), w("div", Ey, [
            r("div", Ry, [
              r("div", Oy, [
                R(F(qt), { class: "empty-icon" })
              ]),
              k[0] || (k[0] = r("p", { class: "empty-title" }, "No triage combinations data", -1)),
              k[1] || (k[1] = r("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), Ny = /* @__PURE__ */ at(zy, [["__scopeId", "data-v-c0931082"]]), jy = {
  key: 0,
  class: "loading-state"
}, Hy = {
  key: 1,
  class: "card-body"
}, Wy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-4 min-h-0"
}, Yy = { class: "pie-section" }, Ky = {
  key: 1,
  class: "empty-state"
}, qy = /* @__PURE__ */ Z({
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
    }, l = (x) => i[x]?.label || x.toUpperCase(), d = D(
      () => n.data?.items && n.data.items.length > 0
    ), c = D(
      () => (n.data?.items || []).reduce((x, p) => x + p.count, 0)
    ), u = D(() => {
      const x = {};
      for (const p of n.data?.items || [])
        x[p.language] = (x[p.language] || 0) + p.count;
      return Object.entries(x).map(([p, b]) => ({ language: p, count: b })).sort((p, b) => b.count - p.count);
    }), h = D(() => ({
      labels: u.value.map((x) => l(x.language)),
      datasets: [{
        data: u.value.map((x) => x.count),
        backgroundColor: u.value.map((x, p) => o[p % o.length] + "80"),
        borderColor: u.value.map((x, p) => o[p % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), m = D(() => ({
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
            label: (x) => {
              const p = x.raw || 0, b = c.value > 0 ? (p / c.value * 100).toFixed(1) : "0";
              return ` ${x.label}: ${p} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (x, p) => (_(), tt(ht, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: E(() => [
        n.loading ? (_(), w("div", jy, [...p[0] || (p[0] = [
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
        ])])) : (_(), w("div", Hy, [
          d.value ? (_(), w("div", Wy, [
            r("section", Yy, [
              R(ra, {
                data: h.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            R(ot, {
              class: "shrink-0",
              title: "Total",
              value: F(q)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (_(), w("section", Ky, [...p[1] || (p[1] = [
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
}), Uy = /* @__PURE__ */ at(qy, [["__scopeId", "data-v-020e89a6"]]), Xy = {
  key: 0,
  class: "loading-state"
}, Gy = {
  key: 1,
  class: "card-body"
}, Zy = {
  key: 0,
  class: "guardrails-daily-section"
}, Qy = { class: "w-full min-w-0" }, Jy = { class: "font-medium" }, t1 = { class: "font-semibold" }, e1 = { class: "type-badges-row" }, n1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, a1 = {
  key: 1,
  class: "empty-state"
}, s1 = /* @__PURE__ */ Z({
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
    ), d = D(
      () => (a.data?.items || []).reduce((y, g) => y + g.count, 0)
    ), c = (y) => {
      const g = {};
      for (const k of a.data?.items || [])
        g[k[y]] = (g[k[y]] || 0) + k.count;
      const f = Object.entries(g).sort((k, M) => M[1] - k[1]);
      if (f.length === 0) return { name: "—", pct: 0 };
      const v = d.value;
      return {
        name: f[0][0],
        pct: v > 0 ? Math.round(f[0][1] / v * 100) : 0
      };
    }, u = D(() => c("guardrail_type")), h = D(() => c("guardrail_action")), m = D(() => c("guardrail_source")), x = D(() => {
      const y = {};
      for (const g of a.data?.items || [])
        y[g.date] || (y[g.date] = {}), y[g.date][g.guardrail_type] = (y[g.date][g.guardrail_type] || 0) + g.count;
      return Object.entries(y).map(([g, f]) => ({
        date: g,
        total: Object.values(f).reduce((v, k) => v + k, 0),
        types: Object.entries(f).map(([v, k]) => ({ type: v, count: k })).sort((v, k) => k.count - v.count)
      })).sort((g, f) => new Date(g.date).getTime() - new Date(f.date).getTime());
    }), p = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], b = D(
      () => x.value.map((y) => ({
        id: y.date,
        date: y.date,
        total: y.total,
        types: y.types
      }))
    );
    return t({ isDark: i }), (y, g) => (_(), tt(ht, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1
    }, Tt({
      default: E(() => [
        a.loading ? (_(), w("div", Xy, [...g[0] || (g[0] = [
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
        ])])) : (_(), w("div", Gy, [
          l.value ? (_(), w(K, { key: 0 }, [
            x.value.length > 0 ? (_(), w("section", Zy, [
              r("div", Qy, [
                R(Jt, {
                  columns: p,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": E(({ row: f }) => [
                    r("span", Jy, A(F(Rt)(String(f.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": E(({ row: f }) => [
                    r("span", t1, A(F(q)(f.total)), 1)
                  ]),
                  "cell-types": E(({ row: f }) => [
                    r("div", e1, [
                      (_(!0), w(K, null, nt(f.types, (v) => (_(), w("span", {
                        key: v.type,
                        class: "type-count-badge"
                      }, A(v.type) + " (" + A(v.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            r("section", n1, [
              R(ot, {
                title: "Total Events",
                value: F(q)(d.value)
              }, null, 8, ["value"]),
              R(ot, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              R(ot, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              R(ot, {
                title: "Top source",
                value: m.value.name,
                subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (_(), w("section", a1, [...g[1] || (g[1] = [
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
        fn: E(() => [
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
}), o1 = /* @__PURE__ */ at(s1, [["__scopeId", "data-v-0416b73e"]]), i1 = {
  key: 0,
  class: "loading-state"
}, l1 = {
  key: 1,
  class: "card-body"
}, r1 = { class: "chart-section" }, c1 = { class: "chart-wrapper" }, d1 = {
  key: 1,
  class: "empty-chart"
}, u1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, h1 = {
  key: 0,
  class: "dn-failure-section"
}, f1 = { class: "w-full min-w-0" }, g1 = { class: "failure-reason" }, p1 = { class: "failure-count" }, m1 = { class: "impact-bar-container" }, b1 = { class: "impact-label" }, v1 = { class: "dn-trend-health-block flex flex-col gap-0" }, y1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, _1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, x1 = { class: "system-health" }, k1 = { class: "system-health-content" }, w1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, C1 = {
  key: 1,
  class: "empty-state"
}, $1 = /* @__PURE__ */ Z({
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
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), d = D(() => {
      const S = a.data?.documentCounts?.items || [], C = a.data?.processingCounts?.items || [];
      return S.length > 0 || C.length > 0;
    }), c = D(() => {
      const S = a.data?.documentCounts?.items || [];
      return {
        processing_started: S.reduce((C, $) => C + $.processing_started, 0),
        processing_completed: S.reduce((C, $) => C + $.processing_completed, 0),
        processing_failed: S.reduce((C, $) => C + $.processing_failed, 0),
        row_count_total: S.reduce((C, $) => C + $.row_count_total, 0)
      };
    }), u = D(() => {
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
    }), h = D(() => c.value.row_count_total || u.value.processing_started), m = D(() => Math.max(0, h.value - u.value.notification_sent)), x = (S, C) => C ? `${Math.round(S / C * 100)}%` : "0%", p = D(() => {
      const S = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((C) => C.count > 0).sort((C, $) => $.count - C.count);
      return S.length > 0 ? S[0] : { reason: "None", count: 0 };
    }), b = D(() => {
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
    }), y = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], g = D(
      () => b.value.map((S) => ({
        id: S.reason,
        reason: S.reason,
        count: S.count,
        impactPct: S.impactPct
      }))
    ), f = D(() => {
      const S = h.value, C = u.value.processing_success, $ = Math.max(0, C - u.value.totalDqErrors), L = u.value.notification_sent, T = Math.max(0, S - C), B = u.value.totalDqErrors, I = Math.max(0, $ - L), P = (H, Q) => {
        const J = Q > 0 ? Math.round(H / Q * 100) : 0;
        return `${H.toLocaleString()} (${J}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return C > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: C, label: P(C, S) }), T > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: P(T, S) }), $ > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: $, label: P($, S) }), B > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: P(B, S) }), L > 0 && Y.push({ source: "Contactable", target: "Notified", value: L, label: P(L, S) }), I > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: I, label: P(I, S) }), { nodes: N, links: Y };
    }), v = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, k = D(() => {
      const S = [...a.data?.processingCounts?.items || []].sort(
        (P, N) => new Date(P.date).getTime() - new Date(N.date).getTime()
      ), C = a.data?.documentCounts?.items || [], $ = {};
      for (const P of C)
        $[P.date] = ($[P.date] || 0) + P.row_count_total;
      const L = [.../* @__PURE__ */ new Set([...S.map((P) => P.date), ...C.map((P) => P.date)])].sort(), T = L.map((P) => Rt(P).format("MMM DD")), B = L.map((P) => {
        const N = S.find((Q) => Q.date === P), Y = N?.notification_sent || 0, H = $[P] || N?.processing_started || 0;
        return H > 0 ? Math.round(Y / H * 100) : 0;
      }), I = L.map((P) => S.find((Y) => Y.date === P)?.notification_sent || 0);
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
            data: I,
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
    return t({ isDark: i }), (S, C) => (_(), tt(ht, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, Tt({
      default: E(() => [
        a.loading ? (_(), w("div", i1, [...C[0] || (C[0] = [
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
        ])])) : (_(), w("div", l1, [
          d.value ? (_(), w(K, { key: 0 }, [
            r("section", r1, [
              C[2] || (C[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", c1, [
                f.value.nodes.length > 0 && f.value.links.length > 0 ? (_(), tt(Ie, {
                  key: 0,
                  data: f.value,
                  "node-colors": v,
                  height: "350px"
                }, null, 8, ["data"])) : (_(), w("div", d1, [...C[1] || (C[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", u1, [
              R(ot, {
                color: "#3b82f6",
                title: "Total Records",
                value: F(q)(c.value.row_count_total)
              }, null, 8, ["value"]),
              R(ot, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: F(q)(h.value)
              }, null, 8, ["value"]),
              R(ot, {
                color: "#10b981",
                title: "Successfully Notified",
                value: F(q)(u.value.notification_sent),
                subvalue: x(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(ot, {
                color: "#ef4444",
                title: "Not Notified",
                value: F(q)(m.value),
                subvalue: x(m.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(ot, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: p.value.reason,
                subvalue: p.value.count > 0 ? `${F(q)(p.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (_(), w("section", h1, [
              C[3] || (C[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", f1, [
                R(Jt, {
                  columns: y,
                  rows: g.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": E(({ row: $ }) => [
                    r("span", g1, A($.reason), 1)
                  ]),
                  "cell-count": E(({ row: $ }) => [
                    r("span", p1, A(F(q)($.count)), 1)
                  ]),
                  "cell-impact": E(({ row: $ }) => [
                    r("div", m1, [
                      r("div", {
                        class: "impact-bar",
                        style: gt({ width: $.impactPct + "%" })
                      }, null, 4),
                      r("span", b1, A($.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            r("div", v1, [
              k.value.labels.length > 0 ? (_(), w("section", y1, [
                C[4] || (C[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", _1, [
                  R(ke, {
                    data: k.value,
                    options: M.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : V("", !0),
              r("details", x1, [
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
                  yt(" System Health Details ")
                ], -1)),
                r("div", k1, [
                  r("div", w1, [
                    R(ot, {
                      title: "Docs Started",
                      value: F(q)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    R(ot, {
                      title: "Docs Completed",
                      value: F(q)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    R(ot, {
                      title: "Docs Failed",
                      value: F(q)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    R(ot, {
                      title: "Processing Started",
                      value: F(q)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    R(ot, {
                      title: "Processing Success",
                      value: F(q)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    R(ot, {
                      title: "Notification Failed",
                      value: F(q)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (_(), w("section", C1, [...C[6] || (C[6] = [
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
        fn: E(() => [
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
}), M1 = /* @__PURE__ */ at($1, [["__scopeId", "data-v-d844ee2e"]]), S1 = { class: "highlight-inner" }, D1 = {
  key: 0,
  class: "loading-state"
}, A1 = {
  key: 1,
  class: "card-body"
}, T1 = { class: "metric-value" }, B1 = /* @__PURE__ */ Z({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), s = D(() => q(n.totalConversations)), o = D(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = n.previousTotalConversations;
      return c === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), tt(ht, {
      title: "",
      collapsible: !1,
      class: W(["total-conv-metric", "w-full", { "total-conv-metric--dark": F(a) }])
    }, {
      title: E(() => [...u[0] || (u[0] = [
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
      headerAside: E(() => [
        !e.loading && o.value ? (_(), w("div", {
          key: 0,
          class: W(["change-badge", d.value])
        }, A(l.value), 3)) : V("", !0)
      ]),
      default: E(() => [
        r("div", S1, [
          e.loading ? (_(), w("div", D1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), w("div", A1, [
            r("span", T1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), L1 = /* @__PURE__ */ at(B1, [["__scopeId", "data-v-9a055dd2"]]), F1 = { class: "highlight-inner" }, I1 = {
  key: 0,
  class: "loading-state"
}, P1 = {
  key: 1,
  class: "card-body"
}, E1 = { class: "metric-value" }, R1 = /* @__PURE__ */ Z({
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
      const c = n.previousCsatP95;
      return c === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), tt(ht, {
      collapsible: !1,
      class: W(["csat-p95-metric", "w-full", { "csat-p95-metric--dark": F(a) }])
    }, {
      title: E(() => [...u[0] || (u[0] = [
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
      headerAside: E(() => [
        !e.loading && o.value ? (_(), w("div", {
          key: 0,
          class: W(["change-badge", d.value])
        }, A(l.value), 3)) : V("", !0)
      ]),
      default: E(() => [
        r("div", F1, [
          e.loading ? (_(), w("div", I1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), w("div", P1, [
            r("span", E1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), O1 = /* @__PURE__ */ at(R1, [["__scopeId", "data-v-8932abaa"]]), V1 = {
  key: 0,
  class: "loading-state"
}, z1 = {
  key: 1,
  class: "card-body"
}, N1 = { class: "chart-wrapper" }, j1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, H1 = {
  key: 2,
  class: "empty-state"
}, W1 = 500, Y1 = 60, K1 = 80, q1 = {
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
    }, o = e, { isDark: i } = dt(rt(o, "theme")), l = D(() => o.data), d = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (c, u) => (_(), tt(ht, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, Tt({
      default: E(() => [
        o.loading ? (_(), w("div", V1, [...u[0] || (u[0] = [
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
        ])])) : l.value && l.value.total_nps_responses > 0 ? (_(), w("div", z1, [
          r("div", N1, [
            R(zi, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": d.value,
              "chart-height": W1,
              "chart-margin": Y1,
              "chart-bottom-margin": K1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", j1, [
            R(ot, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (_(), tt(ot, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : V("", !0)
          ])
        ])) : (_(), w("div", H1, [...u[1] || (u[1] = [
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
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}, Zi = /* @__PURE__ */ at(q1, [["__scopeId", "data-v-b7d018e6"]]), U1 = {
  key: 0,
  class: "loading-state"
}, X1 = {
  key: 1,
  class: "card-body"
}, G1 = { class: "tooltip-content" }, Z1 = { class: "tooltip-title" }, Q1 = { class: "tooltip-stats" }, J1 = { class: "tooltip-stat-row" }, t_ = { class: "tooltip-value" }, e_ = { class: "tooltip-stat-row" }, n_ = { class: "tooltip-value" }, a_ = { class: "tooltip-stat-row" }, s_ = { class: "tooltip-value" }, o_ = { class: "tooltip-stat-row" }, i_ = { class: "tooltip-value" }, l_ = { class: "tooltip-stat-row" }, r_ = { class: "tooltip-value" }, c_ = { class: "tooltip-stat-row" }, d_ = { class: "tooltip-value" }, u_ = { class: "mt-4 flex w-full justify-start" }, h_ = {
  key: 2,
  class: "empty-state"
}, Lo = 400, cn = 60, Fo = 90, Io = 120, f_ = {
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
    }, o = e, { isDark: i } = dt(rt(o, "theme")), l = D(() => o.data), d = et(null), c = et({
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
      return Math.max(800, cn * 2 + y * Io);
    }), h = (y, g) => {
      const v = (y - 1) / 9;
      return cn + g - v * g;
    }, m = (y) => y ? Rt(y).format("DD-MM-YYYY") : "", x = D(() => {
      if (!l.value || !l.value.nps_by_day || l.value.nps_by_day.length === 0)
        return [];
      const y = [], g = Lo - cn - Fo;
      return l.value.nps_by_day.forEach((f, v) => {
        const k = f.min_score || 0, M = f.q1_score || 0, S = f.median_score || 0, C = f.q3_score || 0, $ = f.max_score || 0, L = f.average_score || 0;
        y.push({
          label: m(f.date),
          responseCount: f.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: M,
          median: S,
          q3: C,
          high: $,
          average: L,
          highY: h($, g),
          lowY: h(k, g),
          q1Y: h(M, g),
          q3Y: h(C, g),
          medianY: h(S, g),
          averageY: L > 0 ? h(L, g) : null,
          centerX: cn + (v + 1) * Io
        });
      }), y;
    }), p = (y, g) => {
      if (!d.value || !g || g.horizontal) return;
      const f = d.value.getBoundingClientRect(), v = y.clientX, k = y.clientY, M = 140, S = 160, C = 10, $ = 15;
      let L = v - f.left - M / 2, T = k - f.top - S - $;
      L = Math.max(C, Math.min(L, f.width - M - C)), T < C && (T = k - f.top + $), T = Math.max(C, Math.min(T, f.height - S - C)), c.value = {
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
    }, b = () => {
      c.value.visible = !1;
    };
    return t({ isDark: i }), (y, g) => (_(), tt(ht, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT Daily Metrics",
      subtitle: "Daily CSAT Distribution",
      collapsible: !1
    }, Tt({
      default: E(() => [
        o.loading ? (_(), w("div", U1, [...g[0] || (g[0] = [
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
        ])])) : l.value && l.value.nps_by_day && l.value.nps_by_day.length > 0 ? (_(), w("div", X1, [
          r("div", {
            class: "chart-wrapper",
            ref_key: "chartContainerRef",
            ref: d
          }, [
            x.value && x.value.length > 0 ? (_(), tt(Vi, {
              key: 0,
              "candlestick-data": x.value,
              "chart-width": u.value,
              "chart-height": Lo,
              "chart-margin": cn,
              "chart-bottom-margin": Fo,
              "show-legend": !0,
              rotation: 0,
              "candle-width": 30,
              onCandleHover: p,
              onCandleLeave: b
            }, null, 8, ["candlestick-data", "chart-width"])) : V("", !0),
            c.value.visible ? (_(), w("div", {
              key: 1,
              class: "tooltip-overlay",
              style: gt({
                left: `${c.value.x}px`,
                top: `${c.value.y}px`
              })
            }, [
              r("div", G1, [
                r("div", Z1, A(c.value.date), 1),
                g[7] || (g[7] = r("div", { class: "tooltip-divider" }, null, -1)),
                r("div", Q1, [
                  r("div", J1, [
                    g[1] || (g[1] = r("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                    r("span", t_, A(c.value.min), 1)
                  ]),
                  r("div", e_, [
                    g[2] || (g[2] = r("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                    r("span", n_, A(c.value.q1), 1)
                  ]),
                  r("div", a_, [
                    g[3] || (g[3] = r("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                    r("span", s_, A(c.value.median), 1)
                  ]),
                  r("div", o_, [
                    g[4] || (g[4] = r("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                    r("span", i_, A(c.value.avg), 1)
                  ]),
                  r("div", l_, [
                    g[5] || (g[5] = r("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                    r("span", r_, A(c.value.q3), 1)
                  ]),
                  r("div", c_, [
                    g[6] || (g[6] = r("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                    r("span", d_, A(c.value.max), 1)
                  ])
                ])
              ])
            ], 4)) : V("", !0)
          ], 512),
          r("div", u_, [
            R(ot, {
              title: "Days",
              value: String(l.value.nps_by_day.length),
              class: "min-w-0 w-full max-w-xs"
            }, null, 8, ["value"])
          ])
        ])) : (_(), w("div", h_, [...g[8] || (g[8] = [
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
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}, Qi = /* @__PURE__ */ at(f_, [["__scopeId", "data-v-59bff16f"]]), g_ = { class: "nps-metrics-container" }, p_ = {
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
    return (s, o) => (_(), w("div", g_, [
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
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Ji = /* @__PURE__ */ at(p_, [["__scopeId", "data-v-25fe3b80"]]), m_ = { class: "csat-container__body" }, b_ = /* @__PURE__ */ Z({
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
    return (s, o) => (_(), tt(ht, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: E(() => [
        r("div", m_, [
          R(Ji, {
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
}), v_ = /* @__PURE__ */ at(b_, [["__scopeId", "data-v-29e9904b"]]), y_ = { class: "highlight-inner" }, __ = {
  key: 0,
  class: "loading-state"
}, x_ = {
  key: 1,
  class: "card-body"
}, k_ = { class: "metric-row" }, w_ = { class: "metric-currency" }, C_ = { class: "metric-value" }, $_ = /* @__PURE__ */ Z({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), s = D(() => Me(n.totalRevenue)), o = D(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = n.previousTotalRevenue;
      return c === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (_(), tt(ht, {
      collapsible: !1,
      class: W(["ai-revenue-metric", "w-full", { "ai-revenue-metric--dark": F(a) }])
    }, {
      title: E(() => [...u[0] || (u[0] = [
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
      headerAside: E(() => [
        !e.loading && o.value ? (_(), w("div", {
          key: 0,
          class: W(["change-badge", d.value])
        }, A(l.value), 3)) : V("", !0)
      ]),
      default: E(() => [
        r("div", y_, [
          e.loading ? (_(), w("div", __, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), w("div", x_, [
            r("div", k_, [
              r("span", w_, A(n.currencyCode), 1),
              r("span", C_, A(s.value), 1)
            ]),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "AI Revenue", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), M_ = /* @__PURE__ */ at($_, [["__scopeId", "data-v-f4ee91ea"]]), S_ = { class: "flex justify-end" }, D_ = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, A_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, T_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, B_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, L_ = { class: "flex flex-wrap gap-4" }, F_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, I_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, P_ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, E_ = { class: "truncate" }, R_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, O_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, V_ = /* @__PURE__ */ Z({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = [30, 50, 70, 50, 40], i = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], l = rt(a, "theme"), { isDark: d } = dt(l), c = et(a.breakdownBy), u = D(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), h = et({ labels: [], datasets: [] }), m = et([]), x = et([]), p = ["#3b82f6", "#f59e0b", "#06b6d4", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"], b = (v) => p[v % p.length], y = () => {
      s("changeBreakdown", c.value);
    }, g = (v) => {
      if (!v) return "";
      const M = v.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, f = (v) => {
      if (c.value === "all") {
        const T = v?.escalations_by_day ?? [];
        if (!T.length) {
          h.value = { labels: [], datasets: [] }, m.value = [], x.value = [];
          return;
        }
        const B = [...T].sort((I, P) => I.date.localeCompare(P.date));
        h.value = {
          labels: B.map((I) => Rt(I.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: B.map((I) => Number(I.escalation_rate_percentage || 0)),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, m.value = [], x.value = [];
        return;
      }
      const k = v?.breakdown_by_day ?? [], M = v?.breakdown_items ?? [];
      if (!k.length) {
        h.value = { labels: [], datasets: [] }, m.value = [], x.value = [];
        return;
      }
      const S = [...k].sort((T, B) => T.date.localeCompare(B.date)), C = M.slice(0, 5).map((T) => T.key), $ = S.map((T) => Rt(T.date).format("MMM DD")), L = C.map((T, B) => {
        const I = M.find((P) => P.key === T);
        return {
          label: g(I?.label || T),
          data: S.map((P) => {
            const N = P.items.find((Y) => Y.key === T);
            return Number(N?.percentage || 0);
          }),
          borderColor: b(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      h.value = {
        labels: $,
        datasets: L
      }, m.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        percentage: Number(T.percentage || 0),
        color: b(B)
      })), x.value = M.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        color: b(B)
      }));
    };
    return Ft(
      () => a.data,
      (v) => {
        f(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ft(
      () => a.breakdownBy,
      (v) => {
        c.value = v, f(u.value);
      }
    ), t({ isDark: d }), (v, k) => (_(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1
    }, {
      headerAside: E(() => [
        r("div", S_, [
          ae(r("select", {
            "onUpdate:modelValue": k[0] || (k[0] = (M) => c.value = M),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [...k[1] || (k[1] = [
            r("option", { value: "all" }, "All", -1),
            r("option", { value: "agent" }, "By Agent", -1),
            r("option", { value: "channel" }, "By Channel", -1),
            r("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [il, c.value]
          ])
        ])
      ]),
      default: E(() => [
        r("div", {
          class: W(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (_(), w("div", D_, [
            r("div", A_, [
              (_(), w(K, null, nt(o, (M, S) => r("div", {
                key: S,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70", i[S]]),
                style: gt({ height: `${M}%` })
              }, null, 6)), 64))
            ]),
            k[2] || (k[2] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading human escalations... ", -1))
          ])) : (_(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length && h.value.datasets.length ? (_(), w("section", T_, [
              r("div", B_, [
                R(ke, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", L_, [
                (_(!0), w(K, null, nt(x.value, (M) => (_(), w("div", {
                  key: `legend-${M.key}`,
                  class: "inline-flex items-center gap-2 text-sm"
                }, [
                  r("span", {
                    class: "inline-block h-2.5 w-2.5 rounded-full",
                    style: gt({ backgroundColor: M.color })
                  }, null, 4),
                  r("span", F_, A(M.label), 1)
                ]))), 128))
              ]),
              r("div", I_, [
                (_(!0), w(K, null, nt(m.value, (M) => (_(), w("div", {
                  key: `card-${M.key}`,
                  class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                }, [
                  r("p", P_, [
                    r("span", {
                      class: "inline-block h-2.5 w-2.5 rounded-full",
                      style: gt({ backgroundColor: M.color })
                    }, null, 4),
                    r("span", E_, A(M.label), 1)
                  ]),
                  r("p", R_, A(M.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (_(), w("section", O_, [...k[3] || (k[3] = [
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
}), z_ = /* @__PURE__ */ at(V_, [["__scopeId", "data-v-809d3c8c"]]), N_ = { class: "highlight-inner" }, j_ = {
  key: 0,
  class: "loading-state"
}, H_ = {
  key: 1,
  class: "card-body"
}, W_ = { class: "metric-value" }, Y_ = /* @__PURE__ */ Z({
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
      const d = t.previousEscalationRatePercentage;
      return d === 0 ? t.escalationRatePercentage > 0 ? 100 : 0 : (t.escalationRatePercentage - d) / d * 100;
    }), i = D(() => {
      const d = o.value.toFixed(1);
      return o.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), l = D(() => o.value > 0 ? "change-badge--up" : o.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return (d, c) => (_(), tt(ht, {
      collapsible: !1,
      class: W(["human-escalations-metric", "w-full", { "human-escalations-metric--dark": F(n) }])
    }, {
      title: E(() => [...c[0] || (c[0] = [
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
      headerAside: E(() => [
        !e.loading && s.value ? (_(), w("div", {
          key: 0,
          class: W(["change-badge", l.value])
        }, A(i.value), 3)) : V("", !0)
      ]),
      default: E(() => [
        r("div", N_, [
          e.loading ? (_(), w("div", j_, [...c[1] || (c[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (_(), w("div", H_, [
            r("span", W_, A(a.value), 1),
            c[2] || (c[2] = r("span", { class: "metric-label" }, "Human Escalations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), K_ = /* @__PURE__ */ at(Y_, [["__scopeId", "data-v-a4480f29"]]), q_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, U_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, X_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, G_ = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Z_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Q_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, J_ = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, tx = { class: "max-w-[360px] text-center" }, ex = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, nx = {
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
      const c = t.data ?? {}, u = c.daily, h = c.days, m = Array.isArray(u) && u.length > 0, x = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let p = [];
      return m ? p = u : x && (p = h.map((b, y) => ({
        date: b,
        allocated_cost: c.allocatedCostSeries[y] ?? 0,
        aws_cost: c.awsCostSeries[y] ?? 0,
        airline_conversations: c.airlineConversationsSeries[y] ?? 0
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
    return (c, u) => (_(), tt(ht, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: E(() => [
        r("div", q_, [
          e.loading ? (_(), w("div", U_, [
            r("div", X_, [
              (_(), w(K, null, nt(s, (h, m) => r("div", {
                key: m,
                class: W(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[m]]),
                style: gt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            u[0] || (u[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (_(), w("div", G_, [
            r("div", Z_, [
              R(ke, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: d.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", Q_, [
              R(ot, {
                color: F(a).primaryLight,
                title: "Total Allocated",
                value: F(xt)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              R(ot, {
                color: "#FF9900",
                title: "Total AWS",
                value: F(xt)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (_(), w("section", J_, [
            r("div", tx, [
              r("div", ex, [
                R(F(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, ax = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, sx = {
  key: 0,
  class: "card-body"
}, ox = {
  key: 0,
  class: "chart-section"
}, ix = { class: "chart-container" }, lx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, rx = {
  key: 1,
  class: "empty-state"
}, cx = { class: "empty-state-content" }, dx = { class: "empty-icon-wrapper" }, ux = {
  key: 1,
  class: "loading-state"
}, dn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Po = 10, hx = /* @__PURE__ */ Z({
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
    const a = e, { isDark: s, colors: o } = dt(rt(a, "theme")), i = (p) => {
      const b = new Date(p), y = String(b.getDate()).padStart(2, "0"), g = String(b.getMonth() + 1).padStart(2, "0");
      return `${y}-${g}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, y) => b + (y.input_cost || 0), 0);
    }), c = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, y) => b + (y.output_cost || 0), 0);
    }), u = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, y) => b + (y.cache_read_cost || 0), 0);
    }), h = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, y) => b + (y.cache_write_cost || 0), 0);
    }), m = D(() => {
      const p = a.data?.costs_by_day || {}, b = Object.keys(p).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const y = b.map((f) => i(f)), g = [
        {
          label: "Input Cost",
          data: b.map((f) => p[f]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((f) => p[f]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((f) => p[f]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((f) => p[f]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: g
      };
    }), x = D(() => a.options ? a.options : {
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
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Po,
            boxHeight: Po,
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
            family: dn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: dn,
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
            font: { family: dn, size: 12, weight: "500" },
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
            font: { family: dn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(p) {
              return xt(p);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (p, b) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: E(() => [
        r("div", ax, [
          e.loading ? (_(), w("div", ux, [...b[2] || (b[2] = [
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
          ])])) : (_(), w("div", sx, [
            m.value.labels && m.value.labels.length ? (_(), w("section", ox, [
              r("div", ix, [
                R(_e, {
                  data: m.value,
                  options: x.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", lx, [
                R(ot, {
                  title: "Total Cost",
                  value: F(xt)(e.data.total_cost)
                }, null, 8, ["value"]),
                R(ot, {
                  title: "Input Cost",
                  value: F(xt)(d.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(ot, {
                  title: "Output Cost",
                  value: F(xt)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(ot, {
                  title: "Cache Read",
                  value: F(xt)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(ot, {
                  title: "Cache Write",
                  value: F(xt)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                R(ot, {
                  title: "Avg / Conv.",
                  value: F(xt)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (_(), w("section", rx, [
              r("div", cx, [
                r("div", dx, [
                  R(F(qt), { class: "empty-icon" })
                ]),
                b[0] || (b[0] = r("p", { class: "empty-title" }, "No cost usage data", -1)),
                b[1] || (b[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), fx = /* @__PURE__ */ at(hx, [["__scopeId", "data-v-39a5448c"]]), gx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, px = {
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
}, un = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Eo = 10, wx = /* @__PURE__ */ Z({
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
      const h = new Date(u), m = String(h.getDate()).padStart(2, "0"), x = String(h.getMonth() + 1).padStart(2, "0");
      return `${m}-${x}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((p) => i(p)), x = [
        {
          label: "Input Tokens",
          data: h.map((p) => u[p]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((p) => u[p]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((p) => u[p]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((p) => u[p]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: x
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
              family: un,
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
            family: un,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: un,
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
            font: { family: un, size: 12, weight: "500" },
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
            font: { family: un, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (u, h) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: E(() => [
        r("div", gx, [
          e.loading ? (_(), w("div", kx, [...h[2] || (h[2] = [
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
          ])])) : (_(), w("div", px, [
            d.value.labels && d.value.labels.length ? (_(), w("section", mx, [
              r("div", bx, [
                R(_e, {
                  data: d.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", vx, [
                R(ot, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: F(q)(e.data.total_tokens)
                }, null, 8, ["value"]),
                R(ot, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: F(q)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(ot, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: F(q)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(ot, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: F(q)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(ot, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: F(q)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (_(), w("section", yx, [
              r("div", _x, [
                r("div", xx, [
                  R(F(qt), { class: "empty-icon" })
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
}), Cx = /* @__PURE__ */ at(wx, [["__scopeId", "data-v-70c6f3c7"]]), $x = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Mx = {
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
}, Ix = /* @__PURE__ */ Z({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = (c) => {
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(
      () => q(n.data?.total_conversations ?? 0)
    ), l = D(() => {
      const c = n.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const h = u.map((x) => o(x)), m = [
        {
          label: "Conversations",
          data: u.map((x) => c[x] || 0),
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
    return t({ isDark: a }), (c, u) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: E(() => [
        r("div", $x, [
          e.loading ? (_(), w("div", Fx, [...u[2] || (u[2] = [
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
          ])])) : (_(), w("div", Mx, [
            l.value.labels && l.value.labels.length ? (_(), w("section", Sx, [
              r("div", Dx, [
                R(ke, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", Ax, [
                R(ot, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (_(), w("section", Tx, [
              r("div", Bx, [
                r("div", Lx, [
                  R(F(qt), { class: "empty-icon" })
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
}), Px = /* @__PURE__ */ at(Ix, [["__scopeId", "data-v-b33e8627"]]), Ex = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Rx = {
  key: 0,
  class: "card-body"
}, Ox = {
  key: 0,
  class: "charts-grid"
}, Vx = { class: "chart-section" }, zx = { class: "chart-container" }, Nx = { class: "chart-section" }, jx = { class: "chart-container" }, Hx = {
  key: 1,
  class: "empty-state"
}, Wx = { class: "empty-state-content" }, Yx = { class: "empty-icon-wrapper" }, Kx = {
  key: 1,
  class: "loading-state"
}, qx = /* @__PURE__ */ Z({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = D(() => n.data?.top_agents && n.data.top_agents.length > 0), i = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, x) => (x.total_cost || 0) - (m.total_cost || 0)) : []), l = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, x) => (x.total_tokens || 0) - (m.total_tokens || 0)) : []), d = D(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((x) => x.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((x) => x.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = D(() => {
      const m = l.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((x) => x.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((x) => x.total_tokens || 0),
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const x = m.label, p = n.data?.top_agents?.find((b) => b.agent_type === x);
              return p ? [
                `Total Cost: ${xt(p.total_cost)}`,
                `Input Cost: ${xt(p.total_input_tokens_cost)}`,
                `Output Cost: ${xt(p.total_output_tokens_cost)}`,
                `Cache Read: ${xt(p.total_read_tokens_cost)}`,
                `Cache Write: ${xt(p.total_write_tokens_cost)}`
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
              return xt(m);
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const x = m.label, p = n.data?.top_agents?.find((b) => b.agent_type === x);
              return p ? [
                `Total Tokens: ${p.total_tokens.toLocaleString()}`,
                `Input Tokens: ${p.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${p.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${p.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${p.total_write_tokens.toLocaleString()}`
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
    return t({ isDark: a }), (m, x) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: E(() => [
        r("div", Ex, [
          e.loading ? (_(), w("div", Kx, [...x[4] || (x[4] = [
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
          ])])) : (_(), w("div", Rx, [
            o.value ? (_(), w("div", Ox, [
              r("section", Vx, [
                x[0] || (x[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", zx, [
                  R(_e, {
                    data: d.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", Nx, [
                x[1] || (x[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", jx, [
                  R(_e, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (_(), w("section", Hx, [
              r("div", Wx, [
                r("div", Yx, [
                  R(F(qt), { class: "empty-icon" })
                ]),
                x[2] || (x[2] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                x[3] || (x[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ux = /* @__PURE__ */ at(qx, [["__scopeId", "data-v-a5014772"]]), Xx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Gx = {
  key: 0,
  class: "card-body"
}, Zx = {
  key: 0,
  class: "chart-section"
}, Qx = { class: "chart-container" }, Jx = {
  key: 1,
  class: "empty-state"
}, tk = { class: "empty-state-content" }, ek = { class: "empty-icon-wrapper" }, nk = {
  key: 1,
  class: "loading-state"
}, ak = /* @__PURE__ */ Z({
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
    ) : []), l = D(() => i.value.length > 0), d = D(() => i.value.reduce((h, m) => h + (m.conversations || 0), 0)), c = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((b) => {
        const y = b.agent_type?.toLowerCase();
        return (o[y] || "#a78bfa") + "80";
      }), x = h.map((b) => {
        const y = b.agent_type?.toLowerCase();
        return o[y] || "#a78bfa";
      });
      return {
        labels: h.map((b) => {
          const y = b.conversations || 0, g = d.value ? y / d.value * 100 : 0;
          return `${b.agent_type} - ${y.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((b) => b.conversations || 0),
            backgroundColor: m,
            borderColor: x,
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
              const m = (h.label || "").toString(), x = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce((y, g) => y + (Number(g) || 0), 0), b = p ? x / p * 100 : 0;
              return `${m}: ${x.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, m) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: E(() => [
        r("div", Xx, [
          e.loading ? (_(), w("div", nk, [...m[2] || (m[2] = [
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
          ])])) : (_(), w("div", Gx, [
            l.value ? (_(), w("section", Zx, [
              r("div", Qx, [
                R(ra, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (_(), w("section", Jx, [
              r("div", tk, [
                r("div", ek, [
                  R(F(qt), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                m[1] || (m[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), sk = /* @__PURE__ */ at(ak, [["__scopeId", "data-v-14445b91"]]), ok = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ik = {
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
}, fk = /* @__PURE__ */ Z({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = dt(rt(n, "theme")), o = (c) => {
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
        const y = [...c].sort((g, f) => g.date.localeCompare(f.date));
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
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, x = Object.keys(u).filter((y) => h[y]).sort();
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const p = x.map((y) => o(y)), b = x.map((y) => {
        const g = u[y]?.total_cost || 0, f = h[y] || 0;
        return f > 0 ? g / f : 0;
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
              return u && (u += ": "), c.parsed.y !== null && (u += xt(c.parsed.y)), u;
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
              return xt(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, u) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: E(() => [
        r("div", ok, [
          e.loading ? (_(), w("div", hk, [...u[2] || (u[2] = [
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
          ])])) : (_(), w("div", ik, [
            i.value ? (_(), w("section", lk, [
              r("div", rk, [
                R(ke, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (_(), w("section", ck, [
              r("div", dk, [
                r("div", uk, [
                  R(F(qt), { class: "empty-icon" })
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
}), gk = /* @__PURE__ */ at(fk, [["__scopeId", "data-v-1e8204ea"]]);
function Ht() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const pk = { class: "tabs text-sm" }, mk = ["aria-label"], bk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], vk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, yk = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = et([]), o = `tabs-${Ht()}`, i = (p) => `${o}-tab-${p}`, l = D(
      () => n.items.map((p, b) => p.disabled ? -1 : b).filter((p) => p >= 0)
    );
    function d(p) {
      return p.value === n.modelValue;
    }
    function c(p) {
      const b = d(p), g = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return p.disabled ? `${g} cursor-not-allowed opacity-40` : b ? `${g} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${g} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(p, b) {
      p === b || n.items.find((g) => g.value === p)?.disabled || (a("update:modelValue", p), a("change", { value: p, previousValue: b }));
    }
    function h(p, b) {
      a("tab-click", { value: p.value, originalEvent: b }), !p.disabled && (u(p.value, n.modelValue), Ot(() => {
        s.value[n.items.indexOf(p)]?.focus();
      }));
    }
    function m(p, b) {
      const y = n.items.length;
      if (y === 0) return 0;
      let g = p;
      for (let f = 0; f < y; f++)
        if (g = (g + b + y) % y, !n.items[g]?.disabled) return g;
      return p;
    }
    async function x(p, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(p.key)) return;
      p.preventDefault();
      let g = b;
      p.key === "ArrowLeft" ? g = m(b, -1) : p.key === "ArrowRight" ? g = m(b, 1) : p.key === "Home" ? g = l.value[0] ?? 0 : p.key === "End" && (g = l.value[l.value.length - 1] ?? b);
      const f = n.items[g];
      !f || f.disabled || (u(f.value, n.modelValue), await Ot(), s.value[g]?.focus());
    }
    return (p, b) => (_(), w("div", pk, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: W([
          "box-border min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (_(!0), w(K, null, nt(e.items, (y, g) => (_(), w("button", {
          id: i(y.value),
          key: y.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": d(y),
          "aria-disabled": y.disabled === !0,
          tabindex: d(y) ? 0 : -1,
          class: W(c(y)),
          onClick: (f) => h(y, f),
          onKeydown: (f) => x(f, g)
        }, [
          r("span", {
            class: W(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (_(), tt(Xe(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : V("", !0),
            r("span", vk, A(y.label), 1)
          ], 2)
        ], 42, bk))), 128))
      ], 10, mk),
      p.$slots.default ? (_(), tt(mn, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: E(() => [
          (_(), w("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            $t(p.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : V("", !0)
    ]));
  }
}), tl = /* @__PURE__ */ at(yk, [["__scopeId", "data-v-552ce048"]]), _k = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xk = {
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
}, Mk = { class: "empty-state-content" }, Sk = { class: "empty-icon-wrapper" }, Dk = /* @__PURE__ */ Z({
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
    const a = e, s = n, o = (p) => {
      s("export", p);
    }, { isDark: i } = dt(rt(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], d = et("by_model"), c = D(() => d.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), u = D(() => [
      { key: "name", label: d.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = D(
      () => Object.entries(c.value).map(([p, b]) => ({
        id: p,
        name: p,
        avgCost: x(b.avg_cost_per_message),
        avgTokens: m(b.avg_tokens_per_message),
        messageCount: m(b.message_count),
        totalCost: x(b.total_cost),
        totalTokens: m(b.total_tokens)
      }))
    ), m = (p) => p == null ? "0" : q(p), x = (p) => p == null ? "$0.00" : xt(p);
    return t({ isDark: i }), (p, b) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, Tt({
      default: E(() => [
        r("div", _k, [
          e.loading ? (_(), w("div", xk, [...b[1] || (b[1] = [
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
          ])])) : (_(), w("div", kk, [
            R(tl, {
              modelValue: d.value,
              "onUpdate:modelValue": b[0] || (b[0] = (y) => d.value = y),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: E(() => [
                c.value && Object.keys(c.value).length > 0 ? (_(), w("div", wk, [
                  r("div", Ck, [
                    R(Jt, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (_(), w("div", $k, [
                  r("div", Mk, [
                    r("div", Sk, [
                      R(F(qt), { class: "empty-icon" })
                    ]),
                    b[2] || (b[2] = r("p", { class: "empty-title" }, "No model usage data available", -1)),
                    b[3] || (b[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
        fn: E(() => [
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
}), Ak = /* @__PURE__ */ at(Dk, [["__scopeId", "data-v-3e03d526"]]), Tk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bk = {
  key: 0,
  class: "loading-state"
}, Lk = {
  key: 1,
  class: "card-body"
}, Fk = {
  key: 0,
  class: "message-roles-table-block"
}, Ik = { class: "w-full min-w-0" }, Pk = {
  key: 1,
  class: "empty-state"
}, Ek = { class: "empty-state-content" }, Rk = { class: "empty-icon-wrapper" }, Ok = /* @__PURE__ */ Z({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = dt(rt(a, "theme")), l = ["assistant", "system", "user"], d = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = D(() => a.data?.total_by_role || {}), u = D(
      () => l.map((b) => ({
        id: b,
        role: p(b),
        avgCost: x(c.value[b]?.avg_cost_per_message),
        avgTokens: m(c.value[b]?.avg_tokens_per_message),
        messageCount: m(c.value[b]?.message_count),
        totalCost: x(c.value[b]?.total_cost),
        totalTokens: m(c.value[b]?.total_tokens)
      }))
    ), h = D(() => Object.keys(c.value).length > 0), m = (b) => b == null ? "0" : q(b), x = (b) => b == null ? "$0.00" : xt(b), p = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, y) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, Tt({
      default: E(() => [
        r("div", Tk, [
          e.loading ? (_(), w("div", Bk, [...y[0] || (y[0] = [
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
          ])])) : (_(), w("div", Lk, [
            h.value ? (_(), w("div", Fk, [
              r("div", Ik, [
                R(Jt, {
                  columns: d,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (_(), w("div", Pk, [
              r("div", Ek, [
                r("div", Rk, [
                  R(F(qt), { class: "empty-icon" })
                ]),
                y[1] || (y[1] = r("p", { class: "empty-title" }, "No message role data available", -1)),
                y[2] || (y[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), Vk = /* @__PURE__ */ at(Ok, [["__scopeId", "data-v-57850103"]]), zk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Nk = {
  key: 0,
  class: "card-body"
}, jk = {
  key: 0,
  class: "chart-section"
}, Hk = { class: "chart-container" }, Wk = { class: "kpi-grid" }, Yk = {
  key: 1,
  class: "empty-state"
}, Kk = { class: "empty-state-content" }, qk = { class: "empty-icon-wrapper" }, Uk = {
  key: 1,
  class: "loading-state"
}, Xk = /* @__PURE__ */ Z({
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
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), d = {
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
    }, c = (f) => f.agent_type || f.agent_id || f.agent_name || "", u = (f) => f.agent_name ? f.agent_name : c(f).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (f) => {
      const v = c(f).toLowerCase();
      for (const [k, M] of Object.entries(d))
        if (v.includes(k))
          return M;
      return "#9ca3af";
    }, m = D(() => [...a.data?.top_agents || []].sort((v, k) => k.avg_cost_per_conversation - v.avg_cost_per_conversation)), x = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : m.value.reduce((f, v) => f + v.conversations, 0)), p = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : m.value.reduce((f, v) => f + v.total_cost, 0)), b = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : x.value === 0 ? 0 : p.value / x.value), y = D(() => {
      const f = m.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const v = f.map((S) => u(S)), k = f.map((S) => S.avg_cost_per_conversation), M = f.map((S) => h(S));
      return {
        labels: v,
        datasets: [
          {
            label: "USD per conversation",
            data: k,
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
              const v = m.value[f.dataIndex];
              return [
                `Cost: ${xt(f.parsed.x)}`,
                `Conversations: ${q(v.conversations)}`,
                `Total Cost: ${xt(v.total_cost)}`
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
    return t({ isDark: i }), (f, v) => (_(), tt(ht, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, Tt({
      default: E(() => [
        r("div", zk, [
          e.loading ? (_(), w("div", Uk, [...v[2] || (v[2] = [
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
          ])])) : (_(), w("div", Nk, [
            y.value.labels && y.value.labels.length ? (_(), w("section", jk, [
              r("div", Hk, [
                R(_e, {
                  data: y.value,
                  options: g.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Wk, [
                R(F(ot), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                R(F(ot), {
                  title: "Total Conversations",
                  value: F(q)(x.value)
                }, null, 8, ["value"]),
                R(F(ot), {
                  title: "Total Cost",
                  value: F(xt)(p.value)
                }, null, 8, ["value"]),
                R(F(ot), {
                  title: "Avg Cost / Conv.",
                  value: F(xt)(b.value)
                }, null, 8, ["value"])
              ])
            ])) : (_(), w("section", Yk, [
              r("div", Kk, [
                r("div", qk, [
                  R(F(qt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = r("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                v[1] || (v[1] = r("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: E(() => [
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
}), Gk = /* @__PURE__ */ at(Xk, [["__scopeId", "data-v-cd2a584a"]]);
function Zk(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Qk(e, t) {
  return _(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Jk = ["aria-label"], t2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, e2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, n2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, a2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], s2 = { class: "truncate" }, o2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, i2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, l2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, r2 = ["aria-label", "onClick"], c2 = ["aria-label", "onClick"], d2 = ["aria-label"], u2 = ["aria-label"], h2 = {
  key: 1,
  class: "space-y-2"
}, f2 = ["for"], g2 = ["id", "placeholder", "onKeydown"], p2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, m2 = ["aria-label"], b2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, v2 = ["checked", "onChange"], y2 = { class: "min-w-0 flex-1" }, _2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, x2 = { class: "flex flex-wrap items-end gap-2" }, k2 = { class: "min-w-[120px] flex-1" }, w2 = ["for"], C2 = ["id"], $2 = { class: "min-w-[120px] flex-1" }, M2 = ["for"], S2 = ["id"], D2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = Ea(), i = `${`kiut-filters-${Ht()}`}-panel`, l = et(null), d = /* @__PURE__ */ new Map(), c = et(null), u = et(!1), h = et({}), m = et(null), x = et(""), p = et([]), b = et(""), y = et(""), g = D(() => c.value ? n.filterDefinitions.find((O) => O.id === c.value) ?? null : null), f = D(() => {
      const O = g.value;
      if (O)
        return O.type === "text" ? x.value : O.type === "select" ? p.value : { start: b.value, end: y.value };
    });
    function v(O, j) {
      j && j instanceof HTMLElement ? d.set(O, j) : d.delete(O);
    }
    function k(O) {
      return n.modelValue[O];
    }
    function M(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((j) => typeof j == "string" && j.trim() !== "");
      if (typeof O == "string") {
        const j = O.trim();
        return j ? [j] : [];
      }
      return [];
    }
    function S(O, j) {
      if (j == null) return !0;
      if (O.type === "text") return String(j).trim() === "";
      if (O.type === "select") return M(j).length === 0;
      if (O.type === "dateRange") {
        const U = j;
        return !U?.start?.trim() || !U?.end?.trim();
      }
      return !0;
    }
    const C = D(
      () => n.filterDefinitions.some((O) => !S(O, k(O.id)))
    ), $ = D(() => {
      const O = [];
      for (const j of n.filterDefinitions) {
        const U = k(j.id);
        if (!S(j, U)) {
          if (j.type === "text")
            O.push({ kind: "text", def: j, key: j.id });
          else if (j.type === "dateRange")
            O.push({ kind: "dateRange", def: j, key: j.id });
          else if (j.type === "select")
            for (const ft of M(U))
              O.push({
                kind: "select",
                def: j,
                optionValue: ft,
                key: `${j.id}::${ft}`
              });
        }
      }
      return O;
    });
    function L(O) {
      return O.type !== "select" ? 0 : M(k(O.id)).length;
    }
    function T(O) {
      const j = k(O.id), U = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${U}: ${String(j ?? "").trim()}`;
      if (O.type === "select") {
        const al = M(j).map((is) => O.options.find((sl) => sl.value === is)?.label ?? is);
        return `${U}: ${al.join(", ")}`;
      }
      const ft = j, Zt = I(ft.start), Ce = I(ft.end);
      return `${U}: ${Zt} – ${Ce}`;
    }
    function B(O) {
      return O.kind === "text" || O.kind === "dateRange" ? T(O.def) : O.def.options.find((U) => U.value === O.optionValue)?.label ?? O.optionValue;
    }
    function I(O) {
      if (!O) return "";
      const j = Rt(O, "YYYY-MM-DD", !0);
      return j.isValid() ? j.format("L") : O;
    }
    function P(O) {
      const j = c.value === O.id && u.value, U = !S(O, k(O.id));
      return j || U ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(O) {
      return S(O, k(O.id)) ? mt(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function Y(O) {
      const j = k(O.id);
      if (O.type === "text") {
        x.value = j != null ? String(j) : "";
        return;
      }
      if (O.type === "select") {
        p.value = [...M(j)];
        return;
      }
      const U = j;
      b.value = U?.start?.trim() ?? "", y.value = U?.end?.trim() ?? "";
    }
    function H() {
      const O = g.value;
      if (!O || O.type !== "select") return;
      const j = { ...n.modelValue };
      p.value.length === 0 ? delete j[O.id] : j[O.id] = [...p.value], a("update:modelValue", j), a("change", j);
    }
    function Q(O) {
      const j = p.value.indexOf(O);
      j >= 0 ? p.value = p.value.filter((U, ft) => ft !== j) : p.value = [...p.value, O], H();
    }
    function J(O) {
      if (!O) return;
      m.value = O;
      const j = O.getBoundingClientRect(), U = 300;
      let ft = j.left;
      const Zt = window.innerWidth - U - 12;
      ft > Zt && (ft = Math.max(12, Zt)), ft < 12 && (ft = 12);
      const Ce = j.bottom + 8;
      h.value = {
        top: `${Ce}px`,
        left: `${ft}px`,
        width: `${Math.min(U, window.innerWidth - 24)}px`
      };
    }
    function lt(O, j) {
      if (c.value === O.id && u.value) {
        st();
        return;
      }
      u.value && c.value !== O.id && st(), c.value = O.id, u.value = !0, Y(O), Ot().then(async () => {
        J(j.currentTarget), await Ot(), pt();
      });
    }
    function vt(O, j) {
      if (c.value === O.id && u.value) {
        st();
        return;
      }
      u.value && c.value !== O.id && st(), c.value = O.id, u.value = !0, Y(O), Ot().then(async () => {
        const U = d.get(O.id) ?? j.currentTarget;
        J(U), await Ot(), pt();
      });
    }
    function pt() {
      const O = l.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function ct() {
      u.value = !1, c.value = null, m.value = null;
    }
    function Mt(O) {
      const j = g.value;
      if (!j) return;
      if (j.type === "text") {
        x.value = O != null ? String(O) : "";
        return;
      }
      if (j.type === "select") {
        p.value = Array.isArray(O) ? O.filter((ft) => typeof ft == "string") : M(O);
        return;
      }
      const U = O;
      b.value = U?.start?.trim() ?? "", y.value = U?.end?.trim() ?? "";
    }
    function st() {
      const O = g.value;
      if (!O) return;
      if (O.type === "text") {
        const Zt = x.value.trim(), Ce = { ...n.modelValue };
        Zt === "" ? delete Ce[O.id] : Ce[O.id] = Zt, a("update:modelValue", Ce), a("change", Ce), ct();
        return;
      }
      if (O.type === "select") {
        H(), ct();
        return;
      }
      const j = b.value.trim(), U = y.value.trim(), ft = { ...n.modelValue };
      !j || !U || j > U ? delete ft[O.id] : ft[O.id] = { start: j, end: U }, a("update:modelValue", ft), a("change", ft), ct();
    }
    function Et(O) {
      const j = { ...n.modelValue };
      delete j[O], a("update:modelValue", j), a("change", j), c.value === O && ct();
    }
    function At(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        Et(O.def.id);
        return;
      }
      const j = { ...n.modelValue }, ft = M(j[O.def.id]).filter((Zt) => Zt !== O.optionValue);
      ft.length === 0 ? delete j[O.def.id] : j[O.def.id] = ft, a("update:modelValue", j), a("change", j), c.value === O.def.id && Y(O.def);
    }
    function z() {
      const O = {};
      a("update:modelValue", O), a("change", O), ct();
    }
    const X = D(() => {
      const O = g.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function G(O) {
      const j = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((Zt) => Zt.value === O.optionValue)?.label ?? O.optionValue} del filtro ${j}` : `Quitar filtro ${j}`;
    }
    function it(O) {
      const j = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const ft = O.def.options.find((Zt) => Zt.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${j}: ${ft}`;
      }
      return `Editar filtro ${j}`;
    }
    function mt(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const bt = D(() => n.clearLabel);
    function St(O) {
      if (!u.value || !l.value) return;
      const j = O.target;
      if (!(l.value.contains(j) || (j instanceof Element ? j : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ft of d.values())
          if (ft?.contains(j)) return;
        st();
      }
    }
    function Nt(O) {
      O.key === "Escape" && u.value && (O.preventDefault(), ct());
    }
    function It() {
      !u.value || !m.value || J(m.value);
    }
    return Qt(() => {
      document.addEventListener("mousedown", St, !0), window.addEventListener("keydown", Nt, !0), window.addEventListener("resize", It);
    }), Ho(() => {
      document.removeEventListener("mousedown", St, !0), window.removeEventListener("keydown", Nt, !0), window.removeEventListener("resize", It);
    }), Ft(
      () => n.modelValue,
      () => {
        const O = g.value;
        O && u.value && !s.panel && Y(O);
      },
      { deep: !0 }
    ), (O, j) => (_(), w("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", t2, [
        r("span", e2, A(e.label), 1),
        r("div", n2, [
          (_(!0), w(K, null, nt(e.filterDefinitions, (U) => (_(), w("button", {
            key: `pill-${U.id}`,
            ref_for: !0,
            ref: (ft) => v(U.id, ft),
            type: "button",
            class: W(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", P(U)]),
            "aria-label": N(U),
            "aria-expanded": c.value === U.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === U.id ? i : void 0,
            onClick: (ft) => vt(U, ft)
          }, [
            R(F(Zk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            r("span", s2, A(U.label), 1),
            U.type === "select" && L(U) > 0 ? (_(), w("span", o2, A(L(U)), 1)) : V("", !0)
          ], 10, a2))), 128))
        ])
      ]),
      C.value ? (_(), w("div", i2, [
        r("div", l2, [
          (_(!0), w(K, null, nt($.value, (U) => (_(), w("div", {
            key: U.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            r("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": it(U),
              onClick: (ft) => lt(U.def, ft)
            }, [
              $t(O.$slots, "formatChip", {
                filter: U.def,
                value: k(U.def.id),
                optionValue: U.kind === "select" ? U.optionValue : void 0
              }, () => [
                yt(A(B(U)), 1)
              ], !0)
            ], 8, r2),
            r("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": G(U),
              onClick: (ft) => At(U)
            }, [
              R(F(Qk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, c2)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": bt.value,
          onClick: z
        }, A(e.clearLabel), 9, d2)
      ])) : V("", !0),
      (_(), tt(Ra, { to: "body" }, [
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
          onKeydown: j[3] || (j[3] = ue(() => {
          }, ["stop"]))
        }, [
          g.value ? (_(), w(K, { key: 0 }, [
            O.$slots.panel ? $t(O.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: st,
              value: f.value,
              updateValue: Mt
            }, void 0, !0) : (_(), w("div", h2, [
              g.value.type === "text" ? (_(), w(K, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(g.value.label), 9, f2),
                ae(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": j[0] || (j[0] = (U) => x.value = U),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: Xn(ue(st, ["prevent"]), ["enter"])
                }, null, 40, g2), [
                  [Ge, x.value]
                ])
              ], 64)) : g.value.type === "select" ? (_(), w(K, { key: 1 }, [
                r("p", p2, A(g.value.label), 1),
                r("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (_(!0), w(K, null, nt(g.value.options, (U) => (_(), w("li", {
                    key: U.value
                  }, [
                    r("label", b2, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: p.value.includes(U.value),
                        onChange: (ft) => Q(U.value)
                      }, null, 40, v2),
                      r("span", y2, A(U.label), 1)
                    ])
                  ]))), 128))
                ], 8, m2)
              ], 64)) : g.value.type === "dateRange" ? (_(), w(K, { key: 2 }, [
                r("p", _2, A(g.value.label), 1),
                r("div", x2, [
                  r("div", k2, [
                    r("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, w2),
                    ae(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": j[1] || (j[1] = (U) => b.value = U),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, C2), [
                      [Ge, b.value]
                    ])
                  ]),
                  r("div", $2, [
                    r("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, M2),
                    ae(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": j[2] || (j[2] = (U) => y.value = U),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, S2), [
                      [Ge, y.value]
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
}), A2 = /* @__PURE__ */ at(D2, [["__scopeId", "data-v-f38e0100"]]), te = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", fe = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", T2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", we = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", ge = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", B2 = { class: "font-sans" }, L2 = ["for"], F2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], I2 = ["id"], P2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = aa(), o = Wo("$pcForm", null), i = `kiut-input-text-${Ht()}`, l = D(() => n.id ?? i), d = D(() => `${l.value}-err`), c = D(() => n.name ?? s.name ?? ""), u = et(n.modelValue ?? "");
    Ft(
      () => n.modelValue,
      (g) => {
        u.value = g ?? "";
      }
    ), Qt(() => {
      o && c.value && o.register?.(c.value, {});
    }), he(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const h = D(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? u.value : u.value), m = D(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function x(g) {
      const f = g.target.value;
      u.value = f, a("update:modelValue", f);
      const v = o?.fields?.[c.value]?.props;
      v?.onInput && v.onInput(g);
    }
    function p(g) {
      const f = o?.fields?.[c.value]?.props;
      f?.onChange && f.onChange(g);
    }
    function b(g) {
      const f = o?.fields?.[c.value]?.props;
      f?.onBlur && f.onBlur(g);
    }
    const y = D(() => {
      const { name: g, id: f, type: v, ...k } = s;
      return k;
    });
    return (g, f) => (_(), w("div", B2, [
      e.label ? (_(), w("label", {
        key: 0,
        for: l.value,
        class: W(F(te))
      }, A(e.label), 11, L2)) : V("", !0),
      r("input", Je(y.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [F(fe), m.value ? F(we) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": m.value ? "true" : void 0,
        "aria-describedby": e.errorText ? d.value : void 0,
        onInput: x,
        onChange: p,
        onBlur: b
      }), null, 16, F2),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: d.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, I2)) : V("", !0)
    ]));
  }
}), E2 = { class: "font-sans" }, R2 = ["for"], O2 = { class: "relative" }, V2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], z2 = ["aria-label"], N2 = {
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
}, H2 = ["id"], W2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = aa(), o = Wo("$pcForm", null), i = `kiut-input-password-${Ht()}`, l = D(() => n.id ?? i), d = D(() => `${l.value}-err`), c = D(() => n.name ?? s.name ?? ""), u = et(!1), h = et(n.modelValue ?? "");
    Ft(
      () => n.modelValue,
      (f) => {
        f !== void 0 && f !== h.value && (h.value = f);
      }
    ), Qt(() => {
      o && c.value && o.register?.(c.value, {});
    }), he(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const m = D(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? h.value : h.value), x = D(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function p(f) {
      const v = f.target.value;
      h.value = v, a("update:modelValue", v);
      const k = o?.fields?.[c.value]?.props;
      k?.onInput && k.onInput(f);
    }
    function b(f) {
      const v = o?.fields?.[c.value]?.props;
      v?.onChange && v.onChange(f);
    }
    function y(f) {
      const v = o?.fields?.[c.value]?.props;
      v?.onBlur && v.onBlur(f);
    }
    const g = D(() => {
      const { name: f, id: v, ...k } = s;
      return k;
    });
    return (f, v) => (_(), w("div", E2, [
      e.label ? (_(), w("label", {
        key: 0,
        for: l.value,
        class: W(F(te))
      }, A(e.label), 11, R2)) : V("", !0),
      r("div", O2, [
        r("input", Je(g.value, {
          id: l.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [F(fe), x.value ? F(we) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": x.value ? "true" : void 0,
          "aria-describedby": e.errorText ? d.value : void 0,
          onInput: p,
          onChange: b,
          onBlur: y
        }), null, 16, V2),
        r("button", {
          type: "button",
          tabindex: "-1",
          onClick: v[0] || (v[0] = (k) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (_(), w("svg", j2, [...v[2] || (v[2] = [
            r("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (_(), w("svg", N2, [...v[1] || (v[1] = [
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
        ], 8, z2)
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: d.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, H2)) : V("", !0)
    ]));
  }
}), Y2 = { class: "font-sans" }, K2 = ["for"], q2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], U2 = ["id"], X2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-textarea-${Ht()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue,
      set: (d) => a("update:modelValue", d)
    });
    return (d, c) => (_(), w("div", Y2, [
      e.label ? (_(), w("label", {
        key: 0,
        for: o.value,
        class: W(F(te))
      }, A(e.label), 11, K2)) : V("", !0),
      ae(r("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: W([F(T2), e.invalid ? F(we) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, q2), [
        [Ge, l.value]
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, U2)) : V("", !0)
    ]));
  }
}), G2 = { class: "font-sans" }, Z2 = ["for"], Q2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], J2 = ["for"], tw = ["title"], ew = ["aria-label"], nw = ["id"], aw = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-file-${Ht()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = et(null), d = D(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const x = h.target.files?.[0] ?? null;
      a("update:modelValue", x);
    }
    function u() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, m) => (_(), w("div", G2, [
      e.label ? (_(), w("label", {
        key: 0,
        for: o.value,
        class: W(F(te))
      }, A(e.label), 11, Z2)) : V("", !0),
      r("div", {
        class: W([
          F(fe),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? F(we) : "",
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
        }, null, 40, Q2),
        r("label", {
          for: o.value,
          class: W(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          R(F(ip), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          yt(" " + A(e.chooseLabel), 1)
        ], 10, J2),
        r("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: d.value || void 0
        }, A(d.value), 9, tw),
        e.modelValue && !e.disabled ? (_(), w("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          R(F(Wi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, ew)) : V("", !0)
      ], 2),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, nw)) : V("", !0)
    ]));
  }
}), sw = { class: "font-sans" }, ow = ["for"], iw = { class: "relative" }, lw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], rw = ["id"], cw = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-datetime-${Ht()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => n.modelValue ?? "");
    function d(c) {
      const u = c.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (c, u) => (_(), w("div", sw, [
      e.label ? (_(), w("label", {
        key: 0,
        for: o.value,
        class: W(F(te))
      }, A(e.label), 11, ow)) : V("", !0),
      r("div", iw, [
        R(F(ji), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: W([
            F(fe),
            "pl-10",
            e.invalid ? F(we) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: d
        }, null, 42, lw)
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, rw)) : V("", !0)
    ]));
  }
}), dw = { class: "font-sans" }, uw = ["for"], hw = { class: "relative" }, fw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], gw = ["id"], pw = /* @__PURE__ */ Z({
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
      const x = Number(m[1]), p = Number(m[2]);
      return !Number.isInteger(x) || !Number.isInteger(p) || x < 0 || x > 23 || p < 0 || p > 59 ? null : `${String(x).padStart(2, "0")}:${String(p).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Ht()}`, l = D(() => s.id ?? i), d = D(() => `${l.value}-err`), c = D(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function u(h) {
      const m = h.target.value;
      o("update:modelValue", a(m));
    }
    return (h, m) => (_(), w("div", dw, [
      e.label ? (_(), w("label", {
        key: 0,
        for: l.value,
        class: W(F(te))
      }, A(e.label), 11, uw)) : V("", !0),
      r("div", hw, [
        R(F(dp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: W([
            F(fe),
            "pl-10",
            e.invalid ? F(we) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? d.value : void 0,
          onInput: u
        }, null, 42, fw)
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: d.value,
        class: W(F(ge)),
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
}, Sw = ["id"], Dw = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-range-${Ht()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
      const x = [];
      return n.errorText && x.push(i.value), x.length ? x.join(" ") : void 0;
    }), d = D(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = D(() => !!(n.captionMin || n.captionMax)), u = D(() => {
      const { min: x, max: p, modelValue: b } = n;
      if (p === x) return 0;
      const y = (b - x) / (p - x);
      return Math.min(100, Math.max(0, y * 100));
    }), h = D(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function m(x) {
      const p = Number(x.target.value);
      a("update:modelValue", Number.isNaN(p) ? n.min : p);
    }
    return (x, p) => (_(), w("div", mw, [
      e.label ? (_(), w("label", {
        key: 0,
        for: o.value,
        class: W(F(te))
      }, A(e.label), 11, bw)) : V("", !0),
      r("div", {
        class: W(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (_(), w("p", vw, A(e.captionMax), 1)) : V("", !0),
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
            onInput: m
          }, null, 42, yw)
        ], 6),
        e.orientation === "horizontal" && d.value ? (_(), w("p", _w, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (_(), w("div", xw, [
          r("span", kw, A(e.captionMin), 1),
          r("span", ww, A(e.caption), 1),
          r("span", Cw, A(e.captionMax), 1)
        ])) : V("", !0),
        e.orientation === "vertical" && e.captionMin ? (_(), w("p", $w, A(e.captionMin), 1)) : V("", !0),
        e.orientation === "vertical" && e.caption ? (_(), w("p", Mw, A(e.caption), 1)) : V("", !0)
      ], 2),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, Sw)) : V("", !0)
    ]));
  }
}), Aw = /* @__PURE__ */ at(Dw, [["__scopeId", "data-v-a1343418"]]), Tw = { class: "font-sans" }, Bw = ["for"], Lw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Fw = ["id"], Iw = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-input-number-${Ht()}`, o = D(() => n.id ?? s), i = D(() => `${o.value}-err`), l = D(() => {
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
      const m = Number(h);
      a("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (u, h) => (_(), w("div", Tw, [
      e.label ? (_(), w("label", {
        key: 0,
        for: o.value,
        class: W(F(te))
      }, A(e.label), 11, Bw)) : V("", !0),
      r("input", {
        id: o.value,
        value: d.value,
        type: "number",
        onInput: c,
        class: W([
          F(fe),
          e.invalid ? F(we) : "",
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
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, Fw)) : V("", !0)
    ]));
  }
}), Pw = { class: "font-sans" }, Ew = ["for"], Rw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Ow = ["disabled"], Vw = ["id"], zw = "#3b82f6", Nw = "#aabbcc", jw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Hw = /* @__PURE__ */ Z({
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
      const b = p.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (y) return `#${y[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (g) {
        const [f, v, k] = g[1].split("");
        return `#${f}${f}${v}${v}${k}${k}`.toLowerCase();
      }
      return null;
    }
    function a(p) {
      return n(p) ?? zw;
    }
    const s = e, o = t, i = `kiut-input-color-${Ht()}`, l = D(() => s.id ?? i), d = D(() => `${l.value}-err`), c = D(() => a(s.modelValue)), u = et(c.value), h = et(!1);
    Ft(c, (p) => {
      h.value || (u.value = p);
    });
    function m(p) {
      const b = p.target, y = n(b.value);
      y && o("update:modelValue", y);
    }
    function x() {
      h.value = !1;
      const p = n(u.value);
      p ? (u.value = p, o("update:modelValue", p)) : u.value = c.value;
    }
    return Ft(u, (p) => {
      if (!h.value) return;
      const b = n(p);
      b && o("update:modelValue", b);
    }), (p, b) => (_(), w("div", Pw, [
      e.label ? (_(), w("label", {
        key: 0,
        for: l.value,
        class: W(F(te))
      }, A(e.label), 11, Ew)) : V("", !0),
      r("div", {
        class: W([
          jw,
          e.invalid ? F(we) : "",
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
          onInput: m
        }, null, 40, Rw),
        e.showHexInput ? ae((_(), w("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (y) => u.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Nw,
          onFocus: b[1] || (b[1] = (y) => h.value = !0),
          onBlur: x
        }, null, 40, Ow)), [
          [Ge, u.value]
        ]) : V("", !0)
      ], 2),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: d.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, Vw)) : V("", !0)
    ]));
  }
});
function el(e, t) {
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
const Ww = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Yw = ["aria-selected", "onClick", "onMouseenter"], Kw = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, qw = { class: "min-w-0 flex-1" }, nl = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-select-${Ht()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, d = et(null), c = et(null), u = et(null), h = et(!1), m = et(0), x = et({});
    function p() {
      const B = c.value;
      if (!B) return;
      const I = B.getBoundingClientRect();
      x.value = {
        top: `${I.bottom - 3}px`,
        left: `${I.left}px`,
        width: `${I.width}px`
      };
    }
    const b = D(() => n.options.filter((B) => !B.disabled)), y = D(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), g = D(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((I) => I.value === n.modelValue)?.label ?? String(n.modelValue));
    function f(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function v(B) {
      return n.modelValue === B.value;
    }
    function k(B, I) {
      const P = v(B), N = m.value === I;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        P ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !P && N ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M(B) {
      a("update:modelValue", B.value), h.value = !1;
    }
    function S() {
      n.disabled || (h.value = !h.value);
    }
    function C(B) {
      if (B.stopPropagation(), !n.disabled && (S(), h.value)) {
        p();
        const I = Math.max(
          0,
          b.value.findIndex((P) => P.value === n.modelValue)
        );
        m.value = I, Ot(() => u.value?.focus());
      }
    }
    function $(B) {
      if (!h.value) return;
      const I = B.target, P = d.value, N = u.value;
      P && !P.contains(I) && (!N || !N.contains(I)) && (h.value = !1);
    }
    function L(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, p(), m.value = Math.max(
        0,
        b.value.findIndex((I) => I.value === n.modelValue)
      ), Ot(() => u.value?.focus())));
    }
    function T(B) {
      const I = b.value;
      if (I.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), h.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), m.value = Math.min(m.value + 1, I.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), m.value = Math.max(m.value - 1, 0);
          return;
        }
        if (B.key === "Enter") {
          B.preventDefault();
          const P = I[m.value];
          P && M(P);
        }
      }
    }
    return Qt(() => {
      document.addEventListener("click", $);
    }), he(() => {
      document.removeEventListener("click", $);
    }), (B, I) => (_(), w("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (_(), w("label", {
        key: 0,
        id: o,
        class: W(F(te))
      }, A(e.label), 3)) : V("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: W([
          F(fe),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: C,
        onKeydown: L
      }, [
        r("span", {
          class: W([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(g.value), 3),
        R(F(Hi), {
          class: W(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Ww),
      (_(), tt(Ra, { to: "body" }, [
        ae(r("ul", {
          id: l,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: gt(x.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: ue(T, ["stop"])
        }, [
          (_(!0), w(K, null, nt(b.value, (P, N) => (_(), w("li", {
            key: f(P),
            role: "option",
            "aria-selected": v(P),
            class: W(k(P, N)),
            onClick: ue((Y) => M(P), ["stop"]),
            onMouseenter: (Y) => m.value = N
          }, [
            e.showOptionCheck ? (_(), w("span", Kw, [
              v(P) ? (_(), tt(F(el), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : V("", !0)
            ])) : V("", !0),
            r("span", qw, A(P.label), 1)
          ], 42, Yw))), 128))
        ], 36), [
          [xn, h.value]
        ])
      ]))
    ], 512));
  }
}), Uw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Xw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Gw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Zw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, Qw = { class: "truncate" }, Jw = ["aria-selected", "onClick", "onMouseenter"], t5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, e5 = { class: "min-w-0 flex-1" }, n5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-multiselect-${Ht()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, d = et(null), c = et(null), u = et(!1), h = et(0), m = D(() => n.options.filter((T) => !T.disabled)), x = D(() => new Set(n.modelValue ?? [])), p = D(
      () => n.options.filter((T) => x.value.has(T.value))
    ), b = D(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = p.value.length;
      return B === 0 ? T : `${T}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function y(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function g(T) {
      return x.value.has(T.value);
    }
    function f(T, B) {
      const I = g(T), P = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        I ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !I && P ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function v(T) {
      const B = [...n.modelValue ?? []], I = B.indexOf(T.value);
      I >= 0 ? B.splice(I, 1) : B.push(T.value), a("update:modelValue", B);
    }
    function k() {
      const T = m.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = x.value, I = T.findIndex((P) => B.has(P.value));
      h.value = I >= 0 ? I : 0;
    }
    function M() {
      n.disabled || (u.value = !u.value);
    }
    function S(T) {
      T.stopPropagation(), !n.disabled && (M(), u.value && (k(), Ot(() => c.value?.focus())));
    }
    function C(T) {
      if (!u.value) return;
      const B = d.value;
      B && !B.contains(T.target) && (u.value = !1);
    }
    function $(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), u.value || (u.value = !0, k(), Ot(() => c.value?.focus())));
    }
    function L(T) {
      const B = m.value;
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
          const I = B[h.value];
          I && v(I);
        }
      }
    }
    return Qt(() => {
      document.addEventListener("click", C);
    }), he(() => {
      document.removeEventListener("click", C);
    }), (T, B) => (_(), w("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (_(), w("label", {
        key: 0,
        id: o,
        class: W(F(te))
      }, A(e.label), 3)) : V("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: W([
          F(fe),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onClick: S,
        onKeydown: $
      }, [
        r("div", Xw, [
          p.value.length === 0 ? (_(), w("span", Gw, A(e.placeholder), 1)) : (_(), w("div", Zw, [
            (_(!0), w(K, null, nt(p.value, (I) => (_(), w("span", {
              key: y(I),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              r("span", Qw, A(I.label), 1)
            ]))), 128))
          ]))
        ]),
        R(F(Hi), {
          class: W(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Uw),
      ae(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ue(L, ["stop"])
      }, [
        (_(!0), w(K, null, nt(m.value, (I, P) => (_(), w("li", {
          key: y(I),
          role: "option",
          "aria-selected": g(I),
          class: W(f(I, P)),
          onClick: ue((N) => v(I), ["stop"]),
          onMouseenter: (N) => h.value = P
        }, [
          r("span", t5, [
            g(I) ? (_(), tt(F(el), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : V("", !0)
          ]),
          r("span", e5, A(I.label), 1)
        ], 42, Jw))), 128))
      ], 544), [
        [xn, u.value]
      ])
    ], 512));
  }
}), a5 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], s5 = { class: "sr-only" }, o5 = /* @__PURE__ */ Z({
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
    return (o, i) => (_(), w("button", {
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
      onClick: s,
      onKeydown: [
        Xn(ue(s, ["prevent", "stop"]), ["space"]),
        Xn(ue(s, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: W(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", s5, A(e.ariaLabel), 1)
    ], 42, a5));
  }
}), i5 = { class: "font-sans" }, l5 = ["for"], r5 = { class: "flex gap-2" }, c5 = { class: "w-[7.5rem] shrink-0" }, d5 = { class: "min-w-0 flex-1" }, u5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], h5 = ["id"], f5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `kiut-phone-${Ht()}`, o = D(() => n.id ?? `${s}-num`), i = D(() => `${o.value}-err`), l = D({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), d = D({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, u) => (_(), w("div", i5, [
      e.label ? (_(), w("label", {
        key: 0,
        for: o.value,
        class: W(F(te))
      }, A(e.label), 11, l5)) : V("", !0),
      r("div", r5, [
        r("div", c5, [
          R(nl, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        r("div", d5, [
          ae(r("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => d.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: W([F(fe), e.invalid ? F(we) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, u5), [
            [Ge, d.value]
          ])
        ])
      ]),
      e.errorText ? (_(), w("p", {
        key: 1,
        id: i.value,
        class: W(F(ge)),
        role: "alert"
      }, A(e.errorText), 11, h5)) : V("", !0)
    ]));
  }
}), g5 = ["role", "aria-label"], p5 = { class: "flex flex-wrap gap-2" }, m5 = ["aria-checked", "role", "onClick"], b5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, v5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, y5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, _5 = /* @__PURE__ */ Z({
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
    return (d, c) => (_(), w("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", p5, [
        (_(!0), w(K, null, nt(e.items, (u) => (_(), w("button", {
          key: u.value,
          type: "button",
          class: W(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(u)
        }, [
          r("span", b5, [
            o(u) ? (_(), w("span", v5)) : V("", !0)
          ]),
          u.dotColor ? (_(), w("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: gt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          r("span", y5, A(u.label), 1)
        ], 10, m5))), 128))
      ])
    ], 8, g5));
  }
}), x5 = ["aria-label"], k5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], w5 = { class: "truncate px-3 py-2 text-sm font-medium" }, C5 = /* @__PURE__ */ Z({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Ht()}`, o = (b) => `${s}-seg-${b}`, i = et([]);
    function l(b, y) {
      b instanceof HTMLButtonElement ? i.value[y] = b : i.value[y] = null;
    }
    function d(b) {
      return b.value === n.modelValue;
    }
    function c(b) {
      const y = d(b), g = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return b.disabled ? `${g} cursor-not-allowed opacity-40` : y ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(b) {
      b.disabled || b.value !== n.modelValue && a("update:modelValue", b.value);
    }
    function h(b, y, g) {
      u(b), Ot(() => i.value[y]?.focus());
    }
    const m = D(
      () => n.items.map((b, y) => b.disabled ? -1 : y).filter((b) => b >= 0)
    );
    function x(b, y) {
      const g = n.items.length;
      if (g === 0) return 0;
      let f = b;
      for (let v = 0; v < g; v++)
        if (f = (f + y + g) % g, !n.items[f]?.disabled) return f;
      return b;
    }
    function p(b, y) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const g = x(y, 1), f = n.items[g];
        f && u(f), Ot(() => i.value[g]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const g = x(y, -1), f = n.items[g];
        f && u(f), Ot(() => i.value[g]?.focus());
      } else if (b.key === "Home") {
        b.preventDefault();
        const g = m.value[0];
        if (g !== void 0) {
          const f = n.items[g];
          f && u(f), Ot(() => i.value[g]?.focus());
        }
      } else if (b.key === "End") {
        b.preventDefault();
        const g = m.value[m.value.length - 1];
        if (g !== void 0) {
          const f = n.items[g];
          f && u(f), Ot(() => i.value[g]?.focus());
        }
      }
    }
    return (b, y) => (_(), w("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (_(!0), w(K, null, nt(e.items, (g, f) => (_(), w("button", {
        id: o(g.value),
        key: g.value,
        ref_for: !0,
        ref: (v) => l(v, f),
        type: "button",
        role: "tab",
        "aria-selected": d(g),
        "aria-disabled": g.disabled === !0,
        tabindex: d(g) ? 0 : -1,
        class: W(c(g)),
        onClick: (v) => h(g, f),
        onKeydown: (v) => p(v, f)
      }, [
        r("span", w5, A(g.label), 1)
      ], 42, k5))), 128))
    ], 8, x5));
  }
});
function Oe(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function hn(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function $e(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function $a(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Ro(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function ca(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Oo(e, t) {
  return ca(e, t) === 0;
}
function Ma(e, t) {
  return ca(e, t) < 0;
}
function $5(e, t) {
  return ca(e, t) >= 0;
}
function M5(e, t) {
  return ca(e, t) <= 0;
}
function S5(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const D5 = [
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
], A5 = [
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
function Vo(e) {
  return `${D5[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function zo(e) {
  return `${A5[e.getMonth()]} ${e.getFullYear()}`;
}
const T5 = ["aria-expanded", "aria-labelledby", "aria-label"], B5 = ["onKeydown"], L5 = { class: "mb-4 flex items-center justify-between gap-2" }, F5 = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, I5 = { class: "min-w-0 truncate" }, P5 = { class: "min-w-0 truncate" }, E5 = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, R5 = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, O5 = { class: "grid grid-cols-7 gap-y-1" }, V5 = ["disabled", "onClick"], z5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `${`kiut-drp-${Ht()}`}-lbl`, i = et(null), l = et(null), d = et(!1), c = et(null), u = et($a(/* @__PURE__ */ new Date())), h = D(() => {
      const $ = $a(u.value);
      return [$, Ro($, 1)];
    }), m = D(() => n.ariaLabel ?? n.placeholder), x = D(
      () => n.panelAlign === "end" ? "right-0 left-auto" : "left-0 right-auto"
    ), p = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], b = D(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const $ = Oe(n.modelValue.start), L = Oe(n.modelValue.end);
      return `${Vo($)} – ${Vo(L)}`;
    });
    function y($, L) {
      return $.getMonth() === L.getMonth() && $.getFullYear() === L.getFullYear();
    }
    function g($) {
      const L = $e($);
      if (n.minDate) {
        const T = $e(Oe(n.minDate));
        if (Ma(L, T)) return !0;
      }
      if (n.maxDate) {
        const T = $e(Oe(n.maxDate));
        if (Ma(T, L)) return !0;
      }
      return !1;
    }
    function f($, L) {
      const T = y(L, $), B = n.modelValue.start ? $e(Oe(n.modelValue.start)) : null, I = n.modelValue.end ? $e(Oe(n.modelValue.end)) : null, P = $e(L), N = T ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!B || !I)
        return `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const Y = $5(P, B) && M5(P, I), H = Oo(P, B), Q = Oo(P, I);
      return H || Q ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : Y ? `${N} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function v($) {
      if (g($)) return;
      const L = $e($);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: hn(L), end: hn(L) });
        return;
      }
      let B = $e(c.value), I = new Date(L);
      Ma(I, B) && ([B, I] = [I, B]), a("update:modelValue", { start: hn(B), end: hn(I) }), c.value = null, d.value = !1;
    }
    function k($) {
      u.value = Ro(u.value, $);
    }
    function M() {
      d.value = !1;
    }
    function S($) {
      if ($?.stopPropagation(), !d.value) {
        if (d.value = !0, c.value = null, n.modelValue.start)
          try {
            u.value = $a(Oe(n.modelValue.start));
          } catch {
          }
        Ot(() => l.value?.focus());
      }
    }
    function C($) {
      if (!d.value) return;
      const L = i.value;
      L && !L.contains($.target) && (d.value = !1);
    }
    return Ft(d, ($) => {
      $ && (c.value = null);
    }), Qt(() => {
      document.addEventListener("click", C);
    }), he(() => {
      document.removeEventListener("click", C);
    }), ($, L) => (_(), w("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (_(), w("label", {
        key: 0,
        id: o,
        class: W(F(te))
      }, A(e.label), 3)) : V("", !0),
      r("button", {
        type: "button",
        class: W([F(fe), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": d.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onFocus: S,
        onClick: S
      }, [
        R(F(ji), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: W([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(b.value), 3)
      ], 42, T5),
      ae(r("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: W([
          x.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Xn(ue(M, ["stop"]), ["escape"])
      }, [
        r("div", L5, [
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: L[0] || (L[0] = (T) => k(-1))
          }, [
            R(F(rp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          r("div", F5, [
            r("span", I5, A(F(zo)(h.value[0])), 1),
            r("span", P5, A(F(zo)(h.value[1])), 1)
          ]),
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: L[1] || (L[1] = (T) => k(1))
          }, [
            R(F(cp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        r("div", E5, [
          (_(!0), w(K, null, nt(h.value, (T) => (_(), w("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            r("div", R5, [
              (_(), w(K, null, nt(p, (B) => r("span", { key: B }, A(B), 1)), 64))
            ]),
            r("div", O5, [
              (_(!0), w(K, null, nt(F(S5)(T), (B) => (_(), w("button", {
                key: F(hn)(B),
                type: "button",
                disabled: g(B),
                class: W(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", f(T, B)]),
                onClick: (I) => v(B)
              }, A(B.getDate()), 11, V5))), 128))
            ])
          ]))), 128))
        ])
      ], 42, B5), [
        [xn, d.value]
      ])
    ], 512));
  }
}), N5 = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, j5 = ["type", "disabled", "aria-label"], H5 = {
  key: 1,
  class: "min-w-0 truncate"
}, W5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, Y5 = ["type", "disabled", "aria-label"], K5 = {
  key: 1,
  class: "min-w-0 truncate"
}, Un = /* @__PURE__ */ Z({
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
    const t = e, n = aa(), a = D(() => !!t.tooltip?.trim()), s = D(() => t.variant === "action"), o = D(() => !s.value), i = D(() => {
      const u = n["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = D(() => {
      const u = n.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), d = D(() => {
      const { class: u, type: h, "aria-label": m, ...x } = n;
      return x;
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
    return (u, h) => a.value ? (_(), w("span", N5, [
      r("button", Je({
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
        ], 2)) : V("", !0),
        o.value ? (_(), w("span", H5, [
          $t(u.$slots, "default")
        ])) : V("", !0)
      ], 16, j5),
      r("span", W5, A(e.tooltip), 1)
    ])) : (_(), w("button", Je({
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
      ], 2)) : V("", !0),
      o.value ? (_(), w("span", K5, [
        $t(u.$slots, "default")
      ])) : V("", !0)
    ], 16, Y5));
  }
}), q5 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, U5 = { class: "min-w-0 flex-1 space-y-1" }, X5 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, G5 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, Z5 = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, Q5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `${`kiut-modal-${Ht()}`}-title`, i = et(null);
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
    ), Qt(() => {
      document.addEventListener("keydown", c);
    }), he(() => {
      document.removeEventListener("keydown", c);
    }), (u, h) => (_(), tt(Ra, { to: "body" }, [
      R(mn, { name: "kiut-modal" }, {
        default: E(() => [
          e.modelValue ? (_(), w("div", q5, [
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
              onClick: h[0] || (h[0] = ue(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: W(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                r("div", U5, [
                  r("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (_(), w("p", X5, A(e.subtitle), 1)) : V("", !0)
                ]),
                R(Un, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: E(() => [
                    R(F(Wi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              r("div", G5, [
                $t(u.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", Z5, [
                R(Un, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: E(() => [
                    yt(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                R(Un, {
                  variant: "primary",
                  type: "button",
                  onClick: d
                }, {
                  default: E(() => [
                    yt(A(e.confirmLabel), 1)
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
}), J5 = /* @__PURE__ */ at(Q5, [["__scopeId", "data-v-4ed7bb14"]]), tC = { class: "text-left font-['Inter',system-ui,sans-serif]" }, eC = {
  key: 0,
  class: ""
}, nC = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, aC = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, sC = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, oC = /* @__PURE__ */ Z({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Ea(), n = D(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (_(), w("section", tC, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (_(), w("header", eC, [
        a.$slots.description ? (_(), w("div", nC, [
          $t(a.$slots, "description")
        ])) : V("", !0),
        a.$slots.filters || a.$slots.actions ? (_(), w("div", {
          key: 1,
          class: W(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (_(), w("div", aC, [
            $t(a.$slots, "filters")
          ])) : V("", !0),
          a.$slots.actions ? (_(), w("div", sC, [
            $t(a.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0)
      ])) : V("", !0),
      a.$slots.content || a.$slots.default ? (_(), w("div", {
        key: 1,
        class: W({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        $t(a.$slots, "content", {}, () => [
          $t(a.$slots, "default")
        ])
      ], 2)) : V("", !0)
    ]));
  }
}), iC = { class: "flex flex-1 min-h-0" }, lC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, rC = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, cC = ["aria-current", "data-has-active", "title", "onClick"], dC = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, uC = { class: "px-4 py-4 shrink-0" }, hC = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, fC = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, gC = ["data-nav-id", "aria-current", "onClick"], pC = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, mC = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, bC = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, vC = ["data-nav-id", "aria-current", "onClick"], yC = { class: "truncate text-[15px]" }, _C = ["aria-current", "data-has-active", "onClick"], xC = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, kC = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, wC = /* @__PURE__ */ Z({
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
    const n = et(!1), a = e, s = t, o = aa(), { class: i, ...l } = o, d = et(!1);
    function c() {
      typeof window > "u" || (d.value = window.innerWidth < a.mobileBreakpoint);
    }
    Qt(() => {
      c(), window.addEventListener("resize", c);
    }), he(() => {
      window.removeEventListener("resize", c);
    });
    const u = D(() => {
      const g = a.sections.find((f) => f.id === a.selectedSectionId);
      return g?.items?.length ? g : null;
    });
    function h(g) {
      return a.activePath ? a.activePath === g.path || a.activePath.startsWith(g.path + "/") : !1;
    }
    function m(g) {
      return g.items?.length ? g.items.some(h) : !a.activePath || !g.path ? !1 : a.activePath === g.path || a.activePath.startsWith(g.path + "/");
    }
    function x(g) {
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
    function p(g, f) {
      s("navigate", { section: g, item: f });
    }
    function b() {
      s("update:selectedSectionId", null);
    }
    function y(g, f) {
      p(g, f), b();
    }
    return (g, f) => d.value ? (_(), w("div", Je({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      R(mn, { name: "ksn-overlay" }, {
        default: E(() => [
          u.value ? (_(), w("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : V("", !0)
        ]),
        _: 1
      }),
      R(mn, { name: "ksn-sheet" }, {
        default: E(() => [
          u.value ? (_(), w("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: gt({ paddingBottom: a.mobileBarHeight })
          }, [
            f[3] || (f[3] = r("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              r("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            r("div", pC, [
              r("p", mC, A(u.value.label), 1),
              r("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
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
            r("nav", bC, [
              (_(!0), w(K, null, nt(u.value.items, (v) => (_(), w("button", {
                key: v.id,
                type: "button",
                "data-nav-id": v.id,
                "aria-current": h(v) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (k) => y(u.value, v)
              }, [
                v.icon ? (_(), tt(Xe(v.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : V("", !0),
                r("span", yC, A(v.label), 1)
              ], 8, vC))), 128))
            ])
          ], 4)) : V("", !0)
        ]),
        _: 1
      }),
      r("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: gt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (_(!0), w(K, null, nt(e.sections, (v) => (_(), w("button", {
          key: v.id,
          type: "button",
          "aria-current": e.selectedSectionId === v.id ? "true" : void 0,
          "data-has-active": m(v) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (k) => x(v)
        }, [
          e.selectedSectionId === v.id || m(v) ? (_(), w("span", xC)) : V("", !0),
          v.icon ? (_(), tt(Xe(v.icon), {
            key: 1,
            class: "shrink-0",
            style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : V("", !0),
          r("span", kC, A(v.label), 1)
        ], 8, _C))), 128))
      ], 4)
    ], 16)) : (_(), w("aside", Je({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", iC, [
        r("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: gt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: f[0] || (f[0] = (v) => n.value = !0),
          onMouseleave: f[1] || (f[1] = (v) => n.value = !1)
        }, [
          g.$slots.logo ? (_(), w("div", lC, [
            $t(g.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : V("", !0),
          r("nav", rC, [
            (_(!0), w(K, null, nt(e.sections, (v) => (_(), w("button", {
              key: v.id,
              type: "button",
              "aria-current": e.selectedSectionId === v.id ? "true" : void 0,
              "data-has-active": m(v) ? "true" : void 0,
              title: v.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (k) => x(v)
            }, [
              v.icon ? (_(), tt(Xe(v.icon), {
                key: 0,
                class: "shrink-0",
                style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : V("", !0),
              r("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: gt({ fontSize: e.primaryFontSize })
              }, A(v.label), 5)
            ], 8, cC))), 128))
          ]),
          g.$slots.footer ? (_(), w("div", dC, [
            $t(g.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : V("", !0)
        ], 36),
        R(mn, { name: "ksn-sub" }, {
          default: E(() => [
            u.value ? (_(), w("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: gt({ width: e.secondaryWidth })
            }, [
              r("div", uC, [
                r("p", hC, A(u.value.label), 1)
              ]),
              r("nav", fC, [
                (_(!0), w(K, null, nt(u.value.items, (v) => (_(), w("button", {
                  key: v.id,
                  type: "button",
                  "data-nav-id": v.id,
                  "aria-current": h(v) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (k) => p(u.value, v)
                }, [
                  v.icon ? (_(), tt(Xe(v.icon), {
                    key: 0,
                    style: gt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : V("", !0),
                  r("span", {
                    class: "truncate",
                    style: gt({ fontSize: e.secondaryFontSize })
                  }, A(v.label), 5)
                ], 8, gC))), 128))
              ])
            ], 4)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), CC = /* @__PURE__ */ at(wC, [["__scopeId", "data-v-e0ccb96c"]]), PC = {
  install(e) {
    e.component("KiutChartBar", _e), e.component("KiutChartLine", ke), e.component("KiutPieChart", ra), e.component("KiutBoxplotChart", Jh), e.component("KiutCandlestickChart", Vi), e.component("KiutHistogramChart", zi), e.component("KiutSankeyChart", Ie), e.component("KiutAgentsPerDay", Tp), e.component("KiutBookingManager", im), e.component("KiutCheckin", Yi), e.component("KiutCheckinContainer", b0), e.component("KiutCheckinMetrics", Om), e.component("KiutCheckinSegments", qi), e.component("KiutDisruption", E0), e.component("KiutFAQ", H0), e.component("KiutMessagesPerAgent", J0), e.component("KiutRecordLocator", Ki), e.component("KiutSalesByChannel", Ui), e.component("KiutSeller", Xi), e.component("KiutSellerContainer", Nb), e.component("KiutTopAgents", Xb), e.component("KiutPaymentMethod", bv), e.component("KiutAgentHumanConversations", my), e.component("KiutChannelMetrics", My), e.component("KiutTriageCombinations", Ny), e.component("KiutSelectLanguage", Uy), e.component("KiutGuardrails", o1), e.component("KiutDisruptionNotifier", M1), e.component("KiutTotalConversationsCard", L1), e.component("KiutCsatP95Card", O1), e.component("KiutCSATContainer", v_), e.component("KiutAiGeneratedRevenueCard", M_), e.component("KiutHumanEscalations", z_), e.component("KiutHumanEscalationsCard", K_), e.component("KiutNpsDailyMetrics", Qi), e.component("KiutNpsMetrics", Ji), e.component("KiutNpsOverviewMetrics", Zi), e.component("KiutAWSCost", nx), e.component("KiutCostUsage", fx), e.component("KiutTokenUsage", Cx), e.component("KiutConversationCount", Px), e.component("KiutTopAgentsAnalysis", Ux), e.component("KiutTopAgentsPie", sk), e.component("KiutDailyCostTrends", gk), e.component("KiutModelUsage", Ak), e.component("KiutMessageRoles", Vk), e.component("KiutCostPerConversations", Gk), e.component("Tabs", tl), e.component("Table", Gi), e.component("Filters", A2), e.component("InputText", P2), e.component("InputPassword", W2), e.component("InputTextarea", X2), e.component("InputFile", aw), e.component("InputDateTime", cw), e.component("InputTime", pw), e.component("InputRange", Aw), e.component("InputNumber", Iw), e.component("InputColorPicker", Hw), e.component("Select", nl), e.component("MultiSelect", n5), e.component("Toggle", o5), e.component("InputPhone", f5), e.component("SelectablePills", _5), e.component("SegmentedControl", C5), e.component("DateRangePicker", z5), e.component("Tag", jt), e.component("Button", Un), e.component("Modal", J5), e.component("Section", oC), e.component("KiutAppShellNavigation", CC);
  }
};
export {
  nx as AWSCost,
  my as AgentHumanConversations,
  Tp as AgentsPerDay,
  M_ as AiGeneratedRevenueCard,
  CC as AppShellNavigation,
  im as BookingManager,
  Jh as BoxplotChart,
  Un as Button,
  v_ as CSATContainer,
  Vi as CandlestickChart,
  My as ChannelMetrics,
  _e as ChartBar,
  ke as ChartLine,
  Yi as Checkin,
  b0 as CheckinContainer,
  Om as CheckinMetrics,
  qi as CheckinSegments,
  Px as ConversationCount,
  Gk as CostPerConversations,
  fx as CostUsage,
  O1 as CsatP95Card,
  gk as DailyCostTrends,
  z5 as DateRangePicker,
  E0 as Disruption,
  M1 as DisruptionNotifier,
  H0 as FAQ,
  A2 as Filters,
  o1 as Guardrails,
  zi as HistogramChart,
  z_ as HumanEscalations,
  K_ as HumanEscalationsCard,
  Hw as InputColorPicker,
  cw as InputDateTime,
  aw as InputFile,
  Iw as InputNumber,
  W2 as InputPassword,
  f5 as InputPhone,
  Aw as InputRange,
  P2 as InputText,
  X2 as InputTextarea,
  pw as InputTime,
  PC as KiutUIPlugin,
  Vk as MessageRoles,
  J0 as MessagesPerAgent,
  J5 as Modal,
  Ak as ModelUsage,
  n5 as MultiSelect,
  Qi as NpsDailyMetrics,
  Ji as NpsMetrics,
  Zi as NpsOverviewMetrics,
  bv as PaymentMethod,
  ra as PieChart,
  Ki as RecordLocator,
  Ui as SalesByChannel,
  Ie as SankeyChart,
  oC as Section,
  C5 as SegmentedControl,
  nl as Select,
  Uy as SelectLanguage,
  _5 as SelectablePills,
  Xi as Seller,
  Nb as SellerContainer,
  Gi as Table,
  tl as Tabs,
  jt as Tag,
  o5 as Toggle,
  Cx as TokenUsage,
  Xb as TopAgents,
  Ux as TopAgentsAnalysis,
  sk as TopAgentsPie,
  L1 as TotalConversationsCard,
  Ny as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
