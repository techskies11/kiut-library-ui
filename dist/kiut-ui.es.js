import { defineComponent as at, shallowRef as no, h as ta, ref as ot, onMounted as Ze, onUnmounted as oo, watch as Ht, toRaw as ea, nextTick as Qt, version as fi, isProxy as io, computed as D, toRef as it, openBlock as y, createElementBlock as x, createVNode as J, unref as L, normalizeStyle as xt, createElementVNode as c, toDisplayString as M, createCommentVNode as N, Fragment as K, renderList as Q, onBeforeUnmount as ro, createStaticVNode as G, withDirectives as we, vShow as Aa, normalizeClass as Mt, createBlock as ht, createTextVNode as $t, resolveDynamicComponent as lo, Transition as gi, withCtx as pi, renderSlot as gs, useSlots as vi, Teleport as bi, withModifiers as Ta, withKeys as mi, vModelText as Bs, vModelSelect as _i } from "vue";
import * as Ba from "echarts/core";
import { TooltipComponent as yi, TitleComponent as xi } from "echarts/components";
import { SankeyChart as ki } from "echarts/charts";
import { CanvasRenderer as wi } from "echarts/renderers";
import At from "moment";
function Qe(e) {
  return e + 0.5 | 0;
}
const ae = (e, t, s) => Math.max(Math.min(e, s), t);
function Re(e) {
  return ae(Qe(e * 2.55), 0, 255);
}
function ie(e) {
  return ae(Qe(e * 255), 0, 255);
}
function Zt(e) {
  return ae(Qe(e / 2.55) / 100, 0, 1);
}
function Fa(e) {
  return ae(Qe(e * 100), 0, 100);
}
const Nt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, sa = [..."0123456789ABCDEF"], $i = (e) => sa[e & 15], Mi = (e) => sa[(e & 240) >> 4] + sa[e & 15], Je = (e) => (e & 240) >> 4 === (e & 15), Si = (e) => Je(e.r) && Je(e.g) && Je(e.b) && Je(e.a);
function Ci(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & Nt[e[1]] * 17,
    g: 255 & Nt[e[2]] * 17,
    b: 255 & Nt[e[3]] * 17,
    a: t === 5 ? Nt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: Nt[e[1]] << 4 | Nt[e[2]],
    g: Nt[e[3]] << 4 | Nt[e[4]],
    b: Nt[e[5]] << 4 | Nt[e[6]],
    a: t === 9 ? Nt[e[7]] << 4 | Nt[e[8]] : 255
  })), s;
}
const Di = (e, t) => e < 255 ? t(e) : "";
function Ai(e) {
  var t = Si(e) ? $i : Mi;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Di(e.a, t) : void 0;
}
const Ti = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function co(e, t, s) {
  const a = t * Math.min(s, 1 - s), n = (o, i = (o + e / 30) % 12) => s - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function Bi(e, t, s) {
  const a = (n, o = (n + e / 60) % 6) => s - s * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function Fi(e, t, s) {
  const a = co(e, 1, 0.5);
  let n;
  for (t + s > 1 && (n = 1 / (t + s), t *= n, s *= n), n = 0; n < 3; n++)
    a[n] *= 1 - t - s, a[n] += t;
  return a;
}
function Li(e, t, s, a, n) {
  return e === n ? (t - s) / a + (t < s ? 6 : 0) : t === n ? (s - e) / a + 2 : (e - t) / a + 4;
}
function da(e) {
  const s = e.r / 255, a = e.g / 255, n = e.b / 255, o = Math.max(s, a, n), i = Math.min(s, a, n), r = (o + i) / 2;
  let l, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), l = Li(s, a, n, u, o), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function ua(e, t, s, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, a)).map(ie);
}
function ha(e, t, s) {
  return ua(co, e, t, s);
}
function Pi(e, t, s) {
  return ua(Fi, e, t, s);
}
function Ei(e, t, s) {
  return ua(Bi, e, t, s);
}
function uo(e) {
  return (e % 360 + 360) % 360;
}
function Ri(e) {
  const t = Ti.exec(e);
  let s = 255, a;
  if (!t)
    return;
  t[5] !== a && (s = t[6] ? Re(+t[5]) : ie(+t[5]));
  const n = uo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Pi(n, o, i) : t[1] === "hsv" ? a = Ei(n, o, i) : a = ha(n, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: s
  };
}
function Oi(e, t) {
  var s = da(e);
  s[0] = uo(s[0] + t), s = ha(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function Ii(e) {
  if (!e)
    return;
  const t = da(e), s = t[0], a = Fa(t[1]), n = Fa(t[2]);
  return e.a < 255 ? `hsla(${s}, ${a}%, ${n}%, ${Zt(e.a)})` : `hsl(${s}, ${a}%, ${n}%)`;
}
const La = {
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
}, Pa = {
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
function zi() {
  const e = {}, t = Object.keys(Pa), s = Object.keys(La);
  let a, n, o, i, r;
  for (a = 0; a < t.length; a++) {
    for (i = r = t[a], n = 0; n < s.length; n++)
      o = s[n], r = r.replace(o, La[o]);
    o = parseInt(Pa[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let ts;
function Ni(e) {
  ts || (ts = zi(), ts.transparent = [0, 0, 0, 0]);
  const t = ts[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Wi = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Vi(e) {
  const t = Wi.exec(e);
  let s = 255, a, n, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      s = t[8] ? Re(i) : ae(i * 255, 0, 255);
    }
    return a = +t[1], n = +t[3], o = +t[5], a = 255 & (t[2] ? Re(a) : ae(a, 0, 255)), n = 255 & (t[4] ? Re(n) : ae(n, 0, 255)), o = 255 & (t[6] ? Re(o) : ae(o, 0, 255)), {
      r: a,
      g: n,
      b: o,
      a: s
    };
  }
}
function Hi(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Zt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Fs = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ye = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function ji(e, t, s) {
  const a = ye(Zt(e.r)), n = ye(Zt(e.g)), o = ye(Zt(e.b));
  return {
    r: ie(Fs(a + s * (ye(Zt(t.r)) - a))),
    g: ie(Fs(n + s * (ye(Zt(t.g)) - n))),
    b: ie(Fs(o + s * (ye(Zt(t.b)) - o))),
    a: e.a + s * (t.a - e.a)
  };
}
function es(e, t, s) {
  if (e) {
    let a = da(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * s, t === 0 ? 360 : 1)), a = ha(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function ho(e, t) {
  return e && Object.assign(t || {}, e);
}
function Ea(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ie(e[3]))) : (t = ho(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ie(t.a)), t;
}
function Yi(e) {
  return e.charAt(0) === "r" ? Vi(e) : Ri(e);
}
class He {
  constructor(t) {
    if (t instanceof He)
      return t;
    const s = typeof t;
    let a;
    s === "object" ? a = Ea(t) : s === "string" && (a = Ci(t) || Ni(t) || Yi(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ho(this._rgb);
    return t && (t.a = Zt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Ea(t);
  }
  rgbString() {
    return this._valid ? Hi(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Ai(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Ii(this._rgb) : void 0;
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
    return t && (this._rgb = ji(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new He(this.rgb);
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
    return Oi(this._rgb, t), this;
  }
}
function Kt() {
}
const qi = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function ut(e) {
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
function Ft(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function jt(e, t) {
  return Ft(e) ? e : t;
}
function st(e, t) {
  return typeof e > "u" ? t : e;
}
const Ui = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, fo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function vt(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function ft(e, t, s, a) {
  let n, o, i;
  if (kt(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(s, e[n], n);
  else if (nt(e))
    for (i = Object.keys(e), o = i.length, n = 0; n < o; n++)
      t.call(s, e[i[n]], i[n]);
}
function ps(e, t) {
  let s, a, n, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, a = e.length; s < a; ++s)
    if (n = e[s], o = t[s], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function vs(e) {
  if (kt(e))
    return e.map(vs);
  if (nt(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), a = s.length;
    let n = 0;
    for (; n < a; ++n)
      t[s[n]] = vs(e[s[n]]);
    return t;
  }
  return e;
}
function go(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Ki(e, t, s, a) {
  if (!go(e))
    return;
  const n = t[e], o = s[e];
  nt(n) && nt(o) ? je(n, o, a) : t[e] = vs(o);
}
function je(e, t, s) {
  const a = kt(t) ? t : [
    t
  ], n = a.length;
  if (!nt(e))
    return e;
  s = s || {};
  const o = s.merger || Ki;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = a[r], !nt(i))
      continue;
    const l = Object.keys(i);
    for (let d = 0, u = l.length; d < u; ++d)
      o(l[d], e, i, s);
  }
  return e;
}
function ze(e, t) {
  return je(e, t, {
    merger: Xi
  });
}
function Xi(e, t, s) {
  if (!go(e))
    return;
  const a = t[e], n = s[e];
  nt(a) && nt(n) ? ze(a, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = vs(n));
}
const Ra = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Gi(e) {
  const t = e.split("."), s = [];
  let a = "";
  for (const n of t)
    a += n, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (s.push(a), a = "");
  return s;
}
function Zi(e) {
  const t = Gi(e);
  return (s) => {
    for (const a of t) {
      if (a === "")
        break;
      s = s && s[a];
    }
    return s;
  };
}
function be(e, t) {
  return (Ra[t] || (Ra[t] = Zi(t)))(e);
}
function fa(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ye = (e) => typeof e < "u", re = (e) => typeof e == "function", Oa = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function Qi(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const gt = Math.PI, bt = 2 * gt, Ji = bt + gt, bs = Number.POSITIVE_INFINITY, tr = gt / 180, wt = gt / 2, de = gt / 4, Ia = gt * 2 / 3, po = Math.log10, Ut = Math.sign;
function Ne(e, t, s) {
  return Math.abs(e - t) < s;
}
function za(e) {
  const t = Math.round(e);
  e = Ne(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(po(e))), a = e / s;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * s;
}
function er(e) {
  const t = [], s = Math.sqrt(e);
  let a;
  for (a = 1; a < s; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return s === (s | 0) && t.push(s), t.sort((n, o) => n - o).pop(), t;
}
function sr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function qe(e) {
  return !sr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function ar(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function nr(e, t, s) {
  let a, n, o;
  for (a = 0, n = e.length; a < n; a++)
    o = e[a][s], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Jt(e) {
  return e * (gt / 180);
}
function or(e) {
  return e * (180 / gt);
}
function Na(e) {
  if (!Ft(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function vo(e, t) {
  const s = t.x - e.x, a = t.y - e.y, n = Math.sqrt(s * s + a * a);
  let o = Math.atan2(a, s);
  return o < -0.5 * gt && (o += bt), {
    angle: o,
    distance: n
  };
}
function aa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function ir(e, t) {
  return (e - t + Ji) % bt - gt;
}
function Ot(e) {
  return (e % bt + bt) % bt;
}
function Ue(e, t, s, a) {
  const n = Ot(e), o = Ot(t), i = Ot(s), r = Ot(o - n), l = Ot(i - n), d = Ot(n - o), u = Ot(n - i);
  return n === o || n === i || a && o === i || r > l && d < u;
}
function Tt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function rr(e) {
  return Tt(e, -32768, 32767);
}
function te(e, t, s, a = 1e-6) {
  return e >= Math.min(t, s) - a && e <= Math.max(t, s) + a;
}
function ga(e, t, s) {
  s = s || ((i) => e[i] < t);
  let a = e.length - 1, n = 0, o;
  for (; a - n > 1; )
    o = n + a >> 1, s(o) ? n = o : a = o;
  return {
    lo: n,
    hi: a
  };
}
const pe = (e, t, s, a) => ga(e, s, a ? (n) => {
  const o = e[n][t];
  return o < s || o === s && e[n + 1][t] === s;
} : (n) => e[n][t] < s), lr = (e, t, s) => ga(e, s, (a) => e[a][t] >= s);
function cr(e, t, s) {
  let a = 0, n = e.length;
  for (; a < n && e[a] < t; )
    a++;
  for (; n > a && e[n - 1] > s; )
    n--;
  return a > 0 || n < e.length ? e.slice(a, n) : e;
}
const bo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function dr(e, t) {
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
  }), bo.forEach((s) => {
    const a = "_onData" + fa(s), n = e[s];
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
function Wa(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const a = s.listeners, n = a.indexOf(t);
  n !== -1 && a.splice(n, 1), !(a.length > 0) && (bo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function mo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const _o = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function yo(e, t) {
  let s = [], a = !1;
  return function(...n) {
    s = n, a || (a = !0, _o.call(window, () => {
      a = !1, e.apply(t, s);
    }));
  };
}
function ur(e, t) {
  let s;
  return function(...a) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const pa = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Dt = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, hr = (e, t, s, a) => e === (a ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function fr(e, t, s) {
  const a = t.length;
  let n = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: g, minDefined: p, maxDefined: f } = i.getUserBounds();
    if (p) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        pe(l, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? a : pe(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const _ = l.slice(0, n + 1).reverse().findIndex((b) => !ut(b[r.axis]));
        n -= Math.max(0, _);
      }
      n = Tt(n, 0, a - 1);
    }
    if (f) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        pe(l, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : pe(t, u, i.getPixelForValue(g), !0).hi + 1
      );
      if (d) {
        const b = l.slice(_ - 1).findIndex((v) => !ut(v[r.axis]));
        _ += Math.max(0, b);
      }
      o = Tt(_, n, a) - n;
    } else
      o = a - n;
  }
  return {
    start: n,
    count: o
  };
}
function gr(e) {
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
const ss = (e) => e === 0 || e === 1, Va = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * bt / s)), Ha = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * bt / s) + 1, We = {
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
  easeInSine: (e) => -Math.cos(e * wt) + 1,
  easeOutSine: (e) => Math.sin(e * wt),
  easeInOutSine: (e) => -0.5 * (Math.cos(gt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ss(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ss(e) ? e : Va(e, 0.075, 0.3),
  easeOutElastic: (e) => ss(e) ? e : Ha(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ss(e) ? e : e < 0.5 ? 0.5 * Va(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Ha(e * 2 - 1, 0.1125, 0.45);
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
function va(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ja(e) {
  return va(e) ? e : new He(e);
}
function Ls(e) {
  return va(e) ? e : new He(e).saturate(0.5).darken(0.1).hexString();
}
const pr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], vr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function br(e) {
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
      properties: vr
    },
    numbers: {
      type: "number",
      properties: pr
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
function mr(e) {
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
const Ya = /* @__PURE__ */ new Map();
function _r(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let a = Ya.get(s);
  return a || (a = new Intl.NumberFormat(e, t), Ya.set(s, a)), a;
}
function ba(e, t, s) {
  return _r(t, s).format(e);
}
const yr = {
  values(e) {
    return kt(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let n, o = e;
    if (s.length > 1) {
      const d = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = xr(e, s);
    }
    const i = po(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), ba(e, a, l);
  }
};
function xr(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var xo = {
  formatters: yr
};
function kr(e) {
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
      callback: xo.formatters.values,
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
const me = /* @__PURE__ */ Object.create(null), na = /* @__PURE__ */ Object.create(null);
function Ve(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let a = 0, n = s.length; a < n; ++a) {
    const o = s[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ps(e, t, s) {
  return typeof t == "string" ? je(Ve(e, t), s) : je(Ve(e, ""), t);
}
class wr {
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
    return Ve(this, t);
  }
  describe(t, s) {
    return Ps(na, t, s);
  }
  override(t, s) {
    return Ps(me, t, s);
  }
  route(t, s, a, n) {
    const o = Ve(this, t), i = Ve(this, a), r = "_" + s;
    Object.defineProperties(o, {
      [r]: {
        value: o[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], d = i[n];
          return nt(l) ? Object.assign({}, d, l) : st(l, d);
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
var yt = /* @__PURE__ */ new wr({
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
  br,
  mr,
  kr
]);
function $r(e) {
  return !e || ut(e.size) || ut(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function qa(e, t, s, a, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, s.push(n)), o > a && (a = o), a;
}
function ue(e, t, s) {
  const a = e.currentDevicePixelRatio, n = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - n) * a) / a + n;
}
function Ua(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function oa(e, t, s, a) {
  ko(e, t, s, a, null);
}
function ko(e, t, s, a, n) {
  let o, i, r, l, d, u, h, g;
  const p = t.pointStyle, f = t.rotation, _ = t.radius;
  let b = (f || 0) * tr;
  if (p && typeof p == "object" && (o = p.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, a), e.rotate(b), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        n ? e.ellipse(s, a, n / 2, _, 0, 0, bt) : e.arc(s, a, _, 0, bt), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : _, e.moveTo(s + Math.sin(b) * u, a - Math.cos(b) * _), b += Ia, e.lineTo(s + Math.sin(b) * u, a - Math.cos(b) * _), b += Ia, e.lineTo(s + Math.sin(b) * u, a - Math.cos(b) * _), e.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, l = _ - d, i = Math.cos(b + de) * l, h = Math.cos(b + de) * (n ? n / 2 - d : l), r = Math.sin(b + de) * l, g = Math.sin(b + de) * (n ? n / 2 - d : l), e.arc(s - h, a - r, d, b - gt, b - wt), e.arc(s + g, a - i, d, b - wt, b), e.arc(s + h, a + r, d, b, b + wt), e.arc(s - g, a + i, d, b + wt, b + gt), e.closePath();
        break;
      case "rect":
        if (!f) {
          l = Math.SQRT1_2 * _, u = n ? n / 2 : l, e.rect(s - u, a - l, 2 * u, 2 * l);
          break;
        }
        b += de;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, g = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + g, a - i), e.lineTo(s + h, a + r), e.lineTo(s - g, a + i), e.closePath();
        break;
      case "crossRot":
        b += de;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, g = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + g, a - i), e.lineTo(s - g, a + i);
        break;
      case "star":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, g = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + g, a - i), e.lineTo(s - g, a + i), b += de, h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, g = Math.sin(b) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + g, a - i), e.lineTo(s - g, a + i);
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
function Ke(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function ks(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ws(e) {
  e.restore();
}
function Mr(e, t, s, a, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (n === "middle") {
    const o = (t.x + s.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, s.y);
  } else n === "after" != !!a ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function Sr(e, t, s, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? s.cp2x : s.cp1x, a ? s.cp2y : s.cp1y, s.x, s.y);
}
function Cr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), ut(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Dr(e, t, s, a, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = s - o.actualBoundingBoxAscent, d = s + o.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function Ar(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function Xe(e, t, s, a, n, o = {}) {
  const i = kt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, Cr(e, o), l = 0; l < i.length; ++l)
    d = i[l], o.backdrop && Ar(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), ut(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, s, a, o.maxWidth)), e.fillText(d, s, a, o.maxWidth), Dr(e, s, a, d, o), a += Number(n.lineHeight);
  e.restore();
}
function ms(e, t) {
  const { x: s, y: a, w: n, h: o, radius: i } = t;
  e.arc(s + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * gt, gt, !0), e.lineTo(s, a + o - i.bottomLeft), e.arc(s + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, gt, wt, !0), e.lineTo(s + n - i.bottomRight, a + o), e.arc(s + n - i.bottomRight, a + o - i.bottomRight, i.bottomRight, wt, 0, !0), e.lineTo(s + n, a + i.topRight), e.arc(s + n - i.topRight, a + i.topRight, i.topRight, 0, -wt, !0), e.lineTo(s + i.topLeft, a);
}
const Tr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Br = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Fr(e, t) {
  const s = ("" + e).match(Tr);
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
const Lr = (e) => +e || 0;
function ma(e, t) {
  const s = {}, a = nt(t), n = a ? Object.keys(t) : t, o = nt(e) ? a ? (i) => st(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    s[i] = Lr(o(i));
  return s;
}
function wo(e) {
  return ma(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function $e(e) {
  return ma(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Vt(e) {
  const t = wo(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Bt(e, t) {
  e = e || {}, t = t || yt.font;
  let s = st(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let a = st(e.style, t.style);
  a && !("" + a).match(Br) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const n = {
    family: st(e.family, t.family),
    lineHeight: Fr(st(e.lineHeight, t.lineHeight), s),
    size: s,
    style: a,
    weight: st(e.weight, t.weight),
    string: ""
  };
  return n.string = $r(n), n;
}
function as(e, t, s, a) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function Pr(e, t, s) {
  const { min: a, max: n } = e, o = fo(t, (n - a) / 2), i = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: i(a, -Math.abs(o)),
    max: i(n, o)
  };
}
function _e(e, t) {
  return Object.assign(Object.create(e), t);
}
function _a(e, t = [
  ""
], s, a, n = () => e[0]) {
  const o = s || e;
  typeof a > "u" && (a = Co("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: n,
    override: (r) => _a([
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
      return Mo(r, l, () => Vr(l, t, e, r));
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
      return Xa(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Xa(r);
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
function Se(e, t, s, a) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: $o(e, a),
    setContext: (o) => Se(e, o, s, a),
    override: (o) => Se(e.override(o), t, s, a)
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
      return Mo(o, i, () => Rr(o, i, r));
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
function $o(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: a = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: s,
    indexable: a,
    isScriptable: re(s) ? s : () => s,
    isIndexable: re(a) ? a : () => a
  };
}
const Er = (e, t) => e ? e + fa(t) : t, ya = (e, t) => nt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Mo(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = s();
  return e[t] = a, a;
}
function Rr(e, t, s) {
  const { _proxy: a, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = a[t];
  return re(r) && i.isScriptable(t) && (r = Or(t, r, e, s)), kt(r) && r.length && (r = Ir(t, r, e, i.isIndexable)), ya(t, r) && (r = Se(r, n, o && o[t], i)), r;
}
function Or(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, i || a);
  return r.delete(e), ya(e, l) && (l = xa(n._scopes, n, e, l)), l;
}
function Ir(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = s;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (nt(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const h = xa(d, n, e, u);
      t.push(Se(h, o, i && i[e], r));
    }
  }
  return t;
}
function So(e, t, s) {
  return re(e) ? e(t, s) : e;
}
const zr = (e, t) => e === !0 ? t : typeof e == "string" ? be(t, e) : void 0;
function Nr(e, t, s, a, n) {
  for (const o of t) {
    const i = zr(s, o);
    if (i) {
      e.add(i);
      const r = So(i._fallback, s, n);
      if (typeof r < "u" && r !== s && r !== a)
        return r;
    } else if (i === !1 && typeof a < "u" && s !== a)
      return null;
  }
  return !1;
}
function xa(e, t, s, a) {
  const n = t._rootScopes, o = So(t._fallback, s, a), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = Ka(r, i, s, o || s, a);
  return l === null || typeof o < "u" && o !== s && (l = Ka(r, i, o, l, a), l === null) ? !1 : _a(Array.from(r), [
    ""
  ], n, o, () => Wr(t, s, a));
}
function Ka(e, t, s, a, n) {
  for (; s; )
    s = Nr(e, t, s, a, n);
  return s;
}
function Wr(e, t, s) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const n = a[t];
  return kt(n) && nt(s) ? s : n || {};
}
function Vr(e, t, s, a) {
  let n;
  for (const o of t)
    if (n = Co(Er(o, e), s), typeof n < "u")
      return ya(e, n) ? xa(s, a, e, n) : n;
}
function Co(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const a = s[e];
    if (typeof a < "u")
      return a;
  }
}
function Xa(e) {
  let t = e._keys;
  return t || (t = e._keys = Hr(e._scopes)), t;
}
function Hr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const a of Object.keys(s).filter((n) => !n.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const jr = Number.EPSILON || 1e-14, Ce = (e, t) => t < e.length && !e[t].skip && e[t], Do = (e) => e === "x" ? "y" : "x";
function Yr(e, t, s, a) {
  const n = e.skip ? t : e, o = t, i = s.skip ? t : s, r = aa(o, n), l = aa(i, o);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = a * d, g = a * u;
  return {
    previous: {
      x: o.x - h * (i.x - n.x),
      y: o.y - h * (i.y - n.y)
    },
    next: {
      x: o.x + g * (i.x - n.x),
      y: o.y + g * (i.y - n.y)
    }
  };
}
function qr(e, t, s) {
  const a = e.length;
  let n, o, i, r, l, d = Ce(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (l = d, d = Ce(e, u + 1), !(!l || !d)) {
      if (Ne(t[u], 0, jr)) {
        s[u] = s[u + 1] = 0;
        continue;
      }
      n = s[u] / t[u], o = s[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), s[u] = n * i * t[u], s[u + 1] = o * i * t[u]);
    }
}
function Ur(e, t, s = "x") {
  const a = Do(s), n = e.length;
  let o, i, r, l = Ce(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = l, l = Ce(e, d + 1), !r)
      continue;
    const u = r[s], h = r[a];
    i && (o = (u - i[s]) / 3, r[`cp1${s}`] = u - o, r[`cp1${a}`] = h - o * t[d]), l && (o = (l[s] - u) / 3, r[`cp2${s}`] = u + o, r[`cp2${a}`] = h + o * t[d]);
  }
}
function Kr(e, t = "x") {
  const s = Do(t), a = e.length, n = Array(a).fill(0), o = Array(a);
  let i, r, l, d = Ce(e, 0);
  for (i = 0; i < a; ++i)
    if (r = l, l = d, d = Ce(e, i + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[i] = u !== 0 ? (d[s] - l[s]) / u : 0;
      }
      o[i] = r ? d ? Ut(n[i - 1]) !== Ut(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  qr(e, n, o), Ur(e, o, t);
}
function ns(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function Xr(e, t) {
  let s, a, n, o, i, r = Ke(e[0], t);
  for (s = 0, a = e.length; s < a; ++s)
    i = o, o = r, r = s < a - 1 && Ke(e[s + 1], t), o && (n = e[s], i && (n.cp1x = ns(n.cp1x, t.left, t.right), n.cp1y = ns(n.cp1y, t.top, t.bottom)), r && (n.cp2x = ns(n.cp2x, t.left, t.right), n.cp2y = ns(n.cp2y, t.top, t.bottom)));
}
function Gr(e, t, s, a, n) {
  let o, i, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Kr(e, n);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], l = Yr(d, r, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && Xr(e, s);
}
function ka() {
  return typeof window < "u" && typeof document < "u";
}
function wa(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function _s(e, t, s) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[s])) : a = e, a;
}
const $s = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Zr(e, t) {
  return $s(e).getPropertyValue(t);
}
const Qr = [
  "top",
  "right",
  "bottom",
  "left"
];
function ve(e, t, s) {
  const a = {};
  s = s ? "-" + s : "";
  for (let n = 0; n < 4; n++) {
    const o = Qr[n];
    a[o] = parseFloat(e[t + "-" + o + s]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Jr = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function tl(e, t) {
  const s = e.touches, a = s && s.length ? s[0] : e, { offsetX: n, offsetY: o } = a;
  let i = !1, r, l;
  if (Jr(n, o, e.target))
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
function fe(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: a } = t, n = $s(s), o = n.boxSizing === "border-box", i = ve(n, "padding"), r = ve(n, "border", "width"), { x: l, y: d, box: u } = tl(e, s), h = i.left + (u && r.left), g = i.top + (u && r.top);
  let { width: p, height: f } = t;
  return o && (p -= i.width + r.width, f -= i.height + r.height), {
    x: Math.round((l - h) / p * s.width / a),
    y: Math.round((d - g) / f * s.height / a)
  };
}
function el(e, t, s) {
  let a, n;
  if (t === void 0 || s === void 0) {
    const o = e && wa(e);
    if (!o)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = $s(o), l = ve(r, "border", "width"), d = ve(r, "padding");
      t = i.width - d.width - l.width, s = i.height - d.height - l.height, a = _s(r.maxWidth, o, "clientWidth"), n = _s(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: a || bs,
    maxHeight: n || bs
  };
}
const ne = (e) => Math.round(e * 10) / 10;
function sl(e, t, s, a) {
  const n = $s(e), o = ve(n, "margin"), i = _s(n.maxWidth, e, "clientWidth") || bs, r = _s(n.maxHeight, e, "clientHeight") || bs, l = el(e, t, s);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const g = ve(n, "border", "width"), p = ve(n, "padding");
    d -= p.width + g.width, u -= p.height + g.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, a ? d / a : u - o.height), d = ne(Math.min(d, i, l.maxWidth)), u = ne(Math.min(u, r, l.maxHeight)), d && !u && (u = ne(d / 2)), (t !== void 0 || s !== void 0) && a && l.height && u > l.height && (u = l.height, d = ne(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function Ga(e, t, s) {
  const a = t || 1, n = ne(e.height * a), o = ne(e.width * a);
  e.height = ne(e.height), e.width = ne(e.width);
  const i = e.canvas;
  return i.style && (s || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = n, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const al = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ka() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Za(e, t) {
  const s = Zr(e, t), a = s && s.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ge(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function nl(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: a === "middle" ? s < 0.5 ? e.y : t.y : a === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function ol(e, t, s, a) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = ge(e, n, s), r = ge(n, o, s), l = ge(o, t, s), d = ge(i, r, s), u = ge(r, l, s);
  return ge(d, u, s);
}
const il = function(e, t) {
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
}, rl = function() {
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
  return e ? il(t, s) : rl();
}
function Ao(e, t) {
  let s, a;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, a = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function To(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Bo(e) {
  return e === "angle" ? {
    between: Ue,
    compare: ir,
    normalize: Ot
  } : {
    between: te,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function Qa({ start: e, end: t, count: s, loop: a, style: n }) {
  return {
    start: e % s,
    end: t % s,
    loop: a && (t - e + 1) % s === 0,
    style: n
  };
}
function ll(e, t, s) {
  const { property: a, start: n, end: o } = s, { between: i, normalize: r } = Bo(a), l = t.length;
  let { start: d, end: u, loop: h } = e, g, p;
  if (h) {
    for (d += l, u += l, g = 0, p = l; g < p && i(r(t[d % l][a]), n, o); ++g)
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
function Fo(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: a, start: n, end: o } = s, i = t.length, { compare: r, between: l, normalize: d } = Bo(a), { start: u, end: h, loop: g, style: p } = ll(e, t, s), f = [];
  let _ = !1, b = null, v, m, $;
  const k = () => l(n, $, v) && r(n, $) !== 0, w = () => r(o, v) === 0 || l(o, $, v), S = () => _ || k(), C = () => !_ || w();
  for (let T = u, P = u; T <= h; ++T)
    m = t[T % i], !m.skip && (v = d(m[a]), v !== $ && (_ = l(v, n, o), b === null && S() && (b = r(v, n) === 0 ? T : P), b !== null && C() && (f.push(Qa({
      start: b,
      end: T,
      loop: g,
      count: i,
      style: p
    })), b = null), P = T, $ = v));
  return b !== null && f.push(Qa({
    start: b,
    end: h,
    loop: g,
    count: i,
    style: p
  })), f;
}
function Lo(e, t) {
  const s = [], a = e.segments;
  for (let n = 0; n < a.length; n++) {
    const o = Fo(a[n], e.points, t);
    o.length && s.push(...o);
  }
  return s;
}
function cl(e, t, s, a) {
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
function dl(e, t, s, a) {
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
function ul(e, t) {
  const s = e.points, a = e.options.spanGaps, n = s.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = cl(s, n, o, a);
  if (a === !0)
    return Ja(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], s, t);
  const l = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return Ja(e, dl(s, i, l, d), s, t);
}
function Ja(e, t, s, a) {
  return !a || !a.setContext || !s ? t : hl(e, t, s, a);
}
function hl(e, t, s, a) {
  const n = e._chart.getContext(), o = tn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = s.length, d = [];
  let u = o, h = t[0].start, g = h;
  function p(f, _, b, v) {
    const m = r ? -1 : 1;
    if (f !== _) {
      for (f += l; s[f % l].skip; )
        f -= m;
      for (; s[_ % l].skip; )
        _ += m;
      f % l !== _ % l && (d.push({
        start: f % l,
        end: _ % l,
        loop: b,
        style: v
      }), u = v, h = _ % l);
    }
  }
  for (const f of t) {
    h = r ? h : f.start;
    let _ = s[h % l], b;
    for (g = h + 1; g <= f.end; g++) {
      const v = s[g % l];
      b = tn(a.setContext(_e(n, {
        type: "segment",
        p0: _,
        p1: v,
        p0DataIndex: (g - 1) % l,
        p1DataIndex: g % l,
        datasetIndex: i
      }))), fl(b, u) && p(h, g - 1, f.loop, u), _ = v, u = b;
    }
    h < g - 1 && p(h, g - 1, f.loop, u);
  }
  return d;
}
function tn(e) {
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
function fl(e, t) {
  if (!t)
    return !1;
  const s = [], a = function(n, o) {
    return va(o) ? (s.includes(o) || s.push(o), s.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function os(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function gl(e, t) {
  const { xScale: s, yScale: a } = e;
  return s && a ? {
    left: os(s, t, "left"),
    right: os(s, t, "right"),
    top: os(a, t, "top"),
    bottom: os(a, t, "bottom")
  } : t;
}
function Po(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const a = gl(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : a.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : a.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : a.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : a.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class pl {
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
    this._request || (this._running = !0, this._request = _o.call(window, () => {
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
var Xt = /* @__PURE__ */ new pl();
const en = "transparent", vl = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const a = ja(e || en), n = a.valid && ja(t || en);
    return n && n.valid ? n.mix(a, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class bl {
  constructor(t, s, a, n) {
    const o = s[a];
    n = as([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = as([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || vl[t.type || typeof i], this._easing = We[t.easing] || We.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = a, this._from = i, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, a) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = as([
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
class Eo {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!nt(t))
      return;
    const s = Object.keys(yt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!nt(o))
        return;
      const i = {};
      for (const r of s)
        i[r] = o[r];
      (kt(o.properties) && o.properties || [
        n
      ]).forEach((r) => {
        (r === n || !a.has(r)) && a.set(r, i);
      });
    });
  }
  _animateOptions(t, s) {
    const a = s.options, n = _l(t, a);
    if (!n)
      return [];
    const o = this._createAnimations(n, a);
    return a.$shared && ml(t.options.$animations, a).then(() => {
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
      const g = a.get(d);
      if (h)
        if (g && h.active()) {
          h.update(g, u, r);
          continue;
        } else
          h.cancel();
      if (!g || !g.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new bl(g, t, d, u), n.push(h);
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
      return Xt.add(this._chart, a), !0;
  }
}
function ml(e, t) {
  const s = [], a = Object.keys(t);
  for (let n = 0; n < a.length; n++) {
    const o = e[a[n]];
    o && o.active() && s.push(o.wait());
  }
  return Promise.all(s);
}
function _l(e, t) {
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
function sn(e, t) {
  const s = e && e.options || {}, a = s.reverse, n = s.min === void 0 ? t : 0, o = s.max === void 0 ? t : 0;
  return {
    start: a ? o : n,
    end: a ? n : o
  };
}
function yl(e, t, s) {
  if (s === !1)
    return !1;
  const a = sn(e, s), n = sn(t, s);
  return {
    top: n.end,
    right: a.end,
    bottom: n.start,
    left: a.start
  };
}
function xl(e) {
  let t, s, a, n;
  return nt(e) ? (t = e.top, s = e.right, a = e.bottom, n = e.left) : t = s = a = n = e, {
    top: t,
    right: s,
    bottom: a,
    left: n,
    disabled: e === !1
  };
}
function Ro(e, t) {
  const s = [], a = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = a.length; n < o; ++n)
    s.push(a[n].index);
  return s;
}
function an(e, t, s, a = {}) {
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
    d = e.values[l], Ft(d) && (o || t === 0 || Ut(t) === Ut(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function kl(e, t) {
  const { iScale: s, vScale: a } = t, n = s.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, d, u;
  for (l = 0, d = i.length; l < d; ++l)
    u = i[l], r[l] = {
      [n]: u,
      [o]: e[u]
    };
  return r;
}
function Es(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function wl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function $l(e) {
  const { min: t, max: s, minDefined: a, maxDefined: n } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: n ? s : Number.POSITIVE_INFINITY
  };
}
function Ml(e, t, s) {
  const a = e[t] || (e[t] = {});
  return a[s] || (a[s] = {});
}
function nn(e, t, s, a) {
  for (const n of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[n.index];
    if (s && o > 0 || !s && o < 0)
      return n.index;
  }
  return null;
}
function on(e, t) {
  const { chart: s, _cachedMeta: a } = e, n = s._stacks || (s._stacks = {}), { iScale: o, vScale: i, index: r } = a, l = o.axis, d = i.axis, u = wl(o, i, a), h = t.length;
  let g;
  for (let p = 0; p < h; ++p) {
    const f = t[p], { [l]: _, [d]: b } = f, v = f._stacks || (f._stacks = {});
    g = v[d] = Ml(n, u, _), g[r] = b, g._top = nn(g, i, !0, a.type), g._bottom = nn(g, i, !1, a.type);
    const m = g._visualValues || (g._visualValues = {});
    m[r] = b;
  }
}
function Rs(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((a) => s[a].axis === t).shift();
}
function Sl(e, t) {
  return _e(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Cl(e, t, s) {
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
      const o = n._stacks;
      if (!o || o[a] === void 0 || o[a][s] === void 0)
        return;
      delete o[a][s], o[a]._visualValues !== void 0 && o[a]._visualValues[s] !== void 0 && delete o[a]._visualValues[s];
    }
  }
}
const Os = (e) => e === "reset" || e === "none", rn = (e, t) => t ? e : Object.assign({}, e), Dl = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: Ro(s, !0),
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
    const t = this.chart, s = this._cachedMeta, a = this.getDataset(), n = (h, g, p, f) => h === "x" ? g : h === "r" ? f : p, o = s.xAxisID = st(a.xAxisID, Rs(t, "x")), i = s.yAxisID = st(a.yAxisID, Rs(t, "y")), r = s.rAxisID = st(a.rAxisID, Rs(t, "r")), l = s.indexAxis, d = s.iAxisID = n(l, o, i, r), u = s.vAxisID = n(l, i, o, r);
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
    this._data && Wa(this._data, this), t._stacked && Te(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), a = this._data;
    if (nt(s)) {
      const n = this._cachedMeta;
      this._data = kl(s, n);
    } else if (a !== s) {
      if (a) {
        Wa(a, this);
        const n = this._cachedMeta;
        Te(n), n._parsed = [];
      }
      s && Object.isExtensible(s) && dr(s, this), this._syncList = [], this._data = s;
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
    s._stacked = Es(s.vScale, s), s.stack !== a.stack && (n = !0, Te(s), s.stack = a.stack), this._resyncElements(t), (n || o !== s._stacked) && (on(this, s._parsed), s._stacked = Es(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: a, _data: n } = this, { iScale: o, _stacked: i } = a, r = o.axis;
    let l = t === 0 && s === n.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, h, g;
    if (this._parsing === !1)
      a._parsed = n, a._sorted = !0, g = n;
    else {
      kt(n[t]) ? g = this.parseArrayData(a, n, t, s) : nt(n[t]) ? g = this.parseObjectData(a, n, t, s) : g = this.parsePrimitiveData(a, n, t, s);
      const p = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < s; ++u)
        a._parsed[u + t] = h = g[u], l && (p() && (l = !1), d = h);
      a._sorted = l;
    }
    i && on(this, g);
  }
  parsePrimitiveData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, l = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let g, p, f;
    for (g = 0, p = n; g < p; ++g)
      f = g + a, h[g] = {
        [r]: u || o.parse(d[f], f),
        [l]: i.parse(s[f], f)
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
    let u, h, g, p;
    for (u = 0, h = n; u < h; ++u)
      g = u + a, p = s[g], d[u] = {
        x: o.parse(be(p, r), g),
        y: i.parse(be(p, l), g)
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
      keys: Ro(n, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return an(r, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, s, a, n) {
    const o = a[s.axis];
    let i = o === null ? NaN : o;
    const r = n && a._stacks[s.axis];
    n && r && (n.values = r, i = an(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, s) {
    const a = this._cachedMeta, n = a._parsed, o = a._sorted && t === a.iScale, i = n.length, r = this._getOtherScale(t), l = Dl(s, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = $l(r);
    let g, p;
    function f() {
      p = n[g];
      const _ = p[r.axis];
      return !Ft(p[t.axis]) || u > _ || h < _;
    }
    for (g = 0; g < i && !(!f() && (this.updateRangeFromParsed(d, t, p, l), o)); ++g)
      ;
    if (o) {
      for (g = i - 1; g >= 0; --g)
        if (!f()) {
          this.updateRangeFromParsed(d, t, p, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, a = [];
    let n, o, i;
    for (n = 0, o = s.length; n < o; ++n)
      i = s[n][t.axis], Ft(i) && a.push(i);
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
    this.update(t || "default"), s._clip = xl(st(this.options.clip, yl(s.xScale, s.yScale, this.getMaxOverflow())));
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
      o = i.$context || (i.$context = Cl(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Sl(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!s, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", a) {
    const n = s === "active", o = this._cachedDataOpts, i = t + "-" + s, r = o[i], l = this.enableOptionSharing && Ye(a);
    if (r)
      return rn(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = d.getOptionScopes(this.getDataset(), u), p = Object.keys(yt.elements[t]), f = () => this.getContext(a, n, s), _ = d.resolveNamedOptions(g, p, f, h);
    return _.$shared && (_.$shared = l, o[i] = Object.freeze(rn(_, l))), _;
  }
  _resolveAnimations(t, s, a) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${s}`, r = o[i];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, s), g = u.getOptionScopes(this.getDataset(), h);
      l = u.createResolver(g, this.getContext(t, a, s));
    }
    const d = new Eo(n, l && l.animations);
    return l && l._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || Os(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const a = this.resolveDataElementOptions(t, s), n = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(s, o) || o !== n;
    return this.updateSharedOptions(o, s, a), {
      sharedOptions: o,
      includeOptions: i
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
function Al(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let n = 0, o = s.length; n < o; n++)
      a = a.concat(s[n].controller.getAllParsedValues(e));
    e._cache.$bar = mo(a.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function Tl(e) {
  const t = e.iScale, s = Al(t, e.type);
  let a = t._length, n, o, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (Ye(r) && (a = Math.min(a, Math.abs(i - r) || a)), r = i);
  };
  for (n = 0, o = s.length; n < o; ++n)
    i = t.getPixelForValue(s[n]), l();
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    i = t.getPixelForTick(n), l();
  return a;
}
function Bl(e, t, s, a) {
  const n = s.barThickness;
  let o, i;
  return ut(n) ? (o = t.min * s.categoryPercentage, i = s.barPercentage) : (o = n * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Fl(e, t, s, a) {
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
function Ll(e, t, s, a) {
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
function Oo(e, t, s, a) {
  return kt(e) ? Ll(e, t, s, a) : t[s.axis] = s.parse(e, a), t;
}
function ln(e, t, s, a) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, l = [];
  let d, u, h, g;
  for (d = s, u = s + a; d < u; ++d)
    g = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), l.push(Oo(g, h, o, d));
  return l;
}
function Is(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Pl(e, t, s) {
  return e !== 0 ? Ut(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function El(e) {
  let t, s, a, n, o;
  return e.horizontal ? (t = e.base > e.x, s = "left", a = "right") : (t = e.base < e.y, s = "bottom", a = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: s,
    end: a,
    reverse: t,
    top: n,
    bottom: o
  };
}
function Rl(e, t, s, a) {
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
  const { start: i, end: r, reverse: l, top: d, bottom: u } = El(e);
  n === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === a ? n = d : (s._bottom || 0) === a ? n = u : (o[cn(u, i, r, l)] = !0, n = d)), o[cn(n, i, r, l)] = !0, e.borderSkipped = o;
}
function cn(e, t, s, a) {
  return a ? (e = Ol(e, t, s), e = dn(e, s, t)) : e = dn(e, t, s), e;
}
function Ol(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function dn(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function Il(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class zl extends Ms {
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
    return ln(t, s, a, n);
  }
  parseArrayData(t, s, a, n) {
    return ln(t, s, a, n);
  }
  parseObjectData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = o.axis === "x" ? r : l, u = i.axis === "x" ? r : l, h = [];
    let g, p, f, _;
    for (g = a, p = a + n; g < p; ++g)
      _ = s[g], f = {}, f[o.axis] = o.parse(be(_, d), g), h.push(Oo(be(_, u), f, i, g));
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
    const s = this._cachedMeta, { iScale: a, vScale: n } = s, o = this.getParsed(t), i = o._custom, r = Is(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
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
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: g } = this._getSharedOptions(s, n);
    for (let p = s; p < s + a; p++) {
      const f = this.getParsed(p), _ = o || ut(f[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), b = this._calculateBarIndexPixels(p, u), v = (f._stacks || {})[r.axis], m = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !v || Is(f._custom) || i === v._top || i === v._bottom,
        x: d ? _.head : b.center,
        y: d ? b.center : _.head,
        height: d ? b.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : b.size
      };
      g && (m.options = h || this.resolveDataElementOptions(p, t[p].active ? "active" : n));
      const $ = m.options || t[p].options;
      Rl(m, $, v, i), Il(m, $, u.ratio), this.updateElement(t[p], p, m, n);
    }
  }
  _getStacks(t, s) {
    const { iScale: a } = this._cachedMeta, n = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[a.axis], d = (u) => {
      const h = u._parsed.find((p) => p[a.axis] === l), g = h && h[u.vScale.axis];
      if (ut(g) || isNaN(g))
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
      t[st(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, s)] = !0;
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
      min: r || Tl(s),
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
    const { _cachedMeta: { vScale: s, _stacked: a, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, l = this.getParsed(t), d = l._custom, u = Is(d);
    let h = l[s.axis], g = 0, p = a ? this.applyStack(s, l, a) : h, f, _;
    p !== h && (g = p - h, p = h), u && (h = d.barStart, p = d.barEnd - d.barStart, h !== 0 && Ut(h) !== Ut(d.barEnd) && (g = 0), g += h);
    const b = !ut(o) && !u ? o : g;
    let v = s.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? f = s.getPixelForValue(g + p) : f = v, _ = f - v, Math.abs(_) < i) {
      _ = Pl(_, s, r) * i, h === r && (v -= _ / 2);
      const m = s.getPixelForDecimal(0), $ = s.getPixelForDecimal(1), k = Math.min(m, $), w = Math.max(m, $);
      v = Math.max(Math.min(v, w), k), f = v + _, a && !u && (l._stacks[s.axis]._visualValues[n] = s.getValueForPixel(f) - s.getValueForPixel(v));
    }
    if (v === s.getPixelForValue(r)) {
      const m = Ut(_) * s.getLineWidthForValue(r) / 2;
      v += m, _ -= m;
    }
    return {
      size: _,
      base: v,
      head: f,
      center: f + _ / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const a = s.scale, n = this.options, o = n.skipNull, i = st(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (s.grouped) {
      const u = o ? this._getStackCount(t) : s.stackCount, h = n.barThickness === "flex" ? Fl(t, s, n, u * d) : Bl(t, s, n, u * d), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(st(g, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + p;
      r = h.start + h.chunk * f + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
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
function Nl(e, t, s) {
  let a = 1, n = 1, o = 0, i = 0;
  if (t < bt) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(l), g = Math.sin(l), p = ($, k, w) => Ue($, r, l, !0) ? 1 : Math.max(k, k * s, w, w * s), f = ($, k, w) => Ue($, r, l, !0) ? -1 : Math.min(k, k * s, w, w * s), _ = p(0, d, h), b = p(wt, u, g), v = f(gt, d, h), m = f(gt + wt, u, g);
    a = (_ - v) / 2, n = (b - m) / 2, o = -(_ + v) / 2, i = -(b + m) / 2;
  }
  return {
    ratioX: a,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class Wl extends Ms {
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
      if (nt(a[t])) {
        const { key: l = "value" } = this._parsing;
        o = (d) => +be(a[d], l);
      }
      let i, r;
      for (i = t, r = t + s; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return Jt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Jt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = bt, s = -bt;
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
    const s = this.chart, { chartArea: a } = s, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - i) / 2, 0), l = Math.min(Ui(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: g, ratioY: p, offsetX: f, offsetY: _ } = Nl(h, u, l), b = (a.width - i) / g, v = (a.height - i) / p, m = Math.max(Math.min(b, v) / 2, 0), $ = fo(this.options.radius, m), k = Math.max($ * l, 0), w = ($ - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * $, this.offsetY = _ * $, n.total = this.calculateTotal(), this.outerRadius = $ - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, s) {
    const a = this.options, n = this._cachedMeta, o = this._getCircumference();
    return s && a.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / bt);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, g = o && d.animateScale, p = g ? 0 : this.innerRadius, f = g ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: b } = this._getSharedOptions(s, n);
    let v = this._getRotation(), m;
    for (m = 0; m < s; ++m)
      v += this._circumference(m, o);
    for (m = s; m < s + a; ++m) {
      const $ = this._circumference(m, o), k = t[m], w = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: v,
        endAngle: v + $,
        circumference: $,
        outerRadius: f,
        innerRadius: p
      };
      b && (w.options = _ || this.resolveDataElementOptions(m, k.active ? "active" : n)), v += $, this.updateElement(k, m, w, n);
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
    return s > 0 && !isNaN(t) ? bt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = this.chart, n = a.data.labels || [], o = ba(s._parsed[t], a.options.locale);
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
    return Math.max(st(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Vl extends Ms {
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
    let { start: r, count: l } = fr(s, n, i);
    this._drawStart = r, this._drawCount = l, gr(s) && (r = 0, l = n.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(s, n), g = i.axis, p = r.axis, { spanGaps: f, segment: _ } = this.options, b = qe(f) ? f : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || o || n === "none", m = s + a, $ = t.length;
    let k = s > 0 && this.getParsed(s - 1);
    for (let w = 0; w < $; ++w) {
      const S = t[w], C = v ? S : {};
      if (w < s || w >= m) {
        C.skip = !0;
        continue;
      }
      const T = this.getParsed(w), P = ut(T[p]), V = C[g] = i.getPixelForValue(T[g], w), R = C[p] = o || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, T, l) : T[p], w);
      C.skip = isNaN(V) || isNaN(R) || P, C.stop = w > 0 && Math.abs(T[g] - k[g]) > b, _ && (C.parsed = T, C.raw = d.data[w]), h && (C.options = u || this.resolveDataElementOptions(w, S.active ? "active" : n)), v || this.updateElement(S, w, C, n), k = T;
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
class Hl extends Wl {
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
class $a {
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
    Object.assign($a.prototype, t);
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
var jl = {
  _date: $a
};
function Yl(e, t, s, a) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? lr : pe;
    if (a) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const g = d(o, t, s - h), p = d(o, t, s + h);
          return {
            lo: g.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const u = d(o, t, s);
      if (l) {
        const { vScale: h } = n._cachedMeta, { _parsed: g } = e, p = g.slice(0, u.lo + 1).reverse().findIndex((_) => !ut(_[h.axis]));
        u.lo -= Math.max(0, p);
        const f = g.slice(u.hi).findIndex((_) => !ut(_[h.axis]));
        u.hi += Math.max(0, f);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Ss(e, t, s, a, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = s[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: g } = Yl(o[r], t, i, n);
    for (let p = h; p <= g; ++p) {
      const f = u[p];
      f.skip || a(f, d, p);
    }
  }
}
function ql(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(a, n) {
    const o = t ? Math.abs(a.x - n.x) : 0, i = s ? Math.abs(a.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function zs(e, t, s, a, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || Ss(e, s, t, function(r, l, d) {
    !n && !Ke(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && o.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), o;
}
function Ul(e, t, s, a) {
  let n = [];
  function o(i, r, l) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = vo(i, {
      x: t.x,
      y: t.y
    });
    Ue(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Ss(e, s, t, o), n;
}
function Kl(e, t, s, a, n, o) {
  let i = [];
  const r = ql(s);
  let l = Number.POSITIVE_INFINITY;
  function d(u, h, g) {
    const p = u.inRange(t.x, t.y, n);
    if (a && !p)
      return;
    const f = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(f)) && !p)
      return;
    const b = r(t, f);
    b < l ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: g
      }
    ], l = b) : b === l && i.push({
      element: u,
      datasetIndex: h,
      index: g
    });
  }
  return Ss(e, s, t, d), i;
}
function Ns(e, t, s, a, n, o) {
  return !o && !e.isPointInArea(t) ? [] : s === "r" && !a ? Ul(e, t, s, n) : Kl(e, t, s, a, n, o);
}
function un(e, t, s, a, n) {
  const o = [], i = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Ss(e, s, t, (l, d, u) => {
    l[i] && l[i](t[s], n) && (o.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), a && !r ? [] : o;
}
var Xl = {
  modes: {
    index(e, t, s, a) {
      const n = fe(t, e), o = s.axis || "x", i = s.includeInvisible || !1, r = s.intersect ? zs(e, n, o, a, i) : Ns(e, n, o, !1, a, i), l = [];
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
      const n = fe(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      let r = s.intersect ? zs(e, n, o, a, i) : Ns(e, n, o, !1, a, i);
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
      const n = fe(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return zs(e, n, o, a, i);
    },
    nearest(e, t, s, a) {
      const n = fe(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return Ns(e, n, o, s.intersect, a, i);
    },
    x(e, t, s, a) {
      const n = fe(t, e);
      return un(e, n, "x", s.intersect, a);
    },
    y(e, t, s, a) {
      const n = fe(t, e);
      return un(e, n, "y", s.intersect, a);
    }
  }
};
const Io = [
  "left",
  "top",
  "right",
  "bottom"
];
function Be(e, t) {
  return e.filter((s) => s.pos === t);
}
function hn(e, t) {
  return e.filter((s) => Io.indexOf(s.pos) === -1 && s.box.axis === t);
}
function Fe(e, t) {
  return e.sort((s, a) => {
    const n = t ? a : s, o = t ? s : a;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Gl(e) {
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
function Zl(e) {
  const t = {};
  for (const s of e) {
    const { stack: a, pos: n, stackWeight: o } = s;
    if (!a || !Io.includes(n))
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
function Ql(e, t) {
  const s = Zl(e), { vBoxMaxWidth: a, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, d = s[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * a : l && t.availableWidth, r.height = n) : (r.width = a, r.height = u ? u * n : l && t.availableHeight);
  }
  return s;
}
function Jl(e) {
  const t = Gl(e), s = Fe(t.filter((d) => d.box.fullSize), !0), a = Fe(Be(t, "left"), !0), n = Fe(Be(t, "right")), o = Fe(Be(t, "top"), !0), i = Fe(Be(t, "bottom")), r = hn(t, "x"), l = hn(t, "y");
  return {
    fullSize: s,
    leftAndTop: a.concat(o),
    rightAndBottom: n.concat(l).concat(i).concat(r),
    chartArea: Be(t, "chartArea"),
    vertical: a.concat(n).concat(l),
    horizontal: o.concat(i).concat(r)
  };
}
function fn(e, t, s, a) {
  return Math.max(e[s], t[s]) + Math.max(e[a], t[a]);
}
function zo(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function tc(e, t, s, a) {
  const { pos: n, box: o } = s, i = e.maxPadding;
  if (!nt(n)) {
    s.size && (e[n] -= s.size);
    const h = a[s.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, s.horizontal ? o.height : o.width), s.size = h.size / h.count, e[n] += s.size;
  }
  o.getPadding && zo(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - fn(i, e, "left", "right")), l = Math.max(0, t.outerHeight - fn(i, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function ec(e) {
  const t = e.maxPadding;
  function s(a) {
    const n = Math.max(t[a] - e[a], 0);
    return e[a] += n, n;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function sc(e, t) {
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
function Oe(e, t, s, a) {
  const n = [];
  let o, i, r, l, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, sc(r.horizontal, t));
    const { same: h, other: g } = tc(t, s, r, a);
    d |= h && n.length, u = u || g, l.fullSize || n.push(r);
  }
  return d && Oe(n, t, s, a) || u;
}
function is(e, t, s, a, n) {
  e.top = s, e.left = t, e.right = t + a, e.bottom = s + n, e.width = a, e.height = n;
}
function gn(e, t, s, a) {
  const n = s.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const l = r.box, d = a[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, g = d.size || l.height;
      Ye(d.start) && (i = d.start), l.fullSize ? is(l, n.left, i, s.outerWidth - n.right - n.left, g) : is(l, t.left + d.placed, i, h, g), d.start = i, d.placed += h, i = l.bottom;
    } else {
      const h = t.h * u, g = d.size || l.width;
      Ye(d.start) && (o = d.start), l.fullSize ? is(l, o, n.top, g, s.outerHeight - n.bottom - n.top) : is(l, o, t.top + d.placed, g, h), d.start = o, d.placed += h, o = l.right;
    }
  }
  t.x = o, t.y = i;
}
var Wt = {
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
    const n = Vt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(s - n.height, 0), r = Jl(e.boxes), l = r.vertical, d = r.horizontal;
    ft(e.boxes, (_) => {
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
    }), g = Object.assign({}, n);
    zo(g, Vt(a));
    const p = Object.assign({
      maxPadding: g,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), f = Ql(l.concat(d), h);
    Oe(r.fullSize, p, h, f), Oe(l, p, h, f), Oe(d, p, h, f) && Oe(l, p, h, f), ec(p), gn(r.leftAndTop, p, h, f), p.x += p.w, p.y += p.h, gn(r.rightAndBottom, p, h, f), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, ft(r.chartArea, (_) => {
      const b = _.box;
      Object.assign(b, e.chartArea), b.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class No {
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
class ac extends No {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const hs = "$chartjs", nc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, pn = (e) => e === null || e === "";
function oc(e, t) {
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
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", pn(n)) {
    const o = Za(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (pn(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Za(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Wo = al ? {
  passive: !0
} : !1;
function ic(e, t, s) {
  e && e.addEventListener(t, s, Wo);
}
function rc(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, Wo);
}
function lc(e, t) {
  const s = nc[e.type] || e.type, { x: a, y: n } = fe(e, t);
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
function cc(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || ys(r.addedNodes, a), i = i && !ys(r.removedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function dc(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || ys(r.removedNodes, a), i = i && !ys(r.addedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const Ge = /* @__PURE__ */ new Map();
let vn = 0;
function Vo() {
  const e = window.devicePixelRatio;
  e !== vn && (vn = e, Ge.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function uc(e, t) {
  Ge.size || window.addEventListener("resize", Vo), Ge.set(e, t);
}
function hc(e) {
  Ge.delete(e), Ge.size || window.removeEventListener("resize", Vo);
}
function fc(e, t, s) {
  const a = e.canvas, n = a && wa(a);
  if (!n)
    return;
  const o = yo((r, l) => {
    const d = n.clientWidth;
    s(r, l), d < n.clientWidth && s();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), uc(e, o), i;
}
function Ws(e, t, s) {
  s && s.disconnect(), t === "resize" && hc(e);
}
function gc(e, t, s) {
  const a = e.canvas, n = yo((o) => {
    e.ctx !== null && s(lc(o, e));
  }, e);
  return ic(a, t, n), n;
}
class pc extends No {
  acquireContext(t, s) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (oc(t, s), a) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[hs])
      return !1;
    const a = s[hs].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      ut(i) ? s.removeAttribute(o) : s.setAttribute(o, i);
    });
    const n = a.style || {};
    return Object.keys(n).forEach((o) => {
      s.style[o] = n[o];
    }), s.width = s.width, delete s[hs], !0;
  }
  addEventListener(t, s, a) {
    this.removeEventListener(t, s);
    const n = t.$proxies || (t.$proxies = {}), i = {
      attach: cc,
      detach: dc,
      resize: fc
    }[s] || gc;
    n[s] = i(t, s, a);
  }
  removeEventListener(t, s) {
    const a = t.$proxies || (t.$proxies = {}), n = a[s];
    if (!n)
      return;
    ({
      attach: Ws,
      detach: Ws,
      resize: Ws
    }[s] || rc)(t, s, n), a[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, a, n) {
    return sl(t, s, a, n);
  }
  isAttached(t) {
    const s = t && wa(t);
    return !!(s && s.isConnected);
  }
}
function vc(e) {
  return !ka() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? ac : pc;
}
let se = class {
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
    return t.forEach((o) => {
      n[o] = a[o] && a[o].active() ? a[o]._to : this[o];
    }), n;
  }
};
function bc(e, t) {
  const s = e.options.ticks, a = mc(e), n = Math.min(s.maxTicksLimit || a, a), o = s.major.enabled ? yc(t) : [], i = o.length, r = o[0], l = o[i - 1], d = [];
  if (i > n)
    return xc(t, d, o, i / n), d;
  const u = _c(o, t, n);
  if (i > 0) {
    let h, g;
    const p = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (rs(t, d, u, ut(p) ? 0 : r - p, r), h = 0, g = i - 1; h < g; h++)
      rs(t, d, u, o[h], o[h + 1]);
    return rs(t, d, u, l, ut(p) ? t.length : l + p), d;
  }
  return rs(t, d, u), d;
}
function mc(e) {
  const t = e.options.offset, s = e._tickSize(), a = e._length / s + (t ? 0 : 1), n = e._maxLength / s;
  return Math.floor(Math.min(a, n));
}
function _c(e, t, s) {
  const a = kc(e), n = t.length / s;
  if (!a)
    return Math.max(n, 1);
  const o = er(a);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const l = o[i];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function yc(e) {
  const t = [];
  let s, a;
  for (s = 0, a = e.length; s < a; s++)
    e[s].major && t.push(s);
  return t;
}
function xc(e, t, s, a) {
  let n = 0, o = s[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), n++, o = s[n * a]);
}
function rs(e, t, s, a, n) {
  const o = st(a, 0), i = Math.min(st(n, e.length), e.length);
  let r = 0, l, d, u;
  for (s = Math.ceil(s), n && (l = n - a, s = l / Math.floor(l / s)), u = o; u < 0; )
    r++, u = Math.round(o + r * s);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(o + r * s));
}
function kc(e) {
  const t = e.length;
  let s, a;
  if (t < 2)
    return !1;
  for (a = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== a)
      return !1;
  return a;
}
const wc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, bn = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, mn = (e, t) => Math.min(t || e, e);
function _n(e, t) {
  const s = [], a = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += a)
    s.push(e[Math.floor(o)]);
  return s;
}
function $c(e, t, s) {
  const a = e.ticks.length, n = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(s && (a === 1 ? d = Math.max(l - o, i - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < o - r || l > i + r)))
    return l;
}
function Mc(e, t) {
  ft(e, (s) => {
    const a = s.gc, n = a.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete s.data[a[o]];
      a.splice(0, n);
    }
  });
}
function Le(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function yn(e, t) {
  if (!e.display)
    return 0;
  const s = Bt(e.font, t), a = Vt(e.padding);
  return (kt(e.text) ? e.text.length : 1) * s.lineHeight + a.height;
}
function Sc(e, t) {
  return _e(e, {
    scale: t,
    type: "scale"
  });
}
function Cc(e, t, s) {
  return _e(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function Dc(e, t, s) {
  let a = pa(e);
  return (s && t !== "right" || !s && t === "right") && (a = wc(a)), a;
}
function Ac(e, t, s, a) {
  const { top: n, left: o, bottom: i, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let h = 0, g, p, f;
  const _ = i - n, b = r - o;
  if (e.isHorizontal()) {
    if (p = Dt(a, o, r), nt(s)) {
      const v = Object.keys(s)[0], m = s[v];
      f = u[v].getPixelForValue(m) + _ - t;
    } else s === "center" ? f = (d.bottom + d.top) / 2 + _ - t : f = bn(e, s, t);
    g = r - o;
  } else {
    if (nt(s)) {
      const v = Object.keys(s)[0], m = s[v];
      p = u[v].getPixelForValue(m) - b + t;
    } else s === "center" ? p = (d.left + d.right) / 2 - b + t : p = bn(e, s, t);
    f = Dt(a, i, n), h = s === "left" ? -wt : wt;
  }
  return {
    titleX: p,
    titleY: f,
    maxWidth: g,
    rotation: h
  };
}
class De extends se {
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
    return t = jt(t, Number.POSITIVE_INFINITY), s = jt(s, Number.NEGATIVE_INFINITY), a = jt(a, Number.POSITIVE_INFINITY), n = jt(n, Number.NEGATIVE_INFINITY), {
      min: jt(t, a),
      max: jt(s, n),
      minDefined: Ft(t),
      maxDefined: Ft(s)
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
      min: jt(s, jt(a, s)),
      max: jt(a, jt(s, a))
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
    vt(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Pr(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? _n(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = bc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, a;
    this.isHorizontal() ? (s = this.left, a = this.right) : (s = this.top, a = this.bottom, t = !t), this._startPixel = s, this._endPixel = a, this._reversePixels = t, this._length = a - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    vt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    vt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    vt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), vt(this.options[t], [
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
    vt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let a, n, o;
    for (a = 0, n = t.length; a < n; a++)
      o = t[a], o.label = vt(s.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    vt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    vt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, a = mn(this.ticks.length, t.ticks.maxTicksLimit), n = s.minRotation || 0, o = s.maxRotation;
    let i = n, r, l, d;
    if (!this._isVisible() || !s.display || n >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, g = u.highest.height, p = Tt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : p / (a - 1), h + 6 > r && (r = p / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Le(t.grid) - s.padding - yn(t.title, this.chart.options.font), d = Math.sqrt(h * h + g * g), i = or(Math.min(Math.asin(Tt((u.highest.height + 6) / r, -1, 1)), Math.asin(Tt(l / d, -1, 1)) - Math.asin(Tt(g / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    vt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    vt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: a, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = yn(n, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Le(o) + l) : (t.height = this.maxHeight, t.width = Le(o) + l), a.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: g } = this._getLabelSizes(), p = a.padding * 2, f = Jt(this.labelRotation), _ = Math.cos(f), b = Math.sin(f);
        if (r) {
          const v = a.mirror ? 0 : b * h.width + _ * g.height;
          t.height = Math.min(this.maxHeight, t.height + v + p);
        } else {
          const v = a.mirror ? 0 : _ * h.width + b * g.height;
          t.width = Math.min(this.maxWidth, t.width + v + p);
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
      let g = 0, p = 0;
      l ? d ? (g = n * t.width, p = a * s.height) : (g = a * t.height, p = n * s.width) : o === "start" ? p = s.width : o === "end" ? g = t.width : o !== "inner" && (g = t.width / 2, p = s.width / 2), this.paddingLeft = Math.max((g - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((p - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = s.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = s.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    vt(this.options.afterFit, [
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
      ut(t[s].label) && (t.splice(s, 1), a--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let a = this.ticks;
      s < a.length && (a = _n(a, s)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, a) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], l = Math.floor(s / mn(s, a));
    let d = 0, u = 0, h, g, p, f, _, b, v, m, $, k, w;
    for (h = 0; h < s; h += l) {
      if (f = t[h].label, _ = this._resolveTickFontOptions(h), n.font = b = _.string, v = o[b] = o[b] || {
        data: {},
        gc: []
      }, m = _.lineHeight, $ = k = 0, !ut(f) && !kt(f))
        $ = qa(n, v.data, v.gc, $, f), k = m;
      else if (kt(f))
        for (g = 0, p = f.length; g < p; ++g)
          w = f[g], !ut(w) && !kt(w) && ($ = qa(n, v.data, v.gc, $, w), k += m);
      i.push($), r.push(k), d = Math.max($, d), u = Math.max(k, u);
    }
    Mc(o, s);
    const S = i.indexOf(d), C = r.indexOf(u), T = (P) => ({
      width: i[P] || 0,
      height: r[P] || 0
    });
    return {
      first: T(0),
      last: T(s - 1),
      widest: T(S),
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
    return rr(this._alignToPixels ? ue(this.chart, s, 0) : s);
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
      return a.$context || (a.$context = Cc(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Sc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = Jt(this.labelRotation), a = Math.abs(Math.cos(s)), n = Math.abs(Math.sin(s)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, l = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? l * a > r * n ? r / a : l / n : l * n < r * a ? l / a : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, a = this.chart, n = this.options, { grid: o, position: i, border: r } = n, l = o.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), g = Le(o), p = [], f = r.setContext(this.getContext()), _ = f.display ? f.width : 0, b = _ / 2, v = function(E) {
      return ue(a, E, _);
    };
    let m, $, k, w, S, C, T, P, V, R, W, q;
    if (i === "top")
      m = v(this.bottom), C = this.bottom - g, P = m - b, R = v(t.top) + b, q = t.bottom;
    else if (i === "bottom")
      m = v(this.top), R = t.top, q = v(t.bottom) - b, C = m + b, P = this.top + g;
    else if (i === "left")
      m = v(this.right), S = this.right - g, T = m - b, V = v(t.left) + b, W = t.right;
    else if (i === "right")
      m = v(this.left), V = t.left, W = v(t.right) - b, S = m + b, T = this.left + g;
    else if (s === "x") {
      if (i === "center")
        m = v((t.top + t.bottom) / 2 + 0.5);
      else if (nt(i)) {
        const E = Object.keys(i)[0], O = i[E];
        m = v(this.chart.scales[E].getPixelForValue(O));
      }
      R = t.top, q = t.bottom, C = m + b, P = C + g;
    } else if (s === "y") {
      if (i === "center")
        m = v((t.left + t.right) / 2);
      else if (nt(i)) {
        const E = Object.keys(i)[0], O = i[E];
        m = v(this.chart.scales[E].getPixelForValue(O));
      }
      S = m - b, T = S - g, V = t.left, W = t.right;
    }
    const A = st(n.ticks.maxTicksLimit, h), F = Math.max(1, Math.ceil(h / A));
    for ($ = 0; $ < h; $ += F) {
      const E = this.getContext($), O = o.setContext(E), z = r.setContext(E), I = O.lineWidth, H = O.color, tt = z.dash || [], Z = z.dashOffset, U = O.tickWidth, dt = O.tickColor, _t = O.tickBorderDash || [], ct = O.tickBorderDashOffset;
      k = $c(this, $, l), k !== void 0 && (w = ue(a, k, I), d ? S = T = V = W = w : C = P = R = q = w, p.push({
        tx1: S,
        ty1: C,
        tx2: T,
        ty2: P,
        x1: V,
        y1: R,
        x2: W,
        y2: q,
        width: I,
        color: H,
        borderDash: tt,
        borderDashOffset: Z,
        tickWidth: U,
        tickColor: dt,
        tickBorderDash: _t,
        tickBorderDashOffset: ct
      }));
    }
    return this._ticksLength = h, this._borderValue = m, p;
  }
  _computeLabelItems(t) {
    const s = this.axis, a = this.options, { position: n, ticks: o } = a, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: h } = o, g = Le(a.grid), p = g + u, f = h ? -u : p, _ = -Jt(this.labelRotation), b = [];
    let v, m, $, k, w, S, C, T, P, V, R, W, q = "middle";
    if (n === "top")
      S = this.bottom - f, C = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + f, C = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const F = this._getYAxisLabelAlignment(g);
      C = F.textAlign, w = F.x;
    } else if (n === "right") {
      const F = this._getYAxisLabelAlignment(g);
      C = F.textAlign, w = F.x;
    } else if (s === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + p;
      else if (nt(n)) {
        const F = Object.keys(n)[0], E = n[F];
        S = this.chart.scales[F].getPixelForValue(E) + p;
      }
      C = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (n === "center")
        w = (t.left + t.right) / 2 - p;
      else if (nt(n)) {
        const F = Object.keys(n)[0], E = n[F];
        w = this.chart.scales[F].getPixelForValue(E);
      }
      C = this._getYAxisLabelAlignment(g).textAlign;
    }
    s === "y" && (l === "start" ? q = "top" : l === "end" && (q = "bottom"));
    const A = this._getLabelSizes();
    for (v = 0, m = r.length; v < m; ++v) {
      $ = r[v], k = $.label;
      const F = o.setContext(this.getContext(v));
      T = this.getPixelForTick(v) + o.labelOffset, P = this._resolveTickFontOptions(v), V = P.lineHeight, R = kt(k) ? k.length : 1;
      const E = R / 2, O = F.color, z = F.textStrokeColor, I = F.textStrokeWidth;
      let H = C;
      i ? (w = T, C === "inner" && (v === m - 1 ? H = this.options.reverse ? "left" : "right" : v === 0 ? H = this.options.reverse ? "right" : "left" : H = "center"), n === "top" ? d === "near" || _ !== 0 ? W = -R * V + V / 2 : d === "center" ? W = -A.highest.height / 2 - E * V + V : W = -A.highest.height + V / 2 : d === "near" || _ !== 0 ? W = V / 2 : d === "center" ? W = A.highest.height / 2 - E * V : W = A.highest.height - R * V, h && (W *= -1), _ !== 0 && !F.showLabelBackdrop && (w += V / 2 * Math.sin(_))) : (S = T, W = (1 - R) * V / 2);
      let tt;
      if (F.showLabelBackdrop) {
        const Z = Vt(F.backdropPadding), U = A.heights[v], dt = A.widths[v];
        let _t = W - Z.top, ct = 0 - Z.left;
        switch (q) {
          case "middle":
            _t -= U / 2;
            break;
          case "bottom":
            _t -= U;
            break;
        }
        switch (C) {
          case "center":
            ct -= dt / 2;
            break;
          case "right":
            ct -= dt;
            break;
          case "inner":
            v === m - 1 ? ct -= dt : v > 0 && (ct -= dt / 2);
            break;
        }
        tt = {
          left: ct,
          top: _t,
          width: dt + Z.width,
          height: U + Z.height,
          color: F.backdropColor
        };
      }
      b.push({
        label: k,
        font: P,
        textOffset: W,
        options: {
          rotation: _,
          color: O,
          strokeColor: z,
          strokeWidth: I,
          textAlign: H,
          textBaseline: q,
          translation: [
            w,
            S
          ],
          backdrop: tt
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-Jt(this.labelRotation))
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
    let d, u, h, g;
    this.isHorizontal() ? (d = ue(t, this.left, i) - i / 2, u = ue(t, this.right, r) + r / 2, h = g = l) : (h = ue(t, this.top, i) - i / 2, g = ue(t, this.bottom, r) + r / 2, d = u = l), s.save(), s.lineWidth = o.width, s.strokeStyle = o.color, s.beginPath(), s.moveTo(d, h), s.lineTo(u, g), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, n = this._computeLabelArea();
    n && ks(a, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, l = i.font, d = i.label, u = i.textOffset;
      Xe(a, d, 0, u, l, r);
    }
    n && ws(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: a, reverse: n } } = this;
    if (!a.display)
      return;
    const o = Bt(a.font), i = Vt(a.padding), r = a.align;
    let l = o.lineHeight / 2;
    s === "bottom" || s === "center" || nt(s) ? (l += i.bottom, kt(a.text) && (l += o.lineHeight * (a.text.length - 1))) : l += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: g } = Ac(this, l, s, r);
    Xe(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: g,
      textAlign: Dc(r, s, n),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, a = st(t.grid && t.grid.z, -1), n = st(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== De.prototype.draw ? [
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
    return Bt(s.font);
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
    Fc(s) && (a = this.register(s));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, Tc(t, i, a), this.override && yt.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, a = t.id, n = this.scope;
    a in s && delete s[a], n && a in yt[n] && (delete yt[n][a], this.override && delete me[a]);
  }
}
function Tc(e, t, s) {
  const a = je(/* @__PURE__ */ Object.create(null), [
    s ? yt.get(s) : {},
    yt.get(t),
    e.defaults
  ]);
  yt.set(t, a), e.defaultRoutes && Bc(t, e.defaultRoutes), e.descriptors && yt.describe(t, e.descriptors);
}
function Bc(e, t) {
  Object.keys(t).forEach((s) => {
    const a = s.split("."), n = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[s].split("."), r = i.pop(), l = i.join(".");
    yt.route(o, n, l, r);
  });
}
function Fc(e) {
  return "id" in e && "defaults" in e;
}
class Lc {
  constructor() {
    this.controllers = new ls(Ms, "datasets", !0), this.elements = new ls(se, "elements"), this.plugins = new ls(Object, "plugins"), this.scales = new ls(De, "scales"), this._typedRegistries = [
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
      a || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : ft(n, (i) => {
        const r = a || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, s, a) {
    const n = fa(t);
    vt(a["before" + n], [], a), s[t](a), vt(a["after" + n], [], a);
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
var qt = /* @__PURE__ */ new Lc();
class Pc {
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
      if (vt(r, l, i) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    ut(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const a = t && t.config, n = st(a.options && a.options.plugins, {}), o = Ec(a);
    return n === !1 && !s ? [] : Oc(t, o, n, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], a = this._cache, n = (o, i) => o.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(s, a), t, "stop"), this._notify(n(a, s), t, "start");
  }
}
function Ec(e) {
  const t = {}, s = [], a = Object.keys(qt.plugins.items);
  for (let o = 0; o < a.length; o++)
    s.push(qt.getPlugin(a[o]));
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
function Rc(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Oc(e, { plugins: t, localIds: s }, a, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, d = Rc(a[l], n);
    d !== null && o.push({
      plugin: r,
      options: Ic(e.config, {
        plugin: r,
        local: s[l]
      }, d, i)
    });
  }
  return o;
}
function Ic(e, { plugin: t, local: s }, a, n) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return s && t.defaults && i.push(t.defaults), e.createResolver(i, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ia(e, t) {
  const s = yt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function zc(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function Nc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function xn(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Wc(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function ra(e, ...t) {
  if (xn(e))
    return e;
  for (const s of t) {
    const a = s.axis || Wc(s.position) || e.length > 1 && xn(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function kn(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Vc(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (s.length)
      return kn(e, "x", s[0]) || kn(e, "y", s[0]);
  }
  return {};
}
function Hc(e, t) {
  const s = me[e.type] || {
    scales: {}
  }, a = t.scales || {}, n = ia(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const r = a[i];
    if (!nt(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = ra(i, r, Vc(i, e), yt.scales[r.type]), d = Nc(l, n), u = s.scales || {};
    o[i] = ze(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || ia(r, t), u = (me[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const g = zc(h, l), p = i[g + "AxisID"] || g;
      o[p] = o[p] || /* @__PURE__ */ Object.create(null), ze(o[p], [
        {
          axis: g
        },
        a[p],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    ze(r, [
      yt.scales[r.type],
      yt.scale
    ]);
  }), o;
}
function Ho(e) {
  const t = e.options || (e.options = {});
  t.plugins = st(t.plugins, {}), t.scales = Hc(e, t);
}
function jo(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function jc(e) {
  return e = e || {}, e.data = jo(e.data), Ho(e), e;
}
const wn = /* @__PURE__ */ new Map(), Yo = /* @__PURE__ */ new Set();
function cs(e, t) {
  let s = wn.get(e);
  return s || (s = t(), wn.set(e, s), Yo.add(s)), s;
}
const Pe = (e, t, s) => {
  const a = be(t, s);
  a !== void 0 && e.add(a);
};
class Yc {
  constructor(t) {
    this._config = jc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = jo(t);
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
    this.clearCache(), Ho(t);
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
    const { options: n, type: o } = this, i = this._cachedScopes(t, a), r = i.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((u) => {
      t && (l.add(t), u.forEach((h) => Pe(l, t, h))), u.forEach((h) => Pe(l, n, h)), u.forEach((h) => Pe(l, me[o] || {}, h)), u.forEach((h) => Pe(l, yt, h)), u.forEach((h) => Pe(l, na, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Yo.has(s) && i.set(s, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      me[s] || {},
      yt.datasets[s] || {},
      {
        type: s
      },
      yt,
      na
    ];
  }
  resolveNamedOptions(t, s, a, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = $n(this._resolverCache, t, n);
    let l = i;
    if (Uc(i, s)) {
      o.$shared = !1, a = re(a) ? a() : a;
      const d = this.createResolver(t, a, r);
      l = Se(i, a, d);
    }
    for (const d of s)
      o[d] = l[d];
    return o;
  }
  createResolver(t, s, a = [
    ""
  ], n) {
    const { resolver: o } = $n(this._resolverCache, t, a);
    return nt(s) ? Se(o, s, void 0, n) : o;
  }
}
function $n(e, t, s) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const n = s.join();
  let o = a.get(n);
  return o || (o = {
    resolver: _a(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(n, o)), o;
}
const qc = (e) => nt(e) && Object.getOwnPropertyNames(e).some((t) => re(e[t]));
function Uc(e, t) {
  const { isScriptable: s, isIndexable: a } = $o(e);
  for (const n of t) {
    const o = s(n), i = a(n), r = (i || o) && e[n];
    if (o && (re(r) || qc(r)) || i && kt(r))
      return !0;
  }
  return !1;
}
var Kc = "4.5.1";
const Xc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Mn(e, t) {
  return e === "top" || e === "bottom" || Xc.indexOf(e) === -1 && t === "x";
}
function Sn(e, t) {
  return function(s, a) {
    return s[e] === a[e] ? s[t] - a[t] : s[e] - a[e];
  };
}
function Cn(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), vt(s && s.onComplete, [
    e
  ], t);
}
function Gc(e) {
  const t = e.chart, s = t.options.animation;
  vt(s && s.onProgress, [
    e
  ], t);
}
function qo(e) {
  return ka() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const fs = {}, Dn = (e) => {
  const t = qo(e);
  return Object.values(fs).filter((s) => s.canvas === t).pop();
};
function Zc(e, t, s) {
  const a = Object.keys(e);
  for (const n of a) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (s > 0 || o > t) && (e[o + s] = i);
    }
  }
}
function Qc(e, t, s, a) {
  return !s || e.type === "mouseout" ? null : a ? t : e;
}
let Ae = class {
  static defaults = yt;
  static instances = fs;
  static overrides = me;
  static registry = qt;
  static version = Kc;
  static getChart = Dn;
  static register(...t) {
    qt.add(...t), An();
  }
  static unregister(...t) {
    qt.remove(...t), An();
  }
  constructor(t, s) {
    const a = this.config = new Yc(s), n = qo(t), o = Dn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || vc(n))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(n, i.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = qi(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Pc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ur((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], fs[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Xt.listen(this, "complete", Cn), Xt.listen(this, "progress", Gc), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: a, height: n, _aspectRatio: o } = this;
    return ut(t) ? s && o ? o : n ? a / n : null : t;
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
    return qt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ga(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ua(this.canvas, this.ctx), this;
  }
  stop() {
    return Xt.stop(this), this;
  }
  resize(t, s) {
    Xt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const a = this.options, n = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(n, t, s, o), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Ga(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), vt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    ft(s, (a, n) => {
      a.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, a = this.scales, n = Object.keys(a).reduce((i, r) => (i[r] = !1, i), {});
    let o = [];
    s && (o = o.concat(Object.keys(s).map((i) => {
      const r = s[i], l = ra(i, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), ft(o, (i) => {
      const r = i.options, l = r.id, d = ra(l, r), u = st(r.type, i.dtype);
      (r.position === void 0 || Mn(r.position, d) !== Mn(i.dposition)) && (r.position = i.dposition), n[l] = !0;
      let h = null;
      if (l in a && a[l].type === u)
        h = a[l];
      else {
        const g = qt.getScale(u);
        h = new g({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(r, t);
    }), ft(n, (i, r) => {
      i || delete a[r];
    }), ft(a, (i) => {
      Wt.configure(this, i, i.options), Wt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, a = t.length;
    if (t.sort((n, o) => n.index - o.index), a > s) {
      for (let n = s; n < a; ++n)
        this._destroyDatasetMeta(n);
      t.splice(s, a - s);
    }
    this._sortedMetasets = t.slice(0).sort(Sn("order", "index"));
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
      if (i.type && i.type !== r && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = r, i.indexAxis = o.indexAxis || ia(r, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const l = qt.getController(r), { datasetElementType: d, dataElementType: u } = yt.datasets[r];
        Object.assign(l, {
          dataElementType: qt.getElement(u),
          datasetElementType: d && qt.getElement(d)
        }), i.controller = new l(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    ft(this.data.datasets, (t, s) => {
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
      const { controller: h } = this.getDatasetMeta(d), g = !n && o.indexOf(h) === -1;
      h.buildOrUpdateElements(g), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), n || ft(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Sn("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    ft(this.scales, (t) => {
      Wt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Oa(s, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: a, start: n, count: o } of s) {
      const i = a === "_removeElements" ? -o : o;
      Zc(t, n, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), n = a(0);
    for (let o = 1; o < s; o++)
      if (!Oa(n, a(o)))
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
    Wt.update(this, this.width, this.height, t);
    const s = this.chartArea, a = s.width <= 0 || s.height <= 0;
    this._layers = [], ft(this.boxes, (n) => {
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
        this._updateDataset(s, re(t) ? t({
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
    }) !== !1 && (Xt.has(this) ? this.attached && !Xt.running(this) && Xt.start(this) : (this.draw(), Cn({
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
    }, n = Po(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (n && ks(s, n), t.controller.draw(), n && ws(s), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Ke(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, a, n) {
    const o = Xl.modes[s];
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
    const n = a ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, n);
    Ye(s) ? (o.data[s].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), Xt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ua(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete fs[this.id], this.notifyPlugins("afterDestroy");
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
    ft(this.options.events, (o) => a(o, n));
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
    ft(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, ft(this._responsiveListeners, (t, s) => {
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
    !ps(a, s) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, s));
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
    const { _active: n = [], options: o } = this, i = s, r = this._getActiveElements(t, n, a, i), l = Qi(t), d = Qc(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, vt(o.onHover, [
      t,
      r,
      this
    ], this), l && vt(o.onClick, [
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
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
};
function An() {
  return ft(Ae.instances, (e) => e._plugins.invalidate());
}
function Jc(e, t, s) {
  const { startAngle: a, x: n, y: o, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, h = Math.min(d / i, Ot(a - s));
  if (e.beginPath(), e.arc(n, o, i - d / 2, a + h / 2, s - h / 2), r > 0) {
    const g = Math.min(d / r, Ot(a - s));
    e.arc(n, o, r + d / 2, s - g / 2, a + g / 2, !0);
  } else {
    const g = Math.min(d / 2, i * Ot(a - s));
    if (u === "round")
      e.arc(n, o, g, s - gt / 2, a + gt / 2, !0);
    else if (u === "bevel") {
      const p = 2 * g * g, f = -p * Math.cos(s + gt / 2) + n, _ = -p * Math.sin(s + gt / 2) + o, b = p * Math.cos(a + gt / 2) + n, v = p * Math.sin(a + gt / 2) + o;
      e.lineTo(f, _), e.lineTo(b, v);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function td(e, t, s) {
  const { startAngle: a, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, a - d, s + d), l > n ? (d = n / l, e.arc(o, i, l, s + d, a - d, !0)) : e.arc(o, i, n, s + wt, a - wt), e.closePath(), e.clip();
}
function ed(e) {
  return ma(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function sd(e, t, s, a) {
  const n = ed(e.options.borderRadius), o = (s - t) / 2, i = Math.min(o, a * t / 2), r = (l) => {
    const d = (s - Math.min(o, l)) * a / 2;
    return Tt(l, 0, Math.min(o, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: Tt(n.innerStart, 0, i),
    innerEnd: Tt(n.innerEnd, 0, i)
  };
}
function xe(e, t, s, a) {
  return {
    x: s + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function xs(e, t, s, a, n, o) {
  const { x: i, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + a + s - d, 0), g = u > 0 ? u + a + s + d : 0;
  let p = 0;
  const f = n - l;
  if (a) {
    const F = u > 0 ? u - a : 0, E = h > 0 ? h - a : 0, O = (F + E) / 2, z = O !== 0 ? f * O / (O + a) : f;
    p = (f - z) / 2;
  }
  const _ = Math.max(1e-3, f * h - s / gt) / h, b = (f - _) / 2, v = l + b + p, m = n - b - p, { outerStart: $, outerEnd: k, innerStart: w, innerEnd: S } = sd(t, g, h, m - v), C = h - $, T = h - k, P = v + $ / C, V = m - k / T, R = g + w, W = g + S, q = v + w / R, A = m - S / W;
  if (e.beginPath(), o) {
    const F = (P + V) / 2;
    if (e.arc(i, r, h, P, F), e.arc(i, r, h, F, V), k > 0) {
      const I = xe(T, V, i, r);
      e.arc(I.x, I.y, k, V, m + wt);
    }
    const E = xe(W, m, i, r);
    if (e.lineTo(E.x, E.y), S > 0) {
      const I = xe(W, A, i, r);
      e.arc(I.x, I.y, S, m + wt, A + Math.PI);
    }
    const O = (m - S / g + (v + w / g)) / 2;
    if (e.arc(i, r, g, m - S / g, O, !0), e.arc(i, r, g, O, v + w / g, !0), w > 0) {
      const I = xe(R, q, i, r);
      e.arc(I.x, I.y, w, q + Math.PI, v - wt);
    }
    const z = xe(C, v, i, r);
    if (e.lineTo(z.x, z.y), $ > 0) {
      const I = xe(C, P, i, r);
      e.arc(I.x, I.y, $, v - wt, P);
    }
  } else {
    e.moveTo(i, r);
    const F = Math.cos(P) * h + i, E = Math.sin(P) * h + r;
    e.lineTo(F, E);
    const O = Math.cos(V) * h + i, z = Math.sin(V) * h + r;
    e.lineTo(O, z);
  }
  e.closePath();
}
function ad(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    xs(e, t, s, a, l, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (l = i + (r % bt || bt));
  }
  return xs(e, t, s, a, l, n), e.fill(), l;
}
function nd(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: g, borderRadius: p } = l, f = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = g, f ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let _ = t.endAngle;
  if (o) {
    xs(e, t, s, a, _, n);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(r) || (_ = i + (r % bt || bt));
  }
  f && td(e, t, _), l.selfJoin && _ - i >= gt && p === 0 && u !== "miter" && Jc(e, t, _), o || (xs(e, t, s, a, _, n), e.stroke());
}
class od extends se {
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
    ], a), { angle: o, distance: i } = vo(n, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), g = (this.options.spacing + this.options.borderWidth) / 2, p = st(h, l - r), f = Ue(o, r, l) && r !== l, _ = p >= bt || f, b = te(i, d + g, u + g);
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
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > bt ? Math.floor(a / bt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(gt, a || 0)), d = n * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, ad(t, this, d, o, i), nd(t, this, d, o, i), t.restore();
  }
}
function Uo(e, t, s = t) {
  e.lineCap = st(s.borderCapStyle, t.borderCapStyle), e.setLineDash(st(s.borderDash, t.borderDash)), e.lineDashOffset = st(s.borderDashOffset, t.borderDashOffset), e.lineJoin = st(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = st(s.borderWidth, t.borderWidth), e.strokeStyle = st(s.borderColor, t.borderColor);
}
function id(e, t, s) {
  e.lineTo(s.x, s.y);
}
function rd(e) {
  return e.stepped ? Mr : e.tension || e.cubicInterpolationMode === "monotone" ? Sr : id;
}
function Ko(e, t, s = {}) {
  const a = e.length, { start: n = 0, end: o = a - 1 } = s, { start: i, end: r } = t, l = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? a + d - l : d - l
  };
}
function ld(e, t, s, a) {
  const { points: n, options: o } = t, { count: i, start: r, loop: l, ilen: d } = Ko(n, s, a), u = rd(o);
  let { move: h = !0, reverse: g } = a || {}, p, f, _;
  for (p = 0; p <= d; ++p)
    f = n[(r + (g ? d - p : p)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, _, f, g, o.stepped), _ = f);
  return l && (f = n[(r + (g ? d : 0)) % i], u(e, _, f, g, o.stepped)), !!l;
}
function cd(e, t, s, a) {
  const n = t.points, { count: o, start: i, ilen: r } = Ko(n, s, a), { move: l = !0, reverse: d } = a || {};
  let u = 0, h = 0, g, p, f, _, b, v;
  const m = (k) => (i + (d ? r - k : k)) % o, $ = () => {
    _ !== b && (e.lineTo(u, b), e.lineTo(u, _), e.lineTo(u, v));
  };
  for (l && (p = n[m(0)], e.moveTo(p.x, p.y)), g = 0; g <= r; ++g) {
    if (p = n[m(g)], p.skip)
      continue;
    const k = p.x, w = p.y, S = k | 0;
    S === f ? (w < _ ? _ = w : w > b && (b = w), u = (h * u + k) / ++h) : ($(), e.lineTo(k, w), f = S, h = 0, _ = b = w), v = w;
  }
  $();
}
function la(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? cd : ld;
}
function dd(e) {
  return e.stepped ? nl : e.tension || e.cubicInterpolationMode === "monotone" ? ol : ge;
}
function ud(e, t, s, a) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, s, a) && n.closePath()), Uo(e, t.options), e.stroke(n);
}
function hd(e, t, s, a) {
  const { segments: n, options: o } = t, i = la(t);
  for (const r of n)
    Uo(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: s,
      end: s + a - 1
    }) && e.closePath(), e.stroke();
}
const fd = typeof Path2D == "function";
function gd(e, t, s, a) {
  fd && !t.options.segment ? ud(e, t, s, a) : hd(e, t, s, a);
}
class Cs extends se {
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
      Gr(this._points, a, t, n, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = ul(this, this.options.segment));
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
    const a = this.options, n = t[s], o = this.points, i = Lo(this, {
      property: s,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], l = dd(a);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: g } = i[d], p = o[h], f = o[g];
      if (p === f) {
        r.push(p);
        continue;
      }
      const _ = Math.abs((n - p[s]) / (f[s] - p[s])), b = l(p, f, _, a.stepped);
      b[s] = t[s], r.push(b);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, a) {
    return la(this)(t, this, s, a);
  }
  path(t, s, a) {
    const n = this.segments, o = la(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), gd(t, this, a, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Tn(e, t, s, a) {
  const n = e.options, { [s]: o } = e.getProps([
    s
  ], a);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class pd extends se {
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
    return Tn(this, t, "x", s);
  }
  inYRange(t, s) {
    return Tn(this, t, "y", s);
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
    this.skip || a.radius < 0.1 || !Ke(this, s, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, oa(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Xo(e, t) {
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
function oe(e, t, s, a) {
  return e ? 0 : Tt(t, s, a);
}
function vd(e, t, s) {
  const a = e.options.borderWidth, n = e.borderSkipped, o = wo(a);
  return {
    t: oe(n.top, o.top, 0, s),
    r: oe(n.right, o.right, 0, t),
    b: oe(n.bottom, o.bottom, 0, s),
    l: oe(n.left, o.left, 0, t)
  };
}
function bd(e, t, s) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = $e(n), i = Math.min(t, s), r = e.borderSkipped, l = a || nt(n);
  return {
    topLeft: oe(!l || r.top || r.left, o.topLeft, 0, i),
    topRight: oe(!l || r.top || r.right, o.topRight, 0, i),
    bottomLeft: oe(!l || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: oe(!l || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function md(e) {
  const t = Xo(e), s = t.right - t.left, a = t.bottom - t.top, n = vd(e, s / 2, a / 2), o = bd(e, s / 2, a / 2);
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
function Vs(e, t, s, a) {
  const n = t === null, o = s === null, r = e && !(n && o) && Xo(e, a);
  return r && (n || te(t, r.left, r.right)) && (o || te(s, r.top, r.bottom));
}
function _d(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function yd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Hs(e, t, s = {}) {
  const a = e.x !== s.x ? -t : 0, n = e.y !== s.y ? -t : 0, o = (e.x + e.w !== s.x + s.w ? t : 0) - a, i = (e.y + e.h !== s.y + s.h ? t : 0) - n;
  return {
    x: e.x + a,
    y: e.y + n,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class xd extends se {
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
    const { inflateAmount: s, options: { borderColor: a, backgroundColor: n } } = this, { inner: o, outer: i } = md(this), r = _d(i.radius) ? ms : yd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, Hs(i, s, o)), t.clip(), r(t, Hs(o, -s, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, Hs(o, s)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, s, a) {
    return Vs(this, t, s, a);
  }
  inXRange(t, s) {
    return Vs(this, t, null, s);
  }
  inYRange(t, s) {
    return Vs(this, null, t, s);
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
function kd(e, t, s) {
  const a = e.segments, n = e.points, o = t.points, i = [];
  for (const r of a) {
    let { start: l, end: d } = r;
    d = Ds(l, d, n);
    const u = ca(s, n[l], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const h = Lo(t, u);
    for (const g of h) {
      const p = ca(s, o[g.start], o[g.end], g.loop), f = Fo(r, n, p);
      for (const _ of f)
        i.push({
          source: _,
          target: g,
          start: {
            [s]: Bn(u, p, "start", Math.max)
          },
          end: {
            [s]: Bn(u, p, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function ca(e, t, s, a) {
  if (a)
    return;
  let n = t[e], o = s[e];
  return e === "angle" && (n = Ot(n), o = Ot(o)), {
    property: e,
    start: n,
    end: o
  };
}
function wd(e, t) {
  const { x: s = null, y: a = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Ds(i, r, n);
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
function Ds(e, t, s) {
  for (; t > e; t--) {
    const a = s[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function Bn(e, t, s, a) {
  return e && t ? a(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Go(e, t) {
  let s = [], a = !1;
  return kt(e) ? (a = !0, s = e) : s = wd(e, t), s.length ? new Cs({
    points: s,
    options: {
      tension: 0
    },
    _loop: a,
    _fullLoop: a
  }) : null;
}
function Fn(e) {
  return e && e.fill !== !1;
}
function $d(e, t, s) {
  let n = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!s)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!Ft(n))
      return n;
    if (i = e[n], !i)
      return !1;
    if (i.visible)
      return n;
    o.push(n), n = i.fill;
  }
  return !1;
}
function Md(e, t, s) {
  const a = Ad(e);
  if (nt(a))
    return isNaN(a.value) ? !1 : a;
  let n = parseFloat(a);
  return Ft(n) && Math.floor(n) === n ? Sd(a[0], t, n, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(a) >= 0 && a;
}
function Sd(e, t, s, a) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= a ? !1 : s;
}
function Cd(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : nt(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function Dd(e, t, s) {
  let a;
  return e === "start" ? a = s : e === "end" ? a = t.options.reverse ? t.min : t.max : nt(e) ? a = e.value : a = t.getBaseValue(), a;
}
function Ad(e) {
  const t = e.options, s = t.fill;
  let a = st(s && s.target, s);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function Td(e) {
  const { scale: t, index: s, line: a } = e, n = [], o = a.segments, i = a.points, r = Bd(t, s);
  r.push(Go({
    x: null,
    y: t.bottom
  }, a));
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    for (let u = d.start; u <= d.end; u++)
      Fd(n, i[u], r);
  }
  return new Cs({
    points: n,
    options: {}
  });
}
function Bd(e, t) {
  const s = [], a = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < a.length; n++) {
    const o = a[n];
    if (o.index === t)
      break;
    o.hidden || s.unshift(o.dataset);
  }
  return s;
}
function Fd(e, t, s) {
  const a = [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n], { first: i, last: r, point: l } = Ld(o, t, "x");
    if (!(!l || i && r)) {
      if (i)
        a.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...a);
}
function Ld(e, t, s) {
  const a = e.interpolate(t, s);
  if (!a)
    return {};
  const n = a[s], o = e.segments, i = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], h = i[u.start][s], g = i[u.end][s];
    if (te(n, h, g)) {
      r = n === h, l = n === g;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: a
  };
}
class Zo {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, a) {
    const { x: n, y: o, radius: i } = this;
    return s = s || {
      start: 0,
      end: bt
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
function Pd(e) {
  const { chart: t, fill: s, line: a } = e;
  if (Ft(s))
    return Ed(t, s);
  if (s === "stack")
    return Td(e);
  if (s === "shape")
    return !0;
  const n = Rd(e);
  return n instanceof Zo ? n : Go(n, a);
}
function Ed(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function Rd(e) {
  return (e.scale || {}).getPointPositionForValue ? Id(e) : Od(e);
}
function Od(e) {
  const { scale: t = {}, fill: s } = e, a = Cd(s, t);
  if (Ft(a)) {
    const n = t.isHorizontal();
    return {
      x: n ? a : null,
      y: n ? null : a
    };
  }
  return null;
}
function Id(e) {
  const { scale: t, fill: s } = e, a = t.options, n = t.getLabels().length, o = a.reverse ? t.max : t.min, i = Dd(s, t, o), r = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new Zo({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, i));
  return r;
}
function js(e, t, s) {
  const a = Pd(t), { chart: n, index: o, line: i, scale: r, axis: l } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: g = h, below: p = h } = u || {}, f = n.getDatasetMeta(o), _ = Po(n, f);
  a && i.points.length && (ks(e, s), zd(e, {
    line: i,
    target: a,
    above: g,
    below: p,
    area: s,
    scale: r,
    axis: l,
    clip: _
  }), ws(e));
}
function zd(e, t) {
  const { line: s, target: a, above: n, below: o, area: i, scale: r, clip: l } = t, d = s._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? (Ln(e, a, i.top), Ys(e, {
    line: s,
    target: a,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Ln(e, a, i.bottom)) : d === "y" && (Pn(e, a, i.left), Ys(e, {
    line: s,
    target: a,
    color: o,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Pn(e, a, i.right), u = n)), Ys(e, {
    line: s,
    target: a,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function Ln(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[Ds(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, s), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function Pn(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[Ds(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(s, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(s, h.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Ys(e, t) {
  const { line: s, target: a, property: n, color: o, scale: i, clip: r } = t, l = kd(s, a, n);
  for (const { source: d, target: u, start: h, end: g } of l) {
    const { style: { backgroundColor: p = o } = {} } = d, f = a !== !0;
    e.save(), e.fillStyle = p, Nd(e, i, r, f && ca(n, h, g)), e.beginPath();
    const _ = !!s.pathSegment(e, d);
    let b;
    if (f) {
      _ ? e.closePath() : En(e, a, g, n);
      const v = !!a.pathSegment(e, u, {
        move: _,
        reverse: !0
      });
      b = _ && v, b || En(e, a, h, n);
    }
    e.closePath(), e.fill(b ? "evenodd" : "nonzero"), e.restore();
  }
}
function Nd(e, t, s, a) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = a || {};
  if (o === "x" || o === "y") {
    let l, d, u, h;
    o === "x" ? (l = i, d = n.top, u = r, h = n.bottom) : (l = n.left, d = i, u = n.right, h = r), e.beginPath(), s && (l = Math.max(l, s.left), u = Math.min(u, s.right), d = Math.max(d, s.top), h = Math.min(h, s.bottom)), e.rect(l, d, u - l, h - d), e.clip();
  }
}
function En(e, t, s, a) {
  const n = t.interpolate(s, a);
  n && e.lineTo(n.x, n.y);
}
var Wd = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const a = (e.data.datasets || []).length, n = [];
    let o, i, r, l;
    for (i = 0; i < a; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, l = null, r && r.options && r instanceof Cs && (l = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: Md(r, i, a),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, n.push(l);
    for (i = 0; i < a; ++i)
      l = n[i], !(!l || l.fill === !1) && (l.fill = $d(n, i, s.propagate));
  },
  beforeDraw(e, t, s) {
    const a = s.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = n.length - 1; i >= 0; --i) {
      const r = n[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), a && r.fill && js(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let n = a.length - 1; n >= 0; --n) {
      const o = a[n].$filler;
      Fn(o) && js(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const a = t.meta.$filler;
    !Fn(a) || s.drawTime !== "beforeDatasetDraw" || js(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Rn = (e, t) => {
  let { boxHeight: s = t, boxWidth: a = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, Vd = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class On extends se {
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
    let s = vt(t.generateLabels, [
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
    const a = t.labels, n = Bt(a.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Rn(a, o);
    let d, u;
    s.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, a, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let g = -1, p = -u;
    return this.legendItems.forEach((f, _) => {
      const b = a + s / 2 + o.measureText(f.text).width;
      (_ === 0 || d[d.length - 1] + b + 2 * r > i) && (h += u, d[d.length - (_ > 0 ? 0 : 1)] = 0, p += u, g++), l[_] = {
        left: 0,
        top: p,
        row: g,
        width: b,
        height: n
      }, d[d.length - 1] += b + r;
    }), h;
  }
  _fitCols(t, s, a, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, g = 0, p = 0, f = 0, _ = 0;
    return this.legendItems.forEach((b, v) => {
      const { itemWidth: m, itemHeight: $ } = Hd(a, s, o, b, n);
      v > 0 && p + $ + 2 * r > u && (h += g + r, d.push({
        width: g,
        height: p
      }), f += g + r, _++, g = p = 0), l[v] = {
        left: f,
        top: p,
        col: _,
        width: m,
        height: $
      }, g = Math.max(g, m), p += $ + r;
    }), h += g, d.push({
      width: g,
      height: p
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: a, labels: { padding: n }, rtl: o } } = this, i = Me(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = Dt(a, this.left + n, this.right - this.lineWidths[r]);
      for (const d of s)
        r !== d.row && (r = d.row, l = Dt(a, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = Dt(a, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of s)
        d.col !== r && (r = d.col, l = Dt(a, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), l += d.height + n;
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
    const { options: t, columnSizes: s, lineWidths: a, ctx: n } = this, { align: o, labels: i } = t, r = yt.color, l = Me(t.rtl, this.left, this.width), d = Bt(i.font), { padding: u } = i, h = d.size, g = h / 2;
    let p;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: f, boxHeight: _, itemHeight: b } = Rn(i, h), v = function(S, C, T) {
      if (isNaN(f) || f <= 0 || isNaN(_) || _ < 0)
        return;
      n.save();
      const P = st(T.lineWidth, 1);
      if (n.fillStyle = st(T.fillStyle, r), n.lineCap = st(T.lineCap, "butt"), n.lineDashOffset = st(T.lineDashOffset, 0), n.lineJoin = st(T.lineJoin, "miter"), n.lineWidth = P, n.strokeStyle = st(T.strokeStyle, r), n.setLineDash(st(T.lineDash, [])), i.usePointStyle) {
        const V = {
          radius: _ * Math.SQRT2 / 2,
          pointStyle: T.pointStyle,
          rotation: T.rotation,
          borderWidth: P
        }, R = l.xPlus(S, f / 2), W = C + g;
        ko(n, V, R, W, i.pointStyleWidth && f);
      } else {
        const V = C + Math.max((h - _) / 2, 0), R = l.leftForLtr(S, f), W = $e(T.borderRadius);
        n.beginPath(), Object.values(W).some((q) => q !== 0) ? ms(n, {
          x: R,
          y: V,
          w: f,
          h: _,
          radius: W
        }) : n.rect(R, V, f, _), n.fill(), P !== 0 && n.stroke();
      }
      n.restore();
    }, m = function(S, C, T) {
      Xe(n, T.text, S, C + b / 2, d, {
        strikethrough: T.hidden,
        textAlign: l.textAlign(T.textAlign)
      });
    }, $ = this.isHorizontal(), k = this._computeTitleHeight();
    $ ? p = {
      x: Dt(o, this.left + u, this.right - a[0]),
      y: this.top + u + k,
      line: 0
    } : p = {
      x: this.left + u,
      y: Dt(o, this.top + k + u, this.bottom - s[0].height),
      line: 0
    }, Ao(this.ctx, t.textDirection);
    const w = b + u;
    this.legendItems.forEach((S, C) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const T = n.measureText(S.text).width, P = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), V = f + g + T;
      let R = p.x, W = p.y;
      l.setWidth(this.width), $ ? C > 0 && R + V + u > this.right && (W = p.y += w, p.line++, R = p.x = Dt(o, this.left + u, this.right - a[p.line])) : C > 0 && W + w > this.bottom && (R = p.x = R + s[p.line].width + u, p.line++, W = p.y = Dt(o, this.top + k + u, this.bottom - s[p.line].height));
      const q = l.x(R);
      if (v(q, W, S), R = hr(P, R + f + g, $ ? R + V : this.right, t.rtl), m(l.x(R), W, S), $)
        p.x += V + u;
      else if (typeof S.text != "string") {
        const A = d.lineHeight;
        p.y += Qo(S, A) + u;
      } else
        p.y += w;
    }), To(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, a = Bt(s.font), n = Vt(s.padding);
    if (!s.display)
      return;
    const o = Me(t.rtl, this.left, this.width), i = this.ctx, r = s.position, l = a.size / 2, d = n.top + l;
    let u, h = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), u = this.top + d, h = Dt(t.align, h, this.right - g);
    else {
      const f = this.columnSizes.reduce((_, b) => Math.max(_, b.height), 0);
      u = d + Dt(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const p = Dt(r, h, h + g);
    i.textAlign = o.textAlign(pa(r)), i.textBaseline = "middle", i.strokeStyle = s.color, i.fillStyle = s.color, i.font = a.string, Xe(i, s.text, p, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = Bt(t.font), a = Vt(t.padding);
    return t.display ? s.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, s) {
    let a, n, o;
    if (te(t, this.left, this.right) && te(s, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (n = o[a], te(t, n.left, n.left + n.width) && te(s, n.top, n.top + n.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!qd(t.type, s))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = Vd(n, a);
      n && !o && vt(s.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = a, a && !o && vt(s.onHover, [
        t,
        a,
        this
      ], this);
    } else a && vt(s.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Hd(e, t, s, a, n) {
  const o = jd(a, e, t, s), i = Yd(n, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function jd(e, t, s, a) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + s.size / 2 + a.measureText(n).width;
}
function Yd(e, t, s) {
  let a = e;
  return typeof t.text != "string" && (a = Qo(t, s)), a;
}
function Qo(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function qd(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Ma = {
  id: "legend",
  _element: On,
  start(e, t, s) {
    const a = e.legend = new On({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Wt.configure(e, a, s), Wt.addBox(e, a);
  },
  stop(e) {
    Wt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const a = e.legend;
    Wt.configure(e, a, s), a.options = s;
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
          const d = l.controller.getStyle(s ? 0 : void 0), u = Vt(d.borderWidth);
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
class Jo extends se {
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
    this._padding = Vt(a.padding);
    const o = n * Bt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: a, bottom: n, right: o, options: i } = this, r = i.align;
    let l = 0, d, u, h;
    return this.isHorizontal() ? (u = Dt(r, a, o), h = s + t, d = o - a) : (i.position === "left" ? (u = a + t, h = Dt(r, n, s), l = gt * -0.5) : (u = o - t, h = Dt(r, s, n), l = gt * 0.5), d = n - s), {
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
    const a = Bt(s.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(o);
    Xe(t, s.text, 0, 0, a, {
      color: s.color,
      maxWidth: l,
      rotation: d,
      textAlign: pa(s.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function Ud(e, t) {
  const s = new Jo({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Wt.configure(e, s, t), Wt.addBox(e, s), e.titleBlock = s;
}
var ti = {
  id: "title",
  _element: Jo,
  start(e, t, s) {
    Ud(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Wt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const a = e.titleBlock;
    Wt.configure(e, a, s), a.options = s;
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
        const d = l.getCenterPoint(), u = aa(t, d);
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
function Yt(e, t) {
  return t && (kt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Gt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Kd(e, t) {
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
function In(e, t) {
  const s = e.chart.ctx, { body: a, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, l = Bt(t.bodyFont), d = Bt(t.titleFont), u = Bt(t.footerFont), h = o.length, g = n.length, p = a.length, f = Vt(t.padding);
  let _ = f.height, b = 0, v = a.reduce((k, w) => k + w.before.length + w.lines.length + w.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const k = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    _ += p * k + (v - p) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  g && (_ += t.footerMarginTop + g * u.lineHeight + (g - 1) * t.footerSpacing);
  let m = 0;
  const $ = function(k) {
    b = Math.max(b, s.measureText(k).width + m);
  };
  return s.save(), s.font = d.string, ft(e.title, $), s.font = l.string, ft(e.beforeBody.concat(e.afterBody), $), m = t.displayColors ? i + 2 + t.boxPadding : 0, ft(a, (k) => {
    ft(k.before, $), ft(k.lines, $), ft(k.after, $);
  }), m = 0, s.font = u.string, ft(e.footer, $), s.restore(), b += f.width, {
    width: b,
    height: _
  };
}
function Xd(e, t) {
  const { y: s, height: a } = t;
  return s < a / 2 ? "top" : s > e.height - a / 2 ? "bottom" : "center";
}
function Gd(e, t, s, a) {
  const { x: n, width: o } = a, i = s.caretSize + s.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function Zd(e, t, s, a) {
  const { x: n, width: o } = s, { width: i, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return a === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), Gd(d, e, t, s) && (d = "center"), d;
}
function zn(e, t, s) {
  const a = s.yAlign || t.yAlign || Xd(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || Zd(e, t, s, a),
    yAlign: a
  };
}
function Qd(e, t) {
  let { x: s, width: a } = e;
  return t === "right" ? s -= a : t === "center" && (s -= a / 2), s;
}
function Jd(e, t, s) {
  let { y: a, height: n } = e;
  return t === "top" ? a += s : t === "bottom" ? a -= n + s : a -= n / 2, a;
}
function Nn(e, t, s, a) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: l } = s, d = n + o, { topLeft: u, topRight: h, bottomLeft: g, bottomRight: p } = $e(i);
  let f = Qd(t, r);
  const _ = Jd(t, l, d);
  return l === "center" ? r === "left" ? f += d : r === "right" && (f -= d) : r === "left" ? f -= Math.max(u, g) + n : r === "right" && (f += Math.max(h, p) + n), {
    x: Tt(f, 0, a.width - t.width),
    y: Tt(_, 0, a.height - t.height)
  };
}
function ds(e, t, s) {
  const a = Vt(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Wn(e) {
  return Yt([], Gt(e));
}
function tu(e, t, s) {
  return _e(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Vn(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const ei = {
  beforeTitle: Kt,
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
  afterTitle: Kt,
  beforeBody: Kt,
  beforeLabel: Kt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return ut(s) || (t += s), t;
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
  afterLabel: Kt,
  afterBody: Kt,
  beforeFooter: Kt,
  footer: Kt,
  afterFooter: Kt
};
function Pt(e, t, s, a) {
  const n = e[t].call(s, a);
  return typeof n > "u" ? ei[t].call(s, a) : n;
}
class Hn extends se {
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
    const s = this.chart, a = this.options.setContext(this.getContext()), n = a.enabled && s.options.animation && a.animations, o = new Eo(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = tu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: a } = s, n = Pt(a, "beforeTitle", this, t), o = Pt(a, "title", this, t), i = Pt(a, "afterTitle", this, t);
    let r = [];
    return r = Yt(r, Gt(n)), r = Yt(r, Gt(o)), r = Yt(r, Gt(i)), r;
  }
  getBeforeBody(t, s) {
    return Wn(Pt(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: a } = s, n = [];
    return ft(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Vn(a, o);
      Yt(i.before, Gt(Pt(r, "beforeLabel", this, o))), Yt(i.lines, Pt(r, "label", this, o)), Yt(i.after, Gt(Pt(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, s) {
    return Wn(Pt(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: a } = s, n = Pt(a, "beforeFooter", this, t), o = Pt(a, "footer", this, t), i = Pt(a, "afterFooter", this, t);
    let r = [];
    return r = Yt(r, Gt(n)), r = Yt(r, Gt(o)), r = Yt(r, Gt(i)), r;
  }
  _createItems(t) {
    const s = this._active, a = this.chart.data, n = [], o = [], i = [];
    let r = [], l, d;
    for (l = 0, d = s.length; l < d; ++l)
      r.push(Kd(this.chart, s[l]));
    return t.filter && (r = r.filter((u, h, g) => t.filter(u, h, g, a))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, a))), ft(r, (u) => {
      const h = Vn(t.callbacks, u);
      n.push(Pt(h, "labelColor", this, u)), o.push(Pt(h, "labelPointStyle", this, u)), i.push(Pt(h, "labelTextColor", this, u));
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
      const r = Ie[a.position].call(this, n, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const l = this._size = In(this, a), d = Object.assign({}, r, l), u = zn(this.chart, a, d), h = Nn(a, d, u, this.chart);
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
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = a, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: h } = $e(r), { x: g, y: p } = t, { width: f, height: _ } = s;
    let b, v, m, $, k, w;
    return o === "center" ? (k = p + _ / 2, n === "left" ? (b = g, v = b - i, $ = k + i, w = k - i) : (b = g + f, v = b + i, $ = k - i, w = k + i), m = b) : (n === "left" ? v = g + Math.max(l, u) + i : n === "right" ? v = g + f - Math.max(d, h) - i : v = this.caretX, o === "top" ? ($ = p, k = $ - i, b = v - i, m = v + i) : ($ = p + _, k = $ + i, b = v + i, m = v - i), w = $), {
      x1: b,
      x2: v,
      x3: m,
      y1: $,
      y2: k,
      y3: w
    };
  }
  drawTitle(t, s, a) {
    const n = this.title, o = n.length;
    let i, r, l;
    if (o) {
      const d = Me(a.rtl, this.x, this.width);
      for (t.x = ds(this, a.titleAlign, a), s.textAlign = d.textAlign(a.titleAlign), s.textBaseline = "middle", i = Bt(a.titleFont), r = a.titleSpacing, s.fillStyle = a.titleColor, s.font = i.string, l = 0; l < o; ++l)
        s.fillText(n[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === o && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, a, n, o) {
    const i = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: d } = o, u = Bt(o.bodyFont), h = ds(this, "left", o), g = n.x(h), p = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, f = s.y + p;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, b = n.leftForLtr(g, d) + d / 2, v = f + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, oa(t, _, b, v), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, oa(t, _, b, v);
    } else {
      t.lineWidth = nt(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const _ = n.leftForLtr(g, d), b = n.leftForLtr(n.xPlus(g, 1), d - 2), v = $e(i.borderRadius);
      Object.values(v).some((m) => m !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, ms(t, {
        x: _,
        y: f,
        w: d,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ms(t, {
        x: b,
        y: f + 1,
        w: d - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(_, f, d, l), t.strokeRect(_, f, d, l), t.fillStyle = i.backgroundColor, t.fillRect(b, f + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, s, a) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = a, h = Bt(a.bodyFont);
    let g = h.lineHeight, p = 0;
    const f = Me(a.rtl, this.x, this.width), _ = function(T) {
      s.fillText(T, f.x(t.x + p), t.y + g / 2), t.y += g + o;
    }, b = f.textAlign(i);
    let v, m, $, k, w, S, C;
    for (s.textAlign = i, s.textBaseline = "middle", s.font = h.string, t.x = ds(this, b, a), s.fillStyle = a.bodyColor, ft(this.beforeBody, _), p = r && b !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, k = 0, S = n.length; k < S; ++k) {
      for (v = n[k], m = this.labelTextColors[k], s.fillStyle = m, ft(v.before, _), $ = v.lines, r && $.length && (this._drawColorBox(s, t, k, f, a), g = Math.max(h.lineHeight, l)), w = 0, C = $.length; w < C; ++w)
        _($[w]), g = h.lineHeight;
      ft(v.after, _);
    }
    p = 0, g = h.lineHeight, ft(this.afterBody, _), t.y -= o;
  }
  drawFooter(t, s, a) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const l = Me(a.rtl, this.x, this.width);
      for (t.x = ds(this, a.footerAlign, a), t.y += a.footerMarginTop, s.textAlign = l.textAlign(a.footerAlign), s.textBaseline = "middle", i = Bt(a.footerFont), s.fillStyle = a.footerColor, s.font = i.string, r = 0; r < o; ++r)
        s.fillText(n[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, s, a, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: l } = t, { width: d, height: u } = a, { topLeft: h, topRight: g, bottomLeft: p, bottomRight: f } = $e(n.cornerRadius);
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, s.lineWidth = n.borderWidth, s.beginPath(), s.moveTo(r + h, l), i === "top" && this.drawCaret(t, s, a, n), s.lineTo(r + d - g, l), s.quadraticCurveTo(r + d, l, r + d, l + g), i === "center" && o === "right" && this.drawCaret(t, s, a, n), s.lineTo(r + d, l + u - f), s.quadraticCurveTo(r + d, l + u, r + d - f, l + u), i === "bottom" && this.drawCaret(t, s, a, n), s.lineTo(r + p, l + u), s.quadraticCurveTo(r, l + u, r, l + u - p), i === "center" && o === "left" && this.drawCaret(t, s, a, n), s.lineTo(r, l + h), s.quadraticCurveTo(r, l, r + h, l), s.closePath(), s.fill(), n.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, a = this.$animations, n = a && a.x, o = a && a.y;
    if (n || o) {
      const i = Ie[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = In(this, t), l = Object.assign({}, i, this._size), d = zn(s, t, l), u = Nn(t, l, d, s);
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
    const i = Vt(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, n, s), Ao(t, s.textDirection), o.y += i.top, this.drawTitle(o, t, s), this.drawBody(o, t, s), this.drawFooter(o, t, s), To(t, s.textDirection), t.restore());
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
    }), o = !ps(a, n), i = this._positionChanged(n, s);
    (o || i) && (this._active = n, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, a = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], i = this._getActiveElements(t, o, s, a), r = this._positionChanged(i, t), l = s || !ps(i, o) || r;
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
    const { caretX: a, caretY: n, options: o } = this, i = Ie[o.position].call(this, t, s);
    return i !== !1 && (a !== i.x || n !== i.y);
  }
}
var Sa = {
  id: "tooltip",
  _element: Hn,
  positioners: Ie,
  afterInit(e, t, s) {
    s && (e.tooltip = new Hn({
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
    callbacks: ei
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
const eu = (e, t, s, a) => (typeof t == "string" ? (s = e.push(t) - 1, a.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function su(e, t, s, a) {
  const n = e.indexOf(t);
  if (n === -1)
    return eu(e, t, s, a);
  const o = e.lastIndexOf(t);
  return n !== o ? s : n;
}
const au = (e, t) => e === null ? null : Tt(Math.round(e), 0, t);
function jn(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class si extends De {
  static id = "category";
  static defaults = {
    ticks: {
      callback: jn
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
    if (ut(t))
      return null;
    const a = this.getLabels();
    return s = isFinite(s) && a[s] === t ? s : su(a, t, st(s, t), this._addedLabels), au(s, a.length - 1);
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
    return jn.call(this, t);
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
function nu(e, t) {
  const s = [], { bounds: n, step: o, min: i, max: r, precision: l, count: d, maxTicks: u, maxDigits: h, includeBounds: g } = e, p = o || 1, f = u - 1, { min: _, max: b } = t, v = !ut(i), m = !ut(r), $ = !ut(d), k = (b - _) / (h + 1);
  let w = za((b - _) / f / p) * p, S, C, T, P;
  if (w < 1e-14 && !v && !m)
    return [
      {
        value: _
      },
      {
        value: b
      }
    ];
  P = Math.ceil(b / w) - Math.floor(_ / w), P > f && (w = za(P * w / f / p) * p), ut(l) || (S = Math.pow(10, l), w = Math.ceil(w * S) / S), n === "ticks" ? (C = Math.floor(_ / w) * w, T = Math.ceil(b / w) * w) : (C = _, T = b), v && m && o && ar((r - i) / o, w / 1e3) ? (P = Math.round(Math.min((r - i) / w, u)), w = (r - i) / P, C = i, T = r) : $ ? (C = v ? i : C, T = m ? r : T, P = d - 1, w = (T - C) / P) : (P = (T - C) / w, Ne(P, Math.round(P), w / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const V = Math.max(Na(w), Na(C));
  S = Math.pow(10, ut(l) ? V : l), C = Math.round(C * S) / S, T = Math.round(T * S) / S;
  let R = 0;
  for (v && (g && C !== i ? (s.push({
    value: i
  }), C < i && R++, Ne(Math.round((C + R * w) * S) / S, i, Yn(i, k, e)) && R++) : C < i && R++); R < P; ++R) {
    const W = Math.round((C + R * w) * S) / S;
    if (m && W > r)
      break;
    s.push({
      value: W
    });
  }
  return m && g && T !== r ? s.length && Ne(s[s.length - 1].value, r, Yn(r, k, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!m || T === r) && s.push({
    value: T
  }), s;
}
function Yn(e, t, { horizontal: s, minRotation: a }) {
  const n = Jt(a), o = (s ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class ou extends De {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return ut(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: a } = this.getUserBounds();
    let { min: n, max: o } = this;
    const i = (l) => n = s ? n : l, r = (l) => o = a ? o : l;
    if (t) {
      const l = Ut(n), d = Ut(o);
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
    }, o = this._range || this, i = nu(n, o);
    return t.bounds === "ticks" && nr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return ba(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ai extends ou {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: xo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = Ft(t) ? t : 0, this.max = Ft(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, a = Jt(this.options.ticks.minRotation), n = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, o.lineHeight / n));
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
}, Et = /* @__PURE__ */ Object.keys(As);
function qn(e, t) {
  return e - t;
}
function Un(e, t) {
  if (ut(t))
    return null;
  const s = e._adapter, { parser: a, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), Ft(i) || (i = typeof a == "string" ? s.parse(i, a) : s.parse(i)), i === null ? null : (n && (i = n === "week" && (qe(o) || o === !0) ? s.startOf(i, "isoWeek", o) : s.startOf(i, n)), +i);
}
function Kn(e, t, s, a) {
  const n = Et.length;
  for (let o = Et.indexOf(e); o < n - 1; ++o) {
    const i = As[Et[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((s - t) / (r * i.size)) <= a)
      return Et[o];
  }
  return Et[n - 1];
}
function iu(e, t, s, a, n) {
  for (let o = Et.length - 1; o >= Et.indexOf(s); o--) {
    const i = Et[o];
    if (As[i].common && e._adapter.diff(n, a, i) >= t - 1)
      return i;
  }
  return Et[s ? Et.indexOf(s) : 0];
}
function ru(e) {
  for (let t = Et.indexOf(e) + 1, s = Et.length; t < s; ++t)
    if (As[Et[t]].common)
      return Et[t];
}
function Xn(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: a, hi: n } = ga(s, t), o = s[a] >= t ? s[a] : s[n];
    e[o] = !0;
  }
}
function lu(e, t, s, a) {
  const n = e._adapter, o = +n.startOf(t[0].value, a), i = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= i; r = +n.add(r, 1, a))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Gn(e, t, s) {
  const a = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, a.push({
      value: r,
      major: !1
    });
  return o === 0 || !s ? a : lu(e, a, n, s);
}
class Zn extends De {
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
    const a = t.time || (t.time = {}), n = this._adapter = new jl._date(t.adapters.date);
    n.init(s), ze(a.displayFormats, n.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : Un(this, t);
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
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = Ft(n) && !isNaN(n) ? n : +s.startOf(Date.now(), a), o = Ft(o) && !isNaN(o) ? o : +s.endOf(Date.now(), a) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
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
    const o = this.min, i = this.max, r = cr(n, o, i);
    return this._unit = s.unit || (a.autoSkip ? Kn(s.minUnit, this.min, this.max, this._getLabelCapacity(o)) : iu(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : ru(this._unit), this.initOffsets(n), t.reverse && r.reverse(), Gn(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, a = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - n : s = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    s = Tt(s, 0, i), a = Tt(a, 0, i), this._offsets = {
      start: s,
      end: a,
      factor: 1 / (s + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, a = this.max, n = this.options, o = n.time, i = o.unit || Kn(o.minUnit, s, a, this._getLabelCapacity(s)), r = st(n.ticks.stepSize, 1), l = i === "week" ? o.isoWeekday : !1, d = qe(l) || l === !0, u = {};
    let h = s, g, p;
    if (d && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, d ? "day" : i), t.diff(a, s, i) > 1e5 * r)
      throw new Error(s + " and " + a + " are too far apart with stepSize of " + r + " " + i);
    const f = n.ticks.source === "data" && this.getDataTimestamps();
    for (g = h, p = 0; g < a; g = +t.add(g, r, i), p++)
      Xn(u, g, f);
    return (g === a || n.bounds === "ticks" || p === 1) && Xn(u, g, f), Object.keys(u).sort(qn).map((_) => +_);
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
      return vt(i, [
        t,
        s,
        a
      ], this);
    const r = o.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], h = d && r[d], g = a[s], p = d && h && g && g.major;
    return this._adapter.format(t, n || (p ? h : u));
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
    const s = this.options.ticks, a = this.ctx.measureText(t).width, n = Jt(this.isHorizontal() ? s.maxRotation : s.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + r * i,
      h: a * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, a = s.displayFormats, n = a[s.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, Gn(this, [
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
      t.push(Un(this, n[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return mo(t.sort(qn));
  }
}
function us(e, t, s) {
  let a = 0, n = e.length - 1, o, i, r, l;
  s ? (t >= e[a].pos && t <= e[n].pos && ({ lo: a, hi: n } = pe(e, "pos", t)), { pos: o, time: r } = e[a], { pos: i, time: l } = e[n]) : (t >= e[a].time && t <= e[n].time && ({ lo: a, hi: n } = pe(e, "time", t)), { time: o, pos: r } = e[a], { time: i, pos: l } = e[n]);
  const d = i - o;
  return d ? r + (l - r) * (t - o) / d : r;
}
class Qw extends Zn {
  static id = "timeseries";
  static defaults = Zn.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = us(s, this.min), this._tableRange = us(s, this.max) - this._minPos, super.initOffsets(t);
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
    return (us(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return us(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const ni = {
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
}, cu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, du = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...ni,
  ...cu
}, uu = fi[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ke(e) {
  return io(e) ? ea(e) : e;
}
function hu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return io(t) ? new Proxy(e, {}) : e;
}
function fu(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function oi(e, t) {
  e.labels = t;
}
function ii(e, t, s) {
  const a = [];
  e.datasets = t.map((n) => {
    const o = e.datasets.find((i) => i[s] === n[s]);
    return !o || !n.data || a.includes(o) ? {
      ...n
    } : (a.push(o), Object.assign(o, n), o);
  });
}
function gu(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return oi(s, e.labels), ii(s, e.datasets, t), s;
}
const pu = at({
  props: du,
  setup(e, t) {
    let { expose: s, slots: a } = t;
    const n = ot(null), o = no(null);
    s({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: g, datasetIdKey: p } = e, f = gu(u, p), _ = hu(f, u);
      o.value = new Ae(n.value, {
        type: d,
        data: _,
        options: {
          ...h
        },
        plugins: g
      });
    }, r = () => {
      const d = ea(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return Ze(i), oo(r), Ht([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, g] = d, [p, f] = u;
      const _ = ea(o.value);
      if (!_)
        return;
      let b = !1;
      if (h) {
        const v = ke(h), m = ke(p);
        v && v !== m && (fu(_, v), b = !0);
      }
      if (g) {
        const v = ke(g.labels), m = ke(f.labels), $ = ke(g.datasets), k = ke(f.datasets);
        v !== m && (oi(_.config.data, v), b = !0), $ && $ !== k && (ii(_.config.data, $, e.datasetIdKey), b = !0);
      }
      b && Qt(() => {
        l(_);
      });
    }, {
      deep: !0
    }), () => ta("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      ta("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function Ca(e, t) {
  return Ae.register(t), at({
    props: ni,
    setup(s, a) {
      let { expose: n } = a;
      const o = no(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => ta(pu, uu({
        ref: i
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const vu = /* @__PURE__ */ Ca("bar", zl), bu = /* @__PURE__ */ Ca("line", Vl), mu = /* @__PURE__ */ Ca("pie", Hl), Qn = {
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
}, Jn = {
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
}, _u = [
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
  const t = ot("light");
  let s = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = D(() => e?.value ? e.value : t.value), o = D(() => n.value === "dark"), i = D(() => o.value ? Jn : Qn), r = () => {
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
  }), oo(() => {
    l();
  }), e && Ht(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Qn,
    darkColors: Jn,
    chartSeriesColors: _u
  };
}
const yu = { class: "chart-container" }, xu = /* @__PURE__ */ at({
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
      si,
      ai,
      xd,
      ti,
      Sa,
      Ma
    );
    const { isDark: a, colors: n } = rt(it(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
    return t({ isDark: a }), (l, d) => (y(), x("div", yu, [
      J(L(vu), {
        data: L(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), et = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of t)
    s[a] = n;
  return s;
}, ee = /* @__PURE__ */ et(xu, [["__scopeId", "data-v-105d8c6f"]]), ku = { class: "chart-container" }, wu = /* @__PURE__ */ at({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ae.register(
      si,
      ai,
      pd,
      Cs,
      ti,
      Sa,
      Ma,
      Wd
    );
    const { isDark: a, colors: n } = rt(it(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
    return t({ isDark: a }), (l, d) => (y(), x("div", ku, [
      J(L(bu), {
        data: L(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), le = /* @__PURE__ */ et(wu, [["__scopeId", "data-v-bacd3848"]]), $u = { class: "chart-container" }, Mu = /* @__PURE__ */ at({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ae.register(od, Sa, Ma);
    const { isDark: a, colors: n } = rt(it(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
                const g = l.getDatasetMeta(0), p = d.datasets[0], f = p.data[h], _ = Array.isArray(p.backgroundColor) ? p.backgroundColor[h] : p.backgroundColor;
                return {
                  text: `${i(u)}: ${f}`,
                  fillStyle: _,
                  hidden: g.data[h]?.hidden || !1,
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
              const d = l.label || "", u = l.parsed || 0, h = l.dataset.data.reduce((p, f) => p + f, 0), g = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${g}%)`;
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
    return t({ isDark: a }), (l, d) => (y(), x("div", $u, [
      J(L(mu), {
        data: L(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ts = /* @__PURE__ */ et(Mu, [["__scopeId", "data-v-23a84317"]]), Su = { class: "chart-container" }, Cu = ["viewBox"], Du = ["transform"], Au = ["x", "width", "fill", "stroke"], Tu = ["fill"], Bu = ["x1", "y1", "x2", "y2", "stroke"], Fu = ["points", "fill"], Lu = ["x1", "y1", "x2", "y2", "stroke"], Pu = ["x", "y", "fill"], Eu = ["x1", "y1", "x2", "y2", "stroke"], Ru = ["points", "fill"], Ou = ["transform"], Iu = ["y1", "y2"], zu = ["y1", "y2"], Nu = ["y1", "y2"], Wu = ["y1", "y2"], Vu = ["y", "height"], Hu = ["y1", "y2"], ju = ["y1", "y2"], Yu = ["y1", "y2"], qu = ["y1", "y2"], Uu = ["y", "height"], Ku = ["cy", "stroke", "onMouseenter"], Xu = ["cy", "stroke", "onMouseenter"], Gu = ["cy", "stroke", "onMouseenter"], Zu = ["cy", "stroke", "onMouseenter"], Qu = ["y1", "y2", "onMouseenter"], Ju = ["y1", "y2", "onMouseenter"], th = ["x", "y", "fill"], eh = ["x", "y", "fill"], sh = ["transform"], ah = { transform: "translate(-200, 0)" }, nh = ["stroke"], oh = ["fill"], ih = { transform: "translate(-130, 0)" }, rh = ["stroke"], lh = ["fill"], ch = { transform: "translate(-60, 0)" }, dh = ["stroke"], uh = ["fill"], hh = { transform: "translate(10, 0)" }, fh = ["stroke"], gh = ["fill"], ph = { transform: "translate(80, 0)" }, vh = ["fill"], bh = { transform: "translate(150, 0)" }, mh = ["fill"], _h = /* @__PURE__ */ at({
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
    const s = e, { isDark: a } = rt(it(s, "theme")), n = D(() => ({
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
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g, p) => {
      const f = g.currentTarget.closest("svg");
      if (!f) return;
      const _ = f.getBoundingClientRect(), b = f.createSVGPoint();
      b.x = g.clientX - _.left, b.y = g.clientY - _.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: p
      };
    }, l = (g) => {
      if (o.value.visible) {
        const p = g.currentTarget, f = p.getBoundingClientRect(), _ = p.createSVGPoint();
        _.x = g.clientX - f.left, _.y = g.clientY - f.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const g = [], f = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, v = (b - 1) / 9, m = s.chartMargin + f - v * f;
        g.push({ value: b, y: m });
      }
      return g;
    });
    return t({ isDark: a }), (g, p) => (y(), x("div", Su, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: xt(`min-height: ${e.chartHeight}px;`),
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
          }, null, 8, Au),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, M(o.value.text), 9, Tu)
        ], 8, Du)) : N("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Bu),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Fu),
        (y(!0), x(K, null, Q(h.value, (f, _) => (y(), x(K, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Lu),
          c("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(f.value), 9, Pu)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Eu),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Ru),
        (y(!0), x(K, null, Q(e.boxplotData, (f, _) => (y(), x(K, { key: _ }, [
          c("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (y(), x(K, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Iu),
              c("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, zu),
              c("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Nu),
              c("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Wu),
              c("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Vu)
            ], 64)) : (y(), x(K, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Hu),
              c("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ju),
              c("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Yu),
              c("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, qu),
              c("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Uu)
            ], 64)),
            c("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ku),
            c("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Xu),
            c("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Gu),
            c("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Zu),
            c("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Qu),
            f.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ju)) : N("", !0)
          ], 8, Ou),
          c("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(f.label)), 9, th),
          f.responseCount ? (y(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(f.responseCount), 9, eh)) : N("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", ah, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, nh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, oh)
          ]),
          c("g", ih, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, rh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, lh)
          ]),
          c("g", ch, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, dh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, uh)
          ]),
          c("g", hh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, fh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, gh)
          ]),
          c("g", ph, [
            p[0] || (p[0] = c("line", {
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
            }, " Avg ", 8, vh)
          ]),
          c("g", bh, [
            p[1] || (p[1] = c("line", {
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
            }, " Median ", 8, mh)
          ])
        ], 8, sh)) : N("", !0)
      ], 44, Cu))
    ]));
  }
}), yh = /* @__PURE__ */ et(_h, [["__scopeId", "data-v-520c623f"]]), xh = { class: "chart-container" }, kh = ["viewBox"], wh = ["transform"], $h = ["x", "y", "width", "height", "fill", "stroke"], Mh = ["y", "fill"], Sh = ["y", "fill"], Ch = ["x1", "y1", "x2", "y2", "stroke"], Dh = ["points", "fill"], Ah = ["x1", "y1", "x2", "y2", "stroke"], Th = ["x1", "y1", "x2", "y2", "stroke"], Bh = ["x", "y", "fill"], Fh = ["x", "y", "fill", "transform"], Lh = ["x1", "y1", "x2", "y2", "stroke"], Ph = ["points", "fill"], Eh = ["transform"], Rh = ["y1", "y2", "stroke", "onMouseenter"], Oh = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Ih = ["x1", "y1", "x2", "y2", "onMouseenter"], zh = ["x1", "y1", "x2", "y2", "onMouseenter"], Nh = ["cy", "stroke", "onMouseenter"], Wh = ["cy", "stroke", "onMouseenter"], Vh = ["x", "y", "fill"], Hh = ["x", "y", "fill"], jh = ["transform"], Yh = { transform: "translate(-180, 0)" }, qh = ["stroke"], Uh = ["fill"], Kh = { transform: "translate(-120, 0)" }, Xh = ["fill"], Gh = { transform: "translate(-60, 0)" }, Zh = ["fill"], Qh = { transform: "translate(0, 0)" }, Jh = ["stroke"], tf = ["fill"], ef = { transform: "translate(60, 0)" }, sf = ["fill"], af = { transform: "translate(130, 0)" }, nf = ["fill"], of = /* @__PURE__ */ at({
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
    const s = e, { isDark: a } = rt(it(s, "theme")), n = D(() => ({
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
    })), o = ot({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, r = (g, p, f) => {
      const _ = g.currentTarget.closest("svg");
      if (!_) return;
      const b = _.getBoundingClientRect(), v = _.createSVGPoint();
      v.x = g.clientX - b.left, v.y = g.clientY - b.top;
      let m = i(p.label), $ = "";
      switch (f) {
        case "body":
          $ = `Q1: ${p.q1.toFixed(1)} | Q3: ${p.q3.toFixed(1)}`;
          break;
        case "wick":
          $ = `Min: ${p.low.toFixed(1)} | Max: ${p.high.toFixed(1)}`;
          break;
        case "median":
          $ = `Median: ${p.median.toFixed(1)}`;
          break;
        case "average":
          $ = `Average: ${p.average?.toFixed(1)}`;
          break;
        case "min":
          $ = `Min: ${p.low.toFixed(1)}`;
          break;
        case "max":
          $ = `Max: ${p.high.toFixed(1)}`;
          break;
      }
      const k = Math.max(180, $.length * 7 + 40), w = 48;
      o.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        title: m,
        text: $,
        width: k,
        height: w
      };
    }, l = (g) => {
      if (o.value.visible) {
        const p = g.currentTarget, f = p.getBoundingClientRect(), _ = p.createSVGPoint();
        _.x = g.clientX - f.left, _.y = g.clientY - f.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const g = [], f = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, v = (b - 1) / 9, m = s.chartMargin + f - v * f;
        g.push({ value: b, y: m });
      }
      return g;
    });
    return t({ isDark: a }), (g, p) => (y(), x("div", xh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: xt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
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
          }, null, 8, $h),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, Mh),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, Sh)
        ], 8, wh)) : N("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Ch),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Dh),
        (y(!0), x(K, null, Q(h.value, (f, _) => (y(), x("line", {
          key: `grid-${_}`,
          x1: e.chartMargin,
          y1: f.y,
          x2: e.chartWidth - e.chartMargin,
          y2: f.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Ah))), 128)),
        (y(!0), x(K, null, Q(h.value, (f, _) => (y(), x(K, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Th),
          c("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(f.value), 9, Bh)
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
        }, M(i(e.yAxisLabel)), 9, Fh),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Lh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Ph),
        (y(!0), x(K, null, Q(e.candlestickData, (f, _) => (y(), x(K, { key: _ }, [
          c("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            c("line", {
              x1: 0,
              y1: f.highY,
              x2: 0,
              y2: f.lowY,
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Rh),
            c("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(f.q1Y, f.q3Y) - (Math.abs(f.q3Y - f.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(f.q3Y - f.q1Y)),
              fill: f.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (b) => r(b, f, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Oh),
            f.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: f.medianY,
              x2: e.candleWidth / 2,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ih)) : N("", !0),
            f.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: f.averageY,
              x2: e.candleWidth / 2,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, zh)) : N("", !0),
            c("circle", {
              cx: 0,
              cy: f.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, f, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Nh),
            c("circle", {
              cx: 0,
              cy: f.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, f, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Wh)
          ], 8, Eh),
          c("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(f.label)), 9, Vh),
          f.responseCount ? (y(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(f.responseCount), 9, Hh)) : N("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Yh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, qh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Uh)
          ]),
          c("g", Kh, [
            p[0] || (p[0] = c("rect", {
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
            }, " Q1 ", 8, Xh)
          ]),
          c("g", Gh, [
            p[1] || (p[1] = c("rect", {
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
            }, " Q3 ", 8, Zh)
          ]),
          c("g", Qh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Jh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, tf)
          ]),
          c("g", ef, [
            p[2] || (p[2] = c("line", {
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
            }, " Avg ", 8, sf)
          ]),
          c("g", af, [
            p[3] || (p[3] = c("line", {
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
            }, " Median ", 8, nf)
          ])
        ], 8, jh)) : N("", !0)
      ], 44, kh))
    ]));
  }
}), ri = /* @__PURE__ */ et(of, [["__scopeId", "data-v-61d0259c"]]), rf = { class: "chart-container" }, lf = ["viewBox"], cf = ["transform"], df = ["x", "y", "width", "height", "fill", "stroke"], uf = ["y", "fill"], hf = ["y", "fill"], ff = ["x1", "y1", "x2", "y2", "stroke"], gf = ["x1", "y1", "x2", "y2", "stroke"], pf = ["points", "fill"], vf = ["x1", "y1", "x2", "y2", "stroke"], bf = ["x", "y", "fill"], mf = ["x", "y", "fill", "transform"], _f = ["x1", "y1", "x2", "y2", "stroke"], yf = ["points", "fill"], xf = ["x1", "y1", "x2", "y2", "stroke"], kf = ["x", "y", "fill"], wf = ["x", "y", "fill"], $f = ["d"], Mf = ["x", "y", "width", "height", "onMouseenter"], Sf = ["x1", "y1", "x2", "y2"], Cf = ["x", "y"], Df = ["x1", "y1", "x2", "y2"], Af = ["x", "y"], Tf = ["x1", "y1", "x2", "y2"], Bf = ["x", "y"], Ff = ["x1", "y1", "x2", "y2"], Lf = ["x", "y"], Pf = ["x1", "y1", "x2", "y2"], Ef = ["x", "y"], Rf = ["x1", "y1", "x2", "y2"], Of = ["x", "y"], If = ["transform"], zf = { transform: "translate(-220, 0)" }, Nf = ["fill"], Wf = { transform: "translate(-140, 0)" }, Vf = ["fill"], Hf = { transform: "translate(-80, 0)" }, jf = ["fill"], Yf = { transform: "translate(-20, 0)" }, qf = ["fill"], Uf = { transform: "translate(60, 0)" }, Kf = ["fill"], Xf = { transform: "translate(130, 0)" }, Gf = ["fill"], Zf = { transform: "translate(180, 0)" }, Qf = ["fill"], Jf = /* @__PURE__ */ at({
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
    const s = e, { isDark: a } = rt(it(s, "theme")), n = D(() => ({
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
    })), o = ot({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = D(() => s.chartWidth - s.chartMargin * 2), r = D(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = D(() => i.value / 10 * 0.6), d = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const z = Math.max(...s.histogram.map((H) => H.count || 0), 1), I = Math.max(1, Math.ceil(z * 0.2));
      return z + I;
    }), u = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const z = s.averageScore || 0;
      let I = 0, H = 0;
      if (s.histogram.forEach((Z) => {
        const U = Z.count || 0;
        I += U;
        const dt = Z.score - z;
        H += U * (dt * dt);
      }), I === 0) return 1;
      const tt = H / I;
      return Math.sqrt(tt) || 1;
    }), h = (z, I, H) => {
      if (H === 0) return 0;
      const tt = 1 / (H * Math.sqrt(2 * Math.PI)), Z = -0.5 * Math.pow((z - I) / H, 2);
      return tt * Math.exp(Z);
    }, g = D(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && u.value === 0) return null;
      const z = s.averageScore, I = u.value, H = 100, Z = Math.max(...s.histogram.map((ct) => ct.count || 0), 1) / d.value * r.value;
      if (Z <= 0) return null;
      let U = 0;
      for (let ct = 0; ct <= H; ct++) {
        const St = 1 + 9 * (ct / H), Lt = h(St, z, I);
        Lt > U && (U = Lt);
      }
      if (U <= 0) return null;
      const dt = Z / U, _t = [];
      for (let ct = 0; ct <= H; ct++) {
        const St = 1 + 9 * (ct / H), Lt = h(St, z, I) * dt, It = f(St);
        if (It !== null) {
          const B = s.chartHeight - s.chartBottomMargin - Lt;
          _t.push(`${ct === 0 ? "M" : "L"} ${It} ${B}`);
        }
      }
      return _t.join(" ");
    }), p = D(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const z = i.value / 10;
      return s.histogram.map((I, H) => {
        const tt = s.chartMargin + (H + 0.5) * z, Z = I.count > 0 ? I.count / d.value * r.value : 0, U = s.chartHeight - s.chartBottomMargin - Z;
        return {
          score: I.score,
          count: I.count,
          x: tt,
          y: U,
          height: Z
        };
      });
    }), f = (z) => {
      if (z < 1 || z > 10) return null;
      const I = i.value / 10;
      return s.chartMargin + (z - 0.5) * I;
    }, _ = D(() => f(s.minScore)), b = D(() => f(s.maxScore)), v = D(() => f(s.q1Score)), m = D(() => f(s.medianScore)), $ = D(() => f(s.q3Score)), k = D(() => f(s.averageScore)), w = D(() => s.minScore), S = D(() => s.maxScore), C = D(() => s.q1Score), T = D(() => s.medianScore), P = D(() => s.q3Score), V = D(() => s.averageScore), R = D(() => {
      const z = [], I = s.chartMargin - 8, H = 18;
      v.value !== null && z.push({
        x: v.value,
        y: I,
        value: s.q1Score,
        label: `Q1: ${C.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), m.value !== null && z.push({
        x: m.value,
        y: I - H,
        value: s.medianScore,
        label: `Median: ${T.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), k.value !== null && z.push({
        x: k.value,
        y: I - H,
        value: s.averageScore,
        label: `Avg: ${V.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), $.value !== null && z.push({
        x: $.value,
        y: I,
        value: s.q3Score,
        label: `Q3: ${P.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), z.sort((U, dt) => (U.x || 0) - (dt.x || 0));
      const tt = [[], [], []];
      z.forEach((U) => {
        if (U.x === null) return;
        let dt = -1;
        for (let _t = 0; _t < tt.length; _t++) {
          let ct = !1;
          for (const St of tt[_t]) {
            if (St.x === null) continue;
            const Lt = Math.abs(U.x - St.x), It = (U.width + St.width) / 2 + 10;
            if (Lt < It) {
              ct = !0;
              break;
            }
          }
          if (!ct) {
            dt = _t;
            break;
          }
        }
        dt === -1 && (dt = tt.length - 1), U.y = I - dt * H, tt[dt].push(U);
      });
      const Z = 15;
      return z.forEach((U) => {
        U.y < Z && (U.y = Z);
      }), z;
    }), W = (z) => R.value.find((H) => H.id === z)?.y || s.chartMargin - 10, q = D(() => {
      const z = [];
      for (let H = 0; H <= 5; H++) {
        const tt = Math.round(d.value / 5 * H), Z = s.chartHeight - s.chartBottomMargin - H / 5 * r.value;
        z.push({ value: tt, y: Z });
      }
      return z;
    }), A = (z, I) => {
      const H = z.currentTarget.closest("svg");
      if (!H) return;
      const tt = H.getBoundingClientRect(), Z = H.createSVGPoint();
      Z.x = z.clientX - tt.left, Z.y = z.clientY - tt.top;
      const U = `Score: ${I.score}`, dt = `Count: ${I.count}`, _t = 120, ct = 48;
      o.value = {
        visible: !0,
        x: Z.x,
        y: Z.y - 20,
        title: U,
        text: dt,
        width: _t,
        height: ct
      };
    }, F = (z) => {
      if (o.value.visible) {
        const I = z.currentTarget, H = I.getBoundingClientRect(), tt = I.createSVGPoint();
        tt.x = z.clientX - H.left, tt.y = z.clientY - H.top, o.value.x = tt.x, o.value.y = tt.y - 20;
      }
    }, E = () => {
      o.value.visible = !1;
    }, O = () => {
      o.value.visible = !1;
    };
    return t({ isDark: a }), (z, I) => (y(), x("div", rf, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: xt(`min-height: ${e.chartHeight}px;`),
        onMousemove: F,
        onMouseleave: E
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
          }, null, 8, df),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, uf),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, hf)
        ], 8, cf)) : N("", !0),
        (y(!0), x(K, null, Q(q.value, (H, tt) => (y(), x("line", {
          key: `grid-${tt}`,
          x1: e.chartMargin,
          y1: H.y,
          x2: e.chartWidth - e.chartMargin,
          y2: H.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, ff))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, gf),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, pf),
        (y(!0), x(K, null, Q(q.value, (H, tt) => (y(), x(K, {
          key: `y-tick-${tt}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: H.y,
            x2: e.chartMargin,
            y2: H.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, vf),
          c("text", {
            x: e.chartMargin - 12,
            y: H.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(H.value), 9, bf)
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
        }, " Count ", 8, mf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, _f),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, yf),
        (y(!0), x(K, null, Q(p.value, (H, tt) => (y(), x(K, {
          key: `tick-${tt}`
        }, [
          c("line", {
            x1: H.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: H.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, xf),
          c("text", {
            x: H.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(H.score), 9, kf)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, wf),
        g.value ? (y(), x("path", {
          key: 1,
          d: g.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, $f)) : N("", !0),
        (y(!0), x(K, null, Q(p.value, (H, tt) => (y(), x("rect", {
          key: `bar-${tt}`,
          x: H.x - l.value / 2,
          y: H.y,
          width: l.value,
          height: H.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (Z) => A(Z, H),
          onMouseleave: O,
          style: { cursor: "pointer" }
        }, null, 40, Mf))), 128)),
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
        }, null, 8, Sf)) : N("", !0),
        _.value ? (y(), x("text", {
          key: 3,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + M(w.value.toFixed(1)), 9, Cf)) : N("", !0),
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
        }, null, 8, Df)) : N("", !0),
        v.value ? (y(), x("text", {
          key: 5,
          x: v.value,
          y: W("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + M(C.value.toFixed(1)), 9, Af)) : N("", !0),
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
        }, null, 8, Tf)) : N("", !0),
        m.value ? (y(), x("text", {
          key: 7,
          x: m.value,
          y: W("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + M(T.value.toFixed(1)), 9, Bf)) : N("", !0),
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
        }, null, 8, Ff)) : N("", !0),
        k.value ? (y(), x("text", {
          key: 9,
          x: k.value,
          y: W("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + M(V.value.toFixed(1)), 9, Lf)) : N("", !0),
        $.value ? (y(), x("line", {
          key: 10,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Pf)) : N("", !0),
        $.value ? (y(), x("text", {
          key: 11,
          x: $.value,
          y: W("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + M(P.value.toFixed(1)), 9, Ef)) : N("", !0),
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
        }, null, 8, Rf)) : N("", !0),
        b.value ? (y(), x("text", {
          key: 13,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + M(S.value.toFixed(1)), 9, Of)) : N("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", zf, [
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
            }, " Gaussian ", 8, Nf)
          ]),
          c("g", Wf, [
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
            }, " Min ", 8, Vf)
          ]),
          c("g", Hf, [
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
            }, " Q1 ", 8, jf)
          ]),
          c("g", Yf, [
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
            }, " Median ", 8, qf)
          ]),
          c("g", Uf, [
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
            }, " Avg ", 8, Kf)
          ]),
          c("g", Xf, [
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
            }, " Q3 ", 8, Gf)
          ]),
          c("g", Zf, [
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
            }, " Max ", 8, Qf)
          ])
        ], 8, If)) : N("", !0)
      ], 44, lf))
    ]));
  }
}), li = /* @__PURE__ */ et(Jf, [["__scopeId", "data-v-64e657d9"]]), tg = { class: "chart-container" }, eg = {
  key: 1,
  class: "chart-wrapper"
}, sg = /* @__PURE__ */ at({
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
    Ba.use([yi, xi, ki, wi]);
    const s = e, { isDark: a, colors: n } = rt(it(s, "theme")), o = ot(null), i = ot(!0), r = ot(!1);
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
      const $ = s.data.links.filter(
        (C) => C.source && C.target && typeof C.value == "number"
      ), k = Math.max(...$.map((C) => C.value), 1), w = Math.max(1, k * 0.01), S = $.map((C) => ({
        ...C,
        originalValue: C.value,
        value: C.value < k * 0.01 ? w : C.value
      }));
      return {
        nodes: s.data.nodes.filter((C) => C.name),
        links: S
      };
    }, g = ($) => $.map((k, w) => ({
      ...k,
      itemStyle: {
        color: s.nodeColors[k.name] || u[w % u.length],
        borderRadius: 8
      }
    })), p = ($) => (k) => {
      const w = k.dataType === "node", S = n.value.tooltipText, C = a.value ? "#d1d5db" : "#e2e8f0";
      if (w) {
        const W = $.filter((F) => F.target === k.name), q = $.filter((F) => F.source === k.name), A = W.length > 0 ? W.reduce((F, E) => F + (E.originalValue || E.value), 0) : q.reduce((F, E) => F + (E.originalValue || E.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${k.name}</div><div style="color: ${C}; font-size: 12px;">Count: ${A.toLocaleString()}</div>`;
      }
      const T = k.data?.source || k.source || "Unknown", P = k.data?.target || k.target || "Unknown", V = k.data?.originalValue || k.data?.value || k.value || 0, R = k.data?.label || `${V.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${T} → ${P}</div><div style="color: ${C}; font-size: 12px;">Flow: ${R}</div>`;
    }, f = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: $, links: k } = h(), w = g($), S = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: p(k),
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
                data: w,
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
          l.setOption(S);
        } catch ($) {
          console.error("Error setting Sankey chart options:", $), r.value = !0;
        }
    }, _ = async () => {
      if (o.value)
        try {
          l = Ba.init(o.value), f(), window.addEventListener("resize", v);
        } catch ($) {
          console.error("Error initializing Sankey chart:", $), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, b = async ($ = 40) => {
      await Qt();
      for (let k = 0; k < $; k++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await _();
        await new Promise((w) => setTimeout(w, 50));
      }
      await _(), setTimeout(v, 50);
    }, v = () => l?.resize(), m = () => {
      window.removeEventListener("resize", v), l && (l.dispose(), l = null);
    };
    return Ze(() => o.value && b()), ro(m), Ht(() => s.data, f, { deep: !0 }), Ht(a, f), t({ isDark: a }), ($, k) => (y(), x("div", tg, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: xt({ height: e.height })
      }, [...k[0] || (k[0] = [
        G('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", eg, [
        we(c("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: xt({ height: e.height })
        }, null, 4), [
          [Aa, !i.value]
        ]),
        we(c("div", {
          class: "loading-state",
          style: xt({ height: e.height })
        }, [...k[1] || (k[1] = [
          G('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [Aa, i.value]
        ])
      ]))
    ]));
  }
}), ce = /* @__PURE__ */ et(sg, [["__scopeId", "data-v-d6d61034"]]);
function ag(e, t) {
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
function ng(e, t) {
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
function Rt(e, t) {
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
function og(e, t) {
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
function to(e, t) {
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
function ig(e, t) {
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
function rg(e, t) {
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
function lg(e, t) {
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
function cg(e, t) {
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
const dg = { class: "chart-footer" }, ug = { class: "export-actions" }, hg = { class: "export-buttons" }, fg = ["disabled"], gg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, pg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, vg = ["disabled"], bg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, mg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, _g = /* @__PURE__ */ at({
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
    return (i, r) => (y(), x("footer", dg, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", ug, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", hg, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: Mt(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", gg, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", pg, [...r[3] || (r[3] = [
              G('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, fg)) : N("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: Mt(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", bg, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", mg, [...r[6] || (r[6] = [
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
          ], 10, vg)) : N("", !0)
        ])
      ])
    ]));
  }
}), mt = /* @__PURE__ */ et(_g, [["__scopeId", "data-v-672661d4"]]), yg = { class: "agents-per-day-card" }, xg = {
  key: 0,
  class: "card-body"
}, kg = {
  key: 0,
  class: "chart-section"
}, wg = {
  key: 1,
  class: "empty-state"
}, $g = { class: "empty-state-content" }, Mg = { class: "empty-icon-wrapper" }, Sg = {
  key: 1,
  class: "loading-state"
}, Cg = /* @__PURE__ */ at({
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
    }, n = e, o = s, i = (g) => {
      o("export", g);
    }, { isDark: r, colors: l } = rt(it(n, "theme")), d = (g) => {
      const p = new Date(g), f = String(p.getDate()).padStart(2, "0"), _ = String(p.getMonth() + 1).padStart(2, "0");
      return `${f}-${_}`;
    }, u = D(() => {
      const g = n.data?.agents_by_day || {}, p = Object.keys(g).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const f = p.map(($) => d($)), _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(g))
        for (const k of Object.keys($))
          _.add(k);
      const b = Array.from(_), v = ($) => $, m = b.map(($) => ({
        label: $,
        data: p.map((k) => g[k]?.[$] || 0),
        backgroundColor: `${a[$] || "#94a3b8"}80`,
        borderColor: v(a[$] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
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
    return t({ isDark: r }), (g, p) => (y(), x("article", yg, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Sg, [...p[2] || (p[2] = [
        G('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", xg, [
        u.value.labels && u.value.labels.length ? (y(), x("section", kg, [
          J(ee, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", wg, [
          c("div", $g, [
            c("div", Mg, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Dg = /* @__PURE__ */ et(Cg, [["__scopeId", "data-v-4d18c22c"]]), j = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), lt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Ag = { class: "booking-manager-card" }, Tg = { class: "card-header" }, Bg = { class: "header-content" }, Fg = {
  key: 0,
  class: "payment-success-badge"
}, Lg = {
  key: 0,
  class: "currency-breakdown-list"
}, Pg = {
  key: 1,
  class: "badge-value"
}, Eg = {
  key: 0,
  class: "loading-state"
}, Rg = {
  key: 1,
  class: "error-state"
}, Og = { class: "error-content" }, Ig = { class: "error-description" }, zg = {
  key: 2,
  class: "card-body"
}, Ng = { class: "chart-section" }, Wg = { class: "chart-wrapper" }, Vg = {
  key: 0,
  class: "table-section"
}, Hg = { class: "table-wrapper" }, jg = { class: "data-table" }, Yg = { class: "table-body" }, qg = { class: "table-cell font-medium" }, Ug = { class: "table-cell text-center" }, Kg = { class: "table-cell text-center" }, Xg = { class: "percentage-text" }, Gg = { class: "table-cell text-center" }, Zg = { class: "table-cell" }, Qg = { class: "badges-container" }, Jg = { class: "badge badge-success" }, tp = { class: "badge badge-error" }, ep = { class: "table-cell" }, sp = {
  key: 0,
  class: "badges-container"
}, ap = {
  key: 1,
  class: "percentage-text"
}, np = { class: "table-cell" }, op = { class: "badges-container" }, ip = { class: "badge badge-error" }, rp = { class: "badge badge-warning" }, lp = { class: "badge badge-yellow" }, cp = { class: "badge badge-error" }, dp = {
  key: 1,
  class: "empty-state"
}, qs = 3, up = /* @__PURE__ */ at({
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
    }, o = ot(!1), i = D(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (b, v) => new Date(b.date).getTime() - new Date(v.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, qs)), l = D(() => i.value.length > qs), d = D(() => s.data?.total_payment_success_value || []), u = (b) => b.payment_success_value || [], h = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce((v, m) => v + (m.count || 0), 0), g = (b) => lt(b), p = D(() => {
      const b = s.data, v = b.total_booking_initiated || 0, m = b.total_booking_started || 0, $ = b.total_payment_initiated || 0, k = b.total_not_found || 0, w = b.total_cancelled || 0, S = b.total_no_pending_balance || 0, C = b.total_errors || 0, T = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce((F, E) => F + (E.count || 0), 0), P = b.total_payment_failed || 0, V = Math.max(0, v - m), R = Math.max(0, m - $ - k - w - S - C), W = (F, E) => {
        const O = E > 0 ? Math.round(F / E * 100) : 0;
        return `${F.toLocaleString()} (${O}%)`;
      }, q = [
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
        label: W(m, v)
      }), V > 0 && A.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: W(V, v)
      }), $ > 0 && A.push({
        source: "Started",
        target: "Payment Initiated",
        value: $,
        label: W($, m)
      }), k > 0 && A.push({
        source: "Started",
        target: "Not Found",
        value: k,
        label: W(k, m)
      }), w > 0 && A.push({
        source: "Started",
        target: "Cancelled",
        value: w,
        label: W(w, m)
      }), S > 0 && A.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: W(S, m)
      }), C > 0 && A.push({
        source: "Started",
        target: "Errors",
        value: C,
        label: W(C, m)
      }), R > 0 && A.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: R,
        label: W(R, m)
      }), T > 0 && A.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: W(T, $)
      }), P > 0 && A.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: P,
        label: W(P, $)
      }), { nodes: q, links: A };
    }), f = {
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
    return (b, v) => (y(), x("article", Ag, [
      c("header", Tg, [
        c("div", Bg, [
          v[2] || (v[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? N("", !0) : (y(), x("div", Fg, [
            v[1] || (v[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", Lg, [
              (y(!0), x(K, null, Q(d.value, (m) => (y(), x("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, M(m.currency) + " " + M(g(m.total_value)), 1))), 128))
            ])) : (y(), x("p", Pg, M(g(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", Eg, [...v[3] || (v[3] = [
        G('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (y(), x("div", Rg, [
        c("div", Og, [
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
          c("p", Ig, M(s.error), 1)
        ])
      ])) : (y(), x("div", zg, [
        c("section", Ng, [
          c("div", Wg, [
            J(ce, {
              data: p.value,
              "node-colors": f,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", Vg, [
          v[8] || (v[8] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", Hg, [
            c("table", jg, [
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
              c("tbody", Yg, [
                (y(!0), x(K, null, Q(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", qg, M(L(At)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", Ug, M(L(j)(m.booking_initiated_count)), 1),
                  c("td", Kg, [
                    $t(M(L(j)(m.booking_started_count)) + " ", 1),
                    c("span", Xg, " (" + M(_(m.booking_started_count, m.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", Gg, M(L(j)(m.payment_initiated_count)), 1),
                  c("td", Zg, [
                    c("div", Qg, [
                      c("span", Jg, " Success: " + M(L(j)(h(m))), 1),
                      c("span", tp, " Failed: " + M(L(j)(m.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", ep, [
                    u(m).length > 0 ? (y(), x("div", sp, [
                      (y(!0), x(K, null, Q(u(m), ($) => (y(), x("span", {
                        key: `${m.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(g($.total_value)), 1))), 128))
                    ])) : (y(), x("span", ap, "N/A"))
                  ]),
                  c("td", np, [
                    c("div", op, [
                      c("span", ip, " Not Found: " + M(m.not_found_count ? L(j)(m.not_found_count) : "N/A"), 1),
                      c("span", rp, " Cancelled: " + M(m.cancelled_count ? L(j)(m.cancelled_count) : "N/A"), 1),
                      c("span", lp, " No Balance: " + M(m.no_pending_balance_count ? L(j)(m.no_pending_balance_count) : "N/A"), 1),
                      c("span", cp, " Errors: " + M(m.error_count ? L(j)(m.error_count) : "N/A"), 1)
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
            $t(M(o.value ? "View less" : `View more (${i.value.length - qs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Mt(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
          ])) : N("", !0),
          e.enableExport ? (y(), ht(L(mt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", dp, [...v[9] || (v[9] = [
          G('<div class="empty-state-content" data-v-15d5c773><div class="empty-icon-wrapper" data-v-15d5c773><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15d5c773><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-15d5c773></path></svg></div><p class="empty-title" data-v-15d5c773>No booking manager data available</p><p class="empty-description" data-v-15d5c773>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), hp = /* @__PURE__ */ et(up, [["__scopeId", "data-v-15d5c773"]]), fp = { class: "checkin-metrics-card" }, gp = {
  key: 0,
  class: "loading-state"
}, pp = {
  key: 1,
  class: "card-body"
}, vp = {
  key: 0,
  class: "chart-section"
}, bp = { class: "chart-wrapper" }, mp = {
  key: 1,
  class: "table-section"
}, _p = { class: "table-wrapper" }, yp = { class: "data-table" }, xp = { class: "table-body" }, kp = { class: "table-cell font-medium" }, wp = { class: "table-cell text-center" }, $p = { class: "table-cell text-center" }, Mp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, Cp = { class: "table-cell text-center" }, Dp = { class: "table-cell text-center" }, Ap = { class: "table-cell text-left" }, Tp = {
  key: 0,
  class: "failed-steps"
}, Bp = { class: "step-name" }, Fp = { class: "step-count" }, Lp = {
  key: 1,
  class: "empty-cell"
}, Pp = {
  key: 2,
  class: "empty-state"
}, Ep = {
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
    }, r = ot([]), l = D(() => {
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
        const k = m.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), w = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[k] = w[k] || "#DC2626";
      }), b;
    }), h = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, g = (b, v) => {
      const m = j(b), $ = h(b, v);
      return `${m} (${$})`;
    }, p = (b) => b.reduce((v, m) => v + m.failed_count, 0), f = D(() => {
      const b = [], v = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: b, links: v };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const m = l.value.total_checkin_initiated, $ = l.value.total_checkin_init, k = l.value.total_checkin_init_abandoned, w = $ - k, S = l.value.total_checkin_started, C = l.value.total_checkin_completed, T = l.value.total_checkin_closed, P = d.value.unrecovered_by_step || [], V = P.reduce((A, F) => A + F.count, 0);
      if ($ > 0) {
        const A = Math.round($ / m * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: $,
          label: `${$.toLocaleString()} (${A}%)`
        });
      }
      const R = m - $;
      if (R > 0) {
        const A = Math.round(R / m * 100);
        b.push({ name: "Abandoned (Init)" }), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${A}%)`
        });
      }
      if (k > 0) {
        const A = Math.round(k / m * 100);
        b.push({ name: "Abandoned (Started)" }), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: k,
          label: `${k.toLocaleString()} (${A}%)`
        });
      }
      if (w > 0) {
        const A = Math.round(w / m * 100);
        v.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: w,
          label: `${w.toLocaleString()} (${A}%)`
        });
      }
      if (S > 0) {
        const A = Math.round(S / m * 100);
        v.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${A}%)`
        });
      }
      if (C > 0) {
        const A = Math.round(C / S * 100);
        v.push({
          source: "Number of Passengers",
          target: "Completed",
          value: C,
          label: `${C.toLocaleString()} (${A}%)`
        });
      }
      if (P.length > 0 && V > 0) {
        b.push({ name: "Unrecovered" });
        const A = Math.round(V / S * 100);
        v.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: V,
          label: `${V.toLocaleString()} (${A}%)`
        }), P.forEach((F) => {
          const O = F.step_name.replace(/_/g, " ").split(" ").map((I) => I.charAt(0).toUpperCase() + I.slice(1)).join(" "), z = Math.round(F.count / S * 100);
          b.push({ name: O }), v.push({
            source: "Unrecovered",
            target: O,
            value: F.count,
            label: `${F.count.toLocaleString()} (${z}%)`
          });
        });
      }
      const W = S - (C + V);
      if (W > 0) {
        const A = Math.round(W / S * 100);
        b.push({ name: "Abandoned (Flow)" }), v.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: W,
          label: `${W.toLocaleString()} (${A}%)`
        });
      }
      const q = C - T;
      if (q > 0) {
        const A = Math.round(q / S * 100);
        b.push({ name: "BP Error" }), v.push({
          source: "Completed",
          target: "BP Error",
          value: q,
          label: `${q.toLocaleString()} (${A}%)`
        });
      }
      if (T > 0) {
        const A = Math.round(T / S * 100);
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
        const $ = v.find(
          (k) => k.date === m.date
        );
        return {
          ...m,
          failed_steps: $?.steps || []
        };
      }), r.value.sort((m, $) => new Date(m.date) - new Date($.date));
    };
    return Ht(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (b, v) => (y(), x("article", fp, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", gp, [...v[0] || (v[0] = [
        G('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", pp, [
        f.value.nodes.length > 0 ? (y(), x("section", vp, [
          c("div", bp, [
            J(ce, {
              data: f.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : N("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", mp, [
          c("div", _p, [
            c("table", yp, [
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
              c("tbody", xp, [
                (y(!0), x(K, null, Q(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", kp, M(L(At)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", wp, M(L(j)(m.checkin_initiated_count)), 1),
                  c("td", $p, M(g(m.checkin_init_count, m.checkin_initiated_count)), 1),
                  c("td", Mp, M(L(j)(m.checkin_started_count)), 1),
                  c("td", Sp, M(g(m.checkin_completed_count, m.checkin_started_count)), 1),
                  c("td", Cp, M(g(m.checkin_closed_count, m.checkin_started_count)), 1),
                  c("td", Dp, M(g(p(m.failed_steps), m.checkin_started_count)), 1),
                  c("td", Ap, [
                    m.failed_steps && m.failed_steps.length > 0 ? (y(), x("div", Tp, [
                      (y(!0), x(K, null, Q(m.failed_steps, ($) => (y(), x("div", {
                        key: $.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", Bp, M($.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", Fp, M($.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Lp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", Pp, [...v[2] || (v[2] = [
          G('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, Rp = /* @__PURE__ */ et(Ep, [["__scopeId", "data-v-d527da09"]]), Op = { class: "checkin-metrics-card" }, Ip = {
  key: 0,
  class: "loading-state"
}, zp = {
  key: 1,
  class: "card-body"
}, Np = {
  key: 0,
  class: "sankey-section"
}, Wp = {
  key: 1,
  class: "table-section"
}, Vp = { class: "table-wrapper" }, Hp = { class: "data-table" }, jp = { class: "table-body" }, Yp = { class: "table-cell date-cell" }, qp = { class: "table-cell text-center" }, Up = { class: "table-cell text-center" }, Kp = { class: "table-cell text-center" }, Xp = { class: "table-cell text-center" }, Gp = { class: "table-cell text-center" }, Zp = { class: "table-cell text-center" }, Qp = { class: "table-cell reasons-cell" }, Jp = {
  key: 0,
  class: "reasons-list"
}, tv = { class: "reason-name" }, ev = { class: "reason-count" }, sv = {
  key: 1,
  class: "no-reasons"
}, av = {
  key: 2,
  class: "empty-state"
}, nv = { class: "empty-state-content" }, ov = { class: "empty-icon-wrapper" }, Us = 3, iv = /* @__PURE__ */ at({
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
    const a = e, n = s, o = ($) => {
      n("export", $);
    }, { isDark: i } = rt(it(a, "theme")), r = ($) => $ == null ? "0" : $.toLocaleString(), l = ($) => {
      const k = new Date($), w = String(k.getDate()).padStart(2, "0"), S = String(k.getMonth() + 1).padStart(2, "0"), C = k.getFullYear();
      return `${w}/${S}/${C}`;
    }, d = ($) => $.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), u = ($, k) => !k || k === 0 ? "0%" : `${Math.round($ / k * 100)}%`, h = ($, k) => {
      const w = $ || 0, S = k || 0, C = r(w), T = u(w, S);
      return `${C} (${T})`;
    }, g = ($) => $ ? $.reduce((k, w) => k + w.failed_count, 0) : 0, p = D(() => {
      const $ = {
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
      return (a.failedData?.unrecovered_by_step || []).forEach((w) => {
        const C = w.step_name.replace(/_/g, " ").split(" ").map((P) => P.charAt(0).toUpperCase() + P.slice(1)).join(" "), T = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        $[C] = T[C] || "#DC2626";
      }), $;
    }), f = ot(!1), _ = D(() => {
      const $ = a.checkinData?.checkin_by_day || [], k = a.failedData?.failed_by_step_by_day || [];
      return $.map((S) => {
        const C = k.find((T) => T.date === S.date);
        return {
          ...S,
          failed_steps: C?.steps || []
        };
      }).sort((S, C) => new Date(S.date).getTime() - new Date(C.date).getTime());
    }), b = D(() => f.value ? _.value : _.value.slice(0, Us)), v = D(() => _.value.length > Us), m = D(() => {
      const $ = [], k = [], w = /* @__PURE__ */ new Set(), S = (B) => {
        w.has(B) || ($.push({ name: B }), w.add(B));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: $, links: k };
      S("Checkin Init"), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const C = a.checkinData.total_checkin_initiated || 0, T = a.checkinData.total_checkin_init || 0, P = a.checkinData.total_checkin_init_abandoned || 0, V = a.checkinData.total_checkin_pre_init_abandoned_error, R = a.checkinData.total_checkin_pre_init_abandoned_voluntary, W = V != null || R != null, q = W ? Math.max(Number(V) || 0, 0) : 0, A = W ? Math.max(Number(R) || 0, 0) : 0, F = a.checkinData.total_checkin_init_abandoned_error, E = a.checkinData.total_checkin_init_abandoned_voluntary, O = F != null || E != null, z = O ? Math.max(Number(F) || 0, 0) : 0, I = O ? Math.max(Number(E) || 0, 0) : 0, H = O ? Math.max(P - z - I, 0) : P, tt = T - P, Z = a.checkinData.total_checkin_started || 0, U = a.checkinData.total_checkin_completed || 0, dt = a.checkinData.total_checkin_closed || 0, _t = a.failedData?.unrecovered_by_step || [], ct = _t.reduce((B, Y) => B + Y.count, 0);
      if (T > 0) {
        const B = Math.round(T / C * 100);
        k.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: T,
          label: `${T.toLocaleString()} (${B}%)`
        });
      }
      const St = C - T;
      if (W) {
        if (A > 0) {
          const B = Math.round(A / C * 100);
          S("Abandoned (Init)"), k.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: A,
            label: `${A.toLocaleString()} (${B}%)`
          });
        }
        if (q > 0) {
          const B = Math.round(q / C * 100);
          S("Booking not retreived"), k.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: q,
            label: `${q.toLocaleString()} (${B}%)`
          });
        }
      } else if (St > 0) {
        const B = Math.round(St / C * 100);
        S("Abandoned (Init)"), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: St,
          label: `${St.toLocaleString()} (${B}%)`
        });
      }
      if (O) {
        if (z > 0) {
          const B = Math.round(z / C * 100);
          S("Error"), k.push({
            source: "Booking retrive",
            target: "Error",
            value: z,
            label: `${z.toLocaleString()} (${B}%)`
          });
        }
        if (I > 0) {
          const B = Math.round(I / C * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: I,
            label: `${I.toLocaleString()} (${B}%)`
          });
        }
        if (H > 0) {
          const B = Math.round(H / C * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${B}%)`
          });
        }
      } else if (P > 0) {
        const B = Math.round(P / C * 100);
        S("Abandoned (Started)"), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${B}%)`
        });
      }
      if (tt > 0) {
        const B = Math.round(tt / C * 100);
        k.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: tt,
          label: `${tt.toLocaleString()} (${B}%)`
        });
      }
      if (Z > 0) {
        const B = Math.round(Z / C * 100);
        k.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: Z,
          label: `${Z.toLocaleString()} (${B}%)`
        });
      }
      if (U > 0) {
        const B = Math.round(U / Z * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: U,
          label: `${U.toLocaleString()} (${B}%)`
        });
      }
      if (_t.length > 0 && ct > 0) {
        S("Unrecovered");
        const B = Math.round(ct / Z * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: ct,
          label: `${ct.toLocaleString()} (${B}%)`
        }), _t.forEach((Y) => {
          const pt = Y.step_name.replace(/_/g, " ").split(" ").map((Ct) => Ct.charAt(0).toUpperCase() + Ct.slice(1)).join(" "), zt = Math.round(Y.count / Z * 100);
          S(pt), k.push({
            source: "Unrecovered",
            target: pt,
            value: Y.count,
            label: `${Y.count.toLocaleString()} (${zt}%)`
          });
        });
      }
      const Lt = Z - (U + ct);
      if (Lt > 0) {
        const B = Math.round(Lt / Z * 100);
        S("Abandoned (Flow)"), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: Lt,
          label: `${Lt.toLocaleString()} (${B}%)`
        });
      }
      const It = U - dt;
      if (It > 0) {
        const B = Math.round(It / Z * 100);
        S("BP Error"), k.push({
          source: "Completed",
          target: "BP Error",
          value: It,
          label: `${It.toLocaleString()} (${B}%)`
        });
      }
      if (dt > 0) {
        const B = Math.round(dt / Z * 100);
        k.push({
          source: "Completed",
          target: "Closed with BP",
          value: dt,
          label: `${dt.toLocaleString()} (${B}%)`
        });
      }
      return { nodes: $, links: k };
    });
    return t({ isDark: i }), ($, k) => (y(), x("article", Op, [
      k[6] || (k[6] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Ip, [...k[1] || (k[1] = [
        G('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", zp, [
        m.value.nodes.length > 0 ? (y(), x("div", Np, [
          J(ce, {
            data: m.value,
            height: "500px",
            "node-colors": p.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : N("", !0),
        _.value && _.value.length > 0 ? (y(), x("div", Wp, [
          c("div", Vp, [
            c("table", Hp, [
              k[2] || (k[2] = c("thead", null, [
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
              c("tbody", jp, [
                (y(!0), x(K, null, Q(b.value, (w) => (y(), x("tr", {
                  key: w.date,
                  class: "table-row"
                }, [
                  c("td", Yp, M(l(w.date)), 1),
                  c("td", qp, M(r(w.checkin_initiated_count)), 1),
                  c("td", Up, M(h(w.checkin_init_count, w.checkin_initiated_count)), 1),
                  c("td", Kp, M(r(w.checkin_started_count)), 1),
                  c("td", Xp, M(h(w.checkin_completed_count, w.checkin_started_count)), 1),
                  c("td", Gp, M(h(w.checkin_closed_count, w.checkin_started_count)), 1),
                  c("td", Zp, M(h(g(w.failed_steps), w.checkin_started_count)), 1),
                  c("td", Qp, [
                    w.failed_steps && w.failed_steps.length > 0 ? (y(), x("div", Jp, [
                      (y(!0), x(K, null, Q(w.failed_steps, (S) => (y(), x("div", {
                        key: S.step_name,
                        class: "reason-item"
                      }, [
                        c("span", tv, M(d(S.step_name)) + ":", 1),
                        c("span", ev, M(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", sv, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          v.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: k[0] || (k[0] = (w) => f.value = !f.value)
          }, [
            $t(M(f.value ? "View less" : `View more (${_.value.length - Us} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Mt(["view-more-icon", { "view-more-icon-rotated": f.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...k[3] || (k[3] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : N("", !0),
          e.enableExport ? (y(), ht(L(mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", av, [
          c("div", nv, [
            c("div", ov, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            k[5] || (k[5] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), rv = /* @__PURE__ */ et(iv, [["__scopeId", "data-v-eefc834b"]]), lv = { class: "checkin-segments-card" }, cv = {
  key: 0,
  class: "loading-state"
}, dv = {
  key: 1,
  class: "card-body"
}, uv = {
  key: 0,
  class: "table-section"
}, hv = { class: "table-wrapper" }, fv = { class: "data-table" }, gv = { class: "table-body" }, pv = { class: "table-cell font-medium text-center" }, vv = { class: "airport-badge" }, bv = { class: "table-cell text-center" }, mv = {
  key: 0,
  class: "airport-badge connection"
}, _v = {
  key: 1,
  class: "empty-connection"
}, yv = { class: "table-cell text-center" }, xv = { class: "airport-badge" }, kv = { class: "table-cell text-center" }, wv = {
  key: 0,
  class: "trip-badge roundtrip"
}, $v = {
  key: 1,
  class: "trip-badge oneway"
}, Mv = { class: "table-cell text-center" }, Sv = { class: "table-cell text-center" }, Cv = { class: "percentage-value" }, Dv = { class: "table-cell text-center" }, Av = { class: "percentage-value" }, Tv = { class: "table-cell text-center" }, Bv = { class: "percentage-value success" }, Fv = {
  key: 1,
  class: "empty-state"
}, Ks = 3, Lv = /* @__PURE__ */ at({
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
    const a = e, n = s, o = (p) => {
      n("export", p);
    }, { isDark: i } = rt(it(a, "theme")), r = ot(!1), l = D(() => r.value ? a.data : a.data.slice(0, Ks)), d = D(() => a.data.length > Ks), u = (p, f) => !f || f === 0 || !p ? "0%" : `${Math.round(p / f * 100)}%`, h = (p) => !p || p === "None" ? "-" : String(p).trim().replace(/_[0-9]+$/i, ""), g = (p) => {
      const f = h(p?.departure_airport), _ = h(p?.arrival_airport);
      return f === "-" || _ === "-" ? !1 : f === _;
    };
    return t({ isDark: i }), (p, f) => (y(), x("article", lv, [
      f[7] || (f[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      a.loading ? (y(), x("div", cv, [...f[1] || (f[1] = [
        G('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", dv, [
        a.data.length > 0 ? (y(), x("section", uv, [
          c("div", hv, [
            c("table", fv, [
              f[4] || (f[4] = c("thead", null, [
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
              c("tbody", gv, [
                (y(!0), x(K, null, Q(l.value, (_, b) => (y(), x("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  c("td", pv, [
                    c("span", vv, M(h(_.departure_airport)), 1)
                  ]),
                  c("td", bv, [
                    h(_.conexion_airport) !== "-" ? (y(), x("span", mv, M(h(_.conexion_airport)), 1)) : (y(), x("span", _v, "-"))
                  ]),
                  c("td", yv, [
                    c("span", xv, M(h(_.arrival_airport)), 1)
                  ]),
                  c("td", kv, [
                    g(_) ? (y(), x("span", wv, [...f[2] || (f[2] = [
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
                      $t(" Roundtrip ", -1)
                    ])])) : (y(), x("span", $v, [...f[3] || (f[3] = [
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
                      $t(" One way ", -1)
                    ])]))
                  ]),
                  c("td", Mv, M(L(j)(_.segment_init_count)), 1),
                  c("td", Sv, [
                    c("span", Cv, M(u(_.segment_started_count, _.segment_init_count)), 1)
                  ]),
                  c("td", Dv, [
                    c("span", Av, M(u(_.segment_completed_count, _.segment_init_count)), 1)
                  ]),
                  c("td", Tv, [
                    c("span", Bv, M(u(_.segment_closed_count, _.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: f[0] || (f[0] = (_) => r.value = !r.value)
          }, [
            $t(M(r.value ? "View less" : `View more (${a.data.length - Ks} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Mt(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...f[5] || (f[5] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : N("", !0),
          e.enableExport ? (y(), ht(L(mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", Fv, [...f[6] || (f[6] = [
          G('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Pv = /* @__PURE__ */ et(Lv, [["__scopeId", "data-v-a1ebd82a"]]), Ev = { class: "disruption-metrics-card" }, Rv = { class: "card-header" }, Ov = { class: "header-content" }, Iv = {
  key: 0,
  class: "payment-success-badge"
}, zv = {
  key: 0,
  class: "currency-breakdown-list"
}, Nv = {
  key: 1,
  class: "badge-value"
}, Wv = {
  key: 0,
  class: "loading-state"
}, Vv = {
  key: 1,
  class: "card-body"
}, Hv = { class: "chart-section" }, jv = { class: "chart-wrapper" }, Yv = {
  key: 1,
  class: "empty-chart"
}, qv = {
  key: 0,
  class: "table-section"
}, Uv = { class: "table-wrapper" }, Kv = { class: "data-table" }, Xv = { class: "table-body" }, Gv = { class: "table-cell font-medium text-center" }, Zv = { class: "table-cell text-center" }, Qv = { class: "table-cell text-center" }, Jv = { class: "percentage-text" }, t0 = { class: "table-cell text-center" }, e0 = { class: "abandoned-value" }, s0 = { class: "table-cell" }, a0 = { class: "badges-container badges-wrap" }, n0 = { class: "badge badge-vol" }, o0 = { class: "badge badge-confirm" }, i0 = { class: "badge badge-not-confirm" }, r0 = { class: "badge badge-reject" }, l0 = { class: "badge badge-not-paid" }, c0 = { class: "badge badge-success" }, d0 = { class: "table-cell" }, u0 = { class: "badges-container badges-wrap" }, h0 = { class: "badge badge-inv" }, f0 = { class: "badge badge-human" }, g0 = { class: "badge badge-accept" }, p0 = {
  key: 1,
  class: "empty-state"
}, Xs = 3, v0 = /* @__PURE__ */ at({
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
    }, o = ot(!1), i = D(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (b, v) => new Date(b.date).getTime() - new Date(v.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, Xs)), l = D(() => i.value.length > Xs), d = D(() => s.data?.total_payment_success || []), u = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, h = (b) => lt(b), g = (b) => (b ?? []).reduce((v, m) => v + (m.count ?? 0), 0), p = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : g(b.payment_success_total), f = D(() => {
      const b = s.data, v = b.total_disruption_conversations || 0, m = b.total_disruption_initiated || 0, $ = b.total_voluntary || 0, k = b.total_involuntary || 0, w = b.total_accepted || 0, S = b.total_confirmed || 0, C = typeof b.total_sell_success == "number" ? b.total_sell_success : g(b.total_payment_success), T = b.total_sell_failed || 0, P = Math.max(0, v - m), V = Math.max(0, m - $ - k), R = Math.max(0, k - w), W = Math.max(0, $ - S), q = T, A = Math.max(0, S - C - q), F = (z, I) => {
        const H = I > 0 ? Math.round(z / I * 100) : 0;
        return `${z.toLocaleString()} (${H}%)`;
      }, E = [
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
      ], O = [];
      return m > 0 && O.push({
        source: "Initiated",
        target: "Started",
        value: m,
        label: F(m, v)
      }), P > 0 && O.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: F(P, v)
      }), $ > 0 && O.push({
        source: "Started",
        target: "Voluntary",
        value: $,
        label: F($, v)
      }), k > 0 && O.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: F(k, v)
      }), V > 0 && O.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: V,
        label: F(V, v)
      }), w > 0 && O.push({
        source: "Involuntary",
        target: "Accepted",
        value: w,
        label: F(w, v)
      }), R > 0 && O.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: R,
        label: F(R, v)
      }), S > 0 && O.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: F(S, v)
      }), W > 0 && O.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: W,
        label: F(W, v)
      }), C > 0 && O.push({
        source: "Confirmed",
        target: "Paid",
        value: C,
        label: F(C, v)
      }), q > 0 && O.push({
        source: "Confirmed",
        target: "Rejected",
        value: q,
        label: F(q, v)
      }), A > 0 && O.push({
        source: "Confirmed",
        target: "Not Paid",
        value: A,
        label: F(A, v)
      }), { nodes: E, links: O };
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
    return (b, v) => (y(), x("article", Ev, [
      c("header", Rv, [
        c("div", Ov, [
          v[2] || (v[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? N("", !0) : (y(), x("div", Iv, [
            v[1] || (v[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", zv, [
              (y(!0), x(K, null, Q(d.value, (m) => (y(), x("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, M(m.currency) + " " + M(h(m.total_value)), 1))), 128))
            ])) : (y(), x("p", Nv, M(h(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", Wv, [...v[3] || (v[3] = [
        G('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", Vv, [
        c("section", Hv, [
          c("div", jv, [
            f.value.nodes.length > 0 && f.value.links.length > 0 ? (y(), ht(ce, {
              key: 0,
              data: f.value,
              "node-colors": _,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", Yv, [...v[4] || (v[4] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", qv, [
          v[7] || (v[7] = G('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", Uv, [
            c("table", Kv, [
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
              c("tbody", Xv, [
                (y(!0), x(K, null, Q(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", Gv, M(L(At)(m.date).format("DD/MM")), 1),
                  c("td", Zv, M(L(j)(m.disruption_conversations)), 1),
                  c("td", Qv, [
                    $t(M(L(j)(m.disruption_initiated_count)) + " ", 1),
                    c("span", Jv, " (" + M(u(m.disruption_initiated_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", t0, [
                    c("span", e0, M(L(j)(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count)) + " (" + M(u(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", s0, [
                    c("div", a0, [
                      c("span", n0, " VOL " + M(L(j)(m.voluntary_count)) + " (" + M(u(m.voluntary_count, m.disruption_conversations)) + ") ", 1),
                      c("span", o0, " Confirm " + M(L(j)(m.confirmed_count)) + " (" + M(u(m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", i0, " Not Confirm " + M(L(j)(m.voluntary_count - m.confirmed_count)) + " (" + M(u(m.voluntary_count - m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", r0, " Reject " + M(L(j)(m.sell_failed_count)) + " (" + M(u(m.sell_failed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", l0, " Not Paid " + M(L(j)(Math.max(0, m.confirmed_count - p(m) - m.sell_failed_count))) + " (" + M(u(Math.max(0, m.confirmed_count - p(m) - m.sell_failed_count), m.disruption_conversations)) + ") ", 1),
                      c("span", c0, " Finish " + M(L(j)(p(m))) + " (" + M(u(p(m), m.disruption_conversations)) + ") ", 1),
                      (y(!0), x(K, null, Q(m.payment_success_total || [], ($) => (y(), x("span", {
                        key: `${m.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(h($.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", d0, [
                    c("div", u0, [
                      c("span", h0, " INV " + M(L(j)(m.involuntary_count)) + " (" + M(u(m.involuntary_count, m.disruption_conversations)) + ") ", 1),
                      c("span", f0, " Human " + M(L(j)(m.involuntary_count - m.accepted_count)) + " (" + M(u(m.involuntary_count - m.accepted_count, m.disruption_conversations)) + ") ", 1),
                      c("span", g0, " Accept " + M(L(j)(m.accepted_count)) + " (" + M(u(m.accepted_count, m.disruption_conversations)) + ") ", 1)
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
            $t(M(o.value ? "View less" : `View more (${i.value.length - Xs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Mt(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
          ])) : N("", !0),
          e.enableExport ? (y(), ht(L(mt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", p0, [...v[8] || (v[8] = [
          G('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), b0 = /* @__PURE__ */ et(v0, [["__scopeId", "data-v-47c8f691"]]), m0 = { class: "faq-metrics-card" }, _0 = {
  key: 0,
  class: "card-body"
}, y0 = { class: "kpi-grid" }, x0 = { class: "kpi-card" }, k0 = { class: "kpi-value" }, w0 = { class: "kpi-card" }, $0 = { class: "kpi-value" }, M0 = { class: "kpi-card kpi-card--airline" }, S0 = { class: "kpi-value" }, C0 = { class: "kpi-card kpi-card--booking" }, D0 = { class: "kpi-value" }, A0 = { class: "kpi-card kpi-card--flight" }, T0 = { class: "kpi-value" }, B0 = {
  key: 0,
  class: "chart-section"
}, F0 = {
  key: 1,
  class: "empty-state"
}, L0 = {
  key: 1,
  class: "loading-state"
}, P0 = /* @__PURE__ */ at({
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
    const a = e, n = s, o = (g) => {
      n("export", g);
    }, { isDark: i, colors: r } = rt(it(a, "theme")), l = ot({ labels: [], datasets: [] }), d = D(() => a.data ?? {
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
    })), h = (g) => {
      if (!g) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const p = g.faq_by_day || [];
      if (p.length > 0) {
        const f = p.map((m) => At(m.date).format("MMM DD")), _ = p.map((m) => m.airline_information_retrieved_count || 0), b = p.map((m) => m.flight_status_retrieved_count || 0), v = p.map((m) => m.booking_info_retrieved_count || 0);
        l.value = {
          labels: f,
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
    return Ht(
      () => a.data,
      (g) => {
        h(g ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (g, p) => (y(), x("article", m0, [
      p[7] || (p[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      a.loading ? (y(), x("div", L0, [...p[6] || (p[6] = [
        G('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", _0, [
        c("div", y0, [
          c("div", x0, [
            p[0] || (p[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", k0, M(L(j)(d.value.total_faq_events)), 1)
          ]),
          c("div", w0, [
            p[1] || (p[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", $0, M(L(j)(d.value.total_documents_found)), 1)
          ]),
          c("div", M0, [
            p[2] || (p[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", S0, M(L(j)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", C0, [
            p[3] || (p[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", D0, M(L(j)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", A0, [
            p[4] || (p[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", T0, M(L(j)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", B0, [
          J(le, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", F0, [...p[5] || (p[5] = [
          G('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), E0 = /* @__PURE__ */ et(P0, [["__scopeId", "data-v-5d2c3c33"]]), R0 = { class: "messages-per-agent-card" }, O0 = {
  key: 0,
  class: "card-body"
}, I0 = {
  key: 0,
  class: "chart-section"
}, z0 = {
  key: 1,
  class: "empty-state"
}, N0 = { class: "empty-state-content" }, W0 = { class: "empty-icon-wrapper" }, V0 = {
  key: 1,
  class: "loading-state"
}, H0 = /* @__PURE__ */ at({
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
    }, { isDark: r, colors: l } = rt(it(n, "theme")), d = D(() => {
      const h = n.data?.agents_by_day || {}, g = Object.keys(h).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = /* @__PURE__ */ new Set();
      for (const b of Object.values(h))
        for (const v of Object.keys(b))
          p.add(v);
      const _ = Array.from(p).map((b) => {
        const v = a[b] || "#94a3b8";
        return {
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          data: g.map((m) => h[m]?.[b] || 0),
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
        labels: g,
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
    return t({ isDark: r }), (h, g) => (y(), x("article", R0, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", V0, [...g[2] || (g[2] = [
        G('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", O0, [
        d.value.labels && d.value.labels.length ? (y(), x("section", I0, [
          J(le, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", z0, [
          c("div", N0, [
            c("div", W0, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            g[1] || (g[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), j0 = /* @__PURE__ */ et(H0, [["__scopeId", "data-v-b9368fc2"]]), Y0 = { class: "record-locator-card" }, q0 = {
  key: 0,
  class: "loading-state"
}, U0 = {
  key: 1,
  class: "card-body"
}, K0 = {
  key: 0,
  class: "chart-section"
}, X0 = { class: "chart-wrapper" }, G0 = {
  key: 1,
  class: "table-section"
}, Z0 = { class: "table-wrapper" }, Q0 = { class: "data-table" }, J0 = { class: "table-header-row" }, tb = {
  key: 0,
  class: "table-header"
}, eb = {
  key: 1,
  class: "table-header"
}, sb = { class: "table-body" }, ab = { class: "table-cell font-medium" }, nb = { class: "table-cell text-center" }, ob = { class: "table-cell text-center" }, ib = { class: "table-cell text-center" }, rb = { class: "table-cell text-center" }, lb = { class: "table-cell text-center success-value" }, cb = { class: "table-cell text-center failed-value" }, db = { class: "table-cell text-center warning-value" }, ub = {
  key: 0,
  class: "table-cell text-center"
}, hb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, fb = {
  key: 2,
  class: "empty-state"
}, Gs = 3, gb = /* @__PURE__ */ at({
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
    }, { isDark: i } = rt(it(a, "theme")), r = ot(!1), l = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (b, v) => new Date(b.date).getTime() - new Date(v.date).getTime()
    ) : []), d = D(() => r.value ? l.value : l.value.slice(0, Gs)), u = D(() => l.value.length > Gs), h = D(() => a.data), g = D(() => ({
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
    })), p = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, f = (b, v) => {
      const m = j(b), $ = p(b, v);
      return `${m} (${$})`;
    }, _ = D(() => {
      const b = [], v = [], m = /* @__PURE__ */ new Set(), $ = (U) => {
        m.has(U) || (b.push({ name: U }), m.add(U));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: b, links: v };
      $("Checkin Init"), $("Booking retrive"), $("Checkin Started"), $("Checkin Completed"), $("Checkin Closed");
      const k = h.value.total_checkin_initiated, w = h.value.total_record_locator_init, S = h.value.total_record_locator_started, C = h.value.total_record_locator_completed, T = h.value.total_record_locator_closed, P = h.value.total_record_locator_failed, V = h.value.total_record_locator_abandoned, R = h.value.total_record_locator_init_abandoned, W = h.value.total_checkin_pre_init_abandoned_error, q = h.value.total_checkin_pre_init_abandoned_voluntary, A = W != null || q != null, F = A ? Math.max(Number(W) || 0, 0) : 0, E = A ? Math.max(Number(q) || 0, 0) : 0, O = h.value.total_record_locator_init_abandoned_error, z = h.value.total_record_locator_init_abandoned_voluntary, I = O != null || z != null, H = I ? Math.max(Number(O) || 0, 0) : 0, tt = I ? Math.max(Number(z) || 0, 0) : 0;
      if (w > 0) {
        const U = Math.round(w / k * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: w,
          label: `${w.toLocaleString()} (${U}%)`
        });
      }
      const Z = k - w;
      if (A) {
        if (E > 0) {
          const U = Math.round(E / k * 100);
          $("Abandoned (Init)"), v.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${U}%)`
          });
        }
        if (F > 0) {
          const U = Math.round(F / k * 100);
          $("Booking not retreived"), v.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: F,
            label: `${F.toLocaleString()} (${U}%)`
          });
        }
      } else if (Z > 0) {
        const U = Math.round(Z / k * 100);
        $("Abandoned (Init)"), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Z,
          label: `${Z.toLocaleString()} (${U}%)`
        });
      }
      if (S > 0) {
        const U = Math.round(S / k * 100);
        v.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: S,
          label: `${S.toLocaleString()} (${U}%)`
        });
      }
      if (I) {
        if (H > 0) {
          const U = Math.round(H / k * 100);
          $("Error"), v.push({
            source: "Booking retrive",
            target: "Error",
            value: H,
            label: `${H.toLocaleString()} (${U}%)`
          });
        }
        if (tt > 0) {
          const U = Math.round(tt / k * 100);
          $("Abandoned (Started)"), v.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${U}%)`
          });
        }
      } else if (R > 0) {
        const U = Math.round(R / k * 100);
        $("Abandoned (Started)"), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: R,
          label: `${R.toLocaleString()} (${U}%)`
        });
      }
      if (C > 0) {
        const U = Math.round(C / S * 100);
        v.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: C,
          label: `${C.toLocaleString()} (${U}%)`
        });
      }
      if (T > 0) {
        const U = Math.round(T / S * 100);
        v.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: T,
          label: `${T.toLocaleString()} (${U}%)`
        });
      }
      if (P > 0) {
        const U = Math.round(P / S * 100);
        $("Checkin Failed"), v.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: P,
          label: `${P.toLocaleString()} (${U}%)`
        });
      }
      if (V > 0) {
        const U = Math.round(V / S * 100);
        $("Abandoned (Flow)"), v.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: V,
          label: `${V.toLocaleString()} (${U}%)`
        });
      }
      return { nodes: b, links: v };
    });
    return t({ isDark: i }), (b, v) => (y(), x("article", Y0, [
      v[12] || (v[12] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      a.loading ? (y(), x("div", q0, [...v[1] || (v[1] = [
        G('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", U0, [
        _.value.nodes.length > 0 ? (y(), x("section", K0, [
          c("div", X0, [
            J(ce, {
              data: _.value,
              height: "500px",
              "node-colors": g.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : N("", !0),
        l.value && l.value.length > 0 ? (y(), x("section", G0, [
          c("div", Z0, [
            c("table", Q0, [
              c("thead", null, [
                c("tr", J0, [
                  v[2] || (v[2] = c("th", { class: "table-header" }, "Date", -1)),
                  v[3] || (v[3] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  v[4] || (v[4] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  v[5] || (v[5] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  v[6] || (v[6] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  v[7] || (v[7] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  v[8] || (v[8] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  v[9] || (v[9] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  a.isAvianca ? (y(), x("th", tb, "Create Payment")) : N("", !0),
                  a.isAvianca ? (y(), x("th", eb, "Failed Payment")) : N("", !0)
                ])
              ]),
              c("tbody", sb, [
                (y(!0), x(K, null, Q(d.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", ab, M(L(At)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", nb, M(L(j)(m.checkin_initiated)), 1),
                  c("td", ob, M(f(m.record_locator_init_count, m.checkin_initiated)), 1),
                  c("td", ib, M(L(j)(m.record_locator_started_count)), 1),
                  c("td", rb, M(f(m.record_locator_completed_count, m.record_locator_started_count)), 1),
                  c("td", lb, M(f(m.record_locator_closed_count, m.record_locator_started_count)), 1),
                  c("td", cb, M(f(m.record_locator_failed_count, m.record_locator_started_count)), 1),
                  c("td", db, M(f(m.record_locator_abandoned_count, m.record_locator_started_count)), 1),
                  a.isAvianca ? (y(), x("td", ub, M(L(j)(m.record_locator_create_payment_count)), 1)) : N("", !0),
                  a.isAvianca ? (y(), x("td", hb, M(L(j)(m.record_locator_create_payment_failed_count)), 1)) : N("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: v[0] || (v[0] = (m) => r.value = !r.value)
          }, [
            $t(M(r.value ? "View less" : `View more (${l.value.length - Gs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Mt(["view-more-icon", { "view-more-icon-rotated": r.value }]),
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
          ])) : N("", !0),
          e.enableExport ? (y(), ht(L(mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", fb, [...v[11] || (v[11] = [
          G('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), pb = /* @__PURE__ */ et(gb, [["__scopeId", "data-v-e48cea55"]]), vb = { class: "sales-channel-card" }, bb = {
  key: 0,
  class: "loading-state"
}, mb = {
  key: 1,
  class: "card-body"
}, _b = {
  key: 0,
  class: "chart-section"
}, yb = { class: "chart-wrapper" }, xb = {
  key: 1,
  class: "empty-state"
}, kb = {
  key: 2,
  class: "comparison-section"
}, wb = { class: "comparison-grid" }, $b = { class: "comparison-content" }, Mb = { class: "comparison-channel" }, Sb = { class: "comparison-value" }, Cb = {
  key: 0,
  class: "comparison-delta"
}, Db = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Ab = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Tb = { class: "delta-label" }, Bb = {
  key: 1,
  class: "comparison-delta"
}, Fb = /* @__PURE__ */ at({
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
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = s, r = (g) => {
      i("export", g);
    }, { isDark: l } = rt(it(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const d = D(() => {
      const g = /* @__PURE__ */ new Set();
      for (const p of o.data?.sales_by_channel_by_day ?? [])
        for (const f of Object.keys(p.channels))
          g.add(f);
      return Array.from(g).sort();
    }), u = (g, p) => a[g.toLowerCase()] ?? n[p % n.length], h = D(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const p = g.map((_) => At(_.date).format("MMM-DD")), f = d.value.map((_, b) => ({
        label: _,
        data: g.map((v) => v.channels[_] ?? 0),
        backgroundColor: u(_, b),
        borderRadius: 4
      }));
      return { labels: p, datasets: f };
    });
    return t({ isDark: l }), (g, p) => (y(), x("article", vb, [
      p[5] || (p[5] = G('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", bb, [...p[0] || (p[0] = [
        G('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", mb, [
        h.value.labels.length > 0 ? (y(), x("section", _b, [
          c("div", yb, [
            J(ee, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", xb, [...p[1] || (p[1] = [
          G('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", kb, [
          c("div", wb, [
            (y(!0), x(K, null, Q(e.channelComparison, (f) => (y(), x("div", {
              key: f.channel,
              class: "comparison-card"
            }, [
              c("div", {
                class: "comparison-color-bar",
                style: xt({ backgroundColor: u(f.channel, e.channelComparison.indexOf(f)) })
              }, null, 4),
              c("div", $b, [
                c("span", Mb, M(f.channel), 1),
                c("span", Sb, M(L(j)(f.current)), 1),
                f.delta !== null ? (y(), x("div", Cb, [
                  c("span", {
                    class: Mt(["delta-badge", f.delta > 0 ? "delta-up" : f.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    f.delta > 0 ? (y(), x("svg", Db, [...p[2] || (p[2] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : f.delta < 0 ? (y(), x("svg", Ab, [...p[3] || (p[3] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : N("", !0),
                    $t(" " + M(Math.abs(f.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  c("span", Tb, "vs prev. period (" + M(L(j)(f.previous)) + ")", 1)
                ])) : (y(), x("div", Bb, [...p[4] || (p[4] = [
                  c("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : N("", !0)
      ]))
    ]));
  }
}), Lb = /* @__PURE__ */ et(Fb, [["__scopeId", "data-v-8b96a431"]]), Pb = { class: "seller-metrics-card" }, Eb = { class: "card-header" }, Rb = { class: "header-content" }, Ob = {
  key: 0,
  class: "payment-success-badge"
}, Ib = {
  key: 0,
  class: "currency-breakdown-list"
}, zb = {
  key: 1,
  class: "badge-value"
}, Nb = {
  key: 0,
  class: "loading-state"
}, Wb = {
  key: 1,
  class: "card-body"
}, Vb = {
  key: 0,
  class: "chart-section"
}, Hb = { class: "chart-wrapper" }, jb = {
  key: 1,
  class: "empty-state"
}, Yb = {
  key: 2,
  class: "table-section"
}, qb = { class: "table-wrapper" }, Ub = { class: "data-table" }, Kb = { class: "table-body" }, Xb = { class: "table-cell font-medium" }, Gb = { class: "table-cell text-center" }, Zb = { class: "table-cell text-center" }, Qb = { class: "table-cell text-center" }, Jb = { class: "table-cell text-center" }, tm = { class: "table-cell text-center" }, em = { class: "table-cell text-center success-value" }, sm = {
  key: 0,
  class: "currency-cell-list"
}, am = { key: 1 }, nm = { class: "table-cell text-left" }, om = {
  key: 0,
  class: "failed-reasons"
}, im = { class: "reason-name" }, rm = { class: "reason-count" }, lm = {
  key: 1,
  class: "empty-cell"
}, Zs = 3, cm = /* @__PURE__ */ at({
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
    const a = e, n = s, o = (w) => {
      n("export", w);
    }, { isDark: i } = rt(it(a, "theme")), r = ot(!1), l = D(() => {
      if (!a.sellerData?.seller_by_day) return [];
      const w = [...a.sellerData.seller_by_day];
      return a.failedData?.failed_by_reason_by_day && a.failedData.failed_by_reason_by_day.forEach((S) => {
        const C = w.findIndex((T) => T.date === S.date);
        C !== -1 ? w[C] = { ...w[C], reasons: S.reasons } : w.push({
          date: S.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: S.reasons
        });
      }), w.sort((S, C) => new Date(S.date).getTime() - new Date(C.date).getTime());
    }), d = D(() => r.value ? l.value : l.value.slice(0, Zs)), u = D(() => l.value.length > Zs), h = D(() => a.sellerData), g = D(() => a.failedData), p = D(
      () => Array.isArray(a.sellerData.total_value_sell_success) ? a.sellerData.total_value_sell_success : []
    ), f = D(() => {
      const {
        total_seller_conversations: w = 0,
        total_sell_started: S = 0,
        total_sell_booking_created: C = 0,
        total_sell_success: T = 0
      } = h.value, { failed_by_reason_by_day: P = [] } = g.value;
      if (w === 0) return { nodes: [], links: [] };
      const V = [
        { name: "Sell Initiated", value: w },
        { name: "Sell Started", value: S },
        { name: "Booking Created", value: C },
        { name: "Sell Success", value: T }
      ], R = [], W = w - S;
      if (W > 0) {
        const E = Math.round(W / w * 100);
        V.push({ name: "Abandoned (Init)", value: W }), R.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: W,
          label: `${W.toLocaleString()} (${E}%)`
        });
      }
      if (S > 0) {
        const E = Math.round(S / w * 100);
        R.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: S,
          label: `${S.toLocaleString()} (${E}%)`
        });
      }
      const q = P.reduce((E, O) => (O.reasons && Array.isArray(O.reasons) && O.reasons.forEach((z) => {
        const I = z.reason, H = z.failed_count;
        E[I] = (E[I] || 0) + H;
      }), E), {});
      if (C > 0) {
        const E = Math.round(C / w * 100);
        R.push({
          source: "Sell Started",
          target: "Booking Created",
          value: C,
          label: `${C.toLocaleString()} (${E}%)`
        });
      }
      if (T > 0) {
        const E = Math.round(T / w * 100);
        R.push({
          source: "Booking Created",
          target: "Sell Success",
          value: T,
          label: `${T.toLocaleString()} (${E}%)`
        });
      }
      const A = S - C;
      if (A > 0) {
        const E = Math.round(A / w * 100);
        V.push({ name: "Failed at Booking", value: A }), R.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: A,
          label: `${A.toLocaleString()} (${E}%)`
        });
      }
      if (Object.keys(q).length > 0) {
        const E = Object.values(q).reduce((z, I) => z + I, 0), O = A - E;
        if (Object.entries(q).filter(([, z]) => z > 0).sort(([, z], [, I]) => I - z).forEach(([z, I]) => {
          const H = Math.round(I / w * 100);
          V.push({ name: `Failed: ${z}`, value: I }), R.push({
            source: "Failed at Booking",
            target: `Failed: ${z}`,
            value: I,
            label: `${I.toLocaleString()} (${H}%)`
          });
        }), O > 0) {
          const z = Math.round(O / w * 100);
          V.push({ name: "Failed: Without Reason", value: O }), R.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: O,
            label: `${O.toLocaleString()} (${z}%)`
          });
        }
      }
      const F = C - T;
      if (F > 0) {
        const E = Math.round(F / w * 100);
        V.push({ name: "Failed at Completion", value: F }), R.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: F,
          label: `${F.toLocaleString()} (${E}%)`
        });
      }
      return { nodes: V, links: R };
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
    }, b = D(() => _), v = (w, S) => !S || S === 0 ? "0%" : `${Math.round(w / S * 100)}%`, m = (w, S) => {
      const C = j(w), T = v(w, S);
      return `${C} (${T})`;
    }, $ = (w) => w == null ? 0 : typeof w == "number" ? w : Array.isArray(w) ? w.reduce((S, C) => S + (C.total_value || 0), 0) : 0, k = (w) => lt($(w));
    return t({ isDark: i }), (w, S) => (y(), x("article", Pb, [
      c("header", Eb, [
        c("div", Rb, [
          S[2] || (S[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          a.loading ? N("", !0) : (y(), x("div", Ob, [
            S[1] || (S[1] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            p.value.length > 0 ? (y(), x("div", Ib, [
              (y(!0), x(K, null, Q(p.value, (C) => (y(), x("p", {
                key: C.currency,
                class: "currency-breakdown-item"
              }, M(C.currency) + " " + M(L(lt)(C.total_value)), 1))), 128))
            ])) : (y(), x("p", zb, M(k(a.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", Nb, [...S[3] || (S[3] = [
        G('<div class="loading-container" data-v-60dfa4f1><div class="chart-flow-loader" data-v-60dfa4f1><div class="flow-line flow-1" data-v-60dfa4f1></div><div class="flow-line flow-2" data-v-60dfa4f1></div><div class="flow-line flow-3" data-v-60dfa4f1></div><div class="flow-line flow-4" data-v-60dfa4f1></div><div class="flow-line flow-5" data-v-60dfa4f1></div></div><p class="loading-text" data-v-60dfa4f1>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Wb, [
        f.value.nodes.length > 0 ? (y(), x("section", Vb, [
          c("div", Hb, [
            J(ce, {
              data: f.value,
              "node-colors": b.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", jb, [...S[4] || (S[4] = [
          G('<div class="empty-state-content" data-v-60dfa4f1><div class="empty-icon-wrapper" data-v-60dfa4f1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-60dfa4f1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-60dfa4f1></path></svg></div><p class="empty-title" data-v-60dfa4f1>No sales data available</p><p class="empty-description" data-v-60dfa4f1>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        l.value && l.value.length > 0 ? (y(), x("section", Yb, [
          c("div", qb, [
            c("table", Ub, [
              S[5] || (S[5] = c("thead", null, [
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
              c("tbody", Kb, [
                (y(!0), x(K, null, Q(d.value, (C) => (y(), x("tr", {
                  key: C.date,
                  class: "table-row"
                }, [
                  c("td", Xb, M(L(At)(C.date).format("DD/MM/YYYY")), 1),
                  c("td", Gb, M(L(j)(C.seller_conversations || 0)), 1),
                  c("td", Zb, M(m(C.sell_started_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", Qb, M(m(C.sell_get_quote_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", Jb, M(m(C.sell_booking_created_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", tm, M(m(C.sell_success_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", em, [
                    Array.isArray(C.daily_value_sell_success) && C.daily_value_sell_success.length > 0 ? (y(), x("div", sm, [
                      (y(!0), x(K, null, Q(C.daily_value_sell_success, (T) => (y(), x("span", {
                        key: `${C.date}-${T.currency}`
                      }, M(T.currency) + " " + M(L(lt)(T.total_value)), 1))), 128))
                    ])) : (y(), x("span", am, M(k(C.daily_value_sell_success)), 1))
                  ]),
                  c("td", nm, [
                    C.reasons && C.reasons.length > 0 ? (y(), x("div", om, [
                      (y(!0), x(K, null, Q(C.reasons, (T) => (y(), x("div", {
                        key: T.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", im, M(T.reason) + ":", 1),
                        c("span", rm, M(T.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", lm, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: S[0] || (S[0] = (C) => r.value = !r.value)
          }, [
            $t(M(r.value ? "View less" : `View more (${l.value.length - Zs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Mt(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...S[6] || (S[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : N("", !0),
          e.enableExport ? (y(), ht(L(mt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : N("", !0)
      ]))
    ]));
  }
}), dm = /* @__PURE__ */ et(cm, [["__scopeId", "data-v-60dfa4f1"]]), um = { class: "top-agents-card" }, hm = {
  key: 0,
  class: "card-body"
}, fm = {
  key: 0,
  class: "chart-section"
}, gm = {
  key: 1,
  class: "empty-state"
}, pm = { class: "empty-state-content" }, vm = { class: "empty-icon-wrapper" }, bm = {
  key: 1,
  class: "loading-state"
}, mm = /* @__PURE__ */ at({
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
    }, { isDark: r, colors: l } = rt(it(n, "theme")), d = D(() => {
      const g = (n.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.reduce(
        (b, v) => b + (Number(v.conversations) || 0),
        0
      ), f = g.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return a[v] || "#94a3b8";
      }), _ = f.map((b) => `${b}80`);
      return {
        labels: g.map((b) => {
          const v = Number(b.conversations) || 0, m = p ? v / p * 100 : 0;
          return `${b.agent_type} - ${v.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((b) => b.conversations),
            backgroundColor: _,
            borderColor: f,
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
              const g = (h.label || "").toString().split(" - ")[0], p = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (b, v) => b + (Number(v) || 0),
                0
              ), _ = f ? p / f * 100 : 0;
              return `${g}: ${p.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, g) => (y(), x("article", um, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", bm, [...g[2] || (g[2] = [
        G('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", hm, [
        d.value.labels && d.value.labels.length ? (y(), x("section", fm, [
          J(Ts, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", gm, [
          c("div", pm, [
            c("div", vm, [
              J(L(og), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            g[1] || (g[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), _m = /* @__PURE__ */ et(mm, [["__scopeId", "data-v-501bf4c4"]]), ym = { class: "payment-method-card" }, xm = { class: "card-header" }, km = { class: "header-content" }, wm = {
  key: 0,
  class: "stats-badge"
}, $m = {
  key: 0,
  class: "currency-breakdown-list"
}, Mm = {
  key: 1,
  class: "badge-value"
}, Sm = {
  key: 0,
  class: "loading-state"
}, Cm = {
  key: 1,
  class: "card-body"
}, Dm = {
  key: 0,
  class: "payment-methods-section"
}, Am = { class: "payment-methods-grid" }, Tm = { class: "payment-card-content" }, Bm = { class: "payment-card-header" }, Fm = {
  key: 0,
  class: "currency-cell-list"
}, Lm = { class: "payment-badge-wrapper" }, Pm = {
  key: 1,
  class: "empty-state"
}, Em = { class: "empty-state-content" }, Rm = { class: "empty-icon-wrapper" }, Om = {
  key: 2,
  class: "table-section"
}, Im = { class: "table-wrapper" }, zm = { class: "data-table" }, Nm = { class: "table-body" }, Wm = { class: "table-cell font-medium" }, Vm = { class: "table-cell text-center" }, Hm = { class: "table-cell text-center success-value" }, jm = {
  key: 0,
  class: "currency-cell-list"
}, Ym = { key: 1 }, qm = { class: "table-cell" }, Um = { class: "payment-tags" }, Km = { class: "tag-name" }, Xm = {
  key: 0,
  class: "tag-amount"
}, Gm = {
  key: 1,
  class: "tag-amount"
}, Zm = { class: "tag-count" }, Qm = {
  key: 3,
  class: "empty-table-state"
}, Jm = "Not Registered", Qs = 3, t1 = /* @__PURE__ */ at({
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
    const a = e, n = s, { isDark: o } = rt(it(a, "theme")), i = ot(!1), r = ot({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = D(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = D(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = ot(!1), h = D(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((A, F) => At(A.date).valueOf() - At(F.date).valueOf())), g = D(() => u.value ? h.value : h.value.slice(0, Qs)), p = D(() => h.value.length > Qs), f = (A) => {
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
      const F = (A.payment_method_breakdown || []).map((O) => ({
        payment_method: O.payment_method || "Unknown",
        total_amount: O.total_amount ?? 0,
        count: O.count ?? 0,
        total_amount_by_currency: O.total_amount_by_currency ?? []
      })), E = (A.payment_method_by_day || []).map((O) => ({
        date: O.date || "",
        total_count: O.total_count ?? 0,
        total_amount: O.total_amount ?? 0,
        total_amount_by_currency: O.total_amount_by_currency ?? [],
        payment_methods: (O.payment_methods || []).map((z) => ({
          payment_method: z.payment_method || "Unknown",
          total_amount: z.total_amount ?? 0,
          count: z.count ?? 0,
          total_amount_by_currency: z.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: A.airline_name || a.airlineName,
        start_date: A.start_date || "",
        end_date: A.end_date || "",
        total_conversations: A.total_conversations ?? 0,
        total_amount: A.total_amount ?? 0,
        total_amount_by_currency: A.total_amount_by_currency ?? [],
        payment_method_breakdown: F,
        payment_method_by_day: E
      };
    }, _ = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [A, F] = a.dates.map((O) => At(O).format("YYYY-MM-DD")), E = await a.fetchFunction(a.airlineName, A, F);
          r.value = f(E);
        } catch (A) {
          console.error("Error fetching payment method metrics:", A), r.value = f(null);
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
      const F = b[A % b.length];
      return {
        background: F.bg,
        borderColor: F.border
      };
    }, m = (A) => ({ color: b[A % b.length].text }), $ = (A) => ({ color: b[A % b.length].value }), k = (A) => ({ color: b[A % b.length].icon }), w = (A) => ({ color: b[A % b.length].badge }), S = (A) => {
      const E = P(A).length;
      return E > 18 ? { fontSize: "0.75rem" } : E > 15 ? { fontSize: "0.875rem" } : E > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, C = (A) => {
      const F = A?.toLowerCase() || "";
      return !A || F === "unknown" ? lg : F.includes("credit") || F.includes("debit") ? to : F.includes("cash") || F.includes("efectivo") ? ag : F.includes("bank") || F.includes("transfer") ? ng : F.includes("zelle") || F.includes("pago") || F.includes("movil") ? rg : F.includes("wallet") ? cg : ig;
    }, T = (A) => !A || A.toLowerCase() === "unknown" ? Jm : A.replace(/_/g, " "), P = (A) => A == null ? "$0.00" : lt(A), V = (A) => A ? At(A).format("DD/MM/YYYY") : "-", R = (A) => A == null || Number.isNaN(Number(A)) ? 0 : Number(A), W = (A) => {
      n("export", A);
    };
    function q() {
      const A = a.data;
      A && (Array.isArray(A.payment_method_breakdown) && A.payment_method_breakdown.length > 0 || Array.isArray(A.payment_method_by_day) && A.payment_method_by_day.length > 0) && (i.value = !1, r.value = f(A));
    }
    return Ze(() => {
      a.data ? q() : _();
    }), Ht(
      () => a.data,
      (A) => {
        A && q();
      },
      { deep: !0 }
    ), Ht(
      () => a.dates,
      (A) => {
        a.data || A && A[0] && A[1] && _();
      },
      { deep: !0 }
    ), t({ isDark: o }), (A, F) => (y(), x("article", ym, [
      c("header", xm, [
        c("div", km, [
          F[2] || (F[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (y(), x("div", wm, [
            F[1] || (F[1] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", $m, [
              (y(!0), x(K, null, Q(r.value.total_amount_by_currency, (E) => (y(), x("p", {
                key: E.currency,
                class: "currency-breakdown-item"
              }, M(E.currency) + " " + M(P(E.total_value)), 1))), 128))
            ])) : (y(), x("p", Mm, M(P(r.value.total_amount)), 1))
          ])) : N("", !0)
        ])
      ]),
      i.value ? (y(), x("div", Sm, [...F[3] || (F[3] = [
        G('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", Cm, [
        l.value ? (y(), x("section", Dm, [
          F[4] || (F[4] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", Am, [
            (y(!0), x(K, null, Q(r.value.payment_method_breakdown, (E, O) => (y(), x("div", {
              key: E.payment_method,
              class: "payment-method-card-item",
              style: xt(v(O))
            }, [
              c("div", Tm, [
                c("div", Bm, [
                  (y(), ht(lo(C(E.payment_method)), {
                    class: "payment-icon",
                    style: xt(k(O))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: xt(m(O))
                  }, M(T(E.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: xt([$(O), S(E.total_amount)])
                }, M(P(E.total_amount)), 5),
                E.total_amount_by_currency && E.total_amount_by_currency.length > 0 ? (y(), x("div", Fm, [
                  (y(!0), x(K, null, Q(E.total_amount_by_currency, (z) => (y(), x("span", {
                    key: `${E.payment_method}-${z.currency}`
                  }, M(z.currency) + " " + M(P(z.total_value)), 1))), 128))
                ])) : N("", !0),
                c("div", Lm, [
                  c("span", {
                    class: "payment-badge",
                    style: xt(w(O))
                  }, M(R(E.count)) + " " + M(R(E.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", Pm, [
          c("div", Em, [
            c("div", Rm, [
              J(L(to), { class: "empty-icon" })
            ]),
            F[5] || (F[5] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            F[6] || (F[6] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", Om, [
          F[10] || (F[10] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", Im, [
            c("table", zm, [
              F[8] || (F[8] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", Nm, [
                (y(!0), x(K, null, Q(g.value, (E) => (y(), x("tr", {
                  key: E.date,
                  class: "table-row"
                }, [
                  c("td", Wm, M(V(E.date)), 1),
                  c("td", Vm, M(L(j)(E.total_count ?? 0)), 1),
                  c("td", Hm, [
                    E.total_amount_by_currency && E.total_amount_by_currency.length > 0 ? (y(), x("div", jm, [
                      (y(!0), x(K, null, Q(E.total_amount_by_currency, (O) => (y(), x("span", {
                        key: `${E.date}-${O.currency}`
                      }, M(O.currency) + " " + M(P(O.total_value)), 1))), 128))
                    ])) : (y(), x("span", Ym, M(P(E.total_amount)), 1))
                  ]),
                  c("td", qm, [
                    c("div", Um, [
                      (y(!0), x(K, null, Q(E.payment_methods || [], (O) => (y(), x("div", {
                        key: O.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", Km, M(T(O.payment_method)), 1),
                        F[7] || (F[7] = c("span", { class: "tag-separator" }, "•", -1)),
                        !O.total_amount_by_currency || O.total_amount_by_currency.length === 0 ? (y(), x("span", Xm, M(P(O.total_amount)), 1)) : (y(), x("span", Gm, M(O.total_amount_by_currency.map((z) => `${z.currency} ${P(z.total_value)}`).join(" / ")), 1)),
                        c("span", Zm, "(" + M(R(O.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          p.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: F[0] || (F[0] = (E) => u.value = !u.value)
          }, [
            $t(M(u.value ? "View less" : `View more (${h.value.length - Qs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Mt(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...F[9] || (F[9] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : N("", !0),
          e.enableExport ? (y(), ht(L(mt), {
            key: 1,
            onExport: W,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : l.value ? (y(), x("div", Qm, [...F[11] || (F[11] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : N("", !0)
      ]))
    ]));
  }
}), e1 = /* @__PURE__ */ et(t1, [["__scopeId", "data-v-ff4ce0b7"]]), s1 = { class: "agent-human-conv-card" }, a1 = {
  key: 0,
  class: "loading-state"
}, n1 = {
  key: 1,
  class: "card-body"
}, o1 = { class: "summary-cards" }, i1 = { class: "summary-card assigned-card" }, r1 = { class: "summary-card-content" }, l1 = { class: "card-content" }, c1 = { class: "card-value assigned-value" }, d1 = { class: "card-content" }, u1 = { class: "card-value assigned-value" }, h1 = { class: "summary-card closed-card" }, f1 = { class: "summary-card-content" }, g1 = { class: "card-content" }, p1 = { class: "card-value closed-value" }, v1 = { class: "card-content" }, b1 = { class: "card-value closed-value" }, m1 = {
  key: 0,
  class: "agents-section"
}, _1 = { class: "date-header" }, y1 = { class: "date-title" }, x1 = { class: "date-stats" }, k1 = { class: "stat-item assigned-stat" }, w1 = { class: "stat-value" }, $1 = { class: "stat-value" }, M1 = { class: "stat-item closed-stat" }, S1 = { class: "stat-value" }, C1 = { class: "stat-value" }, D1 = { class: "table-wrapper" }, A1 = { class: "data-table" }, T1 = { class: "table-body" }, B1 = { class: "table-cell name-cell" }, F1 = { class: "table-cell email-cell" }, L1 = { class: "table-cell text-center" }, P1 = { class: "metric-cell-content" }, E1 = { class: "badge assigned-badge" }, R1 = { class: "metric-cell-avg" }, O1 = { class: "table-cell text-center" }, I1 = { class: "metric-cell-content" }, z1 = { class: "badge closed-badge" }, N1 = { class: "metric-cell-avg" }, W1 = {
  key: 1,
  class: "empty-state"
}, V1 = /* @__PURE__ */ at({
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
    }, { isDark: i } = rt(it(a, "theme")), r = D(() => a.data?.agents_by_day && a.data.agents_by_day.length > 0), l = D(() => {
      if (!r.value) return {};
      const b = {};
      for (const $ of a.data.agents_by_day)
        b[$.date] || (b[$.date] = []), b[$.date].push($);
      const v = Object.keys(b).sort(($, k) => new Date($).getTime() - new Date(k).getTime()), m = {};
      for (const $ of v)
        m[$] = b[$];
      return m;
    }), d = (b) => b == null ? "0" : j(b), u = (b) => {
      if (b == null)
        return "AVG";
      if (b < 60)
        return `${Math.round(b)}s`;
      const v = Math.round(b), m = Math.floor(v / 60), $ = v % 60;
      if (m < 60)
        return `${m}m ${$}s`;
      const k = Math.floor(m / 60), w = m % 60;
      return `${k}h ${w}m`;
    }, h = (b) => {
      const v = new Date(b), m = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return v.toLocaleDateString("en-US", m);
    }, g = (b) => b[0]?.day_total_assigned ?? 0, p = (b) => b[0]?.day_total_closed ?? 0, f = (b) => b[0]?.day_avg_time_to_assign_seconds ?? null, _ = (b) => b[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (b, v) => (y(), x("article", s1, [
      v[11] || (v[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", a1, [...v[0] || (v[0] = [
        G('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", n1, [
        c("div", o1, [
          c("div", i1, [
            v[3] || (v[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", r1, [
              c("div", l1, [
                v[1] || (v[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", c1, M(d(e.data.total_assigned)), 1)
              ]),
              c("div", d1, [
                v[2] || (v[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", u1, M(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", h1, [
            v[6] || (v[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", f1, [
              c("div", g1, [
                v[4] || (v[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", p1, M(d(e.data.total_closed)), 1)
              ]),
              c("div", v1, [
                v[5] || (v[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", b1, M(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", m1, [
          (y(!0), x(K, null, Q(l.value, (m, $) => (y(), x("div", {
            key: $,
            class: "date-group"
          }, [
            c("div", _1, [
              c("h4", y1, M(h($)), 1),
              c("div", x1, [
                c("span", k1, [
                  c("span", w1, M(d(g(m))), 1),
                  v[7] || (v[7] = $t(" Assigned ", -1)),
                  c("span", $1, M(u(f(m))), 1)
                ]),
                c("span", M1, [
                  c("span", S1, M(d(p(m))), 1),
                  v[8] || (v[8] = $t(" Closed ", -1)),
                  c("span", C1, M(u(_(m))), 1)
                ])
              ])
            ]),
            c("div", D1, [
              c("table", A1, [
                v[9] || (v[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", T1, [
                  (y(!0), x(K, null, Q(m, (k) => (y(), x("tr", {
                    key: `${$}-${k.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", B1, M(k.agent_name || "-"), 1),
                    c("td", F1, M(k.agent_email), 1),
                    c("td", L1, [
                      c("div", P1, [
                        c("span", E1, M(d(k.assigned_count)), 1),
                        c("span", R1, M(u(k.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", O1, [
                      c("div", I1, [
                        c("span", z1, M(d(k.closed_count)), 1),
                        c("span", N1, M(u(k.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", W1, [...v[10] || (v[10] = [
          G('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), H1 = /* @__PURE__ */ et(V1, [["__scopeId", "data-v-6cfba83b"]]), j1 = { class: "channel-metrics-card" }, Y1 = {
  key: 0,
  class: "card-body"
}, q1 = {
  key: 0,
  class: "kpi-grid"
}, U1 = { class: "kpi-label" }, K1 = { class: "kpi-value" }, X1 = { class: "kpi-card total-card" }, G1 = { class: "kpi-value" }, Z1 = {
  key: 1,
  class: "chart-section"
}, Q1 = {
  key: 2,
  class: "empty-state"
}, J1 = {
  key: 1,
  class: "loading-state"
}, t_ = /* @__PURE__ */ at({
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
    const a = e, n = s, o = (g) => {
      n("export", g);
    }, { isDark: i, colors: r } = rt(it(a, "theme")), l = ot({ labels: [], datasets: [] }), d = D(() => a.data ?? {
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
    })), h = (g) => {
      if (!g || !g.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const p = g.channels_by_day, f = Object.keys(p).sort();
      if (f.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(p))
        for (const k of Object.keys($))
          _.add(k);
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
      }, m = b.map(($) => {
        const k = $.toLowerCase(), w = v[k] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: f.map((S) => p[S]?.[$] || 0),
          borderColor: w,
          backgroundColor: `${w}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: w,
          pointBorderColor: w,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: f.map(($) => At($).format("MMM DD")),
        datasets: m
      };
    };
    return Ht(
      () => a.data,
      (g) => {
        h(g ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (g, p) => (y(), x("article", j1, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      a.loading ? (y(), x("div", J1, [...p[2] || (p[2] = [
        G('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", Y1, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", q1, [
          (y(!0), x(K, null, Q(Object.keys(d.value.total_by_channel), (f) => (y(), x("div", {
            class: "kpi-card",
            key: f
          }, [
            c("span", U1, M(f.toUpperCase()), 1),
            c("span", K1, M(L(j)(d.value.total_by_channel[f])), 1)
          ]))), 128)),
          c("div", X1, [
            p[0] || (p[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", G1, M(L(j)(d.value.total_conversations)), 1)
          ])
        ])) : N("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", Z1, [
          J(le, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", Q1, [...p[1] || (p[1] = [
          G('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), e_ = /* @__PURE__ */ et(t_, [["__scopeId", "data-v-82f175d2"]]), s_ = { class: "triage-combinations-card" }, a_ = { class: "card-header" }, n_ = { class: "total-badge" }, o_ = {
  key: 0,
  class: "card-body"
}, i_ = { class: "chart-container" }, r_ = { class: "table-container" }, l_ = { class: "table-row" }, c_ = { class: "table-row" }, d_ = { class: "table-cell text-center count-cell" }, u_ = { class: "table-cell text-center count-cell" }, h_ = { class: "table-cell text-center count-cell" }, f_ = { class: "table-cell text-center count-cell" }, g_ = { class: "table-cell text-center count-cell" }, p_ = {
  key: 1,
  class: "empty-state"
}, v_ = { class: "empty-state-content" }, b_ = { class: "empty-icon-wrapper" }, m_ = {
  key: 1,
  class: "loading-state"
}, __ = /* @__PURE__ */ at({
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
    }, { isDark: i, colors: r } = rt(it(a, "theme")), l = D(() => {
      const v = a.data?.combinations || {}, m = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, k] of Object.entries(v)) {
        const w = $.split("+").filter(Boolean);
        if (!w.includes("triage")) continue;
        const S = w.filter((C) => C !== "triage").length;
        S >= 4 ? m["4p"] += Number(k) || 0 : m[S] += Number(k) || 0;
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
    }, p = (v) => v?.replace("80", "") || "#888888", f = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: p(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: p(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: p(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: p(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: p(g.c4p),
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
    return t({ isDark: i }), (v, m) => (y(), x("article", s_, [
      c("header", a_, [
        m[0] || (m[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", n_, " Total: " + M(d.value), 1)
      ]),
      e.loading ? (y(), x("div", m_, [...m[6] || (m[6] = [
        G('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", o_, [
        u.value ? (y(), x(K, { key: 0 }, [
          c("div", i_, [
            J(ee, {
              data: f.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", r_, [
            m[3] || (m[3] = G('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", l_, [
              m[1] || (m[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: p(g.c0) })
              }, M(b(h.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: p(g.c1) })
              }, M(b(h.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: p(g.c2) })
              }, M(b(h.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: p(g.c3) })
              }, M(b(h.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: p(g.c4p) })
              }, M(b(h.value.pct4p)) + "% ", 5)
            ]),
            c("div", c_, [
              m[2] || (m[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", d_, M(L(j)(l.value[0])), 1),
              c("div", u_, M(L(j)(l.value[1])), 1),
              c("div", h_, M(L(j)(l.value[2])), 1),
              c("div", f_, M(L(j)(l.value[3])), 1),
              c("div", g_, M(L(j)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ], 64)) : (y(), x("div", p_, [
          c("div", v_, [
            c("div", b_, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            m[4] || (m[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            m[5] || (m[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), y_ = /* @__PURE__ */ et(__, [["__scopeId", "data-v-cb93cda2"]]), x_ = { class: "select-language-card" }, k_ = { class: "card-header" }, w_ = { class: "header-content" }, $_ = {
  key: 0,
  class: "total-badge"
}, M_ = { class: "badge-value" }, S_ = {
  key: 0,
  class: "loading-state"
}, C_ = {
  key: 1,
  class: "card-body"
}, D_ = {
  key: 0,
  class: "pie-section"
}, A_ = {
  key: 1,
  class: "empty-state"
}, T_ = /* @__PURE__ */ at({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(it(s, "theme")), o = [
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
      () => s.data?.items && s.data.items.length > 0
    ), d = D(
      () => (s.data?.items || []).reduce((p, f) => p + f.count, 0)
    ), u = D(() => {
      const p = {};
      for (const f of s.data?.items || [])
        p[f.language] = (p[f.language] || 0) + f.count;
      return Object.entries(p).map(([f, _]) => ({ language: f, count: _ })).sort((f, _) => _.count - f.count);
    }), h = D(() => ({
      labels: u.value.map((p) => r(p.language)),
      datasets: [{
        data: u.value.map((p) => p.count),
        backgroundColor: u.value.map((p, f) => o[f % o.length] + "80"),
        borderColor: u.value.map((p, f) => o[f % o.length]),
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
            label: (p) => {
              const f = p.raw || 0, _ = d.value > 0 ? (f / d.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${f} (${_}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (p, f) => (y(), x("article", x_, [
      c("header", k_, [
        c("div", w_, [
          f[1] || (f[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          s.loading ? N("", !0) : (y(), x("div", $_, [
            f[0] || (f[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", M_, M(L(j)(d.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", S_, [...f[2] || (f[2] = [
        G('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", C_, [
        l.value ? (y(), x("section", D_, [
          J(Ts, {
            data: h.value,
            options: g.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", A_, [...f[3] || (f[3] = [
          G('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), B_ = /* @__PURE__ */ et(T_, [["__scopeId", "data-v-216eadc2"]]), F_ = { class: "guardrails-card" }, L_ = { class: "card-header" }, P_ = { class: "header-content" }, E_ = {
  key: 0,
  class: "total-badge"
}, R_ = { class: "badge-value" }, O_ = {
  key: 0,
  class: "loading-state"
}, I_ = {
  key: 1,
  class: "card-body"
}, z_ = { class: "summary-card" }, N_ = { class: "summary-items" }, W_ = { class: "summary-item" }, V_ = { class: "summary-value" }, H_ = { class: "summary-pct" }, j_ = { class: "summary-item" }, Y_ = { class: "summary-pct" }, q_ = { class: "summary-item" }, U_ = { class: "summary-value" }, K_ = { class: "summary-pct" }, X_ = {
  key: 0,
  class: "table-section"
}, G_ = { class: "table-wrapper" }, Z_ = { class: "data-table" }, Q_ = { class: "table-body" }, J_ = { class: "table-cell font-medium text-center" }, ty = { class: "table-cell text-center font-semibold" }, ey = { class: "table-cell" }, sy = { class: "type-badges-row" }, ay = {
  key: 1,
  class: "empty-state"
}, Js = 3, ny = /* @__PURE__ */ at({
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
    }, { isDark: i } = rt(it(a, "theme")), r = D(
      () => a.data?.items && a.data.items.length > 0
    ), l = D(
      () => (a.data?.items || []).reduce((v, m) => v + m.count, 0)
    ), d = (v) => {
      const m = {};
      for (const w of a.data?.items || [])
        m[w[v]] = (m[w[v]] || 0) + w.count;
      const $ = Object.entries(m).sort((w, S) => S[1] - w[1]);
      if ($.length === 0) return { name: "—", pct: 0 };
      const k = l.value;
      return {
        name: $[0][0],
        pct: k > 0 ? Math.round($[0][1] / k * 100) : 0
      };
    }, u = D(() => d("guardrail_type")), h = D(() => d("guardrail_action")), g = D(() => d("guardrail_source")), p = D(() => {
      const v = {};
      for (const m of a.data?.items || [])
        v[m.date] || (v[m.date] = {}), v[m.date][m.guardrail_type] = (v[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(v).map(([m, $]) => ({
        date: m,
        total: Object.values($).reduce((k, w) => k + w, 0),
        types: Object.entries($).map(([k, w]) => ({ type: k, count: w })).sort((k, w) => w.count - k.count)
      })).sort((m, $) => new Date(m.date).getTime() - new Date($.date).getTime());
    }), f = ot(!1), _ = D(() => f.value ? p.value : p.value.slice(0, Js)), b = D(() => p.value.length > Js);
    return t({ isDark: i }), (v, m) => (y(), x("article", F_, [
      c("header", L_, [
        c("div", P_, [
          m[2] || (m[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          a.loading ? N("", !0) : (y(), x("div", E_, [
            m[1] || (m[1] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", R_, M(L(j)(l.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", O_, [...m[3] || (m[3] = [
        G('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", I_, [
        r.value ? (y(), x(K, { key: 0 }, [
          c("div", z_, [
            c("div", N_, [
              c("div", W_, [
                m[4] || (m[4] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", V_, M(u.value.name), 1),
                c("span", H_, "(" + M(u.value.pct) + "%)", 1)
              ]),
              m[7] || (m[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", j_, [
                m[5] || (m[5] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: Mt(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, M(h.value.name), 3),
                c("span", Y_, "(" + M(h.value.pct) + "%)", 1)
              ]),
              m[8] || (m[8] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", q_, [
                m[6] || (m[6] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", U_, M(g.value.name), 1),
                c("span", K_, "(" + M(g.value.pct) + "%)", 1)
              ])
            ])
          ]),
          p.value.length > 0 ? (y(), x("section", X_, [
            m[11] || (m[11] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", G_, [
              c("table", Z_, [
                m[9] || (m[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", Q_, [
                  (y(!0), x(K, null, Q(_.value, ($) => (y(), x("tr", {
                    key: $.date,
                    class: "table-row"
                  }, [
                    c("td", J_, M(L(At)($.date).format("DD/MM")), 1),
                    c("td", ty, M(L(j)($.total)), 1),
                    c("td", ey, [
                      c("div", sy, [
                        (y(!0), x(K, null, Q($.types, (k) => (y(), x("span", {
                          key: k.type,
                          class: "type-count-badge"
                        }, M(k.type) + " (" + M(k.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            b.value ? (y(), x("button", {
              key: 0,
              class: "view-more-btn",
              onClick: m[0] || (m[0] = ($) => f.value = !f.value)
            }, [
              $t(M(f.value ? "View less" : `View more (${p.value.length - Js} more rows)`) + " ", 1),
              (y(), x("svg", {
                class: Mt(["view-more-icon", { "view-more-icon-rotated": f.value }]),
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
            ])) : N("", !0),
            e.enableExport ? (y(), ht(L(mt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : N("", !0)
          ])) : N("", !0)
        ], 64)) : (y(), x("section", ay, [...m[12] || (m[12] = [
          G('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), oy = /* @__PURE__ */ et(ny, [["__scopeId", "data-v-02a2e95e"]]), iy = { class: "dn-metrics-card" }, ry = { class: "card-header" }, ly = { class: "header-content" }, cy = {
  key: 0,
  class: "total-docs-badge"
}, dy = { class: "badge-value" }, uy = {
  key: 0,
  class: "loading-state"
}, hy = {
  key: 1,
  class: "card-body"
}, fy = { class: "kpi-grid" }, gy = { class: "kpi-card kpi-neutral" }, py = { class: "kpi-value" }, vy = { class: "kpi-card kpi-success" }, by = { class: "kpi-value kpi-value-success" }, my = { class: "kpi-pct" }, _y = { class: "kpi-card kpi-danger" }, yy = { class: "kpi-value kpi-value-error" }, xy = { class: "kpi-pct" }, ky = { class: "kpi-card kpi-warning" }, wy = { class: "kpi-value kpi-value-reason" }, $y = { class: "kpi-pct" }, My = { class: "chart-section" }, Sy = { class: "chart-wrapper" }, Cy = {
  key: 1,
  class: "empty-chart"
}, Dy = {
  key: 0,
  class: "table-section"
}, Ay = { class: "table-wrapper" }, Ty = { class: "data-table" }, By = { class: "table-body" }, Fy = { class: "table-cell text-left font-medium" }, Ly = { class: "table-cell text-center font-semibold" }, Py = { class: "table-cell text-center" }, Ey = { class: "impact-bar-container" }, Ry = { class: "impact-label" }, Oy = {
  key: 1,
  class: "chart-section"
}, Iy = { class: "chart-wrapper" }, zy = { class: "system-health" }, Ny = { class: "system-health-content" }, Wy = { class: "sys-kpi-grid" }, Vy = { class: "sys-kpi" }, Hy = { class: "sys-value" }, jy = { class: "sys-kpi" }, Yy = { class: "sys-value" }, qy = { class: "sys-kpi" }, Uy = { class: "sys-value sys-error" }, Ky = { class: "sys-kpi" }, Xy = { class: "sys-value" }, Gy = { class: "sys-kpi" }, Zy = { class: "sys-value" }, Qy = { class: "sys-kpi" }, Jy = { class: "sys-value sys-error" }, t2 = {
  key: 1,
  class: "empty-state"
}, e2 = /* @__PURE__ */ at({
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
    const a = e, n = s, o = (k) => {
      n("export", k);
    }, { isDark: i, colors: r } = rt(it(a, "theme")), l = D(() => {
      const k = a.data?.documentCounts?.items || [], w = a.data?.processingCounts?.items || [];
      return k.length > 0 || w.length > 0;
    }), d = D(() => {
      const k = a.data?.documentCounts?.items || [];
      return {
        processing_started: k.reduce((w, S) => w + S.processing_started, 0),
        processing_completed: k.reduce((w, S) => w + S.processing_completed, 0),
        processing_failed: k.reduce((w, S) => w + S.processing_failed, 0),
        row_count_total: k.reduce((w, S) => w + S.row_count_total, 0)
      };
    }), u = D(() => {
      const k = a.data?.processingCounts?.items || [];
      return {
        processing_started: k.reduce((w, S) => w + S.processing_started, 0),
        processing_success: k.reduce((w, S) => w + S.processing_success, 0),
        notification_sent: k.reduce((w, S) => w + S.notification_sent, 0),
        notification_failed: k.reduce((w, S) => w + S.notification_failed, 0),
        dq_phone: k.reduce((w, S) => w + S.dq_error_phone_not_found, 0),
        dq_flight: k.reduce((w, S) => w + S.dq_error_flight_not_found, 0),
        dq_booking: k.reduce((w, S) => w + S.dq_error_booking_not_found, 0),
        dq_other: k.reduce((w, S) => w + S.dq_error_other, 0),
        totalDqErrors: k.reduce((w, S) => w + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = D(() => d.value.row_count_total || u.value.processing_started), g = D(() => Math.max(0, h.value - u.value.notification_sent)), p = (k, w) => w ? `${Math.round(k / w * 100)}%` : "0%", f = D(() => {
      const k = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((w) => w.count > 0).sort((w, S) => S.count - w.count);
      return k.length > 0 ? k[0] : { reason: "None", count: 0 };
    }), _ = D(() => {
      const k = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((w) => ({
        ...w,
        impactPct: k > 0 ? Math.round(w.count / k * 100) : 0
      }));
    }), b = D(() => {
      const k = h.value, w = u.value.processing_success, S = Math.max(0, w - u.value.totalDqErrors), C = u.value.notification_sent, T = Math.max(0, k - w), P = u.value.totalDqErrors, V = Math.max(0, S - C), R = (A, F) => {
        const E = F > 0 ? Math.round(A / F * 100) : 0;
        return `${A.toLocaleString()} (${E}%)`;
      }, W = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], q = [];
      return w > 0 && q.push({ source: "Records Detected", target: "Valid Reservations", value: w, label: R(w, k) }), T > 0 && q.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: R(T, k) }), S > 0 && q.push({ source: "Valid Reservations", target: "Contactable", value: S, label: R(S, k) }), P > 0 && q.push({ source: "Valid Reservations", target: "Data Quality Issues", value: P, label: R(P, k) }), C > 0 && q.push({ source: "Contactable", target: "Notified", value: C, label: R(C, k) }), V > 0 && q.push({ source: "Contactable", target: "Not Delivered", value: V, label: R(V, k) }), { nodes: W, links: q };
    }), v = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, m = D(() => {
      const k = [...a.data?.processingCounts?.items || []].sort(
        (R, W) => new Date(R.date).getTime() - new Date(W.date).getTime()
      ), w = a.data?.documentCounts?.items || [], S = {};
      for (const R of w)
        S[R.date] = (S[R.date] || 0) + R.row_count_total;
      const C = [.../* @__PURE__ */ new Set([...k.map((R) => R.date), ...w.map((R) => R.date)])].sort(), T = C.map((R) => At(R).format("MMM DD")), P = C.map((R) => {
        const W = k.find((F) => F.date === R), q = W?.notification_sent || 0, A = S[R] || W?.processing_started || 0;
        return A > 0 ? Math.round(q / A * 100) : 0;
      }), V = C.map((R) => k.find((q) => q.date === R)?.notification_sent || 0);
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
            data: V,
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
    }), $ = D(() => ({
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
    return t({ isDark: i }), (k, w) => (y(), x("article", iy, [
      c("header", ry, [
        c("div", ly, [
          w[1] || (w[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          a.loading ? N("", !0) : (y(), x("div", cy, [
            w[0] || (w[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", dy, M(L(j)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", uy, [...w[2] || (w[2] = [
        G('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", hy, [
        l.value ? (y(), x(K, { key: 0 }, [
          c("div", fy, [
            c("div", gy, [
              w[3] || (w[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", py, M(L(j)(h.value)), 1)
            ]),
            c("div", vy, [
              w[4] || (w[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", by, M(L(j)(u.value.notification_sent)), 1),
              c("span", my, M(p(u.value.notification_sent, h.value)), 1)
            ]),
            c("div", _y, [
              w[5] || (w[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", yy, M(L(j)(g.value)), 1),
              c("span", xy, M(p(g.value, h.value)), 1)
            ]),
            c("div", ky, [
              w[6] || (w[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", wy, M(f.value.reason), 1),
              c("span", $y, M(L(j)(f.value.count)) + " cases", 1)
            ])
          ]),
          c("section", My, [
            w[8] || (w[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", Sy, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (y(), ht(ce, {
                key: 0,
                data: b.value,
                "node-colors": v,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", Cy, [...w[7] || (w[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          _.value.length > 0 ? (y(), x("section", Dy, [
            w[10] || (w[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", Ay, [
              c("table", Ty, [
                w[9] || (w[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", By, [
                  (y(!0), x(K, null, Q(_.value, (S) => (y(), x("tr", {
                    key: S.reason,
                    class: "table-row"
                  }, [
                    c("td", Fy, M(S.reason), 1),
                    c("td", Ly, M(L(j)(S.count)), 1),
                    c("td", Py, [
                      c("div", Ey, [
                        c("div", {
                          class: "impact-bar",
                          style: xt({ width: S.impactPct + "%" })
                        }, null, 4),
                        c("span", Ry, M(S.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : N("", !0),
          m.value.labels.length > 0 ? (y(), x("section", Oy, [
            w[11] || (w[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", Iy, [
              J(le, {
                data: m.value,
                options: $.value
              }, null, 8, ["data", "options"])
            ])
          ])) : N("", !0),
          c("details", zy, [
            w[18] || (w[18] = c("summary", { class: "system-health-toggle" }, [
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
              $t(" System Health Details ")
            ], -1)),
            c("div", Ny, [
              c("div", Wy, [
                c("div", Vy, [
                  w[12] || (w[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", Hy, M(L(j)(d.value.processing_started)), 1)
                ]),
                c("div", jy, [
                  w[13] || (w[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", Yy, M(L(j)(d.value.processing_completed)), 1)
                ]),
                c("div", qy, [
                  w[14] || (w[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", Uy, M(L(j)(d.value.processing_failed)), 1)
                ]),
                c("div", Ky, [
                  w[15] || (w[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", Xy, M(L(j)(u.value.processing_started)), 1)
                ]),
                c("div", Gy, [
                  w[16] || (w[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", Zy, M(L(j)(u.value.processing_success)), 1)
                ]),
                c("div", Qy, [
                  w[17] || (w[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", Jy, M(L(j)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ], 64)) : (y(), x("section", t2, [...w[19] || (w[19] = [
          G('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), s2 = /* @__PURE__ */ et(e2, [["__scopeId", "data-v-d8baf32c"]]), a2 = { class: "nps-daily-card" }, n2 = { class: "card-header" }, o2 = { class: "header-content" }, i2 = {
  key: 0,
  class: "stats-badge"
}, r2 = { class: "badge-value" }, l2 = {
  key: 0,
  class: "loading-state"
}, c2 = {
  key: 1,
  class: "card-body"
}, d2 = { class: "tooltip-content" }, u2 = { class: "tooltip-title" }, h2 = { class: "tooltip-stats" }, f2 = { class: "tooltip-stat-row" }, g2 = { class: "tooltip-value" }, p2 = { class: "tooltip-stat-row" }, v2 = { class: "tooltip-value" }, b2 = { class: "tooltip-stat-row" }, m2 = { class: "tooltip-value" }, _2 = { class: "tooltip-stat-row" }, y2 = { class: "tooltip-value" }, x2 = { class: "tooltip-stat-row" }, k2 = { class: "tooltip-value" }, w2 = { class: "tooltip-stat-row" }, $2 = { class: "tooltip-value" }, M2 = {
  key: 2,
  class: "empty-state"
}, eo = 400, Ee = 60, so = 90, ao = 120, S2 = {
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
    }, o = e, { isDark: i } = rt(it(o, "theme")), r = D(() => o.data), l = ot(null), d = ot({
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
      return Math.max(800, Ee * 2 + b * ao);
    }), h = (b, v) => {
      const $ = (b - 1) / 9;
      return Ee + v - $ * v;
    }, g = (b) => b ? At(b).format("DD-MM-YYYY") : "", p = D(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const b = [], v = eo - Ee - so;
      return r.value.nps_by_day.forEach((m, $) => {
        const k = m.min_score || 0, w = m.q1_score || 0, S = m.median_score || 0, C = m.q3_score || 0, T = m.max_score || 0, P = m.average_score || 0;
        b.push({
          label: g(m.date),
          responseCount: m.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: w,
          median: S,
          q3: C,
          high: T,
          average: P,
          highY: h(T, v),
          lowY: h(k, v),
          q1Y: h(w, v),
          q3Y: h(C, v),
          medianY: h(S, v),
          averageY: P > 0 ? h(P, v) : null,
          centerX: Ee + ($ + 1) * ao
        });
      }), b;
    }), f = (b, v) => {
      if (!l.value || !v || v.horizontal) return;
      const m = l.value.getBoundingClientRect(), $ = b.clientX, k = b.clientY, w = 140, S = 160, C = 10, T = 15;
      let P = $ - m.left - w / 2, V = k - m.top - S - T;
      P = Math.max(C, Math.min(P, m.width - w - C)), V < C && (V = k - m.top + T), V = Math.max(C, Math.min(V, m.height - S - C)), d.value = {
        visible: !0,
        x: P,
        y: V,
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
    return t({ isDark: i }), (b, v) => (y(), x("article", a2, [
      c("header", n2, [
        c("div", o2, [
          v[1] || (v[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", i2, [
            v[0] || (v[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", r2, M(r.value.nps_by_day.length), 1)
          ])) : N("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", l2, [...v[2] || (v[2] = [
        G('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", c2, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          p.value && p.value.length > 0 ? (y(), ht(ri, {
            key: 0,
            "candlestick-data": p.value,
            "chart-width": u.value,
            "chart-height": eo,
            "chart-margin": Ee,
            "chart-bottom-margin": so,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: f,
            onCandleLeave: _
          }, null, 8, ["candlestick-data", "chart-width"])) : N("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: xt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", d2, [
              c("div", u2, M(d.value.date), 1),
              v[9] || (v[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", h2, [
                c("div", f2, [
                  v[3] || (v[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", g2, M(d.value.min), 1)
                ]),
                c("div", p2, [
                  v[4] || (v[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", v2, M(d.value.q1), 1)
                ]),
                c("div", b2, [
                  v[5] || (v[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", m2, M(d.value.median), 1)
                ]),
                c("div", _2, [
                  v[6] || (v[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", y2, M(d.value.avg), 1)
                ]),
                c("div", x2, [
                  v[7] || (v[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", k2, M(d.value.q3), 1)
                ]),
                c("div", w2, [
                  v[8] || (v[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", $2, M(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : N("", !0)
        ], 512),
        e.enableExport ? (y(), ht(L(mt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : N("", !0)
      ])) : (y(), x("div", M2, [...v[10] || (v[10] = [
        G('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, ci = /* @__PURE__ */ et(S2, [["__scopeId", "data-v-b20112a7"]]), C2 = { class: "nps-overview-card" }, D2 = { class: "card-header" }, A2 = { class: "header-content" }, T2 = { class: "header-badges" }, B2 = {
  key: 0,
  class: "stats-badge"
}, F2 = { class: "badge-value" }, L2 = {
  key: 1,
  class: "stats-badge"
}, P2 = { class: "badge-value" }, E2 = {
  key: 0,
  class: "loading-state"
}, R2 = {
  key: 1,
  class: "card-body"
}, O2 = { class: "chart-wrapper" }, I2 = {
  key: 2,
  class: "empty-state"
}, z2 = 500, N2 = 60, W2 = 80, V2 = {
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
    }, o = e, { isDark: i } = rt(it(o, "theme")), r = D(() => o.data), l = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", C2, [
      c("header", D2, [
        c("div", A2, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", T2, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", B2, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", F2, M(r.value.total_nps_responses), 1)
            ])) : N("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", L2, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", P2, M(r.value.p95_score || 0), 1)
            ])) : N("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", E2, [...u[3] || (u[3] = [
        G('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", R2, [
        c("div", O2, [
          J(li, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": z2,
            "chart-margin": N2,
            "chart-bottom-margin": W2
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), ht(L(mt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : N("", !0)
      ])) : (y(), x("div", I2, [...u[4] || (u[4] = [
        G('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, di = /* @__PURE__ */ et(V2, [["__scopeId", "data-v-30fe5f88"]]), H2 = { class: "nps-metrics-container" }, j2 = {
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
    return (n, o) => (y(), x("div", H2, [
      J(di, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      J(ci, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Y2 = /* @__PURE__ */ et(j2, [["__scopeId", "data-v-25fe3b80"]]), q2 = { class: "aws-cost-card" }, U2 = { class: "card-header" }, K2 = { class: "header-main" }, X2 = { class: "header-content" }, G2 = { class: "card-title" }, Z2 = { class: "header-stats" }, Q2 = { class: "stat-badge primary" }, J2 = { class: "stat-value" }, tx = { class: "stat-badge secondary" }, ex = { class: "stat-value" }, sx = { class: "card-body" }, ax = {
  key: 0,
  class: "loading-state"
}, nx = {
  key: 1,
  class: "chart-section"
}, ox = { class: "chart-container" }, ix = {
  key: 2,
  class: "empty-state"
}, rx = { class: "empty-state-content" }, lx = { class: "empty-icon-wrapper" }, cx = {
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
    const t = e, { isDark: s, colors: a } = rt(it(t, "theme")), n = D(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, u = Array.isArray(l) && l.length > 0, h = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let g = [];
      return u ? g = l : h && (g = d.map((p, f) => ({
        date: p,
        allocated_cost: r.allocatedCostSeries[f] ?? 0,
        aws_cost: r.awsCostSeries[f] ?? 0,
        airline_conversations: r.airlineConversationsSeries[f] ?? 0
      }))), {
        daily: g,
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
    return (r, l) => (y(), x("article", q2, [
      c("header", U2, [
        c("div", K2, [
          c("div", X2, [
            c("h3", G2, M(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", Z2, [
            c("div", Q2, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", J2, M(L(lt)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", tx, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", ex, M(L(lt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", sx, [
        e.loading ? (y(), x("div", ax, [...l[3] || (l[3] = [
          G('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", nx, [
          c("div", ox, [
            J(le, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", ix, [
          c("div", rx, [
            c("div", lx, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, dx = /* @__PURE__ */ et(cx, [["__scopeId", "data-v-c023bd59"]]), ux = { class: "cost-usage-card" }, hx = {
  key: 0,
  class: "card-body"
}, fx = {
  key: 0,
  class: "chart-section"
}, gx = { class: "chart-container" }, px = { class: "kpi-grid" }, vx = { class: "kpi-card" }, bx = { class: "kpi-value" }, mx = { class: "kpi-card" }, _x = { class: "kpi-value" }, yx = { class: "kpi-card" }, xx = { class: "kpi-value" }, kx = { class: "kpi-card" }, wx = { class: "kpi-value" }, $x = { class: "kpi-card" }, Mx = { class: "kpi-value" }, Sx = { class: "kpi-card highlighted" }, Cx = { class: "kpi-value gradient-text" }, Dx = {
  key: 1,
  class: "empty-state"
}, Ax = { class: "empty-state-content" }, Tx = { class: "empty-icon-wrapper" }, Bx = {
  key: 1,
  class: "loading-state"
}, Fx = /* @__PURE__ */ at({
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
    const a = e, { isDark: n, colors: o } = rt(it(a, "theme")), i = (f) => {
      const _ = new Date(f), b = String(_.getDate()).padStart(2, "0"), v = String(_.getMonth() + 1).padStart(2, "0");
      return `${b}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.input_cost || 0), 0);
    }), d = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.output_cost || 0), 0);
    }), u = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.cache_read_cost || 0), 0);
    }), h = D(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.cache_write_cost || 0), 0);
    }), g = D(() => {
      const f = a.data?.costs_by_day || {}, _ = Object.keys(f).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const b = _.map((m) => i(m)), v = [
        {
          label: "Input Cost",
          data: _.map((m) => f[m]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: _.map((m) => f[m]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: _.map((m) => f[m]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: _.map((m) => f[m]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: v
      };
    }), p = D(() => a.options ? a.options : {
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
            label: function(f) {
              let _ = f.dataset.label || "";
              return _ && (_ += ": "), f.parsed.y !== null && (_ += lt(f.parsed.y)), _;
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
            callback: function(f) {
              return lt(f);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, _) => (y(), x("article", ux, [
      _[9] || (_[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Bx, [..._[8] || (_[8] = [
        G('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", hx, [
        g.value.labels && g.value.labels.length ? (y(), x("section", fx, [
          c("div", gx, [
            J(ee, {
              data: g.value,
              options: p.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", px, [
            c("div", vx, [
              _[0] || (_[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", bx, M(L(lt)(e.data.total_cost)), 1)
            ]),
            c("div", mx, [
              _[1] || (_[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", _x, M(L(lt)(l.value)), 1)
            ]),
            c("div", yx, [
              _[2] || (_[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", xx, M(L(lt)(d.value)), 1)
            ]),
            c("div", kx, [
              _[3] || (_[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", wx, M(L(lt)(u.value)), 1)
            ]),
            c("div", $x, [
              _[4] || (_[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", Mx, M(L(lt)(h.value)), 1)
            ]),
            c("div", Sx, [
              _[5] || (_[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", Cx, M(L(lt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", Dx, [
          c("div", Ax, [
            c("div", Tx, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            _[6] || (_[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            _[7] || (_[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Lx = /* @__PURE__ */ et(Fx, [["__scopeId", "data-v-62f96954"]]), Px = { class: "token-usage-card" }, Ex = {
  key: 0,
  class: "card-body"
}, Rx = {
  key: 0,
  class: "chart-section"
}, Ox = { class: "chart-container" }, Ix = { class: "kpi-grid" }, zx = { class: "kpi-card" }, Nx = { class: "kpi-value" }, Wx = { class: "kpi-card" }, Vx = { class: "kpi-value" }, Hx = { class: "kpi-card" }, jx = { class: "kpi-value" }, Yx = { class: "kpi-card" }, qx = { class: "kpi-value" }, Ux = { class: "kpi-card" }, Kx = { class: "kpi-value" }, Xx = {
  key: 1,
  class: "empty-state"
}, Gx = { class: "empty-state-content" }, Zx = { class: "empty-icon-wrapper" }, Qx = {
  key: 1,
  class: "loading-state"
}, Jx = /* @__PURE__ */ at({
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
    const a = e, { isDark: n, colors: o } = rt(it(a, "theme")), i = (u) => {
      const h = new Date(u), g = String(h.getDate()).padStart(2, "0"), p = String(h.getMonth() + 1).padStart(2, "0");
      return `${g}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((f) => i(f)), p = [
        {
          label: "Input Tokens",
          data: h.map((f) => u[f]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => u[f]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => u[f]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => u[f]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: g,
        datasets: p
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
    return t({ isDark: n }), (u, h) => (y(), x("article", Px, [
      h[8] || (h[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Qx, [...h[7] || (h[7] = [
        G('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ex, [
        l.value.labels && l.value.labels.length ? (y(), x("section", Rx, [
          c("div", Ox, [
            J(ee, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Ix, [
            c("div", zx, [
              h[0] || (h[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", Nx, M(L(j)(e.data.total_tokens)), 1)
            ]),
            c("div", Wx, [
              h[1] || (h[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", Vx, M(L(j)(e.data.total_input_tokens)), 1)
            ]),
            c("div", Hx, [
              h[2] || (h[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", jx, M(L(j)(e.data.total_output_tokens)), 1)
            ]),
            c("div", Yx, [
              h[3] || (h[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", qx, M(L(j)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", Ux, [
              h[4] || (h[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", Kx, M(L(j)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", Xx, [
          c("div", Gx, [
            c("div", Zx, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), tk = /* @__PURE__ */ et(Jx, [["__scopeId", "data-v-e9e355be"]]), ek = { class: "conversation-count-card" }, sk = { class: "card-header" }, ak = { class: "header-right" }, nk = { class: "stat-badge" }, ok = { class: "stat-value" }, ik = {
  key: 0,
  class: "card-body"
}, rk = {
  key: 0,
  class: "chart-section"
}, lk = { class: "chart-container" }, ck = {
  key: 1,
  class: "empty-state"
}, dk = { class: "empty-state-content" }, uk = { class: "empty-icon-wrapper" }, hk = {
  key: 1,
  class: "loading-state"
}, fk = /* @__PURE__ */ at({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(it(s, "theme")), o = (l) => {
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
      const u = d.map((g) => o(g)), h = [
        {
          label: "Conversations",
          data: d.map((g) => l[g] || 0),
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
    return t({ isDark: a }), (l, d) => (y(), x("article", ek, [
      c("header", sk, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", ak, [
          c("div", nk, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", ok, M(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", hk, [...d[4] || (d[4] = [
        G('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", ik, [
        i.value.labels && i.value.labels.length ? (y(), x("section", rk, [
          c("div", lk, [
            J(le, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", ck, [
          c("div", dk, [
            c("div", uk, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), gk = /* @__PURE__ */ et(fk, [["__scopeId", "data-v-846f24b1"]]), pk = { class: "top-agents-card" }, vk = {
  key: 0,
  class: "card-body"
}, bk = {
  key: 0,
  class: "charts-grid"
}, mk = { class: "chart-section" }, _k = { class: "chart-container" }, yk = { class: "chart-section" }, xk = { class: "chart-container" }, kk = {
  key: 1,
  class: "empty-state"
}, wk = { class: "empty-state-content" }, $k = { class: "empty-icon-wrapper" }, Mk = {
  key: 1,
  class: "loading-state"
}, Sk = /* @__PURE__ */ at({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(it(s, "theme")), o = D(() => s.data?.top_agents && s.data.top_agents.length > 0), i = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((g, p) => (p.total_cost || 0) - (g.total_cost || 0)) : []), r = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((g, p) => (p.total_tokens || 0) - (g.total_tokens || 0)) : []), l = D(() => {
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
    }), d = D(() => {
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const p = g.label, f = s.data?.top_agents?.find((_) => _.agent_type === p);
              return f ? [
                `Total Cost: ${lt(f.total_cost)}`,
                `Input Cost: ${lt(f.total_input_tokens_cost)}`,
                `Output Cost: ${lt(f.total_output_tokens_cost)}`,
                `Cache Read: ${lt(f.total_read_tokens_cost)}`,
                `Cache Write: ${lt(f.total_write_tokens_cost)}`
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
            callback: function(g) {
              return lt(g);
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const p = g.label, f = s.data?.top_agents?.find((_) => _.agent_type === p);
              return f ? [
                `Total Tokens: ${f.total_tokens.toLocaleString()}`,
                `Input Tokens: ${f.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${f.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${f.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${f.total_write_tokens.toLocaleString()}`
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
            callback: function(g) {
              return g.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (g, p) => (y(), x("article", pk, [
      p[5] || (p[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Mk, [...p[4] || (p[4] = [
        G('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", vk, [
        o.value ? (y(), x("div", bk, [
          c("section", mk, [
            p[0] || (p[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", _k, [
              J(ee, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", yk, [
            p[1] || (p[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", xk, [
              J(ee, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", kk, [
          c("div", wk, [
            c("div", $k, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            p[2] || (p[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[3] || (p[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ck = /* @__PURE__ */ et(Sk, [["__scopeId", "data-v-78efa6dc"]]), Dk = { class: "top-agents-card" }, Ak = {
  key: 0,
  class: "card-body"
}, Tk = {
  key: 0,
  class: "chart-section"
}, Bk = { class: "chart-container" }, Fk = {
  key: 1,
  class: "empty-state"
}, Lk = { class: "empty-state-content" }, Pk = { class: "empty-icon-wrapper" }, Ek = {
  key: 1,
  class: "loading-state"
}, Rk = /* @__PURE__ */ at({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(it(s, "theme")), o = {
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
    ) : []), r = D(() => i.value.length > 0), l = D(() => i.value.reduce((h, g) => h + (g.conversations || 0), 0)), d = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((_) => {
        const b = _.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), p = h.map((_) => {
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
            backgroundColor: g,
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
              const g = (h.label || "").toString(), p = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((b, v) => b + (Number(v) || 0), 0), _ = f ? p / f * 100 : 0;
              return `${g}: ${p.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, g) => (y(), x("article", Dk, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Ek, [...g[2] || (g[2] = [
        G('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ak, [
        r.value ? (y(), x("section", Tk, [
          c("div", Bk, [
            J(Ts, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Fk, [
          c("div", Lk, [
            c("div", Pk, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            g[1] || (g[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ok = /* @__PURE__ */ et(Rk, [["__scopeId", "data-v-05e3e74d"]]), Ik = { class: "daily-cost-trends-card" }, zk = {
  key: 0,
  class: "card-body"
}, Nk = {
  key: 0,
  class: "chart-section"
}, Wk = { class: "chart-container" }, Vk = {
  key: 1,
  class: "empty-state"
}, Hk = { class: "empty-state-content" }, jk = { class: "empty-icon-wrapper" }, Yk = {
  key: 1,
  class: "loading-state"
}, qk = /* @__PURE__ */ at({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = rt(it(s, "theme")), o = (d) => {
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
      const u = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {}, p = Object.keys(u).filter((b) => h[b]).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const f = p.map((b) => o(b)), _ = p.map((b) => {
        const v = u[b]?.total_cost || 0, m = h[b] || 0;
        return m > 0 ? v / m : 0;
      });
      return {
        labels: f,
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
    return t({ isDark: a }), (d, u) => (y(), x("article", Ik, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Yk, [...u[2] || (u[2] = [
        G('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", zk, [
        i.value ? (y(), x("section", Nk, [
          c("div", Wk, [
            J(le, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Vk, [
          c("div", Hk, [
            c("div", jk, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Uk = /* @__PURE__ */ et(qk, [["__scopeId", "data-v-e5bac1c5"]]), Kk = { class: "model-usage-card" }, Xk = {
  key: 0,
  class: "loading-state"
}, Gk = {
  key: 1,
  class: "card-body"
}, Zk = { class: "tabs-container" }, Qk = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, Jk = ["aria-selected"], t5 = ["aria-selected"], e5 = {
  key: 0,
  class: "table-section"
}, s5 = { class: "table-wrapper" }, a5 = { class: "data-table" }, n5 = { class: "table-header-row" }, o5 = { class: "table-header" }, i5 = { class: "table-body" }, r5 = { class: "table-cell name-cell" }, l5 = { class: "table-cell text-center" }, c5 = { class: "table-cell text-center" }, d5 = { class: "table-cell text-center" }, u5 = { class: "table-cell text-center cost-cell" }, h5 = { class: "table-cell text-center" }, f5 = {
  key: 1,
  class: "empty-state"
}, g5 = { class: "empty-state-content" }, p5 = { class: "empty-icon-wrapper" }, v5 = /* @__PURE__ */ at({
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
    }, { isDark: i } = rt(it(a, "theme")), r = ot("by_model"), l = D(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = (h) => h == null ? "0" : j(h), u = (h) => h == null ? "$0.00" : lt(h);
    return t({ isDark: i }), (h, g) => (y(), x("article", Kk, [
      g[10] || (g[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Xk, [...g[2] || (g[2] = [
        G('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", Gk, [
        c("div", Zk, [
          c("nav", Qk, [
            c("button", {
              onClick: g[0] || (g[0] = (p) => r.value = "by_model"),
              class: Mt(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, Jk),
            c("button", {
              onClick: g[1] || (g[1] = (p) => r.value = "by_provider"),
              class: Mt(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, t5)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", e5, [
          c("div", s5, [
            c("table", a5, [
              c("thead", null, [
                c("tr", n5, [
                  c("th", o5, M(r.value === "by_model" ? "Model" : "Provider"), 1),
                  g[3] || (g[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  g[4] || (g[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  g[5] || (g[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  g[6] || (g[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  g[7] || (g[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", i5, [
                (y(!0), x(K, null, Q(l.value, (p, f) => (y(), x("tr", {
                  key: f,
                  class: "table-row"
                }, [
                  c("td", r5, M(f), 1),
                  c("td", l5, M(u(p.avg_cost_per_message)), 1),
                  c("td", c5, M(d(p.avg_tokens_per_message)), 1),
                  c("td", d5, M(d(p.message_count)), 1),
                  c("td", u5, M(u(p.total_cost)), 1),
                  c("td", h5, M(d(p.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", f5, [
          c("div", g5, [
            c("div", p5, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            g[8] || (g[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            g[9] || (g[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), b5 = /* @__PURE__ */ et(v5, [["__scopeId", "data-v-a7bf2d7b"]]), m5 = { class: "message-roles-card" }, _5 = {
  key: 0,
  class: "loading-state"
}, y5 = {
  key: 1,
  class: "card-body"
}, x5 = {
  key: 0,
  class: "table-section"
}, k5 = { class: "table-wrapper" }, w5 = { class: "data-table" }, $5 = { class: "table-body" }, M5 = { class: "table-cell name-cell" }, S5 = { class: "table-cell text-center" }, C5 = { class: "table-cell text-center" }, D5 = { class: "table-cell text-center" }, A5 = { class: "table-cell text-center cost-cell" }, T5 = { class: "table-cell text-center" }, B5 = {
  key: 1,
  class: "empty-state"
}, F5 = { class: "empty-state-content" }, L5 = { class: "empty-icon-wrapper" }, P5 = /* @__PURE__ */ at({
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
    const a = e, n = s, o = (p) => {
      n("export", p);
    }, { isDark: i } = rt(it(a, "theme")), r = ["assistant", "system", "user"], l = D(() => a.data?.total_by_role || {}), d = D(() => Object.keys(l.value).length > 0), u = (p) => p == null ? "0" : j(p), h = (p) => p == null ? "$0.00" : lt(p), g = (p) => p.charAt(0).toUpperCase() + p.slice(1);
    return t({ isDark: i }), (p, f) => (y(), x("article", m5, [
      f[4] || (f[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", _5, [...f[0] || (f[0] = [
        G('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", y5, [
        d.value ? (y(), x("div", x5, [
          c("div", k5, [
            c("table", w5, [
              f[1] || (f[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Role"),
                  c("th", { class: "table-header" }, "Avg cost per message"),
                  c("th", { class: "table-header" }, "Avg tokens per message"),
                  c("th", { class: "table-header" }, "Message count"),
                  c("th", { class: "table-header" }, "Total cost"),
                  c("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              c("tbody", $5, [
                (y(), x(K, null, Q(r, (_) => c("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  c("td", M5, M(g(_)), 1),
                  c("td", S5, M(h(l.value[_]?.avg_cost_per_message)), 1),
                  c("td", C5, M(u(l.value[_]?.avg_tokens_per_message)), 1),
                  c("td", D5, M(u(l.value[_]?.message_count)), 1),
                  c("td", A5, M(h(l.value[_]?.total_cost)), 1),
                  c("td", T5, M(u(l.value[_]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", B5, [
          c("div", F5, [
            c("div", L5, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            f[2] || (f[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            f[3] || (f[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), E5 = /* @__PURE__ */ et(P5, [["__scopeId", "data-v-6a953cfc"]]), R5 = { class: "cost-per-conversation-card" }, O5 = {
  key: 0,
  class: "card-body"
}, I5 = {
  key: 0,
  class: "chart-section"
}, z5 = { class: "chart-container" }, N5 = { class: "kpi-grid" }, W5 = { class: "kpi-card" }, V5 = { class: "kpi-value" }, H5 = { class: "kpi-card" }, j5 = { class: "kpi-value" }, Y5 = { class: "kpi-card" }, q5 = { class: "kpi-value" }, U5 = { class: "kpi-card highlighted" }, K5 = { class: "kpi-value gradient-text" }, X5 = {
  key: 1,
  class: "empty-state"
}, G5 = { class: "empty-state-content" }, Z5 = { class: "empty-icon-wrapper" }, Q5 = {
  key: 1,
  class: "loading-state"
}, J5 = /* @__PURE__ */ at({
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
    }, { isDark: i, colors: r } = rt(it(a, "theme")), l = {
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
    }, d = (m) => m.agent_type || m.agent_id || m.agent_name || "", u = (m) => m.agent_name ? m.agent_name : d(m).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (m) => {
      const $ = d(m).toLowerCase();
      for (const [k, w] of Object.entries(l))
        if ($.includes(k))
          return w;
      return "#9ca3af";
    }, g = D(() => [...a.data?.top_agents || []].sort(($, k) => k.avg_cost_per_conversation - $.avg_cost_per_conversation)), p = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : g.value.reduce((m, $) => m + $.conversations, 0)), f = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : g.value.reduce((m, $) => m + $.total_cost, 0)), _ = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : p.value === 0 ? 0 : f.value / p.value), b = D(() => {
      const m = g.value;
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const $ = m.map((S) => u(S)), k = m.map((S) => S.avg_cost_per_conversation), w = m.map((S) => h(S));
      return {
        labels: $,
        datasets: [
          {
            label: "USD per conversation",
            data: k,
            backgroundColor: w.map((S) => `${S}80`),
            borderColor: w,
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
              const $ = g.value[m.dataIndex];
              return [
                `Cost: ${lt(m.parsed.x)}`,
                `Conversations: ${j($.conversations)}`,
                `Total Cost: ${lt($.total_cost)}`
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
              return lt(m);
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
    return t({ isDark: i }), (m, $) => (y(), x("article", R5, [
      $[7] || ($[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Q5, [...$[6] || ($[6] = [
        G('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", O5, [
        b.value.labels && b.value.labels.length ? (y(), x("section", I5, [
          c("div", z5, [
            J(ee, {
              data: b.value,
              options: v.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", N5, [
            c("div", W5, [
              $[0] || ($[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", V5, M(g.value.length), 1)
            ]),
            c("div", H5, [
              $[1] || ($[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", j5, M(L(j)(p.value)), 1)
            ]),
            c("div", Y5, [
              $[2] || ($[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", q5, M(L(lt)(f.value)), 1)
            ]),
            c("div", U5, [
              $[3] || ($[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", K5, M(L(lt)(_.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ht(L(mt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", X5, [
          c("div", G5, [
            c("div", Z5, [
              J(L(Rt), { class: "empty-icon" })
            ]),
            $[4] || ($[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            $[5] || ($[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), tw = /* @__PURE__ */ et(J5, [["__scopeId", "data-v-17f6615c"]]), ew = { class: "tabs text-sm" }, sw = ["aria-label"], aw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], nw = { class: "flex min-h-9 min-w-0 flex-1 items-center justify-center gap-2 px-3 py-1.5" }, ow = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, iw = /* @__PURE__ */ at({
  name: "Tabs",
  __name: "Tabs",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Tabs" }
  },
  emits: ["update:modelValue", "change", "tab-click"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = ot([]), o = `tabs-${Math.random().toString(36).slice(2, 9)}`, i = (f) => `${o}-tab-${f}`, r = D(
      () => s.items.map((f, _) => f.disabled ? -1 : _).filter((f) => f >= 0)
    );
    function l(f) {
      return f.value === s.modelValue;
    }
    function d(f) {
      const _ = l(f), b = "relative flex min-w-0 flex-1 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100";
      return f.disabled ? `${b} cursor-not-allowed opacity-40` : _ ? `${b} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${b} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, _) {
      f === _ || s.items.find((v) => v.value === f)?.disabled || (a("update:modelValue", f), a("change", { value: f, previousValue: _ }));
    }
    function h(f, _) {
      a("tab-click", { value: f.value, originalEvent: _ }), !f.disabled && (u(f.value, s.modelValue), Qt(() => {
        n.value[s.items.indexOf(f)]?.focus();
      }));
    }
    function g(f, _) {
      const b = s.items.length;
      if (b === 0) return 0;
      let v = f;
      for (let m = 0; m < b; m++)
        if (v = (v + _ + b) % b, !s.items[v]?.disabled) return v;
      return f;
    }
    async function p(f, _) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let v = _;
      f.key === "ArrowLeft" ? v = g(_, -1) : f.key === "ArrowRight" ? v = g(_, 1) : f.key === "Home" ? v = r.value[0] ?? 0 : f.key === "End" && (v = r.value[r.value.length - 1] ?? _);
      const m = s.items[v];
      !m || m.disabled || (u(m.value, s.modelValue), await Qt(), n.value[v]?.focus());
    }
    return (f, _) => (y(), x("div", ew, [
      c("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: "flex flex-wrap gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:border-white/[0.06] dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none"
      }, [
        (y(!0), x(K, null, Q(e.items, (b, v) => (y(), x("button", {
          id: i(b.value),
          key: b.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: n,
          type: "button",
          role: "tab",
          "aria-selected": l(b),
          "aria-disabled": b.disabled === !0,
          tabindex: l(b) ? 0 : -1,
          class: Mt(d(b)),
          onClick: (m) => h(b, m),
          onKeydown: (m) => p(m, v)
        }, [
          c("span", nw, [
            b.icon ? (y(), ht(lo(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : N("", !0),
            c("span", ow, M(b.label), 1)
          ])
        ], 42, aw))), 128))
      ], 8, sw),
      f.$slots.default ? (y(), ht(gi, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: pi(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            gs(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : N("", !0)
    ]));
  }
}), rw = /* @__PURE__ */ et(iw, [["__scopeId", "data-v-65add5d0"]]), lw = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-white/[0.06]" }, cw = { class: "overflow-x-auto" }, dw = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, uw = { class: "border-b border-[color:var(--kiut-border-table)] bg-slate-50 dark:bg-[#252528]" }, hw = {
  key: 0,
  scope: "col",
  class: "w-12 px-3 py-3.5 text-center align-middle"
}, fw = ["checked", "aria-label"], gw = {
  key: 0,
  class: "w-12 px-3 py-3.5 text-center align-middle"
}, pw = ["checked", "aria-label", "onChange"], vw = /* @__PURE__ */ at({
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
    const s = e, a = t, n = ot(null);
    function o(m) {
      return `cell-${m}`;
    }
    function i(m) {
      return m === "center" ? "text-center" : m === "right" ? "text-right" : "text-left";
    }
    function r(m, $) {
      if (typeof s.rowKey == "function")
        return s.rowKey(m);
      const k = m[s.rowKey];
      return k != null ? String(k) : `__index_${$}`;
    }
    function l(m, $) {
      return m[$];
    }
    function d(m) {
      return m == null || typeof m == "object" ? "" : String(m);
    }
    function u(m, $) {
      return r(m, $);
    }
    const h = D(() => s.rows.map((m, $) => r(m, $)));
    function g(m, $) {
      const k = r(m, $);
      return s.selectedKeys.includes(k);
    }
    const p = D(() => !s.selectable || s.rows.length === 0 ? !1 : h.value.every((m) => s.selectedKeys.includes(m))), f = D(() => {
      if (!s.selectable || s.rows.length === 0) return !1;
      const m = h.value.filter(($) => s.selectedKeys.includes($));
      return m.length > 0 && m.length < s.rows.length;
    });
    Ht(
      [f, p, () => s.selectable],
      async () => {
        await Qt();
        const m = n.value;
        m && (m.indeterminate = f.value && !p.value);
      },
      { immediate: !0 }
    );
    function _() {
      if (s.selectable)
        if (p.value) {
          const m = s.selectedKeys.filter(($) => !h.value.includes($));
          a("update:selectedKeys", m);
        } else {
          const m = new Set(s.selectedKeys);
          h.value.forEach(($) => m.add($)), a("update:selectedKeys", [...m]);
        }
    }
    function b(m, $) {
      if (!s.selectable) return;
      const k = r(m, $);
      s.selectedKeys.includes(k) ? a(
        "update:selectedKeys",
        s.selectedKeys.filter((S) => S !== k)
      ) : a("update:selectedKeys", [...s.selectedKeys, k]);
    }
    function v(m, $) {
      const k = r(m, $);
      return `${s.ariaLabelSelectRow} ${k}`;
    }
    return (m, $) => (y(), x("div", lw, [
      c("div", cw, [
        c("table", dw, [
          c("thead", null, [
            c("tr", uw, [
              e.selectable ? (y(), x("th", hw, [
                c("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: _
                }, null, 40, fw)
              ])) : N("", !0),
              (y(!0), x(K, null, Q(e.columns, (k) => (y(), x("th", {
                key: k.key,
                scope: "col",
                class: Mt([
                  "px-3 py-3.5 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(k.align),
                  k.headerClass ?? ""
                ])
              }, M(k.label), 3))), 128))
            ])
          ]),
          c("tbody", null, [
            (y(!0), x(K, null, Q(e.rows, (k, w) => (y(), x("tr", {
              key: u(k, w),
              class: "border-b border-[color:var(--kiut-border-table-row)] bg-[color:var(--kiut-bg-table)] transition-colors hover:[background:var(--kiut-bg-table-hover)]"
            }, [
              e.selectable ? (y(), x("td", gw, [
                c("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: g(k, w),
                  "aria-label": v(k, w),
                  onChange: (S) => b(k, w)
                }, null, 40, pw)
              ])) : N("", !0),
              (y(!0), x(K, null, Q(e.columns, (S) => (y(), x("td", {
                key: S.key,
                class: Mt([
                  "px-3 py-3.5 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                gs(m.$slots, o(S.key), {
                  row: k,
                  column: S,
                  value: l(k, S.key)
                }, () => [
                  $t(M(d(l(k, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), bw = /* @__PURE__ */ et(vw, [["__scopeId", "data-v-6d1b5df0"]]);
function mw(e, t) {
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
function _w(e, t) {
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
const yw = ["aria-label"], xw = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, kw = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, ww = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, $w = ["aria-label", "onClick"], Mw = ["aria-label", "onClick"], Sw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Cw = ["aria-label"], Dw = ["aria-label"], Aw = {
  key: 1,
  class: "space-y-2"
}, Tw = ["for"], Bw = ["id", "placeholder", "onKeydown"], Fw = ["for"], Lw = ["id"], Pw = {
  value: "",
  disabled: ""
}, Ew = ["value"], Rw = { class: "text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Ow = { class: "flex flex-wrap items-end gap-2" }, Iw = { class: "min-w-[120px] flex-1" }, zw = ["for"], Nw = ["id"], Ww = { class: "min-w-[120px] flex-1" }, Vw = ["for"], Hw = ["id"], jw = /* @__PURE__ */ at({
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
    const s = e, a = t, n = vi(), i = `${`kiut-filters-${Math.random().toString(36).slice(2, 9)}`}-panel`, r = ot(null), l = /* @__PURE__ */ new Map(), d = ot(null), u = ot(!1), h = ot({}), g = ot(null), p = ot(""), f = ot(""), _ = ot(""), b = ot(""), v = D(() => d.value ? s.filterDefinitions.find((B) => B.id === d.value) ?? null : null), m = D(() => {
      const B = v.value;
      if (B)
        return B.type === "text" ? p.value : B.type === "select" ? f.value : { start: _.value, end: b.value };
    });
    function $(B, Y) {
      Y && Y instanceof HTMLElement ? l.set(B, Y) : l.delete(B);
    }
    function k(B) {
      return s.modelValue[B];
    }
    function w(B, Y) {
      if (Y == null) return !0;
      if (B.type === "text" || B.type === "select") return String(Y).trim() === "";
      if (B.type === "dateRange") {
        const X = Y;
        return !X?.start?.trim() || !X?.end?.trim();
      }
      return !0;
    }
    const S = D(
      () => s.filterDefinitions.some((B) => !w(B, k(B.id)))
    ), C = D(
      () => s.filterDefinitions.filter((B) => !w(B, k(B.id)))
    ), T = D(
      () => s.filterDefinitions.filter((B) => w(B, k(B.id)))
    );
    function P(B) {
      const Y = k(B.id), X = B.label.replace(/^\+\s*/, "");
      if (B.type === "text") return `${X}: ${String(Y ?? "").trim()}`;
      if (B.type === "select") {
        const Da = String(Y ?? ""), ui = B.options.find((hi) => hi.value === Da);
        return `${X}: ${ui?.label ?? Da}`;
      }
      const pt = Y, zt = V(pt.start), Ct = V(pt.end);
      return `${X}: ${zt} – ${Ct}`;
    }
    function V(B) {
      if (!B) return "";
      const Y = At(B, "YYYY-MM-DD", !0);
      return Y.isValid() ? Y.format("L") : B;
    }
    function R(B) {
      return d.value === B && u.value ? "border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border-slate-400/90 hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function W(B) {
      const Y = k(B.id);
      if (B.type === "text") {
        p.value = Y != null ? String(Y) : "";
        return;
      }
      if (B.type === "select") {
        f.value = Y != null ? String(Y) : "";
        return;
      }
      const X = Y;
      _.value = X?.start?.trim() ?? "", b.value = X?.end?.trim() ?? "";
    }
    function q(B) {
      if (!B) return;
      g.value = B;
      const Y = B.getBoundingClientRect(), X = 300;
      let pt = Y.left;
      const zt = window.innerWidth - X - 12;
      pt > zt && (pt = Math.max(12, zt)), pt < 12 && (pt = 12);
      const Ct = Y.bottom + 8;
      h.value = {
        top: `${Ct}px`,
        left: `${pt}px`,
        width: `${Math.min(X, window.innerWidth - 24)}px`
      };
    }
    function A(B, Y) {
      if (d.value === B.id && u.value) {
        I();
        return;
      }
      u.value && d.value !== B.id && I(), d.value = B.id, u.value = !0, W(B), Qt().then(async () => {
        q(Y.currentTarget), await Qt(), E();
      });
    }
    function F(B, Y) {
      if (d.value === B.id && u.value) {
        I();
        return;
      }
      u.value && d.value !== B.id && I(), d.value = B.id, u.value = !0, W(B), Qt().then(async () => {
        const X = l.get(B.id) ?? Y.currentTarget;
        q(X), await Qt(), E();
      });
    }
    function E() {
      const B = r.value;
      if (!B) return;
      B.querySelector(
        'input, select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function O() {
      u.value = !1, d.value = null, g.value = null;
    }
    function z(B) {
      const Y = v.value;
      if (!Y) return;
      if (Y.type === "text") {
        p.value = B != null ? String(B) : "";
        return;
      }
      if (Y.type === "select") {
        f.value = B != null ? String(B) : "";
        return;
      }
      const X = B;
      _.value = X?.start?.trim() ?? "", b.value = X?.end?.trim() ?? "";
    }
    function I() {
      const B = v.value;
      if (!B) return;
      if (B.type === "text") {
        const zt = p.value.trim(), Ct = { ...s.modelValue };
        zt === "" ? delete Ct[B.id] : Ct[B.id] = zt, a("update:modelValue", Ct), a("change", Ct), O();
        return;
      }
      if (B.type === "select") {
        const zt = f.value.trim(), Ct = { ...s.modelValue };
        zt === "" ? delete Ct[B.id] : Ct[B.id] = zt, a("update:modelValue", Ct), a("change", Ct), O();
        return;
      }
      const Y = _.value.trim(), X = b.value.trim(), pt = { ...s.modelValue };
      !Y || !X || Y > X ? delete pt[B.id] : pt[B.id] = { start: Y, end: X }, a("update:modelValue", pt), a("change", pt), O();
    }
    function H(B) {
      const Y = { ...s.modelValue };
      delete Y[B], a("update:modelValue", Y), a("change", Y), d.value === B && O();
    }
    function tt() {
      const B = {};
      a("update:modelValue", B), a("change", B), O();
    }
    const Z = D(() => {
      const B = v.value;
      return B ? `Editar filtro: ${B.label}` : "Filtro";
    });
    function U(B) {
      return `Quitar filtro ${B.label.replace(/^\+\s*/, "")}`;
    }
    function dt(B) {
      return `Editar filtro ${B.label.replace(/^\+\s*/, "")}`;
    }
    function _t(B) {
      return `Añadir filtro ${B.label.replace(/^\+\s*/, "")}`;
    }
    const ct = D(() => s.clearLabel);
    function St(B) {
      if (!u.value || !r.value) return;
      const Y = B.target;
      if (!(r.value.contains(Y) || (Y instanceof Element ? Y : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const pt of l.values())
          if (pt?.contains(Y)) return;
        I();
      }
    }
    function Lt(B) {
      B.key === "Escape" && u.value && (B.preventDefault(), O());
    }
    function It() {
      !u.value || !g.value || q(g.value);
    }
    return Ze(() => {
      document.addEventListener("mousedown", St, !0), window.addEventListener("keydown", Lt, !0), window.addEventListener("resize", It);
    }), ro(() => {
      document.removeEventListener("mousedown", St, !0), window.removeEventListener("keydown", Lt, !0), window.removeEventListener("resize", It);
    }), Ht(
      () => s.modelValue,
      () => {
        const B = v.value;
        B && u.value && !n.panel && W(B);
      },
      { deep: !0 }
    ), (B, Y) => (y(), x("div", {
      class: "kiut-filters font-sans text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      c("div", xw, [
        c("span", kw, M(e.label), 1),
        c("div", ww, [
          (y(!0), x(K, null, Q(C.value, (X) => (y(), x("div", {
            key: `chip-${X.id}`,
            "data-kiut-filter-chip": "",
            class: "inline-flex max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 py-0.5 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:border-white/[0.08] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            c("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": dt(X),
              onClick: (pt) => A(X, pt)
            }, [
              gs(B.$slots, "formatChip", {
                filter: X,
                value: k(X.id)
              }, () => [
                $t(M(P(X)), 1)
              ])
            ], 8, $w),
            c("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": U(X),
              onClick: (pt) => H(X.id)
            }, [
              J(L(_w), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Mw)
          ]))), 128)),
          (y(!0), x(K, null, Q(T.value, (X) => (y(), x("button", {
            key: `add-${X.id}`,
            ref_for: !0,
            ref: (pt) => $(X.id, pt),
            type: "button",
            class: Mt(["inline-flex items-center gap-0.5 rounded-full border-1 border-dashed px-2 py-1 font-medium text-[color:var(--kiut-text-secondary)] transition-colors dark:text-slate-400", R(X.id)]),
            "aria-label": _t(X),
            "aria-expanded": d.value === X.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === X.id ? i : void 0,
            onClick: (pt) => F(X, pt)
          }, [
            J(L(mw), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            c("span", null, M(X.label), 1)
          ], 10, Sw))), 128))
        ]),
        S.value ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": ct.value,
          onClick: tt
        }, M(e.clearLabel), 9, Cw)) : N("", !0)
      ]),
      (y(), ht(bi, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": Z.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:border-white/[0.08] dark:bg-[#252528]",
          style: xt(h.value),
          onKeydown: Y[4] || (Y[4] = Ta(() => {
          }, ["stop"]))
        }, [
          v.value ? (y(), x(K, { key: 0 }, [
            B.$slots.panel ? gs(B.$slots, "panel", {
              key: 0,
              filter: v.value,
              close: I,
              value: m.value,
              updateValue: z
            }) : (y(), x("div", Aw, [
              v.value.type === "text" ? (y(), x(K, { key: 0 }, [
                c("label", {
                  for: `${i}-text`,
                  class: "block text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(v.value.label), 9, Tw),
                we(c("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": Y[0] || (Y[0] = (X) => p.value = X),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: v.value.placeholder ?? "…",
                  onKeydown: mi(Ta(I, ["prevent"]), ["enter"])
                }, null, 40, Bw), [
                  [Bs, p.value]
                ])
              ], 64)) : v.value.type === "select" ? (y(), x(K, { key: 1 }, [
                c("label", {
                  for: `${i}-select`,
                  class: "block text-[11px] font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(v.value.label), 9, Fw),
                we(c("select", {
                  id: `${i}-select`,
                  "onUpdate:modelValue": Y[1] || (Y[1] = (X) => f.value = X),
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                }, [
                  c("option", Pw, M(v.value.placeholder ?? "Seleccionar…"), 1),
                  (y(!0), x(K, null, Q(v.value.options, (X) => (y(), x("option", {
                    key: X.value,
                    value: X.value
                  }, M(X.label), 9, Ew))), 128))
                ], 8, Lw), [
                  [_i, f.value]
                ])
              ], 64)) : v.value.type === "dateRange" ? (y(), x(K, { key: 2 }, [
                c("p", Rw, M(v.value.label), 1),
                c("div", Ow, [
                  c("div", Iw, [
                    c("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-[10px] leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, zw),
                    we(c("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": Y[2] || (Y[2] = (X) => _.value = X),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, Nw), [
                      [Bs, _.value]
                    ])
                  ]),
                  c("div", Ww, [
                    c("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-[10px] leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, Vw),
                    we(c("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": Y[3] || (Y[3] = (X) => b.value = X),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, Hw), [
                      [Bs, b.value]
                    ])
                  ])
                ])
              ], 64)) : N("", !0)
            ]))
          ], 64)) : N("", !0)
        ], 44, Dw)) : N("", !0)
      ]))
    ], 8, yw));
  }
}), Jw = {
  install(e) {
    e.component("KiutChartBar", ee), e.component("KiutChartLine", le), e.component("KiutPieChart", Ts), e.component("KiutBoxplotChart", yh), e.component("KiutCandlestickChart", ri), e.component("KiutHistogramChart", li), e.component("KiutSankeyChart", ce), e.component("KiutAgentsPerDay", Dg), e.component("KiutBookingManager", hp), e.component("KiutCheckin", Rp), e.component("KiutCheckinMetrics", rv), e.component("KiutCheckinSegments", Pv), e.component("KiutDisruption", b0), e.component("KiutFAQ", E0), e.component("KiutMessagesPerAgent", j0), e.component("KiutRecordLocator", pb), e.component("KiutSalesByChannel", Lb), e.component("KiutSeller", dm), e.component("KiutTopAgents", _m), e.component("KiutPaymentMethod", e1), e.component("KiutAgentHumanConversations", H1), e.component("KiutChannelMetrics", e_), e.component("KiutTriageCombinations", y_), e.component("KiutSelectLanguage", B_), e.component("KiutGuardrails", oy), e.component("KiutDisruptionNotifier", s2), e.component("KiutNpsDailyMetrics", ci), e.component("KiutNpsMetrics", Y2), e.component("KiutNpsOverviewMetrics", di), e.component("KiutAWSCost", dx), e.component("KiutCostUsage", Lx), e.component("KiutTokenUsage", tk), e.component("KiutConversationCount", gk), e.component("KiutTopAgentsAnalysis", Ck), e.component("KiutTopAgentsPie", Ok), e.component("KiutDailyCostTrends", Uk), e.component("KiutModelUsage", b5), e.component("KiutMessageRoles", E5), e.component("KiutCostPerConversations", tw), e.component("Tabs", rw), e.component("Table", bw), e.component("Filters", jw);
  }
};
export {
  dx as AWSCost,
  H1 as AgentHumanConversations,
  Dg as AgentsPerDay,
  hp as BookingManager,
  yh as BoxplotChart,
  ri as CandlestickChart,
  e_ as ChannelMetrics,
  ee as ChartBar,
  le as ChartLine,
  Rp as Checkin,
  rv as CheckinMetrics,
  Pv as CheckinSegments,
  gk as ConversationCount,
  tw as CostPerConversations,
  Lx as CostUsage,
  Uk as DailyCostTrends,
  b0 as Disruption,
  s2 as DisruptionNotifier,
  E0 as FAQ,
  jw as Filters,
  oy as Guardrails,
  li as HistogramChart,
  Jw as KiutUIPlugin,
  E5 as MessageRoles,
  j0 as MessagesPerAgent,
  b5 as ModelUsage,
  ci as NpsDailyMetrics,
  Y2 as NpsMetrics,
  di as NpsOverviewMetrics,
  e1 as PaymentMethod,
  Ts as PieChart,
  pb as RecordLocator,
  Lb as SalesByChannel,
  ce as SankeyChart,
  B_ as SelectLanguage,
  dm as Seller,
  bw as Table,
  rw as Tabs,
  tk as TokenUsage,
  _m as TopAgents,
  Ck as TopAgentsAnalysis,
  Ok as TopAgentsPie,
  y_ as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
