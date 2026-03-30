import { defineComponent as et, shallowRef as Zn, h as qs, ref as ft, onMounted as gs, onUnmounted as Qn, watch as Xt, toRaw as Us, nextTick as Jn, version as ni, isProxy as to, computed as D, toRef as at, openBlock as y, createElementBlock as x, createVNode as K, unref as F, normalizeStyle as _t, createElementVNode as c, toDisplayString as S, createCommentVNode as W, Fragment as U, renderList as Q, onBeforeUnmount as oi, createStaticVNode as q, withDirectives as ka, vShow as wa, normalizeClass as At, createBlock as ut, createTextVNode as Mt, resolveDynamicComponent as ii } from "vue";
import * as Ma from "echarts/core";
import { TooltipComponent as ri, TitleComponent as li } from "echarts/components";
import { SankeyChart as ci } from "echarts/charts";
import { CanvasRenderer as di } from "echarts/renderers";
import $t from "moment";
function Ye(e) {
  return e + 0.5 | 0;
}
const Zt = (e, t, s) => Math.max(Math.min(e, s), t);
function Te(e) {
  return Zt(Ye(e * 2.55), 0, 255);
}
function te(e) {
  return Zt(Ye(e * 255), 0, 255);
}
function Yt(e) {
  return Zt(Ye(e / 2.55) / 100, 0, 1);
}
function Sa(e) {
  return Zt(Ye(e * 100), 0, 100);
}
const Pt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Xs = [..."0123456789ABCDEF"], ui = (e) => Xs[e & 15], hi = (e) => Xs[(e & 240) >> 4] + Xs[e & 15], qe = (e) => (e & 240) >> 4 === (e & 15), fi = (e) => qe(e.r) && qe(e.g) && qe(e.b) && qe(e.a);
function gi(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & Pt[e[1]] * 17,
    g: 255 & Pt[e[2]] * 17,
    b: 255 & Pt[e[3]] * 17,
    a: t === 5 ? Pt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: Pt[e[1]] << 4 | Pt[e[2]],
    g: Pt[e[3]] << 4 | Pt[e[4]],
    b: Pt[e[5]] << 4 | Pt[e[6]],
    a: t === 9 ? Pt[e[7]] << 4 | Pt[e[8]] : 255
  })), s;
}
const pi = (e, t) => e < 255 ? t(e) : "";
function vi(e) {
  var t = fi(e) ? ui : hi;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + pi(e.a, t) : void 0;
}
const bi = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function eo(e, t, s) {
  const a = t * Math.min(s, 1 - s), n = (o, i = (o + e / 30) % 12) => s - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function mi(e, t, s) {
  const a = (n, o = (n + e / 60) % 6) => s - s * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function _i(e, t, s) {
  const a = eo(e, 1, 0.5);
  let n;
  for (t + s > 1 && (n = 1 / (t + s), t *= n, s *= n), n = 0; n < 3; n++)
    a[n] *= 1 - t - s, a[n] += t;
  return a;
}
function yi(e, t, s, a, n) {
  return e === n ? (t - s) / a + (t < s ? 6 : 0) : t === n ? (s - e) / a + 2 : (e - t) / a + 4;
}
function sa(e) {
  const s = e.r / 255, a = e.g / 255, n = e.b / 255, o = Math.max(s, a, n), i = Math.min(s, a, n), r = (o + i) / 2;
  let l, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), l = yi(s, a, n, u, o), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function aa(e, t, s, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, a)).map(te);
}
function na(e, t, s) {
  return aa(eo, e, t, s);
}
function xi(e, t, s) {
  return aa(_i, e, t, s);
}
function ki(e, t, s) {
  return aa(mi, e, t, s);
}
function so(e) {
  return (e % 360 + 360) % 360;
}
function wi(e) {
  const t = bi.exec(e);
  let s = 255, a;
  if (!t)
    return;
  t[5] !== a && (s = t[6] ? Te(+t[5]) : te(+t[5]));
  const n = so(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = xi(n, o, i) : t[1] === "hsv" ? a = ki(n, o, i) : a = na(n, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: s
  };
}
function Mi(e, t) {
  var s = sa(e);
  s[0] = so(s[0] + t), s = na(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function Si(e) {
  if (!e)
    return;
  const t = sa(e), s = t[0], a = Sa(t[1]), n = Sa(t[2]);
  return e.a < 255 ? `hsla(${s}, ${a}%, ${n}%, ${Yt(e.a)})` : `hsl(${s}, ${a}%, ${n}%)`;
}
const $a = {
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
}, Ca = {
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
function $i() {
  const e = {}, t = Object.keys(Ca), s = Object.keys($a);
  let a, n, o, i, r;
  for (a = 0; a < t.length; a++) {
    for (i = r = t[a], n = 0; n < s.length; n++)
      o = s[n], r = r.replace(o, $a[o]);
    o = parseInt(Ca[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Ue;
function Ci(e) {
  Ue || (Ue = $i(), Ue.transparent = [0, 0, 0, 0]);
  const t = Ue[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Di = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ai(e) {
  const t = Di.exec(e);
  let s = 255, a, n, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      s = t[8] ? Te(i) : Zt(i * 255, 0, 255);
    }
    return a = +t[1], n = +t[3], o = +t[5], a = 255 & (t[2] ? Te(a) : Zt(a, 0, 255)), n = 255 & (t[4] ? Te(n) : Zt(n, 0, 255)), o = 255 & (t[6] ? Te(o) : Zt(o, 0, 255)), {
      r: a,
      g: n,
      b: o,
      a: s
    };
  }
}
function Ti(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Yt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ms = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, pe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Bi(e, t, s) {
  const a = pe(Yt(e.r)), n = pe(Yt(e.g)), o = pe(Yt(e.b));
  return {
    r: te(Ms(a + s * (pe(Yt(t.r)) - a))),
    g: te(Ms(n + s * (pe(Yt(t.g)) - n))),
    b: te(Ms(o + s * (pe(Yt(t.b)) - o))),
    a: e.a + s * (t.a - e.a)
  };
}
function Xe(e, t, s) {
  if (e) {
    let a = sa(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * s, t === 0 ? 360 : 1)), a = na(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function ao(e, t) {
  return e && Object.assign(t || {}, e);
}
function Da(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = te(e[3]))) : (t = ao(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = te(t.a)), t;
}
function Fi(e) {
  return e.charAt(0) === "r" ? Ai(e) : wi(e);
}
class Oe {
  constructor(t) {
    if (t instanceof Oe)
      return t;
    const s = typeof t;
    let a;
    s === "object" ? a = Da(t) : s === "string" && (a = gi(t) || Ci(t) || Fi(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ao(this._rgb);
    return t && (t.a = Yt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Da(t);
  }
  rgbString() {
    return this._valid ? Ti(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? vi(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Si(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const a = this.rgb, n = t.rgb;
      let o;
      const i = s === o ? 0.5 : s, r = 2 * i - 1, l = a.a - n.a, d = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      o = 1 - d, a.r = 255 & d * a.r + o * n.r + 0.5, a.g = 255 & d * a.g + o * n.g + 0.5, a.b = 255 & d * a.b + o * n.b + 0.5, a.a = i * a.a + (1 - i) * n.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = Bi(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Oe(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = te(t), this;
  }
  clearer(t) {
    const s = this._rgb;
    return s.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, s = Ye(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Xe(this._rgb, 2, t), this;
  }
  darken(t) {
    return Xe(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Xe(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Xe(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Mi(this._rgb, t), this;
  }
}
function Ht() {
}
const Pi = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function it(e) {
  return e == null;
}
function bt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function st(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function St(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Ot(e, t) {
  return St(e) ? e : t;
}
function Z(e, t) {
  return typeof e > "u" ? t : e;
}
const Li = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, no = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function ht(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function lt(e, t, s, a) {
  let n, o, i;
  if (bt(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(s, e[n], n);
  else if (st(e))
    for (i = Object.keys(e), o = i.length, n = 0; n < o; n++)
      t.call(s, e[i[n]], i[n]);
}
function rs(e, t) {
  let s, a, n, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, a = e.length; s < a; ++s)
    if (n = e[s], o = t[s], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function ls(e) {
  if (bt(e))
    return e.map(ls);
  if (st(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), a = s.length;
    let n = 0;
    for (; n < a; ++n)
      t[s[n]] = ls(e[s[n]]);
    return t;
  }
  return e;
}
function oo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Ei(e, t, s, a) {
  if (!oo(e))
    return;
  const n = t[e], o = s[e];
  st(n) && st(o) ? Ie(n, o, a) : t[e] = ls(o);
}
function Ie(e, t, s) {
  const a = bt(t) ? t : [
    t
  ], n = a.length;
  if (!st(e))
    return e;
  s = s || {};
  const o = s.merger || Ei;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = a[r], !st(i))
      continue;
    const l = Object.keys(i);
    for (let d = 0, u = l.length; d < u; ++d)
      o(l[d], e, i, s);
  }
  return e;
}
function Pe(e, t) {
  return Ie(e, t, {
    merger: Ri
  });
}
function Ri(e, t, s) {
  if (!oo(e))
    return;
  const a = t[e], n = s[e];
  st(a) && st(n) ? Pe(a, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ls(n));
}
const Aa = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Oi(e) {
  const t = e.split("."), s = [];
  let a = "";
  for (const n of t)
    a += n, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (s.push(a), a = "");
  return s;
}
function Ii(e) {
  const t = Oi(e);
  return (s) => {
    for (const a of t) {
      if (a === "")
        break;
      s = s && s[a];
    }
    return s;
  };
}
function ue(e, t) {
  return (Aa[t] || (Aa[t] = Ii(t)))(e);
}
function oa(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ze = (e) => typeof e < "u", ee = (e) => typeof e == "function", Ta = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function zi(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const ct = Math.PI, gt = 2 * ct, Ni = gt + ct, cs = Number.POSITIVE_INFINITY, Wi = ct / 180, yt = ct / 2, ne = ct / 4, Ba = ct * 2 / 3, io = Math.log10, Nt = Math.sign;
function Le(e, t, s) {
  return Math.abs(e - t) < s;
}
function Fa(e) {
  const t = Math.round(e);
  e = Le(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(io(e))), a = e / s;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * s;
}
function Hi(e) {
  const t = [], s = Math.sqrt(e);
  let a;
  for (a = 1; a < s; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return s === (s | 0) && t.push(s), t.sort((n, o) => n - o).pop(), t;
}
function Vi(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ne(e) {
  return !Vi(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function ji(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Yi(e, t, s) {
  let a, n, o;
  for (a = 0, n = e.length; a < n; a++)
    o = e[a][s], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function qt(e) {
  return e * (ct / 180);
}
function qi(e) {
  return e * (180 / ct);
}
function Pa(e) {
  if (!St(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function ro(e, t) {
  const s = t.x - e.x, a = t.y - e.y, n = Math.sqrt(s * s + a * a);
  let o = Math.atan2(a, s);
  return o < -0.5 * ct && (o += gt), {
    angle: o,
    distance: n
  };
}
function Ks(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Ui(e, t) {
  return (e - t + Ni) % gt - ct;
}
function Ft(e) {
  return (e % gt + gt) % gt;
}
function We(e, t, s, a) {
  const n = Ft(e), o = Ft(t), i = Ft(s), r = Ft(o - n), l = Ft(i - n), d = Ft(n - o), u = Ft(n - i);
  return n === o || n === i || a && o === i || r > l && d < u;
}
function kt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Xi(e) {
  return kt(e, -32768, 32767);
}
function Ut(e, t, s, a = 1e-6) {
  return e >= Math.min(t, s) - a && e <= Math.max(t, s) + a;
}
function ia(e, t, s) {
  s = s || ((i) => e[i] < t);
  let a = e.length - 1, n = 0, o;
  for (; a - n > 1; )
    o = n + a >> 1, s(o) ? n = o : a = o;
  return {
    lo: n,
    hi: a
  };
}
const ce = (e, t, s, a) => ia(e, s, a ? (n) => {
  const o = e[n][t];
  return o < s || o === s && e[n + 1][t] === s;
} : (n) => e[n][t] < s), Ki = (e, t, s) => ia(e, s, (a) => e[a][t] >= s);
function Gi(e, t, s) {
  let a = 0, n = e.length;
  for (; a < n && e[a] < t; )
    a++;
  for (; n > a && e[n - 1] > s; )
    n--;
  return a > 0 || n < e.length ? e.slice(a, n) : e;
}
const lo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Zi(e, t) {
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
  }), lo.forEach((s) => {
    const a = "_onData" + oa(s), n = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = n.apply(this, o);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[a] == "function" && r[a](...o);
        }), i;
      }
    });
  });
}
function La(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const a = s.listeners, n = a.indexOf(t);
  n !== -1 && a.splice(n, 1), !(a.length > 0) && (lo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function co(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const uo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ho(e, t) {
  let s = [], a = !1;
  return function(...n) {
    s = n, a || (a = !0, uo.call(window, () => {
      a = !1, e.apply(t, s);
    }));
  };
}
function Qi(e, t) {
  let s;
  return function(...a) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const ra = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", xt = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, Ji = (e, t, s, a) => e === (a ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function tr(e, t, s) {
  const a = t.length;
  let n = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: f, minDefined: g, maxDefined: p } = i.getUserBounds();
    if (g) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        ce(l, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? a : ce(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const _ = l.slice(0, n + 1).reverse().findIndex((b) => !it(b[r.axis]));
        n -= Math.max(0, _);
      }
      n = kt(n, 0, a - 1);
    }
    if (p) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        ce(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : ce(t, u, i.getPixelForValue(f), !0).hi + 1
      );
      if (d) {
        const b = l.slice(_ - 1).findIndex((v) => !it(v[r.axis]));
        _ += Math.max(0, b);
      }
      o = kt(_, n, a) - n;
    } else
      o = a - n;
  }
  return {
    start: n,
    count: o
  };
}
function er(e) {
  const { xScale: t, yScale: s, _scaleRanges: a } = e, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!a)
    return e._scaleRanges = n, !0;
  const o = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== s.min || a.ymax !== s.max;
  return Object.assign(a, n), o;
}
const Ke = (e) => e === 0 || e === 1, Ea = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * gt / s)), Ra = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * gt / s) + 1, Ee = {
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
  easeInSine: (e) => -Math.cos(e * yt) + 1,
  easeOutSine: (e) => Math.sin(e * yt),
  easeInOutSine: (e) => -0.5 * (Math.cos(ct * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Ke(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Ke(e) ? e : Ea(e, 0.075, 0.3),
  easeOutElastic: (e) => Ke(e) ? e : Ra(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ke(e) ? e : e < 0.5 ? 0.5 * Ea(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Ra(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ee.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ee.easeInBounce(e * 2) * 0.5 : Ee.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function la(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Oa(e) {
  return la(e) ? e : new Oe(e);
}
function Ss(e) {
  return la(e) ? e : new Oe(e).saturate(0.5).darken(0.1).hexString();
}
const sr = [
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
function nr(e) {
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
      properties: sr
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
const Ia = /* @__PURE__ */ new Map();
function ir(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let a = Ia.get(s);
  return a || (a = new Intl.NumberFormat(e, t), Ia.set(s, a)), a;
}
function ca(e, t, s) {
  return ir(t, s).format(e);
}
const rr = {
  values(e) {
    return bt(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let n, o = e;
    if (s.length > 1) {
      const d = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = lr(e, s);
    }
    const i = io(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), ca(e, a, l);
  }
};
function lr(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var fo = {
  formatters: rr
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
      callback: fo.formatters.values,
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
const he = /* @__PURE__ */ Object.create(null), Gs = /* @__PURE__ */ Object.create(null);
function Re(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let a = 0, n = s.length; a < n; ++a) {
    const o = s[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function $s(e, t, s) {
  return typeof t == "string" ? Ie(Re(e, t), s) : Ie(Re(e, ""), t);
}
class dr {
  constructor(t, s) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, n) => Ss(n.backgroundColor), this.hoverBorderColor = (a, n) => Ss(n.borderColor), this.hoverColor = (a, n) => Ss(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return $s(this, t, s);
  }
  get(t) {
    return Re(this, t);
  }
  describe(t, s) {
    return $s(Gs, t, s);
  }
  override(t, s) {
    return $s(he, t, s);
  }
  route(t, s, a, n) {
    const o = Re(this, t), i = Re(this, a), r = "_" + s;
    Object.defineProperties(o, {
      [r]: {
        value: o[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], d = i[n];
          return st(l) ? Object.assign({}, d, l) : Z(l, d);
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
var vt = /* @__PURE__ */ new dr({
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
  nr,
  or,
  cr
]);
function ur(e) {
  return !e || it(e.size) || it(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function za(e, t, s, a, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, s.push(n)), o > a && (a = o), a;
}
function oe(e, t, s) {
  const a = e.currentDevicePixelRatio, n = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - n) * a) / a + n;
}
function Na(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Zs(e, t, s, a) {
  go(e, t, s, a, null);
}
function go(e, t, s, a, n) {
  let o, i, r, l, d, u, h, f;
  const g = t.pointStyle, p = t.rotation, _ = t.radius;
  let b = (p || 0) * Wi;
  if (g && typeof g == "object" && (o = g.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, a), e.rotate(b), e.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), e.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (e.beginPath(), g) {
      // Default includes circle
      default:
        n ? e.ellipse(s, a, n / 2, _, 0, 0, gt) : e.arc(s, a, _, 0, gt), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : _, e.moveTo(s + Math.sin(b) * u, a - Math.cos(b) * _), b += Ba, e.lineTo(s + Math.sin(b) * u, a - Math.cos(b) * _), b += Ba, e.lineTo(s + Math.sin(b) * u, a - Math.cos(b) * _), e.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, l = _ - d, i = Math.cos(b + ne) * l, h = Math.cos(b + ne) * (n ? n / 2 - d : l), r = Math.sin(b + ne) * l, f = Math.sin(b + ne) * (n ? n / 2 - d : l), e.arc(s - h, a - r, d, b - ct, b - yt), e.arc(s + f, a - i, d, b - yt, b), e.arc(s + h, a + r, d, b, b + yt), e.arc(s - f, a + i, d, b + yt, b + ct), e.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * _, u = n ? n / 2 : l, e.rect(s - u, a - l, 2 * u, 2 * l);
          break;
        }
        b += ne;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, f = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + f, a - i), e.lineTo(s + h, a + r), e.lineTo(s - f, a + i), e.closePath();
        break;
      case "crossRot":
        b += ne;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, f = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i);
        break;
      case "star":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, f = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i), b += ne, h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, f = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(b) * _, r = Math.sin(b) * _, e.moveTo(s - i, a - r), e.lineTo(s + i, a + r);
        break;
      case "dash":
        e.moveTo(s, a), e.lineTo(s + Math.cos(b) * (n ? n / 2 : _), a + Math.sin(b) * _);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function He(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function ps(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function vs(e) {
  e.restore();
}
function hr(e, t, s, a, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (n === "middle") {
    const o = (t.x + s.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, s.y);
  } else n === "after" != !!a ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function fr(e, t, s, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? s.cp2x : s.cp1x, a ? s.cp2y : s.cp1y, s.x, s.y);
}
function gr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), it(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function pr(e, t, s, a, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = s - o.actualBoundingBoxAscent, d = s + o.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function vr(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function Ve(e, t, s, a, n, o = {}) {
  const i = bt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, gr(e, o), l = 0; l < i.length; ++l)
    d = i[l], o.backdrop && vr(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), it(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, s, a, o.maxWidth)), e.fillText(d, s, a, o.maxWidth), pr(e, s, a, d, o), a += Number(n.lineHeight);
  e.restore();
}
function ds(e, t) {
  const { x: s, y: a, w: n, h: o, radius: i } = t;
  e.arc(s + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * ct, ct, !0), e.lineTo(s, a + o - i.bottomLeft), e.arc(s + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, ct, yt, !0), e.lineTo(s + n - i.bottomRight, a + o), e.arc(s + n - i.bottomRight, a + o - i.bottomRight, i.bottomRight, yt, 0, !0), e.lineTo(s + n, a + i.topRight), e.arc(s + n - i.topRight, a + i.topRight, i.topRight, 0, -yt, !0), e.lineTo(s + i.topLeft, a);
}
const br = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, mr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function _r(e, t) {
  const s = ("" + e).match(br);
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
const yr = (e) => +e || 0;
function da(e, t) {
  const s = {}, a = st(t), n = a ? Object.keys(t) : t, o = st(e) ? a ? (i) => Z(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    s[i] = yr(o(i));
  return s;
}
function po(e) {
  return da(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function me(e) {
  return da(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Et(e) {
  const t = po(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function wt(e, t) {
  e = e || {}, t = t || vt.font;
  let s = Z(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let a = Z(e.style, t.style);
  a && !("" + a).match(mr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const n = {
    family: Z(e.family, t.family),
    lineHeight: _r(Z(e.lineHeight, t.lineHeight), s),
    size: s,
    style: a,
    weight: Z(e.weight, t.weight),
    string: ""
  };
  return n.string = ur(n), n;
}
function Ge(e, t, s, a) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function xr(e, t, s) {
  const { min: a, max: n } = e, o = no(t, (n - a) / 2), i = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: i(a, -Math.abs(o)),
    max: i(n, o)
  };
}
function fe(e, t) {
  return Object.assign(Object.create(e), t);
}
function ua(e, t = [
  ""
], s, a, n = () => e[0]) {
  const o = s || e;
  typeof a > "u" && (a = _o("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: n,
    override: (r) => ua([
      r,
      ...e
    ], t, o, a)
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
      return bo(r, l, () => Ar(l, t, e, r));
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
      return Ha(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Ha(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, d) {
      const u = r._storage || (r._storage = n());
      return r[l] = u[l] = d, delete r._keys, !0;
    }
  });
}
function ye(e, t, s, a) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: vo(e, a),
    setContext: (o) => ye(e, o, s, a),
    override: (o) => ye(e.override(o), t, s, a)
  };
  return new Proxy(n, {
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
      return bo(o, i, () => wr(o, i, r));
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
function vo(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: a = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: s,
    indexable: a,
    isScriptable: ee(s) ? s : () => s,
    isIndexable: ee(a) ? a : () => a
  };
}
const kr = (e, t) => e ? e + oa(t) : t, ha = (e, t) => st(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function bo(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = s();
  return e[t] = a, a;
}
function wr(e, t, s) {
  const { _proxy: a, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = a[t];
  return ee(r) && i.isScriptable(t) && (r = Mr(t, r, e, s)), bt(r) && r.length && (r = Sr(t, r, e, i.isIndexable)), ha(t, r) && (r = ye(r, n, o && o[t], i)), r;
}
function Mr(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, i || a);
  return r.delete(e), ha(e, l) && (l = fa(n._scopes, n, e, l)), l;
}
function Sr(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = s;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (st(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const h = fa(d, n, e, u);
      t.push(ye(h, o, i && i[e], r));
    }
  }
  return t;
}
function mo(e, t, s) {
  return ee(e) ? e(t, s) : e;
}
const $r = (e, t) => e === !0 ? t : typeof e == "string" ? ue(t, e) : void 0;
function Cr(e, t, s, a, n) {
  for (const o of t) {
    const i = $r(s, o);
    if (i) {
      e.add(i);
      const r = mo(i._fallback, s, n);
      if (typeof r < "u" && r !== s && r !== a)
        return r;
    } else if (i === !1 && typeof a < "u" && s !== a)
      return null;
  }
  return !1;
}
function fa(e, t, s, a) {
  const n = t._rootScopes, o = mo(t._fallback, s, a), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = Wa(r, i, s, o || s, a);
  return l === null || typeof o < "u" && o !== s && (l = Wa(r, i, o, l, a), l === null) ? !1 : ua(Array.from(r), [
    ""
  ], n, o, () => Dr(t, s, a));
}
function Wa(e, t, s, a, n) {
  for (; s; )
    s = Cr(e, t, s, a, n);
  return s;
}
function Dr(e, t, s) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const n = a[t];
  return bt(n) && st(s) ? s : n || {};
}
function Ar(e, t, s, a) {
  let n;
  for (const o of t)
    if (n = _o(kr(o, e), s), typeof n < "u")
      return ha(e, n) ? fa(s, a, e, n) : n;
}
function _o(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const a = s[e];
    if (typeof a < "u")
      return a;
  }
}
function Ha(e) {
  let t = e._keys;
  return t || (t = e._keys = Tr(e._scopes)), t;
}
function Tr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const a of Object.keys(s).filter((n) => !n.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Br = Number.EPSILON || 1e-14, xe = (e, t) => t < e.length && !e[t].skip && e[t], yo = (e) => e === "x" ? "y" : "x";
function Fr(e, t, s, a) {
  const n = e.skip ? t : e, o = t, i = s.skip ? t : s, r = Ks(o, n), l = Ks(i, o);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = a * d, f = a * u;
  return {
    previous: {
      x: o.x - h * (i.x - n.x),
      y: o.y - h * (i.y - n.y)
    },
    next: {
      x: o.x + f * (i.x - n.x),
      y: o.y + f * (i.y - n.y)
    }
  };
}
function Pr(e, t, s) {
  const a = e.length;
  let n, o, i, r, l, d = xe(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (l = d, d = xe(e, u + 1), !(!l || !d)) {
      if (Le(t[u], 0, Br)) {
        s[u] = s[u + 1] = 0;
        continue;
      }
      n = s[u] / t[u], o = s[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), s[u] = n * i * t[u], s[u + 1] = o * i * t[u]);
    }
}
function Lr(e, t, s = "x") {
  const a = yo(s), n = e.length;
  let o, i, r, l = xe(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = l, l = xe(e, d + 1), !r)
      continue;
    const u = r[s], h = r[a];
    i && (o = (u - i[s]) / 3, r[`cp1${s}`] = u - o, r[`cp1${a}`] = h - o * t[d]), l && (o = (l[s] - u) / 3, r[`cp2${s}`] = u + o, r[`cp2${a}`] = h + o * t[d]);
  }
}
function Er(e, t = "x") {
  const s = yo(t), a = e.length, n = Array(a).fill(0), o = Array(a);
  let i, r, l, d = xe(e, 0);
  for (i = 0; i < a; ++i)
    if (r = l, l = d, d = xe(e, i + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[i] = u !== 0 ? (d[s] - l[s]) / u : 0;
      }
      o[i] = r ? d ? Nt(n[i - 1]) !== Nt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  Pr(e, n, o), Lr(e, o, t);
}
function Ze(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function Rr(e, t) {
  let s, a, n, o, i, r = He(e[0], t);
  for (s = 0, a = e.length; s < a; ++s)
    i = o, o = r, r = s < a - 1 && He(e[s + 1], t), o && (n = e[s], i && (n.cp1x = Ze(n.cp1x, t.left, t.right), n.cp1y = Ze(n.cp1y, t.top, t.bottom)), r && (n.cp2x = Ze(n.cp2x, t.left, t.right), n.cp2y = Ze(n.cp2y, t.top, t.bottom)));
}
function Or(e, t, s, a, n) {
  let o, i, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Er(e, n);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], l = Fr(d, r, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && Rr(e, s);
}
function ga() {
  return typeof window < "u" && typeof document < "u";
}
function pa(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function us(e, t, s) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[s])) : a = e, a;
}
const bs = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Ir(e, t) {
  return bs(e).getPropertyValue(t);
}
const zr = [
  "top",
  "right",
  "bottom",
  "left"
];
function de(e, t, s) {
  const a = {};
  s = s ? "-" + s : "";
  for (let n = 0; n < 4; n++) {
    const o = zr[n];
    a[o] = parseFloat(e[t + "-" + o + s]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Nr = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function Wr(e, t) {
  const s = e.touches, a = s && s.length ? s[0] : e, { offsetX: n, offsetY: o } = a;
  let i = !1, r, l;
  if (Nr(n, o, e.target))
    r = n, l = o;
  else {
    const d = t.getBoundingClientRect();
    r = a.clientX - d.left, l = a.clientY - d.top, i = !0;
  }
  return {
    x: r,
    y: l,
    box: i
  };
}
function re(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: a } = t, n = bs(s), o = n.boxSizing === "border-box", i = de(n, "padding"), r = de(n, "border", "width"), { x: l, y: d, box: u } = Wr(e, s), h = i.left + (u && r.left), f = i.top + (u && r.top);
  let { width: g, height: p } = t;
  return o && (g -= i.width + r.width, p -= i.height + r.height), {
    x: Math.round((l - h) / g * s.width / a),
    y: Math.round((d - f) / p * s.height / a)
  };
}
function Hr(e, t, s) {
  let a, n;
  if (t === void 0 || s === void 0) {
    const o = e && pa(e);
    if (!o)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = bs(o), l = de(r, "border", "width"), d = de(r, "padding");
      t = i.width - d.width - l.width, s = i.height - d.height - l.height, a = us(r.maxWidth, o, "clientWidth"), n = us(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: a || cs,
    maxHeight: n || cs
  };
}
const Qt = (e) => Math.round(e * 10) / 10;
function Vr(e, t, s, a) {
  const n = bs(e), o = de(n, "margin"), i = us(n.maxWidth, e, "clientWidth") || cs, r = us(n.maxHeight, e, "clientHeight") || cs, l = Hr(e, t, s);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const f = de(n, "border", "width"), g = de(n, "padding");
    d -= g.width + f.width, u -= g.height + f.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, a ? d / a : u - o.height), d = Qt(Math.min(d, i, l.maxWidth)), u = Qt(Math.min(u, r, l.maxHeight)), d && !u && (u = Qt(d / 2)), (t !== void 0 || s !== void 0) && a && l.height && u > l.height && (u = l.height, d = Qt(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function Va(e, t, s) {
  const a = t || 1, n = Qt(e.height * a), o = Qt(e.width * a);
  e.height = Qt(e.height), e.width = Qt(e.width);
  const i = e.canvas;
  return i.style && (s || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = n, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const jr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ga() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function ja(e, t) {
  const s = Ir(e, t), a = s && s.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function le(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function Yr(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: a === "middle" ? s < 0.5 ? e.y : t.y : a === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function qr(e, t, s, a) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = le(e, n, s), r = le(n, o, s), l = le(o, t, s), d = le(i, r, s), u = le(r, l, s);
  return le(d, u, s);
}
const Ur = function(e, t) {
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
    xPlus(s, a) {
      return s - a;
    },
    leftForLtr(s, a) {
      return s - a;
    }
  };
}, Xr = function() {
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
function _e(e, t, s) {
  return e ? Ur(t, s) : Xr();
}
function xo(e, t) {
  let s, a;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, a = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ko(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function wo(e) {
  return e === "angle" ? {
    between: We,
    compare: Ui,
    normalize: Ft
  } : {
    between: Ut,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function Ya({ start: e, end: t, count: s, loop: a, style: n }) {
  return {
    start: e % s,
    end: t % s,
    loop: a && (t - e + 1) % s === 0,
    style: n
  };
}
function Kr(e, t, s) {
  const { property: a, start: n, end: o } = s, { between: i, normalize: r } = wo(a), l = t.length;
  let { start: d, end: u, loop: h } = e, f, g;
  if (h) {
    for (d += l, u += l, f = 0, g = l; f < g && i(r(t[d % l][a]), n, o); ++f)
      d--, u--;
    d %= l, u %= l;
  }
  return u < d && (u += l), {
    start: d,
    end: u,
    loop: h,
    style: e.style
  };
}
function Mo(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: a, start: n, end: o } = s, i = t.length, { compare: r, between: l, normalize: d } = wo(a), { start: u, end: h, loop: f, style: g } = Kr(e, t, s), p = [];
  let _ = !1, b = null, v, m, M;
  const w = () => l(n, M, v) && r(n, M) !== 0, k = () => r(o, v) === 0 || l(o, M, v), $ = () => _ || w(), C = () => !_ || k();
  for (let T = u, P = u; T <= h; ++T)
    m = t[T % i], !m.skip && (v = d(m[a]), v !== M && (_ = l(v, n, o), b === null && $() && (b = r(v, n) === 0 ? T : P), b !== null && C() && (p.push(Ya({
      start: b,
      end: T,
      loop: f,
      count: i,
      style: g
    })), b = null), P = T, M = v));
  return b !== null && p.push(Ya({
    start: b,
    end: h,
    loop: f,
    count: i,
    style: g
  })), p;
}
function So(e, t) {
  const s = [], a = e.segments;
  for (let n = 0; n < a.length; n++) {
    const o = Mo(a[n], e.points, t);
    o.length && s.push(...o);
  }
  return s;
}
function Gr(e, t, s, a) {
  let n = 0, o = t - 1;
  if (s && !a)
    for (; n < t && !e[n].skip; )
      n++;
  for (; n < t && e[n].skip; )
    n++;
  for (n %= t, s && (o += n); o > n && e[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function Zr(e, t, s, a) {
  const n = e.length, o = [];
  let i = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const d = e[l % n];
    d.skip || d.stop ? r.skip || (a = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: a
    }), t = i = d.stop ? l : null) : (i = l, r.skip && (t = l)), r = d;
  }
  return i !== null && o.push({
    start: t % n,
    end: i % n,
    loop: a
  }), o;
}
function Qr(e, t) {
  const s = e.points, a = e.options.spanGaps, n = s.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = Gr(s, n, o, a);
  if (a === !0)
    return qa(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], s, t);
  const l = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return qa(e, Zr(s, i, l, d), s, t);
}
function qa(e, t, s, a) {
  return !a || !a.setContext || !s ? t : Jr(e, t, s, a);
}
function Jr(e, t, s, a) {
  const n = e._chart.getContext(), o = Ua(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = s.length, d = [];
  let u = o, h = t[0].start, f = h;
  function g(p, _, b, v) {
    const m = r ? -1 : 1;
    if (p !== _) {
      for (p += l; s[p % l].skip; )
        p -= m;
      for (; s[_ % l].skip; )
        _ += m;
      p % l !== _ % l && (d.push({
        start: p % l,
        end: _ % l,
        loop: b,
        style: v
      }), u = v, h = _ % l);
    }
  }
  for (const p of t) {
    h = r ? h : p.start;
    let _ = s[h % l], b;
    for (f = h + 1; f <= p.end; f++) {
      const v = s[f % l];
      b = Ua(a.setContext(fe(n, {
        type: "segment",
        p0: _,
        p1: v,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), tl(b, u) && g(h, f - 1, p.loop, u), _ = v, u = b;
    }
    h < f - 1 && g(h, f - 1, p.loop, u);
  }
  return d;
}
function Ua(e) {
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
function tl(e, t) {
  if (!t)
    return !1;
  const s = [], a = function(n, o) {
    return la(o) ? (s.includes(o) || s.push(o), s.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Qe(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function el(e, t) {
  const { xScale: s, yScale: a } = e;
  return s && a ? {
    left: Qe(s, t, "left"),
    right: Qe(s, t, "right"),
    top: Qe(a, t, "top"),
    bottom: Qe(a, t, "bottom")
  } : t;
}
function $o(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const a = el(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : a.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : a.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : a.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : a.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class sl {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, s, a, n) {
    const o = s.listeners[n], i = s.duration;
    o.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: i,
      currentStep: Math.min(a - s.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = uo.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((a, n) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, r = !1, l;
      for (; i >= 0; --i)
        l = o[i], l._active ? (l._total > a.duration && (a.duration = l._total), l.tick(t), r = !0) : (o[i] = o[o.length - 1], o.pop());
      r && (n.draw(), this._notify(n, a, t, "progress")), o.length || (a.running = !1, this._notify(n, a, t, "complete"), a.initial = !1), s += o.length;
    }), this._lastDate = t, s === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const s = this._charts;
    let a = s.get(t);
    return a || (a = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, s.set(t, a)), a;
  }
  listen(t, s, a) {
    this._getAnims(t).listeners[s].push(a);
  }
  add(t, s) {
    !s || !s.length || this._getAnims(t).items.push(...s);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const s = this._charts.get(t);
    s && (s.running = !0, s.start = Date.now(), s.duration = s.items.reduce((a, n) => Math.max(a, n._duration), 0), this._refresh());
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
    const a = s.items;
    let n = a.length - 1;
    for (; n >= 0; --n)
      a[n].cancel();
    s.items = [], this._notify(t, s, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Vt = /* @__PURE__ */ new sl();
const Xa = "transparent", al = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const a = Oa(e || Xa), n = a.valid && Oa(t || Xa);
    return n && n.valid ? n.mix(a, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class nl {
  constructor(t, s, a, n) {
    const o = s[a];
    n = Ge([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = Ge([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || al[t.type || typeof i], this._easing = Ee[t.easing] || Ee.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = a, this._from = i, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, a) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Ge([
        t.to,
        s,
        n,
        t.from
      ]), this._from = Ge([
        t.from,
        n,
        s
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const s = t - this._start, a = this._duration, n = this._prop, o = this._from, i = this._loop, r = this._to;
    let l;
    if (this._active = o !== r && (i || s < a), !this._active) {
      this._target[n] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[n] = o;
      return;
    }
    l = s / a % 2, l = i && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, r, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((s, a) => {
      t.push({
        res: s,
        rej: a
      });
    });
  }
  _notify(t) {
    const s = t ? "res" : "rej", a = this._promises || [];
    for (let n = 0; n < a.length; n++)
      a[n][s]();
  }
}
class Co {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!st(t))
      return;
    const s = Object.keys(vt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!st(o))
        return;
      const i = {};
      for (const r of s)
        i[r] = o[r];
      (bt(o.properties) && o.properties || [
        n
      ]).forEach((r) => {
        (r === n || !a.has(r)) && a.set(r, i);
      });
    });
  }
  _animateOptions(t, s) {
    const a = s.options, n = il(t, a);
    if (!n)
      return [];
    const o = this._createAnimations(n, a);
    return a.$shared && ol(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, s) {
    const a = this._properties, n = [], o = t.$animations || (t.$animations = {}), i = Object.keys(s), r = Date.now();
    let l;
    for (l = i.length - 1; l >= 0; --l) {
      const d = i[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        n.push(...this._animateOptions(t, s));
        continue;
      }
      const u = s[d];
      let h = o[d];
      const f = a.get(d);
      if (h)
        if (f && h.active()) {
          h.update(f, u, r);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new nl(f, t, d, u), n.push(h);
    }
    return n;
  }
  update(t, s) {
    if (this._properties.size === 0) {
      Object.assign(t, s);
      return;
    }
    const a = this._createAnimations(t, s);
    if (a.length)
      return Vt.add(this._chart, a), !0;
  }
}
function ol(e, t) {
  const s = [], a = Object.keys(t);
  for (let n = 0; n < a.length; n++) {
    const o = e[a[n]];
    o && o.active() && s.push(o.wait());
  }
  return Promise.all(s);
}
function il(e, t) {
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
function Ka(e, t) {
  const s = e && e.options || {}, a = s.reverse, n = s.min === void 0 ? t : 0, o = s.max === void 0 ? t : 0;
  return {
    start: a ? o : n,
    end: a ? n : o
  };
}
function rl(e, t, s) {
  if (s === !1)
    return !1;
  const a = Ka(e, s), n = Ka(t, s);
  return {
    top: n.end,
    right: a.end,
    bottom: n.start,
    left: a.start
  };
}
function ll(e) {
  let t, s, a, n;
  return st(e) ? (t = e.top, s = e.right, a = e.bottom, n = e.left) : t = s = a = n = e, {
    top: t,
    right: s,
    bottom: a,
    left: n,
    disabled: e === !1
  };
}
function Do(e, t) {
  const s = [], a = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = a.length; n < o; ++n)
    s.push(a[n].index);
  return s;
}
function Ga(e, t, s, a = {}) {
  const n = e.keys, o = a.mode === "single";
  let i, r, l, d;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, r = n.length; i < r; ++i) {
    if (l = +n[i], l === s) {
      if (u = !0, a.all)
        continue;
      break;
    }
    d = e.values[l], St(d) && (o || t === 0 || Nt(t) === Nt(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function cl(e, t) {
  const { iScale: s, vScale: a } = t, n = s.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, d, u;
  for (l = 0, d = i.length; l < d; ++l)
    u = i[l], r[l] = {
      [n]: u,
      [o]: e[u]
    };
  return r;
}
function Cs(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function dl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function ul(e) {
  const { min: t, max: s, minDefined: a, maxDefined: n } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: n ? s : Number.POSITIVE_INFINITY
  };
}
function hl(e, t, s) {
  const a = e[t] || (e[t] = {});
  return a[s] || (a[s] = {});
}
function Za(e, t, s, a) {
  for (const n of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[n.index];
    if (s && o > 0 || !s && o < 0)
      return n.index;
  }
  return null;
}
function Qa(e, t) {
  const { chart: s, _cachedMeta: a } = e, n = s._stacks || (s._stacks = {}), { iScale: o, vScale: i, index: r } = a, l = o.axis, d = i.axis, u = dl(o, i, a), h = t.length;
  let f;
  for (let g = 0; g < h; ++g) {
    const p = t[g], { [l]: _, [d]: b } = p, v = p._stacks || (p._stacks = {});
    f = v[d] = hl(n, u, _), f[r] = b, f._top = Za(f, i, !0, a.type), f._bottom = Za(f, i, !1, a.type);
    const m = f._visualValues || (f._visualValues = {});
    m[r] = b;
  }
}
function Ds(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((a) => s[a].axis === t).shift();
}
function fl(e, t) {
  return fe(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function gl(e, t, s) {
  return fe(e, {
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
function Me(e, t) {
  const s = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[a] === void 0 || o[a][s] === void 0)
        return;
      delete o[a][s], o[a]._visualValues !== void 0 && o[a]._visualValues[s] !== void 0 && delete o[a]._visualValues[s];
    }
  }
}
const As = (e) => e === "reset" || e === "none", Ja = (e, t) => t ? e : Object.assign({}, e), pl = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: Do(s, !0),
  values: null
};
class ms {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, s) {
    this.chart = t, this._ctx = t.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Cs(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Me(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, a = this.getDataset(), n = (h, f, g, p) => h === "x" ? f : h === "r" ? p : g, o = s.xAxisID = Z(a.xAxisID, Ds(t, "x")), i = s.yAxisID = Z(a.yAxisID, Ds(t, "y")), r = s.rAxisID = Z(a.rAxisID, Ds(t, "r")), l = s.indexAxis, d = s.iAxisID = n(l, o, i, r), u = s.vAxisID = n(l, i, o, r);
    s.xScale = this.getScaleForId(o), s.yScale = this.getScaleForId(i), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(d), s.vScale = this.getScaleForId(u);
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
    this._data && La(this._data, this), t._stacked && Me(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), a = this._data;
    if (st(s)) {
      const n = this._cachedMeta;
      this._data = cl(s, n);
    } else if (a !== s) {
      if (a) {
        La(a, this);
        const n = this._cachedMeta;
        Me(n), n._parsed = [];
      }
      s && Object.isExtensible(s) && Zi(s, this), this._syncList = [], this._data = s;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const s = this._cachedMeta, a = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = s._stacked;
    s._stacked = Cs(s.vScale, s), s.stack !== a.stack && (n = !0, Me(s), s.stack = a.stack), this._resyncElements(t), (n || o !== s._stacked) && (Qa(this, s._parsed), s._stacked = Cs(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: a, _data: n } = this, { iScale: o, _stacked: i } = a, r = o.axis;
    let l = t === 0 && s === n.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, h, f;
    if (this._parsing === !1)
      a._parsed = n, a._sorted = !0, f = n;
    else {
      bt(n[t]) ? f = this.parseArrayData(a, n, t, s) : st(n[t]) ? f = this.parseObjectData(a, n, t, s) : f = this.parsePrimitiveData(a, n, t, s);
      const g = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < s; ++u)
        a._parsed[u + t] = h = f[u], l && (g() && (l = !1), d = h);
      a._sorted = l;
    }
    i && Qa(this, f);
  }
  parsePrimitiveData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, l = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let f, g, p;
    for (f = 0, g = n; f < g; ++f)
      p = f + a, h[f] = {
        [r]: u || o.parse(d[p], p),
        [l]: i.parse(s[p], p)
      };
    return h;
  }
  parseArrayData(t, s, a, n) {
    const { xScale: o, yScale: i } = t, r = new Array(n);
    let l, d, u, h;
    for (l = 0, d = n; l < d; ++l)
      u = l + a, h = s[u], r[l] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return r;
  }
  parseObjectData(t, s, a, n) {
    const { xScale: o, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(n);
    let u, h, f, g;
    for (u = 0, h = n; u < h; ++u)
      f = u + a, g = s[f], d[u] = {
        x: o.parse(ue(g, r), f),
        y: i.parse(ue(g, l), f)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, s, a) {
    const n = this.chart, o = this._cachedMeta, i = s[t.axis], r = {
      keys: Do(n, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return Ga(r, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, s, a, n) {
    const o = a[s.axis];
    let i = o === null ? NaN : o;
    const r = n && a._stacks[s.axis];
    n && r && (n.values = r, i = Ga(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, s) {
    const a = this._cachedMeta, n = a._parsed, o = a._sorted && t === a.iScale, i = n.length, r = this._getOtherScale(t), l = pl(s, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = ul(r);
    let f, g;
    function p() {
      g = n[f];
      const _ = g[r.axis];
      return !St(g[t.axis]) || u > _ || h < _;
    }
    for (f = 0; f < i && !(!p() && (this.updateRangeFromParsed(d, t, g, l), o)); ++f)
      ;
    if (o) {
      for (f = i - 1; f >= 0; --f)
        if (!p()) {
          this.updateRangeFromParsed(d, t, g, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, a = [];
    let n, o, i;
    for (n = 0, o = s.length; n < o; ++n)
      i = s[n][t.axis], St(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = s.iScale, n = s.vScale, o = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(o[a.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = ll(Z(this.options.clip, rl(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, a = this._cachedMeta, n = a.data || [], o = s.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, o, r, l), u = r; u < r + l; ++u) {
      const h = n[u];
      h.hidden || (h.active && d ? i.push(h) : h.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, o);
  }
  getStyle(t, s) {
    const a = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, s, a) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = gl(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = fl(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!s, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", a) {
    const n = s === "active", o = this._cachedDataOpts, i = t + "-" + s, r = o[i], l = this.enableOptionSharing && ze(a);
    if (r)
      return Ja(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = d.getOptionScopes(this.getDataset(), u), g = Object.keys(vt.elements[t]), p = () => this.getContext(a, n, s), _ = d.resolveNamedOptions(f, g, p, h);
    return _.$shared && (_.$shared = l, o[i] = Object.freeze(Ja(_, l))), _;
  }
  _resolveAnimations(t, s, a) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${s}`, r = o[i];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, s), f = u.getOptionScopes(this.getDataset(), h);
      l = u.createResolver(f, this.getContext(t, a, s));
    }
    const d = new Co(n, l && l.animations);
    return l && l._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || As(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const a = this.resolveDataElementOptions(t, s), n = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(s, o) || o !== n;
    return this.updateSharedOptions(o, s, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, s, a, n) {
    As(n) ? Object.assign(t, a) : this._resolveAnimations(s, n).update(t, a);
  }
  updateSharedOptions(t, s, a) {
    t && !As(s) && this._resolveAnimations(void 0, s).update(t, a);
  }
  _setStyle(t, s, a, n) {
    t.active = n;
    const o = this.getStyle(s, n);
    this._resolveAnimations(s, a, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, s, a) {
    this._setStyle(t, a, "active", !1);
  }
  setHoverStyle(t, s, a) {
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
    const s = this._data, a = this._cachedMeta.data;
    for (const [r, l, d] of this._syncList)
      this[r](l, d);
    this._syncList = [];
    const n = a.length, o = s.length, i = Math.min(o, n);
    i && this.parse(0, i), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, s, a = !0) {
    const n = this._cachedMeta, o = n.data, i = t + s;
    let r;
    const l = (d) => {
      for (d.length += s, r = d.length - 1; r >= i; r--)
        d[r] = d[r - s];
    };
    for (l(o), r = t; r < i; ++r)
      o[r] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, s), a && this.updateElements(o, t, s, "reset");
  }
  updateElements(t, s, a, n) {
  }
  _removeElements(t, s) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const n = a._parsed.splice(t, s);
      a._stacked && Me(a, n);
    }
    a.data.splice(t, s);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [s, a, n] = t;
      this[s](a, n);
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
function vl(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let n = 0, o = s.length; n < o; n++)
      a = a.concat(s[n].controller.getAllParsedValues(e));
    e._cache.$bar = co(a.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function bl(e) {
  const t = e.iScale, s = vl(t, e.type);
  let a = t._length, n, o, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (ze(r) && (a = Math.min(a, Math.abs(i - r) || a)), r = i);
  };
  for (n = 0, o = s.length; n < o; ++n)
    i = t.getPixelForValue(s[n]), l();
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    i = t.getPixelForTick(n), l();
  return a;
}
function ml(e, t, s, a) {
  const n = s.barThickness;
  let o, i;
  return it(n) ? (o = t.min * s.categoryPercentage, i = s.barPercentage) : (o = n * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function _l(e, t, s, a) {
  const n = t.pixels, o = n[e];
  let i = e > 0 ? n[e - 1] : null, r = e < n.length - 1 ? n[e + 1] : null;
  const l = s.categoryPercentage;
  i === null && (i = o - (r === null ? t.end - t.start : r - o)), r === null && (r = o + o - i);
  const d = o - (o - Math.min(i, r)) / 2 * l;
  return {
    chunk: Math.abs(r - i) / 2 * l / a,
    ratio: s.barPercentage,
    start: d
  };
}
function yl(e, t, s, a) {
  const n = s.parse(e[0], a), o = s.parse(e[1], a), i = Math.min(n, o), r = Math.max(n, o);
  let l = i, d = r;
  Math.abs(i) > Math.abs(r) && (l = r, d = i), t[s.axis] = d, t._custom = {
    barStart: l,
    barEnd: d,
    start: n,
    end: o,
    min: i,
    max: r
  };
}
function Ao(e, t, s, a) {
  return bt(e) ? yl(e, t, s, a) : t[s.axis] = s.parse(e, a), t;
}
function tn(e, t, s, a) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, l = [];
  let d, u, h, f;
  for (d = s, u = s + a; d < u; ++d)
    f = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), l.push(Ao(f, h, o, d));
  return l;
}
function Ts(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function xl(e, t, s) {
  return e !== 0 ? Nt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function kl(e) {
  let t, s, a, n, o;
  return e.horizontal ? (t = e.base > e.x, s = "left", a = "right") : (t = e.base < e.y, s = "bottom", a = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: s,
    end: a,
    reverse: t,
    top: n,
    bottom: o
  };
}
function wl(e, t, s, a) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    e.borderSkipped = o;
    return;
  }
  if (n === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: i, end: r, reverse: l, top: d, bottom: u } = kl(e);
  n === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === a ? n = d : (s._bottom || 0) === a ? n = u : (o[en(u, i, r, l)] = !0, n = d)), o[en(n, i, r, l)] = !0, e.borderSkipped = o;
}
function en(e, t, s, a) {
  return a ? (e = Ml(e, t, s), e = sn(e, s, t)) : e = sn(e, t, s), e;
}
function Ml(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function sn(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function Sl(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class $l extends ms {
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
  parsePrimitiveData(t, s, a, n) {
    return tn(t, s, a, n);
  }
  parseArrayData(t, s, a, n) {
    return tn(t, s, a, n);
  }
  parseObjectData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = o.axis === "x" ? r : l, u = i.axis === "x" ? r : l, h = [];
    let f, g, p, _;
    for (f = a, g = a + n; f < g; ++f)
      _ = s[f], p = {}, p[o.axis] = o.parse(ue(_, d), f), h.push(Ao(ue(_, u), p, i, f));
    return h;
  }
  updateRangeFromParsed(t, s, a, n) {
    super.updateRangeFromParsed(t, s, a, n);
    const o = a._custom;
    o && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: a, vScale: n } = s, o = this.getParsed(t), i = o._custom, r = Ts(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + a.getLabelForValue(o[a.axis]),
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
  updateElements(t, s, a, n) {
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(s, n);
    for (let g = s; g < s + a; g++) {
      const p = this.getParsed(g), _ = o || it(p[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(g), b = this._calculateBarIndexPixels(g, u), v = (p._stacks || {})[r.axis], m = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !v || Ts(p._custom) || i === v._top || i === v._bottom,
        x: d ? _.head : b.center,
        y: d ? b.center : _.head,
        height: d ? b.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : b.size
      };
      f && (m.options = h || this.resolveDataElementOptions(g, t[g].active ? "active" : n));
      const M = m.options || t[g].options;
      wl(m, M, v, i), Sl(m, M, u.ratio), this.updateElement(t[g], g, m, n);
    }
  }
  _getStacks(t, s) {
    const { iScale: a } = this._cachedMeta, n = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[a.axis], d = (u) => {
      const h = u._parsed.find((g) => g[a.axis] === l), f = h && h[u.vScale.axis];
      if (it(f) || isNaN(f))
        return !0;
    };
    for (const u of n)
      if (!(s !== void 0 && d(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    const t = this.chart.scales, s = this.chart.options.indexAxis;
    return Object.keys(t).filter((a) => t[a].axis === s).shift();
  }
  _getAxis() {
    const t = {}, s = this.getFirstScaleIdForIndexAxis();
    for (const a of this.chart.data.datasets)
      t[Z(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, a) {
    const n = this._getStacks(t, a), o = s !== void 0 ? n.indexOf(s) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, a = s.iScale, n = [];
    let o, i;
    for (o = 0, i = s.data.length; o < i; ++o)
      n.push(a.getPixelForValue(this.getParsed(o)[a.axis], o));
    const r = t.barThickness;
    return {
      min: r || bl(s),
      pixels: n,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: s, _stacked: a, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, l = this.getParsed(t), d = l._custom, u = Ts(d);
    let h = l[s.axis], f = 0, g = a ? this.applyStack(s, l, a) : h, p, _;
    g !== h && (f = g - h, g = h), u && (h = d.barStart, g = d.barEnd - d.barStart, h !== 0 && Nt(h) !== Nt(d.barEnd) && (f = 0), f += h);
    const b = !it(o) && !u ? o : f;
    let v = s.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? p = s.getPixelForValue(f + g) : p = v, _ = p - v, Math.abs(_) < i) {
      _ = xl(_, s, r) * i, h === r && (v -= _ / 2);
      const m = s.getPixelForDecimal(0), M = s.getPixelForDecimal(1), w = Math.min(m, M), k = Math.max(m, M);
      v = Math.max(Math.min(v, k), w), p = v + _, a && !u && (l._stacks[s.axis]._visualValues[n] = s.getValueForPixel(p) - s.getValueForPixel(v));
    }
    if (v === s.getPixelForValue(r)) {
      const m = Nt(_) * s.getLineWidthForValue(r) / 2;
      v += m, _ -= m;
    }
    return {
      size: _,
      base: v,
      head: p,
      center: p + _ / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const a = s.scale, n = this.options, o = n.skipNull, i = Z(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (s.grouped) {
      const u = o ? this._getStackCount(t) : s.stackCount, h = n.barThickness === "flex" ? _l(t, s, n, u * d) : ml(t, s, n, u * d), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(Z(f, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + g;
      r = h.start + h.chunk * p + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
    } else
      r = a.getPixelForValue(this.getParsed(t)[a.axis], t), l = Math.min(i, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, s = t.vScale, a = t.data, n = a.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[s.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function Cl(e, t, s) {
  let a = 1, n = 1, o = 0, i = 0;
  if (t < gt) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(l), f = Math.sin(l), g = (M, w, k) => We(M, r, l, !0) ? 1 : Math.max(w, w * s, k, k * s), p = (M, w, k) => We(M, r, l, !0) ? -1 : Math.min(w, w * s, k, k * s), _ = g(0, d, h), b = g(yt, u, f), v = p(ct, d, h), m = p(ct + yt, u, f);
    a = (_ - v) / 2, n = (b - m) / 2, o = -(_ + v) / 2, i = -(b + m) / 2;
  }
  return {
    ratioX: a,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class Dl extends ms {
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
            const s = t.data, { labels: { pointStyle: a, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, d) => {
              const h = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: l,
                fillStyle: h.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(d),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: n,
                pointStyle: a,
                borderRadius: i && (r || h.borderRadius),
                index: d
              };
            }) : [];
          }
        },
        onClick(t, s, a) {
          a.chart.toggleDataVisibility(s.index), a.chart.update();
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
    const a = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = a;
    else {
      let o = (l) => +a[l];
      if (st(a[t])) {
        const { key: l = "value" } = this._parsing;
        o = (d) => +ue(a[d], l);
      }
      let i, r;
      for (i = t, r = t + s; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return qt(this.options.rotation - 90);
  }
  _getCircumference() {
    return qt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = gt, s = -gt;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const n = this.chart.getDatasetMeta(a).controller, o = n._getRotation(), i = n._getCircumference();
        t = Math.min(t, o), s = Math.max(s, o + i);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: a } = s, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - i) / 2, 0), l = Math.min(Li(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: g, offsetX: p, offsetY: _ } = Cl(h, u, l), b = (a.width - i) / f, v = (a.height - i) / g, m = Math.max(Math.min(b, v) / 2, 0), M = no(this.options.radius, m), w = Math.max(M * l, 0), k = (M - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * M, this.offsetY = _ * M, n.total = this.calculateTotal(), this.outerRadius = M - k * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - k * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, s) {
    const a = this.options, n = this._cachedMeta, o = this._getCircumference();
    return s && a.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / gt);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = o && d.animateScale, g = f ? 0 : this.innerRadius, p = f ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: b } = this._getSharedOptions(s, n);
    let v = this._getRotation(), m;
    for (m = 0; m < s; ++m)
      v += this._circumference(m, o);
    for (m = s; m < s + a; ++m) {
      const M = this._circumference(m, o), w = t[m], k = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: v,
        endAngle: v + M,
        circumference: M,
        outerRadius: p,
        innerRadius: g
      };
      b && (k.options = _ || this.resolveDataElementOptions(m, w.active ? "active" : n)), v += M, this.updateElement(w, m, k, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let a = 0, n;
    for (n = 0; n < s.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !s[n].hidden && (a += Math.abs(o));
    }
    return a;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? gt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = this.chart, n = a.data.labels || [], o = ca(s._parsed[t], a.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const a = this.chart;
    let n, o, i, r, l;
    if (!t) {
      for (n = 0, o = a.data.datasets.length; n < o; ++n)
        if (a.isDatasetVisible(n)) {
          i = a.getDatasetMeta(n), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = r.resolveDataElementOptions(n), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let a = 0, n = t.length; a < n; ++a) {
      const o = this.resolveDataElementOptions(a);
      s = Math.max(s, o.offset || 0, o.hoverOffset || 0);
    }
    return s;
  }
  _getRingWeightOffset(t) {
    let s = 0;
    for (let a = 0; a < t; ++a)
      this.chart.isDatasetVisible(a) && (s += this._getRingWeight(a));
    return s;
  }
  _getRingWeight(t) {
    return Math.max(Z(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Al extends ms {
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
    const s = this._cachedMeta, { dataset: a, data: n = [], _dataset: o } = s, i = this.chart._animationsDisabled;
    let { start: r, count: l } = tr(s, n, i);
    this._drawStart = r, this._drawCount = l, er(s) && (r = 0, l = n.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(s, n), f = i.axis, g = r.axis, { spanGaps: p, segment: _ } = this.options, b = Ne(p) ? p : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || o || n === "none", m = s + a, M = t.length;
    let w = s > 0 && this.getParsed(s - 1);
    for (let k = 0; k < M; ++k) {
      const $ = t[k], C = v ? $ : {};
      if (k < s || k >= m) {
        C.skip = !0;
        continue;
      }
      const T = this.getParsed(k), P = it(T[g]), z = C[f] = i.getPixelForValue(T[f], k), E = C[g] = o || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, T, l) : T[g], k);
      C.skip = isNaN(z) || isNaN(E) || P, C.stop = k > 0 && Math.abs(T[f] - w[f]) > b, _ && (C.parsed = T, C.raw = d.data[k]), h && (C.options = u || this.resolveDataElementOptions(k, $.active ? "active" : n)), v || this.updateElement($, k, C, n), w = T;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, a = s.options && s.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return a;
    const o = n[0].size(this.resolveDataElementOptions(0)), i = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(a, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class Tl extends Dl {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function ie() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class va {
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
    Object.assign(va.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ie();
  }
  parse() {
    return ie();
  }
  format() {
    return ie();
  }
  add() {
    return ie();
  }
  diff() {
    return ie();
  }
  startOf() {
    return ie();
  }
  endOf() {
    return ie();
  }
}
var Bl = {
  _date: va
};
function Fl(e, t, s, a) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? Ki : ce;
    if (a) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const f = d(o, t, s - h), g = d(o, t, s + h);
          return {
            lo: f.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const u = d(o, t, s);
      if (l) {
        const { vScale: h } = n._cachedMeta, { _parsed: f } = e, g = f.slice(0, u.lo + 1).reverse().findIndex((_) => !it(_[h.axis]));
        u.lo -= Math.max(0, g);
        const p = f.slice(u.hi).findIndex((_) => !it(_[h.axis]));
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
function _s(e, t, s, a, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = s[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: f } = Fl(o[r], t, i, n);
    for (let g = h; g <= f; ++g) {
      const p = u[g];
      p.skip || a(p, d, g);
    }
  }
}
function Pl(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(a, n) {
    const o = t ? Math.abs(a.x - n.x) : 0, i = s ? Math.abs(a.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function Bs(e, t, s, a, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || _s(e, s, t, function(r, l, d) {
    !n && !He(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && o.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), o;
}
function Ll(e, t, s, a) {
  let n = [];
  function o(i, r, l) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = ro(i, {
      x: t.x,
      y: t.y
    });
    We(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return _s(e, s, t, o), n;
}
function El(e, t, s, a, n, o) {
  let i = [];
  const r = Pl(s);
  let l = Number.POSITIVE_INFINITY;
  function d(u, h, f) {
    const g = u.inRange(t.x, t.y, n);
    if (a && !g)
      return;
    const p = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(p)) && !g)
      return;
    const b = r(t, p);
    b < l ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: f
      }
    ], l = b) : b === l && i.push({
      element: u,
      datasetIndex: h,
      index: f
    });
  }
  return _s(e, s, t, d), i;
}
function Fs(e, t, s, a, n, o) {
  return !o && !e.isPointInArea(t) ? [] : s === "r" && !a ? Ll(e, t, s, n) : El(e, t, s, a, n, o);
}
function an(e, t, s, a, n) {
  const o = [], i = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return _s(e, s, t, (l, d, u) => {
    l[i] && l[i](t[s], n) && (o.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), a && !r ? [] : o;
}
var Rl = {
  modes: {
    index(e, t, s, a) {
      const n = re(t, e), o = s.axis || "x", i = s.includeInvisible || !1, r = s.intersect ? Bs(e, n, o, a, i) : Fs(e, n, o, !1, a, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, h = d.data[u];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: d.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, s, a) {
      const n = re(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      let r = s.intersect ? Bs(e, n, o, a, i) : Fs(e, n, o, !1, a, i);
      if (r.length > 0) {
        const l = r[0].datasetIndex, d = e.getDatasetMeta(l).data;
        r = [];
        for (let u = 0; u < d.length; ++u)
          r.push({
            element: d[u],
            datasetIndex: l,
            index: u
          });
      }
      return r;
    },
    point(e, t, s, a) {
      const n = re(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return Bs(e, n, o, a, i);
    },
    nearest(e, t, s, a) {
      const n = re(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return Fs(e, n, o, s.intersect, a, i);
    },
    x(e, t, s, a) {
      const n = re(t, e);
      return an(e, n, "x", s.intersect, a);
    },
    y(e, t, s, a) {
      const n = re(t, e);
      return an(e, n, "y", s.intersect, a);
    }
  }
};
const To = [
  "left",
  "top",
  "right",
  "bottom"
];
function Se(e, t) {
  return e.filter((s) => s.pos === t);
}
function nn(e, t) {
  return e.filter((s) => To.indexOf(s.pos) === -1 && s.box.axis === t);
}
function $e(e, t) {
  return e.sort((s, a) => {
    const n = t ? a : s, o = t ? s : a;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Ol(e) {
  const t = [];
  let s, a, n, o, i, r;
  for (s = 0, a = (e || []).length; s < a; ++s)
    n = e[s], { position: o, options: { stack: i, stackWeight: r = 1 } } = n, t.push({
      index: s,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: i && o + i,
      stackWeight: r
    });
  return t;
}
function Il(e) {
  const t = {};
  for (const s of e) {
    const { stack: a, pos: n, stackWeight: o } = s;
    if (!a || !To.includes(n))
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
function zl(e, t) {
  const s = Il(e), { vBoxMaxWidth: a, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, d = s[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * a : l && t.availableWidth, r.height = n) : (r.width = a, r.height = u ? u * n : l && t.availableHeight);
  }
  return s;
}
function Nl(e) {
  const t = Ol(e), s = $e(t.filter((d) => d.box.fullSize), !0), a = $e(Se(t, "left"), !0), n = $e(Se(t, "right")), o = $e(Se(t, "top"), !0), i = $e(Se(t, "bottom")), r = nn(t, "x"), l = nn(t, "y");
  return {
    fullSize: s,
    leftAndTop: a.concat(o),
    rightAndBottom: n.concat(l).concat(i).concat(r),
    chartArea: Se(t, "chartArea"),
    vertical: a.concat(n).concat(l),
    horizontal: o.concat(i).concat(r)
  };
}
function on(e, t, s, a) {
  return Math.max(e[s], t[s]) + Math.max(e[a], t[a]);
}
function Bo(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Wl(e, t, s, a) {
  const { pos: n, box: o } = s, i = e.maxPadding;
  if (!st(n)) {
    s.size && (e[n] -= s.size);
    const h = a[s.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, s.horizontal ? o.height : o.width), s.size = h.size / h.count, e[n] += s.size;
  }
  o.getPadding && Bo(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - on(i, e, "left", "right")), l = Math.max(0, t.outerHeight - on(i, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Hl(e) {
  const t = e.maxPadding;
  function s(a) {
    const n = Math.max(t[a] - e[a], 0);
    return e[a] += n, n;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function Vl(e, t) {
  const s = t.maxPadding;
  function a(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((i) => {
      o[i] = Math.max(t[i], s[i]);
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
function Be(e, t, s, a) {
  const n = [];
  let o, i, r, l, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, Vl(r.horizontal, t));
    const { same: h, other: f } = Wl(t, s, r, a);
    d |= h && n.length, u = u || f, l.fullSize || n.push(r);
  }
  return d && Be(n, t, s, a) || u;
}
function Je(e, t, s, a, n) {
  e.top = s, e.left = t, e.right = t + a, e.bottom = s + n, e.width = a, e.height = n;
}
function rn(e, t, s, a) {
  const n = s.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const l = r.box, d = a[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, f = d.size || l.height;
      ze(d.start) && (i = d.start), l.fullSize ? Je(l, n.left, i, s.outerWidth - n.right - n.left, f) : Je(l, t.left + d.placed, i, h, f), d.start = i, d.placed += h, i = l.bottom;
    } else {
      const h = t.h * u, f = d.size || l.width;
      ze(d.start) && (o = d.start), l.fullSize ? Je(l, o, n.top, f, s.outerHeight - n.bottom - n.top) : Je(l, o, t.top + d.placed, f, h), d.start = o, d.placed += h, o = l.right;
    }
  }
  t.x = o, t.y = i;
}
var Lt = {
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
  update(e, t, s, a) {
    if (!e)
      return;
    const n = Et(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(s - n.height, 0), r = Nl(e.boxes), l = r.vertical, d = r.horizontal;
    lt(e.boxes, (_) => {
      typeof _.beforeLayout == "function" && _.beforeLayout();
    });
    const u = l.reduce((_, b) => b.box.options && b.box.options.display === !1 ? _ : _ + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, n);
    Bo(f, Et(a));
    const g = Object.assign({
      maxPadding: f,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), p = zl(l.concat(d), h);
    Be(r.fullSize, g, h, p), Be(l, g, h, p), Be(d, g, h, p) && Be(l, g, h, p), Hl(g), rn(r.leftAndTop, g, h, p), g.x += g.w, g.y += g.h, rn(r.rightAndBottom, g, h, p), e.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, lt(r.chartArea, (_) => {
      const b = _.box;
      Object.assign(b, e.chartArea), b.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Fo {
  acquireContext(t, s) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, s, a) {
  }
  removeEventListener(t, s, a) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, s, a, n) {
    return s = Math.max(0, s || t.width), a = a || t.height, {
      width: s,
      height: Math.max(0, n ? Math.floor(s / n) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class jl extends Fo {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const os = "$chartjs", Yl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ln = (e) => e === null || e === "";
function ql(e, t) {
  const s = e.style, a = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[os] = {
    initial: {
      height: a,
      width: n,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", ln(n)) {
    const o = ja(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (ln(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = ja(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Po = jr ? {
  passive: !0
} : !1;
function Ul(e, t, s) {
  e && e.addEventListener(t, s, Po);
}
function Xl(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, Po);
}
function Kl(e, t) {
  const s = Yl[e.type] || e.type, { x: a, y: n } = re(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: n !== void 0 ? n : null
  };
}
function hs(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Gl(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || hs(r.addedNodes, a), i = i && !hs(r.removedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Zl(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || hs(r.removedNodes, a), i = i && !hs(r.addedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const je = /* @__PURE__ */ new Map();
let cn = 0;
function Lo() {
  const e = window.devicePixelRatio;
  e !== cn && (cn = e, je.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function Ql(e, t) {
  je.size || window.addEventListener("resize", Lo), je.set(e, t);
}
function Jl(e) {
  je.delete(e), je.size || window.removeEventListener("resize", Lo);
}
function tc(e, t, s) {
  const a = e.canvas, n = a && pa(a);
  if (!n)
    return;
  const o = ho((r, l) => {
    const d = n.clientWidth;
    s(r, l), d < n.clientWidth && s();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), Ql(e, o), i;
}
function Ps(e, t, s) {
  s && s.disconnect(), t === "resize" && Jl(e);
}
function ec(e, t, s) {
  const a = e.canvas, n = ho((o) => {
    e.ctx !== null && s(Kl(o, e));
  }, e);
  return Ul(a, t, n), n;
}
class sc extends Fo {
  acquireContext(t, s) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (ql(t, s), a) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[os])
      return !1;
    const a = s[os].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      it(i) ? s.removeAttribute(o) : s.setAttribute(o, i);
    });
    const n = a.style || {};
    return Object.keys(n).forEach((o) => {
      s.style[o] = n[o];
    }), s.width = s.width, delete s[os], !0;
  }
  addEventListener(t, s, a) {
    this.removeEventListener(t, s);
    const n = t.$proxies || (t.$proxies = {}), i = {
      attach: Gl,
      detach: Zl,
      resize: tc
    }[s] || ec;
    n[s] = i(t, s, a);
  }
  removeEventListener(t, s) {
    const a = t.$proxies || (t.$proxies = {}), n = a[s];
    if (!n)
      return;
    ({
      attach: Ps,
      detach: Ps,
      resize: Ps
    }[s] || Xl)(t, s, n), a[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, a, n) {
    return Vr(t, s, a, n);
  }
  isAttached(t) {
    const s = t && pa(t);
    return !!(s && s.isConnected);
  }
}
function ac(e) {
  return !ga() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? jl : sc;
}
class Gt {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: s, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: a
    };
  }
  hasValue() {
    return Ne(this.x) && Ne(this.y);
  }
  getProps(t, s) {
    const a = this.$animations;
    if (!s || !a)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = a[o] && a[o].active() ? a[o]._to : this[o];
    }), n;
  }
}
function nc(e, t) {
  const s = e.options.ticks, a = oc(e), n = Math.min(s.maxTicksLimit || a, a), o = s.major.enabled ? rc(t) : [], i = o.length, r = o[0], l = o[i - 1], d = [];
  if (i > n)
    return lc(t, d, o, i / n), d;
  const u = ic(o, t, n);
  if (i > 0) {
    let h, f;
    const g = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (ts(t, d, u, it(g) ? 0 : r - g, r), h = 0, f = i - 1; h < f; h++)
      ts(t, d, u, o[h], o[h + 1]);
    return ts(t, d, u, l, it(g) ? t.length : l + g), d;
  }
  return ts(t, d, u), d;
}
function oc(e) {
  const t = e.options.offset, s = e._tickSize(), a = e._length / s + (t ? 0 : 1), n = e._maxLength / s;
  return Math.floor(Math.min(a, n));
}
function ic(e, t, s) {
  const a = cc(e), n = t.length / s;
  if (!a)
    return Math.max(n, 1);
  const o = Hi(a);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const l = o[i];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function rc(e) {
  const t = [];
  let s, a;
  for (s = 0, a = e.length; s < a; s++)
    e[s].major && t.push(s);
  return t;
}
function lc(e, t, s, a) {
  let n = 0, o = s[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), n++, o = s[n * a]);
}
function ts(e, t, s, a, n) {
  const o = Z(a, 0), i = Math.min(Z(n, e.length), e.length);
  let r = 0, l, d, u;
  for (s = Math.ceil(s), n && (l = n - a, s = l / Math.floor(l / s)), u = o; u < 0; )
    r++, u = Math.round(o + r * s);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(o + r * s));
}
function cc(e) {
  const t = e.length;
  let s, a;
  if (t < 2)
    return !1;
  for (a = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== a)
      return !1;
  return a;
}
const dc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, dn = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, un = (e, t) => Math.min(t || e, e);
function hn(e, t) {
  const s = [], a = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += a)
    s.push(e[Math.floor(o)]);
  return s;
}
function uc(e, t, s) {
  const a = e.ticks.length, n = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(s && (a === 1 ? d = Math.max(l - o, i - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < o - r || l > i + r)))
    return l;
}
function hc(e, t) {
  lt(e, (s) => {
    const a = s.gc, n = a.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete s.data[a[o]];
      a.splice(0, n);
    }
  });
}
function Ce(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function fn(e, t) {
  if (!e.display)
    return 0;
  const s = wt(e.font, t), a = Et(e.padding);
  return (bt(e.text) ? e.text.length : 1) * s.lineHeight + a.height;
}
function fc(e, t) {
  return fe(e, {
    scale: t,
    type: "scale"
  });
}
function gc(e, t, s) {
  return fe(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function pc(e, t, s) {
  let a = ra(e);
  return (s && t !== "right" || !s && t === "right") && (a = dc(a)), a;
}
function vc(e, t, s, a) {
  const { top: n, left: o, bottom: i, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let h = 0, f, g, p;
  const _ = i - n, b = r - o;
  if (e.isHorizontal()) {
    if (g = xt(a, o, r), st(s)) {
      const v = Object.keys(s)[0], m = s[v];
      p = u[v].getPixelForValue(m) + _ - t;
    } else s === "center" ? p = (d.bottom + d.top) / 2 + _ - t : p = dn(e, s, t);
    f = r - o;
  } else {
    if (st(s)) {
      const v = Object.keys(s)[0], m = s[v];
      g = u[v].getPixelForValue(m) - b + t;
    } else s === "center" ? g = (d.left + d.right) / 2 - b + t : g = dn(e, s, t);
    p = xt(a, i, n), h = s === "left" ? -yt : yt;
  }
  return {
    titleX: g,
    titleY: p,
    maxWidth: f,
    rotation: h
  };
}
class ke extends Gt {
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
    let { _userMin: t, _userMax: s, _suggestedMin: a, _suggestedMax: n } = this;
    return t = Ot(t, Number.POSITIVE_INFINITY), s = Ot(s, Number.NEGATIVE_INFINITY), a = Ot(a, Number.POSITIVE_INFINITY), n = Ot(n, Number.NEGATIVE_INFINITY), {
      min: Ot(t, a),
      max: Ot(s, n),
      minDefined: St(t),
      maxDefined: St(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: a, minDefined: n, maxDefined: o } = this.getUserBounds(), i;
    if (n && o)
      return {
        min: s,
        max: a
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, d = r.length; l < d; ++l)
      i = r[l].controller.getMinMax(this, t), n || (s = Math.min(s, i.min)), o || (a = Math.max(a, i.max));
    return s = o && s > a ? a : s, a = n && s > a ? s : a, {
      min: Ot(s, Ot(a, s)),
      max: Ot(a, Ot(s, a))
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
    ht(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, a) {
    const { beginAtZero: n, grace: o, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = xr(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? hn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = nc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, a;
    this.isHorizontal() ? (s = this.left, a = this.right) : (s = this.top, a = this.bottom, t = !t), this._startPixel = s, this._endPixel = a, this._reversePixels = t, this._length = a - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    ht(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    ht(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    ht(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), ht(this.options[t], [
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
    ht(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let a, n, o;
    for (a = 0, n = t.length; a < n; a++)
      o = t[a], o.label = ht(s.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    ht(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    ht(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, a = un(this.ticks.length, t.ticks.maxTicksLimit), n = s.minRotation || 0, o = s.maxRotation;
    let i = n, r, l, d;
    if (!this._isVisible() || !s.display || n >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, f = u.highest.height, g = kt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : g / (a - 1), h + 6 > r && (r = g / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Ce(t.grid) - s.padding - fn(t.title, this.chart.options.font), d = Math.sqrt(h * h + f * f), i = qi(Math.min(Math.asin(kt((u.highest.height + 6) / r, -1, 1)), Math.asin(kt(l / d, -1, 1)) - Math.asin(kt(f / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    ht(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    ht(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: a, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = fn(n, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Ce(o) + l) : (t.height = this.maxHeight, t.width = Ce(o) + l), a.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: f } = this._getLabelSizes(), g = a.padding * 2, p = qt(this.labelRotation), _ = Math.cos(p), b = Math.sin(p);
        if (r) {
          const v = a.mirror ? 0 : b * h.width + _ * f.height;
          t.height = Math.min(this.maxHeight, t.height + v + g);
        } else {
          const v = a.mirror ? 0 : _ * h.width + b * f.height;
          t.width = Math.min(this.maxWidth, t.width + v + g);
        }
        this._calculatePadding(d, u, b, _);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, a, n) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, g = 0;
      l ? d ? (f = n * t.width, g = a * s.height) : (f = a * t.height, g = n * s.width) : o === "start" ? g = s.width : o === "end" ? f = t.width : o !== "inner" && (f = t.width / 2, g = s.width / 2), this.paddingLeft = Math.max((f - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((g - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = s.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = s.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    ht(this.options.afterFit, [
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
    let s, a;
    for (s = 0, a = t.length; s < a; s++)
      it(t[s].label) && (t.splice(s, 1), a--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let a = this.ticks;
      s < a.length && (a = hn(a, s)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, a) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], l = Math.floor(s / un(s, a));
    let d = 0, u = 0, h, f, g, p, _, b, v, m, M, w, k;
    for (h = 0; h < s; h += l) {
      if (p = t[h].label, _ = this._resolveTickFontOptions(h), n.font = b = _.string, v = o[b] = o[b] || {
        data: {},
        gc: []
      }, m = _.lineHeight, M = w = 0, !it(p) && !bt(p))
        M = za(n, v.data, v.gc, M, p), w = m;
      else if (bt(p))
        for (f = 0, g = p.length; f < g; ++f)
          k = p[f], !it(k) && !bt(k) && (M = za(n, v.data, v.gc, M, k), w += m);
      i.push(M), r.push(w), d = Math.max(M, d), u = Math.max(w, u);
    }
    hc(o, s);
    const $ = i.indexOf(d), C = r.indexOf(u), T = (P) => ({
      width: i[P] || 0,
      height: r[P] || 0
    });
    return {
      first: T(0),
      last: T(s - 1),
      widest: T($),
      highest: T(C),
      widths: i,
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
    return Xi(this._alignToPixels ? oe(this.chart, s, 0) : s);
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
      const a = s[t];
      return a.$context || (a.$context = gc(this.getContext(), t, a));
    }
    return this.$context || (this.$context = fc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = qt(this.labelRotation), a = Math.abs(Math.cos(s)), n = Math.abs(Math.sin(s)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, l = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? l * a > r * n ? r / a : l / n : l * n < r * a ? l / a : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, a = this.chart, n = this.options, { grid: o, position: i, border: r } = n, l = o.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = Ce(o), g = [], p = r.setContext(this.getContext()), _ = p.display ? p.width : 0, b = _ / 2, v = function(L) {
      return oe(a, L, _);
    };
    let m, M, w, k, $, C, T, P, z, E, N, Y;
    if (i === "top")
      m = v(this.bottom), C = this.bottom - f, P = m - b, E = v(t.top) + b, Y = t.bottom;
    else if (i === "bottom")
      m = v(this.top), E = t.top, Y = v(t.bottom) - b, C = m + b, P = this.top + f;
    else if (i === "left")
      m = v(this.right), $ = this.right - f, T = m - b, z = v(t.left) + b, N = t.right;
    else if (i === "right")
      m = v(this.left), z = t.left, N = v(t.right) - b, $ = m + b, T = this.left + f;
    else if (s === "x") {
      if (i === "center")
        m = v((t.top + t.bottom) / 2 + 0.5);
      else if (st(i)) {
        const L = Object.keys(i)[0], R = i[L];
        m = v(this.chart.scales[L].getPixelForValue(R));
      }
      E = t.top, Y = t.bottom, C = m + b, P = C + f;
    } else if (s === "y") {
      if (i === "center")
        m = v((t.left + t.right) / 2);
      else if (st(i)) {
        const L = Object.keys(i)[0], R = i[L];
        m = v(this.chart.scales[L].getPixelForValue(R));
      }
      $ = m - b, T = $ - f, z = t.left, N = t.right;
    }
    const A = Z(n.ticks.maxTicksLimit, h), B = Math.max(1, Math.ceil(h / A));
    for (M = 0; M < h; M += B) {
      const L = this.getContext(M), R = o.setContext(L), O = r.setContext(L), I = R.lineWidth, H = R.color, G = O.dash || [], X = O.dashOffset, j = R.tickWidth, dt = R.tickColor, mt = R.tickBorderDash || [], rt = R.tickBorderDashOffset;
      w = uc(this, M, l), w !== void 0 && (k = oe(a, w, I), d ? $ = T = z = N = k : C = P = E = Y = k, g.push({
        tx1: $,
        ty1: C,
        tx2: T,
        ty2: P,
        x1: z,
        y1: E,
        x2: N,
        y2: Y,
        width: I,
        color: H,
        borderDash: G,
        borderDashOffset: X,
        tickWidth: j,
        tickColor: dt,
        tickBorderDash: mt,
        tickBorderDashOffset: rt
      }));
    }
    return this._ticksLength = h, this._borderValue = m, g;
  }
  _computeLabelItems(t) {
    const s = this.axis, a = this.options, { position: n, ticks: o } = a, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: h } = o, f = Ce(a.grid), g = f + u, p = h ? -u : g, _ = -qt(this.labelRotation), b = [];
    let v, m, M, w, k, $, C, T, P, z, E, N, Y = "middle";
    if (n === "top")
      $ = this.bottom - p, C = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      $ = this.top + p, C = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const B = this._getYAxisLabelAlignment(f);
      C = B.textAlign, k = B.x;
    } else if (n === "right") {
      const B = this._getYAxisLabelAlignment(f);
      C = B.textAlign, k = B.x;
    } else if (s === "x") {
      if (n === "center")
        $ = (t.top + t.bottom) / 2 + g;
      else if (st(n)) {
        const B = Object.keys(n)[0], L = n[B];
        $ = this.chart.scales[B].getPixelForValue(L) + g;
      }
      C = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (n === "center")
        k = (t.left + t.right) / 2 - g;
      else if (st(n)) {
        const B = Object.keys(n)[0], L = n[B];
        k = this.chart.scales[B].getPixelForValue(L);
      }
      C = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? Y = "top" : l === "end" && (Y = "bottom"));
    const A = this._getLabelSizes();
    for (v = 0, m = r.length; v < m; ++v) {
      M = r[v], w = M.label;
      const B = o.setContext(this.getContext(v));
      T = this.getPixelForTick(v) + o.labelOffset, P = this._resolveTickFontOptions(v), z = P.lineHeight, E = bt(w) ? w.length : 1;
      const L = E / 2, R = B.color, O = B.textStrokeColor, I = B.textStrokeWidth;
      let H = C;
      i ? (k = T, C === "inner" && (v === m - 1 ? H = this.options.reverse ? "left" : "right" : v === 0 ? H = this.options.reverse ? "right" : "left" : H = "center"), n === "top" ? d === "near" || _ !== 0 ? N = -E * z + z / 2 : d === "center" ? N = -A.highest.height / 2 - L * z + z : N = -A.highest.height + z / 2 : d === "near" || _ !== 0 ? N = z / 2 : d === "center" ? N = A.highest.height / 2 - L * z : N = A.highest.height - E * z, h && (N *= -1), _ !== 0 && !B.showLabelBackdrop && (k += z / 2 * Math.sin(_))) : ($ = T, N = (1 - E) * z / 2);
      let G;
      if (B.showLabelBackdrop) {
        const X = Et(B.backdropPadding), j = A.heights[v], dt = A.widths[v];
        let mt = N - X.top, rt = 0 - X.left;
        switch (Y) {
          case "middle":
            mt -= j / 2;
            break;
          case "bottom":
            mt -= j;
            break;
        }
        switch (C) {
          case "center":
            rt -= dt / 2;
            break;
          case "right":
            rt -= dt;
            break;
          case "inner":
            v === m - 1 ? rt -= dt : v > 0 && (rt -= dt / 2);
            break;
        }
        G = {
          left: rt,
          top: mt,
          width: dt + X.width,
          height: j + X.height,
          color: B.backdropColor
        };
      }
      b.push({
        label: w,
        font: P,
        textOffset: N,
        options: {
          rotation: _,
          color: R,
          strokeColor: O,
          strokeWidth: I,
          textAlign: H,
          textBaseline: Y,
          translation: [
            k,
            $
          ],
          backdrop: G
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-qt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return s.align === "start" ? n = "left" : s.align === "end" ? n = "right" : s.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: a, mirror: n, padding: o } } = this.options, i = this._getLabelSizes(), r = t + o, l = i.widest.width;
    let d, u;
    return s === "left" ? n ? (u = this.right + o, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u += l)) : (u = this.right - r, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u = this.left)) : s === "right" ? n ? (u = this.left + o, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u -= l)) : (u = this.left + r, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u = this.right)) : d = "right", {
      textAlign: d,
      x: u
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
    const { ctx: t, options: { backgroundColor: s }, left: a, top: n, width: o, height: i } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(a, n, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? s.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, a = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const r = (l, d, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
    };
    if (s.display)
      for (o = 0, i = n.length; o < i; ++o) {
        const l = n[o];
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
    const { chart: t, ctx: s, options: { border: a, grid: n } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const r = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, u, h, f;
    this.isHorizontal() ? (d = oe(t, this.left, i) - i / 2, u = oe(t, this.right, r) + r / 2, h = f = l) : (h = oe(t, this.top, i) - i / 2, f = oe(t, this.bottom, r) + r / 2, d = u = l), s.save(), s.lineWidth = o.width, s.strokeStyle = o.color, s.beginPath(), s.moveTo(d, h), s.lineTo(u, f), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, n = this._computeLabelArea();
    n && ps(a, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, l = i.font, d = i.label, u = i.textOffset;
      Ve(a, d, 0, u, l, r);
    }
    n && vs(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: a, reverse: n } } = this;
    if (!a.display)
      return;
    const o = wt(a.font), i = Et(a.padding), r = a.align;
    let l = o.lineHeight / 2;
    s === "bottom" || s === "center" || st(s) ? (l += i.bottom, bt(a.text) && (l += o.lineHeight * (a.text.length - 1))) : l += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: f } = vc(this, l, s, r);
    Ve(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: f,
      textAlign: pc(r, s, n),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, a = Z(t.grid && t.grid.z, -1), n = Z(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== ke.prototype.draw ? [
      {
        z: s,
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
        z: n,
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
    const s = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", n = [];
    let o, i;
    for (o = 0, i = s.length; o < i; ++o) {
      const r = s[o];
      r[a] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return wt(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class es {
  constructor(t, s, a) {
    this.type = t, this.scope = s, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let a;
    _c(s) && (a = this.register(s));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, bc(t, i, a), this.override && vt.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, a = t.id, n = this.scope;
    a in s && delete s[a], n && a in vt[n] && (delete vt[n][a], this.override && delete he[a]);
  }
}
function bc(e, t, s) {
  const a = Ie(/* @__PURE__ */ Object.create(null), [
    s ? vt.get(s) : {},
    vt.get(t),
    e.defaults
  ]);
  vt.set(t, a), e.defaultRoutes && mc(t, e.defaultRoutes), e.descriptors && vt.describe(t, e.descriptors);
}
function mc(e, t) {
  Object.keys(t).forEach((s) => {
    const a = s.split("."), n = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[s].split("."), r = i.pop(), l = i.join(".");
    vt.route(o, n, l, r);
  });
}
function _c(e) {
  return "id" in e && "defaults" in e;
}
class yc {
  constructor() {
    this.controllers = new es(ms, "datasets", !0), this.elements = new es(Gt, "elements"), this.plugins = new es(Object, "plugins"), this.scales = new es(ke, "scales"), this._typedRegistries = [
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
  _each(t, s, a) {
    [
      ...s
    ].forEach((n) => {
      const o = a || this._getRegistryForType(n);
      a || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : lt(n, (i) => {
        const r = a || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, s, a) {
    const n = oa(t);
    ht(a["before" + n], [], a), s[t](a), ht(a["after" + n], [], a);
  }
  _getRegistryForType(t) {
    for (let s = 0; s < this._typedRegistries.length; s++) {
      const a = this._typedRegistries[s];
      if (a.isForType(t))
        return a;
    }
    return this.plugins;
  }
  _get(t, s, a) {
    const n = s.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return n;
  }
}
var zt = /* @__PURE__ */ new yc();
class xc {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, a, n) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), i = this._notify(o, t, s, a);
    return s === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, s, a, n) {
    n = n || {};
    for (const o of t) {
      const i = o.plugin, r = i[a], l = [
        s,
        n,
        o.options
      ];
      if (ht(r, l, i) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    it(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const a = t && t.config, n = Z(a.options && a.options.plugins, {}), o = kc(a);
    return n === !1 && !s ? [] : Mc(t, o, n, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], a = this._cache, n = (o, i) => o.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(s, a), t, "stop"), this._notify(n(a, s), t, "start");
  }
}
function kc(e) {
  const t = {}, s = [], a = Object.keys(zt.plugins.items);
  for (let o = 0; o < a.length; o++)
    s.push(zt.getPlugin(a[o]));
  const n = e.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    s.indexOf(i) === -1 && (s.push(i), t[i.id] = !0);
  }
  return {
    plugins: s,
    localIds: t
  };
}
function wc(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Mc(e, { plugins: t, localIds: s }, a, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, d = wc(a[l], n);
    d !== null && o.push({
      plugin: r,
      options: Sc(e.config, {
        plugin: r,
        local: s[l]
      }, d, i)
    });
  }
  return o;
}
function Sc(e, { plugin: t, local: s }, a, n) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return s && t.defaults && i.push(t.defaults), e.createResolver(i, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Qs(e, t) {
  const s = vt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function $c(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function Cc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function gn(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Dc(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Js(e, ...t) {
  if (gn(e))
    return e;
  for (const s of t) {
    const a = s.axis || Dc(s.position) || e.length > 1 && gn(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function pn(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Ac(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (s.length)
      return pn(e, "x", s[0]) || pn(e, "y", s[0]);
  }
  return {};
}
function Tc(e, t) {
  const s = he[e.type] || {
    scales: {}
  }, a = t.scales || {}, n = Qs(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const r = a[i];
    if (!st(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = Js(i, r, Ac(i, e), vt.scales[r.type]), d = Cc(l, n), u = s.scales || {};
    o[i] = Pe(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || Qs(r, t), u = (he[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const f = $c(h, l), g = i[f + "AxisID"] || f;
      o[g] = o[g] || /* @__PURE__ */ Object.create(null), Pe(o[g], [
        {
          axis: f
        },
        a[g],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    Pe(r, [
      vt.scales[r.type],
      vt.scale
    ]);
  }), o;
}
function Eo(e) {
  const t = e.options || (e.options = {});
  t.plugins = Z(t.plugins, {}), t.scales = Tc(e, t);
}
function Ro(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Bc(e) {
  return e = e || {}, e.data = Ro(e.data), Eo(e), e;
}
const vn = /* @__PURE__ */ new Map(), Oo = /* @__PURE__ */ new Set();
function ss(e, t) {
  let s = vn.get(e);
  return s || (s = t(), vn.set(e, s), Oo.add(s)), s;
}
const De = (e, t, s) => {
  const a = ue(t, s);
  a !== void 0 && e.add(a);
};
class Fc {
  constructor(t) {
    this._config = Bc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Ro(t);
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
    this.clearCache(), Eo(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ss(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return ss(`${t}.transition.${s}`, () => [
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
    return ss(`${t}-${s}`, () => [
      [
        `datasets.${t}.elements.${s}`,
        `datasets.${t}`,
        `elements.${s}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const s = t.id, a = this.type;
    return ss(`${a}-plugin-${s}`, () => [
      [
        `plugins.${s}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, s) {
    const a = this._scopeCache;
    let n = a.get(t);
    return (!n || s) && (n = /* @__PURE__ */ new Map(), a.set(t, n)), n;
  }
  getOptionScopes(t, s, a) {
    const { options: n, type: o } = this, i = this._cachedScopes(t, a), r = i.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((u) => {
      t && (l.add(t), u.forEach((h) => De(l, t, h))), u.forEach((h) => De(l, n, h)), u.forEach((h) => De(l, he[o] || {}, h)), u.forEach((h) => De(l, vt, h)), u.forEach((h) => De(l, Gs, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Oo.has(s) && i.set(s, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      he[s] || {},
      vt.datasets[s] || {},
      {
        type: s
      },
      vt,
      Gs
    ];
  }
  resolveNamedOptions(t, s, a, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = bn(this._resolverCache, t, n);
    let l = i;
    if (Lc(i, s)) {
      o.$shared = !1, a = ee(a) ? a() : a;
      const d = this.createResolver(t, a, r);
      l = ye(i, a, d);
    }
    for (const d of s)
      o[d] = l[d];
    return o;
  }
  createResolver(t, s, a = [
    ""
  ], n) {
    const { resolver: o } = bn(this._resolverCache, t, a);
    return st(s) ? ye(o, s, void 0, n) : o;
  }
}
function bn(e, t, s) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const n = s.join();
  let o = a.get(n);
  return o || (o = {
    resolver: ua(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(n, o)), o;
}
const Pc = (e) => st(e) && Object.getOwnPropertyNames(e).some((t) => ee(e[t]));
function Lc(e, t) {
  const { isScriptable: s, isIndexable: a } = vo(e);
  for (const n of t) {
    const o = s(n), i = a(n), r = (i || o) && e[n];
    if (o && (ee(r) || Pc(r)) || i && bt(r))
      return !0;
  }
  return !1;
}
var Ec = "4.5.1";
const Rc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function mn(e, t) {
  return e === "top" || e === "bottom" || Rc.indexOf(e) === -1 && t === "x";
}
function _n(e, t) {
  return function(s, a) {
    return s[e] === a[e] ? s[t] - a[t] : s[e] - a[e];
  };
}
function yn(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), ht(s && s.onComplete, [
    e
  ], t);
}
function Oc(e) {
  const t = e.chart, s = t.options.animation;
  ht(s && s.onProgress, [
    e
  ], t);
}
function Io(e) {
  return ga() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const is = {}, xn = (e) => {
  const t = Io(e);
  return Object.values(is).filter((s) => s.canvas === t).pop();
};
function Ic(e, t, s) {
  const a = Object.keys(e);
  for (const n of a) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (s > 0 || o > t) && (e[o + s] = i);
    }
  }
}
function zc(e, t, s, a) {
  return !s || e.type === "mouseout" ? null : a ? t : e;
}
let we = class {
  static defaults = vt;
  static instances = is;
  static overrides = he;
  static registry = zt;
  static version = Ec;
  static getChart = xn;
  static register(...t) {
    zt.add(...t), kn();
  }
  static unregister(...t) {
    zt.remove(...t), kn();
  }
  constructor(t, s) {
    const a = this.config = new Fc(s), n = Io(t), o = xn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || ac(n))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(n, i.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = Pi(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new xc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Qi((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], is[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Vt.listen(this, "complete", yn), Vt.listen(this, "progress", Oc), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: a, height: n, _aspectRatio: o } = this;
    return it(t) ? s && o ? o : n ? a / n : null : t;
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
    return zt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Va(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Na(this.canvas, this.ctx), this;
  }
  stop() {
    return Vt.stop(this), this;
  }
  resize(t, s) {
    Vt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const a = this.options, n = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(n, t, s, o), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Va(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), ht(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    lt(s, (a, n) => {
      a.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, a = this.scales, n = Object.keys(a).reduce((i, r) => (i[r] = !1, i), {});
    let o = [];
    s && (o = o.concat(Object.keys(s).map((i) => {
      const r = s[i], l = Js(i, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), lt(o, (i) => {
      const r = i.options, l = r.id, d = Js(l, r), u = Z(r.type, i.dtype);
      (r.position === void 0 || mn(r.position, d) !== mn(i.dposition)) && (r.position = i.dposition), n[l] = !0;
      let h = null;
      if (l in a && a[l].type === u)
        h = a[l];
      else {
        const f = zt.getScale(u);
        h = new f({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(r, t);
    }), lt(n, (i, r) => {
      i || delete a[r];
    }), lt(a, (i) => {
      Lt.configure(this, i, i.options), Lt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, a = t.length;
    if (t.sort((n, o) => n.index - o.index), a > s) {
      for (let n = s; n < a; ++n)
        this._destroyDatasetMeta(n);
      t.splice(s, a - s);
    }
    this._sortedMetasets = t.slice(0).sort(_n("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((a, n) => {
      s.filter((o) => o === a._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let a, n;
    for (this._removeUnreferencedMetasets(), a = 0, n = s.length; a < n; a++) {
      const o = s[a];
      let i = this.getDatasetMeta(a);
      const r = o.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = r, i.indexAxis = o.indexAxis || Qs(r, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const l = zt.getController(r), { datasetElementType: d, dataElementType: u } = vt.datasets[r];
        Object.assign(l, {
          dataElementType: zt.getElement(u),
          datasetElementType: d && zt.getElement(d)
        }), i.controller = new l(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    lt(this.data.datasets, (t, s) => {
      this.getDatasetMeta(s).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const s = this.config;
    s.update();
    const a = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: h } = this.getDatasetMeta(d), f = !n && o.indexOf(h) === -1;
      h.buildOrUpdateElements(f), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), n || lt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(_n("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    lt(this.scales, (t) => {
      Lt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Ta(s, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: a, start: n, count: o } of s) {
      const i = a === "_removeElements" ? -o : o;
      Ic(t, n, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), n = a(0);
    for (let o = 1; o < s; o++)
      if (!Ta(n, a(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
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
    Lt.update(this, this.width, this.height, t);
    const s = this.chartArea, a = s.width <= 0 || s.height <= 0;
    this._layers = [], lt(this.boxes, (n) => {
      a && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let s = 0, a = this.data.datasets.length; s < a; ++s)
        this.getDatasetMeta(s).controller.configure();
      for (let s = 0, a = this.data.datasets.length; s < a; ++s)
        this._updateDataset(s, ee(t) ? t({
          datasetIndex: s
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, s) {
    const a = this.getDatasetMeta(t), n = {
      meta: a,
      index: t,
      mode: s,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (a.controller._update(s), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Vt.has(this) ? this.attached && !Vt.running(this) && Vt.start(this) : (this.draw(), yn({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, n);
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
    const s = this._sortedMetasets, a = [];
    let n, o;
    for (n = 0, o = s.length; n < o; ++n) {
      const i = s[n];
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
    for (let s = t.length - 1; s >= 0; --s)
      this._drawDataset(t[s]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const s = this.ctx, a = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = $o(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (n && ps(s, n), t.controller.draw(), n && vs(s), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return He(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, a, n) {
    const o = Rl.modes[s];
    return typeof o == "function" ? o(this, t, a, n) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], a = this._metasets;
    let n = a.filter((o) => o && o._dataset === s).pop();
    return n || (n = {
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
    }, a.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = fe(null, {
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
    const a = this.getDatasetMeta(t);
    return typeof a.hidden == "boolean" ? !a.hidden : !s.hidden;
  }
  setDatasetVisibility(t, s) {
    const a = this.getDatasetMeta(t);
    a.hidden = !s;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, s, a) {
    const n = a ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, n);
    ze(s) ? (o.data[s].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
      visible: a
    }), this.update((r) => r.datasetIndex === t ? n : void 0));
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
    for (this.stop(), Vt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Na(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete is[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, a = (o, i) => {
      s.addEventListener(this, o, i), t[o] = i;
    }, n = (o, i, r) => {
      o.offsetX = i, o.offsetY = r, this._eventHandler(o);
    };
    lt(this.options.events, (o) => a(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, a = (l, d) => {
      s.addEventListener(this, l, d), t[l] = d;
    }, n = (l, d) => {
      t[l] && (s.removeEventListener(this, l, d), delete t[l]);
    }, o = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let i;
    const r = () => {
      n("attach", r), this.attached = !0, this.resize(), a("resize", o), a("detach", i);
    };
    i = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), a("attach", r);
    }, s.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    lt(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, lt(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, a) {
    const n = a ? "set" : "remove";
    let o, i, r, l;
    for (s === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      i = t[r];
      const d = i && this.getDatasetMeta(i.datasetIndex).controller;
      d && d[n + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], a = t.map(({ datasetIndex: o, index: i }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[i],
        index: i
      };
    });
    !rs(a, s) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, s));
  }
  notifyPlugins(t, s, a) {
    return this._plugins.notify(this, t, s, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, a) {
    const n = this.options.hover, o = (l, d) => l.filter((u) => !d.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(s, t), r = a ? t : o(t, s);
    i.length && this.updateHoverStyle(i, n.mode, !1), r.length && n.mode && this.updateHoverStyle(r, n.mode, !0);
  }
  _eventHandler(t, s) {
    const a = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, n) === !1)
      return;
    const o = this._handleEvent(t, s, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, n), (o || a.changed) && this.render(), this;
  }
  _handleEvent(t, s, a) {
    const { _active: n = [], options: o } = this, i = s, r = this._getActiveElements(t, n, a, i), l = zi(t), d = zc(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, ht(o.onHover, [
      t,
      r,
      this
    ], this), l && ht(o.onClick, [
      t,
      r,
      this
    ], this));
    const u = !rs(r, n);
    return (u || s) && (this._active = r, this._updateHoverStyles(r, n, s)), this._lastEvent = d, u;
  }
  _getActiveElements(t, s, a, n) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return s;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
};
function kn() {
  return lt(we.instances, (e) => e._plugins.invalidate());
}
function Nc(e, t, s) {
  const { startAngle: a, x: n, y: o, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, h = Math.min(d / i, Ft(a - s));
  if (e.beginPath(), e.arc(n, o, i - d / 2, a + h / 2, s - h / 2), r > 0) {
    const f = Math.min(d / r, Ft(a - s));
    e.arc(n, o, r + d / 2, s - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(d / 2, i * Ft(a - s));
    if (u === "round")
      e.arc(n, o, f, s - ct / 2, a + ct / 2, !0);
    else if (u === "bevel") {
      const g = 2 * f * f, p = -g * Math.cos(s + ct / 2) + n, _ = -g * Math.sin(s + ct / 2) + o, b = g * Math.cos(a + ct / 2) + n, v = g * Math.sin(a + ct / 2) + o;
      e.lineTo(p, _), e.lineTo(b, v);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Wc(e, t, s) {
  const { startAngle: a, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, a - d, s + d), l > n ? (d = n / l, e.arc(o, i, l, s + d, a - d, !0)) : e.arc(o, i, n, s + yt, a - yt), e.closePath(), e.clip();
}
function Hc(e) {
  return da(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Vc(e, t, s, a) {
  const n = Hc(e.options.borderRadius), o = (s - t) / 2, i = Math.min(o, a * t / 2), r = (l) => {
    const d = (s - Math.min(o, l)) * a / 2;
    return kt(l, 0, Math.min(o, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: kt(n.innerStart, 0, i),
    innerEnd: kt(n.innerEnd, 0, i)
  };
}
function ve(e, t, s, a) {
  return {
    x: s + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function fs(e, t, s, a, n, o) {
  const { x: i, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + a + s - d, 0), f = u > 0 ? u + a + s + d : 0;
  let g = 0;
  const p = n - l;
  if (a) {
    const B = u > 0 ? u - a : 0, L = h > 0 ? h - a : 0, R = (B + L) / 2, O = R !== 0 ? p * R / (R + a) : p;
    g = (p - O) / 2;
  }
  const _ = Math.max(1e-3, p * h - s / ct) / h, b = (p - _) / 2, v = l + b + g, m = n - b - g, { outerStart: M, outerEnd: w, innerStart: k, innerEnd: $ } = Vc(t, f, h, m - v), C = h - M, T = h - w, P = v + M / C, z = m - w / T, E = f + k, N = f + $, Y = v + k / E, A = m - $ / N;
  if (e.beginPath(), o) {
    const B = (P + z) / 2;
    if (e.arc(i, r, h, P, B), e.arc(i, r, h, B, z), w > 0) {
      const I = ve(T, z, i, r);
      e.arc(I.x, I.y, w, z, m + yt);
    }
    const L = ve(N, m, i, r);
    if (e.lineTo(L.x, L.y), $ > 0) {
      const I = ve(N, A, i, r);
      e.arc(I.x, I.y, $, m + yt, A + Math.PI);
    }
    const R = (m - $ / f + (v + k / f)) / 2;
    if (e.arc(i, r, f, m - $ / f, R, !0), e.arc(i, r, f, R, v + k / f, !0), k > 0) {
      const I = ve(E, Y, i, r);
      e.arc(I.x, I.y, k, Y + Math.PI, v - yt);
    }
    const O = ve(C, v, i, r);
    if (e.lineTo(O.x, O.y), M > 0) {
      const I = ve(C, P, i, r);
      e.arc(I.x, I.y, M, v - yt, P);
    }
  } else {
    e.moveTo(i, r);
    const B = Math.cos(P) * h + i, L = Math.sin(P) * h + r;
    e.lineTo(B, L);
    const R = Math.cos(z) * h + i, O = Math.sin(z) * h + r;
    e.lineTo(R, O);
  }
  e.closePath();
}
function jc(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    fs(e, t, s, a, l, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (l = i + (r % gt || gt));
  }
  return fs(e, t, s, a, l, n), e.fill(), l;
}
function Yc(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: f, borderRadius: g } = l, p = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, p ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let _ = t.endAngle;
  if (o) {
    fs(e, t, s, a, _, n);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(r) || (_ = i + (r % gt || gt));
  }
  p && Wc(e, t, _), l.selfJoin && _ - i >= ct && g === 0 && u !== "miter" && Nc(e, t, _), o || (fs(e, t, s, a, _, n), e.stroke());
}
class qc extends Gt {
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
  inRange(t, s, a) {
    const n = this.getProps([
      "x",
      "y"
    ], a), { angle: o, distance: i } = ro(n, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, g = Z(h, l - r), p = We(o, r, l) && r !== l, _ = g >= gt || p, b = Ut(i, d + f, u + f);
    return _ && b;
  }
  getCenterPoint(t) {
    const { x: s, y: a, startAngle: n, endAngle: o, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: d } = this.options, u = (n + o) / 2, h = (i + r + d + l) / 2;
    return {
      x: s + Math.cos(u) * h,
      y: a + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: a } = this, n = (s.offset || 0) / 4, o = (s.spacing || 0) / 2, i = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > gt ? Math.floor(a / gt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(ct, a || 0)), d = n * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, jc(t, this, d, o, i), Yc(t, this, d, o, i), t.restore();
  }
}
function zo(e, t, s = t) {
  e.lineCap = Z(s.borderCapStyle, t.borderCapStyle), e.setLineDash(Z(s.borderDash, t.borderDash)), e.lineDashOffset = Z(s.borderDashOffset, t.borderDashOffset), e.lineJoin = Z(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = Z(s.borderWidth, t.borderWidth), e.strokeStyle = Z(s.borderColor, t.borderColor);
}
function Uc(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Xc(e) {
  return e.stepped ? hr : e.tension || e.cubicInterpolationMode === "monotone" ? fr : Uc;
}
function No(e, t, s = {}) {
  const a = e.length, { start: n = 0, end: o = a - 1 } = s, { start: i, end: r } = t, l = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? a + d - l : d - l
  };
}
function Kc(e, t, s, a) {
  const { points: n, options: o } = t, { count: i, start: r, loop: l, ilen: d } = No(n, s, a), u = Xc(o);
  let { move: h = !0, reverse: f } = a || {}, g, p, _;
  for (g = 0; g <= d; ++g)
    p = n[(r + (f ? d - g : g)) % i], !p.skip && (h ? (e.moveTo(p.x, p.y), h = !1) : u(e, _, p, f, o.stepped), _ = p);
  return l && (p = n[(r + (f ? d : 0)) % i], u(e, _, p, f, o.stepped)), !!l;
}
function Gc(e, t, s, a) {
  const n = t.points, { count: o, start: i, ilen: r } = No(n, s, a), { move: l = !0, reverse: d } = a || {};
  let u = 0, h = 0, f, g, p, _, b, v;
  const m = (w) => (i + (d ? r - w : w)) % o, M = () => {
    _ !== b && (e.lineTo(u, b), e.lineTo(u, _), e.lineTo(u, v));
  };
  for (l && (g = n[m(0)], e.moveTo(g.x, g.y)), f = 0; f <= r; ++f) {
    if (g = n[m(f)], g.skip)
      continue;
    const w = g.x, k = g.y, $ = w | 0;
    $ === p ? (k < _ ? _ = k : k > b && (b = k), u = (h * u + w) / ++h) : (M(), e.lineTo(w, k), p = $, h = 0, _ = b = k), v = k;
  }
  M();
}
function ta(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Gc : Kc;
}
function Zc(e) {
  return e.stepped ? Yr : e.tension || e.cubicInterpolationMode === "monotone" ? qr : le;
}
function Qc(e, t, s, a) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, s, a) && n.closePath()), zo(e, t.options), e.stroke(n);
}
function Jc(e, t, s, a) {
  const { segments: n, options: o } = t, i = ta(t);
  for (const r of n)
    zo(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: s,
      end: s + a - 1
    }) && e.closePath(), e.stroke();
}
const td = typeof Path2D == "function";
function ed(e, t, s, a) {
  td && !t.options.segment ? Qc(e, t, s, a) : Jc(e, t, s, a);
}
class ys extends Gt {
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
    const a = this.options;
    if ((a.tension || a.cubicInterpolationMode === "monotone") && !a.stepped && !this._pointsUpdated) {
      const n = a.spanGaps ? this._loop : this._fullLoop;
      Or(this._points, a, t, n, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Qr(this, this.options.segment));
  }
  first() {
    const t = this.segments, s = this.points;
    return t.length && s[t[0].start];
  }
  last() {
    const t = this.segments, s = this.points, a = t.length;
    return a && s[t[a - 1].end];
  }
  interpolate(t, s) {
    const a = this.options, n = t[s], o = this.points, i = So(this, {
      property: s,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], l = Zc(a);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: f } = i[d], g = o[h], p = o[f];
      if (g === p) {
        r.push(g);
        continue;
      }
      const _ = Math.abs((n - g[s]) / (p[s] - g[s])), b = l(g, p, _, a.stepped);
      b[s] = t[s], r.push(b);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, a) {
    return ta(this)(t, this, s, a);
  }
  path(t, s, a) {
    const n = this.segments, o = ta(this);
    let i = this._loop;
    s = s || 0, a = a || this.points.length - s;
    for (const r of n)
      i &= o(t, this, r, {
        start: s,
        end: s + a - 1
      });
    return !!i;
  }
  draw(t, s, a, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), ed(t, this, a, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function wn(e, t, s, a) {
  const n = e.options, { [s]: o } = e.getProps([
    s
  ], a);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class sd extends Gt {
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
  inRange(t, s, a) {
    const n = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - o, 2) + Math.pow(s - i, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, s) {
    return wn(this, t, "x", s);
  }
  inYRange(t, s) {
    return wn(this, t, "y", s);
  }
  getCenterPoint(t) {
    const { x: s, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: a
    };
  }
  size(t) {
    t = t || this.options || {};
    let s = t.radius || 0;
    s = Math.max(s, s && t.hoverRadius || 0);
    const a = s && t.borderWidth || 0;
    return (s + a) * 2;
  }
  draw(t, s) {
    const a = this.options;
    this.skip || a.radius < 0.1 || !He(this, s, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Zs(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Wo(e, t) {
  const { x: s, y: a, base: n, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, d, u, h;
  return e.horizontal ? (h = i / 2, r = Math.min(s, n), l = Math.max(s, n), d = a - h, u = a + h) : (h = o / 2, r = s - h, l = s + h, d = Math.min(a, n), u = Math.max(a, n)), {
    left: r,
    top: d,
    right: l,
    bottom: u
  };
}
function Jt(e, t, s, a) {
  return e ? 0 : kt(t, s, a);
}
function ad(e, t, s) {
  const a = e.options.borderWidth, n = e.borderSkipped, o = po(a);
  return {
    t: Jt(n.top, o.top, 0, s),
    r: Jt(n.right, o.right, 0, t),
    b: Jt(n.bottom, o.bottom, 0, s),
    l: Jt(n.left, o.left, 0, t)
  };
}
function nd(e, t, s) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = me(n), i = Math.min(t, s), r = e.borderSkipped, l = a || st(n);
  return {
    topLeft: Jt(!l || r.top || r.left, o.topLeft, 0, i),
    topRight: Jt(!l || r.top || r.right, o.topRight, 0, i),
    bottomLeft: Jt(!l || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: Jt(!l || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function od(e) {
  const t = Wo(e), s = t.right - t.left, a = t.bottom - t.top, n = ad(e, s / 2, a / 2), o = nd(e, s / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: a,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: s - n.l - n.r,
      h: a - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function Ls(e, t, s, a) {
  const n = t === null, o = s === null, r = e && !(n && o) && Wo(e, a);
  return r && (n || Ut(t, r.left, r.right)) && (o || Ut(s, r.top, r.bottom));
}
function id(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function rd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Es(e, t, s = {}) {
  const a = e.x !== s.x ? -t : 0, n = e.y !== s.y ? -t : 0, o = (e.x + e.w !== s.x + s.w ? t : 0) - a, i = (e.y + e.h !== s.y + s.h ? t : 0) - n;
  return {
    x: e.x + a,
    y: e.y + n,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class ld extends Gt {
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
    const { inflateAmount: s, options: { borderColor: a, backgroundColor: n } } = this, { inner: o, outer: i } = od(this), r = id(i.radius) ? ds : rd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, Es(i, s, o)), t.clip(), r(t, Es(o, -s, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, Es(o, s)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, s, a) {
    return Ls(this, t, s, a);
  }
  inXRange(t, s) {
    return Ls(this, t, null, s);
  }
  inYRange(t, s) {
    return Ls(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: a, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (s + n) / 2 : s,
      y: o ? a : (a + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function cd(e, t, s) {
  const a = e.segments, n = e.points, o = t.points, i = [];
  for (const r of a) {
    let { start: l, end: d } = r;
    d = xs(l, d, n);
    const u = ea(s, n[l], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const h = So(t, u);
    for (const f of h) {
      const g = ea(s, o[f.start], o[f.end], f.loop), p = Mo(r, n, g);
      for (const _ of p)
        i.push({
          source: _,
          target: f,
          start: {
            [s]: Mn(u, g, "start", Math.max)
          },
          end: {
            [s]: Mn(u, g, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function ea(e, t, s, a) {
  if (a)
    return;
  let n = t[e], o = s[e];
  return e === "angle" && (n = Ft(n), o = Ft(o)), {
    property: e,
    start: n,
    end: o
  };
}
function dd(e, t) {
  const { x: s = null, y: a = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = xs(i, r, n);
    const l = n[i], d = n[r];
    a !== null ? (o.push({
      x: l.x,
      y: a
    }), o.push({
      x: d.x,
      y: a
    })) : s !== null && (o.push({
      x: s,
      y: l.y
    }), o.push({
      x: s,
      y: d.y
    }));
  }), o;
}
function xs(e, t, s) {
  for (; t > e; t--) {
    const a = s[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function Mn(e, t, s, a) {
  return e && t ? a(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Ho(e, t) {
  let s = [], a = !1;
  return bt(e) ? (a = !0, s = e) : s = dd(e, t), s.length ? new ys({
    points: s,
    options: {
      tension: 0
    },
    _loop: a,
    _fullLoop: a
  }) : null;
}
function Sn(e) {
  return e && e.fill !== !1;
}
function ud(e, t, s) {
  let n = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!s)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!St(n))
      return n;
    if (i = e[n], !i)
      return !1;
    if (i.visible)
      return n;
    o.push(n), n = i.fill;
  }
  return !1;
}
function hd(e, t, s) {
  const a = vd(e);
  if (st(a))
    return isNaN(a.value) ? !1 : a;
  let n = parseFloat(a);
  return St(n) && Math.floor(n) === n ? fd(a[0], t, n, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(a) >= 0 && a;
}
function fd(e, t, s, a) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= a ? !1 : s;
}
function gd(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : st(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function pd(e, t, s) {
  let a;
  return e === "start" ? a = s : e === "end" ? a = t.options.reverse ? t.min : t.max : st(e) ? a = e.value : a = t.getBaseValue(), a;
}
function vd(e) {
  const t = e.options, s = t.fill;
  let a = Z(s && s.target, s);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function bd(e) {
  const { scale: t, index: s, line: a } = e, n = [], o = a.segments, i = a.points, r = md(t, s);
  r.push(Ho({
    x: null,
    y: t.bottom
  }, a));
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    for (let u = d.start; u <= d.end; u++)
      _d(n, i[u], r);
  }
  return new ys({
    points: n,
    options: {}
  });
}
function md(e, t) {
  const s = [], a = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < a.length; n++) {
    const o = a[n];
    if (o.index === t)
      break;
    o.hidden || s.unshift(o.dataset);
  }
  return s;
}
function _d(e, t, s) {
  const a = [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n], { first: i, last: r, point: l } = yd(o, t, "x");
    if (!(!l || i && r)) {
      if (i)
        a.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...a);
}
function yd(e, t, s) {
  const a = e.interpolate(t, s);
  if (!a)
    return {};
  const n = a[s], o = e.segments, i = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], h = i[u.start][s], f = i[u.end][s];
    if (Ut(n, h, f)) {
      r = n === h, l = n === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: a
  };
}
class Vo {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, a) {
    const { x: n, y: o, radius: i } = this;
    return s = s || {
      start: 0,
      end: gt
    }, t.arc(n, o, i, s.end, s.start, !0), !a.bounds;
  }
  interpolate(t) {
    const { x: s, y: a, radius: n } = this, o = t.angle;
    return {
      x: s + Math.cos(o) * n,
      y: a + Math.sin(o) * n,
      angle: o
    };
  }
}
function xd(e) {
  const { chart: t, fill: s, line: a } = e;
  if (St(s))
    return kd(t, s);
  if (s === "stack")
    return bd(e);
  if (s === "shape")
    return !0;
  const n = wd(e);
  return n instanceof Vo ? n : Ho(n, a);
}
function kd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function wd(e) {
  return (e.scale || {}).getPointPositionForValue ? Sd(e) : Md(e);
}
function Md(e) {
  const { scale: t = {}, fill: s } = e, a = gd(s, t);
  if (St(a)) {
    const n = t.isHorizontal();
    return {
      x: n ? a : null,
      y: n ? null : a
    };
  }
  return null;
}
function Sd(e) {
  const { scale: t, fill: s } = e, a = t.options, n = t.getLabels().length, o = a.reverse ? t.max : t.min, i = pd(s, t, o), r = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new Vo({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, i));
  return r;
}
function Rs(e, t, s) {
  const a = xd(t), { chart: n, index: o, line: i, scale: r, axis: l } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: f = h, below: g = h } = u || {}, p = n.getDatasetMeta(o), _ = $o(n, p);
  a && i.points.length && (ps(e, s), $d(e, {
    line: i,
    target: a,
    above: f,
    below: g,
    area: s,
    scale: r,
    axis: l,
    clip: _
  }), vs(e));
}
function $d(e, t) {
  const { line: s, target: a, above: n, below: o, area: i, scale: r, clip: l } = t, d = s._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? ($n(e, a, i.top), Os(e, {
    line: s,
    target: a,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), $n(e, a, i.bottom)) : d === "y" && (Cn(e, a, i.left), Os(e, {
    line: s,
    target: a,
    color: o,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Cn(e, a, i.right), u = n)), Os(e, {
    line: s,
    target: a,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function $n(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[xs(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, s), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function Cn(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[xs(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(s, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(s, h.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Os(e, t) {
  const { line: s, target: a, property: n, color: o, scale: i, clip: r } = t, l = cd(s, a, n);
  for (const { source: d, target: u, start: h, end: f } of l) {
    const { style: { backgroundColor: g = o } = {} } = d, p = a !== !0;
    e.save(), e.fillStyle = g, Cd(e, i, r, p && ea(n, h, f)), e.beginPath();
    const _ = !!s.pathSegment(e, d);
    let b;
    if (p) {
      _ ? e.closePath() : Dn(e, a, f, n);
      const v = !!a.pathSegment(e, u, {
        move: _,
        reverse: !0
      });
      b = _ && v, b || Dn(e, a, h, n);
    }
    e.closePath(), e.fill(b ? "evenodd" : "nonzero"), e.restore();
  }
}
function Cd(e, t, s, a) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = a || {};
  if (o === "x" || o === "y") {
    let l, d, u, h;
    o === "x" ? (l = i, d = n.top, u = r, h = n.bottom) : (l = n.left, d = i, u = n.right, h = r), e.beginPath(), s && (l = Math.max(l, s.left), u = Math.min(u, s.right), d = Math.max(d, s.top), h = Math.min(h, s.bottom)), e.rect(l, d, u - l, h - d), e.clip();
  }
}
function Dn(e, t, s, a) {
  const n = t.interpolate(s, a);
  n && e.lineTo(n.x, n.y);
}
var Dd = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const a = (e.data.datasets || []).length, n = [];
    let o, i, r, l;
    for (i = 0; i < a; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, l = null, r && r.options && r instanceof ys && (l = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: hd(r, i, a),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, n.push(l);
    for (i = 0; i < a; ++i)
      l = n[i], !(!l || l.fill === !1) && (l.fill = ud(n, i, s.propagate));
  },
  beforeDraw(e, t, s) {
    const a = s.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = n.length - 1; i >= 0; --i) {
      const r = n[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), a && r.fill && Rs(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let n = a.length - 1; n >= 0; --n) {
      const o = a[n].$filler;
      Sn(o) && Rs(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const a = t.meta.$filler;
    !Sn(a) || s.drawTime !== "beforeDatasetDraw" || Rs(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const An = (e, t) => {
  let { boxHeight: s = t, boxWidth: a = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, Ad = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Tn extends Gt {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s, a) {
    this.maxWidth = t, this.maxHeight = s, this._margins = a, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let s = ht(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (s = s.filter((a) => t.filter(a, this.chart.data))), t.sort && (s = s.sort((a, n) => t.sort(a, n, this.chart.data))), this.options.reverse && s.reverse(), this.legendItems = s;
  }
  fit() {
    const { options: t, ctx: s } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, n = wt(a.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = An(a, o);
    let d, u;
    s.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, a, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, g = -u;
    return this.legendItems.forEach((p, _) => {
      const b = a + s / 2 + o.measureText(p.text).width;
      (_ === 0 || d[d.length - 1] + b + 2 * r > i) && (h += u, d[d.length - (_ > 0 ? 0 : 1)] = 0, g += u, f++), l[_] = {
        left: 0,
        top: g,
        row: f,
        width: b,
        height: n
      }, d[d.length - 1] += b + r;
    }), h;
  }
  _fitCols(t, s, a, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, f = 0, g = 0, p = 0, _ = 0;
    return this.legendItems.forEach((b, v) => {
      const { itemWidth: m, itemHeight: M } = Td(a, s, o, b, n);
      v > 0 && g + M + 2 * r > u && (h += f + r, d.push({
        width: f,
        height: g
      }), p += f + r, _++, f = g = 0), l[v] = {
        left: p,
        top: g,
        col: _,
        width: m,
        height: M
      }, f = Math.max(f, m), g += M + r;
    }), h += f, d.push({
      width: f,
      height: g
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: a, labels: { padding: n }, rtl: o } } = this, i = _e(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = xt(a, this.left + n, this.right - this.lineWidths[r]);
      for (const d of s)
        r !== d.row && (r = d.row, l = xt(a, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = xt(a, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of s)
        d.col !== r && (r = d.col, l = xt(a, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), l += d.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ps(t, this), this._draw(), vs(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: a, ctx: n } = this, { align: o, labels: i } = t, r = vt.color, l = _e(t.rtl, this.left, this.width), d = wt(i.font), { padding: u } = i, h = d.size, f = h / 2;
    let g;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: p, boxHeight: _, itemHeight: b } = An(i, h), v = function($, C, T) {
      if (isNaN(p) || p <= 0 || isNaN(_) || _ < 0)
        return;
      n.save();
      const P = Z(T.lineWidth, 1);
      if (n.fillStyle = Z(T.fillStyle, r), n.lineCap = Z(T.lineCap, "butt"), n.lineDashOffset = Z(T.lineDashOffset, 0), n.lineJoin = Z(T.lineJoin, "miter"), n.lineWidth = P, n.strokeStyle = Z(T.strokeStyle, r), n.setLineDash(Z(T.lineDash, [])), i.usePointStyle) {
        const z = {
          radius: _ * Math.SQRT2 / 2,
          pointStyle: T.pointStyle,
          rotation: T.rotation,
          borderWidth: P
        }, E = l.xPlus($, p / 2), N = C + f;
        go(n, z, E, N, i.pointStyleWidth && p);
      } else {
        const z = C + Math.max((h - _) / 2, 0), E = l.leftForLtr($, p), N = me(T.borderRadius);
        n.beginPath(), Object.values(N).some((Y) => Y !== 0) ? ds(n, {
          x: E,
          y: z,
          w: p,
          h: _,
          radius: N
        }) : n.rect(E, z, p, _), n.fill(), P !== 0 && n.stroke();
      }
      n.restore();
    }, m = function($, C, T) {
      Ve(n, T.text, $, C + b / 2, d, {
        strikethrough: T.hidden,
        textAlign: l.textAlign(T.textAlign)
      });
    }, M = this.isHorizontal(), w = this._computeTitleHeight();
    M ? g = {
      x: xt(o, this.left + u, this.right - a[0]),
      y: this.top + u + w,
      line: 0
    } : g = {
      x: this.left + u,
      y: xt(o, this.top + w + u, this.bottom - s[0].height),
      line: 0
    }, xo(this.ctx, t.textDirection);
    const k = b + u;
    this.legendItems.forEach(($, C) => {
      n.strokeStyle = $.fontColor, n.fillStyle = $.fontColor;
      const T = n.measureText($.text).width, P = l.textAlign($.textAlign || ($.textAlign = i.textAlign)), z = p + f + T;
      let E = g.x, N = g.y;
      l.setWidth(this.width), M ? C > 0 && E + z + u > this.right && (N = g.y += k, g.line++, E = g.x = xt(o, this.left + u, this.right - a[g.line])) : C > 0 && N + k > this.bottom && (E = g.x = E + s[g.line].width + u, g.line++, N = g.y = xt(o, this.top + w + u, this.bottom - s[g.line].height));
      const Y = l.x(E);
      if (v(Y, N, $), E = Ji(P, E + p + f, M ? E + z : this.right, t.rtl), m(l.x(E), N, $), M)
        g.x += z + u;
      else if (typeof $.text != "string") {
        const A = d.lineHeight;
        g.y += jo($, A) + u;
      } else
        g.y += k;
    }), ko(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, a = wt(s.font), n = Et(s.padding);
    if (!s.display)
      return;
    const o = _e(t.rtl, this.left, this.width), i = this.ctx, r = s.position, l = a.size / 2, d = n.top + l;
    let u, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), u = this.top + d, h = xt(t.align, h, this.right - f);
    else {
      const p = this.columnSizes.reduce((_, b) => Math.max(_, b.height), 0);
      u = d + xt(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const g = xt(r, h, h + f);
    i.textAlign = o.textAlign(ra(r)), i.textBaseline = "middle", i.strokeStyle = s.color, i.fillStyle = s.color, i.font = a.string, Ve(i, s.text, g, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = wt(t.font), a = Et(t.padding);
    return t.display ? s.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, s) {
    let a, n, o;
    if (Ut(t, this.left, this.right) && Ut(s, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (n = o[a], Ut(t, n.left, n.left + n.width) && Ut(s, n.top, n.top + n.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!Pd(t.type, s))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = Ad(n, a);
      n && !o && ht(s.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = a, a && !o && ht(s.onHover, [
        t,
        a,
        this
      ], this);
    } else a && ht(s.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Td(e, t, s, a, n) {
  const o = Bd(a, e, t, s), i = Fd(n, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function Bd(e, t, s, a) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + s.size / 2 + a.measureText(n).width;
}
function Fd(e, t, s) {
  let a = e;
  return typeof t.text != "string" && (a = jo(t, s)), a;
}
function jo(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function Pd(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var ba = {
  id: "legend",
  _element: Tn,
  start(e, t, s) {
    const a = e.legend = new Tn({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Lt.configure(e, a, s), Lt.addBox(e, a);
  },
  stop(e) {
    Lt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const a = e.legend;
    Lt.configure(e, a, s), a.options = s;
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
      const a = t.datasetIndex, n = s.chart;
      n.isDatasetVisible(a) ? (n.hide(a), t.hidden = !0) : (n.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: a, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(s ? 0 : void 0), u = Et(d.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: a || d.pointStyle,
            rotation: d.rotation,
            textAlign: n || d.textAlign,
            borderRadius: i && (r || d.borderRadius),
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
class Yo extends Gt {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s) {
    const a = this.options;
    if (this.left = 0, this.top = 0, !a.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = s;
    const n = bt(a.text) ? a.text.length : 1;
    this._padding = Et(a.padding);
    const o = n * wt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: a, bottom: n, right: o, options: i } = this, r = i.align;
    let l = 0, d, u, h;
    return this.isHorizontal() ? (u = xt(r, a, o), h = s + t, d = o - a) : (i.position === "left" ? (u = a + t, h = xt(r, n, s), l = ct * -0.5) : (u = o - t, h = xt(r, s, n), l = ct * 0.5), d = n - s), {
      titleX: u,
      titleY: h,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const a = wt(s.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(o);
    Ve(t, s.text, 0, 0, a, {
      color: s.color,
      maxWidth: l,
      rotation: d,
      textAlign: ra(s.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function Ld(e, t) {
  const s = new Yo({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Lt.configure(e, s, t), Lt.addBox(e, s), e.titleBlock = s;
}
var qo = {
  id: "title",
  _element: Yo,
  start(e, t, s) {
    Ld(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Lt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const a = e.titleBlock;
    Lt.configure(e, a, s), a.options = s;
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
const Fe = {
  average(e) {
    if (!e.length)
      return !1;
    let t, s, a = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        a.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((r, l) => r + l) / a.size,
      y: n / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, a = t.y, n = Number.POSITIVE_INFINITY, o, i, r;
    for (o = 0, i = e.length; o < i; ++o) {
      const l = e[o].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), u = Ks(t, d);
        u < n && (n = u, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      s = l.x, a = l.y;
    }
    return {
      x: s,
      y: a
    };
  }
};
function It(e, t) {
  return t && (bt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function jt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Ed(e, t) {
  const { element: s, datasetIndex: a, index: n } = t, o = e.getDatasetMeta(a).controller, { label: i, value: r } = o.getLabelAndValue(n);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(n),
    raw: e.data.datasets[a].data[n],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: a,
    element: s
  };
}
function Bn(e, t) {
  const s = e.chart.ctx, { body: a, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, l = wt(t.bodyFont), d = wt(t.titleFont), u = wt(t.footerFont), h = o.length, f = n.length, g = a.length, p = Et(t.padding);
  let _ = p.height, b = 0, v = a.reduce((w, k) => w + k.before.length + k.lines.length + k.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const w = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    _ += g * w + (v - g) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  f && (_ += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
  let m = 0;
  const M = function(w) {
    b = Math.max(b, s.measureText(w).width + m);
  };
  return s.save(), s.font = d.string, lt(e.title, M), s.font = l.string, lt(e.beforeBody.concat(e.afterBody), M), m = t.displayColors ? i + 2 + t.boxPadding : 0, lt(a, (w) => {
    lt(w.before, M), lt(w.lines, M), lt(w.after, M);
  }), m = 0, s.font = u.string, lt(e.footer, M), s.restore(), b += p.width, {
    width: b,
    height: _
  };
}
function Rd(e, t) {
  const { y: s, height: a } = t;
  return s < a / 2 ? "top" : s > e.height - a / 2 ? "bottom" : "center";
}
function Od(e, t, s, a) {
  const { x: n, width: o } = a, i = s.caretSize + s.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function Id(e, t, s, a) {
  const { x: n, width: o } = s, { width: i, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return a === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), Od(d, e, t, s) && (d = "center"), d;
}
function Fn(e, t, s) {
  const a = s.yAlign || t.yAlign || Rd(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || Id(e, t, s, a),
    yAlign: a
  };
}
function zd(e, t) {
  let { x: s, width: a } = e;
  return t === "right" ? s -= a : t === "center" && (s -= a / 2), s;
}
function Nd(e, t, s) {
  let { y: a, height: n } = e;
  return t === "top" ? a += s : t === "bottom" ? a -= n + s : a -= n / 2, a;
}
function Pn(e, t, s, a) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: l } = s, d = n + o, { topLeft: u, topRight: h, bottomLeft: f, bottomRight: g } = me(i);
  let p = zd(t, r);
  const _ = Nd(t, l, d);
  return l === "center" ? r === "left" ? p += d : r === "right" && (p -= d) : r === "left" ? p -= Math.max(u, f) + n : r === "right" && (p += Math.max(h, g) + n), {
    x: kt(p, 0, a.width - t.width),
    y: kt(_, 0, a.height - t.height)
  };
}
function as(e, t, s) {
  const a = Et(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Ln(e) {
  return It([], jt(e));
}
function Wd(e, t, s) {
  return fe(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function En(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const Uo = {
  beforeTitle: Ht,
  title(e) {
    if (e.length > 0) {
      const t = e[0], s = t.chart.data.labels, a = s ? s.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (a > 0 && t.dataIndex < a)
        return s[t.dataIndex];
    }
    return "";
  },
  afterTitle: Ht,
  beforeBody: Ht,
  beforeLabel: Ht,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return it(s) || (t += s), t;
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
  afterLabel: Ht,
  afterBody: Ht,
  beforeFooter: Ht,
  footer: Ht,
  afterFooter: Ht
};
function Ct(e, t, s, a) {
  const n = e[t].call(s, a);
  return typeof n > "u" ? Uo[t].call(s, a) : n;
}
class Rn extends Gt {
  static positioners = Fe;
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
    const s = this.chart, a = this.options.setContext(this.getContext()), n = a.enabled && s.options.animation && a.animations, o = new Co(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Wd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: a } = s, n = Ct(a, "beforeTitle", this, t), o = Ct(a, "title", this, t), i = Ct(a, "afterTitle", this, t);
    let r = [];
    return r = It(r, jt(n)), r = It(r, jt(o)), r = It(r, jt(i)), r;
  }
  getBeforeBody(t, s) {
    return Ln(Ct(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: a } = s, n = [];
    return lt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = En(a, o);
      It(i.before, jt(Ct(r, "beforeLabel", this, o))), It(i.lines, Ct(r, "label", this, o)), It(i.after, jt(Ct(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, s) {
    return Ln(Ct(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: a } = s, n = Ct(a, "beforeFooter", this, t), o = Ct(a, "footer", this, t), i = Ct(a, "afterFooter", this, t);
    let r = [];
    return r = It(r, jt(n)), r = It(r, jt(o)), r = It(r, jt(i)), r;
  }
  _createItems(t) {
    const s = this._active, a = this.chart.data, n = [], o = [], i = [];
    let r = [], l, d;
    for (l = 0, d = s.length; l < d; ++l)
      r.push(Ed(this.chart, s[l]));
    return t.filter && (r = r.filter((u, h, f) => t.filter(u, h, f, a))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, a))), lt(r, (u) => {
      const h = En(t.callbacks, u);
      n.push(Ct(h, "labelColor", this, u)), o.push(Ct(h, "labelPointStyle", this, u)), i.push(Ct(h, "labelTextColor", this, u));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, s) {
    const a = this.options.setContext(this.getContext()), n = this._active;
    let o, i = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = Fe[a.position].call(this, n, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const l = this._size = Bn(this, a), d = Object.assign({}, r, l), u = Fn(this.chart, a, d), h = Pn(a, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, a, n) {
    const o = this.getCaretPosition(t, a, n);
    s.lineTo(o.x1, o.y1), s.lineTo(o.x2, o.y2), s.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, s, a) {
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = a, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: h } = me(r), { x: f, y: g } = t, { width: p, height: _ } = s;
    let b, v, m, M, w, k;
    return o === "center" ? (w = g + _ / 2, n === "left" ? (b = f, v = b - i, M = w + i, k = w - i) : (b = f + p, v = b + i, M = w - i, k = w + i), m = b) : (n === "left" ? v = f + Math.max(l, u) + i : n === "right" ? v = f + p - Math.max(d, h) - i : v = this.caretX, o === "top" ? (M = g, w = M - i, b = v - i, m = v + i) : (M = g + _, w = M + i, b = v + i, m = v - i), k = M), {
      x1: b,
      x2: v,
      x3: m,
      y1: M,
      y2: w,
      y3: k
    };
  }
  drawTitle(t, s, a) {
    const n = this.title, o = n.length;
    let i, r, l;
    if (o) {
      const d = _e(a.rtl, this.x, this.width);
      for (t.x = as(this, a.titleAlign, a), s.textAlign = d.textAlign(a.titleAlign), s.textBaseline = "middle", i = wt(a.titleFont), r = a.titleSpacing, s.fillStyle = a.titleColor, s.font = i.string, l = 0; l < o; ++l)
        s.fillText(n[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === o && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, a, n, o) {
    const i = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: d } = o, u = wt(o.bodyFont), h = as(this, "left", o), f = n.x(h), g = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, p = s.y + g;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, b = n.leftForLtr(f, d) + d / 2, v = p + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Zs(t, _, b, v), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Zs(t, _, b, v);
    } else {
      t.lineWidth = st(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const _ = n.leftForLtr(f, d), b = n.leftForLtr(n.xPlus(f, 1), d - 2), v = me(i.borderRadius);
      Object.values(v).some((m) => m !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, ds(t, {
        x: _,
        y: p,
        w: d,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ds(t, {
        x: b,
        y: p + 1,
        w: d - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(_, p, d, l), t.strokeRect(_, p, d, l), t.fillStyle = i.backgroundColor, t.fillRect(b, p + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, s, a) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = a, h = wt(a.bodyFont);
    let f = h.lineHeight, g = 0;
    const p = _e(a.rtl, this.x, this.width), _ = function(T) {
      s.fillText(T, p.x(t.x + g), t.y + f / 2), t.y += f + o;
    }, b = p.textAlign(i);
    let v, m, M, w, k, $, C;
    for (s.textAlign = i, s.textBaseline = "middle", s.font = h.string, t.x = as(this, b, a), s.fillStyle = a.bodyColor, lt(this.beforeBody, _), g = r && b !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, w = 0, $ = n.length; w < $; ++w) {
      for (v = n[w], m = this.labelTextColors[w], s.fillStyle = m, lt(v.before, _), M = v.lines, r && M.length && (this._drawColorBox(s, t, w, p, a), f = Math.max(h.lineHeight, l)), k = 0, C = M.length; k < C; ++k)
        _(M[k]), f = h.lineHeight;
      lt(v.after, _);
    }
    g = 0, f = h.lineHeight, lt(this.afterBody, _), t.y -= o;
  }
  drawFooter(t, s, a) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const l = _e(a.rtl, this.x, this.width);
      for (t.x = as(this, a.footerAlign, a), t.y += a.footerMarginTop, s.textAlign = l.textAlign(a.footerAlign), s.textBaseline = "middle", i = wt(a.footerFont), s.fillStyle = a.footerColor, s.font = i.string, r = 0; r < o; ++r)
        s.fillText(n[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, s, a, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: l } = t, { width: d, height: u } = a, { topLeft: h, topRight: f, bottomLeft: g, bottomRight: p } = me(n.cornerRadius);
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, s.lineWidth = n.borderWidth, s.beginPath(), s.moveTo(r + h, l), i === "top" && this.drawCaret(t, s, a, n), s.lineTo(r + d - f, l), s.quadraticCurveTo(r + d, l, r + d, l + f), i === "center" && o === "right" && this.drawCaret(t, s, a, n), s.lineTo(r + d, l + u - p), s.quadraticCurveTo(r + d, l + u, r + d - p, l + u), i === "bottom" && this.drawCaret(t, s, a, n), s.lineTo(r + g, l + u), s.quadraticCurveTo(r, l + u, r, l + u - g), i === "center" && o === "left" && this.drawCaret(t, s, a, n), s.lineTo(r, l + h), s.quadraticCurveTo(r, l, r + h, l), s.closePath(), s.fill(), n.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, a = this.$animations, n = a && a.x, o = a && a.y;
    if (n || o) {
      const i = Fe[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = Bn(this, t), l = Object.assign({}, i, this._size), d = Fn(s, t, l), u = Pn(t, l, d, s);
      (n._to !== u.x || o._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const s = this.options.setContext(this.getContext());
    let a = this.opacity;
    if (!a)
      return;
    this._updateAnimationTarget(s);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const i = Et(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, n, s), xo(t, s.textDirection), o.y += i.top, this.drawTitle(o, t, s), this.drawBody(o, t, s), this.drawFooter(o, t, s), ko(t, s.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, s) {
    const a = this._active, n = t.map(({ datasetIndex: r, index: l }) => {
      const d = this.chart.getDatasetMeta(r);
      if (!d)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: d.data[l],
        index: l
      };
    }), o = !rs(a, n), i = this._positionChanged(n, s);
    (o || i) && (this._active = n, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, a = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], i = this._getActiveElements(t, o, s, a), r = this._positionChanged(i, t), l = s || !rs(i, o) || r;
    return l && (this._active = i, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, a, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, a);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, s) {
    const { caretX: a, caretY: n, options: o } = this, i = Fe[o.position].call(this, t, s);
    return i !== !1 && (a !== i.x || n !== i.y);
  }
}
var ma = {
  id: "tooltip",
  _element: Rn,
  positioners: Fe,
  afterInit(e, t, s) {
    s && (e.tooltip = new Rn({
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
    callbacks: Uo
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
const Hd = (e, t, s, a) => (typeof t == "string" ? (s = e.push(t) - 1, a.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function Vd(e, t, s, a) {
  const n = e.indexOf(t);
  if (n === -1)
    return Hd(e, t, s, a);
  const o = e.lastIndexOf(t);
  return n !== o ? s : n;
}
const jd = (e, t) => e === null ? null : kt(Math.round(e), 0, t);
function On(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Xo extends ke {
  static id = "category";
  static defaults = {
    ticks: {
      callback: On
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const a = this.getLabels();
      for (const { index: n, label: o } of s)
        a[n] === o && a.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (it(t))
      return null;
    const a = this.getLabels();
    return s = isFinite(s) && a[s] === t ? s : Vd(a, t, Z(s, t), this._addedLabels), jd(s, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: a, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), s || (n = this.getLabels().length - 1)), this.min = a, this.max = n;
  }
  buildTicks() {
    const t = this.min, s = this.max, a = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && s === o.length - 1 ? o : o.slice(t, s + 1), this._valueRange = Math.max(o.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= s; i++)
      n.push({
        value: i
      });
    return n;
  }
  getLabelForValue(t) {
    return On.call(this, t);
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
function Yd(e, t) {
  const s = [], { bounds: n, step: o, min: i, max: r, precision: l, count: d, maxTicks: u, maxDigits: h, includeBounds: f } = e, g = o || 1, p = u - 1, { min: _, max: b } = t, v = !it(i), m = !it(r), M = !it(d), w = (b - _) / (h + 1);
  let k = Fa((b - _) / p / g) * g, $, C, T, P;
  if (k < 1e-14 && !v && !m)
    return [
      {
        value: _
      },
      {
        value: b
      }
    ];
  P = Math.ceil(b / k) - Math.floor(_ / k), P > p && (k = Fa(P * k / p / g) * g), it(l) || ($ = Math.pow(10, l), k = Math.ceil(k * $) / $), n === "ticks" ? (C = Math.floor(_ / k) * k, T = Math.ceil(b / k) * k) : (C = _, T = b), v && m && o && ji((r - i) / o, k / 1e3) ? (P = Math.round(Math.min((r - i) / k, u)), k = (r - i) / P, C = i, T = r) : M ? (C = v ? i : C, T = m ? r : T, P = d - 1, k = (T - C) / P) : (P = (T - C) / k, Le(P, Math.round(P), k / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const z = Math.max(Pa(k), Pa(C));
  $ = Math.pow(10, it(l) ? z : l), C = Math.round(C * $) / $, T = Math.round(T * $) / $;
  let E = 0;
  for (v && (f && C !== i ? (s.push({
    value: i
  }), C < i && E++, Le(Math.round((C + E * k) * $) / $, i, In(i, w, e)) && E++) : C < i && E++); E < P; ++E) {
    const N = Math.round((C + E * k) * $) / $;
    if (m && N > r)
      break;
    s.push({
      value: N
    });
  }
  return m && f && T !== r ? s.length && Le(s[s.length - 1].value, r, In(r, w, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!m || T === r) && s.push({
    value: T
  }), s;
}
function In(e, t, { horizontal: s, minRotation: a }) {
  const n = qt(a), o = (s ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class qd extends ke {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return it(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: a } = this.getUserBounds();
    let { min: n, max: o } = this;
    const i = (l) => n = s ? n : l, r = (l) => o = a ? o : l;
    if (t) {
      const l = Nt(n), d = Nt(o);
      l < 0 && d < 0 ? r(0) : l > 0 && d > 0 && i(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      r(o + l), t || i(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: s, stepSize: a } = t, n;
    return a ? (n = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), s = s || 11), s && (n = Math.min(s, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, s = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const n = {
      maxTicks: a,
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
    }, o = this._range || this, i = Yd(n, o);
    return t.bounds === "ticks" && Yi(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let s = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (a - s) / Math.max(t.length - 1, 1) / 2;
      s -= n, a += n;
    }
    this._startValue = s, this._endValue = a, this._valueRange = a - s;
  }
  getLabelForValue(t) {
    return ca(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ko extends qd {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: fo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = St(t) ? t : 0, this.max = St(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, a = qt(this.options.ticks.minRotation), n = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const ks = {
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
}, Dt = /* @__PURE__ */ Object.keys(ks);
function zn(e, t) {
  return e - t;
}
function Nn(e, t) {
  if (it(t))
    return null;
  const s = e._adapter, { parser: a, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), St(i) || (i = typeof a == "string" ? s.parse(i, a) : s.parse(i)), i === null ? null : (n && (i = n === "week" && (Ne(o) || o === !0) ? s.startOf(i, "isoWeek", o) : s.startOf(i, n)), +i);
}
function Wn(e, t, s, a) {
  const n = Dt.length;
  for (let o = Dt.indexOf(e); o < n - 1; ++o) {
    const i = ks[Dt[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((s - t) / (r * i.size)) <= a)
      return Dt[o];
  }
  return Dt[n - 1];
}
function Ud(e, t, s, a, n) {
  for (let o = Dt.length - 1; o >= Dt.indexOf(s); o--) {
    const i = Dt[o];
    if (ks[i].common && e._adapter.diff(n, a, i) >= t - 1)
      return i;
  }
  return Dt[s ? Dt.indexOf(s) : 0];
}
function Xd(e) {
  for (let t = Dt.indexOf(e) + 1, s = Dt.length; t < s; ++t)
    if (ks[Dt[t]].common)
      return Dt[t];
}
function Hn(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: a, hi: n } = ia(s, t), o = s[a] >= t ? s[a] : s[n];
    e[o] = !0;
  }
}
function Kd(e, t, s, a) {
  const n = e._adapter, o = +n.startOf(t[0].value, a), i = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= i; r = +n.add(r, 1, a))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Vn(e, t, s) {
  const a = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, a.push({
      value: r,
      major: !1
    });
  return o === 0 || !s ? a : Kd(e, a, n, s);
}
class jn extends ke {
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
    const a = t.time || (t.time = {}), n = this._adapter = new Bl._date(t.adapters.date);
    n.init(s), Pe(a.displayFormats, n.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : Nn(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, s = this._adapter, a = t.time.unit || "day";
    let { min: n, max: o, minDefined: i, maxDefined: r } = this.getUserBounds();
    function l(d) {
      !i && !isNaN(d.min) && (n = Math.min(n, d.min)), !r && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = St(n) && !isNaN(n) ? n : +s.startOf(Date.now(), a), o = St(o) && !isNaN(o) ? o : +s.endOf(Date.now(), a) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let s = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return t.length && (s = t[0], a = t[t.length - 1]), {
      min: s,
      max: a
    };
  }
  buildTicks() {
    const t = this.options, s = t.time, a = t.ticks, n = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, i = this.max, r = Gi(n, o, i);
    return this._unit = s.unit || (a.autoSkip ? Wn(s.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Ud(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Xd(this._unit), this.initOffsets(n), t.reverse && r.reverse(), Vn(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, a = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - n : s = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    s = kt(s, 0, i), a = kt(a, 0, i), this._offsets = {
      start: s,
      end: a,
      factor: 1 / (s + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, a = this.max, n = this.options, o = n.time, i = o.unit || Wn(o.minUnit, s, a, this._getLabelCapacity(s)), r = Z(n.ticks.stepSize, 1), l = i === "week" ? o.isoWeekday : !1, d = Ne(l) || l === !0, u = {};
    let h = s, f, g;
    if (d && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, d ? "day" : i), t.diff(a, s, i) > 1e5 * r)
      throw new Error(s + " and " + a + " are too far apart with stepSize of " + r + " " + i);
    const p = n.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, g = 0; f < a; f = +t.add(f, r, i), g++)
      Hn(u, f, p);
    return (f === a || n.bounds === "ticks" || g === 1) && Hn(u, f, p), Object.keys(u).sort(zn).map((_) => +_);
  }
  getLabelForValue(t) {
    const s = this._adapter, a = this.options.time;
    return a.tooltipFormat ? s.format(t, a.tooltipFormat) : s.format(t, a.displayFormats.datetime);
  }
  format(t, s) {
    const n = this.options.time.displayFormats, o = this._unit, i = s || n[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, s, a, n) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return ht(i, [
        t,
        s,
        a
      ], this);
    const r = o.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], h = d && r[d], f = a[s], g = d && h && f && f.major;
    return this._adapter.format(t, n || (g ? h : u));
  }
  generateTickLabels(t) {
    let s, a, n;
    for (s = 0, a = t.length; s < a; ++s)
      n = t[s], n.label = this._tickFormatFunction(n.value, s, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const s = this._offsets, a = this.getDecimalForValue(t);
    return this.getPixelForDecimal((s.start + a) * s.factor);
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return this.min + a * (this.max - this.min);
  }
  _getLabelSize(t) {
    const s = this.options.ticks, a = this.ctx.measureText(t).width, n = qt(this.isHorizontal() ? s.maxRotation : s.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + r * i,
      h: a * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, a = s.displayFormats, n = a[s.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, Vn(this, [
      t
    ], this._majorUnit), n), i = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], s, a;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (s = 0, a = n.length; s < a; ++s)
      t = t.concat(n[s].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let s, a;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (s = 0, a = n.length; s < a; ++s)
      t.push(Nn(this, n[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return co(t.sort(zn));
  }
}
function ns(e, t, s) {
  let a = 0, n = e.length - 1, o, i, r, l;
  s ? (t >= e[a].pos && t <= e[n].pos && ({ lo: a, hi: n } = ce(e, "pos", t)), { pos: o, time: r } = e[a], { pos: i, time: l } = e[n]) : (t >= e[a].time && t <= e[n].time && ({ lo: a, hi: n } = ce(e, "time", t)), { time: o, pos: r } = e[a], { time: i, pos: l } = e[n]);
  const d = i - o;
  return d ? r + (l - r) * (t - o) / d : r;
}
class K5 extends jn {
  static id = "timeseries";
  static defaults = jn.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = ns(s, this.min), this._tableRange = ns(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: a } = this, n = [], o = [];
    let i, r, l, d, u;
    for (i = 0, r = t.length; i < r; ++i)
      d = t[i], d >= s && d <= a && n.push(d);
    if (n.length < 2)
      return [
        {
          time: s,
          pos: 0
        },
        {
          time: a,
          pos: 1
        }
      ];
    for (i = 0, r = n.length; i < r; ++i)
      u = n[i + 1], l = n[i - 1], d = n[i], Math.round((u + l) / 2) !== d && o.push({
        time: d,
        pos: i / (r - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, s = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(s) || a.length === 1) && a.push(s), a.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return s.length && a.length ? t = this.normalize(s.concat(a)) : t = s.length ? s : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (ns(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return ns(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Go = {
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
}, Gd = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Zd = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Go,
  ...Gd
}, Qd = ni[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function be(e) {
  return to(e) ? Us(e) : e;
}
function Jd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return to(t) ? new Proxy(e, {}) : e;
}
function tu(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Zo(e, t) {
  e.labels = t;
}
function Qo(e, t, s) {
  const a = [];
  e.datasets = t.map((n) => {
    const o = e.datasets.find((i) => i[s] === n[s]);
    return !o || !n.data || a.includes(o) ? {
      ...n
    } : (a.push(o), Object.assign(o, n), o);
  });
}
function eu(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Zo(s, e.labels), Qo(s, e.datasets, t), s;
}
const su = et({
  props: Zd,
  setup(e, t) {
    let { expose: s, slots: a } = t;
    const n = ft(null), o = Zn(null);
    s({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: f, datasetIdKey: g } = e, p = eu(u, g), _ = Jd(p, u);
      o.value = new we(n.value, {
        type: d,
        data: _,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const d = Us(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return gs(i), Qn(r), Xt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, f] = d, [g, p] = u;
      const _ = Us(o.value);
      if (!_)
        return;
      let b = !1;
      if (h) {
        const v = be(h), m = be(g);
        v && v !== m && (tu(_, v), b = !0);
      }
      if (f) {
        const v = be(f.labels), m = be(p.labels), M = be(f.datasets), w = be(p.datasets);
        v !== m && (Zo(_.config.data, v), b = !0), M && M !== w && (Qo(_.config.data, M, e.datasetIdKey), b = !0);
      }
      b && Jn(() => {
        l(_);
      });
    }, {
      deep: !0
    }), () => qs("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      qs("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function _a(e, t) {
  return we.register(t), et({
    props: Go,
    setup(s, a) {
      let { expose: n } = a;
      const o = Zn(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => qs(su, Qd({
        ref: i
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const au = /* @__PURE__ */ _a("bar", $l), nu = /* @__PURE__ */ _a("line", Al), ou = /* @__PURE__ */ _a("pie", Tl), Yn = {
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
}, qn = {
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
}, iu = [
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
function nt(e) {
  const t = ft("light");
  let s = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = D(() => e?.value ? e.value : t.value), o = D(() => n.value === "dark"), i = D(() => o.value ? qn : Yn), r = () => {
    typeof document > "u" || (t.value = a(), s = new MutationObserver((d) => {
      for (const u of d)
        u.attributeName === "class" && (t.value = a());
    }), s.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    s && (s.disconnect(), s = null);
  };
  return gs(() => {
    r();
  }), Qn(() => {
    l();
  }), e && Xt(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Yn,
    darkColors: qn,
    chartSeriesColors: iu
  };
}
const ru = { class: "chart-container" }, lu = /* @__PURE__ */ et({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    we.register(
      Xo,
      Ko,
      ld,
      qo,
      ma,
      ba
    );
    const { isDark: a, colors: n } = nt(at(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          },
          generateLabels: function(l) {
            return l.data.datasets.map((u, h) => ({
              text: i(u.label || ""),
              fillStyle: Array.isArray(u.backgroundColor) ? u.backgroundColor[0] : u.backgroundColor,
              strokeStyle: Array.isArray(u.borderColor) ? u.borderColor[0] : u.borderColor,
              lineWidth: u.borderWidth,
              hidden: !l.isDatasetVisible(h),
              index: h,
              datasetIndex: h
            }));
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(i(l.dataset.label || ""));
              return d && (d += ": "), l.parsed.y !== null && (d += l.parsed.y), d;
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
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return i(l);
            }
          }
        },
        x: {
          stacked: s.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const d = this.getLabelForValue(l);
              return i(d);
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
    return t({ isDark: a }), (l, d) => (y(), x("div", ru, [
      K(F(au), {
        data: F(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), J = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of t)
    s[a] = n;
  return s;
}, Kt = /* @__PURE__ */ J(lu, [["__scopeId", "data-v-105d8c6f"]]), cu = { class: "chart-container" }, du = /* @__PURE__ */ et({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    we.register(
      Xo,
      Ko,
      sd,
      ys,
      qo,
      ma,
      ba,
      Dd
    );
    const { isDark: a, colors: n } = nt(at(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              return l.data.datasets.map((u, h) => ({
                text: i(u.label || ""),
                fillStyle: u.backgroundColor,
                strokeStyle: u.borderColor,
                lineWidth: u.borderWidth,
                hidden: !l.isDatasetVisible(h),
                index: h,
                datasetIndex: h
              }));
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(i(l.dataset.label || ""));
              return d && (d += ": "), l.parsed.y !== null && (d += l.parsed.y), d;
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
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
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
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const d = this.getLabelForValue(l);
              return i(d);
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
          backgroundColor: a.value ? "#1a1a1d" : "#ffffff",
          hoverBorderWidth: 3
        }
      }
    });
    return t({ isDark: a }), (l, d) => (y(), x("div", cu, [
      K(F(nu), {
        data: F(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), se = /* @__PURE__ */ J(du, [["__scopeId", "data-v-bacd3848"]]), uu = { class: "chart-container" }, hu = /* @__PURE__ */ et({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    we.register(qc, ma, ba);
    const { isDark: a, colors: n } = nt(at(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              const d = l.data;
              return d.labels.length && d.datasets.length ? d.labels.map((u, h) => {
                const f = l.getDatasetMeta(0), g = d.datasets[0], p = g.data[h], _ = Array.isArray(g.backgroundColor) ? g.backgroundColor[h] : g.backgroundColor;
                return {
                  text: `${i(u)}: ${p}`,
                  fillStyle: _,
                  hidden: f.data[h]?.hidden || !1,
                  index: h
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              const d = l.label || "", u = l.parsed || 0, h = l.dataset.data.reduce((g, p) => g + p, 0), f = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${f}%)`;
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
    return t({ isDark: a }), (l, d) => (y(), x("div", uu, [
      K(F(ou), {
        data: F(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ws = /* @__PURE__ */ J(hu, [["__scopeId", "data-v-23a84317"]]), fu = { class: "chart-container" }, gu = ["viewBox"], pu = ["transform"], vu = ["x", "width", "fill", "stroke"], bu = ["fill"], mu = ["x1", "y1", "x2", "y2", "stroke"], _u = ["points", "fill"], yu = ["x1", "y1", "x2", "y2", "stroke"], xu = ["x", "y", "fill"], ku = ["x1", "y1", "x2", "y2", "stroke"], wu = ["points", "fill"], Mu = ["transform"], Su = ["y1", "y2"], $u = ["y1", "y2"], Cu = ["y1", "y2"], Du = ["y1", "y2"], Au = ["y", "height"], Tu = ["y1", "y2"], Bu = ["y1", "y2"], Fu = ["y1", "y2"], Pu = ["y1", "y2"], Lu = ["y", "height"], Eu = ["cy", "stroke", "onMouseenter"], Ru = ["cy", "stroke", "onMouseenter"], Ou = ["cy", "stroke", "onMouseenter"], Iu = ["cy", "stroke", "onMouseenter"], zu = ["y1", "y2", "onMouseenter"], Nu = ["y1", "y2", "onMouseenter"], Wu = ["x", "y", "fill"], Hu = ["x", "y", "fill"], Vu = ["transform"], ju = { transform: "translate(-200, 0)" }, Yu = ["stroke"], qu = ["fill"], Uu = { transform: "translate(-130, 0)" }, Xu = ["stroke"], Ku = ["fill"], Gu = { transform: "translate(-60, 0)" }, Zu = ["stroke"], Qu = ["fill"], Ju = { transform: "translate(10, 0)" }, th = ["stroke"], eh = ["fill"], sh = { transform: "translate(80, 0)" }, ah = ["fill"], nh = { transform: "translate(150, 0)" }, oh = ["fill"], ih = /* @__PURE__ */ et({
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
    const s = e, { isDark: a } = nt(at(s, "theme")), n = D(() => ({
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
    })), o = ft({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, g) => {
      const p = f.currentTarget.closest("svg");
      if (!p) return;
      const _ = p.getBoundingClientRect(), b = p.createSVGPoint();
      b.x = f.clientX - _.left, b.y = f.clientY - _.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: g
      };
    }, l = (f) => {
      if (o.value.visible) {
        const g = f.currentTarget, p = g.getBoundingClientRect(), _ = g.createSVGPoint();
        _.x = f.clientX - p.left, _.y = f.clientY - p.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, v = (b - 1) / 9, m = s.chartMargin + p - v * p;
        f.push({ value: b, y: m });
      }
      return f;
    });
    return t({ isDark: a }), (f, g) => (y(), x("div", fu, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: _t(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          c("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: n.value.tooltipBg,
            rx: "6",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, vu),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, S(o.value.text), 9, bu)
        ], 8, pu)) : W("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, mu),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, _u),
        (y(!0), x(U, null, Q(h.value, (p, _) => (y(), x(U, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, yu),
          c("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, S(p.value), 9, xu)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, ku),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, wu),
        (y(!0), x(U, null, Q(e.boxplotData, (p, _) => (y(), x(U, { key: _ }, [
          c("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            p.isTotal ? (y(), x(U, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Su),
              c("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, $u),
              c("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Cu),
              c("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Du),
              c("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Au)
            ], 64)) : (y(), x(U, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Tu),
              c("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Bu),
              c("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Fu),
              c("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Pu),
              c("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Lu)
            ], 64)),
            c("circle", {
              cx: 0,
              cy: p.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Min: ${p.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Eu),
            c("circle", {
              cx: 0,
              cy: p.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q1: ${p.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ru),
            c("circle", {
              cx: 0,
              cy: p.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q3: ${p.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ou),
            c("circle", {
              cx: 0,
              cy: p.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Max: ${p.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Iu),
            c("line", {
              x1: -24,
              y1: p.medianY,
              x2: 24,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Median: ${p.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, zu),
            p.averageY ? (y(), x("line", {
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
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Nu)) : W("", !0)
          ], 8, Mu),
          c("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, S(i(p.label)), 9, Wu),
          p.responseCount ? (y(), x("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + S(p.responseCount), 9, Hu)) : W("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", ju, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Yu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, qu)
          ]),
          c("g", Uu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Xu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Ku)
          ]),
          c("g", Gu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Zu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Qu)
          ]),
          c("g", Ju, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, th),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, eh)
          ]),
          c("g", sh, [
            g[0] || (g[0] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, ah)
          ]),
          c("g", nh, [
            g[1] || (g[1] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, oh)
          ])
        ], 8, Vu)) : W("", !0)
      ], 44, gu))
    ]));
  }
}), rh = /* @__PURE__ */ J(ih, [["__scopeId", "data-v-520c623f"]]), lh = { class: "chart-container" }, ch = ["viewBox"], dh = ["transform"], uh = ["x", "y", "width", "height", "fill", "stroke"], hh = ["y", "fill"], fh = ["y", "fill"], gh = ["x1", "y1", "x2", "y2", "stroke"], ph = ["points", "fill"], vh = ["x1", "y1", "x2", "y2", "stroke"], bh = ["x1", "y1", "x2", "y2", "stroke"], mh = ["x", "y", "fill"], _h = ["x", "y", "fill", "transform"], yh = ["x1", "y1", "x2", "y2", "stroke"], xh = ["points", "fill"], kh = ["transform"], wh = ["y1", "y2", "stroke", "onMouseenter"], Mh = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Sh = ["x1", "y1", "x2", "y2", "onMouseenter"], $h = ["x1", "y1", "x2", "y2", "onMouseenter"], Ch = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["x", "y", "fill"], Th = ["x", "y", "fill"], Bh = ["transform"], Fh = { transform: "translate(-180, 0)" }, Ph = ["stroke"], Lh = ["fill"], Eh = { transform: "translate(-120, 0)" }, Rh = ["fill"], Oh = { transform: "translate(-60, 0)" }, Ih = ["fill"], zh = { transform: "translate(0, 0)" }, Nh = ["stroke"], Wh = ["fill"], Hh = { transform: "translate(60, 0)" }, Vh = ["fill"], jh = { transform: "translate(130, 0)" }, Yh = ["fill"], qh = /* @__PURE__ */ et({
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
    const s = e, { isDark: a } = nt(at(s, "theme")), n = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = ft({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, g, p) => {
      const _ = f.currentTarget.closest("svg");
      if (!_) return;
      const b = _.getBoundingClientRect(), v = _.createSVGPoint();
      v.x = f.clientX - b.left, v.y = f.clientY - b.top;
      let m = i(g.label), M = "";
      switch (p) {
        case "body":
          M = `Q1: ${g.q1.toFixed(1)} | Q3: ${g.q3.toFixed(1)}`;
          break;
        case "wick":
          M = `Min: ${g.low.toFixed(1)} | Max: ${g.high.toFixed(1)}`;
          break;
        case "median":
          M = `Median: ${g.median.toFixed(1)}`;
          break;
        case "average":
          M = `Average: ${g.average?.toFixed(1)}`;
          break;
        case "min":
          M = `Min: ${g.low.toFixed(1)}`;
          break;
        case "max":
          M = `Max: ${g.high.toFixed(1)}`;
          break;
      }
      const w = Math.max(180, M.length * 7 + 40), k = 48;
      o.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        title: m,
        text: M,
        width: w,
        height: k
      };
    }, l = (f) => {
      if (o.value.visible) {
        const g = f.currentTarget, p = g.getBoundingClientRect(), _ = g.createSVGPoint();
        _.x = f.clientX - p.left, _.y = f.clientY - p.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, v = (b - 1) / 9, m = s.chartMargin + p - v * p;
        f.push({ value: b, y: m });
      }
      return f;
    });
    return t({ isDark: a }), (f, g) => (y(), x("div", lh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: _t(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          c("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, uh),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(o.value.title), 9, hh),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(o.value.text), 9, fh)
        ], 8, dh)) : W("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, gh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, ph),
        (y(!0), x(U, null, Q(h.value, (p, _) => (y(), x("line", {
          key: `grid-${_}`,
          x1: e.chartMargin,
          y1: p.y,
          x2: e.chartWidth - e.chartMargin,
          y2: p.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, vh))), 128)),
        (y(!0), x(U, null, Q(h.value, (p, _) => (y(), x(U, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, bh),
          c("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, S(p.value), 9, mh)
        ], 64))), 128)),
        c("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, S(i(e.yAxisLabel)), 9, _h),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, yh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, xh),
        (y(!0), x(U, null, Q(e.candlestickData, (p, _) => (y(), x(U, { key: _ }, [
          c("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            c("line", {
              x1: 0,
              y1: p.highY,
              x2: 0,
              y2: p.lowY,
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, p, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wh),
            c("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(p.q1Y, p.q3Y) - (Math.abs(p.q3Y - p.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(p.q3Y - p.q1Y)),
              fill: p.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (b) => r(b, p, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            p.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: p.medianY,
              x2: e.candleWidth / 2,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (b) => r(b, p, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh)) : W("", !0),
            p.averageY ? (y(), x("line", {
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
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, $h)) : W("", !0),
            c("circle", {
              cx: 0,
              cy: p.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, p, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ch),
            c("circle", {
              cx: 0,
              cy: p.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, p, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh)
          ], 8, kh),
          c("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, S(i(p.label)), 9, Ah),
          p.responseCount ? (y(), x("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + S(p.responseCount), 9, Th)) : W("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Fh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ph),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Lh)
          ]),
          c("g", Eh, [
            g[0] || (g[0] = c("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Rh)
          ]),
          c("g", Oh, [
            g[1] || (g[1] = c("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Ih)
          ]),
          c("g", zh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Nh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Wh)
          ]),
          c("g", Hh, [
            g[2] || (g[2] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Vh)
          ]),
          c("g", jh, [
            g[3] || (g[3] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Yh)
          ])
        ], 8, Bh)) : W("", !0)
      ], 44, ch))
    ]));
  }
}), Jo = /* @__PURE__ */ J(qh, [["__scopeId", "data-v-61d0259c"]]), Uh = { class: "chart-container" }, Xh = ["viewBox"], Kh = ["transform"], Gh = ["x", "y", "width", "height", "fill", "stroke"], Zh = ["y", "fill"], Qh = ["y", "fill"], Jh = ["x1", "y1", "x2", "y2", "stroke"], tf = ["x1", "y1", "x2", "y2", "stroke"], ef = ["points", "fill"], sf = ["x1", "y1", "x2", "y2", "stroke"], af = ["x", "y", "fill"], nf = ["x", "y", "fill", "transform"], of = ["x1", "y1", "x2", "y2", "stroke"], rf = ["points", "fill"], lf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["x", "y", "fill"], df = ["x", "y", "fill"], uf = ["d"], hf = ["x", "y", "width", "height", "onMouseenter"], ff = ["x1", "y1", "x2", "y2"], gf = ["x", "y"], pf = ["x1", "y1", "x2", "y2"], vf = ["x", "y"], bf = ["x1", "y1", "x2", "y2"], mf = ["x", "y"], _f = ["x1", "y1", "x2", "y2"], yf = ["x", "y"], xf = ["x1", "y1", "x2", "y2"], kf = ["x", "y"], wf = ["x1", "y1", "x2", "y2"], Mf = ["x", "y"], Sf = ["transform"], $f = { transform: "translate(-220, 0)" }, Cf = ["fill"], Df = { transform: "translate(-140, 0)" }, Af = ["fill"], Tf = { transform: "translate(-80, 0)" }, Bf = ["fill"], Ff = { transform: "translate(-20, 0)" }, Pf = ["fill"], Lf = { transform: "translate(60, 0)" }, Ef = ["fill"], Rf = { transform: "translate(130, 0)" }, Of = ["fill"], If = { transform: "translate(180, 0)" }, zf = ["fill"], Nf = /* @__PURE__ */ et({
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
    const s = e, { isDark: a } = nt(at(s, "theme")), n = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = ft({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = D(() => s.chartWidth - s.chartMargin * 2), r = D(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = D(() => i.value / 10 * 0.6), d = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const O = Math.max(...s.histogram.map((H) => H.count || 0), 1), I = Math.max(1, Math.ceil(O * 0.2));
      return O + I;
    }), u = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const O = s.averageScore || 0;
      let I = 0, H = 0;
      if (s.histogram.forEach((X) => {
        const j = X.count || 0;
        I += j;
        const dt = X.score - O;
        H += j * (dt * dt);
      }), I === 0) return 1;
      const G = H / I;
      return Math.sqrt(G) || 1;
    }), h = (O, I, H) => {
      if (H === 0) return 0;
      const G = 1 / (H * Math.sqrt(2 * Math.PI)), X = -0.5 * Math.pow((O - I) / H, 2);
      return G * Math.exp(X);
    }, f = D(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && u.value === 0) return null;
      const O = s.averageScore, I = u.value, H = 100, X = Math.max(...s.histogram.map((rt) => rt.count || 0), 1) / d.value * r.value;
      if (X <= 0) return null;
      let j = 0;
      for (let rt = 0; rt <= H; rt++) {
        const Bt = 1 + 9 * (rt / H), Rt = h(Bt, O, I);
        Rt > j && (j = Rt);
      }
      if (j <= 0) return null;
      const dt = X / j, mt = [];
      for (let rt = 0; rt <= H; rt++) {
        const Bt = 1 + 9 * (rt / H), Rt = h(Bt, O, I) * dt, Wt = p(Bt);
        if (Wt !== null) {
          const tt = s.chartHeight - s.chartBottomMargin - Rt;
          mt.push(`${rt === 0 ? "M" : "L"} ${Wt} ${tt}`);
        }
      }
      return mt.join(" ");
    }), g = D(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const O = i.value / 10;
      return s.histogram.map((I, H) => {
        const G = s.chartMargin + (H + 0.5) * O, X = I.count > 0 ? I.count / d.value * r.value : 0, j = s.chartHeight - s.chartBottomMargin - X;
        return {
          score: I.score,
          count: I.count,
          x: G,
          y: j,
          height: X
        };
      });
    }), p = (O) => {
      if (O < 1 || O > 10) return null;
      const I = i.value / 10;
      return s.chartMargin + (O - 0.5) * I;
    }, _ = D(() => p(s.minScore)), b = D(() => p(s.maxScore)), v = D(() => p(s.q1Score)), m = D(() => p(s.medianScore)), M = D(() => p(s.q3Score)), w = D(() => p(s.averageScore)), k = D(() => s.minScore), $ = D(() => s.maxScore), C = D(() => s.q1Score), T = D(() => s.medianScore), P = D(() => s.q3Score), z = D(() => s.averageScore), E = D(() => {
      const O = [], I = s.chartMargin - 8, H = 18;
      v.value !== null && O.push({
        x: v.value,
        y: I,
        value: s.q1Score,
        label: `Q1: ${C.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), m.value !== null && O.push({
        x: m.value,
        y: I - H,
        value: s.medianScore,
        label: `Median: ${T.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), w.value !== null && O.push({
        x: w.value,
        y: I - H,
        value: s.averageScore,
        label: `Avg: ${z.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), M.value !== null && O.push({
        x: M.value,
        y: I,
        value: s.q3Score,
        label: `Q3: ${P.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), O.sort((j, dt) => (j.x || 0) - (dt.x || 0));
      const G = [[], [], []];
      O.forEach((j) => {
        if (j.x === null) return;
        let dt = -1;
        for (let mt = 0; mt < G.length; mt++) {
          let rt = !1;
          for (const Bt of G[mt]) {
            if (Bt.x === null) continue;
            const Rt = Math.abs(j.x - Bt.x), Wt = (j.width + Bt.width) / 2 + 10;
            if (Rt < Wt) {
              rt = !0;
              break;
            }
          }
          if (!rt) {
            dt = mt;
            break;
          }
        }
        dt === -1 && (dt = G.length - 1), j.y = I - dt * H, G[dt].push(j);
      });
      const X = 15;
      return O.forEach((j) => {
        j.y < X && (j.y = X);
      }), O;
    }), N = (O) => E.value.find((H) => H.id === O)?.y || s.chartMargin - 10, Y = D(() => {
      const O = [];
      for (let H = 0; H <= 5; H++) {
        const G = Math.round(d.value / 5 * H), X = s.chartHeight - s.chartBottomMargin - H / 5 * r.value;
        O.push({ value: G, y: X });
      }
      return O;
    }), A = (O, I) => {
      const H = O.currentTarget.closest("svg");
      if (!H) return;
      const G = H.getBoundingClientRect(), X = H.createSVGPoint();
      X.x = O.clientX - G.left, X.y = O.clientY - G.top;
      const j = `Score: ${I.score}`, dt = `Count: ${I.count}`, mt = 120, rt = 48;
      o.value = {
        visible: !0,
        x: X.x,
        y: X.y - 20,
        title: j,
        text: dt,
        width: mt,
        height: rt
      };
    }, B = (O) => {
      if (o.value.visible) {
        const I = O.currentTarget, H = I.getBoundingClientRect(), G = I.createSVGPoint();
        G.x = O.clientX - H.left, G.y = O.clientY - H.top, o.value.x = G.x, o.value.y = G.y - 20;
      }
    }, L = () => {
      o.value.visible = !1;
    }, R = () => {
      o.value.visible = !1;
    };
    return t({ isDark: a }), (O, I) => (y(), x("div", Uh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: _t(`min-height: ${e.chartHeight}px;`),
        onMousemove: B,
        onMouseleave: L
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          c("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Gh),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(o.value.title), 9, Zh),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(o.value.text), 9, Qh)
        ], 8, Kh)) : W("", !0),
        (y(!0), x(U, null, Q(Y.value, (H, G) => (y(), x("line", {
          key: `grid-${G}`,
          x1: e.chartMargin,
          y1: H.y,
          x2: e.chartWidth - e.chartMargin,
          y2: H.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Jh))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, tf),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, ef),
        (y(!0), x(U, null, Q(Y.value, (H, G) => (y(), x(U, {
          key: `y-tick-${G}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: H.y,
            x2: e.chartMargin,
            y2: H.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, sf),
          c("text", {
            x: e.chartMargin - 12,
            y: H.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, S(H.value), 9, af)
        ], 64))), 128)),
        c("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, nf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, of),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, rf),
        (y(!0), x(U, null, Q(g.value, (H, G) => (y(), x(U, {
          key: `tick-${G}`
        }, [
          c("line", {
            x1: H.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: H.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lf),
          c("text", {
            x: H.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, S(H.score), 9, cf)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, df),
        f.value ? (y(), x("path", {
          key: 1,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, uf)) : W("", !0),
        (y(!0), x(U, null, Q(g.value, (H, G) => (y(), x("rect", {
          key: `bar-${G}`,
          x: H.x - l.value / 2,
          y: H.y,
          width: l.value,
          height: H.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (X) => A(X, H),
          onMouseleave: R,
          style: { cursor: "pointer" }
        }, null, 40, hf))), 128)),
        _.value ? (y(), x("line", {
          key: 2,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ff)) : W("", !0),
        _.value ? (y(), x("text", {
          key: 3,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + S(k.value.toFixed(1)), 9, gf)) : W("", !0),
        v.value ? (y(), x("line", {
          key: 4,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, pf)) : W("", !0),
        v.value ? (y(), x("text", {
          key: 5,
          x: v.value,
          y: N("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + S(C.value.toFixed(1)), 9, vf)) : W("", !0),
        m.value ? (y(), x("line", {
          key: 6,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, bf)) : W("", !0),
        m.value ? (y(), x("text", {
          key: 7,
          x: m.value,
          y: N("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + S(T.value.toFixed(1)), 9, mf)) : W("", !0),
        w.value ? (y(), x("line", {
          key: 8,
          x1: w.value,
          y1: e.chartMargin,
          x2: w.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, _f)) : W("", !0),
        w.value ? (y(), x("text", {
          key: 9,
          x: w.value,
          y: N("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + S(z.value.toFixed(1)), 9, yf)) : W("", !0),
        M.value ? (y(), x("line", {
          key: 10,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, xf)) : W("", !0),
        M.value ? (y(), x("text", {
          key: 11,
          x: M.value,
          y: N("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + S(P.value.toFixed(1)), 9, kf)) : W("", !0),
        b.value ? (y(), x("line", {
          key: 12,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, wf)) : W("", !0),
        b.value ? (y(), x("text", {
          key: 13,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + S($.value.toFixed(1)), 9, Mf)) : W("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", $f, [
            I[0] || (I[0] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, Cf)
          ]),
          c("g", Df, [
            I[1] || (I[1] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Af)
          ]),
          c("g", Tf, [
            I[2] || (I[2] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Bf)
          ]),
          c("g", Ff, [
            I[3] || (I[3] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Pf)
          ]),
          c("g", Lf, [
            I[4] || (I[4] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Ef)
          ]),
          c("g", Rf, [
            I[5] || (I[5] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Of)
          ]),
          c("g", If, [
            I[6] || (I[6] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, zf)
          ])
        ], 8, Sf)) : W("", !0)
      ], 44, Xh))
    ]));
  }
}), ti = /* @__PURE__ */ J(Nf, [["__scopeId", "data-v-64e657d9"]]), Wf = { class: "chart-container" }, Hf = {
  key: 1,
  class: "chart-wrapper"
}, Vf = /* @__PURE__ */ et({
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
    Ma.use([ri, li, ci, di]);
    const s = e, { isDark: a, colors: n } = nt(at(s, "theme")), o = ft(null), i = ft(!0), r = ft(!1);
    let l = null;
    const d = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, u = [
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
      const M = s.data.links.filter(
        (C) => C.source && C.target && typeof C.value == "number"
      ), w = Math.max(...M.map((C) => C.value), 1), k = Math.max(1, w * 0.01), $ = M.map((C) => ({
        ...C,
        originalValue: C.value,
        value: C.value < w * 0.01 ? k : C.value
      }));
      return {
        nodes: s.data.nodes.filter((C) => C.name),
        links: $
      };
    }, f = (M) => M.map((w, k) => ({
      ...w,
      itemStyle: {
        color: s.nodeColors[w.name] || u[k % u.length],
        borderRadius: 8
      }
    })), g = (M) => (w) => {
      const k = w.dataType === "node", $ = n.value.tooltipText, C = a.value ? "#d1d5db" : "#e2e8f0";
      if (k) {
        const N = M.filter((B) => B.target === w.name), Y = M.filter((B) => B.source === w.name), A = N.length > 0 ? N.reduce((B, L) => B + (L.originalValue || L.value), 0) : Y.reduce((B, L) => B + (L.originalValue || L.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${w.name}</div><div style="color: ${C}; font-size: 12px;">Count: ${A.toLocaleString()}</div>`;
      }
      const T = w.data?.source || w.source || "Unknown", P = w.data?.target || w.target || "Unknown", z = w.data?.originalValue || w.data?.value || w.value || 0, E = w.data?.label || `${z.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${T} → ${P}</div><div style="color: ${C}; font-size: 12px;">Flow: ${E}</div>`;
    }, p = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: M, links: w } = h(), k = f(M), $ = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: g(w),
              backgroundColor: n.value.tooltipBg,
              borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
              borderWidth: 1,
              borderRadius: 8,
              padding: [10, 14],
              textStyle: {
                color: n.value.tooltipText,
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
                data: k,
                links: w,
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
                itemStyle: d.style,
                label: {
                  show: !0,
                  position: "inside",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (C) => {
                    const T = C.name || "";
                    return T.length > 15 ? `${T.substring(0, 15)}...` : T;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (C) => {
                    const T = C.data?.originalValue || C.value || 0;
                    return C.data?.label || `${T.toLocaleString()}`;
                  }
                },
                nodeAlign: d.node.align,
                nodeGap: s.nodeGap,
                nodeWidth: d.node.width,
                layoutIterations: d.node.iterations,
                orient: "horizontal",
                draggable: !1,
                ...d.margins
              }
            ],
            backgroundColor: "transparent",
            animation: !0,
            animationDuration: d.animation.duration,
            animationEasing: d.animation.easing
          };
          l.setOption($);
        } catch (M) {
          console.error("Error setting Sankey chart options:", M), r.value = !0;
        }
    }, _ = async () => {
      if (o.value)
        try {
          l = Ma.init(o.value), p(), window.addEventListener("resize", v);
        } catch (M) {
          console.error("Error initializing Sankey chart:", M), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, b = async (M = 40) => {
      await Jn();
      for (let w = 0; w < M; w++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await _();
        await new Promise((k) => setTimeout(k, 50));
      }
      await _(), setTimeout(v, 50);
    }, v = () => l?.resize(), m = () => {
      window.removeEventListener("resize", v), l && (l.dispose(), l = null);
    };
    return gs(() => o.value && b()), oi(m), Xt(() => s.data, p, { deep: !0 }), Xt(a, p), t({ isDark: a }), (M, w) => (y(), x("div", Wf, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: _t({ height: e.height })
      }, [...w[0] || (w[0] = [
        q('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Hf, [
        ka(c("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: _t({ height: e.height })
        }, null, 4), [
          [wa, !i.value]
        ]),
        ka(c("div", {
          class: "loading-state",
          style: _t({ height: e.height })
        }, [...w[1] || (w[1] = [
          q('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [wa, i.value]
        ])
      ]))
    ]));
  }
}), ae = /* @__PURE__ */ J(Vf, [["__scopeId", "data-v-d6d61034"]]);
function jf(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    })
  ]);
}
function Yf(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Tt(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
function qf(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Un(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    })
  ]);
}
function Uf(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Xf(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    })
  ]);
}
function Kf(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    })
  ]);
}
function Gf(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    })
  ]);
}
const Zf = { class: "chart-footer" }, Qf = { class: "export-actions" }, Jf = { class: "export-buttons" }, tg = ["disabled"], eg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, sg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ag = ["disabled"], ng = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, og = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ig = /* @__PURE__ */ et({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = (i) => s.formats.includes(i), o = (i) => {
      s.loading || a("export", i);
    };
    return (i, r) => (y(), x("footer", Zf, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", Qf, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", Jf, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: At(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", eg, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", sg, [...r[3] || (r[3] = [
              q('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, tg)) : W("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: At(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", ng, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", og, [...r[6] || (r[6] = [
              c("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
              c("polyline", { points: "14 2 14 8 20 8" }, null, -1),
              c("line", {
                x1: "12",
                y1: "18",
                x2: "12",
                y2: "12"
              }, null, -1),
              c("line", {
                x1: "9",
                y1: "15",
                x2: "15",
                y2: "15"
              }, null, -1)
            ])])),
            r[7] || (r[7] = c("span", null, "CSV", -1))
          ], 10, ag)) : W("", !0)
        ])
      ])
    ]));
  }
}), pt = /* @__PURE__ */ J(ig, [["__scopeId", "data-v-672661d4"]]), rg = { class: "agents-per-day-card" }, lg = {
  key: 0,
  class: "card-body"
}, cg = {
  key: 0,
  class: "chart-section"
}, dg = {
  key: 1,
  class: "empty-state"
}, ug = { class: "empty-state-content" }, hg = { class: "empty-icon-wrapper" }, fg = {
  key: 1,
  class: "loading-state"
}, gg = /* @__PURE__ */ et({
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
    }, n = e, o = s, i = (f) => {
      o("export", f);
    }, { isDark: r, colors: l } = nt(at(n, "theme")), d = (f) => {
      const g = new Date(f), p = String(g.getDate()).padStart(2, "0"), _ = String(g.getMonth() + 1).padStart(2, "0");
      return `${p}-${_}`;
    }, u = D(() => {
      const f = n.data?.agents_by_day || {}, g = Object.keys(f).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.map((M) => d(M)), _ = /* @__PURE__ */ new Set();
      for (const M of Object.values(f))
        for (const w of Object.keys(M))
          _.add(w);
      const b = Array.from(_), v = (M) => M, m = b.map((M) => ({
        label: M,
        data: g.map((w) => f[w]?.[M] || 0),
        backgroundColor: `${a[M] || "#94a3b8"}80`,
        borderColor: v(a[M] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: p,
        datasets: m
      };
    }), h = D(() => n.options ? n.options : {
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
    return t({ isDark: r }), (f, g) => (y(), x("article", rg, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", fg, [...g[2] || (g[2] = [
        q('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", lg, [
        u.value.labels && u.value.labels.length ? (y(), x("section", cg, [
          K(Kt, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", dg, [
          c("div", ug, [
            c("div", hg, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            g[1] || (g[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), pg = /* @__PURE__ */ J(gg, [["__scopeId", "data-v-4d18c22c"]]), V = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), ot = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), vg = { class: "booking-manager-card" }, bg = { class: "card-header" }, mg = { class: "header-content" }, _g = {
  key: 0,
  class: "payment-success-badge"
}, yg = {
  key: 0,
  class: "currency-breakdown-list"
}, xg = {
  key: 1,
  class: "badge-value"
}, kg = {
  key: 0,
  class: "loading-state"
}, wg = {
  key: 1,
  class: "error-state"
}, Mg = { class: "error-content" }, Sg = { class: "error-description" }, $g = {
  key: 2,
  class: "card-body"
}, Cg = { class: "chart-section" }, Dg = { class: "chart-wrapper" }, Ag = {
  key: 0,
  class: "table-section"
}, Tg = { class: "table-wrapper" }, Bg = { class: "data-table" }, Fg = { class: "table-body" }, Pg = { class: "table-cell font-medium" }, Lg = { class: "table-cell text-center" }, Eg = { class: "table-cell text-center" }, Rg = { class: "percentage-text" }, Og = { class: "table-cell text-center" }, Ig = { class: "table-cell" }, zg = { class: "badges-container" }, Ng = { class: "badge badge-success" }, Wg = { class: "badge badge-error" }, Hg = { class: "table-cell" }, Vg = {
  key: 0,
  class: "badges-container"
}, jg = {
  key: 1,
  class: "percentage-text"
}, Yg = { class: "table-cell" }, qg = { class: "badges-container" }, Ug = { class: "badge badge-error" }, Xg = { class: "badge badge-warning" }, Kg = { class: "badge badge-yellow" }, Gg = { class: "badge badge-error" }, Zg = {
  key: 1,
  class: "empty-state"
}, Is = 3, Qg = /* @__PURE__ */ et({
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
    const s = e, a = t, n = (b) => {
      a("export", b);
    }, o = ft(!1), i = D(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (b, v) => new Date(b.date).getTime() - new Date(v.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, Is)), l = D(() => i.value.length > Is), d = D(() => s.data?.total_payment_success_value || []), u = (b) => b.payment_success_value || [], h = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce((v, m) => v + (m.count || 0), 0), f = (b) => ot(b), g = D(() => {
      const b = s.data, v = b.total_booking_initiated || 0, m = b.total_booking_started || 0, M = b.total_payment_initiated || 0, w = b.total_not_found || 0, k = b.total_cancelled || 0, $ = b.total_no_pending_balance || 0, C = b.total_errors || 0, T = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce((B, L) => B + (L.count || 0), 0), P = b.total_payment_failed || 0, z = Math.max(0, v - m), E = Math.max(0, m - M - w - k - $ - C), N = (B, L) => {
        const R = L > 0 ? Math.round(B / L * 100) : 0;
        return `${B.toLocaleString()} (${R}%)`;
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
      ], A = [];
      return m > 0 && A.push({
        source: "Initiated",
        target: "Started",
        value: m,
        label: N(m, v)
      }), z > 0 && A.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: z,
        label: N(z, v)
      }), M > 0 && A.push({
        source: "Started",
        target: "Payment Initiated",
        value: M,
        label: N(M, m)
      }), w > 0 && A.push({
        source: "Started",
        target: "Not Found",
        value: w,
        label: N(w, m)
      }), k > 0 && A.push({
        source: "Started",
        target: "Cancelled",
        value: k,
        label: N(k, m)
      }), $ > 0 && A.push({
        source: "Started",
        target: "No Pending Balance",
        value: $,
        label: N($, m)
      }), C > 0 && A.push({
        source: "Started",
        target: "Errors",
        value: C,
        label: N(C, m)
      }), E > 0 && A.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: N(E, m)
      }), T > 0 && A.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: N(T, M)
      }), P > 0 && A.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: P,
        label: N(P, M)
      }), { nodes: Y, links: A };
    }), p = {
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
    }, _ = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`;
    return (b, v) => (y(), x("article", vg, [
      c("header", bg, [
        c("div", mg, [
          v[2] || (v[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? W("", !0) : (y(), x("div", _g, [
            v[1] || (v[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", yg, [
              (y(!0), x(U, null, Q(d.value, (m) => (y(), x("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, S(m.currency) + " " + S(f(m.total_value)), 1))), 128))
            ])) : (y(), x("p", xg, S(f(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", kg, [...v[3] || (v[3] = [
        q('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (y(), x("div", wg, [
        c("div", Mg, [
          v[4] || (v[4] = c("div", { class: "error-icon-wrapper" }, [
            c("svg", {
              class: "error-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              })
            ])
          ], -1)),
          v[5] || (v[5] = c("p", { class: "error-title" }, "Error loading data", -1)),
          c("p", Sg, S(s.error), 1)
        ])
      ])) : (y(), x("div", $g, [
        c("section", Cg, [
          c("div", Dg, [
            K(ae, {
              data: g.value,
              "node-colors": p,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", Ag, [
          v[8] || (v[8] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", Tg, [
            c("table", Bg, [
              v[6] || (v[6] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Payment Initiated"),
                  c("th", { class: "table-header" }, "Payment Results"),
                  c("th", { class: "table-header" }, "Payment Value"),
                  c("th", { class: "table-header" }, "Outcomes")
                ])
              ], -1)),
              c("tbody", Fg, [
                (y(!0), x(U, null, Q(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", Pg, S(F($t)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", Lg, S(F(V)(m.booking_initiated_count)), 1),
                  c("td", Eg, [
                    Mt(S(F(V)(m.booking_started_count)) + " ", 1),
                    c("span", Rg, " (" + S(_(m.booking_started_count, m.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", Og, S(F(V)(m.payment_initiated_count)), 1),
                  c("td", Ig, [
                    c("div", zg, [
                      c("span", Ng, " Success: " + S(F(V)(h(m))), 1),
                      c("span", Wg, " Failed: " + S(F(V)(m.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", Hg, [
                    u(m).length > 0 ? (y(), x("div", Vg, [
                      (y(!0), x(U, null, Q(u(m), (M) => (y(), x("span", {
                        key: `${m.date}-${M.currency}`,
                        class: "badge badge-currency"
                      }, S(M.currency) + " " + S(f(M.total_value)), 1))), 128))
                    ])) : (y(), x("span", jg, "N/A"))
                  ]),
                  c("td", Yg, [
                    c("div", qg, [
                      c("span", Ug, " Not Found: " + S(m.not_found_count ? F(V)(m.not_found_count) : "N/A"), 1),
                      c("span", Xg, " Cancelled: " + S(m.cancelled_count ? F(V)(m.cancelled_count) : "N/A"), 1),
                      c("span", Kg, " No Balance: " + S(m.no_pending_balance_count ? F(V)(m.no_pending_balance_count) : "N/A"), 1),
                      c("span", Gg, " Errors: " + S(m.error_count ? F(V)(m.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: v[0] || (v[0] = (m) => o.value = !o.value)
          }, [
            Mt(S(o.value ? "View less" : `View more (${i.value.length - Is} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: At(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...v[7] || (v[7] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : W("", !0),
          e.enableExport ? (y(), ut(F(pt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", Zg, [...v[9] || (v[9] = [
          q('<div class="empty-state-content" data-v-15d5c773><div class="empty-icon-wrapper" data-v-15d5c773><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15d5c773><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-15d5c773></path></svg></div><p class="empty-title" data-v-15d5c773>No booking manager data available</p><p class="empty-description" data-v-15d5c773>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Jg = /* @__PURE__ */ J(Qg, [["__scopeId", "data-v-15d5c773"]]), tp = { class: "checkin-metrics-card" }, ep = {
  key: 0,
  class: "loading-state"
}, sp = {
  key: 1,
  class: "card-body"
}, ap = {
  key: 0,
  class: "chart-section"
}, np = { class: "chart-wrapper" }, op = {
  key: 1,
  class: "table-section"
}, ip = { class: "table-wrapper" }, rp = { class: "data-table" }, lp = { class: "table-body" }, cp = { class: "table-cell font-medium" }, dp = { class: "table-cell text-center" }, up = { class: "table-cell text-center" }, hp = { class: "table-cell text-center" }, fp = { class: "table-cell text-center" }, gp = { class: "table-cell text-center" }, pp = { class: "table-cell text-center" }, vp = { class: "table-cell text-left" }, bp = {
  key: 0,
  class: "failed-steps"
}, mp = { class: "step-name" }, _p = { class: "step-count" }, yp = {
  key: 1,
  class: "empty-cell"
}, xp = {
  key: 2,
  class: "empty-state"
}, kp = {
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
    const s = t, a = (b) => {
      s("export", b);
    }, n = e, o = {
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
    }, r = ft([]), l = D(() => {
      const b = n.data;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...o, ...b } : n.checkinData ?? o;
    }), d = D(() => {
      const b = n.data;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: b.total_checkin_failed ?? 0,
        total_checkin_unrecovered: b.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? [],
        unrecovered_by_day: b.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = D(() => {
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
      return (d.value.unrecovered_by_step || []).forEach((m) => {
        const w = m.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), k = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[w] = k[w] || "#DC2626";
      }), b;
    }), h = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, f = (b, v) => {
      const m = V(b), M = h(b, v);
      return `${m} (${M})`;
    }, g = (b) => b.reduce((v, m) => v + m.failed_count, 0), p = D(() => {
      const b = [], v = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: b, links: v };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const m = l.value.total_checkin_initiated, M = l.value.total_checkin_init, w = l.value.total_checkin_init_abandoned, k = M - w, $ = l.value.total_checkin_started, C = l.value.total_checkin_completed, T = l.value.total_checkin_closed, P = d.value.unrecovered_by_step || [], z = P.reduce((A, B) => A + B.count, 0);
      if (M > 0) {
        const A = Math.round(M / m * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${A}%)`
        });
      }
      const E = m - M;
      if (E > 0) {
        const A = Math.round(E / m * 100);
        b.push({ name: "Abandoned (Init)" }), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: E,
          label: `${E.toLocaleString()} (${A}%)`
        });
      }
      if (w > 0) {
        const A = Math.round(w / m * 100);
        b.push({ name: "Abandoned (Started)" }), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: w,
          label: `${w.toLocaleString()} (${A}%)`
        });
      }
      if (k > 0) {
        const A = Math.round(k / m * 100);
        v.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: k,
          label: `${k.toLocaleString()} (${A}%)`
        });
      }
      if ($ > 0) {
        const A = Math.round($ / m * 100);
        v.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${A}%)`
        });
      }
      if (C > 0) {
        const A = Math.round(C / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Completed",
          value: C,
          label: `${C.toLocaleString()} (${A}%)`
        });
      }
      if (P.length > 0 && z > 0) {
        b.push({ name: "Unrecovered" });
        const A = Math.round(z / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: z,
          label: `${z.toLocaleString()} (${A}%)`
        }), P.forEach((B) => {
          const R = B.step_name.replace(/_/g, " ").split(" ").map((I) => I.charAt(0).toUpperCase() + I.slice(1)).join(" "), O = Math.round(B.count / $ * 100);
          b.push({ name: R }), v.push({
            source: "Unrecovered",
            target: R,
            value: B.count,
            label: `${B.count.toLocaleString()} (${O}%)`
          });
        });
      }
      const N = $ - (C + z);
      if (N > 0) {
        const A = Math.round(N / $ * 100);
        b.push({ name: "Abandoned (Flow)" }), v.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${A}%)`
        });
      }
      const Y = C - T;
      if (Y > 0) {
        const A = Math.round(Y / $ * 100);
        b.push({ name: "BP Error" }), v.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${A}%)`
        });
      }
      if (T > 0) {
        const A = Math.round(T / $ * 100);
        v.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${A}%)`
        });
      }
      return { nodes: b, links: v };
    }), _ = () => {
      const b = l.value.checkin_by_day || [], v = d.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...b].map((m) => {
        const M = v.find(
          (w) => w.date === m.date
        );
        return {
          ...m,
          failed_steps: M?.steps || []
        };
      }), r.value.sort((m, M) => new Date(m.date) - new Date(M.date));
    };
    return Xt(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (b, v) => (y(), x("article", tp, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", ep, [...v[0] || (v[0] = [
        q('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", sp, [
        p.value.nodes.length > 0 ? (y(), x("section", ap, [
          c("div", np, [
            K(ae, {
              data: p.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : W("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", op, [
          c("div", ip, [
            c("table", rp, [
              v[1] || (v[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Checkin Init"),
                  c("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  c("th", { class: "table-header" }, "Number of Passengers"),
                  c("th", { class: "table-header" }, "Completed (%)"),
                  c("th", { class: "table-header" }, "Closed with BP (%)"),
                  c("th", { class: "table-header" }, "Failed (%)"),
                  c("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              c("tbody", lp, [
                (y(!0), x(U, null, Q(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", cp, S(F($t)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", dp, S(F(V)(m.checkin_initiated_count)), 1),
                  c("td", up, S(f(m.checkin_init_count, m.checkin_initiated_count)), 1),
                  c("td", hp, S(F(V)(m.checkin_started_count)), 1),
                  c("td", fp, S(f(m.checkin_completed_count, m.checkin_started_count)), 1),
                  c("td", gp, S(f(m.checkin_closed_count, m.checkin_started_count)), 1),
                  c("td", pp, S(f(g(m.failed_steps), m.checkin_started_count)), 1),
                  c("td", vp, [
                    m.failed_steps && m.failed_steps.length > 0 ? (y(), x("div", bp, [
                      (y(!0), x(U, null, Q(m.failed_steps, (M) => (y(), x("div", {
                        key: M.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", mp, S(M.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", _p, S(M.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", yp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", xp, [...v[2] || (v[2] = [
          q('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, wp = /* @__PURE__ */ J(kp, [["__scopeId", "data-v-d527da09"]]), Mp = { class: "checkin-metrics-card" }, Sp = {
  key: 0,
  class: "loading-state"
}, $p = {
  key: 1,
  class: "card-body"
}, Cp = {
  key: 0,
  class: "sankey-section"
}, Dp = {
  key: 1,
  class: "table-section"
}, Ap = { class: "table-wrapper" }, Tp = { class: "data-table" }, Bp = { class: "table-body" }, Fp = { class: "table-cell date-cell" }, Pp = { class: "table-cell text-center" }, Lp = { class: "table-cell text-center" }, Ep = { class: "table-cell text-center" }, Rp = { class: "table-cell text-center" }, Op = { class: "table-cell text-center" }, Ip = { class: "table-cell text-center" }, zp = { class: "table-cell reasons-cell" }, Np = {
  key: 0,
  class: "reasons-list"
}, Wp = { class: "reason-name" }, Hp = { class: "reason-count" }, Vp = {
  key: 1,
  class: "no-reasons"
}, jp = {
  key: 2,
  class: "empty-state"
}, Yp = { class: "empty-state-content" }, qp = { class: "empty-icon-wrapper" }, zs = 3, Up = /* @__PURE__ */ et({
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
      total_checkin_init_abandoned_error: null,
      total_checkin_init_abandoned_voluntary: null,
      total_checkin_pre_init_abandoned_error: null,
      total_checkin_pre_init_abandoned_voluntary: null,
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
    const a = e, n = s, o = (M) => {
      n("export", M);
    }, { isDark: i } = nt(at(a, "theme")), r = (M) => M == null ? "0" : M.toLocaleString(), l = (M) => {
      const w = new Date(M), k = String(w.getDate()).padStart(2, "0"), $ = String(w.getMonth() + 1).padStart(2, "0"), C = w.getFullYear();
      return `${k}/${$}/${C}`;
    }, d = (M) => M.replace(/_/g, " ").replace(/\b\w/g, (w) => w.toUpperCase()), u = (M, w) => !w || w === 0 ? "0%" : `${Math.round(M / w * 100)}%`, h = (M, w) => {
      const k = M || 0, $ = w || 0, C = r(k), T = u(k, $);
      return `${C} (${T})`;
    }, f = (M) => M ? M.reduce((w, k) => w + k.failed_count, 0) : 0, g = D(() => {
      const M = {
        "Checkin Init": "#93C5FD",
        "Booking retrive": "#C7D2FE",
        "Booking retrive success": "#A5B4FC",
        "Number of Passengers": "#8B8CF6",
        Completed: "#A7F3D0",
        "Closed with BP": "#7BE39E",
        "Abandoned (Init)": "#FACC15",
        "Booking not retreived": "#F87171",
        "Abandoned (Started)": "#FACC15",
        Error: "#F87171",
        "Abandoned (Flow)": "#FACC15",
        "BP Error": "#EF4444",
        Unrecovered: "#F87171"
      };
      return (a.failedData?.unrecovered_by_step || []).forEach((k) => {
        const C = k.step_name.replace(/_/g, " ").split(" ").map((P) => P.charAt(0).toUpperCase() + P.slice(1)).join(" "), T = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        M[C] = T[C] || "#DC2626";
      }), M;
    }), p = ft(!1), _ = D(() => {
      const M = a.checkinData?.checkin_by_day || [], w = a.failedData?.failed_by_step_by_day || [];
      return M.map(($) => {
        const C = w.find((T) => T.date === $.date);
        return {
          ...$,
          failed_steps: C?.steps || []
        };
      }).sort(($, C) => new Date($.date).getTime() - new Date(C.date).getTime());
    }), b = D(() => p.value ? _.value : _.value.slice(0, zs)), v = D(() => _.value.length > zs), m = D(() => {
      const M = [], w = [], k = /* @__PURE__ */ new Set(), $ = (tt) => {
        k.has(tt) || (M.push({ name: tt }), k.add(tt));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: M, links: w };
      $("Checkin Init"), $("Booking retrive"), $("Booking retrive success"), $("Number of Passengers"), $("Completed"), $("Closed with BP");
      const C = a.checkinData.total_checkin_initiated || 0, T = a.checkinData.total_checkin_init || 0, P = a.checkinData.total_checkin_init_abandoned || 0, z = a.checkinData.total_checkin_pre_init_abandoned_error, E = a.checkinData.total_checkin_pre_init_abandoned_voluntary, N = z != null || E != null, Y = N ? Math.max(Number(z) || 0, 0) : 0, A = N ? Math.max(Number(E) || 0, 0) : 0, B = a.checkinData.total_checkin_init_abandoned_error, L = a.checkinData.total_checkin_init_abandoned_voluntary, R = B != null || L != null, O = R ? Math.max(Number(B) || 0, 0) : 0, I = R ? Math.max(Number(L) || 0, 0) : 0, H = R ? Math.max(P - O - I, 0) : P, G = T - P, X = a.checkinData.total_checkin_started || 0, j = a.checkinData.total_checkin_completed || 0, dt = a.checkinData.total_checkin_closed || 0, mt = a.failedData?.unrecovered_by_step || [], rt = mt.reduce((tt, ge) => tt + ge.count, 0);
      if (T > 0) {
        const tt = Math.round(T / C * 100);
        w.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: T,
          label: `${T.toLocaleString()} (${tt}%)`
        });
      }
      const Bt = C - T;
      if (N) {
        if (A > 0) {
          const tt = Math.round(A / C * 100);
          $("Abandoned (Init)"), w.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: A,
            label: `${A.toLocaleString()} (${tt}%)`
          });
        }
        if (Y > 0) {
          const tt = Math.round(Y / C * 100);
          $("Booking not retreived"), w.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: Y,
            label: `${Y.toLocaleString()} (${tt}%)`
          });
        }
      } else if (Bt > 0) {
        const tt = Math.round(Bt / C * 100);
        $("Abandoned (Init)"), w.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Bt,
          label: `${Bt.toLocaleString()} (${tt}%)`
        });
      }
      if (R) {
        if (O > 0) {
          const tt = Math.round(O / C * 100);
          $("Error"), w.push({
            source: "Booking retrive",
            target: "Error",
            value: O,
            label: `${O.toLocaleString()} (${tt}%)`
          });
        }
        if (I > 0) {
          const tt = Math.round(I / C * 100);
          $("Abandoned (Started)"), w.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: I,
            label: `${I.toLocaleString()} (${tt}%)`
          });
        }
        if (H > 0) {
          const tt = Math.round(H / C * 100);
          $("Abandoned (Started)"), w.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${tt}%)`
          });
        }
      } else if (P > 0) {
        const tt = Math.round(P / C * 100);
        $("Abandoned (Started)"), w.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${tt}%)`
        });
      }
      if (G > 0) {
        const tt = Math.round(G / C * 100);
        w.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: G,
          label: `${G.toLocaleString()} (${tt}%)`
        });
      }
      if (X > 0) {
        const tt = Math.round(X / C * 100);
        w.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: X,
          label: `${X.toLocaleString()} (${tt}%)`
        });
      }
      if (j > 0) {
        const tt = Math.round(j / X * 100);
        w.push({
          source: "Number of Passengers",
          target: "Completed",
          value: j,
          label: `${j.toLocaleString()} (${tt}%)`
        });
      }
      if (mt.length > 0 && rt > 0) {
        $("Unrecovered");
        const tt = Math.round(rt / X * 100);
        w.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: rt,
          label: `${rt.toLocaleString()} (${tt}%)`
        }), mt.forEach((ge) => {
          const ya = ge.step_name.replace(/_/g, " ").split(" ").map((xa) => xa.charAt(0).toUpperCase() + xa.slice(1)).join(" "), ai = Math.round(ge.count / X * 100);
          $(ya), w.push({
            source: "Unrecovered",
            target: ya,
            value: ge.count,
            label: `${ge.count.toLocaleString()} (${ai}%)`
          });
        });
      }
      const Rt = X - (j + rt);
      if (Rt > 0) {
        const tt = Math.round(Rt / X * 100);
        $("Abandoned (Flow)"), w.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: Rt,
          label: `${Rt.toLocaleString()} (${tt}%)`
        });
      }
      const Wt = j - dt;
      if (Wt > 0) {
        const tt = Math.round(Wt / X * 100);
        $("BP Error"), w.push({
          source: "Completed",
          target: "BP Error",
          value: Wt,
          label: `${Wt.toLocaleString()} (${tt}%)`
        });
      }
      if (dt > 0) {
        const tt = Math.round(dt / X * 100);
        w.push({
          source: "Completed",
          target: "Closed with BP",
          value: dt,
          label: `${dt.toLocaleString()} (${tt}%)`
        });
      }
      return { nodes: M, links: w };
    });
    return t({ isDark: i }), (M, w) => (y(), x("article", Mp, [
      w[6] || (w[6] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Sp, [...w[1] || (w[1] = [
        q('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", $p, [
        m.value.nodes.length > 0 ? (y(), x("div", Cp, [
          K(ae, {
            data: m.value,
            height: "500px",
            "node-colors": g.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : W("", !0),
        _.value && _.value.length > 0 ? (y(), x("div", Dp, [
          c("div", Ap, [
            c("table", Tp, [
              w[2] || (w[2] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Checkin Init"),
                  c("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  c("th", { class: "table-header" }, "Number of Passengers"),
                  c("th", { class: "table-header" }, "Completed (%)"),
                  c("th", { class: "table-header" }, "Closed with BP (%)"),
                  c("th", { class: "table-header" }, "Failed (%)"),
                  c("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              c("tbody", Bp, [
                (y(!0), x(U, null, Q(b.value, (k) => (y(), x("tr", {
                  key: k.date,
                  class: "table-row"
                }, [
                  c("td", Fp, S(l(k.date)), 1),
                  c("td", Pp, S(r(k.checkin_initiated_count)), 1),
                  c("td", Lp, S(h(k.checkin_init_count, k.checkin_initiated_count)), 1),
                  c("td", Ep, S(r(k.checkin_started_count)), 1),
                  c("td", Rp, S(h(k.checkin_completed_count, k.checkin_started_count)), 1),
                  c("td", Op, S(h(k.checkin_closed_count, k.checkin_started_count)), 1),
                  c("td", Ip, S(h(f(k.failed_steps), k.checkin_started_count)), 1),
                  c("td", zp, [
                    k.failed_steps && k.failed_steps.length > 0 ? (y(), x("div", Np, [
                      (y(!0), x(U, null, Q(k.failed_steps, ($) => (y(), x("div", {
                        key: $.step_name,
                        class: "reason-item"
                      }, [
                        c("span", Wp, S(d($.step_name)) + ":", 1),
                        c("span", Hp, S($.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Vp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          v.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: w[0] || (w[0] = (k) => p.value = !p.value)
          }, [
            Mt(S(p.value ? "View less" : `View more (${_.value.length - zs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: At(["view-more-icon", { "view-more-icon-rotated": p.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...w[3] || (w[3] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : W("", !0),
          e.enableExport ? (y(), ut(F(pt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", jp, [
          c("div", Yp, [
            c("div", qp, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            w[4] || (w[4] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            w[5] || (w[5] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Xp = /* @__PURE__ */ J(Up, [["__scopeId", "data-v-eefc834b"]]), Kp = { class: "checkin-segments-card" }, Gp = {
  key: 0,
  class: "loading-state"
}, Zp = {
  key: 1,
  class: "card-body"
}, Qp = {
  key: 0,
  class: "table-section"
}, Jp = { class: "table-wrapper" }, t0 = { class: "data-table" }, e0 = { class: "table-body" }, s0 = { class: "table-cell font-medium text-center" }, a0 = { class: "airport-badge" }, n0 = { class: "table-cell text-center" }, o0 = {
  key: 0,
  class: "airport-badge connection"
}, i0 = {
  key: 1,
  class: "empty-connection"
}, r0 = { class: "table-cell text-center" }, l0 = { class: "airport-badge" }, c0 = { class: "table-cell text-center" }, d0 = {
  key: 0,
  class: "trip-badge roundtrip"
}, u0 = {
  key: 1,
  class: "trip-badge oneway"
}, h0 = { class: "table-cell text-center" }, f0 = { class: "table-cell text-center" }, g0 = { class: "percentage-value" }, p0 = { class: "table-cell text-center" }, v0 = { class: "percentage-value" }, b0 = { class: "table-cell text-center" }, m0 = { class: "percentage-value success" }, _0 = {
  key: 1,
  class: "empty-state"
}, Ns = 3, y0 = /* @__PURE__ */ et({
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
    const a = e, n = s, o = (g) => {
      n("export", g);
    }, { isDark: i } = nt(at(a, "theme")), r = ft(!1), l = D(() => r.value ? a.data : a.data.slice(0, Ns)), d = D(() => a.data.length > Ns), u = (g, p) => !p || p === 0 || !g ? "0%" : `${Math.round(g / p * 100)}%`, h = (g) => !g || g === "None" ? "-" : String(g).trim().replace(/_[0-9]+$/i, ""), f = (g) => {
      const p = h(g?.departure_airport), _ = h(g?.arrival_airport);
      return p === "-" || _ === "-" ? !1 : p === _;
    };
    return t({ isDark: i }), (g, p) => (y(), x("article", Kp, [
      p[7] || (p[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      a.loading ? (y(), x("div", Gp, [...p[1] || (p[1] = [
        q('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", Zp, [
        a.data.length > 0 ? (y(), x("section", Qp, [
          c("div", Jp, [
            c("table", t0, [
              p[4] || (p[4] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Departure"),
                  c("th", { class: "table-header" }, "Connection"),
                  c("th", { class: "table-header" }, "Arrival"),
                  c("th", { class: "table-header" }, "Trip"),
                  c("th", { class: "table-header" }, "Init"),
                  c("th", { class: "table-header" }, "Started (%)"),
                  c("th", { class: "table-header" }, "Completed (%)"),
                  c("th", { class: "table-header" }, "Closed (%)")
                ])
              ], -1)),
              c("tbody", e0, [
                (y(!0), x(U, null, Q(l.value, (_, b) => (y(), x("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  c("td", s0, [
                    c("span", a0, S(h(_.departure_airport)), 1)
                  ]),
                  c("td", n0, [
                    h(_.conexion_airport) !== "-" ? (y(), x("span", o0, S(h(_.conexion_airport)), 1)) : (y(), x("span", i0, "-"))
                  ]),
                  c("td", r0, [
                    c("span", l0, S(h(_.arrival_airport)), 1)
                  ]),
                  c("td", c0, [
                    f(_) ? (y(), x("span", d0, [...p[2] || (p[2] = [
                      c("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        c("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        })
                      ], -1),
                      Mt(" Roundtrip ", -1)
                    ])])) : (y(), x("span", u0, [...p[3] || (p[3] = [
                      c("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        c("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M14 5l7 7m0 0l-7 7m7-7H3"
                        })
                      ], -1),
                      Mt(" One way ", -1)
                    ])]))
                  ]),
                  c("td", h0, S(F(V)(_.segment_init_count)), 1),
                  c("td", f0, [
                    c("span", g0, S(u(_.segment_started_count, _.segment_init_count)), 1)
                  ]),
                  c("td", p0, [
                    c("span", v0, S(u(_.segment_completed_count, _.segment_init_count)), 1)
                  ]),
                  c("td", b0, [
                    c("span", m0, S(u(_.segment_closed_count, _.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (_) => r.value = !r.value)
          }, [
            Mt(S(r.value ? "View less" : `View more (${a.data.length - Ns} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: At(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[5] || (p[5] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : W("", !0),
          e.enableExport ? (y(), ut(F(pt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", _0, [...p[6] || (p[6] = [
          q('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), x0 = /* @__PURE__ */ J(y0, [["__scopeId", "data-v-a1ebd82a"]]), k0 = { class: "disruption-metrics-card" }, w0 = { class: "card-header" }, M0 = { class: "header-content" }, S0 = {
  key: 0,
  class: "payment-success-badge"
}, $0 = {
  key: 0,
  class: "currency-breakdown-list"
}, C0 = {
  key: 1,
  class: "badge-value"
}, D0 = {
  key: 0,
  class: "loading-state"
}, A0 = {
  key: 1,
  class: "card-body"
}, T0 = { class: "chart-section" }, B0 = { class: "chart-wrapper" }, F0 = {
  key: 1,
  class: "empty-chart"
}, P0 = {
  key: 0,
  class: "table-section"
}, L0 = { class: "table-wrapper" }, E0 = { class: "data-table" }, R0 = { class: "table-body" }, O0 = { class: "table-cell font-medium text-center" }, I0 = { class: "table-cell text-center" }, z0 = { class: "table-cell text-center" }, N0 = { class: "percentage-text" }, W0 = { class: "table-cell text-center" }, H0 = { class: "abandoned-value" }, V0 = { class: "table-cell" }, j0 = { class: "badges-container badges-wrap" }, Y0 = { class: "badge badge-vol" }, q0 = { class: "badge badge-confirm" }, U0 = { class: "badge badge-not-confirm" }, X0 = { class: "badge badge-reject" }, K0 = { class: "badge badge-not-paid" }, G0 = { class: "badge badge-success" }, Z0 = { class: "table-cell" }, Q0 = { class: "badges-container badges-wrap" }, J0 = { class: "badge badge-inv" }, tv = { class: "badge badge-human" }, ev = { class: "badge badge-accept" }, sv = {
  key: 1,
  class: "empty-state"
}, Ws = 3, av = /* @__PURE__ */ et({
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
    const s = e, a = t, n = (b) => {
      a("export", b);
    }, o = ft(!1), i = D(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (b, v) => new Date(b.date).getTime() - new Date(v.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, Ws)), l = D(() => i.value.length > Ws), d = D(() => s.data?.total_payment_success || []), u = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, h = (b) => ot(b), f = (b) => (b ?? []).reduce((v, m) => v + (m.count ?? 0), 0), g = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : f(b.payment_success_total), p = D(() => {
      const b = s.data, v = b.total_disruption_conversations || 0, m = b.total_disruption_initiated || 0, M = b.total_voluntary || 0, w = b.total_involuntary || 0, k = b.total_accepted || 0, $ = b.total_confirmed || 0, C = typeof b.total_sell_success == "number" ? b.total_sell_success : f(b.total_payment_success), T = b.total_sell_failed || 0, P = Math.max(0, v - m), z = Math.max(0, m - M - w), E = Math.max(0, w - k), N = Math.max(0, M - $), Y = T, A = Math.max(0, $ - C - Y), B = (O, I) => {
        const H = I > 0 ? Math.round(O / I * 100) : 0;
        return `${O.toLocaleString()} (${H}%)`;
      }, L = [
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
      ], R = [];
      return m > 0 && R.push({
        source: "Initiated",
        target: "Started",
        value: m,
        label: B(m, v)
      }), P > 0 && R.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: B(P, v)
      }), M > 0 && R.push({
        source: "Started",
        target: "Voluntary",
        value: M,
        label: B(M, v)
      }), w > 0 && R.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: B(w, v)
      }), z > 0 && R.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: z,
        label: B(z, v)
      }), k > 0 && R.push({
        source: "Involuntary",
        target: "Accepted",
        value: k,
        label: B(k, v)
      }), E > 0 && R.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: E,
        label: B(E, v)
      }), $ > 0 && R.push({
        source: "Voluntary",
        target: "Confirmed",
        value: $,
        label: B($, v)
      }), N > 0 && R.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: N,
        label: B(N, v)
      }), C > 0 && R.push({
        source: "Confirmed",
        target: "Paid",
        value: C,
        label: B(C, v)
      }), Y > 0 && R.push({
        source: "Confirmed",
        target: "Rejected",
        value: Y,
        label: B(Y, v)
      }), A > 0 && R.push({
        source: "Confirmed",
        target: "Not Paid",
        value: A,
        label: B(A, v)
      }), { nodes: L, links: R };
    }), _ = {
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
    return (b, v) => (y(), x("article", k0, [
      c("header", w0, [
        c("div", M0, [
          v[2] || (v[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? W("", !0) : (y(), x("div", S0, [
            v[1] || (v[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", $0, [
              (y(!0), x(U, null, Q(d.value, (m) => (y(), x("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, S(m.currency) + " " + S(h(m.total_value)), 1))), 128))
            ])) : (y(), x("p", C0, S(h(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", D0, [...v[3] || (v[3] = [
        q('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", A0, [
        c("section", T0, [
          c("div", B0, [
            p.value.nodes.length > 0 && p.value.links.length > 0 ? (y(), ut(ae, {
              key: 0,
              data: p.value,
              "node-colors": _,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", F0, [...v[4] || (v[4] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", P0, [
          v[7] || (v[7] = q('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", L0, [
            c("table", E0, [
              v[5] || (v[5] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Abandoned (%)"),
                  c("th", { class: "table-header" }, "Voluntary"),
                  c("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              c("tbody", R0, [
                (y(!0), x(U, null, Q(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", O0, S(F($t)(m.date).format("DD/MM")), 1),
                  c("td", I0, S(F(V)(m.disruption_conversations)), 1),
                  c("td", z0, [
                    Mt(S(F(V)(m.disruption_initiated_count)) + " ", 1),
                    c("span", N0, " (" + S(u(m.disruption_initiated_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", W0, [
                    c("span", H0, S(F(V)(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count)) + " (" + S(u(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", V0, [
                    c("div", j0, [
                      c("span", Y0, " VOL " + S(F(V)(m.voluntary_count)) + " (" + S(u(m.voluntary_count, m.disruption_conversations)) + ") ", 1),
                      c("span", q0, " Confirm " + S(F(V)(m.confirmed_count)) + " (" + S(u(m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", U0, " Not Confirm " + S(F(V)(m.voluntary_count - m.confirmed_count)) + " (" + S(u(m.voluntary_count - m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", X0, " Reject " + S(F(V)(m.sell_failed_count)) + " (" + S(u(m.sell_failed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", K0, " Not Paid " + S(F(V)(Math.max(0, m.confirmed_count - g(m) - m.sell_failed_count))) + " (" + S(u(Math.max(0, m.confirmed_count - g(m) - m.sell_failed_count), m.disruption_conversations)) + ") ", 1),
                      c("span", G0, " Finish " + S(F(V)(g(m))) + " (" + S(u(g(m), m.disruption_conversations)) + ") ", 1),
                      (y(!0), x(U, null, Q(m.payment_success_total || [], (M) => (y(), x("span", {
                        key: `${m.date}-${M.currency}`,
                        class: "badge badge-currency"
                      }, S(M.currency) + " " + S(h(M.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", Z0, [
                    c("div", Q0, [
                      c("span", J0, " INV " + S(F(V)(m.involuntary_count)) + " (" + S(u(m.involuntary_count, m.disruption_conversations)) + ") ", 1),
                      c("span", tv, " Human " + S(F(V)(m.involuntary_count - m.accepted_count)) + " (" + S(u(m.involuntary_count - m.accepted_count, m.disruption_conversations)) + ") ", 1),
                      c("span", ev, " Accept " + S(F(V)(m.accepted_count)) + " (" + S(u(m.accepted_count, m.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: v[0] || (v[0] = (m) => o.value = !o.value)
          }, [
            Mt(S(o.value ? "View less" : `View more (${i.value.length - Ws} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: At(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...v[6] || (v[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : W("", !0),
          e.enableExport ? (y(), ut(F(pt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", sv, [...v[8] || (v[8] = [
          q('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), nv = /* @__PURE__ */ J(av, [["__scopeId", "data-v-47c8f691"]]), ov = { class: "faq-metrics-card" }, iv = {
  key: 0,
  class: "card-body"
}, rv = { class: "kpi-grid" }, lv = { class: "kpi-card" }, cv = { class: "kpi-value" }, dv = { class: "kpi-card" }, uv = { class: "kpi-value" }, hv = { class: "kpi-card kpi-card--airline" }, fv = { class: "kpi-value" }, gv = { class: "kpi-card kpi-card--booking" }, pv = { class: "kpi-value" }, vv = { class: "kpi-card kpi-card--flight" }, bv = { class: "kpi-value" }, mv = {
  key: 0,
  class: "chart-section"
}, _v = {
  key: 1,
  class: "empty-state"
}, yv = {
  key: 1,
  class: "loading-state"
}, xv = /* @__PURE__ */ et({
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
    const a = e, n = s, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = nt(at(a, "theme")), l = ft({ labels: [], datasets: [] }), d = D(() => a.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), u = D(() => ({
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
    })), h = (f) => {
      if (!f) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const g = f.faq_by_day || [];
      if (g.length > 0) {
        const p = g.map((m) => $t(m.date).format("MMM DD")), _ = g.map((m) => m.airline_information_retrieved_count || 0), b = g.map((m) => m.flight_status_retrieved_count || 0), v = g.map((m) => m.booking_info_retrieved_count || 0);
        l.value = {
          labels: p,
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
              data: v,
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
    return Xt(
      () => a.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, g) => (y(), x("article", ov, [
      g[7] || (g[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      a.loading ? (y(), x("div", yv, [...g[6] || (g[6] = [
        q('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", iv, [
        c("div", rv, [
          c("div", lv, [
            g[0] || (g[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", cv, S(F(V)(d.value.total_faq_events)), 1)
          ]),
          c("div", dv, [
            g[1] || (g[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", uv, S(F(V)(d.value.total_documents_found)), 1)
          ]),
          c("div", hv, [
            g[2] || (g[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", fv, S(F(V)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", gv, [
            g[3] || (g[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", pv, S(F(V)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", vv, [
            g[4] || (g[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", bv, S(F(V)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", mv, [
          K(se, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", _v, [...g[5] || (g[5] = [
          q('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), kv = /* @__PURE__ */ J(xv, [["__scopeId", "data-v-5d2c3c33"]]), wv = { class: "messages-per-agent-card" }, Mv = {
  key: 0,
  class: "card-body"
}, Sv = {
  key: 0,
  class: "chart-section"
}, $v = {
  key: 1,
  class: "empty-state"
}, Cv = { class: "empty-state-content" }, Dv = { class: "empty-icon-wrapper" }, Av = {
  key: 1,
  class: "loading-state"
}, Tv = /* @__PURE__ */ et({
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
    }, n = e, o = s, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = nt(at(n, "theme")), d = D(() => {
      const h = n.data?.agents_by_day || {}, f = Object.keys(h).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const b of Object.values(h))
        for (const v of Object.keys(b))
          g.add(v);
      const _ = Array.from(g).map((b) => {
        const v = a[b] || "#94a3b8";
        return {
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          data: f.map((m) => h[m]?.[b] || 0),
          borderColor: v,
          backgroundColor: `${v}20`,
          pointBackgroundColor: v,
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
        datasets: _
      };
    }), u = D(() => n.options ? n.options : {
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
    return t({ isDark: r }), (h, f) => (y(), x("article", wv, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Av, [...f[2] || (f[2] = [
        q('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Mv, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Sv, [
          K(se, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", $v, [
          c("div", Cv, [
            c("div", Dv, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Bv = /* @__PURE__ */ J(Tv, [["__scopeId", "data-v-b9368fc2"]]), Fv = { class: "record-locator-card" }, Pv = {
  key: 0,
  class: "loading-state"
}, Lv = {
  key: 1,
  class: "card-body"
}, Ev = {
  key: 0,
  class: "chart-section"
}, Rv = { class: "chart-wrapper" }, Ov = {
  key: 1,
  class: "table-section"
}, Iv = { class: "table-wrapper" }, zv = { class: "data-table" }, Nv = { class: "table-header-row" }, Wv = {
  key: 0,
  class: "table-header"
}, Hv = {
  key: 1,
  class: "table-header"
}, Vv = { class: "table-body" }, jv = { class: "table-cell font-medium" }, Yv = { class: "table-cell text-center" }, qv = { class: "table-cell text-center" }, Uv = { class: "table-cell text-center" }, Xv = { class: "table-cell text-center" }, Kv = { class: "table-cell text-center success-value" }, Gv = { class: "table-cell text-center failed-value" }, Zv = { class: "table-cell text-center warning-value" }, Qv = {
  key: 0,
  class: "table-cell text-center"
}, Jv = {
  key: 1,
  class: "table-cell text-center failed-value"
}, tb = {
  key: 2,
  class: "empty-state"
}, Hs = 3, eb = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (b) => {
      n("export", b);
    }, { isDark: i } = nt(at(a, "theme")), r = ft(!1), l = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (b, v) => new Date(b.date).getTime() - new Date(v.date).getTime()
    ) : []), d = D(() => r.value ? l.value : l.value.slice(0, Hs)), u = D(() => l.value.length > Hs), h = D(() => a.data), f = D(() => ({
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
    })), g = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, p = (b, v) => {
      const m = V(b), M = g(b, v);
      return `${m} (${M})`;
    }, _ = D(() => {
      const b = [], v = [], m = /* @__PURE__ */ new Set(), M = (j) => {
        m.has(j) || (b.push({ name: j }), m.add(j));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: b, links: v };
      M("Checkin Init"), M("Booking retrive"), M("Checkin Started"), M("Checkin Completed"), M("Checkin Closed");
      const w = h.value.total_checkin_initiated, k = h.value.total_record_locator_init, $ = h.value.total_record_locator_started, C = h.value.total_record_locator_completed, T = h.value.total_record_locator_closed, P = h.value.total_record_locator_failed, z = h.value.total_record_locator_abandoned, E = h.value.total_record_locator_init_abandoned, N = h.value.total_checkin_pre_init_abandoned_error, Y = h.value.total_checkin_pre_init_abandoned_voluntary, A = N != null || Y != null, B = A ? Math.max(Number(N) || 0, 0) : 0, L = A ? Math.max(Number(Y) || 0, 0) : 0, R = h.value.total_record_locator_init_abandoned_error, O = h.value.total_record_locator_init_abandoned_voluntary, I = R != null || O != null, H = I ? Math.max(Number(R) || 0, 0) : 0, G = I ? Math.max(Number(O) || 0, 0) : 0;
      if (k > 0) {
        const j = Math.round(k / w * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: k,
          label: `${k.toLocaleString()} (${j}%)`
        });
      }
      const X = w - k;
      if (A) {
        if (L > 0) {
          const j = Math.round(L / w * 100);
          M("Abandoned (Init)"), v.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: L,
            label: `${L.toLocaleString()} (${j}%)`
          });
        }
        if (B > 0) {
          const j = Math.round(B / w * 100);
          M("Booking not retreived"), v.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${j}%)`
          });
        }
      } else if (X > 0) {
        const j = Math.round(X / w * 100);
        M("Abandoned (Init)"), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: X,
          label: `${X.toLocaleString()} (${j}%)`
        });
      }
      if ($ > 0) {
        const j = Math.round($ / w * 100);
        v.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: $,
          label: `${$.toLocaleString()} (${j}%)`
        });
      }
      if (I) {
        if (H > 0) {
          const j = Math.round(H / w * 100);
          M("Error"), v.push({
            source: "Booking retrive",
            target: "Error",
            value: H,
            label: `${H.toLocaleString()} (${j}%)`
          });
        }
        if (G > 0) {
          const j = Math.round(G / w * 100);
          M("Abandoned (Started)"), v.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: G,
            label: `${G.toLocaleString()} (${j}%)`
          });
        }
      } else if (E > 0) {
        const j = Math.round(E / w * 100);
        M("Abandoned (Started)"), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${j}%)`
        });
      }
      if (C > 0) {
        const j = Math.round(C / $ * 100);
        v.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: C,
          label: `${C.toLocaleString()} (${j}%)`
        });
      }
      if (T > 0) {
        const j = Math.round(T / $ * 100);
        v.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: T,
          label: `${T.toLocaleString()} (${j}%)`
        });
      }
      if (P > 0) {
        const j = Math.round(P / $ * 100);
        M("Checkin Failed"), v.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: P,
          label: `${P.toLocaleString()} (${j}%)`
        });
      }
      if (z > 0) {
        const j = Math.round(z / $ * 100);
        M("Abandoned (Flow)"), v.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: z,
          label: `${z.toLocaleString()} (${j}%)`
        });
      }
      return { nodes: b, links: v };
    });
    return t({ isDark: i }), (b, v) => (y(), x("article", Fv, [
      v[12] || (v[12] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      a.loading ? (y(), x("div", Pv, [...v[1] || (v[1] = [
        q('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", Lv, [
        _.value.nodes.length > 0 ? (y(), x("section", Ev, [
          c("div", Rv, [
            K(ae, {
              data: _.value,
              height: "500px",
              "node-colors": f.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : W("", !0),
        l.value && l.value.length > 0 ? (y(), x("section", Ov, [
          c("div", Iv, [
            c("table", zv, [
              c("thead", null, [
                c("tr", Nv, [
                  v[2] || (v[2] = c("th", { class: "table-header" }, "Date", -1)),
                  v[3] || (v[3] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  v[4] || (v[4] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  v[5] || (v[5] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  v[6] || (v[6] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  v[7] || (v[7] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  v[8] || (v[8] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  v[9] || (v[9] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  a.isAvianca ? (y(), x("th", Wv, "Create Payment")) : W("", !0),
                  a.isAvianca ? (y(), x("th", Hv, "Failed Payment")) : W("", !0)
                ])
              ]),
              c("tbody", Vv, [
                (y(!0), x(U, null, Q(d.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", jv, S(F($t)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", Yv, S(F(V)(m.checkin_initiated)), 1),
                  c("td", qv, S(p(m.record_locator_init_count, m.checkin_initiated)), 1),
                  c("td", Uv, S(F(V)(m.record_locator_started_count)), 1),
                  c("td", Xv, S(p(m.record_locator_completed_count, m.record_locator_started_count)), 1),
                  c("td", Kv, S(p(m.record_locator_closed_count, m.record_locator_started_count)), 1),
                  c("td", Gv, S(p(m.record_locator_failed_count, m.record_locator_started_count)), 1),
                  c("td", Zv, S(p(m.record_locator_abandoned_count, m.record_locator_started_count)), 1),
                  a.isAvianca ? (y(), x("td", Qv, S(F(V)(m.record_locator_create_payment_count)), 1)) : W("", !0),
                  a.isAvianca ? (y(), x("td", Jv, S(F(V)(m.record_locator_create_payment_failed_count)), 1)) : W("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: v[0] || (v[0] = (m) => r.value = !r.value)
          }, [
            Mt(S(r.value ? "View less" : `View more (${l.value.length - Hs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: At(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...v[10] || (v[10] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : W("", !0),
          e.enableExport ? (y(), ut(F(pt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", tb, [...v[11] || (v[11] = [
          q('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), sb = /* @__PURE__ */ J(eb, [["__scopeId", "data-v-e48cea55"]]), ab = { class: "sales-channel-card" }, nb = {
  key: 0,
  class: "loading-state"
}, ob = {
  key: 1,
  class: "card-body"
}, ib = {
  key: 0,
  class: "chart-section"
}, rb = { class: "chart-wrapper" }, lb = {
  key: 1,
  class: "empty-state"
}, cb = {
  key: 2,
  class: "comparison-section"
}, db = { class: "comparison-grid" }, ub = { class: "comparison-content" }, hb = { class: "comparison-channel" }, fb = { class: "comparison-value" }, gb = {
  key: 0,
  class: "comparison-delta"
}, pb = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, vb = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, bb = { class: "delta-label" }, mb = {
  key: 1,
  class: "comparison-delta"
}, _b = /* @__PURE__ */ et({
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
    channelComparison: { default: () => [] }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
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
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = s, r = (f) => {
      i("export", f);
    }, { isDark: l } = nt(at(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const d = D(() => {
      const f = /* @__PURE__ */ new Set();
      for (const g of o.data?.sales_by_channel_by_day ?? [])
        for (const p of Object.keys(g.channels))
          f.add(p);
      return Array.from(f).sort();
    }), u = (f, g) => a[f.toLowerCase()] ?? n[g % n.length], h = D(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const g = f.map((_) => $t(_.date).format("MMM-DD")), p = d.value.map((_, b) => ({
        label: _,
        data: f.map((v) => v.channels[_] ?? 0),
        backgroundColor: u(_, b),
        borderRadius: 4
      }));
      return { labels: g, datasets: p };
    });
    return t({ isDark: l }), (f, g) => (y(), x("article", ab, [
      g[5] || (g[5] = q('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", nb, [...g[0] || (g[0] = [
        q('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", ob, [
        h.value.labels.length > 0 ? (y(), x("section", ib, [
          c("div", rb, [
            K(Kt, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", lb, [...g[1] || (g[1] = [
          q('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", cb, [
          c("div", db, [
            (y(!0), x(U, null, Q(e.channelComparison, (p) => (y(), x("div", {
              key: p.channel,
              class: "comparison-card"
            }, [
              c("div", {
                class: "comparison-color-bar",
                style: _t({ backgroundColor: u(p.channel, e.channelComparison.indexOf(p)) })
              }, null, 4),
              c("div", ub, [
                c("span", hb, S(p.channel), 1),
                c("span", fb, S(F(V)(p.current)), 1),
                p.delta !== null ? (y(), x("div", gb, [
                  c("span", {
                    class: At(["delta-badge", p.delta > 0 ? "delta-up" : p.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    p.delta > 0 ? (y(), x("svg", pb, [...g[2] || (g[2] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : p.delta < 0 ? (y(), x("svg", vb, [...g[3] || (g[3] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : W("", !0),
                    Mt(" " + S(Math.abs(p.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  c("span", bb, "vs prev. period (" + S(F(V)(p.previous)) + ")", 1)
                ])) : (y(), x("div", mb, [...g[4] || (g[4] = [
                  c("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : W("", !0)
      ]))
    ]));
  }
}), yb = /* @__PURE__ */ J(_b, [["__scopeId", "data-v-8b96a431"]]), xb = { class: "seller-metrics-card" }, kb = { class: "card-header" }, wb = { class: "header-content" }, Mb = {
  key: 0,
  class: "payment-success-badge"
}, Sb = {
  key: 0,
  class: "currency-breakdown-list"
}, $b = {
  key: 1,
  class: "badge-value"
}, Cb = {
  key: 0,
  class: "loading-state"
}, Db = {
  key: 1,
  class: "card-body"
}, Ab = {
  key: 0,
  class: "chart-section"
}, Tb = { class: "chart-wrapper" }, Bb = {
  key: 1,
  class: "empty-state"
}, Fb = {
  key: 2,
  class: "table-section"
}, Pb = { class: "table-wrapper" }, Lb = { class: "data-table" }, Eb = { class: "table-body" }, Rb = { class: "table-cell font-medium" }, Ob = { class: "table-cell text-center" }, Ib = { class: "table-cell text-center" }, zb = { class: "table-cell text-center" }, Nb = { class: "table-cell text-center" }, Wb = { class: "table-cell text-center" }, Hb = { class: "table-cell text-center success-value" }, Vb = {
  key: 0,
  class: "currency-cell-list"
}, jb = { key: 1 }, Yb = { class: "table-cell text-left" }, qb = {
  key: 0,
  class: "failed-reasons"
}, Ub = { class: "reason-name" }, Xb = { class: "reason-count" }, Kb = {
  key: 1,
  class: "empty-cell"
}, Vs = 3, Gb = /* @__PURE__ */ et({
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
    const a = e, n = s, o = (k) => {
      n("export", k);
    }, { isDark: i } = nt(at(a, "theme")), r = ft(!1), l = D(() => {
      if (!a.sellerData?.seller_by_day) return [];
      const k = [...a.sellerData.seller_by_day];
      return a.failedData?.failed_by_reason_by_day && a.failedData.failed_by_reason_by_day.forEach(($) => {
        const C = k.findIndex((T) => T.date === $.date);
        C !== -1 ? k[C] = { ...k[C], reasons: $.reasons } : k.push({
          date: $.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: $.reasons
        });
      }), k.sort(($, C) => new Date($.date).getTime() - new Date(C.date).getTime());
    }), d = D(() => r.value ? l.value : l.value.slice(0, Vs)), u = D(() => l.value.length > Vs), h = D(() => a.sellerData), f = D(() => a.failedData), g = D(
      () => Array.isArray(a.sellerData.total_value_sell_success) ? a.sellerData.total_value_sell_success : []
    ), p = D(() => {
      const {
        total_seller_conversations: k = 0,
        total_sell_started: $ = 0,
        total_sell_booking_created: C = 0,
        total_sell_success: T = 0
      } = h.value, { failed_by_reason_by_day: P = [] } = f.value;
      if (k === 0) return { nodes: [], links: [] };
      const z = [
        { name: "Sell Initiated", value: k },
        { name: "Sell Started", value: $ },
        { name: "Booking Created", value: C },
        { name: "Sell Success", value: T }
      ], E = [], N = k - $;
      if (N > 0) {
        const L = Math.round(N / k * 100);
        z.push({ name: "Abandoned (Init)", value: N }), E.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: N,
          label: `${N.toLocaleString()} (${L}%)`
        });
      }
      if ($ > 0) {
        const L = Math.round($ / k * 100);
        E.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: $,
          label: `${$.toLocaleString()} (${L}%)`
        });
      }
      const Y = P.reduce((L, R) => (R.reasons && Array.isArray(R.reasons) && R.reasons.forEach((O) => {
        const I = O.reason, H = O.failed_count;
        L[I] = (L[I] || 0) + H;
      }), L), {});
      if (C > 0) {
        const L = Math.round(C / k * 100);
        E.push({
          source: "Sell Started",
          target: "Booking Created",
          value: C,
          label: `${C.toLocaleString()} (${L}%)`
        });
      }
      if (T > 0) {
        const L = Math.round(T / k * 100);
        E.push({
          source: "Booking Created",
          target: "Sell Success",
          value: T,
          label: `${T.toLocaleString()} (${L}%)`
        });
      }
      const A = $ - C;
      if (A > 0) {
        const L = Math.round(A / k * 100);
        z.push({ name: "Failed at Booking", value: A }), E.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: A,
          label: `${A.toLocaleString()} (${L}%)`
        });
      }
      if (Object.keys(Y).length > 0) {
        const L = Object.values(Y).reduce((O, I) => O + I, 0), R = A - L;
        if (Object.entries(Y).filter(([, O]) => O > 0).sort(([, O], [, I]) => I - O).forEach(([O, I]) => {
          const H = Math.round(I / k * 100);
          z.push({ name: `Failed: ${O}`, value: I }), E.push({
            source: "Failed at Booking",
            target: `Failed: ${O}`,
            value: I,
            label: `${I.toLocaleString()} (${H}%)`
          });
        }), R > 0) {
          const O = Math.round(R / k * 100);
          z.push({ name: "Failed: Without Reason", value: R }), E.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: R,
            label: `${R.toLocaleString()} (${O}%)`
          });
        }
      }
      const B = C - T;
      if (B > 0) {
        const L = Math.round(B / k * 100);
        z.push({ name: "Failed at Completion", value: B }), E.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: B,
          label: `${B.toLocaleString()} (${L}%)`
        });
      }
      return { nodes: z, links: E };
    }), _ = {
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
    }, b = D(() => _), v = (k, $) => !$ || $ === 0 ? "0%" : `${Math.round(k / $ * 100)}%`, m = (k, $) => {
      const C = V(k), T = v(k, $);
      return `${C} (${T})`;
    }, M = (k) => k == null ? 0 : typeof k == "number" ? k : Array.isArray(k) ? k.reduce(($, C) => $ + (C.total_value || 0), 0) : 0, w = (k) => ot(M(k));
    return t({ isDark: i }), (k, $) => (y(), x("article", xb, [
      c("header", kb, [
        c("div", wb, [
          $[2] || ($[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          a.loading ? W("", !0) : (y(), x("div", Mb, [
            $[1] || ($[1] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            g.value.length > 0 ? (y(), x("div", Sb, [
              (y(!0), x(U, null, Q(g.value, (C) => (y(), x("p", {
                key: C.currency,
                class: "currency-breakdown-item"
              }, S(C.currency) + " " + S(F(ot)(C.total_value)), 1))), 128))
            ])) : (y(), x("p", $b, S(w(a.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", Cb, [...$[3] || ($[3] = [
        q('<div class="loading-container" data-v-60dfa4f1><div class="chart-flow-loader" data-v-60dfa4f1><div class="flow-line flow-1" data-v-60dfa4f1></div><div class="flow-line flow-2" data-v-60dfa4f1></div><div class="flow-line flow-3" data-v-60dfa4f1></div><div class="flow-line flow-4" data-v-60dfa4f1></div><div class="flow-line flow-5" data-v-60dfa4f1></div></div><p class="loading-text" data-v-60dfa4f1>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Db, [
        p.value.nodes.length > 0 ? (y(), x("section", Ab, [
          c("div", Tb, [
            K(ae, {
              data: p.value,
              "node-colors": b.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", Bb, [...$[4] || ($[4] = [
          q('<div class="empty-state-content" data-v-60dfa4f1><div class="empty-icon-wrapper" data-v-60dfa4f1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-60dfa4f1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-60dfa4f1></path></svg></div><p class="empty-title" data-v-60dfa4f1>No sales data available</p><p class="empty-description" data-v-60dfa4f1>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        l.value && l.value.length > 0 ? (y(), x("section", Fb, [
          c("div", Pb, [
            c("table", Lb, [
              $[5] || ($[5] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Sell Initiated"),
                  c("th", { class: "table-header" }, "Sell Started"),
                  c("th", { class: "table-header" }, "Get Quote"),
                  c("th", { class: "table-header" }, "Booking Created"),
                  c("th", { class: "table-header" }, "Sell Success"),
                  c("th", { class: "table-header" }, "Total Sales Value"),
                  c("th", { class: "table-header" }, "Failed")
                ])
              ], -1)),
              c("tbody", Eb, [
                (y(!0), x(U, null, Q(d.value, (C) => (y(), x("tr", {
                  key: C.date,
                  class: "table-row"
                }, [
                  c("td", Rb, S(F($t)(C.date).format("DD/MM/YYYY")), 1),
                  c("td", Ob, S(F(V)(C.seller_conversations || 0)), 1),
                  c("td", Ib, S(m(C.sell_started_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", zb, S(m(C.sell_get_quote_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", Nb, S(m(C.sell_booking_created_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", Wb, S(m(C.sell_success_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", Hb, [
                    Array.isArray(C.daily_value_sell_success) && C.daily_value_sell_success.length > 0 ? (y(), x("div", Vb, [
                      (y(!0), x(U, null, Q(C.daily_value_sell_success, (T) => (y(), x("span", {
                        key: `${C.date}-${T.currency}`
                      }, S(T.currency) + " " + S(F(ot)(T.total_value)), 1))), 128))
                    ])) : (y(), x("span", jb, S(w(C.daily_value_sell_success)), 1))
                  ]),
                  c("td", Yb, [
                    C.reasons && C.reasons.length > 0 ? (y(), x("div", qb, [
                      (y(!0), x(U, null, Q(C.reasons, (T) => (y(), x("div", {
                        key: T.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", Ub, S(T.reason) + ":", 1),
                        c("span", Xb, S(T.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Kb, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: $[0] || ($[0] = (C) => r.value = !r.value)
          }, [
            Mt(S(r.value ? "View less" : `View more (${l.value.length - Vs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: At(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...$[6] || ($[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : W("", !0),
          e.enableExport ? (y(), ut(F(pt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : W("", !0)
      ]))
    ]));
  }
}), Zb = /* @__PURE__ */ J(Gb, [["__scopeId", "data-v-60dfa4f1"]]), Qb = { class: "top-agents-card" }, Jb = {
  key: 0,
  class: "card-body"
}, tm = {
  key: 0,
  class: "chart-section"
}, em = {
  key: 1,
  class: "empty-state"
}, sm = { class: "empty-state-content" }, am = { class: "empty-icon-wrapper" }, nm = {
  key: 1,
  class: "loading-state"
}, om = /* @__PURE__ */ et({
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
    }, n = e, o = s, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = nt(at(n, "theme")), d = D(() => {
      const f = (n.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.reduce(
        (b, v) => b + (Number(v.conversations) || 0),
        0
      ), p = f.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return a[v] || "#94a3b8";
      }), _ = p.map((b) => `${b}80`);
      return {
        labels: f.map((b) => {
          const v = Number(b.conversations) || 0, m = g ? v / g * 100 : 0;
          return `${b.agent_type} - ${v.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((b) => b.conversations),
            backgroundColor: _,
            borderColor: p,
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
                (b, v) => b + (Number(v) || 0),
                0
              ), _ = p ? g / p * 100 : 0;
              return `${f}: ${g.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (y(), x("article", Qb, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", nm, [...f[2] || (f[2] = [
        q('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Jb, [
        d.value.labels && d.value.labels.length ? (y(), x("section", tm, [
          K(ws, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", em, [
          c("div", sm, [
            c("div", am, [
              K(F(qf), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), im = /* @__PURE__ */ J(om, [["__scopeId", "data-v-501bf4c4"]]), rm = { class: "payment-method-card" }, lm = { class: "card-header" }, cm = { class: "header-content" }, dm = {
  key: 0,
  class: "stats-badge"
}, um = {
  key: 0,
  class: "currency-breakdown-list"
}, hm = {
  key: 1,
  class: "badge-value"
}, fm = {
  key: 0,
  class: "loading-state"
}, gm = {
  key: 1,
  class: "card-body"
}, pm = {
  key: 0,
  class: "payment-methods-section"
}, vm = { class: "payment-methods-grid" }, bm = { class: "payment-card-content" }, mm = { class: "payment-card-header" }, _m = {
  key: 0,
  class: "currency-cell-list"
}, ym = { class: "payment-badge-wrapper" }, xm = {
  key: 1,
  class: "empty-state"
}, km = { class: "empty-state-content" }, wm = { class: "empty-icon-wrapper" }, Mm = {
  key: 2,
  class: "table-section"
}, Sm = { class: "table-wrapper" }, $m = { class: "data-table" }, Cm = { class: "table-body" }, Dm = { class: "table-cell font-medium" }, Am = { class: "table-cell text-center" }, Tm = { class: "table-cell text-center success-value" }, Bm = {
  key: 0,
  class: "currency-cell-list"
}, Fm = { key: 1 }, Pm = { class: "table-cell" }, Lm = { class: "payment-tags" }, Em = { class: "tag-name" }, Rm = {
  key: 0,
  class: "tag-amount"
}, Om = {
  key: 1,
  class: "tag-amount"
}, Im = { class: "tag-count" }, zm = {
  key: 3,
  class: "empty-table-state"
}, Nm = "Not Registered", js = 3, Wm = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, { isDark: o } = nt(at(a, "theme")), i = ft(!1), r = ft({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = D(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = D(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = ft(!1), h = D(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((A, B) => $t(A.date).valueOf() - $t(B.date).valueOf())), f = D(() => u.value ? h.value : h.value.slice(0, js)), g = D(() => h.value.length > js), p = (A) => {
      if (!A)
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
      const B = (A.payment_method_breakdown || []).map((R) => ({
        payment_method: R.payment_method || "Unknown",
        total_amount: R.total_amount ?? 0,
        count: R.count ?? 0,
        total_amount_by_currency: R.total_amount_by_currency ?? []
      })), L = (A.payment_method_by_day || []).map((R) => ({
        date: R.date || "",
        total_count: R.total_count ?? 0,
        total_amount: R.total_amount ?? 0,
        total_amount_by_currency: R.total_amount_by_currency ?? [],
        payment_methods: (R.payment_methods || []).map((O) => ({
          payment_method: O.payment_method || "Unknown",
          total_amount: O.total_amount ?? 0,
          count: O.count ?? 0,
          total_amount_by_currency: O.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: A.airline_name || a.airlineName,
        start_date: A.start_date || "",
        end_date: A.end_date || "",
        total_conversations: A.total_conversations ?? 0,
        total_amount: A.total_amount ?? 0,
        total_amount_by_currency: A.total_amount_by_currency ?? [],
        payment_method_breakdown: B,
        payment_method_by_day: L
      };
    }, _ = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [A, B] = a.dates.map((R) => $t(R).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, A, B);
          r.value = p(L);
        } catch (A) {
          console.error("Error fetching payment method metrics:", A), r.value = p(null);
        } finally {
          i.value = !1;
        }
      }
    }, b = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], v = (A) => {
      const B = b[A % b.length];
      return {
        background: B.bg,
        borderColor: B.border
      };
    }, m = (A) => ({ color: b[A % b.length].text }), M = (A) => ({ color: b[A % b.length].value }), w = (A) => ({ color: b[A % b.length].icon }), k = (A) => ({ color: b[A % b.length].badge }), $ = (A) => {
      const L = P(A).length;
      return L > 18 ? { fontSize: "0.75rem" } : L > 15 ? { fontSize: "0.875rem" } : L > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, C = (A) => {
      const B = A?.toLowerCase() || "";
      return !A || B === "unknown" ? Kf : B.includes("credit") || B.includes("debit") ? Un : B.includes("cash") || B.includes("efectivo") ? jf : B.includes("bank") || B.includes("transfer") ? Yf : B.includes("zelle") || B.includes("pago") || B.includes("movil") ? Xf : B.includes("wallet") ? Gf : Uf;
    }, T = (A) => !A || A.toLowerCase() === "unknown" ? Nm : A.replace(/_/g, " "), P = (A) => A == null ? "$0.00" : ot(A), z = (A) => A ? $t(A).format("DD/MM/YYYY") : "-", E = (A) => A == null || Number.isNaN(Number(A)) ? 0 : Number(A), N = (A) => {
      n("export", A);
    };
    function Y() {
      const A = a.data;
      A && (Array.isArray(A.payment_method_breakdown) && A.payment_method_breakdown.length > 0 || Array.isArray(A.payment_method_by_day) && A.payment_method_by_day.length > 0) && (i.value = !1, r.value = p(A));
    }
    return gs(() => {
      a.data ? Y() : _();
    }), Xt(
      () => a.data,
      (A) => {
        A && Y();
      },
      { deep: !0 }
    ), Xt(
      () => a.dates,
      (A) => {
        a.data || A && A[0] && A[1] && _();
      },
      { deep: !0 }
    ), t({ isDark: o }), (A, B) => (y(), x("article", rm, [
      c("header", lm, [
        c("div", cm, [
          B[2] || (B[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (y(), x("div", dm, [
            B[1] || (B[1] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", um, [
              (y(!0), x(U, null, Q(r.value.total_amount_by_currency, (L) => (y(), x("p", {
                key: L.currency,
                class: "currency-breakdown-item"
              }, S(L.currency) + " " + S(P(L.total_value)), 1))), 128))
            ])) : (y(), x("p", hm, S(P(r.value.total_amount)), 1))
          ])) : W("", !0)
        ])
      ]),
      i.value ? (y(), x("div", fm, [...B[3] || (B[3] = [
        q('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", gm, [
        l.value ? (y(), x("section", pm, [
          B[4] || (B[4] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", vm, [
            (y(!0), x(U, null, Q(r.value.payment_method_breakdown, (L, R) => (y(), x("div", {
              key: L.payment_method,
              class: "payment-method-card-item",
              style: _t(v(R))
            }, [
              c("div", bm, [
                c("div", mm, [
                  (y(), ut(ii(C(L.payment_method)), {
                    class: "payment-icon",
                    style: _t(w(R))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: _t(m(R))
                  }, S(T(L.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: _t([M(R), $(L.total_amount)])
                }, S(P(L.total_amount)), 5),
                L.total_amount_by_currency && L.total_amount_by_currency.length > 0 ? (y(), x("div", _m, [
                  (y(!0), x(U, null, Q(L.total_amount_by_currency, (O) => (y(), x("span", {
                    key: `${L.payment_method}-${O.currency}`
                  }, S(O.currency) + " " + S(P(O.total_value)), 1))), 128))
                ])) : W("", !0),
                c("div", ym, [
                  c("span", {
                    class: "payment-badge",
                    style: _t(k(R))
                  }, S(E(L.count)) + " " + S(E(L.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", xm, [
          c("div", km, [
            c("div", wm, [
              K(F(Un), { class: "empty-icon" })
            ]),
            B[5] || (B[5] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            B[6] || (B[6] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", Mm, [
          B[10] || (B[10] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", Sm, [
            c("table", $m, [
              B[8] || (B[8] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", Cm, [
                (y(!0), x(U, null, Q(f.value, (L) => (y(), x("tr", {
                  key: L.date,
                  class: "table-row"
                }, [
                  c("td", Dm, S(z(L.date)), 1),
                  c("td", Am, S(F(V)(L.total_count ?? 0)), 1),
                  c("td", Tm, [
                    L.total_amount_by_currency && L.total_amount_by_currency.length > 0 ? (y(), x("div", Bm, [
                      (y(!0), x(U, null, Q(L.total_amount_by_currency, (R) => (y(), x("span", {
                        key: `${L.date}-${R.currency}`
                      }, S(R.currency) + " " + S(P(R.total_value)), 1))), 128))
                    ])) : (y(), x("span", Fm, S(P(L.total_amount)), 1))
                  ]),
                  c("td", Pm, [
                    c("div", Lm, [
                      (y(!0), x(U, null, Q(L.payment_methods || [], (R) => (y(), x("div", {
                        key: R.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", Em, S(T(R.payment_method)), 1),
                        B[7] || (B[7] = c("span", { class: "tag-separator" }, "•", -1)),
                        !R.total_amount_by_currency || R.total_amount_by_currency.length === 0 ? (y(), x("span", Rm, S(P(R.total_amount)), 1)) : (y(), x("span", Om, S(R.total_amount_by_currency.map((O) => `${O.currency} ${P(O.total_value)}`).join(" / ")), 1)),
                        c("span", Im, "(" + S(E(R.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          g.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: B[0] || (B[0] = (L) => u.value = !u.value)
          }, [
            Mt(S(u.value ? "View less" : `View more (${h.value.length - js} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: At(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...B[9] || (B[9] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : W("", !0),
          e.enableExport ? (y(), ut(F(pt), {
            key: 1,
            onExport: N,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : l.value ? (y(), x("div", zm, [...B[11] || (B[11] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : W("", !0)
      ]))
    ]));
  }
}), Hm = /* @__PURE__ */ J(Wm, [["__scopeId", "data-v-ff4ce0b7"]]), Vm = { class: "agent-human-conv-card" }, jm = {
  key: 0,
  class: "loading-state"
}, Ym = {
  key: 1,
  class: "card-body"
}, qm = { class: "summary-cards" }, Um = { class: "summary-card assigned-card" }, Xm = { class: "summary-card-content" }, Km = { class: "card-content" }, Gm = { class: "card-value assigned-value" }, Zm = { class: "card-content" }, Qm = { class: "card-value assigned-value" }, Jm = { class: "summary-card closed-card" }, t1 = { class: "summary-card-content" }, e1 = { class: "card-content" }, s1 = { class: "card-value closed-value" }, a1 = { class: "card-content" }, n1 = { class: "card-value closed-value" }, o1 = {
  key: 0,
  class: "agents-section"
}, i1 = { class: "date-header" }, r1 = { class: "date-title" }, l1 = { class: "date-stats" }, c1 = { class: "stat-item assigned-stat" }, d1 = { class: "stat-value" }, u1 = { class: "stat-value" }, h1 = { class: "stat-item closed-stat" }, f1 = { class: "stat-value" }, g1 = { class: "stat-value" }, p1 = { class: "table-wrapper" }, v1 = { class: "data-table" }, b1 = { class: "table-body" }, m1 = { class: "table-cell name-cell" }, _1 = { class: "table-cell email-cell" }, y1 = { class: "table-cell text-center" }, x1 = { class: "metric-cell-content" }, k1 = { class: "badge assigned-badge" }, w1 = { class: "metric-cell-avg" }, M1 = { class: "table-cell text-center" }, S1 = { class: "metric-cell-content" }, $1 = { class: "badge closed-badge" }, C1 = { class: "metric-cell-avg" }, D1 = {
  key: 1,
  class: "empty-state"
}, A1 = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (b) => {
      n("export", b);
    }, { isDark: i } = nt(at(a, "theme")), r = D(() => a.data?.agents_by_day && a.data.agents_by_day.length > 0), l = D(() => {
      if (!r.value) return {};
      const b = {};
      for (const M of a.data.agents_by_day)
        b[M.date] || (b[M.date] = []), b[M.date].push(M);
      const v = Object.keys(b).sort((M, w) => new Date(M).getTime() - new Date(w).getTime()), m = {};
      for (const M of v)
        m[M] = b[M];
      return m;
    }), d = (b) => b == null ? "0" : V(b), u = (b) => {
      if (b == null)
        return "AVG";
      if (b < 60)
        return `${Math.round(b)}s`;
      const v = Math.round(b), m = Math.floor(v / 60), M = v % 60;
      if (m < 60)
        return `${m}m ${M}s`;
      const w = Math.floor(m / 60), k = m % 60;
      return `${w}h ${k}m`;
    }, h = (b) => {
      const v = new Date(b), m = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return v.toLocaleDateString("en-US", m);
    }, f = (b) => b[0]?.day_total_assigned ?? 0, g = (b) => b[0]?.day_total_closed ?? 0, p = (b) => b[0]?.day_avg_time_to_assign_seconds ?? null, _ = (b) => b[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (b, v) => (y(), x("article", Vm, [
      v[11] || (v[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", jm, [...v[0] || (v[0] = [
        q('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", Ym, [
        c("div", qm, [
          c("div", Um, [
            v[3] || (v[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", Xm, [
              c("div", Km, [
                v[1] || (v[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", Gm, S(d(e.data.total_assigned)), 1)
              ]),
              c("div", Zm, [
                v[2] || (v[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", Qm, S(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", Jm, [
            v[6] || (v[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", t1, [
              c("div", e1, [
                v[4] || (v[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", s1, S(d(e.data.total_closed)), 1)
              ]),
              c("div", a1, [
                v[5] || (v[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", n1, S(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", o1, [
          (y(!0), x(U, null, Q(l.value, (m, M) => (y(), x("div", {
            key: M,
            class: "date-group"
          }, [
            c("div", i1, [
              c("h4", r1, S(h(M)), 1),
              c("div", l1, [
                c("span", c1, [
                  c("span", d1, S(d(f(m))), 1),
                  v[7] || (v[7] = Mt(" Assigned ", -1)),
                  c("span", u1, S(u(p(m))), 1)
                ]),
                c("span", h1, [
                  c("span", f1, S(d(g(m))), 1),
                  v[8] || (v[8] = Mt(" Closed ", -1)),
                  c("span", g1, S(u(_(m))), 1)
                ])
              ])
            ]),
            c("div", p1, [
              c("table", v1, [
                v[9] || (v[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", b1, [
                  (y(!0), x(U, null, Q(m, (w) => (y(), x("tr", {
                    key: `${M}-${w.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", m1, S(w.agent_name || "-"), 1),
                    c("td", _1, S(w.agent_email), 1),
                    c("td", y1, [
                      c("div", x1, [
                        c("span", k1, S(d(w.assigned_count)), 1),
                        c("span", w1, S(u(w.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", M1, [
                      c("div", S1, [
                        c("span", $1, S(d(w.closed_count)), 1),
                        c("span", C1, S(u(w.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", D1, [...v[10] || (v[10] = [
          q('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), T1 = /* @__PURE__ */ J(A1, [["__scopeId", "data-v-6cfba83b"]]), B1 = { class: "channel-metrics-card" }, F1 = {
  key: 0,
  class: "card-body"
}, P1 = {
  key: 0,
  class: "kpi-grid"
}, L1 = { class: "kpi-label" }, E1 = { class: "kpi-value" }, R1 = { class: "kpi-card total-card" }, O1 = { class: "kpi-value" }, I1 = {
  key: 1,
  class: "chart-section"
}, z1 = {
  key: 2,
  class: "empty-state"
}, N1 = {
  key: 1,
  class: "loading-state"
}, W1 = /* @__PURE__ */ et({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = nt(at(a, "theme")), l = ft({ labels: [], datasets: [] }), d = D(() => a.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), u = D(() => ({
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
    })), h = (f) => {
      if (!f || !f.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const g = f.channels_by_day, p = Object.keys(g).sort();
      if (p.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const M of Object.values(g))
        for (const w of Object.keys(M))
          _.add(w);
      const b = Array.from(_), v = {
        wsp: "#25D366",
        // WhatsApp Green oficial
        whatsapp: "#25D366",
        // WhatsApp Green oficial
        voice: "#8b5cf6",
        // Purple-500
        sms: "#f59e0b",
        // Amber-500
        web_chat: "#06b6d4",
        // Cyan-500
        email: "#ec4899",
        // Pink-500
        messenger: "#0084ff",
        // Messenger Blue
        telegram: "#0088cc",
        // Telegram Blue
        instagram: "#E4405F"
        // Instagram Pink
      }, m = b.map((M) => {
        const w = M.toLowerCase(), k = v[w] || "#9ca3af";
        return {
          label: M.toUpperCase(),
          data: p.map(($) => g[$]?.[M] || 0),
          borderColor: k,
          backgroundColor: `${k}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: k,
          pointBorderColor: k,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: p.map((M) => $t(M).format("MMM DD")),
        datasets: m
      };
    };
    return Xt(
      () => a.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, g) => (y(), x("article", B1, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      a.loading ? (y(), x("div", N1, [...g[2] || (g[2] = [
        q('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", F1, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", P1, [
          (y(!0), x(U, null, Q(Object.keys(d.value.total_by_channel), (p) => (y(), x("div", {
            class: "kpi-card",
            key: p
          }, [
            c("span", L1, S(p.toUpperCase()), 1),
            c("span", E1, S(F(V)(d.value.total_by_channel[p])), 1)
          ]))), 128)),
          c("div", R1, [
            g[0] || (g[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", O1, S(F(V)(d.value.total_conversations)), 1)
          ])
        ])) : W("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", I1, [
          K(se, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", z1, [...g[1] || (g[1] = [
          q('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), H1 = /* @__PURE__ */ J(W1, [["__scopeId", "data-v-82f175d2"]]), V1 = { class: "triage-combinations-card" }, j1 = { class: "card-header" }, Y1 = { class: "total-badge" }, q1 = {
  key: 0,
  class: "card-body"
}, U1 = { class: "chart-container" }, X1 = { class: "table-container" }, K1 = { class: "table-row" }, G1 = { class: "table-row" }, Z1 = { class: "table-cell text-center count-cell" }, Q1 = { class: "table-cell text-center count-cell" }, J1 = { class: "table-cell text-center count-cell" }, t_ = { class: "table-cell text-center count-cell" }, e_ = { class: "table-cell text-center count-cell" }, s_ = {
  key: 1,
  class: "empty-state"
}, a_ = { class: "empty-state-content" }, n_ = { class: "empty-icon-wrapper" }, o_ = {
  key: 1,
  class: "loading-state"
}, i_ = /* @__PURE__ */ et({
  __name: "TriageCombinations",
  props: {
    data: { default: () => ({ combinations: {} }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (v) => {
      n("export", v);
    }, { isDark: i, colors: r } = nt(at(a, "theme")), l = D(() => {
      const v = a.data?.combinations || {}, m = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [M, w] of Object.entries(v)) {
        const k = M.split("+").filter(Boolean);
        if (!k.includes("triage")) continue;
        const $ = k.filter((C) => C !== "triage").length;
        $ >= 4 ? m["4p"] += Number(w) || 0 : m[$] += Number(w) || 0;
      }
      return m;
    }), d = D(() => {
      const v = l.value;
      return v[0] + v[1] + v[2] + v[3] + v["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const v = d.value;
      if (!v) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const m = l.value;
      return {
        pct0: m[0] / v * 100,
        pct1: m[1] / v * 100,
        pct2: m[2] / v * 100,
        pct3: m[3] / v * 100,
        pct4p: m["4p"] / v * 100
      };
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
    }, g = (v) => v?.replace("80", "") || "#888888", p = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: g(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: g(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: g(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: g(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: g(f.c4p),
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
    })), b = (v) => `${(Number(v) || 0).toFixed(0)}`;
    return t({ isDark: i }), (v, m) => (y(), x("article", V1, [
      c("header", j1, [
        m[0] || (m[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", Y1, " Total: " + S(d.value), 1)
      ]),
      e.loading ? (y(), x("div", o_, [...m[6] || (m[6] = [
        q('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", q1, [
        u.value ? (y(), x(U, { key: 0 }, [
          c("div", U1, [
            K(Kt, {
              data: p.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", X1, [
            m[3] || (m[3] = q('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", K1, [
              m[1] || (m[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(f.c0) })
              }, S(b(h.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(f.c1) })
              }, S(b(h.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(f.c2) })
              }, S(b(h.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(f.c3) })
              }, S(b(h.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(f.c4p) })
              }, S(b(h.value.pct4p)) + "% ", 5)
            ]),
            c("div", G1, [
              m[2] || (m[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", Z1, S(F(V)(l.value[0])), 1),
              c("div", Q1, S(F(V)(l.value[1])), 1),
              c("div", J1, S(F(V)(l.value[2])), 1),
              c("div", t_, S(F(V)(l.value[3])), 1),
              c("div", e_, S(F(V)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ], 64)) : (y(), x("div", s_, [
          c("div", a_, [
            c("div", n_, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            m[4] || (m[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            m[5] || (m[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), r_ = /* @__PURE__ */ J(i_, [["__scopeId", "data-v-cb93cda2"]]), l_ = { class: "select-language-card" }, c_ = { class: "card-header" }, d_ = { class: "header-content" }, u_ = {
  key: 0,
  class: "total-badge"
}, h_ = { class: "badge-value" }, f_ = {
  key: 0,
  class: "loading-state"
}, g_ = {
  key: 1,
  class: "card-body"
}, p_ = {
  key: 0,
  class: "pie-section"
}, v_ = {
  key: 1,
  class: "empty-state"
}, b_ = /* @__PURE__ */ et({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = nt(at(s, "theme")), o = [
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
    }, r = (g) => i[g]?.label || g.toUpperCase(), l = D(
      () => s.data?.items && s.data.items.length > 0
    ), d = D(
      () => (s.data?.items || []).reduce((g, p) => g + p.count, 0)
    ), u = D(() => {
      const g = {};
      for (const p of s.data?.items || [])
        g[p.language] = (g[p.language] || 0) + p.count;
      return Object.entries(g).map(([p, _]) => ({ language: p, count: _ })).sort((p, _) => _.count - p.count);
    }), h = D(() => ({
      labels: u.value.map((g) => r(g.language)),
      datasets: [{
        data: u.value.map((g) => g.count),
        backgroundColor: u.value.map((g, p) => o[p % o.length] + "80"),
        borderColor: u.value.map((g, p) => o[p % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), f = D(() => ({
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
            color: n.value.textSecondary
          }
        },
        tooltip: {
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (g) => {
              const p = g.raw || 0, _ = d.value > 0 ? (p / d.value * 100).toFixed(1) : "0";
              return ` ${g.label}: ${p} (${_}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (g, p) => (y(), x("article", l_, [
      c("header", c_, [
        c("div", d_, [
          p[1] || (p[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          s.loading ? W("", !0) : (y(), x("div", u_, [
            p[0] || (p[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", h_, S(F(V)(d.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", f_, [...p[2] || (p[2] = [
        q('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", g_, [
        l.value ? (y(), x("section", p_, [
          K(ws, {
            data: h.value,
            options: f.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", v_, [...p[3] || (p[3] = [
          q('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), m_ = /* @__PURE__ */ J(b_, [["__scopeId", "data-v-216eadc2"]]), __ = { class: "guardrails-card" }, y_ = { class: "card-header" }, x_ = { class: "header-content" }, k_ = {
  key: 0,
  class: "total-badge"
}, w_ = { class: "badge-value" }, M_ = {
  key: 0,
  class: "loading-state"
}, S_ = {
  key: 1,
  class: "card-body"
}, $_ = { class: "summary-card" }, C_ = { class: "summary-items" }, D_ = { class: "summary-item" }, A_ = { class: "summary-value" }, T_ = { class: "summary-pct" }, B_ = { class: "summary-item" }, F_ = { class: "summary-pct" }, P_ = { class: "summary-item" }, L_ = { class: "summary-value" }, E_ = { class: "summary-pct" }, R_ = {
  key: 0,
  class: "table-section"
}, O_ = { class: "table-wrapper" }, I_ = { class: "data-table" }, z_ = { class: "table-body" }, N_ = { class: "table-cell font-medium text-center" }, W_ = { class: "table-cell text-center font-semibold" }, H_ = { class: "table-cell" }, V_ = { class: "type-badges-row" }, j_ = {
  key: 1,
  class: "empty-state"
}, Ys = 3, Y_ = /* @__PURE__ */ et({
  __name: "Guardrails",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (v) => {
      n("export", v);
    }, { isDark: i } = nt(at(a, "theme")), r = D(
      () => a.data?.items && a.data.items.length > 0
    ), l = D(
      () => (a.data?.items || []).reduce((v, m) => v + m.count, 0)
    ), d = (v) => {
      const m = {};
      for (const k of a.data?.items || [])
        m[k[v]] = (m[k[v]] || 0) + k.count;
      const M = Object.entries(m).sort((k, $) => $[1] - k[1]);
      if (M.length === 0) return { name: "—", pct: 0 };
      const w = l.value;
      return {
        name: M[0][0],
        pct: w > 0 ? Math.round(M[0][1] / w * 100) : 0
      };
    }, u = D(() => d("guardrail_type")), h = D(() => d("guardrail_action")), f = D(() => d("guardrail_source")), g = D(() => {
      const v = {};
      for (const m of a.data?.items || [])
        v[m.date] || (v[m.date] = {}), v[m.date][m.guardrail_type] = (v[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(v).map(([m, M]) => ({
        date: m,
        total: Object.values(M).reduce((w, k) => w + k, 0),
        types: Object.entries(M).map(([w, k]) => ({ type: w, count: k })).sort((w, k) => k.count - w.count)
      })).sort((m, M) => new Date(m.date).getTime() - new Date(M.date).getTime());
    }), p = ft(!1), _ = D(() => p.value ? g.value : g.value.slice(0, Ys)), b = D(() => g.value.length > Ys);
    return t({ isDark: i }), (v, m) => (y(), x("article", __, [
      c("header", y_, [
        c("div", x_, [
          m[2] || (m[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          a.loading ? W("", !0) : (y(), x("div", k_, [
            m[1] || (m[1] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", w_, S(F(V)(l.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", M_, [...m[3] || (m[3] = [
        q('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", S_, [
        r.value ? (y(), x(U, { key: 0 }, [
          c("div", $_, [
            c("div", C_, [
              c("div", D_, [
                m[4] || (m[4] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", A_, S(u.value.name), 1),
                c("span", T_, "(" + S(u.value.pct) + "%)", 1)
              ]),
              m[7] || (m[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", B_, [
                m[5] || (m[5] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: At(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, S(h.value.name), 3),
                c("span", F_, "(" + S(h.value.pct) + "%)", 1)
              ]),
              m[8] || (m[8] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", P_, [
                m[6] || (m[6] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", L_, S(f.value.name), 1),
                c("span", E_, "(" + S(f.value.pct) + "%)", 1)
              ])
            ])
          ]),
          g.value.length > 0 ? (y(), x("section", R_, [
            m[11] || (m[11] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", O_, [
              c("table", I_, [
                m[9] || (m[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", z_, [
                  (y(!0), x(U, null, Q(_.value, (M) => (y(), x("tr", {
                    key: M.date,
                    class: "table-row"
                  }, [
                    c("td", N_, S(F($t)(M.date).format("DD/MM")), 1),
                    c("td", W_, S(F(V)(M.total)), 1),
                    c("td", H_, [
                      c("div", V_, [
                        (y(!0), x(U, null, Q(M.types, (w) => (y(), x("span", {
                          key: w.type,
                          class: "type-count-badge"
                        }, S(w.type) + " (" + S(w.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            b.value ? (y(), x("button", {
              key: 0,
              class: "view-more-btn",
              onClick: m[0] || (m[0] = (M) => p.value = !p.value)
            }, [
              Mt(S(p.value ? "View less" : `View more (${g.value.length - Ys} more rows)`) + " ", 1),
              (y(), x("svg", {
                class: At(["view-more-icon", { "view-more-icon-rotated": p.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...m[10] || (m[10] = [
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : W("", !0),
            e.enableExport ? (y(), ut(F(pt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : W("", !0)
          ])) : W("", !0)
        ], 64)) : (y(), x("section", j_, [...m[12] || (m[12] = [
          q('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), q_ = /* @__PURE__ */ J(Y_, [["__scopeId", "data-v-02a2e95e"]]), U_ = { class: "dn-metrics-card" }, X_ = { class: "card-header" }, K_ = { class: "header-content" }, G_ = {
  key: 0,
  class: "total-docs-badge"
}, Z_ = { class: "badge-value" }, Q_ = {
  key: 0,
  class: "loading-state"
}, J_ = {
  key: 1,
  class: "card-body"
}, ty = { class: "kpi-grid" }, ey = { class: "kpi-card kpi-neutral" }, sy = { class: "kpi-value" }, ay = { class: "kpi-card kpi-success" }, ny = { class: "kpi-value kpi-value-success" }, oy = { class: "kpi-pct" }, iy = { class: "kpi-card kpi-danger" }, ry = { class: "kpi-value kpi-value-error" }, ly = { class: "kpi-pct" }, cy = { class: "kpi-card kpi-warning" }, dy = { class: "kpi-value kpi-value-reason" }, uy = { class: "kpi-pct" }, hy = { class: "chart-section" }, fy = { class: "chart-wrapper" }, gy = {
  key: 1,
  class: "empty-chart"
}, py = {
  key: 0,
  class: "table-section"
}, vy = { class: "table-wrapper" }, by = { class: "data-table" }, my = { class: "table-body" }, _y = { class: "table-cell text-left font-medium" }, yy = { class: "table-cell text-center font-semibold" }, xy = { class: "table-cell text-center" }, ky = { class: "impact-bar-container" }, wy = { class: "impact-label" }, My = {
  key: 1,
  class: "chart-section"
}, Sy = { class: "chart-wrapper" }, $y = { class: "system-health" }, Cy = { class: "system-health-content" }, Dy = { class: "sys-kpi-grid" }, Ay = { class: "sys-kpi" }, Ty = { class: "sys-value" }, By = { class: "sys-kpi" }, Fy = { class: "sys-value" }, Py = { class: "sys-kpi" }, Ly = { class: "sys-value sys-error" }, Ey = { class: "sys-kpi" }, Ry = { class: "sys-value" }, Oy = { class: "sys-kpi" }, Iy = { class: "sys-value" }, zy = { class: "sys-kpi" }, Ny = { class: "sys-value sys-error" }, Wy = {
  key: 1,
  class: "empty-state"
}, Hy = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (w) => {
      n("export", w);
    }, { isDark: i, colors: r } = nt(at(a, "theme")), l = D(() => {
      const w = a.data?.documentCounts?.items || [], k = a.data?.processingCounts?.items || [];
      return w.length > 0 || k.length > 0;
    }), d = D(() => {
      const w = a.data?.documentCounts?.items || [];
      return {
        processing_started: w.reduce((k, $) => k + $.processing_started, 0),
        processing_completed: w.reduce((k, $) => k + $.processing_completed, 0),
        processing_failed: w.reduce((k, $) => k + $.processing_failed, 0),
        row_count_total: w.reduce((k, $) => k + $.row_count_total, 0)
      };
    }), u = D(() => {
      const w = a.data?.processingCounts?.items || [];
      return {
        processing_started: w.reduce((k, $) => k + $.processing_started, 0),
        processing_success: w.reduce((k, $) => k + $.processing_success, 0),
        notification_sent: w.reduce((k, $) => k + $.notification_sent, 0),
        notification_failed: w.reduce((k, $) => k + $.notification_failed, 0),
        dq_phone: w.reduce((k, $) => k + $.dq_error_phone_not_found, 0),
        dq_flight: w.reduce((k, $) => k + $.dq_error_flight_not_found, 0),
        dq_booking: w.reduce((k, $) => k + $.dq_error_booking_not_found, 0),
        dq_other: w.reduce((k, $) => k + $.dq_error_other, 0),
        totalDqErrors: w.reduce((k, $) => k + $.dq_error_phone_not_found + $.dq_error_flight_not_found + $.dq_error_booking_not_found + $.dq_error_other, 0)
      };
    }), h = D(() => d.value.row_count_total || u.value.processing_started), f = D(() => Math.max(0, h.value - u.value.notification_sent)), g = (w, k) => k ? `${Math.round(w / k * 100)}%` : "0%", p = D(() => {
      const w = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((k) => k.count > 0).sort((k, $) => $.count - k.count);
      return w.length > 0 ? w[0] : { reason: "None", count: 0 };
    }), _ = D(() => {
      const w = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((k) => ({
        ...k,
        impactPct: w > 0 ? Math.round(k.count / w * 100) : 0
      }));
    }), b = D(() => {
      const w = h.value, k = u.value.processing_success, $ = Math.max(0, k - u.value.totalDqErrors), C = u.value.notification_sent, T = Math.max(0, w - k), P = u.value.totalDqErrors, z = Math.max(0, $ - C), E = (A, B) => {
        const L = B > 0 ? Math.round(A / B * 100) : 0;
        return `${A.toLocaleString()} (${L}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return k > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: k, label: E(k, w) }), T > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: E(T, w) }), $ > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: $, label: E($, w) }), P > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: P, label: E(P, w) }), C > 0 && Y.push({ source: "Contactable", target: "Notified", value: C, label: E(C, w) }), z > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: z, label: E(z, w) }), { nodes: N, links: Y };
    }), v = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, m = D(() => {
      const w = [...a.data?.processingCounts?.items || []].sort(
        (E, N) => new Date(E.date).getTime() - new Date(N.date).getTime()
      ), k = a.data?.documentCounts?.items || [], $ = {};
      for (const E of k)
        $[E.date] = ($[E.date] || 0) + E.row_count_total;
      const C = [.../* @__PURE__ */ new Set([...w.map((E) => E.date), ...k.map((E) => E.date)])].sort(), T = C.map((E) => $t(E).format("MMM DD")), P = C.map((E) => {
        const N = w.find((B) => B.date === E), Y = N?.notification_sent || 0, A = $[E] || N?.processing_started || 0;
        return A > 0 ? Math.round(Y / A * 100) : 0;
      }), z = C.map((E) => w.find((Y) => Y.date === E)?.notification_sent || 0);
      return {
        labels: T,
        datasets: [
          {
            label: "Success Rate (%)",
            data: P,
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
            data: z,
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
    }), M = D(() => ({
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
            label: (w) => w.datasetIndex === 0 ? ` Success Rate: ${w.raw}%` : ` Notifications: ${w.raw}`
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
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (w) => w + "%" },
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
    return t({ isDark: i }), (w, k) => (y(), x("article", U_, [
      c("header", X_, [
        c("div", K_, [
          k[1] || (k[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          a.loading ? W("", !0) : (y(), x("div", G_, [
            k[0] || (k[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", Z_, S(F(V)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", Q_, [...k[2] || (k[2] = [
        q('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", J_, [
        l.value ? (y(), x(U, { key: 0 }, [
          c("div", ty, [
            c("div", ey, [
              k[3] || (k[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", sy, S(F(V)(h.value)), 1)
            ]),
            c("div", ay, [
              k[4] || (k[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", ny, S(F(V)(u.value.notification_sent)), 1),
              c("span", oy, S(g(u.value.notification_sent, h.value)), 1)
            ]),
            c("div", iy, [
              k[5] || (k[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", ry, S(F(V)(f.value)), 1),
              c("span", ly, S(g(f.value, h.value)), 1)
            ]),
            c("div", cy, [
              k[6] || (k[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", dy, S(p.value.reason), 1),
              c("span", uy, S(F(V)(p.value.count)) + " cases", 1)
            ])
          ]),
          c("section", hy, [
            k[8] || (k[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", fy, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (y(), ut(ae, {
                key: 0,
                data: b.value,
                "node-colors": v,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", gy, [...k[7] || (k[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          _.value.length > 0 ? (y(), x("section", py, [
            k[10] || (k[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", vy, [
              c("table", by, [
                k[9] || (k[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", my, [
                  (y(!0), x(U, null, Q(_.value, ($) => (y(), x("tr", {
                    key: $.reason,
                    class: "table-row"
                  }, [
                    c("td", _y, S($.reason), 1),
                    c("td", yy, S(F(V)($.count)), 1),
                    c("td", xy, [
                      c("div", ky, [
                        c("div", {
                          class: "impact-bar",
                          style: _t({ width: $.impactPct + "%" })
                        }, null, 4),
                        c("span", wy, S($.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : W("", !0),
          m.value.labels.length > 0 ? (y(), x("section", My, [
            k[11] || (k[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", Sy, [
              K(se, {
                data: m.value,
                options: M.value
              }, null, 8, ["data", "options"])
            ])
          ])) : W("", !0),
          c("details", $y, [
            k[18] || (k[18] = c("summary", { class: "system-health-toggle" }, [
              c("svg", {
                class: "toggle-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                }),
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                })
              ]),
              Mt(" System Health Details ")
            ], -1)),
            c("div", Cy, [
              c("div", Dy, [
                c("div", Ay, [
                  k[12] || (k[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", Ty, S(F(V)(d.value.processing_started)), 1)
                ]),
                c("div", By, [
                  k[13] || (k[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", Fy, S(F(V)(d.value.processing_completed)), 1)
                ]),
                c("div", Py, [
                  k[14] || (k[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", Ly, S(F(V)(d.value.processing_failed)), 1)
                ]),
                c("div", Ey, [
                  k[15] || (k[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", Ry, S(F(V)(u.value.processing_started)), 1)
                ]),
                c("div", Oy, [
                  k[16] || (k[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", Iy, S(F(V)(u.value.processing_success)), 1)
                ]),
                c("div", zy, [
                  k[17] || (k[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", Ny, S(F(V)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ], 64)) : (y(), x("section", Wy, [...k[19] || (k[19] = [
          q('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Vy = /* @__PURE__ */ J(Hy, [["__scopeId", "data-v-d8baf32c"]]), jy = { class: "nps-daily-card" }, Yy = { class: "card-header" }, qy = { class: "header-content" }, Uy = {
  key: 0,
  class: "stats-badge"
}, Xy = { class: "badge-value" }, Ky = {
  key: 0,
  class: "loading-state"
}, Gy = {
  key: 1,
  class: "card-body"
}, Zy = { class: "tooltip-content" }, Qy = { class: "tooltip-title" }, Jy = { class: "tooltip-stats" }, t2 = { class: "tooltip-stat-row" }, e2 = { class: "tooltip-value" }, s2 = { class: "tooltip-stat-row" }, a2 = { class: "tooltip-value" }, n2 = { class: "tooltip-stat-row" }, o2 = { class: "tooltip-value" }, i2 = { class: "tooltip-stat-row" }, r2 = { class: "tooltip-value" }, l2 = { class: "tooltip-stat-row" }, c2 = { class: "tooltip-value" }, d2 = { class: "tooltip-stat-row" }, u2 = { class: "tooltip-value" }, h2 = {
  key: 2,
  class: "empty-state"
}, Xn = 400, Ae = 60, Kn = 90, Gn = 120, f2 = {
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
    const a = s, n = (b) => {
      a("export", b);
    }, o = e, { isDark: i } = nt(at(o, "theme")), r = D(() => o.data), l = ft(null), d = ft({
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
      const b = r.value.nps_by_day.length;
      return Math.max(800, Ae * 2 + b * Gn);
    }), h = (b, v) => {
      const M = (b - 1) / 9;
      return Ae + v - M * v;
    }, f = (b) => b ? $t(b).format("DD-MM-YYYY") : "", g = D(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const b = [], v = Xn - Ae - Kn;
      return r.value.nps_by_day.forEach((m, M) => {
        const w = m.min_score || 0, k = m.q1_score || 0, $ = m.median_score || 0, C = m.q3_score || 0, T = m.max_score || 0, P = m.average_score || 0;
        b.push({
          label: f(m.date),
          responseCount: m.nps_responses_count || 0,
          isTotal: !1,
          low: w,
          q1: k,
          median: $,
          q3: C,
          high: T,
          average: P,
          highY: h(T, v),
          lowY: h(w, v),
          q1Y: h(k, v),
          q3Y: h(C, v),
          medianY: h($, v),
          averageY: P > 0 ? h(P, v) : null,
          centerX: Ae + (M + 1) * Gn
        });
      }), b;
    }), p = (b, v) => {
      if (!l.value || !v || v.horizontal) return;
      const m = l.value.getBoundingClientRect(), M = b.clientX, w = b.clientY, k = 140, $ = 160, C = 10, T = 15;
      let P = M - m.left - k / 2, z = w - m.top - $ - T;
      P = Math.max(C, Math.min(P, m.width - k - C)), z < C && (z = w - m.top + T), z = Math.max(C, Math.min(z, m.height - $ - C)), d.value = {
        visible: !0,
        x: P,
        y: z,
        date: v.label || "",
        min: v.low !== void 0 ? v.low.toFixed(1) : "N/A",
        max: v.high !== void 0 ? v.high.toFixed(1) : "N/A",
        q1: v.open !== void 0 ? v.open.toFixed(1) : "N/A",
        avg: v.average !== void 0 && v.average > 0 ? v.average.toFixed(1) : "N/A",
        q3: v.close !== void 0 ? v.close.toFixed(1) : "N/A",
        median: v.median !== void 0 ? v.median.toFixed(1) : "N/A"
      };
    }, _ = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (b, v) => (y(), x("article", jy, [
      c("header", Yy, [
        c("div", qy, [
          v[1] || (v[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", Uy, [
            v[0] || (v[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", Xy, S(r.value.nps_by_day.length), 1)
          ])) : W("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", Ky, [...v[2] || (v[2] = [
        q('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", Gy, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          g.value && g.value.length > 0 ? (y(), ut(Jo, {
            key: 0,
            "candlestick-data": g.value,
            "chart-width": u.value,
            "chart-height": Xn,
            "chart-margin": Ae,
            "chart-bottom-margin": Kn,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: p,
            onCandleLeave: _
          }, null, 8, ["candlestick-data", "chart-width"])) : W("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: _t({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", Zy, [
              c("div", Qy, S(d.value.date), 1),
              v[9] || (v[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", Jy, [
                c("div", t2, [
                  v[3] || (v[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", e2, S(d.value.min), 1)
                ]),
                c("div", s2, [
                  v[4] || (v[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", a2, S(d.value.q1), 1)
                ]),
                c("div", n2, [
                  v[5] || (v[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", o2, S(d.value.median), 1)
                ]),
                c("div", i2, [
                  v[6] || (v[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", r2, S(d.value.avg), 1)
                ]),
                c("div", l2, [
                  v[7] || (v[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", c2, S(d.value.q3), 1)
                ]),
                c("div", d2, [
                  v[8] || (v[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", u2, S(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : W("", !0)
        ], 512),
        e.enableExport ? (y(), ut(F(pt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : W("", !0)
      ])) : (y(), x("div", h2, [...v[10] || (v[10] = [
        q('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, ei = /* @__PURE__ */ J(f2, [["__scopeId", "data-v-b20112a7"]]), g2 = { class: "nps-overview-card" }, p2 = { class: "card-header" }, v2 = { class: "header-content" }, b2 = { class: "header-badges" }, m2 = {
  key: 0,
  class: "stats-badge"
}, _2 = { class: "badge-value" }, y2 = {
  key: 1,
  class: "stats-badge"
}, x2 = { class: "badge-value" }, k2 = {
  key: 0,
  class: "loading-state"
}, w2 = {
  key: 1,
  class: "card-body"
}, M2 = { class: "chart-wrapper" }, S2 = {
  key: 2,
  class: "empty-state"
}, $2 = 500, C2 = 60, D2 = 80, A2 = {
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
    const a = s, n = (d) => {
      a("export", d);
    }, o = e, { isDark: i } = nt(at(o, "theme")), r = D(() => o.data), l = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", g2, [
      c("header", p2, [
        c("div", v2, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", b2, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", m2, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", _2, S(r.value.total_nps_responses), 1)
            ])) : W("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", y2, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", x2, S(r.value.p95_score || 0), 1)
            ])) : W("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", k2, [...u[3] || (u[3] = [
        q('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", w2, [
        c("div", M2, [
          K(ti, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": $2,
            "chart-margin": C2,
            "chart-bottom-margin": D2
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), ut(F(pt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : W("", !0)
      ])) : (y(), x("div", S2, [...u[4] || (u[4] = [
        q('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, si = /* @__PURE__ */ J(A2, [["__scopeId", "data-v-30fe5f88"]]), T2 = { class: "nps-metrics-container" }, B2 = {
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
    const s = t, a = (n) => {
      s("export", n);
    };
    return (n, o) => (y(), x("div", T2, [
      K(si, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      K(ei, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, F2 = /* @__PURE__ */ J(B2, [["__scopeId", "data-v-25fe3b80"]]), P2 = { class: "aws-cost-card" }, L2 = { class: "card-header" }, E2 = { class: "header-main" }, R2 = { class: "header-content" }, O2 = { class: "card-title" }, I2 = { class: "header-stats" }, z2 = { class: "stat-badge primary" }, N2 = { class: "stat-value" }, W2 = { class: "stat-badge secondary" }, H2 = { class: "stat-value" }, V2 = { class: "card-body" }, j2 = {
  key: 0,
  class: "loading-state"
}, Y2 = {
  key: 1,
  class: "chart-section"
}, q2 = { class: "chart-container" }, U2 = {
  key: 2,
  class: "empty-state"
}, X2 = { class: "empty-state-content" }, K2 = { class: "empty-icon-wrapper" }, G2 = {
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
    const t = e, { isDark: s, colors: a } = nt(at(t, "theme")), n = D(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, u = Array.isArray(l) && l.length > 0, h = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let f = [];
      return u ? f = l : h && (f = d.map((g, p) => ({
        date: g,
        allocated_cost: r.allocatedCostSeries[p] ?? 0,
        aws_cost: r.awsCostSeries[p] ?? 0,
        airline_conversations: r.airlineConversationsSeries[p] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), o = D(() => {
      const r = n.value.daily;
      return {
        labels: r.map((d) => d.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((d) => d.allocated_cost),
            borderColor: a.value.primaryLight,
            backgroundColor: s.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !0,
            yAxisID: "y"
          },
          {
            label: "AWS Cost",
            data: r.map((d) => d.aws_cost),
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
            data: r.map((d) => d.airline_conversations),
            borderColor: a.value.info,
            backgroundColor: s.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
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
            color: a.value.textSecondary,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11,
              weight: "600"
            }
          }
        },
        tooltip: {
          padding: 12,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
          borderColor: a.value.tooltipBorder,
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
            color: a.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 },
            callback: (r) => ot(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, l) => (y(), x("article", P2, [
      c("header", L2, [
        c("div", E2, [
          c("div", R2, [
            c("h3", O2, S(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", I2, [
            c("div", z2, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", N2, S(F(ot)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", W2, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", H2, S(F(ot)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", V2, [
        e.loading ? (y(), x("div", j2, [...l[3] || (l[3] = [
          q('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", Y2, [
          c("div", q2, [
            K(se, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", U2, [
          c("div", X2, [
            c("div", K2, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, Z2 = /* @__PURE__ */ J(G2, [["__scopeId", "data-v-c023bd59"]]), Q2 = { class: "cost-usage-card" }, J2 = {
  key: 0,
  class: "card-body"
}, tx = {
  key: 0,
  class: "chart-section"
}, ex = { class: "chart-container" }, sx = { class: "kpi-grid" }, ax = { class: "kpi-card" }, nx = { class: "kpi-value" }, ox = { class: "kpi-card" }, ix = { class: "kpi-value" }, rx = { class: "kpi-card" }, lx = { class: "kpi-value" }, cx = { class: "kpi-card" }, dx = { class: "kpi-value" }, ux = { class: "kpi-card" }, hx = { class: "kpi-value" }, fx = { class: "kpi-card highlighted" }, gx = { class: "kpi-value gradient-text" }, px = {
  key: 1,
  class: "empty-state"
}, vx = { class: "empty-state-content" }, bx = { class: "empty-icon-wrapper" }, mx = {
  key: 1,
  class: "loading-state"
}, _x = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, { isDark: n, colors: o } = nt(at(a, "theme")), i = (p) => {
      const _ = new Date(p), b = String(_.getDate()).padStart(2, "0"), v = String(_.getMonth() + 1).padStart(2, "0");
      return `${b}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, b) => _ + (b.input_cost || 0), 0);
    }), d = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, b) => _ + (b.output_cost || 0), 0);
    }), u = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, b) => _ + (b.cache_read_cost || 0), 0);
    }), h = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((_, b) => _ + (b.cache_write_cost || 0), 0);
    }), f = D(() => {
      const p = a.data?.costs_by_day || {}, _ = Object.keys(p).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const b = _.map((m) => i(m)), v = [
        {
          label: "Input Cost",
          data: _.map((m) => p[m]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: _.map((m) => p[m]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: _.map((m) => p[m]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: _.map((m) => p[m]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: v
      };
    }), g = D(() => a.options ? a.options : {
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
            label: function(p) {
              let _ = p.dataset.label || "";
              return _ && (_ += ": "), p.parsed.y !== null && (_ += ot(p.parsed.y)), _;
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
            callback: function(p) {
              return ot(p);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (p, _) => (y(), x("article", Q2, [
      _[9] || (_[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", mx, [..._[8] || (_[8] = [
        q('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", J2, [
        f.value.labels && f.value.labels.length ? (y(), x("section", tx, [
          c("div", ex, [
            K(Kt, {
              data: f.value,
              options: g.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", sx, [
            c("div", ax, [
              _[0] || (_[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", nx, S(F(ot)(e.data.total_cost)), 1)
            ]),
            c("div", ox, [
              _[1] || (_[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", ix, S(F(ot)(l.value)), 1)
            ]),
            c("div", rx, [
              _[2] || (_[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", lx, S(F(ot)(d.value)), 1)
            ]),
            c("div", cx, [
              _[3] || (_[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", dx, S(F(ot)(u.value)), 1)
            ]),
            c("div", ux, [
              _[4] || (_[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", hx, S(F(ot)(h.value)), 1)
            ]),
            c("div", fx, [
              _[5] || (_[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", gx, S(F(ot)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", px, [
          c("div", vx, [
            c("div", bx, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            _[6] || (_[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            _[7] || (_[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), yx = /* @__PURE__ */ J(_x, [["__scopeId", "data-v-62f96954"]]), xx = { class: "token-usage-card" }, kx = {
  key: 0,
  class: "card-body"
}, wx = {
  key: 0,
  class: "chart-section"
}, Mx = { class: "chart-container" }, Sx = { class: "kpi-grid" }, $x = { class: "kpi-card" }, Cx = { class: "kpi-value" }, Dx = { class: "kpi-card" }, Ax = { class: "kpi-value" }, Tx = { class: "kpi-card" }, Bx = { class: "kpi-value" }, Fx = { class: "kpi-card" }, Px = { class: "kpi-value" }, Lx = { class: "kpi-card" }, Ex = { class: "kpi-value" }, Rx = {
  key: 1,
  class: "empty-state"
}, Ox = { class: "empty-state-content" }, Ix = { class: "empty-icon-wrapper" }, zx = {
  key: 1,
  class: "loading-state"
}, Nx = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, { isDark: n, colors: o } = nt(at(a, "theme")), i = (u) => {
      const h = new Date(u), f = String(h.getDate()).padStart(2, "0"), g = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((p) => i(p)), g = [
        {
          label: "Input Tokens",
          data: h.map((p) => u[p]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((p) => u[p]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((p) => u[p]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((p) => u[p]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
        datasets: g
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
    return t({ isDark: n }), (u, h) => (y(), x("article", xx, [
      h[8] || (h[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", zx, [...h[7] || (h[7] = [
        q('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", kx, [
        l.value.labels && l.value.labels.length ? (y(), x("section", wx, [
          c("div", Mx, [
            K(Kt, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Sx, [
            c("div", $x, [
              h[0] || (h[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", Cx, S(F(V)(e.data.total_tokens)), 1)
            ]),
            c("div", Dx, [
              h[1] || (h[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", Ax, S(F(V)(e.data.total_input_tokens)), 1)
            ]),
            c("div", Tx, [
              h[2] || (h[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", Bx, S(F(V)(e.data.total_output_tokens)), 1)
            ]),
            c("div", Fx, [
              h[3] || (h[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", Px, S(F(V)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", Lx, [
              h[4] || (h[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", Ex, S(F(V)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", Rx, [
          c("div", Ox, [
            c("div", Ix, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Wx = /* @__PURE__ */ J(Nx, [["__scopeId", "data-v-e9e355be"]]), Hx = { class: "conversation-count-card" }, Vx = { class: "card-header" }, jx = { class: "header-right" }, Yx = { class: "stat-badge" }, qx = { class: "stat-value" }, Ux = {
  key: 0,
  class: "card-body"
}, Xx = {
  key: 0,
  class: "chart-section"
}, Kx = { class: "chart-container" }, Gx = {
  key: 1,
  class: "empty-state"
}, Zx = { class: "empty-state-content" }, Qx = { class: "empty-icon-wrapper" }, Jx = {
  key: 1,
  class: "loading-state"
}, tk = /* @__PURE__ */ et({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = nt(at(s, "theme")), o = (l) => {
      const d = new Date(l), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    D(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = o(s.data.start_date), d = o(s.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const i = D(() => {
      const l = s.data?.conversations_by_day || {}, d = Object.keys(l).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const u = d.map((f) => o(f)), h = [
        {
          label: "Conversations",
          data: d.map((f) => l[f] || 0),
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
        datasets: h
      };
    }), r = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
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
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
            label: function(l) {
              let d = l.dataset.label || "";
              return d && (d += ": "), l.parsed.y !== null && (d += l.parsed.y), d;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: n.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: a }), (l, d) => (y(), x("article", Hx, [
      c("header", Vx, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", jx, [
          c("div", Yx, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", qx, S(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", Jx, [...d[4] || (d[4] = [
        q('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ux, [
        i.value.labels && i.value.labels.length ? (y(), x("section", Xx, [
          c("div", Kx, [
            K(se, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Gx, [
          c("div", Zx, [
            c("div", Qx, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ek = /* @__PURE__ */ J(tk, [["__scopeId", "data-v-846f24b1"]]), sk = { class: "top-agents-card" }, ak = {
  key: 0,
  class: "card-body"
}, nk = {
  key: 0,
  class: "charts-grid"
}, ok = { class: "chart-section" }, ik = { class: "chart-container" }, rk = { class: "chart-section" }, lk = { class: "chart-container" }, ck = {
  key: 1,
  class: "empty-state"
}, dk = { class: "empty-state-content" }, uk = { class: "empty-icon-wrapper" }, hk = {
  key: 1,
  class: "loading-state"
}, fk = /* @__PURE__ */ et({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = nt(at(s, "theme")), o = D(() => s.data?.top_agents && s.data.top_agents.length > 0), i = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, g) => (g.total_cost || 0) - (f.total_cost || 0)) : []), r = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, g) => (g.total_tokens || 0) - (f.total_tokens || 0)) : []), l = D(() => {
      const f = i.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((g) => g.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((g) => g.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = D(() => {
      const f = r.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((g) => g.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((g) => g.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = D(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              const g = f.label, p = s.data?.top_agents?.find((_) => _.agent_type === g);
              return p ? [
                `Total Cost: ${ot(p.total_cost)}`,
                `Input Cost: ${ot(p.total_input_tokens_cost)}`,
                `Output Cost: ${ot(p.total_output_tokens_cost)}`,
                `Cache Read: ${ot(p.total_read_tokens_cost)}`,
                `Cache Write: ${ot(p.total_write_tokens_cost)}`
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
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return ot(f);
            }
          }
        }
      }
    }), h = D(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              const g = f.label, p = s.data?.top_agents?.find((_) => _.agent_type === g);
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
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return f.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (f, g) => (y(), x("article", sk, [
      g[5] || (g[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", hk, [...g[4] || (g[4] = [
        q('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", ak, [
        o.value ? (y(), x("div", nk, [
          c("section", ok, [
            g[0] || (g[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", ik, [
              K(Kt, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", rk, [
            g[1] || (g[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", lk, [
              K(Kt, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", ck, [
          c("div", dk, [
            c("div", uk, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            g[2] || (g[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            g[3] || (g[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), gk = /* @__PURE__ */ J(fk, [["__scopeId", "data-v-78efa6dc"]]), pk = { class: "top-agents-card" }, vk = {
  key: 0,
  class: "card-body"
}, bk = {
  key: 0,
  class: "chart-section"
}, mk = { class: "chart-container" }, _k = {
  key: 1,
  class: "empty-state"
}, yk = { class: "empty-state-content" }, xk = { class: "empty-icon-wrapper" }, kk = {
  key: 1,
  class: "loading-state"
}, wk = /* @__PURE__ */ et({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = nt(at(s, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = D(() => s.data?.top_agents ? s.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = D(() => i.value.length > 0), l = D(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), d = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((_) => {
        const b = _.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), g = h.map((_) => {
        const b = _.agent_type?.toLowerCase();
        return o[b] || "#a78bfa";
      });
      return {
        labels: h.map((_) => {
          const b = _.conversations || 0, v = l.value ? b / l.value * 100 : 0;
          return `${_.agent_type} - ${b.toLocaleString()} (${v.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((_) => _.conversations || 0),
            backgroundColor: f,
            borderColor: g,
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
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              const f = (h.label || "").toString(), g = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce((b, v) => b + (Number(v) || 0), 0), _ = p ? g / p * 100 : 0;
              return `${f}: ${g.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, f) => (y(), x("article", pk, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", kk, [...f[2] || (f[2] = [
        q('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", vk, [
        r.value ? (y(), x("section", bk, [
          c("div", mk, [
            K(ws, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", _k, [
          c("div", yk, [
            c("div", xk, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Mk = /* @__PURE__ */ J(wk, [["__scopeId", "data-v-05e3e74d"]]), Sk = { class: "daily-cost-trends-card" }, $k = {
  key: 0,
  class: "card-body"
}, Ck = {
  key: 0,
  class: "chart-section"
}, Dk = { class: "chart-container" }, Ak = {
  key: 1,
  class: "empty-state"
}, Tk = { class: "empty-state-content" }, Bk = { class: "empty-icon-wrapper" }, Fk = {
  key: 1,
  class: "loading-state"
}, Pk = /* @__PURE__ */ et({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = nt(at(s, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const b = [...d].sort((v, m) => v.date.localeCompare(m.date));
        return {
          labels: b.map((v) => o(v.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((v) => Number(v.value) || 0),
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
      const u = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {}, g = Object.keys(u).filter((b) => h[b]).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.map((b) => o(b)), _ = g.map((b) => {
        const v = u[b]?.total_cost || 0, m = h[b] || 0;
        return m > 0 ? v / m : 0;
      });
      return {
        labels: p,
        datasets: [
          {
            label: "Mean USD/conv",
            data: _,
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
    }), l = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              return u && (u += ": "), d.parsed.y !== null && (u += ot(d.parsed.y)), u;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: n.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(d) {
              return ot(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (y(), x("article", Sk, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Fk, [...u[2] || (u[2] = [
        q('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", $k, [
        i.value ? (y(), x("section", Ck, [
          c("div", Dk, [
            K(se, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Ak, [
          c("div", Tk, [
            c("div", Bk, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Lk = /* @__PURE__ */ J(Pk, [["__scopeId", "data-v-e5bac1c5"]]), Ek = { class: "model-usage-card" }, Rk = {
  key: 0,
  class: "loading-state"
}, Ok = {
  key: 1,
  class: "card-body"
}, Ik = { class: "tabs-container" }, zk = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, Nk = ["aria-selected"], Wk = ["aria-selected"], Hk = {
  key: 0,
  class: "table-section"
}, Vk = { class: "table-wrapper" }, jk = { class: "data-table" }, Yk = { class: "table-header-row" }, qk = { class: "table-header" }, Uk = { class: "table-body" }, Xk = { class: "table-cell name-cell" }, Kk = { class: "table-cell text-center" }, Gk = { class: "table-cell text-center" }, Zk = { class: "table-cell text-center" }, Qk = { class: "table-cell text-center cost-cell" }, Jk = { class: "table-cell text-center" }, t5 = {
  key: 1,
  class: "empty-state"
}, e5 = { class: "empty-state-content" }, s5 = { class: "empty-icon-wrapper" }, a5 = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (h) => {
      n("export", h);
    }, { isDark: i } = nt(at(a, "theme")), r = ft("by_model"), l = D(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = (h) => h == null ? "0" : V(h), u = (h) => h == null ? "$0.00" : ot(h);
    return t({ isDark: i }), (h, f) => (y(), x("article", Ek, [
      f[10] || (f[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Rk, [...f[2] || (f[2] = [
        q('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", Ok, [
        c("div", Ik, [
          c("nav", zk, [
            c("button", {
              onClick: f[0] || (f[0] = (g) => r.value = "by_model"),
              class: At(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, Nk),
            c("button", {
              onClick: f[1] || (f[1] = (g) => r.value = "by_provider"),
              class: At(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, Wk)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", Hk, [
          c("div", Vk, [
            c("table", jk, [
              c("thead", null, [
                c("tr", Yk, [
                  c("th", qk, S(r.value === "by_model" ? "Model" : "Provider"), 1),
                  f[3] || (f[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  f[4] || (f[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  f[5] || (f[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  f[6] || (f[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  f[7] || (f[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", Uk, [
                (y(!0), x(U, null, Q(l.value, (g, p) => (y(), x("tr", {
                  key: p,
                  class: "table-row"
                }, [
                  c("td", Xk, S(p), 1),
                  c("td", Kk, S(u(g.avg_cost_per_message)), 1),
                  c("td", Gk, S(d(g.avg_tokens_per_message)), 1),
                  c("td", Zk, S(d(g.message_count)), 1),
                  c("td", Qk, S(u(g.total_cost)), 1),
                  c("td", Jk, S(d(g.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", t5, [
          c("div", e5, [
            c("div", s5, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            f[8] || (f[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            f[9] || (f[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), n5 = /* @__PURE__ */ J(a5, [["__scopeId", "data-v-a7bf2d7b"]]), o5 = { class: "message-roles-card" }, i5 = {
  key: 0,
  class: "loading-state"
}, r5 = {
  key: 1,
  class: "card-body"
}, l5 = {
  key: 0,
  class: "table-section"
}, c5 = { class: "table-wrapper" }, d5 = { class: "data-table" }, u5 = { class: "table-body" }, h5 = { class: "table-cell name-cell" }, f5 = { class: "table-cell text-center" }, g5 = { class: "table-cell text-center" }, p5 = { class: "table-cell text-center" }, v5 = { class: "table-cell text-center cost-cell" }, b5 = { class: "table-cell text-center" }, m5 = {
  key: 1,
  class: "empty-state"
}, _5 = { class: "empty-state-content" }, y5 = { class: "empty-icon-wrapper" }, x5 = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (g) => {
      n("export", g);
    }, { isDark: i } = nt(at(a, "theme")), r = ["assistant", "system", "user"], l = D(() => a.data?.total_by_role || {}), d = D(() => Object.keys(l.value).length > 0), u = (g) => g == null ? "0" : V(g), h = (g) => g == null ? "$0.00" : ot(g), f = (g) => g.charAt(0).toUpperCase() + g.slice(1);
    return t({ isDark: i }), (g, p) => (y(), x("article", o5, [
      p[4] || (p[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", i5, [...p[0] || (p[0] = [
        q('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", r5, [
        d.value ? (y(), x("div", l5, [
          c("div", c5, [
            c("table", d5, [
              p[1] || (p[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Role"),
                  c("th", { class: "table-header" }, "Avg cost per message"),
                  c("th", { class: "table-header" }, "Avg tokens per message"),
                  c("th", { class: "table-header" }, "Message count"),
                  c("th", { class: "table-header" }, "Total cost"),
                  c("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              c("tbody", u5, [
                (y(), x(U, null, Q(r, (_) => c("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  c("td", h5, S(f(_)), 1),
                  c("td", f5, S(h(l.value[_]?.avg_cost_per_message)), 1),
                  c("td", g5, S(u(l.value[_]?.avg_tokens_per_message)), 1),
                  c("td", p5, S(u(l.value[_]?.message_count)), 1),
                  c("td", v5, S(h(l.value[_]?.total_cost)), 1),
                  c("td", b5, S(u(l.value[_]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", m5, [
          c("div", _5, [
            c("div", y5, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            p[2] || (p[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            p[3] || (p[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), k5 = /* @__PURE__ */ J(x5, [["__scopeId", "data-v-6a953cfc"]]), w5 = { class: "cost-per-conversation-card" }, M5 = {
  key: 0,
  class: "card-body"
}, S5 = {
  key: 0,
  class: "chart-section"
}, $5 = { class: "chart-container" }, C5 = { class: "kpi-grid" }, D5 = { class: "kpi-card" }, A5 = { class: "kpi-value" }, T5 = { class: "kpi-card" }, B5 = { class: "kpi-value" }, F5 = { class: "kpi-card" }, P5 = { class: "kpi-value" }, L5 = { class: "kpi-card highlighted" }, E5 = { class: "kpi-value gradient-text" }, R5 = {
  key: 1,
  class: "empty-state"
}, O5 = { class: "empty-state-content" }, I5 = { class: "empty-icon-wrapper" }, z5 = {
  key: 1,
  class: "loading-state"
}, N5 = /* @__PURE__ */ et({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (m) => {
      n("export", m);
    }, { isDark: i, colors: r } = nt(at(a, "theme")), l = {
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
    }, d = (m) => m.agent_type || m.agent_id || m.agent_name || "", u = (m) => m.agent_name ? m.agent_name : d(m).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (m) => {
      const M = d(m).toLowerCase();
      for (const [w, k] of Object.entries(l))
        if (M.includes(w))
          return k;
      return "#9ca3af";
    }, f = D(() => [...a.data?.top_agents || []].sort((M, w) => w.avg_cost_per_conversation - M.avg_cost_per_conversation)), g = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : f.value.reduce((m, M) => m + M.conversations, 0)), p = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : f.value.reduce((m, M) => m + M.total_cost, 0)), _ = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : g.value === 0 ? 0 : p.value / g.value), b = D(() => {
      const m = f.value;
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const M = m.map(($) => u($)), w = m.map(($) => $.avg_cost_per_conversation), k = m.map(($) => h($));
      return {
        labels: M,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: k.map(($) => `${$}80`),
            borderColor: k,
            borderWidth: 1
          }
        ]
      };
    }), v = D(() => a.options ? a.options : {
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
            label: function(m) {
              const M = f.value[m.dataIndex];
              return [
                `Cost: ${ot(m.parsed.x)}`,
                `Conversations: ${V(M.conversations)}`,
                `Total Cost: ${ot(M.total_cost)}`
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
            callback: function(m) {
              return ot(m);
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
    return t({ isDark: i }), (m, M) => (y(), x("article", w5, [
      M[7] || (M[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", z5, [...M[6] || (M[6] = [
        q('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", M5, [
        b.value.labels && b.value.labels.length ? (y(), x("section", S5, [
          c("div", $5, [
            K(Kt, {
              data: b.value,
              options: v.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", C5, [
            c("div", D5, [
              M[0] || (M[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", A5, S(f.value.length), 1)
            ]),
            c("div", T5, [
              M[1] || (M[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", B5, S(F(V)(g.value)), 1)
            ]),
            c("div", F5, [
              M[2] || (M[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", P5, S(F(ot)(p.value)), 1)
            ]),
            c("div", L5, [
              M[3] || (M[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", E5, S(F(ot)(_.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ut(F(pt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", R5, [
          c("div", O5, [
            c("div", I5, [
              K(F(Tt), { class: "empty-icon" })
            ]),
            M[4] || (M[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            M[5] || (M[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), W5 = /* @__PURE__ */ J(N5, [["__scopeId", "data-v-17f6615c"]]), G5 = {
  install(e) {
    e.component("KiutChartBar", Kt), e.component("KiutChartLine", se), e.component("KiutPieChart", ws), e.component("KiutBoxplotChart", rh), e.component("KiutCandlestickChart", Jo), e.component("KiutHistogramChart", ti), e.component("KiutSankeyChart", ae), e.component("KiutAgentsPerDay", pg), e.component("KiutBookingManager", Jg), e.component("KiutCheckin", wp), e.component("KiutCheckinMetrics", Xp), e.component("KiutCheckinSegments", x0), e.component("KiutDisruption", nv), e.component("KiutFAQ", kv), e.component("KiutMessagesPerAgent", Bv), e.component("KiutRecordLocator", sb), e.component("KiutSalesByChannel", yb), e.component("KiutSeller", Zb), e.component("KiutTopAgents", im), e.component("KiutPaymentMethod", Hm), e.component("KiutAgentHumanConversations", T1), e.component("KiutChannelMetrics", H1), e.component("KiutTriageCombinations", r_), e.component("KiutSelectLanguage", m_), e.component("KiutGuardrails", q_), e.component("KiutDisruptionNotifier", Vy), e.component("KiutNpsDailyMetrics", ei), e.component("KiutNpsMetrics", F2), e.component("KiutNpsOverviewMetrics", si), e.component("KiutAWSCost", Z2), e.component("KiutCostUsage", yx), e.component("KiutTokenUsage", Wx), e.component("KiutConversationCount", ek), e.component("KiutTopAgentsAnalysis", gk), e.component("KiutTopAgentsPie", Mk), e.component("KiutDailyCostTrends", Lk), e.component("KiutModelUsage", n5), e.component("KiutMessageRoles", k5), e.component("KiutCostPerConversations", W5);
  }
};
export {
  Z2 as AWSCost,
  T1 as AgentHumanConversations,
  pg as AgentsPerDay,
  Jg as BookingManager,
  rh as BoxplotChart,
  Jo as CandlestickChart,
  H1 as ChannelMetrics,
  Kt as ChartBar,
  se as ChartLine,
  wp as Checkin,
  Xp as CheckinMetrics,
  x0 as CheckinSegments,
  ek as ConversationCount,
  W5 as CostPerConversations,
  yx as CostUsage,
  Lk as DailyCostTrends,
  nv as Disruption,
  Vy as DisruptionNotifier,
  kv as FAQ,
  q_ as Guardrails,
  ti as HistogramChart,
  G5 as KiutUIPlugin,
  k5 as MessageRoles,
  Bv as MessagesPerAgent,
  n5 as ModelUsage,
  ei as NpsDailyMetrics,
  F2 as NpsMetrics,
  si as NpsOverviewMetrics,
  Hm as PaymentMethod,
  ws as PieChart,
  sb as RecordLocator,
  yb as SalesByChannel,
  ae as SankeyChart,
  m_ as SelectLanguage,
  Zb as Seller,
  Wx as TokenUsage,
  im as TopAgents,
  gk as TopAgentsAnalysis,
  Mk as TopAgentsPie,
  r_ as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
