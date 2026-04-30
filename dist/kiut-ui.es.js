import { defineComponent as et, shallowRef as Vo, h as Mn, ref as at, onMounted as ne, onUnmounted as Ie, watch as It, toRaw as Sn, nextTick as At, version as or, isProxy as zo, computed as D, toRef as ut, openBlock as v, createElementBlock as b, createVNode as U, unref as P, normalizeStyle as vt, createElementVNode as d, toDisplayString as C, createCommentVNode as V, Fragment as Q, renderList as st, onBeforeUnmount as No, createStaticVNode as nt, withDirectives as Kt, vShow as ra, normalizeClass as q, createBlock as ft, renderSlot as Ot, createTextVNode as wt, withCtx as Y, resolveDynamicComponent as la, Transition as En, useSlots as Wo, Teleport as On, withModifiers as ae, withKeys as Pa, vModelText as Le, useAttrs as Ho, mergeProps as Dn } from "vue";
import * as rs from "echarts/core";
import { TooltipComponent as ir, TitleComponent as rr } from "echarts/components";
import { SankeyChart as lr } from "echarts/charts";
import { CanvasRenderer as cr } from "echarts/renderers";
import Bt from "moment";
function ma(e) {
  return e + 0.5 | 0;
}
const me = (e, t, a) => Math.max(Math.min(e, a), t);
function ta(e) {
  return me(ma(e * 2.55), 0, 255);
}
function _e(e) {
  return me(ma(e * 255), 0, 255);
}
function re(e) {
  return me(ma(e / 2.55) / 100, 0, 1);
}
function ls(e) {
  return me(ma(e * 100), 0, 100);
}
const Yt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, An = [..."0123456789ABCDEF"], dr = (e) => An[e & 15], ur = (e) => An[(e & 240) >> 4] + An[e & 15], ba = (e) => (e & 240) >> 4 === (e & 15), hr = (e) => ba(e.r) && ba(e.g) && ba(e.b) && ba(e.a);
function fr(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & Yt[e[1]] * 17,
    g: 255 & Yt[e[2]] * 17,
    b: 255 & Yt[e[3]] * 17,
    a: t === 5 ? Yt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: Yt[e[1]] << 4 | Yt[e[2]],
    g: Yt[e[3]] << 4 | Yt[e[4]],
    b: Yt[e[5]] << 4 | Yt[e[6]],
    a: t === 9 ? Yt[e[7]] << 4 | Yt[e[8]] : 255
  })), a;
}
const gr = (e, t) => e < 255 ? t(e) : "";
function pr(e) {
  var t = hr(e) ? dr : ur;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + gr(e.a, t) : void 0;
}
const vr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function jo(e, t, a) {
  const n = t * Math.min(a, 1 - a), s = (o, i = (o + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function mr(e, t, a) {
  const n = (s, o = (s + e / 60) % 6) => a - a * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [n(5), n(3), n(1)];
}
function br(e, t, a) {
  const n = jo(e, 1, 0.5);
  let s;
  for (t + a > 1 && (s = 1 / (t + a), t *= s, a *= s), s = 0; s < 3; s++)
    n[s] *= 1 - t - a, n[s] += t;
  return n;
}
function yr(e, t, a, n, s) {
  return e === s ? (t - a) / n + (t < a ? 6 : 0) : t === s ? (a - e) / n + 2 : (e - t) / n + 4;
}
function Vn(e) {
  const a = e.r / 255, n = e.g / 255, s = e.b / 255, o = Math.max(a, n, s), i = Math.min(a, n, s), r = (o + i) / 2;
  let l, c, u;
  return o !== i && (u = o - i, c = r > 0.5 ? u / (2 - o - i) : u / (o + i), l = yr(a, n, s, u, o), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function zn(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(_e);
}
function Nn(e, t, a) {
  return zn(jo, e, t, a);
}
function _r(e, t, a) {
  return zn(br, e, t, a);
}
function xr(e, t, a) {
  return zn(mr, e, t, a);
}
function Yo(e) {
  return (e % 360 + 360) % 360;
}
function kr(e) {
  const t = vr.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? ta(+t[5]) : _e(+t[5]));
  const s = Yo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = _r(s, o, i) : t[1] === "hsv" ? n = xr(s, o, i) : n = Nn(s, o, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function wr(e, t) {
  var a = Vn(e);
  a[0] = Yo(a[0] + t), a = Nn(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function $r(e) {
  if (!e)
    return;
  const t = Vn(e), a = t[0], n = ls(t[1]), s = ls(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${s}%, ${re(e.a)})` : `hsl(${a}, ${n}%, ${s}%)`;
}
const cs = {
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
}, ds = {
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
function Cr() {
  const e = {}, t = Object.keys(ds), a = Object.keys(cs);
  let n, s, o, i, r;
  for (n = 0; n < t.length; n++) {
    for (i = r = t[n], s = 0; s < a.length; s++)
      o = a[s], r = r.replace(o, cs[o]);
    o = parseInt(ds[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let ya;
function Mr(e) {
  ya || (ya = Cr(), ya.transparent = [0, 0, 0, 0]);
  const t = ya[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Sr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Dr(e) {
  const t = Sr.exec(e);
  let a = 255, n, s, o;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? ta(i) : me(i * 255, 0, 255);
    }
    return n = +t[1], s = +t[3], o = +t[5], n = 255 & (t[2] ? ta(n) : me(n, 0, 255)), s = 255 & (t[4] ? ta(s) : me(s, 0, 255)), o = 255 & (t[6] ? ta(o) : me(o, 0, 255)), {
      r: n,
      g: s,
      b: o,
      a
    };
  }
}
function Ar(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${re(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Qa = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Oe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Tr(e, t, a) {
  const n = Oe(re(e.r)), s = Oe(re(e.g)), o = Oe(re(e.b));
  return {
    r: _e(Qa(n + a * (Oe(re(t.r)) - n))),
    g: _e(Qa(s + a * (Oe(re(t.g)) - s))),
    b: _e(Qa(o + a * (Oe(re(t.b)) - o))),
    a: e.a + a * (t.a - e.a)
  };
}
function _a(e, t, a) {
  if (e) {
    let n = Vn(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = Nn(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function qo(e, t) {
  return e && Object.assign(t || {}, e);
}
function us(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = _e(e[3]))) : (t = qo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = _e(t.a)), t;
}
function Br(e) {
  return e.charAt(0) === "r" ? Dr(e) : kr(e);
}
class ca {
  constructor(t) {
    if (t instanceof ca)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = us(t) : a === "string" && (n = fr(t) || Mr(t) || Br(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = qo(this._rgb);
    return t && (t.a = re(t.a)), t;
  }
  set rgb(t) {
    this._rgb = us(t);
  }
  rgbString() {
    return this._valid ? Ar(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? pr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? $r(this._rgb) : void 0;
  }
  mix(t, a) {
    if (t) {
      const n = this.rgb, s = t.rgb;
      let o;
      const i = a === o ? 0.5 : a, r = 2 * i - 1, l = n.a - s.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      o = 1 - c, n.r = 255 & c * n.r + o * s.r + 0.5, n.g = 255 & c * n.g + o * s.g + 0.5, n.b = 255 & c * n.b + o * s.b + 0.5, n.a = i * n.a + (1 - i) * s.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, a) {
    return t && (this._rgb = Tr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new ca(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = _e(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = ma(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return _a(this._rgb, 2, t), this;
  }
  darken(t) {
    return _a(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return _a(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return _a(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return wr(this._rgb, t), this;
  }
}
function se() {
}
const Lr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function yt(e) {
  return e == null;
}
function Dt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function pt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Et(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Zt(e, t) {
  return Et(e) ? e : t;
}
function dt(e, t) {
  return typeof e > "u" ? t : e;
}
const Fr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Ko = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function $t(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function _t(e, t, a, n) {
  let s, o, i;
  if (Dt(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(a, e[s], s);
  else if (pt(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(a, e[i[s]], i[s]);
}
function Ra(e, t) {
  let a, n, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, n = e.length; a < n; ++a)
    if (s = e[a], o = t[a], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function Ia(e) {
  if (Dt(e))
    return e.map(Ia);
  if (pt(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let s = 0;
    for (; s < n; ++s)
      t[a[s]] = Ia(e[a[s]]);
    return t;
  }
  return e;
}
function Uo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Pr(e, t, a, n) {
  if (!Uo(e))
    return;
  const s = t[e], o = a[e];
  pt(s) && pt(o) ? da(s, o, n) : t[e] = Ia(o);
}
function da(e, t, a) {
  const n = Dt(t) ? t : [
    t
  ], s = n.length;
  if (!pt(e))
    return e;
  a = a || {};
  const o = a.merger || Pr;
  let i;
  for (let r = 0; r < s; ++r) {
    if (i = n[r], !pt(i))
      continue;
    const l = Object.keys(i);
    for (let c = 0, u = l.length; c < u; ++c)
      o(l[c], e, i, a);
  }
  return e;
}
function na(e, t) {
  return da(e, t, {
    merger: Rr
  });
}
function Rr(e, t, a) {
  if (!Uo(e))
    return;
  const n = t[e], s = a[e];
  pt(n) && pt(s) ? na(n, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Ia(s));
}
const hs = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Ir(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const s of t)
    n += s, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function Er(e) {
  const t = Ir(e);
  return (a) => {
    for (const n of t) {
      if (n === "")
        break;
      a = a && a[n];
    }
    return a;
  };
}
function Pe(e, t) {
  return (hs[t] || (hs[t] = Er(t)))(e);
}
function Wn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ua = (e) => typeof e < "u", xe = (e) => typeof e == "function", fs = (e, t) => {
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
const kt = Math.PI, Ct = 2 * kt, Vr = Ct + kt, Ea = Number.POSITIVE_INFINITY, zr = kt / 180, Tt = kt / 2, Ce = kt / 4, gs = kt * 2 / 3, Xo = Math.log10, ee = Math.sign;
function sa(e, t, a) {
  return Math.abs(e - t) < a;
}
function ps(e) {
  const t = Math.round(e);
  e = sa(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Xo(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function Nr(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((s, o) => s - o).pop(), t;
}
function Wr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function ha(e) {
  return !Wr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Hr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function jr(e, t, a) {
  let n, s, o;
  for (n = 0, s = e.length; n < s; n++)
    o = e[n][a], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function le(e) {
  return e * (kt / 180);
}
function Yr(e) {
  return e * (180 / kt);
}
function vs(e) {
  if (!Et(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Go(e, t) {
  const a = t.x - e.x, n = t.y - e.y, s = Math.sqrt(a * a + n * n);
  let o = Math.atan2(n, a);
  return o < -0.5 * kt && (o += Ct), {
    angle: o,
    distance: s
  };
}
function Tn(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function qr(e, t) {
  return (e - t + Vr) % Ct - kt;
}
function Ht(e) {
  return (e % Ct + Ct) % Ct;
}
function fa(e, t, a, n) {
  const s = Ht(e), o = Ht(t), i = Ht(a), r = Ht(o - s), l = Ht(i - s), c = Ht(s - o), u = Ht(s - i);
  return s === o || s === i || n && o === i || r > l && c < u;
}
function Pt(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Kr(e) {
  return Pt(e, -32768, 32767);
}
function ce(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function Hn(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, s = 0, o;
  for (; n - s > 1; )
    o = s + n >> 1, a(o) ? s = o : n = o;
  return {
    lo: s,
    hi: n
  };
}
const Be = (e, t, a, n) => Hn(e, a, n ? (s) => {
  const o = e[s][t];
  return o < a || o === a && e[s + 1][t] === a;
} : (s) => e[s][t] < a), Ur = (e, t, a) => Hn(e, a, (n) => e[n][t] >= a);
function Xr(e, t, a) {
  let n = 0, s = e.length;
  for (; n < s && e[n] < t; )
    n++;
  for (; s > n && e[s - 1] > a; )
    s--;
  return n > 0 || s < e.length ? e.slice(n, s) : e;
}
const Zo = [
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
  }), Zo.forEach((a) => {
    const n = "_onData" + Wn(a), s = e[a];
    Object.defineProperty(e, a, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = s.apply(this, o);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[n] == "function" && r[n](...o);
        }), i;
      }
    });
  });
}
function ms(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, s = n.indexOf(t);
  s !== -1 && n.splice(s, 1), !(n.length > 0) && (Zo.forEach((o) => {
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
  let a = [], n = !1;
  return function(...s) {
    a = s, n || (n = !0, Jo.call(window, () => {
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
const jn = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ft = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Qr = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Jr(e, t, a) {
  const n = t.length;
  let s = 0, o = n;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: f, max: g, minDefined: p, maxDefined: h } = i.getUserBounds();
    if (p) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Be(l, u, f).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : Be(t, u, i.getPixelForValue(f)).lo
      ), c) {
        const m = l.slice(0, s + 1).reverse().findIndex((y) => !yt(y[r.axis]));
        s -= Math.max(0, m);
      }
      s = Pt(s, 0, n - 1);
    }
    if (h) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        Be(l, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : Be(t, u, i.getPixelForValue(g), !0).hi + 1
      );
      if (c) {
        const y = l.slice(m - 1).findIndex((_) => !yt(_[r.axis]));
        m += Math.max(0, y);
      }
      o = Pt(m, s, n) - s;
    } else
      o = n - s;
  }
  return {
    start: s,
    count: o
  };
}
function tl(e) {
  const { xScale: t, yScale: a, _scaleRanges: n } = e, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: a.min,
    ymax: a.max
  };
  if (!n)
    return e._scaleRanges = s, !0;
  const o = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== a.min || n.ymax !== a.max;
  return Object.assign(n, s), o;
}
const xa = (e) => e === 0 || e === 1, bs = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ct / a)), ys = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ct / a) + 1, oa = {
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
  easeInSine: (e) => -Math.cos(e * Tt) + 1,
  easeOutSine: (e) => Math.sin(e * Tt),
  easeInOutSine: (e) => -0.5 * (Math.cos(kt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => xa(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => xa(e) ? e : bs(e, 0.075, 0.3),
  easeOutElastic: (e) => xa(e) ? e : ys(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return xa(e) ? e : e < 0.5 ? 0.5 * bs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * ys(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - oa.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? oa.easeInBounce(e * 2) * 0.5 : oa.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Yn(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function _s(e) {
  return Yn(e) ? e : new ca(e);
}
function Ja(e) {
  return Yn(e) ? e : new ca(e).saturate(0.5).darken(0.1).hexString();
}
const el = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], al = [
  "color",
  "borderColor",
  "backgroundColor"
];
function nl(e) {
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
      properties: al
    },
    numbers: {
      type: "number",
      properties: el
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
function sl(e) {
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
const xs = /* @__PURE__ */ new Map();
function ol(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = xs.get(a);
  return n || (n = new Intl.NumberFormat(e, t), xs.set(a, n)), n;
}
function qn(e, t, a) {
  return ol(t, a).format(e);
}
const il = {
  values(e) {
    return Dt(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let s, o = e;
    if (a.length > 1) {
      const c = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = rl(e, a);
    }
    const i = Xo(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: s,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), qn(e, n, l);
  }
};
function rl(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var ei = {
  formatters: il
};
function ll(e) {
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
const Re = /* @__PURE__ */ Object.create(null), Bn = /* @__PURE__ */ Object.create(null);
function ia(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let n = 0, s = a.length; n < s; ++n) {
    const o = a[n];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function tn(e, t, a) {
  return typeof t == "string" ? da(ia(e, t), a) : da(ia(e, ""), t);
}
class cl {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, s) => Ja(s.backgroundColor), this.hoverBorderColor = (n, s) => Ja(s.borderColor), this.hoverColor = (n, s) => Ja(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return tn(this, t, a);
  }
  get(t) {
    return ia(this, t);
  }
  describe(t, a) {
    return tn(Bn, t, a);
  }
  override(t, a) {
    return tn(Re, t, a);
  }
  route(t, a, n, s) {
    const o = ia(this, t), i = ia(this, n), r = "_" + a;
    Object.defineProperties(o, {
      [r]: {
        value: o[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const l = this[r], c = i[s];
          return pt(l) ? Object.assign({}, c, l) : dt(l, c);
        },
        set(l) {
          this[r] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((a) => a(this));
  }
}
var St = /* @__PURE__ */ new cl({
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
  nl,
  sl,
  ll
]);
function dl(e) {
  return !e || yt(e.size) || yt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function ks(e, t, a, n, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, a.push(s)), o > n && (n = o), n;
}
function Me(e, t, a) {
  const n = e.currentDevicePixelRatio, s = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - s) * n) / n + s;
}
function ws(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ln(e, t, a, n) {
  ai(e, t, a, n, null);
}
function ai(e, t, a, n, s) {
  let o, i, r, l, c, u, f, g;
  const p = t.pointStyle, h = t.rotation, m = t.radius;
  let y = (h || 0) * zr;
  if (p && typeof p == "object" && (o = p.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(y), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        s ? e.ellipse(a, n, s / 2, m, 0, 0, Ct) : e.arc(a, n, m, 0, Ct), e.closePath();
        break;
      case "triangle":
        u = s ? s / 2 : m, e.moveTo(a + Math.sin(y) * u, n - Math.cos(y) * m), y += gs, e.lineTo(a + Math.sin(y) * u, n - Math.cos(y) * m), y += gs, e.lineTo(a + Math.sin(y) * u, n - Math.cos(y) * m), e.closePath();
        break;
      case "rectRounded":
        c = m * 0.516, l = m - c, i = Math.cos(y + Ce) * l, f = Math.cos(y + Ce) * (s ? s / 2 - c : l), r = Math.sin(y + Ce) * l, g = Math.sin(y + Ce) * (s ? s / 2 - c : l), e.arc(a - f, n - r, c, y - kt, y - Tt), e.arc(a + g, n - i, c, y - Tt, y), e.arc(a + f, n + r, c, y, y + Tt), e.arc(a - g, n + i, c, y + Tt, y + kt), e.closePath();
        break;
      case "rect":
        if (!h) {
          l = Math.SQRT1_2 * m, u = s ? s / 2 : l, e.rect(a - u, n - l, 2 * u, 2 * l);
          break;
        }
        y += Ce;
      /* falls through */
      case "rectRot":
        f = Math.cos(y) * (s ? s / 2 : m), i = Math.cos(y) * m, r = Math.sin(y) * m, g = Math.sin(y) * (s ? s / 2 : m), e.moveTo(a - f, n - r), e.lineTo(a + g, n - i), e.lineTo(a + f, n + r), e.lineTo(a - g, n + i), e.closePath();
        break;
      case "crossRot":
        y += Ce;
      /* falls through */
      case "cross":
        f = Math.cos(y) * (s ? s / 2 : m), i = Math.cos(y) * m, r = Math.sin(y) * m, g = Math.sin(y) * (s ? s / 2 : m), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i);
        break;
      case "star":
        f = Math.cos(y) * (s ? s / 2 : m), i = Math.cos(y) * m, r = Math.sin(y) * m, g = Math.sin(y) * (s ? s / 2 : m), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i), y += Ce, f = Math.cos(y) * (s ? s / 2 : m), i = Math.cos(y) * m, r = Math.sin(y) * m, g = Math.sin(y) * (s ? s / 2 : m), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(y) * m, r = Math.sin(y) * m, e.moveTo(a - i, n - r), e.lineTo(a + i, n + r);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(y) * (s ? s / 2 : m), n + Math.sin(y) * m);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function ga(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function Wa(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ha(e) {
  e.restore();
}
function ul(e, t, a, n, s) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (s === "middle") {
    const o = (t.x + a.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, a.y);
  } else s === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function hl(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function fl(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), yt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function gl(e, t, a, n, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(n), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = a - o.actualBoundingBoxAscent, c = a + o.actualBoundingBoxDescent, u = s.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function pl(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function pa(e, t, a, n, s, o = {}) {
  const i = Dt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = s.string, fl(e, o), l = 0; l < i.length; ++l)
    c = i[l], o.backdrop && pl(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), yt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, a, n, o.maxWidth)), e.fillText(c, a, n, o.maxWidth), gl(e, a, n, c, o), n += Number(s.lineHeight);
  e.restore();
}
function Oa(e, t) {
  const { x: a, y: n, w: s, h: o, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * kt, kt, !0), e.lineTo(a, n + o - i.bottomLeft), e.arc(a + i.bottomLeft, n + o - i.bottomLeft, i.bottomLeft, kt, Tt, !0), e.lineTo(a + s - i.bottomRight, n + o), e.arc(a + s - i.bottomRight, n + o - i.bottomRight, i.bottomRight, Tt, 0, !0), e.lineTo(a + s, n + i.topRight), e.arc(a + s - i.topRight, n + i.topRight, i.topRight, 0, -Tt, !0), e.lineTo(a + i.topLeft, n);
}
const vl = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, ml = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function bl(e, t) {
  const a = ("" + e).match(vl);
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
const yl = (e) => +e || 0;
function Kn(e, t) {
  const a = {}, n = pt(t), s = n ? Object.keys(t) : t, o = pt(e) ? n ? (i) => dt(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    a[i] = yl(o(i));
  return a;
}
function ni(e) {
  return Kn(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ne(e) {
  return Kn(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Ut(e) {
  const t = ni(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Rt(e, t) {
  e = e || {}, t = t || St.font;
  let a = dt(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = dt(e.style, t.style);
  n && !("" + n).match(ml) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const s = {
    family: dt(e.family, t.family),
    lineHeight: bl(dt(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: dt(e.weight, t.weight),
    string: ""
  };
  return s.string = dl(s), s;
}
function ka(e, t, a, n) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function _l(e, t, a) {
  const { min: n, max: s } = e, o = Ko(t, (s - n) / 2), i = (r, l) => a && r === 0 ? 0 : r + l;
  return {
    min: i(n, -Math.abs(o)),
    max: i(s, o)
  };
}
function Ee(e, t) {
  return Object.assign(Object.create(e), t);
}
function Un(e, t = [
  ""
], a, n, s = () => e[0]) {
  const o = a || e;
  typeof n > "u" && (n = ri("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: n,
    _getTarget: s,
    override: (r) => Un([
      r,
      ...e
    ], t, o, n)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, l) {
      return delete r[l], delete r._keys, delete e[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, l) {
      return oi(r, l, () => Dl(l, t, e, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, l) {
      return Reflect.getOwnPropertyDescriptor(r._scopes[0], l);
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
    has(r, l) {
      return Cs(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Cs(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const u = r._storage || (r._storage = s());
      return r[l] = u[l] = c, delete r._keys, !0;
    }
  });
}
function He(e, t, a, n) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: si(e, n),
    setContext: (o) => He(e, o, a, n),
    override: (o) => He(e.override(o), t, a, n)
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
    get(o, i, r) {
      return oi(o, i, () => kl(o, i, r));
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
    set(o, i, r) {
      return e[i] = r, delete o[i], !0;
    }
  });
}
function si(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: n = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: a,
    indexable: n,
    isScriptable: xe(a) ? a : () => a,
    isIndexable: xe(n) ? n : () => n
  };
}
const xl = (e, t) => e ? e + Wn(t) : t, Xn = (e, t) => pt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function oi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function kl(e, t, a) {
  const { _proxy: n, _context: s, _subProxy: o, _descriptors: i } = e;
  let r = n[t];
  return xe(r) && i.isScriptable(t) && (r = wl(t, r, e, a)), Dt(r) && r.length && (r = $l(t, r, e, i.isIndexable)), Xn(t, r) && (r = He(r, s, o && o[t], i)), r;
}
function wl(e, t, a, n) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, i || n);
  return r.delete(e), Xn(e, l) && (l = Gn(s._scopes, s, e, l)), l;
}
function $l(e, t, a, n) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: r } = a;
  if (typeof o.index < "u" && n(e))
    return t[o.index % t.length];
  if (pt(t[0])) {
    const l = t, c = s._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const f = Gn(c, s, e, u);
      t.push(He(f, o, i && i[e], r));
    }
  }
  return t;
}
function ii(e, t, a) {
  return xe(e) ? e(t, a) : e;
}
const Cl = (e, t) => e === !0 ? t : typeof e == "string" ? Pe(t, e) : void 0;
function Ml(e, t, a, n, s) {
  for (const o of t) {
    const i = Cl(a, o);
    if (i) {
      e.add(i);
      const r = ii(i._fallback, a, s);
      if (typeof r < "u" && r !== a && r !== n)
        return r;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function Gn(e, t, a, n) {
  const s = t._rootScopes, o = ii(t._fallback, a, n), i = [
    ...e,
    ...s
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = $s(r, i, a, o || a, n);
  return l === null || typeof o < "u" && o !== a && (l = $s(r, i, o, l, n), l === null) ? !1 : Un(Array.from(r), [
    ""
  ], s, o, () => Sl(t, a, n));
}
function $s(e, t, a, n, s) {
  for (; a; )
    a = Ml(e, t, a, n, s);
  return a;
}
function Sl(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const s = n[t];
  return Dt(s) && pt(a) ? a : s || {};
}
function Dl(e, t, a, n) {
  let s;
  for (const o of t)
    if (s = ri(xl(o, e), a), typeof s < "u")
      return Xn(e, s) ? Gn(a, n, e, s) : s;
}
function ri(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function Cs(e) {
  let t = e._keys;
  return t || (t = e._keys = Al(e._scopes)), t;
}
function Al(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((s) => !s.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const Tl = Number.EPSILON || 1e-14, je = (e, t) => t < e.length && !e[t].skip && e[t], li = (e) => e === "x" ? "y" : "x";
function Bl(e, t, a, n) {
  const s = e.skip ? t : e, o = t, i = a.skip ? t : a, r = Tn(o, s), l = Tn(i, o);
  let c = r / (r + l), u = l / (r + l);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const f = n * c, g = n * u;
  return {
    previous: {
      x: o.x - f * (i.x - s.x),
      y: o.y - f * (i.y - s.y)
    },
    next: {
      x: o.x + g * (i.x - s.x),
      y: o.y + g * (i.y - s.y)
    }
  };
}
function Ll(e, t, a) {
  const n = e.length;
  let s, o, i, r, l, c = je(e, 0);
  for (let u = 0; u < n - 1; ++u)
    if (l = c, c = je(e, u + 1), !(!l || !c)) {
      if (sa(t[u], 0, Tl)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      s = a[u] / t[u], o = a[u + 1] / t[u], r = Math.pow(s, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[u] = s * i * t[u], a[u + 1] = o * i * t[u]);
    }
}
function Fl(e, t, a = "x") {
  const n = li(a), s = e.length;
  let o, i, r, l = je(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = r, r = l, l = je(e, c + 1), !r)
      continue;
    const u = r[a], f = r[n];
    i && (o = (u - i[a]) / 3, r[`cp1${a}`] = u - o, r[`cp1${n}`] = f - o * t[c]), l && (o = (l[a] - u) / 3, r[`cp2${a}`] = u + o, r[`cp2${n}`] = f + o * t[c]);
  }
}
function Pl(e, t = "x") {
  const a = li(t), n = e.length, s = Array(n).fill(0), o = Array(n);
  let i, r, l, c = je(e, 0);
  for (i = 0; i < n; ++i)
    if (r = l, l = c, c = je(e, i + 1), !!l) {
      if (c) {
        const u = c[t] - l[t];
        s[i] = u !== 0 ? (c[a] - l[a]) / u : 0;
      }
      o[i] = r ? c ? ee(s[i - 1]) !== ee(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Ll(e, s, o), Fl(e, o, t);
}
function wa(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function Rl(e, t) {
  let a, n, s, o, i, r = ga(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = o, o = r, r = a < n - 1 && ga(e[a + 1], t), o && (s = e[a], i && (s.cp1x = wa(s.cp1x, t.left, t.right), s.cp1y = wa(s.cp1y, t.top, t.bottom)), r && (s.cp2x = wa(s.cp2x, t.left, t.right), s.cp2y = wa(s.cp2y, t.top, t.bottom)));
}
function Il(e, t, a, n, s) {
  let o, i, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Pl(e, s);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], l = Bl(c, r, e[Math.min(o + 1, i - (n ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && Rl(e, a);
}
function Zn() {
  return typeof window < "u" && typeof document < "u";
}
function Qn(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Va(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const ja = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function El(e, t) {
  return ja(e).getPropertyValue(t);
}
const Ol = [
  "top",
  "right",
  "bottom",
  "left"
];
function Fe(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let s = 0; s < 4; s++) {
    const o = Ol[s];
    n[o] = parseFloat(e[t + "-" + o + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Vl = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function zl(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: s, offsetY: o } = n;
  let i = !1, r, l;
  if (Vl(s, o, e.target))
    r = s, l = o;
  else {
    const c = t.getBoundingClientRect();
    r = n.clientX - c.left, l = n.clientY - c.top, i = !0;
  }
  return {
    x: r,
    y: l,
    box: i
  };
}
function Ae(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: n } = t, s = ja(a), o = s.boxSizing === "border-box", i = Fe(s, "padding"), r = Fe(s, "border", "width"), { x: l, y: c, box: u } = zl(e, a), f = i.left + (u && r.left), g = i.top + (u && r.top);
  let { width: p, height: h } = t;
  return o && (p -= i.width + r.width, h -= i.height + r.height), {
    x: Math.round((l - f) / p * a.width / n),
    y: Math.round((c - g) / h * a.height / n)
  };
}
function Nl(e, t, a) {
  let n, s;
  if (t === void 0 || a === void 0) {
    const o = e && Qn(e);
    if (!o)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = ja(o), l = Fe(r, "border", "width"), c = Fe(r, "padding");
      t = i.width - c.width - l.width, a = i.height - c.height - l.height, n = Va(r.maxWidth, o, "clientWidth"), s = Va(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: n || Ea,
    maxHeight: s || Ea
  };
}
const be = (e) => Math.round(e * 10) / 10;
function Wl(e, t, a, n) {
  const s = ja(e), o = Fe(s, "margin"), i = Va(s.maxWidth, e, "clientWidth") || Ea, r = Va(s.maxHeight, e, "clientHeight") || Ea, l = Nl(e, t, a);
  let { width: c, height: u } = l;
  if (s.boxSizing === "content-box") {
    const g = Fe(s, "border", "width"), p = Fe(s, "padding");
    c -= p.width + g.width, u -= p.height + g.height;
  }
  return c = Math.max(0, c - o.width), u = Math.max(0, n ? c / n : u - o.height), c = be(Math.min(c, i, l.maxWidth)), u = be(Math.min(u, r, l.maxHeight)), c && !u && (u = be(c / 2)), (t !== void 0 || a !== void 0) && n && l.height && u > l.height && (u = l.height, c = be(Math.floor(u * n))), {
    width: c,
    height: u
  };
}
function Ms(e, t, a) {
  const n = t || 1, s = be(e.height * n), o = be(e.width * n);
  e.height = be(e.height), e.width = be(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = n, i.height = s, i.width = o, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Hl = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Zn() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ss(e, t) {
  const a = El(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function Te(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function jl(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Yl(e, t, a, n) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Te(e, s, a), r = Te(s, o, a), l = Te(o, t, a), c = Te(i, r, a), u = Te(r, l, a);
  return Te(c, u, a);
}
const ql = function(e, t) {
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
}, Kl = function() {
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
function We(e, t, a) {
  return e ? ql(t, a) : Kl();
}
function ci(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function di(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ui(e) {
  return e === "angle" ? {
    between: fa,
    compare: qr,
    normalize: Ht
  } : {
    between: ce,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function Ds({ start: e, end: t, count: a, loop: n, style: s }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: s
  };
}
function Ul(e, t, a) {
  const { property: n, start: s, end: o } = a, { between: i, normalize: r } = ui(n), l = t.length;
  let { start: c, end: u, loop: f } = e, g, p;
  if (f) {
    for (c += l, u += l, g = 0, p = l; g < p && i(r(t[c % l][n]), s, o); ++g)
      c--, u--;
    c %= l, u %= l;
  }
  return u < c && (u += l), {
    start: c,
    end: u,
    loop: f,
    style: e.style
  };
}
function hi(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: s, end: o } = a, i = t.length, { compare: r, between: l, normalize: c } = ui(n), { start: u, end: f, loop: g, style: p } = Ul(e, t, a), h = [];
  let m = !1, y = null, _, $, A;
  const T = () => l(s, A, _) && r(s, A) !== 0, w = () => r(o, _) === 0 || l(o, A, _), x = () => m || T(), k = () => !m || w();
  for (let S = u, F = u; S <= f; ++S)
    $ = t[S % i], !$.skip && (_ = c($[n]), _ !== A && (m = l(_, s, o), y === null && x() && (y = r(_, s) === 0 ? S : F), y !== null && k() && (h.push(Ds({
      start: y,
      end: S,
      loop: g,
      count: i,
      style: p
    })), y = null), F = S, A = _));
  return y !== null && h.push(Ds({
    start: y,
    end: f,
    loop: g,
    count: i,
    style: p
  })), h;
}
function fi(e, t) {
  const a = [], n = e.segments;
  for (let s = 0; s < n.length; s++) {
    const o = hi(n[s], e.points, t);
    o.length && a.push(...o);
  }
  return a;
}
function Xl(e, t, a, n) {
  let s = 0, o = t - 1;
  if (a && !n)
    for (; s < t && !e[s].skip; )
      s++;
  for (; s < t && e[s].skip; )
    s++;
  for (s %= t, a && (o += s); o > s && e[o % t].skip; )
    o--;
  return o %= t, {
    start: s,
    end: o
  };
}
function Gl(e, t, a, n) {
  const s = e.length, o = [];
  let i = t, r = e[t], l;
  for (l = t + 1; l <= a; ++l) {
    const c = e[l % s];
    c.skip || c.stop ? r.skip || (n = !1, o.push({
      start: t % s,
      end: (l - 1) % s,
      loop: n
    }), t = i = c.stop ? l : null) : (i = l, r.skip && (t = l)), r = c;
  }
  return i !== null && o.push({
    start: t % s,
    end: i % s,
    loop: n
  }), o;
}
function Zl(e, t) {
  const a = e.points, n = e.options.spanGaps, s = a.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: r } = Xl(a, s, o, n);
  if (n === !0)
    return As(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], a, t);
  const l = r < i ? r + s : r, c = !!e._fullLoop && i === 0 && r === s - 1;
  return As(e, Gl(a, i, l, c), a, t);
}
function As(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Ql(e, t, a, n);
}
function Ql(e, t, a, n) {
  const s = e._chart.getContext(), o = Ts(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = a.length, c = [];
  let u = o, f = t[0].start, g = f;
  function p(h, m, y, _) {
    const $ = r ? -1 : 1;
    if (h !== m) {
      for (h += l; a[h % l].skip; )
        h -= $;
      for (; a[m % l].skip; )
        m += $;
      h % l !== m % l && (c.push({
        start: h % l,
        end: m % l,
        loop: y,
        style: _
      }), u = _, f = m % l);
    }
  }
  for (const h of t) {
    f = r ? f : h.start;
    let m = a[f % l], y;
    for (g = f + 1; g <= h.end; g++) {
      const _ = a[g % l];
      y = Ts(n.setContext(Ee(s, {
        type: "segment",
        p0: m,
        p1: _,
        p0DataIndex: (g - 1) % l,
        p1DataIndex: g % l,
        datasetIndex: i
      }))), Jl(y, u) && p(f, g - 1, h.loop, u), m = _, u = y;
    }
    f < g - 1 && p(f, g - 1, h.loop, u);
  }
  return c;
}
function Ts(e) {
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
function Jl(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(s, o) {
    return Yn(o) ? (a.includes(o) || a.push(o), a.indexOf(o)) : o;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function $a(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function tc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: $a(a, t, "left"),
    right: $a(a, t, "right"),
    top: $a(n, t, "top"),
    bottom: $a(n, t, "bottom")
  } : t;
}
function gi(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = tc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class ec {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, a, n, s) {
    const o = a.listeners[s], i = a.duration;
    o.forEach((r) => r({
      chart: t,
      initial: a.initial,
      numSteps: i,
      currentStep: Math.min(n - a.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Jo.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let a = 0;
    this._charts.forEach((n, s) => {
      if (!n.running || !n.items.length)
        return;
      const o = n.items;
      let i = o.length - 1, r = !1, l;
      for (; i >= 0; --i)
        l = o[i], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(t), r = !0) : (o[i] = o[o.length - 1], o.pop());
      r && (s.draw(), this._notify(s, n, t, "progress")), o.length || (n.running = !1, this._notify(s, n, t, "complete"), n.initial = !1), a += o.length;
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
    a && (a.running = !0, a.start = Date.now(), a.duration = a.items.reduce((n, s) => Math.max(n, s._duration), 0), this._refresh());
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
    let s = n.length - 1;
    for (; s >= 0; --s)
      n[s].cancel();
    a.items = [], this._notify(t, a, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var oe = /* @__PURE__ */ new ec();
const Bs = "transparent", ac = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = _s(e || Bs), s = n.valid && _s(t || Bs);
    return s && s.valid ? s.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class nc {
  constructor(t, a, n, s) {
    const o = a[n];
    s = ka([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = ka([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || ac[t.type || typeof i], this._easing = oa[t.easing] || oa.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, n) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = n - this._start, i = this._duration - o;
      this._start = n, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = ka([
        t.to,
        a,
        s,
        t.from
      ]), this._from = ka([
        t.from,
        s,
        a
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const a = t - this._start, n = this._duration, s = this._prop, o = this._from, i = this._loop, r = this._to;
    let l;
    if (this._active = o !== r && (i || a < n), !this._active) {
      this._target[s] = r, this._notify(!0);
      return;
    }
    if (a < 0) {
      this._target[s] = o;
      return;
    }
    l = a / n % 2, l = i && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[s] = this._fn(o, r, l);
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
    for (let s = 0; s < n.length; s++)
      n[s][a]();
  }
}
class pi {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!pt(t))
      return;
    const a = Object.keys(St.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!pt(o))
        return;
      const i = {};
      for (const r of a)
        i[r] = o[r];
      (Dt(o.properties) && o.properties || [
        s
      ]).forEach((r) => {
        (r === s || !n.has(r)) && n.set(r, i);
      });
    });
  }
  _animateOptions(t, a) {
    const n = a.options, s = oc(t, n);
    if (!s)
      return [];
    const o = this._createAnimations(s, n);
    return n.$shared && sc(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), o;
  }
  _createAnimations(t, a) {
    const n = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(a), r = Date.now();
    let l;
    for (l = i.length - 1; l >= 0; --l) {
      const c = i[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, a));
        continue;
      }
      const u = a[c];
      let f = o[c];
      const g = n.get(c);
      if (f)
        if (g && f.active()) {
          f.update(g, u, r);
          continue;
        } else
          f.cancel();
      if (!g || !g.duration) {
        t[c] = u;
        continue;
      }
      o[c] = f = new nc(g, t, c, u), s.push(f);
    }
    return s;
  }
  update(t, a) {
    if (this._properties.size === 0) {
      Object.assign(t, a);
      return;
    }
    const n = this._createAnimations(t, a);
    if (n.length)
      return oe.add(this._chart, n), !0;
  }
}
function sc(e, t) {
  const a = [], n = Object.keys(t);
  for (let s = 0; s < n.length; s++) {
    const o = e[n[s]];
    o && o.active() && a.push(o.wait());
  }
  return Promise.all(a);
}
function oc(e, t) {
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
function Ls(e, t) {
  const a = e && e.options || {}, n = a.reverse, s = a.min === void 0 ? t : 0, o = a.max === void 0 ? t : 0;
  return {
    start: n ? o : s,
    end: n ? s : o
  };
}
function ic(e, t, a) {
  if (a === !1)
    return !1;
  const n = Ls(e, a), s = Ls(t, a);
  return {
    top: s.end,
    right: n.end,
    bottom: s.start,
    left: n.start
  };
}
function rc(e) {
  let t, a, n, s;
  return pt(e) ? (t = e.top, a = e.right, n = e.bottom, s = e.left) : t = a = n = s = e, {
    top: t,
    right: a,
    bottom: n,
    left: s,
    disabled: e === !1
  };
}
function vi(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = n.length; s < o; ++s)
    a.push(n[s].index);
  return a;
}
function Fs(e, t, a, n = {}) {
  const s = e.keys, o = n.mode === "single";
  let i, r, l, c;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, r = s.length; i < r; ++i) {
    if (l = +s[i], l === a) {
      if (u = !0, n.all)
        continue;
      break;
    }
    c = e.values[l], Et(c) && (o || t === 0 || ee(t) === ee(c)) && (t += c);
  }
  return !u && !n.all ? 0 : t;
}
function lc(e, t) {
  const { iScale: a, vScale: n } = t, s = a.axis === "x" ? "x" : "y", o = n.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, c, u;
  for (l = 0, c = i.length; l < c; ++l)
    u = i[l], r[l] = {
      [s]: u,
      [o]: e[u]
    };
  return r;
}
function en(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function cc(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function dc(e) {
  const { min: t, max: a, minDefined: n, maxDefined: s } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: s ? a : Number.POSITIVE_INFINITY
  };
}
function uc(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function Ps(e, t, a, n) {
  for (const s of t.getMatchingVisibleMetas(n).reverse()) {
    const o = e[s.index];
    if (a && o > 0 || !a && o < 0)
      return s.index;
  }
  return null;
}
function Rs(e, t) {
  const { chart: a, _cachedMeta: n } = e, s = a._stacks || (a._stacks = {}), { iScale: o, vScale: i, index: r } = n, l = o.axis, c = i.axis, u = cc(o, i, n), f = t.length;
  let g;
  for (let p = 0; p < f; ++p) {
    const h = t[p], { [l]: m, [c]: y } = h, _ = h._stacks || (h._stacks = {});
    g = _[c] = uc(s, u, m), g[r] = y, g._top = Ps(g, i, !0, n.type), g._bottom = Ps(g, i, !1, n.type);
    const $ = g._visualValues || (g._visualValues = {});
    $[r] = y;
  }
}
function an(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function hc(e, t) {
  return Ee(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function fc(e, t, a) {
  return Ee(e, {
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
function Ke(e, t) {
  const a = e.controller.index, n = e.vScale && e.vScale.axis;
  if (n) {
    t = t || e._parsed;
    for (const s of t) {
      const o = s._stacks;
      if (!o || o[n] === void 0 || o[n][a] === void 0)
        return;
      delete o[n][a], o[n]._visualValues !== void 0 && o[n]._visualValues[a] !== void 0 && delete o[n]._visualValues[a];
    }
  }
}
const nn = (e) => e === "reset" || e === "none", Is = (e, t) => t ? e : Object.assign({}, e), gc = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: vi(a, !0),
  values: null
};
class Ya {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = en(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ke(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), s = (f, g, p, h) => f === "x" ? g : f === "r" ? h : p, o = a.xAxisID = dt(n.xAxisID, an(t, "x")), i = a.yAxisID = dt(n.yAxisID, an(t, "y")), r = a.rAxisID = dt(n.rAxisID, an(t, "r")), l = a.indexAxis, c = a.iAxisID = s(l, o, i, r), u = a.vAxisID = s(l, i, o, r);
    a.xScale = this.getScaleForId(o), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(r), a.iScale = this.getScaleForId(c), a.vScale = this.getScaleForId(u);
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
    this._data && ms(this._data, this), t._stacked && Ke(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (pt(a)) {
      const s = this._cachedMeta;
      this._data = lc(a, s);
    } else if (n !== a) {
      if (n) {
        ms(n, this);
        const s = this._cachedMeta;
        Ke(s), s._parsed = [];
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
    let s = !1;
    this._dataCheck();
    const o = a._stacked;
    a._stacked = en(a.vScale, a), a.stack !== n.stack && (s = !0, Ke(a), a.stack = n.stack), this._resyncElements(t), (s || o !== a._stacked) && (Rs(this, a._parsed), a._stacked = en(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: s } = this, { iScale: o, _stacked: i } = n, r = o.axis;
    let l = t === 0 && a === s.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], u, f, g;
    if (this._parsing === !1)
      n._parsed = s, n._sorted = !0, g = s;
    else {
      Dt(s[t]) ? g = this.parseArrayData(n, s, t, a) : pt(s[t]) ? g = this.parseObjectData(n, s, t, a) : g = this.parsePrimitiveData(n, s, t, a);
      const p = () => f[r] === null || c && f[r] < c[r];
      for (u = 0; u < a; ++u)
        n._parsed[u + t] = f = g[u], l && (p() && (l = !1), c = f);
      n._sorted = l;
    }
    i && Rs(this, g);
  }
  parsePrimitiveData(t, a, n, s) {
    const { iScale: o, vScale: i } = t, r = o.axis, l = i.axis, c = o.getLabels(), u = o === i, f = new Array(s);
    let g, p, h;
    for (g = 0, p = s; g < p; ++g)
      h = g + n, f[g] = {
        [r]: u || o.parse(c[h], h),
        [l]: i.parse(a[h], h)
      };
    return f;
  }
  parseArrayData(t, a, n, s) {
    const { xScale: o, yScale: i } = t, r = new Array(s);
    let l, c, u, f;
    for (l = 0, c = s; l < c; ++l)
      u = l + n, f = a[u], r[l] = {
        x: o.parse(f[0], u),
        y: i.parse(f[1], u)
      };
    return r;
  }
  parseObjectData(t, a, n, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(s);
    let u, f, g, p;
    for (u = 0, f = s; u < f; ++u)
      g = u + n, p = a[g], c[u] = {
        x: o.parse(Pe(p, r), g),
        y: i.parse(Pe(p, l), g)
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
    const s = this.chart, o = this._cachedMeta, i = a[t.axis], r = {
      keys: vi(s, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return Fs(r, i, o.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, s) {
    const o = n[a.axis];
    let i = o === null ? NaN : o;
    const r = s && n._stacks[a.axis];
    s && r && (s.values = r, i = Fs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, s = n._parsed, o = n._sorted && t === n.iScale, i = s.length, r = this._getOtherScale(t), l = gc(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: f } = dc(r);
    let g, p;
    function h() {
      p = s[g];
      const m = p[r.axis];
      return !Et(p[t.axis]) || u > m || f < m;
    }
    for (g = 0; g < i && !(!h() && (this.updateRangeFromParsed(c, t, p, l), o)); ++g)
      ;
    if (o) {
      for (g = i - 1; g >= 0; --g)
        if (!h()) {
          this.updateRangeFromParsed(c, t, p, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, n = [];
    let s, o, i;
    for (s = 0, o = a.length; s < o; ++s)
      i = a[s][t.axis], Et(i) && n.push(i);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = a.iScale, s = a.vScale, o = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(o[n.axis]) : "",
      value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
    };
  }
  _update(t) {
    const a = this._cachedMeta;
    this.update(t || "default"), a._clip = rc(dt(this.options.clip, ic(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, n = this._cachedMeta, s = n.data || [], o = a.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || s.length - r, c = this.options.drawActiveElementsOnTop;
    let u;
    for (n.dataset && n.dataset.draw(t, o, r, l), u = r; u < r + l; ++u) {
      const f = s[u];
      f.hidden || (f.active && c ? i.push(f) : f.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, o);
  }
  getStyle(t, a) {
    const n = a ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, a, n) {
    const s = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = fc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = hc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!a, o.mode = n, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", n) {
    const s = a === "active", o = this._cachedDataOpts, i = t + "-" + a, r = o[i], l = this.enableOptionSharing && ua(n);
    if (r)
      return Is(r, l);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), f = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = c.getOptionScopes(this.getDataset(), u), p = Object.keys(St.elements[t]), h = () => this.getContext(n, s, a), m = c.resolveNamedOptions(g, p, h, f);
    return m.$shared && (m.$shared = l, o[i] = Object.freeze(Is(m, l))), m;
  }
  _resolveAnimations(t, a, n) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${a}`, r = o[i];
    if (r)
      return r;
    let l;
    if (s.options.animation !== !1) {
      const u = this.chart.config, f = u.datasetAnimationScopeKeys(this._type, a), g = u.getOptionScopes(this.getDataset(), f);
      l = u.createResolver(g, this.getContext(t, n, a));
    }
    const c = new pi(s, l && l.animations);
    return l && l._cacheable && (o[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || nn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), s = this._sharedOptions, o = this.getSharedOptions(n), i = this.includeOptions(a, o) || o !== s;
    return this.updateSharedOptions(o, a, n), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, a, n, s) {
    nn(s) ? Object.assign(t, n) : this._resolveAnimations(a, s).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !nn(a) && this._resolveAnimations(void 0, a).update(t, n);
  }
  _setStyle(t, a, n, s) {
    t.active = s;
    const o = this.getStyle(a, s);
    this._resolveAnimations(a, n, s).update(t, {
      options: !s && this.getSharedOptions(o) || o
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
    for (const [r, l, c] of this._syncList)
      this[r](l, c);
    this._syncList = [];
    const s = n.length, o = a.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, a, n = !0) {
    const s = this._cachedMeta, o = s.data, i = t + a;
    let r;
    const l = (c) => {
      for (c.length += a, r = c.length - 1; r >= i; r--)
        c[r] = c[r - a];
    };
    for (l(o), r = t; r < i; ++r)
      o[r] = new this.dataElementType();
    this._parsing && l(s._parsed), this.parse(t, a), n && this.updateElements(o, t, a, "reset");
  }
  updateElements(t, a, n, s) {
  }
  _removeElements(t, a) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const s = n._parsed.splice(t, a);
      n._stacked && Ke(n, s);
    }
    n.data.splice(t, a);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [a, n, s] = t;
      this[a](n, s);
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
function pc(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let s = 0, o = a.length; s < o; s++)
      n = n.concat(a[s].controller.getAllParsedValues(e));
    e._cache.$bar = Qo(n.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function vc(e) {
  const t = e.iScale, a = pc(t, e.type);
  let n = t._length, s, o, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (ua(r) && (n = Math.min(n, Math.abs(i - r) || n)), r = i);
  };
  for (s = 0, o = a.length; s < o; ++s)
    i = t.getPixelForValue(a[s]), l();
  for (r = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), l();
  return n;
}
function mc(e, t, a, n) {
  const s = a.barThickness;
  let o, i;
  return yt(s) ? (o = t.min * a.categoryPercentage, i = a.barPercentage) : (o = s * n, i = 1), {
    chunk: o / n,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function bc(e, t, a, n) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, r = e < s.length - 1 ? s[e + 1] : null;
  const l = a.categoryPercentage;
  i === null && (i = o - (r === null ? t.end - t.start : r - o)), r === null && (r = o + o - i);
  const c = o - (o - Math.min(i, r)) / 2 * l;
  return {
    chunk: Math.abs(r - i) / 2 * l / n,
    ratio: a.barPercentage,
    start: c
  };
}
function yc(e, t, a, n) {
  const s = a.parse(e[0], n), o = a.parse(e[1], n), i = Math.min(s, o), r = Math.max(s, o);
  let l = i, c = r;
  Math.abs(i) > Math.abs(r) && (l = r, c = i), t[a.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: s,
    end: o,
    min: i,
    max: r
  };
}
function mi(e, t, a, n) {
  return Dt(e) ? yc(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function Es(e, t, a, n) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), r = s === o, l = [];
  let c, u, f, g;
  for (c = a, u = a + n; c < u; ++c)
    g = t[c], f = {}, f[s.axis] = r || s.parse(i[c], c), l.push(mi(g, f, o, c));
  return l;
}
function sn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function _c(e, t, a) {
  return e !== 0 ? ee(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function xc(e) {
  let t, a, n, s, o;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: s,
    bottom: o
  };
}
function kc(e, t, a, n) {
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
  const { start: i, end: r, reverse: l, top: c, bottom: u } = xc(e);
  s === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? s = c : (a._bottom || 0) === n ? s = u : (o[Os(u, i, r, l)] = !0, s = c)), o[Os(s, i, r, l)] = !0, e.borderSkipped = o;
}
function Os(e, t, a, n) {
  return n ? (e = wc(e, t, a), e = Vs(e, a, t)) : e = Vs(e, t, a), e;
}
function wc(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function Vs(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function $c(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class Cc extends Ya {
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
  parsePrimitiveData(t, a, n, s) {
    return Es(t, a, n, s);
  }
  parseArrayData(t, a, n, s) {
    return Es(t, a, n, s);
  }
  parseObjectData(t, a, n, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? r : l, u = i.axis === "x" ? r : l, f = [];
    let g, p, h, m;
    for (g = n, p = n + s; g < p; ++g)
      m = a[g], h = {}, h[o.axis] = o.parse(Pe(m, c), g), f.push(mi(Pe(m, u), h, i, g));
    return f;
  }
  updateRangeFromParsed(t, a, n, s) {
    super.updateRangeFromParsed(t, a, n, s);
    const o = n._custom;
    o && a === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, { iScale: n, vScale: s } = a, o = this.getParsed(t), i = o._custom, r = sn(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
    return {
      label: "" + n.getLabelForValue(o[n.axis]),
      value: r
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
  updateElements(t, a, n, s) {
    const o = s === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), u = this._getRuler(), { sharedOptions: f, includeOptions: g } = this._getSharedOptions(a, s);
    for (let p = a; p < a + n; p++) {
      const h = this.getParsed(p), m = o || yt(h[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), y = this._calculateBarIndexPixels(p, u), _ = (h._stacks || {})[r.axis], $ = {
        horizontal: c,
        base: m.base,
        enableBorderRadius: !_ || sn(h._custom) || i === _._top || i === _._bottom,
        x: c ? m.head : y.center,
        y: c ? y.center : m.head,
        height: c ? y.size : Math.abs(m.size),
        width: c ? Math.abs(m.size) : y.size
      };
      g && ($.options = f || this.resolveDataElementOptions(p, t[p].active ? "active" : s));
      const A = $.options || t[p].options;
      kc($, A, _, i), $c($, A, u.ratio), this.updateElement(t[p], p, $, s);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, s = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = n.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), l = r && r[n.axis], c = (u) => {
      const f = u._parsed.find((p) => p[n.axis] === l), g = f && f[u.vScale.axis];
      if (yt(g) || isNaN(g))
        return !0;
    };
    for (const u of s)
      if (!(a !== void 0 && c(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
      t[dt(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, a)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, a, n) {
    const s = this._getStacks(t, n), o = a !== void 0 ? s.indexOf(a) : -1;
    return o === -1 ? s.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, a = this._cachedMeta, n = a.iScale, s = [];
    let o, i;
    for (o = 0, i = a.data.length; o < i; ++o)
      s.push(n.getPixelForValue(this.getParsed(o)[n.axis], o));
    const r = t.barThickness;
    return {
      min: r || vc(a),
      pixels: s,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: a, _stacked: n, index: s }, options: { base: o, minBarLength: i } } = this, r = o || 0, l = this.getParsed(t), c = l._custom, u = sn(c);
    let f = l[a.axis], g = 0, p = n ? this.applyStack(a, l, n) : f, h, m;
    p !== f && (g = p - f, p = f), u && (f = c.barStart, p = c.barEnd - c.barStart, f !== 0 && ee(f) !== ee(c.barEnd) && (g = 0), g += f);
    const y = !yt(o) && !u ? o : g;
    let _ = a.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? h = a.getPixelForValue(g + p) : h = _, m = h - _, Math.abs(m) < i) {
      m = _c(m, a, r) * i, f === r && (_ -= m / 2);
      const $ = a.getPixelForDecimal(0), A = a.getPixelForDecimal(1), T = Math.min($, A), w = Math.max($, A);
      _ = Math.max(Math.min(_, w), T), h = _ + m, n && !u && (l._stacks[a.axis]._visualValues[s] = a.getValueForPixel(h) - a.getValueForPixel(_));
    }
    if (_ === a.getPixelForValue(r)) {
      const $ = ee(m) * a.getLineWidthForValue(r) / 2;
      _ += $, m -= $;
    }
    return {
      size: m,
      base: _,
      head: h,
      center: h + m / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, s = this.options, o = s.skipNull, i = dt(s.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = o ? this._getStackCount(t) : a.stackCount, f = s.barThickness === "flex" ? bc(t, a, s, u * c) : mc(t, a, s, u * c), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(dt(g, this.getFirstScaleIdForIndexAxis())), h = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + p;
      r = f.start + f.chunk * h + f.chunk / 2, l = Math.min(i, f.chunk * f.ratio);
    } else
      r = n.getPixelForValue(this.getParsed(t)[n.axis], t), l = Math.min(i, a.min * a.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, a = t.vScale, n = t.data, s = n.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[a.axis] !== null && !n[o].hidden && n[o].draw(this._ctx);
  }
}
function Mc(e, t, a) {
  let n = 1, s = 1, o = 0, i = 0;
  if (t < Ct) {
    const r = e, l = r + t, c = Math.cos(r), u = Math.sin(r), f = Math.cos(l), g = Math.sin(l), p = (A, T, w) => fa(A, r, l, !0) ? 1 : Math.max(T, T * a, w, w * a), h = (A, T, w) => fa(A, r, l, !0) ? -1 : Math.min(T, T * a, w, w * a), m = p(0, c, f), y = p(Tt, u, g), _ = h(kt, c, f), $ = h(kt + Tt, u, g);
    n = (m - _) / 2, s = (y - $) / 2, o = -(m + _) / 2, i = -(y + $) / 2;
  }
  return {
    ratioX: n,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Sc extends Ya {
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
            const a = t.data, { labels: { pointStyle: n, textAlign: s, color: o, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return a.labels.length && a.datasets.length ? a.labels.map((l, c) => {
              const f = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: f.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(c),
                lineDash: f.borderDash,
                lineDashOffset: f.borderDashOffset,
                lineJoin: f.borderJoinStyle,
                lineWidth: f.borderWidth,
                strokeStyle: f.borderColor,
                textAlign: s,
                pointStyle: n,
                borderRadius: i && (r || f.borderRadius),
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
    const n = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = n;
    else {
      let o = (l) => +n[l];
      if (pt(n[t])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +Pe(n[c], l);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return le(this.options.rotation - 90);
  }
  _getCircumference() {
    return le(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ct, a = -Ct;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const s = this.chart.getDatasetMeta(n).controller, o = s._getRotation(), i = s._getCircumference();
        t = Math.min(t, o), a = Math.max(a, o + i);
      }
    return {
      rotation: t,
      circumference: a - t
    };
  }
  update(t) {
    const a = this.chart, { chartArea: n } = a, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - i) / 2, 0), l = Math.min(Fr(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: f } = this._getRotationExtents(), { ratioX: g, ratioY: p, offsetX: h, offsetY: m } = Mc(f, u, l), y = (n.width - i) / g, _ = (n.height - i) / p, $ = Math.max(Math.min(y, _) / 2, 0), A = Ko(this.options.radius, $), T = Math.max(A * l, 0), w = (A - T) / this._getVisibleDatasetWeightTotal();
    this.offsetX = h * A, this.offsetY = m * A, s.total = this.calculateTotal(), this.outerRadius = A - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, a) {
    const n = this.options, s = this._cachedMeta, o = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Ct);
  }
  updateElements(t, a, n, s) {
    const o = s === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, u = (r.left + r.right) / 2, f = (r.top + r.bottom) / 2, g = o && c.animateScale, p = g ? 0 : this.innerRadius, h = g ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: y } = this._getSharedOptions(a, s);
    let _ = this._getRotation(), $;
    for ($ = 0; $ < a; ++$)
      _ += this._circumference($, o);
    for ($ = a; $ < a + n; ++$) {
      const A = this._circumference($, o), T = t[$], w = {
        x: u + this.offsetX,
        y: f + this.offsetY,
        startAngle: _,
        endAngle: _ + A,
        circumference: A,
        outerRadius: h,
        innerRadius: p
      };
      y && (w.options = m || this.resolveDataElementOptions($, T.active ? "active" : s)), _ += A, this.updateElement(T, $, w, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, a = t.data;
    let n = 0, s;
    for (s = 0; s < a.length; s++) {
      const o = t._parsed[s];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !a[s].hidden && (n += Math.abs(o));
    }
    return n;
  }
  calculateCircumference(t) {
    const a = this._cachedMeta.total;
    return a > 0 && !isNaN(t) ? Ct * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = this.chart, s = n.data.labels || [], o = qn(a._parsed[t], n.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let a = 0;
    const n = this.chart;
    let s, o, i, r, l;
    if (!t) {
      for (s = 0, o = n.data.datasets.length; s < o; ++s)
        if (n.isDatasetVisible(s)) {
          i = n.getDatasetMeta(s), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (s = 0, o = t.length; s < o; ++s)
      l = r.resolveDataElementOptions(s), l.borderAlign !== "inner" && (a = Math.max(a, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return a;
  }
  getMaxOffset(t) {
    let a = 0;
    for (let n = 0, s = t.length; n < s; ++n) {
      const o = this.resolveDataElementOptions(n);
      a = Math.max(a, o.offset || 0, o.hoverOffset || 0);
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
    return Math.max(dt(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Dc extends Ya {
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
    const a = this._cachedMeta, { dataset: n, data: s = [], _dataset: o } = a, i = this.chart._animationsDisabled;
    let { start: r, count: l } = Jr(a, s, i);
    this._drawStart = r, this._drawCount = l, tl(a) && (r = 0, l = s.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, r, l, t);
  }
  updateElements(t, a, n, s) {
    const o = s === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: f } = this._getSharedOptions(a, s), g = i.axis, p = r.axis, { spanGaps: h, segment: m } = this.options, y = ha(h) ? h : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || o || s === "none", $ = a + n, A = t.length;
    let T = a > 0 && this.getParsed(a - 1);
    for (let w = 0; w < A; ++w) {
      const x = t[w], k = _ ? x : {};
      if (w < a || w >= $) {
        k.skip = !0;
        continue;
      }
      const S = this.getParsed(w), F = yt(S[p]), B = k[g] = i.getPixelForValue(S[g], w), M = k[p] = o || F ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, S, l) : S[p], w);
      k.skip = isNaN(B) || isNaN(M) || F, k.stop = w > 0 && Math.abs(S[g] - T[g]) > y, m && (k.parsed = S, k.raw = c.data[w]), f && (k.options = u || this.resolveDataElementOptions(w, x.active ? "active" : s)), _ || this.updateElement(x, w, k, s), T = S;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, a = t.dataset, n = a.options && a.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return n;
    const o = s[0].size(this.resolveDataElementOptions(0)), i = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(n, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class Ac extends Sc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Se() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Jn {
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
    Object.assign(Jn.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Se();
  }
  parse() {
    return Se();
  }
  format() {
    return Se();
  }
  add() {
    return Se();
  }
  diff() {
    return Se();
  }
  startOf() {
    return Se();
  }
  endOf() {
    return Se();
  }
}
var Tc = {
  _date: Jn
};
function Bc(e, t, a, n) {
  const { controller: s, data: o, _sorted: i } = e, r = s._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const c = r._reversePixels ? Ur : Be;
    if (n) {
      if (s._sharedOptions) {
        const u = o[0], f = typeof u.getRange == "function" && u.getRange(t);
        if (f) {
          const g = c(o, t, a - f), p = c(o, t, a + f);
          return {
            lo: g.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const u = c(o, t, a);
      if (l) {
        const { vScale: f } = s._cachedMeta, { _parsed: g } = e, p = g.slice(0, u.lo + 1).reverse().findIndex((m) => !yt(m[f.axis]));
        u.lo -= Math.max(0, p);
        const h = g.slice(u.hi).findIndex((m) => !yt(m[f.axis]));
        u.hi += Math.max(0, h);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function qa(e, t, a, n, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: c, data: u } = o[r], { lo: f, hi: g } = Bc(o[r], t, i, s);
    for (let p = f; p <= g; ++p) {
      const h = u[p];
      h.skip || n(h, c, p);
    }
  }
}
function Lc(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, s) {
    const o = t ? Math.abs(n.x - s.x) : 0, i = a ? Math.abs(n.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function on(e, t, a, n, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || qa(e, a, t, function(r, l, c) {
    !s && !ga(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && o.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function Fc(e, t, a, n) {
  let s = [];
  function o(i, r, l) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: f } = Go(i, {
      x: t.x,
      y: t.y
    });
    fa(f, c, u) && s.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return qa(e, a, t, o), s;
}
function Pc(e, t, a, n, s, o) {
  let i = [];
  const r = Lc(a);
  let l = Number.POSITIVE_INFINITY;
  function c(u, f, g) {
    const p = u.inRange(t.x, t.y, s);
    if (n && !p)
      return;
    const h = u.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(h)) && !p)
      return;
    const y = r(t, h);
    y < l ? (i = [
      {
        element: u,
        datasetIndex: f,
        index: g
      }
    ], l = y) : y === l && i.push({
      element: u,
      datasetIndex: f,
      index: g
    });
  }
  return qa(e, a, t, c), i;
}
function rn(e, t, a, n, s, o) {
  return !o && !e.isPointInArea(t) ? [] : a === "r" && !n ? Fc(e, t, a, s) : Pc(e, t, a, n, s, o);
}
function zs(e, t, a, n, s) {
  const o = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return qa(e, a, t, (l, c, u) => {
    l[i] && l[i](t[a], s) && (o.push({
      element: l,
      datasetIndex: c,
      index: u
    }), r = r || l.inRange(t.x, t.y, s));
  }), n && !r ? [] : o;
}
var Rc = {
  modes: {
    index(e, t, a, n) {
      const s = Ae(t, e), o = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? on(e, s, o, n, i) : rn(e, s, o, !1, n, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = r[0].index, f = c.data[u];
        f && !f.skip && l.push({
          element: f,
          datasetIndex: c.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, a, n) {
      const s = Ae(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? on(e, s, o, n, i) : rn(e, s, o, !1, n, i);
      if (r.length > 0) {
        const l = r[0].datasetIndex, c = e.getDatasetMeta(l).data;
        r = [];
        for (let u = 0; u < c.length; ++u)
          r.push({
            element: c[u],
            datasetIndex: l,
            index: u
          });
      }
      return r;
    },
    point(e, t, a, n) {
      const s = Ae(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return on(e, s, o, n, i);
    },
    nearest(e, t, a, n) {
      const s = Ae(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return rn(e, s, o, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const s = Ae(t, e);
      return zs(e, s, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const s = Ae(t, e);
      return zs(e, s, "y", a.intersect, n);
    }
  }
};
const bi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ue(e, t) {
  return e.filter((a) => a.pos === t);
}
function Ns(e, t) {
  return e.filter((a) => bi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Xe(e, t) {
  return e.sort((a, n) => {
    const s = t ? n : a, o = t ? a : n;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function Ic(e) {
  const t = [];
  let a, n, s, o, i, r;
  for (a = 0, n = (e || []).length; a < n; ++a)
    s = e[a], { position: o, options: { stack: i, stackWeight: r = 1 } } = s, t.push({
      index: a,
      box: s,
      pos: o,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: i && o + i,
      stackWeight: r
    });
  return t;
}
function Ec(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: s, stackWeight: o } = a;
    if (!n || !bi.includes(s))
      continue;
    const i = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += o;
  }
  return t;
}
function Oc(e, t) {
  const a = Ec(e), { vBoxMaxWidth: n, hBoxMaxHeight: s } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, c = a[r.stack], u = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = u ? u * n : l && t.availableWidth, r.height = s) : (r.width = n, r.height = u ? u * s : l && t.availableHeight);
  }
  return a;
}
function Vc(e) {
  const t = Ic(e), a = Xe(t.filter((c) => c.box.fullSize), !0), n = Xe(Ue(t, "left"), !0), s = Xe(Ue(t, "right")), o = Xe(Ue(t, "top"), !0), i = Xe(Ue(t, "bottom")), r = Ns(t, "x"), l = Ns(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(o),
    rightAndBottom: s.concat(l).concat(i).concat(r),
    chartArea: Ue(t, "chartArea"),
    vertical: n.concat(s).concat(l),
    horizontal: o.concat(i).concat(r)
  };
}
function Ws(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function yi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function zc(e, t, a, n) {
  const { pos: s, box: o } = a, i = e.maxPadding;
  if (!pt(s)) {
    a.size && (e[s] -= a.size);
    const f = n[a.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, a.horizontal ? o.height : o.width), a.size = f.size / f.count, e[s] += a.size;
  }
  o.getPadding && yi(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - Ws(i, e, "left", "right")), l = Math.max(0, t.outerHeight - Ws(i, e, "top", "bottom")), c = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, a.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Nc(e) {
  const t = e.maxPadding;
  function a(n) {
    const s = Math.max(t[n] - e[n], 0);
    return e[n] += s, s;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Wc(e, t) {
  const a = t.maxPadding;
  function n(s) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((i) => {
      o[i] = Math.max(t[i], a[i]);
    }), o;
  }
  return n(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ea(e, t, a, n) {
  const s = [];
  let o, i, r, l, c, u;
  for (o = 0, i = e.length, c = 0; o < i; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, Wc(r.horizontal, t));
    const { same: f, other: g } = zc(t, a, r, n);
    c |= f && s.length, u = u || g, l.fullSize || s.push(r);
  }
  return c && ea(s, t, a, n) || u;
}
function Ca(e, t, a, n, s) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + s, e.width = n, e.height = s;
}
function Hs(e, t, a, n) {
  const s = a.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const f = t.w * u, g = c.size || l.height;
      ua(c.start) && (i = c.start), l.fullSize ? Ca(l, s.left, i, a.outerWidth - s.right - s.left, g) : Ca(l, t.left + c.placed, i, f, g), c.start = i, c.placed += f, i = l.bottom;
    } else {
      const f = t.h * u, g = c.size || l.width;
      ua(c.start) && (o = c.start), l.fullSize ? Ca(l, o, s.top, g, a.outerHeight - s.bottom - s.top) : Ca(l, o, t.top + c.placed, g, f), c.start = o, c.placed += f, o = l.right;
    }
  }
  t.x = o, t.y = i;
}
var qt = {
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
    const s = Ut(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(a - s.height, 0), r = Vc(e.boxes), l = r.vertical, c = r.horizontal;
    _t(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const u = l.reduce((m, y) => y.box.options && y.box.options.display === !1 ? m : m + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), g = Object.assign({}, s);
    yi(g, Ut(n));
    const p = Object.assign({
      maxPadding: g,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), h = Oc(l.concat(c), f);
    ea(r.fullSize, p, f, h), ea(l, p, f, h), ea(c, p, f, h) && ea(l, p, f, h), Nc(p), Hs(r.leftAndTop, p, f, h), p.x += p.w, p.y += p.h, Hs(r.rightAndBottom, p, f, h), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, _t(r.chartArea, (m) => {
      const y = m.box;
      Object.assign(y, e.chartArea), y.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class _i {
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
  getMaximumSize(t, a, n, s) {
    return a = Math.max(0, a || t.width), n = n || t.height, {
      width: a,
      height: Math.max(0, s ? Math.floor(a / s) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Hc extends _i {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Ba = "$chartjs", jc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, js = (e) => e === null || e === "";
function Yc(e, t) {
  const a = e.style, n = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[Ba] = {
    initial: {
      height: n,
      width: s,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", js(s)) {
    const o = Ss(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (js(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ss(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const xi = Hl ? {
  passive: !0
} : !1;
function qc(e, t, a) {
  e && e.addEventListener(t, a, xi);
}
function Kc(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, xi);
}
function Uc(e, t) {
  const a = jc[e.type] || e.type, { x: n, y: s } = Ae(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: s !== void 0 ? s : null
  };
}
function za(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Xc(e, t, a) {
  const n = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || za(r.addedNodes, n), i = i && !za(r.removedNodes, n);
    i && a();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Gc(e, t, a) {
  const n = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || za(r.removedNodes, n), i = i && !za(r.addedNodes, n);
    i && a();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const va = /* @__PURE__ */ new Map();
let Ys = 0;
function ki() {
  const e = window.devicePixelRatio;
  e !== Ys && (Ys = e, va.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Zc(e, t) {
  va.size || window.addEventListener("resize", ki), va.set(e, t);
}
function Qc(e) {
  va.delete(e), va.size || window.removeEventListener("resize", ki);
}
function Jc(e, t, a) {
  const n = e.canvas, s = n && Qn(n);
  if (!s)
    return;
  const o = ti((r, l) => {
    const c = s.clientWidth;
    a(r, l), c < s.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, u = l.contentRect.height;
    c === 0 && u === 0 || o(c, u);
  });
  return i.observe(s), Zc(e, o), i;
}
function ln(e, t, a) {
  a && a.disconnect(), t === "resize" && Qc(e);
}
function td(e, t, a) {
  const n = e.canvas, s = ti((o) => {
    e.ctx !== null && a(Uc(o, e));
  }, e);
  return qc(n, t, s), s;
}
class ed extends _i {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Yc(t, a), n) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[Ba])
      return !1;
    const n = a[Ba].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = n[o];
      yt(i) ? a.removeAttribute(o) : a.setAttribute(o, i);
    });
    const s = n.style || {};
    return Object.keys(s).forEach((o) => {
      a.style[o] = s[o];
    }), a.width = a.width, delete a[Ba], !0;
  }
  addEventListener(t, a, n) {
    this.removeEventListener(t, a);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: Xc,
      detach: Gc,
      resize: Jc
    }[a] || td;
    s[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), s = n[a];
    if (!s)
      return;
    ({
      attach: ln,
      detach: ln,
      resize: ln
    }[a] || Kc)(t, a, s), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, s) {
    return Wl(t, a, n, s);
  }
  isAttached(t) {
    const a = t && Qn(t);
    return !!(a && a.isConnected);
  }
}
function ad(e) {
  return !Zn() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Hc : ed;
}
let ue = class {
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
    return ha(this.x) && ha(this.y);
  }
  getProps(t, a) {
    const n = this.$animations;
    if (!a || !n)
      return this;
    const s = {};
    return t.forEach((o) => {
      s[o] = n[o] && n[o].active() ? n[o]._to : this[o];
    }), s;
  }
};
function nd(e, t) {
  const a = e.options.ticks, n = sd(e), s = Math.min(a.maxTicksLimit || n, n), o = a.major.enabled ? id(t) : [], i = o.length, r = o[0], l = o[i - 1], c = [];
  if (i > s)
    return rd(t, c, o, i / s), c;
  const u = od(o, t, s);
  if (i > 0) {
    let f, g;
    const p = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (Ma(t, c, u, yt(p) ? 0 : r - p, r), f = 0, g = i - 1; f < g; f++)
      Ma(t, c, u, o[f], o[f + 1]);
    return Ma(t, c, u, l, yt(p) ? t.length : l + p), c;
  }
  return Ma(t, c, u), c;
}
function sd(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), s = e._maxLength / a;
  return Math.floor(Math.min(n, s));
}
function od(e, t, a) {
  const n = ld(e), s = t.length / a;
  if (!n)
    return Math.max(s, 1);
  const o = Nr(n);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const l = o[i];
    if (l > s)
      return l;
  }
  return Math.max(s, 1);
}
function id(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function rd(e, t, a, n) {
  let s = 0, o = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = a[s * n]);
}
function Ma(e, t, a, n, s) {
  const o = dt(n, 0), i = Math.min(dt(s, e.length), e.length);
  let r = 0, l, c, u;
  for (a = Math.ceil(a), s && (l = s - n, a = l / Math.floor(l / a)), u = o; u < 0; )
    r++, u = Math.round(o + r * a);
  for (c = Math.max(o, 0); c < i; c++)
    c === u && (t.push(e[c]), r++, u = Math.round(o + r * a));
}
function ld(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const cd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, qs = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Ks = (e, t) => Math.min(t || e, e);
function Us(e, t) {
  const a = [], n = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += n)
    a.push(e[Math.floor(o)]);
  return a;
}
function dd(e, t, a) {
  const n = e.ticks.length, s = Math.min(t, n - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(s), c;
  if (!(a && (n === 1 ? c = Math.max(l - o, i - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(s - 1)) / 2, l += s < t ? c : -c, l < o - r || l > i + r)))
    return l;
}
function ud(e, t) {
  _t(e, (a) => {
    const n = a.gc, s = n.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete a.data[n[o]];
      n.splice(0, s);
    }
  });
}
function Ge(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Xs(e, t) {
  if (!e.display)
    return 0;
  const a = Rt(e.font, t), n = Ut(e.padding);
  return (Dt(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function hd(e, t) {
  return Ee(e, {
    scale: t,
    type: "scale"
  });
}
function fd(e, t, a) {
  return Ee(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function gd(e, t, a) {
  let n = jn(e);
  return (a && t !== "right" || !a && t === "right") && (n = cd(n)), n;
}
function pd(e, t, a, n) {
  const { top: s, left: o, bottom: i, right: r, chart: l } = e, { chartArea: c, scales: u } = l;
  let f = 0, g, p, h;
  const m = i - s, y = r - o;
  if (e.isHorizontal()) {
    if (p = Ft(n, o, r), pt(a)) {
      const _ = Object.keys(a)[0], $ = a[_];
      h = u[_].getPixelForValue($) + m - t;
    } else a === "center" ? h = (c.bottom + c.top) / 2 + m - t : h = qs(e, a, t);
    g = r - o;
  } else {
    if (pt(a)) {
      const _ = Object.keys(a)[0], $ = a[_];
      p = u[_].getPixelForValue($) - y + t;
    } else a === "center" ? p = (c.left + c.right) / 2 - y + t : p = qs(e, a, t);
    h = Ft(n, i, s), f = a === "left" ? -Tt : Tt;
  }
  return {
    titleX: p,
    titleY: h,
    maxWidth: g,
    rotation: f
  };
}
class Ye extends ue {
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
    let { _userMin: t, _userMax: a, _suggestedMin: n, _suggestedMax: s } = this;
    return t = Zt(t, Number.POSITIVE_INFINITY), a = Zt(a, Number.NEGATIVE_INFINITY), n = Zt(n, Number.POSITIVE_INFINITY), s = Zt(s, Number.NEGATIVE_INFINITY), {
      min: Zt(t, n),
      max: Zt(a, s),
      minDefined: Et(t),
      maxDefined: Et(a)
    };
  }
  getMinMax(t) {
    let { min: a, max: n, minDefined: s, maxDefined: o } = this.getUserBounds(), i;
    if (s && o)
      return {
        min: a,
        max: n
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      i = r[l].controller.getMinMax(this, t), s || (a = Math.min(a, i.min)), o || (n = Math.max(n, i.max));
    return a = o && a > n ? n : a, n = s && a > n ? a : n, {
      min: Zt(a, Zt(n, a)),
      max: Zt(n, Zt(a, n))
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
  update(t, a, n) {
    const { beginAtZero: s, grace: o, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = _l(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? Us(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = nd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
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
    const a = this.options.ticks;
    let n, s, o;
    for (n = 0, s = t.length; n < s; n++)
      o = t[n], o.label = $t(a.callback, [
        o.value,
        n,
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
    const t = this.options, a = t.ticks, n = Ks(this.ticks.length, t.ticks.maxTicksLimit), s = a.minRotation || 0, o = a.maxRotation;
    let i = s, r, l, c;
    if (!this._isVisible() || !a.display || s >= o || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(), f = u.widest.width, g = u.highest.height, p = Pt(this.chart.width - f, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : p / (n - 1), f + 6 > r && (r = p / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - Ge(t.grid) - a.padding - Xs(t.title, this.chart.options.font), c = Math.sqrt(f * f + g * g), i = Yr(Math.min(Math.asin(Pt((u.highest.height + 6) / r, -1, 1)), Math.asin(Pt(l / c, -1, 1)) - Math.asin(Pt(g / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
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
    }, { chart: a, options: { ticks: n, title: s, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = Xs(s, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Ge(o) + l) : (t.height = this.maxHeight, t.width = Ge(o) + l), n.display && this.ticks.length) {
        const { first: c, last: u, widest: f, highest: g } = this._getLabelSizes(), p = n.padding * 2, h = le(this.labelRotation), m = Math.cos(h), y = Math.sin(h);
        if (r) {
          const _ = n.mirror ? 0 : y * f.width + m * g.height;
          t.height = Math.min(this.maxHeight, t.height + _ + p);
        } else {
          const _ = n.mirror ? 0 : m * f.width + y * g.height;
          t.width = Math.min(this.maxWidth, t.width + _ + p);
        }
        this._calculatePadding(c, u, y, m);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, s) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let g = 0, p = 0;
      l ? c ? (g = s * t.width, p = n * a.height) : (g = n * t.height, p = s * a.width) : o === "start" ? p = a.width : o === "end" ? g = t.width : o !== "inner" && (g = t.width / 2, p = a.width / 2), this.paddingLeft = Math.max((g - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((p - f + i) * this.width / (this.width - f), 0);
    } else {
      let u = a.height / 2, f = t.height / 2;
      o === "start" ? (u = 0, f = t.height) : o === "end" && (u = a.height, f = 0), this.paddingTop = u + i, this.paddingBottom = f + i;
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
      yt(t[a].label) && (t.splice(a, 1), n--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let n = this.ticks;
      a < n.length && (n = Us(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: s, _longestTextCache: o } = this, i = [], r = [], l = Math.floor(a / Ks(a, n));
    let c = 0, u = 0, f, g, p, h, m, y, _, $, A, T, w;
    for (f = 0; f < a; f += l) {
      if (h = t[f].label, m = this._resolveTickFontOptions(f), s.font = y = m.string, _ = o[y] = o[y] || {
        data: {},
        gc: []
      }, $ = m.lineHeight, A = T = 0, !yt(h) && !Dt(h))
        A = ks(s, _.data, _.gc, A, h), T = $;
      else if (Dt(h))
        for (g = 0, p = h.length; g < p; ++g)
          w = h[g], !yt(w) && !Dt(w) && (A = ks(s, _.data, _.gc, A, w), T += $);
      i.push(A), r.push(T), c = Math.max(A, c), u = Math.max(T, u);
    }
    ud(o, a);
    const x = i.indexOf(c), k = r.indexOf(u), S = (F) => ({
      width: i[F] || 0,
      height: r[F] || 0
    });
    return {
      first: S(0),
      last: S(a - 1),
      widest: S(x),
      highest: S(k),
      widths: i,
      heights: r
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
    return Kr(this._alignToPixels ? Me(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = fd(this.getContext(), t, n));
    }
    return this.$context || (this.$context = hd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = le(this.labelRotation), n = Math.abs(Math.cos(a)), s = Math.abs(Math.sin(a)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, l = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? l * n > r * s ? r / n : l / s : l * s < r * n ? l / n : r / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, s = this.options, { grid: o, position: i, border: r } = s, l = o.offset, c = this.isHorizontal(), f = this.ticks.length + (l ? 1 : 0), g = Ge(o), p = [], h = r.setContext(this.getContext()), m = h.display ? h.width : 0, y = m / 2, _ = function(X) {
      return Me(n, X, m);
    };
    let $, A, T, w, x, k, S, F, B, M, L, E;
    if (i === "top")
      $ = _(this.bottom), k = this.bottom - g, F = $ - y, M = _(t.top) + y, E = t.bottom;
    else if (i === "bottom")
      $ = _(this.top), M = t.top, E = _(t.bottom) - y, k = $ + y, F = this.top + g;
    else if (i === "left")
      $ = _(this.right), x = this.right - g, S = $ - y, B = _(t.left) + y, L = t.right;
    else if (i === "right")
      $ = _(this.left), B = t.left, L = _(t.right) - y, x = $ + y, S = this.left + g;
    else if (a === "x") {
      if (i === "center")
        $ = _((t.top + t.bottom) / 2 + 0.5);
      else if (pt(i)) {
        const X = Object.keys(i)[0], j = i[X];
        $ = _(this.chart.scales[X].getPixelForValue(j));
      }
      M = t.top, E = t.bottom, k = $ + y, F = k + g;
    } else if (a === "y") {
      if (i === "center")
        $ = _((t.left + t.right) / 2);
      else if (pt(i)) {
        const X = Object.keys(i)[0], j = i[X];
        $ = _(this.chart.scales[X].getPixelForValue(j));
      }
      x = $ - y, S = x - g, B = t.left, L = t.right;
    }
    const H = dt(s.ticks.maxTicksLimit, f), K = Math.max(1, Math.ceil(f / H));
    for (A = 0; A < f; A += K) {
      const X = this.getContext(A), j = o.setContext(X), I = r.setContext(X), R = j.lineWidth, z = j.color, N = I.dash || [], G = I.dashOffset, ot = j.tickWidth, J = j.tickColor, ct = j.tickBorderDash || [], rt = j.tickBorderDashOffset;
      T = dd(this, A, l), T !== void 0 && (w = Me(n, T, R), c ? x = S = B = L = w : k = F = M = E = w, p.push({
        tx1: x,
        ty1: k,
        tx2: S,
        ty2: F,
        x1: B,
        y1: M,
        x2: L,
        y2: E,
        width: R,
        color: z,
        borderDash: N,
        borderDashOffset: G,
        tickWidth: ot,
        tickColor: J,
        tickBorderDash: ct,
        tickBorderDashOffset: rt
      }));
    }
    return this._ticksLength = f, this._borderValue = $, p;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: s, ticks: o } = n, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: u, mirror: f } = o, g = Ge(n.grid), p = g + u, h = f ? -u : p, m = -le(this.labelRotation), y = [];
    let _, $, A, T, w, x, k, S, F, B, M, L, E = "middle";
    if (s === "top")
      x = this.bottom - h, k = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      x = this.top + h, k = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const K = this._getYAxisLabelAlignment(g);
      k = K.textAlign, w = K.x;
    } else if (s === "right") {
      const K = this._getYAxisLabelAlignment(g);
      k = K.textAlign, w = K.x;
    } else if (a === "x") {
      if (s === "center")
        x = (t.top + t.bottom) / 2 + p;
      else if (pt(s)) {
        const K = Object.keys(s)[0], X = s[K];
        x = this.chart.scales[K].getPixelForValue(X) + p;
      }
      k = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (s === "center")
        w = (t.left + t.right) / 2 - p;
      else if (pt(s)) {
        const K = Object.keys(s)[0], X = s[K];
        w = this.chart.scales[K].getPixelForValue(X);
      }
      k = this._getYAxisLabelAlignment(g).textAlign;
    }
    a === "y" && (l === "start" ? E = "top" : l === "end" && (E = "bottom"));
    const H = this._getLabelSizes();
    for (_ = 0, $ = r.length; _ < $; ++_) {
      A = r[_], T = A.label;
      const K = o.setContext(this.getContext(_));
      S = this.getPixelForTick(_) + o.labelOffset, F = this._resolveTickFontOptions(_), B = F.lineHeight, M = Dt(T) ? T.length : 1;
      const X = M / 2, j = K.color, I = K.textStrokeColor, R = K.textStrokeWidth;
      let z = k;
      i ? (w = S, k === "inner" && (_ === $ - 1 ? z = this.options.reverse ? "left" : "right" : _ === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), s === "top" ? c === "near" || m !== 0 ? L = -M * B + B / 2 : c === "center" ? L = -H.highest.height / 2 - X * B + B : L = -H.highest.height + B / 2 : c === "near" || m !== 0 ? L = B / 2 : c === "center" ? L = H.highest.height / 2 - X * B : L = H.highest.height - M * B, f && (L *= -1), m !== 0 && !K.showLabelBackdrop && (w += B / 2 * Math.sin(m))) : (x = S, L = (1 - M) * B / 2);
      let N;
      if (K.showLabelBackdrop) {
        const G = Ut(K.backdropPadding), ot = H.heights[_], J = H.widths[_];
        let ct = L - G.top, rt = 0 - G.left;
        switch (E) {
          case "middle":
            ct -= ot / 2;
            break;
          case "bottom":
            ct -= ot;
            break;
        }
        switch (k) {
          case "center":
            rt -= J / 2;
            break;
          case "right":
            rt -= J;
            break;
          case "inner":
            _ === $ - 1 ? rt -= J : _ > 0 && (rt -= J / 2);
            break;
        }
        N = {
          left: rt,
          top: ct,
          width: J + G.width,
          height: ot + G.height,
          color: K.backdropColor
        };
      }
      y.push({
        label: T,
        font: F,
        textOffset: L,
        options: {
          rotation: m,
          color: j,
          strokeColor: I,
          strokeWidth: R,
          textAlign: z,
          textBaseline: E,
          translation: [
            w,
            x
          ],
          backdrop: N
        }
      });
    }
    return y;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-le(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return a.align === "start" ? s = "left" : a.align === "end" ? s = "right" : a.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: n, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), r = t + o, l = i.widest.width;
    let c, u;
    return a === "left" ? s ? (u = this.right + o, n === "near" ? c = "left" : n === "center" ? (c = "center", u += l / 2) : (c = "right", u += l)) : (u = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= l / 2) : (c = "left", u = this.left)) : a === "right" ? s ? (u = this.left + o, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= l / 2) : (c = "left", u -= l)) : (u = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", u += l / 2) : (c = "right", u = this.right)) : c = "right", {
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
    const { ctx: t, options: { backgroundColor: a }, left: n, top: s, width: o, height: i } = this;
    a && (t.save(), t.fillStyle = a, t.fillRect(n, s, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const a = this.options.grid;
    if (!this._isVisible() || !a.display)
      return 0;
    const s = this.ticks.findIndex((o) => o.value === t);
    return s >= 0 ? a.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const a = this.options.grid, n = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const r = (l, c, u) => {
      !u.width || !u.color || (n.save(), n.lineWidth = u.width, n.strokeStyle = u.color, n.setLineDash(u.borderDash || []), n.lineDashOffset = u.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (a.display)
      for (o = 0, i = s.length; o < i; ++o) {
        const l = s[o];
        a.drawOnChartArea && r({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), a.drawTicks && r({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: a, options: { border: n, grid: s } } = this, o = n.setContext(this.getContext()), i = n.display ? o.width : 0;
    if (!i)
      return;
    const r = s.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, u, f, g;
    this.isHorizontal() ? (c = Me(t, this.left, i) - i / 2, u = Me(t, this.right, r) + r / 2, f = g = l) : (f = Me(t, this.top, i) - i / 2, g = Me(t, this.bottom, r) + r / 2, c = u = l), a.save(), a.lineWidth = o.width, a.strokeStyle = o.color, a.beginPath(), a.moveTo(c, f), a.lineTo(u, g), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, s = this._computeLabelArea();
    s && Wa(n, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, l = i.font, c = i.label, u = i.textOffset;
      pa(n, c, 0, u, l, r);
    }
    s && Ha(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: s } } = this;
    if (!n.display)
      return;
    const o = Rt(n.font), i = Ut(n.padding), r = n.align;
    let l = o.lineHeight / 2;
    a === "bottom" || a === "center" || pt(a) ? (l += i.bottom, Dt(n.text) && (l += o.lineHeight * (n.text.length - 1))) : l += i.top;
    const { titleX: c, titleY: u, maxWidth: f, rotation: g } = pd(this, l, a, r);
    pa(t, n.text, 0, 0, o, {
      color: n.color,
      maxWidth: f,
      rotation: g,
      textAlign: gd(r, a, s),
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
    const t = this.options, a = t.ticks && t.ticks.z || 0, n = dt(t.grid && t.grid.z, -1), s = dt(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Ye.prototype.draw ? [
      {
        z: a,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: n,
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
        z: a,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const a = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", s = [];
    let o, i;
    for (o = 0, i = a.length; o < i; ++o) {
      const r = a[o];
      r[n] === this.id && (!t || r.type === t) && s.push(r);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const a = this.options.ticks.setContext(this.getContext(t));
    return Rt(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Sa {
  constructor(t, a, n) {
    this.type = t, this.scope = a, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let n;
    bd(a) && (n = this.register(a));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, vd(t, i, n), this.override && St.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, s = this.scope;
    n in a && delete a[n], s && n in St[s] && (delete St[s][n], this.override && delete Re[n]);
  }
}
function vd(e, t, a) {
  const n = da(/* @__PURE__ */ Object.create(null), [
    a ? St.get(a) : {},
    St.get(t),
    e.defaults
  ]);
  St.set(t, n), e.defaultRoutes && md(t, e.defaultRoutes), e.descriptors && St.describe(t, e.descriptors);
}
function md(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), s = n.pop(), o = [
      e
    ].concat(n).join("."), i = t[a].split("."), r = i.pop(), l = i.join(".");
    St.route(o, s, l, r);
  });
}
function bd(e) {
  return "id" in e && "defaults" in e;
}
class yd {
  constructor() {
    this.controllers = new Sa(Ya, "datasets", !0), this.elements = new Sa(ue, "elements"), this.plugins = new Sa(Object, "plugins"), this.scales = new Sa(Ye, "scales"), this._typedRegistries = [
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
    ].forEach((s) => {
      const o = n || this._getRegistryForType(s);
      n || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : _t(s, (i) => {
        const r = n || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, a, n) {
    const s = Wn(t);
    $t(n["before" + s], [], n), a[t](n), $t(n["after" + s], [], n);
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
    const s = a.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return s;
  }
}
var Jt = /* @__PURE__ */ new yd();
class _d {
  constructor() {
    this._init = void 0;
  }
  notify(t, a, n, s) {
    if (a === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = s ? this._descriptors(t).filter(s) : this._descriptors(t), i = this._notify(o, t, a, n);
    return a === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, a, n, s) {
    s = s || {};
    for (const o of t) {
      const i = o.plugin, r = i[n], l = [
        a,
        s,
        o.options
      ];
      if ($t(r, l, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    yt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const n = t && t.config, s = dt(n.options && n.options.plugins, {}), o = xd(n);
    return s === !1 && !a ? [] : wd(t, o, s, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, s = (o, i) => o.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(s(a, n), t, "stop"), this._notify(s(n, a), t, "start");
  }
}
function xd(e) {
  const t = {}, a = [], n = Object.keys(Jt.plugins.items);
  for (let o = 0; o < n.length; o++)
    a.push(Jt.getPlugin(n[o]));
  const s = e.plugins || [];
  for (let o = 0; o < s.length; o++) {
    const i = s[o];
    a.indexOf(i) === -1 && (a.push(i), t[i.id] = !0);
  }
  return {
    plugins: a,
    localIds: t
  };
}
function kd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function wd(e, { plugins: t, localIds: a }, n, s) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, c = kd(n[l], s);
    c !== null && o.push({
      plugin: r,
      options: $d(e.config, {
        plugin: r,
        local: a[l]
      }, c, i)
    });
  }
  return o;
}
function $d(e, { plugin: t, local: a }, n, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(n, o);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Fn(e, t) {
  const a = St.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function Cd(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function Md(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Gs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Sd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Pn(e, ...t) {
  if (Gs(e))
    return e;
  for (const a of t) {
    const n = a.axis || Sd(a.position) || e.length > 1 && Gs(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Zs(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Dd(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Zs(e, "x", a[0]) || Zs(e, "y", a[0]);
  }
  return {};
}
function Ad(e, t) {
  const a = Re[e.type] || {
    scales: {}
  }, n = t.scales || {}, s = Fn(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const r = n[i];
    if (!pt(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = Pn(i, r, Dd(i, e), St.scales[r.type]), c = Md(l, s), u = a.scales || {};
    o[i] = na(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || Fn(r, t), u = (Re[r] || {}).scales || {};
    Object.keys(u).forEach((f) => {
      const g = Cd(f, l), p = i[g + "AxisID"] || g;
      o[p] = o[p] || /* @__PURE__ */ Object.create(null), na(o[p], [
        {
          axis: g
        },
        n[p],
        u[f]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    na(r, [
      St.scales[r.type],
      St.scale
    ]);
  }), o;
}
function wi(e) {
  const t = e.options || (e.options = {});
  t.plugins = dt(t.plugins, {}), t.scales = Ad(e, t);
}
function $i(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Td(e) {
  return e = e || {}, e.data = $i(e.data), wi(e), e;
}
const Qs = /* @__PURE__ */ new Map(), Ci = /* @__PURE__ */ new Set();
function Da(e, t) {
  let a = Qs.get(e);
  return a || (a = t(), Qs.set(e, a), Ci.add(a)), a;
}
const Ze = (e, t, a) => {
  const n = Pe(t, a);
  n !== void 0 && e.add(n);
};
class Bd {
  constructor(t) {
    this._config = Td(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = $i(t);
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
    this.clearCache(), wi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Da(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return Da(`${t}.transition.${a}`, () => [
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
    return Da(`${t}-${a}`, () => [
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
    return Da(`${n}-plugin-${a}`, () => [
      [
        `plugins.${a}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, a) {
    const n = this._scopeCache;
    let s = n.get(t);
    return (!s || a) && (s = /* @__PURE__ */ new Map(), n.set(t, s)), s;
  }
  getOptionScopes(t, a, n) {
    const { options: s, type: o } = this, i = this._cachedScopes(t, n), r = i.get(a);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    a.forEach((u) => {
      t && (l.add(t), u.forEach((f) => Ze(l, t, f))), u.forEach((f) => Ze(l, s, f)), u.forEach((f) => Ze(l, Re[o] || {}, f)), u.forEach((f) => Ze(l, St, f)), u.forEach((f) => Ze(l, Bn, f));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Ci.has(a) && i.set(a, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      Re[a] || {},
      St.datasets[a] || {},
      {
        type: a
      },
      St,
      Bn
    ];
  }
  resolveNamedOptions(t, a, n, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Js(this._resolverCache, t, s);
    let l = i;
    if (Fd(i, a)) {
      o.$shared = !1, n = xe(n) ? n() : n;
      const c = this.createResolver(t, n, r);
      l = He(i, n, c);
    }
    for (const c of a)
      o[c] = l[c];
    return o;
  }
  createResolver(t, a, n = [
    ""
  ], s) {
    const { resolver: o } = Js(this._resolverCache, t, n);
    return pt(a) ? He(o, a, void 0, s) : o;
  }
}
function Js(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const s = a.join();
  let o = n.get(s);
  return o || (o = {
    resolver: Un(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(s, o)), o;
}
const Ld = (e) => pt(e) && Object.getOwnPropertyNames(e).some((t) => xe(e[t]));
function Fd(e, t) {
  const { isScriptable: a, isIndexable: n } = si(e);
  for (const s of t) {
    const o = a(s), i = n(s), r = (i || o) && e[s];
    if (o && (xe(r) || Ld(r)) || i && Dt(r))
      return !0;
  }
  return !1;
}
var Pd = "4.5.1";
const Rd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function to(e, t) {
  return e === "top" || e === "bottom" || Rd.indexOf(e) === -1 && t === "x";
}
function eo(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function ao(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), $t(a && a.onComplete, [
    e
  ], t);
}
function Id(e) {
  const t = e.chart, a = t.options.animation;
  $t(a && a.onProgress, [
    e
  ], t);
}
function Mi(e) {
  return Zn() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const La = {}, no = (e) => {
  const t = Mi(e);
  return Object.values(La).filter((a) => a.canvas === t).pop();
};
function Ed(e, t, a) {
  const n = Object.keys(e);
  for (const s of n) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (a > 0 || o > t) && (e[o + a] = i);
    }
  }
}
function Od(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let qe = class {
  static defaults = St;
  static instances = La;
  static overrides = Re;
  static registry = Jt;
  static version = Pd;
  static getChart = no;
  static register(...t) {
    Jt.add(...t), so();
  }
  static unregister(...t) {
    Jt.remove(...t), so();
  }
  constructor(t, a) {
    const n = this.config = new Bd(a), s = Mi(t), o = no(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || ad(s))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(s, i.aspectRatio), l = r && r.canvas, c = l && l.height, u = l && l.width;
    if (this.id = Lr(), this.ctx = r, this.canvas = l, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new _d(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Zr((f) => this.update(f), i.resizeDelay || 0), this._dataChanges = [], La[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    oe.listen(this, "complete", ao), oe.listen(this, "progress", Id), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: n, height: s, _aspectRatio: o } = this;
    return yt(t) ? a && o ? o : s ? n / s : null : t;
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
    return Jt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ms(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return ws(this.canvas, this.ctx), this;
  }
  stop() {
    return oe.stop(this), this;
  }
  resize(t, a) {
    oe.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const n = this.options, s = this.canvas, o = n.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, a, o), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Ms(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), $t(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    _t(a, (n, s) => {
      n.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, s = Object.keys(n).reduce((i, r) => (i[r] = !1, i), {});
    let o = [];
    a && (o = o.concat(Object.keys(a).map((i) => {
      const r = a[i], l = Pn(i, r), c = l === "r", u = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), _t(o, (i) => {
      const r = i.options, l = r.id, c = Pn(l, r), u = dt(r.type, i.dtype);
      (r.position === void 0 || to(r.position, c) !== to(i.dposition)) && (r.position = i.dposition), s[l] = !0;
      let f = null;
      if (l in n && n[l].type === u)
        f = n[l];
      else {
        const g = Jt.getScale(u);
        f = new g({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[f.id] = f;
      }
      f.init(r, t);
    }), _t(s, (i, r) => {
      i || delete n[r];
    }), _t(n, (i) => {
      qt.configure(this, i, i.options), qt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, n = t.length;
    if (t.sort((s, o) => s.index - o.index), n > a) {
      for (let s = a; s < n; ++s)
        this._destroyDatasetMeta(s);
      t.splice(a, n - a);
    }
    this._sortedMetasets = t.slice(0).sort(eo("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: a } } = this;
    t.length > a.length && delete this._stacks, t.forEach((n, s) => {
      a.filter((o) => o === n._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], a = this.data.datasets;
    let n, s;
    for (this._removeUnreferencedMetasets(), n = 0, s = a.length; n < s; n++) {
      const o = a[n];
      let i = this.getDatasetMeta(n);
      const r = o.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = r, i.indexAxis = o.indexAxis || Fn(r, this.options), i.order = o.order || 0, i.index = n, i.label = "" + o.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const l = Jt.getController(r), { datasetElementType: c, dataElementType: u } = St.datasets[r];
        Object.assign(l, {
          dataElementType: Jt.getElement(u),
          datasetElementType: c && Jt.getElement(c)
        }), i.controller = new l(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    _t(this.data.datasets, (t, a) => {
      this.getDatasetMeta(a).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const a = this.config;
    a.update();
    const n = this._options = a.createResolver(a.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: f } = this.getDatasetMeta(c), g = !s && o.indexOf(f) === -1;
      f.buildOrUpdateElements(g), i = Math.max(+f.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), s || _t(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(eo("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    _t(this.scales, (t) => {
      qt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!fs(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: s, count: o } of a) {
      const i = n === "_removeElements" ? -o : o;
      Ed(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), s = n(0);
    for (let o = 1; o < a; o++)
      if (!fs(s, n(o)))
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
    qt.update(this, this.width, this.height, t);
    const a = this.chartArea, n = a.width <= 0 || a.height <= 0;
    this._layers = [], _t(this.boxes, (s) => {
      n && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, o) => {
      s._idx = o;
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
        this._updateDataset(a, xe(t) ? t({
          datasetIndex: a
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, a) {
    const n = this.getDatasetMeta(t), s = {
      meta: n,
      index: t,
      mode: a,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (n.controller._update(a), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (oe.has(this) ? this.attached && !oe.running(this) && oe.start(this) : (this.draw(), ao({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, s);
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
    let s, o;
    for (s = 0, o = a.length; s < o; ++s) {
      const i = a[s];
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
    }, s = gi(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (s && Wa(a, s), t.controller.draw(), s && Ha(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return ga(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, s) {
    const o = Rc.modes[a];
    return typeof o == "function" ? o(this, t, n, s) : [];
  }
  getDatasetMeta(t) {
    const a = this.data.datasets[t], n = this._metasets;
    let s = n.filter((o) => o && o._dataset === a).pop();
    return s || (s = {
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
    }, n.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Ee(null, {
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
    const s = n ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, s);
    ua(a) ? (o.data[a].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), i.update(o, {
      visible: n
    }), this.update((r) => r.datasetIndex === t ? s : void 0));
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
    for (this.stop(), oe.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ws(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete La[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, a = this.platform, n = (o, i) => {
      a.addEventListener(this, o, i), t[o] = i;
    }, s = (o, i, r) => {
      o.offsetX = i, o.offsetY = r, this._eventHandler(o);
    };
    _t(this.options.events, (o) => n(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, a = this.platform, n = (l, c) => {
      a.addEventListener(this, l, c), t[l] = c;
    }, s = (l, c) => {
      t[l] && (a.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let i;
    const r = () => {
      s("attach", r), this.attached = !0, this.resize(), n("resize", o), n("detach", i);
    };
    i = () => {
      this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), n("attach", r);
    }, a.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    _t(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, _t(this._responsiveListeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, a, n) {
    const s = n ? "set" : "remove";
    let o, i, r, l;
    for (a === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      i = t[r];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[s + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const a = this._active || [], n = t.map(({ datasetIndex: o, index: i }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[i],
        index: i
      };
    });
    !Ra(n, a) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, a));
  }
  notifyPlugins(t, a, n) {
    return this._plugins.notify(this, t, a, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, n) {
    const s = this.options.hover, o = (l, c) => l.filter((u) => !c.some((f) => u.datasetIndex === f.datasetIndex && u.index === f.index)), i = o(a, t), r = n ? t : o(t, a);
    i.length && this.updateHoverStyle(i, s.mode, !1), r.length && s.mode && this.updateHoverStyle(r, s.mode, !0);
  }
  _eventHandler(t, a) {
    const n = {
      event: t,
      replay: a,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, s) === !1)
      return;
    const o = this._handleEvent(t, a, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, s), (o || n.changed) && this.render(), this;
  }
  _handleEvent(t, a, n) {
    const { _active: s = [], options: o } = this, i = a, r = this._getActiveElements(t, s, n, i), l = Or(t), c = Od(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, $t(o.onHover, [
      t,
      r,
      this
    ], this), l && $t(o.onClick, [
      t,
      r,
      this
    ], this));
    const u = !Ra(r, s);
    return (u || a) && (this._active = r, this._updateHoverStyles(r, s, a)), this._lastEvent = c, u;
  }
  _getActiveElements(t, a, n, s) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return a;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, s);
  }
};
function so() {
  return _t(qe.instances, (e) => e._plugins.invalidate());
}
function Vd(e, t, a) {
  const { startAngle: n, x: s, y: o, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: u } = l, f = Math.min(c / i, Ht(n - a));
  if (e.beginPath(), e.arc(s, o, i - c / 2, n + f / 2, a - f / 2), r > 0) {
    const g = Math.min(c / r, Ht(n - a));
    e.arc(s, o, r + c / 2, a - g / 2, n + g / 2, !0);
  } else {
    const g = Math.min(c / 2, i * Ht(n - a));
    if (u === "round")
      e.arc(s, o, g, a - kt / 2, n + kt / 2, !0);
    else if (u === "bevel") {
      const p = 2 * g * g, h = -p * Math.cos(a + kt / 2) + s, m = -p * Math.sin(a + kt / 2) + o, y = p * Math.cos(n + kt / 2) + s, _ = p * Math.sin(n + kt / 2) + o;
      e.lineTo(h, m), e.lineTo(y, _);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function zd(e, t, a) {
  const { startAngle: n, pixelMargin: s, x: o, y: i, outerRadius: r, innerRadius: l } = t;
  let c = s / r;
  e.beginPath(), e.arc(o, i, r, n - c, a + c), l > s ? (c = s / l, e.arc(o, i, l, a + c, n - c, !0)) : e.arc(o, i, s, a + Tt, n - Tt), e.closePath(), e.clip();
}
function Nd(e) {
  return Kn(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Wd(e, t, a, n) {
  const s = Nd(e.options.borderRadius), o = (a - t) / 2, i = Math.min(o, n * t / 2), r = (l) => {
    const c = (a - Math.min(o, l)) * n / 2;
    return Pt(l, 0, Math.min(o, c));
  };
  return {
    outerStart: r(s.outerStart),
    outerEnd: r(s.outerEnd),
    innerStart: Pt(s.innerStart, 0, i),
    innerEnd: Pt(s.innerEnd, 0, i)
  };
}
function Ve(e, t, a, n) {
  return {
    x: a + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function Na(e, t, a, n, s, o) {
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: u } = t, f = Math.max(t.outerRadius + n + a - c, 0), g = u > 0 ? u + n + a + c : 0;
  let p = 0;
  const h = s - l;
  if (n) {
    const K = u > 0 ? u - n : 0, X = f > 0 ? f - n : 0, j = (K + X) / 2, I = j !== 0 ? h * j / (j + n) : h;
    p = (h - I) / 2;
  }
  const m = Math.max(1e-3, h * f - a / kt) / f, y = (h - m) / 2, _ = l + y + p, $ = s - y - p, { outerStart: A, outerEnd: T, innerStart: w, innerEnd: x } = Wd(t, g, f, $ - _), k = f - A, S = f - T, F = _ + A / k, B = $ - T / S, M = g + w, L = g + x, E = _ + w / M, H = $ - x / L;
  if (e.beginPath(), o) {
    const K = (F + B) / 2;
    if (e.arc(i, r, f, F, K), e.arc(i, r, f, K, B), T > 0) {
      const R = Ve(S, B, i, r);
      e.arc(R.x, R.y, T, B, $ + Tt);
    }
    const X = Ve(L, $, i, r);
    if (e.lineTo(X.x, X.y), x > 0) {
      const R = Ve(L, H, i, r);
      e.arc(R.x, R.y, x, $ + Tt, H + Math.PI);
    }
    const j = ($ - x / g + (_ + w / g)) / 2;
    if (e.arc(i, r, g, $ - x / g, j, !0), e.arc(i, r, g, j, _ + w / g, !0), w > 0) {
      const R = Ve(M, E, i, r);
      e.arc(R.x, R.y, w, E + Math.PI, _ - Tt);
    }
    const I = Ve(k, _, i, r);
    if (e.lineTo(I.x, I.y), A > 0) {
      const R = Ve(k, F, i, r);
      e.arc(R.x, R.y, A, _ - Tt, F);
    }
  } else {
    e.moveTo(i, r);
    const K = Math.cos(F) * f + i, X = Math.sin(F) * f + r;
    e.lineTo(K, X);
    const j = Math.cos(B) * f + i, I = Math.sin(B) * f + r;
    e.lineTo(j, I);
  }
  e.closePath();
}
function Hd(e, t, a, n, s) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    Na(e, t, a, n, l, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(r) || (l = i + (r % Ct || Ct));
  }
  return Na(e, t, a, n, l, s), e.fill(), l;
}
function jd(e, t, a, n, s) {
  const { fullCircles: o, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: u, borderDash: f, borderDashOffset: g, borderRadius: p } = l, h = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(f || []), e.lineDashOffset = g, h ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let m = t.endAngle;
  if (o) {
    Na(e, t, a, n, m, s);
    for (let y = 0; y < o; ++y)
      e.stroke();
    isNaN(r) || (m = i + (r % Ct || Ct));
  }
  h && zd(e, t, m), l.selfJoin && m - i >= kt && p === 0 && u !== "miter" && Vd(e, t, m), o || (Na(e, t, a, n, m, s), e.stroke());
}
class Yd extends ue {
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
    const s = this.getProps([
      "x",
      "y"
    ], n), { angle: o, distance: i } = Go(s, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), g = (this.options.spacing + this.options.borderWidth) / 2, p = dt(f, l - r), h = fa(o, r, l) && r !== l, m = p >= Ct || h, y = ce(i, c + g, u + g);
    return m && y;
  }
  getCenterPoint(t) {
    const { x: a, y: n, startAngle: s, endAngle: o, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, u = (s + o) / 2, f = (i + r + c + l) / 2;
    return {
      x: a + Math.cos(u) * f,
      y: n + Math.sin(u) * f
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: a, circumference: n } = this, s = (a.offset || 0) / 4, o = (a.spacing || 0) / 2, i = a.circular;
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > Ct ? Math.floor(n / Ct) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * s, Math.sin(r) * s);
    const l = 1 - Math.sin(Math.min(kt, n || 0)), c = s * l;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Hd(t, this, c, o, i), jd(t, this, c, o, i), t.restore();
  }
}
function Si(e, t, a = t) {
  e.lineCap = dt(a.borderCapStyle, t.borderCapStyle), e.setLineDash(dt(a.borderDash, t.borderDash)), e.lineDashOffset = dt(a.borderDashOffset, t.borderDashOffset), e.lineJoin = dt(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = dt(a.borderWidth, t.borderWidth), e.strokeStyle = dt(a.borderColor, t.borderColor);
}
function qd(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Kd(e) {
  return e.stepped ? ul : e.tension || e.cubicInterpolationMode === "monotone" ? hl : qd;
}
function Di(e, t, a = {}) {
  const n = e.length, { start: s = 0, end: o = n - 1 } = a, { start: i, end: r } = t, l = Math.max(s, i), c = Math.min(o, r), u = s < i && o < i || s > r && o > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !u ? n + c - l : c - l
  };
}
function Ud(e, t, a, n) {
  const { points: s, options: o } = t, { count: i, start: r, loop: l, ilen: c } = Di(s, a, n), u = Kd(o);
  let { move: f = !0, reverse: g } = n || {}, p, h, m;
  for (p = 0; p <= c; ++p)
    h = s[(r + (g ? c - p : p)) % i], !h.skip && (f ? (e.moveTo(h.x, h.y), f = !1) : u(e, m, h, g, o.stepped), m = h);
  return l && (h = s[(r + (g ? c : 0)) % i], u(e, m, h, g, o.stepped)), !!l;
}
function Xd(e, t, a, n) {
  const s = t.points, { count: o, start: i, ilen: r } = Di(s, a, n), { move: l = !0, reverse: c } = n || {};
  let u = 0, f = 0, g, p, h, m, y, _;
  const $ = (T) => (i + (c ? r - T : T)) % o, A = () => {
    m !== y && (e.lineTo(u, y), e.lineTo(u, m), e.lineTo(u, _));
  };
  for (l && (p = s[$(0)], e.moveTo(p.x, p.y)), g = 0; g <= r; ++g) {
    if (p = s[$(g)], p.skip)
      continue;
    const T = p.x, w = p.y, x = T | 0;
    x === h ? (w < m ? m = w : w > y && (y = w), u = (f * u + T) / ++f) : (A(), e.lineTo(T, w), h = x, f = 0, m = y = w), _ = w;
  }
  A();
}
function Rn(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Xd : Ud;
}
function Gd(e) {
  return e.stepped ? jl : e.tension || e.cubicInterpolationMode === "monotone" ? Yl : Te;
}
function Zd(e, t, a, n) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, a, n) && s.closePath()), Si(e, t.options), e.stroke(s);
}
function Qd(e, t, a, n) {
  const { segments: s, options: o } = t, i = Rn(t);
  for (const r of s)
    Si(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Jd = typeof Path2D == "function";
function tu(e, t, a, n) {
  Jd && !t.options.segment ? Zd(e, t, a, n) : Qd(e, t, a, n);
}
class Ka extends ue {
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
      const s = n.spanGaps ? this._loop : this._fullLoop;
      Il(this._points, n, t, s, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Zl(this, this.options.segment));
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
    const n = this.options, s = t[a], o = this.points, i = fi(this, {
      property: a,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const r = [], l = Gd(n);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: f, end: g } = i[c], p = o[f], h = o[g];
      if (p === h) {
        r.push(p);
        continue;
      }
      const m = Math.abs((s - p[a]) / (h[a] - p[a])), y = l(p, h, m, n.stepped);
      y[a] = t[a], r.push(y);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, n) {
    return Rn(this)(t, this, a, n);
  }
  path(t, a, n) {
    const s = this.segments, o = Rn(this);
    let i = this._loop;
    a = a || 0, n = n || this.points.length - a;
    for (const r of s)
      i &= o(t, this, r, {
        start: a,
        end: a + n - 1
      });
    return !!i;
  }
  draw(t, a, n, s) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), tu(t, this, n, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function oo(e, t, a, n) {
  const s = e.options, { [a]: o } = e.getProps([
    a
  ], n);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class eu extends ue {
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
    const s = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(t - o, 2) + Math.pow(a - i, 2) < Math.pow(s.hitRadius + s.radius, 2);
  }
  inXRange(t, a) {
    return oo(this, t, "x", a);
  }
  inYRange(t, a) {
    return oo(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !ga(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, Ln(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Ai(e, t) {
  const { x: a, y: n, base: s, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, c, u, f;
  return e.horizontal ? (f = i / 2, r = Math.min(a, s), l = Math.max(a, s), c = n - f, u = n + f) : (f = o / 2, r = a - f, l = a + f, c = Math.min(n, s), u = Math.max(n, s)), {
    left: r,
    top: c,
    right: l,
    bottom: u
  };
}
function ye(e, t, a, n) {
  return e ? 0 : Pt(t, a, n);
}
function au(e, t, a) {
  const n = e.options.borderWidth, s = e.borderSkipped, o = ni(n);
  return {
    t: ye(s.top, o.top, 0, a),
    r: ye(s.right, o.right, 0, t),
    b: ye(s.bottom, o.bottom, 0, a),
    l: ye(s.left, o.left, 0, t)
  };
}
function nu(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = Ne(s), i = Math.min(t, a), r = e.borderSkipped, l = n || pt(s);
  return {
    topLeft: ye(!l || r.top || r.left, o.topLeft, 0, i),
    topRight: ye(!l || r.top || r.right, o.topRight, 0, i),
    bottomLeft: ye(!l || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: ye(!l || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function su(e) {
  const t = Ai(e), a = t.right - t.left, n = t.bottom - t.top, s = au(e, a / 2, n / 2), o = nu(e, a / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: a,
      h: n,
      radius: o
    },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: a - s.l - s.r,
      h: n - s.t - s.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function cn(e, t, a, n) {
  const s = t === null, o = a === null, r = e && !(s && o) && Ai(e, n);
  return r && (s || ce(t, r.left, r.right)) && (o || ce(a, r.top, r.bottom));
}
function ou(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function iu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function dn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, s = e.y !== a.y ? -t : 0, o = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - s;
  return {
    x: e.x + n,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class ru extends ue {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: s } } = this, { inner: o, outer: i } = su(this), r = ou(i.radius) ? Oa : iu;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, dn(i, a, o)), t.clip(), r(t, dn(o, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, dn(o, a)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return cn(this, t, a, n);
  }
  inXRange(t, a) {
    return cn(this, t, null, a);
  }
  inYRange(t, a) {
    return cn(this, null, t, a);
  }
  getCenterPoint(t) {
    const { x: a, y: n, base: s, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (a + s) / 2 : a,
      y: o ? n : (n + s) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function lu(e, t, a) {
  const n = e.segments, s = e.points, o = t.points, i = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = Ua(l, c, s);
    const u = In(a, s[l], s[c], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: s[l],
        end: s[c]
      });
      continue;
    }
    const f = fi(t, u);
    for (const g of f) {
      const p = In(a, o[g.start], o[g.end], g.loop), h = hi(r, s, p);
      for (const m of h)
        i.push({
          source: m,
          target: g,
          start: {
            [a]: io(u, p, "start", Math.max)
          },
          end: {
            [a]: io(u, p, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function In(e, t, a, n) {
  if (n)
    return;
  let s = t[e], o = a[e];
  return e === "angle" && (s = Ht(s), o = Ht(o)), {
    property: e,
    start: s,
    end: o
  };
}
function cu(e, t) {
  const { x: a = null, y: n = null } = e || {}, s = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Ua(i, r, s);
    const l = s[i], c = s[r];
    n !== null ? (o.push({
      x: l.x,
      y: n
    }), o.push({
      x: c.x,
      y: n
    })) : a !== null && (o.push({
      x: a,
      y: l.y
    }), o.push({
      x: a,
      y: c.y
    }));
  }), o;
}
function Ua(e, t, a) {
  for (; t > e; t--) {
    const n = a[t];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return t;
}
function io(e, t, a, n) {
  return e && t ? n(e[a], t[a]) : e ? e[a] : t ? t[a] : 0;
}
function Ti(e, t) {
  let a = [], n = !1;
  return Dt(e) ? (n = !0, a = e) : a = cu(e, t), a.length ? new Ka({
    points: a,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function ro(e) {
  return e && e.fill !== !1;
}
function du(e, t, a) {
  let s = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!a)
    return s;
  for (; s !== !1 && o.indexOf(s) === -1; ) {
    if (!Et(s))
      return s;
    if (i = e[s], !i)
      return !1;
    if (i.visible)
      return s;
    o.push(s), s = i.fill;
  }
  return !1;
}
function uu(e, t, a) {
  const n = pu(e);
  if (pt(n))
    return isNaN(n.value) ? !1 : n;
  let s = parseFloat(n);
  return Et(s) && Math.floor(s) === s ? hu(n[0], t, s, a) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function hu(e, t, a, n) {
  return (e === "-" || e === "+") && (a = t + a), a === t || a < 0 || a >= n ? !1 : a;
}
function fu(e, t) {
  let a = null;
  return e === "start" ? a = t.bottom : e === "end" ? a = t.top : pt(e) ? a = t.getPixelForValue(e.value) : t.getBasePixel && (a = t.getBasePixel()), a;
}
function gu(e, t, a) {
  let n;
  return e === "start" ? n = a : e === "end" ? n = t.options.reverse ? t.min : t.max : pt(e) ? n = e.value : n = t.getBaseValue(), n;
}
function pu(e) {
  const t = e.options, a = t.fill;
  let n = dt(a && a.target, a);
  return n === void 0 && (n = !!t.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function vu(e) {
  const { scale: t, index: a, line: n } = e, s = [], o = n.segments, i = n.points, r = mu(t, a);
  r.push(Ti({
    x: null,
    y: t.bottom
  }, n));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let u = c.start; u <= c.end; u++)
      bu(s, i[u], r);
  }
  return new Ka({
    points: s,
    options: {}
  });
}
function mu(e, t) {
  const a = [], n = e.getMatchingVisibleMetas("line");
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    if (o.index === t)
      break;
    o.hidden || a.unshift(o.dataset);
  }
  return a;
}
function bu(e, t, a) {
  const n = [];
  for (let s = 0; s < a.length; s++) {
    const o = a[s], { first: i, last: r, point: l } = yu(o, t, "x");
    if (!(!l || i && r)) {
      if (i)
        n.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...n);
}
function yu(e, t, a) {
  const n = e.interpolate(t, a);
  if (!n)
    return {};
  const s = n[a], o = e.segments, i = e.points;
  let r = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const u = o[c], f = i[u.start][a], g = i[u.end][a];
    if (ce(s, f, g)) {
      r = s === f, l = s === g;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: n
  };
}
class Bi {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, a, n) {
    const { x: s, y: o, radius: i } = this;
    return a = a || {
      start: 0,
      end: Ct
    }, t.arc(s, o, i, a.end, a.start, !0), !n.bounds;
  }
  interpolate(t) {
    const { x: a, y: n, radius: s } = this, o = t.angle;
    return {
      x: a + Math.cos(o) * s,
      y: n + Math.sin(o) * s,
      angle: o
    };
  }
}
function _u(e) {
  const { chart: t, fill: a, line: n } = e;
  if (Et(a))
    return xu(t, a);
  if (a === "stack")
    return vu(e);
  if (a === "shape")
    return !0;
  const s = ku(e);
  return s instanceof Bi ? s : Ti(s, n);
}
function xu(e, t) {
  const a = e.getDatasetMeta(t);
  return a && e.isDatasetVisible(t) ? a.dataset : null;
}
function ku(e) {
  return (e.scale || {}).getPointPositionForValue ? $u(e) : wu(e);
}
function wu(e) {
  const { scale: t = {}, fill: a } = e, n = fu(a, t);
  if (Et(n)) {
    const s = t.isHorizontal();
    return {
      x: s ? n : null,
      y: s ? null : n
    };
  }
  return null;
}
function $u(e) {
  const { scale: t, fill: a } = e, n = t.options, s = t.getLabels().length, o = n.reverse ? t.max : t.min, i = gu(a, t, o), r = [];
  if (n.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new Bi({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let l = 0; l < s; ++l)
    r.push(t.getPointPositionForValue(l, i));
  return r;
}
function un(e, t, a) {
  const n = _u(t), { chart: s, index: o, line: i, scale: r, axis: l } = t, c = i.options, u = c.fill, f = c.backgroundColor, { above: g = f, below: p = f } = u || {}, h = s.getDatasetMeta(o), m = gi(s, h);
  n && i.points.length && (Wa(e, a), Cu(e, {
    line: i,
    target: n,
    above: g,
    below: p,
    area: a,
    scale: r,
    axis: l,
    clip: m
  }), Ha(e));
}
function Cu(e, t) {
  const { line: a, target: n, above: s, below: o, area: i, scale: r, clip: l } = t, c = a._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== s && (c === "x" ? (lo(e, n, i.top), hn(e, {
    line: a,
    target: n,
    color: s,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), lo(e, n, i.bottom)) : c === "y" && (co(e, n, i.left), hn(e, {
    line: a,
    target: n,
    color: o,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), co(e, n, i.right), u = s)), hn(e, {
    line: a,
    target: n,
    color: u,
    scale: r,
    property: c,
    clip: l
  }), e.restore();
}
function lo(e, t, a) {
  const { segments: n, points: s } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, u = s[l], f = s[Ua(l, c, s)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, a), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(f.x, a);
  }
  e.lineTo(t.first().x, a), e.closePath(), e.clip();
}
function co(e, t, a) {
  const { segments: n, points: s } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, u = s[l], f = s[Ua(l, c, s)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(a, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(a, f.y);
  }
  e.lineTo(a, t.first().y), e.closePath(), e.clip();
}
function hn(e, t) {
  const { line: a, target: n, property: s, color: o, scale: i, clip: r } = t, l = lu(a, n, s);
  for (const { source: c, target: u, start: f, end: g } of l) {
    const { style: { backgroundColor: p = o } = {} } = c, h = n !== !0;
    e.save(), e.fillStyle = p, Mu(e, i, r, h && In(s, f, g)), e.beginPath();
    const m = !!a.pathSegment(e, c);
    let y;
    if (h) {
      m ? e.closePath() : uo(e, n, g, s);
      const _ = !!n.pathSegment(e, u, {
        move: m,
        reverse: !0
      });
      y = m && _, y || uo(e, n, f, s);
    }
    e.closePath(), e.fill(y ? "evenodd" : "nonzero"), e.restore();
  }
}
function Mu(e, t, a, n) {
  const s = t.chart.chartArea, { property: o, start: i, end: r } = n || {};
  if (o === "x" || o === "y") {
    let l, c, u, f;
    o === "x" ? (l = i, c = s.top, u = r, f = s.bottom) : (l = s.left, c = i, u = s.right, f = r), e.beginPath(), a && (l = Math.max(l, a.left), u = Math.min(u, a.right), c = Math.max(c, a.top), f = Math.min(f, a.bottom)), e.rect(l, c, u - l, f - c), e.clip();
  }
}
function uo(e, t, a, n) {
  const s = t.interpolate(a, n);
  s && e.lineTo(s.x, s.y);
}
var Su = {
  id: "filler",
  afterDatasetsUpdate(e, t, a) {
    const n = (e.data.datasets || []).length, s = [];
    let o, i, r, l;
    for (i = 0; i < n; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, l = null, r && r.options && r instanceof Ka && (l = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: uu(r, i, n),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, s.push(l);
    for (i = 0; i < n; ++i)
      l = s[i], !(!l || l.fill === !1) && (l.fill = du(s, i, a.propagate));
  },
  beforeDraw(e, t, a) {
    const n = a.drawTime === "beforeDraw", s = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = s.length - 1; i >= 0; --i) {
      const r = s[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), n && r.fill && un(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, a) {
    if (a.drawTime !== "beforeDatasetsDraw")
      return;
    const n = e.getSortedVisibleDatasetMetas();
    for (let s = n.length - 1; s >= 0; --s) {
      const o = n[s].$filler;
      ro(o) && un(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, a) {
    const n = t.meta.$filler;
    !ro(n) || a.drawTime !== "beforeDatasetDraw" || un(e.ctx, n, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const ho = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, Du = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class fo extends ue {
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
    let a = $t(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (a = a.filter((n) => t.filter(n, this.chart.data))), t.sort && (a = a.sort((n, s) => t.sort(n, s, this.chart.data))), this.options.reverse && a.reverse(), this.legendItems = a;
  }
  fit() {
    const { options: t, ctx: a } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, s = Rt(n.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = ho(n, o);
    let c, u;
    a.font = s.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, o, r, l) + 10) : (u = this.maxHeight, c = this._fitCols(i, s, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = s + r;
    let f = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let g = -1, p = -u;
    return this.legendItems.forEach((h, m) => {
      const y = n + a / 2 + o.measureText(h.text).width;
      (m === 0 || c[c.length - 1] + y + 2 * r > i) && (f += u, c[c.length - (m > 0 ? 0 : 1)] = 0, p += u, g++), l[m] = {
        left: 0,
        top: p,
        row: g,
        width: y,
        height: s
      }, c[c.length - 1] += y + r;
    }), f;
  }
  _fitCols(t, a, n, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let f = r, g = 0, p = 0, h = 0, m = 0;
    return this.legendItems.forEach((y, _) => {
      const { itemWidth: $, itemHeight: A } = Au(n, a, o, y, s);
      _ > 0 && p + A + 2 * r > u && (f += g + r, c.push({
        width: g,
        height: p
      }), h += g + r, m++, g = p = 0), l[_] = {
        left: h,
        top: p,
        col: m,
        width: $,
        height: A
      }, g = Math.max(g, $), p += A + r;
    }), f += g, c.push({
      width: g,
      height: p
    }), f;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: n, labels: { padding: s }, rtl: o } } = this, i = We(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = Ft(n, this.left + s, this.right - this.lineWidths[r]);
      for (const c of a)
        r !== c.row && (r = c.row, l = Ft(n, this.left + s, this.right - this.lineWidths[r])), c.top += this.top + t + s, c.left = i.leftForLtr(i.x(l), c.width), l += c.width + s;
    } else {
      let r = 0, l = Ft(n, this.top + t + s, this.bottom - this.columnSizes[r].height);
      for (const c of a)
        c.col !== r && (r = c.col, l = Ft(n, this.top + t + s, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + s, c.left = i.leftForLtr(i.x(c.left), c.width), l += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Wa(t, this), this._draw(), Ha(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: s } = this, { align: o, labels: i } = t, r = St.color, l = We(t.rtl, this.left, this.width), c = Rt(i.font), { padding: u } = i, f = c.size, g = f / 2;
    let p;
    this.drawTitle(), s.textAlign = l.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: h, boxHeight: m, itemHeight: y } = ho(i, f), _ = function(x, k, S) {
      if (isNaN(h) || h <= 0 || isNaN(m) || m < 0)
        return;
      s.save();
      const F = dt(S.lineWidth, 1);
      if (s.fillStyle = dt(S.fillStyle, r), s.lineCap = dt(S.lineCap, "butt"), s.lineDashOffset = dt(S.lineDashOffset, 0), s.lineJoin = dt(S.lineJoin, "miter"), s.lineWidth = F, s.strokeStyle = dt(S.strokeStyle, r), s.setLineDash(dt(S.lineDash, [])), i.usePointStyle) {
        const B = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: S.pointStyle,
          rotation: S.rotation,
          borderWidth: F
        }, M = l.xPlus(x, h / 2), L = k + g;
        ai(s, B, M, L, i.pointStyleWidth && h);
      } else {
        const B = k + Math.max((f - m) / 2, 0), M = l.leftForLtr(x, h), L = Ne(S.borderRadius);
        s.beginPath(), Object.values(L).some((E) => E !== 0) ? Oa(s, {
          x: M,
          y: B,
          w: h,
          h: m,
          radius: L
        }) : s.rect(M, B, h, m), s.fill(), F !== 0 && s.stroke();
      }
      s.restore();
    }, $ = function(x, k, S) {
      pa(s, S.text, x, k + y / 2, c, {
        strikethrough: S.hidden,
        textAlign: l.textAlign(S.textAlign)
      });
    }, A = this.isHorizontal(), T = this._computeTitleHeight();
    A ? p = {
      x: Ft(o, this.left + u, this.right - n[0]),
      y: this.top + u + T,
      line: 0
    } : p = {
      x: this.left + u,
      y: Ft(o, this.top + T + u, this.bottom - a[0].height),
      line: 0
    }, ci(this.ctx, t.textDirection);
    const w = y + u;
    this.legendItems.forEach((x, k) => {
      s.strokeStyle = x.fontColor, s.fillStyle = x.fontColor;
      const S = s.measureText(x.text).width, F = l.textAlign(x.textAlign || (x.textAlign = i.textAlign)), B = h + g + S;
      let M = p.x, L = p.y;
      l.setWidth(this.width), A ? k > 0 && M + B + u > this.right && (L = p.y += w, p.line++, M = p.x = Ft(o, this.left + u, this.right - n[p.line])) : k > 0 && L + w > this.bottom && (M = p.x = M + a[p.line].width + u, p.line++, L = p.y = Ft(o, this.top + T + u, this.bottom - a[p.line].height));
      const E = l.x(M);
      if (_(E, L, x), M = Qr(F, M + h + g, A ? M + B : this.right, t.rtl), $(l.x(M), L, x), A)
        p.x += B + u;
      else if (typeof x.text != "string") {
        const H = c.lineHeight;
        p.y += Li(x, H) + u;
      } else
        p.y += w;
    }), di(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = Rt(a.font), s = Ut(a.padding);
    if (!a.display)
      return;
    const o = We(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = n.size / 2, c = s.top + l;
    let u, f = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), u = this.top + c, f = Ft(t.align, f, this.right - g);
    else {
      const h = this.columnSizes.reduce((m, y) => Math.max(m, y.height), 0);
      u = c + Ft(t.align, this.top, this.bottom - h - t.labels.padding - this._computeTitleHeight());
    }
    const p = Ft(r, f, f + g);
    i.textAlign = o.textAlign(jn(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, pa(i, a.text, p, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = Rt(t.font), n = Ut(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, s, o;
    if (ce(t, this.left, this.right) && ce(a, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, n = 0; n < o.length; ++n)
        if (s = o[n], ce(t, s.left, s.left + s.width) && ce(a, s.top, s.top + s.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!Lu(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = Du(s, n);
      s && !o && $t(a.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = n, n && !o && $t(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && $t(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function Au(e, t, a, n, s) {
  const o = Tu(n, e, t, a), i = Bu(s, n, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function Tu(e, t, a, n) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + a.size / 2 + n.measureText(s).width;
}
function Bu(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = Li(t, a)), n;
}
function Li(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function Lu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var ts = {
  id: "legend",
  _element: fo,
  start(e, t, a) {
    const n = e.legend = new fo({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    qt.configure(e, n, a), qt.addBox(e, n);
  },
  stop(e) {
    qt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const n = e.legend;
    qt.configure(e, n, a), n.options = a;
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
      const n = t.datasetIndex, s = a.chart;
      s.isDatasetVisible(n) ? (s.hide(n), t.hidden = !0) : (s.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: n, textAlign: s, color: o, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(a ? 0 : void 0), u = Ut(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: s || c.textAlign,
            borderRadius: i && (r || c.borderRadius),
            datasetIndex: l.index
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
class Fi extends ue {
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
    const s = Dt(n.text) ? n.text.length : 1;
    this._padding = Ut(n.padding);
    const o = s * Rt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: n, bottom: s, right: o, options: i } = this, r = i.align;
    let l = 0, c, u, f;
    return this.isHorizontal() ? (u = Ft(r, n, o), f = a + t, c = o - n) : (i.position === "left" ? (u = n + t, f = Ft(r, s, a), l = kt * -0.5) : (u = o - t, f = Ft(r, a, s), l = kt * 0.5), c = s - a), {
      titleX: u,
      titleY: f,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const n = Rt(a.font), o = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(o);
    pa(t, a.text, 0, 0, n, {
      color: a.color,
      maxWidth: l,
      rotation: c,
      textAlign: jn(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function Fu(e, t) {
  const a = new Fi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  qt.configure(e, a, t), qt.addBox(e, a), e.titleBlock = a;
}
var Pi = {
  id: "title",
  _element: Fi,
  start(e, t, a) {
    Fu(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    qt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const n = e.titleBlock;
    qt.configure(e, n, a), n.options = a;
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
const aa = {
  average(e) {
    if (!e.length)
      return !1;
    let t, a, n = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, a = e.length; t < a; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        n.add(l.x), s += l.y, ++o;
      }
    }
    return o === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((r, l) => r + l) / n.size,
      y: s / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let a = t.x, n = t.y, s = Number.POSITIVE_INFINITY, o, i, r;
    for (o = 0, i = e.length; o < i; ++o) {
      const l = e[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), u = Tn(t, c);
        u < s && (s = u, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      a = l.x, n = l.y;
    }
    return {
      x: a,
      y: n
    };
  }
};
function Qt(e, t) {
  return t && (Dt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ie(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Pu(e, t) {
  const { element: a, datasetIndex: n, index: s } = t, o = e.getDatasetMeta(n).controller, { label: i, value: r } = o.getLabelAndValue(s);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(s),
    raw: e.data.datasets[n].data[s],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: s,
    datasetIndex: n,
    element: a
  };
}
function go(e, t) {
  const a = e.chart.ctx, { body: n, footer: s, title: o } = e, { boxWidth: i, boxHeight: r } = t, l = Rt(t.bodyFont), c = Rt(t.titleFont), u = Rt(t.footerFont), f = o.length, g = s.length, p = n.length, h = Ut(t.padding);
  let m = h.height, y = 0, _ = n.reduce((T, w) => T + w.before.length + w.lines.length + w.after.length, 0);
  if (_ += e.beforeBody.length + e.afterBody.length, f && (m += f * c.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), _) {
    const T = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    m += p * T + (_ - p) * l.lineHeight + (_ - 1) * t.bodySpacing;
  }
  g && (m += t.footerMarginTop + g * u.lineHeight + (g - 1) * t.footerSpacing);
  let $ = 0;
  const A = function(T) {
    y = Math.max(y, a.measureText(T).width + $);
  };
  return a.save(), a.font = c.string, _t(e.title, A), a.font = l.string, _t(e.beforeBody.concat(e.afterBody), A), $ = t.displayColors ? i + 2 + t.boxPadding : 0, _t(n, (T) => {
    _t(T.before, A), _t(T.lines, A), _t(T.after, A);
  }), $ = 0, a.font = u.string, _t(e.footer, A), a.restore(), y += h.width, {
    width: y,
    height: m
  };
}
function Ru(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function Iu(e, t, a, n) {
  const { x: s, width: o } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function Eu(e, t, a, n) {
  const { x: s, width: o } = a, { width: i, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = s <= (r + l) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), Iu(c, e, t, a) && (c = "center"), c;
}
function po(e, t, a) {
  const n = a.yAlign || t.yAlign || Ru(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || Eu(e, t, a, n),
    yAlign: n
  };
}
function Ou(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function Vu(e, t, a) {
  let { y: n, height: s } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= s + a : n -= s / 2, n;
}
function vo(e, t, a, n) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, c = s + o, { topLeft: u, topRight: f, bottomLeft: g, bottomRight: p } = Ne(i);
  let h = Ou(t, r);
  const m = Vu(t, l, c);
  return l === "center" ? r === "left" ? h += c : r === "right" && (h -= c) : r === "left" ? h -= Math.max(u, g) + s : r === "right" && (h += Math.max(f, p) + s), {
    x: Pt(h, 0, n.width - t.width),
    y: Pt(m, 0, n.height - t.height)
  };
}
function Aa(e, t, a) {
  const n = Ut(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function mo(e) {
  return Qt([], ie(e));
}
function zu(e, t, a) {
  return Ee(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function bo(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Ri = {
  beforeTitle: se,
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
  afterTitle: se,
  beforeBody: se,
  beforeLabel: se,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return yt(a) || (t += a), t;
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
  afterLabel: se,
  afterBody: se,
  beforeFooter: se,
  footer: se,
  afterFooter: se
};
function Vt(e, t, a, n) {
  const s = e[t].call(a, n);
  return typeof s > "u" ? Ri[t].call(a, n) : s;
}
class yo extends ue {
  static positioners = aa;
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
    const a = this.chart, n = this.options.setContext(this.getContext()), s = n.enabled && a.options.animation && n.animations, o = new pi(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = zu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, s = Vt(n, "beforeTitle", this, t), o = Vt(n, "title", this, t), i = Vt(n, "afterTitle", this, t);
    let r = [];
    return r = Qt(r, ie(s)), r = Qt(r, ie(o)), r = Qt(r, ie(i)), r;
  }
  getBeforeBody(t, a) {
    return mo(Vt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, s = [];
    return _t(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = bo(n, o);
      Qt(i.before, ie(Vt(r, "beforeLabel", this, o))), Qt(i.lines, Vt(r, "label", this, o)), Qt(i.after, ie(Vt(r, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, a) {
    return mo(Vt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, s = Vt(n, "beforeFooter", this, t), o = Vt(n, "footer", this, t), i = Vt(n, "afterFooter", this, t);
    let r = [];
    return r = Qt(r, ie(s)), r = Qt(r, ie(o)), r = Qt(r, ie(i)), r;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, s = [], o = [], i = [];
    let r = [], l, c;
    for (l = 0, c = a.length; l < c; ++l)
      r.push(Pu(this.chart, a[l]));
    return t.filter && (r = r.filter((u, f, g) => t.filter(u, f, g, n))), t.itemSort && (r = r.sort((u, f) => t.itemSort(u, f, n))), _t(r, (u) => {
      const f = bo(t.callbacks, u);
      s.push(Vt(f, "labelColor", this, u)), o.push(Vt(f, "labelPointStyle", this, u)), i.push(Vt(f, "labelTextColor", this, u));
    }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, a) {
    const n = this.options.setContext(this.getContext()), s = this._active;
    let o, i = [];
    if (!s.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = aa[n.position].call(this, s, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const l = this._size = go(this, n), c = Object.assign({}, r, l), u = po(this.chart, n, c), f = vo(n, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: f.x,
        y: f.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: a
    });
  }
  drawCaret(t, a, n, s) {
    const o = this.getCaretPosition(t, n, s);
    a.lineTo(o.x1, o.y1), a.lineTo(o.x2, o.y2), a.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, a, n) {
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: u, bottomRight: f } = Ne(r), { x: g, y: p } = t, { width: h, height: m } = a;
    let y, _, $, A, T, w;
    return o === "center" ? (T = p + m / 2, s === "left" ? (y = g, _ = y - i, A = T + i, w = T - i) : (y = g + h, _ = y + i, A = T - i, w = T + i), $ = y) : (s === "left" ? _ = g + Math.max(l, u) + i : s === "right" ? _ = g + h - Math.max(c, f) - i : _ = this.caretX, o === "top" ? (A = p, T = A - i, y = _ - i, $ = _ + i) : (A = p + m, T = A + i, y = _ + i, $ = _ - i), w = A), {
      x1: y,
      x2: _,
      x3: $,
      y1: A,
      y2: T,
      y3: w
    };
  }
  drawTitle(t, a, n) {
    const s = this.title, o = s.length;
    let i, r, l;
    if (o) {
      const c = We(n.rtl, this.x, this.width);
      for (t.x = Aa(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = Rt(n.titleFont), r = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, l = 0; l < o; ++l)
        a.fillText(s[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === o && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, n, s, o) {
    const i = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = o, u = Rt(o.bodyFont), f = Aa(this, "left", o), g = s.x(f), p = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, h = a.y + p;
    if (o.usePointStyle) {
      const m = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, y = s.leftForLtr(g, c) + c / 2, _ = h + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ln(t, m, y, _), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ln(t, m, y, _);
    } else {
      t.lineWidth = pt(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const m = s.leftForLtr(g, c), y = s.leftForLtr(s.xPlus(g, 1), c - 2), _ = Ne(i.borderRadius);
      Object.values(_).some(($) => $ !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Oa(t, {
        x: m,
        y: h,
        w: c,
        h: l,
        radius: _
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Oa(t, {
        x: y,
        y: h + 1,
        w: c - 2,
        h: l - 2,
        radius: _
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(m, h, c, l), t.strokeRect(m, h, c, l), t.fillStyle = i.backgroundColor, t.fillRect(y, h + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: u } = n, f = Rt(n.bodyFont);
    let g = f.lineHeight, p = 0;
    const h = We(n.rtl, this.x, this.width), m = function(S) {
      a.fillText(S, h.x(t.x + p), t.y + g / 2), t.y += g + o;
    }, y = h.textAlign(i);
    let _, $, A, T, w, x, k;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = f.string, t.x = Aa(this, y, n), a.fillStyle = n.bodyColor, _t(this.beforeBody, m), p = r && y !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, T = 0, x = s.length; T < x; ++T) {
      for (_ = s[T], $ = this.labelTextColors[T], a.fillStyle = $, _t(_.before, m), A = _.lines, r && A.length && (this._drawColorBox(a, t, T, h, n), g = Math.max(f.lineHeight, l)), w = 0, k = A.length; w < k; ++w)
        m(A[w]), g = f.lineHeight;
      _t(_.after, m);
    }
    p = 0, g = f.lineHeight, _t(this.afterBody, m), t.y -= o;
  }
  drawFooter(t, a, n) {
    const s = this.footer, o = s.length;
    let i, r;
    if (o) {
      const l = We(n.rtl, this.x, this.width);
      for (t.x = Aa(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = l.textAlign(n.footerAlign), a.textBaseline = "middle", i = Rt(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, r = 0; r < o; ++r)
        a.fillText(s[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, a, n, s) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: l } = t, { width: c, height: u } = n, { topLeft: f, topRight: g, bottomLeft: p, bottomRight: h } = Ne(s.cornerRadius);
    a.fillStyle = s.backgroundColor, a.strokeStyle = s.borderColor, a.lineWidth = s.borderWidth, a.beginPath(), a.moveTo(r + f, l), i === "top" && this.drawCaret(t, a, n, s), a.lineTo(r + c - g, l), a.quadraticCurveTo(r + c, l, r + c, l + g), i === "center" && o === "right" && this.drawCaret(t, a, n, s), a.lineTo(r + c, l + u - h), a.quadraticCurveTo(r + c, l + u, r + c - h, l + u), i === "bottom" && this.drawCaret(t, a, n, s), a.lineTo(r + p, l + u), a.quadraticCurveTo(r, l + u, r, l + u - p), i === "center" && o === "left" && this.drawCaret(t, a, n, s), a.lineTo(r, l + f), a.quadraticCurveTo(r, l, r + f, l), a.closePath(), a.fill(), s.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, s = n && n.x, o = n && n.y;
    if (s || o) {
      const i = aa[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = go(this, t), l = Object.assign({}, i, this._size), c = po(a, t, l), u = vo(t, l, c, a);
      (s._to !== u.x || o._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
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
    const s = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const i = Ut(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(o, t, s, a), ci(t, a.textDirection), o.y += i.top, this.drawTitle(o, t, a), this.drawBody(o, t, a), this.drawFooter(o, t, a), di(t, a.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, a) {
    const n = this._active, s = t.map(({ datasetIndex: r, index: l }) => {
      const c = this.chart.getDatasetMeta(r);
      if (!c)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: c.data[l],
        index: l
      };
    }), o = !Ra(n, s), i = this._positionChanged(s, a);
    (o || i) && (this._active = s, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, n = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, a, n), r = this._positionChanged(i, t), l = a || !Ra(i, o) || r;
    return l && (this._active = i, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, a))), l;
  }
  _getActiveElements(t, a, n, s) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return a.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, n);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, a) {
    const { caretX: n, caretY: s, options: o } = this, i = aa[o.position].call(this, t, a);
    return i !== !1 && (n !== i.x || s !== i.y);
  }
}
var es = {
  id: "tooltip",
  _element: yo,
  positioners: aa,
  afterInit(e, t, a) {
    a && (e.tooltip = new yo({
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
    callbacks: Ri
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
const Nu = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function Wu(e, t, a, n) {
  const s = e.indexOf(t);
  if (s === -1)
    return Nu(e, t, a, n);
  const o = e.lastIndexOf(t);
  return s !== o ? a : s;
}
const Hu = (e, t) => e === null ? null : Pt(Math.round(e), 0, t);
function _o(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ii extends Ye {
  static id = "category";
  static defaults = {
    ticks: {
      callback: _o
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const a = this._addedLabels;
    if (a.length) {
      const n = this.getLabels();
      for (const { index: s, label: o } of a)
        n[s] === o && n.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, a) {
    if (yt(t))
      return null;
    const n = this.getLabels();
    return a = isFinite(a) && n[a] === t ? a : Wu(n, t, dt(a, t), this._addedLabels), Hu(a, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: a } = this.getUserBounds();
    let { min: n, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), a || (s = this.getLabels().length - 1)), this.min = n, this.max = s;
  }
  buildTicks() {
    const t = this.min, a = this.max, n = this.options.offset, s = [];
    let o = this.getLabels();
    o = t === 0 && a === o.length - 1 ? o : o.slice(t, a + 1), this._valueRange = Math.max(o.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let i = t; i <= a; i++)
      s.push({
        value: i
      });
    return s;
  }
  getLabelForValue(t) {
    return _o.call(this, t);
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
function ju(e, t) {
  const a = [], { bounds: s, step: o, min: i, max: r, precision: l, count: c, maxTicks: u, maxDigits: f, includeBounds: g } = e, p = o || 1, h = u - 1, { min: m, max: y } = t, _ = !yt(i), $ = !yt(r), A = !yt(c), T = (y - m) / (f + 1);
  let w = ps((y - m) / h / p) * p, x, k, S, F;
  if (w < 1e-14 && !_ && !$)
    return [
      {
        value: m
      },
      {
        value: y
      }
    ];
  F = Math.ceil(y / w) - Math.floor(m / w), F > h && (w = ps(F * w / h / p) * p), yt(l) || (x = Math.pow(10, l), w = Math.ceil(w * x) / x), s === "ticks" ? (k = Math.floor(m / w) * w, S = Math.ceil(y / w) * w) : (k = m, S = y), _ && $ && o && Hr((r - i) / o, w / 1e3) ? (F = Math.round(Math.min((r - i) / w, u)), w = (r - i) / F, k = i, S = r) : A ? (k = _ ? i : k, S = $ ? r : S, F = c - 1, w = (S - k) / F) : (F = (S - k) / w, sa(F, Math.round(F), w / 1e3) ? F = Math.round(F) : F = Math.ceil(F));
  const B = Math.max(vs(w), vs(k));
  x = Math.pow(10, yt(l) ? B : l), k = Math.round(k * x) / x, S = Math.round(S * x) / x;
  let M = 0;
  for (_ && (g && k !== i ? (a.push({
    value: i
  }), k < i && M++, sa(Math.round((k + M * w) * x) / x, i, xo(i, T, e)) && M++) : k < i && M++); M < F; ++M) {
    const L = Math.round((k + M * w) * x) / x;
    if ($ && L > r)
      break;
    a.push({
      value: L
    });
  }
  return $ && g && S !== r ? a.length && sa(a[a.length - 1].value, r, xo(r, T, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!$ || S === r) && a.push({
    value: S
  }), a;
}
function xo(e, t, { horizontal: a, minRotation: n }) {
  const s = le(n), o = (a ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Yu extends Ye {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return yt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: n } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (l) => s = a ? s : l, r = (l) => o = n ? o : l;
    if (t) {
      const l = ee(s), c = ee(o);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && i(0);
    }
    if (s === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      r(o + l), t || i(s - l);
    }
    this.min = s, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: a, stepSize: n } = t, s;
    return n ? (s = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), a = a || 11), a && (s = Math.min(a, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, a = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const s = {
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
    }, o = this._range || this, i = ju(s, o);
    return t.bounds === "ticks" && jr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let a = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (n - a) / Math.max(t.length - 1, 1) / 2;
      a -= s, n += s;
    }
    this._startValue = a, this._endValue = n, this._valueRange = n - a;
  }
  getLabelForValue(t) {
    return qn(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ei extends Yu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ei.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = Et(t) ? t : 0, this.max = Et(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = le(this.options.ticks.minRotation), s = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Xa = {
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
}, zt = /* @__PURE__ */ Object.keys(Xa);
function ko(e, t) {
  return e - t;
}
function wo(e, t) {
  if (yt(t))
    return null;
  const a = e._adapter, { parser: n, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), Et(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (s && (i = s === "week" && (ha(o) || o === !0) ? a.startOf(i, "isoWeek", o) : a.startOf(i, s)), +i);
}
function $o(e, t, a, n) {
  const s = zt.length;
  for (let o = zt.indexOf(e); o < s - 1; ++o) {
    const i = Xa[zt[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= n)
      return zt[o];
  }
  return zt[s - 1];
}
function qu(e, t, a, n, s) {
  for (let o = zt.length - 1; o >= zt.indexOf(a); o--) {
    const i = zt[o];
    if (Xa[i].common && e._adapter.diff(s, n, i) >= t - 1)
      return i;
  }
  return zt[a ? zt.indexOf(a) : 0];
}
function Ku(e) {
  for (let t = zt.indexOf(e) + 1, a = zt.length; t < a; ++t)
    if (Xa[zt[t]].common)
      return zt[t];
}
function Co(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: s } = Hn(a, t), o = a[n] >= t ? a[n] : a[s];
    e[o] = !0;
  }
}
function Uu(e, t, a, n) {
  const s = e._adapter, o = +s.startOf(t[0].value, n), i = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= i; r = +s.add(r, 1, n))
    l = a[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Mo(e, t, a) {
  const n = [], s = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], s[r] = i, n.push({
      value: r,
      major: !1
    });
  return o === 0 || !a ? n : Uu(e, n, s, a);
}
class So extends Ye {
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
    const n = t.time || (t.time = {}), s = this._adapter = new Tc._date(t.adapters.date);
    s.init(a), na(n.displayFormats, s.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : wo(this, t);
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
    let { min: s, max: o, minDefined: i, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !i && !isNaN(c.min) && (s = Math.min(s, c.min)), !r && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), s = Et(s) && !isNaN(s) ? s : +a.startOf(Date.now(), n), o = Et(o) && !isNaN(o) ? o : +a.endOf(Date.now(), n) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const t = this.options, a = t.time, n = t.ticks, s = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const o = this.min, i = this.max, r = Xr(s, o, i);
    return this._unit = a.unit || (n.autoSkip ? $o(a.minUnit, this.min, this.max, this._getLabelCapacity(o)) : qu(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Ku(this._unit), this.initOffsets(s), t.reverse && r.reverse(), Mo(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, n = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - s : a = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = o : n = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = Pt(a, 0, i), n = Pt(n, 0, i), this._offsets = {
      start: a,
      end: n,
      factor: 1 / (a + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, n = this.max, s = this.options, o = s.time, i = o.unit || $o(o.minUnit, a, n, this._getLabelCapacity(a)), r = dt(s.ticks.stepSize, 1), l = i === "week" ? o.isoWeekday : !1, c = ha(l) || l === !0, u = {};
    let f = a, g, p;
    if (c && (f = +t.startOf(f, "isoWeek", l)), f = +t.startOf(f, c ? "day" : i), t.diff(n, a, i) > 1e5 * r)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + r + " " + i);
    const h = s.ticks.source === "data" && this.getDataTimestamps();
    for (g = f, p = 0; g < n; g = +t.add(g, r, i), p++)
      Co(u, g, h);
    return (g === n || s.bounds === "ticks" || p === 1) && Co(u, g, h), Object.keys(u).sort(ko).map((m) => +m);
  }
  getLabelForValue(t) {
    const a = this._adapter, n = this.options.time;
    return n.tooltipFormat ? a.format(t, n.tooltipFormat) : a.format(t, n.displayFormats.datetime);
  }
  format(t, a) {
    const s = this.options.time.displayFormats, o = this._unit, i = a || s[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, a, n, s) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return $t(i, [
        t,
        a,
        n
      ], this);
    const r = o.time.displayFormats, l = this._unit, c = this._majorUnit, u = l && r[l], f = c && r[c], g = n[a], p = c && f && g && g.major;
    return this._adapter.format(t, s || (p ? f : u));
  }
  generateTickLabels(t) {
    let a, n, s;
    for (a = 0, n = t.length; a < n; ++a)
      s = t[a], s.label = this._tickFormatFunction(s.value, a, t);
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, s = le(this.isHorizontal() ? a.maxRotation : a.minRotation), o = Math.cos(s), i = Math.sin(s), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * o + r * i,
      h: n * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, s = n[a.unit] || n.millisecond, o = this._tickFormatFunction(t, 0, Mo(this, [
      t
    ], this._majorUnit), s), i = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], a, n;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (a = 0, n = s.length; a < n; ++a)
      t = t.concat(s[a].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let a, n;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (a = 0, n = s.length; a < n; ++a)
      t.push(wo(this, s[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Qo(t.sort(ko));
  }
}
function Ta(e, t, a) {
  let n = 0, s = e.length - 1, o, i, r, l;
  a ? (t >= e[n].pos && t <= e[s].pos && ({ lo: n, hi: s } = Be(e, "pos", t)), { pos: o, time: r } = e[n], { pos: i, time: l } = e[s]) : (t >= e[n].time && t <= e[s].time && ({ lo: n, hi: s } = Be(e, "time", t)), { time: o, pos: r } = e[n], { time: i, pos: l } = e[s]);
  const c = i - o;
  return c ? r + (l - r) * (t - o) / c : r;
}
class AM extends So {
  static id = "timeseries";
  static defaults = So.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = Ta(a, this.min), this._tableRange = Ta(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: n } = this, s = [], o = [];
    let i, r, l, c, u;
    for (i = 0, r = t.length; i < r; ++i)
      c = t[i], c >= a && c <= n && s.push(c);
    if (s.length < 2)
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
    for (i = 0, r = s.length; i < r; ++i)
      u = s[i + 1], l = s[i - 1], c = s[i], Math.round((u + l) / 2) !== c && o.push({
        time: c,
        pos: i / (r - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, a = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(a) || n.length === 1) && n.push(a), n.sort((s, o) => s - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const a = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return a.length && n.length ? t = this.normalize(a.concat(n)) : t = a.length ? a : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Ta(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return Ta(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const Oi = {
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
  ...Oi,
  ...Xu
}, Zu = or[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ze(e) {
  return zo(e) ? Sn(e) : e;
}
function Qu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return zo(t) ? new Proxy(e, {}) : e;
}
function Ju(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function Vi(e, t) {
  e.labels = t;
}
function zi(e, t, a) {
  const n = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[a] === s[a]);
    return !o || !s.data || n.includes(o) ? {
      ...s
    } : (n.push(o), Object.assign(o, s), o);
  });
}
function th(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return Vi(a, e.labels), zi(a, e.datasets, t), a;
}
const eh = et({
  props: Gu,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const s = at(null), o = Vo(null);
    a({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: u, options: f, plugins: g, datasetIdKey: p } = e, h = th(u, p), m = Qu(h, u);
      o.value = new qe(s.value, {
        type: c,
        data: m,
        options: {
          ...f
        },
        plugins: g
      });
    }, r = () => {
      const c = Sn(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return ne(i), Ie(r), It([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [f, g] = c, [p, h] = u;
      const m = Sn(o.value);
      if (!m)
        return;
      let y = !1;
      if (f) {
        const _ = ze(f), $ = ze(p);
        _ && _ !== $ && (Ju(m, _), y = !0);
      }
      if (g) {
        const _ = ze(g.labels), $ = ze(h.labels), A = ze(g.datasets), T = ze(h.datasets);
        _ !== $ && (Vi(m.config.data, _), y = !0), A && A !== T && (zi(m.config.data, A, e.datasetIdKey), y = !0);
      }
      y && At(() => {
        l(m);
      });
    }, {
      deep: !0
    }), () => Mn("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      Mn("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function as(e, t) {
  return qe.register(t), et({
    props: Oi,
    setup(a, n) {
      let { expose: s } = n;
      const o = Vo(null), i = (r) => {
        o.value = r?.chart;
      };
      return s({
        chart: o
      }), () => Mn(eh, Zu({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const ah = /* @__PURE__ */ as("bar", Cc), nh = /* @__PURE__ */ as("line", Dc), sh = /* @__PURE__ */ as("pie", Ac), Do = {
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
}, Ao = {
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
function ht(e) {
  const t = at("light");
  let a = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = D(() => e?.value ? e.value : t.value), o = D(() => s.value === "dark"), i = D(() => o.value ? Ao : Do), r = () => {
    typeof document > "u" || (t.value = n(), a = new MutationObserver((c) => {
      for (const u of c)
        u.attributeName === "class" && (t.value = n());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    a && (a.disconnect(), a = null);
  };
  return ne(() => {
    r();
  }), Ie(() => {
    l();
  }), e && It(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Do,
    darkColors: Ao,
    chartSeriesColors: oh
  };
}
const ih = { class: "chart-container" }, rh = /* @__PURE__ */ et({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    qe.register(
      Ii,
      Ei,
      ru,
      Pi,
      es,
      ts
    );
    const { isDark: n, colors: s } = ht(ut(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => a.options ? a.options : {
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
            pointStyle: "rectRounded"
          },
          generateLabels: function(l) {
            return l.data.datasets.map((u, f) => ({
              text: i(u.label || ""),
              fillStyle: Array.isArray(u.backgroundColor) ? u.backgroundColor[0] : u.backgroundColor,
              strokeStyle: Array.isArray(u.borderColor) ? u.borderColor[0] : u.borderColor,
              lineWidth: u.borderWidth,
              hidden: !l.isDatasetVisible(f),
              index: f,
              datasetIndex: f
            }));
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              let c = String(i(l.dataset.label || ""));
              return c && (c += ": "), l.parsed.y !== null && (c += l.parsed.y), c;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          stacked: a.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return i(l);
            }
          }
        },
        x: {
          stacked: a.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const c = this.getLabelForValue(l);
              return i(c);
            }
          }
        }
      },
      elements: {
        bar: {
          borderRadius: 8,
          borderWidth: 0
        }
      }
    });
    return t({ isDark: n }), (l, c) => (v(), b("div", ih, [
      U(P(ah), {
        data: P(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), it = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, s] of t)
    a[n] = s;
  return a;
}, de = /* @__PURE__ */ it(rh, [["__scopeId", "data-v-105d8c6f"]]), lh = { class: "chart-container" }, ch = /* @__PURE__ */ et({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    qe.register(
      Ii,
      Ei,
      eu,
      Ka,
      Pi,
      es,
      ts,
      Su
    );
    const { isDark: n, colors: s } = ht(ut(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => a.options ? a.options : {
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
            pointStyle: "circle",
            generateLabels: function(l) {
              return l.data.datasets.map((u, f) => ({
                text: i(u.label || ""),
                fillStyle: u.backgroundColor,
                strokeStyle: u.borderColor,
                lineWidth: u.borderWidth,
                hidden: !l.isDatasetVisible(f),
                index: f,
                datasetIndex: f
              }));
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              let c = String(i(l.dataset.label || ""));
              return c && (c += ": "), l.parsed.y !== null && (c += l.parsed.y), c;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return i(l);
            }
          }
        },
        x: {
          border: {
            display: !1
          },
          grid: {
            color: s.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const c = this.getLabelForValue(l);
              return i(c);
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2.5,
          borderCapStyle: "round"
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          borderWidth: 2,
          backgroundColor: n.value ? "#1a1a1d" : "#ffffff",
          hoverBorderWidth: 3
        }
      }
    });
    return t({ isDark: n }), (l, c) => (v(), b("div", lh, [
      U(P(nh), {
        data: P(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ke = /* @__PURE__ */ it(ch, [["__scopeId", "data-v-bacd3848"]]), dh = { class: "chart-container" }, uh = /* @__PURE__ */ et({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    qe.register(Yd, es, ts);
    const { isDark: n, colors: s } = ht(ut(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => a.options ? a.options : {
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
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: s.value.textSecondary,
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              const c = l.data;
              return c.labels.length && c.datasets.length ? c.labels.map((u, f) => {
                const g = l.getDatasetMeta(0), p = c.datasets[0], h = p.data[f], m = Array.isArray(p.backgroundColor) ? p.backgroundColor[f] : p.backgroundColor;
                return {
                  text: `${i(u)}: ${h}`,
                  fillStyle: m,
                  hidden: g.data[f]?.hidden || !1,
                  index: f
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              const c = l.label || "", u = l.parsed || 0, f = l.dataset.data.reduce((p, h) => p + h, 0), g = (u / f * 100).toFixed(1);
              return `${i(c)}: ${u} (${g}%)`;
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
    return t({ isDark: n }), (l, c) => (v(), b("div", dh, [
      U(P(sh), {
        data: P(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ga = /* @__PURE__ */ it(uh, [["__scopeId", "data-v-23a84317"]]), hh = { class: "chart-container" }, fh = ["viewBox"], gh = ["transform"], ph = ["x", "width", "fill", "stroke"], vh = ["fill"], mh = ["x1", "y1", "x2", "y2", "stroke"], bh = ["points", "fill"], yh = ["x1", "y1", "x2", "y2", "stroke"], _h = ["x", "y", "fill"], xh = ["x1", "y1", "x2", "y2", "stroke"], kh = ["points", "fill"], wh = ["transform"], $h = ["y1", "y2"], Ch = ["y1", "y2"], Mh = ["y1", "y2"], Sh = ["y1", "y2"], Dh = ["y", "height"], Ah = ["y1", "y2"], Th = ["y1", "y2"], Bh = ["y1", "y2"], Lh = ["y1", "y2"], Fh = ["y", "height"], Ph = ["cy", "stroke", "onMouseenter"], Rh = ["cy", "stroke", "onMouseenter"], Ih = ["cy", "stroke", "onMouseenter"], Eh = ["cy", "stroke", "onMouseenter"], Oh = ["y1", "y2", "onMouseenter"], Vh = ["y1", "y2", "onMouseenter"], zh = ["x", "y", "fill"], Nh = ["x", "y", "fill"], Wh = ["transform"], Hh = { transform: "translate(-200, 0)" }, jh = ["stroke"], Yh = ["fill"], qh = { transform: "translate(-130, 0)" }, Kh = ["stroke"], Uh = ["fill"], Xh = { transform: "translate(-60, 0)" }, Gh = ["stroke"], Zh = ["fill"], Qh = { transform: "translate(10, 0)" }, Jh = ["stroke"], tf = ["fill"], ef = { transform: "translate(80, 0)" }, af = ["fill"], nf = { transform: "translate(150, 0)" }, sf = ["fill"], of = /* @__PURE__ */ et({
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
    const a = e, { isDark: n } = ht(ut(a, "theme")), s = D(() => ({
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
    })), o = at({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g, p) => {
      const h = g.currentTarget.closest("svg");
      if (!h) return;
      const m = h.getBoundingClientRect(), y = h.createSVGPoint();
      y.x = g.clientX - m.left, y.y = g.clientY - m.top, o.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: p
      };
    }, l = (g) => {
      if (o.value.visible) {
        const p = g.currentTarget, h = p.getBoundingClientRect(), m = p.createSVGPoint();
        m.x = g.clientX - h.left, m.y = g.clientY - h.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, f = D(() => {
      const g = [], h = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const y = m, _ = (y - 1) / 9, $ = a.chartMargin + h - _ * h;
        g.push({ value: y, y: $ });
      }
      return g;
    });
    return t({ isDark: n }), (g, p) => (v(), b("div", hh, [
      (v(), b("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: vt(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        o.value.visible ? (v(), b("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          d("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: s.value.tooltipBg,
            rx: "6",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, ph),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, C(o.value.text), 9, vh)
        ], 8, gh)) : V("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, mh),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, bh),
        (v(!0), b(Q, null, st(f.value, (h, m) => (v(), b(Q, { key: m }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, yh),
          d("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, C(h.value), 9, _h)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, xh),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, kh),
        (v(!0), b(Q, null, st(e.boxplotData, (h, m) => (v(), b(Q, { key: m }, [
          d("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            h.isTotal ? (v(), b(Q, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, $h),
              d("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ch),
              d("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Mh),
              d("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Sh),
              d("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Dh)
            ], 64)) : (v(), b(Q, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ah),
              d("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Th),
              d("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Bh),
              d("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Lh),
              d("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Fh)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: h.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Min: ${h.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ph),
            d("circle", {
              cx: 0,
              cy: h.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q1: ${h.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Rh),
            d("circle", {
              cx: 0,
              cy: h.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q3: ${h.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ih),
            d("circle", {
              cx: 0,
              cy: h.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Max: ${h.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Eh),
            d("line", {
              x1: -24,
              y1: h.medianY,
              x2: 24,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Median: ${h.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Oh),
            h.averageY ? (v(), b("line", {
              key: 2,
              x1: -24,
              y1: h.averageY,
              x2: 24,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Avg: ${h.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Vh)) : V("", !0)
          ], 8, wh),
          d("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, C(i(h.label)), 9, zh),
          h.responseCount ? (v(), b("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + C(h.responseCount), 9, Nh)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (v(), b("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Hh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, jh),
            d("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Yh)
          ]),
          d("g", qh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Kh),
            d("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Uh)
          ]),
          d("g", Xh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Gh),
            d("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Zh)
          ]),
          d("g", Qh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Jh),
            d("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, tf)
          ]),
          d("g", ef, [
            p[0] || (p[0] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, af)
          ]),
          d("g", nf, [
            p[1] || (p[1] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, sf)
          ])
        ], 8, Wh)) : V("", !0)
      ], 44, fh))
    ]));
  }
}), rf = /* @__PURE__ */ it(of, [["__scopeId", "data-v-520c623f"]]), lf = { class: "chart-container" }, cf = ["viewBox"], df = ["transform"], uf = ["x", "y", "width", "height", "fill", "stroke"], hf = ["y", "fill"], ff = ["y", "fill"], gf = ["x1", "y1", "x2", "y2", "stroke"], pf = ["points", "fill"], vf = ["x1", "y1", "x2", "y2", "stroke"], mf = ["x1", "y1", "x2", "y2", "stroke"], bf = ["x", "y", "fill"], yf = ["x", "y", "fill", "transform"], _f = ["x1", "y1", "x2", "y2", "stroke"], xf = ["points", "fill"], kf = ["transform"], wf = ["y1", "y2", "stroke", "onMouseenter"], $f = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Cf = ["x1", "y1", "x2", "y2", "onMouseenter"], Mf = ["x1", "y1", "x2", "y2", "onMouseenter"], Sf = ["cy", "stroke", "onMouseenter"], Df = ["cy", "stroke", "onMouseenter"], Af = ["x", "y", "fill"], Tf = ["x", "y", "fill"], Bf = ["transform"], Lf = { transform: "translate(-180, 0)" }, Ff = ["stroke"], Pf = ["fill"], Rf = { transform: "translate(-120, 0)" }, If = ["fill"], Ef = { transform: "translate(-60, 0)" }, Of = ["fill"], Vf = { transform: "translate(0, 0)" }, zf = ["stroke"], Nf = ["fill"], Wf = { transform: "translate(60, 0)" }, Hf = ["fill"], jf = { transform: "translate(130, 0)" }, Yf = ["fill"], qf = /* @__PURE__ */ et({
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
    const a = e, { isDark: n } = ht(ut(a, "theme")), s = D(() => ({
      // Tooltip
      tooltipBg: n.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: n.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: n.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = at({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g, p, h) => {
      const m = g.currentTarget.closest("svg");
      if (!m) return;
      const y = m.getBoundingClientRect(), _ = m.createSVGPoint();
      _.x = g.clientX - y.left, _.y = g.clientY - y.top;
      let $ = i(p.label), A = "";
      switch (h) {
        case "body":
          A = `Q1: ${p.q1.toFixed(1)} | Q3: ${p.q3.toFixed(1)}`;
          break;
        case "wick":
          A = `Min: ${p.low.toFixed(1)} | Max: ${p.high.toFixed(1)}`;
          break;
        case "median":
          A = `Median: ${p.median.toFixed(1)}`;
          break;
        case "average":
          A = `Average: ${p.average?.toFixed(1)}`;
          break;
        case "min":
          A = `Min: ${p.low.toFixed(1)}`;
          break;
        case "max":
          A = `Max: ${p.high.toFixed(1)}`;
          break;
      }
      const T = Math.max(180, A.length * 7 + 40), w = 48;
      o.value = {
        visible: !0,
        x: _.x,
        y: _.y - 20,
        title: $,
        text: A,
        width: T,
        height: w
      };
    }, l = (g) => {
      if (o.value.visible) {
        const p = g.currentTarget, h = p.getBoundingClientRect(), m = p.createSVGPoint();
        m.x = g.clientX - h.left, m.y = g.clientY - h.top, o.value.x = m.x, o.value.y = m.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, f = D(() => {
      const g = [], h = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const y = m, _ = (y - 1) / 9, $ = a.chartMargin + h - _ * h;
        g.push({ value: y, y: $ });
      }
      return g;
    });
    return t({ isDark: n }), (g, p) => (v(), b("div", lf, [
      (v(), b("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: vt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        o.value.visible ? (v(), b("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          d("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: s.value.tooltipBg,
            rx: "8",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, uf),
          d("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, C(o.value.title), 9, hf),
          d("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: s.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, C(o.value.text), 9, ff)
        ], 8, df)) : V("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, gf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, pf),
        (v(!0), b(Q, null, st(f.value, (h, m) => (v(), b("line", {
          key: `grid-${m}`,
          x1: e.chartMargin,
          y1: h.y,
          x2: e.chartWidth - e.chartMargin,
          y2: h.y,
          stroke: s.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, vf))), 128)),
        (v(!0), b(Q, null, st(f.value, (h, m) => (v(), b(Q, { key: m }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, mf),
          d("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, C(h.value), 9, bf)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: s.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, C(i(e.yAxisLabel)), 9, yf),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, _f),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, xf),
        (v(!0), b(Q, null, st(e.candlestickData, (h, m) => (v(), b(Q, { key: m }, [
          d("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: h.highY,
              x2: 0,
              y2: h.lowY,
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (y) => r(y, h, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wf),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(h.q1Y, h.q3Y) - (Math.abs(h.q3Y - h.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(h.q3Y - h.q1Y)),
              fill: h.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (y) => r(y, h, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, $f),
            h.medianY ? (v(), b("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: h.medianY,
              x2: e.candleWidth / 2,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (y) => r(y, h, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Cf)) : V("", !0),
            h.averageY ? (v(), b("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: h.averageY,
              x2: e.candleWidth / 2,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (y) => r(y, h, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mf)) : V("", !0),
            d("circle", {
              cx: 0,
              cy: h.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, h, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sf),
            d("circle", {
              cx: 0,
              cy: h.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, h, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Df)
          ], 8, kf),
          d("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, C(i(h.label)), 9, Af),
          h.responseCount ? (v(), b("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + C(h.responseCount), 9, Tf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (v(), b("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Lf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ff),
            d("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Pf)
          ]),
          d("g", Rf, [
            p[0] || (p[0] = d("rect", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, If)
          ]),
          d("g", Ef, [
            p[1] || (p[1] = d("rect", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Of)
          ]),
          d("g", Vf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, zf),
            d("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Nf)
          ]),
          d("g", Wf, [
            p[2] || (p[2] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Hf)
          ]),
          d("g", jf, [
            p[3] || (p[3] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Yf)
          ])
        ], 8, Bf)) : V("", !0)
      ], 44, cf))
    ]));
  }
}), Ni = /* @__PURE__ */ it(qf, [["__scopeId", "data-v-61d0259c"]]), Kf = { class: "chart-container" }, Uf = ["viewBox"], Xf = ["transform"], Gf = ["x", "y", "width", "height", "fill", "stroke"], Zf = ["y", "fill"], Qf = ["y", "fill"], Jf = ["x1", "y1", "x2", "y2", "stroke"], tg = ["x1", "y1", "x2", "y2", "stroke"], eg = ["points", "fill"], ag = ["x1", "y1", "x2", "y2", "stroke"], ng = ["x", "y", "fill"], sg = ["x", "y", "fill", "transform"], og = ["x1", "y1", "x2", "y2", "stroke"], ig = ["points", "fill"], rg = ["x1", "y1", "x2", "y2", "stroke"], lg = ["x", "y", "fill"], cg = ["x", "y", "fill"], dg = ["d"], ug = ["x", "y", "width", "height", "onMouseenter"], hg = ["x1", "y1", "x2", "y2"], fg = ["x", "y"], gg = ["x1", "y1", "x2", "y2"], pg = ["x", "y"], vg = ["x1", "y1", "x2", "y2"], mg = ["x", "y"], bg = ["x1", "y1", "x2", "y2"], yg = ["x", "y"], _g = ["x1", "y1", "x2", "y2"], xg = ["x", "y"], kg = ["x1", "y1", "x2", "y2"], wg = ["x", "y"], $g = ["transform"], Cg = { transform: "translate(-220, 0)" }, Mg = ["fill"], Sg = { transform: "translate(-140, 0)" }, Dg = ["fill"], Ag = { transform: "translate(-80, 0)" }, Tg = ["fill"], Bg = { transform: "translate(-20, 0)" }, Lg = ["fill"], Fg = { transform: "translate(60, 0)" }, Pg = ["fill"], Rg = { transform: "translate(130, 0)" }, Ig = ["fill"], Eg = { transform: "translate(180, 0)" }, Og = ["fill"], Vg = /* @__PURE__ */ et({
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
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = ht(ut(a, "theme")), s = D(() => ({
      // Tooltip
      tooltipBg: n.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: n.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: n.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = at({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = D(() => a.chartWidth - a.chartMargin * 2), r = D(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), l = D(() => i.value / 10 * 0.6), c = D(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const I = Math.max(...a.histogram.map((z) => z.count || 0), 1), R = Math.max(1, Math.ceil(I * 0.2));
      return I + R;
    }), u = D(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const I = a.averageScore || 0;
      let R = 0, z = 0;
      if (a.histogram.forEach((G) => {
        const ot = G.count || 0;
        R += ot;
        const J = G.score - I;
        z += ot * (J * J);
      }), R === 0) return 1;
      const N = z / R;
      return Math.sqrt(N) || 1;
    }), f = (I, R, z) => {
      if (z === 0) return 0;
      const N = 1 / (z * Math.sqrt(2 * Math.PI)), G = -0.5 * Math.pow((I - R) / z, 2);
      return N * Math.exp(G);
    }, g = D(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && u.value === 0) return null;
      const I = a.averageScore, R = u.value, z = 100, G = Math.max(...a.histogram.map((rt) => rt.count || 0), 1) / c.value * r.value;
      if (G <= 0) return null;
      let ot = 0;
      for (let rt = 0; rt <= z; rt++) {
        const mt = 1 + 9 * (rt / z), lt = f(mt, I, R);
        lt > ot && (ot = lt);
      }
      if (ot <= 0) return null;
      const J = G / ot, ct = [];
      for (let rt = 0; rt <= z; rt++) {
        const mt = 1 + 9 * (rt / z), lt = f(mt, I, R) * J, Gt = h(mt);
        if (Gt !== null) {
          const ge = a.chartHeight - a.chartBottomMargin - lt;
          ct.push(`${rt === 0 ? "M" : "L"} ${Gt} ${ge}`);
        }
      }
      return ct.join(" ");
    }), p = D(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const I = i.value / 10;
      return a.histogram.map((R, z) => {
        const N = a.chartMargin + (z + 0.5) * I, G = R.count > 0 ? R.count / c.value * r.value : 0, ot = a.chartHeight - a.chartBottomMargin - G;
        return {
          score: R.score,
          count: R.count,
          x: N,
          y: ot,
          height: G
        };
      });
    }), h = (I) => {
      if (I < 1 || I > 10) return null;
      const R = i.value / 10;
      return a.chartMargin + (I - 0.5) * R;
    }, m = D(() => h(a.minScore)), y = D(() => h(a.maxScore)), _ = D(() => h(a.q1Score)), $ = D(() => h(a.medianScore)), A = D(() => h(a.q3Score)), T = D(() => h(a.averageScore)), w = D(() => a.minScore), x = D(() => a.maxScore), k = D(() => a.q1Score), S = D(() => a.medianScore), F = D(() => a.q3Score), B = D(() => a.averageScore), M = D(() => {
      const I = [], R = a.chartMargin - 8, z = 18;
      _.value !== null && I.push({
        x: _.value,
        y: R,
        value: a.q1Score,
        label: `Q1: ${k.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), $.value !== null && I.push({
        x: $.value,
        y: R - z,
        value: a.medianScore,
        label: `Median: ${S.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && I.push({
        x: T.value,
        y: R - z,
        value: a.averageScore,
        label: `Avg: ${B.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), A.value !== null && I.push({
        x: A.value,
        y: R,
        value: a.q3Score,
        label: `Q3: ${F.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), I.sort((ot, J) => (ot.x || 0) - (J.x || 0));
      const N = [[], [], []];
      I.forEach((ot) => {
        if (ot.x === null) return;
        let J = -1;
        for (let ct = 0; ct < N.length; ct++) {
          let rt = !1;
          for (const mt of N[ct]) {
            if (mt.x === null) continue;
            const lt = Math.abs(ot.x - mt.x), Gt = (ot.width + mt.width) / 2 + 10;
            if (lt < Gt) {
              rt = !0;
              break;
            }
          }
          if (!rt) {
            J = ct;
            break;
          }
        }
        J === -1 && (J = N.length - 1), ot.y = R - J * z, N[J].push(ot);
      });
      const G = 15;
      return I.forEach((ot) => {
        ot.y < G && (ot.y = G);
      }), I;
    }), L = (I) => M.value.find((z) => z.id === I)?.y || a.chartMargin - 10, E = D(() => {
      const I = [];
      for (let z = 0; z <= 5; z++) {
        const N = Math.round(c.value / 5 * z), G = a.chartHeight - a.chartBottomMargin - z / 5 * r.value;
        I.push({ value: N, y: G });
      }
      return I;
    }), H = (I, R) => {
      const z = I.currentTarget.closest("svg");
      if (!z) return;
      const N = z.getBoundingClientRect(), G = z.createSVGPoint();
      G.x = I.clientX - N.left, G.y = I.clientY - N.top;
      const ot = `Score: ${R.score}`, J = `Count: ${R.count}`, ct = 120, rt = 48;
      o.value = {
        visible: !0,
        x: G.x,
        y: G.y - 20,
        title: ot,
        text: J,
        width: ct,
        height: rt
      };
    }, K = (I) => {
      if (o.value.visible) {
        const R = I.currentTarget, z = R.getBoundingClientRect(), N = R.createSVGPoint();
        N.x = I.clientX - z.left, N.y = I.clientY - z.top, o.value.x = N.x, o.value.y = N.y - 20;
      }
    }, X = () => {
      o.value.visible = !1;
    }, j = () => {
      o.value.visible = !1;
    };
    return t({ isDark: n }), (I, R) => (v(), b("div", Kf, [
      (v(), b("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: vt(`min-height: ${e.chartHeight}px;`),
        onMousemove: K,
        onMouseleave: X
      }, [
        o.value.visible ? (v(), b("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          d("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: s.value.tooltipBg,
            rx: "8",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Gf),
          d("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, C(o.value.title), 9, Zf),
          d("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: s.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, C(o.value.text), 9, Qf)
        ], 8, Xf)) : V("", !0),
        (v(!0), b(Q, null, st(E.value, (z, N) => (v(), b("line", {
          key: `grid-${N}`,
          x1: e.chartMargin,
          y1: z.y,
          x2: e.chartWidth - e.chartMargin,
          y2: z.y,
          stroke: s.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Jf))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, tg),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, eg),
        (v(!0), b(Q, null, st(E.value, (z, N) => (v(), b(Q, {
          key: `y-tick-${N}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: z.y,
            x2: e.chartMargin,
            y2: z.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ag),
          d("text", {
            x: e.chartMargin - 12,
            y: z.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, C(z.value), 9, ng)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: s.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, sg),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, og),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, ig),
        (v(!0), b(Q, null, st(p.value, (z, N) => (v(), b(Q, {
          key: `tick-${N}`
        }, [
          d("line", {
            x1: z.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: z.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, rg),
          d("text", {
            x: z.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, C(z.score), 9, lg)
        ], 64))), 128)),
        d("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: s.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, cg),
        g.value ? (v(), b("path", {
          key: 1,
          d: g.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, dg)) : V("", !0),
        (v(!0), b(Q, null, st(p.value, (z, N) => (v(), b("rect", {
          key: `bar-${N}`,
          x: z.x - l.value / 2,
          y: z.y,
          width: l.value,
          height: z.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (G) => H(G, z),
          onMouseleave: j,
          style: { cursor: "pointer" }
        }, null, 40, ug))), 128)),
        m.value ? (v(), b("line", {
          key: 2,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, hg)) : V("", !0),
        m.value ? (v(), b("text", {
          key: 3,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + C(w.value.toFixed(1)), 9, fg)) : V("", !0),
        _.value ? (v(), b("line", {
          key: 4,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, gg)) : V("", !0),
        _.value ? (v(), b("text", {
          key: 5,
          x: _.value,
          y: L("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + C(k.value.toFixed(1)), 9, pg)) : V("", !0),
        $.value ? (v(), b("line", {
          key: 6,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, vg)) : V("", !0),
        $.value ? (v(), b("text", {
          key: 7,
          x: $.value,
          y: L("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + C(S.value.toFixed(1)), 9, mg)) : V("", !0),
        T.value ? (v(), b("line", {
          key: 8,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, bg)) : V("", !0),
        T.value ? (v(), b("text", {
          key: 9,
          x: T.value,
          y: L("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + C(B.value.toFixed(1)), 9, yg)) : V("", !0),
        A.value ? (v(), b("line", {
          key: 10,
          x1: A.value,
          y1: e.chartMargin,
          x2: A.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, _g)) : V("", !0),
        A.value ? (v(), b("text", {
          key: 11,
          x: A.value,
          y: L("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + C(F.value.toFixed(1)), 9, xg)) : V("", !0),
        y.value ? (v(), b("line", {
          key: 12,
          x1: y.value,
          y1: e.chartMargin,
          x2: y.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, kg)) : V("", !0),
        y.value ? (v(), b("text", {
          key: 13,
          x: y.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + C(x.value.toFixed(1)), 9, wg)) : V("", !0),
        e.showLegend ? (v(), b("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", Cg, [
            R[0] || (R[0] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, Mg)
          ]),
          d("g", Sg, [
            R[1] || (R[1] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Dg)
          ]),
          d("g", Ag, [
            R[2] || (R[2] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Tg)
          ]),
          d("g", Bg, [
            R[3] || (R[3] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Lg)
          ]),
          d("g", Fg, [
            R[4] || (R[4] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Pg)
          ]),
          d("g", Rg, [
            R[5] || (R[5] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Ig)
          ]),
          d("g", Eg, [
            R[6] || (R[6] = d("line", {
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
              fill: s.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Og)
          ])
        ], 8, $g)) : V("", !0)
      ], 44, Uf))
    ]));
  }
}), Wi = /* @__PURE__ */ it(Vg, [["__scopeId", "data-v-64e657d9"]]), zg = 639, Hi = 1024;
function To(e) {
  return e < 640 ? "mobile" : e <= Hi ? "tablet" : "desktop";
}
function Ng() {
  const e = at(
    typeof window > "u" ? "desktop" : To(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = To(window.innerWidth));
  };
  let a = null, n = null, s = null, o = null;
  ne(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${zg}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${Hi}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, a.addEventListener("change", o), n.addEventListener("change", o), s.addEventListener("change", o));
  }), Ie(() => {
    !o || !a || !n || !s || (a.removeEventListener("change", o), n.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = D(() => e.value === "mobile"), r = D(() => e.value === "tablet"), l = D(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: r,
    isDesktop: l
  };
}
const Wg = { class: "chart-container" }, Hg = {
  key: 1,
  class: "chart-wrapper"
}, jg = /* @__PURE__ */ et({
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
    rs.use([ir, rr, lr, cr]);
    const a = e, { isDark: n, colors: s } = ht(ut(a, "theme")), { breakpoint: o } = Ng(), i = at(null), r = at(!0), l = at(!1);
    let c = null;
    const u = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, f = D(() => {
      const x = o.value;
      return x === "mobile" ? {
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
      } : x === "tablet" ? {
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
        nodeGap: a.nodeGap,
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
    }), g = (x, k) => {
      const S = x.trim();
      if (!S || k < 1) return x;
      if (S.length <= k) return S;
      const F = [];
      let B = 0;
      for (; B < S.length; ) {
        const M = Math.min(B + k, S.length);
        if (M >= S.length) {
          const H = S.slice(B).trim();
          H && F.push(H);
          break;
        }
        const L = S.slice(B, M), E = L.lastIndexOf(" ");
        if (E > 0)
          for (F.push(S.slice(B, B + E).trim()), B += E; B < S.length && S[B] === " "; ) B += 1;
        else
          F.push(L), B = M;
      }
      return F.join(`
`);
    }, p = [
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
    ], h = () => {
      const x = a.data.links.filter(
        (B) => B.source && B.target && typeof B.value == "number"
      ), k = Math.max(...x.map((B) => B.value), 1), S = Math.max(1, k * 0.01), F = x.map((B) => ({
        ...B,
        originalValue: B.value,
        value: B.value < k * 0.01 ? S : B.value
      }));
      return {
        nodes: a.data.nodes.filter((B) => B.name),
        links: F
      };
    }, m = (x) => x.map((k, S) => ({
      ...k,
      itemStyle: {
        color: a.nodeColors[k.name] || p[S % p.length],
        borderRadius: 8
      }
    })), y = (x) => (k) => {
      const S = k.dataType === "node", F = s.value.tooltipText, B = n.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const K = x.filter((I) => I.target === k.name), X = x.filter((I) => I.source === k.name), j = K.length > 0 ? K.reduce((I, R) => I + (R.originalValue || R.value), 0) : X.reduce((I, R) => I + (R.originalValue || R.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${k.name}</div><div style="color: ${B}; font-size: 12px;">Count: ${j.toLocaleString()}</div>`;
      }
      const M = k.data?.source || k.source || "Unknown", L = k.data?.target || k.target || "Unknown", E = k.data?.originalValue || k.data?.value || k.value || 0, H = k.data?.label || `${E.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${F};">${M} → ${L}</div><div style="color: ${B}; font-size: 12px;">Flow: ${H}</div>`;
    }, _ = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const x = f.value;
      try {
        const { nodes: k, links: S } = h(), F = m(k), B = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: y(S),
            backgroundColor: s.value.tooltipBg,
            borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              data: F,
              links: S,
              emphasis: { focus: "adjacency" },
              levels: [
                {
                  depth: 0,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: "source", opacity: 0.5 }
                },
                {
                  depth: 1,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: "source", opacity: 0.5 }
                }
              ],
              lineStyle: {
                color: a.useGradient ? "gradient" : "source",
                curveness: 0.5,
                opacity: 0.6
              },
              itemStyle: u.style,
              label: {
                show: !0,
                position: x.labelPosition,
                color: "#000000",
                fontWeight: 600,
                fontSize: x.labelFontSize,
                ...x.labelWrap && x.labelLineHeight > 0 ? { lineHeight: x.labelLineHeight } : {},
                ...x.labelWrap && x.labelTextWidth > 0 ? { width: x.labelTextWidth, overflow: "none" } : {},
                ...x.labelDistance > 0 ? { distance: x.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (M) => {
                  const L = M.name || "";
                  if (x.labelWrap)
                    return g(L, Math.max(4, x.labelCharsPerLine));
                  const E = x.labelMaxChars;
                  return L.length > E ? `${L.substring(0, E)}...` : L;
                }
              },
              edgeLabel: x.edgeLabelShow ? {
                show: !0,
                fontSize: x.edgeLabelFontSize,
                color: s.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (M) => {
                  const L = M.data?.originalValue || M.value || 0;
                  return M.data?.label || `${L.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: u.node.align,
              nodeGap: x.nodeGap,
              nodeWidth: x.nodeWidth,
              layoutIterations: u.node.iterations,
              orient: x.orient,
              draggable: !1,
              ...x.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: u.animation.duration,
          animationEasing: u.animation.easing
        };
        c.setOption(B), c.resize();
      } catch (k) {
        console.error("Error setting Sankey chart options:", k), l.value = !0;
      }
    }, $ = async () => {
      if (i.value)
        try {
          c = rs.init(i.value), _(), window.addEventListener("resize", T);
        } catch (x) {
          console.error("Error initializing Sankey chart:", x), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, A = async (x = 40) => {
      await At();
      for (let k = 0; k < x; k++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await $();
        await new Promise((S) => setTimeout(S, 50));
      }
      await $(), setTimeout(T, 50);
    }, T = () => c?.resize(), w = () => {
      window.removeEventListener("resize", T), c && (c.dispose(), c = null);
    };
    return ne(() => i.value && A()), No(w), It(() => a.data, _, { deep: !0 }), It(n, _), It(o, _), t({ isDark: n }), (x, k) => (v(), b("div", Wg, [
      l.value ? (v(), b("div", {
        key: 0,
        class: "error-state",
        style: vt({ height: e.height })
      }, [...k[0] || (k[0] = [
        nt('<div class="error-content" data-v-3c2ea95f><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3c2ea95f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-3c2ea95f></path></svg><p class="error-title" data-v-3c2ea95f>Chart could not be loaded</p><p class="error-description" data-v-3c2ea95f>Please check the data format.</p></div>', 1)
      ])], 4)) : (v(), b("div", Hg, [
        Kt(d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: vt({ height: e.height })
        }, null, 4), [
          [ra, !r.value]
        ]),
        Kt(d("div", {
          class: "loading-state",
          style: vt({ height: e.height })
        }, [...k[1] || (k[1] = [
          nt('<div class="loading-container" data-v-3c2ea95f><div class="sankey-loader" data-v-3c2ea95f><div class="flow flow-1" data-v-3c2ea95f></div><div class="flow flow-2" data-v-3c2ea95f></div><div class="flow flow-3" data-v-3c2ea95f></div><div class="flow flow-4" data-v-3c2ea95f></div></div><p class="loading-text" data-v-3c2ea95f>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [ra, r.value]
        ])
      ]))
    ]));
  }
}), we = /* @__PURE__ */ it(jg, [["__scopeId", "data-v-3c2ea95f"]]);
function Yg(e, t) {
  return v(), b("svg", {
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
function qg(e, t) {
  return v(), b("svg", {
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
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    })
  ]);
}
function Kg(e, t) {
  return v(), b("svg", {
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
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function ji(e, t) {
  return v(), b("svg", {
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
function Nt(e, t) {
  return v(), b("svg", {
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
function Ug(e, t) {
  return v(), b("svg", {
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
function Yi(e, t) {
  return v(), b("svg", {
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
function Xg(e, t) {
  return v(), b("svg", {
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
function Gg(e, t) {
  return v(), b("svg", {
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
function Zg(e, t) {
  return v(), b("svg", {
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
function Bo(e, t) {
  return v(), b("svg", {
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
function Qg(e, t) {
  return v(), b("svg", {
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
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Jg(e, t) {
  return v(), b("svg", {
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
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    })
  ]);
}
function tp(e, t) {
  return v(), b("svg", {
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
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    })
  ]);
}
function ep(e, t) {
  return v(), b("svg", {
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
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    })
  ]);
}
function qi(e, t) {
  return v(), b("svg", {
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
const ap = { class: "chart-footer" }, np = { class: "export-actions" }, sp = { class: "export-buttons" }, op = ["disabled"], ip = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, rp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, lp = ["disabled"], cp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, dp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, up = /* @__PURE__ */ et({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, n = t, s = (i) => a.formats.includes(i), o = (i) => {
      a.loading || n("export", i);
    };
    return (i, r) => (v(), b("footer", ap, [
      r[9] || (r[9] = d("div", { class: "footer-divider" }, null, -1)),
      d("div", np, [
        r[8] || (r[8] = d("span", { class: "export-label" }, "Export", -1)),
        d("div", sp, [
          s("pdf") ? (v(), b("button", {
            key: 0,
            type: "button",
            class: q(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (v(), b("svg", ip, [...r[2] || (r[2] = [
              d("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (v(), b("svg", rp, [...r[3] || (r[3] = [
              nt('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = d("span", null, "PDF", -1))
          ], 10, op)) : V("", !0),
          s("csv") ? (v(), b("button", {
            key: 1,
            type: "button",
            class: q(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (v(), b("svg", cp, [...r[5] || (r[5] = [
              d("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (v(), b("svg", dp, [...r[6] || (r[6] = [
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
            r[7] || (r[7] = d("span", null, "CSV", -1))
          ], 10, lp)) : V("", !0)
        ])
      ])
    ]));
  }
}), Mt = /* @__PURE__ */ it(up, [["__scopeId", "data-v-672661d4"]]), hp = { class: "agents-per-day-card" }, fp = {
  key: 0,
  class: "card-body"
}, gp = {
  key: 0,
  class: "chart-section"
}, pp = {
  key: 1,
  class: "empty-state"
}, vp = { class: "empty-state-content" }, mp = { class: "empty-icon-wrapper" }, bp = {
  key: 1,
  class: "loading-state"
}, yp = /* @__PURE__ */ et({
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
    }, s = e, o = a, i = (g) => {
      o("export", g);
    }, { isDark: r, colors: l } = ht(ut(s, "theme")), c = (g) => {
      const p = new Date(g), h = String(p.getDate()).padStart(2, "0"), m = String(p.getMonth() + 1).padStart(2, "0");
      return `${h}-${m}`;
    }, u = D(() => {
      const g = s.data?.agents_by_day || {}, p = Object.keys(g).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((A) => c(A)), m = /* @__PURE__ */ new Set();
      for (const A of Object.values(g))
        for (const T of Object.keys(A))
          m.add(T);
      const y = Array.from(m), _ = (A) => A, $ = y.map((A) => ({
        label: A,
        data: p.map((T) => g[T]?.[A] || 0),
        backgroundColor: `${n[A] || "#94a3b8"}80`,
        borderColor: _(n[A] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: h,
        datasets: $
      };
    }), f = D(() => s.options ? s.options : {
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
            color: l.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: l.value.tooltipBg,
          titleColor: l.value.tooltipText,
          bodyColor: l.value.tooltipText,
          borderColor: r.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: {
            display: !1
          },
          grid: {
            display: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: l.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: l.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: r }), (g, p) => (v(), b("article", hp, [
      p[3] || (p[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          d("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (v(), b("div", bp, [...p[2] || (p[2] = [
        nt('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", fp, [
        u.value.labels && u.value.labels.length ? (v(), b("section", gp, [
          U(de, {
            data: u.value,
            options: f.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", pp, [
          d("div", vp, [
            d("div", mp, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = d("p", { class: "empty-title" }, "No agents data per day", -1)),
            p[1] || (p[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), _p = /* @__PURE__ */ it(yp, [["__scopeId", "data-v-4d18c22c"]]), Z = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), xt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), te = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, xp = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, kp = { class: "overflow-x-auto" }, wp = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, $p = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Cp = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Mp = ["checked", "aria-label"], Sp = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Dp = ["checked", "aria-label", "onChange"], Ap = /* @__PURE__ */ et({
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
    const a = e, n = t, s = at(null);
    function o($) {
      return `cell-${$}`;
    }
    function i($) {
      return $ === "center" ? "text-center" : $ === "right" ? "text-right" : "text-left";
    }
    function r($, A) {
      if (typeof a.rowKey == "function")
        return a.rowKey($);
      const T = $[a.rowKey];
      return T != null ? String(T) : `__index_${A}`;
    }
    function l($, A) {
      return $[A];
    }
    function c($) {
      return $ == null || typeof $ == "object" ? "" : String($);
    }
    function u($, A) {
      return r($, A);
    }
    const f = D(() => a.rows.map(($, A) => r($, A)));
    function g($, A) {
      const T = r($, A);
      return a.selectedKeys.includes(T);
    }
    const p = D(() => !a.selectable || a.rows.length === 0 ? !1 : f.value.every(($) => a.selectedKeys.includes($))), h = D(() => {
      if (!a.selectable || a.rows.length === 0) return !1;
      const $ = f.value.filter((A) => a.selectedKeys.includes(A));
      return $.length > 0 && $.length < a.rows.length;
    });
    It(
      [h, p, () => a.selectable],
      async () => {
        await At();
        const $ = s.value;
        $ && ($.indeterminate = h.value && !p.value);
      },
      { immediate: !0 }
    );
    function m() {
      if (a.selectable)
        if (p.value) {
          const $ = a.selectedKeys.filter((A) => !f.value.includes(A));
          n("update:selectedKeys", $);
        } else {
          const $ = new Set(a.selectedKeys);
          f.value.forEach((A) => $.add(A)), n("update:selectedKeys", [...$]);
        }
    }
    function y($, A) {
      if (!a.selectable) return;
      const T = r($, A);
      a.selectedKeys.includes(T) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((x) => x !== T)
      ) : n("update:selectedKeys", [...a.selectedKeys, T]);
    }
    function _($, A) {
      const T = r($, A);
      return `${a.ariaLabelSelectRow} ${T}`;
    }
    return ($, A) => (v(), b("div", xp, [
      d("div", kp, [
        d("table", wp, [
          d("thead", null, [
            d("tr", $p, [
              e.selectable ? (v(), b("th", Cp, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: m
                }, null, 40, Mp)
              ])) : V("", !0),
              (v(!0), b(Q, null, st(e.columns, (T) => (v(), b("th", {
                key: T.key,
                scope: "col",
                class: q([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(T.align),
                  T.headerClass ?? ""
                ])
              }, C(T.label), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (v(!0), b(Q, null, st(e.rows, (T, w) => (v(), b("tr", {
              key: u(T, w),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (v(), b("td", Sp, [
                d("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: g(T, w),
                  "aria-label": _(T, w),
                  onChange: (x) => y(T, w)
                }, null, 40, Dp)
              ])) : V("", !0),
              (v(!0), b(Q, null, st(e.columns, (x) => (v(), b("td", {
                key: x.key,
                class: q([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(x.align),
                  x.cellClass ?? ""
                ])
              }, [
                Ot($.$slots, o(x.key), {
                  row: T,
                  column: x,
                  value: l(T, x.key)
                }, () => [
                  wt(C(c(l(T, x.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), jt = /* @__PURE__ */ it(Ap, [["__scopeId", "data-v-95fc0bc9"]]), Tp = { class: "booking-manager-card metric-collapsible" }, Bp = { class: "card-header metric-collapsible__summary" }, Lp = { class: "header-content" }, Fp = {
  key: 0,
  class: "payment-success-badge"
}, Pp = {
  key: 0,
  class: "currency-breakdown-list"
}, Rp = {
  key: 1,
  class: "badge-value"
}, Ip = {
  key: 0,
  class: "loading-state"
}, Ep = {
  key: 1,
  class: "error-state"
}, Op = { class: "error-content" }, Vp = { class: "error-description" }, zp = {
  key: 2,
  class: "card-body"
}, Np = { class: "chart-section" }, Wp = { class: "chart-wrapper" }, Hp = {
  key: 0,
  class: "table-section"
}, jp = { class: "table-wrapper" }, Yp = { class: "bm-cell font-medium" }, qp = { class: "bm-cell text-center" }, Kp = { class: "bm-cell text-center" }, Up = { class: "percentage-text" }, Xp = { class: "bm-cell text-center" }, Gp = { class: "badges-container" }, Zp = { class: "badge badge-success" }, Qp = { class: "badge badge-error" }, Jp = {
  key: 0,
  class: "badges-container"
}, t0 = {
  key: 1,
  class: "percentage-text"
}, e0 = { class: "badges-container" }, a0 = { class: "badge badge-error" }, n0 = { class: "badge badge-warning" }, s0 = { class: "badge badge-yellow" }, o0 = { class: "badge badge-error" }, i0 = {
  key: 1,
  class: "empty-state"
}, fn = 3, r0 = /* @__PURE__ */ et({
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
    function a(w) {
      return w;
    }
    const n = e, s = t, o = (w) => {
      s("export", w);
    }, i = at(!1), r = D(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (w, x) => new Date(w.date).getTime() - new Date(x.date).getTime()
    ) : []), l = D(() => i.value ? r.value : r.value.slice(0, fn)), c = D(() => r.value.length > fn), u = D(
      () => Math.max(0, r.value.length - fn)
    ), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], g = D(
      () => l.value.map((w) => ({
        id: w.date,
        ...w
      }))
    ), p = D(() => n.data?.total_payment_success_value || []), h = (w) => w.payment_success_value || [], m = (w) => typeof w.payment_success_count == "number" ? w.payment_success_count : (w.payment_success_value || []).reduce((x, k) => x + (k.count || 0), 0), y = (w) => xt(w), _ = (w) => w == null ? "0" : te(w);
    D(() => (n.data?.total_payment_success_value || []).reduce((w, x) => w + (x.total_value || 0), 0));
    const $ = D(() => {
      const w = n.data, x = w.total_booking_initiated || 0, k = w.total_booking_started || 0, S = w.total_payment_initiated || 0, F = w.total_not_found || 0, B = w.total_cancelled || 0, M = w.total_no_pending_balance || 0, L = w.total_errors || 0, E = typeof w.total_payment_success == "number" ? w.total_payment_success : (w.total_payment_success_value || []).reduce((z, N) => z + (N.count || 0), 0), H = w.total_payment_failed || 0, K = Math.max(0, x - k), X = Math.max(0, k - S - F - B - M - L), j = (z, N) => {
        const G = N > 0 ? Math.round(z / N * 100) : 0;
        return `${Z(z)} (${G}%)`;
      }, I = [
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
      ], R = [];
      return k > 0 && R.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: j(k, x)
      }), K > 0 && R.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: K,
        label: j(K, x)
      }), S > 0 && R.push({
        source: "Started",
        target: "Payment Initiated",
        value: S,
        label: j(S, k)
      }), F > 0 && R.push({
        source: "Started",
        target: "Not Found",
        value: F,
        label: j(F, k)
      }), B > 0 && R.push({
        source: "Started",
        target: "Cancelled",
        value: B,
        label: j(B, k)
      }), M > 0 && R.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: j(M, k)
      }), L > 0 && R.push({
        source: "Started",
        target: "Errors",
        value: L,
        label: j(L, k)
      }), X > 0 && R.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: X,
        label: j(X, k)
      }), E > 0 && R.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: E,
        label: j(E, S)
      }), H > 0 && R.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: H,
        label: j(H, S)
      }), { nodes: I, links: R };
    }), A = {
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
    }, T = (w, x) => !x || x === 0 ? "0%" : `${Math.round(w / x * 100)}%`;
    return (w, x) => (v(), b("details", Tp, [
      d("summary", Bp, [
        d("div", Lp, [
          x[2] || (x[2] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Booking Manager Metrics"),
            d("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          n.loading ? V("", !0) : (v(), b("div", Fp, [
            x[1] || (x[1] = d("p", { class: "badge-label" }, "Payment Success Value", -1)),
            p.value.length > 0 ? (v(), b("div", Pp, [
              (v(!0), b(Q, null, st(p.value, (k) => (v(), b("p", {
                key: k.currency,
                class: "currency-breakdown-item"
              }, C(k.currency) + " " + C(_(k.total_value)), 1))), 128))
            ])) : (v(), b("p", Rp, C(_(0)), 1))
          ]))
        ]),
        x[3] || (x[3] = d("svg", {
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
      n.loading ? (v(), b("div", Ip, [...x[4] || (x[4] = [
        nt('<div class="loading-container" data-v-20afb7e7><div class="chart-flow-loader" data-v-20afb7e7><div class="flow-line flow-1" data-v-20afb7e7></div><div class="flow-line flow-2" data-v-20afb7e7></div><div class="flow-line flow-3" data-v-20afb7e7></div><div class="flow-line flow-4" data-v-20afb7e7></div><div class="flow-line flow-5" data-v-20afb7e7></div></div><p class="loading-text" data-v-20afb7e7>Loading booking data...</p></div>', 1)
      ])])) : n.error ? (v(), b("div", Ep, [
        d("div", Op, [
          x[5] || (x[5] = d("div", { class: "error-icon-wrapper" }, [
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
          x[6] || (x[6] = d("p", { class: "error-title" }, "Error loading data", -1)),
          d("p", Vp, C(n.error), 1)
        ])
      ])) : (v(), b("div", zp, [
        d("section", Np, [
          d("div", Wp, [
            U(we, {
              data: $.value,
              "node-colors": A,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        r.value.length > 0 ? (v(), b("section", Hp, [
          x[8] || (x[8] = d("div", { class: "section-header" }, [
            d("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          d("div", jp, [
            U(jt, {
              columns: f,
              rows: g.value,
              "row-key": "id"
            }, {
              "cell-date": Y(({ row: k }) => [
                d("span", Yp, C(P(Bt)(String(k.date)).format("DD/MM/YYYY")), 1)
              ]),
              "cell-initiated": Y(({ row: k }) => [
                d("span", qp, C(P(Z)(Number(k.booking_initiated_count))), 1)
              ]),
              "cell-started": Y(({ row: k }) => [
                d("span", Kp, [
                  wt(C(P(Z)(Number(k.booking_started_count))) + " ", 1),
                  d("span", Up, " (" + C(T(Number(k.booking_started_count), Number(k.booking_initiated_count))) + ") ", 1)
                ])
              ]),
              "cell-paymentInitiated": Y(({ row: k }) => [
                d("span", Xp, C(P(Z)(Number(k.payment_initiated_count))), 1)
              ]),
              "cell-paymentResults": Y(({ row: k }) => [
                d("div", Gp, [
                  d("span", Zp, " Success: " + C(P(Z)(m(k))), 1),
                  d("span", Qp, " Failed: " + C(P(Z)(Number(k.payment_failed_count) || 0)), 1)
                ])
              ]),
              "cell-paymentValue": Y(({ row: k }) => [
                h(k).length > 0 ? (v(), b("div", Jp, [
                  (v(!0), b(Q, null, st(h(k), (S) => (v(), b("span", {
                    key: `${k.date}-${S.currency}`,
                    class: "badge badge-currency"
                  }, C(S.currency) + " " + C(y(S.total_value)), 1))), 128))
                ])) : (v(), b("span", t0, "N/A"))
              ]),
              "cell-outcomes": Y(({ row: k }) => [
                d("div", e0, [
                  d("span", a0, " Not Found: " + C(k.not_found_count ? P(Z)(Number(k.not_found_count)) : "N/A"), 1),
                  d("span", n0, " Cancelled: " + C(k.cancelled_count ? P(Z)(Number(k.cancelled_count)) : "N/A"), 1),
                  d("span", s0, " No Balance: " + C(k.no_pending_balance_count ? P(Z)(Number(k.no_pending_balance_count)) : "N/A"), 1),
                  d("span", o0, " Errors: " + C(k.error_count ? P(Z)(Number(k.error_count)) : "N/A"), 1)
                ])
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          c.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: x[0] || (x[0] = (k) => i.value = !i.value)
          }, [
            wt(C(i.value ? "View less" : `View more (${u.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": i.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...x[7] || (x[7] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", i0, [...x[9] || (x[9] = [
          nt('<div class="empty-state-content" data-v-20afb7e7><div class="empty-icon-wrapper" data-v-20afb7e7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-20afb7e7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-20afb7e7></path></svg></div><p class="empty-title" data-v-20afb7e7>No booking manager data available</p><p class="empty-description" data-v-20afb7e7>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), l0 = /* @__PURE__ */ it(r0, [["__scopeId", "data-v-20afb7e7"]]), c0 = ["open"], d0 = {
  key: 0,
  class: "loading-state"
}, u0 = {
  key: 1,
  class: "card-body"
}, h0 = {
  key: 0,
  class: "chart-section"
}, f0 = { class: "chart-wrapper" }, g0 = {
  key: 1,
  class: "table-section"
}, p0 = { class: "table-wrapper" }, v0 = { class: "ci-cell font-medium" }, m0 = { class: "ci-cell text-center" }, b0 = { class: "ci-cell text-center" }, y0 = { class: "ci-cell text-center" }, _0 = { class: "ci-cell text-center" }, x0 = { class: "ci-cell text-center" }, k0 = { class: "ci-cell text-center" }, w0 = {
  key: 0,
  class: "failed-steps"
}, $0 = { class: "step-name" }, C0 = { class: "step-count" }, M0 = {
  key: 1,
  class: "empty-cell"
}, S0 = {
  key: 2,
  class: "empty-state"
}, gn = 3, D0 = {
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
    const a = t, n = (x) => {
      a("export", x);
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
    }, r = at([]), l = at(!1), c = D(() => r.value?.length ? l.value ? r.value : r.value.slice(0, gn) : []), u = D(() => (r.value?.length || 0) > gn), f = D(
      () => Math.max(0, (r.value?.length || 0) - gn)
    ), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], p = D(
      () => c.value.map((x) => ({
        id: x.date,
        date: x.date,
        checkin_initiated_count: x.checkin_initiated_count,
        checkin_init_count: x.checkin_init_count,
        checkin_started_count: x.checkin_started_count,
        checkin_completed_count: x.checkin_completed_count,
        checkin_closed_count: x.checkin_closed_count,
        failed_steps: x.failed_steps
      }))
    ), h = D(() => {
      const x = s.data;
      return x && (Array.isArray(x.checkin_by_day) && x.checkin_by_day.length > 0 || (x.total_checkin_initiated ?? 0) > 0) ? { ...o, ...x } : s.checkinData ?? o;
    }), m = D(() => {
      const x = s.data;
      return x && (Array.isArray(x.failed_by_step_by_day) && x.failed_by_step_by_day.length > 0 || Array.isArray(x.unrecovered_by_step) && x.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: x.total_checkin_failed ?? 0,
        total_checkin_unrecovered: x.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: x.failed_by_step_by_day ?? [],
        unrecovered_by_step: x.unrecovered_by_step ?? [],
        unrecovered_by_day: x.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), y = D(() => {
      const x = {
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
      return (m.value.unrecovered_by_step || []).forEach((S) => {
        const B = S.step_name.replace(/_/g, " ").split(" ").map((L) => L.charAt(0).toUpperCase() + L.slice(1)).join(" "), M = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        x[B] = M[B] || "#DC2626";
      }), x;
    }), _ = (x, k) => !k || k === 0 ? "0%" : `${Math.round(x / k * 100)}%`, $ = (x, k) => {
      const S = Z(x), F = _(x, k);
      return `${S} (${F})`;
    }, A = (x) => x.reduce((k, S) => k + S.failed_count, 0), T = D(() => {
      const x = [], k = [];
      if (!h.value.total_checkin_initiated)
        return { nodes: x, links: k };
      x.push({ name: "Checkin Init" }), x.push({ name: "Booking retrive" }), x.push({ name: "Booking retrive success" }), x.push({ name: "Number of Passengers" }), x.push({ name: "Completed" }), x.push({ name: "Closed with BP" });
      const S = h.value.total_checkin_initiated, F = h.value.total_checkin_init, B = h.value.total_checkin_init_abandoned, M = F - B, L = h.value.total_checkin_started, E = h.value.total_checkin_completed, H = h.value.total_checkin_closed, K = m.value.unrecovered_by_step || [], X = K.reduce((z, N) => z + N.count, 0);
      if (F > 0) {
        const z = Math.round(F / S * 100);
        k.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: F,
          label: `${F.toLocaleString()} (${z}%)`
        });
      }
      const j = S - F;
      if (j > 0) {
        const z = Math.round(j / S * 100);
        x.push({ name: "Abandoned (Init)" }), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: j,
          label: `${j.toLocaleString()} (${z}%)`
        });
      }
      if (B > 0) {
        const z = Math.round(B / S * 100);
        x.push({ name: "Abandoned (Started)" }), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: B,
          label: `${B.toLocaleString()} (${z}%)`
        });
      }
      if (M > 0) {
        const z = Math.round(M / S * 100);
        k.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: M,
          label: `${M.toLocaleString()} (${z}%)`
        });
      }
      if (L > 0) {
        const z = Math.round(L / S * 100);
        k.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: L,
          label: `${L.toLocaleString()} (${z}%)`
        });
      }
      if (E > 0) {
        const z = Math.round(E / L * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: E,
          label: `${E.toLocaleString()} (${z}%)`
        });
      }
      if (K.length > 0 && X > 0) {
        x.push({ name: "Unrecovered" });
        const z = Math.round(X / L * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: X,
          label: `${X.toLocaleString()} (${z}%)`
        }), K.forEach((N) => {
          const ot = N.step_name.replace(/_/g, " ").split(" ").map((ct) => ct.charAt(0).toUpperCase() + ct.slice(1)).join(" "), J = Math.round(N.count / L * 100);
          x.push({ name: ot }), k.push({
            source: "Unrecovered",
            target: ot,
            value: N.count,
            label: `${N.count.toLocaleString()} (${J}%)`
          });
        });
      }
      const I = L - (E + X);
      if (I > 0) {
        const z = Math.round(I / L * 100);
        x.push({ name: "Abandoned (Flow)" }), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: I,
          label: `${I.toLocaleString()} (${z}%)`
        });
      }
      const R = E - H;
      if (R > 0) {
        const z = Math.round(R / L * 100);
        x.push({ name: "BP Error" }), k.push({
          source: "Completed",
          target: "BP Error",
          value: R,
          label: `${R.toLocaleString()} (${z}%)`
        });
      }
      if (H > 0) {
        const z = Math.round(H / L * 100);
        k.push({
          source: "Completed",
          target: "Closed with BP",
          value: H,
          label: `${H.toLocaleString()} (${z}%)`
        });
      }
      return { nodes: x, links: k };
    }), w = () => {
      const x = h.value.checkin_by_day || [], k = m.value.failed_by_step_by_day || [];
      if (x.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...x].map((S) => {
        const F = k.find(
          (B) => B.date === S.date
        );
        return {
          ...S,
          failed_steps: F?.steps || []
        };
      }), r.value.sort((S, F) => new Date(S.date) - new Date(F.date));
    };
    return It(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        w();
      },
      { deep: !0, immediate: !0 }
    ), (x, k) => (v(), b("details", {
      open: e.initiallyOpen,
      class: "checkin-metrics-card metric-collapsible"
    }, [
      k[4] || (k[4] = nt('<summary class="card-header metric-collapsible__summary" data-v-b7105e96><div class="header-content" data-v-b7105e96><h3 class="card-title" data-v-b7105e96>Check-in Metrics</h3><p class="card-subtitle" data-v-b7105e96>Check-in performance and failure analysis</p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-b7105e96><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-b7105e96></path></svg></summary>', 1)),
      s.loading ? (v(), b("div", d0, [...k[1] || (k[1] = [
        nt('<div class="loading-container" data-v-b7105e96><div class="chart-flow-loader" data-v-b7105e96><div class="flow-line flow-1" data-v-b7105e96></div><div class="flow-line flow-2" data-v-b7105e96></div><div class="flow-line flow-3" data-v-b7105e96></div><div class="flow-line flow-4" data-v-b7105e96></div><div class="flow-line flow-5" data-v-b7105e96></div></div><p class="loading-text" data-v-b7105e96>Loading check-in data...</p></div>', 1)
      ])])) : (v(), b("div", u0, [
        T.value.nodes.length > 0 ? (v(), b("section", h0, [
          d("div", f0, [
            U(we, {
              data: T.value,
              height: "500px",
              "node-colors": y.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : V("", !0),
        r.value && r.value.length > 0 ? (v(), b("section", g0, [
          d("div", p0, [
            U(jt, {
              columns: g,
              rows: p.value,
              "row-key": "id"
            }, {
              "cell-date": Y(({ row: S }) => [
                d("span", v0, C(P(Bt)(String(S.date)).format("DD/MM/YYYY")), 1)
              ]),
              "cell-checkinInit": Y(({ row: S }) => [
                d("span", m0, C(P(Z)(S.checkin_initiated_count)), 1)
              ]),
              "cell-bookingRetrieve": Y(({ row: S }) => [
                d("span", b0, C($(S.checkin_init_count, S.checkin_initiated_count)), 1)
              ]),
              "cell-passengers": Y(({ row: S }) => [
                d("span", y0, C(P(Z)(S.checkin_started_count)), 1)
              ]),
              "cell-completed": Y(({ row: S }) => [
                d("span", _0, C($(S.checkin_completed_count, S.checkin_started_count)), 1)
              ]),
              "cell-closed": Y(({ row: S }) => [
                d("span", x0, C($(S.checkin_closed_count, S.checkin_started_count)), 1)
              ]),
              "cell-failed": Y(({ row: S }) => [
                d("span", k0, C($(A(S.failed_steps), S.checkin_started_count)), 1)
              ]),
              "cell-reasons": Y(({ row: S }) => [
                S.failed_steps && S.failed_steps.length > 0 ? (v(), b("div", w0, [
                  (v(!0), b(Q, null, st(S.failed_steps, (F) => (v(), b("div", {
                    key: F.step_name,
                    class: "failed-step-item"
                  }, [
                    d("span", $0, C(F.step_name.replace(/_/g, " ")) + ":", 1),
                    d("span", C0, C(F.failed_count), 1)
                  ]))), 128))
                ])) : (v(), b("div", M0, "-"))
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          u.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: k[0] || (k[0] = (S) => l.value = !l.value)
          }, [
            wt(C(l.value ? "View less" : `View more (${f.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": l.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...k[2] || (k[2] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", S0, [...k[3] || (k[3] = [
          nt('<div class="empty-state-content" data-v-b7105e96><div class="empty-icon-wrapper" data-v-b7105e96><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b7105e96><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b7105e96></path></svg></div><p class="empty-title" data-v-b7105e96>No check-in data available</p><p class="empty-description" data-v-b7105e96>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ], 8, c0));
  }
}, A0 = /* @__PURE__ */ it(D0, [["__scopeId", "data-v-b7105e96"]]), T0 = ["open"], B0 = {
  key: 0,
  class: "loading-state"
}, L0 = {
  key: 1,
  class: "card-body"
}, F0 = {
  key: 0,
  class: "sankey-section"
}, P0 = {
  key: 1,
  class: "table-section"
}, R0 = { class: "table-wrapper" }, I0 = { class: "cm-cell date-cell" }, E0 = { class: "cm-cell text-center" }, O0 = { class: "cm-cell text-center" }, V0 = { class: "cm-cell text-center" }, z0 = { class: "cm-cell text-center" }, N0 = { class: "cm-cell text-center cell-success" }, W0 = { class: "cm-cell text-center cell-danger" }, H0 = {
  key: 0,
  class: "reasons-list"
}, j0 = { class: "reason-name" }, Y0 = { class: "reason-count" }, q0 = {
  key: 1,
  class: "no-reasons"
}, K0 = {
  key: 2,
  class: "empty-state"
}, U0 = { class: "empty-state-content" }, X0 = { class: "empty-icon-wrapper" }, pn = 3, G0 = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, o = (w) => {
      s("export", w);
    }, { isDark: i } = ht(ut(n, "theme")), r = (w) => w == null ? "0" : w.toLocaleString(), l = (w) => {
      const [x, k, S] = w.split("-").map(Number), F = new Date(x, k - 1, S);
      return `${String(F.getDate()).padStart(2, "0")}/${String(F.getMonth() + 1).padStart(2, "0")}/${F.getFullYear()}`;
    }, c = (w) => w.replace(/_/g, " ").replace(/\b\w/g, (x) => x.toUpperCase()), u = (w, x) => !x || x === 0 ? "0%" : `${Math.round(w / x * 100)}%`, f = (w, x) => {
      const k = w || 0, S = x || 0, F = r(k), B = u(k, S);
      return `${F} (${B})`;
    }, g = D(() => ({
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
    })), p = at(!1), h = D(() => {
      const w = n.checkinData?.record_locator_by_day || [], x = n.failedData?.failed_by_step_by_day || [], k = n.failedData?.unrecovered_by_day || [];
      return w.map((F) => {
        const B = x.find((L) => L.date === F.date), M = k.find((L) => L.date === F.date);
        return {
          ...F,
          failed_steps: B?.steps || [],
          unrecovered_count: M?.unrecovered_count || 0
        };
      }).sort((F, B) => new Date(F.date).getTime() - new Date(B.date).getTime());
    }), m = D(() => p.value ? h.value : h.value.slice(0, pn)), y = D(() => h.value.length > pn), _ = D(
      () => Math.max(0, h.value.length - pn)
    ), $ = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], A = D(
      () => m.value.map((w) => ({
        id: w.date,
        date: w.date,
        checkin_initiated: w.checkin_initiated,
        record_locator_init_count: w.record_locator_init_count,
        record_locator_started_count: w.record_locator_started_count,
        record_locator_completed_count: w.record_locator_completed_count,
        record_locator_closed_count: w.record_locator_closed_count,
        unrecovered_count: w.unrecovered_count,
        failed_steps: w.failed_steps
      }))
    ), T = D(() => {
      const w = [], x = [], k = /* @__PURE__ */ new Set(), S = (bt) => {
        k.has(bt) || (w.push({ name: bt }), k.add(bt));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: w, links: x };
      S("Checkin Init"), S("Booking Retrieval"), S("Booking Retrieved"), S("Completed"), S("Closed with BP");
      const F = n.checkinData.total_checkin_initiated || 0, B = n.checkinData.total_record_locator_init || 0, M = n.checkinData.total_record_locator_init_abandoned || 0, L = n.checkinData.total_checkin_pre_init_abandoned_error, E = n.checkinData.total_checkin_pre_init_abandoned_voluntary, H = L != null || E != null, K = H ? Math.max(Number(L) || 0, 0) : 0, X = H ? Math.max(Number(E) || 0, 0) : 0, j = n.checkinData.total_record_locator_init_abandoned_error, I = n.checkinData.total_record_locator_init_abandoned_voluntary, R = j != null || I != null, z = R ? Math.max(Number(j) || 0, 0) : 0, N = R ? Math.max(Number(I) || 0, 0) : 0, G = R ? Math.max(M - z - N, 0) : M, ot = B - M, J = n.checkinData.total_record_locator_started || 0, ct = n.checkinData.total_record_locator_completed || 0, rt = n.checkinData.total_record_locator_closed || 0, mt = n.checkinData.total_record_locator_unrecovered || 0;
      if (B > 0) {
        const bt = Math.round(B / F * 100);
        x.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: B,
          label: `${B.toLocaleString()} (${bt}%)`
        });
      }
      const lt = F - B;
      if (H) {
        if (X > 0) {
          const bt = Math.round(X / F * 100);
          S("Abandoned (Init)"), x.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: X,
            label: `${X.toLocaleString()} (${bt}%)`
          });
        }
        if (K > 0) {
          const bt = Math.round(K / F * 100);
          S("Booking not retreived"), x.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: K,
            label: `${K.toLocaleString()} (${bt}%)`
          });
        }
      } else if (lt > 0) {
        const bt = Math.round(lt / F * 100);
        S("Abandoned (Init)"), x.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: lt,
          label: `${lt.toLocaleString()} (${bt}%)`
        });
      }
      if (R) {
        if (z > 0) {
          const bt = Math.round(z / F * 100);
          S("Error"), x.push({
            source: "Booking Retrieval",
            target: "Error",
            value: z,
            label: `${z.toLocaleString()} (${bt}%)`
          });
        }
        if (N > 0) {
          const bt = Math.round(N / F * 100);
          S("Abandoned (Started)"), x.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: N,
            label: `${N.toLocaleString()} (${bt}%)`
          });
        }
        if (G > 0) {
          const bt = Math.round(G / F * 100);
          S("Abandoned (Started)"), x.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: G,
            label: `${G.toLocaleString()} (${bt}%)`
          });
        }
      } else if (M > 0) {
        const bt = Math.round(M / F * 100);
        S("Abandoned (Started)"), x.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${bt}%)`
        });
      }
      if (ot > 0) {
        const bt = Math.round(ot / F * 100);
        x.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: ot,
          label: `${ot.toLocaleString()} (${bt}%)`
        });
      }
      if (ct > 0) {
        const bt = Math.round(ct / J * 100);
        x.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: ct,
          label: `${ct.toLocaleString()} (${bt}%)`
        });
      }
      if (mt > 0) {
        S("Errors");
        const bt = Math.round(mt / J * 100);
        x.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: mt,
          label: `${mt.toLocaleString()} (${bt}%)`
        });
      }
      const Gt = J - (ct + mt);
      if (Gt > 0) {
        const bt = Math.round(Gt / J * 100);
        S("Abandoned (Flow)"), x.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Gt,
          label: `${Gt.toLocaleString()} (${bt}%)`
        });
      }
      const ge = ct - rt;
      if (ge > 0) {
        const bt = Math.round(ge / J * 100);
        S("BP Error"), x.push({
          source: "Completed",
          target: "BP Error",
          value: ge,
          label: `${ge.toLocaleString()} (${bt}%)`
        });
      }
      if (rt > 0) {
        const bt = Math.round(rt / J * 100);
        x.push({
          source: "Completed",
          target: "Closed with BP",
          value: rt,
          label: `${rt.toLocaleString()} (${bt}%)`
        });
      }
      return { nodes: w, links: x };
    });
    return t({ isDark: i }), (w, x) => (v(), b("details", {
      open: e.initiallyOpen,
      class: "checkin-metrics-card metric-collapsible"
    }, [
      x[5] || (x[5] = nt('<summary class="card-header metric-collapsible__summary" data-v-b5c54160><div class="header-content" data-v-b5c54160><h3 class="card-title" data-v-b5c54160>Check-in Metrics</h3><p class="card-subtitle" data-v-b5c54160>Check-in performance and failure analysis</p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-b5c54160><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-b5c54160></path></svg></summary>', 1)),
      e.loading ? (v(), b("div", B0, [...x[1] || (x[1] = [
        nt('<div class="loading-container" data-v-b5c54160><div class="chart-bars-loader" data-v-b5c54160><div class="bar bar-1" data-v-b5c54160></div><div class="bar bar-2" data-v-b5c54160></div><div class="bar bar-3" data-v-b5c54160></div><div class="bar bar-4" data-v-b5c54160></div><div class="bar bar-5" data-v-b5c54160></div></div><p class="loading-text" data-v-b5c54160>Loading check-in data...</p></div>', 1)
      ])])) : (v(), b("div", L0, [
        T.value.nodes.length > 0 ? (v(), b("div", F0, [
          U(we, {
            data: T.value,
            height: "500px",
            "node-colors": g.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : V("", !0),
        h.value && h.value.length > 0 ? (v(), b("div", P0, [
          d("div", R0, [
            U(jt, {
              columns: $,
              rows: A.value,
              "row-key": "id"
            }, {
              "cell-date": Y(({ row: k }) => [
                d("span", I0, C(l(String(k.date))), 1)
              ]),
              "cell-checkinInit": Y(({ row: k }) => [
                d("span", E0, C(r(k.checkin_initiated)), 1)
              ]),
              "cell-bookingRetrieval": Y(({ row: k }) => [
                d("span", O0, C(f(k.record_locator_init_count, k.checkin_initiated)), 1)
              ]),
              "cell-bookingRetrieved": Y(({ row: k }) => [
                d("span", V0, C(f(k.record_locator_started_count, k.record_locator_init_count)), 1)
              ]),
              "cell-completed": Y(({ row: k }) => [
                d("span", z0, C(f(k.record_locator_completed_count, k.record_locator_started_count)), 1)
              ]),
              "cell-closed": Y(({ row: k }) => [
                d("span", N0, C(f(k.record_locator_closed_count, k.record_locator_started_count)), 1)
              ]),
              "cell-failed": Y(({ row: k }) => [
                d("span", W0, C(f(k.unrecovered_count, k.record_locator_started_count)), 1)
              ]),
              "cell-reasons": Y(({ row: k }) => [
                Array.isArray(k.failed_steps) && k.failed_steps.length > 0 ? (v(), b("div", H0, [
                  (v(!0), b(Q, null, st(k.failed_steps, (S) => (v(), b("div", {
                    key: S.step_name,
                    class: "reason-item"
                  }, [
                    d("span", j0, C(c(S.step_name)) + ":", 1),
                    d("span", Y0, C(S.failed_count), 1)
                  ]))), 128))
                ])) : (v(), b("div", q0, "-"))
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          y.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: x[0] || (x[0] = (k) => p.value = !p.value)
          }, [
            wt(C(p.value ? "View less" : `View more (${_.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": p.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...x[2] || (x[2] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("div", K0, [
          d("div", U0, [
            d("div", X0, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            x[3] || (x[3] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
            x[4] || (x[4] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ], 8, T0));
  }
}), Z0 = /* @__PURE__ */ it(G0, [["__scopeId", "data-v-b5c54160"]]), Q0 = { class: "record-locator-card metric-collapsible" }, J0 = {
  key: 0,
  class: "loading-state"
}, tv = {
  key: 1,
  class: "card-body"
}, ev = {
  key: 0,
  class: "chart-section"
}, av = { class: "chart-wrapper" }, nv = {
  key: 1,
  class: "table-section"
}, sv = { class: "table-wrapper" }, ov = { class: "cell-plain font-medium" }, iv = { class: "cell-plain text-center" }, rv = { class: "cell-plain text-center" }, lv = { class: "cell-plain text-center" }, cv = { class: "cell-plain text-center" }, dv = { class: "cell-plain text-center success-value" }, uv = { class: "cell-plain text-center failed-value" }, hv = { class: "cell-plain text-center warning-value" }, fv = { class: "cell-plain text-center" }, gv = { class: "cell-plain text-center failed-value" }, pv = {
  key: 2,
  class: "empty-state"
}, vn = 3, vv = /* @__PURE__ */ et({
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
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, o = (w) => {
      s("export", w);
    }, { isDark: i } = ht(ut(n, "theme")), r = at(!1), l = D(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (w, x) => new Date(w.date).getTime() - new Date(x.date).getTime()
    ) : []), c = D(() => r.value ? l.value : l.value.slice(0, vn)), u = D(() => l.value.length > vn), f = D(
      () => Math.max(0, l.value.length - vn)
    ), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "checkinStarted", label: "Checkin Started", align: "center" },
      { key: "checkinCompleted", label: "Checkin Completed (%)", align: "center" },
      { key: "checkinClosed", label: "Checkin Closed (%)", align: "center" },
      { key: "checkinFailed", label: "Checkin Failed (%)", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" }
    ], p = [
      { key: "createPayment", label: "Create Payment", align: "center" },
      { key: "failedPayment", label: "Failed Payment", align: "center" }
    ], h = D(
      () => n.isAvianca ? [...g, ...p] : g
    ), m = D(
      () => c.value.map((w) => ({
        id: w.date,
        date: w.date,
        checkin_initiated: w.checkin_initiated,
        record_locator_init_count: w.record_locator_init_count,
        record_locator_started_count: w.record_locator_started_count,
        record_locator_completed_count: w.record_locator_completed_count,
        record_locator_closed_count: w.record_locator_closed_count,
        record_locator_failed_count: w.record_locator_failed_count,
        record_locator_abandoned_count: w.record_locator_abandoned_count,
        record_locator_create_payment_count: w.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: w.record_locator_create_payment_failed_count
      }))
    ), y = D(() => n.data), _ = D(() => ({
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
    })), $ = (w, x) => !x || x === 0 ? "0%" : `${Math.round(w / x * 100)}%`, A = (w, x) => {
      const k = Z(w), S = $(w, x);
      return `${k} (${S})`;
    }, T = D(() => {
      const w = [], x = [], k = /* @__PURE__ */ new Set(), S = (lt) => {
        k.has(lt) || (w.push({ name: lt }), k.add(lt));
      };
      if (!y.value.total_checkin_initiated)
        return { nodes: w, links: x };
      S("Checkin Init"), S("Booking retrive"), S("Checkin Started"), S("Checkin Completed"), S("Checkin Closed");
      const F = y.value.total_checkin_initiated, B = y.value.total_record_locator_init, M = y.value.total_record_locator_started, L = y.value.total_record_locator_completed, E = y.value.total_record_locator_closed, H = y.value.total_record_locator_failed, K = y.value.total_record_locator_abandoned, X = y.value.total_record_locator_init_abandoned, j = y.value.total_checkin_pre_init_abandoned_error, I = y.value.total_checkin_pre_init_abandoned_voluntary, R = j != null || I != null, z = R ? Math.max(Number(j) || 0, 0) : 0, N = R ? Math.max(Number(I) || 0, 0) : 0, G = y.value.total_record_locator_init_abandoned_error, ot = y.value.total_record_locator_init_abandoned_voluntary, J = G != null || ot != null, ct = J ? Math.max(Number(G) || 0, 0) : 0, rt = J ? Math.max(Number(ot) || 0, 0) : 0;
      if (B > 0) {
        const lt = Math.round(B / F * 100);
        x.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: B,
          label: `${B.toLocaleString()} (${lt}%)`
        });
      }
      const mt = F - B;
      if (R) {
        if (N > 0) {
          const lt = Math.round(N / F * 100);
          S("Abandoned (Init)"), x.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: N,
            label: `${N.toLocaleString()} (${lt}%)`
          });
        }
        if (z > 0) {
          const lt = Math.round(z / F * 100);
          S("Booking not retreived"), x.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: z,
            label: `${z.toLocaleString()} (${lt}%)`
          });
        }
      } else if (mt > 0) {
        const lt = Math.round(mt / F * 100);
        S("Abandoned (Init)"), x.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: mt,
          label: `${mt.toLocaleString()} (${lt}%)`
        });
      }
      if (M > 0) {
        const lt = Math.round(M / F * 100);
        x.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: M,
          label: `${M.toLocaleString()} (${lt}%)`
        });
      }
      if (J) {
        if (ct > 0) {
          const lt = Math.round(ct / F * 100);
          S("Error"), x.push({
            source: "Booking retrive",
            target: "Error",
            value: ct,
            label: `${ct.toLocaleString()} (${lt}%)`
          });
        }
        if (rt > 0) {
          const lt = Math.round(rt / F * 100);
          S("Abandoned (Started)"), x.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: rt,
            label: `${rt.toLocaleString()} (${lt}%)`
          });
        }
      } else if (X > 0) {
        const lt = Math.round(X / F * 100);
        S("Abandoned (Started)"), x.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: X,
          label: `${X.toLocaleString()} (${lt}%)`
        });
      }
      if (L > 0) {
        const lt = Math.round(L / M * 100);
        x.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: L,
          label: `${L.toLocaleString()} (${lt}%)`
        });
      }
      if (E > 0) {
        const lt = Math.round(E / M * 100);
        x.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: E,
          label: `${E.toLocaleString()} (${lt}%)`
        });
      }
      if (H > 0) {
        const lt = Math.round(H / M * 100);
        S("Checkin Failed"), x.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: H,
          label: `${H.toLocaleString()} (${lt}%)`
        });
      }
      if (K > 0) {
        const lt = Math.round(K / M * 100);
        S("Abandoned (Flow)"), x.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: K,
          label: `${K.toLocaleString()} (${lt}%)`
        });
      }
      return { nodes: w, links: x };
    });
    return t({ isDark: i }), (w, x) => (v(), b("details", Q0, [
      x[4] || (x[4] = nt('<summary class="card-header metric-collapsible__summary" data-v-daf490ad><div class="header-content" data-v-daf490ad><h3 class="card-title" data-v-daf490ad>Checkin by Record Locator Metrics</h3><p class="card-subtitle" data-v-daf490ad>Checkin by record locator retrieval and completion analysis</p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-daf490ad><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-daf490ad></path></svg></summary>', 1)),
      n.loading ? (v(), b("div", J0, [...x[1] || (x[1] = [
        nt('<div class="loading-container" data-v-daf490ad><div class="chart-flow-loader" data-v-daf490ad><div class="flow-line flow-1" data-v-daf490ad></div><div class="flow-line flow-2" data-v-daf490ad></div><div class="flow-line flow-3" data-v-daf490ad></div><div class="flow-line flow-4" data-v-daf490ad></div><div class="flow-line flow-5" data-v-daf490ad></div></div><p class="loading-text" data-v-daf490ad>Loading record locator data...</p></div>', 1)
      ])])) : (v(), b("div", tv, [
        T.value.nodes.length > 0 ? (v(), b("section", ev, [
          d("div", av, [
            U(we, {
              data: T.value,
              height: "500px",
              "node-colors": _.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : V("", !0),
        l.value && l.value.length > 0 ? (v(), b("section", nv, [
          d("div", sv, [
            U(jt, {
              columns: h.value,
              rows: m.value,
              "row-key": "id"
            }, {
              "cell-date": Y(({ row: k }) => [
                d("span", ov, C(P(Bt)(String(k.date)).format("DD/MM/YYYY")), 1)
              ]),
              "cell-checkinInit": Y(({ row: k }) => [
                d("span", iv, C(P(Z)(k.checkin_initiated)), 1)
              ]),
              "cell-bookingRetrieve": Y(({ row: k }) => [
                d("span", rv, C(A(k.record_locator_init_count, k.checkin_initiated)), 1)
              ]),
              "cell-checkinStarted": Y(({ row: k }) => [
                d("span", lv, C(P(Z)(k.record_locator_started_count)), 1)
              ]),
              "cell-checkinCompleted": Y(({ row: k }) => [
                d("span", cv, C(A(k.record_locator_completed_count, k.record_locator_started_count)), 1)
              ]),
              "cell-checkinClosed": Y(({ row: k }) => [
                d("span", dv, C(A(k.record_locator_closed_count, k.record_locator_started_count)), 1)
              ]),
              "cell-checkinFailed": Y(({ row: k }) => [
                d("span", uv, C(A(k.record_locator_failed_count, k.record_locator_started_count)), 1)
              ]),
              "cell-abandoned": Y(({ row: k }) => [
                d("span", hv, C(A(k.record_locator_abandoned_count, k.record_locator_started_count)), 1)
              ]),
              "cell-createPayment": Y(({ row: k }) => [
                d("span", fv, C(P(Z)(k.record_locator_create_payment_count ?? 0)), 1)
              ]),
              "cell-failedPayment": Y(({ row: k }) => [
                d("span", gv, C(P(Z)(k.record_locator_create_payment_failed_count ?? 0)), 1)
              ]),
              _: 1
            }, 8, ["columns", "rows"])
          ]),
          u.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: x[0] || (x[0] = (k) => r.value = !r.value)
          }, [
            wt(C(r.value ? "View less" : `View more (${f.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...x[2] || (x[2] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", pv, [...x[3] || (x[3] = [
          nt('<div class="empty-state-content" data-v-daf490ad><div class="empty-icon-wrapper" data-v-daf490ad><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-daf490ad><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-daf490ad></path></svg></div><p class="empty-title" data-v-daf490ad>No record locator data available</p><p class="empty-description" data-v-daf490ad>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ki = /* @__PURE__ */ it(vv, [["__scopeId", "data-v-daf490ad"]]), mv = { class: "checkin-segments-card metric-collapsible" }, bv = {
  key: 0,
  class: "loading-state"
}, yv = {
  key: 1,
  class: "card-body"
}, _v = {
  key: 0,
  class: "table-section"
}, xv = { class: "table-wrapper" }, kv = { class: "airport-badge" }, wv = {
  key: 0,
  class: "airport-badge connection"
}, $v = {
  key: 1,
  class: "empty-connection"
}, Cv = { class: "airport-badge" }, Mv = {
  key: 0,
  class: "trip-badge roundtrip"
}, Sv = {
  key: 1,
  class: "trip-badge oneway"
}, Dv = { class: "percentage-value" }, Av = { class: "percentage-value" }, Tv = { class: "percentage-value success" }, Bv = {
  key: 1,
  class: "empty-state"
}, mn = 3, Lv = /* @__PURE__ */ et({
  __name: "checkinSegments",
  props: {
    data: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, o = (y) => {
      s("export", y);
    }, { isDark: i } = ht(ut(n, "theme")), r = at(!1), l = D(() => r.value ? n.data : n.data.slice(0, mn)), c = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], u = D(
      () => l.value.map((y, _) => ({
        id: `segment-${_}-${y.departure_airport}-${y.arrival_airport}-${y.segment_init_count}-${y.segment_started_count}`,
        departure_airport: y.departure_airport,
        conexion_airport: y.conexion_airport,
        arrival_airport: y.arrival_airport,
        segment_init_count: y.segment_init_count,
        segment_started_count: y.segment_started_count,
        segment_completed_count: y.segment_completed_count,
        segment_closed_count: y.segment_closed_count
      }))
    ), f = D(() => n.data.length > mn), g = D(() => Math.max(0, n.data.length - mn)), p = (y, _) => !_ || _ === 0 || !y ? "0%" : `${Math.round(y / _ * 100)}%`, h = (y) => !y || y === "None" ? "-" : String(y).trim().replace(/_[0-9]+$/i, ""), m = (y) => {
      const _ = h(y?.departure_airport), $ = h(y?.arrival_airport);
      return _ === "-" || $ === "-" ? !1 : _ === $;
    };
    return t({ isDark: i }), (y, _) => (v(), b("details", mv, [
      _[6] || (_[6] = nt('<summary class="card-header metric-collapsible__summary" data-v-fefbd9d0><div class="header-content" data-v-fefbd9d0><h3 class="card-title" data-v-fefbd9d0>Checkin Segments</h3><p class="card-subtitle" data-v-fefbd9d0>Breakdown by flight segment with connection when applicable</p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-fefbd9d0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-fefbd9d0></path></svg></summary>', 1)),
      n.loading ? (v(), b("div", bv, [..._[1] || (_[1] = [
        nt('<div class="loading-container" data-v-fefbd9d0><div class="chart-flow-loader" data-v-fefbd9d0><div class="flow-line flow-1" data-v-fefbd9d0></div><div class="flow-line flow-2" data-v-fefbd9d0></div><div class="flow-line flow-3" data-v-fefbd9d0></div><div class="flow-line flow-4" data-v-fefbd9d0></div><div class="flow-line flow-5" data-v-fefbd9d0></div></div><p class="loading-text" data-v-fefbd9d0>Loading segment data...</p></div>', 1)
      ])])) : (v(), b("div", yv, [
        n.data.length > 0 ? (v(), b("section", _v, [
          d("div", xv, [
            U(jt, {
              columns: c,
              rows: u.value,
              "row-key": "id"
            }, {
              "cell-departure": Y(({ row: $ }) => [
                d("span", kv, C(h($.departure_airport)), 1)
              ]),
              "cell-connection": Y(({ row: $ }) => [
                h($.conexion_airport) !== "-" ? (v(), b("span", wv, C(h($.conexion_airport)), 1)) : (v(), b("span", $v, "-"))
              ]),
              "cell-arrival": Y(({ row: $ }) => [
                d("span", Cv, C(h($.arrival_airport)), 1)
              ]),
              "cell-trip": Y(({ row: $ }) => [
                m($) ? (v(), b("span", Mv, [..._[2] || (_[2] = [
                  d("svg", {
                    class: "trip-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    })
                  ], -1),
                  wt(" Roundtrip ", -1)
                ])])) : (v(), b("span", Sv, [..._[3] || (_[3] = [
                  d("svg", {
                    class: "trip-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M14 5l7 7m0 0l-7 7m7-7H3"
                    })
                  ], -1),
                  wt(" One way ", -1)
                ])]))
              ]),
              "cell-init": Y(({ row: $ }) => [
                wt(C(P(Z)($.segment_init_count)), 1)
              ]),
              "cell-started": Y(({ row: $ }) => [
                d("span", Dv, C(p($.segment_started_count, $.segment_init_count)), 1)
              ]),
              "cell-completed": Y(({ row: $ }) => [
                d("span", Av, C(p($.segment_completed_count, $.segment_init_count)), 1)
              ]),
              "cell-closed": Y(({ row: $ }) => [
                d("span", Tv, C(p($.segment_closed_count, $.segment_init_count)), 1)
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          f.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: _[0] || (_[0] = ($) => r.value = !r.value)
          }, [
            wt(C(r.value ? "View less" : `View more (${g.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [..._[4] || (_[4] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", Bv, [..._[5] || (_[5] = [
          nt('<div class="empty-state-content" data-v-fefbd9d0><div class="empty-icon-wrapper" data-v-fefbd9d0><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-fefbd9d0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-fefbd9d0></path></svg></div><p class="empty-title" data-v-fefbd9d0>No segment data available</p><p class="empty-description" data-v-fefbd9d0>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ui = /* @__PURE__ */ it(Lv, [["__scopeId", "data-v-fefbd9d0"]]), Fv = ["open"], Pv = { class: "checkin-container__body" }, Rv = /* @__PURE__ */ et({
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
    const a = e, n = t, s = D(() => a.loading || a.checkinLoading), o = D(() => a.loading || a.checkinMetricsLoading), i = D(() => a.loading || a.recordLocatorLoading || a.checkinMetricsLoading), r = D(() => a.loading || a.segmentsLoading), l = D(() => a.recordLocatorData ?? a.checkinMetricsData);
    function c(g, p) {
      n("export", { source: g, format: p });
    }
    function u(g) {
      return typeof g == "object" && g !== null && "source" in g;
    }
    function f(g) {
      if (u(g)) {
        n("export", g);
        return;
      }
      c("checkinSegments", g);
    }
    return (g, p) => (v(), b("details", {
      class: "checkin-container-card metric-collapsible",
      open: e.containerInitiallyOpen
    }, [
      p[1] || (p[1] = nt('<summary class="card-header metric-collapsible__summary checkin-container__summary" data-v-14c09674><div class="header-content" data-v-14c09674><h2 class="card-title font-sans" data-v-14c09674>Check in</h2><p class="card-subtitle font-sans" data-v-14c09674>Check-in flows, metrics by record locator and segment breakdown.</p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-14c09674><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-14c09674></path></svg></summary>', 1)),
      d("div", Pv, [
        U(Ki, {
          loading: i.value,
          data: l.value,
          "is-avianca": e.isAvianca,
          theme: e.theme,
          "enable-export": e.enableExport,
          "export-loading": e.exportLoading,
          onExport: p[0] || (p[0] = (h) => c("recordLocator", h))
        }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
        U(Ui, {
          "initially-open": e.childrenInitiallyOpen,
          loading: r.value,
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
          onExport: f
        }, null, 8, ["initially-open", "loading", "data", "show-checkin", "show-checkin-metrics", "checkin-loading", "checkin-metrics-loading", "checkin-data", "checkin-failed-data", "checkin-metrics-data", "checkin-metrics-failed-data", "theme", "enable-export", "export-loading"])
      ])
    ], 8, Fv));
  }
}), Iv = /* @__PURE__ */ it(Rv, [["__scopeId", "data-v-14c09674"]]), Ev = { class: "disruption-metrics-card metric-collapsible" }, Ov = { class: "card-header metric-collapsible__summary" }, Vv = { class: "header-content" }, zv = {
  key: 0,
  class: "payment-success-badge"
}, Nv = {
  key: 0,
  class: "currency-breakdown-list"
}, Wv = {
  key: 1,
  class: "badge-value"
}, Hv = {
  key: 0,
  class: "loading-state"
}, jv = {
  key: 1,
  class: "card-body"
}, Yv = { class: "chart-section" }, qv = { class: "chart-wrapper" }, Kv = {
  key: 1,
  class: "empty-chart"
}, Uv = {
  key: 0,
  class: "table-section"
}, Xv = { class: "table-wrapper" }, Gv = { class: "d-cell font-medium text-center" }, Zv = { class: "d-cell text-center" }, Qv = { class: "d-cell text-center" }, Jv = { class: "percentage-text" }, tm = { class: "d-cell text-center" }, em = { class: "abandoned-value" }, am = { class: "badges-container badges-wrap" }, nm = { class: "badge badge-vol" }, sm = { class: "badge badge-confirm" }, om = { class: "badge badge-not-confirm" }, im = { class: "badge badge-reject" }, rm = { class: "badge badge-not-paid" }, lm = { class: "badge badge-success" }, cm = { class: "badges-container badges-wrap" }, dm = { class: "badge badge-inv" }, um = { class: "badge badge-human" }, hm = { class: "badge badge-accept" }, fm = {
  key: 1,
  class: "empty-state"
}, bn = 3, gm = /* @__PURE__ */ et({
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
    function a(T) {
      return T;
    }
    const n = e, s = t, o = (T) => {
      s("export", T);
    }, i = at(!1), r = D(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (T, w) => new Date(T.date).getTime() - new Date(w.date).getTime()
    ) : []), l = D(() => i.value ? r.value : r.value.slice(0, bn)), c = D(() => r.value.length > bn), u = D(
      () => Math.max(0, r.value.length - bn)
    ), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], g = D(
      () => l.value.map((T) => ({
        id: T.date,
        ...T
      }))
    ), p = D(() => n.data?.total_payment_success || []), h = (T, w) => !w || w === 0 ? "0%" : `${Math.round(T / w * 100)}%`, m = (T) => xt(T), y = (T) => (T ?? []).reduce((w, x) => w + (x.count ?? 0), 0), _ = (T) => typeof T.sell_success_count == "number" ? T.sell_success_count : y(T.payment_success_total), $ = D(() => {
      const T = n.data, w = T.total_disruption_conversations || 0, x = T.total_disruption_initiated || 0, k = T.total_voluntary || 0, S = T.total_involuntary || 0, F = T.total_accepted || 0, B = T.total_confirmed || 0, M = typeof T.total_sell_success == "number" ? T.total_sell_success : y(T.total_payment_success), L = T.total_sell_failed || 0, E = Math.max(0, w - x), H = Math.max(0, x - k - S), K = Math.max(0, S - F), X = Math.max(0, k - B), j = L, I = Math.max(0, B - M - j), R = (G, ot) => {
        const J = ot > 0 ? Math.round(G / ot * 100) : 0;
        return `${G.toLocaleString()} (${J}%)`;
      }, z = [
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
      ], N = [];
      return x > 0 && N.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: R(x, w)
      }), E > 0 && N.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: R(E, w)
      }), k > 0 && N.push({
        source: "Started",
        target: "Voluntary",
        value: k,
        label: R(k, w)
      }), S > 0 && N.push({
        source: "Started",
        target: "Involuntary",
        value: S,
        label: R(S, w)
      }), H > 0 && N.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: H,
        label: R(H, w)
      }), F > 0 && N.push({
        source: "Involuntary",
        target: "Accepted",
        value: F,
        label: R(F, w)
      }), K > 0 && N.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: K,
        label: R(K, w)
      }), B > 0 && N.push({
        source: "Voluntary",
        target: "Confirmed",
        value: B,
        label: R(B, w)
      }), X > 0 && N.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: X,
        label: R(X, w)
      }), M > 0 && N.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: R(M, w)
      }), j > 0 && N.push({
        source: "Confirmed",
        target: "Rejected",
        value: j,
        label: R(j, w)
      }), I > 0 && N.push({
        source: "Confirmed",
        target: "Not Paid",
        value: I,
        label: R(I, w)
      }), { nodes: z, links: N };
    }), A = {
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
    return (T, w) => (v(), b("details", Ev, [
      d("summary", Ov, [
        d("div", Vv, [
          w[2] || (w[2] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            d("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          n.loading ? V("", !0) : (v(), b("div", zv, [
            w[1] || (w[1] = d("p", { class: "badge-label" }, "Payment Success Value", -1)),
            p.value.length > 0 ? (v(), b("div", Nv, [
              (v(!0), b(Q, null, st(p.value, (x) => (v(), b("p", {
                key: x.currency,
                class: "currency-breakdown-item"
              }, C(x.currency) + " " + C(m(x.total_value)), 1))), 128))
            ])) : (v(), b("p", Wv, C(m(0)), 1))
          ]))
        ]),
        w[3] || (w[3] = d("svg", {
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
      n.loading ? (v(), b("div", Hv, [...w[4] || (w[4] = [
        nt('<div class="loading-container" data-v-e6a79620><div class="chart-bars-loader" data-v-e6a79620><div class="bar bar-1" data-v-e6a79620></div><div class="bar bar-2" data-v-e6a79620></div><div class="bar bar-3" data-v-e6a79620></div><div class="bar bar-4" data-v-e6a79620></div><div class="bar bar-5" data-v-e6a79620></div></div><p class="loading-text" data-v-e6a79620>Loading disruption data...</p></div>', 1)
      ])])) : (v(), b("div", jv, [
        d("section", Yv, [
          d("div", qv, [
            $.value.nodes.length > 0 && $.value.links.length > 0 ? (v(), ft(we, {
              key: 0,
              data: $.value,
              "node-colors": A,
              height: "500px"
            }, null, 8, ["data"])) : (v(), b("div", Kv, [...w[5] || (w[5] = [
              d("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        r.value && r.value.length > 0 ? (v(), b("section", Uv, [
          w[7] || (w[7] = nt('<div class="section-header" data-v-e6a79620><h4 class="section-title" data-v-e6a79620>Daily Overview</h4></div><div class="legend-container" data-v-e6a79620><p class="legend-title" data-v-e6a79620>Legend</p><div class="legend-items" data-v-e6a79620><div class="legend-group" data-v-e6a79620><span class="legend-label" data-v-e6a79620>Voluntary:</span><span class="badge badge-vol" data-v-e6a79620>VOL</span></div><div class="legend-group" data-v-e6a79620><span class="legend-label" data-v-e6a79620>Involuntary:</span><span class="badge badge-inv" data-v-e6a79620>INV</span></div><div class="legend-note" data-v-e6a79620><span data-v-e6a79620>Vol=Voluntary</span><span data-v-e6a79620>•</span><span data-v-e6a79620>Inv=Involuntary</span></div></div></div>', 2)),
          d("div", Xv, [
            U(jt, {
              columns: f,
              rows: g.value,
              "row-key": "id"
            }, {
              "cell-date": Y(({ row: x }) => [
                d("span", Gv, C(P(Bt)(String(x.date)).format("DD/MM")), 1)
              ]),
              "cell-initiated": Y(({ row: x }) => [
                d("span", Zv, C(P(Z)(Number(x.disruption_conversations))), 1)
              ]),
              "cell-started": Y(({ row: x }) => [
                d("span", Qv, [
                  wt(C(P(Z)(Number(x.disruption_initiated_count))) + " ", 1),
                  d("span", Jv, " (" + C(h(Number(x.disruption_initiated_count), Number(x.disruption_conversations))) + ") ", 1)
                ])
              ]),
              "cell-abandoned": Y(({ row: x }) => [
                d("span", tm, [
                  d("span", em, C(P(Z)(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count))) + " (" + C(h(Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count), Number(x.disruption_conversations))) + ") ", 1)
                ])
              ]),
              "cell-voluntary": Y(({ row: x }) => [
                d("div", am, [
                  (v(!0), b(Q, null, st([x], (k, S) => (v(), b(Q, { key: S }, [
                    d("span", nm, " VOL " + C(P(Z)(k.voluntary_count)) + " (" + C(h(k.voluntary_count, k.disruption_conversations)) + ") ", 1),
                    d("span", sm, " Confirm " + C(P(Z)(k.confirmed_count)) + " (" + C(h(k.confirmed_count, k.disruption_conversations)) + ") ", 1),
                    d("span", om, " Not Confirm " + C(P(Z)(k.voluntary_count - k.confirmed_count)) + " (" + C(h(k.voluntary_count - k.confirmed_count, k.disruption_conversations)) + ") ", 1),
                    d("span", im, " Reject " + C(P(Z)(k.sell_failed_count)) + " (" + C(h(k.sell_failed_count, k.disruption_conversations)) + ") ", 1),
                    d("span", rm, " Not Paid " + C(P(Z)(Math.max(0, k.confirmed_count - _(k) - k.sell_failed_count))) + " (" + C(h(Math.max(0, k.confirmed_count - _(k) - k.sell_failed_count), k.disruption_conversations)) + ") ", 1),
                    d("span", lm, " Finish " + C(P(Z)(_(k))) + " (" + C(h(_(k), k.disruption_conversations)) + ") ", 1),
                    (v(!0), b(Q, null, st(k.payment_success_total || [], (F) => (v(), b("span", {
                      key: `${k.date}-${F.currency}`,
                      class: "badge badge-currency"
                    }, C(F.currency) + " " + C(m(F.total_value)), 1))), 128))
                  ], 64))), 128))
                ])
              ]),
              "cell-involuntary": Y(({ row: x }) => [
                d("div", cm, [
                  (v(!0), b(Q, null, st([x], (k, S) => (v(), b(Q, { key: S }, [
                    d("span", dm, " INV " + C(P(Z)(k.involuntary_count)) + " (" + C(h(k.involuntary_count, k.disruption_conversations)) + ") ", 1),
                    d("span", um, " Human " + C(P(Z)(k.involuntary_count - k.accepted_count)) + " (" + C(h(k.involuntary_count - k.accepted_count, k.disruption_conversations)) + ") ", 1),
                    d("span", hm, " Accept " + C(P(Z)(k.accepted_count)) + " (" + C(h(k.accepted_count, k.disruption_conversations)) + ") ", 1)
                  ], 64))), 128))
                ])
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          c.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: w[0] || (w[0] = (x) => i.value = !i.value)
          }, [
            wt(C(i.value ? "View less" : `View more (${u.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": i.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...w[6] || (w[6] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", fm, [...w[8] || (w[8] = [
          nt('<div class="empty-state-content" data-v-e6a79620><div class="empty-icon-wrapper" data-v-e6a79620><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e6a79620><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-e6a79620></path></svg></div><p class="empty-title" data-v-e6a79620>No disruption data available</p><p class="empty-description" data-v-e6a79620>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), pm = /* @__PURE__ */ it(gm, [["__scopeId", "data-v-e6a79620"]]), vm = { class: "faq-metrics-card" }, mm = {
  key: 0,
  class: "card-body"
}, bm = {
  key: 0,
  class: "chart-section"
}, ym = {
  key: 1,
  class: "kpi-grid"
}, _m = { class: "kpi-label-row" }, xm = ["title"], km = { class: "kpi-value" }, wm = { class: "kpi-secondary" }, $m = {
  key: 2,
  class: "empty-state"
}, Cm = {
  key: 1,
  class: "loading-state"
}, Mm = /* @__PURE__ */ et({
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
    const n = e, s = a, o = (h) => {
      s("export", h);
    }, { isDark: i, colors: r } = ht(ut(n, "theme")), l = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = at({ labels: [], datasets: [] }), u = D(() => n.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), f = D(() => {
      const h = [
        { name: "airline_information", label: "Airline Info", total: u.value.total_airline_information_retrieved },
        { name: "booking_info", label: "Booking Info", total: u.value.total_booking_info_retrieved },
        { name: "flight_status", label: "Flight Status", total: u.value.total_flight_status_retrieved }
      ], m = h.reduce((y, _) => y + _.total, 0);
      return m === 0 ? [] : h.map((y) => ({
        ...y,
        percentage: (y.total / m * 100).toFixed(1),
        color: l[y.name] || "#9ca3af"
      }));
    }), g = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          labels: {
            usePointStyle: !0,
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12
            },
            color: r.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 13
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          grid: {
            color: r.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        }
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: !1
      }
    })), p = (h) => {
      if (!h) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const m = h.faq_by_day || [];
      if (m.length > 0) {
        const y = m.map((T) => Bt(T.date).format("MMM DD")), _ = m.map((T) => T.airline_information_retrieved_count || 0), $ = m.map((T) => T.flight_status_retrieved_count || 0), A = m.map((T) => T.booking_info_retrieved_count || 0);
        c.value = {
          labels: y,
          datasets: [
            {
              label: "Airline Information",
              data: _,
              borderColor: "#8b5cf6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#8b5cf6",
              pointBorderColor: "#7c3aed",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: "Flight Status",
              data: $,
              borderColor: "#06b6d4",
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#06b6d4",
              pointBorderColor: "#0891b2",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: "Booking Information",
              data: A,
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#f59e0b",
              pointBorderColor: "#d97706",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return It(
      () => n.data,
      (h) => {
        p(h ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (h, m) => (v(), b("div", vm, [
      m[2] || (m[2] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "FAQ Metrics"),
          d("p", { class: "card-subtitle" }, "FAQ volume by category")
        ])
      ], -1)),
      n.loading ? (v(), b("div", Cm, [...m[1] || (m[1] = [
        nt('<div class="loading-container" data-v-52bf990c><div class="chart-bars-loader" data-v-52bf990c><div class="bar bar-1" data-v-52bf990c></div><div class="bar bar-2" data-v-52bf990c></div><div class="bar bar-3" data-v-52bf990c></div><div class="bar bar-4" data-v-52bf990c></div><div class="bar bar-5" data-v-52bf990c></div></div><p class="loading-text" data-v-52bf990c>Loading FAQ metrics...</p></div>', 1)
      ])])) : (v(), b("div", mm, [
        c.value.labels && c.value.labels.length ? (v(), b("section", bm, [
          U(ke, {
            data: c.value,
            options: g.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : V("", !0),
        f.value.length ? (v(), b("div", ym, [
          (v(!0), b(Q, null, st(f.value, (y) => (v(), b("div", {
            class: "kpi-card",
            key: y.name
          }, [
            d("div", _m, [
              d("span", {
                class: "kpi-color-dot",
                style: vt({ backgroundColor: y.color }),
                "aria-hidden": "true"
              }, null, 4),
              d("span", {
                class: "kpi-label",
                title: y.label
              }, C(y.label), 9, xm)
            ]),
            d("span", km, C(P(Z)(y.total)), 1),
            d("span", wm, C(y.percentage) + "%", 1)
          ]))), 128))
        ])) : (v(), b("section", $m, [...m[0] || (m[0] = [
          nt('<div class="empty-state-content" data-v-52bf990c><div class="empty-icon-wrapper" data-v-52bf990c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-52bf990c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-52bf990c></path></svg></div><p class="empty-title" data-v-52bf990c>No FAQ data available</p><p class="empty-description" data-v-52bf990c>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Sm = /* @__PURE__ */ it(Mm, [["__scopeId", "data-v-52bf990c"]]), Dm = { class: "messages-per-agent-card" }, Am = {
  key: 0,
  class: "card-body"
}, Tm = {
  key: 0,
  class: "chart-section"
}, Bm = {
  key: 1,
  class: "kpi-grid"
}, Lm = { class: "kpi-label-row" }, Fm = ["title"], Pm = { class: "kpi-value" }, Rm = { class: "kpi-secondary" }, Im = {
  key: 2,
  class: "empty-state"
}, Em = { class: "empty-state-content" }, Om = { class: "empty-icon-wrapper" }, Vm = {
  key: 1,
  class: "loading-state"
}, zm = /* @__PURE__ */ et({
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
    }, s = e, o = a, i = (g) => {
      o("export", g);
    }, { isDark: r, colors: l } = ht(ut(s, "theme")), c = D(() => {
      const g = s.data?.agents_by_day || {}, p = Object.keys(g).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = /* @__PURE__ */ new Set();
      for (const _ of Object.values(g))
        for (const $ of Object.keys(_))
          h.add($);
      const y = Array.from(h).map((_) => {
        const $ = n[_] || "#94a3b8";
        return {
          label: _.charAt(0).toUpperCase() + _.slice(1).replace(/_/g, " "),
          data: p.map((A) => g[A]?.[_] || 0),
          borderColor: $,
          backgroundColor: `${$}20`,
          pointBackgroundColor: $,
          pointBorderColor: r.value ? "#1a1a1d" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: !1
        };
      });
      return {
        labels: p.map((_) => Bt(_).format("MMM DD")),
        datasets: y
      };
    }), u = D(() => {
      const g = s.data?.agents_by_day || {}, p = {};
      for (const m of Object.values(g))
        for (const [y, _] of Object.entries(m))
          p[y] = (p[y] || 0) + _;
      const h = Object.values(p).reduce((m, y) => m + y, 0);
      return h === 0 ? [] : Object.entries(p).sort(([, m], [, y]) => y - m).map(([m, y]) => ({
        name: m,
        label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
        total: y,
        percentage: (y / h * 100).toFixed(1),
        color: n[m] || "#94a3b8"
      }));
    }), f = D(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: l.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: l.value.tooltipBg,
          titleColor: l.value.tooltipText,
          bodyColor: l.value.tooltipText,
          borderColor: r.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          }
        },
        y: {
          display: !0,
          beginAtZero: !0,
          grid: {
            color: l.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          }
        }
      }
    });
    return t({ isDark: r }), (g, p) => (v(), b("article", Dm, [
      p[3] || (p[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Interactions by Agent"),
          d("p", { class: "card-subtitle" }, "Responses sent by AI agents")
        ])
      ], -1)),
      e.loading ? (v(), b("div", Vm, [...p[2] || (p[2] = [
        nt('<div class="loading-container" data-v-ed04880d><div class="chart-lines-loader" data-v-ed04880d><div class="line line-1" data-v-ed04880d></div><div class="line line-2" data-v-ed04880d></div><div class="line line-3" data-v-ed04880d></div><div class="line line-4" data-v-ed04880d></div><div class="line line-5" data-v-ed04880d></div></div><p class="loading-text" data-v-ed04880d>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", Am, [
        c.value.labels && c.value.labels.length ? (v(), b("section", Tm, [
          U(ke, {
            data: c.value,
            options: f.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : V("", !0),
        u.value.length ? (v(), b("div", Bm, [
          (v(!0), b(Q, null, st(u.value, (h) => (v(), b("div", {
            class: "kpi-card",
            key: h.name
          }, [
            d("div", Lm, [
              d("span", {
                class: "kpi-color-dot",
                style: vt({ backgroundColor: h.color }),
                "aria-hidden": "true"
              }, null, 4),
              d("span", {
                class: "kpi-label",
                title: h.label
              }, C(h.label), 9, Fm)
            ]),
            d("span", Pm, C(h.percentage) + "%", 1),
            d("span", Rm, C(P(Z)(h.total)) + " msgs", 1)
          ]))), 128))
        ])) : (v(), b("section", Im, [
          d("div", Em, [
            d("div", Om, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = d("p", { class: "empty-title" }, "No agent interactions data", -1)),
            p[1] || (p[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Nm = /* @__PURE__ */ it(zm, [["__scopeId", "data-v-ed04880d"]]), Wm = ["open"], Hm = {
  key: 0,
  class: "loading-state"
}, jm = {
  key: 1,
  class: "card-body"
}, Ym = {
  key: 0,
  class: "chart-section"
}, qm = { class: "chart-wrapper" }, Km = {
  key: 1,
  class: "empty-state"
}, Um = {
  key: 2,
  class: "comparison-section"
}, Xm = { class: "comparison-grid" }, Gm = { class: "comparison-content" }, Zm = { class: "comparison-channel" }, Qm = { class: "comparison-value" }, Jm = {
  key: 0,
  class: "comparison-delta"
}, tb = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, eb = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, ab = { class: "delta-label" }, nb = {
  key: 1,
  class: "comparison-delta"
}, sb = /* @__PURE__ */ et({
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
    }, s = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = a, r = (g) => {
      i("export", g);
    }, { isDark: l } = ht(ut(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const c = D(() => {
      const g = /* @__PURE__ */ new Set();
      for (const p of o.data?.sales_by_channel_by_day ?? [])
        for (const h of Object.keys(p.channels))
          g.add(h);
      return Array.from(g).sort();
    }), u = (g, p) => n[g.toLowerCase()] ?? s[p % s.length], f = D(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const p = g.map((m) => Bt(m.date).format("MMM-DD")), h = c.value.map((m, y) => ({
        label: m,
        data: g.map((_) => _.channels[m] ?? 0),
        backgroundColor: u(m, y),
        borderRadius: 4
      }));
      return { labels: p, datasets: h };
    });
    return t({ isDark: l }), (g, p) => (v(), b("details", {
      class: "sales-channel-card metric-collapsible",
      open: e.initiallyOpen
    }, [
      p[5] || (p[5] = nt('<summary class="card-header metric-collapsible__summary" data-v-15317dd2><div class="header-content" data-v-15317dd2><div class="title-section" data-v-15317dd2><h3 class="card-title" data-v-15317dd2>Sales by Channel</h3><p class="card-subtitle" data-v-15317dd2>Successful sales breakdown by communication channel</p></div></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-15317dd2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-15317dd2></path></svg></summary>', 1)),
      o.loading ? (v(), b("div", Hm, [...p[0] || (p[0] = [
        nt('<div class="loading-container" data-v-15317dd2><div class="chart-bars-loader" data-v-15317dd2><div class="bar bar-1" data-v-15317dd2></div><div class="bar bar-2" data-v-15317dd2></div><div class="bar bar-3" data-v-15317dd2></div><div class="bar bar-4" data-v-15317dd2></div><div class="bar bar-5" data-v-15317dd2></div></div><p class="loading-text" data-v-15317dd2>Loading sales data...</p></div>', 1)
      ])])) : (v(), b("div", jm, [
        f.value.labels.length > 0 ? (v(), b("section", Ym, [
          d("div", qm, [
            U(de, {
              data: f.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", Km, [...p[1] || (p[1] = [
          nt('<div class="empty-state-content" data-v-15317dd2><div class="empty-icon-wrapper" data-v-15317dd2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15317dd2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-15317dd2></path></svg></div><p class="empty-title" data-v-15317dd2>No sales data available</p><p class="empty-description" data-v-15317dd2>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (v(), b("section", Um, [
          d("div", Xm, [
            (v(!0), b(Q, null, st(e.channelComparison, (h) => (v(), b("div", {
              key: h.channel,
              class: "comparison-card"
            }, [
              d("div", {
                class: "comparison-color-bar",
                style: vt({ backgroundColor: u(h.channel, e.channelComparison.indexOf(h)) })
              }, null, 4),
              d("div", Gm, [
                d("span", Zm, C(h.channel), 1),
                d("span", Qm, C(P(Z)(h.current)), 1),
                h.delta !== null ? (v(), b("div", Jm, [
                  d("span", {
                    class: q(["delta-badge", h.delta > 0 ? "delta-up" : h.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    h.delta > 0 ? (v(), b("svg", tb, [...p[2] || (p[2] = [
                      d("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : h.delta < 0 ? (v(), b("svg", eb, [...p[3] || (p[3] = [
                      d("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : V("", !0),
                    wt(" " + C(Math.abs(h.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  d("span", ab, "vs prev. period (" + C(P(Z)(h.previous)) + ")", 1)
                ])) : (v(), b("div", nb, [...p[4] || (p[4] = [
                  d("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : V("", !0)
      ]))
    ], 8, Wm));
  }
}), Xi = /* @__PURE__ */ it(sb, [["__scopeId", "data-v-15317dd2"]]), ob = ["open"], ib = { class: "card-header metric-collapsible__summary" }, rb = { class: "header-content" }, lb = { class: "header-badges" }, cb = {
  key: 0,
  class: "payment-success-badge"
}, db = {
  key: 0,
  class: "currency-breakdown-list"
}, ub = {
  key: 1,
  class: "badge-value"
}, hb = {
  key: 1,
  class: "payment-warning-badge"
}, fb = { class: "currency-breakdown-list" }, gb = {
  key: 2,
  class: "payment-warning-badge"
}, pb = { class: "currency-breakdown-list" }, vb = {
  key: 0,
  class: "loading-state"
}, mb = {
  key: 1,
  class: "card-body"
}, bb = {
  key: 0,
  class: "chart-section"
}, yb = { class: "chart-wrapper" }, _b = {
  key: 1,
  class: "empty-state"
}, xb = {
  key: 2,
  class: "table-section"
}, kb = { class: "table-wrapper" }, wb = { class: "sl-cell font-medium" }, $b = { class: "sl-cell text-center" }, Cb = { class: "sl-cell text-center" }, Mb = { class: "sl-cell text-center" }, Sb = { class: "sl-cell text-center" }, Db = { class: "sl-cell text-center" }, Ab = { class: "sl-cell text-center warning-value" }, Tb = {
  key: 0,
  class: "currency-cell-list"
}, Bb = {
  key: 1,
  class: "empty-cell"
}, Lb = { class: "sl-cell text-center" }, Fb = { class: "sl-cell text-center warning-value" }, Pb = {
  key: 0,
  class: "currency-cell-list"
}, Rb = {
  key: 1,
  class: "empty-cell"
}, Ib = { class: "sl-cell text-center" }, Eb = { class: "sl-cell text-center success-value" }, Ob = {
  key: 0,
  class: "currency-cell-list"
}, Vb = { key: 1 }, zb = {
  key: 0,
  class: "failed-reasons"
}, Nb = { class: "reason-name" }, Wb = { class: "reason-count" }, Hb = {
  key: 1,
  class: "empty-cell"
}, yn = 3, jb = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: a }) {
    function n(M) {
      return M;
    }
    const s = e, o = a, i = (M) => {
      o("export", M);
    }, { isDark: r } = ht(ut(s, "theme")), l = at(!1), c = D(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const M = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((L) => {
        const E = M.findIndex((H) => H.date === L.date);
        E !== -1 ? M[E] = { ...M[E], reasons: L.reasons } : M.push({
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
      }), M.sort((L, E) => new Date(L.date).getTime() - new Date(E.date).getTime());
    }), u = D(() => l.value ? c.value : c.value.slice(0, yn)), f = D(() => c.value.length > yn), g = D(
      () => Math.max(0, c.value.length - yn)
    ), p = [
      { key: "date", label: "Date", align: "center" },
      { key: "sellInitiated", label: "Sell Initiated", align: "center" },
      { key: "sellStarted", label: "Sell Started", align: "center" },
      { key: "getQuote", label: "Get Quote", align: "center" },
      { key: "bookingCreated", label: "Booking Created", align: "center" },
      { key: "bankTransfer", label: "Bank Transfer", align: "center" },
      { key: "btValue", label: "BT Value", align: "center" },
      { key: "cashOption", label: "Cash Option", align: "center" },
      { key: "coValue", label: "CO Value", align: "center" },
      { key: "sellSuccess", label: "Sell Success", align: "center" },
      { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
      { key: "failed", label: "Failed", align: "left" }
    ], h = D(
      () => u.value.map((M) => ({
        id: M.date,
        ...M
      }))
    ), m = D(() => s.sellerData), y = D(() => s.failedData), _ = D(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), $ = D(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), A = D(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), T = D(() => {
      const {
        total_seller_conversations: M = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: E = 0,
        total_sell_success: H = 0,
        total_sell_bank_transfer: K = 0,
        total_sell_cash_option: X = 0
      } = m.value, { failed_by_reason_by_day: j = [] } = y.value;
      if (M === 0) return { nodes: [], links: [] };
      const I = [
        { name: "Sell Initiated", value: M },
        { name: "Sell Started", value: L },
        { name: "Booking Created", value: E },
        { name: "Sell Success", value: H }
      ], R = [], z = M - L;
      if (z > 0) {
        const J = Math.round(z / M * 100);
        I.push({ name: "Abandoned (Init)", value: z }), R.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: z,
          label: `${z.toLocaleString()} (${J}%)`
        });
      }
      if (L > 0) {
        const J = Math.round(L / M * 100);
        R.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: L,
          label: `${L.toLocaleString()} (${J}%)`
        });
      }
      const N = j.reduce((J, ct) => (ct.reasons && Array.isArray(ct.reasons) && ct.reasons.forEach((rt) => {
        const mt = rt.reason, lt = rt.failed_count;
        J[mt] = (J[mt] || 0) + lt;
      }), J), {});
      if (E > 0) {
        const J = Math.round(E / M * 100);
        R.push({
          source: "Sell Started",
          target: "Booking Created",
          value: E,
          label: `${E.toLocaleString()} (${J}%)`
        });
      }
      if (K > 0) {
        const J = Math.round(K / M * 100);
        I.push({ name: "Bank Transfer", value: K }), R.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: K,
          label: `${K.toLocaleString()} (${J}%)`
        });
      }
      if (X > 0) {
        const J = Math.round(X / M * 100);
        I.push({ name: "Cash Option", value: X }), R.push({
          source: "Booking Created",
          target: "Cash Option",
          value: X,
          label: `${X.toLocaleString()} (${J}%)`
        });
      }
      if (H > 0) {
        const J = Math.round(H / M * 100);
        R.push({
          source: "Booking Created",
          target: "Sell Success",
          value: H,
          label: `${H.toLocaleString()} (${J}%)`
        });
      }
      const G = E - H - K - X;
      if (G > 0) {
        const J = Math.round(G / M * 100);
        I.push({ name: "Failed at Completion", value: G }), R.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: G,
          label: `${G.toLocaleString()} (${J}%)`
        });
      }
      const ot = L - E;
      if (ot > 0) {
        const J = Math.round(ot / M * 100);
        I.push({ name: "Failed at Booking", value: ot }), R.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: ot,
          label: `${ot.toLocaleString()} (${J}%)`
        });
      }
      if (Object.keys(N).length > 0) {
        const J = Object.values(N).reduce((rt, mt) => rt + mt, 0), ct = ot - J;
        if (Object.entries(N).filter(([, rt]) => rt > 0).sort(([, rt], [, mt]) => mt - rt).forEach(([rt, mt]) => {
          const lt = Math.round(mt / M * 100);
          I.push({ name: `Failed: ${rt}`, value: mt }), R.push({
            source: "Failed at Booking",
            target: `Failed: ${rt}`,
            value: mt,
            label: `${mt.toLocaleString()} (${lt}%)`
          });
        }), ct > 0) {
          const rt = Math.round(ct / M * 100);
          I.push({ name: "Failed: Without Reason", value: ct }), R.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: ct,
            label: `${ct.toLocaleString()} (${rt}%)`
          });
        }
      }
      return { nodes: I, links: R };
    }), w = {
      "Sell Initiated": "#DBEAFE",
      "Abandoned (Init)": "#FEE2E2",
      "Sell Started": "#93C5FD",
      "Get Quote": "#C7D2FE",
      "Booking Created": "#8B8CF6",
      "Bank Transfer": "#fde68a",
      "Cash Option": "#fde68a",
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
    }, x = D(() => w), k = (M, L) => !L || L === 0 ? "0%" : `${Math.round(M / L * 100)}%`, S = (M, L) => {
      const E = Z(M), H = k(M, L);
      return `${E} (${H})`;
    }, F = (M) => M == null ? 0 : typeof M == "number" ? M : Array.isArray(M) ? M.reduce((L, E) => L + (E.total_value || 0), 0) : 0, B = (M) => te(F(M));
    return t({ isDark: r }), (M, L) => (v(), b("details", {
      class: "seller-metrics-card metric-collapsible",
      open: e.initiallyOpen
    }, [
      d("summary", ib, [
        d("div", rb, [
          L[4] || (L[4] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Seller Metrics"),
            d("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          d("div", lb, [
            s.loading ? V("", !0) : (v(), b("div", cb, [
              L[1] || (L[1] = d("p", { class: "badge-label" }, "Total Sales Value", -1)),
              _.value.length > 0 ? (v(), b("div", db, [
                (v(!0), b(Q, null, st(_.value, (E) => (v(), b("p", {
                  key: E.currency,
                  class: "currency-breakdown-item"
                }, C(E.currency) + " " + C(P(te)(E.total_value)), 1))), 128))
              ])) : (v(), b("p", ub, C(B(s.sellerData.total_value_sell_success)), 1))
            ])),
            !s.loading && $.value.length > 0 ? (v(), b("div", hb, [
              L[2] || (L[2] = d("p", { class: "badge-label-warning" }, "Bank Transfer Value", -1)),
              d("div", fb, [
                (v(!0), b(Q, null, st($.value, (E) => (v(), b("p", {
                  key: "bt-" + E.currency,
                  class: "currency-breakdown-item-warning"
                }, C(E.currency) + " " + C(P(te)(E.total_value)), 1))), 128))
              ])
            ])) : V("", !0),
            !s.loading && A.value.length > 0 ? (v(), b("div", gb, [
              L[3] || (L[3] = d("p", { class: "badge-label-warning" }, "Cash Option Value", -1)),
              d("div", pb, [
                (v(!0), b(Q, null, st(A.value, (E) => (v(), b("p", {
                  key: "co-" + E.currency,
                  class: "currency-breakdown-item-warning"
                }, C(E.currency) + " " + C(P(te)(E.total_value)), 1))), 128))
              ])
            ])) : V("", !0)
          ])
        ]),
        L[5] || (L[5] = d("svg", {
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
      s.loading ? (v(), b("div", vb, [...L[6] || (L[6] = [
        nt('<div class="loading-container" data-v-bba35bf6><div class="chart-flow-loader" data-v-bba35bf6><div class="flow-line flow-1" data-v-bba35bf6></div><div class="flow-line flow-2" data-v-bba35bf6></div><div class="flow-line flow-3" data-v-bba35bf6></div><div class="flow-line flow-4" data-v-bba35bf6></div><div class="flow-line flow-5" data-v-bba35bf6></div></div><p class="loading-text" data-v-bba35bf6>Loading sales data...</p></div>', 1)
      ])])) : (v(), b("div", mb, [
        T.value.nodes.length > 0 ? (v(), b("section", bb, [
          d("div", yb, [
            U(we, {
              data: T.value,
              "node-colors": x.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (v(), b("section", _b, [...L[7] || (L[7] = [
          nt('<div class="empty-state-content" data-v-bba35bf6><div class="empty-icon-wrapper" data-v-bba35bf6><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bba35bf6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bba35bf6></path></svg></div><p class="empty-title" data-v-bba35bf6>No sales data available</p><p class="empty-description" data-v-bba35bf6>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        c.value && c.value.length > 0 ? (v(), b("section", xb, [
          d("div", kb, [
            U(jt, {
              columns: p,
              rows: h.value,
              "row-key": "id"
            }, {
              "cell-date": Y(({ row: E }) => [
                d("span", wb, C(P(Bt)(String(E.date)).format("DD/MM/YYYY")), 1)
              ]),
              "cell-sellInitiated": Y(({ row: E }) => [
                d("span", $b, C(P(Z)(Number(E.seller_conversations) || 0)), 1)
              ]),
              "cell-sellStarted": Y(({ row: E }) => [
                d("span", Cb, C(S(E.sell_started_count, E.seller_conversations || E.sell_started_count)), 1)
              ]),
              "cell-getQuote": Y(({ row: E }) => [
                d("span", Mb, C(S(E.sell_get_quote_count, E.seller_conversations || E.sell_started_count)), 1)
              ]),
              "cell-bookingCreated": Y(({ row: E }) => [
                d("span", Sb, C(S(E.sell_booking_created_count, E.seller_conversations || E.sell_started_count)), 1)
              ]),
              "cell-bankTransfer": Y(({ row: E }) => [
                d("span", Db, C(P(Z)(Number(E.sell_bank_transfer_count) || 0)), 1)
              ]),
              "cell-btValue": Y(({ row: E }) => [
                d("span", Ab, [
                  Array.isArray(E.daily_value_sell_bank_transfer) && E.daily_value_sell_bank_transfer.length > 0 ? (v(), b("div", Tb, [
                    (v(!0), b(Q, null, st(E.daily_value_sell_bank_transfer, (H) => (v(), b("span", {
                      key: `${E.date}-bt-${H.currency}`
                    }, C(H.currency) + " " + C(P(te)(H.total_value)), 1))), 128))
                  ])) : (v(), b("span", Bb, "-"))
                ])
              ]),
              "cell-cashOption": Y(({ row: E }) => [
                d("span", Lb, C(P(Z)(Number(E.sell_cash_option_count) || 0)), 1)
              ]),
              "cell-coValue": Y(({ row: E }) => [
                d("span", Fb, [
                  Array.isArray(E.daily_value_sell_cash_option) && E.daily_value_sell_cash_option.length > 0 ? (v(), b("div", Pb, [
                    (v(!0), b(Q, null, st(E.daily_value_sell_cash_option, (H) => (v(), b("span", {
                      key: `${E.date}-co-${H.currency}`
                    }, C(H.currency) + " " + C(P(te)(H.total_value)), 1))), 128))
                  ])) : (v(), b("span", Rb, "-"))
                ])
              ]),
              "cell-sellSuccess": Y(({ row: E }) => [
                d("span", Ib, C(S(E.sell_success_count, E.seller_conversations || E.sell_started_count)), 1)
              ]),
              "cell-totalSalesValue": Y(({ row: E }) => [
                d("span", Eb, [
                  Array.isArray(E.daily_value_sell_success) && E.daily_value_sell_success.length > 0 ? (v(), b("div", Ob, [
                    (v(!0), b(Q, null, st(E.daily_value_sell_success, (H) => (v(), b("span", {
                      key: `${E.date}-${H.currency}`
                    }, C(H.currency) + " " + C(P(te)(H.total_value)), 1))), 128))
                  ])) : (v(), b("span", Vb, C(B(E.daily_value_sell_success)), 1))
                ])
              ]),
              "cell-failed": Y(({ row: E }) => [
                (E.reasons || []).length > 0 ? (v(), b("div", zb, [
                  (v(!0), b(Q, null, st(E.reasons || [], (H) => (v(), b("div", {
                    key: H.reason,
                    class: "failed-reason-item"
                  }, [
                    d("span", Nb, C(H.reason) + ":", 1),
                    d("span", Wb, C(H.failed_count), 1)
                  ]))), 128))
                ])) : (v(), b("div", Hb, "-"))
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          f.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: L[0] || (L[0] = (E) => l.value = !l.value)
          }, [
            wt(C(l.value ? "View less" : `View more (${g.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": l.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...L[8] || (L[8] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : V("", !0)
      ]))
    ], 8, ob));
  }
}), Gi = /* @__PURE__ */ it(jb, [["__scopeId", "data-v-bba35bf6"]]), Yb = ["open"], qb = { class: "seller-container__body" }, Kb = /* @__PURE__ */ et({
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
    const a = e, n = t, s = D(() => a.loading || a.sellerLoading), o = D(() => a.loading || a.salesByChannelLoading), i = D(() => a.exportLoading || a.sellerExportLoading), r = D(() => a.exportLoading || a.salesByChannelExportLoading);
    function l(c, u) {
      n("export", { source: c, format: u });
    }
    return (c, u) => (v(), b("details", {
      class: "seller-container-card metric-collapsible",
      open: e.containerInitiallyOpen
    }, [
      u[2] || (u[2] = nt('<summary class="card-header metric-collapsible__summary seller-container__summary" data-v-9e2c5121><div class="header-content" data-v-9e2c5121><h2 class="card-title font-sans" data-v-9e2c5121>Seller</h2><p class="card-subtitle font-sans" data-v-9e2c5121> Sales funnel performance and successful sales by communication channel. </p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-9e2c5121><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-9e2c5121></path></svg></summary>', 1)),
      d("div", qb, [
        U(Gi, {
          "initially-open": e.childrenInitiallyOpen,
          "seller-data": e.sellerData,
          "failed-data": e.failedData,
          loading: s.value,
          theme: e.theme,
          "enable-export": e.enableExport,
          "export-loading": i.value,
          onExport: u[0] || (u[0] = (f) => l("seller", f))
        }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
        U(Xi, {
          "initially-open": e.childrenInitiallyOpen,
          data: e.salesByChannelData,
          "channel-comparison": e.channelComparison,
          loading: o.value,
          theme: e.theme,
          "enable-export": e.enableExport,
          "export-loading": r.value,
          onExport: u[1] || (u[1] = (f) => l("salesByChannel", f))
        }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
      ])
    ], 8, Yb));
  }
}), Ub = /* @__PURE__ */ it(Kb, [["__scopeId", "data-v-9e2c5121"]]), Xb = { class: "top-agents-card" }, Gb = {
  key: 0,
  class: "card-body"
}, Zb = {
  key: 0,
  class: "chart-section"
}, Qb = {
  key: 1,
  class: "empty-state"
}, Jb = { class: "empty-state-content" }, t1 = { class: "empty-icon-wrapper" }, e1 = {
  key: 1,
  class: "loading-state"
}, a1 = /* @__PURE__ */ et({
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
    }, s = e, o = a, i = (f) => {
      o("export", f);
    }, { isDark: r, colors: l } = ht(ut(s, "theme")), c = D(() => {
      const g = (s.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.reduce(
        (y, _) => y + (Number(_.conversations) || 0),
        0
      ), h = g.map((y) => {
        const _ = y.agent_type?.toLowerCase();
        return n[_] || "#94a3b8";
      }), m = h.map((y) => `${y}80`);
      return {
        labels: g.map((y) => {
          const _ = Number(y.conversations) || 0, $ = p ? _ / p * 100 : 0;
          return `${y.agent_type} - ${_.toLocaleString()} (${$.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((y) => y.conversations),
            backgroundColor: m,
            borderColor: h,
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
            color: l.value.textSecondary
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: l.value.tooltipBg,
          titleColor: l.value.tooltipText,
          bodyColor: l.value.tooltipText,
          borderColor: r.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const g = (f.label || "").toString().split(" - ")[0], p = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce(
                (y, _) => y + (Number(_) || 0),
                0
              ), m = h ? p / h * 100 : 0;
              return `${g}: ${p.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (f, g) => (v(), b("article", Xb, [
      g[3] || (g[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Top Agents"),
          d("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (v(), b("div", e1, [...g[2] || (g[2] = [
        nt('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", Gb, [
        c.value.labels && c.value.labels.length ? (v(), b("section", Zb, [
          U(Ga, {
            data: c.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", Qb, [
          d("div", Jb, [
            d("div", t1, [
              U(P(Ug), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
            g[1] || (g[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), n1 = /* @__PURE__ */ it(a1, [["__scopeId", "data-v-501bf4c4"]]), s1 = { class: "payment-method-card metric-collapsible" }, o1 = {
  key: 0,
  class: "loading-state"
}, i1 = {
  key: 1,
  class: "card-body"
}, r1 = {
  key: 0,
  class: "payment-methods-section"
}, l1 = { class: "payment-methods-grid" }, c1 = { class: "payment-card-content" }, d1 = { class: "payment-card-header" }, u1 = {
  key: 0,
  class: "currency-breakdown-card"
}, h1 = { class: "currency-label" }, f1 = { class: "payment-badge-wrapper" }, g1 = {
  key: 1,
  class: "empty-state"
}, p1 = { class: "empty-state-content" }, v1 = { class: "empty-icon-wrapper" }, m1 = {
  key: 2,
  class: "table-section"
}, b1 = { class: "table-wrapper" }, y1 = { class: "pm-cell font-medium" }, _1 = { class: "pm-cell text-center" }, x1 = { class: "pm-cell text-center success-value" }, k1 = {
  key: 0,
  class: "currency-cell-list"
}, w1 = { class: "payment-tags" }, $1 = { class: "tag-name" }, C1 = {
  key: 0,
  class: "tag-amount"
}, M1 = {
  key: 1,
  class: "tag-amount"
}, S1 = { class: "tag-count" }, D1 = {
  key: 3,
  class: "empty-table-state"
}, A1 = "Not Registered", _n = 3, T1 = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, { isDark: o } = ht(ut(n, "theme")), i = at(!1), r = at({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = D(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = D(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = at(!1), f = D(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((I, R) => Bt(I.date).valueOf() - Bt(R.date).valueOf())), g = D(() => u.value ? f.value : f.value.slice(0, _n)), p = D(() => f.value.length > _n), h = D(
      () => Math.max(0, f.value.length - _n)
    ), m = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], y = D(
      () => g.value.map((I) => ({
        id: I.date,
        date: I.date,
        total_count: I.total_count,
        total_amount: I.total_amount,
        total_amount_by_currency: I.total_amount_by_currency,
        payment_methods: I.payment_methods
      }))
    ), _ = (I) => {
      if (!I)
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
      const R = (I.payment_method_breakdown || []).map((N) => ({
        payment_method: N.payment_method || "Unknown",
        total_amount: N.total_amount ?? 0,
        count: N.count ?? 0,
        total_amount_by_currency: N.total_amount_by_currency ?? []
      })), z = (I.payment_method_by_day || []).map((N) => ({
        date: N.date || "",
        total_count: N.total_count ?? 0,
        total_amount: N.total_amount ?? 0,
        total_amount_by_currency: N.total_amount_by_currency ?? [],
        payment_methods: (N.payment_methods || []).map((G) => ({
          payment_method: G.payment_method || "Unknown",
          total_amount: G.total_amount ?? 0,
          count: G.count ?? 0,
          total_amount_by_currency: G.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: I.airline_name || n.airlineName,
        start_date: I.start_date || "",
        end_date: I.end_date || "",
        total_conversations: I.total_conversations ?? 0,
        total_amount: I.total_amount ?? 0,
        total_sell_usd: I.total_sell_usd,
        total_amount_by_currency: I.total_amount_by_currency ?? [],
        payment_method_breakdown: R,
        payment_method_by_day: z
      };
    }, $ = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [I, R] = n.dates.map((N) => Bt(N).format("YYYY-MM-DD")), z = await n.fetchFunction(n.airlineName, I, R);
          r.value = _(z);
        } catch (I) {
          console.error("Error fetching payment method metrics:", I), r.value = _(null);
        } finally {
          i.value = !1;
        }
      }
    }, A = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], T = (I) => {
      const R = A[I % A.length];
      return {
        background: R.bg,
        borderColor: R.border
      };
    }, w = (I) => ({ color: A[I % A.length].text }), x = (I) => ({ color: A[I % A.length].value }), k = (I) => ({ color: A[I % A.length].icon }), S = (I) => ({ color: A[I % A.length].badge }), F = (I) => {
      const z = L(I).length;
      return z > 18 ? { fontSize: "0.75rem" } : z > 15 ? { fontSize: "0.875rem" } : z > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, B = (I) => {
      const R = I?.toLowerCase() || "";
      return !I || R === "unknown" ? tp : R.includes("credit") || R.includes("debit") ? Bo : R.includes("cash") || R.includes("efectivo") ? qg : R.includes("bank") || R.includes("transfer") ? Kg : R.includes("zelle") || R.includes("pago") || R.includes("movil") ? Jg : R.includes("wallet") ? ep : Qg;
    }, M = (I) => !I || I.toLowerCase() === "unknown" ? A1 : I.replace(/_/g, " "), L = (I) => I == null ? "$0.00" : xt(I), E = (I) => I == null ? "0" : te(I), H = (I) => I ? Bt(I).format("DD/MM/YYYY") : "-", K = (I) => I == null || Number.isNaN(Number(I)) ? 0 : Number(I), X = (I) => {
      s("export", I);
    };
    function j() {
      const I = n.data;
      I && (Array.isArray(I.payment_method_breakdown) && I.payment_method_breakdown.length > 0 || Array.isArray(I.payment_method_by_day) && I.payment_method_by_day.length > 0) && (i.value = !1, r.value = _(I));
    }
    return ne(() => {
      n.data ? j() : $();
    }), It(
      () => n.data,
      (I) => {
        I && j();
      },
      { deep: !0 }
    ), It(
      () => n.dates,
      (I) => {
        n.data || I && I[0] && I[1] && $();
      },
      { deep: !0 }
    ), t({ isDark: o }), (I, R) => (v(), b("details", s1, [
      R[9] || (R[9] = nt('<summary class="card-header metric-collapsible__summary" data-v-aff613d5><div class="header-content" data-v-aff613d5><div class="title-section" data-v-aff613d5><h3 class="card-title" data-v-aff613d5>Payment Method Metrics</h3><p class="card-subtitle" data-v-aff613d5>Sales breakdown by payment method</p></div></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-aff613d5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-aff613d5></path></svg></summary>', 1)),
      i.value ? (v(), b("div", o1, [...R[1] || (R[1] = [
        nt('<div class="loading-container" data-v-aff613d5><div class="chart-lines-loader" data-v-aff613d5><div class="line line-1" data-v-aff613d5></div><div class="line line-2" data-v-aff613d5></div><div class="line line-3" data-v-aff613d5></div><div class="line line-4" data-v-aff613d5></div><div class="line line-5" data-v-aff613d5></div></div><p class="loading-text" data-v-aff613d5>Loading payment data...</p></div>', 1)
      ])])) : (v(), b("div", i1, [
        l.value ? (v(), b("section", r1, [
          R[2] || (R[2] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          d("div", l1, [
            (v(!0), b(Q, null, st(r.value.payment_method_breakdown, (z, N) => (v(), b("div", {
              key: z.payment_method,
              class: "payment-method-card-item",
              style: vt(T(N))
            }, [
              d("div", c1, [
                d("div", d1, [
                  (v(), ft(la(B(z.payment_method)), {
                    class: "payment-icon",
                    style: vt(k(N))
                  }, null, 8, ["style"])),
                  d("span", {
                    class: "payment-name",
                    style: vt(w(N))
                  }, C(M(z.payment_method)), 5)
                ]),
                z.total_amount_by_currency && z.total_amount_by_currency.length > 0 ? (v(), b("div", u1, [
                  (v(!0), b(Q, null, st(z.total_amount_by_currency, (G) => (v(), b("p", {
                    key: `${z.payment_method}-${G.currency}`,
                    class: "currency-card-item",
                    style: vt(x(N))
                  }, [
                    d("span", h1, C(G.currency), 1),
                    d("span", {
                      class: "currency-value",
                      style: vt(F(G.total_value))
                    }, C(E(G.total_value)), 5)
                  ], 4))), 128))
                ])) : (v(), b("p", {
                  key: 1,
                  class: "payment-amount",
                  style: vt([x(N), F(z.total_amount)])
                }, C(L(z.total_amount)), 5)),
                d("div", f1, [
                  d("span", {
                    class: "payment-badge",
                    style: vt(S(N))
                  }, C(K(z.count)) + " " + C(K(z.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (v(), b("section", g1, [
          d("div", p1, [
            d("div", v1, [
              U(P(Bo), { class: "empty-icon" })
            ]),
            R[3] || (R[3] = d("p", { class: "empty-title" }, "No payment data available", -1)),
            R[4] || (R[4] = d("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        c.value ? (v(), b("section", m1, [
          R[7] || (R[7] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
          d("div", b1, [
            U(jt, {
              columns: m,
              rows: y.value,
              "row-key": "id"
            }, {
              "cell-date": Y(({ row: z }) => [
                d("span", y1, C(H(String(z.date))), 1)
              ]),
              "cell-totalSales": Y(({ row: z }) => [
                d("span", _1, C(P(Z)(z.total_count ?? 0)), 1)
              ]),
              "cell-totalAmount": Y(({ row: z }) => [
                d("span", x1, [
                  Array.isArray(z.total_amount_by_currency) && z.total_amount_by_currency.length > 0 ? (v(), b("div", k1, [
                    (v(!0), b(Q, null, st(z.total_amount_by_currency, (N) => (v(), b("span", {
                      key: `${z.date}-${N.currency}`
                    }, C(N.currency) + " " + C(L(N.total_value)), 1))), 128))
                  ])) : (v(), b(Q, { key: 1 }, [
                    wt(C(L(Number(z.total_amount ?? 0))), 1)
                  ], 64))
                ])
              ]),
              "cell-paymentMethods": Y(({ row: z }) => [
                d("div", w1, [
                  (v(!0), b(Q, null, st(Array.isArray(z.payment_methods) ? z.payment_methods : [], (N) => (v(), b("div", {
                    key: N.payment_method,
                    class: "payment-tag"
                  }, [
                    d("span", $1, C(M(N.payment_method)), 1),
                    R[5] || (R[5] = d("span", { class: "tag-separator" }, "•", -1)),
                    !N.total_amount_by_currency || N.total_amount_by_currency.length === 0 ? (v(), b("span", C1, C(L(N.total_amount)), 1)) : (v(), b("span", M1, C(N.total_amount_by_currency.map((G) => `${G.currency} ${L(G.total_value)}`).join(" / ")), 1)),
                    d("span", S1, "(" + C(K(N.count)) + ")", 1)
                  ]))), 128))
                ])
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          p.value ? (v(), b("button", {
            key: 0,
            type: "button",
            class: "view-more-btn",
            onClick: R[0] || (R[0] = (z) => u.value = !u.value)
          }, [
            wt(C(u.value ? "View less" : `View more (${h.value} rows)`) + " ", 1),
            (v(), b("svg", {
              class: q(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...R[6] || (R[6] = [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : V("", !0),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 1,
            onExport: X,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : l.value ? (v(), b("div", D1, [...R[8] || (R[8] = [
          d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : V("", !0)
      ]))
    ]));
  }
}), B1 = /* @__PURE__ */ it(T1, [["__scopeId", "data-v-aff613d5"]]), L1 = { class: "agent-human-conv-card metric-collapsible" }, F1 = {
  key: 0,
  class: "loading-state"
}, P1 = {
  key: 1,
  class: "card-body"
}, R1 = { class: "summary-cards" }, I1 = {
  key: 0,
  class: "summary-card enqueued-card"
}, E1 = { class: "summary-card-content" }, O1 = { class: "card-content enqueued-content" }, V1 = { class: "card-value enqueued-value" }, z1 = { class: "summary-card assigned-card" }, N1 = { class: "summary-card-content" }, W1 = { class: "card-content" }, H1 = { class: "card-value assigned-value" }, j1 = { class: "card-content" }, Y1 = { class: "card-value assigned-value" }, q1 = { class: "summary-card closed-card" }, K1 = { class: "summary-card-content" }, U1 = { class: "card-content" }, X1 = { class: "card-value closed-value" }, G1 = { class: "card-content" }, Z1 = { class: "card-value closed-value" }, Q1 = {
  key: 0,
  class: "agents-section"
}, J1 = { class: "date-header" }, ty = { class: "date-title" }, ey = { class: "date-stats" }, ay = {
  key: 0,
  class: "stat-item enqueued-stat"
}, ny = { class: "stat-value" }, sy = { class: "stat-item assigned-stat" }, oy = { class: "stat-value" }, iy = { class: "stat-value" }, ry = { class: "stat-item closed-stat" }, ly = { class: "stat-value" }, cy = { class: "stat-value" }, dy = { class: "table-wrapper" }, uy = { class: "ah-cell name-cell" }, hy = { class: "ah-cell email-cell" }, fy = { class: "metric-cell-content" }, gy = { class: "badge assigned-badge" }, py = { class: "metric-cell-avg" }, vy = { class: "metric-cell-content" }, my = { class: "badge closed-badge" }, by = { class: "metric-cell-avg" }, yy = ["onClick"], _y = {
  key: 1,
  class: "empty-state"
}, xn = 3, xy = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, o = (S) => {
      s("export", S);
    }, { isDark: i } = ht(ut(n, "theme")), r = D(() => {
      const S = n.data?.agents_by_day && n.data.agents_by_day.length > 0, F = (n.data?.total_enqueued ?? 0) > 0;
      return S || F;
    }), l = D(() => {
      if (!r.value) return {};
      const S = {};
      for (const M of n.data.agents_by_day)
        S[M.date] || (S[M.date] = []), S[M.date].push(M);
      const F = Object.keys(S).sort((M, L) => new Date(M).getTime() - new Date(L).getTime()), B = {};
      for (const M of F)
        B[M] = S[M];
      return B;
    }), c = at({});
    function u(S) {
      c.value = {
        ...c.value,
        [S]: !c.value[S]
      };
    }
    function f(S, F) {
      return c.value[S] ? F : F.slice(0, xn);
    }
    function g(S) {
      return Math.max(0, S.length - xn);
    }
    function p(S) {
      return S.length > xn;
    }
    const h = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function m(S, F) {
      return f(S, F).map((B, M) => ({
        id: `${S}-${B.agent_email}-${M}`,
        agent_name: B.agent_name,
        agent_email: B.agent_email,
        assigned_count: B.assigned_count,
        closed_count: B.closed_count,
        avg_time_to_assign_seconds: B.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: B.avg_conversation_duration_seconds
      }));
    }
    const y = (S) => S == null ? "0" : Z(S), _ = (S) => {
      if (S == null)
        return "AVG";
      if (S < 60)
        return `${Math.round(S)}s`;
      const F = Math.round(S), B = Math.floor(F / 60), M = F % 60;
      if (B < 60)
        return `${B}m ${M}s`;
      const L = Math.floor(B / 60), E = B % 60;
      return `${L}h ${E}m`;
    }, $ = (S) => {
      const F = new Date(S), B = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return F.toLocaleDateString("en-US", B);
    }, A = (S) => S[0]?.day_total_enqueued ?? 0, T = (S) => S[0]?.day_total_assigned ?? 0, w = (S) => S[0]?.day_total_closed ?? 0, x = (S) => S[0]?.day_avg_time_to_assign_seconds ?? null, k = (S) => S[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (S, F) => (v(), b("details", L1, [
      F[14] || (F[14] = nt('<summary class="card-header metric-collapsible__summary" data-v-16f50989><div class="header-content" data-v-16f50989><h3 class="card-title" data-v-16f50989>Agent Human Conversations</h3><p class="card-subtitle" data-v-16f50989>Human conversation assignments and closures by agent</p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-16f50989><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-16f50989></path></svg></summary>', 1)),
      e.loading ? (v(), b("div", F1, [...F[0] || (F[0] = [
        nt('<div class="loading-container" data-v-16f50989><div class="chart-bars-loader" data-v-16f50989><div class="bar bar-1" data-v-16f50989></div><div class="bar bar-2" data-v-16f50989></div><div class="bar bar-3" data-v-16f50989></div><div class="bar bar-4" data-v-16f50989></div><div class="bar bar-5" data-v-16f50989></div></div><p class="loading-text" data-v-16f50989>Loading agent data...</p></div>', 1)
      ])])) : (v(), b("div", P1, [
        d("div", R1, [
          e.data.total_enqueued ? (v(), b("div", I1, [
            F[2] || (F[2] = d("div", { class: "card-decoration" }, null, -1)),
            d("div", E1, [
              d("div", O1, [
                F[1] || (F[1] = d("p", { class: "card-label" }, "Total Enqueued", -1)),
                d("p", V1, C(y(e.data.total_enqueued)), 1)
              ])
            ])
          ])) : V("", !0),
          d("div", z1, [
            F[5] || (F[5] = d("div", { class: "card-decoration" }, null, -1)),
            d("div", N1, [
              d("div", W1, [
                F[3] || (F[3] = d("p", { class: "card-label" }, "Total Assigned", -1)),
                d("p", H1, C(y(e.data.total_assigned)), 1)
              ]),
              d("div", j1, [
                F[4] || (F[4] = d("p", { class: "card-label" }, "AVG time to assign", -1)),
                d("p", Y1, C(_(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          d("div", q1, [
            F[8] || (F[8] = d("div", { class: "card-decoration" }, null, -1)),
            d("div", K1, [
              d("div", U1, [
                F[6] || (F[6] = d("p", { class: "card-label" }, "Total Closed", -1)),
                d("p", X1, C(y(e.data.total_closed)), 1)
              ]),
              d("div", G1, [
                F[7] || (F[7] = d("p", { class: "card-label" }, "AVG time to close", -1)),
                d("p", Z1, C(_(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (v(), b("div", Q1, [
          (v(!0), b(Q, null, st(l.value, (B, M) => (v(), b("div", {
            key: M,
            class: "date-group"
          }, [
            d("div", J1, [
              d("h4", ty, C($(M)), 1),
              d("div", ey, [
                A(B) ? (v(), b("span", ay, [
                  d("span", ny, C(y(A(B))), 1),
                  F[9] || (F[9] = wt(" Enqueued ", -1))
                ])) : V("", !0),
                d("span", sy, [
                  d("span", oy, C(y(T(B))), 1),
                  F[10] || (F[10] = wt(" Assigned ", -1)),
                  d("span", iy, C(_(x(B))), 1)
                ]),
                d("span", ry, [
                  d("span", ly, C(y(w(B))), 1),
                  F[11] || (F[11] = wt(" Closed ", -1)),
                  d("span", cy, C(_(k(B))), 1)
                ])
              ])
            ]),
            d("div", dy, [
              U(jt, {
                columns: h,
                rows: m(String(M), B),
                "row-key": "id"
              }, {
                "cell-agentName": Y(({ row: L }) => [
                  d("span", uy, C(L.agent_name || "-"), 1)
                ]),
                "cell-email": Y(({ row: L }) => [
                  d("span", hy, C(L.agent_email), 1)
                ]),
                "cell-assigned": Y(({ row: L }) => [
                  d("div", fy, [
                    d("span", gy, C(y(Number(L.assigned_count))), 1),
                    d("span", py, C(_(Number(L.avg_time_to_assign_seconds))), 1)
                  ])
                ]),
                "cell-closed": Y(({ row: L }) => [
                  d("div", vy, [
                    d("span", my, C(y(Number(L.closed_count))), 1),
                    d("span", by, C(_(Number(L.avg_conversation_duration_seconds))), 1)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ]),
            p(B) ? (v(), b("button", {
              key: 0,
              type: "button",
              class: "view-more-btn",
              onClick: (L) => u(String(M))
            }, [
              wt(C(c.value[M] ? "View less" : `View more (${g(B)} rows)`) + " ", 1),
              (v(), b("svg", {
                class: q(["view-more-icon", { "view-more-icon-rotated": c.value[M] }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...F[12] || (F[12] = [
                d("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ], 8, yy)) : V("", !0)
          ]))), 128)),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("div", _y, [...F[13] || (F[13] = [
          nt('<div class="empty-state-content" data-v-16f50989><div class="empty-icon-wrapper" data-v-16f50989><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-16f50989><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-16f50989></path></svg></div><p class="empty-title" data-v-16f50989>No agent human conversation data available</p><p class="empty-description" data-v-16f50989>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), ky = /* @__PURE__ */ it(xy, [["__scopeId", "data-v-16f50989"]]), wy = { class: "channel-metrics-card" }, $y = {
  key: 0,
  class: "card-body"
}, Cy = {
  key: 0,
  class: "chart-section"
}, My = {
  key: 1,
  class: "kpi-grid"
}, Sy = { class: "kpi-label-row" }, Dy = ["title"], Ay = { class: "kpi-value" }, Ty = { class: "kpi-secondary" }, By = {
  key: 2,
  class: "empty-state"
}, Ly = {
  key: 1,
  class: "loading-state"
}, Fy = /* @__PURE__ */ et({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, o = (h) => {
      s("export", h);
    }, { isDark: i, colors: r } = ht(ut(n, "theme")), l = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = at({ labels: [], datasets: [] }), u = D(() => n.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), f = D(() => {
      const h = u.value.total_by_channel || {}, m = Object.values(h).reduce((y, _) => y + _, 0);
      return m === 0 ? [] : Object.entries(h).sort(([, y], [, _]) => _ - y).map(([y, _]) => ({
        name: y,
        label: y.toUpperCase(),
        total: _,
        percentage: (_ / m * 100).toFixed(1),
        color: l[y.toLowerCase()] || "#9ca3af"
      }));
    }), g = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          labels: {
            usePointStyle: !0,
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12
            },
            color: r.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 13
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          grid: {
            color: r.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        }
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: !1
      }
    })), p = (h) => {
      if (!h || !h.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const m = h.channels_by_day, y = Object.keys(m).sort();
      if (y.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const T of Object.values(m))
        for (const w of Object.keys(T))
          _.add(w);
      const A = Array.from(_).map((T) => {
        const w = T.toLowerCase(), x = l[w] || "#9ca3af";
        return {
          label: T.toUpperCase(),
          data: y.map((k) => m[k]?.[T] || 0),
          borderColor: x,
          backgroundColor: `${x}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: x,
          pointBorderColor: x,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      c.value = {
        labels: y.map((T) => Bt(T).format("MMM DD")),
        datasets: A
      };
    };
    return It(
      () => n.data,
      (h) => {
        p(h ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (h, m) => (v(), b("article", wy, [
      m[2] || (m[2] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Interactions by Channel"),
          d("p", { class: "card-subtitle" }, "Responses sent by AI agents")
        ])
      ], -1)),
      n.loading ? (v(), b("div", Ly, [...m[1] || (m[1] = [
        nt('<div class="loading-container" data-v-5aa7d4da><div class="chart-bars-loader" data-v-5aa7d4da><div class="bar bar-1" data-v-5aa7d4da></div><div class="bar bar-2" data-v-5aa7d4da></div><div class="bar bar-3" data-v-5aa7d4da></div><div class="bar bar-4" data-v-5aa7d4da></div><div class="bar bar-5" data-v-5aa7d4da></div></div><p class="loading-text" data-v-5aa7d4da>Loading channel metrics...</p></div>', 1)
      ])])) : (v(), b("div", $y, [
        c.value.labels && c.value.labels.length ? (v(), b("section", Cy, [
          U(ke, {
            data: c.value,
            options: g.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : V("", !0),
        f.value.length ? (v(), b("div", My, [
          (v(!0), b(Q, null, st(f.value, (y) => (v(), b("div", {
            class: "kpi-card",
            key: y.name
          }, [
            d("div", Sy, [
              d("span", {
                class: "kpi-color-dot",
                style: vt({ backgroundColor: y.color }),
                "aria-hidden": "true"
              }, null, 4),
              d("span", {
                class: "kpi-label",
                title: y.label
              }, C(y.label), 9, Dy)
            ]),
            d("span", Ay, C(y.percentage) + "%", 1),
            d("span", Ty, C(P(Z)(y.total)) + " msgs", 1)
          ]))), 128))
        ])) : (v(), b("section", By, [...m[0] || (m[0] = [
          nt('<div class="empty-state-content" data-v-5aa7d4da><div class="empty-icon-wrapper" data-v-5aa7d4da><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5aa7d4da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-5aa7d4da></path></svg></div><p class="empty-title" data-v-5aa7d4da>No channel metrics data available</p><p class="empty-description" data-v-5aa7d4da>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Py = /* @__PURE__ */ it(Fy, [["__scopeId", "data-v-5aa7d4da"]]), Ry = { class: "triage-combinations-card" }, Iy = { class: "card-header" }, Ey = { class: "total-badge" }, Oy = {
  key: 0,
  class: "card-body"
}, Vy = { class: "chart-container" }, zy = { class: "triage-table-wrap" }, Ny = { class: "triage-row-label" }, Wy = {
  key: 1,
  class: "triage-count"
}, Hy = {
  key: 1,
  class: "triage-count"
}, jy = {
  key: 1,
  class: "triage-count"
}, Yy = {
  key: 1,
  class: "triage-count"
}, qy = {
  key: 1,
  class: "triage-count"
}, Ky = {
  key: 1,
  class: "empty-state"
}, Uy = { class: "empty-state-content" }, Xy = { class: "empty-icon-wrapper" }, Gy = {
  key: 1,
  class: "loading-state"
}, Zy = /* @__PURE__ */ et({
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
    const n = e, s = a, o = (A) => {
      s("export", A);
    }, { isDark: i, colors: r } = ht(ut(n, "theme")), l = D(() => {
      const A = n.data?.combinations || {}, T = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [w, x] of Object.entries(A)) {
        const k = w.split("+").filter(Boolean);
        if (!k.includes("triage")) continue;
        const S = k.filter((F) => F !== "triage").length;
        S >= 4 ? T["4p"] += Number(x) || 0 : T[S] += Number(x) || 0;
      }
      return T;
    }), c = D(() => {
      const A = l.value;
      return A[0] + A[1] + A[2] + A[3] + A["4p"] || 0;
    }), u = D(() => Object.keys(n.data?.combinations || {}).length > 0), f = D(() => {
      const A = c.value;
      if (!A) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const T = l.value;
      return {
        pct0: T[0] / A * 100,
        pct1: T[1] / A * 100,
        pct2: T[2] / A * 100,
        pct3: T[3] / A * 100,
        pct4p: T["4p"] / A * 100
      };
    }), g = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], p = D(() => {
      const A = f.value, T = l.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: A.pct0,
          b1: A.pct1,
          b2: A.pct2,
          b3: A.pct3,
          b4p: A.pct4p
        },
        {
          id: "count",
          metric: "Count",
          b0: T[0],
          b1: T[1],
          b2: T[2],
          b3: T[3],
          b4p: T["4p"]
        }
      ];
    }), h = {
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
    }, m = (A) => A?.replace("80", "") || "#888888", y = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [f.value.pct0],
          backgroundColor: h.c0,
          borderColor: m(h.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [f.value.pct1],
          backgroundColor: h.c1,
          borderColor: m(h.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [f.value.pct2],
          backgroundColor: h.c2,
          borderColor: m(h.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [f.value.pct3],
          backgroundColor: h.c3,
          borderColor: m(h.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [f.value.pct4p],
          backgroundColor: h.c4p,
          borderColor: m(h.c4p),
          borderWidth: 1
        }
      ]
    })), _ = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      indexAxis: "y",
      plugins: {
        legend: { display: !1 },
        tooltip: {
          enabled: !0,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.tooltipText,
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
            label: (A) => `${A.dataset.label} intent(s): ${Number(A.raw || 0).toFixed(0)}%`
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
    })), $ = (A) => `${(Number(A) || 0).toFixed(0)}`;
    return t({ isDark: i }), (A, T) => (v(), b("article", Ry, [
      d("header", Iy, [
        T[0] || (T[0] = d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          d("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        d("span", Ey, " Total: " + C(c.value), 1)
      ]),
      e.loading ? (v(), b("div", Gy, [...T[3] || (T[3] = [
        nt('<div class="loading-container" data-v-9970ac17><div class="chart-bars-loader" data-v-9970ac17><div class="bar bar-1" data-v-9970ac17></div><div class="bar bar-2" data-v-9970ac17></div><div class="bar bar-3" data-v-9970ac17></div><div class="bar bar-4" data-v-9970ac17></div><div class="bar bar-5" data-v-9970ac17></div></div><p class="loading-text" data-v-9970ac17>Loading intent distribution...</p></div>', 1)
      ])])) : (v(), b("div", Oy, [
        u.value ? (v(), b(Q, { key: 0 }, [
          d("div", Vy, [
            U(de, {
              data: y.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          d("div", zy, [
            U(jt, {
              columns: g,
              rows: p.value,
              "row-key": "id"
            }, {
              "cell-metric": Y(({ row: w }) => [
                d("span", Ny, C(w.metric), 1)
              ]),
              "cell-b0": Y(({ row: w }) => [
                w.id === "pct" ? (v(), b("span", {
                  key: 0,
                  class: "triage-pct",
                  style: vt({ color: m(h.c0) })
                }, C($(Number(w.b0))) + "%", 5)) : (v(), b("span", Wy, C(P(Z)(Number(w.b0))), 1))
              ]),
              "cell-b1": Y(({ row: w }) => [
                w.id === "pct" ? (v(), b("span", {
                  key: 0,
                  class: "triage-pct",
                  style: vt({ color: m(h.c1) })
                }, C($(Number(w.b1))) + "%", 5)) : (v(), b("span", Hy, C(P(Z)(Number(w.b1))), 1))
              ]),
              "cell-b2": Y(({ row: w }) => [
                w.id === "pct" ? (v(), b("span", {
                  key: 0,
                  class: "triage-pct",
                  style: vt({ color: m(h.c2) })
                }, C($(Number(w.b2))) + "%", 5)) : (v(), b("span", jy, C(P(Z)(Number(w.b2))), 1))
              ]),
              "cell-b3": Y(({ row: w }) => [
                w.id === "pct" ? (v(), b("span", {
                  key: 0,
                  class: "triage-pct",
                  style: vt({ color: m(h.c3) })
                }, C($(Number(w.b3))) + "%", 5)) : (v(), b("span", Yy, C(P(Z)(Number(w.b3))), 1))
              ]),
              "cell-b4p": Y(({ row: w }) => [
                w.id === "pct" ? (v(), b("span", {
                  key: 0,
                  class: "triage-pct",
                  style: vt({ color: m(h.c4p) })
                }, C($(Number(w.b4p))) + "%", 5)) : (v(), b("span", qy, C(P(Z)(Number(w.b4p))), 1))
              ]),
              _: 1
            }, 8, ["rows"])
          ]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ], 64)) : (v(), b("div", Ky, [
          d("div", Uy, [
            d("div", Xy, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            T[1] || (T[1] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
            T[2] || (T[2] = d("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Qy = /* @__PURE__ */ it(Zy, [["__scopeId", "data-v-9970ac17"]]), Jy = { class: "select-language-card" }, t_ = { class: "card-header" }, e_ = { class: "header-content" }, a_ = {
  key: 0,
  class: "total-badge"
}, n_ = { class: "badge-value" }, s_ = {
  key: 0,
  class: "loading-state"
}, o_ = {
  key: 1,
  class: "card-body"
}, i_ = {
  key: 0,
  class: "pie-section"
}, r_ = {
  key: 1,
  class: "empty-state"
}, l_ = /* @__PURE__ */ et({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: s } = ht(ut(a, "theme")), o = [
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
    }, r = (p) => i[p]?.label || p.toUpperCase(), l = D(
      () => a.data?.items && a.data.items.length > 0
    ), c = D(
      () => (a.data?.items || []).reduce((p, h) => p + h.count, 0)
    ), u = D(() => {
      const p = {};
      for (const h of a.data?.items || [])
        p[h.language] = (p[h.language] || 0) + h.count;
      return Object.entries(p).map(([h, m]) => ({ language: h, count: m })).sort((h, m) => m.count - h.count);
    }), f = D(() => ({
      labels: u.value.map((p) => r(p.language)),
      datasets: [{
        data: u.value.map((p) => p.count),
        backgroundColor: u.value.map((p, h) => o[h % o.length] + "80"),
        borderColor: u.value.map((p, h) => o[h % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), g = D(() => ({
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
          borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (p) => {
              const h = p.raw || 0, m = c.value > 0 ? (h / c.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${h} (${m}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (p, h) => (v(), b("article", Jy, [
      d("header", t_, [
        d("div", e_, [
          h[1] || (h[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Language Selection"),
            d("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          a.loading ? V("", !0) : (v(), b("div", a_, [
            h[0] || (h[0] = d("p", { class: "badge-label" }, "Total", -1)),
            d("p", n_, C(P(Z)(c.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (v(), b("div", s_, [...h[2] || (h[2] = [
        nt('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (v(), b("div", o_, [
        l.value ? (v(), b("section", i_, [
          U(Ga, {
            data: f.value,
            options: g.value
          }, null, 8, ["data", "options"])
        ])) : (v(), b("section", r_, [...h[3] || (h[3] = [
          nt('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), c_ = /* @__PURE__ */ it(l_, [["__scopeId", "data-v-216eadc2"]]), d_ = { class: "guardrails-card" }, u_ = { class: "card-header" }, h_ = { class: "header-content" }, f_ = {
  key: 0,
  class: "total-badge"
}, g_ = { class: "badge-value" }, p_ = {
  key: 0,
  class: "loading-state"
}, v_ = {
  key: 1,
  class: "card-body"
}, m_ = { class: "summary-card" }, b_ = { class: "summary-items" }, y_ = { class: "summary-item" }, __ = { class: "summary-value" }, x_ = { class: "summary-pct" }, k_ = { class: "summary-item" }, w_ = { class: "summary-pct" }, $_ = { class: "summary-item" }, C_ = { class: "summary-value" }, M_ = { class: "summary-pct" }, S_ = {
  key: 0,
  class: "table-section"
}, D_ = { class: "table-wrapper" }, A_ = { class: "table-cell-inner font-medium" }, T_ = { class: "table-cell-inner text-center font-semibold" }, B_ = { class: "type-badges-row" }, L_ = {
  key: 1,
  class: "empty-state"
}, kn = 3, F_ = /* @__PURE__ */ et({
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
    const n = e, s = a, o = (T) => {
      s("export", T);
    }, { isDark: i } = ht(ut(n, "theme")), r = D(
      () => n.data?.items && n.data.items.length > 0
    ), l = D(
      () => (n.data?.items || []).reduce((T, w) => T + w.count, 0)
    ), c = (T) => {
      const w = {};
      for (const S of n.data?.items || [])
        w[S[T]] = (w[S[T]] || 0) + S.count;
      const x = Object.entries(w).sort((S, F) => F[1] - S[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const k = l.value;
      return {
        name: x[0][0],
        pct: k > 0 ? Math.round(x[0][1] / k * 100) : 0
      };
    }, u = D(() => c("guardrail_type")), f = D(() => c("guardrail_action")), g = D(() => c("guardrail_source")), p = D(() => {
      const T = {};
      for (const w of n.data?.items || [])
        T[w.date] || (T[w.date] = {}), T[w.date][w.guardrail_type] = (T[w.date][w.guardrail_type] || 0) + w.count;
      return Object.entries(T).map(([w, x]) => ({
        date: w,
        total: Object.values(x).reduce((k, S) => k + S, 0),
        types: Object.entries(x).map(([k, S]) => ({ type: k, count: S })).sort((k, S) => S.count - k.count)
      })).sort((w, x) => new Date(w.date).getTime() - new Date(x.date).getTime());
    }), h = at(!1), m = D(() => h.value ? p.value : p.value.slice(0, kn)), y = D(() => p.value.length > kn), _ = D(
      () => Math.max(0, p.value.length - kn)
    ), $ = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], A = D(
      () => m.value.map((T) => ({
        id: T.date,
        date: T.date,
        total: T.total,
        types: T.types
      }))
    );
    return t({ isDark: i }), (T, w) => (v(), b("article", d_, [
      d("header", u_, [
        d("div", h_, [
          w[2] || (w[2] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Guardrails Metrics"),
            d("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          n.loading ? V("", !0) : (v(), b("div", f_, [
            w[1] || (w[1] = d("p", { class: "badge-label" }, "Total Events", -1)),
            d("p", g_, C(P(Z)(l.value)), 1)
          ]))
        ])
      ]),
      n.loading ? (v(), b("div", p_, [...w[3] || (w[3] = [
        nt('<div class="loading-container" data-v-8ae8ca7b><div class="chart-bars-loader" data-v-8ae8ca7b><div class="bar bar-1" data-v-8ae8ca7b></div><div class="bar bar-2" data-v-8ae8ca7b></div><div class="bar bar-3" data-v-8ae8ca7b></div><div class="bar bar-4" data-v-8ae8ca7b></div><div class="bar bar-5" data-v-8ae8ca7b></div></div><p class="loading-text" data-v-8ae8ca7b>Loading guardrails data...</p></div>', 1)
      ])])) : (v(), b("div", v_, [
        r.value ? (v(), b(Q, { key: 0 }, [
          d("div", m_, [
            d("div", b_, [
              d("div", y_, [
                w[4] || (w[4] = d("span", { class: "summary-label" }, "Top type:", -1)),
                d("span", __, C(u.value.name), 1),
                d("span", x_, "(" + C(u.value.pct) + "%)", 1)
              ]),
              w[7] || (w[7] = d("span", { class: "summary-dot" }, "·", -1)),
              d("div", k_, [
                w[5] || (w[5] = d("span", { class: "summary-label" }, "Top action:", -1)),
                d("span", {
                  class: q(["summary-value", `summary-action-${f.value.name.toLowerCase()}`])
                }, C(f.value.name), 3),
                d("span", w_, "(" + C(f.value.pct) + "%)", 1)
              ]),
              w[8] || (w[8] = d("span", { class: "summary-dot" }, "·", -1)),
              d("div", $_, [
                w[6] || (w[6] = d("span", { class: "summary-label" }, "Top source:", -1)),
                d("span", C_, C(g.value.name), 1),
                d("span", M_, "(" + C(g.value.pct) + "%)", 1)
              ])
            ])
          ]),
          p.value.length > 0 ? (v(), b("section", S_, [
            w[10] || (w[10] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", D_, [
              U(jt, {
                columns: $,
                rows: A.value,
                "row-key": "id"
              }, {
                "cell-date": Y(({ row: x }) => [
                  d("span", A_, C(P(Bt)(String(x.date)).format("DD/MM")), 1)
                ]),
                "cell-count": Y(({ row: x }) => [
                  d("span", T_, C(P(Z)(x.total)), 1)
                ]),
                "cell-types": Y(({ row: x }) => [
                  d("div", B_, [
                    (v(!0), b(Q, null, st(x.types, (k) => (v(), b("span", {
                      key: k.type,
                      class: "type-count-badge"
                    }, C(k.type) + " (" + C(k.count) + ") ", 1))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ]),
            y.value ? (v(), b("button", {
              key: 0,
              type: "button",
              class: "view-more-btn",
              onClick: w[0] || (w[0] = (x) => h.value = !h.value)
            }, [
              wt(C(h.value ? "View less" : `View more (${_.value} rows)`) + " ", 1),
              (v(), b("svg", {
                class: q(["view-more-icon", { "view-more-icon-rotated": h.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...w[9] || (w[9] = [
                d("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : V("", !0),
            e.enableExport ? (v(), ft(P(Mt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : V("", !0)
          ])) : V("", !0)
        ], 64)) : (v(), b("section", L_, [...w[11] || (w[11] = [
          nt('<div class="empty-state-content" data-v-8ae8ca7b><div class="empty-icon-wrapper" data-v-8ae8ca7b><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8ae8ca7b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-8ae8ca7b></path></svg></div><p class="empty-title" data-v-8ae8ca7b>No guardrail events</p><p class="empty-description" data-v-8ae8ca7b>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), P_ = /* @__PURE__ */ it(F_, [["__scopeId", "data-v-8ae8ca7b"]]), R_ = { class: "dn-metrics-card metric-collapsible" }, I_ = { class: "card-header metric-collapsible__summary" }, E_ = { class: "header-content" }, O_ = {
  key: 0,
  class: "total-docs-badge"
}, V_ = { class: "badge-value" }, z_ = {
  key: 0,
  class: "loading-state"
}, N_ = {
  key: 1,
  class: "card-body"
}, W_ = { class: "kpi-grid" }, H_ = { class: "kpi-card kpi-neutral" }, j_ = { class: "kpi-value" }, Y_ = { class: "kpi-card kpi-success" }, q_ = { class: "kpi-value kpi-value-success" }, K_ = { class: "kpi-pct" }, U_ = { class: "kpi-card kpi-danger" }, X_ = { class: "kpi-value kpi-value-error" }, G_ = { class: "kpi-pct" }, Z_ = { class: "kpi-card kpi-warning" }, Q_ = { class: "kpi-value kpi-value-reason" }, J_ = { class: "kpi-pct" }, t2 = { class: "chart-section" }, e2 = { class: "chart-wrapper" }, a2 = {
  key: 1,
  class: "empty-chart"
}, n2 = {
  key: 0,
  class: "table-section"
}, s2 = { class: "table-wrapper" }, o2 = { class: "failure-reason" }, i2 = { class: "failure-count" }, r2 = { class: "impact-bar-container" }, l2 = { class: "impact-label" }, c2 = {
  key: 1,
  class: "chart-section"
}, d2 = { class: "chart-wrapper" }, u2 = { class: "system-health" }, h2 = { class: "system-health-content" }, f2 = { class: "sys-kpi-grid" }, g2 = { class: "sys-kpi" }, p2 = { class: "sys-value" }, v2 = { class: "sys-kpi" }, m2 = { class: "sys-value" }, b2 = { class: "sys-kpi" }, y2 = { class: "sys-value sys-error" }, _2 = { class: "sys-kpi" }, x2 = { class: "sys-value" }, k2 = { class: "sys-kpi" }, w2 = { class: "sys-value" }, $2 = { class: "sys-kpi" }, C2 = { class: "sys-value sys-error" }, M2 = {
  key: 1,
  class: "empty-state"
}, wn = 3, S2 = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, o = (B) => {
      s("export", B);
    }, { isDark: i, colors: r } = ht(ut(n, "theme")), l = D(() => {
      const B = n.data?.documentCounts?.items || [], M = n.data?.processingCounts?.items || [];
      return B.length > 0 || M.length > 0;
    }), c = D(() => {
      const B = n.data?.documentCounts?.items || [];
      return {
        processing_started: B.reduce((M, L) => M + L.processing_started, 0),
        processing_completed: B.reduce((M, L) => M + L.processing_completed, 0),
        processing_failed: B.reduce((M, L) => M + L.processing_failed, 0),
        row_count_total: B.reduce((M, L) => M + L.row_count_total, 0)
      };
    }), u = D(() => {
      const B = n.data?.processingCounts?.items || [];
      return {
        processing_started: B.reduce((M, L) => M + L.processing_started, 0),
        processing_success: B.reduce((M, L) => M + L.processing_success, 0),
        notification_sent: B.reduce((M, L) => M + L.notification_sent, 0),
        notification_failed: B.reduce((M, L) => M + L.notification_failed, 0),
        dq_phone: B.reduce((M, L) => M + L.dq_error_phone_not_found, 0),
        dq_flight: B.reduce((M, L) => M + L.dq_error_flight_not_found, 0),
        dq_booking: B.reduce((M, L) => M + L.dq_error_booking_not_found, 0),
        dq_other: B.reduce((M, L) => M + L.dq_error_other, 0),
        totalDqErrors: B.reduce((M, L) => M + L.dq_error_phone_not_found + L.dq_error_flight_not_found + L.dq_error_booking_not_found + L.dq_error_other, 0)
      };
    }), f = D(() => c.value.row_count_total || u.value.processing_started), g = D(() => Math.max(0, f.value - u.value.notification_sent)), p = (B, M) => M ? `${Math.round(B / M * 100)}%` : "0%", h = D(() => {
      const B = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, L) => L.count - M.count);
      return B.length > 0 ? B[0] : { reason: "None", count: 0 };
    }), m = at(!1), y = D(() => {
      const B = f.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: B > 0 ? Math.round(M.count / B * 100) : 0
      }));
    }), _ = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], $ = D(() => m.value ? y.value : y.value.slice(0, wn)), A = D(() => y.value.length > wn), T = D(
      () => Math.max(0, y.value.length - wn)
    ), w = D(
      () => $.value.map((B) => ({
        id: B.reason,
        reason: B.reason,
        count: B.count,
        impactPct: B.impactPct
      }))
    ), x = D(() => {
      const B = f.value, M = u.value.processing_success, L = Math.max(0, M - u.value.totalDqErrors), E = u.value.notification_sent, H = Math.max(0, B - M), K = u.value.totalDqErrors, X = Math.max(0, L - E), j = (z, N) => {
        const G = N > 0 ? Math.round(z / N * 100) : 0;
        return `${z.toLocaleString()} (${G}%)`;
      }, I = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], R = [];
      return M > 0 && R.push({ source: "Records Detected", target: "Valid Reservations", value: M, label: j(M, B) }), H > 0 && R.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: H, label: j(H, B) }), L > 0 && R.push({ source: "Valid Reservations", target: "Contactable", value: L, label: j(L, B) }), K > 0 && R.push({ source: "Valid Reservations", target: "Data Quality Issues", value: K, label: j(K, B) }), E > 0 && R.push({ source: "Contactable", target: "Notified", value: E, label: j(E, B) }), X > 0 && R.push({ source: "Contactable", target: "Not Delivered", value: X, label: j(X, B) }), { nodes: I, links: R };
    }), k = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, S = D(() => {
      const B = [...n.data?.processingCounts?.items || []].sort(
        (j, I) => new Date(j.date).getTime() - new Date(I.date).getTime()
      ), M = n.data?.documentCounts?.items || [], L = {};
      for (const j of M)
        L[j.date] = (L[j.date] || 0) + j.row_count_total;
      const E = [.../* @__PURE__ */ new Set([...B.map((j) => j.date), ...M.map((j) => j.date)])].sort(), H = E.map((j) => Bt(j).format("MMM DD")), K = E.map((j) => {
        const I = B.find((N) => N.date === j), R = I?.notification_sent || 0, z = L[j] || I?.processing_started || 0;
        return z > 0 ? Math.round(R / z * 100) : 0;
      }), X = E.map((j) => B.find((R) => R.date === j)?.notification_sent || 0);
      return {
        labels: H,
        datasets: [
          {
            label: "Success Rate (%)",
            data: K,
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            borderWidth: 2.5,
            fill: !0,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#8b5cf6",
            pointBorderColor: "#7c3aed",
            pointBorderWidth: 2,
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: X,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.08)",
            borderWidth: 1.5,
            borderDash: [4, 4],
            fill: !1,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#059669",
            pointBorderWidth: 2,
            yAxisID: "y1"
          }
        ]
      };
    }), F = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: { mode: "index", intersect: !1 },
      plugins: {
        legend: { display: !0, position: "top", labels: { usePointStyle: !0, padding: 16, font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary } },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198,125,255,0.2)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (B) => B.datasetIndex === 0 ? ` Success Rate: ${B.raw}%` : ` Notifications: ${B.raw}`
          }
        }
      },
      scales: {
        x: { display: !0, grid: { display: !1 }, ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary } },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          max: 100,
          grid: { color: r.value.gridLines },
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (B) => B + "%" },
          title: { display: !0, text: "Success Rate", font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          beginAtZero: !0,
          grid: { drawOnChartArea: !1 },
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary },
          title: { display: !0, text: "Volume", font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary }
        }
      }
    }));
    return t({ isDark: i }), (B, M) => (v(), b("details", R_, [
      d("summary", I_, [
        d("div", E_, [
          M[2] || (M[2] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Disruption Notifier"),
            d("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          n.loading ? V("", !0) : (v(), b("div", O_, [
            M[1] || (M[1] = d("p", { class: "badge-label" }, "Total Records", -1)),
            d("p", V_, C(P(Z)(c.value.row_count_total)), 1)
          ]))
        ]),
        M[3] || (M[3] = d("svg", {
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
      n.loading ? (v(), b("div", z_, [...M[4] || (M[4] = [
        nt('<div class="loading-container" data-v-01c3ba9c><div class="chart-bars-loader" data-v-01c3ba9c><div class="bar bar-1" data-v-01c3ba9c></div><div class="bar bar-2" data-v-01c3ba9c></div><div class="bar bar-3" data-v-01c3ba9c></div><div class="bar bar-4" data-v-01c3ba9c></div><div class="bar bar-5" data-v-01c3ba9c></div></div><p class="loading-text" data-v-01c3ba9c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (v(), b("div", N_, [
        l.value ? (v(), b(Q, { key: 0 }, [
          d("div", W_, [
            d("div", H_, [
              M[5] || (M[5] = d("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              d("span", j_, C(P(Z)(f.value)), 1)
            ]),
            d("div", Y_, [
              M[6] || (M[6] = d("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              d("span", q_, C(P(Z)(u.value.notification_sent)), 1),
              d("span", K_, C(p(u.value.notification_sent, f.value)), 1)
            ]),
            d("div", U_, [
              M[7] || (M[7] = d("span", { class: "kpi-label" }, "Not Notified", -1)),
              d("span", X_, C(P(Z)(g.value)), 1),
              d("span", G_, C(p(g.value, f.value)), 1)
            ]),
            d("div", Z_, [
              M[8] || (M[8] = d("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              d("span", Q_, C(h.value.reason), 1),
              d("span", J_, C(P(Z)(h.value.count)) + " cases", 1)
            ])
          ]),
          d("section", t2, [
            M[10] || (M[10] = d("div", { class: "chart-header" }, [
              d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            d("div", e2, [
              x.value.nodes.length > 0 && x.value.links.length > 0 ? (v(), ft(we, {
                key: 0,
                data: x.value,
                "node-colors": k,
                height: "350px"
              }, null, 8, ["data"])) : (v(), b("div", a2, [...M[9] || (M[9] = [
                d("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          y.value.length > 0 ? (v(), b("section", n2, [
            M[12] || (M[12] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            d("div", s2, [
              U(jt, {
                columns: _,
                rows: w.value,
                "row-key": "id"
              }, {
                "cell-reason": Y(({ row: L }) => [
                  d("span", o2, C(L.reason), 1)
                ]),
                "cell-count": Y(({ row: L }) => [
                  d("span", i2, C(P(Z)(L.count)), 1)
                ]),
                "cell-impact": Y(({ row: L }) => [
                  d("div", r2, [
                    d("div", {
                      class: "impact-bar",
                      style: vt({ width: L.impactPct + "%" })
                    }, null, 4),
                    d("span", l2, C(L.impactPct) + "%", 1)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ]),
            A.value ? (v(), b("button", {
              key: 0,
              type: "button",
              class: "view-more-btn",
              onClick: M[0] || (M[0] = (L) => m.value = !m.value)
            }, [
              wt(C(m.value ? "View less" : `View more (${T.value} rows)`) + " ", 1),
              (v(), b("svg", {
                class: q(["view-more-icon", { "view-more-icon-rotated": m.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...M[11] || (M[11] = [
                d("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : V("", !0)
          ])) : V("", !0),
          S.value.labels.length > 0 ? (v(), b("section", c2, [
            M[13] || (M[13] = d("div", { class: "chart-header" }, [
              d("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            d("div", d2, [
              U(ke, {
                data: S.value,
                options: F.value
              }, null, 8, ["data", "options"])
            ])
          ])) : V("", !0),
          d("details", u2, [
            M[20] || (M[20] = d("summary", { class: "system-health-toggle" }, [
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
              wt(" System Health Details ")
            ], -1)),
            d("div", h2, [
              d("div", f2, [
                d("div", g2, [
                  M[14] || (M[14] = d("span", { class: "sys-label" }, "Docs Started", -1)),
                  d("span", p2, C(P(Z)(c.value.processing_started)), 1)
                ]),
                d("div", v2, [
                  M[15] || (M[15] = d("span", { class: "sys-label" }, "Docs Completed", -1)),
                  d("span", m2, C(P(Z)(c.value.processing_completed)), 1)
                ]),
                d("div", b2, [
                  M[16] || (M[16] = d("span", { class: "sys-label" }, "Docs Failed", -1)),
                  d("span", y2, C(P(Z)(c.value.processing_failed)), 1)
                ]),
                d("div", _2, [
                  M[17] || (M[17] = d("span", { class: "sys-label" }, "Processing Started", -1)),
                  d("span", x2, C(P(Z)(u.value.processing_started)), 1)
                ]),
                d("div", k2, [
                  M[18] || (M[18] = d("span", { class: "sys-label" }, "Processing Success", -1)),
                  d("span", w2, C(P(Z)(u.value.processing_success)), 1)
                ]),
                d("div", $2, [
                  M[19] || (M[19] = d("span", { class: "sys-label" }, "Notification Failed", -1)),
                  d("span", C2, C(P(Z)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ], 64)) : (v(), b("section", M2, [...M[21] || (M[21] = [
          nt('<div class="empty-state-content" data-v-01c3ba9c><div class="empty-icon-wrapper" data-v-01c3ba9c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-01c3ba9c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-01c3ba9c></path></svg></div><p class="empty-title" data-v-01c3ba9c>No disruption notifier data</p><p class="empty-description" data-v-01c3ba9c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), D2 = /* @__PURE__ */ it(S2, [["__scopeId", "data-v-01c3ba9c"]]), A2 = { class: "card-header" }, T2 = {
  key: 0,
  class: "loading-state"
}, B2 = {
  key: 1,
  class: "card-body"
}, L2 = { class: "metric-value" }, F2 = /* @__PURE__ */ et({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = ht(ut(a, "theme")), s = D(() => Z(a.totalConversations)), o = D(
      () => a.previousTotalConversations !== null && a.previousTotalConversations !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = a.previousTotalConversations;
      return c === 0 ? a.totalConversations > 0 ? 100 : 0 : (a.totalConversations - c) / c * 100;
    }), r = D(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, u) => (v(), b("article", {
      class: q(["highlight-card", { "highlight-card--dark": P(n) }])
    }, [
      d("header", A2, [
        u[0] || (u[0] = d("div", { class: "icon-wrapper" }, [
          d("svg", {
            class: "card-icon",
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
          ])
        ], -1)),
        !e.loading && o.value ? (v(), b("div", {
          key: 0,
          class: q(["change-badge", l.value])
        }, C(r.value), 3)) : V("", !0)
      ]),
      e.loading ? (v(), b("div", T2, [...u[1] || (u[1] = [
        d("div", { class: "shimmer shimmer-value" }, null, -1),
        d("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (v(), b("div", B2, [
        d("span", L2, C(s.value), 1),
        u[2] || (u[2] = d("span", { class: "metric-label" }, "Total Conversations", -1))
      ]))
    ], 2));
  }
}), P2 = /* @__PURE__ */ it(F2, [["__scopeId", "data-v-cd9dd1ba"]]), R2 = { class: "metric-collapsible__summary csat-collapsible-summary" }, I2 = { class: "csat-collapsible-summary__main" }, E2 = { class: "csat-collapsible-value" }, O2 = {
  key: 1,
  class: "csat-collapsible-loading"
}, V2 = { class: "csat-collapsible-panel" }, z2 = { class: "card-header" }, N2 = {
  key: 0,
  class: "loading-state"
}, W2 = {
  key: 1,
  class: "card-body"
}, H2 = { class: "metric-value" }, j2 = /* @__PURE__ */ et({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = ht(ut(a, "theme")), s = D(() => `${a.csatP95.toFixed(1)}`), o = D(
      () => a.previousCsatP95 !== null && a.previousCsatP95 !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = a.previousCsatP95;
      return c === 0 ? a.csatP95 > 0 ? 100 : 0 : (a.csatP95 - c) / c * 100;
    }), r = D(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, u) => (v(), b("details", {
      class: q(["highlight-card", "metric-collapsible", { "highlight-card--dark": P(n) }])
    }, [
      d("summary", R2, [
        d("div", I2, [
          u[1] || (u[1] = d("span", { class: "csat-collapsible-title" }, "CSAT Metrics", -1)),
          e.loading ? (v(), b("span", O2, "Loading…")) : (v(), b(Q, { key: 0 }, [
            d("span", E2, C(s.value), 1),
            u[0] || (u[0] = d("span", { class: "csat-collapsible-label" }, "CSAT P95", -1))
          ], 64))
        ]),
        u[2] || (u[2] = d("svg", {
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
      d("div", V2, [
        d("header", z2, [
          u[3] || (u[3] = d("div", { class: "icon-wrapper" }, [
            d("svg", {
              class: "card-icon",
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
            ])
          ], -1)),
          !e.loading && o.value ? (v(), b("div", {
            key: 0,
            class: q(["change-badge", l.value])
          }, C(r.value), 3)) : V("", !0)
        ]),
        e.loading ? (v(), b("div", N2, [...u[4] || (u[4] = [
          d("div", { class: "shimmer shimmer-value" }, null, -1),
          d("div", { class: "shimmer shimmer-label" }, null, -1)
        ])])) : (v(), b("div", W2, [
          d("span", H2, C(s.value), 1),
          u[5] || (u[5] = d("span", { class: "metric-label" }, "CSAT P95", -1))
        ]))
      ])
    ], 2));
  }
}), Y2 = /* @__PURE__ */ it(j2, [["__scopeId", "data-v-7d329eb1"]]), q2 = { class: "nps-overview-card" }, K2 = { class: "card-header" }, U2 = { class: "header-content" }, X2 = { class: "header-badges" }, G2 = {
  key: 0,
  class: "stats-badge"
}, Z2 = { class: "badge-value" }, Q2 = {
  key: 1,
  class: "stats-badge"
}, J2 = { class: "badge-value" }, tx = {
  key: 0,
  class: "loading-state"
}, ex = {
  key: 1,
  class: "card-body"
}, ax = { class: "chart-wrapper" }, nx = {
  key: 2,
  class: "empty-state"
}, sx = 500, ox = 60, ix = 80, rx = {
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
    const n = a, s = (c) => {
      n("export", c);
    }, o = e, { isDark: i } = ht(ut(o, "theme")), r = D(() => o.data), l = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (c, u) => (v(), b("article", q2, [
      d("header", K2, [
        d("div", U2, [
          u[2] || (u[2] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            d("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          d("div", X2, [
            r.value && r.value.total_nps_responses > 0 ? (v(), b("div", G2, [
              u[0] || (u[0] = d("p", { class: "badge-label" }, "Responses", -1)),
              d("p", Z2, C(r.value.total_nps_responses), 1)
            ])) : V("", !0),
            r.value && r.value.p95_score > 0 ? (v(), b("div", Q2, [
              u[1] || (u[1] = d("p", { class: "badge-label" }, "Percentile 95", -1)),
              d("p", J2, C(r.value.p95_score || 0), 1)
            ])) : V("", !0)
          ])
        ])
      ]),
      o.loading ? (v(), b("div", tx, [...u[3] || (u[3] = [
        nt('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (v(), b("div", ex, [
        d("div", ax, [
          U(Wi, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": sx,
            "chart-margin": ox,
            "chart-bottom-margin": ix
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (v(), ft(P(Mt), {
          key: 0,
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ])) : (v(), b("div", nx, [...u[4] || (u[4] = [
        nt('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Zi = /* @__PURE__ */ it(rx, [["__scopeId", "data-v-30fe5f88"]]), lx = { class: "nps-daily-card" }, cx = { class: "card-header" }, dx = { class: "header-content" }, ux = {
  key: 0,
  class: "stats-badge"
}, hx = { class: "badge-value" }, fx = {
  key: 0,
  class: "loading-state"
}, gx = {
  key: 1,
  class: "card-body"
}, px = { class: "tooltip-content" }, vx = { class: "tooltip-title" }, mx = { class: "tooltip-stats" }, bx = { class: "tooltip-stat-row" }, yx = { class: "tooltip-value" }, _x = { class: "tooltip-stat-row" }, xx = { class: "tooltip-value" }, kx = { class: "tooltip-stat-row" }, wx = { class: "tooltip-value" }, $x = { class: "tooltip-stat-row" }, Cx = { class: "tooltip-value" }, Mx = { class: "tooltip-stat-row" }, Sx = { class: "tooltip-value" }, Dx = { class: "tooltip-stat-row" }, Ax = { class: "tooltip-value" }, Tx = {
  key: 2,
  class: "empty-state"
}, Lo = 400, Qe = 60, Fo = 90, Po = 120, Bx = {
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
  setup(e, { expose: t, emit: a }) {
    const n = a, s = (y) => {
      n("export", y);
    }, o = e, { isDark: i } = ht(ut(o, "theme")), r = D(() => o.data), l = at(null), c = at({
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
      if (!r.value || !r.value.nps_by_day) return 800;
      const y = r.value.nps_by_day.length;
      return Math.max(800, Qe * 2 + y * Po);
    }), f = (y, _) => {
      const A = (y - 1) / 9;
      return Qe + _ - A * _;
    }, g = (y) => y ? Bt(y).format("DD-MM-YYYY") : "", p = D(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const y = [], _ = Lo - Qe - Fo;
      return r.value.nps_by_day.forEach(($, A) => {
        const T = $.min_score || 0, w = $.q1_score || 0, x = $.median_score || 0, k = $.q3_score || 0, S = $.max_score || 0, F = $.average_score || 0;
        y.push({
          label: g($.date),
          responseCount: $.nps_responses_count || 0,
          isTotal: !1,
          low: T,
          q1: w,
          median: x,
          q3: k,
          high: S,
          average: F,
          highY: f(S, _),
          lowY: f(T, _),
          q1Y: f(w, _),
          q3Y: f(k, _),
          medianY: f(x, _),
          averageY: F > 0 ? f(F, _) : null,
          centerX: Qe + (A + 1) * Po
        });
      }), y;
    }), h = (y, _) => {
      if (!l.value || !_ || _.horizontal) return;
      const $ = l.value.getBoundingClientRect(), A = y.clientX, T = y.clientY, w = 140, x = 160, k = 10, S = 15;
      let F = A - $.left - w / 2, B = T - $.top - x - S;
      F = Math.max(k, Math.min(F, $.width - w - k)), B < k && (B = T - $.top + S), B = Math.max(k, Math.min(B, $.height - x - k)), c.value = {
        visible: !0,
        x: F,
        y: B,
        date: _.label || "",
        min: _.low !== void 0 ? _.low.toFixed(1) : "N/A",
        max: _.high !== void 0 ? _.high.toFixed(1) : "N/A",
        q1: _.open !== void 0 ? _.open.toFixed(1) : "N/A",
        avg: _.average !== void 0 && _.average > 0 ? _.average.toFixed(1) : "N/A",
        q3: _.close !== void 0 ? _.close.toFixed(1) : "N/A",
        median: _.median !== void 0 ? _.median.toFixed(1) : "N/A"
      };
    }, m = () => {
      c.value.visible = !1;
    };
    return t({ isDark: i }), (y, _) => (v(), b("article", lx, [
      d("header", cx, [
        d("div", dx, [
          _[1] || (_[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            d("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (v(), b("div", ux, [
            _[0] || (_[0] = d("p", { class: "badge-label" }, "Days", -1)),
            d("p", hx, C(r.value.nps_by_day.length), 1)
          ])) : V("", !0)
        ])
      ]),
      o.loading ? (v(), b("div", fx, [..._[2] || (_[2] = [
        nt('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (v(), b("div", gx, [
        d("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          p.value && p.value.length > 0 ? (v(), ft(Ni, {
            key: 0,
            "candlestick-data": p.value,
            "chart-width": u.value,
            "chart-height": Lo,
            "chart-margin": Qe,
            "chart-bottom-margin": Fo,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: h,
            onCandleLeave: m
          }, null, 8, ["candlestick-data", "chart-width"])) : V("", !0),
          c.value.visible ? (v(), b("div", {
            key: 1,
            class: "tooltip-overlay",
            style: vt({
              left: `${c.value.x}px`,
              top: `${c.value.y}px`
            })
          }, [
            d("div", px, [
              d("div", vx, C(c.value.date), 1),
              _[9] || (_[9] = d("div", { class: "tooltip-divider" }, null, -1)),
              d("div", mx, [
                d("div", bx, [
                  _[3] || (_[3] = d("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  d("span", yx, C(c.value.min), 1)
                ]),
                d("div", _x, [
                  _[4] || (_[4] = d("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  d("span", xx, C(c.value.q1), 1)
                ]),
                d("div", kx, [
                  _[5] || (_[5] = d("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  d("span", wx, C(c.value.median), 1)
                ]),
                d("div", $x, [
                  _[6] || (_[6] = d("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  d("span", Cx, C(c.value.avg), 1)
                ]),
                d("div", Mx, [
                  _[7] || (_[7] = d("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  d("span", Sx, C(c.value.q3), 1)
                ]),
                d("div", Dx, [
                  _[8] || (_[8] = d("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  d("span", Ax, C(c.value.max), 1)
                ])
              ])
            ])
          ], 4)) : V("", !0)
        ], 512),
        e.enableExport ? (v(), ft(P(Mt), {
          key: 0,
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ])) : (v(), b("div", Tx, [..._[10] || (_[10] = [
        nt('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Qi = /* @__PURE__ */ it(Bx, [["__scopeId", "data-v-b20112a7"]]), Lx = { class: "nps-metrics-container" }, Fx = {
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
    const a = t, n = (s) => {
      a("export", s);
    };
    return (s, o) => (v(), b("div", Lx, [
      U(Zi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"]),
      U(Qi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Ji = /* @__PURE__ */ it(Fx, [["__scopeId", "data-v-25fe3b80"]]), Px = ["open"], Rx = { class: "csat-container__body" }, Ix = /* @__PURE__ */ et({
  __name: "CSATContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    data: { default: void 0 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = t;
    function n(s) {
      a("export", { source: "npsMetrics", format: s });
    }
    return (s, o) => (v(), b("details", {
      class: "csat-container-card metric-collapsible",
      open: e.containerInitiallyOpen
    }, [
      o[0] || (o[0] = nt('<summary class="card-header metric-collapsible__summary csat-container__summary" data-v-7a1e42dd><div class="header-content" data-v-7a1e42dd><h2 class="card-title font-sans" data-v-7a1e42dd>CSAT</h2><p class="card-subtitle font-sans" data-v-7a1e42dd> Customer satisfaction score distribution and daily trend metrics. </p></div><svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-7a1e42dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-7a1e42dd></path></svg></summary>', 1)),
      d("div", Rx, [
        U(Ji, {
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ])
    ], 8, Px));
  }
}), Ex = /* @__PURE__ */ it(Ix, [["__scopeId", "data-v-7a1e42dd"]]), Ox = { class: "card-header" }, Vx = {
  key: 0,
  class: "loading-state"
}, zx = {
  key: 1,
  class: "card-body"
}, Nx = { class: "metric-value" }, Wx = /* @__PURE__ */ et({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = ht(ut(a, "theme")), s = D(() => `${a.currencyCode} ${te(a.totalRevenue)}`), o = D(
      () => a.previousTotalRevenue !== null && a.previousTotalRevenue !== void 0
    ), i = D(() => {
      if (!o.value) return 0;
      const c = a.previousTotalRevenue;
      return c === 0 ? a.totalRevenue > 0 ? 100 : 0 : (a.totalRevenue - c) / c * 100;
    }), r = D(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, u) => (v(), b("article", {
      class: q(["highlight-card", { "highlight-card--dark": P(n) }])
    }, [
      d("header", Ox, [
        u[0] || (u[0] = d("div", { class: "icon-wrapper" }, [
          d("svg", {
            class: "card-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M9.813 15.904L9 18.75l-2.407-1.204a5.97 5.97 0 01-1.593-.98l-3.5-2.625a2.25 2.25 0 010-3.602l3.5-2.625a5.97 5.97 0 011.593-.98L9 5.25l.813 2.846a2.25 2.25 0 001.341 1.457l2.846.813-2.846.813a2.25 2.25 0 00-1.341 1.457zM15.75 5.25l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975l-.537 1.879-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975l.537-1.879zM18 12.75l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975L18 19.53l-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975L18 12.75z"
            })
          ])
        ], -1)),
        !e.loading && o.value ? (v(), b("div", {
          key: 0,
          class: q(["change-badge", l.value])
        }, C(r.value), 3)) : V("", !0)
      ]),
      e.loading ? (v(), b("div", Vx, [...u[1] || (u[1] = [
        d("div", { class: "shimmer shimmer-value" }, null, -1),
        d("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (v(), b("div", zx, [
        d("span", Nx, C(s.value), 1),
        u[2] || (u[2] = d("span", { class: "metric-label" }, "AI-Generated Revenue", -1))
      ]))
    ], 2));
  }
}), Hx = /* @__PURE__ */ it(Wx, [["__scopeId", "data-v-a642a31c"]]), jx = { class: "aws-cost-card" }, Yx = { class: "card-header" }, qx = { class: "header-main" }, Kx = { class: "header-content" }, Ux = { class: "card-title" }, Xx = { class: "header-stats" }, Gx = { class: "stat-badge primary" }, Zx = { class: "stat-value" }, Qx = { class: "stat-badge secondary" }, Jx = { class: "stat-value" }, tk = { class: "card-body" }, ek = {
  key: 0,
  class: "loading-state"
}, ak = {
  key: 1,
  class: "chart-section"
}, nk = { class: "chart-container" }, sk = {
  key: 2,
  class: "empty-state"
}, ok = { class: "empty-state-content" }, ik = { class: "empty-icon-wrapper" }, rk = {
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
    const t = e, { isDark: a, colors: n } = ht(ut(t, "theme")), s = D(() => {
      const r = t.data ?? {}, l = r.daily, c = r.days, u = Array.isArray(l) && l.length > 0, f = Array.isArray(c) && c.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === c.length;
      let g = [];
      return u ? g = l : f && (g = c.map((p, h) => ({
        date: p,
        allocated_cost: r.allocatedCostSeries[h] ?? 0,
        aws_cost: r.awsCostSeries[h] ?? 0,
        airline_conversations: r.airlineConversationsSeries[h] ?? 0
      }))), {
        daily: g,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), o = D(() => {
      const r = s.value.daily;
      return {
        labels: r.map((c) => c.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((c) => c.allocated_cost),
            borderColor: n.value.primaryLight,
            backgroundColor: a.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !0,
            yAxisID: "y"
          },
          {
            label: "AWS Cost",
            data: r.map((c) => c.aws_cost),
            borderColor: "#FF9900",
            // Amazon Orange/Yellow
            backgroundColor: "transparent",
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.4,
            fill: !1,
            yAxisID: "y"
          },
          {
            label: "Airline Conv.",
            data: r.map((c) => c.airline_conversations),
            borderColor: n.value.info,
            backgroundColor: a.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      };
    }), i = D(() => ({
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
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 20,
            boxWidth: 8,
            boxHeight: 8,
            color: n.value.textSecondary,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11,
              weight: "600"
            }
          }
        },
        tooltip: {
          padding: 12,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: n.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0
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
            font: { family: "'DM Sans', sans-serif", size: 10 },
            callback: (r) => xt(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, l) => (v(), b("article", jx, [
      d("header", Yx, [
        d("div", qx, [
          d("div", Kx, [
            d("h3", Ux, C(s.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = d("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          d("div", Xx, [
            d("div", Gx, [
              l[1] || (l[1] = d("span", { class: "stat-label" }, "Total Allocated", -1)),
              d("span", Zx, C(P(xt)(s.value.total_allocated_cost)), 1)
            ]),
            d("div", Qx, [
              l[2] || (l[2] = d("span", { class: "stat-label" }, "Total AWS", -1)),
              d("span", Jx, C(P(xt)(s.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      d("div", tk, [
        e.loading ? (v(), b("div", ek, [...l[3] || (l[3] = [
          nt('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : s.value.daily.length > 0 ? (v(), b("div", ak, [
          d("div", nk, [
            U(ke, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (v(), b("section", sk, [
          d("div", ok, [
            d("div", ik, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = d("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = d("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, lk = /* @__PURE__ */ it(rk, [["__scopeId", "data-v-c023bd59"]]), ck = { class: "cost-usage-card" }, dk = {
  key: 0,
  class: "card-body"
}, uk = {
  key: 0,
  class: "chart-section"
}, hk = { class: "chart-container" }, fk = { class: "kpi-grid" }, gk = { class: "kpi-card" }, pk = { class: "kpi-value" }, vk = { class: "kpi-card" }, mk = { class: "kpi-value" }, bk = { class: "kpi-card" }, yk = { class: "kpi-value" }, _k = { class: "kpi-card" }, xk = { class: "kpi-value" }, kk = { class: "kpi-card" }, wk = { class: "kpi-value" }, $k = { class: "kpi-card highlighted" }, Ck = { class: "kpi-value gradient-text" }, Mk = {
  key: 1,
  class: "empty-state"
}, Sk = { class: "empty-state-content" }, Dk = { class: "empty-icon-wrapper" }, Ak = {
  key: 1,
  class: "loading-state"
}, Tk = /* @__PURE__ */ et({
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
    const n = e, { isDark: s, colors: o } = ht(ut(n, "theme")), i = (h) => {
      const m = new Date(h), y = String(m.getDate()).padStart(2, "0"), _ = String(m.getMonth() + 1).padStart(2, "0");
      return `${y}-${_}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((m, y) => m + (y.input_cost || 0), 0);
    }), c = D(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((m, y) => m + (y.output_cost || 0), 0);
    }), u = D(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((m, y) => m + (y.cache_read_cost || 0), 0);
    }), f = D(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((m, y) => m + (y.cache_write_cost || 0), 0);
    }), g = D(() => {
      const h = n.data?.costs_by_day || {}, m = Object.keys(h).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const y = m.map(($) => i($)), _ = [
        {
          label: "Input Cost",
          data: m.map(($) => h[$]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: m.map(($) => h[$]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: m.map(($) => h[$]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: m.map(($) => h[$]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: _
      };
    }), p = D(() => n.options ? n.options : {
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
            pointStyle: "rectRounded"
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
            label: function(h) {
              let m = h.dataset.label || "";
              return m && (m += ": "), h.parsed.y !== null && (m += xt(h.parsed.y)), m;
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
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
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
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(h) {
              return xt(h);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (h, m) => (v(), b("article", ck, [
      m[9] || (m[9] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Cost Usage"),
          d("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (v(), b("div", Ak, [...m[8] || (m[8] = [
        nt('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", dk, [
        g.value.labels && g.value.labels.length ? (v(), b("section", uk, [
          d("div", hk, [
            U(de, {
              data: g.value,
              options: p.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          d("footer", fk, [
            d("div", gk, [
              m[0] || (m[0] = d("span", { class: "kpi-label" }, "Total Cost", -1)),
              d("span", pk, C(P(xt)(e.data.total_cost)), 1)
            ]),
            d("div", vk, [
              m[1] || (m[1] = d("span", { class: "kpi-label" }, "Input Cost", -1)),
              d("span", mk, C(P(xt)(l.value)), 1)
            ]),
            d("div", bk, [
              m[2] || (m[2] = d("span", { class: "kpi-label" }, "Output Cost", -1)),
              d("span", yk, C(P(xt)(c.value)), 1)
            ]),
            d("div", _k, [
              m[3] || (m[3] = d("span", { class: "kpi-label" }, "Cache Read", -1)),
              d("span", xk, C(P(xt)(u.value)), 1)
            ]),
            d("div", kk, [
              m[4] || (m[4] = d("span", { class: "kpi-label" }, "Cache Write", -1)),
              d("span", wk, C(P(xt)(f.value)), 1)
            ]),
            d("div", $k, [
              m[5] || (m[5] = d("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              d("span", Ck, C(P(xt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (v(), b("section", Mk, [
          d("div", Sk, [
            d("div", Dk, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            m[6] || (m[6] = d("p", { class: "empty-title" }, "No cost usage data", -1)),
            m[7] || (m[7] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Bk = /* @__PURE__ */ it(Tk, [["__scopeId", "data-v-62f96954"]]), Lk = { class: "token-usage-card" }, Fk = {
  key: 0,
  class: "card-body"
}, Pk = {
  key: 0,
  class: "chart-section"
}, Rk = { class: "chart-container" }, Ik = { class: "kpi-grid" }, Ek = { class: "kpi-card" }, Ok = { class: "kpi-value" }, Vk = { class: "kpi-card" }, zk = { class: "kpi-value" }, Nk = { class: "kpi-card" }, Wk = { class: "kpi-value" }, Hk = { class: "kpi-card" }, jk = { class: "kpi-value" }, Yk = { class: "kpi-card" }, qk = { class: "kpi-value" }, Kk = {
  key: 1,
  class: "empty-state"
}, Uk = { class: "empty-state-content" }, Xk = { class: "empty-icon-wrapper" }, Gk = {
  key: 1,
  class: "loading-state"
}, Zk = /* @__PURE__ */ et({
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
    const n = e, { isDark: s, colors: o } = ht(ut(n, "theme")), i = (u) => {
      const f = new Date(u), g = String(f.getDate()).padStart(2, "0"), p = String(f.getMonth() + 1).padStart(2, "0");
      return `${g}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const u = n.data?.tokens_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.map((h) => i(h)), p = [
        {
          label: "Input Tokens",
          data: f.map((h) => u[h]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: f.map((h) => u[h]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: f.map((h) => u[h]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: f.map((h) => u[h]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: g,
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
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
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
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
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
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (u, f) => (v(), b("article", Lk, [
      f[8] || (f[8] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Token Usage"),
          d("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (v(), b("div", Gk, [...f[7] || (f[7] = [
        nt('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", Fk, [
        l.value.labels && l.value.labels.length ? (v(), b("section", Pk, [
          d("div", Rk, [
            U(de, {
              data: l.value,
              options: c.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          d("footer", Ik, [
            d("div", Ek, [
              f[0] || (f[0] = d("span", { class: "kpi-label" }, "Total Tokens", -1)),
              d("span", Ok, C(P(Z)(e.data.total_tokens)), 1)
            ]),
            d("div", Vk, [
              f[1] || (f[1] = d("span", { class: "kpi-label" }, "Input", -1)),
              d("span", zk, C(P(Z)(e.data.total_input_tokens)), 1)
            ]),
            d("div", Nk, [
              f[2] || (f[2] = d("span", { class: "kpi-label" }, "Output", -1)),
              d("span", Wk, C(P(Z)(e.data.total_output_tokens)), 1)
            ]),
            d("div", Hk, [
              f[3] || (f[3] = d("span", { class: "kpi-label" }, "Cache Read", -1)),
              d("span", jk, C(P(Z)(e.data.total_cache_read_tokens)), 1)
            ]),
            d("div", Yk, [
              f[4] || (f[4] = d("span", { class: "kpi-label" }, "Cache Write", -1)),
              d("span", qk, C(P(Z)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (v(), b("section", Kk, [
          d("div", Uk, [
            d("div", Xk, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            f[5] || (f[5] = d("p", { class: "empty-title" }, "No token usage data", -1)),
            f[6] || (f[6] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Qk = /* @__PURE__ */ it(Zk, [["__scopeId", "data-v-e9e355be"]]), Jk = { class: "conversation-count-card" }, t5 = { class: "card-header" }, e5 = { class: "header-right" }, a5 = { class: "stat-badge" }, n5 = { class: "stat-value" }, s5 = {
  key: 0,
  class: "card-body"
}, o5 = {
  key: 0,
  class: "chart-section"
}, i5 = { class: "chart-container" }, r5 = {
  key: 1,
  class: "empty-state"
}, l5 = { class: "empty-state-content" }, c5 = { class: "empty-icon-wrapper" }, d5 = {
  key: 1,
  class: "loading-state"
}, u5 = /* @__PURE__ */ et({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: s } = ht(ut(a, "theme")), o = (l) => {
      const c = new Date(l), u = String(c.getDate()).padStart(2, "0");
      return `${String(c.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    D(() => {
      if (a.data?.start_date && a.data?.end_date) {
        const l = o(a.data.start_date), c = o(a.data.end_date);
        return `${l} - ${c}`;
      }
      return "N/A";
    });
    const i = D(() => {
      const l = a.data?.conversations_by_day || {}, c = Object.keys(l).sort();
      if (c.length === 0)
        return { labels: [], datasets: [] };
      const u = c.map((g) => o(g)), f = [
        {
          label: "Conversations",
          data: c.map((g) => l[g] || 0),
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
        labels: u,
        datasets: f
      };
    }), r = D(() => a.options ? a.options : {
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
            label: function(l) {
              let c = l.dataset.label || "";
              return c && (c += ": "), l.parsed.y !== null && (c += l.parsed.y), c;
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
    return t({ isDark: n }), (l, c) => (v(), b("article", Jk, [
      d("header", t5, [
        c[1] || (c[1] = d("div", { class: "header-left" }, [
          d("div", { class: "header-content" }, [
            d("h3", { class: "card-title" }, "Conversation Count"),
            d("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        d("div", e5, [
          d("div", a5, [
            c[0] || (c[0] = d("span", { class: "stat-label" }, "Total", -1)),
            d("span", n5, C(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (v(), b("div", d5, [...c[4] || (c[4] = [
        nt('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", s5, [
        i.value.labels && i.value.labels.length ? (v(), b("section", o5, [
          d("div", i5, [
            U(ke, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (v(), b("section", r5, [
          d("div", l5, [
            d("div", c5, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            c[2] || (c[2] = d("p", { class: "empty-title" }, "No conversation count data", -1)),
            c[3] || (c[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), h5 = /* @__PURE__ */ it(u5, [["__scopeId", "data-v-846f24b1"]]), f5 = { class: "top-agents-card" }, g5 = {
  key: 0,
  class: "card-body"
}, p5 = {
  key: 0,
  class: "charts-grid"
}, v5 = { class: "chart-section" }, m5 = { class: "chart-container" }, b5 = { class: "chart-section" }, y5 = { class: "chart-container" }, _5 = {
  key: 1,
  class: "empty-state"
}, x5 = { class: "empty-state-content" }, k5 = { class: "empty-icon-wrapper" }, w5 = {
  key: 1,
  class: "loading-state"
}, $5 = /* @__PURE__ */ et({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: s } = ht(ut(a, "theme")), o = D(() => a.data?.top_agents && a.data.top_agents.length > 0), i = D(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, p) => (p.total_cost || 0) - (g.total_cost || 0)) : []), r = D(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, p) => (p.total_tokens || 0) - (g.total_tokens || 0)) : []), l = D(() => {
      const g = i.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((p) => p.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: g.map((p) => p.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = D(() => {
      const g = r.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((p) => p.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: g.map((p) => p.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = D(() => a.options ? a.options : {
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const p = g.label, h = a.data?.top_agents?.find((m) => m.agent_type === p);
              return h ? [
                `Total Cost: ${xt(h.total_cost)}`,
                `Input Cost: ${xt(h.total_input_tokens_cost)}`,
                `Output Cost: ${xt(h.total_output_tokens_cost)}`,
                `Cache Read: ${xt(h.total_read_tokens_cost)}`,
                `Cache Write: ${xt(h.total_write_tokens_cost)}`
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
              return xt(g);
            }
          }
        }
      }
    }), f = D(() => a.options ? a.options : {
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const p = g.label, h = a.data?.top_agents?.find((m) => m.agent_type === p);
              return h ? [
                `Total Tokens: ${h.total_tokens.toLocaleString()}`,
                `Input Tokens: ${h.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${h.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${h.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${h.total_write_tokens.toLocaleString()}`
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
    return t({ isDark: n }), (g, p) => (v(), b("article", f5, [
      p[5] || (p[5] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Top Agents Analysis"),
          d("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (v(), b("div", w5, [...p[4] || (p[4] = [
        nt('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", g5, [
        o.value ? (v(), b("div", p5, [
          d("section", v5, [
            p[0] || (p[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            d("div", m5, [
              U(de, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          d("section", b5, [
            p[1] || (p[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            d("div", y5, [
              U(de, {
                data: c.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (v(), b("section", _5, [
          d("div", x5, [
            d("div", k5, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            p[2] || (p[2] = d("p", { class: "empty-title" }, "No top agents data", -1)),
            p[3] || (p[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), C5 = /* @__PURE__ */ it($5, [["__scopeId", "data-v-78efa6dc"]]), M5 = { class: "top-agents-card" }, S5 = {
  key: 0,
  class: "card-body"
}, D5 = {
  key: 0,
  class: "chart-section"
}, A5 = { class: "chart-container" }, T5 = {
  key: 1,
  class: "empty-state"
}, B5 = { class: "empty-state-content" }, L5 = { class: "empty-icon-wrapper" }, F5 = {
  key: 1,
  class: "loading-state"
}, P5 = /* @__PURE__ */ et({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: s } = ht(ut(a, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = D(() => a.data?.top_agents ? a.data.top_agents.filter(
      (f) => f.agent_type?.toLowerCase() !== "triage"
    ) : []), r = D(() => i.value.length > 0), l = D(() => i.value.reduce((f, g) => f + (g.conversations || 0), 0)), c = D(() => {
      const f = i.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.map((m) => {
        const y = m.agent_type?.toLowerCase();
        return (o[y] || "#a78bfa") + "80";
      }), p = f.map((m) => {
        const y = m.agent_type?.toLowerCase();
        return o[y] || "#a78bfa";
      });
      return {
        labels: f.map((m) => {
          const y = m.conversations || 0, _ = l.value ? y / l.value * 100 : 0;
          return `${m.agent_type} - ${y.toLocaleString()} (${_.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((m) => m.conversations || 0),
            backgroundColor: g,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => a.options ? a.options : {
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
              const g = (f.label || "").toString(), p = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce((y, _) => y + (Number(_) || 0), 0), m = h ? p / h * 100 : 0;
              return `${g}: ${p.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, g) => (v(), b("article", M5, [
      g[3] || (g[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Top Agents"),
          d("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (v(), b("div", F5, [...g[2] || (g[2] = [
        nt('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", S5, [
        r.value ? (v(), b("section", D5, [
          d("div", A5, [
            U(Ga, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (v(), b("section", T5, [
          d("div", B5, [
            d("div", L5, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
            g[1] || (g[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), R5 = /* @__PURE__ */ it(P5, [["__scopeId", "data-v-05e3e74d"]]), I5 = { class: "daily-cost-trends-card" }, E5 = {
  key: 0,
  class: "card-body"
}, O5 = {
  key: 0,
  class: "chart-section"
}, V5 = { class: "chart-container" }, z5 = {
  key: 1,
  class: "empty-state"
}, N5 = { class: "empty-state-content" }, W5 = { class: "empty-icon-wrapper" }, H5 = {
  key: 1,
  class: "loading-state"
}, j5 = /* @__PURE__ */ et({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: s } = ht(ut(a, "theme")), o = (c) => {
      const u = new Date(c), f = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${f}`;
    }, i = D(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(f).length > 0;
    }), r = D(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const y = [...c].sort((_, $) => _.date.localeCompare($.date));
        return {
          labels: y.map((_) => o(_.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: y.map((_) => Number(_.value) || 0),
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
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {}, p = Object.keys(u).filter((y) => f[y]).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((y) => o(y)), m = p.map((y) => {
        const _ = u[y]?.total_cost || 0, $ = f[y] || 0;
        return $ > 0 ? _ / $ : 0;
      });
      return {
        labels: h,
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
    }), l = D(() => a.options ? a.options : {
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
    return t({ isDark: n }), (c, u) => (v(), b("article", I5, [
      u[3] || (u[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Daily Cost Trends"),
          d("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (v(), b("div", H5, [...u[2] || (u[2] = [
        nt('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (v(), b("div", E5, [
        i.value ? (v(), b("section", O5, [
          d("div", V5, [
            U(ke, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (v(), b("section", z5, [
          d("div", N5, [
            d("div", W5, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = d("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Y5 = /* @__PURE__ */ it(j5, [["__scopeId", "data-v-e5bac1c5"]]), q5 = { class: "model-usage-card" }, K5 = {
  key: 0,
  class: "loading-state"
}, U5 = {
  key: 1,
  class: "card-body"
}, X5 = { class: "tabs-container" }, G5 = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, Z5 = ["aria-selected"], Q5 = ["aria-selected"], J5 = {
  key: 0,
  class: "table-section"
}, tw = { class: "table-wrapper" }, ew = { class: "data-table" }, aw = { class: "table-header-row" }, nw = { class: "table-header" }, sw = { class: "table-body" }, ow = { class: "table-cell name-cell" }, iw = { class: "table-cell text-center" }, rw = { class: "table-cell text-center" }, lw = { class: "table-cell text-center" }, cw = { class: "table-cell text-center cost-cell" }, dw = { class: "table-cell text-center" }, uw = {
  key: 1,
  class: "empty-state"
}, hw = { class: "empty-state-content" }, fw = { class: "empty-icon-wrapper" }, gw = /* @__PURE__ */ et({
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
    const n = e, s = a, o = (f) => {
      s("export", f);
    }, { isDark: i } = ht(ut(n, "theme")), r = at("by_model"), l = D(() => r.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), c = (f) => f == null ? "0" : Z(f), u = (f) => f == null ? "$0.00" : xt(f);
    return t({ isDark: i }), (f, g) => (v(), b("article", q5, [
      g[10] || (g[10] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Model Usage"),
          d("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (v(), b("div", K5, [...g[2] || (g[2] = [
        nt('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (v(), b("div", U5, [
        d("div", X5, [
          d("nav", G5, [
            d("button", {
              onClick: g[0] || (g[0] = (p) => r.value = "by_model"),
              class: q(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, Z5),
            d("button", {
              onClick: g[1] || (g[1] = (p) => r.value = "by_provider"),
              class: q(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, Q5)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (v(), b("div", J5, [
          d("div", tw, [
            d("table", ew, [
              d("thead", null, [
                d("tr", aw, [
                  d("th", nw, C(r.value === "by_model" ? "Model" : "Provider"), 1),
                  g[3] || (g[3] = d("th", { class: "table-header" }, "Avg cost per message", -1)),
                  g[4] || (g[4] = d("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  g[5] || (g[5] = d("th", { class: "table-header" }, "Message count", -1)),
                  g[6] || (g[6] = d("th", { class: "table-header" }, "Total cost", -1)),
                  g[7] || (g[7] = d("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              d("tbody", sw, [
                (v(!0), b(Q, null, st(l.value, (p, h) => (v(), b("tr", {
                  key: h,
                  class: "table-row"
                }, [
                  d("td", ow, C(h), 1),
                  d("td", iw, C(u(p.avg_cost_per_message)), 1),
                  d("td", rw, C(c(p.avg_tokens_per_message)), 1),
                  d("td", lw, C(c(p.message_count)), 1),
                  d("td", cw, C(u(p.total_cost)), 1),
                  d("td", dw, C(c(p.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("div", uw, [
          d("div", hw, [
            d("div", fw, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            g[8] || (g[8] = d("p", { class: "empty-title" }, "No model usage data available", -1)),
            g[9] || (g[9] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), pw = /* @__PURE__ */ it(gw, [["__scopeId", "data-v-a7bf2d7b"]]), vw = { class: "message-roles-card" }, mw = {
  key: 0,
  class: "loading-state"
}, bw = {
  key: 1,
  class: "card-body"
}, yw = {
  key: 0,
  class: "table-section"
}, _w = { class: "table-wrapper" }, xw = { class: "data-table" }, kw = { class: "table-body" }, ww = { class: "table-cell name-cell" }, $w = { class: "table-cell text-center" }, Cw = { class: "table-cell text-center" }, Mw = { class: "table-cell text-center" }, Sw = { class: "table-cell text-center cost-cell" }, Dw = { class: "table-cell text-center" }, Aw = {
  key: 1,
  class: "empty-state"
}, Tw = { class: "empty-state-content" }, Bw = { class: "empty-icon-wrapper" }, Lw = /* @__PURE__ */ et({
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
    const n = e, s = a, o = (p) => {
      s("export", p);
    }, { isDark: i } = ht(ut(n, "theme")), r = ["assistant", "system", "user"], l = D(() => n.data?.total_by_role || {}), c = D(() => Object.keys(l.value).length > 0), u = (p) => p == null ? "0" : Z(p), f = (p) => p == null ? "$0.00" : xt(p), g = (p) => p.charAt(0).toUpperCase() + p.slice(1);
    return t({ isDark: i }), (p, h) => (v(), b("article", vw, [
      h[4] || (h[4] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Message Roles"),
          d("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (v(), b("div", mw, [...h[0] || (h[0] = [
        nt('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (v(), b("div", bw, [
        c.value ? (v(), b("div", yw, [
          d("div", _w, [
            d("table", xw, [
              h[1] || (h[1] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Role"),
                  d("th", { class: "table-header" }, "Avg cost per message"),
                  d("th", { class: "table-header" }, "Avg tokens per message"),
                  d("th", { class: "table-header" }, "Message count"),
                  d("th", { class: "table-header" }, "Total cost"),
                  d("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              d("tbody", kw, [
                (v(), b(Q, null, st(r, (m) => d("tr", {
                  key: m,
                  class: "table-row"
                }, [
                  d("td", ww, C(g(m)), 1),
                  d("td", $w, C(f(l.value[m]?.avg_cost_per_message)), 1),
                  d("td", Cw, C(u(l.value[m]?.avg_tokens_per_message)), 1),
                  d("td", Mw, C(u(l.value[m]?.message_count)), 1),
                  d("td", Sw, C(f(l.value[m]?.total_cost)), 1),
                  d("td", Dw, C(u(l.value[m]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("div", Aw, [
          d("div", Tw, [
            d("div", Bw, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            h[2] || (h[2] = d("p", { class: "empty-title" }, "No message role data available", -1)),
            h[3] || (h[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Fw = /* @__PURE__ */ it(Lw, [["__scopeId", "data-v-6a953cfc"]]), Pw = { class: "cost-per-conversation-card" }, Rw = {
  key: 0,
  class: "card-body"
}, Iw = {
  key: 0,
  class: "chart-section"
}, Ew = { class: "chart-container" }, Ow = { class: "kpi-grid" }, Vw = { class: "kpi-card" }, zw = { class: "kpi-value" }, Nw = { class: "kpi-card" }, Ww = { class: "kpi-value" }, Hw = { class: "kpi-card" }, jw = { class: "kpi-value" }, Yw = { class: "kpi-card highlighted" }, qw = { class: "kpi-value gradient-text" }, Kw = {
  key: 1,
  class: "empty-state"
}, Uw = { class: "empty-state-content" }, Xw = { class: "empty-icon-wrapper" }, Gw = {
  key: 1,
  class: "loading-state"
}, Zw = /* @__PURE__ */ et({
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
    const n = e, s = a, o = ($) => {
      s("export", $);
    }, { isDark: i, colors: r } = ht(ut(n, "theme")), l = {
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
    }, c = ($) => $.agent_type || $.agent_id || $.agent_name || "", u = ($) => $.agent_name ? $.agent_name : c($).split("_").map((T) => T.charAt(0).toUpperCase() + T.slice(1)).join(" ").replace(/V\d+$/, "").trim(), f = ($) => {
      const A = c($).toLowerCase();
      for (const [T, w] of Object.entries(l))
        if (A.includes(T))
          return w;
      return "#9ca3af";
    }, g = D(() => [...n.data?.top_agents || []].sort((A, T) => T.avg_cost_per_conversation - A.avg_cost_per_conversation)), p = D(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : g.value.reduce(($, A) => $ + A.conversations, 0)), h = D(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : g.value.reduce(($, A) => $ + A.total_cost, 0)), m = D(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : p.value === 0 ? 0 : h.value / p.value), y = D(() => {
      const $ = g.value;
      if ($.length === 0)
        return { labels: [], datasets: [] };
      const A = $.map((x) => u(x)), T = $.map((x) => x.avg_cost_per_conversation), w = $.map((x) => f(x));
      return {
        labels: A,
        datasets: [
          {
            label: "USD per conversation",
            data: T,
            backgroundColor: w.map((x) => `${x}80`),
            borderColor: w,
            borderWidth: 1
          }
        ]
      };
    }), _ = D(() => n.options ? n.options : {
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
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.tooltipText,
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
            label: function($) {
              const A = g.value[$.dataIndex];
              return [
                `Cost: ${xt($.parsed.x)}`,
                `Conversations: ${Z(A.conversations)}`,
                `Total Cost: ${xt(A.total_cost)}`
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
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: r.value.textSecondary,
            padding: 8,
            callback: function($) {
              return xt($);
            }
          }
        },
        y: {
          border: { display: !1 },
          grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: r.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: i }), ($, A) => (v(), b("article", Pw, [
      A[7] || (A[7] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Cost Per Conversation"),
          d("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (v(), b("div", Gw, [...A[6] || (A[6] = [
        nt('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (v(), b("div", Rw, [
        y.value.labels && y.value.labels.length ? (v(), b("section", Iw, [
          d("div", Ew, [
            U(de, {
              data: y.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          d("footer", Ow, [
            d("div", Vw, [
              A[0] || (A[0] = d("span", { class: "kpi-label" }, "Total Agents", -1)),
              d("span", zw, C(g.value.length), 1)
            ]),
            d("div", Nw, [
              A[1] || (A[1] = d("span", { class: "kpi-label" }, "Total Conversations", -1)),
              d("span", Ww, C(P(Z)(p.value)), 1)
            ]),
            d("div", Hw, [
              A[2] || (A[2] = d("span", { class: "kpi-label" }, "Total Cost", -1)),
              d("span", jw, C(P(xt)(h.value)), 1)
            ]),
            d("div", Yw, [
              A[3] || (A[3] = d("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              d("span", qw, C(P(xt)(m.value)), 1)
            ])
          ]),
          e.enableExport ? (v(), ft(P(Mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : V("", !0)
        ])) : (v(), b("section", Kw, [
          d("div", Uw, [
            d("div", Xw, [
              U(P(Nt), { class: "empty-icon" })
            ]),
            A[4] || (A[4] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            A[5] || (A[5] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Qw = /* @__PURE__ */ it(Zw, [["__scopeId", "data-v-17f6615c"]]);
function Lt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const Jw = { class: "tabs text-sm" }, t$ = ["aria-label"], e$ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], a$ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, n$ = /* @__PURE__ */ et({
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
    const a = e, n = t, s = at([]), o = `tabs-${Lt()}`, i = (h) => `${o}-tab-${h}`, r = D(
      () => a.items.map((h, m) => h.disabled ? -1 : m).filter((h) => h >= 0)
    );
    function l(h) {
      return h.value === a.modelValue;
    }
    function c(h) {
      const m = l(h), _ = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return h.disabled ? `${_} cursor-not-allowed opacity-40` : m ? `${_} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${_} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(h, m) {
      h === m || a.items.find((_) => _.value === h)?.disabled || (n("update:modelValue", h), n("change", { value: h, previousValue: m }));
    }
    function f(h, m) {
      n("tab-click", { value: h.value, originalEvent: m }), !h.disabled && (u(h.value, a.modelValue), At(() => {
        s.value[a.items.indexOf(h)]?.focus();
      }));
    }
    function g(h, m) {
      const y = a.items.length;
      if (y === 0) return 0;
      let _ = h;
      for (let $ = 0; $ < y; $++)
        if (_ = (_ + m + y) % y, !a.items[_]?.disabled) return _;
      return h;
    }
    async function p(h, m) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(h.key)) return;
      h.preventDefault();
      let _ = m;
      h.key === "ArrowLeft" ? _ = g(m, -1) : h.key === "ArrowRight" ? _ = g(m, 1) : h.key === "Home" ? _ = r.value[0] ?? 0 : h.key === "End" && (_ = r.value[r.value.length - 1] ?? m);
      const $ = a.items[_];
      !$ || $.disabled || (u($.value, a.modelValue), await At(), s.value[_]?.focus());
    }
    return (h, m) => (v(), b("div", Jw, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: q([
          "box-border h-10 flex-wrap items-stretch gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (v(!0), b(Q, null, st(e.items, (y, _) => (v(), b("button", {
          id: i(y.value),
          key: y.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": l(y),
          "aria-disabled": y.disabled === !0,
          tabindex: l(y) ? 0 : -1,
          class: q(c(y)),
          onClick: ($) => f(y, $),
          onKeydown: ($) => p($, _)
        }, [
          d("span", {
            class: q(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (v(), ft(la(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : V("", !0),
            d("span", a$, C(y.label), 1)
          ], 2)
        ], 42, e$))), 128))
      ], 10, t$),
      h.$slots.default ? (v(), ft(En, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: Y(() => [
          (v(), b("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Ot(h.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : V("", !0)
    ]));
  }
}), s$ = /* @__PURE__ */ it(n$, [["__scopeId", "data-v-0cc67b12"]]);
function o$(e, t) {
  return v(), b("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function i$(e, t) {
  return v(), b("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const r$ = ["aria-label"], l$ = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, c$ = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, d$ = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, u$ = ["aria-label", "aria-expanded", "aria-controls", "onClick"], h$ = { class: "truncate" }, f$ = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, g$ = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, p$ = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, v$ = ["aria-label", "onClick"], m$ = ["aria-label", "onClick"], b$ = ["aria-label"], y$ = ["aria-label"], _$ = {
  key: 1,
  class: "space-y-2"
}, x$ = ["for"], k$ = ["id", "placeholder", "onKeydown"], w$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, $$ = ["aria-label"], C$ = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, M$ = ["checked", "onChange"], S$ = { class: "min-w-0 flex-1" }, D$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, A$ = { class: "flex flex-wrap items-end gap-2" }, T$ = { class: "min-w-[120px] flex-1" }, B$ = ["for"], L$ = ["id"], F$ = { class: "min-w-[120px] flex-1" }, P$ = ["for"], R$ = ["id"], I$ = /* @__PURE__ */ et({
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
    const a = e, n = t, s = Wo(), i = `${`kiut-filters-${Lt()}`}-panel`, r = at(null), l = /* @__PURE__ */ new Map(), c = at(null), u = at(!1), f = at({}), g = at(null), p = at(""), h = at([]), m = at(""), y = at(""), _ = D(() => c.value ? a.filterDefinitions.find((O) => O.id === c.value) ?? null : null), $ = D(() => {
      const O = _.value;
      if (O)
        return O.type === "text" ? p.value : O.type === "select" ? h.value : { start: m.value, end: y.value };
    });
    function A(O, W) {
      W && W instanceof HTMLElement ? l.set(O, W) : l.delete(O);
    }
    function T(O) {
      return a.modelValue[O];
    }
    function w(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((W) => typeof W == "string" && W.trim() !== "");
      if (typeof O == "string") {
        const W = O.trim();
        return W ? [W] : [];
      }
      return [];
    }
    function x(O, W) {
      if (W == null) return !0;
      if (O.type === "text") return String(W).trim() === "";
      if (O.type === "select") return w(W).length === 0;
      if (O.type === "dateRange") {
        const tt = W;
        return !tt?.start?.trim() || !tt?.end?.trim();
      }
      return !0;
    }
    const k = D(
      () => a.filterDefinitions.some((O) => !x(O, T(O.id)))
    ), S = D(() => {
      const O = [];
      for (const W of a.filterDefinitions) {
        const tt = T(W.id);
        if (!x(W, tt)) {
          if (W.type === "text")
            O.push({ kind: "text", def: W, key: W.id });
          else if (W.type === "dateRange")
            O.push({ kind: "dateRange", def: W, key: W.id });
          else if (W.type === "select")
            for (const gt of w(tt))
              O.push({
                kind: "select",
                def: W,
                optionValue: gt,
                key: `${W.id}::${gt}`
              });
        }
      }
      return O;
    });
    function F(O) {
      return O.type !== "select" ? 0 : w(T(O.id)).length;
    }
    function B(O) {
      const W = T(O.id), tt = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${tt}: ${String(W ?? "").trim()}`;
      if (O.type === "select") {
        const nr = w(W).map((is) => O.options.find((sr) => sr.value === is)?.label ?? is);
        return `${tt}: ${nr.join(", ")}`;
      }
      const gt = W, Wt = L(gt.start), pe = L(gt.end);
      return `${tt}: ${Wt} – ${pe}`;
    }
    function M(O) {
      return O.kind === "text" || O.kind === "dateRange" ? B(O.def) : O.def.options.find((tt) => tt.value === O.optionValue)?.label ?? O.optionValue;
    }
    function L(O) {
      if (!O) return "";
      const W = Bt(O, "YYYY-MM-DD", !0);
      return W.isValid() ? W.format("L") : O;
    }
    function E(O) {
      const W = c.value === O.id && u.value, tt = !x(O, T(O.id));
      return W || tt ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-slate-400/90 text-[color:var(--kiut-text-secondary)] hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-400 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function H(O) {
      return x(O, T(O.id)) ? bt(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function K(O) {
      const W = T(O.id);
      if (O.type === "text") {
        p.value = W != null ? String(W) : "";
        return;
      }
      if (O.type === "select") {
        h.value = [...w(W)];
        return;
      }
      const tt = W;
      m.value = tt?.start?.trim() ?? "", y.value = tt?.end?.trim() ?? "";
    }
    function X() {
      const O = _.value;
      if (!O || O.type !== "select") return;
      const W = { ...a.modelValue };
      h.value.length === 0 ? delete W[O.id] : W[O.id] = [...h.value], n("update:modelValue", W), n("change", W);
    }
    function j(O) {
      const W = h.value.indexOf(O);
      W >= 0 ? h.value = h.value.filter((tt, gt) => gt !== W) : h.value = [...h.value, O], X();
    }
    function I(O) {
      if (!O) return;
      g.value = O;
      const W = O.getBoundingClientRect(), tt = 300;
      let gt = W.left;
      const Wt = window.innerWidth - tt - 12;
      gt > Wt && (gt = Math.max(12, Wt)), gt < 12 && (gt = 12);
      const pe = W.bottom + 8;
      f.value = {
        top: `${pe}px`,
        left: `${gt}px`,
        width: `${Math.min(tt, window.innerWidth - 24)}px`
      };
    }
    function R(O, W) {
      if (c.value === O.id && u.value) {
        J();
        return;
      }
      u.value && c.value !== O.id && J(), c.value = O.id, u.value = !0, K(O), At().then(async () => {
        I(W.currentTarget), await At(), N();
      });
    }
    function z(O, W) {
      if (c.value === O.id && u.value) {
        J();
        return;
      }
      u.value && c.value !== O.id && J(), c.value = O.id, u.value = !0, K(O), At().then(async () => {
        const tt = l.get(O.id) ?? W.currentTarget;
        I(tt), await At(), N();
      });
    }
    function N() {
      const O = r.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function G() {
      u.value = !1, c.value = null, g.value = null;
    }
    function ot(O) {
      const W = _.value;
      if (!W) return;
      if (W.type === "text") {
        p.value = O != null ? String(O) : "";
        return;
      }
      if (W.type === "select") {
        h.value = Array.isArray(O) ? O.filter((gt) => typeof gt == "string") : w(O);
        return;
      }
      const tt = O;
      m.value = tt?.start?.trim() ?? "", y.value = tt?.end?.trim() ?? "";
    }
    function J() {
      const O = _.value;
      if (!O) return;
      if (O.type === "text") {
        const Wt = p.value.trim(), pe = { ...a.modelValue };
        Wt === "" ? delete pe[O.id] : pe[O.id] = Wt, n("update:modelValue", pe), n("change", pe), G();
        return;
      }
      if (O.type === "select") {
        X(), G();
        return;
      }
      const W = m.value.trim(), tt = y.value.trim(), gt = { ...a.modelValue };
      !W || !tt || W > tt ? delete gt[O.id] : gt[O.id] = { start: W, end: tt }, n("update:modelValue", gt), n("change", gt), G();
    }
    function ct(O) {
      const W = { ...a.modelValue };
      delete W[O], n("update:modelValue", W), n("change", W), c.value === O && G();
    }
    function rt(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        ct(O.def.id);
        return;
      }
      const W = { ...a.modelValue }, gt = w(W[O.def.id]).filter((Wt) => Wt !== O.optionValue);
      gt.length === 0 ? delete W[O.def.id] : W[O.def.id] = gt, n("update:modelValue", W), n("change", W), c.value === O.def.id && K(O.def);
    }
    function mt() {
      const O = {};
      n("update:modelValue", O), n("change", O), G();
    }
    const lt = D(() => {
      const O = _.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function Gt(O) {
      const W = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((Wt) => Wt.value === O.optionValue)?.label ?? O.optionValue} del filtro ${W}` : `Quitar filtro ${W}`;
    }
    function ge(O) {
      const W = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const gt = O.def.options.find((Wt) => Wt.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${W}: ${gt}`;
      }
      return `Editar filtro ${W}`;
    }
    function bt(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const ar = D(() => a.clearLabel);
    function ns(O) {
      if (!u.value || !r.value) return;
      const W = O.target;
      if (!(r.value.contains(W) || (W instanceof Element ? W : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const gt of l.values())
          if (gt?.contains(W)) return;
        J();
      }
    }
    function ss(O) {
      O.key === "Escape" && u.value && (O.preventDefault(), G());
    }
    function os() {
      !u.value || !g.value || I(g.value);
    }
    return ne(() => {
      document.addEventListener("mousedown", ns, !0), window.addEventListener("keydown", ss, !0), window.addEventListener("resize", os);
    }), No(() => {
      document.removeEventListener("mousedown", ns, !0), window.removeEventListener("keydown", ss, !0), window.removeEventListener("resize", os);
    }), It(
      () => a.modelValue,
      () => {
        const O = _.value;
        O && u.value && !s.panel && K(O);
      },
      { deep: !0 }
    ), (O, W) => (v(), b("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", l$, [
        d("span", c$, C(e.label), 1),
        d("div", d$, [
          (v(!0), b(Q, null, st(e.filterDefinitions, (tt) => (v(), b("button", {
            key: `pill-${tt.id}`,
            ref_for: !0,
            ref: (gt) => A(tt.id, gt),
            type: "button",
            class: q(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", E(tt)]),
            "aria-label": H(tt),
            "aria-expanded": c.value === tt.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === tt.id ? i : void 0,
            onClick: (gt) => z(tt, gt)
          }, [
            U(P(o$), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", h$, C(tt.label), 1),
            tt.type === "select" && F(tt) > 0 ? (v(), b("span", f$, C(F(tt)), 1)) : V("", !0)
          ], 10, u$))), 128))
        ])
      ]),
      k.value ? (v(), b("div", g$, [
        d("div", p$, [
          (v(!0), b(Q, null, st(S.value, (tt) => (v(), b("div", {
            key: tt.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ge(tt),
              onClick: (gt) => R(tt.def, gt)
            }, [
              Ot(O.$slots, "formatChip", {
                filter: tt.def,
                value: T(tt.def.id),
                optionValue: tt.kind === "select" ? tt.optionValue : void 0
              }, () => [
                wt(C(M(tt)), 1)
              ], !0)
            ], 8, v$),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Gt(tt),
              onClick: (gt) => rt(tt)
            }, [
              U(P(i$), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, m$)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": ar.value,
          onClick: mt
        }, C(e.clearLabel), 9, b$)
      ])) : V("", !0),
      (v(), ft(On, { to: "body" }, [
        c.value && u.value ? (v(), b("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": lt.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: vt(f.value),
          onKeydown: W[3] || (W[3] = ae(() => {
          }, ["stop"]))
        }, [
          _.value ? (v(), b(Q, { key: 0 }, [
            O.$slots.panel ? Ot(O.$slots, "panel", {
              key: 0,
              filter: _.value,
              close: J,
              value: $.value,
              updateValue: ot
            }, void 0, !0) : (v(), b("div", _$, [
              _.value.type === "text" ? (v(), b(Q, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, C(_.value.label), 9, x$),
                Kt(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": W[0] || (W[0] = (tt) => p.value = tt),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: _.value.placeholder ?? "…",
                  onKeydown: Pa(ae(J, ["prevent"]), ["enter"])
                }, null, 40, k$), [
                  [Le, p.value]
                ])
              ], 64)) : _.value.type === "select" ? (v(), b(Q, { key: 1 }, [
                d("p", w$, C(_.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": _.value.label,
                  "aria-multiselectable": !0
                }, [
                  (v(!0), b(Q, null, st(_.value.options, (tt) => (v(), b("li", {
                    key: tt.value
                  }, [
                    d("label", C$, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: h.value.includes(tt.value),
                        onChange: (gt) => j(tt.value)
                      }, null, 40, M$),
                      d("span", S$, C(tt.label), 1)
                    ])
                  ]))), 128))
                ], 8, $$)
              ], 64)) : _.value.type === "dateRange" ? (v(), b(Q, { key: 2 }, [
                d("p", D$, C(_.value.label), 1),
                d("div", A$, [
                  d("div", T$, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, B$),
                    Kt(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": W[1] || (W[1] = (tt) => m.value = tt),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, L$), [
                      [Le, m.value]
                    ])
                  ]),
                  d("div", F$, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, P$),
                    Kt(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": W[2] || (W[2] = (tt) => y.value = tt),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, R$), [
                      [Le, y.value]
                    ])
                  ])
                ])
              ], 64)) : V("", !0)
            ]))
          ], 64)) : V("", !0)
        ], 44, y$)) : V("", !0)
      ]))
    ], 8, r$));
  }
}), E$ = /* @__PURE__ */ it(I$, [["__scopeId", "data-v-4403df66"]]), Xt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", he = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", O$ = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", $e = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", fe = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", V$ = { class: "font-sans" }, z$ = ["for"], N$ = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], W$ = ["id"], H$ = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-input-text-${Lt()}`, o = D(() => a.id ?? s), i = D(() => `${o.value}-err`), r = D({
      get: () => a.modelValue,
      set: (l) => n("update:modelValue", l)
    });
    return (l, c) => (v(), b("div", V$, [
      e.label ? (v(), b("label", {
        key: 0,
        for: o.value,
        class: q(P(Xt))
      }, C(e.label), 11, z$)) : V("", !0),
      Kt(d("input", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: q([P(he), e.invalid ? P($e) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, N$), [
        [Le, r.value]
      ]),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: i.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, W$)) : V("", !0)
    ]));
  }
}), j$ = { class: "font-sans" }, Y$ = ["for"], q$ = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], K$ = ["id"], U$ = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-input-textarea-${Lt()}`, o = D(() => a.id ?? s), i = D(() => `${o.value}-err`), r = D({
      get: () => a.modelValue,
      set: (l) => n("update:modelValue", l)
    });
    return (l, c) => (v(), b("div", j$, [
      e.label ? (v(), b("label", {
        key: 0,
        for: o.value,
        class: q(P(Xt))
      }, C(e.label), 11, Y$)) : V("", !0),
      Kt(d("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => r.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: q([P(O$), e.invalid ? P($e) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, q$), [
        [Le, r.value]
      ]),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: i.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, K$)) : V("", !0)
    ]));
  }
}), X$ = { class: "font-sans" }, G$ = ["for"], Z$ = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Q$ = ["for"], J$ = ["title"], t4 = ["aria-label"], e4 = ["id"], a4 = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-input-file-${Lt()}`, o = D(() => a.id ?? s), i = D(() => `${o.value}-err`), r = at(null), l = D(() => a.modelValue?.name ?? a.placeholder);
    function c(f) {
      const p = f.target.files?.[0] ?? null;
      n("update:modelValue", p);
    }
    function u() {
      n("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (f, g) => (v(), b("div", X$, [
      e.label ? (v(), b("label", {
        key: 0,
        for: o.value,
        class: q(P(Xt))
      }, C(e.label), 11, G$)) : V("", !0),
      d("div", {
        class: q([
          P(he),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? P($e) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        d("input", {
          id: o.value,
          ref_key: "fileInputRef",
          ref: r,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: c
        }, null, 40, Z$),
        d("label", {
          for: o.value,
          class: q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          U(P(Yg), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          wt(" " + C(e.chooseLabel), 1)
        ], 10, Q$),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: l.value || void 0
        }, C(l.value), 9, J$),
        e.modelValue && !e.disabled ? (v(), b("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          U(P(qi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, t4)) : V("", !0)
      ], 2),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: i.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, e4)) : V("", !0)
    ]));
  }
}), n4 = { class: "font-sans" }, s4 = ["for"], o4 = { class: "relative" }, i4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], r4 = ["id"], l4 = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-input-datetime-${Lt()}`, o = D(() => a.id ?? s), i = D(() => `${o.value}-err`), r = D(() => a.modelValue ?? "");
    function l(c) {
      const u = c.target.value;
      n("update:modelValue", u === "" ? null : u);
    }
    return (c, u) => (v(), b("div", n4, [
      e.label ? (v(), b("label", {
        key: 0,
        for: o.value,
        class: q(P(Xt))
      }, C(e.label), 11, s4)) : V("", !0),
      d("div", o4, [
        U(P(ji), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: q([
            P(he),
            "pl-10",
            e.invalid ? P($e) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, i4)
      ]),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: i.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, r4)) : V("", !0)
    ]));
  }
}), c4 = { class: "font-sans" }, d4 = ["for"], u4 = { class: "relative" }, h4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], f4 = ["id"], g4 = /* @__PURE__ */ et({
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
      const g = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(f.trim());
      if (!g) return null;
      const p = Number(g[1]), h = Number(g[2]);
      return !Number.isInteger(p) || !Number.isInteger(h) || p < 0 || p > 23 || h < 0 || h > 59 ? null : `${String(p).padStart(2, "0")}:${String(h).padStart(2, "0")}`;
    }
    function n(f) {
      return f === "" ? null : a(f);
    }
    const s = e, o = t, i = `kiut-input-time-${Lt()}`, r = D(() => s.id ?? i), l = D(() => `${r.value}-err`), c = D(() => s.modelValue == null || s.modelValue === "" ? "" : a(s.modelValue) ?? "");
    function u(f) {
      const g = f.target.value;
      o("update:modelValue", n(g));
    }
    return (f, g) => (v(), b("div", c4, [
      e.label ? (v(), b("label", {
        key: 0,
        for: r.value,
        class: q(P(Xt))
      }, C(e.label), 11, d4)) : V("", !0),
      d("div", u4, [
        U(P(Zg), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: q([
            P(he),
            "pl-10",
            e.invalid ? P($e) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: u
        }, null, 42, h4)
      ]),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: l.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, f4)) : V("", !0)
    ]));
  }
}), p4 = { class: "font-sans" }, v4 = ["for"], m4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, b4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], y4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, _4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, x4 = { class: "min-w-0 text-left leading-snug" }, k4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, w4 = { class: "min-w-0 text-right leading-snug" }, $4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, C4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, M4 = ["id"], S4 = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-input-range-${Lt()}`, o = D(() => a.id ?? s), i = D(() => `${o.value}-err`), r = D(() => {
      const p = [];
      return a.errorText && p.push(i.value), p.length ? p.join(" ") : void 0;
    }), l = D(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = D(() => !!(a.captionMin || a.captionMax)), u = D(() => {
      const { min: p, max: h, modelValue: m } = a;
      if (h === p) return 0;
      const y = (m - p) / (h - p);
      return Math.min(100, Math.max(0, y * 100));
    }), f = D(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function g(p) {
      const h = Number(p.target.value);
      n("update:modelValue", Number.isNaN(h) ? a.min : h);
    }
    return (p, h) => (v(), b("div", p4, [
      e.label ? (v(), b("label", {
        key: 0,
        for: o.value,
        class: q(P(Xt))
      }, C(e.label), 11, v4)) : V("", !0),
      d("div", {
        class: q(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (v(), b("p", m4, C(e.captionMax), 1)) : V("", !0),
        d("div", {
          class: q(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: vt(f.value)
        }, [
          d("input", {
            id: o.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": r.value,
            class: q([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: g
          }, null, 42, b4)
        ], 6),
        e.orientation === "horizontal" && l.value ? (v(), b("p", y4, C(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (v(), b("div", _4, [
          d("span", x4, C(e.captionMin), 1),
          d("span", k4, C(e.caption), 1),
          d("span", w4, C(e.captionMax), 1)
        ])) : V("", !0),
        e.orientation === "vertical" && e.captionMin ? (v(), b("p", $4, C(e.captionMin), 1)) : V("", !0),
        e.orientation === "vertical" && e.caption ? (v(), b("p", C4, C(e.caption), 1)) : V("", !0)
      ], 2),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: i.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, M4)) : V("", !0)
    ]));
  }
}), D4 = /* @__PURE__ */ it(S4, [["__scopeId", "data-v-a1343418"]]), A4 = { class: "font-sans" }, T4 = ["for"], B4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], L4 = ["id"], F4 = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-input-number-${Lt()}`, o = D(() => a.id ?? s), i = D(() => `${o.value}-err`), r = D(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = D(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(u) {
      const f = u.target.value;
      if (f === "") {
        n("update:modelValue", null);
        return;
      }
      const g = Number(f);
      n("update:modelValue", Number.isNaN(g) ? null : g);
    }
    return (u, f) => (v(), b("div", A4, [
      e.label ? (v(), b("label", {
        key: 0,
        for: o.value,
        class: q(P(Xt))
      }, C(e.label), 11, T4)) : V("", !0),
      d("input", {
        id: o.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: q([
          P(he),
          e.invalid ? P($e) : "",
          r.value,
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        ]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        min: e.min,
        max: e.max,
        step: e.step,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 42, B4),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: i.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, L4)) : V("", !0)
    ]));
  }
}), P4 = { class: "font-sans" }, R4 = ["for"], I4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], E4 = ["disabled"], O4 = ["id"], V4 = "#3b82f6", z4 = "#aabbcc", N4 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", W4 = /* @__PURE__ */ et({
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
    function a(h) {
      const m = h.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(m);
      if (y) return `#${y[1].toLowerCase()}`;
      const _ = /^#?([0-9a-fA-F]{3})$/.exec(m);
      if (_) {
        const [$, A, T] = _[1].split("");
        return `#${$}${$}${A}${A}${T}${T}`.toLowerCase();
      }
      return null;
    }
    function n(h) {
      return a(h) ?? V4;
    }
    const s = e, o = t, i = `kiut-input-color-${Lt()}`, r = D(() => s.id ?? i), l = D(() => `${r.value}-err`), c = D(() => n(s.modelValue)), u = at(c.value), f = at(!1);
    It(c, (h) => {
      f.value || (u.value = h);
    });
    function g(h) {
      const m = h.target, y = a(m.value);
      y && o("update:modelValue", y);
    }
    function p() {
      f.value = !1;
      const h = a(u.value);
      h ? (u.value = h, o("update:modelValue", h)) : u.value = c.value;
    }
    return It(u, (h) => {
      if (!f.value) return;
      const m = a(h);
      m && o("update:modelValue", m);
    }), (h, m) => (v(), b("div", P4, [
      e.label ? (v(), b("label", {
        key: 0,
        for: r.value,
        class: q(P(Xt))
      }, C(e.label), 11, R4)) : V("", !0),
      d("div", {
        class: q([
          N4,
          e.invalid ? P($e) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        d("input", {
          id: r.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: g
        }, null, 40, I4),
        e.showHexInput ? Kt((v(), b("input", {
          key: 0,
          "onUpdate:modelValue": m[0] || (m[0] = (y) => u.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: z4,
          onFocus: m[1] || (m[1] = (y) => f.value = !0),
          onBlur: p
        }, null, 40, E4)), [
          [Le, u.value]
        ]) : V("", !0)
      ], 2),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: l.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, O4)) : V("", !0)
    ]));
  }
});
function tr(e, t) {
  return v(), b("svg", {
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
const H4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], j4 = ["aria-selected", "onClick", "onMouseenter"], Y4 = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, q4 = { class: "min-w-0 flex-1" }, er = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-select-${Lt()}`, o = `${s}-label`, i = `${s}-btn`, r = `${s}-listbox`, l = at(null), c = at(null), u = at(null), f = at(!1), g = at(0), p = at({});
    function h() {
      const M = c.value;
      if (!M) return;
      const L = M.getBoundingClientRect();
      p.value = {
        top: `${L.bottom - 3}px`,
        left: `${L.left}px`,
        width: `${L.width}px`
      };
    }
    const m = D(() => a.options.filter((M) => !M.disabled)), y = D(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), _ = D(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((L) => L.value === a.modelValue)?.label ?? String(a.modelValue));
    function $(M) {
      return `${String(M.value)}-${M.label}`;
    }
    function A(M) {
      return a.modelValue === M.value;
    }
    function T(M, L) {
      const E = A(M), H = g.value === L;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && H ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function w(M) {
      n("update:modelValue", M.value), f.value = !1;
    }
    function x() {
      a.disabled || (f.value = !f.value);
    }
    function k(M) {
      if (M.stopPropagation(), !a.disabled && (x(), f.value)) {
        h();
        const L = Math.max(
          0,
          m.value.findIndex((E) => E.value === a.modelValue)
        );
        g.value = L, At(() => u.value?.focus());
      }
    }
    function S(M) {
      if (!f.value) return;
      const L = M.target, E = l.value, H = u.value;
      E && !E.contains(L) && (!H || !H.contains(L)) && (f.value = !1);
    }
    function F(M) {
      a.disabled || (M.key === "ArrowDown" || M.key === "Enter" || M.key === " ") && (M.preventDefault(), f.value || (f.value = !0, h(), g.value = Math.max(
        0,
        m.value.findIndex((L) => L.value === a.modelValue)
      ), At(() => u.value?.focus())));
    }
    function B(M) {
      const L = m.value;
      if (L.length !== 0) {
        if (M.key === "Escape") {
          M.preventDefault(), f.value = !1;
          return;
        }
        if (M.key === "ArrowDown") {
          M.preventDefault(), g.value = Math.min(g.value + 1, L.length - 1);
          return;
        }
        if (M.key === "ArrowUp") {
          M.preventDefault(), g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (M.key === "Enter") {
          M.preventDefault();
          const E = L[g.value];
          E && w(E);
        }
      }
    }
    return ne(() => {
      document.addEventListener("click", S);
    }), Ie(() => {
      document.removeEventListener("click", S);
    }), (M, L) => (v(), b("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (v(), b("label", {
        key: 0,
        id: o,
        class: q(P(Xt))
      }, C(e.label), 3)) : V("", !0),
      d("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          P(he),
          "flex items-center justify-between gap-2 text-left",
          f.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": f.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: k,
        onKeydown: F
      }, [
        d("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, C(_.value), 3),
        U(P(Yi), {
          class: q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", f.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, H4),
      (v(), ft(On, { to: "body" }, [
        Kt(d("ul", {
          id: r,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: vt(p.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: ae(B, ["stop"])
        }, [
          (v(!0), b(Q, null, st(m.value, (E, H) => (v(), b("li", {
            key: $(E),
            role: "option",
            "aria-selected": A(E),
            class: q(T(E, H)),
            onClick: ae((K) => w(E), ["stop"]),
            onMouseenter: (K) => g.value = H
          }, [
            e.showOptionCheck ? (v(), b("span", Y4, [
              A(E) ? (v(), ft(P(tr), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : V("", !0)
            ])) : V("", !0),
            d("span", q4, C(E.label), 1)
          ], 42, j4))), 128))
        ], 36), [
          [ra, f.value]
        ])
      ]))
    ], 512));
  }
}), K4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], U4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, X4 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, G4 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, Z4 = { class: "truncate" }, Q4 = ["aria-selected", "onClick", "onMouseenter"], J4 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, tC = { class: "min-w-0 flex-1" }, eC = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-multiselect-${Lt()}`, o = `${s}-label`, i = `${s}-btn`, r = `${s}-listbox`, l = at(null), c = at(null), u = at(!1), f = at(0), g = D(() => a.options.filter((B) => !B.disabled)), p = D(() => new Set(a.modelValue ?? [])), h = D(
      () => a.options.filter((B) => p.value.has(B.value))
    ), m = D(() => {
      const B = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", M = h.value.length;
      return M === 0 ? B : `${B}, ${M} seleccionada${M === 1 ? "" : "s"}`;
    });
    function y(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function _(B) {
      return p.value.has(B.value);
    }
    function $(B, M) {
      const L = _(B), E = f.value === M;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && E ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function A(B) {
      const M = [...a.modelValue ?? []], L = M.indexOf(B.value);
      L >= 0 ? M.splice(L, 1) : M.push(B.value), n("update:modelValue", M);
    }
    function T() {
      const B = g.value;
      if (B.length === 0) {
        f.value = 0;
        return;
      }
      const M = p.value, L = B.findIndex((E) => M.has(E.value));
      f.value = L >= 0 ? L : 0;
    }
    function w() {
      a.disabled || (u.value = !u.value);
    }
    function x(B) {
      B.stopPropagation(), !a.disabled && (w(), u.value && (T(), At(() => c.value?.focus())));
    }
    function k(B) {
      if (!u.value) return;
      const M = l.value;
      M && !M.contains(B.target) && (u.value = !1);
    }
    function S(B) {
      a.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), u.value || (u.value = !0, T(), At(() => c.value?.focus())));
    }
    function F(B) {
      const M = g.value;
      if (M.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), u.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), f.value = Math.min(f.value + 1, M.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (B.key === "Enter" || B.key === " ") {
          B.preventDefault();
          const L = M[f.value];
          L && A(L);
        }
      }
    }
    return ne(() => {
      document.addEventListener("click", k);
    }), Ie(() => {
      document.removeEventListener("click", k);
    }), (B, M) => (v(), b("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (v(), b("label", {
        key: 0,
        id: o,
        class: q(P(Xt))
      }, C(e.label), 3)) : V("", !0),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: q([
          P(he),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: x,
        onKeydown: S
      }, [
        d("div", U4, [
          h.value.length === 0 ? (v(), b("span", X4, C(e.placeholder), 1)) : (v(), b("div", G4, [
            (v(!0), b(Q, null, st(h.value, (L) => (v(), b("span", {
              key: y(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", Z4, C(L.label), 1)
            ]))), 128))
          ]))
        ]),
        U(P(Yi), {
          class: q(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, K4),
      Kt(d("ul", {
        id: r,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ae(F, ["stop"])
      }, [
        (v(!0), b(Q, null, st(g.value, (L, E) => (v(), b("li", {
          key: y(L),
          role: "option",
          "aria-selected": _(L),
          class: q($(L, E)),
          onClick: ae((H) => A(L), ["stop"]),
          onMouseenter: (H) => f.value = E
        }, [
          d("span", J4, [
            _(L) ? (v(), ft(P(tr), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : V("", !0)
          ]),
          d("span", tC, C(L.label), 1)
        ], 42, Q4))), 128))
      ], 544), [
        [ra, u.value]
      ])
    ], 512));
  }
}), aC = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], nC = { class: "sr-only" }, sC = /* @__PURE__ */ et({
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
    const a = e, n = t;
    function s() {
      a.disabled || n("update:modelValue", !a.modelValue);
    }
    return (o, i) => (v(), b("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: q([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: s,
      onKeydown: [
        Pa(ae(s, ["prevent", "stop"]), ["space"]),
        Pa(ae(s, ["prevent"]), ["enter"])
      ]
    }, [
      d("span", {
        class: q(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", nC, C(e.ariaLabel), 1)
    ], 42, aC));
  }
}), oC = { class: "font-sans" }, iC = ["for"], rC = { class: "flex gap-2" }, lC = { class: "w-[7.5rem] shrink-0" }, cC = { class: "min-w-0 flex-1" }, dC = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], uC = ["id"], hC = /* @__PURE__ */ et({
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
    const a = e, n = t, s = `kiut-phone-${Lt()}`, o = D(() => a.id ?? `${s}-num`), i = D(() => `${o.value}-err`), r = D({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), l = D({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, u) => (v(), b("div", oC, [
      e.label ? (v(), b("label", {
        key: 0,
        for: o.value,
        class: q(P(Xt))
      }, C(e.label), 11, iC)) : V("", !0),
      d("div", rC, [
        d("div", lC, [
          U(er, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (f) => r.value = f),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", cC, [
          Kt(d("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (f) => l.value = f),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: q([P(he), e.invalid ? P($e) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, dC), [
            [Le, l.value]
          ])
        ])
      ]),
      e.errorText ? (v(), b("p", {
        key: 1,
        id: i.value,
        class: q(P(fe)),
        role: "alert"
      }, C(e.errorText), 11, uC)) : V("", !0)
    ]));
  }
}), fC = ["role", "aria-label"], gC = { class: "flex flex-wrap gap-2" }, pC = ["aria-checked", "role", "onClick"], vC = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, mC = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, bC = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, yC = /* @__PURE__ */ et({
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
    const a = e, n = t, s = D(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
    function o(l) {
      return a.multiple ? s.value.includes(l.value) : a.modelValue === l.value;
    }
    function i(l) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(l) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function r(l) {
      if (a.multiple) {
        const c = Array.isArray(a.modelValue) ? [...a.modelValue] : [], u = c.indexOf(l.value);
        u >= 0 ? c.splice(u, 1) : c.push(l.value), n("update:modelValue", c);
        return;
      }
      n("update:modelValue", l.value);
    }
    return (l, c) => (v(), b("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", gC, [
        (v(!0), b(Q, null, st(e.items, (u) => (v(), b("button", {
          key: u.value,
          type: "button",
          class: q(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (f) => r(u)
        }, [
          d("span", vC, [
            o(u) ? (v(), b("span", mC)) : V("", !0)
          ]),
          u.dotColor ? (v(), b("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: vt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          d("span", bC, C(u.label), 1)
        ], 10, pC))), 128))
      ])
    ], 8, fC));
  }
}), _C = ["aria-label"], xC = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], kC = { class: "truncate px-3 py-2 text-sm font-medium" }, wC = /* @__PURE__ */ et({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, s = `kiut-seg-${Lt()}`, o = (m) => `${s}-seg-${m}`, i = at([]);
    function r(m, y) {
      m instanceof HTMLButtonElement ? i.value[y] = m : i.value[y] = null;
    }
    function l(m) {
      return m.value === a.modelValue;
    }
    function c(m) {
      const y = l(m), _ = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return m.disabled ? `${_} cursor-not-allowed opacity-40` : y ? `${_} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${_} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(m) {
      m.disabled || m.value !== a.modelValue && n("update:modelValue", m.value);
    }
    function f(m, y, _) {
      u(m), At(() => i.value[y]?.focus());
    }
    const g = D(
      () => a.items.map((m, y) => m.disabled ? -1 : y).filter((m) => m >= 0)
    );
    function p(m, y) {
      const _ = a.items.length;
      if (_ === 0) return 0;
      let $ = m;
      for (let A = 0; A < _; A++)
        if ($ = ($ + y + _) % _, !a.items[$]?.disabled) return $;
      return m;
    }
    function h(m, y) {
      if (m.key === "ArrowRight" || m.key === "ArrowDown") {
        m.preventDefault();
        const _ = p(y, 1), $ = a.items[_];
        $ && u($), At(() => i.value[_]?.focus());
      } else if (m.key === "ArrowLeft" || m.key === "ArrowUp") {
        m.preventDefault();
        const _ = p(y, -1), $ = a.items[_];
        $ && u($), At(() => i.value[_]?.focus());
      } else if (m.key === "Home") {
        m.preventDefault();
        const _ = g.value[0];
        if (_ !== void 0) {
          const $ = a.items[_];
          $ && u($), At(() => i.value[_]?.focus());
        }
      } else if (m.key === "End") {
        m.preventDefault();
        const _ = g.value[g.value.length - 1];
        if (_ !== void 0) {
          const $ = a.items[_];
          $ && u($), At(() => i.value[_]?.focus());
        }
      }
    }
    return (m, y) => (v(), b("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (v(!0), b(Q, null, st(e.items, (_, $) => (v(), b("button", {
        id: o(_.value),
        key: _.value,
        ref_for: !0,
        ref: (A) => r(A, $),
        type: "button",
        role: "tab",
        "aria-selected": l(_),
        "aria-disabled": _.disabled === !0,
        tabindex: l(_) ? 0 : -1,
        class: q(c(_)),
        onClick: (A) => f(_, $),
        onKeydown: (A) => h(A, $)
      }, [
        d("span", kC, C(_.label), 1)
      ], 42, xC))), 128))
    ], 8, _C));
  }
});
function De(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function Je(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function ve(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function $n(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Ro(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function Za(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < n ? -1 : a > n ? 1 : 0;
}
function Io(e, t) {
  return Za(e, t) === 0;
}
function Cn(e, t) {
  return Za(e, t) < 0;
}
function $C(e, t) {
  return Za(e, t) >= 0;
}
function CC(e, t) {
  return Za(e, t) <= 0;
}
function MC(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), s = new Date(n);
  s.setDate(n.getDate() - n.getDay());
  const o = [], i = new Date(s);
  for (let r = 0; r < 42; r++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const SC = [
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
], DC = [
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
function Eo(e) {
  return `${SC[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Oo(e) {
  return `${DC[e.getMonth()]} ${e.getFullYear()}`;
}
const AC = ["aria-expanded", "aria-labelledby", "aria-label"], TC = ["onKeydown"], BC = { class: "mb-4 flex items-center justify-between gap-2" }, LC = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, FC = { class: "min-w-0 truncate" }, PC = { class: "min-w-0 truncate" }, RC = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, IC = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, EC = { class: "grid grid-cols-7 gap-y-1" }, OC = ["disabled", "onClick"], VC = /* @__PURE__ */ et({
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
    const a = e, n = t, o = `${`kiut-drp-${Lt()}`}-lbl`, i = at(null), r = at(null), l = at(!1), c = at(null), u = at($n(/* @__PURE__ */ new Date())), f = D(() => {
      const k = $n(u.value);
      return [k, Ro(k, 1)];
    }), g = D(() => a.ariaLabel ?? a.placeholder), p = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], h = D(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const k = De(a.modelValue.start), S = De(a.modelValue.end);
      return `${Eo(k)} – ${Eo(S)}`;
    });
    function m(k, S) {
      return k.getMonth() === S.getMonth() && k.getFullYear() === S.getFullYear();
    }
    function y(k) {
      const S = ve(k);
      if (a.minDate) {
        const F = ve(De(a.minDate));
        if (Cn(S, F)) return !0;
      }
      if (a.maxDate) {
        const F = ve(De(a.maxDate));
        if (Cn(F, S)) return !0;
      }
      return !1;
    }
    function _(k, S) {
      const F = m(S, k), B = a.modelValue.start ? ve(De(a.modelValue.start)) : null, M = a.modelValue.end ? ve(De(a.modelValue.end)) : null, L = ve(S), E = F ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!B || !M)
        return `${E} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const H = $C(L, B) && CC(L, M), K = Io(L, B), X = Io(L, M);
      return K || X ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : H ? `${E} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${E} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function $(k) {
      if (y(k)) return;
      const S = ve(k);
      if (!c.value) {
        c.value = new Date(S), n("update:modelValue", { start: Je(S), end: Je(S) });
        return;
      }
      let B = ve(c.value), M = new Date(S);
      Cn(M, B) && ([B, M] = [M, B]), n("update:modelValue", { start: Je(B), end: Je(M) }), c.value = null, l.value = !1;
    }
    function A(k) {
      u.value = Ro(u.value, k);
    }
    function T() {
      l.value = !1;
    }
    function w(k) {
      if (k?.stopPropagation(), !l.value) {
        if (l.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = $n(De(a.modelValue.start));
          } catch {
          }
        At(() => r.value?.focus());
      }
    }
    function x(k) {
      if (!l.value) return;
      const S = i.value;
      S && !S.contains(k.target) && (l.value = !1);
    }
    return It(l, (k) => {
      k && (c.value = null);
    }), ne(() => {
      document.addEventListener("click", x);
    }), Ie(() => {
      document.removeEventListener("click", x);
    }), (k, S) => (v(), b("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (v(), b("label", {
        key: 0,
        id: o,
        class: q(P(Xt))
      }, C(e.label), 3)) : V("", !0),
      d("button", {
        type: "button",
        class: q([P(he), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onFocus: w,
        onClick: w
      }, [
        U(P(ji), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: q([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, C(h.value), 3)
      ], 42, AC),
      Kt(d("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Pa(ae(T, ["stop"]), ["escape"])
      }, [
        d("div", BC, [
          d("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: S[0] || (S[0] = (F) => A(-1))
          }, [
            U(P(Xg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          d("div", LC, [
            d("span", FC, C(P(Oo)(f.value[0])), 1),
            d("span", PC, C(P(Oo)(f.value[1])), 1)
          ]),
          d("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: S[1] || (S[1] = (F) => A(1))
          }, [
            U(P(Gg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        d("div", RC, [
          (v(!0), b(Q, null, st(f.value, (F) => (v(), b("div", {
            key: `${F.getFullYear()}-${F.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            d("div", IC, [
              (v(), b(Q, null, st(p, (B) => d("span", { key: B }, C(B), 1)), 64))
            ]),
            d("div", EC, [
              (v(!0), b(Q, null, st(P(MC)(F), (B) => (v(), b("button", {
                key: P(Je)(B),
                type: "button",
                disabled: y(B),
                class: q(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", _(F, B)]),
                onClick: (M) => $(B)
              }, C(B.getDate()), 11, OC))), 128))
            ])
          ]))), 128))
        ])
      ], 40, TC), [
        [ra, l.value]
      ])
    ], 512));
  }
}), zC = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, NC = /* @__PURE__ */ et({
  name: "Tag",
  __name: "Tag",
  props: {
    statusLive: { type: Boolean },
    color: { default: "neutral" },
    outlined: { type: Boolean, default: !1 },
    label: {},
    labelConnected: { default: "Connected" },
    labelDisconnected: { default: "Disconnected" }
  },
  setup(e) {
    const t = e, a = D(() => t.statusLive !== void 0), n = D(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), s = D(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = D(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = D(() => {
      const r = t.outlined;
      switch (t.color) {
        case "purple":
          return r ? "border border-violet-500 bg-transparent text-violet-700 dark:border-violet-400 dark:text-violet-300" : "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
        case "warning":
          return r ? "border border-amber-500 bg-transparent text-amber-800 dark:border-amber-400 dark:text-amber-200" : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200";
        case "success":
          return r ? "border border-emerald-500 bg-transparent text-emerald-800 dark:border-emerald-400 dark:text-emerald-200" : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200";
        case "danger":
          return r ? "border border-red-500 bg-transparent text-red-800 dark:border-red-400 dark:text-red-200" : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200";
        case "orange":
          return r ? "border border-orange-500 bg-transparent text-orange-800 dark:border-orange-400 dark:text-orange-200" : "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200";
        default:
          return r ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (r, l) => a.value ? (v(), b("span", {
      key: 0,
      role: "status",
      class: q(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (v(), b("span", zC, [...l[0] || (l[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : V("", !0),
      d("span", {
        class: q(["min-w-0 flex-1 text-center", o.value])
      }, C(n.value), 3)
    ], 2)) : (v(), b("span", {
      key: 1,
      class: q(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Ot(r.$slots, "default", {}, () => [
        wt(C(e.label), 1)
      ])
    ], 2));
  }
}), WC = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, HC = ["type", "disabled", "aria-label"], jC = {
  key: 1,
  class: "min-w-0 truncate"
}, YC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, qC = ["type", "disabled", "aria-label"], KC = {
  key: 1,
  class: "min-w-0 truncate"
}, Fa = /* @__PURE__ */ et({
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
    const t = e, a = Ho(), n = D(() => !!t.tooltip?.trim()), s = D(() => t.variant === "action"), o = D(() => !s.value), i = D(() => {
      const u = a["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = D(() => {
      const u = a.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), l = D(() => {
      const { class: u, type: f, "aria-label": g, ...p } = a;
      return p;
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
    return (u, f) => n.value ? (v(), b("span", WC, [
      d("button", Dn({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, P(a).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, l.value), [
        u.$slots.icon ? (v(), b("span", {
          key: 0,
          class: q(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Ot(u.$slots, "icon")
        ], 2)) : V("", !0),
        o.value ? (v(), b("span", jC, [
          Ot(u.$slots, "default")
        ])) : V("", !0)
      ], 16, HC),
      d("span", YC, C(e.tooltip), 1)
    ])) : (v(), b("button", Dn({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, P(a).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, l.value), [
      u.$slots.icon ? (v(), b("span", {
        key: 0,
        class: q(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Ot(u.$slots, "icon")
      ], 2)) : V("", !0),
      o.value ? (v(), b("span", KC, [
        Ot(u.$slots, "default")
      ])) : V("", !0)
    ], 16, qC));
  }
}), UC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, XC = { class: "min-w-0 flex-1 space-y-1" }, GC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, ZC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, QC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, JC = /* @__PURE__ */ et({
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
    const a = e, n = t, o = `${`kiut-modal-${Lt()}`}-title`, i = at(null);
    function r() {
      n("cancel"), n("update:modelValue", !1);
    }
    function l() {
      n("confirm");
    }
    function c(u) {
      a.modelValue && u.key === "Escape" && (u.preventDefault(), r());
    }
    return It(
      () => a.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), ne(() => {
      document.addEventListener("keydown", c);
    }), Ie(() => {
      document.removeEventListener("keydown", c);
    }), (u, f) => (v(), ft(On, { to: "body" }, [
      U(En, { name: "kiut-modal" }, {
        default: Y(() => [
          e.modelValue ? (v(), b("div", UC, [
            d("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            d("div", {
              ref_key: "panelRef",
              ref: i,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": o,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: f[0] || (f[0] = ae(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: q(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                d("div", XC, [
                  d("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, C(e.title), 1),
                  e.subtitle ? (v(), b("p", GC, C(e.subtitle), 1)) : V("", !0)
                ]),
                U(Fa, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: Y(() => [
                    U(P(qi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              d("div", ZC, [
                Ot(u.$slots, "default", {}, void 0, !0)
              ]),
              d("footer", QC, [
                U(Fa, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: Y(() => [
                    wt(C(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                U(Fa, {
                  variant: "primary",
                  type: "button",
                  onClick: l
                }, {
                  default: Y(() => [
                    wt(C(e.confirmLabel), 1)
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
}), tM = /* @__PURE__ */ it(JC, [["__scopeId", "data-v-4ed7bb14"]]), eM = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, aM = { class: "flex min-w-0 flex-1 flex-col gap-1.5" }, nM = { class: "flex min-w-0 items-center gap-2.5" }, sM = {
  key: 0,
  class: "inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6",
  "aria-hidden": "true"
}, oM = {
  key: 0,
  class: "text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-[#838395]"
}, iM = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, rM = {
  key: 0,
  class: "mt-6"
}, lM = /* @__PURE__ */ et({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, a = Wo(), s = `${`kiut-section-${Lt()}`}-title`, o = D(() => !!(a.icon || t.icon));
    return (i, r) => (v(), b("section", {
      class: "text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": s
    }, [
      d("header", eM, [
        d("div", aM, [
          d("div", nM, [
            o.value ? (v(), b("span", sM, [
              Ot(i.$slots, "icon", {}, () => [
                e.icon ? (v(), ft(la(e.icon), { key: 0 })) : V("", !0)
              ])
            ])) : V("", !0),
            d("h2", {
              id: s,
              class: "min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, C(e.title), 1)
          ]),
          e.subtitle ? (v(), b("p", oM, C(e.subtitle), 1)) : V("", !0)
        ]),
        i.$slots.actions ? (v(), b("div", iM, [
          Ot(i.$slots, "actions")
        ])) : V("", !0)
      ]),
      i.$slots.default ? (v(), b("div", rM, [
        Ot(i.$slots, "default")
      ])) : V("", !0)
    ]));
  }
}), cM = { class: "flex flex-1 min-h-0" }, dM = {
  key: 0,
  class: "flex justify-center items-center mt-3 shrink-0"
}, uM = {
  class: "flex-1 overflow-y-auto p-1.5 flex flex-col gap-1",
  "aria-label": "Sections"
}, hM = ["aria-current", "title", "onClick"], fM = {
  key: 1,
  class: "shrink-0 border-t border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)]"
}, gM = { class: "px-4 pt-4 pb-2 shrink-0" }, pM = { class: "text-[12px] font-bold uppercase tracking-widest text-[color:var(--kiut-text-muted)]" }, vM = {
  class: "flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-1",
  "aria-label": "Section items"
}, mM = ["data-nav-id", "aria-current", "onClick"], bM = /* @__PURE__ */ et({
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
    primaryRailWidth: { default: "3.4rem" }
  },
  emits: ["update:selectedSectionId", "navigate"],
  setup(e, { emit: t }) {
    const a = at(!1), n = e, s = t, o = Ho(), { class: i, ...r } = o, l = D(() => {
      const m = n.sections.find((y) => y.id === n.selectedSectionId);
      return m?.items?.length ? m : null;
    });
    function c(m) {
      return n.activePath ? n.activePath === m.path || n.activePath.startsWith(m.path + "/") : !1;
    }
    function u(m) {
      return (m.items ?? []).some(c);
    }
    function f(m) {
      if (!m.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: m,
          item: { id: m.id, label: m.label, path: m.path }
        });
        return;
      }
      const y = n.selectedSectionId === m.id ? null : m.id;
      s("update:selectedSectionId", y);
    }
    function g(m, y) {
      s("navigate", { section: m, item: y });
    }
    function p(m) {
      return n.selectedSectionId === m.id ? [
        "bg-purple-100 text-purple-900 shadow-sm dark:bg-purple-500/30 dark:text-purple-50"
      ] : u(m) ? ["text-[color:var(--kiut-primary)]", "text-purple-800/90 dark:text-purple-400"] : [
        "text-[color:var(--kiut-text-secondary)]",
        "hover:bg-purple-100/50 hover:text-purple-900",
        "dark:hover:bg-purple-400/20 dark:hover:text-purple-50"
      ];
    }
    function h(m) {
      return c(m) ? [
        "bg-purple-100 text-purple-700",
        "dark:bg-purple-600/20 dark:text-purple-400"
      ] : [
        "text-[color:var(--kiut-text-primary)]",
        "hover:bg-purple-50 hover:text-purple-900",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    return (m, y) => (v(), b("aside", Dn({
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      d("div", cM, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)]",
          style: vt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: y[0] || (y[0] = (_) => a.value = !0),
          onMouseleave: y[1] || (y[1] = (_) => a.value = !1)
        }, [
          m.$slots.logo ? (v(), b("div", dM, [
            Ot(m.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : V("", !0),
          d("nav", uM, [
            (v(!0), b(Q, null, st(e.sections, (_) => (v(), b("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              title: _.label,
              class: q(["group relative flex flex-row items-center justify-start gap-1 px-2 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", p(_)]),
              onClick: ($) => f(_)
            }, [
              _.icon ? (v(), ft(la(_.icon), {
                key: 0,
                class: "shrink-0",
                style: vt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : V("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1",
                style: vt({ fontSize: e.primaryFontSize })
              }, C(_.label), 5)
            ], 10, hM))), 128))
          ]),
          m.$slots.footer ? (v(), b("div", fM, [
            Ot(m.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : V("", !0)
        ], 36),
        U(En, { name: "ksn-sub" }, {
          default: Y(() => [
            l.value ? (v(), b("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)] overflow-hidden",
              style: vt({ width: e.secondaryWidth })
            }, [
              d("div", gM, [
                d("p", pM, C(l.value.label), 1)
              ]),
              d("nav", vM, [
                (v(!0), b(Q, null, st(l.value.items, (_) => (v(), b("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": c(_) ? "page" : void 0,
                  class: q(["group flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", h(_)]),
                  onClick: ($) => g(l.value, _)
                }, [
                  _.icon ? (v(), ft(la(_.icon), {
                    key: 0,
                    style: vt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : V("", !0),
                  d("span", {
                    class: "truncate",
                    style: vt({ fontSize: e.secondaryFontSize })
                  }, C(_.label), 5)
                ], 10, mM))), 128))
              ])
            ], 4)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), yM = /* @__PURE__ */ it(bM, [["__scopeId", "data-v-b510acff"]]), TM = {
  install(e) {
    e.component("KiutChartBar", de), e.component("KiutChartLine", ke), e.component("KiutPieChart", Ga), e.component("KiutBoxplotChart", rf), e.component("KiutCandlestickChart", Ni), e.component("KiutHistogramChart", Wi), e.component("KiutSankeyChart", we), e.component("KiutAgentsPerDay", _p), e.component("KiutBookingManager", l0), e.component("KiutCheckin", A0), e.component("KiutCheckinContainer", Iv), e.component("KiutCheckinMetrics", Z0), e.component("KiutCheckinSegments", Ui), e.component("KiutDisruption", pm), e.component("KiutFAQ", Sm), e.component("KiutMessagesPerAgent", Nm), e.component("KiutRecordLocator", Ki), e.component("KiutSalesByChannel", Xi), e.component("KiutSeller", Gi), e.component("KiutSellerContainer", Ub), e.component("KiutTopAgents", n1), e.component("KiutPaymentMethod", B1), e.component("KiutAgentHumanConversations", ky), e.component("KiutChannelMetrics", Py), e.component("KiutTriageCombinations", Qy), e.component("KiutSelectLanguage", c_), e.component("KiutGuardrails", P_), e.component("KiutDisruptionNotifier", D2), e.component("KiutTotalConversationsCard", P2), e.component("KiutCsatP95Card", Y2), e.component("KiutCSATContainer", Ex), e.component("KiutAiGeneratedRevenueCard", Hx), e.component("KiutNpsDailyMetrics", Qi), e.component("KiutNpsMetrics", Ji), e.component("KiutNpsOverviewMetrics", Zi), e.component("KiutAWSCost", lk), e.component("KiutCostUsage", Bk), e.component("KiutTokenUsage", Qk), e.component("KiutConversationCount", h5), e.component("KiutTopAgentsAnalysis", C5), e.component("KiutTopAgentsPie", R5), e.component("KiutDailyCostTrends", Y5), e.component("KiutModelUsage", pw), e.component("KiutMessageRoles", Fw), e.component("KiutCostPerConversations", Qw), e.component("Tabs", s$), e.component("Table", jt), e.component("Filters", E$), e.component("InputText", H$), e.component("InputTextarea", U$), e.component("InputFile", a4), e.component("InputDateTime", l4), e.component("InputTime", g4), e.component("InputRange", D4), e.component("InputNumber", F4), e.component("InputColorPicker", W4), e.component("Select", er), e.component("MultiSelect", eC), e.component("Toggle", sC), e.component("InputPhone", hC), e.component("SelectablePills", yC), e.component("SegmentedControl", wC), e.component("DateRangePicker", VC), e.component("Tag", NC), e.component("Button", Fa), e.component("Modal", tM), e.component("Section", lM), e.component("KiutAppShellNavigation", yM);
  }
};
export {
  lk as AWSCost,
  ky as AgentHumanConversations,
  _p as AgentsPerDay,
  Hx as AiGeneratedRevenueCard,
  yM as AppShellNavigation,
  l0 as BookingManager,
  rf as BoxplotChart,
  Fa as Button,
  Ex as CSATContainer,
  Ni as CandlestickChart,
  Py as ChannelMetrics,
  de as ChartBar,
  ke as ChartLine,
  A0 as Checkin,
  Iv as CheckinContainer,
  Z0 as CheckinMetrics,
  Ui as CheckinSegments,
  h5 as ConversationCount,
  Qw as CostPerConversations,
  Bk as CostUsage,
  Y2 as CsatP95Card,
  Y5 as DailyCostTrends,
  VC as DateRangePicker,
  pm as Disruption,
  D2 as DisruptionNotifier,
  Sm as FAQ,
  E$ as Filters,
  P_ as Guardrails,
  Wi as HistogramChart,
  W4 as InputColorPicker,
  l4 as InputDateTime,
  a4 as InputFile,
  F4 as InputNumber,
  hC as InputPhone,
  D4 as InputRange,
  H$ as InputText,
  U$ as InputTextarea,
  g4 as InputTime,
  TM as KiutUIPlugin,
  Fw as MessageRoles,
  Nm as MessagesPerAgent,
  tM as Modal,
  pw as ModelUsage,
  eC as MultiSelect,
  Qi as NpsDailyMetrics,
  Ji as NpsMetrics,
  Zi as NpsOverviewMetrics,
  B1 as PaymentMethod,
  Ga as PieChart,
  Ki as RecordLocator,
  Xi as SalesByChannel,
  we as SankeyChart,
  lM as Section,
  wC as SegmentedControl,
  er as Select,
  c_ as SelectLanguage,
  yC as SelectablePills,
  Gi as Seller,
  Ub as SellerContainer,
  jt as Table,
  s$ as Tabs,
  NC as Tag,
  sC as Toggle,
  Qk as TokenUsage,
  n1 as TopAgents,
  C5 as TopAgentsAnalysis,
  R5 as TopAgentsPie,
  P2 as TotalConversationsCard,
  Qy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
