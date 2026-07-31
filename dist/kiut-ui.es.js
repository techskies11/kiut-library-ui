import { defineComponent as ce, shallowRef as gi, h as Ne, ref as oe, onMounted as Je, onUnmounted as st, watch as Re, toRaw as Zn, nextTick as We, version as jr, isProxy as mi, computed as $, toRef as $e, openBlock as g, createElementBlock as x, normalizeStyle as we, createVNode as N, unref as B, createElementVNode as u, Fragment as le, renderList as be, normalizeClass as Q, toDisplayString as A, createCommentVNode as F, onBeforeUnmount as pi, createStaticVNode as Qn, useSlots as co, renderSlot as ke, Transition as gt, withCtx as E, Comment as Hr, createBlock as ae, resolveDynamicComponent as bt, createTextVNode as Ae, Teleport as Zt, withDirectives as Qe, withModifiers as ze, vModelText as Vt, vShow as Qt, createSlots as Io, vModelSelect as Wr, mergeProps as vt, useAttrs as Qa, withKeys as Na, inject as bi } from "vue";
import * as Eo from "echarts/core";
import { TooltipComponent as Kr, TitleComponent as Ur } from "echarts/components";
import { SankeyChart as Yr } from "echarts/charts";
import { CanvasRenderer as qr } from "echarts/renderers";
import je from "moment";
function Ja(e) {
  return e + 0.5 | 0;
}
const Ht = (e, t, a) => Math.max(Math.min(e, a), t);
function Pa(e) {
  return Ht(Ja(e * 2.55), 0, 255);
}
function Xt(e) {
  return Ht(Ja(e * 255), 0, 255);
}
function Et(e) {
  return Ht(Ja(e / 2.55) / 100, 0, 1);
}
function Fo(e) {
  return Ht(Ja(e * 100), 0, 100);
}
const pt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Jn = [..."0123456789ABCDEF"], Xr = (e) => Jn[e & 15], Gr = (e) => Jn[(e & 240) >> 4] + Jn[e & 15], nn = (e) => (e & 240) >> 4 === (e & 15), Zr = (e) => nn(e.r) && nn(e.g) && nn(e.b) && nn(e.a);
function Qr(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & pt[e[1]] * 17,
    g: 255 & pt[e[2]] * 17,
    b: 255 & pt[e[3]] * 17,
    a: t === 5 ? pt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: pt[e[1]] << 4 | pt[e[2]],
    g: pt[e[3]] << 4 | pt[e[4]],
    b: pt[e[5]] << 4 | pt[e[6]],
    a: t === 9 ? pt[e[7]] << 4 | pt[e[8]] : 255
  })), a;
}
const Jr = (e, t) => e < 255 ? t(e) : "";
function el(e) {
  var t = Zr(e) ? Xr : Gr;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Jr(e.a, t) : void 0;
}
const tl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function vi(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function al(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function nl(e, t, a) {
  const n = vi(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function ol(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function uo(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), r = (s + i) / 2;
  let l, c, d;
  return s !== i && (d = s - i, c = r > 0.5 ? d / (2 - s - i) : d / (s + i), l = ol(a, n, o, d, s), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function ho(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(Xt);
}
function fo(e, t, a) {
  return ho(vi, e, t, a);
}
function sl(e, t, a) {
  return ho(nl, e, t, a);
}
function il(e, t, a) {
  return ho(al, e, t, a);
}
function yi(e) {
  return (e % 360 + 360) % 360;
}
function rl(e) {
  const t = tl.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Pa(+t[5]) : Xt(+t[5]));
  const o = yi(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = sl(o, s, i) : t[1] === "hsv" ? n = il(o, s, i) : n = fo(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function ll(e, t) {
  var a = uo(e);
  a[0] = yi(a[0] + t), a = fo(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function cl(e) {
  if (!e)
    return;
  const t = uo(e), a = t[0], n = Fo(t[1]), o = Fo(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Et(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const Oo = {
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
}, Vo = {
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
function dl() {
  const e = {}, t = Object.keys(Vo), a = Object.keys(Oo);
  let n, o, s, i, r;
  for (n = 0; n < t.length; n++) {
    for (i = r = t[n], o = 0; o < a.length; o++)
      s = a[o], r = r.replace(s, Oo[s]);
    s = parseInt(Vo[i], 16), e[r] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let on;
function ul(e) {
  on || (on = dl(), on.transparent = [0, 0, 0, 0]);
  const t = on[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const hl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function fl(e) {
  const t = hl.exec(e);
  let a = 255, n, o, s;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? Pa(i) : Ht(i * 255, 0, 255);
    }
    return n = +t[1], o = +t[3], s = +t[5], n = 255 & (t[2] ? Pa(n) : Ht(n, 0, 255)), o = 255 & (t[4] ? Pa(o) : Ht(o, 0, 255)), s = 255 & (t[6] ? Pa(s) : Ht(s, 0, 255)), {
      r: n,
      g: o,
      b: s,
      a
    };
  }
}
function gl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Et(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const En = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ba = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function ml(e, t, a) {
  const n = ba(Et(e.r)), o = ba(Et(e.g)), s = ba(Et(e.b));
  return {
    r: Xt(En(n + a * (ba(Et(t.r)) - n))),
    g: Xt(En(o + a * (ba(Et(t.g)) - o))),
    b: Xt(En(s + a * (ba(Et(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function sn(e, t, a) {
  if (e) {
    let n = uo(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = fo(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function xi(e, t) {
  return e && Object.assign(t || {}, e);
}
function zo(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Xt(e[3]))) : (t = xi(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Xt(t.a)), t;
}
function pl(e) {
  return e.charAt(0) === "r" ? fl(e) : rl(e);
}
class ja {
  constructor(t) {
    if (t instanceof ja)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = zo(t) : a === "string" && (n = Qr(t) || ul(t) || pl(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = xi(this._rgb);
    return t && (t.a = Et(t.a)), t;
  }
  set rgb(t) {
    this._rgb = zo(t);
  }
  rgbString() {
    return this._valid ? gl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? el(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? cl(this._rgb) : void 0;
  }
  mix(t, a) {
    if (t) {
      const n = this.rgb, o = t.rgb;
      let s;
      const i = a === s ? 0.5 : a, r = 2 * i - 1, l = n.a - o.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      s = 1 - c, n.r = 255 & c * n.r + s * o.r + 0.5, n.g = 255 & c * n.g + s * o.g + 0.5, n.b = 255 & c * n.b + s * o.b + 0.5, n.a = i * n.a + (1 - i) * o.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, a) {
    return t && (this._rgb = ml(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new ja(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Xt(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = Ja(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return sn(this._rgb, 2, t), this;
  }
  darken(t) {
    return sn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return sn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return sn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return ll(this._rgb, t), this;
  }
}
function Rt() {
}
const bl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ie(e) {
  return e == null;
}
function Ge(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Te(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function xt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Dt(e, t) {
  return xt(e) ? e : t;
}
function De(e, t) {
  return typeof e > "u" ? t : e;
}
const vl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, ki = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Ve(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Ee(e, t, a, n) {
  let o, s, i;
  if (Ge(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(a, e[o], o);
  else if (Te(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(a, e[i[o]], i[o]);
}
function _n(e, t) {
  let a, n, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, n = e.length; a < n; ++a)
    if (o = e[a], s = t[a], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function wn(e) {
  if (Ge(e))
    return e.map(wn);
  if (Te(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let o = 0;
    for (; o < n; ++o)
      t[a[o]] = wn(e[a[o]]);
    return t;
  }
  return e;
}
function _i(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function yl(e, t, a, n) {
  if (!_i(e))
    return;
  const o = t[e], s = a[e];
  Te(o) && Te(s) ? Ha(o, s, n) : t[e] = wn(s);
}
function Ha(e, t, a) {
  const n = Ge(t) ? t : [
    t
  ], o = n.length;
  if (!Te(e))
    return e;
  a = a || {};
  const s = a.merger || yl;
  let i;
  for (let r = 0; r < o; ++r) {
    if (i = n[r], !Te(i))
      continue;
    const l = Object.keys(i);
    for (let c = 0, d = l.length; c < d; ++c)
      s(l[c], e, i, a);
  }
  return e;
}
function Fa(e, t) {
  return Ha(e, t, {
    merger: xl
  });
}
function xl(e, t, a) {
  if (!_i(e))
    return;
  const n = t[e], o = a[e];
  Te(n) && Te(o) ? Fa(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = wn(o));
}
const No = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function kl(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function _l(e) {
  const t = kl(e);
  return (a) => {
    for (const n of t) {
      if (n === "")
        break;
      a = a && a[n];
    }
    return a;
  };
}
function fa(e, t) {
  return (No[t] || (No[t] = _l(t)))(e);
}
function go(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Wa = (e) => typeof e < "u", Jt = (e) => typeof e == "function", jo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function wl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Fe = Math.PI, Ue = 2 * Fe, Cl = Ue + Fe, Cn = Number.POSITIVE_INFINITY, $l = Fe / 180, Ze = Fe / 2, sa = Fe / 4, Ho = Fe * 2 / 3, wi = Math.log10, Bt = Math.sign;
function Oa(e, t, a) {
  return Math.abs(e - t) < a;
}
function Wo(e) {
  const t = Math.round(e);
  e = Oa(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(wi(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function Sl(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function Ml(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ka(e) {
  return !Ml(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Dl(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Al(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function Ft(e) {
  return e * (Fe / 180);
}
function Tl(e) {
  return e * (180 / Fe);
}
function Ko(e) {
  if (!xt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Ci(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Fe && (s += Ue), {
    angle: s,
    distance: o
  };
}
function eo(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Bl(e, t) {
  return (e - t + Cl) % Ue - Fe;
}
function _t(e) {
  return (e % Ue + Ue) % Ue;
}
function Ua(e, t, a, n) {
  const o = _t(e), s = _t(t), i = _t(a), r = _t(s - o), l = _t(i - o), c = _t(o - s), d = _t(o - i);
  return o === s || o === i || n && s === i || r > l && c < d;
}
function at(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Ll(e) {
  return at(e, -32768, 32767);
}
function Wt(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function mo(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ua = (e, t, a, n) => mo(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), Rl = (e, t, a) => mo(e, a, (n) => e[n][t] >= a);
function Pl(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const $i = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Il(e, t) {
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
  }), $i.forEach((a) => {
    const n = "_onData" + go(a), o = e[a];
    Object.defineProperty(e, a, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[n] == "function" && r[n](...s);
        }), i;
      }
    });
  });
}
function Uo(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && ($i.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Si(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Mi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Di(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, Mi.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function El(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const po = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", et = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Fl = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Ol(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: m, minDefined: b, maxDefined: f } = i.getUserBounds();
    if (b) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ua(l, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ua(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const p = l.slice(0, o + 1).reverse().findIndex((y) => !Ie(y[r.axis]));
        o -= Math.max(0, p);
      }
      o = at(o, 0, n - 1);
    }
    if (f) {
      let p = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(l, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, d, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const y = l.slice(p - 1).findIndex((v) => !Ie(v[r.axis]));
        p += Math.max(0, y);
      }
      s = at(p, o, n) - o;
    } else
      s = n - o;
  }
  return {
    start: o,
    count: s
  };
}
function Vl(e) {
  const { xScale: t, yScale: a, _scaleRanges: n } = e, o = {
    xmin: t.min,
    xmax: t.max,
    ymin: a.min,
    ymax: a.max
  };
  if (!n)
    return e._scaleRanges = o, !0;
  const s = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== a.min || n.ymax !== a.max;
  return Object.assign(n, o), s;
}
const rn = (e) => e === 0 || e === 1, Yo = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ue / a)), qo = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ue / a) + 1, Va = {
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
  easeInSine: (e) => -Math.cos(e * Ze) + 1,
  easeOutSine: (e) => Math.sin(e * Ze),
  easeInOutSine: (e) => -0.5 * (Math.cos(Fe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => rn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => rn(e) ? e : Yo(e, 0.075, 0.3),
  easeOutElastic: (e) => rn(e) ? e : qo(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return rn(e) ? e : e < 0.5 ? 0.5 * Yo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * qo(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Va.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Va.easeInBounce(e * 2) * 0.5 : Va.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function bo(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Xo(e) {
  return bo(e) ? e : new ja(e);
}
function Fn(e) {
  return bo(e) ? e : new ja(e).saturate(0.5).darken(0.1).hexString();
}
const zl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Nl = [
  "color",
  "borderColor",
  "backgroundColor"
];
function jl(e) {
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
      properties: Nl
    },
    numbers: {
      type: "number",
      properties: zl
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
function Hl(e) {
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
const Go = /* @__PURE__ */ new Map();
function Wl(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = Go.get(a);
  return n || (n = new Intl.NumberFormat(e, t), Go.set(a, n)), n;
}
function vo(e, t, a) {
  return Wl(t, a).format(e);
}
const Kl = {
  values(e) {
    return Ge(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let o, s = e;
    if (a.length > 1) {
      const c = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Ul(e, a);
    }
    const i = wi(Math.abs(s)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: o,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), vo(e, n, l);
  }
};
function Ul(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Ai = {
  formatters: Kl
};
function Yl(e) {
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
      callback: Ai.formatters.values,
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
const ga = /* @__PURE__ */ Object.create(null), to = /* @__PURE__ */ Object.create(null);
function za(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let n = 0, o = a.length; n < o; ++n) {
    const s = a[n];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function On(e, t, a) {
  return typeof t == "string" ? Ha(za(e, t), a) : Ha(za(e, ""), t);
}
class ql {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => Fn(o.backgroundColor), this.hoverBorderColor = (n, o) => Fn(o.borderColor), this.hoverColor = (n, o) => Fn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return On(this, t, a);
  }
  get(t) {
    return za(this, t);
  }
  describe(t, a) {
    return On(to, t, a);
  }
  override(t, a) {
    return On(ga, t, a);
  }
  route(t, a, n, o) {
    const s = za(this, t), i = za(this, n), r = "_" + a;
    Object.defineProperties(s, {
      [r]: {
        value: s[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const l = this[r], c = i[o];
          return Te(l) ? Object.assign({}, c, l) : De(l, c);
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
var Ye = /* @__PURE__ */ new ql({
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
  jl,
  Hl,
  Yl
]);
function Xl(e) {
  return !e || Ie(e.size) || Ie(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Zo(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ia(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function Qo(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function ao(e, t, a, n) {
  Ti(e, t, a, n, null);
}
function Ti(e, t, a, n, o) {
  let s, i, r, l, c, d, h, m;
  const b = t.pointStyle, f = t.rotation, p = t.radius;
  let y = (f || 0) * $l;
  if (b && typeof b == "object" && (s = b.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(y), e.drawImage(b, -b.width / 2, -b.height / 2, b.width, b.height), e.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (e.beginPath(), b) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, p, 0, 0, Ue) : e.arc(a, n, p, 0, Ue), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : p, e.moveTo(a + Math.sin(y) * d, n - Math.cos(y) * p), y += Ho, e.lineTo(a + Math.sin(y) * d, n - Math.cos(y) * p), y += Ho, e.lineTo(a + Math.sin(y) * d, n - Math.cos(y) * p), e.closePath();
        break;
      case "rectRounded":
        c = p * 0.516, l = p - c, i = Math.cos(y + sa) * l, h = Math.cos(y + sa) * (o ? o / 2 - c : l), r = Math.sin(y + sa) * l, m = Math.sin(y + sa) * (o ? o / 2 - c : l), e.arc(a - h, n - r, c, y - Fe, y - Ze), e.arc(a + m, n - i, c, y - Ze, y), e.arc(a + h, n + r, c, y, y + Ze), e.arc(a - m, n + i, c, y + Ze, y + Fe), e.closePath();
        break;
      case "rect":
        if (!f) {
          l = Math.SQRT1_2 * p, d = o ? o / 2 : l, e.rect(a - d, n - l, 2 * d, 2 * l);
          break;
        }
        y += sa;
      /* falls through */
      case "rectRot":
        h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, m = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + m, n - i), e.lineTo(a + h, n + r), e.lineTo(a - m, n + i), e.closePath();
        break;
      case "crossRot":
        y += sa;
      /* falls through */
      case "cross":
        h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, m = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
        break;
      case "star":
        h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, m = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i), y += sa, h = Math.cos(y) * (o ? o / 2 : p), i = Math.cos(y) * p, r = Math.sin(y) * p, m = Math.sin(y) * (o ? o / 2 : p), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(y) * p, r = Math.sin(y) * p, e.moveTo(a - i, n - r), e.lineTo(a + i, n + r);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(y) * (o ? o / 2 : p), n + Math.sin(y) * p);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Ya(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function yo(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function xo(e) {
  e.restore();
}
function Gl(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function Zl(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function Ql(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ie(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Jl(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, r = t + s.actualBoundingBoxRight, l = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, d = o.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(r, d), e.stroke();
  }
}
function ec(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function qa(e, t, a, n, o, s = {}) {
  const i = Ge(t) ? t : [
    t
  ], r = s.strokeWidth > 0 && s.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = o.string, Ql(e, s), l = 0; l < i.length; ++l)
    c = i[l], s.backdrop && ec(e, s.backdrop), r && (s.strokeColor && (e.strokeStyle = s.strokeColor), Ie(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), Jl(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function $n(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Fe, Fe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Fe, Ze, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Ze, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Ze, !0), e.lineTo(a + i.topLeft, n);
}
const tc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, ac = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function nc(e, t) {
  const a = ("" + e).match(tc);
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
const oc = (e) => +e || 0;
function ko(e, t) {
  const a = {}, n = Te(t), o = n ? Object.keys(t) : t, s = Te(e) ? n ? (i) => De(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = oc(s(i));
  return a;
}
function Bi(e) {
  return ko(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ka(e) {
  return ko(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function kt(e) {
  const t = Bi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function nt(e, t) {
  e = e || {}, t = t || Ye.font;
  let a = De(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = De(e.style, t.style);
  n && !("" + n).match(ac) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: De(e.family, t.family),
    lineHeight: nc(De(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: De(e.weight, t.weight),
    string: ""
  };
  return o.string = Xl(o), o;
}
function ln(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function sc(e, t, a) {
  const { min: n, max: o } = e, s = ki(t, (o - n) / 2), i = (r, l) => a && r === 0 ? 0 : r + l;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ma(e, t) {
  return Object.assign(Object.create(e), t);
}
function _o(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Ii("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (r) => _o([
      r,
      ...e
    ], t, s, n)
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
      return Ri(r, l, () => fc(l, t, e, r));
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
      return es(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return es(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const d = r._storage || (r._storage = o());
      return r[l] = d[l] = c, delete r._keys, !0;
    }
  });
}
function wa(e, t, a, n) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Li(e, n),
    setContext: (s) => wa(e, s, a, n),
    override: (s) => wa(e.override(s), t, a, n)
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
    get(s, i, r) {
      return Ri(s, i, () => rc(s, i, r));
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
    set(s, i, r) {
      return e[i] = r, delete s[i], !0;
    }
  });
}
function Li(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: n = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: a,
    indexable: n,
    isScriptable: Jt(a) ? a : () => a,
    isIndexable: Jt(n) ? n : () => n
  };
}
const ic = (e, t) => e ? e + go(t) : t, wo = (e, t) => Te(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Ri(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function rc(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let r = n[t];
  return Jt(r) && i.isScriptable(t) && (r = lc(t, r, e, a)), Ge(r) && r.length && (r = cc(t, r, e, i.isIndexable)), wo(t, r) && (r = wa(r, o, s && s[t], i)), r;
}
function lc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(s, i || n);
  return r.delete(e), wo(e, l) && (l = Co(o._scopes, o, e, l)), l;
}
function cc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: r } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Te(t[0])) {
    const l = t, c = o._scopes.filter((d) => d !== l);
    t = [];
    for (const d of l) {
      const h = Co(c, o, e, d);
      t.push(wa(h, s, i && i[e], r));
    }
  }
  return t;
}
function Pi(e, t, a) {
  return Jt(e) ? e(t, a) : e;
}
const dc = (e, t) => e === !0 ? t : typeof e == "string" ? fa(t, e) : void 0;
function uc(e, t, a, n, o) {
  for (const s of t) {
    const i = dc(a, s);
    if (i) {
      e.add(i);
      const r = Pi(i._fallback, a, o);
      if (typeof r < "u" && r !== a && r !== n)
        return r;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function Co(e, t, a, n) {
  const o = t._rootScopes, s = Pi(t._fallback, a, n), i = [
    ...e,
    ...o
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Jo(r, i, a, s || a, n);
  return l === null || typeof s < "u" && s !== a && (l = Jo(r, i, s, l, n), l === null) ? !1 : _o(Array.from(r), [
    ""
  ], o, s, () => hc(t, a, n));
}
function Jo(e, t, a, n, o) {
  for (; a; )
    a = uc(e, t, a, n, o);
  return a;
}
function hc(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return Ge(o) && Te(a) ? a : o || {};
}
function fc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Ii(ic(s, e), a), typeof o < "u")
      return wo(e, o) ? Co(a, n, e, o) : o;
}
function Ii(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function es(e) {
  let t = e._keys;
  return t || (t = e._keys = gc(e._scopes)), t;
}
function gc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const mc = Number.EPSILON || 1e-14, Ca = (e, t) => t < e.length && !e[t].skip && e[t], Ei = (e) => e === "x" ? "y" : "x";
function pc(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, r = eo(s, o), l = eo(i, s);
  let c = r / (r + l), d = l / (r + l);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = n * c, m = n * d;
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
function bc(e, t, a) {
  const n = e.length;
  let o, s, i, r, l, c = Ca(e, 0);
  for (let d = 0; d < n - 1; ++d)
    if (l = c, c = Ca(e, d + 1), !(!l || !c)) {
      if (Oa(t[d], 0, mc)) {
        a[d] = a[d + 1] = 0;
        continue;
      }
      o = a[d] / t[d], s = a[d + 1] / t[d], r = Math.pow(o, 2) + Math.pow(s, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[d] = o * i * t[d], a[d + 1] = s * i * t[d]);
    }
}
function vc(e, t, a = "x") {
  const n = Ei(a), o = e.length;
  let s, i, r, l = Ca(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = r, r = l, l = Ca(e, c + 1), !r)
      continue;
    const d = r[a], h = r[n];
    i && (s = (d - i[a]) / 3, r[`cp1${a}`] = d - s, r[`cp1${n}`] = h - s * t[c]), l && (s = (l[a] - d) / 3, r[`cp2${a}`] = d + s, r[`cp2${n}`] = h + s * t[c]);
  }
}
function yc(e, t = "x") {
  const a = Ei(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, r, l, c = Ca(e, 0);
  for (i = 0; i < n; ++i)
    if (r = l, l = c, c = Ca(e, i + 1), !!l) {
      if (c) {
        const d = c[t] - l[t];
        o[i] = d !== 0 ? (c[a] - l[a]) / d : 0;
      }
      s[i] = r ? c ? Bt(o[i - 1]) !== Bt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  bc(e, o, s), vc(e, s, t);
}
function cn(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function xc(e, t) {
  let a, n, o, s, i, r = Ya(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = r, r = a < n - 1 && Ya(e[a + 1], t), s && (o = e[a], i && (o.cp1x = cn(o.cp1x, t.left, t.right), o.cp1y = cn(o.cp1y, t.top, t.bottom)), r && (o.cp2x = cn(o.cp2x, t.left, t.right), o.cp2y = cn(o.cp2y, t.top, t.bottom)));
}
function kc(e, t, a, n, o) {
  let s, i, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    yc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      r = e[s], l = pc(c, r, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && xc(e, a);
}
function $o() {
  return typeof window < "u" && typeof document < "u";
}
function So(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Sn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Tn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function _c(e, t) {
  return Tn(e).getPropertyValue(t);
}
const wc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ha(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = wc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Cc = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function $c(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, r, l;
  if (Cc(o, s, e.target))
    r = o, l = s;
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
function ca(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Tn(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), r = ha(o, "border", "width"), { x: l, y: c, box: d } = $c(e, a), h = i.left + (d && r.left), m = i.top + (d && r.top);
  let { width: b, height: f } = t;
  return s && (b -= i.width + r.width, f -= i.height + r.height), {
    x: Math.round((l - h) / b * a.width / n),
    y: Math.round((c - m) / f * a.height / n)
  };
}
function Sc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && So(e);
    if (!s)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), r = Tn(s), l = ha(r, "border", "width"), c = ha(r, "padding");
      t = i.width - c.width - l.width, a = i.height - c.height - l.height, n = Sn(r.maxWidth, s, "clientWidth"), o = Sn(r.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: n || Cn,
    maxHeight: o || Cn
  };
}
const Kt = (e) => Math.round(e * 10) / 10;
function Mc(e, t, a, n) {
  const o = Tn(e), s = ha(o, "margin"), i = Sn(o.maxWidth, e, "clientWidth") || Cn, r = Sn(o.maxHeight, e, "clientHeight") || Cn, l = Sc(e, t, a);
  let { width: c, height: d } = l;
  if (o.boxSizing === "content-box") {
    const m = ha(o, "border", "width"), b = ha(o, "padding");
    c -= b.width + m.width, d -= b.height + m.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, n ? c / n : d - s.height), c = Kt(Math.min(c, i, l.maxWidth)), d = Kt(Math.min(d, r, l.maxHeight)), c && !d && (d = Kt(c / 2)), (t !== void 0 || a !== void 0) && n && l.height && d > l.height && (d = l.height, c = Kt(Math.floor(d * n))), {
    width: c,
    height: d
  };
}
function ts(e, t, a) {
  const n = t || 1, o = Kt(e.height * n), s = Kt(e.width * n);
  e.height = Kt(e.height), e.width = Kt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Dc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    $o() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function as(e, t) {
  const a = _c(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function da(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Ac(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Tc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = da(e, o, a), r = da(o, s, a), l = da(s, t, a), c = da(i, r, a), d = da(r, l, a);
  return da(c, d, a);
}
const Bc = function(e, t) {
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
}, Lc = function() {
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
function _a(e, t, a) {
  return e ? Bc(t, a) : Lc();
}
function Fi(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Oi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Vi(e) {
  return e === "angle" ? {
    between: Ua,
    compare: Bl,
    normalize: _t
  } : {
    between: Wt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function ns({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function Rc(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: r } = Vi(n), l = t.length;
  let { start: c, end: d, loop: h } = e, m, b;
  if (h) {
    for (c += l, d += l, m = 0, b = l; m < b && i(r(t[c % l][n]), o, s); ++m)
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
function Pc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: r, between: l, normalize: c } = Vi(n), { start: d, end: h, loop: m, style: b } = Rc(e, t, a), f = [];
  let p = !1, y = null, v, k, w;
  const _ = () => l(o, w, v) && r(o, w) !== 0, C = () => r(s, v) === 0 || l(s, w, v), M = () => p || _(), S = () => !p || C();
  for (let P = d, I = d; P <= h; ++P)
    k = t[P % i], !k.skip && (v = c(k[n]), v !== w && (p = l(v, o, s), y === null && M() && (y = r(v, o) === 0 ? P : I), y !== null && S() && (f.push(ns({
      start: y,
      end: P,
      loop: m,
      count: i,
      style: b
    })), y = null), I = P, w = v));
  return y !== null && f.push(ns({
    start: y,
    end: h,
    loop: m,
    count: i,
    style: b
  })), f;
}
function Ic(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = Pc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function Ec(e, t, a, n) {
  let o = 0, s = t - 1;
  if (a && !n)
    for (; o < t && !e[o].skip; )
      o++;
  for (; o < t && e[o].skip; )
    o++;
  for (o %= t, a && (s += o); s > o && e[s % t].skip; )
    s--;
  return s %= t, {
    start: o,
    end: s
  };
}
function Fc(e, t, a, n) {
  const o = e.length, s = [];
  let i = t, r = e[t], l;
  for (l = t + 1; l <= a; ++l) {
    const c = e[l % o];
    c.skip || c.stop ? r.skip || (n = !1, s.push({
      start: t % o,
      end: (l - 1) % o,
      loop: n
    }), t = i = c.stop ? l : null) : (i = l, r.skip && (t = l)), r = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: n
  }), s;
}
function Oc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: r } = Ec(a, o, s, n);
  if (n === !0)
    return os(e, [
      {
        start: i,
        end: r,
        loop: s
      }
    ], a, t);
  const l = r < i ? r + o : r, c = !!e._fullLoop && i === 0 && r === o - 1;
  return os(e, Fc(a, i, l, c), a, t);
}
function os(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Vc(e, t, a, n);
}
function Vc(e, t, a, n) {
  const o = e._chart.getContext(), s = ss(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = a.length, c = [];
  let d = s, h = t[0].start, m = h;
  function b(f, p, y, v) {
    const k = r ? -1 : 1;
    if (f !== p) {
      for (f += l; a[f % l].skip; )
        f -= k;
      for (; a[p % l].skip; )
        p += k;
      f % l !== p % l && (c.push({
        start: f % l,
        end: p % l,
        loop: y,
        style: v
      }), d = v, h = p % l);
    }
  }
  for (const f of t) {
    h = r ? h : f.start;
    let p = a[h % l], y;
    for (m = h + 1; m <= f.end; m++) {
      const v = a[m % l];
      y = ss(n.setContext(ma(o, {
        type: "segment",
        p0: p,
        p1: v,
        p0DataIndex: (m - 1) % l,
        p1DataIndex: m % l,
        datasetIndex: i
      }))), zc(y, d) && b(h, m - 1, f.loop, d), p = v, d = y;
    }
    h < m - 1 && b(h, m - 1, f.loop, d);
  }
  return c;
}
function ss(e) {
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
function zc(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return bo(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function dn(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Nc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: dn(a, t, "left"),
    right: dn(a, t, "right"),
    top: dn(n, t, "top"),
    bottom: dn(n, t, "bottom")
  } : t;
}
function jc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = Nc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Hc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, a, n, o) {
    const s = a.listeners[o], i = a.duration;
    s.forEach((r) => r({
      chart: t,
      initial: a.initial,
      numSteps: i,
      currentStep: Math.min(n - a.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Mi.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let a = 0;
    this._charts.forEach((n, o) => {
      if (!n.running || !n.items.length)
        return;
      const s = n.items;
      let i = s.length - 1, r = !1, l;
      for (; i >= 0; --i)
        l = s[i], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(t), r = !0) : (s[i] = s[s.length - 1], s.pop());
      r && (o.draw(), this._notify(o, n, t, "progress")), s.length || (n.running = !1, this._notify(o, n, t, "complete"), n.initial = !1), a += s.length;
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
    a && (a.running = !0, a.start = Date.now(), a.duration = a.items.reduce((n, o) => Math.max(n, o._duration), 0), this._refresh());
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
    let o = n.length - 1;
    for (; o >= 0; --o)
      n[o].cancel();
    a.items = [], this._notify(t, a, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Pt = /* @__PURE__ */ new Hc();
const is = "transparent", Wc = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = Xo(e || is), o = n.valid && Xo(t || is);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Kc {
  constructor(t, a, n, o) {
    const s = a[n];
    o = ln([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = ln([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || Wc[t.type || typeof i], this._easing = Va[t.easing] || Va.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, n) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = n - this._start, i = this._duration - s;
      this._start = n, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = ln([
        t.to,
        a,
        o,
        t.from
      ]), this._from = ln([
        t.from,
        o,
        a
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const a = t - this._start, n = this._duration, o = this._prop, s = this._from, i = this._loop, r = this._to;
    let l;
    if (this._active = s !== r && (i || a < n), !this._active) {
      this._target[o] = r, this._notify(!0);
      return;
    }
    if (a < 0) {
      this._target[o] = s;
      return;
    }
    l = a / n % 2, l = i && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[o] = this._fn(s, r, l);
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
    for (let o = 0; o < n.length; o++)
      n[o][a]();
  }
}
class zi {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!Te(t))
      return;
    const a = Object.keys(Ye.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Te(s))
        return;
      const i = {};
      for (const r of a)
        i[r] = s[r];
      (Ge(s.properties) && s.properties || [
        o
      ]).forEach((r) => {
        (r === o || !n.has(r)) && n.set(r, i);
      });
    });
  }
  _animateOptions(t, a) {
    const n = a.options, o = Yc(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && Uc(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), s;
  }
  _createAnimations(t, a) {
    const n = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(a), r = Date.now();
    let l;
    for (l = i.length - 1; l >= 0; --l) {
      const c = i[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, a));
        continue;
      }
      const d = a[c];
      let h = s[c];
      const m = n.get(c);
      if (h)
        if (m && h.active()) {
          h.update(m, d, r);
          continue;
        } else
          h.cancel();
      if (!m || !m.duration) {
        t[c] = d;
        continue;
      }
      s[c] = h = new Kc(m, t, c, d), o.push(h);
    }
    return o;
  }
  update(t, a) {
    if (this._properties.size === 0) {
      Object.assign(t, a);
      return;
    }
    const n = this._createAnimations(t, a);
    if (n.length)
      return Pt.add(this._chart, n), !0;
  }
}
function Uc(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function Yc(e, t) {
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
function rs(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function qc(e, t, a) {
  if (a === !1)
    return !1;
  const n = rs(e, a), o = rs(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function Xc(e) {
  let t, a, n, o;
  return Te(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function Ni(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function ls(e, t, a, n = {}) {
  const o = e.keys, s = n.mode === "single";
  let i, r, l, c;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, r = o.length; i < r; ++i) {
    if (l = +o[i], l === a) {
      if (d = !0, n.all)
        continue;
      break;
    }
    c = e.values[l], xt(c) && (s || t === 0 || Bt(t) === Bt(c)) && (t += c);
  }
  return !d && !n.all ? 0 : t;
}
function Gc(e, t) {
  const { iScale: a, vScale: n } = t, o = a.axis === "x" ? "x" : "y", s = n.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, c, d;
  for (l = 0, c = i.length; l < c; ++l)
    d = i[l], r[l] = {
      [o]: d,
      [s]: e[d]
    };
  return r;
}
function Vn(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function Zc(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function Qc(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function Jc(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function cs(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function ds(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: r } = n, l = s.axis, c = i.axis, d = Zc(s, i, n), h = t.length;
  let m;
  for (let b = 0; b < h; ++b) {
    const f = t[b], { [l]: p, [c]: y } = f, v = f._stacks || (f._stacks = {});
    m = v[c] = Jc(o, d, p), m[r] = y, m._top = cs(m, i, !0, n.type), m._bottom = cs(m, i, !1, n.type);
    const k = m._visualValues || (m._visualValues = {});
    k[r] = y;
  }
}
function zn(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function ed(e, t) {
  return ma(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function td(e, t, a) {
  return ma(e, {
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
function Sa(e, t) {
  const a = e.controller.index, n = e.vScale && e.vScale.axis;
  if (n) {
    t = t || e._parsed;
    for (const o of t) {
      const s = o._stacks;
      if (!s || s[n] === void 0 || s[n][a] === void 0)
        return;
      delete s[n][a], s[n]._visualValues !== void 0 && s[n]._visualValues[a] !== void 0 && delete s[n]._visualValues[a];
    }
  }
}
const Nn = (e) => e === "reset" || e === "none", us = (e, t) => t ? e : Object.assign({}, e), ad = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Ni(a, !0),
  values: null
};
class Bn {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Vn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Sa(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (h, m, b, f) => h === "x" ? m : h === "r" ? f : b, s = a.xAxisID = De(n.xAxisID, zn(t, "x")), i = a.yAxisID = De(n.yAxisID, zn(t, "y")), r = a.rAxisID = De(n.rAxisID, zn(t, "r")), l = a.indexAxis, c = a.iAxisID = o(l, s, i, r), d = a.vAxisID = o(l, i, s, r);
    a.xScale = this.getScaleForId(s), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(r), a.iScale = this.getScaleForId(c), a.vScale = this.getScaleForId(d);
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
    this._data && Uo(this._data, this), t._stacked && Sa(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Te(a)) {
      const o = this._cachedMeta;
      this._data = Gc(a, o);
    } else if (n !== a) {
      if (n) {
        Uo(n, this);
        const o = this._cachedMeta;
        Sa(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && Il(a, this), this._syncList = [], this._data = a;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const a = this._cachedMeta, n = this.getDataset();
    let o = !1;
    this._dataCheck();
    const s = a._stacked;
    a._stacked = Vn(a.vScale, a), a.stack !== n.stack && (o = !0, Sa(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (ds(this, a._parsed), a._stacked = Vn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, r = s.axis;
    let l = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], d, h, m;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, m = o;
    else {
      Ge(o[t]) ? m = this.parseArrayData(n, o, t, a) : Te(o[t]) ? m = this.parseObjectData(n, o, t, a) : m = this.parsePrimitiveData(n, o, t, a);
      const b = () => h[r] === null || c && h[r] < c[r];
      for (d = 0; d < a; ++d)
        n._parsed[d + t] = h = m[d], l && (b() && (l = !1), c = h);
      n._sorted = l;
    }
    i && ds(this, m);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, r = s.axis, l = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let m, b, f;
    for (m = 0, b = o; m < b; ++m)
      f = m + n, h[m] = {
        [r]: d || s.parse(c[f], f),
        [l]: i.parse(a[f], f)
      };
    return h;
  }
  parseArrayData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, r = new Array(o);
    let l, c, d, h;
    for (l = 0, c = o; l < c; ++l)
      d = l + n, h = a[d], r[l] = {
        x: s.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return r;
  }
  parseObjectData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(o);
    let d, h, m, b;
    for (d = 0, h = o; d < h; ++d)
      m = d + n, b = a[m], c[d] = {
        x: s.parse(fa(b, r), m),
        y: i.parse(fa(b, l), m)
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
    const o = this.chart, s = this._cachedMeta, i = a[t.axis], r = {
      keys: Ni(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return ls(r, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const r = o && n._stacks[a.axis];
    o && r && (o.values = r, i = ls(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, r = this._getOtherScale(t), l = ad(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Qc(r);
    let m, b;
    function f() {
      b = o[m];
      const p = b[r.axis];
      return !xt(b[t.axis]) || d > p || h < p;
    }
    for (m = 0; m < i && !(!f() && (this.updateRangeFromParsed(c, t, b, l), s)); ++m)
      ;
    if (s) {
      for (m = i - 1; m >= 0; --m)
        if (!f()) {
          this.updateRangeFromParsed(c, t, b, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, n = [];
    let o, s, i;
    for (o = 0, s = a.length; o < s; ++o)
      i = a[o][t.axis], xt(i) && n.push(i);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = a.iScale, o = a.vScale, s = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(s[n.axis]) : "",
      value: o ? "" + o.getLabelForValue(s[o.axis]) : ""
    };
  }
  _update(t) {
    const a = this._cachedMeta;
    this.update(t || "default"), a._clip = Xc(De(this.options.clip, qc(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, n = this._cachedMeta, o = n.data || [], s = a.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || o.length - r, c = this.options.drawActiveElementsOnTop;
    let d;
    for (n.dataset && n.dataset.draw(t, s, r, l), d = r; d < r + l; ++d) {
      const h = o[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, s));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(t, s);
  }
  getStyle(t, a) {
    const n = a ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, a, n) {
    const o = this.getDataset();
    let s;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      s = i.$context || (i.$context = td(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = ed(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!a, s.mode = n, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", n) {
    const o = a === "active", s = this._cachedDataOpts, i = t + "-" + a, r = s[i], l = this.enableOptionSharing && Wa(n);
    if (r)
      return us(r, l);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), d), b = Object.keys(Ye.elements[t]), f = () => this.getContext(n, o, a), p = c.resolveNamedOptions(m, b, f, h);
    return p.$shared && (p.$shared = l, s[i] = Object.freeze(us(p, l))), p;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, r = s[i];
    if (r)
      return r;
    let l;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, a), m = d.getOptionScopes(this.getDataset(), h);
      l = d.createResolver(m, this.getContext(t, n, a));
    }
    const c = new zi(o, l && l.animations);
    return l && l._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || Nn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    Nn(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !Nn(a) && this._resolveAnimations(void 0, a).update(t, n);
  }
  _setStyle(t, a, n, o) {
    t.active = o;
    const s = this.getStyle(a, o);
    this._resolveAnimations(a, n, o).update(t, {
      options: !o && this.getSharedOptions(s) || s
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
    const o = n.length, s = a.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, a, n = !0) {
    const o = this._cachedMeta, s = o.data, i = t + a;
    let r;
    const l = (c) => {
      for (c.length += a, r = c.length - 1; r >= i; r--)
        c[r] = c[r - a];
    };
    for (l(s), r = t; r < i; ++r)
      s[r] = new this.dataElementType();
    this._parsing && l(o._parsed), this.parse(t, a), n && this.updateElements(s, t, a, "reset");
  }
  updateElements(t, a, n, o) {
  }
  _removeElements(t, a) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const o = n._parsed.splice(t, a);
      n._stacked && Sa(n, o);
    }
    n.data.splice(t, a);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [a, n, o] = t;
      this[a](n, o);
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
function nd(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = Si(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function od(e) {
  const t = e.iScale, a = nd(t, e.type);
  let n = t._length, o, s, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (Wa(r) && (n = Math.min(n, Math.abs(i - r) || n)), r = i);
  };
  for (o = 0, s = a.length; o < s; ++o)
    i = t.getPixelForValue(a[o]), l();
  for (r = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), l();
  return n;
}
function sd(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Ie(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function id(e, t, a, n) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, r = e < o.length - 1 ? o[e + 1] : null;
  const l = a.categoryPercentage;
  i === null && (i = s - (r === null ? t.end - t.start : r - s)), r === null && (r = s + s - i);
  const c = s - (s - Math.min(i, r)) / 2 * l;
  return {
    chunk: Math.abs(r - i) / 2 * l / n,
    ratio: a.barPercentage,
    start: c
  };
}
function rd(e, t, a, n) {
  const o = a.parse(e[0], n), s = a.parse(e[1], n), i = Math.min(o, s), r = Math.max(o, s);
  let l = i, c = r;
  Math.abs(i) > Math.abs(r) && (l = r, c = i), t[a.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: r
  };
}
function ji(e, t, a, n) {
  return Ge(e) ? rd(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function hs(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), r = o === s, l = [];
  let c, d, h, m;
  for (c = a, d = a + n; c < d; ++c)
    m = t[c], h = {}, h[o.axis] = r || o.parse(i[c], c), l.push(ji(m, h, s, c));
  return l;
}
function jn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function ld(e, t, a) {
  return e !== 0 ? Bt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function cd(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function dd(e, t, a, n) {
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
  const { start: i, end: r, reverse: l, top: c, bottom: d } = cd(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = d : (s[fs(d, i, r, l)] = !0, o = c)), s[fs(o, i, r, l)] = !0, e.borderSkipped = s;
}
function fs(e, t, a, n) {
  return n ? (e = ud(e, t, a), e = gs(e, a, t)) : e = gs(e, t, a), e;
}
function ud(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function gs(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function hd(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class fd extends Bn {
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
  parsePrimitiveData(t, a, n, o) {
    return hs(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return hs(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = s.axis === "x" ? r : l, d = i.axis === "x" ? r : l, h = [];
    let m, b, f, p;
    for (m = n, b = n + o; m < b; ++m)
      p = a[m], f = {}, f[s.axis] = s.parse(fa(p, c), m), h.push(ji(fa(p, d), f, i, m));
    return h;
  }
  updateRangeFromParsed(t, a, n, o) {
    super.updateRangeFromParsed(t, a, n, o);
    const s = n._custom;
    s && a === this._cachedMeta.vScale && (t.min = Math.min(t.min, s.min), t.max = Math.max(t.max, s.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, r = jn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + n.getLabelForValue(s[n.axis]),
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
  updateElements(t, a, n, o) {
    const s = o === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: m } = this._getSharedOptions(a, o);
    for (let b = a; b < a + n; b++) {
      const f = this.getParsed(b), p = s || Ie(f[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(b), y = this._calculateBarIndexPixels(b, d), v = (f._stacks || {})[r.axis], k = {
        horizontal: c,
        base: p.base,
        enableBorderRadius: !v || jn(f._custom) || i === v._top || i === v._bottom,
        x: c ? p.head : y.center,
        y: c ? y.center : p.head,
        height: c ? y.size : Math.abs(p.size),
        width: c ? Math.abs(p.size) : y.size
      };
      m && (k.options = h || this.resolveDataElementOptions(b, t[b].active ? "active" : o));
      const w = k.options || t[b].options;
      dd(k, w, v, i), hd(k, w, d.ratio), this.updateElement(t[b], b, k, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = n.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), l = r && r[n.axis], c = (d) => {
      const h = d._parsed.find((b) => b[n.axis] === l), m = h && h[d.vScale.axis];
      if (Ie(m) || isNaN(m))
        return !0;
    };
    for (const d of o)
      if (!(a !== void 0 && c(d)) && ((s === !1 || i.indexOf(d.stack) === -1 || s === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
      t[De(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, a)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, a, n) {
    const o = this._getStacks(t, n), s = a !== void 0 ? o.indexOf(a) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const t = this.options, a = this._cachedMeta, n = a.iScale, o = [];
    let s, i;
    for (s = 0, i = a.data.length; s < i; ++s)
      o.push(n.getPixelForValue(this.getParsed(s)[n.axis], s));
    const r = t.barThickness;
    return {
      min: r || od(a),
      pixels: o,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, r = s || 0, l = this.getParsed(t), c = l._custom, d = jn(c);
    let h = l[a.axis], m = 0, b = n ? this.applyStack(a, l, n) : h, f, p;
    b !== h && (m = b - h, b = h), d && (h = c.barStart, b = c.barEnd - c.barStart, h !== 0 && Bt(h) !== Bt(c.barEnd) && (m = 0), m += h);
    const y = !Ie(s) && !d ? s : m;
    let v = a.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? f = a.getPixelForValue(m + b) : f = v, p = f - v, Math.abs(p) < i) {
      p = ld(p, a, r) * i, h === r && (v -= p / 2);
      const k = a.getPixelForDecimal(0), w = a.getPixelForDecimal(1), _ = Math.min(k, w), C = Math.max(k, w);
      v = Math.max(Math.min(v, C), _), f = v + p, n && !d && (l._stacks[a.axis]._visualValues[o] = a.getValueForPixel(f) - a.getValueForPixel(v));
    }
    if (v === a.getPixelForValue(r)) {
      const k = Bt(p) * a.getLineWidthForValue(r) / 2;
      v += k, p -= k;
    }
    return {
      size: p,
      base: v,
      head: f,
      center: f + p / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = De(o.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (a.grouped) {
      const d = s ? this._getStackCount(t) : a.stackCount, h = o.barThickness === "flex" ? id(t, a, o, d * c) : sd(t, a, o, d * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, b = this._getAxis().indexOf(De(m, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + b;
      r = h.start + h.chunk * f + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
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
    const t = this._cachedMeta, a = t.vScale, n = t.data, o = n.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[a.axis] !== null && !n[s].hidden && n[s].draw(this._ctx);
  }
}
function gd(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < Ue) {
    const r = e, l = r + t, c = Math.cos(r), d = Math.sin(r), h = Math.cos(l), m = Math.sin(l), b = (w, _, C) => Ua(w, r, l, !0) ? 1 : Math.max(_, _ * a, C, C * a), f = (w, _, C) => Ua(w, r, l, !0) ? -1 : Math.min(_, _ * a, C, C * a), p = b(0, c, h), y = b(Ze, d, m), v = f(Fe, c, h), k = f(Fe + Ze, d, m);
    n = (p - v) / 2, o = (y - k) / 2, s = -(p + v) / 2, i = -(y + k) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class md extends Bn {
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
            const a = t.data, { labels: { pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return a.labels.length && a.datasets.length ? a.labels.map((l, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: h.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: o,
                pointStyle: n,
                borderRadius: i && (r || h.borderRadius),
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
    const n = this.getDataset().data, o = this._cachedMeta;
    if (this._parsing === !1)
      o._parsed = n;
    else {
      let s = (l) => +n[l];
      if (Te(n[t])) {
        const { key: l = "value" } = this._parsing;
        s = (c) => +fa(n[c], l);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return Ft(this.options.rotation - 90);
  }
  _getCircumference() {
    return Ft(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ue, a = -Ue;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const o = this.chart.getDatasetMeta(n).controller, s = o._getRotation(), i = o._getCircumference();
        t = Math.min(t, s), a = Math.max(a, s + i);
      }
    return {
      rotation: t,
      circumference: a - t
    };
  }
  update(t) {
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - i) / 2, 0), l = Math.min(vl(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: m, ratioY: b, offsetX: f, offsetY: p } = gd(h, d, l), y = (n.width - i) / m, v = (n.height - i) / b, k = Math.max(Math.min(y, v) / 2, 0), w = ki(this.options.radius, k), _ = Math.max(w * l, 0), C = (w - _) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * w, this.offsetY = p * w, o.total = this.calculateTotal(), this.outerRadius = w - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, d = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, m = s && c.animateScale, b = m ? 0 : this.innerRadius, f = m ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: y } = this._getSharedOptions(a, o);
    let v = this._getRotation(), k;
    for (k = 0; k < a; ++k)
      v += this._circumference(k, s);
    for (k = a; k < a + n; ++k) {
      const w = this._circumference(k, s), _ = t[k], C = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: v,
        endAngle: v + w,
        circumference: w,
        outerRadius: f,
        innerRadius: b
      };
      y && (C.options = p || this.resolveDataElementOptions(k, _.active ? "active" : o)), v += w, this.updateElement(_, k, C, o);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, a = t.data;
    let n = 0, o;
    for (o = 0; o < a.length; o++) {
      const s = t._parsed[o];
      s !== null && !isNaN(s) && this.chart.getDataVisibility(o) && !a[o].hidden && (n += Math.abs(s));
    }
    return n;
  }
  calculateCircumference(t) {
    const a = this._cachedMeta.total;
    return a > 0 && !isNaN(t) ? Ue * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = vo(a._parsed[t], n.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let a = 0;
    const n = this.chart;
    let o, s, i, r, l;
    if (!t) {
      for (o = 0, s = n.data.datasets.length; o < s; ++o)
        if (n.isDatasetVisible(o)) {
          i = n.getDatasetMeta(o), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (o = 0, s = t.length; o < s; ++o)
      l = r.resolveDataElementOptions(o), l.borderAlign !== "inner" && (a = Math.max(a, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return a;
  }
  getMaxOffset(t) {
    let a = 0;
    for (let n = 0, o = t.length; n < o; ++n) {
      const s = this.resolveDataElementOptions(n);
      a = Math.max(a, s.offset || 0, s.hoverOffset || 0);
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
    return Math.max(De(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class pd extends Bn {
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
    const a = this._cachedMeta, { dataset: n, data: o = [], _dataset: s } = a, i = this.chart._animationsDisabled;
    let { start: r, count: l } = Ol(a, o, i);
    this._drawStart = r, this._drawCount = l, Vl(a) && (r = 0, l = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, r, l, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(a, o), m = i.axis, b = r.axis, { spanGaps: f, segment: p } = this.options, y = Ka(f) ? f : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || s || o === "none", k = a + n, w = t.length;
    let _ = a > 0 && this.getParsed(a - 1);
    for (let C = 0; C < w; ++C) {
      const M = t[C], S = v ? M : {};
      if (C < a || C >= k) {
        S.skip = !0;
        continue;
      }
      const P = this.getParsed(C), I = Ie(P[b]), V = S[m] = i.getPixelForValue(P[m], C), D = S[b] = s || I ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, P, l) : P[b], C);
      S.skip = isNaN(V) || isNaN(D) || I, S.stop = C > 0 && Math.abs(P[m] - _[m]) > y, p && (S.parsed = P, S.raw = c.data[C]), h && (S.options = d || this.resolveDataElementOptions(C, M.active ? "active" : o)), v || this.updateElement(M, C, S, o), _ = P;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, a = t.dataset, n = a.options && a.options.borderWidth || 0, o = t.data || [];
    if (!o.length)
      return n;
    const s = o[0].size(this.resolveDataElementOptions(0)), i = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
    return Math.max(n, s, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class bd extends md {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function ra() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Mo {
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
    Object.assign(Mo.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ra();
  }
  parse() {
    return ra();
  }
  format() {
    return ra();
  }
  add() {
    return ra();
  }
  diff() {
    return ra();
  }
  startOf() {
    return ra();
  }
  endOf() {
    return ra();
  }
}
var vd = {
  _date: Mo
};
function yd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, r = o._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && s.length) {
    const c = r._reversePixels ? Rl : ua;
    if (n) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const m = c(s, t, a - h), b = c(s, t, a + h);
          return {
            lo: m.lo,
            hi: b.hi
          };
        }
      }
    } else {
      const d = c(s, t, a);
      if (l) {
        const { vScale: h } = o._cachedMeta, { _parsed: m } = e, b = m.slice(0, d.lo + 1).reverse().findIndex((p) => !Ie(p[h.axis]));
        d.lo -= Math.max(0, b);
        const f = m.slice(d.hi).findIndex((p) => !Ie(p[h.axis]));
        d.hi += Math.max(0, f);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function Ln(e, t, a, n, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, l = s.length; r < l; ++r) {
    const { index: c, data: d } = s[r], { lo: h, hi: m } = yd(s[r], t, i, o);
    for (let b = h; b <= m; ++b) {
      const f = d[b];
      f.skip || n(f, c, b);
    }
  }
}
function xd(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, o) {
    const s = t ? Math.abs(n.x - o.x) : 0, i = a ? Math.abs(n.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Hn(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || Ln(e, a, t, function(r, l, c) {
    !o && !Ya(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && s.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), s;
}
function kd(e, t, a, n) {
  let o = [];
  function s(i, r, l) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: h } = Ci(i, {
      x: t.x,
      y: t.y
    });
    Ua(h, c, d) && o.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Ln(e, a, t, s), o;
}
function _d(e, t, a, n, o, s) {
  let i = [];
  const r = xd(a);
  let l = Number.POSITIVE_INFINITY;
  function c(d, h, m) {
    const b = d.inRange(t.x, t.y, o);
    if (n && !b)
      return;
    const f = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(f)) && !b)
      return;
    const y = r(t, f);
    y < l ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: m
      }
    ], l = y) : y === l && i.push({
      element: d,
      datasetIndex: h,
      index: m
    });
  }
  return Ln(e, a, t, c), i;
}
function Wn(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? kd(e, t, a, o) : _d(e, t, a, n, o, s);
}
function ms(e, t, a, n, o) {
  const s = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Ln(e, a, t, (l, c, d) => {
    l[i] && l[i](t[a], o) && (s.push({
      element: l,
      datasetIndex: c,
      index: d
    }), r = r || l.inRange(t.x, t.y, o));
  }), n && !r ? [] : s;
}
var wd = {
  modes: {
    index(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? Hn(e, o, s, n, i) : Wn(e, o, s, !1, n, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = r[0].index, h = c.data[d];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: c.index,
          index: d
        });
      }), l) : [];
    },
    dataset(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? Hn(e, o, s, n, i) : Wn(e, o, s, !1, n, i);
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
    point(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Hn(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Wn(e, o, s, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const o = ca(t, e);
      return ms(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = ca(t, e);
      return ms(e, o, "y", a.intersect, n);
    }
  }
};
const Hi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ma(e, t) {
  return e.filter((a) => a.pos === t);
}
function ps(e, t) {
  return e.filter((a) => Hi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Da(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Cd(e) {
  const t = [];
  let a, n, o, s, i, r;
  for (a = 0, n = (e || []).length; a < n; ++a)
    o = e[a], { position: s, options: { stack: i, stackWeight: r = 1 } } = o, t.push({
      index: a,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: r
    });
  return t;
}
function $d(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !Hi.includes(o))
      continue;
    const i = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += s;
  }
  return t;
}
function Sd(e, t) {
  const a = $d(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, r;
  for (s = 0, i = e.length; s < i; ++s) {
    r = e[s];
    const { fullSize: l } = r.box, c = a[r.stack], d = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = d ? d * n : l && t.availableWidth, r.height = o) : (r.width = n, r.height = d ? d * o : l && t.availableHeight);
  }
  return a;
}
function Md(e) {
  const t = Cd(e), a = Da(t.filter((c) => c.box.fullSize), !0), n = Da(Ma(t, "left"), !0), o = Da(Ma(t, "right")), s = Da(Ma(t, "top"), !0), i = Da(Ma(t, "bottom")), r = ps(t, "x"), l = ps(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(l).concat(i).concat(r),
    chartArea: Ma(t, "chartArea"),
    vertical: n.concat(o).concat(l),
    horizontal: s.concat(i).concat(r)
  };
}
function bs(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function Wi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Dd(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Te(o)) {
    a.size && (e[o] -= a.size);
    const h = n[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? s.height : s.width), a.size = h.size / h.count, e[o] += a.size;
  }
  s.getPadding && Wi(i, s.getPadding());
  const r = Math.max(0, t.outerWidth - bs(i, e, "left", "right")), l = Math.max(0, t.outerHeight - bs(i, e, "top", "bottom")), c = r !== e.w, d = l !== e.h;
  return e.w = r, e.h = l, a.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function Ad(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Td(e, t) {
  const a = t.maxPadding;
  function n(o) {
    const s = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return o.forEach((i) => {
      s[i] = Math.max(t[i], a[i]);
    }), s;
  }
  return n(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Ia(e, t, a, n) {
  const o = [];
  let s, i, r, l, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    r = e[s], l = r.box, l.update(r.width || t.w, r.height || t.h, Td(r.horizontal, t));
    const { same: h, other: m } = Dd(t, a, r, n);
    c |= h && o.length, d = d || m, l.fullSize || o.push(r);
  }
  return c && Ia(o, t, a, n) || d;
}
function un(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function vs(e, t, a, n) {
  const o = a.padding;
  let { x: s, y: i } = t;
  for (const r of e) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, d = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const h = t.w * d, m = c.size || l.height;
      Wa(c.start) && (i = c.start), l.fullSize ? un(l, o.left, i, a.outerWidth - o.right - o.left, m) : un(l, t.left + c.placed, i, h, m), c.start = i, c.placed += h, i = l.bottom;
    } else {
      const h = t.h * d, m = c.size || l.width;
      Wa(c.start) && (s = c.start), l.fullSize ? un(l, s, o.top, m, a.outerHeight - o.bottom - o.top) : un(l, s, t.top + c.placed, m, h), c.start = s, c.placed += h, s = l.right;
    }
  }
  t.x = s, t.y = i;
}
var yt = {
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
    const o = kt(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), r = Md(e.boxes), l = r.vertical, c = r.horizontal;
    Ee(e.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const d = l.reduce((p, y) => y.box.options && y.box.options.display === !1 ? p : p + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), m = Object.assign({}, o);
    Wi(m, kt(n));
    const b = Object.assign({
      maxPadding: m,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), f = Sd(l.concat(c), h);
    Ia(r.fullSize, b, h, f), Ia(l, b, h, f), Ia(c, b, h, f) && Ia(l, b, h, f), Ad(b), vs(r.leftAndTop, b, h, f), b.x += b.w, b.y += b.h, vs(r.rightAndBottom, b, h, f), e.chartArea = {
      left: b.left,
      top: b.top,
      right: b.left + b.w,
      bottom: b.top + b.h,
      height: b.h,
      width: b.w
    }, Ee(r.chartArea, (p) => {
      const y = p.box;
      Object.assign(y, e.chartArea), y.update(b.w, b.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Ki {
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
  getMaximumSize(t, a, n, o) {
    return a = Math.max(0, a || t.width), n = n || t.height, {
      width: a,
      height: Math.max(0, o ? Math.floor(a / o) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Bd extends Ki {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const xn = "$chartjs", Ld = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ys = (e) => e === null || e === "";
function Rd(e, t) {
  const a = e.style, n = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[xn] = {
    initial: {
      height: n,
      width: o,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", ys(o)) {
    const s = as(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (ys(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = as(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const Ui = Dc ? {
  passive: !0
} : !1;
function Pd(e, t, a) {
  e && e.addEventListener(t, a, Ui);
}
function Id(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, Ui);
}
function Ed(e, t) {
  const a = Ld[e.type] || e.type, { x: n, y: o } = ca(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: o !== void 0 ? o : null
  };
}
function Mn(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Fd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || Mn(r.addedNodes, n), i = i && !Mn(r.removedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Od(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || Mn(r.removedNodes, n), i = i && !Mn(r.addedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Xa = /* @__PURE__ */ new Map();
let xs = 0;
function Yi() {
  const e = window.devicePixelRatio;
  e !== xs && (xs = e, Xa.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Vd(e, t) {
  Xa.size || window.addEventListener("resize", Yi), Xa.set(e, t);
}
function zd(e) {
  Xa.delete(e), Xa.size || window.removeEventListener("resize", Yi);
}
function Nd(e, t, a) {
  const n = e.canvas, o = n && So(n);
  if (!o)
    return;
  const s = Di((r, l) => {
    const c = o.clientWidth;
    a(r, l), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, d = l.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), Vd(e, s), i;
}
function Kn(e, t, a) {
  a && a.disconnect(), t === "resize" && zd(e);
}
function jd(e, t, a) {
  const n = e.canvas, o = Di((s) => {
    e.ctx !== null && a(Ed(s, e));
  }, e);
  return Pd(n, t, o), o;
}
class Hd extends Ki {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Rd(t, a), n) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[xn])
      return !1;
    const n = a[xn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = n[s];
      Ie(i) ? a.removeAttribute(s) : a.setAttribute(s, i);
    });
    const o = n.style || {};
    return Object.keys(o).forEach((s) => {
      a.style[s] = o[s];
    }), a.width = a.width, delete a[xn], !0;
  }
  addEventListener(t, a, n) {
    this.removeEventListener(t, a);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: Fd,
      detach: Od,
      resize: Nd
    }[a] || jd;
    o[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), o = n[a];
    if (!o)
      return;
    ({
      attach: Kn,
      detach: Kn,
      resize: Kn
    }[a] || Id)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return Mc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && So(t);
    return !!(a && a.isConnected);
  }
}
function Wd(e) {
  return !$o() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Bd : Hd;
}
let zt = class {
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
    return Ka(this.x) && Ka(this.y);
  }
  getProps(t, a) {
    const n = this.$animations;
    if (!a || !n)
      return this;
    const o = {};
    return t.forEach((s) => {
      o[s] = n[s] && n[s].active() ? n[s]._to : this[s];
    }), o;
  }
};
function Kd(e, t) {
  const a = e.options.ticks, n = Ud(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? qd(t) : [], i = s.length, r = s[0], l = s[i - 1], c = [];
  if (i > o)
    return Xd(t, c, s, i / o), c;
  const d = Yd(s, t, o);
  if (i > 0) {
    let h, m;
    const b = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (hn(t, c, d, Ie(b) ? 0 : r - b, r), h = 0, m = i - 1; h < m; h++)
      hn(t, c, d, s[h], s[h + 1]);
    return hn(t, c, d, l, Ie(b) ? t.length : l + b), c;
  }
  return hn(t, c, d), c;
}
function Ud(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function Yd(e, t, a) {
  const n = Gd(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = Sl(n);
  for (let i = 0, r = s.length - 1; i < r; i++) {
    const l = s[i];
    if (l > o)
      return l;
  }
  return Math.max(o, 1);
}
function qd(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function Xd(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function hn(e, t, a, n, o) {
  const s = De(n, 0), i = Math.min(De(o, e.length), e.length);
  let r = 0, l, c, d;
  for (a = Math.ceil(a), o && (l = o - n, a = l / Math.floor(l / a)), d = s; d < 0; )
    r++, d = Math.round(s + r * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), r++, d = Math.round(s + r * a));
}
function Gd(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const Zd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ks = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, _s = (e, t) => Math.min(t || e, e);
function ws(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function Qd(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(l - s, i - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(o - 1)) / 2, l += o < t ? c : -c, l < s - r || l > i + r)))
    return l;
}
function Jd(e, t) {
  Ee(e, (a) => {
    const n = a.gc, o = n.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete a.data[n[s]];
      n.splice(0, o);
    }
  });
}
function Aa(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Cs(e, t) {
  if (!e.display)
    return 0;
  const a = nt(e.font, t), n = kt(e.padding);
  return (Ge(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function eu(e, t) {
  return ma(e, {
    scale: t,
    type: "scale"
  });
}
function tu(e, t, a) {
  return ma(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function au(e, t, a) {
  let n = po(e);
  return (a && t !== "right" || !a && t === "right") && (n = Zd(n)), n;
}
function nu(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: r, chart: l } = e, { chartArea: c, scales: d } = l;
  let h = 0, m, b, f;
  const p = i - o, y = r - s;
  if (e.isHorizontal()) {
    if (b = et(n, s, r), Te(a)) {
      const v = Object.keys(a)[0], k = a[v];
      f = d[v].getPixelForValue(k) + p - t;
    } else a === "center" ? f = (c.bottom + c.top) / 2 + p - t : f = ks(e, a, t);
    m = r - s;
  } else {
    if (Te(a)) {
      const v = Object.keys(a)[0], k = a[v];
      b = d[v].getPixelForValue(k) - y + t;
    } else a === "center" ? b = (c.left + c.right) / 2 - y + t : b = ks(e, a, t);
    f = et(n, i, o), h = a === "left" ? -Ze : Ze;
  }
  return {
    titleX: b,
    titleY: f,
    maxWidth: m,
    rotation: h
  };
}
class $a extends zt {
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
    let { _userMin: t, _userMax: a, _suggestedMin: n, _suggestedMax: o } = this;
    return t = Dt(t, Number.POSITIVE_INFINITY), a = Dt(a, Number.NEGATIVE_INFINITY), n = Dt(n, Number.POSITIVE_INFINITY), o = Dt(o, Number.NEGATIVE_INFINITY), {
      min: Dt(t, n),
      max: Dt(a, o),
      minDefined: xt(t),
      maxDefined: xt(a)
    };
  }
  getMinMax(t) {
    let { min: a, max: n, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: a,
        max: n
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      i = r[l].controller.getMinMax(this, t), o || (a = Math.min(a, i.min)), s || (n = Math.max(n, i.max));
    return a = s && a > n ? n : a, n = o && a > n ? a : n, {
      min: Dt(a, Dt(n, a)),
      max: Dt(n, Dt(a, n))
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
    Ve(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, a, n) {
    const { beginAtZero: o, grace: s, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = sc(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? ws(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Kd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Ve(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Ve(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Ve(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Ve(this.options[t], [
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
    Ve(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let n, o, s;
    for (n = 0, o = t.length; n < o; n++)
      s = t[n], s.label = Ve(a.callback, [
        s.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Ve(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Ve(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, n = _s(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, r, l, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, m = d.highest.height, b = at(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : b / (n - 1), h + 6 > r && (r = b / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - Aa(t.grid) - a.padding - Cs(t.title, this.chart.options.font), c = Math.sqrt(h * h + m * m), i = Tl(Math.min(Math.asin(at((d.highest.height + 6) / r, -1, 1)), Math.asin(at(l / c, -1, 1)) - Math.asin(at(m / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Ve(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Ve(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: n, title: o, grid: s } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = Cs(o, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Aa(s) + l) : (t.height = this.maxHeight, t.width = Aa(s) + l), n.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: m } = this._getLabelSizes(), b = n.padding * 2, f = Ft(this.labelRotation), p = Math.cos(f), y = Math.sin(f);
        if (r) {
          const v = n.mirror ? 0 : y * h.width + p * m.height;
          t.height = Math.min(this.maxHeight, t.height + v + b);
        } else {
          const v = n.mirror ? 0 : p * h.width + y * m.height;
          t.width = Math.min(this.maxWidth, t.width + v + b);
        }
        this._calculatePadding(c, d, y, p);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, o) {
    const { ticks: { align: s, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let m = 0, b = 0;
      l ? c ? (m = o * t.width, b = n * a.height) : (m = n * t.height, b = o * a.width) : s === "start" ? b = a.width : s === "end" ? m = t.width : s !== "inner" && (m = t.width / 2, b = a.width / 2), this.paddingLeft = Math.max((m - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((b - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = a.height / 2, h = t.height / 2;
      s === "start" ? (d = 0, h = t.height) : s === "end" && (d = a.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Ve(this.options.afterFit, [
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
      Ie(t[a].label) && (t.splice(a, 1), n--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let n = this.ticks;
      a < n.length && (n = ws(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], r = [], l = Math.floor(a / _s(a, n));
    let c = 0, d = 0, h, m, b, f, p, y, v, k, w, _, C;
    for (h = 0; h < a; h += l) {
      if (f = t[h].label, p = this._resolveTickFontOptions(h), o.font = y = p.string, v = s[y] = s[y] || {
        data: {},
        gc: []
      }, k = p.lineHeight, w = _ = 0, !Ie(f) && !Ge(f))
        w = Zo(o, v.data, v.gc, w, f), _ = k;
      else if (Ge(f))
        for (m = 0, b = f.length; m < b; ++m)
          C = f[m], !Ie(C) && !Ge(C) && (w = Zo(o, v.data, v.gc, w, C), _ += k);
      i.push(w), r.push(_), c = Math.max(w, c), d = Math.max(_, d);
    }
    Jd(s, a);
    const M = i.indexOf(c), S = r.indexOf(d), P = (I) => ({
      width: i[I] || 0,
      height: r[I] || 0
    });
    return {
      first: P(0),
      last: P(a - 1),
      widest: P(M),
      highest: P(S),
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
    return Ll(this._alignToPixels ? ia(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = tu(this.getContext(), t, n));
    }
    return this.$context || (this.$context = eu(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = Ft(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = s ? s.widest.width + i : 0, l = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? l * n > r * o ? r / n : l / o : l * o < r * n ? l / n : r / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), m = Aa(s), b = [], f = r.setContext(this.getContext()), p = f.display ? f.width : 0, y = p / 2, v = function(X) {
      return ia(n, X, p);
    };
    let k, w, _, C, M, S, P, I, V, D, L, T;
    if (i === "top")
      k = v(this.bottom), S = this.bottom - m, I = k - y, D = v(t.top) + y, T = t.bottom;
    else if (i === "bottom")
      k = v(this.top), D = t.top, T = v(t.bottom) - y, S = k + y, I = this.top + m;
    else if (i === "left")
      k = v(this.right), M = this.right - m, P = k - y, V = v(t.left) + y, L = t.right;
    else if (i === "right")
      k = v(this.left), V = t.left, L = v(t.right) - y, M = k + y, P = this.left + m;
    else if (a === "x") {
      if (i === "center")
        k = v((t.top + t.bottom) / 2 + 0.5);
      else if (Te(i)) {
        const X = Object.keys(i)[0], ie = i[X];
        k = v(this.chart.scales[X].getPixelForValue(ie));
      }
      D = t.top, T = t.bottom, S = k + y, I = S + m;
    } else if (a === "y") {
      if (i === "center")
        k = v((t.left + t.right) / 2);
      else if (Te(i)) {
        const X = Object.keys(i)[0], ie = i[X];
        k = v(this.chart.scales[X].getPixelForValue(ie));
      }
      M = k - y, P = M - m, V = t.left, L = t.right;
    }
    const j = De(o.ticks.maxTicksLimit, h), H = Math.max(1, Math.ceil(h / j));
    for (w = 0; w < h; w += H) {
      const X = this.getContext(w), ie = s.setContext(X), ue = r.setContext(X), q = ie.lineWidth, ne = ie.color, R = ue.dash || [], K = ue.dashOffset, U = ie.tickWidth, Y = ie.tickColor, de = ie.tickBorderDash || [], ge = ie.tickBorderDashOffset;
      _ = Qd(this, w, l), _ !== void 0 && (C = ia(n, _, q), c ? M = P = V = L = C : S = I = D = T = C, b.push({
        tx1: M,
        ty1: S,
        tx2: P,
        ty2: I,
        x1: V,
        y1: D,
        x2: L,
        y2: T,
        width: q,
        color: ne,
        borderDash: R,
        borderDashOffset: K,
        tickWidth: U,
        tickColor: Y,
        tickBorderDash: de,
        tickBorderDashOffset: ge
      }));
    }
    return this._ticksLength = h, this._borderValue = k, b;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: d, mirror: h } = s, m = Aa(n.grid), b = m + d, f = h ? -d : b, p = -Ft(this.labelRotation), y = [];
    let v, k, w, _, C, M, S, P, I, V, D, L, T = "middle";
    if (o === "top")
      M = this.bottom - f, S = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      M = this.top + f, S = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const H = this._getYAxisLabelAlignment(m);
      S = H.textAlign, C = H.x;
    } else if (o === "right") {
      const H = this._getYAxisLabelAlignment(m);
      S = H.textAlign, C = H.x;
    } else if (a === "x") {
      if (o === "center")
        M = (t.top + t.bottom) / 2 + b;
      else if (Te(o)) {
        const H = Object.keys(o)[0], X = o[H];
        M = this.chart.scales[H].getPixelForValue(X) + b;
      }
      S = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        C = (t.left + t.right) / 2 - b;
      else if (Te(o)) {
        const H = Object.keys(o)[0], X = o[H];
        C = this.chart.scales[H].getPixelForValue(X);
      }
      S = this._getYAxisLabelAlignment(m).textAlign;
    }
    a === "y" && (l === "start" ? T = "top" : l === "end" && (T = "bottom"));
    const j = this._getLabelSizes();
    for (v = 0, k = r.length; v < k; ++v) {
      w = r[v], _ = w.label;
      const H = s.setContext(this.getContext(v));
      P = this.getPixelForTick(v) + s.labelOffset, I = this._resolveTickFontOptions(v), V = I.lineHeight, D = Ge(_) ? _.length : 1;
      const X = D / 2, ie = H.color, ue = H.textStrokeColor, q = H.textStrokeWidth;
      let ne = S;
      i ? (C = P, S === "inner" && (v === k - 1 ? ne = this.options.reverse ? "left" : "right" : v === 0 ? ne = this.options.reverse ? "right" : "left" : ne = "center"), o === "top" ? c === "near" || p !== 0 ? L = -D * V + V / 2 : c === "center" ? L = -j.highest.height / 2 - X * V + V : L = -j.highest.height + V / 2 : c === "near" || p !== 0 ? L = V / 2 : c === "center" ? L = j.highest.height / 2 - X * V : L = j.highest.height - D * V, h && (L *= -1), p !== 0 && !H.showLabelBackdrop && (C += V / 2 * Math.sin(p))) : (M = P, L = (1 - D) * V / 2);
      let R;
      if (H.showLabelBackdrop) {
        const K = kt(H.backdropPadding), U = j.heights[v], Y = j.widths[v];
        let de = L - K.top, ge = 0 - K.left;
        switch (T) {
          case "middle":
            de -= U / 2;
            break;
          case "bottom":
            de -= U;
            break;
        }
        switch (S) {
          case "center":
            ge -= Y / 2;
            break;
          case "right":
            ge -= Y;
            break;
          case "inner":
            v === k - 1 ? ge -= Y : v > 0 && (ge -= Y / 2);
            break;
        }
        R = {
          left: ge,
          top: de,
          width: Y + K.width,
          height: U + K.height,
          color: H.backdropColor
        };
      }
      y.push({
        label: _,
        font: I,
        textOffset: L,
        options: {
          rotation: p,
          color: ie,
          strokeColor: ue,
          strokeWidth: q,
          textAlign: ne,
          textBaseline: T,
          translation: [
            C,
            M
          ],
          backdrop: R
        }
      });
    }
    return y;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-Ft(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return a.align === "start" ? o = "left" : a.align === "end" ? o = "right" : a.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: n, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), r = t + s, l = i.widest.width;
    let c, d;
    return a === "left" ? o ? (d = this.right + s, n === "near" ? c = "left" : n === "center" ? (c = "center", d += l / 2) : (c = "right", d += l)) : (d = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", d -= l / 2) : (c = "left", d = this.left)) : a === "right" ? o ? (d = this.left + s, n === "near" ? c = "right" : n === "center" ? (c = "center", d -= l / 2) : (c = "left", d -= l)) : (d = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", d += l / 2) : (c = "right", d = this.right)) : c = "right", {
      textAlign: c,
      x: d
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
    const { ctx: t, options: { backgroundColor: a }, left: n, top: o, width: s, height: i } = this;
    a && (t.save(), t.fillStyle = a, t.fillRect(n, o, s, i), t.restore());
  }
  getLineWidthForValue(t) {
    const a = this.options.grid;
    if (!this._isVisible() || !a.display)
      return 0;
    const o = this.ticks.findIndex((s) => s.value === t);
    return o >= 0 ? a.setContext(this.getContext(o)).lineWidth : 0;
  }
  drawGrid(t) {
    const a = this.options.grid, n = this.ctx, o = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let s, i;
    const r = (l, c, d) => {
      !d.width || !d.color || (n.save(), n.lineWidth = d.width, n.strokeStyle = d.color, n.setLineDash(d.borderDash || []), n.lineDashOffset = d.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (a.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const l = o[s];
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
    const { chart: t, ctx: a, options: { border: n, grid: o } } = this, s = n.setContext(this.getContext()), i = n.display ? s.width : 0;
    if (!i)
      return;
    const r = o.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, d, h, m;
    this.isHorizontal() ? (c = ia(t, this.left, i) - i / 2, d = ia(t, this.right, r) + r / 2, h = m = l) : (h = ia(t, this.top, i) - i / 2, m = ia(t, this.bottom, r) + r / 2, c = d = l), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, h), a.lineTo(d, m), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && yo(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const r = i.options, l = i.font, c = i.label, d = i.textOffset;
      qa(n, c, 0, d, l, r);
    }
    o && xo(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = nt(n.font), i = kt(n.padding), r = n.align;
    let l = s.lineHeight / 2;
    a === "bottom" || a === "center" || Te(a) ? (l += i.bottom, Ge(n.text) && (l += s.lineHeight * (n.text.length - 1))) : l += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: m } = nu(this, l, a, r);
    qa(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: h,
      rotation: m,
      textAlign: au(r, a, o),
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
    const t = this.options, a = t.ticks && t.ticks.z || 0, n = De(t.grid && t.grid.z, -1), o = De(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== $a.prototype.draw ? [
      {
        z: a,
        draw: (s) => {
          this.draw(s);
        }
      }
    ] : [
      {
        z: n,
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
        z: a,
        draw: (s) => {
          this.drawLabels(s);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const a = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", o = [];
    let s, i;
    for (s = 0, i = a.length; s < i; ++s) {
      const r = a[s];
      r[n] === this.id && (!t || r.type === t) && o.push(r);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const a = this.options.ticks.setContext(this.getContext(t));
    return nt(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class fn {
  constructor(t, a, n) {
    this.type = t, this.scope = a, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let n;
    iu(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, ou(t, i, n), this.override && Ye.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ye[o] && (delete Ye[o][n], this.override && delete ga[n]);
  }
}
function ou(e, t, a) {
  const n = Ha(/* @__PURE__ */ Object.create(null), [
    a ? Ye.get(a) : {},
    Ye.get(t),
    e.defaults
  ]);
  Ye.set(t, n), e.defaultRoutes && su(t, e.defaultRoutes), e.descriptors && Ye.describe(t, e.descriptors);
}
function su(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), r = i.pop(), l = i.join(".");
    Ye.route(s, o, l, r);
  });
}
function iu(e) {
  return "id" in e && "defaults" in e;
}
class ru {
  constructor() {
    this.controllers = new fn(Bn, "datasets", !0), this.elements = new fn(zt, "elements"), this.plugins = new fn(Object, "plugins"), this.scales = new fn($a, "scales"), this._typedRegistries = [
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
    ].forEach((o) => {
      const s = n || this._getRegistryForType(o);
      n || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Ee(o, (i) => {
        const r = n || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, a, n) {
    const o = go(t);
    Ve(n["before" + o], [], n), a[t](n), Ve(n["after" + o], [], n);
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
    const o = a.get(t);
    if (o === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return o;
  }
}
var Tt = /* @__PURE__ */ new ru();
class lu {
  constructor() {
    this._init = void 0;
  }
  notify(t, a, n, o) {
    if (a === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const s = o ? this._descriptors(t).filter(o) : this._descriptors(t), i = this._notify(s, t, a, n);
    return a === "afterDestroy" && (this._notify(s, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, a, n, o) {
    o = o || {};
    for (const s of t) {
      const i = s.plugin, r = i[n], l = [
        a,
        o,
        s.options
      ];
      if (Ve(r, l, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Ie(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const n = t && t.config, o = De(n.options && n.options.plugins, {}), s = cu(n);
    return o === !1 && !a ? [] : uu(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function cu(e) {
  const t = {}, a = [], n = Object.keys(Tt.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push(Tt.getPlugin(n[s]));
  const o = e.plugins || [];
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    a.indexOf(i) === -1 && (a.push(i), t[i.id] = !0);
  }
  return {
    plugins: a,
    localIds: t
  };
}
function du(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function uu(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, c = du(n[l], o);
    c !== null && s.push({
      plugin: r,
      options: hu(e.config, {
        plugin: r,
        local: a[l]
      }, c, i)
    });
  }
  return s;
}
function hu(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function no(e, t) {
  const a = Ye.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function fu(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function gu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function $s(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function mu(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function oo(e, ...t) {
  if ($s(e))
    return e;
  for (const a of t) {
    const n = a.axis || mu(a.position) || e.length > 1 && $s(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Ss(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function pu(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Ss(e, "x", a[0]) || Ss(e, "y", a[0]);
  }
  return {};
}
function bu(e, t) {
  const a = ga[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = no(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const r = n[i];
    if (!Te(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = oo(i, r, pu(i, e), Ye.scales[r.type]), c = gu(l, o), d = a.scales || {};
    s[i] = Fa(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      d[l],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || no(r, t), d = (ga[r] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const m = fu(h, l), b = i[m + "AxisID"] || m;
      s[b] = s[b] || /* @__PURE__ */ Object.create(null), Fa(s[b], [
        {
          axis: m
        },
        n[b],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const r = s[i];
    Fa(r, [
      Ye.scales[r.type],
      Ye.scale
    ]);
  }), s;
}
function qi(e) {
  const t = e.options || (e.options = {});
  t.plugins = De(t.plugins, {}), t.scales = bu(e, t);
}
function Xi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function vu(e) {
  return e = e || {}, e.data = Xi(e.data), qi(e), e;
}
const Ms = /* @__PURE__ */ new Map(), Gi = /* @__PURE__ */ new Set();
function gn(e, t) {
  let a = Ms.get(e);
  return a || (a = t(), Ms.set(e, a), Gi.add(a)), a;
}
const Ta = (e, t, a) => {
  const n = fa(t, a);
  n !== void 0 && e.add(n);
};
class yu {
  constructor(t) {
    this._config = vu(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Xi(t);
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
    this.clearCache(), qi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return gn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return gn(`${t}.transition.${a}`, () => [
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
    return gn(`${t}-${a}`, () => [
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
    return gn(`${n}-plugin-${a}`, () => [
      [
        `plugins.${a}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, a) {
    const n = this._scopeCache;
    let o = n.get(t);
    return (!o || a) && (o = /* @__PURE__ */ new Map(), n.set(t, o)), o;
  }
  getOptionScopes(t, a, n) {
    const { options: o, type: s } = this, i = this._cachedScopes(t, n), r = i.get(a);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    a.forEach((d) => {
      t && (l.add(t), d.forEach((h) => Ta(l, t, h))), d.forEach((h) => Ta(l, o, h)), d.forEach((h) => Ta(l, ga[s] || {}, h)), d.forEach((h) => Ta(l, Ye, h)), d.forEach((h) => Ta(l, to, h));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Gi.has(a) && i.set(a, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      ga[a] || {},
      Ye.datasets[a] || {},
      {
        type: a
      },
      Ye,
      to
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Ds(this._resolverCache, t, o);
    let l = i;
    if (ku(i, a)) {
      s.$shared = !1, n = Jt(n) ? n() : n;
      const c = this.createResolver(t, n, r);
      l = wa(i, n, c);
    }
    for (const c of a)
      s[c] = l[c];
    return s;
  }
  createResolver(t, a, n = [
    ""
  ], o) {
    const { resolver: s } = Ds(this._resolverCache, t, n);
    return Te(a) ? wa(s, a, void 0, o) : s;
  }
}
function Ds(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: _o(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const xu = (e) => Te(e) && Object.getOwnPropertyNames(e).some((t) => Jt(e[t]));
function ku(e, t) {
  const { isScriptable: a, isIndexable: n } = Li(e);
  for (const o of t) {
    const s = a(o), i = n(o), r = (i || s) && e[o];
    if (s && (Jt(r) || xu(r)) || i && Ge(r))
      return !0;
  }
  return !1;
}
var _u = "4.5.1";
const wu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function As(e, t) {
  return e === "top" || e === "bottom" || wu.indexOf(e) === -1 && t === "x";
}
function Ts(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function Bs(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), Ve(a && a.onComplete, [
    e
  ], t);
}
function Cu(e) {
  const t = e.chart, a = t.options.animation;
  Ve(a && a.onProgress, [
    e
  ], t);
}
function Zi(e) {
  return $o() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const kn = {}, Ls = (e) => {
  const t = Zi(e);
  return Object.values(kn).filter((a) => a.canvas === t).pop();
};
function $u(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function Su(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let ea = class {
  static defaults = Ye;
  static instances = kn;
  static overrides = ga;
  static registry = Tt;
  static version = _u;
  static getChart = Ls;
  static register(...t) {
    Tt.add(...t), Rs();
  }
  static unregister(...t) {
    Tt.remove(...t), Rs();
  }
  constructor(t, a) {
    const n = this.config = new yu(a), o = Zi(t), s = Ls(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Wd(o))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(o, i.aspectRatio), l = r && r.canvas, c = l && l.height, d = l && l.width;
    if (this.id = bl(), this.ctx = r, this.canvas = l, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new lu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = El((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], kn[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Pt.listen(this, "complete", Bs), Pt.listen(this, "progress", Cu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: n, height: o, _aspectRatio: s } = this;
    return Ie(t) ? a && s ? s : o ? n / o : null : t;
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ts(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Qo(this.canvas, this.ctx), this;
  }
  stop() {
    return Pt.stop(this), this;
  }
  resize(t, a) {
    Pt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const n = this.options, o = this.canvas, s = n.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, a, s), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, ts(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Ve(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    Ee(a, (n, o) => {
      n.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, o = Object.keys(n).reduce((i, r) => (i[r] = !1, i), {});
    let s = [];
    a && (s = s.concat(Object.keys(a).map((i) => {
      const r = a[i], l = oo(i, r), c = l === "r", d = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Ee(s, (i) => {
      const r = i.options, l = r.id, c = oo(l, r), d = De(r.type, i.dtype);
      (r.position === void 0 || As(r.position, c) !== As(i.dposition)) && (r.position = i.dposition), o[l] = !0;
      let h = null;
      if (l in n && n[l].type === d)
        h = n[l];
      else {
        const m = Tt.getScale(d);
        h = new m({
          id: l,
          type: d,
          ctx: this.ctx,
          chart: this
        }), n[h.id] = h;
      }
      h.init(r, t);
    }), Ee(o, (i, r) => {
      i || delete n[r];
    }), Ee(n, (i) => {
      yt.configure(this, i, i.options), yt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, n = t.length;
    if (t.sort((o, s) => o.index - s.index), n > a) {
      for (let o = a; o < n; ++o)
        this._destroyDatasetMeta(o);
      t.splice(a, n - a);
    }
    this._sortedMetasets = t.slice(0).sort(Ts("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: a } } = this;
    t.length > a.length && delete this._stacks, t.forEach((n, o) => {
      a.filter((s) => s === n._dataset).length === 0 && this._destroyDatasetMeta(o);
    });
  }
  buildOrUpdateControllers() {
    const t = [], a = this.data.datasets;
    let n, o;
    for (this._removeUnreferencedMetasets(), n = 0, o = a.length; n < o; n++) {
      const s = a[n];
      let i = this.getDatasetMeta(n);
      const r = s.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = r, i.indexAxis = s.indexAxis || no(r, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const l = Tt.getController(r), { datasetElementType: c, dataElementType: d } = Ye.datasets[r];
        Object.assign(l, {
          dataElementType: Tt.getElement(d),
          datasetElementType: c && Tt.getElement(c)
        }), i.controller = new l(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Ee(this.data.datasets, (t, a) => {
      this.getDatasetMeta(a).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const a = this.config;
    a.update();
    const n = this._options = a.createResolver(a.chartOptionScopes(), this.getContext()), o = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const s = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), m = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(m), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Ee(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Ts("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Ee(this.scales, (t) => {
      yt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!jo(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      $u(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, r) => r + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!jo(o, n(s)))
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
    yt.update(this, this.width, this.height, t);
    const a = this.chartArea, n = a.width <= 0 || a.height <= 0;
    this._layers = [], Ee(this.boxes, (o) => {
      n && o.position === "chartArea" || (o.configure && o.configure(), this._layers.push(...o._layers()));
    }, this), this._layers.forEach((o, s) => {
      o._idx = s;
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
        this._updateDataset(a, Jt(t) ? t({
          datasetIndex: a
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, a) {
    const n = this.getDatasetMeta(t), o = {
      meta: n,
      index: t,
      mode: a,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", o) !== !1 && (n.controller._update(a), o.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", o));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Pt.has(this) ? this.attached && !Pt.running(this) && Pt.start(this) : (this.draw(), Bs({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: o } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, o);
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
    let o, s;
    for (o = 0, s = a.length; o < s; ++o) {
      const i = a[o];
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
    }, o = jc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && yo(a, o), t.controller.draw(), o && xo(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Ya(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = wd.modes[a];
    return typeof s == "function" ? s(this, t, n, o) : [];
  }
  getDatasetMeta(t) {
    const a = this.data.datasets[t], n = this._metasets;
    let o = n.filter((s) => s && s._dataset === a).pop();
    return o || (o = {
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
    }, n.push(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = ma(null, {
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
    const o = n ? "show" : "hide", s = this.getDatasetMeta(t), i = s.controller._resolveAnimations(void 0, o);
    Wa(a) ? (s.data[a].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), i.update(s, {
      visible: n
    }), this.update((r) => r.datasetIndex === t ? o : void 0));
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
    for (this.stop(), Pt.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Qo(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete kn[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, a = this.platform, n = (s, i) => {
      a.addEventListener(this, s, i), t[s] = i;
    }, o = (s, i, r) => {
      s.offsetX = i, s.offsetY = r, this._eventHandler(s);
    };
    Ee(this.options.events, (s) => n(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, a = this.platform, n = (l, c) => {
      a.addEventListener(this, l, c), t[l] = c;
    }, o = (l, c) => {
      t[l] && (a.removeEventListener(this, l, c), delete t[l]);
    }, s = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let i;
    const r = () => {
      o("attach", r), this.attached = !0, this.resize(), n("resize", s), n("detach", i);
    };
    i = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), n("attach", r);
    }, a.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    Ee(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, Ee(this._responsiveListeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, a, n) {
    const o = n ? "set" : "remove";
    let s, i, r, l;
    for (a === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      i = t[r];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const a = this._active || [], n = t.map(({ datasetIndex: s, index: i }) => {
      const r = this.getDatasetMeta(s);
      if (!r)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
        element: r.data[i],
        index: i
      };
    });
    !_n(n, a) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, a));
  }
  notifyPlugins(t, a, n) {
    return this._plugins.notify(this, t, a, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, n) {
    const o = this.options.hover, s = (l, c) => l.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = s(a, t), r = n ? t : s(t, a);
    i.length && this.updateHoverStyle(i, o.mode, !1), r.length && o.mode && this.updateHoverStyle(r, o.mode, !0);
  }
  _eventHandler(t, a) {
    const n = {
      event: t,
      replay: a,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, o = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, o) === !1)
      return;
    const s = this._handleEvent(t, a, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, o), (s || n.changed) && this.render(), this;
  }
  _handleEvent(t, a, n) {
    const { _active: o = [], options: s } = this, i = a, r = this._getActiveElements(t, o, n, i), l = wl(t), c = Su(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, Ve(s.onHover, [
      t,
      r,
      this
    ], this), l && Ve(s.onClick, [
      t,
      r,
      this
    ], this));
    const d = !_n(r, o);
    return (d || a) && (this._active = r, this._updateHoverStyles(r, o, a)), this._lastEvent = c, d;
  }
  _getActiveElements(t, a, n, o) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return a;
    const s = this.options.hover;
    return this.getElementsAtEventForMode(t, s.mode, s, o);
  }
};
function Rs() {
  return Ee(ea.instances, (e) => e._plugins.invalidate());
}
function Mu(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: d } = l, h = Math.min(c / i, _t(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + h / 2, a - h / 2), r > 0) {
    const m = Math.min(c / r, _t(n - a));
    e.arc(o, s, r + c / 2, a - m / 2, n + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * _t(n - a));
    if (d === "round")
      e.arc(o, s, m, a - Fe / 2, n + Fe / 2, !0);
    else if (d === "bevel") {
      const b = 2 * m * m, f = -b * Math.cos(a + Fe / 2) + o, p = -b * Math.sin(a + Fe / 2) + s, y = b * Math.cos(n + Fe / 2) + o, v = b * Math.sin(n + Fe / 2) + s;
      e.lineTo(f, p), e.lineTo(y, v);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Du(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: r, innerRadius: l } = t;
  let c = o / r;
  e.beginPath(), e.arc(s, i, r, n - c, a + c), l > o ? (c = o / l, e.arc(s, i, l, a + c, n - c, !0)) : e.arc(s, i, o, a + Ze, n - Ze), e.closePath(), e.clip();
}
function Au(e) {
  return ko(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Tu(e, t, a, n) {
  const o = Au(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), r = (l) => {
    const c = (a - Math.min(s, l)) * n / 2;
    return at(l, 0, Math.min(s, c));
  };
  return {
    outerStart: r(o.outerStart),
    outerEnd: r(o.outerEnd),
    innerStart: at(o.innerStart, 0, i),
    innerEnd: at(o.innerEnd, 0, i)
  };
}
function va(e, t, a, n) {
  return {
    x: a + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function Dn(e, t, a, n, o, s) {
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + n + a - c, 0), m = d > 0 ? d + n + a + c : 0;
  let b = 0;
  const f = o - l;
  if (n) {
    const H = d > 0 ? d - n : 0, X = h > 0 ? h - n : 0, ie = (H + X) / 2, ue = ie !== 0 ? f * ie / (ie + n) : f;
    b = (f - ue) / 2;
  }
  const p = Math.max(1e-3, f * h - a / Fe) / h, y = (f - p) / 2, v = l + y + b, k = o - y - b, { outerStart: w, outerEnd: _, innerStart: C, innerEnd: M } = Tu(t, m, h, k - v), S = h - w, P = h - _, I = v + w / S, V = k - _ / P, D = m + C, L = m + M, T = v + C / D, j = k - M / L;
  if (e.beginPath(), s) {
    const H = (I + V) / 2;
    if (e.arc(i, r, h, I, H), e.arc(i, r, h, H, V), _ > 0) {
      const q = va(P, V, i, r);
      e.arc(q.x, q.y, _, V, k + Ze);
    }
    const X = va(L, k, i, r);
    if (e.lineTo(X.x, X.y), M > 0) {
      const q = va(L, j, i, r);
      e.arc(q.x, q.y, M, k + Ze, j + Math.PI);
    }
    const ie = (k - M / m + (v + C / m)) / 2;
    if (e.arc(i, r, m, k - M / m, ie, !0), e.arc(i, r, m, ie, v + C / m, !0), C > 0) {
      const q = va(D, T, i, r);
      e.arc(q.x, q.y, C, T + Math.PI, v - Ze);
    }
    const ue = va(S, v, i, r);
    if (e.lineTo(ue.x, ue.y), w > 0) {
      const q = va(S, I, i, r);
      e.arc(q.x, q.y, w, v - Ze, I);
    }
  } else {
    e.moveTo(i, r);
    const H = Math.cos(I) * h + i, X = Math.sin(I) * h + r;
    e.lineTo(H, X);
    const ie = Math.cos(V) * h + i, ue = Math.sin(V) * h + r;
    e.lineTo(ie, ue);
  }
  e.closePath();
}
function Bu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (s) {
    Dn(e, t, a, n, l, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(r) || (l = i + (r % Ue || Ue));
  }
  return Dn(e, t, a, n, l, o), e.fill(), l;
}
function Lu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: m, borderRadius: b } = l, f = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = m, f ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let p = t.endAngle;
  if (s) {
    Dn(e, t, a, n, p, o);
    for (let y = 0; y < s; ++y)
      e.stroke();
    isNaN(r) || (p = i + (r % Ue || Ue));
  }
  f && Du(e, t, p), l.selfJoin && p - i >= Fe && b === 0 && d !== "miter" && Mu(e, t, p), s || (Dn(e, t, a, n, p, o), e.stroke());
}
class Ru extends zt {
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
    const o = this.getProps([
      "x",
      "y"
    ], n), { angle: s, distance: i } = Ci(o, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), m = (this.options.spacing + this.options.borderWidth) / 2, b = De(h, l - r), f = Ua(s, r, l) && r !== l, p = b >= Ue || f, y = Wt(i, c + m, d + m);
    return p && y;
  }
  getCenterPoint(t) {
    const { x: a, y: n, startAngle: o, endAngle: s, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, d = (o + s) / 2, h = (i + r + c + l) / 2;
    return {
      x: a + Math.cos(d) * h,
      y: n + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: a, circumference: n } = this, o = (a.offset || 0) / 4, s = (a.spacing || 0) / 2, i = a.circular;
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > Ue ? Math.floor(n / Ue) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * o, Math.sin(r) * o);
    const l = 1 - Math.sin(Math.min(Fe, n || 0)), c = o * l;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Bu(t, this, c, s, i), Lu(t, this, c, s, i), t.restore();
  }
}
function Qi(e, t, a = t) {
  e.lineCap = De(a.borderCapStyle, t.borderCapStyle), e.setLineDash(De(a.borderDash, t.borderDash)), e.lineDashOffset = De(a.borderDashOffset, t.borderDashOffset), e.lineJoin = De(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = De(a.borderWidth, t.borderWidth), e.strokeStyle = De(a.borderColor, t.borderColor);
}
function Pu(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Iu(e) {
  return e.stepped ? Gl : e.tension || e.cubicInterpolationMode === "monotone" ? Zl : Pu;
}
function Ji(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: r } = t, l = Math.max(o, i), c = Math.min(s, r), d = o < i && s < i || o > r && s > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !d ? n + c - l : c - l
  };
}
function Eu(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: r, loop: l, ilen: c } = Ji(o, a, n), d = Iu(s);
  let { move: h = !0, reverse: m } = n || {}, b, f, p;
  for (b = 0; b <= c; ++b)
    f = o[(r + (m ? c - b : b)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : d(e, p, f, m, s.stepped), p = f);
  return l && (f = o[(r + (m ? c : 0)) % i], d(e, p, f, m, s.stepped)), !!l;
}
function Fu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: r } = Ji(o, a, n), { move: l = !0, reverse: c } = n || {};
  let d = 0, h = 0, m, b, f, p, y, v;
  const k = (_) => (i + (c ? r - _ : _)) % s, w = () => {
    p !== y && (e.lineTo(d, y), e.lineTo(d, p), e.lineTo(d, v));
  };
  for (l && (b = o[k(0)], e.moveTo(b.x, b.y)), m = 0; m <= r; ++m) {
    if (b = o[k(m)], b.skip)
      continue;
    const _ = b.x, C = b.y, M = _ | 0;
    M === f ? (C < p ? p = C : C > y && (y = C), d = (h * d + _) / ++h) : (w(), e.lineTo(_, C), f = M, h = 0, p = y = C), v = C;
  }
  w();
}
function so(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Fu : Eu;
}
function Ou(e) {
  return e.stepped ? Ac : e.tension || e.cubicInterpolationMode === "monotone" ? Tc : da;
}
function Vu(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), Qi(e, t.options), e.stroke(o);
}
function zu(e, t, a, n) {
  const { segments: o, options: s } = t, i = so(t);
  for (const r of o)
    Qi(e, s, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Nu = typeof Path2D == "function";
function ju(e, t, a, n) {
  Nu && !t.options.segment ? Vu(e, t, a, n) : zu(e, t, a, n);
}
class Hu extends zt {
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
      const o = n.spanGaps ? this._loop : this._fullLoop;
      kc(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Oc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = Ic(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const r = [], l = Ou(n);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: m } = i[c], b = s[h], f = s[m];
      if (b === f) {
        r.push(b);
        continue;
      }
      const p = Math.abs((o - b[a]) / (f[a] - b[a])), y = l(b, f, p, n.stepped);
      y[a] = t[a], r.push(y);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, n) {
    return so(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = so(this);
    let i = this._loop;
    a = a || 0, n = n || this.points.length - a;
    for (const r of o)
      i &= s(t, this, r, {
        start: a,
        end: a + n - 1
      });
    return !!i;
  }
  draw(t, a, n, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (t.save(), ju(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Ps(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Wu extends zt {
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
    const o = this.options, { x: s, y: i } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(t - s, 2) + Math.pow(a - i, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(t, a) {
    return Ps(this, t, "x", a);
  }
  inYRange(t, a) {
    return Ps(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !Ya(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, ao(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function er(e, t) {
  const { x: a, y: n, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, c, d, h;
  return e.horizontal ? (h = i / 2, r = Math.min(a, o), l = Math.max(a, o), c = n - h, d = n + h) : (h = s / 2, r = a - h, l = a + h, c = Math.min(n, o), d = Math.max(n, o)), {
    left: r,
    top: c,
    right: l,
    bottom: d
  };
}
function Ut(e, t, a, n) {
  return e ? 0 : at(t, a, n);
}
function Ku(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = Bi(n);
  return {
    t: Ut(o.top, s.top, 0, a),
    r: Ut(o.right, s.right, 0, t),
    b: Ut(o.bottom, s.bottom, 0, a),
    l: Ut(o.left, s.left, 0, t)
  };
}
function Uu(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = ka(o), i = Math.min(t, a), r = e.borderSkipped, l = n || Te(o);
  return {
    topLeft: Ut(!l || r.top || r.left, s.topLeft, 0, i),
    topRight: Ut(!l || r.top || r.right, s.topRight, 0, i),
    bottomLeft: Ut(!l || r.bottom || r.left, s.bottomLeft, 0, i),
    bottomRight: Ut(!l || r.bottom || r.right, s.bottomRight, 0, i)
  };
}
function Yu(e) {
  const t = er(e), a = t.right - t.left, n = t.bottom - t.top, o = Ku(e, a / 2, n / 2), s = Uu(e, a / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: a,
      h: n,
      radius: s
    },
    inner: {
      x: t.left + o.l,
      y: t.top + o.t,
      w: a - o.l - o.r,
      h: n - o.t - o.b,
      radius: {
        topLeft: Math.max(0, s.topLeft - Math.max(o.t, o.l)),
        topRight: Math.max(0, s.topRight - Math.max(o.t, o.r)),
        bottomLeft: Math.max(0, s.bottomLeft - Math.max(o.b, o.l)),
        bottomRight: Math.max(0, s.bottomRight - Math.max(o.b, o.r))
      }
    }
  };
}
function Un(e, t, a, n) {
  const o = t === null, s = a === null, r = e && !(o && s) && er(e, n);
  return r && (o || Wt(t, r.left, r.right)) && (s || Wt(a, r.top, r.bottom));
}
function qu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Xu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Yn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, o = e.y !== a.y ? -t : 0, s = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - o;
  return {
    x: e.x + n,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class Gu extends zt {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = Yu(this), r = qu(i.radius) ? $n : Xu;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), r(t, Yn(i, a, s)), t.clip(), r(t, Yn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, Yn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return Un(this, t, a, n);
  }
  inXRange(t, a) {
    return Un(this, t, null, a);
  }
  inYRange(t, a) {
    return Un(this, null, t, a);
  }
  getCenterPoint(t) {
    const { x: a, y: n, base: o, horizontal: s } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: s ? (a + o) / 2 : a,
      y: s ? n : (n + o) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
const Is = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, Zu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Es extends zt {
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
    let a = Ve(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (a = a.filter((n) => t.filter(n, this.chart.data))), t.sort && (a = a.sort((n, o) => t.sort(n, o, this.chart.data))), this.options.reverse && a.reverse(), this.legendItems = a;
  }
  fit() {
    const { options: t, ctx: a } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, o = nt(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Is(n, s);
    let c, d;
    a.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, r, l) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + r;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let m = -1, b = -d;
    return this.legendItems.forEach((f, p) => {
      const y = n + a / 2 + s.measureText(f.text).width;
      (p === 0 || c[c.length - 1] + y + 2 * r > i) && (h += d, c[c.length - (p > 0 ? 0 : 1)] = 0, b += d, m++), l[p] = {
        left: 0,
        top: b,
        row: m,
        width: y,
        height: o
      }, c[c.length - 1] += y + r;
    }), h;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = r, m = 0, b = 0, f = 0, p = 0;
    return this.legendItems.forEach((y, v) => {
      const { itemWidth: k, itemHeight: w } = Qu(n, a, s, y, o);
      v > 0 && b + w + 2 * r > d && (h += m + r, c.push({
        width: m,
        height: b
      }), f += m + r, p++, m = b = 0), l[v] = {
        left: f,
        top: b,
        col: p,
        width: k,
        height: w
      }, m = Math.max(m, k), b += w + r;
    }), h += m, c.push({
      width: m,
      height: b
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: n, labels: { padding: o }, rtl: s } } = this, i = _a(s, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = et(n, this.left + o, this.right - this.lineWidths[r]);
      for (const c of a)
        r !== c.row && (r = c.row, l = et(n, this.left + o, this.right - this.lineWidths[r])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(l), c.width), l += c.width + o;
    } else {
      let r = 0, l = et(n, this.top + t + o, this.bottom - this.columnSizes[r].height);
      for (const c of a)
        c.col !== r && (r = c.col, l = et(n, this.top + t + o, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), l += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      yo(t, this), this._draw(), xo(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, r = Ye.color, l = _a(t.rtl, this.left, this.width), c = nt(i.font), { padding: d } = i, h = c.size, m = h / 2;
    let b;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: f, boxHeight: p, itemHeight: y } = Is(i, h), v = function(M, S, P) {
      if (isNaN(f) || f <= 0 || isNaN(p) || p < 0)
        return;
      o.save();
      const I = De(P.lineWidth, 1);
      if (o.fillStyle = De(P.fillStyle, r), o.lineCap = De(P.lineCap, "butt"), o.lineDashOffset = De(P.lineDashOffset, 0), o.lineJoin = De(P.lineJoin, "miter"), o.lineWidth = I, o.strokeStyle = De(P.strokeStyle, r), o.setLineDash(De(P.lineDash, [])), i.usePointStyle) {
        const V = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: P.pointStyle,
          rotation: P.rotation,
          borderWidth: I
        }, D = l.xPlus(M, f / 2), L = S + m;
        Ti(o, V, D, L, i.pointStyleWidth && f);
      } else {
        const V = S + Math.max((h - p) / 2, 0), D = l.leftForLtr(M, f), L = ka(P.borderRadius);
        o.beginPath(), Object.values(L).some((T) => T !== 0) ? $n(o, {
          x: D,
          y: V,
          w: f,
          h: p,
          radius: L
        }) : o.rect(D, V, f, p), o.fill(), I !== 0 && o.stroke();
      }
      o.restore();
    }, k = function(M, S, P) {
      qa(o, P.text, M, S + y / 2, c, {
        strikethrough: P.hidden,
        textAlign: l.textAlign(P.textAlign)
      });
    }, w = this.isHorizontal(), _ = this._computeTitleHeight();
    w ? b = {
      x: et(s, this.left + d, this.right - n[0]),
      y: this.top + d + _,
      line: 0
    } : b = {
      x: this.left + d,
      y: et(s, this.top + _ + d, this.bottom - a[0].height),
      line: 0
    }, Fi(this.ctx, t.textDirection);
    const C = y + d;
    this.legendItems.forEach((M, S) => {
      o.strokeStyle = M.fontColor, o.fillStyle = M.fontColor;
      const P = o.measureText(M.text).width, I = l.textAlign(M.textAlign || (M.textAlign = i.textAlign)), V = f + m + P;
      let D = b.x, L = b.y;
      l.setWidth(this.width), w ? S > 0 && D + V + d > this.right && (L = b.y += C, b.line++, D = b.x = et(s, this.left + d, this.right - n[b.line])) : S > 0 && L + C > this.bottom && (D = b.x = D + a[b.line].width + d, b.line++, L = b.y = et(s, this.top + _ + d, this.bottom - a[b.line].height));
      const T = l.x(D);
      if (v(T, L, M), D = Fl(I, D + f + m, w ? D + V : this.right, t.rtl), k(l.x(D), L, M), w)
        b.x += V + d;
      else if (typeof M.text != "string") {
        const j = c.lineHeight;
        b.y += tr(M, j) + d;
      } else
        b.y += C;
    }), Oi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = nt(a.font), o = kt(a.padding);
    if (!a.display)
      return;
    const s = _a(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = n.size / 2, c = o.top + l;
    let d, h = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), d = this.top + c, h = et(t.align, h, this.right - m);
    else {
      const f = this.columnSizes.reduce((p, y) => Math.max(p, y.height), 0);
      d = c + et(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const b = et(r, h, h + m);
    i.textAlign = s.textAlign(po(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, qa(i, a.text, b, d, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = nt(t.font), n = kt(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, o, s;
    if (Wt(t, this.left, this.right) && Wt(a, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, n = 0; n < s.length; ++n)
        if (o = s[n], Wt(t, o.left, o.left + o.width) && Wt(a, o.top, o.top + o.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!th(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = Zu(o, n);
      o && !s && Ve(a.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = n, n && !s && Ve(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && Ve(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function Qu(e, t, a, n, o) {
  const s = Ju(n, e, t, a), i = eh(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function Ju(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function eh(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = tr(t, a)), n;
}
function tr(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function th(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Do = {
  id: "legend",
  _element: Es,
  start(e, t, a) {
    const n = e.legend = new Es({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    yt.configure(e, n, a), yt.addBox(e, n);
  },
  stop(e) {
    yt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const n = e.legend;
    yt.configure(e, n, a), n.options = a;
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
      const n = t.datasetIndex, o = a.chart;
      o.isDatasetVisible(n) ? (o.hide(n), t.hidden = !0) : (o.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(a ? 0 : void 0), d = kt(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: o || c.textAlign,
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
class ar extends zt {
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
    const o = Ge(n.text) ? n.text.length : 1;
    this._padding = kt(n.padding);
    const s = o * nt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: n, bottom: o, right: s, options: i } = this, r = i.align;
    let l = 0, c, d, h;
    return this.isHorizontal() ? (d = et(r, n, s), h = a + t, c = s - n) : (i.position === "left" ? (d = n + t, h = et(r, o, a), l = Fe * -0.5) : (d = s - t, h = et(r, a, o), l = Fe * 0.5), c = o - a), {
      titleX: d,
      titleY: h,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const n = nt(a.font), s = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(s);
    qa(t, a.text, 0, 0, n, {
      color: a.color,
      maxWidth: l,
      rotation: c,
      textAlign: po(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function ah(e, t) {
  const a = new ar({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  yt.configure(e, a, t), yt.addBox(e, a), e.titleBlock = a;
}
var nr = {
  id: "title",
  _element: ar,
  start(e, t, a) {
    ah(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    yt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const n = e.titleBlock;
    yt.configure(e, n, a), n.options = a;
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
const Ea = {
  average(e) {
    if (!e.length)
      return !1;
    let t, a, n = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, a = e.length; t < a; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        n.add(l.x), o += l.y, ++s;
      }
    }
    return s === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((r, l) => r + l) / n.size,
      y: o / s
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let a = t.x, n = t.y, o = Number.POSITIVE_INFINITY, s, i, r;
    for (s = 0, i = e.length; s < i; ++s) {
      const l = e[s].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), d = eo(t, c);
        d < o && (o = d, r = l);
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
function At(e, t) {
  return t && (Ge(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function It(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function nh(e, t) {
  const { element: a, datasetIndex: n, index: o } = t, s = e.getDatasetMeta(n).controller, { label: i, value: r } = s.getLabelAndValue(o);
  return {
    chart: e,
    label: i,
    parsed: s.getParsed(o),
    raw: e.data.datasets[n].data[o],
    formattedValue: r,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: n,
    element: a
  };
}
function Fs(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = nt(t.bodyFont), c = nt(t.titleFont), d = nt(t.footerFont), h = s.length, m = o.length, b = n.length, f = kt(t.padding);
  let p = f.height, y = 0, v = n.reduce((_, C) => _ + C.before.length + C.lines.length + C.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, h && (p += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const _ = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    p += b * _ + (v - b) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  m && (p += t.footerMarginTop + m * d.lineHeight + (m - 1) * t.footerSpacing);
  let k = 0;
  const w = function(_) {
    y = Math.max(y, a.measureText(_).width + k);
  };
  return a.save(), a.font = c.string, Ee(e.title, w), a.font = l.string, Ee(e.beforeBody.concat(e.afterBody), w), k = t.displayColors ? i + 2 + t.boxPadding : 0, Ee(n, (_) => {
    Ee(_.before, w), Ee(_.lines, w), Ee(_.after, w);
  }), k = 0, a.font = d.string, Ee(e.footer, w), a.restore(), y += f.width, {
    width: y,
    height: p
  };
}
function oh(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function sh(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function ih(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = o <= (r + l) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), sh(c, e, t, a) && (c = "center"), c;
}
function Os(e, t, a) {
  const n = a.yAlign || t.yAlign || oh(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || ih(e, t, a, n),
    yAlign: n
  };
}
function rh(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function lh(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Vs(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, c = o + s, { topLeft: d, topRight: h, bottomLeft: m, bottomRight: b } = ka(i);
  let f = rh(t, r);
  const p = lh(t, l, c);
  return l === "center" ? r === "left" ? f += c : r === "right" && (f -= c) : r === "left" ? f -= Math.max(d, m) + o : r === "right" && (f += Math.max(h, b) + o), {
    x: at(f, 0, n.width - t.width),
    y: at(p, 0, n.height - t.height)
  };
}
function mn(e, t, a) {
  const n = kt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function zs(e) {
  return At([], It(e));
}
function ch(e, t, a) {
  return ma(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function Ns(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const or = {
  beforeTitle: Rt,
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
  afterTitle: Rt,
  beforeBody: Rt,
  beforeLabel: Rt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return Ie(a) || (t += a), t;
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
  afterLabel: Rt,
  afterBody: Rt,
  beforeFooter: Rt,
  footer: Rt,
  afterFooter: Rt
};
function lt(e, t, a, n) {
  const o = e[t].call(a, n);
  return typeof o > "u" ? or[t].call(a, n) : o;
}
class js extends zt {
  static positioners = Ea;
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new zi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = ch(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = lt(n, "beforeTitle", this, t), s = lt(n, "title", this, t), i = lt(n, "afterTitle", this, t);
    let r = [];
    return r = At(r, It(o)), r = At(r, It(s)), r = At(r, It(i)), r;
  }
  getBeforeBody(t, a) {
    return zs(lt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Ee(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Ns(n, s);
      At(i.before, It(lt(r, "beforeLabel", this, s))), At(i.lines, lt(r, "label", this, s)), At(i.after, It(lt(r, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return zs(lt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = lt(n, "beforeFooter", this, t), s = lt(n, "footer", this, t), i = lt(n, "afterFooter", this, t);
    let r = [];
    return r = At(r, It(o)), r = At(r, It(s)), r = At(r, It(i)), r;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let r = [], l, c;
    for (l = 0, c = a.length; l < c; ++l)
      r.push(nh(this.chart, a[l]));
    return t.filter && (r = r.filter((d, h, m) => t.filter(d, h, m, n))), t.itemSort && (r = r.sort((d, h) => t.itemSort(d, h, n))), Ee(r, (d) => {
      const h = Ns(t.callbacks, d);
      o.push(lt(h, "labelColor", this, d)), s.push(lt(h, "labelPointStyle", this, d)), i.push(lt(h, "labelTextColor", this, d));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, a) {
    const n = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const r = Ea[n.position].call(this, o, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const l = this._size = Fs(this, n), c = Object.assign({}, r, l), d = Os(this.chart, n, c), h = Vs(n, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, s = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, s && this._resolveAnimations().update(this, s), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: a
    });
  }
  drawCaret(t, a, n, o) {
    const s = this.getCaretPosition(t, n, o);
    a.lineTo(s.x1, s.y1), a.lineTo(s.x2, s.y2), a.lineTo(s.x3, s.y3);
  }
  getCaretPosition(t, a, n) {
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: d, bottomRight: h } = ka(r), { x: m, y: b } = t, { width: f, height: p } = a;
    let y, v, k, w, _, C;
    return s === "center" ? (_ = b + p / 2, o === "left" ? (y = m, v = y - i, w = _ + i, C = _ - i) : (y = m + f, v = y + i, w = _ - i, C = _ + i), k = y) : (o === "left" ? v = m + Math.max(l, d) + i : o === "right" ? v = m + f - Math.max(c, h) - i : v = this.caretX, s === "top" ? (w = b, _ = w - i, y = v - i, k = v + i) : (w = b + p, _ = w + i, y = v + i, k = v - i), C = w), {
      x1: y,
      x2: v,
      x3: k,
      y1: w,
      y2: _,
      y3: C
    };
  }
  drawTitle(t, a, n) {
    const o = this.title, s = o.length;
    let i, r, l;
    if (s) {
      const c = _a(n.rtl, this.x, this.width);
      for (t.x = mn(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = nt(n.titleFont), r = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, l = 0; l < s; ++l)
        a.fillText(o[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === s && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, n, o, s) {
    const i = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = s, d = nt(s.bodyFont), h = mn(this, "left", s), m = o.x(h), b = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, f = a.y + b;
    if (s.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, y = o.leftForLtr(m, c) + c / 2, v = f + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, ao(t, p, y, v), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, ao(t, p, y, v);
    } else {
      t.lineWidth = Te(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const p = o.leftForLtr(m, c), y = o.leftForLtr(o.xPlus(m, 1), c - 2), v = ka(i.borderRadius);
      Object.values(v).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, $n(t, {
        x: p,
        y: f,
        w: c,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), $n(t, {
        x: y,
        y: f + 1,
        w: c - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(p, f, c, l), t.strokeRect(p, f, c, l), t.fillStyle = i.backgroundColor, t.fillRect(y, f + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: d } = n, h = nt(n.bodyFont);
    let m = h.lineHeight, b = 0;
    const f = _a(n.rtl, this.x, this.width), p = function(P) {
      a.fillText(P, f.x(t.x + b), t.y + m / 2), t.y += m + s;
    }, y = f.textAlign(i);
    let v, k, w, _, C, M, S;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = mn(this, y, n), a.fillStyle = n.bodyColor, Ee(this.beforeBody, p), b = r && y !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, _ = 0, M = o.length; _ < M; ++_) {
      for (v = o[_], k = this.labelTextColors[_], a.fillStyle = k, Ee(v.before, p), w = v.lines, r && w.length && (this._drawColorBox(a, t, _, f, n), m = Math.max(h.lineHeight, l)), C = 0, S = w.length; C < S; ++C)
        p(w[C]), m = h.lineHeight;
      Ee(v.after, p);
    }
    b = 0, m = h.lineHeight, Ee(this.afterBody, p), t.y -= s;
  }
  drawFooter(t, a, n) {
    const o = this.footer, s = o.length;
    let i, r;
    if (s) {
      const l = _a(n.rtl, this.x, this.width);
      for (t.x = mn(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = l.textAlign(n.footerAlign), a.textBaseline = "middle", i = nt(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, r = 0; r < s; ++r)
        a.fillText(o[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, a, n, o) {
    const { xAlign: s, yAlign: i } = this, { x: r, y: l } = t, { width: c, height: d } = n, { topLeft: h, topRight: m, bottomLeft: b, bottomRight: f } = ka(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(r + h, l), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(r + c - m, l), a.quadraticCurveTo(r + c, l, r + c, l + m), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(r + c, l + d - f), a.quadraticCurveTo(r + c, l + d, r + c - f, l + d), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(r + b, l + d), a.quadraticCurveTo(r, l + d, r, l + d - b), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(r, l + h), a.quadraticCurveTo(r, l, r + h, l), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Ea[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = Fs(this, t), l = Object.assign({}, i, this._size), c = Os(a, t, l), d = Vs(t, l, c, a);
      (o._to !== d.x || s._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
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
    const o = {
      width: this.width,
      height: this.height
    }, s = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const i = kt(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), Fi(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Oi(t, a.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, a) {
    const n = this._active, o = t.map(({ datasetIndex: r, index: l }) => {
      const c = this.chart.getDatasetMeta(r);
      if (!c)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: c.data[l],
        index: l
      };
    }), s = !_n(n, o), i = this._positionChanged(o, a);
    (s || i) && (this._active = o, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, n = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, a, n), r = this._positionChanged(i, t), l = a || !_n(i, s) || r;
    return l && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, a))), l;
  }
  _getActiveElements(t, a, n, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!o)
      return a.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, s.mode, s, n);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(t, a) {
    const { caretX: n, caretY: o, options: s } = this, i = Ea[s.position].call(this, t, a);
    return i !== !1 && (n !== i.x || o !== i.y);
  }
}
var Ao = {
  id: "tooltip",
  _element: js,
  positioners: Ea,
  afterInit(e, t, a) {
    a && (e.tooltip = new js({
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
    callbacks: or
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
const dh = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function uh(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return dh(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const hh = (e, t) => e === null ? null : at(Math.round(e), 0, t);
function Hs(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class sr extends $a {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Hs
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const a = this._addedLabels;
    if (a.length) {
      const n = this.getLabels();
      for (const { index: o, label: s } of a)
        n[o] === s && n.splice(o, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, a) {
    if (Ie(t))
      return null;
    const n = this.getLabels();
    return a = isFinite(a) && n[a] === t ? a : uh(n, t, De(a, t), this._addedLabels), hh(a, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: a } = this.getUserBounds();
    let { min: n, max: o } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), a || (o = this.getLabels().length - 1)), this.min = n, this.max = o;
  }
  buildTicks() {
    const t = this.min, a = this.max, n = this.options.offset, o = [];
    let s = this.getLabels();
    s = t === 0 && a === s.length - 1 ? s : s.slice(t, a + 1), this._valueRange = Math.max(s.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let i = t; i <= a; i++)
      o.push({
        value: i
      });
    return o;
  }
  getLabelForValue(t) {
    return Hs.call(this, t);
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
function fh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: d, maxDigits: h, includeBounds: m } = e, b = s || 1, f = d - 1, { min: p, max: y } = t, v = !Ie(i), k = !Ie(r), w = !Ie(c), _ = (y - p) / (h + 1);
  let C = Wo((y - p) / f / b) * b, M, S, P, I;
  if (C < 1e-14 && !v && !k)
    return [
      {
        value: p
      },
      {
        value: y
      }
    ];
  I = Math.ceil(y / C) - Math.floor(p / C), I > f && (C = Wo(I * C / f / b) * b), Ie(l) || (M = Math.pow(10, l), C = Math.ceil(C * M) / M), o === "ticks" ? (S = Math.floor(p / C) * C, P = Math.ceil(y / C) * C) : (S = p, P = y), v && k && s && Dl((r - i) / s, C / 1e3) ? (I = Math.round(Math.min((r - i) / C, d)), C = (r - i) / I, S = i, P = r) : w ? (S = v ? i : S, P = k ? r : P, I = c - 1, C = (P - S) / I) : (I = (P - S) / C, Oa(I, Math.round(I), C / 1e3) ? I = Math.round(I) : I = Math.ceil(I));
  const V = Math.max(Ko(C), Ko(S));
  M = Math.pow(10, Ie(l) ? V : l), S = Math.round(S * M) / M, P = Math.round(P * M) / M;
  let D = 0;
  for (v && (m && S !== i ? (a.push({
    value: i
  }), S < i && D++, Oa(Math.round((S + D * C) * M) / M, i, Ws(i, _, e)) && D++) : S < i && D++); D < I; ++D) {
    const L = Math.round((S + D * C) * M) / M;
    if (k && L > r)
      break;
    a.push({
      value: L
    });
  }
  return k && m && P !== r ? a.length && Oa(a[a.length - 1].value, r, Ws(r, _, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!k || P === r) && a.push({
    value: P
  }), a;
}
function Ws(e, t, { horizontal: a, minRotation: n }) {
  const o = Ft(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class gh extends $a {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return Ie(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: n } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (l) => o = a ? o : l, r = (l) => s = n ? s : l;
    if (t) {
      const l = Bt(o), c = Bt(s);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && i(0);
    }
    if (o === s) {
      let l = s === 0 ? 1 : Math.abs(s * 0.05);
      r(s + l), t || i(o - l);
    }
    this.min = o, this.max = s;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: a, stepSize: n } = t, o;
    return n ? (o = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, o > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${o} ticks. Limiting to 1000.`), o = 1e3)) : (o = this.computeTickLimit(), a = a || 11), a && (o = Math.min(a, o)), o;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, a = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const o = {
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
    }, s = this._range || this, i = fh(o, s);
    return t.bounds === "ticks" && Al(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let a = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const o = (n - a) / Math.max(t.length - 1, 1) / 2;
      a -= o, n += o;
    }
    this._startValue = a, this._endValue = n, this._valueRange = n - a;
  }
  getLabelForValue(t) {
    return vo(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ir extends gh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Ai.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = xt(t) ? t : 0, this.max = xt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = Ft(this.options.ticks.minRotation), o = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Rn = {
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
}, ut = /* @__PURE__ */ Object.keys(Rn);
function Ks(e, t) {
  return e - t;
}
function Us(e, t) {
  if (Ie(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), xt(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (Ka(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function Ys(e, t, a, n) {
  const o = ut.length;
  for (let s = ut.indexOf(e); s < o - 1; ++s) {
    const i = Rn[ut[s]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= n)
      return ut[s];
  }
  return ut[o - 1];
}
function mh(e, t, a, n, o) {
  for (let s = ut.length - 1; s >= ut.indexOf(a); s--) {
    const i = ut[s];
    if (Rn[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return ut[a ? ut.indexOf(a) : 0];
}
function ph(e) {
  for (let t = ut.indexOf(e) + 1, a = ut.length; t < a; ++t)
    if (Rn[ut[t]].common)
      return ut[t];
}
function qs(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = mo(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function bh(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let r, l;
  for (r = s; r <= i; r = +o.add(r, 1, n))
    l = a[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Xs(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, r;
  for (i = 0; i < s; ++i)
    r = t[i], o[r] = i, n.push({
      value: r,
      major: !1
    });
  return s === 0 || !a ? n : bh(e, n, o, a);
}
class Gs extends $a {
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
    const n = t.time || (t.time = {}), o = this._adapter = new vd._date(t.adapters.date);
    o.init(a), Fa(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : Us(this, t);
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
    let { min: o, max: s, minDefined: i, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !r && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), o = xt(o) && !isNaN(o) ? o : +a.startOf(Date.now(), n), s = xt(s) && !isNaN(s) ? s : +a.endOf(Date.now(), n) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const t = this.options, a = t.time, n = t.ticks, o = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && o.length && (this.min = this._userMin || o[0], this.max = this._userMax || o[o.length - 1]);
    const s = this.min, i = this.max, r = Pl(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? Ys(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : mh(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : ph(this._unit), this.initOffsets(o), t.reverse && r.reverse(), Xs(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, n = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - o : a = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = s : n = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = at(a, 0, i), n = at(n, 0, i), this._offsets = {
      start: a,
      end: n,
      factor: 1 / (a + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || Ys(s.minUnit, a, n, this._getLabelCapacity(a)), r = De(o.ticks.stepSize, 1), l = i === "week" ? s.isoWeekday : !1, c = Ka(l) || l === !0, d = {};
    let h = a, m, b;
    if (c && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, c ? "day" : i), t.diff(n, a, i) > 1e5 * r)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + r + " " + i);
    const f = o.ticks.source === "data" && this.getDataTimestamps();
    for (m = h, b = 0; m < n; m = +t.add(m, r, i), b++)
      qs(d, m, f);
    return (m === n || o.bounds === "ticks" || b === 1) && qs(d, m, f), Object.keys(d).sort(Ks).map((p) => +p);
  }
  getLabelForValue(t) {
    const a = this._adapter, n = this.options.time;
    return n.tooltipFormat ? a.format(t, n.tooltipFormat) : a.format(t, n.displayFormats.datetime);
  }
  format(t, a) {
    const o = this.options.time.displayFormats, s = this._unit, i = a || o[s];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, a, n, o) {
    const s = this.options, i = s.ticks.callback;
    if (i)
      return Ve(i, [
        t,
        a,
        n
      ], this);
    const r = s.time.displayFormats, l = this._unit, c = this._majorUnit, d = l && r[l], h = c && r[c], m = n[a], b = c && h && m && m.major;
    return this._adapter.format(t, o || (b ? h : d));
  }
  generateTickLabels(t) {
    let a, n, o;
    for (a = 0, n = t.length; a < n; ++a)
      o = t[a], o.label = this._tickFormatFunction(o.value, a, t);
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = Ft(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * s + r * i,
      h: n * i + r * s
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, Xs(this, [
      t
    ], this._majorUnit), o), i = this._getLabelSize(s), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], a, n;
    if (t.length)
      return t;
    const o = this.getMatchingVisibleMetas();
    if (this._normalized && o.length)
      return this._cache.data = o[0].controller.getAllParsedValues(this);
    for (a = 0, n = o.length; a < n; ++a)
      t = t.concat(o[a].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let a, n;
    if (t.length)
      return t;
    const o = this.getLabels();
    for (a = 0, n = o.length; a < n; ++a)
      t.push(Us(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Si(t.sort(Ks));
  }
}
function pn(e, t, a) {
  let n = 0, o = e.length - 1, s, i, r, l;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ua(e, "pos", t)), { pos: s, time: r } = e[n], { pos: i, time: l } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ua(e, "time", t)), { time: s, pos: r } = e[n], { time: i, pos: l } = e[o]);
  const c = i - s;
  return c ? r + (l - r) * (t - s) / c : r;
}
class QS extends Gs {
  static id = "timeseries";
  static defaults = Gs.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = pn(a, this.min), this._tableRange = pn(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: n } = this, o = [], s = [];
    let i, r, l, c, d;
    for (i = 0, r = t.length; i < r; ++i)
      c = t[i], c >= a && c <= n && o.push(c);
    if (o.length < 2)
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
    for (i = 0, r = o.length; i < r; ++i)
      d = o[i + 1], l = o[i - 1], c = o[i], Math.round((d + l) / 2) !== c && s.push({
        time: c,
        pos: i / (r - 1)
      });
    return s;
  }
  _generate() {
    const t = this.min, a = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(a) || n.length === 1) && n.push(a), n.sort((o, s) => o - s);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const a = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return a.length && n.length ? t = this.normalize(a.concat(n)) : t = a.length ? a : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (pn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return pn(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const rr = {
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
}, vh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, yh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...rr,
  ...vh
}, xh = jr[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ya(e) {
  return mi(e) ? Zn(e) : e;
}
function kh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return mi(t) ? new Proxy(e, {}) : e;
}
function _h(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function lr(e, t) {
  e.labels = t;
}
function cr(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function wh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return lr(a, e.labels), cr(a, e.datasets, t), a;
}
const Ch = ce({
  props: yh,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = oe(null), s = gi(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: m, datasetIdKey: b } = e, f = wh(d, b), p = kh(f, d);
      s.value = new ea(o.value, {
        type: c,
        data: p,
        options: {
          ...h
        },
        plugins: m
      });
    }, r = () => {
      const c = Zn(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return Je(i), st(r), Re([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, m] = c, [b, f] = d;
      const p = Zn(s.value);
      if (!p)
        return;
      let y = !1;
      if (h) {
        const v = ya(h), k = ya(b);
        v && v !== k && (_h(p, v), y = !0);
      }
      if (m) {
        const v = ya(m.labels), k = ya(f.labels), w = ya(m.datasets), _ = ya(f.datasets);
        v !== k && (lr(p.config.data, v), y = !0), w && w !== _ && (cr(p.config.data, w, e.datasetIdKey), y = !0);
      }
      y && We(() => {
        l(p);
      });
    }, {
      deep: !0
    }), () => Ne("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      Ne("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function To(e, t) {
  return ea.register(t), ce({
    props: rr,
    setup(a, n) {
      let { expose: o } = n;
      const s = gi(null), i = (r) => {
        s.value = r?.chart;
      };
      return o({
        chart: s
      }), () => Ne(Ch, xh({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const $h = /* @__PURE__ */ To("bar", fd), Sh = /* @__PURE__ */ To("line", pd), Mh = /* @__PURE__ */ To("pie", bd), Zs = {
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
}, Qs = {
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
}, Dh = [
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
function Me(e) {
  const t = oe("light");
  let a = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = $(() => e?.value ? e.value : t.value), s = $(() => o.value === "dark"), i = $(() => s.value ? Qs : Zs), r = () => {
    typeof document > "u" || (t.value = n(), a = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (t.value = n());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    a && (a.disconnect(), a = null);
  };
  return Je(() => {
    r();
  }), st(() => {
    l();
  }), e && Re(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Zs,
    darkColors: Qs,
    chartSeriesColors: Dh
  };
}
const Ga = 5, Bo = 8, Ah = /^x\d*$/, Th = /^y\d*$/;
function dr(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, r = i.ticks, l = r && typeof r == "object" ? { ...r } : {};
    if (Ah.test(o) && (l.maxTicksLimit = Bo, l.autoSkip = !0, l.minRotation = 0, l.maxRotation = 0, l.autoSkipPadding = l.autoSkipPadding ?? 8), Th.test(o)) {
      if (i.type === "category") {
        i.ticks = l, n[o] = i;
        continue;
      }
      if (Array.isArray(l.values) && l.values.length > 0)
        l.maxTicksLimit = l.values.length;
      else if (l.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(l.stepSize);
        d > c && h > 0 ? l.maxTicksLimit = Math.floor((d - c) / h) + 1 : l.maxTicksLimit = Ga;
      } else
        l.maxTicksLimit = Ga;
    }
    i.ticks = l, n[o] = i;
  }
  return t.scales = n, t;
}
const ct = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Bh = ["titleFont", "bodyFont", "footerFont"];
function ur(e, t = ct) {
  if (!e || typeof e != "object") return e;
  const a = { ...e }, n = typeof a.font == "object" && a.font !== null ? a.font : {};
  if (a.font = { ...n, family: t }, a.scales && typeof a.scales == "object") {
    const o = { ...a.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const r = { ...i }, l = r.ticks;
      if (l && typeof l == "object") {
        const d = { ...l }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, r.ticks = d;
      }
      const c = r.title;
      if (c && typeof c == "object") {
        const d = { ...c }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, r.title = d;
      }
      o[s] = r;
    }
    a.scales = o;
  }
  if (a.plugins && typeof a.plugins == "object") {
    const o = { ...a.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const r = { ...s }, l = r.labels;
      if (l && typeof l == "object") {
        const c = { ...l }, d = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...d, family: t }, r.labels = c;
      }
      o.legend = r;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const r = { ...i };
      for (const l of Bh) {
        const c = r[l];
        c && typeof c == "object" && (r[l] = { ...c, family: t });
      }
      o.tooltip = r;
    }
    a.plugins = o;
  }
  return a;
}
const Js = 10, Lh = /* @__PURE__ */ ce({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    uppercaseLegendLabels: { type: Boolean },
    theme: {},
    heightPx: {},
    categoryLabelMaxLength: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ea.register(sr, ir, Gu, nr, Ao, Do), ea.defaults.font.family = ct;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = $(() => a.data), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, r = (m) => typeof m != "string" ? m : a.uppercaseLegendLabels ? m.toUpperCase() : i(m), l = (m, b) => m.length <= b ? m : `${m.slice(0, Math.max(1, b - 1))}…`;
    function c(m, b) {
      if (b == null) return m;
      if (Array.isArray(b) || typeof b != "object" || m == null || Array.isArray(m) || typeof m != "object") return b;
      const f = { ...m };
      for (const p of Object.keys(b)) {
        const y = b[p];
        y !== void 0 && (f[p] = c(m[p], y));
      }
      return f;
    }
    const d = $(() => {
      const m = {
        font: {
          family: ct
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
                family: ct,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Js,
              boxHeight: Js,
              usePointStyle: !1,
              generateLabels: function(f) {
                return f.data.datasets.map((y, v) => {
                  const k = Array.isArray(y.backgroundColor) ? y.backgroundColor[0] : y.backgroundColor, w = Array.isArray(y.borderColor) ? y.borderColor[0] : y.borderColor, _ = typeof w == "string" && w.length > 0 ? w : typeof k == "string" && k.length > 0 ? k : o.value.textSecondary;
                  return {
                    text: r(y.label || ""),
                    fillStyle: typeof k == "string" ? k : _,
                    strokeStyle: _,
                    lineWidth: 0,
                    fontColor: _,
                    hidden: !f.isDatasetVisible(v),
                    index: v,
                    datasetIndex: v
                  };
                });
              }
            }
          },
          tooltip: {
            enabled: !0,
            backgroundColor: o.value.tooltipBg,
            titleColor: o.value.tooltipText,
            bodyColor: n.value ? "#d1d5db" : "#e2e8f0",
            borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: ct,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: ct,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(f) {
                return f.length > 0 ? String(i(f[0].label)) : "";
              },
              label: function(f) {
                let p = String(i(f.dataset.label || ""));
                p && (p += ": ");
                const v = (f.chart?.options?.indexAxis ?? "x") === "y" ? f.parsed.x : f.parsed.y;
                return v != null && (p += v), p;
              }
            }
          }
        },
        scales: {
          y: {
            type: "linear",
            display: !0,
            position: "left",
            beginAtZero: !0,
            stacked: a.stacked || !1,
            grid: {
              color: o.value.gridLines
            },
            ticks: {
              maxTicksLimit: Ga,
              font: {
                family: ct,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(f) {
                return i(f);
              }
            }
          },
          x: {
            display: !0,
            stacked: a.stacked || !1,
            offset: !0,
            grid: {
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: Bo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ct,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(f) {
                const p = this.getLabelForValue(f);
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
      }, b = a.options ? c(m, a.options) : m;
      if (b.indexAxis === "y") {
        b.scales = b.scales ?? {}, b.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...b.scales.x
        };
        const { beginAtZero: f, ticks: p, ...y } = b.scales.y ?? {}, v = a.data.labels?.length ?? 0, k = a.categoryLabelMaxLength ?? 20;
        b.scales.y = {
          type: "category",
          ...y,
          ticks: {
            ...p,
            autoSkip: !1,
            maxTicksLimit: v > 0 ? v : Ga,
            callback: function(w) {
              const _ = this.getLabelForValue(w), C = typeof _ == "string" ? _ : String(_ ?? "");
              return l(C, k);
            }
          }
        };
      }
      return ur(
        dr(b)
      );
    }), h = $(() => a.heightPx ?? 230);
    return t({ isDark: n }), (m, b) => (g(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: we({ height: `${h.value}px` })
    }, [
      N(B($h), {
        data: s.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), ve = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, $t = /* @__PURE__ */ ve(Lh, [["__scopeId", "data-v-1d64fb88"]]), Rh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Ph = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Ih = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Eh = ["aria-pressed", "aria-label", "onClick"], Fh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Oh = /* @__PURE__ */ ce({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ea.register(
      sr,
      ir,
      Wu,
      Hu,
      nr,
      Ao,
      Do
    ), ea.defaults.font.family = ct;
    const n = oe(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = $(() => s.value.bgCard), r = $(() => {
      const y = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((v) => {
          const k = v.borderColor, w = Array.isArray(k) ? k[0] : k, _ = typeof w == "string" && w.length > 0 ? w : s.value.textSecondary, C = v.pointBackgroundColor !== void 0 ? v.pointBackgroundColor : y, M = v.pointHoverBackgroundColor !== void 0 ? v.pointHoverBackgroundColor : C, S = v.pointBorderWidth ?? 2, P = v.pointHoverBorderWidth ?? S;
          return {
            ...v,
            fill: v.fill ?? !1,
            clip: v.clip ?? !1,
            pointBackgroundColor: C,
            pointHoverBackgroundColor: M,
            pointBorderColor: v.pointBorderColor ?? _,
            pointHoverBorderColor: v.pointHoverBorderColor ?? _,
            pointBorderWidth: S,
            pointHoverBorderWidth: P
          };
        })
      };
    }), l = (y) => typeof y == "string" ? y.charAt(0).toUpperCase() + y.slice(1).toLowerCase() : y, c = (y) => typeof y != "string" ? y : a.uppercaseLegendLabels ? y.toUpperCase() : l(y);
    function d(y) {
      const v = y.borderColor, k = Array.isArray(v) ? v[0] : v;
      return typeof k == "string" && k.length > 0 ? k : s.value.textSecondary;
    }
    const h = $(
      () => r.value.datasets.map((y, v) => ({
        key: `${y.label ?? "dataset"}-${v}`,
        label: c(y.label || ""),
        color: d(y)
      }))
    ), m = oe([]);
    Re(
      () => r.value.datasets.length,
      (y) => {
        const v = Array.from({ length: y }, (k, w) => m.value[w] ?? !0);
        m.value = v;
      },
      { immediate: !0 }
    );
    function b(y) {
      const k = n.value?.chart;
      if (!k || y < 0 || y >= k.data.datasets.length) return;
      const w = !k.isDatasetVisible(y);
      k.setDatasetVisibility(y, w), m.value[y] = w, k.update();
    }
    function f(y, v) {
      if (v == null) return y;
      if (Array.isArray(v) || typeof v != "object" || y == null || Array.isArray(y) || typeof y != "object") return v;
      const k = { ...y };
      for (const w of Object.keys(v)) {
        const _ = v[w];
        _ !== void 0 && (k[w] = f(y[w], _));
      }
      return k;
    }
    const p = $(() => {
      const y = {
        font: {
          family: ct
        },
        color: s.value.textSecondary,
        responsive: !0,
        maintainAspectRatio: !1,
        layout: {
          padding: {
            top: 8,
            bottom: 8,
            left: 4,
            right: 4
          }
        },
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
              family: ct,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: ct,
              size: 13
            },
            callbacks: {
              title: function(w) {
                return w.length > 0 ? String(l(w[0].label)) : "";
              },
              label: function(w) {
                let _ = String(l(w.dataset.label || ""));
                return _ && (_ += ": "), w.parsed.y !== null && (_ += w.parsed.y), _;
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
              maxTicksLimit: Bo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ct,
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
              maxTicksLimit: Ga,
              font: {
                family: ct,
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
      }, v = a.options ? f(y, a.options) : y;
      return ur(
        dr(v)
      );
    });
    return t({ isDark: o }), (y, v) => (g(), x("div", Rh, [
      u("div", Ph, [
        N(B(Sh), {
          ref_key: "lineChartRef",
          ref: n,
          data: r.value,
          options: p.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (g(), x("ul", Ih, [
        (g(!0), x(le, null, be(h.value, (k, w) => (g(), x("li", {
          key: k.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: Q(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[w] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: we({ color: k.color }),
            "aria-pressed": m.value[w] !== !1,
            "aria-label": `${k.label}. ${m.value[w] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (_) => b(w)
          }, [
            u("span", Fh, [
              v[0] || (v[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: we({ borderColor: k.color })
              }, null, 4),
              v[1] || (v[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(k.label), 1)
          ], 14, Eh)
        ]))), 128))
      ])) : F("", !0)
    ]));
  }
}), mt = /* @__PURE__ */ ve(Oh, [["__scopeId", "data-v-426e23d5"]]), Vh = { class: "chart-container" }, zh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Nh = /* @__PURE__ */ ce({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ea.register(Ru, Ao, Do);
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = $(() => a.options ? a.options : {
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
              family: zh,
              size: 13,
              weight: 500
            },
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              const c = l.data;
              return c.labels.length && c.datasets.length ? c.labels.map((d, h) => {
                const b = l.getDatasetMeta(0).controller.getStyle(h), p = c.datasets[0].data[h], y = typeof b.backgroundColor == "string" && b.backgroundColor.length > 0 ? b.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${p}`,
                  fillStyle: b.backgroundColor,
                  strokeStyle: b.borderColor,
                  lineWidth: b.borderWidth,
                  lineDash: b.borderDash,
                  lineDashOffset: b.borderDashOffset,
                  lineJoin: b.borderJoinStyle,
                  fontColor: y,
                  hidden: !l.getDataVisibility(h),
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
              const c = l.label || "", d = l.parsed || 0, h = l.dataset.data.reduce((b, f) => b + f, 0), m = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${m}%)`;
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
    return t({ isDark: n }), (l, c) => (g(), x("div", Vh, [
      N(B(Mh), {
        data: B(s),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Pn = /* @__PURE__ */ ve(Nh, [["__scopeId", "data-v-0f7806d6"]]), jh = { class: "chart-container" }, Hh = ["viewBox"], Wh = ["transform"], Kh = ["x", "width", "fill", "stroke"], Uh = ["fill"], Yh = ["x1", "y1", "x2", "y2", "stroke"], qh = ["points", "fill"], Xh = ["x1", "y1", "x2", "y2", "stroke"], Gh = ["x", "y", "fill"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["points", "fill"], Jh = ["transform"], ef = ["y1", "y2"], tf = ["y1", "y2"], af = ["y1", "y2"], nf = ["y1", "y2"], of = ["y", "height"], sf = ["y1", "y2"], rf = ["y1", "y2"], lf = ["y1", "y2"], cf = ["y1", "y2"], df = ["y", "height"], uf = ["cy", "stroke", "onMouseenter"], hf = ["cy", "stroke", "onMouseenter"], ff = ["cy", "stroke", "onMouseenter"], gf = ["cy", "stroke", "onMouseenter"], mf = ["y1", "y2", "onMouseenter"], pf = ["y1", "y2", "onMouseenter"], bf = ["x", "y", "fill"], vf = ["x", "y", "fill"], yf = ["transform"], xf = { transform: "translate(-200, 0)" }, kf = ["stroke"], _f = ["fill"], wf = { transform: "translate(-130, 0)" }, Cf = ["stroke"], $f = ["fill"], Sf = { transform: "translate(-60, 0)" }, Mf = ["stroke"], Df = ["fill"], Af = { transform: "translate(10, 0)" }, Tf = ["stroke"], Bf = ["fill"], Lf = { transform: "translate(80, 0)" }, Rf = ["fill"], Pf = { transform: "translate(150, 0)" }, If = ["fill"], Ef = /* @__PURE__ */ ce({
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
    const a = e, { isDark: n } = Me($e(a, "theme")), o = $(() => ({
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
    })), s = oe({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, r = (m, b) => {
      const f = m.currentTarget.closest("svg");
      if (!f) return;
      const p = f.getBoundingClientRect(), y = f.createSVGPoint();
      y.x = m.clientX - p.left, y.y = m.clientY - p.top, s.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: b
      };
    }, l = (m) => {
      if (s.value.visible) {
        const b = m.currentTarget, f = b.getBoundingClientRect(), p = b.createSVGPoint();
        p.x = m.clientX - f.left, p.y = m.clientY - f.top, s.value.x = p.x, s.value.y = p.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = $(() => {
      const m = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let p = 1; p <= 10; p++) {
        const y = p, v = (y - 1) / 9, k = a.chartMargin + f - v * f;
        m.push({ value: y, y: k });
      }
      return m;
    });
    return t({ isDark: n }), (m, b) => (g(), x("div", jh, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        s.value.visible ? (g(), x("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          u("rect", {
            x: -(s.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Kh),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Uh)
        ], 8, Wh)) : F("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Yh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, qh),
        (g(!0), x(le, null, be(h.value, (f, p) => (g(), x(le, { key: p }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xh),
          u("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, Gh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Zh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, Qh),
        (g(!0), x(le, null, be(e.boxplotData, (f, p) => (g(), x(le, { key: p }, [
          u("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (g(), x(le, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ef),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, tf),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, af),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, nf),
              u("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, of)
            ], 64)) : (g(), x(le, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, sf),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, rf),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, lf),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, cf),
              u("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, df)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, uf),
            u("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, hf),
            u("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, ff),
            u("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, gf),
            u("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, mf),
            f.averageY ? (g(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, pf)) : F("", !0)
          ], 8, Jh),
          u("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, bf),
          f.responseCount ? (g(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, vf)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (g(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", xf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, kf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, _f)
          ]),
          u("g", wf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Cf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, $f)
          ]),
          u("g", Sf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Mf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Df)
          ]),
          u("g", Af, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Tf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Bf)
          ]),
          u("g", Lf, [
            b[0] || (b[0] = u("line", {
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Rf)
          ]),
          u("g", Pf, [
            b[1] || (b[1] = u("line", {
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, If)
          ])
        ], 8, yf)) : F("", !0)
      ], 44, Hh))
    ]));
  }
}), Ff = /* @__PURE__ */ ve(Ef, [["__scopeId", "data-v-9ac5c075"]]), Of = { class: "chart-container" }, Vf = ["viewBox"], zf = ["x1", "y1", "x2", "y2", "stroke"], Nf = ["points", "fill"], jf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["x1", "y1", "x2", "y2", "stroke"], Wf = ["x", "y", "fill"], Kf = ["x", "y", "fill", "transform"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["points", "fill"], qf = ["transform"], Xf = ["y1", "y2", "stroke", "onMouseenter"], Gf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Zf = ["x1", "y1", "x2", "y2", "onMouseenter"], Qf = ["x1", "y1", "x2", "y2", "onMouseenter"], Jf = ["cy", "stroke", "onMouseenter"], eg = ["cy", "stroke", "onMouseenter"], tg = ["x", "y", "fill"], ag = ["x", "y", "fill"], ng = ["transform"], og = { transform: "translate(-180, 0)" }, sg = ["stroke"], ig = ["fill"], rg = { transform: "translate(-120, 0)" }, lg = ["fill"], cg = { transform: "translate(-60, 0)" }, dg = ["fill"], ug = { transform: "translate(0, 0)" }, hg = ["stroke"], fg = ["fill"], gg = { transform: "translate(60, 0)" }, mg = ["fill"], pg = { transform: "translate(130, 0)" }, bg = ["fill"], vg = ["transform"], yg = ["x", "y", "width", "height", "fill", "stroke"], xg = ["y", "fill"], kg = ["y", "fill"], bn = 10, _g = 14, qn = 13, ei = 4, ti = 12, wg = /* @__PURE__ */ ce({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = bn + qn + ei + ti + bn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(k, w, _) {
      const C = _ ? 0.6 : 0.535;
      return Math.ceil(Math.max(k, 1) * w * C);
    }
    function l(k, w) {
      return Math.max(
        r(k.length, qn, !0),
        r(w.length, ti, !1),
        52
      ) + _g * 2;
    }
    function c(k, w, _, C) {
      const M = _ / 2, S = 6, P = Math.min(
        Math.max(k, M + S),
        a.chartWidth - M - S
      ), I = S + C + 10, V = a.chartHeight - S + 10, D = Math.min(Math.max(w, I), V);
      return { x: P, y: D };
    }
    const d = $(() => ({
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
    })), h = oe({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), m = (k) => typeof k == "string" ? k.charAt(0).toUpperCase() + k.slice(1).toLowerCase() : k, b = (k, w, _) => {
      const C = k.currentTarget.closest("svg");
      if (!C) return;
      const M = C.getBoundingClientRect(), S = C.createSVGPoint();
      S.x = k.clientX - M.left, S.y = k.clientY - M.top;
      let P = m(w.label), I = "";
      switch (_) {
        case "body":
          I = `Q1: ${w.q1.toFixed(1)} | Q3: ${w.q3.toFixed(1)}`;
          break;
        case "wick":
          I = `Min: ${w.low.toFixed(1)} | Max: ${w.high.toFixed(1)}`;
          break;
        case "median":
          I = `Median: ${w.median.toFixed(1)}`;
          break;
        case "average":
          I = `Average: ${w.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          I = `Min: ${w.low.toFixed(1)}`;
          break;
        case "max":
          I = `Max: ${w.high.toFixed(1)}`;
          break;
      }
      const V = l(P, I), D = s;
      let L = S.x, T = S.y - 20;
      const j = c(L, T, V, D);
      L = j.x, T = j.y, h.value = {
        visible: !0,
        x: L,
        y: T,
        title: P,
        text: I,
        width: V,
        height: D
      };
    }, f = (k) => {
      if (h.value.visible) {
        const w = k.currentTarget, _ = w.getBoundingClientRect(), C = w.createSVGPoint();
        C.x = k.clientX - _.left, C.y = k.clientY - _.top;
        let M = C.x, S = C.y - 20;
        const P = c(M, S, h.value.width, h.value.height);
        h.value.x = P.x, h.value.y = P.y;
      }
    }, p = () => {
      h.value.visible = !1;
    }, y = () => {
      h.value.visible = !1;
    }, v = $(() => {
      const k = [], _ = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let C = 1; C <= 10; C++) {
        const M = C, S = (M - 1) / 9, P = a.chartMargin + _ - S * _;
        k.push({ value: M, y: P });
      }
      return k;
    });
    return t({ isDark: n }), (k, w) => (g(), x("div", Of, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: we(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: f,
        onMouseleave: p
      }, [
        w[4] || (w[4] = u("defs", null, [
          u("filter", {
            id: "candlestick-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            u("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, zf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Nf),
        (g(!0), x(le, null, be(v.value, (_, C) => (g(), x("line", {
          key: `grid-${C}`,
          x1: e.chartMargin,
          y1: _.y,
          x2: e.chartWidth - e.chartMargin,
          y2: _.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, jf))), 128)),
        (g(!0), x(le, null, be(v.value, (_, C) => (g(), x(le, { key: C }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: _.y,
            x2: e.chartMargin,
            y2: _.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Hf),
          u("text", {
            x: e.chartMargin - 12,
            y: _.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(_.value), 9, Wf)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(m(e.yAxisLabel)), 9, Kf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Uf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Yf),
        (g(!0), x(le, null, be(e.candlestickData, (_, C) => (g(), x(le, { key: C }, [
          u("g", {
            transform: `translate(${_.centerX}, 0)`
          }, [
            u("line", {
              x1: 0,
              y1: _.highY,
              x2: 0,
              y2: _.lowY,
              stroke: _.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (M) => b(M, _, "wick"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Xf),
            u("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(_.q1Y, _.q3Y) - (Math.abs(_.q3Y - _.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(_.q3Y - _.q1Y)),
              fill: _.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: _.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (M) => b(M, _, "body"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Gf),
            _.medianY ? (g(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: _.medianY,
              x2: e.candleWidth / 2,
              y2: _.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (M) => b(M, _, "median"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Zf)) : F("", !0),
            _.averageY ? (g(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: _.averageY,
              x2: e.candleWidth / 2,
              y2: _.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (M) => b(M, _, "average"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Qf)) : F("", !0),
            u("circle", {
              cx: 0,
              cy: _.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => b(M, _, "min"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Jf),
            u("circle", {
              cx: 0,
              cy: _.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => b(M, _, "max"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, eg)
          ], 8, qf),
          u("text", {
            x: _.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(m(_.label)), 9, tg),
          _.responseCount ? (g(), x("text", {
            key: 0,
            x: _.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(_.responseCount), 9, ag)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (g(), x("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", og, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, sg),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, ig)
          ]),
          u("g", rg, [
            w[0] || (w[0] = u("rect", {
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
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, lg)
          ]),
          u("g", cg, [
            w[1] || (w[1] = u("rect", {
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
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, dg)
          ]),
          u("g", ug, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, hg),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, fg)
          ]),
          u("g", gg, [
            w[2] || (w[2] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, mg)
          ]),
          u("g", pg, [
            w[3] || (w[3] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, bg)
          ])
        ], 8, ng)) : F("", !0),
        h.value.visible ? (g(), x("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          u("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, yg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + bn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, xg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + bn + qn + ei,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, kg)
        ], 8, vg)) : F("", !0)
      ], 44, Vf))
    ]));
  }
}), Cg = /* @__PURE__ */ ve(wg, [["__scopeId", "data-v-22efd66d"]]), $g = ["viewBox"], Sg = ["x1", "y1", "x2", "y2", "stroke"], Mg = ["x1", "y1", "x2", "y2", "stroke"], Dg = ["points", "fill"], Ag = ["x1", "y1", "x2", "y2", "stroke"], Tg = ["x", "y", "fill"], Bg = ["x", "y", "fill", "transform"], Lg = ["x1", "y1", "x2", "y2", "stroke"], Rg = ["points", "fill"], Pg = ["x1", "y1", "x2", "y2", "stroke"], Ig = ["x", "y", "fill"], Eg = ["x", "y", "fill"], Fg = ["d"], Og = ["x", "y", "width", "height", "onMouseenter"], Vg = ["x1", "y1", "x2", "y2"], zg = ["x", "y"], Ng = ["x1", "y1", "x2", "y2"], jg = ["x", "y"], Hg = ["x1", "y1", "x2", "y2"], Wg = ["x", "y"], Kg = ["x1", "y1", "x2", "y2"], Ug = ["x", "y"], Yg = ["x1", "y1", "x2", "y2"], qg = ["x", "y"], Xg = ["x1", "y1", "x2", "y2"], Gg = ["x", "y"], Zg = ["transform"], Qg = { transform: "translate(-220, 0)" }, Jg = ["fill"], em = { transform: "translate(-140, 0)" }, tm = ["fill"], am = { transform: "translate(-80, 0)" }, nm = ["fill"], om = { transform: "translate(-20, 0)" }, sm = ["fill"], im = { transform: "translate(60, 0)" }, rm = ["fill"], lm = { transform: "translate(130, 0)" }, cm = ["fill"], dm = { transform: "translate(180, 0)" }, um = ["fill"], hm = ["transform"], fm = ["x", "y", "width", "height", "fill", "stroke"], gm = ["y", "fill"], mm = ["y", "fill"], vn = 10, pm = 14, Xn = 13, ai = 12, ni = 4, bm = /* @__PURE__ */ ce({
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
    chartMarginRight: { default: void 0 },
    chartBottomMargin: { default: 80 },
    plotInset: { default: 6 },
    showLegend: { type: Boolean, default: !0 },
    showStatLabels: { type: Boolean, default: !0 },
    interactive: { type: Boolean, default: !0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = vn + Xn + ni + ai + vn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(G, W, J) {
      const he = J ? 0.6 : 0.535;
      return Math.ceil(Math.max(G, 1) * W * he);
    }
    function l(G, W) {
      return Math.max(
        r(G.length, Xn, !0),
        r(W.length, ai, !1),
        52
      ) + pm * 2;
    }
    function c(G, W, J, he) {
      const me = J / 2, O = 6, ee = Math.min(
        Math.max(G, me + O),
        a.chartWidth - me - O
      ), se = O + he + 10, pe = a.chartHeight - O + 10, Ce = Math.min(Math.max(W, se), pe);
      return { x: ee, y: Ce };
    }
    const d = $(() => ({
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
    })), h = oe({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), m = $(
      () => a.chartMarginRight ?? a.chartMargin
    ), b = $(() => a.chartMargin + a.plotInset), f = $(
      () => a.chartWidth - m.value - a.plotInset
    ), p = $(() => Math.max(f.value - b.value, 1)), y = $(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), v = $(() => p.value / 10 * 0.52);
    function k(G) {
      if (G < 1 || G > 10) return null;
      const W = p.value / 10;
      return b.value + (G - 0.5) * W;
    }
    const w = $(
      () => Array.from({ length: 10 }, (G, W) => {
        const J = W + 1, he = k(J);
        return he === null ? null : { score: J, x: he };
      }).filter((G) => G !== null)
    ), _ = $(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const G = Math.max(...a.histogram.map((J) => J.count || 0), 1), W = Math.max(1, Math.ceil(G * 0.2));
      return G + W;
    }), C = $(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const G = a.averageScore || 0;
      let W = 0, J = 0;
      if (a.histogram.forEach((me) => {
        const O = me.count || 0;
        W += O;
        const ee = me.score - G;
        J += O * (ee * ee);
      }), W === 0) return 1;
      const he = J / W;
      return Math.sqrt(he) || 1;
    }), M = (G, W, J) => {
      if (J === 0) return 0;
      const he = 1 / (J * Math.sqrt(2 * Math.PI)), me = -0.5 * Math.pow((G - W) / J, 2);
      return he * Math.exp(me);
    }, S = $(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && C.value === 0) return null;
      const G = a.averageScore, W = C.value, J = 100, me = Math.max(...a.histogram.map((pe) => pe.count || 0), 1) / _.value * y.value;
      if (me <= 0) return null;
      let O = 0;
      for (let pe = 0; pe <= J; pe++) {
        const Ce = 1 + 9 * (pe / J), _e = M(Ce, G, W);
        _e > O && (O = _e);
      }
      if (O <= 0) return null;
      const ee = me / O, se = [];
      for (let pe = 0; pe <= J; pe++) {
        const Ce = 1 + 9 * (pe / J), _e = M(Ce, G, W) * ee, Be = k(Ce);
        if (Be !== null) {
          const Le = a.chartHeight - a.chartBottomMargin - _e;
          se.push(`${pe === 0 ? "M" : "L"} ${Be} ${Le}`);
        }
      }
      return se.join(" ");
    }), P = $(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const G = p.value / 10;
      return a.histogram.map((W) => {
        const J = Number(W.score);
        if (!Number.isFinite(J) || J < 1 || J > 10)
          return null;
        const he = b.value + (J - 0.5) * G, me = W.count > 0 ? W.count / _.value * y.value : 0, O = a.chartHeight - a.chartBottomMargin - me;
        return {
          score: J,
          count: W.count,
          x: he,
          y: O,
          height: me
        };
      }).filter((W) => W !== null);
    }), I = $(() => k(a.minScore)), V = $(() => k(a.maxScore)), D = $(() => k(a.q1Score)), L = $(() => k(a.medianScore)), T = $(() => k(a.q3Score)), j = $(() => k(a.averageScore)), H = $(() => a.minScore), X = $(() => a.maxScore), ie = $(() => a.q1Score), ue = $(() => a.medianScore), q = $(() => a.q3Score), ne = $(() => a.averageScore), R = $(() => {
      const G = [], W = a.chartMargin - 8, J = 18;
      D.value !== null && G.push({
        x: D.value,
        y: W,
        value: a.q1Score,
        label: `Q1: ${ie.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && G.push({
        x: L.value,
        y: W - J,
        value: a.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), j.value !== null && G.push({
        x: j.value,
        y: W - J,
        value: a.averageScore,
        label: `Avg: ${ne.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), T.value !== null && G.push({
        x: T.value,
        y: W,
        value: a.q3Score,
        label: `Q3: ${q.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), G.sort((O, ee) => (O.x || 0) - (ee.x || 0));
      const he = [[], [], []];
      G.forEach((O) => {
        if (O.x === null) return;
        let ee = -1;
        for (let se = 0; se < he.length; se++) {
          let pe = !1;
          for (const Ce of he[se]) {
            if (Ce.x === null) continue;
            const _e = Math.abs(O.x - Ce.x), Be = (O.width + Ce.width) / 2 + 10;
            if (_e < Be) {
              pe = !0;
              break;
            }
          }
          if (!pe) {
            ee = se;
            break;
          }
        }
        ee === -1 && (ee = he.length - 1), O.y = W - ee * J, he[ee].push(O);
      });
      const me = 15;
      return G.forEach((O) => {
        O.y < me && (O.y = me);
      }), G;
    }), K = (G) => R.value.find((J) => J.id === G)?.y || a.chartMargin - 10, U = $(() => {
      const G = [];
      for (let J = 0; J <= 5; J++) {
        const he = Math.round(_.value / 5 * J), me = a.chartHeight - a.chartBottomMargin - J / 5 * y.value;
        G.push({ value: he, y: me });
      }
      return G;
    });
    function Y(G, W, J) {
      const he = G.createSVGPoint();
      he.x = W, he.y = J;
      const me = G.getScreenCTM();
      if (!me) {
        const ee = G.getBoundingClientRect();
        return { x: W - ee.left, y: J - ee.top };
      }
      const O = he.matrixTransform(me.inverse());
      return { x: O.x, y: O.y };
    }
    const de = (G, W) => {
      a.interactive && te(G, W);
    }, ge = () => {
      a.interactive && re();
    }, te = (G, W) => {
      const J = G.currentTarget.closest("svg");
      if (!J) return;
      const { x: he, y: me } = Y(J, G.clientX, G.clientY), O = `Score: ${W.score}`, ee = `Count: ${Number(W.count ?? 0).toLocaleString()}`, se = l(O, ee), pe = s, Ce = typeof W?.x == "number" ? W.x : he;
      let _e = me - 20;
      const Be = c(Ce, _e, se, pe);
      h.value = {
        visible: !0,
        x: Be.x,
        y: Be.y,
        title: O,
        text: ee,
        width: se,
        height: pe,
        anchorX: typeof W?.x == "number" ? W.x : null
      };
    }, z = (G) => {
      if (a.interactive && h.value.visible) {
        const W = G.currentTarget, { x: J, y: he } = Y(W, G.clientX, G.clientY), me = h.value.anchorX, O = me != null && Number.isFinite(me) ? me : J;
        let ee = he - 20;
        const se = c(O, ee, h.value.width, h.value.height);
        h.value.x = se.x, h.value.y = se.y;
      }
    }, Z = () => {
      re();
    }, re = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: n }), (G, W) => (g(), x("div", {
      class: Q(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: z,
        onMouseleave: Z
      }, [
        W[7] || (W[7] = u("defs", null, [
          u("filter", {
            id: "histogram-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            u("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        (g(!0), x(le, null, be(U.value, (J, he) => (g(), x("line", {
          key: `grid-${he}`,
          x1: b.value,
          y1: J.y,
          x2: f.value,
          y2: J.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Sg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Mg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Dg),
        (g(!0), x(le, null, be(U.value, (J, he) => (g(), x(le, {
          key: `y-tick-${he}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: J.y,
            x2: e.chartMargin,
            y2: J.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Ag),
          u("text", {
            x: e.chartMargin - 12,
            y: J.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.value), 9, Tg)
        ], 64))), 128)),
        u("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Bg),
        u("line", {
          x1: b.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: f.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Lg),
        u("polygon", {
          points: `${f.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${f.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${f.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Rg),
        (g(!0), x(le, null, be(w.value, (J) => (g(), x(le, {
          key: `tick-${J.score}`
        }, [
          u("line", {
            x1: J.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: J.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Pg),
          u("text", {
            x: J.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.score), 9, Ig)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Eg),
        S.value ? (g(), x("path", {
          key: 0,
          d: S.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Fg)) : F("", !0),
        (g(!0), x(le, null, be(P.value, (J, he) => (g(), x("rect", {
          key: `bar-${he}`,
          x: J.x - v.value / 2,
          y: J.y,
          width: v.value,
          height: J.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (me) => de(me, J),
          onMouseleave: ge,
          style: we({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Og))), 128)),
        e.showStatLabels && I.value ? (g(), x("line", {
          key: 1,
          x1: I.value,
          y1: e.chartMargin,
          x2: I.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Vg)) : F("", !0),
        e.showStatLabels && I.value ? (g(), x("text", {
          key: 2,
          x: I.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(H.value.toFixed(1)), 9, zg)) : F("", !0),
        e.showStatLabels && D.value ? (g(), x("line", {
          key: 3,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Ng)) : F("", !0),
        e.showStatLabels && D.value ? (g(), x("text", {
          key: 4,
          x: D.value,
          y: K("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(ie.value.toFixed(1)), 9, jg)) : F("", !0),
        e.showStatLabels && L.value ? (g(), x("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Hg)) : F("", !0),
        e.showStatLabels && L.value ? (g(), x("text", {
          key: 6,
          x: L.value,
          y: K("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(ue.value.toFixed(1)), 9, Wg)) : F("", !0),
        e.showStatLabels && j.value ? (g(), x("line", {
          key: 7,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Kg)) : F("", !0),
        e.showStatLabels && j.value ? (g(), x("text", {
          key: 8,
          x: j.value,
          y: K("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(ne.value.toFixed(1)), 9, Ug)) : F("", !0),
        e.showStatLabels && T.value ? (g(), x("line", {
          key: 9,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Yg)) : F("", !0),
        e.showStatLabels && T.value ? (g(), x("text", {
          key: 10,
          x: T.value,
          y: K("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(q.value.toFixed(1)), 9, qg)) : F("", !0),
        e.showStatLabels && V.value ? (g(), x("line", {
          key: 11,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Xg)) : F("", !0),
        e.showStatLabels && V.value ? (g(), x("text", {
          key: 12,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(X.value.toFixed(1)), 9, Gg)) : F("", !0),
        e.showLegend ? (g(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Qg, [
            W[0] || (W[0] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, Jg)
          ]),
          u("g", em, [
            W[1] || (W[1] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, tm)
          ]),
          u("g", am, [
            W[2] || (W[2] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, nm)
          ]),
          u("g", om, [
            W[3] || (W[3] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, sm)
          ]),
          u("g", im, [
            W[4] || (W[4] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, rm)
          ]),
          u("g", lm, [
            W[5] || (W[5] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, cm)
          ]),
          u("g", dm, [
            W[6] || (W[6] = u("line", {
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
              fill: d.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, um)
          ])
        ], 8, Zg)) : F("", !0),
        e.interactive && h.value.visible ? (g(), x("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${h.value.x}, ${h.value.y})`
        }, [
          u("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -h.value.width / 2,
            y: -h.value.height - 10,
            width: h.value.width,
            height: h.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, fm),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + vn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, gm),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + vn + Xn + ni,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, mm)
        ], 8, hm)) : F("", !0)
      ], 44, $g))
    ], 2));
  }
}), hr = /* @__PURE__ */ ve(bm, [["__scopeId", "data-v-8f9da805"]]), vm = 639, fr = 1024;
function oi(e) {
  return e < 640 ? "mobile" : e <= fr ? "tablet" : "desktop";
}
function ym() {
  const e = oe(
    typeof window > "u" ? "desktop" : oi(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = oi(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Je(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${vm}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${fr}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, a.addEventListener("change", s), n.addEventListener("change", s), o.addEventListener("change", s));
  }), st(() => {
    !s || !a || !n || !o || (a.removeEventListener("change", s), n.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = $(() => e.value === "mobile"), r = $(() => e.value === "tablet"), l = $(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: r,
    isDesktop: l
  };
}
const Lt = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${Lt(e, t)})`, xm = { class: "chart-container" }, km = {
  key: 0,
  class: "loading-state loading-overlay"
}, la = 12, _m = /* @__PURE__ */ ce({
  __name: "SankeyChart",
  props: {
    data: { default: () => ({ nodes: [], links: [] }) },
    title: { default: "" },
    height: { default: "500px" },
    nodeColors: { default: () => ({}) },
    useGradient: { type: Boolean, default: !0 },
    nodeGap: { default: 16 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    Eo.use([Kr, Ur, Yr, qr]);
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = ym(), i = oe(null), r = oe(!0), l = oe(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "2%", bottom: "2%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, m = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, b = {
      success: 0,
      abandon: 1,
      error: 2
    }, f = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, p = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, y = $(() => {
      const z = s.value;
      return z === "mobile" ? {
        orient: "vertical",
        nodeWidth: 18,
        nodeGap: 12,
        labelPosition: "right",
        labelFontSize: 10,
        edgeLabelShow: !0,
        edgeLabelFontSize: 8,
        labelWrap: !0,
        labelCharsPerLine: 10,
        labelLineHeight: 12,
        labelTextWidth: 200,
        labelDistance: 6,
        contentMargins: { left: 10, right: 10, top: 28, bottom: 20 }
      } : z === "tablet" ? {
        orient: "horizontal",
        nodeWidth: 72,
        nodeGap: 20,
        labelPosition: "inside",
        labelFontSize: 11,
        edgeLabelShow: !0,
        edgeLabelFontSize: 10,
        labelWrap: !0,
        labelCharsPerLine: 11,
        labelLineHeight: 14,
        labelTextWidth: 0,
        labelDistance: 0,
        contentMargins: { ...h.margins }
      } : {
        orient: "horizontal",
        nodeWidth: h.node.width,
        nodeGap: a.nodeGap,
        labelPosition: "inside",
        labelFontSize: 11,
        edgeLabelShow: !0,
        edgeLabelFontSize: 10,
        labelWrap: !0,
        labelCharsPerLine: 12,
        labelLineHeight: 15,
        labelTextWidth: 0,
        labelDistance: 0,
        contentMargins: { ...h.margins }
      };
    }), v = (z) => {
      const Z = z.replace(/_/g, " ").replace(/\s+/g, " ").trim(), re = Z.match(/^Failed:\s*(.+)$/i);
      return re ? `Failed:
${re[1].trim()}` : Z;
    }, k = (z, Z) => {
      const re = z.trim();
      if (!re || Z < 1 || re.length <= Z) return re;
      const G = [];
      let W = 0;
      for (; W < re.length; ) {
        const J = Math.min(W + Z, re.length);
        if (J >= re.length) {
          const O = re.slice(W).trim();
          O && G.push(O);
          break;
        }
        const he = re.slice(W, J), me = he.lastIndexOf(" ");
        if (me > 0)
          for (G.push(re.slice(W, W + me).trim()), W += me; W < re.length && re[W] === " "; ) W += 1;
        else
          G.push(he), W = J;
      }
      return G.join(`
`);
    }, w = (z, Z) => {
      const re = z.trim();
      return !re || Z < 1 ? z : re.split(`
`).map((G) => k(G.trim(), Z)).filter(Boolean).join(`
`);
    }, _ = (z) => z.status ? z.status : f.test(z.name) ? "abandon" : p.test(z.name) ? "error" : "success", C = (z) => z.originalValue ?? z.value, M = (z, Z) => {
      const re = new Set(Z.map((W) => W.target)), G = z.filter((W) => !re.has(W.name));
      for (const W of G) {
        if (typeof W.value == "number" && W.value > 0) return W.value;
        const J = Z.filter((he) => he.source === W.name);
        if (J.length > 0)
          return J.reduce((he, me) => he + C(me), 0);
      }
      return Z.reduce((W, J) => Math.max(W, C(J)), 0);
    }, S = (z, Z) => {
      const re = /* @__PURE__ */ new Map(), G = new Set(Z.map((J) => J.target)), W = z.filter((J) => !G.has(J.name)).map((J) => ({ name: J.name, depth: 0 }));
      for (; W.length > 0; ) {
        const { name: J, depth: he } = W.shift(), me = re.get(J);
        if (!(me !== void 0 && me >= he)) {
          re.set(J, he);
          for (const O of Z)
            O.source === J && W.push({ name: O.target, depth: he + 1 });
        }
      }
      for (const J of z)
        re.has(J.name) || re.set(J.name, 0);
      return re;
    }, P = (z, Z) => {
      const re = /* @__PURE__ */ new Map(), G = new Set(Z.map((me) => me.target)), W = z.filter((me) => !G.has(me.name));
      let J = 0;
      const he = (me) => {
        let O = me;
        for (; O && !re.has(O); )
          re.set(O, J), J += 1, O = Z.filter(
            (se) => se.source === O && _({ name: se.target }) === "success"
          ).sort((se, pe) => C(pe) - C(se))[0]?.target;
      };
      return W.forEach((me) => he(me.name)), re;
    }, I = (z, Z, re) => {
      const G = _(z);
      if (G === "success" && re.has(z.name))
        return re.get(z.name);
      if (G === "success") {
        const W = Z.filter((he) => he.target === z.name);
        return 200 + (W.length ? Math.min(
          ...W.map(
            (he) => re.has(he.source) ? (re.get(he.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return G === "abandon" ? 1e3 : 2e3;
    }, V = (z, Z) => {
      const re = S(z, Z), G = P(z, Z);
      return [...z].sort((W, J) => {
        const he = re.get(W.name) ?? 0, me = re.get(J.name) ?? 0;
        if (he !== me) return he - me;
        const O = b[_(W)], ee = b[_(J)];
        if (O !== ee) return O - ee;
        const se = I(W, Z, G), pe = I(J, Z, G);
        if (se !== pe) return se - pe;
        const Ce = typeof W.order == "number" ? W.order : Number.MAX_SAFE_INTEGER, _e = typeof J.order == "number" ? J.order : Number.MAX_SAFE_INTEGER;
        return Ce !== _e ? Ce - _e : W.name.localeCompare(J.name);
      });
    }, D = (z, Z, re, G) => {
      const J = w(z, G).split(`
`), he = Z * 0.58, O = Math.max(...J.map((se) => se.length), 1) * he, ee = J.length * re;
      return {
        lines: J,
        width: O,
        height: ee,
        nodeWidth: O + la * 2
      };
    }, L = (z, Z, re, G) => {
      const W = typeof z.label == "string" && z.label ? z.label : z.name, J = `${v(W)}
(${Lt(re, G)})`;
      return w(J, Z);
    }, T = (z, Z) => {
      const re = Z.filter((G) => G.target === z.name);
      return re.length > 0 ? re.reduce((G, W) => G + C(W), 0) : typeof z.value == "number" ? z.value : Z.filter((G) => G.source === z.name).reduce((G, W) => G + C(W), 0);
    }, j = (z, Z, re) => {
      const G = Z.find((W) => W.name === z);
      return G ? T(G, re) : re.filter((W) => W.source === z).reduce((W, J) => W + C(J), 0);
    }, H = (z, Z, re, G) => {
      const W = j(z, re, G);
      return `${Z.toLocaleString()} (${Lt(Z, W)})`;
    }, X = (z, Z = 0) => {
      if (Z > 0) return Z;
      const re = z.match(/^(\d+(?:\.\d+)?)px$/);
      if (re) return Number(re[1]);
      const G = z.match(/^(\d+(?:\.\d+)?)vh$/);
      return G && typeof window < "u" ? Number(G[1]) / 100 * window.innerHeight : 500;
    }, ie = (z, Z, re, G, W) => {
      if (!Z.length || !z.length || W <= 0) return z;
      const J = z.map((_e) => ({ ..._e })), he = re.labelLineHeight || Math.round(re.labelFontSize * 1.25), me = Math.max(4, re.labelCharsPerLine), O = Math.max(G * 0.88, 260), ee = S(Z, J), se = /* @__PURE__ */ new Map();
      Z.forEach((_e) => {
        const Be = ee.get(_e.name) ?? 0;
        se.set(Be, (se.get(Be) ?? 0) + 1);
      });
      const pe = (_e) => {
        const Le = Z.find((oa) => oa.name === _e)?.displayLabel || _e, Nt = D(Le, re.labelFontSize, he, me).height + la * 2, pa = ee.get(_e) ?? 0, tn = se.get(pa) ?? 1, an = (Math.max(tn, 1) - 1) * re.nodeGap / Math.max(tn, 1), In = Math.max(O - an, Nt);
        return Math.max(1, Nt / In * W);
      }, Ce = (_e) => {
        const Be = J.filter((Le) => Le.target === _e);
        return Be.length > 0 ? Be.reduce((Le, qe) => Le + qe.value, 0) : J.filter((Le) => Le.source === _e).reduce((Le, qe) => Le + qe.value, 0);
      };
      for (let _e = 0; _e < 16; _e += 1) {
        let Be = !1;
        for (const Le of Z) {
          const qe = pe(Le.name), Nt = Ce(Le.name);
          if (Nt >= qe) continue;
          const pa = J.filter((oa) => oa.target === Le.name), tn = J.filter((oa) => oa.source === Le.name), an = pa.length > 0 ? pa : tn;
          if (an.length === 0) continue;
          const In = qe / Math.max(Nt, 1e-6);
          an.forEach((oa) => {
            oa.value *= In;
          }), Be = !0;
        }
        if (!Be) break;
      }
      return J;
    }, ue = (z, Z, re) => {
      const G = M(z, Z), W = V(z, Z), J = re.labelLineHeight || Math.round(re.labelFontSize * 1.25), he = Math.max(4, re.labelCharsPerLine);
      let me = re.nodeWidth;
      const O = [], ee = W.map((pe, Ce) => {
        const _e = _(pe), Be = L(
          pe,
          he,
          T(pe, Z),
          G
        );
        O.push(Be);
        const Le = D(Be, re.labelFontSize, J, he);
        re.orient === "vertical" ? me = Math.max(me, Le.height + la * 2) : me = Math.max(me, Le.nodeWidth);
        const qe = a.nodeColors[pe.name] || m[_e] || q[Ce % q.length], Nt = Math.max(Math.ceil(Le.nodeWidth - la * 2), 48);
        return {
          ...pe,
          displayLabel: Be,
          label: {
            width: Nt,
            overflow: "none",
            lineHeight: J,
            fontSize: re.labelFontSize
          },
          itemStyle: {
            color: qe,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let se = { ...re.contentMargins };
      if (re.orient === "vertical") {
        const pe = Math.max(
          ...O.map(
            (_e) => D(_e, re.labelFontSize, J, he).width
          ),
          0
        ), Ce = typeof se.right == "number" ? se.right : 10;
        se = {
          ...se,
          right: Math.max(Ce, pe + la + re.labelDistance)
        };
      }
      return { nodes: ee, maxNodeWidth: me, contentMargins: se, originTotal: G };
    }, q = [
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
    ], ne = () => {
      const z = a.data.links.filter(
        (W) => W.source && W.target && typeof W.value == "number"
      ), Z = Math.max(...z.map((W) => W.value), 1), re = Math.max(1, Z * 0.01), G = z.map((W) => ({
        ...W,
        originalValue: W.value,
        value: W.value < Z * 0.01 ? re : W.value
      }));
      return {
        nodes: a.data.nodes.filter((W) => W.name),
        links: G
      };
    }, R = (z, Z, re) => (G) => {
      const W = G.dataType === "node", J = o.value.tooltipText, he = n.value ? "#d1d5db" : "#e2e8f0";
      if (W) {
        const pe = Z.filter((Le) => Le.target === G.name), Ce = Z.filter((Le) => Le.source === G.name), _e = pe.length > 0 ? pe.reduce((Le, qe) => Le + (qe.originalValue || qe.value), 0) : Ce.reduce((Le, qe) => Le + (qe.originalValue || qe.value), 0), Be = Lt(_e, re);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${J};">${G.name} (${Be})</div><div style="color: ${he}; font-size: 12px;">Count: ${_e.toLocaleString()}</div>`;
      }
      const me = G.data?.source || G.source || "Unknown", O = G.data?.target || G.target || "Unknown", ee = Number(G.data?.originalValue ?? G.data?.value ?? G.value ?? 0), se = H(me, ee, z, Z);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${J};">${me} → ${O}</div><div style="color: ${he}; font-size: 12px;">Flow: ${se}</div>`;
    }, K = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const z = y.value, Z = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", re = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", G = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", W = z.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: J, links: he } = ne(), { nodes: me, maxNodeWidth: O, contentMargins: ee, originTotal: se } = ue(
          J,
          he,
          z
        ), pe = X(a.height, i.value?.clientHeight ?? 0), Ce = ie(
          he,
          me,
          {
            labelFontSize: z.labelFontSize,
            labelLineHeight: z.labelLineHeight || Math.round(z.labelFontSize * 1.25),
            labelCharsPerLine: z.labelCharsPerLine,
            nodeGap: z.nodeGap
          },
          pe,
          se
        ), _e = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: R(J, Ce, se),
            backgroundColor: o.value.tooltipBg,
            borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              data: me,
              links: Ce,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: re,
                  opacity: 1
                }
              },
              lineStyle: {
                color: Z,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: z.labelPosition,
                color: W,
                fontWeight: 700,
                fontSize: z.labelFontSize,
                lineHeight: z.labelLineHeight || Math.round(z.labelFontSize * 1.25),
                padding: la,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...z.orient === "horizontal" ? { width: Math.max(O - la * 2, 48), overflow: "none" } : z.labelWrap && z.labelTextWidth > 0 ? { width: z.labelTextWidth, overflow: "none" } : {},
                ...z.labelDistance > 0 ? { distance: z.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Be) => Be.data?.displayLabel || Be.name || ""
              },
              edgeLabel: z.edgeLabelShow ? {
                show: !0,
                fontSize: z.edgeLabelFontSize,
                color: G,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Be) => {
                  const Le = Number(Be.data?.originalValue ?? Be.value ?? 0), qe = Be.data?.source || Be.source || "";
                  return H(qe, Le, J, Ce);
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: z.nodeGap,
              nodeWidth: O,
              layoutIterations: h.node.iterations,
              orient: z.orient,
              draggable: !1,
              ...ee
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(_e), c.resize();
      } catch (J) {
        console.error("Error setting Sankey chart options:", J), l.value = !0;
      }
    }, U = async () => {
      if (i.value)
        try {
          c = Eo.init(i.value), K(), window.addEventListener("resize", ge);
        } catch (z) {
          console.error("Error initializing Sankey chart:", z), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, Y = () => {
      const z = i.value;
      return !!(z && z.clientWidth > 0 && z.clientHeight > 0);
    }, de = async () => {
      if (await We(), Y()) return U();
      await new Promise((z) => {
        const Z = i.value;
        if (!Z) {
          z();
          return;
        }
        d = new ResizeObserver(() => {
          Y() && (d?.disconnect(), d = null, U().then(z));
        }), d.observe(Z);
      });
    }, ge = () => c?.resize(), te = () => {
      window.removeEventListener("resize", ge), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return Je(() => de()), pi(te), Re(() => a.data, K, { deep: !0 }), Re(n, K), Re(s, K), t({ isDark: n }), (z, Z) => (g(), x("div", xm, [
      l.value ? (g(), x("div", {
        key: 0,
        class: "error-state",
        style: we({ height: e.height })
      }, [...Z[0] || (Z[0] = [
        Qn('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (g(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: we({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (g(), x("div", km, [...Z[1] || (Z[1] = [
          Qn('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : F("", !0)
      ], 4))
    ]));
  }
}), aa = /* @__PURE__ */ ve(_m, [["__scopeId", "data-v-c2130602"]]), wm = ["open"], Cm = { class: "card-header metric-collapsible__summary" }, $m = { class: "header-content metric-header-content" }, Sm = { class: "metric-header-content__main" }, Mm = { class: "metric-header-content__text" }, Dm = { class: "metric-header-content__loaded" }, Am = {
  key: 0,
  class: "card-title"
}, Tm = {
  key: 0,
  class: "card-subtitle"
}, Bm = {
  key: 0,
  class: "metric-header-content__export"
}, Lm = {
  key: 0,
  class: "cmc-header-aside"
}, Rm = {
  key: 0,
  class: "chart-metric-container__body"
}, Pm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Im = { key: "body-content" }, Em = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Fm = { class: "card-header" }, Om = { class: "header-content metric-header-content" }, Vm = { class: "metric-header-content__main" }, zm = { class: "metric-header-content__text" }, Nm = { class: "metric-header-content__loaded" }, jm = {
  key: 0,
  class: "card-title"
}, Hm = {
  key: 0,
  class: "card-subtitle"
}, Wm = {
  key: 0,
  class: "metric-header-content__export"
}, Km = {
  key: 0,
  class: "cmc-header-aside"
}, Um = {
  key: 0,
  class: "chart-metric-container__body"
}, Ym = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, qm = { key: "body-content" }, Xm = /* @__PURE__ */ ce({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    lazyMount: { type: Boolean, default: !1 }
  },
  emits: ["open", "toggle"],
  setup(e, { emit: t }) {
    const a = e, n = t;
    function o(f) {
      return f === !0;
    }
    const s = oe(null), i = oe(o(a.defaultOpen)), r = oe(o(a.defaultOpen)), l = co();
    function c(f) {
      return f.some((p) => {
        if (p.type === Hr) return !1;
        if (p.type === Text) {
          const y = p.children;
          return typeof y == "string" && y.trim().length > 0;
        }
        return !!p.type;
      });
    }
    const d = $(() => a.collapsible ? a.lazyMount ? r.value : i.value : !0), h = $(() => a.loading && d.value), m = $(() => {
      if (a.collapsible && !i.value) return !1;
      const f = l.headerExport;
      return f ? c(f()) : !1;
    });
    Re(
      () => a.defaultOpen,
      (f) => {
        if (!a.collapsible) return;
        const p = o(f);
        i.value = p, p && (r.value = !0), s.value && s.value.open !== p && (s.value.open = p);
      }
    ), Je(() => {
      !a.collapsible || !s.value || (s.value.open = i.value);
    });
    function b(f) {
      const p = f.currentTarget;
      if (p?.tagName !== "DETAILS") return;
      const y = i.value, v = p.open;
      if (i.value = v, v && !y) {
        const k = !r.value;
        r.value = !0, k && n("open");
      }
      n("toggle", v);
    }
    return (f, p) => e.collapsible ? (g(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: b
    }, [
      u("summary", Cm, [
        u("div", $m, [
          u("div", Sm, [
            u("div", Mm, [
              u("div", Dm, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (g(), x("h3", Am, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", Tm, A(e.subtitle), 1)) : F("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (g(), x("div", Bm, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          f.$slots.headerAside ? (g(), x("div", Lm, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : F("", !0)
        ]),
        p[0] || (p[0] = u("svg", {
          class: "metric-collapsible__chevron",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          })
        ], -1))
      ]),
      d.value ? (g(), x("div", Rm, [
        N(gt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            h.value ? (g(), x("div", Pm, [
              ke(f.$slots, "loading", {}, () => [
                p[1] || (p[1] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (g(), x("div", Im, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ], 40, wm)) : (g(), x("div", Em, [
      u("div", Fm, [
        u("div", Om, [
          u("div", Vm, [
            u("div", zm, [
              u("div", Nm, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (g(), x("h3", jm, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", Hm, A(e.subtitle), 1)) : F("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (g(), x("div", Wm, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          f.$slots.headerAside ? (g(), x("div", Km, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : F("", !0)
        ])
      ]),
      d.value ? (g(), x("div", Um, [
        N(gt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            h.value ? (g(), x("div", Ym, [
              ke(f.$slots, "loading", {}, () => [
                p[2] || (p[2] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (g(), x("div", qm, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ ve(Xm, [["__scopeId", "data-v-ade4038f"]]);
function Gm(e, t) {
  return g(), x("svg", {
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
      d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    })
  ]);
}
function io(e, t) {
  return g(), x("svg", {
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
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function Lo(e, t) {
  return g(), x("svg", {
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
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function it(e, t) {
  return g(), x("svg", {
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
function Zm(e, t) {
  return g(), x("svg", {
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
function ta(e, t) {
  return g(), x("svg", {
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
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function gr(e, t) {
  return g(), x("svg", {
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
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function mr(e, t) {
  return g(), x("svg", {
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
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function Qm(e, t) {
  return g(), x("svg", {
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
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Jm(e, t) {
  return g(), x("svg", {
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
function si(e, t) {
  return g(), x("svg", {
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
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    })
  ]);
}
function ep(e, t) {
  return g(), x("svg", {
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
      d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    })
  ]);
}
function ii(e, t) {
  return g(), x("svg", {
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
      d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    }),
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ]);
}
function tp(e, t) {
  return g(), x("svg", {
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
      d: "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
    })
  ]);
}
function pr(e, t) {
  return g(), x("svg", {
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
      d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    })
  ]);
}
function ap(e, t) {
  return g(), x("svg", {
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
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    })
  ]);
}
function np(e, t) {
  return g(), x("svg", {
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
      d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    })
  ]);
}
function op(e, t) {
  return g(), x("svg", {
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
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })
  ]);
}
function ro(e, t) {
  return g(), x("svg", {
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
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const sp = {
  key: 0,
  class: "footer-divider"
}, ip = {
  key: 0,
  class: "export-label"
}, rp = { class: "export-buttons" }, lp = ["disabled"], cp = {
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
}, up = ["disabled"], hp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, fp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, gp = /* @__PURE__ */ ce({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(() => a.variant === "footer" ? "footer" : "div"), s = $(
      () => a.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (l) => a.formats.includes(l), r = (l) => {
      a.loading || n("export", l);
    };
    return (l, c) => (g(), ae(bt(o.value), {
      class: Q(s.value)
    }, {
      default: E(() => [
        e.variant === "footer" ? (g(), x("div", sp)) : F("", !0),
        u("div", {
          class: Q(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (g(), x("span", ip, "Export")) : F("", !0),
          u("div", rp, [
            i("pdf") ? (g(), x("button", {
              key: 0,
              type: "button",
              class: Q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => r("pdf"))
            }, [
              e.loading ? (g(), x("svg", cp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", dp, [...c[3] || (c[3] = [
                u("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                u("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                u("line", {
                  x1: "16",
                  y1: "13",
                  x2: "8",
                  y2: "13"
                }, null, -1),
                u("line", {
                  x1: "16",
                  y1: "17",
                  x2: "8",
                  y2: "17"
                }, null, -1),
                u("polyline", { points: "10 9 9 9 8 9" }, null, -1)
              ])])),
              c[4] || (c[4] = u("span", null, "PDF", -1))
            ], 10, lp)) : F("", !0),
            i("csv") ? (g(), x("button", {
              key: 1,
              type: "button",
              class: Q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => r("csv"))
            }, [
              e.loading ? (g(), x("svg", hp, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", fp, [...c[6] || (c[6] = [
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
              c[7] || (c[7] = u("span", null, "CSV", -1))
            ], 10, up)) : F("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Oe = /* @__PURE__ */ ve(gp, [["__scopeId", "data-v-ebfab47f"]]), mp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, pp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, bp = { class: "w-full shrink-0 sm:pr-2" }, vp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, yp = { class: "max-w-[360px] text-center" }, xp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, kp = /* @__PURE__ */ ce({
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
    }, o = e, s = a, i = (m) => {
      s("export", m);
    }, r = $e(o, "theme"), l = $e(o, "options"), { isDark: c } = Me(r), d = (m) => {
      const b = new Date(m), f = String(b.getDate()).padStart(2, "0"), p = String(b.getMonth() + 1).padStart(2, "0");
      return `${f}-${p}`;
    }, h = $(() => {
      const m = o.data?.agents_by_day || {}, b = Object.keys(m).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const f = b.map((w) => d(w)), p = /* @__PURE__ */ new Set();
      for (const w of Object.values(m))
        for (const _ of Object.keys(w))
          p.add(_);
      const y = Array.from(p), v = (w) => w, k = y.map((w) => ({
        label: w,
        data: b.map((_) => m[_]?.[w] || 0),
        backgroundColor: `${n[w] || "#94a3b8"}80`,
        borderColor: v(n[w] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: k
      };
    });
    return t({ isDark: c }), (m, b) => (g(), ae(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", mp, [
          N(gt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              h.value.labels && h.value.labels.length ? (g(), x("section", pp, [
                u("div", bp, [
                  N($t, {
                    data: h.value,
                    stacked: !0,
                    theme: r.value,
                    options: l.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (g(), x("section", vp, [
                u("div", yp, [
                  u("div", xp, [
                    N(B(it), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  b[0] || (b[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  b[1] || (b[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
                ])
              ]))
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), _p = /* @__PURE__ */ ve(kp, [["__scopeId", "data-v-f8d0ec91"]]), wp = { class: "flex w-full min-w-0 justify-center" }, Cp = { class: "flex max-w-full min-w-0 items-center gap-2" }, $p = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Sp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Mp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Dp = /* @__PURE__ */ ce({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (g(), x("div", {
      class: Q(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", wp, [
        u("div", Cp, [
          e.color ? (g(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: we({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          u("span", $p, A(e.title), 1)
        ])
      ]),
      u("p", Sp, A(e.value), 1),
      e.subvalue ? (g(), x("p", Mp, A(e.subvalue), 1)) : F("", !0)
    ], 2));
  }
}), xe = /* @__PURE__ */ ve(Dp, [["__scopeId", "data-v-0d546967"]]), br = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function vr(e, t) {
  switch (e) {
    case "purple":
      return t ? "border border-violet-500 bg-violet-500/10 text-violet-700 dark:border-violet-400 dark:bg-violet-950/40 dark:text-violet-300" : "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
    case "warning":
      return t ? "border border-amber-500 bg-amber-500/10 text-amber-800 dark:border-amber-400 dark:bg-amber-950/35 dark:text-amber-200" : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200";
    case "success":
      return t ? "border border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-950/35 dark:text-emerald-200" : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200";
    case "danger":
      return t ? "border border-red-500 bg-red-500/10 text-red-800 dark:border-red-400 dark:bg-red-950/35 dark:text-red-200" : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200";
    case "orange":
      return t ? "border border-orange-500 bg-orange-500/10 text-orange-800 dark:border-orange-400 dark:bg-orange-950/35 dark:text-orange-200" : "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200";
    default:
      return t ? "border border-slate-400 bg-slate-400/10 text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:bg-slate-800/90 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
  }
}
const Ap = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Xe = /* @__PURE__ */ ce({
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
    const t = e, a = $(
      () => t.statusLive === !0 || t.statusLive === !1
    ), n = $(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), o = $(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = $(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = $(
      () => vr(t.color, t.outlined)
    );
    return (r, l) => a.value ? (g(), x("span", {
      key: 0,
      role: "status",
      class: Q(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (g(), x("span", Ap, [...l[0] || (l[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : F("", !0),
      u("span", {
        class: Q(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (g(), x("span", {
      key: 1,
      class: Q([B(br), i.value])
    }, [
      ke(r.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), fe = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Pe = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), jt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Tp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Bp = { class: "overflow-x-auto" }, Lp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Rp = ["aria-sort", "onClick"], Pp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Ip = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Ep = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Fp = /* @__PURE__ */ ce({
  __name: "Table",
  props: {
    columns: {},
    rows: {},
    maxVisibleRows: { default: 3 },
    viewMoreLabel: { default: "View more ({count} rows)" },
    viewLessLabel: { default: "View less" },
    rowKey: { type: [String, Function], default: "id" },
    sortKey: { default: null },
    sortDirection: { default: null }
  },
  emits: ["sort"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = oe(!1), s = "—";
    function i(_) {
      return _ == null || _ === "" ? s : String(_);
    }
    function r(_) {
      return _ === "center" ? "text-center" : _ === "right" ? "text-right" : "text-left";
    }
    function l(_) {
      return `cell-${_}`;
    }
    function c(_, C) {
      return _[C];
    }
    function d(_, C) {
      if (typeof a.rowKey == "function")
        return a.rowKey(_);
      const M = _[a.rowKey];
      return typeof M == "string" || typeof M == "number" ? M : C;
    }
    function h(_, C) {
      return d(_, C);
    }
    function m(_) {
      return a.sortKey === _ && a.sortDirection != null;
    }
    function b(_) {
      n("sort", _);
    }
    function f(_) {
      return m(_) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const p = $(() => a.rows?.length ?? 0), y = $(() => p.value > a.maxVisibleRows), v = $(() => Math.max(0, p.value - a.maxVisibleRows)), k = $(() => a.rows?.length ? o.value || !y.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), w = $(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(v.value))
    );
    return (_, C) => (g(), x("div", Tp, [
      u("div", Bp, [
        u("table", Lp, [
          u("thead", null, [
            u("tr", null, [
              (g(!0), x(le, null, be(e.columns, (M) => (g(), x("th", {
                key: M.key,
                scope: "col",
                class: Q(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(M.align), M.headerClass]])
              }, [
                M.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: Q(["kiut-table-sort-btn inline-flex items-center gap-1", r(M.align)]),
                  "aria-sort": f(M.key),
                  onClick: (S) => b(M.key)
                }, [
                  u("span", null, A(M.label), 1),
                  u("span", Pp, [
                    m(M.key) ? (g(), x(le, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", Ip, "↑")) : e.sortDirection === "desc" ? (g(), x("span", Ep, "↓")) : F("", !0)
                    ], 64)) : (g(), x(le, { key: 1 }, [
                      C[1] || (C[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      C[2] || (C[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Rp)) : (g(), x(le, { key: 1 }, [
                  Ae(A(M.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (g(!0), x(le, null, be(k.value, (M, S) => (g(), x("tr", {
              key: h(M, S)
            }, [
              (g(!0), x(le, null, be(e.columns, (P) => (g(), x("td", {
                key: `${S}-${P.key}`,
                class: Q(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [r(P.align), P.cellClass]])
              }, [
                ke(_.$slots, l(P.key), {
                  row: M,
                  column: P,
                  value: c(M, P.key)
                }, () => [
                  Ae(A(i(c(M, P.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      y.value ? (g(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: C[0] || (C[0] = (M) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : w.value) + " ", 1),
        (g(), x("svg", {
          class: Q(["view-more-icon", { "view-more-icon-rotated": o.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...C[3] || (C[3] = [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : F("", !0)
    ]));
  }
}), ft = /* @__PURE__ */ ve(Fp, [["__scopeId", "data-v-22a97a18"]]), Op = {
  key: "error",
  class: "error-state"
}, Vp = { class: "error-content" }, zp = { class: "error-description" }, Np = {
  key: "content",
  class: "card-body"
}, jp = { class: "chart-section" }, Hp = { class: "chart-wrapper" }, Wp = { class: "payment-success-summary" }, Kp = {
  key: 0,
  class: "booking-daily-section"
}, Up = { class: "w-full min-w-0" }, Yp = { class: "font-medium" }, qp = { class: "percentage-text" }, Xp = { class: "badges-container" }, Gp = {
  key: 0,
  class: "badges-container"
}, Zp = {
  key: 1,
  class: "percentage-text"
}, Qp = { class: "badges-container" }, Jp = {
  key: 1,
  class: "empty-state"
}, e0 = /* @__PURE__ */ ce({
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
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    function a(v) {
      return v;
    }
    const n = e, o = t, s = (v) => {
      o("export", v);
    }, i = $(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (v, k) => new Date(v.date).getTime() - new Date(k.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], l = $(
      () => i.value.map((v) => ({
        id: v.date,
        ...v
      }))
    ), c = $(() => n.data?.total_payment_success_value || []), d = $(() => {
      const v = c.value;
      return v.length === 0 ? f(0) : v.map(
        (k) => `${k.currency} ${f(k.total_value)}`
      ).join(" · ");
    }), h = (v) => v.payment_success_value || [], m = (v) => typeof v.payment_success_count == "number" ? v.payment_success_count : (v.payment_success_value || []).reduce(
      (k, w) => k + (w.count || 0),
      0
    ), b = (v) => Pe(v), f = (v) => v == null ? "0" : jt(v);
    $(() => (n.data?.total_payment_success_value || []).reduce(
      (v, k) => v + (k.total_value || 0),
      0
    ));
    const p = $(() => {
      const v = n.data, k = v.total_booking_initiated || 0, w = v.total_booking_started || 0, _ = v.total_payment_initiated || 0, C = v.total_not_found || 0, M = v.total_cancelled || 0, S = v.total_no_pending_balance || 0, P = v.total_errors || 0, I = typeof v.total_payment_success == "number" ? v.total_payment_success : (v.total_payment_success_value || []).reduce(
        (X, ie) => X + (ie.count || 0),
        0
      ), V = v.total_payment_failed || 0, D = Math.max(0, k - w), L = Math.max(
        0,
        w - _ - C - M - S - P
      ), T = (X, ie) => ye(X, ie), j = [
        { name: "Initiated", status: "success" },
        { name: "Started", status: "success" },
        { name: "Payment Initiated", status: "success" },
        { name: "Not Found", status: "error" },
        { name: "Cancelled", status: "abandon" },
        { name: "No Pending Balance", status: "abandon" },
        { name: "Errors", status: "error" },
        { name: "Payment Success", status: "success" },
        { name: "Payment Failed", status: "error" },
        { name: "Abandoned (Init)", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], H = [];
      return w > 0 && H.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: T(w, k)
      }), D > 0 && H.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: D,
        label: T(D, k)
      }), _ > 0 && H.push({
        source: "Started",
        target: "Payment Initiated",
        value: _,
        label: T(_, k)
      }), C > 0 && H.push({
        source: "Started",
        target: "Not Found",
        value: C,
        label: T(C, k)
      }), M > 0 && H.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: T(M, k)
      }), S > 0 && H.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: T(S, k)
      }), P > 0 && H.push({
        source: "Started",
        target: "Errors",
        value: P,
        label: T(P, k)
      }), L > 0 && H.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: T(L, k)
      }), I > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: I,
        label: T(I, k)
      }), V > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: V,
        label: T(V, k)
      }), { nodes: j, links: H };
    }), y = (v, k) => Lt(v, k);
    return (v, k) => (g(), ae(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: k[0] || (k[0] = (w) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading && !n.error ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        N(gt, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            n.error ? (g(), x("div", Op, [
              u("div", Vp, [
                k[1] || (k[1] = u("div", { class: "error-icon-wrapper" }, [
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
                k[2] || (k[2] = u("p", { class: "error-title" }, "Error loading data", -1)),
                u("p", zp, A(n.error), 1)
              ])
            ])) : (g(), x("div", Np, [
              u("section", jp, [
                u("div", Hp, [
                  N(aa, {
                    data: p.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", Wp, [
                N(xe, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (g(), x("section", Kp, [
                k[3] || (k[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", Up, [
                  N(ft, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": E(({ row: w }) => [
                      u("span", Yp, A(B(je)(String(w.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": E(({ row: w }) => [
                      u("span", null, A(B(fe)(Number(w.booking_initiated_count))), 1)
                    ]),
                    "cell-started": E(({ row: w }) => [
                      u("span", null, [
                        Ae(A(B(fe)(Number(w.booking_started_count))) + " ", 1),
                        u("span", qp, " (" + A(y(
                          Number(w.booking_started_count),
                          Number(w.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": E(({ row: w }) => [
                      u("span", null, A(B(fe)(Number(w.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": E(({ row: w }) => [
                      u("div", Xp, [
                        N(Xe, { color: "success" }, {
                          default: E(() => [
                            Ae(" Success: " + A(B(fe)(
                              m(w)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Xe, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Failed: " + A(B(fe)(Number(w.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": E(({ row: w }) => [
                      h(w).length > 0 ? (g(), x("div", Gp, [
                        (g(!0), x(le, null, be(h(
                          w
                        ), (_) => (g(), x("span", {
                          key: `${w.date}-${_.currency}`,
                          class: "badge badge-currency"
                        }, A(_.currency) + " " + A(b(_.total_value)), 1))), 128))
                      ])) : (g(), x("span", Zp, "N/A"))
                    ]),
                    "cell-outcomes": E(({ row: w }) => [
                      u("div", Qp, [
                        N(Xe, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Not Found: " + A(w.not_found_count ? B(fe)(Number(w.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Xe, { color: "warning" }, {
                          default: E(() => [
                            Ae(" Cancelled: " + A(w.cancelled_count ? B(fe)(Number(w.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Xe, { color: "orange" }, {
                          default: E(() => [
                            Ae(" No Balance: " + A(w.no_pending_balance_count ? B(fe)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Xe, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Errors: " + A(w.error_count ? B(fe)(Number(w.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (g(), x("section", Jp, [...k[4] || (k[4] = [
                u("div", { class: "empty-state-content" }, [
                  u("div", { class: "empty-icon-wrapper" }, [
                    u("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      u("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      })
                    ])
                  ]),
                  u("p", { class: "empty-title" }, "No booking manager data available"),
                  u("p", { class: "empty-description" }, " No booking manager data found for the selected period. Try adjusting the date range. ")
                ], -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), t0 = /* @__PURE__ */ ve(e0, [["__scopeId", "data-v-d68eddff"]]), a0 = { class: "card-body" }, n0 = {
  key: 0,
  class: "chart-section"
}, o0 = { class: "chart-wrapper" }, s0 = {
  key: 1,
  class: "checkin-daily-section"
}, i0 = { class: "w-full min-w-0" }, r0 = { class: "font-medium" }, l0 = { class: "cell-success" }, c0 = { class: "cell-danger" }, d0 = {
  key: 0,
  class: "reasons-list"
}, u0 = { class: "reason-name" }, h0 = { class: "reason-count" }, f0 = {
  key: 1,
  class: "no-reasons"
}, g0 = {
  key: 2,
  class: "empty-state"
}, m0 = {
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
    /** Muestra la columna de links de pago generados (record_locator_create_payment_count). */
    showPaymentLinks: {
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
    const a = t, n = (_) => {
      a("export", _);
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
    }, r = oe([]), l = [
      { key: "date", label: "Date", align: "right" },
      { key: "checkinInit", label: "Checkin Init", align: "right" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "right" },
      { key: "passengers", label: "Number of Passengers", align: "right" },
      { key: "completed", label: "Completed (%)", align: "right" },
      { key: "closed", label: "Closed with BP (%)", align: "right" },
      { key: "failed", label: "Failed (%)", align: "right" },
      { key: "reasons", label: "Failed (Reasons)", align: "right" }
    ], c = {
      key: "createPayment",
      label: "Create Payment",
      align: "right"
    }, d = $(
      () => o.showPaymentLinks ? [...l, c] : l
    ), h = $(
      () => (r.value || []).map((_) => ({
        id: _.date,
        date: _.date,
        checkin_initiated_count: _.checkin_initiated_count,
        checkin_init_count: _.checkin_init_count,
        checkin_started_count: _.checkin_started_count,
        checkin_completed_count: _.checkin_completed_count,
        checkin_closed_count: _.checkin_closed_count,
        failed_steps: _.failed_steps,
        record_locator_create_payment_count: _.record_locator_create_payment_count
      }))
    ), m = $(() => {
      const _ = o.data;
      return _ && (Array.isArray(_.checkin_by_day) && _.checkin_by_day.length > 0 || (_.total_checkin_initiated ?? 0) > 0) ? { ...s, ..._ } : o.checkinData ?? s;
    }), b = $(() => {
      const _ = o.data;
      return _ && (Array.isArray(_.failed_by_step_by_day) && _.failed_by_step_by_day.length > 0 || Array.isArray(_.unrecovered_by_step) && _.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: _.total_checkin_failed ?? 0,
        total_checkin_unrecovered: _.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: _.failed_by_step_by_day ?? [],
        unrecovered_by_step: _.unrecovered_by_step ?? [],
        unrecovered_by_day: _.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), f = (_, C) => !C || C === 0 ? "0.0%" : Lt(_, C), p = (_, C) => {
      const M = fe(_), S = f(_, C);
      return `${M} (${S})`;
    }, y = (_) => _.reduce((C, M) => C + M.failed_count, 0), v = $(() => {
      const _ = [], C = [], M = /* @__PURE__ */ new Set(), S = (G, W = {}) => {
        M.has(G) || (_.push({ name: G, ...W }), M.add(G));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: _, links: C };
      S("Checkin Init", { value: m.value.total_checkin_initiated }), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const P = m.value.total_checkin_initiated, I = m.value.total_checkin_init, V = m.value.total_checkin_init_abandoned || 0, D = m.value.total_checkin_pre_init_abandoned_error, L = m.value.total_checkin_pre_init_abandoned_voluntary, T = D != null || L != null, j = T ? Math.max(Number(D) || 0, 0) : 0, H = T ? Math.max(Number(L) || 0, 0) : 0, X = m.value.total_checkin_init_abandoned_error, ie = m.value.total_checkin_init_abandoned_voluntary, ue = X != null || ie != null, q = ue ? Math.max(Number(X) || 0, 0) : 0, ne = ue ? Math.max(Number(ie) || 0, 0) : 0, R = ue ? Math.max(V - q - ne, 0) : V, K = I - V, U = m.value.total_checkin_started, Y = m.value.total_checkin_completed, de = m.value.total_checkin_closed, ge = b.value.unrecovered_by_step || [], te = ge.reduce(
        (G, W) => G + W.count,
        0
      );
      I > 0 && C.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: I,
        label: ye(I, P)
      });
      const z = P - I;
      T ? (H > 0 && (S("Abandoned (Init)", { status: "abandon" }), C.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ye(H, P)
      })), j > 0 && (S("Booking not retreived", { status: "error" }), C.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: j,
        label: ye(j, P)
      }))) : z > 0 && (S("Abandoned (Init)", { status: "abandon" }), C.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: z,
        label: ye(z, P)
      })), ue ? (q > 0 && (S("Error", { status: "error" }), C.push({
        source: "Booking retrive",
        target: "Error",
        value: q,
        label: ye(q, P)
      })), ne > 0 && (S("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: ne,
        label: ye(ne, P)
      })), R > 0 && (S("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ye(R, P)
      }))) : V > 0 && (S("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: V,
        label: ye(V, P)
      })), K > 0 && C.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: K,
        label: ye(K, P)
      }), U > 0 && C.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: U,
        label: ye(U, P)
      }), Y > 0 && C.push({
        source: "Number of Passengers",
        target: "Completed",
        value: Y,
        label: ye(Y, P)
      }), ge.length > 0 && te > 0 && (S("Unrecovered", { status: "error" }), C.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: te,
        label: ye(te, P)
      }), ge.forEach((G, W) => {
        const he = G.step_name.replace(/_/g, " ").split(" ").map((me) => me.charAt(0).toUpperCase() + me.slice(1)).join(" ");
        S(he, { status: "error", order: W + 1 }), C.push({
          source: "Unrecovered",
          target: he,
          value: G.count,
          label: ye(G.count, P)
        });
      }));
      const Z = U - (Y + te);
      Z > 0 && (S("Abandoned (Flow)", { status: "abandon" }), C.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: Z,
        label: ye(Z, P)
      }));
      const re = Y - de;
      return re > 0 && (S("BP Error", { status: "error", order: 0 }), C.push({
        source: "Completed",
        target: "BP Error",
        value: re,
        label: ye(re, P)
      })), de > 0 && C.push({
        source: "Completed",
        target: "Closed with BP",
        value: de,
        label: ye(de, P)
      }), { nodes: _, links: C };
    }), k = () => {
      const _ = o.data?.record_locator_by_day;
      if (Array.isArray(_) && _.length > 0) return _;
      const C = o.checkinData?.record_locator_by_day;
      return Array.isArray(C) && C.length > 0 ? C : [];
    }, w = () => {
      const _ = m.value.checkin_by_day || [], C = b.value.failed_by_step_by_day || [], M = k();
      if (_.length === 0) {
        r.value = [];
        return;
      }
      r.value = [..._].map((S) => {
        const P = C.find(
          (V) => V.date === S.date
        ), I = M.find(
          (V) => V.date === S.date
        );
        return {
          ...S,
          failed_steps: P?.steps || [],
          record_locator_create_payment_count: S.record_locator_create_payment_count ?? I?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((S, P) => new Date(S.date) - new Date(P.date));
    };
    return Re(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        w();
      },
      { deep: !0, immediate: !0 }
    ), (_, C) => (g(), ae(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", a0, [
          v.value.nodes.length > 0 ? (g(), x("section", n0, [
            u("div", o0, [
              N(aa, {
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          r.value && r.value.length > 0 ? (g(), x("section", s0, [
            u("div", i0, [
              N(ft, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: M }) => [
                  u("span", r0, A(B(je)(String(M.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: M }) => [
                  u("span", null, A(B(fe)(M.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: M }) => [
                  u("span", null, A(p(
                    M.checkin_init_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": E(({ row: M }) => [
                  u("span", null, A(B(fe)(M.checkin_started_count)), 1)
                ]),
                "cell-completed": E(({ row: M }) => [
                  u("span", null, A(p(
                    M.checkin_completed_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: M }) => [
                  u("span", l0, A(p(
                    M.checkin_closed_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": E(({ row: M }) => [
                  u("span", c0, A(p(
                    y(M.failed_steps),
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": E(({ row: M }) => [
                  M.failed_steps && M.failed_steps.length > 0 ? (g(), x("div", d0, [
                    (g(!0), x(le, null, be(M.failed_steps, (S) => (g(), x("div", {
                      key: S.step_name,
                      class: "reason-item"
                    }, [
                      u("span", u0, A(S.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", h0, A(S.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", f0, "-"))
                ]),
                "cell-createPayment": E(({ row: M }) => [
                  u("span", null, A(B(fe)(M.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", g0, [...C[0] || (C[0] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No check-in data available"),
              u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in performance data. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, p0 = /* @__PURE__ */ ve(m0, [["__scopeId", "data-v-ae5fc0f7"]]), b0 = { class: "card-body" }, v0 = {
  key: 0,
  class: "sankey-section"
}, y0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, x0 = { class: "w-full min-w-0" }, k0 = { class: "font-medium whitespace-nowrap" }, _0 = { class: "cell-success" }, w0 = { class: "cell-danger" }, C0 = {
  key: 0,
  class: "reasons-list"
}, $0 = { class: "reason-name" }, S0 = { class: "reason-count" }, M0 = {
  key: 1,
  class: "no-reasons"
}, D0 = {
  key: 2,
  class: "empty-state"
}, A0 = { class: "empty-state-content" }, T0 = { class: "empty-icon-wrapper" }, B0 = /* @__PURE__ */ ce({
  __name: "CheckinMetrics",
  props: {
    initiallyOpen: { type: Boolean, default: !1 },
    collapsible: { type: Boolean, default: !0 },
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
    exportLoading: { type: Boolean, default: !1 },
    isAvianca: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (C) => {
      o("export", C);
    }, { isDark: i } = Me($e(n, "theme")), r = (C) => C == null ? "0" : C.toLocaleString(), l = (C) => {
      const [M, S, P] = C.split("-").map(Number);
      return je([M, S - 1, P]).format("MMM DD");
    }, c = (C) => C.replace(/_/g, " ").replace(/\b\w/g, (M) => M.toUpperCase()), d = (C, M) => Lt(C, M), h = (C, M) => {
      const S = C || 0, P = M || 0, I = r(S), V = d(S, P);
      return `${I} (${V})`;
    }, m = $(() => {
      const C = n.checkinData?.record_locator_by_day || [], M = n.failedData?.failed_by_step_by_day || [], S = n.failedData?.unrecovered_by_day || [];
      return C.map((I) => {
        const V = M.find((L) => L.date === I.date), D = S.find(
          (L) => L.date === I.date
        );
        return {
          ...I,
          failed_steps: V?.steps || [],
          unrecovered_count: D?.unrecovered_count || 0
        };
      }).sort(
        (I, V) => new Date(I.date).getTime() - new Date(V.date).getTime()
      );
    }), b = /* @__PURE__ */ new Set([
      "choose_boardingpass",
      "boarding_pass",
      "generate_boarding_pass"
    ]), f = (C) => {
      if (!C) return !1;
      const M = C.toLowerCase().trim();
      return b.has(M) || M.includes("boarding_pass");
    }, p = (C) => {
      const M = C?.failed_by_step_by_day || [];
      let S = 0;
      for (const P of M)
        for (const I of P.steps || [])
          f(I.step_name) && (S += I.failed_count || 0);
      if (S > 0) return S;
      for (const P of C?.unrecovered_by_step || [])
        f(P.step_name) && (S += P.count || 0);
      return S;
    }, y = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], v = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, k = $(() => n.isAvianca ? [...y, v] : y), w = $(
      () => m.value.map((C) => ({
        id: C.date,
        date: C.date,
        checkin_initiated: C.checkin_initiated,
        record_locator_init_count: C.record_locator_init_count,
        record_locator_started_count: C.record_locator_started_count,
        record_locator_completed_count: C.record_locator_completed_count,
        record_locator_closed_count: C.record_locator_closed_count,
        unrecovered_count: C.unrecovered_count,
        failed_steps: C.failed_steps,
        record_locator_create_payment_count: C.record_locator_create_payment_count
      }))
    ), _ = $(() => {
      const C = [], M = [], S = /* @__PURE__ */ new Set(), P = (he, me = {}) => {
        S.has(he) || (C.push({ name: he, ...me }), S.add(he));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: C, links: M };
      const I = n.checkinData.total_checkin_initiated || 0;
      P("Checkin Init", { value: I }), P("Booking Retrieval"), P("Booking Retrieved"), P("Check-in Closed"), P("BP Issued");
      const V = n.checkinData.total_record_locator_init || 0, D = n.checkinData.total_record_locator_init_abandoned || 0, L = n.checkinData.total_checkin_pre_init_abandoned_error, T = n.checkinData.total_checkin_pre_init_abandoned_voluntary, j = L != null || T != null, H = j ? Math.max(Number(L) || 0, 0) : 0, X = j ? Math.max(Number(T) || 0, 0) : 0, ie = n.checkinData.total_record_locator_init_abandoned_error, ue = n.checkinData.total_record_locator_init_abandoned_voluntary, q = ie != null || ue != null, ne = q ? Math.max(Number(ie) || 0, 0) : 0, R = q ? Math.max(Number(ue) || 0, 0) : 0, K = q ? Math.max(D - ne - R, 0) : D, U = V - D, Y = n.checkinData.total_record_locator_started || 0, de = n.checkinData.total_record_locator_completed || 0, ge = n.checkinData.total_record_locator_closed || 0, te = n.checkinData.total_record_locator_unrecovered || 0;
      V > 0 && M.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: V,
        label: ye(V, I)
      });
      const z = I - V;
      j ? (X > 0 && (P("Abandoned (Init)"), M.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: X,
        label: ye(X, I)
      })), H > 0 && (P("Booking not retreived"), M.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, I)
      }))) : z > 0 && (P("Abandoned (Init)"), M.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: z,
        label: ye(z, I)
      }));
      const Z = n.isAvianca ? "Abandoned (Booking)" : "Abandoned (Started)";
      q ? (ne > 0 && (P("Error"), M.push({
        source: "Booking Retrieval",
        target: "Error",
        value: ne,
        label: ye(ne, I)
      })), R > 0 && (P(Z, { status: "abandon" }), M.push({
        source: "Booking Retrieval",
        target: Z,
        value: R,
        label: ye(R, I)
      })), K > 0 && (P(Z, { status: "abandon" }), M.push({
        source: "Booking Retrieval",
        target: Z,
        value: K,
        label: ye(K, I)
      }))) : D > 0 && (P(Z, { status: "abandon" }), M.push({
        source: "Booking Retrieval",
        target: Z,
        value: D,
        label: ye(D, I)
      })), U > 0 && M.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: U,
        label: ye(U, I)
      }), ge > 0 && M.push({
        source: "Booking Retrieved",
        target: "Check-in Closed",
        value: ge,
        label: ye(ge, I)
      });
      const re = p(n.failedData), G = Math.min(re, Math.max(ge - de, 0));
      de > 0 && M.push({
        source: "Check-in Closed",
        target: "BP Issued",
        value: de,
        label: ye(de, I)
      }), G > 0 && (P("BP Error", { status: "error" }), M.push({
        source: "Check-in Closed",
        target: "BP Error",
        value: G,
        label: ye(G, I)
      }));
      const W = Math.max(ge - de - G, 0);
      W > 0 && (P("Abandoned after Closed", { status: "abandon" }), M.push({
        source: "Check-in Closed",
        target: "Abandoned after Closed",
        value: W,
        label: ye(W, I)
      })), te > 0 && (P("Errors", { status: "error" }), M.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: te,
        label: ye(te, I)
      }));
      const J = Math.max(Y - ge - te, 0);
      return J > 0 && (P("Abandoned before Closed", { status: "abandon" }), M.push({
        source: "Booking Retrieved",
        target: "Abandoned before Closed",
        value: J,
        label: ye(J, I)
      })), { nodes: C, links: M };
    });
    return t({ isDark: i }), (C, M) => (g(), ae(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", b0, [
          _.value.nodes.length > 0 ? (g(), x("div", v0, [
            N(aa, {
              data: _.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : F("", !0),
          m.value && m.value.length > 0 ? (g(), x("div", y0, [
            u("div", x0, [
              N(ft, {
                columns: k.value,
                rows: w.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: S }) => [
                  u("span", k0, A(l(String(S.date))), 1)
                ]),
                "cell-checkinInit": E(({ row: S }) => [
                  u("span", null, A(r(S.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": E(({ row: S }) => [
                  u("span", null, A(h(
                    S.record_locator_init_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": E(({ row: S }) => [
                  u("span", null, A(h(
                    S.record_locator_started_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": E(({ row: S }) => [
                  u("span", null, A(h(
                    S.record_locator_closed_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": E(({ row: S }) => [
                  u("span", _0, A(h(
                    S.record_locator_completed_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": E(({ row: S }) => [
                  u("span", w0, A(h(
                    S.unrecovered_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: S }) => [
                  u("span", null, A(r(
                    S.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": E(({ row: S }) => [
                  Array.isArray(S.failed_steps) && S.failed_steps.length > 0 ? (g(), x("div", C0, [
                    (g(!0), x(le, null, be(S.failed_steps, (P) => (g(), x("div", {
                      key: P.step_name,
                      class: "reason-item"
                    }, [
                      u("span", $0, A(c(P.step_name)) + ":", 1),
                      u("span", S0, A(P.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", M0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("div", D0, [
            u("div", A0, [
              u("div", T0, [
                N(B(it), { class: "empty-icon" })
              ]),
              M[0] || (M[0] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              M[1] || (M[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), yr = /* @__PURE__ */ ve(B0, [["__scopeId", "data-v-bdd4eaca"]]), L0 = { class: "card-body" }, R0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, P0 = { class: "w-full min-w-0" }, I0 = { class: "segment-plain" }, E0 = { class: "segment-plain" }, F0 = { class: "segment-plain" }, O0 = { class: "percentage-value" }, V0 = { class: "percentage-value" }, z0 = { class: "percentage-value success" }, N0 = {
  key: 1,
  class: "empty-state"
}, j0 = /* @__PURE__ */ ce({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (m) => {
      o("export", m);
    }, { isDark: i } = Me($e(n, "theme")), r = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" }
    ], l = $(
      () => n.data.map((m, b) => ({
        id: `segment-${b}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, b) => !b || b === 0 || !m ? "0%" : `${Math.round(m / b * 100)}%`, d = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), h = (m) => {
      const b = d(m?.departure_airport), f = d(m?.arrival_airport);
      return b === "-" || f === "-" ? !1 : b === f;
    };
    return t({ isDark: i }), (m, b) => (g(), ae(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", L0, [
          n.data.length > 0 ? (g(), x("section", R0, [
            u("div", P0, [
              N(ft, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": E(({ row: f }) => [
                  u("span", I0, A(d(f.departure_airport)), 1)
                ]),
                "cell-connection": E(({ row: f }) => [
                  u("span", {
                    class: Q(["segment-plain", {
                      "segment-plain--muted": d(f.conexion_airport) === "-"
                    }])
                  }, A(d(f.conexion_airport)), 3)
                ]),
                "cell-arrival": E(({ row: f }) => [
                  u("span", E0, A(d(f.arrival_airport)), 1)
                ]),
                "cell-trip": E(({ row: f }) => [
                  u("span", F0, A(h(f) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": E(({ row: f }) => [
                  Ae(A(B(fe)(f.segment_init_count)), 1)
                ]),
                "cell-started": E(({ row: f }) => [
                  u("span", O0, A(c(
                    f.segment_started_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: f }) => [
                  u("span", V0, A(c(
                    f.segment_closed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-completed": E(({ row: f }) => [
                  u("span", z0, A(c(
                    f.segment_completed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (g(), x("section", N0, [...b[0] || (b[0] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No segment data available"),
              u("p", { class: "empty-description" }, " No flight segment data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), xr = /* @__PURE__ */ ve(j0, [["__scopeId", "data-v-9a9d7a34"]]), H0 = { class: "checkin-container__body" }, W0 = /* @__PURE__ */ ce({
  __name: "CheckinContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    childrenInitiallyOpen: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    checkinLoading: { type: Boolean, default: !1 },
    segmentsLoading: { type: Boolean, default: !1 },
    showCheckin: { type: Boolean, default: !0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    checkinData: {},
    checkinFailedData: {},
    segmentsData: {},
    showPaymentLinks: { type: Boolean, default: !1 }
  },
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(
      () => a.loading ? !1 : a.checkinLoading
    ), s = $(
      () => a.loading ? !1 : a.segmentsLoading
    );
    function i(c, d) {
      n("export", { source: c, format: d });
    }
    function r(c) {
      return typeof c == "object" && c !== null && "source" in c;
    }
    function l(c) {
      if (r(c)) {
        n("export", c);
        return;
      }
      i("checkinSegments", c);
    }
    return (c, d) => (g(), ae(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[1] || (d[1] = (h) => n("open"))
    }, {
      default: E(() => [
        u("div", H0, [
          e.showCheckin ? (g(), ae(yr, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            "is-avianca": e.showPaymentLinks,
            onExport: d[0] || (d[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "is-avianca"])) : F("", !0),
          N(xr, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            data: e.segmentsData ?? [],
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: l
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), K0 = /* @__PURE__ */ ve(W0, [["__scopeId", "data-v-bedc6aa8"]]), U0 = { class: "card-body" }, Y0 = { class: "chart-section" }, q0 = { class: "chart-wrapper" }, X0 = {
  key: 1,
  class: "empty-chart"
}, G0 = { class: "payment-success-summary" }, Z0 = {
  key: 0,
  class: "disruption-daily-section"
}, Q0 = { class: "w-full min-w-0" }, J0 = { class: "font-medium text-center" }, eb = { class: "text-center" }, tb = { class: "text-center" }, ab = { class: "percentage-text" }, nb = { class: "text-center" }, ob = { class: "abandoned-value" }, sb = { class: "badges-container badges-wrap" }, ib = { class: "badges-container badges-wrap" }, rb = {
  key: 1,
  class: "empty-state"
}, lb = /* @__PURE__ */ ce({
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
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    function a(y) {
      return y;
    }
    const n = e, o = t, s = (y) => {
      o("export", y);
    }, i = $(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (y, v) => new Date(y.date).getTime() - new Date(v.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], l = $(
      () => i.value.map((y) => ({
        id: y.date,
        ...y
      }))
    ), c = $(() => n.data?.total_payment_success || []), d = $(() => {
      const y = c.value;
      return y.length === 0 ? m(0) : y.map((v) => `${v.currency} ${m(v.total_value)}`).join(" · ");
    }), h = (y, v) => Lt(y, v), m = (y) => Pe(y), b = (y) => (y ?? []).reduce((v, k) => v + (k.count ?? 0), 0), f = (y) => typeof y.sell_success_count == "number" ? y.sell_success_count : b(y.payment_success_total), p = $(() => {
      const y = n.data, v = y.total_disruption_conversations || 0, k = y.total_disruption_initiated || 0, w = y.total_voluntary || 0, _ = y.total_involuntary || 0, C = y.total_accepted || 0, M = y.total_confirmed || 0, S = typeof y.total_sell_success == "number" ? y.total_sell_success : b(y.total_payment_success), P = y.total_sell_failed || 0, I = Math.max(0, v - k), V = Math.max(
        0,
        k - w - _
      ), D = Math.max(0, _ - C), L = Math.max(0, w - M), T = P, j = Math.max(0, M - S - T), H = (ue, q) => ye(ue, q), X = [
        { name: "Initiated", status: "success" },
        { name: "Started", status: "success" },
        { name: "Voluntary", status: "success" },
        { name: "Confirmed", status: "success" },
        { name: "Paid", status: "success" },
        { name: "Not Paid", status: "abandon" },
        { name: "Rejected", status: "error" },
        { name: "Not Confirmed", status: "abandon" },
        { name: "Involuntary", status: "success" },
        { name: "Accepted", status: "success" },
        { name: "Redirect to Human", status: "error" },
        { name: "Abandoned (Init)", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], ie = [];
      return k > 0 && ie.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: H(k, v)
      }), I > 0 && ie.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: I,
        label: H(I, v)
      }), w > 0 && ie.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: H(w, v)
      }), _ > 0 && ie.push({
        source: "Started",
        target: "Involuntary",
        value: _,
        label: H(_, v)
      }), V > 0 && ie.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: V,
        label: H(V, v)
      }), C > 0 && ie.push({
        source: "Involuntary",
        target: "Accepted",
        value: C,
        label: H(C, v)
      }), D > 0 && ie.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: D,
        label: H(D, v)
      }), M > 0 && ie.push({
        source: "Voluntary",
        target: "Confirmed",
        value: M,
        label: H(M, v)
      }), L > 0 && ie.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: H(L, v)
      }), S > 0 && ie.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: H(S, v)
      }), T > 0 && ie.push({
        source: "Confirmed",
        target: "Rejected",
        value: T,
        label: H(T, v)
      }), j > 0 && ie.push({
        source: "Confirmed",
        target: "Not Paid",
        value: j,
        label: H(j, v)
      }), { nodes: X, links: ie };
    });
    return (y, v) => (g(), ae(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: v[0] || (v[0] = (k) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", U0, [
          u("section", Y0, [
            u("div", q0, [
              p.value.nodes.length > 0 && p.value.links.length > 0 ? (g(), ae(aa, {
                key: 0,
                data: p.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (g(), x("div", X0, [...v[1] || (v[1] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", G0, [
            N(xe, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (g(), x("section", Z0, [
            v[2] || (v[2] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", Q0, [
              N(ft, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  u("span", J0, A(B(je)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": E(({ row: k }) => [
                  u("span", eb, A(B(fe)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": E(({ row: k }) => [
                  u("span", tb, [
                    Ae(A(B(fe)(Number(k.disruption_initiated_count))) + " ", 1),
                    u("span", ab, " (" + A(h(
                      Number(k.disruption_initiated_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": E(({ row: k }) => [
                  u("span", nb, [
                    u("span", ob, A(B(fe)(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count)
                    )) + " (" + A(h(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": E(({ row: k }) => [
                  u("div", sb, [
                    (g(!0), x(le, null, be([k], (w, _) => (g(), x(le, { key: _ }, [
                      N(Xe, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Ae(" VOL " + A(B(fe)(w.voluntary_count)) + " (" + A(h(
                            w.voluntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Xe, { color: "success" }, {
                        default: E(() => [
                          Ae(" Confirm " + A(B(fe)(w.confirmed_count)) + " (" + A(h(
                            w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Xe, { color: "warning" }, {
                        default: E(() => [
                          Ae(" Not Confirm " + A(B(fe)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(
                            w.voluntary_count - w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Xe, { color: "danger" }, {
                        default: E(() => [
                          Ae(" Reject " + A(B(fe)(w.sell_failed_count)) + " (" + A(h(
                            w.sell_failed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Xe, { color: "orange" }, {
                        default: E(() => [
                          Ae(" Not Paid " + A(B(fe)(
                            Math.max(
                              0,
                              w.confirmed_count - f(w) - w.sell_failed_count
                            )
                          )) + " (" + A(h(
                            Math.max(
                              0,
                              w.confirmed_count - f(w) - w.sell_failed_count
                            ),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Xe, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Ae(" Finish " + A(B(fe)(f(w))) + " (" + A(h(
                            f(w),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (g(!0), x(le, null, be(w.payment_success_total || [], (C) => (g(), ae(Xe, {
                        key: `${w.date}-${C.currency}`,
                        color: "neutral"
                      }, {
                        default: E(() => [
                          Ae(A(C.currency) + " " + A(m(C.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": E(({ row: k }) => [
                  u("div", ib, [
                    (g(!0), x(le, null, be([k], (w, _) => (g(), x(le, { key: _ }, [
                      N(Xe, { color: "purple" }, {
                        default: E(() => [
                          Ae(" INV " + A(B(fe)(w.involuntary_count)) + " (" + A(h(
                            w.involuntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Xe, { color: "danger" }, {
                        default: E(() => [
                          Ae(" Human " + A(B(fe)(w.involuntary_count - w.accepted_count)) + " (" + A(h(
                            w.involuntary_count - w.accepted_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Xe, { color: "success" }, {
                        default: E(() => [
                          Ae(" Accept " + A(B(fe)(w.accepted_count)) + " (" + A(h(
                            w.accepted_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (g(), x("section", rb, [...v[3] || (v[3] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
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
              ]),
              u("p", { class: "empty-title" }, "No disruption data available"),
              u("p", { class: "empty-description" }, " No disruption data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), cb = /* @__PURE__ */ ve(lb, [["__scopeId", "data-v-033e517a"]]), db = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ub = { class: "w-full shrink-0 flex min-h-0 flex-col" }, hb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, fb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, gb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, mb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, pb = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (b) => {
      o("export", b);
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = oe({
      labels: [],
      datasets: []
    }), d = $(
      () => n.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), h = $(() => {
      const b = d.value, f = b.total_airline_information_retrieved + b.total_booking_info_retrieved + b.total_flight_status_retrieved, p = (k) => f > 0 ? (k / f * 100).toFixed(1) : "0.0", y = b.total_faq_events, v = y > 0 ? `${(b.total_documents_found / y * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${p(b.total_airline_information_retrieved)}%`,
          subvalue: `${fe(b.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${p(b.total_booking_info_retrieved)}%`,
          subvalue: `${fe(b.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${p(b.total_flight_status_retrieved)}%`,
          subvalue: `${fe(b.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: fe(b.total_documents_found),
          subvalue: v
        }
      ];
    }), m = (b) => {
      if (!b) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const f = b.faq_by_day || [];
      if (f.length > 0) {
        const p = f.map(
          (w) => je(w.date).format("MMM DD")
        ), y = f.map(
          (w) => w.airline_information_retrieved_count || 0
        ), v = f.map(
          (w) => w.flight_status_retrieved_count || 0
        ), k = f.map(
          (w) => w.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: p,
          datasets: [
            {
              label: "Airline Information",
              data: y,
              borderColor: l.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: v,
              borderColor: l.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: k,
              borderColor: l.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Re(
      () => n.data,
      (b) => {
        m(b ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (b, f) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", db, [
          u("div", ub, [
            c.value.labels && c.value.labels.length ? (g(), x("section", hb, [
              u("div", fb, [
                N(mt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", gb, [
                (g(!0), x(le, null, be(h.value, (p) => (g(), ae(xe, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: p.value,
                  subvalue: p.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (g(), x("section", mb, [...f[0] || (f[0] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("div", { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                  u("svg", {
                    class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])
                ]),
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), bb = /* @__PURE__ */ ve(pb, [["__scopeId", "data-v-b6ea961f"]]);
function Ro(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function He() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const rt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ot = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", vb = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", St = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Mt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", yb = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function ri(e = "neutral") {
  return `${yb} kiut-select-option-badge--${e}`;
}
const xb = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], kb = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, _b = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, wb = { class: "relative" }, Cb = ["placeholder", "aria-label"], $b = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Sb = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Mb = ["aria-selected", "onClick", "onMouseenter"], Db = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Ab = { class: "min-w-0 flex-1 truncate" }, na = /* @__PURE__ */ ce({
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
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: void 0 },
    invalid: { type: Boolean },
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-select-${He()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = `${o}-err`, c = $(() => a.invalid ?? !1), d = oe(null), h = oe(null), m = oe(null), b = oe(null), f = oe(null), p = oe(!1), y = oe(0), v = oe(""), k = oe({});
    function w() {
      const Y = h.value;
      if (!Y) return;
      const de = Y.getBoundingClientRect();
      k.value = {
        top: `${de.bottom - 3}px`,
        left: `${de.left}px`,
        width: `${de.width}px`
      };
    }
    const _ = $(() => a.options.filter((Y) => !Y.disabled)), C = $(() => {
      if (!a.searchable) return _.value;
      const Y = v.value.trim().toLowerCase();
      return Y ? _.value.filter(
        (de) => de.label.toLowerCase().includes(Y) || de.badge?.label.toLowerCase().includes(Y)
      ) : _.value;
    }), M = $(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), S = $(
      () => a.options.find((Y) => Y.value === a.modelValue) ?? null
    ), P = $(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : S.value?.label ?? String(a.modelValue)), I = $(() => S.value?.leadingClass);
    function V(Y) {
      return `${String(Y.value)}-${Y.label}`;
    }
    function D(Y) {
      return a.modelValue === Y.value;
    }
    function L(Y, de) {
      const ge = D(Y), te = y.value === de, z = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        z ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        ge ? z ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary)]/15" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ge && te ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function T() {
      y.value = Math.max(
        0,
        C.value.findIndex((Y) => Y.value === a.modelValue)
      );
    }
    function j() {
      if (a.searchable) {
        f.value?.focus();
        return;
      }
      b.value?.focus();
    }
    function H() {
      w(), v.value = "", T(), We(() => j());
    }
    function X() {
      p.value = !1, v.value = "";
    }
    function ie(Y) {
      n("update:modelValue", Y.value), X();
    }
    function ue() {
      if (!a.disabled) {
        if (p.value) {
          X();
          return;
        }
        p.value = !0, H();
      }
    }
    function q(Y) {
      Y.stopPropagation(), !a.disabled && ue();
    }
    function ne(Y) {
      if (!p.value) return;
      const de = Y.target, ge = d.value, te = m.value;
      ge && !ge.contains(de) && (!te || !te.contains(de)) && X();
    }
    function R(Y) {
      a.disabled || (Y.key === "ArrowDown" || Y.key === "Enter" || Y.key === " ") && (Y.preventDefault(), p.value || (p.value = !0, H()));
    }
    function K(Y) {
      const de = C.value;
      if (Y.key === "Escape") {
        Y.preventDefault(), X();
        return;
      }
      if (Y.key === "ArrowDown") {
        if (Y.preventDefault(), de.length === 0) return;
        y.value = 0, b.value?.focus();
        return;
      }
      if (Y.key === "ArrowUp") {
        if (Y.preventDefault(), de.length === 0) return;
        y.value = de.length - 1, b.value?.focus();
        return;
      }
      if (Y.key === "Enter") {
        Y.preventDefault();
        const ge = de[y.value];
        ge && ie(ge);
      }
    }
    function U(Y) {
      const de = C.value;
      if (Y.key === "Escape") {
        Y.preventDefault(), X();
        return;
      }
      if (de.length !== 0) {
        if (Y.key === "ArrowDown") {
          Y.preventDefault(), y.value = Math.min(y.value + 1, de.length - 1);
          return;
        }
        if (Y.key === "ArrowUp") {
          if (Y.preventDefault(), y.value === 0 && a.searchable) {
            f.value?.focus();
            return;
          }
          y.value = Math.max(y.value - 1, 0);
          return;
        }
        if (Y.key === "Enter") {
          Y.preventDefault();
          const ge = de[y.value];
          ge && ie(ge);
        }
      }
    }
    return Re(v, () => {
      y.value = 0;
    }), Je(() => {
      document.addEventListener("click", ne);
    }), st(() => {
      document.removeEventListener("click", ne);
    }), (Y, de) => (g(), x("div", {
      ref_key: "rootRef",
      ref: d,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: Q(B(rt))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: h,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Q([
          B(ot),
          c.value ? B(St) : "",
          p.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": p.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : M.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? l : void 0,
        onClick: q,
        onKeydown: R
      }, [
        u("span", kb, [
          I.value ? (g(), x("span", {
            key: 0,
            class: Q([I.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : F("", !0),
          u("span", {
            class: Q([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(P.value), 3),
          S.value?.badge ? (g(), x("span", {
            key: 1,
            class: Q(B(ri)(S.value.badge.variant))
          }, A(S.value.badge.label), 3)) : F("", !0)
        ]),
        N(B(ta), {
          class: Q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", p.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, xb),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 3)) : F("", !0),
      (g(), ae(Zt, { to: "body" }, [
        Qe(u("div", {
          ref_key: "panelRef",
          ref: m,
          style: we(k.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (g(), x("div", _b, [
            u("div", wb, [
              N(B(pr), {
                class: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--kiut-text-muted)] dark:text-slate-500",
                "aria-hidden": "true"
              }),
              Qe(u("input", {
                ref_key: "searchInputRef",
                ref: f,
                "onUpdate:modelValue": de[0] || (de[0] = (ge) => v.value = ge),
                type: "search",
                class: Q([B(ot), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: de[1] || (de[1] = ze(() => {
                }, ["stop"])),
                onKeydown: ze(K, ["stop"])
              }, null, 42, Cb), [
                [Vt, v.value]
              ])
            ])
          ])) : F("", !0),
          e.listSectionLabel ? (g(), x("p", $b, A(e.listSectionLabel), 1)) : F("", !0),
          u("ul", {
            id: r,
            ref_key: "listRef",
            ref: b,
            role: "listbox",
            tabindex: "-1",
            class: Q(e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"),
            onKeydown: ze(U, ["stop"])
          }, [
            C.value.length === 0 ? (g(), x("li", Sb, A(e.noResultsText), 1)) : F("", !0),
            (g(!0), x(le, null, be(C.value, (ge, te) => (g(), x("li", {
              key: V(ge),
              role: "option",
              "aria-selected": D(ge),
              class: Q(L(ge, te)),
              onClick: ze((z) => ie(ge), ["stop"]),
              onMouseenter: (z) => y.value = te
            }, [
              ge.leadingClass ? (g(), x("span", {
                key: 0,
                class: Q([ge.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : F("", !0),
              e.showOptionCheck ? (g(), x("span", Db, [
                D(ge) ? (g(), ae(B(Ro), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ])) : F("", !0),
              u("span", Ab, A(ge.label), 1),
              ge.badge ? (g(), x("span", {
                key: 2,
                class: Q(B(ri)(ge.badge.variant))
              }, A(ge.badge.label), 3)) : F("", !0)
            ], 42, Mb))), 128))
          ], 34)
        ], 4), [
          [Qt, p.value]
        ])
      ]))
    ], 512));
  }
}), Ct = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), Tb = {
  key: 0,
  class: "w-52"
}, Bb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Lb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Rb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Pb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ib = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Eb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Fb = { class: "max-w-[360px] px-4 text-center" }, Ob = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Vb = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, zb = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, Nb = /* @__PURE__ */ ce({
  __name: "MessagesPerAgent",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    title: { default: "Interactions by Agent" },
    subtitle: { default: "Responses sent by AI agents" },
    unit: { default: "msgs" },
    totalConversations: { default: void 0 },
    emptyTitle: { default: "No agent interactions data" },
    emptyDescription: { default: "Try adjusting the date range or check your filters to see agent interaction trends." },
    breakdownBy: { default: "" },
    breakdownOptions: { default: () => [] },
    showSummaryCards: { type: Boolean, default: !0 },
    maxSeries: { default: void 0 }
  },
  emits: ["export", "changeBreakdown"],
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
      loyalty: "#EAB308",
      unassigned: "#64748B"
    }, o = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], s = e, i = a, r = (k) => {
      i("export", k);
    }, l = (k) => {
      i("changeBreakdown", String(k));
    }, c = (k) => {
      const w = k.toLowerCase(), _ = n[w] || n[k];
      if (_) return _;
      const C = Array.from(w).reduce(
        (M, S) => (M << 5) - M + S.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs(C) % o.length];
    }, d = $e(s, "theme"), { isDark: h } = Me(d), m = (k) => {
      const w = Ct(k).replace(/_/g, " ");
      return w.charAt(0).toUpperCase() + w.slice(1);
    }, b = $(() => {
      const k = {};
      for (const w of Object.values(s.data?.agents_by_day || {}))
        for (const [_, C] of Object.entries(w))
          k[_] = (k[_] || 0) + C;
      return k;
    }), f = $(() => {
      const k = s.data?.agents_by_day || {}, w = Object.keys(k).sort();
      if (w.length === 0)
        return { labels: [], datasets: [] };
      const C = Object.keys(b.value).sort(
        (M, S) => b.value[S] - b.value[M] || M.localeCompare(S)
      ).slice(0, s.maxSeries).map((M) => ({
        label: m(M),
        data: w.map((S) => k[S]?.[M] || 0),
        borderColor: c(M)
      }));
      return {
        labels: w.map((M) => je(M).format("MMM DD")),
        datasets: C
      };
    }), p = $(() => {
      const k = Object.values(b.value).reduce((_, C) => _ + C, 0), w = s.totalConversations ?? k;
      return w === 0 ? [] : Object.entries(b.value).sort(([, _], [, C]) => C - _).map(([_, C]) => ({
        name: _,
        label: m(_),
        total: C,
        percentage: (C / w * 100).toFixed(1),
        color: c(_)
      }));
    }), y = $(() => p.value.slice(0, 4)), v = $(() => {
      const k = y.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    });
    return t({ isDark: h }), (k, w) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: E(() => [
        s.breakdownOptions.length ? (g(), x("div", Tb, [
          N(na, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": l
          }, null, 8, ["model-value", "options"])
        ])) : F("", !0)
      ]),
      headerExport: E(() => [
        e.enableExport && !s.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: r
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", Bb, [
          u("div", Lb, [
            f.value.labels && f.value.labels.length ? (g(), x("section", Rb, [
              u("div", Pb, [
                N(mt, {
                  data: f.value,
                  options: e.options,
                  theme: d.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && y.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(v.value)
              }, [
                (g(!0), x(le, null, be(y.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${B(fe)(_.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : s.showSummaryCards && p.value.length ? (g(), x("section", Ib, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(v.value)
              }, [
                (g(!0), x(le, null, be(y.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${B(fe)(_.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            p.value.length ? F("", !0) : (g(), x("section", Eb, [
              u("div", Fb, [
                u("div", Ob, [
                  N(B(it), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                u("p", Vb, A(s.emptyTitle), 1),
                u("p", zb, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), kr = /* @__PURE__ */ ve(Nb, [["__scopeId", "data-v-c97ff9a5"]]), jb = { class: "card-body" }, Hb = {
  key: 0,
  class: "chart-section"
}, Wb = { class: "chart-wrapper" }, Kb = {
  key: 1,
  class: "record-locator-daily-section"
}, Ub = { class: "w-full min-w-0" }, Yb = { class: "cell-plain font-medium" }, qb = { class: "cell-plain text-center" }, Xb = { class: "cell-plain text-center" }, Gb = { class: "cell-plain text-center" }, Zb = { class: "cell-plain text-center" }, Qb = { class: "cell-plain text-center success-value" }, Jb = { class: "cell-plain text-center failed-value" }, ev = { class: "cell-plain text-center warning-value" }, tv = { class: "cell-plain text-center" }, av = { class: "cell-plain text-center failed-value" }, nv = {
  key: 2,
  class: "empty-state"
}, ov = /* @__PURE__ */ ce({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (y) => {
      o("export", y);
    }, { isDark: i } = Me($e(n, "theme")), r = $(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (y, v) => new Date(y.date).getTime() - new Date(v.date).getTime()
    ) : []), l = [
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
    ], d = $(
      () => n.isAvianca ? [...l, ...c] : l
    ), h = $(
      () => r.value.map((y) => ({
        id: y.date,
        date: y.date,
        checkin_initiated: y.checkin_initiated,
        record_locator_init_count: y.record_locator_init_count,
        record_locator_started_count: y.record_locator_started_count,
        record_locator_completed_count: y.record_locator_completed_count,
        record_locator_closed_count: y.record_locator_closed_count,
        record_locator_failed_count: y.record_locator_failed_count,
        record_locator_abandoned_count: y.record_locator_abandoned_count,
        record_locator_create_payment_count: y.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: y.record_locator_create_payment_failed_count
      }))
    ), m = $(() => n.data), b = (y, v) => Lt(y, v), f = (y, v) => {
      const k = fe(y), w = b(y, v);
      return `${k} (${w})`;
    }, p = $(() => {
      const y = [], v = [], k = /* @__PURE__ */ new Set(), w = (U) => {
        k.has(U) || (y.push({ name: U }), k.add(U));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: y, links: v };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const _ = m.value.total_checkin_initiated, C = m.value.total_record_locator_init, M = m.value.total_record_locator_started, S = m.value.total_record_locator_completed, P = m.value.total_record_locator_closed, I = m.value.total_record_locator_failed, V = m.value.total_record_locator_abandoned, D = m.value.total_record_locator_init_abandoned, L = m.value.total_checkin_pre_init_abandoned_error, T = m.value.total_checkin_pre_init_abandoned_voluntary, j = L != null || T != null, H = j ? Math.max(Number(L) || 0, 0) : 0, X = j ? Math.max(Number(T) || 0, 0) : 0, ie = m.value.total_record_locator_init_abandoned_error, ue = m.value.total_record_locator_init_abandoned_voluntary, q = ie != null || ue != null, ne = q ? Math.max(Number(ie) || 0, 0) : 0, R = q ? Math.max(Number(ue) || 0, 0) : 0;
      C > 0 && v.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: C,
        label: ye(C, _)
      });
      const K = _ - C;
      return j ? (X > 0 && (w("Abandoned (Init)"), v.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: X,
        label: ye(X, _)
      })), H > 0 && (w("Booking not retreived"), v.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, _)
      }))) : K > 0 && (w("Abandoned (Init)"), v.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, _)
      })), M > 0 && v.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: M,
        label: ye(M, _)
      }), q ? (ne > 0 && (w("Error"), v.push({
        source: "Booking retrive",
        target: "Error",
        value: ne,
        label: ye(ne, _)
      })), R > 0 && (w("Abandoned (Started)"), v.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ye(R, _)
      }))) : D > 0 && (w("Abandoned (Started)"), v.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: D,
        label: ye(D, _)
      })), S > 0 && v.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: S,
        label: ye(S, _)
      }), P > 0 && v.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: P,
        label: ye(P, _)
      }), I > 0 && (w("Checkin Failed"), v.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: I,
        label: ye(I, _)
      })), V > 0 && (w("Abandoned (Flow)"), v.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: V,
        label: ye(V, _)
      })), { nodes: y, links: v };
    });
    return t({ isDark: i }), (y, v) => (g(), ae(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", jb, [
          p.value.nodes.length > 0 ? (g(), x("section", Hb, [
            u("div", Wb, [
              N(aa, {
                data: p.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          r.value && r.value.length > 0 ? (g(), x("section", Kb, [
            u("div", Ub, [
              N(ft, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  u("span", Yb, A(B(je)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: k }) => [
                  u("span", qb, A(B(fe)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: k }) => [
                  u("span", Xb, A(f(
                    k.record_locator_init_count,
                    k.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": E(({ row: k }) => [
                  u("span", Gb, A(B(fe)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": E(({ row: k }) => [
                  u("span", Zb, A(f(
                    k.record_locator_completed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": E(({ row: k }) => [
                  u("span", Qb, A(f(
                    k.record_locator_closed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": E(({ row: k }) => [
                  u("span", Jb, A(f(
                    k.record_locator_failed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": E(({ row: k }) => [
                  u("span", ev, A(f(
                    k.record_locator_abandoned_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: k }) => [
                  u("span", tv, A(B(fe)(
                    k.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": E(({ row: k }) => [
                  u("span", av, A(B(fe)(
                    k.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", nv, [...v[0] || (v[0] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No record locator data available"),
              u("p", { class: "empty-description" }, " No record locator data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), sv = /* @__PURE__ */ ve(ov, [["__scopeId", "data-v-f904c66a"]]), iv = { class: "card-body" }, rv = {
  key: 0,
  class: "chart-section"
}, lv = {
  key: 1,
  class: "empty-state"
}, cv = {
  key: 2,
  class: "comparison-section"
}, dv = { class: "comparison-grid" }, uv = /* @__PURE__ */ ce({
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
    }, o = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], s = e, i = a, r = (f) => {
      i("export", f);
    }, { isDark: l } = Me($e(s, "theme"));
    $(() => s.data?.total_sell_success ?? 0);
    const c = $(() => {
      const f = /* @__PURE__ */ new Set();
      for (const p of s.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(p.channels))
          f.add(y);
      return Array.from(f).sort();
    }), d = (f, p) => n[f.toLowerCase()] ?? o[p % o.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function m(f) {
      if (f.delta === null) return "No previous data";
      const p = fe(f.previous), y = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${p})` : `${f.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${p})`;
    }
    const b = $(() => {
      const f = s.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const p = f.map((v) => je(v.date).format("MMM-DD")), y = c.value.map((v, k) => ({
        label: v,
        data: f.map((w) => w.channels[v] ?? 0),
        backgroundColor: d(v, k),
        borderRadius: 4
      }));
      return { labels: p, datasets: y };
    });
    return t({ isDark: l }), (f, p) => (g(), ae(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: r,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", iv, [
          b.value.labels.length > 0 ? (g(), x("section", rv, [
            N($t, {
              data: b.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (g(), x("section", lv, [...p[0] || (p[0] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No sales data available"),
              u("p", { class: "empty-description" }, " No sales by channel data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          e.channelComparison.length > 0 ? (g(), x("section", cv, [
            u("div", dv, [
              (g(!0), x(le, null, be(e.channelComparison, (y, v) => (g(), ae(B(xe), {
                key: y.channel,
                color: d(y.channel, v),
                title: h(y.channel),
                value: B(fe)(y.current),
                subvalue: m(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), _r = /* @__PURE__ */ ve(uv, [["__scopeId", "data-v-4879d791"]]), hv = { class: "card-body" }, fv = {
  key: 0,
  class: "chart-section"
}, gv = { class: "chart-wrapper" }, mv = {
  key: 1,
  class: "empty-state"
}, pv = { class: "seller-value-cards" }, bv = {
  key: 2,
  class: "seller-daily-section"
}, vv = { class: "w-full min-w-0" }, yv = { class: "sl-cell font-medium" }, xv = { class: "sl-cell text-center" }, kv = { class: "sl-cell text-center" }, _v = { class: "sl-cell text-center" }, wv = { class: "sl-cell text-center" }, Cv = { class: "sl-cell text-center success-value" }, $v = {
  key: 0,
  class: "currency-cell-list"
}, Sv = {
  key: 1,
  class: "empty-cell"
}, Mv = { class: "sl-cell text-center success-value" }, Dv = { class: "sl-cell text-center success-value" }, Av = {
  key: 0,
  class: "currency-cell-list"
}, Tv = {
  key: 1,
  class: "empty-cell"
}, Bv = { class: "sl-cell text-center success-value" }, Lv = { class: "sl-cell text-center" }, Rv = { class: "sl-cell text-center success-value" }, Pv = {
  key: 0,
  class: "currency-cell-list"
}, Iv = { key: 1 }, Ev = {
  key: 0,
  class: "failed-reasons"
}, Fv = { class: "reason-name" }, Ov = { class: "reason-count" }, Vv = {
  key: 1,
  class: "empty-cell"
}, zv = /* @__PURE__ */ ce({
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
    exportLoading: { type: Boolean, default: !1 },
    initiallyOpen: { type: Boolean, default: !0 },
    showPaymentMethodDetails: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    function n(D) {
      return D;
    }
    const o = e, s = a, i = (D) => {
      s("export", D);
    }, { isDark: r } = Me($e(o, "theme")), l = $(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const D = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((L) => {
        const T = D.findIndex(
          (j) => j.date === L.date
        );
        T !== -1 ? D[T] = { ...D[T], reasons: L.reasons } : D.push({
          date: L.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: L.reasons
        });
      }), D.sort(
        (L, T) => new Date(L.date).getTime() - new Date(T.date).getTime()
      );
    }), c = $(() => {
      const D = [
        { key: "date", label: "Date", align: "center" },
        { key: "sellInitiated", label: "Sell Initiated", align: "center" },
        { key: "sellStarted", label: "Sell Started", align: "center" },
        { key: "getQuote", label: "Get Quote", align: "center" },
        { key: "bookingCreated", label: "Booking Created", align: "center" }
      ];
      return o.showPaymentMethodDetails && D.push(
        { key: "btValue", label: "BT Success Value", align: "center" },
        { key: "btSuccess", label: "BT Success", align: "center" },
        { key: "coValue", label: "CO Success Value", align: "center" },
        { key: "cashSuccess", label: "Cash Success", align: "center" }
      ), D.push(
        { key: "sellSuccess", label: "Sell Success", align: "center" },
        { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
        { key: "failed", label: "Failed", align: "left" }
      ), D;
    }), d = $(
      () => l.value.map((D) => ({
        id: D.date,
        ...D
      }))
    ), h = $(() => o.sellerData), m = $(() => o.failedData), b = $(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), f = $(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), p = $(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), y = $(() => {
      const D = b.value;
      return D.length > 0 ? D.map(
        (L) => `${L.currency} ${jt(L.total_value)}`
      ).join(" · ") : V(o.sellerData.total_value_sell_success);
    });
    function v(D) {
      return D.length > 0 ? D.map(
        (L) => `${L.currency} ${jt(L.total_value)}`
      ).join(" · ") : "—";
    }
    const k = $(
      () => v(f.value)
    ), w = $(
      () => v(p.value)
    ), _ = (D) => D.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), C = (D) => `Failed:
${_(D)}`, M = $(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: T = 0,
        total_sell_success: j = 0,
        total_sell_success_bank_transfer: H = 0,
        total_sell_success_cash: X = 0
      } = h.value, { failed_by_reason_by_day: ie = [] } = m.value;
      if (D === 0) return { nodes: [], links: [] };
      const ue = j, q = [
        { name: "Sell Initiated", value: D, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: T, status: "success" },
        { name: "Sell Success", value: ue, status: "success" }
      ], ne = [], R = D - L;
      R > 0 && (q.push({
        name: "Abandoned (Init)",
        value: R,
        status: "abandon"
      }), ne.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: R,
        label: ye(R, D)
      })), L > 0 && ne.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: L,
        label: ye(L, D)
      });
      const K = ie.reduce(
        (de, ge) => (ge.reasons && Array.isArray(ge.reasons) && ge.reasons.forEach((te) => {
          const z = te.reason, Z = te.failed_count;
          de[z] = (de[z] || 0) + Z;
        }), de),
        {}
      );
      T > 0 && ne.push({
        source: "Sell Started",
        target: "Booking Created",
        value: T,
        label: ye(T, D)
      }), (H ?? 0) > 0 && (q.push({
        name: "Bank Transfer",
        value: H ?? 0,
        status: "success"
      }), ne.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: H ?? 0,
        label: ye(H ?? 0, D)
      })), (X ?? 0) > 0 && (q.push({
        name: "Cash Option",
        value: X ?? 0,
        status: "success"
      }), ne.push({
        source: "Booking Created",
        target: "Cash Option",
        value: X ?? 0,
        label: ye(X ?? 0, D)
      })), ue > 0 && ne.push({
        source: "Booking Created",
        target: "Sell Success",
        value: ue,
        label: ye(ue, D)
      });
      const U = T - ue - (H ?? 0) - (X ?? 0);
      U > 0 && (q.push({
        name: "Failed at Completion",
        value: U,
        status: "error"
      }), ne.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: U,
        label: ye(U, D)
      }));
      const Y = L - T;
      if (Y > 0 && (q.push({
        name: "Failed at Booking",
        value: Y,
        status: "error"
      }), ne.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: Y,
        label: ye(Y, D)
      })), Object.keys(K).length > 0) {
        const de = Object.values(K).reduce(
          (te, z) => te + z,
          0
        ), ge = Y - de;
        Object.entries(K).filter(([, te]) => te > 0).sort(([, te], [, z]) => z - te).forEach(([te, z]) => {
          const Z = `Failed: ${te}`;
          q.push({
            name: Z,
            value: z,
            status: "error",
            label: C(te)
          }), ne.push({
            source: "Failed at Booking",
            target: Z,
            value: z,
            label: ye(z, D)
          });
        }), ge > 0 && (q.push({
          name: "Failed: Without Reason",
          value: ge,
          status: "error",
          label: `Failed:
Without Reason`
        }), ne.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: ge,
          label: ye(ge, D)
        }));
      }
      return {
        nodes: q,
        links: ne
      };
    }), S = (D, L) => Lt(D, L), P = (D, L) => {
      const T = fe(D), j = S(D, L);
      return `${T} (${j})`;
    }, I = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((L, T) => L + (T.total_value || 0), 0) : 0, V = (D) => jt(I(D));
    return t({ isDark: r }), (D, L) => (g(), ae(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", hv, [
          M.value.nodes.length > 0 ? (g(), x("section", fv, [
            u("div", gv, [
              N(aa, {
                data: M.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (g(), x("section", mv, [...L[0] || (L[0] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No sales data available"),
              u("p", { class: "empty-description" }, " No sales data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          u("section", pv, [
            N(xe, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: y.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (g(), x(le, { key: 0 }, [
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: k.value
              }, null, 8, ["value"]),
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: w.value
              }, null, 8, ["value"])
            ], 64)) : F("", !0)
          ]),
          l.value && l.value.length > 0 ? (g(), x("section", bv, [
            u("div", vv, [
              N(ft, {
                columns: c.value,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: T }) => [
                  u("span", yv, A(B(je)(String(T.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": E(({ row: T }) => [
                  u("span", xv, A(B(fe)(Number(T.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": E(({ row: T }) => [
                  u("span", kv, A(P(
                    T.sell_started_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": E(({ row: T }) => [
                  u("span", _v, A(P(
                    T.sell_get_quote_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": E(({ row: T }) => [
                  u("span", wv, A(P(
                    T.sell_booking_created_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": E(({ row: T }) => [
                  u("span", Cv, [
                    Array.isArray(
                      T.daily_value_sell_success_bank_transfer
                    ) && T.daily_value_sell_success_bank_transfer.length > 0 ? (g(), x("div", $v, [
                      (g(!0), x(le, null, be(T.daily_value_sell_success_bank_transfer, (j) => (g(), x("span", {
                        key: `${T.date}-bt-success-${j.currency}`
                      }, A(j.currency) + " " + A(B(jt)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", Sv, "-"))
                  ])
                ]),
                "cell-btSuccess": E(({ row: T }) => [
                  u("span", Mv, A(B(fe)(
                    Number(
                      T.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": E(({ row: T }) => [
                  u("span", Dv, [
                    Array.isArray(
                      T.daily_value_sell_success_cash
                    ) && T.daily_value_sell_success_cash.length > 0 ? (g(), x("div", Av, [
                      (g(!0), x(le, null, be(T.daily_value_sell_success_cash, (j) => (g(), x("span", {
                        key: `${T.date}-co-success-${j.currency}`
                      }, A(j.currency) + " " + A(B(jt)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", Tv, "-"))
                  ])
                ]),
                "cell-cashSuccess": E(({ row: T }) => [
                  u("span", Bv, A(B(fe)(
                    Number(T.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": E(({ row: T }) => [
                  u("span", Lv, A(P(
                    T.sell_success_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": E(({ row: T }) => [
                  u("span", Rv, [
                    Array.isArray(T.daily_value_sell_success) && T.daily_value_sell_success.length > 0 ? (g(), x("div", Pv, [
                      (g(!0), x(le, null, be(T.daily_value_sell_success, (j) => (g(), x("span", {
                        key: `${T.date}-${j.currency}`
                      }, A(j.currency) + " " + A(B(jt)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", Iv, A(V(
                      T.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": E(({ row: T }) => [
                  (T.reasons || []).length > 0 ? (g(), x("div", Ev, [
                    (g(!0), x(le, null, be(T.reasons || [], (j) => (g(), x("div", {
                      key: j.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", Fv, A(j.reason) + ":", 1),
                      u("span", Ov, A(j.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", Vv, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), wr = /* @__PURE__ */ ve(zv, [["__scopeId", "data-v-19fee7a8"]]), Nv = { class: "seller-container__body" }, jv = /* @__PURE__ */ ce({
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
    showPaymentMethodDetails: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    sellerData: {},
    failedData: {},
    salesByChannelData: {},
    channelComparison: { default: () => [] }
  },
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(
      () => a.loading ? !1 : a.sellerLoading
    ), s = $(
      () => a.loading ? !1 : a.salesByChannelLoading
    ), i = $(() => a.exportLoading || a.sellerExportLoading), r = $(() => a.exportLoading || a.salesByChannelExportLoading);
    function l(c, d) {
      n("export", { source: c, format: d });
    }
    return (c, d) => (g(), ae(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[2] || (d[2] = (h) => n("open"))
    }, {
      default: E(() => [
        u("div", Nv, [
          N(wr, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            "show-payment-method-details": e.showPaymentMethodDetails,
            onExport: d[0] || (d[0] = (h) => l("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading", "show-payment-method-details"]),
          N(_r, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": r.value,
            onExport: d[1] || (d[1] = (h) => l("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Hv = /* @__PURE__ */ ve(jv, [["__scopeId", "data-v-34a76e0c"]]), Wv = { class: "card-body" }, Kv = {
  key: 0,
  class: "chart-section"
}, Uv = {
  key: 1,
  class: "empty-state"
}, Yv = { class: "empty-state-content" }, qv = { class: "empty-icon-wrapper" }, Xv = /* @__PURE__ */ ce({
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
    }, o = e, s = a, i = (h) => {
      s("export", h);
    }, { isDark: r, colors: l } = Me($e(o, "theme")), c = $(() => {
      const m = (o.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const b = m.reduce(
        (y, v) => y + (Number(v.conversations) || 0),
        0
      ), f = m.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return n[v] || "#94a3b8";
      }), p = f.map((y) => `${y}80`);
      return {
        labels: m.map((y) => {
          const v = Number(y.conversations) || 0, k = b ? v / b * 100 : 0;
          return `${Ct(y.agent_type)} - ${v.toLocaleString()} (${k.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((y) => y.conversations),
            backgroundColor: p,
            borderColor: f,
            borderWidth: 2
          }
        ]
      };
    }), d = $(() => o.options ? o.options : {
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
              const m = (h.label || "").toString().split(" - ")[0], b = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (y, v) => y + (Number(v) || 0),
                0
              ), p = f ? b / f * 100 : 0;
              return `${m}: ${b.toLocaleString()} (${p.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, m) => (g(), ae(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", Wv, [
          c.value.labels && c.value.labels.length ? (g(), x("section", Kv, [
            N(Pn, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (g(), x("section", Uv, [
            u("div", Yv, [
              u("div", qv, [
                N(B(Zm), { class: "empty-icon" })
              ]),
              m[0] || (m[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
              m[1] || (m[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Gv = /* @__PURE__ */ ve(Xv, [["__scopeId", "data-v-34a998ae"]]), Zv = { class: "card-body" }, Qv = {
  key: 0,
  class: "payment-methods-section"
}, Jv = { class: "payment-methods-grid" }, ey = {
  key: 1,
  class: "empty-state"
}, ty = { class: "empty-state-content" }, ay = { class: "empty-icon-wrapper" }, ny = {
  key: 2,
  class: "payment-method-daily-section"
}, oy = { class: "w-full min-w-0" }, sy = { class: "font-medium" }, iy = { class: "text-center" }, ry = { class: "text-center success-value" }, ly = {
  key: 0,
  class: "currency-cell-list"
}, cy = { class: "payment-tags" }, dy = { class: "tag-name" }, uy = {
  key: 0,
  class: "tag-amount"
}, hy = {
  key: 1,
  class: "tag-amount"
}, fy = { class: "tag-count" }, gy = {
  key: 3,
  class: "empty-table-state"
}, my = "Not Registered", py = /* @__PURE__ */ ce({
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
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, { isDark: s } = Me($e(n, "theme")), i = oe(!1), r = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = $(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = $(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), d = $(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((S, P) => je(S.date).valueOf() - je(P.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = $(
      () => d.value.map((S) => ({
        id: S.date,
        date: S.date,
        total_count: S.total_count,
        total_amount: S.total_amount,
        total_amount_by_currency: S.total_amount_by_currency,
        payment_methods: S.payment_methods
      }))
    ), b = (S) => {
      if (!S)
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
      const P = (S.payment_method_breakdown || []).map(
        (V) => ({
          payment_method: V.payment_method || "Unknown",
          total_amount: V.total_amount ?? 0,
          count: V.count ?? 0,
          total_amount_by_currency: V.total_amount_by_currency ?? []
        })
      ), I = (S.payment_method_by_day || []).map((V) => ({
        date: V.date || "",
        total_count: V.total_count ?? 0,
        total_amount: V.total_amount ?? 0,
        total_amount_by_currency: V.total_amount_by_currency ?? [],
        payment_methods: (V.payment_methods || []).map((D) => ({
          payment_method: D.payment_method || "Unknown",
          total_amount: D.total_amount ?? 0,
          count: D.count ?? 0,
          total_amount_by_currency: D.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: S.airline_name || n.airlineName,
        start_date: S.start_date || "",
        end_date: S.end_date || "",
        total_conversations: S.total_conversations ?? 0,
        total_amount: S.total_amount ?? 0,
        total_sell_usd: S.total_sell_usd,
        total_amount_by_currency: S.total_amount_by_currency ?? [],
        payment_method_breakdown: P,
        payment_method_by_day: I
      };
    }, f = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [S, P] = n.dates.map(
            (V) => je(V).format("YYYY-MM-DD")
          ), I = await n.fetchFunction(
            n.airlineName,
            S,
            P
          );
          r.value = b(I);
        } catch (S) {
          console.error("Error fetching payment method metrics:", S), r.value = b(null);
        } finally {
          i.value = !1;
        }
      }
    }, p = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], y = (S) => !S || S.toLowerCase() === "unknown" ? my : S.replace(/_/g, " "), v = (S) => S == null ? "$0.00" : Pe(S), k = (S) => {
      const P = S.total_amount_by_currency;
      return P && P.length > 0 ? P.map((I) => `${I.currency} ${v(I.total_value)}`).join(" · ") : v(S.total_amount);
    }, w = (S) => S ? je(S).format("MMM DD") : "-", _ = (S) => S == null || Number.isNaN(Number(S)) ? 0 : Number(S), C = (S) => {
      o("export", S);
    };
    function M() {
      const S = n.data;
      S && (Array.isArray(S.payment_method_breakdown) && S.payment_method_breakdown.length > 0 || Array.isArray(S.payment_method_by_day) && S.payment_method_by_day.length > 0) && (i.value = !1, r.value = b(S));
    }
    return Je(() => {
      n.data ? M() : f();
    }), Re(
      () => n.data,
      (S) => {
        S && M();
      },
      { deep: !0 }
    ), Re(
      () => n.dates,
      (S) => {
        n.data || S && S[0] && S[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: s }), (S, P) => (g(), ae(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: P[0] || (P[0] = (I) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !i.value ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: C,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", Zv, [
          l.value ? (g(), x("section", Qv, [
            P[1] || (P[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", Jv, [
              (g(!0), x(le, null, be(r.value.payment_method_breakdown, (I, V) => (g(), ae(xe, {
                key: I.payment_method,
                class: "payment-method-card-item min-w-0",
                color: p[V % p.length],
                title: y(I.payment_method),
                value: k(I),
                subvalue: `${_(I.count)} ${_(I.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (g(), x("section", ey, [
            u("div", ty, [
              u("div", ay, [
                N(B(Jm), { class: "empty-icon" })
              ]),
              P[2] || (P[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              P[3] || (P[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (g(), x("section", ny, [
            P[5] || (P[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", oy, [
              N(ft, {
                columns: h,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: I }) => [
                  u("span", sy, A(w(String(I.date))), 1)
                ]),
                "cell-totalSales": E(({ row: I }) => [
                  u("span", iy, A(B(fe)(I.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": E(({ row: I }) => [
                  u("span", ry, [
                    Array.isArray(I.total_amount_by_currency) && I.total_amount_by_currency.length > 0 ? (g(), x("div", ly, [
                      (g(!0), x(le, null, be(I.total_amount_by_currency, (V) => (g(), x("span", {
                        key: `${I.date}-${V.currency}`
                      }, A(V.currency) + " " + A(v(V.total_value)), 1))), 128))
                    ])) : (g(), x(le, { key: 1 }, [
                      Ae(A(v(Number(I.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": E(({ row: I }) => [
                  u("div", cy, [
                    (g(!0), x(le, null, be(Array.isArray(I.payment_methods) ? I.payment_methods : [], (V) => (g(), x("div", {
                      key: V.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", dy, A(y(V.payment_method)), 1),
                      P[4] || (P[4] = u("span", { class: "tag-separator" }, "•", -1)),
                      !V.total_amount_by_currency || V.total_amount_by_currency.length === 0 ? (g(), x("span", uy, A(v(V.total_amount)), 1)) : (g(), x("span", hy, A(V.total_amount_by_currency.map(
                        (D) => `${D.currency} ${v(D.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", fy, "(" + A(_(V.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (g(), x("div", gy, [...P[6] || (P[6] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), by = /* @__PURE__ */ ve(py, [["__scopeId", "data-v-168637eb"]]), vy = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, yy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, xy = {
  key: "title-content",
  class: "header-title-group"
}, ky = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, _y = {
  key: 0,
  class: "metric-label metric-label--header"
}, wy = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Cy = { key: "aside-content" }, $y = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Sy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, My = {
  key: "body-content",
  class: "highlight-inner"
}, Dy = { class: "card-body" }, Ay = { class: "metric-row" }, Ty = {
  key: 0,
  class: "metric-prefix"
}, By = {
  key: 0,
  class: "metric-label"
}, Ly = /* @__PURE__ */ ce({
  __name: "CardMetric",
  props: {
    label: {},
    value: {},
    prefix: { default: void 0 },
    valueSize: { default: "default" },
    labelPosition: { default: "below" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    currentValue: { default: 0 },
    previousValue: { default: null }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = Me($e(a, "theme")), o = $(() => a.labelPosition === "header"), s = $(
      () => a.previousValue !== null && a.previousValue !== void 0
    ), i = $(() => {
      if (!s.value) return 0;
      const c = a.previousValue;
      return c === 0 ? a.currentValue > 0 ? 100 : 0 : (a.currentValue - c) / c * 100;
    }), r = $(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const d = c.toFixed(1);
      return c > 0 ? `+${d}%` : `${d}%`;
    }), l = $(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, d) => (g(), ae(Se, {
      collapsible: !1,
      class: Q([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": B(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: E(() => [
        N(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (g(), x("div", vy, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (g(), x("div", yy)) : F("", !0)
            ])) : (g(), x("div", xy, [
              u("div", ky, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (g(), x("span", _y, A(e.label), 1)) : F("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: E(() => [
        N(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (g(), x("div", wy)) : (g(), x("div", Cy, [
              ke(c.$slots, "headerAside", {}, () => [
                s.value ? (g(), x("div", {
                  key: 0,
                  class: Q(["change-badge", l.value])
                }, A(r.value), 3)) : F("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: E(() => [
        N(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (g(), x("div", $y, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? F("", !0) : (g(), x("div", Sy))
            ])) : (g(), x("div", My, [
              u("div", Dy, [
                ke(c.$slots, "value", {}, () => [
                  u("div", Ay, [
                    e.prefix ? (g(), x("span", Ty, A(e.prefix), 1)) : F("", !0),
                    u("span", {
                      class: Q(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? F("", !0) : (g(), x("span", By, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), ht = /* @__PURE__ */ ve(Ly, [["__scopeId", "data-v-c81268f4"]]), Ry = { class: "card-body" }, Py = { class: "kpi-closed-value" }, Iy = { class: "kpi-closed-value__main" }, Ey = {
  key: 0,
  class: "kpi-closed-value__pct"
}, Fy = { class: "table-view-select flex justify-end" }, Oy = { class: "table-section w-full min-w-0" }, Vy = { class: "cell-plain" }, zy = { class: "cell-plain" }, Ny = { class: "cell-plain cell-plain--muted" }, jy = { class: "cell-plain" }, Hy = { class: "cell-plain" }, Wy = { class: "cell-plain" }, Ky = {
  key: 2,
  class: "empty-state"
}, Uy = 6, Yy = /* @__PURE__ */ ce({
  __name: "AgentHumanConversations",
  props: {
    data: { default: () => ({
      total_assigned: 0,
      total_closed: 0,
      total_enqueued: 0,
      avg_time_to_assign_seconds: null,
      avg_conversation_duration_seconds: null,
      agents_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    previousTotalEnqueued: { default: null },
    previousTotalClosed: { default: null },
    previousAvgTimeToAssignSeconds: { default: null },
    previousAvgConversationDurationSeconds: { default: null }
  },
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (te) => {
      o("export", te);
    }, { isDark: i } = Me($e(n, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(te) {
      const z = te?.trim() ?? "";
      return z.length > 0 && !r.has(z);
    }
    function c(te) {
      if (!l(te.agent_email)) return !1;
      const z = te.assigned_count ?? 0, Z = te.closed_count ?? 0;
      return z > 0 || Z > 0;
    }
    function d(te) {
      return te.closed_count ?? 0;
    }
    function h(te) {
      const z = te?.trim();
      return z || "—";
    }
    const m = $(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), b = $(() => m.value.length > 0), f = $(() => {
      const te = (n.data?.total_enqueued ?? 0) > 0;
      return b.value || te;
    }), p = oe("by_date"), y = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], v = oe("date"), k = oe("desc");
    Re(p, (te) => {
      te === "aggregated" ? (v.value = "name", k.value = "asc") : (v.value = "date", k.value = "desc");
    });
    function w(te, z) {
      return z == null ? null : z === 0 ? te > 0 ? 100 : 0 : (te - z) / z * 100;
    }
    function _(te) {
      const z = te.toFixed(1);
      return te > 0 ? `+${z}%` : `${z}%`;
    }
    function C(te, z = !1) {
      const Z = z ? -te : te;
      return Z > 0 ? "change-badge--up" : Z < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function M(te, z) {
      if (te === null) return null;
      const Z = w(te, z);
      return Z === null ? null : {
        label: _(Z),
        class: C(Z, !0)
      };
    }
    function S(te) {
      if (te == null || te === "") return null;
      if (typeof te == "number")
        return Number.isFinite(te) ? te : null;
      const z = te.trim();
      if (!z) return null;
      if (z.includes(":")) {
        const re = z.split(":").map(Number);
        return re.length !== 3 || re.some(isNaN) ? null : re[0] * 3600 + re[1] * 60 + re[2];
      }
      const Z = Number(z);
      return Number.isFinite(Z) ? Z : null;
    }
    function P(te) {
      const z = Math.round(te), Z = Math.floor(z / 3600), re = Math.floor(z % 3600 / 60), G = z % 60;
      return `${String(Z).padStart(2, "0")}:${String(re).padStart(2, "0")}:${String(G).padStart(2, "0")}`;
    }
    function I(te) {
      const z = S(te);
      return z === null ? "—" : typeof te == "string" && te.includes(":") ? te.trim() : P(z);
    }
    const V = $(() => n.data?.total_enqueued ?? 0), D = $(() => n.data?.total_closed ?? 0), L = $(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), T = $(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), j = $(() => V.value <= 0 ? null : `(${(D.value / V.value * 100).toFixed(1)}%)`), H = $(
      () => M(
        S(L.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), X = $(
      () => M(
        S(T.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function ie(te, z) {
      return {
        id: `${te.date}-${te.agent_email}-${z}`,
        date: te.date,
        dateSort: new Date(te.date).getTime(),
        agent_name: te.agent_name ?? "",
        agent_email: te.agent_email,
        handled: d(te),
        avg_assignation_seconds: S(te.avg_time_to_assign_seconds),
        avg_resolution_seconds: S(te.avg_conversation_duration_seconds),
        avg_assignation_display: I(te.avg_time_to_assign_seconds),
        avg_resolution_display: I(te.avg_conversation_duration_seconds)
      };
    }
    function ue(te) {
      const z = /* @__PURE__ */ new Map();
      for (const Z of te) {
        if (!c(Z)) continue;
        const re = Z.agent_email.trim();
        z.has(re) || z.set(re, {
          agent_name: Z.agent_name?.trim() ?? "",
          agent_email: re,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const G = z.get(re), W = Z.assigned_count ?? 0, J = Z.closed_count ?? 0;
        G.handled += d(Z), Z.agent_name?.trim() && (G.agent_name = Z.agent_name.trim());
        const he = S(Z.avg_time_to_assign_seconds);
        he !== null && W > 0 && (G.assignSum += he * W, G.assignWeight += W);
        const me = S(Z.avg_conversation_duration_seconds);
        me !== null && J > 0 && (G.resolutionSum += me * J, G.resolutionWeight += J);
      }
      return Array.from(z.values()).map((Z, re) => {
        const G = Z.assignWeight > 0 ? Z.assignSum / Z.assignWeight : null, W = Z.resolutionWeight > 0 ? Z.resolutionSum / Z.resolutionWeight : null;
        return {
          id: `agg-${Z.agent_email}-${re}`,
          agent_name: Z.agent_name,
          agent_email: Z.agent_email,
          handled: Z.handled,
          avg_assignation_seconds: G,
          avg_resolution_seconds: W,
          avg_assignation_display: G !== null ? P(G) : "—",
          avg_resolution_display: W !== null ? P(W) : "—"
        };
      });
    }
    const q = $(() => {
      const te = m.value;
      return p.value === "aggregated" ? ue(te) : te.map(ie);
    });
    function ne(te, z, Z, re) {
      const G = re === "asc" ? 1 : -1;
      let W = 0;
      switch (Z) {
        case "date":
          W = (te.dateSort ?? 0) - (z.dateSort ?? 0);
          break;
        case "name":
          W = (te.agent_name || "").localeCompare(z.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          W = te.agent_email.localeCompare(z.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          W = te.handled - z.handled;
          break;
        case "avgAssignation":
          W = (te.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (z.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          W = (te.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (z.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (W !== 0) return W * G;
      if (p.value === "by_date" && Z !== "date") {
        const J = (z.dateSort ?? 0) - (te.dateSort ?? 0);
        if (J !== 0) return J;
      }
      return (te.agent_name || "").localeCompare(z.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const R = $(() => {
      const te = [...q.value];
      return te.sort((z, Z) => ne(z, Z, v.value, k.value)), te;
    }), K = $(
      () => R.value
    ), U = $(() => {
      const te = [];
      return p.value === "by_date" && te.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), te.push(
        { key: "name", label: "Name", align: "left", sortable: !0 },
        { key: "email", label: "Email", align: "left", sortable: !0 },
        { key: "handled", label: "Handled", align: "center", sortable: !0 },
        {
          key: "avgAssignation",
          label: "Avg Assignation",
          align: "center",
          sortable: !0
        },
        {
          key: "avgResolution",
          label: "Avg Resolution",
          align: "center",
          sortable: !0
        }
      ), te;
    });
    function Y(te) {
      const z = te;
      if (v.value === z) {
        k.value = k.value === "asc" ? "desc" : "asc";
        return;
      }
      v.value = z, z === "date" ? k.value = "desc" : z === "name" || z === "email" ? k.value = "asc" : k.value = "desc";
    }
    const de = (te) => te == null ? "0" : fe(te), ge = (te) => new Date(te).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (te, z) => (g(), ae(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: z[1] || (z[1] = (Z) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", Ry, [
          f.value ? (g(), x("div", {
            key: 0,
            class: Q(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": B(i) }])
          }, [
            N(ht, {
              label: "Conversations Opened",
              "label-position": "header",
              value: de(V.value),
              theme: e.theme,
              "current-value": V.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: E(() => [...z[2] || (z[2] = [
                u("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ht, {
              label: "Conversations Closed",
              "label-position": "header",
              value: de(D.value),
              theme: e.theme,
              "current-value": D.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: E(() => [...z[3] || (z[3] = [
                u("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1)
              ])]),
              value: E(() => [
                u("div", Py, [
                  u("span", Iy, A(de(D.value)), 1),
                  j.value ? (g(), x("span", Ey, A(j.value), 1)) : F("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ht, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: I(L.value),
              theme: e.theme,
              "current-value": S(L.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Io({
              icon: E(() => [
                z[4] || (z[4] = u("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              H.value ? {
                name: "headerAside",
                fn: E(() => [
                  u("div", {
                    class: Q(["duration-trend-badge", H.value.class])
                  }, A(H.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(ht, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: I(T.value),
              theme: e.theme,
              "current-value": S(T.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Io({
              icon: E(() => [
                z[5] || (z[5] = u("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              X.value ? {
                name: "headerAside",
                fn: E(() => [
                  u("div", {
                    class: Q(["duration-trend-badge", X.value.class])
                  }, A(X.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : F("", !0),
          b.value ? (g(), ae(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: E(() => [
              u("div", Fy, [
                N(na, {
                  modelValue: p.value,
                  "onUpdate:modelValue": z[0] || (z[0] = (Z) => p.value = Z),
                  options: y,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: E(() => [
              u("div", Oy, [
                (g(), ae(ft, {
                  key: `${p.value}-${v.value}-${k.value}`,
                  columns: U.value,
                  rows: K.value,
                  "sort-key": v.value,
                  "sort-direction": k.value,
                  "max-visible-rows": Uy,
                  "row-key": "id",
                  onSort: Y
                }, {
                  "cell-date": E(({ row: Z }) => [
                    u("span", Vy, A(ge(String(Z.date))), 1)
                  ]),
                  "cell-name": E(({ row: Z }) => [
                    u("span", zy, A(h(Z.agent_name)), 1)
                  ]),
                  "cell-email": E(({ row: Z }) => [
                    u("span", Ny, A(Z.agent_email), 1)
                  ]),
                  "cell-handled": E(({ row: Z }) => [
                    u("span", jy, A(de(Number(Z.handled))), 1)
                  ]),
                  "cell-avgAssignation": E(({ row: Z }) => [
                    u("span", Hy, A(Z.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": E(({ row: Z }) => [
                    u("span", Wy, A(Z.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : f.value ? F("", !0) : (g(), x("div", Ky, [...z[6] || (z[6] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No agent human conversation data available"),
              u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), qy = /* @__PURE__ */ ve(Yy, [["__scopeId", "data-v-837b41e7"]]), Xy = {
  key: 0,
  class: "w-52"
}, Gy = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Zy = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Qy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Jy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, e1 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, t1 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, a1 = { class: "max-w-[360px] px-4 text-center" }, n1 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, o1 = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, s1 = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, li = 5, i1 = /* @__PURE__ */ ce({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    title: { default: "Conversations by Channel" },
    subtitle: { default: "Conversations sent by AI agents" },
    unit: { default: "msgs" },
    totalConversations: { default: void 0 },
    emptyTitle: { default: "No channel metrics data available" },
    emptyDescription: { default: "No channel data found for the selected period. Try adjusting the date range." },
    breakdownBy: { default: "" },
    breakdownOptions: { default: () => [] },
    showSummaryCards: { type: Boolean, default: !0 }
  },
  emits: ["export", "changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (k) => {
      o("export", k);
    }, i = (k) => {
      o("changeBreakdown", String(k));
    }, r = $e(n, "theme"), { isDark: l } = Me(r), c = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, d = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], h = (k) => {
      const w = k.toLowerCase(), _ = c[w];
      if (_) return _;
      const C = Array.from(w).reduce(
        (M, S) => (M << 5) - M + S.charCodeAt(0) | 0,
        0
      );
      return d[Math.abs(C) % d.length];
    }, m = oe({
      labels: [],
      datasets: []
    }), b = $(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), f = $(() => {
      const k = b.value.total_by_channel || {}, w = Object.values(k).reduce(
        (C, M) => C + M,
        0
      ), _ = n.totalConversations ?? w;
      return _ === 0 ? [] : Object.entries(k).sort(([, C], [, M]) => M - C).map(([C, M]) => ({
        name: C,
        label: C.toUpperCase(),
        total: M,
        percentage: (M / _ * 100).toFixed(1),
        color: h(C)
      }));
    }), p = $(
      () => f.value.slice(0, li)
    ), y = $(() => {
      const k = Math.min(p.value.length, li);
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), v = (k) => {
      if (!k || !k.channels_by_day) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const w = k.channels_by_day, _ = Object.keys(w).sort();
      if (_.length === 0) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const C = /* @__PURE__ */ new Set();
      for (const P of Object.values(w))
        for (const I of Object.keys(P))
          C.add(I);
      const S = Array.from(C).map((P) => ({
        label: P.toUpperCase(),
        data: _.map((I) => w[I]?.[P] || 0),
        borderColor: h(P)
      }));
      m.value = {
        labels: _.map((P) => je(P).format("MMM DD")),
        datasets: S
      };
    };
    return Re(
      () => n.data,
      (k) => {
        v(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (k, w) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: E(() => [
        n.breakdownOptions.length ? (g(), x("div", Xy, [
          N(na, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : F("", !0)
      ]),
      headerExport: E(() => [
        e.enableExport && !n.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", Gy, [
          u("div", Zy, [
            m.value.labels && m.value.labels.length ? (g(), x("section", Qy, [
              u("div", Jy, [
                N(mt, {
                  data: m.value,
                  theme: r.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && p.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(y.value)
              }, [
                (g(!0), x(le, null, be(p.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${B(fe)(_.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : n.showSummaryCards && f.value.length ? (g(), x("section", e1, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(y.value)
              }, [
                (g(!0), x(le, null, be(p.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${B(fe)(_.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            f.value.length ? F("", !0) : (g(), x("section", t1, [
              u("div", a1, [
                u("div", n1, [
                  N(B(it), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                u("p", o1, A(n.emptyTitle), 1),
                u("p", s1, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Cr = /* @__PURE__ */ ve(i1, [["__scopeId", "data-v-987b8c34"]]), r1 = /* @__PURE__ */ ce({
  __name: "ConversationVolume",
  props: {
    data: { default: null },
    loading: { type: Boolean, default: !1 },
    breakdownBy: { default: "all" },
    breakdownOptions: { default: () => [] },
    titles: { default: () => ({
      all: "Conversations",
      resolution_mode: "Conversations by Resolution Mode",
      agent: "Conversations by Agent",
      channel: "Conversations by Channel",
      agent_channel: "Conversations by Agent and Channel"
    }) },
    subtitle: { default: "Conversations over time" },
    emptyTitle: { default: "No conversation data" },
    emptyDescription: { default: "Try adjusting the date range or filters." }
  },
  emits: ["changeBreakdown"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(() => a.data?.total_conversations ?? 0), s = $(() => a.data?.breakdown_by_day ?? {}), i = $(() => a.titles[a.breakdownBy]), r = $(() => ({ agents_by_day: s.value })), l = $(() => ({
      channels_by_day: s.value,
      total_by_channel: Object.fromEntries(
        (a.data?.breakdown_items ?? []).map((c) => [c.key, c.total_conversations])
      ),
      total_conversations: o.value
    }));
    return (c, d) => a.breakdownBy === "channel" ? (g(), ae(Cr, {
      key: 0,
      data: l.value,
      loading: a.loading,
      title: i.value,
      subtitle: a.subtitle,
      "breakdown-by": a.breakdownBy,
      "breakdown-options": a.breakdownOptions,
      unit: "convs",
      "total-conversations": o.value,
      "empty-title": a.emptyTitle,
      "empty-description": a.emptyDescription,
      onChangeBreakdown: d[0] || (d[0] = (h) => n("changeBreakdown", h))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (g(), ae(kr, {
      key: 1,
      data: r.value,
      loading: a.loading,
      title: i.value,
      subtitle: a.subtitle,
      "breakdown-by": a.breakdownBy,
      "breakdown-options": a.breakdownOptions,
      unit: "convs",
      "total-conversations": o.value,
      "max-series": a.breakdownBy === "agent_channel" ? 7 : void 0,
      "show-summary-cards": a.breakdownBy !== "all",
      "empty-title": a.emptyTitle,
      "empty-description": a.emptyDescription,
      onChangeBreakdown: d[1] || (d[1] = (h) => n("changeBreakdown", h))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "max-series", "show-summary-cards", "empty-title", "empty-description"]));
  }
}), l1 = { class: "card-body" }, c1 = { class: "chart-container" }, d1 = { class: "triage-table-block w-full min-w-0" }, u1 = { class: "triage-row-label" }, h1 = {
  key: 1,
  class: "triage-count"
}, f1 = {
  key: 1,
  class: "triage-count"
}, g1 = {
  key: 1,
  class: "triage-count"
}, m1 = {
  key: 1,
  class: "triage-count"
}, p1 = {
  key: 1,
  class: "triage-count"
}, b1 = {
  key: 1,
  class: "empty-state"
}, v1 = { class: "empty-state-content" }, y1 = { class: "empty-icon-wrapper" }, x1 = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (w) => {
      o("export", w);
    }, { isDark: i, colors: r } = Me(
      $e(n, "theme")
    ), l = $(() => {
      const w = n.data?.combinations || {}, _ = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [C, M] of Object.entries(w)) {
        const S = C.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const P = S.filter((I) => I !== "triage").length;
        P >= 4 ? _["4p"] += Number(M) || 0 : _[P] += Number(M) || 0;
      }
      return _;
    }), c = $(() => {
      const w = l.value;
      return w[0] + w[1] + w[2] + w[3] + w["4p"] || 0;
    }), d = $(() => Object.keys(n.data?.combinations || {}).length > 0), h = $(() => {
      const w = c.value;
      if (!w) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const _ = l.value;
      return {
        pct0: _[0] / w * 100,
        pct1: _[1] / w * 100,
        pct2: _[2] / w * 100,
        pct3: _[3] / w * 100,
        pct4p: _["4p"] / w * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], b = $(() => {
      const w = h.value, _ = l.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: w.pct0,
          b1: w.pct1,
          b2: w.pct2,
          b3: w.pct3,
          b4p: w.pct4p
        },
        {
          id: "count",
          metric: "Count",
          b0: _[0],
          b1: _[1],
          b2: _[2],
          b3: _[3],
          b4p: _["4p"]
        }
      ];
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
    }, p = (w) => w?.replace("80", "") || "#888888", y = $(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: p(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: p(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: p(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: p(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: p(f.c4p),
          borderWidth: 1
        }
      ]
    })), v = $(() => ({
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
            label: (w) => `${w.dataset.label} intent(s): ${Number(w.raw || 0).toFixed(0)}%`
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
    })), k = (w) => `${(Number(w) || 0).toFixed(0)}`;
    return t({ isDark: i }), (w, _) => (g(), ae(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", l1, [
          d.value ? (g(), x(le, { key: 0 }, [
            u("div", c1, [
              N($t, {
                data: y.value,
                options: v.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "w-full min-w-0",
              title: "Total",
              value: B(fe)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", d1, [
              N(ft, {
                columns: m,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": E(({ row: C }) => [
                  u("span", u1, A(C.metric), 1)
                ]),
                "cell-b0": E(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c0) })
                  }, A(k(Number(C.b0))) + "%", 5)) : (g(), x("span", h1, A(B(fe)(Number(C.b0))), 1))
                ]),
                "cell-b1": E(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c1) })
                  }, A(k(Number(C.b1))) + "%", 5)) : (g(), x("span", f1, A(B(fe)(Number(C.b1))), 1))
                ]),
                "cell-b2": E(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c2) })
                  }, A(k(Number(C.b2))) + "%", 5)) : (g(), x("span", g1, A(B(fe)(Number(C.b2))), 1))
                ]),
                "cell-b3": E(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c3) })
                  }, A(k(Number(C.b3))) + "%", 5)) : (g(), x("span", m1, A(B(fe)(Number(C.b3))), 1))
                ]),
                "cell-b4p": E(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: p(f.c4p) })
                  }, A(k(Number(C.b4p))) + "%", 5)) : (g(), x("span", p1, A(B(fe)(Number(C.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (g(), x("div", b1, [
            u("div", v1, [
              u("div", y1, [
                N(B(it), { class: "empty-icon" })
              ]),
              _[0] || (_[0] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
              _[1] || (_[1] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), k1 = /* @__PURE__ */ ve(x1, [["__scopeId", "data-v-be7d2c0c"]]), _1 = { class: "card-body" }, w1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, C1 = { class: "pie-section" }, $1 = {
  key: 1,
  class: "empty-state"
}, S1 = /* @__PURE__ */ ce({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = [
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
    }, r = (b) => i[b]?.label || b.toUpperCase(), l = $(
      () => a.data?.items && a.data.items.length > 0
    ), c = $(
      () => (a.data?.items || []).reduce((b, f) => b + f.count, 0)
    ), d = $(() => {
      const b = {};
      for (const f of a.data?.items || [])
        b[f.language] = (b[f.language] || 0) + f.count;
      return Object.entries(b).map(([f, p]) => ({ language: f, count: p })).sort((f, p) => p.count - f.count);
    }), h = $(() => ({
      labels: d.value.map((b) => r(b.language)),
      datasets: [
        {
          data: d.value.map((b) => b.count),
          backgroundColor: d.value.map(
            (b, f) => s[f % s.length] + "80"
          ),
          borderColor: d.value.map(
            (b, f) => s[f % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), m = $(() => ({
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
          borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (b) => {
              const f = b.raw || 0, p = c.value > 0 ? (f / c.value * 100).toFixed(1) : "0";
              return ` ${b.label}: ${f} (${p}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (b, f) => (g(), ae(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: E(() => [
        u("div", _1, [
          l.value ? (g(), x("div", w1, [
            u("section", C1, [
              N(Pn, {
                data: h.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "shrink-0",
              title: "Total",
              value: B(fe)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (g(), x("section", $1, [...f[0] || (f[0] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No language data available"),
              u("p", { class: "empty-description" }, " No language selection data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), M1 = /* @__PURE__ */ ve(S1, [["__scopeId", "data-v-9385c088"]]), D1 = { class: "card-body" }, A1 = {
  key: 0,
  class: "guardrails-daily-section"
}, T1 = { class: "w-full min-w-0" }, B1 = { class: "font-medium" }, L1 = { class: "font-semibold" }, R1 = { class: "type-badges-row" }, P1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, I1 = {
  key: 1,
  class: "empty-state"
}, E1 = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (y) => {
      o("export", y);
    }, { isDark: i } = Me($e(n, "theme")), r = $(
      () => n.data?.items && n.data.items.length > 0
    ), l = $(
      () => (n.data?.items || []).reduce((y, v) => y + v.count, 0)
    ), c = (y) => {
      const v = {};
      for (const _ of n.data?.items || [])
        v[_[y]] = (v[_[y]] || 0) + _.count;
      const k = Object.entries(v).sort((_, C) => C[1] - _[1]);
      if (k.length === 0) return { name: "—", pct: 0 };
      const w = l.value;
      return {
        name: k[0][0],
        pct: w > 0 ? Math.round(k[0][1] / w * 100) : 0
      };
    }, d = $(() => c("guardrail_type")), h = $(() => c("guardrail_action")), m = $(() => c("guardrail_source")), b = $(() => {
      const y = {};
      for (const v of n.data?.items || [])
        y[v.date] || (y[v.date] = {}), y[v.date][v.guardrail_type] = (y[v.date][v.guardrail_type] || 0) + v.count;
      return Object.entries(y).map(([v, k]) => ({
        date: v,
        total: Object.values(k).reduce((w, _) => w + _, 0),
        types: Object.entries(k).map(([w, _]) => ({ type: w, count: _ })).sort((w, _) => _.count - w.count)
      })).sort((v, k) => new Date(v.date).getTime() - new Date(k.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], p = $(
      () => b.value.map((y) => ({
        id: y.date,
        date: y.date,
        total: y.total,
        types: y.types
      }))
    );
    return t({ isDark: i }), (y, v) => (g(), ae(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", D1, [
          r.value ? (g(), x(le, { key: 0 }, [
            b.value.length > 0 ? (g(), x("section", A1, [
              u("div", T1, [
                N(ft, {
                  columns: f,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": E(({ row: k }) => [
                    u("span", B1, A(B(je)(String(k.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": E(({ row: k }) => [
                    u("span", L1, A(B(fe)(k.total)), 1)
                  ]),
                  "cell-types": E(({ row: k }) => [
                    u("div", R1, [
                      (g(!0), x(le, null, be(k.types, (w) => (g(), x("span", {
                        key: w.type,
                        class: "type-count-badge"
                      }, A(w.type) + " (" + A(w.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            u("section", P1, [
              N(xe, {
                title: "Total Events",
                value: B(fe)(l.value)
              }, null, 8, ["value"]),
              N(xe, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top source",
                value: m.value.name,
                subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (g(), x("section", I1, [...v[0] || (v[0] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No guardrail events"),
              u("p", { class: "empty-description" }, "No content safety events found for the selected period. This is a good sign!")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), F1 = /* @__PURE__ */ ve(E1, [["__scopeId", "data-v-c042ede0"]]), O1 = { class: "card-body" }, V1 = { class: "chart-section" }, z1 = { class: "chart-wrapper" }, N1 = {
  key: 1,
  class: "empty-chart"
}, j1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, H1 = {
  key: 0,
  class: "dn-failure-section"
}, W1 = { class: "w-full min-w-0" }, K1 = { class: "failure-reason" }, U1 = { class: "failure-count" }, Y1 = { class: "impact-bar-container" }, q1 = { class: "impact-label" }, X1 = { class: "dn-trend-health-block flex flex-col gap-0" }, G1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, Z1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, Q1 = { class: "system-health" }, J1 = { class: "system-health-content" }, ex = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, tx = {
  key: 1,
  class: "empty-state"
}, ax = /* @__PURE__ */ ce({
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
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (C) => {
      o("export", C);
    }, { isDark: i, colors: r } = Me($e(n, "theme")), l = $(() => {
      const C = n.data?.documentCounts?.items || [], M = n.data?.processingCounts?.items || [];
      return C.length > 0 || M.length > 0;
    }), c = $(() => {
      const C = n.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: C.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: C.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: C.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), d = $(() => {
      const C = n.data?.processingCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_success: C.reduce((M, S) => M + S.processing_success, 0),
        notification_sent: C.reduce((M, S) => M + S.notification_sent, 0),
        notification_failed: C.reduce((M, S) => M + S.notification_failed, 0),
        dq_phone: C.reduce((M, S) => M + S.dq_error_phone_not_found, 0),
        dq_flight: C.reduce((M, S) => M + S.dq_error_flight_not_found, 0),
        dq_booking: C.reduce((M, S) => M + S.dq_error_booking_not_found, 0),
        dq_other: C.reduce((M, S) => M + S.dq_error_other, 0),
        totalDqErrors: C.reduce(
          (M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other,
          0
        )
      };
    }), h = $(
      () => c.value.row_count_total || d.value.processing_started
    ), m = $(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), b = (C, M) => M ? `${Math.round(C / M * 100)}%` : "0%", f = $(() => {
      const C = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return C.length > 0 ? C[0] : { reason: "None", count: 0 };
    }), p = $(() => {
      const C = h.value;
      return [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Phone not found", count: d.value.dq_phone },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: C > 0 ? Math.round(M.count / C * 100) : 0
      }));
    }), y = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], v = $(
      () => p.value.map((C) => ({
        id: C.reason,
        reason: C.reason,
        count: C.count,
        impactPct: C.impactPct
      }))
    ), k = $(() => {
      const C = h.value, M = d.value.processing_success, S = Math.max(0, M - d.value.totalDqErrors), P = d.value.notification_sent, I = Math.max(0, C - M), V = d.value.totalDqErrors, D = Math.max(0, S - P), L = (H, X) => ye(H, X), T = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], j = [];
      return M > 0 && j.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: M,
        label: L(M, C)
      }), I > 0 && j.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: I,
        label: L(I, C)
      }), S > 0 && j.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: S,
        label: L(S, C)
      }), V > 0 && j.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: V,
        label: L(V, C)
      }), P > 0 && j.push({
        source: "Contactable",
        target: "Notified",
        value: P,
        label: L(P, C)
      }), D > 0 && j.push({
        source: "Contactable",
        target: "Not Delivered",
        value: D,
        label: L(D, C)
      }), { nodes: T, links: j };
    }), w = $(() => {
      const C = [...n.data?.processingCounts?.items || []].sort(
        (L, T) => new Date(L.date).getTime() - new Date(T.date).getTime()
      ), M = n.data?.documentCounts?.items || [], S = {};
      for (const L of M)
        S[L.date] = (S[L.date] || 0) + L.row_count_total;
      const P = [
        .../* @__PURE__ */ new Set([
          ...C.map((L) => L.date),
          ...M.map((L) => L.date)
        ])
      ].sort(), I = P.map((L) => je(L).format("MMM DD")), V = P.map((L) => {
        const T = C.find((X) => X.date === L), j = T?.notification_sent || 0, H = S[L] || T?.processing_started || 0;
        return H > 0 ? Math.round(j / H * 100) : 0;
      }), D = P.map((L) => C.find((j) => j.date === L)?.notification_sent || 0);
      return {
        labels: I,
        datasets: [
          {
            label: "Success Rate (%)",
            data: V,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: D,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), _ = $(() => ({
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
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
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
            color: r.value.textSecondary
          }
        },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          max: 100,
          grid: { color: r.value.gridLines },
          ticks: {
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: r.value.textSecondary,
            callback: (C) => `${C}%`
          },
          title: {
            display: !0,
            text: "Success Rate",
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: r.value.textSecondary
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
            color: r.value.textSecondary
          },
          title: {
            display: !0,
            text: "Volume",
            font: {
              family: "'Inter', ui-sans-serif, system-ui, sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        }
      }
    }));
    return t({ isDark: i }), (C, M) => (g(), ae(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: M[0] || (M[0] = (S) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", O1, [
          l.value ? (g(), x(le, { key: 0 }, [
            u("section", V1, [
              M[2] || (M[2] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", z1, [
                k.value.nodes.length > 0 && k.value.links.length > 0 ? (g(), ae(aa, {
                  key: 0,
                  data: k.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (g(), x("div", N1, [...M[1] || (M[1] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", j1, [
              N(xe, {
                color: "#3b82f6",
                title: "Total Records",
                value: B(fe)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: B(fe)(h.value)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#10b981",
                title: "Successfully Notified",
                value: B(fe)(d.value.notification_sent),
                subvalue: b(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#ef4444",
                title: "Not Notified",
                value: B(fe)(m.value),
                subvalue: b(m.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: f.value.reason,
                subvalue: f.value.count > 0 ? `${B(fe)(f.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            p.value.length > 0 ? (g(), x("section", H1, [
              M[3] || (M[3] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", W1, [
                N(ft, {
                  columns: y,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": E(({ row: S }) => [
                    u("span", K1, A(S.reason), 1)
                  ]),
                  "cell-count": E(({ row: S }) => [
                    u("span", U1, A(B(fe)(S.count)), 1)
                  ]),
                  "cell-impact": E(({ row: S }) => [
                    u("div", Y1, [
                      u("div", {
                        class: "impact-bar",
                        style: we({ width: S.impactPct + "%" })
                      }, null, 4),
                      u("span", q1, A(S.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            u("div", X1, [
              w.value.labels.length > 0 ? (g(), x("section", G1, [
                M[4] || (M[4] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", Z1, [
                  N(mt, {
                    data: w.value,
                    options: _.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : F("", !0),
              u("details", Q1, [
                M[5] || (M[5] = u("summary", { class: "system-health-toggle" }, [
                  u("svg", {
                    class: "toggle-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ]),
                  Ae(" System Health Details ")
                ], -1)),
                u("div", J1, [
                  u("div", ex, [
                    N(xe, {
                      title: "Docs Started",
                      value: B(fe)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Completed",
                      value: B(fe)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Failed",
                      value: B(fe)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Started",
                      value: B(fe)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Success",
                      value: B(fe)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Notification Failed",
                      value: B(fe)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (g(), x("section", tx, [...M[6] || (M[6] = [
            u("div", { class: "empty-state-content" }, [
              u("div", { class: "empty-icon-wrapper" }, [
                u("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  u("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  })
                ])
              ]),
              u("p", { class: "empty-title" }, "No disruption notifier data"),
              u("p", { class: "empty-description" }, " No disruption notification data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), nx = /* @__PURE__ */ ve(ax, [["__scopeId", "data-v-2342d485"]]), ox = /* @__PURE__ */ ce({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(() => fe(a.totalConversations)), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), sx = /* @__PURE__ */ ce({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(() => `${a.csatP95.toFixed(1)}`), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), ix = /* @__PURE__ */ ce({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(() => `${a.csatPulse.toFixed(1)}%`), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M3 12h3l2-6 4 12 3-8 2 2h4"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), rx = {
  key: 0,
  class: "card-body"
}, lx = { class: "chart-wrapper" }, cx = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, dx = {
  key: 1,
  class: "empty-state"
}, ux = 520, hx = 300, fx = 40, gx = 48, mx = 48, px = {
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
    const n = a, o = (l) => {
      n("export", l);
    }, s = e, { isDark: i } = Me($e(s, "theme")), r = $(() => s.data);
    return t({ isDark: i }), (l, c) => (g(), ae(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        r.value && r.value.total_nps_responses > 0 ? (g(), x("div", rx, [
          u("div", lx, [
            N(hr, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": ux,
              "chart-height": hx,
              "chart-margin": fx,
              "chart-margin-right": gx,
              "chart-bottom-margin": mx,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          u("div", cx, [
            N(xe, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(r.value.total_nps_responses)
            }, null, 8, ["value"]),
            r.value.p95_score > 0 ? (g(), ae(xe, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(r.value.p95_score)
            }, null, 8, ["value"])) : F("", !0)
          ])
        ])) : (g(), x("div", dx, [...c[0] || (c[0] = [
          u("div", { class: "empty-state-content" }, [
            u("div", { class: "empty-icon-wrapper" }, [
              u("svg", {
                class: "empty-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                u("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              ])
            ]),
            u("p", { class: "empty-title" }, "No NPS data available"),
            u("p", { class: "empty-description" }, " No NPS data found for the selected period. Try adjusting the date range. ")
          ], -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, $r = /* @__PURE__ */ ve(px, [["__scopeId", "data-v-e98fe9b2"]]), bx = {
  key: 0,
  class: "card-body"
}, vx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, yx = {
  key: 1,
  class: "empty-state"
}, xx = {
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
    const a = t, n = (c) => {
      a("export", c);
    }, o = e, s = $(() => o.data?.csat_p95_by_day || []), i = $(() => s.value.length > 0), r = $(() => ({
      labels: s.value.map((c) => je(c.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: s.value.map((c) => Number(c.p95_score || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25,
          clip: !1
        }
      ]
    })), l = {
      scales: {
        y: {
          min: 0,
          max: 10,
          grace: 1,
          ticks: {
            stepSize: 1,
            callback: (c) => {
              const d = Number(c);
              return !Number.isInteger(d) || d < 0 || d > 10 ? "" : String(d);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (c) => c.parsed.y.toFixed(2)
          }
        }
      }
    };
    return (c, d) => (g(), ae(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        i.value ? (g(), x("div", bx, [
          u("div", vx, [
            N(mt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", yx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Sr = /* @__PURE__ */ ve(xx, [["__scopeId", "data-v-5207cfa7"]]), kx = {
  key: 0,
  class: "card-body"
}, _x = {
  key: 1,
  class: "empty-state"
}, wx = /* @__PURE__ */ ce({
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
    const t = e, a = $(
      () => t.data?.resolution_breakdown || []
    ), n = $(
      () => a.value.some((i) => Number(i.count || 0) > 0)
    ), o = $(() => {
      const i = a.value;
      return {
        labels: i.map((r) => r.label || String(r.score)),
        datasets: [
          {
            label: "Resolution %",
            data: i.map((r) => Number(r.percentage || 0)),
            backgroundColor: ["#10B981", "#EF4444"],
            borderRadius: 8
          }
        ]
      };
    }), s = {
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
    return (i, r) => (g(), ae(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: E(() => [
        n.value ? (g(), x("div", kx, [
          N($t, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (g(), x("div", _x, [...r[0] || (r[0] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Cx = /* @__PURE__ */ ve(wx, [["__scopeId", "data-v-6849ef24"]]), $x = {
  key: 0,
  class: "card-body"
}, Sx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Mx = {
  key: 1,
  class: "empty-state"
}, Dx = /* @__PURE__ */ ce({
  __name: "npsPulseMetrics",
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
    const a = t, n = (c) => {
      a("export", c);
    }, o = e, s = $(() => o.data?.csat_pulse_by_day || []), i = $(() => s.value.length > 0), r = $(() => ({
      labels: s.value.map((c) => c.date || ""),
      datasets: [
        {
          label: "CSAT Pulse",
          data: s.value.map((c) => Number(c.csat_pulse || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25,
          clip: !1
        }
      ]
    })), l = {
      layout: {
        padding: {
          top: 18,
          bottom: 10,
          left: 10,
          right: 10
        }
      },
      scales: {
        x: {
          offset: !0
        },
        y: {
          min: -200,
          max: 100,
          ticks: {
            callback: (c) => `${c}%`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (c) => `${c.parsed.y.toFixed(2)}%`
          }
        }
      }
    };
    return (c, d) => (g(), ae(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        i.value ? (g(), x("div", $x, [
          u("div", Sx, [
            N(mt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", Mx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ax = /* @__PURE__ */ ve(Dx, [["__scopeId", "data-v-72955d9a"]]), Tx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Mr = {
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
    const a = t, n = (d) => {
      a("export", d);
    }, o = e, s = $(() => o.showResolutionChart), i = $(() => o.showCsatPulseChart), r = $(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), l = $(() => r.value > 0), c = $(
      () => r.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (g(), x("div", Tx, [
      u("div", Bx, [
        N($r, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        N(Sr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      l.value ? (g(), x("div", {
        key: 0,
        class: Q(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (g(), ae(Cx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : F("", !0),
        i.value ? (g(), ae(Ax, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])) : F("", !0)
      ], 2)) : F("", !0)
    ]));
  }
}, Lx = { class: "csat-container__body" }, Rx = /* @__PURE__ */ ce({
  __name: "CSATContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    data: { default: void 0 },
    showResolutionChart: { type: Boolean, default: !1 },
    showCsatPulseChart: { type: Boolean, default: !1 }
  },
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const a = t;
    function n(o) {
      a("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (g(), ae(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: E(() => [
        u("div", Lx, [
          N(Mr, {
            data: e.data,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: n
          }, null, 8, ["data", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Px = /* @__PURE__ */ ve(Rx, [["__scopeId", "data-v-37178ba1"]]), Ix = /* @__PURE__ */ ce({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(() => jt(a.totalRevenue)), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "AI Revenue",
      value: o.value,
      prefix: e.currencyCode,
      "value-size": "large",
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.75",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }),
          u("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
          u("path", { d: "M12 18V6" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "prefix", "loading", "theme", "current-value", "previous-value"]));
  }
}), Ex = { class: "flex justify-end" }, Fx = { class: "w-52" }, Ox = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Vx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, zx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Nx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, jx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Hx = /* @__PURE__ */ ce({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: r } = Me(s), l = oe(n.breakdownBy), c = $(() => n.data?.currency ?? "USD"), d = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], h = $(() => {
      const L = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[l.value];
      return L ? `AI Generated Revenue by ${L}` : "AI Generated Revenue";
    }), m = $(() => l.value === "payment_method"), b = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], f = (D) => b[D % b.length], p = (D) => {
      if (!D) return "0";
      const L = Math.abs(D);
      return L >= 1e6 ? (D / 1e6).toFixed(2) + "M" : L >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, y = (D) => !D || D === "unknown" ? "Unknown" : Ct(D).split(/[_|]/).map((L) => L ? L.charAt(0).toUpperCase() + L.slice(1) : "").join(" "), v = oe({
      labels: [],
      datasets: []
    }), k = oe([]), w = $(() => {
      const D = Math.min(k.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), _ = (D) => {
      const L = D?.ai_revenue_by_day ?? [], T = D?.breakdown ?? [];
      if (!L.length) {
        v.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const j = [...L].sort((q, ne) => q.date.localeCompare(ne.date)), H = j.map((q) => je(q.date).format("MMM DD")), X = "ai_revenue";
      if (l.value === "all") {
        v.value = {
          labels: H,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: j.map((q) => Number(q[X] ?? 0)),
              borderColor: b[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: b[0],
              pointBorderWidth: 2
            }
          ]
        }, k.value = [];
        return;
      }
      const ue = T.slice(0, 7).map((q) => q.key).map((q, ne) => {
        const R = f(ne), K = j.map((U) => {
          const Y = (U.breakdown ?? {})[q];
          return Y ? Number(Y[X] ?? 0) : 0;
        });
        return m.value ? {
          label: y(q),
          data: K,
          backgroundColor: R,
          borderColor: R,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: y(q),
          data: K,
          borderColor: R,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: R,
          pointBorderWidth: 2
        };
      });
      v.value = { labels: H, datasets: ue }, k.value = T.slice(0, 5).map((q, ne) => ({
        key: q.key,
        label: y(q.key),
        amount: `${c.value} ${p(q.total)}`,
        percentage: Number(q.percentage ?? 0),
        color: f(ne)
      }));
    }, C = $(() => ({
      callback: (D) => `${c.value} ${p(Number(D))}`,
      color: r.value.textSecondary,
      padding: 8
    })), M = $(() => ({
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: r.value.textSecondary, padding: 8 }
    })), S = $(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: C.value
    })), P = $(() => ({
      scales: {
        x: M.value,
        y: S.value
      }
    })), I = $(() => ({
      scales: {
        x: { ...M.value, stacked: !0 },
        y: { ...S.value, stacked: !0 }
      }
    }));
    Re(
      () => n.data,
      (D) => _(D ?? null),
      { deep: !0, immediate: !0 }
    ), Re(
      () => n.breakdownBy,
      (D) => {
        l.value = D, _(n.data ?? null);
      }
    );
    const V = (D) => {
      l.value = String(D), o("changeBreakdown", l.value);
    };
    return t({ isDark: i }), (D, L) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: h.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: E(() => [
        u("div", Ex, [
          u("div", Fx, [
            N(na, {
              "model-value": l.value,
              options: d,
              "onUpdate:modelValue": V
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(gt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              n.loading ? (g(), x("div", Ox, [...L[0] || (L[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", Vx, [
                v.value.labels && v.value.labels.length && v.value.datasets.length ? (g(), x("section", zx, [
                  u("div", Nx, [
                    m.value ? (g(), ae($t, {
                      key: 0,
                      data: v.value,
                      options: I.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (g(), ae(mt, {
                      key: 1,
                      data: v.value,
                      options: P.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: we(w.value)
                  }, [
                    (g(!0), x(le, null, be(k.value, (T) => (g(), ae(xe, {
                      key: `card-${T.key}`,
                      class: "min-w-0",
                      color: T.color,
                      title: T.label,
                      value: T.amount,
                      subvalue: `${T.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : F("", !0)
                ])) : (g(), x("section", jx, [...L[1] || (L[1] = [
                  u("div", { class: "max-w-[360px] px-4 text-center" }, [
                    u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No revenue data available "),
                    u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No AI revenue found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), Wx = /* @__PURE__ */ ve(Hx, [["__scopeId", "data-v-d3e5e67f"]]), ci = 1, Kx = /* @__PURE__ */ ce({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), { isDark: o } = Me($e(a, "theme")), s = $(() => a.totalConversations * ci), i = $(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * ci), r = $(() => fe(s.value)), l = $(
      () => i.value !== null && i.value !== void 0
    ), c = $(() => {
      if (!l.value) return 0;
      const m = i.value;
      return m === 0 ? s.value > 0 ? 100 : 0 : (s.value - m) / m * 100;
    }), d = $(() => {
      const m = c.value.toFixed(1);
      return c.value > 0 ? `+${m}%` : `${m}%`;
    }), h = $(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (m, b) => (g(), ae(ht, {
      label: "Cost",
      value: r.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...b[0] || (b[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" })
        ], -1)
      ])]),
      headerAside: E(() => [
        l.value ? (g(), x("div", {
          key: 0,
          class: Q(["change-badge", h.value, { "change-badge--dark": B(o) }])
        }, A(d.value), 3)) : F("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Ux = /* @__PURE__ */ ve(Kx, [["__scopeId", "data-v-411e0735"]]), Yx = { class: "flex justify-end" }, qx = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Xx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Gx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Zx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Qx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Jx = /* @__PURE__ */ ce({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["changeBreakdown", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (_) => {
      o("export", _);
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = oe(n.breakdownBy), c = $(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), d = oe({
      labels: [],
      datasets: []
    }), h = oe([]), m = $(() => {
      const _ = h.value.length;
      if (!(_ <= 0))
        return { gridTemplateColumns: `repeat(${_}, minmax(0, 1fr))` };
    }), b = oe(
      []
    ), f = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], p = (_) => f[_ % f.length], y = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (_) => `${_}%`
          }
        }
      }
    }, v = () => {
      o("changeBreakdown", l.value);
    }, k = (_) => {
      if (!_) return "";
      const M = _.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, w = (_) => {
      if (l.value === "all") {
        const D = _?.escalations_by_day ?? [];
        if (!D.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
          return;
        }
        const L = [...D].sort((T, j) => T.date.localeCompare(j.date));
        d.value = {
          labels: L.map((T) => je(T.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: L.map(
                (T) => Number(T.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, h.value = [], b.value = [];
        return;
      }
      const C = _?.breakdown_by_day ?? [], M = _?.breakdown_items ?? [];
      if (!C.length) {
        d.value = { labels: [], datasets: [] }, h.value = [], b.value = [];
        return;
      }
      const S = [...C].sort(
        (D, L) => D.date.localeCompare(L.date)
      ), P = M.slice(0, 5).map((D) => D.key), I = S.map((D) => je(D.date).format("MMM DD")), V = P.map((D, L) => {
        const T = M.find((j) => j.key === D);
        return {
          label: k(T?.label || D),
          data: S.map((j) => {
            const H = j.items.find((X) => X.key === D);
            return Number(H?.percentage || 0);
          }),
          borderColor: p(L),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: I,
        datasets: V
      }, h.value = M.slice(0, 5).map((D, L) => ({
        key: D.key,
        label: k(D.label),
        percentage: Number(D.percentage || 0),
        color: p(L)
      })), b.value = M.slice(0, 5).map((D, L) => ({
        key: D.key,
        label: k(D.label),
        color: p(L)
      }));
    };
    return Re(
      () => n.data,
      (_) => {
        w(_ ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Re(
      () => n.breakdownBy,
      (_) => {
        l.value = _, w(c.value);
      }
    ), t({ isDark: r }), (_, C) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      headerAside: E(() => [
        u("div", Yx, [
          Qe(u("select", {
            "onUpdate:modelValue": C[0] || (C[0] = (M) => l.value = M),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: v
          }, [...C[1] || (C[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [Wr, l.value]
          ])
        ])
      ]),
      default: E(() => [
        u("div", qx, [
          u("div", Xx, [
            d.value.labels && d.value.labels.length && d.value.datasets.length ? (g(), x("section", Gx, [
              u("div", Zx, [
                N(mt, {
                  data: d.value,
                  options: y,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(m.value)
              }, [
                (g(!0), x(le, null, be(h.value, (M) => (g(), ae(xe, {
                  key: `card-${M.key}`,
                  class: "min-w-0",
                  color: M.color,
                  title: M.label,
                  value: `${M.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : F("", !0)
            ])) : (g(), x("section", Qx, [...C[2] || (C[2] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ek = /* @__PURE__ */ ve(Jx, [["__scopeId", "data-v-b18e0ebd"]]), tk = /* @__PURE__ */ ce({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m17.25 15.75 4.5 4.5"
          }),
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m21.75 15.75-4.5 4.5"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
});
function lo(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const ak = { class: "flex justify-end" }, nk = { class: "w-52" }, ok = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, sk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, ik = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, rk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, lk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ck = "#8b5cf6", dk = "#9ca3af", uk = "#94a3b8", hk = /* @__PURE__ */ ce({
  __name: "AvgResolutionTime",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["changeBreakdown", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (q) => {
      o("export", q);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" },
      { value: "resolution_mode", label: "Resolution Mode" },
      { value: "channel", label: "Channel" },
      { value: "agent_channel", label: "Channel & Agent" }
    ], r = $e(n, "theme"), { isDark: l } = Me(r), c = oe(n.breakdownBy), d = $(() => {
      const ne = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return ne ? `Average resolution time by ${ne}` : "Average resolution time";
    }), h = (q) => {
      c.value = String(q), o("changeBreakdown", c.value);
    }, m = [
      { key: "ai_agent", label: "AI Agent", color: "#8b5cf6" },
      { key: "human", label: "Human", color: "#f59e0b" },
      { key: "hybrid", label: "AI + Human", color: "#06b6d4" }
    ], b = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, f = (q) => b[q.toLowerCase()] || dk, p = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, y = (q) => p[q.toLowerCase()] || uk, v = (q) => {
      const [ne] = q.split("|").map((R) => R.trim());
      return y(ne || q);
    }, k = (q) => {
      if (!q) return "Unknown";
      const ne = Ct(q).replace(/_/g, " ").trim();
      return ne ? ne.charAt(0).toUpperCase() + ne.slice(1) : "Unknown";
    }, w = $(() => n.data ?? {
      ai_agent_total_conversations: 0,
      ai_agent_avg_resolution_time_seconds: null,
      ai_agent_avg_resolution_time_formatted: null,
      human_total_conversations: 0,
      human_avg_resolution_time_seconds: null,
      human_avg_resolution_time_formatted: null,
      hybrid_total_conversations: 0,
      hybrid_avg_resolution_time_seconds: null,
      hybrid_avg_resolution_time_formatted: null,
      overall_total_conversations: 0,
      overall_avg_resolution_time_seconds: null,
      overall_avg_resolution_time_formatted: null,
      resolution_time_by_day: {},
      overall_resolution_time_by_day: {},
      channel_breakdown_items: [],
      channel_resolution_time_by_day: {},
      agent_breakdown_items: [],
      agent_resolution_time_by_day: {},
      agent_channel_breakdown_items: [],
      agent_channel_resolution_time_by_day: {}
    }), _ = oe({
      labels: [],
      datasets: []
    }), C = $(() => {
      const q = w.value, ne = {
        ai_agent: q.ai_agent_total_conversations,
        human: q.human_total_conversations,
        hybrid: q.hybrid_total_conversations
      }, R = {
        ai_agent: q.ai_agent_avg_resolution_time_formatted,
        human: q.human_avg_resolution_time_formatted,
        hybrid: q.hybrid_avg_resolution_time_formatted
      };
      return m.map((K) => ({
        key: K.key,
        label: K.label,
        color: K.color,
        formattedValue: R[K.key] || "-",
        subvalue: `${ne[K.key] || 0} conversations`
      }));
    }), M = (q, ne) => q.map((R) => ({
      key: R.key,
      label: k(R.label),
      color: ne(R.key),
      formattedValue: R.avg_resolution_time_formatted || "-",
      subvalue: `${R.total_conversations} conversations (${R.percentage.toFixed(1)}%)`
    })), S = $(
      () => M(w.value.channel_breakdown_items ?? [], f)
    ), P = $(
      () => M(w.value.agent_breakdown_items ?? [], y)
    ), I = $(
      () => M(
        w.value.agent_channel_breakdown_items ?? [],
        v
      )
    ), V = $(() => {
      switch (c.value) {
        case "channel":
          return S.value;
        case "agent":
          return P.value;
        case "agent_channel":
          return I.value;
        case "resolution_mode":
          return C.value;
        default:
          return [];
      }
    }), D = $(() => {
      const q = V.value.length;
      if (!(q <= 0))
        return { gridTemplateColumns: `repeat(${q}, minmax(0, 1fr))` };
    }), L = (q) => q == null ? null : Number((q / 60).toFixed(2)), T = oe([]), j = (q) => {
      const ne = q?.overall_resolution_time_by_day ?? {}, R = Object.keys(ne).sort((K, U) => K.localeCompare(U));
      if (!R.length) {
        _.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      T.value = [R.map((K) => ne[K] ?? null)], _.value = {
        labels: R.map((K) => je(K).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: T.value[0].map((K) => L(K)),
            borderColor: ck,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, H = (q) => {
      const ne = q?.resolution_time_by_day ?? {}, R = Object.keys(ne).sort((K, U) => K.localeCompare(U));
      if (!R.length) {
        _.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      T.value = m.map(
        (K) => R.map((U) => ne[U]?.[K.key] ?? null)
      ), _.value = {
        labels: R.map((K) => je(K).format("MMM DD")),
        datasets: m.map((K, U) => ({
          label: K.label,
          data: T.value[U].map((Y) => L(Y)),
          borderColor: K.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, X = (q, ne, R) => {
      const K = Object.keys(q).sort((Y, de) => Y.localeCompare(de));
      if (!K.length || !ne.length) {
        _.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      const U = ne.map((Y) => Y.key);
      T.value = U.map((Y) => K.map((de) => q[de]?.[Y] ?? null)), _.value = {
        labels: K.map((Y) => je(Y).format("MMM DD")),
        datasets: U.map((Y, de) => {
          const ge = ne.find((te) => te.key === Y);
          return {
            label: k(ge?.label || Y),
            data: T.value[de].map((te) => L(te)),
            borderColor: R(Y),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, ie = (q) => {
      switch (c.value) {
        case "channel":
          X(
            q?.channel_resolution_time_by_day ?? {},
            q?.channel_breakdown_items ?? [],
            f
          );
          return;
        case "agent":
          X(
            q?.agent_resolution_time_by_day ?? {},
            q?.agent_breakdown_items ?? [],
            y
          );
          return;
        case "agent_channel":
          X(
            q?.agent_channel_resolution_time_by_day ?? {},
            q?.agent_channel_breakdown_items ?? [],
            v
          );
          return;
        case "resolution_mode":
          H(q);
          return;
        default:
          j(q);
      }
    }, ue = $(() => ({
      scales: {
        y: {
          min: 0,
          ticks: {
            callback: (q) => `${q}m`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (q) => {
              const ne = q.dataset.label || "", R = T.value[q.datasetIndex]?.[q.dataIndex];
              return R == null ? `${ne}: -` : `${ne}: ${lo(R)}`;
            }
          }
        }
      }
    }));
    return Re(
      () => n.data,
      (q) => {
        ie(q ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Re(
      () => n.breakdownBy,
      (q) => {
        c.value = q, ie(n.data ?? null);
      }
    ), t({ isDark: l }), (q, ne) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: d.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      headerAside: E(() => [
        u("div", ak, [
          u("div", nk, [
            N(na, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": h
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        u("div", ok, [
          u("div", sk, [
            _.value.labels.length && _.value.datasets.length ? (g(), x("section", ik, [
              u("div", rk, [
                N(mt, {
                  data: _.value,
                  options: ue.value,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              V.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(D.value)
              }, [
                (g(!0), x(le, null, be(V.value, (R) => (g(), ae(xe, {
                  key: `card-${R.key}`,
                  class: "min-w-0",
                  color: R.color,
                  title: R.label,
                  value: R.formattedValue,
                  subvalue: R.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : (g(), x("section", lk, [...ne[0] || (ne[0] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No resolution time data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No conversations found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), fk = /* @__PURE__ */ ve(hk, [["__scopeId", "data-v-05854dc5"]]), gk = { class: "art-values__item" }, mk = { class: "art-values__number" }, pk = { class: "art-values__item" }, bk = { class: "art-values__number" }, vk = /* @__PURE__ */ ce({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), { isDark: o } = Me($e(a, "theme")), s = $(() => lo(a.aiAgentAvgResolutionTimeSeconds)), i = $(() => lo(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (r, l) => (g(), ae(ht, {
      label: "Average Resolution Time",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          })
        ], -1)
      ])]),
      value: E(() => [
        u("div", {
          class: Q(["art-values", { "art-values--dark": B(o) }])
        }, [
          u("div", gk, [
            u("span", mk, A(s.value), 1),
            l[1] || (l[1] = u("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          l[3] || (l[3] = u("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          u("div", pk, [
            u("span", bk, A(i.value), 1),
            l[2] || (l[2] = u("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), yk = /* @__PURE__ */ ve(vk, [["__scopeId", "data-v-f0592d9d"]]), xk = /* @__PURE__ */ ce({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "Check-in CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.checkinCr,
      "previous-value": e.previousCheckinCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M2 22h20" }),
          u("path", { d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), kk = /* @__PURE__ */ ce({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "Seller CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.sellerCr,
      "previous-value": e.previousSellerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "M16 10a4 4 0 0 1-8 0" }),
          u("path", { d: "M3.103 6.034h17.794" }),
          u("path", { d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), _k = /* @__PURE__ */ ce({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = $(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = $(() => B(n.value?.isDark) ?? !1), i = $(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ht, {
      label: "Booking Manager CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.bookingManagerCr,
      "previous-value": e.previousBookingManagerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...l[0] || (l[0] = [
        u("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          u("path", { d: "m15 11-1 9" }),
          u("path", { d: "m19 11-4-7" }),
          u("path", { d: "M2 11h20" }),
          u("path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" }),
          u("path", { d: "M4.5 15.5h15" }),
          u("path", { d: "m5 11 4-7" }),
          u("path", { d: "m9 11 1 9" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), wk = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ck = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, $k = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Sk = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Mk = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Dk = { class: "max-w-[360px] text-center" }, Ak = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Tk = {
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
    const t = e, { isDark: a, colors: n } = Me($e(t, "theme")), o = $(() => {
      const r = t.data ?? {}, l = r.daily, c = r.days, d = Array.isArray(l) && l.length > 0, h = Array.isArray(c) && c.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === c.length;
      let m = [];
      return d ? m = l : h && (m = c.map((b, f) => ({
        date: b,
        allocated_cost: r.allocatedCostSeries[f] ?? 0,
        aws_cost: r.awsCostSeries[f] ?? 0,
        airline_conversations: r.airlineConversationsSeries[f] ?? 0
      }))), {
        daily: m,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), s = $(() => {
      const r = o.value.daily;
      return {
        labels: r.map((c) => c.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((c) => c.allocated_cost),
            borderColor: n.value.primaryLight,
            backgroundColor: a.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
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
            backgroundColor: "transparent",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !1,
            yAxisID: "y"
          },
          {
            label: "Airline Conv.",
            data: r.map((c) => c.airline_conversations),
            borderColor: n.value.info,
            backgroundColor: a.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), i = $(() => ({
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
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: n.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0,
          callbacks: {
            label(r) {
              const l = r.dataset.label ? `${r.dataset.label}: ` : "", c = r.parsed.y;
              return r.dataset.yAxisID === "y" ? l + Pe(c) : l + String(c);
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
            color: n.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 },
            callback: (r) => Pe(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, l) => (g(), ae(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", wk, [
          o.value.daily.length > 0 ? (g(), x("div", Ck, [
            u("div", $k, [
              N(mt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", Sk, [
              N(xe, {
                color: B(n).primaryLight,
                title: "Total Allocated",
                value: B(Pe)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              N(xe, {
                color: "#FF9900",
                title: "Total AWS",
                value: B(Pe)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (g(), x("section", Mk, [
            u("div", Dk, [
              u("div", Ak, [
                N(B(it), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              l[0] || (l[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              l[1] || (l[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, Bk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Lk = { class: "card-body" }, Rk = {
  key: 0,
  class: "chart-section"
}, Pk = { class: "chart-container" }, Ik = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Ek = {
  key: 1,
  class: "empty-state"
}, Fk = { class: "empty-state-content" }, Ok = { class: "empty-icon-wrapper" }, Ba = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", di = 10, Vk = /* @__PURE__ */ ce({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (f) => {
      const p = new Date(f), y = String(p.getDate()).padStart(2, "0"), v = String(p.getMonth() + 1).padStart(2, "0");
      return `${y}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = $(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.input_cost || 0), 0);
    }), c = $(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.output_cost || 0), 0);
    }), d = $(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.cache_read_cost || 0), 0);
    }), h = $(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((p, y) => p + (y.cache_write_cost || 0), 0);
    }), m = $(() => {
      const f = n.data?.costs_by_day || {}, p = Object.keys(f).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const y = p.map((k) => i(k)), v = [
        {
          label: "Input Cost",
          data: p.map((k) => f[k]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: p.map((k) => f[k]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: p.map((k) => f[k]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: p.map((k) => f[k]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: v
      };
    }), b = $(() => n.options ? n.options : {
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
              family: Ba,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: di,
            boxHeight: di,
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
            family: Ba,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Ba,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(f) {
              let p = f.dataset.label || "";
              return p && (p += ": "), f.parsed.y !== null && (p += Pe(f.parsed.y)), p;
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
            font: { family: Ba, size: 12, weight: "500" },
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
            font: { family: Ba, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return Pe(f);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (f, p) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", Bk, [
          u("div", Lk, [
            m.value.labels && m.value.labels.length ? (g(), x("section", Rk, [
              u("div", Pk, [
                N($t, {
                  data: m.value,
                  options: b.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Ik, [
                N(xe, {
                  title: "Total Cost",
                  value: B(Pe)(e.data.total_cost)
                }, null, 8, ["value"]),
                N(xe, {
                  title: "Input Cost",
                  value: B(Pe)(l.value),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Output Cost",
                  value: B(Pe)(c.value),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Read",
                  value: B(Pe)(d.value),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Write",
                  value: B(Pe)(h.value),
                  color: r.cache_write
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Avg / Conv.",
                  value: B(Pe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", Ek, [
              u("div", Fk, [
                u("div", Ok, [
                  N(B(it), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                p[1] || (p[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), zk = /* @__PURE__ */ ve(Vk, [["__scopeId", "data-v-e1c4a95b"]]), Nk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, jk = { class: "card-body" }, Hk = {
  key: 0,
  class: "chart-section"
}, Wk = { class: "chart-container" }, Kk = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, Uk = {
  key: 1,
  class: "empty-state"
}, Yk = { class: "empty-state-content" }, qk = { class: "empty-icon-wrapper" }, La = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ui = 10, Xk = /* @__PURE__ */ ce({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (d) => {
      const h = new Date(d), m = String(h.getDate()).padStart(2, "0"), b = String(h.getMonth() + 1).padStart(2, "0");
      return `${m}-${b}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = $(() => {
      const d = n.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((f) => i(f)), b = [
        {
          label: "Input Tokens",
          data: h.map((f) => d[f]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => d[f]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => d[f]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => d[f]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: b
      };
    }), c = $(() => n.options ? n.options : {
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
              family: La,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: ui,
            boxHeight: ui,
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
            family: La,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: La,
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
            font: { family: La, size: 12, weight: "500" },
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
            font: { family: La, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (d, h) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", Nk, [
          u("div", jk, [
            l.value.labels && l.value.labels.length ? (g(), x("section", Hk, [
              u("div", Wk, [
                N($t, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Kk, [
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: B(fe)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: B(fe)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: B(fe)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: B(fe)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: B(fe)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (g(), x("section", Uk, [
              u("div", Yk, [
                u("div", qk, [
                  N(B(it), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = u("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Gk = /* @__PURE__ */ ve(Xk, [["__scopeId", "data-v-554d3cda"]]), Zk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Qk = { class: "card-body" }, Jk = {
  key: 0,
  class: "chart-section"
}, e_ = { class: "chart-container" }, t_ = { class: "mt-4 w-full min-w-0" }, a_ = {
  key: 1,
  class: "empty-state"
}, n_ = { class: "empty-state-content" }, o_ = { class: "empty-icon-wrapper" }, s_ = /* @__PURE__ */ ce({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(
      () => fe(a.data?.total_conversations ?? 0)
    ), r = $(() => {
      const c = a.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((b) => s(b)), m = [
        {
          label: "Conversations",
          data: d.map((b) => c[b] || 0),
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
    }), l = $(() => a.options ? a.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
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
    return t({ isDark: n }), (c, d) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", Zk, [
          u("div", Qk, [
            r.value.labels && r.value.labels.length ? (g(), x("section", Jk, [
              u("div", e_, [
                N(mt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", t_, [
                N(xe, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", a_, [
              u("div", n_, [
                u("div", o_, [
                  N(B(it), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No conversation count data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), i_ = /* @__PURE__ */ ve(s_, [["__scopeId", "data-v-311f443a"]]), r_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, l_ = { class: "card-body" }, c_ = {
  key: 0,
  class: "charts-grid"
}, d_ = { class: "chart-section" }, u_ = { class: "chart-container" }, h_ = { class: "chart-section" }, f_ = { class: "chart-container" }, g_ = {
  key: 1,
  class: "empty-state"
}, m_ = { class: "empty-state-content" }, p_ = { class: "empty-icon-wrapper" }, b_ = /* @__PURE__ */ ce({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = $(() => a.data?.top_agents && a.data.top_agents.length > 0), i = $(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, b) => (b.total_cost || 0) - (m.total_cost || 0)) : []), r = $(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, b) => (b.total_tokens || 0) - (m.total_tokens || 0)) : []), l = $(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((b) => Ct(b.agent_type)),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((b) => b.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = $(() => {
      const m = r.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((b) => Ct(b.agent_type)),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((b) => b.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), d = $(() => a.options ? a.options : {
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const b = m.label, f = a.data?.top_agents?.find(
                (p) => Ct(p.agent_type) === b
              );
              return f ? [
                `Total Cost: ${Pe(f.total_cost)}`,
                `Input Cost: ${Pe(f.total_input_tokens_cost)}`,
                `Output Cost: ${Pe(f.total_output_tokens_cost)}`,
                `Cache Read: ${Pe(f.total_read_tokens_cost)}`,
                `Cache Write: ${Pe(f.total_write_tokens_cost)}`
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
              return Pe(m);
            }
          }
        }
      }
    }), h = $(() => a.options ? a.options : {
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const b = m.label, f = a.data?.top_agents?.find(
                (p) => Ct(p.agent_type) === b
              );
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
    return t({ isDark: n }), (m, b) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", r_, [
          u("div", l_, [
            s.value ? (g(), x("div", c_, [
              u("section", d_, [
                b[0] || (b[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", u_, [
                  N($t, {
                    data: l.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", h_, [
                b[1] || (b[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", f_, [
                  N($t, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (g(), x("section", g_, [
              u("div", m_, [
                u("div", p_, [
                  N(B(it), { class: "empty-icon" })
                ]),
                b[2] || (b[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                b[3] || (b[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), v_ = /* @__PURE__ */ ve(b_, [["__scopeId", "data-v-ae26eabc"]]), y_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, x_ = { class: "card-body" }, k_ = {
  key: 0,
  class: "chart-section"
}, __ = { class: "chart-container" }, w_ = {
  key: 1,
  class: "empty-state"
}, C_ = { class: "empty-state-content" }, $_ = { class: "empty-icon-wrapper" }, S_ = /* @__PURE__ */ ce({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = $(() => a.data?.top_agents ? a.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = $(() => i.value.length > 0), l = $(() => i.value.reduce((h, m) => h + (m.conversations || 0), 0)), c = $(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return (s[y] || "#a78bfa") + "80";
      }), b = h.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return s[y] || "#a78bfa";
      });
      return {
        labels: h.map((p) => {
          const y = p.conversations || 0, v = l.value ? y / l.value * 100 : 0;
          return `${Ct(p.agent_type)} - ${y.toLocaleString()} (${v.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((p) => p.conversations || 0),
            backgroundColor: m,
            borderColor: b,
            borderWidth: 2
          }
        ]
      };
    }), d = $(() => a.options ? a.options : {
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
            label: (h) => {
              const m = (h.label || "").toString(), b = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((y, v) => y + (Number(v) || 0), 0), p = f ? b / f * 100 : 0;
              return `${m}: ${b.toLocaleString()} (${p.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, m) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", y_, [
          u("div", x_, [
            r.value ? (g(), x("section", k_, [
              u("div", __, [
                N(Pn, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", w_, [
              u("div", C_, [
                u("div", $_, [
                  N(B(it), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                m[1] || (m[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), M_ = /* @__PURE__ */ ve(S_, [["__scopeId", "data-v-a909b73c"]]), D_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, A_ = { class: "card-body" }, T_ = {
  key: 0,
  class: "chart-section"
}, B_ = { class: "chart-container" }, L_ = {
  key: 1,
  class: "empty-state"
}, R_ = { class: "empty-state-content" }, P_ = { class: "empty-icon-wrapper" }, I_ = /* @__PURE__ */ ce({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), r = $(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const y = [...c].sort((v, k) => v.date.localeCompare(k.date));
        return {
          labels: y.map((v) => s(v.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: y.map((v) => Number(v.value) || 0),
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
      const d = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, b = Object.keys(d).filter((y) => h[y]).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const f = b.map((y) => s(y)), p = b.map((y) => {
        const v = d[y]?.total_cost || 0, k = h[y] || 0;
        return k > 0 ? v / k : 0;
      });
      return {
        labels: f,
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
    }), l = $(() => a.options ? a.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += Pe(c.parsed.y)), d;
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
              return Pe(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, d) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", D_, [
          u("div", A_, [
            i.value ? (g(), x("section", T_, [
              u("div", B_, [
                N(mt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", L_, [
              u("div", R_, [
                u("div", P_, [
                  N(B(it), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), E_ = /* @__PURE__ */ ve(I_, [["__scopeId", "data-v-ae6c48b1"]]), F_ = { class: "tabs text-sm" }, O_ = ["aria-label"], V_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], z_ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, N_ = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = oe([]), s = `tabs-${He()}`, i = (f) => `${s}-tab-${f}`, r = $(
      () => a.items.map((f, p) => f.disabled ? -1 : p).filter((f) => f >= 0)
    );
    function l(f) {
      return f.value === a.modelValue;
    }
    function c(f) {
      const p = l(f), v = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${v} cursor-not-allowed opacity-40` : p ? `${v} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${v} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(f, p) {
      f === p || a.items.find((v) => v.value === f)?.disabled || (n("update:modelValue", f), n("change", { value: f, previousValue: p }));
    }
    function h(f, p) {
      n("tab-click", { value: f.value, originalEvent: p }), !f.disabled && (d(f.value, a.modelValue), We(() => {
        o.value[a.items.indexOf(f)]?.focus();
      }));
    }
    function m(f, p) {
      const y = a.items.length;
      if (y === 0) return 0;
      let v = f;
      for (let k = 0; k < y; k++)
        if (v = (v + p + y) % y, !a.items[v]?.disabled) return v;
      return f;
    }
    async function b(f, p) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let v = p;
      f.key === "ArrowLeft" ? v = m(p, -1) : f.key === "ArrowRight" ? v = m(p, 1) : f.key === "Home" ? v = r.value[0] ?? 0 : f.key === "End" && (v = r.value[r.value.length - 1] ?? p);
      const k = a.items[v];
      !k || k.disabled || (d(k.value, a.modelValue), await We(), o.value[v]?.focus());
    }
    return (f, p) => (g(), x("div", F_, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Q([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (g(!0), x(le, null, be(e.items, (y, v) => (g(), x("button", {
          id: i(y.value),
          key: y.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": l(y),
          "aria-disabled": y.disabled === !0,
          tabindex: l(y) ? 0 : -1,
          class: Q(c(y)),
          onClick: (k) => h(y, k),
          onKeydown: (k) => b(k, v)
        }, [
          u("span", {
            class: Q(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (g(), ae(bt(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : F("", !0),
            u("span", z_, A(y.label), 1)
          ], 2)
        ], 42, V_))), 128))
      ], 10, O_),
      f.$slots.default ? (g(), ae(gt, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: E(() => [
          (g(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : F("", !0)
    ]));
  }
}), Dr = /* @__PURE__ */ ve(N_, [["__scopeId", "data-v-f9c367eb"]]), j_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, H_ = { class: "card-body" }, W_ = {
  key: 0,
  class: "model-usage-table-block"
}, K_ = { class: "w-full min-w-0" }, U_ = {
  key: 1,
  class: "empty-state"
}, Y_ = { class: "empty-state-content" }, q_ = { class: "empty-icon-wrapper" }, X_ = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (f) => {
      o("export", f);
    }, { isDark: i } = Me($e(n, "theme")), r = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], l = oe("by_model"), c = $(() => l.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), d = $(() => [
      { key: "name", label: l.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = $(
      () => Object.entries(c.value).map(([f, p]) => ({
        id: f,
        name: f,
        avgCost: b(p.avg_cost_per_message),
        avgTokens: m(p.avg_tokens_per_message),
        messageCount: m(p.message_count),
        totalCost: b(p.total_cost),
        totalTokens: m(p.total_tokens)
      }))
    ), m = (f) => f == null ? "0" : fe(f), b = (f) => f == null ? "$0.00" : Pe(f);
    return t({ isDark: i }), (f, p) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", j_, [
          u("div", H_, [
            N(Dr, {
              modelValue: l.value,
              "onUpdate:modelValue": p[0] || (p[0] = (y) => l.value = y),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: E(() => [
                c.value && Object.keys(c.value).length > 0 ? (g(), x("div", W_, [
                  u("div", K_, [
                    N(ft, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (g(), x("div", U_, [
                  u("div", Y_, [
                    u("div", q_, [
                      N(B(it), { class: "empty-icon" })
                    ]),
                    p[1] || (p[1] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    p[2] || (p[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
                  ])
                ]))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), G_ = /* @__PURE__ */ ve(X_, [["__scopeId", "data-v-48a6cc07"]]), Z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q_ = { class: "card-body" }, J_ = {
  key: 0,
  class: "message-roles-table-block"
}, e2 = { class: "w-full min-w-0" }, t2 = {
  key: 1,
  class: "empty-state"
}, a2 = { class: "empty-state-content" }, n2 = { class: "empty-icon-wrapper" }, o2 = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (p) => {
      o("export", p);
    }, { isDark: i } = Me($e(n, "theme")), r = ["assistant", "system", "user"], l = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = $(() => n.data?.total_by_role || {}), d = $(
      () => r.map((p) => ({
        id: p,
        role: f(p),
        avgCost: b(c.value[p]?.avg_cost_per_message),
        avgTokens: m(c.value[p]?.avg_tokens_per_message),
        messageCount: m(c.value[p]?.message_count),
        totalCost: b(c.value[p]?.total_cost),
        totalTokens: m(c.value[p]?.total_tokens)
      }))
    ), h = $(() => Object.keys(c.value).length > 0), m = (p) => p == null ? "0" : fe(p), b = (p) => p == null ? "$0.00" : Pe(p), f = (p) => p.charAt(0).toUpperCase() + p.slice(1);
    return t({ isDark: i }), (p, y) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", Z_, [
          u("div", Q_, [
            h.value ? (g(), x("div", J_, [
              u("div", e2, [
                N(ft, {
                  columns: l,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (g(), x("div", t2, [
              u("div", a2, [
                u("div", n2, [
                  N(B(it), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                y[1] || (y[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), s2 = /* @__PURE__ */ ve(o2, [["__scopeId", "data-v-d38e854e"]]), i2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, r2 = { class: "card-body" }, l2 = {
  key: 0,
  class: "chart-section"
}, c2 = { class: "chart-container" }, d2 = { class: "kpi-grid" }, u2 = {
  key: 1,
  class: "empty-state"
}, h2 = { class: "empty-state-content" }, f2 = { class: "empty-icon-wrapper" }, g2 = 40, m2 = 230, p2 = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (w) => {
      o("export", w);
    }, { isDark: i, colors: r } = Me($e(n, "theme")), l = {
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
    }, c = (w) => w.agent_type || w.agent_id || w.agent_name || "", d = (w) => w.agent_name ? Ct(w.agent_name) : Ct(c(w)).split("_").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (w) => {
      const _ = c(w).toLowerCase();
      for (const [C, M] of Object.entries(l))
        if (_.includes(C))
          return M;
      return "#9ca3af";
    }, m = $(() => [...n.data?.top_agents || []].sort((_, C) => C.avg_cost_per_conversation - _.avg_cost_per_conversation)), b = $(
      () => Math.max(m2, m.value.length * g2 + 32)
    ), f = $(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : m.value.reduce((w, _) => w + _.conversations, 0)), p = $(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : m.value.reduce((w, _) => w + _.total_cost, 0)), y = $(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : f.value === 0 ? 0 : p.value / f.value), v = $(() => {
      const w = m.value;
      if (w.length === 0)
        return { labels: [], datasets: [] };
      const _ = w.map((S) => d(S)), C = w.map((S) => S.avg_cost_per_conversation), M = w.map((S) => h(S));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: C,
            backgroundColor: M.map((S) => `${S}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), k = $(() => n.options ? n.options : {
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
            title: function(w) {
              const _ = m.value[w[0]?.dataIndex];
              return _ ? d(_) : "";
            },
            label: function(w) {
              const _ = m.value[w.dataIndex];
              return [
                `Cost: ${Pe(w.parsed.x)}`,
                `Conversations: ${fe(_.conversations)}`,
                `Total Cost: ${Pe(_.total_cost)}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          type: "linear",
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
            callback: function(w) {
              return Pe(w);
            }
          }
        },
        y: {
          type: "category",
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
    return t({ isDark: i }), (w, _) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (g(), ae(B(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: E(() => [
        u("div", i2, [
          u("div", r2, [
            v.value.labels && v.value.labels.length ? (g(), x("section", l2, [
              u("div", c2, [
                N($t, {
                  data: v.value,
                  options: k.value,
                  "height-px": b.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              u("footer", d2, [
                N(B(xe), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                N(B(xe), {
                  title: "Total Conversations",
                  value: B(fe)(f.value)
                }, null, 8, ["value"]),
                N(B(xe), {
                  title: "Total Cost",
                  value: B(Pe)(p.value)
                }, null, 8, ["value"]),
                N(B(xe), {
                  title: "Avg Cost / Conv.",
                  value: B(Pe)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", u2, [
              u("div", h2, [
                u("div", f2, [
                  N(B(it), { class: "empty-icon" })
                ]),
                _[0] || (_[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                _[1] || (_[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), b2 = /* @__PURE__ */ ve(p2, [["__scopeId", "data-v-2a8f51ca"]]);
function Po(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function Ar(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, r) => s(i, r, n, o)).map((i) => {
    const r = Po(i, a);
    return r.length === 0 ? i : {
      ...i,
      [a]: Ar(r, t)
    };
  });
}
function Tr(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: r, maxDepth: l } = t, c = [];
  return e.forEach((d, h) => {
    const m = r(d, o + h), b = Po(d, s), f = b.length > 0, p = i.has(m);
    c.push({
      row: d,
      key: m,
      depth: a,
      hasChildren: f,
      isExpanded: p,
      parentKey: n
    }), f && p && (l === void 0 || a < l) && c.push(
      ...Tr(b, t, a + 1, m, 0)
    );
  }), c;
}
function Br(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, r = [];
  return e.forEach((l, c) => {
    const d = s(l, n + c), h = Po(l, o), m = h.length > 0, b = {
      depth: a,
      isChild: a > 0,
      hasChildren: m
    };
    (i?.(l, b) ?? !0) && r.push(d), h.length > 0 && r.push(
      ...Br(h, t, a + 1, 0)
    );
  }), r;
}
const v2 = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, y2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, x2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, k2 = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, _2 = ["checked", "aria-label"], w2 = ["aria-sort", "onClick"], C2 = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, $2 = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, S2 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, M2 = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, D2 = ["checked", "aria-label", "onChange"], A2 = ["aria-expanded", "aria-label", "onClick"], T2 = ["aria-expanded", "aria-label", "onClick"], B2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, L2 = { class: "min-w-0 flex-1" }, R2 = /* @__PURE__ */ ce({
  name: "Table",
  __name: "Table",
  props: {
    columns: {},
    rows: {},
    selectable: { type: Boolean, default: !1 },
    rowKey: { type: [String, Function], default: "id" },
    selectedKeys: { default: () => [] },
    ariaLabelSelectAll: { default: "Seleccionar todas las filas" },
    ariaLabelSelectRow: { default: "Seleccionar fila" },
    fixedLayout: { type: Boolean, default: !1 },
    sortKey: { default: null },
    sortDirection: { default: null },
    sortCompare: {},
    expandable: { type: Boolean, default: !1 },
    childrenKey: { default: "children" },
    expandColumnKey: { default: void 0 },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    maxDepth: { default: void 0 },
    isRowExpandable: { type: Function, default: void 0 },
    isRowSelectable: { type: Function, default: void 0 },
    ariaLabelExpandRow: { default: "Expandir fila" },
    ariaLabelCollapseRow: { default: "Contraer fila" }
  },
  emits: ["update:selectedKeys", "update:expandedKeys", "sort", "expand", "collapse"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = oe(null), s = oe([...a.defaultExpandedKeys]), i = $({
      get() {
        return a.expandedKeys ?? s.value;
      },
      set(R) {
        s.value = R, n("update:expandedKeys", R);
      }
    }), r = $(
      () => new Set(i.value)
    ), l = $(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = $(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: r.value,
      resolveRowKey: f,
      maxDepth: a.maxDepth
    })), d = $(() => {
      const { sortKey: R, sortDirection: K, sortCompare: U, rows: Y } = a;
      return !R || !K || !U ? Y : a.expandable ? Ar(Y, {
        childrenKey: a.childrenKey,
        sortKey: R,
        sortDirection: K,
        compare: U
      }) : [...Y].sort((de, ge) => U(de, ge, R, K));
    }), h = $(() => a.expandable ? Tr(d.value, c.value) : d.value.map((R, K) => ({
      row: R,
      key: f(R, K),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function m(R) {
      return `cell-${R}`;
    }
    function b(R) {
      return R === "center" ? "text-center" : R === "right" ? "text-right" : "text-left";
    }
    function f(R, K) {
      if (typeof a.rowKey == "function")
        return a.rowKey(R);
      const U = R[a.rowKey];
      return U != null ? String(U) : `__index_${K}`;
    }
    function p(R, K) {
      return R[K];
    }
    function y(R) {
      return R == null || typeof R == "object" ? "" : String(R);
    }
    function v(R) {
      return a.expandable && R === l.value;
    }
    function k(R) {
      return R.hasChildren || (a.isRowExpandable?.(R.row) ?? !1);
    }
    function w(R, K) {
      return {
        row: R.row,
        column: K,
        value: p(R.row, K.key),
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren,
        expanded: R.isExpanded
      };
    }
    function _(R) {
      if (!k(R)) return;
      const K = new Set(i.value);
      K.has(R.key) ? (K.delete(R.key), n("collapse", R.key, R.row)) : (a.singleExpand && K.clear(), K.add(R.key), n("expand", R.key, R.row)), i.value = [...K];
    }
    function C(R) {
      return {
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren
      };
    }
    function M(R, K) {
      return a.isRowSelectable?.(R, K) ?? !0;
    }
    function S(R) {
      return M(R.row, C(R));
    }
    function P(R) {
      return a.selectable && k(R) && !S(R);
    }
    function I(R) {
      return k(R) && !P(R);
    }
    function V(R) {
      return I(R) ? !1 : R.depth > 0 ? !0 : a.selectable && !k(R);
    }
    const D = $(() => {
      const { isRowSelectable: R } = a;
      return a.expandable ? Br(d.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: f,
        isRowSelectable: R
      }) : d.value.map((K, U) => ({
        row: K,
        key: f(K, U),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: K, context: U }) => M(K, U)).map(({ key: K }) => K);
    });
    function L(R) {
      const K = String(R);
      return a.selectedKeys.some((U) => String(U) === K);
    }
    const T = $(() => !a.selectable || D.value.length === 0 ? !1 : D.value.every(
      (R) => a.selectedKeys.some((K) => String(K) === String(R))
    )), j = $(() => {
      if (!a.selectable || D.value.length === 0) return !1;
      const R = D.value.filter(
        (K) => a.selectedKeys.some((U) => String(U) === String(K))
      );
      return R.length > 0 && R.length < D.value.length;
    });
    Re(
      [j, T, () => a.selectable],
      async () => {
        await We();
        const R = o.value;
        R && (R.indeterminate = j.value && !T.value);
      },
      { immediate: !0 }
    );
    function H() {
      if (a.selectable)
        if (T.value) {
          const R = new Set(
            D.value.map((U) => String(U))
          ), K = a.selectedKeys.filter(
            (U) => !R.has(String(U))
          );
          n("update:selectedKeys", K);
        } else {
          const R = new Set(a.selectedKeys.map((K) => String(K)));
          D.value.forEach((K) => R.add(String(K))), n("update:selectedKeys", [...R]);
        }
    }
    function X(R) {
      if (!a.selectable) return;
      const K = String(R), U = h.value.find((de) => String(de.key) === K);
      if (U && !S(U) || !U && !D.value.some((de) => String(de) === K))
        return;
      a.selectedKeys.some((de) => String(de) === K) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((de) => String(de) !== K)
      ) : n("update:selectedKeys", [...a.selectedKeys, K]);
    }
    function ie(R) {
      return `${a.ariaLabelSelectRow} ${R}`;
    }
    function ue(R) {
      n("sort", R);
    }
    function q(R) {
      return a.sortKey === R && a.sortDirection != null;
    }
    function ne(R) {
      return q(R) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (R, K) => (g(), x("div", v2, [
      u("div", y2, [
        u("table", {
          class: Q([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", x2, [
              e.selectable ? (g(), x("th", k2, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: T.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: H
                }, null, 40, _2)
              ])) : F("", !0),
              (g(!0), x(le, null, be(e.columns, (U) => (g(), x("th", {
                key: U.key,
                scope: "col",
                class: Q([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  v(U.key) && e.selectable ? "!pl-0" : "",
                  b(U.align),
                  U.headerClass ?? ""
                ])
              }, [
                U.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: Q(["kiut-table-sort-btn inline-flex items-center gap-1", b(U.align)]),
                  "aria-sort": ne(U.key),
                  onClick: (Y) => ue(U.key)
                }, [
                  u("span", null, A(U.label), 1),
                  u("span", C2, [
                    q(U.key) ? (g(), x(le, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", $2, "↑")) : e.sortDirection === "desc" ? (g(), x("span", S2, "↓")) : F("", !0)
                    ], 64)) : (g(), x(le, { key: 1 }, [
                      K[0] || (K[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      K[1] || (K[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, w2)) : (g(), x(le, { key: 1 }, [
                  Ae(A(U.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (g(!0), x(le, null, be(h.value, (U) => (g(), x("tr", {
              key: U.key,
              class: Q([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                U.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (g(), x("td", M2, [
                S(U) ? (g(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: L(U.key),
                  "aria-label": ie(U.key),
                  onChange: (Y) => X(U.key)
                }, null, 40, D2)) : P(U) ? (g(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": U.isExpanded,
                  "aria-label": U.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: ze((Y) => _(U), ["stop"])
                }, [
                  N(B(ta), {
                    class: Q(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !U.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, A2)) : F("", !0)
              ])) : F("", !0),
              (g(!0), x(le, null, be(e.columns, (Y) => (g(), x("td", {
                key: Y.key,
                class: Q([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  v(Y.key) ? "pl-0 pr-2" : "px-2",
                  b(Y.align),
                  Y.cellClass ?? ""
                ])
              }, [
                v(Y.key) ? (g(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: we({ paddingLeft: `${U.depth * 1.25}rem` })
                }, [
                  ke(R.$slots, "row-expand", {
                    row: U.row,
                    expanded: U.isExpanded,
                    hasChildren: U.hasChildren,
                    depth: U.depth,
                    toggle: () => _(U)
                  }, () => [
                    I(U) ? (g(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": U.isExpanded,
                      "aria-label": U.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: ze((de) => _(U), ["stop"])
                    }, [
                      N(B(ta), {
                        class: Q(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !U.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, T2)) : V(U) ? (g(), x("span", B2)) : F("", !0)
                  ], !0),
                  u("div", L2, [
                    ke(R.$slots, m(Y.key), vt({ ref_for: !0 }, w(U, Y)), () => [
                      Ae(A(y(p(U.row, Y.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(R.$slots, m(Y.key), vt({
                  key: 1,
                  ref_for: !0
                }, w(U, Y)), () => [
                  Ae(A(y(p(U.row, Y.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), P2 = /* @__PURE__ */ ve(R2, [["__scopeId", "data-v-b3104817"]]), hi = /* @__PURE__ */ ce({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = $(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (g(), x("svg", {
      class: Q(["inline-flex shrink-0 animate-spin", a.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...o[0] || (o[0] = [
      u("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), I2 = ["disabled", "aria-expanded", "aria-label"], E2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, F2 = { class: "min-w-0 truncate" }, O2 = ["disabled", "onClick", "onMouseenter"], V2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, z2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, N2 = { class: "min-w-0 flex-1 text-left" }, j2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, H2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, W2 = ["disabled", "aria-expanded", "aria-label"], K2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, U2 = ["disabled", "onClick", "onMouseenter"], Y2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, q2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, X2 = { class: "min-w-0 flex-1 text-left" }, G2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Z2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Q2 = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, J2 = ["type", "disabled", "aria-busy", "aria-label"], ew = {
  key: 2,
  class: "min-w-0 truncate"
}, tw = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, aw = ["type", "disabled", "aria-busy", "aria-label"], nw = {
  key: 2,
  class: "min-w-0 truncate"
}, wt = /* @__PURE__ */ ce({
  name: "Button",
  inheritAttrs: !1,
  __name: "Button",
  props: {
    variant: { default: "primary" },
    tone: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    tooltip: {},
    options: { default: () => [] },
    menuMinWidth: { default: "280px" },
    menuAlign: { default: "left" }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = Qa(), s = $(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = $(() => a.variant === "dropdown"), r = $(() => a.variant === "split"), l = $(() => a.variant === "action"), c = $(() => !l.value && !r.value), d = $(() => a.disabled || a.loading), h = $(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), m = $(() => {
      const R = o["aria-label"];
      if (typeof R == "string" && R.length > 0) return R;
      if ((l.value || r.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), b = $(() => {
      const R = o.type;
      return R === "submit" || R === "reset" || R === "button" ? R : "button";
    }), f = $(() => {
      const { class: R, type: K, "aria-label": U, ...Y } = o;
      return Y;
    }), p = $(() => a.variant === "primary" || a.variant === "dropdown" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : a.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100",
      "dark:hover:border-white/[0.18] dark:hover:bg-slate-800",
      "dark:active:bg-slate-700/90"
    ] : a.tone === "danger" ? [
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
    ]), y = `kiut-button-menu-${He()}`, v = `${y}-btn`, k = `${y}-menu`, w = oe(null), _ = oe(null), C = oe(null), M = oe(!1), S = oe(0), P = oe({}), I = $(() => a.options.filter((R) => !R.disabled));
    function V(R) {
      return `${R.value}-${R.label}`;
    }
    function D() {
      const R = _.value;
      if (!R) return;
      const K = R.getBoundingClientRect(), U = {
        top: `${K.bottom - 3}px`,
        minWidth: `max(${K.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (U.right = `${window.innerWidth - K.right}px`, U.left = "auto") : (U.left = `${K.left}px`, U.right = "auto"), P.value = U;
    }
    function L(R) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        S.value === R ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function T() {
      M.value = !1;
    }
    function j() {
      D(), S.value = 0, We(() => C.value?.focus());
    }
    function H() {
      if (!a.disabled) {
        if (M.value) {
          T();
          return;
        }
        M.value = !0, j();
      }
    }
    function X(R) {
      R.disabled || (n("select", R), T());
    }
    function ie(R) {
      R.stopPropagation(), H();
    }
    function ue(R) {
      if (!M.value) return;
      const K = R.target, U = w.value, Y = C.value;
      U && !U.contains(K) && (!Y || !Y.contains(K)) && T();
    }
    function q(R) {
      a.disabled || (R.key === "ArrowDown" || R.key === "Enter" || R.key === " ") && (R.preventDefault(), M.value || (M.value = !0, j()));
    }
    function ne(R) {
      const K = I.value;
      if (R.key === "Escape") {
        R.preventDefault(), T(), _.value?.focus();
        return;
      }
      if (K.length !== 0) {
        if (R.key === "ArrowDown") {
          R.preventDefault(), S.value = Math.min(S.value + 1, K.length - 1);
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), S.value = Math.max(S.value - 1, 0);
          return;
        }
        if (R.key === "Enter" || R.key === " ") {
          R.preventDefault();
          const U = K[S.value];
          U && X(U);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", ue);
    }), st(() => {
      document.removeEventListener("click", ue);
    }), (R, K) => i.value ? (g(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: w,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", vt({
        ref_key: "buttonRef",
        ref: _,
        id: v,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [p.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": m.value
      }, f.value, {
        onClick: ie,
        onKeydown: q
      }), [
        R.$slots.icon ? (g(), x("span", E2, [
          ke(R.$slots, "icon")
        ])) : F("", !0),
        u("span", F2, [
          ke(R.$slots, "default")
        ]),
        N(B(ta), {
          class: Q(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", M.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, I2),
      (g(), ae(Zt, { to: "body" }, [
        Qe(u("div", {
          ref_key: "panelRef",
          ref: C,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(P.value),
          onKeydown: ze(ne, ["stop"])
        }, [
          (g(!0), x(le, null, be(I.value, (U, Y) => (g(), x("button", {
            key: V(U),
            type: "button",
            role: "menuitem",
            disabled: U.disabled,
            class: Q(L(Y)),
            onClick: ze((de) => X(U), ["stop"]),
            onMouseenter: (de) => S.value = Y
          }, [
            U.icon ? (g(), x("span", V2, [
              (g(), ae(bt(U.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", z2)),
            u("span", N2, [
              u("span", j2, A(U.label), 1),
              U.description ? (g(), x("span", H2, A(U.description), 1)) : F("", !0)
            ])
          ], 42, O2))), 128))
        ], 36), [
          [Qt, M.value]
        ])
      ]))
    ], 512)) : r.value ? (g(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: w,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", vt({
        ref_key: "buttonRef",
        ref: _,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [p.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": m.value
      }, f.value, {
        onClick: ie,
        onKeydown: q
      }), [
        R.$slots.icon ? (g(), x("span", K2, [
          ke(R.$slots, "icon")
        ])) : F("", !0)
      ], 16, W2),
      (g(), ae(Zt, { to: "body" }, [
        Qe(u("div", {
          ref_key: "panelRef",
          ref: C,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(P.value),
          onKeydown: ze(ne, ["stop"])
        }, [
          (g(!0), x(le, null, be(I.value, (U, Y) => (g(), x("button", {
            key: V(U),
            type: "button",
            role: "menuitem",
            disabled: U.disabled,
            class: Q(L(Y)),
            onClick: ze((de) => X(U), ["stop"]),
            onMouseenter: (de) => S.value = Y
          }, [
            U.icon ? (g(), x("span", Y2, [
              (g(), ae(bt(U.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", q2)),
            u("span", X2, [
              u("span", G2, A(U.label), 1),
              U.description ? (g(), x("span", Z2, A(U.description), 1)) : F("", !0)
            ])
          ], 42, U2))), 128))
        ], 36), [
          [Qt, M.value]
        ])
      ]))
    ], 512)) : s.value ? (g(), x("span", Q2, [
      u("button", vt({
        type: b.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, p.value, B(o).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": m.value
      }, f.value), [
        e.loading ? (g(), ae(hi, {
          key: 0,
          compact: l.value
        }, null, 8, ["compact"])) : R.$slots.icon ? (g(), x("span", {
          key: 1,
          class: Q(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(R.$slots, "icon")
        ], 2)) : F("", !0),
        c.value ? (g(), x("span", ew, [
          ke(R.$slots, "default")
        ])) : F("", !0)
      ], 16, J2),
      u("span", tw, A(e.tooltip), 1)
    ])) : (g(), x("button", vt({
      key: 3,
      type: b.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, p.value, B(o).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": m.value
    }, f.value), [
      e.loading ? (g(), ae(hi, {
        key: 0,
        compact: l.value
      }, null, 8, ["compact"])) : R.$slots.icon ? (g(), x("span", {
        key: 1,
        class: Q(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(R.$slots, "icon")
      ], 2)) : F("", !0),
      c.value ? (g(), x("span", nw, [
        ke(R.$slots, "default")
      ])) : F("", !0)
    ], 16, aw));
  }
}), ow = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], sw = { class: "sr-only" }, Lr = /* @__PURE__ */ ce({
  name: "Toggle",
  __name: "Toggle",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean },
    id: {},
    size: { default: "md" },
    ariaLabel: { default: "Interruptor" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t;
    function o() {
      a.disabled || n("update:modelValue", !a.modelValue);
    }
    return (s, i) => (g(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "data-kiut-toggle-size": e.size,
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: Q([
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        e.size === "sm" ? "h-6 w-11" : "h-8 w-[3.75rem]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        Na(ze(o, ["prevent", "stop"]), ["space"]),
        Na(ze(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: Q(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", sw, A(e.ariaLabel), 1)
    ], 42, ow));
  }
}), iw = {
  method: "MÉTODO",
  name: "NOMBRE",
  url: "URL",
  status: "STATUS",
  version: "VERSIÓN",
  updated: "ACTUALIZADO",
  active: "ACTIVO",
  actions: "ACCIONES",
  historialTitle: "HISTORIAL DE VERSIONES",
  emptyHistory: "Sin versiones previas.",
  view: "Ver",
  run: "Ejecutar",
  edit: "Editar",
  delete: "Eliminar",
  createDraft: "Crear draft",
  viewVersion: "Ver",
  createDraftFromVersion: "Crear draft",
  expandRow: "Expandir fila",
  collapseRow: "Contraer fila",
  toggleActive: "Activar o desactivar",
  loadingHistory: "Cargando historial de versiones"
}, rw = [
  {
    key: "method",
    label: "MÉTODO",
    type: "method",
    headerClass: "w-28",
    cellClass: "w-28"
  },
  {
    key: "name",
    label: "NOMBRE",
    type: "name",
    headerClass: "min-w-0",
    cellClass: "min-w-0"
  },
  {
    key: "url",
    label: "URL",
    type: "url",
    headerClass: "min-w-0",
    cellClass: "min-w-0"
  },
  {
    key: "status",
    label: "STATUS",
    type: "status",
    headerClass: "w-32",
    cellClass: "w-32"
  },
  {
    key: "version",
    label: "VERSIÓN",
    type: "version",
    headerClass: "w-20",
    cellClass: "w-20"
  },
  {
    key: "updated",
    label: "ACTUALIZADO",
    type: "updated",
    headerClass: "w-28",
    cellClass: "w-28"
  },
  {
    key: "actions",
    label: "ACCIONES",
    type: "actions",
    align: "right",
    headerClass: "w-28",
    cellClass: "w-28",
    actions: ["view", "run", "edit"]
  }
], JS = [
  {
    key: "name",
    label: "NOMBRE",
    type: "name",
    headerClass: "min-w-0",
    cellClass: "min-w-0"
  },
  {
    key: "status",
    label: "STATUS",
    type: "status",
    headerClass: "w-32",
    cellClass: "w-32"
  },
  {
    key: "version",
    label: "VERSIÓN",
    type: "version",
    headerClass: "w-20",
    cellClass: "w-20"
  },
  {
    key: "updated",
    label: "ACTUALIZADO",
    type: "updated",
    headerClass: "w-28",
    cellClass: "w-28"
  },
  {
    key: "active",
    label: "ACTIVO",
    type: "active",
    align: "center",
    headerClass: "w-24",
    cellClass: "w-24"
  },
  {
    key: "actions",
    label: "ACCIONES",
    type: "actions",
    align: "right",
    headerClass: "w-36",
    cellClass: "w-36",
    actions: ["view", "createDraft", "edit", "delete"]
  }
], lw = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, cw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, dw = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, uw = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, hw = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, fw = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, gw = ["aria-expanded", "aria-label", "onClick"], mw = { class: "min-w-0 flex-1" }, pw = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, bw = ["colspan"], vw = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, yw = ["aria-label"], xw = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, kw = {
  key: 2,
  class: "space-y-2"
}, _w = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, ww = ["title"], Cw = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, $w = { class: "ml-auto flex shrink-0 items-center gap-2" }, Sw = /* @__PURE__ */ ce({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => rw },
    rowKey: { type: [String, Function], default: "id" },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    expandColumnKey: { default: void 0 },
    labels: { default: () => ({}) },
    historySkeletonCount: { default: 2 }
  },
  emits: ["update:expandedKeys", "expand", "collapse", "view", "run", "edit", "delete", "createDraft", "toggleActive", "viewVersion", "createDraftFromVersion"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = oe([...a.defaultExpandedKeys]), s = $({
      get() {
        return a.expandedKeys ?? o.value;
      },
      set(D) {
        o.value = D, n("update:expandedKeys", D);
      }
    }), i = $(() => ({
      ...iw,
      ...a.labels
    })), r = $(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), l = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(D) {
      return `cell-${D}`;
    }
    function d(D, L, T) {
      return {
        row: D,
        column: L,
        index: T,
        expanded: p(D, T)
      };
    }
    function h(D) {
      const L = D.key;
      return D.label ? D.label : L in i.value ? i.value[L] : D.key;
    }
    function m(D) {
      return D === "center" ? "text-center" : D === "right" ? "text-right" : "text-left";
    }
    function b(D) {
      return D === r.value;
    }
    function f(D, L) {
      if (typeof a.rowKey == "function")
        return a.rowKey(D);
      const T = D[a.rowKey];
      return T != null ? String(T) : `__index_${L}`;
    }
    function p(D, L) {
      return s.value.includes(f(D, L));
    }
    function y(D) {
      return D.versionsLoading === !0;
    }
    function v(D, L) {
      const T = f(D, L), j = new Set(s.value);
      j.has(T) ? (j.delete(T), n("collapse", T, D)) : (a.singleExpand && j.clear(), j.add(T), n("expand", T, D)), s.value = [...j];
    }
    function k(D) {
      return D.type ?? D.key;
    }
    function w(D) {
      return l[D] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function _(D) {
      return D === "published" ? "success" : "warning";
    }
    function C(D) {
      const L = D instanceof Date ? D : new Date(D);
      return Number.isNaN(L.getTime()) ? String(D) : L.toLocaleDateString("es-ES");
    }
    function M(D) {
      const L = D instanceof Date ? D : new Date(D);
      return Number.isNaN(L.getTime()) ? String(D) : L.toLocaleString("es-ES");
    }
    function S(D) {
      return Ne("div", { class: "min-w-0" }, [
        Ne(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          D.name
        ),
        D.description ? Ne(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          D.description
        ) : null
      ]);
    }
    function P(D) {
      return D.method ? Ne(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            w(D.method)
          ]
        },
        D.method
      ) : null;
    }
    function I(D, L) {
      const T = L.actions ?? ["view", "edit"], j = [];
      for (const H of T)
        H === "view" ? j.push(
          Ne(
            wt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", D)
            },
            { icon: () => Ne(ii, { class: "h-4 w-4" }) }
          )
        ) : H === "run" ? j.push(
          Ne(
            wt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", D)
            },
            { icon: () => Ne(np, { class: "h-4 w-4" }) }
          )
        ) : H === "edit" ? j.push(
          Ne(
            wt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", D)
            },
            { icon: () => Ne(ap, { class: "h-4 w-4" }) }
          )
        ) : H === "createDraft" ? j.push(
          Ne(
            wt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", D)
            },
            { icon: () => Ne(si, { class: "h-4 w-4" }) }
          )
        ) : H === "delete" && j.push(
          Ne(
            wt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", D)
            },
            { icon: () => Ne(op, { class: "h-4 w-4" }) }
          )
        );
      return Ne(
        "div",
        { class: "flex items-center justify-end gap-1" },
        j
      );
    }
    function V(D, L, T) {
      switch (k(L)) {
        case "name":
          return S(D);
        case "method":
          return P(D);
        case "url":
          return D.url ? Ne(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: D.url
            },
            D.url
          ) : null;
        case "status":
          return Ne(
            Xe,
            { color: _(D.status), outlined: !1 },
            () => D.status
          );
        case "version":
          return Ne("span", {}, D.version);
        case "updated":
          return Ne(
            "span",
            { class: "whitespace-nowrap text-xs" },
            C(D.updatedAt)
          );
        case "active":
          return Ne(Lr, {
            modelValue: D.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (H) => n("toggleActive", D, H)
          });
        case "actions":
          return I(D, L);
        default:
          return Ne("span", {}, String(D[L.key] ?? ""));
      }
    }
    return (D, L) => (g(), x("div", lw, [
      u("div", cw, [
        u("table", dw, [
          u("thead", null, [
            u("tr", uw, [
              (g(!0), x(le, null, be(e.columns, (T) => (g(), x("th", {
                key: T.key,
                scope: "col",
                class: Q([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  m(T.align),
                  T.headerClass ?? ""
                ])
              }, A(h(T)), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (g(!0), x(le, null, be(e.rows, (T, j) => (g(), x(le, {
              key: f(T, j)
            }, [
              u("tr", hw, [
                (g(!0), x(le, null, be(e.columns, (H) => (g(), x("td", {
                  key: H.key,
                  class: Q([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    m(H.align),
                    H.cellClass ?? ""
                  ])
                }, [
                  ke(D.$slots, c(H.key), vt({ ref_for: !0 }, d(T, H, j)), () => [
                    b(H.key) ? (g(), x("div", fw, [
                      u("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": p(T, j),
                        "aria-label": p(T, j) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (X) => v(T, j)
                      }, [
                        N(B(ta), {
                          class: Q(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !p(T, j) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, gw),
                      u("div", mw, [
                        (g(), ae(bt(() => V(T, H))))
                      ])
                    ])) : (g(), ae(bt(() => V(T, H)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              p(T, j) ? (g(), x("tr", pw, [
                u("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  u("h4", vw, A(i.value.historialTitle), 1),
                  y(T) ? (g(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (g(!0), x(le, null, be(e.historySkeletonCount, (H) => (g(), x("div", {
                      key: H,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...L[0] || (L[0] = [
                      Qn('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, yw)) : T.versions?.length ? (g(), x("div", kw, [
                    (g(!0), x(le, null, be(T.versions, (H) => (g(), x("div", {
                      key: H.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(D.$slots, "history-item", {
                        version: H,
                        row: T
                      }, () => [
                        N(Xe, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: E(() => [
                            Ae(A(H.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        u("span", _w, A(H.version), 1),
                        H.method ? (g(), x("span", {
                          key: 0,
                          class: Q(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", w(H.method)])
                        }, A(H.method), 3)) : F("", !0),
                        H.url ? (g(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: H.url
                        }, A(H.url), 9, ww)) : F("", !0),
                        u("span", Cw, A(M(H.updatedAt)), 1)
                      ], !0),
                      u("div", $w, [
                        ke(D.$slots, "history-actions", {
                          version: H,
                          row: T
                        }, () => [
                          N(wt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (X) => n("viewVersion", H, T)
                          }, {
                            icon: E(() => [
                              N(B(ii), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          N(wt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (X) => n("createDraftFromVersion", H, T)
                          }, {
                            icon: E(() => [
                              N(B(si), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (g(), x("p", xw, A(i.value.emptyHistory), 1))
                ], 8, bw)
              ])) : F("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), Mw = /* @__PURE__ */ ve(Sw, [["__scopeId", "data-v-177ecafb"]]);
function fi(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Dw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Aw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Tw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Bw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Lw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function Rw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Pw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Iw = ["aria-label"], Ew = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Fw = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Ow = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Vw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], zw = { class: "truncate" }, Nw = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, jw = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Hw = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Ww = ["aria-label", "onClick"], Kw = ["aria-label", "onClick"], Uw = ["aria-label"], Yw = ["aria-label"], qw = {
  key: 1,
  class: "space-y-2"
}, Xw = ["for"], Gw = ["id", "placeholder", "onKeydown"], Zw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Qw = ["aria-label"], Jw = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, e5 = ["checked", "onChange"], t5 = { class: "min-w-0 flex-1" }, a5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, n5 = { class: "flex flex-wrap items-end gap-2" }, o5 = { class: "min-w-[120px] flex-1" }, s5 = ["for"], i5 = ["id"], r5 = { class: "min-w-[120px] flex-1" }, l5 = ["for"], c5 = ["id"], d5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = co(), i = `${`kiut-filters-${He()}`}-panel`, r = oe(null), l = /* @__PURE__ */ new Map(), c = oe(null), d = oe(!1), h = oe({}), m = oe(null), b = oe(""), f = oe([]), p = oe(""), y = oe(""), v = $(() => c.value ? a.filterDefinitions.find((O) => O.id === c.value) ?? null : null), k = $(() => {
      const O = v.value;
      if (O)
        return O.type === "text" ? b.value : O.type === "select" ? f.value : { start: p.value, end: y.value };
    });
    function w(O, ee) {
      ee && ee instanceof HTMLElement ? l.set(O, ee) : l.delete(O);
    }
    function _(O) {
      return a.modelValue[O];
    }
    function C(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((ee) => typeof ee == "string" && ee.trim() !== "");
      if (typeof O == "string") {
        const ee = O.trim();
        return ee ? [ee] : [];
      }
      return [];
    }
    function M(O, ee) {
      if (ee == null) return !0;
      if (O.type === "text") return String(ee).trim() === "";
      if (O.type === "select") return C(ee).length === 0;
      if (O.type === "dateRange") {
        const se = ee;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const S = $(
      () => a.filterDefinitions.some((O) => !M(O, _(O.id)))
    ), P = $(() => {
      const O = [];
      for (const ee of a.filterDefinitions) {
        const se = _(ee.id);
        if (!M(ee, se)) {
          if (ee.type === "text")
            O.push({ kind: "text", def: ee, key: ee.id });
          else if (ee.type === "dateRange")
            O.push({ kind: "dateRange", def: ee, key: ee.id });
          else if (ee.type === "select")
            for (const pe of C(se))
              O.push({
                kind: "select",
                def: ee,
                optionValue: pe,
                key: `${ee.id}::${pe}`
              });
        }
      }
      return O;
    });
    function I(O) {
      return O.type !== "select" ? 0 : C(_(O.id)).length;
    }
    function V(O) {
      const ee = _(O.id), se = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${se}: ${String(ee ?? "").trim()}`;
      if (O.type === "select") {
        const Le = C(ee).map((qe) => O.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${se}: ${Le.join(", ")}`;
      }
      const pe = ee, Ce = L(pe.start), _e = L(pe.end);
      return `${se}: ${Ce} – ${_e}`;
    }
    function D(O) {
      return O.kind === "text" || O.kind === "dateRange" ? V(O.def) : O.def.options.find((se) => se.value === O.optionValue)?.label ?? O.optionValue;
    }
    function L(O) {
      if (!O) return "";
      const ee = je(O, "YYYY-MM-DD", !0);
      return ee.isValid() ? ee.format("L") : O;
    }
    function T(O) {
      const ee = c.value === O.id && d.value, se = !M(O, _(O.id));
      return ee || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function j(O) {
      return M(O, _(O.id)) ? G(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function H(O) {
      const ee = _(O.id);
      if (O.type === "text") {
        b.value = ee != null ? String(ee) : "";
        return;
      }
      if (O.type === "select") {
        f.value = [...C(ee)];
        return;
      }
      const se = ee;
      p.value = se?.start?.trim() ?? "", y.value = se?.end?.trim() ?? "";
    }
    function X() {
      const O = v.value;
      if (!O || O.type !== "select") return;
      const ee = { ...a.modelValue };
      f.value.length === 0 ? delete ee[O.id] : ee[O.id] = [...f.value], n("update:modelValue", ee), n("change", ee);
    }
    function ie(O) {
      const ee = f.value.indexOf(O);
      ee >= 0 ? f.value = f.value.filter((se, pe) => pe !== ee) : f.value = [...f.value, O], X();
    }
    function ue(O) {
      if (!O) return;
      m.value = O;
      const ee = O.getBoundingClientRect(), se = 300;
      let pe = ee.left;
      const Ce = window.innerWidth - se - 12;
      pe > Ce && (pe = Math.max(12, Ce)), pe < 12 && (pe = 12);
      const _e = ee.bottom + 8;
      h.value = {
        top: `${_e}px`,
        left: `${pe}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function q(O, ee) {
      if (c.value === O.id && d.value) {
        Y();
        return;
      }
      d.value && c.value !== O.id && Y(), c.value = O.id, d.value = !0, H(O), We().then(async () => {
        ue(ee.currentTarget), await We(), R();
      });
    }
    function ne(O, ee) {
      if (c.value === O.id && d.value) {
        Y();
        return;
      }
      d.value && c.value !== O.id && Y(), c.value = O.id, d.value = !0, H(O), We().then(async () => {
        const se = l.get(O.id) ?? ee.currentTarget;
        ue(se), await We(), R();
      });
    }
    function R() {
      const O = r.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function K() {
      d.value = !1, c.value = null, m.value = null;
    }
    function U(O) {
      const ee = v.value;
      if (!ee) return;
      if (ee.type === "text") {
        b.value = O != null ? String(O) : "";
        return;
      }
      if (ee.type === "select") {
        f.value = Array.isArray(O) ? O.filter((pe) => typeof pe == "string") : C(O);
        return;
      }
      const se = O;
      p.value = se?.start?.trim() ?? "", y.value = se?.end?.trim() ?? "";
    }
    function Y() {
      const O = v.value;
      if (!O) return;
      if (O.type === "text") {
        const Ce = b.value.trim(), _e = { ...a.modelValue };
        Ce === "" ? delete _e[O.id] : _e[O.id] = Ce, n("update:modelValue", _e), n("change", _e), K();
        return;
      }
      if (O.type === "select") {
        X(), K();
        return;
      }
      const ee = p.value.trim(), se = y.value.trim(), pe = { ...a.modelValue };
      !ee || !se || ee > se ? delete pe[O.id] : pe[O.id] = { start: ee, end: se }, n("update:modelValue", pe), n("change", pe), K();
    }
    function de(O) {
      const ee = { ...a.modelValue };
      delete ee[O], n("update:modelValue", ee), n("change", ee), c.value === O && K();
    }
    function ge(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        de(O.def.id);
        return;
      }
      const ee = { ...a.modelValue }, pe = C(ee[O.def.id]).filter((Ce) => Ce !== O.optionValue);
      pe.length === 0 ? delete ee[O.def.id] : ee[O.def.id] = pe, n("update:modelValue", ee), n("change", ee), c.value === O.def.id && H(O.def);
    }
    function te() {
      const O = {};
      n("update:modelValue", O), n("change", O), K();
    }
    const z = $(() => {
      const O = v.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function Z(O) {
      const ee = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((Ce) => Ce.value === O.optionValue)?.label ?? O.optionValue} del filtro ${ee}` : `Quitar filtro ${ee}`;
    }
    function re(O) {
      const ee = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const pe = O.def.options.find((Ce) => Ce.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${ee}: ${pe}`;
      }
      return `Editar filtro ${ee}`;
    }
    function G(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const W = $(() => a.clearLabel);
    function J(O) {
      if (!d.value || !r.value) return;
      const ee = O.target;
      if (!(r.value.contains(ee) || (ee instanceof Element ? ee : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const pe of l.values())
          if (pe?.contains(ee)) return;
        Y();
      }
    }
    function he(O) {
      O.key === "Escape" && d.value && (O.preventDefault(), K());
    }
    function me() {
      !d.value || !m.value || ue(m.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", J, !0), window.addEventListener("keydown", he, !0), window.addEventListener("resize", me);
    }), pi(() => {
      document.removeEventListener("mousedown", J, !0), window.removeEventListener("keydown", he, !0), window.removeEventListener("resize", me);
    }), Re(
      () => a.modelValue,
      () => {
        const O = v.value;
        O && d.value && !o.panel && H(O);
      },
      { deep: !0 }
    ), (O, ee) => (g(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", Ew, [
        u("span", Fw, A(e.label), 1),
        u("div", Ow, [
          (g(!0), x(le, null, be(e.filterDefinitions, (se) => (g(), x("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (pe) => w(se.id, pe),
            type: "button",
            class: Q(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", T(se)]),
            "aria-label": j(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (pe) => ne(se, pe)
          }, [
            N(B(Bw), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", zw, A(se.label), 1),
            se.type === "select" && I(se) > 0 ? (g(), x("span", Nw, A(I(se)), 1)) : F("", !0)
          ], 10, Vw))), 128))
        ])
      ]),
      S.value ? (g(), x("div", jw, [
        u("div", Hw, [
          (g(!0), x(le, null, be(P.value, (se) => (g(), x("div", {
            key: se.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": re(se),
              onClick: (pe) => q(se.def, pe)
            }, [
              ke(O.$slots, "formatChip", {
                filter: se.def,
                value: _(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                Ae(A(D(se)), 1)
              ], !0)
            ], 8, Ww),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Z(se),
              onClick: (pe) => ge(se)
            }, [
              N(B(Pw), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Kw)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": W.value,
          onClick: te
        }, A(e.clearLabel), 9, Uw)
      ])) : F("", !0),
      (g(), ae(Zt, { to: "body" }, [
        c.value && d.value ? (g(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": z.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: we(h.value),
          onKeydown: ee[3] || (ee[3] = ze(() => {
          }, ["stop"]))
        }, [
          v.value ? (g(), x(le, { key: 0 }, [
            O.$slots.panel ? ke(O.$slots, "panel", {
              key: 0,
              filter: v.value,
              close: Y,
              value: k.value,
              updateValue: U
            }, void 0, !0) : (g(), x("div", qw, [
              v.value.type === "text" ? (g(), x(le, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(v.value.label), 9, Xw),
                Qe(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": ee[0] || (ee[0] = (se) => b.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: v.value.placeholder ?? "…",
                  onKeydown: Na(ze(Y, ["prevent"]), ["enter"])
                }, null, 40, Gw), [
                  [Vt, b.value]
                ])
              ], 64)) : v.value.type === "select" ? (g(), x(le, { key: 1 }, [
                u("p", Zw, A(v.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": v.value.label,
                  "aria-multiselectable": !0
                }, [
                  (g(!0), x(le, null, be(v.value.options, (se) => (g(), x("li", {
                    key: se.value
                  }, [
                    u("label", Jw, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(se.value),
                        onChange: (pe) => ie(se.value)
                      }, null, 40, e5),
                      u("span", t5, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, Qw)
              ], 64)) : v.value.type === "dateRange" ? (g(), x(le, { key: 2 }, [
                u("p", a5, A(v.value.label), 1),
                u("div", n5, [
                  u("div", o5, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, s5),
                    Qe(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": ee[1] || (ee[1] = (se) => p.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, i5), [
                      [Vt, p.value]
                    ])
                  ]),
                  u("div", r5, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, l5),
                    Qe(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": ee[2] || (ee[2] = (se) => y.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, c5), [
                      [Vt, y.value]
                    ])
                  ])
                ])
              ], 64)) : F("", !0)
            ]))
          ], 64)) : F("", !0)
        ], 44, Yw)) : F("", !0)
      ]))
    ], 8, Iw));
  }
}), u5 = /* @__PURE__ */ ve(d5, [["__scopeId", "data-v-f38e0100"]]), h5 = { class: "font-sans" }, f5 = ["for"], g5 = { class: "relative" }, m5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], p5 = ["id"], Rr = /* @__PURE__ */ ce({
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
    errorText: {},
    icon: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = Qa(), s = bi("$pcForm", null), i = `kiut-input-text-${He()}`, r = $(() => a.id ?? i), l = $(() => `${r.value}-err`), c = $(() => a.name ?? o.name ?? ""), d = oe(a.modelValue ?? "");
    Re(
      () => a.modelValue,
      (v) => {
        d.value = v ?? "";
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), st(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), m = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function b(v) {
      const k = v.target.value;
      d.value = k, n("update:modelValue", k);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(v);
    }
    function f(v) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(v);
    }
    function p(v) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(v);
    }
    const y = $(() => {
      const { name: v, id: k, type: w, ..._ } = o;
      return _;
    });
    return (v, k) => (g(), x("div", h5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Q(B(rt))
      }, A(e.label), 11, f5)) : F("", !0),
      u("div", g5, [
        e.icon ? (g(), ae(bt(e.icon), {
          key: 0,
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        })) : F("", !0),
        u("input", vt(y.value, {
          id: r.value,
          name: c.value,
          type: e.type,
          autocomplete: "off",
          class: [
            B(ot),
            e.icon ? "pl-10" : "",
            m.value ? B(St) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: h.value,
          "aria-invalid": m.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: b,
          onChange: f,
          onBlur: p
        }), null, 16, m5)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, p5)) : F("", !0)
    ]));
  }
}), b5 = { class: "font-sans" }, v5 = ["for"], y5 = { class: "relative" }, x5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], k5 = ["aria-label"], _5 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, w5 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, C5 = ["id"], $5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = Qa(), s = bi("$pcForm", null), i = `kiut-input-password-${He()}`, r = $(() => a.id ?? i), l = $(() => `${r.value}-err`), c = $(() => a.name ?? o.name ?? ""), d = oe(!1), h = oe(a.modelValue ?? "");
    Re(
      () => a.modelValue,
      (k) => {
        k !== void 0 && k !== h.value && (h.value = k);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), st(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const m = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), b = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function f(k) {
      const w = k.target.value;
      h.value = w, n("update:modelValue", w);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(k);
    }
    function p(k) {
      const w = s?.fields?.[c.value]?.props;
      w?.onChange && w.onChange(k);
    }
    function y(k) {
      const w = s?.fields?.[c.value]?.props;
      w?.onBlur && w.onBlur(k);
    }
    const v = $(() => {
      const { name: k, id: w, ..._ } = o;
      return _;
    });
    return (k, w) => (g(), x("div", b5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Q(B(rt))
      }, A(e.label), 11, v5)) : F("", !0),
      u("div", y5, [
        u("input", vt(v.value, {
          id: r.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [B(ot), b.value ? B(St) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": b.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: f,
          onChange: p,
          onBlur: y
        }), null, 16, x5),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: w[0] || (w[0] = (_) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (g(), x("svg", w5, [...w[2] || (w[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (g(), x("svg", _5, [...w[1] || (w[1] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            }, null, -1),
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, null, -1)
          ])]))
        ], 8, k5)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, C5)) : F("", !0)
    ]));
  }
}), S5 = { class: "font-sans" }, M5 = ["for"], D5 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], A5 = ["id"], T5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-textarea-${He()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = $({
      get: () => a.modelValue,
      set: (l) => n("update:modelValue", l)
    });
    return (l, c) => (g(), x("div", S5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Q(B(rt))
      }, A(e.label), 11, M5)) : F("", !0),
      Qe(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: Q([B(vb), e.invalid ? B(St) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, D5), [
        [Vt, r.value]
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, A5)) : F("", !0)
    ]));
  }
}), B5 = { class: "font-sans" }, L5 = ["for"], R5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], P5 = ["for"], I5 = ["title"], E5 = ["aria-label"], F5 = {
  key: 2,
  class: "space-y-3"
}, O5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], V5 = ["for"], z5 = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, N5 = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, j5 = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, H5 = { class: "flex items-start gap-2" }, W5 = { class: "min-w-0 flex-1 space-y-2" }, K5 = { class: "flex items-center gap-2" }, U5 = ["title"], Y5 = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, q5 = ["aria-label", "onClick"], X5 = ["id"], G5 = /* @__PURE__ */ ce({
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
    clearAriaLabel: { default: "Quitar archivo" },
    multiple: { type: Boolean, default: !1 },
    maxFiles: { default: 50 },
    showDescriptions: { type: Boolean, default: !1 },
    descriptionLabel: { default: "Descripción" },
    descriptionPlaceholder: { default: "Ingresa una descripción" },
    removeFileAriaLabel: { default: "Quitar archivo" },
    filesCountLabel: {},
    submitted: { type: Boolean, default: !1 },
    descriptionErrorText: { default: "" },
    requireDescriptions: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-input-file-${He()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = oe(null), l = $(
      () => a.multiple ? null : a.modelValue
    ), c = $(() => {
      if (!a.multiple) return [];
      const S = a.modelValue;
      return Array.isArray(S) ? S : [];
    }), d = $(
      () => l.value?.name ?? a.placeholder
    ), h = $(
      () => a.multiple && c.value.length >= a.maxFiles
    ), m = $(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function b(S) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && S.description.trim() === "";
    }
    function f(S) {
      return S < 1024 ? `${S} B` : S < 1024 * 1024 ? `${(S / 1024).toFixed(1)} KB` : `${(S / (1024 * 1024)).toFixed(1)} MB`;
    }
    function p(S) {
      return {
        id: `file-${He()}`,
        file: S,
        description: ""
      };
    }
    function y(S, P) {
      return S.some(
        (I) => I.file.name === P.name && I.file.size === P.size && I.file.lastModified === P.lastModified
      );
    }
    function v() {
      r.value && (r.value.value = "");
    }
    function k(S) {
      const I = S.target.files?.[0] ?? null;
      n("update:modelValue", I);
    }
    function w(S) {
      const P = S.target, I = Array.from(P.files ?? []);
      if (I.length === 0) return;
      const V = [...c.value];
      for (const D of I) {
        if (V.length >= a.maxFiles) break;
        y(V, D) || V.push(p(D));
      }
      n("update:modelValue", V), v();
    }
    function _() {
      n("update:modelValue", null), v();
    }
    function C(S) {
      n(
        "update:modelValue",
        c.value.filter((P) => P.id !== S)
      );
    }
    function M(S, P) {
      n(
        "update:modelValue",
        c.value.map(
          (I) => I.id === S ? { ...I, description: P } : I
        )
      );
    }
    return (S, P) => (g(), x("div", B5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Q(B(rt))
      }, A(e.label), 11, L5)) : F("", !0),
      e.multiple ? (g(), x("div", F5, [
        u("div", {
          class: Q([
            B(ot),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? B(St) : "",
            e.disabled ? "pointer-events-none" : ""
          ])
        }, [
          u("input", {
            id: s.value,
            ref_key: "fileInputRef",
            ref: r,
            type: "file",
            multiple: "",
            class: "sr-only focus:outline-none focus:ring-0",
            name: e.name,
            accept: e.accept,
            disabled: e.disabled || h.value,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0,
            onChange: w
          }, null, 40, O5),
          u("label", {
            for: s.value,
            class: Q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || h.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            N(B(io), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, V5),
          u("span", z5, A(m.value), 1),
          e.filesCountLabel ? (g(), x("span", N5, A(e.filesCountLabel), 1)) : F("", !0)
        ], 2),
        c.value.length > 0 ? (g(), x("ul", j5, [
          (g(!0), x(le, null, be(c.value, (I) => (g(), x("li", {
            key: I.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            u("div", H5, [
              N(B(ep), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              u("div", W5, [
                u("div", K5, [
                  u("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: I.file.name
                  }, A(I.file.name), 9, U5),
                  u("span", Y5, A(f(I.file.size)), 1),
                  e.disabled ? F("", !0) : (g(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (V) => C(I.id)
                  }, [
                    N(B(ro), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, q5))
                ]),
                e.showDescriptions ? (g(), ae(Rr, {
                  key: 0,
                  "model-value": I.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: b(I),
                  "error-text": b(I) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (V) => M(I.id, V)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : F("", !0)
              ])
            ])
          ]))), 128))
        ])) : F("", !0)
      ])) : (g(), x("div", {
        key: 1,
        class: Q([
          B(ot),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? B(St) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
          id: s.value,
          ref_key: "fileInputRef",
          ref: r,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: k
        }, null, 40, R5),
        u("label", {
          for: s.value,
          class: Q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(B(io), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, P5),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: d.value || void 0
        }, A(d.value), 9, I5),
        l.value && !e.disabled ? (g(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: _
        }, [
          N(B(ro), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, E5)) : F("", !0)
      ], 2)),
      e.errorText ? (g(), x("p", {
        key: 3,
        id: i.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, X5)) : F("", !0)
    ]));
  }
}), Z5 = ["for"], Q5 = { class: "flex w-full min-w-0 items-center gap-3" }, J5 = ["for", "aria-label"], eC = ["src"], tC = ["id", "accept", "disabled"], aC = ["id", "value", "placeholder", "disabled"], nC = /* @__PURE__ */ ce({
  name: "ImageUploadCircle",
  inheritAttrs: !1,
  __name: "ImageUploadCircle",
  props: {
    modelValue: { default: "" },
    label: {},
    id: {},
    accept: { default: ".png,.jpg,.jpeg,.gif,.webp,.svg,image/*" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    showUrlInput: { type: Boolean, default: !0 },
    urlPlaceholder: {},
    uploadAriaLabel: {},
    size: { default: "md" },
    urlInputClass: {}
  },
  emits: ["update:modelValue", "select"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = oe(!1), s = oe(null), i = `kiut-image-upload-circle-${He()}`, r = $(() => a.id ?? i), l = $(() => `${r.value}-url`), c = $(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), d = $(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), h = $(() => !a.disabled && !a.loading);
    Re(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function m(f) {
      const p = f.target, y = p.files?.[0];
      y && n("select", y), p.value = "";
    }
    function b(f) {
      n("update:modelValue", f.target.value);
    }
    return (f, p) => (g(), x("div", vt({ class: "font-sans flex w-full flex-col gap-2" }, f.$attrs), [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Q(B(rt))
      }, A(e.label), 11, Z5)) : F("", !0),
      u("div", Q5, [
        u("label", {
          for: r.value,
          class: Q(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            h.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (g(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: p[0] || (p[0] = (y) => o.value = !0)
          }, null, 40, eC)) : e.loading ? (g(), ae(B(Gm), {
            key: 1,
            class: Q([d.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (g(), ae(B(io), {
            key: 2,
            class: Q([d.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, J5),
        u("input", {
          id: r.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: m
        }, null, 40, tC),
        e.showUrlInput ? (g(), x("div", {
          key: 0,
          class: Q(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          u("input", {
            id: l.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: Q([B(ot), "w-full min-w-0"]),
            onInput: b
          }, null, 42, aC)
        ], 2)) : F("", !0)
      ])
    ], 16));
  }
}), oC = { class: "font-sans" }, sC = ["for"], iC = { class: "relative" }, rC = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], lC = ["id"], cC = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-datetime-${He()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = $(() => a.modelValue ?? "");
    function l(c) {
      const d = c.target.value;
      n("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (g(), x("div", oC, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Q(B(rt))
      }, A(e.label), 11, sC)) : F("", !0),
      u("div", iC, [
        N(B(Lo), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: Q([
            B(ot),
            "pl-10",
            e.invalid ? B(St) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, rC)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, lC)) : F("", !0)
    ]));
  }
}), dC = { class: "font-sans" }, uC = ["for"], hC = { class: "relative" }, fC = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], gC = ["id"], mC = /* @__PURE__ */ ce({
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
    function a(h) {
      const m = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!m) return null;
      const b = Number(m[1]), f = Number(m[2]);
      return !Number.isInteger(b) || !Number.isInteger(f) || b < 0 || b > 23 || f < 0 || f > 59 ? null : `${String(b).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function n(h) {
      return h === "" ? null : a(h);
    }
    const o = e, s = t, i = `kiut-input-time-${He()}`, r = $(() => o.id ?? i), l = $(() => `${r.value}-err`), c = $(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function d(h) {
      const m = h.target.value;
      s("update:modelValue", n(m));
    }
    return (h, m) => (g(), x("div", dC, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Q(B(rt))
      }, A(e.label), 11, uC)) : F("", !0),
      u("div", hC, [
        N(B(Qm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Q([
            B(ot),
            "pl-10",
            e.invalid ? B(St) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: d
        }, null, 42, fC)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, gC)) : F("", !0)
    ]));
  }
}), pC = { class: "font-sans" }, bC = ["for"], vC = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, yC = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], xC = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, kC = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, _C = { class: "min-w-0 text-left leading-snug" }, wC = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, CC = { class: "min-w-0 text-right leading-snug" }, $C = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, SC = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, MC = ["id"], DC = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-range-${He()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = $(() => {
      const b = [];
      return a.errorText && b.push(i.value), b.length ? b.join(" ") : void 0;
    }), l = $(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = $(() => !!(a.captionMin || a.captionMax)), d = $(() => {
      const { min: b, max: f, modelValue: p } = a;
      if (f === b) return 0;
      const y = (p - b) / (f - b);
      return Math.min(100, Math.max(0, y * 100));
    }), h = $(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function m(b) {
      const f = Number(b.target.value);
      n("update:modelValue", Number.isNaN(f) ? a.min : f);
    }
    return (b, f) => (g(), x("div", pC, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Q(B(rt))
      }, A(e.label), 11, bC)) : F("", !0),
      u("div", {
        class: Q(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (g(), x("p", vC, A(e.captionMax), 1)) : F("", !0),
        u("div", {
          class: Q(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: we(h.value)
        }, [
          u("input", {
            id: s.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": r.value,
            class: Q([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: m
          }, null, 42, yC)
        ], 6),
        e.orientation === "horizontal" && l.value ? (g(), x("p", xC, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (g(), x("div", kC, [
          u("span", _C, A(e.captionMin), 1),
          u("span", wC, A(e.caption), 1),
          u("span", CC, A(e.captionMax), 1)
        ])) : F("", !0),
        e.orientation === "vertical" && e.captionMin ? (g(), x("p", $C, A(e.captionMin), 1)) : F("", !0),
        e.orientation === "vertical" && e.caption ? (g(), x("p", SC, A(e.caption), 1)) : F("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, MC)) : F("", !0)
    ]));
  }
}), AC = /* @__PURE__ */ ve(DC, [["__scopeId", "data-v-ce7263e4"]]), TC = { class: "font-sans" }, BC = ["for"], LC = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], RC = ["id"], PC = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-number-${He()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = $(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = $(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        n("update:modelValue", null);
        return;
      }
      const m = Number(h);
      n("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (d, h) => (g(), x("div", TC, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Q(B(rt))
      }, A(e.label), 11, BC)) : F("", !0),
      u("input", {
        id: s.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: Q([
          B(ot),
          e.invalid ? B(St) : "",
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
      }, null, 42, LC),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, RC)) : F("", !0)
    ]));
  }
}), IC = { class: "font-sans" }, EC = ["for"], FC = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], OC = ["disabled"], VC = ["id"], zC = "#3b82f6", NC = "#aabbcc", jC = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", HC = /* @__PURE__ */ ce({
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
    function a(f) {
      const p = f.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(p);
      if (y) return `#${y[1].toLowerCase()}`;
      const v = /^#?([0-9a-fA-F]{3})$/.exec(p);
      if (v) {
        const [k, w, _] = v[1].split("");
        return `#${k}${k}${w}${w}${_}${_}`.toLowerCase();
      }
      return null;
    }
    function n(f) {
      return a(f) ?? zC;
    }
    const o = e, s = t, i = `kiut-input-color-${He()}`, r = $(() => o.id ?? i), l = $(() => `${r.value}-err`), c = $(() => n(o.modelValue)), d = oe(c.value), h = oe(!1);
    Re(c, (f) => {
      h.value || (d.value = f);
    });
    function m(f) {
      const p = f.target, y = a(p.value);
      y && s("update:modelValue", y);
    }
    function b() {
      h.value = !1;
      const f = a(d.value);
      f ? (d.value = f, s("update:modelValue", f)) : d.value = c.value;
    }
    return Re(d, (f) => {
      if (!h.value) return;
      const p = a(f);
      p && s("update:modelValue", p);
    }), (f, p) => (g(), x("div", IC, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Q(B(rt))
      }, A(e.label), 11, EC)) : F("", !0),
      u("div", {
        class: Q([
          jC,
          e.invalid ? B(St) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        u("input", {
          id: r.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: m
        }, null, 40, FC),
        e.showHexInput ? Qe((g(), x("input", {
          key: 0,
          "onUpdate:modelValue": p[0] || (p[0] = (y) => d.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: NC,
          onFocus: p[1] || (p[1] = (y) => h.value = !0),
          onBlur: b
        }, null, 40, OC)), [
          [Vt, d.value]
        ]) : F("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, VC)) : F("", !0)
    ]));
  }
}), Pr = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, Ir = [
  {
    id: "smileys",
    emojis: [
      { char: "😀", terms: ["feliz", "happy", "sonrisa", "grin"] },
      { char: "😃", terms: ["feliz", "happy", "ojos", "smile"] },
      { char: "😄", terms: ["feliz", "happy", "sonrisa"] },
      { char: "😁", terms: ["feliz", "beam", "sonrisa"] },
      { char: "😆", terms: ["risa", "laugh", "squint"] },
      { char: "😅", terms: ["risa", "sudor", "nervioso"] },
      { char: "🤣", terms: ["risa", "rofl", "laugh"] },
      { char: "😂", terms: ["risa", "llorar", "joy", "tears"] },
      { char: "🙂", terms: ["sonrisa", "smile", "slight"] },
      { char: "🙃", terms: ["invertido", "upsidedown"] },
      { char: "😉", terms: ["guiño", "wink"] },
      { char: "😊", terms: ["sonrisa", "blush", "timido"] },
      { char: "😇", terms: ["angel", "halo", "inocente", "santo"] },
      { char: "🥰", terms: ["amor", "love", "corazon"] },
      { char: "😍", terms: ["amor", "heart eyes", "corazon"] },
      { char: "🤩", terms: ["estrella", "star", "wow"] },
      { char: "😘", terms: ["beso", "kiss"] },
      { char: "☺️", terms: ["sonrisa", "smile"] },
      { char: "😚", terms: ["beso", "kiss"] },
      { char: "🥲", terms: ["sonrisa", "lagrima", "gratitud"] },
      { char: "😋", terms: ["rico", "yummy", "delicioso"] },
      { char: "😛", terms: ["lengua", "tongue", "playful"] },
      { char: "😜", terms: ["lengua", "wink", "travieso"] },
      { char: "🤪", terms: ["loco", "zany", "divertido"] },
      { char: "🤗", terms: ["abrazo", "hug"] },
      { char: "🤭", terms: ["ups", "oops", "timido"] },
      { char: "🤫", terms: ["shh", "silencio", "secret"] },
      { char: "🤔", terms: ["pensar", "think", "duda"] },
      { char: "🤐", terms: ["silencio", "zip", "boca"] },
      { char: "😐", terms: ["neutral", "serio"] },
      { char: "😶", terms: ["sin boca", "silencio"] },
      { char: "😌", terms: ["aliviado", "relieved", "calma"] },
      { char: "😴", terms: ["dormir", "sleep", "sueno"] },
      { char: "😷", terms: ["mask", "mascarilla", "enfermo"] },
      { char: "🤒", terms: ["enfermo", "sick", "termometro"] },
      { char: "🤕", terms: ["herido", "injured", "vendaje"] },
      { char: "🥳", terms: ["fiesta", "party", "celebracion"] },
      { char: "🥸", terms: ["disfraz", "disguise"] },
      { char: "😎", terms: ["cool", "gafas", "sunglasses"] },
      { char: "🤓", terms: ["nerd", "estudioso"] },
      { char: "😮", terms: ["sorpresa", "wow", "open mouth"] },
      { char: "😯", terms: ["sorpresa", "hushed"] },
      { char: "😲", terms: ["asombrado", "astonished"] },
      { char: "😳", terms: ["sonrojo", "flushed", "verguenza"] },
      { char: "🥺", terms: ["por favor", "please", "puppy"] },
      { char: "😢", terms: ["triste", "sad", "cry"] },
      { char: "😭", terms: ["llorar", "cry", "sad"] },
      { char: "😱", terms: ["susto", "scream", "shock"] },
      { char: "🫡", terms: ["saludo", "salute", "respeto"] }
    ]
  },
  {
    id: "gestures",
    emojis: [
      { char: "👍", terms: ["ok", "bien", "thumbs up", "like"] },
      { char: "👏", terms: ["aplauso", "clap", "bravo"] },
      { char: "🙏", terms: ["gracias", "thanks", "please", "rezo"] },
      { char: "🙌", terms: ["celebrar", "raise hands", "hurra"] },
      { char: "👌", terms: ["ok", "perfecto", "bien"] },
      { char: "✌️", terms: ["paz", "peace", "victoria"] },
      { char: "🤝", terms: ["apretón", "handshake", "acuerdo"] },
      { char: "💪", terms: ["fuerte", "strong", "musculo"] },
      { char: "🤞", terms: ["suerte", "fingers crossed", "cruzar"] },
      { char: "👋", terms: ["hola", "wave", "adios", "saludo"] },
      { char: "🫶", terms: ["corazon", "heart hands", "amor"] },
      { char: "👐", terms: ["manos", "open hands", "abrazo"] },
      { char: "👇", terms: ["abajo", "down", "señalar"] },
      { char: "👆", terms: ["arriba", "up", "señalar"] },
      { char: "☝️", terms: ["arriba", "up", "uno"] },
      { char: "🤙", terms: ["llamar", "call", "shaka"] },
      { char: "✋", terms: ["alto", "stop", "mano"] },
      { char: "🖐️", terms: ["mano", "hi", "cinco"] }
    ]
  },
  {
    id: "symbols",
    emojis: [
      { char: "❤️", terms: ["corazon", "heart", "amor", "love"] },
      { char: "🧡", terms: ["corazon", "naranja", "orange"] },
      { char: "💛", terms: ["corazon", "amarillo", "yellow"] },
      { char: "💚", terms: ["corazon", "verde", "green"] },
      { char: "💙", terms: ["corazon", "azul", "blue"] },
      { char: "💜", terms: ["corazon", "morado", "purple"] },
      { char: "🤍", terms: ["corazon", "blanco", "white"] },
      { char: "💕", terms: ["corazones", "hearts", "amor"] },
      { char: "💞", terms: ["corazones", "revolving", "amor"] },
      { char: "💓", terms: ["corazon", "latido", "beating"] },
      { char: "💗", terms: ["corazon", "creciendo", "growing"] },
      { char: "💖", terms: ["corazon", "brillo", "sparkling"] },
      { char: "💘", terms: ["corazon", "flecha", "cupid"] },
      { char: "💝", terms: ["corazon", "regalo", "gift"] },
      { char: "⭐", terms: ["estrella", "star"] },
      { char: "🌟", terms: ["estrella", "brillo", "glow"] },
      { char: "✨", terms: ["brillo", "sparkles", "magic"] },
      { char: "⚡", terms: ["rayo", "lightning", "energia"] },
      { char: "✅", terms: ["check", "ok", "listo", "done"] },
      { char: "✔️", terms: ["check", "ok", "marcar"] },
      { char: "☑️", terms: ["check", "casilla", "box"] },
      { char: "💯", terms: ["cien", "100", "perfecto"] },
      { char: "ℹ️", terms: ["info", "informacion"] },
      { char: "❓", terms: ["pregunta", "question"] },
      { char: "❗", terms: ["importante", "exclamation"] },
      { char: "➕", terms: ["mas", "plus", "sumar"] },
      { char: "➖", terms: ["menos", "minus"] }
    ]
  },
  {
    id: "travel",
    emojis: [
      { char: "✈️", terms: ["avion", "plane", "vuelo", "flight"] },
      { char: "🛫", terms: ["despegue", "departure", "vuelo"] },
      { char: "🛬", terms: ["aterrizaje", "arrival", "vuelo"] },
      { char: "🧳", terms: ["maleta", "luggage", "equipaje"] },
      { char: "🛄", terms: ["equipaje", "baggage", "reclamar"] },
      { char: "🎫", terms: ["boleto", "ticket", "entrada"] },
      { char: "🗺️", terms: ["mapa", "map", "ruta"] },
      { char: "🌍", terms: ["mundo", "world", "globo", "europa"] },
      { char: "🌎", terms: ["mundo", "americas", "globo"] },
      { char: "🌏", terms: ["mundo", "asia", "globo"] },
      { char: "🏖️", terms: ["playa", "beach", "vacaciones"] },
      { char: "🏝️", terms: ["isla", "island", "vacaciones"] },
      { char: "🌅", terms: ["amanecer", "sunrise", "sol"] },
      { char: "🌄", terms: ["montaña", "sunrise", "amanecer"] },
      { char: "🚗", terms: ["auto", "car", "coche"] },
      { char: "🚕", terms: ["taxi", "cab"] },
      { char: "🚌", terms: ["bus", "autobus"] },
      { char: "🏨", terms: ["hotel", "hospedaje"] },
      { char: "🛩️", terms: ["avion", "small plane"] },
      { char: "🚂", terms: ["tren", "train"] },
      { char: "🚆", terms: ["tren", "tram", "metro"] },
      { char: "🚢", terms: ["barco", "ship", "crucero"] },
      { char: "⛵", terms: ["velero", "sailboat", "barco"] },
      { char: "🗼", terms: ["torre", "tower", "landmark"] },
      { char: "🏛️", terms: ["monumento", "classical", "edificio"] }
    ]
  },
  {
    id: "objects",
    emojis: [
      { char: "📱", terms: ["telefono", "phone", "mobile", "celular"] },
      { char: "💻", terms: ["laptop", "computadora", "computer"] },
      { char: "⌚", terms: ["reloj", "watch", "hora"] },
      { char: "📷", terms: ["camara", "camera", "foto"] },
      { char: "🎁", terms: ["regalo", "gift", "present"] },
      { char: "🎉", terms: ["fiesta", "party", "celebracion"] },
      { char: "🎊", terms: ["confeti", "confetti", "fiesta"] },
      { char: "🎈", terms: ["globo", "balloon", "fiesta"] },
      { char: "📅", terms: ["calendario", "calendar", "fecha"] },
      { char: "📆", terms: ["calendario", "date", "fecha"] },
      { char: "✉️", terms: ["correo", "email", "carta", "mail"] },
      { char: "📧", terms: ["email", "correo"] },
      { char: "📝", terms: ["nota", "memo", "escribir"] },
      { char: "📋", terms: ["clipboard", "lista", "checklist"] },
      { char: "📌", terms: ["pin", "chincheta", "fijar"] },
      { char: "📎", terms: ["clip", "adjunto", "paperclip"] },
      { char: "🔗", terms: ["link", "enlace", "url"] },
      { char: "🔑", terms: ["llave", "key", "acceso"] },
      { char: "💡", terms: ["idea", "bombilla", "light"] },
      { char: "🔔", terms: ["campana", "bell", "notificacion"] },
      { char: "📞", terms: ["telefono", "call", "llamar"] },
      { char: "☎️", terms: ["telefono", "phone"] },
      { char: "🛍️", terms: ["compras", "shopping", "bolsa"] },
      { char: "🧾", terms: ["recibo", "receipt", "factura"] }
    ]
  }
];
function WC(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function KC(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (r) => s || WC(r, n)
    ).map((r) => r.char);
    return {
      id: o.id,
      label: t[o.id],
      emojis: i
    };
  }).filter((o) => o.emojis.length > 0) : e.map((o) => ({
    id: o.id,
    label: t[o.id],
    emojis: o.emojis.map((s) => s.char)
  }));
}
function eM(e) {
  const t = {
    ...Pr,
    ...e
  };
  return Ir.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function UC(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function YC(e, t) {
  return `${e}${t}`;
}
const qC = ["disabled", "aria-expanded", "aria-label"], XC = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, GC = {
  key: 0,
  class: "truncate text-sm"
}, ZC = ["aria-label"], QC = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, JC = ["disabled", "placeholder", "aria-label"], e$ = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, t$ = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, a$ = { class: "grid grid-cols-8 gap-0.5" }, n$ = ["disabled", "aria-label", "onClick"], o$ = { class: "text-[1.35rem] leading-none" }, s$ = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, i$ = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, r$ = /* @__PURE__ */ ce({
  name: "EmojiPicker",
  __name: "EmojiPicker",
  props: {
    draft: { default: "" },
    categories: {},
    categoryLabels: {},
    triggerLabel: {},
    searchPlaceholder: { default: "Search emoji…" },
    emptySearchText: { default: "No emojis match your search." },
    hint: {},
    disabled: { type: Boolean },
    ariaLabel: { default: "Emoji picker" },
    ariaLabelTrigger: {}
  },
  emits: ["update:draft", "select", "open", "close"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-emoji-picker-${He()}`, s = `${o}-btn`, i = `${o}-panel`, r = oe(null), l = oe(null), c = oe(null), d = oe(null), h = oe(!1), m = oe(""), b = oe({}), f = $(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), p = $(() => ({
      ...Pr,
      ...a.categoryLabels
    })), y = $(() => new Set(UC(a.draft))), v = $(() => {
      if (a.categories?.length) {
        const T = m.value.trim().toLowerCase();
        return T ? a.categories.map((j) => ({
          ...j,
          emojis: j.emojis.filter((H) => H.includes(T) || j.label.toLowerCase().includes(T) ? !0 : j.id.toLowerCase().includes(T))
        })).filter((j) => j.emojis.length > 0) : a.categories;
      }
      return KC(
        Ir,
        p.value,
        m.value
      );
    });
    function k() {
      const T = l.value;
      if (!T) return;
      const j = T.getBoundingClientRect(), H = 320, X = 8, ie = 8;
      let ue = j.right - H;
      ue < ie && (ue = j.left), ue + H > window.innerWidth - ie && (ue = Math.max(ie, window.innerWidth - H - ie));
      const q = Math.max(160, j.top - X - ie);
      b.value = {
        bottom: `${window.innerHeight - j.top + X}px`,
        left: `${ue}px`,
        width: `${H}px`,
        maxHeight: `${q}px`
      };
    }
    function w(T) {
      const j = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return y.value.has(T) ? `${j} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : j;
    }
    function _(T) {
      if (a.disabled) return;
      const j = YC(a.draft ?? "", T);
      n("update:draft", j), n("select", T);
    }
    function C() {
      m.value = "", n("open"), We(() => {
        k(), d.value?.focus();
      });
    }
    function M() {
      h.value && (h.value = !1, m.value = "", n("close"), l.value?.focus());
    }
    function S() {
      if (!a.disabled) {
        if (h.value) {
          M();
          return;
        }
        h.value = !0, C();
      }
    }
    function P(T) {
      T.stopPropagation(), S();
    }
    function I(T) {
      if (!h.value) return;
      const j = T.target, H = r.value, X = c.value;
      H && !H.contains(j) && (!X || !X.contains(j)) && M();
    }
    function V(T) {
      a.disabled || ((T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), h.value || (h.value = !0, C())), T.key === "Escape" && h.value && (T.preventDefault(), M()));
    }
    function D(T) {
      T.key === "Escape" && (T.preventDefault(), M());
    }
    function L() {
      h.value && k();
    }
    return Je(() => {
      document.addEventListener("click", I), window.addEventListener("resize", L), window.addEventListener("scroll", L, !0);
    }), st(() => {
      document.removeEventListener("click", I), window.removeEventListener("resize", L), window.removeEventListener("scroll", L, !0);
    }), (T, j) => (g(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: l,
        id: s,
        type: "button",
        disabled: e.disabled,
        class: Q([
          B(ot),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": f.value,
        onClick: P,
        onKeydown: V
      }, [
        u("span", XC, [
          ke(T.$slots, "icon", {}, () => [
            N(B(tp), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (g(), x("span", GC, A(e.triggerLabel), 1)) : F("", !0),
        e.triggerLabel ? (g(), ae(B(ta), {
          key: 1,
          class: Q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : F("", !0)
      ], 42, qC),
      (g(), ae(Zt, { to: "body" }, [
        Qe(u("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: we(b.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: j[2] || (j[2] = ze(() => {
          }, ["stop"])),
          onKeydown: ze(D, ["stop"])
        }, [
          u("div", QC, [
            Qe(u("input", {
              ref_key: "searchInputRef",
              ref: d,
              "onUpdate:modelValue": j[0] || (j[0] = (H) => m.value = H),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: j[1] || (j[1] = ze(() => {
              }, ["stop"]))
            }, null, 8, JC), [
              [Vt, m.value]
            ])
          ]),
          u("div", e$, [
            v.value.length > 0 ? (g(!0), x(le, { key: 0 }, be(v.value, (H) => (g(), x("section", {
              key: H.id
            }, [
              u("h3", t$, A(H.label), 1),
              u("div", a$, [
                (g(!0), x(le, null, be(H.emojis, (X) => (g(), x("button", {
                  key: `${H.id}-${X}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${X} to input`,
                  class: Q(w(X)),
                  onClick: ze((ie) => _(X), ["stop"])
                }, [
                  u("span", o$, A(X), 1)
                ], 10, n$))), 128))
              ])
            ]))), 128)) : (g(), x("p", s$, A(e.emptySearchText), 1))
          ]),
          e.hint ? (g(), x("p", i$, A(e.hint), 1)) : F("", !0)
        ], 44, ZC), [
          [Qt, h.value]
        ])
      ]))
    ], 512));
  }
}), l$ = /* @__PURE__ */ ce({
  name: "LanguageSelect",
  __name: "LanguageSelect",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar idioma…" },
    disabled: { type: Boolean },
    showOptionCheck: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar por nombre…" },
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: "Idioma" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(
      () => a.options.map((i) => ({
        value: i.value,
        label: i.label,
        disabled: i.disabled,
        leadingClass: i.flagClass
      }))
    );
    function s(i) {
      n("update:modelValue", i);
    }
    return (i, r) => (g(), ae(na, {
      "model-value": e.modelValue,
      options: o.value,
      label: e.label,
      "aria-label-trigger": e.ariaLabelTrigger,
      placeholder: e.placeholder,
      disabled: e.disabled,
      "show-option-check": e.showOptionCheck,
      searchable: "",
      "search-placeholder": e.searchPlaceholder,
      "no-results-text": e.noResultsText,
      "list-section-label": e.listSectionLabel,
      "onUpdate:modelValue": s
    }, null, 8, ["model-value", "options", "label", "aria-label-trigger", "placeholder", "disabled", "show-option-check", "search-placeholder", "no-results-text", "list-section-label"]));
  }
}), c$ = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, d$ = { class: "relative" }, u$ = ["placeholder", "aria-label", "disabled"], h$ = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, f$ = ["aria-label"], g$ = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, m$ = ["aria-selected", "onClick", "onMouseenter"], p$ = { class: "min-w-0 flex-1 truncate" }, b$ = /* @__PURE__ */ ce({
  name: "LanguagePicker",
  __name: "LanguagePicker",
  props: {
    modelValue: {},
    options: {},
    disabled: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar por nombre…" },
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: "Idioma" },
    listMaxHeightClass: { default: "max-h-60" }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, i = `${`kiut-language-picker-${He()}`}-listbox`, r = oe(null), l = oe(null), c = oe(""), d = oe(0), h = $(() => n.options.filter((_) => !_.disabled)), m = $(() => {
      const _ = c.value.trim().toLowerCase();
      return _ ? h.value.filter((C) => C.label.toLowerCase().includes(_)) : h.value;
    });
    function b(_) {
      return `${_.value}-${_.label}`;
    }
    function f(_) {
      return n.modelValue === _.value;
    }
    function p(_, C) {
      const M = f(_), S = d.value === C;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        M ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !M && S ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function y() {
      d.value = Math.max(
        0,
        m.value.findIndex((_) => _.value === n.modelValue)
      );
    }
    function v(_) {
      _.disabled || o("update:modelValue", _.value);
    }
    function k(_) {
      const C = m.value;
      if (_.key === "ArrowDown") {
        if (_.preventDefault(), C.length === 0) return;
        d.value = 0, l.value?.focus();
        return;
      }
      if (_.key === "ArrowUp") {
        if (_.preventDefault(), C.length === 0) return;
        d.value = C.length - 1, l.value?.focus();
        return;
      }
      if (_.key === "Enter") {
        _.preventDefault();
        const M = C[d.value];
        M && v(M);
      }
    }
    function w(_) {
      const C = m.value;
      if (C.length !== 0) {
        if (_.key === "ArrowDown") {
          _.preventDefault(), d.value = Math.min(d.value + 1, C.length - 1);
          return;
        }
        if (_.key === "ArrowUp") {
          if (_.preventDefault(), d.value === 0) {
            r.value?.focus();
            return;
          }
          d.value = Math.max(d.value - 1, 0);
          return;
        }
        if (_.key === "Enter") {
          _.preventDefault();
          const M = C[d.value];
          M && v(M);
        }
      }
    }
    return Re(c, () => {
      d.value = 0;
    }), Re(
      () => n.modelValue,
      () => {
        y();
      },
      { immediate: !0 }
    ), t({
      focusSearch: () => r.value?.focus()
    }), (_, C) => (g(), x("div", {
      class: Q(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      u("div", c$, [
        u("div", d$, [
          N(B(pr), {
            class: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--kiut-text-muted)] dark:text-slate-500",
            "aria-hidden": "true"
          }),
          Qe(u("input", {
            ref_key: "searchInputRef",
            ref: r,
            "onUpdate:modelValue": C[0] || (C[0] = (M) => c.value = M),
            type: "search",
            class: Q([B(ot), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: k
          }, null, 42, u$), [
            [Vt, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (g(), x("p", h$, A(e.listSectionLabel), 1)) : F("", !0),
      u("ul", {
        id: i,
        ref_key: "listRef",
        ref: l,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: Q([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: w
      }, [
        m.value.length === 0 ? (g(), x("li", g$, A(e.noResultsText), 1)) : F("", !0),
        (g(!0), x(le, null, be(m.value, (M, S) => (g(), x("li", {
          key: b(M),
          role: "option",
          "aria-selected": f(M),
          class: Q(p(M, S)),
          onClick: (P) => v(M),
          onMouseenter: (P) => d.value = S
        }, [
          M.flagClass ? (g(), x("span", {
            key: 0,
            class: Q([M.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : F("", !0),
          u("span", p$, A(M.label), 1)
        ], 42, m$))), 128))
      ], 42, f$)
    ], 2));
  }
}), v$ = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], y$ = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, x$ = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, k$ = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, _$ = { class: "truncate" }, w$ = ["aria-selected", "onClick", "onMouseenter"], C$ = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, $$ = { class: "min-w-0 flex-1" }, S$ = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-multiselect-${He()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = oe(null), c = oe(null), d = oe(!1), h = oe(0), m = $(() => a.options.filter((V) => !V.disabled)), b = $(() => new Set(a.modelValue ?? [])), f = $(
      () => a.options.filter((V) => b.value.has(V.value))
    ), p = $(() => {
      const V = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", D = f.value.length;
      return D === 0 ? V : `${V}, ${D} seleccionada${D === 1 ? "" : "s"}`;
    });
    function y(V) {
      return `${String(V.value)}-${V.label}`;
    }
    function v(V) {
      return b.value.has(V.value);
    }
    function k(V, D) {
      const L = v(V), T = h.value === D;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && T ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function w(V) {
      const D = [...a.modelValue ?? []], L = D.indexOf(V.value);
      L >= 0 ? D.splice(L, 1) : D.push(V.value), n("update:modelValue", D);
    }
    function _() {
      const V = m.value;
      if (V.length === 0) {
        h.value = 0;
        return;
      }
      const D = b.value, L = V.findIndex((T) => D.has(T.value));
      h.value = L >= 0 ? L : 0;
    }
    function C() {
      a.disabled || (d.value = !d.value);
    }
    function M(V) {
      V.stopPropagation(), !a.disabled && (C(), d.value && (_(), We(() => c.value?.focus())));
    }
    function S(V) {
      if (!d.value) return;
      const D = l.value;
      D && !D.contains(V.target) && (d.value = !1);
    }
    function P(V) {
      a.disabled || (V.key === "ArrowDown" || V.key === "Enter" || V.key === " ") && (V.preventDefault(), d.value || (d.value = !0, _(), We(() => c.value?.focus())));
    }
    function I(V) {
      const D = m.value;
      if (D.length !== 0) {
        if (V.key === "Escape") {
          V.preventDefault(), d.value = !1;
          return;
        }
        if (V.key === "ArrowDown") {
          V.preventDefault(), h.value = Math.min(h.value + 1, D.length - 1);
          return;
        }
        if (V.key === "ArrowUp") {
          V.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (V.key === "Enter" || V.key === " ") {
          V.preventDefault();
          const L = D[h.value];
          L && w(L);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", S);
    }), st(() => {
      document.removeEventListener("click", S);
    }), (V, D) => (g(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: Q(B(rt))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Q([
          B(ot),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onClick: M,
        onKeydown: P
      }, [
        u("div", y$, [
          f.value.length === 0 ? (g(), x("span", x$, A(e.placeholder), 1)) : (g(), x("div", k$, [
            (g(!0), x(le, null, be(f.value, (L) => (g(), x("span", {
              key: y(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", _$, A(L.label), 1)
            ]))), 128))
          ]))
        ]),
        N(B(ta), {
          class: Q(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, v$),
      Qe(u("ul", {
        id: r,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ze(I, ["stop"])
      }, [
        (g(!0), x(le, null, be(m.value, (L, T) => (g(), x("li", {
          key: y(L),
          role: "option",
          "aria-selected": v(L),
          class: Q(k(L, T)),
          onClick: ze((j) => w(L), ["stop"]),
          onMouseenter: (j) => h.value = T
        }, [
          u("span", C$, [
            v(L) ? (g(), ae(B(Ro), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : F("", !0)
          ]),
          u("span", $$, A(L.label), 1)
        ], 42, w$))), 128))
      ], 544), [
        [Qt, d.value]
      ])
    ], 512));
  }
}), M$ = { class: "font-sans" }, D$ = ["for"], A$ = { class: "flex gap-2" }, T$ = { class: "w-[7.5rem] shrink-0" }, B$ = { class: "min-w-0 flex-1" }, L$ = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], R$ = ["id"], P$ = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-phone-${He()}`, s = $(() => a.id ?? `${o}-num`), i = $(() => `${s.value}-err`), r = $({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), l = $({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, d) => (g(), x("div", M$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Q(B(rt))
      }, A(e.label), 11, D$)) : F("", !0),
      u("div", A$, [
        u("div", T$, [
          N(na, {
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", B$, [
          Qe(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Q([B(ot), e.invalid ? B(St) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, L$), [
            [Vt, l.value]
          ])
        ])
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Q(B(Mt)),
        role: "alert"
      }, A(e.errorText), 11, R$)) : F("", !0)
    ]));
  }
}), I$ = ["role", "aria-label"], E$ = { class: "flex flex-wrap gap-2" }, F$ = ["aria-checked", "role", "onClick"], O$ = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, V$ = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, z$ = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, N$ = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = $(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
    function s(l) {
      return a.multiple ? o.value.includes(l.value) : a.modelValue === l.value;
    }
    function i(l) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(l) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function r(l) {
      if (a.multiple) {
        const c = Array.isArray(a.modelValue) ? [...a.modelValue] : [], d = c.indexOf(l.value);
        d >= 0 ? c.splice(d, 1) : c.push(l.value), n("update:modelValue", c);
        return;
      }
      n("update:modelValue", l.value);
    }
    return (l, c) => (g(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", E$, [
        (g(!0), x(le, null, be(e.items, (d) => (g(), x("button", {
          key: d.value,
          type: "button",
          class: Q(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(d)
        }, [
          u("span", O$, [
            s(d) ? (g(), x("span", V$)) : F("", !0)
          ]),
          d.dotColor ? (g(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: we({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          u("span", z$, A(d.label), 1)
        ], 10, F$))), 128))
      ])
    ], 8, I$));
  }
}), j$ = ["aria-label"], H$ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], W$ = { class: "truncate px-3 py-2 text-sm font-medium" }, K$ = /* @__PURE__ */ ce({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${He()}`, s = (p) => `${o}-seg-${p}`, i = oe([]);
    function r(p, y) {
      p instanceof HTMLButtonElement ? i.value[y] = p : i.value[y] = null;
    }
    function l(p) {
      return p.value === a.modelValue;
    }
    function c(p) {
      const y = l(p), v = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return p.disabled ? `${v} cursor-not-allowed opacity-40` : y ? `${v} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${v} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(p) {
      p.disabled || p.value !== a.modelValue && n("update:modelValue", p.value);
    }
    function h(p, y, v) {
      d(p), We(() => i.value[y]?.focus());
    }
    const m = $(
      () => a.items.map((p, y) => p.disabled ? -1 : y).filter((p) => p >= 0)
    );
    function b(p, y) {
      const v = a.items.length;
      if (v === 0) return 0;
      let k = p;
      for (let w = 0; w < v; w++)
        if (k = (k + y + v) % v, !a.items[k]?.disabled) return k;
      return p;
    }
    function f(p, y) {
      if (p.key === "ArrowRight" || p.key === "ArrowDown") {
        p.preventDefault();
        const v = b(y, 1), k = a.items[v];
        k && d(k), We(() => i.value[v]?.focus());
      } else if (p.key === "ArrowLeft" || p.key === "ArrowUp") {
        p.preventDefault();
        const v = b(y, -1), k = a.items[v];
        k && d(k), We(() => i.value[v]?.focus());
      } else if (p.key === "Home") {
        p.preventDefault();
        const v = m.value[0];
        if (v !== void 0) {
          const k = a.items[v];
          k && d(k), We(() => i.value[v]?.focus());
        }
      } else if (p.key === "End") {
        p.preventDefault();
        const v = m.value[m.value.length - 1];
        if (v !== void 0) {
          const k = a.items[v];
          k && d(k), We(() => i.value[v]?.focus());
        }
      }
    }
    return (p, y) => (g(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (g(!0), x(le, null, be(e.items, (v, k) => (g(), x("button", {
        id: s(v.value),
        key: v.value,
        ref_for: !0,
        ref: (w) => r(w, k),
        type: "button",
        role: "tab",
        "aria-selected": l(v),
        "aria-disabled": v.disabled === !0,
        tabindex: l(v) ? 0 : -1,
        class: Q(c(v)),
        onClick: (w) => h(v, k),
        onKeydown: (w) => f(w, k)
      }, [
        u("span", W$, A(v.label), 1)
      ], 42, H$))), 128))
    ], 8, j$));
  }
}), U$ = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, Y$ = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, q$ = {
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
}, X$ = {
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
}, G$ = [
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
function Z$(e = "en") {
  return U$[e];
}
function Er(e = "en") {
  return G$.map((t) => ({ id: t, label: X$[e][t] }));
}
function Q$(e = "en") {
  return "Presets";
}
Er("es");
function tt(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function dt(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function Ke(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Ot(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Za(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function J$(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ke(a);
}
function Ra(e, t) {
  return J$(e, -t);
}
function e4(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Fr(e, t = /* @__PURE__ */ new Date()) {
  const a = Ke(t);
  switch (e) {
    case "today":
      return { start: a, end: a };
    case "yesterday": {
      const n = Ra(a, 1);
      return { start: n, end: n };
    }
    case "last7":
      return { start: Ra(a, 6), end: a };
    case "last14":
      return { start: Ra(a, 13), end: a };
    case "last30":
      return { start: Ra(a, 29), end: a };
    case "last90":
      return { start: Ra(a, 89), end: a };
    case "thisMonth":
      return { start: Ot(a), end: a };
    case "lastMonth": {
      const n = Ot(Za(a, -1));
      return { start: n, end: e4(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function Or(e, t, a) {
  let n = Ke(e.start), o = Ke(e.end);
  if (t) {
    const s = Ke(tt(t));
    Gt(n, s) && (n = s), Gt(o, s) && (o = s);
  }
  if (a) {
    const s = Ke(tt(a));
    Gn(n, s) && (n = s), Gn(o, s) && (o = s);
  }
  return Gn(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function t4(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = Or(Fr(t, a), n, o);
  return dt(s.start) === e.start && dt(s.end) === e.end;
}
function en(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < n ? -1 : a > n ? 1 : 0;
}
function Yt(e, t) {
  return en(e, t) === 0;
}
function Gt(e, t) {
  return en(e, t) < 0;
}
function Gn(e, t) {
  return en(e, t) > 0;
}
function Vr(e, t) {
  return en(e, t) >= 0;
}
function zr(e, t) {
  return en(e, t) <= 0;
}
function Nr(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function An(e, t = "en") {
  return `${Y$[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function qt(e, t = "en") {
  return `${q$[t][e.getMonth()]} ${e.getFullYear()}`;
}
const a4 = ["aria-expanded", "aria-labelledby", "aria-label"], n4 = ["onKeydown"], o4 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, s4 = { class: "mb-4 flex items-center justify-between gap-2" }, i4 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, r4 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, l4 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, c4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, d4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, u4 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, h4 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, f4 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, g4 = ["disabled", "onClick"], m4 = "rounded-lg text-[#61616b]", p4 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", b4 = "opacity-30", v4 = "bg-[#6b35e9] font-medium text-white", y4 = "bg-[#895af6] font-semibold text-white", x4 = /* @__PURE__ */ ce({
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
    const a = e, n = t, s = `${`kiut-drp-${He()}`}-lbl`, i = oe(null), r = oe(null), l = oe(!1), c = oe(null), d = oe(Ot(/* @__PURE__ */ new Date())), h = $(() => !!(a.modelValue.start && a.modelValue.end)), m = $(() => {
      const D = Ot(d.value);
      return [D, Za(D, 1)];
    }), b = $(() => a.ariaLabel ?? a.placeholder), f = $(() => {
      const D = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${D}` : `left-0 right-auto ${D}`;
    }), p = $(
      () => `${qt(m.value[0])} – ${qt(m.value[1])}`
    ), y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], v = $(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = tt(a.modelValue.start), L = tt(a.modelValue.end);
      return `${An(D)} – ${An(L)}`;
    });
    function k(D, L) {
      return D.getMonth() === L.getMonth() && D.getFullYear() === L.getFullYear();
    }
    function w(D) {
      const L = Ke(D);
      if (a.minDate) {
        const T = Ke(tt(a.minDate));
        if (Gt(L, T)) return !0;
      }
      if (a.maxDate) {
        const T = Ke(tt(a.maxDate));
        if (Gt(T, L)) return !0;
      }
      return !1;
    }
    function _(D, L, T) {
      const j = Yt(D, L), H = Yt(D, T);
      if (j && H) return "rounded-lg";
      const X = j || D.getDay() === 0, ie = H || D.getDay() === 6;
      return X && ie ? "rounded-lg" : X ? "rounded-l-lg" : ie ? "rounded-r-lg" : "rounded-none";
    }
    function C(D, L) {
      const T = k(L, D), j = w(L), H = a.modelValue.start ? Ke(tt(a.modelValue.start)) : null, X = a.modelValue.end ? Ke(tt(a.modelValue.end)) : null, ie = Ke(L);
      if (j)
        return m4;
      let ue = p4;
      if (H && X && Vr(ie, H) && zr(ie, X)) {
        const ne = Yt(ie, H), R = Yt(ie, X);
        ue = `${_(ie, H, X)} ${ne || R ? y4 : v4}`;
      }
      return T || (ue = `${ue} ${b4}`), ue;
    }
    function M(D) {
      if (w(D)) return;
      const L = Ke(D);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: dt(L), end: dt(L) });
        return;
      }
      let j = Ke(c.value), H = new Date(L);
      Gt(H, j) && ([j, H] = [H, j]), n("update:modelValue", { start: dt(j), end: dt(H) }), c.value = null, l.value = !1;
    }
    function S(D) {
      d.value = Za(d.value, D);
    }
    function P() {
      l.value = !1;
    }
    function I(D) {
      if (D?.stopPropagation(), !l.value) {
        if (l.value = !0, c.value = null, a.modelValue.start)
          try {
            d.value = Ot(tt(a.modelValue.start));
          } catch {
          }
        We(() => r.value?.focus());
      }
    }
    function V(D) {
      if (!l.value) return;
      const L = i.value;
      L && !L.contains(D.target) && (l.value = !1);
    }
    return Re(l, (D) => {
      D && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", V);
    }), st(() => {
      document.removeEventListener("click", V);
    }), (D, L) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: Q(B(rt))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        type: "button",
        class: Q([
          B(ot),
          "flex w-full items-center gap-2 text-left",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onFocus: I,
        onClick: I
      }, [
        N(B(Lo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(v.value), 3)
      ], 42, a4),
      Qe(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Q([
          f.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Na(ze(P, ["stop"]), ["escape"])
      }, [
        u("div", o4, [
          u("div", s4, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (T) => S(-1))
            }, [
              N(B(gr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", i4, [
              u("span", r4, A(p.value), 1),
              u("div", l4, [
                u("span", c4, A(B(qt)(m.value[0])), 1),
                u("span", d4, A(B(qt)(m.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (T) => S(1))
            }, [
              N(B(mr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", u4, [
            (g(!0), x(le, null, be(m.value, (T) => (g(), x("div", {
              key: `${T.getFullYear()}-${T.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", h4, [
                (g(), x(le, null, be(y, (j) => u("span", { key: j }, A(j), 1)), 64))
              ]),
              u("div", f4, [
                (g(!0), x(le, null, be(B(Nr)(T), (j) => (g(), x("button", {
                  key: B(dt)(j),
                  type: "button",
                  disabled: w(j),
                  class: Q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", C(T, j)]),
                  onClick: (H) => M(j)
                }, A(j.getDate()), 11, g4))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, n4), [
        [Qt, l.value]
      ])
    ], 512));
  }
}), k4 = ["aria-expanded", "aria-labelledby", "aria-label"], _4 = ["aria-label", "onKeydown"], w4 = { class: "flex flex-col sm:flex-row" }, C4 = ["aria-label"], $4 = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, S4 = { class: "flex flex-col gap-0.5" }, M4 = ["onClick"], D4 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, A4 = { class: "mb-4 flex items-center justify-between gap-2" }, T4 = ["aria-label"], B4 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, L4 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, R4 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, P4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, I4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, E4 = ["aria-label"], F4 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, O4 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, V4 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, z4 = ["disabled", "onClick"], N4 = "rounded-lg text-[#61616b]", j4 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", H4 = "opacity-30", W4 = "bg-[#6b35e9] font-medium text-white", K4 = "bg-[#895af6] font-semibold text-white", U4 = /* @__PURE__ */ ce({
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
    const a = e, n = t, s = `${`kiut-dpp-${He()}`}-lbl`, i = oe(null), r = oe(null), l = oe(!1), c = oe(null), d = oe(Ot(/* @__PURE__ */ new Date())), h = $(() => !!(a.modelValue.start && a.modelValue.end)), m = $(() => {
      const ne = Ot(d.value);
      return [ne, Za(ne, 1)];
    }), b = $(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), f = $(() => a.ariaLabel ?? b.value), p = $(() => Er(a.locale)), y = $(() => Q$(a.locale)), v = $(() => Z$(a.locale)), k = $(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), w = $(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), _ = $(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), C = $(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), M = $(() => {
      const ne = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${ne}` : `left-0 right-auto ${ne}`;
    }), S = $(
      () => `${qt(m.value[0], a.locale)} – ${qt(m.value[1], a.locale)}`
    ), P = $(() => {
      if (!a.modelValue.start || !a.modelValue.end) return b.value;
      const ne = tt(a.modelValue.start), R = tt(a.modelValue.end);
      return `${An(ne, a.locale)} – ${An(R, a.locale)}`;
    });
    function I(ne, R) {
      return ne.getMonth() === R.getMonth() && ne.getFullYear() === R.getFullYear();
    }
    function V(ne) {
      const R = Ke(ne);
      if (a.minDate) {
        const K = Ke(tt(a.minDate));
        if (Gt(R, K)) return !0;
      }
      if (a.maxDate) {
        const K = Ke(tt(a.maxDate));
        if (Gt(K, R)) return !0;
      }
      return !1;
    }
    function D(ne, R, K) {
      const U = Yt(ne, R), Y = Yt(ne, K);
      if (U && Y) return "rounded-lg";
      const de = U || ne.getDay() === 0, ge = Y || ne.getDay() === 6;
      return de && ge ? "rounded-lg" : de ? "rounded-l-lg" : ge ? "rounded-r-lg" : "rounded-none";
    }
    function L(ne) {
      const R = t4(
        a.modelValue,
        ne,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), K = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return R ? `${K} font-medium` : K;
    }
    function T(ne, R) {
      const K = I(R, ne), U = V(R), Y = a.modelValue.start ? Ke(tt(a.modelValue.start)) : null, de = a.modelValue.end ? Ke(tt(a.modelValue.end)) : null, ge = Ke(R);
      if (U)
        return N4;
      let te = j4;
      if (Y && de && Vr(ge, Y) && zr(ge, de)) {
        const Z = Yt(ge, Y), re = Yt(ge, de);
        te = `${D(ge, Y, de)} ${Z || re ? K4 : W4}`;
      }
      return K || (te = `${te} ${H4}`), te;
    }
    function j(ne) {
      const R = Or(Fr(ne), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: dt(R.start),
        end: dt(R.end)
      }), d.value = Ot(R.start), c.value = null, l.value = !1;
    }
    function H(ne) {
      if (V(ne)) return;
      const R = Ke(ne);
      if (!c.value) {
        c.value = new Date(R), n("update:modelValue", { start: dt(R), end: dt(R) });
        return;
      }
      let U = Ke(c.value), Y = new Date(R);
      Gt(Y, U) && ([U, Y] = [Y, U]), n("update:modelValue", { start: dt(U), end: dt(Y) }), c.value = null, l.value = !1;
    }
    function X(ne) {
      d.value = Za(d.value, ne);
    }
    function ie() {
      l.value = !1;
    }
    function ue(ne) {
      if (ne.stopPropagation(), l.value) {
        l.value = !1;
        return;
      }
      if (l.value = !0, c.value = null, a.modelValue.start)
        try {
          d.value = Ot(tt(a.modelValue.start));
        } catch {
        }
      We(() => r.value?.focus());
    }
    function q(ne) {
      if (!l.value) return;
      const R = i.value;
      R && !R.contains(ne.target) && (l.value = !1);
    }
    return Re(l, (ne) => {
      ne && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", q);
    }), st(() => {
      document.removeEventListener("click", q);
    }), (ne, R) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: Q(B(rt))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        type: "button",
        class: Q([
          B(ot),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: ue
      }, [
        N(B(Lo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(P.value), 3)
      ], 10, k4),
      Qe(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": C.value,
        class: Q([
          M.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Na(ze(ie, ["stop"]), ["escape"])
      }, [
        u("div", w4, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": k.value
          }, [
            u("p", $4, A(y.value), 1),
            u("ul", S4, [
              (g(!0), x(le, null, be(p.value, (K) => (g(), x("li", {
                key: K.id
              }, [
                u("button", {
                  type: "button",
                  class: Q(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(K.id)]),
                  onClick: (U) => j(K.id)
                }, A(K.label), 11, M4)
              ]))), 128))
            ])
          ], 8, C4),
          u("div", D4, [
            u("div", A4, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: R[0] || (R[0] = (K) => X(-1))
              }, [
                N(B(gr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, T4),
              u("div", B4, [
                u("span", L4, A(S.value), 1),
                u("div", R4, [
                  u("span", P4, A(B(qt)(m.value[0], e.locale)), 1),
                  u("span", I4, A(B(qt)(m.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: R[1] || (R[1] = (K) => X(1))
              }, [
                N(B(mr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, E4)
            ]),
            u("div", F4, [
              (g(!0), x(le, null, be(m.value, (K) => (g(), x("div", {
                key: `${K.getFullYear()}-${K.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", O4, [
                  (g(!0), x(le, null, be(v.value, (U) => (g(), x("span", { key: U }, A(U), 1))), 128))
                ]),
                u("div", V4, [
                  (g(!0), x(le, null, be(B(Nr)(K), (U) => (g(), x("button", {
                    key: B(dt)(U),
                    type: "button",
                    disabled: V(U),
                    class: Q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", T(K, U)]),
                    onClick: (Y) => H(U)
                  }, A(U.getDate()), 11, z4))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, _4), [
        [Qt, l.value]
      ])
    ], 512));
  }
}), Y4 = { class: "kiut-translation-count-badge__content" }, q4 = { class: "kiut-translation-count-badge__title" }, X4 = { class: "kiut-translation-count-badge__pills" }, G4 = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, yn = 8, xa = 12, Z4 = /* @__PURE__ */ ce({
  name: "TranslationCountBadge",
  __name: "TranslationCountBadge",
  props: {
    label: {},
    tooltipTitle: {},
    items: {},
    variant: {},
    pulse: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = oe(!1), n = oe("top"), o = oe({
      top: "0px",
      left: "0px"
    }), s = oe(null), i = oe(null), r = $(() => {
      const b = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${b} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${b} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${b} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), l = $(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function d() {
      const b = s.value, f = i.value;
      if (!b || !f) return;
      const p = b.getBoundingClientRect(), y = f.getBoundingClientRect(), v = p.top - xa, k = window.innerHeight - p.bottom - xa, w = v >= y.height + yn, _ = k >= y.height + yn;
      let C = "top";
      w ? C = "top" : _ ? C = "bottom" : C = k >= v ? "bottom" : "top", n.value = C;
      let M = C === "top" ? p.top - y.height - yn : p.bottom + yn;
      M = Math.max(
        xa,
        Math.min(M, window.innerHeight - y.height - xa)
      );
      let S = p.left + p.width / 2 - y.width / 2;
      S = Math.max(
        xa,
        Math.min(S, window.innerWidth - y.width - xa)
      ), o.value = {
        top: `${M}px`,
        left: `${S}px`
      };
    }
    async function h() {
      if (!t.items.length) return;
      a.value = !0, await We();
      const b = i.value;
      b && (b.style.visibility = "hidden", d(), b.style.visibility = "visible");
    }
    function m() {
      a.value && c();
    }
    return window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), st(() => {
      window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    }), (b, f) => (g(), x(le, null, [
      u("span", {
        ref_key: "triggerRef",
        ref: s,
        class: Q([r.value, e.pulse && "animate-pulse"]),
        onMouseenter: h,
        onMouseleave: c,
        onFocus: h,
        onBlur: c
      }, A(e.label), 35),
      (g(), ae(Zt, { to: "body" }, [
        a.value && e.items.length ? (g(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: i,
          role: "tooltip",
          class: Q(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: we({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: h,
          onMouseleave: c
        }, [
          u("div", Y4, [
            u("span", q4, A(e.tooltipTitle), 1),
            u("div", X4, [
              (g(!0), x(le, null, be(e.items, (p) => (g(), x("span", {
                key: p.id,
                class: Q(l.value)
              }, [
                Ae(A(p.label) + " ", 1),
                p.note ? (g(), x("span", G4, " (" + A(p.note) + ") ", 1)) : F("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : F("", !0)
      ]))
    ], 64));
  }
}), Q4 = ["disabled", "aria-expanded", "aria-label"], J4 = { class: "min-w-0 flex-1 truncate" }, eS = ["aria-selected", "onClick", "onMouseenter"], tS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, aS = { class: "min-w-0 flex-1" }, nS = /* @__PURE__ */ ce({
  name: "TagSelect",
  __name: "TagSelect",
  props: {
    modelValue: {},
    options: {},
    disabled: { type: Boolean, default: !1 },
    outlined: { type: Boolean, default: !0 },
    ariaLabel: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, s = `${`kiut-tag-select-${He()}`}-listbox`, i = oe(null), r = oe(null), l = oe(null), c = oe(null), d = oe(!1), h = oe(0), m = oe({}), b = $(() => a.options.filter((X) => !X.disabled)), f = $(
      () => a.options.find((X) => X.value === a.modelValue) ?? null
    ), p = $(() => f.value?.color ?? "neutral"), y = $(
      () => vr(p.value, a.outlined)
    ), v = $(() => f.value ? f.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : b.value[0]?.label ?? "Seleccionar…"), k = $(
      () => a.ariaLabel ?? `Estado: ${v.value}`
    );
    function w() {
      const X = r.value;
      if (!X) return;
      const ie = X.getBoundingClientRect();
      m.value = {
        top: `${ie.bottom + 4}px`,
        left: `${ie.left}px`,
        minWidth: `${ie.width}px`
      };
    }
    function _(X) {
      return `${String(X.value)}-${X.label}`;
    }
    function C(X) {
      return a.modelValue === X.value;
    }
    function M(X, ie) {
      const ue = C(X), q = h.value === ie;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && q ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S() {
      h.value = Math.max(
        0,
        b.value.findIndex((X) => X.value === a.modelValue)
      );
    }
    function P() {
      w(), S(), We(() => c.value?.focus());
    }
    function I() {
      d.value = !1;
    }
    function V(X) {
      n("update:modelValue", X.value), I();
    }
    function D() {
      if (!a.disabled) {
        if (d.value) {
          I();
          return;
        }
        d.value = !0, P();
      }
    }
    function L(X) {
      X.stopPropagation(), !a.disabled && D();
    }
    function T(X) {
      if (!d.value) return;
      const ie = X.target, ue = i.value, q = l.value;
      ue && !ue.contains(ie) && (!q || !q.contains(ie)) && I();
    }
    function j(X) {
      a.disabled || (X.key === "ArrowDown" || X.key === "Enter" || X.key === " ") && (X.preventDefault(), d.value || (d.value = !0, P()));
    }
    function H(X) {
      const ie = b.value;
      if (X.key === "Escape") {
        X.preventDefault(), I(), r.value?.focus();
        return;
      }
      if (ie.length !== 0) {
        if (X.key === "ArrowDown") {
          X.preventDefault(), h.value = Math.min(h.value + 1, ie.length - 1);
          return;
        }
        if (X.key === "ArrowUp") {
          X.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (X.key === "Enter") {
          X.preventDefault();
          const ue = ie[h.value];
          ue && V(ue);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", T);
    }), st(() => {
      document.removeEventListener("click", T);
    }), (X, ie) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: r,
        type: "button",
        disabled: e.disabled,
        class: Q([
          B(br),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          y.value,
          d.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": k.value,
        onClick: L,
        onKeydown: j
      }, [
        u("span", J4, A(v.value), 1),
        N(B(ta), {
          class: Q(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Q4),
      (g(), ae(Zt, { to: "body" }, [
        Qe(u("div", {
          ref_key: "panelRef",
          ref: l,
          style: we(m.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          u("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: ze(H, ["stop"])
          }, [
            (g(!0), x(le, null, be(b.value, (ue, q) => (g(), x("li", {
              key: _(ue),
              role: "option",
              "aria-selected": C(ue),
              class: Q(M(ue, q)),
              onClick: ze((ne) => V(ue), ["stop"]),
              onMouseenter: (ne) => h.value = q
            }, [
              u("span", tS, [
                C(ue) ? (g(), ae(B(Ro), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ]),
              u("span", aS, A(ue.label), 1)
            ], 42, eS))), 128))
          ], 544)
        ], 4), [
          [Qt, d.value]
        ])
      ]))
    ], 512));
  }
}), oS = ["aria-label"], sS = { class: "flex flex-col gap-1" }, iS = { class: "flex flex-row gap-3 items-center" }, rS = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, lS = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, cS = /* @__PURE__ */ ce({
  __name: "Banner",
  props: {
    id: { default: "banner-warning" },
    title: { default: "Mantenimiento programado de plataforma" },
    description: { default: "El servicio completo estará fuera de línea durante la ventana de mantenimiento. No se procesarán conversaciones ni notificaciones." },
    date_start: {},
    date_final: {},
    subtitle_date_start: {},
    subtitle_date_final: {},
    variant: { default: "warning" }
  },
  setup(e) {
    const t = Qa(), a = e, n = {
      warning: Aw,
      info: Tw,
      success: Dw,
      feature: Lw,
      danger: Rw
    }, o = {
      warning: {
        container: "bg-orange-50 border-orange-300 dark:bg-stone-800 dark:border-yellow-800",
        title: "text-orange-400",
        description: "text-stone-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-orange-400",
        container_icon: "bg-orange-200/50 dark:bg-orange-300/20",
        icon_date: "text-stone-400"
      },
      info: {
        container: "bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
        title: "text-blue-700 dark:text-blue-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-blue-500 dark:text-blue-400",
        container_icon: "bg-blue-200/50 dark:bg-blue-300/20",
        icon_date: "text-slate-400"
      },
      success: {
        container: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800",
        title: "text-emerald-700 dark:text-emerald-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-emerald-500 dark:text-emerald-400",
        container_icon: "bg-emerald-200/50 dark:bg-emerald-300/20",
        icon_date: "text-slate-400"
      },
      feature: {
        container: "bg-violet-50 border-violet-200 dark:bg-violet-950/40 dark:border-violet-800",
        title: "text-violet-700 dark:text-violet-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-violet-500 dark:text-violet-400",
        container_icon: "bg-violet-200/50 dark:bg-violet-300/20",
        icon_date: "text-slate-400"
      },
      danger: {
        container: "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800",
        title: "text-red-700 dark:text-red-300",
        description: "text-slate-700 dark:text-zinc-300",
        subtitle_date: "text-black dark:text-gray-300",
        date: "text-gray-500 dark:text-gray-400",
        icon: "text-red-500 dark:text-red-400",
        container_icon: "bg-red-200/50 dark:bg-red-300/20",
        icon_date: "text-slate-400"
      }
    }, s = $(() => o[a.variant]), i = $(() => n[a.variant]);
    return (r, l) => (g(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: Q([
        s.value.container,
        B(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      u("div", {
        class: Q([
          s.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        u("span", {
          class: Q([
            s.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          ke(r.$slots, "icon", {}, () => [
            (g(), ae(bt(i.value)))
          ])
        ], 2)
      ], 2),
      u("div", sS, [
        u("h1", {
          class: Q([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        u("span", {
          class: Q([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        u("div", iS, [
          a.date_start ? (g(), x("div", rS, [
            u("span", {
              class: Q([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(r.$slots, "icon_date", {}, () => [
                N(B(fi))
              ])
            ], 2),
            a.subtitle_date_start ? (g(), x("span", {
              key: 0,
              class: Q([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : F("", !0),
            u("span", {
              class: Q([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : F("", !0),
          a.date_final ? (g(), x("div", lS, [
            u("span", {
              class: Q([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(r.$slots, "icon_date", {}, () => [
                N(B(fi))
              ])
            ], 2),
            a.subtitle_date_final ? (g(), x("span", {
              key: 0,
              class: Q([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : F("", !0),
            u("span", {
              class: Q([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : F("", !0)
        ])
      ])
    ], 10, oS));
  }
}), dS = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, uS = ["id"], hS = { class: "min-w-0 flex-1 space-y-1" }, fS = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, gS = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, mS = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, pS = /* @__PURE__ */ ce({
  name: "Modal",
  inheritAttrs: !1,
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    subtitle: {},
    cancelLabel: { default: "Cancelar" },
    confirmLabel: { default: "Guardar" },
    id: {},
    width: { default: 512 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, n = $(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${He()}`}-title`, r = oe(null);
    function l() {
      a.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function d(h) {
      if (a.modelValue && h.key === "Escape") {
        if (a.loading) return;
        h.preventDefault(), l();
      }
    }
    return Re(
      () => a.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          r.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", d);
    }), st(() => {
      document.removeEventListener("keydown", d);
    }), (h, m) => (g(), ae(Zt, { to: "body" }, [
      N(gt, { name: "kiut-modal" }, {
        default: E(() => [
          e.modelValue ? (g(), x("div", dS, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: l
            }),
            u("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: r,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: we(n.value),
              onClick: m[0] || (m[0] = ze(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: Q(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", hS, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (g(), x("p", fS, A(e.subtitle), 1)) : F("", !0)
                ]),
                N(wt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: l
                }, {
                  icon: E(() => [
                    N(B(ro), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", gS, [
                ke(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", mS, [
                N(wt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: l
                }, {
                  default: E(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                N(wt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: E(() => [
                    Ae(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 12, uS)
          ])) : F("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), bS = /* @__PURE__ */ ve(pS, [["__scopeId", "data-v-9134bb89"]]), vS = { class: "text-left font-['Inter',system-ui,sans-serif]" }, yS = {
  key: 0,
  class: ""
}, xS = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, kS = { class: "flex min-w-0 flex-1 items-center" }, _S = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, wS = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, CS = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, $S = /* @__PURE__ */ ce({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = co(), a = $(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (g(), x("section", vS, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (g(), x("header", yS, [
        n.$slots.description ? (g(), x("div", xS, [
          ke(n.$slots, "description")
        ])) : F("", !0),
        n.$slots.tabs ? (g(), x("div", {
          key: 1,
          class: Q(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", kS, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (g(), x("div", _S, [
            ke(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (g(), x("div", {
          key: 2,
          class: Q([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (g(), x("div", wS, [
            ke(n.$slots, "filters")
          ])) : F("", !0),
          n.$slots.actions ? (g(), x("div", CS, [
            ke(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0)
      ])) : F("", !0),
      n.$slots.content || n.$slots.default ? (g(), x("div", {
        key: 1,
        class: Q({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : F("", !0)
    ]));
  }
}), SS = { class: "flex flex-1 min-h-0" }, MS = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, DS = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, AS = ["aria-current", "data-has-active", "title", "onClick"], TS = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, BS = { class: "px-4 py-4 shrink-0" }, LS = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, RS = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, PS = ["data-nav-id", "aria-current", "onClick"], IS = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, ES = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, FS = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, OS = ["data-nav-id", "aria-current", "onClick"], VS = { class: "truncate text-[15px]" }, zS = ["aria-current", "data-has-active", "onClick"], NS = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, jS = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, HS = /* @__PURE__ */ ce({
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
    const a = oe(!1), n = e, o = t, s = Qa(), { class: i, ...r } = s, l = oe(!1);
    function c() {
      typeof window > "u" || (l.value = window.innerWidth < n.mobileBreakpoint);
    }
    Je(() => {
      c(), window.addEventListener("resize", c);
    }), st(() => {
      window.removeEventListener("resize", c);
    });
    const d = $(() => {
      const v = n.sections.find((k) => k.id === n.selectedSectionId);
      return v?.items?.length ? v : null;
    });
    function h(v) {
      return n.activePath ? n.activePath === v.path || n.activePath.startsWith(v.path + "/") : !1;
    }
    function m(v) {
      return v.items?.length ? v.items.some(h) : !n.activePath || !v.path ? !1 : n.activePath === v.path || n.activePath.startsWith(v.path + "/");
    }
    function b(v) {
      if (!v.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: v,
          item: { id: v.id, label: v.label, path: v.path }
        });
        return;
      }
      const k = n.selectedSectionId === v.id ? null : v.id;
      o("update:selectedSectionId", k);
    }
    function f(v, k) {
      o("navigate", { section: v, item: k });
    }
    function p() {
      o("update:selectedSectionId", null);
    }
    function y(v, k) {
      f(v, k), p();
    }
    return (v, k) => l.value ? (g(), x("div", vt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      N(gt, { name: "ksn-overlay" }, {
        default: E(() => [
          d.value ? (g(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: p
          })) : F("", !0)
        ]),
        _: 1
      }),
      N(gt, { name: "ksn-sheet" }, {
        default: E(() => [
          d.value ? (g(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: we({ paddingBottom: n.mobileBarHeight })
          }, [
            k[3] || (k[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", IS, [
              u("p", ES, A(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: p
              }, [...k[2] || (k[2] = [
                u("svg", {
                  class: "w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round"
                }, [
                  u("path", { d: "M18 6L6 18M6 6l12 12" })
                ], -1)
              ])])
            ]),
            u("nav", FS, [
              (g(!0), x(le, null, be(d.value.items, (w) => (g(), x("button", {
                key: w.id,
                type: "button",
                "data-nav-id": w.id,
                "aria-current": h(w) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (_) => y(d.value, w)
              }, [
                w.icon ? (g(), ae(bt(w.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : F("", !0),
                u("span", VS, A(w.label), 1)
              ], 8, OS))), 128))
            ])
          ], 4)) : F("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: we({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (g(!0), x(le, null, be(e.sections, (w) => (g(), x("button", {
          key: w.id,
          type: "button",
          "aria-current": e.selectedSectionId === w.id ? "true" : void 0,
          "data-has-active": m(w) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (_) => b(w)
        }, [
          e.selectedSectionId === w.id || m(w) ? (g(), x("span", NS)) : F("", !0),
          w.icon ? (g(), ae(bt(w.icon), {
            key: 1,
            class: "shrink-0",
            style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : F("", !0),
          u("span", jS, A(w.label), 1)
        ], 8, zS))), 128))
      ], 4)
    ], 16)) : (g(), x("aside", vt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      u("div", SS, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: we({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: k[0] || (k[0] = (w) => a.value = !0),
          onMouseleave: k[1] || (k[1] = (w) => a.value = !1)
        }, [
          v.$slots.logo ? (g(), x("div", MS, [
            ke(v.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : F("", !0),
          u("nav", DS, [
            (g(!0), x(le, null, be(e.sections, (w) => (g(), x("button", {
              key: w.id,
              type: "button",
              "aria-current": e.selectedSectionId === w.id ? "true" : void 0,
              "data-has-active": m(w) ? "true" : void 0,
              title: w.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (_) => b(w)
            }, [
              w.icon ? (g(), ae(bt(w.icon), {
                key: 0,
                class: "shrink-0",
                style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : F("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: we({ fontSize: e.primaryFontSize })
              }, A(w.label), 5)
            ], 8, AS))), 128))
          ]),
          v.$slots.footer ? (g(), x("div", TS, [
            ke(v.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : F("", !0)
        ], 36),
        N(gt, { name: "ksn-sub" }, {
          default: E(() => [
            d.value ? (g(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: we({ width: e.secondaryWidth })
            }, [
              u("div", BS, [
                u("p", LS, A(d.value.label), 1)
              ]),
              u("nav", RS, [
                (g(!0), x(le, null, be(d.value.items, (w) => (g(), x("button", {
                  key: w.id,
                  type: "button",
                  "data-nav-id": w.id,
                  "aria-current": h(w) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (_) => f(d.value, w)
                }, [
                  w.icon ? (g(), ae(bt(w.icon), {
                    key: 0,
                    style: we({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : F("", !0),
                  u("span", {
                    class: "truncate",
                    style: we({ fontSize: e.secondaryFontSize })
                  }, A(w.label), 5)
                ], 8, PS))), 128))
              ])
            ], 4)) : F("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), WS = /* @__PURE__ */ ve(HS, [["__scopeId", "data-v-e0ccb96c"]]), tM = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", mt), e.component("KiutPieChart", Pn), e.component("KiutBoxplotChart", Ff), e.component("KiutCandlestickChart", Cg), e.component("KiutHistogramChart", hr), e.component("KiutSankeyChart", aa), e.component("KiutAgentsPerDay", _p), e.component("KiutBookingManager", t0), e.component("KiutCheckin", p0), e.component("KiutCheckinContainer", K0), e.component("KiutCheckinMetrics", yr), e.component("KiutCheckinSegments", xr), e.component("KiutDisruption", cb), e.component("KiutFAQ", bb), e.component("KiutMessagesPerAgent", kr), e.component("KiutRecordLocator", sv), e.component("KiutSalesByChannel", _r), e.component("KiutSeller", wr), e.component("KiutSellerContainer", Hv), e.component("KiutTopAgents", Gv), e.component("KiutPaymentMethod", by), e.component("KiutAgentHumanConversations", qy), e.component("KiutChannelMetrics", Cr), e.component("KiutConversationVolume", r1), e.component("KiutTriageCombinations", k1), e.component("KiutSelectLanguage", M1), e.component("KiutGuardrails", F1), e.component("KiutDisruptionNotifier", nx), e.component("KiutTotalConversationsCard", ox), e.component("KiutCsatP95Card", sx), e.component("KiutCsatPulseCard", ix), e.component("KiutCSATContainer", Px), e.component("KiutAiGeneratedRevenueCard", Ix), e.component("KiutAiGeneratedChart", Wx), e.component("KiutCostCard", Ux), e.component("KiutHumanEscalations", ek), e.component("KiutHumanEscalationsCard", tk), e.component("KiutAvgResolutionTime", fk), e.component("KiutAvgResolutionTimeCard", yk), e.component("KiutCheckinCR", xk), e.component("KiutSellerCR", kk), e.component("KiutBookingManagerCR", _k), e.component("KiutNpsDailyMetrics", Sr), e.component("KiutNpsMetrics", Mr), e.component("KiutNpsOverviewMetrics", $r), e.component("KiutAWSCost", Tk), e.component("KiutCostUsage", zk), e.component("KiutTokenUsage", Gk), e.component("KiutConversationCount", i_), e.component("KiutTopAgentsAnalysis", v_), e.component("KiutTopAgentsPie", M_), e.component("KiutDailyCostTrends", E_), e.component("KiutModelUsage", G_), e.component("KiutMessageRoles", s2), e.component("KiutCostPerConversations", b2), e.component("Tabs", Dr), e.component("Table", P2), e.component("TableVersions", Mw), e.component("Filters", u5), e.component("InputText", Rr), e.component("InputPassword", $5), e.component("InputTextarea", T5), e.component("InputFile", G5), e.component("ImageUploadCircle", nC), e.component("InputDateTime", cC), e.component("InputTime", mC), e.component("InputRange", AC), e.component("InputNumber", PC), e.component("InputColorPicker", HC), e.component("EmojiPicker", r$), e.component("Select", na), e.component("LanguageSelect", l$), e.component("LanguagePicker", b$), e.component("MultiSelect", S$), e.component("Toggle", Lr), e.component("InputPhone", P$), e.component("SelectablePills", N$), e.component("SegmentedControl", K$), e.component("DateRangePicker", x4), e.component("DatePickerPresets", U4), e.component("Tag", Xe), e.component("TagSelect", nS), e.component("TranslationCountBadge", Z4), e.component("Button", wt), e.component("Banner", cS), e.component("Modal", bS), e.component("Section", $S), e.component("KiutAppShellNavigation", WS);
  }
};
export {
  Tk as AWSCost,
  qy as AgentHumanConversations,
  _p as AgentsPerDay,
  Wx as AiGeneratedChart,
  Ix as AiGeneratedRevenueCard,
  WS as AppShellNavigation,
  fk as AvgResolutionTime,
  yk as AvgResolutionTimeCard,
  cS as Banner,
  t0 as BookingManager,
  _k as BookingManagerCR,
  Ff as BoxplotChart,
  wt as Button,
  Px as CSATContainer,
  Cg as CandlestickChart,
  Cr as ChannelMetrics,
  $t as ChartBar,
  mt as ChartLine,
  p0 as Checkin,
  xk as CheckinCR,
  K0 as CheckinContainer,
  yr as CheckinMetrics,
  xr as CheckinSegments,
  i_ as ConversationCount,
  r1 as ConversationVolume,
  Ux as CostCard,
  b2 as CostPerConversations,
  zk as CostUsage,
  sx as CsatP95Card,
  ix as CsatPulseCard,
  Pr as DEFAULT_CATEGORY_LABELS,
  Ir as DEFAULT_EMOJI_CATALOG,
  iw as DEFAULT_TABLE_VERSIONS_LABELS,
  E_ as DailyCostTrends,
  U4 as DatePickerPresets,
  x4 as DateRangePicker,
  cb as Disruption,
  nx as DisruptionNotifier,
  rw as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  r$ as EmojiPicker,
  bb as FAQ,
  u5 as Filters,
  F1 as Guardrails,
  hr as HistogramChart,
  ek as HumanEscalations,
  tk as HumanEscalationsCard,
  nC as ImageUploadCircle,
  HC as InputColorPicker,
  cC as InputDateTime,
  G5 as InputFile,
  PC as InputNumber,
  $5 as InputPassword,
  P$ as InputPhone,
  AC as InputRange,
  Rr as InputText,
  T5 as InputTextarea,
  mC as InputTime,
  tM as KiutUIPlugin,
  b$ as LanguagePicker,
  l$ as LanguageSelect,
  s2 as MessageRoles,
  kr as MessagesPerAgent,
  bS as Modal,
  G_ as ModelUsage,
  S$ as MultiSelect,
  Sr as NpsDailyMetrics,
  Mr as NpsMetrics,
  $r as NpsOverviewMetrics,
  by as PaymentMethod,
  Pn as PieChart,
  JS as RESOURCE_TABLE_VERSIONS_COLUMNS,
  sv as RecordLocator,
  _r as SalesByChannel,
  aa as SankeyChart,
  $S as Section,
  K$ as SegmentedControl,
  na as Select,
  M1 as SelectLanguage,
  N$ as SelectablePills,
  wr as Seller,
  kk as SellerCR,
  Hv as SellerContainer,
  P2 as Table,
  Mw as TableVersions,
  Dr as Tabs,
  Xe as Tag,
  nS as TagSelect,
  Lr as Toggle,
  Gk as TokenUsage,
  Gv as TopAgents,
  v_ as TopAgentsAnalysis,
  M_ as TopAgentsPie,
  ox as TotalConversationsCard,
  Z4 as TranslationCountBadge,
  k1 as TriageCombinations,
  YC as appendEmojiToDraft,
  eM as buildDefaultCategories,
  UC as extractEmojis,
  KC as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
