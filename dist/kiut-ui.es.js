import { defineComponent as st, shallowRef as Gn, h as qs, ref as pt, onMounted as Ze, onUnmounted as Zn, watch as zt, toRaw as Us, nextTick as Xt, version as no, isProxy as Qn, computed as D, toRef as ot, openBlock as y, createElementBlock as x, createVNode as Q, unref as B, normalizeStyle as wt, createElementVNode as c, toDisplayString as M, createCommentVNode as W, Fragment as q, renderList as Z, onBeforeUnmount as Jn, createStaticVNode as X, withDirectives as we, vShow as xa, normalizeClass as Qt, createBlock as gt, createTextVNode as Jt, resolveDynamicComponent as ti, Transition as io, withCtx as oo, renderSlot as gs, useSlots as ro, Teleport as lo, withModifiers as ka, withKeys as co, vModelText as Bs, vModelSelect as uo } from "vue";
import * as wa from "echarts/core";
import { TooltipComponent as ho, TitleComponent as fo } from "echarts/components";
import { SankeyChart as go } from "echarts/charts";
import { CanvasRenderer as po } from "echarts/renderers";
import Tt from "moment";
function Qe(e) {
  return e + 0.5 | 0;
}
const se = (e, t, s) => Math.max(Math.min(e, s), t);
function Re(e) {
  return se(Qe(e * 2.55), 0, 255);
}
function ie(e) {
  return se(Qe(e * 255), 0, 255);
}
function Kt(e) {
  return se(Qe(e / 2.55) / 100, 0, 1);
}
function Sa(e) {
  return se(Qe(e * 100), 0, 100);
}
const Rt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ks = [..."0123456789ABCDEF"], bo = (e) => Ks[e & 15], vo = (e) => Ks[(e & 240) >> 4] + Ks[e & 15], Je = (e) => (e & 240) >> 4 === (e & 15), mo = (e) => Je(e.r) && Je(e.g) && Je(e.b) && Je(e.a);
function _o(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & Rt[e[1]] * 17,
    g: 255 & Rt[e[2]] * 17,
    b: 255 & Rt[e[3]] * 17,
    a: t === 5 ? Rt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: Rt[e[1]] << 4 | Rt[e[2]],
    g: Rt[e[3]] << 4 | Rt[e[4]],
    b: Rt[e[5]] << 4 | Rt[e[6]],
    a: t === 9 ? Rt[e[7]] << 4 | Rt[e[8]] : 255
  })), s;
}
const yo = (e, t) => e < 255 ? t(e) : "";
function xo(e) {
  var t = mo(e) ? bo : vo;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + yo(e.a, t) : void 0;
}
const ko = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ei(e, t, s) {
  const a = t * Math.min(s, 1 - s), n = (i, o = (i + e / 30) % 12) => s - a * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [n(0), n(8), n(4)];
}
function wo(e, t, s) {
  const a = (n, i = (n + e / 60) % 6) => s - s * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [a(5), a(3), a(1)];
}
function So(e, t, s) {
  const a = ei(e, 1, 0.5);
  let n;
  for (t + s > 1 && (n = 1 / (t + s), t *= n, s *= n), n = 0; n < 3; n++)
    a[n] *= 1 - t - s, a[n] += t;
  return a;
}
function Mo(e, t, s, a, n) {
  return e === n ? (t - s) / a + (t < s ? 6 : 0) : t === n ? (s - e) / a + 2 : (e - t) / a + 4;
}
function sa(e) {
  const s = e.r / 255, a = e.g / 255, n = e.b / 255, i = Math.max(s, a, n), o = Math.min(s, a, n), r = (i + o) / 2;
  let l, d, u;
  return i !== o && (u = i - o, d = r > 0.5 ? u / (2 - i - o) : u / (i + o), l = Mo(s, a, n, u, i), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function aa(e, t, s, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, a)).map(ie);
}
function na(e, t, s) {
  return aa(ei, e, t, s);
}
function $o(e, t, s) {
  return aa(So, e, t, s);
}
function Co(e, t, s) {
  return aa(wo, e, t, s);
}
function si(e) {
  return (e % 360 + 360) % 360;
}
function Do(e) {
  const t = ko.exec(e);
  let s = 255, a;
  if (!t)
    return;
  t[5] !== a && (s = t[6] ? Re(+t[5]) : ie(+t[5]));
  const n = si(+t[2]), i = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? a = $o(n, i, o) : t[1] === "hsv" ? a = Co(n, i, o) : a = na(n, i, o), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: s
  };
}
function Ao(e, t) {
  var s = sa(e);
  s[0] = si(s[0] + t), s = na(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function To(e) {
  if (!e)
    return;
  const t = sa(e), s = t[0], a = Sa(t[1]), n = Sa(t[2]);
  return e.a < 255 ? `hsla(${s}, ${a}%, ${n}%, ${Kt(e.a)})` : `hsl(${s}, ${a}%, ${n}%)`;
}
const Ma = {
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
}, $a = {
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
function Bo() {
  const e = {}, t = Object.keys($a), s = Object.keys(Ma);
  let a, n, i, o, r;
  for (a = 0; a < t.length; a++) {
    for (o = r = t[a], n = 0; n < s.length; n++)
      i = s[n], r = r.replace(i, Ma[i]);
    i = parseInt($a[o], 16), e[r] = [i >> 16 & 255, i >> 8 & 255, i & 255];
  }
  return e;
}
let ts;
function Fo(e) {
  ts || (ts = Bo(), ts.transparent = [0, 0, 0, 0]);
  const t = ts[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Lo = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Po(e) {
  const t = Lo.exec(e);
  let s = 255, a, n, i;
  if (t) {
    if (t[7] !== a) {
      const o = +t[7];
      s = t[8] ? Re(o) : se(o * 255, 0, 255);
    }
    return a = +t[1], n = +t[3], i = +t[5], a = 255 & (t[2] ? Re(a) : se(a, 0, 255)), n = 255 & (t[4] ? Re(n) : se(n, 0, 255)), i = 255 & (t[6] ? Re(i) : se(i, 0, 255)), {
      r: a,
      g: n,
      b: i,
      a: s
    };
  }
}
function Eo(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Kt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Fs = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ye = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Ro(e, t, s) {
  const a = ye(Kt(e.r)), n = ye(Kt(e.g)), i = ye(Kt(e.b));
  return {
    r: ie(Fs(a + s * (ye(Kt(t.r)) - a))),
    g: ie(Fs(n + s * (ye(Kt(t.g)) - n))),
    b: ie(Fs(i + s * (ye(Kt(t.b)) - i))),
    a: e.a + s * (t.a - e.a)
  };
}
function es(e, t, s) {
  if (e) {
    let a = sa(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * s, t === 0 ? 360 : 1)), a = na(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function ai(e, t) {
  return e && Object.assign(t || {}, e);
}
function Ca(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ie(e[3]))) : (t = ai(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ie(t.a)), t;
}
function Oo(e) {
  return e.charAt(0) === "r" ? Po(e) : Do(e);
}
class Ve {
  constructor(t) {
    if (t instanceof Ve)
      return t;
    const s = typeof t;
    let a;
    s === "object" ? a = Ca(t) : s === "string" && (a = _o(t) || Fo(t) || Oo(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ai(this._rgb);
    return t && (t.a = Kt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Ca(t);
  }
  rgbString() {
    return this._valid ? Eo(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? xo(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? To(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const a = this.rgb, n = t.rgb;
      let i;
      const o = s === i ? 0.5 : s, r = 2 * o - 1, l = a.a - n.a, d = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      i = 1 - d, a.r = 255 & d * a.r + i * n.r + 0.5, a.g = 255 & d * a.g + i * n.g + 0.5, a.b = 255 & d * a.b + i * n.b + 0.5, a.a = o * a.a + (1 - o) * n.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = Ro(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Ve(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ie(t), this;
  }
  clearer(t) {
    const s = this._rgb;
    return s.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, s = Qe(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return es(this._rgb, 2, t), this;
  }
  darken(t) {
    return es(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return es(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return es(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Ao(this._rgb, t), this;
  }
}
function Yt() {
}
const Io = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function dt(e) {
  return e == null;
}
function kt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function nt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function At(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Wt(e, t) {
  return At(e) ? e : t;
}
function et(e, t) {
  return typeof e > "u" ? t : e;
}
const zo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, ni = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function bt(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function ht(e, t, s, a) {
  let n, i, o;
  if (kt(e))
    for (i = e.length, n = 0; n < i; n++)
      t.call(s, e[n], n);
  else if (nt(e))
    for (o = Object.keys(e), i = o.length, n = 0; n < i; n++)
      t.call(s, e[o[n]], o[n]);
}
function ps(e, t) {
  let s, a, n, i;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, a = e.length; s < a; ++s)
    if (n = e[s], i = t[s], n.datasetIndex !== i.datasetIndex || n.index !== i.index)
      return !1;
  return !0;
}
function bs(e) {
  if (kt(e))
    return e.map(bs);
  if (nt(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), a = s.length;
    let n = 0;
    for (; n < a; ++n)
      t[s[n]] = bs(e[s[n]]);
    return t;
  }
  return e;
}
function ii(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function No(e, t, s, a) {
  if (!ii(e))
    return;
  const n = t[e], i = s[e];
  nt(n) && nt(i) ? je(n, i, a) : t[e] = bs(i);
}
function je(e, t, s) {
  const a = kt(t) ? t : [
    t
  ], n = a.length;
  if (!nt(e))
    return e;
  s = s || {};
  const i = s.merger || No;
  let o;
  for (let r = 0; r < n; ++r) {
    if (o = a[r], !nt(o))
      continue;
    const l = Object.keys(o);
    for (let d = 0, u = l.length; d < u; ++d)
      i(l[d], e, o, s);
  }
  return e;
}
function ze(e, t) {
  return je(e, t, {
    merger: Wo
  });
}
function Wo(e, t, s) {
  if (!ii(e))
    return;
  const a = t[e], n = s[e];
  nt(a) && nt(n) ? ze(a, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = bs(n));
}
const Da = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Ho(e) {
  const t = e.split("."), s = [];
  let a = "";
  for (const n of t)
    a += n, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (s.push(a), a = "");
  return s;
}
function Vo(e) {
  const t = Ho(e);
  return (s) => {
    for (const a of t) {
      if (a === "")
        break;
      s = s && s[a];
    }
    return s;
  };
}
function ve(e, t) {
  return (Da[t] || (Da[t] = Vo(t)))(e);
}
function ia(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ye = (e) => typeof e < "u", oe = (e) => typeof e == "function", Aa = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function jo(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const ft = Math.PI, vt = 2 * ft, Yo = vt + ft, vs = Number.POSITIVE_INFINITY, qo = ft / 180, St = ft / 2, de = ft / 4, Ta = ft * 2 / 3, oi = Math.log10, jt = Math.sign;
function Ne(e, t, s) {
  return Math.abs(e - t) < s;
}
function Ba(e) {
  const t = Math.round(e);
  e = Ne(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(oi(e))), a = e / s;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * s;
}
function Uo(e) {
  const t = [], s = Math.sqrt(e);
  let a;
  for (a = 1; a < s; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return s === (s | 0) && t.push(s), t.sort((n, i) => n - i).pop(), t;
}
function Ko(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function qe(e) {
  return !Ko(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Xo(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Go(e, t, s) {
  let a, n, i;
  for (a = 0, n = e.length; a < n; a++)
    i = e[a][s], isNaN(i) || (t.min = Math.min(t.min, i), t.max = Math.max(t.max, i));
}
function Gt(e) {
  return e * (ft / 180);
}
function Zo(e) {
  return e * (180 / ft);
}
function Fa(e) {
  if (!At(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function ri(e, t) {
  const s = t.x - e.x, a = t.y - e.y, n = Math.sqrt(s * s + a * a);
  let i = Math.atan2(a, s);
  return i < -0.5 * ft && (i += vt), {
    angle: i,
    distance: n
  };
}
function Xs(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Qo(e, t) {
  return (e - t + Yo) % vt - ft;
}
function Et(e) {
  return (e % vt + vt) % vt;
}
function Ue(e, t, s, a) {
  const n = Et(e), i = Et(t), o = Et(s), r = Et(i - n), l = Et(o - n), d = Et(n - i), u = Et(n - o);
  return n === i || n === o || a && i === o || r > l && d < u;
}
function Ct(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Jo(e) {
  return Ct(e, -32768, 32767);
}
function Zt(e, t, s, a = 1e-6) {
  return e >= Math.min(t, s) - a && e <= Math.max(t, s) + a;
}
function oa(e, t, s) {
  s = s || ((o) => e[o] < t);
  let a = e.length - 1, n = 0, i;
  for (; a - n > 1; )
    i = n + a >> 1, s(i) ? n = i : a = i;
  return {
    lo: n,
    hi: a
  };
}
const pe = (e, t, s, a) => oa(e, s, a ? (n) => {
  const i = e[n][t];
  return i < s || i === s && e[n + 1][t] === s;
} : (n) => e[n][t] < s), tr = (e, t, s) => oa(e, s, (a) => e[a][t] >= s);
function er(e, t, s) {
  let a = 0, n = e.length;
  for (; a < n && e[a] < t; )
    a++;
  for (; n > a && e[n - 1] > s; )
    n--;
  return a > 0 || n < e.length ? e.slice(a, n) : e;
}
const li = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function sr(e, t) {
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
  }), li.forEach((s) => {
    const a = "_onData" + ia(s), n = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...i) {
        const o = n.apply(this, i);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[a] == "function" && r[a](...i);
        }), o;
      }
    });
  });
}
function La(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const a = s.listeners, n = a.indexOf(t);
  n !== -1 && a.splice(n, 1), !(a.length > 0) && (li.forEach((i) => {
    delete e[i];
  }), delete e._chartjs);
}
function ci(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const di = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ui(e, t) {
  let s = [], a = !1;
  return function(...n) {
    s = n, a || (a = !0, di.call(window, () => {
      a = !1, e.apply(t, s);
    }));
  };
}
function ar(e, t) {
  let s;
  return function(...a) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const ra = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", $t = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, nr = (e, t, s, a) => e === (a ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function ir(e, t, s) {
  const a = t.length;
  let n = 0, i = a;
  if (e._sorted) {
    const { iScale: o, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = o.axis, { min: g, max: p, minDefined: f, maxDefined: h } = o.getUserBounds();
    if (f) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        pe(l, u, g).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? a : pe(t, u, o.getPixelForValue(g)).lo
      ), d) {
        const b = l.slice(0, n + 1).reverse().findIndex((v) => !dt(v[r.axis]));
        n -= Math.max(0, b);
      }
      n = Ct(n, 0, a - 1);
    }
    if (h) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        pe(l, o.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : pe(t, u, o.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const v = l.slice(b - 1).findIndex((m) => !dt(m[r.axis]));
        b += Math.max(0, v);
      }
      i = Ct(b, n, a) - n;
    } else
      i = a - n;
  }
  return {
    start: n,
    count: i
  };
}
function or(e) {
  const { xScale: t, yScale: s, _scaleRanges: a } = e, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!a)
    return e._scaleRanges = n, !0;
  const i = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== s.min || a.ymax !== s.max;
  return Object.assign(a, n), i;
}
const ss = (e) => e === 0 || e === 1, Pa = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * vt / s)), Ea = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * vt / s) + 1, We = {
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
  easeInSine: (e) => -Math.cos(e * St) + 1,
  easeOutSine: (e) => Math.sin(e * St),
  easeInOutSine: (e) => -0.5 * (Math.cos(ft * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ss(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ss(e) ? e : Pa(e, 0.075, 0.3),
  easeOutElastic: (e) => ss(e) ? e : Ea(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ss(e) ? e : e < 0.5 ? 0.5 * Pa(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Ea(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - We.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? We.easeInBounce(e * 2) * 0.5 : We.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function la(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ra(e) {
  return la(e) ? e : new Ve(e);
}
function Ls(e) {
  return la(e) ? e : new Ve(e).saturate(0.5).darken(0.1).hexString();
}
const rr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], lr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function cr(e) {
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
      properties: lr
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
function dr(e) {
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
const Oa = /* @__PURE__ */ new Map();
function ur(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let a = Oa.get(s);
  return a || (a = new Intl.NumberFormat(e, t), Oa.set(s, a)), a;
}
function ca(e, t, s) {
  return ur(t, s).format(e);
}
const hr = {
  values(e) {
    return kt(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let n, i = e;
    if (s.length > 1) {
      const d = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), i = fr(e, s);
    }
    const o = oi(Math.abs(i)), r = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), ca(e, a, l);
  }
};
function fr(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var hi = {
  formatters: hr
};
function gr(e) {
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
      callback: hi.formatters.values,
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
const me = /* @__PURE__ */ Object.create(null), Gs = /* @__PURE__ */ Object.create(null);
function He(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let a = 0, n = s.length; a < n; ++a) {
    const i = s[a];
    e = e[i] || (e[i] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ps(e, t, s) {
  return typeof t == "string" ? je(He(e, t), s) : je(He(e, ""), t);
}
class pr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, n) => Ls(n.backgroundColor), this.hoverBorderColor = (a, n) => Ls(n.borderColor), this.hoverColor = (a, n) => Ls(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return Ps(this, t, s);
  }
  get(t) {
    return He(this, t);
  }
  describe(t, s) {
    return Ps(Gs, t, s);
  }
  override(t, s) {
    return Ps(me, t, s);
  }
  route(t, s, a, n) {
    const i = He(this, t), o = He(this, a), r = "_" + s;
    Object.defineProperties(i, {
      [r]: {
        value: i[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], d = o[n];
          return nt(l) ? Object.assign({}, d, l) : et(l, d);
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
var xt = /* @__PURE__ */ new pr({
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
  cr,
  dr,
  gr
]);
function br(e) {
  return !e || dt(e.size) || dt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Ia(e, t, s, a, n) {
  let i = t[n];
  return i || (i = t[n] = e.measureText(n).width, s.push(n)), i > a && (a = i), a;
}
function ue(e, t, s) {
  const a = e.currentDevicePixelRatio, n = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - n) * a) / a + n;
}
function za(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Zs(e, t, s, a) {
  fi(e, t, s, a, null);
}
function fi(e, t, s, a, n) {
  let i, o, r, l, d, u, g, p;
  const f = t.pointStyle, h = t.rotation, b = t.radius;
  let v = (h || 0) * qo;
  if (f && typeof f == "object" && (i = f.toString(), i === "[object HTMLImageElement]" || i === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, a), e.rotate(v), e.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), f) {
      // Default includes circle
      default:
        n ? e.ellipse(s, a, n / 2, b, 0, 0, vt) : e.arc(s, a, b, 0, vt), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : b, e.moveTo(s + Math.sin(v) * u, a - Math.cos(v) * b), v += Ta, e.lineTo(s + Math.sin(v) * u, a - Math.cos(v) * b), v += Ta, e.lineTo(s + Math.sin(v) * u, a - Math.cos(v) * b), e.closePath();
        break;
      case "rectRounded":
        d = b * 0.516, l = b - d, o = Math.cos(v + de) * l, g = Math.cos(v + de) * (n ? n / 2 - d : l), r = Math.sin(v + de) * l, p = Math.sin(v + de) * (n ? n / 2 - d : l), e.arc(s - g, a - r, d, v - ft, v - St), e.arc(s + p, a - o, d, v - St, v), e.arc(s + g, a + r, d, v, v + St), e.arc(s - p, a + o, d, v + St, v + ft), e.closePath();
        break;
      case "rect":
        if (!h) {
          l = Math.SQRT1_2 * b, u = n ? n / 2 : l, e.rect(s - u, a - l, 2 * u, 2 * l);
          break;
        }
        v += de;
      /* falls through */
      case "rectRot":
        g = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - g, a - r), e.lineTo(s + p, a - o), e.lineTo(s + g, a + r), e.lineTo(s - p, a + o), e.closePath();
        break;
      case "crossRot":
        v += de;
      /* falls through */
      case "cross":
        g = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - g, a - r), e.lineTo(s + g, a + r), e.moveTo(s + p, a - o), e.lineTo(s - p, a + o);
        break;
      case "star":
        g = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - g, a - r), e.lineTo(s + g, a + r), e.moveTo(s + p, a - o), e.lineTo(s - p, a + o), v += de, g = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - g, a - r), e.lineTo(s + g, a + r), e.moveTo(s + p, a - o), e.lineTo(s - p, a + o);
        break;
      case "line":
        o = n ? n / 2 : Math.cos(v) * b, r = Math.sin(v) * b, e.moveTo(s - o, a - r), e.lineTo(s + o, a + r);
        break;
      case "dash":
        e.moveTo(s, a), e.lineTo(s + Math.cos(v) * (n ? n / 2 : b), a + Math.sin(v) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Ke(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function ks(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ws(e) {
  e.restore();
}
function vr(e, t, s, a, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (n === "middle") {
    const i = (t.x + s.x) / 2;
    e.lineTo(i, t.y), e.lineTo(i, s.y);
  } else n === "after" != !!a ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function mr(e, t, s, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? s.cp2x : s.cp1x, a ? s.cp2y : s.cp1y, s.x, s.y);
}
function _r(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), dt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function yr(e, t, s, a, n) {
  if (n.strikethrough || n.underline) {
    const i = e.measureText(a), o = t - i.actualBoundingBoxLeft, r = t + i.actualBoundingBoxRight, l = s - i.actualBoundingBoxAscent, d = s + i.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(o, u), e.lineTo(r, u), e.stroke();
  }
}
function xr(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function Xe(e, t, s, a, n, i = {}) {
  const o = kt(t) ? t : [
    t
  ], r = i.strokeWidth > 0 && i.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, _r(e, i), l = 0; l < o.length; ++l)
    d = o[l], i.backdrop && xr(e, i.backdrop), r && (i.strokeColor && (e.strokeStyle = i.strokeColor), dt(i.strokeWidth) || (e.lineWidth = i.strokeWidth), e.strokeText(d, s, a, i.maxWidth)), e.fillText(d, s, a, i.maxWidth), yr(e, s, a, d, i), a += Number(n.lineHeight);
  e.restore();
}
function ms(e, t) {
  const { x: s, y: a, w: n, h: i, radius: o } = t;
  e.arc(s + o.topLeft, a + o.topLeft, o.topLeft, 1.5 * ft, ft, !0), e.lineTo(s, a + i - o.bottomLeft), e.arc(s + o.bottomLeft, a + i - o.bottomLeft, o.bottomLeft, ft, St, !0), e.lineTo(s + n - o.bottomRight, a + i), e.arc(s + n - o.bottomRight, a + i - o.bottomRight, o.bottomRight, St, 0, !0), e.lineTo(s + n, a + o.topRight), e.arc(s + n - o.topRight, a + o.topRight, o.topRight, 0, -St, !0), e.lineTo(s + o.topLeft, a);
}
const kr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, wr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Sr(e, t) {
  const s = ("" + e).match(kr);
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
const Mr = (e) => +e || 0;
function da(e, t) {
  const s = {}, a = nt(t), n = a ? Object.keys(t) : t, i = nt(e) ? a ? (o) => et(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of n)
    s[o] = Mr(i(o));
  return s;
}
function gi(e) {
  return da(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Se(e) {
  return da(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function It(e) {
  const t = gi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Dt(e, t) {
  e = e || {}, t = t || xt.font;
  let s = et(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let a = et(e.style, t.style);
  a && !("" + a).match(wr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const n = {
    family: et(e.family, t.family),
    lineHeight: Sr(et(e.lineHeight, t.lineHeight), s),
    size: s,
    style: a,
    weight: et(e.weight, t.weight),
    string: ""
  };
  return n.string = br(n), n;
}
function as(e, t, s, a) {
  let n, i, o;
  for (n = 0, i = e.length; n < i; ++n)
    if (o = e[n], o !== void 0 && o !== void 0)
      return o;
}
function $r(e, t, s) {
  const { min: a, max: n } = e, i = ni(t, (n - a) / 2), o = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: o(a, -Math.abs(i)),
    max: o(n, i)
  };
}
function _e(e, t) {
  return Object.assign(Object.create(e), t);
}
function ua(e, t = [
  ""
], s, a, n = () => e[0]) {
  const i = s || e;
  typeof a > "u" && (a = mi("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: i,
    _fallback: a,
    _getTarget: n,
    override: (r) => ua([
      r,
      ...e
    ], t, i, a)
  };
  return new Proxy(o, {
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
      return bi(r, l, () => Pr(l, t, e, r));
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
      return Wa(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Wa(r);
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
function $e(e, t, s, a) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: pi(e, a),
    setContext: (i) => $e(e, i, s, a),
    override: (i) => $e(e.override(i), t, s, a)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(i, o) {
      return delete i[o], delete e[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(i, o, r) {
      return bi(i, o, () => Dr(i, o, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(i, o) {
      return i._descriptors.allKeys ? Reflect.has(e, o) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, o);
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
    has(i, o) {
      return Reflect.has(e, o);
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
    set(i, o, r) {
      return e[o] = r, delete i[o], !0;
    }
  });
}
function pi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: a = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: s,
    indexable: a,
    isScriptable: oe(s) ? s : () => s,
    isIndexable: oe(a) ? a : () => a
  };
}
const Cr = (e, t) => e ? e + ia(t) : t, ha = (e, t) => nt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function bi(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = s();
  return e[t] = a, a;
}
function Dr(e, t, s) {
  const { _proxy: a, _context: n, _subProxy: i, _descriptors: o } = e;
  let r = a[t];
  return oe(r) && o.isScriptable(t) && (r = Ar(t, r, e, s)), kt(r) && r.length && (r = Tr(t, r, e, o.isIndexable)), ha(t, r) && (r = $e(r, n, i && i[t], o)), r;
}
function Ar(e, t, s, a) {
  const { _proxy: n, _context: i, _subProxy: o, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(i, o || a);
  return r.delete(e), ha(e, l) && (l = fa(n._scopes, n, e, l)), l;
}
function Tr(e, t, s, a) {
  const { _proxy: n, _context: i, _subProxy: o, _descriptors: r } = s;
  if (typeof i.index < "u" && a(e))
    return t[i.index % t.length];
  if (nt(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const g = fa(d, n, e, u);
      t.push($e(g, i, o && o[e], r));
    }
  }
  return t;
}
function vi(e, t, s) {
  return oe(e) ? e(t, s) : e;
}
const Br = (e, t) => e === !0 ? t : typeof e == "string" ? ve(t, e) : void 0;
function Fr(e, t, s, a, n) {
  for (const i of t) {
    const o = Br(s, i);
    if (o) {
      e.add(o);
      const r = vi(o._fallback, s, n);
      if (typeof r < "u" && r !== s && r !== a)
        return r;
    } else if (o === !1 && typeof a < "u" && s !== a)
      return null;
  }
  return !1;
}
function fa(e, t, s, a) {
  const n = t._rootScopes, i = vi(t._fallback, s, a), o = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = Na(r, o, s, i || s, a);
  return l === null || typeof i < "u" && i !== s && (l = Na(r, o, i, l, a), l === null) ? !1 : ua(Array.from(r), [
    ""
  ], n, i, () => Lr(t, s, a));
}
function Na(e, t, s, a, n) {
  for (; s; )
    s = Fr(e, t, s, a, n);
  return s;
}
function Lr(e, t, s) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const n = a[t];
  return kt(n) && nt(s) ? s : n || {};
}
function Pr(e, t, s, a) {
  let n;
  for (const i of t)
    if (n = mi(Cr(i, e), s), typeof n < "u")
      return ha(e, n) ? fa(s, a, e, n) : n;
}
function mi(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const a = s[e];
    if (typeof a < "u")
      return a;
  }
}
function Wa(e) {
  let t = e._keys;
  return t || (t = e._keys = Er(e._scopes)), t;
}
function Er(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const a of Object.keys(s).filter((n) => !n.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Rr = Number.EPSILON || 1e-14, Ce = (e, t) => t < e.length && !e[t].skip && e[t], _i = (e) => e === "x" ? "y" : "x";
function Or(e, t, s, a) {
  const n = e.skip ? t : e, i = t, o = s.skip ? t : s, r = Xs(i, n), l = Xs(o, i);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const g = a * d, p = a * u;
  return {
    previous: {
      x: i.x - g * (o.x - n.x),
      y: i.y - g * (o.y - n.y)
    },
    next: {
      x: i.x + p * (o.x - n.x),
      y: i.y + p * (o.y - n.y)
    }
  };
}
function Ir(e, t, s) {
  const a = e.length;
  let n, i, o, r, l, d = Ce(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (l = d, d = Ce(e, u + 1), !(!l || !d)) {
      if (Ne(t[u], 0, Rr)) {
        s[u] = s[u + 1] = 0;
        continue;
      }
      n = s[u] / t[u], i = s[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(i, 2), !(r <= 9) && (o = 3 / Math.sqrt(r), s[u] = n * o * t[u], s[u + 1] = i * o * t[u]);
    }
}
function zr(e, t, s = "x") {
  const a = _i(s), n = e.length;
  let i, o, r, l = Ce(e, 0);
  for (let d = 0; d < n; ++d) {
    if (o = r, r = l, l = Ce(e, d + 1), !r)
      continue;
    const u = r[s], g = r[a];
    o && (i = (u - o[s]) / 3, r[`cp1${s}`] = u - i, r[`cp1${a}`] = g - i * t[d]), l && (i = (l[s] - u) / 3, r[`cp2${s}`] = u + i, r[`cp2${a}`] = g + i * t[d]);
  }
}
function Nr(e, t = "x") {
  const s = _i(t), a = e.length, n = Array(a).fill(0), i = Array(a);
  let o, r, l, d = Ce(e, 0);
  for (o = 0; o < a; ++o)
    if (r = l, l = d, d = Ce(e, o + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[o] = u !== 0 ? (d[s] - l[s]) / u : 0;
      }
      i[o] = r ? d ? jt(n[o - 1]) !== jt(n[o]) ? 0 : (n[o - 1] + n[o]) / 2 : n[o - 1] : n[o];
    }
  Ir(e, n, i), zr(e, i, t);
}
function ns(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function Wr(e, t) {
  let s, a, n, i, o, r = Ke(e[0], t);
  for (s = 0, a = e.length; s < a; ++s)
    o = i, i = r, r = s < a - 1 && Ke(e[s + 1], t), i && (n = e[s], o && (n.cp1x = ns(n.cp1x, t.left, t.right), n.cp1y = ns(n.cp1y, t.top, t.bottom)), r && (n.cp2x = ns(n.cp2x, t.left, t.right), n.cp2y = ns(n.cp2y, t.top, t.bottom)));
}
function Hr(e, t, s, a, n) {
  let i, o, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Nr(e, n);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (i = 0, o = e.length; i < o; ++i)
      r = e[i], l = Or(d, r, e[Math.min(i + 1, o - (a ? 0 : 1)) % o], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && Wr(e, s);
}
function ga() {
  return typeof window < "u" && typeof document < "u";
}
function pa(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function _s(e, t, s) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[s])) : a = e, a;
}
const Ss = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Vr(e, t) {
  return Ss(e).getPropertyValue(t);
}
const jr = [
  "top",
  "right",
  "bottom",
  "left"
];
function be(e, t, s) {
  const a = {};
  s = s ? "-" + s : "";
  for (let n = 0; n < 4; n++) {
    const i = jr[n];
    a[i] = parseFloat(e[t + "-" + i + s]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Yr = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function qr(e, t) {
  const s = e.touches, a = s && s.length ? s[0] : e, { offsetX: n, offsetY: i } = a;
  let o = !1, r, l;
  if (Yr(n, i, e.target))
    r = n, l = i;
  else {
    const d = t.getBoundingClientRect();
    r = a.clientX - d.left, l = a.clientY - d.top, o = !0;
  }
  return {
    x: r,
    y: l,
    box: o
  };
}
function fe(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: a } = t, n = Ss(s), i = n.boxSizing === "border-box", o = be(n, "padding"), r = be(n, "border", "width"), { x: l, y: d, box: u } = qr(e, s), g = o.left + (u && r.left), p = o.top + (u && r.top);
  let { width: f, height: h } = t;
  return i && (f -= o.width + r.width, h -= o.height + r.height), {
    x: Math.round((l - g) / f * s.width / a),
    y: Math.round((d - p) / h * s.height / a)
  };
}
function Ur(e, t, s) {
  let a, n;
  if (t === void 0 || s === void 0) {
    const i = e && pa(e);
    if (!i)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const o = i.getBoundingClientRect(), r = Ss(i), l = be(r, "border", "width"), d = be(r, "padding");
      t = o.width - d.width - l.width, s = o.height - d.height - l.height, a = _s(r.maxWidth, i, "clientWidth"), n = _s(r.maxHeight, i, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: a || vs,
    maxHeight: n || vs
  };
}
const ae = (e) => Math.round(e * 10) / 10;
function Kr(e, t, s, a) {
  const n = Ss(e), i = be(n, "margin"), o = _s(n.maxWidth, e, "clientWidth") || vs, r = _s(n.maxHeight, e, "clientHeight") || vs, l = Ur(e, t, s);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const p = be(n, "border", "width"), f = be(n, "padding");
    d -= f.width + p.width, u -= f.height + p.height;
  }
  return d = Math.max(0, d - i.width), u = Math.max(0, a ? d / a : u - i.height), d = ae(Math.min(d, o, l.maxWidth)), u = ae(Math.min(u, r, l.maxHeight)), d && !u && (u = ae(d / 2)), (t !== void 0 || s !== void 0) && a && l.height && u > l.height && (u = l.height, d = ae(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function Ha(e, t, s) {
  const a = t || 1, n = ae(e.height * a), i = ae(e.width * a);
  e.height = ae(e.height), e.width = ae(e.width);
  const o = e.canvas;
  return o.style && (s || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || o.height !== n || o.width !== i ? (e.currentDevicePixelRatio = a, o.height = n, o.width = i, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Xr = (function() {
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
function Va(e, t) {
  const s = Vr(e, t), a = s && s.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ge(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function Gr(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: a === "middle" ? s < 0.5 ? e.y : t.y : a === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function Zr(e, t, s, a) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, i = {
    x: t.cp1x,
    y: t.cp1y
  }, o = ge(e, n, s), r = ge(n, i, s), l = ge(i, t, s), d = ge(o, r, s), u = ge(r, l, s);
  return ge(d, u, s);
}
const Qr = function(e, t) {
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
}, Jr = function() {
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
function Me(e, t, s) {
  return e ? Qr(t, s) : Jr();
}
function yi(e, t) {
  let s, a;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, a = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function xi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ki(e) {
  return e === "angle" ? {
    between: Ue,
    compare: Qo,
    normalize: Et
  } : {
    between: Zt,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function ja({ start: e, end: t, count: s, loop: a, style: n }) {
  return {
    start: e % s,
    end: t % s,
    loop: a && (t - e + 1) % s === 0,
    style: n
  };
}
function tl(e, t, s) {
  const { property: a, start: n, end: i } = s, { between: o, normalize: r } = ki(a), l = t.length;
  let { start: d, end: u, loop: g } = e, p, f;
  if (g) {
    for (d += l, u += l, p = 0, f = l; p < f && o(r(t[d % l][a]), n, i); ++p)
      d--, u--;
    d %= l, u %= l;
  }
  return u < d && (u += l), {
    start: d,
    end: u,
    loop: g,
    style: e.style
  };
}
function wi(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: a, start: n, end: i } = s, o = t.length, { compare: r, between: l, normalize: d } = ki(a), { start: u, end: g, loop: p, style: f } = tl(e, t, s), h = [];
  let b = !1, v = null, m, _, w;
  const k = () => l(n, w, m) && r(n, w) !== 0, S = () => r(i, m) === 0 || l(i, w, m), $ = () => b || k(), A = () => !b || S();
  for (let F = u, R = u; F <= g; ++F)
    _ = t[F % o], !_.skip && (m = d(_[a]), m !== w && (b = l(m, n, i), v === null && $() && (v = r(m, n) === 0 ? F : R), v !== null && A() && (h.push(ja({
      start: v,
      end: F,
      loop: p,
      count: o,
      style: f
    })), v = null), R = F, w = m));
  return v !== null && h.push(ja({
    start: v,
    end: g,
    loop: p,
    count: o,
    style: f
  })), h;
}
function Si(e, t) {
  const s = [], a = e.segments;
  for (let n = 0; n < a.length; n++) {
    const i = wi(a[n], e.points, t);
    i.length && s.push(...i);
  }
  return s;
}
function el(e, t, s, a) {
  let n = 0, i = t - 1;
  if (s && !a)
    for (; n < t && !e[n].skip; )
      n++;
  for (; n < t && e[n].skip; )
    n++;
  for (n %= t, s && (i += n); i > n && e[i % t].skip; )
    i--;
  return i %= t, {
    start: n,
    end: i
  };
}
function sl(e, t, s, a) {
  const n = e.length, i = [];
  let o = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const d = e[l % n];
    d.skip || d.stop ? r.skip || (a = !1, i.push({
      start: t % n,
      end: (l - 1) % n,
      loop: a
    }), t = o = d.stop ? l : null) : (o = l, r.skip && (t = l)), r = d;
  }
  return o !== null && i.push({
    start: t % n,
    end: o % n,
    loop: a
  }), i;
}
function al(e, t) {
  const s = e.points, a = e.options.spanGaps, n = s.length;
  if (!n)
    return [];
  const i = !!e._loop, { start: o, end: r } = el(s, n, i, a);
  if (a === !0)
    return Ya(e, [
      {
        start: o,
        end: r,
        loop: i
      }
    ], s, t);
  const l = r < o ? r + n : r, d = !!e._fullLoop && o === 0 && r === n - 1;
  return Ya(e, sl(s, o, l, d), s, t);
}
function Ya(e, t, s, a) {
  return !a || !a.setContext || !s ? t : nl(e, t, s, a);
}
function nl(e, t, s, a) {
  const n = e._chart.getContext(), i = qa(e.options), { _datasetIndex: o, options: { spanGaps: r } } = e, l = s.length, d = [];
  let u = i, g = t[0].start, p = g;
  function f(h, b, v, m) {
    const _ = r ? -1 : 1;
    if (h !== b) {
      for (h += l; s[h % l].skip; )
        h -= _;
      for (; s[b % l].skip; )
        b += _;
      h % l !== b % l && (d.push({
        start: h % l,
        end: b % l,
        loop: v,
        style: m
      }), u = m, g = b % l);
    }
  }
  for (const h of t) {
    g = r ? g : h.start;
    let b = s[g % l], v;
    for (p = g + 1; p <= h.end; p++) {
      const m = s[p % l];
      v = qa(a.setContext(_e(n, {
        type: "segment",
        p0: b,
        p1: m,
        p0DataIndex: (p - 1) % l,
        p1DataIndex: p % l,
        datasetIndex: o
      }))), il(v, u) && f(g, p - 1, h.loop, u), b = m, u = v;
    }
    g < p - 1 && f(g, p - 1, h.loop, u);
  }
  return d;
}
function qa(e) {
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
function il(e, t) {
  if (!t)
    return !1;
  const s = [], a = function(n, i) {
    return la(i) ? (s.includes(i) || s.push(i), s.indexOf(i)) : i;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function is(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function ol(e, t) {
  const { xScale: s, yScale: a } = e;
  return s && a ? {
    left: is(s, t, "left"),
    right: is(s, t, "right"),
    top: is(a, t, "top"),
    bottom: is(a, t, "bottom")
  } : t;
}
function Mi(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const a = ol(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : a.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : a.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : a.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : a.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class rl {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, s, a, n) {
    const i = s.listeners[n], o = s.duration;
    i.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: o,
      currentStep: Math.min(a - s.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = di.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((a, n) => {
      if (!a.running || !a.items.length)
        return;
      const i = a.items;
      let o = i.length - 1, r = !1, l;
      for (; o >= 0; --o)
        l = i[o], l._active ? (l._total > a.duration && (a.duration = l._total), l.tick(t), r = !0) : (i[o] = i[i.length - 1], i.pop());
      r && (n.draw(), this._notify(n, a, t, "progress")), i.length || (a.running = !1, this._notify(n, a, t, "complete"), a.initial = !1), s += i.length;
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
var qt = /* @__PURE__ */ new rl();
const Ua = "transparent", ll = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const a = Ra(e || Ua), n = a.valid && Ra(t || Ua);
    return n && n.valid ? n.mix(a, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class cl {
  constructor(t, s, a, n) {
    const i = s[a];
    n = as([
      t.to,
      n,
      i,
      t.from
    ]);
    const o = as([
      t.from,
      i,
      n
    ]);
    this._active = !0, this._fn = t.fn || ll[t.type || typeof o], this._easing = We[t.easing] || We.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = a, this._from = o, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, a) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], i = a - this._start, o = this._duration - i;
      this._start = a, this._duration = Math.floor(Math.max(o, t.duration)), this._total += i, this._loop = !!t.loop, this._to = as([
        t.to,
        s,
        n,
        t.from
      ]), this._from = as([
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
    const s = t - this._start, a = this._duration, n = this._prop, i = this._from, o = this._loop, r = this._to;
    let l;
    if (this._active = i !== r && (o || s < a), !this._active) {
      this._target[n] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[n] = i;
      return;
    }
    l = s / a % 2, l = o && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(i, r, l);
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
class $i {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!nt(t))
      return;
    const s = Object.keys(xt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const i = t[n];
      if (!nt(i))
        return;
      const o = {};
      for (const r of s)
        o[r] = i[r];
      (kt(i.properties) && i.properties || [
        n
      ]).forEach((r) => {
        (r === n || !a.has(r)) && a.set(r, o);
      });
    });
  }
  _animateOptions(t, s) {
    const a = s.options, n = ul(t, a);
    if (!n)
      return [];
    const i = this._createAnimations(n, a);
    return a.$shared && dl(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), i;
  }
  _createAnimations(t, s) {
    const a = this._properties, n = [], i = t.$animations || (t.$animations = {}), o = Object.keys(s), r = Date.now();
    let l;
    for (l = o.length - 1; l >= 0; --l) {
      const d = o[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        n.push(...this._animateOptions(t, s));
        continue;
      }
      const u = s[d];
      let g = i[d];
      const p = a.get(d);
      if (g)
        if (p && g.active()) {
          g.update(p, u, r);
          continue;
        } else
          g.cancel();
      if (!p || !p.duration) {
        t[d] = u;
        continue;
      }
      i[d] = g = new cl(p, t, d, u), n.push(g);
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
      return qt.add(this._chart, a), !0;
  }
}
function dl(e, t) {
  const s = [], a = Object.keys(t);
  for (let n = 0; n < a.length; n++) {
    const i = e[a[n]];
    i && i.active() && s.push(i.wait());
  }
  return Promise.all(s);
}
function ul(e, t) {
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
  const s = e && e.options || {}, a = s.reverse, n = s.min === void 0 ? t : 0, i = s.max === void 0 ? t : 0;
  return {
    start: a ? i : n,
    end: a ? n : i
  };
}
function hl(e, t, s) {
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
function fl(e) {
  let t, s, a, n;
  return nt(e) ? (t = e.top, s = e.right, a = e.bottom, n = e.left) : t = s = a = n = e, {
    top: t,
    right: s,
    bottom: a,
    left: n,
    disabled: e === !1
  };
}
function Ci(e, t) {
  const s = [], a = e._getSortedDatasetMetas(t);
  let n, i;
  for (n = 0, i = a.length; n < i; ++n)
    s.push(a[n].index);
  return s;
}
function Xa(e, t, s, a = {}) {
  const n = e.keys, i = a.mode === "single";
  let o, r, l, d;
  if (t === null)
    return;
  let u = !1;
  for (o = 0, r = n.length; o < r; ++o) {
    if (l = +n[o], l === s) {
      if (u = !0, a.all)
        continue;
      break;
    }
    d = e.values[l], At(d) && (i || t === 0 || jt(t) === jt(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function gl(e, t) {
  const { iScale: s, vScale: a } = t, n = s.axis === "x" ? "x" : "y", i = a.axis === "x" ? "x" : "y", o = Object.keys(e), r = new Array(o.length);
  let l, d, u;
  for (l = 0, d = o.length; l < d; ++l)
    u = o[l], r[l] = {
      [n]: u,
      [i]: e[u]
    };
  return r;
}
function Es(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function pl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function bl(e) {
  const { min: t, max: s, minDefined: a, maxDefined: n } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: n ? s : Number.POSITIVE_INFINITY
  };
}
function vl(e, t, s) {
  const a = e[t] || (e[t] = {});
  return a[s] || (a[s] = {});
}
function Ga(e, t, s, a) {
  for (const n of t.getMatchingVisibleMetas(a).reverse()) {
    const i = e[n.index];
    if (s && i > 0 || !s && i < 0)
      return n.index;
  }
  return null;
}
function Za(e, t) {
  const { chart: s, _cachedMeta: a } = e, n = s._stacks || (s._stacks = {}), { iScale: i, vScale: o, index: r } = a, l = i.axis, d = o.axis, u = pl(i, o, a), g = t.length;
  let p;
  for (let f = 0; f < g; ++f) {
    const h = t[f], { [l]: b, [d]: v } = h, m = h._stacks || (h._stacks = {});
    p = m[d] = vl(n, u, b), p[r] = v, p._top = Ga(p, o, !0, a.type), p._bottom = Ga(p, o, !1, a.type);
    const _ = p._visualValues || (p._visualValues = {});
    _[r] = v;
  }
}
function Rs(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((a) => s[a].axis === t).shift();
}
function ml(e, t) {
  return _e(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function _l(e, t, s) {
  return _e(e, {
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
function Te(e, t) {
  const s = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const n of t) {
      const i = n._stacks;
      if (!i || i[a] === void 0 || i[a][s] === void 0)
        return;
      delete i[a][s], i[a]._visualValues !== void 0 && i[a]._visualValues[s] !== void 0 && delete i[a]._visualValues[s];
    }
  }
}
const Os = (e) => e === "reset" || e === "none", Qa = (e, t) => t ? e : Object.assign({}, e), yl = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: Ci(s, !0),
  values: null
};
class Ms {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, s) {
    this.chart = t, this._ctx = t.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Es(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Te(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, a = this.getDataset(), n = (g, p, f, h) => g === "x" ? p : g === "r" ? h : f, i = s.xAxisID = et(a.xAxisID, Rs(t, "x")), o = s.yAxisID = et(a.yAxisID, Rs(t, "y")), r = s.rAxisID = et(a.rAxisID, Rs(t, "r")), l = s.indexAxis, d = s.iAxisID = n(l, i, o, r), u = s.vAxisID = n(l, o, i, r);
    s.xScale = this.getScaleForId(i), s.yScale = this.getScaleForId(o), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(d), s.vScale = this.getScaleForId(u);
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
    this._data && La(this._data, this), t._stacked && Te(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), a = this._data;
    if (nt(s)) {
      const n = this._cachedMeta;
      this._data = gl(s, n);
    } else if (a !== s) {
      if (a) {
        La(a, this);
        const n = this._cachedMeta;
        Te(n), n._parsed = [];
      }
      s && Object.isExtensible(s) && sr(s, this), this._syncList = [], this._data = s;
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
    const i = s._stacked;
    s._stacked = Es(s.vScale, s), s.stack !== a.stack && (n = !0, Te(s), s.stack = a.stack), this._resyncElements(t), (n || i !== s._stacked) && (Za(this, s._parsed), s._stacked = Es(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: a, _data: n } = this, { iScale: i, _stacked: o } = a, r = i.axis;
    let l = t === 0 && s === n.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, g, p;
    if (this._parsing === !1)
      a._parsed = n, a._sorted = !0, p = n;
    else {
      kt(n[t]) ? p = this.parseArrayData(a, n, t, s) : nt(n[t]) ? p = this.parseObjectData(a, n, t, s) : p = this.parsePrimitiveData(a, n, t, s);
      const f = () => g[r] === null || d && g[r] < d[r];
      for (u = 0; u < s; ++u)
        a._parsed[u + t] = g = p[u], l && (f() && (l = !1), d = g);
      a._sorted = l;
    }
    o && Za(this, p);
  }
  parsePrimitiveData(t, s, a, n) {
    const { iScale: i, vScale: o } = t, r = i.axis, l = o.axis, d = i.getLabels(), u = i === o, g = new Array(n);
    let p, f, h;
    for (p = 0, f = n; p < f; ++p)
      h = p + a, g[p] = {
        [r]: u || i.parse(d[h], h),
        [l]: o.parse(s[h], h)
      };
    return g;
  }
  parseArrayData(t, s, a, n) {
    const { xScale: i, yScale: o } = t, r = new Array(n);
    let l, d, u, g;
    for (l = 0, d = n; l < d; ++l)
      u = l + a, g = s[u], r[l] = {
        x: i.parse(g[0], u),
        y: o.parse(g[1], u)
      };
    return r;
  }
  parseObjectData(t, s, a, n) {
    const { xScale: i, yScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(n);
    let u, g, p, f;
    for (u = 0, g = n; u < g; ++u)
      p = u + a, f = s[p], d[u] = {
        x: i.parse(ve(f, r), p),
        y: o.parse(ve(f, l), p)
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
    const n = this.chart, i = this._cachedMeta, o = s[t.axis], r = {
      keys: Ci(n, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return Xa(r, o, i.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, s, a, n) {
    const i = a[s.axis];
    let o = i === null ? NaN : i;
    const r = n && a._stacks[s.axis];
    n && r && (n.values = r, o = Xa(n, i, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, s) {
    const a = this._cachedMeta, n = a._parsed, i = a._sorted && t === a.iScale, o = n.length, r = this._getOtherScale(t), l = yl(s, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: g } = bl(r);
    let p, f;
    function h() {
      f = n[p];
      const b = f[r.axis];
      return !At(f[t.axis]) || u > b || g < b;
    }
    for (p = 0; p < o && !(!h() && (this.updateRangeFromParsed(d, t, f, l), i)); ++p)
      ;
    if (i) {
      for (p = o - 1; p >= 0; --p)
        if (!h()) {
          this.updateRangeFromParsed(d, t, f, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, a = [];
    let n, i, o;
    for (n = 0, i = s.length; n < i; ++n)
      o = s[n][t.axis], At(o) && a.push(o);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = s.iScale, n = s.vScale, i = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(i[a.axis]) : "",
      value: n ? "" + n.getLabelForValue(i[n.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = fl(et(this.options.clip, hl(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, a = this._cachedMeta, n = a.data || [], i = s.chartArea, o = [], r = this._drawStart || 0, l = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, i, r, l), u = r; u < r + l; ++u) {
      const g = n[u];
      g.hidden || (g.active && d ? o.push(g) : g.draw(t, i));
    }
    for (u = 0; u < o.length; ++u)
      o[u].draw(t, i);
  }
  getStyle(t, s) {
    const a = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, s, a) {
    const n = this.getDataset();
    let i;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      i = o.$context || (o.$context = _l(this.getContext(), t, o)), i.parsed = this.getParsed(t), i.raw = n.data[t], i.index = i.dataIndex = t;
    } else
      i = this.$context || (this.$context = ml(this.chart.getContext(), this.index)), i.dataset = n, i.index = i.datasetIndex = this.index;
    return i.active = !!s, i.mode = a, i;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", a) {
    const n = s === "active", i = this._cachedDataOpts, o = t + "-" + s, r = i[o], l = this.enableOptionSharing && Ye(a);
    if (r)
      return Qa(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), g = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), f = Object.keys(xt.elements[t]), h = () => this.getContext(a, n, s), b = d.resolveNamedOptions(p, f, h, g);
    return b.$shared && (b.$shared = l, i[o] = Object.freeze(Qa(b, l))), b;
  }
  _resolveAnimations(t, s, a) {
    const n = this.chart, i = this._cachedDataOpts, o = `animation-${s}`, r = i[o];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, g = u.datasetAnimationScopeKeys(this._type, s), p = u.getOptionScopes(this.getDataset(), g);
      l = u.createResolver(p, this.getContext(t, a, s));
    }
    const d = new $i(n, l && l.animations);
    return l && l._cacheable && (i[o] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || Os(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const a = this.resolveDataElementOptions(t, s), n = this._sharedOptions, i = this.getSharedOptions(a), o = this.includeOptions(s, i) || i !== n;
    return this.updateSharedOptions(i, s, a), {
      sharedOptions: i,
      includeOptions: o
    };
  }
  updateElement(t, s, a, n) {
    Os(n) ? Object.assign(t, a) : this._resolveAnimations(s, n).update(t, a);
  }
  updateSharedOptions(t, s, a) {
    t && !Os(s) && this._resolveAnimations(void 0, s).update(t, a);
  }
  _setStyle(t, s, a, n) {
    t.active = n;
    const i = this.getStyle(s, n);
    this._resolveAnimations(s, a, n).update(t, {
      options: !n && this.getSharedOptions(i) || i
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
    const n = a.length, i = s.length, o = Math.min(i, n);
    o && this.parse(0, o), i > n ? this._insertElements(n, i - n, t) : i < n && this._removeElements(i, n - i);
  }
  _insertElements(t, s, a = !0) {
    const n = this._cachedMeta, i = n.data, o = t + s;
    let r;
    const l = (d) => {
      for (d.length += s, r = d.length - 1; r >= o; r--)
        d[r] = d[r - s];
    };
    for (l(i), r = t; r < o; ++r)
      i[r] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, s), a && this.updateElements(i, t, s, "reset");
  }
  updateElements(t, s, a, n) {
  }
  _removeElements(t, s) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const n = a._parsed.splice(t, s);
      a._stacked && Te(a, n);
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
function xl(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let n = 0, i = s.length; n < i; n++)
      a = a.concat(s[n].controller.getAllParsedValues(e));
    e._cache.$bar = ci(a.sort((n, i) => n - i));
  }
  return e._cache.$bar;
}
function kl(e) {
  const t = e.iScale, s = xl(t, e.type);
  let a = t._length, n, i, o, r;
  const l = () => {
    o === 32767 || o === -32768 || (Ye(r) && (a = Math.min(a, Math.abs(o - r) || a)), r = o);
  };
  for (n = 0, i = s.length; n < i; ++n)
    o = t.getPixelForValue(s[n]), l();
  for (r = void 0, n = 0, i = t.ticks.length; n < i; ++n)
    o = t.getPixelForTick(n), l();
  return a;
}
function wl(e, t, s, a) {
  const n = s.barThickness;
  let i, o;
  return dt(n) ? (i = t.min * s.categoryPercentage, o = s.barPercentage) : (i = n * a, o = 1), {
    chunk: i / a,
    ratio: o,
    start: t.pixels[e] - i / 2
  };
}
function Sl(e, t, s, a) {
  const n = t.pixels, i = n[e];
  let o = e > 0 ? n[e - 1] : null, r = e < n.length - 1 ? n[e + 1] : null;
  const l = s.categoryPercentage;
  o === null && (o = i - (r === null ? t.end - t.start : r - i)), r === null && (r = i + i - o);
  const d = i - (i - Math.min(o, r)) / 2 * l;
  return {
    chunk: Math.abs(r - o) / 2 * l / a,
    ratio: s.barPercentage,
    start: d
  };
}
function Ml(e, t, s, a) {
  const n = s.parse(e[0], a), i = s.parse(e[1], a), o = Math.min(n, i), r = Math.max(n, i);
  let l = o, d = r;
  Math.abs(o) > Math.abs(r) && (l = r, d = o), t[s.axis] = d, t._custom = {
    barStart: l,
    barEnd: d,
    start: n,
    end: i,
    min: o,
    max: r
  };
}
function Di(e, t, s, a) {
  return kt(e) ? Ml(e, t, s, a) : t[s.axis] = s.parse(e, a), t;
}
function Ja(e, t, s, a) {
  const n = e.iScale, i = e.vScale, o = n.getLabels(), r = n === i, l = [];
  let d, u, g, p;
  for (d = s, u = s + a; d < u; ++d)
    p = t[d], g = {}, g[n.axis] = r || n.parse(o[d], d), l.push(Di(p, g, i, d));
  return l;
}
function Is(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function $l(e, t, s) {
  return e !== 0 ? jt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function Cl(e) {
  let t, s, a, n, i;
  return e.horizontal ? (t = e.base > e.x, s = "left", a = "right") : (t = e.base < e.y, s = "bottom", a = "top"), t ? (n = "end", i = "start") : (n = "start", i = "end"), {
    start: s,
    end: a,
    reverse: t,
    top: n,
    bottom: i
  };
}
function Dl(e, t, s, a) {
  let n = t.borderSkipped;
  const i = {};
  if (!n) {
    e.borderSkipped = i;
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
  const { start: o, end: r, reverse: l, top: d, bottom: u } = Cl(e);
  n === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === a ? n = d : (s._bottom || 0) === a ? n = u : (i[tn(u, o, r, l)] = !0, n = d)), i[tn(n, o, r, l)] = !0, e.borderSkipped = i;
}
function tn(e, t, s, a) {
  return a ? (e = Al(e, t, s), e = en(e, s, t)) : e = en(e, t, s), e;
}
function Al(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function en(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function Tl(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class Bl extends Ms {
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
    return Ja(t, s, a, n);
  }
  parseArrayData(t, s, a, n) {
    return Ja(t, s, a, n);
  }
  parseObjectData(t, s, a, n) {
    const { iScale: i, vScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = i.axis === "x" ? r : l, u = o.axis === "x" ? r : l, g = [];
    let p, f, h, b;
    for (p = a, f = a + n; p < f; ++p)
      b = s[p], h = {}, h[i.axis] = i.parse(ve(b, d), p), g.push(Di(ve(b, u), h, o, p));
    return g;
  }
  updateRangeFromParsed(t, s, a, n) {
    super.updateRangeFromParsed(t, s, a, n);
    const i = a._custom;
    i && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, i.min), t.max = Math.max(t.max, i.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: a, vScale: n } = s, i = this.getParsed(t), o = i._custom, r = Is(o) ? "[" + o.start + ", " + o.end + "]" : "" + n.getLabelForValue(i[n.axis]);
    return {
      label: "" + a.getLabelForValue(i[a.axis]),
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
    const i = n === "reset", { index: o, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: g, includeOptions: p } = this._getSharedOptions(s, n);
    for (let f = s; f < s + a; f++) {
      const h = this.getParsed(f), b = i || dt(h[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(f), v = this._calculateBarIndexPixels(f, u), m = (h._stacks || {})[r.axis], _ = {
        horizontal: d,
        base: b.base,
        enableBorderRadius: !m || Is(h._custom) || o === m._top || o === m._bottom,
        x: d ? b.head : v.center,
        y: d ? v.center : b.head,
        height: d ? v.size : Math.abs(b.size),
        width: d ? Math.abs(b.size) : v.size
      };
      p && (_.options = g || this.resolveDataElementOptions(f, t[f].active ? "active" : n));
      const w = _.options || t[f].options;
      Dl(_, w, m, o), Tl(_, w, u.ratio), this.updateElement(t[f], f, _, n);
    }
  }
  _getStacks(t, s) {
    const { iScale: a } = this._cachedMeta, n = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), i = a.options.stacked, o = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[a.axis], d = (u) => {
      const g = u._parsed.find((f) => f[a.axis] === l), p = g && g[u.vScale.axis];
      if (dt(p) || isNaN(p))
        return !0;
    };
    for (const u of n)
      if (!(s !== void 0 && d(u)) && ((i === !1 || o.indexOf(u.stack) === -1 || i === void 0 && u.stack === void 0) && o.push(u.stack), u.index === t))
        break;
    return o.length || o.push(void 0), o;
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
      t[et(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, a) {
    const n = this._getStacks(t, a), i = s !== void 0 ? n.indexOf(s) : -1;
    return i === -1 ? n.length - 1 : i;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, a = s.iScale, n = [];
    let i, o;
    for (i = 0, o = s.data.length; i < o; ++i)
      n.push(a.getPixelForValue(this.getParsed(i)[a.axis], i));
    const r = t.barThickness;
    return {
      min: r || kl(s),
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
    const { _cachedMeta: { vScale: s, _stacked: a, index: n }, options: { base: i, minBarLength: o } } = this, r = i || 0, l = this.getParsed(t), d = l._custom, u = Is(d);
    let g = l[s.axis], p = 0, f = a ? this.applyStack(s, l, a) : g, h, b;
    f !== g && (p = f - g, f = g), u && (g = d.barStart, f = d.barEnd - d.barStart, g !== 0 && jt(g) !== jt(d.barEnd) && (p = 0), p += g);
    const v = !dt(i) && !u ? i : p;
    let m = s.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? h = s.getPixelForValue(p + f) : h = m, b = h - m, Math.abs(b) < o) {
      b = $l(b, s, r) * o, g === r && (m -= b / 2);
      const _ = s.getPixelForDecimal(0), w = s.getPixelForDecimal(1), k = Math.min(_, w), S = Math.max(_, w);
      m = Math.max(Math.min(m, S), k), h = m + b, a && !u && (l._stacks[s.axis]._visualValues[n] = s.getValueForPixel(h) - s.getValueForPixel(m));
    }
    if (m === s.getPixelForValue(r)) {
      const _ = jt(b) * s.getLineWidthForValue(r) / 2;
      m += _, b -= _;
    }
    return {
      size: b,
      base: m,
      head: h,
      center: h + b / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const a = s.scale, n = this.options, i = n.skipNull, o = et(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (s.grouped) {
      const u = i ? this._getStackCount(t) : s.stackCount, g = n.barThickness === "flex" ? Sl(t, s, n, u * d) : wl(t, s, n, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, f = this._getAxis().indexOf(et(p, this.getFirstScaleIdForIndexAxis())), h = this._getStackIndex(this.index, this._cachedMeta.stack, i ? t : void 0) + f;
      r = g.start + g.chunk * h + g.chunk / 2, l = Math.min(o, g.chunk * g.ratio);
    } else
      r = a.getPixelForValue(this.getParsed(t)[a.axis], t), l = Math.min(o, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, s = t.vScale, a = t.data, n = a.length;
    let i = 0;
    for (; i < n; ++i)
      this.getParsed(i)[s.axis] !== null && !a[i].hidden && a[i].draw(this._ctx);
  }
}
function Fl(e, t, s) {
  let a = 1, n = 1, i = 0, o = 0;
  if (t < vt) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), g = Math.cos(l), p = Math.sin(l), f = (w, k, S) => Ue(w, r, l, !0) ? 1 : Math.max(k, k * s, S, S * s), h = (w, k, S) => Ue(w, r, l, !0) ? -1 : Math.min(k, k * s, S, S * s), b = f(0, d, g), v = f(St, u, p), m = h(ft, d, g), _ = h(ft + St, u, p);
    a = (b - m) / 2, n = (v - _) / 2, i = -(b + m) / 2, o = -(v + _) / 2;
  }
  return {
    ratioX: a,
    ratioY: n,
    offsetX: i,
    offsetY: o
  };
}
class Ll extends Ms {
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
            const s = t.data, { labels: { pointStyle: a, textAlign: n, color: i, useBorderRadius: o, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, d) => {
              const g = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: l,
                fillStyle: g.backgroundColor,
                fontColor: i,
                hidden: !t.getDataVisibility(d),
                lineDash: g.borderDash,
                lineDashOffset: g.borderDashOffset,
                lineJoin: g.borderJoinStyle,
                lineWidth: g.borderWidth,
                strokeStyle: g.borderColor,
                textAlign: n,
                pointStyle: a,
                borderRadius: o && (r || g.borderRadius),
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
      let i = (l) => +a[l];
      if (nt(a[t])) {
        const { key: l = "value" } = this._parsing;
        i = (d) => +ve(a[d], l);
      }
      let o, r;
      for (o = t, r = t + s; o < r; ++o)
        n._parsed[o] = i(o);
    }
  }
  _getRotation() {
    return Gt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Gt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = vt, s = -vt;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const n = this.chart.getDatasetMeta(a).controller, i = n._getRotation(), o = n._getCircumference();
        t = Math.min(t, i), s = Math.max(s, i + o);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: a } = s, n = this._cachedMeta, i = n.data, o = this.getMaxBorderWidth() + this.getMaxOffset(i) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - o) / 2, 0), l = Math.min(zo(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: g } = this._getRotationExtents(), { ratioX: p, ratioY: f, offsetX: h, offsetY: b } = Fl(g, u, l), v = (a.width - o) / p, m = (a.height - o) / f, _ = Math.max(Math.min(v, m) / 2, 0), w = ni(this.options.radius, _), k = Math.max(w * l, 0), S = (w - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = h * w, this.offsetY = b * w, n.total = this.calculateTotal(), this.outerRadius = w - S * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - S * d, 0), this.updateElements(i, 0, i.length, t);
  }
  _circumference(t, s) {
    const a = this.options, n = this._cachedMeta, i = this._getCircumference();
    return s && a.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * i / vt);
  }
  updateElements(t, s, a, n) {
    const i = n === "reset", o = this.chart, r = o.chartArea, d = o.options.animation, u = (r.left + r.right) / 2, g = (r.top + r.bottom) / 2, p = i && d.animateScale, f = p ? 0 : this.innerRadius, h = p ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: v } = this._getSharedOptions(s, n);
    let m = this._getRotation(), _;
    for (_ = 0; _ < s; ++_)
      m += this._circumference(_, i);
    for (_ = s; _ < s + a; ++_) {
      const w = this._circumference(_, i), k = t[_], S = {
        x: u + this.offsetX,
        y: g + this.offsetY,
        startAngle: m,
        endAngle: m + w,
        circumference: w,
        outerRadius: h,
        innerRadius: f
      };
      v && (S.options = b || this.resolveDataElementOptions(_, k.active ? "active" : n)), m += w, this.updateElement(k, _, S, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let a = 0, n;
    for (n = 0; n < s.length; n++) {
      const i = t._parsed[n];
      i !== null && !isNaN(i) && this.chart.getDataVisibility(n) && !s[n].hidden && (a += Math.abs(i));
    }
    return a;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? vt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = this.chart, n = a.data.labels || [], i = ca(s._parsed[t], a.options.locale);
    return {
      label: n[t] || "",
      value: i
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const a = this.chart;
    let n, i, o, r, l;
    if (!t) {
      for (n = 0, i = a.data.datasets.length; n < i; ++n)
        if (a.isDatasetVisible(n)) {
          o = a.getDatasetMeta(n), t = o.data, r = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, i = t.length; n < i; ++n)
      l = r.resolveDataElementOptions(n), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let a = 0, n = t.length; a < n; ++a) {
      const i = this.resolveDataElementOptions(a);
      s = Math.max(s, i.offset || 0, i.hoverOffset || 0);
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
    return Math.max(et(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Pl extends Ms {
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
    const s = this._cachedMeta, { dataset: a, data: n = [], _dataset: i } = s, o = this.chart._animationsDisabled;
    let { start: r, count: l } = ir(s, n, o);
    this._drawStart = r, this._drawCount = l, or(s) && (r = 0, l = n.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!i._decimated, a.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !o,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, s, a, n) {
    const i = n === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: g } = this._getSharedOptions(s, n), p = o.axis, f = r.axis, { spanGaps: h, segment: b } = this.options, v = qe(h) ? h : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || i || n === "none", _ = s + a, w = t.length;
    let k = s > 0 && this.getParsed(s - 1);
    for (let S = 0; S < w; ++S) {
      const $ = t[S], A = m ? $ : {};
      if (S < s || S >= _) {
        A.skip = !0;
        continue;
      }
      const F = this.getParsed(S), R = dt(F[f]), N = A[p] = o.getPixelForValue(F[p], S), C = A[f] = i || R ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, F, l) : F[f], S);
      A.skip = isNaN(N) || isNaN(C) || R, A.stop = S > 0 && Math.abs(F[p] - k[p]) > v, b && (A.parsed = F, A.raw = d.data[S]), g && (A.options = u || this.resolveDataElementOptions(S, $.active ? "active" : n)), m || this.updateElement($, S, A, n), k = F;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, a = s.options && s.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return a;
    const i = n[0].size(this.resolveDataElementOptions(0)), o = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(a, i, o) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class El extends Ll {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function he() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ba {
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
    Object.assign(ba.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return he();
  }
  parse() {
    return he();
  }
  format() {
    return he();
  }
  add() {
    return he();
  }
  diff() {
    return he();
  }
  startOf() {
    return he();
  }
  endOf() {
    return he();
  }
}
var Rl = {
  _date: ba
};
function Ol(e, t, s, a) {
  const { controller: n, data: i, _sorted: o } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && o && i.length) {
    const d = r._reversePixels ? tr : pe;
    if (a) {
      if (n._sharedOptions) {
        const u = i[0], g = typeof u.getRange == "function" && u.getRange(t);
        if (g) {
          const p = d(i, t, s - g), f = d(i, t, s + g);
          return {
            lo: p.lo,
            hi: f.hi
          };
        }
      }
    } else {
      const u = d(i, t, s);
      if (l) {
        const { vScale: g } = n._cachedMeta, { _parsed: p } = e, f = p.slice(0, u.lo + 1).reverse().findIndex((b) => !dt(b[g.axis]));
        u.lo -= Math.max(0, f);
        const h = p.slice(u.hi).findIndex((b) => !dt(b[g.axis]));
        u.hi += Math.max(0, h);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: i.length - 1
  };
}
function $s(e, t, s, a, n) {
  const i = e.getSortedVisibleDatasetMetas(), o = s[t];
  for (let r = 0, l = i.length; r < l; ++r) {
    const { index: d, data: u } = i[r], { lo: g, hi: p } = Ol(i[r], t, o, n);
    for (let f = g; f <= p; ++f) {
      const h = u[f];
      h.skip || a(h, d, f);
    }
  }
}
function Il(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(a, n) {
    const i = t ? Math.abs(a.x - n.x) : 0, o = s ? Math.abs(a.y - n.y) : 0;
    return Math.sqrt(Math.pow(i, 2) + Math.pow(o, 2));
  };
}
function zs(e, t, s, a, n) {
  const i = [];
  return !n && !e.isPointInArea(t) || $s(e, s, t, function(r, l, d) {
    !n && !Ke(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && i.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), i;
}
function zl(e, t, s, a) {
  let n = [];
  function i(o, r, l) {
    const { startAngle: d, endAngle: u } = o.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: g } = ri(o, {
      x: t.x,
      y: t.y
    });
    Ue(g, d, u) && n.push({
      element: o,
      datasetIndex: r,
      index: l
    });
  }
  return $s(e, s, t, i), n;
}
function Nl(e, t, s, a, n, i) {
  let o = [];
  const r = Il(s);
  let l = Number.POSITIVE_INFINITY;
  function d(u, g, p) {
    const f = u.inRange(t.x, t.y, n);
    if (a && !f)
      return;
    const h = u.getCenterPoint(n);
    if (!(!!i || e.isPointInArea(h)) && !f)
      return;
    const v = r(t, h);
    v < l ? (o = [
      {
        element: u,
        datasetIndex: g,
        index: p
      }
    ], l = v) : v === l && o.push({
      element: u,
      datasetIndex: g,
      index: p
    });
  }
  return $s(e, s, t, d), o;
}
function Ns(e, t, s, a, n, i) {
  return !i && !e.isPointInArea(t) ? [] : s === "r" && !a ? zl(e, t, s, n) : Nl(e, t, s, a, n, i);
}
function sn(e, t, s, a, n) {
  const i = [], o = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return $s(e, s, t, (l, d, u) => {
    l[o] && l[o](t[s], n) && (i.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), a && !r ? [] : i;
}
var Wl = {
  modes: {
    index(e, t, s, a) {
      const n = fe(t, e), i = s.axis || "x", o = s.includeInvisible || !1, r = s.intersect ? zs(e, n, i, a, o) : Ns(e, n, i, !1, a, o), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, g = d.data[u];
        g && !g.skip && l.push({
          element: g,
          datasetIndex: d.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, s, a) {
      const n = fe(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      let r = s.intersect ? zs(e, n, i, a, o) : Ns(e, n, i, !1, a, o);
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
      const n = fe(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return zs(e, n, i, a, o);
    },
    nearest(e, t, s, a) {
      const n = fe(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return Ns(e, n, i, s.intersect, a, o);
    },
    x(e, t, s, a) {
      const n = fe(t, e);
      return sn(e, n, "x", s.intersect, a);
    },
    y(e, t, s, a) {
      const n = fe(t, e);
      return sn(e, n, "y", s.intersect, a);
    }
  }
};
const Ai = [
  "left",
  "top",
  "right",
  "bottom"
];
function Be(e, t) {
  return e.filter((s) => s.pos === t);
}
function an(e, t) {
  return e.filter((s) => Ai.indexOf(s.pos) === -1 && s.box.axis === t);
}
function Fe(e, t) {
  return e.sort((s, a) => {
    const n = t ? a : s, i = t ? s : a;
    return n.weight === i.weight ? n.index - i.index : n.weight - i.weight;
  });
}
function Hl(e) {
  const t = [];
  let s, a, n, i, o, r;
  for (s = 0, a = (e || []).length; s < a; ++s)
    n = e[s], { position: i, options: { stack: o, stackWeight: r = 1 } } = n, t.push({
      index: s,
      box: n,
      pos: i,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: o && i + o,
      stackWeight: r
    });
  return t;
}
function Vl(e) {
  const t = {};
  for (const s of e) {
    const { stack: a, pos: n, stackWeight: i } = s;
    if (!a || !Ai.includes(n))
      continue;
    const o = t[a] || (t[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += i;
  }
  return t;
}
function jl(e, t) {
  const s = Vl(e), { vBoxMaxWidth: a, hBoxMaxHeight: n } = t;
  let i, o, r;
  for (i = 0, o = e.length; i < o; ++i) {
    r = e[i];
    const { fullSize: l } = r.box, d = s[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * a : l && t.availableWidth, r.height = n) : (r.width = a, r.height = u ? u * n : l && t.availableHeight);
  }
  return s;
}
function Yl(e) {
  const t = Hl(e), s = Fe(t.filter((d) => d.box.fullSize), !0), a = Fe(Be(t, "left"), !0), n = Fe(Be(t, "right")), i = Fe(Be(t, "top"), !0), o = Fe(Be(t, "bottom")), r = an(t, "x"), l = an(t, "y");
  return {
    fullSize: s,
    leftAndTop: a.concat(i),
    rightAndBottom: n.concat(l).concat(o).concat(r),
    chartArea: Be(t, "chartArea"),
    vertical: a.concat(n).concat(l),
    horizontal: i.concat(o).concat(r)
  };
}
function nn(e, t, s, a) {
  return Math.max(e[s], t[s]) + Math.max(e[a], t[a]);
}
function Ti(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function ql(e, t, s, a) {
  const { pos: n, box: i } = s, o = e.maxPadding;
  if (!nt(n)) {
    s.size && (e[n] -= s.size);
    const g = a[s.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, s.horizontal ? i.height : i.width), s.size = g.size / g.count, e[n] += s.size;
  }
  i.getPadding && Ti(o, i.getPadding());
  const r = Math.max(0, t.outerWidth - nn(o, e, "left", "right")), l = Math.max(0, t.outerHeight - nn(o, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Ul(e) {
  const t = e.maxPadding;
  function s(a) {
    const n = Math.max(t[a] - e[a], 0);
    return e[a] += n, n;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function Kl(e, t) {
  const s = t.maxPadding;
  function a(n) {
    const i = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((o) => {
      i[o] = Math.max(t[o], s[o]);
    }), i;
  }
  return a(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Oe(e, t, s, a) {
  const n = [];
  let i, o, r, l, d, u;
  for (i = 0, o = e.length, d = 0; i < o; ++i) {
    r = e[i], l = r.box, l.update(r.width || t.w, r.height || t.h, Kl(r.horizontal, t));
    const { same: g, other: p } = ql(t, s, r, a);
    d |= g && n.length, u = u || p, l.fullSize || n.push(r);
  }
  return d && Oe(n, t, s, a) || u;
}
function os(e, t, s, a, n) {
  e.top = s, e.left = t, e.right = t + a, e.bottom = s + n, e.width = a, e.height = n;
}
function on(e, t, s, a) {
  const n = s.padding;
  let { x: i, y: o } = t;
  for (const r of e) {
    const l = r.box, d = a[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const g = t.w * u, p = d.size || l.height;
      Ye(d.start) && (o = d.start), l.fullSize ? os(l, n.left, o, s.outerWidth - n.right - n.left, p) : os(l, t.left + d.placed, o, g, p), d.start = o, d.placed += g, o = l.bottom;
    } else {
      const g = t.h * u, p = d.size || l.width;
      Ye(d.start) && (i = d.start), l.fullSize ? os(l, i, n.top, p, s.outerHeight - n.bottom - n.top) : os(l, i, t.top + d.placed, p, g), d.start = i, d.placed += g, i = l.right;
    }
  }
  t.x = i, t.y = o;
}
var Ot = {
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
    const n = It(e.options.layout.padding), i = Math.max(t - n.width, 0), o = Math.max(s - n.height, 0), r = Yl(e.boxes), l = r.vertical, d = r.horizontal;
    ht(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const u = l.reduce((b, v) => v.box.options && v.box.options.display === !1 ? b : b + 1, 0) || 1, g = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: n,
      availableWidth: i,
      availableHeight: o,
      vBoxMaxWidth: i / 2 / u,
      hBoxMaxHeight: o / 2
    }), p = Object.assign({}, n);
    Ti(p, It(a));
    const f = Object.assign({
      maxPadding: p,
      w: i,
      h: o,
      x: n.left,
      y: n.top
    }, n), h = jl(l.concat(d), g);
    Oe(r.fullSize, f, g, h), Oe(l, f, g, h), Oe(d, f, g, h) && Oe(l, f, g, h), Ul(f), on(r.leftAndTop, f, g, h), f.x += f.w, f.y += f.h, on(r.rightAndBottom, f, g, h), e.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, ht(r.chartArea, (b) => {
      const v = b.box;
      Object.assign(v, e.chartArea), v.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Bi {
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
class Xl extends Bi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const hs = "$chartjs", Gl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, rn = (e) => e === null || e === "";
function Zl(e, t) {
  const s = e.style, a = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[hs] = {
    initial: {
      height: a,
      width: n,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", rn(n)) {
    const i = Va(e, "width");
    i !== void 0 && (e.width = i);
  }
  if (rn(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const i = Va(e, "height");
      i !== void 0 && (e.height = i);
    }
  return e;
}
const Fi = Xr ? {
  passive: !0
} : !1;
function Ql(e, t, s) {
  e && e.addEventListener(t, s, Fi);
}
function Jl(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, Fi);
}
function tc(e, t) {
  const s = Gl[e.type] || e.type, { x: a, y: n } = fe(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: n !== void 0 ? n : null
  };
}
function ys(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function ec(e, t, s) {
  const a = e.canvas, n = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || ys(r.addedNodes, a), o = o && !ys(r.removedNodes, a);
    o && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function sc(e, t, s) {
  const a = e.canvas, n = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || ys(r.removedNodes, a), o = o && !ys(r.addedNodes, a);
    o && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const Ge = /* @__PURE__ */ new Map();
let ln = 0;
function Li() {
  const e = window.devicePixelRatio;
  e !== ln && (ln = e, Ge.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function ac(e, t) {
  Ge.size || window.addEventListener("resize", Li), Ge.set(e, t);
}
function nc(e) {
  Ge.delete(e), Ge.size || window.removeEventListener("resize", Li);
}
function ic(e, t, s) {
  const a = e.canvas, n = a && pa(a);
  if (!n)
    return;
  const i = ui((r, l) => {
    const d = n.clientWidth;
    s(r, l), d < n.clientWidth && s();
  }, window), o = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || i(d, u);
  });
  return o.observe(n), ac(e, i), o;
}
function Ws(e, t, s) {
  s && s.disconnect(), t === "resize" && nc(e);
}
function oc(e, t, s) {
  const a = e.canvas, n = ui((i) => {
    e.ctx !== null && s(tc(i, e));
  }, e);
  return Ql(a, t, n), n;
}
class rc extends Bi {
  acquireContext(t, s) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Zl(t, s), a) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[hs])
      return !1;
    const a = s[hs].initial;
    [
      "height",
      "width"
    ].forEach((i) => {
      const o = a[i];
      dt(o) ? s.removeAttribute(i) : s.setAttribute(i, o);
    });
    const n = a.style || {};
    return Object.keys(n).forEach((i) => {
      s.style[i] = n[i];
    }), s.width = s.width, delete s[hs], !0;
  }
  addEventListener(t, s, a) {
    this.removeEventListener(t, s);
    const n = t.$proxies || (t.$proxies = {}), o = {
      attach: ec,
      detach: sc,
      resize: ic
    }[s] || oc;
    n[s] = o(t, s, a);
  }
  removeEventListener(t, s) {
    const a = t.$proxies || (t.$proxies = {}), n = a[s];
    if (!n)
      return;
    ({
      attach: Ws,
      detach: Ws,
      resize: Ws
    }[s] || Jl)(t, s, n), a[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, a, n) {
    return Kr(t, s, a, n);
  }
  isAttached(t) {
    const s = t && pa(t);
    return !!(s && s.isConnected);
  }
}
function lc(e) {
  return !ga() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Xl : rc;
}
let te = class {
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
    return qe(this.x) && qe(this.y);
  }
  getProps(t, s) {
    const a = this.$animations;
    if (!s || !a)
      return this;
    const n = {};
    return t.forEach((i) => {
      n[i] = a[i] && a[i].active() ? a[i]._to : this[i];
    }), n;
  }
};
function cc(e, t) {
  const s = e.options.ticks, a = dc(e), n = Math.min(s.maxTicksLimit || a, a), i = s.major.enabled ? hc(t) : [], o = i.length, r = i[0], l = i[o - 1], d = [];
  if (o > n)
    return fc(t, d, i, o / n), d;
  const u = uc(i, t, n);
  if (o > 0) {
    let g, p;
    const f = o > 1 ? Math.round((l - r) / (o - 1)) : null;
    for (rs(t, d, u, dt(f) ? 0 : r - f, r), g = 0, p = o - 1; g < p; g++)
      rs(t, d, u, i[g], i[g + 1]);
    return rs(t, d, u, l, dt(f) ? t.length : l + f), d;
  }
  return rs(t, d, u), d;
}
function dc(e) {
  const t = e.options.offset, s = e._tickSize(), a = e._length / s + (t ? 0 : 1), n = e._maxLength / s;
  return Math.floor(Math.min(a, n));
}
function uc(e, t, s) {
  const a = gc(e), n = t.length / s;
  if (!a)
    return Math.max(n, 1);
  const i = Uo(a);
  for (let o = 0, r = i.length - 1; o < r; o++) {
    const l = i[o];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function hc(e) {
  const t = [];
  let s, a;
  for (s = 0, a = e.length; s < a; s++)
    e[s].major && t.push(s);
  return t;
}
function fc(e, t, s, a) {
  let n = 0, i = s[0], o;
  for (a = Math.ceil(a), o = 0; o < e.length; o++)
    o === i && (t.push(e[o]), n++, i = s[n * a]);
}
function rs(e, t, s, a, n) {
  const i = et(a, 0), o = Math.min(et(n, e.length), e.length);
  let r = 0, l, d, u;
  for (s = Math.ceil(s), n && (l = n - a, s = l / Math.floor(l / s)), u = i; u < 0; )
    r++, u = Math.round(i + r * s);
  for (d = Math.max(i, 0); d < o; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(i + r * s));
}
function gc(e) {
  const t = e.length;
  let s, a;
  if (t < 2)
    return !1;
  for (a = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== a)
      return !1;
  return a;
}
const pc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, cn = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, dn = (e, t) => Math.min(t || e, e);
function un(e, t) {
  const s = [], a = e.length / t, n = e.length;
  let i = 0;
  for (; i < n; i += a)
    s.push(e[Math.floor(i)]);
  return s;
}
function bc(e, t, s) {
  const a = e.ticks.length, n = Math.min(t, a - 1), i = e._startPixel, o = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(s && (a === 1 ? d = Math.max(l - i, o - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < i - r || l > o + r)))
    return l;
}
function vc(e, t) {
  ht(e, (s) => {
    const a = s.gc, n = a.length / 2;
    let i;
    if (n > t) {
      for (i = 0; i < n; ++i)
        delete s.data[a[i]];
      a.splice(0, n);
    }
  });
}
function Le(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function hn(e, t) {
  if (!e.display)
    return 0;
  const s = Dt(e.font, t), a = It(e.padding);
  return (kt(e.text) ? e.text.length : 1) * s.lineHeight + a.height;
}
function mc(e, t) {
  return _e(e, {
    scale: t,
    type: "scale"
  });
}
function _c(e, t, s) {
  return _e(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function yc(e, t, s) {
  let a = ra(e);
  return (s && t !== "right" || !s && t === "right") && (a = pc(a)), a;
}
function xc(e, t, s, a) {
  const { top: n, left: i, bottom: o, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let g = 0, p, f, h;
  const b = o - n, v = r - i;
  if (e.isHorizontal()) {
    if (f = $t(a, i, r), nt(s)) {
      const m = Object.keys(s)[0], _ = s[m];
      h = u[m].getPixelForValue(_) + b - t;
    } else s === "center" ? h = (d.bottom + d.top) / 2 + b - t : h = cn(e, s, t);
    p = r - i;
  } else {
    if (nt(s)) {
      const m = Object.keys(s)[0], _ = s[m];
      f = u[m].getPixelForValue(_) - v + t;
    } else s === "center" ? f = (d.left + d.right) / 2 - v + t : f = cn(e, s, t);
    h = $t(a, o, n), g = s === "left" ? -St : St;
  }
  return {
    titleX: f,
    titleY: h,
    maxWidth: p,
    rotation: g
  };
}
class De extends te {
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
    return t = Wt(t, Number.POSITIVE_INFINITY), s = Wt(s, Number.NEGATIVE_INFINITY), a = Wt(a, Number.POSITIVE_INFINITY), n = Wt(n, Number.NEGATIVE_INFINITY), {
      min: Wt(t, a),
      max: Wt(s, n),
      minDefined: At(t),
      maxDefined: At(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: a, minDefined: n, maxDefined: i } = this.getUserBounds(), o;
    if (n && i)
      return {
        min: s,
        max: a
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, d = r.length; l < d; ++l)
      o = r[l].controller.getMinMax(this, t), n || (s = Math.min(s, o.min)), i || (a = Math.max(a, o.max));
    return s = i && s > a ? a : s, a = n && s > a ? s : a, {
      min: Wt(s, Wt(a, s)),
      max: Wt(a, Wt(s, a))
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
    bt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, a) {
    const { beginAtZero: n, grace: i, ticks: o } = this.options, r = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = $r(this, i, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? un(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = cc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, a;
    this.isHorizontal() ? (s = this.left, a = this.right) : (s = this.top, a = this.bottom, t = !t), this._startPixel = s, this._endPixel = a, this._reversePixels = t, this._length = a - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    bt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    bt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    bt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), bt(this.options[t], [
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
    bt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let a, n, i;
    for (a = 0, n = t.length; a < n; a++)
      i = t[a], i.label = bt(s.callback, [
        i.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    bt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    bt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, a = dn(this.ticks.length, t.ticks.maxTicksLimit), n = s.minRotation || 0, i = s.maxRotation;
    let o = n, r, l, d;
    if (!this._isVisible() || !s.display || n >= i || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), g = u.widest.width, p = u.highest.height, f = Ct(this.chart.width - g, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : f / (a - 1), g + 6 > r && (r = f / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Le(t.grid) - s.padding - hn(t.title, this.chart.options.font), d = Math.sqrt(g * g + p * p), o = Zo(Math.min(Math.asin(Ct((u.highest.height + 6) / r, -1, 1)), Math.asin(Ct(l / d, -1, 1)) - Math.asin(Ct(p / d, -1, 1)))), o = Math.max(n, Math.min(i, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    bt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    bt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: a, title: n, grid: i } } = this, o = this._isVisible(), r = this.isHorizontal();
    if (o) {
      const l = hn(n, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Le(i) + l) : (t.height = this.maxHeight, t.width = Le(i) + l), a.display && this.ticks.length) {
        const { first: d, last: u, widest: g, highest: p } = this._getLabelSizes(), f = a.padding * 2, h = Gt(this.labelRotation), b = Math.cos(h), v = Math.sin(h);
        if (r) {
          const m = a.mirror ? 0 : v * g.width + b * p.height;
          t.height = Math.min(this.maxHeight, t.height + m + f);
        } else {
          const m = a.mirror ? 0 : b * g.width + v * p.height;
          t.width = Math.min(this.maxWidth, t.width + m + f);
        }
        this._calculatePadding(d, u, v, b);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, a, n) {
    const { ticks: { align: i, padding: o }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, g = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, f = 0;
      l ? d ? (p = n * t.width, f = a * s.height) : (p = a * t.height, f = n * s.width) : i === "start" ? f = s.width : i === "end" ? p = t.width : i !== "inner" && (p = t.width / 2, f = s.width / 2), this.paddingLeft = Math.max((p - u + o) * this.width / (this.width - u), 0), this.paddingRight = Math.max((f - g + o) * this.width / (this.width - g), 0);
    } else {
      let u = s.height / 2, g = t.height / 2;
      i === "start" ? (u = 0, g = t.height) : i === "end" && (u = s.height, g = 0), this.paddingTop = u + o, this.paddingBottom = g + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    bt(this.options.afterFit, [
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
      dt(t[s].label) && (t.splice(s, 1), a--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let a = this.ticks;
      s < a.length && (a = un(a, s)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, a) {
    const { ctx: n, _longestTextCache: i } = this, o = [], r = [], l = Math.floor(s / dn(s, a));
    let d = 0, u = 0, g, p, f, h, b, v, m, _, w, k, S;
    for (g = 0; g < s; g += l) {
      if (h = t[g].label, b = this._resolveTickFontOptions(g), n.font = v = b.string, m = i[v] = i[v] || {
        data: {},
        gc: []
      }, _ = b.lineHeight, w = k = 0, !dt(h) && !kt(h))
        w = Ia(n, m.data, m.gc, w, h), k = _;
      else if (kt(h))
        for (p = 0, f = h.length; p < f; ++p)
          S = h[p], !dt(S) && !kt(S) && (w = Ia(n, m.data, m.gc, w, S), k += _);
      o.push(w), r.push(k), d = Math.max(w, d), u = Math.max(k, u);
    }
    vc(i, s);
    const $ = o.indexOf(d), A = r.indexOf(u), F = (R) => ({
      width: o[R] || 0,
      height: r[R] || 0
    });
    return {
      first: F(0),
      last: F(s - 1),
      widest: F($),
      highest: F(A),
      widths: o,
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
    return Jo(this._alignToPixels ? ue(this.chart, s, 0) : s);
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
      return a.$context || (a.$context = _c(this.getContext(), t, a));
    }
    return this.$context || (this.$context = mc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = Gt(this.labelRotation), a = Math.abs(Math.cos(s)), n = Math.abs(Math.sin(s)), i = this._getLabelSizes(), o = t.autoSkipPadding || 0, r = i ? i.widest.width + o : 0, l = i ? i.highest.height + o : 0;
    return this.isHorizontal() ? l * a > r * n ? r / a : l / n : l * n < r * a ? l / a : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, a = this.chart, n = this.options, { grid: i, position: o, border: r } = n, l = i.offset, d = this.isHorizontal(), g = this.ticks.length + (l ? 1 : 0), p = Le(i), f = [], h = r.setContext(this.getContext()), b = h.display ? h.width : 0, v = b / 2, m = function(j) {
      return ue(a, j, b);
    };
    let _, w, k, S, $, A, F, R, N, C, T, P;
    if (o === "top")
      _ = m(this.bottom), A = this.bottom - p, R = _ - v, C = m(t.top) + v, P = t.bottom;
    else if (o === "bottom")
      _ = m(this.top), C = t.top, P = m(t.bottom) - v, A = _ + v, R = this.top + p;
    else if (o === "left")
      _ = m(this.right), $ = this.right - p, F = _ - v, N = m(t.left) + v, T = t.right;
    else if (o === "right")
      _ = m(this.left), N = t.left, T = m(t.right) - v, $ = _ + v, F = this.left + p;
    else if (s === "x") {
      if (o === "center")
        _ = m((t.top + t.bottom) / 2 + 0.5);
      else if (nt(o)) {
        const j = Object.keys(o)[0], K = o[j];
        _ = m(this.chart.scales[j].getPixelForValue(K));
      }
      C = t.top, P = t.bottom, A = _ + v, R = A + p;
    } else if (s === "y") {
      if (o === "center")
        _ = m((t.left + t.right) / 2);
      else if (nt(o)) {
        const j = Object.keys(o)[0], K = o[j];
        _ = m(this.chart.scales[j].getPixelForValue(K));
      }
      $ = _ - v, F = $ - p, N = t.left, T = t.right;
    }
    const L = et(n.ticks.maxTicksLimit, g), I = Math.max(1, Math.ceil(g / L));
    for (w = 0; w < g; w += I) {
      const j = this.getContext(w), K = i.setContext(j), V = r.setContext(j), z = K.lineWidth, O = K.color, J = V.dash || [], it = V.dashOffset, at = K.tickWidth, ut = K.tickColor, mt = K.tickBorderDash || [], ct = K.tickBorderDashOffset;
      k = bc(this, w, l), k !== void 0 && (S = ue(a, k, z), d ? $ = F = N = T = S : A = R = C = P = S, f.push({
        tx1: $,
        ty1: A,
        tx2: F,
        ty2: R,
        x1: N,
        y1: C,
        x2: T,
        y2: P,
        width: z,
        color: O,
        borderDash: J,
        borderDashOffset: it,
        tickWidth: at,
        tickColor: ut,
        tickBorderDash: mt,
        tickBorderDashOffset: ct
      }));
    }
    return this._ticksLength = g, this._borderValue = _, f;
  }
  _computeLabelItems(t) {
    const s = this.axis, a = this.options, { position: n, ticks: i } = a, o = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: g } = i, p = Le(a.grid), f = p + u, h = g ? -u : f, b = -Gt(this.labelRotation), v = [];
    let m, _, w, k, S, $, A, F, R, N, C, T, P = "middle";
    if (n === "top")
      $ = this.bottom - h, A = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      $ = this.top + h, A = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const I = this._getYAxisLabelAlignment(p);
      A = I.textAlign, S = I.x;
    } else if (n === "right") {
      const I = this._getYAxisLabelAlignment(p);
      A = I.textAlign, S = I.x;
    } else if (s === "x") {
      if (n === "center")
        $ = (t.top + t.bottom) / 2 + f;
      else if (nt(n)) {
        const I = Object.keys(n)[0], j = n[I];
        $ = this.chart.scales[I].getPixelForValue(j) + f;
      }
      A = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (n === "center")
        S = (t.left + t.right) / 2 - f;
      else if (nt(n)) {
        const I = Object.keys(n)[0], j = n[I];
        S = this.chart.scales[I].getPixelForValue(j);
      }
      A = this._getYAxisLabelAlignment(p).textAlign;
    }
    s === "y" && (l === "start" ? P = "top" : l === "end" && (P = "bottom"));
    const L = this._getLabelSizes();
    for (m = 0, _ = r.length; m < _; ++m) {
      w = r[m], k = w.label;
      const I = i.setContext(this.getContext(m));
      F = this.getPixelForTick(m) + i.labelOffset, R = this._resolveTickFontOptions(m), N = R.lineHeight, C = kt(k) ? k.length : 1;
      const j = C / 2, K = I.color, V = I.textStrokeColor, z = I.textStrokeWidth;
      let O = A;
      o ? (S = F, A === "inner" && (m === _ - 1 ? O = this.options.reverse ? "left" : "right" : m === 0 ? O = this.options.reverse ? "right" : "left" : O = "center"), n === "top" ? d === "near" || b !== 0 ? T = -C * N + N / 2 : d === "center" ? T = -L.highest.height / 2 - j * N + N : T = -L.highest.height + N / 2 : d === "near" || b !== 0 ? T = N / 2 : d === "center" ? T = L.highest.height / 2 - j * N : T = L.highest.height - C * N, g && (T *= -1), b !== 0 && !I.showLabelBackdrop && (S += N / 2 * Math.sin(b))) : ($ = F, T = (1 - C) * N / 2);
      let J;
      if (I.showLabelBackdrop) {
        const it = It(I.backdropPadding), at = L.heights[m], ut = L.widths[m];
        let mt = T - it.top, ct = 0 - it.left;
        switch (P) {
          case "middle":
            mt -= at / 2;
            break;
          case "bottom":
            mt -= at;
            break;
        }
        switch (A) {
          case "center":
            ct -= ut / 2;
            break;
          case "right":
            ct -= ut;
            break;
          case "inner":
            m === _ - 1 ? ct -= ut : m > 0 && (ct -= ut / 2);
            break;
        }
        J = {
          left: ct,
          top: mt,
          width: ut + it.width,
          height: at + it.height,
          color: I.backdropColor
        };
      }
      v.push({
        label: k,
        font: R,
        textOffset: T,
        options: {
          rotation: b,
          color: K,
          strokeColor: V,
          strokeWidth: z,
          textAlign: O,
          textBaseline: P,
          translation: [
            S,
            $
          ],
          backdrop: J
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-Gt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return s.align === "start" ? n = "left" : s.align === "end" ? n = "right" : s.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: a, mirror: n, padding: i } } = this.options, o = this._getLabelSizes(), r = t + i, l = o.widest.width;
    let d, u;
    return s === "left" ? n ? (u = this.right + i, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u += l)) : (u = this.right - r, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u = this.left)) : s === "right" ? n ? (u = this.left + i, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u -= l)) : (u = this.left + r, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u = this.right)) : d = "right", {
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
    const { ctx: t, options: { backgroundColor: s }, left: a, top: n, width: i, height: o } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(a, n, i, o), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const n = this.ticks.findIndex((i) => i.value === t);
    return n >= 0 ? s.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, a = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let i, o;
    const r = (l, d, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
    };
    if (s.display)
      for (i = 0, o = n.length; i < o; ++i) {
        const l = n[i];
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
    const { chart: t, ctx: s, options: { border: a, grid: n } } = this, i = a.setContext(this.getContext()), o = a.display ? i.width : 0;
    if (!o)
      return;
    const r = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, u, g, p;
    this.isHorizontal() ? (d = ue(t, this.left, o) - o / 2, u = ue(t, this.right, r) + r / 2, g = p = l) : (g = ue(t, this.top, o) - o / 2, p = ue(t, this.bottom, r) + r / 2, d = u = l), s.save(), s.lineWidth = i.width, s.strokeStyle = i.color, s.beginPath(), s.moveTo(d, g), s.lineTo(u, p), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, n = this._computeLabelArea();
    n && ks(a, n);
    const i = this.getLabelItems(t);
    for (const o of i) {
      const r = o.options, l = o.font, d = o.label, u = o.textOffset;
      Xe(a, d, 0, u, l, r);
    }
    n && ws(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: a, reverse: n } } = this;
    if (!a.display)
      return;
    const i = Dt(a.font), o = It(a.padding), r = a.align;
    let l = i.lineHeight / 2;
    s === "bottom" || s === "center" || nt(s) ? (l += o.bottom, kt(a.text) && (l += i.lineHeight * (a.text.length - 1))) : l += o.top;
    const { titleX: d, titleY: u, maxWidth: g, rotation: p } = xc(this, l, s, r);
    Xe(t, a.text, 0, 0, i, {
      color: a.color,
      maxWidth: g,
      rotation: p,
      textAlign: yc(r, s, n),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, a = et(t.grid && t.grid.z, -1), n = et(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== De.prototype.draw ? [
      {
        z: s,
        draw: (i) => {
          this.draw(i);
        }
      }
    ] : [
      {
        z: a,
        draw: (i) => {
          this.drawBackground(), this.drawGrid(i), this.drawTitle();
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
        draw: (i) => {
          this.drawLabels(i);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const s = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", n = [];
    let i, o;
    for (i = 0, o = s.length; i < o; ++i) {
      const r = s[i];
      r[a] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return Dt(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ls {
  constructor(t, s, a) {
    this.type = t, this.scope = s, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let a;
    Sc(s) && (a = this.register(s));
    const n = this.items, i = t.id, o = this.scope + "." + i;
    if (!i)
      throw new Error("class does not have id: " + t);
    return i in n || (n[i] = t, kc(t, o, a), this.override && xt.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, a = t.id, n = this.scope;
    a in s && delete s[a], n && a in xt[n] && (delete xt[n][a], this.override && delete me[a]);
  }
}
function kc(e, t, s) {
  const a = je(/* @__PURE__ */ Object.create(null), [
    s ? xt.get(s) : {},
    xt.get(t),
    e.defaults
  ]);
  xt.set(t, a), e.defaultRoutes && wc(t, e.defaultRoutes), e.descriptors && xt.describe(t, e.descriptors);
}
function wc(e, t) {
  Object.keys(t).forEach((s) => {
    const a = s.split("."), n = a.pop(), i = [
      e
    ].concat(a).join("."), o = t[s].split("."), r = o.pop(), l = o.join(".");
    xt.route(i, n, l, r);
  });
}
function Sc(e) {
  return "id" in e && "defaults" in e;
}
class Mc {
  constructor() {
    this.controllers = new ls(Ms, "datasets", !0), this.elements = new ls(te, "elements"), this.plugins = new ls(Object, "plugins"), this.scales = new ls(De, "scales"), this._typedRegistries = [
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
      const i = a || this._getRegistryForType(n);
      a || i.isForType(n) || i === this.plugins && n.id ? this._exec(t, i, n) : ht(n, (o) => {
        const r = a || this._getRegistryForType(o);
        this._exec(t, r, o);
      });
    });
  }
  _exec(t, s, a) {
    const n = ia(t);
    bt(a["before" + n], [], a), s[t](a), bt(a["after" + n], [], a);
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
var Vt = /* @__PURE__ */ new Mc();
class $c {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, a, n) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const i = n ? this._descriptors(t).filter(n) : this._descriptors(t), o = this._notify(i, t, s, a);
    return s === "afterDestroy" && (this._notify(i, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), o;
  }
  _notify(t, s, a, n) {
    n = n || {};
    for (const i of t) {
      const o = i.plugin, r = o[a], l = [
        s,
        n,
        i.options
      ];
      if (bt(r, l, o) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    dt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const a = t && t.config, n = et(a.options && a.options.plugins, {}), i = Cc(a);
    return n === !1 && !s ? [] : Ac(t, i, n, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], a = this._cache, n = (i, o) => i.filter((r) => !o.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(s, a), t, "stop"), this._notify(n(a, s), t, "start");
  }
}
function Cc(e) {
  const t = {}, s = [], a = Object.keys(Vt.plugins.items);
  for (let i = 0; i < a.length; i++)
    s.push(Vt.getPlugin(a[i]));
  const n = e.plugins || [];
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    s.indexOf(o) === -1 && (s.push(o), t[o.id] = !0);
  }
  return {
    plugins: s,
    localIds: t
  };
}
function Dc(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Ac(e, { plugins: t, localIds: s }, a, n) {
  const i = [], o = e.getContext();
  for (const r of t) {
    const l = r.id, d = Dc(a[l], n);
    d !== null && i.push({
      plugin: r,
      options: Tc(e.config, {
        plugin: r,
        local: s[l]
      }, d, o)
    });
  }
  return i;
}
function Tc(e, { plugin: t, local: s }, a, n) {
  const i = e.pluginScopeKeys(t), o = e.getOptionScopes(a, i);
  return s && t.defaults && o.push(t.defaults), e.createResolver(o, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Qs(e, t) {
  const s = xt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function Bc(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function Fc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function fn(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Lc(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Js(e, ...t) {
  if (fn(e))
    return e;
  for (const s of t) {
    const a = s.axis || Lc(s.position) || e.length > 1 && fn(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function gn(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Pc(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (s.length)
      return gn(e, "x", s[0]) || gn(e, "y", s[0]);
  }
  return {};
}
function Ec(e, t) {
  const s = me[e.type] || {
    scales: {}
  }, a = t.scales || {}, n = Qs(e.type, t), i = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((o) => {
    const r = a[o];
    if (!nt(r))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const l = Js(o, r, Pc(o, e), xt.scales[r.type]), d = Fc(l, n), u = s.scales || {};
    i[o] = ze(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((o) => {
    const r = o.type || e.type, l = o.indexAxis || Qs(r, t), u = (me[r] || {}).scales || {};
    Object.keys(u).forEach((g) => {
      const p = Bc(g, l), f = o[p + "AxisID"] || p;
      i[f] = i[f] || /* @__PURE__ */ Object.create(null), ze(i[f], [
        {
          axis: p
        },
        a[f],
        u[g]
      ]);
    });
  }), Object.keys(i).forEach((o) => {
    const r = i[o];
    ze(r, [
      xt.scales[r.type],
      xt.scale
    ]);
  }), i;
}
function Pi(e) {
  const t = e.options || (e.options = {});
  t.plugins = et(t.plugins, {}), t.scales = Ec(e, t);
}
function Ei(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Rc(e) {
  return e = e || {}, e.data = Ei(e.data), Pi(e), e;
}
const pn = /* @__PURE__ */ new Map(), Ri = /* @__PURE__ */ new Set();
function cs(e, t) {
  let s = pn.get(e);
  return s || (s = t(), pn.set(e, s), Ri.add(s)), s;
}
const Pe = (e, t, s) => {
  const a = ve(t, s);
  a !== void 0 && e.add(a);
};
class Oc {
  constructor(t) {
    this._config = Rc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Ei(t);
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
    this.clearCache(), Pi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return cs(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return cs(`${t}.transition.${s}`, () => [
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
    return cs(`${t}-${s}`, () => [
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
    return cs(`${a}-plugin-${s}`, () => [
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
    const { options: n, type: i } = this, o = this._cachedScopes(t, a), r = o.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((u) => {
      t && (l.add(t), u.forEach((g) => Pe(l, t, g))), u.forEach((g) => Pe(l, n, g)), u.forEach((g) => Pe(l, me[i] || {}, g)), u.forEach((g) => Pe(l, xt, g)), u.forEach((g) => Pe(l, Gs, g));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Ri.has(s) && o.set(s, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      me[s] || {},
      xt.datasets[s] || {},
      {
        type: s
      },
      xt,
      Gs
    ];
  }
  resolveNamedOptions(t, s, a, n = [
    ""
  ]) {
    const i = {
      $shared: !0
    }, { resolver: o, subPrefixes: r } = bn(this._resolverCache, t, n);
    let l = o;
    if (zc(o, s)) {
      i.$shared = !1, a = oe(a) ? a() : a;
      const d = this.createResolver(t, a, r);
      l = $e(o, a, d);
    }
    for (const d of s)
      i[d] = l[d];
    return i;
  }
  createResolver(t, s, a = [
    ""
  ], n) {
    const { resolver: i } = bn(this._resolverCache, t, a);
    return nt(s) ? $e(i, s, void 0, n) : i;
  }
}
function bn(e, t, s) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const n = s.join();
  let i = a.get(n);
  return i || (i = {
    resolver: ua(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(n, i)), i;
}
const Ic = (e) => nt(e) && Object.getOwnPropertyNames(e).some((t) => oe(e[t]));
function zc(e, t) {
  const { isScriptable: s, isIndexable: a } = pi(e);
  for (const n of t) {
    const i = s(n), o = a(n), r = (o || i) && e[n];
    if (i && (oe(r) || Ic(r)) || o && kt(r))
      return !0;
  }
  return !1;
}
var Nc = "4.5.1";
const Wc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function vn(e, t) {
  return e === "top" || e === "bottom" || Wc.indexOf(e) === -1 && t === "x";
}
function mn(e, t) {
  return function(s, a) {
    return s[e] === a[e] ? s[t] - a[t] : s[e] - a[e];
  };
}
function _n(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), bt(s && s.onComplete, [
    e
  ], t);
}
function Hc(e) {
  const t = e.chart, s = t.options.animation;
  bt(s && s.onProgress, [
    e
  ], t);
}
function Oi(e) {
  return ga() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const fs = {}, yn = (e) => {
  const t = Oi(e);
  return Object.values(fs).filter((s) => s.canvas === t).pop();
};
function Vc(e, t, s) {
  const a = Object.keys(e);
  for (const n of a) {
    const i = +n;
    if (i >= t) {
      const o = e[n];
      delete e[n], (s > 0 || i > t) && (e[i + s] = o);
    }
  }
}
function jc(e, t, s, a) {
  return !s || e.type === "mouseout" ? null : a ? t : e;
}
let Ae = class {
  static defaults = xt;
  static instances = fs;
  static overrides = me;
  static registry = Vt;
  static version = Nc;
  static getChart = yn;
  static register(...t) {
    Vt.add(...t), xn();
  }
  static unregister(...t) {
    Vt.remove(...t), xn();
  }
  constructor(t, s) {
    const a = this.config = new Oc(s), n = Oi(t), i = yn(n);
    if (i)
      throw new Error("Canvas is already in use. Chart with ID '" + i.id + "' must be destroyed before the canvas with ID '" + i.canvas.id + "' can be reused.");
    const o = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || lc(n))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(n, o.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = Io(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new $c(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ar((g) => this.update(g), o.resizeDelay || 0), this._dataChanges = [], fs[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    qt.listen(this, "complete", _n), qt.listen(this, "progress", Hc), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: a, height: n, _aspectRatio: i } = this;
    return dt(t) ? s && i ? i : n ? a / n : null : t;
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
    return Vt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ha(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return za(this.canvas, this.ctx), this;
  }
  stop() {
    return qt.stop(this), this;
  }
  resize(t, s) {
    qt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const a = this.options, n = this.canvas, i = a.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(n, t, s, i), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Ha(this, r, !0) && (this.notifyPlugins("resize", {
      size: o
    }), bt(a.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    ht(s, (a, n) => {
      a.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, a = this.scales, n = Object.keys(a).reduce((o, r) => (o[r] = !1, o), {});
    let i = [];
    s && (i = i.concat(Object.keys(s).map((o) => {
      const r = s[o], l = Js(o, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), ht(i, (o) => {
      const r = o.options, l = r.id, d = Js(l, r), u = et(r.type, o.dtype);
      (r.position === void 0 || vn(r.position, d) !== vn(o.dposition)) && (r.position = o.dposition), n[l] = !0;
      let g = null;
      if (l in a && a[l].type === u)
        g = a[l];
      else {
        const p = Vt.getScale(u);
        g = new p({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[g.id] = g;
      }
      g.init(r, t);
    }), ht(n, (o, r) => {
      o || delete a[r];
    }), ht(a, (o) => {
      Ot.configure(this, o, o.options), Ot.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, a = t.length;
    if (t.sort((n, i) => n.index - i.index), a > s) {
      for (let n = s; n < a; ++n)
        this._destroyDatasetMeta(n);
      t.splice(s, a - s);
    }
    this._sortedMetasets = t.slice(0).sort(mn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((a, n) => {
      s.filter((i) => i === a._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let a, n;
    for (this._removeUnreferencedMetasets(), a = 0, n = s.length; a < n; a++) {
      const i = s[a];
      let o = this.getDatasetMeta(a);
      const r = i.type || this.config.type;
      if (o.type && o.type !== r && (this._destroyDatasetMeta(a), o = this.getDatasetMeta(a)), o.type = r, o.indexAxis = i.indexAxis || Qs(r, this.options), o.order = i.order || 0, o.index = a, o.label = "" + i.label, o.visible = this.isDatasetVisible(a), o.controller)
        o.controller.updateIndex(a), o.controller.linkScales();
      else {
        const l = Vt.getController(r), { datasetElementType: d, dataElementType: u } = xt.datasets[r];
        Object.assign(l, {
          dataElementType: Vt.getElement(u),
          datasetElementType: d && Vt.getElement(d)
        }), o.controller = new l(this, a), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    ht(this.data.datasets, (t, s) => {
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
    const i = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: g } = this.getDatasetMeta(d), p = !n && i.indexOf(g) === -1;
      g.buildOrUpdateElements(p), o = Math.max(+g.getMaxOverflow(), o);
    }
    o = this._minPadding = a.layout.autoPadding ? o : 0, this._updateLayout(o), n || ht(i, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(mn("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    ht(this.scales, (t) => {
      Ot.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Aa(s, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: a, start: n, count: i } of s) {
      const o = a === "_removeElements" ? -i : i;
      Vc(t, n, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, a = (i) => new Set(t.filter((o) => o[0] === i).map((o, r) => r + "," + o.splice(1).join(","))), n = a(0);
    for (let i = 1; i < s; i++)
      if (!Aa(n, a(i)))
        return;
    return Array.from(n).map((i) => i.split(",")).map((i) => ({
      method: i[1],
      start: +i[2],
      count: +i[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    Ot.update(this, this.width, this.height, t);
    const s = this.chartArea, a = s.width <= 0 || s.height <= 0;
    this._layers = [], ht(this.boxes, (n) => {
      a && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, i) => {
      n._idx = i;
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
        this._updateDataset(s, oe(t) ? t({
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
    }) !== !1 && (qt.has(this) ? this.attached && !qt.running(this) && qt.start(this) : (this.draw(), _n({
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
    let n, i;
    for (n = 0, i = s.length; n < i; ++n) {
      const o = s[n];
      (!t || o.visible) && a.push(o);
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
    }, n = Mi(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (n && ks(s, n), t.controller.draw(), n && ws(s), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Ke(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, a, n) {
    const i = Wl.modes[s];
    return typeof i == "function" ? i(this, t, a, n) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], a = this._metasets;
    let n = a.filter((i) => i && i._dataset === s).pop();
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
    return this.$context || (this.$context = _e(null, {
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
    const n = a ? "show" : "hide", i = this.getDatasetMeta(t), o = i.controller._resolveAnimations(void 0, n);
    Ye(s) ? (i.data[s].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), o.update(i, {
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
    for (this.stop(), qt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), za(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete fs[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, a = (i, o) => {
      s.addEventListener(this, i, o), t[i] = o;
    }, n = (i, o, r) => {
      i.offsetX = o, i.offsetY = r, this._eventHandler(i);
    };
    ht(this.options.events, (i) => a(i, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, a = (l, d) => {
      s.addEventListener(this, l, d), t[l] = d;
    }, n = (l, d) => {
      t[l] && (s.removeEventListener(this, l, d), delete t[l]);
    }, i = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let o;
    const r = () => {
      n("attach", r), this.attached = !0, this.resize(), a("resize", i), a("detach", o);
    };
    o = () => {
      this.attached = !1, n("resize", i), this._stop(), this._resize(0, 0), a("attach", r);
    }, s.isAttached(this.canvas) ? r() : o();
  }
  unbindEvents() {
    ht(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, ht(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, a) {
    const n = a ? "set" : "remove";
    let i, o, r, l;
    for (s === "dataset" && (i = this.getDatasetMeta(t[0].datasetIndex), i.controller["_" + n + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      o = t[r];
      const d = o && this.getDatasetMeta(o.datasetIndex).controller;
      d && d[n + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], a = t.map(({ datasetIndex: i, index: o }) => {
      const r = this.getDatasetMeta(i);
      if (!r)
        throw new Error("No dataset found at index " + i);
      return {
        datasetIndex: i,
        element: r.data[o],
        index: o
      };
    });
    !ps(a, s) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, s));
  }
  notifyPlugins(t, s, a) {
    return this._plugins.notify(this, t, s, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, a) {
    const n = this.options.hover, i = (l, d) => l.filter((u) => !d.some((g) => u.datasetIndex === g.datasetIndex && u.index === g.index)), o = i(s, t), r = a ? t : i(t, s);
    o.length && this.updateHoverStyle(o, n.mode, !1), r.length && n.mode && this.updateHoverStyle(r, n.mode, !0);
  }
  _eventHandler(t, s) {
    const a = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, n) === !1)
      return;
    const i = this._handleEvent(t, s, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, n), (i || a.changed) && this.render(), this;
  }
  _handleEvent(t, s, a) {
    const { _active: n = [], options: i } = this, o = s, r = this._getActiveElements(t, n, a, o), l = jo(t), d = jc(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, bt(i.onHover, [
      t,
      r,
      this
    ], this), l && bt(i.onClick, [
      t,
      r,
      this
    ], this));
    const u = !ps(r, n);
    return (u || s) && (this._active = r, this._updateHoverStyles(r, n, s)), this._lastEvent = d, u;
  }
  _getActiveElements(t, s, a, n) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return s;
    const i = this.options.hover;
    return this.getElementsAtEventForMode(t, i.mode, i, n);
  }
};
function xn() {
  return ht(Ae.instances, (e) => e._plugins.invalidate());
}
function Yc(e, t, s) {
  const { startAngle: a, x: n, y: i, outerRadius: o, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, g = Math.min(d / o, Et(a - s));
  if (e.beginPath(), e.arc(n, i, o - d / 2, a + g / 2, s - g / 2), r > 0) {
    const p = Math.min(d / r, Et(a - s));
    e.arc(n, i, r + d / 2, s - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(d / 2, o * Et(a - s));
    if (u === "round")
      e.arc(n, i, p, s - ft / 2, a + ft / 2, !0);
    else if (u === "bevel") {
      const f = 2 * p * p, h = -f * Math.cos(s + ft / 2) + n, b = -f * Math.sin(s + ft / 2) + i, v = f * Math.cos(a + ft / 2) + n, m = f * Math.sin(a + ft / 2) + i;
      e.lineTo(h, b), e.lineTo(v, m);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function qc(e, t, s) {
  const { startAngle: a, pixelMargin: n, x: i, y: o, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(i, o, r, a - d, s + d), l > n ? (d = n / l, e.arc(i, o, l, s + d, a - d, !0)) : e.arc(i, o, n, s + St, a - St), e.closePath(), e.clip();
}
function Uc(e) {
  return da(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Kc(e, t, s, a) {
  const n = Uc(e.options.borderRadius), i = (s - t) / 2, o = Math.min(i, a * t / 2), r = (l) => {
    const d = (s - Math.min(i, l)) * a / 2;
    return Ct(l, 0, Math.min(i, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: Ct(n.innerStart, 0, o),
    innerEnd: Ct(n.innerEnd, 0, o)
  };
}
function xe(e, t, s, a) {
  return {
    x: s + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function xs(e, t, s, a, n, i) {
  const { x: o, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, g = Math.max(t.outerRadius + a + s - d, 0), p = u > 0 ? u + a + s + d : 0;
  let f = 0;
  const h = n - l;
  if (a) {
    const I = u > 0 ? u - a : 0, j = g > 0 ? g - a : 0, K = (I + j) / 2, V = K !== 0 ? h * K / (K + a) : h;
    f = (h - V) / 2;
  }
  const b = Math.max(1e-3, h * g - s / ft) / g, v = (h - b) / 2, m = l + v + f, _ = n - v - f, { outerStart: w, outerEnd: k, innerStart: S, innerEnd: $ } = Kc(t, p, g, _ - m), A = g - w, F = g - k, R = m + w / A, N = _ - k / F, C = p + S, T = p + $, P = m + S / C, L = _ - $ / T;
  if (e.beginPath(), i) {
    const I = (R + N) / 2;
    if (e.arc(o, r, g, R, I), e.arc(o, r, g, I, N), k > 0) {
      const z = xe(F, N, o, r);
      e.arc(z.x, z.y, k, N, _ + St);
    }
    const j = xe(T, _, o, r);
    if (e.lineTo(j.x, j.y), $ > 0) {
      const z = xe(T, L, o, r);
      e.arc(z.x, z.y, $, _ + St, L + Math.PI);
    }
    const K = (_ - $ / p + (m + S / p)) / 2;
    if (e.arc(o, r, p, _ - $ / p, K, !0), e.arc(o, r, p, K, m + S / p, !0), S > 0) {
      const z = xe(C, P, o, r);
      e.arc(z.x, z.y, S, P + Math.PI, m - St);
    }
    const V = xe(A, m, o, r);
    if (e.lineTo(V.x, V.y), w > 0) {
      const z = xe(A, R, o, r);
      e.arc(z.x, z.y, w, m - St, R);
    }
  } else {
    e.moveTo(o, r);
    const I = Math.cos(R) * g + o, j = Math.sin(R) * g + r;
    e.lineTo(I, j);
    const K = Math.cos(N) * g + o, V = Math.sin(N) * g + r;
    e.lineTo(K, V);
  }
  e.closePath();
}
function Xc(e, t, s, a, n) {
  const { fullCircles: i, startAngle: o, circumference: r } = t;
  let l = t.endAngle;
  if (i) {
    xs(e, t, s, a, l, n);
    for (let d = 0; d < i; ++d)
      e.fill();
    isNaN(r) || (l = o + (r % vt || vt));
  }
  return xs(e, t, s, a, l, n), e.fill(), l;
}
function Gc(e, t, s, a, n) {
  const { fullCircles: i, startAngle: o, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: g, borderDashOffset: p, borderRadius: f } = l, h = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(g || []), e.lineDashOffset = p, h ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (i) {
    xs(e, t, s, a, b, n);
    for (let v = 0; v < i; ++v)
      e.stroke();
    isNaN(r) || (b = o + (r % vt || vt));
  }
  h && qc(e, t, b), l.selfJoin && b - o >= ft && f === 0 && u !== "miter" && Yc(e, t, b), i || (xs(e, t, s, a, b, n), e.stroke());
}
class Zc extends te {
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
    ], a), { angle: i, distance: o } = ri(n, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: g } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, f = et(g, l - r), h = Ue(i, r, l) && r !== l, b = f >= vt || h, v = Zt(o, d + p, u + p);
    return b && v;
  }
  getCenterPoint(t) {
    const { x: s, y: a, startAngle: n, endAngle: i, innerRadius: o, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: d } = this.options, u = (n + i) / 2, g = (o + r + d + l) / 2;
    return {
      x: s + Math.cos(u) * g,
      y: a + Math.sin(u) * g
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: a } = this, n = (s.offset || 0) / 4, i = (s.spacing || 0) / 2, o = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > vt ? Math.floor(a / vt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(ft, a || 0)), d = n * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, Xc(t, this, d, i, o), Gc(t, this, d, i, o), t.restore();
  }
}
function Ii(e, t, s = t) {
  e.lineCap = et(s.borderCapStyle, t.borderCapStyle), e.setLineDash(et(s.borderDash, t.borderDash)), e.lineDashOffset = et(s.borderDashOffset, t.borderDashOffset), e.lineJoin = et(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = et(s.borderWidth, t.borderWidth), e.strokeStyle = et(s.borderColor, t.borderColor);
}
function Qc(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Jc(e) {
  return e.stepped ? vr : e.tension || e.cubicInterpolationMode === "monotone" ? mr : Qc;
}
function zi(e, t, s = {}) {
  const a = e.length, { start: n = 0, end: i = a - 1 } = s, { start: o, end: r } = t, l = Math.max(n, o), d = Math.min(i, r), u = n < o && i < o || n > r && i > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? a + d - l : d - l
  };
}
function td(e, t, s, a) {
  const { points: n, options: i } = t, { count: o, start: r, loop: l, ilen: d } = zi(n, s, a), u = Jc(i);
  let { move: g = !0, reverse: p } = a || {}, f, h, b;
  for (f = 0; f <= d; ++f)
    h = n[(r + (p ? d - f : f)) % o], !h.skip && (g ? (e.moveTo(h.x, h.y), g = !1) : u(e, b, h, p, i.stepped), b = h);
  return l && (h = n[(r + (p ? d : 0)) % o], u(e, b, h, p, i.stepped)), !!l;
}
function ed(e, t, s, a) {
  const n = t.points, { count: i, start: o, ilen: r } = zi(n, s, a), { move: l = !0, reverse: d } = a || {};
  let u = 0, g = 0, p, f, h, b, v, m;
  const _ = (k) => (o + (d ? r - k : k)) % i, w = () => {
    b !== v && (e.lineTo(u, v), e.lineTo(u, b), e.lineTo(u, m));
  };
  for (l && (f = n[_(0)], e.moveTo(f.x, f.y)), p = 0; p <= r; ++p) {
    if (f = n[_(p)], f.skip)
      continue;
    const k = f.x, S = f.y, $ = k | 0;
    $ === h ? (S < b ? b = S : S > v && (v = S), u = (g * u + k) / ++g) : (w(), e.lineTo(k, S), h = $, g = 0, b = v = S), m = S;
  }
  w();
}
function ta(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? ed : td;
}
function sd(e) {
  return e.stepped ? Gr : e.tension || e.cubicInterpolationMode === "monotone" ? Zr : ge;
}
function ad(e, t, s, a) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, s, a) && n.closePath()), Ii(e, t.options), e.stroke(n);
}
function nd(e, t, s, a) {
  const { segments: n, options: i } = t, o = ta(t);
  for (const r of n)
    Ii(e, i, r.style), e.beginPath(), o(e, t, r, {
      start: s,
      end: s + a - 1
    }) && e.closePath(), e.stroke();
}
const id = typeof Path2D == "function";
function od(e, t, s, a) {
  id && !t.options.segment ? ad(e, t, s, a) : nd(e, t, s, a);
}
class Cs extends te {
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
      Hr(this._points, a, t, n, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = al(this, this.options.segment));
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
    const a = this.options, n = t[s], i = this.points, o = Si(this, {
      property: s,
      start: n,
      end: n
    });
    if (!o.length)
      return;
    const r = [], l = sd(a);
    let d, u;
    for (d = 0, u = o.length; d < u; ++d) {
      const { start: g, end: p } = o[d], f = i[g], h = i[p];
      if (f === h) {
        r.push(f);
        continue;
      }
      const b = Math.abs((n - f[s]) / (h[s] - f[s])), v = l(f, h, b, a.stepped);
      v[s] = t[s], r.push(v);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, a) {
    return ta(this)(t, this, s, a);
  }
  path(t, s, a) {
    const n = this.segments, i = ta(this);
    let o = this._loop;
    s = s || 0, a = a || this.points.length - s;
    for (const r of n)
      o &= i(t, this, r, {
        start: s,
        end: s + a - 1
      });
    return !!o;
  }
  draw(t, s, a, n) {
    const i = this.options || {};
    (this.points || []).length && i.borderWidth && (t.save(), od(t, this, a, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function kn(e, t, s, a) {
  const n = e.options, { [s]: i } = e.getProps([
    s
  ], a);
  return Math.abs(t - i) < n.radius + n.hitRadius;
}
class rd extends te {
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
    const n = this.options, { x: i, y: o } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - i, 2) + Math.pow(s - o, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, s) {
    return kn(this, t, "x", s);
  }
  inYRange(t, s) {
    return kn(this, t, "y", s);
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
    this.skip || a.radius < 0.1 || !Ke(this, s, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Zs(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Ni(e, t) {
  const { x: s, y: a, base: n, width: i, height: o } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, d, u, g;
  return e.horizontal ? (g = o / 2, r = Math.min(s, n), l = Math.max(s, n), d = a - g, u = a + g) : (g = i / 2, r = s - g, l = s + g, d = Math.min(a, n), u = Math.max(a, n)), {
    left: r,
    top: d,
    right: l,
    bottom: u
  };
}
function ne(e, t, s, a) {
  return e ? 0 : Ct(t, s, a);
}
function ld(e, t, s) {
  const a = e.options.borderWidth, n = e.borderSkipped, i = gi(a);
  return {
    t: ne(n.top, i.top, 0, s),
    r: ne(n.right, i.right, 0, t),
    b: ne(n.bottom, i.bottom, 0, s),
    l: ne(n.left, i.left, 0, t)
  };
}
function cd(e, t, s) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, i = Se(n), o = Math.min(t, s), r = e.borderSkipped, l = a || nt(n);
  return {
    topLeft: ne(!l || r.top || r.left, i.topLeft, 0, o),
    topRight: ne(!l || r.top || r.right, i.topRight, 0, o),
    bottomLeft: ne(!l || r.bottom || r.left, i.bottomLeft, 0, o),
    bottomRight: ne(!l || r.bottom || r.right, i.bottomRight, 0, o)
  };
}
function dd(e) {
  const t = Ni(e), s = t.right - t.left, a = t.bottom - t.top, n = ld(e, s / 2, a / 2), i = cd(e, s / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: a,
      radius: i
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: s - n.l - n.r,
      h: a - n.t - n.b,
      radius: {
        topLeft: Math.max(0, i.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, i.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, i.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, i.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function Hs(e, t, s, a) {
  const n = t === null, i = s === null, r = e && !(n && i) && Ni(e, a);
  return r && (n || Zt(t, r.left, r.right)) && (i || Zt(s, r.top, r.bottom));
}
function ud(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function hd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Vs(e, t, s = {}) {
  const a = e.x !== s.x ? -t : 0, n = e.y !== s.y ? -t : 0, i = (e.x + e.w !== s.x + s.w ? t : 0) - a, o = (e.y + e.h !== s.y + s.h ? t : 0) - n;
  return {
    x: e.x + a,
    y: e.y + n,
    w: e.w + i,
    h: e.h + o,
    radius: e.radius
  };
}
class fd extends te {
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
    const { inflateAmount: s, options: { borderColor: a, backgroundColor: n } } = this, { inner: i, outer: o } = dd(this), r = ud(o.radius) ? ms : hd;
    t.save(), (o.w !== i.w || o.h !== i.h) && (t.beginPath(), r(t, Vs(o, s, i)), t.clip(), r(t, Vs(i, -s, o)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, Vs(i, s)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, s, a) {
    return Hs(this, t, s, a);
  }
  inXRange(t, s) {
    return Hs(this, t, null, s);
  }
  inYRange(t, s) {
    return Hs(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: a, base: n, horizontal: i } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: i ? (s + n) / 2 : s,
      y: i ? a : (a + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function gd(e, t, s) {
  const a = e.segments, n = e.points, i = t.points, o = [];
  for (const r of a) {
    let { start: l, end: d } = r;
    d = Ds(l, d, n);
    const u = ea(s, n[l], n[d], r.loop);
    if (!t.segments) {
      o.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const g = Si(t, u);
    for (const p of g) {
      const f = ea(s, i[p.start], i[p.end], p.loop), h = wi(r, n, f);
      for (const b of h)
        o.push({
          source: b,
          target: p,
          start: {
            [s]: wn(u, f, "start", Math.max)
          },
          end: {
            [s]: wn(u, f, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function ea(e, t, s, a) {
  if (a)
    return;
  let n = t[e], i = s[e];
  return e === "angle" && (n = Et(n), i = Et(i)), {
    property: e,
    start: n,
    end: i
  };
}
function pd(e, t) {
  const { x: s = null, y: a = null } = e || {}, n = t.points, i = [];
  return t.segments.forEach(({ start: o, end: r }) => {
    r = Ds(o, r, n);
    const l = n[o], d = n[r];
    a !== null ? (i.push({
      x: l.x,
      y: a
    }), i.push({
      x: d.x,
      y: a
    })) : s !== null && (i.push({
      x: s,
      y: l.y
    }), i.push({
      x: s,
      y: d.y
    }));
  }), i;
}
function Ds(e, t, s) {
  for (; t > e; t--) {
    const a = s[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function wn(e, t, s, a) {
  return e && t ? a(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Wi(e, t) {
  let s = [], a = !1;
  return kt(e) ? (a = !0, s = e) : s = pd(e, t), s.length ? new Cs({
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
function bd(e, t, s) {
  let n = e[t].fill;
  const i = [
    t
  ];
  let o;
  if (!s)
    return n;
  for (; n !== !1 && i.indexOf(n) === -1; ) {
    if (!At(n))
      return n;
    if (o = e[n], !o)
      return !1;
    if (o.visible)
      return n;
    i.push(n), n = o.fill;
  }
  return !1;
}
function vd(e, t, s) {
  const a = xd(e);
  if (nt(a))
    return isNaN(a.value) ? !1 : a;
  let n = parseFloat(a);
  return At(n) && Math.floor(n) === n ? md(a[0], t, n, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(a) >= 0 && a;
}
function md(e, t, s, a) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= a ? !1 : s;
}
function _d(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : nt(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function yd(e, t, s) {
  let a;
  return e === "start" ? a = s : e === "end" ? a = t.options.reverse ? t.min : t.max : nt(e) ? a = e.value : a = t.getBaseValue(), a;
}
function xd(e) {
  const t = e.options, s = t.fill;
  let a = et(s && s.target, s);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function kd(e) {
  const { scale: t, index: s, line: a } = e, n = [], i = a.segments, o = a.points, r = wd(t, s);
  r.push(Wi({
    x: null,
    y: t.bottom
  }, a));
  for (let l = 0; l < i.length; l++) {
    const d = i[l];
    for (let u = d.start; u <= d.end; u++)
      Sd(n, o[u], r);
  }
  return new Cs({
    points: n,
    options: {}
  });
}
function wd(e, t) {
  const s = [], a = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < a.length; n++) {
    const i = a[n];
    if (i.index === t)
      break;
    i.hidden || s.unshift(i.dataset);
  }
  return s;
}
function Sd(e, t, s) {
  const a = [];
  for (let n = 0; n < s.length; n++) {
    const i = s[n], { first: o, last: r, point: l } = Md(i, t, "x");
    if (!(!l || o && r)) {
      if (o)
        a.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...a);
}
function Md(e, t, s) {
  const a = e.interpolate(t, s);
  if (!a)
    return {};
  const n = a[s], i = e.segments, o = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < i.length; d++) {
    const u = i[d], g = o[u.start][s], p = o[u.end][s];
    if (Zt(n, g, p)) {
      r = n === g, l = n === p;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: a
  };
}
class Hi {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, a) {
    const { x: n, y: i, radius: o } = this;
    return s = s || {
      start: 0,
      end: vt
    }, t.arc(n, i, o, s.end, s.start, !0), !a.bounds;
  }
  interpolate(t) {
    const { x: s, y: a, radius: n } = this, i = t.angle;
    return {
      x: s + Math.cos(i) * n,
      y: a + Math.sin(i) * n,
      angle: i
    };
  }
}
function $d(e) {
  const { chart: t, fill: s, line: a } = e;
  if (At(s))
    return Cd(t, s);
  if (s === "stack")
    return kd(e);
  if (s === "shape")
    return !0;
  const n = Dd(e);
  return n instanceof Hi ? n : Wi(n, a);
}
function Cd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function Dd(e) {
  return (e.scale || {}).getPointPositionForValue ? Td(e) : Ad(e);
}
function Ad(e) {
  const { scale: t = {}, fill: s } = e, a = _d(s, t);
  if (At(a)) {
    const n = t.isHorizontal();
    return {
      x: n ? a : null,
      y: n ? null : a
    };
  }
  return null;
}
function Td(e) {
  const { scale: t, fill: s } = e, a = t.options, n = t.getLabels().length, i = a.reverse ? t.max : t.min, o = yd(s, t, i), r = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, i);
    return new Hi({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, o));
  return r;
}
function js(e, t, s) {
  const a = $d(t), { chart: n, index: i, line: o, scale: r, axis: l } = t, d = o.options, u = d.fill, g = d.backgroundColor, { above: p = g, below: f = g } = u || {}, h = n.getDatasetMeta(i), b = Mi(n, h);
  a && o.points.length && (ks(e, s), Bd(e, {
    line: o,
    target: a,
    above: p,
    below: f,
    area: s,
    scale: r,
    axis: l,
    clip: b
  }), ws(e));
}
function Bd(e, t) {
  const { line: s, target: a, above: n, below: i, area: o, scale: r, clip: l } = t, d = s._loop ? "angle" : t.axis;
  e.save();
  let u = i;
  i !== n && (d === "x" ? (Mn(e, a, o.top), Ys(e, {
    line: s,
    target: a,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Mn(e, a, o.bottom)) : d === "y" && ($n(e, a, o.left), Ys(e, {
    line: s,
    target: a,
    color: i,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), $n(e, a, o.right), u = n)), Ys(e, {
    line: s,
    target: a,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function Mn(e, t, s) {
  const { segments: a, points: n } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], g = n[Ds(l, d, n)];
    i ? (e.moveTo(u.x, u.y), i = !1) : (e.lineTo(u.x, s), e.lineTo(u.x, u.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(g.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function $n(e, t, s) {
  const { segments: a, points: n } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], g = n[Ds(l, d, n)];
    i ? (e.moveTo(u.x, u.y), i = !1) : (e.lineTo(s, u.y), e.lineTo(u.x, u.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(s, g.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Ys(e, t) {
  const { line: s, target: a, property: n, color: i, scale: o, clip: r } = t, l = gd(s, a, n);
  for (const { source: d, target: u, start: g, end: p } of l) {
    const { style: { backgroundColor: f = i } = {} } = d, h = a !== !0;
    e.save(), e.fillStyle = f, Fd(e, o, r, h && ea(n, g, p)), e.beginPath();
    const b = !!s.pathSegment(e, d);
    let v;
    if (h) {
      b ? e.closePath() : Cn(e, a, p, n);
      const m = !!a.pathSegment(e, u, {
        move: b,
        reverse: !0
      });
      v = b && m, v || Cn(e, a, g, n);
    }
    e.closePath(), e.fill(v ? "evenodd" : "nonzero"), e.restore();
  }
}
function Fd(e, t, s, a) {
  const n = t.chart.chartArea, { property: i, start: o, end: r } = a || {};
  if (i === "x" || i === "y") {
    let l, d, u, g;
    i === "x" ? (l = o, d = n.top, u = r, g = n.bottom) : (l = n.left, d = o, u = n.right, g = r), e.beginPath(), s && (l = Math.max(l, s.left), u = Math.min(u, s.right), d = Math.max(d, s.top), g = Math.min(g, s.bottom)), e.rect(l, d, u - l, g - d), e.clip();
  }
}
function Cn(e, t, s, a) {
  const n = t.interpolate(s, a);
  n && e.lineTo(n.x, n.y);
}
var Ld = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const a = (e.data.datasets || []).length, n = [];
    let i, o, r, l;
    for (o = 0; o < a; ++o)
      i = e.getDatasetMeta(o), r = i.dataset, l = null, r && r.options && r instanceof Cs && (l = {
        visible: e.isDatasetVisible(o),
        index: o,
        fill: vd(r, o, a),
        chart: e,
        axis: i.controller.options.indexAxis,
        scale: i.vScale,
        line: r
      }), i.$filler = l, n.push(l);
    for (o = 0; o < a; ++o)
      l = n[o], !(!l || l.fill === !1) && (l.fill = bd(n, o, s.propagate));
  },
  beforeDraw(e, t, s) {
    const a = s.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), i = e.chartArea;
    for (let o = n.length - 1; o >= 0; --o) {
      const r = n[o].$filler;
      r && (r.line.updateControlPoints(i, r.axis), a && r.fill && js(e.ctx, r, i));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let n = a.length - 1; n >= 0; --n) {
      const i = a[n].$filler;
      Sn(i) && js(e.ctx, i, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const a = t.meta.$filler;
    !Sn(a) || s.drawTime !== "beforeDatasetDraw" || js(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Dn = (e, t) => {
  let { boxHeight: s = t, boxWidth: a = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, Pd = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class An extends te {
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
    let s = bt(t.generateLabels, [
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
    const a = t.labels, n = Dt(a.font), i = n.size, o = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Dn(a, i);
    let d, u;
    s.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(o, i, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(o, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, a, n) {
    const { ctx: i, maxWidth: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let g = t;
    i.textAlign = "left", i.textBaseline = "middle";
    let p = -1, f = -u;
    return this.legendItems.forEach((h, b) => {
      const v = a + s / 2 + i.measureText(h.text).width;
      (b === 0 || d[d.length - 1] + v + 2 * r > o) && (g += u, d[d.length - (b > 0 ? 0 : 1)] = 0, f += u, p++), l[b] = {
        left: 0,
        top: f,
        row: p,
        width: v,
        height: n
      }, d[d.length - 1] += v + r;
    }), g;
  }
  _fitCols(t, s, a, n) {
    const { ctx: i, maxHeight: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = o - t;
    let g = r, p = 0, f = 0, h = 0, b = 0;
    return this.legendItems.forEach((v, m) => {
      const { itemWidth: _, itemHeight: w } = Ed(a, s, i, v, n);
      m > 0 && f + w + 2 * r > u && (g += p + r, d.push({
        width: p,
        height: f
      }), h += p + r, b++, p = f = 0), l[m] = {
        left: h,
        top: f,
        col: b,
        width: _,
        height: w
      }, p = Math.max(p, _), f += w + r;
    }), g += p, d.push({
      width: p,
      height: f
    }), g;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: a, labels: { padding: n }, rtl: i } } = this, o = Me(i, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = $t(a, this.left + n, this.right - this.lineWidths[r]);
      for (const d of s)
        r !== d.row && (r = d.row, l = $t(a, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = o.leftForLtr(o.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = $t(a, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of s)
        d.col !== r && (r = d.col, l = $t(a, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = o.leftForLtr(o.x(d.left), d.width), l += d.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ks(t, this), this._draw(), ws(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: a, ctx: n } = this, { align: i, labels: o } = t, r = xt.color, l = Me(t.rtl, this.left, this.width), d = Dt(o.font), { padding: u } = o, g = d.size, p = g / 2;
    let f;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: h, boxHeight: b, itemHeight: v } = Dn(o, g), m = function($, A, F) {
      if (isNaN(h) || h <= 0 || isNaN(b) || b < 0)
        return;
      n.save();
      const R = et(F.lineWidth, 1);
      if (n.fillStyle = et(F.fillStyle, r), n.lineCap = et(F.lineCap, "butt"), n.lineDashOffset = et(F.lineDashOffset, 0), n.lineJoin = et(F.lineJoin, "miter"), n.lineWidth = R, n.strokeStyle = et(F.strokeStyle, r), n.setLineDash(et(F.lineDash, [])), o.usePointStyle) {
        const N = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: F.pointStyle,
          rotation: F.rotation,
          borderWidth: R
        }, C = l.xPlus($, h / 2), T = A + p;
        fi(n, N, C, T, o.pointStyleWidth && h);
      } else {
        const N = A + Math.max((g - b) / 2, 0), C = l.leftForLtr($, h), T = Se(F.borderRadius);
        n.beginPath(), Object.values(T).some((P) => P !== 0) ? ms(n, {
          x: C,
          y: N,
          w: h,
          h: b,
          radius: T
        }) : n.rect(C, N, h, b), n.fill(), R !== 0 && n.stroke();
      }
      n.restore();
    }, _ = function($, A, F) {
      Xe(n, F.text, $, A + v / 2, d, {
        strikethrough: F.hidden,
        textAlign: l.textAlign(F.textAlign)
      });
    }, w = this.isHorizontal(), k = this._computeTitleHeight();
    w ? f = {
      x: $t(i, this.left + u, this.right - a[0]),
      y: this.top + u + k,
      line: 0
    } : f = {
      x: this.left + u,
      y: $t(i, this.top + k + u, this.bottom - s[0].height),
      line: 0
    }, yi(this.ctx, t.textDirection);
    const S = v + u;
    this.legendItems.forEach(($, A) => {
      n.strokeStyle = $.fontColor, n.fillStyle = $.fontColor;
      const F = n.measureText($.text).width, R = l.textAlign($.textAlign || ($.textAlign = o.textAlign)), N = h + p + F;
      let C = f.x, T = f.y;
      l.setWidth(this.width), w ? A > 0 && C + N + u > this.right && (T = f.y += S, f.line++, C = f.x = $t(i, this.left + u, this.right - a[f.line])) : A > 0 && T + S > this.bottom && (C = f.x = C + s[f.line].width + u, f.line++, T = f.y = $t(i, this.top + k + u, this.bottom - s[f.line].height));
      const P = l.x(C);
      if (m(P, T, $), C = nr(R, C + h + p, w ? C + N : this.right, t.rtl), _(l.x(C), T, $), w)
        f.x += N + u;
      else if (typeof $.text != "string") {
        const L = d.lineHeight;
        f.y += Vi($, L) + u;
      } else
        f.y += S;
    }), xi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, a = Dt(s.font), n = It(s.padding);
    if (!s.display)
      return;
    const i = Me(t.rtl, this.left, this.width), o = this.ctx, r = s.position, l = a.size / 2, d = n.top + l;
    let u, g = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, g = $t(t.align, g, this.right - p);
    else {
      const h = this.columnSizes.reduce((b, v) => Math.max(b, v.height), 0);
      u = d + $t(t.align, this.top, this.bottom - h - t.labels.padding - this._computeTitleHeight());
    }
    const f = $t(r, g, g + p);
    o.textAlign = i.textAlign(ra(r)), o.textBaseline = "middle", o.strokeStyle = s.color, o.fillStyle = s.color, o.font = a.string, Xe(o, s.text, f, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = Dt(t.font), a = It(t.padding);
    return t.display ? s.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, s) {
    let a, n, i;
    if (Zt(t, this.left, this.right) && Zt(s, this.top, this.bottom)) {
      for (i = this.legendHitBoxes, a = 0; a < i.length; ++a)
        if (n = i[a], Zt(t, n.left, n.left + n.width) && Zt(s, n.top, n.top + n.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!Id(t.type, s))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, i = Pd(n, a);
      n && !i && bt(s.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = a, a && !i && bt(s.onHover, [
        t,
        a,
        this
      ], this);
    } else a && bt(s.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Ed(e, t, s, a, n) {
  const i = Rd(a, e, t, s), o = Od(n, a, t.lineHeight);
  return {
    itemWidth: i,
    itemHeight: o
  };
}
function Rd(e, t, s, a) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((i, o) => i.length > o.length ? i : o)), t + s.size / 2 + a.measureText(n).width;
}
function Od(e, t, s) {
  let a = e;
  return typeof t.text != "string" && (a = Vi(t, s)), a;
}
function Vi(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function Id(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var va = {
  id: "legend",
  _element: An,
  start(e, t, s) {
    const a = e.legend = new An({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Ot.configure(e, a, s), Ot.addBox(e, a);
  },
  stop(e) {
    Ot.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const a = e.legend;
    Ot.configure(e, a, s), a.options = s;
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
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: a, textAlign: n, color: i, useBorderRadius: o, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(s ? 0 : void 0), u = It(d.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: i,
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
            borderRadius: o && (r || d.borderRadius),
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
class ji extends te {
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
    const n = kt(a.text) ? a.text.length : 1;
    this._padding = It(a.padding);
    const i = n * Dt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = i : this.width = i;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: a, bottom: n, right: i, options: o } = this, r = o.align;
    let l = 0, d, u, g;
    return this.isHorizontal() ? (u = $t(r, a, i), g = s + t, d = i - a) : (o.position === "left" ? (u = a + t, g = $t(r, n, s), l = ft * -0.5) : (u = i - t, g = $t(r, s, n), l = ft * 0.5), d = n - s), {
      titleX: u,
      titleY: g,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const a = Dt(s.font), i = a.lineHeight / 2 + this._padding.top, { titleX: o, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(i);
    Xe(t, s.text, 0, 0, a, {
      color: s.color,
      maxWidth: l,
      rotation: d,
      textAlign: ra(s.align),
      textBaseline: "middle",
      translation: [
        o,
        r
      ]
    });
  }
}
function zd(e, t) {
  const s = new ji({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Ot.configure(e, s, t), Ot.addBox(e, s), e.titleBlock = s;
}
var Yi = {
  id: "title",
  _element: ji,
  start(e, t, s) {
    zd(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Ot.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const a = e.titleBlock;
    Ot.configure(e, a, s), a.options = s;
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
const Ie = {
  average(e) {
    if (!e.length)
      return !1;
    let t, s, a = /* @__PURE__ */ new Set(), n = 0, i = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        a.add(l.x), n += l.y, ++i;
      }
    }
    return i === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((r, l) => r + l) / a.size,
      y: n / i
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, a = t.y, n = Number.POSITIVE_INFINITY, i, o, r;
    for (i = 0, o = e.length; i < o; ++i) {
      const l = e[i].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), u = Xs(t, d);
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
function Ht(e, t) {
  return t && (kt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Ut(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Nd(e, t) {
  const { element: s, datasetIndex: a, index: n } = t, i = e.getDatasetMeta(a).controller, { label: o, value: r } = i.getLabelAndValue(n);
  return {
    chart: e,
    label: o,
    parsed: i.getParsed(n),
    raw: e.data.datasets[a].data[n],
    formattedValue: r,
    dataset: i.getDataset(),
    dataIndex: n,
    datasetIndex: a,
    element: s
  };
}
function Tn(e, t) {
  const s = e.chart.ctx, { body: a, footer: n, title: i } = e, { boxWidth: o, boxHeight: r } = t, l = Dt(t.bodyFont), d = Dt(t.titleFont), u = Dt(t.footerFont), g = i.length, p = n.length, f = a.length, h = It(t.padding);
  let b = h.height, v = 0, m = a.reduce((k, S) => k + S.before.length + S.lines.length + S.after.length, 0);
  if (m += e.beforeBody.length + e.afterBody.length, g && (b += g * d.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), m) {
    const k = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    b += f * k + (m - f) * l.lineHeight + (m - 1) * t.bodySpacing;
  }
  p && (b += t.footerMarginTop + p * u.lineHeight + (p - 1) * t.footerSpacing);
  let _ = 0;
  const w = function(k) {
    v = Math.max(v, s.measureText(k).width + _);
  };
  return s.save(), s.font = d.string, ht(e.title, w), s.font = l.string, ht(e.beforeBody.concat(e.afterBody), w), _ = t.displayColors ? o + 2 + t.boxPadding : 0, ht(a, (k) => {
    ht(k.before, w), ht(k.lines, w), ht(k.after, w);
  }), _ = 0, s.font = u.string, ht(e.footer, w), s.restore(), v += h.width, {
    width: v,
    height: b
  };
}
function Wd(e, t) {
  const { y: s, height: a } = t;
  return s < a / 2 ? "top" : s > e.height - a / 2 ? "bottom" : "center";
}
function Hd(e, t, s, a) {
  const { x: n, width: i } = a, o = s.caretSize + s.caretPadding;
  if (e === "left" && n + i + o > t.width || e === "right" && n - i - o < 0)
    return !0;
}
function Vd(e, t, s, a) {
  const { x: n, width: i } = s, { width: o, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return a === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= i / 2 ? d = "left" : n >= o - i / 2 && (d = "right"), Hd(d, e, t, s) && (d = "center"), d;
}
function Bn(e, t, s) {
  const a = s.yAlign || t.yAlign || Wd(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || Vd(e, t, s, a),
    yAlign: a
  };
}
function jd(e, t) {
  let { x: s, width: a } = e;
  return t === "right" ? s -= a : t === "center" && (s -= a / 2), s;
}
function Yd(e, t, s) {
  let { y: a, height: n } = e;
  return t === "top" ? a += s : t === "bottom" ? a -= n + s : a -= n / 2, a;
}
function Fn(e, t, s, a) {
  const { caretSize: n, caretPadding: i, cornerRadius: o } = e, { xAlign: r, yAlign: l } = s, d = n + i, { topLeft: u, topRight: g, bottomLeft: p, bottomRight: f } = Se(o);
  let h = jd(t, r);
  const b = Yd(t, l, d);
  return l === "center" ? r === "left" ? h += d : r === "right" && (h -= d) : r === "left" ? h -= Math.max(u, p) + n : r === "right" && (h += Math.max(g, f) + n), {
    x: Ct(h, 0, a.width - t.width),
    y: Ct(b, 0, a.height - t.height)
  };
}
function ds(e, t, s) {
  const a = It(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Ln(e) {
  return Ht([], Ut(e));
}
function qd(e, t, s) {
  return _e(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Pn(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const qi = {
  beforeTitle: Yt,
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
  afterTitle: Yt,
  beforeBody: Yt,
  beforeLabel: Yt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return dt(s) || (t += s), t;
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
  afterLabel: Yt,
  afterBody: Yt,
  beforeFooter: Yt,
  footer: Yt,
  afterFooter: Yt
};
function Bt(e, t, s, a) {
  const n = e[t].call(s, a);
  return typeof n > "u" ? qi[t].call(s, a) : n;
}
class En extends te {
  static positioners = Ie;
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
    const s = this.chart, a = this.options.setContext(this.getContext()), n = a.enabled && s.options.animation && a.animations, i = new $i(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = qd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: a } = s, n = Bt(a, "beforeTitle", this, t), i = Bt(a, "title", this, t), o = Bt(a, "afterTitle", this, t);
    let r = [];
    return r = Ht(r, Ut(n)), r = Ht(r, Ut(i)), r = Ht(r, Ut(o)), r;
  }
  getBeforeBody(t, s) {
    return Ln(Bt(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: a } = s, n = [];
    return ht(t, (i) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, r = Pn(a, i);
      Ht(o.before, Ut(Bt(r, "beforeLabel", this, i))), Ht(o.lines, Bt(r, "label", this, i)), Ht(o.after, Ut(Bt(r, "afterLabel", this, i))), n.push(o);
    }), n;
  }
  getAfterBody(t, s) {
    return Ln(Bt(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: a } = s, n = Bt(a, "beforeFooter", this, t), i = Bt(a, "footer", this, t), o = Bt(a, "afterFooter", this, t);
    let r = [];
    return r = Ht(r, Ut(n)), r = Ht(r, Ut(i)), r = Ht(r, Ut(o)), r;
  }
  _createItems(t) {
    const s = this._active, a = this.chart.data, n = [], i = [], o = [];
    let r = [], l, d;
    for (l = 0, d = s.length; l < d; ++l)
      r.push(Nd(this.chart, s[l]));
    return t.filter && (r = r.filter((u, g, p) => t.filter(u, g, p, a))), t.itemSort && (r = r.sort((u, g) => t.itemSort(u, g, a))), ht(r, (u) => {
      const g = Pn(t.callbacks, u);
      n.push(Bt(g, "labelColor", this, u)), i.push(Bt(g, "labelPointStyle", this, u)), o.push(Bt(g, "labelTextColor", this, u));
    }), this.labelColors = n, this.labelPointStyles = i, this.labelTextColors = o, this.dataPoints = r, r;
  }
  update(t, s) {
    const a = this.options.setContext(this.getContext()), n = this._active;
    let i, o = [];
    if (!n.length)
      this.opacity !== 0 && (i = {
        opacity: 0
      });
    else {
      const r = Ie[a.position].call(this, n, this._eventPosition);
      o = this._createItems(a), this.title = this.getTitle(o, a), this.beforeBody = this.getBeforeBody(o, a), this.body = this.getBody(o, a), this.afterBody = this.getAfterBody(o, a), this.footer = this.getFooter(o, a);
      const l = this._size = Tn(this, a), d = Object.assign({}, r, l), u = Bn(this.chart, a, d), g = Fn(a, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, i = {
        opacity: 1,
        x: g.x,
        y: g.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, i && this._resolveAnimations().update(this, i), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, a, n) {
    const i = this.getCaretPosition(t, a, n);
    s.lineTo(i.x1, i.y1), s.lineTo(i.x2, i.y2), s.lineTo(i.x3, i.y3);
  }
  getCaretPosition(t, s, a) {
    const { xAlign: n, yAlign: i } = this, { caretSize: o, cornerRadius: r } = a, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: g } = Se(r), { x: p, y: f } = t, { width: h, height: b } = s;
    let v, m, _, w, k, S;
    return i === "center" ? (k = f + b / 2, n === "left" ? (v = p, m = v - o, w = k + o, S = k - o) : (v = p + h, m = v + o, w = k - o, S = k + o), _ = v) : (n === "left" ? m = p + Math.max(l, u) + o : n === "right" ? m = p + h - Math.max(d, g) - o : m = this.caretX, i === "top" ? (w = f, k = w - o, v = m - o, _ = m + o) : (w = f + b, k = w + o, v = m + o, _ = m - o), S = w), {
      x1: v,
      x2: m,
      x3: _,
      y1: w,
      y2: k,
      y3: S
    };
  }
  drawTitle(t, s, a) {
    const n = this.title, i = n.length;
    let o, r, l;
    if (i) {
      const d = Me(a.rtl, this.x, this.width);
      for (t.x = ds(this, a.titleAlign, a), s.textAlign = d.textAlign(a.titleAlign), s.textBaseline = "middle", o = Dt(a.titleFont), r = a.titleSpacing, s.fillStyle = a.titleColor, s.font = o.string, l = 0; l < i; ++l)
        s.fillText(n[l], d.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + r, l + 1 === i && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, a, n, i) {
    const o = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: d } = i, u = Dt(i.bodyFont), g = ds(this, "left", i), p = n.x(g), f = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, h = s.y + f;
    if (i.usePointStyle) {
      const b = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, v = n.leftForLtr(p, d) + d / 2, m = h + l / 2;
      t.strokeStyle = i.multiKeyBackground, t.fillStyle = i.multiKeyBackground, Zs(t, b, v, m), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Zs(t, b, v, m);
    } else {
      t.lineWidth = nt(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const b = n.leftForLtr(p, d), v = n.leftForLtr(n.xPlus(p, 1), d - 2), m = Se(o.borderRadius);
      Object.values(m).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = i.multiKeyBackground, ms(t, {
        x: b,
        y: h,
        w: d,
        h: l,
        radius: m
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), ms(t, {
        x: v,
        y: h + 1,
        w: d - 2,
        h: l - 2,
        radius: m
      }), t.fill()) : (t.fillStyle = i.multiKeyBackground, t.fillRect(b, h, d, l), t.strokeRect(b, h, d, l), t.fillStyle = o.backgroundColor, t.fillRect(v, h + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, s, a) {
    const { body: n } = this, { bodySpacing: i, bodyAlign: o, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = a, g = Dt(a.bodyFont);
    let p = g.lineHeight, f = 0;
    const h = Me(a.rtl, this.x, this.width), b = function(F) {
      s.fillText(F, h.x(t.x + f), t.y + p / 2), t.y += p + i;
    }, v = h.textAlign(o);
    let m, _, w, k, S, $, A;
    for (s.textAlign = o, s.textBaseline = "middle", s.font = g.string, t.x = ds(this, v, a), s.fillStyle = a.bodyColor, ht(this.beforeBody, b), f = r && v !== "right" ? o === "center" ? d / 2 + u : d + 2 + u : 0, k = 0, $ = n.length; k < $; ++k) {
      for (m = n[k], _ = this.labelTextColors[k], s.fillStyle = _, ht(m.before, b), w = m.lines, r && w.length && (this._drawColorBox(s, t, k, h, a), p = Math.max(g.lineHeight, l)), S = 0, A = w.length; S < A; ++S)
        b(w[S]), p = g.lineHeight;
      ht(m.after, b);
    }
    f = 0, p = g.lineHeight, ht(this.afterBody, b), t.y -= i;
  }
  drawFooter(t, s, a) {
    const n = this.footer, i = n.length;
    let o, r;
    if (i) {
      const l = Me(a.rtl, this.x, this.width);
      for (t.x = ds(this, a.footerAlign, a), t.y += a.footerMarginTop, s.textAlign = l.textAlign(a.footerAlign), s.textBaseline = "middle", o = Dt(a.footerFont), s.fillStyle = a.footerColor, s.font = o.string, r = 0; r < i; ++r)
        s.fillText(n[r], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, s, a, n) {
    const { xAlign: i, yAlign: o } = this, { x: r, y: l } = t, { width: d, height: u } = a, { topLeft: g, topRight: p, bottomLeft: f, bottomRight: h } = Se(n.cornerRadius);
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, s.lineWidth = n.borderWidth, s.beginPath(), s.moveTo(r + g, l), o === "top" && this.drawCaret(t, s, a, n), s.lineTo(r + d - p, l), s.quadraticCurveTo(r + d, l, r + d, l + p), o === "center" && i === "right" && this.drawCaret(t, s, a, n), s.lineTo(r + d, l + u - h), s.quadraticCurveTo(r + d, l + u, r + d - h, l + u), o === "bottom" && this.drawCaret(t, s, a, n), s.lineTo(r + f, l + u), s.quadraticCurveTo(r, l + u, r, l + u - f), o === "center" && i === "left" && this.drawCaret(t, s, a, n), s.lineTo(r, l + g), s.quadraticCurveTo(r, l, r + g, l), s.closePath(), s.fill(), n.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, a = this.$animations, n = a && a.x, i = a && a.y;
    if (n || i) {
      const o = Ie[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const r = this._size = Tn(this, t), l = Object.assign({}, o, this._size), d = Bn(s, t, l), u = Fn(t, l, d, s);
      (n._to !== u.x || i._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, u));
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
    }, i = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const o = It(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(i, t, n, s), yi(t, s.textDirection), i.y += o.top, this.drawTitle(i, t, s), this.drawBody(i, t, s), this.drawFooter(i, t, s), xi(t, s.textDirection), t.restore());
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
    }), i = !ps(a, n), o = this._positionChanged(n, s);
    (i || o) && (this._active = n, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, a = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, i = this._active || [], o = this._getActiveElements(t, i, s, a), r = this._positionChanged(o, t), l = s || !ps(o, i) || r;
    return l && (this._active = o, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, a, n) {
    const i = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, i.mode, i, a);
    return i.reverse && o.reverse(), o;
  }
  _positionChanged(t, s) {
    const { caretX: a, caretY: n, options: i } = this, o = Ie[i.position].call(this, t, s);
    return o !== !1 && (a !== o.x || n !== o.y);
  }
}
var ma = {
  id: "tooltip",
  _element: En,
  positioners: Ie,
  afterInit(e, t, s) {
    s && (e.tooltip = new En({
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
const Ud = (e, t, s, a) => (typeof t == "string" ? (s = e.push(t) - 1, a.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function Kd(e, t, s, a) {
  const n = e.indexOf(t);
  if (n === -1)
    return Ud(e, t, s, a);
  const i = e.lastIndexOf(t);
  return n !== i ? s : n;
}
const Xd = (e, t) => e === null ? null : Ct(Math.round(e), 0, t);
function Rn(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ui extends De {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Rn
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const a = this.getLabels();
      for (const { index: n, label: i } of s)
        a[n] === i && a.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (dt(t))
      return null;
    const a = this.getLabels();
    return s = isFinite(s) && a[s] === t ? s : Kd(a, t, et(s, t), this._addedLabels), Xd(s, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: a, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), s || (n = this.getLabels().length - 1)), this.min = a, this.max = n;
  }
  buildTicks() {
    const t = this.min, s = this.max, a = this.options.offset, n = [];
    let i = this.getLabels();
    i = t === 0 && s === i.length - 1 ? i : i.slice(t, s + 1), this._valueRange = Math.max(i.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let o = t; o <= s; o++)
      n.push({
        value: o
      });
    return n;
  }
  getLabelForValue(t) {
    return Rn.call(this, t);
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
function Gd(e, t) {
  const s = [], { bounds: n, step: i, min: o, max: r, precision: l, count: d, maxTicks: u, maxDigits: g, includeBounds: p } = e, f = i || 1, h = u - 1, { min: b, max: v } = t, m = !dt(o), _ = !dt(r), w = !dt(d), k = (v - b) / (g + 1);
  let S = Ba((v - b) / h / f) * f, $, A, F, R;
  if (S < 1e-14 && !m && !_)
    return [
      {
        value: b
      },
      {
        value: v
      }
    ];
  R = Math.ceil(v / S) - Math.floor(b / S), R > h && (S = Ba(R * S / h / f) * f), dt(l) || ($ = Math.pow(10, l), S = Math.ceil(S * $) / $), n === "ticks" ? (A = Math.floor(b / S) * S, F = Math.ceil(v / S) * S) : (A = b, F = v), m && _ && i && Xo((r - o) / i, S / 1e3) ? (R = Math.round(Math.min((r - o) / S, u)), S = (r - o) / R, A = o, F = r) : w ? (A = m ? o : A, F = _ ? r : F, R = d - 1, S = (F - A) / R) : (R = (F - A) / S, Ne(R, Math.round(R), S / 1e3) ? R = Math.round(R) : R = Math.ceil(R));
  const N = Math.max(Fa(S), Fa(A));
  $ = Math.pow(10, dt(l) ? N : l), A = Math.round(A * $) / $, F = Math.round(F * $) / $;
  let C = 0;
  for (m && (p && A !== o ? (s.push({
    value: o
  }), A < o && C++, Ne(Math.round((A + C * S) * $) / $, o, On(o, k, e)) && C++) : A < o && C++); C < R; ++C) {
    const T = Math.round((A + C * S) * $) / $;
    if (_ && T > r)
      break;
    s.push({
      value: T
    });
  }
  return _ && p && F !== r ? s.length && Ne(s[s.length - 1].value, r, On(r, k, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!_ || F === r) && s.push({
    value: F
  }), s;
}
function On(e, t, { horizontal: s, minRotation: a }) {
  const n = Gt(a), i = (s ? Math.sin(n) : Math.cos(n)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / i, o);
}
class Zd extends De {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return dt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: a } = this.getUserBounds();
    let { min: n, max: i } = this;
    const o = (l) => n = s ? n : l, r = (l) => i = a ? i : l;
    if (t) {
      const l = jt(n), d = jt(i);
      l < 0 && d < 0 ? r(0) : l > 0 && d > 0 && o(0);
    }
    if (n === i) {
      let l = i === 0 ? 1 : Math.abs(i * 0.05);
      r(i + l), t || o(n - l);
    }
    this.min = n, this.max = i;
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
    }, i = this._range || this, o = Gd(n, i);
    return t.bounds === "ticks" && Go(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
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
class Ki extends Zd {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: hi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = At(t) ? t : 0, this.max = At(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, a = Gt(this.options.ticks.minRotation), n = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, i = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, i.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const As = {
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
}, Ft = /* @__PURE__ */ Object.keys(As);
function In(e, t) {
  return e - t;
}
function zn(e, t) {
  if (dt(t))
    return null;
  const s = e._adapter, { parser: a, round: n, isoWeekday: i } = e._parseOpts;
  let o = t;
  return typeof a == "function" && (o = a(o)), At(o) || (o = typeof a == "string" ? s.parse(o, a) : s.parse(o)), o === null ? null : (n && (o = n === "week" && (qe(i) || i === !0) ? s.startOf(o, "isoWeek", i) : s.startOf(o, n)), +o);
}
function Nn(e, t, s, a) {
  const n = Ft.length;
  for (let i = Ft.indexOf(e); i < n - 1; ++i) {
    const o = As[Ft[i]], r = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((s - t) / (r * o.size)) <= a)
      return Ft[i];
  }
  return Ft[n - 1];
}
function Qd(e, t, s, a, n) {
  for (let i = Ft.length - 1; i >= Ft.indexOf(s); i--) {
    const o = Ft[i];
    if (As[o].common && e._adapter.diff(n, a, o) >= t - 1)
      return o;
  }
  return Ft[s ? Ft.indexOf(s) : 0];
}
function Jd(e) {
  for (let t = Ft.indexOf(e) + 1, s = Ft.length; t < s; ++t)
    if (As[Ft[t]].common)
      return Ft[t];
}
function Wn(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: a, hi: n } = oa(s, t), i = s[a] >= t ? s[a] : s[n];
    e[i] = !0;
  }
}
function tu(e, t, s, a) {
  const n = e._adapter, i = +n.startOf(t[0].value, a), o = t[t.length - 1].value;
  let r, l;
  for (r = i; r <= o; r = +n.add(r, 1, a))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Hn(e, t, s) {
  const a = [], n = {}, i = t.length;
  let o, r;
  for (o = 0; o < i; ++o)
    r = t[o], n[r] = o, a.push({
      value: r,
      major: !1
    });
  return i === 0 || !s ? a : tu(e, a, n, s);
}
class Vn extends De {
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
    const a = t.time || (t.time = {}), n = this._adapter = new Rl._date(t.adapters.date);
    n.init(s), ze(a.displayFormats, n.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : zn(this, t);
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
    let { min: n, max: i, minDefined: o, maxDefined: r } = this.getUserBounds();
    function l(d) {
      !o && !isNaN(d.min) && (n = Math.min(n, d.min)), !r && !isNaN(d.max) && (i = Math.max(i, d.max));
    }
    (!o || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = At(n) && !isNaN(n) ? n : +s.startOf(Date.now(), a), i = At(i) && !isNaN(i) ? i : +s.endOf(Date.now(), a) + 1, this.min = Math.min(n, i - 1), this.max = Math.max(n + 1, i);
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
    const i = this.min, o = this.max, r = er(n, i, o);
    return this._unit = s.unit || (a.autoSkip ? Nn(s.minUnit, this.min, this.max, this._getLabelCapacity(i)) : Qd(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Jd(this._unit), this.initOffsets(n), t.reverse && r.reverse(), Hn(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, a = 0, n, i;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - n : s = (this.getDecimalForValue(t[1]) - n) / 2, i = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = i : a = (i - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    s = Ct(s, 0, o), a = Ct(a, 0, o), this._offsets = {
      start: s,
      end: a,
      factor: 1 / (s + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, a = this.max, n = this.options, i = n.time, o = i.unit || Nn(i.minUnit, s, a, this._getLabelCapacity(s)), r = et(n.ticks.stepSize, 1), l = o === "week" ? i.isoWeekday : !1, d = qe(l) || l === !0, u = {};
    let g = s, p, f;
    if (d && (g = +t.startOf(g, "isoWeek", l)), g = +t.startOf(g, d ? "day" : o), t.diff(a, s, o) > 1e5 * r)
      throw new Error(s + " and " + a + " are too far apart with stepSize of " + r + " " + o);
    const h = n.ticks.source === "data" && this.getDataTimestamps();
    for (p = g, f = 0; p < a; p = +t.add(p, r, o), f++)
      Wn(u, p, h);
    return (p === a || n.bounds === "ticks" || f === 1) && Wn(u, p, h), Object.keys(u).sort(In).map((b) => +b);
  }
  getLabelForValue(t) {
    const s = this._adapter, a = this.options.time;
    return a.tooltipFormat ? s.format(t, a.tooltipFormat) : s.format(t, a.displayFormats.datetime);
  }
  format(t, s) {
    const n = this.options.time.displayFormats, i = this._unit, o = s || n[i];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, s, a, n) {
    const i = this.options, o = i.ticks.callback;
    if (o)
      return bt(o, [
        t,
        s,
        a
      ], this);
    const r = i.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], g = d && r[d], p = a[s], f = d && g && p && p.major;
    return this._adapter.format(t, n || (f ? g : u));
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
    const s = this.options.ticks, a = this.ctx.measureText(t).width, n = Gt(this.isHorizontal() ? s.maxRotation : s.minRotation), i = Math.cos(n), o = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * i + r * o,
      h: a * o + r * i
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, a = s.displayFormats, n = a[s.unit] || a.millisecond, i = this._tickFormatFunction(t, 0, Hn(this, [
      t
    ], this._majorUnit), n), o = this._getLabelSize(i), r = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
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
      t.push(zn(this, n[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return ci(t.sort(In));
  }
}
function us(e, t, s) {
  let a = 0, n = e.length - 1, i, o, r, l;
  s ? (t >= e[a].pos && t <= e[n].pos && ({ lo: a, hi: n } = pe(e, "pos", t)), { pos: i, time: r } = e[a], { pos: o, time: l } = e[n]) : (t >= e[a].time && t <= e[n].time && ({ lo: a, hi: n } = pe(e, "time", t)), { time: i, pos: r } = e[a], { time: o, pos: l } = e[n]);
  const d = o - i;
  return d ? r + (l - r) * (t - i) / d : r;
}
class $w extends Vn {
  static id = "timeseries";
  static defaults = Vn.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = us(s, this.min), this._tableRange = us(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: a } = this, n = [], i = [];
    let o, r, l, d, u;
    for (o = 0, r = t.length; o < r; ++o)
      d = t[o], d >= s && d <= a && n.push(d);
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
    for (o = 0, r = n.length; o < r; ++o)
      u = n[o + 1], l = n[o - 1], d = n[o], Math.round((u + l) / 2) !== d && i.push({
        time: d,
        pos: o / (r - 1)
      });
    return i;
  }
  _generate() {
    const t = this.min, s = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(s) || a.length === 1) && a.push(s), a.sort((n, i) => n - i);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return s.length && a.length ? t = this.normalize(s.concat(a)) : t = s.length ? s : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (us(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return us(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Xi = {
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
}, eu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, su = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Xi,
  ...eu
}, au = no[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ke(e) {
  return Qn(e) ? Us(e) : e;
}
function nu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Qn(t) ? new Proxy(e, {}) : e;
}
function iu(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Gi(e, t) {
  e.labels = t;
}
function Zi(e, t, s) {
  const a = [];
  e.datasets = t.map((n) => {
    const i = e.datasets.find((o) => o[s] === n[s]);
    return !i || !n.data || a.includes(i) ? {
      ...n
    } : (a.push(i), Object.assign(i, n), i);
  });
}
function ou(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Gi(s, e.labels), Zi(s, e.datasets, t), s;
}
const ru = st({
  props: su,
  setup(e, t) {
    let { expose: s, slots: a } = t;
    const n = pt(null), i = Gn(null);
    s({
      chart: i
    });
    const o = () => {
      if (!n.value) return;
      const { type: d, data: u, options: g, plugins: p, datasetIdKey: f } = e, h = ou(u, f), b = nu(h, u);
      i.value = new Ae(n.value, {
        type: d,
        data: b,
        options: {
          ...g
        },
        plugins: p
      });
    }, r = () => {
      const d = Us(i.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), i.value = null;
      }, e.destroyDelay) : (d.destroy(), i.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return Ze(o), Zn(r), zt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [g, p] = d, [f, h] = u;
      const b = Us(i.value);
      if (!b)
        return;
      let v = !1;
      if (g) {
        const m = ke(g), _ = ke(f);
        m && m !== _ && (iu(b, m), v = !0);
      }
      if (p) {
        const m = ke(p.labels), _ = ke(h.labels), w = ke(p.datasets), k = ke(h.datasets);
        m !== _ && (Gi(b.config.data, m), v = !0), w && w !== k && (Zi(b.config.data, w, e.datasetIdKey), v = !0);
      }
      v && Xt(() => {
        l(b);
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
  return Ae.register(t), st({
    props: Xi,
    setup(s, a) {
      let { expose: n } = a;
      const i = Gn(null), o = (r) => {
        i.value = r?.chart;
      };
      return n({
        chart: i
      }), () => qs(ru, au({
        ref: o
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const lu = /* @__PURE__ */ _a("bar", Bl), cu = /* @__PURE__ */ _a("line", Pl), du = /* @__PURE__ */ _a("pie", El), jn = {
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
}, Yn = {
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
}, uu = [
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
function rt(e) {
  const t = pt("light");
  let s = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = D(() => e?.value ? e.value : t.value), i = D(() => n.value === "dark"), o = D(() => i.value ? Yn : jn), r = () => {
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
  return Ze(() => {
    r();
  }), Zn(() => {
    l();
  }), e && zt(e, () => {
  }), {
    isDark: i,
    currentTheme: n,
    colors: o,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: jn,
    darkColors: Yn,
    chartSeriesColors: uu
  };
}
const hu = { class: "chart-container" }, fu = /* @__PURE__ */ st({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ae.register(
      Ui,
      Ki,
      fd,
      Yi,
      ma,
      va
    );
    const { isDark: a, colors: n } = rt(ot(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
            return l.data.datasets.map((u, g) => ({
              text: o(u.label || ""),
              fillStyle: Array.isArray(u.backgroundColor) ? u.backgroundColor[0] : u.backgroundColor,
              strokeStyle: Array.isArray(u.borderColor) ? u.borderColor[0] : u.borderColor,
              lineWidth: u.borderWidth,
              hidden: !l.isDatasetVisible(g),
              index: g,
              datasetIndex: g
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(o(l.dataset.label || ""));
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
              return o(l);
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
              return o(d);
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
    return t({ isDark: a }), (l, d) => (y(), x("div", hu, [
      Q(B(lu), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), tt = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of t)
    s[a] = n;
  return s;
}, re = /* @__PURE__ */ tt(fu, [["__scopeId", "data-v-105d8c6f"]]), gu = { class: "chart-container" }, pu = /* @__PURE__ */ st({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ae.register(
      Ui,
      Ki,
      rd,
      Cs,
      Yi,
      ma,
      va,
      Ld
    );
    const { isDark: a, colors: n } = rt(ot(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
              return l.data.datasets.map((u, g) => ({
                text: o(u.label || ""),
                fillStyle: u.backgroundColor,
                strokeStyle: u.borderColor,
                lineWidth: u.borderWidth,
                hidden: !l.isDatasetVisible(g),
                index: g,
                datasetIndex: g
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(o(l.dataset.label || ""));
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
              return o(l);
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
              return o(d);
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
    return t({ isDark: a }), (l, d) => (y(), x("div", gu, [
      Q(B(cu), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), le = /* @__PURE__ */ tt(pu, [["__scopeId", "data-v-bacd3848"]]), bu = { class: "chart-container" }, vu = /* @__PURE__ */ st({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ae.register(Zc, ma, va);
    const { isDark: a, colors: n } = rt(ot(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
              return d.labels.length && d.datasets.length ? d.labels.map((u, g) => {
                const p = l.getDatasetMeta(0), f = d.datasets[0], h = f.data[g], b = Array.isArray(f.backgroundColor) ? f.backgroundColor[g] : f.backgroundColor;
                return {
                  text: `${o(u)}: ${h}`,
                  fillStyle: b,
                  hidden: p.data[g]?.hidden || !1,
                  index: g
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              const d = l.label || "", u = l.parsed || 0, g = l.dataset.data.reduce((f, h) => f + h, 0), p = (u / g * 100).toFixed(1);
              return `${o(d)}: ${u} (${p}%)`;
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
    return t({ isDark: a }), (l, d) => (y(), x("div", bu, [
      Q(B(du), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ts = /* @__PURE__ */ tt(vu, [["__scopeId", "data-v-23a84317"]]), mu = { class: "chart-container" }, _u = ["viewBox"], yu = ["transform"], xu = ["x", "width", "fill", "stroke"], ku = ["fill"], wu = ["x1", "y1", "x2", "y2", "stroke"], Su = ["points", "fill"], Mu = ["x1", "y1", "x2", "y2", "stroke"], $u = ["x", "y", "fill"], Cu = ["x1", "y1", "x2", "y2", "stroke"], Du = ["points", "fill"], Au = ["transform"], Tu = ["y1", "y2"], Bu = ["y1", "y2"], Fu = ["y1", "y2"], Lu = ["y1", "y2"], Pu = ["y", "height"], Eu = ["y1", "y2"], Ru = ["y1", "y2"], Ou = ["y1", "y2"], Iu = ["y1", "y2"], zu = ["y", "height"], Nu = ["cy", "stroke", "onMouseenter"], Wu = ["cy", "stroke", "onMouseenter"], Hu = ["cy", "stroke", "onMouseenter"], Vu = ["cy", "stroke", "onMouseenter"], ju = ["y1", "y2", "onMouseenter"], Yu = ["y1", "y2", "onMouseenter"], qu = ["x", "y", "fill"], Uu = ["x", "y", "fill"], Ku = ["transform"], Xu = { transform: "translate(-200, 0)" }, Gu = ["stroke"], Zu = ["fill"], Qu = { transform: "translate(-130, 0)" }, Ju = ["stroke"], th = ["fill"], eh = { transform: "translate(-60, 0)" }, sh = ["stroke"], ah = ["fill"], nh = { transform: "translate(10, 0)" }, ih = ["stroke"], oh = ["fill"], rh = { transform: "translate(80, 0)" }, lh = ["fill"], ch = { transform: "translate(150, 0)" }, dh = ["fill"], uh = /* @__PURE__ */ st({
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
    const s = e, { isDark: a } = rt(ot(s, "theme")), n = D(() => ({
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
    })), i = pt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), o = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, f) => {
      const h = p.currentTarget.closest("svg");
      if (!h) return;
      const b = h.getBoundingClientRect(), v = h.createSVGPoint();
      v.x = p.clientX - b.left, v.y = p.clientY - b.top, i.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: f
      };
    }, l = (p) => {
      if (i.value.visible) {
        const f = p.currentTarget, h = f.getBoundingClientRect(), b = f.createSVGPoint();
        b.x = p.clientX - h.left, b.y = p.clientY - h.top, i.value.x = b.x, i.value.y = b.y - 20;
      }
    }, d = () => {
      i.value.visible = !1;
    }, u = () => {
      i.value.visible = !1;
    }, g = D(() => {
      const p = [], h = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, m = (v - 1) / 9, _ = s.chartMargin + h - m * h;
        p.push({ value: v, y: _ });
      }
      return p;
    });
    return t({ isDark: a }), (p, f) => (y(), x("div", mu, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: wt(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        i.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          c("rect", {
            x: -(i.value.text.length * 6 + 10),
            y: -16,
            width: i.value.text.length * 12 + 20,
            height: "24",
            fill: n.value.tooltipBg,
            rx: "6",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, xu),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, M(i.value.text), 9, ku)
        ], 8, yu)) : W("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, wu),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Su),
        (y(!0), x(q, null, Z(g.value, (h, b) => (y(), x(q, { key: b }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Mu),
          c("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(h.value), 9, $u)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Cu),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Du),
        (y(!0), x(q, null, Z(e.boxplotData, (h, b) => (y(), x(q, { key: b }, [
          c("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            h.isTotal ? (y(), x(q, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Tu),
              c("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Bu),
              c("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Fu),
              c("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Lu),
              c("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Pu)
            ], 64)) : (y(), x(q, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Eu),
              c("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ru),
              c("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ou),
              c("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Iu),
              c("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, zu)
            ], 64)),
            c("circle", {
              cx: 0,
              cy: h.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Min: ${h.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Nu),
            c("circle", {
              cx: 0,
              cy: h.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q1: ${h.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Wu),
            c("circle", {
              cx: 0,
              cy: h.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q3: ${h.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Hu),
            c("circle", {
              cx: 0,
              cy: h.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Max: ${h.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Vu),
            c("line", {
              x1: -24,
              y1: h.medianY,
              x2: 24,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => r(v, `Median: ${h.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ju),
            h.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: h.averageY,
              x2: 24,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => r(v, `Avg: ${h.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Yu)) : W("", !0)
          ], 8, Au),
          c("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(o(h.label)), 9, qu),
          h.responseCount ? (y(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(h.responseCount), 9, Uu)) : W("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Xu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Gu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Zu)
          ]),
          c("g", Qu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ju),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, th)
          ]),
          c("g", eh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, sh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, ah)
          ]),
          c("g", nh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, ih),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, oh)
          ]),
          c("g", rh, [
            f[0] || (f[0] = c("line", {
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
            }, " Avg ", 8, lh)
          ]),
          c("g", ch, [
            f[1] || (f[1] = c("line", {
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
            }, " Median ", 8, dh)
          ])
        ], 8, Ku)) : W("", !0)
      ], 44, _u))
    ]));
  }
}), hh = /* @__PURE__ */ tt(uh, [["__scopeId", "data-v-520c623f"]]), fh = { class: "chart-container" }, gh = ["viewBox"], ph = ["transform"], bh = ["x", "y", "width", "height", "fill", "stroke"], vh = ["y", "fill"], mh = ["y", "fill"], _h = ["x1", "y1", "x2", "y2", "stroke"], yh = ["points", "fill"], xh = ["x1", "y1", "x2", "y2", "stroke"], kh = ["x1", "y1", "x2", "y2", "stroke"], wh = ["x", "y", "fill"], Sh = ["x", "y", "fill", "transform"], Mh = ["x1", "y1", "x2", "y2", "stroke"], $h = ["points", "fill"], Ch = ["transform"], Dh = ["y1", "y2", "stroke", "onMouseenter"], Ah = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Th = ["x1", "y1", "x2", "y2", "onMouseenter"], Bh = ["x1", "y1", "x2", "y2", "onMouseenter"], Fh = ["cy", "stroke", "onMouseenter"], Lh = ["cy", "stroke", "onMouseenter"], Ph = ["x", "y", "fill"], Eh = ["x", "y", "fill"], Rh = ["transform"], Oh = { transform: "translate(-180, 0)" }, Ih = ["stroke"], zh = ["fill"], Nh = { transform: "translate(-120, 0)" }, Wh = ["fill"], Hh = { transform: "translate(-60, 0)" }, Vh = ["fill"], jh = { transform: "translate(0, 0)" }, Yh = ["stroke"], qh = ["fill"], Uh = { transform: "translate(60, 0)" }, Kh = ["fill"], Xh = { transform: "translate(130, 0)" }, Gh = ["fill"], Zh = /* @__PURE__ */ st({
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
    const s = e, { isDark: a } = rt(ot(s, "theme")), n = D(() => ({
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
    })), i = pt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, f, h) => {
      const b = p.currentTarget.closest("svg");
      if (!b) return;
      const v = b.getBoundingClientRect(), m = b.createSVGPoint();
      m.x = p.clientX - v.left, m.y = p.clientY - v.top;
      let _ = o(f.label), w = "";
      switch (h) {
        case "body":
          w = `Q1: ${f.q1.toFixed(1)} | Q3: ${f.q3.toFixed(1)}`;
          break;
        case "wick":
          w = `Min: ${f.low.toFixed(1)} | Max: ${f.high.toFixed(1)}`;
          break;
        case "median":
          w = `Median: ${f.median.toFixed(1)}`;
          break;
        case "average":
          w = `Average: ${f.average?.toFixed(1)}`;
          break;
        case "min":
          w = `Min: ${f.low.toFixed(1)}`;
          break;
        case "max":
          w = `Max: ${f.high.toFixed(1)}`;
          break;
      }
      const k = Math.max(180, w.length * 7 + 40), S = 48;
      i.value = {
        visible: !0,
        x: m.x,
        y: m.y - 20,
        title: _,
        text: w,
        width: k,
        height: S
      };
    }, l = (p) => {
      if (i.value.visible) {
        const f = p.currentTarget, h = f.getBoundingClientRect(), b = f.createSVGPoint();
        b.x = p.clientX - h.left, b.y = p.clientY - h.top, i.value.x = b.x, i.value.y = b.y - 20;
      }
    }, d = () => {
      i.value.visible = !1;
    }, u = () => {
      i.value.visible = !1;
    }, g = D(() => {
      const p = [], h = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, m = (v - 1) / 9, _ = s.chartMargin + h - m * h;
        p.push({ value: v, y: _ });
      }
      return p;
    });
    return t({ isDark: a }), (p, f) => (y(), x("div", fh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: wt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        i.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          c("rect", {
            x: -i.value.width / 2,
            y: -i.value.height - 10,
            width: i.value.width,
            height: i.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, bh),
          c("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(i.value.title), 9, vh),
          c("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(i.value.text), 9, mh)
        ], 8, ph)) : W("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, _h),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, yh),
        (y(!0), x(q, null, Z(g.value, (h, b) => (y(), x("line", {
          key: `grid-${b}`,
          x1: e.chartMargin,
          y1: h.y,
          x2: e.chartWidth - e.chartMargin,
          y2: h.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, xh))), 128)),
        (y(!0), x(q, null, Z(g.value, (h, b) => (y(), x(q, { key: b }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, kh),
          c("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(h.value), 9, wh)
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
        }, M(o(e.yAxisLabel)), 9, Sh),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Mh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, $h),
        (y(!0), x(q, null, Z(e.candlestickData, (h, b) => (y(), x(q, { key: b }, [
          c("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            c("line", {
              x1: 0,
              y1: h.highY,
              x2: 0,
              y2: h.lowY,
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (v) => r(v, h, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            c("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(h.q1Y, h.q3Y) - (Math.abs(h.q3Y - h.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(h.q3Y - h.q1Y)),
              fill: h.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (v) => r(v, h, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            h.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: h.medianY,
              x2: e.candleWidth / 2,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (v) => r(v, h, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Th)) : W("", !0),
            h.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: h.averageY,
              x2: e.candleWidth / 2,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => r(v, h, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Bh)) : W("", !0),
            c("circle", {
              cx: 0,
              cy: h.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, h, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Fh),
            c("circle", {
              cx: 0,
              cy: h.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, h, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Lh)
          ], 8, Ch),
          c("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(o(h.label)), 9, Ph),
          h.responseCount ? (y(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(h.responseCount), 9, Eh)) : W("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Oh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ih),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, zh)
          ]),
          c("g", Nh, [
            f[0] || (f[0] = c("rect", {
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
            }, " Q1 ", 8, Wh)
          ]),
          c("g", Hh, [
            f[1] || (f[1] = c("rect", {
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
            }, " Q3 ", 8, Vh)
          ]),
          c("g", jh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Yh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, qh)
          ]),
          c("g", Uh, [
            f[2] || (f[2] = c("line", {
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
            }, " Avg ", 8, Kh)
          ]),
          c("g", Xh, [
            f[3] || (f[3] = c("line", {
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
            }, " Median ", 8, Gh)
          ])
        ], 8, Rh)) : W("", !0)
      ], 44, gh))
    ]));
  }
}), Qi = /* @__PURE__ */ tt(Zh, [["__scopeId", "data-v-61d0259c"]]), Qh = { class: "chart-container" }, Jh = ["viewBox"], tf = ["transform"], ef = ["x", "y", "width", "height", "fill", "stroke"], sf = ["y", "fill"], af = ["y", "fill"], nf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x1", "y1", "x2", "y2", "stroke"], rf = ["points", "fill"], lf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["x", "y", "fill"], df = ["x", "y", "fill", "transform"], uf = ["x1", "y1", "x2", "y2", "stroke"], hf = ["points", "fill"], ff = ["x1", "y1", "x2", "y2", "stroke"], gf = ["x", "y", "fill"], pf = ["x", "y", "fill"], bf = ["d"], vf = ["x", "y", "width", "height", "onMouseenter"], mf = ["x1", "y1", "x2", "y2"], _f = ["x", "y"], yf = ["x1", "y1", "x2", "y2"], xf = ["x", "y"], kf = ["x1", "y1", "x2", "y2"], wf = ["x", "y"], Sf = ["x1", "y1", "x2", "y2"], Mf = ["x", "y"], $f = ["x1", "y1", "x2", "y2"], Cf = ["x", "y"], Df = ["x1", "y1", "x2", "y2"], Af = ["x", "y"], Tf = ["transform"], Bf = { transform: "translate(-220, 0)" }, Ff = ["fill"], Lf = { transform: "translate(-140, 0)" }, Pf = ["fill"], Ef = { transform: "translate(-80, 0)" }, Rf = ["fill"], Of = { transform: "translate(-20, 0)" }, If = ["fill"], zf = { transform: "translate(60, 0)" }, Nf = ["fill"], Wf = { transform: "translate(130, 0)" }, Hf = ["fill"], Vf = { transform: "translate(180, 0)" }, jf = ["fill"], Yf = /* @__PURE__ */ st({
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
    const s = e, { isDark: a } = rt(ot(s, "theme")), n = D(() => ({
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
    })), i = pt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = D(() => s.chartWidth - s.chartMargin * 2), r = D(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = D(() => o.value / 10 * 0.6), d = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const V = Math.max(...s.histogram.map((O) => O.count || 0), 1), z = Math.max(1, Math.ceil(V * 0.2));
      return V + z;
    }), u = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const V = s.averageScore || 0;
      let z = 0, O = 0;
      if (s.histogram.forEach((it) => {
        const at = it.count || 0;
        z += at;
        const ut = it.score - V;
        O += at * (ut * ut);
      }), z === 0) return 1;
      const J = O / z;
      return Math.sqrt(J) || 1;
    }), g = (V, z, O) => {
      if (O === 0) return 0;
      const J = 1 / (O * Math.sqrt(2 * Math.PI)), it = -0.5 * Math.pow((V - z) / O, 2);
      return J * Math.exp(it);
    }, p = D(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && u.value === 0) return null;
      const V = s.averageScore, z = u.value, O = 100, it = Math.max(...s.histogram.map((ct) => ct.count || 0), 1) / d.value * r.value;
      if (it <= 0) return null;
      let at = 0;
      for (let ct = 0; ct <= O; ct++) {
        const G = 1 + 9 * (ct / O), Mt = g(G, V, z);
        Mt > at && (at = Mt);
      }
      if (at <= 0) return null;
      const ut = it / at, mt = [];
      for (let ct = 0; ct <= O; ct++) {
        const G = 1 + 9 * (ct / O), Mt = g(G, V, z) * ut, ee = h(G);
        if (ee !== null) {
          const E = s.chartHeight - s.chartBottomMargin - Mt;
          mt.push(`${ct === 0 ? "M" : "L"} ${ee} ${E}`);
        }
      }
      return mt.join(" ");
    }), f = D(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const V = o.value / 10;
      return s.histogram.map((z, O) => {
        const J = s.chartMargin + (O + 0.5) * V, it = z.count > 0 ? z.count / d.value * r.value : 0, at = s.chartHeight - s.chartBottomMargin - it;
        return {
          score: z.score,
          count: z.count,
          x: J,
          y: at,
          height: it
        };
      });
    }), h = (V) => {
      if (V < 1 || V > 10) return null;
      const z = o.value / 10;
      return s.chartMargin + (V - 0.5) * z;
    }, b = D(() => h(s.minScore)), v = D(() => h(s.maxScore)), m = D(() => h(s.q1Score)), _ = D(() => h(s.medianScore)), w = D(() => h(s.q3Score)), k = D(() => h(s.averageScore)), S = D(() => s.minScore), $ = D(() => s.maxScore), A = D(() => s.q1Score), F = D(() => s.medianScore), R = D(() => s.q3Score), N = D(() => s.averageScore), C = D(() => {
      const V = [], z = s.chartMargin - 8, O = 18;
      m.value !== null && V.push({
        x: m.value,
        y: z,
        value: s.q1Score,
        label: `Q1: ${A.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), _.value !== null && V.push({
        x: _.value,
        y: z - O,
        value: s.medianScore,
        label: `Median: ${F.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), k.value !== null && V.push({
        x: k.value,
        y: z - O,
        value: s.averageScore,
        label: `Avg: ${N.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), w.value !== null && V.push({
        x: w.value,
        y: z,
        value: s.q3Score,
        label: `Q3: ${R.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), V.sort((at, ut) => (at.x || 0) - (ut.x || 0));
      const J = [[], [], []];
      V.forEach((at) => {
        if (at.x === null) return;
        let ut = -1;
        for (let mt = 0; mt < J.length; mt++) {
          let ct = !1;
          for (const G of J[mt]) {
            if (G.x === null) continue;
            const Mt = Math.abs(at.x - G.x), ee = (at.width + G.width) / 2 + 10;
            if (Mt < ee) {
              ct = !0;
              break;
            }
          }
          if (!ct) {
            ut = mt;
            break;
          }
        }
        ut === -1 && (ut = J.length - 1), at.y = z - ut * O, J[ut].push(at);
      });
      const it = 15;
      return V.forEach((at) => {
        at.y < it && (at.y = it);
      }), V;
    }), T = (V) => C.value.find((O) => O.id === V)?.y || s.chartMargin - 10, P = D(() => {
      const V = [];
      for (let O = 0; O <= 5; O++) {
        const J = Math.round(d.value / 5 * O), it = s.chartHeight - s.chartBottomMargin - O / 5 * r.value;
        V.push({ value: J, y: it });
      }
      return V;
    }), L = (V, z) => {
      const O = V.currentTarget.closest("svg");
      if (!O) return;
      const J = O.getBoundingClientRect(), it = O.createSVGPoint();
      it.x = V.clientX - J.left, it.y = V.clientY - J.top;
      const at = `Score: ${z.score}`, ut = `Count: ${z.count}`, mt = 120, ct = 48;
      i.value = {
        visible: !0,
        x: it.x,
        y: it.y - 20,
        title: at,
        text: ut,
        width: mt,
        height: ct
      };
    }, I = (V) => {
      if (i.value.visible) {
        const z = V.currentTarget, O = z.getBoundingClientRect(), J = z.createSVGPoint();
        J.x = V.clientX - O.left, J.y = V.clientY - O.top, i.value.x = J.x, i.value.y = J.y - 20;
      }
    }, j = () => {
      i.value.visible = !1;
    }, K = () => {
      i.value.visible = !1;
    };
    return t({ isDark: a }), (V, z) => (y(), x("div", Qh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: wt(`min-height: ${e.chartHeight}px;`),
        onMousemove: I,
        onMouseleave: j
      }, [
        i.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          c("rect", {
            x: -i.value.width / 2,
            y: -i.value.height - 10,
            width: i.value.width,
            height: i.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, ef),
          c("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(i.value.title), 9, sf),
          c("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(i.value.text), 9, af)
        ], 8, tf)) : W("", !0),
        (y(!0), x(q, null, Z(P.value, (O, J) => (y(), x("line", {
          key: `grid-${J}`,
          x1: e.chartMargin,
          y1: O.y,
          x2: e.chartWidth - e.chartMargin,
          y2: O.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, nf))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, of),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, rf),
        (y(!0), x(q, null, Z(P.value, (O, J) => (y(), x(q, {
          key: `y-tick-${J}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: O.y,
            x2: e.chartMargin,
            y2: O.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lf),
          c("text", {
            x: e.chartMargin - 12,
            y: O.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(O.value), 9, cf)
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
        }, " Count ", 8, df),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, uf),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, hf),
        (y(!0), x(q, null, Z(f.value, (O, J) => (y(), x(q, {
          key: `tick-${J}`
        }, [
          c("line", {
            x1: O.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: O.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ff),
          c("text", {
            x: O.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(O.score), 9, gf)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, pf),
        p.value ? (y(), x("path", {
          key: 1,
          d: p.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, bf)) : W("", !0),
        (y(!0), x(q, null, Z(f.value, (O, J) => (y(), x("rect", {
          key: `bar-${J}`,
          x: O.x - l.value / 2,
          y: O.y,
          width: l.value,
          height: O.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (it) => L(it, O),
          onMouseleave: K,
          style: { cursor: "pointer" }
        }, null, 40, vf))), 128)),
        b.value ? (y(), x("line", {
          key: 2,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, mf)) : W("", !0),
        b.value ? (y(), x("text", {
          key: 3,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + M(S.value.toFixed(1)), 9, _f)) : W("", !0),
        m.value ? (y(), x("line", {
          key: 4,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, yf)) : W("", !0),
        m.value ? (y(), x("text", {
          key: 5,
          x: m.value,
          y: T("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + M(A.value.toFixed(1)), 9, xf)) : W("", !0),
        _.value ? (y(), x("line", {
          key: 6,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, kf)) : W("", !0),
        _.value ? (y(), x("text", {
          key: 7,
          x: _.value,
          y: T("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + M(F.value.toFixed(1)), 9, wf)) : W("", !0),
        k.value ? (y(), x("line", {
          key: 8,
          x1: k.value,
          y1: e.chartMargin,
          x2: k.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Sf)) : W("", !0),
        k.value ? (y(), x("text", {
          key: 9,
          x: k.value,
          y: T("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + M(N.value.toFixed(1)), 9, Mf)) : W("", !0),
        w.value ? (y(), x("line", {
          key: 10,
          x1: w.value,
          y1: e.chartMargin,
          x2: w.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, $f)) : W("", !0),
        w.value ? (y(), x("text", {
          key: 11,
          x: w.value,
          y: T("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + M(R.value.toFixed(1)), 9, Cf)) : W("", !0),
        v.value ? (y(), x("line", {
          key: 12,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Df)) : W("", !0),
        v.value ? (y(), x("text", {
          key: 13,
          x: v.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + M($.value.toFixed(1)), 9, Af)) : W("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", Bf, [
            z[0] || (z[0] = c("line", {
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
            }, " Gaussian ", 8, Ff)
          ]),
          c("g", Lf, [
            z[1] || (z[1] = c("line", {
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
            }, " Min ", 8, Pf)
          ]),
          c("g", Ef, [
            z[2] || (z[2] = c("line", {
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
            }, " Q1 ", 8, Rf)
          ]),
          c("g", Of, [
            z[3] || (z[3] = c("line", {
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
            }, " Median ", 8, If)
          ]),
          c("g", zf, [
            z[4] || (z[4] = c("line", {
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
            }, " Avg ", 8, Nf)
          ]),
          c("g", Wf, [
            z[5] || (z[5] = c("line", {
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
            }, " Q3 ", 8, Hf)
          ]),
          c("g", Vf, [
            z[6] || (z[6] = c("line", {
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
            }, " Max ", 8, jf)
          ])
        ], 8, Tf)) : W("", !0)
      ], 44, Jh))
    ]));
  }
}), Ji = /* @__PURE__ */ tt(Yf, [["__scopeId", "data-v-64e657d9"]]), qf = { class: "chart-container" }, Uf = {
  key: 1,
  class: "chart-wrapper"
}, Kf = /* @__PURE__ */ st({
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
    wa.use([ho, fo, go, po]);
    const s = e, { isDark: a, colors: n } = rt(ot(s, "theme")), i = pt(null), o = pt(!0), r = pt(!1);
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
    ], g = () => {
      const w = s.data.links.filter(
        (A) => A.source && A.target && typeof A.value == "number"
      ), k = Math.max(...w.map((A) => A.value), 1), S = Math.max(1, k * 0.01), $ = w.map((A) => ({
        ...A,
        originalValue: A.value,
        value: A.value < k * 0.01 ? S : A.value
      }));
      return {
        nodes: s.data.nodes.filter((A) => A.name),
        links: $
      };
    }, p = (w) => w.map((k, S) => ({
      ...k,
      itemStyle: {
        color: s.nodeColors[k.name] || u[S % u.length],
        borderRadius: 8
      }
    })), f = (w) => (k) => {
      const S = k.dataType === "node", $ = n.value.tooltipText, A = a.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const T = w.filter((I) => I.target === k.name), P = w.filter((I) => I.source === k.name), L = T.length > 0 ? T.reduce((I, j) => I + (j.originalValue || j.value), 0) : P.reduce((I, j) => I + (j.originalValue || j.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${k.name}</div><div style="color: ${A}; font-size: 12px;">Count: ${L.toLocaleString()}</div>`;
      }
      const F = k.data?.source || k.source || "Unknown", R = k.data?.target || k.target || "Unknown", N = k.data?.originalValue || k.data?.value || k.value || 0, C = k.data?.label || `${N.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${F} → ${R}</div><div style="color: ${A}; font-size: 12px;">Flow: ${C}</div>`;
    }, h = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: w, links: k } = g(), S = p(w), $ = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: f(k),
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
                data: S,
                links: k,
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
                  formatter: (A) => {
                    const F = A.name || "";
                    return F.length > 15 ? `${F.substring(0, 15)}...` : F;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (A) => {
                    const F = A.data?.originalValue || A.value || 0;
                    return A.data?.label || `${F.toLocaleString()}`;
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
        } catch (w) {
          console.error("Error setting Sankey chart options:", w), r.value = !0;
        }
    }, b = async () => {
      if (i.value)
        try {
          l = wa.init(i.value), h(), window.addEventListener("resize", m);
        } catch (w) {
          console.error("Error initializing Sankey chart:", w), r.value = !0;
        } finally {
          o.value = !1;
        }
    }, v = async (w = 40) => {
      await Xt();
      for (let k = 0; k < w; k++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await b();
        await new Promise((S) => setTimeout(S, 50));
      }
      await b(), setTimeout(m, 50);
    }, m = () => l?.resize(), _ = () => {
      window.removeEventListener("resize", m), l && (l.dispose(), l = null);
    };
    return Ze(() => i.value && v()), Jn(_), zt(() => s.data, h, { deep: !0 }), zt(a, h), t({ isDark: a }), (w, k) => (y(), x("div", qf, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: wt({ height: e.height })
      }, [...k[0] || (k[0] = [
        X('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Uf, [
        we(c("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: wt({ height: e.height })
        }, null, 4), [
          [xa, !o.value]
        ]),
        we(c("div", {
          class: "loading-state",
          style: wt({ height: e.height })
        }, [...k[1] || (k[1] = [
          X('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [xa, o.value]
        ])
      ]))
    ]));
  }
}), ce = /* @__PURE__ */ tt(Kf, [["__scopeId", "data-v-d6d61034"]]);
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
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
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
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Lt(e, t) {
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
function Zf(e, t) {
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
function qn(e, t) {
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
function Qf(e, t) {
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
function Jf(e, t) {
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
function tg(e, t) {
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
function eg(e, t) {
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
const sg = { class: "chart-footer" }, ag = { class: "export-actions" }, ng = { class: "export-buttons" }, ig = ["disabled"], og = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, rg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, lg = ["disabled"], cg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, dg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ug = /* @__PURE__ */ st({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = (o) => s.formats.includes(o), i = (o) => {
      s.loading || a("export", o);
    };
    return (o, r) => (y(), x("footer", sg, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", ag, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", ng, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: Qt(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => i("pdf"))
          }, [
            e.loading ? (y(), x("svg", og, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", rg, [...r[3] || (r[3] = [
              X('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, ig)) : W("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: Qt(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => i("csv"))
          }, [
            e.loading ? (y(), x("svg", cg, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", dg, [...r[6] || (r[6] = [
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
          ], 10, lg)) : W("", !0)
        ])
      ])
    ]));
  }
}), yt = /* @__PURE__ */ tt(ug, [["__scopeId", "data-v-672661d4"]]), hg = { class: "agents-per-day-card" }, fg = {
  key: 0,
  class: "card-body"
}, gg = {
  key: 0,
  class: "chart-section"
}, pg = {
  key: 1,
  class: "empty-state"
}, bg = { class: "empty-state-content" }, vg = { class: "empty-icon-wrapper" }, mg = {
  key: 1,
  class: "loading-state"
}, _g = /* @__PURE__ */ st({
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
    }, n = e, i = s, o = (p) => {
      i("export", p);
    }, { isDark: r, colors: l } = rt(ot(n, "theme")), d = (p) => {
      const f = new Date(p), h = String(f.getDate()).padStart(2, "0"), b = String(f.getMonth() + 1).padStart(2, "0");
      return `${h}-${b}`;
    }, u = D(() => {
      const p = n.data?.agents_by_day || {}, f = Object.keys(p).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const h = f.map((w) => d(w)), b = /* @__PURE__ */ new Set();
      for (const w of Object.values(p))
        for (const k of Object.keys(w))
          b.add(k);
      const v = Array.from(b), m = (w) => w, _ = v.map((w) => ({
        label: w,
        data: f.map((k) => p[k]?.[w] || 0),
        backgroundColor: `${a[w] || "#94a3b8"}80`,
        borderColor: m(a[w] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: h,
        datasets: _
      };
    }), g = D(() => n.options ? n.options : {
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
    return t({ isDark: r }), (p, f) => (y(), x("article", hg, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", mg, [...f[2] || (f[2] = [
        X('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", fg, [
        u.value.labels && u.value.labels.length ? (y(), x("section", gg, [
          Q(re, {
            data: u.value,
            options: g.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", pg, [
          c("div", bg, [
            c("div", vg, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), yg = /* @__PURE__ */ tt(_g, [["__scopeId", "data-v-4d18c22c"]]), H = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), lt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), xg = { class: "booking-manager-card" }, kg = { class: "card-header" }, wg = { class: "header-content" }, Sg = {
  key: 0,
  class: "payment-success-badge"
}, Mg = {
  key: 0,
  class: "currency-breakdown-list"
}, $g = {
  key: 1,
  class: "badge-value"
}, Cg = {
  key: 0,
  class: "loading-state"
}, Dg = {
  key: 1,
  class: "error-state"
}, Ag = { class: "error-content" }, Tg = { class: "error-description" }, Bg = {
  key: 2,
  class: "card-body"
}, Fg = { class: "chart-section" }, Lg = { class: "chart-wrapper" }, Pg = {
  key: 0,
  class: "table-section"
}, Eg = { class: "table-wrapper" }, Rg = { class: "data-table" }, Og = { class: "table-body" }, Ig = { class: "table-cell font-medium" }, zg = { class: "table-cell text-center" }, Ng = { class: "table-cell text-center" }, Wg = { class: "percentage-text" }, Hg = { class: "table-cell text-center" }, Vg = { class: "table-cell" }, jg = { class: "badges-container" }, Yg = { class: "badge badge-success" }, qg = { class: "badge badge-error" }, Ug = { class: "table-cell" }, Kg = {
  key: 0,
  class: "badges-container"
}, Xg = {
  key: 1,
  class: "percentage-text"
}, Gg = { class: "table-cell" }, Zg = { class: "badges-container" }, Qg = { class: "badge badge-error" }, Jg = { class: "badge badge-warning" }, tp = { class: "badge badge-yellow" }, ep = { class: "badge badge-error" }, sp = {
  key: 1,
  class: "empty-state"
}, ap = /* @__PURE__ */ st({
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
    const s = e, a = t, n = (f) => {
      a("export", f);
    }, i = D(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (f, h) => new Date(f.date).getTime() - new Date(h.date).getTime()
    ) : []), o = D(() => s.data?.total_payment_success_value || []), r = (f) => f.payment_success_value || [], l = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce((h, b) => h + (b.count || 0), 0), d = (f) => lt(f), u = D(() => {
      const f = s.data, h = f.total_booking_initiated || 0, b = f.total_booking_started || 0, v = f.total_payment_initiated || 0, m = f.total_not_found || 0, _ = f.total_cancelled || 0, w = f.total_no_pending_balance || 0, k = f.total_errors || 0, S = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce((T, P) => T + (P.count || 0), 0), $ = f.total_payment_failed || 0, A = Math.max(0, h - b), F = Math.max(0, b - v - m - _ - w - k), R = (T, P) => {
        const L = P > 0 ? Math.round(T / P * 100) : 0;
        return `${T.toLocaleString()} (${L}%)`;
      }, N = [
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
      ], C = [];
      return b > 0 && C.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: R(b, h)
      }), A > 0 && C.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: A,
        label: R(A, h)
      }), v > 0 && C.push({
        source: "Started",
        target: "Payment Initiated",
        value: v,
        label: R(v, b)
      }), m > 0 && C.push({
        source: "Started",
        target: "Not Found",
        value: m,
        label: R(m, b)
      }), _ > 0 && C.push({
        source: "Started",
        target: "Cancelled",
        value: _,
        label: R(_, b)
      }), w > 0 && C.push({
        source: "Started",
        target: "No Pending Balance",
        value: w,
        label: R(w, b)
      }), k > 0 && C.push({
        source: "Started",
        target: "Errors",
        value: k,
        label: R(k, b)
      }), F > 0 && C.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: F,
        label: R(F, b)
      }), S > 0 && C.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: S,
        label: R(S, v)
      }), $ > 0 && C.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: $,
        label: R($, v)
      }), { nodes: N, links: C };
    }), g = {
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
    }, p = (f, h) => !h || h === 0 ? "0%" : `${Math.round(f / h * 100)}%`;
    return (f, h) => (y(), x("article", xg, [
      c("header", kg, [
        c("div", wg, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? W("", !0) : (y(), x("div", Sg, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            o.value.length > 0 ? (y(), x("div", Mg, [
              (y(!0), x(q, null, Z(o.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, M(b.currency) + " " + M(d(b.total_value)), 1))), 128))
            ])) : (y(), x("p", $g, M(d(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", Cg, [...h[2] || (h[2] = [
        X('<div class="loading-container" data-v-57d15b37><div class="chart-flow-loader" data-v-57d15b37><div class="flow-line flow-1" data-v-57d15b37></div><div class="flow-line flow-2" data-v-57d15b37></div><div class="flow-line flow-3" data-v-57d15b37></div><div class="flow-line flow-4" data-v-57d15b37></div><div class="flow-line flow-5" data-v-57d15b37></div></div><p class="loading-text" data-v-57d15b37>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (y(), x("div", Dg, [
        c("div", Ag, [
          h[3] || (h[3] = c("div", { class: "error-icon-wrapper" }, [
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
          h[4] || (h[4] = c("p", { class: "error-title" }, "Error loading data", -1)),
          c("p", Tg, M(s.error), 1)
        ])
      ])) : (y(), x("div", Bg, [
        c("section", Fg, [
          c("div", Lg, [
            Q(ce, {
              data: u.value,
              "node-colors": g,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", Pg, [
          h[6] || (h[6] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", Eg, [
            c("table", Rg, [
              h[5] || (h[5] = c("thead", null, [
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
              c("tbody", Og, [
                (y(!0), x(q, null, Z(i.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Ig, M(B(Tt)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", zg, M(B(H)(b.booking_initiated_count)), 1),
                  c("td", Ng, [
                    Jt(M(B(H)(b.booking_started_count)) + " ", 1),
                    c("span", Wg, " (" + M(p(b.booking_started_count, b.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", Hg, M(B(H)(b.payment_initiated_count)), 1),
                  c("td", Vg, [
                    c("div", jg, [
                      c("span", Yg, " Success: " + M(B(H)(l(b))), 1),
                      c("span", qg, " Failed: " + M(B(H)(b.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", Ug, [
                    r(b).length > 0 ? (y(), x("div", Kg, [
                      (y(!0), x(q, null, Z(r(b), (v) => (y(), x("span", {
                        key: `${b.date}-${v.currency}`,
                        class: "badge badge-currency"
                      }, M(v.currency) + " " + M(d(v.total_value)), 1))), 128))
                    ])) : (y(), x("span", Xg, "N/A"))
                  ]),
                  c("td", Gg, [
                    c("div", Zg, [
                      c("span", Qg, " Not Found: " + M(b.not_found_count ? B(H)(b.not_found_count) : "N/A"), 1),
                      c("span", Jg, " Cancelled: " + M(b.cancelled_count ? B(H)(b.cancelled_count) : "N/A"), 1),
                      c("span", tp, " No Balance: " + M(b.no_pending_balance_count ? B(H)(b.no_pending_balance_count) : "N/A"), 1),
                      c("span", ep, " Errors: " + M(b.error_count ? B(H)(b.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", sp, [...h[7] || (h[7] = [
          X('<div class="empty-state-content" data-v-57d15b37><div class="empty-icon-wrapper" data-v-57d15b37><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-57d15b37><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-57d15b37></path></svg></div><p class="empty-title" data-v-57d15b37>No booking manager data available</p><p class="empty-description" data-v-57d15b37>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), np = /* @__PURE__ */ tt(ap, [["__scopeId", "data-v-57d15b37"]]), ip = { class: "checkin-metrics-card" }, op = {
  key: 0,
  class: "loading-state"
}, rp = {
  key: 1,
  class: "card-body"
}, lp = {
  key: 0,
  class: "chart-section"
}, cp = { class: "chart-wrapper" }, dp = {
  key: 1,
  class: "table-section"
}, up = { class: "table-wrapper" }, hp = { class: "data-table" }, fp = { class: "table-body" }, gp = { class: "table-cell font-medium" }, pp = { class: "table-cell text-center" }, bp = { class: "table-cell text-center" }, vp = { class: "table-cell text-center" }, mp = { class: "table-cell text-center" }, _p = { class: "table-cell text-center" }, yp = { class: "table-cell text-center" }, xp = { class: "table-cell text-left" }, kp = {
  key: 0,
  class: "failed-steps"
}, wp = { class: "step-name" }, Sp = { class: "step-count" }, Mp = {
  key: 1,
  class: "empty-cell"
}, $p = {
  key: 2,
  class: "empty-state"
}, Cp = {
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
    const s = t, a = (v) => {
      s("export", v);
    }, n = e, i = {
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      checkin_by_day: []
    }, o = {
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: [],
      unrecovered_by_day: []
    }, r = pt([]), l = D(() => {
      const v = n.data;
      return v && (Array.isArray(v.checkin_by_day) && v.checkin_by_day.length > 0 || (v.total_checkin_initiated ?? 0) > 0) ? { ...i, ...v } : n.checkinData ?? i;
    }), d = D(() => {
      const v = n.data;
      return v && (Array.isArray(v.failed_by_step_by_day) && v.failed_by_step_by_day.length > 0 || Array.isArray(v.unrecovered_by_step) && v.unrecovered_by_step.length > 0) ? {
        ...o,
        total_checkin_failed: v.total_checkin_failed ?? 0,
        total_checkin_unrecovered: v.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: v.failed_by_step_by_day ?? [],
        unrecovered_by_step: v.unrecovered_by_step ?? [],
        unrecovered_by_day: v.unrecovered_by_day ?? []
      } : n.failedData ?? o;
    }), u = D(() => {
      const v = {
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
      return (d.value.unrecovered_by_step || []).forEach((_) => {
        const k = _.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        v[k] = S[k] || "#DC2626";
      }), v;
    }), g = (v, m) => !m || m === 0 ? "0%" : `${Math.round(v / m * 100)}%`, p = (v, m) => {
      const _ = H(v), w = g(v, m);
      return `${_} (${w})`;
    }, f = (v) => v.reduce((m, _) => m + _.failed_count, 0), h = D(() => {
      const v = [], m = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: v, links: m };
      v.push({ name: "Checkin Init" }), v.push({ name: "Booking retrive" }), v.push({ name: "Booking retrive success" }), v.push({ name: "Number of Passengers" }), v.push({ name: "Completed" }), v.push({ name: "Closed with BP" });
      const _ = l.value.total_checkin_initiated, w = l.value.total_checkin_init, k = l.value.total_checkin_init_abandoned, S = w - k, $ = l.value.total_checkin_started, A = l.value.total_checkin_completed, F = l.value.total_checkin_closed, R = d.value.unrecovered_by_step || [], N = R.reduce((L, I) => L + I.count, 0);
      if (w > 0) {
        const L = Math.round(w / _ * 100);
        m.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: w,
          label: `${w.toLocaleString()} (${L}%)`
        });
      }
      const C = _ - w;
      if (C > 0) {
        const L = Math.round(C / _ * 100);
        v.push({ name: "Abandoned (Init)" }), m.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: C,
          label: `${C.toLocaleString()} (${L}%)`
        });
      }
      if (k > 0) {
        const L = Math.round(k / _ * 100);
        v.push({ name: "Abandoned (Started)" }), m.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: k,
          label: `${k.toLocaleString()} (${L}%)`
        });
      }
      if (S > 0) {
        const L = Math.round(S / _ * 100);
        m.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: S,
          label: `${S.toLocaleString()} (${L}%)`
        });
      }
      if ($ > 0) {
        const L = Math.round($ / _ * 100);
        m.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${L}%)`
        });
      }
      if (A > 0) {
        const L = Math.round(A / $ * 100);
        m.push({
          source: "Number of Passengers",
          target: "Completed",
          value: A,
          label: `${A.toLocaleString()} (${L}%)`
        });
      }
      if (R.length > 0 && N > 0) {
        v.push({ name: "Unrecovered" });
        const L = Math.round(N / $ * 100);
        m.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: N,
          label: `${N.toLocaleString()} (${L}%)`
        }), R.forEach((I) => {
          const K = I.step_name.replace(/_/g, " ").split(" ").map((z) => z.charAt(0).toUpperCase() + z.slice(1)).join(" "), V = Math.round(I.count / $ * 100);
          v.push({ name: K }), m.push({
            source: "Unrecovered",
            target: K,
            value: I.count,
            label: `${I.count.toLocaleString()} (${V}%)`
          });
        });
      }
      const T = $ - (A + N);
      if (T > 0) {
        const L = Math.round(T / $ * 100);
        v.push({ name: "Abandoned (Flow)" }), m.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: T,
          label: `${T.toLocaleString()} (${L}%)`
        });
      }
      const P = A - F;
      if (P > 0) {
        const L = Math.round(P / $ * 100);
        v.push({ name: "BP Error" }), m.push({
          source: "Completed",
          target: "BP Error",
          value: P,
          label: `${P.toLocaleString()} (${L}%)`
        });
      }
      if (F > 0) {
        const L = Math.round(F / $ * 100);
        m.push({
          source: "Completed",
          target: "Closed with BP",
          value: F,
          label: `${F.toLocaleString()} (${L}%)`
        });
      }
      return { nodes: v, links: m };
    }), b = () => {
      const v = l.value.checkin_by_day || [], m = d.value.failed_by_step_by_day || [];
      if (v.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...v].map((_) => {
        const w = m.find(
          (k) => k.date === _.date
        );
        return {
          ..._,
          failed_steps: w?.steps || []
        };
      }), r.value.sort((_, w) => new Date(_.date) - new Date(w.date));
    };
    return zt(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        b();
      },
      { deep: !0, immediate: !0 }
    ), (v, m) => (y(), x("article", ip, [
      m[3] || (m[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", op, [...m[0] || (m[0] = [
        X('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", rp, [
        h.value.nodes.length > 0 ? (y(), x("section", lp, [
          c("div", cp, [
            Q(ce, {
              data: h.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : W("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", dp, [
          c("div", up, [
            c("table", hp, [
              m[1] || (m[1] = c("thead", null, [
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
              c("tbody", fp, [
                (y(!0), x(q, null, Z(r.value, (_) => (y(), x("tr", {
                  key: _.date,
                  class: "table-row"
                }, [
                  c("td", gp, M(B(Tt)(_.date).format("DD/MM/YYYY")), 1),
                  c("td", pp, M(B(H)(_.checkin_initiated_count)), 1),
                  c("td", bp, M(p(_.checkin_init_count, _.checkin_initiated_count)), 1),
                  c("td", vp, M(B(H)(_.checkin_started_count)), 1),
                  c("td", mp, M(p(_.checkin_completed_count, _.checkin_started_count)), 1),
                  c("td", _p, M(p(_.checkin_closed_count, _.checkin_started_count)), 1),
                  c("td", yp, M(p(f(_.failed_steps), _.checkin_started_count)), 1),
                  c("td", xp, [
                    _.failed_steps && _.failed_steps.length > 0 ? (y(), x("div", kp, [
                      (y(!0), x(q, null, Z(_.failed_steps, (w) => (y(), x("div", {
                        key: w.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", wp, M(w.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", Sp, M(w.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Mp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", $p, [...m[2] || (m[2] = [
          X('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, Dp = /* @__PURE__ */ tt(Cp, [["__scopeId", "data-v-d527da09"]]), Ap = { class: "checkin-metrics-card" }, Tp = {
  key: 0,
  class: "loading-state"
}, Bp = {
  key: 1,
  class: "card-body"
}, Fp = {
  key: 0,
  class: "sankey-section"
}, Lp = {
  key: 1,
  class: "table-section"
}, Pp = { class: "table-wrapper" }, Ep = { class: "data-table" }, Rp = { class: "table-body" }, Op = { class: "table-cell date-cell" }, Ip = { class: "table-cell text-center" }, zp = { class: "table-cell text-center" }, Np = { class: "table-cell text-center" }, Wp = { class: "table-cell text-center" }, Hp = { class: "table-cell text-center" }, Vp = { class: "table-cell text-center" }, jp = { class: "table-cell reasons-cell" }, Yp = {
  key: 0,
  class: "reasons-list"
}, qp = { class: "reason-name" }, Up = { class: "reason-count" }, Kp = {
  key: 1,
  class: "no-reasons"
}, Xp = {
  key: 2,
  class: "empty-state"
}, Gp = { class: "empty-state-content" }, Zp = { class: "empty-icon-wrapper" }, Qp = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (v) => {
      n("export", v);
    }, { isDark: o } = rt(ot(a, "theme")), r = (v) => v == null ? "0" : v.toLocaleString(), l = (v) => {
      const m = new Date(v), _ = String(m.getDate()).padStart(2, "0"), w = String(m.getMonth() + 1).padStart(2, "0"), k = m.getFullYear();
      return `${_}/${w}/${k}`;
    }, d = (v) => v.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), u = (v, m) => !m || m === 0 ? "0%" : `${Math.round(v / m * 100)}%`, g = (v, m) => {
      const _ = v || 0, w = m || 0, k = r(_), S = u(_, w);
      return `${k} (${S})`;
    }, p = (v) => v ? v.reduce((m, _) => m + _.failed_count, 0) : 0, f = D(() => {
      const v = {
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
      return (a.failedData?.unrecovered_by_step || []).forEach((_) => {
        const k = _.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        v[k] = S[k] || "#DC2626";
      }), v;
    }), h = D(() => {
      const v = a.checkinData?.checkin_by_day || [], m = a.failedData?.failed_by_step_by_day || [];
      return v.map((w) => {
        const k = m.find((S) => S.date === w.date);
        return {
          ...w,
          failed_steps: k?.steps || []
        };
      }).sort((w, k) => new Date(w.date).getTime() - new Date(k.date).getTime());
    }), b = D(() => {
      const v = [], m = [], _ = /* @__PURE__ */ new Set(), w = (G) => {
        _.has(G) || (v.push({ name: G }), _.add(G));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: v, links: m };
      w("Checkin Init"), w("Booking retrive"), w("Booking retrive success"), w("Number of Passengers"), w("Completed"), w("Closed with BP");
      const k = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_checkin_init || 0, $ = a.checkinData.total_checkin_init_abandoned || 0, A = a.checkinData.total_checkin_pre_init_abandoned_error, F = a.checkinData.total_checkin_pre_init_abandoned_voluntary, R = A != null || F != null, N = R ? Math.max(Number(A) || 0, 0) : 0, C = R ? Math.max(Number(F) || 0, 0) : 0, T = a.checkinData.total_checkin_init_abandoned_error, P = a.checkinData.total_checkin_init_abandoned_voluntary, L = T != null || P != null, I = L ? Math.max(Number(T) || 0, 0) : 0, j = L ? Math.max(Number(P) || 0, 0) : 0, K = L ? Math.max($ - I - j, 0) : $, V = S - $, z = a.checkinData.total_checkin_started || 0, O = a.checkinData.total_checkin_completed || 0, J = a.checkinData.total_checkin_closed || 0, it = a.failedData?.unrecovered_by_step || [], at = it.reduce((G, Mt) => G + Mt.count, 0);
      if (S > 0) {
        const G = Math.round(S / k * 100);
        m.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${G}%)`
        });
      }
      const ut = k - S;
      if (R) {
        if (C > 0) {
          const G = Math.round(C / k * 100);
          w("Abandoned (Init)"), m.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: C,
            label: `${C.toLocaleString()} (${G}%)`
          });
        }
        if (N > 0) {
          const G = Math.round(N / k * 100);
          w("Booking not retreived"), m.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: N,
            label: `${N.toLocaleString()} (${G}%)`
          });
        }
      } else if (ut > 0) {
        const G = Math.round(ut / k * 100);
        w("Abandoned (Init)"), m.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: ut,
          label: `${ut.toLocaleString()} (${G}%)`
        });
      }
      if (L) {
        if (I > 0) {
          const G = Math.round(I / k * 100);
          w("Error"), m.push({
            source: "Booking retrive",
            target: "Error",
            value: I,
            label: `${I.toLocaleString()} (${G}%)`
          });
        }
        if (j > 0) {
          const G = Math.round(j / k * 100);
          w("Abandoned (Started)"), m.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: j,
            label: `${j.toLocaleString()} (${G}%)`
          });
        }
        if (K > 0) {
          const G = Math.round(K / k * 100);
          w("Abandoned (Started)"), m.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: K,
            label: `${K.toLocaleString()} (${G}%)`
          });
        }
      } else if ($ > 0) {
        const G = Math.round($ / k * 100);
        w("Abandoned (Started)"), m.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${G}%)`
        });
      }
      if (V > 0) {
        const G = Math.round(V / k * 100);
        m.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: V,
          label: `${V.toLocaleString()} (${G}%)`
        });
      }
      if (z > 0) {
        const G = Math.round(z / k * 100);
        m.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: z,
          label: `${z.toLocaleString()} (${G}%)`
        });
      }
      if (O > 0) {
        const G = Math.round(O / z * 100);
        m.push({
          source: "Number of Passengers",
          target: "Completed",
          value: O,
          label: `${O.toLocaleString()} (${G}%)`
        });
      }
      if (it.length > 0 && at > 0) {
        w("Unrecovered");
        const G = Math.round(at / z * 100);
        m.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: at,
          label: `${at.toLocaleString()} (${G}%)`
        }), it.forEach((Mt) => {
          const E = Mt.step_name.replace(/_/g, " ").split(" ").map((U) => U.charAt(0).toUpperCase() + U.slice(1)).join(" "), Y = Math.round(Mt.count / z * 100);
          w(E), m.push({
            source: "Unrecovered",
            target: E,
            value: Mt.count,
            label: `${Mt.count.toLocaleString()} (${Y}%)`
          });
        });
      }
      const mt = z - (O + at);
      if (mt > 0) {
        const G = Math.round(mt / z * 100);
        w("Abandoned (Flow)"), m.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: mt,
          label: `${mt.toLocaleString()} (${G}%)`
        });
      }
      const ct = O - J;
      if (ct > 0) {
        const G = Math.round(ct / z * 100);
        w("BP Error"), m.push({
          source: "Completed",
          target: "BP Error",
          value: ct,
          label: `${ct.toLocaleString()} (${G}%)`
        });
      }
      if (J > 0) {
        const G = Math.round(J / z * 100);
        m.push({
          source: "Completed",
          target: "Closed with BP",
          value: J,
          label: `${J.toLocaleString()} (${G}%)`
        });
      }
      return { nodes: v, links: m };
    });
    return t({ isDark: o }), (v, m) => (y(), x("article", Ap, [
      m[4] || (m[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Tp, [...m[0] || (m[0] = [
        X('<div class="loading-container" data-v-a065922d><div class="chart-bars-loader" data-v-a065922d><div class="bar bar-1" data-v-a065922d></div><div class="bar bar-2" data-v-a065922d></div><div class="bar bar-3" data-v-a065922d></div><div class="bar bar-4" data-v-a065922d></div><div class="bar bar-5" data-v-a065922d></div></div><p class="loading-text" data-v-a065922d>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Bp, [
        b.value.nodes.length > 0 ? (y(), x("div", Fp, [
          Q(ce, {
            data: b.value,
            height: "500px",
            "node-colors": f.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : W("", !0),
        h.value && h.value.length > 0 ? (y(), x("div", Lp, [
          c("div", Pp, [
            c("table", Ep, [
              m[1] || (m[1] = c("thead", null, [
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
              c("tbody", Rp, [
                (y(!0), x(q, null, Z(h.value, (_) => (y(), x("tr", {
                  key: _.date,
                  class: "table-row"
                }, [
                  c("td", Op, M(l(_.date)), 1),
                  c("td", Ip, M(r(_.checkin_initiated_count)), 1),
                  c("td", zp, M(g(_.checkin_init_count, _.checkin_initiated_count)), 1),
                  c("td", Np, M(r(_.checkin_started_count)), 1),
                  c("td", Wp, M(g(_.checkin_completed_count, _.checkin_started_count)), 1),
                  c("td", Hp, M(g(_.checkin_closed_count, _.checkin_started_count)), 1),
                  c("td", Vp, M(g(p(_.failed_steps), _.checkin_started_count)), 1),
                  c("td", jp, [
                    _.failed_steps && _.failed_steps.length > 0 ? (y(), x("div", Yp, [
                      (y(!0), x(q, null, Z(_.failed_steps, (w) => (y(), x("div", {
                        key: w.step_name,
                        class: "reason-item"
                      }, [
                        c("span", qp, M(d(w.step_name)) + ":", 1),
                        c("span", Up, M(w.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Kp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", Xp, [
          c("div", Gp, [
            c("div", Zp, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            m[2] || (m[2] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            m[3] || (m[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Jp = /* @__PURE__ */ tt(Qp, [["__scopeId", "data-v-a065922d"]]), tb = { class: "checkin-segments-card" }, eb = {
  key: 0,
  class: "loading-state"
}, sb = {
  key: 1,
  class: "card-body"
}, ab = {
  key: 0,
  class: "table-section"
}, nb = { class: "table-wrapper" }, ib = { class: "data-table" }, ob = { class: "table-body" }, rb = { class: "table-cell font-medium text-center" }, lb = { class: "airport-badge" }, cb = { class: "table-cell text-center" }, db = {
  key: 0,
  class: "airport-badge connection"
}, ub = {
  key: 1,
  class: "empty-connection"
}, hb = { class: "table-cell text-center" }, fb = { class: "airport-badge" }, gb = { class: "table-cell text-center" }, pb = {
  key: 0,
  class: "trip-badge roundtrip"
}, bb = {
  key: 1,
  class: "trip-badge oneway"
}, vb = { class: "table-cell text-center" }, mb = { class: "table-cell text-center" }, _b = { class: "percentage-value" }, yb = { class: "table-cell text-center" }, xb = { class: "percentage-value" }, kb = { class: "table-cell text-center" }, wb = { class: "percentage-value success" }, Sb = {
  key: 1,
  class: "empty-state"
}, Mb = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (u) => {
      n("export", u);
    }, { isDark: o } = rt(ot(a, "theme")), r = (u, g) => !g || g === 0 || !u ? "0%" : `${Math.round(u / g * 100)}%`, l = (u) => !u || u === "None" ? "-" : String(u).trim().replace(/_[0-9]+$/i, ""), d = (u) => {
      const g = l(u?.departure_airport), p = l(u?.arrival_airport);
      return g === "-" || p === "-" ? !1 : g === p;
    };
    return t({ isDark: o }), (u, g) => (y(), x("article", tb, [
      g[5] || (g[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      a.loading ? (y(), x("div", eb, [...g[0] || (g[0] = [
        X('<div class="loading-container" data-v-5f8ce8fa><div class="chart-flow-loader" data-v-5f8ce8fa><div class="flow-line flow-1" data-v-5f8ce8fa></div><div class="flow-line flow-2" data-v-5f8ce8fa></div><div class="flow-line flow-3" data-v-5f8ce8fa></div><div class="flow-line flow-4" data-v-5f8ce8fa></div><div class="flow-line flow-5" data-v-5f8ce8fa></div></div><p class="loading-text" data-v-5f8ce8fa>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", sb, [
        a.data.length > 0 ? (y(), x("section", ab, [
          c("div", nb, [
            c("table", ib, [
              g[3] || (g[3] = c("thead", null, [
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
              c("tbody", ob, [
                (y(!0), x(q, null, Z(a.data, (p, f) => (y(), x("tr", {
                  key: f,
                  class: "table-row"
                }, [
                  c("td", rb, [
                    c("span", lb, M(l(p.departure_airport)), 1)
                  ]),
                  c("td", cb, [
                    l(p.conexion_airport) !== "-" ? (y(), x("span", db, M(l(p.conexion_airport)), 1)) : (y(), x("span", ub, "-"))
                  ]),
                  c("td", hb, [
                    c("span", fb, M(l(p.arrival_airport)), 1)
                  ]),
                  c("td", gb, [
                    d(p) ? (y(), x("span", pb, [...g[1] || (g[1] = [
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
                      Jt(" Roundtrip ", -1)
                    ])])) : (y(), x("span", bb, [...g[2] || (g[2] = [
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
                      Jt(" One way ", -1)
                    ])]))
                  ]),
                  c("td", vb, M(B(H)(p.segment_init_count)), 1),
                  c("td", mb, [
                    c("span", _b, M(r(p.segment_started_count, p.segment_init_count)), 1)
                  ]),
                  c("td", yb, [
                    c("span", xb, M(r(p.segment_completed_count, p.segment_init_count)), 1)
                  ]),
                  c("td", kb, [
                    c("span", wb, M(r(p.segment_closed_count, p.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", Sb, [...g[4] || (g[4] = [
          X('<div class="empty-state-content" data-v-5f8ce8fa><div class="empty-icon-wrapper" data-v-5f8ce8fa><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5f8ce8fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-5f8ce8fa></path></svg></div><p class="empty-title" data-v-5f8ce8fa>No segment data available</p><p class="empty-description" data-v-5f8ce8fa>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), $b = /* @__PURE__ */ tt(Mb, [["__scopeId", "data-v-5f8ce8fa"]]), Cb = { class: "disruption-metrics-card" }, Db = { class: "card-header" }, Ab = { class: "header-content" }, Tb = {
  key: 0,
  class: "payment-success-badge"
}, Bb = {
  key: 0,
  class: "currency-breakdown-list"
}, Fb = {
  key: 1,
  class: "badge-value"
}, Lb = {
  key: 0,
  class: "loading-state"
}, Pb = {
  key: 1,
  class: "card-body"
}, Eb = { class: "chart-section" }, Rb = { class: "chart-wrapper" }, Ob = {
  key: 1,
  class: "empty-chart"
}, Ib = {
  key: 0,
  class: "table-section"
}, zb = { class: "table-wrapper" }, Nb = { class: "data-table" }, Wb = { class: "table-body" }, Hb = { class: "table-cell font-medium text-center" }, Vb = { class: "table-cell text-center" }, jb = { class: "table-cell text-center" }, Yb = { class: "percentage-text" }, qb = { class: "table-cell text-center" }, Ub = { class: "abandoned-value" }, Kb = { class: "table-cell" }, Xb = { class: "badges-container badges-wrap" }, Gb = { class: "badge badge-vol" }, Zb = { class: "badge badge-confirm" }, Qb = { class: "badge badge-not-confirm" }, Jb = { class: "badge badge-reject" }, t0 = { class: "badge badge-not-paid" }, e0 = { class: "badge badge-success" }, s0 = { class: "table-cell" }, a0 = { class: "badges-container badges-wrap" }, n0 = { class: "badge badge-inv" }, i0 = { class: "badge badge-human" }, o0 = { class: "badge badge-accept" }, r0 = {
  key: 1,
  class: "empty-state"
}, l0 = /* @__PURE__ */ st({
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
    const s = e, a = t, n = (f) => {
      a("export", f);
    }, i = D(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (f, h) => new Date(f.date).getTime() - new Date(h.date).getTime()
    ) : []), o = D(() => s.data?.total_payment_success || []), r = (f, h) => !h || h === 0 ? "0%" : `${Math.round(f / h * 100)}%`, l = (f) => lt(f), d = (f) => (f ?? []).reduce((h, b) => h + (b.count ?? 0), 0), u = (f) => typeof f.sell_success_count == "number" ? f.sell_success_count : d(f.payment_success_total), g = D(() => {
      const f = s.data, h = f.total_disruption_conversations || 0, b = f.total_disruption_initiated || 0, v = f.total_voluntary || 0, m = f.total_involuntary || 0, _ = f.total_accepted || 0, w = f.total_confirmed || 0, k = typeof f.total_sell_success == "number" ? f.total_sell_success : d(f.total_payment_success), S = f.total_sell_failed || 0, $ = Math.max(0, h - b), A = Math.max(0, b - v - m), F = Math.max(0, m - _), R = Math.max(0, v - w), N = S, C = Math.max(0, w - k - N), T = (I, j) => {
        const K = j > 0 ? Math.round(I / j * 100) : 0;
        return `${I.toLocaleString()} (${K}%)`;
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
      ], L = [];
      return b > 0 && L.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: T(b, h)
      }), $ > 0 && L.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: $,
        label: T($, h)
      }), v > 0 && L.push({
        source: "Started",
        target: "Voluntary",
        value: v,
        label: T(v, h)
      }), m > 0 && L.push({
        source: "Started",
        target: "Involuntary",
        value: m,
        label: T(m, h)
      }), A > 0 && L.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: A,
        label: T(A, h)
      }), _ > 0 && L.push({
        source: "Involuntary",
        target: "Accepted",
        value: _,
        label: T(_, h)
      }), F > 0 && L.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: F,
        label: T(F, h)
      }), w > 0 && L.push({
        source: "Voluntary",
        target: "Confirmed",
        value: w,
        label: T(w, h)
      }), R > 0 && L.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: R,
        label: T(R, h)
      }), k > 0 && L.push({
        source: "Confirmed",
        target: "Paid",
        value: k,
        label: T(k, h)
      }), N > 0 && L.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: T(N, h)
      }), C > 0 && L.push({
        source: "Confirmed",
        target: "Not Paid",
        value: C,
        label: T(C, h)
      }), { nodes: P, links: L };
    }), p = {
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
    return (f, h) => (y(), x("article", Cb, [
      c("header", Db, [
        c("div", Ab, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? W("", !0) : (y(), x("div", Tb, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            o.value.length > 0 ? (y(), x("div", Bb, [
              (y(!0), x(q, null, Z(o.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, M(b.currency) + " " + M(l(b.total_value)), 1))), 128))
            ])) : (y(), x("p", Fb, M(l(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", Lb, [...h[2] || (h[2] = [
        X('<div class="loading-container" data-v-93ea6c83><div class="chart-bars-loader" data-v-93ea6c83><div class="bar bar-1" data-v-93ea6c83></div><div class="bar bar-2" data-v-93ea6c83></div><div class="bar bar-3" data-v-93ea6c83></div><div class="bar bar-4" data-v-93ea6c83></div><div class="bar bar-5" data-v-93ea6c83></div></div><p class="loading-text" data-v-93ea6c83>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", Pb, [
        c("section", Eb, [
          c("div", Rb, [
            g.value.nodes.length > 0 && g.value.links.length > 0 ? (y(), gt(ce, {
              key: 0,
              data: g.value,
              "node-colors": p,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", Ob, [...h[3] || (h[3] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", Ib, [
          h[5] || (h[5] = X('<div class="section-header" data-v-93ea6c83><h4 class="section-title" data-v-93ea6c83>Daily Overview</h4></div><div class="legend-container" data-v-93ea6c83><p class="legend-title" data-v-93ea6c83>Legend</p><div class="legend-items" data-v-93ea6c83><div class="legend-group" data-v-93ea6c83><span class="legend-label" data-v-93ea6c83>Voluntary:</span><span class="badge badge-vol" data-v-93ea6c83>VOL</span></div><div class="legend-group" data-v-93ea6c83><span class="legend-label" data-v-93ea6c83>Involuntary:</span><span class="badge badge-inv" data-v-93ea6c83>INV</span></div><div class="legend-note" data-v-93ea6c83><span data-v-93ea6c83>Vol=Voluntary</span><span data-v-93ea6c83>•</span><span data-v-93ea6c83>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", zb, [
            c("table", Nb, [
              h[4] || (h[4] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Abandoned (%)"),
                  c("th", { class: "table-header" }, "Voluntary"),
                  c("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              c("tbody", Wb, [
                (y(!0), x(q, null, Z(i.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Hb, M(B(Tt)(b.date).format("DD/MM")), 1),
                  c("td", Vb, M(B(H)(b.disruption_conversations)), 1),
                  c("td", jb, [
                    Jt(M(B(H)(b.disruption_initiated_count)) + " ", 1),
                    c("span", Yb, " (" + M(r(b.disruption_initiated_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", qb, [
                    c("span", Ub, M(B(H)(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count)) + " (" + M(r(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Kb, [
                    c("div", Xb, [
                      c("span", Gb, " VOL " + M(B(H)(b.voluntary_count)) + " (" + M(r(b.voluntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Zb, " Confirm " + M(B(H)(b.confirmed_count)) + " (" + M(r(b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Qb, " Not Confirm " + M(B(H)(b.voluntary_count - b.confirmed_count)) + " (" + M(r(b.voluntary_count - b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Jb, " Reject " + M(B(H)(b.sell_failed_count)) + " (" + M(r(b.sell_failed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", t0, " Not Paid " + M(B(H)(Math.max(0, b.confirmed_count - u(b) - b.sell_failed_count))) + " (" + M(r(Math.max(0, b.confirmed_count - u(b) - b.sell_failed_count), b.disruption_conversations)) + ") ", 1),
                      c("span", e0, " Finish " + M(B(H)(u(b))) + " (" + M(r(u(b), b.disruption_conversations)) + ") ", 1),
                      (y(!0), x(q, null, Z(b.payment_success_total || [], (v) => (y(), x("span", {
                        key: `${b.date}-${v.currency}`,
                        class: "badge badge-currency"
                      }, M(v.currency) + " " + M(l(v.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", s0, [
                    c("div", a0, [
                      c("span", n0, " INV " + M(B(H)(b.involuntary_count)) + " (" + M(r(b.involuntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", i0, " Human " + M(B(H)(b.involuntary_count - b.accepted_count)) + " (" + M(r(b.involuntary_count - b.accepted_count, b.disruption_conversations)) + ") ", 1),
                      c("span", o0, " Accept " + M(B(H)(b.accepted_count)) + " (" + M(r(b.accepted_count, b.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", r0, [...h[6] || (h[6] = [
          X('<div class="empty-state-content" data-v-93ea6c83><div class="empty-icon-wrapper" data-v-93ea6c83><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-93ea6c83><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-93ea6c83></path></svg></div><p class="empty-title" data-v-93ea6c83>No disruption data available</p><p class="empty-description" data-v-93ea6c83>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), c0 = /* @__PURE__ */ tt(l0, [["__scopeId", "data-v-93ea6c83"]]), d0 = { class: "faq-metrics-card" }, u0 = {
  key: 0,
  class: "card-body"
}, h0 = { class: "kpi-grid" }, f0 = { class: "kpi-card" }, g0 = { class: "kpi-value" }, p0 = { class: "kpi-card" }, b0 = { class: "kpi-value" }, v0 = { class: "kpi-card kpi-card--airline" }, m0 = { class: "kpi-value" }, _0 = { class: "kpi-card kpi-card--booking" }, y0 = { class: "kpi-value" }, x0 = { class: "kpi-card kpi-card--flight" }, k0 = { class: "kpi-value" }, w0 = {
  key: 0,
  class: "chart-section"
}, S0 = {
  key: 1,
  class: "empty-state"
}, M0 = {
  key: 1,
  class: "loading-state"
}, $0 = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (p) => {
      n("export", p);
    }, { isDark: o, colors: r } = rt(ot(a, "theme")), l = pt({ labels: [], datasets: [] }), d = D(() => a.data ?? {
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
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
    })), g = (p) => {
      if (!p) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const f = p.faq_by_day || [];
      if (f.length > 0) {
        const h = f.map((_) => Tt(_.date).format("MMM DD")), b = f.map((_) => _.airline_information_retrieved_count || 0), v = f.map((_) => _.flight_status_retrieved_count || 0), m = f.map((_) => _.booking_info_retrieved_count || 0);
        l.value = {
          labels: h,
          datasets: [
            {
              label: "Airline Information",
              data: b,
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
              data: v,
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
    return zt(
      () => a.data,
      (p) => {
        g(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (p, f) => (y(), x("article", d0, [
      f[7] || (f[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      a.loading ? (y(), x("div", M0, [...f[6] || (f[6] = [
        X('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", u0, [
        c("div", h0, [
          c("div", f0, [
            f[0] || (f[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", g0, M(B(H)(d.value.total_faq_events)), 1)
          ]),
          c("div", p0, [
            f[1] || (f[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", b0, M(B(H)(d.value.total_documents_found)), 1)
          ]),
          c("div", v0, [
            f[2] || (f[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", m0, M(B(H)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", _0, [
            f[3] || (f[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", y0, M(B(H)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", x0, [
            f[4] || (f[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", k0, M(B(H)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", w0, [
          Q(le, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", S0, [...f[5] || (f[5] = [
          X('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), C0 = /* @__PURE__ */ tt($0, [["__scopeId", "data-v-5d2c3c33"]]), D0 = { class: "messages-per-agent-card" }, A0 = {
  key: 0,
  class: "card-body"
}, T0 = {
  key: 0,
  class: "chart-section"
}, B0 = {
  key: 1,
  class: "empty-state"
}, F0 = { class: "empty-state-content" }, L0 = { class: "empty-icon-wrapper" }, P0 = {
  key: 1,
  class: "loading-state"
}, E0 = /* @__PURE__ */ st({
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
    }, n = e, i = s, o = (g) => {
      i("export", g);
    }, { isDark: r, colors: l } = rt(ot(n, "theme")), d = D(() => {
      const g = n.data?.agents_by_day || {}, p = Object.keys(g).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const f = /* @__PURE__ */ new Set();
      for (const v of Object.values(g))
        for (const m of Object.keys(v))
          f.add(m);
      const b = Array.from(f).map((v) => {
        const m = a[v] || "#94a3b8";
        return {
          label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, " "),
          data: p.map((_) => g[_]?.[v] || 0),
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
        labels: p,
        datasets: b
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
    return t({ isDark: r }), (g, p) => (y(), x("article", D0, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", P0, [...p[2] || (p[2] = [
        X('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", A0, [
        d.value.labels && d.value.labels.length ? (y(), x("section", T0, [
          Q(le, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", B0, [
          c("div", F0, [
            c("div", L0, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), R0 = /* @__PURE__ */ tt(E0, [["__scopeId", "data-v-b9368fc2"]]), O0 = { class: "record-locator-card" }, I0 = {
  key: 0,
  class: "loading-state"
}, z0 = {
  key: 1,
  class: "card-body"
}, N0 = {
  key: 0,
  class: "chart-section"
}, W0 = { class: "chart-wrapper" }, H0 = {
  key: 1,
  class: "table-section"
}, V0 = { class: "table-wrapper" }, j0 = { class: "data-table" }, Y0 = { class: "table-header-row" }, q0 = {
  key: 0,
  class: "table-header"
}, U0 = {
  key: 1,
  class: "table-header"
}, K0 = { class: "table-body" }, X0 = { class: "table-cell font-medium" }, G0 = { class: "table-cell text-center" }, Z0 = { class: "table-cell text-center" }, Q0 = { class: "table-cell text-center" }, J0 = { class: "table-cell text-center" }, tv = { class: "table-cell text-center success-value" }, ev = { class: "table-cell text-center failed-value" }, sv = { class: "table-cell text-center warning-value" }, av = {
  key: 0,
  class: "table-cell text-center"
}, nv = {
  key: 1,
  class: "table-cell text-center failed-value"
}, iv = {
  key: 2,
  class: "empty-state"
}, ov = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (f) => {
      n("export", f);
    }, { isDark: o } = rt(ot(a, "theme")), r = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (f, h) => new Date(f.date).getTime() - new Date(h.date).getTime()
    ) : []), l = D(() => a.data), d = D(() => ({
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
    })), u = (f, h) => !h || h === 0 ? "0%" : `${Math.round(f / h * 100)}%`, g = (f, h) => {
      const b = H(f), v = u(f, h);
      return `${b} (${v})`;
    }, p = D(() => {
      const f = [], h = [], b = /* @__PURE__ */ new Set(), v = (O) => {
        b.has(O) || (f.push({ name: O }), b.add(O));
      };
      if (!l.value.total_checkin_initiated)
        return { nodes: f, links: h };
      v("Checkin Init"), v("Booking retrive"), v("Checkin Started"), v("Checkin Completed"), v("Checkin Closed");
      const m = l.value.total_checkin_initiated, _ = l.value.total_record_locator_init, w = l.value.total_record_locator_started, k = l.value.total_record_locator_completed, S = l.value.total_record_locator_closed, $ = l.value.total_record_locator_failed, A = l.value.total_record_locator_abandoned, F = l.value.total_record_locator_init_abandoned, R = l.value.total_checkin_pre_init_abandoned_error, N = l.value.total_checkin_pre_init_abandoned_voluntary, C = R != null || N != null, T = C ? Math.max(Number(R) || 0, 0) : 0, P = C ? Math.max(Number(N) || 0, 0) : 0, L = l.value.total_record_locator_init_abandoned_error, I = l.value.total_record_locator_init_abandoned_voluntary, j = L != null || I != null, K = j ? Math.max(Number(L) || 0, 0) : 0, V = j ? Math.max(Number(I) || 0, 0) : 0;
      if (_ > 0) {
        const O = Math.round(_ / m * 100);
        h.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: _,
          label: `${_.toLocaleString()} (${O}%)`
        });
      }
      const z = m - _;
      if (C) {
        if (P > 0) {
          const O = Math.round(P / m * 100);
          v("Abandoned (Init)"), h.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: P,
            label: `${P.toLocaleString()} (${O}%)`
          });
        }
        if (T > 0) {
          const O = Math.round(T / m * 100);
          v("Booking not retreived"), h.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: T,
            label: `${T.toLocaleString()} (${O}%)`
          });
        }
      } else if (z > 0) {
        const O = Math.round(z / m * 100);
        v("Abandoned (Init)"), h.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: z,
          label: `${z.toLocaleString()} (${O}%)`
        });
      }
      if (w > 0) {
        const O = Math.round(w / m * 100);
        h.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: w,
          label: `${w.toLocaleString()} (${O}%)`
        });
      }
      if (j) {
        if (K > 0) {
          const O = Math.round(K / m * 100);
          v("Error"), h.push({
            source: "Booking retrive",
            target: "Error",
            value: K,
            label: `${K.toLocaleString()} (${O}%)`
          });
        }
        if (V > 0) {
          const O = Math.round(V / m * 100);
          v("Abandoned (Started)"), h.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: V,
            label: `${V.toLocaleString()} (${O}%)`
          });
        }
      } else if (F > 0) {
        const O = Math.round(F / m * 100);
        v("Abandoned (Started)"), h.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: F,
          label: `${F.toLocaleString()} (${O}%)`
        });
      }
      if (k > 0) {
        const O = Math.round(k / w * 100);
        h.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: k,
          label: `${k.toLocaleString()} (${O}%)`
        });
      }
      if (S > 0) {
        const O = Math.round(S / w * 100);
        h.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: S,
          label: `${S.toLocaleString()} (${O}%)`
        });
      }
      if ($ > 0) {
        const O = Math.round($ / w * 100);
        v("Checkin Failed"), h.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: $,
          label: `${$.toLocaleString()} (${O}%)`
        });
      }
      if (A > 0) {
        const O = Math.round(A / w * 100);
        v("Abandoned (Flow)"), h.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: A,
          label: `${A.toLocaleString()} (${O}%)`
        });
      }
      return { nodes: f, links: h };
    });
    return t({ isDark: o }), (f, h) => (y(), x("article", O0, [
      h[10] || (h[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      a.loading ? (y(), x("div", I0, [...h[0] || (h[0] = [
        X('<div class="loading-container" data-v-8ff34ad6><div class="chart-flow-loader" data-v-8ff34ad6><div class="flow-line flow-1" data-v-8ff34ad6></div><div class="flow-line flow-2" data-v-8ff34ad6></div><div class="flow-line flow-3" data-v-8ff34ad6></div><div class="flow-line flow-4" data-v-8ff34ad6></div><div class="flow-line flow-5" data-v-8ff34ad6></div></div><p class="loading-text" data-v-8ff34ad6>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", z0, [
        p.value.nodes.length > 0 ? (y(), x("section", N0, [
          c("div", W0, [
            Q(ce, {
              data: p.value,
              height: "500px",
              "node-colors": d.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : W("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", H0, [
          c("div", V0, [
            c("table", j0, [
              c("thead", null, [
                c("tr", Y0, [
                  h[1] || (h[1] = c("th", { class: "table-header" }, "Date", -1)),
                  h[2] || (h[2] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  h[3] || (h[3] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  h[4] || (h[4] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  h[5] || (h[5] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  h[6] || (h[6] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  h[7] || (h[7] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  h[8] || (h[8] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  a.isAvianca ? (y(), x("th", q0, "Create Payment")) : W("", !0),
                  a.isAvianca ? (y(), x("th", U0, "Failed Payment")) : W("", !0)
                ])
              ]),
              c("tbody", K0, [
                (y(!0), x(q, null, Z(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", X0, M(B(Tt)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", G0, M(B(H)(b.checkin_initiated)), 1),
                  c("td", Z0, M(g(b.record_locator_init_count, b.checkin_initiated)), 1),
                  c("td", Q0, M(B(H)(b.record_locator_started_count)), 1),
                  c("td", J0, M(g(b.record_locator_completed_count, b.record_locator_started_count)), 1),
                  c("td", tv, M(g(b.record_locator_closed_count, b.record_locator_started_count)), 1),
                  c("td", ev, M(g(b.record_locator_failed_count, b.record_locator_started_count)), 1),
                  c("td", sv, M(g(b.record_locator_abandoned_count, b.record_locator_started_count)), 1),
                  a.isAvianca ? (y(), x("td", av, M(B(H)(b.record_locator_create_payment_count)), 1)) : W("", !0),
                  a.isAvianca ? (y(), x("td", nv, M(B(H)(b.record_locator_create_payment_failed_count)), 1)) : W("", !0)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", iv, [...h[9] || (h[9] = [
          X('<div class="empty-state-content" data-v-8ff34ad6><div class="empty-icon-wrapper" data-v-8ff34ad6><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8ff34ad6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-8ff34ad6></path></svg></div><p class="empty-title" data-v-8ff34ad6>No record locator data available</p><p class="empty-description" data-v-8ff34ad6>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), rv = /* @__PURE__ */ tt(ov, [["__scopeId", "data-v-8ff34ad6"]]), lv = { class: "seller-metrics-card" }, cv = { class: "card-header" }, dv = { class: "header-content" }, uv = {
  key: 0,
  class: "payment-success-badge"
}, hv = {
  key: 0,
  class: "currency-breakdown-list"
}, fv = {
  key: 1,
  class: "badge-value"
}, gv = {
  key: 0,
  class: "loading-state"
}, pv = {
  key: 1,
  class: "card-body"
}, bv = {
  key: 0,
  class: "chart-section"
}, vv = { class: "chart-wrapper" }, mv = {
  key: 1,
  class: "empty-state"
}, _v = {
  key: 2,
  class: "table-section"
}, yv = { class: "table-wrapper" }, xv = { class: "data-table" }, kv = { class: "table-body" }, wv = { class: "table-cell font-medium" }, Sv = { class: "table-cell text-center" }, Mv = { class: "table-cell text-center" }, $v = { class: "table-cell text-center" }, Cv = { class: "table-cell text-center" }, Dv = { class: "table-cell text-center" }, Av = { class: "table-cell text-center success-value" }, Tv = {
  key: 0,
  class: "currency-cell-list"
}, Bv = { key: 1 }, Fv = { class: "table-cell text-left" }, Lv = {
  key: 0,
  class: "failed-reasons"
}, Pv = { class: "reason-name" }, Ev = { class: "reason-count" }, Rv = {
  key: 1,
  class: "empty-cell"
}, Ov = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (_) => {
      n("export", _);
    }, { isDark: o } = rt(ot(a, "theme")), r = D(() => {
      if (!a.sellerData?.seller_by_day) return [];
      const _ = [...a.sellerData.seller_by_day];
      return a.failedData?.failed_by_reason_by_day && a.failedData.failed_by_reason_by_day.forEach((w) => {
        const k = _.findIndex((S) => S.date === w.date);
        k !== -1 ? _[k] = { ..._[k], reasons: w.reasons } : _.push({
          date: w.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: w.reasons
        });
      }), _.sort((w, k) => new Date(w.date).getTime() - new Date(k.date).getTime());
    }), l = D(() => a.sellerData), d = D(() => a.failedData), u = D(
      () => Array.isArray(a.sellerData.total_value_sell_success) ? a.sellerData.total_value_sell_success : []
    ), g = D(() => {
      const {
        total_seller_conversations: _ = 0,
        total_sell_started: w = 0,
        total_sell_booking_created: k = 0,
        total_sell_success: S = 0
      } = l.value, { failed_by_reason_by_day: $ = [] } = d.value;
      if (_ === 0) return { nodes: [], links: [] };
      const A = [
        { name: "Sell Initiated", value: _ },
        { name: "Sell Started", value: w },
        { name: "Booking Created", value: k },
        { name: "Sell Success", value: S }
      ], F = [], R = _ - w;
      if (R > 0) {
        const P = Math.round(R / _ * 100);
        A.push({ name: "Abandoned (Init)", value: R }), F.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${P}%)`
        });
      }
      if (w > 0) {
        const P = Math.round(w / _ * 100);
        F.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: w,
          label: `${w.toLocaleString()} (${P}%)`
        });
      }
      const N = $.reduce((P, L) => (L.reasons && Array.isArray(L.reasons) && L.reasons.forEach((I) => {
        const j = I.reason, K = I.failed_count;
        P[j] = (P[j] || 0) + K;
      }), P), {});
      if (k > 0) {
        const P = Math.round(k / _ * 100);
        F.push({
          source: "Sell Started",
          target: "Booking Created",
          value: k,
          label: `${k.toLocaleString()} (${P}%)`
        });
      }
      if (S > 0) {
        const P = Math.round(S / _ * 100);
        F.push({
          source: "Booking Created",
          target: "Sell Success",
          value: S,
          label: `${S.toLocaleString()} (${P}%)`
        });
      }
      const C = w - k;
      if (C > 0) {
        const P = Math.round(C / _ * 100);
        A.push({ name: "Failed at Booking", value: C }), F.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: C,
          label: `${C.toLocaleString()} (${P}%)`
        });
      }
      if (Object.keys(N).length > 0) {
        const P = Object.values(N).reduce((I, j) => I + j, 0), L = C - P;
        if (Object.entries(N).filter(([, I]) => I > 0).sort(([, I], [, j]) => j - I).forEach(([I, j]) => {
          const K = Math.round(j / _ * 100);
          A.push({ name: `Failed: ${I}`, value: j }), F.push({
            source: "Failed at Booking",
            target: `Failed: ${I}`,
            value: j,
            label: `${j.toLocaleString()} (${K}%)`
          });
        }), L > 0) {
          const I = Math.round(L / _ * 100);
          A.push({ name: "Failed: Without Reason", value: L }), F.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: L,
            label: `${L.toLocaleString()} (${I}%)`
          });
        }
      }
      const T = k - S;
      if (T > 0) {
        const P = Math.round(T / _ * 100);
        A.push({ name: "Failed at Completion", value: T }), F.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: T,
          label: `${T.toLocaleString()} (${P}%)`
        });
      }
      return { nodes: A, links: F };
    }), p = {
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
    }, f = D(() => p), h = (_, w) => !w || w === 0 ? "0%" : `${Math.round(_ / w * 100)}%`, b = (_, w) => {
      const k = H(_), S = h(_, w);
      return `${k} (${S})`;
    }, v = (_) => _ == null ? 0 : typeof _ == "number" ? _ : Array.isArray(_) ? _.reduce((w, k) => w + (k.total_value || 0), 0) : 0, m = (_) => lt(v(_));
    return t({ isDark: o }), (_, w) => (y(), x("article", lv, [
      c("header", cv, [
        c("div", dv, [
          w[1] || (w[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          a.loading ? W("", !0) : (y(), x("div", uv, [
            w[0] || (w[0] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            u.value.length > 0 ? (y(), x("div", hv, [
              (y(!0), x(q, null, Z(u.value, (k) => (y(), x("p", {
                key: k.currency,
                class: "currency-breakdown-item"
              }, M(k.currency) + " " + M(B(lt)(k.total_value)), 1))), 128))
            ])) : (y(), x("p", fv, M(m(a.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", gv, [...w[2] || (w[2] = [
        X('<div class="loading-container" data-v-601b983a><div class="chart-flow-loader" data-v-601b983a><div class="flow-line flow-1" data-v-601b983a></div><div class="flow-line flow-2" data-v-601b983a></div><div class="flow-line flow-3" data-v-601b983a></div><div class="flow-line flow-4" data-v-601b983a></div><div class="flow-line flow-5" data-v-601b983a></div></div><p class="loading-text" data-v-601b983a>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", pv, [
        g.value.nodes.length > 0 ? (y(), x("section", bv, [
          c("div", vv, [
            Q(ce, {
              data: g.value,
              "node-colors": f.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", mv, [...w[3] || (w[3] = [
          X('<div class="empty-state-content" data-v-601b983a><div class="empty-icon-wrapper" data-v-601b983a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-601b983a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-601b983a></path></svg></div><p class="empty-title" data-v-601b983a>No sales data available</p><p class="empty-description" data-v-601b983a>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        r.value && r.value.length > 0 ? (y(), x("section", _v, [
          c("div", yv, [
            c("table", xv, [
              w[4] || (w[4] = c("thead", null, [
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
              c("tbody", kv, [
                (y(!0), x(q, null, Z(r.value, (k) => (y(), x("tr", {
                  key: k.date,
                  class: "table-row"
                }, [
                  c("td", wv, M(B(Tt)(k.date).format("DD/MM/YYYY")), 1),
                  c("td", Sv, M(B(H)(k.seller_conversations || 0)), 1),
                  c("td", Mv, M(b(k.sell_started_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", $v, M(b(k.sell_get_quote_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", Cv, M(b(k.sell_booking_created_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", Dv, M(b(k.sell_success_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", Av, [
                    Array.isArray(k.daily_value_sell_success) && k.daily_value_sell_success.length > 0 ? (y(), x("div", Tv, [
                      (y(!0), x(q, null, Z(k.daily_value_sell_success, (S) => (y(), x("span", {
                        key: `${k.date}-${S.currency}`
                      }, M(S.currency) + " " + M(B(lt)(S.total_value)), 1))), 128))
                    ])) : (y(), x("span", Bv, M(m(k.daily_value_sell_success)), 1))
                  ]),
                  c("td", Fv, [
                    k.reasons && k.reasons.length > 0 ? (y(), x("div", Lv, [
                      (y(!0), x(q, null, Z(k.reasons, (S) => (y(), x("div", {
                        key: S.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", Pv, M(S.reason) + ":", 1),
                        c("span", Ev, M(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Rv, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : W("", !0)
      ]))
    ]));
  }
}), Iv = /* @__PURE__ */ tt(Ov, [["__scopeId", "data-v-601b983a"]]), zv = { class: "top-agents-card" }, Nv = {
  key: 0,
  class: "card-body"
}, Wv = {
  key: 0,
  class: "chart-section"
}, Hv = {
  key: 1,
  class: "empty-state"
}, Vv = { class: "empty-state-content" }, jv = { class: "empty-icon-wrapper" }, Yv = {
  key: 1,
  class: "loading-state"
}, qv = /* @__PURE__ */ st({
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
    }, n = e, i = s, o = (g) => {
      i("export", g);
    }, { isDark: r, colors: l } = rt(ot(n, "theme")), d = D(() => {
      const p = (n.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const f = p.reduce(
        (v, m) => v + (Number(m.conversations) || 0),
        0
      ), h = p.map((v) => {
        const m = v.agent_type?.toLowerCase();
        return a[m] || "#94a3b8";
      }), b = h.map((v) => `${v}80`);
      return {
        labels: p.map((v) => {
          const m = Number(v.conversations) || 0, _ = f ? m / f * 100 : 0;
          return `${v.agent_type} - ${m.toLocaleString()} (${_.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((v) => v.conversations),
            backgroundColor: b,
            borderColor: h,
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
            label: (g) => {
              const p = (g.label || "").toString().split(" - ")[0], f = Number(g.parsed) || 0, h = (g.dataset.data || []).reduce(
                (v, m) => v + (Number(m) || 0),
                0
              ), b = h ? f / h * 100 : 0;
              return `${p}: ${f.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (g, p) => (y(), x("article", zv, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Yv, [...p[2] || (p[2] = [
        X('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Nv, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Wv, [
          Q(Ts, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", Hv, [
          c("div", Vv, [
            c("div", jv, [
              Q(B(Zf), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Uv = /* @__PURE__ */ tt(qv, [["__scopeId", "data-v-501bf4c4"]]), Kv = { class: "payment-method-card" }, Xv = { class: "card-header" }, Gv = { class: "header-content" }, Zv = {
  key: 0,
  class: "stats-badge"
}, Qv = {
  key: 0,
  class: "currency-breakdown-list"
}, Jv = {
  key: 1,
  class: "badge-value"
}, tm = {
  key: 0,
  class: "loading-state"
}, em = {
  key: 1,
  class: "card-body"
}, sm = {
  key: 0,
  class: "payment-methods-section"
}, am = { class: "payment-methods-grid" }, nm = { class: "payment-card-content" }, im = { class: "payment-card-header" }, om = {
  key: 0,
  class: "currency-cell-list"
}, rm = { class: "payment-badge-wrapper" }, lm = {
  key: 1,
  class: "empty-state"
}, cm = { class: "empty-state-content" }, dm = { class: "empty-icon-wrapper" }, um = {
  key: 2,
  class: "table-section"
}, hm = { class: "table-wrapper" }, fm = { class: "data-table" }, gm = { class: "table-body" }, pm = { class: "table-cell font-medium" }, bm = { class: "table-cell text-center" }, vm = { class: "table-cell text-center success-value" }, mm = {
  key: 0,
  class: "currency-cell-list"
}, _m = { key: 1 }, ym = { class: "table-cell" }, xm = { class: "payment-tags" }, km = { class: "tag-name" }, wm = {
  key: 0,
  class: "tag-amount"
}, Sm = {
  key: 1,
  class: "tag-amount"
}, Mm = { class: "tag-count" }, $m = {
  key: 3,
  class: "empty-table-state"
}, Cm = "Not Registered", Dm = /* @__PURE__ */ st({
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
    const a = e, n = s, { isDark: i } = rt(ot(a, "theme")), o = pt(!1), r = pt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = D(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = D(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = D(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((C, T) => Tt(C.date).valueOf() - Tt(T.date).valueOf())), g = (C) => {
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
      const T = (C.payment_method_breakdown || []).map((L) => ({
        payment_method: L.payment_method || "Unknown",
        total_amount: L.total_amount ?? 0,
        count: L.count ?? 0,
        total_amount_by_currency: L.total_amount_by_currency ?? []
      })), P = (C.payment_method_by_day || []).map((L) => ({
        date: L.date || "",
        total_count: L.total_count ?? 0,
        total_amount: L.total_amount ?? 0,
        total_amount_by_currency: L.total_amount_by_currency ?? [],
        payment_methods: (L.payment_methods || []).map((I) => ({
          payment_method: I.payment_method || "Unknown",
          total_amount: I.total_amount ?? 0,
          count: I.count ?? 0,
          total_amount_by_currency: I.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: C.airline_name || a.airlineName,
        start_date: C.start_date || "",
        end_date: C.end_date || "",
        total_conversations: C.total_conversations ?? 0,
        total_amount: C.total_amount ?? 0,
        total_amount_by_currency: C.total_amount_by_currency ?? [],
        payment_method_breakdown: T,
        payment_method_by_day: P
      };
    }, p = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        o.value = !0;
        try {
          const [C, T] = a.dates.map((L) => Tt(L).format("YYYY-MM-DD")), P = await a.fetchFunction(a.airlineName, C, T);
          r.value = g(P);
        } catch (C) {
          console.error("Error fetching payment method metrics:", C), r.value = g(null);
        } finally {
          o.value = !1;
        }
      }
    }, f = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], h = (C) => {
      const T = f[C % f.length];
      return {
        background: T.bg,
        borderColor: T.border
      };
    }, b = (C) => ({ color: f[C % f.length].text }), v = (C) => ({ color: f[C % f.length].value }), m = (C) => ({ color: f[C % f.length].icon }), _ = (C) => ({ color: f[C % f.length].badge }), w = (C) => {
      const P = $(C).length;
      return P > 18 ? { fontSize: "0.75rem" } : P > 15 ? { fontSize: "0.875rem" } : P > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, k = (C) => {
      const T = C?.toLowerCase() || "";
      return !C || T === "unknown" ? tg : T.includes("credit") || T.includes("debit") ? qn : T.includes("cash") || T.includes("efectivo") ? Xf : T.includes("bank") || T.includes("transfer") ? Gf : T.includes("zelle") || T.includes("pago") || T.includes("movil") ? Jf : T.includes("wallet") ? eg : Qf;
    }, S = (C) => !C || C.toLowerCase() === "unknown" ? Cm : C.replace(/_/g, " "), $ = (C) => C == null ? "$0.00" : lt(C), A = (C) => C ? Tt(C).format("DD/MM/YYYY") : "-", F = (C) => C == null || Number.isNaN(Number(C)) ? 0 : Number(C), R = (C) => {
      n("export", C);
    };
    function N() {
      const C = a.data;
      C && (Array.isArray(C.payment_method_breakdown) && C.payment_method_breakdown.length > 0 || Array.isArray(C.payment_method_by_day) && C.payment_method_by_day.length > 0) && (o.value = !1, r.value = g(C));
    }
    return Ze(() => {
      a.data ? N() : p();
    }), zt(
      () => a.data,
      (C) => {
        C && N();
      },
      { deep: !0 }
    ), zt(
      () => a.dates,
      (C) => {
        a.data || C && C[0] && C[1] && p();
      },
      { deep: !0 }
    ), t({ isDark: i }), (C, T) => (y(), x("article", Kv, [
      c("header", Xv, [
        c("div", Gv, [
          T[1] || (T[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !o.value && r.value.total_amount ? (y(), x("div", Zv, [
            T[0] || (T[0] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", Qv, [
              (y(!0), x(q, null, Z(r.value.total_amount_by_currency, (P) => (y(), x("p", {
                key: P.currency,
                class: "currency-breakdown-item"
              }, M(P.currency) + " " + M($(P.total_value)), 1))), 128))
            ])) : (y(), x("p", Jv, M($(r.value.total_amount)), 1))
          ])) : W("", !0)
        ])
      ]),
      o.value ? (y(), x("div", tm, [...T[2] || (T[2] = [
        X('<div class="loading-container" data-v-e740c06b><div class="chart-lines-loader" data-v-e740c06b><div class="line line-1" data-v-e740c06b></div><div class="line line-2" data-v-e740c06b></div><div class="line line-3" data-v-e740c06b></div><div class="line line-4" data-v-e740c06b></div><div class="line line-5" data-v-e740c06b></div></div><p class="loading-text" data-v-e740c06b>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", em, [
        l.value ? (y(), x("section", sm, [
          T[3] || (T[3] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", am, [
            (y(!0), x(q, null, Z(r.value.payment_method_breakdown, (P, L) => (y(), x("div", {
              key: P.payment_method,
              class: "payment-method-card-item",
              style: wt(h(L))
            }, [
              c("div", nm, [
                c("div", im, [
                  (y(), gt(ti(k(P.payment_method)), {
                    class: "payment-icon",
                    style: wt(m(L))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: wt(b(L))
                  }, M(S(P.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: wt([v(L), w(P.total_amount)])
                }, M($(P.total_amount)), 5),
                P.total_amount_by_currency && P.total_amount_by_currency.length > 0 ? (y(), x("div", om, [
                  (y(!0), x(q, null, Z(P.total_amount_by_currency, (I) => (y(), x("span", {
                    key: `${P.payment_method}-${I.currency}`
                  }, M(I.currency) + " " + M($(I.total_value)), 1))), 128))
                ])) : W("", !0),
                c("div", rm, [
                  c("span", {
                    class: "payment-badge",
                    style: wt(_(L))
                  }, M(F(P.count)) + " " + M(F(P.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", lm, [
          c("div", cm, [
            c("div", dm, [
              Q(B(qn), { class: "empty-icon" })
            ]),
            T[4] || (T[4] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            T[5] || (T[5] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", um, [
          T[8] || (T[8] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", hm, [
            c("table", fm, [
              T[7] || (T[7] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", gm, [
                (y(!0), x(q, null, Z(u.value, (P) => (y(), x("tr", {
                  key: P.date,
                  class: "table-row"
                }, [
                  c("td", pm, M(A(P.date)), 1),
                  c("td", bm, M(B(H)(P.total_count ?? 0)), 1),
                  c("td", vm, [
                    P.total_amount_by_currency && P.total_amount_by_currency.length > 0 ? (y(), x("div", mm, [
                      (y(!0), x(q, null, Z(P.total_amount_by_currency, (L) => (y(), x("span", {
                        key: `${P.date}-${L.currency}`
                      }, M(L.currency) + " " + M($(L.total_value)), 1))), 128))
                    ])) : (y(), x("span", _m, M($(P.total_amount)), 1))
                  ]),
                  c("td", ym, [
                    c("div", xm, [
                      (y(!0), x(q, null, Z(P.payment_methods || [], (L) => (y(), x("div", {
                        key: L.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", km, M(S(L.payment_method)), 1),
                        T[6] || (T[6] = c("span", { class: "tag-separator" }, "•", -1)),
                        !L.total_amount_by_currency || L.total_amount_by_currency.length === 0 ? (y(), x("span", wm, M($(L.total_amount)), 1)) : (y(), x("span", Sm, M(L.total_amount_by_currency.map((I) => `${I.currency} ${$(I.total_value)}`).join(" / ")), 1)),
                        c("span", Mm, "(" + M(F(L.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: R,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : l.value ? (y(), x("div", $m, [...T[9] || (T[9] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : W("", !0)
      ]))
    ]));
  }
}), Am = /* @__PURE__ */ tt(Dm, [["__scopeId", "data-v-e740c06b"]]), Tm = { class: "agent-human-conv-card" }, Bm = {
  key: 0,
  class: "loading-state"
}, Fm = {
  key: 1,
  class: "card-body"
}, Lm = { class: "summary-cards" }, Pm = { class: "summary-card assigned-card" }, Em = { class: "summary-card-content" }, Rm = { class: "card-content" }, Om = { class: "card-value assigned-value" }, Im = { class: "card-content" }, zm = { class: "card-value assigned-value" }, Nm = { class: "summary-card closed-card" }, Wm = { class: "summary-card-content" }, Hm = { class: "card-content" }, Vm = { class: "card-value closed-value" }, jm = { class: "card-content" }, Ym = { class: "card-value closed-value" }, qm = {
  key: 0,
  class: "agents-section"
}, Um = { class: "date-header" }, Km = { class: "date-title" }, Xm = { class: "date-stats" }, Gm = { class: "stat-item assigned-stat" }, Zm = { class: "stat-value" }, Qm = { class: "stat-value" }, Jm = { class: "stat-item closed-stat" }, t1 = { class: "stat-value" }, e1 = { class: "stat-value" }, s1 = { class: "table-wrapper" }, a1 = { class: "data-table" }, n1 = { class: "table-body" }, i1 = { class: "table-cell name-cell" }, o1 = { class: "table-cell email-cell" }, r1 = { class: "table-cell text-center" }, l1 = { class: "metric-cell-content" }, c1 = { class: "badge assigned-badge" }, d1 = { class: "metric-cell-avg" }, u1 = { class: "table-cell text-center" }, h1 = { class: "metric-cell-content" }, f1 = { class: "badge closed-badge" }, g1 = { class: "metric-cell-avg" }, p1 = {
  key: 1,
  class: "empty-state"
}, b1 = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (v) => {
      n("export", v);
    }, { isDark: o } = rt(ot(a, "theme")), r = D(() => a.data?.agents_by_day && a.data.agents_by_day.length > 0), l = D(() => {
      if (!r.value) return {};
      const v = {};
      for (const w of a.data.agents_by_day)
        v[w.date] || (v[w.date] = []), v[w.date].push(w);
      const m = Object.keys(v).sort((w, k) => new Date(w).getTime() - new Date(k).getTime()), _ = {};
      for (const w of m)
        _[w] = v[w];
      return _;
    }), d = (v) => v == null ? "0" : H(v), u = (v) => {
      if (v == null)
        return "AVG";
      if (v < 60)
        return `${Math.round(v)}s`;
      const m = Math.round(v), _ = Math.floor(m / 60), w = m % 60;
      if (_ < 60)
        return `${_}m ${w}s`;
      const k = Math.floor(_ / 60), S = _ % 60;
      return `${k}h ${S}m`;
    }, g = (v) => {
      const m = new Date(v), _ = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return m.toLocaleDateString("en-US", _);
    }, p = (v) => v[0]?.day_total_assigned ?? 0, f = (v) => v[0]?.day_total_closed ?? 0, h = (v) => v[0]?.day_avg_time_to_assign_seconds ?? null, b = (v) => v[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: o }), (v, m) => (y(), x("article", Tm, [
      m[11] || (m[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Bm, [...m[0] || (m[0] = [
        X('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", Fm, [
        c("div", Lm, [
          c("div", Pm, [
            m[3] || (m[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", Em, [
              c("div", Rm, [
                m[1] || (m[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", Om, M(d(e.data.total_assigned)), 1)
              ]),
              c("div", Im, [
                m[2] || (m[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", zm, M(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", Nm, [
            m[6] || (m[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", Wm, [
              c("div", Hm, [
                m[4] || (m[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", Vm, M(d(e.data.total_closed)), 1)
              ]),
              c("div", jm, [
                m[5] || (m[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", Ym, M(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", qm, [
          (y(!0), x(q, null, Z(l.value, (_, w) => (y(), x("div", {
            key: w,
            class: "date-group"
          }, [
            c("div", Um, [
              c("h4", Km, M(g(w)), 1),
              c("div", Xm, [
                c("span", Gm, [
                  c("span", Zm, M(d(p(_))), 1),
                  m[7] || (m[7] = Jt(" Assigned ", -1)),
                  c("span", Qm, M(u(h(_))), 1)
                ]),
                c("span", Jm, [
                  c("span", t1, M(d(f(_))), 1),
                  m[8] || (m[8] = Jt(" Closed ", -1)),
                  c("span", e1, M(u(b(_))), 1)
                ])
              ])
            ]),
            c("div", s1, [
              c("table", a1, [
                m[9] || (m[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", n1, [
                  (y(!0), x(q, null, Z(_, (k) => (y(), x("tr", {
                    key: `${w}-${k.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", i1, M(k.agent_name || "-"), 1),
                    c("td", o1, M(k.agent_email), 1),
                    c("td", r1, [
                      c("div", l1, [
                        c("span", c1, M(d(k.assigned_count)), 1),
                        c("span", d1, M(u(k.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", u1, [
                      c("div", h1, [
                        c("span", f1, M(d(k.closed_count)), 1),
                        c("span", g1, M(u(k.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", p1, [...m[10] || (m[10] = [
          X('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), v1 = /* @__PURE__ */ tt(b1, [["__scopeId", "data-v-6cfba83b"]]), m1 = { class: "channel-metrics-card" }, _1 = {
  key: 0,
  class: "card-body"
}, y1 = {
  key: 0,
  class: "kpi-grid"
}, x1 = { class: "kpi-label" }, k1 = { class: "kpi-value" }, w1 = { class: "kpi-card total-card" }, S1 = { class: "kpi-value" }, M1 = {
  key: 1,
  class: "chart-section"
}, $1 = {
  key: 2,
  class: "empty-state"
}, C1 = {
  key: 1,
  class: "loading-state"
}, D1 = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (p) => {
      n("export", p);
    }, { isDark: o, colors: r } = rt(ot(a, "theme")), l = pt({ labels: [], datasets: [] }), d = D(() => a.data ?? {
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
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
    })), g = (p) => {
      if (!p || !p.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const f = p.channels_by_day, h = Object.keys(f).sort();
      if (h.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const b = /* @__PURE__ */ new Set();
      for (const w of Object.values(f))
        for (const k of Object.keys(w))
          b.add(k);
      const v = Array.from(b), m = {
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
      }, _ = v.map((w) => {
        const k = w.toLowerCase(), S = m[k] || "#9ca3af";
        return {
          label: w.toUpperCase(),
          data: h.map(($) => f[$]?.[w] || 0),
          borderColor: S,
          backgroundColor: `${S}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: S,
          pointBorderColor: S,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: h.map((w) => Tt(w).format("MMM DD")),
        datasets: _
      };
    };
    return zt(
      () => a.data,
      (p) => {
        g(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (p, f) => (y(), x("article", m1, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      a.loading ? (y(), x("div", C1, [...f[2] || (f[2] = [
        X('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", _1, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", y1, [
          (y(!0), x(q, null, Z(Object.keys(d.value.total_by_channel), (h) => (y(), x("div", {
            class: "kpi-card",
            key: h
          }, [
            c("span", x1, M(h.toUpperCase()), 1),
            c("span", k1, M(B(H)(d.value.total_by_channel[h])), 1)
          ]))), 128)),
          c("div", w1, [
            f[0] || (f[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", S1, M(B(H)(d.value.total_conversations)), 1)
          ])
        ])) : W("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", M1, [
          Q(le, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", $1, [...f[1] || (f[1] = [
          X('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), A1 = /* @__PURE__ */ tt(D1, [["__scopeId", "data-v-82f175d2"]]), T1 = { class: "triage-combinations-card" }, B1 = { class: "card-header" }, F1 = { class: "total-badge" }, L1 = {
  key: 0,
  class: "card-body"
}, P1 = { class: "chart-container" }, E1 = { class: "table-container" }, R1 = { class: "table-row" }, O1 = { class: "table-row" }, I1 = { class: "table-cell text-center count-cell" }, z1 = { class: "table-cell text-center count-cell" }, N1 = { class: "table-cell text-center count-cell" }, W1 = { class: "table-cell text-center count-cell" }, H1 = { class: "table-cell text-center count-cell" }, V1 = {
  key: 1,
  class: "empty-state"
}, j1 = { class: "empty-state-content" }, Y1 = { class: "empty-icon-wrapper" }, q1 = {
  key: 1,
  class: "loading-state"
}, U1 = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (m) => {
      n("export", m);
    }, { isDark: o, colors: r } = rt(ot(a, "theme")), l = D(() => {
      const m = a.data?.combinations || {}, _ = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [w, k] of Object.entries(m)) {
        const S = w.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const $ = S.filter((A) => A !== "triage").length;
        $ >= 4 ? _["4p"] += Number(k) || 0 : _[$] += Number(k) || 0;
      }
      return _;
    }), d = D(() => {
      const m = l.value;
      return m[0] + m[1] + m[2] + m[3] + m["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), g = D(() => {
      const m = d.value;
      if (!m) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const _ = l.value;
      return {
        pct0: _[0] / m * 100,
        pct1: _[1] / m * 100,
        pct2: _[2] / m * 100,
        pct3: _[3] / m * 100,
        pct4p: _["4p"] / m * 100
      };
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
    }, f = (m) => m?.replace("80", "") || "#888888", h = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [g.value.pct0],
          backgroundColor: p.c0,
          borderColor: f(p.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [g.value.pct1],
          backgroundColor: p.c1,
          borderColor: f(p.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [g.value.pct2],
          backgroundColor: p.c2,
          borderColor: f(p.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [g.value.pct3],
          backgroundColor: p.c3,
          borderColor: f(p.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [g.value.pct4p],
          backgroundColor: p.c4p,
          borderColor: f(p.c4p),
          borderWidth: 1
        }
      ]
    })), b = D(() => ({
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
            label: (m) => `${m.dataset.label} intent(s): ${Number(m.raw || 0).toFixed(0)}%`
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
    })), v = (m) => `${(Number(m) || 0).toFixed(0)}`;
    return t({ isDark: o }), (m, _) => (y(), x("article", T1, [
      c("header", B1, [
        _[0] || (_[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", F1, " Total: " + M(d.value), 1)
      ]),
      e.loading ? (y(), x("div", q1, [..._[6] || (_[6] = [
        X('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", L1, [
        u.value ? (y(), x(q, { key: 0 }, [
          c("div", P1, [
            Q(re, {
              data: h.value,
              options: b.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", E1, [
            _[3] || (_[3] = X('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", R1, [
              _[1] || (_[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: wt({ color: f(p.c0) })
              }, M(v(g.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: wt({ color: f(p.c1) })
              }, M(v(g.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: wt({ color: f(p.c2) })
              }, M(v(g.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: wt({ color: f(p.c3) })
              }, M(v(g.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: wt({ color: f(p.c4p) })
              }, M(v(g.value.pct4p)) + "% ", 5)
            ]),
            c("div", O1, [
              _[2] || (_[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", I1, M(B(H)(l.value[0])), 1),
              c("div", z1, M(B(H)(l.value[1])), 1),
              c("div", N1, M(B(H)(l.value[2])), 1),
              c("div", W1, M(B(H)(l.value[3])), 1),
              c("div", H1, M(B(H)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ], 64)) : (y(), x("div", V1, [
          c("div", j1, [
            c("div", Y1, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            _[4] || (_[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            _[5] || (_[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), K1 = /* @__PURE__ */ tt(U1, [["__scopeId", "data-v-cb93cda2"]]), X1 = { class: "select-language-card" }, G1 = { class: "card-header" }, Z1 = { class: "header-content" }, Q1 = {
  key: 0,
  class: "total-badge"
}, J1 = { class: "badge-value" }, t_ = {
  key: 0,
  class: "loading-state"
}, e_ = {
  key: 1,
  class: "card-body"
}, s_ = {
  key: 0,
  class: "pie-section"
}, a_ = {
  key: 1,
  class: "empty-state"
}, n_ = /* @__PURE__ */ st({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(ot(s, "theme")), i = [
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
    ], o = {
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
    }, r = (f) => o[f]?.label || f.toUpperCase(), l = D(
      () => s.data?.items && s.data.items.length > 0
    ), d = D(
      () => (s.data?.items || []).reduce((f, h) => f + h.count, 0)
    ), u = D(() => {
      const f = {};
      for (const h of s.data?.items || [])
        f[h.language] = (f[h.language] || 0) + h.count;
      return Object.entries(f).map(([h, b]) => ({ language: h, count: b })).sort((h, b) => b.count - h.count);
    }), g = D(() => ({
      labels: u.value.map((f) => r(f.language)),
      datasets: [{
        data: u.value.map((f) => f.count),
        backgroundColor: u.value.map((f, h) => i[h % i.length] + "80"),
        borderColor: u.value.map((f, h) => i[h % i.length]),
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
            label: (f) => {
              const h = f.raw || 0, b = d.value > 0 ? (h / d.value * 100).toFixed(1) : "0";
              return ` ${f.label}: ${h} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (f, h) => (y(), x("article", X1, [
      c("header", G1, [
        c("div", Z1, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          s.loading ? W("", !0) : (y(), x("div", Q1, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", J1, M(B(H)(d.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", t_, [...h[2] || (h[2] = [
        X('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", e_, [
        l.value ? (y(), x("section", s_, [
          Q(Ts, {
            data: g.value,
            options: p.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", a_, [...h[3] || (h[3] = [
          X('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), i_ = /* @__PURE__ */ tt(n_, [["__scopeId", "data-v-216eadc2"]]), o_ = { class: "guardrails-card" }, r_ = { class: "card-header" }, l_ = { class: "header-content" }, c_ = {
  key: 0,
  class: "total-badge"
}, d_ = { class: "badge-value" }, u_ = {
  key: 0,
  class: "loading-state"
}, h_ = {
  key: 1,
  class: "card-body"
}, f_ = { class: "summary-card" }, g_ = { class: "summary-items" }, p_ = { class: "summary-item" }, b_ = { class: "summary-value" }, v_ = { class: "summary-pct" }, m_ = { class: "summary-item" }, __ = { class: "summary-pct" }, y_ = { class: "summary-item" }, x_ = { class: "summary-value" }, k_ = { class: "summary-pct" }, w_ = {
  key: 0,
  class: "table-section"
}, S_ = { class: "table-wrapper" }, M_ = { class: "data-table" }, $_ = { class: "table-body" }, C_ = { class: "table-cell font-medium text-center" }, D_ = { class: "table-cell text-center font-semibold" }, A_ = { class: "table-cell" }, T_ = { class: "type-badges-row" }, B_ = {
  key: 1,
  class: "empty-state"
}, F_ = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (h) => {
      n("export", h);
    }, { isDark: o } = rt(ot(a, "theme")), r = D(
      () => a.data?.items && a.data.items.length > 0
    ), l = D(
      () => (a.data?.items || []).reduce((h, b) => h + b.count, 0)
    ), d = (h) => {
      const b = {};
      for (const _ of a.data?.items || [])
        b[_[h]] = (b[_[h]] || 0) + _.count;
      const v = Object.entries(b).sort((_, w) => w[1] - _[1]);
      if (v.length === 0) return { name: "—", pct: 0 };
      const m = l.value;
      return {
        name: v[0][0],
        pct: m > 0 ? Math.round(v[0][1] / m * 100) : 0
      };
    }, u = D(() => d("guardrail_type")), g = D(() => d("guardrail_action")), p = D(() => d("guardrail_source")), f = D(() => {
      const h = {};
      for (const b of a.data?.items || [])
        h[b.date] || (h[b.date] = {}), h[b.date][b.guardrail_type] = (h[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(h).map(([b, v]) => ({
        date: b,
        total: Object.values(v).reduce((m, _) => m + _, 0),
        types: Object.entries(v).map(([m, _]) => ({ type: m, count: _ })).sort((m, _) => _.count - m.count)
      })).sort((b, v) => new Date(b.date).getTime() - new Date(v.date).getTime());
    });
    return t({ isDark: o }), (h, b) => (y(), x("article", o_, [
      c("header", r_, [
        c("div", l_, [
          b[1] || (b[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          a.loading ? W("", !0) : (y(), x("div", c_, [
            b[0] || (b[0] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", d_, M(B(H)(l.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", u_, [...b[2] || (b[2] = [
        X('<div class="loading-container" data-v-3db385ab><div class="chart-bars-loader" data-v-3db385ab><div class="bar bar-1" data-v-3db385ab></div><div class="bar bar-2" data-v-3db385ab></div><div class="bar bar-3" data-v-3db385ab></div><div class="bar bar-4" data-v-3db385ab></div><div class="bar bar-5" data-v-3db385ab></div></div><p class="loading-text" data-v-3db385ab>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", h_, [
        r.value ? (y(), x(q, { key: 0 }, [
          c("div", f_, [
            c("div", g_, [
              c("div", p_, [
                b[3] || (b[3] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", b_, M(u.value.name), 1),
                c("span", v_, "(" + M(u.value.pct) + "%)", 1)
              ]),
              b[6] || (b[6] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", m_, [
                b[4] || (b[4] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: Qt(["summary-value", `summary-action-${g.value.name.toLowerCase()}`])
                }, M(g.value.name), 3),
                c("span", __, "(" + M(g.value.pct) + "%)", 1)
              ]),
              b[7] || (b[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", y_, [
                b[5] || (b[5] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", x_, M(p.value.name), 1),
                c("span", k_, "(" + M(p.value.pct) + "%)", 1)
              ])
            ])
          ]),
          f.value.length > 0 ? (y(), x("section", w_, [
            b[9] || (b[9] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", S_, [
              c("table", M_, [
                b[8] || (b[8] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", $_, [
                  (y(!0), x(q, null, Z(f.value, (v) => (y(), x("tr", {
                    key: v.date,
                    class: "table-row"
                  }, [
                    c("td", C_, M(B(Tt)(v.date).format("DD/MM")), 1),
                    c("td", D_, M(B(H)(v.total)), 1),
                    c("td", A_, [
                      c("div", T_, [
                        (y(!0), x(q, null, Z(v.types, (m) => (y(), x("span", {
                          key: m.type,
                          class: "type-count-badge"
                        }, M(m.type) + " (" + M(m.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            e.enableExport ? (y(), gt(B(yt), {
              key: 0,
              onExport: i,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : W("", !0)
          ])) : W("", !0)
        ], 64)) : (y(), x("section", B_, [...b[10] || (b[10] = [
          X('<div class="empty-state-content" data-v-3db385ab><div class="empty-icon-wrapper" data-v-3db385ab><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3db385ab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-3db385ab></path></svg></div><p class="empty-title" data-v-3db385ab>No guardrail events</p><p class="empty-description" data-v-3db385ab>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), L_ = /* @__PURE__ */ tt(F_, [["__scopeId", "data-v-3db385ab"]]), P_ = { class: "dn-metrics-card" }, E_ = { class: "card-header" }, R_ = { class: "header-content" }, O_ = {
  key: 0,
  class: "total-docs-badge"
}, I_ = { class: "badge-value" }, z_ = {
  key: 0,
  class: "loading-state"
}, N_ = {
  key: 1,
  class: "card-body"
}, W_ = { class: "kpi-grid" }, H_ = { class: "kpi-card kpi-neutral" }, V_ = { class: "kpi-value" }, j_ = { class: "kpi-card kpi-success" }, Y_ = { class: "kpi-value kpi-value-success" }, q_ = { class: "kpi-pct" }, U_ = { class: "kpi-card kpi-danger" }, K_ = { class: "kpi-value kpi-value-error" }, X_ = { class: "kpi-pct" }, G_ = { class: "kpi-card kpi-warning" }, Z_ = { class: "kpi-value kpi-value-reason" }, Q_ = { class: "kpi-pct" }, J_ = { class: "chart-section" }, ty = { class: "chart-wrapper" }, ey = {
  key: 1,
  class: "empty-chart"
}, sy = {
  key: 0,
  class: "table-section"
}, ay = { class: "table-wrapper" }, ny = { class: "data-table" }, iy = { class: "table-body" }, oy = { class: "table-cell text-left font-medium" }, ry = { class: "table-cell text-center font-semibold" }, ly = { class: "table-cell text-center" }, cy = { class: "impact-bar-container" }, dy = { class: "impact-label" }, uy = {
  key: 1,
  class: "chart-section"
}, hy = { class: "chart-wrapper" }, fy = { class: "system-health" }, gy = { class: "system-health-content" }, py = { class: "sys-kpi-grid" }, by = { class: "sys-kpi" }, vy = { class: "sys-value" }, my = { class: "sys-kpi" }, _y = { class: "sys-value" }, yy = { class: "sys-kpi" }, xy = { class: "sys-value sys-error" }, ky = { class: "sys-kpi" }, wy = { class: "sys-value" }, Sy = { class: "sys-kpi" }, My = { class: "sys-value" }, $y = { class: "sys-kpi" }, Cy = { class: "sys-value sys-error" }, Dy = {
  key: 1,
  class: "empty-state"
}, Ay = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (k) => {
      n("export", k);
    }, { isDark: o, colors: r } = rt(ot(a, "theme")), l = D(() => {
      const k = a.data?.documentCounts?.items || [], S = a.data?.processingCounts?.items || [];
      return k.length > 0 || S.length > 0;
    }), d = D(() => {
      const k = a.data?.documentCounts?.items || [];
      return {
        processing_started: k.reduce((S, $) => S + $.processing_started, 0),
        processing_completed: k.reduce((S, $) => S + $.processing_completed, 0),
        processing_failed: k.reduce((S, $) => S + $.processing_failed, 0),
        row_count_total: k.reduce((S, $) => S + $.row_count_total, 0)
      };
    }), u = D(() => {
      const k = a.data?.processingCounts?.items || [];
      return {
        processing_started: k.reduce((S, $) => S + $.processing_started, 0),
        processing_success: k.reduce((S, $) => S + $.processing_success, 0),
        notification_sent: k.reduce((S, $) => S + $.notification_sent, 0),
        notification_failed: k.reduce((S, $) => S + $.notification_failed, 0),
        dq_phone: k.reduce((S, $) => S + $.dq_error_phone_not_found, 0),
        dq_flight: k.reduce((S, $) => S + $.dq_error_flight_not_found, 0),
        dq_booking: k.reduce((S, $) => S + $.dq_error_booking_not_found, 0),
        dq_other: k.reduce((S, $) => S + $.dq_error_other, 0),
        totalDqErrors: k.reduce((S, $) => S + $.dq_error_phone_not_found + $.dq_error_flight_not_found + $.dq_error_booking_not_found + $.dq_error_other, 0)
      };
    }), g = D(() => d.value.row_count_total || u.value.processing_started), p = D(() => Math.max(0, g.value - u.value.notification_sent)), f = (k, S) => S ? `${Math.round(k / S * 100)}%` : "0%", h = D(() => {
      const k = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, $) => $.count - S.count);
      return k.length > 0 ? k[0] : { reason: "None", count: 0 };
    }), b = D(() => {
      const k = g.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((S) => ({
        ...S,
        impactPct: k > 0 ? Math.round(S.count / k * 100) : 0
      }));
    }), v = D(() => {
      const k = g.value, S = u.value.processing_success, $ = Math.max(0, S - u.value.totalDqErrors), A = u.value.notification_sent, F = Math.max(0, k - S), R = u.value.totalDqErrors, N = Math.max(0, $ - A), C = (L, I) => {
        const j = I > 0 ? Math.round(L / I * 100) : 0;
        return `${L.toLocaleString()} (${j}%)`;
      }, T = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], P = [];
      return S > 0 && P.push({ source: "Records Detected", target: "Valid Reservations", value: S, label: C(S, k) }), F > 0 && P.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: F, label: C(F, k) }), $ > 0 && P.push({ source: "Valid Reservations", target: "Contactable", value: $, label: C($, k) }), R > 0 && P.push({ source: "Valid Reservations", target: "Data Quality Issues", value: R, label: C(R, k) }), A > 0 && P.push({ source: "Contactable", target: "Notified", value: A, label: C(A, k) }), N > 0 && P.push({ source: "Contactable", target: "Not Delivered", value: N, label: C(N, k) }), { nodes: T, links: P };
    }), m = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, _ = D(() => {
      const k = [...a.data?.processingCounts?.items || []].sort(
        (C, T) => new Date(C.date).getTime() - new Date(T.date).getTime()
      ), S = a.data?.documentCounts?.items || [], $ = {};
      for (const C of S)
        $[C.date] = ($[C.date] || 0) + C.row_count_total;
      const A = [.../* @__PURE__ */ new Set([...k.map((C) => C.date), ...S.map((C) => C.date)])].sort(), F = A.map((C) => Tt(C).format("MMM DD")), R = A.map((C) => {
        const T = k.find((I) => I.date === C), P = T?.notification_sent || 0, L = $[C] || T?.processing_started || 0;
        return L > 0 ? Math.round(P / L * 100) : 0;
      }), N = A.map((C) => k.find((P) => P.date === C)?.notification_sent || 0);
      return {
        labels: F,
        datasets: [
          {
            label: "Success Rate (%)",
            data: R,
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
            data: N,
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
    }), w = D(() => ({
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
          borderColor: o.value ? "rgba(198,125,255,0.2)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (k) => k.datasetIndex === 0 ? ` Success Rate: ${k.raw}%` : ` Notifications: ${k.raw}`
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
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (k) => k + "%" },
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
    return t({ isDark: o }), (k, S) => (y(), x("article", P_, [
      c("header", E_, [
        c("div", R_, [
          S[1] || (S[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          a.loading ? W("", !0) : (y(), x("div", O_, [
            S[0] || (S[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", I_, M(B(H)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", z_, [...S[2] || (S[2] = [
        X('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", N_, [
        l.value ? (y(), x(q, { key: 0 }, [
          c("div", W_, [
            c("div", H_, [
              S[3] || (S[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", V_, M(B(H)(g.value)), 1)
            ]),
            c("div", j_, [
              S[4] || (S[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", Y_, M(B(H)(u.value.notification_sent)), 1),
              c("span", q_, M(f(u.value.notification_sent, g.value)), 1)
            ]),
            c("div", U_, [
              S[5] || (S[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", K_, M(B(H)(p.value)), 1),
              c("span", X_, M(f(p.value, g.value)), 1)
            ]),
            c("div", G_, [
              S[6] || (S[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", Z_, M(h.value.reason), 1),
              c("span", Q_, M(B(H)(h.value.count)) + " cases", 1)
            ])
          ]),
          c("section", J_, [
            S[8] || (S[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", ty, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (y(), gt(ce, {
                key: 0,
                data: v.value,
                "node-colors": m,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", ey, [...S[7] || (S[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          b.value.length > 0 ? (y(), x("section", sy, [
            S[10] || (S[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", ay, [
              c("table", ny, [
                S[9] || (S[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", iy, [
                  (y(!0), x(q, null, Z(b.value, ($) => (y(), x("tr", {
                    key: $.reason,
                    class: "table-row"
                  }, [
                    c("td", oy, M($.reason), 1),
                    c("td", ry, M(B(H)($.count)), 1),
                    c("td", ly, [
                      c("div", cy, [
                        c("div", {
                          class: "impact-bar",
                          style: wt({ width: $.impactPct + "%" })
                        }, null, 4),
                        c("span", dy, M($.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : W("", !0),
          _.value.labels.length > 0 ? (y(), x("section", uy, [
            S[11] || (S[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", hy, [
              Q(le, {
                data: _.value,
                options: w.value
              }, null, 8, ["data", "options"])
            ])
          ])) : W("", !0),
          c("details", fy, [
            S[18] || (S[18] = c("summary", { class: "system-health-toggle" }, [
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
              Jt(" System Health Details ")
            ], -1)),
            c("div", gy, [
              c("div", py, [
                c("div", by, [
                  S[12] || (S[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", vy, M(B(H)(d.value.processing_started)), 1)
                ]),
                c("div", my, [
                  S[13] || (S[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", _y, M(B(H)(d.value.processing_completed)), 1)
                ]),
                c("div", yy, [
                  S[14] || (S[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", xy, M(B(H)(d.value.processing_failed)), 1)
                ]),
                c("div", ky, [
                  S[15] || (S[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", wy, M(B(H)(u.value.processing_started)), 1)
                ]),
                c("div", Sy, [
                  S[16] || (S[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", My, M(B(H)(u.value.processing_success)), 1)
                ]),
                c("div", $y, [
                  S[17] || (S[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", Cy, M(B(H)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 2,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ], 64)) : (y(), x("section", Dy, [...S[19] || (S[19] = [
          X('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ty = /* @__PURE__ */ tt(Ay, [["__scopeId", "data-v-d8baf32c"]]), By = { class: "nps-daily-card" }, Fy = { class: "card-header" }, Ly = { class: "header-content" }, Py = {
  key: 0,
  class: "stats-badge"
}, Ey = { class: "badge-value" }, Ry = {
  key: 0,
  class: "loading-state"
}, Oy = {
  key: 1,
  class: "card-body"
}, Iy = { class: "tooltip-content" }, zy = { class: "tooltip-title" }, Ny = { class: "tooltip-stats" }, Wy = { class: "tooltip-stat-row" }, Hy = { class: "tooltip-value" }, Vy = { class: "tooltip-stat-row" }, jy = { class: "tooltip-value" }, Yy = { class: "tooltip-stat-row" }, qy = { class: "tooltip-value" }, Uy = { class: "tooltip-stat-row" }, Ky = { class: "tooltip-value" }, Xy = { class: "tooltip-stat-row" }, Gy = { class: "tooltip-value" }, Zy = { class: "tooltip-stat-row" }, Qy = { class: "tooltip-value" }, Jy = {
  key: 2,
  class: "empty-state"
}, Un = 400, Ee = 60, Kn = 90, Xn = 120, t2 = {
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
    const a = s, n = (v) => {
      a("export", v);
    }, i = e, { isDark: o } = rt(ot(i, "theme")), r = D(() => i.data), l = pt(null), d = pt({
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
      const v = r.value.nps_by_day.length;
      return Math.max(800, Ee * 2 + v * Xn);
    }), g = (v, m) => {
      const w = (v - 1) / 9;
      return Ee + m - w * m;
    }, p = (v) => v ? Tt(v).format("DD-MM-YYYY") : "", f = D(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const v = [], m = Un - Ee - Kn;
      return r.value.nps_by_day.forEach((_, w) => {
        const k = _.min_score || 0, S = _.q1_score || 0, $ = _.median_score || 0, A = _.q3_score || 0, F = _.max_score || 0, R = _.average_score || 0;
        v.push({
          label: p(_.date),
          responseCount: _.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: S,
          median: $,
          q3: A,
          high: F,
          average: R,
          highY: g(F, m),
          lowY: g(k, m),
          q1Y: g(S, m),
          q3Y: g(A, m),
          medianY: g($, m),
          averageY: R > 0 ? g(R, m) : null,
          centerX: Ee + (w + 1) * Xn
        });
      }), v;
    }), h = (v, m) => {
      if (!l.value || !m || m.horizontal) return;
      const _ = l.value.getBoundingClientRect(), w = v.clientX, k = v.clientY, S = 140, $ = 160, A = 10, F = 15;
      let R = w - _.left - S / 2, N = k - _.top - $ - F;
      R = Math.max(A, Math.min(R, _.width - S - A)), N < A && (N = k - _.top + F), N = Math.max(A, Math.min(N, _.height - $ - A)), d.value = {
        visible: !0,
        x: R,
        y: N,
        date: m.label || "",
        min: m.low !== void 0 ? m.low.toFixed(1) : "N/A",
        max: m.high !== void 0 ? m.high.toFixed(1) : "N/A",
        q1: m.open !== void 0 ? m.open.toFixed(1) : "N/A",
        avg: m.average !== void 0 && m.average > 0 ? m.average.toFixed(1) : "N/A",
        q3: m.close !== void 0 ? m.close.toFixed(1) : "N/A",
        median: m.median !== void 0 ? m.median.toFixed(1) : "N/A"
      };
    }, b = () => {
      d.value.visible = !1;
    };
    return t({ isDark: o }), (v, m) => (y(), x("article", By, [
      c("header", Fy, [
        c("div", Ly, [
          m[1] || (m[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", Py, [
            m[0] || (m[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", Ey, M(r.value.nps_by_day.length), 1)
          ])) : W("", !0)
        ])
      ]),
      i.loading ? (y(), x("div", Ry, [...m[2] || (m[2] = [
        X('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", Oy, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          f.value && f.value.length > 0 ? (y(), gt(Qi, {
            key: 0,
            "candlestick-data": f.value,
            "chart-width": u.value,
            "chart-height": Un,
            "chart-margin": Ee,
            "chart-bottom-margin": Kn,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: h,
            onCandleLeave: b
          }, null, 8, ["candlestick-data", "chart-width"])) : W("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: wt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", Iy, [
              c("div", zy, M(d.value.date), 1),
              m[9] || (m[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", Ny, [
                c("div", Wy, [
                  m[3] || (m[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", Hy, M(d.value.min), 1)
                ]),
                c("div", Vy, [
                  m[4] || (m[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", jy, M(d.value.q1), 1)
                ]),
                c("div", Yy, [
                  m[5] || (m[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", qy, M(d.value.median), 1)
                ]),
                c("div", Uy, [
                  m[6] || (m[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", Ky, M(d.value.avg), 1)
                ]),
                c("div", Xy, [
                  m[7] || (m[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", Gy, M(d.value.q3), 1)
                ]),
                c("div", Zy, [
                  m[8] || (m[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", Qy, M(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : W("", !0)
        ], 512),
        e.enableExport ? (y(), gt(B(yt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : W("", !0)
      ])) : (y(), x("div", Jy, [...m[10] || (m[10] = [
        X('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, to = /* @__PURE__ */ tt(t2, [["__scopeId", "data-v-b20112a7"]]), e2 = { class: "nps-overview-card" }, s2 = { class: "card-header" }, a2 = { class: "header-content" }, n2 = { class: "header-badges" }, i2 = {
  key: 0,
  class: "stats-badge"
}, o2 = { class: "badge-value" }, r2 = {
  key: 1,
  class: "stats-badge"
}, l2 = { class: "badge-value" }, c2 = {
  key: 0,
  class: "loading-state"
}, d2 = {
  key: 1,
  class: "card-body"
}, u2 = { class: "chart-wrapper" }, h2 = {
  key: 2,
  class: "empty-state"
}, f2 = 500, g2 = 60, p2 = 80, b2 = {
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
    }, i = e, { isDark: o } = rt(ot(i, "theme")), r = D(() => i.data), l = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: o }), (d, u) => (y(), x("article", e2, [
      c("header", s2, [
        c("div", a2, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", n2, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", i2, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", o2, M(r.value.total_nps_responses), 1)
            ])) : W("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", r2, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", l2, M(r.value.p95_score || 0), 1)
            ])) : W("", !0)
          ])
        ])
      ]),
      i.loading ? (y(), x("div", c2, [...u[3] || (u[3] = [
        X('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", d2, [
        c("div", u2, [
          Q(Ji, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": f2,
            "chart-margin": g2,
            "chart-bottom-margin": p2
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), gt(B(yt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : W("", !0)
      ])) : (y(), x("div", h2, [...u[4] || (u[4] = [
        X('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, eo = /* @__PURE__ */ tt(b2, [["__scopeId", "data-v-30fe5f88"]]), v2 = { class: "nps-metrics-container" }, m2 = {
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
    return (n, i) => (y(), x("div", v2, [
      Q(eo, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      Q(to, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, _2 = /* @__PURE__ */ tt(m2, [["__scopeId", "data-v-25fe3b80"]]), y2 = { class: "aws-cost-card" }, x2 = { class: "card-header" }, k2 = { class: "header-main" }, w2 = { class: "header-content" }, S2 = { class: "card-title" }, M2 = { class: "header-stats" }, $2 = { class: "stat-badge primary" }, C2 = { class: "stat-value" }, D2 = { class: "stat-badge secondary" }, A2 = { class: "stat-value" }, T2 = { class: "card-body" }, B2 = {
  key: 0,
  class: "loading-state"
}, F2 = {
  key: 1,
  class: "chart-section"
}, L2 = { class: "chart-container" }, P2 = {
  key: 2,
  class: "empty-state"
}, E2 = { class: "empty-state-content" }, R2 = { class: "empty-icon-wrapper" }, O2 = {
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
    const t = e, { isDark: s, colors: a } = rt(ot(t, "theme")), n = D(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, u = Array.isArray(l) && l.length > 0, g = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let p = [];
      return u ? p = l : g && (p = d.map((f, h) => ({
        date: f,
        allocated_cost: r.allocatedCostSeries[h] ?? 0,
        aws_cost: r.awsCostSeries[h] ?? 0,
        airline_conversations: r.airlineConversationsSeries[h] ?? 0
      }))), {
        daily: p,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), i = D(() => {
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
    }), o = D(() => ({
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
            callback: (r) => lt(r)
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
    return (r, l) => (y(), x("article", y2, [
      c("header", x2, [
        c("div", k2, [
          c("div", w2, [
            c("h3", S2, M(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", M2, [
            c("div", $2, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", C2, M(B(lt)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", D2, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", A2, M(B(lt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", T2, [
        e.loading ? (y(), x("div", B2, [...l[3] || (l[3] = [
          X('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", F2, [
          c("div", L2, [
            Q(le, {
              data: i.value,
              options: o.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", P2, [
          c("div", E2, [
            c("div", R2, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, I2 = /* @__PURE__ */ tt(O2, [["__scopeId", "data-v-c023bd59"]]), z2 = { class: "cost-usage-card" }, N2 = {
  key: 0,
  class: "card-body"
}, W2 = {
  key: 0,
  class: "chart-section"
}, H2 = { class: "chart-container" }, V2 = { class: "kpi-grid" }, j2 = { class: "kpi-card" }, Y2 = { class: "kpi-value" }, q2 = { class: "kpi-card" }, U2 = { class: "kpi-value" }, K2 = { class: "kpi-card" }, X2 = { class: "kpi-value" }, G2 = { class: "kpi-card" }, Z2 = { class: "kpi-value" }, Q2 = { class: "kpi-card" }, J2 = { class: "kpi-value" }, tx = { class: "kpi-card highlighted" }, ex = { class: "kpi-value gradient-text" }, sx = {
  key: 1,
  class: "empty-state"
}, ax = { class: "empty-state-content" }, nx = { class: "empty-icon-wrapper" }, ix = {
  key: 1,
  class: "loading-state"
}, ox = /* @__PURE__ */ st({
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
    const a = e, { isDark: n, colors: i } = rt(ot(a, "theme")), o = (h) => {
      const b = new Date(h), v = String(b.getDate()).padStart(2, "0"), m = String(b.getMonth() + 1).padStart(2, "0");
      return `${v}-${m}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.input_cost || 0), 0);
    }), d = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.output_cost || 0), 0);
    }), u = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_read_cost || 0), 0);
    }), g = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_write_cost || 0), 0);
    }), p = D(() => {
      const h = a.data?.costs_by_day || {}, b = Object.keys(h).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const v = b.map((_) => o(_)), m = [
        {
          label: "Input Cost",
          data: b.map((_) => h[_]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((_) => h[_]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((_) => h[_]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((_) => h[_]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
        datasets: m
      };
    }), f = D(() => a.options ? a.options : {
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
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
            label: function(h) {
              let b = h.dataset.label || "";
              return b && (b += ": "), h.parsed.y !== null && (b += lt(h.parsed.y)), b;
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: i.value.textSecondary,
            padding: 8,
            callback: function(h) {
              return lt(h);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, b) => (y(), x("article", z2, [
      b[9] || (b[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ix, [...b[8] || (b[8] = [
        X('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", N2, [
        p.value.labels && p.value.labels.length ? (y(), x("section", W2, [
          c("div", H2, [
            Q(re, {
              data: p.value,
              options: f.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", V2, [
            c("div", j2, [
              b[0] || (b[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", Y2, M(B(lt)(e.data.total_cost)), 1)
            ]),
            c("div", q2, [
              b[1] || (b[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", U2, M(B(lt)(l.value)), 1)
            ]),
            c("div", K2, [
              b[2] || (b[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", X2, M(B(lt)(d.value)), 1)
            ]),
            c("div", G2, [
              b[3] || (b[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", Z2, M(B(lt)(u.value)), 1)
            ]),
            c("div", Q2, [
              b[4] || (b[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", J2, M(B(lt)(g.value)), 1)
            ]),
            c("div", tx, [
              b[5] || (b[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", ex, M(B(lt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", sx, [
          c("div", ax, [
            c("div", nx, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            b[6] || (b[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            b[7] || (b[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), rx = /* @__PURE__ */ tt(ox, [["__scopeId", "data-v-62f96954"]]), lx = { class: "token-usage-card" }, cx = {
  key: 0,
  class: "card-body"
}, dx = {
  key: 0,
  class: "chart-section"
}, ux = { class: "chart-container" }, hx = { class: "kpi-grid" }, fx = { class: "kpi-card" }, gx = { class: "kpi-value" }, px = { class: "kpi-card" }, bx = { class: "kpi-value" }, vx = { class: "kpi-card" }, mx = { class: "kpi-value" }, _x = { class: "kpi-card" }, yx = { class: "kpi-value" }, xx = { class: "kpi-card" }, kx = { class: "kpi-value" }, wx = {
  key: 1,
  class: "empty-state"
}, Sx = { class: "empty-state-content" }, Mx = { class: "empty-icon-wrapper" }, $x = {
  key: 1,
  class: "loading-state"
}, Cx = /* @__PURE__ */ st({
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
    const a = e, { isDark: n, colors: i } = rt(ot(a, "theme")), o = (u) => {
      const g = new Date(u), p = String(g.getDate()).padStart(2, "0"), f = String(g.getMonth() + 1).padStart(2, "0");
      return `${p}-${f}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const u = a.data?.tokens_by_day || {}, g = Object.keys(u).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.map((h) => o(h)), f = [
        {
          label: "Input Tokens",
          data: g.map((h) => u[h]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: g.map((h) => u[h]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: g.map((h) => u[h]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: g.map((h) => u[h]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: f
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
            color: i.value.textSecondary,
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
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: i.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: n }), (u, g) => (y(), x("article", lx, [
      g[8] || (g[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", $x, [...g[7] || (g[7] = [
        X('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", cx, [
        l.value.labels && l.value.labels.length ? (y(), x("section", dx, [
          c("div", ux, [
            Q(re, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", hx, [
            c("div", fx, [
              g[0] || (g[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", gx, M(B(H)(e.data.total_tokens)), 1)
            ]),
            c("div", px, [
              g[1] || (g[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", bx, M(B(H)(e.data.total_input_tokens)), 1)
            ]),
            c("div", vx, [
              g[2] || (g[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", mx, M(B(H)(e.data.total_output_tokens)), 1)
            ]),
            c("div", _x, [
              g[3] || (g[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", yx, M(B(H)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", xx, [
              g[4] || (g[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", kx, M(B(H)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", wx, [
          c("div", Sx, [
            c("div", Mx, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            g[5] || (g[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            g[6] || (g[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Dx = /* @__PURE__ */ tt(Cx, [["__scopeId", "data-v-e9e355be"]]), Ax = { class: "conversation-count-card" }, Tx = { class: "card-header" }, Bx = { class: "header-right" }, Fx = { class: "stat-badge" }, Lx = { class: "stat-value" }, Px = {
  key: 0,
  class: "card-body"
}, Ex = {
  key: 0,
  class: "chart-section"
}, Rx = { class: "chart-container" }, Ox = {
  key: 1,
  class: "empty-state"
}, Ix = { class: "empty-state-content" }, zx = { class: "empty-icon-wrapper" }, Nx = {
  key: 1,
  class: "loading-state"
}, Wx = /* @__PURE__ */ st({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(ot(s, "theme")), i = (l) => {
      const d = new Date(l), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    D(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = i(s.data.start_date), d = i(s.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const o = D(() => {
      const l = s.data?.conversations_by_day || {}, d = Object.keys(l).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const u = d.map((p) => i(p)), g = [
        {
          label: "Conversations",
          data: d.map((p) => l[p] || 0),
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
        datasets: g
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
    return t({ isDark: a }), (l, d) => (y(), x("article", Ax, [
      c("header", Tx, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", Bx, [
          c("div", Fx, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", Lx, M(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", Nx, [...d[4] || (d[4] = [
        X('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Px, [
        o.value.labels && o.value.labels.length ? (y(), x("section", Ex, [
          c("div", Rx, [
            Q(le, {
              data: o.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Ox, [
          c("div", Ix, [
            c("div", zx, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Hx = /* @__PURE__ */ tt(Wx, [["__scopeId", "data-v-846f24b1"]]), Vx = { class: "top-agents-card" }, jx = {
  key: 0,
  class: "card-body"
}, Yx = {
  key: 0,
  class: "charts-grid"
}, qx = { class: "chart-section" }, Ux = { class: "chart-container" }, Kx = { class: "chart-section" }, Xx = { class: "chart-container" }, Gx = {
  key: 1,
  class: "empty-state"
}, Zx = { class: "empty-state-content" }, Qx = { class: "empty-icon-wrapper" }, Jx = {
  key: 1,
  class: "loading-state"
}, tk = /* @__PURE__ */ st({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(ot(s, "theme")), i = D(() => s.data?.top_agents && s.data.top_agents.length > 0), o = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((p, f) => (f.total_cost || 0) - (p.total_cost || 0)) : []), r = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((p, f) => (f.total_tokens || 0) - (p.total_tokens || 0)) : []), l = D(() => {
      const p = o.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((f) => f.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: p.map((f) => f.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = D(() => {
      const p = r.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((f) => f.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: p.map((f) => f.total_tokens || 0),
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const f = p.label, h = s.data?.top_agents?.find((b) => b.agent_type === f);
              return h ? [
                `Total Cost: ${lt(h.total_cost)}`,
                `Input Cost: ${lt(h.total_input_tokens_cost)}`,
                `Output Cost: ${lt(h.total_output_tokens_cost)}`,
                `Cache Read: ${lt(h.total_read_tokens_cost)}`,
                `Cache Write: ${lt(h.total_write_tokens_cost)}`
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
            callback: function(p) {
              return lt(p);
            }
          }
        }
      }
    }), g = D(() => s.options ? s.options : {
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const f = p.label, h = s.data?.top_agents?.find((b) => b.agent_type === f);
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
            callback: function(p) {
              return p.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (p, f) => (y(), x("article", Vx, [
      f[5] || (f[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Jx, [...f[4] || (f[4] = [
        X('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", jx, [
        i.value ? (y(), x("div", Yx, [
          c("section", qx, [
            f[0] || (f[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", Ux, [
              Q(re, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", Kx, [
            f[1] || (f[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", Xx, [
              Q(re, {
                data: d.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", Gx, [
          c("div", Zx, [
            c("div", Qx, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            f[2] || (f[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[3] || (f[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ek = /* @__PURE__ */ tt(tk, [["__scopeId", "data-v-78efa6dc"]]), sk = { class: "top-agents-card" }, ak = {
  key: 0,
  class: "card-body"
}, nk = {
  key: 0,
  class: "chart-section"
}, ik = { class: "chart-container" }, ok = {
  key: 1,
  class: "empty-state"
}, rk = { class: "empty-state-content" }, lk = { class: "empty-icon-wrapper" }, ck = {
  key: 1,
  class: "loading-state"
}, dk = /* @__PURE__ */ st({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(ot(s, "theme")), i = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, o = D(() => s.data?.top_agents ? s.data.top_agents.filter(
      (g) => g.agent_type?.toLowerCase() !== "triage"
    ) : []), r = D(() => o.value.length > 0), l = D(() => o.value.reduce((g, p) => g + (p.conversations || 0), 0)), d = D(() => {
      const g = o.value;
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return (i[v] || "#a78bfa") + "80";
      }), f = g.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return i[v] || "#a78bfa";
      });
      return {
        labels: g.map((b) => {
          const v = b.conversations || 0, m = l.value ? v / l.value * 100 : 0;
          return `${b.agent_type} - ${v.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((b) => b.conversations || 0),
            backgroundColor: p,
            borderColor: f,
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
            label: (g) => {
              const p = (g.label || "").toString(), f = Number(g.parsed) || 0, h = (g.dataset.data || []).reduce((v, m) => v + (Number(m) || 0), 0), b = h ? f / h * 100 : 0;
              return `${p}: ${f.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (g, p) => (y(), x("article", sk, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ck, [...p[2] || (p[2] = [
        X('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", ak, [
        r.value ? (y(), x("section", nk, [
          c("div", ik, [
            Q(Ts, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", ok, [
          c("div", rk, [
            c("div", lk, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), uk = /* @__PURE__ */ tt(dk, [["__scopeId", "data-v-05e3e74d"]]), hk = { class: "daily-cost-trends-card" }, fk = {
  key: 0,
  class: "card-body"
}, gk = {
  key: 0,
  class: "chart-section"
}, pk = { class: "chart-container" }, bk = {
  key: 1,
  class: "empty-state"
}, vk = { class: "empty-state-content" }, mk = { class: "empty-icon-wrapper" }, _k = {
  key: 1,
  class: "loading-state"
}, yk = /* @__PURE__ */ st({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(ot(s, "theme")), i = (d) => {
      const u = new Date(d), g = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${g}`;
    }, o = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = s.costData?.costs_by_day || {}, g = s.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(g).length > 0;
    }), r = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const v = [...d].sort((m, _) => m.date.localeCompare(_.date));
        return {
          labels: v.map((m) => i(m.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((m) => Number(m.value) || 0),
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
      const u = s.costData?.costs_by_day || {}, g = s.conversationData?.conversations_by_day || {}, f = Object.keys(u).filter((v) => g[v]).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const h = f.map((v) => i(v)), b = f.map((v) => {
        const m = u[v]?.total_cost || 0, _ = g[v] || 0;
        return _ > 0 ? m / _ : 0;
      });
      return {
        labels: h,
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
              return u && (u += ": "), d.parsed.y !== null && (u += lt(d.parsed.y)), u;
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
              return lt(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (y(), x("article", hk, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", _k, [...u[2] || (u[2] = [
        X('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", fk, [
        o.value ? (y(), x("section", gk, [
          c("div", pk, [
            Q(le, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", bk, [
          c("div", vk, [
            c("div", mk, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), xk = /* @__PURE__ */ tt(yk, [["__scopeId", "data-v-e5bac1c5"]]), kk = { class: "model-usage-card" }, wk = {
  key: 0,
  class: "loading-state"
}, Sk = {
  key: 1,
  class: "card-body"
}, Mk = { class: "tabs-container" }, $k = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, Ck = ["aria-selected"], Dk = ["aria-selected"], Ak = {
  key: 0,
  class: "table-section"
}, Tk = { class: "table-wrapper" }, Bk = { class: "data-table" }, Fk = { class: "table-header-row" }, Lk = { class: "table-header" }, Pk = { class: "table-body" }, Ek = { class: "table-cell name-cell" }, Rk = { class: "table-cell text-center" }, Ok = { class: "table-cell text-center" }, Ik = { class: "table-cell text-center" }, zk = { class: "table-cell text-center cost-cell" }, Nk = { class: "table-cell text-center" }, Wk = {
  key: 1,
  class: "empty-state"
}, Hk = { class: "empty-state-content" }, Vk = { class: "empty-icon-wrapper" }, jk = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (g) => {
      n("export", g);
    }, { isDark: o } = rt(ot(a, "theme")), r = pt("by_model"), l = D(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = (g) => g == null ? "0" : H(g), u = (g) => g == null ? "$0.00" : lt(g);
    return t({ isDark: o }), (g, p) => (y(), x("article", kk, [
      p[10] || (p[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", wk, [...p[2] || (p[2] = [
        X('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", Sk, [
        c("div", Mk, [
          c("nav", $k, [
            c("button", {
              onClick: p[0] || (p[0] = (f) => r.value = "by_model"),
              class: Qt(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, Ck),
            c("button", {
              onClick: p[1] || (p[1] = (f) => r.value = "by_provider"),
              class: Qt(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, Dk)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", Ak, [
          c("div", Tk, [
            c("table", Bk, [
              c("thead", null, [
                c("tr", Fk, [
                  c("th", Lk, M(r.value === "by_model" ? "Model" : "Provider"), 1),
                  p[3] || (p[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  p[4] || (p[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  p[5] || (p[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  p[6] || (p[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  p[7] || (p[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", Pk, [
                (y(!0), x(q, null, Z(l.value, (f, h) => (y(), x("tr", {
                  key: h,
                  class: "table-row"
                }, [
                  c("td", Ek, M(h), 1),
                  c("td", Rk, M(u(f.avg_cost_per_message)), 1),
                  c("td", Ok, M(d(f.avg_tokens_per_message)), 1),
                  c("td", Ik, M(d(f.message_count)), 1),
                  c("td", zk, M(u(f.total_cost)), 1),
                  c("td", Nk, M(d(f.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", Wk, [
          c("div", Hk, [
            c("div", Vk, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            p[8] || (p[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            p[9] || (p[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Yk = /* @__PURE__ */ tt(jk, [["__scopeId", "data-v-a7bf2d7b"]]), qk = { class: "message-roles-card" }, Uk = {
  key: 0,
  class: "loading-state"
}, Kk = {
  key: 1,
  class: "card-body"
}, Xk = {
  key: 0,
  class: "table-section"
}, Gk = { class: "table-wrapper" }, Zk = { class: "data-table" }, Qk = { class: "table-body" }, Jk = { class: "table-cell name-cell" }, t5 = { class: "table-cell text-center" }, e5 = { class: "table-cell text-center" }, s5 = { class: "table-cell text-center" }, a5 = { class: "table-cell text-center cost-cell" }, n5 = { class: "table-cell text-center" }, i5 = {
  key: 1,
  class: "empty-state"
}, o5 = { class: "empty-state-content" }, r5 = { class: "empty-icon-wrapper" }, l5 = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (f) => {
      n("export", f);
    }, { isDark: o } = rt(ot(a, "theme")), r = ["assistant", "system", "user"], l = D(() => a.data?.total_by_role || {}), d = D(() => Object.keys(l.value).length > 0), u = (f) => f == null ? "0" : H(f), g = (f) => f == null ? "$0.00" : lt(f), p = (f) => f.charAt(0).toUpperCase() + f.slice(1);
    return t({ isDark: o }), (f, h) => (y(), x("article", qk, [
      h[4] || (h[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Uk, [...h[0] || (h[0] = [
        X('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", Kk, [
        d.value ? (y(), x("div", Xk, [
          c("div", Gk, [
            c("table", Zk, [
              h[1] || (h[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Role"),
                  c("th", { class: "table-header" }, "Avg cost per message"),
                  c("th", { class: "table-header" }, "Avg tokens per message"),
                  c("th", { class: "table-header" }, "Message count"),
                  c("th", { class: "table-header" }, "Total cost"),
                  c("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              c("tbody", Qk, [
                (y(), x(q, null, Z(r, (b) => c("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  c("td", Jk, M(p(b)), 1),
                  c("td", t5, M(g(l.value[b]?.avg_cost_per_message)), 1),
                  c("td", e5, M(u(l.value[b]?.avg_tokens_per_message)), 1),
                  c("td", s5, M(u(l.value[b]?.message_count)), 1),
                  c("td", a5, M(g(l.value[b]?.total_cost)), 1),
                  c("td", n5, M(u(l.value[b]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("div", i5, [
          c("div", o5, [
            c("div", r5, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            h[2] || (h[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            h[3] || (h[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), c5 = /* @__PURE__ */ tt(l5, [["__scopeId", "data-v-6a953cfc"]]), d5 = { class: "cost-per-conversation-card" }, u5 = {
  key: 0,
  class: "card-body"
}, h5 = {
  key: 0,
  class: "chart-section"
}, f5 = { class: "chart-container" }, g5 = { class: "kpi-grid" }, p5 = { class: "kpi-card" }, b5 = { class: "kpi-value" }, v5 = { class: "kpi-card" }, m5 = { class: "kpi-value" }, _5 = { class: "kpi-card" }, y5 = { class: "kpi-value" }, x5 = { class: "kpi-card highlighted" }, k5 = { class: "kpi-value gradient-text" }, w5 = {
  key: 1,
  class: "empty-state"
}, S5 = { class: "empty-state-content" }, M5 = { class: "empty-icon-wrapper" }, $5 = {
  key: 1,
  class: "loading-state"
}, C5 = /* @__PURE__ */ st({
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
    const a = e, n = s, i = (_) => {
      n("export", _);
    }, { isDark: o, colors: r } = rt(ot(a, "theme")), l = {
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
    }, d = (_) => _.agent_type || _.agent_id || _.agent_name || "", u = (_) => _.agent_name ? _.agent_name : d(_).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), g = (_) => {
      const w = d(_).toLowerCase();
      for (const [k, S] of Object.entries(l))
        if (w.includes(k))
          return S;
      return "#9ca3af";
    }, p = D(() => [...a.data?.top_agents || []].sort((w, k) => k.avg_cost_per_conversation - w.avg_cost_per_conversation)), f = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((_, w) => _ + w.conversations, 0)), h = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((_, w) => _ + w.total_cost, 0)), b = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : f.value === 0 ? 0 : h.value / f.value), v = D(() => {
      const _ = p.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const w = _.map(($) => u($)), k = _.map(($) => $.avg_cost_per_conversation), S = _.map(($) => g($));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: k,
            backgroundColor: S.map(($) => `${$}80`),
            borderColor: S,
            borderWidth: 1
          }
        ]
      };
    }), m = D(() => a.options ? a.options : {
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
            label: function(_) {
              const w = p.value[_.dataIndex];
              return [
                `Cost: ${lt(_.parsed.x)}`,
                `Conversations: ${H(w.conversations)}`,
                `Total Cost: ${lt(w.total_cost)}`
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
            callback: function(_) {
              return lt(_);
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
    return t({ isDark: o }), (_, w) => (y(), x("article", d5, [
      w[7] || (w[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", $5, [...w[6] || (w[6] = [
        X('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", u5, [
        v.value.labels && v.value.labels.length ? (y(), x("section", h5, [
          c("div", f5, [
            Q(re, {
              data: v.value,
              options: m.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", g5, [
            c("div", p5, [
              w[0] || (w[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", b5, M(p.value.length), 1)
            ]),
            c("div", v5, [
              w[1] || (w[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", m5, M(B(H)(f.value)), 1)
            ]),
            c("div", _5, [
              w[2] || (w[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", y5, M(B(lt)(h.value)), 1)
            ]),
            c("div", x5, [
              w[3] || (w[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", k5, M(B(lt)(b.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), gt(B(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : W("", !0)
        ])) : (y(), x("section", w5, [
          c("div", S5, [
            c("div", M5, [
              Q(B(Lt), { class: "empty-icon" })
            ]),
            w[4] || (w[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            w[5] || (w[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), D5 = /* @__PURE__ */ tt(C5, [["__scopeId", "data-v-17f6615c"]]), A5 = { class: "tabs text-sm" }, T5 = ["aria-label"], B5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], F5 = { class: "flex min-h-9 min-w-0 flex-1 items-center justify-center gap-2 px-3 py-1.5" }, L5 = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, P5 = /* @__PURE__ */ st({
  name: "Tabs",
  __name: "Tabs",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Tabs" }
  },
  emits: ["update:modelValue", "change", "tab-click"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = pt([]), i = `tabs-${Math.random().toString(36).slice(2, 9)}`, o = (h) => `${i}-tab-${h}`, r = D(
      () => s.items.map((h, b) => h.disabled ? -1 : b).filter((h) => h >= 0)
    );
    function l(h) {
      return h.value === s.modelValue;
    }
    function d(h) {
      const b = l(h), v = "relative flex min-w-0 flex-1 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100";
      return h.disabled ? `${v} cursor-not-allowed opacity-40` : b ? `${v} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${v} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(h, b) {
      h === b || s.items.find((m) => m.value === h)?.disabled || (a("update:modelValue", h), a("change", { value: h, previousValue: b }));
    }
    function g(h, b) {
      a("tab-click", { value: h.value, originalEvent: b }), !h.disabled && (u(h.value, s.modelValue), Xt(() => {
        n.value[s.items.indexOf(h)]?.focus();
      }));
    }
    function p(h, b) {
      const v = s.items.length;
      if (v === 0) return 0;
      let m = h;
      for (let _ = 0; _ < v; _++)
        if (m = (m + b + v) % v, !s.items[m]?.disabled) return m;
      return h;
    }
    async function f(h, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(h.key)) return;
      h.preventDefault();
      let m = b;
      h.key === "ArrowLeft" ? m = p(b, -1) : h.key === "ArrowRight" ? m = p(b, 1) : h.key === "Home" ? m = r.value[0] ?? 0 : h.key === "End" && (m = r.value[r.value.length - 1] ?? b);
      const _ = s.items[m];
      !_ || _.disabled || (u(_.value, s.modelValue), await Xt(), n.value[m]?.focus());
    }
    return (h, b) => (y(), x("div", A5, [
      c("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: "flex flex-wrap gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:border-white/[0.06] dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none"
      }, [
        (y(!0), x(q, null, Z(e.items, (v, m) => (y(), x("button", {
          id: o(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: n,
          type: "button",
          role: "tab",
          "aria-selected": l(v),
          "aria-disabled": v.disabled === !0,
          tabindex: l(v) ? 0 : -1,
          class: Qt(d(v)),
          onClick: (_) => g(v, _),
          onKeydown: (_) => f(_, m)
        }, [
          c("span", F5, [
            v.icon ? (y(), gt(ti(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : W("", !0),
            c("span", L5, M(v.label), 1)
          ])
        ], 42, B5))), 128))
      ], 8, T5),
      h.$slots.default ? (y(), gt(io, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: oo(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            gs(h.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : W("", !0)
    ]));
  }
}), E5 = /* @__PURE__ */ tt(P5, [["__scopeId", "data-v-65add5d0"]]), R5 = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-white/[0.06]" }, O5 = { class: "overflow-x-auto" }, I5 = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, z5 = { class: "border-b border-[color:var(--kiut-border-table)] bg-slate-50 dark:bg-[#252528]" }, N5 = {
  key: 0,
  scope: "col",
  class: "w-12 px-3 py-3.5 text-center align-middle"
}, W5 = ["checked", "aria-label"], H5 = {
  key: 0,
  class: "w-12 px-3 py-3.5 text-center align-middle"
}, V5 = ["checked", "aria-label", "onChange"], j5 = /* @__PURE__ */ st({
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
    const s = e, a = t, n = pt(null);
    function i(_) {
      return `cell-${_}`;
    }
    function o(_) {
      return _ === "center" ? "text-center" : _ === "right" ? "text-right" : "text-left";
    }
    function r(_, w) {
      if (typeof s.rowKey == "function")
        return s.rowKey(_);
      const k = _[s.rowKey];
      return k != null ? String(k) : `__index_${w}`;
    }
    function l(_, w) {
      return _[w];
    }
    function d(_) {
      return _ == null || typeof _ == "object" ? "" : String(_);
    }
    function u(_, w) {
      return r(_, w);
    }
    const g = D(() => s.rows.map((_, w) => r(_, w)));
    function p(_, w) {
      const k = r(_, w);
      return s.selectedKeys.includes(k);
    }
    const f = D(() => !s.selectable || s.rows.length === 0 ? !1 : g.value.every((_) => s.selectedKeys.includes(_))), h = D(() => {
      if (!s.selectable || s.rows.length === 0) return !1;
      const _ = g.value.filter((w) => s.selectedKeys.includes(w));
      return _.length > 0 && _.length < s.rows.length;
    });
    zt(
      [h, f, () => s.selectable],
      async () => {
        await Xt();
        const _ = n.value;
        _ && (_.indeterminate = h.value && !f.value);
      },
      { immediate: !0 }
    );
    function b() {
      if (s.selectable)
        if (f.value) {
          const _ = s.selectedKeys.filter((w) => !g.value.includes(w));
          a("update:selectedKeys", _);
        } else {
          const _ = new Set(s.selectedKeys);
          g.value.forEach((w) => _.add(w)), a("update:selectedKeys", [..._]);
        }
    }
    function v(_, w) {
      if (!s.selectable) return;
      const k = r(_, w);
      s.selectedKeys.includes(k) ? a(
        "update:selectedKeys",
        s.selectedKeys.filter(($) => $ !== k)
      ) : a("update:selectedKeys", [...s.selectedKeys, k]);
    }
    function m(_, w) {
      const k = r(_, w);
      return `${s.ariaLabelSelectRow} ${k}`;
    }
    return (_, w) => (y(), x("div", R5, [
      c("div", O5, [
        c("table", I5, [
          c("thead", null, [
            c("tr", z5, [
              e.selectable ? (y(), x("th", N5, [
                c("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: f.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: b
                }, null, 40, W5)
              ])) : W("", !0),
              (y(!0), x(q, null, Z(e.columns, (k) => (y(), x("th", {
                key: k.key,
                scope: "col",
                class: Qt([
                  "px-3 py-3.5 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  o(k.align),
                  k.headerClass ?? ""
                ])
              }, M(k.label), 3))), 128))
            ])
          ]),
          c("tbody", null, [
            (y(!0), x(q, null, Z(e.rows, (k, S) => (y(), x("tr", {
              key: u(k, S),
              class: "border-b border-[color:var(--kiut-border-table-row)] bg-[color:var(--kiut-bg-table)] transition-colors hover:[background:var(--kiut-bg-table-hover)]"
            }, [
              e.selectable ? (y(), x("td", H5, [
                c("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(k, S),
                  "aria-label": m(k, S),
                  onChange: ($) => v(k, S)
                }, null, 40, V5)
              ])) : W("", !0),
              (y(!0), x(q, null, Z(e.columns, ($) => (y(), x("td", {
                key: $.key,
                class: Qt([
                  "px-3 py-3.5 align-middle text-[color:var(--kiut-text-secondary)]",
                  o($.align),
                  $.cellClass ?? ""
                ])
              }, [
                gs(_.$slots, i($.key), {
                  row: k,
                  column: $,
                  value: l(k, $.key)
                }, () => [
                  Jt(M(d(l(k, $.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Y5 = /* @__PURE__ */ tt(j5, [["__scopeId", "data-v-6d1b5df0"]]);
function q5(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function U5(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const K5 = ["aria-label"], X5 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, G5 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Z5 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Q5 = ["aria-label", "onClick"], J5 = ["aria-label", "onClick"], tw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], ew = ["aria-label"], sw = ["aria-label"], aw = {
  key: 1,
  class: "space-y-2"
}, nw = ["for"], iw = ["id", "placeholder", "onKeydown"], ow = ["for"], rw = ["id"], lw = {
  value: "",
  disabled: ""
}, cw = ["value"], dw = { class: "text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, uw = { class: "flex flex-wrap items-end gap-2" }, hw = { class: "min-w-[120px] flex-1" }, fw = ["for"], gw = ["id"], pw = { class: "min-w-[120px] flex-1" }, bw = ["for"], vw = ["id"], mw = /* @__PURE__ */ st({
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
    const s = e, a = t, n = ro(), o = `${`kiut-filters-${Math.random().toString(36).slice(2, 9)}`}-panel`, r = pt(null), l = /* @__PURE__ */ new Map(), d = pt(null), u = pt(!1), g = pt({}), p = pt(null), f = pt(""), h = pt(""), b = pt(""), v = pt(""), m = D(() => d.value ? s.filterDefinitions.find((E) => E.id === d.value) ?? null : null), _ = D(() => {
      const E = m.value;
      if (E)
        return E.type === "text" ? f.value : E.type === "select" ? h.value : { start: b.value, end: v.value };
    });
    function w(E, Y) {
      Y && Y instanceof HTMLElement ? l.set(E, Y) : l.delete(E);
    }
    function k(E) {
      return s.modelValue[E];
    }
    function S(E, Y) {
      if (Y == null) return !0;
      if (E.type === "text" || E.type === "select") return String(Y).trim() === "";
      if (E.type === "dateRange") {
        const U = Y;
        return !U?.start?.trim() || !U?.end?.trim();
      }
      return !0;
    }
    const $ = D(
      () => s.filterDefinitions.some((E) => !S(E, k(E.id)))
    ), A = D(
      () => s.filterDefinitions.filter((E) => !S(E, k(E.id)))
    ), F = D(
      () => s.filterDefinitions.filter((E) => S(E, k(E.id)))
    );
    function R(E) {
      const Y = k(E.id), U = E.label.replace(/^\+\s*/, "");
      if (E.type === "text") return `${U}: ${String(Y ?? "").trim()}`;
      if (E.type === "select") {
        const ya = String(Y ?? ""), so = E.options.find((ao) => ao.value === ya);
        return `${U}: ${so?.label ?? ya}`;
      }
      const _t = Y, Nt = N(_t.start), Pt = N(_t.end);
      return `${U}: ${Nt} – ${Pt}`;
    }
    function N(E) {
      if (!E) return "";
      const Y = Tt(E, "YYYY-MM-DD", !0);
      return Y.isValid() ? Y.format("L") : E;
    }
    function C(E) {
      return d.value === E && u.value ? "border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border-slate-400/90 hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function T(E) {
      const Y = k(E.id);
      if (E.type === "text") {
        f.value = Y != null ? String(Y) : "";
        return;
      }
      if (E.type === "select") {
        h.value = Y != null ? String(Y) : "";
        return;
      }
      const U = Y;
      b.value = U?.start?.trim() ?? "", v.value = U?.end?.trim() ?? "";
    }
    function P(E) {
      if (!E) return;
      p.value = E;
      const Y = E.getBoundingClientRect(), U = 300;
      let _t = Y.left;
      const Nt = window.innerWidth - U - 12;
      _t > Nt && (_t = Math.max(12, Nt)), _t < 12 && (_t = 12);
      const Pt = Y.bottom + 8;
      g.value = {
        top: `${Pt}px`,
        left: `${_t}px`,
        width: `${Math.min(U, window.innerWidth - 24)}px`
      };
    }
    function L(E, Y) {
      if (d.value === E.id && u.value) {
        z();
        return;
      }
      u.value && d.value !== E.id && z(), d.value = E.id, u.value = !0, T(E), Xt().then(async () => {
        P(Y.currentTarget), await Xt(), j();
      });
    }
    function I(E, Y) {
      if (d.value === E.id && u.value) {
        z();
        return;
      }
      u.value && d.value !== E.id && z(), d.value = E.id, u.value = !0, T(E), Xt().then(async () => {
        const U = l.get(E.id) ?? Y.currentTarget;
        P(U), await Xt(), j();
      });
    }
    function j() {
      const E = r.value;
      if (!E) return;
      E.querySelector(
        'input, select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function K() {
      u.value = !1, d.value = null, p.value = null;
    }
    function V(E) {
      const Y = m.value;
      if (!Y) return;
      if (Y.type === "text") {
        f.value = E != null ? String(E) : "";
        return;
      }
      if (Y.type === "select") {
        h.value = E != null ? String(E) : "";
        return;
      }
      const U = E;
      b.value = U?.start?.trim() ?? "", v.value = U?.end?.trim() ?? "";
    }
    function z() {
      const E = m.value;
      if (!E) return;
      if (E.type === "text") {
        const Nt = f.value.trim(), Pt = { ...s.modelValue };
        Nt === "" ? delete Pt[E.id] : Pt[E.id] = Nt, a("update:modelValue", Pt), a("change", Pt), K();
        return;
      }
      if (E.type === "select") {
        const Nt = h.value.trim(), Pt = { ...s.modelValue };
        Nt === "" ? delete Pt[E.id] : Pt[E.id] = Nt, a("update:modelValue", Pt), a("change", Pt), K();
        return;
      }
      const Y = b.value.trim(), U = v.value.trim(), _t = { ...s.modelValue };
      !Y || !U || Y > U ? delete _t[E.id] : _t[E.id] = { start: Y, end: U }, a("update:modelValue", _t), a("change", _t), K();
    }
    function O(E) {
      const Y = { ...s.modelValue };
      delete Y[E], a("update:modelValue", Y), a("change", Y), d.value === E && K();
    }
    function J() {
      const E = {};
      a("update:modelValue", E), a("change", E), K();
    }
    const it = D(() => {
      const E = m.value;
      return E ? `Editar filtro: ${E.label}` : "Filtro";
    });
    function at(E) {
      return `Quitar filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    function ut(E) {
      return `Editar filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    function mt(E) {
      return `Añadir filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    const ct = D(() => s.clearLabel);
    function G(E) {
      if (!u.value || !r.value) return;
      const Y = E.target;
      if (!(r.value.contains(Y) || (Y instanceof Element ? Y : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const _t of l.values())
          if (_t?.contains(Y)) return;
        z();
      }
    }
    function Mt(E) {
      E.key === "Escape" && u.value && (E.preventDefault(), K());
    }
    function ee() {
      !u.value || !p.value || P(p.value);
    }
    return Ze(() => {
      document.addEventListener("mousedown", G, !0), window.addEventListener("keydown", Mt, !0), window.addEventListener("resize", ee);
    }), Jn(() => {
      document.removeEventListener("mousedown", G, !0), window.removeEventListener("keydown", Mt, !0), window.removeEventListener("resize", ee);
    }), zt(
      () => s.modelValue,
      () => {
        const E = m.value;
        E && u.value && !n.panel && T(E);
      },
      { deep: !0 }
    ), (E, Y) => (y(), x("div", {
      class: "kiut-filters font-sans text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      c("div", X5, [
        c("span", G5, M(e.label), 1),
        c("div", Z5, [
          (y(!0), x(q, null, Z(A.value, (U) => (y(), x("div", {
            key: `chip-${U.id}`,
            "data-kiut-filter-chip": "",
            class: "inline-flex max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 py-0.5 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:border-white/[0.08] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            c("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ut(U),
              onClick: (_t) => L(U, _t)
            }, [
              gs(E.$slots, "formatChip", {
                filter: U,
                value: k(U.id)
              }, () => [
                Jt(M(R(U)), 1)
              ])
            ], 8, Q5),
            c("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": at(U),
              onClick: (_t) => O(U.id)
            }, [
              Q(B(U5), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, J5)
          ]))), 128)),
          (y(!0), x(q, null, Z(F.value, (U) => (y(), x("button", {
            key: `add-${U.id}`,
            ref_for: !0,
            ref: (_t) => w(U.id, _t),
            type: "button",
            class: Qt(["inline-flex items-center gap-0.5 rounded-full border-2 border-dashed px-2 py-1 font-medium text-[color:var(--kiut-text-secondary)] transition-colors dark:text-slate-400", C(U.id)]),
            "aria-label": mt(U),
            "aria-expanded": d.value === U.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === U.id ? o : void 0,
            onClick: (_t) => I(U, _t)
          }, [
            Q(B(q5), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            c("span", null, M(U.label), 1)
          ], 10, tw))), 128))
        ]),
        $.value ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": ct.value,
          onClick: J
        }, M(e.clearLabel), 9, ew)) : W("", !0)
      ]),
      (y(), gt(lo, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: o,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": it.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:border-white/[0.08] dark:bg-[#252528]",
          style: wt(g.value),
          onKeydown: Y[4] || (Y[4] = ka(() => {
          }, ["stop"]))
        }, [
          m.value ? (y(), x(q, { key: 0 }, [
            E.$slots.panel ? gs(E.$slots, "panel", {
              key: 0,
              filter: m.value,
              close: z,
              value: _.value,
              updateValue: V
            }) : (y(), x("div", aw, [
              m.value.type === "text" ? (y(), x(q, { key: 0 }, [
                c("label", {
                  for: `${o}-text`,
                  class: "block text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(m.value.label), 9, nw),
                we(c("input", {
                  id: `${o}-text`,
                  "onUpdate:modelValue": Y[0] || (Y[0] = (U) => f.value = U),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: m.value.placeholder ?? "…",
                  onKeydown: co(ka(z, ["prevent"]), ["enter"])
                }, null, 40, iw), [
                  [Bs, f.value]
                ])
              ], 64)) : m.value.type === "select" ? (y(), x(q, { key: 1 }, [
                c("label", {
                  for: `${o}-select`,
                  class: "block text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(m.value.label), 9, ow),
                we(c("select", {
                  id: `${o}-select`,
                  "onUpdate:modelValue": Y[1] || (Y[1] = (U) => h.value = U),
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                }, [
                  c("option", lw, M(m.value.placeholder ?? "Seleccionar…"), 1),
                  (y(!0), x(q, null, Z(m.value.options, (U) => (y(), x("option", {
                    key: U.value,
                    value: U.value
                  }, M(U.label), 9, cw))), 128))
                ], 8, rw), [
                  [uo, h.value]
                ])
              ], 64)) : m.value.type === "dateRange" ? (y(), x(q, { key: 2 }, [
                c("p", dw, M(m.value.label), 1),
                c("div", uw, [
                  c("div", hw, [
                    c("label", {
                      for: `${o}-start`,
                      class: "mb-0.5 block text-[10px] leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, fw),
                    we(c("input", {
                      id: `${o}-start`,
                      "onUpdate:modelValue": Y[2] || (Y[2] = (U) => b.value = U),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, gw), [
                      [Bs, b.value]
                    ])
                  ]),
                  c("div", pw, [
                    c("label", {
                      for: `${o}-end`,
                      class: "mb-0.5 block text-[10px] leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, bw),
                    we(c("input", {
                      id: `${o}-end`,
                      "onUpdate:modelValue": Y[3] || (Y[3] = (U) => v.value = U),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, vw), [
                      [Bs, v.value]
                    ])
                  ])
                ])
              ], 64)) : W("", !0)
            ]))
          ], 64)) : W("", !0)
        ], 44, sw)) : W("", !0)
      ]))
    ], 8, K5));
  }
}), Cw = {
  install(e) {
    e.component("KiutChartBar", re), e.component("KiutChartLine", le), e.component("KiutPieChart", Ts), e.component("KiutBoxplotChart", hh), e.component("KiutCandlestickChart", Qi), e.component("KiutHistogramChart", Ji), e.component("KiutSankeyChart", ce), e.component("KiutAgentsPerDay", yg), e.component("KiutBookingManager", np), e.component("KiutCheckin", Dp), e.component("KiutCheckinMetrics", Jp), e.component("KiutCheckinSegments", $b), e.component("KiutDisruption", c0), e.component("KiutFAQ", C0), e.component("KiutMessagesPerAgent", R0), e.component("KiutRecordLocator", rv), e.component("KiutSeller", Iv), e.component("KiutTopAgents", Uv), e.component("KiutPaymentMethod", Am), e.component("KiutAgentHumanConversations", v1), e.component("KiutChannelMetrics", A1), e.component("KiutTriageCombinations", K1), e.component("KiutSelectLanguage", i_), e.component("KiutGuardrails", L_), e.component("KiutDisruptionNotifier", Ty), e.component("KiutNpsDailyMetrics", to), e.component("KiutNpsMetrics", _2), e.component("KiutNpsOverviewMetrics", eo), e.component("KiutAWSCost", I2), e.component("KiutCostUsage", rx), e.component("KiutTokenUsage", Dx), e.component("KiutConversationCount", Hx), e.component("KiutTopAgentsAnalysis", ek), e.component("KiutTopAgentsPie", uk), e.component("KiutDailyCostTrends", xk), e.component("KiutModelUsage", Yk), e.component("KiutMessageRoles", c5), e.component("KiutCostPerConversations", D5), e.component("Tabs", E5), e.component("Table", Y5), e.component("Filters", mw);
  }
};
export {
  I2 as AWSCost,
  v1 as AgentHumanConversations,
  yg as AgentsPerDay,
  np as BookingManager,
  hh as BoxplotChart,
  Qi as CandlestickChart,
  A1 as ChannelMetrics,
  re as ChartBar,
  le as ChartLine,
  Dp as Checkin,
  Jp as CheckinMetrics,
  $b as CheckinSegments,
  Hx as ConversationCount,
  D5 as CostPerConversations,
  rx as CostUsage,
  xk as DailyCostTrends,
  c0 as Disruption,
  Ty as DisruptionNotifier,
  C0 as FAQ,
  mw as Filters,
  L_ as Guardrails,
  Ji as HistogramChart,
  Cw as KiutUIPlugin,
  c5 as MessageRoles,
  R0 as MessagesPerAgent,
  Yk as ModelUsage,
  to as NpsDailyMetrics,
  _2 as NpsMetrics,
  eo as NpsOverviewMetrics,
  Am as PaymentMethod,
  Ts as PieChart,
  rv as RecordLocator,
  ce as SankeyChart,
  i_ as SelectLanguage,
  Iv as Seller,
  Y5 as Table,
  E5 as Tabs,
  Dx as TokenUsage,
  Uv as TopAgents,
  ek as TopAgentsAnalysis,
  uk as TopAgentsPie,
  K1 as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
