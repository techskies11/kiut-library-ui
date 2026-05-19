import { defineComponent as Z, shallowRef as Vs, h as Ma, ref as nt, onMounted as ie, onUnmounted as Le, watch as Rt, toRaw as Sa, nextTick as Ot, version as ol, isProxy as Ns, computed as D, toRef as rt, openBlock as y, createElementBlock as w, createVNode as R, unref as F, createElementVNode as r, Fragment as K, renderList as et, normalizeStyle as gt, normalizeClass as H, toDisplayString as A, createCommentVNode as z, onBeforeUnmount as js, createStaticVNode as io, withDirectives as Qt, vShow as _n, useSlots as Pa, renderSlot as $t, createBlock as tt, resolveDynamicComponent as Ge, withCtx as I, createSlots as Tt, createTextVNode as yt, vModelSelect as sl, Transition as pn, Teleport as Ia, withModifiers as ue, withKeys as Un, vModelText as je, useAttrs as Ws, mergeProps as Xn } from "vue";
import * as lo from "echarts/core";
import { TooltipComponent as il, TitleComponent as ll } from "echarts/components";
import { SankeyChart as rl } from "echarts/charts";
import { CanvasRenderer as cl } from "echarts/renderers";
import It from "moment";
function An(e) {
  return e + 0.5 | 0;
}
const $e = (e, t, n) => Math.max(Math.min(e, n), t);
function hn(e) {
  return $e(An(e * 2.55), 0, 255);
}
function Ae(e) {
  return $e(An(e * 255), 0, 255);
}
function pe(e) {
  return $e(An(e / 2.55) / 100, 0, 1);
}
function ro(e) {
  return $e(An(e * 100), 0, 100);
}
const te = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Da = [..."0123456789ABCDEF"], dl = (e) => Da[e & 15], ul = (e) => Da[(e & 240) >> 4] + Da[e & 15], Tn = (e) => (e & 240) >> 4 === (e & 15), hl = (e) => Tn(e.r) && Tn(e.g) && Tn(e.b) && Tn(e.a);
function fl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & te[e[1]] * 17,
    g: 255 & te[e[2]] * 17,
    b: 255 & te[e[3]] * 17,
    a: t === 5 ? te[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: te[e[1]] << 4 | te[e[2]],
    g: te[e[3]] << 4 | te[e[4]],
    b: te[e[5]] << 4 | te[e[6]],
    a: t === 9 ? te[e[7]] << 4 | te[e[8]] : 255
  })), n;
}
const gl = (e, t) => e < 255 ? t(e) : "";
function pl(e) {
  var t = hl(e) ? dl : ul;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + gl(e.a, t) : void 0;
}
const ml = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Hs(e, t, n) {
  const a = t * Math.min(n, 1 - n), o = (s, i = (s + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function bl(e, t, n) {
  const a = (o, s = (o + e / 60) % 6) => n - n * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [a(5), a(3), a(1)];
}
function vl(e, t, n) {
  const a = Hs(e, 1, 0.5);
  let o;
  for (t + n > 1 && (o = 1 / (t + n), t *= o, n *= o), o = 0; o < 3; o++)
    a[o] *= 1 - t - n, a[o] += t;
  return a;
}
function yl(e, t, n, a, o) {
  return e === o ? (t - n) / a + (t < n ? 6 : 0) : t === o ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Ra(e) {
  const n = e.r / 255, a = e.g / 255, o = e.b / 255, s = Math.max(n, a, o), i = Math.min(n, a, o), l = (s + i) / 2;
  let d, c, u;
  return s !== i && (u = s - i, c = l > 0.5 ? u / (2 - s - i) : u / (s + i), d = yl(n, a, o, u, s), d = d * 60 + 0.5), [d | 0, c || 0, l];
}
function Oa(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Ae);
}
function za(e, t, n) {
  return Oa(Hs, e, t, n);
}
function _l(e, t, n) {
  return Oa(vl, e, t, n);
}
function xl(e, t, n) {
  return Oa(bl, e, t, n);
}
function Ys(e) {
  return (e % 360 + 360) % 360;
}
function kl(e) {
  const t = ml.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? hn(+t[5]) : Ae(+t[5]));
  const o = Ys(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = _l(o, s, i) : t[1] === "hsv" ? a = xl(o, s, i) : a = za(o, s, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function wl(e, t) {
  var n = Ra(e);
  n[0] = Ys(n[0] + t), n = za(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Cl(e) {
  if (!e)
    return;
  const t = Ra(e), n = t[0], a = ro(t[1]), o = ro(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${pe(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
}
const co = {
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
}, uo = {
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
  const e = {}, t = Object.keys(uo), n = Object.keys(co);
  let a, o, s, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], o = 0; o < n.length; o++)
      s = n[o], l = l.replace(s, co[s]);
    s = parseInt(uo[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let Bn;
function Ml(e) {
  Bn || (Bn = $l(), Bn.transparent = [0, 0, 0, 0]);
  const t = Bn[e.toLowerCase()];
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
  let n = 255, a, o, s;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? hn(i) : $e(i * 255, 0, 255);
    }
    return a = +t[1], o = +t[3], s = +t[5], a = 255 & (t[2] ? hn(a) : $e(a, 0, 255)), o = 255 & (t[4] ? hn(o) : $e(o, 0, 255)), s = 255 & (t[6] ? hn(s) : $e(s, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function Al(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${pe(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ca = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, qe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Tl(e, t, n) {
  const a = qe(pe(e.r)), o = qe(pe(e.g)), s = qe(pe(e.b));
  return {
    r: Ae(ca(a + n * (qe(pe(t.r)) - a))),
    g: Ae(ca(o + n * (qe(pe(t.g)) - o))),
    b: Ae(ca(s + n * (qe(pe(t.b)) - s))),
    a: e.a + n * (t.a - e.a)
  };
}
function Ln(e, t, n) {
  if (e) {
    let a = Ra(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = za(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Ks(e, t) {
  return e && Object.assign(t || {}, e);
}
function ho(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Ae(e[3]))) : (t = Ks(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ae(t.a)), t;
}
function Bl(e) {
  return e.charAt(0) === "r" ? Dl(e) : kl(e);
}
class xn {
  constructor(t) {
    if (t instanceof xn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = ho(t) : n === "string" && (a = fl(t) || Ml(t) || Bl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ks(this._rgb);
    return t && (t.a = pe(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ho(t);
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
      const a = this.rgb, o = t.rgb;
      let s;
      const i = n === s ? 0.5 : n, l = 2 * i - 1, d = a.a - o.a, c = ((l * d === -1 ? l : (l + d) / (1 + l * d)) + 1) / 2;
      s = 1 - c, a.r = 255 & c * a.r + s * o.r + 0.5, a.g = 255 & c * a.g + s * o.g + 0.5, a.b = 255 & c * a.b + s * o.b + 0.5, a.a = i * a.a + (1 - i) * o.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Tl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new xn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ae(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = An(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Ln(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ln(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ln(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ln(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return wl(this._rgb, t), this;
  }
}
function he() {
}
const Ll = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function kt(e) {
  return e == null;
}
function zt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function _t(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ne(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function le(e, t) {
  return ne(e) ? e : t;
}
function ut(e, t) {
  return typeof e > "u" ? t : e;
}
const Fl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, qs = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Dt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function wt(e, t, n, a) {
  let o, s, i;
  if (zt(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(n, e[o], o);
  else if (_t(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(n, e[i[o]], i[o]);
}
function Gn(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function Zn(e) {
  if (zt(e))
    return e.map(Zn);
  if (_t(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      t[n[o]] = Zn(e[n[o]]);
    return t;
  }
  return e;
}
function Us(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function El(e, t, n, a) {
  if (!Us(e))
    return;
  const o = t[e], s = n[e];
  _t(o) && _t(s) ? kn(o, s, a) : t[e] = Zn(s);
}
function kn(e, t, n) {
  const a = zt(t) ? t : [
    t
  ], o = a.length;
  if (!_t(e))
    return e;
  n = n || {};
  const s = n.merger || El;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = a[l], !_t(i))
      continue;
    const d = Object.keys(i);
    for (let c = 0, u = d.length; c < u; ++c)
      s(d[c], e, i, n);
  }
  return e;
}
function mn(e, t) {
  return kn(e, t, {
    merger: Pl
  });
}
function Pl(e, t, n) {
  if (!Us(e))
    return;
  const a = t[e], o = n[e];
  _t(a) && _t(o) ? mn(a, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Zn(o));
}
const fo = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Il(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const o of t)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
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
function He(e, t) {
  return (fo[t] || (fo[t] = Rl(t)))(e);
}
function Va(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const wn = (e) => typeof e < "u", Te = (e) => typeof e == "function", go = (e, t) => {
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
const Ct = Math.PI, Lt = 2 * Ct, zl = Lt + Ct, Qn = Number.POSITIVE_INFINITY, Vl = Ct / 180, Vt = Ct / 2, Pe = Ct / 4, po = Ct * 2 / 3, Xs = Math.log10, de = Math.sign;
function bn(e, t, n) {
  return Math.abs(e - t) < n;
}
function mo(e) {
  const t = Math.round(e);
  e = bn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Xs(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Nl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((o, s) => o - s).pop(), t;
}
function jl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Cn(e) {
  return !jl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Wl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Hl(e, t, n) {
  let a, o, s;
  for (a = 0, o = e.length; a < o; a++)
    s = e[a][n], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function me(e) {
  return e * (Ct / 180);
}
function Yl(e) {
  return e * (180 / Ct);
}
function bo(e) {
  if (!ne(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Gs(e, t) {
  const n = t.x - e.x, a = t.y - e.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * Ct && (s += Lt), {
    angle: s,
    distance: o
  };
}
function Aa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Kl(e, t) {
  return (e - t + zl) % Lt - Ct;
}
function se(e) {
  return (e % Lt + Lt) % Lt;
}
function $n(e, t, n, a) {
  const o = se(e), s = se(t), i = se(n), l = se(s - o), d = se(i - o), c = se(o - s), u = se(o - i);
  return o === s || o === i || a && s === i || l > d && c < u;
}
function Ht(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function ql(e) {
  return Ht(e, -32768, 32767);
}
function Me(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Na(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const Ne = (e, t, n, a) => Na(e, n, a ? (o) => {
  const s = e[o][t];
  return s < n || s === n && e[o + 1][t] === n;
} : (o) => e[o][t] < n), Ul = (e, t, n) => Na(e, n, (a) => e[a][t] >= n);
function Xl(e, t, n) {
  let a = 0, o = e.length;
  for (; a < o && e[a] < t; )
    a++;
  for (; o > a && e[o - 1] > n; )
    o--;
  return a > 0 || o < e.length ? e.slice(a, o) : e;
}
const Zs = [
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
  }), Zs.forEach((n) => {
    const a = "_onData" + Va(n), o = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[a] == "function" && l[a](...s);
        }), i;
      }
    });
  });
}
function vo(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(t);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (Zs.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Qs(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Js = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ti(e, t) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, Js.call(window, () => {
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
const ja = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Wt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, Ql = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Jl(e, t, n) {
  const a = t.length;
  let o = 0, s = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: d } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: m, minDefined: _, maxDefined: p } = i.getUserBounds();
    if (_) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        Ne(d, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ne(t, u, i.getPixelForValue(h)).lo
      ), c) {
        const b = d.slice(0, o + 1).reverse().findIndex((v) => !kt(v[l.axis]));
        o -= Math.max(0, b);
      }
      o = Ht(o, 0, a - 1);
    }
    if (p) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        Ne(d, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ne(t, u, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const v = d.slice(b - 1).findIndex((g) => !kt(g[l.axis]));
        b += Math.max(0, v);
      }
      s = Ht(b, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function tr(e) {
  const { xScale: t, yScale: n, _scaleRanges: a } = e, o = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!a)
    return e._scaleRanges = o, !0;
  const s = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== n.min || a.ymax !== n.max;
  return Object.assign(a, o), s;
}
const Fn = (e) => e === 0 || e === 1, yo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Lt / n)), _o = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Lt / n) + 1, vn = {
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
  easeInSine: (e) => -Math.cos(e * Vt) + 1,
  easeOutSine: (e) => Math.sin(e * Vt),
  easeInOutSine: (e) => -0.5 * (Math.cos(Ct * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Fn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Fn(e) ? e : yo(e, 0.075, 0.3),
  easeOutElastic: (e) => Fn(e) ? e : _o(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Fn(e) ? e : e < 0.5 ? 0.5 * yo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * _o(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - vn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? vn.easeInBounce(e * 2) * 0.5 : vn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Wa(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function xo(e) {
  return Wa(e) ? e : new xn(e);
}
function da(e) {
  return Wa(e) ? e : new xn(e).saturate(0.5).darken(0.1).hexString();
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
const ko = /* @__PURE__ */ new Map();
function sr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = ko.get(n);
  return a || (a = new Intl.NumberFormat(e, t), ko.set(n, a)), a;
}
function Ha(e, t, n) {
  return sr(t, n).format(e);
}
const ir = {
  values(e) {
    return zt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = lr(e, n);
    }
    const i = Xs(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), d = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(d, this.options.ticks.format), Ha(e, a, d);
  }
};
function lr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var ei = {
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
const Ye = /* @__PURE__ */ Object.create(null), Ta = /* @__PURE__ */ Object.create(null);
function yn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ua(e, t, n) {
  return typeof t == "string" ? kn(yn(e, t), n) : kn(yn(e, ""), t);
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => da(o.backgroundColor), this.hoverBorderColor = (a, o) => da(o.borderColor), this.hoverColor = (a, o) => da(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return ua(this, t, n);
  }
  get(t) {
    return yn(this, t);
  }
  describe(t, n) {
    return ua(Ta, t, n);
  }
  override(t, n) {
    return ua(Ye, t, n);
  }
  route(t, n, a, o) {
    const s = yn(this, t), i = yn(this, a), l = "_" + n;
    Object.defineProperties(s, {
      [l]: {
        value: s[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const d = this[l], c = i[o];
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
var Et = /* @__PURE__ */ new cr({
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
  or,
  rr
]);
function dr(e) {
  return !e || kt(e.size) || kt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function wo(e, t, n, a, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function Ie(e, t, n) {
  const a = e.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - o) * a) / a + o;
}
function Co(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ba(e, t, n, a) {
  ni(e, t, n, a, null);
}
function ni(e, t, n, a, o) {
  let s, i, l, d, c, u, h, m;
  const _ = t.pointStyle, p = t.rotation, b = t.radius;
  let v = (p || 0) * Vl;
  if (_ && typeof _ == "object" && (s = _.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(v), e.drawImage(_, -_.width / 2, -_.height / 2, _.width, _.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), _) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, b, 0, 0, Lt) : e.arc(n, a, b, 0, Lt), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : b, e.moveTo(n + Math.sin(v) * u, a - Math.cos(v) * b), v += po, e.lineTo(n + Math.sin(v) * u, a - Math.cos(v) * b), v += po, e.lineTo(n + Math.sin(v) * u, a - Math.cos(v) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, d = b - c, i = Math.cos(v + Pe) * d, h = Math.cos(v + Pe) * (o ? o / 2 - c : d), l = Math.sin(v + Pe) * d, m = Math.sin(v + Pe) * (o ? o / 2 - c : d), e.arc(n - h, a - l, c, v - Ct, v - Vt), e.arc(n + m, a - i, c, v - Vt, v), e.arc(n + h, a + l, c, v, v + Vt), e.arc(n - m, a + i, c, v + Vt, v + Ct), e.closePath();
        break;
      case "rect":
        if (!p) {
          d = Math.SQRT1_2 * b, u = o ? o / 2 : d, e.rect(n - u, a - d, 2 * u, 2 * d);
          break;
        }
        v += Pe;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + m, a - i), e.lineTo(n + h, a + l), e.lineTo(n - m, a + i), e.closePath();
        break;
      case "crossRot":
        v += Pe;
      /* falls through */
      case "cross":
        h = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "star":
        h = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i), v += Pe, h = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(v) * b, l = Math.sin(v) * b, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(v) * (o ? o / 2 : b), a + Math.sin(v) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Mn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Ya(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ka(e) {
  e.restore();
}
function ur(e, t, n, a, o) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (t.x + n.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, n.y);
  } else o === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
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
function gr(e, t, n, a, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(a), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, d = n - s.actualBoundingBoxAscent, c = n + s.actualBoundingBoxDescent, u = o.strikethrough ? (d + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function pr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Sn(e, t, n, a, o, s = {}) {
  const i = zt(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let d, c;
  for (e.save(), e.font = o.string, fr(e, s), d = 0; d < i.length; ++d)
    c = i[d], s.backdrop && pr(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), kt(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, n, a, s.maxWidth)), e.fillText(c, n, a, s.maxWidth), gr(e, n, a, c, s), a += Number(o.lineHeight);
  e.restore();
}
function Jn(e, t) {
  const { x: n, y: a, w: o, h: s, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ct, Ct, !0), e.lineTo(n, a + s - i.bottomLeft), e.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, Ct, Vt, !0), e.lineTo(n + o - i.bottomRight, a + s), e.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, Vt, 0, !0), e.lineTo(n + o, a + i.topRight), e.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -Vt, !0), e.lineTo(n + i.topLeft, a);
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
function qa(e, t) {
  const n = {}, a = _t(t), o = a ? Object.keys(t) : t, s = _t(e) ? a ? (i) => ut(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    n[i] = yr(s(i));
  return n;
}
function ai(e) {
  return qa(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ze(e) {
  return qa(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ae(e) {
  const t = ai(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Yt(e, t) {
  e = e || {}, t = t || Et.font;
  let n = ut(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = ut(e.style, t.style);
  a && !("" + a).match(br) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const o = {
    family: ut(e.family, t.family),
    lineHeight: vr(ut(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: ut(e.weight, t.weight),
    string: ""
  };
  return o.string = dr(o), o;
}
function En(e, t, n, a) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function _r(e, t, n) {
  const { min: a, max: o } = e, s = qs(t, (o - a) / 2), i = (l, d) => n && l === 0 ? 0 : l + d;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function Ke(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ua(e, t = [
  ""
], n, a, o = () => e[0]) {
  const s = n || e;
  typeof a > "u" && (a = li("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: a,
    _getTarget: o,
    override: (l) => Ua([
      l,
      ...e
    ], t, s, a)
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
      return si(l, d, () => Dr(d, t, e, l));
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
      return Mo(l).includes(d);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Mo(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, d, c) {
      const u = l._storage || (l._storage = o());
      return l[d] = u[d] = c, delete l._keys, !0;
    }
  });
}
function Je(e, t, n, a) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: oi(e, a),
    setContext: (s) => Je(e, s, n, a),
    override: (s) => Je(e.override(s), t, n, a)
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
      return si(s, i, () => kr(s, i, l));
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
function oi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: Te(n) ? n : () => n,
    isIndexable: Te(a) ? a : () => a
  };
}
const xr = (e, t) => e ? e + Va(t) : t, Xa = (e, t) => _t(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function si(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function kr(e, t, n) {
  const { _proxy: a, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = a[t];
  return Te(l) && i.isScriptable(t) && (l = wr(t, l, e, n)), zt(l) && l.length && (l = Cr(t, l, e, i.isIndexable)), Xa(t, l) && (l = Je(l, o, s && s[t], i)), l;
}
function wr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let d = t(s, i || a);
  return l.delete(e), Xa(e, d) && (d = Ga(o._scopes, o, e, d)), d;
}
function Cr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = n;
  if (typeof s.index < "u" && a(e))
    return t[s.index % t.length];
  if (_t(t[0])) {
    const d = t, c = o._scopes.filter((u) => u !== d);
    t = [];
    for (const u of d) {
      const h = Ga(c, o, e, u);
      t.push(Je(h, s, i && i[e], l));
    }
  }
  return t;
}
function ii(e, t, n) {
  return Te(e) ? e(t, n) : e;
}
const $r = (e, t) => e === !0 ? t : typeof e == "string" ? He(t, e) : void 0;
function Mr(e, t, n, a, o) {
  for (const s of t) {
    const i = $r(n, s);
    if (i) {
      e.add(i);
      const l = ii(i._fallback, n, o);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function Ga(e, t, n, a) {
  const o = t._rootScopes, s = ii(t._fallback, n, a), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let d = $o(l, i, n, s || n, a);
  return d === null || typeof s < "u" && s !== n && (d = $o(l, i, s, d, a), d === null) ? !1 : Ua(Array.from(l), [
    ""
  ], o, s, () => Sr(t, n, a));
}
function $o(e, t, n, a, o) {
  for (; n; )
    n = Mr(e, t, n, a, o);
  return n;
}
function Sr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const o = a[t];
  return zt(o) && _t(n) ? n : o || {};
}
function Dr(e, t, n, a) {
  let o;
  for (const s of t)
    if (o = li(xr(s, e), n), typeof o < "u")
      return Xa(e, o) ? Ga(n, a, e, o) : o;
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
function Mo(e) {
  let t = e._keys;
  return t || (t = e._keys = Ar(e._scopes)), t;
}
function Ar(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Tr = Number.EPSILON || 1e-14, tn = (e, t) => t < e.length && !e[t].skip && e[t], ri = (e) => e === "x" ? "y" : "x";
function Br(e, t, n, a) {
  const o = e.skip ? t : e, s = t, i = n.skip ? t : n, l = Aa(s, o), d = Aa(i, s);
  let c = l / (l + d), u = d / (l + d);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const h = a * c, m = a * u;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: s.x + m * (i.x - o.x),
      y: s.y + m * (i.y - o.y)
    }
  };
}
function Lr(e, t, n) {
  const a = e.length;
  let o, s, i, l, d, c = tn(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (d = c, c = tn(e, u + 1), !(!d || !c)) {
      if (bn(t[u], 0, Tr)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      o = n[u] / t[u], s = n[u + 1] / t[u], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[u] = o * i * t[u], n[u + 1] = s * i * t[u]);
    }
}
function Fr(e, t, n = "x") {
  const a = ri(n), o = e.length;
  let s, i, l, d = tn(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = d, d = tn(e, c + 1), !l)
      continue;
    const u = l[n], h = l[a];
    i && (s = (u - i[n]) / 3, l[`cp1${n}`] = u - s, l[`cp1${a}`] = h - s * t[c]), d && (s = (d[n] - u) / 3, l[`cp2${n}`] = u + s, l[`cp2${a}`] = h + s * t[c]);
  }
}
function Er(e, t = "x") {
  const n = ri(t), a = e.length, o = Array(a).fill(0), s = Array(a);
  let i, l, d, c = tn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = d, d = c, c = tn(e, i + 1), !!d) {
      if (c) {
        const u = c[t] - d[t];
        o[i] = u !== 0 ? (c[n] - d[n]) / u : 0;
      }
      s[i] = l ? c ? de(o[i - 1]) !== de(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  Lr(e, o, s), Fr(e, s, t);
}
function Pn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Pr(e, t) {
  let n, a, o, s, i, l = Mn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = s, s = l, l = n < a - 1 && Mn(e[n + 1], t), s && (o = e[n], i && (o.cp1x = Pn(o.cp1x, t.left, t.right), o.cp1y = Pn(o.cp1y, t.top, t.bottom)), l && (o.cp2x = Pn(o.cp2x, t.left, t.right), o.cp2y = Pn(o.cp2y, t.top, t.bottom)));
}
function Ir(e, t, n, a, o) {
  let s, i, l, d;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Er(e, o);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], d = Br(c, l, e[Math.min(s + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = d.previous.x, l.cp1y = d.previous.y, l.cp2x = d.next.x, l.cp2y = d.next.y, c = l;
  }
  t.capBezierPoints && Pr(e, n);
}
function Za() {
  return typeof window < "u" && typeof document < "u";
}
function Qa(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ta(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const aa = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Rr(e, t) {
  return aa(e).getPropertyValue(t);
}
const Or = [
  "top",
  "right",
  "bottom",
  "left"
];
function We(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let o = 0; o < 4; o++) {
    const s = Or[o];
    a[s] = parseFloat(e[t + "-" + s + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const zr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Vr(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: o, offsetY: s } = a;
  let i = !1, l, d;
  if (zr(o, s, e.target))
    l = o, d = s;
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
function ze(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, o = aa(n), s = o.boxSizing === "border-box", i = We(o, "padding"), l = We(o, "border", "width"), { x: d, y: c, box: u } = Vr(e, n), h = i.left + (u && l.left), m = i.top + (u && l.top);
  let { width: _, height: p } = t;
  return s && (_ -= i.width + l.width, p -= i.height + l.height), {
    x: Math.round((d - h) / _ * n.width / a),
    y: Math.round((c - m) / p * n.height / a)
  };
}
function Nr(e, t, n) {
  let a, o;
  if (t === void 0 || n === void 0) {
    const s = e && Qa(e);
    if (!s)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = aa(s), d = We(l, "border", "width"), c = We(l, "padding");
      t = i.width - c.width - d.width, n = i.height - c.height - d.height, a = ta(l.maxWidth, s, "clientWidth"), o = ta(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || Qn,
    maxHeight: o || Qn
  };
}
const Se = (e) => Math.round(e * 10) / 10;
function jr(e, t, n, a) {
  const o = aa(e), s = We(o, "margin"), i = ta(o.maxWidth, e, "clientWidth") || Qn, l = ta(o.maxHeight, e, "clientHeight") || Qn, d = Nr(e, t, n);
  let { width: c, height: u } = d;
  if (o.boxSizing === "content-box") {
    const m = We(o, "border", "width"), _ = We(o, "padding");
    c -= _.width + m.width, u -= _.height + m.height;
  }
  return c = Math.max(0, c - s.width), u = Math.max(0, a ? c / a : u - s.height), c = Se(Math.min(c, i, d.maxWidth)), u = Se(Math.min(u, l, d.maxHeight)), c && !u && (u = Se(c / 2)), (t !== void 0 || n !== void 0) && a && d.height && u > d.height && (u = d.height, c = Se(Math.floor(u * a))), {
    width: c,
    height: u
  };
}
function So(e, t, n) {
  const a = t || 1, o = Se(e.height * a), s = Se(e.width * a);
  e.height = Se(e.height), e.width = Se(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = a, i.height = o, i.width = s, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Wr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Za() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Do(e, t) {
  const n = Rr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function Ve(e, t, n, a) {
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
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Ve(e, o, n), l = Ve(o, s, n), d = Ve(s, t, n), c = Ve(i, l, n), u = Ve(l, d, n);
  return Ve(c, u, n);
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
function Qe(e, t, n) {
  return e ? Kr(t, n) : qr();
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
    between: $n,
    compare: Kl,
    normalize: se
  } : {
    between: Me,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Ao({ start: e, end: t, count: n, loop: a, style: o }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: o
  };
}
function Ur(e, t, n) {
  const { property: a, start: o, end: s } = n, { between: i, normalize: l } = ui(a), d = t.length;
  let { start: c, end: u, loop: h } = e, m, _;
  if (h) {
    for (c += d, u += d, m = 0, _ = d; m < _ && i(l(t[c % d][a]), o, s); ++m)
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
function Xr(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: o, end: s } = n, i = t.length, { compare: l, between: d, normalize: c } = ui(a), { start: u, end: h, loop: m, style: _ } = Ur(e, t, n), p = [];
  let b = !1, v = null, g, f, k;
  const x = () => d(o, k, g) && l(o, k) !== 0, $ = () => l(s, g) === 0 || d(s, k, g), C = () => b || x(), M = () => !b || $();
  for (let S = u, L = u; S <= h; ++S)
    f = t[S % i], !f.skip && (g = c(f[a]), g !== k && (b = d(g, o, s), v === null && C() && (v = l(g, o) === 0 ? S : L), v !== null && M() && (p.push(Ao({
      start: v,
      end: S,
      loop: m,
      count: i,
      style: _
    })), v = null), L = S, k = g));
  return v !== null && p.push(Ao({
    start: v,
    end: h,
    loop: m,
    count: i,
    style: _
  })), p;
}
function Gr(e, t) {
  const n = [], a = e.segments;
  for (let o = 0; o < a.length; o++) {
    const s = Xr(a[o], e.points, t);
    s.length && n.push(...s);
  }
  return n;
}
function Zr(e, t, n, a) {
  let o = 0, s = t - 1;
  if (n && !a)
    for (; o < t && !e[o].skip; )
      o++;
  for (; o < t && e[o].skip; )
    o++;
  for (o %= t, n && (s += o); s > o && e[s % t].skip; )
    s--;
  return s %= t, {
    start: o,
    end: s
  };
}
function Qr(e, t, n, a) {
  const o = e.length, s = [];
  let i = t, l = e[t], d;
  for (d = t + 1; d <= n; ++d) {
    const c = e[d % o];
    c.skip || c.stop ? l.skip || (a = !1, s.push({
      start: t % o,
      end: (d - 1) % o,
      loop: a
    }), t = i = c.stop ? d : null) : (i = d, l.skip && (t = d)), l = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: a
  }), s;
}
function Jr(e, t) {
  const n = e.points, a = e.options.spanGaps, o = n.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = Zr(n, o, s, a);
  if (a === !0)
    return To(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], n, t);
  const d = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return To(e, Qr(n, i, d, c), n, t);
}
function To(e, t, n, a) {
  return !a || !a.setContext || !n ? t : tc(e, t, n, a);
}
function tc(e, t, n, a) {
  const o = e._chart.getContext(), s = Bo(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, d = n.length, c = [];
  let u = s, h = t[0].start, m = h;
  function _(p, b, v, g) {
    const f = l ? -1 : 1;
    if (p !== b) {
      for (p += d; n[p % d].skip; )
        p -= f;
      for (; n[b % d].skip; )
        b += f;
      p % d !== b % d && (c.push({
        start: p % d,
        end: b % d,
        loop: v,
        style: g
      }), u = g, h = b % d);
    }
  }
  for (const p of t) {
    h = l ? h : p.start;
    let b = n[h % d], v;
    for (m = h + 1; m <= p.end; m++) {
      const g = n[m % d];
      v = Bo(a.setContext(Ke(o, {
        type: "segment",
        p0: b,
        p1: g,
        p0DataIndex: (m - 1) % d,
        p1DataIndex: m % d,
        datasetIndex: i
      }))), ec(v, u) && _(h, m - 1, p.loop, u), b = g, u = v;
    }
    h < m - 1 && _(h, m - 1, p.loop, u);
  }
  return c;
}
function Bo(e) {
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
  const n = [], a = function(o, s) {
    return Wa(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function In(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function nc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: In(n, t, "left"),
    right: In(n, t, "right"),
    top: In(a, t, "top"),
    bottom: In(a, t, "bottom")
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
class oc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, a, o) {
    const s = n.listeners[o], i = n.duration;
    s.forEach((l) => l({
      chart: t,
      initial: n.initial,
      numSteps: i,
      currentStep: Math.min(a - n.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Js.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, o) => {
      if (!a.running || !a.items.length)
        return;
      const s = a.items;
      let i = s.length - 1, l = !1, d;
      for (; i >= 0; --i)
        d = s[i], d._active ? (d._total > a.duration && (a.duration = d._total), d.tick(t), l = !0) : (s[i] = s[s.length - 1], s.pop());
      l && (o.draw(), this._notify(o, a, t, "progress")), s.length || (a.running = !1, this._notify(o, a, t, "complete"), a.initial = !1), n += s.length;
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
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((a, o) => Math.max(a, o._duration), 0), this._refresh());
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
    let o = a.length - 1;
    for (; o >= 0; --o)
      a[o].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var fe = /* @__PURE__ */ new oc();
const Lo = "transparent", sc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = xo(e || Lo), o = a.valid && xo(t || Lo);
    return o && o.valid ? o.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class ic {
  constructor(t, n, a, o) {
    const s = n[a];
    o = En([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = En([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || sc[t.type || typeof i], this._easing = vn[t.easing] || vn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = En([
        t.to,
        n,
        o,
        t.from
      ]), this._from = En([
        t.from,
        o,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, a = this._duration, o = this._prop, s = this._from, i = this._loop, l = this._to;
    let d;
    if (this._active = s !== l && (i || n < a), !this._active) {
      this._target[o] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[o] = s;
      return;
    }
    d = n / a % 2, d = i && d > 1 ? 2 - d : d, d = this._easing(Math.min(1, Math.max(0, d))), this._target[o] = this._fn(s, l, d);
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
    for (let o = 0; o < a.length; o++)
      a[o][n]();
  }
}
class hi {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!_t(t))
      return;
    const n = Object.keys(Et.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!_t(s))
        return;
      const i = {};
      for (const l of n)
        i[l] = s[l];
      (zt(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, o = rc(t, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && lc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), s;
  }
  _createAnimations(t, n) {
    const a = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let d;
    for (d = i.length - 1; d >= 0; --d) {
      const c = i[d];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, n));
        continue;
      }
      const u = n[c];
      let h = s[c];
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
      s[c] = h = new ic(m, t, c, u), o.push(h);
    }
    return o;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const a = this._createAnimations(t, n);
    if (a.length)
      return fe.add(this._chart, a), !0;
  }
}
function lc(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
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
function Fo(e, t) {
  const n = e && e.options || {}, a = n.reverse, o = n.min === void 0 ? t : 0, s = n.max === void 0 ? t : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function cc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Fo(e, n), o = Fo(t, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function dc(e) {
  let t, n, a, o;
  return _t(e) ? (t = e.top, n = e.right, a = e.bottom, o = e.left) : t = n = a = o = e, {
    top: t,
    right: n,
    bottom: a,
    left: o,
    disabled: e === !1
  };
}
function fi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function Eo(e, t, n, a = {}) {
  const o = e.keys, s = a.mode === "single";
  let i, l, d, c;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, l = o.length; i < l; ++i) {
    if (d = +o[i], d === n) {
      if (u = !0, a.all)
        continue;
      break;
    }
    c = e.values[d], ne(c) && (s || t === 0 || de(t) === de(c)) && (t += c);
  }
  return !u && !a.all ? 0 : t;
}
function uc(e, t) {
  const { iScale: n, vScale: a } = t, o = n.axis === "x" ? "x" : "y", s = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let d, c, u;
  for (d = 0, c = i.length; d < c; ++d)
    u = i[d], l[d] = {
      [o]: u,
      [s]: e[u]
    };
  return l;
}
function ha(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function hc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function fc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: o } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function gc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Po(e, t, n, a) {
  for (const o of t.getMatchingVisibleMetas(a).reverse()) {
    const s = e[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function Io(e, t) {
  const { chart: n, _cachedMeta: a } = e, o = n._stacks || (n._stacks = {}), { iScale: s, vScale: i, index: l } = a, d = s.axis, c = i.axis, u = hc(s, i, a), h = t.length;
  let m;
  for (let _ = 0; _ < h; ++_) {
    const p = t[_], { [d]: b, [c]: v } = p, g = p._stacks || (p._stacks = {});
    m = g[c] = gc(o, u, b), m[l] = v, m._top = Po(m, i, !0, a.type), m._bottom = Po(m, i, !1, a.type);
    const f = m._visualValues || (m._visualValues = {});
    f[l] = v;
  }
}
function fa(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function pc(e, t) {
  return Ke(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function mc(e, t, n) {
  return Ke(e, {
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
function nn(e, t) {
  const n = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const o of t) {
      const s = o._stacks;
      if (!s || s[a] === void 0 || s[a][n] === void 0)
        return;
      delete s[a][n], s[a]._visualValues !== void 0 && s[a]._visualValues[n] !== void 0 && delete s[a]._visualValues[n];
    }
  }
}
const ga = (e) => e === "reset" || e === "none", Ro = (e, t) => t ? e : Object.assign({}, e), bc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: fi(n, !0),
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
    this.configure(), this.linkScales(), t._stacked = ha(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && nn(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, m, _, p) => h === "x" ? m : h === "r" ? p : _, s = n.xAxisID = ut(a.xAxisID, fa(t, "x")), i = n.yAxisID = ut(a.yAxisID, fa(t, "y")), l = n.rAxisID = ut(a.rAxisID, fa(t, "r")), d = n.indexAxis, c = n.iAxisID = o(d, s, i, l), u = n.vAxisID = o(d, i, s, l);
    n.xScale = this.getScaleForId(s), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(u);
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
    this._data && vo(this._data, this), t._stacked && nn(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (_t(n)) {
      const o = this._cachedMeta;
      this._data = uc(n, o);
    } else if (a !== n) {
      if (a) {
        vo(a, this);
        const o = this._cachedMeta;
        nn(o), o._parsed = [];
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
    let o = !1;
    this._dataCheck();
    const s = n._stacked;
    n._stacked = ha(n.vScale, n), n.stack !== a.stack && (o = !0, nn(n), n.stack = a.stack), this._resyncElements(t), (o || s !== n._stacked) && (Io(this, n._parsed), n._stacked = ha(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: o } = this, { iScale: s, _stacked: i } = a, l = s.axis;
    let d = t === 0 && n === o.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], u, h, m;
    if (this._parsing === !1)
      a._parsed = o, a._sorted = !0, m = o;
    else {
      zt(o[t]) ? m = this.parseArrayData(a, o, t, n) : _t(o[t]) ? m = this.parseObjectData(a, o, t, n) : m = this.parsePrimitiveData(a, o, t, n);
      const _ = () => h[l] === null || c && h[l] < c[l];
      for (u = 0; u < n; ++u)
        a._parsed[u + t] = h = m[u], d && (_() && (d = !1), c = h);
      a._sorted = d;
    }
    i && Io(this, m);
  }
  parsePrimitiveData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, d = i.axis, c = s.getLabels(), u = s === i, h = new Array(o);
    let m, _, p;
    for (m = 0, _ = o; m < _; ++m)
      p = m + a, h[m] = {
        [l]: u || s.parse(c[p], p),
        [d]: i.parse(n[p], p)
      };
    return h;
  }
  parseArrayData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, l = new Array(o);
    let d, c, u, h;
    for (d = 0, c = o; d < c; ++d)
      u = d + a, h = n[u], l[d] = {
        x: s.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return l;
  }
  parseObjectData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: d = "y" } = this._parsing, c = new Array(o);
    let u, h, m, _;
    for (u = 0, h = o; u < h; ++u)
      m = u + a, _ = n[m], c[u] = {
        x: s.parse(He(_, l), m),
        y: i.parse(He(_, d), m)
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
    const o = this.chart, s = this._cachedMeta, i = n[t.axis], l = {
      keys: fi(o, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Eo(l, i, s.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, o) {
    const s = a[n.axis];
    let i = s === null ? NaN : s;
    const l = o && a._stacks[n.axis];
    o && l && (o.values = l, i = Eo(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, o = a._parsed, s = a._sorted && t === a.iScale, i = o.length, l = this._getOtherScale(t), d = bc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = fc(l);
    let m, _;
    function p() {
      _ = o[m];
      const b = _[l.axis];
      return !ne(_[t.axis]) || u > b || h < b;
    }
    for (m = 0; m < i && !(!p() && (this.updateRangeFromParsed(c, t, _, d), s)); ++m)
      ;
    if (s) {
      for (m = i - 1; m >= 0; --m)
        if (!p()) {
          this.updateRangeFromParsed(c, t, _, d);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][t.axis], ne(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = n.iScale, o = n.vScale, s = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(s[a.axis]) : "",
      value: o ? "" + o.getLabelForValue(s[o.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = dc(ut(this.options.clip, cc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, o = a.data || [], s = n.chartArea, i = [], l = this._drawStart || 0, d = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, s, l, d), u = l; u < l + d; ++u) {
      const h = o[u];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, s));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, s);
  }
  getStyle(t, n) {
    const a = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, n, a) {
    const o = this.getDataset();
    let s;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      s = i.$context || (i.$context = mc(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = pc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!n, s.mode = a, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const o = n === "active", s = this._cachedDataOpts, i = t + "-" + n, l = s[i], d = this.enableOptionSharing && wn(a);
    if (l)
      return Ro(l, d);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), u), _ = Object.keys(Et.elements[t]), p = () => this.getContext(a, o, n), b = c.resolveNamedOptions(m, _, p, h);
    return b.$shared && (b.$shared = d, s[i] = Object.freeze(Ro(b, d))), b;
  }
  _resolveAnimations(t, n, a) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${n}`, l = s[i];
    if (l)
      return l;
    let d;
    if (o.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, n), m = u.getOptionScopes(this.getDataset(), h);
      d = u.createResolver(m, this.getContext(t, a, n));
    }
    const c = new hi(o, d && d.animations);
    return d && d._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || ga(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, n, a, o) {
    ga(o) ? Object.assign(t, a) : this._resolveAnimations(n, o).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !ga(n) && this._resolveAnimations(void 0, n).update(t, a);
  }
  _setStyle(t, n, a, o) {
    t.active = o;
    const s = this.getStyle(n, o);
    this._resolveAnimations(n, a, o).update(t, {
      options: !o && this.getSharedOptions(s) || s
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
    const o = a.length, s = n.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, n, a = !0) {
    const o = this._cachedMeta, s = o.data, i = t + n;
    let l;
    const d = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (d(s), l = t; l < i; ++l)
      s[l] = new this.dataElementType();
    this._parsing && d(o._parsed), this.parse(t, n), a && this.updateElements(s, t, n, "reset");
  }
  updateElements(t, n, a, o) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const o = a._parsed.splice(t, n);
      a._stacked && nn(a, o);
    }
    a.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, a, o] = t;
      this[n](a, o);
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
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(e));
    e._cache.$bar = Qs(a.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function yc(e) {
  const t = e.iScale, n = vc(t, e.type);
  let a = t._length, o, s, i, l;
  const d = () => {
    i === 32767 || i === -32768 || (wn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (o = 0, s = n.length; o < s; ++o)
    i = t.getPixelForValue(n[o]), d();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), d();
  return a;
}
function _c(e, t, n, a) {
  const o = n.barThickness;
  let s, i;
  return kt(o) ? (s = t.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function xc(e, t, n, a) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, l = e < o.length - 1 ? o[e + 1] : null;
  const d = n.categoryPercentage;
  i === null && (i = s - (l === null ? t.end - t.start : l - s)), l === null && (l = s + s - i);
  const c = s - (s - Math.min(i, l)) / 2 * d;
  return {
    chunk: Math.abs(l - i) / 2 * d / a,
    ratio: n.barPercentage,
    start: c
  };
}
function kc(e, t, n, a) {
  const o = n.parse(e[0], a), s = n.parse(e[1], a), i = Math.min(o, s), l = Math.max(o, s);
  let d = i, c = l;
  Math.abs(i) > Math.abs(l) && (d = l, c = i), t[n.axis] = c, t._custom = {
    barStart: d,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function gi(e, t, n, a) {
  return zt(e) ? kc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Oo(e, t, n, a) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, d = [];
  let c, u, h, m;
  for (c = n, u = n + a; c < u; ++c)
    m = t[c], h = {}, h[o.axis] = l || o.parse(i[c], c), d.push(gi(m, h, s, c));
  return d;
}
function pa(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function wc(e, t, n) {
  return e !== 0 ? de(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Cc(e) {
  let t, n, a, o, s;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: o,
    bottom: s
  };
}
function $c(e, t, n, a) {
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
  const { start: i, end: l, reverse: d, top: c, bottom: u } = Cc(e);
  o === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? o = c : (n._bottom || 0) === a ? o = u : (s[zo(u, i, l, d)] = !0, o = c)), s[zo(o, i, l, d)] = !0, e.borderSkipped = s;
}
function zo(e, t, n, a) {
  return a ? (e = Mc(e, t, n), e = Vo(e, n, t)) : e = Vo(e, t, n), e;
}
function Mc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Vo(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Sc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Dc extends oa {
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
  parsePrimitiveData(t, n, a, o) {
    return Oo(t, n, a, o);
  }
  parseArrayData(t, n, a, o) {
    return Oo(t, n, a, o);
  }
  parseObjectData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: d = "y" } = this._parsing, c = s.axis === "x" ? l : d, u = i.axis === "x" ? l : d, h = [];
    let m, _, p, b;
    for (m = a, _ = a + o; m < _; ++m)
      b = n[m], p = {}, p[s.axis] = s.parse(He(b, c), m), h.push(gi(He(b, u), p, i, m));
    return h;
  }
  updateRangeFromParsed(t, n, a, o) {
    super.updateRangeFromParsed(t, n, a, o);
    const s = a._custom;
    s && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, s.min), t.max = Math.max(t.max, s.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: a, vScale: o } = n, s = this.getParsed(t), i = s._custom, l = pa(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + a.getLabelForValue(s[a.axis]),
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
  updateElements(t, n, a, o) {
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, d = l.getBasePixel(), c = l.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: m } = this._getSharedOptions(n, o);
    for (let _ = n; _ < n + a; _++) {
      const p = this.getParsed(_), b = s || kt(p[l.axis]) ? {
        base: d,
        head: d
      } : this._calculateBarValuePixels(_), v = this._calculateBarIndexPixels(_, u), g = (p._stacks || {})[l.axis], f = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !g || pa(p._custom) || i === g._top || i === g._bottom,
        x: c ? b.head : v.center,
        y: c ? v.center : b.head,
        height: c ? v.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : v.size
      };
      m && (f.options = h || this.resolveDataElementOptions(_, t[_].active ? "active" : o));
      const k = f.options || t[_].options;
      $c(f, k, g, i), Sc(f, k, u.ratio), this.updateElement(t[_], _, f, o);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), s = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), d = l && l[a.axis], c = (u) => {
      const h = u._parsed.find((_) => _[a.axis] === d), m = h && h[u.vScale.axis];
      if (kt(m) || isNaN(m))
        return !0;
    };
    for (const u of o)
      if (!(n !== void 0 && c(u)) && ((s === !1 || i.indexOf(u.stack) === -1 || s === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    const o = this._getStacks(t, a), s = n !== void 0 ? o.indexOf(n) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, a = n.iScale, o = [];
    let s, i;
    for (s = 0, i = n.data.length; s < i; ++s)
      o.push(a.getPixelForValue(this.getParsed(s)[a.axis], s));
    const l = t.barThickness;
    return {
      min: l || yc(n),
      pixels: o,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: a, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, d = this.getParsed(t), c = d._custom, u = pa(c);
    let h = d[n.axis], m = 0, _ = a ? this.applyStack(n, d, a) : h, p, b;
    _ !== h && (m = _ - h, _ = h), u && (h = c.barStart, _ = c.barEnd - c.barStart, h !== 0 && de(h) !== de(c.barEnd) && (m = 0), m += h);
    const v = !kt(s) && !u ? s : m;
    let g = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? p = n.getPixelForValue(m + _) : p = g, b = p - g, Math.abs(b) < i) {
      b = wc(b, n, l) * i, h === l && (g -= b / 2);
      const f = n.getPixelForDecimal(0), k = n.getPixelForDecimal(1), x = Math.min(f, k), $ = Math.max(f, k);
      g = Math.max(Math.min(g, $), x), p = g + b, a && !u && (d._stacks[n.axis]._visualValues[o] = n.getValueForPixel(p) - n.getValueForPixel(g));
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
    const a = n.scale, o = this.options, s = o.skipNull, i = ut(o.maxBarThickness, 1 / 0);
    let l, d;
    const c = this._getAxisCount();
    if (n.grouped) {
      const u = s ? this._getStackCount(t) : n.stackCount, h = o.barThickness === "flex" ? xc(t, n, o, u * c) : _c(t, n, o, u * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, _ = this._getAxis().indexOf(ut(m, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + _;
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
    const t = this._cachedMeta, n = t.vScale, a = t.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function Ac(e, t, n) {
  let a = 1, o = 1, s = 0, i = 0;
  if (t < Lt) {
    const l = e, d = l + t, c = Math.cos(l), u = Math.sin(l), h = Math.cos(d), m = Math.sin(d), _ = (k, x, $) => $n(k, l, d, !0) ? 1 : Math.max(x, x * n, $, $ * n), p = (k, x, $) => $n(k, l, d, !0) ? -1 : Math.min(x, x * n, $, $ * n), b = _(0, c, h), v = _(Vt, u, m), g = p(Ct, c, h), f = p(Ct + Vt, u, m);
    a = (b - g) / 2, o = (v - f) / 2, s = -(b + g) / 2, i = -(v + f) / 2;
  }
  return {
    ratioX: a,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class Tc extends oa {
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
            const n = t.data, { labels: { pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = t.legend.options;
            return n.labels.length && n.datasets.length ? n.labels.map((d, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: d,
                fillStyle: h.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: o,
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
    const a = this.getDataset().data, o = this._cachedMeta;
    if (this._parsing === !1)
      o._parsed = a;
    else {
      let s = (d) => +a[d];
      if (_t(a[t])) {
        const { key: d = "value" } = this._parsing;
        s = (c) => +He(a[c], d);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return me(this.options.rotation - 90);
  }
  _getCircumference() {
    return me(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Lt, n = -Lt;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const o = this.chart.getDatasetMeta(a).controller, s = o._getRotation(), i = o._getCircumference();
        t = Math.min(t, s), n = Math.max(n, s + i);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), d = Math.min(Fl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: m, ratioY: _, offsetX: p, offsetY: b } = Ac(h, u, d), v = (a.width - i) / m, g = (a.height - i) / _, f = Math.max(Math.min(v, g) / 2, 0), k = qs(this.options.radius, f), x = Math.max(k * d, 0), $ = (k - x) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * k, this.offsetY = b * k, o.total = this.calculateTotal(), this.outerRadius = k - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Lt);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, m = s && c.animateScale, _ = m ? 0 : this.innerRadius, p = m ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: v } = this._getSharedOptions(n, o);
    let g = this._getRotation(), f;
    for (f = 0; f < n; ++f)
      g += this._circumference(f, s);
    for (f = n; f < n + a; ++f) {
      const k = this._circumference(f, s), x = t[f], $ = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + k,
        circumference: k,
        outerRadius: p,
        innerRadius: _
      };
      v && ($.options = b || this.resolveDataElementOptions(f, x.active ? "active" : o)), g += k, this.updateElement(x, f, $, o);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let a = 0, o;
    for (o = 0; o < n.length; o++) {
      const s = t._parsed[o];
      s !== null && !isNaN(s) && this.chart.getDataVisibility(o) && !n[o].hidden && (a += Math.abs(s));
    }
    return a;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? Lt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = Ha(n._parsed[t], a.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let o, s, i, l, d;
    if (!t) {
      for (o = 0, s = a.data.datasets.length; o < s; ++o)
        if (a.isDatasetVisible(o)) {
          i = a.getDatasetMeta(o), t = i.data, l = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (o = 0, s = t.length; o < s; ++o)
      d = l.resolveDataElementOptions(o), d.borderAlign !== "inner" && (n = Math.max(n, d.borderWidth || 0, d.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let a = 0, o = t.length; a < o; ++a) {
      const s = this.resolveDataElementOptions(a);
      n = Math.max(n, s.offset || 0, s.hoverOffset || 0);
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
class Bc extends oa {
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
    const n = this._cachedMeta, { dataset: a, data: o = [], _dataset: s } = n, i = this.chart._animationsDisabled;
    let { start: l, count: d } = Jl(n, o, i);
    this._drawStart = l, this._drawCount = d, tr(n) && (l = 0, d = o.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!s._decimated, a.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, d, t);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: d, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(n, o), m = i.axis, _ = l.axis, { spanGaps: p, segment: b } = this.options, v = Cn(p) ? p : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || s || o === "none", f = n + a, k = t.length;
    let x = n > 0 && this.getParsed(n - 1);
    for (let $ = 0; $ < k; ++$) {
      const C = t[$], M = g ? C : {};
      if ($ < n || $ >= f) {
        M.skip = !0;
        continue;
      }
      const S = this.getParsed($), L = kt(S[_]), T = M[m] = i.getPixelForValue(S[m], $), B = M[_] = s || L ? l.getBasePixel() : l.getPixelForValue(d ? this.applyStack(l, S, d) : S[_], $);
      M.skip = isNaN(T) || isNaN(B) || L, M.stop = $ > 0 && Math.abs(S[m] - x[m]) > v, b && (M.parsed = S, M.raw = c.data[$]), h && (M.options = u || this.resolveDataElementOptions($, C.active ? "active" : o)), g || this.updateElement(C, $, M, o), x = S;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, a = n.options && n.options.borderWidth || 0, o = t.data || [];
    if (!o.length)
      return a;
    const s = o[0].size(this.resolveDataElementOptions(0)), i = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
    return Math.max(a, s, i) / 2;
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
function Re() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Ja {
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
    Object.assign(Ja.prototype, t);
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
var Fc = {
  _date: Ja
};
function Ec(e, t, n, a) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? Ul : Ne;
    if (a) {
      if (o._sharedOptions) {
        const u = s[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const m = c(s, t, n - h), _ = c(s, t, n + h);
          return {
            lo: m.lo,
            hi: _.hi
          };
        }
      }
    } else {
      const u = c(s, t, n);
      if (d) {
        const { vScale: h } = o._cachedMeta, { _parsed: m } = e, _ = m.slice(0, u.lo + 1).reverse().findIndex((b) => !kt(b[h.axis]));
        u.lo -= Math.max(0, _);
        const p = m.slice(u.hi).findIndex((b) => !kt(b[h.axis]));
        u.hi += Math.max(0, p);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function sa(e, t, n, a, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, d = s.length; l < d; ++l) {
    const { index: c, data: u } = s[l], { lo: h, hi: m } = Ec(s[l], t, i, o);
    for (let _ = h; _ <= m; ++_) {
      const p = u[_];
      p.skip || a(p, c, _);
    }
  }
}
function Pc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, o) {
    const s = t ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function ma(e, t, n, a, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || sa(e, n, t, function(l, d, c) {
    !o && !Mn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && s.push({
      element: l,
      datasetIndex: d,
      index: c
    });
  }, !0), s;
}
function Ic(e, t, n, a) {
  let o = [];
  function s(i, l, d) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Gs(i, {
      x: t.x,
      y: t.y
    });
    $n(h, c, u) && o.push({
      element: i,
      datasetIndex: l,
      index: d
    });
  }
  return sa(e, n, t, s), o;
}
function Rc(e, t, n, a, o, s) {
  let i = [];
  const l = Pc(n);
  let d = Number.POSITIVE_INFINITY;
  function c(u, h, m) {
    const _ = u.inRange(t.x, t.y, o);
    if (a && !_)
      return;
    const p = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(p)) && !_)
      return;
    const v = l(t, p);
    v < d ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: m
      }
    ], d = v) : v === d && i.push({
      element: u,
      datasetIndex: h,
      index: m
    });
  }
  return sa(e, n, t, c), i;
}
function ba(e, t, n, a, o, s) {
  return !s && !e.isPointInArea(t) ? [] : n === "r" && !a ? Ic(e, t, n, o) : Rc(e, t, n, a, o, s);
}
function No(e, t, n, a, o) {
  const s = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return sa(e, n, t, (d, c, u) => {
    d[i] && d[i](t[n], o) && (s.push({
      element: d,
      datasetIndex: c,
      index: u
    }), l = l || d.inRange(t.x, t.y, o));
  }), a && !l ? [] : s;
}
var Oc = {
  modes: {
    index(e, t, n, a) {
      const o = ze(t, e), s = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? ma(e, o, s, a, i) : ba(e, o, s, !1, a, i), d = [];
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
      const o = ze(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? ma(e, o, s, a, i) : ba(e, o, s, !1, a, i);
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
      const o = ze(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return ma(e, o, s, a, i);
    },
    nearest(e, t, n, a) {
      const o = ze(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return ba(e, o, s, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const o = ze(t, e);
      return No(e, o, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const o = ze(t, e);
      return No(e, o, "y", n.intersect, a);
    }
  }
};
const pi = [
  "left",
  "top",
  "right",
  "bottom"
];
function an(e, t) {
  return e.filter((n) => n.pos === t);
}
function jo(e, t) {
  return e.filter((n) => pi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function on(e, t) {
  return e.sort((n, a) => {
    const o = t ? a : n, s = t ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function zc(e) {
  const t = [];
  let n, a, o, s, i, l;
  for (n = 0, a = (e || []).length; n < a; ++n)
    o = e[n], { position: s, options: { stack: i, stackWeight: l = 1 } } = o, t.push({
      index: n,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: l
    });
  return t;
}
function Vc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !pi.includes(o))
      continue;
    const i = t[a] || (t[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += s;
  }
  return t;
}
function Nc(e, t) {
  const n = Vc(e), { vBoxMaxWidth: a, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: d } = l.box, c = n[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * a : d && t.availableWidth, l.height = o) : (l.width = a, l.height = u ? u * o : d && t.availableHeight);
  }
  return n;
}
function jc(e) {
  const t = zc(e), n = on(t.filter((c) => c.box.fullSize), !0), a = on(an(t, "left"), !0), o = on(an(t, "right")), s = on(an(t, "top"), !0), i = on(an(t, "bottom")), l = jo(t, "x"), d = jo(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(s),
    rightAndBottom: o.concat(d).concat(i).concat(l),
    chartArea: an(t, "chartArea"),
    vertical: a.concat(o).concat(d),
    horizontal: s.concat(i).concat(l)
  };
}
function Wo(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function mi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Wc(e, t, n, a) {
  const { pos: o, box: s } = n, i = e.maxPadding;
  if (!_t(o)) {
    n.size && (e[o] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, e[o] += n.size;
  }
  s.getPadding && mi(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - Wo(i, e, "left", "right")), d = Math.max(0, t.outerHeight - Wo(i, e, "top", "bottom")), c = l !== e.w, u = d !== e.h;
  return e.w = l, e.h = d, n.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Hc(e) {
  const t = e.maxPadding;
  function n(a) {
    const o = Math.max(t[a] - e[a], 0);
    return e[a] += o, o;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Yc(e, t) {
  const n = t.maxPadding;
  function a(o) {
    const s = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return o.forEach((i) => {
      s[i] = Math.max(t[i], n[i]);
    }), s;
  }
  return a(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function fn(e, t, n, a) {
  const o = [];
  let s, i, l, d, c, u;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], d = l.box, d.update(l.width || t.w, l.height || t.h, Yc(l.horizontal, t));
    const { same: h, other: m } = Wc(t, n, l, a);
    c |= h && o.length, u = u || m, d.fullSize || o.push(l);
  }
  return c && fn(o, t, n, a) || u;
}
function Rn(e, t, n, a, o) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + o, e.width = a, e.height = o;
}
function Ho(e, t, n, a) {
  const o = n.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const d = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * u, m = c.size || d.height;
      wn(c.start) && (i = c.start), d.fullSize ? Rn(d, o.left, i, n.outerWidth - o.right - o.left, m) : Rn(d, t.left + c.placed, i, h, m), c.start = i, c.placed += h, i = d.bottom;
    } else {
      const h = t.h * u, m = c.size || d.width;
      wn(c.start) && (s = c.start), d.fullSize ? Rn(d, s, o.top, m, n.outerHeight - o.bottom - o.top) : Rn(d, s, t.top + c.placed, m, h), c.start = s, c.placed += h, s = d.right;
    }
  }
  t.x = s, t.y = i;
}
var ee = {
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
    const o = ae(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(n - o.height, 0), l = jc(e.boxes), d = l.vertical, c = l.horizontal;
    wt(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const u = d.reduce((b, v) => v.box.options && v.box.options.display === !1 ? b : b + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), m = Object.assign({}, o);
    mi(m, ae(a));
    const _ = Object.assign({
      maxPadding: m,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), p = Nc(d.concat(c), h);
    fn(l.fullSize, _, h, p), fn(d, _, h, p), fn(c, _, h, p) && fn(d, _, h, p), Hc(_), Ho(l.leftAndTop, _, h, p), _.x += _.w, _.y += _.h, Ho(l.rightAndBottom, _, h, p), e.chartArea = {
      left: _.left,
      top: _.top,
      right: _.left + _.w,
      bottom: _.top + _.h,
      height: _.h,
      width: _.w
    }, wt(l.chartArea, (b) => {
      const v = b.box;
      Object.assign(v, e.chartArea), v.update(_.w, _.h, {
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
  getMaximumSize(t, n, a, o) {
    return n = Math.max(0, n || t.width), a = a || t.height, {
      width: n,
      height: Math.max(0, o ? Math.floor(n / o) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Kc extends bi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Yn = "$chartjs", qc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Yo = (e) => e === null || e === "";
function Uc(e, t) {
  const n = e.style, a = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[Yn] = {
    initial: {
      height: a,
      width: o,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Yo(o)) {
    const s = Do(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (Yo(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Do(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const vi = Wr ? {
  passive: !0
} : !1;
function Xc(e, t, n) {
  e && e.addEventListener(t, n, vi);
}
function Gc(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, vi);
}
function Zc(e, t) {
  const n = qc[e.type] || e.type, { x: a, y: o } = ze(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function ea(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function Qc(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || ea(l.addedNodes, a), i = i && !ea(l.removedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Jc(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || ea(l.removedNodes, a), i = i && !ea(l.addedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Dn = /* @__PURE__ */ new Map();
let Ko = 0;
function yi() {
  const e = window.devicePixelRatio;
  e !== Ko && (Ko = e, Dn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function td(e, t) {
  Dn.size || window.addEventListener("resize", yi), Dn.set(e, t);
}
function ed(e) {
  Dn.delete(e), Dn.size || window.removeEventListener("resize", yi);
}
function nd(e, t, n) {
  const a = e.canvas, o = a && Qa(a);
  if (!o)
    return;
  const s = ti((l, d) => {
    const c = o.clientWidth;
    n(l, d), c < o.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const d = l[0], c = d.contentRect.width, u = d.contentRect.height;
    c === 0 && u === 0 || s(c, u);
  });
  return i.observe(o), td(e, s), i;
}
function va(e, t, n) {
  n && n.disconnect(), t === "resize" && ed(e);
}
function ad(e, t, n) {
  const a = e.canvas, o = ti((s) => {
    e.ctx !== null && n(Zc(s, e));
  }, e);
  return Xc(a, t, o), o;
}
class od extends bi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Uc(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Yn])
      return !1;
    const a = n[Yn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      kt(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[Yn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: Qc,
      detach: Jc,
      resize: nd
    }[n] || ad;
    o[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: va,
      detach: va,
      resize: va
    }[n] || Gc)(t, n, o), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, o) {
    return jr(t, n, a, o);
  }
  isAttached(t) {
    const n = t && Qa(t);
    return !!(n && n.isConnected);
  }
}
function sd(e) {
  return !Za() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Kc : od;
}
let ve = class {
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
    return Cn(this.x) && Cn(this.y);
  }
  getProps(t, n) {
    const a = this.$animations;
    if (!n || !a)
      return this;
    const o = {};
    return t.forEach((s) => {
      o[s] = a[s] && a[s].active() ? a[s]._to : this[s];
    }), o;
  }
};
function id(e, t) {
  const n = e.options.ticks, a = ld(e), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? cd(t) : [], i = s.length, l = s[0], d = s[i - 1], c = [];
  if (i > o)
    return dd(t, c, s, i / o), c;
  const u = rd(s, t, o);
  if (i > 0) {
    let h, m;
    const _ = i > 1 ? Math.round((d - l) / (i - 1)) : null;
    for (On(t, c, u, kt(_) ? 0 : l - _, l), h = 0, m = i - 1; h < m; h++)
      On(t, c, u, s[h], s[h + 1]);
    return On(t, c, u, d, kt(_) ? t.length : d + _), c;
  }
  return On(t, c, u), c;
}
function ld(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), o = e._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function rd(e, t, n) {
  const a = ud(e), o = t.length / n;
  if (!a)
    return Math.max(o, 1);
  const s = Nl(a);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const d = s[i];
    if (d > o)
      return d;
  }
  return Math.max(o, 1);
}
function cd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function dd(e, t, n, a) {
  let o = 0, s = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = n[o * a]);
}
function On(e, t, n, a, o) {
  const s = ut(a, 0), i = Math.min(ut(o, e.length), e.length);
  let l = 0, d, c, u;
  for (n = Math.ceil(n), o && (d = o - a, n = d / Math.floor(d / n)), u = s; u < 0; )
    l++, u = Math.round(s + l * n);
  for (c = Math.max(s, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(s + l * n));
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
const hd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, qo = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Uo = (e, t) => Math.min(t || e, e);
function Xo(e, t) {
  const n = [], a = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += a)
    n.push(e[Math.floor(s)]);
  return n;
}
function fd(e, t, n) {
  const a = e.ticks.length, o = Math.min(t, a - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let d = e.getPixelForTick(o), c;
  if (!(n && (a === 1 ? c = Math.max(d - s, i - d) : t === 0 ? c = (e.getPixelForTick(1) - d) / 2 : c = (d - e.getPixelForTick(o - 1)) / 2, d += o < t ? c : -c, d < s - l || d > i + l)))
    return d;
}
function gd(e, t) {
  wt(e, (n) => {
    const a = n.gc, o = a.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete n.data[a[s]];
      a.splice(0, o);
    }
  });
}
function sn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Go(e, t) {
  if (!e.display)
    return 0;
  const n = Yt(e.font, t), a = ae(e.padding);
  return (zt(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function pd(e, t) {
  return Ke(e, {
    scale: t,
    type: "scale"
  });
}
function md(e, t, n) {
  return Ke(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function bd(e, t, n) {
  let a = ja(e);
  return (n && t !== "right" || !n && t === "right") && (a = hd(a)), a;
}
function vd(e, t, n, a) {
  const { top: o, left: s, bottom: i, right: l, chart: d } = e, { chartArea: c, scales: u } = d;
  let h = 0, m, _, p;
  const b = i - o, v = l - s;
  if (e.isHorizontal()) {
    if (_ = Wt(a, s, l), _t(n)) {
      const g = Object.keys(n)[0], f = n[g];
      p = u[g].getPixelForValue(f) + b - t;
    } else n === "center" ? p = (c.bottom + c.top) / 2 + b - t : p = qo(e, n, t);
    m = l - s;
  } else {
    if (_t(n)) {
      const g = Object.keys(n)[0], f = n[g];
      _ = u[g].getPixelForValue(f) - v + t;
    } else n === "center" ? _ = (c.left + c.right) / 2 - v + t : _ = qo(e, n, t);
    p = Wt(a, i, o), h = n === "left" ? -Vt : Vt;
  }
  return {
    titleX: _,
    titleY: p,
    maxWidth: m,
    rotation: h
  };
}
class en extends ve {
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
    let { _userMin: t, _userMax: n, _suggestedMin: a, _suggestedMax: o } = this;
    return t = le(t, Number.POSITIVE_INFINITY), n = le(n, Number.NEGATIVE_INFINITY), a = le(a, Number.POSITIVE_INFINITY), o = le(o, Number.NEGATIVE_INFINITY), {
      min: le(t, a),
      max: le(n, o),
      minDefined: ne(t),
      maxDefined: ne(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: a, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: n,
        max: a
      };
    const l = this.getMatchingVisibleMetas();
    for (let d = 0, c = l.length; d < c; ++d)
      i = l[d].controller.getMinMax(this, t), o || (n = Math.min(n, i.min)), s || (a = Math.max(a, i.max));
    return n = s && n > a ? a : n, a = o && n > a ? n : a, {
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
    const { beginAtZero: o, grace: s, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = _r(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const d = l < this.ticks.length;
    this._convertTicksToLabels(d ? Xo(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = id(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), d && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    let a, o, s;
    for (a = 0, o = t.length; a < o; a++)
      s = t[a], s.label = Dt(n.callback, [
        s.value,
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
    const t = this.options, n = t.ticks, a = Uo(this.ticks.length, t.ticks.maxTicksLimit), o = n.minRotation || 0, s = n.maxRotation;
    let i = o, l, d, c;
    if (!this._isVisible() || !n.display || o >= s || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, m = u.highest.height, _ = Ht(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : _ / (a - 1), h + 6 > l && (l = _ / (a - (t.offset ? 0.5 : 1)), d = this.maxHeight - sn(t.grid) - n.padding - Go(t.title, this.chart.options.font), c = Math.sqrt(h * h + m * m), i = Yl(Math.min(Math.asin(Ht((u.highest.height + 6) / l, -1, 1)), Math.asin(Ht(d / c, -1, 1)) - Math.asin(Ht(m / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
    }, { chart: n, options: { ticks: a, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const d = Go(o, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = sn(s) + d) : (t.height = this.maxHeight, t.width = sn(s) + d), a.display && this.ticks.length) {
        const { first: c, last: u, widest: h, highest: m } = this._getLabelSizes(), _ = a.padding * 2, p = me(this.labelRotation), b = Math.cos(p), v = Math.sin(p);
        if (l) {
          const g = a.mirror ? 0 : v * h.width + b * m.height;
          t.height = Math.min(this.maxHeight, t.height + g + _);
        } else {
          const g = a.mirror ? 0 : b * h.width + v * m.height;
          t.width = Math.min(this.maxWidth, t.width + g + _);
        }
        this._calculatePadding(c, u, v, b);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, d = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let m = 0, _ = 0;
      d ? c ? (m = o * t.width, _ = a * n.height) : (m = a * t.height, _ = o * n.width) : s === "start" ? _ = n.width : s === "end" ? m = t.width : s !== "inner" && (m = t.width / 2, _ = n.width / 2), this.paddingLeft = Math.max((m - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((_ - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = n.height / 2, h = t.height / 2;
      s === "start" ? (u = 0, h = t.height) : s === "end" && (u = n.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
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
      n < a.length && (a = Xo(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], d = Math.floor(n / Uo(n, a));
    let c = 0, u = 0, h, m, _, p, b, v, g, f, k, x, $;
    for (h = 0; h < n; h += d) {
      if (p = t[h].label, b = this._resolveTickFontOptions(h), o.font = v = b.string, g = s[v] = s[v] || {
        data: {},
        gc: []
      }, f = b.lineHeight, k = x = 0, !kt(p) && !zt(p))
        k = wo(o, g.data, g.gc, k, p), x = f;
      else if (zt(p))
        for (m = 0, _ = p.length; m < _; ++m)
          $ = p[m], !kt($) && !zt($) && (k = wo(o, g.data, g.gc, k, $), x += f);
      i.push(k), l.push(x), c = Math.max(k, c), u = Math.max(x, u);
    }
    gd(s, n);
    const C = i.indexOf(c), M = l.indexOf(u), S = (L) => ({
      width: i[L] || 0,
      height: l[L] || 0
    });
    return {
      first: S(0),
      last: S(n - 1),
      widest: S(C),
      highest: S(M),
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
    return ql(this._alignToPixels ? Ie(this.chart, n, 0) : n);
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
    const t = this.options.ticks, n = me(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, d = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? d * a > l * o ? l / a : d / o : d * o < l * a ? d / a : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: l } = o, d = s.offset, c = this.isHorizontal(), h = this.ticks.length + (d ? 1 : 0), m = sn(s), _ = [], p = l.setContext(this.getContext()), b = p.display ? p.width : 0, v = b / 2, g = function(W) {
      return Ie(a, W, b);
    };
    let f, k, x, $, C, M, S, L, T, B, E, P;
    if (i === "top")
      f = g(this.bottom), M = this.bottom - m, L = f - v, B = g(t.top) + v, P = t.bottom;
    else if (i === "bottom")
      f = g(this.top), B = t.top, P = g(t.bottom) - v, M = f + v, L = this.top + m;
    else if (i === "left")
      f = g(this.right), C = this.right - m, S = f - v, T = g(t.left) + v, E = t.right;
    else if (i === "right")
      f = g(this.left), T = t.left, E = g(t.right) - v, C = f + v, S = this.left + m;
    else if (n === "x") {
      if (i === "center")
        f = g((t.top + t.bottom) / 2 + 0.5);
      else if (_t(i)) {
        const W = Object.keys(i)[0], Q = i[W];
        f = g(this.chart.scales[W].getPixelForValue(Q));
      }
      B = t.top, P = t.bottom, M = f + v, L = M + m;
    } else if (n === "y") {
      if (i === "center")
        f = g((t.left + t.right) / 2);
      else if (_t(i)) {
        const W = Object.keys(i)[0], Q = i[W];
        f = g(this.chart.scales[W].getPixelForValue(Q));
      }
      C = f - v, S = C - m, T = t.left, E = t.right;
    }
    const N = ut(o.ticks.maxTicksLimit, h), Y = Math.max(1, Math.ceil(h / N));
    for (k = 0; k < h; k += Y) {
      const W = this.getContext(k), Q = s.setContext(W), J = l.setContext(W), lt = Q.lineWidth, vt = Q.color, pt = J.dash || [], ct = J.dashOffset, Mt = Q.tickWidth, ot = Q.tickColor, Pt = Q.tickBorderDash || [], At = Q.tickBorderDashOffset;
      x = fd(this, k, d), x !== void 0 && ($ = Ie(a, x, lt), c ? C = S = T = E = $ : M = L = B = P = $, _.push({
        tx1: C,
        ty1: M,
        tx2: S,
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
        tickColor: ot,
        tickBorderDash: Pt,
        tickBorderDashOffset: At
      }));
    }
    return this._ticksLength = h, this._borderValue = f, _;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), l = this.ticks, { align: d, crossAlign: c, padding: u, mirror: h } = s, m = sn(a.grid), _ = m + u, p = h ? -u : _, b = -me(this.labelRotation), v = [];
    let g, f, k, x, $, C, M, S, L, T, B, E, P = "middle";
    if (o === "top")
      C = this.bottom - p, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      C = this.top + p, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const Y = this._getYAxisLabelAlignment(m);
      M = Y.textAlign, $ = Y.x;
    } else if (o === "right") {
      const Y = this._getYAxisLabelAlignment(m);
      M = Y.textAlign, $ = Y.x;
    } else if (n === "x") {
      if (o === "center")
        C = (t.top + t.bottom) / 2 + _;
      else if (_t(o)) {
        const Y = Object.keys(o)[0], W = o[Y];
        C = this.chart.scales[Y].getPixelForValue(W) + _;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - _;
      else if (_t(o)) {
        const Y = Object.keys(o)[0], W = o[Y];
        $ = this.chart.scales[Y].getPixelForValue(W);
      }
      M = this._getYAxisLabelAlignment(m).textAlign;
    }
    n === "y" && (d === "start" ? P = "top" : d === "end" && (P = "bottom"));
    const N = this._getLabelSizes();
    for (g = 0, f = l.length; g < f; ++g) {
      k = l[g], x = k.label;
      const Y = s.setContext(this.getContext(g));
      S = this.getPixelForTick(g) + s.labelOffset, L = this._resolveTickFontOptions(g), T = L.lineHeight, B = zt(x) ? x.length : 1;
      const W = B / 2, Q = Y.color, J = Y.textStrokeColor, lt = Y.textStrokeWidth;
      let vt = M;
      i ? ($ = S, M === "inner" && (g === f - 1 ? vt = this.options.reverse ? "left" : "right" : g === 0 ? vt = this.options.reverse ? "right" : "left" : vt = "center"), o === "top" ? c === "near" || b !== 0 ? E = -B * T + T / 2 : c === "center" ? E = -N.highest.height / 2 - W * T + T : E = -N.highest.height + T / 2 : c === "near" || b !== 0 ? E = T / 2 : c === "center" ? E = N.highest.height / 2 - W * T : E = N.highest.height - B * T, h && (E *= -1), b !== 0 && !Y.showLabelBackdrop && ($ += T / 2 * Math.sin(b))) : (C = S, E = (1 - B) * T / 2);
      let pt;
      if (Y.showLabelBackdrop) {
        const ct = ae(Y.backdropPadding), Mt = N.heights[g], ot = N.widths[g];
        let Pt = E - ct.top, At = 0 - ct.left;
        switch (P) {
          case "middle":
            Pt -= Mt / 2;
            break;
          case "bottom":
            Pt -= Mt;
            break;
        }
        switch (M) {
          case "center":
            At -= ot / 2;
            break;
          case "right":
            At -= ot;
            break;
          case "inner":
            g === f - 1 ? At -= ot : g > 0 && (At -= ot / 2);
            break;
        }
        pt = {
          left: At,
          top: Pt,
          width: ot + ct.width,
          height: Mt + ct.height,
          color: Y.backdropColor
        };
      }
      v.push({
        label: x,
        font: L,
        textOffset: E,
        options: {
          rotation: b,
          color: Q,
          strokeColor: J,
          strokeWidth: lt,
          textAlign: vt,
          textBaseline: P,
          translation: [
            $,
            C
          ],
          backdrop: pt
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-me(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return n.align === "start" ? o = "left" : n.align === "end" ? o = "right" : n.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), l = t + s, d = i.widest.width;
    let c, u;
    return n === "left" ? o ? (u = this.right + s, a === "near" ? c = "left" : a === "center" ? (c = "center", u += d / 2) : (c = "right", u += d)) : (u = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", u -= d / 2) : (c = "left", u = this.left)) : n === "right" ? o ? (u = this.left + s, a === "near" ? c = "right" : a === "center" ? (c = "center", u -= d / 2) : (c = "left", u -= d)) : (u = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", u += d / 2) : (c = "right", u = this.right)) : c = "right", {
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
    const { ctx: t, options: { backgroundColor: n }, left: a, top: o, width: s, height: i } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(a, o, s, i), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const o = this.ticks.findIndex((s) => s.value === t);
    return o >= 0 ? n.setContext(this.getContext(o)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, a = this.ctx, o = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let s, i;
    const l = (d, c, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(d.x, d.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const d = o[s];
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
    const { chart: t, ctx: n, options: { border: a, grid: o } } = this, s = a.setContext(this.getContext()), i = a.display ? s.width : 0;
    if (!i)
      return;
    const l = o.setContext(this.getContext(0)).lineWidth, d = this._borderValue;
    let c, u, h, m;
    this.isHorizontal() ? (c = Ie(t, this.left, i) - i / 2, u = Ie(t, this.right, l) + l / 2, h = m = d) : (h = Ie(t, this.top, i) - i / 2, m = Ie(t, this.bottom, l) + l / 2, c = u = d), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(c, h), n.lineTo(u, m), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, o = this._computeLabelArea();
    o && Ya(a, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, d = i.font, c = i.label, u = i.textOffset;
      Sn(a, c, 0, u, d, l);
    }
    o && Ka(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const s = Yt(a.font), i = ae(a.padding), l = a.align;
    let d = s.lineHeight / 2;
    n === "bottom" || n === "center" || _t(n) ? (d += i.bottom, zt(a.text) && (d += s.lineHeight * (a.text.length - 1))) : d += i.top;
    const { titleX: c, titleY: u, maxWidth: h, rotation: m } = vd(this, d, n, l);
    Sn(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: h,
      rotation: m,
      textAlign: bd(l, n, o),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = ut(t.grid && t.grid.z, -1), o = ut(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== en.prototype.draw ? [
      {
        z: n,
        draw: (s) => {
          this.draw(s);
        }
      }
    ] : [
      {
        z: a,
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
        z: n,
        draw: (s) => {
          this.drawLabels(s);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", o = [];
    let s, i;
    for (s = 0, i = n.length; s < i; ++s) {
      const l = n[s];
      l[a] === this.id && (!t || l.type === t) && o.push(l);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return Yt(n.font);
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
    xd(n) && (a = this.register(n));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, yd(t, i, a), this.override && Et.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, o = this.scope;
    a in n && delete n[a], o && a in Et[o] && (delete Et[o][a], this.override && delete Ye[a]);
  }
}
function yd(e, t, n) {
  const a = kn(/* @__PURE__ */ Object.create(null), [
    n ? Et.get(n) : {},
    Et.get(t),
    e.defaults
  ]);
  Et.set(t, a), e.defaultRoutes && _d(t, e.defaultRoutes), e.descriptors && Et.describe(t, e.descriptors);
}
function _d(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), d = i.join(".");
    Et.route(s, o, d, l);
  });
}
function xd(e) {
  return "id" in e && "defaults" in e;
}
class kd {
  constructor() {
    this.controllers = new zn(oa, "datasets", !0), this.elements = new zn(ve, "elements"), this.plugins = new zn(Object, "plugins"), this.scales = new zn(en, "scales"), this._typedRegistries = [
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
    ].forEach((o) => {
      const s = a || this._getRegistryForType(o);
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : wt(o, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const o = Va(t);
    Dt(a["before" + o], [], a), n[t](a), Dt(a["after" + o], [], a);
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
    const o = n.get(t);
    if (o === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return o;
  }
}
var ce = /* @__PURE__ */ new kd();
class wd {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, a, o) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const s = o ? this._descriptors(t).filter(o) : this._descriptors(t), i = this._notify(s, t, n, a);
    return n === "afterDestroy" && (this._notify(s, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, n, a, o) {
    o = o || {};
    for (const s of t) {
      const i = s.plugin, l = i[a], d = [
        n,
        o,
        s.options
      ];
      if (Dt(l, d, i) === !1 && o.cancelable)
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
    const a = t && t.config, o = ut(a.options && a.options.plugins, {}), s = Cd(a);
    return o === !1 && !n ? [] : Md(t, s, o, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, o = (s, i) => s.filter((l) => !i.some((d) => l.plugin.id === d.plugin.id));
    this._notify(o(n, a), t, "stop"), this._notify(o(a, n), t, "start");
  }
}
function Cd(e) {
  const t = {}, n = [], a = Object.keys(ce.plugins.items);
  for (let s = 0; s < a.length; s++)
    n.push(ce.getPlugin(a[s]));
  const o = e.plugins || [];
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
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
function Md(e, { plugins: t, localIds: n }, a, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const d = l.id, c = $d(a[d], o);
    c !== null && s.push({
      plugin: l,
      options: Sd(e.config, {
        plugin: l,
        local: n[d]
      }, c, i)
    });
  }
  return s;
}
function Sd(e, { plugin: t, local: n }, a, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(a, s);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function La(e, t) {
  const n = Et.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Dd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Ad(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Zo(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Td(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Fa(e, ...t) {
  if (Zo(e))
    return e;
  for (const n of t) {
    const a = n.axis || Td(n.position) || e.length > 1 && Zo(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Qo(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Bd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return Qo(e, "x", n[0]) || Qo(e, "y", n[0]);
  }
  return {};
}
function Ld(e, t) {
  const n = Ye[e.type] || {
    scales: {}
  }, a = t.scales || {}, o = La(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!_t(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const d = Fa(i, l, Bd(i, e), Et.scales[l.type]), c = Ad(d, o), u = n.scales || {};
    s[i] = mn(/* @__PURE__ */ Object.create(null), [
      {
        axis: d
      },
      l,
      u[d],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, d = i.indexAxis || La(l, t), u = (Ye[l] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const m = Dd(h, d), _ = i[m + "AxisID"] || m;
      s[_] = s[_] || /* @__PURE__ */ Object.create(null), mn(s[_], [
        {
          axis: m
        },
        a[_],
        u[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    mn(l, [
      Et.scales[l.type],
      Et.scale
    ]);
  }), s;
}
function _i(e) {
  const t = e.options || (e.options = {});
  t.plugins = ut(t.plugins, {}), t.scales = Ld(e, t);
}
function xi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Fd(e) {
  return e = e || {}, e.data = xi(e.data), _i(e), e;
}
const Jo = /* @__PURE__ */ new Map(), ki = /* @__PURE__ */ new Set();
function Vn(e, t) {
  let n = Jo.get(e);
  return n || (n = t(), Jo.set(e, n), ki.add(n)), n;
}
const ln = (e, t, n) => {
  const a = He(t, n);
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
    return Vn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return Vn(`${t}.transition.${n}`, () => [
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
    return Vn(`${t}-${n}`, () => [
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
    return Vn(`${a}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const a = this._scopeCache;
    let o = a.get(t);
    return (!o || n) && (o = /* @__PURE__ */ new Map(), a.set(t, o)), o;
  }
  getOptionScopes(t, n, a) {
    const { options: o, type: s } = this, i = this._cachedScopes(t, a), l = i.get(n);
    if (l)
      return l;
    const d = /* @__PURE__ */ new Set();
    n.forEach((u) => {
      t && (d.add(t), u.forEach((h) => ln(d, t, h))), u.forEach((h) => ln(d, o, h)), u.forEach((h) => ln(d, Ye[s] || {}, h)), u.forEach((h) => ln(d, Et, h)), u.forEach((h) => ln(d, Ta, h));
    });
    const c = Array.from(d);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), ki.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Ye[n] || {},
      Et.datasets[n] || {},
      {
        type: n
      },
      Et,
      Ta
    ];
  }
  resolveNamedOptions(t, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = ts(this._resolverCache, t, o);
    let d = i;
    if (Id(i, n)) {
      s.$shared = !1, a = Te(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      d = Je(i, a, c);
    }
    for (const c of n)
      s[c] = d[c];
    return s;
  }
  createResolver(t, n, a = [
    ""
  ], o) {
    const { resolver: s } = ts(this._resolverCache, t, a);
    return _t(n) ? Je(s, n, void 0, o) : s;
  }
}
function ts(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const o = n.join();
  let s = a.get(o);
  return s || (s = {
    resolver: Ua(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(o, s)), s;
}
const Pd = (e) => _t(e) && Object.getOwnPropertyNames(e).some((t) => Te(e[t]));
function Id(e, t) {
  const { isScriptable: n, isIndexable: a } = oi(e);
  for (const o of t) {
    const s = n(o), i = a(o), l = (i || s) && e[o];
    if (s && (Te(l) || Pd(l)) || i && zt(l))
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
function es(e, t) {
  return e === "top" || e === "bottom" || Od.indexOf(e) === -1 && t === "x";
}
function ns(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function as(e) {
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
function wi(e) {
  return Za() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Kn = {}, os = (e) => {
  const t = wi(e);
  return Object.values(Kn).filter((n) => n.canvas === t).pop();
};
function Vd(e, t, n) {
  const a = Object.keys(e);
  for (const o of a) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (n > 0 || s > t) && (e[s + n] = i);
    }
  }
}
function Nd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Be = class {
  static defaults = Et;
  static instances = Kn;
  static overrides = Ye;
  static registry = ce;
  static version = Rd;
  static getChart = os;
  static register(...t) {
    ce.add(...t), ss();
  }
  static unregister(...t) {
    ce.remove(...t), ss();
  }
  constructor(t, n) {
    const a = this.config = new Ed(n), o = wi(t), s = os(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || sd(o))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(o, i.aspectRatio), d = l && l.canvas, c = d && d.height, u = d && d.width;
    if (this.id = Ll(), this.ctx = l, this.canvas = d, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new wd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Zl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Kn[this.id] = this, !l || !d) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    fe.listen(this, "complete", as), fe.listen(this, "progress", zd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return kt(t) ? n && s ? s : o ? a / o : null : t;
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : So(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Co(this.canvas, this.ctx), this;
  }
  stop() {
    return fe.stop(this), this;
  }
  resize(t, n) {
    fe.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, o = this.canvas, s = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, n, s), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), d = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, So(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Dt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(d) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    wt(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, o = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    n && (s = s.concat(Object.keys(n).map((i) => {
      const l = n[i], d = Fa(i, l), c = d === "r", u = d === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), wt(s, (i) => {
      const l = i.options, d = l.id, c = Fa(d, l), u = ut(l.type, i.dtype);
      (l.position === void 0 || es(l.position, c) !== es(i.dposition)) && (l.position = i.dposition), o[d] = !0;
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
    }), wt(o, (i, l) => {
      i || delete a[l];
    }), wt(a, (i) => {
      ee.configure(this, i, i.options), ee.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(ns("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((a, o) => {
      n.filter((s) => s === a._dataset).length === 0 && this._destroyDatasetMeta(o);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let a, o;
    for (this._removeUnreferencedMetasets(), a = 0, o = n.length; a < o; a++) {
      const s = n[a];
      let i = this.getDatasetMeta(a);
      const l = s.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = s.indexAxis || La(l, this.options), i.order = s.order || 0, i.index = a, i.label = "" + s.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const d = ce.getController(l), { datasetElementType: c, dataElementType: u } = Et.datasets[l];
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
    const a = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), o = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const s = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: h } = this.getDatasetMeta(c), m = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(m), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || wt(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ns("z", "_idx"));
    const { _active: l, _lastEvent: d } = this;
    d ? this._eventHandler(d, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    wt(this.scales, (t) => {
      ee.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!go(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: o, count: s } of n) {
      const i = a === "_removeElements" ? -s : s;
      Vd(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = a(0);
    for (let s = 1; s < n; s++)
      if (!go(o, a(s)))
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
    ee.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], wt(this.boxes, (o) => {
      a && o.position === "chartArea" || (o.configure && o.configure(), this._layers.push(...o._layers()));
    }, this), this._layers.forEach((o, s) => {
      o._idx = s;
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
        this._updateDataset(n, Te(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const a = this.getDatasetMeta(t), o = {
      meta: a,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", o) !== !1 && (a.controller._update(n), o.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", o));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (fe.has(this) ? this.attached && !fe.running(this) && fe.start(this) : (this.draw(), as({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: o } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, o);
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
    let o, s;
    for (o = 0, s = n.length; o < s; ++o) {
      const i = n[o];
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
    }, o = ac(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (o && Ya(n, o), t.controller.draw(), o && Ka(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Mn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, o) {
    const s = Oc.modes[n];
    return typeof s == "function" ? s(this, t, a, o) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], a = this._metasets;
    let o = a.filter((s) => s && s._dataset === n).pop();
    return o || (o = {
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
    }, a.push(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Ke(null, {
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
    const o = a ? "show" : "hide", s = this.getDatasetMeta(t), i = s.controller._resolveAnimations(void 0, o);
    wn(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(s, {
      visible: a
    }), this.update((l) => l.datasetIndex === t ? o : void 0));
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
    for (this.stop(), fe.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Co(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Kn[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, a = (s, i) => {
      n.addEventListener(this, s, i), t[s] = i;
    }, o = (s, i, l) => {
      s.offsetX = i, s.offsetY = l, this._eventHandler(s);
    };
    wt(this.options.events, (s) => a(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (d, c) => {
      n.addEventListener(this, d, c), t[d] = c;
    }, o = (d, c) => {
      t[d] && (n.removeEventListener(this, d, c), delete t[d]);
    }, s = (d, c) => {
      this.canvas && this.resize(d, c);
    };
    let i;
    const l = () => {
      o("attach", l), this.attached = !0, this.resize(), a("resize", s), a("detach", i);
    };
    i = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), a("attach", l);
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
    const o = a ? "set" : "remove";
    let s, i, l, d;
    for (n === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), l = 0, d = t.length; l < d; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], a = t.map(({ datasetIndex: s, index: i }) => {
      const l = this.getDatasetMeta(s);
      if (!l)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
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
    const o = this.options.hover, s = (d, c) => d.filter((u) => !c.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = s(n, t), l = a ? t : s(t, n);
    i.length && this.updateHoverStyle(i, o.mode, !1), l.length && o.mode && this.updateHoverStyle(l, o.mode, !0);
  }
  _eventHandler(t, n) {
    const a = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, o = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, o) === !1)
      return;
    const s = this._handleEvent(t, n, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, o), (s || a.changed) && this.render(), this;
  }
  _handleEvent(t, n, a) {
    const { _active: o = [], options: s } = this, i = n, l = this._getActiveElements(t, o, a, i), d = Ol(t), c = Nd(t, this._lastEvent, a, d);
    a && (this._lastEvent = null, Dt(s.onHover, [
      t,
      l,
      this
    ], this), d && Dt(s.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Gn(l, o);
    return (u || n) && (this._active = l, this._updateHoverStyles(l, o, n)), this._lastEvent = c, u;
  }
  _getActiveElements(t, n, a, o) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return n;
    const s = this.options.hover;
    return this.getElementsAtEventForMode(t, s.mode, s, o);
  }
};
function ss() {
  return wt(Be.instances, (e) => e._plugins.invalidate());
}
function jd(e, t, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: l, options: d } = t, { borderWidth: c, borderJoinStyle: u } = d, h = Math.min(c / i, se(a - n));
  if (e.beginPath(), e.arc(o, s, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const m = Math.min(c / l, se(a - n));
    e.arc(o, s, l + c / 2, n - m / 2, a + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * se(a - n));
    if (u === "round")
      e.arc(o, s, m, n - Ct / 2, a + Ct / 2, !0);
    else if (u === "bevel") {
      const _ = 2 * m * m, p = -_ * Math.cos(n + Ct / 2) + o, b = -_ * Math.sin(n + Ct / 2) + s, v = _ * Math.cos(a + Ct / 2) + o, g = _ * Math.sin(a + Ct / 2) + s;
      e.lineTo(p, b), e.lineTo(v, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Wd(e, t, n) {
  const { startAngle: a, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: d } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, a - c, n + c), d > o ? (c = o / d, e.arc(s, i, d, n + c, a - c, !0)) : e.arc(s, i, o, n + Vt, a - Vt), e.closePath(), e.clip();
}
function Hd(e) {
  return qa(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Yd(e, t, n, a) {
  const o = Hd(e.options.borderRadius), s = (n - t) / 2, i = Math.min(s, a * t / 2), l = (d) => {
    const c = (n - Math.min(s, d)) * a / 2;
    return Ht(d, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: Ht(o.innerStart, 0, i),
    innerEnd: Ht(o.innerEnd, 0, i)
  };
}
function Ue(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function na(e, t, n, a, o, s) {
  const { x: i, y: l, startAngle: d, pixelMargin: c, innerRadius: u } = t, h = Math.max(t.outerRadius + a + n - c, 0), m = u > 0 ? u + a + n + c : 0;
  let _ = 0;
  const p = o - d;
  if (a) {
    const Y = u > 0 ? u - a : 0, W = h > 0 ? h - a : 0, Q = (Y + W) / 2, J = Q !== 0 ? p * Q / (Q + a) : p;
    _ = (p - J) / 2;
  }
  const b = Math.max(1e-3, p * h - n / Ct) / h, v = (p - b) / 2, g = d + v + _, f = o - v - _, { outerStart: k, outerEnd: x, innerStart: $, innerEnd: C } = Yd(t, m, h, f - g), M = h - k, S = h - x, L = g + k / M, T = f - x / S, B = m + $, E = m + C, P = g + $ / B, N = f - C / E;
  if (e.beginPath(), s) {
    const Y = (L + T) / 2;
    if (e.arc(i, l, h, L, Y), e.arc(i, l, h, Y, T), x > 0) {
      const lt = Ue(S, T, i, l);
      e.arc(lt.x, lt.y, x, T, f + Vt);
    }
    const W = Ue(E, f, i, l);
    if (e.lineTo(W.x, W.y), C > 0) {
      const lt = Ue(E, N, i, l);
      e.arc(lt.x, lt.y, C, f + Vt, N + Math.PI);
    }
    const Q = (f - C / m + (g + $ / m)) / 2;
    if (e.arc(i, l, m, f - C / m, Q, !0), e.arc(i, l, m, Q, g + $ / m, !0), $ > 0) {
      const lt = Ue(B, P, i, l);
      e.arc(lt.x, lt.y, $, P + Math.PI, g - Vt);
    }
    const J = Ue(M, g, i, l);
    if (e.lineTo(J.x, J.y), k > 0) {
      const lt = Ue(M, L, i, l);
      e.arc(lt.x, lt.y, k, g - Vt, L);
    }
  } else {
    e.moveTo(i, l);
    const Y = Math.cos(L) * h + i, W = Math.sin(L) * h + l;
    e.lineTo(Y, W);
    const Q = Math.cos(T) * h + i, J = Math.sin(T) * h + l;
    e.lineTo(Q, J);
  }
  e.closePath();
}
function Kd(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let d = t.endAngle;
  if (s) {
    na(e, t, n, a, d, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (d = i + (l % Lt || Lt));
  }
  return na(e, t, n, a, d, o), e.fill(), d;
}
function qd(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: d } = t, { borderWidth: c, borderJoinStyle: u, borderDash: h, borderDashOffset: m, borderRadius: _ } = d, p = d.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = m, p ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (s) {
    na(e, t, n, a, b, o);
    for (let v = 0; v < s; ++v)
      e.stroke();
    isNaN(l) || (b = i + (l % Lt || Lt));
  }
  p && Wd(e, t, b), d.selfJoin && b - i >= Ct && _ === 0 && u !== "miter" && jd(e, t, b), s || (na(e, t, n, a, b, o), e.stroke());
}
class Ud extends ve {
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
    const o = this.getProps([
      "x",
      "y"
    ], a), { angle: s, distance: i } = Gs(o, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: d, innerRadius: c, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), m = (this.options.spacing + this.options.borderWidth) / 2, _ = ut(h, d - l), p = $n(s, l, d) && l !== d, b = _ >= Lt || p, v = Me(i, c + m, u + m);
    return b && v;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: o, endAngle: s, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: d, spacing: c } = this.options, u = (o + s) / 2, h = (i + l + c + d) / 2;
    return {
      x: n + Math.cos(u) * h,
      y: a + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, o = (n.offset || 0) / 4, s = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Lt ? Math.floor(a / Lt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const d = 1 - Math.sin(Math.min(Ct, a || 0)), c = o * d;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, Kd(t, this, c, s, i), qd(t, this, c, s, i), t.restore();
  }
}
function Ci(e, t, n = t) {
  e.lineCap = ut(n.borderCapStyle, t.borderCapStyle), e.setLineDash(ut(n.borderDash, t.borderDash)), e.lineDashOffset = ut(n.borderDashOffset, t.borderDashOffset), e.lineJoin = ut(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ut(n.borderWidth, t.borderWidth), e.strokeStyle = ut(n.borderColor, t.borderColor);
}
function Xd(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Gd(e) {
  return e.stepped ? ur : e.tension || e.cubicInterpolationMode === "monotone" ? hr : Xd;
}
function $i(e, t, n = {}) {
  const a = e.length, { start: o = 0, end: s = a - 1 } = n, { start: i, end: l } = t, d = Math.max(o, i), c = Math.min(s, l), u = o < i && s < i || o > l && s > l;
  return {
    count: a,
    start: d,
    loop: t.loop,
    ilen: c < d && !u ? a + c - d : c - d
  };
}
function Zd(e, t, n, a) {
  const { points: o, options: s } = t, { count: i, start: l, loop: d, ilen: c } = $i(o, n, a), u = Gd(s);
  let { move: h = !0, reverse: m } = a || {}, _, p, b;
  for (_ = 0; _ <= c; ++_)
    p = o[(l + (m ? c - _ : _)) % i], !p.skip && (h ? (e.moveTo(p.x, p.y), h = !1) : u(e, b, p, m, s.stepped), b = p);
  return d && (p = o[(l + (m ? c : 0)) % i], u(e, b, p, m, s.stepped)), !!d;
}
function Qd(e, t, n, a) {
  const o = t.points, { count: s, start: i, ilen: l } = $i(o, n, a), { move: d = !0, reverse: c } = a || {};
  let u = 0, h = 0, m, _, p, b, v, g;
  const f = (x) => (i + (c ? l - x : x)) % s, k = () => {
    b !== v && (e.lineTo(u, v), e.lineTo(u, b), e.lineTo(u, g));
  };
  for (d && (_ = o[f(0)], e.moveTo(_.x, _.y)), m = 0; m <= l; ++m) {
    if (_ = o[f(m)], _.skip)
      continue;
    const x = _.x, $ = _.y, C = x | 0;
    C === p ? ($ < b ? b = $ : $ > v && (v = $), u = (h * u + x) / ++h) : (k(), e.lineTo(x, $), p = C, h = 0, b = v = $), g = $;
  }
  k();
}
function Ea(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Qd : Zd;
}
function Jd(e) {
  return e.stepped ? Hr : e.tension || e.cubicInterpolationMode === "monotone" ? Yr : Ve;
}
function tu(e, t, n, a) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, n, a) && o.closePath()), Ci(e, t.options), e.stroke(o);
}
function eu(e, t, n, a) {
  const { segments: o, options: s } = t, i = Ea(t);
  for (const l of o)
    Ci(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const nu = typeof Path2D == "function";
function au(e, t, n, a) {
  nu && !t.options.segment ? tu(e, t, n, a) : eu(e, t, n, a);
}
class ou extends ve {
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
      const o = a.spanGaps ? this._loop : this._fullLoop;
      Ir(this._points, a, t, o, n), this._pointsUpdated = !0;
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
    const a = this.options, o = t[n], s = this.points, i = Gr(this, {
      property: n,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], d = Jd(a);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: h, end: m } = i[c], _ = s[h], p = s[m];
      if (_ === p) {
        l.push(_);
        continue;
      }
      const b = Math.abs((o - _[n]) / (p[n] - _[n])), v = d(_, p, b, a.stepped);
      v[n] = t[n], l.push(v);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Ea(this)(t, this, n, a);
  }
  path(t, n, a) {
    const o = this.segments, s = Ea(this);
    let i = this._loop;
    n = n || 0, a = a || this.points.length - n;
    for (const l of o)
      i &= s(t, this, l, {
        start: n,
        end: n + a - 1
      });
    return !!i;
  }
  draw(t, n, a, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (t.save(), au(t, this, a, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function is(e, t, n, a) {
  const o = e.options, { [n]: s } = e.getProps([
    n
  ], a);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class su extends ve {
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
    const o = this.options, { x: s, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - s, 2) + Math.pow(n - i, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(t, n) {
    return is(this, t, "x", n);
  }
  inYRange(t, n) {
    return is(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Mn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ba(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Mi(e, t) {
  const { x: n, y: a, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, d, c, u, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, o), d = Math.max(n, o), c = a - h, u = a + h) : (h = s / 2, l = n - h, d = n + h, c = Math.min(a, o), u = Math.max(a, o)), {
    left: l,
    top: c,
    right: d,
    bottom: u
  };
}
function De(e, t, n, a) {
  return e ? 0 : Ht(t, n, a);
}
function iu(e, t, n) {
  const a = e.options.borderWidth, o = e.borderSkipped, s = ai(a);
  return {
    t: De(o.top, s.top, 0, n),
    r: De(o.right, s.right, 0, t),
    b: De(o.bottom, s.bottom, 0, n),
    l: De(o.left, s.left, 0, t)
  };
}
function lu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = Ze(o), i = Math.min(t, n), l = e.borderSkipped, d = a || _t(o);
  return {
    topLeft: De(!d || l.top || l.left, s.topLeft, 0, i),
    topRight: De(!d || l.top || l.right, s.topRight, 0, i),
    bottomLeft: De(!d || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: De(!d || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function ru(e) {
  const t = Mi(e), n = t.right - t.left, a = t.bottom - t.top, o = iu(e, n / 2, a / 2), s = lu(e, n / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: a,
      radius: s
    },
    inner: {
      x: t.left + o.l,
      y: t.top + o.t,
      w: n - o.l - o.r,
      h: a - o.t - o.b,
      radius: {
        topLeft: Math.max(0, s.topLeft - Math.max(o.t, o.l)),
        topRight: Math.max(0, s.topRight - Math.max(o.t, o.r)),
        bottomLeft: Math.max(0, s.bottomLeft - Math.max(o.b, o.l)),
        bottomRight: Math.max(0, s.bottomRight - Math.max(o.b, o.r))
      }
    }
  };
}
function ya(e, t, n, a) {
  const o = t === null, s = n === null, l = e && !(o && s) && Mi(e, a);
  return l && (o || Me(t, l.left, l.right)) && (s || Me(n, l.top, l.bottom));
}
function cu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function du(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function _a(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, o = e.y !== n.y ? -t : 0, s = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - o;
  return {
    x: e.x + a,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class uu extends ve {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = ru(this), l = cu(i.radius) ? Jn : du;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, _a(i, n, s)), t.clip(), l(t, _a(s, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, _a(s, n)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return ya(this, t, n, a);
  }
  inXRange(t, n) {
    return ya(this, t, null, n);
  }
  inYRange(t, n) {
    return ya(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: a, base: o, horizontal: s } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: s ? (n + o) / 2 : n,
      y: s ? a : (a + o) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
const ls = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, hu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class rs extends ve {
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
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, o) => t.sort(a, o, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, o = Yt(a.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: d } = ls(a, s);
    let c, u;
    n.font = o.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, s, l, d) + 10) : (u = this.maxHeight, c = this._fitCols(i, o, l, d) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, d = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = o + l;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let m = -1, _ = -u;
    return this.legendItems.forEach((p, b) => {
      const v = a + n / 2 + s.measureText(p.text).width;
      (b === 0 || c[c.length - 1] + v + 2 * l > i) && (h += u, c[c.length - (b > 0 ? 0 : 1)] = 0, _ += u, m++), d[b] = {
        left: 0,
        top: _,
        row: m,
        width: v,
        height: o
      }, c[c.length - 1] += v + l;
    }), h;
  }
  _fitCols(t, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, d = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let h = l, m = 0, _ = 0, p = 0, b = 0;
    return this.legendItems.forEach((v, g) => {
      const { itemWidth: f, itemHeight: k } = fu(a, n, s, v, o);
      g > 0 && _ + k + 2 * l > u && (h += m + l, c.push({
        width: m,
        height: _
      }), p += m + l, b++, m = _ = 0), d[g] = {
        left: p,
        top: _,
        col: b,
        width: f,
        height: k
      }, m = Math.max(m, f), _ += k + l;
    }), h += m, c.push({
      width: m,
      height: _
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: o }, rtl: s } } = this, i = Qe(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, d = Wt(a, this.left + o, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, d = Wt(a, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(d), c.width), d += c.width + o;
    } else {
      let l = 0, d = Wt(a, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, d = Wt(a, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = d, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), d += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ya(t, this), this._draw(), Ka(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: o } = this, { align: s, labels: i } = t, l = Et.color, d = Qe(t.rtl, this.left, this.width), c = Yt(i.font), { padding: u } = i, h = c.size, m = h / 2;
    let _;
    this.drawTitle(), o.textAlign = d.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: p, boxHeight: b, itemHeight: v } = ls(i, h), g = function(C, M, S) {
      if (isNaN(p) || p <= 0 || isNaN(b) || b < 0)
        return;
      o.save();
      const L = ut(S.lineWidth, 1);
      if (o.fillStyle = ut(S.fillStyle, l), o.lineCap = ut(S.lineCap, "butt"), o.lineDashOffset = ut(S.lineDashOffset, 0), o.lineJoin = ut(S.lineJoin, "miter"), o.lineWidth = L, o.strokeStyle = ut(S.strokeStyle, l), o.setLineDash(ut(S.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: S.pointStyle,
          rotation: S.rotation,
          borderWidth: L
        }, B = d.xPlus(C, p / 2), E = M + m;
        ni(o, T, B, E, i.pointStyleWidth && p);
      } else {
        const T = M + Math.max((h - b) / 2, 0), B = d.leftForLtr(C, p), E = Ze(S.borderRadius);
        o.beginPath(), Object.values(E).some((P) => P !== 0) ? Jn(o, {
          x: B,
          y: T,
          w: p,
          h: b,
          radius: E
        }) : o.rect(B, T, p, b), o.fill(), L !== 0 && o.stroke();
      }
      o.restore();
    }, f = function(C, M, S) {
      Sn(o, S.text, C, M + v / 2, c, {
        strikethrough: S.hidden,
        textAlign: d.textAlign(S.textAlign)
      });
    }, k = this.isHorizontal(), x = this._computeTitleHeight();
    k ? _ = {
      x: Wt(s, this.left + u, this.right - a[0]),
      y: this.top + u + x,
      line: 0
    } : _ = {
      x: this.left + u,
      y: Wt(s, this.top + x + u, this.bottom - n[0].height),
      line: 0
    }, ci(this.ctx, t.textDirection);
    const $ = v + u;
    this.legendItems.forEach((C, M) => {
      o.strokeStyle = C.fontColor, o.fillStyle = C.fontColor;
      const S = o.measureText(C.text).width, L = d.textAlign(C.textAlign || (C.textAlign = i.textAlign)), T = p + m + S;
      let B = _.x, E = _.y;
      d.setWidth(this.width), k ? M > 0 && B + T + u > this.right && (E = _.y += $, _.line++, B = _.x = Wt(s, this.left + u, this.right - a[_.line])) : M > 0 && E + $ > this.bottom && (B = _.x = B + n[_.line].width + u, _.line++, E = _.y = Wt(s, this.top + x + u, this.bottom - n[_.line].height));
      const P = d.x(B);
      if (g(P, E, C), B = Ql(L, B + p + m, k ? B + T : this.right, t.rtl), f(d.x(B), E, C), k)
        _.x += T + u;
      else if (typeof C.text != "string") {
        const N = c.lineHeight;
        _.y += Si(C, N) + u;
      } else
        _.y += $;
    }), di(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Yt(n.font), o = ae(n.padding);
    if (!n.display)
      return;
    const s = Qe(t.rtl, this.left, this.width), i = this.ctx, l = n.position, d = a.size / 2, c = o.top + d;
    let u, h = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), u = this.top + c, h = Wt(t.align, h, this.right - m);
    else {
      const p = this.columnSizes.reduce((b, v) => Math.max(b, v.height), 0);
      u = c + Wt(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const _ = Wt(l, h, h + m);
    i.textAlign = s.textAlign(ja(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Sn(i, n.text, _, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Yt(t.font), a = ae(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, o, s;
    if (Me(t, this.left, this.right) && Me(n, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, a = 0; a < s.length; ++a)
        if (o = s[a], Me(t, o.left, o.left + o.width) && Me(n, o.top, o.top + o.height))
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
      const o = this._hoveredItem, s = hu(o, a);
      o && !s && Dt(n.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Dt(n.onHover, [
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
function fu(e, t, n, a, o) {
  const s = gu(a, e, t, n), i = pu(o, a, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function gu(e, t, n, a) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + n.size / 2 + a.measureText(o).width;
}
function pu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Si(t, n)), a;
}
function Si(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function mu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var to = {
  id: "legend",
  _element: rs,
  start(e, t, n) {
    const a = e.legend = new rs({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ee.configure(e, a, n), ee.addBox(e, a);
  },
  stop(e) {
    ee.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ee.configure(e, a, n), a.options = n;
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
      const a = t.datasetIndex, o = n.chart;
      o.isDatasetVisible(a) ? (o.hide(a), t.hidden = !0) : (o.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: a, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((d) => {
          const c = d.controller.getStyle(n ? 0 : void 0), u = ae(c.borderWidth);
          return {
            text: t[d.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !d.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
            rotation: c.rotation,
            textAlign: o || c.textAlign,
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
class Di extends ve {
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
    const o = zt(a.text) ? a.text.length : 1;
    this._padding = ae(a.padding);
    const s = o * Yt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: o, right: s, options: i } = this, l = i.align;
    let d = 0, c, u, h;
    return this.isHorizontal() ? (u = Wt(l, a, s), h = n + t, c = s - a) : (i.position === "left" ? (u = a + t, h = Wt(l, o, n), d = Ct * -0.5) : (u = s - t, h = Wt(l, n, o), d = Ct * 0.5), c = o - n), {
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
    const a = Yt(n.font), s = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: d, rotation: c } = this._drawArgs(s);
    Sn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: d,
      rotation: c,
      textAlign: ja(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function bu(e, t) {
  const n = new Di({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ee.configure(e, n, t), ee.addBox(e, n), e.titleBlock = n;
}
var Ai = {
  id: "title",
  _element: Di,
  start(e, t, n) {
    bu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ee.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ee.configure(e, a, n), a.options = n;
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
const gn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const d = l.tooltipPosition();
        a.add(d.x), o += d.y, ++s;
      }
    }
    return s === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, d) => l + d) / a.size,
      y: o / s
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, o = Number.POSITIVE_INFINITY, s, i, l;
    for (s = 0, i = e.length; s < i; ++s) {
      const d = e[s].element;
      if (d && d.hasValue()) {
        const c = d.getCenterPoint(), u = Aa(t, c);
        u < o && (o = u, l = d);
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
  return t && (zt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ge(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function vu(e, t) {
  const { element: n, datasetIndex: a, index: o } = t, s = e.getDatasetMeta(a).controller, { label: i, value: l } = s.getLabelAndValue(o);
  return {
    chart: e,
    label: i,
    parsed: s.getParsed(o),
    raw: e.data.datasets[a].data[o],
    formattedValue: l,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: a,
    element: n
  };
}
function cs(e, t) {
  const n = e.chart.ctx, { body: a, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, d = Yt(t.bodyFont), c = Yt(t.titleFont), u = Yt(t.footerFont), h = s.length, m = o.length, _ = a.length, p = ae(t.padding);
  let b = p.height, v = 0, g = a.reduce((x, $) => x + $.before.length + $.lines.length + $.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (b += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const x = t.displayColors ? Math.max(l, d.lineHeight) : d.lineHeight;
    b += _ * x + (g - _) * d.lineHeight + (g - 1) * t.bodySpacing;
  }
  m && (b += t.footerMarginTop + m * u.lineHeight + (m - 1) * t.footerSpacing);
  let f = 0;
  const k = function(x) {
    v = Math.max(v, n.measureText(x).width + f);
  };
  return n.save(), n.font = c.string, wt(e.title, k), n.font = d.string, wt(e.beforeBody.concat(e.afterBody), k), f = t.displayColors ? i + 2 + t.boxPadding : 0, wt(a, (x) => {
    wt(x.before, k), wt(x.lines, k), wt(x.after, k);
  }), f = 0, n.font = u.string, wt(e.footer, k), n.restore(), v += p.width, {
    width: v,
    height: b
  };
}
function yu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function _u(e, t, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function xu(e, t, n, a) {
  const { x: o, width: s } = n, { width: i, chartArea: { left: l, right: d } } = e;
  let c = "center";
  return a === "center" ? c = o <= (l + d) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), _u(c, e, t, n) && (c = "center"), c;
}
function ds(e, t, n) {
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
  let { y: a, height: o } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= o + n : a -= o / 2, a;
}
function us(e, t, n, a) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: d } = n, c = o + s, { topLeft: u, topRight: h, bottomLeft: m, bottomRight: _ } = Ze(i);
  let p = ku(t, l);
  const b = wu(t, d, c);
  return d === "center" ? l === "left" ? p += c : l === "right" && (p -= c) : l === "left" ? p -= Math.max(u, m) + o : l === "right" && (p += Math.max(h, _) + o), {
    x: Ht(p, 0, a.width - t.width),
    y: Ht(b, 0, a.height - t.height)
  };
}
function Nn(e, t, n) {
  const a = ae(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function hs(e) {
  return re([], ge(e));
}
function Cu(e, t, n) {
  return Ke(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function fs(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Ti = {
  beforeTitle: he,
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
  afterTitle: he,
  beforeBody: he,
  beforeLabel: he,
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
  afterLabel: he,
  afterBody: he,
  beforeFooter: he,
  footer: he,
  afterFooter: he
};
function Ut(e, t, n, a) {
  const o = e[t].call(n, a);
  return typeof o > "u" ? Ti[t].call(n, a) : o;
}
class gs extends ve {
  static positioners = gn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new hi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Cu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, o = Ut(a, "beforeTitle", this, t), s = Ut(a, "title", this, t), i = Ut(a, "afterTitle", this, t);
    let l = [];
    return l = re(l, ge(o)), l = re(l, ge(s)), l = re(l, ge(i)), l;
  }
  getBeforeBody(t, n) {
    return hs(Ut(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, o = [];
    return wt(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = fs(a, s);
      re(i.before, ge(Ut(l, "beforeLabel", this, s))), re(i.lines, Ut(l, "label", this, s)), re(i.after, ge(Ut(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, n) {
    return hs(Ut(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, o = Ut(a, "beforeFooter", this, t), s = Ut(a, "footer", this, t), i = Ut(a, "afterFooter", this, t);
    let l = [];
    return l = re(l, ge(o)), l = re(l, ge(s)), l = re(l, ge(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, o = [], s = [], i = [];
    let l = [], d, c;
    for (d = 0, c = n.length; d < c; ++d)
      l.push(vu(this.chart, n[d]));
    return t.filter && (l = l.filter((u, h, m) => t.filter(u, h, m, a))), t.itemSort && (l = l.sort((u, h) => t.itemSort(u, h, a))), wt(l, (u) => {
      const h = fs(t.callbacks, u);
      o.push(Ut(h, "labelColor", this, u)), s.push(Ut(h, "labelPointStyle", this, u)), i.push(Ut(h, "labelTextColor", this, u));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, n) {
    const a = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const l = gn[a.position].call(this, o, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const d = this._size = cs(this, a), c = Object.assign({}, l, d), u = ds(this.chart, a, c), h = us(a, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, s = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: d.width,
        height: d.height,
        caretX: l.x,
        caretY: l.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, s && this._resolveAnimations().update(this, s), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, a, o) {
    const s = this.getCaretPosition(t, a, o);
    n.lineTo(s.x1, s.y1), n.lineTo(s.x2, s.y2), n.lineTo(s.x3, s.y3);
  }
  getCaretPosition(t, n, a) {
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: d, topRight: c, bottomLeft: u, bottomRight: h } = Ze(l), { x: m, y: _ } = t, { width: p, height: b } = n;
    let v, g, f, k, x, $;
    return s === "center" ? (x = _ + b / 2, o === "left" ? (v = m, g = v - i, k = x + i, $ = x - i) : (v = m + p, g = v + i, k = x - i, $ = x + i), f = v) : (o === "left" ? g = m + Math.max(d, u) + i : o === "right" ? g = m + p - Math.max(c, h) - i : g = this.caretX, s === "top" ? (k = _, x = k - i, v = g - i, f = g + i) : (k = _ + b, x = k + i, v = g + i, f = g - i), $ = k), {
      x1: v,
      x2: g,
      x3: f,
      y1: k,
      y2: x,
      y3: $
    };
  }
  drawTitle(t, n, a) {
    const o = this.title, s = o.length;
    let i, l, d;
    if (s) {
      const c = Qe(a.rtl, this.x, this.width);
      for (t.x = Nn(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Yt(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, d = 0; d < s; ++d)
        n.fillText(o[d], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, d + 1 === s && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, o, s) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: d, boxWidth: c } = s, u = Yt(s.bodyFont), h = Nn(this, "left", s), m = o.x(h), _ = d < u.lineHeight ? (u.lineHeight - d) / 2 : 0, p = n.y + _;
    if (s.usePointStyle) {
      const b = {
        radius: Math.min(c, d) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = o.leftForLtr(m, c) + c / 2, g = p + d / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Ba(t, b, v, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ba(t, b, v, g);
    } else {
      t.lineWidth = _t(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = o.leftForLtr(m, c), v = o.leftForLtr(o.xPlus(m, 1), c - 2), g = Ze(i.borderRadius);
      Object.values(g).some((f) => f !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, Jn(t, {
        x: b,
        y: p,
        w: c,
        h: d,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Jn(t, {
        x: v,
        y: p + 1,
        w: c - 2,
        h: d - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(b, p, c, d), t.strokeRect(b, p, c, d), t.fillStyle = i.backgroundColor, t.fillRect(v, p + 1, c - 2, d - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: d, boxWidth: c, boxPadding: u } = a, h = Yt(a.bodyFont);
    let m = h.lineHeight, _ = 0;
    const p = Qe(a.rtl, this.x, this.width), b = function(S) {
      n.fillText(S, p.x(t.x + _), t.y + m / 2), t.y += m + s;
    }, v = p.textAlign(i);
    let g, f, k, x, $, C, M;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Nn(this, v, a), n.fillStyle = a.bodyColor, wt(this.beforeBody, b), _ = l && v !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, x = 0, C = o.length; x < C; ++x) {
      for (g = o[x], f = this.labelTextColors[x], n.fillStyle = f, wt(g.before, b), k = g.lines, l && k.length && (this._drawColorBox(n, t, x, p, a), m = Math.max(h.lineHeight, d)), $ = 0, M = k.length; $ < M; ++$)
        b(k[$]), m = h.lineHeight;
      wt(g.after, b);
    }
    _ = 0, m = h.lineHeight, wt(this.afterBody, b), t.y -= s;
  }
  drawFooter(t, n, a) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const d = Qe(a.rtl, this.x, this.width);
      for (t.x = Nn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = d.textAlign(a.footerAlign), n.textBaseline = "middle", i = Yt(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: d } = t, { width: c, height: u } = a, { topLeft: h, topRight: m, bottomLeft: _, bottomRight: p } = Ze(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(l + h, d), i === "top" && this.drawCaret(t, n, a, o), n.lineTo(l + c - m, d), n.quadraticCurveTo(l + c, d, l + c, d + m), i === "center" && s === "right" && this.drawCaret(t, n, a, o), n.lineTo(l + c, d + u - p), n.quadraticCurveTo(l + c, d + u, l + c - p, d + u), i === "bottom" && this.drawCaret(t, n, a, o), n.lineTo(l + _, d + u), n.quadraticCurveTo(l, d + u, l, d + u - _), i === "center" && s === "left" && this.drawCaret(t, n, a, o), n.lineTo(l, d + h), n.quadraticCurveTo(l, d, l + h, d), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = gn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = cs(this, t), d = Object.assign({}, i, this._size), c = ds(n, t, d), u = us(t, d, c, n);
      (o._to !== u.x || s._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
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
    const o = {
      width: this.width,
      height: this.height
    }, s = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const i = ae(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(s, t, o, n), ci(t, n.textDirection), s.y += i.top, this.drawTitle(s, t, n), this.drawBody(s, t, n), this.drawFooter(s, t, n), di(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, o = t.map(({ datasetIndex: l, index: d }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[d],
        index: d
      };
    }), s = !Gn(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, n, a), l = this._positionChanged(i, t), d = n || !Gn(i, s) || l;
    return d && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), d;
  }
  _getActiveElements(t, n, a, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!o)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, s.mode, s, a);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(t, n) {
    const { caretX: a, caretY: o, options: s } = this, i = gn[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var eo = {
  id: "tooltip",
  _element: gs,
  positioners: gn,
  afterInit(e, t, n) {
    n && (e.tooltip = new gs({
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
const $u = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Mu(e, t, n, a) {
  const o = e.indexOf(t);
  if (o === -1)
    return $u(e, t, n, a);
  const s = e.lastIndexOf(t);
  return o !== s ? n : o;
}
const Su = (e, t) => e === null ? null : Ht(Math.round(e), 0, t);
function ps(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Bi extends en {
  static id = "category";
  static defaults = {
    ticks: {
      callback: ps
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const a = this.getLabels();
      for (const { index: o, label: s } of n)
        a[o] === s && a.splice(o, 1);
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
    let { min: a, max: o } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), n || (o = this.getLabels().length - 1)), this.min = a, this.max = o;
  }
  buildTicks() {
    const t = this.min, n = this.max, a = this.options.offset, o = [];
    let s = this.getLabels();
    s = t === 0 && n === s.length - 1 ? s : s.slice(t, n + 1), this._valueRange = Math.max(s.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= n; i++)
      o.push({
        value: i
      });
    return o;
  }
  getLabelForValue(t) {
    return ps.call(this, t);
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
  const n = [], { bounds: o, step: s, min: i, max: l, precision: d, count: c, maxTicks: u, maxDigits: h, includeBounds: m } = e, _ = s || 1, p = u - 1, { min: b, max: v } = t, g = !kt(i), f = !kt(l), k = !kt(c), x = (v - b) / (h + 1);
  let $ = mo((v - b) / p / _) * _, C, M, S, L;
  if ($ < 1e-14 && !g && !f)
    return [
      {
        value: b
      },
      {
        value: v
      }
    ];
  L = Math.ceil(v / $) - Math.floor(b / $), L > p && ($ = mo(L * $ / p / _) * _), kt(d) || (C = Math.pow(10, d), $ = Math.ceil($ * C) / C), o === "ticks" ? (M = Math.floor(b / $) * $, S = Math.ceil(v / $) * $) : (M = b, S = v), g && f && s && Wl((l - i) / s, $ / 1e3) ? (L = Math.round(Math.min((l - i) / $, u)), $ = (l - i) / L, M = i, S = l) : k ? (M = g ? i : M, S = f ? l : S, L = c - 1, $ = (S - M) / L) : (L = (S - M) / $, bn(L, Math.round(L), $ / 1e3) ? L = Math.round(L) : L = Math.ceil(L));
  const T = Math.max(bo($), bo(M));
  C = Math.pow(10, kt(d) ? T : d), M = Math.round(M * C) / C, S = Math.round(S * C) / C;
  let B = 0;
  for (g && (m && M !== i ? (n.push({
    value: i
  }), M < i && B++, bn(Math.round((M + B * $) * C) / C, i, ms(i, x, e)) && B++) : M < i && B++); B < L; ++B) {
    const E = Math.round((M + B * $) * C) / C;
    if (f && E > l)
      break;
    n.push({
      value: E
    });
  }
  return f && m && S !== l ? n.length && bn(n[n.length - 1].value, l, ms(l, x, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!f || S === l) && n.push({
    value: S
  }), n;
}
function ms(e, t, { horizontal: n, minRotation: a }) {
  const o = me(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class Au extends en {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return kt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (d) => o = n ? o : d, l = (d) => s = a ? s : d;
    if (t) {
      const d = de(o), c = de(s);
      d < 0 && c < 0 ? l(0) : d > 0 && c > 0 && i(0);
    }
    if (o === s) {
      let d = s === 0 ? 1 : Math.abs(s * 0.05);
      l(s + d), t || i(o - d);
    }
    this.min = o, this.max = s;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: a } = t, o;
    return a ? (o = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, o > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${o} ticks. Limiting to 1000.`), o = 1e3)) : (o = this.computeTickLimit(), n = n || 11), n && (o = Math.min(n, o)), o;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const o = {
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
    }, s = this._range || this, i = Du(o, s);
    return t.bounds === "ticks" && Hl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const o = (a - n) / Math.max(t.length - 1, 1) / 2;
      n -= o, a += o;
    }
    this._startValue = n, this._endValue = a, this._valueRange = a - n;
  }
  getLabelForValue(t) {
    return Ha(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Li extends Au {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ei.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ne(t) ? t : 0, this.max = ne(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = me(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const ia = {
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
}, Gt = /* @__PURE__ */ Object.keys(ia);
function bs(e, t) {
  return e - t;
}
function vs(e, t) {
  if (kt(t))
    return null;
  const n = e._adapter, { parser: a, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ne(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (Cn(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function ys(e, t, n, a) {
  const o = Gt.length;
  for (let s = Gt.indexOf(e); s < o - 1; ++s) {
    const i = ia[Gt[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return Gt[s];
  }
  return Gt[o - 1];
}
function Tu(e, t, n, a, o) {
  for (let s = Gt.length - 1; s >= Gt.indexOf(n); s--) {
    const i = Gt[s];
    if (ia[i].common && e._adapter.diff(o, a, i) >= t - 1)
      return i;
  }
  return Gt[n ? Gt.indexOf(n) : 0];
}
function Bu(e) {
  for (let t = Gt.indexOf(e) + 1, n = Gt.length; t < n; ++t)
    if (ia[Gt[t]].common)
      return Gt[t];
}
function _s(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = Na(n, t), s = n[a] >= t ? n[a] : n[o];
    e[s] = !0;
  }
}
function Lu(e, t, n, a) {
  const o = e._adapter, s = +o.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, d;
  for (l = s; l <= i; l = +o.add(l, 1, a))
    d = n[l], d >= 0 && (t[d].major = !0);
  return t;
}
function xs(e, t, n) {
  const a = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, a.push({
      value: l,
      major: !1
    });
  return s === 0 || !n ? a : Lu(e, a, o, n);
}
class ks extends en {
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
    const a = t.time || (t.time = {}), o = this._adapter = new Fc._date(t.adapters.date);
    o.init(n), mn(a.displayFormats, o.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : vs(this, t);
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
    let { min: o, max: s, minDefined: i, maxDefined: l } = this.getUserBounds();
    function d(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !l && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !l) && (d(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && d(this.getMinMax(!1))), o = ne(o) && !isNaN(o) ? o : +n.startOf(Date.now(), a), s = ne(s) && !isNaN(s) ? s : +n.endOf(Date.now(), a) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const t = this.options, n = t.time, a = t.ticks, o = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && o.length && (this.min = this._userMin || o[0], this.max = this._userMax || o[o.length - 1]);
    const s = this.min, i = this.max, l = Xl(o, s, i);
    return this._unit = n.unit || (a.autoSkip ? ys(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : Tu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Bu(this._unit), this.initOffsets(o), t.reverse && l.reverse(), xs(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = s : a = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Ht(n, 0, i), a = Ht(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, o = this.options, s = o.time, i = s.unit || ys(s.minUnit, n, a, this._getLabelCapacity(n)), l = ut(o.ticks.stepSize, 1), d = i === "week" ? s.isoWeekday : !1, c = Cn(d) || d === !0, u = {};
    let h = n, m, _;
    if (c && (h = +t.startOf(h, "isoWeek", d)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const p = o.ticks.source === "data" && this.getDataTimestamps();
    for (m = h, _ = 0; m < a; m = +t.add(m, l, i), _++)
      _s(u, m, p);
    return (m === a || o.bounds === "ticks" || _ === 1) && _s(u, m, p), Object.keys(u).sort(bs).map((b) => +b);
  }
  getLabelForValue(t) {
    const n = this._adapter, a = this.options.time;
    return a.tooltipFormat ? n.format(t, a.tooltipFormat) : n.format(t, a.displayFormats.datetime);
  }
  format(t, n) {
    const o = this.options.time.displayFormats, s = this._unit, i = n || o[s];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, n, a, o) {
    const s = this.options, i = s.ticks.callback;
    if (i)
      return Dt(i, [
        t,
        n,
        a
      ], this);
    const l = s.time.displayFormats, d = this._unit, c = this._majorUnit, u = d && l[d], h = c && l[c], m = a[n], _ = c && h && m && m.major;
    return this._adapter.format(t, o || (_ ? h : u));
  }
  generateTickLabels(t) {
    let n, a, o;
    for (n = 0, a = t.length; n < a; ++n)
      o = t[n], o.label = this._tickFormatFunction(o.value, n, t);
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, o = me(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * s + l * i,
      h: a * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(t, 0, xs(this, [
      t
    ], this._majorUnit), o), i = this._getLabelSize(s), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, a;
    if (t.length)
      return t;
    const o = this.getMatchingVisibleMetas();
    if (this._normalized && o.length)
      return this._cache.data = o[0].controller.getAllParsedValues(this);
    for (n = 0, a = o.length; n < a; ++n)
      t = t.concat(o[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, a;
    if (t.length)
      return t;
    const o = this.getLabels();
    for (n = 0, a = o.length; n < a; ++n)
      t.push(vs(this, o[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Qs(t.sort(bs));
  }
}
function jn(e, t, n) {
  let a = 0, o = e.length - 1, s, i, l, d;
  n ? (t >= e[a].pos && t <= e[o].pos && ({ lo: a, hi: o } = Ne(e, "pos", t)), { pos: s, time: l } = e[a], { pos: i, time: d } = e[o]) : (t >= e[a].time && t <= e[o].time && ({ lo: a, hi: o } = Ne(e, "time", t)), { time: s, pos: l } = e[a], { time: i, pos: d } = e[o]);
  const c = i - s;
  return c ? l + (d - l) * (t - s) / c : l;
}
class CC extends ks {
  static id = "timeseries";
  static defaults = ks.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = jn(n, this.min), this._tableRange = jn(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, o = [], s = [];
    let i, l, d, c, u;
    for (i = 0, l = t.length; i < l; ++i)
      c = t[i], c >= n && c <= a && o.push(c);
    if (o.length < 2)
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
    for (i = 0, l = o.length; i < l; ++i)
      u = o[i + 1], d = o[i - 1], c = o[i], Math.round((u + d) / 2) !== c && s.push({
        time: c,
        pos: i / (l - 1)
      });
    return s;
  }
  _generate() {
    const t = this.min, n = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(n) || a.length === 1) && a.push(n), a.sort((o, s) => o - s);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return n.length && a.length ? t = this.normalize(n.concat(a)) : t = n.length ? n : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (jn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return jn(this._table, a * this._tableRange + this._minPos, !0);
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
  ...Fi,
  ...Fu
}, Pu = ol[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Xe(e) {
  return Ns(e) ? Sa(e) : e;
}
function Iu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ns(t) ? new Proxy(e, {}) : e;
}
function Ru(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ei(e, t) {
  e.labels = t;
}
function Pi(e, t, n) {
  const a = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function Ou(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ei(n, e.labels), Pi(n, e.datasets, t), n;
}
const zu = Z({
  props: Eu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = nt(null), s = Vs(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: h, plugins: m, datasetIdKey: _ } = e, p = Ou(u, _), b = Iu(p, u);
      s.value = new Be(o.value, {
        type: c,
        data: b,
        options: {
          ...h
        },
        plugins: m
      });
    }, l = () => {
      const c = Sa(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, d = (c) => {
      c.update(e.updateMode);
    };
    return ie(i), Le(l), Rt([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [h, m] = c, [_, p] = u;
      const b = Sa(s.value);
      if (!b)
        return;
      let v = !1;
      if (h) {
        const g = Xe(h), f = Xe(_);
        g && g !== f && (Ru(b, g), v = !0);
      }
      if (m) {
        const g = Xe(m.labels), f = Xe(p.labels), k = Xe(m.datasets), x = Xe(p.datasets);
        g !== f && (Ei(b.config.data, g), v = !0), k && k !== x && (Pi(b.config.data, k, e.datasetIdKey), v = !0);
      }
      v && Ot(() => {
        d(b);
      });
    }, {
      deep: !0
    }), () => Ma("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      Ma("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function no(e, t) {
  return Be.register(t), Z({
    props: Fi,
    setup(n, a) {
      let { expose: o } = a;
      const s = Vs(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => Ma(zu, Pu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Vu = /* @__PURE__ */ no("bar", Dc), Nu = /* @__PURE__ */ no("line", Bc), ju = /* @__PURE__ */ no("pie", Lc), ws = {
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
}, Cs = {
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
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = D(() => e?.value ? e.value : t.value), s = D(() => o.value === "dark"), i = D(() => s.value ? Cs : ws), l = () => {
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
  return ie(() => {
    l();
  }), Le(() => {
    d();
  }), e && Rt(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: ws,
    darkColors: Cs,
    chartSeriesColors: Wu
  };
}
const ao = 5, oo = 8, Hu = /^x\d*$/, Yu = /^y\d*$/;
function Ii(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, d = l && typeof l == "object" ? { ...l } : {};
    Hu.test(o) && (d.maxTicksLimit = oo, d.autoSkip = !0, d.minRotation = 0, d.maxRotation = 0, d.autoSkipPadding = d.autoSkipPadding ?? 8), Yu.test(o) && (d.maxTicksLimit = ao), i.ticks = d, a[o] = i;
  }
  return t.scales = a, t;
}
const Xt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ku = ["titleFont", "bodyFont", "footerFont"];
function Ri(e, t = Xt) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const o = { ...n.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
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
      o[s] = l;
    }
    n.scales = o;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const o = { ...n.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const l = { ...s }, d = l.labels;
      if (d && typeof d == "object") {
        const c = { ...d }, u = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...u, family: t }, l.labels = c;
      }
      o.legend = l;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const d of Ku) {
        const c = l[d];
        c && typeof c == "object" && (l[d] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    n.plugins = o;
  }
  return n;
}
const qu = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $s = 10, Uu = /* @__PURE__ */ Z({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Be.register(Bi, Li, uu, Ai, eo, to), Be.defaults.font.family = Xt;
    const { isDark: a, colors: o } = dt(rt(n, "theme")), s = D(() => n.data), i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c;
    function l(c, u) {
      if (u == null) return c;
      if (Array.isArray(u) || typeof u != "object" || c == null || Array.isArray(c) || typeof c != "object") return u;
      const h = { ...c };
      for (const m of Object.keys(u)) {
        const _ = u[m];
        _ !== void 0 && (h[m] = l(c[m], _));
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
              boxWidth: $s,
              boxHeight: $s,
              usePointStyle: !1,
              generateLabels: function(h) {
                return h.data.datasets.map((_, p) => {
                  const b = Array.isArray(_.backgroundColor) ? _.backgroundColor[0] : _.backgroundColor, v = Array.isArray(_.borderColor) ? _.borderColor[0] : _.borderColor, g = typeof v == "string" && v.length > 0 ? v : typeof b == "string" && b.length > 0 ? b : o.value.textSecondary;
                  return {
                    text: i(_.label || ""),
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
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
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
              maxTicksLimit: ao,
              font: {
                family: Xt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
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
              maxTicksLimit: oo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Xt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
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
      return Ri(
        Ii(u)
      );
    });
    return t({ isDark: a }), (c, u) => (y(), w("div", qu, [
      R(F(Vu), {
        data: s.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), at = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, be = /* @__PURE__ */ at(Uu, [["__scopeId", "data-v-86711d87"]]), Xu = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Gu = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Zu = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Qu = ["aria-pressed", "aria-label", "onClick"], Ju = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, th = /* @__PURE__ */ Z({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Be.register(
      Bi,
      Li,
      su,
      ou,
      Ai,
      eo,
      to
    ), Be.defaults.font.family = Xt;
    const a = nt(null), { isDark: o, colors: s } = dt(rt(n, "theme")), i = D(() => s.value.bgCard), l = D(() => {
      const b = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((v) => {
          const g = v.borderColor, f = Array.isArray(g) ? g[0] : g, k = typeof f == "string" && f.length > 0 ? f : s.value.textSecondary, x = v.pointBackgroundColor !== void 0 ? v.pointBackgroundColor : b, $ = v.pointHoverBackgroundColor !== void 0 ? v.pointHoverBackgroundColor : x, C = v.pointBorderWidth ?? 2, M = v.pointHoverBorderWidth ?? C;
          return {
            ...v,
            fill: v.fill ?? !1,
            pointBackgroundColor: x,
            pointHoverBackgroundColor: $,
            pointBorderColor: v.pointBorderColor ?? k,
            pointHoverBorderColor: v.pointHoverBorderColor ?? k,
            pointBorderWidth: C,
            pointHoverBorderWidth: M
          };
        })
      };
    }), d = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b;
    function c(b) {
      const v = b.borderColor, g = Array.isArray(v) ? v[0] : v;
      return typeof g == "string" && g.length > 0 ? g : s.value.textSecondary;
    }
    const u = D(
      () => l.value.datasets.map((b, v) => ({
        key: `${b.label ?? "dataset"}-${v}`,
        label: d(b.label || ""),
        color: c(b)
      }))
    ), h = nt([]);
    Rt(
      () => l.value.datasets.length,
      (b) => {
        const v = Array.from({ length: b }, (g, f) => h.value[f] ?? !0);
        h.value = v;
      },
      { immediate: !0 }
    );
    function m(b) {
      const g = a.value?.chart;
      if (!g || b < 0 || b >= g.data.datasets.length) return;
      const f = !g.isDatasetVisible(b);
      g.setDatasetVisibility(b, f), h.value[b] = f, g.update();
    }
    function _(b, v) {
      if (v == null) return b;
      if (Array.isArray(v) || typeof v != "object" || b == null || Array.isArray(b) || typeof b != "object") return v;
      const g = { ...b };
      for (const f of Object.keys(v)) {
        const k = v[f];
        k !== void 0 && (g[f] = _(b[f], k));
      }
      return g;
    }
    const p = D(() => {
      const b = {
        font: {
          family: Xt
        },
        color: s.value.textSecondary,
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
            backgroundColor: s.value.tooltipBg,
            titleColor: s.value.tooltipText,
            bodyColor: s.value.textSecondary,
            borderColor: s.value.tooltipBorder,
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
                let k = String(d(f.dataset.label || ""));
                return k && (k += ": "), f.parsed.y !== null && (k += f.parsed.y), k;
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
              maxTicksLimit: oo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Xt,
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
              maxTicksLimit: ao,
              font: {
                family: Xt,
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
      }, v = n.options ? _(b, n.options) : b;
      return Ri(
        Ii(v)
      );
    });
    return t({ isDark: o }), (b, v) => (y(), w("div", Xu, [
      r("div", Gu, [
        R(F(Nu), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: p.value
        }, null, 8, ["data", "options"])
      ]),
      u.value.length > 0 ? (y(), w("ul", Zu, [
        (y(!0), w(K, null, et(u.value, (g, f) => (y(), w("li", {
          key: g.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: H(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", h.value[f] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: gt({ color: g.color }),
            "aria-pressed": h.value[f] !== !1,
            "aria-label": `${g.label}. ${h.value[f] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (k) => m(f)
          }, [
            r("span", Ju, [
              v[0] || (v[0] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              r("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: gt({ borderColor: g.color })
              }, null, 4),
              v[1] || (v[1] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            r("span", null, A(g.label), 1)
          ], 14, Qu)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), ye = /* @__PURE__ */ at(th, [["__scopeId", "data-v-e1b1d261"]]), eh = { class: "chart-container" }, nh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ah = /* @__PURE__ */ Z({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Be.register(Ud, eo, to);
    const { isDark: a, colors: o } = dt(rt(n, "theme")), s = n.data, i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = D(() => n.options ? n.options : {
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
            generateLabels: function(d) {
              const c = d.data;
              return c.labels.length && c.datasets.length ? c.labels.map((u, h) => {
                const _ = d.getDatasetMeta(0).controller.getStyle(h), b = c.datasets[0].data[h], v = typeof _.backgroundColor == "string" && _.backgroundColor.length > 0 ? _.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${b}`,
                  fillStyle: _.backgroundColor,
                  strokeStyle: _.borderColor,
                  lineWidth: _.borderWidth,
                  lineDash: _.borderDash,
                  lineDashOffset: _.borderDashOffset,
                  lineJoin: _.borderJoinStyle,
                  fontColor: v,
                  hidden: !d.getDataVisibility(h),
                  index: h
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
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
              const c = d.label || "", u = d.parsed || 0, h = d.dataset.data.reduce((_, p) => _ + p, 0), m = (u / h * 100).toFixed(1);
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
    return t({ isDark: a }), (d, c) => (y(), w("div", eh, [
      R(F(ju), {
        data: F(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), la = /* @__PURE__ */ at(ah, [["__scopeId", "data-v-0f7806d6"]]), oh = { class: "chart-container" }, sh = ["viewBox"], ih = ["transform"], lh = ["x", "width", "fill", "stroke"], rh = ["fill"], ch = ["x1", "y1", "x2", "y2", "stroke"], dh = ["points", "fill"], uh = ["x1", "y1", "x2", "y2", "stroke"], hh = ["x", "y", "fill"], fh = ["x1", "y1", "x2", "y2", "stroke"], gh = ["points", "fill"], ph = ["transform"], mh = ["y1", "y2"], bh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y", "height"], xh = ["y1", "y2"], kh = ["y1", "y2"], wh = ["y1", "y2"], Ch = ["y1", "y2"], $h = ["y", "height"], Mh = ["cy", "stroke", "onMouseenter"], Sh = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["cy", "stroke", "onMouseenter"], Th = ["y1", "y2", "onMouseenter"], Bh = ["y1", "y2", "onMouseenter"], Lh = ["x", "y", "fill"], Fh = ["x", "y", "fill"], Eh = ["transform"], Ph = { transform: "translate(-200, 0)" }, Ih = ["stroke"], Rh = ["fill"], Oh = { transform: "translate(-130, 0)" }, zh = ["stroke"], Vh = ["fill"], Nh = { transform: "translate(-60, 0)" }, jh = ["stroke"], Wh = ["fill"], Hh = { transform: "translate(10, 0)" }, Yh = ["stroke"], Kh = ["fill"], qh = { transform: "translate(80, 0)" }, Uh = ["fill"], Xh = { transform: "translate(150, 0)" }, Gh = ["fill"], Zh = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a } = dt(rt(n, "theme")), o = D(() => ({
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
    })), s = nt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m, _) => {
      const p = m.currentTarget.closest("svg");
      if (!p) return;
      const b = p.getBoundingClientRect(), v = p.createSVGPoint();
      v.x = m.clientX - b.left, v.y = m.clientY - b.top, s.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: _
      };
    }, d = (m) => {
      if (s.value.visible) {
        const _ = m.currentTarget, p = _.getBoundingClientRect(), b = _.createSVGPoint();
        b.x = m.clientX - p.left, b.y = m.clientY - p.top, s.value.x = b.x, s.value.y = b.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, h = D(() => {
      const m = [], p = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, g = (v - 1) / 9, f = n.chartMargin + p - g * p;
        m.push({ value: v, y: f });
      }
      return m;
    });
    return t({ isDark: a }), (m, _) => (y(), w("div", oh, [
      (y(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: d,
        onMouseleave: c
      }, [
        s.value.visible ? (y(), w("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          r("rect", {
            x: -(s.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, lh),
          r("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, rh)
        ], 8, ih)) : z("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, ch),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, dh),
        (y(!0), w(K, null, et(h.value, (p, b) => (y(), w(K, { key: b }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, uh),
          r("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(p.value), 9, hh)
        ], 64))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, fh),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, gh),
        (y(!0), w(K, null, et(e.boxplotData, (p, b) => (y(), w(K, { key: b }, [
          r("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            p.isTotal ? (y(), w(K, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, mh),
              r("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
              r("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              r("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, yh),
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
              }, null, 8, _h)
            ], 64)) : (y(), w(K, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xh),
              r("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kh),
              r("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              r("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Ch),
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
              }, null, 8, $h)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: p.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${p.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            r("circle", {
              cx: 0,
              cy: p.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${p.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            r("circle", {
              cx: 0,
              cy: p.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${p.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            r("circle", {
              cx: 0,
              cy: p.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${p.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            r("line", {
              x1: -24,
              y1: p.medianY,
              x2: 24,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Median: ${p.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Th),
            p.averageY ? (y(), w("line", {
              key: 2,
              x1: -24,
              y1: p.averageY,
              x2: 24,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Avg: ${p.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Bh)) : z("", !0)
          ], 8, ph),
          r("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(p.label)), 9, Lh),
          p.responseCount ? (y(), w("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(p.responseCount), 9, Fh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), w("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", Ph, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ih),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
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
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, zh),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
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
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, jh),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
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
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Yh),
            r("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
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
              fill: o.value.legendText,
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Gh)
          ])
        ], 8, Eh)) : z("", !0)
      ], 44, sh))
    ]));
  }
}), Qh = /* @__PURE__ */ at(Zh, [["__scopeId", "data-v-9ac5c075"]]), Jh = { class: "chart-container" }, tf = ["viewBox"], ef = ["x1", "y1", "x2", "y2", "stroke"], nf = ["points", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], of = ["x1", "y1", "x2", "y2", "stroke"], sf = ["x", "y", "fill"], lf = ["x", "y", "fill", "transform"], rf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["points", "fill"], df = ["transform"], uf = ["y1", "y2", "stroke", "onMouseenter"], hf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], ff = ["x1", "y1", "x2", "y2", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], mf = ["cy", "stroke", "onMouseenter"], bf = ["x", "y", "fill"], vf = ["x", "y", "fill"], yf = ["transform"], _f = { transform: "translate(-180, 0)" }, xf = ["stroke"], kf = ["fill"], wf = { transform: "translate(-120, 0)" }, Cf = ["fill"], $f = { transform: "translate(-60, 0)" }, Mf = ["fill"], Sf = { transform: "translate(0, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(60, 0)" }, Bf = ["fill"], Lf = { transform: "translate(130, 0)" }, Ff = ["fill"], Ef = ["transform"], Pf = ["x", "y", "width", "height", "fill", "stroke"], If = ["y", "fill"], Rf = ["y", "fill"], Wn = 10, Of = 14, xa = 13, Ms = 4, Ss = 12, zf = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), s = Wn + xa + Ms + Ss + Wn, i = D(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(f, k, x) {
      const $ = x ? 0.6 : 0.535;
      return Math.ceil(Math.max(f, 1) * k * $);
    }
    function d(f, k) {
      return Math.max(
        l(f.length, xa, !0),
        l(k.length, Ss, !1),
        52
      ) + Of * 2;
    }
    function c(f, k, x, $) {
      const C = x / 2, M = 6, S = Math.min(
        Math.max(f, C + M),
        n.chartWidth - C - M
      ), L = M + $ + 10, T = n.chartHeight - M + 10, B = Math.min(Math.max(k, L), T);
      return { x: S, y: B };
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
    }), m = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, _ = (f, k, x) => {
      const $ = f.currentTarget.closest("svg");
      if (!$) return;
      const C = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = f.clientX - C.left, M.y = f.clientY - C.top;
      let S = m(k.label), L = "";
      switch (x) {
        case "body":
          L = `Q1: ${k.q1.toFixed(1)} | Q3: ${k.q3.toFixed(1)}`;
          break;
        case "wick":
          L = `Min: ${k.low.toFixed(1)} | Max: ${k.high.toFixed(1)}`;
          break;
        case "median":
          L = `Median: ${k.median.toFixed(1)}`;
          break;
        case "average":
          L = `Average: ${k.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          L = `Min: ${k.low.toFixed(1)}`;
          break;
        case "max":
          L = `Max: ${k.high.toFixed(1)}`;
          break;
      }
      const T = d(S, L), B = s;
      let E = M.x, P = M.y - 20;
      const N = c(E, P, T, B);
      E = N.x, P = N.y, h.value = {
        visible: !0,
        x: E,
        y: P,
        title: S,
        text: L,
        width: T,
        height: B
      };
    }, p = (f) => {
      if (h.value.visible) {
        const k = f.currentTarget, x = k.getBoundingClientRect(), $ = k.createSVGPoint();
        $.x = f.clientX - x.left, $.y = f.clientY - x.top;
        let C = $.x, M = $.y - 20;
        const S = c(C, M, h.value.width, h.value.height);
        h.value.x = S.x, h.value.y = S.y;
      }
    }, b = () => {
      h.value.visible = !1;
    }, v = () => {
      h.value.visible = !1;
    }, g = D(() => {
      const f = [], x = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const C = $, M = (C - 1) / 9, S = n.chartMargin + x - M * x;
        f.push({ value: C, y: S });
      }
      return f;
    });
    return t({ isDark: a }), (f, k) => (y(), w("div", Jh, [
      (y(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: gt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: p,
        onMouseleave: b
      }, [
        k[4] || (k[4] = r("defs", null, [
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
        (y(!0), w(K, null, et(g.value, (x, $) => (y(), w("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: x.y,
          x2: e.chartWidth - e.chartMargin,
          y2: x.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, af))), 128)),
        (y(!0), w(K, null, et(g.value, (x, $) => (y(), w(K, { key: $ }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: x.y,
            x2: e.chartMargin,
            y2: x.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, of),
          r("text", {
            x: e.chartMargin - 12,
            y: x.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(x.value), 9, sf)
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
        }, A(m(e.yAxisLabel)), 9, lf),
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
        (y(!0), w(K, null, et(e.candlestickData, (x, $) => (y(), w(K, { key: $ }, [
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
              class: "hover-line",
              onMouseenter: (C) => _(C, x, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, uf),
            r("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(x.q1Y, x.q3Y) - (Math.abs(x.q3Y - x.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(x.q3Y - x.q1Y)),
              fill: x.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: x.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (C) => _(C, x, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, hf),
            x.medianY ? (y(), w("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: x.medianY,
              x2: e.candleWidth / 2,
              y2: x.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (C) => _(C, x, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ff)) : z("", !0),
            x.averageY ? (y(), w("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: x.averageY,
              x2: e.candleWidth / 2,
              y2: x.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (C) => _(C, x, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, gf)) : z("", !0),
            r("circle", {
              cx: 0,
              cy: x.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (C) => _(C, x, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            r("circle", {
              cx: 0,
              cy: x.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (C) => _(C, x, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, mf)
          ], 8, df),
          r("text", {
            x: x.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(m(x.label)), 9, bf),
          x.responseCount ? (y(), w("text", {
            key: 0,
            x: x.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(x.responseCount), 9, vf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), w("g", {
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
            k[0] || (k[0] = r("rect", {
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
            k[1] || (k[1] = r("rect", {
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
            k[2] || (k[2] = r("line", {
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
            k[3] || (k[3] = r("line", {
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
        ], 8, yf)) : z("", !0),
        h.value.visible ? (y(), w("g", {
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
            y: -h.value.height - 10 + Wn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, If),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Wn + xa + Ms,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Rf)
        ], 8, Ef)) : z("", !0)
      ], 44, tf))
    ]));
  }
}), Oi = /* @__PURE__ */ at(zf, [["__scopeId", "data-v-22efd66d"]]), Vf = ["viewBox"], Nf = ["x1", "y1", "x2", "y2", "stroke"], jf = ["x1", "y1", "x2", "y2", "stroke"], Wf = ["points", "fill"], Hf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x", "y", "fill"], Kf = ["x", "y", "fill", "transform"], qf = ["x1", "y1", "x2", "y2", "stroke"], Uf = ["points", "fill"], Xf = ["x1", "y1", "x2", "y2", "stroke"], Gf = ["x", "y", "fill"], Zf = ["x", "y", "fill"], Qf = ["d"], Jf = ["x", "y", "width", "height", "onMouseenter"], tg = ["x1", "y1", "x2", "y2"], eg = ["x", "y"], ng = ["x1", "y1", "x2", "y2"], ag = ["x", "y"], og = ["x1", "y1", "x2", "y2"], sg = ["x", "y"], ig = ["x1", "y1", "x2", "y2"], lg = ["x", "y"], rg = ["x1", "y1", "x2", "y2"], cg = ["x", "y"], dg = ["x1", "y1", "x2", "y2"], ug = ["x", "y"], hg = ["transform"], fg = { transform: "translate(-220, 0)" }, gg = ["fill"], pg = { transform: "translate(-140, 0)" }, mg = ["fill"], bg = { transform: "translate(-80, 0)" }, vg = ["fill"], yg = { transform: "translate(-20, 0)" }, _g = ["fill"], xg = { transform: "translate(60, 0)" }, kg = ["fill"], wg = { transform: "translate(130, 0)" }, Cg = ["fill"], $g = { transform: "translate(180, 0)" }, Mg = ["fill"], Sg = ["transform"], Dg = ["x", "y", "width", "height", "fill", "stroke"], Ag = ["y", "fill"], Tg = ["y", "fill"], Hn = 10, Bg = 14, ka = 13, Ds = 12, As = 4, Lg = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), s = Hn + ka + As + Ds + Hn, i = D(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(V, X, G) {
      const it = G ? 0.6 : 0.535;
      return Math.ceil(Math.max(V, 1) * X * it);
    }
    function d(V, X) {
      return Math.max(
        l(V.length, ka, !0),
        l(X.length, Ds, !1),
        52
      ) + Bg * 2;
    }
    function c(V, X, G, it) {
      const mt = G / 2, bt = 6, St = Math.min(
        Math.max(V, mt + bt),
        n.chartWidth - mt - bt
      ), Nt = bt + it + 10, Ft = n.chartHeight - bt + 10, O = Math.min(Math.max(X, Nt), Ft);
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
    }), m = D(() => n.chartWidth - n.chartMargin * 2), _ = D(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), p = D(() => m.value / 10 * 0.6), b = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const V = Math.max(...n.histogram.map((G) => G.count || 0), 1), X = Math.max(1, Math.ceil(V * 0.2));
      return V + X;
    }), v = D(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const V = n.averageScore || 0;
      let X = 0, G = 0;
      if (n.histogram.forEach((mt) => {
        const bt = mt.count || 0;
        X += bt;
        const St = mt.score - V;
        G += bt * (St * St);
      }), X === 0) return 1;
      const it = G / X;
      return Math.sqrt(it) || 1;
    }), g = (V, X, G) => {
      if (G === 0) return 0;
      const it = 1 / (G * Math.sqrt(2 * Math.PI)), mt = -0.5 * Math.pow((V - X) / G, 2);
      return it * Math.exp(mt);
    }, f = D(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && v.value === 0) return null;
      const V = n.averageScore, X = v.value, G = 100, mt = Math.max(...n.histogram.map((Ft) => Ft.count || 0), 1) / b.value * _.value;
      if (mt <= 0) return null;
      let bt = 0;
      for (let Ft = 0; Ft <= G; Ft++) {
        const O = 1 + 9 * (Ft / G), j = g(O, V, X);
        j > bt && (bt = j);
      }
      if (bt <= 0) return null;
      const St = mt / bt, Nt = [];
      for (let Ft = 0; Ft <= G; Ft++) {
        const O = 1 + 9 * (Ft / G), j = g(O, V, X) * St, U = x(O);
        if (U !== null) {
          const ft = n.chartHeight - n.chartBottomMargin - j;
          Nt.push(`${Ft === 0 ? "M" : "L"} ${U} ${ft}`);
        }
      }
      return Nt.join(" ");
    }), k = D(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const V = m.value / 10;
      return n.histogram.map((X, G) => {
        const it = n.chartMargin + (G + 0.5) * V, mt = X.count > 0 ? X.count / b.value * _.value : 0, bt = n.chartHeight - n.chartBottomMargin - mt;
        return {
          score: X.score,
          count: X.count,
          x: it,
          y: bt,
          height: mt
        };
      });
    }), x = (V) => {
      if (V < 1 || V > 10) return null;
      const X = m.value / 10;
      return n.chartMargin + (V - 0.5) * X;
    }, $ = D(() => x(n.minScore)), C = D(() => x(n.maxScore)), M = D(() => x(n.q1Score)), S = D(() => x(n.medianScore)), L = D(() => x(n.q3Score)), T = D(() => x(n.averageScore)), B = D(() => n.minScore), E = D(() => n.maxScore), P = D(() => n.q1Score), N = D(() => n.medianScore), Y = D(() => n.q3Score), W = D(() => n.averageScore), Q = D(() => {
      const V = [], X = n.chartMargin - 8, G = 18;
      M.value !== null && V.push({
        x: M.value,
        y: X,
        value: n.q1Score,
        label: `Q1: ${P.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), S.value !== null && V.push({
        x: S.value,
        y: X - G,
        value: n.medianScore,
        label: `Median: ${N.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && V.push({
        x: T.value,
        y: X - G,
        value: n.averageScore,
        label: `Avg: ${W.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), L.value !== null && V.push({
        x: L.value,
        y: X,
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
        for (let Nt = 0; Nt < it.length; Nt++) {
          let Ft = !1;
          for (const O of it[Nt]) {
            if (O.x === null) continue;
            const j = Math.abs(bt.x - O.x), U = (bt.width + O.width) / 2 + 10;
            if (j < U) {
              Ft = !0;
              break;
            }
          }
          if (!Ft) {
            St = Nt;
            break;
          }
        }
        St === -1 && (St = it.length - 1), bt.y = X - St * G, it[St].push(bt);
      });
      const mt = 15;
      return V.forEach((bt) => {
        bt.y < mt && (bt.y = mt);
      }), V;
    }), J = (V) => Q.value.find((G) => G.id === V)?.y || n.chartMargin - 10, lt = D(() => {
      const V = [];
      for (let G = 0; G <= 5; G++) {
        const it = Math.round(b.value / 5 * G), mt = n.chartHeight - n.chartBottomMargin - G / 5 * _.value;
        V.push({ value: it, y: mt });
      }
      return V;
    });
    function vt(V, X, G) {
      const it = V.createSVGPoint();
      it.x = X, it.y = G;
      const mt = V.getScreenCTM();
      if (!mt) {
        const St = V.getBoundingClientRect();
        return { x: X - St.left, y: G - St.top };
      }
      const bt = it.matrixTransform(mt.inverse());
      return { x: bt.x, y: bt.y };
    }
    const pt = (V, X) => {
      n.interactive && Mt(V, X);
    }, ct = () => {
      n.interactive && At();
    }, Mt = (V, X) => {
      const G = V.currentTarget.closest("svg");
      if (!G) return;
      const { x: it, y: mt } = vt(G, V.clientX, V.clientY), bt = `Score: ${X.score}`, St = `Count: ${Number(X.count ?? 0).toLocaleString()}`, Nt = d(bt, St), Ft = s, O = typeof X?.x == "number" ? X.x : it;
      let j = mt - 20;
      const U = c(O, j, Nt, Ft);
      h.value = {
        visible: !0,
        x: U.x,
        y: U.y,
        title: bt,
        text: St,
        width: Nt,
        height: Ft,
        anchorX: typeof X?.x == "number" ? X.x : null
      };
    }, ot = (V) => {
      if (n.interactive && h.value.visible) {
        const X = V.currentTarget, { x: G, y: it } = vt(X, V.clientX, V.clientY), mt = h.value.anchorX, bt = mt != null && Number.isFinite(mt) ? mt : G;
        let St = it - 20;
        const Nt = c(bt, St, h.value.width, h.value.height);
        h.value.x = Nt.x, h.value.y = Nt.y;
      }
    }, Pt = () => {
      At();
    }, At = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (V, X) => (y(), w("div", {
      class: H(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (y(), w("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: ot,
        onMouseleave: Pt
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
        (y(!0), w(K, null, et(lt.value, (G, it) => (y(), w("line", {
          key: `grid-${it}`,
          x1: e.chartMargin,
          y1: G.y,
          x2: e.chartWidth - e.chartMargin,
          y2: G.y,
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
        (y(!0), w(K, null, et(lt.value, (G, it) => (y(), w(K, {
          key: `y-tick-${it}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: G.y,
            x2: e.chartMargin,
            y2: G.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Hf),
          r("text", {
            x: e.chartMargin - 12,
            y: G.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(G.value), 9, Yf)
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
        (y(!0), w(K, null, et(k.value, (G, it) => (y(), w(K, {
          key: `tick-${it}`
        }, [
          r("line", {
            x1: G.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: G.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xf),
          r("text", {
            x: G.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(G.score), 9, Gf)
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
        f.value ? (y(), w("path", {
          key: 0,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Qf)) : z("", !0),
        (y(!0), w(K, null, et(k.value, (G, it) => (y(), w("rect", {
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
        }, null, 44, Jf))), 128)),
        $.value ? (y(), w("line", {
          key: 1,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, tg)) : z("", !0),
        $.value ? (y(), w("text", {
          key: 2,
          x: $.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(B.value.toFixed(1)), 9, eg)) : z("", !0),
        M.value ? (y(), w("line", {
          key: 3,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ng)) : z("", !0),
        M.value ? (y(), w("text", {
          key: 4,
          x: M.value,
          y: J("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(P.value.toFixed(1)), 9, ag)) : z("", !0),
        S.value ? (y(), w("line", {
          key: 5,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, og)) : z("", !0),
        S.value ? (y(), w("text", {
          key: 6,
          x: S.value,
          y: J("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(N.value.toFixed(1)), 9, sg)) : z("", !0),
        T.value ? (y(), w("line", {
          key: 7,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, ig)) : z("", !0),
        T.value ? (y(), w("text", {
          key: 8,
          x: T.value,
          y: J("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(W.value.toFixed(1)), 9, lg)) : z("", !0),
        L.value ? (y(), w("line", {
          key: 9,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, rg)) : z("", !0),
        L.value ? (y(), w("text", {
          key: 10,
          x: L.value,
          y: J("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(Y.value.toFixed(1)), 9, cg)) : z("", !0),
        C.value ? (y(), w("line", {
          key: 11,
          x1: C.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, dg)) : z("", !0),
        C.value ? (y(), w("text", {
          key: 12,
          x: C.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(E.value.toFixed(1)), 9, ug)) : z("", !0),
        e.showLegend ? (y(), w("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          r("g", fg, [
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
            }, " Gaussian ", 8, gg)
          ]),
          r("g", pg, [
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
            }, " Min ", 8, mg)
          ]),
          r("g", bg, [
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
            }, " Q1 ", 8, vg)
          ]),
          r("g", yg, [
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
            }, " Median ", 8, _g)
          ]),
          r("g", xg, [
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
            }, " Avg ", 8, kg)
          ]),
          r("g", wg, [
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
            }, " Q3 ", 8, Cg)
          ]),
          r("g", $g, [
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
            }, " Max ", 8, Mg)
          ])
        ], 8, hg)) : z("", !0),
        e.interactive && h.value.visible ? (y(), w("g", {
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
            y: -h.value.height - 10 + Hn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Ag),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Hn + ka + As,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Tg)
        ], 8, Sg)) : z("", !0)
      ], 44, Vf))
    ], 2));
  }
}), zi = /* @__PURE__ */ at(Lg, [["__scopeId", "data-v-a1e39e34"]]), Fg = 639, Vi = 1024;
function Ts(e) {
  return e < 640 ? "mobile" : e <= Vi ? "tablet" : "desktop";
}
function Eg() {
  const e = nt(
    typeof window > "u" ? "desktop" : Ts(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Ts(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  ie(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Fg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Vi}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, n.addEventListener("change", s), a.addEventListener("change", s), o.addEventListener("change", s));
  }), Le(() => {
    !s || !n || !a || !o || (n.removeEventListener("change", s), a.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = D(() => e.value === "mobile"), l = D(() => e.value === "tablet"), d = D(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: d
  };
}
const Pg = { class: "chart-container" }, Ig = {
  key: 1,
  class: "chart-wrapper"
}, Rg = /* @__PURE__ */ Z({
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
    lo.use([il, ll, rl, cl]);
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), { breakpoint: s } = Eg(), i = nt(null), l = nt(!0), d = nt(!1);
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
      const C = s.value;
      return C === "mobile" ? {
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
      } : C === "tablet" ? {
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
    }), m = (C, M) => {
      const S = C.trim();
      if (!S || M < 1) return C;
      if (S.length <= M) return S;
      const L = [];
      let T = 0;
      for (; T < S.length; ) {
        const B = Math.min(T + M, S.length);
        if (B >= S.length) {
          const N = S.slice(T).trim();
          N && L.push(N);
          break;
        }
        const E = S.slice(T, B), P = E.lastIndexOf(" ");
        if (P > 0)
          for (L.push(S.slice(T, T + P).trim()), T += P; T < S.length && S[T] === " "; ) T += 1;
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
    ], p = () => {
      const C = n.data.links.filter(
        (T) => T.source && T.target && typeof T.value == "number"
      ), M = Math.max(...C.map((T) => T.value), 1), S = Math.max(1, M * 0.01), L = C.map((T) => ({
        ...T,
        originalValue: T.value,
        value: T.value < M * 0.01 ? S : T.value
      }));
      return {
        nodes: n.data.nodes.filter((T) => T.name),
        links: L
      };
    }, b = (C) => C.map((M, S) => ({
      ...M,
      itemStyle: {
        color: n.nodeColors[M.name] || _[S % _.length],
        borderRadius: 8
      }
    })), v = (C) => (M) => {
      const S = M.dataType === "node", L = o.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const Y = C.filter((J) => J.target === M.name), W = C.filter((J) => J.source === M.name), Q = Y.length > 0 ? Y.reduce((J, lt) => J + (lt.originalValue || lt.value), 0) : W.reduce((J, lt) => J + (lt.originalValue || lt.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${M.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${Q.toLocaleString()}</div>`;
      }
      const B = M.data?.source || M.source || "Unknown", E = M.data?.target || M.target || "Unknown", P = M.data?.originalValue || M.data?.value || M.value || 0, N = M.data?.label || `${P.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${L};">${B} → ${E}</div><div style="color: ${T}; font-size: 12px;">Flow: ${N}</div>`;
    }, g = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const C = h.value, M = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", S = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: L, links: T } = p(), B = b(L), E = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: v(T),
            backgroundColor: o.value.tooltipBg,
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
                  lineStyle: { color: M, opacity: 1 }
                },
                {
                  depth: 1,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: M, opacity: 1 }
                }
              ],
              lineStyle: {
                color: M,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: u.style,
              label: {
                show: !0,
                position: C.labelPosition,
                /** Dark: external labels (e.g. mobile `right`) use light text; inside nodes stay dark for contrast on pastel bars. */
                color: C.labelPosition === "right" && a.value ? o.value.textPrimary : "#0f172a",
                fontWeight: 600,
                fontSize: C.labelFontSize,
                ...C.labelWrap && C.labelLineHeight > 0 ? { lineHeight: C.labelLineHeight } : {},
                ...C.labelWrap && C.labelTextWidth > 0 ? { width: C.labelTextWidth, overflow: "none" } : {},
                ...C.labelDistance > 0 ? { distance: C.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (P) => {
                  const N = P.name || "";
                  if (C.labelWrap)
                    return m(N, Math.max(4, C.labelCharsPerLine));
                  const Y = C.labelMaxChars;
                  return N.length > Y ? `${N.substring(0, Y)}...` : N;
                }
              },
              edgeLabel: C.edgeLabelShow ? {
                show: !0,
                fontSize: C.edgeLabelFontSize,
                color: o.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (P) => {
                  const N = P.data?.originalValue || P.value || 0;
                  return P.data?.label || `${N.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: u.node.align,
              nodeGap: C.nodeGap,
              nodeWidth: C.nodeWidth,
              layoutIterations: u.node.iterations,
              orient: C.orient,
              draggable: !1,
              ...C.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: u.animation.duration,
          animationEasing: u.animation.easing
        };
        c.setOption(E), c.resize();
      } catch (L) {
        console.error("Error setting Sankey chart options:", L), d.value = !0;
      }
    }, f = async () => {
      if (i.value)
        try {
          c = lo.init(i.value), g(), window.addEventListener("resize", x);
        } catch (C) {
          console.error("Error initializing Sankey chart:", C), d.value = !0;
        } finally {
          l.value = !1;
        }
    }, k = async (C = 40) => {
      await Ot();
      for (let M = 0; M < C; M++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await f();
        await new Promise((S) => setTimeout(S, 50));
      }
      await f(), setTimeout(x, 50);
    }, x = () => c?.resize(), $ = () => {
      window.removeEventListener("resize", x), c && (c.dispose(), c = null);
    };
    return ie(() => i.value && k()), js($), Rt(() => n.data, g, { deep: !0 }), Rt(a, g), Rt(s, g), t({ isDark: a }), (C, M) => (y(), w("div", Pg, [
      d.value ? (y(), w("div", {
        key: 0,
        class: "error-state",
        style: gt({ height: e.height })
      }, [...M[0] || (M[0] = [
        io('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), w("div", Ig, [
        Qt(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: gt({ height: e.height })
        }, null, 4), [
          [_n, !l.value]
        ]),
        Qt(r("div", {
          class: "loading-state",
          style: gt({ height: e.height })
        }, [...M[1] || (M[1] = [
          io('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [_n, l.value]
        ])
      ]))
    ]));
  }
}), Fe = /* @__PURE__ */ at(Rg, [["__scopeId", "data-v-eb927194"]]), Og = ["open"], zg = { class: "card-header metric-collapsible__summary" }, Vg = { class: "header-content metric-header-content" }, Ng = { class: "metric-header-content__main" }, jg = { class: "metric-header-content__text" }, Wg = {
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
}, ap = { class: "chart-metric-container__body" }, op = /* @__PURE__ */ Z({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = nt(t.defaultOpen), a = Pa(), o = D(() => a.headerExport ? !t.collapsible || n.value : !1);
    Rt(
      () => t.defaultOpen,
      (i) => {
        t.collapsible && (n.value = i);
      }
    );
    function s(i) {
      const l = i.currentTarget;
      l?.tagName === "DETAILS" && (n.value = l.open);
    }
    return (i, l) => e.collapsible ? (y(), w("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: s
    }, [
      r("summary", zg, [
        r("div", Vg, [
          r("div", Ng, [
            r("div", jg, [
              $t(i.$slots, "title", {}, () => [
                e.title ? (y(), w("h3", Wg, A(e.title), 1)) : z("", !0)
              ], !0),
              e.subtitle ? (y(), w("p", Hg, A(e.subtitle), 1)) : z("", !0),
              $t(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (y(), w("div", Yg, [
              $t(i.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          i.$slots.headerAside ? (y(), w("div", Kg, [
            $t(i.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
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
      r("div", qg, [
        $t(i.$slots, "default", {}, void 0, !0)
      ])
    ], 40, Og)) : (y(), w("div", Ug, [
      r("div", Xg, [
        r("div", Gg, [
          r("div", Zg, [
            r("div", Qg, [
              $t(i.$slots, "title", {}, () => [
                e.title ? (y(), w("h3", Jg, A(e.title), 1)) : z("", !0)
              ], !0),
              e.subtitle ? (y(), w("p", tp, A(e.subtitle), 1)) : z("", !0),
              $t(i.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (y(), w("div", ep, [
              $t(i.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          i.$slots.headerAside ? (y(), w("div", np, [
            $t(i.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      r("div", ap, [
        $t(i.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ht = /* @__PURE__ */ at(op, [["__scopeId", "data-v-ec720d6f"]]);
function sp(e, t) {
  return y(), w("svg", {
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
function Ni(e, t) {
  return y(), w("svg", {
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
  return y(), w("svg", {
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
  return y(), w("svg", {
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
function ji(e, t) {
  return y(), w("svg", {
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
  return y(), w("svg", {
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
  return y(), w("svg", {
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
  return y(), w("svg", {
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
  return y(), w("svg", {
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
  return y(), w("svg", {
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
}, _p = /* @__PURE__ */ Z({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = D(() => n.variant === "footer" ? "footer" : "div"), s = D(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (d) => n.formats.includes(d), l = (d) => {
      n.loading || a("export", d);
    };
    return (d, c) => (y(), tt(Ge(o.value), {
      class: H(s.value)
    }, {
      default: I(() => [
        e.variant === "footer" ? (y(), w("div", up)) : z("", !0),
        r("div", {
          class: H(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (y(), w("span", hp, "Export")) : z("", !0),
          r("div", fp, [
            i("pdf") ? (y(), w("button", {
              key: 0,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (y(), w("svg", pp, [...c[2] || (c[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (y(), w("svg", mp, [...c[3] || (c[3] = [
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
            ], 10, gp)) : z("", !0),
            i("csv") ? (y(), w("button", {
              key: 1,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (y(), w("svg", vp, [...c[5] || (c[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (y(), w("svg", yp, [...c[6] || (c[6] = [
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
            ], 10, bp)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Bt = /* @__PURE__ */ at(_p, [["__scopeId", "data-v-32629e66"]]), xp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, kp = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, wp = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Cp = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, $p = { class: "w-full shrink-0 sm:pr-2" }, Mp = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Sp = { class: "max-w-[360px] text-center" }, Dp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ap = /* @__PURE__ */ Z({
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
    }, o = e, s = n, i = (p) => {
      s("export", p);
    }, l = [30, 50, 70, 50, 40], d = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], c = rt(o, "theme"), u = rt(o, "options"), { isDark: h } = dt(c), m = (p) => {
      const b = new Date(p), v = String(b.getDate()).padStart(2, "0"), g = String(b.getMonth() + 1).padStart(2, "0");
      return `${v}-${g}`;
    }, _ = D(() => {
      const p = o.data?.agents_by_day || {}, b = Object.keys(p).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const v = b.map(($) => m($)), g = /* @__PURE__ */ new Set();
      for (const $ of Object.values(p))
        for (const C of Object.keys($))
          g.add(C);
      const f = Array.from(g), k = ($) => $, x = f.map(($) => ({
        label: $,
        data: b.map((C) => p[C]?.[$] || 0),
        backgroundColor: `${a[$] || "#94a3b8"}80`,
        borderColor: k(a[$] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: v,
        datasets: x
      };
    });
    return t({ isDark: h }), (p, b) => (y(), tt(ht, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, Tt({
      default: I(() => [
        r("div", xp, [
          e.loading ? (y(), w("div", kp, [
            r("div", wp, [
              (y(), w(K, null, et(l, (v, g) => r("div", {
                key: g,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", d[g]]),
                style: gt({ height: `${v}%` })
              }, null, 6)), 64))
            ]),
            b[0] || (b[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : _.value.labels && _.value.labels.length ? (y(), w("section", Cp, [
            r("div", $p, [
              R(be, {
                data: _.value,
                stacked: !0,
                theme: c.value,
                options: u.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (y(), w("section", Mp, [
            r("div", Sp, [
              r("div", Dp, [
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
        fn: I(() => [
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
}), Tp = { class: "flex w-full min-w-0 justify-center" }, Bp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Lp = { class: "min-w-0 truncate text-[12px] leading-normal" }, Fp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Ep = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Pp = /* @__PURE__ */ Z({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (y(), w("div", {
      class: H(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[72px]" : "h-[58px]"])
    }, [
      r("div", Tp, [
        r("div", Bp, [
          e.color ? (y(), w("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: gt({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          r("span", Lp, A(e.title), 1)
        ])
      ]),
      r("p", Fp, A(e.value), 1),
      e.subvalue ? (y(), w("p", Ep, A(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), st = /* @__PURE__ */ at(Pp, [["__scopeId", "data-v-49db84b0"]]), Ip = {
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
    ), o = D(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = D(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = D(() => {
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
        case "neutral":
        default:
          return l ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (l, d) => n.value ? (y(), w("span", {
      key: 0,
      role: "status",
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (y(), w("span", Ip, [...d[0] || (d[0] = [
        r("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      r("span", {
        class: H(["min-w-0 flex-1 text-center", s.value])
      }, A(a.value), 3)
    ], 2)) : (y(), w("span", {
      key: 1,
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
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
}).format(e), Ce = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Rp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Op = { class: "overflow-x-auto" }, zp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Vp = /* @__PURE__ */ Z({
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
    function o(b) {
      return b == null || b === "" ? a : String(b);
    }
    function s(b) {
      return b === "center" ? "text-center" : b === "right" ? "text-right" : "text-left";
    }
    function i(b) {
      return `cell-${b}`;
    }
    function l(b, v) {
      return b[v];
    }
    function d(b, v) {
      if (typeof t.rowKey == "function")
        return t.rowKey(b);
      const g = b[t.rowKey];
      return typeof g == "string" || typeof g == "number" ? g : v;
    }
    function c(b, v) {
      return d(b, v);
    }
    const u = D(() => t.rows?.length ?? 0), h = D(() => u.value > t.maxVisibleRows), m = D(() => Math.max(0, u.value - t.maxVisibleRows)), _ = D(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), p = D(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(m.value))
    );
    return (b, v) => (y(), w("div", Rp, [
      r("div", Op, [
        r("table", zp, [
          r("thead", null, [
            r("tr", null, [
              (y(!0), w(K, null, et(e.columns, (g) => (y(), w("th", {
                key: g.key,
                scope: "col",
                class: H(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [s(g.align), g.headerClass]])
              }, A(g.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (y(!0), w(K, null, et(_.value, (g, f) => (y(), w("tr", {
              key: c(g, f)
            }, [
              (y(!0), w(K, null, et(e.columns, (k) => (y(), w("td", {
                key: `${f}-${k.key}`,
                class: H(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [s(k.align), k.cellClass]])
              }, [
                $t(b.$slots, i(k.key), {
                  row: g,
                  column: k,
                  value: l(g, k.key)
                }, () => [
                  yt(A(o(l(g, k.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (y(), w("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: v[0] || (v[0] = (g) => n.value = !n.value)
      }, [
        yt(A(n.value ? e.viewLessLabel : p.value) + " ", 1),
        (y(), w("svg", {
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
      ])) : z("", !0)
    ]));
  }
}), Jt = /* @__PURE__ */ at(Vp, [["__scopeId", "data-v-58cfdc5e"]]), Np = {
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
    const a = e, o = t, s = (f) => {
      o("export", f);
    }, i = D(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (f, k) => new Date(f.date).getTime() - new Date(k.date).getTime()
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
      return f.length === 0 ? p(0) : f.map((k) => `${k.currency} ${p(k.total_value)}`).join(" · ");
    }), h = (f) => f.payment_success_value || [], m = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce((k, x) => k + (x.count || 0), 0), _ = (f) => xt(f), p = (f) => f == null ? "0" : Ce(f);
    D(() => (a.data?.total_payment_success_value || []).reduce((f, k) => f + (k.total_value || 0), 0));
    const b = D(() => {
      const f = a.data, k = f.total_booking_initiated || 0, x = f.total_booking_started || 0, $ = f.total_payment_initiated || 0, C = f.total_not_found || 0, M = f.total_cancelled || 0, S = f.total_no_pending_balance || 0, L = f.total_errors || 0, T = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce((Q, J) => Q + (J.count || 0), 0), B = f.total_payment_failed || 0, E = Math.max(0, k - x), P = Math.max(0, x - $ - C - M - S - L), N = (Q, J) => {
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
      ], W = [];
      return x > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: N(x, k)
      }), E > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: N(E, k)
      }), $ > 0 && W.push({
        source: "Started",
        target: "Payment Initiated",
        value: $,
        label: N($, x)
      }), C > 0 && W.push({
        source: "Started",
        target: "Not Found",
        value: C,
        label: N(C, x)
      }), M > 0 && W.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: N(M, x)
      }), S > 0 && W.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: N(S, x)
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
        label: N(T, $)
      }), B > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: B,
        label: N(B, $)
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
    }, g = (f, k) => !k || k === 0 ? "0%" : `${Math.round(f / k * 100)}%`;
    return (f, k) => (y(), tt(ht, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis"
    }, Tt({
      default: I(() => [
        a.loading ? (y(), w("div", Np, [...k[0] || (k[0] = [
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
        ])])) : a.error ? (y(), w("div", jp, [
          r("div", Wp, [
            k[1] || (k[1] = r("div", { class: "error-icon-wrapper" }, [
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
            k[2] || (k[2] = r("p", { class: "error-title" }, "Error loading data", -1)),
            r("p", Hp, A(a.error), 1)
          ])
        ])) : (y(), w("div", Yp, [
          r("section", Kp, [
            r("div", qp, [
              R(Fe, {
                data: b.value,
                "node-colors": v,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", Up, [
            R(st, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (y(), w("section", Xp, [
            k[3] || (k[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Gp, [
              R(Jt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  r("span", Zp, A(F(It)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: x }) => [
                  r("span", null, A(F(q)(Number(x.booking_initiated_count))), 1)
                ]),
                "cell-started": I(({ row: x }) => [
                  r("span", null, [
                    yt(A(F(q)(Number(x.booking_started_count))) + " ", 1),
                    r("span", Qp, " (" + A(g(Number(x.booking_started_count), Number(x.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": I(({ row: x }) => [
                  r("span", null, A(F(q)(Number(x.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": I(({ row: x }) => [
                  r("div", Jp, [
                    R(jt, { color: "success" }, {
                      default: I(() => [
                        yt(" Success: " + A(F(q)(m(x))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "danger" }, {
                      default: I(() => [
                        yt(" Failed: " + A(F(q)(Number(x.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": I(({ row: x }) => [
                  h(x).length > 0 ? (y(), w("div", tm, [
                    (y(!0), w(K, null, et(h(x), ($) => (y(), w("span", {
                      key: `${x.date}-${$.currency}`,
                      class: "badge badge-currency"
                    }, A($.currency) + " " + A(_($.total_value)), 1))), 128))
                  ])) : (y(), w("span", em, "N/A"))
                ]),
                "cell-outcomes": I(({ row: x }) => [
                  r("div", nm, [
                    R(jt, { color: "danger" }, {
                      default: I(() => [
                        yt(" Not Found: " + A(x.not_found_count ? F(q)(Number(x.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "warning" }, {
                      default: I(() => [
                        yt(" Cancelled: " + A(x.cancelled_count ? F(q)(Number(x.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "orange" }, {
                      default: I(() => [
                        yt(" No Balance: " + A(x.no_pending_balance_count ? F(q)(Number(x.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    R(jt, { color: "danger" }, {
                      default: I(() => [
                        yt(" Errors: " + A(x.error_count ? F(q)(Number(x.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (y(), w("section", am, [...k[4] || (k[4] = [
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
        fn: I(() => [
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
}), sm = /* @__PURE__ */ at(om, [["__scopeId", "data-v-d4f6350a"]]), im = {
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
    }, l = nt([]), d = [
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
      const f = o.data;
      return f && (Array.isArray(f.checkin_by_day) && f.checkin_by_day.length > 0 || (f.total_checkin_initiated ?? 0) > 0) ? { ...s, ...f } : o.checkinData ?? s;
    }), h = D(() => {
      const f = o.data;
      return f && (Array.isArray(f.failed_by_step_by_day) && f.failed_by_step_by_day.length > 0 || Array.isArray(f.unrecovered_by_step) && f.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: f.total_checkin_failed ?? 0,
        total_checkin_unrecovered: f.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: f.failed_by_step_by_day ?? [],
        unrecovered_by_step: f.unrecovered_by_step ?? [],
        unrecovered_by_day: f.unrecovered_by_day ?? []
      } : o.failedData ?? i;
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
      return (h.value.unrecovered_by_step || []).forEach((x) => {
        const C = x.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), M = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        f[C] = M[C] || "#DC2626";
      }), f;
    }), _ = (f, k) => !k || k === 0 ? "0%" : `${Math.round(f / k * 100)}%`, p = (f, k) => {
      const x = q(f), $ = _(f, k);
      return `${x} (${$})`;
    }, b = (f) => f.reduce((k, x) => k + x.failed_count, 0), v = D(() => {
      const f = [], k = [];
      if (!u.value.total_checkin_initiated)
        return { nodes: f, links: k };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const x = u.value.total_checkin_initiated, $ = u.value.total_checkin_init, C = u.value.total_checkin_init_abandoned, M = $ - C, S = u.value.total_checkin_started, L = u.value.total_checkin_completed, T = u.value.total_checkin_closed, B = h.value.unrecovered_by_step || [], E = B.reduce((W, Q) => W + Q.count, 0);
      if ($ > 0) {
        const W = Math.round($ / x * 100);
        k.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: $,
          label: `${$.toLocaleString()} (${W}%)`
        });
      }
      const P = x - $;
      if (P > 0) {
        const W = Math.round(P / x * 100);
        f.push({ name: "Abandoned (Init)" }), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: P,
          label: `${P.toLocaleString()} (${W}%)`
        });
      }
      if (C > 0) {
        const W = Math.round(C / x * 100);
        f.push({ name: "Abandoned (Started)" }), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${W}%)`
        });
      }
      if (M > 0) {
        const W = Math.round(M / x * 100);
        k.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: M,
          label: `${M.toLocaleString()} (${W}%)`
        });
      }
      if (S > 0) {
        const W = Math.round(S / x * 100);
        k.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${W}%)`
        });
      }
      if (L > 0) {
        const W = Math.round(L / S * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: L,
          label: `${L.toLocaleString()} (${W}%)`
        });
      }
      if (B.length > 0 && E > 0) {
        f.push({ name: "Unrecovered" });
        const W = Math.round(E / S * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${W}%)`
        }), B.forEach((Q) => {
          const lt = Q.step_name.replace(/_/g, " ").split(" ").map((pt) => pt.charAt(0).toUpperCase() + pt.slice(1)).join(" "), vt = Math.round(Q.count / S * 100);
          f.push({ name: lt }), k.push({
            source: "Unrecovered",
            target: lt,
            value: Q.count,
            label: `${Q.count.toLocaleString()} (${vt}%)`
          });
        });
      }
      const N = S - (L + E);
      if (N > 0) {
        const W = Math.round(N / S * 100);
        f.push({ name: "Abandoned (Flow)" }), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${W}%)`
        });
      }
      const Y = L - T;
      if (Y > 0) {
        const W = Math.round(Y / S * 100);
        f.push({ name: "BP Error" }), k.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${W}%)`
        });
      }
      if (T > 0) {
        const W = Math.round(T / S * 100);
        k.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${W}%)`
        });
      }
      return { nodes: f, links: k };
    }), g = () => {
      const f = u.value.checkin_by_day || [], k = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((x) => {
        const $ = k.find(
          (C) => C.date === x.date
        );
        return {
          ...x,
          failed_steps: $?.steps || []
        };
      }), l.value.sort((x, $) => new Date(x.date) - new Date($.date));
    };
    return Rt(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        g();
      },
      { deep: !0, immediate: !0 }
    ), (f, k) => (y(), tt(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, Tt({
      default: I(() => [
        o.loading ? (y(), w("div", im, [...k[0] || (k[0] = [
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
        ])])) : (y(), w("div", lm, [
          v.value.nodes.length > 0 ? (y(), w("section", rm, [
            r("div", cm, [
              R(Fe, {
                data: v.value,
                height: "500px",
                "node-colors": m.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : z("", !0),
          l.value && l.value.length > 0 ? (y(), w("section", dm, [
            r("div", um, [
              R(Jt, {
                columns: d,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: x }) => [
                  r("span", hm, A(F(It)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: x }) => [
                  r("span", null, A(F(q)(x.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: x }) => [
                  r("span", null, A(p(x.checkin_init_count, x.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": I(({ row: x }) => [
                  r("span", null, A(F(q)(x.checkin_started_count)), 1)
                ]),
                "cell-completed": I(({ row: x }) => [
                  r("span", null, A(p(x.checkin_completed_count, x.checkin_started_count)), 1)
                ]),
                "cell-closed": I(({ row: x }) => [
                  r("span", fm, A(p(x.checkin_closed_count, x.checkin_started_count)), 1)
                ]),
                "cell-failed": I(({ row: x }) => [
                  r("span", gm, A(p(b(x.failed_steps), x.checkin_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: x }) => [
                  x.failed_steps && x.failed_steps.length > 0 ? (y(), w("div", pm, [
                    (y(!0), w(K, null, et(x.failed_steps, ($) => (y(), w("div", {
                      key: $.step_name,
                      class: "reason-item"
                    }, [
                      r("span", mm, A($.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", bm, A($.failed_count), 1)
                    ]))), 128))
                  ])) : (y(), w("div", vm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (y(), w("section", ym, [...k[1] || (k[1] = [
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
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}, Hi = /* @__PURE__ */ at(_m, [["__scopeId", "data-v-1beb998a"]]), xm = {
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
}, Em = { class: "empty-state-content" }, Pm = { class: "empty-icon-wrapper" }, Im = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (g) => {
      o("export", g);
    }, { isDark: i } = dt(rt(a, "theme")), l = (g) => g == null ? "0" : g.toLocaleString(), d = (g) => {
      const [f, k, x] = g.split("-").map(Number);
      return It([f, k - 1, x]).format("MMM DD");
    }, c = (g) => g.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), u = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, h = (g, f) => {
      const k = g || 0, x = f || 0, $ = l(k), C = u(k, x);
      return `${$} (${C})`;
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
    })), _ = D(() => {
      const g = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], k = a.failedData?.unrecovered_by_day || [];
      return g.map(($) => {
        const C = f.find((S) => S.date === $.date), M = k.find((S) => S.date === $.date);
        return {
          ...$,
          failed_steps: C?.steps || [],
          unrecovered_count: M?.unrecovered_count || 0
        };
      }).sort(($, C) => new Date($.date).getTime() - new Date(C.date).getTime());
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
      const g = [], f = [], k = /* @__PURE__ */ new Set(), x = (V) => {
        k.has(V) || (g.push({ name: V }), k.add(V));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: g, links: f };
      x("Checkin Init"), x("Booking Retrieval"), x("Booking Retrieved"), x("Completed"), x("Closed with BP");
      const $ = a.checkinData.total_checkin_initiated || 0, C = a.checkinData.total_record_locator_init || 0, M = a.checkinData.total_record_locator_init_abandoned || 0, S = a.checkinData.total_checkin_pre_init_abandoned_error, L = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = S != null || L != null, B = T ? Math.max(Number(S) || 0, 0) : 0, E = T ? Math.max(Number(L) || 0, 0) : 0, P = a.checkinData.total_record_locator_init_abandoned_error, N = a.checkinData.total_record_locator_init_abandoned_voluntary, Y = P != null || N != null, W = Y ? Math.max(Number(P) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, J = Y ? Math.max(M - W - Q, 0) : M, lt = C - M, vt = a.checkinData.total_record_locator_started || 0, pt = a.checkinData.total_record_locator_completed || 0, ct = a.checkinData.total_record_locator_closed || 0, Mt = a.checkinData.total_record_locator_unrecovered || 0;
      if (C > 0) {
        const V = Math.round(C / $ * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: C,
          label: `${C.toLocaleString()} (${V}%)`
        });
      }
      const ot = $ - C;
      if (T) {
        if (E > 0) {
          const V = Math.round(E / $ * 100);
          x("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${V}%)`
          });
        }
        if (B > 0) {
          const V = Math.round(B / $ * 100);
          x("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: B,
            label: `${B.toLocaleString()} (${V}%)`
          });
        }
      } else if (ot > 0) {
        const V = Math.round(ot / $ * 100);
        x("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: ot,
          label: `${ot.toLocaleString()} (${V}%)`
        });
      }
      if (Y) {
        if (W > 0) {
          const V = Math.round(W / $ * 100);
          x("Error"), f.push({
            source: "Booking Retrieval",
            target: "Error",
            value: W,
            label: `${W.toLocaleString()} (${V}%)`
          });
        }
        if (Q > 0) {
          const V = Math.round(Q / $ * 100);
          x("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: Q,
            label: `${Q.toLocaleString()} (${V}%)`
          });
        }
        if (J > 0) {
          const V = Math.round(J / $ * 100);
          x("Abandoned (Started)"), f.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: J,
            label: `${J.toLocaleString()} (${V}%)`
          });
        }
      } else if (M > 0) {
        const V = Math.round(M / $ * 100);
        x("Abandoned (Started)"), f.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${V}%)`
        });
      }
      if (lt > 0) {
        const V = Math.round(lt / $ * 100);
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
        x("Errors");
        const V = Math.round(Mt / vt * 100);
        f.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: Mt,
          label: `${Mt.toLocaleString()} (${V}%)`
        });
      }
      const Pt = vt - (pt + Mt);
      if (Pt > 0) {
        const V = Math.round(Pt / vt * 100);
        x("Abandoned (Flow)"), f.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Pt,
          label: `${Pt.toLocaleString()} (${V}%)`
        });
      }
      const At = pt - ct;
      if (At > 0) {
        const V = Math.round(At / vt * 100);
        x("BP Error"), f.push({
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
    return t({ isDark: i }), (g, f) => (y(), tt(ht, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, Tt({
      default: I(() => [
        e.loading ? (y(), w("div", xm, [...f[0] || (f[0] = [
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
        ])])) : (y(), w("div", km, [
          v.value.nodes.length > 0 ? (y(), w("div", wm, [
            R(Fe, {
              data: v.value,
              height: "500px",
              "node-colors": m.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : z("", !0),
          _.value && _.value.length > 0 ? (y(), w("div", Cm, [
            r("div", $m, [
              R(Jt, {
                columns: p,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: k }) => [
                  r("span", Mm, A(d(String(k.date))), 1)
                ]),
                "cell-checkinInit": I(({ row: k }) => [
                  r("span", null, A(l(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": I(({ row: k }) => [
                  r("span", null, A(h(k.record_locator_init_count, k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": I(({ row: k }) => [
                  r("span", null, A(h(k.record_locator_started_count, k.record_locator_init_count)), 1)
                ]),
                "cell-completed": I(({ row: k }) => [
                  r("span", null, A(h(k.record_locator_completed_count, k.record_locator_started_count)), 1)
                ]),
                "cell-closed": I(({ row: k }) => [
                  r("span", Sm, A(h(k.record_locator_closed_count, k.record_locator_started_count)), 1)
                ]),
                "cell-failed": I(({ row: k }) => [
                  r("span", Dm, A(h(k.unrecovered_count, k.record_locator_started_count)), 1)
                ]),
                "cell-reasons": I(({ row: k }) => [
                  Array.isArray(k.failed_steps) && k.failed_steps.length > 0 ? (y(), w("div", Am, [
                    (y(!0), w(K, null, et(k.failed_steps, (x) => (y(), w("div", {
                      key: x.step_name,
                      class: "reason-item"
                    }, [
                      r("span", Tm, A(c(x.step_name)) + ":", 1),
                      r("span", Bm, A(x.failed_count), 1)
                    ]))), 128))
                  ])) : (y(), w("div", Lm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (y(), w("div", Fm, [
            r("div", Em, [
              r("div", Pm, [
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
        fn: I(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["default-open"]));
  }
}), Rm = /* @__PURE__ */ at(Im, [["__scopeId", "data-v-4b78de4b"]]), Om = {
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
}, e0 = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (g) => {
      o("export", g);
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
    ), m = D(() => a.data), _ = D(() => ({
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
      const k = q(g), x = p(g, f);
      return `${k} (${x})`;
    }, v = D(() => {
      const g = [], f = [], k = /* @__PURE__ */ new Set(), x = (ot) => {
        k.has(ot) || (g.push({ name: ot }), k.add(ot));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: g, links: f };
      x("Checkin Init"), x("Booking retrive"), x("Checkin Started"), x("Checkin Completed"), x("Checkin Closed");
      const $ = m.value.total_checkin_initiated, C = m.value.total_record_locator_init, M = m.value.total_record_locator_started, S = m.value.total_record_locator_completed, L = m.value.total_record_locator_closed, T = m.value.total_record_locator_failed, B = m.value.total_record_locator_abandoned, E = m.value.total_record_locator_init_abandoned, P = m.value.total_checkin_pre_init_abandoned_error, N = m.value.total_checkin_pre_init_abandoned_voluntary, Y = P != null || N != null, W = Y ? Math.max(Number(P) || 0, 0) : 0, Q = Y ? Math.max(Number(N) || 0, 0) : 0, J = m.value.total_record_locator_init_abandoned_error, lt = m.value.total_record_locator_init_abandoned_voluntary, vt = J != null || lt != null, pt = vt ? Math.max(Number(J) || 0, 0) : 0, ct = vt ? Math.max(Number(lt) || 0, 0) : 0;
      if (C > 0) {
        const ot = Math.round(C / $ * 100);
        f.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: C,
          label: `${C.toLocaleString()} (${ot}%)`
        });
      }
      const Mt = $ - C;
      if (Y) {
        if (Q > 0) {
          const ot = Math.round(Q / $ * 100);
          x("Abandoned (Init)"), f.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: Q,
            label: `${Q.toLocaleString()} (${ot}%)`
          });
        }
        if (W > 0) {
          const ot = Math.round(W / $ * 100);
          x("Booking not retreived"), f.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: W,
            label: `${W.toLocaleString()} (${ot}%)`
          });
        }
      } else if (Mt > 0) {
        const ot = Math.round(Mt / $ * 100);
        x("Abandoned (Init)"), f.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Mt,
          label: `${Mt.toLocaleString()} (${ot}%)`
        });
      }
      if (M > 0) {
        const ot = Math.round(M / $ * 100);
        f.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: M,
          label: `${M.toLocaleString()} (${ot}%)`
        });
      }
      if (vt) {
        if (pt > 0) {
          const ot = Math.round(pt / $ * 100);
          x("Error"), f.push({
            source: "Booking retrive",
            target: "Error",
            value: pt,
            label: `${pt.toLocaleString()} (${ot}%)`
          });
        }
        if (ct > 0) {
          const ot = Math.round(ct / $ * 100);
          x("Abandoned (Started)"), f.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: ct,
            label: `${ct.toLocaleString()} (${ot}%)`
          });
        }
      } else if (E > 0) {
        const ot = Math.round(E / $ * 100);
        x("Abandoned (Started)"), f.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${ot}%)`
        });
      }
      if (S > 0) {
        const ot = Math.round(S / M * 100);
        f.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: S,
          label: `${S.toLocaleString()} (${ot}%)`
        });
      }
      if (L > 0) {
        const ot = Math.round(L / M * 100);
        f.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: L,
          label: `${L.toLocaleString()} (${ot}%)`
        });
      }
      if (T > 0) {
        const ot = Math.round(T / M * 100);
        x("Checkin Failed"), f.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${ot}%)`
        });
      }
      if (B > 0) {
        const ot = Math.round(B / M * 100);
        x("Abandoned (Flow)"), f.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${ot}%)`
        });
      }
      return { nodes: g, links: f };
    });
    return t({ isDark: i }), (g, f) => (y(), tt(ht, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible
    }, Tt({
      default: I(() => [
        a.loading ? (y(), w("div", Om, [...f[0] || (f[0] = [
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
        ])])) : (y(), w("div", zm, [
          v.value.nodes.length > 0 ? (y(), w("section", Vm, [
            r("div", Nm, [
              R(Fe, {
                data: v.value,
                height: "500px",
                "node-colors": _.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : z("", !0),
          l.value && l.value.length > 0 ? (y(), w("section", jm, [
            r("div", Wm, [
              R(Jt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: k }) => [
                  r("span", Hm, A(F(It)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": I(({ row: k }) => [
                  r("span", Ym, A(F(q)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": I(({ row: k }) => [
                  r("span", Km, A(b(k.record_locator_init_count, k.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": I(({ row: k }) => [
                  r("span", qm, A(F(q)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": I(({ row: k }) => [
                  r("span", Um, A(b(k.record_locator_completed_count, k.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": I(({ row: k }) => [
                  r("span", Xm, A(b(k.record_locator_closed_count, k.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": I(({ row: k }) => [
                  r("span", Gm, A(b(k.record_locator_failed_count, k.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": I(({ row: k }) => [
                  r("span", Zm, A(b(k.record_locator_abandoned_count, k.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": I(({ row: k }) => [
                  r("span", Qm, A(F(q)(k.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": I(({ row: k }) => [
                  r("span", Jm, A(F(q)(k.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (y(), w("section", t0, [...f[1] || (f[1] = [
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
        fn: I(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible"]));
  }
}), Yi = /* @__PURE__ */ at(e0, [["__scopeId", "data-v-9cee2d59"]]), n0 = {
  key: 0,
  class: "loading-state"
}, a0 = {
  key: 1,
  class: "card-body"
}, o0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, s0 = { class: "w-full min-w-0" }, i0 = { class: "segment-plain" }, l0 = { class: "segment-plain" }, r0 = { class: "segment-plain" }, c0 = { class: "percentage-value" }, d0 = { class: "percentage-value" }, u0 = { class: "percentage-value success" }, h0 = {
  key: 1,
  class: "empty-state"
}, f0 = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (m) => {
      o("export", m);
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
      () => a.data.map((m, _) => ({
        id: `segment-${_}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, _) => !_ || _ === 0 || !m ? "0%" : `${Math.round(m / _ * 100)}%`, u = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), h = (m) => {
      const _ = u(m?.departure_airport), p = u(m?.arrival_airport);
      return _ === "-" || p === "-" ? !1 : _ === p;
    };
    return t({ isDark: i }), (m, _) => (y(), tt(ht, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, Tt({
      default: I(() => [
        a.loading ? (y(), w("div", n0, [..._[0] || (_[0] = [
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
        ])])) : (y(), w("div", a0, [
          a.data.length > 0 ? (y(), w("section", o0, [
            r("div", s0, [
              R(Jt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": I(({ row: p }) => [
                  r("span", i0, A(u(p.departure_airport)), 1)
                ]),
                "cell-connection": I(({ row: p }) => [
                  r("span", {
                    class: H(["segment-plain", {
                      "segment-plain--muted": u(p.conexion_airport) === "-"
                    }])
                  }, A(u(p.conexion_airport)), 3)
                ]),
                "cell-arrival": I(({ row: p }) => [
                  r("span", l0, A(u(p.arrival_airport)), 1)
                ]),
                "cell-trip": I(({ row: p }) => [
                  r("span", r0, A(h(p) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": I(({ row: p }) => [
                  yt(A(F(q)(p.segment_init_count)), 1)
                ]),
                "cell-started": I(({ row: p }) => [
                  r("span", c0, A(c(p.segment_started_count, p.segment_init_count)), 1)
                ]),
                "cell-completed": I(({ row: p }) => [
                  r("span", d0, A(c(p.segment_completed_count, p.segment_init_count)), 1)
                ]),
                "cell-closed": I(({ row: p }) => [
                  r("span", u0, A(c(p.segment_closed_count, p.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (y(), w("section", h0, [..._[1] || (_[1] = [
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
        fn: I(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["collapsible", "default-open"]));
  }
}), Ki = /* @__PURE__ */ at(f0, [["__scopeId", "data-v-22b55b09"]]), g0 = { class: "checkin-container__body" }, p0 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = D(() => n.loading || n.checkinLoading);
    D(() => n.loading || n.checkinMetricsLoading);
    const s = D(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = D(() => n.loading || n.segmentsLoading), l = D(() => n.recordLocatorData ?? n.checkinMetricsData);
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
    return (h, m) => (y(), tt(ht, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", g0, [
          e.showCheckin ? (y(), tt(Hi, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[0] || (m[0] = (_) => d("checkin", _))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : z("", !0),
          R(Yi, {
            collapsible: !1,
            loading: s.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[1] || (m[1] = (_) => d("recordLocator", _))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          R(Ki, {
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
}, E0 = /* @__PURE__ */ Z({
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
    const a = e, o = t, s = (g) => {
      o("export", g);
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
    }), h = (g, f) => !f || f === 0 ? "0%" : `${Math.round(g / f * 100)}%`, m = (g) => xt(g), _ = (g) => (g ?? []).reduce((f, k) => f + (k.count ?? 0), 0), p = (g) => typeof g.sell_success_count == "number" ? g.sell_success_count : _(g.payment_success_total), b = D(() => {
      const g = a.data, f = g.total_disruption_conversations || 0, k = g.total_disruption_initiated || 0, x = g.total_voluntary || 0, $ = g.total_involuntary || 0, C = g.total_accepted || 0, M = g.total_confirmed || 0, S = typeof g.total_sell_success == "number" ? g.total_sell_success : _(g.total_payment_success), L = g.total_sell_failed || 0, T = Math.max(0, f - k), B = Math.max(0, k - x - $), E = Math.max(0, $ - C), P = Math.max(0, x - M), N = L, Y = Math.max(0, M - S - N), W = (lt, vt) => {
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
      return k > 0 && J.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: W(k, f)
      }), T > 0 && J.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: W(T, f)
      }), x > 0 && J.push({
        source: "Started",
        target: "Voluntary",
        value: x,
        label: W(x, f)
      }), $ > 0 && J.push({
        source: "Started",
        target: "Involuntary",
        value: $,
        label: W($, f)
      }), B > 0 && J.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: W(B, f)
      }), C > 0 && J.push({
        source: "Involuntary",
        target: "Accepted",
        value: C,
        label: W(C, f)
      }), E > 0 && J.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: E,
        label: W(E, f)
      }), M > 0 && J.push({
        source: "Voluntary",
        target: "Confirmed",
        value: M,
        label: W(M, f)
      }), P > 0 && J.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: W(P, f)
      }), S > 0 && J.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: W(S, f)
      }), N > 0 && J.push({
        source: "Confirmed",
        target: "Rejected",
        value: N,
        label: W(N, f)
      }), Y > 0 && J.push({
        source: "Confirmed",
        target: "Not Paid",
        value: Y,
        label: W(Y, f)
      }), { nodes: Q, links: J };
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
    return (g, f) => (y(), tt(ht, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking"
    }, Tt({
      default: I(() => [
        a.loading ? (y(), w("div", b0, [...f[0] || (f[0] = [
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
        ])])) : (y(), w("div", v0, [
          r("section", y0, [
            r("div", _0, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (y(), tt(Fe, {
                key: 0,
                data: b.value,
                "node-colors": v,
                height: "500px"
              }, null, 8, ["data"])) : (y(), w("div", x0, [...f[1] || (f[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", k0, [
            R(st, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (y(), w("section", w0, [
            f[2] || (f[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", C0, [
              R(Jt, {
                columns: l,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: k }) => [
                  r("span", $0, A(F(It)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": I(({ row: k }) => [
                  r("span", M0, A(F(q)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": I(({ row: k }) => [
                  r("span", S0, [
                    yt(A(F(q)(Number(k.disruption_initiated_count))) + " ", 1),
                    r("span", D0, " (" + A(h(Number(k.disruption_initiated_count), Number(k.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": I(({ row: k }) => [
                  r("span", A0, [
                    r("span", T0, A(F(q)(Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count))) + " (" + A(h(Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count), Number(k.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": I(({ row: k }) => [
                  r("div", B0, [
                    (y(!0), w(K, null, et([k], (x, $) => (y(), w(K, { key: $ }, [
                      R(jt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: I(() => [
                          yt(" VOL " + A(F(q)(x.voluntary_count)) + " (" + A(h(x.voluntary_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "success" }, {
                        default: I(() => [
                          yt(" Confirm " + A(F(q)(x.confirmed_count)) + " (" + A(h(x.confirmed_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "warning" }, {
                        default: I(() => [
                          yt(" Not Confirm " + A(F(q)(x.voluntary_count - x.confirmed_count)) + " (" + A(h(x.voluntary_count - x.confirmed_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "danger" }, {
                        default: I(() => [
                          yt(" Reject " + A(F(q)(x.sell_failed_count)) + " (" + A(h(x.sell_failed_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "orange" }, {
                        default: I(() => [
                          yt(" Not Paid " + A(F(q)(Math.max(0, x.confirmed_count - p(x) - x.sell_failed_count))) + " (" + A(h(Math.max(0, x.confirmed_count - p(x) - x.sell_failed_count), x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: I(() => [
                          yt(" Finish " + A(F(q)(p(x))) + " (" + A(h(p(x), x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (y(!0), w(K, null, et(x.payment_success_total || [], (C) => (y(), tt(jt, {
                        key: `${x.date}-${C.currency}`,
                        color: "neutral"
                      }, {
                        default: I(() => [
                          yt(A(C.currency) + " " + A(m(C.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": I(({ row: k }) => [
                  r("div", L0, [
                    (y(!0), w(K, null, et([k], (x, $) => (y(), w(K, { key: $ }, [
                      R(jt, { color: "purple" }, {
                        default: I(() => [
                          yt(" INV " + A(F(q)(x.involuntary_count)) + " (" + A(h(x.involuntary_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "danger" }, {
                        default: I(() => [
                          yt(" Human " + A(F(q)(x.involuntary_count - x.accepted_count)) + " (" + A(h(x.involuntary_count - x.accepted_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      R(jt, { color: "success" }, {
                        default: I(() => [
                          yt(" Accept " + A(F(q)(x.accepted_count)) + " (" + A(h(x.accepted_count, x.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (y(), w("section", F0, [...f[3] || (f[3] = [
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
        fn: I(() => [
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
}), P0 = /* @__PURE__ */ at(E0, [["__scopeId", "data-v-0aeb0a8c"]]), I0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, R0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, O0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, z0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, V0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, N0 = /* @__PURE__ */ Z({
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
    const a = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], s = e, i = n, l = (v) => {
      i("export", v);
    }, d = rt(s, "theme"), { isDark: c } = dt(d), u = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = nt({ labels: [], datasets: [] }), m = D(
      () => s.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), _ = D(() => {
      const v = m.value, g = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, f = ($) => g > 0 ? ($ / g * 100).toFixed(1) : "0.0", k = v.total_faq_events, x = k > 0 ? `${(v.total_documents_found / k * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: u.airline_information,
          value: `${f(v.total_airline_information_retrieved)}%`,
          subvalue: `${q(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: u.booking_info,
          value: `${f(v.total_booking_info_retrieved)}%`,
          subvalue: `${q(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: u.flight_status,
          value: `${f(v.total_flight_status_retrieved)}%`,
          subvalue: `${q(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: q(v.total_documents_found),
          subvalue: x
        }
      ];
    }), p = D(() => {
      const v = _.value.length;
      return v <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : v === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : v === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    }), b = (v) => {
      if (!v) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const g = v.faq_by_day || [];
      if (g.length > 0) {
        const f = g.map((C) => It(C.date).format("MMM DD")), k = g.map((C) => C.airline_information_retrieved_count || 0), x = g.map((C) => C.flight_status_retrieved_count || 0), $ = g.map((C) => C.booking_info_retrieved_count || 0);
        h.value = {
          labels: f,
          datasets: [
            {
              label: "Airline Information",
              data: k,
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
              data: $,
              borderColor: u.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        h.value = { labels: [], datasets: [] };
    };
    return Rt(
      () => s.data,
      (v) => {
        b(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: c }), (v, g) => (y(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, Tt({
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", s.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          s.loading ? (y(), w("div", I0, [
            r("div", R0, [
              (y(), w(K, null, et(a, (f, k) => r("div", {
                key: k,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[k]]),
                style: gt({ height: `${f}%` })
              }, null, 6)), 64))
            ]),
            g[0] || (g[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (y(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (y(), w("section", O0, [
              r("div", z0, [
                R(ye, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", {
                class: H(p.value)
              }, [
                (y(!0), w(K, null, et(_.value, (f) => (y(), tt(st, {
                  key: f.name,
                  color: f.color,
                  title: f.label,
                  value: f.value,
                  subvalue: f.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : (y(), w("section", V0, [...g[1] || (g[1] = [
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
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), j0 = /* @__PURE__ */ at(N0, [["__scopeId", "data-v-92007b9a"]]), W0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, H0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Y0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, K0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, q0 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, U0 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, X0 = { class: "max-w-[360px] px-4 text-center" }, G0 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Z0 = /* @__PURE__ */ Z({
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
    const a = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], s = {
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
      const b = i.data?.agents_by_day || {}, v = Object.keys(b).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const x of Object.values(b))
        for (const $ of Object.keys(x))
          g.add($);
      const k = Array.from(g).map((x) => {
        const $ = x.toLowerCase(), C = s[$] || s[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: v.map((M) => b[M]?.[x] || 0),
          borderColor: C
        };
      });
      return {
        labels: v.map((x) => It(x).format("MMM DD")),
        datasets: k
      };
    }), m = D(() => {
      const b = i.data?.agents_by_day || {}, v = {};
      for (const f of Object.values(b))
        for (const [k, x] of Object.entries(f))
          v[k] = (v[k] || 0) + x;
      const g = Object.values(v).reduce((f, k) => f + k, 0);
      return g === 0 ? [] : Object.entries(v).sort(([, f], [, k]) => k - f).map(([f, k]) => {
        const x = f.toLowerCase();
        return {
          name: f,
          label: f.charAt(0).toUpperCase() + f.slice(1).replace(/_/g, " "),
          total: k,
          percentage: (k / g * 100).toFixed(1),
          color: s[x] || s[f] || "#94a3b8"
        };
      });
    }), _ = D(() => m.value.slice(0, 4)), p = D(() => {
      const b = _.value.length;
      return b <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : b === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : b === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    });
    return t({ isDark: u }), (b, v) => (y(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, Tt({
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          i.loading ? (y(), w("div", W0, [
            r("div", H0, [
              (y(), w(K, null, et(a, (g, f) => r("div", {
                key: f,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[f]]),
                style: gt({ height: `${g}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (y(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (y(), w("section", Y0, [
              r("div", K0, [
                R(ye, {
                  data: h.value,
                  options: e.options,
                  theme: c.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              _.value.length ? (y(), w("div", {
                key: 0,
                class: H(p.value)
              }, [
                (y(!0), w(K, null, et(_.value, (g) => (y(), tt(st, {
                  key: g.name,
                  color: g.color,
                  title: g.label,
                  value: `${g.percentage}%`,
                  subvalue: `${F(q)(g.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : z("", !0)
            ])) : m.value.length ? (y(), w("section", q0, [
              r("div", {
                class: H(p.value)
              }, [
                (y(!0), w(K, null, et(_.value, (g) => (y(), tt(st, {
                  key: g.name,
                  color: g.color,
                  title: g.label,
                  value: `${g.percentage}%`,
                  subvalue: `${F(q)(g.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : z("", !0),
            m.value.length ? z("", !0) : (y(), w("section", U0, [
              r("div", X0, [
                r("div", G0, [
                  R(F(qt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[1] || (v[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                v[2] || (v[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 2
    }, [
      e.enableExport && !i.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), Q0 = /* @__PURE__ */ at(Z0, [["__scopeId", "data-v-75264875"]]), J0 = {
  key: 0,
  class: "loading-state"
}, tb = {
  key: 1,
  class: "card-body"
}, eb = {
  key: 0,
  class: "chart-section"
}, nb = {
  key: 1,
  class: "empty-state"
}, ab = {
  key: 2,
  class: "comparison-section"
}, ob = { class: "comparison-grid" }, sb = /* @__PURE__ */ Z({
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
    }, o = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], s = e, i = n, l = (p) => {
      i("export", p);
    }, { isDark: d } = dt(rt(s, "theme"));
    D(() => s.data?.total_sell_success ?? 0);
    const c = D(() => {
      const p = /* @__PURE__ */ new Set();
      for (const b of s.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(b.channels))
          p.add(v);
      return Array.from(p).sort();
    }), u = (p, b) => a[p.toLowerCase()] ?? o[b % o.length];
    function h(p) {
      return p.replace(/_/g, " ").toUpperCase();
    }
    function m(p) {
      if (p.delta === null) return "No previous data";
      const b = q(p.previous), v = `${Math.abs(p.delta).toFixed(1)}%`;
      return p.delta === 0 ? `0.0% vs prev. period (${b})` : `${p.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${b})`;
    }
    const _ = D(() => {
      const p = s.data?.sales_by_channel_by_day ?? [];
      if (p.length === 0) return { labels: [], datasets: [] };
      const b = p.map((g) => It(g.date).format("MMM-DD")), v = c.value.map((g, f) => ({
        label: g,
        data: p.map((k) => k.channels[g] ?? 0),
        backgroundColor: u(g, f),
        borderRadius: 4
      }));
      return { labels: b, datasets: v };
    });
    return t({ isDark: d }), (p, b) => (y(), tt(ht, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, Tt({
      default: I(() => [
        s.loading ? (y(), w("div", J0, [...b[0] || (b[0] = [
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
        ])])) : (y(), w("div", tb, [
          _.value.labels.length > 0 ? (y(), w("section", eb, [
            R(be, {
              data: _.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (y(), w("section", nb, [...b[1] || (b[1] = [
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
          e.channelComparison.length > 0 ? (y(), w("section", ab, [
            r("div", ob, [
              (y(!0), w(K, null, et(e.channelComparison, (v, g) => (y(), tt(F(st), {
                key: v.channel,
                color: u(v.channel, g),
                title: h(v.channel),
                value: F(q)(v.current),
                subvalue: m(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), qi = /* @__PURE__ */ at(sb, [["__scopeId", "data-v-4f47ed67"]]), ib = {
  key: 0,
  class: "loading-state"
}, lb = {
  key: 1,
  class: "card-body"
}, rb = {
  key: 0,
  class: "chart-section"
}, cb = { class: "chart-wrapper" }, db = {
  key: 1,
  class: "empty-state"
}, ub = { class: "seller-value-cards" }, hb = {
  key: 2,
  class: "seller-daily-section"
}, fb = { class: "w-full min-w-0" }, gb = { class: "sl-cell font-medium" }, pb = { class: "sl-cell text-center" }, mb = { class: "sl-cell text-center" }, bb = { class: "sl-cell text-center" }, vb = { class: "sl-cell text-center" }, yb = { class: "sl-cell text-center" }, _b = { class: "sl-cell text-center success-value" }, xb = {
  key: 0,
  class: "currency-cell-list"
}, kb = {
  key: 1,
  class: "empty-cell"
}, wb = { class: "sl-cell text-center success-value" }, Cb = { class: "sl-cell text-center" }, $b = { class: "sl-cell text-center success-value" }, Mb = {
  key: 0,
  class: "currency-cell-list"
}, Sb = {
  key: 1,
  class: "empty-cell"
}, Db = { class: "sl-cell text-center success-value" }, Ab = { class: "sl-cell text-center" }, Tb = { class: "sl-cell text-center success-value" }, Bb = {
  key: 0,
  class: "currency-cell-list"
}, Lb = { key: 1 }, Fb = {
  key: 0,
  class: "failed-reasons"
}, Eb = { class: "reason-name" }, Pb = { class: "reason-count" }, Ib = {
  key: 1,
  class: "empty-cell"
}, Rb = /* @__PURE__ */ Z({
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
    const o = e, s = n, i = (B) => {
      s("export", B);
    }, { isDark: l } = dt(rt(o, "theme")), d = D(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const B = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((E) => {
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
    ), h = D(() => o.sellerData), m = D(() => o.failedData), _ = D(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), p = D(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), b = D(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), v = D(() => {
      const B = _.value;
      return B.length > 0 ? B.map((E) => `${E.currency} ${Ce(E.total_value)}`).join(" · ") : T(o.sellerData.total_value_sell_success);
    });
    function g(B) {
      return B.length > 0 ? B.map((E) => `${E.currency} ${Ce(E.total_value)}`).join(" · ") : "—";
    }
    const f = D(
      () => g(p.value)
    ), k = D(
      () => g(b.value)
    ), x = D(() => {
      const {
        total_seller_conversations: B = 0,
        total_sell_started: E = 0,
        total_sell_booking_created: P = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: Y = 0,
        total_sell_cash_option: W = 0,
        total_sell_success_bank_transfer: Q = 0,
        total_sell_success_cash: J = 0
      } = h.value, { failed_by_reason_by_day: lt = [] } = m.value;
      if (B === 0) return { nodes: [], links: [] };
      const vt = Math.max(0, N - (Q ?? 0) - (J ?? 0)), pt = [
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
      const ot = lt.reduce((V, X) => (X.reasons && Array.isArray(X.reasons) && X.reasons.forEach((G) => {
        const it = G.reason, mt = G.failed_count;
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
      if ((Q ?? 0) > 0) {
        const V = Math.round((Q ?? 0) / B * 100);
        pt.push({ name: "Bank Transfer Success", value: Q ?? 0 }), ct.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: Q ?? 0,
          label: `${(Q ?? 0).toLocaleString()} (${V}%)`
        });
      }
      if ((J ?? 0) > 0) {
        const V = Math.round((J ?? 0) / B * 100);
        pt.push({ name: "Cash Option Success", value: J ?? 0 }), ct.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: J ?? 0,
          label: `${(J ?? 0).toLocaleString()} (${V}%)`
        });
      }
      const Pt = P - vt - Y - W;
      if (Pt > 0) {
        const V = Math.round(Pt / B * 100);
        pt.push({ name: "Failed at Completion", value: Pt }), ct.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Pt,
          label: `${Pt.toLocaleString()} (${V}%)`
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
      if (Object.keys(ot).length > 0) {
        const V = Object.values(ot).reduce((G, it) => G + it, 0), X = At - V;
        if (Object.entries(ot).filter(([, G]) => G > 0).sort(([, G], [, it]) => it - G).forEach(([G, it]) => {
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
    }), $ = {
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
    }, C = D(() => $), M = (B, E) => !E || E === 0 ? "0%" : `${Math.round(B / E * 100)}%`, S = (B, E) => {
      const P = q(B), N = M(B, E);
      return `${P} (${N})`;
    }, L = (B) => B == null ? 0 : typeof B == "number" ? B : Array.isArray(B) ? B.reduce((E, P) => E + (P.total_value || 0), 0) : 0, T = (B) => Ce(L(B));
    return t({ isDark: l }), (B, E) => (y(), tt(ht, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, Tt({
      default: I(() => [
        o.loading ? (y(), w("div", ib, [...E[0] || (E[0] = [
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
        ])])) : (y(), w("div", lb, [
          x.value.nodes.length > 0 ? (y(), w("section", rb, [
            r("div", cb, [
              R(Fe, {
                data: x.value,
                "node-colors": C.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (y(), w("section", db, [...E[1] || (E[1] = [
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
          r("section", ub, [
            R(st, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            R(st, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: f.value
            }, null, 8, ["value"]),
            R(st, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: k.value
            }, null, 8, ["value"])
          ]),
          d.value && d.value.length > 0 ? (y(), w("section", hb, [
            r("div", fb, [
              R(Jt, {
                columns: c,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: P }) => [
                  r("span", gb, A(F(It)(String(P.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": I(({ row: P }) => [
                  r("span", pb, A(F(q)(Number(P.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": I(({ row: P }) => [
                  r("span", mb, A(S(P.sell_started_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-getQuote": I(({ row: P }) => [
                  r("span", bb, A(S(P.sell_get_quote_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": I(({ row: P }) => [
                  r("span", vb, A(S(P.sell_booking_created_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": I(({ row: P }) => [
                  r("span", yb, A(F(q)(Number(P.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": I(({ row: P }) => [
                  r("span", _b, [
                    Array.isArray(P.daily_value_sell_success_bank_transfer) && P.daily_value_sell_success_bank_transfer.length > 0 ? (y(), w("div", xb, [
                      (y(!0), w(K, null, et(P.daily_value_sell_success_bank_transfer, (N) => (y(), w("span", {
                        key: `${P.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(Ce)(N.total_value)), 1))), 128))
                    ])) : (y(), w("span", kb, "-"))
                  ])
                ]),
                "cell-btSuccess": I(({ row: P }) => [
                  r("span", wb, A(F(q)(Number(P.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": I(({ row: P }) => [
                  r("span", Cb, A(F(q)(Number(P.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": I(({ row: P }) => [
                  r("span", $b, [
                    Array.isArray(P.daily_value_sell_success_cash) && P.daily_value_sell_success_cash.length > 0 ? (y(), w("div", Mb, [
                      (y(!0), w(K, null, et(P.daily_value_sell_success_cash, (N) => (y(), w("span", {
                        key: `${P.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(F(Ce)(N.total_value)), 1))), 128))
                    ])) : (y(), w("span", Sb, "-"))
                  ])
                ]),
                "cell-cashSuccess": I(({ row: P }) => [
                  r("span", Db, A(F(q)(Number(P.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": I(({ row: P }) => [
                  r("span", Ab, A(S(P.sell_success_count, P.seller_conversations || P.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": I(({ row: P }) => [
                  r("span", Tb, [
                    Array.isArray(P.daily_value_sell_success) && P.daily_value_sell_success.length > 0 ? (y(), w("div", Bb, [
                      (y(!0), w(K, null, et(P.daily_value_sell_success, (N) => (y(), w("span", {
                        key: `${P.date}-${N.currency}`
                      }, A(N.currency) + " " + A(F(Ce)(N.total_value)), 1))), 128))
                    ])) : (y(), w("span", Lb, A(T(P.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": I(({ row: P }) => [
                  (P.reasons || []).length > 0 ? (y(), w("div", Fb, [
                    (y(!0), w(K, null, et(P.reasons || [], (N) => (y(), w("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", Eb, A(N.reason) + ":", 1),
                      r("span", Pb, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (y(), w("div", Ib, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !o.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), Ui = /* @__PURE__ */ at(Rb, [["__scopeId", "data-v-aba5c6c5"]]), Ob = { class: "seller-container__body" }, zb = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = D(() => n.loading || n.sellerLoading), s = D(() => n.loading || n.salesByChannelLoading), i = D(() => n.exportLoading || n.sellerExportLoading), l = D(() => n.exportLoading || n.salesByChannelExportLoading);
    function d(c, u) {
      a("export", { source: c, format: u });
    }
    return (c, u) => (y(), tt(ht, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", Ob, [
          R(Ui, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: u[0] || (u[0] = (h) => d("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          R(qi, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
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
}), Vb = /* @__PURE__ */ at(zb, [["__scopeId", "data-v-878fdbc6"]]), Nb = {
  key: 0,
  class: "card-body"
}, jb = {
  key: 0,
  class: "chart-section"
}, Wb = {
  key: 1,
  class: "empty-state"
}, Hb = { class: "empty-state-content" }, Yb = { class: "empty-icon-wrapper" }, Kb = {
  key: 1,
  class: "loading-state"
}, qb = /* @__PURE__ */ Z({
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
    }, o = e, s = n, i = (h) => {
      s("export", h);
    }, { isDark: l, colors: d } = dt(rt(o, "theme")), c = D(() => {
      const m = (o.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const _ = m.reduce(
        (v, g) => v + (Number(g.conversations) || 0),
        0
      ), p = m.map((v) => {
        const g = v.agent_type?.toLowerCase();
        return a[g] || "#94a3b8";
      }), b = p.map((v) => `${v}80`);
      return {
        labels: m.map((v) => {
          const g = Number(v.conversations) || 0, f = _ ? g / _ * 100 : 0;
          return `${v.agent_type} - ${g.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((v) => v.conversations),
            backgroundColor: b,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => o.options ? o.options : {
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
              const m = (h.label || "").toString().split(" - ")[0], _ = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce(
                (v, g) => v + (Number(g) || 0),
                0
              ), b = p ? _ / p * 100 : 0;
              return `${m}: ${_.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, m) => (y(), tt(ht, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, Tt({
      default: I(() => [
        e.loading ? (y(), w("div", Kb, [...m[2] || (m[2] = [
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
        ])])) : (y(), w("div", Nb, [
          c.value.labels && c.value.labels.length ? (y(), w("section", jb, [
            R(la, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (y(), w("section", Wb, [
            r("div", Hb, [
              r("div", Yb, [
                R(F(ip), { class: "empty-icon" })
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
        fn: I(() => [
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
}), Ub = /* @__PURE__ */ at(qb, [["__scopeId", "data-v-b027642a"]]), Xb = {
  key: 0,
  class: "loading-state"
}, Gb = {
  key: 1,
  class: "card-body"
}, Zb = {
  key: 0,
  class: "payment-methods-section"
}, Qb = { class: "payment-methods-grid" }, Jb = {
  key: 1,
  class: "empty-state"
}, tv = { class: "empty-state-content" }, ev = { class: "empty-icon-wrapper" }, nv = {
  key: 2,
  class: "payment-method-daily-section"
}, av = { class: "w-full min-w-0" }, ov = { class: "font-medium" }, sv = { class: "text-center" }, iv = { class: "text-center success-value" }, lv = {
  key: 0,
  class: "currency-cell-list"
}, rv = { class: "payment-tags" }, cv = { class: "tag-name" }, dv = {
  key: 0,
  class: "tag-amount"
}, uv = {
  key: 1,
  class: "tag-amount"
}, hv = { class: "tag-count" }, fv = {
  key: 3,
  class: "empty-table-state"
}, gv = "Not Registered", pv = /* @__PURE__ */ Z({
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
    const a = e, o = n, { isDark: s } = dt(rt(a, "theme")), i = nt(!1), l = nt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), d = D(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = D(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = D(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((M, S) => It(M.date).valueOf() - It(S.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = D(
      () => u.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), _ = (M) => {
      if (!M)
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
      const S = (M.payment_method_breakdown || []).map((T) => ({
        payment_method: T.payment_method || "Unknown",
        total_amount: T.total_amount ?? 0,
        count: T.count ?? 0,
        total_amount_by_currency: T.total_amount_by_currency ?? []
      })), L = (M.payment_method_by_day || []).map((T) => ({
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
        airline_name: M.airline_name || a.airlineName,
        start_date: M.start_date || "",
        end_date: M.end_date || "",
        total_conversations: M.total_conversations ?? 0,
        total_amount: M.total_amount ?? 0,
        total_sell_usd: M.total_sell_usd,
        total_amount_by_currency: M.total_amount_by_currency ?? [],
        payment_method_breakdown: S,
        payment_method_by_day: L
      };
    }, p = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [M, S] = a.dates.map((T) => It(T).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, M, S);
          l.value = _(L);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), l.value = _(null);
        } finally {
          i.value = !1;
        }
      }
    }, b = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], v = (M) => !M || M.toLowerCase() === "unknown" ? gv : M.replace(/_/g, " "), g = (M) => M == null ? "$0.00" : xt(M), f = (M) => {
      const S = M.total_amount_by_currency;
      return S && S.length > 0 ? S.map((L) => `${L.currency} ${g(L.total_value)}`).join(" · ") : g(M.total_amount);
    }, k = (M) => M ? It(M).format("MMM DD") : "-", x = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function C() {
      const M = a.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, l.value = _(M));
    }
    return ie(() => {
      a.data ? C() : p();
    }), Rt(
      () => a.data,
      (M) => {
        M && C();
      },
      { deep: !0 }
    ), Rt(
      () => a.dates,
      (M) => {
        a.data || M && M[0] && M[1] && p();
      },
      { deep: !0 }
    ), t({ isDark: s }), (M, S) => (y(), tt(ht, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, Tt({
      default: I(() => [
        i.value ? (y(), w("div", Xb, [...S[0] || (S[0] = [
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
        ])])) : (y(), w("div", Gb, [
          d.value ? (y(), w("section", Zb, [
            S[1] || (S[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", Qb, [
              (y(!0), w(K, null, et(l.value.payment_method_breakdown, (L, T) => (y(), tt(st, {
                key: L.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[T % b.length],
                title: v(L.payment_method),
                value: f(L),
                subvalue: `${x(L.count)} ${x(L.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (y(), w("section", Jb, [
            r("div", tv, [
              r("div", ev, [
                R(F(dp), { class: "empty-icon" })
              ]),
              S[2] || (S[2] = r("p", { class: "empty-title" }, "No payment data available", -1)),
              S[3] || (S[3] = r("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          c.value ? (y(), w("section", nv, [
            S[5] || (S[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", av, [
              R(Jt, {
                columns: h,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": I(({ row: L }) => [
                  r("span", ov, A(k(String(L.date))), 1)
                ]),
                "cell-totalSales": I(({ row: L }) => [
                  r("span", sv, A(F(q)(L.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": I(({ row: L }) => [
                  r("span", iv, [
                    Array.isArray(L.total_amount_by_currency) && L.total_amount_by_currency.length > 0 ? (y(), w("div", lv, [
                      (y(!0), w(K, null, et(L.total_amount_by_currency, (T) => (y(), w("span", {
                        key: `${L.date}-${T.currency}`
                      }, A(T.currency) + " " + A(g(T.total_value)), 1))), 128))
                    ])) : (y(), w(K, { key: 1 }, [
                      yt(A(g(Number(L.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": I(({ row: L }) => [
                  r("div", rv, [
                    (y(!0), w(K, null, et(Array.isArray(L.payment_methods) ? L.payment_methods : [], (T) => (y(), w("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", cv, A(v(T.payment_method)), 1),
                      S[4] || (S[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (y(), w("span", dv, A(g(T.total_amount)), 1)) : (y(), w("span", uv, A(T.total_amount_by_currency.map((B) => `${B.currency} ${g(B.total_value)}`).join(" / ")), 1)),
                      r("span", hv, "(" + A(x(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : d.value ? (y(), w("div", fv, [...S[6] || (S[6] = [
            r("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : z("", !0)
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !i.value ? {
        name: "headerExport",
        fn: I(() => [
          R(F(Bt), {
            variant: "inline",
            onExport: $,
            loading: e.exportLoading
          }, null, 8, ["loading"])
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
}), mv = /* @__PURE__ */ at(pv, [["__scopeId", "data-v-21b6865b"]]), bv = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, vv = { class: "overflow-x-auto" }, yv = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, _v = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, xv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, kv = ["checked", "aria-label"], wv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Cv = ["checked", "aria-label", "onChange"], $v = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = nt(null);
    function s(f) {
      return `cell-${f}`;
    }
    function i(f) {
      return f === "center" ? "text-center" : f === "right" ? "text-right" : "text-left";
    }
    function l(f, k) {
      if (typeof n.rowKey == "function")
        return n.rowKey(f);
      const x = f[n.rowKey];
      return x != null ? String(x) : `__index_${k}`;
    }
    function d(f, k) {
      return f[k];
    }
    function c(f) {
      return f == null || typeof f == "object" ? "" : String(f);
    }
    function u(f, k) {
      return l(f, k);
    }
    const h = D(() => n.rows.map((f, k) => l(f, k)));
    function m(f, k) {
      const x = l(f, k);
      return n.selectedKeys.includes(x);
    }
    const _ = D(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((f) => n.selectedKeys.includes(f))), p = D(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const f = h.value.filter((k) => n.selectedKeys.includes(k));
      return f.length > 0 && f.length < n.rows.length;
    });
    Rt(
      [p, _, () => n.selectable],
      async () => {
        await Ot();
        const f = o.value;
        f && (f.indeterminate = p.value && !_.value);
      },
      { immediate: !0 }
    );
    function b() {
      if (n.selectable)
        if (_.value) {
          const f = n.selectedKeys.filter((k) => !h.value.includes(k));
          a("update:selectedKeys", f);
        } else {
          const f = new Set(n.selectedKeys);
          h.value.forEach((k) => f.add(k)), a("update:selectedKeys", [...f]);
        }
    }
    function v(f, k) {
      if (!n.selectable) return;
      const x = l(f, k);
      n.selectedKeys.includes(x) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((C) => C !== x)
      ) : a("update:selectedKeys", [...n.selectedKeys, x]);
    }
    function g(f, k) {
      const x = l(f, k);
      return `${n.ariaLabelSelectRow} ${x}`;
    }
    return (f, k) => (y(), w("div", bv, [
      r("div", vv, [
        r("table", yv, [
          r("thead", null, [
            r("tr", _v, [
              e.selectable ? (y(), w("th", xv, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: _.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: b
                }, null, 40, kv)
              ])) : z("", !0),
              (y(!0), w(K, null, et(e.columns, (x) => (y(), w("th", {
                key: x.key,
                scope: "col",
                class: H([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(x.align),
                  x.headerClass ?? ""
                ])
              }, A(x.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (y(!0), w(K, null, et(e.rows, (x, $) => (y(), w("tr", {
              key: u(x, $),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (y(), w("td", wv, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: m(x, $),
                  "aria-label": g(x, $),
                  onChange: (C) => v(x, $)
                }, null, 40, Cv)
              ])) : z("", !0),
              (y(!0), w(K, null, et(e.columns, (C) => (y(), w("td", {
                key: C.key,
                class: H([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(C.align),
                  C.cellClass ?? ""
                ])
              }, [
                $t(f.$slots, s(C.key), {
                  row: x,
                  column: C,
                  value: d(x, C.key)
                }, () => [
                  yt(A(c(d(x, C.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Xi = /* @__PURE__ */ at($v, [["__scopeId", "data-v-95fc0bc9"]]), Mv = {
  key: 0,
  class: "loading-state"
}, Sv = {
  key: 1,
  class: "card-body"
}, Dv = { class: "summary-cards" }, Av = {
  key: 0,
  class: "summary-card enqueued-card"
}, Tv = { class: "summary-card-content" }, Bv = { class: "card-content enqueued-content" }, Lv = { class: "card-value enqueued-value" }, Fv = { class: "summary-card assigned-card" }, Ev = { class: "summary-card-content" }, Pv = { class: "card-content" }, Iv = { class: "card-value assigned-value" }, Rv = { class: "card-content" }, Ov = { class: "card-value assigned-value" }, zv = { class: "summary-card closed-card" }, Vv = { class: "summary-card-content" }, Nv = { class: "card-content" }, jv = { class: "card-value closed-value" }, Wv = { class: "card-content" }, Hv = { class: "card-value closed-value" }, Yv = {
  key: 0,
  class: "agents-section"
}, Kv = { class: "date-header" }, qv = { class: "date-title" }, Uv = { class: "date-stats" }, Xv = {
  key: 0,
  class: "stat-item enqueued-stat"
}, Gv = { class: "stat-value" }, Zv = { class: "stat-item assigned-stat" }, Qv = { class: "stat-value" }, Jv = { class: "stat-value" }, ty = { class: "stat-item closed-stat" }, ey = { class: "stat-value" }, ny = { class: "stat-value" }, ay = { class: "w-full min-w-0" }, oy = { class: "ah-cell name-cell" }, sy = { class: "ah-cell email-cell" }, iy = { class: "metric-cell-content" }, ly = { class: "badge assigned-badge" }, ry = { class: "metric-cell-avg" }, cy = { class: "metric-cell-content" }, dy = { class: "badge closed-badge" }, uy = { class: "metric-cell-avg" }, hy = ["onClick"], fy = {
  key: 1,
  class: "empty-state"
}, wa = 3, gy = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (S) => {
      o("export", S);
    }, { isDark: i } = dt(rt(a, "theme")), l = D(() => {
      const S = a.data?.agents_by_day && a.data.agents_by_day.length > 0, L = (a.data?.total_enqueued ?? 0) > 0;
      return S || L;
    }), d = D(() => {
      if (!l.value) return {};
      const S = {};
      for (const B of a.data.agents_by_day)
        S[B.date] || (S[B.date] = []), S[B.date].push(B);
      const L = Object.keys(S).sort((B, E) => new Date(B).getTime() - new Date(E).getTime()), T = {};
      for (const B of L)
        T[B] = S[B];
      return T;
    }), c = nt({});
    function u(S) {
      c.value = {
        ...c.value,
        [S]: !c.value[S]
      };
    }
    function h(S, L) {
      return c.value[S] ? L : L.slice(0, wa);
    }
    function m(S) {
      return Math.max(0, S.length - wa);
    }
    function _(S) {
      return S.length > wa;
    }
    const p = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function b(S, L) {
      return h(S, L).map((T, B) => ({
        id: `${S}-${T.agent_email}-${B}`,
        agent_name: T.agent_name,
        agent_email: T.agent_email,
        assigned_count: T.assigned_count,
        closed_count: T.closed_count,
        avg_time_to_assign_seconds: T.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: T.avg_conversation_duration_seconds
      }));
    }
    const v = (S) => S == null ? "0" : q(S), g = (S) => {
      if (S == null)
        return "AVG";
      if (S < 60)
        return `${Math.round(S)}s`;
      const L = Math.round(S), T = Math.floor(L / 60), B = L % 60;
      if (T < 60)
        return `${T}m ${B}s`;
      const E = Math.floor(T / 60), P = T % 60;
      return `${E}h ${P}m`;
    }, f = (S) => {
      const L = new Date(S), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return L.toLocaleDateString("en-US", T);
    }, k = (S) => S[0]?.day_total_enqueued ?? 0, x = (S) => S[0]?.day_total_assigned ?? 0, $ = (S) => S[0]?.day_total_closed ?? 0, C = (S) => S[0]?.day_avg_time_to_assign_seconds ?? null, M = (S) => S[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (S, L) => (y(), tt(ht, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, Tt({
      default: I(() => [
        e.loading ? (y(), w("div", Mv, [...L[0] || (L[0] = [
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
        ])])) : (y(), w("div", Sv, [
          r("div", Dv, [
            e.data.total_enqueued ? (y(), w("div", Av, [
              L[2] || (L[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Tv, [
                r("div", Bv, [
                  L[1] || (L[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", Lv, A(v(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : z("", !0),
            r("div", Fv, [
              L[5] || (L[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Ev, [
                r("div", Pv, [
                  L[3] || (L[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", Iv, A(v(e.data.total_assigned)), 1)
                ]),
                r("div", Rv, [
                  L[4] || (L[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", Ov, A(g(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", zv, [
              L[8] || (L[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Vv, [
                r("div", Nv, [
                  L[6] || (L[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", jv, A(v(e.data.total_closed)), 1)
                ]),
                r("div", Wv, [
                  L[7] || (L[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", Hv, A(g(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (y(), w("div", Yv, [
            (y(!0), w(K, null, et(d.value, (T, B) => (y(), w("div", {
              key: B,
              class: "date-group"
            }, [
              r("div", Kv, [
                r("h4", qv, A(f(B)), 1),
                r("div", Uv, [
                  k(T) ? (y(), w("span", Xv, [
                    r("span", Gv, A(v(k(T))), 1),
                    L[9] || (L[9] = yt(" Enqueued ", -1))
                  ])) : z("", !0),
                  r("span", Zv, [
                    r("span", Qv, A(v(x(T))), 1),
                    L[10] || (L[10] = yt(" Assigned ", -1)),
                    r("span", Jv, A(g(C(T))), 1)
                  ]),
                  r("span", ty, [
                    r("span", ey, A(v($(T))), 1),
                    L[11] || (L[11] = yt(" Closed ", -1)),
                    r("span", ny, A(g(M(T))), 1)
                  ])
                ])
              ]),
              r("div", ay, [
                R(Xi, {
                  columns: p,
                  rows: b(String(B), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": I(({ row: E }) => [
                    r("span", oy, A(E.agent_name || "-"), 1)
                  ]),
                  "cell-email": I(({ row: E }) => [
                    r("span", sy, A(E.agent_email), 1)
                  ]),
                  "cell-assigned": I(({ row: E }) => [
                    r("div", iy, [
                      r("span", ly, A(v(Number(E.assigned_count))), 1),
                      r("span", ry, A(g(Number(E.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": I(({ row: E }) => [
                    r("div", cy, [
                      r("span", dy, A(v(Number(E.closed_count))), 1),
                      r("span", uy, A(g(Number(E.avg_conversation_duration_seconds))), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              _(T) ? (y(), w("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (E) => u(String(B))
              }, [
                yt(A(c.value[B] ? "View less" : `View more (${m(T)} rows)`) + " ", 1),
                (y(), w("svg", {
                  class: H(["view-more-icon", { "view-more-icon-rotated": c.value[B] }]),
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
              ], 8, hy)) : z("", !0)
            ]))), 128))
          ])) : (y(), w("div", fy, [...L[13] || (L[13] = [
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
        fn: I(() => [
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
}), py = /* @__PURE__ */ at(gy, [["__scopeId", "data-v-d6171363"]]), my = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, by = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, vy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, yy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, _y = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, xy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ky = { class: "max-w-[360px] px-4 text-center" }, wy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Cy = /* @__PURE__ */ Z({
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
    const a = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], s = e, i = n, l = (g) => {
      i("export", g);
    }, d = rt(s, "theme"), { isDark: c } = dt(d), u = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = nt({ labels: [], datasets: [] }), m = D(
      () => s.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), _ = D(() => {
      const g = m.value.total_by_channel || {}, f = Object.values(g).reduce((k, x) => k + x, 0);
      return f === 0 ? [] : Object.entries(g).sort(([, k], [, x]) => x - k).map(([k, x]) => ({
        name: k,
        label: k.toUpperCase(),
        total: x,
        percentage: (x / f * 100).toFixed(1),
        color: u[k.toLowerCase()] || "#9ca3af"
      }));
    }), p = D(() => _.value.slice(0, 4)), b = D(() => {
      const g = p.value.length;
      return g <= 1 ? "grid w-full grid-cols-1 gap-3 sm:gap-4" : g === 2 ? "grid w-full grid-cols-2 gap-3 sm:gap-4" : g === 3 ? "grid w-full grid-cols-3 gap-3 sm:gap-4" : "grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4";
    }), v = (g) => {
      if (!g || !g.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const f = g.channels_by_day, k = Object.keys(f).sort();
      if (k.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const M of Object.values(f))
        for (const S of Object.keys(M))
          x.add(S);
      const C = Array.from(x).map((M) => {
        const S = M.toLowerCase(), L = u[S] || "#9ca3af";
        return {
          label: M.toUpperCase(),
          data: k.map((T) => f[T]?.[M] || 0),
          borderColor: L
        };
      });
      h.value = {
        labels: k.map((M) => It(M).format("MMM DD")),
        datasets: C
      };
    };
    return Rt(
      () => s.data,
      (g) => {
        v(g ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: c }), (g, f) => (y(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Channel",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, Tt({
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", s.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          s.loading ? (y(), w("div", my, [
            r("div", by, [
              (y(), w(K, null, et(a, (k, x) => r("div", {
                key: x,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[x]]),
                style: gt({ height: `${k}%` })
              }, null, 6)), 64))
            ]),
            f[0] || (f[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (y(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (y(), w("section", vy, [
              r("div", yy, [
                R(ye, {
                  data: h.value,
                  theme: d.value
                }, null, 8, ["data", "theme"])
              ]),
              p.value.length ? (y(), w("div", {
                key: 0,
                class: H(b.value)
              }, [
                (y(!0), w(K, null, et(p.value, (k) => (y(), tt(st, {
                  key: k.name,
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${F(q)(k.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)) : z("", !0)
            ])) : _.value.length ? (y(), w("section", _y, [
              r("div", {
                class: H(b.value)
              }, [
                (y(!0), w(K, null, et(p.value, (k) => (y(), tt(st, {
                  key: k.name,
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${F(q)(k.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 2)
            ])) : z("", !0),
            _.value.length ? z("", !0) : (y(), w("section", xy, [
              r("div", ky, [
                r("div", wy, [
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
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), $y = /* @__PURE__ */ at(Cy, [["__scopeId", "data-v-567110f7"]]), My = {
  key: 0,
  class: "card-body"
}, Sy = { class: "chart-container" }, Dy = { class: "triage-table-block w-full min-w-0" }, Ay = { class: "triage-row-label" }, Ty = {
  key: 1,
  class: "triage-count"
}, By = {
  key: 1,
  class: "triage-count"
}, Ly = {
  key: 1,
  class: "triage-count"
}, Fy = {
  key: 1,
  class: "triage-count"
}, Ey = {
  key: 1,
  class: "triage-count"
}, Py = {
  key: 1,
  class: "empty-state"
}, Iy = { class: "empty-state-content" }, Ry = { class: "empty-icon-wrapper" }, Oy = {
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
    const a = e, o = n, s = (k) => {
      o("export", k);
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), d = D(() => {
      const k = a.data?.combinations || {}, x = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, C] of Object.entries(k)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const S = M.filter((L) => L !== "triage").length;
        S >= 4 ? x["4p"] += Number(C) || 0 : x[S] += Number(C) || 0;
      }
      return x;
    }), c = D(() => {
      const k = d.value;
      return k[0] + k[1] + k[2] + k[3] + k["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const k = c.value;
      if (!k) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const x = d.value;
      return {
        pct0: x[0] / k * 100,
        pct1: x[1] / k * 100,
        pct2: x[2] / k * 100,
        pct3: x[3] / k * 100,
        pct4p: x["4p"] / k * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], _ = D(() => {
      const k = h.value, x = d.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: k.pct0,
          b1: k.pct1,
          b2: k.pct2,
          b3: k.pct3,
          b4p: k.pct4p
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
    }, b = (k) => k?.replace("80", "") || "#888888", v = D(() => ({
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
            label: (k) => `${k.dataset.label} intent(s): ${Number(k.raw || 0).toFixed(0)}%`
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
    })), f = (k) => `${(Number(k) || 0).toFixed(0)}`;
    return t({ isDark: i }), (k, x) => (y(), tt(ht, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, Tt({
      default: I(() => [
        e.loading ? (y(), w("div", Oy, [...x[2] || (x[2] = [
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
        ])])) : (y(), w("div", My, [
          u.value ? (y(), w(K, { key: 0 }, [
            r("div", Sy, [
              R(be, {
                data: v.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            R(st, {
              class: "w-full min-w-0",
              title: "Total",
              value: F(q)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", Dy, [
              R(Jt, {
                columns: m,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": I(({ row: $ }) => [
                  r("span", Ay, A($.metric), 1)
                ]),
                "cell-b0": I(({ row: $ }) => [
                  $.id === "pct" ? (y(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c0) })
                  }, A(f(Number($.b0))) + "%", 5)) : (y(), w("span", Ty, A(F(q)(Number($.b0))), 1))
                ]),
                "cell-b1": I(({ row: $ }) => [
                  $.id === "pct" ? (y(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c1) })
                  }, A(f(Number($.b1))) + "%", 5)) : (y(), w("span", By, A(F(q)(Number($.b1))), 1))
                ]),
                "cell-b2": I(({ row: $ }) => [
                  $.id === "pct" ? (y(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c2) })
                  }, A(f(Number($.b2))) + "%", 5)) : (y(), w("span", Ly, A(F(q)(Number($.b2))), 1))
                ]),
                "cell-b3": I(({ row: $ }) => [
                  $.id === "pct" ? (y(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c3) })
                  }, A(f(Number($.b3))) + "%", 5)) : (y(), w("span", Fy, A(F(q)(Number($.b3))), 1))
                ]),
                "cell-b4p": I(({ row: $ }) => [
                  $.id === "pct" ? (y(), w("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: b(p.c4p) })
                  }, A(f(Number($.b4p))) + "%", 5)) : (y(), w("span", Ey, A(F(q)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (y(), w("div", Py, [
            r("div", Iy, [
              r("div", Ry, [
                R(F(qt), { class: "empty-icon" })
              ]),
              x[0] || (x[0] = r("p", { class: "empty-title" }, "No triage combinations data", -1)),
              x[1] || (x[1] = r("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
            ])
          ]))
        ]))
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), Vy = /* @__PURE__ */ at(zy, [["__scopeId", "data-v-c0931082"]]), Ny = {
  key: 0,
  class: "loading-state"
}, jy = {
  key: 1,
  class: "card-body"
}, Wy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-4 min-h-0"
}, Hy = { class: "pie-section" }, Yy = {
  key: 1,
  class: "empty-state"
}, Ky = /* @__PURE__ */ Z({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), s = [
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
    }, l = (_) => i[_]?.label || _.toUpperCase(), d = D(
      () => n.data?.items && n.data.items.length > 0
    ), c = D(
      () => (n.data?.items || []).reduce((_, p) => _ + p.count, 0)
    ), u = D(() => {
      const _ = {};
      for (const p of n.data?.items || [])
        _[p.language] = (_[p.language] || 0) + p.count;
      return Object.entries(_).map(([p, b]) => ({ language: p, count: b })).sort((p, b) => b.count - p.count);
    }), h = D(() => ({
      labels: u.value.map((_) => l(_.language)),
      datasets: [{
        data: u.value.map((_) => _.count),
        backgroundColor: u.value.map((_, p) => s[p % s.length] + "80"),
        borderColor: u.value.map((_, p) => s[p % s.length]),
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
            color: o.value.textSecondary
          }
        },
        tooltip: {
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (_) => {
              const p = _.raw || 0, b = c.value > 0 ? (p / c.value * 100).toFixed(1) : "0";
              return ` ${_.label}: ${p} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (_, p) => (y(), tt(ht, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: I(() => [
        n.loading ? (y(), w("div", Ny, [...p[0] || (p[0] = [
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
        ])])) : (y(), w("div", jy, [
          d.value ? (y(), w("div", Wy, [
            r("section", Hy, [
              R(la, {
                data: h.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            R(st, {
              class: "shrink-0",
              title: "Total",
              value: F(q)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (y(), w("section", Yy, [...p[1] || (p[1] = [
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
}), qy = /* @__PURE__ */ at(Ky, [["__scopeId", "data-v-020e89a6"]]), Uy = {
  key: 0,
  class: "loading-state"
}, Xy = {
  key: 1,
  class: "card-body"
}, Gy = {
  key: 0,
  class: "guardrails-daily-section"
}, Zy = { class: "w-full min-w-0" }, Qy = { class: "font-medium" }, Jy = { class: "font-semibold" }, t1 = { class: "type-badges-row" }, e1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, n1 = {
  key: 1,
  class: "empty-state"
}, a1 = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = dt(rt(a, "theme")), l = D(
      () => a.data?.items && a.data.items.length > 0
    ), d = D(
      () => (a.data?.items || []).reduce((v, g) => v + g.count, 0)
    ), c = (v) => {
      const g = {};
      for (const x of a.data?.items || [])
        g[x[v]] = (g[x[v]] || 0) + x.count;
      const f = Object.entries(g).sort((x, $) => $[1] - x[1]);
      if (f.length === 0) return { name: "—", pct: 0 };
      const k = d.value;
      return {
        name: f[0][0],
        pct: k > 0 ? Math.round(f[0][1] / k * 100) : 0
      };
    }, u = D(() => c("guardrail_type")), h = D(() => c("guardrail_action")), m = D(() => c("guardrail_source")), _ = D(() => {
      const v = {};
      for (const g of a.data?.items || [])
        v[g.date] || (v[g.date] = {}), v[g.date][g.guardrail_type] = (v[g.date][g.guardrail_type] || 0) + g.count;
      return Object.entries(v).map(([g, f]) => ({
        date: g,
        total: Object.values(f).reduce((k, x) => k + x, 0),
        types: Object.entries(f).map(([k, x]) => ({ type: k, count: x })).sort((k, x) => x.count - k.count)
      })).sort((g, f) => new Date(g.date).getTime() - new Date(f.date).getTime());
    }), p = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], b = D(
      () => _.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, g) => (y(), tt(ht, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1
    }, Tt({
      default: I(() => [
        a.loading ? (y(), w("div", Uy, [...g[0] || (g[0] = [
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
        ])])) : (y(), w("div", Xy, [
          l.value ? (y(), w(K, { key: 0 }, [
            _.value.length > 0 ? (y(), w("section", Gy, [
              r("div", Zy, [
                R(Jt, {
                  columns: p,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": I(({ row: f }) => [
                    r("span", Qy, A(F(It)(String(f.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": I(({ row: f }) => [
                    r("span", Jy, A(F(q)(f.total)), 1)
                  ]),
                  "cell-types": I(({ row: f }) => [
                    r("div", t1, [
                      (y(!0), w(K, null, et(f.types, (k) => (y(), w("span", {
                        key: k.type,
                        class: "type-count-badge"
                      }, A(k.type) + " (" + A(k.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            r("section", e1, [
              R(st, {
                title: "Total Events",
                value: F(q)(d.value)
              }, null, 8, ["value"]),
              R(st, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              R(st, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              R(st, {
                title: "Top source",
                value: m.value.name,
                subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (y(), w("section", n1, [...g[1] || (g[1] = [
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
        fn: I(() => [
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
}), o1 = /* @__PURE__ */ at(a1, [["__scopeId", "data-v-0416b73e"]]), s1 = {
  key: 0,
  class: "loading-state"
}, i1 = {
  key: 1,
  class: "card-body"
}, l1 = { class: "chart-section" }, r1 = { class: "chart-wrapper" }, c1 = {
  key: 1,
  class: "empty-chart"
}, d1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, u1 = {
  key: 0,
  class: "dn-failure-section"
}, h1 = { class: "w-full min-w-0" }, f1 = { class: "failure-reason" }, g1 = { class: "failure-count" }, p1 = { class: "impact-bar-container" }, m1 = { class: "impact-label" }, b1 = { class: "dn-trend-health-block flex flex-col gap-0" }, v1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, y1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, _1 = { class: "system-health" }, x1 = { class: "system-health-content" }, k1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, w1 = {
  key: 1,
  class: "empty-state"
}, C1 = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (C) => {
      o("export", C);
    }, { isDark: i, colors: l } = dt(rt(a, "theme")), d = D(() => {
      const C = a.data?.documentCounts?.items || [], M = a.data?.processingCounts?.items || [];
      return C.length > 0 || M.length > 0;
    }), c = D(() => {
      const C = a.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: C.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: C.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: C.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), u = D(() => {
      const C = a.data?.processingCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_success: C.reduce((M, S) => M + S.processing_success, 0),
        notification_sent: C.reduce((M, S) => M + S.notification_sent, 0),
        notification_failed: C.reduce((M, S) => M + S.notification_failed, 0),
        dq_phone: C.reduce((M, S) => M + S.dq_error_phone_not_found, 0),
        dq_flight: C.reduce((M, S) => M + S.dq_error_flight_not_found, 0),
        dq_booking: C.reduce((M, S) => M + S.dq_error_booking_not_found, 0),
        dq_other: C.reduce((M, S) => M + S.dq_error_other, 0),
        totalDqErrors: C.reduce((M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = D(() => c.value.row_count_total || u.value.processing_started), m = D(() => Math.max(0, h.value - u.value.notification_sent)), _ = (C, M) => M ? `${Math.round(C / M * 100)}%` : "0%", p = D(() => {
      const C = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return C.length > 0 ? C[0] : { reason: "None", count: 0 };
    }), b = D(() => {
      const C = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: C > 0 ? Math.round(M.count / C * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], g = D(
      () => b.value.map((C) => ({
        id: C.reason,
        reason: C.reason,
        count: C.count,
        impactPct: C.impactPct
      }))
    ), f = D(() => {
      const C = h.value, M = u.value.processing_success, S = Math.max(0, M - u.value.totalDqErrors), L = u.value.notification_sent, T = Math.max(0, C - M), B = u.value.totalDqErrors, E = Math.max(0, S - L), P = (W, Q) => {
        const J = Q > 0 ? Math.round(W / Q * 100) : 0;
        return `${W.toLocaleString()} (${J}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return M > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: M, label: P(M, C) }), T > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: P(T, C) }), S > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: S, label: P(S, C) }), B > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: B, label: P(B, C) }), L > 0 && Y.push({ source: "Contactable", target: "Notified", value: L, label: P(L, C) }), E > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: E, label: P(E, C) }), { nodes: N, links: Y };
    }), k = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, x = D(() => {
      const C = [...a.data?.processingCounts?.items || []].sort(
        (P, N) => new Date(P.date).getTime() - new Date(N.date).getTime()
      ), M = a.data?.documentCounts?.items || [], S = {};
      for (const P of M)
        S[P.date] = (S[P.date] || 0) + P.row_count_total;
      const L = [.../* @__PURE__ */ new Set([...C.map((P) => P.date), ...M.map((P) => P.date)])].sort(), T = L.map((P) => It(P).format("MMM DD")), B = L.map((P) => {
        const N = C.find((Q) => Q.date === P), Y = N?.notification_sent || 0, W = S[P] || N?.processing_started || 0;
        return W > 0 ? Math.round(Y / W * 100) : 0;
      }), E = L.map((P) => C.find((Y) => Y.date === P)?.notification_sent || 0);
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
    }), $ = D(() => ({
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
            label: (C) => C.datasetIndex === 0 ? ` Success Rate: ${C.raw}%` : ` Notifications: ${C.raw}`
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
            callback: (C) => `${C}%`
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
    return t({ isDark: i }), (C, M) => (y(), tt(ht, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, Tt({
      default: I(() => [
        a.loading ? (y(), w("div", s1, [...M[0] || (M[0] = [
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
        ])])) : (y(), w("div", i1, [
          d.value ? (y(), w(K, { key: 0 }, [
            r("section", l1, [
              M[2] || (M[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", r1, [
                f.value.nodes.length > 0 && f.value.links.length > 0 ? (y(), tt(Fe, {
                  key: 0,
                  data: f.value,
                  "node-colors": k,
                  height: "350px"
                }, null, 8, ["data"])) : (y(), w("div", c1, [...M[1] || (M[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", d1, [
              R(st, {
                color: "#3b82f6",
                title: "Total Records",
                value: F(q)(c.value.row_count_total)
              }, null, 8, ["value"]),
              R(st, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: F(q)(h.value)
              }, null, 8, ["value"]),
              R(st, {
                color: "#10b981",
                title: "Successfully Notified",
                value: F(q)(u.value.notification_sent),
                subvalue: _(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(st, {
                color: "#ef4444",
                title: "Not Notified",
                value: F(q)(m.value),
                subvalue: _(m.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              R(st, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: p.value.reason,
                subvalue: p.value.count > 0 ? `${F(q)(p.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (y(), w("section", u1, [
              M[3] || (M[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", h1, [
                R(Jt, {
                  columns: v,
                  rows: g.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": I(({ row: S }) => [
                    r("span", f1, A(S.reason), 1)
                  ]),
                  "cell-count": I(({ row: S }) => [
                    r("span", g1, A(F(q)(S.count)), 1)
                  ]),
                  "cell-impact": I(({ row: S }) => [
                    r("div", p1, [
                      r("div", {
                        class: "impact-bar",
                        style: gt({ width: S.impactPct + "%" })
                      }, null, 4),
                      r("span", m1, A(S.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : z("", !0),
            r("div", b1, [
              x.value.labels.length > 0 ? (y(), w("section", v1, [
                M[4] || (M[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", y1, [
                  R(ye, {
                    data: x.value,
                    options: $.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : z("", !0),
              r("details", _1, [
                M[5] || (M[5] = r("summary", { class: "system-health-toggle" }, [
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
                r("div", x1, [
                  r("div", k1, [
                    R(st, {
                      title: "Docs Started",
                      value: F(q)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    R(st, {
                      title: "Docs Completed",
                      value: F(q)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    R(st, {
                      title: "Docs Failed",
                      value: F(q)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    R(st, {
                      title: "Processing Started",
                      value: F(q)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    R(st, {
                      title: "Processing Success",
                      value: F(q)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    R(st, {
                      title: "Notification Failed",
                      value: F(q)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (y(), w("section", w1, [...M[6] || (M[6] = [
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
        fn: I(() => [
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
}), $1 = /* @__PURE__ */ at(C1, [["__scopeId", "data-v-d844ee2e"]]), M1 = { class: "highlight-inner" }, S1 = {
  key: 0,
  class: "loading-state"
}, D1 = {
  key: 1,
  class: "card-body"
}, A1 = { class: "metric-value" }, T1 = /* @__PURE__ */ Z({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), o = D(() => q(n.totalConversations)), s = D(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = D(() => {
      if (!s.value) return 0;
      const c = n.previousTotalConversations;
      return c === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (y(), tt(ht, {
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
        !e.loading && s.value ? (y(), w("div", {
          key: 0,
          class: H(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: I(() => [
        r("div", M1, [
          e.loading ? (y(), w("div", S1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (y(), w("div", D1, [
            r("span", A1, A(o.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), B1 = /* @__PURE__ */ at(T1, [["__scopeId", "data-v-9a055dd2"]]), L1 = { class: "highlight-inner" }, F1 = {
  key: 0,
  class: "loading-state"
}, E1 = {
  key: 1,
  class: "card-body"
}, P1 = { class: "metric-value" }, I1 = /* @__PURE__ */ Z({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), o = D(() => `${n.csatP95.toFixed(1)}`), s = D(
      () => n.previousCsatP95 !== null && n.previousCsatP95 !== void 0
    ), i = D(() => {
      if (!s.value) return 0;
      const c = n.previousCsatP95;
      return c === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (y(), tt(ht, {
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
        !e.loading && s.value ? (y(), w("div", {
          key: 0,
          class: H(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: I(() => [
        r("div", L1, [
          e.loading ? (y(), w("div", F1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (y(), w("div", E1, [
            r("span", P1, A(o.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), R1 = /* @__PURE__ */ at(I1, [["__scopeId", "data-v-8932abaa"]]), O1 = {
  key: 0,
  class: "loading-state"
}, z1 = {
  key: 1,
  class: "card-body"
}, V1 = { class: "chart-wrapper" }, N1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, j1 = {
  key: 2,
  class: "empty-state"
}, W1 = 500, H1 = 60, Y1 = 80, K1 = {
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
    const a = n, o = (c) => {
      a("export", c);
    }, s = e, { isDark: i } = dt(rt(s, "theme")), l = D(() => s.data), d = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (c, u) => (y(), tt(ht, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, Tt({
      default: I(() => [
        s.loading ? (y(), w("div", O1, [...u[0] || (u[0] = [
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
        ])])) : l.value && l.value.total_nps_responses > 0 ? (y(), w("div", z1, [
          r("div", V1, [
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
              "chart-margin": H1,
              "chart-bottom-margin": Y1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", N1, [
            R(st, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (y(), tt(st, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : z("", !0)
          ])
        ])) : (y(), w("div", j1, [...u[1] || (u[1] = [
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
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}, Gi = /* @__PURE__ */ at(K1, [["__scopeId", "data-v-b7d018e6"]]), q1 = {
  key: 0,
  class: "loading-state"
}, U1 = {
  key: 1,
  class: "card-body"
}, X1 = { class: "tooltip-content" }, G1 = { class: "tooltip-title" }, Z1 = { class: "tooltip-stats" }, Q1 = { class: "tooltip-stat-row" }, J1 = { class: "tooltip-value" }, t_ = { class: "tooltip-stat-row" }, e_ = { class: "tooltip-value" }, n_ = { class: "tooltip-stat-row" }, a_ = { class: "tooltip-value" }, o_ = { class: "tooltip-stat-row" }, s_ = { class: "tooltip-value" }, i_ = { class: "tooltip-stat-row" }, l_ = { class: "tooltip-value" }, r_ = { class: "tooltip-stat-row" }, c_ = { class: "tooltip-value" }, d_ = { class: "mt-4 flex w-full justify-start" }, u_ = {
  key: 2,
  class: "empty-state"
}, Bs = 400, rn = 60, Ls = 90, Fs = 120, h_ = {
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
    const a = n, o = (v) => {
      a("export", v);
    }, s = e, { isDark: i } = dt(rt(s, "theme")), l = D(() => s.data), d = nt(null), c = nt({
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
      const v = l.value.nps_by_day.length;
      return Math.max(800, rn * 2 + v * Fs);
    }), h = (v, g) => {
      const k = (v - 1) / 9;
      return rn + g - k * g;
    }, m = (v) => v ? It(v).format("DD-MM-YYYY") : "", _ = D(() => {
      if (!l.value || !l.value.nps_by_day || l.value.nps_by_day.length === 0)
        return [];
      const v = [], g = Bs - rn - Ls;
      return l.value.nps_by_day.forEach((f, k) => {
        const x = f.min_score || 0, $ = f.q1_score || 0, C = f.median_score || 0, M = f.q3_score || 0, S = f.max_score || 0, L = f.average_score || 0;
        v.push({
          label: m(f.date),
          responseCount: f.nps_responses_count || 0,
          isTotal: !1,
          low: x,
          q1: $,
          median: C,
          q3: M,
          high: S,
          average: L,
          highY: h(S, g),
          lowY: h(x, g),
          q1Y: h($, g),
          q3Y: h(M, g),
          medianY: h(C, g),
          averageY: L > 0 ? h(L, g) : null,
          centerX: rn + (k + 1) * Fs
        });
      }), v;
    }), p = (v, g) => {
      if (!d.value || !g || g.horizontal) return;
      const f = d.value.getBoundingClientRect(), k = v.clientX, x = v.clientY, $ = 140, C = 160, M = 10, S = 15;
      let L = k - f.left - $ / 2, T = x - f.top - C - S;
      L = Math.max(M, Math.min(L, f.width - $ - M)), T < M && (T = x - f.top + S), T = Math.max(M, Math.min(T, f.height - C - M)), c.value = {
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
    return t({ isDark: i }), (v, g) => (y(), tt(ht, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT Daily Metrics",
      subtitle: "Daily CSAT Distribution",
      collapsible: !1
    }, Tt({
      default: I(() => [
        s.loading ? (y(), w("div", q1, [...g[0] || (g[0] = [
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
        ])])) : l.value && l.value.nps_by_day && l.value.nps_by_day.length > 0 ? (y(), w("div", U1, [
          r("div", {
            class: "chart-wrapper",
            ref_key: "chartContainerRef",
            ref: d
          }, [
            _.value && _.value.length > 0 ? (y(), tt(Oi, {
              key: 0,
              "candlestick-data": _.value,
              "chart-width": u.value,
              "chart-height": Bs,
              "chart-margin": rn,
              "chart-bottom-margin": Ls,
              "show-legend": !0,
              rotation: 0,
              "candle-width": 30,
              onCandleHover: p,
              onCandleLeave: b
            }, null, 8, ["candlestick-data", "chart-width"])) : z("", !0),
            c.value.visible ? (y(), w("div", {
              key: 1,
              class: "tooltip-overlay",
              style: gt({
                left: `${c.value.x}px`,
                top: `${c.value.y}px`
              })
            }, [
              r("div", X1, [
                r("div", G1, A(c.value.date), 1),
                g[7] || (g[7] = r("div", { class: "tooltip-divider" }, null, -1)),
                r("div", Z1, [
                  r("div", Q1, [
                    g[1] || (g[1] = r("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                    r("span", J1, A(c.value.min), 1)
                  ]),
                  r("div", t_, [
                    g[2] || (g[2] = r("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                    r("span", e_, A(c.value.q1), 1)
                  ]),
                  r("div", n_, [
                    g[3] || (g[3] = r("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                    r("span", a_, A(c.value.median), 1)
                  ]),
                  r("div", o_, [
                    g[4] || (g[4] = r("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                    r("span", s_, A(c.value.avg), 1)
                  ]),
                  r("div", i_, [
                    g[5] || (g[5] = r("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                    r("span", l_, A(c.value.q3), 1)
                  ]),
                  r("div", r_, [
                    g[6] || (g[6] = r("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                    r("span", c_, A(c.value.max), 1)
                  ])
                ])
              ])
            ], 4)) : z("", !0)
          ], 512),
          r("div", d_, [
            R(st, {
              title: "Days",
              value: String(l.value.nps_by_day.length),
              class: "min-w-0 w-full max-w-xs"
            }, null, 8, ["value"])
          ])
        ])) : (y(), w("div", u_, [...g[8] || (g[8] = [
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
      e.enableExport && !s.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}, Zi = /* @__PURE__ */ at(h_, [["__scopeId", "data-v-59bff16f"]]), f_ = { class: "nps-metrics-container" }, g_ = {
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
    const n = t, a = (o) => {
      n("export", o);
    };
    return (o, s) => (y(), w("div", f_, [
      R(Gi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      R(Zi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Qi = /* @__PURE__ */ at(g_, [["__scopeId", "data-v-25fe3b80"]]), p_ = { class: "csat-container__body" }, m_ = /* @__PURE__ */ Z({
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
    function a(o) {
      n("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (y(), tt(ht, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: I(() => [
        r("div", p_, [
          R(Qi, {
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
}), b_ = /* @__PURE__ */ at(m_, [["__scopeId", "data-v-29e9904b"]]), v_ = { class: "highlight-inner" }, y_ = {
  key: 0,
  class: "loading-state"
}, __ = {
  key: 1,
  class: "card-body"
}, x_ = { class: "metric-row" }, k_ = { class: "metric-currency" }, w_ = { class: "metric-value" }, C_ = /* @__PURE__ */ Z({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = dt(rt(n, "theme")), o = D(() => Ce(n.totalRevenue)), s = D(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = D(() => {
      if (!s.value) return 0;
      const c = n.previousTotalRevenue;
      return c === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - c) / c * 100;
    }), l = D(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), d = D(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, u) => (y(), tt(ht, {
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
        !e.loading && s.value ? (y(), w("div", {
          key: 0,
          class: H(["change-badge", d.value])
        }, A(l.value), 3)) : z("", !0)
      ]),
      default: I(() => [
        r("div", v_, [
          e.loading ? (y(), w("div", y_, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (y(), w("div", __, [
            r("div", x_, [
              r("span", k_, A(n.currencyCode), 1),
              r("span", w_, A(o.value), 1)
            ]),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "AI Revenue", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), $_ = /* @__PURE__ */ at(C_, [["__scopeId", "data-v-f4ee91ea"]]), M_ = { class: "flex justify-end" }, S_ = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, D_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, A_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, T_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, B_ = { class: "flex flex-wrap gap-4" }, L_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, F_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, E_ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, P_ = { class: "truncate" }, I_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, R_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, O_ = /* @__PURE__ */ Z({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = [30, 50, 70, 50, 40], i = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], l = rt(a, "theme"), { isDark: d } = dt(l), c = nt(a.breakdownBy), u = D(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), h = nt({ labels: [], datasets: [] }), m = nt([]), _ = nt([]), p = ["#3b82f6", "#f59e0b", "#06b6d4", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"], b = (k) => p[k % p.length], v = () => {
      o("changeBreakdown", c.value);
    }, g = (k) => {
      if (!k) return "";
      const $ = k.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return $ ? $.charAt(0).toUpperCase() + $.slice(1) : "";
    }, f = (k) => {
      if (c.value === "all") {
        const T = k?.escalations_by_day ?? [];
        if (!T.length) {
          h.value = { labels: [], datasets: [] }, m.value = [], _.value = [];
          return;
        }
        const B = [...T].sort((E, P) => E.date.localeCompare(P.date));
        h.value = {
          labels: B.map((E) => It(E.date).format("MMM DD")),
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
        }, m.value = [], _.value = [];
        return;
      }
      const x = k?.breakdown_by_day ?? [], $ = k?.breakdown_items ?? [];
      if (!x.length) {
        h.value = { labels: [], datasets: [] }, m.value = [], _.value = [];
        return;
      }
      const C = [...x].sort((T, B) => T.date.localeCompare(B.date)), M = $.slice(0, 5).map((T) => T.key), S = C.map((T) => It(T.date).format("MMM DD")), L = M.map((T, B) => {
        const E = $.find((P) => P.key === T);
        return {
          label: g(E?.label || T),
          data: C.map((P) => {
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
        labels: S,
        datasets: L
      }, m.value = $.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        percentage: Number(T.percentage || 0),
        color: b(B)
      })), _.value = $.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: g(T.label),
        color: b(B)
      }));
    };
    return Rt(
      () => a.data,
      (k) => {
        f(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Rt(
      () => a.breakdownBy,
      (k) => {
        c.value = k, f(u.value);
      }
    ), t({ isDark: d }), (k, x) => (y(), tt(ht, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1
    }, {
      headerAside: I(() => [
        r("div", M_, [
          Qt(r("select", {
            "onUpdate:modelValue": x[0] || (x[0] = ($) => c.value = $),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: v
          }, [...x[1] || (x[1] = [
            r("option", { value: "all" }, "All", -1),
            r("option", { value: "agent" }, "By Agent", -1),
            r("option", { value: "channel" }, "By Channel", -1),
            r("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [sl, c.value]
          ])
        ])
      ]),
      default: I(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (y(), w("div", S_, [
            r("div", D_, [
              (y(), w(K, null, et(s, ($, C) => r("div", {
                key: C,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70", i[C]]),
                style: gt({ height: `${$}%` })
              }, null, 6)), 64))
            ]),
            x[2] || (x[2] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading human escalations... ", -1))
          ])) : (y(), w(K, { key: 1 }, [
            h.value.labels && h.value.labels.length && h.value.datasets.length ? (y(), w("section", A_, [
              r("div", T_, [
                R(ye, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", B_, [
                (y(!0), w(K, null, et(_.value, ($) => (y(), w("div", {
                  key: `legend-${$.key}`,
                  class: "inline-flex items-center gap-2 text-sm"
                }, [
                  r("span", {
                    class: "inline-block h-2.5 w-2.5 rounded-full",
                    style: gt({ backgroundColor: $.color })
                  }, null, 4),
                  r("span", L_, A($.label), 1)
                ]))), 128))
              ]),
              r("div", F_, [
                (y(!0), w(K, null, et(m.value, ($) => (y(), w("div", {
                  key: `card-${$.key}`,
                  class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                }, [
                  r("p", E_, [
                    r("span", {
                      class: "inline-block h-2.5 w-2.5 rounded-full",
                      style: gt({ backgroundColor: $.color })
                    }, null, 4),
                    r("span", P_, A($.label), 1)
                  ]),
                  r("p", I_, A($.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (y(), w("section", R_, [...x[3] || (x[3] = [
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
}), z_ = /* @__PURE__ */ at(O_, [["__scopeId", "data-v-809d3c8c"]]), V_ = { class: "highlight-inner" }, N_ = {
  key: 0,
  class: "loading-state"
}, j_ = {
  key: 1,
  class: "card-body"
}, W_ = { class: "metric-value" }, H_ = /* @__PURE__ */ Z({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e) {
    const t = e, { isDark: n } = dt(rt(t, "theme")), a = D(() => `${Number(t.escalationRatePercentage || 0).toFixed(2)}%`), o = D(
      () => t.previousEscalationRatePercentage !== null && t.previousEscalationRatePercentage !== void 0
    ), s = D(() => {
      if (!o.value) return 0;
      const d = t.previousEscalationRatePercentage;
      return d === 0 ? t.escalationRatePercentage > 0 ? 100 : 0 : (t.escalationRatePercentage - d) / d * 100;
    }), i = D(() => {
      const d = s.value.toFixed(1);
      return s.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), l = D(() => s.value > 0 ? "change-badge--up" : s.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return (d, c) => (y(), tt(ht, {
      collapsible: !1,
      class: H(["human-escalations-metric", "w-full", { "human-escalations-metric--dark": F(n) }])
    }, {
      title: I(() => [...c[0] || (c[0] = [
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
        !e.loading && o.value ? (y(), w("div", {
          key: 0,
          class: H(["change-badge", l.value])
        }, A(i.value), 3)) : z("", !0)
      ]),
      default: I(() => [
        r("div", V_, [
          e.loading ? (y(), w("div", N_, [...c[1] || (c[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (y(), w("div", j_, [
            r("span", W_, A(a.value), 1),
            c[2] || (c[2] = r("span", { class: "metric-label" }, "Human Escalations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Y_ = /* @__PURE__ */ at(H_, [["__scopeId", "data-v-4a985726"]]), K_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, q_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, U_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, X_ = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, G_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Z_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Q_ = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, J_ = { class: "max-w-[360px] text-center" }, tx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, ex = {
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
    const t = e, { isDark: n, colors: a } = dt(rt(t, "theme")), o = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = D(() => {
      const c = t.data ?? {}, u = c.daily, h = c.days, m = Array.isArray(u) && u.length > 0, _ = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let p = [];
      return m ? p = u : _ && (p = h.map((b, v) => ({
        date: b,
        allocated_cost: c.allocatedCostSeries[v] ?? 0,
        aws_cost: c.awsCostSeries[v] ?? 0,
        airline_conversations: c.airlineConversationsSeries[v] ?? 0
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
    return (c, u) => (y(), tt(ht, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", K_, [
          e.loading ? (y(), w("div", q_, [
            r("div", U_, [
              (y(), w(K, null, et(o, (h, m) => r("div", {
                key: m,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[m]]),
                style: gt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            u[0] || (u[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (y(), w("div", X_, [
            r("div", G_, [
              R(ye, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: d.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", Z_, [
              R(st, {
                color: F(a).primaryLight,
                title: "Total Allocated",
                value: F(xt)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              R(st, {
                color: "#FF9900",
                title: "Total AWS",
                value: F(xt)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (y(), w("section", Q_, [
            r("div", J_, [
              r("div", tx, [
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
}, nx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ax = {
  key: 0,
  class: "card-body"
}, ox = {
  key: 0,
  class: "chart-section"
}, sx = { class: "chart-container" }, ix = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, lx = {
  key: 1,
  class: "empty-state"
}, rx = { class: "empty-state-content" }, cx = { class: "empty-icon-wrapper" }, dx = {
  key: 1,
  class: "loading-state"
}, cn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Es = 10, ux = /* @__PURE__ */ Z({
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
    const a = e, { isDark: o, colors: s } = dt(rt(a, "theme")), i = (p) => {
      const b = new Date(p), v = String(b.getDate()).padStart(2, "0"), g = String(b.getMonth() + 1).padStart(2, "0");
      return `${v}-${g}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, v) => b + (v.input_cost || 0), 0);
    }), c = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, v) => b + (v.output_cost || 0), 0);
    }), u = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, v) => b + (v.cache_read_cost || 0), 0);
    }), h = D(() => {
      const p = a.data?.costs_by_day || {};
      return Object.values(p).reduce((b, v) => b + (v.cache_write_cost || 0), 0);
    }), m = D(() => {
      const p = a.data?.costs_by_day || {}, b = Object.keys(p).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const v = b.map((f) => i(f)), g = [
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
              family: cn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: Es,
            boxHeight: Es,
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
            family: cn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: cn,
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
            font: { family: cn, size: 12, weight: "500" },
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
            font: { family: cn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(p) {
              return xt(p);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (p, b) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", nx, [
          e.loading ? (y(), w("div", dx, [...b[2] || (b[2] = [
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
          ])])) : (y(), w("div", ax, [
            m.value.labels && m.value.labels.length ? (y(), w("section", ox, [
              r("div", sx, [
                R(be, {
                  data: m.value,
                  options: _.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", ix, [
                R(st, {
                  title: "Total Cost",
                  value: F(xt)(e.data.total_cost)
                }, null, 8, ["value"]),
                R(st, {
                  title: "Input Cost",
                  value: F(xt)(d.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(st, {
                  title: "Output Cost",
                  value: F(xt)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(st, {
                  title: "Cache Read",
                  value: F(xt)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(st, {
                  title: "Cache Write",
                  value: F(xt)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                R(st, {
                  title: "Avg / Conv.",
                  value: F(xt)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (y(), w("section", lx, [
              r("div", rx, [
                r("div", cx, [
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
}), hx = /* @__PURE__ */ at(ux, [["__scopeId", "data-v-39a5448c"]]), fx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gx = {
  key: 0,
  class: "card-body"
}, px = {
  key: 0,
  class: "chart-section"
}, mx = { class: "chart-container" }, bx = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, vx = {
  key: 1,
  class: "empty-state"
}, yx = { class: "empty-state-content" }, _x = { class: "empty-icon-wrapper" }, xx = {
  key: 1,
  class: "loading-state"
}, dn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ps = 10, kx = /* @__PURE__ */ Z({
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
    const a = e, { isDark: o, colors: s } = dt(rt(a, "theme")), i = (u) => {
      const h = new Date(u), m = String(h.getDate()).padStart(2, "0"), _ = String(h.getMonth() + 1).padStart(2, "0");
      return `${m}-${_}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, d = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((p) => i(p)), _ = [
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
        datasets: _
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
              family: dn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: Ps,
            boxHeight: Ps,
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
            family: dn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: dn,
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
            font: { family: dn, size: 12, weight: "500" },
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
            font: { family: dn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (u, h) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", fx, [
          e.loading ? (y(), w("div", xx, [...h[2] || (h[2] = [
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
          ])])) : (y(), w("div", gx, [
            d.value.labels && d.value.labels.length ? (y(), w("section", px, [
              r("div", mx, [
                R(be, {
                  data: d.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", bx, [
                R(st, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: F(q)(e.data.total_tokens)
                }, null, 8, ["value"]),
                R(st, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: F(q)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(st, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: F(q)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(st, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: F(q)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(st, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: F(q)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (y(), w("section", vx, [
              r("div", yx, [
                r("div", _x, [
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
}), wx = /* @__PURE__ */ at(kx, [["__scopeId", "data-v-70c6f3c7"]]), Cx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $x = {
  key: 0,
  class: "card-body"
}, Mx = {
  key: 0,
  class: "chart-section"
}, Sx = { class: "chart-container" }, Dx = { class: "mt-4 w-full min-w-0" }, Ax = {
  key: 1,
  class: "empty-state"
}, Tx = { class: "empty-state-content" }, Bx = { class: "empty-icon-wrapper" }, Lx = {
  key: 1,
  class: "loading-state"
}, Fx = /* @__PURE__ */ Z({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), s = (c) => {
      const u = new Date(c), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(
      () => q(n.data?.total_conversations ?? 0)
    ), l = D(() => {
      const c = n.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const h = u.map((_) => s(_)), m = [
        {
          label: "Conversations",
          data: u.map((_) => c[_] || 0),
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
    return t({ isDark: a }), (c, u) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Cx, [
          e.loading ? (y(), w("div", Lx, [...u[2] || (u[2] = [
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
          ])])) : (y(), w("div", $x, [
            l.value.labels && l.value.labels.length ? (y(), w("section", Mx, [
              r("div", Sx, [
                R(ye, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", Dx, [
                R(st, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (y(), w("section", Ax, [
              r("div", Tx, [
                r("div", Bx, [
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
}), Ex = /* @__PURE__ */ at(Fx, [["__scopeId", "data-v-b33e8627"]]), Px = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ix = {
  key: 0,
  class: "card-body"
}, Rx = {
  key: 0,
  class: "charts-grid"
}, Ox = { class: "chart-section" }, zx = { class: "chart-container" }, Vx = { class: "chart-section" }, Nx = { class: "chart-container" }, jx = {
  key: 1,
  class: "empty-state"
}, Wx = { class: "empty-state-content" }, Hx = { class: "empty-icon-wrapper" }, Yx = {
  key: 1,
  class: "loading-state"
}, Kx = /* @__PURE__ */ Z({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), s = D(() => n.data?.top_agents && n.data.top_agents.length > 0), i = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, _) => (_.total_cost || 0) - (m.total_cost || 0)) : []), l = D(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, _) => (_.total_tokens || 0) - (m.total_tokens || 0)) : []), d = D(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((_) => _.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = D(() => {
      const m = l.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((_) => _.total_tokens || 0),
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
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
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
              const _ = m.label, p = n.data?.top_agents?.find((b) => b.agent_type === _);
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
          backgroundColor: o.value.tooltipBg,
          titleColor: o.value.tooltipText,
          bodyColor: o.value.tooltipText,
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
              const _ = m.label, p = n.data?.top_agents?.find((b) => b.agent_type === _);
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
            callback: function(m) {
              return m.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (m, _) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Px, [
          e.loading ? (y(), w("div", Yx, [..._[4] || (_[4] = [
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
          ])])) : (y(), w("div", Ix, [
            s.value ? (y(), w("div", Rx, [
              r("section", Ox, [
                _[0] || (_[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", zx, [
                  R(be, {
                    data: d.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", Vx, [
                _[1] || (_[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", Nx, [
                  R(be, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (y(), w("section", jx, [
              r("div", Wx, [
                r("div", Hx, [
                  R(F(qt), { class: "empty-icon" })
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
}), qx = /* @__PURE__ */ at(Kx, [["__scopeId", "data-v-a5014772"]]), Ux = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Xx = {
  key: 0,
  class: "card-body"
}, Gx = {
  key: 0,
  class: "chart-section"
}, Zx = { class: "chart-container" }, Qx = {
  key: 1,
  class: "empty-state"
}, Jx = { class: "empty-state-content" }, tk = { class: "empty-icon-wrapper" }, ek = {
  key: 1,
  class: "loading-state"
}, nk = /* @__PURE__ */ Z({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), s = {
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
        const v = b.agent_type?.toLowerCase();
        return (s[v] || "#a78bfa") + "80";
      }), _ = h.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return s[v] || "#a78bfa";
      });
      return {
        labels: h.map((b) => {
          const v = b.conversations || 0, g = d.value ? v / d.value * 100 : 0;
          return `${b.agent_type} - ${v.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((b) => b.conversations || 0),
            backgroundColor: m,
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
              const m = (h.label || "").toString(), _ = Number(h.parsed) || 0, p = (h.dataset.data || []).reduce((v, g) => v + (Number(g) || 0), 0), b = p ? _ / p * 100 : 0;
              return `${m}: ${_.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, m) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", Ux, [
          e.loading ? (y(), w("div", ek, [...m[2] || (m[2] = [
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
          ])])) : (y(), w("div", Xx, [
            l.value ? (y(), w("section", Gx, [
              r("div", Zx, [
                R(la, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (y(), w("section", Qx, [
              r("div", Jx, [
                r("div", tk, [
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
}), ak = /* @__PURE__ */ at(nk, [["__scopeId", "data-v-14445b91"]]), ok = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, sk = {
  key: 0,
  class: "card-body"
}, ik = {
  key: 0,
  class: "chart-section"
}, lk = { class: "chart-container" }, rk = {
  key: 1,
  class: "empty-state"
}, ck = { class: "empty-state-content" }, dk = { class: "empty-icon-wrapper" }, uk = {
  key: 1,
  class: "loading-state"
}, hk = /* @__PURE__ */ Z({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = dt(rt(n, "theme")), s = (c) => {
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
        const v = [...c].sort((g, f) => g.date.localeCompare(f.date));
        return {
          labels: v.map((g) => s(g.date)),
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
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, _ = Object.keys(u).filter((v) => h[v]).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const p = _.map((v) => s(v)), b = _.map((v) => {
        const g = u[v]?.total_cost || 0, f = h[v] || 0;
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
              return xt(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, u) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: I(() => [
        r("div", ok, [
          e.loading ? (y(), w("div", uk, [...u[2] || (u[2] = [
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
          ])])) : (y(), w("div", sk, [
            i.value ? (y(), w("section", ik, [
              r("div", lk, [
                R(ye, {
                  data: l.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (y(), w("section", rk, [
              r("div", ck, [
                r("div", dk, [
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
}), fk = /* @__PURE__ */ at(hk, [["__scopeId", "data-v-1e8204ea"]]);
function Kt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const gk = { class: "tabs text-sm" }, pk = ["aria-label"], mk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], bk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, vk = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = nt([]), s = `tabs-${Kt()}`, i = (p) => `${s}-tab-${p}`, l = D(
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
        o.value[n.items.indexOf(p)]?.focus();
      }));
    }
    function m(p, b) {
      const v = n.items.length;
      if (v === 0) return 0;
      let g = p;
      for (let f = 0; f < v; f++)
        if (g = (g + b + v) % v, !n.items[g]?.disabled) return g;
      return p;
    }
    async function _(p, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(p.key)) return;
      p.preventDefault();
      let g = b;
      p.key === "ArrowLeft" ? g = m(b, -1) : p.key === "ArrowRight" ? g = m(b, 1) : p.key === "Home" ? g = l.value[0] ?? 0 : p.key === "End" && (g = l.value[l.value.length - 1] ?? b);
      const f = n.items[g];
      !f || f.disabled || (u(f.value, n.modelValue), await Ot(), o.value[g]?.focus());
    }
    return (p, b) => (y(), w("div", gk, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: H([
          "box-border min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), w(K, null, et(e.items, (v, g) => (y(), w("button", {
          id: i(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": d(v),
          "aria-disabled": v.disabled === !0,
          tabindex: d(v) ? 0 : -1,
          class: H(c(v)),
          onClick: (f) => h(v, f),
          onKeydown: (f) => _(f, g)
        }, [
          r("span", {
            class: H(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (y(), tt(Ge(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            r("span", bk, A(v.label), 1)
          ], 2)
        ], 42, mk))), 128))
      ], 10, pk),
      p.$slots.default ? (y(), tt(pn, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: I(() => [
          (y(), w("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            $t(p.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), Ji = /* @__PURE__ */ at(vk, [["__scopeId", "data-v-552ce048"]]), yk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, _k = {
  key: 0,
  class: "loading-state"
}, xk = {
  key: 1,
  class: "card-body"
}, kk = {
  key: 0,
  class: "model-usage-table-block"
}, wk = { class: "w-full min-w-0" }, Ck = {
  key: 1,
  class: "empty-state"
}, $k = { class: "empty-state-content" }, Mk = { class: "empty-icon-wrapper" }, Sk = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (p) => {
      o("export", p);
    }, { isDark: i } = dt(rt(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], d = nt("by_model"), c = D(() => d.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), u = D(() => [
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
        avgCost: _(b.avg_cost_per_message),
        avgTokens: m(b.avg_tokens_per_message),
        messageCount: m(b.message_count),
        totalCost: _(b.total_cost),
        totalTokens: m(b.total_tokens)
      }))
    ), m = (p) => p == null ? "0" : q(p), _ = (p) => p == null ? "$0.00" : xt(p);
    return t({ isDark: i }), (p, b) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, Tt({
      default: I(() => [
        r("div", yk, [
          e.loading ? (y(), w("div", _k, [...b[1] || (b[1] = [
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
          ])])) : (y(), w("div", xk, [
            R(Ji, {
              modelValue: d.value,
              "onUpdate:modelValue": b[0] || (b[0] = (v) => d.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: I(() => [
                c.value && Object.keys(c.value).length > 0 ? (y(), w("div", kk, [
                  r("div", wk, [
                    R(Jt, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (y(), w("div", Ck, [
                  r("div", $k, [
                    r("div", Mk, [
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
        fn: I(() => [
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
}), Dk = /* @__PURE__ */ at(Sk, [["__scopeId", "data-v-3e03d526"]]), Ak = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tk = {
  key: 0,
  class: "loading-state"
}, Bk = {
  key: 1,
  class: "card-body"
}, Lk = {
  key: 0,
  class: "message-roles-table-block"
}, Fk = { class: "w-full min-w-0" }, Ek = {
  key: 1,
  class: "empty-state"
}, Pk = { class: "empty-state-content" }, Ik = { class: "empty-icon-wrapper" }, Rk = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (b) => {
      o("export", b);
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
        avgCost: _(c.value[b]?.avg_cost_per_message),
        avgTokens: m(c.value[b]?.avg_tokens_per_message),
        messageCount: m(c.value[b]?.message_count),
        totalCost: _(c.value[b]?.total_cost),
        totalTokens: m(c.value[b]?.total_tokens)
      }))
    ), h = D(() => Object.keys(c.value).length > 0), m = (b) => b == null ? "0" : q(b), _ = (b) => b == null ? "$0.00" : xt(b), p = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, v) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, Tt({
      default: I(() => [
        r("div", Ak, [
          e.loading ? (y(), w("div", Tk, [...v[0] || (v[0] = [
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
          ])])) : (y(), w("div", Bk, [
            h.value ? (y(), w("div", Lk, [
              r("div", Fk, [
                R(Jt, {
                  columns: d,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (y(), w("div", Ek, [
              r("div", Pk, [
                r("div", Ik, [
                  R(F(qt), { class: "empty-icon" })
                ]),
                v[1] || (v[1] = r("p", { class: "empty-title" }, "No message role data available", -1)),
                v[2] || (v[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), Ok = /* @__PURE__ */ at(Rk, [["__scopeId", "data-v-57850103"]]), zk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vk = {
  key: 0,
  class: "card-body"
}, Nk = {
  key: 0,
  class: "chart-section"
}, jk = { class: "chart-container" }, Wk = { class: "kpi-grid" }, Hk = {
  key: 1,
  class: "empty-state"
}, Yk = { class: "empty-state-content" }, Kk = { class: "empty-icon-wrapper" }, qk = {
  key: 1,
  class: "loading-state"
}, Uk = /* @__PURE__ */ Z({
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
    const a = e, o = n, s = (f) => {
      o("export", f);
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
    }, c = (f) => f.agent_type || f.agent_id || f.agent_name || "", u = (f) => f.agent_name ? f.agent_name : c(f).split("_").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (f) => {
      const k = c(f).toLowerCase();
      for (const [x, $] of Object.entries(d))
        if (k.includes(x))
          return $;
      return "#9ca3af";
    }, m = D(() => [...a.data?.top_agents || []].sort((k, x) => x.avg_cost_per_conversation - k.avg_cost_per_conversation)), _ = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : m.value.reduce((f, k) => f + k.conversations, 0)), p = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : m.value.reduce((f, k) => f + k.total_cost, 0)), b = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : _.value === 0 ? 0 : p.value / _.value), v = D(() => {
      const f = m.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const k = f.map((C) => u(C)), x = f.map((C) => C.avg_cost_per_conversation), $ = f.map((C) => h(C));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: x,
            backgroundColor: $.map((C) => `${C}80`),
            borderColor: $,
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
              const k = m.value[f.dataIndex];
              return [
                `Cost: ${xt(f.parsed.x)}`,
                `Conversations: ${q(k.conversations)}`,
                `Total Cost: ${xt(k.total_cost)}`
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
    return t({ isDark: i }), (f, k) => (y(), tt(ht, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, Tt({
      default: I(() => [
        r("div", zk, [
          e.loading ? (y(), w("div", qk, [...k[2] || (k[2] = [
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
          ])])) : (y(), w("div", Vk, [
            v.value.labels && v.value.labels.length ? (y(), w("section", Nk, [
              r("div", jk, [
                R(be, {
                  data: v.value,
                  options: g.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Wk, [
                R(F(st), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                R(F(st), {
                  title: "Total Conversations",
                  value: F(q)(_.value)
                }, null, 8, ["value"]),
                R(F(st), {
                  title: "Total Cost",
                  value: F(xt)(p.value)
                }, null, 8, ["value"]),
                R(F(st), {
                  title: "Avg Cost / Conv.",
                  value: F(xt)(b.value)
                }, null, 8, ["value"])
              ])
            ])) : (y(), w("section", Hk, [
              r("div", Yk, [
                r("div", Kk, [
                  R(F(qt), { class: "empty-icon" })
                ]),
                k[0] || (k[0] = r("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                k[1] || (k[1] = r("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 2
    }, [
      e.enableExport && !e.loading ? {
        name: "headerExport",
        fn: I(() => [
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
}), Xk = /* @__PURE__ */ at(Uk, [["__scopeId", "data-v-cd2a584a"]]);
function Gk(e, t) {
  return y(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Zk(e, t) {
  return y(), w("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Qk = ["aria-label"], Jk = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, t2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, e2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, n2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], a2 = { class: "truncate" }, o2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, s2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, i2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, l2 = ["aria-label", "onClick"], r2 = ["aria-label", "onClick"], c2 = ["aria-label"], d2 = ["aria-label"], u2 = {
  key: 1,
  class: "space-y-2"
}, h2 = ["for"], f2 = ["id", "placeholder", "onKeydown"], g2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, p2 = ["aria-label"], m2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, b2 = ["checked", "onChange"], v2 = { class: "min-w-0 flex-1" }, y2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, _2 = { class: "flex flex-wrap items-end gap-2" }, x2 = { class: "min-w-[120px] flex-1" }, k2 = ["for"], w2 = ["id"], C2 = { class: "min-w-[120px] flex-1" }, $2 = ["for"], M2 = ["id"], S2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = Pa(), i = `${`kiut-filters-${Kt()}`}-panel`, l = nt(null), d = /* @__PURE__ */ new Map(), c = nt(null), u = nt(!1), h = nt({}), m = nt(null), _ = nt(""), p = nt([]), b = nt(""), v = nt(""), g = D(() => c.value ? n.filterDefinitions.find((O) => O.id === c.value) ?? null : null), f = D(() => {
      const O = g.value;
      if (O)
        return O.type === "text" ? _.value : O.type === "select" ? p.value : { start: b.value, end: v.value };
    });
    function k(O, j) {
      j && j instanceof HTMLElement ? d.set(O, j) : d.delete(O);
    }
    function x(O) {
      return n.modelValue[O];
    }
    function $(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((j) => typeof j == "string" && j.trim() !== "");
      if (typeof O == "string") {
        const j = O.trim();
        return j ? [j] : [];
      }
      return [];
    }
    function C(O, j) {
      if (j == null) return !0;
      if (O.type === "text") return String(j).trim() === "";
      if (O.type === "select") return $(j).length === 0;
      if (O.type === "dateRange") {
        const U = j;
        return !U?.start?.trim() || !U?.end?.trim();
      }
      return !0;
    }
    const M = D(
      () => n.filterDefinitions.some((O) => !C(O, x(O.id)))
    ), S = D(() => {
      const O = [];
      for (const j of n.filterDefinitions) {
        const U = x(j.id);
        if (!C(j, U)) {
          if (j.type === "text")
            O.push({ kind: "text", def: j, key: j.id });
          else if (j.type === "dateRange")
            O.push({ kind: "dateRange", def: j, key: j.id });
          else if (j.type === "select")
            for (const ft of $(U))
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
      return O.type !== "select" ? 0 : $(x(O.id)).length;
    }
    function T(O) {
      const j = x(O.id), U = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${U}: ${String(j ?? "").trim()}`;
      if (O.type === "select") {
        const nl = $(j).map((so) => O.options.find((al) => al.value === so)?.label ?? so);
        return `${U}: ${nl.join(", ")}`;
      }
      const ft = j, Zt = E(ft.start), ke = E(ft.end);
      return `${U}: ${Zt} – ${ke}`;
    }
    function B(O) {
      return O.kind === "text" || O.kind === "dateRange" ? T(O.def) : O.def.options.find((U) => U.value === O.optionValue)?.label ?? O.optionValue;
    }
    function E(O) {
      if (!O) return "";
      const j = It(O, "YYYY-MM-DD", !0);
      return j.isValid() ? j.format("L") : O;
    }
    function P(O) {
      const j = c.value === O.id && u.value, U = !C(O, x(O.id));
      return j || U ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(O) {
      return C(O, x(O.id)) ? mt(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function Y(O) {
      const j = x(O.id);
      if (O.type === "text") {
        _.value = j != null ? String(j) : "";
        return;
      }
      if (O.type === "select") {
        p.value = [...$(j)];
        return;
      }
      const U = j;
      b.value = U?.start?.trim() ?? "", v.value = U?.end?.trim() ?? "";
    }
    function W() {
      const O = g.value;
      if (!O || O.type !== "select") return;
      const j = { ...n.modelValue };
      p.value.length === 0 ? delete j[O.id] : j[O.id] = [...p.value], a("update:modelValue", j), a("change", j);
    }
    function Q(O) {
      const j = p.value.indexOf(O);
      j >= 0 ? p.value = p.value.filter((U, ft) => ft !== j) : p.value = [...p.value, O], W();
    }
    function J(O) {
      if (!O) return;
      m.value = O;
      const j = O.getBoundingClientRect(), U = 300;
      let ft = j.left;
      const Zt = window.innerWidth - U - 12;
      ft > Zt && (ft = Math.max(12, Zt)), ft < 12 && (ft = 12);
      const ke = j.bottom + 8;
      h.value = {
        top: `${ke}px`,
        left: `${ft}px`,
        width: `${Math.min(U, window.innerWidth - 24)}px`
      };
    }
    function lt(O, j) {
      if (c.value === O.id && u.value) {
        ot();
        return;
      }
      u.value && c.value !== O.id && ot(), c.value = O.id, u.value = !0, Y(O), Ot().then(async () => {
        J(j.currentTarget), await Ot(), pt();
      });
    }
    function vt(O, j) {
      if (c.value === O.id && u.value) {
        ot();
        return;
      }
      u.value && c.value !== O.id && ot(), c.value = O.id, u.value = !0, Y(O), Ot().then(async () => {
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
        _.value = O != null ? String(O) : "";
        return;
      }
      if (j.type === "select") {
        p.value = Array.isArray(O) ? O.filter((ft) => typeof ft == "string") : $(O);
        return;
      }
      const U = O;
      b.value = U?.start?.trim() ?? "", v.value = U?.end?.trim() ?? "";
    }
    function ot() {
      const O = g.value;
      if (!O) return;
      if (O.type === "text") {
        const Zt = _.value.trim(), ke = { ...n.modelValue };
        Zt === "" ? delete ke[O.id] : ke[O.id] = Zt, a("update:modelValue", ke), a("change", ke), ct();
        return;
      }
      if (O.type === "select") {
        W(), ct();
        return;
      }
      const j = b.value.trim(), U = v.value.trim(), ft = { ...n.modelValue };
      !j || !U || j > U ? delete ft[O.id] : ft[O.id] = { start: j, end: U }, a("update:modelValue", ft), a("change", ft), ct();
    }
    function Pt(O) {
      const j = { ...n.modelValue };
      delete j[O], a("update:modelValue", j), a("change", j), c.value === O && ct();
    }
    function At(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        Pt(O.def.id);
        return;
      }
      const j = { ...n.modelValue }, ft = $(j[O.def.id]).filter((Zt) => Zt !== O.optionValue);
      ft.length === 0 ? delete j[O.def.id] : j[O.def.id] = ft, a("update:modelValue", j), a("change", j), c.value === O.def.id && Y(O.def);
    }
    function V() {
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
        ot();
      }
    }
    function Nt(O) {
      O.key === "Escape" && u.value && (O.preventDefault(), ct());
    }
    function Ft() {
      !u.value || !m.value || J(m.value);
    }
    return ie(() => {
      document.addEventListener("mousedown", St, !0), window.addEventListener("keydown", Nt, !0), window.addEventListener("resize", Ft);
    }), js(() => {
      document.removeEventListener("mousedown", St, !0), window.removeEventListener("keydown", Nt, !0), window.removeEventListener("resize", Ft);
    }), Rt(
      () => n.modelValue,
      () => {
        const O = g.value;
        O && u.value && !o.panel && Y(O);
      },
      { deep: !0 }
    ), (O, j) => (y(), w("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", Jk, [
        r("span", t2, A(e.label), 1),
        r("div", e2, [
          (y(!0), w(K, null, et(e.filterDefinitions, (U) => (y(), w("button", {
            key: `pill-${U.id}`,
            ref_for: !0,
            ref: (ft) => k(U.id, ft),
            type: "button",
            class: H(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", P(U)]),
            "aria-label": N(U),
            "aria-expanded": c.value === U.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === U.id ? i : void 0,
            onClick: (ft) => vt(U, ft)
          }, [
            R(F(Gk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            r("span", a2, A(U.label), 1),
            U.type === "select" && L(U) > 0 ? (y(), w("span", o2, A(L(U)), 1)) : z("", !0)
          ], 10, n2))), 128))
        ])
      ]),
      M.value ? (y(), w("div", s2, [
        r("div", i2, [
          (y(!0), w(K, null, et(S.value, (U) => (y(), w("div", {
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
                value: x(U.def.id),
                optionValue: U.kind === "select" ? U.optionValue : void 0
              }, () => [
                yt(A(B(U)), 1)
              ], !0)
            ], 8, l2),
            r("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": G(U),
              onClick: (ft) => At(U)
            }, [
              R(F(Zk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, r2)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": bt.value,
          onClick: V
        }, A(e.clearLabel), 9, c2)
      ])) : z("", !0),
      (y(), tt(Ia, { to: "body" }, [
        c.value && u.value ? (y(), w("div", {
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
          g.value ? (y(), w(K, { key: 0 }, [
            O.$slots.panel ? $t(O.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: ot,
              value: f.value,
              updateValue: Mt
            }, void 0, !0) : (y(), w("div", u2, [
              g.value.type === "text" ? (y(), w(K, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(g.value.label), 9, h2),
                Qt(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": j[0] || (j[0] = (U) => _.value = U),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: Un(ue(ot, ["prevent"]), ["enter"])
                }, null, 40, f2), [
                  [je, _.value]
                ])
              ], 64)) : g.value.type === "select" ? (y(), w(K, { key: 1 }, [
                r("p", g2, A(g.value.label), 1),
                r("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (y(!0), w(K, null, et(g.value.options, (U) => (y(), w("li", {
                    key: U.value
                  }, [
                    r("label", m2, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: p.value.includes(U.value),
                        onChange: (ft) => Q(U.value)
                      }, null, 40, b2),
                      r("span", v2, A(U.label), 1)
                    ])
                  ]))), 128))
                ], 8, p2)
              ], 64)) : g.value.type === "dateRange" ? (y(), w(K, { key: 2 }, [
                r("p", y2, A(g.value.label), 1),
                r("div", _2, [
                  r("div", x2, [
                    r("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, k2),
                    Qt(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": j[1] || (j[1] = (U) => b.value = U),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, w2), [
                      [je, b.value]
                    ])
                  ]),
                  r("div", C2, [
                    r("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, $2),
                    Qt(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": j[2] || (j[2] = (U) => v.value = U),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, M2), [
                      [je, v.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, d2)) : z("", !0)
      ]))
    ], 8, Qk));
  }
}), D2 = /* @__PURE__ */ at(S2, [["__scopeId", "data-v-f38e0100"]]), oe = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", _e = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", A2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Ee = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", xe = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", T2 = { class: "font-sans" }, B2 = ["for"], L2 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], F2 = ["id"], E2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-input-text-${Kt()}`, s = D(() => n.id ?? o), i = D(() => `${s.value}-err`), l = D({
      get: () => n.modelValue,
      set: (d) => a("update:modelValue", d)
    });
    return (d, c) => (y(), w("div", T2, [
      e.label ? (y(), w("label", {
        key: 0,
        for: s.value,
        class: H(F(oe))
      }, A(e.label), 11, B2)) : z("", !0),
      Qt(r("input", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        type: "text",
        autocomplete: "off",
        class: H([F(_e), e.invalid ? F(Ee) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, L2), [
        [je, l.value]
      ]),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, F2)) : z("", !0)
    ]));
  }
}), P2 = { class: "font-sans" }, I2 = ["for"], R2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], O2 = ["id"], z2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-input-textarea-${Kt()}`, s = D(() => n.id ?? o), i = D(() => `${s.value}-err`), l = D({
      get: () => n.modelValue,
      set: (d) => a("update:modelValue", d)
    });
    return (d, c) => (y(), w("div", P2, [
      e.label ? (y(), w("label", {
        key: 0,
        for: s.value,
        class: H(F(oe))
      }, A(e.label), 11, I2)) : z("", !0),
      Qt(r("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: H([F(A2), e.invalid ? F(Ee) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, R2), [
        [je, l.value]
      ]),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, O2)) : z("", !0)
    ]));
  }
}), V2 = { class: "font-sans" }, N2 = ["for"], j2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], W2 = ["for"], H2 = ["title"], Y2 = ["aria-label"], K2 = ["id"], q2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-input-file-${Kt()}`, s = D(() => n.id ?? o), i = D(() => `${s.value}-err`), l = nt(null), d = D(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const _ = h.target.files?.[0] ?? null;
      a("update:modelValue", _);
    }
    function u() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, m) => (y(), w("div", V2, [
      e.label ? (y(), w("label", {
        key: 0,
        for: s.value,
        class: H(F(oe))
      }, A(e.label), 11, N2)) : z("", !0),
      r("div", {
        class: H([
          F(_e),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? F(Ee) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        r("input", {
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
          onChange: c
        }, null, 40, j2),
        r("label", {
          for: s.value,
          class: H(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          R(F(sp), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          yt(" " + A(e.chooseLabel), 1)
        ], 10, W2),
        r("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: d.value || void 0
        }, A(d.value), 9, H2),
        e.modelValue && !e.disabled ? (y(), w("button", {
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
        ], 8, Y2)) : z("", !0)
      ], 2),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, K2)) : z("", !0)
    ]));
  }
}), U2 = { class: "font-sans" }, X2 = ["for"], G2 = { class: "relative" }, Z2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Q2 = ["id"], J2 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-input-datetime-${Kt()}`, s = D(() => n.id ?? o), i = D(() => `${s.value}-err`), l = D(() => n.modelValue ?? "");
    function d(c) {
      const u = c.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (c, u) => (y(), w("div", U2, [
      e.label ? (y(), w("label", {
        key: 0,
        for: s.value,
        class: H(F(oe))
      }, A(e.label), 11, X2)) : z("", !0),
      r("div", G2, [
        R(F(Ni), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: s.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: H([
            F(_e),
            "pl-10",
            e.invalid ? F(Ee) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: d
        }, null, 42, Z2)
      ]),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, Q2)) : z("", !0)
    ]));
  }
}), tw = { class: "font-sans" }, ew = ["for"], nw = { class: "relative" }, aw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], ow = ["id"], sw = /* @__PURE__ */ Z({
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
      const _ = Number(m[1]), p = Number(m[2]);
      return !Number.isInteger(_) || !Number.isInteger(p) || _ < 0 || _ > 23 || p < 0 || p > 59 ? null : `${String(_).padStart(2, "0")}:${String(p).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = e, s = t, i = `kiut-input-time-${Kt()}`, l = D(() => o.id ?? i), d = D(() => `${l.value}-err`), c = D(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function u(h) {
      const m = h.target.value;
      s("update:modelValue", a(m));
    }
    return (h, m) => (y(), w("div", tw, [
      e.label ? (y(), w("label", {
        key: 0,
        for: l.value,
        class: H(F(oe))
      }, A(e.label), 11, ew)) : z("", !0),
      r("div", nw, [
        R(F(cp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: H([
            F(_e),
            "pl-10",
            e.invalid ? F(Ee) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? d.value : void 0,
          onInput: u
        }, null, 42, aw)
      ]),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: d.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, ow)) : z("", !0)
    ]));
  }
}), iw = { class: "font-sans" }, lw = ["for"], rw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, cw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], dw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, uw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, hw = { class: "min-w-0 text-left leading-snug" }, fw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, gw = { class: "min-w-0 text-right leading-snug" }, pw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, mw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, bw = ["id"], vw = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-input-range-${Kt()}`, s = D(() => n.id ?? o), i = D(() => `${s.value}-err`), l = D(() => {
      const _ = [];
      return n.errorText && _.push(i.value), _.length ? _.join(" ") : void 0;
    }), d = D(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = D(() => !!(n.captionMin || n.captionMax)), u = D(() => {
      const { min: _, max: p, modelValue: b } = n;
      if (p === _) return 0;
      const v = (b - _) / (p - _);
      return Math.min(100, Math.max(0, v * 100));
    }), h = D(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function m(_) {
      const p = Number(_.target.value);
      a("update:modelValue", Number.isNaN(p) ? n.min : p);
    }
    return (_, p) => (y(), w("div", iw, [
      e.label ? (y(), w("label", {
        key: 0,
        for: s.value,
        class: H(F(oe))
      }, A(e.label), 11, lw)) : z("", !0),
      r("div", {
        class: H(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), w("p", rw, A(e.captionMax), 1)) : z("", !0),
        r("div", {
          class: H(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: gt(h.value)
        }, [
          r("input", {
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
            class: H([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: m
          }, null, 42, cw)
        ], 6),
        e.orientation === "horizontal" && d.value ? (y(), w("p", dw, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (y(), w("div", uw, [
          r("span", hw, A(e.captionMin), 1),
          r("span", fw, A(e.caption), 1),
          r("span", gw, A(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), w("p", pw, A(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (y(), w("p", mw, A(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, bw)) : z("", !0)
    ]));
  }
}), yw = /* @__PURE__ */ at(vw, [["__scopeId", "data-v-a1343418"]]), _w = { class: "font-sans" }, xw = ["for"], kw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], ww = ["id"], Cw = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-input-number-${Kt()}`, s = D(() => n.id ?? o), i = D(() => `${s.value}-err`), l = D(() => {
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
    return (u, h) => (y(), w("div", _w, [
      e.label ? (y(), w("label", {
        key: 0,
        for: s.value,
        class: H(F(oe))
      }, A(e.label), 11, xw)) : z("", !0),
      r("input", {
        id: s.value,
        value: d.value,
        type: "number",
        onInput: c,
        class: H([
          F(_e),
          e.invalid ? F(Ee) : "",
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
      }, null, 42, kw),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, ww)) : z("", !0)
    ]));
  }
}), $w = { class: "font-sans" }, Mw = ["for"], Sw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Dw = ["disabled"], Aw = ["id"], Tw = "#3b82f6", Bw = "#aabbcc", Lw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Fw = /* @__PURE__ */ Z({
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
      const b = p.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (v) return `#${v[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (g) {
        const [f, k, x] = g[1].split("");
        return `#${f}${f}${k}${k}${x}${x}`.toLowerCase();
      }
      return null;
    }
    function a(p) {
      return n(p) ?? Tw;
    }
    const o = e, s = t, i = `kiut-input-color-${Kt()}`, l = D(() => o.id ?? i), d = D(() => `${l.value}-err`), c = D(() => a(o.modelValue)), u = nt(c.value), h = nt(!1);
    Rt(c, (p) => {
      h.value || (u.value = p);
    });
    function m(p) {
      const b = p.target, v = n(b.value);
      v && s("update:modelValue", v);
    }
    function _() {
      h.value = !1;
      const p = n(u.value);
      p ? (u.value = p, s("update:modelValue", p)) : u.value = c.value;
    }
    return Rt(u, (p) => {
      if (!h.value) return;
      const b = n(p);
      b && s("update:modelValue", b);
    }), (p, b) => (y(), w("div", $w, [
      e.label ? (y(), w("label", {
        key: 0,
        for: l.value,
        class: H(F(oe))
      }, A(e.label), 11, Mw)) : z("", !0),
      r("div", {
        class: H([
          Lw,
          e.invalid ? F(Ee) : "",
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
        }, null, 40, Sw),
        e.showHexInput ? Qt((y(), w("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (v) => u.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Bw,
          onFocus: b[1] || (b[1] = (v) => h.value = !0),
          onBlur: _
        }, null, 40, Dw)), [
          [je, u.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: d.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, Aw)) : z("", !0)
    ]));
  }
});
function tl(e, t) {
  return y(), w("svg", {
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
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Rw = { class: "min-w-0 flex-1" }, el = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-select-${Kt()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, d = nt(null), c = nt(null), u = nt(null), h = nt(!1), m = nt(0), _ = nt({});
    function p() {
      const B = c.value;
      if (!B) return;
      const E = B.getBoundingClientRect();
      _.value = {
        top: `${E.bottom - 3}px`,
        left: `${E.left}px`,
        width: `${E.width}px`
      };
    }
    const b = D(() => n.options.filter((B) => !B.disabled)), v = D(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), g = D(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((E) => E.value === n.modelValue)?.label ?? String(n.modelValue));
    function f(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function k(B) {
      return n.modelValue === B.value;
    }
    function x(B, E) {
      const P = k(B), N = m.value === E;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        P ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !P && N ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function $(B) {
      a("update:modelValue", B.value), h.value = !1;
    }
    function C() {
      n.disabled || (h.value = !h.value);
    }
    function M(B) {
      if (B.stopPropagation(), !n.disabled && (C(), h.value)) {
        p();
        const E = Math.max(
          0,
          b.value.findIndex((P) => P.value === n.modelValue)
        );
        m.value = E, Ot(() => u.value?.focus());
      }
    }
    function S(B) {
      if (!h.value) return;
      const E = B.target, P = d.value, N = u.value;
      P && !P.contains(E) && (!N || !N.contains(E)) && (h.value = !1);
    }
    function L(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, p(), m.value = Math.max(
        0,
        b.value.findIndex((E) => E.value === n.modelValue)
      ), Ot(() => u.value?.focus())));
    }
    function T(B) {
      const E = b.value;
      if (E.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), h.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), m.value = Math.min(m.value + 1, E.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), m.value = Math.max(m.value - 1, 0);
          return;
        }
        if (B.key === "Enter") {
          B.preventDefault();
          const P = E[m.value];
          P && $(P);
        }
      }
    }
    return ie(() => {
      document.addEventListener("click", S);
    }), Le(() => {
      document.removeEventListener("click", S);
    }), (B, E) => (y(), w("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (y(), w("label", {
        key: 0,
        id: s,
        class: H(F(oe))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(_e),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: M,
        onKeydown: L
      }, [
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(g.value), 3),
        R(F(ji), {
          class: H(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Ew),
      (y(), tt(Ia, { to: "body" }, [
        Qt(r("ul", {
          id: l,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: gt(_.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: ue(T, ["stop"])
        }, [
          (y(!0), w(K, null, et(b.value, (P, N) => (y(), w("li", {
            key: f(P),
            role: "option",
            "aria-selected": k(P),
            class: H(x(P, N)),
            onClick: ue((Y) => $(P), ["stop"]),
            onMouseenter: (Y) => m.value = N
          }, [
            e.showOptionCheck ? (y(), w("span", Iw, [
              k(P) ? (y(), tt(F(tl), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : z("", !0)
            ])) : z("", !0),
            r("span", Rw, A(P.label), 1)
          ], 42, Pw))), 128))
        ], 36), [
          [_n, h.value]
        ])
      ]))
    ], 512));
  }
}), Ow = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], zw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Vw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Nw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, jw = { class: "truncate" }, Ww = ["aria-selected", "onClick", "onMouseenter"], Hw = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Yw = { class: "min-w-0 flex-1" }, Kw = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-multiselect-${Kt()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, d = nt(null), c = nt(null), u = nt(!1), h = nt(0), m = D(() => n.options.filter((T) => !T.disabled)), _ = D(() => new Set(n.modelValue ?? [])), p = D(
      () => n.options.filter((T) => _.value.has(T.value))
    ), b = D(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = p.value.length;
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
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && P ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function k(T) {
      const B = [...n.modelValue ?? []], E = B.indexOf(T.value);
      E >= 0 ? B.splice(E, 1) : B.push(T.value), a("update:modelValue", B);
    }
    function x() {
      const T = m.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const B = _.value, E = T.findIndex((P) => B.has(P.value));
      h.value = E >= 0 ? E : 0;
    }
    function $() {
      n.disabled || (u.value = !u.value);
    }
    function C(T) {
      T.stopPropagation(), !n.disabled && ($(), u.value && (x(), Ot(() => c.value?.focus())));
    }
    function M(T) {
      if (!u.value) return;
      const B = d.value;
      B && !B.contains(T.target) && (u.value = !1);
    }
    function S(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), u.value || (u.value = !0, x(), Ot(() => c.value?.focus())));
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
          const E = B[h.value];
          E && k(E);
        }
      }
    }
    return ie(() => {
      document.addEventListener("click", M);
    }), Le(() => {
      document.removeEventListener("click", M);
    }), (T, B) => (y(), w("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (y(), w("label", {
        key: 0,
        id: s,
        class: H(F(oe))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(_e),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onClick: C,
        onKeydown: S
      }, [
        r("div", zw, [
          p.value.length === 0 ? (y(), w("span", Vw, A(e.placeholder), 1)) : (y(), w("div", Nw, [
            (y(!0), w(K, null, et(p.value, (E) => (y(), w("span", {
              key: v(E),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              r("span", jw, A(E.label), 1)
            ]))), 128))
          ]))
        ]),
        R(F(ji), {
          class: H(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Ow),
      Qt(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ue(L, ["stop"])
      }, [
        (y(!0), w(K, null, et(m.value, (E, P) => (y(), w("li", {
          key: v(E),
          role: "option",
          "aria-selected": g(E),
          class: H(f(E, P)),
          onClick: ue((N) => k(E), ["stop"]),
          onMouseenter: (N) => h.value = P
        }, [
          r("span", Hw, [
            g(E) ? (y(), tt(F(tl), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          r("span", Yw, A(E.label), 1)
        ], 42, Ww))), 128))
      ], 544), [
        [_n, u.value]
      ])
    ], 512));
  }
}), qw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Uw = { class: "sr-only" }, Xw = /* @__PURE__ */ Z({
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
    function o() {
      n.disabled || a("update:modelValue", !n.modelValue);
    }
    return (s, i) => (y(), w("button", {
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
      onClick: o,
      onKeydown: [
        Un(ue(o, ["prevent", "stop"]), ["space"]),
        Un(ue(o, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: H(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", Uw, A(e.ariaLabel), 1)
    ], 42, qw));
  }
}), Gw = { class: "font-sans" }, Zw = ["for"], Qw = { class: "flex gap-2" }, Jw = { class: "w-[7.5rem] shrink-0" }, t5 = { class: "min-w-0 flex-1" }, e5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], n5 = ["id"], a5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = `kiut-phone-${Kt()}`, s = D(() => n.id ?? `${o}-num`), i = D(() => `${s.value}-err`), l = D({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), d = D({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, u) => (y(), w("div", Gw, [
      e.label ? (y(), w("label", {
        key: 0,
        for: s.value,
        class: H(F(oe))
      }, A(e.label), 11, Zw)) : z("", !0),
      r("div", Qw, [
        r("div", Jw, [
          R(el, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        r("div", t5, [
          Qt(r("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => d.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: H([F(_e), e.invalid ? F(Ee) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, e5), [
            [je, d.value]
          ])
        ])
      ]),
      e.errorText ? (y(), w("p", {
        key: 1,
        id: i.value,
        class: H(F(xe)),
        role: "alert"
      }, A(e.errorText), 11, n5)) : z("", !0)
    ]));
  }
}), o5 = ["role", "aria-label"], s5 = { class: "flex flex-wrap gap-2" }, i5 = ["aria-checked", "role", "onClick"], l5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, r5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, c5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, d5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, o = D(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function s(d) {
      return n.multiple ? o.value.includes(d.value) : n.modelValue === d.value;
    }
    function i(d) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(d) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
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
    return (d, c) => (y(), w("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", s5, [
        (y(!0), w(K, null, et(e.items, (u) => (y(), w("button", {
          key: u.value,
          type: "button",
          class: H(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(u)
        }, [
          r("span", l5, [
            s(u) ? (y(), w("span", r5)) : z("", !0)
          ]),
          u.dotColor ? (y(), w("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: gt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          r("span", c5, A(u.label), 1)
        ], 10, i5))), 128))
      ])
    ], 8, o5));
  }
}), u5 = ["aria-label"], h5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], f5 = { class: "truncate px-3 py-2 text-sm font-medium" }, g5 = /* @__PURE__ */ Z({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-seg-${Kt()}`, s = (b) => `${o}-seg-${b}`, i = nt([]);
    function l(b, v) {
      b instanceof HTMLButtonElement ? i.value[v] = b : i.value[v] = null;
    }
    function d(b) {
      return b.value === n.modelValue;
    }
    function c(b) {
      const v = d(b), g = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return b.disabled ? `${g} cursor-not-allowed opacity-40` : v ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(b) {
      b.disabled || b.value !== n.modelValue && a("update:modelValue", b.value);
    }
    function h(b, v, g) {
      u(b), Ot(() => i.value[v]?.focus());
    }
    const m = D(
      () => n.items.map((b, v) => b.disabled ? -1 : v).filter((b) => b >= 0)
    );
    function _(b, v) {
      const g = n.items.length;
      if (g === 0) return 0;
      let f = b;
      for (let k = 0; k < g; k++)
        if (f = (f + v + g) % g, !n.items[f]?.disabled) return f;
      return b;
    }
    function p(b, v) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const g = _(v, 1), f = n.items[g];
        f && u(f), Ot(() => i.value[g]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const g = _(v, -1), f = n.items[g];
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
    return (b, v) => (y(), w("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (y(!0), w(K, null, et(e.items, (g, f) => (y(), w("button", {
        id: s(g.value),
        key: g.value,
        ref_for: !0,
        ref: (k) => l(k, f),
        type: "button",
        role: "tab",
        "aria-selected": d(g),
        "aria-disabled": g.disabled === !0,
        tabindex: d(g) ? 0 : -1,
        class: H(c(g)),
        onClick: (k) => h(g, f),
        onKeydown: (k) => p(k, f)
      }, [
        r("span", f5, A(g.label), 1)
      ], 42, h5))), 128))
    ], 8, u5));
  }
});
function Oe(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function un(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function we(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Ca(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Is(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function ra(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Rs(e, t) {
  return ra(e, t) === 0;
}
function $a(e, t) {
  return ra(e, t) < 0;
}
function p5(e, t) {
  return ra(e, t) >= 0;
}
function m5(e, t) {
  return ra(e, t) <= 0;
}
function b5(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), o = new Date(a);
  o.setDate(a.getDate() - a.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
const v5 = [
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
], y5 = [
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
function Os(e) {
  return `${v5[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function zs(e) {
  return `${y5[e.getMonth()]} ${e.getFullYear()}`;
}
const _5 = ["aria-expanded", "aria-labelledby", "aria-label"], x5 = ["onKeydown"], k5 = { class: "mb-4 flex items-center justify-between gap-2" }, w5 = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, C5 = { class: "min-w-0 truncate" }, $5 = { class: "min-w-0 truncate" }, M5 = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, S5 = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, D5 = { class: "grid grid-cols-7 gap-y-1" }, A5 = ["disabled", "onClick"], T5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `${`kiut-drp-${Kt()}`}-lbl`, i = nt(null), l = nt(null), d = nt(!1), c = nt(null), u = nt(Ca(/* @__PURE__ */ new Date())), h = D(() => {
      const S = Ca(u.value);
      return [S, Is(S, 1)];
    }), m = D(() => n.ariaLabel ?? n.placeholder), _ = D(
      () => n.panelAlign === "end" ? "right-0 left-auto" : "left-0 right-auto"
    ), p = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], b = D(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const S = Oe(n.modelValue.start), L = Oe(n.modelValue.end);
      return `${Os(S)} – ${Os(L)}`;
    });
    function v(S, L) {
      return S.getMonth() === L.getMonth() && S.getFullYear() === L.getFullYear();
    }
    function g(S) {
      const L = we(S);
      if (n.minDate) {
        const T = we(Oe(n.minDate));
        if ($a(L, T)) return !0;
      }
      if (n.maxDate) {
        const T = we(Oe(n.maxDate));
        if ($a(T, L)) return !0;
      }
      return !1;
    }
    function f(S, L) {
      const T = v(L, S), B = n.modelValue.start ? we(Oe(n.modelValue.start)) : null, E = n.modelValue.end ? we(Oe(n.modelValue.end)) : null, P = we(L), N = T ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!B || !E)
        return `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const Y = p5(P, B) && m5(P, E), W = Rs(P, B), Q = Rs(P, E);
      return W || Q ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : Y ? `${N} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${N} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function k(S) {
      if (g(S)) return;
      const L = we(S);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: un(L), end: un(L) });
        return;
      }
      let B = we(c.value), E = new Date(L);
      $a(E, B) && ([B, E] = [E, B]), a("update:modelValue", { start: un(B), end: un(E) }), c.value = null, d.value = !1;
    }
    function x(S) {
      u.value = Is(u.value, S);
    }
    function $() {
      d.value = !1;
    }
    function C(S) {
      if (S?.stopPropagation(), !d.value) {
        if (d.value = !0, c.value = null, n.modelValue.start)
          try {
            u.value = Ca(Oe(n.modelValue.start));
          } catch {
          }
        Ot(() => l.value?.focus());
      }
    }
    function M(S) {
      if (!d.value) return;
      const L = i.value;
      L && !L.contains(S.target) && (d.value = !1);
    }
    return Rt(d, (S) => {
      S && (c.value = null);
    }), ie(() => {
      document.addEventListener("click", M);
    }), Le(() => {
      document.removeEventListener("click", M);
    }), (S, L) => (y(), w("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), w("label", {
        key: 0,
        id: s,
        class: H(F(oe))
      }, A(e.label), 3)) : z("", !0),
      r("button", {
        type: "button",
        class: H([F(_e), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": d.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onFocus: C,
        onClick: C
      }, [
        R(F(Ni), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(b.value), 3)
      ], 42, _5),
      Qt(r("div", {
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
        onKeydown: Un(ue($, ["stop"]), ["escape"])
      }, [
        r("div", k5, [
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: L[0] || (L[0] = (T) => x(-1))
          }, [
            R(F(lp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          r("div", w5, [
            r("span", C5, A(F(zs)(h.value[0])), 1),
            r("span", $5, A(F(zs)(h.value[1])), 1)
          ]),
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: L[1] || (L[1] = (T) => x(1))
          }, [
            R(F(rp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        r("div", M5, [
          (y(!0), w(K, null, et(h.value, (T) => (y(), w("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            r("div", S5, [
              (y(), w(K, null, et(p, (B) => r("span", { key: B }, A(B), 1)), 64))
            ]),
            r("div", D5, [
              (y(!0), w(K, null, et(F(b5)(T), (B) => (y(), w("button", {
                key: F(un)(B),
                type: "button",
                disabled: g(B),
                class: H(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", f(T, B)]),
                onClick: (E) => k(B)
              }, A(B.getDate()), 11, A5))), 128))
            ])
          ]))), 128))
        ])
      ], 42, x5), [
        [_n, d.value]
      ])
    ], 512));
  }
}), B5 = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, L5 = ["type", "disabled", "aria-label"], F5 = {
  key: 1,
  class: "min-w-0 truncate"
}, E5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, P5 = ["type", "disabled", "aria-label"], I5 = {
  key: 1,
  class: "min-w-0 truncate"
}, qn = /* @__PURE__ */ Z({
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
    const t = e, n = Ws(), a = D(() => !!t.tooltip?.trim()), o = D(() => t.variant === "action"), s = D(() => !o.value), i = D(() => {
      const u = n["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (o.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = D(() => {
      const u = n.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), d = D(() => {
      const { class: u, type: h, "aria-label": m, ..._ } = n;
      return _;
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
    return (u, h) => a.value ? (y(), w("span", B5, [
      r("button", Xn({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, F(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, d.value), [
        u.$slots.icon ? (y(), w("span", {
          key: 0,
          class: H(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          $t(u.$slots, "icon")
        ], 2)) : z("", !0),
        s.value ? (y(), w("span", F5, [
          $t(u.$slots, "default")
        ])) : z("", !0)
      ], 16, L5),
      r("span", E5, A(e.tooltip), 1)
    ])) : (y(), w("button", Xn({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, F(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, d.value), [
      u.$slots.icon ? (y(), w("span", {
        key: 0,
        class: H(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        $t(u.$slots, "icon")
      ], 2)) : z("", !0),
      s.value ? (y(), w("span", I5, [
        $t(u.$slots, "default")
      ])) : z("", !0)
    ], 16, P5));
  }
}), R5 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, O5 = { class: "min-w-0 flex-1 space-y-1" }, z5 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, V5 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, N5 = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, j5 = /* @__PURE__ */ Z({
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
    const n = e, a = t, s = `${`kiut-modal-${Kt()}`}-title`, i = nt(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function d() {
      a("confirm");
    }
    function c(u) {
      n.modelValue && u.key === "Escape" && (u.preventDefault(), l());
    }
    return Rt(
      () => n.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), ie(() => {
      document.addEventListener("keydown", c);
    }), Le(() => {
      document.removeEventListener("keydown", c);
    }), (u, h) => (y(), tt(Ia, { to: "body" }, [
      R(pn, { name: "kiut-modal" }, {
        default: I(() => [
          e.modelValue ? (y(), w("div", R5, [
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
              "aria-labelledby": s,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = ue(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: H(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                r("div", O5, [
                  r("h2", {
                    id: s,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (y(), w("p", z5, A(e.subtitle), 1)) : z("", !0)
                ]),
                R(qn, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: I(() => [
                    R(F(Wi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              r("div", V5, [
                $t(u.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", N5, [
                R(qn, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: I(() => [
                    yt(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                R(qn, {
                  variant: "primary",
                  type: "button",
                  onClick: d
                }, {
                  default: I(() => [
                    yt(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : z("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), W5 = /* @__PURE__ */ at(j5, [["__scopeId", "data-v-4ed7bb14"]]), H5 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, Y5 = {
  key: 0,
  class: ""
}, K5 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, q5 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, U5 = {
  key: 1,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, X5 = /* @__PURE__ */ Z({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Pa(), n = D(() => {
      const a = !!t.filters, o = !!t.actions;
      return a ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (y(), w("section", H5, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (y(), w("header", Y5, [
        a.$slots.description ? (y(), w("div", K5, [
          $t(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.filters || a.$slots.actions ? (y(), w("div", {
          key: 1,
          class: H(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (y(), w("div", q5, [
            $t(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (y(), w("div", U5, [
            $t(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (y(), w("div", {
        key: 1,
        class: H({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        $t(a.$slots, "content", {}, () => [
          $t(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), G5 = { class: "flex flex-1 min-h-0" }, Z5 = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, Q5 = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, J5 = ["aria-current", "title", "onClick"], tC = {
  key: 1,
  class: "shrink-0 border-t [border-color:var(--kiut-lateral-border-color)] [background-color:var(--kiut-lateral-bg)]"
}, eC = { class: "px-4 py-4 shrink-0" }, nC = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, aC = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, oC = ["data-nav-id", "aria-current", "onClick"], sC = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, iC = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, lC = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, rC = ["data-nav-id", "aria-current", "onClick"], cC = { class: "truncate text-[15px]" }, dC = ["aria-current", "onClick"], uC = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, hC = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, fC = /* @__PURE__ */ Z({
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
    const n = nt(!1), a = e, o = t, s = Ws(), { class: i, ...l } = s, d = nt(!1);
    function c() {
      typeof window > "u" || (d.value = window.innerWidth < a.mobileBreakpoint);
    }
    ie(() => {
      c(), window.addEventListener("resize", c);
    }), Le(() => {
      window.removeEventListener("resize", c);
    });
    const u = D(() => {
      const x = a.sections.find(($) => $.id === a.selectedSectionId);
      return x?.items?.length ? x : null;
    });
    function h(x) {
      return a.activePath ? a.activePath === x.path || a.activePath.startsWith(x.path + "/") : !1;
    }
    function m(x) {
      return x.items?.length ? x.items.some(h) : !a.activePath || !x.path ? !1 : a.activePath === x.path || a.activePath.startsWith(x.path + "/");
    }
    function _(x) {
      if (!x.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: x,
          item: { id: x.id, label: x.label, path: x.path }
        });
        return;
      }
      const $ = a.selectedSectionId === x.id ? null : x.id;
      o("update:selectedSectionId", $);
    }
    function p(x, $) {
      o("navigate", { section: x, item: $ });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function v(x, $) {
      p(x, $), b();
    }
    function g(x) {
      return a.selectedSectionId === x.id ? [
        "[background-color:var(--kiut-primary-section)] text-white shadow-sm dark:text-purple-300"
      ] : m(x) ? [
        "[color:var(--kiut-primary)]",
        "text-purple-800/90 dark:text-purple-400"
      ] : [
        "[color:var(--kiut-text-secondary)]",
        "hover:bg-purple-100 hover:text-purple-900",
        "dark:hover:bg-purple-400/20 dark:hover:text-purple-50"
      ];
    }
    function f(x) {
      return h(x) ? [
        "[background-color:var(--kiut-secondary-section)] text-white",
        "dark:text-purple-300"
      ] : [
        "[color:var(--kiut-text-primary)]",
        "hover:bg-purple-100 hover:text-purple-700",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    function k(x) {
      return a.selectedSectionId === x.id ? ["[color:var(--kiut-primary)]"] : m(x) ? ["[color:var(--kiut-primary)]", "opacity-75"] : [
        "[color:var(--kiut-text-muted)]",
        "active:[color:var(--kiut-text-secondary)]"
      ];
    }
    return (x, $) => d.value ? (y(), w("div", Xn({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      R(pn, { name: "ksn-overlay" }, {
        default: I(() => [
          u.value ? (y(), w("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : z("", !0)
        ]),
        _: 1
      }),
      R(pn, { name: "ksn-sheet" }, {
        default: I(() => [
          u.value ? (y(), w("div", {
            key: 0,
            class: "fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t [border-color:var(--kiut-lateral-border-color)] max-h-[70vh] flex flex-col",
            style: gt({ paddingBottom: a.mobileBarHeight })
          }, [
            $[3] || ($[3] = r("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              r("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            r("div", sC, [
              r("p", iC, A(u.value.label), 1),
              r("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
              }, [...$[2] || ($[2] = [
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
            r("nav", lC, [
              (y(!0), w(K, null, et(u.value.items, (C) => (y(), w("button", {
                key: C.id,
                type: "button",
                "data-nav-id": C.id,
                "aria-current": h(C) ? "page" : void 0,
                class: H(["group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]", f(C)]),
                onClick: (M) => v(u.value, C)
              }, [
                C.icon ? (y(), tt(Ge(C.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                r("span", cC, A(C.label), 1)
              ], 10, rC))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      r("nav", {
        class: "fixed bottom-0 left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] border-t [border-color:var(--kiut-lateral-border-color)] flex items-stretch justify-around overflow-hidden",
        style: gt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (y(!0), w(K, null, et(e.sections, (C) => (y(), w("button", {
          key: C.id,
          type: "button",
          "aria-current": e.selectedSectionId === C.id ? "true" : void 0,
          class: H(["relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--kiut-primary)]/30", k(C)]),
          onClick: (M) => _(C)
        }, [
          e.selectedSectionId === C.id || m(C) ? (y(), w("span", uC)) : z("", !0),
          C.icon ? (y(), tt(Ge(C.icon), {
            key: 1,
            class: "shrink-0",
            style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          r("span", hC, A(C.label), 1)
        ], 10, dC))), 128))
      ], 4)
    ], 16)) : (y(), w("aside", Xn({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", G5, [
        r("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center [border-color:var(--kiut-lateral-border-color)]",
          style: gt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: $[0] || ($[0] = (C) => n.value = !0),
          onMouseleave: $[1] || ($[1] = (C) => n.value = !1)
        }, [
          x.$slots.logo ? (y(), w("div", Z5, [
            $t(x.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          r("nav", Q5, [
            (y(!0), w(K, null, et(e.sections, (C) => (y(), w("button", {
              key: C.id,
              type: "button",
              "aria-current": e.selectedSectionId === C.id ? "true" : void 0,
              title: C.label,
              class: H(["group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20", g(C)]),
              onClick: (M) => _(C)
            }, [
              C.icon ? (y(), tt(Ge(C.icon), {
                key: 0,
                class: "shrink-0",
                style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              r("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: gt({ fontSize: e.primaryFontSize })
              }, A(C.label), 5)
            ], 10, J5))), 128))
          ]),
          x.$slots.footer ? (y(), w("div", tC, [
            $t(x.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        R(pn, { name: "ksn-sub" }, {
          default: I(() => [
            u.value ? (y(), w("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: gt({ width: e.secondaryWidth })
            }, [
              r("div", eC, [
                r("p", nC, A(u.value.label), 1)
              ]),
              r("nav", aC, [
                (y(!0), w(K, null, et(u.value.items, (C) => (y(), w("button", {
                  key: C.id,
                  type: "button",
                  "data-nav-id": C.id,
                  "aria-current": h(C) ? "page" : void 0,
                  class: H(["group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20", f(C)]),
                  onClick: (M) => p(u.value, C)
                }, [
                  C.icon ? (y(), tt(Ge(C.icon), {
                    key: 0,
                    style: gt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  r("span", {
                    class: "truncate",
                    style: gt({ fontSize: e.secondaryFontSize })
                  }, A(C.label), 5)
                ], 10, oC))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), gC = /* @__PURE__ */ at(fC, [["__scopeId", "data-v-d3ebd9b8"]]), $C = {
  install(e) {
    e.component("KiutChartBar", be), e.component("KiutChartLine", ye), e.component("KiutPieChart", la), e.component("KiutBoxplotChart", Qh), e.component("KiutCandlestickChart", Oi), e.component("KiutHistogramChart", zi), e.component("KiutSankeyChart", Fe), e.component("KiutAgentsPerDay", Ap), e.component("KiutBookingManager", sm), e.component("KiutCheckin", Hi), e.component("KiutCheckinContainer", m0), e.component("KiutCheckinMetrics", Rm), e.component("KiutCheckinSegments", Ki), e.component("KiutDisruption", P0), e.component("KiutFAQ", j0), e.component("KiutMessagesPerAgent", Q0), e.component("KiutRecordLocator", Yi), e.component("KiutSalesByChannel", qi), e.component("KiutSeller", Ui), e.component("KiutSellerContainer", Vb), e.component("KiutTopAgents", Ub), e.component("KiutPaymentMethod", mv), e.component("KiutAgentHumanConversations", py), e.component("KiutChannelMetrics", $y), e.component("KiutTriageCombinations", Vy), e.component("KiutSelectLanguage", qy), e.component("KiutGuardrails", o1), e.component("KiutDisruptionNotifier", $1), e.component("KiutTotalConversationsCard", B1), e.component("KiutCsatP95Card", R1), e.component("KiutCSATContainer", b_), e.component("KiutAiGeneratedRevenueCard", $_), e.component("KiutHumanEscalations", z_), e.component("KiutHumanEscalationsCard", Y_), e.component("KiutNpsDailyMetrics", Zi), e.component("KiutNpsMetrics", Qi), e.component("KiutNpsOverviewMetrics", Gi), e.component("KiutAWSCost", ex), e.component("KiutCostUsage", hx), e.component("KiutTokenUsage", wx), e.component("KiutConversationCount", Ex), e.component("KiutTopAgentsAnalysis", qx), e.component("KiutTopAgentsPie", ak), e.component("KiutDailyCostTrends", fk), e.component("KiutModelUsage", Dk), e.component("KiutMessageRoles", Ok), e.component("KiutCostPerConversations", Xk), e.component("Tabs", Ji), e.component("Table", Xi), e.component("Filters", D2), e.component("InputText", E2), e.component("InputTextarea", z2), e.component("InputFile", q2), e.component("InputDateTime", J2), e.component("InputTime", sw), e.component("InputRange", yw), e.component("InputNumber", Cw), e.component("InputColorPicker", Fw), e.component("Select", el), e.component("MultiSelect", Kw), e.component("Toggle", Xw), e.component("InputPhone", a5), e.component("SelectablePills", d5), e.component("SegmentedControl", g5), e.component("DateRangePicker", T5), e.component("Tag", jt), e.component("Button", qn), e.component("Modal", W5), e.component("Section", X5), e.component("KiutAppShellNavigation", gC);
  }
};
export {
  ex as AWSCost,
  py as AgentHumanConversations,
  Ap as AgentsPerDay,
  $_ as AiGeneratedRevenueCard,
  gC as AppShellNavigation,
  sm as BookingManager,
  Qh as BoxplotChart,
  qn as Button,
  b_ as CSATContainer,
  Oi as CandlestickChart,
  $y as ChannelMetrics,
  be as ChartBar,
  ye as ChartLine,
  Hi as Checkin,
  m0 as CheckinContainer,
  Rm as CheckinMetrics,
  Ki as CheckinSegments,
  Ex as ConversationCount,
  Xk as CostPerConversations,
  hx as CostUsage,
  R1 as CsatP95Card,
  fk as DailyCostTrends,
  T5 as DateRangePicker,
  P0 as Disruption,
  $1 as DisruptionNotifier,
  j0 as FAQ,
  D2 as Filters,
  o1 as Guardrails,
  zi as HistogramChart,
  z_ as HumanEscalations,
  Y_ as HumanEscalationsCard,
  Fw as InputColorPicker,
  J2 as InputDateTime,
  q2 as InputFile,
  Cw as InputNumber,
  a5 as InputPhone,
  yw as InputRange,
  E2 as InputText,
  z2 as InputTextarea,
  sw as InputTime,
  $C as KiutUIPlugin,
  Ok as MessageRoles,
  Q0 as MessagesPerAgent,
  W5 as Modal,
  Dk as ModelUsage,
  Kw as MultiSelect,
  Zi as NpsDailyMetrics,
  Qi as NpsMetrics,
  Gi as NpsOverviewMetrics,
  mv as PaymentMethod,
  la as PieChart,
  Yi as RecordLocator,
  qi as SalesByChannel,
  Fe as SankeyChart,
  X5 as Section,
  g5 as SegmentedControl,
  el as Select,
  qy as SelectLanguage,
  d5 as SelectablePills,
  Ui as Seller,
  Vb as SellerContainer,
  Xi as Table,
  Ji as Tabs,
  jt as Tag,
  Xw as Toggle,
  wx as TokenUsage,
  Ub as TopAgents,
  qx as TopAgentsAnalysis,
  ak as TopAgentsPie,
  B1 as TotalConversationsCard,
  Vy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
