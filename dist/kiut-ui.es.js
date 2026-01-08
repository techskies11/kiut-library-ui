import { defineComponent as rt, shallowRef as Hi, h as Ts, ref as $t, onMounted as Ws, onUnmounted as Ni, watch as de, toRaw as Bs, nextTick as Wi, version as Go, isProxy as Vi, computed as L, toRef as ht, createElementBlock as M, openBlock as k, createVNode as ct, unref as E, normalizeStyle as Ct, createCommentVNode as I, createElementVNode as u, toDisplayString as $, Fragment as X, renderList as ot, onBeforeUnmount as Qo, createStaticVNode as J, withDirectives as hn, vShow as un, normalizeClass as fn, createBlock as ft, createTextVNode as Je, resolveDynamicComponent as Zo } from "vue";
import * as gn from "echarts/core";
import { TooltipComponent as Jo, TitleComponent as ta } from "echarts/components";
import { SankeyChart as ea } from "echarts/charts";
import { CanvasRenderer as sa } from "echarts/renderers";
import qt from "moment";
function Re(e) {
  return e + 0.5 | 0;
}
const Nt = (e, t, s) => Math.max(Math.min(e, s), t);
function ke(e) {
  return Nt(Re(e * 2.55), 0, 255);
}
function jt(e) {
  return Nt(Re(e * 255), 0, 255);
}
function Rt(e) {
  return Nt(Re(e / 2.55) / 100, 0, 1);
}
function pn(e) {
  return Nt(Re(e * 100), 0, 100);
}
const wt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ls = [..."0123456789ABCDEF"], na = (e) => Ls[e & 15], ia = (e) => Ls[(e & 240) >> 4] + Ls[e & 15], Ie = (e) => (e & 240) >> 4 === (e & 15), oa = (e) => Ie(e.r) && Ie(e.g) && Ie(e.b) && Ie(e.a);
function aa(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & wt[e[1]] * 17,
    g: 255 & wt[e[2]] * 17,
    b: 255 & wt[e[3]] * 17,
    a: t === 5 ? wt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: wt[e[1]] << 4 | wt[e[2]],
    g: wt[e[3]] << 4 | wt[e[4]],
    b: wt[e[5]] << 4 | wt[e[6]],
    a: t === 9 ? wt[e[7]] << 4 | wt[e[8]] : 255
  })), s;
}
const ra = (e, t) => e < 255 ? t(e) : "";
function la(e) {
  var t = oa(e) ? na : ia;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + ra(e.a, t) : void 0;
}
const ca = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ji(e, t, s) {
  const n = t * Math.min(s, 1 - s), i = (o, a = (o + e / 30) % 12) => s - n * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [i(0), i(8), i(4)];
}
function da(e, t, s) {
  const n = (i, o = (i + e / 60) % 6) => s - s * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [n(5), n(3), n(1)];
}
function ha(e, t, s) {
  const n = ji(e, 1, 0.5);
  let i;
  for (t + s > 1 && (i = 1 / (t + s), t *= i, s *= i), i = 0; i < 3; i++)
    n[i] *= 1 - t - s, n[i] += t;
  return n;
}
function ua(e, t, s, n, i) {
  return e === i ? (t - s) / n + (t < s ? 6 : 0) : t === i ? (s - e) / n + 2 : (e - t) / n + 4;
}
function Vs(e) {
  const s = e.r / 255, n = e.g / 255, i = e.b / 255, o = Math.max(s, n, i), a = Math.min(s, n, i), r = (o + a) / 2;
  let l, c, d;
  return o !== a && (d = o - a, c = r > 0.5 ? d / (2 - o - a) : d / (o + a), l = ua(s, n, i, d, o), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function js(e, t, s, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, n)).map(jt);
}
function Ys(e, t, s) {
  return js(ji, e, t, s);
}
function fa(e, t, s) {
  return js(ha, e, t, s);
}
function ga(e, t, s) {
  return js(da, e, t, s);
}
function Yi(e) {
  return (e % 360 + 360) % 360;
}
function pa(e) {
  const t = ca.exec(e);
  let s = 255, n;
  if (!t)
    return;
  t[5] !== n && (s = t[6] ? ke(+t[5]) : jt(+t[5]));
  const i = Yi(+t[2]), o = +t[3] / 100, a = +t[4] / 100;
  return t[1] === "hwb" ? n = fa(i, o, a) : t[1] === "hsv" ? n = ga(i, o, a) : n = Ys(i, o, a), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: s
  };
}
function ma(e, t) {
  var s = Vs(e);
  s[0] = Yi(s[0] + t), s = Ys(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function ba(e) {
  if (!e)
    return;
  const t = Vs(e), s = t[0], n = pn(t[1]), i = pn(t[2]);
  return e.a < 255 ? `hsla(${s}, ${n}%, ${i}%, ${Rt(e.a)})` : `hsl(${s}, ${n}%, ${i}%)`;
}
const mn = {
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
}, bn = {
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
function va() {
  const e = {}, t = Object.keys(bn), s = Object.keys(mn);
  let n, i, o, a, r;
  for (n = 0; n < t.length; n++) {
    for (a = r = t[n], i = 0; i < s.length; i++)
      o = s[i], r = r.replace(o, mn[o]);
    o = parseInt(bn[a], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let ze;
function ya(e) {
  ze || (ze = va(), ze.transparent = [0, 0, 0, 0]);
  const t = ze[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const _a = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function xa(e) {
  const t = _a.exec(e);
  let s = 255, n, i, o;
  if (t) {
    if (t[7] !== n) {
      const a = +t[7];
      s = t[8] ? ke(a) : Nt(a * 255, 0, 255);
    }
    return n = +t[1], i = +t[3], o = +t[5], n = 255 & (t[2] ? ke(n) : Nt(n, 0, 255)), i = 255 & (t[4] ? ke(i) : Nt(i, 0, 255)), o = 255 & (t[6] ? ke(o) : Nt(o, 0, 255)), {
      r: n,
      g: i,
      b: o,
      a: s
    };
  }
}
function ka(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Rt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const vs = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, oe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Ma(e, t, s) {
  const n = oe(Rt(e.r)), i = oe(Rt(e.g)), o = oe(Rt(e.b));
  return {
    r: jt(vs(n + s * (oe(Rt(t.r)) - n))),
    g: jt(vs(i + s * (oe(Rt(t.g)) - i))),
    b: jt(vs(o + s * (oe(Rt(t.b)) - o))),
    a: e.a + s * (t.a - e.a)
  };
}
function He(e, t, s) {
  if (e) {
    let n = Vs(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * s, t === 0 ? 360 : 1)), n = Ys(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function qi(e, t) {
  return e && Object.assign(t || {}, e);
}
function vn(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = jt(e[3]))) : (t = qi(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = jt(t.a)), t;
}
function Sa(e) {
  return e.charAt(0) === "r" ? xa(e) : pa(e);
}
class Ae {
  constructor(t) {
    if (t instanceof Ae)
      return t;
    const s = typeof t;
    let n;
    s === "object" ? n = vn(t) : s === "string" && (n = aa(t) || ya(t) || Sa(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = qi(this._rgb);
    return t && (t.a = Rt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = vn(t);
  }
  rgbString() {
    return this._valid ? ka(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? la(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? ba(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const n = this.rgb, i = t.rgb;
      let o;
      const a = s === o ? 0.5 : s, r = 2 * a - 1, l = n.a - i.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      o = 1 - c, n.r = 255 & c * n.r + o * i.r + 0.5, n.g = 255 & c * n.g + o * i.g + 0.5, n.b = 255 & c * n.b + o * i.b + 0.5, n.a = a * n.a + (1 - a) * i.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = Ma(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Ae(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = jt(t), this;
  }
  clearer(t) {
    const s = this._rgb;
    return s.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, s = Re(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = s, this;
  }
  opaquer(t) {
    const s = this._rgb;
    return s.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return He(this._rgb, 2, t), this;
  }
  darken(t) {
    return He(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return He(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return He(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return ma(this._rgb, t), this;
  }
}
function Lt() {
}
const wa = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function K(e) {
  return e == null;
}
function lt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function q(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function vt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Pt(e, t) {
  return vt(e) ? e : t;
}
function V(e, t) {
  return typeof e > "u" ? t : e;
}
const Ca = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Ui = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function et(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function Q(e, t, s, n) {
  let i, o, a;
  if (lt(e))
    for (o = e.length, i = 0; i < o; i++)
      t.call(s, e[i], i);
  else if (q(e))
    for (a = Object.keys(e), o = a.length, i = 0; i < o; i++)
      t.call(s, e[a[i]], a[i]);
}
function ts(e, t) {
  let s, n, i, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, n = e.length; s < n; ++s)
    if (i = e[s], o = t[s], i.datasetIndex !== o.datasetIndex || i.index !== o.index)
      return !1;
  return !0;
}
function es(e) {
  if (lt(e))
    return e.map(es);
  if (q(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), n = s.length;
    let i = 0;
    for (; i < n; ++i)
      t[s[i]] = es(e[s[i]]);
    return t;
  }
  return e;
}
function Xi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Da(e, t, s, n) {
  if (!Xi(e))
    return;
  const i = t[e], o = s[e];
  q(i) && q(o) ? Pe(i, o, n) : t[e] = es(o);
}
function Pe(e, t, s) {
  const n = lt(t) ? t : [
    t
  ], i = n.length;
  if (!q(e))
    return e;
  s = s || {};
  const o = s.merger || Da;
  let a;
  for (let r = 0; r < i; ++r) {
    if (a = n[r], !q(a))
      continue;
    const l = Object.keys(a);
    for (let c = 0, d = l.length; c < d; ++c)
      o(l[c], e, a, s);
  }
  return e;
}
function we(e, t) {
  return Pe(e, t, {
    merger: $a
  });
}
function $a(e, t, s) {
  if (!Xi(e))
    return;
  const n = t[e], i = s[e];
  q(n) && q(i) ? we(n, i) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = es(i));
}
const yn = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Aa(e) {
  const t = e.split("."), s = [];
  let n = "";
  for (const i of t)
    n += i, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (s.push(n), n = "");
  return s;
}
function Pa(e) {
  const t = Aa(e);
  return (s) => {
    for (const n of t) {
      if (n === "")
        break;
      s = s && s[n];
    }
    return s;
  };
}
function te(e, t) {
  return (yn[t] || (yn[t] = Pa(t)))(e);
}
function qs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Fe = (e) => typeof e < "u", Yt = (e) => typeof e == "function", _n = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function Fa(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Z = Math.PI, nt = 2 * Z, Ta = nt + Z, ss = Number.POSITIVE_INFINITY, Ba = Z / 180, dt = Z / 2, Ut = Z / 4, xn = Z * 2 / 3, Ki = Math.log10, Bt = Math.sign;
function Ce(e, t, s) {
  return Math.abs(e - t) < s;
}
function kn(e) {
  const t = Math.round(e);
  e = Ce(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(Ki(e))), n = e / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * s;
}
function La(e) {
  const t = [], s = Math.sqrt(e);
  let n;
  for (n = 1; n < s; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return s === (s | 0) && t.push(s), t.sort((i, o) => i - o).pop(), t;
}
function Ea(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Te(e) {
  return !Ea(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Oa(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Ra(e, t, s) {
  let n, i, o;
  for (n = 0, i = e.length; n < i; n++)
    o = e[n][s], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function It(e) {
  return e * (Z / 180);
}
function Ia(e) {
  return e * (180 / Z);
}
function Mn(e) {
  if (!vt(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function Gi(e, t) {
  const s = t.x - e.x, n = t.y - e.y, i = Math.sqrt(s * s + n * n);
  let o = Math.atan2(n, s);
  return o < -0.5 * Z && (o += nt), {
    angle: o,
    distance: i
  };
}
function Es(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function za(e, t) {
  return (e - t + Ta) % nt - Z;
}
function Mt(e) {
  return (e % nt + nt) % nt;
}
function Be(e, t, s, n) {
  const i = Mt(e), o = Mt(t), a = Mt(s), r = Mt(o - i), l = Mt(a - i), c = Mt(i - o), d = Mt(i - a);
  return i === o || i === a || n && o === a || r > l && c < d;
}
function mt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Ha(e) {
  return mt(e, -32768, 32767);
}
function zt(e, t, s, n = 1e-6) {
  return e >= Math.min(t, s) - n && e <= Math.max(t, s) + n;
}
function Us(e, t, s) {
  s = s || ((a) => e[a] < t);
  let n = e.length - 1, i = 0, o;
  for (; n - i > 1; )
    o = i + n >> 1, s(o) ? i = o : n = o;
  return {
    lo: i,
    hi: n
  };
}
const Zt = (e, t, s, n) => Us(e, s, n ? (i) => {
  const o = e[i][t];
  return o < s || o === s && e[i + 1][t] === s;
} : (i) => e[i][t] < s), Na = (e, t, s) => Us(e, s, (n) => e[n][t] >= s);
function Wa(e, t, s) {
  let n = 0, i = e.length;
  for (; n < i && e[n] < t; )
    n++;
  for (; i > n && e[i - 1] > s; )
    i--;
  return n > 0 || i < e.length ? e.slice(n, i) : e;
}
const Qi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Va(e, t) {
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
  }), Qi.forEach((s) => {
    const n = "_onData" + qs(s), i = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const a = i.apply(this, o);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[n] == "function" && r[n](...o);
        }), a;
      }
    });
  });
}
function Sn(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const n = s.listeners, i = n.indexOf(t);
  i !== -1 && n.splice(i, 1), !(n.length > 0) && (Qi.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Zi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Ji = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function to(e, t) {
  let s = [], n = !1;
  return function(...i) {
    s = i, n || (n = !0, Ji.call(window, () => {
      n = !1, e.apply(t, s);
    }));
  };
}
function ja(e, t) {
  let s;
  return function(...n) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const Xs = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", pt = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, Ya = (e, t, s, n) => e === (n ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function qa(e, t, s) {
  const n = t.length;
  let i = 0, o = n;
  if (e._sorted) {
    const { iScale: a, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = a.axis, { min: h, max: f, minDefined: g, maxDefined: p } = a.getUserBounds();
    if (g) {
      if (i = Math.min(
        // @ts-expect-error Need to type _parsed
        Zt(l, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? n : Zt(t, d, a.getPixelForValue(h)).lo
      ), c) {
        const v = l.slice(0, i + 1).reverse().findIndex((b) => !K(b[r.axis]));
        i -= Math.max(0, v);
      }
      i = mt(i, 0, n - 1);
    }
    if (p) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        Zt(l, a.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : Zt(t, d, a.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const b = l.slice(v - 1).findIndex((m) => !K(m[r.axis]));
        v += Math.max(0, b);
      }
      o = mt(v, i, n) - i;
    } else
      o = n - i;
  }
  return {
    start: i,
    count: o
  };
}
function Ua(e) {
  const { xScale: t, yScale: s, _scaleRanges: n } = e, i = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!n)
    return e._scaleRanges = i, !0;
  const o = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== s.min || n.ymax !== s.max;
  return Object.assign(n, i), o;
}
const Ne = (e) => e === 0 || e === 1, wn = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * nt / s)), Cn = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * nt / s) + 1, De = {
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
  easeInSine: (e) => -Math.cos(e * dt) + 1,
  easeOutSine: (e) => Math.sin(e * dt),
  easeInOutSine: (e) => -0.5 * (Math.cos(Z * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Ne(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Ne(e) ? e : wn(e, 0.075, 0.3),
  easeOutElastic: (e) => Ne(e) ? e : Cn(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ne(e) ? e : e < 0.5 ? 0.5 * wn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Cn(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - De.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? De.easeInBounce(e * 2) * 0.5 : De.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Ks(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Dn(e) {
  return Ks(e) ? e : new Ae(e);
}
function ys(e) {
  return Ks(e) ? e : new Ae(e).saturate(0.5).darken(0.1).hexString();
}
const Xa = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Ka = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Ga(e) {
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
      properties: Ka
    },
    numbers: {
      type: "number",
      properties: Xa
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
function Qa(e) {
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
const $n = /* @__PURE__ */ new Map();
function Za(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let n = $n.get(s);
  return n || (n = new Intl.NumberFormat(e, t), $n.set(s, n)), n;
}
function Gs(e, t, s) {
  return Za(t, s).format(e);
}
const Ja = {
  values(e) {
    return lt(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let i, o = e;
    if (s.length > 1) {
      const c = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (c < 1e-4 || c > 1e15) && (i = "scientific"), o = tr(e, s);
    }
    const a = Ki(Math.abs(o)), r = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = {
      notation: i,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Gs(e, n, l);
  }
};
function tr(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var eo = {
  formatters: Ja
};
function er(e) {
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
      tickWidth: (t, s) => s.lineWidth,
      tickColor: (t, s) => s.color,
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
      callback: eo.formatters.values,
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
const ee = /* @__PURE__ */ Object.create(null), Os = /* @__PURE__ */ Object.create(null);
function $e(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let n = 0, i = s.length; n < i; ++n) {
    const o = s[n];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function _s(e, t, s) {
  return typeof t == "string" ? Pe($e(e, t), s) : Pe($e(e, ""), t);
}
class sr {
  constructor(t, s) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, i) => ys(i.backgroundColor), this.hoverBorderColor = (n, i) => ys(i.borderColor), this.hoverColor = (n, i) => ys(i.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return _s(this, t, s);
  }
  get(t) {
    return $e(this, t);
  }
  describe(t, s) {
    return _s(Os, t, s);
  }
  override(t, s) {
    return _s(ee, t, s);
  }
  route(t, s, n, i) {
    const o = $e(this, t), a = $e(this, n), r = "_" + s;
    Object.defineProperties(o, {
      [r]: {
        value: o[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], c = a[i];
          return q(l) ? Object.assign({}, c, l) : V(l, c);
        },
        set(l) {
          this[r] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((s) => s(this));
  }
}
var at = /* @__PURE__ */ new sr({
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
  Ga,
  Qa,
  er
]);
function nr(e) {
  return !e || K(e.size) || K(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function An(e, t, s, n, i) {
  let o = t[i];
  return o || (o = t[i] = e.measureText(i).width, s.push(i)), o > n && (n = o), n;
}
function Xt(e, t, s) {
  const n = e.currentDevicePixelRatio, i = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - i) * n) / n + i;
}
function Pn(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Rs(e, t, s, n) {
  so(e, t, s, n, null);
}
function so(e, t, s, n, i) {
  let o, a, r, l, c, d, h, f;
  const g = t.pointStyle, p = t.rotation, v = t.radius;
  let b = (p || 0) * Ba;
  if (g && typeof g == "object" && (o = g.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, n), e.rotate(b), e.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), e.restore();
    return;
  }
  if (!(isNaN(v) || v <= 0)) {
    switch (e.beginPath(), g) {
      // Default includes circle
      default:
        i ? e.ellipse(s, n, i / 2, v, 0, 0, nt) : e.arc(s, n, v, 0, nt), e.closePath();
        break;
      case "triangle":
        d = i ? i / 2 : v, e.moveTo(s + Math.sin(b) * d, n - Math.cos(b) * v), b += xn, e.lineTo(s + Math.sin(b) * d, n - Math.cos(b) * v), b += xn, e.lineTo(s + Math.sin(b) * d, n - Math.cos(b) * v), e.closePath();
        break;
      case "rectRounded":
        c = v * 0.516, l = v - c, a = Math.cos(b + Ut) * l, h = Math.cos(b + Ut) * (i ? i / 2 - c : l), r = Math.sin(b + Ut) * l, f = Math.sin(b + Ut) * (i ? i / 2 - c : l), e.arc(s - h, n - r, c, b - Z, b - dt), e.arc(s + f, n - a, c, b - dt, b), e.arc(s + h, n + r, c, b, b + dt), e.arc(s - f, n + a, c, b + dt, b + Z), e.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * v, d = i ? i / 2 : l, e.rect(s - d, n - l, 2 * d, 2 * l);
          break;
        }
        b += Ut;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (i ? i / 2 : v), a = Math.cos(b) * v, r = Math.sin(b) * v, f = Math.sin(b) * (i ? i / 2 : v), e.moveTo(s - h, n - r), e.lineTo(s + f, n - a), e.lineTo(s + h, n + r), e.lineTo(s - f, n + a), e.closePath();
        break;
      case "crossRot":
        b += Ut;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (i ? i / 2 : v), a = Math.cos(b) * v, r = Math.sin(b) * v, f = Math.sin(b) * (i ? i / 2 : v), e.moveTo(s - h, n - r), e.lineTo(s + h, n + r), e.moveTo(s + f, n - a), e.lineTo(s - f, n + a);
        break;
      case "star":
        h = Math.cos(b) * (i ? i / 2 : v), a = Math.cos(b) * v, r = Math.sin(b) * v, f = Math.sin(b) * (i ? i / 2 : v), e.moveTo(s - h, n - r), e.lineTo(s + h, n + r), e.moveTo(s + f, n - a), e.lineTo(s - f, n + a), b += Ut, h = Math.cos(b) * (i ? i / 2 : v), a = Math.cos(b) * v, r = Math.sin(b) * v, f = Math.sin(b) * (i ? i / 2 : v), e.moveTo(s - h, n - r), e.lineTo(s + h, n + r), e.moveTo(s + f, n - a), e.lineTo(s - f, n + a);
        break;
      case "line":
        a = i ? i / 2 : Math.cos(b) * v, r = Math.sin(b) * v, e.moveTo(s - a, n - r), e.lineTo(s + a, n + r);
        break;
      case "dash":
        e.moveTo(s, n), e.lineTo(s + Math.cos(b) * (i ? i / 2 : v), n + Math.sin(b) * v);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Le(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function rs(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ls(e) {
  e.restore();
}
function ir(e, t, s, n, i) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (i === "middle") {
    const o = (t.x + s.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, s.y);
  } else i === "after" != !!n ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function or(e, t, s, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? s.cp2x : s.cp1x, n ? s.cp2y : s.cp1y, s.x, s.y);
}
function ar(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), K(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function rr(e, t, s, n, i) {
  if (i.strikethrough || i.underline) {
    const o = e.measureText(n), a = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = s - o.actualBoundingBoxAscent, c = s + o.actualBoundingBoxDescent, d = i.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = i.decorationWidth || 2, e.moveTo(a, d), e.lineTo(r, d), e.stroke();
  }
}
function lr(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function Ee(e, t, s, n, i, o = {}) {
  const a = lt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = i.string, ar(e, o), l = 0; l < a.length; ++l)
    c = a[l], o.backdrop && lr(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), K(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, s, n, o.maxWidth)), e.fillText(c, s, n, o.maxWidth), rr(e, s, n, c, o), n += Number(i.lineHeight);
  e.restore();
}
function ns(e, t) {
  const { x: s, y: n, w: i, h: o, radius: a } = t;
  e.arc(s + a.topLeft, n + a.topLeft, a.topLeft, 1.5 * Z, Z, !0), e.lineTo(s, n + o - a.bottomLeft), e.arc(s + a.bottomLeft, n + o - a.bottomLeft, a.bottomLeft, Z, dt, !0), e.lineTo(s + i - a.bottomRight, n + o), e.arc(s + i - a.bottomRight, n + o - a.bottomRight, a.bottomRight, dt, 0, !0), e.lineTo(s + i, n + a.topRight), e.arc(s + i - a.topRight, n + a.topRight, a.topRight, 0, -dt, !0), e.lineTo(s + a.topLeft, n);
}
const cr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, dr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function hr(e, t) {
  const s = ("" + e).match(cr);
  if (!s || s[1] === "normal")
    return t * 1.2;
  switch (e = +s[2], s[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const ur = (e) => +e || 0;
function Qs(e, t) {
  const s = {}, n = q(t), i = n ? Object.keys(t) : t, o = q(e) ? n ? (a) => V(e[a], e[t[a]]) : (a) => e[a] : () => e;
  for (const a of i)
    s[a] = ur(o(a));
  return s;
}
function no(e) {
  return Qs(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function le(e) {
  return Qs(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function At(e) {
  const t = no(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function bt(e, t) {
  e = e || {}, t = t || at.font;
  let s = V(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let n = V(e.style, t.style);
  n && !("" + n).match(dr) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const i = {
    family: V(e.family, t.family),
    lineHeight: hr(V(e.lineHeight, t.lineHeight), s),
    size: s,
    style: n,
    weight: V(e.weight, t.weight),
    string: ""
  };
  return i.string = nr(i), i;
}
function We(e, t, s, n) {
  let i, o, a;
  for (i = 0, o = e.length; i < o; ++i)
    if (a = e[i], a !== void 0 && a !== void 0)
      return a;
}
function fr(e, t, s) {
  const { min: n, max: i } = e, o = Ui(t, (i - n) / 2), a = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: a(n, -Math.abs(o)),
    max: a(i, o)
  };
}
function se(e, t) {
  return Object.assign(Object.create(e), t);
}
function Zs(e, t = [
  ""
], s, n, i = () => e[0]) {
  const o = s || e;
  typeof n > "u" && (n = ro("_fallback", e));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: n,
    _getTarget: i,
    override: (r) => Zs([
      r,
      ...e
    ], t, o, n)
  };
  return new Proxy(a, {
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
      return oo(r, l, () => xr(l, t, e, r));
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
      return Tn(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Tn(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const d = r._storage || (r._storage = i());
      return r[l] = d[l] = c, delete r._keys, !0;
    }
  });
}
function he(e, t, s, n) {
  const i = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: io(e, n),
    setContext: (o) => he(e, o, s, n),
    override: (o) => he(e.override(o), t, s, n)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, a) {
      return delete o[a], delete e[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, a, r) {
      return oo(o, a, () => pr(o, a, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, a) {
      return o._descriptors.allKeys ? Reflect.has(e, a) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, a);
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
    has(o, a) {
      return Reflect.has(e, a);
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
    set(o, a, r) {
      return e[a] = r, delete o[a], !0;
    }
  });
}
function io(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: n = t.indexable, _allKeys: i = t.allKeys } = e;
  return {
    allKeys: i,
    scriptable: s,
    indexable: n,
    isScriptable: Yt(s) ? s : () => s,
    isIndexable: Yt(n) ? n : () => n
  };
}
const gr = (e, t) => e ? e + qs(t) : t, Js = (e, t) => q(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function oo(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = s();
  return e[t] = n, n;
}
function pr(e, t, s) {
  const { _proxy: n, _context: i, _subProxy: o, _descriptors: a } = e;
  let r = n[t];
  return Yt(r) && a.isScriptable(t) && (r = mr(t, r, e, s)), lt(r) && r.length && (r = br(t, r, e, a.isIndexable)), Js(t, r) && (r = he(r, i, o && o[t], a)), r;
}
function mr(e, t, s, n) {
  const { _proxy: i, _context: o, _subProxy: a, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, a || n);
  return r.delete(e), Js(e, l) && (l = tn(i._scopes, i, e, l)), l;
}
function br(e, t, s, n) {
  const { _proxy: i, _context: o, _subProxy: a, _descriptors: r } = s;
  if (typeof o.index < "u" && n(e))
    return t[o.index % t.length];
  if (q(t[0])) {
    const l = t, c = i._scopes.filter((d) => d !== l);
    t = [];
    for (const d of l) {
      const h = tn(c, i, e, d);
      t.push(he(h, o, a && a[e], r));
    }
  }
  return t;
}
function ao(e, t, s) {
  return Yt(e) ? e(t, s) : e;
}
const vr = (e, t) => e === !0 ? t : typeof e == "string" ? te(t, e) : void 0;
function yr(e, t, s, n, i) {
  for (const o of t) {
    const a = vr(s, o);
    if (a) {
      e.add(a);
      const r = ao(a._fallback, s, i);
      if (typeof r < "u" && r !== s && r !== n)
        return r;
    } else if (a === !1 && typeof n < "u" && s !== n)
      return null;
  }
  return !1;
}
function tn(e, t, s, n) {
  const i = t._rootScopes, o = ao(t._fallback, s, n), a = [
    ...e,
    ...i
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Fn(r, a, s, o || s, n);
  return l === null || typeof o < "u" && o !== s && (l = Fn(r, a, o, l, n), l === null) ? !1 : Zs(Array.from(r), [
    ""
  ], i, o, () => _r(t, s, n));
}
function Fn(e, t, s, n, i) {
  for (; s; )
    s = yr(e, t, s, n, i);
  return s;
}
function _r(e, t, s) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const i = n[t];
  return lt(i) && q(s) ? s : i || {};
}
function xr(e, t, s, n) {
  let i;
  for (const o of t)
    if (i = ro(gr(o, e), s), typeof i < "u")
      return Js(e, i) ? tn(s, n, e, i) : i;
}
function ro(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const n = s[e];
    if (typeof n < "u")
      return n;
  }
}
function Tn(e) {
  let t = e._keys;
  return t || (t = e._keys = kr(e._scopes)), t;
}
function kr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const n of Object.keys(s).filter((i) => !i.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const Mr = Number.EPSILON || 1e-14, ue = (e, t) => t < e.length && !e[t].skip && e[t], lo = (e) => e === "x" ? "y" : "x";
function Sr(e, t, s, n) {
  const i = e.skip ? t : e, o = t, a = s.skip ? t : s, r = Es(o, i), l = Es(a, o);
  let c = r / (r + l), d = l / (r + l);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = n * c, f = n * d;
  return {
    previous: {
      x: o.x - h * (a.x - i.x),
      y: o.y - h * (a.y - i.y)
    },
    next: {
      x: o.x + f * (a.x - i.x),
      y: o.y + f * (a.y - i.y)
    }
  };
}
function wr(e, t, s) {
  const n = e.length;
  let i, o, a, r, l, c = ue(e, 0);
  for (let d = 0; d < n - 1; ++d)
    if (l = c, c = ue(e, d + 1), !(!l || !c)) {
      if (Ce(t[d], 0, Mr)) {
        s[d] = s[d + 1] = 0;
        continue;
      }
      i = s[d] / t[d], o = s[d + 1] / t[d], r = Math.pow(i, 2) + Math.pow(o, 2), !(r <= 9) && (a = 3 / Math.sqrt(r), s[d] = i * a * t[d], s[d + 1] = o * a * t[d]);
    }
}
function Cr(e, t, s = "x") {
  const n = lo(s), i = e.length;
  let o, a, r, l = ue(e, 0);
  for (let c = 0; c < i; ++c) {
    if (a = r, r = l, l = ue(e, c + 1), !r)
      continue;
    const d = r[s], h = r[n];
    a && (o = (d - a[s]) / 3, r[`cp1${s}`] = d - o, r[`cp1${n}`] = h - o * t[c]), l && (o = (l[s] - d) / 3, r[`cp2${s}`] = d + o, r[`cp2${n}`] = h + o * t[c]);
  }
}
function Dr(e, t = "x") {
  const s = lo(t), n = e.length, i = Array(n).fill(0), o = Array(n);
  let a, r, l, c = ue(e, 0);
  for (a = 0; a < n; ++a)
    if (r = l, l = c, c = ue(e, a + 1), !!l) {
      if (c) {
        const d = c[t] - l[t];
        i[a] = d !== 0 ? (c[s] - l[s]) / d : 0;
      }
      o[a] = r ? c ? Bt(i[a - 1]) !== Bt(i[a]) ? 0 : (i[a - 1] + i[a]) / 2 : i[a - 1] : i[a];
    }
  wr(e, i, o), Cr(e, o, t);
}
function Ve(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function $r(e, t) {
  let s, n, i, o, a, r = Le(e[0], t);
  for (s = 0, n = e.length; s < n; ++s)
    a = o, o = r, r = s < n - 1 && Le(e[s + 1], t), o && (i = e[s], a && (i.cp1x = Ve(i.cp1x, t.left, t.right), i.cp1y = Ve(i.cp1y, t.top, t.bottom)), r && (i.cp2x = Ve(i.cp2x, t.left, t.right), i.cp2y = Ve(i.cp2y, t.top, t.bottom)));
}
function Ar(e, t, s, n, i) {
  let o, a, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Dr(e, i);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (o = 0, a = e.length; o < a; ++o)
      r = e[o], l = Sr(c, r, e[Math.min(o + 1, a - (n ? 0 : 1)) % a], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && $r(e, s);
}
function en() {
  return typeof window < "u" && typeof document < "u";
}
function sn(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function is(e, t, s) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[s])) : n = e, n;
}
const cs = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Pr(e, t) {
  return cs(e).getPropertyValue(t);
}
const Fr = [
  "top",
  "right",
  "bottom",
  "left"
];
function Jt(e, t, s) {
  const n = {};
  s = s ? "-" + s : "";
  for (let i = 0; i < 4; i++) {
    const o = Fr[i];
    n[o] = parseFloat(e[t + "-" + o + s]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Tr = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function Br(e, t) {
  const s = e.touches, n = s && s.length ? s[0] : e, { offsetX: i, offsetY: o } = n;
  let a = !1, r, l;
  if (Tr(i, o, e.target))
    r = i, l = o;
  else {
    const c = t.getBoundingClientRect();
    r = n.clientX - c.left, l = n.clientY - c.top, a = !0;
  }
  return {
    x: r,
    y: l,
    box: a
  };
}
function Gt(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: n } = t, i = cs(s), o = i.boxSizing === "border-box", a = Jt(i, "padding"), r = Jt(i, "border", "width"), { x: l, y: c, box: d } = Br(e, s), h = a.left + (d && r.left), f = a.top + (d && r.top);
  let { width: g, height: p } = t;
  return o && (g -= a.width + r.width, p -= a.height + r.height), {
    x: Math.round((l - h) / g * s.width / n),
    y: Math.round((c - f) / p * s.height / n)
  };
}
function Lr(e, t, s) {
  let n, i;
  if (t === void 0 || s === void 0) {
    const o = e && sn(e);
    if (!o)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const a = o.getBoundingClientRect(), r = cs(o), l = Jt(r, "border", "width"), c = Jt(r, "padding");
      t = a.width - c.width - l.width, s = a.height - c.height - l.height, n = is(r.maxWidth, o, "clientWidth"), i = is(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: n || ss,
    maxHeight: i || ss
  };
}
const Wt = (e) => Math.round(e * 10) / 10;
function Er(e, t, s, n) {
  const i = cs(e), o = Jt(i, "margin"), a = is(i.maxWidth, e, "clientWidth") || ss, r = is(i.maxHeight, e, "clientHeight") || ss, l = Lr(e, t, s);
  let { width: c, height: d } = l;
  if (i.boxSizing === "content-box") {
    const f = Jt(i, "border", "width"), g = Jt(i, "padding");
    c -= g.width + f.width, d -= g.height + f.height;
  }
  return c = Math.max(0, c - o.width), d = Math.max(0, n ? c / n : d - o.height), c = Wt(Math.min(c, a, l.maxWidth)), d = Wt(Math.min(d, r, l.maxHeight)), c && !d && (d = Wt(c / 2)), (t !== void 0 || s !== void 0) && n && l.height && d > l.height && (d = l.height, c = Wt(Math.floor(d * n))), {
    width: c,
    height: d
  };
}
function Bn(e, t, s) {
  const n = t || 1, i = Wt(e.height * n), o = Wt(e.width * n);
  e.height = Wt(e.height), e.width = Wt(e.width);
  const a = e.canvas;
  return a.style && (s || !a.style.height && !a.style.width) && (a.style.height = `${e.height}px`, a.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || a.height !== i || a.width !== o ? (e.currentDevicePixelRatio = n, a.height = i, a.width = o, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Or = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    en() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ln(e, t) {
  const s = Pr(e, t), n = s && s.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function Qt(e, t, s, n) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function Rr(e, t, s, n) {
  return {
    x: e.x + s * (t.x - e.x),
    y: n === "middle" ? s < 0.5 ? e.y : t.y : n === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function Ir(e, t, s, n) {
  const i = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, a = Qt(e, i, s), r = Qt(i, o, s), l = Qt(o, t, s), c = Qt(a, r, s), d = Qt(r, l, s);
  return Qt(c, d, s);
}
const zr = function(e, t) {
  return {
    x(s) {
      return e + e + t - s;
    },
    setWidth(s) {
      t = s;
    },
    textAlign(s) {
      return s === "center" ? s : s === "right" ? "left" : "right";
    },
    xPlus(s, n) {
      return s - n;
    },
    leftForLtr(s, n) {
      return s - n;
    }
  };
}, Hr = function() {
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
function ce(e, t, s) {
  return e ? zr(t, s) : Hr();
}
function co(e, t) {
  let s, n;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, n = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function ho(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function uo(e) {
  return e === "angle" ? {
    between: Be,
    compare: za,
    normalize: Mt
  } : {
    between: zt,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function En({ start: e, end: t, count: s, loop: n, style: i }) {
  return {
    start: e % s,
    end: t % s,
    loop: n && (t - e + 1) % s === 0,
    style: i
  };
}
function Nr(e, t, s) {
  const { property: n, start: i, end: o } = s, { between: a, normalize: r } = uo(n), l = t.length;
  let { start: c, end: d, loop: h } = e, f, g;
  if (h) {
    for (c += l, d += l, f = 0, g = l; f < g && a(r(t[c % l][n]), i, o); ++f)
      c--, d--;
    c %= l, d %= l;
  }
  return d < c && (d += l), {
    start: c,
    end: d,
    loop: h,
    style: e.style
  };
}
function fo(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: n, start: i, end: o } = s, a = t.length, { compare: r, between: l, normalize: c } = uo(n), { start: d, end: h, loop: f, style: g } = Nr(e, t, s), p = [];
  let v = !1, b = null, m, y, _;
  const x = () => l(i, _, m) && r(i, _) !== 0, S = () => r(o, m) === 0 || l(o, _, m), C = () => v || x(), w = () => !v || S();
  for (let D = d, P = d; D <= h; ++D)
    y = t[D % a], !y.skip && (m = c(y[n]), m !== _ && (v = l(m, i, o), b === null && C() && (b = r(m, i) === 0 ? D : P), b !== null && w() && (p.push(En({
      start: b,
      end: D,
      loop: f,
      count: a,
      style: g
    })), b = null), P = D, _ = m));
  return b !== null && p.push(En({
    start: b,
    end: h,
    loop: f,
    count: a,
    style: g
  })), p;
}
function go(e, t) {
  const s = [], n = e.segments;
  for (let i = 0; i < n.length; i++) {
    const o = fo(n[i], e.points, t);
    o.length && s.push(...o);
  }
  return s;
}
function Wr(e, t, s, n) {
  let i = 0, o = t - 1;
  if (s && !n)
    for (; i < t && !e[i].skip; )
      i++;
  for (; i < t && e[i].skip; )
    i++;
  for (i %= t, s && (o += i); o > i && e[o % t].skip; )
    o--;
  return o %= t, {
    start: i,
    end: o
  };
}
function Vr(e, t, s, n) {
  const i = e.length, o = [];
  let a = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const c = e[l % i];
    c.skip || c.stop ? r.skip || (n = !1, o.push({
      start: t % i,
      end: (l - 1) % i,
      loop: n
    }), t = a = c.stop ? l : null) : (a = l, r.skip && (t = l)), r = c;
  }
  return a !== null && o.push({
    start: t % i,
    end: a % i,
    loop: n
  }), o;
}
function jr(e, t) {
  const s = e.points, n = e.options.spanGaps, i = s.length;
  if (!i)
    return [];
  const o = !!e._loop, { start: a, end: r } = Wr(s, i, o, n);
  if (n === !0)
    return On(e, [
      {
        start: a,
        end: r,
        loop: o
      }
    ], s, t);
  const l = r < a ? r + i : r, c = !!e._fullLoop && a === 0 && r === i - 1;
  return On(e, Vr(s, a, l, c), s, t);
}
function On(e, t, s, n) {
  return !n || !n.setContext || !s ? t : Yr(e, t, s, n);
}
function Yr(e, t, s, n) {
  const i = e._chart.getContext(), o = Rn(e.options), { _datasetIndex: a, options: { spanGaps: r } } = e, l = s.length, c = [];
  let d = o, h = t[0].start, f = h;
  function g(p, v, b, m) {
    const y = r ? -1 : 1;
    if (p !== v) {
      for (p += l; s[p % l].skip; )
        p -= y;
      for (; s[v % l].skip; )
        v += y;
      p % l !== v % l && (c.push({
        start: p % l,
        end: v % l,
        loop: b,
        style: m
      }), d = m, h = v % l);
    }
  }
  for (const p of t) {
    h = r ? h : p.start;
    let v = s[h % l], b;
    for (f = h + 1; f <= p.end; f++) {
      const m = s[f % l];
      b = Rn(n.setContext(se(i, {
        type: "segment",
        p0: v,
        p1: m,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: a
      }))), qr(b, d) && g(h, f - 1, p.loop, d), v = m, d = b;
    }
    h < f - 1 && g(h, f - 1, p.loop, d);
  }
  return c;
}
function Rn(e) {
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
function qr(e, t) {
  if (!t)
    return !1;
  const s = [], n = function(i, o) {
    return Ks(o) ? (s.includes(o) || s.push(o), s.indexOf(o)) : o;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function je(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function Ur(e, t) {
  const { xScale: s, yScale: n } = e;
  return s && n ? {
    left: je(s, t, "left"),
    right: je(s, t, "right"),
    top: je(n, t, "top"),
    bottom: je(n, t, "bottom")
  } : t;
}
function po(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const n = Ur(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : n.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : n.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : n.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : n.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class Xr {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, s, n, i) {
    const o = s.listeners[i], a = s.duration;
    o.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: a,
      currentStep: Math.min(n - s.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Ji.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((n, i) => {
      if (!n.running || !n.items.length)
        return;
      const o = n.items;
      let a = o.length - 1, r = !1, l;
      for (; a >= 0; --a)
        l = o[a], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(t), r = !0) : (o[a] = o[o.length - 1], o.pop());
      r && (i.draw(), this._notify(i, n, t, "progress")), o.length || (n.running = !1, this._notify(i, n, t, "complete"), n.initial = !1), s += o.length;
    }), this._lastDate = t, s === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const s = this._charts;
    let n = s.get(t);
    return n || (n = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, s.set(t, n)), n;
  }
  listen(t, s, n) {
    this._getAnims(t).listeners[s].push(n);
  }
  add(t, s) {
    !s || !s.length || this._getAnims(t).items.push(...s);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const s = this._charts.get(t);
    s && (s.running = !0, s.start = Date.now(), s.duration = s.items.reduce((n, i) => Math.max(n, i._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const s = this._charts.get(t);
    return !(!s || !s.running || !s.items.length);
  }
  stop(t) {
    const s = this._charts.get(t);
    if (!s || !s.items.length)
      return;
    const n = s.items;
    let i = n.length - 1;
    for (; i >= 0; --i)
      n[i].cancel();
    s.items = [], this._notify(t, s, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Et = /* @__PURE__ */ new Xr();
const In = "transparent", Kr = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const n = Dn(e || In), i = n.valid && Dn(t || In);
    return i && i.valid ? i.mix(n, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class Gr {
  constructor(t, s, n, i) {
    const o = s[n];
    i = We([
      t.to,
      i,
      o,
      t.from
    ]);
    const a = We([
      t.from,
      o,
      i
    ]);
    this._active = !0, this._fn = t.fn || Kr[t.type || typeof a], this._easing = De[t.easing] || De.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = n, this._from = a, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, n) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], o = n - this._start, a = this._duration - o;
      this._start = n, this._duration = Math.floor(Math.max(a, t.duration)), this._total += o, this._loop = !!t.loop, this._to = We([
        t.to,
        s,
        i,
        t.from
      ]), this._from = We([
        t.from,
        i,
        s
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const s = t - this._start, n = this._duration, i = this._prop, o = this._from, a = this._loop, r = this._to;
    let l;
    if (this._active = o !== r && (a || s < n), !this._active) {
      this._target[i] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[i] = o;
      return;
    }
    l = s / n % 2, l = a && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[i] = this._fn(o, r, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((s, n) => {
      t.push({
        res: s,
        rej: n
      });
    });
  }
  _notify(t) {
    const s = t ? "res" : "rej", n = this._promises || [];
    for (let i = 0; i < n.length; i++)
      n[i][s]();
  }
}
class mo {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!q(t))
      return;
    const s = Object.keys(at.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((i) => {
      const o = t[i];
      if (!q(o))
        return;
      const a = {};
      for (const r of s)
        a[r] = o[r];
      (lt(o.properties) && o.properties || [
        i
      ]).forEach((r) => {
        (r === i || !n.has(r)) && n.set(r, a);
      });
    });
  }
  _animateOptions(t, s) {
    const n = s.options, i = Zr(t, n);
    if (!i)
      return [];
    const o = this._createAnimations(i, n);
    return n.$shared && Qr(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), o;
  }
  _createAnimations(t, s) {
    const n = this._properties, i = [], o = t.$animations || (t.$animations = {}), a = Object.keys(s), r = Date.now();
    let l;
    for (l = a.length - 1; l >= 0; --l) {
      const c = a[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        i.push(...this._animateOptions(t, s));
        continue;
      }
      const d = s[c];
      let h = o[c];
      const f = n.get(c);
      if (h)
        if (f && h.active()) {
          h.update(f, d, r);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[c] = d;
        continue;
      }
      o[c] = h = new Gr(f, t, c, d), i.push(h);
    }
    return i;
  }
  update(t, s) {
    if (this._properties.size === 0) {
      Object.assign(t, s);
      return;
    }
    const n = this._createAnimations(t, s);
    if (n.length)
      return Et.add(this._chart, n), !0;
  }
}
function Qr(e, t) {
  const s = [], n = Object.keys(t);
  for (let i = 0; i < n.length; i++) {
    const o = e[n[i]];
    o && o.active() && s.push(o.wait());
  }
  return Promise.all(s);
}
function Zr(e, t) {
  if (!t)
    return;
  let s = e.options;
  if (!s) {
    e.options = t;
    return;
  }
  return s.$shared && (e.options = s = Object.assign({}, s, {
    $shared: !1,
    $animations: {}
  })), s;
}
function zn(e, t) {
  const s = e && e.options || {}, n = s.reverse, i = s.min === void 0 ? t : 0, o = s.max === void 0 ? t : 0;
  return {
    start: n ? o : i,
    end: n ? i : o
  };
}
function Jr(e, t, s) {
  if (s === !1)
    return !1;
  const n = zn(e, s), i = zn(t, s);
  return {
    top: i.end,
    right: n.end,
    bottom: i.start,
    left: n.start
  };
}
function tl(e) {
  let t, s, n, i;
  return q(e) ? (t = e.top, s = e.right, n = e.bottom, i = e.left) : t = s = n = i = e, {
    top: t,
    right: s,
    bottom: n,
    left: i,
    disabled: e === !1
  };
}
function bo(e, t) {
  const s = [], n = e._getSortedDatasetMetas(t);
  let i, o;
  for (i = 0, o = n.length; i < o; ++i)
    s.push(n[i].index);
  return s;
}
function Hn(e, t, s, n = {}) {
  const i = e.keys, o = n.mode === "single";
  let a, r, l, c;
  if (t === null)
    return;
  let d = !1;
  for (a = 0, r = i.length; a < r; ++a) {
    if (l = +i[a], l === s) {
      if (d = !0, n.all)
        continue;
      break;
    }
    c = e.values[l], vt(c) && (o || t === 0 || Bt(t) === Bt(c)) && (t += c);
  }
  return !d && !n.all ? 0 : t;
}
function el(e, t) {
  const { iScale: s, vScale: n } = t, i = s.axis === "x" ? "x" : "y", o = n.axis === "x" ? "x" : "y", a = Object.keys(e), r = new Array(a.length);
  let l, c, d;
  for (l = 0, c = a.length; l < c; ++l)
    d = a[l], r[l] = {
      [i]: d,
      [o]: e[d]
    };
  return r;
}
function xs(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function sl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function nl(e) {
  const { min: t, max: s, minDefined: n, maxDefined: i } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: i ? s : Number.POSITIVE_INFINITY
  };
}
function il(e, t, s) {
  const n = e[t] || (e[t] = {});
  return n[s] || (n[s] = {});
}
function Nn(e, t, s, n) {
  for (const i of t.getMatchingVisibleMetas(n).reverse()) {
    const o = e[i.index];
    if (s && o > 0 || !s && o < 0)
      return i.index;
  }
  return null;
}
function Wn(e, t) {
  const { chart: s, _cachedMeta: n } = e, i = s._stacks || (s._stacks = {}), { iScale: o, vScale: a, index: r } = n, l = o.axis, c = a.axis, d = sl(o, a, n), h = t.length;
  let f;
  for (let g = 0; g < h; ++g) {
    const p = t[g], { [l]: v, [c]: b } = p, m = p._stacks || (p._stacks = {});
    f = m[c] = il(i, d, v), f[r] = b, f._top = Nn(f, a, !0, n.type), f._bottom = Nn(f, a, !1, n.type);
    const y = f._visualValues || (f._visualValues = {});
    y[r] = b;
  }
}
function ks(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((n) => s[n].axis === t).shift();
}
function ol(e, t) {
  return se(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function al(e, t, s) {
  return se(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: s,
    index: t,
    mode: "default",
    type: "data"
  });
}
function me(e, t) {
  const s = e.controller.index, n = e.vScale && e.vScale.axis;
  if (n) {
    t = t || e._parsed;
    for (const i of t) {
      const o = i._stacks;
      if (!o || o[n] === void 0 || o[n][s] === void 0)
        return;
      delete o[n][s], o[n]._visualValues !== void 0 && o[n]._visualValues[s] !== void 0 && delete o[n]._visualValues[s];
    }
  }
}
const Ms = (e) => e === "reset" || e === "none", Vn = (e, t) => t ? e : Object.assign({}, e), rl = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: bo(s, !0),
  values: null
};
class ds {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, s) {
    this.chart = t, this._ctx = t.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = xs(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && me(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, n = this.getDataset(), i = (h, f, g, p) => h === "x" ? f : h === "r" ? p : g, o = s.xAxisID = V(n.xAxisID, ks(t, "x")), a = s.yAxisID = V(n.yAxisID, ks(t, "y")), r = s.rAxisID = V(n.rAxisID, ks(t, "r")), l = s.indexAxis, c = s.iAxisID = i(l, o, a, r), d = s.vAxisID = i(l, a, o, r);
    s.xScale = this.getScaleForId(o), s.yScale = this.getScaleForId(a), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(c), s.vScale = this.getScaleForId(d);
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
    const s = this._cachedMeta;
    return t === s.iScale ? s.vScale : s.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Sn(this._data, this), t._stacked && me(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), n = this._data;
    if (q(s)) {
      const i = this._cachedMeta;
      this._data = el(s, i);
    } else if (n !== s) {
      if (n) {
        Sn(n, this);
        const i = this._cachedMeta;
        me(i), i._parsed = [];
      }
      s && Object.isExtensible(s) && Va(s, this), this._syncList = [], this._data = s;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const s = this._cachedMeta, n = this.getDataset();
    let i = !1;
    this._dataCheck();
    const o = s._stacked;
    s._stacked = xs(s.vScale, s), s.stack !== n.stack && (i = !0, me(s), s.stack = n.stack), this._resyncElements(t), (i || o !== s._stacked) && (Wn(this, s._parsed), s._stacked = xs(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: n, _data: i } = this, { iScale: o, _stacked: a } = n, r = o.axis;
    let l = t === 0 && s === i.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], d, h, f;
    if (this._parsing === !1)
      n._parsed = i, n._sorted = !0, f = i;
    else {
      lt(i[t]) ? f = this.parseArrayData(n, i, t, s) : q(i[t]) ? f = this.parseObjectData(n, i, t, s) : f = this.parsePrimitiveData(n, i, t, s);
      const g = () => h[r] === null || c && h[r] < c[r];
      for (d = 0; d < s; ++d)
        n._parsed[d + t] = h = f[d], l && (g() && (l = !1), c = h);
      n._sorted = l;
    }
    a && Wn(this, f);
  }
  parsePrimitiveData(t, s, n, i) {
    const { iScale: o, vScale: a } = t, r = o.axis, l = a.axis, c = o.getLabels(), d = o === a, h = new Array(i);
    let f, g, p;
    for (f = 0, g = i; f < g; ++f)
      p = f + n, h[f] = {
        [r]: d || o.parse(c[p], p),
        [l]: a.parse(s[p], p)
      };
    return h;
  }
  parseArrayData(t, s, n, i) {
    const { xScale: o, yScale: a } = t, r = new Array(i);
    let l, c, d, h;
    for (l = 0, c = i; l < c; ++l)
      d = l + n, h = s[d], r[l] = {
        x: o.parse(h[0], d),
        y: a.parse(h[1], d)
      };
    return r;
  }
  parseObjectData(t, s, n, i) {
    const { xScale: o, yScale: a } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(i);
    let d, h, f, g;
    for (d = 0, h = i; d < h; ++d)
      f = d + n, g = s[f], c[d] = {
        x: o.parse(te(g, r), f),
        y: a.parse(te(g, l), f)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, s, n) {
    const i = this.chart, o = this._cachedMeta, a = s[t.axis], r = {
      keys: bo(i, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return Hn(r, a, o.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, s, n, i) {
    const o = n[s.axis];
    let a = o === null ? NaN : o;
    const r = i && n._stacks[s.axis];
    i && r && (i.values = r, a = Hn(i, o, this._cachedMeta.index)), t.min = Math.min(t.min, a), t.max = Math.max(t.max, a);
  }
  getMinMax(t, s) {
    const n = this._cachedMeta, i = n._parsed, o = n._sorted && t === n.iScale, a = i.length, r = this._getOtherScale(t), l = rl(s, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = nl(r);
    let f, g;
    function p() {
      g = i[f];
      const v = g[r.axis];
      return !vt(g[t.axis]) || d > v || h < v;
    }
    for (f = 0; f < a && !(!p() && (this.updateRangeFromParsed(c, t, g, l), o)); ++f)
      ;
    if (o) {
      for (f = a - 1; f >= 0; --f)
        if (!p()) {
          this.updateRangeFromParsed(c, t, g, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, n = [];
    let i, o, a;
    for (i = 0, o = s.length; i < o; ++i)
      a = s[i][t.axis], vt(a) && n.push(a);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, n = s.iScale, i = s.vScale, o = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(o[n.axis]) : "",
      value: i ? "" + i.getLabelForValue(o[i.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = tl(V(this.options.clip, Jr(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, n = this._cachedMeta, i = n.data || [], o = s.chartArea, a = [], r = this._drawStart || 0, l = this._drawCount || i.length - r, c = this.options.drawActiveElementsOnTop;
    let d;
    for (n.dataset && n.dataset.draw(t, o, r, l), d = r; d < r + l; ++d) {
      const h = i[d];
      h.hidden || (h.active && c ? a.push(h) : h.draw(t, o));
    }
    for (d = 0; d < a.length; ++d)
      a[d].draw(t, o);
  }
  getStyle(t, s) {
    const n = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, s, n) {
    const i = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[t];
      o = a.$context || (a.$context = al(this.getContext(), t, a)), o.parsed = this.getParsed(t), o.raw = i.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = ol(this.chart.getContext(), this.index)), o.dataset = i, o.index = o.datasetIndex = this.index;
    return o.active = !!s, o.mode = n, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", n) {
    const i = s === "active", o = this._cachedDataOpts, a = t + "-" + s, r = o[a], l = this.enableOptionSharing && Fe(n);
    if (r)
      return Vn(r, l);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = i ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), d), g = Object.keys(at.elements[t]), p = () => this.getContext(n, i, s), v = c.resolveNamedOptions(f, g, p, h);
    return v.$shared && (v.$shared = l, o[a] = Object.freeze(Vn(v, l))), v;
  }
  _resolveAnimations(t, s, n) {
    const i = this.chart, o = this._cachedDataOpts, a = `animation-${s}`, r = o[a];
    if (r)
      return r;
    let l;
    if (i.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, s), f = d.getOptionScopes(this.getDataset(), h);
      l = d.createResolver(f, this.getContext(t, n, s));
    }
    const c = new mo(i, l && l.animations);
    return l && l._cacheable && (o[a] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || Ms(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const n = this.resolveDataElementOptions(t, s), i = this._sharedOptions, o = this.getSharedOptions(n), a = this.includeOptions(s, o) || o !== i;
    return this.updateSharedOptions(o, s, n), {
      sharedOptions: o,
      includeOptions: a
    };
  }
  updateElement(t, s, n, i) {
    Ms(i) ? Object.assign(t, n) : this._resolveAnimations(s, i).update(t, n);
  }
  updateSharedOptions(t, s, n) {
    t && !Ms(s) && this._resolveAnimations(void 0, s).update(t, n);
  }
  _setStyle(t, s, n, i) {
    t.active = i;
    const o = this.getStyle(s, i);
    this._resolveAnimations(s, n, i).update(t, {
      options: !i && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, s, n) {
    this._setStyle(t, n, "active", !1);
  }
  setHoverStyle(t, s, n) {
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
    const s = this._data, n = this._cachedMeta.data;
    for (const [r, l, c] of this._syncList)
      this[r](l, c);
    this._syncList = [];
    const i = n.length, o = s.length, a = Math.min(o, i);
    a && this.parse(0, a), o > i ? this._insertElements(i, o - i, t) : o < i && this._removeElements(o, i - o);
  }
  _insertElements(t, s, n = !0) {
    const i = this._cachedMeta, o = i.data, a = t + s;
    let r;
    const l = (c) => {
      for (c.length += s, r = c.length - 1; r >= a; r--)
        c[r] = c[r - s];
    };
    for (l(o), r = t; r < a; ++r)
      o[r] = new this.dataElementType();
    this._parsing && l(i._parsed), this.parse(t, s), n && this.updateElements(o, t, s, "reset");
  }
  updateElements(t, s, n, i) {
  }
  _removeElements(t, s) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const i = n._parsed.splice(t, s);
      n._stacked && me(n, i);
    }
    n.data.splice(t, s);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [s, n, i] = t;
      this[s](n, i);
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
  _onDataSplice(t, s) {
    s && this._sync([
      "_removeElements",
      t,
      s
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
function ll(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let i = 0, o = s.length; i < o; i++)
      n = n.concat(s[i].controller.getAllParsedValues(e));
    e._cache.$bar = Zi(n.sort((i, o) => i - o));
  }
  return e._cache.$bar;
}
function cl(e) {
  const t = e.iScale, s = ll(t, e.type);
  let n = t._length, i, o, a, r;
  const l = () => {
    a === 32767 || a === -32768 || (Fe(r) && (n = Math.min(n, Math.abs(a - r) || n)), r = a);
  };
  for (i = 0, o = s.length; i < o; ++i)
    a = t.getPixelForValue(s[i]), l();
  for (r = void 0, i = 0, o = t.ticks.length; i < o; ++i)
    a = t.getPixelForTick(i), l();
  return n;
}
function dl(e, t, s, n) {
  const i = s.barThickness;
  let o, a;
  return K(i) ? (o = t.min * s.categoryPercentage, a = s.barPercentage) : (o = i * n, a = 1), {
    chunk: o / n,
    ratio: a,
    start: t.pixels[e] - o / 2
  };
}
function hl(e, t, s, n) {
  const i = t.pixels, o = i[e];
  let a = e > 0 ? i[e - 1] : null, r = e < i.length - 1 ? i[e + 1] : null;
  const l = s.categoryPercentage;
  a === null && (a = o - (r === null ? t.end - t.start : r - o)), r === null && (r = o + o - a);
  const c = o - (o - Math.min(a, r)) / 2 * l;
  return {
    chunk: Math.abs(r - a) / 2 * l / n,
    ratio: s.barPercentage,
    start: c
  };
}
function ul(e, t, s, n) {
  const i = s.parse(e[0], n), o = s.parse(e[1], n), a = Math.min(i, o), r = Math.max(i, o);
  let l = a, c = r;
  Math.abs(a) > Math.abs(r) && (l = r, c = a), t[s.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: i,
    end: o,
    min: a,
    max: r
  };
}
function vo(e, t, s, n) {
  return lt(e) ? ul(e, t, s, n) : t[s.axis] = s.parse(e, n), t;
}
function jn(e, t, s, n) {
  const i = e.iScale, o = e.vScale, a = i.getLabels(), r = i === o, l = [];
  let c, d, h, f;
  for (c = s, d = s + n; c < d; ++c)
    f = t[c], h = {}, h[i.axis] = r || i.parse(a[c], c), l.push(vo(f, h, o, c));
  return l;
}
function Ss(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function fl(e, t, s) {
  return e !== 0 ? Bt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function gl(e) {
  let t, s, n, i, o;
  return e.horizontal ? (t = e.base > e.x, s = "left", n = "right") : (t = e.base < e.y, s = "bottom", n = "top"), t ? (i = "end", o = "start") : (i = "start", o = "end"), {
    start: s,
    end: n,
    reverse: t,
    top: i,
    bottom: o
  };
}
function pl(e, t, s, n) {
  let i = t.borderSkipped;
  const o = {};
  if (!i) {
    e.borderSkipped = o;
    return;
  }
  if (i === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: a, end: r, reverse: l, top: c, bottom: d } = gl(e);
  i === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === n ? i = c : (s._bottom || 0) === n ? i = d : (o[Yn(d, a, r, l)] = !0, i = c)), o[Yn(i, a, r, l)] = !0, e.borderSkipped = o;
}
function Yn(e, t, s, n) {
  return n ? (e = ml(e, t, s), e = qn(e, s, t)) : e = qn(e, t, s), e;
}
function ml(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function qn(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function bl(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class vl extends ds {
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
  parsePrimitiveData(t, s, n, i) {
    return jn(t, s, n, i);
  }
  parseArrayData(t, s, n, i) {
    return jn(t, s, n, i);
  }
  parseObjectData(t, s, n, i) {
    const { iScale: o, vScale: a } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? r : l, d = a.axis === "x" ? r : l, h = [];
    let f, g, p, v;
    for (f = n, g = n + i; f < g; ++f)
      v = s[f], p = {}, p[o.axis] = o.parse(te(v, c), f), h.push(vo(te(v, d), p, a, f));
    return h;
  }
  updateRangeFromParsed(t, s, n, i) {
    super.updateRangeFromParsed(t, s, n, i);
    const o = n._custom;
    o && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: n, vScale: i } = s, o = this.getParsed(t), a = o._custom, r = Ss(a) ? "[" + a.start + ", " + a.end + "]" : "" + i.getLabelForValue(o[i.axis]);
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
    const s = this._cachedMeta;
    this.updateElements(s.data, 0, s.data.length, t);
  }
  updateElements(t, s, n, i) {
    const o = i === "reset", { index: a, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(s, i);
    for (let g = s; g < s + n; g++) {
      const p = this.getParsed(g), v = o || K(p[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(g), b = this._calculateBarIndexPixels(g, d), m = (p._stacks || {})[r.axis], y = {
        horizontal: c,
        base: v.base,
        enableBorderRadius: !m || Ss(p._custom) || a === m._top || a === m._bottom,
        x: c ? v.head : b.center,
        y: c ? b.center : v.head,
        height: c ? b.size : Math.abs(v.size),
        width: c ? Math.abs(v.size) : b.size
      };
      f && (y.options = h || this.resolveDataElementOptions(g, t[g].active ? "active" : i));
      const _ = y.options || t[g].options;
      pl(y, _, m, a), bl(y, _, d.ratio), this.updateElement(t[g], g, y, i);
    }
  }
  _getStacks(t, s) {
    const { iScale: n } = this._cachedMeta, i = n.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), o = n.options.stacked, a = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[n.axis], c = (d) => {
      const h = d._parsed.find((g) => g[n.axis] === l), f = h && h[d.vScale.axis];
      if (K(f) || isNaN(f))
        return !0;
    };
    for (const d of i)
      if (!(s !== void 0 && c(d)) && ((o === !1 || a.indexOf(d.stack) === -1 || o === void 0 && d.stack === void 0) && a.push(d.stack), d.index === t))
        break;
    return a.length || a.push(void 0), a;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, s = this.chart.options.indexAxis;
    return Object.keys(t).filter((n) => t[n].axis === s).shift();
  }
  _getAxis() {
    const t = {}, s = this.getFirstScaleIdForIndexAxis();
    for (const n of this.chart.data.datasets)
      t[V(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, n) {
    const i = this._getStacks(t, n), o = s !== void 0 ? i.indexOf(s) : -1;
    return o === -1 ? i.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, n = s.iScale, i = [];
    let o, a;
    for (o = 0, a = s.data.length; o < a; ++o)
      i.push(n.getPixelForValue(this.getParsed(o)[n.axis], o));
    const r = t.barThickness;
    return {
      min: r || cl(s),
      pixels: i,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: s, _stacked: n, index: i }, options: { base: o, minBarLength: a } } = this, r = o || 0, l = this.getParsed(t), c = l._custom, d = Ss(c);
    let h = l[s.axis], f = 0, g = n ? this.applyStack(s, l, n) : h, p, v;
    g !== h && (f = g - h, g = h), d && (h = c.barStart, g = c.barEnd - c.barStart, h !== 0 && Bt(h) !== Bt(c.barEnd) && (f = 0), f += h);
    const b = !K(o) && !d ? o : f;
    let m = s.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? p = s.getPixelForValue(f + g) : p = m, v = p - m, Math.abs(v) < a) {
      v = fl(v, s, r) * a, h === r && (m -= v / 2);
      const y = s.getPixelForDecimal(0), _ = s.getPixelForDecimal(1), x = Math.min(y, _), S = Math.max(y, _);
      m = Math.max(Math.min(m, S), x), p = m + v, n && !d && (l._stacks[s.axis]._visualValues[i] = s.getValueForPixel(p) - s.getValueForPixel(m));
    }
    if (m === s.getPixelForValue(r)) {
      const y = Bt(v) * s.getLineWidthForValue(r) / 2;
      m += y, v -= y;
    }
    return {
      size: v,
      base: m,
      head: p,
      center: p + v / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const n = s.scale, i = this.options, o = i.skipNull, a = V(i.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (s.grouped) {
      const d = o ? this._getStackCount(t) : s.stackCount, h = i.barThickness === "flex" ? hl(t, s, i, d * c) : dl(t, s, i, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(V(f, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + g;
      r = h.start + h.chunk * p + h.chunk / 2, l = Math.min(a, h.chunk * h.ratio);
    } else
      r = n.getPixelForValue(this.getParsed(t)[n.axis], t), l = Math.min(a, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, s = t.vScale, n = t.data, i = n.length;
    let o = 0;
    for (; o < i; ++o)
      this.getParsed(o)[s.axis] !== null && !n[o].hidden && n[o].draw(this._ctx);
  }
}
function yl(e, t, s) {
  let n = 1, i = 1, o = 0, a = 0;
  if (t < nt) {
    const r = e, l = r + t, c = Math.cos(r), d = Math.sin(r), h = Math.cos(l), f = Math.sin(l), g = (_, x, S) => Be(_, r, l, !0) ? 1 : Math.max(x, x * s, S, S * s), p = (_, x, S) => Be(_, r, l, !0) ? -1 : Math.min(x, x * s, S, S * s), v = g(0, c, h), b = g(dt, d, f), m = p(Z, c, h), y = p(Z + dt, d, f);
    n = (v - m) / 2, i = (b - y) / 2, o = -(v + m) / 2, a = -(b + y) / 2;
  }
  return {
    ratioX: n,
    ratioY: i,
    offsetX: o,
    offsetY: a
  };
}
class _l extends ds {
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
            const s = t.data, { labels: { pointStyle: n, textAlign: i, color: o, useBorderRadius: a, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: h.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(c),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: i,
                pointStyle: n,
                borderRadius: a && (r || h.borderRadius),
                index: c
              };
            }) : [];
          }
        },
        onClick(t, s, n) {
          n.chart.toggleDataVisibility(s.index), n.chart.update();
        }
      }
    }
  };
  constructor(t, s) {
    super(t, s), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, s) {
    const n = this.getDataset().data, i = this._cachedMeta;
    if (this._parsing === !1)
      i._parsed = n;
    else {
      let o = (l) => +n[l];
      if (q(n[t])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +te(n[c], l);
      }
      let a, r;
      for (a = t, r = t + s; a < r; ++a)
        i._parsed[a] = o(a);
    }
  }
  _getRotation() {
    return It(this.options.rotation - 90);
  }
  _getCircumference() {
    return It(this.options.circumference);
  }
  _getRotationExtents() {
    let t = nt, s = -nt;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const i = this.chart.getDatasetMeta(n).controller, o = i._getRotation(), a = i._getCircumference();
        t = Math.min(t, o), s = Math.max(s, o + a);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: n } = s, i = this._cachedMeta, o = i.data, a = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - a) / 2, 0), l = Math.min(Ca(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: g, offsetX: p, offsetY: v } = yl(h, d, l), b = (n.width - a) / f, m = (n.height - a) / g, y = Math.max(Math.min(b, m) / 2, 0), _ = Ui(this.options.radius, y), x = Math.max(_ * l, 0), S = (_ - x) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * _, this.offsetY = v * _, i.total = this.calculateTotal(), this.outerRadius = _ - S * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - S * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, s) {
    const n = this.options, i = this._cachedMeta, o = this._getCircumference();
    return s && n.animation.animateRotate || !this.chart.getDataVisibility(t) || i._parsed[t] === null || i.data[t].hidden ? 0 : this.calculateCircumference(i._parsed[t] * o / nt);
  }
  updateElements(t, s, n, i) {
    const o = i === "reset", a = this.chart, r = a.chartArea, c = a.options.animation, d = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = o && c.animateScale, g = f ? 0 : this.innerRadius, p = f ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: b } = this._getSharedOptions(s, i);
    let m = this._getRotation(), y;
    for (y = 0; y < s; ++y)
      m += this._circumference(y, o);
    for (y = s; y < s + n; ++y) {
      const _ = this._circumference(y, o), x = t[y], S = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: m,
        endAngle: m + _,
        circumference: _,
        outerRadius: p,
        innerRadius: g
      };
      b && (S.options = v || this.resolveDataElementOptions(y, x.active ? "active" : i)), m += _, this.updateElement(x, y, S, i);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let n = 0, i;
    for (i = 0; i < s.length; i++) {
      const o = t._parsed[i];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(i) && !s[i].hidden && (n += Math.abs(o));
    }
    return n;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? nt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], o = Gs(s._parsed[t], n.options.locale);
    return {
      label: i[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const n = this.chart;
    let i, o, a, r, l;
    if (!t) {
      for (i = 0, o = n.data.datasets.length; i < o; ++i)
        if (n.isDatasetVisible(i)) {
          a = n.getDatasetMeta(i), t = a.data, r = a.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (i = 0, o = t.length; i < o; ++i)
      l = r.resolveDataElementOptions(i), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let n = 0, i = t.length; n < i; ++n) {
      const o = this.resolveDataElementOptions(n);
      s = Math.max(s, o.offset || 0, o.hoverOffset || 0);
    }
    return s;
  }
  _getRingWeightOffset(t) {
    let s = 0;
    for (let n = 0; n < t; ++n)
      this.chart.isDatasetVisible(n) && (s += this._getRingWeight(n));
    return s;
  }
  _getRingWeight(t) {
    return Math.max(V(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class xl extends ds {
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
    const s = this._cachedMeta, { dataset: n, data: i = [], _dataset: o } = s, a = this.chart._animationsDisabled;
    let { start: r, count: l } = qa(s, i, a);
    this._drawStart = r, this._drawCount = l, Ua(s) && (r = 0, l = i.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = i;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !a,
      options: c
    }, t), this.updateElements(i, r, l, t);
  }
  updateElements(t, s, n, i) {
    const o = i === "reset", { iScale: a, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(s, i), f = a.axis, g = r.axis, { spanGaps: p, segment: v } = this.options, b = Te(p) ? p : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || o || i === "none", y = s + n, _ = t.length;
    let x = s > 0 && this.getParsed(s - 1);
    for (let S = 0; S < _; ++S) {
      const C = t[S], w = m ? C : {};
      if (S < s || S >= y) {
        w.skip = !0;
        continue;
      }
      const D = this.getParsed(S), P = K(D[g]), A = w[f] = a.getPixelForValue(D[f], S), R = w[g] = o || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, D, l) : D[g], S);
      w.skip = isNaN(A) || isNaN(R) || P, w.stop = S > 0 && Math.abs(D[f] - x[f]) > b, v && (w.parsed = D, w.raw = c.data[S]), h && (w.options = d || this.resolveDataElementOptions(S, C.active ? "active" : i)), m || this.updateElement(C, S, w, i), x = D;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, n = s.options && s.options.borderWidth || 0, i = t.data || [];
    if (!i.length)
      return n;
    const o = i[0].size(this.resolveDataElementOptions(0)), a = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(n, o, a) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class kl extends _l {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Kt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class nn {
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
    Object.assign(nn.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Kt();
  }
  parse() {
    return Kt();
  }
  format() {
    return Kt();
  }
  add() {
    return Kt();
  }
  diff() {
    return Kt();
  }
  startOf() {
    return Kt();
  }
  endOf() {
    return Kt();
  }
}
var Ml = {
  _date: nn
};
function Sl(e, t, s, n) {
  const { controller: i, data: o, _sorted: a } = e, r = i._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && a && o.length) {
    const c = r._reversePixels ? Na : Zt;
    if (n) {
      if (i._sharedOptions) {
        const d = o[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const f = c(o, t, s - h), g = c(o, t, s + h);
          return {
            lo: f.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const d = c(o, t, s);
      if (l) {
        const { vScale: h } = i._cachedMeta, { _parsed: f } = e, g = f.slice(0, d.lo + 1).reverse().findIndex((v) => !K(v[h.axis]));
        d.lo -= Math.max(0, g);
        const p = f.slice(d.hi).findIndex((v) => !K(v[h.axis]));
        d.hi += Math.max(0, p);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function hs(e, t, s, n, i) {
  const o = e.getSortedVisibleDatasetMetas(), a = s[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: c, data: d } = o[r], { lo: h, hi: f } = Sl(o[r], t, a, i);
    for (let g = h; g <= f; ++g) {
      const p = d[g];
      p.skip || n(p, c, g);
    }
  }
}
function wl(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(n, i) {
    const o = t ? Math.abs(n.x - i.x) : 0, a = s ? Math.abs(n.y - i.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function ws(e, t, s, n, i) {
  const o = [];
  return !i && !e.isPointInArea(t) || hs(e, s, t, function(r, l, c) {
    !i && !Le(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && o.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function Cl(e, t, s, n) {
  let i = [];
  function o(a, r, l) {
    const { startAngle: c, endAngle: d } = a.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: h } = Gi(a, {
      x: t.x,
      y: t.y
    });
    Be(h, c, d) && i.push({
      element: a,
      datasetIndex: r,
      index: l
    });
  }
  return hs(e, s, t, o), i;
}
function Dl(e, t, s, n, i, o) {
  let a = [];
  const r = wl(s);
  let l = Number.POSITIVE_INFINITY;
  function c(d, h, f) {
    const g = d.inRange(t.x, t.y, i);
    if (n && !g)
      return;
    const p = d.getCenterPoint(i);
    if (!(!!o || e.isPointInArea(p)) && !g)
      return;
    const b = r(t, p);
    b < l ? (a = [
      {
        element: d,
        datasetIndex: h,
        index: f
      }
    ], l = b) : b === l && a.push({
      element: d,
      datasetIndex: h,
      index: f
    });
  }
  return hs(e, s, t, c), a;
}
function Cs(e, t, s, n, i, o) {
  return !o && !e.isPointInArea(t) ? [] : s === "r" && !n ? Cl(e, t, s, i) : Dl(e, t, s, n, i, o);
}
function Un(e, t, s, n, i) {
  const o = [], a = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return hs(e, s, t, (l, c, d) => {
    l[a] && l[a](t[s], i) && (o.push({
      element: l,
      datasetIndex: c,
      index: d
    }), r = r || l.inRange(t.x, t.y, i));
  }), n && !r ? [] : o;
}
var $l = {
  modes: {
    index(e, t, s, n) {
      const i = Gt(t, e), o = s.axis || "x", a = s.includeInvisible || !1, r = s.intersect ? ws(e, i, o, n, a) : Cs(e, i, o, !1, n, a), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = r[0].index, h = c.data[d];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: c.index,
          index: d
        });
      }), l) : [];
    },
    dataset(e, t, s, n) {
      const i = Gt(t, e), o = s.axis || "xy", a = s.includeInvisible || !1;
      let r = s.intersect ? ws(e, i, o, n, a) : Cs(e, i, o, !1, n, a);
      if (r.length > 0) {
        const l = r[0].datasetIndex, c = e.getDatasetMeta(l).data;
        r = [];
        for (let d = 0; d < c.length; ++d)
          r.push({
            element: c[d],
            datasetIndex: l,
            index: d
          });
      }
      return r;
    },
    point(e, t, s, n) {
      const i = Gt(t, e), o = s.axis || "xy", a = s.includeInvisible || !1;
      return ws(e, i, o, n, a);
    },
    nearest(e, t, s, n) {
      const i = Gt(t, e), o = s.axis || "xy", a = s.includeInvisible || !1;
      return Cs(e, i, o, s.intersect, n, a);
    },
    x(e, t, s, n) {
      const i = Gt(t, e);
      return Un(e, i, "x", s.intersect, n);
    },
    y(e, t, s, n) {
      const i = Gt(t, e);
      return Un(e, i, "y", s.intersect, n);
    }
  }
};
const yo = [
  "left",
  "top",
  "right",
  "bottom"
];
function be(e, t) {
  return e.filter((s) => s.pos === t);
}
function Xn(e, t) {
  return e.filter((s) => yo.indexOf(s.pos) === -1 && s.box.axis === t);
}
function ve(e, t) {
  return e.sort((s, n) => {
    const i = t ? n : s, o = t ? s : n;
    return i.weight === o.weight ? i.index - o.index : i.weight - o.weight;
  });
}
function Al(e) {
  const t = [];
  let s, n, i, o, a, r;
  for (s = 0, n = (e || []).length; s < n; ++s)
    i = e[s], { position: o, options: { stack: a, stackWeight: r = 1 } } = i, t.push({
      index: s,
      box: i,
      pos: o,
      horizontal: i.isHorizontal(),
      weight: i.weight,
      stack: a && o + a,
      stackWeight: r
    });
  return t;
}
function Pl(e) {
  const t = {};
  for (const s of e) {
    const { stack: n, pos: i, stackWeight: o } = s;
    if (!n || !yo.includes(i))
      continue;
    const a = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += o;
  }
  return t;
}
function Fl(e, t) {
  const s = Pl(e), { vBoxMaxWidth: n, hBoxMaxHeight: i } = t;
  let o, a, r;
  for (o = 0, a = e.length; o < a; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, c = s[r.stack], d = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = d ? d * n : l && t.availableWidth, r.height = i) : (r.width = n, r.height = d ? d * i : l && t.availableHeight);
  }
  return s;
}
function Tl(e) {
  const t = Al(e), s = ve(t.filter((c) => c.box.fullSize), !0), n = ve(be(t, "left"), !0), i = ve(be(t, "right")), o = ve(be(t, "top"), !0), a = ve(be(t, "bottom")), r = Xn(t, "x"), l = Xn(t, "y");
  return {
    fullSize: s,
    leftAndTop: n.concat(o),
    rightAndBottom: i.concat(l).concat(a).concat(r),
    chartArea: be(t, "chartArea"),
    vertical: n.concat(i).concat(l),
    horizontal: o.concat(a).concat(r)
  };
}
function Kn(e, t, s, n) {
  return Math.max(e[s], t[s]) + Math.max(e[n], t[n]);
}
function _o(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Bl(e, t, s, n) {
  const { pos: i, box: o } = s, a = e.maxPadding;
  if (!q(i)) {
    s.size && (e[i] -= s.size);
    const h = n[s.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, s.horizontal ? o.height : o.width), s.size = h.size / h.count, e[i] += s.size;
  }
  o.getPadding && _o(a, o.getPadding());
  const r = Math.max(0, t.outerWidth - Kn(a, e, "left", "right")), l = Math.max(0, t.outerHeight - Kn(a, e, "top", "bottom")), c = r !== e.w, d = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function Ll(e) {
  const t = e.maxPadding;
  function s(n) {
    const i = Math.max(t[n] - e[n], 0);
    return e[n] += i, i;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function El(e, t) {
  const s = t.maxPadding;
  function n(i) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return i.forEach((a) => {
      o[a] = Math.max(t[a], s[a]);
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
function Me(e, t, s, n) {
  const i = [];
  let o, a, r, l, c, d;
  for (o = 0, a = e.length, c = 0; o < a; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, El(r.horizontal, t));
    const { same: h, other: f } = Bl(t, s, r, n);
    c |= h && i.length, d = d || f, l.fullSize || i.push(r);
  }
  return c && Me(i, t, s, n) || d;
}
function Ye(e, t, s, n, i) {
  e.top = s, e.left = t, e.right = t + n, e.bottom = s + i, e.width = n, e.height = i;
}
function Gn(e, t, s, n) {
  const i = s.padding;
  let { x: o, y: a } = t;
  for (const r of e) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, d = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const h = t.w * d, f = c.size || l.height;
      Fe(c.start) && (a = c.start), l.fullSize ? Ye(l, i.left, a, s.outerWidth - i.right - i.left, f) : Ye(l, t.left + c.placed, a, h, f), c.start = a, c.placed += h, a = l.bottom;
    } else {
      const h = t.h * d, f = c.size || l.width;
      Fe(c.start) && (o = c.start), l.fullSize ? Ye(l, o, i.top, f, s.outerHeight - i.bottom - i.top) : Ye(l, o, t.top + c.placed, f, h), c.start = o, c.placed += h, o = l.right;
    }
  }
  t.x = o, t.y = a;
}
var Dt = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(s) {
            t.draw(s);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const s = e.boxes ? e.boxes.indexOf(t) : -1;
    s !== -1 && e.boxes.splice(s, 1);
  },
  configure(e, t, s) {
    t.fullSize = s.fullSize, t.position = s.position, t.weight = s.weight;
  },
  update(e, t, s, n) {
    if (!e)
      return;
    const i = At(e.options.layout.padding), o = Math.max(t - i.width, 0), a = Math.max(s - i.height, 0), r = Tl(e.boxes), l = r.vertical, c = r.horizontal;
    Q(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const d = l.reduce((v, b) => b.box.options && b.box.options.display === !1 ? v : v + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: i,
      availableWidth: o,
      availableHeight: a,
      vBoxMaxWidth: o / 2 / d,
      hBoxMaxHeight: a / 2
    }), f = Object.assign({}, i);
    _o(f, At(n));
    const g = Object.assign({
      maxPadding: f,
      w: o,
      h: a,
      x: i.left,
      y: i.top
    }, i), p = Fl(l.concat(c), h);
    Me(r.fullSize, g, h, p), Me(l, g, h, p), Me(c, g, h, p) && Me(l, g, h, p), Ll(g), Gn(r.leftAndTop, g, h, p), g.x += g.w, g.y += g.h, Gn(r.rightAndBottom, g, h, p), e.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, Q(r.chartArea, (v) => {
      const b = v.box;
      Object.assign(b, e.chartArea), b.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class xo {
  acquireContext(t, s) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, s, n) {
  }
  removeEventListener(t, s, n) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, s, n, i) {
    return s = Math.max(0, s || t.width), n = n || t.height, {
      width: s,
      height: Math.max(0, i ? Math.floor(s / i) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Ol extends xo {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Qe = "$chartjs", Rl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Qn = (e) => e === null || e === "";
function Il(e, t) {
  const s = e.style, n = e.getAttribute("height"), i = e.getAttribute("width");
  if (e[Qe] = {
    initial: {
      height: n,
      width: i,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", Qn(i)) {
    const o = Ln(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Qn(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ln(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const ko = Or ? {
  passive: !0
} : !1;
function zl(e, t, s) {
  e && e.addEventListener(t, s, ko);
}
function Hl(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, ko);
}
function Nl(e, t) {
  const s = Rl[e.type] || e.type, { x: n, y: i } = Gt(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: i !== void 0 ? i : null
  };
}
function os(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Wl(e, t, s) {
  const n = e.canvas, i = new MutationObserver((o) => {
    let a = !1;
    for (const r of o)
      a = a || os(r.addedNodes, n), a = a && !os(r.removedNodes, n);
    a && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function Vl(e, t, s) {
  const n = e.canvas, i = new MutationObserver((o) => {
    let a = !1;
    for (const r of o)
      a = a || os(r.removedNodes, n), a = a && !os(r.addedNodes, n);
    a && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const Oe = /* @__PURE__ */ new Map();
let Zn = 0;
function Mo() {
  const e = window.devicePixelRatio;
  e !== Zn && (Zn = e, Oe.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function jl(e, t) {
  Oe.size || window.addEventListener("resize", Mo), Oe.set(e, t);
}
function Yl(e) {
  Oe.delete(e), Oe.size || window.removeEventListener("resize", Mo);
}
function ql(e, t, s) {
  const n = e.canvas, i = n && sn(n);
  if (!i)
    return;
  const o = to((r, l) => {
    const c = i.clientWidth;
    s(r, l), c < i.clientWidth && s();
  }, window), a = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, d = l.contentRect.height;
    c === 0 && d === 0 || o(c, d);
  });
  return a.observe(i), jl(e, o), a;
}
function Ds(e, t, s) {
  s && s.disconnect(), t === "resize" && Yl(e);
}
function Ul(e, t, s) {
  const n = e.canvas, i = to((o) => {
    e.ctx !== null && s(Nl(o, e));
  }, e);
  return zl(n, t, i), i;
}
class Xl extends xo {
  acquireContext(t, s) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Il(t, s), n) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[Qe])
      return !1;
    const n = s[Qe].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const a = n[o];
      K(a) ? s.removeAttribute(o) : s.setAttribute(o, a);
    });
    const i = n.style || {};
    return Object.keys(i).forEach((o) => {
      s.style[o] = i[o];
    }), s.width = s.width, delete s[Qe], !0;
  }
  addEventListener(t, s, n) {
    this.removeEventListener(t, s);
    const i = t.$proxies || (t.$proxies = {}), a = {
      attach: Wl,
      detach: Vl,
      resize: ql
    }[s] || Ul;
    i[s] = a(t, s, n);
  }
  removeEventListener(t, s) {
    const n = t.$proxies || (t.$proxies = {}), i = n[s];
    if (!i)
      return;
    ({
      attach: Ds,
      detach: Ds,
      resize: Ds
    }[s] || Hl)(t, s, i), n[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, n, i) {
    return Er(t, s, n, i);
  }
  isAttached(t) {
    const s = t && sn(t);
    return !!(s && s.isConnected);
  }
}
function Kl(e) {
  return !en() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ol : Xl;
}
class Ht {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: n
    };
  }
  hasValue() {
    return Te(this.x) && Te(this.y);
  }
  getProps(t, s) {
    const n = this.$animations;
    if (!s || !n)
      return this;
    const i = {};
    return t.forEach((o) => {
      i[o] = n[o] && n[o].active() ? n[o]._to : this[o];
    }), i;
  }
}
function Gl(e, t) {
  const s = e.options.ticks, n = Ql(e), i = Math.min(s.maxTicksLimit || n, n), o = s.major.enabled ? Jl(t) : [], a = o.length, r = o[0], l = o[a - 1], c = [];
  if (a > i)
    return tc(t, c, o, a / i), c;
  const d = Zl(o, t, i);
  if (a > 0) {
    let h, f;
    const g = a > 1 ? Math.round((l - r) / (a - 1)) : null;
    for (qe(t, c, d, K(g) ? 0 : r - g, r), h = 0, f = a - 1; h < f; h++)
      qe(t, c, d, o[h], o[h + 1]);
    return qe(t, c, d, l, K(g) ? t.length : l + g), c;
  }
  return qe(t, c, d), c;
}
function Ql(e) {
  const t = e.options.offset, s = e._tickSize(), n = e._length / s + (t ? 0 : 1), i = e._maxLength / s;
  return Math.floor(Math.min(n, i));
}
function Zl(e, t, s) {
  const n = ec(e), i = t.length / s;
  if (!n)
    return Math.max(i, 1);
  const o = La(n);
  for (let a = 0, r = o.length - 1; a < r; a++) {
    const l = o[a];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function Jl(e) {
  const t = [];
  let s, n;
  for (s = 0, n = e.length; s < n; s++)
    e[s].major && t.push(s);
  return t;
}
function tc(e, t, s, n) {
  let i = 0, o = s[0], a;
  for (n = Math.ceil(n), a = 0; a < e.length; a++)
    a === o && (t.push(e[a]), i++, o = s[i * n]);
}
function qe(e, t, s, n, i) {
  const o = V(n, 0), a = Math.min(V(i, e.length), e.length);
  let r = 0, l, c, d;
  for (s = Math.ceil(s), i && (l = i - n, s = l / Math.floor(l / s)), d = o; d < 0; )
    r++, d = Math.round(o + r * s);
  for (c = Math.max(o, 0); c < a; c++)
    c === d && (t.push(e[c]), r++, d = Math.round(o + r * s));
}
function ec(e) {
  const t = e.length;
  let s, n;
  if (t < 2)
    return !1;
  for (n = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== n)
      return !1;
  return n;
}
const sc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Jn = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, ti = (e, t) => Math.min(t || e, e);
function ei(e, t) {
  const s = [], n = e.length / t, i = e.length;
  let o = 0;
  for (; o < i; o += n)
    s.push(e[Math.floor(o)]);
  return s;
}
function nc(e, t, s) {
  const n = e.ticks.length, i = Math.min(t, n - 1), o = e._startPixel, a = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(i), c;
  if (!(s && (n === 1 ? c = Math.max(l - o, a - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(i - 1)) / 2, l += i < t ? c : -c, l < o - r || l > a + r)))
    return l;
}
function ic(e, t) {
  Q(e, (s) => {
    const n = s.gc, i = n.length / 2;
    let o;
    if (i > t) {
      for (o = 0; o < i; ++o)
        delete s.data[n[o]];
      n.splice(0, i);
    }
  });
}
function ye(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function si(e, t) {
  if (!e.display)
    return 0;
  const s = bt(e.font, t), n = At(e.padding);
  return (lt(e.text) ? e.text.length : 1) * s.lineHeight + n.height;
}
function oc(e, t) {
  return se(e, {
    scale: t,
    type: "scale"
  });
}
function ac(e, t, s) {
  return se(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function rc(e, t, s) {
  let n = Xs(e);
  return (s && t !== "right" || !s && t === "right") && (n = sc(n)), n;
}
function lc(e, t, s, n) {
  const { top: i, left: o, bottom: a, right: r, chart: l } = e, { chartArea: c, scales: d } = l;
  let h = 0, f, g, p;
  const v = a - i, b = r - o;
  if (e.isHorizontal()) {
    if (g = pt(n, o, r), q(s)) {
      const m = Object.keys(s)[0], y = s[m];
      p = d[m].getPixelForValue(y) + v - t;
    } else s === "center" ? p = (c.bottom + c.top) / 2 + v - t : p = Jn(e, s, t);
    f = r - o;
  } else {
    if (q(s)) {
      const m = Object.keys(s)[0], y = s[m];
      g = d[m].getPixelForValue(y) - b + t;
    } else s === "center" ? g = (c.left + c.right) / 2 - b + t : g = Jn(e, s, t);
    p = pt(n, a, i), h = s === "left" ? -dt : dt;
  }
  return {
    titleX: g,
    titleY: p,
    maxWidth: f,
    rotation: h
  };
}
class fe extends Ht {
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
  parse(t, s) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: s, _suggestedMin: n, _suggestedMax: i } = this;
    return t = Pt(t, Number.POSITIVE_INFINITY), s = Pt(s, Number.NEGATIVE_INFINITY), n = Pt(n, Number.POSITIVE_INFINITY), i = Pt(i, Number.NEGATIVE_INFINITY), {
      min: Pt(t, n),
      max: Pt(s, i),
      minDefined: vt(t),
      maxDefined: vt(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: n, minDefined: i, maxDefined: o } = this.getUserBounds(), a;
    if (i && o)
      return {
        min: s,
        max: n
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      a = r[l].controller.getMinMax(this, t), i || (s = Math.min(s, a.min)), o || (n = Math.max(n, a.max));
    return s = o && s > n ? n : s, n = i && s > n ? s : n, {
      min: Pt(s, Pt(n, s)),
      max: Pt(n, Pt(s, n))
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
    et(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, n) {
    const { beginAtZero: i, grace: o, ticks: a } = this.options, r = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = fr(this, o, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? ei(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = Gl(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, n;
    this.isHorizontal() ? (s = this.left, n = this.right) : (s = this.top, n = this.bottom, t = !t), this._startPixel = s, this._endPixel = n, this._reversePixels = t, this._length = n - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    et(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    et(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    et(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), et(this.options[t], [
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
    et(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let n, i, o;
    for (n = 0, i = t.length; n < i; n++)
      o = t[n], o.label = et(s.callback, [
        o.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    et(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    et(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, n = ti(this.ticks.length, t.ticks.maxTicksLimit), i = s.minRotation || 0, o = s.maxRotation;
    let a = i, r, l, c;
    if (!this._isVisible() || !s.display || i >= o || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, f = d.highest.height, g = mt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : g / (n - 1), h + 6 > r && (r = g / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - ye(t.grid) - s.padding - si(t.title, this.chart.options.font), c = Math.sqrt(h * h + f * f), a = Ia(Math.min(Math.asin(mt((d.highest.height + 6) / r, -1, 1)), Math.asin(mt(l / c, -1, 1)) - Math.asin(mt(f / c, -1, 1)))), a = Math.max(i, Math.min(o, a))), this.labelRotation = a;
  }
  afterCalculateLabelRotation() {
    et(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    et(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: n, title: i, grid: o } } = this, a = this._isVisible(), r = this.isHorizontal();
    if (a) {
      const l = si(i, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = ye(o) + l) : (t.height = this.maxHeight, t.width = ye(o) + l), n.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: f } = this._getLabelSizes(), g = n.padding * 2, p = It(this.labelRotation), v = Math.cos(p), b = Math.sin(p);
        if (r) {
          const m = n.mirror ? 0 : b * h.width + v * f.height;
          t.height = Math.min(this.maxHeight, t.height + m + g);
        } else {
          const m = n.mirror ? 0 : v * h.width + b * f.height;
          t.width = Math.min(this.maxWidth, t.width + m + g);
        }
        this._calculatePadding(c, d, b, v);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, n, i) {
    const { ticks: { align: o, padding: a }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, g = 0;
      l ? c ? (f = i * t.width, g = n * s.height) : (f = n * t.height, g = i * s.width) : o === "start" ? g = s.width : o === "end" ? f = t.width : o !== "inner" && (f = t.width / 2, g = s.width / 2), this.paddingLeft = Math.max((f - d + a) * this.width / (this.width - d), 0), this.paddingRight = Math.max((g - h + a) * this.width / (this.width - h), 0);
    } else {
      let d = s.height / 2, h = t.height / 2;
      o === "start" ? (d = 0, h = t.height) : o === "end" && (d = s.height, h = 0), this.paddingTop = d + a, this.paddingBottom = h + a;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    et(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: s } = this.options;
    return s === "top" || s === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let s, n;
    for (s = 0, n = t.length; s < n; s++)
      K(t[s].label) && (t.splice(s, 1), n--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let n = this.ticks;
      s < n.length && (n = ei(n, s)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, n) {
    const { ctx: i, _longestTextCache: o } = this, a = [], r = [], l = Math.floor(s / ti(s, n));
    let c = 0, d = 0, h, f, g, p, v, b, m, y, _, x, S;
    for (h = 0; h < s; h += l) {
      if (p = t[h].label, v = this._resolveTickFontOptions(h), i.font = b = v.string, m = o[b] = o[b] || {
        data: {},
        gc: []
      }, y = v.lineHeight, _ = x = 0, !K(p) && !lt(p))
        _ = An(i, m.data, m.gc, _, p), x = y;
      else if (lt(p))
        for (f = 0, g = p.length; f < g; ++f)
          S = p[f], !K(S) && !lt(S) && (_ = An(i, m.data, m.gc, _, S), x += y);
      a.push(_), r.push(x), c = Math.max(_, c), d = Math.max(x, d);
    }
    ic(o, s);
    const C = a.indexOf(c), w = r.indexOf(d), D = (P) => ({
      width: a[P] || 0,
      height: r[P] || 0
    });
    return {
      first: D(0),
      last: D(s - 1),
      widest: D(C),
      highest: D(w),
      widths: a,
      heights: r
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, s) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const s = this.ticks;
    return t < 0 || t > s.length - 1 ? null : this.getPixelForValue(s[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const s = this._startPixel + t * this._length;
    return Ha(this._alignToPixels ? Xt(this.chart, s, 0) : s);
  }
  getDecimalForPixel(t) {
    const s = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - s : s;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: s } = this;
    return t < 0 && s < 0 ? s : t > 0 && s > 0 ? t : 0;
  }
  getContext(t) {
    const s = this.ticks || [];
    if (t >= 0 && t < s.length) {
      const n = s[t];
      return n.$context || (n.$context = ac(this.getContext(), t, n));
    }
    return this.$context || (this.$context = oc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = It(this.labelRotation), n = Math.abs(Math.cos(s)), i = Math.abs(Math.sin(s)), o = this._getLabelSizes(), a = t.autoSkipPadding || 0, r = o ? o.widest.width + a : 0, l = o ? o.highest.height + a : 0;
    return this.isHorizontal() ? l * n > r * i ? r / n : l / i : l * i < r * n ? l / n : r / i;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, n = this.chart, i = this.options, { grid: o, position: a, border: r } = i, l = o.offset, c = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = ye(o), g = [], p = r.setContext(this.getContext()), v = p.display ? p.width : 0, b = v / 2, m = function(j) {
      return Xt(n, j, v);
    };
    let y, _, x, S, C, w, D, P, A, R, T, N;
    if (a === "top")
      y = m(this.bottom), w = this.bottom - f, P = y - b, R = m(t.top) + b, N = t.bottom;
    else if (a === "bottom")
      y = m(this.top), R = t.top, N = m(t.bottom) - b, w = y + b, P = this.top + f;
    else if (a === "left")
      y = m(this.right), C = this.right - f, D = y - b, A = m(t.left) + b, T = t.right;
    else if (a === "right")
      y = m(this.left), A = t.left, T = m(t.right) - b, C = y + b, D = this.left + f;
    else if (s === "x") {
      if (a === "center")
        y = m((t.top + t.bottom) / 2 + 0.5);
      else if (q(a)) {
        const j = Object.keys(a)[0], G = a[j];
        y = m(this.chart.scales[j].getPixelForValue(G));
      }
      R = t.top, N = t.bottom, w = y + b, P = w + f;
    } else if (s === "y") {
      if (a === "center")
        y = m((t.left + t.right) / 2);
      else if (q(a)) {
        const j = Object.keys(a)[0], G = a[j];
        y = m(this.chart.scales[j].getPixelForValue(G));
      }
      C = y - b, D = C - f, A = t.left, T = t.right;
    }
    const F = V(i.ticks.maxTicksLimit, h), O = Math.max(1, Math.ceil(h / F));
    for (_ = 0; _ < h; _ += O) {
      const j = this.getContext(_), G = o.setContext(j), H = r.setContext(j), B = G.lineWidth, z = G.color, Y = H.dash || [], U = H.dashOffset, tt = G.tickWidth, st = G.tickColor, gt = G.tickBorderDash || [], kt = G.tickBorderDashOffset;
      x = nc(this, _, l), x !== void 0 && (S = Xt(n, x, B), c ? C = D = A = T = S : w = P = R = N = S, g.push({
        tx1: C,
        ty1: w,
        tx2: D,
        ty2: P,
        x1: A,
        y1: R,
        x2: T,
        y2: N,
        width: B,
        color: z,
        borderDash: Y,
        borderDashOffset: U,
        tickWidth: tt,
        tickColor: st,
        tickBorderDash: gt,
        tickBorderDashOffset: kt
      }));
    }
    return this._ticksLength = h, this._borderValue = y, g;
  }
  _computeLabelItems(t) {
    const s = this.axis, n = this.options, { position: i, ticks: o } = n, a = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: d, mirror: h } = o, f = ye(n.grid), g = f + d, p = h ? -d : g, v = -It(this.labelRotation), b = [];
    let m, y, _, x, S, C, w, D, P, A, R, T, N = "middle";
    if (i === "top")
      C = this.bottom - p, w = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      C = this.top + p, w = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const O = this._getYAxisLabelAlignment(f);
      w = O.textAlign, S = O.x;
    } else if (i === "right") {
      const O = this._getYAxisLabelAlignment(f);
      w = O.textAlign, S = O.x;
    } else if (s === "x") {
      if (i === "center")
        C = (t.top + t.bottom) / 2 + g;
      else if (q(i)) {
        const O = Object.keys(i)[0], j = i[O];
        C = this.chart.scales[O].getPixelForValue(j) + g;
      }
      w = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (i === "center")
        S = (t.left + t.right) / 2 - g;
      else if (q(i)) {
        const O = Object.keys(i)[0], j = i[O];
        S = this.chart.scales[O].getPixelForValue(j);
      }
      w = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? N = "top" : l === "end" && (N = "bottom"));
    const F = this._getLabelSizes();
    for (m = 0, y = r.length; m < y; ++m) {
      _ = r[m], x = _.label;
      const O = o.setContext(this.getContext(m));
      D = this.getPixelForTick(m) + o.labelOffset, P = this._resolveTickFontOptions(m), A = P.lineHeight, R = lt(x) ? x.length : 1;
      const j = R / 2, G = O.color, H = O.textStrokeColor, B = O.textStrokeWidth;
      let z = w;
      a ? (S = D, w === "inner" && (m === y - 1 ? z = this.options.reverse ? "left" : "right" : m === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), i === "top" ? c === "near" || v !== 0 ? T = -R * A + A / 2 : c === "center" ? T = -F.highest.height / 2 - j * A + A : T = -F.highest.height + A / 2 : c === "near" || v !== 0 ? T = A / 2 : c === "center" ? T = F.highest.height / 2 - j * A : T = F.highest.height - R * A, h && (T *= -1), v !== 0 && !O.showLabelBackdrop && (S += A / 2 * Math.sin(v))) : (C = D, T = (1 - R) * A / 2);
      let Y;
      if (O.showLabelBackdrop) {
        const U = At(O.backdropPadding), tt = F.heights[m], st = F.widths[m];
        let gt = T - U.top, kt = 0 - U.left;
        switch (N) {
          case "middle":
            gt -= tt / 2;
            break;
          case "bottom":
            gt -= tt;
            break;
        }
        switch (w) {
          case "center":
            kt -= st / 2;
            break;
          case "right":
            kt -= st;
            break;
          case "inner":
            m === y - 1 ? kt -= st : m > 0 && (kt -= st / 2);
            break;
        }
        Y = {
          left: kt,
          top: gt,
          width: st + U.width,
          height: tt + U.height,
          color: O.backdropColor
        };
      }
      b.push({
        label: x,
        font: P,
        textOffset: T,
        options: {
          rotation: v,
          color: G,
          strokeColor: H,
          strokeWidth: B,
          textAlign: z,
          textBaseline: N,
          translation: [
            S,
            C
          ],
          backdrop: Y
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-It(this.labelRotation))
      return t === "top" ? "left" : "right";
    let i = "center";
    return s.align === "start" ? i = "left" : s.align === "end" ? i = "right" : s.align === "inner" && (i = "inner"), i;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: n, mirror: i, padding: o } } = this.options, a = this._getLabelSizes(), r = t + o, l = a.widest.width;
    let c, d;
    return s === "left" ? i ? (d = this.right + o, n === "near" ? c = "left" : n === "center" ? (c = "center", d += l / 2) : (c = "right", d += l)) : (d = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", d -= l / 2) : (c = "left", d = this.left)) : s === "right" ? i ? (d = this.left + o, n === "near" ? c = "right" : n === "center" ? (c = "center", d -= l / 2) : (c = "left", d -= l)) : (d = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", d += l / 2) : (c = "right", d = this.right)) : c = "right", {
      textAlign: c,
      x: d
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, s = this.options.position;
    if (s === "left" || s === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (s === "top" || s === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: s }, left: n, top: i, width: o, height: a } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(n, i, o, a), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const i = this.ticks.findIndex((o) => o.value === t);
    return i >= 0 ? s.setContext(this.getContext(i)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, n = this.ctx, i = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, a;
    const r = (l, c, d) => {
      !d.width || !d.color || (n.save(), n.lineWidth = d.width, n.strokeStyle = d.color, n.setLineDash(d.borderDash || []), n.lineDashOffset = d.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (s.display)
      for (o = 0, a = i.length; o < a; ++o) {
        const l = i[o];
        s.drawOnChartArea && r({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), s.drawTicks && r({
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
    const { chart: t, ctx: s, options: { border: n, grid: i } } = this, o = n.setContext(this.getContext()), a = n.display ? o.width : 0;
    if (!a)
      return;
    const r = i.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, d, h, f;
    this.isHorizontal() ? (c = Xt(t, this.left, a) - a / 2, d = Xt(t, this.right, r) + r / 2, h = f = l) : (h = Xt(t, this.top, a) - a / 2, f = Xt(t, this.bottom, r) + r / 2, c = d = l), s.save(), s.lineWidth = o.width, s.strokeStyle = o.color, s.beginPath(), s.moveTo(c, h), s.lineTo(d, f), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, i = this._computeLabelArea();
    i && rs(n, i);
    const o = this.getLabelItems(t);
    for (const a of o) {
      const r = a.options, l = a.font, c = a.label, d = a.textOffset;
      Ee(n, c, 0, d, l, r);
    }
    i && ls(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: n, reverse: i } } = this;
    if (!n.display)
      return;
    const o = bt(n.font), a = At(n.padding), r = n.align;
    let l = o.lineHeight / 2;
    s === "bottom" || s === "center" || q(s) ? (l += a.bottom, lt(n.text) && (l += o.lineHeight * (n.text.length - 1))) : l += a.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: f } = lc(this, l, s, r);
    Ee(t, n.text, 0, 0, o, {
      color: n.color,
      maxWidth: h,
      rotation: f,
      textAlign: rc(r, s, i),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, n = V(t.grid && t.grid.z, -1), i = V(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== fe.prototype.draw ? [
      {
        z: s,
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
        z: i,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: s,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const s = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", i = [];
    let o, a;
    for (o = 0, a = s.length; o < a; ++o) {
      const r = s[o];
      r[n] === this.id && (!t || r.type === t) && i.push(r);
    }
    return i;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return bt(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Ue {
  constructor(t, s, n) {
    this.type = t, this.scope = s, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let n;
    hc(s) && (n = this.register(s));
    const i = this.items, o = t.id, a = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in i || (i[o] = t, cc(t, a, n), this.override && at.override(t.id, t.overrides)), a;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, n = t.id, i = this.scope;
    n in s && delete s[n], i && n in at[i] && (delete at[i][n], this.override && delete ee[n]);
  }
}
function cc(e, t, s) {
  const n = Pe(/* @__PURE__ */ Object.create(null), [
    s ? at.get(s) : {},
    at.get(t),
    e.defaults
  ]);
  at.set(t, n), e.defaultRoutes && dc(t, e.defaultRoutes), e.descriptors && at.describe(t, e.descriptors);
}
function dc(e, t) {
  Object.keys(t).forEach((s) => {
    const n = s.split("."), i = n.pop(), o = [
      e
    ].concat(n).join("."), a = t[s].split("."), r = a.pop(), l = a.join(".");
    at.route(o, i, l, r);
  });
}
function hc(e) {
  return "id" in e && "defaults" in e;
}
class uc {
  constructor() {
    this.controllers = new Ue(ds, "datasets", !0), this.elements = new Ue(Ht, "elements"), this.plugins = new Ue(Object, "plugins"), this.scales = new Ue(fe, "scales"), this._typedRegistries = [
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
  _each(t, s, n) {
    [
      ...s
    ].forEach((i) => {
      const o = n || this._getRegistryForType(i);
      n || o.isForType(i) || o === this.plugins && i.id ? this._exec(t, o, i) : Q(i, (a) => {
        const r = n || this._getRegistryForType(a);
        this._exec(t, r, a);
      });
    });
  }
  _exec(t, s, n) {
    const i = qs(t);
    et(n["before" + i], [], n), s[t](n), et(n["after" + i], [], n);
  }
  _getRegistryForType(t) {
    for (let s = 0; s < this._typedRegistries.length; s++) {
      const n = this._typedRegistries[s];
      if (n.isForType(t))
        return n;
    }
    return this.plugins;
  }
  _get(t, s, n) {
    const i = s.get(t);
    if (i === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return i;
  }
}
var Tt = /* @__PURE__ */ new uc();
class fc {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, n, i) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = i ? this._descriptors(t).filter(i) : this._descriptors(t), a = this._notify(o, t, s, n);
    return s === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), a;
  }
  _notify(t, s, n, i) {
    i = i || {};
    for (const o of t) {
      const a = o.plugin, r = a[n], l = [
        s,
        i,
        o.options
      ];
      if (et(r, l, a) === !1 && i.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    K(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const n = t && t.config, i = V(n.options && n.options.plugins, {}), o = gc(n);
    return i === !1 && !s ? [] : mc(t, o, i, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], n = this._cache, i = (o, a) => o.filter((r) => !a.some((l) => r.plugin.id === l.plugin.id));
    this._notify(i(s, n), t, "stop"), this._notify(i(n, s), t, "start");
  }
}
function gc(e) {
  const t = {}, s = [], n = Object.keys(Tt.plugins.items);
  for (let o = 0; o < n.length; o++)
    s.push(Tt.getPlugin(n[o]));
  const i = e.plugins || [];
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    s.indexOf(a) === -1 && (s.push(a), t[a.id] = !0);
  }
  return {
    plugins: s,
    localIds: t
  };
}
function pc(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function mc(e, { plugins: t, localIds: s }, n, i) {
  const o = [], a = e.getContext();
  for (const r of t) {
    const l = r.id, c = pc(n[l], i);
    c !== null && o.push({
      plugin: r,
      options: bc(e.config, {
        plugin: r,
        local: s[l]
      }, c, a)
    });
  }
  return o;
}
function bc(e, { plugin: t, local: s }, n, i) {
  const o = e.pluginScopeKeys(t), a = e.getOptionScopes(n, o);
  return s && t.defaults && a.push(t.defaults), e.createResolver(a, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Is(e, t) {
  const s = at.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function vc(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function yc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function ni(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function _c(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function zs(e, ...t) {
  if (ni(e))
    return e;
  for (const s of t) {
    const n = s.axis || _c(s.position) || e.length > 1 && ni(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ii(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function xc(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (s.length)
      return ii(e, "x", s[0]) || ii(e, "y", s[0]);
  }
  return {};
}
function kc(e, t) {
  const s = ee[e.type] || {
    scales: {}
  }, n = t.scales || {}, i = Is(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((a) => {
    const r = n[a];
    if (!q(r))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const l = zs(a, r, xc(a, e), at.scales[r.type]), c = yc(l, i), d = s.scales || {};
    o[a] = we(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      d[l],
      d[c]
    ]);
  }), e.data.datasets.forEach((a) => {
    const r = a.type || e.type, l = a.indexAxis || Is(r, t), d = (ee[r] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const f = vc(h, l), g = a[f + "AxisID"] || f;
      o[g] = o[g] || /* @__PURE__ */ Object.create(null), we(o[g], [
        {
          axis: f
        },
        n[g],
        d[h]
      ]);
    });
  }), Object.keys(o).forEach((a) => {
    const r = o[a];
    we(r, [
      at.scales[r.type],
      at.scale
    ]);
  }), o;
}
function So(e) {
  const t = e.options || (e.options = {});
  t.plugins = V(t.plugins, {}), t.scales = kc(e, t);
}
function wo(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Mc(e) {
  return e = e || {}, e.data = wo(e.data), So(e), e;
}
const oi = /* @__PURE__ */ new Map(), Co = /* @__PURE__ */ new Set();
function Xe(e, t) {
  let s = oi.get(e);
  return s || (s = t(), oi.set(e, s), Co.add(s)), s;
}
const _e = (e, t, s) => {
  const n = te(t, s);
  n !== void 0 && e.add(n);
};
class Sc {
  constructor(t) {
    this._config = Mc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = wo(t);
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
    this.clearCache(), So(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Xe(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return Xe(`${t}.transition.${s}`, () => [
      [
        `datasets.${t}.transitions.${s}`,
        `transitions.${s}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, s) {
    return Xe(`${t}-${s}`, () => [
      [
        `datasets.${t}.elements.${s}`,
        `datasets.${t}`,
        `elements.${s}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const s = t.id, n = this.type;
    return Xe(`${n}-plugin-${s}`, () => [
      [
        `plugins.${s}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, s) {
    const n = this._scopeCache;
    let i = n.get(t);
    return (!i || s) && (i = /* @__PURE__ */ new Map(), n.set(t, i)), i;
  }
  getOptionScopes(t, s, n) {
    const { options: i, type: o } = this, a = this._cachedScopes(t, n), r = a.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((d) => {
      t && (l.add(t), d.forEach((h) => _e(l, t, h))), d.forEach((h) => _e(l, i, h)), d.forEach((h) => _e(l, ee[o] || {}, h)), d.forEach((h) => _e(l, at, h)), d.forEach((h) => _e(l, Os, h));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Co.has(s) && a.set(s, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      ee[s] || {},
      at.datasets[s] || {},
      {
        type: s
      },
      at,
      Os
    ];
  }
  resolveNamedOptions(t, s, n, i = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: a, subPrefixes: r } = ai(this._resolverCache, t, i);
    let l = a;
    if (Cc(a, s)) {
      o.$shared = !1, n = Yt(n) ? n() : n;
      const c = this.createResolver(t, n, r);
      l = he(a, n, c);
    }
    for (const c of s)
      o[c] = l[c];
    return o;
  }
  createResolver(t, s, n = [
    ""
  ], i) {
    const { resolver: o } = ai(this._resolverCache, t, n);
    return q(s) ? he(o, s, void 0, i) : o;
  }
}
function ai(e, t, s) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const i = s.join();
  let o = n.get(i);
  return o || (o = {
    resolver: Zs(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(i, o)), o;
}
const wc = (e) => q(e) && Object.getOwnPropertyNames(e).some((t) => Yt(e[t]));
function Cc(e, t) {
  const { isScriptable: s, isIndexable: n } = io(e);
  for (const i of t) {
    const o = s(i), a = n(i), r = (a || o) && e[i];
    if (o && (Yt(r) || wc(r)) || a && lt(r))
      return !0;
  }
  return !1;
}
var Dc = "4.5.1";
const $c = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ri(e, t) {
  return e === "top" || e === "bottom" || $c.indexOf(e) === -1 && t === "x";
}
function li(e, t) {
  return function(s, n) {
    return s[e] === n[e] ? s[t] - n[t] : s[e] - n[e];
  };
}
function ci(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), et(s && s.onComplete, [
    e
  ], t);
}
function Ac(e) {
  const t = e.chart, s = t.options.animation;
  et(s && s.onProgress, [
    e
  ], t);
}
function Do(e) {
  return en() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Ze = {}, di = (e) => {
  const t = Do(e);
  return Object.values(Ze).filter((s) => s.canvas === t).pop();
};
function Pc(e, t, s) {
  const n = Object.keys(e);
  for (const i of n) {
    const o = +i;
    if (o >= t) {
      const a = e[i];
      delete e[i], (s > 0 || o > t) && (e[o + s] = a);
    }
  }
}
function Fc(e, t, s, n) {
  return !s || e.type === "mouseout" ? null : n ? t : e;
}
let ge = class {
  static defaults = at;
  static instances = Ze;
  static overrides = ee;
  static registry = Tt;
  static version = Dc;
  static getChart = di;
  static register(...t) {
    Tt.add(...t), hi();
  }
  static unregister(...t) {
    Tt.remove(...t), hi();
  }
  constructor(t, s) {
    const n = this.config = new Sc(s), i = Do(t), o = di(i);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const a = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Kl(i))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(i, a.aspectRatio), l = r && r.canvas, c = l && l.height, d = l && l.width;
    if (this.id = wa(), this.ctx = r, this.canvas = l, this.width = d, this.height = c, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new fc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ja((h) => this.update(h), a.resizeDelay || 0), this._dataChanges = [], Ze[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Et.listen(this, "complete", ci), Et.listen(this, "progress", Ac), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: n, height: i, _aspectRatio: o } = this;
    return K(t) ? s && o ? o : i ? n / i : null : t;
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
    return Tt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Bn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Pn(this.canvas, this.ctx), this;
  }
  stop() {
    return Et.stop(this), this;
  }
  resize(t, s) {
    Et.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const n = this.options, i = this.canvas, o = n.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(i, t, s, o), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, Bn(this, r, !0) && (this.notifyPlugins("resize", {
      size: a
    }), et(n.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    Q(s, (n, i) => {
      n.id = i;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, n = this.scales, i = Object.keys(n).reduce((a, r) => (a[r] = !1, a), {});
    let o = [];
    s && (o = o.concat(Object.keys(s).map((a) => {
      const r = s[a], l = zs(a, r), c = l === "r", d = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Q(o, (a) => {
      const r = a.options, l = r.id, c = zs(l, r), d = V(r.type, a.dtype);
      (r.position === void 0 || ri(r.position, c) !== ri(a.dposition)) && (r.position = a.dposition), i[l] = !0;
      let h = null;
      if (l in n && n[l].type === d)
        h = n[l];
      else {
        const f = Tt.getScale(d);
        h = new f({
          id: l,
          type: d,
          ctx: this.ctx,
          chart: this
        }), n[h.id] = h;
      }
      h.init(r, t);
    }), Q(i, (a, r) => {
      a || delete n[r];
    }), Q(n, (a) => {
      Dt.configure(this, a, a.options), Dt.addBox(this, a);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, n = t.length;
    if (t.sort((i, o) => i.index - o.index), n > s) {
      for (let i = s; i < n; ++i)
        this._destroyDatasetMeta(i);
      t.splice(s, n - s);
    }
    this._sortedMetasets = t.slice(0).sort(li("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((n, i) => {
      s.filter((o) => o === n._dataset).length === 0 && this._destroyDatasetMeta(i);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let n, i;
    for (this._removeUnreferencedMetasets(), n = 0, i = s.length; n < i; n++) {
      const o = s[n];
      let a = this.getDatasetMeta(n);
      const r = o.type || this.config.type;
      if (a.type && a.type !== r && (this._destroyDatasetMeta(n), a = this.getDatasetMeta(n)), a.type = r, a.indexAxis = o.indexAxis || Is(r, this.options), a.order = o.order || 0, a.index = n, a.label = "" + o.label, a.visible = this.isDatasetVisible(n), a.controller)
        a.controller.updateIndex(n), a.controller.linkScales();
      else {
        const l = Tt.getController(r), { datasetElementType: c, dataElementType: d } = at.datasets[r];
        Object.assign(l, {
          dataElementType: Tt.getElement(d),
          datasetElementType: c && Tt.getElement(c)
        }), a.controller = new l(this, n), t.push(a.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Q(this.data.datasets, (t, s) => {
      this.getDatasetMeta(s).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const s = this.config;
    s.update();
    const n = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), i = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), f = !i && o.indexOf(h) === -1;
      h.buildOrUpdateElements(f), a = Math.max(+h.getMaxOverflow(), a);
    }
    a = this._minPadding = n.layout.autoPadding ? a : 0, this._updateLayout(a), i || Q(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(li("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Q(this.scales, (t) => {
      Dt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!_n(s, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: n, start: i, count: o } of s) {
      const a = n === "_removeElements" ? -o : o;
      Pc(t, i, a);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, n = (o) => new Set(t.filter((a) => a[0] === o).map((a, r) => r + "," + a.splice(1).join(","))), i = n(0);
    for (let o = 1; o < s; o++)
      if (!_n(i, n(o)))
        return;
    return Array.from(i).map((o) => o.split(",")).map((o) => ({
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
    Dt.update(this, this.width, this.height, t);
    const s = this.chartArea, n = s.width <= 0 || s.height <= 0;
    this._layers = [], Q(this.boxes, (i) => {
      n && i.position === "chartArea" || (i.configure && i.configure(), this._layers.push(...i._layers()));
    }, this), this._layers.forEach((i, o) => {
      i._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let s = 0, n = this.data.datasets.length; s < n; ++s)
        this.getDatasetMeta(s).controller.configure();
      for (let s = 0, n = this.data.datasets.length; s < n; ++s)
        this._updateDataset(s, Yt(t) ? t({
          datasetIndex: s
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, s) {
    const n = this.getDatasetMeta(t), i = {
      meta: n,
      index: t,
      mode: s,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", i) !== !1 && (n.controller._update(s), i.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", i));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Et.has(this) ? this.attached && !Et.running(this) && Et.start(this) : (this.draw(), ci({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: i } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, i);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const s = this._layers;
    for (t = 0; t < s.length && s[t].z <= 0; ++t)
      s[t].draw(this.chartArea);
    for (this._drawDatasets(); t < s.length; ++t)
      s[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const s = this._sortedMetasets, n = [];
    let i, o;
    for (i = 0, o = s.length; i < o; ++i) {
      const a = s[i];
      (!t || a.visible) && n.push(a);
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
    for (let s = t.length - 1; s >= 0; --s)
      this._drawDataset(t[s]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const s = this.ctx, n = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, i = po(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (i && rs(s, i), t.controller.draw(), i && ls(s), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Le(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, n, i) {
    const o = $l.modes[s];
    return typeof o == "function" ? o(this, t, n, i) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], n = this._metasets;
    let i = n.filter((o) => o && o._dataset === s).pop();
    return i || (i = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: s && s.order || 0,
      index: t,
      _dataset: s,
      _parsed: [],
      _sorted: !1
    }, n.push(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = se(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const s = this.data.datasets[t];
    if (!s)
      return !1;
    const n = this.getDatasetMeta(t);
    return typeof n.hidden == "boolean" ? !n.hidden : !s.hidden;
  }
  setDatasetVisibility(t, s) {
    const n = this.getDatasetMeta(t);
    n.hidden = !s;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, s, n) {
    const i = n ? "show" : "hide", o = this.getDatasetMeta(t), a = o.controller._resolveAnimations(void 0, i);
    Fe(s) ? (o.data[s].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), a.update(o, {
      visible: n
    }), this.update((r) => r.datasetIndex === t ? i : void 0));
  }
  hide(t, s) {
    this._updateVisibility(t, s, !1);
  }
  show(t, s) {
    this._updateVisibility(t, s, !0);
  }
  _destroyDatasetMeta(t) {
    const s = this._metasets[t];
    s && s.controller && s.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, s;
    for (this.stop(), Et.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Pn(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete Ze[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, n = (o, a) => {
      s.addEventListener(this, o, a), t[o] = a;
    }, i = (o, a, r) => {
      o.offsetX = a, o.offsetY = r, this._eventHandler(o);
    };
    Q(this.options.events, (o) => n(o, i));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, n = (l, c) => {
      s.addEventListener(this, l, c), t[l] = c;
    }, i = (l, c) => {
      t[l] && (s.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let a;
    const r = () => {
      i("attach", r), this.attached = !0, this.resize(), n("resize", o), n("detach", a);
    };
    a = () => {
      this.attached = !1, i("resize", o), this._stop(), this._resize(0, 0), n("attach", r);
    }, s.isAttached(this.canvas) ? r() : a();
  }
  unbindEvents() {
    Q(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, Q(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, n) {
    const i = n ? "set" : "remove";
    let o, a, r, l;
    for (s === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + i + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      a = t[r];
      const c = a && this.getDatasetMeta(a.datasetIndex).controller;
      c && c[i + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], n = t.map(({ datasetIndex: o, index: a }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[a],
        index: a
      };
    });
    !ts(n, s) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, s));
  }
  notifyPlugins(t, s, n) {
    return this._plugins.notify(this, t, s, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, n) {
    const i = this.options.hover, o = (l, c) => l.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), a = o(s, t), r = n ? t : o(t, s);
    a.length && this.updateHoverStyle(a, i.mode, !1), r.length && i.mode && this.updateHoverStyle(r, i.mode, !0);
  }
  _eventHandler(t, s) {
    const n = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, i = (a) => (a.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, i) === !1)
      return;
    const o = this._handleEvent(t, s, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, i), (o || n.changed) && this.render(), this;
  }
  _handleEvent(t, s, n) {
    const { _active: i = [], options: o } = this, a = s, r = this._getActiveElements(t, i, n, a), l = Fa(t), c = Fc(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, et(o.onHover, [
      t,
      r,
      this
    ], this), l && et(o.onClick, [
      t,
      r,
      this
    ], this));
    const d = !ts(r, i);
    return (d || s) && (this._active = r, this._updateHoverStyles(r, i, s)), this._lastEvent = c, d;
  }
  _getActiveElements(t, s, n, i) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, i);
  }
};
function hi() {
  return Q(ge.instances, (e) => e._plugins.invalidate());
}
function Tc(e, t, s) {
  const { startAngle: n, x: i, y: o, outerRadius: a, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: d } = l, h = Math.min(c / a, Mt(n - s));
  if (e.beginPath(), e.arc(i, o, a - c / 2, n + h / 2, s - h / 2), r > 0) {
    const f = Math.min(c / r, Mt(n - s));
    e.arc(i, o, r + c / 2, s - f / 2, n + f / 2, !0);
  } else {
    const f = Math.min(c / 2, a * Mt(n - s));
    if (d === "round")
      e.arc(i, o, f, s - Z / 2, n + Z / 2, !0);
    else if (d === "bevel") {
      const g = 2 * f * f, p = -g * Math.cos(s + Z / 2) + i, v = -g * Math.sin(s + Z / 2) + o, b = g * Math.cos(n + Z / 2) + i, m = g * Math.sin(n + Z / 2) + o;
      e.lineTo(p, v), e.lineTo(b, m);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Bc(e, t, s) {
  const { startAngle: n, pixelMargin: i, x: o, y: a, outerRadius: r, innerRadius: l } = t;
  let c = i / r;
  e.beginPath(), e.arc(o, a, r, n - c, s + c), l > i ? (c = i / l, e.arc(o, a, l, s + c, n - c, !0)) : e.arc(o, a, i, s + dt, n - dt), e.closePath(), e.clip();
}
function Lc(e) {
  return Qs(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Ec(e, t, s, n) {
  const i = Lc(e.options.borderRadius), o = (s - t) / 2, a = Math.min(o, n * t / 2), r = (l) => {
    const c = (s - Math.min(o, l)) * n / 2;
    return mt(l, 0, Math.min(o, c));
  };
  return {
    outerStart: r(i.outerStart),
    outerEnd: r(i.outerEnd),
    innerStart: mt(i.innerStart, 0, a),
    innerEnd: mt(i.innerEnd, 0, a)
  };
}
function ae(e, t, s, n) {
  return {
    x: s + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function as(e, t, s, n, i, o) {
  const { x: a, y: r, startAngle: l, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + n + s - c, 0), f = d > 0 ? d + n + s + c : 0;
  let g = 0;
  const p = i - l;
  if (n) {
    const O = d > 0 ? d - n : 0, j = h > 0 ? h - n : 0, G = (O + j) / 2, H = G !== 0 ? p * G / (G + n) : p;
    g = (p - H) / 2;
  }
  const v = Math.max(1e-3, p * h - s / Z) / h, b = (p - v) / 2, m = l + b + g, y = i - b - g, { outerStart: _, outerEnd: x, innerStart: S, innerEnd: C } = Ec(t, f, h, y - m), w = h - _, D = h - x, P = m + _ / w, A = y - x / D, R = f + S, T = f + C, N = m + S / R, F = y - C / T;
  if (e.beginPath(), o) {
    const O = (P + A) / 2;
    if (e.arc(a, r, h, P, O), e.arc(a, r, h, O, A), x > 0) {
      const B = ae(D, A, a, r);
      e.arc(B.x, B.y, x, A, y + dt);
    }
    const j = ae(T, y, a, r);
    if (e.lineTo(j.x, j.y), C > 0) {
      const B = ae(T, F, a, r);
      e.arc(B.x, B.y, C, y + dt, F + Math.PI);
    }
    const G = (y - C / f + (m + S / f)) / 2;
    if (e.arc(a, r, f, y - C / f, G, !0), e.arc(a, r, f, G, m + S / f, !0), S > 0) {
      const B = ae(R, N, a, r);
      e.arc(B.x, B.y, S, N + Math.PI, m - dt);
    }
    const H = ae(w, m, a, r);
    if (e.lineTo(H.x, H.y), _ > 0) {
      const B = ae(w, P, a, r);
      e.arc(B.x, B.y, _, m - dt, P);
    }
  } else {
    e.moveTo(a, r);
    const O = Math.cos(P) * h + a, j = Math.sin(P) * h + r;
    e.lineTo(O, j);
    const G = Math.cos(A) * h + a, H = Math.sin(A) * h + r;
    e.lineTo(G, H);
  }
  e.closePath();
}
function Oc(e, t, s, n, i) {
  const { fullCircles: o, startAngle: a, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    as(e, t, s, n, l, i);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(r) || (l = a + (r % nt || nt));
  }
  return as(e, t, s, n, l, i), e.fill(), l;
}
function Rc(e, t, s, n, i) {
  const { fullCircles: o, startAngle: a, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: f, borderRadius: g } = l, p = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, p ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let v = t.endAngle;
  if (o) {
    as(e, t, s, n, v, i);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(r) || (v = a + (r % nt || nt));
  }
  p && Bc(e, t, v), l.selfJoin && v - a >= Z && g === 0 && d !== "miter" && Tc(e, t, v), o || (as(e, t, s, n, v, i), e.stroke());
}
class Ic extends Ht {
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
  inRange(t, s, n) {
    const i = this.getProps([
      "x",
      "y"
    ], n), { angle: o, distance: a } = Gi(i, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), f = (this.options.spacing + this.options.borderWidth) / 2, g = V(h, l - r), p = Be(o, r, l) && r !== l, v = g >= nt || p, b = zt(a, c + f, d + f);
    return v && b;
  }
  getCenterPoint(t) {
    const { x: s, y: n, startAngle: i, endAngle: o, innerRadius: a, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, d = (i + o) / 2, h = (a + r + c + l) / 2;
    return {
      x: s + Math.cos(d) * h,
      y: n + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: n } = this, i = (s.offset || 0) / 4, o = (s.spacing || 0) / 2, a = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > nt ? Math.floor(n / nt) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * i, Math.sin(r) * i);
    const l = 1 - Math.sin(Math.min(Z, n || 0)), c = i * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, Oc(t, this, c, o, a), Rc(t, this, c, o, a), t.restore();
  }
}
function $o(e, t, s = t) {
  e.lineCap = V(s.borderCapStyle, t.borderCapStyle), e.setLineDash(V(s.borderDash, t.borderDash)), e.lineDashOffset = V(s.borderDashOffset, t.borderDashOffset), e.lineJoin = V(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = V(s.borderWidth, t.borderWidth), e.strokeStyle = V(s.borderColor, t.borderColor);
}
function zc(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Hc(e) {
  return e.stepped ? ir : e.tension || e.cubicInterpolationMode === "monotone" ? or : zc;
}
function Ao(e, t, s = {}) {
  const n = e.length, { start: i = 0, end: o = n - 1 } = s, { start: a, end: r } = t, l = Math.max(i, a), c = Math.min(o, r), d = i < a && o < a || i > r && o > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !d ? n + c - l : c - l
  };
}
function Nc(e, t, s, n) {
  const { points: i, options: o } = t, { count: a, start: r, loop: l, ilen: c } = Ao(i, s, n), d = Hc(o);
  let { move: h = !0, reverse: f } = n || {}, g, p, v;
  for (g = 0; g <= c; ++g)
    p = i[(r + (f ? c - g : g)) % a], !p.skip && (h ? (e.moveTo(p.x, p.y), h = !1) : d(e, v, p, f, o.stepped), v = p);
  return l && (p = i[(r + (f ? c : 0)) % a], d(e, v, p, f, o.stepped)), !!l;
}
function Wc(e, t, s, n) {
  const i = t.points, { count: o, start: a, ilen: r } = Ao(i, s, n), { move: l = !0, reverse: c } = n || {};
  let d = 0, h = 0, f, g, p, v, b, m;
  const y = (x) => (a + (c ? r - x : x)) % o, _ = () => {
    v !== b && (e.lineTo(d, b), e.lineTo(d, v), e.lineTo(d, m));
  };
  for (l && (g = i[y(0)], e.moveTo(g.x, g.y)), f = 0; f <= r; ++f) {
    if (g = i[y(f)], g.skip)
      continue;
    const x = g.x, S = g.y, C = x | 0;
    C === p ? (S < v ? v = S : S > b && (b = S), d = (h * d + x) / ++h) : (_(), e.lineTo(x, S), p = C, h = 0, v = b = S), m = S;
  }
  _();
}
function Hs(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Wc : Nc;
}
function Vc(e) {
  return e.stepped ? Rr : e.tension || e.cubicInterpolationMode === "monotone" ? Ir : Qt;
}
function jc(e, t, s, n) {
  let i = t._path;
  i || (i = t._path = new Path2D(), t.path(i, s, n) && i.closePath()), $o(e, t.options), e.stroke(i);
}
function Yc(e, t, s, n) {
  const { segments: i, options: o } = t, a = Hs(t);
  for (const r of i)
    $o(e, o, r.style), e.beginPath(), a(e, t, r, {
      start: s,
      end: s + n - 1
    }) && e.closePath(), e.stroke();
}
const qc = typeof Path2D == "function";
function Uc(e, t, s, n) {
  qc && !t.options.segment ? jc(e, t, s, n) : Yc(e, t, s, n);
}
class us extends Ht {
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
  updateControlPoints(t, s) {
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const i = n.spanGaps ? this._loop : this._fullLoop;
      Ar(this._points, n, t, i, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = jr(this, this.options.segment));
  }
  first() {
    const t = this.segments, s = this.points;
    return t.length && s[t[0].start];
  }
  last() {
    const t = this.segments, s = this.points, n = t.length;
    return n && s[t[n - 1].end];
  }
  interpolate(t, s) {
    const n = this.options, i = t[s], o = this.points, a = go(this, {
      property: s,
      start: i,
      end: i
    });
    if (!a.length)
      return;
    const r = [], l = Vc(n);
    let c, d;
    for (c = 0, d = a.length; c < d; ++c) {
      const { start: h, end: f } = a[c], g = o[h], p = o[f];
      if (g === p) {
        r.push(g);
        continue;
      }
      const v = Math.abs((i - g[s]) / (p[s] - g[s])), b = l(g, p, v, n.stepped);
      b[s] = t[s], r.push(b);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, n) {
    return Hs(this)(t, this, s, n);
  }
  path(t, s, n) {
    const i = this.segments, o = Hs(this);
    let a = this._loop;
    s = s || 0, n = n || this.points.length - s;
    for (const r of i)
      a &= o(t, this, r, {
        start: s,
        end: s + n - 1
      });
    return !!a;
  }
  draw(t, s, n, i) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Uc(t, this, n, i), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function ui(e, t, s, n) {
  const i = e.options, { [s]: o } = e.getProps([
    s
  ], n);
  return Math.abs(t - o) < i.radius + i.hitRadius;
}
class Xc extends Ht {
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
  inRange(t, s, n) {
    const i = this.options, { x: o, y: a } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(t - o, 2) + Math.pow(s - a, 2) < Math.pow(i.hitRadius + i.radius, 2);
  }
  inXRange(t, s) {
    return ui(this, t, "x", s);
  }
  inYRange(t, s) {
    return ui(this, t, "y", s);
  }
  getCenterPoint(t) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: n
    };
  }
  size(t) {
    t = t || this.options || {};
    let s = t.radius || 0;
    s = Math.max(s, s && t.hoverRadius || 0);
    const n = s && t.borderWidth || 0;
    return (s + n) * 2;
  }
  draw(t, s) {
    const n = this.options;
    this.skip || n.radius < 0.1 || !Le(this, s, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, Rs(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Po(e, t) {
  const { x: s, y: n, base: i, width: o, height: a } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, c, d, h;
  return e.horizontal ? (h = a / 2, r = Math.min(s, i), l = Math.max(s, i), c = n - h, d = n + h) : (h = o / 2, r = s - h, l = s + h, c = Math.min(n, i), d = Math.max(n, i)), {
    left: r,
    top: c,
    right: l,
    bottom: d
  };
}
function Vt(e, t, s, n) {
  return e ? 0 : mt(t, s, n);
}
function Kc(e, t, s) {
  const n = e.options.borderWidth, i = e.borderSkipped, o = no(n);
  return {
    t: Vt(i.top, o.top, 0, s),
    r: Vt(i.right, o.right, 0, t),
    b: Vt(i.bottom, o.bottom, 0, s),
    l: Vt(i.left, o.left, 0, t)
  };
}
function Gc(e, t, s) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), i = e.options.borderRadius, o = le(i), a = Math.min(t, s), r = e.borderSkipped, l = n || q(i);
  return {
    topLeft: Vt(!l || r.top || r.left, o.topLeft, 0, a),
    topRight: Vt(!l || r.top || r.right, o.topRight, 0, a),
    bottomLeft: Vt(!l || r.bottom || r.left, o.bottomLeft, 0, a),
    bottomRight: Vt(!l || r.bottom || r.right, o.bottomRight, 0, a)
  };
}
function Qc(e) {
  const t = Po(e), s = t.right - t.left, n = t.bottom - t.top, i = Kc(e, s / 2, n / 2), o = Gc(e, s / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: n,
      radius: o
    },
    inner: {
      x: t.left + i.l,
      y: t.top + i.t,
      w: s - i.l - i.r,
      h: n - i.t - i.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, o.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(i.b, i.r))
      }
    }
  };
}
function $s(e, t, s, n) {
  const i = t === null, o = s === null, r = e && !(i && o) && Po(e, n);
  return r && (i || zt(t, r.left, r.right)) && (o || zt(s, r.top, r.bottom));
}
function Zc(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Jc(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function As(e, t, s = {}) {
  const n = e.x !== s.x ? -t : 0, i = e.y !== s.y ? -t : 0, o = (e.x + e.w !== s.x + s.w ? t : 0) - n, a = (e.y + e.h !== s.y + s.h ? t : 0) - i;
  return {
    x: e.x + n,
    y: e.y + i,
    w: e.w + o,
    h: e.h + a,
    radius: e.radius
  };
}
class td extends Ht {
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
    const { inflateAmount: s, options: { borderColor: n, backgroundColor: i } } = this, { inner: o, outer: a } = Qc(this), r = Zc(a.radius) ? ns : Jc;
    t.save(), (a.w !== o.w || a.h !== o.h) && (t.beginPath(), r(t, As(a, s, o)), t.clip(), r(t, As(o, -s, a)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, As(o, s)), t.fillStyle = i, t.fill(), t.restore();
  }
  inRange(t, s, n) {
    return $s(this, t, s, n);
  }
  inXRange(t, s) {
    return $s(this, t, null, s);
  }
  inYRange(t, s) {
    return $s(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: n, base: i, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (s + i) / 2 : s,
      y: o ? n : (n + i) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function ed(e, t, s) {
  const n = e.segments, i = e.points, o = t.points, a = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = fs(l, c, i);
    const d = Ns(s, i[l], i[c], r.loop);
    if (!t.segments) {
      a.push({
        source: r,
        target: d,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const h = go(t, d);
    for (const f of h) {
      const g = Ns(s, o[f.start], o[f.end], f.loop), p = fo(r, i, g);
      for (const v of p)
        a.push({
          source: v,
          target: f,
          start: {
            [s]: fi(d, g, "start", Math.max)
          },
          end: {
            [s]: fi(d, g, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function Ns(e, t, s, n) {
  if (n)
    return;
  let i = t[e], o = s[e];
  return e === "angle" && (i = Mt(i), o = Mt(o)), {
    property: e,
    start: i,
    end: o
  };
}
function sd(e, t) {
  const { x: s = null, y: n = null } = e || {}, i = t.points, o = [];
  return t.segments.forEach(({ start: a, end: r }) => {
    r = fs(a, r, i);
    const l = i[a], c = i[r];
    n !== null ? (o.push({
      x: l.x,
      y: n
    }), o.push({
      x: c.x,
      y: n
    })) : s !== null && (o.push({
      x: s,
      y: l.y
    }), o.push({
      x: s,
      y: c.y
    }));
  }), o;
}
function fs(e, t, s) {
  for (; t > e; t--) {
    const n = s[t];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return t;
}
function fi(e, t, s, n) {
  return e && t ? n(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Fo(e, t) {
  let s = [], n = !1;
  return lt(e) ? (n = !0, s = e) : s = sd(e, t), s.length ? new us({
    points: s,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function gi(e) {
  return e && e.fill !== !1;
}
function nd(e, t, s) {
  let i = e[t].fill;
  const o = [
    t
  ];
  let a;
  if (!s)
    return i;
  for (; i !== !1 && o.indexOf(i) === -1; ) {
    if (!vt(i))
      return i;
    if (a = e[i], !a)
      return !1;
    if (a.visible)
      return i;
    o.push(i), i = a.fill;
  }
  return !1;
}
function id(e, t, s) {
  const n = ld(e);
  if (q(n))
    return isNaN(n.value) ? !1 : n;
  let i = parseFloat(n);
  return vt(i) && Math.floor(i) === i ? od(n[0], t, i, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function od(e, t, s, n) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= n ? !1 : s;
}
function ad(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : q(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function rd(e, t, s) {
  let n;
  return e === "start" ? n = s : e === "end" ? n = t.options.reverse ? t.min : t.max : q(e) ? n = e.value : n = t.getBaseValue(), n;
}
function ld(e) {
  const t = e.options, s = t.fill;
  let n = V(s && s.target, s);
  return n === void 0 && (n = !!t.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function cd(e) {
  const { scale: t, index: s, line: n } = e, i = [], o = n.segments, a = n.points, r = dd(t, s);
  r.push(Fo({
    x: null,
    y: t.bottom
  }, n));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let d = c.start; d <= c.end; d++)
      hd(i, a[d], r);
  }
  return new us({
    points: i,
    options: {}
  });
}
function dd(e, t) {
  const s = [], n = e.getMatchingVisibleMetas("line");
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (o.index === t)
      break;
    o.hidden || s.unshift(o.dataset);
  }
  return s;
}
function hd(e, t, s) {
  const n = [];
  for (let i = 0; i < s.length; i++) {
    const o = s[i], { first: a, last: r, point: l } = ud(o, t, "x");
    if (!(!l || a && r)) {
      if (a)
        n.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...n);
}
function ud(e, t, s) {
  const n = e.interpolate(t, s);
  if (!n)
    return {};
  const i = n[s], o = e.segments, a = e.points;
  let r = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const d = o[c], h = a[d.start][s], f = a[d.end][s];
    if (zt(i, h, f)) {
      r = i === h, l = i === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: n
  };
}
class To {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, n) {
    const { x: i, y: o, radius: a } = this;
    return s = s || {
      start: 0,
      end: nt
    }, t.arc(i, o, a, s.end, s.start, !0), !n.bounds;
  }
  interpolate(t) {
    const { x: s, y: n, radius: i } = this, o = t.angle;
    return {
      x: s + Math.cos(o) * i,
      y: n + Math.sin(o) * i,
      angle: o
    };
  }
}
function fd(e) {
  const { chart: t, fill: s, line: n } = e;
  if (vt(s))
    return gd(t, s);
  if (s === "stack")
    return cd(e);
  if (s === "shape")
    return !0;
  const i = pd(e);
  return i instanceof To ? i : Fo(i, n);
}
function gd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function pd(e) {
  return (e.scale || {}).getPointPositionForValue ? bd(e) : md(e);
}
function md(e) {
  const { scale: t = {}, fill: s } = e, n = ad(s, t);
  if (vt(n)) {
    const i = t.isHorizontal();
    return {
      x: i ? n : null,
      y: i ? null : n
    };
  }
  return null;
}
function bd(e) {
  const { scale: t, fill: s } = e, n = t.options, i = t.getLabels().length, o = n.reverse ? t.max : t.min, a = rd(s, t, o), r = [];
  if (n.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new To({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(a)
    });
  }
  for (let l = 0; l < i; ++l)
    r.push(t.getPointPositionForValue(l, a));
  return r;
}
function Ps(e, t, s) {
  const n = fd(t), { chart: i, index: o, line: a, scale: r, axis: l } = t, c = a.options, d = c.fill, h = c.backgroundColor, { above: f = h, below: g = h } = d || {}, p = i.getDatasetMeta(o), v = po(i, p);
  n && a.points.length && (rs(e, s), vd(e, {
    line: a,
    target: n,
    above: f,
    below: g,
    area: s,
    scale: r,
    axis: l,
    clip: v
  }), ls(e));
}
function vd(e, t) {
  const { line: s, target: n, above: i, below: o, area: a, scale: r, clip: l } = t, c = s._loop ? "angle" : t.axis;
  e.save();
  let d = o;
  o !== i && (c === "x" ? (pi(e, n, a.top), Fs(e, {
    line: s,
    target: n,
    color: i,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), pi(e, n, a.bottom)) : c === "y" && (mi(e, n, a.left), Fs(e, {
    line: s,
    target: n,
    color: o,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), mi(e, n, a.right), d = i)), Fs(e, {
    line: s,
    target: n,
    color: d,
    scale: r,
    property: c,
    clip: l
  }), e.restore();
}
function pi(e, t, s) {
  const { segments: n, points: i } = t;
  let o = !0, a = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, d = i[l], h = i[fs(l, c, i)];
    o ? (e.moveTo(d.x, d.y), o = !1) : (e.lineTo(d.x, s), e.lineTo(d.x, d.y)), a = !!t.pathSegment(e, r, {
      move: a
    }), a ? e.closePath() : e.lineTo(h.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function mi(e, t, s) {
  const { segments: n, points: i } = t;
  let o = !0, a = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, d = i[l], h = i[fs(l, c, i)];
    o ? (e.moveTo(d.x, d.y), o = !1) : (e.lineTo(s, d.y), e.lineTo(d.x, d.y)), a = !!t.pathSegment(e, r, {
      move: a
    }), a ? e.closePath() : e.lineTo(s, h.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Fs(e, t) {
  const { line: s, target: n, property: i, color: o, scale: a, clip: r } = t, l = ed(s, n, i);
  for (const { source: c, target: d, start: h, end: f } of l) {
    const { style: { backgroundColor: g = o } = {} } = c, p = n !== !0;
    e.save(), e.fillStyle = g, yd(e, a, r, p && Ns(i, h, f)), e.beginPath();
    const v = !!s.pathSegment(e, c);
    let b;
    if (p) {
      v ? e.closePath() : bi(e, n, f, i);
      const m = !!n.pathSegment(e, d, {
        move: v,
        reverse: !0
      });
      b = v && m, b || bi(e, n, h, i);
    }
    e.closePath(), e.fill(b ? "evenodd" : "nonzero"), e.restore();
  }
}
function yd(e, t, s, n) {
  const i = t.chart.chartArea, { property: o, start: a, end: r } = n || {};
  if (o === "x" || o === "y") {
    let l, c, d, h;
    o === "x" ? (l = a, c = i.top, d = r, h = i.bottom) : (l = i.left, c = a, d = i.right, h = r), e.beginPath(), s && (l = Math.max(l, s.left), d = Math.min(d, s.right), c = Math.max(c, s.top), h = Math.min(h, s.bottom)), e.rect(l, c, d - l, h - c), e.clip();
  }
}
function bi(e, t, s, n) {
  const i = t.interpolate(s, n);
  i && e.lineTo(i.x, i.y);
}
var _d = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const n = (e.data.datasets || []).length, i = [];
    let o, a, r, l;
    for (a = 0; a < n; ++a)
      o = e.getDatasetMeta(a), r = o.dataset, l = null, r && r.options && r instanceof us && (l = {
        visible: e.isDatasetVisible(a),
        index: a,
        fill: id(r, a, n),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, i.push(l);
    for (a = 0; a < n; ++a)
      l = i[a], !(!l || l.fill === !1) && (l.fill = nd(i, a, s.propagate));
  },
  beforeDraw(e, t, s) {
    const n = s.drawTime === "beforeDraw", i = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let a = i.length - 1; a >= 0; --a) {
      const r = i[a].$filler;
      r && (r.line.updateControlPoints(o, r.axis), n && r.fill && Ps(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const n = e.getSortedVisibleDatasetMetas();
    for (let i = n.length - 1; i >= 0; --i) {
      const o = n[i].$filler;
      gi(o) && Ps(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const n = t.meta.$filler;
    !gi(n) || s.drawTime !== "beforeDatasetDraw" || Ps(e.ctx, n, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const vi = (e, t) => {
  let { boxHeight: s = t, boxWidth: n = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, xd = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class yi extends Ht {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s, n) {
    this.maxWidth = t, this.maxHeight = s, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let s = et(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (s = s.filter((n) => t.filter(n, this.chart.data))), t.sort && (s = s.sort((n, i) => t.sort(n, i, this.chart.data))), this.options.reverse && s.reverse(), this.legendItems = s;
  }
  fit() {
    const { options: t, ctx: s } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, i = bt(n.font), o = i.size, a = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = vi(n, o);
    let c, d;
    s.font = i.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(a, o, r, l) + 10) : (d = this.maxHeight, c = this._fitCols(a, i, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, n, i) {
    const { ctx: o, maxWidth: a, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = i + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, g = -d;
    return this.legendItems.forEach((p, v) => {
      const b = n + s / 2 + o.measureText(p.text).width;
      (v === 0 || c[c.length - 1] + b + 2 * r > a) && (h += d, c[c.length - (v > 0 ? 0 : 1)] = 0, g += d, f++), l[v] = {
        left: 0,
        top: g,
        row: f,
        width: b,
        height: i
      }, c[c.length - 1] += b + r;
    }), h;
  }
  _fitCols(t, s, n, i) {
    const { ctx: o, maxHeight: a, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], d = a - t;
    let h = r, f = 0, g = 0, p = 0, v = 0;
    return this.legendItems.forEach((b, m) => {
      const { itemWidth: y, itemHeight: _ } = kd(n, s, o, b, i);
      m > 0 && g + _ + 2 * r > d && (h += f + r, c.push({
        width: f,
        height: g
      }), p += f + r, v++, f = g = 0), l[m] = {
        left: p,
        top: g,
        col: v,
        width: y,
        height: _
      }, f = Math.max(f, y), g += _ + r;
    }), h += f, c.push({
      width: f,
      height: g
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: n, labels: { padding: i }, rtl: o } } = this, a = ce(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = pt(n, this.left + i, this.right - this.lineWidths[r]);
      for (const c of s)
        r !== c.row && (r = c.row, l = pt(n, this.left + i, this.right - this.lineWidths[r])), c.top += this.top + t + i, c.left = a.leftForLtr(a.x(l), c.width), l += c.width + i;
    } else {
      let r = 0, l = pt(n, this.top + t + i, this.bottom - this.columnSizes[r].height);
      for (const c of s)
        c.col !== r && (r = c.col, l = pt(n, this.top + t + i, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + i, c.left = a.leftForLtr(a.x(c.left), c.width), l += c.height + i;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      rs(t, this), this._draw(), ls(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: n, ctx: i } = this, { align: o, labels: a } = t, r = at.color, l = ce(t.rtl, this.left, this.width), c = bt(a.font), { padding: d } = a, h = c.size, f = h / 2;
    let g;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: p, boxHeight: v, itemHeight: b } = vi(a, h), m = function(C, w, D) {
      if (isNaN(p) || p <= 0 || isNaN(v) || v < 0)
        return;
      i.save();
      const P = V(D.lineWidth, 1);
      if (i.fillStyle = V(D.fillStyle, r), i.lineCap = V(D.lineCap, "butt"), i.lineDashOffset = V(D.lineDashOffset, 0), i.lineJoin = V(D.lineJoin, "miter"), i.lineWidth = P, i.strokeStyle = V(D.strokeStyle, r), i.setLineDash(V(D.lineDash, [])), a.usePointStyle) {
        const A = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: D.pointStyle,
          rotation: D.rotation,
          borderWidth: P
        }, R = l.xPlus(C, p / 2), T = w + f;
        so(i, A, R, T, a.pointStyleWidth && p);
      } else {
        const A = w + Math.max((h - v) / 2, 0), R = l.leftForLtr(C, p), T = le(D.borderRadius);
        i.beginPath(), Object.values(T).some((N) => N !== 0) ? ns(i, {
          x: R,
          y: A,
          w: p,
          h: v,
          radius: T
        }) : i.rect(R, A, p, v), i.fill(), P !== 0 && i.stroke();
      }
      i.restore();
    }, y = function(C, w, D) {
      Ee(i, D.text, C, w + b / 2, c, {
        strikethrough: D.hidden,
        textAlign: l.textAlign(D.textAlign)
      });
    }, _ = this.isHorizontal(), x = this._computeTitleHeight();
    _ ? g = {
      x: pt(o, this.left + d, this.right - n[0]),
      y: this.top + d + x,
      line: 0
    } : g = {
      x: this.left + d,
      y: pt(o, this.top + x + d, this.bottom - s[0].height),
      line: 0
    }, co(this.ctx, t.textDirection);
    const S = b + d;
    this.legendItems.forEach((C, w) => {
      i.strokeStyle = C.fontColor, i.fillStyle = C.fontColor;
      const D = i.measureText(C.text).width, P = l.textAlign(C.textAlign || (C.textAlign = a.textAlign)), A = p + f + D;
      let R = g.x, T = g.y;
      l.setWidth(this.width), _ ? w > 0 && R + A + d > this.right && (T = g.y += S, g.line++, R = g.x = pt(o, this.left + d, this.right - n[g.line])) : w > 0 && T + S > this.bottom && (R = g.x = R + s[g.line].width + d, g.line++, T = g.y = pt(o, this.top + x + d, this.bottom - s[g.line].height));
      const N = l.x(R);
      if (m(N, T, C), R = Ya(P, R + p + f, _ ? R + A : this.right, t.rtl), y(l.x(R), T, C), _)
        g.x += A + d;
      else if (typeof C.text != "string") {
        const F = c.lineHeight;
        g.y += Bo(C, F) + d;
      } else
        g.y += S;
    }), ho(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, n = bt(s.font), i = At(s.padding);
    if (!s.display)
      return;
    const o = ce(t.rtl, this.left, this.width), a = this.ctx, r = s.position, l = n.size / 2, c = i.top + l;
    let d, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), d = this.top + c, h = pt(t.align, h, this.right - f);
    else {
      const p = this.columnSizes.reduce((v, b) => Math.max(v, b.height), 0);
      d = c + pt(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const g = pt(r, h, h + f);
    a.textAlign = o.textAlign(Xs(r)), a.textBaseline = "middle", a.strokeStyle = s.color, a.fillStyle = s.color, a.font = n.string, Ee(a, s.text, g, d, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = bt(t.font), n = At(t.padding);
    return t.display ? s.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, s) {
    let n, i, o;
    if (zt(t, this.left, this.right) && zt(s, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, n = 0; n < o.length; ++n)
        if (i = o[n], zt(t, i.left, i.left + i.width) && zt(s, i.top, i.top + i.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!wd(t.type, s))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const i = this._hoveredItem, o = xd(i, n);
      i && !o && et(s.onLeave, [
        t,
        i,
        this
      ], this), this._hoveredItem = n, n && !o && et(s.onHover, [
        t,
        n,
        this
      ], this);
    } else n && et(s.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function kd(e, t, s, n, i) {
  const o = Md(n, e, t, s), a = Sd(i, n, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: a
  };
}
function Md(e, t, s, n) {
  let i = e.text;
  return i && typeof i != "string" && (i = i.reduce((o, a) => o.length > a.length ? o : a)), t + s.size / 2 + n.measureText(i).width;
}
function Sd(e, t, s) {
  let n = e;
  return typeof t.text != "string" && (n = Bo(t, s)), n;
}
function Bo(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function wd(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var on = {
  id: "legend",
  _element: yi,
  start(e, t, s) {
    const n = e.legend = new yi({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Dt.configure(e, n, s), Dt.addBox(e, n);
  },
  stop(e) {
    Dt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const n = e.legend;
    Dt.configure(e, n, s), n.options = s;
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
    onClick(e, t, s) {
      const n = t.datasetIndex, i = s.chart;
      i.isDatasetVisible(n) ? (i.hide(n), t.hidden = !0) : (i.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: n, textAlign: i, color: o, useBorderRadius: a, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(s ? 0 : void 0), d = At(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: i || c.textAlign,
            borderRadius: a && (r || c.borderRadius),
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
class Lo extends Ht {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s) {
    const n = this.options;
    if (this.left = 0, this.top = 0, !n.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = s;
    const i = lt(n.text) ? n.text.length : 1;
    this._padding = At(n.padding);
    const o = i * bt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: n, bottom: i, right: o, options: a } = this, r = a.align;
    let l = 0, c, d, h;
    return this.isHorizontal() ? (d = pt(r, n, o), h = s + t, c = o - n) : (a.position === "left" ? (d = n + t, h = pt(r, i, s), l = Z * -0.5) : (d = o - t, h = pt(r, s, i), l = Z * 0.5), c = i - s), {
      titleX: d,
      titleY: h,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const n = bt(s.font), o = n.lineHeight / 2 + this._padding.top, { titleX: a, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(o);
    Ee(t, s.text, 0, 0, n, {
      color: s.color,
      maxWidth: l,
      rotation: c,
      textAlign: Xs(s.align),
      textBaseline: "middle",
      translation: [
        a,
        r
      ]
    });
  }
}
function Cd(e, t) {
  const s = new Lo({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Dt.configure(e, s, t), Dt.addBox(e, s), e.titleBlock = s;
}
var Eo = {
  id: "title",
  _element: Lo,
  start(e, t, s) {
    Cd(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Dt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const n = e.titleBlock;
    Dt.configure(e, n, s), n.options = s;
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
const Se = {
  average(e) {
    if (!e.length)
      return !1;
    let t, s, n = /* @__PURE__ */ new Set(), i = 0, o = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        n.add(l.x), i += l.y, ++o;
      }
    }
    return o === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((r, l) => r + l) / n.size,
      y: i / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, n = t.y, i = Number.POSITIVE_INFINITY, o, a, r;
    for (o = 0, a = e.length; o < a; ++o) {
      const l = e[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), d = Es(t, c);
        d < i && (i = d, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      s = l.x, n = l.y;
    }
    return {
      x: s,
      y: n
    };
  }
};
function Ft(e, t) {
  return t && (lt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Ot(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Dd(e, t) {
  const { element: s, datasetIndex: n, index: i } = t, o = e.getDatasetMeta(n).controller, { label: a, value: r } = o.getLabelAndValue(i);
  return {
    chart: e,
    label: a,
    parsed: o.getParsed(i),
    raw: e.data.datasets[n].data[i],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: i,
    datasetIndex: n,
    element: s
  };
}
function _i(e, t) {
  const s = e.chart.ctx, { body: n, footer: i, title: o } = e, { boxWidth: a, boxHeight: r } = t, l = bt(t.bodyFont), c = bt(t.titleFont), d = bt(t.footerFont), h = o.length, f = i.length, g = n.length, p = At(t.padding);
  let v = p.height, b = 0, m = n.reduce((x, S) => x + S.before.length + S.lines.length + S.after.length, 0);
  if (m += e.beforeBody.length + e.afterBody.length, h && (v += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), m) {
    const x = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    v += g * x + (m - g) * l.lineHeight + (m - 1) * t.bodySpacing;
  }
  f && (v += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let y = 0;
  const _ = function(x) {
    b = Math.max(b, s.measureText(x).width + y);
  };
  return s.save(), s.font = c.string, Q(e.title, _), s.font = l.string, Q(e.beforeBody.concat(e.afterBody), _), y = t.displayColors ? a + 2 + t.boxPadding : 0, Q(n, (x) => {
    Q(x.before, _), Q(x.lines, _), Q(x.after, _);
  }), y = 0, s.font = d.string, Q(e.footer, _), s.restore(), b += p.width, {
    width: b,
    height: v
  };
}
function $d(e, t) {
  const { y: s, height: n } = t;
  return s < n / 2 ? "top" : s > e.height - n / 2 ? "bottom" : "center";
}
function Ad(e, t, s, n) {
  const { x: i, width: o } = n, a = s.caretSize + s.caretPadding;
  if (e === "left" && i + o + a > t.width || e === "right" && i - o - a < 0)
    return !0;
}
function Pd(e, t, s, n) {
  const { x: i, width: o } = s, { width: a, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = i <= (r + l) / 2 ? "left" : "right" : i <= o / 2 ? c = "left" : i >= a - o / 2 && (c = "right"), Ad(c, e, t, s) && (c = "center"), c;
}
function xi(e, t, s) {
  const n = s.yAlign || t.yAlign || $d(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || Pd(e, t, s, n),
    yAlign: n
  };
}
function Fd(e, t) {
  let { x: s, width: n } = e;
  return t === "right" ? s -= n : t === "center" && (s -= n / 2), s;
}
function Td(e, t, s) {
  let { y: n, height: i } = e;
  return t === "top" ? n += s : t === "bottom" ? n -= i + s : n -= i / 2, n;
}
function ki(e, t, s, n) {
  const { caretSize: i, caretPadding: o, cornerRadius: a } = e, { xAlign: r, yAlign: l } = s, c = i + o, { topLeft: d, topRight: h, bottomLeft: f, bottomRight: g } = le(a);
  let p = Fd(t, r);
  const v = Td(t, l, c);
  return l === "center" ? r === "left" ? p += c : r === "right" && (p -= c) : r === "left" ? p -= Math.max(d, f) + i : r === "right" && (p += Math.max(h, g) + i), {
    x: mt(p, 0, n.width - t.width),
    y: mt(v, 0, n.height - t.height)
  };
}
function Ke(e, t, s) {
  const n = At(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Mi(e) {
  return Ft([], Ot(e));
}
function Bd(e, t, s) {
  return se(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Si(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const Oo = {
  beforeTitle: Lt,
  title(e) {
    if (e.length > 0) {
      const t = e[0], s = t.chart.data.labels, n = s ? s.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (n > 0 && t.dataIndex < n)
        return s[t.dataIndex];
    }
    return "";
  },
  afterTitle: Lt,
  beforeBody: Lt,
  beforeLabel: Lt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return K(s) || (t += s), t;
  },
  labelColor(e) {
    const s = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor,
      borderWidth: s.borderWidth,
      borderDash: s.borderDash,
      borderDashOffset: s.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const s = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: s.pointStyle,
      rotation: s.rotation
    };
  },
  afterLabel: Lt,
  afterBody: Lt,
  beforeFooter: Lt,
  footer: Lt,
  afterFooter: Lt
};
function yt(e, t, s, n) {
  const i = e[t].call(s, n);
  return typeof i > "u" ? Oo[t].call(s, n) : i;
}
class wi extends Ht {
  static positioners = Se;
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
    const s = this.chart, n = this.options.setContext(this.getContext()), i = n.enabled && s.options.animation && n.animations, o = new mo(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Bd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: n } = s, i = yt(n, "beforeTitle", this, t), o = yt(n, "title", this, t), a = yt(n, "afterTitle", this, t);
    let r = [];
    return r = Ft(r, Ot(i)), r = Ft(r, Ot(o)), r = Ft(r, Ot(a)), r;
  }
  getBeforeBody(t, s) {
    return Mi(yt(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: n } = s, i = [];
    return Q(t, (o) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, r = Si(n, o);
      Ft(a.before, Ot(yt(r, "beforeLabel", this, o))), Ft(a.lines, yt(r, "label", this, o)), Ft(a.after, Ot(yt(r, "afterLabel", this, o))), i.push(a);
    }), i;
  }
  getAfterBody(t, s) {
    return Mi(yt(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: n } = s, i = yt(n, "beforeFooter", this, t), o = yt(n, "footer", this, t), a = yt(n, "afterFooter", this, t);
    let r = [];
    return r = Ft(r, Ot(i)), r = Ft(r, Ot(o)), r = Ft(r, Ot(a)), r;
  }
  _createItems(t) {
    const s = this._active, n = this.chart.data, i = [], o = [], a = [];
    let r = [], l, c;
    for (l = 0, c = s.length; l < c; ++l)
      r.push(Dd(this.chart, s[l]));
    return t.filter && (r = r.filter((d, h, f) => t.filter(d, h, f, n))), t.itemSort && (r = r.sort((d, h) => t.itemSort(d, h, n))), Q(r, (d) => {
      const h = Si(t.callbacks, d);
      i.push(yt(h, "labelColor", this, d)), o.push(yt(h, "labelPointStyle", this, d)), a.push(yt(h, "labelTextColor", this, d));
    }), this.labelColors = i, this.labelPointStyles = o, this.labelTextColors = a, this.dataPoints = r, r;
  }
  update(t, s) {
    const n = this.options.setContext(this.getContext()), i = this._active;
    let o, a = [];
    if (!i.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = Se[n.position].call(this, i, this._eventPosition);
      a = this._createItems(n), this.title = this.getTitle(a, n), this.beforeBody = this.getBeforeBody(a, n), this.body = this.getBody(a, n), this.afterBody = this.getAfterBody(a, n), this.footer = this.getFooter(a, n);
      const l = this._size = _i(this, n), c = Object.assign({}, r, l), d = xi(this.chart, n, c), h = ki(n, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, n, i) {
    const o = this.getCaretPosition(t, n, i);
    s.lineTo(o.x1, o.y1), s.lineTo(o.x2, o.y2), s.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, s, n) {
    const { xAlign: i, yAlign: o } = this, { caretSize: a, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: d, bottomRight: h } = le(r), { x: f, y: g } = t, { width: p, height: v } = s;
    let b, m, y, _, x, S;
    return o === "center" ? (x = g + v / 2, i === "left" ? (b = f, m = b - a, _ = x + a, S = x - a) : (b = f + p, m = b + a, _ = x - a, S = x + a), y = b) : (i === "left" ? m = f + Math.max(l, d) + a : i === "right" ? m = f + p - Math.max(c, h) - a : m = this.caretX, o === "top" ? (_ = g, x = _ - a, b = m - a, y = m + a) : (_ = g + v, x = _ + a, b = m + a, y = m - a), S = _), {
      x1: b,
      x2: m,
      x3: y,
      y1: _,
      y2: x,
      y3: S
    };
  }
  drawTitle(t, s, n) {
    const i = this.title, o = i.length;
    let a, r, l;
    if (o) {
      const c = ce(n.rtl, this.x, this.width);
      for (t.x = Ke(this, n.titleAlign, n), s.textAlign = c.textAlign(n.titleAlign), s.textBaseline = "middle", a = bt(n.titleFont), r = n.titleSpacing, s.fillStyle = n.titleColor, s.font = a.string, l = 0; l < o; ++l)
        s.fillText(i[l], c.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + r, l + 1 === o && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, n, i, o) {
    const a = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = o, d = bt(o.bodyFont), h = Ke(this, "left", o), f = i.x(h), g = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, p = s.y + g;
    if (o.usePointStyle) {
      const v = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, b = i.leftForLtr(f, c) + c / 2, m = p + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Rs(t, v, b, m), t.strokeStyle = a.borderColor, t.fillStyle = a.backgroundColor, Rs(t, v, b, m);
    } else {
      t.lineWidth = q(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, t.strokeStyle = a.borderColor, t.setLineDash(a.borderDash || []), t.lineDashOffset = a.borderDashOffset || 0;
      const v = i.leftForLtr(f, c), b = i.leftForLtr(i.xPlus(f, 1), c - 2), m = le(a.borderRadius);
      Object.values(m).some((y) => y !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, ns(t, {
        x: v,
        y: p,
        w: c,
        h: l,
        radius: m
      }), t.fill(), t.stroke(), t.fillStyle = a.backgroundColor, t.beginPath(), ns(t, {
        x: b,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: m
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(v, p, c, l), t.strokeRect(v, p, c, l), t.fillStyle = a.backgroundColor, t.fillRect(b, p + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, s, n) {
    const { body: i } = this, { bodySpacing: o, bodyAlign: a, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: d } = n, h = bt(n.bodyFont);
    let f = h.lineHeight, g = 0;
    const p = ce(n.rtl, this.x, this.width), v = function(D) {
      s.fillText(D, p.x(t.x + g), t.y + f / 2), t.y += f + o;
    }, b = p.textAlign(a);
    let m, y, _, x, S, C, w;
    for (s.textAlign = a, s.textBaseline = "middle", s.font = h.string, t.x = Ke(this, b, n), s.fillStyle = n.bodyColor, Q(this.beforeBody, v), g = r && b !== "right" ? a === "center" ? c / 2 + d : c + 2 + d : 0, x = 0, C = i.length; x < C; ++x) {
      for (m = i[x], y = this.labelTextColors[x], s.fillStyle = y, Q(m.before, v), _ = m.lines, r && _.length && (this._drawColorBox(s, t, x, p, n), f = Math.max(h.lineHeight, l)), S = 0, w = _.length; S < w; ++S)
        v(_[S]), f = h.lineHeight;
      Q(m.after, v);
    }
    g = 0, f = h.lineHeight, Q(this.afterBody, v), t.y -= o;
  }
  drawFooter(t, s, n) {
    const i = this.footer, o = i.length;
    let a, r;
    if (o) {
      const l = ce(n.rtl, this.x, this.width);
      for (t.x = Ke(this, n.footerAlign, n), t.y += n.footerMarginTop, s.textAlign = l.textAlign(n.footerAlign), s.textBaseline = "middle", a = bt(n.footerFont), s.fillStyle = n.footerColor, s.font = a.string, r = 0; r < o; ++r)
        s.fillText(i[r], l.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, s, n, i) {
    const { xAlign: o, yAlign: a } = this, { x: r, y: l } = t, { width: c, height: d } = n, { topLeft: h, topRight: f, bottomLeft: g, bottomRight: p } = le(i.cornerRadius);
    s.fillStyle = i.backgroundColor, s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.beginPath(), s.moveTo(r + h, l), a === "top" && this.drawCaret(t, s, n, i), s.lineTo(r + c - f, l), s.quadraticCurveTo(r + c, l, r + c, l + f), a === "center" && o === "right" && this.drawCaret(t, s, n, i), s.lineTo(r + c, l + d - p), s.quadraticCurveTo(r + c, l + d, r + c - p, l + d), a === "bottom" && this.drawCaret(t, s, n, i), s.lineTo(r + g, l + d), s.quadraticCurveTo(r, l + d, r, l + d - g), a === "center" && o === "left" && this.drawCaret(t, s, n, i), s.lineTo(r, l + h), s.quadraticCurveTo(r, l, r + h, l), s.closePath(), s.fill(), i.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, n = this.$animations, i = n && n.x, o = n && n.y;
    if (i || o) {
      const a = Se[t.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const r = this._size = _i(this, t), l = Object.assign({}, a, this._size), c = xi(s, t, l), d = ki(t, l, c, s);
      (i._to !== d.x || o._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, d));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const s = this.options.setContext(this.getContext());
    let n = this.opacity;
    if (!n)
      return;
    this._updateAnimationTarget(s);
    const i = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const a = At(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(o, t, i, s), co(t, s.textDirection), o.y += a.top, this.drawTitle(o, t, s), this.drawBody(o, t, s), this.drawFooter(o, t, s), ho(t, s.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, s) {
    const n = this._active, i = t.map(({ datasetIndex: r, index: l }) => {
      const c = this.chart.getDatasetMeta(r);
      if (!c)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: c.data[l],
        index: l
      };
    }), o = !ts(n, i), a = this._positionChanged(i, s);
    (o || a) && (this._active = i, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, n = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, o = this._active || [], a = this._getActiveElements(t, o, s, n), r = this._positionChanged(a, t), l = s || !ts(a, o) || r;
    return l && (this._active = a, (i.enabled || i.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, n, i) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!i)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(t, o.mode, o, n);
    return o.reverse && a.reverse(), a;
  }
  _positionChanged(t, s) {
    const { caretX: n, caretY: i, options: o } = this, a = Se[o.position].call(this, t, s);
    return a !== !1 && (n !== a.x || i !== a.y);
  }
}
var an = {
  id: "tooltip",
  _element: wi,
  positioners: Se,
  afterInit(e, t, s) {
    s && (e.tooltip = new wi({
      chart: e,
      options: s
    }));
  },
  beforeUpdate(e, t, s) {
    e.tooltip && e.tooltip.initialize(s);
  },
  reset(e, t, s) {
    e.tooltip && e.tooltip.initialize(s);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const s = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...s,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", s);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const s = t.replay;
      e.tooltip.handleEvent(t.event, s, t.inChartArea) && (t.changed = !0);
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
    callbacks: Oo
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
const Ld = (e, t, s, n) => (typeof t == "string" ? (s = e.push(t) - 1, n.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function Ed(e, t, s, n) {
  const i = e.indexOf(t);
  if (i === -1)
    return Ld(e, t, s, n);
  const o = e.lastIndexOf(t);
  return i !== o ? s : i;
}
const Od = (e, t) => e === null ? null : mt(Math.round(e), 0, t);
function Ci(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ro extends fe {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Ci
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const n = this.getLabels();
      for (const { index: i, label: o } of s)
        n[i] === o && n.splice(i, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (K(t))
      return null;
    const n = this.getLabels();
    return s = isFinite(s) && n[s] === t ? s : Ed(n, t, V(s, t), this._addedLabels), Od(s, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: n, max: i } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), s || (i = this.getLabels().length - 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const t = this.min, s = this.max, n = this.options.offset, i = [];
    let o = this.getLabels();
    o = t === 0 && s === o.length - 1 ? o : o.slice(t, s + 1), this._valueRange = Math.max(o.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let a = t; a <= s; a++)
      i.push({
        value: a
      });
    return i;
  }
  getLabelForValue(t) {
    return Ci.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const s = this.ticks;
    return t < 0 || t > s.length - 1 ? null : this.getPixelForValue(s[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function Rd(e, t) {
  const s = [], { bounds: i, step: o, min: a, max: r, precision: l, count: c, maxTicks: d, maxDigits: h, includeBounds: f } = e, g = o || 1, p = d - 1, { min: v, max: b } = t, m = !K(a), y = !K(r), _ = !K(c), x = (b - v) / (h + 1);
  let S = kn((b - v) / p / g) * g, C, w, D, P;
  if (S < 1e-14 && !m && !y)
    return [
      {
        value: v
      },
      {
        value: b
      }
    ];
  P = Math.ceil(b / S) - Math.floor(v / S), P > p && (S = kn(P * S / p / g) * g), K(l) || (C = Math.pow(10, l), S = Math.ceil(S * C) / C), i === "ticks" ? (w = Math.floor(v / S) * S, D = Math.ceil(b / S) * S) : (w = v, D = b), m && y && o && Oa((r - a) / o, S / 1e3) ? (P = Math.round(Math.min((r - a) / S, d)), S = (r - a) / P, w = a, D = r) : _ ? (w = m ? a : w, D = y ? r : D, P = c - 1, S = (D - w) / P) : (P = (D - w) / S, Ce(P, Math.round(P), S / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const A = Math.max(Mn(S), Mn(w));
  C = Math.pow(10, K(l) ? A : l), w = Math.round(w * C) / C, D = Math.round(D * C) / C;
  let R = 0;
  for (m && (f && w !== a ? (s.push({
    value: a
  }), w < a && R++, Ce(Math.round((w + R * S) * C) / C, a, Di(a, x, e)) && R++) : w < a && R++); R < P; ++R) {
    const T = Math.round((w + R * S) * C) / C;
    if (y && T > r)
      break;
    s.push({
      value: T
    });
  }
  return y && f && D !== r ? s.length && Ce(s[s.length - 1].value, r, Di(r, x, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!y || D === r) && s.push({
    value: D
  }), s;
}
function Di(e, t, { horizontal: s, minRotation: n }) {
  const i = It(n), o = (s ? Math.sin(i) : Math.cos(i)) || 1e-3, a = 0.75 * t * ("" + e).length;
  return Math.min(t / o, a);
}
class Id extends fe {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return K(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: n } = this.getUserBounds();
    let { min: i, max: o } = this;
    const a = (l) => i = s ? i : l, r = (l) => o = n ? o : l;
    if (t) {
      const l = Bt(i), c = Bt(o);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && a(0);
    }
    if (i === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      r(o + l), t || a(i - l);
    }
    this.min = i, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: s, stepSize: n } = t, i;
    return n ? (i = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, i > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${i} ticks. Limiting to 1000.`), i = 1e3)) : (i = this.computeTickLimit(), s = s || 11), s && (i = Math.min(s, i)), i;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, s = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const i = {
      maxTicks: n,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: s.precision,
      step: s.stepSize,
      count: s.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: s.minRotation || 0,
      includeBounds: s.includeBounds !== !1
    }, o = this._range || this, a = Rd(i, o);
    return t.bounds === "ticks" && Ra(a, this, "value"), t.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  configure() {
    const t = this.ticks;
    let s = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const i = (n - s) / Math.max(t.length - 1, 1) / 2;
      s -= i, n += i;
    }
    this._startValue = s, this._endValue = n, this._valueRange = n - s;
  }
  getLabelForValue(t) {
    return Gs(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Io extends Id {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: eo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = vt(t) ? t : 0, this.max = vt(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, n = It(this.options.ticks.minRotation), i = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, o.lineHeight / i));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const gs = {
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
}, _t = /* @__PURE__ */ Object.keys(gs);
function $i(e, t) {
  return e - t;
}
function Ai(e, t) {
  if (K(t))
    return null;
  const s = e._adapter, { parser: n, round: i, isoWeekday: o } = e._parseOpts;
  let a = t;
  return typeof n == "function" && (a = n(a)), vt(a) || (a = typeof n == "string" ? s.parse(a, n) : s.parse(a)), a === null ? null : (i && (a = i === "week" && (Te(o) || o === !0) ? s.startOf(a, "isoWeek", o) : s.startOf(a, i)), +a);
}
function Pi(e, t, s, n) {
  const i = _t.length;
  for (let o = _t.indexOf(e); o < i - 1; ++o) {
    const a = gs[_t[o]], r = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((s - t) / (r * a.size)) <= n)
      return _t[o];
  }
  return _t[i - 1];
}
function zd(e, t, s, n, i) {
  for (let o = _t.length - 1; o >= _t.indexOf(s); o--) {
    const a = _t[o];
    if (gs[a].common && e._adapter.diff(i, n, a) >= t - 1)
      return a;
  }
  return _t[s ? _t.indexOf(s) : 0];
}
function Hd(e) {
  for (let t = _t.indexOf(e) + 1, s = _t.length; t < s; ++t)
    if (gs[_t[t]].common)
      return _t[t];
}
function Fi(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: n, hi: i } = Us(s, t), o = s[n] >= t ? s[n] : s[i];
    e[o] = !0;
  }
}
function Nd(e, t, s, n) {
  const i = e._adapter, o = +i.startOf(t[0].value, n), a = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= a; r = +i.add(r, 1, n))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Ti(e, t, s) {
  const n = [], i = {}, o = t.length;
  let a, r;
  for (a = 0; a < o; ++a)
    r = t[a], i[r] = a, n.push({
      value: r,
      major: !1
    });
  return o === 0 || !s ? n : Nd(e, n, i, s);
}
class Bi extends fe {
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
  init(t, s = {}) {
    const n = t.time || (t.time = {}), i = this._adapter = new Ml._date(t.adapters.date);
    i.init(s), we(n.displayFormats, i.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : Ai(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, s = this._adapter, n = t.time.unit || "day";
    let { min: i, max: o, minDefined: a, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !a && !isNaN(c.min) && (i = Math.min(i, c.min)), !r && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!a || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), i = vt(i) && !isNaN(i) ? i : +s.startOf(Date.now(), n), o = vt(o) && !isNaN(o) ? o : +s.endOf(Date.now(), n) + 1, this.min = Math.min(i, o - 1), this.max = Math.max(i + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let s = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
    return t.length && (s = t[0], n = t[t.length - 1]), {
      min: s,
      max: n
    };
  }
  buildTicks() {
    const t = this.options, s = t.time, n = t.ticks, i = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && i.length && (this.min = this._userMin || i[0], this.max = this._userMax || i[i.length - 1]);
    const o = this.min, a = this.max, r = Wa(i, o, a);
    return this._unit = s.unit || (n.autoSkip ? Pi(s.minUnit, this.min, this.max, this._getLabelCapacity(o)) : zd(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Hd(this._unit), this.initOffsets(i), t.reverse && r.reverse(), Ti(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, n = 0, i, o;
    this.options.offset && t.length && (i = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - i : s = (this.getDecimalForValue(t[1]) - i) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = o : n = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const a = t.length < 3 ? 0.5 : 0.25;
    s = mt(s, 0, a), n = mt(n, 0, a), this._offsets = {
      start: s,
      end: n,
      factor: 1 / (s + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, n = this.max, i = this.options, o = i.time, a = o.unit || Pi(o.minUnit, s, n, this._getLabelCapacity(s)), r = V(i.ticks.stepSize, 1), l = a === "week" ? o.isoWeekday : !1, c = Te(l) || l === !0, d = {};
    let h = s, f, g;
    if (c && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, c ? "day" : a), t.diff(n, s, a) > 1e5 * r)
      throw new Error(s + " and " + n + " are too far apart with stepSize of " + r + " " + a);
    const p = i.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, g = 0; f < n; f = +t.add(f, r, a), g++)
      Fi(d, f, p);
    return (f === n || i.bounds === "ticks" || g === 1) && Fi(d, f, p), Object.keys(d).sort($i).map((v) => +v);
  }
  getLabelForValue(t) {
    const s = this._adapter, n = this.options.time;
    return n.tooltipFormat ? s.format(t, n.tooltipFormat) : s.format(t, n.displayFormats.datetime);
  }
  format(t, s) {
    const i = this.options.time.displayFormats, o = this._unit, a = s || i[o];
    return this._adapter.format(t, a);
  }
  _tickFormatFunction(t, s, n, i) {
    const o = this.options, a = o.ticks.callback;
    if (a)
      return et(a, [
        t,
        s,
        n
      ], this);
    const r = o.time.displayFormats, l = this._unit, c = this._majorUnit, d = l && r[l], h = c && r[c], f = n[s], g = c && h && f && f.major;
    return this._adapter.format(t, i || (g ? h : d));
  }
  generateTickLabels(t) {
    let s, n, i;
    for (s = 0, n = t.length; s < n; ++s)
      i = t[s], i.label = this._tickFormatFunction(i.value, s, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const s = this._offsets, n = this.getDecimalForValue(t);
    return this.getPixelForDecimal((s.start + n) * s.factor);
  }
  getValueForPixel(t) {
    const s = this._offsets, n = this.getDecimalForPixel(t) / s.factor - s.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(t) {
    const s = this.options.ticks, n = this.ctx.measureText(t).width, i = It(this.isHorizontal() ? s.maxRotation : s.minRotation), o = Math.cos(i), a = Math.sin(i), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * o + r * a,
      h: n * a + r * o
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, n = s.displayFormats, i = n[s.unit] || n.millisecond, o = this._tickFormatFunction(t, 0, Ti(this, [
      t
    ], this._majorUnit), i), a = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], s, n;
    if (t.length)
      return t;
    const i = this.getMatchingVisibleMetas();
    if (this._normalized && i.length)
      return this._cache.data = i[0].controller.getAllParsedValues(this);
    for (s = 0, n = i.length; s < n; ++s)
      t = t.concat(i[s].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let s, n;
    if (t.length)
      return t;
    const i = this.getLabels();
    for (s = 0, n = i.length; s < n; ++s)
      t.push(Ai(this, i[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Zi(t.sort($i));
  }
}
function Ge(e, t, s) {
  let n = 0, i = e.length - 1, o, a, r, l;
  s ? (t >= e[n].pos && t <= e[i].pos && ({ lo: n, hi: i } = Zt(e, "pos", t)), { pos: o, time: r } = e[n], { pos: a, time: l } = e[i]) : (t >= e[n].time && t <= e[i].time && ({ lo: n, hi: i } = Zt(e, "time", t)), { time: o, pos: r } = e[n], { time: a, pos: l } = e[i]);
  const c = a - o;
  return c ? r + (l - r) * (t - o) / c : r;
}
class Xv extends Bi {
  static id = "timeseries";
  static defaults = Bi.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = Ge(s, this.min), this._tableRange = Ge(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: n } = this, i = [], o = [];
    let a, r, l, c, d;
    for (a = 0, r = t.length; a < r; ++a)
      c = t[a], c >= s && c <= n && i.push(c);
    if (i.length < 2)
      return [
        {
          time: s,
          pos: 0
        },
        {
          time: n,
          pos: 1
        }
      ];
    for (a = 0, r = i.length; a < r; ++a)
      d = i[a + 1], l = i[a - 1], c = i[a], Math.round((d + l) / 2) !== c && o.push({
        time: c,
        pos: a / (r - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, s = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(s) || n.length === 1) && n.push(s), n.sort((i, o) => i - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return s.length && n.length ? t = this.normalize(s.concat(n)) : t = s.length ? s : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Ge(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, n = this.getDecimalForPixel(t) / s.factor - s.end;
    return Ge(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const zo = {
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
}, Wd = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Vd = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...zo,
  ...Wd
}, jd = Go[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function re(e) {
  return Vi(e) ? Bs(e) : e;
}
function Yd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Vi(t) ? new Proxy(e, {}) : e;
}
function qd(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Ho(e, t) {
  e.labels = t;
}
function No(e, t, s) {
  const n = [];
  e.datasets = t.map((i) => {
    const o = e.datasets.find((a) => a[s] === i[s]);
    return !o || !i.data || n.includes(o) ? {
      ...i
    } : (n.push(o), Object.assign(o, i), o);
  });
}
function Ud(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Ho(s, e.labels), No(s, e.datasets, t), s;
}
const Xd = rt({
  props: Vd,
  setup(e, t) {
    let { expose: s, slots: n } = t;
    const i = $t(null), o = Hi(null);
    s({
      chart: o
    });
    const a = () => {
      if (!i.value) return;
      const { type: c, data: d, options: h, plugins: f, datasetIdKey: g } = e, p = Ud(d, g), v = Yd(p, d);
      o.value = new ge(i.value, {
        type: c,
        data: v,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const c = Bs(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return Ws(a), Ni(r), de([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, f] = c, [g, p] = d;
      const v = Bs(o.value);
      if (!v)
        return;
      let b = !1;
      if (h) {
        const m = re(h), y = re(g);
        m && m !== y && (qd(v, m), b = !0);
      }
      if (f) {
        const m = re(f.labels), y = re(p.labels), _ = re(f.datasets), x = re(p.datasets);
        m !== y && (Ho(v.config.data, m), b = !0), _ && _ !== x && (No(v.config.data, _, e.datasetIdKey), b = !0);
      }
      b && Wi(() => {
        l(v);
      });
    }, {
      deep: !0
    }), () => Ts("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: i
    }, [
      Ts("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function rn(e, t) {
  return ge.register(t), rt({
    props: zo,
    setup(s, n) {
      let { expose: i } = n;
      const o = Hi(null), a = (r) => {
        o.value = r?.chart;
      };
      return i({
        chart: o
      }), () => Ts(Xd, jd({
        ref: a
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const Kd = /* @__PURE__ */ rn("bar", vl), Gd = /* @__PURE__ */ rn("line", xl), Qd = /* @__PURE__ */ rn("pie", kl), Li = {
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
}, Ei = {
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
}, Zd = [
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
  const t = $t("light");
  let s = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", i = L(() => e?.value ? e.value : t.value), o = L(() => i.value === "dark"), a = L(() => o.value ? Ei : Li), r = () => {
    typeof document > "u" || (t.value = n(), s = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (t.value = n());
    }), s.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    s && (s.disconnect(), s = null);
  };
  return Ws(() => {
    r();
  }), Ni(() => {
    l();
  }), e && de(e, () => {
  }), {
    isDark: o,
    currentTheme: i,
    colors: a,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Li,
    darkColors: Ei,
    chartSeriesColors: Zd
  };
}
const Jd = { class: "chart-container" }, th = /* @__PURE__ */ rt({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    ge.register(
      Ro,
      Io,
      td,
      Eo,
      an,
      on
    );
    const { isDark: n, colors: i } = ut(ht(s, "theme")), o = s.data, a = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = L(() => s.options ? s.options : {
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
            color: i.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          },
          generateLabels: function(l) {
            return l.data.datasets.map((d, h) => ({
              text: a(d.label || ""),
              fillStyle: Array.isArray(d.backgroundColor) ? d.backgroundColor[0] : d.backgroundColor,
              strokeStyle: Array.isArray(d.borderColor) ? d.borderColor[0] : d.borderColor,
              lineWidth: d.borderWidth,
              hidden: !l.isDatasetVisible(h),
              index: h,
              datasetIndex: h
            }));
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
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
              return l.length > 0 ? String(a(l[0].label)) : "";
            },
            label: function(l) {
              let c = String(a(l.dataset.label || ""));
              return c && (c += ": "), l.parsed.y !== null && (c += l.parsed.y), c;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          stacked: s.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: i.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return a(l);
            }
          }
        },
        x: {
          stacked: s.stacked || !1,
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
            color: i.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const c = this.getLabelForValue(l);
              return a(c);
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
    return t({ isDark: n }), (l, c) => (k(), M("div", Jd, [
      ct(E(Kd), {
        data: E(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), it = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, Wo = /* @__PURE__ */ it(th, [["__scopeId", "data-v-be0a7bf2"]]), eh = { class: "chart-container" }, sh = /* @__PURE__ */ rt({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    ge.register(
      Ro,
      Io,
      Xc,
      us,
      Eo,
      an,
      on,
      _d
    );
    const { isDark: n, colors: i } = ut(ht(s, "theme")), o = s.data, a = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = L(() => s.options ? s.options : {
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
            color: i.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              return l.data.datasets.map((d, h) => ({
                text: a(d.label || ""),
                fillStyle: d.backgroundColor,
                strokeStyle: d.borderColor,
                lineWidth: d.borderWidth,
                hidden: !l.isDatasetVisible(h),
                index: h,
                datasetIndex: h
              }));
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
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
              return l.length > 0 ? String(a(l[0].label)) : "";
            },
            label: function(l) {
              let c = String(a(l.dataset.label || ""));
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
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: i.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return a(l);
            }
          }
        },
        x: {
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
            color: i.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const c = this.getLabelForValue(l);
              return a(c);
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
    return t({ isDark: n }), (l, c) => (k(), M("div", eh, [
      ct(E(Gd), {
        data: E(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ln = /* @__PURE__ */ it(sh, [["__scopeId", "data-v-c400b486"]]), nh = { class: "chart-container" }, ih = /* @__PURE__ */ rt({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    ge.register(Ic, an, on);
    const { isDark: n, colors: i } = ut(ht(s, "theme")), o = s.data, a = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = L(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      cutout: s.doughnut ? "60%" : 0,
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
            color: i.value.textSecondary,
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              const c = l.data;
              return c.labels.length && c.datasets.length ? c.labels.map((d, h) => {
                const f = l.getDatasetMeta(0), g = c.datasets[0], p = g.data[h], v = Array.isArray(g.backgroundColor) ? g.backgroundColor[h] : g.backgroundColor;
                return {
                  text: `${a(d)}: ${p}`,
                  fillStyle: v,
                  hidden: f.data[h]?.hidden || !1,
                  index: h
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
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
              return l.length > 0 ? String(a(l[0].label)) : "";
            },
            label: function(l) {
              const c = l.label || "", d = l.parsed || 0, h = l.dataset.data.reduce((g, p) => g + p, 0), f = (d / h * 100).toFixed(1);
              return `${a(c)}: ${d} (${f}%)`;
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
    return t({ isDark: n }), (l, c) => (k(), M("div", nh, [
      ct(E(Qd), {
        data: E(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Vo = /* @__PURE__ */ it(ih, [["__scopeId", "data-v-23a84317"]]), oh = { class: "chart-container" }, ah = ["viewBox"], rh = ["transform"], lh = ["x", "width", "fill", "stroke"], ch = ["fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], hh = ["points", "fill"], uh = ["x1", "y1", "x2", "y2", "stroke"], fh = ["x", "y", "fill"], gh = ["x1", "y1", "x2", "y2", "stroke"], ph = ["points", "fill"], mh = ["transform"], bh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y", "height"], kh = ["y1", "y2"], Mh = ["y1", "y2"], Sh = ["y1", "y2"], wh = ["y1", "y2"], Ch = ["y", "height"], Dh = ["cy", "stroke", "onMouseenter"], $h = ["cy", "stroke", "onMouseenter"], Ah = ["cy", "stroke", "onMouseenter"], Ph = ["cy", "stroke", "onMouseenter"], Fh = ["y1", "y2", "onMouseenter"], Th = ["y1", "y2", "onMouseenter"], Bh = ["x", "y", "fill"], Lh = ["x", "y", "fill"], Eh = ["transform"], Oh = { transform: "translate(-200, 0)" }, Rh = ["stroke"], Ih = ["fill"], zh = { transform: "translate(-130, 0)" }, Hh = ["stroke"], Nh = ["fill"], Wh = { transform: "translate(-60, 0)" }, Vh = ["stroke"], jh = ["fill"], Yh = { transform: "translate(10, 0)" }, qh = ["stroke"], Uh = ["fill"], Xh = { transform: "translate(80, 0)" }, Kh = ["fill"], Gh = { transform: "translate(150, 0)" }, Qh = ["fill"], Zh = /* @__PURE__ */ rt({
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
    const s = e, { isDark: n } = ut(ht(s, "theme")), i = L(() => ({
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
    })), o = $t({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), a = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, g) => {
      const p = f.currentTarget.closest("svg");
      if (!p) return;
      const v = p.getBoundingClientRect(), b = p.createSVGPoint();
      b.x = f.clientX - v.left, b.y = f.clientY - v.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: g
      };
    }, l = (f) => {
      if (o.value.visible) {
        const g = f.currentTarget, p = g.getBoundingClientRect(), v = g.createSVGPoint();
        v.x = f.clientX - p.left, v.y = f.clientY - p.top, o.value.x = v.x, o.value.y = v.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = L(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const b = v, m = (b - 1) / 9, y = s.chartMargin + p - m * p;
        f.push({ value: b, y });
      }
      return f;
    });
    return t({ isDark: n }), (f, g) => (k(), M("div", oh, [
      (k(), M("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Ct(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        o.value.visible ? (k(), M("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          u("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: i.value.tooltipBg,
            rx: "6",
            stroke: i.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, lh),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: i.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, $(o.value.text), 9, ch)
        ], 8, rh)) : I("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, dh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: i.value.axis
        }, null, 8, hh),
        (k(!0), M(X, null, ot(h.value, (p, v) => (k(), M(X, { key: v }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, uh),
          u("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: i.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(p.value), 9, fh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, gh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: i.value.axis
        }, null, 8, ph),
        (k(!0), M(X, null, ot(e.boxplotData, (p, v) => (k(), M(X, { key: v }, [
          u("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            p.isTotal ? (k(), M(X, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
              u("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              u("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, yh),
              u("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, _h),
              u("rect", {
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
            ], 64)) : (k(), M(X, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kh),
              u("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Mh),
              u("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Sh),
              u("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              u("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Ch)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: p.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Min: ${p.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            u("circle", {
              cx: 0,
              cy: p.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q1: ${p.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, $h),
            u("circle", {
              cx: 0,
              cy: p.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q3: ${p.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            u("circle", {
              cx: 0,
              cy: p.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Max: ${p.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ph),
            u("line", {
              x1: -24,
              y1: p.medianY,
              x2: 24,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Median: ${p.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Fh),
            p.averageY ? (k(), M("line", {
              key: 2,
              x1: -24,
              y1: p.averageY,
              x2: 24,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Avg: ${p.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Th)) : I("", !0)
          ], 8, mh),
          u("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: i.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(a(p.label)), 9, Bh),
          p.responseCount ? (k(), M("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: i.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(p.responseCount), 9, Lh)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (k(), M("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Oh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Rh),
            u("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Ih)
          ]),
          u("g", zh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Hh),
            u("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Nh)
          ]),
          u("g", Wh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Vh),
            u("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, jh)
          ]),
          u("g", Yh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, qh),
            u("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Uh)
          ]),
          u("g", Xh, [
            g[0] || (g[0] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Kh)
          ]),
          u("g", Gh, [
            g[1] || (g[1] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Qh)
          ])
        ], 8, Eh)) : I("", !0)
      ], 44, ah))
    ]));
  }
}), Jh = /* @__PURE__ */ it(Zh, [["__scopeId", "data-v-520c623f"]]), tu = { class: "chart-container" }, eu = ["viewBox"], su = ["transform"], nu = ["x", "y", "width", "height", "fill", "stroke"], iu = ["y", "fill"], ou = ["y", "fill"], au = ["x1", "y1", "x2", "y2", "stroke"], ru = ["points", "fill"], lu = ["x1", "y1", "x2", "y2", "stroke"], cu = ["x1", "y1", "x2", "y2", "stroke"], du = ["x", "y", "fill"], hu = ["x", "y", "fill", "transform"], uu = ["x1", "y1", "x2", "y2", "stroke"], fu = ["points", "fill"], gu = ["transform"], pu = ["y1", "y2", "stroke", "onMouseenter"], mu = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], bu = ["x1", "y1", "x2", "y2", "onMouseenter"], vu = ["x1", "y1", "x2", "y2", "onMouseenter"], yu = ["cy", "stroke", "onMouseenter"], _u = ["cy", "stroke", "onMouseenter"], xu = ["x", "y", "fill"], ku = ["x", "y", "fill"], Mu = ["transform"], Su = { transform: "translate(-180, 0)" }, wu = ["stroke"], Cu = ["fill"], Du = { transform: "translate(-120, 0)" }, $u = ["fill"], Au = { transform: "translate(-60, 0)" }, Pu = ["fill"], Fu = { transform: "translate(0, 0)" }, Tu = ["stroke"], Bu = ["fill"], Lu = { transform: "translate(60, 0)" }, Eu = ["fill"], Ou = { transform: "translate(130, 0)" }, Ru = ["fill"], Iu = /* @__PURE__ */ rt({
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
    const s = e, { isDark: n } = ut(ht(s, "theme")), i = L(() => ({
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
    })), o = $t({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), a = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, g, p) => {
      const v = f.currentTarget.closest("svg");
      if (!v) return;
      const b = v.getBoundingClientRect(), m = v.createSVGPoint();
      m.x = f.clientX - b.left, m.y = f.clientY - b.top;
      let y = a(g.label), _ = "";
      switch (p) {
        case "body":
          _ = `Q1: ${g.q1.toFixed(1)} | Q3: ${g.q3.toFixed(1)}`;
          break;
        case "wick":
          _ = `Min: ${g.low.toFixed(1)} | Max: ${g.high.toFixed(1)}`;
          break;
        case "median":
          _ = `Median: ${g.median.toFixed(1)}`;
          break;
        case "average":
          _ = `Average: ${g.average?.toFixed(1)}`;
          break;
        case "min":
          _ = `Min: ${g.low.toFixed(1)}`;
          break;
        case "max":
          _ = `Max: ${g.high.toFixed(1)}`;
          break;
      }
      const x = Math.max(180, _.length * 7 + 40), S = 48;
      o.value = {
        visible: !0,
        x: m.x,
        y: m.y - 20,
        title: y,
        text: _,
        width: x,
        height: S
      };
    }, l = (f) => {
      if (o.value.visible) {
        const g = f.currentTarget, p = g.getBoundingClientRect(), v = g.createSVGPoint();
        v.x = f.clientX - p.left, v.y = f.clientY - p.top, o.value.x = v.x, o.value.y = v.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = L(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const b = v, m = (b - 1) / 9, y = s.chartMargin + p - m * p;
        f.push({ value: b, y });
      }
      return f;
    });
    return t({ isDark: n }), (f, g) => (k(), M("div", tu, [
      (k(), M("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full candlestick-svg",
        style: Ct(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        o.value.visible ? (k(), M("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          u("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: i.value.tooltipBg,
            rx: "8",
            stroke: i.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, nu),
          u("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: i.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.title), 9, iu),
          u("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: i.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.text), 9, ou)
        ], 8, su)) : I("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, au),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: i.value.axis
        }, null, 8, ru),
        (k(!0), M(X, null, ot(h.value, (p, v) => (k(), M("line", {
          key: `grid-${v}`,
          x1: e.chartMargin,
          y1: p.y,
          x2: e.chartWidth - e.chartMargin,
          y2: p.y,
          stroke: i.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, lu))), 128)),
        (k(!0), M(X, null, ot(h.value, (p, v) => (k(), M(X, { key: v }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, cu),
          u("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: i.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(p.value), 9, du)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: i.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, $(a(e.yAxisLabel)), 9, hu),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, uu),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: i.value.axis
        }, null, 8, fu),
        (k(!0), M(X, null, ot(e.candlestickData, (p, v) => (k(), M(X, { key: v }, [
          u("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            u("line", {
              x1: 0,
              y1: p.highY,
              x2: 0,
              y2: p.lowY,
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, p, "wick"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, pu),
            u("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(p.q1Y, p.q3Y),
              width: e.candleWidth,
              height: Math.abs(p.q3Y - p.q1Y),
              fill: p.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (b) => r(b, p, "body"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, mu),
            p.medianY ? (k(), M("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: p.medianY,
              x2: e.candleWidth / 2,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (b) => r(b, p, "median"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, bu)) : I("", !0),
            p.averageY ? (k(), M("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: p.averageY,
              x2: e.candleWidth / 2,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, p, "average"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, vu)) : I("", !0),
            u("circle", {
              cx: 0,
              cy: p.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, p, "min"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, yu),
            u("circle", {
              cx: 0,
              cy: p.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, p, "max"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, _u)
          ], 8, gu),
          u("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: i.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(a(p.label)), 9, xu),
          p.responseCount ? (k(), M("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: i.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + $(p.responseCount), 9, ku)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (k(), M("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Su, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, wu),
            u("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Cu)
          ]),
          u("g", Du, [
            g[0] || (g[0] = u("rect", {
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
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, $u)
          ]),
          u("g", Au, [
            g[1] || (g[1] = u("rect", {
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
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Pu)
          ]),
          u("g", Fu, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Tu),
            u("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Bu)
          ]),
          u("g", Lu, [
            g[2] || (g[2] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Eu)
          ]),
          u("g", Ou, [
            g[3] || (g[3] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Ru)
          ])
        ], 8, Mu)) : I("", !0)
      ], 44, eu))
    ]));
  }
}), jo = /* @__PURE__ */ it(Iu, [["__scopeId", "data-v-0ecc8ae0"]]), zu = { class: "chart-container" }, Hu = ["viewBox"], Nu = ["transform"], Wu = ["x", "y", "width", "height", "fill", "stroke"], Vu = ["y", "fill"], ju = ["y", "fill"], Yu = ["x1", "y1", "x2", "y2", "stroke"], qu = ["x1", "y1", "x2", "y2", "stroke"], Uu = ["points", "fill"], Xu = ["x1", "y1", "x2", "y2", "stroke"], Ku = ["x", "y", "fill"], Gu = ["x", "y", "fill", "transform"], Qu = ["x1", "y1", "x2", "y2", "stroke"], Zu = ["points", "fill"], Ju = ["x1", "y1", "x2", "y2", "stroke"], tf = ["x", "y", "fill"], ef = ["x", "y", "fill"], sf = ["d"], nf = ["x", "y", "width", "height", "onMouseenter"], of = ["x1", "y1", "x2", "y2"], af = ["x", "y"], rf = ["x1", "y1", "x2", "y2"], lf = ["x", "y"], cf = ["x1", "y1", "x2", "y2"], df = ["x", "y"], hf = ["x1", "y1", "x2", "y2"], uf = ["x", "y"], ff = ["x1", "y1", "x2", "y2"], gf = ["x", "y"], pf = ["x1", "y1", "x2", "y2"], mf = ["x", "y"], bf = ["transform"], vf = { transform: "translate(-220, 0)" }, yf = ["fill"], _f = { transform: "translate(-140, 0)" }, xf = ["fill"], kf = { transform: "translate(-80, 0)" }, Mf = ["fill"], Sf = { transform: "translate(-20, 0)" }, wf = ["fill"], Cf = { transform: "translate(60, 0)" }, Df = ["fill"], $f = { transform: "translate(130, 0)" }, Af = ["fill"], Pf = { transform: "translate(180, 0)" }, Ff = ["fill"], Tf = /* @__PURE__ */ rt({
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
    const s = e, { isDark: n } = ut(ht(s, "theme")), i = L(() => ({
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
    })), o = $t({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), a = L(() => s.chartWidth - s.chartMargin * 2), r = L(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = L(() => a.value / 10 * 0.6), c = L(() => !s.histogram || s.histogram.length === 0 ? 1 : Math.max(...s.histogram.map((B) => B.count || 0), 1) + 30), d = L(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const H = s.averageScore || 0;
      let B = 0, z = 0;
      if (s.histogram.forEach((U) => {
        const tt = U.count || 0;
        B += tt;
        const st = U.score - H;
        z += tt * (st * st);
      }), B === 0) return 1;
      const Y = z / B;
      return Math.sqrt(Y) || 1;
    }), h = (H, B, z) => {
      if (z === 0) return 0;
      const Y = 1 / (z * Math.sqrt(2 * Math.PI)), U = -0.5 * Math.pow((H - B) / z, 2);
      return Y * Math.exp(U);
    }, f = L(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && d.value === 0) return null;
      const H = s.averageScore, B = d.value, z = [], Y = 100, U = 1, tt = 10, st = s.histogram.reduce((St, ie) => St + (ie.count || 0), 0);
      if (st === 0) return null;
      let gt = 0;
      for (let St = 0; St <= Y; St++) {
        const ie = U + (tt - U) * (St / Y), ms = h(ie, H, B);
        ms > gt && (gt = ms);
      }
      const pe = r.value * 0.75 / gt * st * 6e-3, ps = s.chartMargin;
      for (let St = 0; St <= Y; St++) {
        const ie = U + (tt - U) * (St / Y), Ko = h(ie, H, B) * pe, dn = p(ie);
        if (dn !== null) {
          let bs = s.chartHeight - s.chartBottomMargin - Ko;
          bs = Math.max(bs, ps), z.push(`${St === 0 ? "M" : "L"} ${dn} ${bs}`);
        }
      }
      return z.join(" ");
    }), g = L(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const H = a.value / 10;
      return s.histogram.map((B, z) => {
        const Y = s.chartMargin + (z + 0.5) * H, U = B.count > 0 ? B.count / c.value * r.value : 0, tt = s.chartHeight - s.chartBottomMargin - U;
        return {
          score: B.score,
          count: B.count,
          x: Y,
          y: tt,
          height: U
        };
      });
    }), p = (H) => {
      if (H < 1 || H > 10) return null;
      const B = a.value / 10;
      return s.chartMargin + (H - 0.5) * B;
    }, v = L(() => p(s.minScore)), b = L(() => p(s.maxScore)), m = L(() => p(s.q1Score)), y = L(() => p(s.medianScore)), _ = L(() => p(s.q3Score)), x = L(() => p(s.averageScore)), S = L(() => s.minScore), C = L(() => s.maxScore), w = L(() => s.q1Score), D = L(() => s.medianScore), P = L(() => s.q3Score), A = L(() => s.averageScore), R = L(() => {
      const H = [], B = s.chartMargin - 8, z = 18;
      m.value !== null && H.push({
        x: m.value,
        y: B,
        value: s.q1Score,
        label: `Q1: ${w.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), y.value !== null && H.push({
        x: y.value,
        y: B - z,
        value: s.medianScore,
        label: `Median: ${D.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), x.value !== null && H.push({
        x: x.value,
        y: B - z,
        value: s.averageScore,
        label: `Avg: ${A.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), _.value !== null && H.push({
        x: _.value,
        y: B,
        value: s.q3Score,
        label: `Q3: ${P.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), H.sort((tt, st) => (tt.x || 0) - (st.x || 0));
      const Y = [[], [], []];
      H.forEach((tt) => {
        if (tt.x === null) return;
        let st = -1;
        for (let gt = 0; gt < Y.length; gt++) {
          let kt = !1;
          for (const pe of Y[gt]) {
            if (pe.x === null) continue;
            const ps = Math.abs(tt.x - pe.x), St = (tt.width + pe.width) / 2 + 10;
            if (ps < St) {
              kt = !0;
              break;
            }
          }
          if (!kt) {
            st = gt;
            break;
          }
        }
        st === -1 && (st = Y.length - 1), tt.y = B - st * z, Y[st].push(tt);
      });
      const U = 15;
      return H.forEach((tt) => {
        tt.y < U && (tt.y = U);
      }), H;
    }), T = (H) => R.value.find((z) => z.id === H)?.y || s.chartMargin - 10, N = L(() => {
      const H = [];
      for (let z = 0; z <= 5; z++) {
        const Y = Math.round(c.value / 5 * z), U = s.chartHeight - s.chartBottomMargin - z / 5 * r.value;
        H.push({ value: Y, y: U });
      }
      return H;
    }), F = (H, B) => {
      const z = H.currentTarget.closest("svg");
      if (!z) return;
      const Y = z.getBoundingClientRect(), U = z.createSVGPoint();
      U.x = H.clientX - Y.left, U.y = H.clientY - Y.top;
      const tt = `Score: ${B.score}`, st = `Count: ${B.count}`, gt = 120, kt = 48;
      o.value = {
        visible: !0,
        x: U.x,
        y: U.y - 20,
        title: tt,
        text: st,
        width: gt,
        height: kt
      };
    }, O = (H) => {
      if (o.value.visible) {
        const B = H.currentTarget, z = B.getBoundingClientRect(), Y = B.createSVGPoint();
        Y.x = H.clientX - z.left, Y.y = H.clientY - z.top, o.value.x = Y.x, o.value.y = Y.y - 20;
      }
    }, j = () => {
      o.value.visible = !1;
    }, G = () => {
      o.value.visible = !1;
    };
    return t({ isDark: n }), (H, B) => (k(), M("div", zu, [
      (k(), M("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Ct(`min-height: ${e.chartHeight}px;`),
        onMousemove: O,
        onMouseleave: j
      }, [
        o.value.visible ? (k(), M("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          u("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: i.value.tooltipBg,
            rx: "8",
            stroke: i.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Wu),
          u("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: i.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.title), 9, Vu),
          u("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: i.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, $(o.value.text), 9, ju)
        ], 8, Nu)) : I("", !0),
        (k(!0), M(X, null, ot(N.value, (z, Y) => (k(), M("line", {
          key: `grid-${Y}`,
          x1: e.chartMargin,
          y1: z.y,
          x2: e.chartWidth - e.chartMargin,
          y2: z.y,
          stroke: i.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Yu))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, qu),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: i.value.axis
        }, null, 8, Uu),
        (k(!0), M(X, null, ot(N.value, (z, Y) => (k(), M(X, {
          key: `y-tick-${Y}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: z.y,
            x2: e.chartMargin,
            y2: z.y,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xu),
          u("text", {
            x: e.chartMargin - 12,
            y: z.y + 4,
            "text-anchor": "end",
            fill: i.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, $(z.value), 9, Ku)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: i.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Gu),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, Qu),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: i.value.axis
        }, null, 8, Zu),
        (k(!0), M(X, null, ot(g.value, (z, Y) => (k(), M(X, {
          key: `tick-${Y}`
        }, [
          u("line", {
            x1: z.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: z.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Ju),
          u("text", {
            x: z.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: i.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, $(z.score), 9, tf)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: i.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, ef),
        f.value ? (k(), M("path", {
          key: 1,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, sf)) : I("", !0),
        (k(!0), M(X, null, ot(g.value, (z, Y) => (k(), M("rect", {
          key: `bar-${Y}`,
          x: z.x - l.value / 2,
          y: z.y,
          width: l.value,
          height: z.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (U) => F(U, z),
          onMouseleave: G,
          style: { cursor: "pointer" }
        }, null, 40, nf))), 128)),
        v.value ? (k(), M("line", {
          key: 2,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, of)) : I("", !0),
        v.value ? (k(), M("text", {
          key: 3,
          x: v.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + $(S.value.toFixed(1)), 9, af)) : I("", !0),
        m.value ? (k(), M("line", {
          key: 4,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, rf)) : I("", !0),
        m.value ? (k(), M("text", {
          key: 5,
          x: m.value,
          y: T("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + $(w.value.toFixed(1)), 9, lf)) : I("", !0),
        y.value ? (k(), M("line", {
          key: 6,
          x1: y.value,
          y1: e.chartMargin,
          x2: y.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, cf)) : I("", !0),
        y.value ? (k(), M("text", {
          key: 7,
          x: y.value,
          y: T("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + $(D.value.toFixed(1)), 9, df)) : I("", !0),
        x.value ? (k(), M("line", {
          key: 8,
          x1: x.value,
          y1: e.chartMargin,
          x2: x.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, hf)) : I("", !0),
        x.value ? (k(), M("text", {
          key: 9,
          x: x.value,
          y: T("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + $(A.value.toFixed(1)), 9, uf)) : I("", !0),
        _.value ? (k(), M("line", {
          key: 10,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ff)) : I("", !0),
        _.value ? (k(), M("text", {
          key: 11,
          x: _.value,
          y: T("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + $(P.value.toFixed(1)), 9, gf)) : I("", !0),
        b.value ? (k(), M("line", {
          key: 12,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, pf)) : I("", !0),
        b.value ? (k(), M("text", {
          key: 13,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + $(C.value.toFixed(1)), 9, mf)) : I("", !0),
        e.showLegend ? (k(), M("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", vf, [
            B[0] || (B[0] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, yf)
          ]),
          u("g", _f, [
            B[1] || (B[1] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, xf)
          ]),
          u("g", kf, [
            B[2] || (B[2] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Mf)
          ]),
          u("g", Sf, [
            B[3] || (B[3] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, wf)
          ]),
          u("g", Cf, [
            B[4] || (B[4] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Df)
          ]),
          u("g", $f, [
            B[5] || (B[5] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Af)
          ]),
          u("g", Pf, [
            B[6] || (B[6] = u("line", {
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
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ff)
          ])
        ], 8, bf)) : I("", !0)
      ], 44, Hu))
    ]));
  }
}), Yo = /* @__PURE__ */ it(Tf, [["__scopeId", "data-v-e67a4773"]]), Bf = { class: "chart-container" }, Lf = {
  key: 1,
  class: "chart-wrapper"
}, Ef = /* @__PURE__ */ rt({
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
    gn.use([Jo, ta, ea, sa]);
    const s = e, { isDark: n, colors: i } = ut(ht(s, "theme")), o = $t(null), a = $t(!0), r = $t(!1);
    let l = null;
    const c = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, d = [
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
      const _ = s.data.links.filter(
        (w) => w.source && w.target && typeof w.value == "number"
      ), x = Math.max(..._.map((w) => w.value), 1), S = Math.max(1, x * 0.01), C = _.map((w) => ({
        ...w,
        originalValue: w.value,
        value: w.value < x * 0.01 ? S : w.value
      }));
      return {
        nodes: s.data.nodes.filter((w) => w.name),
        links: C
      };
    }, f = (_) => _.map((x, S) => ({
      ...x,
      itemStyle: {
        color: s.nodeColors[x.name] || d[S % d.length],
        borderRadius: 8
      }
    })), g = (_) => (x) => {
      const S = x.dataType === "node", C = i.value.tooltipText, w = n.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const T = _.filter((O) => O.target === x.name), N = _.filter((O) => O.source === x.name), F = T.length > 0 ? T.reduce((O, j) => O + (j.originalValue || j.value), 0) : N.reduce((O, j) => O + (j.originalValue || j.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${x.name}</div><div style="color: ${w}; font-size: 12px;">Count: ${F.toLocaleString()}</div>`;
      }
      const D = x.data?.source || x.source || "Unknown", P = x.data?.target || x.target || "Unknown", A = x.data?.originalValue || x.data?.value || x.value || 0, R = x.data?.label || `${A.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${D} → ${P}</div><div style="color: ${w}; font-size: 12px;">Flow: ${R}</div>`;
    }, p = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: _, links: x } = h(), S = f(_), C = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: g(x),
              backgroundColor: i.value.tooltipBg,
              borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
              borderWidth: 1,
              borderRadius: 8,
              padding: [10, 14],
              textStyle: {
                color: i.value.tooltipText,
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
                data: S,
                links: x,
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
                  color: s.useGradient ? "gradient" : "source",
                  curveness: 0.5,
                  opacity: 0.6
                },
                itemStyle: c.style,
                label: {
                  show: !0,
                  position: "inside",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (w) => {
                    const D = w.name || "";
                    return D.length > 15 ? `${D.substring(0, 15)}...` : D;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: i.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (w) => {
                    const D = w.data?.originalValue || w.value || 0;
                    return w.data?.label || `${D.toLocaleString()}`;
                  }
                },
                nodeAlign: c.node.align,
                nodeGap: s.nodeGap,
                nodeWidth: c.node.width,
                layoutIterations: c.node.iterations,
                orient: "horizontal",
                draggable: !1,
                ...c.margins
              }
            ],
            backgroundColor: "transparent",
            animation: !0,
            animationDuration: c.animation.duration,
            animationEasing: c.animation.easing
          };
          l.setOption(C);
        } catch (_) {
          console.error("Error setting Sankey chart options:", _), r.value = !0;
        }
    }, v = async () => {
      if (o.value)
        try {
          l = gn.init(o.value), p(), window.addEventListener("resize", m);
        } catch (_) {
          console.error("Error initializing Sankey chart:", _), r.value = !0;
        } finally {
          a.value = !1;
        }
    }, b = async (_ = 40) => {
      await Wi();
      for (let x = 0; x < _; x++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await v();
        await new Promise((S) => setTimeout(S, 50));
      }
      await v(), setTimeout(m, 50);
    }, m = () => l?.resize(), y = () => {
      window.removeEventListener("resize", m), l && (l.dispose(), l = null);
    };
    return Ws(() => o.value && b()), Qo(y), de(() => s.data, p, { deep: !0 }), de(n, p), t({ isDark: n }), (_, x) => (k(), M("div", Bf, [
      r.value ? (k(), M("div", {
        key: 0,
        class: "error-state",
        style: Ct({ height: e.height })
      }, [...x[0] || (x[0] = [
        J('<div class="error-content" data-v-e8598dd9><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8598dd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e8598dd9></path></svg><p class="error-title" data-v-e8598dd9>Chart could not be loaded</p><p class="error-description" data-v-e8598dd9>Please check the data format.</p></div>', 1)
      ])], 4)) : (k(), M("div", Lf, [
        hn(u("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: Ct({ height: e.height })
        }, null, 4), [
          [un, !a.value]
        ]),
        hn(u("div", {
          class: "loading-state",
          style: Ct({ height: e.height })
        }, [...x[1] || (x[1] = [
          J('<div class="loading-container" data-v-e8598dd9><div class="sankey-loader" data-v-e8598dd9><div class="flow flow-1" data-v-e8598dd9></div><div class="flow flow-2" data-v-e8598dd9></div><div class="flow flow-3" data-v-e8598dd9></div><div class="flow flow-4" data-v-e8598dd9></div></div><p class="loading-text" data-v-e8598dd9>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [un, a.value]
        ])
      ]))
    ]));
  }
}), ne = /* @__PURE__ */ it(Ef, [["__scopeId", "data-v-e8598dd9"]]);
function Of(e, t) {
  return k(), M("svg", {
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
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    })
  ]);
}
function Rf(e, t) {
  return k(), M("svg", {
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
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function cn(e, t) {
  return k(), M("svg", {
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
function If(e, t) {
  return k(), M("svg", {
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
function Oi(e, t) {
  return k(), M("svg", {
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
function zf(e, t) {
  return k(), M("svg", {
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
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Hf(e, t) {
  return k(), M("svg", {
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
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    })
  ]);
}
function Nf(e, t) {
  return k(), M("svg", {
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
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    })
  ]);
}
const Wf = { class: "chart-footer" }, Vf = { class: "export-actions" }, jf = { class: "export-buttons" }, Yf = ["disabled"], qf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Uf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Xf = ["disabled"], Kf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Gf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Qf = /* @__PURE__ */ rt({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = (a) => s.formats.includes(a), o = (a) => {
      s.loading || n("export", a);
    };
    return (a, r) => (k(), M("footer", Wf, [
      r[9] || (r[9] = u("div", { class: "footer-divider" }, null, -1)),
      u("div", Vf, [
        r[8] || (r[8] = u("span", { class: "export-label" }, "Export", -1)),
        u("div", jf, [
          i("pdf") ? (k(), M("button", {
            key: 0,
            type: "button",
            class: fn(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (k(), M("svg", qf, [...r[2] || (r[2] = [
              u("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (k(), M("svg", Uf, [...r[3] || (r[3] = [
              J('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = u("span", null, "PDF", -1))
          ], 10, Yf)) : I("", !0),
          i("csv") ? (k(), M("button", {
            key: 1,
            type: "button",
            class: fn(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (k(), M("svg", Kf, [...r[5] || (r[5] = [
              u("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (k(), M("svg", Gf, [...r[6] || (r[6] = [
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
            r[7] || (r[7] = u("span", null, "CSV", -1))
          ], 10, Xf)) : I("", !0)
        ])
      ])
    ]));
  }
}), xt = /* @__PURE__ */ it(Qf, [["__scopeId", "data-v-672661d4"]]), Zf = { class: "agents-per-day-card" }, Jf = {
  key: 0,
  class: "card-body"
}, tg = {
  key: 0,
  class: "chart-section"
}, eg = {
  key: 1,
  class: "empty-state"
}, sg = { class: "empty-state-content" }, ng = { class: "empty-icon-wrapper" }, ig = {
  key: 1,
  class: "loading-state"
}, og = /* @__PURE__ */ rt({
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
  setup(e, { expose: t, emit: s }) {
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
    }, i = e, o = s, a = (f) => {
      o("export", f);
    }, { isDark: r, colors: l } = ut(ht(i, "theme")), c = (f) => {
      const g = new Date(f), p = String(g.getDate()).padStart(2, "0"), v = String(g.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, d = L(() => {
      const f = i.data?.agents_by_day || {}, g = Object.keys(f).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.map((_) => c(_)), v = /* @__PURE__ */ new Set();
      for (const _ of Object.values(f))
        for (const x of Object.keys(_))
          v.add(x);
      const b = Array.from(v), m = (_) => _, y = b.map((_) => ({
        label: _,
        data: g.map((x) => f[x]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: m(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: p,
        datasets: y
      };
    }), h = L(() => i.options ? i.options : {
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
    return t({ isDark: r }), (f, g) => (k(), M("article", Zf, [
      g[3] || (g[3] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          u("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (k(), M("div", ig, [...g[2] || (g[2] = [
        J('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (k(), M("div", Jf, [
        d.value.labels && d.value.labels.length ? (k(), M("section", tg, [
          ct(Wo, {
            data: d.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", eg, [
          u("div", sg, [
            u("div", ng, [
              ct(E(cn), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = u("p", { class: "empty-title" }, "No agents data per day", -1)),
            g[1] || (g[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ag = /* @__PURE__ */ it(og, [["__scopeId", "data-v-4d18c22c"]]), W = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), qo = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), rg = { class: "booking-manager-card" }, lg = { class: "card-header" }, cg = { class: "header-content" }, dg = {
  key: 0,
  class: "payment-success-badge"
}, hg = { class: "badge-value" }, ug = {
  key: 0,
  class: "loading-state"
}, fg = {
  key: 1,
  class: "error-state"
}, gg = { class: "error-content" }, pg = { class: "error-description" }, mg = {
  key: 2,
  class: "card-body"
}, bg = { class: "chart-section" }, vg = { class: "chart-wrapper" }, yg = {
  key: 0,
  class: "table-section"
}, _g = { class: "table-wrapper" }, xg = { class: "data-table" }, kg = { class: "table-body" }, Mg = { class: "table-cell font-medium" }, Sg = { class: "table-cell text-center" }, wg = { class: "table-cell text-center" }, Cg = { class: "percentage-text" }, Dg = { class: "table-cell text-center" }, $g = { class: "table-cell" }, Ag = { class: "badges-container" }, Pg = { class: "badge badge-success" }, Fg = { class: "badge badge-error" }, Tg = { class: "table-cell" }, Bg = { class: "badges-container" }, Lg = { class: "badge badge-error" }, Eg = { class: "badge badge-warning" }, Og = { class: "badge badge-yellow" }, Rg = { class: "badge badge-error" }, Ig = {
  key: 1,
  class: "empty-state"
}, zg = /* @__PURE__ */ rt({
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
      booking_manager_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    error: { default: null },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = (c) => {
      n("export", c);
    }, o = L(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (c, d) => new Date(c.date).getTime() - new Date(d.date).getTime()
    ) : []), a = L(() => {
      const c = s.data, d = c.total_booking_initiated || 0, h = c.total_booking_started || 0, f = c.total_payment_initiated || 0, g = c.total_not_found || 0, p = c.total_cancelled || 0, v = c.total_no_pending_balance || 0, b = c.total_errors || 0, m = c.total_payment_success || 0, y = c.total_payment_failed || 0, _ = Math.max(0, d - h), x = Math.max(0, h - f - g - p - v - b), S = (D, P) => {
        const A = P > 0 ? Math.round(D / P * 100) : 0;
        return `${D.toLocaleString()} (${A}%)`;
      }, C = [
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
      ], w = [];
      return h > 0 && w.push({
        source: "Initiated",
        target: "Started",
        value: h,
        label: S(h, d)
      }), _ > 0 && w.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: _,
        label: S(_, d)
      }), f > 0 && w.push({
        source: "Started",
        target: "Payment Initiated",
        value: f,
        label: S(f, h)
      }), g > 0 && w.push({
        source: "Started",
        target: "Not Found",
        value: g,
        label: S(g, h)
      }), p > 0 && w.push({
        source: "Started",
        target: "Cancelled",
        value: p,
        label: S(p, h)
      }), v > 0 && w.push({
        source: "Started",
        target: "No Pending Balance",
        value: v,
        label: S(v, h)
      }), b > 0 && w.push({
        source: "Started",
        target: "Errors",
        value: b,
        label: S(b, h)
      }), x > 0 && w.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: x,
        label: S(x, h)
      }), m > 0 && w.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: m,
        label: S(m, f)
      }), y > 0 && w.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: y,
        label: S(y, f)
      }), { nodes: C, links: w };
    }), r = {
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
    }, l = (c, d) => !d || d === 0 ? "0%" : `${Math.round(c / d * 100)}%`;
    return (c, d) => (k(), M("article", rg, [
      u("header", lg, [
        u("div", cg, [
          d[1] || (d[1] = u("div", { class: "title-section" }, [
            u("h3", { class: "card-title" }, "Booking Manager Metrics"),
            u("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? I("", !0) : (k(), M("div", dg, [
            d[0] || (d[0] = u("p", { class: "badge-label" }, "Payment Success", -1)),
            u("p", hg, $(E(W)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (k(), M("div", ug, [...d[2] || (d[2] = [
        J('<div class="loading-container" data-v-dff9dd25><div class="chart-flow-loader" data-v-dff9dd25><div class="flow-line flow-1" data-v-dff9dd25></div><div class="flow-line flow-2" data-v-dff9dd25></div><div class="flow-line flow-3" data-v-dff9dd25></div><div class="flow-line flow-4" data-v-dff9dd25></div><div class="flow-line flow-5" data-v-dff9dd25></div></div><p class="loading-text" data-v-dff9dd25>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (k(), M("div", fg, [
        u("div", gg, [
          d[3] || (d[3] = u("div", { class: "error-icon-wrapper" }, [
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
          d[4] || (d[4] = u("p", { class: "error-title" }, "Error loading data", -1)),
          u("p", pg, $(s.error), 1)
        ])
      ])) : (k(), M("div", mg, [
        u("section", bg, [
          u("div", vg, [
            ct(ne, {
              data: a.value,
              "node-colors": r,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        o.value.length > 0 ? (k(), M("section", yg, [
          d[6] || (d[6] = u("div", { class: "section-header" }, [
            u("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          u("div", _g, [
            u("table", xg, [
              d[5] || (d[5] = u("thead", null, [
                u("tr", { class: "table-header-row" }, [
                  u("th", { class: "table-header" }, "Date"),
                  u("th", { class: "table-header" }, "Initiated"),
                  u("th", { class: "table-header" }, "Started"),
                  u("th", { class: "table-header" }, "Payment Initiated"),
                  u("th", { class: "table-header" }, "Payment Results"),
                  u("th", { class: "table-header" }, "Outcomes")
                ])
              ], -1)),
              u("tbody", kg, [
                (k(!0), M(X, null, ot(o.value, (h) => (k(), M("tr", {
                  key: h.date,
                  class: "table-row"
                }, [
                  u("td", Mg, $(E(qt)(h.date).format("DD/MM/YYYY")), 1),
                  u("td", Sg, $(E(W)(h.booking_initiated_count)), 1),
                  u("td", wg, [
                    Je($(E(W)(h.booking_started_count)) + " ", 1),
                    u("span", Cg, " (" + $(l(h.booking_started_count, h.booking_initiated_count)) + ") ", 1)
                  ]),
                  u("td", Dg, $(E(W)(h.payment_initiated_count)), 1),
                  u("td", $g, [
                    u("div", Ag, [
                      u("span", Pg, " Success: " + $(h.payment_success_count ? E(W)(h.payment_success_count) : "N/A"), 1),
                      u("span", Fg, " Failed: " + $(h.payment_failed_count ? E(W)(h.payment_failed_count) : "N/A"), 1)
                    ])
                  ]),
                  u("td", Tg, [
                    u("div", Bg, [
                      u("span", Lg, " Not Found: " + $(h.not_found_count ? E(W)(h.not_found_count) : "N/A"), 1),
                      u("span", Eg, " Cancelled: " + $(h.cancelled_count ? E(W)(h.cancelled_count) : "N/A"), 1),
                      u("span", Og, " No Balance: " + $(h.no_pending_balance_count ? E(W)(h.no_pending_balance_count) : "N/A"), 1),
                      u("span", Rg, " Errors: " + $(h.error_count ? E(W)(h.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", Ig, [...d[7] || (d[7] = [
          J('<div class="empty-state-content" data-v-dff9dd25><div class="empty-icon-wrapper" data-v-dff9dd25><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-dff9dd25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-dff9dd25></path></svg></div><p class="empty-title" data-v-dff9dd25>No booking manager data available</p><p class="empty-description" data-v-dff9dd25>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Hg = /* @__PURE__ */ it(zg, [["__scopeId", "data-v-dff9dd25"]]), Ng = { class: "checkin-metrics-card" }, Wg = {
  key: 0,
  class: "loading-state"
}, Vg = {
  key: 1,
  class: "card-body"
}, jg = {
  key: 0,
  class: "chart-section"
}, Yg = { class: "chart-wrapper" }, qg = {
  key: 1,
  class: "table-section"
}, Ug = { class: "table-wrapper" }, Xg = { class: "data-table" }, Kg = { class: "table-body" }, Gg = { class: "table-cell font-medium" }, Qg = { class: "table-cell text-center" }, Zg = { class: "table-cell text-center" }, Jg = { class: "table-cell text-center" }, tp = { class: "table-cell text-center" }, ep = { class: "table-cell text-center" }, sp = { class: "table-cell text-center" }, np = { class: "table-cell text-left" }, ip = {
  key: 0,
  class: "failed-steps"
}, op = { class: "step-name" }, ap = { class: "step-count" }, rp = {
  key: 1,
  class: "empty-cell"
}, lp = {
  key: 2,
  class: "empty-state"
}, cp = {
  __name: "Checkin",
  props: {
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
        unrecovered_by_step: []
      })
    }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = t, n = (b) => {
      s("export", b);
    }, i = e, o = {
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      checkin_by_day: []
    }, a = {
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    }, r = $t([]), l = L(() => i.checkinData ?? o), c = L(() => i.failedData ?? a), d = L(() => {
      const b = {
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
      return (c.value.unrecovered_by_step || []).forEach((y) => {
        const x = y.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[x] = S[x] || "#DC2626";
      }), b;
    }), h = (b, m) => !m || m === 0 ? "0%" : `${Math.round(b / m * 100)}%`, f = (b, m) => {
      const y = W(b), _ = h(b, m);
      return `${y} (${_})`;
    }, g = (b) => b.reduce((m, y) => m + y.failed_count, 0), p = L(() => {
      const b = [], m = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: b, links: m };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const y = l.value.total_checkin_initiated, _ = l.value.total_checkin_init, x = l.value.total_checkin_init_abandoned, S = _ - x, C = l.value.total_checkin_started, w = l.value.total_checkin_completed, D = l.value.total_checkin_closed, P = c.value.unrecovered_by_step || [], A = P.reduce((F, O) => F + O.count, 0);
      if (console.log(JSON.stringify(l.value)), _ > 0) {
        const F = Math.round(_ / y * 100);
        m.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: _,
          label: `${_.toLocaleString()} (${F}%)`
        });
      }
      const R = y - _;
      if (R > 0) {
        const F = Math.round(R / y * 100);
        b.push({ name: "Abandoned (Init)" }), m.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${F}%)`
        });
      }
      if (x > 0) {
        const F = Math.round(x / y * 100);
        b.push({ name: "Abandoned (Started)" }), m.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: x,
          label: `${x.toLocaleString()} (${F}%)`
        });
      }
      if (S > 0) {
        const F = Math.round(S / y * 100);
        m.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: S,
          label: `${S.toLocaleString()} (${F}%)`
        });
      }
      if (C > 0) {
        const F = Math.round(C / y * 100);
        m.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${F}%)`
        });
      }
      if (w > 0) {
        const F = Math.round(w / C * 100);
        m.push({
          source: "Number of Passengers",
          target: "Completed",
          value: w,
          label: `${w.toLocaleString()} (${F}%)`
        });
      }
      if (P.length > 0 && A > 0) {
        b.push({ name: "Unrecovered" });
        const F = Math.round(A / C * 100);
        m.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: A,
          label: `${A.toLocaleString()} (${F}%)`
        }), P.forEach((O) => {
          const G = O.step_name.replace(/_/g, " ").split(" ").map((B) => B.charAt(0).toUpperCase() + B.slice(1)).join(" "), H = Math.round(O.count / C * 100);
          b.push({ name: G }), m.push({
            source: "Unrecovered",
            target: G,
            value: O.count,
            label: `${O.count.toLocaleString()} (${H}%)`
          });
        });
      }
      const T = C - (w + A);
      if (T > 0) {
        const F = Math.round(T / C * 100);
        b.push({ name: "Abandoned (Flow)" }), m.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: T,
          label: `${T.toLocaleString()} (${F}%)`
        });
      }
      const N = w - D;
      if (N > 0) {
        const F = Math.round(N / C * 100);
        b.push({ name: "BP Error" }), m.push({
          source: "Completed",
          target: "BP Error",
          value: N,
          label: `${N.toLocaleString()} (${F}%)`
        });
      }
      if (D > 0) {
        const F = Math.round(D / C * 100);
        m.push({
          source: "Completed",
          target: "Closed with BP",
          value: D,
          label: `${D.toLocaleString()} (${F}%)`
        });
      }
      return console.log(JSON.stringify(b)), console.log(JSON.stringify(m)), { nodes: b, links: m };
    }), v = () => {
      const b = l.value.checkin_by_day || [], m = c.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...b].map((y) => {
        const _ = m.find(
          (x) => x.date === y.date
        );
        return {
          ...y,
          failed_steps: _?.steps || []
        };
      }), r.value.sort((y, _) => new Date(y.date) - new Date(_.date));
    };
    return de(
      [() => i.checkinData, () => i.failedData],
      () => {
        v();
      },
      { deep: !0, immediate: !0 }
    ), (b, m) => (k(), M("article", Ng, [
      m[3] || (m[3] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "Check-in Metrics"),
          u("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      i.loading ? (k(), M("div", Wg, [...m[0] || (m[0] = [
        J('<div class="loading-container" data-v-306ad607><div class="chart-flow-loader" data-v-306ad607><div class="flow-line flow-1" data-v-306ad607></div><div class="flow-line flow-2" data-v-306ad607></div><div class="flow-line flow-3" data-v-306ad607></div><div class="flow-line flow-4" data-v-306ad607></div><div class="flow-line flow-5" data-v-306ad607></div></div><p class="loading-text" data-v-306ad607>Loading check-in data...</p></div>', 1)
      ])])) : (k(), M("div", Vg, [
        p.value.nodes.length > 0 ? (k(), M("section", jg, [
          u("div", Yg, [
            ct(ne, {
              data: p.value,
              height: "500px",
              "node-colors": d.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        r.value && r.value.length > 0 ? (k(), M("section", qg, [
          u("div", Ug, [
            u("table", Xg, [
              m[1] || (m[1] = u("thead", null, [
                u("tr", { class: "table-header-row" }, [
                  u("th", { class: "table-header" }, "Date"),
                  u("th", { class: "table-header" }, "Checkin Init"),
                  u("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  u("th", { class: "table-header" }, "Number of Passengers"),
                  u("th", { class: "table-header" }, "Completed (%)"),
                  u("th", { class: "table-header" }, "Closed with BP (%)"),
                  u("th", { class: "table-header" }, "Failed (%)"),
                  u("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              u("tbody", Kg, [
                (k(!0), M(X, null, ot(r.value, (y) => (k(), M("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  u("td", Gg, $(E(qt)(y.date).format("DD/MM/YYYY")), 1),
                  u("td", Qg, $(E(W)(y.checkin_initiated_count)), 1),
                  u("td", Zg, $(f(y.checkin_init_count, y.checkin_initiated_count)), 1),
                  u("td", Jg, $(E(W)(y.checkin_started_count)), 1),
                  u("td", tp, $(f(y.checkin_completed_count, y.checkin_started_count)), 1),
                  u("td", ep, $(f(y.checkin_closed_count, y.checkin_started_count)), 1),
                  u("td", sp, $(f(g(y.failed_steps), y.checkin_started_count)), 1),
                  u("td", np, [
                    y.failed_steps && y.failed_steps.length > 0 ? (k(), M("div", ip, [
                      (k(!0), M(X, null, ot(y.failed_steps, (_) => (k(), M("div", {
                        key: _.step_name,
                        class: "failed-step-item"
                      }, [
                        u("span", op, $(_.step_name.replace(/_/g, " ")) + ":", 1),
                        u("span", ap, $(_.failed_count), 1)
                      ]))), 128))
                    ])) : (k(), M("div", rp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", lp, [...m[2] || (m[2] = [
          J('<div class="empty-state-content" data-v-306ad607><div class="empty-icon-wrapper" data-v-306ad607><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-306ad607><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-306ad607></path></svg></div><p class="empty-title" data-v-306ad607>No check-in data available</p><p class="empty-description" data-v-306ad607>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, dp = /* @__PURE__ */ it(cp, [["__scopeId", "data-v-306ad607"]]), hp = { class: "checkin-metrics-card" }, up = {
  key: 0,
  class: "loading-state"
}, fp = {
  key: 1,
  class: "card-body"
}, gp = {
  key: 0,
  class: "sankey-section"
}, pp = {
  key: 1,
  class: "table-section"
}, mp = { class: "table-wrapper" }, bp = { class: "data-table" }, vp = { class: "table-body" }, yp = { class: "table-cell date-cell" }, _p = { class: "table-cell text-center" }, xp = { class: "table-cell text-center" }, kp = { class: "table-cell text-center" }, Mp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, wp = { class: "table-cell text-center" }, Cp = { class: "table-cell reasons-cell" }, Dp = {
  key: 0,
  class: "reasons-list"
}, $p = { class: "reason-name" }, Ap = { class: "reason-count" }, Pp = {
  key: 1,
  class: "no-reasons"
}, Fp = {
  key: 2,
  class: "empty-state"
}, Tp = { class: "empty-state-content" }, Bp = { class: "empty-icon-wrapper" }, Lp = /* @__PURE__ */ rt({
  __name: "CheckinMetrics",
  props: {
    checkinData: { default: () => ({
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      checkin_by_day: []
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
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, o = (b) => {
      i("export", b);
    }, { isDark: a } = ut(ht(n, "theme")), r = (b) => b == null ? "0" : b.toLocaleString(), l = (b) => {
      const m = new Date(b), y = String(m.getDate()).padStart(2, "0"), _ = String(m.getMonth() + 1).padStart(2, "0"), x = m.getFullYear();
      return `${y}/${_}/${x}`;
    }, c = (b) => b.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), d = (b, m) => !m || m === 0 ? "0%" : `${Math.round(b / m * 100)}%`, h = (b, m) => {
      const y = b || 0, _ = m || 0, x = r(y), S = d(y, _);
      return `${x} (${S})`;
    }, f = (b) => b ? b.reduce((m, y) => m + y.failed_count, 0) : 0, g = L(() => {
      const b = {
        "Checkin Init": "#93C5FD",
        "Booking retrive": "#C7D2FE",
        "Booking retrive success": "#A5B4FC",
        "Number of Passengers": "#8B8CF6",
        Completed: "#A7F3D0",
        "Closed with BP": "#7BE39E",
        "Abandoned (Init)": "#FCA5A5",
        "Abandoned (Started)": "#F87171",
        "Abandoned (Flow)": "#EF4444",
        "BP Error": "#EF4444",
        Unrecovered: "#F87171"
      };
      return (n.failedData?.unrecovered_by_step || []).forEach((y) => {
        const x = y.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[x] = S[x] || "#DC2626";
      }), b;
    }), p = L(() => {
      const b = n.checkinData?.checkin_by_day || [], m = n.failedData?.failed_by_step_by_day || [];
      return b.map((_) => {
        const x = m.find((S) => S.date === _.date);
        return {
          ..._,
          failed_steps: x?.steps || []
        };
      }).sort((_, x) => new Date(_.date).getTime() - new Date(x.date).getTime());
    }), v = L(() => {
      const b = [], m = [];
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: b, links: m };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const y = n.checkinData.total_checkin_initiated || 0, _ = n.checkinData.total_checkin_init || 0, x = n.checkinData.total_checkin_init_abandoned || 0, S = _ - x, C = n.checkinData.total_checkin_started || 0, w = n.checkinData.total_checkin_completed || 0, D = n.checkinData.total_checkin_closed || 0, P = n.failedData?.unrecovered_by_step || [], A = P.reduce((F, O) => F + O.count, 0);
      if (_ > 0) {
        const F = Math.round(_ / y * 100);
        m.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: _,
          label: `${_.toLocaleString()} (${F}%)`
        });
      }
      const R = y - _;
      if (R > 0) {
        const F = Math.round(R / y * 100);
        b.push({ name: "Abandoned (Init)" }), m.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${F}%)`
        });
      }
      if (x > 0) {
        const F = Math.round(x / y * 100);
        b.push({ name: "Abandoned (Started)" }), m.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: x,
          label: `${x.toLocaleString()} (${F}%)`
        });
      }
      if (S > 0) {
        const F = Math.round(S / y * 100);
        m.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: S,
          label: `${S.toLocaleString()} (${F}%)`
        });
      }
      if (C > 0) {
        const F = Math.round(C / y * 100);
        m.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${F}%)`
        });
      }
      if (w > 0) {
        const F = Math.round(w / C * 100);
        m.push({
          source: "Number of Passengers",
          target: "Completed",
          value: w,
          label: `${w.toLocaleString()} (${F}%)`
        });
      }
      if (P.length > 0 && A > 0) {
        b.push({ name: "Unrecovered" });
        const F = Math.round(A / C * 100);
        m.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: A,
          label: `${A.toLocaleString()} (${F}%)`
        }), P.forEach((O) => {
          const G = O.step_name.replace(/_/g, " ").split(" ").map((B) => B.charAt(0).toUpperCase() + B.slice(1)).join(" "), H = Math.round(O.count / C * 100);
          b.push({ name: G }), m.push({
            source: "Unrecovered",
            target: G,
            value: O.count,
            label: `${O.count.toLocaleString()} (${H}%)`
          });
        });
      }
      const T = C - (w + A);
      if (T > 0) {
        const F = Math.round(T / C * 100);
        b.push({ name: "Abandoned (Flow)" }), m.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: T,
          label: `${T.toLocaleString()} (${F}%)`
        });
      }
      const N = w - D;
      if (N > 0) {
        const F = Math.round(N / C * 100);
        b.push({ name: "BP Error" }), m.push({
          source: "Completed",
          target: "BP Error",
          value: N,
          label: `${N.toLocaleString()} (${F}%)`
        });
      }
      if (D > 0) {
        const F = Math.round(D / C * 100);
        m.push({
          source: "Completed",
          target: "Closed with BP",
          value: D,
          label: `${D.toLocaleString()} (${F}%)`
        });
      }
      return { nodes: b, links: m };
    });
    return t({ isDark: a }), (b, m) => (k(), M("article", hp, [
      m[4] || (m[4] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "Check-in Metrics"),
          u("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (k(), M("div", up, [...m[0] || (m[0] = [
        J('<div class="loading-container" data-v-8283d36d><div class="chart-bars-loader" data-v-8283d36d><div class="bar bar-1" data-v-8283d36d></div><div class="bar bar-2" data-v-8283d36d></div><div class="bar bar-3" data-v-8283d36d></div><div class="bar bar-4" data-v-8283d36d></div><div class="bar bar-5" data-v-8283d36d></div></div><p class="loading-text" data-v-8283d36d>Loading check-in data...</p></div>', 1)
      ])])) : (k(), M("div", fp, [
        v.value.nodes.length > 0 ? (k(), M("div", gp, [
          ct(ne, {
            data: v.value,
            height: "500px",
            "node-colors": g.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : I("", !0),
        p.value && p.value.length > 0 ? (k(), M("div", pp, [
          u("div", mp, [
            u("table", bp, [
              m[1] || (m[1] = u("thead", null, [
                u("tr", { class: "table-header-row" }, [
                  u("th", { class: "table-header" }, "Date"),
                  u("th", { class: "table-header" }, "Checkin Init"),
                  u("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  u("th", { class: "table-header" }, "Number of Passengers"),
                  u("th", { class: "table-header" }, "Completed (%)"),
                  u("th", { class: "table-header" }, "Closed with BP (%)"),
                  u("th", { class: "table-header" }, "Failed (%)"),
                  u("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              u("tbody", vp, [
                (k(!0), M(X, null, ot(p.value, (y) => (k(), M("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  u("td", yp, $(l(y.date)), 1),
                  u("td", _p, $(r(y.checkin_initiated_count)), 1),
                  u("td", xp, $(h(y.checkin_init_count, y.checkin_initiated_count)), 1),
                  u("td", kp, $(r(y.checkin_started_count)), 1),
                  u("td", Mp, $(h(y.checkin_completed_count, y.checkin_started_count)), 1),
                  u("td", Sp, $(h(y.checkin_closed_count, y.checkin_started_count)), 1),
                  u("td", wp, $(h(f(y.failed_steps), y.checkin_started_count)), 1),
                  u("td", Cp, [
                    y.failed_steps && y.failed_steps.length > 0 ? (k(), M("div", Dp, [
                      (k(!0), M(X, null, ot(y.failed_steps, (_) => (k(), M("div", {
                        key: _.step_name,
                        class: "reason-item"
                      }, [
                        u("span", $p, $(c(_.step_name)) + ":", 1),
                        u("span", Ap, $(_.failed_count), 1)
                      ]))), 128))
                    ])) : (k(), M("div", Pp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("div", Fp, [
          u("div", Tp, [
            u("div", Bp, [
              ct(E(cn), { class: "empty-icon" })
            ]),
            m[2] || (m[2] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
            m[3] || (m[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ep = /* @__PURE__ */ it(Lp, [["__scopeId", "data-v-8283d36d"]]), Op = { class: "checkin-segments-card" }, Rp = {
  key: 0,
  class: "loading-state"
}, Ip = {
  key: 1,
  class: "card-body"
}, zp = {
  key: 0,
  class: "table-section"
}, Hp = { class: "table-wrapper" }, Np = { class: "data-table" }, Wp = { class: "table-body" }, Vp = { class: "table-cell font-medium text-center" }, jp = { class: "airport-badge" }, Yp = { class: "table-cell text-center" }, qp = {
  key: 0,
  class: "airport-badge connection"
}, Up = {
  key: 1,
  class: "empty-connection"
}, Xp = { class: "table-cell text-center" }, Kp = { class: "airport-badge" }, Gp = { class: "table-cell text-center" }, Qp = {
  key: 0,
  class: "trip-badge roundtrip"
}, Zp = {
  key: 1,
  class: "trip-badge oneway"
}, Jp = { class: "table-cell text-center" }, t0 = { class: "table-cell text-center" }, e0 = { class: "percentage-value" }, s0 = { class: "table-cell text-center" }, n0 = { class: "percentage-value" }, i0 = { class: "table-cell text-center" }, o0 = { class: "percentage-value success" }, a0 = {
  key: 1,
  class: "empty-state"
}, r0 = /* @__PURE__ */ rt({
  __name: "checkinSegments",
  props: {
    data: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, o = (d) => {
      i("export", d);
    }, { isDark: a } = ut(ht(n, "theme")), r = (d, h) => !h || h === 0 || !d ? "0%" : `${Math.round(d / h * 100)}%`, l = (d) => !d || d === "None" ? "-" : String(d).trim().replace(/_[0-9]+$/i, ""), c = (d) => {
      const h = l(d?.departure_airport), f = l(d?.arrival_airport);
      return h === "-" || f === "-" ? !1 : h === f;
    };
    return t({ isDark: a }), (d, h) => (k(), M("article", Op, [
      h[5] || (h[5] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "Checkin Segments"),
          u("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      n.loading ? (k(), M("div", Rp, [...h[0] || (h[0] = [
        J('<div class="loading-container" data-v-5f8ce8fa><div class="chart-flow-loader" data-v-5f8ce8fa><div class="flow-line flow-1" data-v-5f8ce8fa></div><div class="flow-line flow-2" data-v-5f8ce8fa></div><div class="flow-line flow-3" data-v-5f8ce8fa></div><div class="flow-line flow-4" data-v-5f8ce8fa></div><div class="flow-line flow-5" data-v-5f8ce8fa></div></div><p class="loading-text" data-v-5f8ce8fa>Loading segment data...</p></div>', 1)
      ])])) : (k(), M("div", Ip, [
        n.data.length > 0 ? (k(), M("section", zp, [
          u("div", Hp, [
            u("table", Np, [
              h[3] || (h[3] = u("thead", null, [
                u("tr", { class: "table-header-row" }, [
                  u("th", { class: "table-header" }, "Departure"),
                  u("th", { class: "table-header" }, "Connection"),
                  u("th", { class: "table-header" }, "Arrival"),
                  u("th", { class: "table-header" }, "Trip"),
                  u("th", { class: "table-header" }, "Init"),
                  u("th", { class: "table-header" }, "Started (%)"),
                  u("th", { class: "table-header" }, "Completed (%)"),
                  u("th", { class: "table-header" }, "Closed (%)")
                ])
              ], -1)),
              u("tbody", Wp, [
                (k(!0), M(X, null, ot(n.data, (f, g) => (k(), M("tr", {
                  key: g,
                  class: "table-row"
                }, [
                  u("td", Vp, [
                    u("span", jp, $(l(f.departure_airport)), 1)
                  ]),
                  u("td", Yp, [
                    l(f.conexion_airport) !== "-" ? (k(), M("span", qp, $(l(f.conexion_airport)), 1)) : (k(), M("span", Up, "-"))
                  ]),
                  u("td", Xp, [
                    u("span", Kp, $(l(f.arrival_airport)), 1)
                  ]),
                  u("td", Gp, [
                    c(f) ? (k(), M("span", Qp, [...h[1] || (h[1] = [
                      u("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        u("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        })
                      ], -1),
                      Je(" Roundtrip ", -1)
                    ])])) : (k(), M("span", Zp, [...h[2] || (h[2] = [
                      u("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        u("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M14 5l7 7m0 0l-7 7m7-7H3"
                        })
                      ], -1),
                      Je(" One way ", -1)
                    ])]))
                  ]),
                  u("td", Jp, $(E(W)(f.segment_init_count)), 1),
                  u("td", t0, [
                    u("span", e0, $(r(f.segment_started_count, f.segment_init_count)), 1)
                  ]),
                  u("td", s0, [
                    u("span", n0, $(r(f.segment_completed_count, f.segment_init_count)), 1)
                  ]),
                  u("td", i0, [
                    u("span", o0, $(r(f.segment_closed_count, f.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", a0, [...h[4] || (h[4] = [
          J('<div class="empty-state-content" data-v-5f8ce8fa><div class="empty-icon-wrapper" data-v-5f8ce8fa><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5f8ce8fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-5f8ce8fa></path></svg></div><p class="empty-title" data-v-5f8ce8fa>No segment data available</p><p class="empty-description" data-v-5f8ce8fa>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), l0 = /* @__PURE__ */ it(r0, [["__scopeId", "data-v-5f8ce8fa"]]), c0 = { class: "disruption-metrics-card" }, d0 = { class: "card-header" }, h0 = { class: "header-content" }, u0 = {
  key: 0,
  class: "payment-success-badge"
}, f0 = { class: "badge-value" }, g0 = {
  key: 0,
  class: "loading-state"
}, p0 = {
  key: 1,
  class: "card-body"
}, m0 = { class: "chart-section" }, b0 = { class: "chart-wrapper" }, v0 = {
  key: 1,
  class: "empty-chart"
}, y0 = {
  key: 0,
  class: "table-section"
}, _0 = { class: "table-wrapper" }, x0 = { class: "data-table" }, k0 = { class: "table-body" }, M0 = { class: "table-cell font-medium text-center" }, S0 = { class: "table-cell text-center" }, w0 = { class: "table-cell text-center" }, C0 = { class: "percentage-text" }, D0 = { class: "table-cell text-center" }, $0 = { class: "abandoned-value" }, A0 = { class: "table-cell" }, P0 = { class: "badges-container badges-wrap" }, F0 = { class: "badge badge-vol" }, T0 = { class: "badge badge-confirm" }, B0 = { class: "badge badge-not-confirm" }, L0 = { class: "badge badge-reject" }, E0 = { class: "badge badge-not-paid" }, O0 = { class: "badge badge-success" }, R0 = { class: "table-cell" }, I0 = { class: "badges-container badges-wrap" }, z0 = { class: "badge badge-inv" }, H0 = { class: "badge badge-human" }, N0 = { class: "badge badge-accept" }, W0 = {
  key: 1,
  class: "empty-state"
}, V0 = /* @__PURE__ */ rt({
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
      total_payment_success: 0,
      disruption_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = (c) => {
      n("export", c);
    }, o = L(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (c, d) => new Date(c.date).getTime() - new Date(d.date).getTime()
    ) : []), a = (c, d) => !d || d === 0 ? "0%" : `${Math.round(c / d * 100)}%`, r = L(() => {
      const c = s.data, d = c.total_disruption_conversations || 0, h = c.total_disruption_initiated || 0, f = c.total_voluntary || 0, g = c.total_involuntary || 0, p = c.total_accepted || 0, v = c.total_confirmed || 0, b = c.total_sell_success || 0, m = c.total_sell_failed || 0, y = Math.max(0, d - h), _ = Math.max(0, h - f - g), x = Math.max(0, g - p), S = Math.max(0, f - v), C = m, w = Math.max(0, v - b - C), D = (R, T) => {
        const N = T > 0 ? Math.round(R / T * 100) : 0;
        return `${R.toLocaleString()} (${N}%)`;
      }, P = [
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
      ], A = [];
      return h > 0 && A.push({
        source: "Initiated",
        target: "Started",
        value: h,
        label: D(h, d)
      }), y > 0 && A.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: y,
        label: D(y, d)
      }), f > 0 && A.push({
        source: "Started",
        target: "Voluntary",
        value: f,
        label: D(f, d)
      }), g > 0 && A.push({
        source: "Started",
        target: "Involuntary",
        value: g,
        label: D(g, d)
      }), _ > 0 && A.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: _,
        label: D(_, d)
      }), p > 0 && A.push({
        source: "Involuntary",
        target: "Accepted",
        value: p,
        label: D(p, d)
      }), x > 0 && A.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: x,
        label: D(x, d)
      }), v > 0 && A.push({
        source: "Voluntary",
        target: "Confirmed",
        value: v,
        label: D(v, d)
      }), S > 0 && A.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: S,
        label: D(S, d)
      }), b > 0 && A.push({
        source: "Confirmed",
        target: "Paid",
        value: b,
        label: D(b, d)
      }), C > 0 && A.push({
        source: "Confirmed",
        target: "Rejected",
        value: C,
        label: D(C, d)
      }), w > 0 && A.push({
        source: "Confirmed",
        target: "Not Paid",
        value: w,
        label: D(w, d)
      }), { nodes: P, links: A };
    }), l = {
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
    return (c, d) => (k(), M("article", c0, [
      u("header", d0, [
        u("div", h0, [
          d[1] || (d[1] = u("div", { class: "title-section" }, [
            u("h3", { class: "card-title" }, "Disruption Metrics"),
            u("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? I("", !0) : (k(), M("div", u0, [
            d[0] || (d[0] = u("p", { class: "badge-label" }, "Payment Success", -1)),
            u("p", f0, $(E(W)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (k(), M("div", g0, [...d[2] || (d[2] = [
        J('<div class="loading-container" data-v-20b043d3><div class="chart-bars-loader" data-v-20b043d3><div class="bar bar-1" data-v-20b043d3></div><div class="bar bar-2" data-v-20b043d3></div><div class="bar bar-3" data-v-20b043d3></div><div class="bar bar-4" data-v-20b043d3></div><div class="bar bar-5" data-v-20b043d3></div></div><p class="loading-text" data-v-20b043d3>Loading disruption data...</p></div>', 1)
      ])])) : (k(), M("div", p0, [
        u("section", m0, [
          u("div", b0, [
            r.value.nodes.length > 0 && r.value.links.length > 0 ? (k(), ft(ne, {
              key: 0,
              data: r.value,
              "node-colors": l,
              height: "500px"
            }, null, 8, ["data"])) : (k(), M("div", v0, [...d[3] || (d[3] = [
              u("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        o.value && o.value.length > 0 ? (k(), M("section", y0, [
          d[5] || (d[5] = J('<div class="section-header" data-v-20b043d3><h4 class="section-title" data-v-20b043d3>Daily Overview</h4></div><div class="legend-container" data-v-20b043d3><p class="legend-title" data-v-20b043d3>Legend</p><div class="legend-items" data-v-20b043d3><div class="legend-group" data-v-20b043d3><span class="legend-label" data-v-20b043d3>Voluntary:</span><span class="badge badge-vol" data-v-20b043d3>VOL</span></div><div class="legend-group" data-v-20b043d3><span class="legend-label" data-v-20b043d3>Involuntary:</span><span class="badge badge-inv" data-v-20b043d3>INV</span></div><div class="legend-note" data-v-20b043d3><span data-v-20b043d3>Vol=Voluntary</span><span data-v-20b043d3>•</span><span data-v-20b043d3>Inv=Involuntary</span></div></div></div>', 2)),
          u("div", _0, [
            u("table", x0, [
              d[4] || (d[4] = u("thead", null, [
                u("tr", { class: "table-header-row" }, [
                  u("th", { class: "table-header" }, "Date"),
                  u("th", { class: "table-header" }, "Initiated"),
                  u("th", { class: "table-header" }, "Started"),
                  u("th", { class: "table-header" }, "Abandoned (%)"),
                  u("th", { class: "table-header" }, "Voluntary"),
                  u("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              u("tbody", k0, [
                (k(!0), M(X, null, ot(o.value, (h) => (k(), M("tr", {
                  key: h.date,
                  class: "table-row"
                }, [
                  u("td", M0, $(E(qt)(h.date).format("DD/MM")), 1),
                  u("td", S0, $(E(W)(h.disruption_conversations)), 1),
                  u("td", w0, [
                    Je($(E(W)(h.disruption_initiated_count)) + " ", 1),
                    u("span", C0, " (" + $(a(h.disruption_initiated_count, h.disruption_conversations)) + ") ", 1)
                  ]),
                  u("td", D0, [
                    u("span", $0, $(E(W)(h.disruption_initiated_count - h.voluntary_count - h.involuntary_count)) + " (" + $(a(h.disruption_initiated_count - h.voluntary_count - h.involuntary_count, h.disruption_conversations)) + ") ", 1)
                  ]),
                  u("td", A0, [
                    u("div", P0, [
                      u("span", F0, " VOL " + $(E(W)(h.voluntary_count)) + " (" + $(a(h.voluntary_count, h.disruption_conversations)) + ") ", 1),
                      u("span", T0, " Confirm " + $(E(W)(h.confirmed_count)) + " (" + $(a(h.confirmed_count, h.disruption_conversations)) + ") ", 1),
                      u("span", B0, " Not Confirm " + $(E(W)(h.voluntary_count - h.confirmed_count)) + " (" + $(a(h.voluntary_count - h.confirmed_count, h.disruption_conversations)) + ") ", 1),
                      u("span", L0, " Reject " + $(E(W)(h.sell_failed_count)) + " (" + $(a(h.sell_failed_count, h.disruption_conversations)) + ") ", 1),
                      u("span", E0, " Not Paid " + $(E(W)(Math.max(0, h.confirmed_count - h.sell_success_count - h.sell_failed_count))) + " (" + $(a(Math.max(0, h.confirmed_count - h.sell_success_count - h.sell_failed_count), h.disruption_conversations)) + ") ", 1),
                      u("span", O0, " Finish " + $(E(W)(h.sell_success_count)) + " (" + $(a(h.sell_success_count, h.disruption_conversations)) + ") ", 1)
                    ])
                  ]),
                  u("td", R0, [
                    u("div", I0, [
                      u("span", z0, " INV " + $(E(W)(h.involuntary_count)) + " (" + $(a(h.involuntary_count, h.disruption_conversations)) + ") ", 1),
                      u("span", H0, " Human " + $(E(W)(h.involuntary_count - h.accepted_count)) + " (" + $(a(h.involuntary_count - h.accepted_count, h.disruption_conversations)) + ") ", 1),
                      u("span", N0, " Accept " + $(E(W)(h.accepted_count)) + " (" + $(a(h.accepted_count, h.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", W0, [...d[6] || (d[6] = [
          J('<div class="empty-state-content" data-v-20b043d3><div class="empty-icon-wrapper" data-v-20b043d3><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-20b043d3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-20b043d3></path></svg></div><p class="empty-title" data-v-20b043d3>No disruption data available</p><p class="empty-description" data-v-20b043d3>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), j0 = /* @__PURE__ */ it(V0, [["__scopeId", "data-v-20b043d3"]]), Y0 = { class: "faq-metrics-card" }, q0 = {
  key: 0,
  class: "card-body"
}, U0 = { class: "kpi-grid" }, X0 = { class: "kpi-card" }, K0 = { class: "kpi-value" }, G0 = { class: "kpi-card" }, Q0 = { class: "kpi-value" }, Z0 = { class: "kpi-card" }, J0 = { class: "kpi-value" }, tm = { class: "kpi-card" }, em = { class: "kpi-value" }, sm = { class: "kpi-card" }, nm = { class: "kpi-value" }, im = {
  key: 0,
  class: "chart-section"
}, om = {
  key: 1,
  class: "empty-state"
}, am = {
  key: 1,
  class: "loading-state"
}, rm = /* @__PURE__ */ rt({
  __name: "FAQ",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, o = (f) => {
      i("export", f);
    }, { isDark: a, colors: r } = ut(ht(n, "theme")), l = $t({ labels: [], datasets: [] }), c = L(() => n.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), d = L(() => ({
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
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
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
            display: !1
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
    })), h = (f) => {
      if (!f) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const g = f.faq_by_day || [];
      if (g.length > 0) {
        const p = g.map((y) => qt(y.date).format("MMM DD")), v = g.map((y) => y.airline_information_retrieved_count || 0), b = g.map((y) => y.flight_status_retrieved_count || 0), m = g.map((y) => y.booking_info_retrieved_count || 0);
        l.value = {
          labels: p,
          datasets: [
            {
              label: "Airline Information",
              data: v,
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
              data: b,
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
              data: m,
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
        l.value = { labels: [], datasets: [] };
    };
    return de(
      () => n.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: a }), (f, g) => (k(), M("article", Y0, [
      g[7] || (g[7] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "FAQ Metrics"),
          u("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      n.loading ? (k(), M("div", am, [...g[6] || (g[6] = [
        J('<div class="loading-container" data-v-a0bf4731><div class="chart-bars-loader" data-v-a0bf4731><div class="bar bar-1" data-v-a0bf4731></div><div class="bar bar-2" data-v-a0bf4731></div><div class="bar bar-3" data-v-a0bf4731></div><div class="bar bar-4" data-v-a0bf4731></div><div class="bar bar-5" data-v-a0bf4731></div></div><p class="loading-text" data-v-a0bf4731>Loading FAQ metrics...</p></div>', 1)
      ])])) : (k(), M("div", q0, [
        u("div", U0, [
          u("div", X0, [
            g[0] || (g[0] = u("span", { class: "kpi-label" }, "Total FAQ", -1)),
            u("span", K0, $(E(W)(c.value.total_faq_events)), 1)
          ]),
          u("div", G0, [
            g[1] || (g[1] = u("span", { class: "kpi-label" }, "Documents Found", -1)),
            u("span", Q0, $(E(W)(c.value.total_documents_found)), 1)
          ]),
          u("div", Z0, [
            g[2] || (g[2] = u("span", { class: "kpi-label" }, "Airline Info", -1)),
            u("span", J0, $(E(W)(c.value.total_airline_information_retrieved)), 1)
          ]),
          u("div", tm, [
            g[3] || (g[3] = u("span", { class: "kpi-label" }, "Booking Info", -1)),
            u("span", em, $(E(W)(c.value.total_booking_info_retrieved)), 1)
          ]),
          u("div", sm, [
            g[4] || (g[4] = u("span", { class: "kpi-label" }, "Flight Status", -1)),
            u("span", nm, $(E(W)(c.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (k(), M("section", im, [
          ct(ln, {
            data: l.value,
            options: d.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", om, [...g[5] || (g[5] = [
          J('<div class="empty-state-content" data-v-a0bf4731><div class="empty-icon-wrapper" data-v-a0bf4731><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a0bf4731><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-a0bf4731></path></svg></div><p class="empty-title" data-v-a0bf4731>No FAQ data available</p><p class="empty-description" data-v-a0bf4731>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), lm = /* @__PURE__ */ it(rm, [["__scopeId", "data-v-a0bf4731"]]), cm = { class: "messages-per-agent-card" }, dm = {
  key: 0,
  class: "card-body"
}, hm = {
  key: 0,
  class: "chart-section"
}, um = {
  key: 1,
  class: "empty-state"
}, fm = { class: "empty-state-content" }, gm = { class: "empty-icon-wrapper" }, pm = {
  key: 1,
  class: "loading-state"
}, mm = /* @__PURE__ */ rt({
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
  setup(e, { expose: t, emit: s }) {
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
    }, i = e, o = s, a = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = ut(ht(i, "theme")), c = L(() => {
      const h = i.data?.agents_by_day || {}, f = Object.keys(h).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const b of Object.values(h))
        for (const m of Object.keys(b))
          g.add(m);
      const v = Array.from(g).map((b) => {
        const m = n[b] || "#94a3b8";
        return {
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          data: f.map((y) => h[y]?.[b] || 0),
          borderColor: m,
          backgroundColor: `${m}20`,
          pointBackgroundColor: m,
          pointBorderColor: r.value ? "#1a1a1d" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: !1
        };
      });
      return {
        labels: f,
        datasets: v
      };
    }), d = L(() => i.options ? i.options : {
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
            display: !1
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
    return t({ isDark: r }), (h, f) => (k(), M("article", cm, [
      f[3] || (f[3] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "Messages per Agent"),
          u("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (k(), M("div", pm, [...f[2] || (f[2] = [
        J('<div class="loading-container" data-v-53a825f5><div class="chart-lines-loader" data-v-53a825f5><div class="line line-1" data-v-53a825f5></div><div class="line line-2" data-v-53a825f5></div><div class="line line-3" data-v-53a825f5></div><div class="line line-4" data-v-53a825f5></div><div class="line line-5" data-v-53a825f5></div></div><p class="loading-text" data-v-53a825f5>Loading chart data...</p></div>', 1)
      ])])) : (k(), M("div", dm, [
        c.value.labels && c.value.labels.length ? (k(), M("section", hm, [
          ct(ln, {
            data: c.value,
            options: d.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", um, [
          u("div", fm, [
            u("div", gm, [
              ct(E(cn), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = u("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), bm = /* @__PURE__ */ it(mm, [["__scopeId", "data-v-53a825f5"]]), vm = { class: "record-locator-card" }, ym = {
  key: 0,
  class: "loading-state"
}, _m = {
  key: 1,
  class: "card-body"
}, xm = {
  key: 0,
  class: "chart-section"
}, km = { class: "chart-wrapper" }, Mm = {
  key: 1,
  class: "table-section"
}, Sm = { class: "table-wrapper" }, wm = { class: "data-table" }, Cm = { class: "table-header-row" }, Dm = {
  key: 0,
  class: "table-header"
}, $m = {
  key: 1,
  class: "table-header"
}, Am = { class: "table-body" }, Pm = { class: "table-cell font-medium" }, Fm = { class: "table-cell text-center" }, Tm = { class: "table-cell text-center" }, Bm = { class: "table-cell text-center" }, Lm = { class: "table-cell text-center" }, Em = { class: "table-cell text-center success-value" }, Om = { class: "table-cell text-center failed-value" }, Rm = { class: "table-cell text-center warning-value" }, Im = {
  key: 0,
  class: "table-cell text-center"
}, zm = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Hm = {
  key: 2,
  class: "empty-state"
}, Nm = /* @__PURE__ */ rt({
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
      record_locator_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    isAvianca: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, o = (g) => {
      i("export", g);
    }, { isDark: a } = ut(ht(n, "theme")), r = L(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (g, p) => new Date(g.date).getTime() - new Date(p.date).getTime()
    ) : []), l = L(() => n.data), c = L(() => ({
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
      // Abandoned states - progressive red
      "Abandoned (Init)": "#FCA5A5",
      // Light red
      "Abandoned (Started)": "#F87171",
      // Medium red
      "Abandoned (Flow)": "#EF4444",
      // Darker red
      // Failed states
      "Checkin Failed": "#F87171"
      // Medium red for main failed node
    })), d = (g, p) => !p || p === 0 ? "0%" : `${Math.round(g / p * 100)}%`, h = (g, p) => {
      const v = W(g), b = d(g, p);
      return `${v} (${b})`;
    }, f = L(() => {
      const g = [], p = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: g, links: p };
      g.push({ name: "Checkin Init" }), g.push({ name: "Booking retrive" }), g.push({ name: "Checkin Started" }), g.push({ name: "Checkin Completed" }), g.push({ name: "Checkin Closed" });
      const v = l.value.total_checkin_initiated, b = l.value.total_record_locator_init, m = l.value.total_record_locator_started, y = l.value.total_record_locator_completed, _ = l.value.total_record_locator_closed, x = l.value.total_record_locator_failed, S = l.value.total_record_locator_abandoned, C = l.value.total_record_locator_init_abandoned;
      if (b > 0) {
        const D = Math.round(b / v * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: b,
          label: `${b.toLocaleString()} (${D}%)`
        });
      }
      const w = v - b;
      if (w > 0) {
        const D = Math.round(w / v * 100);
        g.push({ name: "Abandoned (Init)" }), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: w,
          label: `${w.toLocaleString()} (${D}%)`
        });
      }
      if (m > 0) {
        const D = Math.round(m / v * 100);
        p.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: m,
          label: `${m.toLocaleString()} (${D}%)`
        });
      }
      if (C > 0) {
        const D = Math.round(C / v * 100);
        g.push({ name: "Abandoned (Started)" }), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${D}%)`
        });
      }
      if (y > 0) {
        const D = Math.round(y / m * 100);
        p.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: y,
          label: `${y.toLocaleString()} (${D}%)`
        });
      }
      if (_ > 0) {
        const D = Math.round(_ / m * 100);
        p.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: _,
          label: `${_.toLocaleString()} (${D}%)`
        });
      }
      if (x > 0) {
        const D = Math.round(x / m * 100);
        g.push({ name: "Checkin Failed" }), p.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: x,
          label: `${x.toLocaleString()} (${D}%)`
        });
      }
      if (S > 0) {
        const D = Math.round(S / m * 100);
        g.push({ name: "Abandoned (Flow)" }), p.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: S,
          label: `${S.toLocaleString()} (${D}%)`
        });
      }
      return { nodes: g, links: p };
    });
    return t({ isDark: a }), (g, p) => (k(), M("article", vm, [
      p[10] || (p[10] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          u("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      n.loading ? (k(), M("div", ym, [...p[0] || (p[0] = [
        J('<div class="loading-container" data-v-5230c23e><div class="chart-flow-loader" data-v-5230c23e><div class="flow-line flow-1" data-v-5230c23e></div><div class="flow-line flow-2" data-v-5230c23e></div><div class="flow-line flow-3" data-v-5230c23e></div><div class="flow-line flow-4" data-v-5230c23e></div><div class="flow-line flow-5" data-v-5230c23e></div></div><p class="loading-text" data-v-5230c23e>Loading record locator data...</p></div>', 1)
      ])])) : (k(), M("div", _m, [
        f.value.nodes.length > 0 ? (k(), M("section", xm, [
          u("div", km, [
            ct(ne, {
              data: f.value,
              height: "500px",
              "node-colors": c.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        r.value && r.value.length > 0 ? (k(), M("section", Mm, [
          u("div", Sm, [
            u("table", wm, [
              u("thead", null, [
                u("tr", Cm, [
                  p[1] || (p[1] = u("th", { class: "table-header" }, "Date", -1)),
                  p[2] || (p[2] = u("th", { class: "table-header" }, "Checkin Init", -1)),
                  p[3] || (p[3] = u("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  p[4] || (p[4] = u("th", { class: "table-header" }, "Checkin Started", -1)),
                  p[5] || (p[5] = u("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  p[6] || (p[6] = u("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  p[7] || (p[7] = u("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  p[8] || (p[8] = u("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  n.isAvianca ? (k(), M("th", Dm, "Create Payment")) : I("", !0),
                  n.isAvianca ? (k(), M("th", $m, "Failed Payment")) : I("", !0)
                ])
              ]),
              u("tbody", Am, [
                (k(!0), M(X, null, ot(r.value, (v) => (k(), M("tr", {
                  key: v.date,
                  class: "table-row"
                }, [
                  u("td", Pm, $(E(qt)(v.date).format("DD/MM/YYYY")), 1),
                  u("td", Fm, $(E(W)(v.checkin_initiated)), 1),
                  u("td", Tm, $(h(v.record_locator_init_count, v.checkin_initiated)), 1),
                  u("td", Bm, $(E(W)(v.record_locator_started_count)), 1),
                  u("td", Lm, $(h(v.record_locator_completed_count, v.record_locator_started_count)), 1),
                  u("td", Em, $(h(v.record_locator_closed_count, v.record_locator_started_count)), 1),
                  u("td", Om, $(h(v.record_locator_failed_count, v.record_locator_started_count)), 1),
                  u("td", Rm, $(h(v.record_locator_abandoned_count, v.record_locator_started_count)), 1),
                  n.isAvianca ? (k(), M("td", Im, $(E(W)(v.record_locator_create_payment_count)), 1)) : I("", !0),
                  n.isAvianca ? (k(), M("td", zm, $(E(W)(v.record_locator_create_payment_failed_count)), 1)) : I("", !0)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", Hm, [...p[9] || (p[9] = [
          J('<div class="empty-state-content" data-v-5230c23e><div class="empty-icon-wrapper" data-v-5230c23e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5230c23e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-5230c23e></path></svg></div><p class="empty-title" data-v-5230c23e>No record locator data available</p><p class="empty-description" data-v-5230c23e>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Wm = /* @__PURE__ */ it(Nm, [["__scopeId", "data-v-5230c23e"]]), Vm = { class: "seller-metrics-card" }, jm = { class: "card-header" }, Ym = { class: "header-content" }, qm = {
  key: 0,
  class: "stats-badge"
}, Um = { class: "badge-value" }, Xm = {
  key: 0,
  class: "loading-state"
}, Km = {
  key: 1,
  class: "card-body"
}, Gm = {
  key: 0,
  class: "chart-section"
}, Qm = { class: "chart-wrapper" }, Zm = {
  key: 1,
  class: "empty-state"
}, Jm = {
  key: 2,
  class: "table-section"
}, tb = { class: "table-wrapper" }, eb = { class: "data-table" }, sb = { class: "table-body" }, nb = { class: "table-cell font-medium" }, ib = { class: "table-cell text-center" }, ob = { class: "table-cell text-center" }, ab = { class: "table-cell text-center" }, rb = { class: "table-cell text-center" }, lb = { class: "table-cell text-center" }, cb = { class: "table-cell text-center success-value" }, db = { class: "table-cell text-left" }, hb = {
  key: 0,
  class: "failed-reasons"
}, ub = { class: "reason-name" }, fb = { class: "reason-count" }, gb = {
  key: 1,
  class: "empty-cell"
}, pb = /* @__PURE__ */ rt({
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
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, o = (m) => {
      i("export", m);
    }, { isDark: a } = ut(ht(n, "theme")), r = L(() => {
      if (!n.sellerData?.seller_by_day) return [];
      const m = [...n.sellerData.seller_by_day];
      return n.failedData?.failed_by_reason_by_day && n.failedData.failed_by_reason_by_day.forEach((y) => {
        const _ = m.findIndex((x) => x.date === y.date);
        _ !== -1 ? m[_] = { ...m[_], reasons: y.reasons } : m.push({
          date: y.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: y.reasons
        });
      }), m.sort((y, _) => new Date(y.date).getTime() - new Date(_.date).getTime());
    }), l = L(() => n.sellerData), c = L(() => n.failedData), d = L(() => {
      const {
        total_seller_conversations: m = 0,
        total_sell_started: y = 0,
        total_sell_booking_created: _ = 0,
        total_sell_success: x = 0
      } = l.value, { failed_by_reason_by_day: S = [] } = c.value;
      if (m === 0) return { nodes: [], links: [] };
      const C = [
        { name: "Sell Initiated", value: m },
        { name: "Sell Started", value: y },
        { name: "Booking Created", value: _ },
        { name: "Sell Success", value: x }
      ], w = [], D = m - y;
      if (D > 0) {
        const T = Math.round(D / m * 100);
        C.push({ name: "Abandoned (Init)", value: D }), w.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: D,
          label: `${D.toLocaleString()} (${T}%)`
        });
      }
      if (y > 0) {
        const T = Math.round(y / m * 100);
        w.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: y,
          label: `${y.toLocaleString()} (${T}%)`
        });
      }
      const P = S.reduce((T, N) => (N.reasons && Array.isArray(N.reasons) && N.reasons.forEach((F) => {
        const O = F.reason, j = F.failed_count;
        T[O] = (T[O] || 0) + j;
      }), T), {});
      if (_ > 0) {
        const T = Math.round(_ / m * 100);
        w.push({
          source: "Sell Started",
          target: "Booking Created",
          value: _,
          label: `${_.toLocaleString()} (${T}%)`
        });
      }
      if (x > 0) {
        const T = Math.round(x / m * 100);
        w.push({
          source: "Booking Created",
          target: "Sell Success",
          value: x,
          label: `${x.toLocaleString()} (${T}%)`
        });
      }
      const A = y - _;
      if (A > 0) {
        const T = Math.round(A / m * 100);
        C.push({ name: "Failed at Booking", value: A }), w.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: A,
          label: `${A.toLocaleString()} (${T}%)`
        });
      }
      if (Object.keys(P).length > 0) {
        const T = Object.values(P).reduce((F, O) => F + O, 0), N = A - T;
        if (Object.entries(P).filter(([, F]) => F > 0).sort(([, F], [, O]) => O - F).forEach(([F, O]) => {
          const j = Math.round(O / m * 100);
          C.push({ name: `Failed: ${F}`, value: O }), w.push({
            source: "Failed at Booking",
            target: `Failed: ${F}`,
            value: O,
            label: `${O.toLocaleString()} (${j}%)`
          });
        }), N > 0) {
          const F = Math.round(N / m * 100);
          C.push({ name: "Failed: Without Reason", value: N }), w.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: N,
            label: `${N.toLocaleString()} (${F}%)`
          });
        }
      }
      const R = _ - x;
      if (R > 0) {
        const T = Math.round(R / m * 100);
        C.push({ name: "Failed at Completion", value: R }), w.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: R,
          label: `${R.toLocaleString()} (${T}%)`
        });
      }
      return { nodes: C, links: w };
    }), h = {
      "Sell Initiated": "#DBEAFE",
      "Abandoned (Init)": "#FEE2E2",
      "Sell Started": "#93C5FD",
      "Get Quote": "#C7D2FE",
      "Booking Created": "#8B8CF6",
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
    }, f = L(() => h), g = (m, y) => !y || y === 0 ? "0%" : `${Math.round(m / y * 100)}%`, p = (m, y) => {
      const _ = W(m), x = g(m, y);
      return `${_} (${x})`;
    }, v = (m) => m == null ? 0 : typeof m == "number" ? m : Array.isArray(m) ? m.reduce((y, _) => y + (_.total_value || 0), 0) : 0, b = (m) => qo(v(m));
    return t({ isDark: a }), (m, y) => (k(), M("article", Vm, [
      u("header", jm, [
        u("div", Ym, [
          y[1] || (y[1] = u("div", { class: "title-section" }, [
            u("h3", { class: "card-title" }, "Seller Metrics"),
            u("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          n.loading ? I("", !0) : (k(), M("div", qm, [
            y[0] || (y[0] = u("p", { class: "badge-label" }, "Total Sales Value", -1)),
            u("p", Um, $(b(n.sellerData.total_value_sell_success)), 1)
          ]))
        ])
      ]),
      n.loading ? (k(), M("div", Xm, [...y[2] || (y[2] = [
        J('<div class="loading-container" data-v-e0a96c80><div class="chart-flow-loader" data-v-e0a96c80><div class="flow-line flow-1" data-v-e0a96c80></div><div class="flow-line flow-2" data-v-e0a96c80></div><div class="flow-line flow-3" data-v-e0a96c80></div><div class="flow-line flow-4" data-v-e0a96c80></div><div class="flow-line flow-5" data-v-e0a96c80></div></div><p class="loading-text" data-v-e0a96c80>Loading sales data...</p></div>', 1)
      ])])) : (k(), M("div", Km, [
        d.value.nodes.length > 0 ? (k(), M("section", Gm, [
          u("div", Qm, [
            ct(ne, {
              data: d.value,
              "node-colors": f.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (k(), M("section", Zm, [...y[3] || (y[3] = [
          J('<div class="empty-state-content" data-v-e0a96c80><div class="empty-icon-wrapper" data-v-e0a96c80><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e0a96c80><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e0a96c80></path></svg></div><p class="empty-title" data-v-e0a96c80>No sales data available</p><p class="empty-description" data-v-e0a96c80>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        r.value && r.value.length > 0 ? (k(), M("section", Jm, [
          u("div", tb, [
            u("table", eb, [
              y[4] || (y[4] = u("thead", null, [
                u("tr", { class: "table-header-row" }, [
                  u("th", { class: "table-header" }, "Date"),
                  u("th", { class: "table-header" }, "Sell Initiated"),
                  u("th", { class: "table-header" }, "Sell Started"),
                  u("th", { class: "table-header" }, "Get Quote"),
                  u("th", { class: "table-header" }, "Booking Created"),
                  u("th", { class: "table-header" }, "Sell Success"),
                  u("th", { class: "table-header" }, "Total Sales Value"),
                  u("th", { class: "table-header" }, "Failed")
                ])
              ], -1)),
              u("tbody", sb, [
                (k(!0), M(X, null, ot(r.value, (_) => (k(), M("tr", {
                  key: _.date,
                  class: "table-row"
                }, [
                  u("td", nb, $(E(qt)(_.date).format("DD/MM/YYYY")), 1),
                  u("td", ib, $(E(W)(_.seller_conversations || 0)), 1),
                  u("td", ob, $(p(_.sell_started_count, _.seller_conversations || _.sell_started_count)), 1),
                  u("td", ab, $(p(_.sell_get_quote_count, _.seller_conversations || _.sell_started_count)), 1),
                  u("td", rb, $(p(_.sell_booking_created_count, _.seller_conversations || _.sell_started_count)), 1),
                  u("td", lb, $(p(_.sell_success_count, _.seller_conversations || _.sell_started_count)), 1),
                  u("td", cb, $(b(_.daily_value_sell_success)), 1),
                  u("td", db, [
                    _.reasons && _.reasons.length > 0 ? (k(), M("div", hb, [
                      (k(!0), M(X, null, ot(_.reasons, (x) => (k(), M("div", {
                        key: x.reason,
                        class: "failed-reason-item"
                      }, [
                        u("span", ub, $(x.reason) + ":", 1),
                        u("span", fb, $(x.failed_count), 1)
                      ]))), 128))
                    ])) : (k(), M("div", gb, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : I("", !0)
      ]))
    ]));
  }
}), mb = /* @__PURE__ */ it(pb, [["__scopeId", "data-v-e0a96c80"]]), bb = { class: "top-agents-card" }, vb = {
  key: 0,
  class: "card-body"
}, yb = {
  key: 0,
  class: "chart-section"
}, _b = {
  key: 1,
  class: "empty-state"
}, xb = { class: "empty-state-content" }, kb = { class: "empty-icon-wrapper" }, Mb = {
  key: 1,
  class: "loading-state"
}, Sb = /* @__PURE__ */ rt({
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
  setup(e, { expose: t, emit: s }) {
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
    }, i = e, o = s, a = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = ut(ht(i, "theme")), c = L(() => {
      const f = (i.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.reduce(
        (b, m) => b + (Number(m.conversations) || 0),
        0
      ), p = f.map((b) => {
        const m = b.agent_type?.toLowerCase();
        return n[m] || "#94a3b8";
      }), v = p.map((b) => `${b}80`);
      return {
        labels: f.map((b) => {
          const m = Number(b.conversations) || 0, y = g ? m / g * 100 : 0;
          return `${b.agent_type} - ${m.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((b) => b.conversations),
            backgroundColor: v,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), d = L(() => i.options ? i.options : {
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
            label: (h) => {
              const f = (h.label || "").toString().split(" - ")[0], g = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce(
                (b, m) => b + (Number(m) || 0),
                0
              ), v = p ? g / p * 100 : 0;
              return `${f}: ${g.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (k(), M("article", bb, [
      f[3] || (f[3] = u("header", { class: "card-header" }, [
        u("div", { class: "header-content" }, [
          u("h3", { class: "card-title" }, "Top Agents"),
          u("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (k(), M("div", Mb, [...f[2] || (f[2] = [
        J('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (k(), M("div", vb, [
        c.value.labels && c.value.labels.length ? (k(), M("section", yb, [
          ct(Vo, {
            data: c.value,
            options: d.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (k(), M("section", _b, [
          u("div", xb, [
            u("div", kb, [
              ct(E(If), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), wb = /* @__PURE__ */ it(Sb, [["__scopeId", "data-v-501bf4c4"]]), Cb = { class: "payment-method-card" }, Db = { class: "card-header" }, $b = { class: "header-content" }, Ab = {
  key: 0,
  class: "stats-badge"
}, Pb = { class: "badge-value" }, Fb = {
  key: 0,
  class: "loading-state"
}, Tb = {
  key: 1,
  class: "card-body"
}, Bb = {
  key: 0,
  class: "payment-methods-section"
}, Lb = { class: "payment-methods-grid" }, Eb = { class: "payment-card-content" }, Ob = { class: "payment-card-header" }, Rb = { class: "payment-badge-wrapper" }, Ib = {
  key: 1,
  class: "empty-state"
}, zb = { class: "empty-state-content" }, Hb = { class: "empty-icon-wrapper" }, Nb = {
  key: 2,
  class: "table-section"
}, Wb = { class: "table-wrapper" }, Vb = { class: "data-table" }, jb = { class: "table-body" }, Yb = { class: "table-cell font-medium" }, qb = { class: "table-cell text-center" }, Ub = { class: "table-cell text-center success-value" }, Xb = { class: "table-cell" }, Kb = { class: "payment-tags" }, Gb = { class: "tag-name" }, Qb = { class: "tag-amount" }, Zb = { class: "tag-count" }, Jb = {
  key: 3,
  class: "empty-table-state"
}, tv = /* @__PURE__ */ rt({
  __name: "PaymentMethod",
  props: {
    data: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, { isDark: o } = ut(ht(n, "theme")), a = L(() => n.data?.payment_method_breakdown && n.data.payment_method_breakdown.length > 0), r = L(() => n.data?.payment_method_by_day && n.data.payment_method_by_day.length > 0), l = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], c = (_) => {
      const x = l[_ % l.length];
      return {
        background: x.bg,
        borderColor: x.border
      };
    }, d = (_) => ({ color: l[_ % l.length].text }), h = (_) => ({ color: l[_ % l.length].value }), f = (_) => ({ color: l[_ % l.length].icon }), g = (_) => ({ color: l[_ % l.length].badge }), p = (_) => {
      const x = _?.toLowerCase() || "";
      return x.includes("credit") || x.includes("debit") ? Oi : x.includes("cash") || x.includes("efectivo") ? Of : x.includes("bank") || x.includes("transfer") ? Rf : x.includes("zelle") || x.includes("pago") || x.includes("movil") ? Hf : x.includes("wallet") ? Nf : zf;
    }, v = (_) => _ ? _.replace(/_/g, " ") : "Unknown", b = (_) => _ == null ? "$0.00" : qo(_), m = (_) => _ ? qt(_).format("DD/MM/YYYY") : "-", y = (_) => {
      i("export", _);
    };
    return t({ isDark: o }), (_, x) => (k(), M("article", Cb, [
      u("header", Db, [
        u("div", $b, [
          x[1] || (x[1] = u("div", { class: "title-section" }, [
            u("h3", { class: "card-title" }, "Payment Method Metrics"),
            u("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !e.loading && e.data?.total_amount ? (k(), M("div", Ab, [
            x[0] || (x[0] = u("p", { class: "badge-label" }, "Total Amount", -1)),
            u("p", Pb, $(b(e.data.total_amount)), 1)
          ])) : I("", !0)
        ])
      ]),
      e.loading ? (k(), M("div", Fb, [...x[2] || (x[2] = [
        J('<div class="loading-container" data-v-e673c051><div class="chart-lines-loader" data-v-e673c051><div class="line line-1" data-v-e673c051></div><div class="line line-2" data-v-e673c051></div><div class="line line-3" data-v-e673c051></div><div class="line line-4" data-v-e673c051></div><div class="line line-5" data-v-e673c051></div></div><p class="loading-text" data-v-e673c051>Loading payment data...</p></div>', 1)
      ])])) : (k(), M("div", Tb, [
        a.value ? (k(), M("section", Bb, [
          x[3] || (x[3] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          u("div", Lb, [
            (k(!0), M(X, null, ot(e.data.payment_method_breakdown, (S, C) => (k(), M("div", {
              key: S.payment_method,
              class: "payment-method-card-item",
              style: Ct(c(C))
            }, [
              u("div", Eb, [
                u("div", Ob, [
                  (k(), ft(Zo(p(S.payment_method)), {
                    class: "payment-icon",
                    style: Ct(f(C))
                  }, null, 8, ["style"])),
                  u("span", {
                    class: "payment-name",
                    style: Ct(d(C))
                  }, $(v(S.payment_method)), 5)
                ]),
                u("p", {
                  class: "payment-amount",
                  style: Ct(h(C))
                }, $(b(S.total_amount)), 5),
                u("div", Rb, [
                  u("span", {
                    class: "payment-badge",
                    style: Ct(g(C))
                  }, $(S.count) + " " + $(S.count === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (k(), M("section", Ib, [
          u("div", zb, [
            u("div", Hb, [
              ct(E(Oi), { class: "empty-icon" })
            ]),
            x[4] || (x[4] = u("p", { class: "empty-title" }, "No payment data available", -1)),
            x[5] || (x[5] = u("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        r.value ? (k(), M("section", Nb, [
          x[8] || (x[8] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
          u("div", Wb, [
            u("table", Vb, [
              x[7] || (x[7] = u("thead", null, [
                u("tr", { class: "table-header-row" }, [
                  u("th", { class: "table-header text-left" }, "Date"),
                  u("th", { class: "table-header text-center" }, "Total Sales"),
                  u("th", { class: "table-header text-center" }, "Total Amount"),
                  u("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              u("tbody", jb, [
                (k(!0), M(X, null, ot(e.data.payment_method_by_day, (S) => (k(), M("tr", {
                  key: S.date,
                  class: "table-row"
                }, [
                  u("td", Yb, $(m(S.date)), 1),
                  u("td", qb, $(E(W)(S.total_count)), 1),
                  u("td", Ub, $(b(S.total_amount)), 1),
                  u("td", Xb, [
                    u("div", Kb, [
                      (k(!0), M(X, null, ot(S.payment_methods, (C) => (k(), M("div", {
                        key: C.payment_method,
                        class: "payment-tag"
                      }, [
                        u("span", Gb, $(v(C.payment_method)), 1),
                        x[6] || (x[6] = u("span", { class: "tag-separator" }, "•", -1)),
                        u("span", Qb, $(b(C.total_amount)), 1),
                        u("span", Zb, "(" + $(C.count) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (k(), ft(E(xt), {
            key: 0,
            onExport: y,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : a.value ? (k(), M("div", Jb, [...x[9] || (x[9] = [
          u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : I("", !0)
      ]))
    ]));
  }
}), ev = /* @__PURE__ */ it(tv, [["__scopeId", "data-v-e673c051"]]), sv = { class: "nps-daily-card" }, nv = { class: "card-header" }, iv = { class: "header-content" }, ov = {
  key: 0,
  class: "stats-badge"
}, av = { class: "badge-value" }, rv = {
  key: 0,
  class: "loading-state"
}, lv = {
  key: 1,
  class: "card-body"
}, cv = { class: "tooltip-content" }, dv = { class: "tooltip-title" }, hv = { class: "tooltip-stats" }, uv = { class: "tooltip-stat-row" }, fv = { class: "tooltip-value" }, gv = { class: "tooltip-stat-row" }, pv = { class: "tooltip-value" }, mv = { class: "tooltip-stat-row" }, bv = { class: "tooltip-value" }, vv = { class: "tooltip-stat-row" }, yv = { class: "tooltip-value" }, _v = { class: "tooltip-stat-row" }, xv = { class: "tooltip-value" }, kv = { class: "tooltip-stat-row" }, Mv = { class: "tooltip-value" }, Sv = {
  key: 2,
  class: "empty-state"
}, Ri = 400, xe = 60, Ii = 90, zi = 120, wv = {
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
  setup(e, { expose: t, emit: s }) {
    const n = s, i = (b) => {
      n("export", b);
    }, o = e, { isDark: a } = ut(ht(o, "theme")), r = L(() => o.data), l = $t(null), c = $t({
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
    }), d = L(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const b = r.value.nps_by_day.length;
      return Math.max(800, xe * 2 + b * zi);
    }), h = (b, m) => {
      const _ = (b - 1) / 9;
      return xe + m - _ * m;
    }, f = (b) => b ? qt(b).format("DD-MM-YYYY") : "", g = L(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const b = [], m = Ri - xe - Ii;
      return r.value.nps_by_day.forEach((y, _) => {
        const x = y.min_score || 0, S = y.q1_score || 0, C = y.median_score || 0, w = y.q3_score || 0, D = y.max_score || 0, P = y.average_score || 0;
        b.push({
          label: f(y.date),
          responseCount: y.nps_responses_count || 0,
          isTotal: !1,
          open: S,
          // Q1 as open
          high: D,
          // Max as high
          low: x,
          // Min as low
          close: w,
          // Q3 as close
          median: C,
          average: P,
          openY: h(S, m),
          highY: h(D, m),
          lowY: h(x, m),
          closeY: h(w, m),
          medianY: h(C, m),
          averageY: P > 0 ? h(P, m) : null,
          centerX: xe + (_ + 1) * zi
        });
      }), b;
    }), p = (b, m) => {
      if (!l.value || !m || m.horizontal) return;
      const y = l.value.getBoundingClientRect(), _ = b.clientX, x = b.clientY, S = 140, C = 160, w = 10, D = 15;
      let P = _ - y.left - S / 2, A = x - y.top - C - D;
      P = Math.max(w, Math.min(P, y.width - S - w)), A < w && (A = x - y.top + D), A = Math.max(w, Math.min(A, y.height - C - w)), c.value = {
        visible: !0,
        x: P,
        y: A,
        date: m.label || "",
        min: m.low !== void 0 ? m.low.toFixed(1) : "N/A",
        max: m.high !== void 0 ? m.high.toFixed(1) : "N/A",
        q1: m.open !== void 0 ? m.open.toFixed(1) : "N/A",
        avg: m.average !== void 0 && m.average > 0 ? m.average.toFixed(1) : "N/A",
        q3: m.close !== void 0 ? m.close.toFixed(1) : "N/A",
        median: m.median !== void 0 ? m.median.toFixed(1) : "N/A"
      };
    }, v = () => {
      c.value.visible = !1;
    };
    return t({ isDark: a }), (b, m) => (k(), M("article", sv, [
      u("header", nv, [
        u("div", iv, [
          m[1] || (m[1] = u("div", { class: "title-section" }, [
            u("h3", { class: "card-title" }, "NPS Daily Metrics"),
            u("p", { class: "card-subtitle" }, "Daily NPS Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (k(), M("div", ov, [
            m[0] || (m[0] = u("p", { class: "badge-label" }, "Days", -1)),
            u("p", av, $(r.value.nps_by_day.length), 1)
          ])) : I("", !0)
        ])
      ]),
      o.loading ? (k(), M("div", rv, [...m[2] || (m[2] = [
        J('<div class="loading-container" data-v-6354e62a><div class="chart-flow-loader" data-v-6354e62a><div class="flow-line flow-1" data-v-6354e62a></div><div class="flow-line flow-2" data-v-6354e62a></div><div class="flow-line flow-3" data-v-6354e62a></div><div class="flow-line flow-4" data-v-6354e62a></div><div class="flow-line flow-5" data-v-6354e62a></div></div><p class="loading-text" data-v-6354e62a>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (k(), M("div", lv, [
        u("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          g.value && g.value.length > 0 ? (k(), ft(jo, {
            key: 0,
            "candlestick-data": g.value,
            "chart-width": d.value,
            "chart-height": Ri,
            "chart-margin": xe,
            "chart-bottom-margin": Ii,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: p,
            onCandleLeave: v
          }, null, 8, ["candlestick-data", "chart-width"])) : I("", !0),
          c.value.visible ? (k(), M("div", {
            key: 1,
            class: "tooltip-overlay",
            style: Ct({
              left: `${c.value.x}px`,
              top: `${c.value.y}px`
            })
          }, [
            u("div", cv, [
              u("div", dv, $(c.value.date), 1),
              m[9] || (m[9] = u("div", { class: "tooltip-divider" }, null, -1)),
              u("div", hv, [
                u("div", uv, [
                  m[3] || (m[3] = u("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  u("span", fv, $(c.value.min), 1)
                ]),
                u("div", gv, [
                  m[4] || (m[4] = u("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  u("span", pv, $(c.value.q1), 1)
                ]),
                u("div", mv, [
                  m[5] || (m[5] = u("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  u("span", bv, $(c.value.median), 1)
                ]),
                u("div", vv, [
                  m[6] || (m[6] = u("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  u("span", yv, $(c.value.avg), 1)
                ]),
                u("div", _v, [
                  m[7] || (m[7] = u("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  u("span", xv, $(c.value.q3), 1)
                ]),
                u("div", kv, [
                  m[8] || (m[8] = u("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  u("span", Mv, $(c.value.max), 1)
                ])
              ])
            ])
          ], 4)) : I("", !0)
        ], 512),
        e.enableExport ? (k(), ft(E(xt), {
          key: 0,
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (k(), M("div", Sv, [...m[10] || (m[10] = [
        J('<div class="empty-state-content" data-v-6354e62a><div class="empty-icon-wrapper" data-v-6354e62a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6354e62a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-6354e62a></path></svg></div><p class="empty-title" data-v-6354e62a>No daily NPS data available</p><p class="empty-description" data-v-6354e62a>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Uo = /* @__PURE__ */ it(wv, [["__scopeId", "data-v-6354e62a"]]), Cv = { class: "nps-overview-card" }, Dv = { class: "card-header" }, $v = { class: "header-content" }, Av = {
  key: 0,
  class: "stats-badge"
}, Pv = { class: "badge-value" }, Fv = {
  key: 0,
  class: "loading-state"
}, Tv = {
  key: 1,
  class: "card-body"
}, Bv = { class: "chart-wrapper" }, Lv = {
  key: 2,
  class: "empty-state"
}, Ev = 500, Ov = 60, Rv = 80, Iv = {
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
  setup(e, { expose: t, emit: s }) {
    const n = s, i = (c) => {
      n("export", c);
    }, o = e, { isDark: a } = ut(ht(o, "theme")), r = L(() => o.data), l = L(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: a }), (c, d) => (k(), M("article", Cv, [
      u("header", Dv, [
        u("div", $v, [
          d[1] || (d[1] = u("div", { class: "title-section" }, [
            u("h3", { class: "card-title" }, "NPS Overview Metrics"),
            u("p", { class: "card-subtitle" }, "Overall NPS Distribution")
          ], -1)),
          r.value && r.value.total_nps_responses > 0 ? (k(), M("div", Av, [
            d[0] || (d[0] = u("p", { class: "badge-label" }, "Responses", -1)),
            u("p", Pv, $(r.value.total_nps_responses), 1)
          ])) : I("", !0)
        ])
      ]),
      o.loading ? (k(), M("div", Fv, [...d[2] || (d[2] = [
        J('<div class="loading-container" data-v-cf57fba8><div class="chart-flow-loader" data-v-cf57fba8><div class="flow-line flow-1" data-v-cf57fba8></div><div class="flow-line flow-2" data-v-cf57fba8></div><div class="flow-line flow-3" data-v-cf57fba8></div><div class="flow-line flow-4" data-v-cf57fba8></div><div class="flow-line flow-5" data-v-cf57fba8></div></div><p class="loading-text" data-v-cf57fba8>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (k(), M("div", Tv, [
        u("div", Bv, [
          ct(Yo, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": Ev,
            "chart-margin": Ov,
            "chart-bottom-margin": Rv
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (k(), ft(E(xt), {
          key: 0,
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (k(), M("div", Lv, [...d[3] || (d[3] = [
        J('<div class="empty-state-content" data-v-cf57fba8><div class="empty-icon-wrapper" data-v-cf57fba8><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-cf57fba8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-cf57fba8></path></svg></div><p class="empty-title" data-v-cf57fba8>No NPS data available</p><p class="empty-description" data-v-cf57fba8>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Xo = /* @__PURE__ */ it(Iv, [["__scopeId", "data-v-cf57fba8"]]), zv = { class: "nps-metrics-container" }, Hv = {
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
    const s = t, n = (i) => {
      s("export", i);
    };
    return (i, o) => (k(), M("div", zv, [
      ct(Xo, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"]),
      ct(Uo, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Nv = /* @__PURE__ */ it(Hv, [["__scopeId", "data-v-25fe3b80"]]), Kv = {
  install(e) {
    e.component("KiutChartBar", Wo), e.component("KiutChartLine", ln), e.component("KiutPieChart", Vo), e.component("KiutBoxplotChart", Jh), e.component("KiutCandlestickChart", jo), e.component("KiutHistogramChart", Yo), e.component("KiutSankeyChart", ne), e.component("KiutAgentsPerDay", ag), e.component("KiutBookingManager", Hg), e.component("KiutCheckin", dp), e.component("KiutCheckinMetrics", Ep), e.component("KiutCheckinSegments", l0), e.component("KiutDisruption", j0), e.component("KiutFAQ", lm), e.component("KiutMessagesPerAgent", bm), e.component("KiutRecordLocator", Wm), e.component("KiutSeller", mb), e.component("KiutTopAgents", wb), e.component("KiutPaymentMethod", ev), e.component("KiutNpsDailyMetrics", Uo), e.component("KiutNpsMetrics", Nv), e.component("KiutNpsOverviewMetrics", Xo);
  }
};
export {
  ag as AgentsPerDay,
  Hg as BookingManager,
  Jh as BoxplotChart,
  jo as CandlestickChart,
  Wo as ChartBar,
  ln as ChartLine,
  dp as Checkin,
  Ep as CheckinMetrics,
  l0 as CheckinSegments,
  j0 as Disruption,
  lm as FAQ,
  Yo as HistogramChart,
  Kv as KiutUIPlugin,
  bm as MessagesPerAgent,
  Uo as NpsDailyMetrics,
  Nv as NpsMetrics,
  Xo as NpsOverviewMetrics,
  ev as PaymentMethod,
  Vo as PieChart,
  Wm as RecordLocator,
  ne as SankeyChart,
  mb as Seller,
  wb as TopAgents
};
//# sourceMappingURL=kiut-ui.es.js.map
