import { defineComponent as fe, shallowRef as xi, h as He, ref as oe, onMounted as Je, onUnmounted as lt, watch as Te, toRaw as Jn, nextTick as Ke, version as Ul, isProxy as ki, computed as C, toRef as $e, openBlock as f, createElementBlock as x, normalizeStyle as Ce, createVNode as N, unref as B, createElementVNode as d, Fragment as he, renderList as pe, normalizeClass as Z, toDisplayString as A, createCommentVNode as O, onBeforeUnmount as _i, createStaticVNode as eo, useSlots as ho, renderSlot as ke, Transition as gt, withCtx as F, Comment as Yl, createBlock as ne, resolveDynamicComponent as ft, createTextVNode as Ae, Teleport as Jt, withDirectives as Xe, withModifiers as Be, vModelText as Rt, vShow as Ht, createSlots as Vo, vModelSelect as ql, mergeProps as yt, useAttrs as Ja, withKeys as Ca, inject as wi } from "vue";
import * as zo from "echarts/core";
import { TooltipComponent as Xl, TitleComponent as Gl } from "echarts/components";
import { SankeyChart as Zl } from "echarts/charts";
import { CanvasRenderer as Ql } from "echarts/renderers";
import ze from "moment";
function en(e) {
  return e + 0.5 | 0;
}
const qt = (e, t, a) => Math.max(Math.min(e, a), t);
function Fa(e) {
  return qt(en(e * 2.55), 0, 255);
}
function Qt(e) {
  return qt(en(e * 255), 0, 255);
}
function Vt(e) {
  return qt(en(e / 2.55) / 100, 0, 1);
}
function No(e) {
  return qt(en(e * 100), 0, 100);
}
const vt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, to = [..."0123456789ABCDEF"], Jl = (e) => to[e & 15], er = (e) => to[(e & 240) >> 4] + to[e & 15], on = (e) => (e & 240) >> 4 === (e & 15), tr = (e) => on(e.r) && on(e.g) && on(e.b) && on(e.a);
function ar(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & vt[e[1]] * 17,
    g: 255 & vt[e[2]] * 17,
    b: 255 & vt[e[3]] * 17,
    a: t === 5 ? vt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: vt[e[1]] << 4 | vt[e[2]],
    g: vt[e[3]] << 4 | vt[e[4]],
    b: vt[e[5]] << 4 | vt[e[6]],
    a: t === 9 ? vt[e[7]] << 4 | vt[e[8]] : 255
  })), a;
}
const nr = (e, t) => e < 255 ? t(e) : "";
function or(e) {
  var t = tr(e) ? Jl : er;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + nr(e.a, t) : void 0;
}
const sr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ci(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function ir(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function lr(e, t, a) {
  const n = Ci(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function rr(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function fo(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), l = (s + i) / 2;
  let r, c, u;
  return s !== i && (u = s - i, c = l > 0.5 ? u / (2 - s - i) : u / (s + i), r = rr(a, n, o, u, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function go(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(Qt);
}
function mo(e, t, a) {
  return go(Ci, e, t, a);
}
function cr(e, t, a) {
  return go(lr, e, t, a);
}
function dr(e, t, a) {
  return go(ir, e, t, a);
}
function $i(e) {
  return (e % 360 + 360) % 360;
}
function ur(e) {
  const t = sr.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Fa(+t[5]) : Qt(+t[5]));
  const o = $i(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = cr(o, s, i) : t[1] === "hsv" ? n = dr(o, s, i) : n = mo(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function hr(e, t) {
  var a = fo(e);
  a[0] = $i(a[0] + t), a = mo(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function fr(e) {
  if (!e)
    return;
  const t = fo(e), a = t[0], n = No(t[1]), o = No(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Vt(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const jo = {
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
}, Ho = {
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
function gr() {
  const e = {}, t = Object.keys(Ho), a = Object.keys(jo);
  let n, o, s, i, l;
  for (n = 0; n < t.length; n++) {
    for (i = l = t[n], o = 0; o < a.length; o++)
      s = a[o], l = l.replace(s, jo[s]);
    s = parseInt(Ho[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let sn;
function mr(e) {
  sn || (sn = gr(), sn.transparent = [0, 0, 0, 0]);
  const t = sn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const pr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function br(e) {
  const t = pr.exec(e);
  let a = 255, n, o, s;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? Fa(i) : qt(i * 255, 0, 255);
    }
    return n = +t[1], o = +t[3], s = +t[5], n = 255 & (t[2] ? Fa(n) : qt(n, 0, 255)), o = 255 & (t[4] ? Fa(o) : qt(o, 0, 255)), s = 255 & (t[6] ? Fa(s) : qt(s, 0, 255)), {
      r: n,
      g: o,
      b: s,
      a
    };
  }
}
function vr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Vt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Vn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ba = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function yr(e, t, a) {
  const n = ba(Vt(e.r)), o = ba(Vt(e.g)), s = ba(Vt(e.b));
  return {
    r: Qt(Vn(n + a * (ba(Vt(t.r)) - n))),
    g: Qt(Vn(o + a * (ba(Vt(t.g)) - o))),
    b: Qt(Vn(s + a * (ba(Vt(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function ln(e, t, a) {
  if (e) {
    let n = fo(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = mo(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function Si(e, t) {
  return e && Object.assign(t || {}, e);
}
function Wo(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Qt(e[3]))) : (t = Si(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Qt(t.a)), t;
}
function xr(e) {
  return e.charAt(0) === "r" ? br(e) : ur(e);
}
class Wa {
  constructor(t) {
    if (t instanceof Wa)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Wo(t) : a === "string" && (n = ar(t) || mr(t) || xr(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Si(this._rgb);
    return t && (t.a = Vt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Wo(t);
  }
  rgbString() {
    return this._valid ? vr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? or(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? fr(this._rgb) : void 0;
  }
  mix(t, a) {
    if (t) {
      const n = this.rgb, o = t.rgb;
      let s;
      const i = a === s ? 0.5 : a, l = 2 * i - 1, r = n.a - o.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      s = 1 - c, n.r = 255 & c * n.r + s * o.r + 0.5, n.g = 255 & c * n.g + s * o.g + 0.5, n.b = 255 & c * n.b + s * o.b + 0.5, n.a = i * n.a + (1 - i) * o.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, a) {
    return t && (this._rgb = yr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new Wa(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Qt(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = en(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return ln(this._rgb, 2, t), this;
  }
  darken(t) {
    return ln(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ln(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ln(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return hr(this._rgb, t), this;
  }
}
function Et() {
}
const kr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ee(e) {
  return e == null;
}
function Ze(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Le(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function wt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Tt(e, t) {
  return wt(e) ? e : t;
}
function De(e, t) {
  return typeof e > "u" ? t : e;
}
const _r = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Mi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function je(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Fe(e, t, a, n) {
  let o, s, i;
  if (Ze(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(a, e[o], o);
  else if (Le(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(a, e[i[o]], i[o]);
}
function Cn(e, t) {
  let a, n, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, n = e.length; a < n; ++a)
    if (o = e[a], s = t[a], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function $n(e) {
  if (Ze(e))
    return e.map($n);
  if (Le(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let o = 0;
    for (; o < n; ++o)
      t[a[o]] = $n(e[a[o]]);
    return t;
  }
  return e;
}
function Di(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function wr(e, t, a, n) {
  if (!Di(e))
    return;
  const o = t[e], s = a[e];
  Le(o) && Le(s) ? Ka(o, s, n) : t[e] = $n(s);
}
function Ka(e, t, a) {
  const n = Ze(t) ? t : [
    t
  ], o = n.length;
  if (!Le(e))
    return e;
  a = a || {};
  const s = a.merger || wr;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = n[l], !Le(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, u = r.length; c < u; ++c)
      s(r[c], e, i, a);
  }
  return e;
}
function za(e, t) {
  return Ka(e, t, {
    merger: Cr
  });
}
function Cr(e, t, a) {
  if (!Di(e))
    return;
  const n = t[e], o = a[e];
  Le(n) && Le(o) ? za(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = $n(o));
}
const Ko = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function $r(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function Sr(e) {
  const t = $r(e);
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
  return (Ko[t] || (Ko[t] = Sr(t)))(e);
}
function po(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ua = (e) => typeof e < "u", ea = (e) => typeof e == "function", Uo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Mr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Oe = Math.PI, Ue = 2 * Oe, Dr = Ue + Oe, Sn = Number.POSITIVE_INFINITY, Ar = Oe / 180, Qe = Oe / 2, sa = Oe / 4, Yo = Oe * 2 / 3, Ai = Math.log10, Pt = Math.sign;
function Na(e, t, a) {
  return Math.abs(e - t) < a;
}
function qo(e) {
  const t = Math.round(e);
  e = Na(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Ai(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function Tr(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function Br(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ya(e) {
  return !Br(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Lr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Rr(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function zt(e) {
  return e * (Oe / 180);
}
function Pr(e) {
  return e * (180 / Oe);
}
function Xo(e) {
  if (!wt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Ti(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Oe && (s += Ue), {
    angle: s,
    distance: o
  };
}
function ao(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Ir(e, t) {
  return (e - t + Dr) % Ue - Oe;
}
function St(e) {
  return (e % Ue + Ue) % Ue;
}
function qa(e, t, a, n) {
  const o = St(e), s = St(t), i = St(a), l = St(s - o), r = St(i - o), c = St(o - s), u = St(o - i);
  return o === s || o === i || n && s === i || l > r && c < u;
}
function st(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Er(e) {
  return st(e, -32768, 32767);
}
function Xt(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function bo(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ua = (e, t, a, n) => bo(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), Fr = (e, t, a) => bo(e, a, (n) => e[n][t] >= a);
function Or(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const Bi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Vr(e, t) {
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
  }), Bi.forEach((a) => {
    const n = "_onData" + po(a), o = e[a];
    Object.defineProperty(e, a, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[n] == "function" && l[n](...s);
        }), i;
      }
    });
  });
}
function Go(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && (Bi.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Li(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Ri = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Pi(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, Ri.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function zr(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const vo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", tt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Nr = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function jr(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: g, max: m, minDefined: p, maxDefined: h } = i.getUserBounds();
    if (p) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ua(r, u, g).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ua(t, u, i.getPixelForValue(g)).lo
      ), c) {
        const b = r.slice(0, o + 1).reverse().findIndex((v) => !Ee(v[l.axis]));
        o -= Math.max(0, b);
      }
      o = st(o, 0, n - 1);
    }
    if (h) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(r, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, u, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const v = r.slice(b - 1).findIndex((y) => !Ee(y[l.axis]));
        b += Math.max(0, v);
      }
      s = st(b, o, n) - o;
    } else
      s = n - o;
  }
  return {
    start: o,
    count: s
  };
}
function Hr(e) {
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
const rn = (e) => e === 0 || e === 1, Zo = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ue / a)), Qo = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ue / a) + 1, ja = {
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
  easeInSine: (e) => -Math.cos(e * Qe) + 1,
  easeOutSine: (e) => Math.sin(e * Qe),
  easeInOutSine: (e) => -0.5 * (Math.cos(Oe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => rn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => rn(e) ? e : Zo(e, 0.075, 0.3),
  easeOutElastic: (e) => rn(e) ? e : Qo(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return rn(e) ? e : e < 0.5 ? 0.5 * Zo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Qo(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - ja.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? ja.easeInBounce(e * 2) * 0.5 : ja.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function yo(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Jo(e) {
  return yo(e) ? e : new Wa(e);
}
function zn(e) {
  return yo(e) ? e : new Wa(e).saturate(0.5).darken(0.1).hexString();
}
const Wr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Kr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Ur(e) {
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
      properties: Kr
    },
    numbers: {
      type: "number",
      properties: Wr
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
function Yr(e) {
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
const es = /* @__PURE__ */ new Map();
function qr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = es.get(a);
  return n || (n = new Intl.NumberFormat(e, t), es.set(a, n)), n;
}
function xo(e, t, a) {
  return qr(t, a).format(e);
}
const Xr = {
  values(e) {
    return Ze(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let o, s = e;
    if (a.length > 1) {
      const c = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Gr(e, a);
    }
    const i = Ai(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), xo(e, n, r);
  }
};
function Gr(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Ii = {
  formatters: Xr
};
function Zr(e) {
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
      callback: Ii.formatters.values,
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
const ga = /* @__PURE__ */ Object.create(null), no = /* @__PURE__ */ Object.create(null);
function Ha(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let n = 0, o = a.length; n < o; ++n) {
    const s = a[n];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Nn(e, t, a) {
  return typeof t == "string" ? Ka(Ha(e, t), a) : Ka(Ha(e, ""), t);
}
class Qr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => zn(o.backgroundColor), this.hoverBorderColor = (n, o) => zn(o.borderColor), this.hoverColor = (n, o) => zn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return Nn(this, t, a);
  }
  get(t) {
    return Ha(this, t);
  }
  describe(t, a) {
    return Nn(no, t, a);
  }
  override(t, a) {
    return Nn(ga, t, a);
  }
  route(t, a, n, o) {
    const s = Ha(this, t), i = Ha(this, n), l = "_" + a;
    Object.defineProperties(s, {
      [l]: {
        value: s[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return Le(r) ? Object.assign({}, c, r) : De(r, c);
        },
        set(r) {
          this[l] = r;
        }
      }
    });
  }
  apply(t) {
    t.forEach((a) => a(this));
  }
}
var Ye = /* @__PURE__ */ new Qr({
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
  Ur,
  Yr,
  Zr
]);
function Jr(e) {
  return !e || Ee(e.size) || Ee(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function ts(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ia(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function as(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function oo(e, t, a, n) {
  Ei(e, t, a, n, null);
}
function Ei(e, t, a, n, o) {
  let s, i, l, r, c, u, g, m;
  const p = t.pointStyle, h = t.rotation, b = t.radius;
  let v = (h || 0) * Ar;
  if (p && typeof p == "object" && (s = p.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(v), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, b, 0, 0, Ue) : e.arc(a, n, b, 0, Ue), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : b, e.moveTo(a + Math.sin(v) * u, n - Math.cos(v) * b), v += Yo, e.lineTo(a + Math.sin(v) * u, n - Math.cos(v) * b), v += Yo, e.lineTo(a + Math.sin(v) * u, n - Math.cos(v) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, r = b - c, i = Math.cos(v + sa) * r, g = Math.cos(v + sa) * (o ? o / 2 - c : r), l = Math.sin(v + sa) * r, m = Math.sin(v + sa) * (o ? o / 2 - c : r), e.arc(a - g, n - l, c, v - Oe, v - Qe), e.arc(a + m, n - i, c, v - Qe, v), e.arc(a + g, n + l, c, v, v + Qe), e.arc(a - m, n + i, c, v + Qe, v + Oe), e.closePath();
        break;
      case "rect":
        if (!h) {
          r = Math.SQRT1_2 * b, u = o ? o / 2 : r, e.rect(a - u, n - r, 2 * u, 2 * r);
          break;
        }
        v += sa;
      /* falls through */
      case "rectRot":
        g = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - g, n - l), e.lineTo(a + m, n - i), e.lineTo(a + g, n + l), e.lineTo(a - m, n + i), e.closePath();
        break;
      case "crossRot":
        v += sa;
      /* falls through */
      case "cross":
        g = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - g, n - l), e.lineTo(a + g, n + l), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
        break;
      case "star":
        g = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - g, n - l), e.lineTo(a + g, n + l), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i), v += sa, g = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, l = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - g, n - l), e.lineTo(a + g, n + l), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(v) * b, l = Math.sin(v) * b, e.moveTo(a - i, n - l), e.lineTo(a + i, n + l);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(v) * (o ? o / 2 : b), n + Math.sin(v) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Xa(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function ko(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function _o(e) {
  e.restore();
}
function ec(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function tc(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function ac(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ee(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function nc(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, u = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function oc(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Ga(e, t, a, n, o, s = {}) {
  const i = Ze(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, ac(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && oc(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Ee(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), nc(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function Mn(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Oe, Oe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Oe, Qe, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Qe, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Qe, !0), e.lineTo(a + i.topLeft, n);
}
const sc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, ic = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function lc(e, t) {
  const a = ("" + e).match(sc);
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
const rc = (e) => +e || 0;
function wo(e, t) {
  const a = {}, n = Le(t), o = n ? Object.keys(t) : t, s = Le(e) ? n ? (i) => De(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = rc(s(i));
  return a;
}
function Fi(e) {
  return wo(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function _a(e) {
  return wo(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Ct(e) {
  const t = Fi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function it(e, t) {
  e = e || {}, t = t || Ye.font;
  let a = De(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = De(e.style, t.style);
  n && !("" + n).match(ic) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: De(e.family, t.family),
    lineHeight: lc(De(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: De(e.weight, t.weight),
    string: ""
  };
  return o.string = Jr(o), o;
}
function cn(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function cc(e, t, a) {
  const { min: n, max: o } = e, s = Mi(t, (o - n) / 2), i = (l, r) => a && l === 0 ? 0 : l + r;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ma(e, t) {
  return Object.assign(Object.create(e), t);
}
function Co(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Ni("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (l) => Co([
      l,
      ...e
    ], t, s, n)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, r) {
      return delete l[r], delete l._keys, delete e[0][r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, r) {
      return Vi(l, r, () => bc(r, t, e, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, r) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], r);
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
    has(l, r) {
      return os(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return os(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const u = l._storage || (l._storage = o());
      return l[r] = u[r] = c, delete l._keys, !0;
    }
  });
}
function $a(e, t, a, n) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Oi(e, n),
    setContext: (s) => $a(e, s, a, n),
    override: (s) => $a(e.override(s), t, a, n)
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
      return Vi(s, i, () => uc(s, i, l));
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
function Oi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: n = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: a,
    indexable: n,
    isScriptable: ea(a) ? a : () => a,
    isIndexable: ea(n) ? n : () => n
  };
}
const dc = (e, t) => e ? e + po(t) : t, $o = (e, t) => Le(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Vi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function uc(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = n[t];
  return ea(l) && i.isScriptable(t) && (l = hc(t, l, e, a)), Ze(l) && l.length && (l = fc(t, l, e, i.isIndexable)), $o(t, l) && (l = $a(l, o, s && s[t], i)), l;
}
function hc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = a;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || n);
  return l.delete(e), $o(e, r) && (r = So(o._scopes, o, e, r)), r;
}
function fc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Le(t[0])) {
    const r = t, c = o._scopes.filter((u) => u !== r);
    t = [];
    for (const u of r) {
      const g = So(c, o, e, u);
      t.push($a(g, s, i && i[e], l));
    }
  }
  return t;
}
function zi(e, t, a) {
  return ea(e) ? e(t, a) : e;
}
const gc = (e, t) => e === !0 ? t : typeof e == "string" ? fa(t, e) : void 0;
function mc(e, t, a, n, o) {
  for (const s of t) {
    const i = gc(a, s);
    if (i) {
      e.add(i);
      const l = zi(i._fallback, a, o);
      if (typeof l < "u" && l !== a && l !== n)
        return l;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function So(e, t, a, n) {
  const o = t._rootScopes, s = zi(t._fallback, a, n), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(n);
  let r = ns(l, i, a, s || a, n);
  return r === null || typeof s < "u" && s !== a && (r = ns(l, i, s, r, n), r === null) ? !1 : Co(Array.from(l), [
    ""
  ], o, s, () => pc(t, a, n));
}
function ns(e, t, a, n, o) {
  for (; a; )
    a = mc(e, t, a, n, o);
  return a;
}
function pc(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return Ze(o) && Le(a) ? a : o || {};
}
function bc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Ni(dc(s, e), a), typeof o < "u")
      return $o(e, o) ? So(a, n, e, o) : o;
}
function Ni(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function os(e) {
  let t = e._keys;
  return t || (t = e._keys = vc(e._scopes)), t;
}
function vc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const yc = Number.EPSILON || 1e-14, Sa = (e, t) => t < e.length && !e[t].skip && e[t], ji = (e) => e === "x" ? "y" : "x";
function xc(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, l = ao(s, o), r = ao(i, s);
  let c = l / (l + r), u = r / (l + r);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const g = n * c, m = n * u;
  return {
    previous: {
      x: s.x - g * (i.x - o.x),
      y: s.y - g * (i.y - o.y)
    },
    next: {
      x: s.x + m * (i.x - o.x),
      y: s.y + m * (i.y - o.y)
    }
  };
}
function kc(e, t, a) {
  const n = e.length;
  let o, s, i, l, r, c = Sa(e, 0);
  for (let u = 0; u < n - 1; ++u)
    if (r = c, c = Sa(e, u + 1), !(!r || !c)) {
      if (Na(t[u], 0, yc)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      o = a[u] / t[u], s = a[u + 1] / t[u], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), a[u] = o * i * t[u], a[u + 1] = s * i * t[u]);
    }
}
function _c(e, t, a = "x") {
  const n = ji(a), o = e.length;
  let s, i, l, r = Sa(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = Sa(e, c + 1), !l)
      continue;
    const u = l[a], g = l[n];
    i && (s = (u - i[a]) / 3, l[`cp1${a}`] = u - s, l[`cp1${n}`] = g - s * t[c]), r && (s = (r[a] - u) / 3, l[`cp2${a}`] = u + s, l[`cp2${n}`] = g + s * t[c]);
  }
}
function wc(e, t = "x") {
  const a = ji(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, l, r, c = Sa(e, 0);
  for (i = 0; i < n; ++i)
    if (l = r, r = c, c = Sa(e, i + 1), !!r) {
      if (c) {
        const u = c[t] - r[t];
        o[i] = u !== 0 ? (c[a] - r[a]) / u : 0;
      }
      s[i] = l ? c ? Pt(o[i - 1]) !== Pt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  kc(e, o, s), _c(e, s, t);
}
function dn(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function Cc(e, t) {
  let a, n, o, s, i, l = Xa(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = l, l = a < n - 1 && Xa(e[a + 1], t), s && (o = e[a], i && (o.cp1x = dn(o.cp1x, t.left, t.right), o.cp1y = dn(o.cp1y, t.top, t.bottom)), l && (o.cp2x = dn(o.cp2x, t.left, t.right), o.cp2y = dn(o.cp2y, t.top, t.bottom)));
}
function $c(e, t, a, n, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    wc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = xc(c, l, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Cc(e, a);
}
function Mo() {
  return typeof window < "u" && typeof document < "u";
}
function Do(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Dn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Rn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Sc(e, t) {
  return Rn(e).getPropertyValue(t);
}
const Mc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ha(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = Mc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Dc = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Ac(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, l, r;
  if (Dc(o, s, e.target))
    l = o, r = s;
  else {
    const c = t.getBoundingClientRect();
    l = n.clientX - c.left, r = n.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: r,
    box: i
  };
}
function ca(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Rn(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), l = ha(o, "border", "width"), { x: r, y: c, box: u } = Ac(e, a), g = i.left + (u && l.left), m = i.top + (u && l.top);
  let { width: p, height: h } = t;
  return s && (p -= i.width + l.width, h -= i.height + l.height), {
    x: Math.round((r - g) / p * a.width / n),
    y: Math.round((c - m) / h * a.height / n)
  };
}
function Tc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && Do(e);
    if (!s)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = Rn(s), r = ha(l, "border", "width"), c = ha(l, "padding");
      t = i.width - c.width - r.width, a = i.height - c.height - r.height, n = Dn(l.maxWidth, s, "clientWidth"), o = Dn(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: n || Sn,
    maxHeight: o || Sn
  };
}
const Gt = (e) => Math.round(e * 10) / 10;
function Bc(e, t, a, n) {
  const o = Rn(e), s = ha(o, "margin"), i = Dn(o.maxWidth, e, "clientWidth") || Sn, l = Dn(o.maxHeight, e, "clientHeight") || Sn, r = Tc(e, t, a);
  let { width: c, height: u } = r;
  if (o.boxSizing === "content-box") {
    const m = ha(o, "border", "width"), p = ha(o, "padding");
    c -= p.width + m.width, u -= p.height + m.height;
  }
  return c = Math.max(0, c - s.width), u = Math.max(0, n ? c / n : u - s.height), c = Gt(Math.min(c, i, r.maxWidth)), u = Gt(Math.min(u, l, r.maxHeight)), c && !u && (u = Gt(c / 2)), (t !== void 0 || a !== void 0) && n && r.height && u > r.height && (u = r.height, c = Gt(Math.floor(u * n))), {
    width: c,
    height: u
  };
}
function ss(e, t, a) {
  const n = t || 1, o = Gt(e.height * n), s = Gt(e.width * n);
  e.height = Gt(e.height), e.width = Gt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Lc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Mo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function is(e, t) {
  const a = Sc(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function da(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Rc(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Pc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = da(e, o, a), l = da(o, s, a), r = da(s, t, a), c = da(i, l, a), u = da(l, r, a);
  return da(c, u, a);
}
const Ic = function(e, t) {
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
}, Ec = function() {
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
function wa(e, t, a) {
  return e ? Ic(t, a) : Ec();
}
function Hi(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Wi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Ki(e) {
  return e === "angle" ? {
    between: qa,
    compare: Ir,
    normalize: St
  } : {
    between: Xt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function ls({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function Fc(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: l } = Ki(n), r = t.length;
  let { start: c, end: u, loop: g } = e, m, p;
  if (g) {
    for (c += r, u += r, m = 0, p = r; m < p && i(l(t[c % r][n]), o, s); ++m)
      c--, u--;
    c %= r, u %= r;
  }
  return u < c && (u += r), {
    start: c,
    end: u,
    loop: g,
    style: e.style
  };
}
function Oc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: l, between: r, normalize: c } = Ki(n), { start: u, end: g, loop: m, style: p } = Fc(e, t, a), h = [];
  let b = !1, v = null, y, w, _;
  const k = () => r(o, _, y) && l(o, _) !== 0, $ = () => l(s, y) === 0 || r(s, _, y), S = () => b || k(), D = () => !b || $();
  for (let P = u, V = u; P <= g; ++P)
    w = t[P % i], !w.skip && (y = c(w[n]), y !== _ && (b = r(y, o, s), v === null && S() && (v = l(y, o) === 0 ? P : V), v !== null && D() && (h.push(ls({
      start: v,
      end: P,
      loop: m,
      count: i,
      style: p
    })), v = null), V = P, _ = y));
  return v !== null && h.push(ls({
    start: v,
    end: g,
    loop: m,
    count: i,
    style: p
  })), h;
}
function Vc(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = Oc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function zc(e, t, a, n) {
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
function Nc(e, t, a, n) {
  const o = e.length, s = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= a; ++r) {
    const c = e[r % o];
    c.skip || c.stop ? l.skip || (n = !1, s.push({
      start: t % o,
      end: (r - 1) % o,
      loop: n
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: n
  }), s;
}
function jc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = zc(a, o, s, n);
  if (n === !0)
    return rs(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], a, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return rs(e, Nc(a, i, r, c), a, t);
}
function rs(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Hc(e, t, a, n);
}
function Hc(e, t, a, n) {
  const o = e._chart.getContext(), s = cs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = a.length, c = [];
  let u = s, g = t[0].start, m = g;
  function p(h, b, v, y) {
    const w = l ? -1 : 1;
    if (h !== b) {
      for (h += r; a[h % r].skip; )
        h -= w;
      for (; a[b % r].skip; )
        b += w;
      h % r !== b % r && (c.push({
        start: h % r,
        end: b % r,
        loop: v,
        style: y
      }), u = y, g = b % r);
    }
  }
  for (const h of t) {
    g = l ? g : h.start;
    let b = a[g % r], v;
    for (m = g + 1; m <= h.end; m++) {
      const y = a[m % r];
      v = cs(n.setContext(ma(o, {
        type: "segment",
        p0: b,
        p1: y,
        p0DataIndex: (m - 1) % r,
        p1DataIndex: m % r,
        datasetIndex: i
      }))), Wc(v, u) && p(g, m - 1, h.loop, u), b = y, u = v;
    }
    g < m - 1 && p(g, m - 1, h.loop, u);
  }
  return c;
}
function cs(e) {
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
function Wc(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return yo(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function un(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Kc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: un(a, t, "left"),
    right: un(a, t, "right"),
    top: un(n, t, "top"),
    bottom: un(n, t, "bottom")
  } : t;
}
function Uc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = Kc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Yc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, a, n, o) {
    const s = a.listeners[o], i = a.duration;
    s.forEach((l) => l({
      chart: t,
      initial: a.initial,
      numSteps: i,
      currentStep: Math.min(n - a.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Ri.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let a = 0;
    this._charts.forEach((n, o) => {
      if (!n.running || !n.items.length)
        return;
      const s = n.items;
      let i = s.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = s[i], r._active ? (r._total > n.duration && (n.duration = r._total), r.tick(t), l = !0) : (s[i] = s[s.length - 1], s.pop());
      l && (o.draw(), this._notify(o, n, t, "progress")), s.length || (n.running = !1, this._notify(o, n, t, "complete"), n.initial = !1), a += s.length;
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
var Ft = /* @__PURE__ */ new Yc();
const ds = "transparent", qc = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = Jo(e || ds), o = n.valid && Jo(t || ds);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Xc {
  constructor(t, a, n, o) {
    const s = a[n];
    o = cn([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = cn([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || qc[t.type || typeof i], this._easing = ja[t.easing] || ja.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, n) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = n - this._start, i = this._duration - s;
      this._start = n, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = cn([
        t.to,
        a,
        o,
        t.from
      ]), this._from = cn([
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
    const a = t - this._start, n = this._duration, o = this._prop, s = this._from, i = this._loop, l = this._to;
    let r;
    if (this._active = s !== l && (i || a < n), !this._active) {
      this._target[o] = l, this._notify(!0);
      return;
    }
    if (a < 0) {
      this._target[o] = s;
      return;
    }
    r = a / n % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[o] = this._fn(s, l, r);
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
class Ui {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!Le(t))
      return;
    const a = Object.keys(Ye.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Le(s))
        return;
      const i = {};
      for (const l of a)
        i[l] = s[l];
      (Ze(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !n.has(l)) && n.set(l, i);
      });
    });
  }
  _animateOptions(t, a) {
    const n = a.options, o = Zc(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && Gc(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), s;
  }
  _createAnimations(t, a) {
    const n = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(a), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, a));
        continue;
      }
      const u = a[c];
      let g = s[c];
      const m = n.get(c);
      if (g)
        if (m && g.active()) {
          g.update(m, u, l);
          continue;
        } else
          g.cancel();
      if (!m || !m.duration) {
        t[c] = u;
        continue;
      }
      s[c] = g = new Xc(m, t, c, u), o.push(g);
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
      return Ft.add(this._chart, n), !0;
  }
}
function Gc(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function Zc(e, t) {
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
function us(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function Qc(e, t, a) {
  if (a === !1)
    return !1;
  const n = us(e, a), o = us(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function Jc(e) {
  let t, a, n, o;
  return Le(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function Yi(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function hs(e, t, a, n = {}) {
  const o = e.keys, s = n.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, l = o.length; i < l; ++i) {
    if (r = +o[i], r === a) {
      if (u = !0, n.all)
        continue;
      break;
    }
    c = e.values[r], wt(c) && (s || t === 0 || Pt(t) === Pt(c)) && (t += c);
  }
  return !u && !n.all ? 0 : t;
}
function ed(e, t) {
  const { iScale: a, vScale: n } = t, o = a.axis === "x" ? "x" : "y", s = n.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, u;
  for (r = 0, c = i.length; r < c; ++r)
    u = i[r], l[r] = {
      [o]: u,
      [s]: e[u]
    };
  return l;
}
function jn(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function td(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function ad(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function nd(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function fs(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function gs(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: l } = n, r = s.axis, c = i.axis, u = td(s, i, n), g = t.length;
  let m;
  for (let p = 0; p < g; ++p) {
    const h = t[p], { [r]: b, [c]: v } = h, y = h._stacks || (h._stacks = {});
    m = y[c] = nd(o, u, b), m[l] = v, m._top = fs(m, i, !0, n.type), m._bottom = fs(m, i, !1, n.type);
    const w = m._visualValues || (m._visualValues = {});
    w[l] = v;
  }
}
function Hn(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function od(e, t) {
  return ma(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function sd(e, t, a) {
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
function Aa(e, t) {
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
const Wn = (e) => e === "reset" || e === "none", ms = (e, t) => t ? e : Object.assign({}, e), id = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Yi(a, !0),
  values: null
};
class Pn {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = jn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Aa(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (g, m, p, h) => g === "x" ? m : g === "r" ? h : p, s = a.xAxisID = De(n.xAxisID, Hn(t, "x")), i = a.yAxisID = De(n.yAxisID, Hn(t, "y")), l = a.rAxisID = De(n.rAxisID, Hn(t, "r")), r = a.indexAxis, c = a.iAxisID = o(r, s, i, l), u = a.vAxisID = o(r, i, s, l);
    a.xScale = this.getScaleForId(s), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(l), a.iScale = this.getScaleForId(c), a.vScale = this.getScaleForId(u);
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
    this._data && Go(this._data, this), t._stacked && Aa(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Le(a)) {
      const o = this._cachedMeta;
      this._data = ed(a, o);
    } else if (n !== a) {
      if (n) {
        Go(n, this);
        const o = this._cachedMeta;
        Aa(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && Vr(a, this), this._syncList = [], this._data = a;
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
    a._stacked = jn(a.vScale, a), a.stack !== n.stack && (o = !0, Aa(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (gs(this, a._parsed), a._stacked = jn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, l = s.axis;
    let r = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], u, g, m;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, m = o;
    else {
      Ze(o[t]) ? m = this.parseArrayData(n, o, t, a) : Le(o[t]) ? m = this.parseObjectData(n, o, t, a) : m = this.parsePrimitiveData(n, o, t, a);
      const p = () => g[l] === null || c && g[l] < c[l];
      for (u = 0; u < a; ++u)
        n._parsed[u + t] = g = m[u], r && (p() && (r = !1), c = g);
      n._sorted = r;
    }
    i && gs(this, m);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), u = s === i, g = new Array(o);
    let m, p, h;
    for (m = 0, p = o; m < p; ++m)
      h = m + n, g[m] = {
        [l]: u || s.parse(c[h], h),
        [r]: i.parse(a[h], h)
      };
    return g;
  }
  parseArrayData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, l = new Array(o);
    let r, c, u, g;
    for (r = 0, c = o; r < c; ++r)
      u = r + n, g = a[u], l[r] = {
        x: s.parse(g[0], u),
        y: i.parse(g[1], u)
      };
    return l;
  }
  parseObjectData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(o);
    let u, g, m, p;
    for (u = 0, g = o; u < g; ++u)
      m = u + n, p = a[m], c[u] = {
        x: s.parse(fa(p, l), m),
        y: i.parse(fa(p, r), m)
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
    const o = this.chart, s = this._cachedMeta, i = a[t.axis], l = {
      keys: Yi(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return hs(l, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const l = o && n._stacks[a.axis];
    o && l && (o.values = l, i = hs(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, l = this._getOtherScale(t), r = id(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: g } = ad(l);
    let m, p;
    function h() {
      p = o[m];
      const b = p[l.axis];
      return !wt(p[t.axis]) || u > b || g < b;
    }
    for (m = 0; m < i && !(!h() && (this.updateRangeFromParsed(c, t, p, r), s)); ++m)
      ;
    if (s) {
      for (m = i - 1; m >= 0; --m)
        if (!h()) {
          this.updateRangeFromParsed(c, t, p, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, n = [];
    let o, s, i;
    for (o = 0, s = a.length; o < s; ++o)
      i = a[o][t.axis], wt(i) && n.push(i);
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
    this.update(t || "default"), a._clip = Jc(De(this.options.clip, Qc(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, n = this._cachedMeta, o = n.data || [], s = a.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let u;
    for (n.dataset && n.dataset.draw(t, s, l, r), u = l; u < l + r; ++u) {
      const g = o[u];
      g.hidden || (g.active && c ? i.push(g) : g.draw(t, s));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, s);
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
      s = i.$context || (i.$context = sd(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = od(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!a, s.mode = n, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", n) {
    const o = a === "active", s = this._cachedDataOpts, i = t + "-" + a, l = s[i], r = this.enableOptionSharing && Ua(n);
    if (l)
      return ms(l, r);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), g = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), u), p = Object.keys(Ye.elements[t]), h = () => this.getContext(n, o, a), b = c.resolveNamedOptions(m, p, h, g);
    return b.$shared && (b.$shared = r, s[i] = Object.freeze(ms(b, r))), b;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const u = this.chart.config, g = u.datasetAnimationScopeKeys(this._type, a), m = u.getOptionScopes(this.getDataset(), g);
      r = u.createResolver(m, this.getContext(t, n, a));
    }
    const c = new Ui(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || Wn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    Wn(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !Wn(a) && this._resolveAnimations(void 0, a).update(t, n);
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
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const o = n.length, s = a.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, a, n = !0) {
    const o = this._cachedMeta, s = o.data, i = t + a;
    let l;
    const r = (c) => {
      for (c.length += a, l = c.length - 1; l >= i; l--)
        c[l] = c[l - a];
    };
    for (r(s), l = t; l < i; ++l)
      s[l] = new this.dataElementType();
    this._parsing && r(o._parsed), this.parse(t, a), n && this.updateElements(s, t, a, "reset");
  }
  updateElements(t, a, n, o) {
  }
  _removeElements(t, a) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const o = n._parsed.splice(t, a);
      n._stacked && Aa(n, o);
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
function ld(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = Li(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function rd(e) {
  const t = e.iScale, a = ld(t, e.type);
  let n = t._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (Ua(l) && (n = Math.min(n, Math.abs(i - l) || n)), l = i);
  };
  for (o = 0, s = a.length; o < s; ++o)
    i = t.getPixelForValue(a[o]), r();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), r();
  return n;
}
function cd(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Ee(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function dd(e, t, a, n) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, l = e < o.length - 1 ? o[e + 1] : null;
  const r = a.categoryPercentage;
  i === null && (i = s - (l === null ? t.end - t.start : l - s)), l === null && (l = s + s - i);
  const c = s - (s - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / n,
    ratio: a.barPercentage,
    start: c
  };
}
function ud(e, t, a, n) {
  const o = a.parse(e[0], n), s = a.parse(e[1], n), i = Math.min(o, s), l = Math.max(o, s);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[a.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function qi(e, t, a, n) {
  return Ze(e) ? ud(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function ps(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, u, g, m;
  for (c = a, u = a + n; c < u; ++c)
    m = t[c], g = {}, g[o.axis] = l || o.parse(i[c], c), r.push(qi(m, g, s, c));
  return r;
}
function Kn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function hd(e, t, a) {
  return e !== 0 ? Pt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function fd(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function gd(e, t, a, n) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: u } = fd(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = u : (s[bs(u, i, l, r)] = !0, o = c)), s[bs(o, i, l, r)] = !0, e.borderSkipped = s;
}
function bs(e, t, a, n) {
  return n ? (e = md(e, t, a), e = vs(e, a, t)) : e = vs(e, t, a), e;
}
function md(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function vs(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function pd(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class bd extends Pn {
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
    return ps(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return ps(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, u = i.axis === "x" ? l : r, g = [];
    let m, p, h, b;
    for (m = n, p = n + o; m < p; ++m)
      b = a[m], h = {}, h[s.axis] = s.parse(fa(b, c), m), g.push(qi(fa(b, u), h, i, m));
    return g;
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
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, l = Kn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + n.getLabelForValue(s[n.axis]),
      value: l
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), u = this._getRuler(), { sharedOptions: g, includeOptions: m } = this._getSharedOptions(a, o);
    for (let p = a; p < a + n; p++) {
      const h = this.getParsed(p), b = s || Ee(h[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(p), v = this._calculateBarIndexPixels(p, u), y = (h._stacks || {})[l.axis], w = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !y || Kn(h._custom) || i === y._top || i === y._bottom,
        x: c ? b.head : v.center,
        y: c ? v.center : b.head,
        height: c ? v.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : v.size
      };
      m && (w.options = g || this.resolveDataElementOptions(p, t[p].active ? "active" : o));
      const _ = w.options || t[p].options;
      gd(w, _, y, i), pd(w, _, u.ratio), this.updateElement(t[p], p, w, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), s = n.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(a), r = l && l[n.axis], c = (u) => {
      const g = u._parsed.find((p) => p[n.axis] === r), m = g && g[u.vScale.axis];
      if (Ee(m) || isNaN(m))
        return !0;
    };
    for (const u of o)
      if (!(a !== void 0 && c(u)) && ((s === !1 || i.indexOf(u.stack) === -1 || s === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    const l = t.barThickness;
    return {
      min: l || rd(a),
      pixels: o,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(t), c = r._custom, u = Kn(c);
    let g = r[a.axis], m = 0, p = n ? this.applyStack(a, r, n) : g, h, b;
    p !== g && (m = p - g, p = g), u && (g = c.barStart, p = c.barEnd - c.barStart, g !== 0 && Pt(g) !== Pt(c.barEnd) && (m = 0), m += g);
    const v = !Ee(s) && !u ? s : m;
    let y = a.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? h = a.getPixelForValue(m + p) : h = y, b = h - y, Math.abs(b) < i) {
      b = hd(b, a, l) * i, g === l && (y -= b / 2);
      const w = a.getPixelForDecimal(0), _ = a.getPixelForDecimal(1), k = Math.min(w, _), $ = Math.max(w, _);
      y = Math.max(Math.min(y, $), k), h = y + b, n && !u && (r._stacks[a.axis]._visualValues[o] = a.getValueForPixel(h) - a.getValueForPixel(y));
    }
    if (y === a.getPixelForValue(l)) {
      const w = Pt(b) * a.getLineWidthForValue(l) / 2;
      y += w, b -= w;
    }
    return {
      size: b,
      base: y,
      head: h,
      center: h + b / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = De(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = s ? this._getStackCount(t) : a.stackCount, g = o.barThickness === "flex" ? dd(t, a, o, u * c) : cd(t, a, o, u * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(De(m, this.getFirstScaleIdForIndexAxis())), h = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + p;
      l = g.start + g.chunk * h + g.chunk / 2, r = Math.min(i, g.chunk * g.ratio);
    } else
      l = n.getPixelForValue(this.getParsed(t)[n.axis], t), r = Math.min(i, a.min * a.ratio);
    return {
      base: l - r / 2,
      head: l + r / 2,
      center: l,
      size: r
    };
  }
  draw() {
    const t = this._cachedMeta, a = t.vScale, n = t.data, o = n.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[a.axis] !== null && !n[s].hidden && n[s].draw(this._ctx);
  }
}
function vd(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < Ue) {
    const l = e, r = l + t, c = Math.cos(l), u = Math.sin(l), g = Math.cos(r), m = Math.sin(r), p = (_, k, $) => qa(_, l, r, !0) ? 1 : Math.max(k, k * a, $, $ * a), h = (_, k, $) => qa(_, l, r, !0) ? -1 : Math.min(k, k * a, $, $ * a), b = p(0, c, g), v = p(Qe, u, m), y = h(Oe, c, g), w = h(Oe + Qe, u, m);
    n = (b - y) / 2, o = (v - w) / 2, s = -(b + y) / 2, i = -(v + w) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class yd extends Pn {
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
            const a = t.data, { labels: { pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = t.legend.options;
            return a.labels.length && a.datasets.length ? a.labels.map((r, c) => {
              const g = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
                fillStyle: g.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: g.borderDash,
                lineDashOffset: g.borderDashOffset,
                lineJoin: g.borderJoinStyle,
                lineWidth: g.borderWidth,
                strokeStyle: g.borderColor,
                textAlign: o,
                pointStyle: n,
                borderRadius: i && (l || g.borderRadius),
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
      let s = (r) => +n[r];
      if (Le(n[t])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +fa(n[c], r);
      }
      let i, l;
      for (i = t, l = t + a; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return zt(this.options.rotation - 90);
  }
  _getCircumference() {
    return zt(this.options.circumference);
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(n.width, n.height) - i) / 2, 0), r = Math.min(_r(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: g } = this._getRotationExtents(), { ratioX: m, ratioY: p, offsetX: h, offsetY: b } = vd(g, u, r), v = (n.width - i) / m, y = (n.height - i) / p, w = Math.max(Math.min(v, y) / 2, 0), _ = Mi(this.options.radius, w), k = Math.max(_ * r, 0), $ = (_ - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = h * _, this.offsetY = b * _, o.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, g = (l.top + l.bottom) / 2, m = s && c.animateScale, p = m ? 0 : this.innerRadius, h = m ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: v } = this._getSharedOptions(a, o);
    let y = this._getRotation(), w;
    for (w = 0; w < a; ++w)
      y += this._circumference(w, s);
    for (w = a; w < a + n; ++w) {
      const _ = this._circumference(w, s), k = t[w], $ = {
        x: u + this.offsetX,
        y: g + this.offsetY,
        startAngle: y,
        endAngle: y + _,
        circumference: _,
        outerRadius: h,
        innerRadius: p
      };
      v && ($.options = b || this.resolveDataElementOptions(w, k.active ? "active" : o)), y += _, this.updateElement(k, w, $, o);
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
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = xo(a._parsed[t], n.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let a = 0;
    const n = this.chart;
    let o, s, i, l, r;
    if (!t) {
      for (o = 0, s = n.data.datasets.length; o < s; ++o)
        if (n.isDatasetVisible(o)) {
          i = n.getDatasetMeta(o), t = i.data, l = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (o = 0, s = t.length; o < s; ++o)
      r = l.resolveDataElementOptions(o), r.borderAlign !== "inner" && (a = Math.max(a, r.borderWidth || 0, r.hoverBorderWidth || 0));
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
class xd extends Pn {
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
    let { start: l, count: r } = jr(a, o, i);
    this._drawStart = l, this._drawCount = r, Hr(a) && (l = 0, r = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: g } = this._getSharedOptions(a, o), m = i.axis, p = l.axis, { spanGaps: h, segment: b } = this.options, v = Ya(h) ? h : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || s || o === "none", w = a + n, _ = t.length;
    let k = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < _; ++$) {
      const S = t[$], D = y ? S : {};
      if ($ < a || $ >= w) {
        D.skip = !0;
        continue;
      }
      const P = this.getParsed($), V = Ee(P[p]), W = D[m] = i.getPixelForValue(P[m], $), M = D[p] = s || V ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, P, r) : P[p], $);
      D.skip = isNaN(W) || isNaN(M) || V, D.stop = $ > 0 && Math.abs(P[m] - k[m]) > v, b && (D.parsed = P, D.raw = c.data[$]), g && (D.options = u || this.resolveDataElementOptions($, S.active ? "active" : o)), y || this.updateElement(S, $, D, o), k = P;
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
class kd extends yd {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function la() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Ao {
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
    Object.assign(Ao.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return la();
  }
  parse() {
    return la();
  }
  format() {
    return la();
  }
  add() {
    return la();
  }
  diff() {
    return la();
  }
  startOf() {
    return la();
  }
  endOf() {
    return la();
  }
}
var _d = {
  _date: Ao
};
function wd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? Fr : ua;
    if (n) {
      if (o._sharedOptions) {
        const u = s[0], g = typeof u.getRange == "function" && u.getRange(t);
        if (g) {
          const m = c(s, t, a - g), p = c(s, t, a + g);
          return {
            lo: m.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const u = c(s, t, a);
      if (r) {
        const { vScale: g } = o._cachedMeta, { _parsed: m } = e, p = m.slice(0, u.lo + 1).reverse().findIndex((b) => !Ee(b[g.axis]));
        u.lo -= Math.max(0, p);
        const h = m.slice(u.hi).findIndex((b) => !Ee(b[g.axis]));
        u.hi += Math.max(0, h);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function In(e, t, a, n, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: u } = s[l], { lo: g, hi: m } = wd(s[l], t, i, o);
    for (let p = g; p <= m; ++p) {
      const h = u[p];
      h.skip || n(h, c, p);
    }
  }
}
function Cd(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, o) {
    const s = t ? Math.abs(n.x - o.x) : 0, i = a ? Math.abs(n.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Un(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || In(e, a, t, function(l, r, c) {
    !o && !Xa(l, e.chartArea, 0) || l.inRange(t.x, t.y, n) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function $d(e, t, a, n) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: g } = Ti(i, {
      x: t.x,
      y: t.y
    });
    qa(g, c, u) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return In(e, a, t, s), o;
}
function Sd(e, t, a, n, o, s) {
  let i = [];
  const l = Cd(a);
  let r = Number.POSITIVE_INFINITY;
  function c(u, g, m) {
    const p = u.inRange(t.x, t.y, o);
    if (n && !p)
      return;
    const h = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(h)) && !p)
      return;
    const v = l(t, h);
    v < r ? (i = [
      {
        element: u,
        datasetIndex: g,
        index: m
      }
    ], r = v) : v === r && i.push({
      element: u,
      datasetIndex: g,
      index: m
    });
  }
  return In(e, a, t, c), i;
}
function Yn(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? $d(e, t, a, o) : Sd(e, t, a, n, o, s);
}
function ys(e, t, a, n, o) {
  const s = [], i = a === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return In(e, a, t, (r, c, u) => {
    r[i] && r[i](t[a], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: u
    }), l = l || r.inRange(t.x, t.y, o));
  }), n && !l ? [] : s;
}
var Md = {
  modes: {
    index(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "x", i = a.includeInvisible || !1, l = a.intersect ? Un(e, o, s, n, i) : Yn(e, o, s, !1, n, i), r = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = l[0].index, g = c.data[u];
        g && !g.skip && r.push({
          element: g,
          datasetIndex: c.index,
          index: u
        });
      }), r) : [];
    },
    dataset(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      let l = a.intersect ? Un(e, o, s, n, i) : Yn(e, o, s, !1, n, i);
      if (l.length > 0) {
        const r = l[0].datasetIndex, c = e.getDatasetMeta(r).data;
        l = [];
        for (let u = 0; u < c.length; ++u)
          l.push({
            element: c[u],
            datasetIndex: r,
            index: u
          });
      }
      return l;
    },
    point(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Un(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Yn(e, o, s, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const o = ca(t, e);
      return ys(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = ca(t, e);
      return ys(e, o, "y", a.intersect, n);
    }
  }
};
const Xi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ta(e, t) {
  return e.filter((a) => a.pos === t);
}
function xs(e, t) {
  return e.filter((a) => Xi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Ba(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Dd(e) {
  const t = [];
  let a, n, o, s, i, l;
  for (a = 0, n = (e || []).length; a < n; ++a)
    o = e[a], { position: s, options: { stack: i, stackWeight: l = 1 } } = o, t.push({
      index: a,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: l
    });
  return t;
}
function Ad(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !Xi.includes(o))
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
function Td(e, t) {
  const a = Ad(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = a[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * n : r && t.availableWidth, l.height = o) : (l.width = n, l.height = u ? u * o : r && t.availableHeight);
  }
  return a;
}
function Bd(e) {
  const t = Dd(e), a = Ba(t.filter((c) => c.box.fullSize), !0), n = Ba(Ta(t, "left"), !0), o = Ba(Ta(t, "right")), s = Ba(Ta(t, "top"), !0), i = Ba(Ta(t, "bottom")), l = xs(t, "x"), r = xs(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: Ta(t, "chartArea"),
    vertical: n.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function ks(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function Gi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Ld(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Le(o)) {
    a.size && (e[o] -= a.size);
    const g = n[a.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, a.horizontal ? s.height : s.width), a.size = g.size / g.count, e[o] += a.size;
  }
  s.getPadding && Gi(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - ks(i, e, "left", "right")), r = Math.max(0, t.outerHeight - ks(i, e, "top", "bottom")), c = l !== e.w, u = r !== e.h;
  return e.w = l, e.h = r, a.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Rd(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Pd(e, t) {
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
function Oa(e, t, a, n) {
  const o = [];
  let s, i, l, r, c, u;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, Pd(l.horizontal, t));
    const { same: g, other: m } = Ld(t, a, l, n);
    c |= g && o.length, u = u || m, r.fullSize || o.push(l);
  }
  return c && Oa(o, t, a, n) || u;
}
function hn(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function _s(e, t, a, n) {
  const o = a.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = n[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const g = t.w * u, m = c.size || r.height;
      Ua(c.start) && (i = c.start), r.fullSize ? hn(r, o.left, i, a.outerWidth - o.right - o.left, m) : hn(r, t.left + c.placed, i, g, m), c.start = i, c.placed += g, i = r.bottom;
    } else {
      const g = t.h * u, m = c.size || r.width;
      Ua(c.start) && (s = c.start), r.fullSize ? hn(r, s, o.top, m, a.outerHeight - o.bottom - o.top) : hn(r, s, t.top + c.placed, m, g), c.start = s, c.placed += g, s = r.right;
    }
  }
  t.x = s, t.y = i;
}
var xt = {
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
    const o = Ct(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), l = Bd(e.boxes), r = l.vertical, c = l.horizontal;
    Fe(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const u = r.reduce((b, v) => v.box.options && v.box.options.display === !1 ? b : b + 1, 0) || 1, g = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), m = Object.assign({}, o);
    Gi(m, Ct(n));
    const p = Object.assign({
      maxPadding: m,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), h = Td(r.concat(c), g);
    Oa(l.fullSize, p, g, h), Oa(r, p, g, h), Oa(c, p, g, h) && Oa(r, p, g, h), Rd(p), _s(l.leftAndTop, p, g, h), p.x += p.w, p.y += p.h, _s(l.rightAndBottom, p, g, h), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, Fe(l.chartArea, (b) => {
      const v = b.box;
      Object.assign(v, e.chartArea), v.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Zi {
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
class Id extends Zi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const kn = "$chartjs", Ed = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ws = (e) => e === null || e === "";
function Fd(e, t) {
  const a = e.style, n = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[kn] = {
    initial: {
      height: n,
      width: o,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", ws(o)) {
    const s = is(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (ws(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = is(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const Qi = Lc ? {
  passive: !0
} : !1;
function Od(e, t, a) {
  e && e.addEventListener(t, a, Qi);
}
function Vd(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, Qi);
}
function zd(e, t) {
  const a = Ed[e.type] || e.type, { x: n, y: o } = ca(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: o !== void 0 ? o : null
  };
}
function An(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Nd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || An(l.addedNodes, n), i = i && !An(l.removedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function jd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || An(l.removedNodes, n), i = i && !An(l.addedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Za = /* @__PURE__ */ new Map();
let Cs = 0;
function Ji() {
  const e = window.devicePixelRatio;
  e !== Cs && (Cs = e, Za.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Hd(e, t) {
  Za.size || window.addEventListener("resize", Ji), Za.set(e, t);
}
function Wd(e) {
  Za.delete(e), Za.size || window.removeEventListener("resize", Ji);
}
function Kd(e, t, a) {
  const n = e.canvas, o = n && Do(n);
  if (!o)
    return;
  const s = Pi((l, r) => {
    const c = o.clientWidth;
    a(l, r), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, u = r.contentRect.height;
    c === 0 && u === 0 || s(c, u);
  });
  return i.observe(o), Hd(e, s), i;
}
function qn(e, t, a) {
  a && a.disconnect(), t === "resize" && Wd(e);
}
function Ud(e, t, a) {
  const n = e.canvas, o = Pi((s) => {
    e.ctx !== null && a(zd(s, e));
  }, e);
  return Od(n, t, o), o;
}
class Yd extends Zi {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Fd(t, a), n) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[kn])
      return !1;
    const n = a[kn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = n[s];
      Ee(i) ? a.removeAttribute(s) : a.setAttribute(s, i);
    });
    const o = n.style || {};
    return Object.keys(o).forEach((s) => {
      a.style[s] = o[s];
    }), a.width = a.width, delete a[kn], !0;
  }
  addEventListener(t, a, n) {
    this.removeEventListener(t, a);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: Nd,
      detach: jd,
      resize: Kd
    }[a] || Ud;
    o[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), o = n[a];
    if (!o)
      return;
    ({
      attach: qn,
      detach: qn,
      resize: qn
    }[a] || Vd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return Bc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && Do(t);
    return !!(a && a.isConnected);
  }
}
function qd(e) {
  return !Mo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Id : Yd;
}
let Wt = class {
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
    return Ya(this.x) && Ya(this.y);
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
function Xd(e, t) {
  const a = e.options.ticks, n = Gd(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? Qd(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return Jd(t, c, s, i / o), c;
  const u = Zd(s, t, o);
  if (i > 0) {
    let g, m;
    const p = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (fn(t, c, u, Ee(p) ? 0 : l - p, l), g = 0, m = i - 1; g < m; g++)
      fn(t, c, u, s[g], s[g + 1]);
    return fn(t, c, u, r, Ee(p) ? t.length : r + p), c;
  }
  return fn(t, c, u), c;
}
function Gd(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function Zd(e, t, a) {
  const n = eu(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = Tr(n);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function Qd(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function Jd(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function fn(e, t, a, n, o) {
  const s = De(n, 0), i = Math.min(De(o, e.length), e.length);
  let l = 0, r, c, u;
  for (a = Math.ceil(a), o && (r = o - n, a = r / Math.floor(r / a)), u = s; u < 0; )
    l++, u = Math.round(s + l * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(s + l * a));
}
function eu(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const tu = (e) => e === "left" ? "right" : e === "right" ? "left" : e, $s = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Ss = (e, t) => Math.min(t || e, e);
function Ms(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function au(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function nu(e, t) {
  Fe(e, (a) => {
    const n = a.gc, o = n.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete a.data[n[s]];
      n.splice(0, o);
    }
  });
}
function La(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Ds(e, t) {
  if (!e.display)
    return 0;
  const a = it(e.font, t), n = Ct(e.padding);
  return (Ze(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function ou(e, t) {
  return ma(e, {
    scale: t,
    type: "scale"
  });
}
function su(e, t, a) {
  return ma(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function iu(e, t, a) {
  let n = vo(e);
  return (a && t !== "right" || !a && t === "right") && (n = tu(n)), n;
}
function lu(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: u } = r;
  let g = 0, m, p, h;
  const b = i - o, v = l - s;
  if (e.isHorizontal()) {
    if (p = tt(n, s, l), Le(a)) {
      const y = Object.keys(a)[0], w = a[y];
      h = u[y].getPixelForValue(w) + b - t;
    } else a === "center" ? h = (c.bottom + c.top) / 2 + b - t : h = $s(e, a, t);
    m = l - s;
  } else {
    if (Le(a)) {
      const y = Object.keys(a)[0], w = a[y];
      p = u[y].getPixelForValue(w) - v + t;
    } else a === "center" ? p = (c.left + c.right) / 2 - v + t : p = $s(e, a, t);
    h = tt(n, i, o), g = a === "left" ? -Qe : Qe;
  }
  return {
    titleX: p,
    titleY: h,
    maxWidth: m,
    rotation: g
  };
}
class Da extends Wt {
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
    return t = Tt(t, Number.POSITIVE_INFINITY), a = Tt(a, Number.NEGATIVE_INFINITY), n = Tt(n, Number.POSITIVE_INFINITY), o = Tt(o, Number.NEGATIVE_INFINITY), {
      min: Tt(t, n),
      max: Tt(a, o),
      minDefined: wt(t),
      maxDefined: wt(a)
    };
  }
  getMinMax(t) {
    let { min: a, max: n, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: a,
        max: n
      };
    const l = this.getMatchingVisibleMetas();
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), o || (a = Math.min(a, i.min)), s || (n = Math.max(n, i.max));
    return a = s && a > n ? n : a, n = o && a > n ? a : n, {
      min: Tt(a, Tt(n, a)),
      max: Tt(n, Tt(a, n))
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
    je(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, a, n) {
    const { beginAtZero: o, grace: s, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = cc(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? Ms(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Xd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    je(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    je(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    je(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), je(this.options[t], [
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
    je(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let n, o, s;
    for (n = 0, o = t.length; n < o; n++)
      s = t[n], s.label = je(a.callback, [
        s.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    je(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    je(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, n = Ss(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const u = this._getLabelSizes(), g = u.widest.width, m = u.highest.height, p = st(this.chart.width - g, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / n : p / (n - 1), g + 6 > l && (l = p / (n - (t.offset ? 0.5 : 1)), r = this.maxHeight - La(t.grid) - a.padding - Ds(t.title, this.chart.options.font), c = Math.sqrt(g * g + m * m), i = Pr(Math.min(Math.asin(st((u.highest.height + 6) / l, -1, 1)), Math.asin(st(r / c, -1, 1)) - Math.asin(st(m / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    je(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    je(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: n, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = Ds(o, a.options.font);
      if (l ? (t.width = this.maxWidth, t.height = La(s) + r) : (t.height = this.maxHeight, t.width = La(s) + r), n.display && this.ticks.length) {
        const { first: c, last: u, widest: g, highest: m } = this._getLabelSizes(), p = n.padding * 2, h = zt(this.labelRotation), b = Math.cos(h), v = Math.sin(h);
        if (l) {
          const y = n.mirror ? 0 : v * g.width + b * m.height;
          t.height = Math.min(this.maxHeight, t.height + y + p);
        } else {
          const y = n.mirror ? 0 : b * g.width + v * m.height;
          t.width = Math.min(this.maxWidth, t.width + y + p);
        }
        this._calculatePadding(c, u, v, b);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, g = this.right - this.getPixelForTick(this.ticks.length - 1);
      let m = 0, p = 0;
      r ? c ? (m = o * t.width, p = n * a.height) : (m = n * t.height, p = o * a.width) : s === "start" ? p = a.width : s === "end" ? m = t.width : s !== "inner" && (m = t.width / 2, p = a.width / 2), this.paddingLeft = Math.max((m - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((p - g + i) * this.width / (this.width - g), 0);
    } else {
      let u = a.height / 2, g = t.height / 2;
      s === "start" ? (u = 0, g = t.height) : s === "end" && (u = a.height, g = 0), this.paddingTop = u + i, this.paddingBottom = g + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    je(this.options.afterFit, [
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
      Ee(t[a].label) && (t.splice(a, 1), n--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let n = this.ticks;
      a < n.length && (n = Ms(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(a / Ss(a, n));
    let c = 0, u = 0, g, m, p, h, b, v, y, w, _, k, $;
    for (g = 0; g < a; g += r) {
      if (h = t[g].label, b = this._resolveTickFontOptions(g), o.font = v = b.string, y = s[v] = s[v] || {
        data: {},
        gc: []
      }, w = b.lineHeight, _ = k = 0, !Ee(h) && !Ze(h))
        _ = ts(o, y.data, y.gc, _, h), k = w;
      else if (Ze(h))
        for (m = 0, p = h.length; m < p; ++m)
          $ = h[m], !Ee($) && !Ze($) && (_ = ts(o, y.data, y.gc, _, $), k += w);
      i.push(_), l.push(k), c = Math.max(_, c), u = Math.max(k, u);
    }
    nu(s, a);
    const S = i.indexOf(c), D = l.indexOf(u), P = (V) => ({
      width: i[V] || 0,
      height: l[V] || 0
    });
    return {
      first: P(0),
      last: P(a - 1),
      widest: P(S),
      highest: P(D),
      widths: i,
      heights: l
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
    return Er(this._alignToPixels ? ia(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = su(this.getContext(), t, n));
    }
    return this.$context || (this.$context = ou(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = zt(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * n > l * o ? l / n : r / o : r * o < l * n ? r / n : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), g = this.ticks.length + (r ? 1 : 0), m = La(s), p = [], h = l.setContext(this.getContext()), b = h.display ? h.width : 0, v = b / 2, y = function(Q) {
      return ia(n, Q, b);
    };
    let w, _, k, $, S, D, P, V, W, M, R, T;
    if (i === "top")
      w = y(this.bottom), D = this.bottom - m, V = w - v, M = y(t.top) + v, T = t.bottom;
    else if (i === "bottom")
      w = y(this.top), M = t.top, T = y(t.bottom) - v, D = w + v, V = this.top + m;
    else if (i === "left")
      w = y(this.right), S = this.right - m, P = w - v, W = y(t.left) + v, R = t.right;
    else if (i === "right")
      w = y(this.left), W = t.left, R = y(t.right) - v, S = w + v, P = this.left + m;
    else if (a === "x") {
      if (i === "center")
        w = y((t.top + t.bottom) / 2 + 0.5);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], re = i[Q];
        w = y(this.chart.scales[Q].getPixelForValue(re));
      }
      M = t.top, T = t.bottom, D = w + v, V = D + m;
    } else if (a === "y") {
      if (i === "center")
        w = y((t.left + t.right) / 2);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], re = i[Q];
        w = y(this.chart.scales[Q].getPixelForValue(re));
      }
      S = w - v, P = S - m, W = t.left, R = t.right;
    }
    const j = De(o.ticks.maxTicksLimit, g), H = Math.max(1, Math.ceil(g / j));
    for (_ = 0; _ < g; _ += H) {
      const Q = this.getContext(_), re = s.setContext(Q), de = l.setContext(Q), q = re.lineWidth, ae = re.color, L = de.dash || [], K = de.dashOffset, Y = re.tickWidth, z = re.tickColor, le = re.tickBorderDash || [], ce = re.tickBorderDashOffset;
      k = au(this, _, r), k !== void 0 && ($ = ia(n, k, q), c ? S = P = W = R = $ : D = V = M = T = $, p.push({
        tx1: S,
        ty1: D,
        tx2: P,
        ty2: V,
        x1: W,
        y1: M,
        x2: R,
        y2: T,
        width: q,
        color: ae,
        borderDash: L,
        borderDashOffset: K,
        tickWidth: Y,
        tickColor: z,
        tickBorderDash: le,
        tickBorderDashOffset: ce
      }));
    }
    return this._ticksLength = g, this._borderValue = w, p;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: u, mirror: g } = s, m = La(n.grid), p = m + u, h = g ? -u : p, b = -zt(this.labelRotation), v = [];
    let y, w, _, k, $, S, D, P, V, W, M, R, T = "middle";
    if (o === "top")
      S = this.bottom - h, D = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + h, D = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const H = this._getYAxisLabelAlignment(m);
      D = H.textAlign, $ = H.x;
    } else if (o === "right") {
      const H = this._getYAxisLabelAlignment(m);
      D = H.textAlign, $ = H.x;
    } else if (a === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + p;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        S = this.chart.scales[H].getPixelForValue(Q) + p;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - p;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        $ = this.chart.scales[H].getPixelForValue(Q);
      }
      D = this._getYAxisLabelAlignment(m).textAlign;
    }
    a === "y" && (r === "start" ? T = "top" : r === "end" && (T = "bottom"));
    const j = this._getLabelSizes();
    for (y = 0, w = l.length; y < w; ++y) {
      _ = l[y], k = _.label;
      const H = s.setContext(this.getContext(y));
      P = this.getPixelForTick(y) + s.labelOffset, V = this._resolveTickFontOptions(y), W = V.lineHeight, M = Ze(k) ? k.length : 1;
      const Q = M / 2, re = H.color, de = H.textStrokeColor, q = H.textStrokeWidth;
      let ae = D;
      i ? ($ = P, D === "inner" && (y === w - 1 ? ae = this.options.reverse ? "left" : "right" : y === 0 ? ae = this.options.reverse ? "right" : "left" : ae = "center"), o === "top" ? c === "near" || b !== 0 ? R = -M * W + W / 2 : c === "center" ? R = -j.highest.height / 2 - Q * W + W : R = -j.highest.height + W / 2 : c === "near" || b !== 0 ? R = W / 2 : c === "center" ? R = j.highest.height / 2 - Q * W : R = j.highest.height - M * W, g && (R *= -1), b !== 0 && !H.showLabelBackdrop && ($ += W / 2 * Math.sin(b))) : (S = P, R = (1 - M) * W / 2);
      let L;
      if (H.showLabelBackdrop) {
        const K = Ct(H.backdropPadding), Y = j.heights[y], z = j.widths[y];
        let le = R - K.top, ce = 0 - K.left;
        switch (T) {
          case "middle":
            le -= Y / 2;
            break;
          case "bottom":
            le -= Y;
            break;
        }
        switch (D) {
          case "center":
            ce -= z / 2;
            break;
          case "right":
            ce -= z;
            break;
          case "inner":
            y === w - 1 ? ce -= z : y > 0 && (ce -= z / 2);
            break;
        }
        L = {
          left: ce,
          top: le,
          width: z + K.width,
          height: Y + K.height,
          color: H.backdropColor
        };
      }
      v.push({
        label: k,
        font: V,
        textOffset: R,
        options: {
          rotation: b,
          color: re,
          strokeColor: de,
          strokeWidth: q,
          textAlign: ae,
          textBaseline: T,
          translation: [
            $,
            S
          ],
          backdrop: L
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-zt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return a.align === "start" ? o = "left" : a.align === "end" ? o = "right" : a.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: n, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), l = t + s, r = i.widest.width;
    let c, u;
    return a === "left" ? o ? (u = this.right + s, n === "near" ? c = "left" : n === "center" ? (c = "center", u += r / 2) : (c = "right", u += r)) : (u = this.right - l, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= r / 2) : (c = "left", u = this.left)) : a === "right" ? o ? (u = this.left + s, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= r / 2) : (c = "left", u -= r)) : (u = this.left + l, n === "near" ? c = "left" : n === "center" ? (c = "center", u += r / 2) : (c = "right", u = this.right)) : c = "right", {
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
    const l = (r, c, u) => {
      !u.width || !u.color || (n.save(), n.lineWidth = u.width, n.strokeStyle = u.color, n.setLineDash(u.borderDash || []), n.lineDashOffset = u.borderDashOffset, n.beginPath(), n.moveTo(r.x, r.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (a.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const r = o[s];
        a.drawOnChartArea && l({
          x: r.x1,
          y: r.y1
        }, {
          x: r.x2,
          y: r.y2
        }, r), a.drawTicks && l({
          x: r.tx1,
          y: r.ty1
        }, {
          x: r.tx2,
          y: r.ty2
        }, {
          color: r.tickColor,
          width: r.tickWidth,
          borderDash: r.tickBorderDash,
          borderDashOffset: r.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: a, options: { border: n, grid: o } } = this, s = n.setContext(this.getContext()), i = n.display ? s.width : 0;
    if (!i)
      return;
    const l = o.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, u, g, m;
    this.isHorizontal() ? (c = ia(t, this.left, i) - i / 2, u = ia(t, this.right, l) + l / 2, g = m = r) : (g = ia(t, this.top, i) - i / 2, m = ia(t, this.bottom, l) + l / 2, c = u = r), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, g), a.lineTo(u, m), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && ko(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, u = i.textOffset;
      Ga(n, c, 0, u, r, l);
    }
    o && _o(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = it(n.font), i = Ct(n.padding), l = n.align;
    let r = s.lineHeight / 2;
    a === "bottom" || a === "center" || Le(a) ? (r += i.bottom, Ze(n.text) && (r += s.lineHeight * (n.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: u, maxWidth: g, rotation: m } = lu(this, r, a, l);
    Ga(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: g,
      rotation: m,
      textAlign: iu(l, a, o),
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
    const t = this.options, a = t.ticks && t.ticks.z || 0, n = De(t.grid && t.grid.z, -1), o = De(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Da.prototype.draw ? [
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
      const l = a[s];
      l[n] === this.id && (!t || l.type === t) && o.push(l);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const a = this.options.ticks.setContext(this.getContext(t));
    return it(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class gn {
  constructor(t, a, n) {
    this.type = t, this.scope = a, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let n;
    du(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, ru(t, i, n), this.override && Ye.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ye[o] && (delete Ye[o][n], this.override && delete ga[n]);
  }
}
function ru(e, t, a) {
  const n = Ka(/* @__PURE__ */ Object.create(null), [
    a ? Ye.get(a) : {},
    Ye.get(t),
    e.defaults
  ]);
  Ye.set(t, n), e.defaultRoutes && cu(t, e.defaultRoutes), e.descriptors && Ye.describe(t, e.descriptors);
}
function cu(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), l = i.pop(), r = i.join(".");
    Ye.route(s, o, r, l);
  });
}
function du(e) {
  return "id" in e && "defaults" in e;
}
class uu {
  constructor() {
    this.controllers = new gn(Pn, "datasets", !0), this.elements = new gn(Wt, "elements"), this.plugins = new gn(Object, "plugins"), this.scales = new gn(Da, "scales"), this._typedRegistries = [
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
      n || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Fe(o, (i) => {
        const l = n || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, a, n) {
    const o = po(t);
    je(n["before" + o], [], n), a[t](n), je(n["after" + o], [], n);
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
var Lt = /* @__PURE__ */ new uu();
class hu {
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
      const i = s.plugin, l = i[n], r = [
        a,
        o,
        s.options
      ];
      if (je(l, r, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Ee(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const n = t && t.config, o = De(n.options && n.options.plugins, {}), s = fu(n);
    return o === !1 && !a ? [] : mu(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function fu(e) {
  const t = {}, a = [], n = Object.keys(Lt.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push(Lt.getPlugin(n[s]));
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
function gu(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function mu(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = gu(n[r], o);
    c !== null && s.push({
      plugin: l,
      options: pu(e.config, {
        plugin: l,
        local: a[r]
      }, c, i)
    });
  }
  return s;
}
function pu(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function so(e, t) {
  const a = Ye.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function bu(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function vu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function As(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function yu(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function io(e, ...t) {
  if (As(e))
    return e;
  for (const a of t) {
    const n = a.axis || yu(a.position) || e.length > 1 && As(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Ts(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function xu(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Ts(e, "x", a[0]) || Ts(e, "y", a[0]);
  }
  return {};
}
function ku(e, t) {
  const a = ga[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = so(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const l = n[i];
    if (!Le(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = io(i, l, xu(i, e), Ye.scales[l.type]), c = vu(r, o), u = a.scales || {};
    s[i] = za(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      u[r],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || so(l, t), u = (ga[l] || {}).scales || {};
    Object.keys(u).forEach((g) => {
      const m = bu(g, r), p = i[m + "AxisID"] || m;
      s[p] = s[p] || /* @__PURE__ */ Object.create(null), za(s[p], [
        {
          axis: m
        },
        n[p],
        u[g]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    za(l, [
      Ye.scales[l.type],
      Ye.scale
    ]);
  }), s;
}
function el(e) {
  const t = e.options || (e.options = {});
  t.plugins = De(t.plugins, {}), t.scales = ku(e, t);
}
function tl(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function _u(e) {
  return e = e || {}, e.data = tl(e.data), el(e), e;
}
const Bs = /* @__PURE__ */ new Map(), al = /* @__PURE__ */ new Set();
function mn(e, t) {
  let a = Bs.get(e);
  return a || (a = t(), Bs.set(e, a), al.add(a)), a;
}
const Ra = (e, t, a) => {
  const n = fa(t, a);
  n !== void 0 && e.add(n);
};
class wu {
  constructor(t) {
    this._config = _u(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = tl(t);
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
    this.clearCache(), el(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return mn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return mn(`${t}.transition.${a}`, () => [
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
    return mn(`${t}-${a}`, () => [
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
    return mn(`${n}-plugin-${a}`, () => [
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
    const { options: o, type: s } = this, i = this._cachedScopes(t, n), l = i.get(a);
    if (l)
      return l;
    const r = /* @__PURE__ */ new Set();
    a.forEach((u) => {
      t && (r.add(t), u.forEach((g) => Ra(r, t, g))), u.forEach((g) => Ra(r, o, g)), u.forEach((g) => Ra(r, ga[s] || {}, g)), u.forEach((g) => Ra(r, Ye, g)), u.forEach((g) => Ra(r, no, g));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), al.has(a) && i.set(a, c), c;
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
      no
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Ls(this._resolverCache, t, o);
    let r = i;
    if ($u(i, a)) {
      s.$shared = !1, n = ea(n) ? n() : n;
      const c = this.createResolver(t, n, l);
      r = $a(i, n, c);
    }
    for (const c of a)
      s[c] = r[c];
    return s;
  }
  createResolver(t, a, n = [
    ""
  ], o) {
    const { resolver: s } = Ls(this._resolverCache, t, n);
    return Le(a) ? $a(s, a, void 0, o) : s;
  }
}
function Ls(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: Co(t, a),
    subPrefixes: a.filter((l) => !l.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const Cu = (e) => Le(e) && Object.getOwnPropertyNames(e).some((t) => ea(e[t]));
function $u(e, t) {
  const { isScriptable: a, isIndexable: n } = Oi(e);
  for (const o of t) {
    const s = a(o), i = n(o), l = (i || s) && e[o];
    if (s && (ea(l) || Cu(l)) || i && Ze(l))
      return !0;
  }
  return !1;
}
var Su = "4.5.1";
const Mu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Rs(e, t) {
  return e === "top" || e === "bottom" || Mu.indexOf(e) === -1 && t === "x";
}
function Ps(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function Is(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), je(a && a.onComplete, [
    e
  ], t);
}
function Du(e) {
  const t = e.chart, a = t.options.animation;
  je(a && a.onProgress, [
    e
  ], t);
}
function nl(e) {
  return Mo() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const _n = {}, Es = (e) => {
  const t = nl(e);
  return Object.values(_n).filter((a) => a.canvas === t).pop();
};
function Au(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function Tu(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let ta = class {
  static defaults = Ye;
  static instances = _n;
  static overrides = ga;
  static registry = Lt;
  static version = Su;
  static getChart = Es;
  static register(...t) {
    Lt.add(...t), Fs();
  }
  static unregister(...t) {
    Lt.remove(...t), Fs();
  }
  constructor(t, a) {
    const n = this.config = new wu(a), o = nl(t), s = Es(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || qd(o))(), this.platform.updateConfig(n);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, u = r && r.width;
    if (this.id = kr(), this.ctx = l, this.canvas = r, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new hu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zr((g) => this.update(g), i.resizeDelay || 0), this._dataChanges = [], _n[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ft.listen(this, "complete", Is), Ft.listen(this, "progress", Du), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: n, height: o, _aspectRatio: s } = this;
    return Ee(t) ? a && s ? s : o ? n / o : null : t;
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
    return Lt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ss(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return as(this.canvas, this.ctx), this;
  }
  stop() {
    return Ft.stop(this), this;
  }
  resize(t, a) {
    Ft.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const n = this.options, o = this.canvas, s = n.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, a, s), l = n.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, ss(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), je(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    Fe(a, (n, o) => {
      n.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, o = Object.keys(n).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    a && (s = s.concat(Object.keys(a).map((i) => {
      const l = a[i], r = io(i, l), c = r === "r", u = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), Fe(s, (i) => {
      const l = i.options, r = l.id, c = io(r, l), u = De(l.type, i.dtype);
      (l.position === void 0 || Rs(l.position, c) !== Rs(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let g = null;
      if (r in n && n[r].type === u)
        g = n[r];
      else {
        const m = Lt.getScale(u);
        g = new m({
          id: r,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[g.id] = g;
      }
      g.init(l, t);
    }), Fe(o, (i, l) => {
      i || delete n[l];
    }), Fe(n, (i) => {
      xt.configure(this, i, i.options), xt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, n = t.length;
    if (t.sort((o, s) => o.index - s.index), n > a) {
      for (let o = a; o < n; ++o)
        this._destroyDatasetMeta(o);
      t.splice(a, n - a);
    }
    this._sortedMetasets = t.slice(0).sort(Ps("order", "index"));
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
      const l = s.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = l, i.indexAxis = s.indexAxis || so(l, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const r = Lt.getController(l), { datasetElementType: c, dataElementType: u } = Ye.datasets[l];
        Object.assign(r, {
          dataElementType: Lt.getElement(u),
          datasetElementType: c && Lt.getElement(c)
        }), i.controller = new r(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Fe(this.data.datasets, (t, a) => {
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
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: g } = this.getDatasetMeta(c), m = !o && s.indexOf(g) === -1;
      g.buildOrUpdateElements(m), i = Math.max(+g.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Fe(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Ps("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Fe(this.scales, (t) => {
      xt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Uo(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      Au(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!Uo(o, n(s)))
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
    xt.update(this, this.width, this.height, t);
    const a = this.chartArea, n = a.width <= 0 || a.height <= 0;
    this._layers = [], Fe(this.boxes, (o) => {
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
        this._updateDataset(a, ea(t) ? t({
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
    }) !== !1 && (Ft.has(this) ? this.attached && !Ft.running(this) && Ft.start(this) : (this.draw(), Is({
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
    }, o = Uc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && ko(a, o), t.controller.draw(), o && _o(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Xa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = Md.modes[a];
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
    Ua(a) ? (s.data[a].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), i.update(s, {
      visible: n
    }), this.update((l) => l.datasetIndex === t ? o : void 0));
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
    for (this.stop(), Ft.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), as(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete _n[this.id], this.notifyPlugins("afterDestroy");
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
    }, o = (s, i, l) => {
      s.offsetX = i, s.offsetY = l, this._eventHandler(s);
    };
    Fe(this.options.events, (s) => n(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, a = this.platform, n = (r, c) => {
      a.addEventListener(this, r, c), t[r] = c;
    }, o = (r, c) => {
      t[r] && (a.removeEventListener(this, r, c), delete t[r]);
    }, s = (r, c) => {
      this.canvas && this.resize(r, c);
    };
    let i;
    const l = () => {
      o("attach", l), this.attached = !0, this.resize(), n("resize", s), n("detach", i);
    };
    i = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), n("attach", l);
    }, a.isAttached(this.canvas) ? l() : i();
  }
  unbindEvents() {
    Fe(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, Fe(this._responsiveListeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, a, n) {
    const o = n ? "set" : "remove";
    let s, i, l, r;
    for (a === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const a = this._active || [], n = t.map(({ datasetIndex: s, index: i }) => {
      const l = this.getDatasetMeta(s);
      if (!l)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
        element: l.data[i],
        index: i
      };
    });
    !Cn(n, a) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, a));
  }
  notifyPlugins(t, a, n) {
    return this._plugins.notify(this, t, a, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, n) {
    const o = this.options.hover, s = (r, c) => r.filter((u) => !c.some((g) => u.datasetIndex === g.datasetIndex && u.index === g.index)), i = s(a, t), l = n ? t : s(t, a);
    i.length && this.updateHoverStyle(i, o.mode, !1), l.length && o.mode && this.updateHoverStyle(l, o.mode, !0);
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
    const { _active: o = [], options: s } = this, i = a, l = this._getActiveElements(t, o, n, i), r = Mr(t), c = Tu(t, this._lastEvent, n, r);
    n && (this._lastEvent = null, je(s.onHover, [
      t,
      l,
      this
    ], this), r && je(s.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Cn(l, o);
    return (u || a) && (this._active = l, this._updateHoverStyles(l, o, a)), this._lastEvent = c, u;
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
function Fs() {
  return Fe(ta.instances, (e) => e._plugins.invalidate());
}
function Bu(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: u } = r, g = Math.min(c / i, St(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + g / 2, a - g / 2), l > 0) {
    const m = Math.min(c / l, St(n - a));
    e.arc(o, s, l + c / 2, a - m / 2, n + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * St(n - a));
    if (u === "round")
      e.arc(o, s, m, a - Oe / 2, n + Oe / 2, !0);
    else if (u === "bevel") {
      const p = 2 * m * m, h = -p * Math.cos(a + Oe / 2) + o, b = -p * Math.sin(a + Oe / 2) + s, v = p * Math.cos(n + Oe / 2) + o, y = p * Math.sin(n + Oe / 2) + s;
      e.lineTo(h, b), e.lineTo(v, y);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Lu(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, n - c, a + c), r > o ? (c = o / r, e.arc(s, i, r, a + c, n - c, !0)) : e.arc(s, i, o, a + Qe, n - Qe), e.closePath(), e.clip();
}
function Ru(e) {
  return wo(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Pu(e, t, a, n) {
  const o = Ru(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), l = (r) => {
    const c = (a - Math.min(s, r)) * n / 2;
    return st(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: st(o.innerStart, 0, i),
    innerEnd: st(o.innerEnd, 0, i)
  };
}
function va(e, t, a, n) {
  return {
    x: a + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function Tn(e, t, a, n, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: u } = t, g = Math.max(t.outerRadius + n + a - c, 0), m = u > 0 ? u + n + a + c : 0;
  let p = 0;
  const h = o - r;
  if (n) {
    const H = u > 0 ? u - n : 0, Q = g > 0 ? g - n : 0, re = (H + Q) / 2, de = re !== 0 ? h * re / (re + n) : h;
    p = (h - de) / 2;
  }
  const b = Math.max(1e-3, h * g - a / Oe) / g, v = (h - b) / 2, y = r + v + p, w = o - v - p, { outerStart: _, outerEnd: k, innerStart: $, innerEnd: S } = Pu(t, m, g, w - y), D = g - _, P = g - k, V = y + _ / D, W = w - k / P, M = m + $, R = m + S, T = y + $ / M, j = w - S / R;
  if (e.beginPath(), s) {
    const H = (V + W) / 2;
    if (e.arc(i, l, g, V, H), e.arc(i, l, g, H, W), k > 0) {
      const q = va(P, W, i, l);
      e.arc(q.x, q.y, k, W, w + Qe);
    }
    const Q = va(R, w, i, l);
    if (e.lineTo(Q.x, Q.y), S > 0) {
      const q = va(R, j, i, l);
      e.arc(q.x, q.y, S, w + Qe, j + Math.PI);
    }
    const re = (w - S / m + (y + $ / m)) / 2;
    if (e.arc(i, l, m, w - S / m, re, !0), e.arc(i, l, m, re, y + $ / m, !0), $ > 0) {
      const q = va(M, T, i, l);
      e.arc(q.x, q.y, $, T + Math.PI, y - Qe);
    }
    const de = va(D, y, i, l);
    if (e.lineTo(de.x, de.y), _ > 0) {
      const q = va(D, V, i, l);
      e.arc(q.x, q.y, _, y - Qe, V);
    }
  } else {
    e.moveTo(i, l);
    const H = Math.cos(V) * g + i, Q = Math.sin(V) * g + l;
    e.lineTo(H, Q);
    const re = Math.cos(W) * g + i, de = Math.sin(W) * g + l;
    e.lineTo(re, de);
  }
  e.closePath();
}
function Iu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (s) {
    Tn(e, t, a, n, r, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ue || Ue));
  }
  return Tn(e, t, a, n, r, o), e.fill(), r;
}
function Eu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: u, borderDash: g, borderDashOffset: m, borderRadius: p } = r, h = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(g || []), e.lineDashOffset = m, h ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (s) {
    Tn(e, t, a, n, b, o);
    for (let v = 0; v < s; ++v)
      e.stroke();
    isNaN(l) || (b = i + (l % Ue || Ue));
  }
  h && Lu(e, t, b), r.selfJoin && b - i >= Oe && p === 0 && u !== "miter" && Bu(e, t, b), s || (Tn(e, t, a, n, b, o), e.stroke());
}
class Fu extends Wt {
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
    ], n), { angle: s, distance: i } = Ti(o, {
      x: t,
      y: a
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: u, circumference: g } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), m = (this.options.spacing + this.options.borderWidth) / 2, p = De(g, r - l), h = qa(s, l, r) && l !== r, b = p >= Ue || h, v = Xt(i, c + m, u + m);
    return b && v;
  }
  getCenterPoint(t) {
    const { x: a, y: n, startAngle: o, endAngle: s, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, u = (o + s) / 2, g = (i + l + c + r) / 2;
    return {
      x: a + Math.cos(u) * g,
      y: n + Math.sin(u) * g
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
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(Oe, n || 0)), c = o * r;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Iu(t, this, c, s, i), Eu(t, this, c, s, i), t.restore();
  }
}
function ol(e, t, a = t) {
  e.lineCap = De(a.borderCapStyle, t.borderCapStyle), e.setLineDash(De(a.borderDash, t.borderDash)), e.lineDashOffset = De(a.borderDashOffset, t.borderDashOffset), e.lineJoin = De(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = De(a.borderWidth, t.borderWidth), e.strokeStyle = De(a.borderColor, t.borderColor);
}
function Ou(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Vu(e) {
  return e.stepped ? ec : e.tension || e.cubicInterpolationMode === "monotone" ? tc : Ou;
}
function sl(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), u = o < i && s < i || o > l && s > l;
  return {
    count: n,
    start: r,
    loop: t.loop,
    ilen: c < r && !u ? n + c - r : c - r
  };
}
function zu(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = sl(o, a, n), u = Vu(s);
  let { move: g = !0, reverse: m } = n || {}, p, h, b;
  for (p = 0; p <= c; ++p)
    h = o[(l + (m ? c - p : p)) % i], !h.skip && (g ? (e.moveTo(h.x, h.y), g = !1) : u(e, b, h, m, s.stepped), b = h);
  return r && (h = o[(l + (m ? c : 0)) % i], u(e, b, h, m, s.stepped)), !!r;
}
function Nu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: l } = sl(o, a, n), { move: r = !0, reverse: c } = n || {};
  let u = 0, g = 0, m, p, h, b, v, y;
  const w = (k) => (i + (c ? l - k : k)) % s, _ = () => {
    b !== v && (e.lineTo(u, v), e.lineTo(u, b), e.lineTo(u, y));
  };
  for (r && (p = o[w(0)], e.moveTo(p.x, p.y)), m = 0; m <= l; ++m) {
    if (p = o[w(m)], p.skip)
      continue;
    const k = p.x, $ = p.y, S = k | 0;
    S === h ? ($ < b ? b = $ : $ > v && (v = $), u = (g * u + k) / ++g) : (_(), e.lineTo(k, $), h = S, g = 0, b = v = $), y = $;
  }
  _();
}
function lo(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Nu : zu;
}
function ju(e) {
  return e.stepped ? Rc : e.tension || e.cubicInterpolationMode === "monotone" ? Pc : da;
}
function Hu(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), ol(e, t.options), e.stroke(o);
}
function Wu(e, t, a, n) {
  const { segments: o, options: s } = t, i = lo(t);
  for (const l of o)
    ol(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Ku = typeof Path2D == "function";
function Uu(e, t, a, n) {
  Ku && !t.options.segment ? Hu(e, t, a, n) : Wu(e, t, a, n);
}
class Yu extends Wt {
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
      $c(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = jc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = Vc(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = ju(n);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: g, end: m } = i[c], p = s[g], h = s[m];
      if (p === h) {
        l.push(p);
        continue;
      }
      const b = Math.abs((o - p[a]) / (h[a] - p[a])), v = r(p, h, b, n.stepped);
      v[a] = t[a], l.push(v);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, a, n) {
    return lo(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = lo(this);
    let i = this._loop;
    a = a || 0, n = n || this.points.length - a;
    for (const l of o)
      i &= s(t, this, l, {
        start: a,
        end: a + n - 1
      });
    return !!i;
  }
  draw(t, a, n, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (t.save(), Uu(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Os(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class qu extends Wt {
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
    return Os(this, t, "x", a);
  }
  inYRange(t, a) {
    return Os(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !Xa(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, oo(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function il(e, t) {
  const { x: a, y: n, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, u, g;
  return e.horizontal ? (g = i / 2, l = Math.min(a, o), r = Math.max(a, o), c = n - g, u = n + g) : (g = s / 2, l = a - g, r = a + g, c = Math.min(n, o), u = Math.max(n, o)), {
    left: l,
    top: c,
    right: r,
    bottom: u
  };
}
function Zt(e, t, a, n) {
  return e ? 0 : st(t, a, n);
}
function Xu(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = Fi(n);
  return {
    t: Zt(o.top, s.top, 0, a),
    r: Zt(o.right, s.right, 0, t),
    b: Zt(o.bottom, s.bottom, 0, a),
    l: Zt(o.left, s.left, 0, t)
  };
}
function Gu(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = _a(o), i = Math.min(t, a), l = e.borderSkipped, r = n || Le(o);
  return {
    topLeft: Zt(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Zt(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Zt(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Zt(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function Zu(e) {
  const t = il(e), a = t.right - t.left, n = t.bottom - t.top, o = Xu(e, a / 2, n / 2), s = Gu(e, a / 2, n / 2);
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
function Xn(e, t, a, n) {
  const o = t === null, s = a === null, l = e && !(o && s) && il(e, n);
  return l && (o || Xt(t, l.left, l.right)) && (s || Xt(a, l.top, l.bottom));
}
function Qu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Ju(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Gn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, o = e.y !== a.y ? -t : 0, s = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - o;
  return {
    x: e.x + n,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class eh extends Wt {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = Zu(this), l = Qu(i.radius) ? Mn : Ju;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, Gn(i, a, s)), t.clip(), l(t, Gn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), l(t, Gn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return Xn(this, t, a, n);
  }
  inXRange(t, a) {
    return Xn(this, t, null, a);
  }
  inYRange(t, a) {
    return Xn(this, null, t, a);
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
const Vs = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, th = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class zs extends Wt {
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
    let a = je(t.generateLabels, [
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
    const n = t.labels, o = it(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = Vs(n, s);
    let c, u;
    a.font = o.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, s, l, r) + 10) : (u = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = o + l;
    let g = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let m = -1, p = -u;
    return this.legendItems.forEach((h, b) => {
      const v = n + a / 2 + s.measureText(h.text).width;
      (b === 0 || c[c.length - 1] + v + 2 * l > i) && (g += u, c[c.length - (b > 0 ? 0 : 1)] = 0, p += u, m++), r[b] = {
        left: 0,
        top: p,
        row: m,
        width: v,
        height: o
      }, c[c.length - 1] += v + l;
    }), g;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let g = l, m = 0, p = 0, h = 0, b = 0;
    return this.legendItems.forEach((v, y) => {
      const { itemWidth: w, itemHeight: _ } = ah(n, a, s, v, o);
      y > 0 && p + _ + 2 * l > u && (g += m + l, c.push({
        width: m,
        height: p
      }), h += m + l, b++, m = p = 0), r[y] = {
        left: h,
        top: p,
        col: b,
        width: w,
        height: _
      }, m = Math.max(m, w), p += _ + l;
    }), g += m, c.push({
      width: m,
      height: p
    }), g;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: n, labels: { padding: o }, rtl: s } } = this, i = wa(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = tt(n, this.left + o, this.right - this.lineWidths[l]);
      for (const c of a)
        l !== c.row && (l = c.row, r = tt(n, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = tt(n, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of a)
        c.col !== l && (l = c.col, r = tt(n, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ko(t, this), this._draw(), _o(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, l = Ye.color, r = wa(t.rtl, this.left, this.width), c = it(i.font), { padding: u } = i, g = c.size, m = g / 2;
    let p;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: h, boxHeight: b, itemHeight: v } = Vs(i, g), y = function(S, D, P) {
      if (isNaN(h) || h <= 0 || isNaN(b) || b < 0)
        return;
      o.save();
      const V = De(P.lineWidth, 1);
      if (o.fillStyle = De(P.fillStyle, l), o.lineCap = De(P.lineCap, "butt"), o.lineDashOffset = De(P.lineDashOffset, 0), o.lineJoin = De(P.lineJoin, "miter"), o.lineWidth = V, o.strokeStyle = De(P.strokeStyle, l), o.setLineDash(De(P.lineDash, [])), i.usePointStyle) {
        const W = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: P.pointStyle,
          rotation: P.rotation,
          borderWidth: V
        }, M = r.xPlus(S, h / 2), R = D + m;
        Ei(o, W, M, R, i.pointStyleWidth && h);
      } else {
        const W = D + Math.max((g - b) / 2, 0), M = r.leftForLtr(S, h), R = _a(P.borderRadius);
        o.beginPath(), Object.values(R).some((T) => T !== 0) ? Mn(o, {
          x: M,
          y: W,
          w: h,
          h: b,
          radius: R
        }) : o.rect(M, W, h, b), o.fill(), V !== 0 && o.stroke();
      }
      o.restore();
    }, w = function(S, D, P) {
      Ga(o, P.text, S, D + v / 2, c, {
        strikethrough: P.hidden,
        textAlign: r.textAlign(P.textAlign)
      });
    }, _ = this.isHorizontal(), k = this._computeTitleHeight();
    _ ? p = {
      x: tt(s, this.left + u, this.right - n[0]),
      y: this.top + u + k,
      line: 0
    } : p = {
      x: this.left + u,
      y: tt(s, this.top + k + u, this.bottom - a[0].height),
      line: 0
    }, Hi(this.ctx, t.textDirection);
    const $ = v + u;
    this.legendItems.forEach((S, D) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const P = o.measureText(S.text).width, V = r.textAlign(S.textAlign || (S.textAlign = i.textAlign)), W = h + m + P;
      let M = p.x, R = p.y;
      r.setWidth(this.width), _ ? D > 0 && M + W + u > this.right && (R = p.y += $, p.line++, M = p.x = tt(s, this.left + u, this.right - n[p.line])) : D > 0 && R + $ > this.bottom && (M = p.x = M + a[p.line].width + u, p.line++, R = p.y = tt(s, this.top + k + u, this.bottom - a[p.line].height));
      const T = r.x(M);
      if (y(T, R, S), M = Nr(V, M + h + m, _ ? M + W : this.right, t.rtl), w(r.x(M), R, S), _)
        p.x += W + u;
      else if (typeof S.text != "string") {
        const j = c.lineHeight;
        p.y += ll(S, j) + u;
      } else
        p.y += $;
    }), Wi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = it(a.font), o = Ct(a.padding);
    if (!a.display)
      return;
    const s = wa(t.rtl, this.left, this.width), i = this.ctx, l = a.position, r = n.size / 2, c = o.top + r;
    let u, g = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), u = this.top + c, g = tt(t.align, g, this.right - m);
    else {
      const h = this.columnSizes.reduce((b, v) => Math.max(b, v.height), 0);
      u = c + tt(t.align, this.top, this.bottom - h - t.labels.padding - this._computeTitleHeight());
    }
    const p = tt(l, g, g + m);
    i.textAlign = s.textAlign(vo(l)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Ga(i, a.text, p, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = it(t.font), n = Ct(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, o, s;
    if (Xt(t, this.left, this.right) && Xt(a, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, n = 0; n < s.length; ++n)
        if (o = s[n], Xt(t, o.left, o.left + o.width) && Xt(a, o.top, o.top + o.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!sh(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = th(o, n);
      o && !s && je(a.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = n, n && !s && je(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && je(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function ah(e, t, a, n, o) {
  const s = nh(n, e, t, a), i = oh(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function nh(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function oh(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = ll(t, a)), n;
}
function ll(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function sh(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var To = {
  id: "legend",
  _element: zs,
  start(e, t, a) {
    const n = e.legend = new zs({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    xt.configure(e, n, a), xt.addBox(e, n);
  },
  stop(e) {
    xt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const n = e.legend;
    xt.configure(e, n, a), n.options = a;
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
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(a ? 0 : void 0), u = Ct(c.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: o || c.textAlign,
            borderRadius: i && (l || c.borderRadius),
            datasetIndex: r.index
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
class rl extends Wt {
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
    const o = Ze(n.text) ? n.text.length : 1;
    this._padding = Ct(n.padding);
    const s = o * it(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: n, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, u, g;
    return this.isHorizontal() ? (u = tt(l, n, s), g = a + t, c = s - n) : (i.position === "left" ? (u = n + t, g = tt(l, o, a), r = Oe * -0.5) : (u = s - t, g = tt(l, a, o), r = Oe * 0.5), c = o - a), {
      titleX: u,
      titleY: g,
      maxWidth: c,
      rotation: r
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const n = it(a.font), s = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Ga(t, a.text, 0, 0, n, {
      color: a.color,
      maxWidth: r,
      rotation: c,
      textAlign: vo(a.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function ih(e, t) {
  const a = new rl({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  xt.configure(e, a, t), xt.addBox(e, a), e.titleBlock = a;
}
var cl = {
  id: "title",
  _element: rl,
  start(e, t, a) {
    ih(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    xt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const n = e.titleBlock;
    xt.configure(e, n, a), n.options = a;
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
const Va = {
  average(e) {
    if (!e.length)
      return !1;
    let t, a, n = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, a = e.length; t < a; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        n.add(r.x), o += r.y, ++s;
      }
    }
    return s === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((l, r) => l + r) / n.size,
      y: o / s
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let a = t.x, n = t.y, o = Number.POSITIVE_INFINITY, s, i, l;
    for (s = 0, i = e.length; s < i; ++s) {
      const r = e[s].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), u = ao(t, c);
        u < o && (o = u, l = r);
      }
    }
    if (l) {
      const r = l.tooltipPosition();
      a = r.x, n = r.y;
    }
    return {
      x: a,
      y: n
    };
  }
};
function Bt(e, t) {
  return t && (Ze(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Ot(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function lh(e, t) {
  const { element: a, datasetIndex: n, index: o } = t, s = e.getDatasetMeta(n).controller, { label: i, value: l } = s.getLabelAndValue(o);
  return {
    chart: e,
    label: i,
    parsed: s.getParsed(o),
    raw: e.data.datasets[n].data[o],
    formattedValue: l,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: n,
    element: a
  };
}
function Ns(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = it(t.bodyFont), c = it(t.titleFont), u = it(t.footerFont), g = s.length, m = o.length, p = n.length, h = Ct(t.padding);
  let b = h.height, v = 0, y = n.reduce((k, $) => k + $.before.length + $.lines.length + $.after.length, 0);
  if (y += e.beforeBody.length + e.afterBody.length, g && (b += g * c.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const k = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    b += p * k + (y - p) * r.lineHeight + (y - 1) * t.bodySpacing;
  }
  m && (b += t.footerMarginTop + m * u.lineHeight + (m - 1) * t.footerSpacing);
  let w = 0;
  const _ = function(k) {
    v = Math.max(v, a.measureText(k).width + w);
  };
  return a.save(), a.font = c.string, Fe(e.title, _), a.font = r.string, Fe(e.beforeBody.concat(e.afterBody), _), w = t.displayColors ? i + 2 + t.boxPadding : 0, Fe(n, (k) => {
    Fe(k.before, _), Fe(k.lines, _), Fe(k.after, _);
  }), w = 0, a.font = u.string, Fe(e.footer, _), a.restore(), v += h.width, {
    width: v,
    height: b
  };
}
function rh(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function ch(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function dh(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return n === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), ch(c, e, t, a) && (c = "center"), c;
}
function js(e, t, a) {
  const n = a.yAlign || t.yAlign || rh(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || dh(e, t, a, n),
    yAlign: n
  };
}
function uh(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function hh(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Hs(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = a, c = o + s, { topLeft: u, topRight: g, bottomLeft: m, bottomRight: p } = _a(i);
  let h = uh(t, l);
  const b = hh(t, r, c);
  return r === "center" ? l === "left" ? h += c : l === "right" && (h -= c) : l === "left" ? h -= Math.max(u, m) + o : l === "right" && (h += Math.max(g, p) + o), {
    x: st(h, 0, n.width - t.width),
    y: st(b, 0, n.height - t.height)
  };
}
function pn(e, t, a) {
  const n = Ct(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Ws(e) {
  return Bt([], Ot(e));
}
function fh(e, t, a) {
  return ma(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function Ks(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const dl = {
  beforeTitle: Et,
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
  afterTitle: Et,
  beforeBody: Et,
  beforeLabel: Et,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return Ee(a) || (t += a), t;
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
  afterLabel: Et,
  afterBody: Et,
  beforeFooter: Et,
  footer: Et,
  afterFooter: Et
};
function dt(e, t, a, n) {
  const o = e[t].call(a, n);
  return typeof o > "u" ? dl[t].call(a, n) : o;
}
class Us extends Wt {
  static positioners = Va;
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new Ui(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = fh(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = dt(n, "beforeTitle", this, t), s = dt(n, "title", this, t), i = dt(n, "afterTitle", this, t);
    let l = [];
    return l = Bt(l, Ot(o)), l = Bt(l, Ot(s)), l = Bt(l, Ot(i)), l;
  }
  getBeforeBody(t, a) {
    return Ws(dt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Fe(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Ks(n, s);
      Bt(i.before, Ot(dt(l, "beforeLabel", this, s))), Bt(i.lines, dt(l, "label", this, s)), Bt(i.after, Ot(dt(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Ws(dt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = dt(n, "beforeFooter", this, t), s = dt(n, "footer", this, t), i = dt(n, "afterFooter", this, t);
    let l = [];
    return l = Bt(l, Ot(o)), l = Bt(l, Ot(s)), l = Bt(l, Ot(i)), l;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = a.length; r < c; ++r)
      l.push(lh(this.chart, a[r]));
    return t.filter && (l = l.filter((u, g, m) => t.filter(u, g, m, n))), t.itemSort && (l = l.sort((u, g) => t.itemSort(u, g, n))), Fe(l, (u) => {
      const g = Ks(t.callbacks, u);
      o.push(dt(g, "labelColor", this, u)), s.push(dt(g, "labelPointStyle", this, u)), i.push(dt(g, "labelTextColor", this, u));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, a) {
    const n = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const l = Va[n.position].call(this, o, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const r = this._size = Ns(this, n), c = Object.assign({}, l, r), u = js(this.chart, n, c), g = Hs(n, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, s = {
        opacity: 1,
        x: g.x,
        y: g.y,
        width: r.width,
        height: r.height,
        caretX: l.x,
        caretY: l.y
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = n, { topLeft: r, topRight: c, bottomLeft: u, bottomRight: g } = _a(l), { x: m, y: p } = t, { width: h, height: b } = a;
    let v, y, w, _, k, $;
    return s === "center" ? (k = p + b / 2, o === "left" ? (v = m, y = v - i, _ = k + i, $ = k - i) : (v = m + h, y = v + i, _ = k - i, $ = k + i), w = v) : (o === "left" ? y = m + Math.max(r, u) + i : o === "right" ? y = m + h - Math.max(c, g) - i : y = this.caretX, s === "top" ? (_ = p, k = _ - i, v = y - i, w = y + i) : (_ = p + b, k = _ + i, v = y + i, w = y - i), $ = _), {
      x1: v,
      x2: y,
      x3: w,
      y1: _,
      y2: k,
      y3: $
    };
  }
  drawTitle(t, a, n) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = wa(n.rtl, this.x, this.width);
      for (t.x = pn(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = it(n.titleFont), l = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, r = 0; r < s; ++r)
        a.fillText(o[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === s && (t.y += n.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, a, n, o, s) {
    const i = this.labelColors[n], l = this.labelPointStyles[n], { boxHeight: r, boxWidth: c } = s, u = it(s.bodyFont), g = pn(this, "left", s), m = o.x(g), p = r < u.lineHeight ? (u.lineHeight - r) / 2 : 0, h = a.y + p;
    if (s.usePointStyle) {
      const b = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = o.leftForLtr(m, c) + c / 2, y = h + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, oo(t, b, v, y), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, oo(t, b, v, y);
    } else {
      t.lineWidth = Le(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = o.leftForLtr(m, c), v = o.leftForLtr(o.xPlus(m, 1), c - 2), y = _a(i.borderRadius);
      Object.values(y).some((w) => w !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, Mn(t, {
        x: b,
        y: h,
        w: c,
        h: r,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Mn(t, {
        x: v,
        y: h + 1,
        w: c - 2,
        h: r - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(b, h, c, r), t.strokeRect(b, h, c, r), t.fillStyle = i.backgroundColor, t.fillRect(v, h + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: u } = n, g = it(n.bodyFont);
    let m = g.lineHeight, p = 0;
    const h = wa(n.rtl, this.x, this.width), b = function(P) {
      a.fillText(P, h.x(t.x + p), t.y + m / 2), t.y += m + s;
    }, v = h.textAlign(i);
    let y, w, _, k, $, S, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = g.string, t.x = pn(this, v, n), a.fillStyle = n.bodyColor, Fe(this.beforeBody, b), p = l && v !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, k = 0, S = o.length; k < S; ++k) {
      for (y = o[k], w = this.labelTextColors[k], a.fillStyle = w, Fe(y.before, b), _ = y.lines, l && _.length && (this._drawColorBox(a, t, k, h, n), m = Math.max(g.lineHeight, r)), $ = 0, D = _.length; $ < D; ++$)
        b(_[$]), m = g.lineHeight;
      Fe(y.after, b);
    }
    p = 0, m = g.lineHeight, Fe(this.afterBody, b), t.y -= s;
  }
  drawFooter(t, a, n) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = wa(n.rtl, this.x, this.width);
      for (t.x = pn(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = r.textAlign(n.footerAlign), a.textBaseline = "middle", i = it(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, l = 0; l < s; ++l)
        a.fillText(o[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, a, n, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: u } = n, { topLeft: g, topRight: m, bottomLeft: p, bottomRight: h } = _a(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(l + g, r), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(l + c - m, r), a.quadraticCurveTo(l + c, r, l + c, r + m), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(l + c, r + u - h), a.quadraticCurveTo(l + c, r + u, l + c - h, r + u), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(l + p, r + u), a.quadraticCurveTo(l, r + u, l, r + u - p), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(l, r + g), a.quadraticCurveTo(l, r, l + g, r), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Va[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = Ns(this, t), r = Object.assign({}, i, this._size), c = js(a, t, r), u = Hs(t, r, c, a);
      (o._to !== u.x || s._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
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
    const i = Ct(a.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && l && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), Hi(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Wi(t, a.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, a) {
    const n = this._active, o = t.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), s = !Cn(n, o), i = this._positionChanged(o, a);
    (s || i) && (this._active = o, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, n = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, a, n), l = this._positionChanged(i, t), r = a || !Cn(i, s) || l;
    return r && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, a))), r;
  }
  _getActiveElements(t, a, n, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!o)
      return a.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, s.mode, s, n);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(t, a) {
    const { caretX: n, caretY: o, options: s } = this, i = Va[s.position].call(this, t, a);
    return i !== !1 && (n !== i.x || o !== i.y);
  }
}
var Bo = {
  id: "tooltip",
  _element: Us,
  positioners: Va,
  afterInit(e, t, a) {
    a && (e.tooltip = new Us({
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
    callbacks: dl
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
const gh = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function mh(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return gh(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const ph = (e, t) => e === null ? null : st(Math.round(e), 0, t);
function Ys(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class ul extends Da {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Ys
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
    if (Ee(t))
      return null;
    const n = this.getLabels();
    return a = isFinite(a) && n[a] === t ? a : mh(n, t, De(a, t), this._addedLabels), ph(a, n.length - 1);
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
    return Ys.call(this, t);
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
function bh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: u, maxDigits: g, includeBounds: m } = e, p = s || 1, h = u - 1, { min: b, max: v } = t, y = !Ee(i), w = !Ee(l), _ = !Ee(c), k = (v - b) / (g + 1);
  let $ = qo((v - b) / h / p) * p, S, D, P, V;
  if ($ < 1e-14 && !y && !w)
    return [
      {
        value: b
      },
      {
        value: v
      }
    ];
  V = Math.ceil(v / $) - Math.floor(b / $), V > h && ($ = qo(V * $ / h / p) * p), Ee(r) || (S = Math.pow(10, r), $ = Math.ceil($ * S) / S), o === "ticks" ? (D = Math.floor(b / $) * $, P = Math.ceil(v / $) * $) : (D = b, P = v), y && w && s && Lr((l - i) / s, $ / 1e3) ? (V = Math.round(Math.min((l - i) / $, u)), $ = (l - i) / V, D = i, P = l) : _ ? (D = y ? i : D, P = w ? l : P, V = c - 1, $ = (P - D) / V) : (V = (P - D) / $, Na(V, Math.round(V), $ / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const W = Math.max(Xo($), Xo(D));
  S = Math.pow(10, Ee(r) ? W : r), D = Math.round(D * S) / S, P = Math.round(P * S) / S;
  let M = 0;
  for (y && (m && D !== i ? (a.push({
    value: i
  }), D < i && M++, Na(Math.round((D + M * $) * S) / S, i, qs(i, k, e)) && M++) : D < i && M++); M < V; ++M) {
    const R = Math.round((D + M * $) * S) / S;
    if (w && R > l)
      break;
    a.push({
      value: R
    });
  }
  return w && m && P !== l ? a.length && Na(a[a.length - 1].value, l, qs(l, k, e)) ? a[a.length - 1].value = l : a.push({
    value: l
  }) : (!w || P === l) && a.push({
    value: P
  }), a;
}
function qs(e, t, { horizontal: a, minRotation: n }) {
  const o = zt(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class vh extends Da {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return Ee(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: n } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = a ? o : r, l = (r) => s = n ? s : r;
    if (t) {
      const r = Pt(o), c = Pt(s);
      r < 0 && c < 0 ? l(0) : r > 0 && c > 0 && i(0);
    }
    if (o === s) {
      let r = s === 0 ? 1 : Math.abs(s * 0.05);
      l(s + r), t || i(o - r);
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
    }, s = this._range || this, i = bh(o, s);
    return t.bounds === "ticks" && Rr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return xo(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class hl extends vh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Ii.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = wt(t) ? t : 0, this.max = wt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = zt(this.options.ticks.minRotation), o = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const En = {
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
}, ht = /* @__PURE__ */ Object.keys(En);
function Xs(e, t) {
  return e - t;
}
function Gs(e, t) {
  if (Ee(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), wt(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (Ya(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function Zs(e, t, a, n) {
  const o = ht.length;
  for (let s = ht.indexOf(e); s < o - 1; ++s) {
    const i = En[ht[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (l * i.size)) <= n)
      return ht[s];
  }
  return ht[o - 1];
}
function yh(e, t, a, n, o) {
  for (let s = ht.length - 1; s >= ht.indexOf(a); s--) {
    const i = ht[s];
    if (En[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return ht[a ? ht.indexOf(a) : 0];
}
function xh(e) {
  for (let t = ht.indexOf(e) + 1, a = ht.length; t < a; ++t)
    if (En[ht[t]].common)
      return ht[t];
}
function Qs(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = bo(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function kh(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, n))
    r = a[l], r >= 0 && (t[r].major = !0);
  return t;
}
function Js(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, n.push({
      value: l,
      major: !1
    });
  return s === 0 || !a ? n : kh(e, n, o, a);
}
class ei extends Da {
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
    const n = t.time || (t.time = {}), o = this._adapter = new _d._date(t.adapters.date);
    o.init(a), za(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : Gs(this, t);
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
    let { min: o, max: s, minDefined: i, maxDefined: l } = this.getUserBounds();
    function r(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !l && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), o = wt(o) && !isNaN(o) ? o : +a.startOf(Date.now(), n), s = wt(s) && !isNaN(s) ? s : +a.endOf(Date.now(), n) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, l = Or(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? Zs(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : yh(this, l.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : xh(this._unit), this.initOffsets(o), t.reverse && l.reverse(), Js(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, n = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - o : a = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = s : n = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = st(a, 0, i), n = st(n, 0, i), this._offsets = {
      start: a,
      end: n,
      factor: 1 / (a + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || Zs(s.minUnit, a, n, this._getLabelCapacity(a)), l = De(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = Ya(r) || r === !0, u = {};
    let g = a, m, p;
    if (c && (g = +t.startOf(g, "isoWeek", r)), g = +t.startOf(g, c ? "day" : i), t.diff(n, a, i) > 1e5 * l)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + l + " " + i);
    const h = o.ticks.source === "data" && this.getDataTimestamps();
    for (m = g, p = 0; m < n; m = +t.add(m, l, i), p++)
      Qs(u, m, h);
    return (m === n || o.bounds === "ticks" || p === 1) && Qs(u, m, h), Object.keys(u).sort(Xs).map((b) => +b);
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
      return je(i, [
        t,
        a,
        n
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, u = r && l[r], g = c && l[c], m = n[a], p = c && g && m && m.major;
    return this._adapter.format(t, o || (p ? g : u));
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = zt(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: n * s + l * i,
      h: n * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, Js(this, [
      t
    ], this._majorUnit), o), i = this._getLabelSize(s), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
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
      t.push(Gs(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Li(t.sort(Xs));
  }
}
function bn(e, t, a) {
  let n = 0, o = e.length - 1, s, i, l, r;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ua(e, "pos", t)), { pos: s, time: l } = e[n], { pos: i, time: r } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ua(e, "time", t)), { time: s, pos: l } = e[n], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class G3 extends ei {
  static id = "timeseries";
  static defaults = ei.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = bn(a, this.min), this._tableRange = bn(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: n } = this, o = [], s = [];
    let i, l, r, c, u;
    for (i = 0, l = t.length; i < l; ++i)
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
    for (i = 0, l = o.length; i < l; ++i)
      u = o[i + 1], r = o[i - 1], c = o[i], Math.round((u + r) / 2) !== c && s.push({
        time: c,
        pos: i / (l - 1)
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
    return (bn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return bn(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const fl = {
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
}, _h = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, wh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...fl,
  ..._h
}, Ch = Ul[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ya(e) {
  return ki(e) ? Jn(e) : e;
}
function $h(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ki(t) ? new Proxy(e, {}) : e;
}
function Sh(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function gl(e, t) {
  e.labels = t;
}
function ml(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function Mh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return gl(a, e.labels), ml(a, e.datasets, t), a;
}
const Dh = fe({
  props: wh,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = oe(null), s = xi(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: g, plugins: m, datasetIdKey: p } = e, h = Mh(u, p), b = $h(h, u);
      s.value = new ta(o.value, {
        type: c,
        data: b,
        options: {
          ...g
        },
        plugins: m
      });
    }, l = () => {
      const c = Jn(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return Je(i), lt(l), Te([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [g, m] = c, [p, h] = u;
      const b = Jn(s.value);
      if (!b)
        return;
      let v = !1;
      if (g) {
        const y = ya(g), w = ya(p);
        y && y !== w && (Sh(b, y), v = !0);
      }
      if (m) {
        const y = ya(m.labels), w = ya(h.labels), _ = ya(m.datasets), k = ya(h.datasets);
        y !== w && (gl(b.config.data, y), v = !0), _ && _ !== k && (ml(b.config.data, _, e.datasetIdKey), v = !0);
      }
      v && Ke(() => {
        r(b);
      });
    }, {
      deep: !0
    }), () => He("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      He("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function Lo(e, t) {
  return ta.register(t), fe({
    props: fl,
    setup(a, n) {
      let { expose: o } = n;
      const s = xi(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => He(Dh, Ch({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Ah = /* @__PURE__ */ Lo("bar", bd), Th = /* @__PURE__ */ Lo("line", xd), Bh = /* @__PURE__ */ Lo("pie", kd), ti = {
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
}, ai = {
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
}, Lh = [
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
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? ai : ti), l = () => {
    typeof document > "u" || (t.value = n(), a = new MutationObserver((c) => {
      for (const u of c)
        u.attributeName === "class" && (t.value = n());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, r = () => {
    a && (a.disconnect(), a = null);
  };
  return Je(() => {
    l();
  }), lt(() => {
    r();
  }), e && Te(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: ti,
    darkColors: ai,
    chartSeriesColors: Lh
  };
}
const Qa = 5, Ro = 8, Rh = /^x\d*$/, Ph = /^y\d*$/;
function pl(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (Rh.test(o) && (r.maxTicksLimit = Ro, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), Ph.test(o)) {
      if (i.type === "category") {
        i.ticks = r, n[o] = i;
        continue;
      }
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), u = Number(i.max ?? i.suggestedMax ?? 0), g = Number(r.stepSize);
        u > c && g > 0 ? r.maxTicksLimit = Math.floor((u - c) / g) + 1 : r.maxTicksLimit = Qa;
      } else
        r.maxTicksLimit = Qa;
    }
    i.ticks = r, n[o] = i;
  }
  return t.scales = n, t;
}
const ut = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ih = ["titleFont", "bodyFont", "footerFont"];
function bl(e, t = ut) {
  if (!e || typeof e != "object") return e;
  const a = { ...e }, n = typeof a.font == "object" && a.font !== null ? a.font : {};
  if (a.font = { ...n, family: t }, a.scales && typeof a.scales == "object") {
    const o = { ...a.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const u = { ...r }, g = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...g, family: t }, l.ticks = u;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const u = { ...c }, g = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...g, family: t }, l.title = u;
      }
      o[s] = l;
    }
    a.scales = o;
  }
  if (a.plugins && typeof a.plugins == "object") {
    const o = { ...a.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const l = { ...s }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, u = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...u, family: t }, l.labels = c;
      }
      o.legend = l;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of Ih) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    a.plugins = o;
  }
  return a;
}
const ni = 10, Eh = /* @__PURE__ */ fe({
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
    ta.register(ul, hl, eh, cl, Bo, To), ta.defaults.font.family = ut;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m) => typeof m != "string" ? m : a.uppercaseLegendLabels ? m.toUpperCase() : i(m), r = (m, p) => m.length <= p ? m : `${m.slice(0, Math.max(1, p - 1))}…`;
    function c(m, p) {
      if (p == null) return m;
      if (Array.isArray(p) || typeof p != "object" || m == null || Array.isArray(m) || typeof m != "object") return p;
      const h = { ...m };
      for (const b of Object.keys(p)) {
        const v = p[b];
        v !== void 0 && (h[b] = c(m[b], v));
      }
      return h;
    }
    const u = C(() => {
      const m = {
        font: {
          family: ut
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
                family: ut,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: ni,
              boxHeight: ni,
              usePointStyle: !1,
              generateLabels: function(h) {
                return h.data.datasets.map((v, y) => {
                  const w = Array.isArray(v.backgroundColor) ? v.backgroundColor[0] : v.backgroundColor, _ = Array.isArray(v.borderColor) ? v.borderColor[0] : v.borderColor, k = typeof _ == "string" && _.length > 0 ? _ : typeof w == "string" && w.length > 0 ? w : o.value.textSecondary;
                  return {
                    text: l(v.label || ""),
                    fillStyle: typeof w == "string" ? w : k,
                    strokeStyle: k,
                    lineWidth: 0,
                    fontColor: k,
                    hidden: !h.isDatasetVisible(y),
                    index: y,
                    datasetIndex: y
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
              family: ut,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: ut,
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
                b && (b += ": ");
                const y = (h.chart?.options?.indexAxis ?? "x") === "y" ? h.parsed.x : h.parsed.y;
                return y != null && (b += y), b;
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
              maxTicksLimit: Qa,
              font: {
                family: ut,
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
            display: !0,
            stacked: a.stacked || !1,
            offset: !0,
            grid: {
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: Ro,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ut,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
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
      }, p = a.options ? c(m, a.options) : m;
      if (p.indexAxis === "y") {
        p.scales = p.scales ?? {}, p.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...p.scales.x
        };
        const { beginAtZero: h, ticks: b, ...v } = p.scales.y ?? {}, y = a.data.labels?.length ?? 0, w = a.categoryLabelMaxLength ?? 20;
        p.scales.y = {
          type: "category",
          ...v,
          ticks: {
            ...b,
            autoSkip: !1,
            maxTicksLimit: y > 0 ? y : Qa,
            callback: function(_) {
              const k = this.getLabelForValue(_), $ = typeof k == "string" ? k : String(k ?? "");
              return r($, w);
            }
          }
        };
      }
      return bl(
        pl(p)
      );
    }), g = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (m, p) => (f(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: Ce({ height: `${g.value}px` })
    }, [
      N(B(Ah), {
        data: s.value,
        options: u.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), be = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, $t = /* @__PURE__ */ be(Eh, [["__scopeId", "data-v-1d64fb88"]]), Fh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Oh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Vh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, zh = ["aria-pressed", "aria-label", "onClick"], Nh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, jh = /* @__PURE__ */ fe({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ta.register(
      ul,
      hl,
      qu,
      Yu,
      cl,
      Bo,
      To
    ), ta.defaults.font.family = ut;
    const n = oe(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const v = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((y) => {
          const w = y.borderColor, _ = Array.isArray(w) ? w[0] : w, k = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, $ = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : v, S = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : $, D = y.pointBorderWidth ?? 2, P = y.pointHoverBorderWidth ?? D;
          return {
            ...y,
            fill: y.fill ?? !1,
            clip: y.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: S,
            pointBorderColor: y.pointBorderColor ?? k,
            pointHoverBorderColor: y.pointHoverBorderColor ?? k,
            pointBorderWidth: D,
            pointHoverBorderWidth: P
          };
        })
      };
    }), r = (v) => typeof v == "string" ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v, c = (v) => typeof v != "string" ? v : a.uppercaseLegendLabels ? v.toUpperCase() : r(v);
    function u(v) {
      const y = v.borderColor, w = Array.isArray(y) ? y[0] : y;
      return typeof w == "string" && w.length > 0 ? w : s.value.textSecondary;
    }
    const g = C(
      () => l.value.datasets.map((v, y) => ({
        key: `${v.label ?? "dataset"}-${y}`,
        label: c(v.label || ""),
        color: u(v)
      }))
    ), m = oe([]);
    Te(
      () => l.value.datasets.length,
      (v) => {
        const y = Array.from({ length: v }, (w, _) => m.value[_] ?? !0);
        m.value = y;
      },
      { immediate: !0 }
    );
    function p(v) {
      const w = n.value?.chart;
      if (!w || v < 0 || v >= w.data.datasets.length) return;
      const _ = !w.isDatasetVisible(v);
      w.setDatasetVisibility(v, _), m.value[v] = _, w.update();
    }
    function h(v, y) {
      if (y == null) return v;
      if (Array.isArray(y) || typeof y != "object" || v == null || Array.isArray(v) || typeof v != "object") return y;
      const w = { ...v };
      for (const _ of Object.keys(y)) {
        const k = y[_];
        k !== void 0 && (w[_] = h(v[_], k));
      }
      return w;
    }
    const b = C(() => {
      const v = {
        font: {
          family: ut
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
              family: ut,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: ut,
              size: 13
            },
            callbacks: {
              title: function(_) {
                return _.length > 0 ? String(r(_[0].label)) : "";
              },
              label: function(_) {
                let k = String(r(_.dataset.label || ""));
                return k && (k += ": "), _.parsed.y !== null && (k += _.parsed.y), k;
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
              maxTicksLimit: Ro,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ut,
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
              maxTicksLimit: Qa,
              font: {
                family: ut,
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
      }, y = a.options ? h(v, a.options) : v;
      return bl(
        pl(y)
      );
    });
    return t({ isDark: o }), (v, y) => (f(), x("div", Fh, [
      d("div", Oh, [
        N(B(Th), {
          ref_key: "lineChartRef",
          ref: n,
          data: l.value,
          options: b.value
        }, null, 8, ["data", "options"])
      ]),
      g.value.length > 0 ? (f(), x("ul", Vh, [
        (f(!0), x(he, null, pe(g.value, (w, _) => (f(), x("li", {
          key: w.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: Z(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Ce({ color: w.color }),
            "aria-pressed": m.value[_] !== !1,
            "aria-label": `${w.label}. ${m.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (k) => p(_)
          }, [
            d("span", Nh, [
              y[0] || (y[0] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              d("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Ce({ borderColor: w.color })
              }, null, 4),
              y[1] || (y[1] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            d("span", null, A(w.label), 1)
          ], 14, zh)
        ]))), 128))
      ])) : O("", !0)
    ]));
  }
}), mt = /* @__PURE__ */ be(jh, [["__scopeId", "data-v-426e23d5"]]), Hh = { class: "chart-container" }, Wh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Kh = /* @__PURE__ */ fe({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ta.register(Fu, Bo, To);
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = a.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => a.options ? a.options : {
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
              family: Wh,
              size: 13,
              weight: 500
            },
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(r) {
              const c = r.data;
              return c.labels.length && c.datasets.length ? c.labels.map((u, g) => {
                const p = r.getDatasetMeta(0).controller.getStyle(g), b = c.datasets[0].data[g], v = typeof p.backgroundColor == "string" && p.backgroundColor.length > 0 ? p.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${b}`,
                  fillStyle: p.backgroundColor,
                  strokeStyle: p.borderColor,
                  lineWidth: p.borderWidth,
                  lineDash: p.borderDash,
                  lineDashOffset: p.borderDashOffset,
                  lineJoin: p.borderJoinStyle,
                  fontColor: v,
                  hidden: !r.getDataVisibility(g),
                  index: g
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
            title: function(r) {
              return r.length > 0 ? String(i(r[0].label)) : "";
            },
            label: function(r) {
              const c = r.label || "", u = r.parsed || 0, g = r.dataset.data.reduce((p, h) => p + h, 0), m = (u / g * 100).toFixed(1);
              return `${i(c)}: ${u} (${m}%)`;
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
    return t({ isDark: n }), (r, c) => (f(), x("div", Hh, [
      N(B(Bh), {
        data: B(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Fn = /* @__PURE__ */ be(Kh, [["__scopeId", "data-v-0f7806d6"]]), Uh = { class: "chart-container" }, Yh = ["viewBox"], qh = ["transform"], Xh = ["x", "width", "fill", "stroke"], Gh = ["fill"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["points", "fill"], Jh = ["x1", "y1", "x2", "y2", "stroke"], ef = ["x", "y", "fill"], tf = ["x1", "y1", "x2", "y2", "stroke"], af = ["points", "fill"], nf = ["transform"], of = ["y1", "y2"], sf = ["y1", "y2"], lf = ["y1", "y2"], rf = ["y1", "y2"], cf = ["y", "height"], df = ["y1", "y2"], uf = ["y1", "y2"], hf = ["y1", "y2"], ff = ["y1", "y2"], gf = ["y", "height"], mf = ["cy", "stroke", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], yf = ["y1", "y2", "onMouseenter"], xf = ["y1", "y2", "onMouseenter"], kf = ["x", "y", "fill"], _f = ["x", "y", "fill"], wf = ["transform"], Cf = { transform: "translate(-200, 0)" }, $f = ["stroke"], Sf = ["fill"], Mf = { transform: "translate(-130, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(-60, 0)" }, Bf = ["stroke"], Lf = ["fill"], Rf = { transform: "translate(10, 0)" }, Pf = ["stroke"], If = ["fill"], Ef = { transform: "translate(80, 0)" }, Ff = ["fill"], Of = { transform: "translate(150, 0)" }, Vf = ["fill"], zf = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n } = Me($e(a, "theme")), o = C(() => ({
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
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m, p) => {
      const h = m.currentTarget.closest("svg");
      if (!h) return;
      const b = h.getBoundingClientRect(), v = h.createSVGPoint();
      v.x = m.clientX - b.left, v.y = m.clientY - b.top, s.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: p
      };
    }, r = (m) => {
      if (s.value.visible) {
        const p = m.currentTarget, h = p.getBoundingClientRect(), b = p.createSVGPoint();
        b.x = m.clientX - h.left, b.y = m.clientY - h.top, s.value.x = b.x, s.value.y = b.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, g = C(() => {
      const m = [], h = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, y = (v - 1) / 9, w = a.chartMargin + h - y * h;
        m.push({ value: v, y: w });
      }
      return m;
    });
    return t({ isDark: n }), (m, p) => (f(), x("div", Uh, [
      (f(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (f(), x("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          d("rect", {
            x: -(s.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Xh),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Gh)
        ], 8, qh)) : O("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Zh),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Qh),
        (f(!0), x(he, null, pe(g.value, (h, b) => (f(), x(he, { key: b }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Jh),
          d("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(h.value), 9, ef)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, tf),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, af),
        (f(!0), x(he, null, pe(e.boxplotData, (h, b) => (f(), x(he, { key: b }, [
          d("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            h.isTotal ? (f(), x(he, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, of),
              d("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, sf),
              d("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, lf),
              d("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, rf),
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
              }, null, 8, cf)
            ], 64)) : (f(), x(he, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, df),
              d("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, uf),
              d("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, hf),
              d("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ff),
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
              }, null, 8, gf)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: h.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${h.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, mf),
            d("circle", {
              cx: 0,
              cy: h.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${h.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            d("circle", {
              cx: 0,
              cy: h.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${h.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bf),
            d("circle", {
              cx: 0,
              cy: h.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${h.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            d("line", {
              x1: -24,
              y1: h.medianY,
              x2: 24,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Median: ${h.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, yf),
            h.averageY ? (f(), x("line", {
              key: 2,
              x1: -24,
              y1: h.averageY,
              x2: 24,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Avg: ${h.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, xf)) : O("", !0)
          ], 8, nf),
          d("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(h.label)), 9, kf),
          h.responseCount ? (f(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(h.responseCount), 9, _f)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (f(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Cf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, $f),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Sf)
          ]),
          d("g", Mf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Df),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Af)
          ]),
          d("g", Tf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Bf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Lf)
          ]),
          d("g", Rf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Pf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, If)
          ]),
          d("g", Ef, [
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Ff)
          ]),
          d("g", Of, [
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Vf)
          ])
        ], 8, wf)) : O("", !0)
      ], 44, Yh))
    ]));
  }
}), Nf = /* @__PURE__ */ be(zf, [["__scopeId", "data-v-9ac5c075"]]), jf = { class: "chart-container" }, Hf = ["viewBox"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["points", "fill"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["x", "y", "fill"], Xf = ["x", "y", "fill", "transform"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["points", "fill"], Qf = ["transform"], Jf = ["y1", "y2", "stroke", "onMouseenter"], eg = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], tg = ["x1", "y1", "x2", "y2", "onMouseenter"], ag = ["x1", "y1", "x2", "y2", "onMouseenter"], ng = ["cy", "stroke", "onMouseenter"], og = ["cy", "stroke", "onMouseenter"], sg = ["x", "y", "fill"], ig = ["x", "y", "fill"], lg = ["transform"], rg = { transform: "translate(-180, 0)" }, cg = ["stroke"], dg = ["fill"], ug = { transform: "translate(-120, 0)" }, hg = ["fill"], fg = { transform: "translate(-60, 0)" }, gg = ["fill"], mg = { transform: "translate(0, 0)" }, pg = ["stroke"], bg = ["fill"], vg = { transform: "translate(60, 0)" }, yg = ["fill"], xg = { transform: "translate(130, 0)" }, kg = ["fill"], _g = ["transform"], wg = ["x", "y", "width", "height", "fill", "stroke"], Cg = ["y", "fill"], $g = ["y", "fill"], vn = 10, Sg = 14, Zn = 13, oi = 4, si = 12, Mg = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = vn + Zn + oi + si + vn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(w, _, k) {
      const $ = k ? 0.6 : 0.535;
      return Math.ceil(Math.max(w, 1) * _ * $);
    }
    function r(w, _) {
      return Math.max(
        l(w.length, Zn, !0),
        l(_.length, si, !1),
        52
      ) + Sg * 2;
    }
    function c(w, _, k, $) {
      const S = k / 2, D = 6, P = Math.min(
        Math.max(w, S + D),
        a.chartWidth - S - D
      ), V = D + $ + 10, W = a.chartHeight - D + 10, M = Math.min(Math.max(_, V), W);
      return { x: P, y: M };
    }
    const u = C(() => ({
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
    })), g = oe({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), m = (w) => typeof w == "string" ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w, p = (w, _, k) => {
      const $ = w.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), D = $.createSVGPoint();
      D.x = w.clientX - S.left, D.y = w.clientY - S.top;
      let P = m(_.label), V = "";
      switch (k) {
        case "body":
          V = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          V = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          V = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          V = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          V = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          V = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const W = r(P, V), M = s;
      let R = D.x, T = D.y - 20;
      const j = c(R, T, W, M);
      R = j.x, T = j.y, g.value = {
        visible: !0,
        x: R,
        y: T,
        title: P,
        text: V,
        width: W,
        height: M
      };
    }, h = (w) => {
      if (g.value.visible) {
        const _ = w.currentTarget, k = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = w.clientX - k.left, $.y = w.clientY - k.top;
        let S = $.x, D = $.y - 20;
        const P = c(S, D, g.value.width, g.value.height);
        g.value.x = P.x, g.value.y = P.y;
      }
    }, b = () => {
      g.value.visible = !1;
    }, v = () => {
      g.value.visible = !1;
    }, y = C(() => {
      const w = [], k = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, D = (S - 1) / 9, P = a.chartMargin + k - D * k;
        w.push({ value: S, y: P });
      }
      return w;
    });
    return t({ isDark: n }), (w, _) => (f(), x("div", jf, [
      (f(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Ce(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: h,
        onMouseleave: b
      }, [
        _[4] || (_[4] = d("defs", null, [
          d("filter", {
            id: "candlestick-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            d("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Wf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Kf),
        (f(!0), x(he, null, pe(y.value, (k, $) => (f(), x("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: k.y,
          x2: e.chartWidth - e.chartMargin,
          y2: k.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Uf))), 128)),
        (f(!0), x(he, null, pe(y.value, (k, $) => (f(), x(he, { key: $ }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: k.y,
            x2: e.chartMargin,
            y2: k.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Yf),
          d("text", {
            x: e.chartMargin - 12,
            y: k.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(k.value), 9, qf)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(m(e.yAxisLabel)), 9, Xf),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Gf),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Zf),
        (f(!0), x(he, null, pe(e.candlestickData, (k, $) => (f(), x(he, { key: $ }, [
          d("g", {
            transform: `translate(${k.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: k.highY,
              x2: 0,
              y2: k.lowY,
              stroke: k.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (S) => p(S, k, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Jf),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(k.q1Y, k.q3Y) - (Math.abs(k.q3Y - k.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(k.q3Y - k.q1Y)),
              fill: k.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: k.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (S) => p(S, k, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, eg),
            k.medianY ? (f(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: k.medianY,
              x2: e.candleWidth / 2,
              y2: k.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => p(S, k, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, tg)) : O("", !0),
            k.averageY ? (f(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: k.averageY,
              x2: e.candleWidth / 2,
              y2: k.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => p(S, k, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ag)) : O("", !0),
            d("circle", {
              cx: 0,
              cy: k.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => p(S, k, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ng),
            d("circle", {
              cx: 0,
              cy: k.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => p(S, k, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, og)
          ], 8, Qf),
          d("text", {
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(m(k.label)), 9, sg),
          k.responseCount ? (f(), x("text", {
            key: 0,
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(k.responseCount), 9, ig)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (f(), x("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", rg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, cg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, dg)
          ]),
          d("g", ug, [
            _[0] || (_[0] = d("rect", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, hg)
          ]),
          d("g", fg, [
            _[1] || (_[1] = d("rect", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, gg)
          ]),
          d("g", mg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, pg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, bg)
          ]),
          d("g", vg, [
            _[2] || (_[2] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, yg)
          ]),
          d("g", xg, [
            _[3] || (_[3] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, kg)
          ])
        ], 8, lg)) : O("", !0),
        g.value.visible ? (f(), x("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${g.value.x}, ${g.value.y})`
        }, [
          d("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -g.value.width / 2,
            y: -g.value.height - 10,
            width: g.value.width,
            height: g.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, wg),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + vn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.title), 9, Cg),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + vn + Zn + oi,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.text), 9, $g)
        ], 8, _g)) : O("", !0)
      ], 44, Hf))
    ]));
  }
}), Dg = /* @__PURE__ */ be(Mg, [["__scopeId", "data-v-22efd66d"]]), Ag = ["viewBox"], Tg = ["x1", "y1", "x2", "y2", "stroke"], Bg = ["x1", "y1", "x2", "y2", "stroke"], Lg = ["points", "fill"], Rg = ["x1", "y1", "x2", "y2", "stroke"], Pg = ["x", "y", "fill"], Ig = ["x", "y", "fill", "transform"], Eg = ["x1", "y1", "x2", "y2", "stroke"], Fg = ["points", "fill"], Og = ["x1", "y1", "x2", "y2", "stroke"], Vg = ["x", "y", "fill"], zg = ["x", "y", "fill"], Ng = ["d"], jg = ["x", "y", "width", "height", "onMouseenter"], Hg = ["x1", "y1", "x2", "y2"], Wg = ["x", "y"], Kg = ["x1", "y1", "x2", "y2"], Ug = ["x", "y"], Yg = ["x1", "y1", "x2", "y2"], qg = ["x", "y"], Xg = ["x1", "y1", "x2", "y2"], Gg = ["x", "y"], Zg = ["x1", "y1", "x2", "y2"], Qg = ["x", "y"], Jg = ["x1", "y1", "x2", "y2"], em = ["x", "y"], tm = ["transform"], am = { transform: "translate(-220, 0)" }, nm = ["fill"], om = { transform: "translate(-140, 0)" }, sm = ["fill"], im = { transform: "translate(-80, 0)" }, lm = ["fill"], rm = { transform: "translate(-20, 0)" }, cm = ["fill"], dm = { transform: "translate(60, 0)" }, um = ["fill"], hm = { transform: "translate(130, 0)" }, fm = ["fill"], gm = { transform: "translate(180, 0)" }, mm = ["fill"], pm = ["transform"], bm = ["x", "y", "width", "height", "fill", "stroke"], vm = ["y", "fill"], ym = ["y", "fill"], yn = 10, xm = 14, Qn = 13, ii = 12, li = 4, km = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = yn + Qn + li + ii + yn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(ee, G, I) {
      const X = I ? 0.6 : 0.535;
      return Math.ceil(Math.max(ee, 1) * G * X);
    }
    function r(ee, G) {
      return Math.max(
        l(ee.length, Qn, !0),
        l(G.length, ii, !1),
        52
      ) + xm * 2;
    }
    function c(ee, G, I, X) {
      const te = I / 2, E = 6, J = Math.min(
        Math.max(ee, te + E),
        a.chartWidth - te - E
      ), se = E + X + 10, ge = a.chartHeight - E + 10, we = Math.min(Math.max(G, se), ge);
      return { x: J, y: we };
    }
    const u = C(() => ({
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
    })), g = oe({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), m = C(
      () => a.chartMarginRight ?? a.chartMargin
    ), p = C(() => a.chartMargin + a.plotInset), h = C(
      () => a.chartWidth - m.value - a.plotInset
    ), b = C(() => Math.max(h.value - p.value, 1)), v = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), y = C(() => b.value / 10 * 0.52);
    function w(ee) {
      if (ee < 1 || ee > 10) return null;
      const G = b.value / 10;
      return p.value + (ee - 0.5) * G;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (ee, G) => {
        const I = G + 1, X = w(I);
        return X === null ? null : { score: I, x: X };
      }).filter((ee) => ee !== null)
    ), k = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = Math.max(...a.histogram.map((I) => I.count || 0), 1), G = Math.max(1, Math.ceil(ee * 0.2));
      return ee + G;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = a.averageScore || 0;
      let G = 0, I = 0;
      if (a.histogram.forEach((te) => {
        const E = te.count || 0;
        G += E;
        const J = te.score - ee;
        I += E * (J * J);
      }), G === 0) return 1;
      const X = I / G;
      return Math.sqrt(X) || 1;
    }), S = (ee, G, I) => {
      if (I === 0) return 0;
      const X = 1 / (I * Math.sqrt(2 * Math.PI)), te = -0.5 * Math.pow((ee - G) / I, 2);
      return X * Math.exp(te);
    }, D = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const ee = a.averageScore, G = $.value, I = 100, te = Math.max(...a.histogram.map((ge) => ge.count || 0), 1) / k.value * v.value;
      if (te <= 0) return null;
      let E = 0;
      for (let ge = 0; ge <= I; ge++) {
        const we = 1 + 9 * (ge / I), _e = S(we, ee, G);
        _e > E && (E = _e);
      }
      if (E <= 0) return null;
      const J = te / E, se = [];
      for (let ge = 0; ge <= I; ge++) {
        const we = 1 + 9 * (ge / I), _e = S(we, ee, G) * J, Re = w(we);
        if (Re !== null) {
          const Pe = a.chartHeight - a.chartBottomMargin - _e;
          se.push(`${ge === 0 ? "M" : "L"} ${Re} ${Pe}`);
        }
      }
      return se.join(" ");
    }), P = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const ee = b.value / 10;
      return a.histogram.map((G) => {
        const I = Number(G.score);
        if (!Number.isFinite(I) || I < 1 || I > 10)
          return null;
        const X = p.value + (I - 0.5) * ee, te = G.count > 0 ? G.count / k.value * v.value : 0, E = a.chartHeight - a.chartBottomMargin - te;
        return {
          score: I,
          count: G.count,
          x: X,
          y: E,
          height: te
        };
      }).filter((G) => G !== null);
    }), V = C(() => w(a.minScore)), W = C(() => w(a.maxScore)), M = C(() => w(a.q1Score)), R = C(() => w(a.medianScore)), T = C(() => w(a.q3Score)), j = C(() => w(a.averageScore)), H = C(() => a.minScore), Q = C(() => a.maxScore), re = C(() => a.q1Score), de = C(() => a.medianScore), q = C(() => a.q3Score), ae = C(() => a.averageScore), L = C(() => {
      const ee = [], G = a.chartMargin - 8, I = 18;
      M.value !== null && ee.push({
        x: M.value,
        y: G,
        value: a.q1Score,
        label: `Q1: ${re.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), R.value !== null && ee.push({
        x: R.value,
        y: G - I,
        value: a.medianScore,
        label: `Median: ${de.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), j.value !== null && ee.push({
        x: j.value,
        y: G - I,
        value: a.averageScore,
        label: `Avg: ${ae.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), T.value !== null && ee.push({
        x: T.value,
        y: G,
        value: a.q3Score,
        label: `Q3: ${q.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), ee.sort((E, J) => (E.x || 0) - (J.x || 0));
      const X = [[], [], []];
      ee.forEach((E) => {
        if (E.x === null) return;
        let J = -1;
        for (let se = 0; se < X.length; se++) {
          let ge = !1;
          for (const we of X[se]) {
            if (we.x === null) continue;
            const _e = Math.abs(E.x - we.x), Re = (E.width + we.width) / 2 + 10;
            if (_e < Re) {
              ge = !0;
              break;
            }
          }
          if (!ge) {
            J = se;
            break;
          }
        }
        J === -1 && (J = X.length - 1), E.y = G - J * I, X[J].push(E);
      });
      const te = 15;
      return ee.forEach((E) => {
        E.y < te && (E.y = te);
      }), ee;
    }), K = (ee) => L.value.find((I) => I.id === ee)?.y || a.chartMargin - 10, Y = C(() => {
      const ee = [];
      for (let I = 0; I <= 5; I++) {
        const X = Math.round(k.value / 5 * I), te = a.chartHeight - a.chartBottomMargin - I / 5 * v.value;
        ee.push({ value: X, y: te });
      }
      return ee;
    });
    function z(ee, G, I) {
      const X = ee.createSVGPoint();
      X.x = G, X.y = I;
      const te = ee.getScreenCTM();
      if (!te) {
        const J = ee.getBoundingClientRect();
        return { x: G - J.left, y: I - J.top };
      }
      const E = X.matrixTransform(te.inverse());
      return { x: E.x, y: E.y };
    }
    const le = (ee, G) => {
      a.interactive && ve(ee, G);
    }, ce = () => {
      a.interactive && ue();
    }, ve = (ee, G) => {
      const I = ee.currentTarget.closest("svg");
      if (!I) return;
      const { x: X, y: te } = z(I, ee.clientX, ee.clientY), E = `Score: ${G.score}`, J = `Count: ${Number(G.count ?? 0).toLocaleString()}`, se = r(E, J), ge = s, we = typeof G?.x == "number" ? G.x : X;
      let _e = te - 20;
      const Re = c(we, _e, se, ge);
      g.value = {
        visible: !0,
        x: Re.x,
        y: Re.y,
        title: E,
        text: J,
        width: se,
        height: ge,
        anchorX: typeof G?.x == "number" ? G.x : null
      };
    }, U = (ee) => {
      if (a.interactive && g.value.visible) {
        const G = ee.currentTarget, { x: I, y: X } = z(G, ee.clientX, ee.clientY), te = g.value.anchorX, E = te != null && Number.isFinite(te) ? te : I;
        let J = X - 20;
        const se = c(E, J, g.value.width, g.value.height);
        g.value.x = se.x, g.value.y = se.y;
      }
    }, ie = () => {
      ue();
    }, ue = () => {
      g.value.visible = !1, g.value.anchorX = null;
    };
    return t({ isDark: n }), (ee, G) => (f(), x("div", {
      class: Z(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (f(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: U,
        onMouseleave: ie
      }, [
        G[7] || (G[7] = d("defs", null, [
          d("filter", {
            id: "histogram-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            d("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        (f(!0), x(he, null, pe(Y.value, (I, X) => (f(), x("line", {
          key: `grid-${X}`,
          x1: p.value,
          y1: I.y,
          x2: h.value,
          y2: I.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Tg))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Bg),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Lg),
        (f(!0), x(he, null, pe(Y.value, (I, X) => (f(), x(he, {
          key: `y-tick-${X}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: I.y,
            x2: e.chartMargin,
            y2: I.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Rg),
          d("text", {
            x: e.chartMargin - 12,
            y: I.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(I.value), 9, Pg)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Ig),
        d("line", {
          x1: p.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: h.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Eg),
        d("polygon", {
          points: `${h.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${h.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${h.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Fg),
        (f(!0), x(he, null, pe(_.value, (I) => (f(), x(he, {
          key: `tick-${I.score}`
        }, [
          d("line", {
            x1: I.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: I.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Og),
          d("text", {
            x: I.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(I.score), 9, Vg)
        ], 64))), 128)),
        d("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, zg),
        D.value ? (f(), x("path", {
          key: 0,
          d: D.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Ng)) : O("", !0),
        (f(!0), x(he, null, pe(P.value, (I, X) => (f(), x("rect", {
          key: `bar-${X}`,
          x: I.x - y.value / 2,
          y: I.y,
          width: y.value,
          height: I.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (te) => le(te, I),
          onMouseleave: ce,
          style: Ce({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, jg))), 128)),
        e.showStatLabels && V.value ? (f(), x("line", {
          key: 1,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Hg)) : O("", !0),
        e.showStatLabels && V.value ? (f(), x("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(H.value.toFixed(1)), 9, Wg)) : O("", !0),
        e.showStatLabels && M.value ? (f(), x("line", {
          key: 3,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Kg)) : O("", !0),
        e.showStatLabels && M.value ? (f(), x("text", {
          key: 4,
          x: M.value,
          y: K("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(re.value.toFixed(1)), 9, Ug)) : O("", !0),
        e.showStatLabels && R.value ? (f(), x("line", {
          key: 5,
          x1: R.value,
          y1: e.chartMargin,
          x2: R.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Yg)) : O("", !0),
        e.showStatLabels && R.value ? (f(), x("text", {
          key: 6,
          x: R.value,
          y: K("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(de.value.toFixed(1)), 9, qg)) : O("", !0),
        e.showStatLabels && j.value ? (f(), x("line", {
          key: 7,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Xg)) : O("", !0),
        e.showStatLabels && j.value ? (f(), x("text", {
          key: 8,
          x: j.value,
          y: K("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(ae.value.toFixed(1)), 9, Gg)) : O("", !0),
        e.showStatLabels && T.value ? (f(), x("line", {
          key: 9,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Zg)) : O("", !0),
        e.showStatLabels && T.value ? (f(), x("text", {
          key: 10,
          x: T.value,
          y: K("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(q.value.toFixed(1)), 9, Qg)) : O("", !0),
        e.showStatLabels && W.value ? (f(), x("line", {
          key: 11,
          x1: W.value,
          y1: e.chartMargin,
          x2: W.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Jg)) : O("", !0),
        e.showStatLabels && W.value ? (f(), x("text", {
          key: 12,
          x: W.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(Q.value.toFixed(1)), 9, em)) : O("", !0),
        e.showLegend ? (f(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", am, [
            G[0] || (G[0] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, nm)
          ]),
          d("g", om, [
            G[1] || (G[1] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, sm)
          ]),
          d("g", im, [
            G[2] || (G[2] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, lm)
          ]),
          d("g", rm, [
            G[3] || (G[3] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, cm)
          ]),
          d("g", dm, [
            G[4] || (G[4] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, um)
          ]),
          d("g", hm, [
            G[5] || (G[5] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, fm)
          ]),
          d("g", gm, [
            G[6] || (G[6] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, mm)
          ])
        ], 8, tm)) : O("", !0),
        e.interactive && g.value.visible ? (f(), x("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${g.value.x}, ${g.value.y})`
        }, [
          d("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -g.value.width / 2,
            y: -g.value.height - 10,
            width: g.value.width,
            height: g.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, bm),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.title), 9, vm),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + yn + Qn + li,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.text), 9, ym)
        ], 8, pm)) : O("", !0)
      ], 44, Ag))
    ], 2));
  }
}), vl = /* @__PURE__ */ be(km, [["__scopeId", "data-v-8f9da805"]]), _m = 639, yl = 1024;
function ri(e) {
  return e < 640 ? "mobile" : e <= yl ? "tablet" : "desktop";
}
function wm() {
  const e = oe(
    typeof window > "u" ? "desktop" : ri(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = ri(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Je(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${_m}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${yl}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, a.addEventListener("change", s), n.addEventListener("change", s), o.addEventListener("change", s));
  }), lt(() => {
    !s || !a || !n || !o || (a.removeEventListener("change", s), n.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => e.value === "mobile"), l = C(() => e.value === "tablet"), r = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const It = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${It(e, t)})`, Cm = { class: "chart-container" }, $m = {
  key: 0,
  class: "loading-state loading-overlay"
}, ra = 12, Sm = /* @__PURE__ */ fe({
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
    zo.use([Xl, Gl, Zl, Ql]);
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = wm(), i = oe(null), l = oe(!0), r = oe(!1);
    let c = null, u = null;
    const g = {
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
    }, p = {
      success: 0,
      abandon: 1,
      error: 2
    }, h = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, b = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, v = C(() => {
      const U = s.value;
      return U === "mobile" ? {
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
      } : U === "tablet" ? {
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
        contentMargins: { ...g.margins }
      } : {
        orient: "horizontal",
        nodeWidth: g.node.width,
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
        contentMargins: { ...g.margins }
      };
    }), y = (U) => {
      const ie = U.replace(/_/g, " ").replace(/\s+/g, " ").trim(), ue = ie.match(/^Failed:\s*(.+)$/i);
      return ue ? `Failed:
${ue[1].trim()}` : ie;
    }, w = (U, ie) => {
      const ue = U.trim();
      if (!ue || ie < 1 || ue.length <= ie) return ue;
      const ee = [];
      let G = 0;
      for (; G < ue.length; ) {
        const I = Math.min(G + ie, ue.length);
        if (I >= ue.length) {
          const E = ue.slice(G).trim();
          E && ee.push(E);
          break;
        }
        const X = ue.slice(G, I), te = X.lastIndexOf(" ");
        if (te > 0)
          for (ee.push(ue.slice(G, G + te).trim()), G += te; G < ue.length && ue[G] === " "; ) G += 1;
        else
          ee.push(X), G = I;
      }
      return ee.join(`
`);
    }, _ = (U, ie) => {
      const ue = U.trim();
      return !ue || ie < 1 ? U : ue.split(`
`).map((ee) => w(ee.trim(), ie)).filter(Boolean).join(`
`);
    }, k = (U) => U.status ? U.status : h.test(U.name) ? "abandon" : b.test(U.name) ? "error" : "success", $ = (U) => U.originalValue ?? U.value, S = (U, ie) => {
      const ue = new Set(ie.map((G) => G.target)), ee = U.filter((G) => !ue.has(G.name));
      for (const G of ee) {
        if (typeof G.value == "number" && G.value > 0) return G.value;
        const I = ie.filter((X) => X.source === G.name);
        if (I.length > 0)
          return I.reduce((X, te) => X + $(te), 0);
      }
      return ie.reduce((G, I) => Math.max(G, $(I)), 0);
    }, D = (U, ie) => {
      const ue = /* @__PURE__ */ new Map(), ee = new Set(ie.map((I) => I.target)), G = U.filter((I) => !ee.has(I.name)).map((I) => ({ name: I.name, depth: 0 }));
      for (; G.length > 0; ) {
        const { name: I, depth: X } = G.shift(), te = ue.get(I);
        if (!(te !== void 0 && te >= X)) {
          ue.set(I, X);
          for (const E of ie)
            E.source === I && G.push({ name: E.target, depth: X + 1 });
        }
      }
      for (const I of U)
        ue.has(I.name) || ue.set(I.name, 0);
      return ue;
    }, P = (U, ie) => {
      const ue = /* @__PURE__ */ new Map(), ee = new Set(ie.map((te) => te.target)), G = U.filter((te) => !ee.has(te.name));
      let I = 0;
      const X = (te) => {
        let E = te;
        for (; E && !ue.has(E); )
          ue.set(E, I), I += 1, E = ie.filter(
            (se) => se.source === E && k({ name: se.target }) === "success"
          ).sort((se, ge) => $(ge) - $(se))[0]?.target;
      };
      return G.forEach((te) => X(te.name)), ue;
    }, V = (U, ie, ue) => {
      const ee = k(U);
      if (ee === "success" && ue.has(U.name))
        return ue.get(U.name);
      if (ee === "success") {
        const G = ie.filter((X) => X.target === U.name);
        return 200 + (G.length ? Math.min(
          ...G.map(
            (X) => ue.has(X.source) ? (ue.get(X.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ee === "abandon" ? 1e3 : 2e3;
    }, W = (U, ie) => {
      const ue = D(U, ie), ee = P(U, ie);
      return [...U].sort((G, I) => {
        const X = ue.get(G.name) ?? 0, te = ue.get(I.name) ?? 0;
        if (X !== te) return X - te;
        const E = p[k(G)], J = p[k(I)];
        if (E !== J) return E - J;
        const se = V(G, ie, ee), ge = V(I, ie, ee);
        if (se !== ge) return se - ge;
        const we = typeof G.order == "number" ? G.order : Number.MAX_SAFE_INTEGER, _e = typeof I.order == "number" ? I.order : Number.MAX_SAFE_INTEGER;
        return we !== _e ? we - _e : G.name.localeCompare(I.name);
      });
    }, M = (U, ie, ue, ee) => {
      const I = _(U, ee).split(`
`), X = ie * 0.58, E = Math.max(...I.map((se) => se.length), 1) * X, J = I.length * ue;
      return {
        lines: I,
        width: E,
        height: J,
        nodeWidth: E + ra * 2
      };
    }, R = (U, ie, ue, ee) => {
      const G = typeof U.label == "string" && U.label ? U.label : U.name, I = `${y(G)}
(${It(ue, ee)})`;
      return _(I, ie);
    }, T = (U, ie) => {
      const ue = ie.filter((ee) => ee.target === U.name);
      return ue.length > 0 ? ue.reduce((ee, G) => ee + $(G), 0) : typeof U.value == "number" ? U.value : ie.filter((ee) => ee.source === U.name).reduce((ee, G) => ee + $(G), 0);
    }, j = (U, ie, ue) => {
      const ee = ie.find((G) => G.name === U);
      return ee ? T(ee, ue) : ue.filter((G) => G.source === U).reduce((G, I) => G + $(I), 0);
    }, H = (U, ie, ue, ee) => {
      const G = j(U, ue, ee);
      return `${ie.toLocaleString()} (${It(ie, G)})`;
    }, Q = (U, ie = 0) => {
      if (ie > 0) return ie;
      const ue = U.match(/^(\d+(?:\.\d+)?)px$/);
      if (ue) return Number(ue[1]);
      const ee = U.match(/^(\d+(?:\.\d+)?)vh$/);
      return ee && typeof window < "u" ? Number(ee[1]) / 100 * window.innerHeight : 500;
    }, re = (U, ie, ue, ee, G) => {
      if (!ie.length || !U.length || G <= 0) return U;
      const I = U.map((_e) => ({ ..._e })), X = ue.labelLineHeight || Math.round(ue.labelFontSize * 1.25), te = Math.max(4, ue.labelCharsPerLine), E = Math.max(ee * 0.88, 260), J = D(ie, I), se = /* @__PURE__ */ new Map();
      ie.forEach((_e) => {
        const Re = J.get(_e.name) ?? 0;
        se.set(Re, (se.get(Re) ?? 0) + 1);
      });
      const ge = (_e) => {
        const Pe = ie.find((oa) => oa.name === _e)?.displayLabel || _e, Ut = M(Pe, ue.labelFontSize, X, te).height + ra * 2, pa = J.get(_e) ?? 0, an = se.get(pa) ?? 1, nn = (Math.max(an, 1) - 1) * ue.nodeGap / Math.max(an, 1), On = Math.max(E - nn, Ut);
        return Math.max(1, Ut / On * G);
      }, we = (_e) => {
        const Re = I.filter((Pe) => Pe.target === _e);
        return Re.length > 0 ? Re.reduce((Pe, qe) => Pe + qe.value, 0) : I.filter((Pe) => Pe.source === _e).reduce((Pe, qe) => Pe + qe.value, 0);
      };
      for (let _e = 0; _e < 16; _e += 1) {
        let Re = !1;
        for (const Pe of ie) {
          const qe = ge(Pe.name), Ut = we(Pe.name);
          if (Ut >= qe) continue;
          const pa = I.filter((oa) => oa.target === Pe.name), an = I.filter((oa) => oa.source === Pe.name), nn = pa.length > 0 ? pa : an;
          if (nn.length === 0) continue;
          const On = qe / Math.max(Ut, 1e-6);
          nn.forEach((oa) => {
            oa.value *= On;
          }), Re = !0;
        }
        if (!Re) break;
      }
      return I;
    }, de = (U, ie, ue) => {
      const ee = S(U, ie), G = W(U, ie), I = ue.labelLineHeight || Math.round(ue.labelFontSize * 1.25), X = Math.max(4, ue.labelCharsPerLine);
      let te = ue.nodeWidth;
      const E = [], J = G.map((ge, we) => {
        const _e = k(ge), Re = R(
          ge,
          X,
          T(ge, ie),
          ee
        );
        E.push(Re);
        const Pe = M(Re, ue.labelFontSize, I, X);
        ue.orient === "vertical" ? te = Math.max(te, Pe.height + ra * 2) : te = Math.max(te, Pe.nodeWidth);
        const qe = a.nodeColors[ge.name] || m[_e] || q[we % q.length], Ut = Math.max(Math.ceil(Pe.nodeWidth - ra * 2), 48);
        return {
          ...ge,
          displayLabel: Re,
          label: {
            width: Ut,
            overflow: "none",
            lineHeight: I,
            fontSize: ue.labelFontSize
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
      let se = { ...ue.contentMargins };
      if (ue.orient === "vertical") {
        const ge = Math.max(
          ...E.map(
            (_e) => M(_e, ue.labelFontSize, I, X).width
          ),
          0
        ), we = typeof se.right == "number" ? se.right : 10;
        se = {
          ...se,
          right: Math.max(we, ge + ra + ue.labelDistance)
        };
      }
      return { nodes: J, maxNodeWidth: te, contentMargins: se, originTotal: ee };
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
    ], ae = () => {
      const U = a.data.links.filter(
        (G) => G.source && G.target && typeof G.value == "number"
      ), ie = Math.max(...U.map((G) => G.value), 1), ue = Math.max(1, ie * 0.01), ee = U.map((G) => ({
        ...G,
        originalValue: G.value,
        value: G.value < ie * 0.01 ? ue : G.value
      }));
      return {
        nodes: a.data.nodes.filter((G) => G.name),
        links: ee
      };
    }, L = (U, ie, ue) => (ee) => {
      const G = ee.dataType === "node", I = o.value.tooltipText, X = n.value ? "#d1d5db" : "#e2e8f0";
      if (G) {
        const ge = ie.filter((Pe) => Pe.target === ee.name), we = ie.filter((Pe) => Pe.source === ee.name), _e = ge.length > 0 ? ge.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0) : we.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0), Re = It(_e, ue);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${ee.name} (${Re})</div><div style="color: ${X}; font-size: 12px;">Count: ${_e.toLocaleString()}</div>`;
      }
      const te = ee.data?.source || ee.source || "Unknown", E = ee.data?.target || ee.target || "Unknown", J = Number(ee.data?.originalValue ?? ee.data?.value ?? ee.value ?? 0), se = H(te, J, U, ie);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${te} → ${E}</div><div style="color: ${X}; font-size: 12px;">Flow: ${se}</div>`;
    }, K = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const U = v.value, ie = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", ue = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ee = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", G = U.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: I, links: X } = ae(), { nodes: te, maxNodeWidth: E, contentMargins: J, originTotal: se } = de(
          I,
          X,
          U
        ), ge = Q(a.height, i.value?.clientHeight ?? 0), we = re(
          X,
          te,
          {
            labelFontSize: U.labelFontSize,
            labelLineHeight: U.labelLineHeight || Math.round(U.labelFontSize * 1.25),
            labelCharsPerLine: U.labelCharsPerLine,
            nodeGap: U.nodeGap
          },
          ge,
          se
        ), _e = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: L(I, we, se),
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
              data: te,
              links: we,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: ue,
                  opacity: 1
                }
              },
              lineStyle: {
                color: ie,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...g.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: U.labelPosition,
                color: G,
                fontWeight: 700,
                fontSize: U.labelFontSize,
                lineHeight: U.labelLineHeight || Math.round(U.labelFontSize * 1.25),
                padding: ra,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...U.orient === "horizontal" ? { width: Math.max(E - ra * 2, 48), overflow: "none" } : U.labelWrap && U.labelTextWidth > 0 ? { width: U.labelTextWidth, overflow: "none" } : {},
                ...U.labelDistance > 0 ? { distance: U.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => Re.data?.displayLabel || Re.name || ""
              },
              edgeLabel: U.edgeLabelShow ? {
                show: !0,
                fontSize: U.edgeLabelFontSize,
                color: ee,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => {
                  const Pe = Number(Re.data?.originalValue ?? Re.value ?? 0), qe = Re.data?.source || Re.source || "";
                  return H(qe, Pe, I, we);
                }
              } : { show: !1 },
              nodeAlign: g.node.align,
              nodeGap: U.nodeGap,
              nodeWidth: E,
              layoutIterations: g.node.iterations,
              orient: U.orient,
              draggable: !1,
              ...J
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: g.animation.duration,
          animationEasing: g.animation.easing
        };
        c.setOption(_e), c.resize();
      } catch (I) {
        console.error("Error setting Sankey chart options:", I), r.value = !0;
      }
    }, Y = async () => {
      if (i.value)
        try {
          c = zo.init(i.value), K(), window.addEventListener("resize", ce);
        } catch (U) {
          console.error("Error initializing Sankey chart:", U), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, z = () => {
      const U = i.value;
      return !!(U && U.clientWidth > 0 && U.clientHeight > 0);
    }, le = async () => {
      if (await Ke(), z()) return Y();
      await new Promise((U) => {
        const ie = i.value;
        if (!ie) {
          U();
          return;
        }
        u = new ResizeObserver(() => {
          z() && (u?.disconnect(), u = null, Y().then(U));
        }), u.observe(ie);
      });
    }, ce = () => c?.resize(), ve = () => {
      window.removeEventListener("resize", ce), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return Je(() => le()), _i(ve), Te(() => a.data, K, { deep: !0 }), Te(n, K), Te(s, K), t({ isDark: n }), (U, ie) => (f(), x("div", Cm, [
      r.value ? (f(), x("div", {
        key: 0,
        class: "error-state",
        style: Ce({ height: e.height })
      }, [...ie[0] || (ie[0] = [
        eo('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (f(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: Ce({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (f(), x("div", $m, [...ie[1] || (ie[1] = [
          eo('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : O("", !0)
      ], 4))
    ]));
  }
}), na = /* @__PURE__ */ be(Sm, [["__scopeId", "data-v-c2130602"]]), Mm = ["open"], Dm = { class: "card-header metric-collapsible__summary" }, Am = { class: "header-content metric-header-content" }, Tm = { class: "metric-header-content__main" }, Bm = { class: "metric-header-content__text" }, Lm = { class: "metric-header-content__loaded" }, Rm = {
  key: 0,
  class: "card-title"
}, Pm = {
  key: 0,
  class: "card-subtitle"
}, Im = {
  key: 0,
  class: "metric-header-content__export"
}, Em = {
  key: 0,
  class: "cmc-header-aside"
}, Fm = {
  key: 0,
  class: "chart-metric-container__body"
}, Om = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Vm = { key: "body-content" }, zm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Nm = { class: "card-header" }, jm = { class: "header-content metric-header-content" }, Hm = { class: "metric-header-content__main" }, Wm = { class: "metric-header-content__text" }, Km = { class: "metric-header-content__loaded" }, Um = {
  key: 0,
  class: "card-title"
}, Ym = {
  key: 0,
  class: "card-subtitle"
}, qm = {
  key: 0,
  class: "metric-header-content__export"
}, Xm = {
  key: 0,
  class: "cmc-header-aside"
}, Gm = {
  key: 0,
  class: "chart-metric-container__body"
}, Zm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Qm = { key: "body-content" }, Jm = /* @__PURE__ */ fe({
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
    function o(h) {
      return h === !0;
    }
    const s = oe(null), i = oe(o(a.defaultOpen)), l = oe(o(a.defaultOpen)), r = ho();
    function c(h) {
      return h.some((b) => {
        if (b.type === Yl) return !1;
        if (b.type === Text) {
          const v = b.children;
          return typeof v == "string" && v.trim().length > 0;
        }
        return !!b.type;
      });
    }
    const u = C(() => a.collapsible ? a.lazyMount ? l.value : i.value : !0), g = C(() => a.loading && u.value), m = C(() => {
      if (a.collapsible && !i.value) return !1;
      const h = r.headerExport;
      return h ? c(h()) : !1;
    });
    Te(
      () => a.defaultOpen,
      (h) => {
        if (!a.collapsible) return;
        const b = o(h);
        i.value = b, b && (l.value = !0), s.value && s.value.open !== b && (s.value.open = b);
      }
    ), Je(() => {
      !a.collapsible || !s.value || (s.value.open = i.value);
    });
    function p(h) {
      const b = h.currentTarget;
      if (b?.tagName !== "DETAILS") return;
      const v = i.value, y = b.open;
      if (i.value = y, y && !v) {
        const w = !l.value;
        l.value = !0, w && n("open");
      }
      n("toggle", y);
    }
    return (h, b) => e.collapsible ? (f(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: p
    }, [
      d("summary", Dm, [
        d("div", Am, [
          d("div", Tm, [
            d("div", Bm, [
              d("div", Lm, [
                ke(h.$slots, "title", {}, () => [
                  e.title ? (f(), x("h3", Rm, A(e.title), 1)) : O("", !0)
                ], !0),
                e.subtitle ? (f(), x("p", Pm, A(e.subtitle), 1)) : O("", !0),
                ke(h.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (f(), x("div", Im, [
              ke(h.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          h.$slots.headerAside ? (f(), x("div", Em, [
            ke(h.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ]),
        b[0] || (b[0] = d("svg", {
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
      u.value ? (f(), x("div", Fm, [
        N(gt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            g.value ? (f(), x("div", Om, [
              ke(h.$slots, "loading", {}, () => [
                b[1] || (b[1] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (f(), x("div", Vm, [
              ke(h.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : O("", !0)
    ], 40, Mm)) : (f(), x("div", zm, [
      d("div", Nm, [
        d("div", jm, [
          d("div", Hm, [
            d("div", Wm, [
              d("div", Km, [
                ke(h.$slots, "title", {}, () => [
                  e.title ? (f(), x("h3", Um, A(e.title), 1)) : O("", !0)
                ], !0),
                e.subtitle ? (f(), x("p", Ym, A(e.subtitle), 1)) : O("", !0),
                ke(h.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (f(), x("div", qm, [
              ke(h.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          h.$slots.headerAside ? (f(), x("div", Xm, [
            ke(h.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ])
      ]),
      u.value ? (f(), x("div", Gm, [
        N(gt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            g.value ? (f(), x("div", Zm, [
              ke(h.$slots, "loading", {}, () => [
                b[2] || (b[2] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (f(), x("div", Qm, [
              ke(h.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : O("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ be(Jm, [["__scopeId", "data-v-ade4038f"]]);
function ep(e, t) {
  return f(), x("svg", {
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
      d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    })
  ]);
}
function ro(e, t) {
  return f(), x("svg", {
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
function Po(e, t) {
  return f(), x("svg", {
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
function rt(e, t) {
  return f(), x("svg", {
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
function tp(e, t) {
  return f(), x("svg", {
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
function aa(e, t) {
  return f(), x("svg", {
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
function Io(e, t) {
  return f(), x("svg", {
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
function Eo(e, t) {
  return f(), x("svg", {
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
function xl(e, t) {
  return f(), x("svg", {
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
function ap(e, t) {
  return f(), x("svg", {
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
function ci(e, t) {
  return f(), x("svg", {
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
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    })
  ]);
}
function np(e, t) {
  return f(), x("svg", {
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
      d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    })
  ]);
}
function di(e, t) {
  return f(), x("svg", {
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
      d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    }),
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ]);
}
function op(e, t) {
  return f(), x("svg", {
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
      d: "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
    })
  ]);
}
function Fo(e, t) {
  return f(), x("svg", {
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
      d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    })
  ]);
}
function sp(e, t) {
  return f(), x("svg", {
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
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    })
  ]);
}
function ip(e, t) {
  return f(), x("svg", {
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
      d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    })
  ]);
}
function lp(e, t) {
  return f(), x("svg", {
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
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })
  ]);
}
function co(e, t) {
  return f(), x("svg", {
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
const rp = {
  key: 0,
  class: "footer-divider"
}, cp = {
  key: 0,
  class: "export-label"
}, dp = { class: "export-buttons" }, up = ["disabled"], hp = {
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
}, gp = ["disabled"], mp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, pp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, bp = /* @__PURE__ */ fe({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = C(() => a.variant === "footer" ? "footer" : "div"), s = C(
      () => a.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => a.formats.includes(r), l = (r) => {
      a.loading || n("export", r);
    };
    return (r, c) => (f(), ne(ft(o.value), {
      class: Z(s.value)
    }, {
      default: F(() => [
        e.variant === "footer" ? (f(), x("div", rp)) : O("", !0),
        d("div", {
          class: Z(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (f(), x("span", cp, "Export")) : O("", !0),
          d("div", dp, [
            i("pdf") ? (f(), x("button", {
              key: 0,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (f(), x("svg", hp, [...c[2] || (c[2] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (f(), x("svg", fp, [...c[3] || (c[3] = [
                d("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                d("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                d("line", {
                  x1: "16",
                  y1: "13",
                  x2: "8",
                  y2: "13"
                }, null, -1),
                d("line", {
                  x1: "16",
                  y1: "17",
                  x2: "8",
                  y2: "17"
                }, null, -1),
                d("polyline", { points: "10 9 9 9 8 9" }, null, -1)
              ])])),
              c[4] || (c[4] = d("span", null, "PDF", -1))
            ], 10, up)) : O("", !0),
            i("csv") ? (f(), x("button", {
              key: 1,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (f(), x("svg", mp, [...c[5] || (c[5] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (f(), x("svg", pp, [...c[6] || (c[6] = [
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
              c[7] || (c[7] = d("span", null, "CSV", -1))
            ], 10, gp)) : O("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ne = /* @__PURE__ */ be(bp, [["__scopeId", "data-v-ebfab47f"]]), vp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, xp = { class: "w-full shrink-0 sm:pr-2" }, kp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, _p = { class: "max-w-[360px] text-center" }, wp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Cp = /* @__PURE__ */ fe({
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
    }, l = $e(o, "theme"), r = $e(o, "options"), { isDark: c } = Me(l), u = (m) => {
      const p = new Date(m), h = String(p.getDate()).padStart(2, "0"), b = String(p.getMonth() + 1).padStart(2, "0");
      return `${h}-${b}`;
    }, g = C(() => {
      const m = o.data?.agents_by_day || {}, p = Object.keys(m).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((_) => u(_)), b = /* @__PURE__ */ new Set();
      for (const _ of Object.values(m))
        for (const k of Object.keys(_))
          b.add(k);
      const v = Array.from(b), y = (_) => _, w = v.map((_) => ({
        label: _,
        data: p.map((k) => m[k]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: y(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: h,
        datasets: w
      };
    });
    return t({ isDark: c }), (m, p) => (f(), ne(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", vp, [
          N(gt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: F(() => [
              g.value.labels && g.value.labels.length ? (f(), x("section", yp, [
                d("div", xp, [
                  N($t, {
                    data: g.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (f(), x("section", kp, [
                d("div", _p, [
                  d("div", wp, [
                    N(B(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  p[0] || (p[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  p[1] || (p[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), $p = /* @__PURE__ */ be(Cp, [["__scopeId", "data-v-f8d0ec91"]]), Sp = { class: "flex w-full min-w-0 justify-center" }, Mp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Dp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Ap = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Tp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Bp = /* @__PURE__ */ fe({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (f(), x("div", {
      class: Z(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", Sp, [
        d("div", Mp, [
          e.color ? (f(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Ce({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          d("span", Dp, A(e.title), 1)
        ])
      ]),
      d("p", Ap, A(e.value), 1),
      e.subvalue ? (f(), x("p", Tp, A(e.subvalue), 1)) : O("", !0)
    ], 2));
  }
}), xe = /* @__PURE__ */ be(Bp, [["__scopeId", "data-v-0d546967"]]), kl = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function _l(e, t) {
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
const Lp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ge = /* @__PURE__ */ fe({
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
    const t = e, a = C(
      () => t.statusLive === !0 || t.statusLive === !1
    ), n = C(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), o = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(
      () => _l(t.color, t.outlined)
    );
    return (l, r) => a.value ? (f(), x("span", {
      key: 0,
      role: "status",
      class: Z(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (f(), x("span", Lp, [...r[0] || (r[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      d("span", {
        class: Z(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (f(), x("span", {
      key: 1,
      class: Z([B(kl), i.value])
    }, [
      ke(l.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), me = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Ie = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Yt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Rp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Pp = { class: "overflow-x-auto" }, Ip = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Ep = ["aria-sort", "onClick"], Fp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Op = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Vp = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, zp = /* @__PURE__ */ fe({
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
    function i(k) {
      return k == null || k === "" ? s : String(k);
    }
    function l(k) {
      return k === "center" ? "text-center" : k === "right" ? "text-right" : "text-left";
    }
    function r(k) {
      return `cell-${k}`;
    }
    function c(k, $) {
      return k[$];
    }
    function u(k, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(k);
      const S = k[a.rowKey];
      return typeof S == "string" || typeof S == "number" ? S : $;
    }
    function g(k, $) {
      return u(k, $);
    }
    function m(k) {
      return a.sortKey === k && a.sortDirection != null;
    }
    function p(k) {
      n("sort", k);
    }
    function h(k) {
      return m(k) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const b = C(() => a.rows?.length ?? 0), v = C(() => b.value > a.maxVisibleRows), y = C(() => Math.max(0, b.value - a.maxVisibleRows)), w = C(() => a.rows?.length ? o.value || !v.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), _ = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(y.value))
    );
    return (k, $) => (f(), x("div", Rp, [
      d("div", Pp, [
        d("table", Ip, [
          d("thead", null, [
            d("tr", null, [
              (f(!0), x(he, null, pe(e.columns, (S) => (f(), x("th", {
                key: S.key,
                scope: "col",
                class: Z(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(S.align), S.headerClass]])
              }, [
                S.sortable ? (f(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", l(S.align)]),
                  "aria-sort": h(S.key),
                  onClick: (D) => p(S.key)
                }, [
                  d("span", null, A(S.label), 1),
                  d("span", Fp, [
                    m(S.key) ? (f(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (f(), x("span", Op, "↑")) : e.sortDirection === "desc" ? (f(), x("span", Vp, "↓")) : O("", !0)
                    ], 64)) : (f(), x(he, { key: 1 }, [
                      $[1] || ($[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Ep)) : (f(), x(he, { key: 1 }, [
                  Ae(A(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (f(!0), x(he, null, pe(w.value, (S, D) => (f(), x("tr", {
              key: g(S, D)
            }, [
              (f(!0), x(he, null, pe(e.columns, (P) => (f(), x("td", {
                key: `${D}-${P.key}`,
                class: Z(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(P.align), P.cellClass]])
              }, [
                ke(k.$slots, r(P.key), {
                  row: S,
                  column: P,
                  value: c(S, P.key)
                }, () => [
                  Ae(A(i(c(S, P.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      v.value ? (f(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (f(), x("svg", {
          class: Z(["view-more-icon", { "view-more-icon-rotated": o.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...$[3] || ($[3] = [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : O("", !0)
    ]));
  }
}), pt = /* @__PURE__ */ be(zp, [["__scopeId", "data-v-22a97a18"]]), Np = {
  key: "error",
  class: "error-state"
}, jp = { class: "error-content" }, Hp = { class: "error-description" }, Wp = {
  key: "content",
  class: "card-body"
}, Kp = { class: "chart-section" }, Up = { class: "chart-wrapper" }, Yp = { class: "payment-success-summary" }, qp = {
  key: 0,
  class: "booking-daily-section"
}, Xp = { class: "w-full min-w-0" }, Gp = { class: "font-medium" }, Zp = { class: "percentage-text" }, Qp = { class: "badges-container" }, Jp = {
  key: 0,
  class: "badges-container"
}, e0 = {
  key: 1,
  class: "percentage-text"
}, t0 = { class: "badges-container" }, a0 = {
  key: 1,
  class: "empty-state"
}, n0 = /* @__PURE__ */ fe({
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
    function a(y) {
      return y;
    }
    const n = e, o = t, s = (y) => {
      o("export", y);
    }, i = C(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (y, w) => new Date(y.date).getTime() - new Date(w.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = C(
      () => i.value.map((y) => ({
        id: y.date,
        ...y
      }))
    ), c = C(() => n.data?.total_payment_success_value || []), u = C(() => {
      const y = c.value;
      return y.length === 0 ? h(0) : y.map(
        (w) => `${w.currency} ${h(w.total_value)}`
      ).join(" · ");
    }), g = (y) => y.payment_success_value || [], m = (y) => typeof y.payment_success_count == "number" ? y.payment_success_count : (y.payment_success_value || []).reduce(
      (w, _) => w + (_.count || 0),
      0
    ), p = (y) => Ie(y), h = (y) => y == null ? "0" : Yt(y);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (y, w) => y + (w.total_value || 0),
      0
    ));
    const b = C(() => {
      const y = n.data, w = y.total_booking_initiated || 0, _ = y.total_booking_started || 0, k = y.total_payment_initiated || 0, $ = y.total_not_found || 0, S = y.total_cancelled || 0, D = y.total_no_pending_balance || 0, P = y.total_errors || 0, V = typeof y.total_payment_success == "number" ? y.total_payment_success : (y.total_payment_success_value || []).reduce(
        (Q, re) => Q + (re.count || 0),
        0
      ), W = y.total_payment_failed || 0, M = Math.max(0, w - _), R = Math.max(
        0,
        _ - k - $ - S - D - P
      ), T = (Q, re) => ye(Q, re), j = [
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
      return _ > 0 && H.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: T(_, w)
      }), M > 0 && H.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: M,
        label: T(M, w)
      }), k > 0 && H.push({
        source: "Started",
        target: "Payment Initiated",
        value: k,
        label: T(k, w)
      }), $ > 0 && H.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: T($, w)
      }), S > 0 && H.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: T(S, w)
      }), D > 0 && H.push({
        source: "Started",
        target: "No Pending Balance",
        value: D,
        label: T(D, w)
      }), P > 0 && H.push({
        source: "Started",
        target: "Errors",
        value: P,
        label: T(P, w)
      }), R > 0 && H.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: R,
        label: T(R, w)
      }), V > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: V,
        label: T(V, w)
      }), W > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: W,
        label: T(W, w)
      }), { nodes: j, links: H };
    }), v = (y, w) => It(y, w);
    return (y, w) => (f(), ne(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: w[0] || (w[0] = (_) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading && !n.error ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        N(gt, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            n.error ? (f(), x("div", Np, [
              d("div", jp, [
                w[1] || (w[1] = d("div", { class: "error-icon-wrapper" }, [
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
                w[2] || (w[2] = d("p", { class: "error-title" }, "Error loading data", -1)),
                d("p", Hp, A(n.error), 1)
              ])
            ])) : (f(), x("div", Wp, [
              d("section", Kp, [
                d("div", Up, [
                  N(na, {
                    data: b.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              d("section", Yp, [
                N(xe, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: u.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (f(), x("section", qp, [
                w[3] || (w[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", Xp, [
                  N(pt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": F(({ row: _ }) => [
                      d("span", Gp, A(B(ze)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": F(({ row: _ }) => [
                      d("span", null, A(B(me)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": F(({ row: _ }) => [
                      d("span", null, [
                        Ae(A(B(me)(Number(_.booking_started_count))) + " ", 1),
                        d("span", Zp, " (" + A(v(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": F(({ row: _ }) => [
                      d("span", null, A(B(me)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": F(({ row: _ }) => [
                      d("div", Qp, [
                        N(Ge, { color: "success" }, {
                          default: F(() => [
                            Ae(" Success: " + A(B(me)(
                              m(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Failed: " + A(B(me)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": F(({ row: _ }) => [
                      g(_).length > 0 ? (f(), x("div", Jp, [
                        (f(!0), x(he, null, pe(g(
                          _
                        ), (k) => (f(), x("span", {
                          key: `${_.date}-${k.currency}`,
                          class: "badge badge-currency"
                        }, A(k.currency) + " " + A(p(k.total_value)), 1))), 128))
                      ])) : (f(), x("span", e0, "N/A"))
                    ]),
                    "cell-outcomes": F(({ row: _ }) => [
                      d("div", t0, [
                        N(Ge, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Not Found: " + A(_.not_found_count ? B(me)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "warning" }, {
                          default: F(() => [
                            Ae(" Cancelled: " + A(_.cancelled_count ? B(me)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "orange" }, {
                          default: F(() => [
                            Ae(" No Balance: " + A(_.no_pending_balance_count ? B(me)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Errors: " + A(_.error_count ? B(me)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (f(), x("section", a0, [...w[4] || (w[4] = [
                d("div", { class: "empty-state-content" }, [
                  d("div", { class: "empty-icon-wrapper" }, [
                    d("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      d("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      })
                    ])
                  ]),
                  d("p", { class: "empty-title" }, "No booking manager data available"),
                  d("p", { class: "empty-description" }, " No booking manager data found for the selected period. Try adjusting the date range. ")
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
}), o0 = /* @__PURE__ */ be(n0, [["__scopeId", "data-v-d68eddff"]]), s0 = { class: "card-body" }, i0 = {
  key: 0,
  class: "chart-section"
}, l0 = { class: "chart-wrapper" }, r0 = {
  key: 1,
  class: "checkin-daily-section"
}, c0 = { class: "w-full min-w-0" }, d0 = { class: "font-medium" }, u0 = { class: "cell-success" }, h0 = { class: "cell-danger" }, f0 = {
  key: 0,
  class: "reasons-list"
}, g0 = { class: "reason-name" }, m0 = { class: "reason-count" }, p0 = {
  key: 1,
  class: "no-reasons"
}, b0 = {
  key: 2,
  class: "empty-state"
}, v0 = {
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
    const a = t, n = (k) => {
      a("export", k);
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
    }, l = oe([]), r = [
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
    }, u = C(
      () => o.showPaymentLinks ? [...r, c] : r
    ), g = C(
      () => (l.value || []).map((k) => ({
        id: k.date,
        date: k.date,
        checkin_initiated_count: k.checkin_initiated_count,
        checkin_init_count: k.checkin_init_count,
        checkin_started_count: k.checkin_started_count,
        checkin_completed_count: k.checkin_completed_count,
        checkin_closed_count: k.checkin_closed_count,
        failed_steps: k.failed_steps,
        record_locator_create_payment_count: k.record_locator_create_payment_count
      }))
    ), m = C(() => {
      const k = o.data;
      return k && (Array.isArray(k.checkin_by_day) && k.checkin_by_day.length > 0 || (k.total_checkin_initiated ?? 0) > 0) ? { ...s, ...k } : o.checkinData ?? s;
    }), p = C(() => {
      const k = o.data;
      return k && (Array.isArray(k.failed_by_step_by_day) && k.failed_by_step_by_day.length > 0 || Array.isArray(k.unrecovered_by_step) && k.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: k.total_checkin_failed ?? 0,
        total_checkin_unrecovered: k.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: k.failed_by_step_by_day ?? [],
        unrecovered_by_step: k.unrecovered_by_step ?? [],
        unrecovered_by_day: k.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), h = (k, $) => !$ || $ === 0 ? "0.0%" : It(k, $), b = (k, $) => {
      const S = me(k), D = h(k, $);
      return `${S} (${D})`;
    }, v = (k) => k.reduce(($, S) => $ + S.failed_count, 0), y = C(() => {
      const k = [], $ = [], S = /* @__PURE__ */ new Set(), D = (ee, G = {}) => {
        S.has(ee) || (k.push({ name: ee, ...G }), S.add(ee));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: k, links: $ };
      D("Checkin Init", { value: m.value.total_checkin_initiated }), D("Booking retrive"), D("Booking retrive success"), D("Number of Passengers"), D("Completed"), D("Closed with BP");
      const P = m.value.total_checkin_initiated, V = m.value.total_checkin_init, W = m.value.total_checkin_init_abandoned || 0, M = m.value.total_checkin_pre_init_abandoned_error, R = m.value.total_checkin_pre_init_abandoned_voluntary, T = M != null || R != null, j = T ? Math.max(Number(M) || 0, 0) : 0, H = T ? Math.max(Number(R) || 0, 0) : 0, Q = m.value.total_checkin_init_abandoned_error, re = m.value.total_checkin_init_abandoned_voluntary, de = Q != null || re != null, q = de ? Math.max(Number(Q) || 0, 0) : 0, ae = de ? Math.max(Number(re) || 0, 0) : 0, L = de ? Math.max(W - q - ae, 0) : W, K = V - W, Y = m.value.total_checkin_started, z = m.value.total_checkin_completed, le = m.value.total_checkin_closed, ce = p.value.unrecovered_by_step || [], ve = ce.reduce(
        (ee, G) => ee + G.count,
        0
      );
      V > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: V,
        label: ye(V, P)
      });
      const U = P - V;
      T ? (H > 0 && (D("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ye(H, P)
      })), j > 0 && (D("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: j,
        label: ye(j, P)
      }))) : U > 0 && (D("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: U,
        label: ye(U, P)
      })), de ? (q > 0 && (D("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: q,
        label: ye(q, P)
      })), ae > 0 && (D("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: ae,
        label: ye(ae, P)
      })), L > 0 && (D("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, P)
      }))) : W > 0 && (D("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: W,
        label: ye(W, P)
      })), K > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: K,
        label: ye(K, P)
      }), Y > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: Y,
        label: ye(Y, P)
      }), z > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: z,
        label: ye(z, P)
      }), ce.length > 0 && ve > 0 && (D("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: ve,
        label: ye(ve, P)
      }), ce.forEach((ee, G) => {
        const X = ee.step_name.replace(/_/g, " ").split(" ").map((te) => te.charAt(0).toUpperCase() + te.slice(1)).join(" ");
        D(X, { status: "error", order: G + 1 }), $.push({
          source: "Unrecovered",
          target: X,
          value: ee.count,
          label: ye(ee.count, P)
        });
      }));
      const ie = Y - (z + ve);
      ie > 0 && (D("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: ie,
        label: ye(ie, P)
      }));
      const ue = z - le;
      return ue > 0 && (D("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: ue,
        label: ye(ue, P)
      })), le > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: le,
        label: ye(le, P)
      }), { nodes: k, links: $ };
    }), w = () => {
      const k = o.data?.record_locator_by_day;
      if (Array.isArray(k) && k.length > 0) return k;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, _ = () => {
      const k = m.value.checkin_by_day || [], $ = p.value.failed_by_step_by_day || [], S = w();
      if (k.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...k].map((D) => {
        const P = $.find(
          (W) => W.date === D.date
        ), V = S.find(
          (W) => W.date === D.date
        );
        return {
          ...D,
          failed_steps: P?.steps || [],
          record_locator_create_payment_count: D.record_locator_create_payment_count ?? V?.record_locator_create_payment_count ?? 0
        };
      }), l.value.sort((D, P) => new Date(D.date) - new Date(P.date));
    };
    return Te(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (k, $) => (f(), ne(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", s0, [
          y.value.nodes.length > 0 ? (f(), x("section", i0, [
            d("div", l0, [
              N(na, {
                data: y.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (f(), x("section", r0, [
            d("div", c0, [
              N(pt, {
                columns: u.value,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: S }) => [
                  d("span", d0, A(B(ze)(String(S.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": F(({ row: S }) => [
                  d("span", null, A(B(me)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": F(({ row: S }) => [
                  d("span", null, A(b(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": F(({ row: S }) => [
                  d("span", null, A(B(me)(S.checkin_started_count)), 1)
                ]),
                "cell-completed": F(({ row: S }) => [
                  d("span", null, A(b(
                    S.checkin_completed_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": F(({ row: S }) => [
                  d("span", u0, A(b(
                    S.checkin_closed_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": F(({ row: S }) => [
                  d("span", h0, A(b(
                    v(S.failed_steps),
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": F(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (f(), x("div", f0, [
                    (f(!0), x(he, null, pe(S.failed_steps, (D) => (f(), x("div", {
                      key: D.step_name,
                      class: "reason-item"
                    }, [
                      d("span", g0, A(D.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", m0, A(D.failed_count), 1)
                    ]))), 128))
                  ])) : (f(), x("div", p0, "-"))
                ]),
                "cell-createPayment": F(({ row: S }) => [
                  d("span", null, A(B(me)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (f(), x("section", b0, [...$[0] || ($[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No check-in data available"),
              d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in performance data. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, y0 = /* @__PURE__ */ be(v0, [["__scopeId", "data-v-ae5fc0f7"]]), x0 = { class: "card-body" }, k0 = {
  key: 0,
  class: "sankey-section"
}, _0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, w0 = { class: "w-full min-w-0" }, C0 = { class: "font-medium whitespace-nowrap" }, $0 = { class: "cell-success" }, S0 = { class: "cell-danger" }, M0 = {
  key: 0,
  class: "reasons-list"
}, D0 = { class: "reason-name" }, A0 = { class: "reason-count" }, T0 = {
  key: 1,
  class: "no-reasons"
}, B0 = {
  key: 2,
  class: "empty-state"
}, L0 = { class: "empty-state-content" }, R0 = { class: "empty-icon-wrapper" }, P0 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = ($) => {
      o("export", $);
    }, { isDark: i } = Me($e(n, "theme")), l = ($) => $ == null ? "0" : $.toLocaleString(), r = ($) => {
      const [S, D, P] = $.split("-").map(Number);
      return ze([S, D - 1, P]).format("MMM DD");
    }, c = ($) => $.replace(/_/g, " ").replace(/\b\w/g, (S) => S.toUpperCase()), u = ($, S) => It($, S), g = ($, S) => {
      const D = $ || 0, P = S || 0, V = l(D), W = u(D, P);
      return `${V} (${W})`;
    }, m = C(() => {
      const $ = n.checkinData?.record_locator_by_day || [], S = n.failedData?.failed_by_step_by_day || [], D = n.failedData?.unrecovered_by_day || [];
      return $.map((V) => {
        const W = S.find((R) => R.date === V.date), M = D.find(
          (R) => R.date === V.date
        );
        return {
          ...V,
          failed_steps: W?.steps || [],
          unrecovered_count: M?.unrecovered_count || 0
        };
      }).sort(
        (V, W) => new Date(V.date).getTime() - new Date(W.date).getTime()
      );
    }), p = /* @__PURE__ */ new Set([
      "choose_boardingpass",
      "boarding_pass",
      "generate_boarding_pass"
    ]), h = ($) => {
      if (!$) return !1;
      const S = $.toLowerCase().trim();
      return p.has(S) || S.includes("boarding_pass");
    }, b = ($) => {
      const S = $?.failed_by_step_by_day || [];
      let D = 0;
      for (const P of S)
        for (const V of P.steps || [])
          h(V.step_name) && (D += V.failed_count || 0);
      if (D > 0) return D;
      for (const P of $?.unrecovered_by_step || [])
        h(P.step_name) && (D += P.count || 0);
      return D;
    }, v = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], y = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, w = C(() => n.isAvianca ? [...v, y] : v), _ = C(
      () => m.value.map(($) => ({
        id: $.date,
        date: $.date,
        checkin_initiated: $.checkin_initiated,
        record_locator_init_count: $.record_locator_init_count,
        record_locator_started_count: $.record_locator_started_count,
        record_locator_completed_count: $.record_locator_completed_count,
        record_locator_closed_count: $.record_locator_closed_count,
        unrecovered_count: $.unrecovered_count,
        failed_steps: $.failed_steps,
        record_locator_create_payment_count: $.record_locator_create_payment_count
      }))
    ), k = C(() => {
      const $ = [], S = [], D = /* @__PURE__ */ new Set(), P = (X, te = {}) => {
        D.has(X) || ($.push({ name: X, ...te }), D.add(X));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: $, links: S };
      const V = n.checkinData.total_checkin_initiated || 0;
      P("Checkin Init", { value: V }), P("Booking Retrieval"), P("Booking Retrieved"), P("Check-in Closed"), P("BP Issued");
      const W = n.checkinData.total_record_locator_init || 0, M = n.checkinData.total_record_locator_init_abandoned || 0, R = n.checkinData.total_checkin_pre_init_abandoned_error, T = n.checkinData.total_checkin_pre_init_abandoned_voluntary, j = R != null || T != null, H = j ? Math.max(Number(R) || 0, 0) : 0, Q = j ? Math.max(Number(T) || 0, 0) : 0, re = n.checkinData.total_record_locator_init_abandoned_error, de = n.checkinData.total_record_locator_init_abandoned_voluntary, q = re != null || de != null, ae = q ? Math.max(Number(re) || 0, 0) : 0, L = q ? Math.max(Number(de) || 0, 0) : 0, K = q ? Math.max(M - ae - L, 0) : M, Y = W - M, z = n.checkinData.total_record_locator_started || 0, le = n.checkinData.total_record_locator_completed || 0, ce = n.checkinData.total_record_locator_closed || 0, ve = n.checkinData.total_record_locator_unrecovered || 0;
      W > 0 && S.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: W,
        label: ye(W, V)
      });
      const U = V - W;
      j ? (Q > 0 && (P("Abandoned (Init)"), S.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, V)
      })), H > 0 && (P("Booking not retreived"), S.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, V)
      }))) : U > 0 && (P("Abandoned (Init)"), S.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: U,
        label: ye(U, V)
      }));
      const ie = n.isAvianca ? "Abandoned (Booking)" : "Abandoned (Started)";
      q ? (ae > 0 && (P("Error"), S.push({
        source: "Booking Retrieval",
        target: "Error",
        value: ae,
        label: ye(ae, V)
      })), L > 0 && (P(ie, { status: "abandon" }), S.push({
        source: "Booking Retrieval",
        target: ie,
        value: L,
        label: ye(L, V)
      })), K > 0 && (P(ie, { status: "abandon" }), S.push({
        source: "Booking Retrieval",
        target: ie,
        value: K,
        label: ye(K, V)
      }))) : M > 0 && (P(ie, { status: "abandon" }), S.push({
        source: "Booking Retrieval",
        target: ie,
        value: M,
        label: ye(M, V)
      })), Y > 0 && S.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: Y,
        label: ye(Y, V)
      }), ce > 0 && S.push({
        source: "Booking Retrieved",
        target: "Check-in Closed",
        value: ce,
        label: ye(ce, V)
      });
      const ue = b(n.failedData), ee = Math.min(ue, Math.max(ce - le, 0));
      le > 0 && S.push({
        source: "Check-in Closed",
        target: "BP Issued",
        value: le,
        label: ye(le, V)
      }), ee > 0 && (P("BP Error", { status: "error" }), S.push({
        source: "Check-in Closed",
        target: "BP Error",
        value: ee,
        label: ye(ee, V)
      }));
      const G = Math.max(ce - le - ee, 0);
      G > 0 && (P("Abandoned after Closed", { status: "abandon" }), S.push({
        source: "Check-in Closed",
        target: "Abandoned after Closed",
        value: G,
        label: ye(G, V)
      })), ve > 0 && (P("Errors", { status: "error" }), S.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: ve,
        label: ye(ve, V)
      }));
      const I = Math.max(z - ce - ve, 0);
      return I > 0 && (P("Abandoned before Closed", { status: "abandon" }), S.push({
        source: "Booking Retrieved",
        target: "Abandoned before Closed",
        value: I,
        label: ye(I, V)
      })), { nodes: $, links: S };
    });
    return t({ isDark: i }), ($, S) => (f(), ne(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", x0, [
          k.value.nodes.length > 0 ? (f(), x("div", k0, [
            N(na, {
              data: k.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : O("", !0),
          m.value && m.value.length > 0 ? (f(), x("div", _0, [
            d("div", w0, [
              N(pt, {
                columns: w.value,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: D }) => [
                  d("span", C0, A(r(String(D.date))), 1)
                ]),
                "cell-checkinInit": F(({ row: D }) => [
                  d("span", null, A(l(D.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": F(({ row: D }) => [
                  d("span", null, A(g(
                    D.record_locator_init_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": F(({ row: D }) => [
                  d("span", null, A(g(
                    D.record_locator_started_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": F(({ row: D }) => [
                  d("span", null, A(g(
                    D.record_locator_closed_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": F(({ row: D }) => [
                  d("span", $0, A(g(
                    D.record_locator_completed_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": F(({ row: D }) => [
                  d("span", S0, A(g(
                    D.unrecovered_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": F(({ row: D }) => [
                  d("span", null, A(l(
                    D.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": F(({ row: D }) => [
                  Array.isArray(D.failed_steps) && D.failed_steps.length > 0 ? (f(), x("div", M0, [
                    (f(!0), x(he, null, pe(D.failed_steps, (P) => (f(), x("div", {
                      key: P.step_name,
                      class: "reason-item"
                    }, [
                      d("span", D0, A(c(P.step_name)) + ":", 1),
                      d("span", A0, A(P.failed_count), 1)
                    ]))), 128))
                  ])) : (f(), x("div", T0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (f(), x("div", B0, [
            d("div", L0, [
              d("div", R0, [
                N(B(rt), { class: "empty-icon" })
              ]),
              S[0] || (S[0] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
              S[1] || (S[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), wl = /* @__PURE__ */ be(P0, [["__scopeId", "data-v-bdd4eaca"]]), I0 = { class: "card-body" }, E0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, F0 = { class: "w-full min-w-0" }, O0 = { class: "segment-plain" }, V0 = { class: "segment-plain" }, z0 = { class: "segment-plain" }, N0 = { class: "percentage-value" }, j0 = { class: "percentage-value" }, H0 = { class: "percentage-value success" }, W0 = {
  key: 1,
  class: "empty-state"
}, K0 = /* @__PURE__ */ fe({
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
    }, { isDark: i } = Me($e(n, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" }
    ], r = C(
      () => n.data.map((m, p) => ({
        id: `segment-${p}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, p) => !p || p === 0 || !m ? "0%" : `${Math.round(m / p * 100)}%`, u = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), g = (m) => {
      const p = u(m?.departure_airport), h = u(m?.arrival_airport);
      return p === "-" || h === "-" ? !1 : p === h;
    };
    return t({ isDark: i }), (m, p) => (f(), ne(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", I0, [
          n.data.length > 0 ? (f(), x("section", E0, [
            d("div", F0, [
              N(pt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": F(({ row: h }) => [
                  d("span", O0, A(u(h.departure_airport)), 1)
                ]),
                "cell-connection": F(({ row: h }) => [
                  d("span", {
                    class: Z(["segment-plain", {
                      "segment-plain--muted": u(h.conexion_airport) === "-"
                    }])
                  }, A(u(h.conexion_airport)), 3)
                ]),
                "cell-arrival": F(({ row: h }) => [
                  d("span", V0, A(u(h.arrival_airport)), 1)
                ]),
                "cell-trip": F(({ row: h }) => [
                  d("span", z0, A(g(h) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": F(({ row: h }) => [
                  Ae(A(B(me)(h.segment_init_count)), 1)
                ]),
                "cell-started": F(({ row: h }) => [
                  d("span", N0, A(c(
                    h.segment_started_count,
                    h.segment_init_count
                  )), 1)
                ]),
                "cell-closed": F(({ row: h }) => [
                  d("span", j0, A(c(
                    h.segment_closed_count,
                    h.segment_init_count
                  )), 1)
                ]),
                "cell-completed": F(({ row: h }) => [
                  d("span", H0, A(c(
                    h.segment_completed_count,
                    h.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (f(), x("section", W0, [...p[0] || (p[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No segment data available"),
              d("p", { class: "empty-description" }, " No flight segment data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Cl = /* @__PURE__ */ be(K0, [["__scopeId", "data-v-9a9d7a34"]]), U0 = { class: "checkin-container__body" }, Y0 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = C(
      () => a.loading ? !1 : a.checkinLoading
    ), s = C(
      () => a.loading ? !1 : a.segmentsLoading
    );
    function i(c, u) {
      n("export", { source: c, format: u });
    }
    function l(c) {
      return typeof c == "object" && c !== null && "source" in c;
    }
    function r(c) {
      if (l(c)) {
        n("export", c);
        return;
      }
      i("checkinSegments", c);
    }
    return (c, u) => (f(), ne(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[1] || (u[1] = (g) => n("open"))
    }, {
      default: F(() => [
        d("div", U0, [
          e.showCheckin ? (f(), ne(wl, {
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
            onExport: u[0] || (u[0] = (g) => i("checkin", g))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "is-avianca"])) : O("", !0),
          N(Cl, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            data: e.segmentsData ?? [],
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: r
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), q0 = /* @__PURE__ */ be(Y0, [["__scopeId", "data-v-bedc6aa8"]]), X0 = { class: "card-body" }, G0 = { class: "chart-section" }, Z0 = { class: "chart-wrapper" }, Q0 = {
  key: 1,
  class: "empty-chart"
}, J0 = { class: "payment-success-summary" }, eb = {
  key: 0,
  class: "disruption-daily-section"
}, tb = { class: "w-full min-w-0" }, ab = { class: "font-medium text-center" }, nb = { class: "text-center" }, ob = { class: "text-center" }, sb = { class: "percentage-text" }, ib = { class: "text-center" }, lb = { class: "abandoned-value" }, rb = { class: "badges-container badges-wrap" }, cb = { class: "badges-container badges-wrap" }, db = {
  key: 1,
  class: "empty-state"
}, ub = /* @__PURE__ */ fe({
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
    function a(v) {
      return v;
    }
    const n = e, o = t, s = (v) => {
      o("export", v);
    }, i = C(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (v, y) => new Date(v.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], r = C(
      () => i.value.map((v) => ({
        id: v.date,
        ...v
      }))
    ), c = C(() => n.data?.total_payment_success || []), u = C(() => {
      const v = c.value;
      return v.length === 0 ? m(0) : v.map((y) => `${y.currency} ${m(y.total_value)}`).join(" · ");
    }), g = (v, y) => It(v, y), m = (v) => Ie(v), p = (v) => (v ?? []).reduce((y, w) => y + (w.count ?? 0), 0), h = (v) => typeof v.sell_success_count == "number" ? v.sell_success_count : p(v.payment_success_total), b = C(() => {
      const v = n.data, y = v.total_disruption_conversations || 0, w = v.total_disruption_initiated || 0, _ = v.total_voluntary || 0, k = v.total_involuntary || 0, $ = v.total_accepted || 0, S = v.total_confirmed || 0, D = typeof v.total_sell_success == "number" ? v.total_sell_success : p(v.total_payment_success), P = v.total_sell_failed || 0, V = Math.max(0, y - w), W = Math.max(
        0,
        w - _ - k
      ), M = Math.max(0, k - $), R = Math.max(0, _ - S), T = P, j = Math.max(0, S - D - T), H = (de, q) => ye(de, q), Q = [
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
      ], re = [];
      return w > 0 && re.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: H(w, y)
      }), V > 0 && re.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: H(V, y)
      }), _ > 0 && re.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: H(_, y)
      }), k > 0 && re.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: H(k, y)
      }), W > 0 && re.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: W,
        label: H(W, y)
      }), $ > 0 && re.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: H($, y)
      }), M > 0 && re.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: M,
        label: H(M, y)
      }), S > 0 && re.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: H(S, y)
      }), R > 0 && re.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: R,
        label: H(R, y)
      }), D > 0 && re.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: H(D, y)
      }), T > 0 && re.push({
        source: "Confirmed",
        target: "Rejected",
        value: T,
        label: H(T, y)
      }), j > 0 && re.push({
        source: "Confirmed",
        target: "Not Paid",
        value: j,
        label: H(j, y)
      }), { nodes: Q, links: re };
    });
    return (v, y) => (f(), ne(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (w) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", X0, [
          d("section", G0, [
            d("div", Z0, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (f(), ne(na, {
                key: 0,
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (f(), x("div", Q0, [...y[1] || (y[1] = [
                d("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          d("section", J0, [
            N(xe, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (f(), x("section", eb, [
            y[2] || (y[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", tb, [
              N(pt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: w }) => [
                  d("span", ab, A(B(ze)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": F(({ row: w }) => [
                  d("span", nb, A(B(me)(Number(w.disruption_conversations))), 1)
                ]),
                "cell-started": F(({ row: w }) => [
                  d("span", ob, [
                    Ae(A(B(me)(Number(w.disruption_initiated_count))) + " ", 1),
                    d("span", sb, " (" + A(g(
                      Number(w.disruption_initiated_count),
                      Number(w.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": F(({ row: w }) => [
                  d("span", ib, [
                    d("span", lb, A(B(me)(
                      Number(w.disruption_initiated_count) - Number(w.voluntary_count) - Number(w.involuntary_count)
                    )) + " (" + A(g(
                      Number(w.disruption_initiated_count) - Number(w.voluntary_count) - Number(w.involuntary_count),
                      Number(w.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": F(({ row: w }) => [
                  d("div", rb, [
                    (f(!0), x(he, null, pe([w], (_, k) => (f(), x(he, { key: k }, [
                      N(Ge, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: F(() => [
                          Ae(" VOL " + A(B(me)(_.voluntary_count)) + " (" + A(g(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: F(() => [
                          Ae(" Confirm " + A(B(me)(_.confirmed_count)) + " (" + A(g(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "warning" }, {
                        default: F(() => [
                          Ae(" Not Confirm " + A(B(me)(_.voluntary_count - _.confirmed_count)) + " (" + A(g(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: F(() => [
                          Ae(" Reject " + A(B(me)(_.sell_failed_count)) + " (" + A(g(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "orange" }, {
                        default: F(() => [
                          Ae(" Not Paid " + A(B(me)(
                            Math.max(
                              0,
                              _.confirmed_count - h(_) - _.sell_failed_count
                            )
                          )) + " (" + A(g(
                            Math.max(
                              0,
                              _.confirmed_count - h(_) - _.sell_failed_count
                            ),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: F(() => [
                          Ae(" Finish " + A(B(me)(h(_))) + " (" + A(g(
                            h(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (f(!0), x(he, null, pe(_.payment_success_total || [], ($) => (f(), ne(Ge, {
                        key: `${_.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: F(() => [
                          Ae(A($.currency) + " " + A(m($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": F(({ row: w }) => [
                  d("div", cb, [
                    (f(!0), x(he, null, pe([w], (_, k) => (f(), x(he, { key: k }, [
                      N(Ge, { color: "purple" }, {
                        default: F(() => [
                          Ae(" INV " + A(B(me)(_.involuntary_count)) + " (" + A(g(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: F(() => [
                          Ae(" Human " + A(B(me)(_.involuntary_count - _.accepted_count)) + " (" + A(g(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: F(() => [
                          Ae(" Accept " + A(B(me)(_.accepted_count)) + " (" + A(g(
                            _.accepted_count,
                            _.disruption_conversations
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
          ])) : (f(), x("section", db, [...y[3] || (y[3] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
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
              ]),
              d("p", { class: "empty-title" }, "No disruption data available"),
              d("p", { class: "empty-description" }, " No disruption data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), hb = /* @__PURE__ */ be(ub, [["__scopeId", "data-v-033e517a"]]), fb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, mb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, pb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, bb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, vb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, yb = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (p) => {
      o("export", p);
    }, i = $e(n, "theme"), { isDark: l } = Me(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = oe({
      labels: [],
      datasets: []
    }), u = C(
      () => n.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), g = C(() => {
      const p = u.value, h = p.total_airline_information_retrieved + p.total_booking_info_retrieved + p.total_flight_status_retrieved, b = (w) => h > 0 ? (w / h * 100).toFixed(1) : "0.0", v = p.total_faq_events, y = v > 0 ? `${(p.total_documents_found / v * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${b(p.total_airline_information_retrieved)}%`,
          subvalue: `${me(p.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${b(p.total_booking_info_retrieved)}%`,
          subvalue: `${me(p.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${b(p.total_flight_status_retrieved)}%`,
          subvalue: `${me(p.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: me(p.total_documents_found),
          subvalue: y
        }
      ];
    }), m = (p) => {
      if (!p) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const h = p.faq_by_day || [];
      if (h.length > 0) {
        const b = h.map(
          (_) => ze(_.date).format("MMM DD")
        ), v = h.map(
          (_) => _.airline_information_retrieved_count || 0
        ), y = h.map(
          (_) => _.flight_status_retrieved_count || 0
        ), w = h.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: b,
          datasets: [
            {
              label: "Airline Information",
              data: v,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: y,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: w,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Te(
      () => n.data,
      (p) => {
        m(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (p, h) => (f(), ne(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", fb, [
          d("div", gb, [
            c.value.labels && c.value.labels.length ? (f(), x("section", mb, [
              d("div", pb, [
                N(mt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              d("div", bb, [
                (f(!0), x(he, null, pe(g.value, (b) => (f(), ne(xe, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: b.value,
                  subvalue: b.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (f(), x("section", vb, [...h[0] || (h[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("div", { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                  d("svg", {
                    class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])
                ]),
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), xb = /* @__PURE__ */ be(yb, [["__scopeId", "data-v-b6ea961f"]]);
function Bn(e, t) {
  return f(), x("svg", {
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
function kb(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function We() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ct = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", et = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", _b = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", wb = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function ui(e = "neutral") {
  return `${wb} kiut-select-option-badge--${e}`;
}
const Cb = { class: "flex flex-row gap-3 items-center" }, $b = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, Sb = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], Mb = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, Db = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, Ab = { class: "relative" }, Tb = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, Bb = ["placeholder", "aria-label"], Lb = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Rb = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Pb = ["aria-selected", "onClick", "onMouseenter"], Ib = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Eb = { class: "min-w-0 flex-1 truncate" }, Kt = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-select-${We()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = `${o}-err`, c = C(() => a.invalid ?? !1), u = oe(null), g = oe(null), m = oe(null), p = oe(null), h = oe(null), b = oe(!1), v = oe(0), y = oe(""), w = oe({});
    function _() {
      const z = g.value;
      if (!z) return;
      const le = z.getBoundingClientRect();
      w.value = {
        top: `${le.bottom - 3}px`,
        left: `${le.left}px`,
        width: `${le.width}px`
      };
    }
    const k = C(() => a.options.filter((z) => !z.disabled)), $ = C(() => {
      if (!a.searchable) return k.value;
      const z = y.value.trim().toLowerCase();
      return z ? k.value.filter(
        (le) => le.label.toLowerCase().includes(z) || le.badge?.label.toLowerCase().includes(z)
      ) : k.value;
    }), S = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), D = C(
      () => a.options.find((z) => z.value === a.modelValue) ?? null
    ), P = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : D.value?.label ?? String(a.modelValue)), V = C(() => D.value?.leadingClass);
    function W(z) {
      return `${String(z.value)}-${z.label}`;
    }
    function M(z) {
      return a.modelValue === z.value;
    }
    function R(z, le) {
      const ce = M(z), ve = v.value === le, U = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        U ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        ce ? U ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ve ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function T() {
      v.value = Math.max(
        0,
        $.value.findIndex((z) => z.value === a.modelValue)
      );
    }
    function j() {
      if (a.searchable) {
        h.value?.focus();
        return;
      }
      p.value?.focus();
    }
    function H() {
      _(), y.value = "", T(), Ke(() => j());
    }
    function Q() {
      b.value = !1, y.value = "";
    }
    function re(z) {
      n("update:modelValue", z.value), Q();
    }
    function de() {
      if (!a.disabled) {
        if (b.value) {
          Q();
          return;
        }
        b.value = !0, H();
      }
    }
    function q(z) {
      z.stopPropagation(), !a.disabled && de();
    }
    function ae(z) {
      if (!b.value) return;
      const le = z.target, ce = u.value, ve = m.value;
      ce && !ce.contains(le) && (!ve || !ve.contains(le)) && Q();
    }
    function L(z) {
      a.disabled || (z.key === "ArrowDown" || z.key === "Enter" || z.key === " ") && (z.preventDefault(), b.value || (b.value = !0, H()));
    }
    function K(z) {
      const le = $.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (z.key === "ArrowDown") {
        if (z.preventDefault(), le.length === 0) return;
        v.value = 0, p.value?.focus();
        return;
      }
      if (z.key === "ArrowUp") {
        if (z.preventDefault(), le.length === 0) return;
        v.value = le.length - 1, p.value?.focus();
        return;
      }
      if (z.key === "Enter") {
        z.preventDefault();
        const ce = le[v.value];
        ce && re(ce);
      }
    }
    function Y(z) {
      const le = $.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (le.length !== 0) {
        if (z.key === "ArrowDown") {
          z.preventDefault(), v.value = Math.min(v.value + 1, le.length - 1);
          return;
        }
        if (z.key === "ArrowUp") {
          if (z.preventDefault(), v.value === 0 && a.searchable) {
            h.value?.focus();
            return;
          }
          v.value = Math.max(v.value - 1, 0);
          return;
        }
        if (z.key === "Enter") {
          z.preventDefault();
          const ce = le[v.value];
          ce && re(ce);
        }
      }
    }
    return Te(y, () => {
      v.value = 0;
    }), Je(() => {
      document.addEventListener("click", ae);
    }), lt(() => {
      document.removeEventListener("click", ae);
    }), (z, le) => (f(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", Cb, [
        z.$slots.icon ? (f(), x("span", $b, [
          ke(z.$slots, "icon")
        ])) : O("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          id: s,
          class: Z(B(ct))
        }, A(e.label), 3)) : O("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: g,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          B(et),
          c.value ? B(Dt) : "",
          b.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": b.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : S.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: q,
        onKeydown: L
      }, [
        d("span", Mb, [
          V.value ? (f(), x("span", {
            key: 0,
            class: Z([V.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : O("", !0),
          D.value?.leadingIcon ? (f(), x("span", {
            key: 1,
            class: Z([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              D.value.leadingIconWrapperClass
            ])
          }, [
            (f(), ne(ft(D.value.leadingIcon), {
              class: Z(["h-4 w-4", D.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : O("", !0),
          d("span", {
            class: Z([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(P.value), 3),
          D.value?.badge ? (f(), x("span", {
            key: 2,
            class: Z(B(ui)(D.value.badge.variant))
          }, A(D.value.badge.label), 3)) : O("", !0)
        ]),
        N(B(aa), {
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", b.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Sb),
      e.errorText ? (f(), x("p", {
        key: 0,
        id: r,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 3)) : O("", !0),
      (f(), ne(Jt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: m,
          style: Ce(w.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (f(), x("div", Db, [
            d("div", Ab, [
              d("span", Tb, [
                N(B(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
              ]),
              Xe(d("input", {
                ref_key: "searchInputRef",
                ref: h,
                "onUpdate:modelValue": le[0] || (le[0] = (ce) => y.value = ce),
                type: "search",
                class: Z([B(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: le[1] || (le[1] = Be(() => {
                }, ["stop"])),
                onKeydown: Be(K, ["stop"])
              }, null, 42, Bb), [
                [Rt, y.value]
              ])
            ])
          ])) : O("", !0),
          e.listSectionLabel ? (f(), x("p", Lb, A(e.listSectionLabel), 1)) : O("", !0),
          d("ul", {
            id: l,
            ref_key: "listRef",
            ref: p,
            role: "listbox",
            tabindex: "-1",
            class: Z(
              e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"
            ),
            onKeydown: Be(Y, ["stop"])
          }, [
            $.value.length === 0 ? (f(), x("li", Rb, A(e.noResultsText), 1)) : O("", !0),
            (f(!0), x(he, null, pe($.value, (ce, ve) => (f(), x("li", {
              key: W(ce),
              role: "option",
              "aria-selected": M(ce),
              class: Z(R(ce, ve)),
              onClick: Be((U) => re(ce), ["stop"]),
              onMouseenter: (U) => v.value = ve
            }, [
              ce.leadingClass ? (f(), x("span", {
                key: 0,
                class: Z([ce.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : O("", !0),
              e.showOptionCheck ? (f(), x("span", Ib, [
                M(ce) ? (f(), ne(B(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : O("", !0)
              ])) : O("", !0),
              ce.leadingIcon ? (f(), x("span", {
                key: 2,
                class: Z([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  ce.leadingIconWrapperClass
                ])
              }, [
                (f(), ne(ft(ce.leadingIcon), {
                  class: Z(["h-4 w-4", ce.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : O("", !0),
              d("span", Eb, A(ce.label), 1),
              ce.badge ? (f(), x("span", {
                key: 3,
                class: Z(B(ui)(ce.badge.variant))
              }, A(ce.badge.label), 3)) : O("", !0)
            ], 42, Pb))), 128))
          ], 34)
        ], 4), [
          [Ht, b.value]
        ])
      ]))
    ], 512));
  }
}), kt = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), Fb = {
  key: 0,
  class: "w-52"
}, Ob = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, zb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Nb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, jb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Hb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Wb = { class: "max-w-[360px] px-4 text-center" }, Kb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ub = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, Yb = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, qb = /* @__PURE__ */ fe({
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
    }, o = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], s = e, i = a, l = (w) => {
      i("export", w);
    }, r = (w) => {
      i("changeBreakdown", String(w));
    }, c = (w) => {
      const _ = w.toLowerCase(), k = n[_] || n[w];
      if (k) return k;
      const $ = Array.from(_).reduce(
        (S, D) => (S << 5) - S + D.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs($) % o.length];
    }, u = $e(s, "theme"), { isDark: g } = Me(u), m = (w) => {
      const _ = kt(w).replace(/_/g, " ");
      return _.charAt(0).toUpperCase() + _.slice(1);
    }, p = C(() => {
      const w = {};
      for (const _ of Object.values(s.data?.agents_by_day || {}))
        for (const [k, $] of Object.entries(_))
          w[k] = (w[k] || 0) + $;
      return w;
    }), h = C(() => {
      const w = s.data?.agents_by_day || {}, _ = Object.keys(w).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const $ = Object.keys(p.value).sort(
        (S, D) => p.value[D] - p.value[S] || S.localeCompare(D)
      ).slice(0, s.maxSeries).map((S) => ({
        label: m(S),
        data: _.map((D) => w[D]?.[S] || 0),
        borderColor: c(S)
      }));
      return {
        labels: _.map((S) => ze(S).format("MMM DD")),
        datasets: $
      };
    }), b = C(() => {
      const w = Object.values(p.value).reduce((k, $) => k + $, 0), _ = s.totalConversations ?? w;
      return _ === 0 ? [] : Object.entries(p.value).sort(([, k], [, $]) => $ - k).map(([k, $]) => ({
        name: k,
        label: m(k),
        total: $,
        percentage: ($ / _ * 100).toFixed(1),
        color: c(k)
      }));
    }), v = C(() => b.value.slice(0, 4)), y = C(() => {
      const w = v.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    });
    return t({ isDark: g }), (w, _) => (f(), ne(Se, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: F(() => [
        s.breakdownOptions.length ? (f(), x("div", Fb, [
          N(Kt, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": r
          }, null, 8, ["model-value", "options"])
        ])) : O("", !0)
      ]),
      headerExport: F(() => [
        e.enableExport && !s.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", Ob, [
          d("div", Vb, [
            h.value.labels && h.value.labels.length ? (f(), x("section", zb, [
              d("div", Nb, [
                N(mt, {
                  data: h.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && v.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(y.value)
              }, [
                (f(!0), x(he, null, pe(v.value, (k) => (f(), ne(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${B(me)(k.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : s.showSummaryCards && b.value.length ? (f(), x("section", jb, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(y.value)
              }, [
                (f(!0), x(he, null, pe(v.value, (k) => (f(), ne(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${B(me)(k.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : O("", !0),
            b.value.length ? O("", !0) : (f(), x("section", Hb, [
              d("div", Wb, [
                d("div", Kb, [
                  N(B(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", Ub, A(s.emptyTitle), 1),
                d("p", Yb, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), $l = /* @__PURE__ */ be(qb, [["__scopeId", "data-v-c97ff9a5"]]), Xb = { class: "card-body" }, Gb = {
  key: 0,
  class: "chart-section"
}, Zb = { class: "chart-wrapper" }, Qb = {
  key: 1,
  class: "record-locator-daily-section"
}, Jb = { class: "w-full min-w-0" }, ev = { class: "cell-plain font-medium" }, tv = { class: "cell-plain text-center" }, av = { class: "cell-plain text-center" }, nv = { class: "cell-plain text-center" }, ov = { class: "cell-plain text-center" }, sv = { class: "cell-plain text-center success-value" }, iv = { class: "cell-plain text-center failed-value" }, lv = { class: "cell-plain text-center warning-value" }, rv = { class: "cell-plain text-center" }, cv = { class: "cell-plain text-center failed-value" }, dv = {
  key: 2,
  class: "empty-state"
}, uv = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me($e(n, "theme")), l = C(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (v, y) => new Date(v.date).getTime() - new Date(y.date).getTime()
    ) : []), r = [
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
    ], u = C(
      () => n.isAvianca ? [...r, ...c] : r
    ), g = C(
      () => l.value.map((v) => ({
        id: v.date,
        date: v.date,
        checkin_initiated: v.checkin_initiated,
        record_locator_init_count: v.record_locator_init_count,
        record_locator_started_count: v.record_locator_started_count,
        record_locator_completed_count: v.record_locator_completed_count,
        record_locator_closed_count: v.record_locator_closed_count,
        record_locator_failed_count: v.record_locator_failed_count,
        record_locator_abandoned_count: v.record_locator_abandoned_count,
        record_locator_create_payment_count: v.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: v.record_locator_create_payment_failed_count
      }))
    ), m = C(() => n.data), p = (v, y) => It(v, y), h = (v, y) => {
      const w = me(v), _ = p(v, y);
      return `${w} (${_})`;
    }, b = C(() => {
      const v = [], y = [], w = /* @__PURE__ */ new Set(), _ = (Y) => {
        w.has(Y) || (v.push({ name: Y }), w.add(Y));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: v, links: y };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const k = m.value.total_checkin_initiated, $ = m.value.total_record_locator_init, S = m.value.total_record_locator_started, D = m.value.total_record_locator_completed, P = m.value.total_record_locator_closed, V = m.value.total_record_locator_failed, W = m.value.total_record_locator_abandoned, M = m.value.total_record_locator_init_abandoned, R = m.value.total_checkin_pre_init_abandoned_error, T = m.value.total_checkin_pre_init_abandoned_voluntary, j = R != null || T != null, H = j ? Math.max(Number(R) || 0, 0) : 0, Q = j ? Math.max(Number(T) || 0, 0) : 0, re = m.value.total_record_locator_init_abandoned_error, de = m.value.total_record_locator_init_abandoned_voluntary, q = re != null || de != null, ae = q ? Math.max(Number(re) || 0, 0) : 0, L = q ? Math.max(Number(de) || 0, 0) : 0;
      $ > 0 && y.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ye($, k)
      });
      const K = k - $;
      return j ? (Q > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, k)
      })), H > 0 && (_("Booking not retreived"), y.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, k)
      }))) : K > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, k)
      })), S > 0 && y.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ye(S, k)
      }), q ? (ae > 0 && (_("Error"), y.push({
        source: "Booking retrive",
        target: "Error",
        value: ae,
        label: ye(ae, k)
      })), L > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, k)
      }))) : M > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: M,
        label: ye(M, k)
      })), D > 0 && y.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: D,
        label: ye(D, k)
      }), P > 0 && y.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: P,
        label: ye(P, k)
      }), V > 0 && (_("Checkin Failed"), y.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: ye(V, k)
      })), W > 0 && (_("Abandoned (Flow)"), y.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: W,
        label: ye(W, k)
      })), { nodes: v, links: y };
    });
    return t({ isDark: i }), (v, y) => (f(), ne(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", Xb, [
          b.value.nodes.length > 0 ? (f(), x("section", Gb, [
            d("div", Zb, [
              N(na, {
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (f(), x("section", Qb, [
            d("div", Jb, [
              N(pt, {
                columns: u.value,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: w }) => [
                  d("span", ev, A(B(ze)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": F(({ row: w }) => [
                  d("span", tv, A(B(me)(w.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": F(({ row: w }) => [
                  d("span", av, A(h(
                    w.record_locator_init_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": F(({ row: w }) => [
                  d("span", nv, A(B(me)(w.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": F(({ row: w }) => [
                  d("span", ov, A(h(
                    w.record_locator_completed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": F(({ row: w }) => [
                  d("span", sv, A(h(
                    w.record_locator_closed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": F(({ row: w }) => [
                  d("span", iv, A(h(
                    w.record_locator_failed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": F(({ row: w }) => [
                  d("span", lv, A(h(
                    w.record_locator_abandoned_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": F(({ row: w }) => [
                  d("span", rv, A(B(me)(
                    w.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": F(({ row: w }) => [
                  d("span", cv, A(B(me)(
                    w.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (f(), x("section", dv, [...y[0] || (y[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No record locator data available"),
              d("p", { class: "empty-description" }, " No record locator data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), hv = /* @__PURE__ */ be(uv, [["__scopeId", "data-v-f904c66a"]]), fv = { class: "card-body" }, gv = {
  key: 0,
  class: "chart-section"
}, mv = {
  key: 1,
  class: "empty-state"
}, pv = {
  key: 2,
  class: "comparison-section"
}, bv = { class: "comparison-grid" }, vv = /* @__PURE__ */ fe({
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
    ], s = e, i = a, l = (h) => {
      i("export", h);
    }, { isDark: r } = Me($e(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const h = /* @__PURE__ */ new Set();
      for (const b of s.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(b.channels))
          h.add(v);
      return Array.from(h).sort();
    }), u = (h, b) => n[h.toLowerCase()] ?? o[b % o.length];
    function g(h) {
      return h.replace(/_/g, " ").toUpperCase();
    }
    function m(h) {
      if (h.delta === null) return "No previous data";
      const b = me(h.previous), v = `${Math.abs(h.delta).toFixed(1)}%`;
      return h.delta === 0 ? `0.0% vs prev. period (${b})` : `${h.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${b})`;
    }
    const p = C(() => {
      const h = s.data?.sales_by_channel_by_day ?? [];
      if (h.length === 0) return { labels: [], datasets: [] };
      const b = h.map((y) => ze(y.date).format("MMM-DD")), v = c.value.map((y, w) => ({
        label: y,
        data: h.map((_) => _.channels[y] ?? 0),
        backgroundColor: u(y, w),
        borderRadius: 4
      }));
      return { labels: b, datasets: v };
    });
    return t({ isDark: r }), (h, b) => (f(), ne(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !s.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", fv, [
          p.value.labels.length > 0 ? (f(), x("section", gv, [
            N($t, {
              data: p.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (f(), x("section", mv, [...b[0] || (b[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No sales data available"),
              d("p", { class: "empty-description" }, " No sales by channel data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          e.channelComparison.length > 0 ? (f(), x("section", pv, [
            d("div", bv, [
              (f(!0), x(he, null, pe(e.channelComparison, (v, y) => (f(), ne(B(xe), {
                key: v.channel,
                color: u(v.channel, y),
                title: g(v.channel),
                value: B(me)(v.current),
                subvalue: m(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : O("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Sl = /* @__PURE__ */ be(vv, [["__scopeId", "data-v-4879d791"]]), yv = { class: "card-body" }, xv = {
  key: 0,
  class: "chart-section"
}, kv = { class: "chart-wrapper" }, _v = {
  key: 1,
  class: "empty-state"
}, wv = { class: "seller-value-cards" }, Cv = {
  key: 2,
  class: "seller-daily-section"
}, $v = { class: "w-full min-w-0" }, Sv = { class: "sl-cell font-medium" }, Mv = { class: "sl-cell text-center" }, Dv = { class: "sl-cell text-center" }, Av = { class: "sl-cell text-center" }, Tv = { class: "sl-cell text-center" }, Bv = { class: "sl-cell text-center success-value" }, Lv = {
  key: 0,
  class: "currency-cell-list"
}, Rv = {
  key: 1,
  class: "empty-cell"
}, Pv = { class: "sl-cell text-center success-value" }, Iv = { class: "sl-cell text-center success-value" }, Ev = {
  key: 0,
  class: "currency-cell-list"
}, Fv = {
  key: 1,
  class: "empty-cell"
}, Ov = { class: "sl-cell text-center success-value" }, Vv = { class: "sl-cell text-center" }, zv = { class: "sl-cell text-center success-value" }, Nv = {
  key: 0,
  class: "currency-cell-list"
}, jv = { key: 1 }, Hv = {
  key: 0,
  class: "failed-reasons"
}, Wv = { class: "reason-name" }, Kv = { class: "reason-count" }, Uv = {
  key: 1,
  class: "empty-cell"
}, Yv = /* @__PURE__ */ fe({
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
    function n(M) {
      return M;
    }
    const o = e, s = a, i = (M) => {
      s("export", M);
    }, { isDark: l } = Me($e(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const M = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((R) => {
        const T = M.findIndex(
          (j) => j.date === R.date
        );
        T !== -1 ? M[T] = { ...M[T], reasons: R.reasons } : M.push({
          date: R.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: R.reasons
        });
      }), M.sort(
        (R, T) => new Date(R.date).getTime() - new Date(T.date).getTime()
      );
    }), c = C(() => {
      const M = [
        { key: "date", label: "Date", align: "center" },
        { key: "sellInitiated", label: "Sell Initiated", align: "center" },
        { key: "sellStarted", label: "Sell Started", align: "center" },
        { key: "getQuote", label: "Get Quote", align: "center" },
        { key: "bookingCreated", label: "Booking Created", align: "center" }
      ];
      return o.showPaymentMethodDetails && M.push(
        { key: "btValue", label: "BT Success Value", align: "center" },
        { key: "btSuccess", label: "BT Success", align: "center" },
        { key: "coValue", label: "CO Success Value", align: "center" },
        { key: "cashSuccess", label: "Cash Success", align: "center" }
      ), M.push(
        { key: "sellSuccess", label: "Sell Success", align: "center" },
        { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
        { key: "failed", label: "Failed", align: "left" }
      ), M;
    }), u = C(
      () => r.value.map((M) => ({
        id: M.date,
        ...M
      }))
    ), g = C(() => o.sellerData), m = C(() => o.failedData), p = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), h = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), v = C(() => {
      const M = p.value;
      return M.length > 0 ? M.map(
        (R) => `${R.currency} ${Yt(R.total_value)}`
      ).join(" · ") : W(o.sellerData.total_value_sell_success);
    });
    function y(M) {
      return M.length > 0 ? M.map(
        (R) => `${R.currency} ${Yt(R.total_value)}`
      ).join(" · ") : "—";
    }
    const w = C(
      () => y(h.value)
    ), _ = C(
      () => y(b.value)
    ), k = (M) => M.replace(/_/g, " ").replace(/\b\w/g, (R) => R.toUpperCase()), $ = (M) => `Failed:
${k(M)}`, S = C(() => {
      const {
        total_seller_conversations: M = 0,
        total_sell_started: R = 0,
        total_sell_booking_created: T = 0,
        total_sell_success: j = 0,
        total_sell_success_bank_transfer: H = 0,
        total_sell_success_cash: Q = 0
      } = g.value, { failed_by_reason_by_day: re = [] } = m.value;
      if (M === 0) return { nodes: [], links: [] };
      const de = j, q = [
        { name: "Sell Initiated", value: M, status: "success" },
        { name: "Sell Started", value: R, status: "success" },
        { name: "Booking Created", value: T, status: "success" },
        { name: "Sell Success", value: de, status: "success" }
      ], ae = [], L = M - R;
      L > 0 && (q.push({
        name: "Abandoned (Init)",
        value: L,
        status: "abandon"
      }), ae.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: L,
        label: ye(L, M)
      })), R > 0 && ae.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: R,
        label: ye(R, M)
      });
      const K = re.reduce(
        (le, ce) => (ce.reasons && Array.isArray(ce.reasons) && ce.reasons.forEach((ve) => {
          const U = ve.reason, ie = ve.failed_count;
          le[U] = (le[U] || 0) + ie;
        }), le),
        {}
      );
      T > 0 && ae.push({
        source: "Sell Started",
        target: "Booking Created",
        value: T,
        label: ye(T, M)
      }), (H ?? 0) > 0 && (q.push({
        name: "Bank Transfer",
        value: H ?? 0,
        status: "success"
      }), ae.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: H ?? 0,
        label: ye(H ?? 0, M)
      })), (Q ?? 0) > 0 && (q.push({
        name: "Cash Option",
        value: Q ?? 0,
        status: "success"
      }), ae.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Q ?? 0,
        label: ye(Q ?? 0, M)
      })), de > 0 && ae.push({
        source: "Booking Created",
        target: "Sell Success",
        value: de,
        label: ye(de, M)
      });
      const Y = T - de - (H ?? 0) - (Q ?? 0);
      Y > 0 && (q.push({
        name: "Failed at Completion",
        value: Y,
        status: "error"
      }), ae.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: Y,
        label: ye(Y, M)
      }));
      const z = R - T;
      if (z > 0 && (q.push({
        name: "Failed at Booking",
        value: z,
        status: "error"
      }), ae.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: z,
        label: ye(z, M)
      })), Object.keys(K).length > 0) {
        const le = Object.values(K).reduce(
          (ve, U) => ve + U,
          0
        ), ce = z - le;
        Object.entries(K).filter(([, ve]) => ve > 0).sort(([, ve], [, U]) => U - ve).forEach(([ve, U]) => {
          const ie = `Failed: ${ve}`;
          q.push({
            name: ie,
            value: U,
            status: "error",
            label: $(ve)
          }), ae.push({
            source: "Failed at Booking",
            target: ie,
            value: U,
            label: ye(U, M)
          });
        }), ce > 0 && (q.push({
          name: "Failed: Without Reason",
          value: ce,
          status: "error",
          label: `Failed:
Without Reason`
        }), ae.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: ce,
          label: ye(ce, M)
        }));
      }
      return {
        nodes: q,
        links: ae
      };
    }), D = (M, R) => It(M, R), P = (M, R) => {
      const T = me(M), j = D(M, R);
      return `${T} (${j})`;
    }, V = (M) => M == null ? 0 : typeof M == "number" ? M : Array.isArray(M) ? M.reduce((R, T) => R + (T.total_value || 0), 0) : 0, W = (M) => Yt(V(M));
    return t({ isDark: l }), (M, R) => (f(), ne(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", yv, [
          S.value.nodes.length > 0 ? (f(), x("section", xv, [
            d("div", kv, [
              N(na, {
                data: S.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (f(), x("section", _v, [...R[0] || (R[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No sales data available"),
              d("p", { class: "empty-description" }, " No sales data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          d("section", wv, [
            N(xe, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (f(), x(he, { key: 0 }, [
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: w.value
              }, null, 8, ["value"]),
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: _.value
              }, null, 8, ["value"])
            ], 64)) : O("", !0)
          ]),
          r.value && r.value.length > 0 ? (f(), x("section", Cv, [
            d("div", $v, [
              N(pt, {
                columns: c.value,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: T }) => [
                  d("span", Sv, A(B(ze)(String(T.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": F(({ row: T }) => [
                  d("span", Mv, A(B(me)(Number(T.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": F(({ row: T }) => [
                  d("span", Dv, A(P(
                    T.sell_started_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": F(({ row: T }) => [
                  d("span", Av, A(P(
                    T.sell_get_quote_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": F(({ row: T }) => [
                  d("span", Tv, A(P(
                    T.sell_booking_created_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": F(({ row: T }) => [
                  d("span", Bv, [
                    Array.isArray(
                      T.daily_value_sell_success_bank_transfer
                    ) && T.daily_value_sell_success_bank_transfer.length > 0 ? (f(), x("div", Lv, [
                      (f(!0), x(he, null, pe(T.daily_value_sell_success_bank_transfer, (j) => (f(), x("span", {
                        key: `${T.date}-bt-success-${j.currency}`
                      }, A(j.currency) + " " + A(B(Yt)(j.total_value)), 1))), 128))
                    ])) : (f(), x("span", Rv, "-"))
                  ])
                ]),
                "cell-btSuccess": F(({ row: T }) => [
                  d("span", Pv, A(B(me)(
                    Number(
                      T.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": F(({ row: T }) => [
                  d("span", Iv, [
                    Array.isArray(
                      T.daily_value_sell_success_cash
                    ) && T.daily_value_sell_success_cash.length > 0 ? (f(), x("div", Ev, [
                      (f(!0), x(he, null, pe(T.daily_value_sell_success_cash, (j) => (f(), x("span", {
                        key: `${T.date}-co-success-${j.currency}`
                      }, A(j.currency) + " " + A(B(Yt)(j.total_value)), 1))), 128))
                    ])) : (f(), x("span", Fv, "-"))
                  ])
                ]),
                "cell-cashSuccess": F(({ row: T }) => [
                  d("span", Ov, A(B(me)(
                    Number(T.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": F(({ row: T }) => [
                  d("span", Vv, A(P(
                    T.sell_success_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": F(({ row: T }) => [
                  d("span", zv, [
                    Array.isArray(T.daily_value_sell_success) && T.daily_value_sell_success.length > 0 ? (f(), x("div", Nv, [
                      (f(!0), x(he, null, pe(T.daily_value_sell_success, (j) => (f(), x("span", {
                        key: `${T.date}-${j.currency}`
                      }, A(j.currency) + " " + A(B(Yt)(j.total_value)), 1))), 128))
                    ])) : (f(), x("span", jv, A(W(
                      T.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": F(({ row: T }) => [
                  (T.reasons || []).length > 0 ? (f(), x("div", Hv, [
                    (f(!0), x(he, null, pe(T.reasons || [], (j) => (f(), x("div", {
                      key: j.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Wv, A(j.reason) + ":", 1),
                      d("span", Kv, A(j.failed_count), 1)
                    ]))), 128))
                  ])) : (f(), x("div", Uv, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : O("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Ml = /* @__PURE__ */ be(Yv, [["__scopeId", "data-v-19fee7a8"]]), qv = { class: "seller-container__body" }, Xv = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = C(
      () => a.loading ? !1 : a.sellerLoading
    ), s = C(
      () => a.loading ? !1 : a.salesByChannelLoading
    ), i = C(() => a.exportLoading || a.sellerExportLoading), l = C(() => a.exportLoading || a.salesByChannelExportLoading);
    function r(c, u) {
      n("export", { source: c, format: u });
    }
    return (c, u) => (f(), ne(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[2] || (u[2] = (g) => n("open"))
    }, {
      default: F(() => [
        d("div", qv, [
          N(Ml, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            "show-payment-method-details": e.showPaymentMethodDetails,
            onExport: u[0] || (u[0] = (g) => r("seller", g))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading", "show-payment-method-details"]),
          N(Sl, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: u[1] || (u[1] = (g) => r("salesByChannel", g))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Gv = /* @__PURE__ */ be(Xv, [["__scopeId", "data-v-34a76e0c"]]), Zv = { class: "card-body" }, Qv = {
  key: 0,
  class: "chart-section"
}, Jv = {
  key: 1,
  class: "empty-state"
}, ey = { class: "empty-state-content" }, ty = { class: "empty-icon-wrapper" }, ay = /* @__PURE__ */ fe({
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
    }, o = e, s = a, i = (g) => {
      s("export", g);
    }, { isDark: l, colors: r } = Me($e(o, "theme")), c = C(() => {
      const m = (o.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const p = m.reduce(
        (v, y) => v + (Number(y.conversations) || 0),
        0
      ), h = m.map((v) => {
        const y = v.agent_type?.toLowerCase();
        return n[y] || "#94a3b8";
      }), b = h.map((v) => `${v}80`);
      return {
        labels: m.map((v) => {
          const y = Number(v.conversations) || 0, w = p ? y / p * 100 : 0;
          return `${kt(v.agent_type)} - ${y.toLocaleString()} (${w.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((v) => v.conversations),
            backgroundColor: b,
            borderColor: h,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => o.options ? o.options : {
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
            color: r.value.textSecondary
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.tooltipText,
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
            label: (g) => {
              const m = (g.label || "").toString().split(" - ")[0], p = Number(g.parsed) || 0, h = (g.dataset.data || []).reduce(
                (v, y) => v + (Number(y) || 0),
                0
              ), b = h ? p / h * 100 : 0;
              return `${m}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (g, m) => (f(), ne(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", Zv, [
          c.value.labels && c.value.labels.length ? (f(), x("section", Qv, [
            N(Fn, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (f(), x("section", Jv, [
            d("div", ey, [
              d("div", ty, [
                N(B(tp), { class: "empty-icon" })
              ]),
              m[0] || (m[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
              m[1] || (m[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ny = /* @__PURE__ */ be(ay, [["__scopeId", "data-v-34a998ae"]]), oy = { class: "card-body" }, sy = {
  key: 0,
  class: "payment-methods-section"
}, iy = { class: "payment-methods-grid" }, ly = {
  key: 1,
  class: "empty-state"
}, ry = { class: "empty-state-content" }, cy = { class: "empty-icon-wrapper" }, dy = {
  key: 2,
  class: "payment-method-daily-section"
}, uy = { class: "w-full min-w-0" }, hy = { class: "font-medium" }, fy = { class: "text-center" }, gy = { class: "text-center success-value" }, my = {
  key: 0,
  class: "currency-cell-list"
}, py = { class: "payment-tags" }, by = { class: "tag-name" }, vy = {
  key: 0,
  class: "tag-amount"
}, yy = {
  key: 1,
  class: "tag-amount"
}, xy = { class: "tag-count" }, ky = {
  key: 3,
  class: "empty-table-state"
}, _y = "Not Registered", wy = /* @__PURE__ */ fe({
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
    const n = e, o = a, { isDark: s } = Me($e(n, "theme")), i = oe(!1), l = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((D, P) => ze(D.date).valueOf() - ze(P.date).valueOf())), g = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = C(
      () => u.value.map((D) => ({
        id: D.date,
        date: D.date,
        total_count: D.total_count,
        total_amount: D.total_amount,
        total_amount_by_currency: D.total_amount_by_currency,
        payment_methods: D.payment_methods
      }))
    ), p = (D) => {
      if (!D)
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
      const P = (D.payment_method_breakdown || []).map(
        (W) => ({
          payment_method: W.payment_method || "Unknown",
          total_amount: W.total_amount ?? 0,
          count: W.count ?? 0,
          total_amount_by_currency: W.total_amount_by_currency ?? []
        })
      ), V = (D.payment_method_by_day || []).map((W) => ({
        date: W.date || "",
        total_count: W.total_count ?? 0,
        total_amount: W.total_amount ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? [],
        payment_methods: (W.payment_methods || []).map((M) => ({
          payment_method: M.payment_method || "Unknown",
          total_amount: M.total_amount ?? 0,
          count: M.count ?? 0,
          total_amount_by_currency: M.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: D.airline_name || n.airlineName,
        start_date: D.start_date || "",
        end_date: D.end_date || "",
        total_conversations: D.total_conversations ?? 0,
        total_amount: D.total_amount ?? 0,
        total_sell_usd: D.total_sell_usd,
        total_amount_by_currency: D.total_amount_by_currency ?? [],
        payment_method_breakdown: P,
        payment_method_by_day: V
      };
    }, h = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [D, P] = n.dates.map(
            (W) => ze(W).format("YYYY-MM-DD")
          ), V = await n.fetchFunction(
            n.airlineName,
            D,
            P
          );
          l.value = p(V);
        } catch (D) {
          console.error("Error fetching payment method metrics:", D), l.value = p(null);
        } finally {
          i.value = !1;
        }
      }
    }, b = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], v = (D) => !D || D.toLowerCase() === "unknown" ? _y : D.replace(/_/g, " "), y = (D) => D == null ? "$0.00" : Ie(D), w = (D) => {
      const P = D.total_amount_by_currency;
      return P && P.length > 0 ? P.map((V) => `${V.currency} ${y(V.total_value)}`).join(" · ") : y(D.total_amount);
    }, _ = (D) => D ? ze(D).format("MMM DD") : "-", k = (D) => D == null || Number.isNaN(Number(D)) ? 0 : Number(D), $ = (D) => {
      o("export", D);
    };
    function S() {
      const D = n.data;
      D && (Array.isArray(D.payment_method_breakdown) && D.payment_method_breakdown.length > 0 || Array.isArray(D.payment_method_by_day) && D.payment_method_by_day.length > 0) && (i.value = !1, l.value = p(D));
    }
    return Je(() => {
      n.data ? S() : h();
    }), Te(
      () => n.data,
      (D) => {
        D && S();
      },
      { deep: !0 }
    ), Te(
      () => n.dates,
      (D) => {
        n.data || D && D[0] && D[1] && h();
      },
      { deep: !0 }
    ), t({ isDark: s }), (D, P) => (f(), ne(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: P[0] || (P[0] = (V) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !i.value ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", oy, [
          r.value ? (f(), x("section", sy, [
            P[1] || (P[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", iy, [
              (f(!0), x(he, null, pe(l.value.payment_method_breakdown, (V, W) => (f(), ne(xe, {
                key: V.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[W % b.length],
                title: v(V.payment_method),
                value: w(V),
                subvalue: `${k(V.count)} ${k(V.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (f(), x("section", ly, [
            d("div", ry, [
              d("div", cy, [
                N(B(ap), { class: "empty-icon" })
              ]),
              P[2] || (P[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              P[3] || (P[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (f(), x("section", dy, [
            P[5] || (P[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", uy, [
              N(pt, {
                columns: g,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: V }) => [
                  d("span", hy, A(_(String(V.date))), 1)
                ]),
                "cell-totalSales": F(({ row: V }) => [
                  d("span", fy, A(B(me)(V.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": F(({ row: V }) => [
                  d("span", gy, [
                    Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (f(), x("div", my, [
                      (f(!0), x(he, null, pe(V.total_amount_by_currency, (W) => (f(), x("span", {
                        key: `${V.date}-${W.currency}`
                      }, A(W.currency) + " " + A(y(W.total_value)), 1))), 128))
                    ])) : (f(), x(he, { key: 1 }, [
                      Ae(A(y(Number(V.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": F(({ row: V }) => [
                  d("div", py, [
                    (f(!0), x(he, null, pe(Array.isArray(V.payment_methods) ? V.payment_methods : [], (W) => (f(), x("div", {
                      key: W.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", by, A(v(W.payment_method)), 1),
                      P[4] || (P[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (f(), x("span", vy, A(y(W.total_amount)), 1)) : (f(), x("span", yy, A(W.total_amount_by_currency.map(
                        (M) => `${M.currency} ${y(M.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", xy, "(" + A(k(W.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (f(), x("div", ky, [...P[6] || (P[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : O("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Cy = /* @__PURE__ */ be(wy, [["__scopeId", "data-v-168637eb"]]), $y = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Sy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, My = {
  key: "title-content",
  class: "header-title-group"
}, Dy = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Ay = {
  key: 0,
  class: "metric-label metric-label--header"
}, Ty = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, By = { key: "aside-content" }, Ly = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Ry = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Py = {
  key: "body-content",
  class: "highlight-inner"
}, Iy = { class: "card-body" }, Ey = { class: "metric-row" }, Fy = {
  key: 0,
  class: "metric-prefix"
}, Oy = {
  key: 0,
  class: "metric-label"
}, Vy = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n } = Me($e(a, "theme")), o = C(() => a.labelPosition === "header"), s = C(
      () => a.previousValue !== null && a.previousValue !== void 0
    ), i = C(() => {
      if (!s.value) return 0;
      const c = a.previousValue;
      return c === 0 ? a.currentValue > 0 ? 100 : 0 : (a.currentValue - c) / c * 100;
    }), l = C(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const u = c.toFixed(1);
      return c > 0 ? `+${u}%` : `${u}%`;
    }), r = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, u) => (f(), ne(Se, {
      collapsible: !1,
      class: Z([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": B(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: F(() => [
        N(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (f(), x("div", $y, [
              u[0] || (u[0] = d("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (f(), x("div", Sy)) : O("", !0)
            ])) : (f(), x("div", My, [
              d("div", Dy, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (f(), x("span", Ay, A(e.label), 1)) : O("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: F(() => [
        N(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (f(), x("div", Ty)) : (f(), x("div", By, [
              ke(c.$slots, "headerAside", {}, () => [
                s.value ? (f(), x("div", {
                  key: 0,
                  class: Z(["change-badge", r.value])
                }, A(l.value), 3)) : O("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: F(() => [
        N(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (f(), x("div", Ly, [
              u[1] || (u[1] = d("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? O("", !0) : (f(), x("div", Ry))
            ])) : (f(), x("div", Py, [
              d("div", Iy, [
                ke(c.$slots, "value", {}, () => [
                  d("div", Ey, [
                    e.prefix ? (f(), x("span", Fy, A(e.prefix), 1)) : O("", !0),
                    d("span", {
                      class: Z(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? O("", !0) : (f(), x("span", Oy, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), ot = /* @__PURE__ */ be(Vy, [["__scopeId", "data-v-c81268f4"]]), zy = { class: "card-body" }, Ny = { class: "kpi-closed-value" }, jy = { class: "kpi-closed-value__main" }, Hy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, Wy = { class: "table-view-select flex justify-end" }, Ky = { class: "table-section w-full min-w-0" }, Uy = { class: "cell-plain" }, Yy = { class: "cell-plain" }, qy = { class: "cell-plain cell-plain--muted" }, Xy = { class: "cell-plain" }, Gy = { class: "cell-plain cell-plain--orange" }, Zy = { class: "cell-plain cell-plain--red" }, Qy = { class: "cell-plain cell-plain--muted" }, Jy = { class: "cell-plain cell-plain--muted" }, e1 = { class: "cell-plain cell-plain--muted" }, t1 = { class: "cell-plain" }, a1 = { class: "cell-plain" }, n1 = {
  key: 2,
  class: "empty-state"
}, o1 = 6, s1 = /* @__PURE__ */ fe({
  __name: "AgentHumanConversations",
  props: {
    data: { default: () => ({
      total_assigned: 0,
      total_closed: 0,
      total_enqueued: 0,
      total_transferred: 0,
      total_abandoned: 0,
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
    previousTotalTransferred: { default: null },
    previousTotalAbandoned: { default: null },
    previousAvgTimeToAssignSeconds: { default: null },
    previousAvgConversationDurationSeconds: { default: null }
  },
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (I) => {
      o("export", I);
    }, { isDark: i } = Me($e(n, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(I) {
      const X = I?.trim() ?? "";
      return X.length > 0 && !l.has(X);
    }
    function c(I) {
      if (!r(I.agent_email)) return !1;
      const X = I.assigned_count ?? 0, te = I.closed_count ?? 0, E = I.transferred_count ?? 0, J = I.abandoned_count ?? 0;
      return X > 0 || te > 0 || E > 0 || J > 0;
    }
    function u(I) {
      return I.closed_count ?? 0;
    }
    function g(I) {
      return I.transferred_count ?? 0;
    }
    function m(I) {
      return I.abandoned_count ?? 0;
    }
    function p(I) {
      const X = I?.trim();
      return X || "—";
    }
    function h(I) {
      const X = I?.trim();
      return X || "—";
    }
    function b(I) {
      return I == null ? "0" : ee(I);
    }
    const v = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), y = C(() => v.value.length > 0), w = C(() => {
      const I = (n.data?.total_enqueued ?? 0) > 0, X = (n.data?.total_transferred ?? 0) > 0, te = (n.data?.total_abandoned ?? 0) > 0;
      return y.value || I || X || te;
    }), _ = oe("by_date"), k = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], $ = oe("date"), S = oe("desc");
    Te(_, (I) => {
      I === "aggregated" ? ($.value = "name", S.value = "asc") : ($.value = "date", S.value = "desc");
    });
    function D(I, X) {
      return X == null ? null : X === 0 ? I > 0 ? 100 : 0 : (I - X) / X * 100;
    }
    function P(I) {
      const X = I.toFixed(1);
      return I > 0 ? `+${X}%` : `${X}%`;
    }
    function V(I, X = !1) {
      const te = X ? -I : I;
      return te > 0 ? "change-badge--up" : te < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function W(I, X) {
      if (I === null) return null;
      const te = D(I, X);
      return te === null ? null : {
        label: P(te),
        class: V(te, !0)
      };
    }
    function M(I) {
      if (I == null || I === "") return null;
      if (typeof I == "number")
        return Number.isFinite(I) ? I : null;
      const X = I.trim();
      if (!X) return null;
      if (X.includes(":")) {
        const E = X.split(":").map(Number);
        return E.length !== 3 || E.some(isNaN) ? null : E[0] * 3600 + E[1] * 60 + E[2];
      }
      const te = Number(X);
      return Number.isFinite(te) ? te : null;
    }
    function R(I) {
      const X = Math.round(I), te = Math.floor(X / 3600), E = Math.floor(X % 3600 / 60), J = X % 60;
      return `${String(te).padStart(2, "0")}:${String(E).padStart(2, "0")}:${String(J).padStart(2, "0")}`;
    }
    function T(I) {
      const X = M(I);
      return X === null ? "—" : typeof I == "string" && I.includes(":") ? I.trim() : R(X);
    }
    const j = C(() => n.data?.total_enqueued ?? 0), H = C(() => n.data?.total_closed ?? 0), Q = C(() => n.data?.total_transferred ?? 0), re = C(() => n.data?.total_abandoned ?? 0), de = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), q = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), ae = C(() => j.value <= 0 ? null : `(${(H.value / j.value * 100).toFixed(1)}%)`), L = C(
      () => W(
        M(de.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), K = C(
      () => W(
        M(q.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function Y(I, X) {
      return {
        id: `${I.date}-${I.agent_email}-${X}`,
        date: I.date,
        dateSort: new Date(I.date).getTime(),
        agent_name: I.agent_name ?? "",
        agent_email: I.agent_email,
        handled: u(I),
        transferred: g(I),
        abandoned: m(I),
        connected_at: I.connected_at ?? null,
        disconnected_at: I.disconnected_at ?? null,
        online_time_display: I.online_time_seconds == null || I.online_time_seconds === "" ? null : T(I.online_time_seconds),
        avg_assignation_seconds: M(I.avg_time_to_assign_seconds),
        avg_resolution_seconds: M(I.avg_conversation_duration_seconds),
        avg_assignation_display: T(I.avg_time_to_assign_seconds),
        avg_resolution_display: T(I.avg_conversation_duration_seconds)
      };
    }
    function z(I) {
      const X = /* @__PURE__ */ new Map();
      for (const te of I) {
        if (!c(te)) continue;
        const E = te.agent_email.trim();
        X.has(E) || X.set(E, {
          agent_name: te.agent_name?.trim() ?? "",
          agent_email: E,
          handled: 0,
          transferred: 0,
          abandoned: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const J = X.get(E), se = te.assigned_count ?? 0, ge = te.closed_count ?? 0;
        J.handled += u(te), J.transferred += g(te), J.abandoned += m(te), te.agent_name?.trim() && (J.agent_name = te.agent_name.trim());
        const we = M(te.avg_time_to_assign_seconds);
        we !== null && se > 0 && (J.assignSum += we * se, J.assignWeight += se);
        const _e = M(te.avg_conversation_duration_seconds);
        _e !== null && ge > 0 && (J.resolutionSum += _e * ge, J.resolutionWeight += ge);
      }
      return Array.from(X.values()).map((te, E) => {
        const J = te.assignWeight > 0 ? te.assignSum / te.assignWeight : null, se = te.resolutionWeight > 0 ? te.resolutionSum / te.resolutionWeight : null;
        return {
          id: `agg-${te.agent_email}-${E}`,
          agent_name: te.agent_name,
          agent_email: te.agent_email,
          handled: te.handled,
          transferred: te.transferred,
          abandoned: te.abandoned,
          connected_at: null,
          disconnected_at: null,
          online_time_display: null,
          avg_assignation_seconds: J,
          avg_resolution_seconds: se,
          avg_assignation_display: J !== null ? R(J) : "—",
          avg_resolution_display: se !== null ? R(se) : "—"
        };
      });
    }
    const le = C(() => {
      const I = v.value;
      return _.value === "aggregated" ? z(I) : I.map(Y);
    });
    function ce(I, X, te, E) {
      const J = E === "asc" ? 1 : -1;
      let se = 0;
      switch (te) {
        case "date":
          se = (I.dateSort ?? 0) - (X.dateSort ?? 0);
          break;
        case "name":
          se = (I.agent_name || "").localeCompare(X.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          se = I.agent_email.localeCompare(X.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          se = I.handled - X.handled;
          break;
        case "transferred":
          se = I.transferred - X.transferred;
          break;
        case "abandoned":
          se = (I.abandoned ?? 0) - (X.abandoned ?? 0);
          break;
        case "avgAssignation":
          se = (I.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (X.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          se = (I.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (X.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (se !== 0) return se * J;
      if (_.value === "by_date" && te !== "date") {
        const ge = (X.dateSort ?? 0) - (I.dateSort ?? 0);
        if (ge !== 0) return ge;
      }
      return (I.agent_name || "").localeCompare(X.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const ve = C(() => {
      const I = [...le.value];
      return I.sort((X, te) => ce(X, te, $.value, S.value)), I;
    }), U = C(
      () => ve.value
    ), ie = C(() => {
      const I = [];
      return _.value === "by_date" && I.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), I.push(
        { key: "name", label: "Name", align: "left", sortable: !0 },
        { key: "email", label: "Email", align: "left", sortable: !0 },
        { key: "handled", label: "Handled", align: "center", sortable: !0 },
        {
          key: "transferred",
          label: "Transferred",
          align: "center",
          sortable: !0
        },
        {
          key: "abandoned",
          label: "Abandoned",
          align: "center",
          sortable: !0
        },
        {
          key: "connected",
          label: "Connected",
          align: "center",
          sortable: !1
        },
        {
          key: "disconnected",
          label: "Disconnected",
          align: "center",
          sortable: !1
        },
        {
          key: "onlineTime",
          label: "Online time",
          align: "center",
          sortable: !1
        },
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
      ), I;
    });
    function ue(I) {
      const X = I;
      if ($.value === X) {
        S.value = S.value === "asc" ? "desc" : "asc";
        return;
      }
      $.value = X, X === "date" ? S.value = "desc" : X === "name" || X === "email" ? S.value = "asc" : S.value = "desc";
    }
    const ee = (I) => I == null ? "0" : me(I), G = (I) => new Date(I).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (I, X) => (f(), ne(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: X[1] || (X[1] = (te) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", zy, [
          w.value ? (f(), x("div", {
            key: 0,
            class: Z(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4", { "agent-human-conv--dark": B(i) }])
          }, [
            N(ot, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ee(j.value),
              theme: e.theme,
              "current-value": j.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: F(() => [...X[2] || (X[2] = [
                d("svg", {
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
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ot, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ee(H.value),
              theme: e.theme,
              "current-value": H.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: F(() => [...X[3] || (X[3] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1)
              ])]),
              value: F(() => [
                d("div", Ny, [
                  d("span", jy, A(ee(H.value)), 1),
                  ae.value ? (f(), x("span", Hy, A(ae.value), 1)) : O("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ot, {
              label: "Transferred",
              "label-position": "header",
              value: ee(Q.value),
              theme: e.theme,
              "current-value": Q.value,
              "previous-value": e.previousTotalTransferred
            }, {
              icon: F(() => [...X[4] || (X[4] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ot, {
              label: "Abandoned",
              "label-position": "header",
              value: ee(re.value),
              theme: e.theme,
              "current-value": re.value,
              "previous-value": e.previousTotalAbandoned
            }, {
              icon: F(() => [...X[5] || (X[5] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ot, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: T(de.value),
              theme: e.theme,
              "current-value": M(de.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Vo({
              icon: F(() => [
                X[6] || (X[6] = d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              L.value ? {
                name: "headerAside",
                fn: F(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", L.value.class])
                  }, A(L.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(ot, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: T(q.value),
              theme: e.theme,
              "current-value": M(q.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Vo({
              icon: F(() => [
                X[7] || (X[7] = d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              K.value ? {
                name: "headerAside",
                fn: F(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", K.value.class])
                  }, A(K.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : O("", !0),
          y.value ? (f(), ne(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: F(() => [
              d("div", Wy, [
                N(Kt, {
                  modelValue: _.value,
                  "onUpdate:modelValue": X[0] || (X[0] = (te) => _.value = te),
                  options: k,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: F(() => [
              d("div", Ky, [
                (f(), ne(pt, {
                  key: `${_.value}-${$.value}-${S.value}`,
                  columns: ie.value,
                  rows: U.value,
                  "sort-key": $.value,
                  "sort-direction": S.value,
                  "max-visible-rows": o1,
                  "row-key": "id",
                  onSort: ue
                }, {
                  "cell-date": F(({ row: te }) => [
                    d("span", Uy, A(G(String(te.date))), 1)
                  ]),
                  "cell-name": F(({ row: te }) => [
                    d("span", Yy, A(p(te.agent_name)), 1)
                  ]),
                  "cell-email": F(({ row: te }) => [
                    d("span", qy, A(te.agent_email), 1)
                  ]),
                  "cell-handled": F(({ row: te }) => [
                    d("span", Xy, A(ee(Number(te.handled))), 1)
                  ]),
                  "cell-transferred": F(({ row: te }) => [
                    d("span", Gy, A(ee(Number(te.transferred))), 1)
                  ]),
                  "cell-abandoned": F(({ row: te }) => [
                    d("span", Zy, A(b(te.abandoned)), 1)
                  ]),
                  "cell-connected": F(({ row: te }) => [
                    d("span", Qy, A(h(te.connected_at)), 1)
                  ]),
                  "cell-disconnected": F(({ row: te }) => [
                    d("span", Jy, A(h(te.disconnected_at)), 1)
                  ]),
                  "cell-onlineTime": F(({ row: te }) => [
                    d("span", e1, A(h(te.online_time_display)), 1)
                  ]),
                  "cell-avgAssignation": F(({ row: te }) => [
                    d("span", t1, A(te.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": F(({ row: te }) => [
                    d("span", a1, A(te.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : w.value ? O("", !0) : (f(), x("div", n1, [...X[8] || (X[8] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No agent human conversation data available"),
              d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), i1 = /* @__PURE__ */ be(s1, [["__scopeId", "data-v-96b44a98"]]), l1 = {
  key: 0,
  class: "w-52"
}, r1 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, c1 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, d1 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, u1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, h1 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, f1 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, g1 = { class: "max-w-[360px] px-4 text-center" }, m1 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, p1 = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, b1 = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, hi = 5, v1 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (w) => {
      o("export", w);
    }, i = (w) => {
      o("changeBreakdown", String(w));
    }, l = $e(n, "theme"), { isDark: r } = Me(l), c = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], g = (w) => {
      const _ = w.toLowerCase(), k = c[_];
      if (k) return k;
      const $ = Array.from(_).reduce(
        (S, D) => (S << 5) - S + D.charCodeAt(0) | 0,
        0
      );
      return u[Math.abs($) % u.length];
    }, m = oe({
      labels: [],
      datasets: []
    }), p = C(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const w = p.value.total_by_channel || {}, _ = Object.values(w).reduce(
        ($, S) => $ + S,
        0
      ), k = n.totalConversations ?? _;
      return k === 0 ? [] : Object.entries(w).sort(([, $], [, S]) => S - $).map(([$, S]) => ({
        name: $,
        label: $.toUpperCase(),
        total: S,
        percentage: (S / k * 100).toFixed(1),
        color: g($)
      }));
    }), b = C(
      () => h.value.slice(0, hi)
    ), v = C(() => {
      const w = Math.min(b.value.length, hi);
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), y = (w) => {
      if (!w || !w.channels_by_day) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const _ = w.channels_by_day, k = Object.keys(_).sort();
      if (k.length === 0) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const $ = /* @__PURE__ */ new Set();
      for (const P of Object.values(_))
        for (const V of Object.keys(P))
          $.add(V);
      const D = Array.from($).map((P) => ({
        label: P.toUpperCase(),
        data: k.map((V) => _[V]?.[P] || 0),
        borderColor: g(P)
      }));
      m.value = {
        labels: k.map((P) => ze(P).format("MMM DD")),
        datasets: D
      };
    };
    return Te(
      () => n.data,
      (w) => {
        y(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (w, _) => (f(), ne(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: F(() => [
        n.breakdownOptions.length ? (f(), x("div", l1, [
          N(Kt, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : O("", !0)
      ]),
      headerExport: F(() => [
        e.enableExport && !n.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", r1, [
          d("div", c1, [
            m.value.labels && m.value.labels.length ? (f(), x("section", d1, [
              d("div", u1, [
                N(mt, {
                  data: m.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && b.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(v.value)
              }, [
                (f(!0), x(he, null, pe(b.value, (k) => (f(), ne(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${B(me)(k.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : n.showSummaryCards && h.value.length ? (f(), x("section", h1, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(v.value)
              }, [
                (f(!0), x(he, null, pe(b.value, (k) => (f(), ne(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${B(me)(k.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : O("", !0),
            h.value.length ? O("", !0) : (f(), x("section", f1, [
              d("div", g1, [
                d("div", m1, [
                  N(B(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", p1, A(n.emptyTitle), 1),
                d("p", b1, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Dl = /* @__PURE__ */ be(v1, [["__scopeId", "data-v-987b8c34"]]), y1 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = C(() => a.data?.total_conversations ?? 0), s = C(() => a.data?.breakdown_by_day ?? {}), i = C(() => a.titles[a.breakdownBy]), l = C(() => ({ agents_by_day: s.value })), r = C(() => ({
      channels_by_day: s.value,
      total_by_channel: Object.fromEntries(
        (a.data?.breakdown_items ?? []).map((c) => [c.key, c.total_conversations])
      ),
      total_conversations: o.value
    }));
    return (c, u) => a.breakdownBy === "channel" ? (f(), ne(Dl, {
      key: 0,
      data: r.value,
      loading: a.loading,
      title: i.value,
      subtitle: a.subtitle,
      "breakdown-by": a.breakdownBy,
      "breakdown-options": a.breakdownOptions,
      unit: "convs",
      "total-conversations": o.value,
      "empty-title": a.emptyTitle,
      "empty-description": a.emptyDescription,
      onChangeBreakdown: u[0] || (u[0] = (g) => n("changeBreakdown", g))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (f(), ne($l, {
      key: 1,
      data: l.value,
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
      onChangeBreakdown: u[1] || (u[1] = (g) => n("changeBreakdown", g))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "max-series", "show-summary-cards", "empty-title", "empty-description"]));
  }
}), x1 = { class: "card-body" }, k1 = { class: "chart-container" }, _1 = { class: "triage-table-block w-full min-w-0" }, w1 = { class: "triage-row-label" }, C1 = {
  key: 1,
  class: "triage-count"
}, $1 = {
  key: 1,
  class: "triage-count"
}, S1 = {
  key: 1,
  class: "triage-count"
}, M1 = {
  key: 1,
  class: "triage-count"
}, D1 = {
  key: 1,
  class: "triage-count"
}, A1 = {
  key: 1,
  class: "empty-state"
}, T1 = { class: "empty-state-content" }, B1 = { class: "empty-icon-wrapper" }, L1 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (_) => {
      o("export", _);
    }, { isDark: i, colors: l } = Me(
      $e(n, "theme")
    ), r = C(() => {
      const _ = n.data?.combinations || {}, k = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, S] of Object.entries(_)) {
        const D = $.split("+").filter(Boolean);
        if (!D.includes("triage")) continue;
        const P = D.filter((V) => V !== "triage").length;
        P >= 4 ? k["4p"] += Number(S) || 0 : k[P] += Number(S) || 0;
      }
      return k;
    }), c = C(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), u = C(() => Object.keys(n.data?.combinations || {}).length > 0), g = C(() => {
      const _ = c.value;
      if (!_) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const k = r.value;
      return {
        pct0: k[0] / _ * 100,
        pct1: k[1] / _ * 100,
        pct2: k[2] / _ * 100,
        pct3: k[3] / _ * 100,
        pct4p: k["4p"] / _ * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], p = C(() => {
      const _ = g.value, k = r.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: _.pct0,
          b1: _.pct1,
          b2: _.pct2,
          b3: _.pct3,
          b4p: _.pct4p
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
    }, b = (_) => _?.replace("80", "") || "#888888", v = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [g.value.pct0],
          backgroundColor: h.c0,
          borderColor: b(h.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [g.value.pct1],
          backgroundColor: h.c1,
          borderColor: b(h.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [g.value.pct2],
          backgroundColor: h.c2,
          borderColor: b(h.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [g.value.pct3],
          backgroundColor: h.c3,
          borderColor: b(h.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [g.value.pct4p],
          backgroundColor: h.c4p,
          borderColor: b(h.c4p),
          borderWidth: 1
        }
      ]
    })), y = C(() => ({
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
            label: (_) => `${_.dataset.label} intent(s): ${Number(_.raw || 0).toFixed(0)}%`
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
    })), w = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, k) => (f(), ne(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", x1, [
          u.value ? (f(), x(he, { key: 0 }, [
            d("div", k1, [
              N($t, {
                data: v.value,
                options: y.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "w-full min-w-0",
              title: "Total",
              value: B(me)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", _1, [
              N(pt, {
                columns: m,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": F(({ row: $ }) => [
                  d("span", w1, A($.metric), 1)
                ]),
                "cell-b0": F(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c0) })
                  }, A(w(Number($.b0))) + "%", 5)) : (f(), x("span", C1, A(B(me)(Number($.b0))), 1))
                ]),
                "cell-b1": F(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c1) })
                  }, A(w(Number($.b1))) + "%", 5)) : (f(), x("span", $1, A(B(me)(Number($.b1))), 1))
                ]),
                "cell-b2": F(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c2) })
                  }, A(w(Number($.b2))) + "%", 5)) : (f(), x("span", S1, A(B(me)(Number($.b2))), 1))
                ]),
                "cell-b3": F(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c3) })
                  }, A(w(Number($.b3))) + "%", 5)) : (f(), x("span", M1, A(B(me)(Number($.b3))), 1))
                ]),
                "cell-b4p": F(({ row: $ }) => [
                  $.id === "pct" ? (f(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c4p) })
                  }, A(w(Number($.b4p))) + "%", 5)) : (f(), x("span", D1, A(B(me)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (f(), x("div", A1, [
            d("div", T1, [
              d("div", B1, [
                N(B(rt), { class: "empty-icon" })
              ]),
              k[0] || (k[0] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
              k[1] || (k[1] = d("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), R1 = /* @__PURE__ */ be(L1, [["__scopeId", "data-v-be7d2c0c"]]), P1 = { class: "card-body" }, I1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, E1 = { class: "pie-section" }, F1 = {
  key: 1,
  class: "empty-state"
}, O1 = /* @__PURE__ */ fe({
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
    }, l = (p) => i[p]?.label || p.toUpperCase(), r = C(
      () => a.data?.items && a.data.items.length > 0
    ), c = C(
      () => (a.data?.items || []).reduce((p, h) => p + h.count, 0)
    ), u = C(() => {
      const p = {};
      for (const h of a.data?.items || [])
        p[h.language] = (p[h.language] || 0) + h.count;
      return Object.entries(p).map(([h, b]) => ({ language: h, count: b })).sort((h, b) => b.count - h.count);
    }), g = C(() => ({
      labels: u.value.map((p) => l(p.language)),
      datasets: [
        {
          data: u.value.map((p) => p.count),
          backgroundColor: u.value.map(
            (p, h) => s[h % s.length] + "80"
          ),
          borderColor: u.value.map(
            (p, h) => s[h % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), m = C(() => ({
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
            label: (p) => {
              const h = p.raw || 0, b = c.value > 0 ? (h / c.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${h} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (p, h) => (f(), ne(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: F(() => [
        d("div", P1, [
          r.value ? (f(), x("div", I1, [
            d("section", E1, [
              N(Fn, {
                data: g.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "shrink-0",
              title: "Total",
              value: B(me)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (f(), x("section", F1, [...h[0] || (h[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No language data available"),
              d("p", { class: "empty-description" }, " No language selection data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), V1 = /* @__PURE__ */ be(O1, [["__scopeId", "data-v-9385c088"]]), z1 = { class: "card-body" }, N1 = {
  key: 0,
  class: "guardrails-daily-section"
}, j1 = { class: "w-full min-w-0" }, H1 = { class: "font-medium" }, W1 = { class: "font-semibold" }, K1 = { class: "type-badges-row" }, U1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, Y1 = {
  key: 1,
  class: "empty-state"
}, q1 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me($e(n, "theme")), l = C(
      () => n.data?.items && n.data.items.length > 0
    ), r = C(
      () => (n.data?.items || []).reduce((v, y) => v + y.count, 0)
    ), c = (v) => {
      const y = {};
      for (const k of n.data?.items || [])
        y[k[v]] = (y[k[v]] || 0) + k.count;
      const w = Object.entries(y).sort((k, $) => $[1] - k[1]);
      if (w.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: w[0][0],
        pct: _ > 0 ? Math.round(w[0][1] / _ * 100) : 0
      };
    }, u = C(() => c("guardrail_type")), g = C(() => c("guardrail_action")), m = C(() => c("guardrail_source")), p = C(() => {
      const v = {};
      for (const y of n.data?.items || [])
        v[y.date] || (v[y.date] = {}), v[y.date][y.guardrail_type] = (v[y.date][y.guardrail_type] || 0) + y.count;
      return Object.entries(v).map(([y, w]) => ({
        date: y,
        total: Object.values(w).reduce((_, k) => _ + k, 0),
        types: Object.entries(w).map(([_, k]) => ({ type: _, count: k })).sort((_, k) => k.count - _.count)
      })).sort((y, w) => new Date(y.date).getTime() - new Date(w.date).getTime());
    }), h = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], b = C(
      () => p.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, y) => (f(), ne(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", z1, [
          l.value ? (f(), x(he, { key: 0 }, [
            p.value.length > 0 ? (f(), x("section", N1, [
              d("div", j1, [
                N(pt, {
                  columns: h,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": F(({ row: w }) => [
                    d("span", H1, A(B(ze)(String(w.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": F(({ row: w }) => [
                    d("span", W1, A(B(me)(w.total)), 1)
                  ]),
                  "cell-types": F(({ row: w }) => [
                    d("div", K1, [
                      (f(!0), x(he, null, pe(w.types, (_) => (f(), x("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            d("section", U1, [
              N(xe, {
                title: "Total Events",
                value: B(me)(r.value)
              }, null, 8, ["value"]),
              N(xe, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top action",
                value: g.value.name,
                subvalue: g.value.pct > 0 ? `(${g.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top source",
                value: m.value.name,
                subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (f(), x("section", Y1, [...y[0] || (y[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No guardrail events"),
              d("p", { class: "empty-description" }, "No content safety events found for the selected period. This is a good sign!")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), X1 = /* @__PURE__ */ be(q1, [["__scopeId", "data-v-c042ede0"]]), G1 = { class: "card-body" }, Z1 = { class: "chart-section" }, Q1 = { class: "chart-wrapper" }, J1 = {
  key: 1,
  class: "empty-chart"
}, ex = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, tx = {
  key: 0,
  class: "dn-failure-section"
}, ax = { class: "w-full min-w-0" }, nx = { class: "failure-reason" }, ox = { class: "failure-count" }, sx = { class: "impact-bar-container" }, ix = { class: "impact-label" }, lx = { class: "dn-trend-health-block flex flex-col gap-0" }, rx = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, cx = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, dx = { class: "system-health" }, ux = { class: "system-health-content" }, hx = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, fx = {
  key: 1,
  class: "empty-state"
}, gx = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = ($) => {
      o("export", $);
    }, { isDark: i, colors: l } = Me($e(n, "theme")), r = C(() => {
      const $ = n.data?.documentCounts?.items || [], S = n.data?.processingCounts?.items || [];
      return $.length > 0 || S.length > 0;
    }), c = C(() => {
      const $ = n.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((S, D) => S + D.processing_started, 0),
        processing_completed: $.reduce((S, D) => S + D.processing_completed, 0),
        processing_failed: $.reduce((S, D) => S + D.processing_failed, 0),
        row_count_total: $.reduce((S, D) => S + D.row_count_total, 0)
      };
    }), u = C(() => {
      const $ = n.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((S, D) => S + D.processing_started, 0),
        processing_success: $.reduce((S, D) => S + D.processing_success, 0),
        notification_sent: $.reduce((S, D) => S + D.notification_sent, 0),
        notification_failed: $.reduce((S, D) => S + D.notification_failed, 0),
        dq_phone: $.reduce((S, D) => S + D.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((S, D) => S + D.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((S, D) => S + D.dq_error_booking_not_found, 0),
        dq_other: $.reduce((S, D) => S + D.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (S, D) => S + D.dq_error_phone_not_found + D.dq_error_flight_not_found + D.dq_error_booking_not_found + D.dq_error_other,
          0
        )
      };
    }), g = C(
      () => c.value.row_count_total || u.value.processing_started
    ), m = C(
      () => Math.max(0, g.value - u.value.notification_sent)
    ), p = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", h = C(() => {
      const $ = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, D) => D.count - S.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), b = C(() => {
      const $ = g.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].map((S) => ({
        ...S,
        impactPct: $ > 0 ? Math.round(S.count / $ * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], y = C(
      () => b.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), w = C(() => {
      const $ = g.value, S = u.value.processing_success, D = Math.max(0, S - u.value.totalDqErrors), P = u.value.notification_sent, V = Math.max(0, $ - S), W = u.value.totalDqErrors, M = Math.max(0, D - P), R = (H, Q) => ye(H, Q), T = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], j = [];
      return S > 0 && j.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: R(S, $)
      }), V > 0 && j.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: R(V, $)
      }), D > 0 && j.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: D,
        label: R(D, $)
      }), W > 0 && j.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: W,
        label: R(W, $)
      }), P > 0 && j.push({
        source: "Contactable",
        target: "Notified",
        value: P,
        label: R(P, $)
      }), M > 0 && j.push({
        source: "Contactable",
        target: "Not Delivered",
        value: M,
        label: R(M, $)
      }), { nodes: T, links: j };
    }), _ = C(() => {
      const $ = [...n.data?.processingCounts?.items || []].sort(
        (R, T) => new Date(R.date).getTime() - new Date(T.date).getTime()
      ), S = n.data?.documentCounts?.items || [], D = {};
      for (const R of S)
        D[R.date] = (D[R.date] || 0) + R.row_count_total;
      const P = [
        .../* @__PURE__ */ new Set([
          ...$.map((R) => R.date),
          ...S.map((R) => R.date)
        ])
      ].sort(), V = P.map((R) => ze(R).format("MMM DD")), W = P.map((R) => {
        const T = $.find((Q) => Q.date === R), j = T?.notification_sent || 0, H = D[R] || T?.processing_started || 0;
        return H > 0 ? Math.round(j / H * 100) : 0;
      }), M = P.map((R) => $.find((j) => j.date === R)?.notification_sent || 0);
      return {
        labels: V,
        datasets: [
          {
            label: "Success Rate (%)",
            data: W,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: M,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), k = C(() => ({
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
            label: ($) => $.datasetIndex === 0 ? ` Success Rate: ${$.raw}%` : ` Notifications: ${$.raw}`
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
            callback: ($) => `${$}%`
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
    return t({ isDark: i }), ($, S) => (f(), ne(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: S[0] || (S[0] = (D) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", G1, [
          r.value ? (f(), x(he, { key: 0 }, [
            d("section", Z1, [
              S[2] || (S[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", Q1, [
                w.value.nodes.length > 0 && w.value.links.length > 0 ? (f(), ne(na, {
                  key: 0,
                  data: w.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (f(), x("div", J1, [...S[1] || (S[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", ex, [
              N(xe, {
                color: "#3b82f6",
                title: "Total Records",
                value: B(me)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: B(me)(g.value)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#10b981",
                title: "Successfully Notified",
                value: B(me)(u.value.notification_sent),
                subvalue: p(u.value.notification_sent, g.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#ef4444",
                title: "Not Notified",
                value: B(me)(m.value),
                subvalue: p(m.value, g.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: h.value.reason,
                subvalue: h.value.count > 0 ? `${B(me)(h.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (f(), x("section", tx, [
              S[3] || (S[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", ax, [
                N(pt, {
                  columns: v,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": F(({ row: D }) => [
                    d("span", nx, A(D.reason), 1)
                  ]),
                  "cell-count": F(({ row: D }) => [
                    d("span", ox, A(B(me)(D.count)), 1)
                  ]),
                  "cell-impact": F(({ row: D }) => [
                    d("div", sx, [
                      d("div", {
                        class: "impact-bar",
                        style: Ce({ width: D.impactPct + "%" })
                      }, null, 4),
                      d("span", ix, A(D.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            d("div", lx, [
              _.value.labels.length > 0 ? (f(), x("section", rx, [
                S[4] || (S[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", cx, [
                  N(mt, {
                    data: _.value,
                    options: k.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : O("", !0),
              d("details", dx, [
                S[5] || (S[5] = d("summary", { class: "system-health-toggle" }, [
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
                  Ae(" System Health Details ")
                ], -1)),
                d("div", ux, [
                  d("div", hx, [
                    N(xe, {
                      title: "Docs Started",
                      value: B(me)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Completed",
                      value: B(me)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Failed",
                      value: B(me)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Started",
                      value: B(me)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Success",
                      value: B(me)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Notification Failed",
                      value: B(me)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (f(), x("section", fx, [...S[6] || (S[6] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No disruption notifier data"),
              d("p", { class: "empty-description" }, " No disruption notification data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), mx = /* @__PURE__ */ be(gx, [["__scopeId", "data-v-2342d485"]]), px = /* @__PURE__ */ fe({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => me(a.totalConversations)), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
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
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), bx = /* @__PURE__ */ fe({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
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
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), vx = /* @__PURE__ */ fe({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M3 12h3l2-6 4 12 3-8 2 2h4"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), yx = {
  key: 0,
  class: "card-body"
}, xx = { class: "chart-wrapper" }, kx = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, _x = {
  key: 1,
  class: "empty-state"
}, wx = 520, Cx = 300, $x = 40, Sx = 48, Mx = 48, Dx = {
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
    const n = a, o = (r) => {
      n("export", r);
    }, s = e, { isDark: i } = Me($e(s, "theme")), l = C(() => s.data);
    return t({ isDark: i }), (r, c) => (f(), ne(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !s.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        l.value && l.value.total_nps_responses > 0 ? (f(), x("div", yx, [
          d("div", xx, [
            N(vl, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": wx,
              "chart-height": Cx,
              "chart-margin": $x,
              "chart-margin-right": Sx,
              "chart-bottom-margin": Mx,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", kx, [
            N(xe, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (f(), ne(xe, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : O("", !0)
          ])
        ])) : (f(), x("div", _x, [...c[0] || (c[0] = [
          d("div", { class: "empty-state-content" }, [
            d("div", { class: "empty-icon-wrapper" }, [
              d("svg", {
                class: "empty-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                d("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              ])
            ]),
            d("p", { class: "empty-title" }, "No NPS data available"),
            d("p", { class: "empty-description" }, " No NPS data found for the selected period. Try adjusting the date range. ")
          ], -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Al = /* @__PURE__ */ be(Dx, [["__scopeId", "data-v-e98fe9b2"]]), Ax = {
  key: 0,
  class: "card-body"
}, Tx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Bx = {
  key: 1,
  class: "empty-state"
}, Lx = {
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
    }, o = e, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
      labels: s.value.map((c) => ze(c.date).format("DD-MM-YYYY")),
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
    })), r = {
      scales: {
        y: {
          min: 0,
          max: 10,
          grace: 1,
          ticks: {
            stepSize: 1,
            callback: (c) => {
              const u = Number(c);
              return !Number.isInteger(u) || u < 0 || u > 10 ? "" : String(u);
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
    return (c, u) => (f(), ne(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        i.value ? (f(), x("div", Ax, [
          d("div", Tx, [
            N(mt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (f(), x("div", Bx, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Tl = /* @__PURE__ */ be(Lx, [["__scopeId", "data-v-5207cfa7"]]), Rx = {
  key: 0,
  class: "card-body"
}, Px = {
  key: 1,
  class: "empty-state"
}, Ix = /* @__PURE__ */ fe({
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
    const t = e, a = C(
      () => t.data?.resolution_breakdown || []
    ), n = C(
      () => a.value.some((i) => Number(i.count || 0) > 0)
    ), o = C(() => {
      const i = a.value;
      return {
        labels: i.map((l) => l.label || String(l.score)),
        datasets: [
          {
            label: "Resolution %",
            data: i.map((l) => Number(l.percentage || 0)),
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
    return (i, l) => (f(), ne(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: F(() => [
        n.value ? (f(), x("div", Rx, [
          N($t, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (f(), x("div", Px, [...l[0] || (l[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ex = /* @__PURE__ */ be(Ix, [["__scopeId", "data-v-6849ef24"]]), Fx = {
  key: 0,
  class: "card-body"
}, Ox = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Vx = {
  key: 1,
  class: "empty-state"
}, zx = /* @__PURE__ */ fe({
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
    }, o = e, s = C(() => o.data?.csat_pulse_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
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
    })), r = {
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
    return (c, u) => (f(), ne(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        i.value ? (f(), x("div", Fx, [
          d("div", Ox, [
            N(mt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (f(), x("div", Vx, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Nx = /* @__PURE__ */ be(zx, [["__scopeId", "data-v-72955d9a"]]), jx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Hx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Bl = {
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
    const a = t, n = (u) => {
      a("export", u);
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), l = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = C(() => l.value > 0), c = C(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (u, g) => (f(), x("div", jx, [
      d("div", Hx, [
        N(Al, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        N(Tl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (f(), x("div", {
        key: 0,
        class: Z(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (f(), ne(Ex, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : O("", !0),
        i.value ? (f(), ne(Nx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])) : O("", !0)
      ], 2)) : O("", !0)
    ]));
  }
}, Wx = { class: "csat-container__body" }, Kx = /* @__PURE__ */ fe({
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
    return (o, s) => (f(), ne(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: F(() => [
        d("div", Wx, [
          N(Bl, {
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
}), Ux = /* @__PURE__ */ be(Kx, [["__scopeId", "data-v-37178ba1"]]), Yx = /* @__PURE__ */ fe({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => Yt(a.totalRevenue)), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
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
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.75",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }),
          d("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
          d("path", { d: "M12 18V6" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "prefix", "loading", "theme", "current-value", "previous-value"]));
  }
}), qx = { class: "flex justify-end" }, Xx = { class: "w-52" }, Gx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Zx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Qx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Jx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ek = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, tk = /* @__PURE__ */ fe({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: l } = Me(s), r = oe(n.breakdownBy), c = C(() => n.data?.currency ?? "USD"), u = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], g = C(() => {
      const R = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return R ? `AI Generated Revenue by ${R}` : "AI Generated Revenue";
    }), m = C(() => r.value === "payment_method"), p = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], h = (M) => p[M % p.length], b = (M) => {
      if (!M) return "0";
      const R = Math.abs(M);
      return R >= 1e6 ? (M / 1e6).toFixed(2) + "M" : R >= 1e5 ? (M / 1e3).toFixed(1) + "K" : Math.round(M).toLocaleString();
    }, v = (M) => !M || M === "unknown" ? "Unknown" : kt(M).split(/[_|]/).map((R) => R ? R.charAt(0).toUpperCase() + R.slice(1) : "").join(" "), y = oe({
      labels: [],
      datasets: []
    }), w = oe([]), _ = C(() => {
      const M = Math.min(w.value.length, 5);
      if (!(M <= 0))
        return { gridTemplateColumns: `repeat(${M}, minmax(0, 1fr))` };
    }), k = (M) => {
      const R = M?.ai_revenue_by_day ?? [], T = M?.breakdown ?? [];
      if (!R.length) {
        y.value = { labels: [], datasets: [] }, w.value = [];
        return;
      }
      const j = [...R].sort((q, ae) => q.date.localeCompare(ae.date)), H = j.map((q) => ze(q.date).format("MMM DD")), Q = "ai_revenue";
      if (r.value === "all") {
        y.value = {
          labels: H,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: j.map((q) => Number(q[Q] ?? 0)),
              borderColor: p[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: p[0],
              pointBorderWidth: 2
            }
          ]
        }, w.value = [];
        return;
      }
      const de = T.slice(0, 7).map((q) => q.key).map((q, ae) => {
        const L = h(ae), K = j.map((Y) => {
          const z = (Y.breakdown ?? {})[q];
          return z ? Number(z[Q] ?? 0) : 0;
        });
        return m.value ? {
          label: v(q),
          data: K,
          backgroundColor: L,
          borderColor: L,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: v(q),
          data: K,
          borderColor: L,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: L,
          pointBorderWidth: 2
        };
      });
      y.value = { labels: H, datasets: de }, w.value = T.slice(0, 5).map((q, ae) => ({
        key: q.key,
        label: v(q.key),
        amount: `${c.value} ${b(q.total)}`,
        percentage: Number(q.percentage ?? 0),
        color: h(ae)
      }));
    }, $ = C(() => ({
      callback: (M) => `${c.value} ${b(Number(M))}`,
      color: l.value.textSecondary,
      padding: 8
    })), S = C(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), D = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: $.value
    })), P = C(() => ({
      scales: {
        x: S.value,
        y: D.value
      }
    })), V = C(() => ({
      scales: {
        x: { ...S.value, stacked: !0 },
        y: { ...D.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (M) => k(M ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (M) => {
        r.value = M, k(n.data ?? null);
      }
    );
    const W = (M) => {
      r.value = String(M), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (M, R) => (f(), ne(Se, {
      class: "w-full min-h-0 self-start",
      title: g.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: F(() => [
        d("div", qx, [
          d("div", Xx, [
            N(Kt, {
              "model-value": r.value,
              options: u,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: F(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(gt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: F(() => [
              n.loading ? (f(), x("div", Gx, [...R[0] || (R[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (f(), x("div", Zx, [
                y.value.labels && y.value.labels.length && y.value.datasets.length ? (f(), x("section", Qx, [
                  d("div", Jx, [
                    m.value ? (f(), ne($t, {
                      key: 0,
                      data: y.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (f(), ne(mt, {
                      key: 1,
                      data: y.value,
                      options: P.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  w.value.length ? (f(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(_.value)
                  }, [
                    (f(!0), x(he, null, pe(w.value, (T) => (f(), ne(xe, {
                      key: `card-${T.key}`,
                      class: "min-w-0",
                      color: T.color,
                      title: T.label,
                      value: T.amount,
                      subvalue: `${T.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : O("", !0)
                ])) : (f(), x("section", ek, [...R[1] || (R[1] = [
                  d("div", { class: "max-w-[360px] px-4 text-center" }, [
                    d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No revenue data available "),
                    d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No AI revenue found for the selected period. Try adjusting the date range. ")
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
}), ak = /* @__PURE__ */ be(tk, [["__scopeId", "data-v-d3e5e67f"]]), nk = { class: "flex justify-end" }, ok = { class: "w-52" }, sk = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ik = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, lk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, rk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ck = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, dk = /* @__PURE__ */ fe({
  __name: "TransactionsChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: l } = Me(s), r = oe(n.breakdownBy), c = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], u = C(() => {
      const R = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return R ? `Transactions by ${R}` : "Transactions";
    }), g = C(() => r.value === "payment_method"), m = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], p = (M) => m[M % m.length], h = (M) => {
      if (!M) return "0";
      const R = Math.abs(M);
      return R >= 1e6 ? (M / 1e6).toFixed(2) + "M" : R >= 1e5 ? (M / 1e3).toFixed(1) + "K" : Math.round(M).toLocaleString();
    }, b = (M) => !M || M === "unknown" ? "Unknown" : kt(M).split(/[_|]/).map((R) => R ? R.charAt(0).toUpperCase() + R.slice(1) : "").join(" "), v = oe({
      labels: [],
      datasets: []
    }), y = oe([]), w = C(() => {
      const M = Math.min(y.value.length, 5);
      if (!(M <= 0))
        return { gridTemplateColumns: `repeat(${M}, minmax(0, 1fr))` };
    }), _ = (M) => Object.values(M ?? {}).reduce((R, T) => R + Number(T ?? 0), 0), k = (M) => {
      const R = M?.breakdown ?? [];
      if (r.value === "all") {
        const de = M?.sales_by_channel_by_day ?? [];
        if (!de.length) {
          v.value = { labels: [], datasets: [] }, y.value = [];
          return;
        }
        const q = [...de].sort((ae, L) => ae.date.localeCompare(L.date));
        v.value = {
          labels: q.map((ae) => ze(ae.date).format("MMM DD")),
          datasets: [
            {
              label: "Transactions",
              data: q.map((ae) => _(ae.channels)),
              borderColor: m[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: m[0],
              pointBorderWidth: 2
            }
          ]
        }, y.value = [];
        return;
      }
      const T = M?.transactions_by_day ?? [];
      if (!T.length) {
        v.value = { labels: [], datasets: [] }, y.value = [];
        return;
      }
      const j = [...T].sort((de, q) => de.date.localeCompare(q.date)), H = j.map((de) => ze(de.date).format("MMM DD")), re = R.slice(0, 7).map((de) => de.key).map((de, q) => {
        const ae = p(q), L = j.map((K) => Number((K.breakdown ?? {})[de] ?? 0));
        return g.value ? {
          label: b(de),
          data: L,
          backgroundColor: ae,
          borderColor: ae,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: b(de),
          data: L,
          borderColor: ae,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: ae,
          pointBorderWidth: 2
        };
      });
      v.value = { labels: H, datasets: re }, y.value = R.slice(0, 5).map((de, q) => ({
        key: de.key,
        label: b(de.key),
        amount: h(de.count),
        percentage: Number(de.percentage ?? 0),
        color: p(q)
      }));
    }, $ = C(() => ({
      callback: (M) => h(Number(M)),
      color: l.value.textSecondary,
      padding: 8
    })), S = C(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), D = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: $.value
    })), P = C(() => ({
      scales: {
        x: S.value,
        y: D.value
      }
    })), V = C(() => ({
      scales: {
        x: { ...S.value, stacked: !0 },
        y: { ...D.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (M) => k(M ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (M) => {
        r.value = M, k(n.data ?? null);
      }
    );
    const W = (M) => {
      r.value = String(M), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (M, R) => (f(), ne(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "Number of transactions generated by agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: F(() => [
        d("div", nk, [
          d("div", ok, [
            N(Kt, {
              "model-value": r.value,
              options: c,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: F(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(gt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: F(() => [
              n.loading ? (f(), x("div", sk, [...R[0] || (R[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (f(), x("div", ik, [
                v.value.labels && v.value.labels.length && v.value.datasets.length ? (f(), x("section", lk, [
                  d("div", rk, [
                    g.value ? (f(), ne($t, {
                      key: 0,
                      data: v.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (f(), ne(mt, {
                      key: 1,
                      data: v.value,
                      options: P.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  y.value.length ? (f(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(w.value)
                  }, [
                    (f(!0), x(he, null, pe(y.value, (T) => (f(), ne(xe, {
                      key: `card-${T.key}`,
                      class: "min-w-0",
                      color: T.color,
                      title: T.label,
                      value: T.amount,
                      subvalue: `${T.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : O("", !0)
                ])) : (f(), x("section", ck, [...R[1] || (R[1] = [
                  d("div", { class: "max-w-[360px] px-4 text-center" }, [
                    d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No transaction data available "),
                    d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No transactions found for the selected period. Try adjusting the date range. ")
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
}), uk = /* @__PURE__ */ be(dk, [["__scopeId", "data-v-c7fba568"]]), fi = 1, hk = /* @__PURE__ */ fe({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), { isDark: o } = Me($e(a, "theme")), s = C(() => a.totalConversations * fi), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * fi), l = C(() => me(s.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const m = i.value;
      return m === 0 ? s.value > 0 ? 100 : 0 : (s.value - m) / m * 100;
    }), u = C(() => {
      const m = c.value.toFixed(1);
      return c.value > 0 ? `+${m}%` : `${m}%`;
    }), g = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (m, p) => (f(), ne(ot, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...p[0] || (p[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" })
        ], -1)
      ])]),
      headerAside: F(() => [
        r.value ? (f(), x("div", {
          key: 0,
          class: Z(["change-badge", g.value, { "change-badge--dark": B(o) }])
        }, A(u.value), 3)) : O("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), fk = /* @__PURE__ */ be(hk, [["__scopeId", "data-v-411e0735"]]), gk = { class: "flex justify-end" }, mk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, pk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, bk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, vk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, yk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, xk = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (k) => {
      o("export", k);
    }, i = $e(n, "theme"), { isDark: l } = Me(i), r = oe(n.breakdownBy), c = C(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), u = oe({
      labels: [],
      datasets: []
    }), g = oe([]), m = C(() => {
      const k = g.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), p = oe(
      []
    ), h = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], b = (k) => h[k % h.length], v = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (k) => `${k}%`
          }
        }
      }
    }, y = () => {
      o("changeBreakdown", r.value);
    }, w = (k) => {
      if (!k) return "";
      const S = k.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, _ = (k) => {
      if (r.value === "all") {
        const M = k?.escalations_by_day ?? [];
        if (!M.length) {
          u.value = { labels: [], datasets: [] }, g.value = [], p.value = [];
          return;
        }
        const R = [...M].sort((T, j) => T.date.localeCompare(j.date));
        u.value = {
          labels: R.map((T) => ze(T.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: R.map(
                (T) => Number(T.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, g.value = [], p.value = [];
        return;
      }
      const $ = k?.breakdown_by_day ?? [], S = k?.breakdown_items ?? [];
      if (!$.length) {
        u.value = { labels: [], datasets: [] }, g.value = [], p.value = [];
        return;
      }
      const D = [...$].sort(
        (M, R) => M.date.localeCompare(R.date)
      ), P = S.slice(0, 5).map((M) => M.key), V = D.map((M) => ze(M.date).format("MMM DD")), W = P.map((M, R) => {
        const T = S.find((j) => j.key === M);
        return {
          label: w(T?.label || M),
          data: D.map((j) => {
            const H = j.items.find((Q) => Q.key === M);
            return Number(H?.percentage || 0);
          }),
          borderColor: b(R),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      u.value = {
        labels: V,
        datasets: W
      }, g.value = S.slice(0, 5).map((M, R) => ({
        key: M.key,
        label: w(M.label),
        percentage: Number(M.percentage || 0),
        color: b(R)
      })), p.value = S.slice(0, 5).map((M, R) => ({
        key: M.key,
        label: w(M.label),
        color: b(R)
      }));
    };
    return Te(
      () => n.data,
      (k) => {
        _(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (k) => {
        r.value = k, _(c.value);
      }
    ), t({ isDark: l }), (k, $) => (f(), ne(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      headerAside: F(() => [
        d("div", gk, [
          Xe(d("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (S) => r.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [...$[1] || ($[1] = [
            d("option", { value: "all" }, "All", -1),
            d("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [ql, r.value]
          ])
        ])
      ]),
      default: F(() => [
        d("div", mk, [
          d("div", pk, [
            u.value.labels && u.value.labels.length && u.value.datasets.length ? (f(), x("section", bk, [
              d("div", vk, [
                N(mt, {
                  data: u.value,
                  options: v,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              g.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(m.value)
              }, [
                (f(!0), x(he, null, pe(g.value, (S) => (f(), ne(xe, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : O("", !0)
            ])) : (f(), x("section", yk, [...$[2] || ($[2] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), kk = /* @__PURE__ */ be(xk, [["__scopeId", "data-v-b18e0ebd"]]), _k = /* @__PURE__ */ fe({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m17.25 15.75 4.5 4.5"
          }),
          d("path", {
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
function uo(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const wk = { class: "flex justify-end" }, Ck = { class: "w-52" }, $k = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Sk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Mk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Dk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ak = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Tk = "#8b5cf6", Bk = "#9ca3af", Lk = "#94a3b8", Rk = /* @__PURE__ */ fe({
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
    ], l = $e(n, "theme"), { isDark: r } = Me(l), c = oe(n.breakdownBy), u = C(() => {
      const ae = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return ae ? `Average resolution time by ${ae}` : "Average resolution time";
    }), g = (q) => {
      c.value = String(q), o("changeBreakdown", c.value);
    }, m = [
      { key: "ai_agent", label: "AI Agent", color: "#8b5cf6" },
      { key: "human", label: "Human", color: "#f59e0b" },
      { key: "hybrid", label: "AI + Human", color: "#06b6d4" }
    ], p = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = (q) => p[q.toLowerCase()] || Bk, b = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, v = (q) => b[q.toLowerCase()] || Lk, y = (q) => {
      const [ae] = q.split("|").map((L) => L.trim());
      return v(ae || q);
    }, w = (q) => {
      if (!q) return "Unknown";
      const ae = kt(q).replace(/_/g, " ").trim();
      return ae ? ae.charAt(0).toUpperCase() + ae.slice(1) : "Unknown";
    }, _ = C(() => n.data ?? {
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
    }), k = oe({
      labels: [],
      datasets: []
    }), $ = C(() => {
      const q = _.value, ae = {
        ai_agent: q.ai_agent_total_conversations,
        human: q.human_total_conversations,
        hybrid: q.hybrid_total_conversations
      }, L = {
        ai_agent: q.ai_agent_avg_resolution_time_formatted,
        human: q.human_avg_resolution_time_formatted,
        hybrid: q.hybrid_avg_resolution_time_formatted
      };
      return m.map((K) => ({
        key: K.key,
        label: K.label,
        color: K.color,
        formattedValue: L[K.key] || "-",
        subvalue: `${ae[K.key] || 0} conversations`
      }));
    }), S = (q, ae) => q.map((L) => ({
      key: L.key,
      label: w(L.label),
      color: ae(L.key),
      formattedValue: L.avg_resolution_time_formatted || "-",
      subvalue: `${L.total_conversations} conversations (${L.percentage.toFixed(1)}%)`
    })), D = C(
      () => S(_.value.channel_breakdown_items ?? [], h)
    ), P = C(
      () => S(_.value.agent_breakdown_items ?? [], v)
    ), V = C(
      () => S(
        _.value.agent_channel_breakdown_items ?? [],
        y
      )
    ), W = C(() => {
      switch (c.value) {
        case "channel":
          return D.value;
        case "agent":
          return P.value;
        case "agent_channel":
          return V.value;
        case "resolution_mode":
          return $.value;
        default:
          return [];
      }
    }), M = C(() => {
      const q = W.value.length;
      if (!(q <= 0))
        return { gridTemplateColumns: `repeat(${q}, minmax(0, 1fr))` };
    }), R = (q) => q == null ? null : Number((q / 60).toFixed(2)), T = oe([]), j = (q) => {
      const ae = q?.overall_resolution_time_by_day ?? {}, L = Object.keys(ae).sort((K, Y) => K.localeCompare(Y));
      if (!L.length) {
        k.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      T.value = [L.map((K) => ae[K] ?? null)], k.value = {
        labels: L.map((K) => ze(K).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: T.value[0].map((K) => R(K)),
            borderColor: Tk,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, H = (q) => {
      const ae = q?.resolution_time_by_day ?? {}, L = Object.keys(ae).sort((K, Y) => K.localeCompare(Y));
      if (!L.length) {
        k.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      T.value = m.map(
        (K) => L.map((Y) => ae[Y]?.[K.key] ?? null)
      ), k.value = {
        labels: L.map((K) => ze(K).format("MMM DD")),
        datasets: m.map((K, Y) => ({
          label: K.label,
          data: T.value[Y].map((z) => R(z)),
          borderColor: K.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, Q = (q, ae, L) => {
      const K = Object.keys(q).sort((z, le) => z.localeCompare(le));
      if (!K.length || !ae.length) {
        k.value = { labels: [], datasets: [] }, T.value = [];
        return;
      }
      const Y = ae.map((z) => z.key);
      T.value = Y.map((z) => K.map((le) => q[le]?.[z] ?? null)), k.value = {
        labels: K.map((z) => ze(z).format("MMM DD")),
        datasets: Y.map((z, le) => {
          const ce = ae.find((ve) => ve.key === z);
          return {
            label: w(ce?.label || z),
            data: T.value[le].map((ve) => R(ve)),
            borderColor: L(z),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, re = (q) => {
      switch (c.value) {
        case "channel":
          Q(
            q?.channel_resolution_time_by_day ?? {},
            q?.channel_breakdown_items ?? [],
            h
          );
          return;
        case "agent":
          Q(
            q?.agent_resolution_time_by_day ?? {},
            q?.agent_breakdown_items ?? [],
            v
          );
          return;
        case "agent_channel":
          Q(
            q?.agent_channel_resolution_time_by_day ?? {},
            q?.agent_channel_breakdown_items ?? [],
            y
          );
          return;
        case "resolution_mode":
          H(q);
          return;
        default:
          j(q);
      }
    }, de = C(() => ({
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
              const ae = q.dataset.label || "", L = T.value[q.datasetIndex]?.[q.dataIndex];
              return L == null ? `${ae}: -` : `${ae}: ${uo(L)}`;
            }
          }
        }
      }
    }));
    return Te(
      () => n.data,
      (q) => {
        re(q ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (q) => {
        c.value = q, re(n.data ?? null);
      }
    ), t({ isDark: r }), (q, ae) => (f(), ne(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      headerAside: F(() => [
        d("div", wk, [
          d("div", Ck, [
            N(Kt, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": g
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: F(() => [
        d("div", $k, [
          d("div", Sk, [
            k.value.labels.length && k.value.datasets.length ? (f(), x("section", Mk, [
              d("div", Dk, [
                N(mt, {
                  data: k.value,
                  options: de.value,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              W.value.length ? (f(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(M.value)
              }, [
                (f(!0), x(he, null, pe(W.value, (L) => (f(), ne(xe, {
                  key: `card-${L.key}`,
                  class: "min-w-0",
                  color: L.color,
                  title: L.label,
                  value: L.formattedValue,
                  subvalue: L.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : (f(), x("section", Ak, [...ae[0] || (ae[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No resolution time data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No conversations found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), Pk = /* @__PURE__ */ be(Rk, [["__scopeId", "data-v-05854dc5"]]), Ik = { class: "art-values__item" }, Ek = { class: "art-values__number" }, Fk = { class: "art-values__item" }, Ok = { class: "art-values__number" }, Vk = /* @__PURE__ */ fe({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), { isDark: o } = Me($e(a, "theme")), s = C(() => uo(a.aiAgentAvgResolutionTimeSeconds)), i = C(() => uo(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (l, r) => (f(), ne(ot, {
      label: "Average Resolution Time",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          })
        ], -1)
      ])]),
      value: F(() => [
        d("div", {
          class: Z(["art-values", { "art-values--dark": B(o) }])
        }, [
          d("div", Ik, [
            d("span", Ek, A(s.value), 1),
            r[1] || (r[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          r[3] || (r[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", Fk, [
            d("span", Ok, A(i.value), 1),
            r[2] || (r[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), zk = /* @__PURE__ */ be(Vk, [["__scopeId", "data-v-f0592d9d"]]), Nk = /* @__PURE__ */ fe({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
      label: "Check-in CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.checkinCr,
      "previous-value": e.previousCheckinCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M2 22h20" }),
          d("path", { d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), jk = /* @__PURE__ */ fe({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
      label: "Seller CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.sellerCr,
      "previous-value": e.previousSellerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M16 10a4 4 0 0 1-8 0" }),
          d("path", { d: "M3.103 6.034h17.794" }),
          d("path", { d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Hk = /* @__PURE__ */ fe({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = C(() => B(n.value?.isDark) ?? !1), i = C(() => B(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (f(), ne(ot, {
      label: "Booking Manager CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.bookingManagerCr,
      "previous-value": e.previousBookingManagerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "m15 11-1 9" }),
          d("path", { d: "m19 11-4-7" }),
          d("path", { d: "M2 11h20" }),
          d("path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" }),
          d("path", { d: "M4.5 15.5h15" }),
          d("path", { d: "m5 11 4-7" }),
          d("path", { d: "m9 11 1 9" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Wk = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Kk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Uk = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Yk = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, qk = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Xk = { class: "max-w-[360px] text-center" }, Gk = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Zk = {
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
    const t = e, { isDark: a, colors: n } = Me($e(t, "theme")), o = C(() => {
      const l = t.data ?? {}, r = l.daily, c = l.days, u = Array.isArray(r) && r.length > 0, g = Array.isArray(c) && c.length > 0 && Array.isArray(l.allocatedCostSeries) && l.allocatedCostSeries.length === c.length;
      let m = [];
      return u ? m = r : g && (m = c.map((p, h) => ({
        date: p,
        allocated_cost: l.allocatedCostSeries[h] ?? 0,
        aws_cost: l.awsCostSeries[h] ?? 0,
        airline_conversations: l.airlineConversationsSeries[h] ?? 0
      }))), {
        daily: m,
        total_allocated_cost: l.total_allocated_cost ?? l.totalAllocated ?? 0,
        total_cost: l.total_cost ?? l.total ?? 0,
        total_conversations: l.total_conversations ?? l.totalConversations ?? 0,
        total_airline_conversations: l.total_airline_conversations ?? l.totalAirlineConversations ?? 0,
        airline_name: l.airline_name
      };
    }), s = C(() => {
      const l = o.value.daily;
      return {
        labels: l.map((c) => c.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: l.map((c) => c.allocated_cost),
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
            data: l.map((c) => c.aws_cost),
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
            data: l.map((c) => c.airline_conversations),
            borderColor: n.value.info,
            backgroundColor: a.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), i = C(() => ({
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
            label(l) {
              const r = l.dataset.label ? `${l.dataset.label}: ` : "", c = l.parsed.y;
              return l.dataset.yAxisID === "y" ? r + Ie(c) : r + String(c);
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
            callback: (l) => Ie(l)
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
    return (l, r) => (f(), ne(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", Wk, [
          o.value.daily.length > 0 ? (f(), x("div", Kk, [
            d("div", Uk, [
              N(mt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", Yk, [
              N(xe, {
                color: B(n).primaryLight,
                title: "Total Allocated",
                value: B(Ie)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              N(xe, {
                color: "#FF9900",
                title: "Total AWS",
                value: B(Ie)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (f(), x("section", qk, [
            d("div", Xk, [
              d("div", Gk, [
                N(B(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              r[0] || (r[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              r[1] || (r[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, Qk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Jk = { class: "card-body" }, e_ = {
  key: 0,
  class: "chart-section"
}, t_ = { class: "chart-container" }, a_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, n_ = {
  key: 1,
  class: "empty-state"
}, o_ = { class: "empty-state-content" }, s_ = { class: "empty-icon-wrapper" }, Pa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", gi = 10, i_ = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (h) => {
      const b = new Date(h), v = String(b.getDate()).padStart(2, "0"), y = String(b.getMonth() + 1).padStart(2, "0");
      return `${v}-${y}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.input_cost || 0), 0);
    }), c = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.output_cost || 0), 0);
    }), u = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_read_cost || 0), 0);
    }), g = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_write_cost || 0), 0);
    }), m = C(() => {
      const h = n.data?.costs_by_day || {}, b = Object.keys(h).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const v = b.map((w) => i(w)), y = [
        {
          label: "Input Cost",
          data: b.map((w) => h[w]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((w) => h[w]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((w) => h[w]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((w) => h[w]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
        datasets: y
      };
    }), p = C(() => n.options ? n.options : {
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
              family: Pa,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: gi,
            boxHeight: gi,
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
            family: Pa,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Pa,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(h) {
              let b = h.dataset.label || "";
              return b && (b += ": "), h.parsed.y !== null && (b += Ie(h.parsed.y)), b;
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
            font: { family: Pa, size: 12, weight: "500" },
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
            font: { family: Pa, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(h) {
              return Ie(h);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (h, b) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", Qk, [
          d("div", Jk, [
            m.value.labels && m.value.labels.length ? (f(), x("section", e_, [
              d("div", t_, [
                N($t, {
                  data: m.value,
                  options: p.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", a_, [
                N(xe, {
                  title: "Total Cost",
                  value: B(Ie)(e.data.total_cost)
                }, null, 8, ["value"]),
                N(xe, {
                  title: "Input Cost",
                  value: B(Ie)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Output Cost",
                  value: B(Ie)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Read",
                  value: B(Ie)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Write",
                  value: B(Ie)(g.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Avg / Conv.",
                  value: B(Ie)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (f(), x("section", n_, [
              d("div", o_, [
                d("div", s_, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                b[0] || (b[0] = d("p", { class: "empty-title" }, "No cost usage data", -1)),
                b[1] || (b[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), l_ = /* @__PURE__ */ be(i_, [["__scopeId", "data-v-e1c4a95b"]]), r_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, c_ = { class: "card-body" }, d_ = {
  key: 0,
  class: "chart-section"
}, u_ = { class: "chart-container" }, h_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, f_ = {
  key: 1,
  class: "empty-state"
}, g_ = { class: "empty-state-content" }, m_ = { class: "empty-icon-wrapper" }, Ia = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", mi = 10, p_ = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (u) => {
      const g = new Date(u), m = String(g.getDate()).padStart(2, "0"), p = String(g.getMonth() + 1).padStart(2, "0");
      return `${m}-${p}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const u = n.data?.tokens_by_day || {}, g = Object.keys(u).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const m = g.map((h) => i(h)), p = [
        {
          label: "Input Tokens",
          data: g.map((h) => u[h]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: g.map((h) => u[h]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: g.map((h) => u[h]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: g.map((h) => u[h]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: p
      };
    }), c = C(() => n.options ? n.options : {
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
              family: Ia,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: mi,
            boxHeight: mi,
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
            family: Ia,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Ia,
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
            font: { family: Ia, size: 12, weight: "500" },
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
            font: { family: Ia, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (u, g) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", r_, [
          d("div", c_, [
            r.value.labels && r.value.labels.length ? (f(), x("section", d_, [
              d("div", u_, [
                N($t, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", h_, [
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: B(me)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: B(me)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: B(me)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: B(me)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: B(me)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (f(), x("section", f_, [
              d("div", g_, [
                d("div", m_, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                g[0] || (g[0] = d("p", { class: "empty-title" }, "No token usage data", -1)),
                g[1] || (g[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), b_ = /* @__PURE__ */ be(p_, [["__scopeId", "data-v-554d3cda"]]), v_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, y_ = { class: "card-body" }, x_ = {
  key: 0,
  class: "chart-section"
}, k_ = { class: "chart-container" }, __ = { class: "mt-4 w-full min-w-0" }, w_ = {
  key: 1,
  class: "empty-state"
}, C_ = { class: "empty-state-content" }, $_ = { class: "empty-icon-wrapper" }, S_ = /* @__PURE__ */ fe({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = (c) => {
      const u = new Date(c), g = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${g}`;
    }, i = C(
      () => me(a.data?.total_conversations ?? 0)
    ), l = C(() => {
      const c = a.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const g = u.map((p) => s(p)), m = [
        {
          label: "Conversations",
          data: u.map((p) => c[p] || 0),
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
        labels: g,
        datasets: m
      };
    }), r = C(() => a.options ? a.options : {
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
    return t({ isDark: n }), (c, u) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", v_, [
          d("div", y_, [
            l.value.labels && l.value.labels.length ? (f(), x("section", x_, [
              d("div", k_, [
                N(mt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", __, [
                N(xe, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (f(), x("section", w_, [
              d("div", C_, [
                d("div", $_, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = d("p", { class: "empty-title" }, "No conversation count data", -1)),
                u[1] || (u[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), M_ = /* @__PURE__ */ be(S_, [["__scopeId", "data-v-311f443a"]]), D_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, A_ = { class: "card-body" }, T_ = {
  key: 0,
  class: "charts-grid"
}, B_ = { class: "chart-section" }, L_ = { class: "chart-container" }, R_ = { class: "chart-section" }, P_ = { class: "chart-container" }, I_ = {
  key: 1,
  class: "empty-state"
}, E_ = { class: "empty-state-content" }, F_ = { class: "empty-icon-wrapper" }, O_ = /* @__PURE__ */ fe({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, p) => (p.total_cost || 0) - (m.total_cost || 0)) : []), l = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, p) => (p.total_tokens || 0) - (m.total_tokens || 0)) : []), r = C(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((p) => kt(p.agent_type)),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((p) => p.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const m = l.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((p) => kt(p.agent_type)),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((p) => p.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = C(() => a.options ? a.options : {
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
              const p = m.label, h = a.data?.top_agents?.find(
                (b) => kt(b.agent_type) === p
              );
              return h ? [
                `Total Cost: ${Ie(h.total_cost)}`,
                `Input Cost: ${Ie(h.total_input_tokens_cost)}`,
                `Output Cost: ${Ie(h.total_output_tokens_cost)}`,
                `Cache Read: ${Ie(h.total_read_tokens_cost)}`,
                `Cache Write: ${Ie(h.total_write_tokens_cost)}`
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
              return Ie(m);
            }
          }
        }
      }
    }), g = C(() => a.options ? a.options : {
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
              const p = m.label, h = a.data?.top_agents?.find(
                (b) => kt(b.agent_type) === p
              );
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
    return t({ isDark: n }), (m, p) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", D_, [
          d("div", A_, [
            s.value ? (f(), x("div", T_, [
              d("section", B_, [
                p[0] || (p[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", L_, [
                  N($t, {
                    data: r.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", R_, [
                p[1] || (p[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", P_, [
                  N($t, {
                    data: c.value,
                    options: g.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (f(), x("section", I_, [
              d("div", E_, [
                d("div", F_, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                p[2] || (p[2] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                p[3] || (p[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), V_ = /* @__PURE__ */ be(O_, [["__scopeId", "data-v-ae26eabc"]]), z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, N_ = { class: "card-body" }, j_ = {
  key: 0,
  class: "chart-section"
}, H_ = { class: "chart-container" }, W_ = {
  key: 1,
  class: "empty-state"
}, K_ = { class: "empty-state-content" }, U_ = { class: "empty-icon-wrapper" }, Y_ = /* @__PURE__ */ fe({
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
    }, i = C(() => a.data?.top_agents ? a.data.top_agents.filter(
      (g) => g.agent_type?.toLowerCase() !== "triage"
    ) : []), l = C(() => i.value.length > 0), r = C(() => i.value.reduce((g, m) => g + (m.conversations || 0), 0)), c = C(() => {
      const g = i.value;
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const m = g.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return (s[v] || "#a78bfa") + "80";
      }), p = g.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return s[v] || "#a78bfa";
      });
      return {
        labels: g.map((b) => {
          const v = b.conversations || 0, y = r.value ? v / r.value * 100 : 0;
          return `${kt(b.agent_type)} - ${v.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((b) => b.conversations || 0),
            backgroundColor: m,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => a.options ? a.options : {
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
            label: (g) => {
              const m = (g.label || "").toString(), p = Number(g.parsed) || 0, h = (g.dataset.data || []).reduce((v, y) => v + (Number(y) || 0), 0), b = h ? p / h * 100 : 0;
              return `${m}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (g, m) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", z_, [
          d("div", N_, [
            l.value ? (f(), x("section", j_, [
              d("div", H_, [
                N(Fn, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (f(), x("section", W_, [
              d("div", K_, [
                d("div", U_, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                m[1] || (m[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), q_ = /* @__PURE__ */ be(Y_, [["__scopeId", "data-v-a909b73c"]]), X_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, G_ = { class: "card-body" }, Z_ = {
  key: 0,
  class: "chart-section"
}, Q_ = { class: "chart-container" }, J_ = {
  key: 1,
  class: "empty-state"
}, e2 = { class: "empty-state-content" }, t2 = { class: "empty-icon-wrapper" }, a2 = /* @__PURE__ */ fe({
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
      const u = new Date(c), g = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${g}`;
    }, i = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, g = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(g).length > 0;
    }), l = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const v = [...c].sort((y, w) => y.date.localeCompare(w.date));
        return {
          labels: v.map((y) => s(y.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((y) => Number(y.value) || 0),
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
      const u = a.costData?.costs_by_day || {}, g = a.conversationData?.conversations_by_day || {}, p = Object.keys(u).filter((v) => g[v]).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((v) => s(v)), b = p.map((v) => {
        const y = u[v]?.total_cost || 0, w = g[v] || 0;
        return w > 0 ? y / w : 0;
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
    }), r = C(() => a.options ? a.options : {
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
              let u = c.dataset.label || "";
              return u && (u += ": "), c.parsed.y !== null && (u += Ie(c.parsed.y)), u;
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
              return Ie(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, u) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        d("div", X_, [
          d("div", G_, [
            i.value ? (f(), x("section", Z_, [
              d("div", Q_, [
                N(mt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (f(), x("section", J_, [
              d("div", e2, [
                d("div", t2, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = d("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                u[1] || (u[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), n2 = /* @__PURE__ */ be(a2, [["__scopeId", "data-v-ae6c48b1"]]), o2 = { class: "tabs text-sm" }, s2 = ["aria-label"], i2 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], l2 = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, r2 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = oe([]), s = `tabs-${We()}`, i = (h) => `${s}-tab-${h}`, l = C(
      () => a.items.map((h, b) => h.disabled ? -1 : b).filter((h) => h >= 0)
    );
    function r(h) {
      return h.value === a.modelValue;
    }
    function c(h) {
      const b = r(h), y = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return h.disabled ? `${y} cursor-not-allowed opacity-40` : b ? `${y} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${y} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(h, b) {
      h === b || a.items.find((y) => y.value === h)?.disabled || (n("update:modelValue", h), n("change", { value: h, previousValue: b }));
    }
    function g(h, b) {
      n("tab-click", { value: h.value, originalEvent: b }), !h.disabled && (u(h.value, a.modelValue), Ke(() => {
        o.value[a.items.indexOf(h)]?.focus();
      }));
    }
    function m(h, b) {
      const v = a.items.length;
      if (v === 0) return 0;
      let y = h;
      for (let w = 0; w < v; w++)
        if (y = (y + b + v) % v, !a.items[y]?.disabled) return y;
      return h;
    }
    async function p(h, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(h.key)) return;
      h.preventDefault();
      let y = b;
      h.key === "ArrowLeft" ? y = m(b, -1) : h.key === "ArrowRight" ? y = m(b, 1) : h.key === "Home" ? y = l.value[0] ?? 0 : h.key === "End" && (y = l.value[l.value.length - 1] ?? b);
      const w = a.items[y];
      !w || w.disabled || (u(w.value, a.modelValue), await Ke(), o.value[y]?.focus());
    }
    return (h, b) => (f(), x("div", o2, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Z([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (f(!0), x(he, null, pe(e.items, (v, y) => (f(), x("button", {
          id: i(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": r(v),
          "aria-disabled": v.disabled === !0,
          tabindex: r(v) ? 0 : -1,
          class: Z(c(v)),
          onClick: (w) => g(v, w),
          onKeydown: (w) => p(w, y)
        }, [
          d("span", {
            class: Z(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (f(), ne(ft(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            d("span", l2, A(v.label), 1)
          ], 2)
        ], 42, i2))), 128))
      ], 10, s2),
      h.$slots.default ? (f(), ne(gt, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: F(() => [
          (f(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(h.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), Ll = /* @__PURE__ */ be(r2, [["__scopeId", "data-v-f9c367eb"]]), c2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, d2 = { class: "card-body" }, u2 = {
  key: 0,
  class: "model-usage-table-block"
}, h2 = { class: "w-full min-w-0" }, f2 = {
  key: 1,
  class: "empty-state"
}, g2 = { class: "empty-state-content" }, m2 = { class: "empty-icon-wrapper" }, p2 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (h) => {
      o("export", h);
    }, { isDark: i } = Me($e(n, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = oe("by_model"), c = C(() => r.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), u = C(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), g = C(
      () => Object.entries(c.value).map(([h, b]) => ({
        id: h,
        name: h,
        avgCost: p(b.avg_cost_per_message),
        avgTokens: m(b.avg_tokens_per_message),
        messageCount: m(b.message_count),
        totalCost: p(b.total_cost),
        totalTokens: m(b.total_tokens)
      }))
    ), m = (h) => h == null ? "0" : me(h), p = (h) => h == null ? "$0.00" : Ie(h);
    return t({ isDark: i }), (h, b) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", c2, [
          d("div", d2, [
            N(Ll, {
              modelValue: r.value,
              "onUpdate:modelValue": b[0] || (b[0] = (v) => r.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: F(() => [
                c.value && Object.keys(c.value).length > 0 ? (f(), x("div", u2, [
                  d("div", h2, [
                    N(pt, {
                      columns: u.value,
                      rows: g.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (f(), x("div", f2, [
                  d("div", g2, [
                    d("div", m2, [
                      N(B(rt), { class: "empty-icon" })
                    ]),
                    b[1] || (b[1] = d("p", { class: "empty-title" }, "No model usage data available", -1)),
                    b[2] || (b[2] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), b2 = /* @__PURE__ */ be(p2, [["__scopeId", "data-v-48a6cc07"]]), v2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, y2 = { class: "card-body" }, x2 = {
  key: 0,
  class: "message-roles-table-block"
}, k2 = { class: "w-full min-w-0" }, _2 = {
  key: 1,
  class: "empty-state"
}, w2 = { class: "empty-state-content" }, C2 = { class: "empty-icon-wrapper" }, $2 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (b) => {
      o("export", b);
    }, { isDark: i } = Me($e(n, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => n.data?.total_by_role || {}), u = C(
      () => l.map((b) => ({
        id: b,
        role: h(b),
        avgCost: p(c.value[b]?.avg_cost_per_message),
        avgTokens: m(c.value[b]?.avg_tokens_per_message),
        messageCount: m(c.value[b]?.message_count),
        totalCost: p(c.value[b]?.total_cost),
        totalTokens: m(c.value[b]?.total_tokens)
      }))
    ), g = C(() => Object.keys(c.value).length > 0), m = (b) => b == null ? "0" : me(b), p = (b) => b == null ? "$0.00" : Ie(b), h = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, v) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", v2, [
          d("div", y2, [
            g.value ? (f(), x("div", x2, [
              d("div", k2, [
                N(pt, {
                  columns: r,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (f(), x("div", _2, [
              d("div", w2, [
                d("div", C2, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = d("p", { class: "empty-title" }, "No message role data available", -1)),
                v[1] || (v[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), S2 = /* @__PURE__ */ be($2, [["__scopeId", "data-v-d38e854e"]]), M2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, D2 = { class: "card-body" }, A2 = {
  key: 0,
  class: "chart-section"
}, T2 = { class: "chart-container" }, B2 = { class: "kpi-grid" }, L2 = {
  key: 1,
  class: "empty-state"
}, R2 = { class: "empty-state-content" }, P2 = { class: "empty-icon-wrapper" }, I2 = 40, E2 = 230, F2 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (_) => {
      o("export", _);
    }, { isDark: i, colors: l } = Me($e(n, "theme")), r = {
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", u = (_) => _.agent_name ? kt(_.agent_name) : kt(c(_)).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), g = (_) => {
      const k = c(_).toLowerCase();
      for (const [$, S] of Object.entries(r))
        if (k.includes($))
          return S;
      return "#9ca3af";
    }, m = C(() => [...n.data?.top_agents || []].sort((k, $) => $.avg_cost_per_conversation - k.avg_cost_per_conversation)), p = C(
      () => Math.max(E2, m.value.length * I2 + 32)
    ), h = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : m.value.reduce((_, k) => _ + k.conversations, 0)), b = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : m.value.reduce((_, k) => _ + k.total_cost, 0)), v = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : h.value === 0 ? 0 : b.value / h.value), y = C(() => {
      const _ = m.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const k = _.map((D) => u(D)), $ = _.map((D) => D.avg_cost_per_conversation), S = _.map((D) => g(D));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: $,
            backgroundColor: S.map((D) => `${D}80`),
            borderColor: S,
            borderWidth: 1
          }
        ]
      };
    }), w = C(() => n.options ? n.options : {
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
            title: function(_) {
              const k = m.value[_[0]?.dataIndex];
              return k ? u(k) : "";
            },
            label: function(_) {
              const k = m.value[_.dataIndex];
              return [
                `Cost: ${Ie(_.parsed.x)}`,
                `Conversations: ${me(k.conversations)}`,
                `Total Cost: ${Ie(k.total_cost)}`
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
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: l.value.textSecondary,
            padding: 8,
            callback: function(_) {
              return Ie(_);
            }
          }
        },
        y: {
          type: "category",
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
    return t({ isDark: i }), (_, k) => (f(), ne(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (f(), ne(B(Ne), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: F(() => [
        d("div", M2, [
          d("div", D2, [
            y.value.labels && y.value.labels.length ? (f(), x("section", A2, [
              d("div", T2, [
                N($t, {
                  data: y.value,
                  options: w.value,
                  "height-px": p.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", B2, [
                N(B(xe), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                N(B(xe), {
                  title: "Total Conversations",
                  value: B(me)(h.value)
                }, null, 8, ["value"]),
                N(B(xe), {
                  title: "Total Cost",
                  value: B(Ie)(b.value)
                }, null, 8, ["value"]),
                N(B(xe), {
                  title: "Avg Cost / Conv.",
                  value: B(Ie)(v.value)
                }, null, 8, ["value"])
              ])
            ])) : (f(), x("section", L2, [
              d("div", R2, [
                d("div", P2, [
                  N(B(rt), { class: "empty-icon" })
                ]),
                k[0] || (k[0] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                k[1] || (k[1] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), O2 = /* @__PURE__ */ be(F2, [["__scopeId", "data-v-2a8f51ca"]]);
function Oo(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function Rl(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, l) => s(i, l, n, o)).map((i) => {
    const l = Oo(i, a);
    return l.length === 0 ? i : {
      ...i,
      [a]: Rl(l, t)
    };
  });
}
function Pl(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((u, g) => {
    const m = l(u, o + g), p = Oo(u, s), h = p.length > 0, b = i.has(m);
    c.push({
      row: u,
      key: m,
      depth: a,
      hasChildren: h,
      isExpanded: b,
      parentKey: n
    }), h && b && (r === void 0 || a < r) && c.push(
      ...Pl(p, t, a + 1, m, 0)
    );
  }), c;
}
function Il(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, l = [];
  return e.forEach((r, c) => {
    const u = s(r, n + c), g = Oo(r, o), m = g.length > 0, p = {
      depth: a,
      isChild: a > 0,
      hasChildren: m
    };
    (i?.(r, p) ?? !0) && l.push(u), g.length > 0 && l.push(
      ...Il(g, t, a + 1, 0)
    );
  }), l;
}
const V2 = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, z2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, N2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, j2 = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, H2 = ["checked", "aria-label"], W2 = ["aria-sort", "onClick"], K2 = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, U2 = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Y2 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, q2 = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, X2 = ["checked", "aria-label", "onChange"], G2 = ["aria-expanded", "aria-label", "onClick"], Z2 = ["aria-expanded", "aria-label", "onClick"], Q2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, J2 = { class: "min-w-0 flex-1" }, ew = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = oe(null), s = oe([...a.defaultExpandedKeys]), i = C({
      get() {
        return a.expandedKeys ?? s.value;
      },
      set(L) {
        s.value = L, n("update:expandedKeys", L);
      }
    }), l = C(
      () => new Set(i.value)
    ), r = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: l.value,
      resolveRowKey: h,
      maxDepth: a.maxDepth
    })), u = C(() => {
      const { sortKey: L, sortDirection: K, sortCompare: Y, rows: z } = a;
      return !L || !K || !Y ? z : a.expandable ? Rl(z, {
        childrenKey: a.childrenKey,
        sortKey: L,
        sortDirection: K,
        compare: Y
      }) : [...z].sort((le, ce) => Y(le, ce, L, K));
    }), g = C(() => a.expandable ? Pl(u.value, c.value) : u.value.map((L, K) => ({
      row: L,
      key: h(L, K),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function m(L) {
      return `cell-${L}`;
    }
    function p(L) {
      return L === "center" ? "text-center" : L === "right" ? "text-right" : "text-left";
    }
    function h(L, K) {
      if (typeof a.rowKey == "function")
        return a.rowKey(L);
      const Y = L[a.rowKey];
      return Y != null ? String(Y) : `__index_${K}`;
    }
    function b(L, K) {
      return L[K];
    }
    function v(L) {
      return L == null || typeof L == "object" ? "" : String(L);
    }
    function y(L) {
      return a.expandable && L === r.value;
    }
    function w(L) {
      return L.hasChildren || (a.isRowExpandable?.(L.row) ?? !1);
    }
    function _(L, K) {
      return {
        row: L.row,
        column: K,
        value: b(L.row, K.key),
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren,
        expanded: L.isExpanded
      };
    }
    function k(L) {
      if (!w(L)) return;
      const K = new Set(i.value);
      K.has(L.key) ? (K.delete(L.key), n("collapse", L.key, L.row)) : (a.singleExpand && K.clear(), K.add(L.key), n("expand", L.key, L.row)), i.value = [...K];
    }
    function $(L) {
      return {
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren
      };
    }
    function S(L, K) {
      return a.isRowSelectable?.(L, K) ?? !0;
    }
    function D(L) {
      return S(L.row, $(L));
    }
    function P(L) {
      return a.selectable && w(L) && !D(L);
    }
    function V(L) {
      return w(L) && !P(L);
    }
    function W(L) {
      return V(L) ? !1 : L.depth > 0 ? !0 : a.selectable && !w(L);
    }
    const M = C(() => {
      const { isRowSelectable: L } = a;
      return a.expandable ? Il(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: h,
        isRowSelectable: L
      }) : u.value.map((K, Y) => ({
        row: K,
        key: h(K, Y),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: K, context: Y }) => S(K, Y)).map(({ key: K }) => K);
    });
    function R(L) {
      const K = String(L);
      return a.selectedKeys.some((Y) => String(Y) === K);
    }
    const T = C(() => !a.selectable || M.value.length === 0 ? !1 : M.value.every(
      (L) => a.selectedKeys.some((K) => String(K) === String(L))
    )), j = C(() => {
      if (!a.selectable || M.value.length === 0) return !1;
      const L = M.value.filter(
        (K) => a.selectedKeys.some((Y) => String(Y) === String(K))
      );
      return L.length > 0 && L.length < M.value.length;
    });
    Te(
      [j, T, () => a.selectable],
      async () => {
        await Ke();
        const L = o.value;
        L && (L.indeterminate = j.value && !T.value);
      },
      { immediate: !0 }
    );
    function H() {
      if (a.selectable)
        if (T.value) {
          const L = new Set(
            M.value.map((Y) => String(Y))
          ), K = a.selectedKeys.filter(
            (Y) => !L.has(String(Y))
          );
          n("update:selectedKeys", K);
        } else {
          const L = new Set(a.selectedKeys.map((K) => String(K)));
          M.value.forEach((K) => L.add(String(K))), n("update:selectedKeys", [...L]);
        }
    }
    function Q(L) {
      if (!a.selectable) return;
      const K = String(L), Y = g.value.find((le) => String(le.key) === K);
      if (Y && !D(Y) || !Y && !M.value.some((le) => String(le) === K))
        return;
      a.selectedKeys.some((le) => String(le) === K) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((le) => String(le) !== K)
      ) : n("update:selectedKeys", [...a.selectedKeys, K]);
    }
    function re(L) {
      return `${a.ariaLabelSelectRow} ${L}`;
    }
    function de(L) {
      n("sort", L);
    }
    function q(L) {
      return a.sortKey === L && a.sortDirection != null;
    }
    function ae(L) {
      return q(L) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, K) => (f(), x("div", V2, [
      d("div", z2, [
        d("table", {
          class: Z([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", N2, [
              e.selectable ? (f(), x("th", j2, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: T.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: H
                }, null, 40, H2)
              ])) : O("", !0),
              (f(!0), x(he, null, pe(e.columns, (Y) => (f(), x("th", {
                key: Y.key,
                scope: "col",
                class: Z([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  y(Y.key) && e.selectable ? "!pl-0" : "",
                  p(Y.align),
                  Y.headerClass ?? ""
                ])
              }, [
                Y.sortable ? (f(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", p(Y.align)]),
                  "aria-sort": ae(Y.key),
                  onClick: (z) => de(Y.key)
                }, [
                  d("span", null, A(Y.label), 1),
                  d("span", K2, [
                    q(Y.key) ? (f(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (f(), x("span", U2, "↑")) : e.sortDirection === "desc" ? (f(), x("span", Y2, "↓")) : O("", !0)
                    ], 64)) : (f(), x(he, { key: 1 }, [
                      K[0] || (K[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      K[1] || (K[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, W2)) : (f(), x(he, { key: 1 }, [
                  Ae(A(Y.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (f(!0), x(he, null, pe(g.value, (Y) => (f(), x("tr", {
              key: Y.key,
              class: Z([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                Y.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (f(), x("td", q2, [
                D(Y) ? (f(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: R(Y.key),
                  "aria-label": re(Y.key),
                  onChange: (z) => Q(Y.key)
                }, null, 40, X2)) : P(Y) ? (f(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": Y.isExpanded,
                  "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Be((z) => k(Y), ["stop"])
                }, [
                  N(B(aa), {
                    class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, G2)) : O("", !0)
              ])) : O("", !0),
              (f(!0), x(he, null, pe(e.columns, (z) => (f(), x("td", {
                key: z.key,
                class: Z([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  y(z.key) ? "pl-0 pr-2" : "px-2",
                  p(z.align),
                  z.cellClass ?? ""
                ])
              }, [
                y(z.key) ? (f(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: Ce({ paddingLeft: `${Y.depth * 1.25}rem` })
                }, [
                  ke(L.$slots, "row-expand", {
                    row: Y.row,
                    expanded: Y.isExpanded,
                    hasChildren: Y.hasChildren,
                    depth: Y.depth,
                    toggle: () => k(Y)
                  }, () => [
                    V(Y) ? (f(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": Y.isExpanded,
                      "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Be((le) => k(Y), ["stop"])
                    }, [
                      N(B(aa), {
                        class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, Z2)) : W(Y) ? (f(), x("span", Q2)) : O("", !0)
                  ], !0),
                  d("div", J2, [
                    ke(L.$slots, m(z.key), yt({ ref_for: !0 }, _(Y, z)), () => [
                      Ae(A(v(b(Y.row, z.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(L.$slots, m(z.key), yt({
                  key: 1,
                  ref_for: !0
                }, _(Y, z)), () => [
                  Ae(A(v(b(Y.row, z.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), tw = /* @__PURE__ */ be(ew, [["__scopeId", "data-v-b3104817"]]), pi = /* @__PURE__ */ fe({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (f(), x("svg", {
      class: Z(["inline-flex shrink-0 animate-spin", a.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...o[0] || (o[0] = [
      d("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), aw = ["disabled", "aria-expanded", "aria-label"], nw = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, ow = { class: "min-w-0 truncate" }, sw = ["disabled", "onClick", "onMouseenter"], iw = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, lw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, rw = { class: "min-w-0 flex-1 text-left" }, cw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, dw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, uw = ["disabled", "aria-expanded", "aria-label"], hw = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, fw = ["disabled", "onClick", "onMouseenter"], gw = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, mw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, pw = { class: "min-w-0 flex-1 text-left" }, bw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, vw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, yw = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, xw = ["type", "disabled", "aria-busy", "aria-label"], kw = {
  key: 2,
  class: "min-w-0 truncate"
}, _w = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, ww = ["type", "disabled", "aria-busy", "aria-label"], Cw = {
  key: 2,
  class: "min-w-0 truncate"
}, Mt = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = Ja(), s = C(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = C(() => a.variant === "dropdown"), l = C(() => a.variant === "split"), r = C(() => a.variant === "action"), c = C(() => !r.value && !l.value), u = C(() => a.disabled || a.loading), g = C(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), m = C(() => {
      const L = o["aria-label"];
      if (typeof L == "string" && L.length > 0) return L;
      if ((r.value || l.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), p = C(() => {
      const L = o.type;
      return L === "submit" || L === "reset" || L === "button" ? L : "button";
    }), h = C(() => {
      const { class: L, type: K, "aria-label": Y, ...z } = o;
      return z;
    }), b = C(() => a.variant === "primary" || a.variant === "dropdown" ? [
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
    ]), v = `kiut-button-menu-${We()}`, y = `${v}-btn`, w = `${v}-menu`, _ = oe(null), k = oe(null), $ = oe(null), S = oe(!1), D = oe(0), P = oe({}), V = C(() => a.options.filter((L) => !L.disabled));
    function W(L) {
      return `${L.value}-${L.label}`;
    }
    function M() {
      const L = k.value;
      if (!L) return;
      const K = L.getBoundingClientRect(), Y = {
        top: `${K.bottom - 3}px`,
        minWidth: `max(${K.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (Y.right = `${window.innerWidth - K.right}px`, Y.left = "auto") : (Y.left = `${K.left}px`, Y.right = "auto"), P.value = Y;
    }
    function R(L) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        D.value === L ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function T() {
      S.value = !1;
    }
    function j() {
      M(), D.value = 0, Ke(() => $.value?.focus());
    }
    function H() {
      if (!a.disabled) {
        if (S.value) {
          T();
          return;
        }
        S.value = !0, j();
      }
    }
    function Q(L) {
      L.disabled || (n("select", L), T());
    }
    function re(L) {
      L.stopPropagation(), H();
    }
    function de(L) {
      if (!S.value) return;
      const K = L.target, Y = _.value, z = $.value;
      Y && !Y.contains(K) && (!z || !z.contains(K)) && T();
    }
    function q(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), S.value || (S.value = !0, j()));
    }
    function ae(L) {
      const K = V.value;
      if (L.key === "Escape") {
        L.preventDefault(), T(), k.value?.focus();
        return;
      }
      if (K.length !== 0) {
        if (L.key === "ArrowDown") {
          L.preventDefault(), D.value = Math.min(D.value + 1, K.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), D.value = Math.max(D.value - 1, 0);
          return;
        }
        if (L.key === "Enter" || L.key === " ") {
          L.preventDefault();
          const Y = K[D.value];
          Y && Q(Y);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", de);
    }), lt(() => {
      document.removeEventListener("click", de);
    }), (L, K) => i.value ? (f(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: k,
        id: y,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": w,
        "aria-label": m.value
      }, h.value, {
        onClick: re,
        onKeydown: q
      }), [
        L.$slots.icon ? (f(), x("span", nw, [
          ke(L.$slots, "icon")
        ])) : O("", !0),
        d("span", ow, [
          ke(L.$slots, "default")
        ]),
        N(B(aa), {
          class: Z(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, aw),
      (f(), ne(Jt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: w,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(P.value),
          onKeydown: Be(ae, ["stop"])
        }, [
          (f(!0), x(he, null, pe(V.value, (Y, z) => (f(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(R(z)),
            onClick: Be((le) => Q(Y), ["stop"]),
            onMouseenter: (le) => D.value = z
          }, [
            Y.icon ? (f(), x("span", iw, [
              (f(), ne(ft(Y.icon), { class: "h-5 w-5" }))
            ])) : (f(), x("span", lw)),
            d("span", rw, [
              d("span", cw, A(Y.label), 1),
              Y.description ? (f(), x("span", dw, A(Y.description), 1)) : O("", !0)
            ])
          ], 42, sw))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : l.value ? (f(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: k,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, B(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": w,
        "aria-label": m.value
      }, h.value, {
        onClick: re,
        onKeydown: q
      }), [
        L.$slots.icon ? (f(), x("span", hw, [
          ke(L.$slots, "icon")
        ])) : O("", !0)
      ], 16, uw),
      (f(), ne(Jt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: w,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(P.value),
          onKeydown: Be(ae, ["stop"])
        }, [
          (f(!0), x(he, null, pe(V.value, (Y, z) => (f(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(R(z)),
            onClick: Be((le) => Q(Y), ["stop"]),
            onMouseenter: (le) => D.value = z
          }, [
            Y.icon ? (f(), x("span", gw, [
              (f(), ne(ft(Y.icon), { class: "h-5 w-5" }))
            ])) : (f(), x("span", mw)),
            d("span", pw, [
              d("span", bw, A(Y.label), 1),
              Y.description ? (f(), x("span", vw, A(Y.description), 1)) : O("", !0)
            ])
          ], 42, fw))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : s.value ? (f(), x("span", yw, [
      d("button", yt({
        type: p.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [g.value, b.value, B(o).class]],
        disabled: u.value,
        "aria-busy": e.loading || void 0,
        "aria-label": m.value
      }, h.value), [
        e.loading ? (f(), ne(pi, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : L.$slots.icon ? (f(), x("span", {
          key: 1,
          class: Z(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(L.$slots, "icon")
        ], 2)) : O("", !0),
        c.value ? (f(), x("span", kw, [
          ke(L.$slots, "default")
        ])) : O("", !0)
      ], 16, xw),
      d("span", _w, A(e.tooltip), 1)
    ])) : (f(), x("button", yt({
      key: 3,
      type: p.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [g.value, b.value, B(o).class]],
      disabled: u.value,
      "aria-busy": e.loading || void 0,
      "aria-label": m.value
    }, h.value), [
      e.loading ? (f(), ne(pi, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : L.$slots.icon ? (f(), x("span", {
        key: 1,
        class: Z(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(L.$slots, "icon")
      ], 2)) : O("", !0),
      c.value ? (f(), x("span", Cw, [
        ke(L.$slots, "default")
      ])) : O("", !0)
    ], 16, ww));
  }
}), $w = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Sw = { class: "sr-only" }, El = /* @__PURE__ */ fe({
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
    return (s, i) => (f(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "data-kiut-toggle-size": e.size,
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: Z([
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        e.size === "sm" ? "h-6 w-11" : "h-8 w-[3.75rem]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        Ca(Be(o, ["prevent", "stop"]), ["space"]),
        Ca(Be(o, ["prevent"]), ["enter"])
      ]
    }, [
      d("span", {
        class: Z(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", Sw, A(e.ariaLabel), 1)
    ], 42, $w));
  }
}), Mw = {
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
}, Dw = [
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
], Z3 = [
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
], Aw = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Tw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Bw = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, Lw = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Rw = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, Pw = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, Iw = ["aria-expanded", "aria-label", "onClick"], Ew = { class: "min-w-0 flex-1" }, Fw = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, Ow = ["colspan"], Vw = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, zw = ["aria-label"], Nw = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, jw = {
  key: 2,
  class: "space-y-2"
}, Hw = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, Ww = ["title"], Kw = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, Uw = { class: "ml-auto flex shrink-0 items-center gap-2" }, Yw = /* @__PURE__ */ fe({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => Dw },
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
    const a = e, n = t, o = oe([...a.defaultExpandedKeys]), s = C({
      get() {
        return a.expandedKeys ?? o.value;
      },
      set(M) {
        o.value = M, n("update:expandedKeys", M);
      }
    }), i = C(() => ({
      ...Mw,
      ...a.labels
    })), l = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), r = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(M) {
      return `cell-${M}`;
    }
    function u(M, R, T) {
      return {
        row: M,
        column: R,
        index: T,
        expanded: b(M, T)
      };
    }
    function g(M) {
      const R = M.key;
      return M.label ? M.label : R in i.value ? i.value[R] : M.key;
    }
    function m(M) {
      return M === "center" ? "text-center" : M === "right" ? "text-right" : "text-left";
    }
    function p(M) {
      return M === l.value;
    }
    function h(M, R) {
      if (typeof a.rowKey == "function")
        return a.rowKey(M);
      const T = M[a.rowKey];
      return T != null ? String(T) : `__index_${R}`;
    }
    function b(M, R) {
      return s.value.includes(h(M, R));
    }
    function v(M) {
      return M.versionsLoading === !0;
    }
    function y(M, R) {
      const T = h(M, R), j = new Set(s.value);
      j.has(T) ? (j.delete(T), n("collapse", T, M)) : (a.singleExpand && j.clear(), j.add(T), n("expand", T, M)), s.value = [...j];
    }
    function w(M) {
      return M.type ?? M.key;
    }
    function _(M) {
      return r[M] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function k(M) {
      return M === "published" ? "success" : "warning";
    }
    function $(M) {
      const R = M instanceof Date ? M : new Date(M);
      return Number.isNaN(R.getTime()) ? String(M) : R.toLocaleDateString("es-ES");
    }
    function S(M) {
      const R = M instanceof Date ? M : new Date(M);
      return Number.isNaN(R.getTime()) ? String(M) : R.toLocaleString("es-ES");
    }
    function D(M) {
      return He("div", { class: "min-w-0" }, [
        He(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          M.name
        ),
        M.description ? He(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          M.description
        ) : null
      ]);
    }
    function P(M) {
      return M.method ? He(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            _(M.method)
          ]
        },
        M.method
      ) : null;
    }
    function V(M, R) {
      const T = R.actions ?? ["view", "edit"], j = [];
      for (const H of T)
        H === "view" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", M)
            },
            { icon: () => He(di, { class: "h-4 w-4" }) }
          )
        ) : H === "run" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", M)
            },
            { icon: () => He(ip, { class: "h-4 w-4" }) }
          )
        ) : H === "edit" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", M)
            },
            { icon: () => He(sp, { class: "h-4 w-4" }) }
          )
        ) : H === "createDraft" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", M)
            },
            { icon: () => He(ci, { class: "h-4 w-4" }) }
          )
        ) : H === "delete" && j.push(
          He(
            Mt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", M)
            },
            { icon: () => He(lp, { class: "h-4 w-4" }) }
          )
        );
      return He(
        "div",
        { class: "flex items-center justify-end gap-1" },
        j
      );
    }
    function W(M, R, T) {
      switch (w(R)) {
        case "name":
          return D(M);
        case "method":
          return P(M);
        case "url":
          return M.url ? He(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: M.url
            },
            M.url
          ) : null;
        case "status":
          return He(
            Ge,
            { color: k(M.status), outlined: !1 },
            () => M.status
          );
        case "version":
          return He("span", {}, M.version);
        case "updated":
          return He(
            "span",
            { class: "whitespace-nowrap text-xs" },
            $(M.updatedAt)
          );
        case "active":
          return He(El, {
            modelValue: M.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (H) => n("toggleActive", M, H)
          });
        case "actions":
          return V(M, R);
        default:
          return He("span", {}, String(M[R.key] ?? ""));
      }
    }
    return (M, R) => (f(), x("div", Aw, [
      d("div", Tw, [
        d("table", Bw, [
          d("thead", null, [
            d("tr", Lw, [
              (f(!0), x(he, null, pe(e.columns, (T) => (f(), x("th", {
                key: T.key,
                scope: "col",
                class: Z([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  m(T.align),
                  T.headerClass ?? ""
                ])
              }, A(g(T)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (f(!0), x(he, null, pe(e.rows, (T, j) => (f(), x(he, {
              key: h(T, j)
            }, [
              d("tr", Rw, [
                (f(!0), x(he, null, pe(e.columns, (H) => (f(), x("td", {
                  key: H.key,
                  class: Z([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    m(H.align),
                    H.cellClass ?? ""
                  ])
                }, [
                  ke(M.$slots, c(H.key), yt({ ref_for: !0 }, u(T, H, j)), () => [
                    p(H.key) ? (f(), x("div", Pw, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": b(T, j),
                        "aria-label": b(T, j) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (Q) => y(T, j)
                      }, [
                        N(B(aa), {
                          class: Z(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !b(T, j) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, Iw),
                      d("div", Ew, [
                        (f(), ne(ft(() => W(T, H))))
                      ])
                    ])) : (f(), ne(ft(() => W(T, H)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              b(T, j) ? (f(), x("tr", Fw, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", Vw, A(i.value.historialTitle), 1),
                  v(T) ? (f(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (f(!0), x(he, null, pe(e.historySkeletonCount, (H) => (f(), x("div", {
                      key: H,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...R[0] || (R[0] = [
                      eo('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, zw)) : T.versions?.length ? (f(), x("div", jw, [
                    (f(!0), x(he, null, pe(T.versions, (H) => (f(), x("div", {
                      key: H.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(M.$slots, "history-item", {
                        version: H,
                        row: T
                      }, () => [
                        N(Ge, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: F(() => [
                            Ae(A(H.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", Hw, A(H.version), 1),
                        H.method ? (f(), x("span", {
                          key: 0,
                          class: Z(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(H.method)])
                        }, A(H.method), 3)) : O("", !0),
                        H.url ? (f(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: H.url
                        }, A(H.url), 9, Ww)) : O("", !0),
                        d("span", Kw, A(S(H.updatedAt)), 1)
                      ], !0),
                      d("div", Uw, [
                        ke(M.$slots, "history-actions", {
                          version: H,
                          row: T
                        }, () => [
                          N(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("viewVersion", H, T)
                          }, {
                            icon: F(() => [
                              N(B(di), { class: "h-4 w-4" })
                            ]),
                            default: F(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          N(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("createDraftFromVersion", H, T)
                          }, {
                            icon: F(() => [
                              N(B(ci), { class: "h-4 w-4" })
                            ]),
                            default: F(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (f(), x("p", Nw, A(i.value.emptyHistory), 1))
                ], 8, Ow)
              ])) : O("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), qw = /* @__PURE__ */ be(Yw, [["__scopeId", "data-v-177ecafb"]]);
function bi(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Xw(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Gw(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Zw(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Qw(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Jw(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function e5(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function t5(e, t) {
  return f(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const a5 = ["aria-label"], n5 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, o5 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, s5 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, i5 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], l5 = { class: "truncate" }, r5 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, c5 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, d5 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, u5 = ["aria-label", "onClick"], h5 = ["aria-label", "onClick"], f5 = ["aria-label"], g5 = ["aria-label"], m5 = {
  key: 1,
  class: "space-y-2"
}, p5 = ["for"], b5 = ["id", "placeholder", "onKeydown"], v5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, y5 = ["aria-label"], x5 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, k5 = ["checked", "onChange"], _5 = { class: "min-w-0 flex-1" }, w5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, C5 = { class: "flex flex-wrap items-end gap-2" }, $5 = { class: "min-w-[120px] flex-1" }, S5 = ["for"], M5 = ["id"], D5 = { class: "min-w-[120px] flex-1" }, A5 = ["for"], T5 = ["id"], B5 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ho(), i = `${`kiut-filters-${We()}`}-panel`, l = oe(null), r = /* @__PURE__ */ new Map(), c = oe(null), u = oe(!1), g = oe({}), m = oe(null), p = oe(""), h = oe([]), b = oe(""), v = oe(""), y = C(() => c.value ? a.filterDefinitions.find((E) => E.id === c.value) ?? null : null), w = C(() => {
      const E = y.value;
      if (E)
        return E.type === "text" ? p.value : E.type === "select" ? h.value : { start: b.value, end: v.value };
    });
    function _(E, J) {
      J && J instanceof HTMLElement ? r.set(E, J) : r.delete(E);
    }
    function k(E) {
      return a.modelValue[E];
    }
    function $(E) {
      if (E == null) return [];
      if (Array.isArray(E))
        return E.filter((J) => typeof J == "string" && J.trim() !== "");
      if (typeof E == "string") {
        const J = E.trim();
        return J ? [J] : [];
      }
      return [];
    }
    function S(E, J) {
      if (J == null) return !0;
      if (E.type === "text") return String(J).trim() === "";
      if (E.type === "select") return $(J).length === 0;
      if (E.type === "dateRange") {
        const se = J;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const D = C(
      () => a.filterDefinitions.some((E) => !S(E, k(E.id)))
    ), P = C(() => {
      const E = [];
      for (const J of a.filterDefinitions) {
        const se = k(J.id);
        if (!S(J, se)) {
          if (J.type === "text")
            E.push({ kind: "text", def: J, key: J.id });
          else if (J.type === "dateRange")
            E.push({ kind: "dateRange", def: J, key: J.id });
          else if (J.type === "select")
            for (const ge of $(se))
              E.push({
                kind: "select",
                def: J,
                optionValue: ge,
                key: `${J.id}::${ge}`
              });
        }
      }
      return E;
    });
    function V(E) {
      return E.type !== "select" ? 0 : $(k(E.id)).length;
    }
    function W(E) {
      const J = k(E.id), se = E.label.replace(/^\+\s*/, "");
      if (E.type === "text") return `${se}: ${String(J ?? "").trim()}`;
      if (E.type === "select") {
        const Pe = $(J).map((qe) => E.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${se}: ${Pe.join(", ")}`;
      }
      const ge = J, we = R(ge.start), _e = R(ge.end);
      return `${se}: ${we} – ${_e}`;
    }
    function M(E) {
      return E.kind === "text" || E.kind === "dateRange" ? W(E.def) : E.def.options.find((se) => se.value === E.optionValue)?.label ?? E.optionValue;
    }
    function R(E) {
      if (!E) return "";
      const J = ze(E, "YYYY-MM-DD", !0);
      return J.isValid() ? J.format("L") : E;
    }
    function T(E) {
      const J = c.value === E.id && u.value, se = !S(E, k(E.id));
      return J || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function j(E) {
      return S(E, k(E.id)) ? ee(E) : `Editar filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    function H(E) {
      const J = k(E.id);
      if (E.type === "text") {
        p.value = J != null ? String(J) : "";
        return;
      }
      if (E.type === "select") {
        h.value = [...$(J)];
        return;
      }
      const se = J;
      b.value = se?.start?.trim() ?? "", v.value = se?.end?.trim() ?? "";
    }
    function Q() {
      const E = y.value;
      if (!E || E.type !== "select") return;
      const J = { ...a.modelValue };
      h.value.length === 0 ? delete J[E.id] : J[E.id] = [...h.value], n("update:modelValue", J), n("change", J);
    }
    function re(E) {
      const J = h.value.indexOf(E);
      J >= 0 ? h.value = h.value.filter((se, ge) => ge !== J) : h.value = [...h.value, E], Q();
    }
    function de(E) {
      if (!E) return;
      m.value = E;
      const J = E.getBoundingClientRect(), se = 300;
      let ge = J.left;
      const we = window.innerWidth - se - 12;
      ge > we && (ge = Math.max(12, we)), ge < 12 && (ge = 12);
      const _e = J.bottom + 8;
      g.value = {
        top: `${_e}px`,
        left: `${ge}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function q(E, J) {
      if (c.value === E.id && u.value) {
        z();
        return;
      }
      u.value && c.value !== E.id && z(), c.value = E.id, u.value = !0, H(E), Ke().then(async () => {
        de(J.currentTarget), await Ke(), L();
      });
    }
    function ae(E, J) {
      if (c.value === E.id && u.value) {
        z();
        return;
      }
      u.value && c.value !== E.id && z(), c.value = E.id, u.value = !0, H(E), Ke().then(async () => {
        const se = r.get(E.id) ?? J.currentTarget;
        de(se), await Ke(), L();
      });
    }
    function L() {
      const E = l.value;
      if (!E) return;
      E.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function K() {
      u.value = !1, c.value = null, m.value = null;
    }
    function Y(E) {
      const J = y.value;
      if (!J) return;
      if (J.type === "text") {
        p.value = E != null ? String(E) : "";
        return;
      }
      if (J.type === "select") {
        h.value = Array.isArray(E) ? E.filter((ge) => typeof ge == "string") : $(E);
        return;
      }
      const se = E;
      b.value = se?.start?.trim() ?? "", v.value = se?.end?.trim() ?? "";
    }
    function z() {
      const E = y.value;
      if (!E) return;
      if (E.type === "text") {
        const we = p.value.trim(), _e = { ...a.modelValue };
        we === "" ? delete _e[E.id] : _e[E.id] = we, n("update:modelValue", _e), n("change", _e), K();
        return;
      }
      if (E.type === "select") {
        Q(), K();
        return;
      }
      const J = b.value.trim(), se = v.value.trim(), ge = { ...a.modelValue };
      !J || !se || J > se ? delete ge[E.id] : ge[E.id] = { start: J, end: se }, n("update:modelValue", ge), n("change", ge), K();
    }
    function le(E) {
      const J = { ...a.modelValue };
      delete J[E], n("update:modelValue", J), n("change", J), c.value === E && K();
    }
    function ce(E) {
      if (E.kind === "text" || E.kind === "dateRange") {
        le(E.def.id);
        return;
      }
      const J = { ...a.modelValue }, ge = $(J[E.def.id]).filter((we) => we !== E.optionValue);
      ge.length === 0 ? delete J[E.def.id] : J[E.def.id] = ge, n("update:modelValue", J), n("change", J), c.value === E.def.id && H(E.def);
    }
    function ve() {
      const E = {};
      n("update:modelValue", E), n("change", E), K();
    }
    const U = C(() => {
      const E = y.value;
      return E ? `Editar filtro: ${E.label}` : "Filtro";
    });
    function ie(E) {
      const J = E.def.label.replace(/^\+\s*/, "");
      return E.kind === "select" ? `Quitar ${E.def.options.find((we) => we.value === E.optionValue)?.label ?? E.optionValue} del filtro ${J}` : `Quitar filtro ${J}`;
    }
    function ue(E) {
      const J = E.def.label.replace(/^\+\s*/, "");
      if (E.kind === "select") {
        const ge = E.def.options.find((we) => we.value === E.optionValue)?.label ?? E.optionValue;
        return `Editar filtro ${J}: ${ge}`;
      }
      return `Editar filtro ${J}`;
    }
    function ee(E) {
      return `Añadir filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    const G = C(() => a.clearLabel);
    function I(E) {
      if (!u.value || !l.value) return;
      const J = E.target;
      if (!(l.value.contains(J) || (J instanceof Element ? J : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ge of r.values())
          if (ge?.contains(J)) return;
        z();
      }
    }
    function X(E) {
      E.key === "Escape" && u.value && (E.preventDefault(), K());
    }
    function te() {
      !u.value || !m.value || de(m.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", I, !0), window.addEventListener("keydown", X, !0), window.addEventListener("resize", te);
    }), _i(() => {
      document.removeEventListener("mousedown", I, !0), window.removeEventListener("keydown", X, !0), window.removeEventListener("resize", te);
    }), Te(
      () => a.modelValue,
      () => {
        const E = y.value;
        E && u.value && !o.panel && H(E);
      },
      { deep: !0 }
    ), (E, J) => (f(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", n5, [
        d("span", o5, A(e.label), 1),
        d("div", s5, [
          (f(!0), x(he, null, pe(e.filterDefinitions, (se) => (f(), x("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (ge) => _(se.id, ge),
            type: "button",
            class: Z(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", T(se)]),
            "aria-label": j(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (ge) => ae(se, ge)
          }, [
            N(B(Qw), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", l5, A(se.label), 1),
            se.type === "select" && V(se) > 0 ? (f(), x("span", r5, A(V(se)), 1)) : O("", !0)
          ], 10, i5))), 128))
        ])
      ]),
      D.value ? (f(), x("div", c5, [
        d("div", d5, [
          (f(!0), x(he, null, pe(P.value, (se) => (f(), x("div", {
            key: se.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ue(se),
              onClick: (ge) => q(se.def, ge)
            }, [
              ke(E.$slots, "formatChip", {
                filter: se.def,
                value: k(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                Ae(A(M(se)), 1)
              ], !0)
            ], 8, u5),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": ie(se),
              onClick: (ge) => ce(se)
            }, [
              N(B(t5), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, h5)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": G.value,
          onClick: ve
        }, A(e.clearLabel), 9, f5)
      ])) : O("", !0),
      (f(), ne(Jt, { to: "body" }, [
        c.value && u.value ? (f(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": U.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Ce(g.value),
          onKeydown: J[3] || (J[3] = Be(() => {
          }, ["stop"]))
        }, [
          y.value ? (f(), x(he, { key: 0 }, [
            E.$slots.panel ? ke(E.$slots, "panel", {
              key: 0,
              filter: y.value,
              close: z,
              value: w.value,
              updateValue: Y
            }, void 0, !0) : (f(), x("div", m5, [
              y.value.type === "text" ? (f(), x(he, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(y.value.label), 9, p5),
                Xe(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": J[0] || (J[0] = (se) => p.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: y.value.placeholder ?? "…",
                  onKeydown: Ca(Be(z, ["prevent"]), ["enter"])
                }, null, 40, b5), [
                  [Rt, p.value]
                ])
              ], 64)) : y.value.type === "select" ? (f(), x(he, { key: 1 }, [
                d("p", v5, A(y.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": y.value.label,
                  "aria-multiselectable": !0
                }, [
                  (f(!0), x(he, null, pe(y.value.options, (se) => (f(), x("li", {
                    key: se.value
                  }, [
                    d("label", x5, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: h.value.includes(se.value),
                        onChange: (ge) => re(se.value)
                      }, null, 40, k5),
                      d("span", _5, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, y5)
              ], 64)) : y.value.type === "dateRange" ? (f(), x(he, { key: 2 }, [
                d("p", w5, A(y.value.label), 1),
                d("div", C5, [
                  d("div", $5, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, S5),
                    Xe(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": J[1] || (J[1] = (se) => b.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, M5), [
                      [Rt, b.value]
                    ])
                  ]),
                  d("div", D5, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, A5),
                    Xe(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": J[2] || (J[2] = (se) => v.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, T5), [
                      [Rt, v.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, g5)) : O("", !0)
      ]))
    ], 8, a5));
  }
}), L5 = /* @__PURE__ */ be(B5, [["__scopeId", "data-v-f38e0100"]]), R5 = { class: "font-sans" }, P5 = ["for"], I5 = { class: "relative" }, E5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], F5 = ["id"], Fl = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-text-${We()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = oe(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (y) => {
        u.value = y ?? "";
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), lt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const g = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? u.value : u.value), m = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function p(y) {
      const w = y.target.value;
      u.value = w, n("update:modelValue", w);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(y);
    }
    function h(y) {
      const w = s?.fields?.[c.value]?.props;
      w?.onChange && w.onChange(y);
    }
    function b(y) {
      const w = s?.fields?.[c.value]?.props;
      w?.onBlur && w.onBlur(y);
    }
    const v = C(() => {
      const { name: y, id: w, type: _, ...k } = o;
      return k;
    });
    return (y, w) => (f(), x("div", R5, [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: Z(B(ct))
      }, A(e.label), 11, P5)) : O("", !0),
      d("div", I5, [
        e.icon ? (f(), ne(ft(e.icon), {
          key: 0,
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        })) : O("", !0),
        d("input", yt(v.value, {
          id: l.value,
          name: c.value,
          type: e.type,
          autocomplete: "off",
          class: [
            B(et),
            e.icon ? "pl-10" : "",
            m.value ? B(Dt) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: g.value,
          "aria-invalid": m.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: p,
          onChange: h,
          onBlur: b
        }), null, 16, E5)
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, F5)) : O("", !0)
    ]));
  }
}), O5 = { class: "font-sans" }, V5 = ["for"], z5 = { class: "relative" }, N5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], j5 = ["aria-label"], H5 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, W5 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, K5 = ["id"], U5 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-password-${We()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = oe(!1), g = oe(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (w) => {
        w !== void 0 && w !== g.value && (g.value = w);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), lt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const m = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? g.value : g.value), p = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function h(w) {
      const _ = w.target.value;
      g.value = _, n("update:modelValue", _);
      const k = s?.fields?.[c.value]?.props;
      k?.onInput && k.onInput(w);
    }
    function b(w) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(w);
    }
    function v(w) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(w);
    }
    const y = C(() => {
      const { name: w, id: _, ...k } = o;
      return k;
    });
    return (w, _) => (f(), x("div", O5, [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: Z(B(ct))
      }, A(e.label), 11, V5)) : O("", !0),
      d("div", z5, [
        d("input", yt(y.value, {
          id: l.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [B(et), p.value ? B(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": p.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: h,
          onChange: b,
          onBlur: v
        }), null, 16, N5),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (k) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (f(), x("svg", W5, [..._[2] || (_[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (f(), x("svg", H5, [..._[1] || (_[1] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            }, null, -1),
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, null, -1)
          ])]))
        ], 8, j5)
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, K5)) : O("", !0)
    ]));
  }
}), Y5 = { class: "font-sans" }, q5 = ["for"], X5 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], G5 = ["id"], Z5 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-textarea-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C({
      get: () => a.modelValue,
      set: (r) => n("update:modelValue", r)
    });
    return (r, c) => (f(), x("div", Y5, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: Z(B(ct))
      }, A(e.label), 11, q5)) : O("", !0),
      Xe(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: Z([B(_b), e.invalid ? B(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, X5), [
        [Rt, l.value]
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, G5)) : O("", !0)
    ]));
  }
}), Q5 = { class: "font-sans" }, J5 = ["for"], eC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], tC = ["for"], aC = ["title"], nC = ["aria-label"], oC = {
  key: 2,
  class: "space-y-3"
}, sC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], iC = ["for"], lC = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, rC = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, cC = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, dC = { class: "flex items-start gap-2" }, uC = { class: "min-w-0 flex-1 space-y-2" }, hC = { class: "flex items-center gap-2" }, fC = ["title"], gC = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, mC = ["aria-label", "onClick"], pC = ["id"], bC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-file-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = oe(null), r = C(
      () => a.multiple ? null : a.modelValue
    ), c = C(() => {
      if (!a.multiple) return [];
      const D = a.modelValue;
      return Array.isArray(D) ? D : [];
    }), u = C(
      () => r.value?.name ?? a.placeholder
    ), g = C(
      () => a.multiple && c.value.length >= a.maxFiles
    ), m = C(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function p(D) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && D.description.trim() === "";
    }
    function h(D) {
      return D < 1024 ? `${D} B` : D < 1024 * 1024 ? `${(D / 1024).toFixed(1)} KB` : `${(D / (1024 * 1024)).toFixed(1)} MB`;
    }
    function b(D) {
      return {
        id: `file-${We()}`,
        file: D,
        description: ""
      };
    }
    function v(D, P) {
      return D.some(
        (V) => V.file.name === P.name && V.file.size === P.size && V.file.lastModified === P.lastModified
      );
    }
    function y() {
      l.value && (l.value.value = "");
    }
    function w(D) {
      const V = D.target.files?.[0] ?? null;
      n("update:modelValue", V);
    }
    function _(D) {
      const P = D.target, V = Array.from(P.files ?? []);
      if (V.length === 0) return;
      const W = [...c.value];
      for (const M of V) {
        if (W.length >= a.maxFiles) break;
        v(W, M) || W.push(b(M));
      }
      n("update:modelValue", W), y();
    }
    function k() {
      n("update:modelValue", null), y();
    }
    function $(D) {
      n(
        "update:modelValue",
        c.value.filter((P) => P.id !== D)
      );
    }
    function S(D, P) {
      n(
        "update:modelValue",
        c.value.map(
          (V) => V.id === D ? { ...V, description: P } : V
        )
      );
    }
    return (D, P) => (f(), x("div", Q5, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: Z(B(ct))
      }, A(e.label), 11, J5)) : O("", !0),
      e.multiple ? (f(), x("div", oC, [
        d("div", {
          class: Z([
            B(et),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? B(Dt) : "",
            e.disabled ? "pointer-events-none" : ""
          ])
        }, [
          d("input", {
            id: s.value,
            ref_key: "fileInputRef",
            ref: l,
            type: "file",
            multiple: "",
            class: "sr-only focus:outline-none focus:ring-0",
            name: e.name,
            accept: e.accept,
            disabled: e.disabled || g.value,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0,
            onChange: _
          }, null, 40, sC),
          d("label", {
            for: s.value,
            class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || g.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            N(B(ro), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, iC),
          d("span", lC, A(m.value), 1),
          e.filesCountLabel ? (f(), x("span", rC, A(e.filesCountLabel), 1)) : O("", !0)
        ], 2),
        c.value.length > 0 ? (f(), x("ul", cC, [
          (f(!0), x(he, null, pe(c.value, (V) => (f(), x("li", {
            key: V.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", dC, [
              N(B(np), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", uC, [
                d("div", hC, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: V.file.name
                  }, A(V.file.name), 9, fC),
                  d("span", gC, A(h(V.file.size)), 1),
                  e.disabled ? O("", !0) : (f(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (W) => $(V.id)
                  }, [
                    N(B(co), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, mC))
                ]),
                e.showDescriptions ? (f(), ne(Fl, {
                  key: 0,
                  "model-value": V.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: p(V),
                  "error-text": p(V) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (W) => S(V.id, W)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : O("", !0)
              ])
            ])
          ]))), 128))
        ])) : O("", !0)
      ])) : (f(), x("div", {
        key: 1,
        class: Z([
          B(et),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? B(Dt) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        d("input", {
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
          onChange: w
        }, null, 40, eC),
        d("label", {
          for: s.value,
          class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(B(ro), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, tC),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, aC),
        r.value && !e.disabled ? (f(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: k
        }, [
          N(B(co), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, nC)) : O("", !0)
      ], 2)),
      e.errorText ? (f(), x("p", {
        key: 3,
        id: i.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, pC)) : O("", !0)
    ]));
  }
}), vC = ["for"], yC = { class: "flex w-full min-w-0 items-center gap-3" }, xC = ["for", "aria-label"], kC = ["src"], _C = ["id", "accept", "disabled"], wC = ["id", "value", "placeholder", "disabled"], CC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = oe(!1), s = oe(null), i = `kiut-image-upload-circle-${We()}`, l = C(() => a.id ?? i), r = C(() => `${l.value}-url`), c = C(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), u = C(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), g = C(() => !a.disabled && !a.loading);
    Te(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function m(h) {
      const b = h.target, v = b.files?.[0];
      v && n("select", v), b.value = "";
    }
    function p(h) {
      n("update:modelValue", h.target.value);
    }
    return (h, b) => (f(), x("div", yt({ class: "font-sans flex w-full flex-col gap-2" }, h.$attrs), [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: Z(B(ct))
      }, A(e.label), 11, vC)) : O("", !0),
      d("div", yC, [
        d("label", {
          for: l.value,
          class: Z(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            g.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (f(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: b[0] || (b[0] = (v) => o.value = !0)
          }, null, 40, kC)) : e.loading ? (f(), ne(B(ep), {
            key: 1,
            class: Z([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (f(), ne(B(ro), {
            key: 2,
            class: Z([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, xC),
        d("input", {
          id: l.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: m
        }, null, 40, _C),
        e.showUrlInput ? (f(), x("div", {
          key: 0,
          class: Z(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          d("input", {
            id: r.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: Z([B(et), "w-full min-w-0"]),
            onInput: p
          }, null, 42, wC)
        ], 2)) : O("", !0)
      ])
    ], 16));
  }
}), $C = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, SC = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, MC = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, DC = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, AC = {
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
}, TC = {
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
}, BC = [
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
function LC(e = "en") {
  return $C[e];
}
function RC(e = "en") {
  return SC[e];
}
function Ol(e = "en") {
  return BC.map((t) => ({ id: t, label: TC[e][t] }));
}
function PC(e = "en") {
  return "Presets";
}
Ol("es");
function at(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function nt(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function Ve(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function _t(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Ma(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function IC(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Ea(e, t) {
  return IC(e, -t);
}
function EC(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Vl(e, t = /* @__PURE__ */ new Date()) {
  const a = Ve(t);
  switch (e) {
    case "today":
      return { start: a, end: a };
    case "yesterday": {
      const n = Ea(a, 1);
      return { start: n, end: n };
    }
    case "last7":
      return { start: Ea(a, 6), end: a };
    case "last14":
      return { start: Ea(a, 13), end: a };
    case "last30":
      return { start: Ea(a, 29), end: a };
    case "last90":
      return { start: Ea(a, 89), end: a };
    case "thisMonth":
      return { start: _t(a), end: a };
    case "lastMonth": {
      const n = _t(Ma(a, -1));
      return { start: n, end: EC(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function zl(e, t, a) {
  let n = Ve(e.start), o = Ve(e.end);
  if (t) {
    const s = Ve(at(t));
    jt(n, s) && (n = s), jt(o, s) && (o = s);
  }
  if (a) {
    const s = Ve(at(a));
    wn(n, s) && (n = s), wn(o, s) && (o = s);
  }
  return wn(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function FC(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = zl(Vl(t, a), n, o);
  return nt(s.start) === e.start && nt(s.end) === e.end;
}
function tn(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < n ? -1 : a > n ? 1 : 0;
}
function bt(e, t) {
  return tn(e, t) === 0;
}
function jt(e, t) {
  return tn(e, t) < 0;
}
function wn(e, t) {
  return tn(e, t) > 0;
}
function Nl(e, t) {
  return tn(e, t) >= 0;
}
function jl(e, t) {
  return tn(e, t) <= 0;
}
function Hl(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function OC(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ka(e) {
  if (!e?.trim()) return null;
  const t = MC.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), l = new Date(a, n - 1, o, s, i);
  return Number.isNaN(l.getTime()) ? null : l;
}
function VC(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function zC(e) {
  const t = ka(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function NC(e, t = "es") {
  const a = ka(e);
  if (!a) return "";
  const n = new Intl.DateTimeFormat(t, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(a), o = new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  }).format(a);
  return `${n} · ${o}`;
}
function vi(e, t) {
  return e.getTime() < t.getTime();
}
function yi(e, t) {
  return e.getTime() > t.getTime();
}
function Ln(e, t = "en") {
  return `${DC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Nt(e, t = "en") {
  return `${AC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const jC = ["name", "value"], HC = { class: "flex flex-row gap-3 items-center" }, WC = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, KC = ["for"], UC = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], YC = ["aria-label", "onKeydown"], qC = { class: "p-3" }, XC = { class: "mb-4 flex items-center justify-between gap-2" }, GC = ["aria-label"], ZC = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, QC = ["aria-label"], JC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, e$ = { class: "grid grid-cols-7 gap-y-2" }, t$ = ["disabled", "onClick"], a$ = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, n$ = { class: "relative" }, o$ = ["value", "disabled", "min", "max", "step", "aria-label"], s$ = /* @__PURE__ */ fe({
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
    placeholder: { default: "Seleccionar…" },
    locale: { default: "es" },
    min: {},
    max: {},
    step: { default: 60 },
    panelAlign: { default: "start" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-input-datetime-${We()}`, s = `${o}-label`, i = C(() => a.id ?? `${o}-btn`), l = `${o}-panel`, r = `${o}-err`, c = oe(null), u = oe(null), g = oe(null), m = oe(!1), p = oe(_t(/* @__PURE__ */ new Date())), h = oe(null), b = oe("00:00"), v = C(() => !!a.modelValue), y = C(() => RC(a.locale)), w = C(() => OC(p.value)), _ = C(() => a.placeholder), k = C(() => a.modelValue ? NC(a.modelValue, a.locale) : a.placeholder), $ = C(() => {
      const U = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${U}` : `left-0 right-auto ${U}`;
    }), S = C(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), D = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), P = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), V = C(
      () => a.locale === "es" ? "Hora" : "Time"
    ), W = C(() => ka(a.min)), M = C(() => ka(a.max)), R = C(() => {
      if (!(!h.value || !W.value) && bt(h.value, W.value))
        return `${String(W.value.getHours()).padStart(2, "0")}:${String(W.value.getMinutes()).padStart(2, "0")}`;
    }), T = C(() => {
      if (!(!h.value || !M.value) && bt(h.value, M.value))
        return `${String(M.value.getHours()).padStart(2, "0")}:${String(M.value.getMinutes()).padStart(2, "0")}`;
    });
    function j(U, ie) {
      return U.getMonth() === ie.getMonth() && U.getFullYear() === ie.getFullYear();
    }
    function H(U) {
      const ie = Ve(U);
      return !!(W.value && jt(ie, Ve(W.value)) || M.value && wn(ie, Ve(M.value)));
    }
    function Q(U) {
      const ie = j(U, p.value), ue = H(U), ee = h.value ? bt(U, h.value) : !1;
      if (ue)
        return "rounded-lg text-[#61616b] opacity-40";
      let G = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return ee && (G = "rounded-lg bg-[#895af6] font-semibold text-white"), ie || (G = `${G} opacity-30`), G;
    }
    function re() {
      const U = ka(a.modelValue);
      if (U) {
        h.value = Ve(U), b.value = zC(a.modelValue), p.value = _t(U);
        return;
      }
      h.value = null, b.value = "00:00", p.value = _t(/* @__PURE__ */ new Date());
    }
    function de(U) {
      if (!h.value) return U;
      let ie = ka(
        `${nt(h.value)}T${U}`
      );
      return ie ? (W.value && bt(h.value, W.value) && vi(ie, W.value) && (ie = W.value), M.value && bt(h.value, M.value) && yi(ie, M.value) && (ie = M.value), `${String(ie.getHours()).padStart(2, "0")}:${String(ie.getMinutes()).padStart(2, "0")}`) : U;
    }
    function q() {
      if (!h.value) {
        n("update:modelValue", null);
        return;
      }
      const U = de(b.value);
      b.value = U;
      const ie = new Date(
        h.value.getFullYear(),
        h.value.getMonth(),
        h.value.getDate(),
        Number(U.slice(0, 2)),
        Number(U.slice(3, 5))
      ), ue = VC(ie);
      W.value && vi(ie, W.value) || M.value && yi(ie, M.value) || n("update:modelValue", ue);
    }
    function ae(U) {
      H(U) || (h.value = Ve(U), b.value = de(b.value), q());
    }
    function L(U) {
      const ie = U.target.value;
      ie && (b.value = ie, q());
    }
    function K(U) {
      p.value = Ma(p.value, U);
    }
    function Y() {
      m.value = !1;
    }
    function z() {
      a.disabled || (re(), m.value = !0, Ke(() => g.value?.focus()));
    }
    function le(U) {
      if (U.stopPropagation(), !a.disabled) {
        if (m.value) {
          Y();
          return;
        }
        z();
      }
    }
    function ce(U) {
      a.disabled || (U.key === "ArrowDown" || U.key === "Enter" || U.key === " ") && (U.preventDefault(), m.value || z());
    }
    function ve(U) {
      if (!m.value) return;
      const ie = c.value;
      ie && !ie.contains(U.target) && Y();
    }
    return Te(
      () => a.modelValue,
      () => {
        m.value || re();
      }
    ), Je(() => {
      re(), document.addEventListener("click", ve);
    }), lt(() => {
      document.removeEventListener("click", ve);
    }), (U, ie) => (f(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (f(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, jC)) : O("", !0),
      d("div", HC, [
        U.$slots.icon ? (f(), x("span", WC, [
          ke(U.$slots, "icon")
        ])) : O("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: Z(B(ct))
        }, A(e.label), 11, KC)) : O("", !0)
      ]),
      d("button", {
        id: i.value,
        ref_key: "buttonRef",
        ref: u,
        type: "button",
        disabled: e.disabled,
        class: Z([
          B(et),
          "flex w-full items-center gap-2 text-left",
          e.invalid ? B(Dt) : "",
          m.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "dialog",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : _.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: le,
        onKeydown: ce
      }, [
        N(B(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            v.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(k.value), 3)
      ], 42, UC),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 3)) : O("", !0),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: g,
        id: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": S.value,
        class: Z([
          $.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(Y, ["stop"]), ["escape"])
      }, [
        d("div", qC, [
          d("div", XC, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": D.value,
              onClick: ie[0] || (ie[0] = Be((ue) => K(-1), ["stop"]))
            }, [
              N(B(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, GC),
            d("span", ZC, A(B(Nt)(p.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": P.value,
              onClick: ie[1] || (ie[1] = Be((ue) => K(1), ["stop"]))
            }, [
              N(B(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, QC)
          ]),
          d("div", JC, [
            (f(!0), x(he, null, pe(y.value, (ue) => (f(), x("span", { key: ue }, A(ue), 1))), 128))
          ]),
          d("div", e$, [
            (f(!0), x(he, null, pe(w.value, (ue) => (f(), x("button", {
              key: B(nt)(ue),
              type: "button",
              disabled: H(ue),
              class: Z(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", Q(ue)]),
              onClick: Be((ee) => ae(ue), ["stop"])
            }, A(ue.getDate()), 11, t$))), 128))
          ])
        ]),
        d("div", a$, [
          d("div", n$, [
            N(B(xl), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: b.value,
              type: "time",
              autocomplete: "off",
              class: Z([B(et), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !h.value,
              min: R.value,
              max: T.value,
              step: e.step,
              "aria-label": V.value,
              onInput: L,
              onClick: ie[2] || (ie[2] = Be(() => {
              }, ["stop"]))
            }, null, 42, o$)
          ])
        ])
      ], 42, YC), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), i$ = { class: "font-sans" }, l$ = { class: "flex flex-row gap-3 items-center" }, r$ = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, c$ = ["for"], d$ = { class: "relative" }, u$ = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], h$ = ["id"], f$ = /* @__PURE__ */ fe({
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
    function a(g) {
      const m = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(g.trim());
      if (!m) return null;
      const p = Number(m[1]), h = Number(m[2]);
      return !Number.isInteger(p) || !Number.isInteger(h) || p < 0 || p > 23 || h < 0 || h > 59 ? null : `${String(p).padStart(2, "0")}:${String(h).padStart(2, "0")}`;
    }
    function n(g) {
      return g === "" ? null : a(g);
    }
    const o = e, s = t, i = `kiut-input-time-${We()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(g) {
      const m = g.target.value;
      s("update:modelValue", n(m));
    }
    return (g, m) => (f(), x("div", i$, [
      d("div", l$, [
        g.$slots.icon ? (f(), x("span", r$, [
          ke(g.$slots, "icon")
        ])) : O("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          for: l.value,
          class: Z(B(ct))
        }, A(e.label), 11, c$)) : O("", !0)
      ]),
      d("div", d$, [
        N(B(xl), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Z([
            B(et),
            "pl-10",
            e.invalid ? B(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: u
        }, null, 42, u$)
      ]),
      e.errorText ? (f(), x("p", {
        key: 0,
        id: r.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, h$)) : O("", !0)
    ]));
  }
}), g$ = { class: "font-sans" }, m$ = ["for"], p$ = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, b$ = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], v$ = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, y$ = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, x$ = { class: "min-w-0 text-left leading-snug" }, k$ = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, _$ = { class: "min-w-0 text-right leading-snug" }, w$ = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, C$ = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, $$ = ["id"], S$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-range-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      const p = [];
      return a.errorText && p.push(i.value), p.length ? p.join(" ") : void 0;
    }), r = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: p, max: h, modelValue: b } = a;
      if (h === p) return 0;
      const v = (b - p) / (h - p);
      return Math.min(100, Math.max(0, v * 100));
    }), g = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function m(p) {
      const h = Number(p.target.value);
      n("update:modelValue", Number.isNaN(h) ? a.min : h);
    }
    return (p, h) => (f(), x("div", g$, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: Z(B(ct))
      }, A(e.label), 11, m$)) : O("", !0),
      d("div", {
        class: Z(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (f(), x("p", p$, A(e.captionMax), 1)) : O("", !0),
        d("div", {
          class: Z(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: Ce(g.value)
        }, [
          d("input", {
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
            class: Z([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: m
          }, null, 42, b$)
        ], 6),
        e.orientation === "horizontal" && r.value ? (f(), x("p", v$, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (f(), x("div", y$, [
          d("span", x$, A(e.captionMin), 1),
          d("span", k$, A(e.caption), 1),
          d("span", _$, A(e.captionMax), 1)
        ])) : O("", !0),
        e.orientation === "vertical" && e.captionMin ? (f(), x("p", w$, A(e.captionMin), 1)) : O("", !0),
        e.orientation === "vertical" && e.caption ? (f(), x("p", C$, A(e.caption), 1)) : O("", !0)
      ], 2),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, $$)) : O("", !0)
    ]));
  }
}), M$ = /* @__PURE__ */ be(S$, [["__scopeId", "data-v-ce7263e4"]]), D$ = { class: "font-sans" }, A$ = ["for"], T$ = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], B$ = ["id"], L$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-number-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = C(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(u) {
      const g = u.target.value;
      if (g === "") {
        n("update:modelValue", null);
        return;
      }
      const m = Number(g);
      n("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (u, g) => (f(), x("div", D$, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: Z(B(ct))
      }, A(e.label), 11, A$)) : O("", !0),
      d("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: Z([
          B(et),
          e.invalid ? B(Dt) : "",
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
      }, null, 42, T$),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, B$)) : O("", !0)
    ]));
  }
}), R$ = { class: "font-sans" }, P$ = ["for"], I$ = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], E$ = ["disabled"], F$ = ["id"], O$ = "#3b82f6", V$ = "#aabbcc", z$ = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", N$ = /* @__PURE__ */ fe({
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
      const b = h.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (v) return `#${v[1].toLowerCase()}`;
      const y = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (y) {
        const [w, _, k] = y[1].split("");
        return `#${w}${w}${_}${_}${k}${k}`.toLowerCase();
      }
      return null;
    }
    function n(h) {
      return a(h) ?? O$;
    }
    const o = e, s = t, i = `kiut-input-color-${We()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n(o.modelValue)), u = oe(c.value), g = oe(!1);
    Te(c, (h) => {
      g.value || (u.value = h);
    });
    function m(h) {
      const b = h.target, v = a(b.value);
      v && s("update:modelValue", v);
    }
    function p() {
      g.value = !1;
      const h = a(u.value);
      h ? (u.value = h, s("update:modelValue", h)) : u.value = c.value;
    }
    return Te(u, (h) => {
      if (!g.value) return;
      const b = a(h);
      b && s("update:modelValue", b);
    }), (h, b) => (f(), x("div", R$, [
      e.label ? (f(), x("label", {
        key: 0,
        for: l.value,
        class: Z(B(ct))
      }, A(e.label), 11, P$)) : O("", !0),
      d("div", {
        class: Z([
          z$,
          e.invalid ? B(Dt) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        d("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: m
        }, null, 40, I$),
        e.showHexInput ? Xe((f(), x("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (v) => u.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: V$,
          onFocus: b[1] || (b[1] = (v) => g.value = !0),
          onBlur: p
        }, null, 40, E$)), [
          [Rt, u.value]
        ]) : O("", !0)
      ], 2),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: r.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, F$)) : O("", !0)
    ]));
  }
}), Wl = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, Kl = [
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
function j$(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function H$(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (l) => s || j$(l, n)
    ).map((l) => l.char);
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
function Q3(e) {
  const t = {
    ...Wl,
    ...e
  };
  return Kl.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function W$(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function K$(e, t) {
  return `${e}${t}`;
}
const U$ = ["disabled", "aria-expanded", "aria-label"], Y$ = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, q$ = {
  key: 0,
  class: "truncate text-sm"
}, X$ = ["aria-label"], G$ = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, Z$ = ["disabled", "placeholder", "aria-label"], Q$ = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, J$ = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, e4 = { class: "grid grid-cols-8 gap-0.5" }, t4 = ["disabled", "aria-label", "onClick"], a4 = { class: "text-[1.35rem] leading-none" }, n4 = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, o4 = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, s4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-emoji-picker-${We()}`, s = `${o}-btn`, i = `${o}-panel`, l = oe(null), r = oe(null), c = oe(null), u = oe(null), g = oe(!1), m = oe(""), p = oe({}), h = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), b = C(() => ({
      ...Wl,
      ...a.categoryLabels
    })), v = C(() => new Set(W$(a.draft))), y = C(() => {
      if (a.categories?.length) {
        const T = m.value.trim().toLowerCase();
        return T ? a.categories.map((j) => ({
          ...j,
          emojis: j.emojis.filter((H) => H.includes(T) || j.label.toLowerCase().includes(T) ? !0 : j.id.toLowerCase().includes(T))
        })).filter((j) => j.emojis.length > 0) : a.categories;
      }
      return H$(
        Kl,
        b.value,
        m.value
      );
    });
    function w() {
      const T = r.value;
      if (!T) return;
      const j = T.getBoundingClientRect(), H = 320, Q = 8, re = 8;
      let de = j.right - H;
      de < re && (de = j.left), de + H > window.innerWidth - re && (de = Math.max(re, window.innerWidth - H - re));
      const q = Math.max(160, j.top - Q - re);
      p.value = {
        bottom: `${window.innerHeight - j.top + Q}px`,
        left: `${de}px`,
        width: `${H}px`,
        maxHeight: `${q}px`
      };
    }
    function _(T) {
      const j = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return v.value.has(T) ? `${j} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : j;
    }
    function k(T) {
      if (a.disabled) return;
      const j = K$(a.draft ?? "", T);
      n("update:draft", j), n("select", T);
    }
    function $() {
      m.value = "", n("open"), Ke(() => {
        w(), u.value?.focus();
      });
    }
    function S() {
      g.value && (g.value = !1, m.value = "", n("close"), r.value?.focus());
    }
    function D() {
      if (!a.disabled) {
        if (g.value) {
          S();
          return;
        }
        g.value = !0, $();
      }
    }
    function P(T) {
      T.stopPropagation(), D();
    }
    function V(T) {
      if (!g.value) return;
      const j = T.target, H = l.value, Q = c.value;
      H && !H.contains(j) && (!Q || !Q.contains(j)) && S();
    }
    function W(T) {
      a.disabled || ((T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), g.value || (g.value = !0, $())), T.key === "Escape" && g.value && (T.preventDefault(), S()));
    }
    function M(T) {
      T.key === "Escape" && (T.preventDefault(), S());
    }
    function R() {
      g.value && w();
    }
    return Je(() => {
      document.addEventListener("click", V), window.addEventListener("resize", R), window.addEventListener("scroll", R, !0);
    }), lt(() => {
      document.removeEventListener("click", V), window.removeEventListener("resize", R), window.removeEventListener("scroll", R, !0);
    }), (T, j) => (f(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: r,
        id: s,
        type: "button",
        disabled: e.disabled,
        class: Z([
          B(et),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          g.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": g.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": h.value,
        onClick: P,
        onKeydown: W
      }, [
        d("span", Y$, [
          ke(T.$slots, "icon", {}, () => [
            N(B(op), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (f(), x("span", q$, A(e.triggerLabel), 1)) : O("", !0),
        e.triggerLabel ? (f(), ne(B(aa), {
          key: 1,
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", g.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : O("", !0)
      ], 42, U$),
      (f(), ne(Jt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: Ce(p.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: j[2] || (j[2] = Be(() => {
          }, ["stop"])),
          onKeydown: Be(M, ["stop"])
        }, [
          d("div", G$, [
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": j[0] || (j[0] = (H) => m.value = H),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: j[1] || (j[1] = Be(() => {
              }, ["stop"]))
            }, null, 8, Z$), [
              [Rt, m.value]
            ])
          ]),
          d("div", Q$, [
            y.value.length > 0 ? (f(!0), x(he, { key: 0 }, pe(y.value, (H) => (f(), x("section", {
              key: H.id
            }, [
              d("h3", J$, A(H.label), 1),
              d("div", e4, [
                (f(!0), x(he, null, pe(H.emojis, (Q) => (f(), x("button", {
                  key: `${H.id}-${Q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${Q} to input`,
                  class: Z(_(Q)),
                  onClick: Be((re) => k(Q), ["stop"])
                }, [
                  d("span", a4, A(Q), 1)
                ], 10, t4))), 128))
              ])
            ]))), 128)) : (f(), x("p", n4, A(e.emptySearchText), 1))
          ]),
          e.hint ? (f(), x("p", o4, A(e.hint), 1)) : O("", !0)
        ], 44, X$), [
          [Ht, g.value]
        ])
      ]))
    ], 512));
  }
}), i4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = C(
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
    return (i, l) => (f(), ne(Kt, {
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
}), l4 = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, r4 = { class: "relative" }, c4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, d4 = ["placeholder", "aria-label", "disabled"], u4 = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, h4 = ["aria-label"], f4 = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, g4 = ["aria-selected", "onClick", "onMouseenter"], m4 = { class: "min-w-0 flex-1 truncate" }, p4 = /* @__PURE__ */ fe({
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
    const n = e, o = a, i = `${`kiut-language-picker-${We()}`}-listbox`, l = oe(null), r = oe(null), c = oe(""), u = oe(0), g = C(() => n.options.filter((k) => !k.disabled)), m = C(() => {
      const k = c.value.trim().toLowerCase();
      return k ? g.value.filter(($) => $.label.toLowerCase().includes(k)) : g.value;
    });
    function p(k) {
      return `${k.value}-${k.label}`;
    }
    function h(k) {
      return n.modelValue === k.value;
    }
    function b(k, $) {
      const S = h(k), D = u.value === $;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        S ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !S && D ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function v() {
      u.value = Math.max(
        0,
        m.value.findIndex((k) => k.value === n.modelValue)
      );
    }
    function y(k) {
      k.disabled || o("update:modelValue", k.value);
    }
    function w(k) {
      const $ = m.value;
      if (k.key === "ArrowDown") {
        if (k.preventDefault(), $.length === 0) return;
        u.value = 0, r.value?.focus();
        return;
      }
      if (k.key === "ArrowUp") {
        if (k.preventDefault(), $.length === 0) return;
        u.value = $.length - 1, r.value?.focus();
        return;
      }
      if (k.key === "Enter") {
        k.preventDefault();
        const S = $[u.value];
        S && y(S);
      }
    }
    function _(k) {
      const $ = m.value;
      if ($.length !== 0) {
        if (k.key === "ArrowDown") {
          k.preventDefault(), u.value = Math.min(u.value + 1, $.length - 1);
          return;
        }
        if (k.key === "ArrowUp") {
          if (k.preventDefault(), u.value === 0) {
            l.value?.focus();
            return;
          }
          u.value = Math.max(u.value - 1, 0);
          return;
        }
        if (k.key === "Enter") {
          k.preventDefault();
          const S = $[u.value];
          S && y(S);
        }
      }
    }
    return Te(c, () => {
      u.value = 0;
    }), Te(
      () => n.modelValue,
      () => {
        v();
      },
      { immediate: !0 }
    ), t({
      focusSearch: () => l.value?.focus()
    }), (k, $) => (f(), x("div", {
      class: Z(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", l4, [
        d("div", r4, [
          d("span", c4, [
            N(B(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Xe(d("input", {
            ref_key: "searchInputRef",
            ref: l,
            "onUpdate:modelValue": $[0] || ($[0] = (S) => c.value = S),
            type: "search",
            class: Z([B(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: w
          }, null, 42, d4), [
            [Rt, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (f(), x("p", u4, A(e.listSectionLabel), 1)) : O("", !0),
      d("ul", {
        id: i,
        ref_key: "listRef",
        ref: r,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: Z([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: _
      }, [
        m.value.length === 0 ? (f(), x("li", f4, A(e.noResultsText), 1)) : O("", !0),
        (f(!0), x(he, null, pe(m.value, (S, D) => (f(), x("li", {
          key: p(S),
          role: "option",
          "aria-selected": h(S),
          class: Z(b(S, D)),
          onClick: (P) => y(S),
          onMouseenter: (P) => u.value = D
        }, [
          S.flagClass ? (f(), x("span", {
            key: 0,
            class: Z([S.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : O("", !0),
          d("span", m4, A(S.label), 1)
        ], 42, g4))), 128))
      ], 42, h4)
    ], 2));
  }
}), b4 = { class: "flex flex-row gap-3 items-center" }, v4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, y4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], x4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, k4 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, _4 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, w4 = { class: "truncate" }, C4 = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, $4 = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, S4 = { class: "relative" }, M4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, D4 = ["placeholder", "aria-label"], A4 = ["aria-checked", "disabled"], T4 = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, B4 = ["aria-selected", "onClick", "onMouseenter"], L4 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, R4 = { class: "min-w-0 flex-1" }, P4 = /* @__PURE__ */ fe({
  name: "MultiSelect",
  __name: "MultiSelect",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar…" },
    disabled: { type: Boolean },
    searchable: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar…" },
    noResultsText: { default: "Sin resultados" },
    showSelectAll: { type: Boolean, default: !1 },
    selectAllLabel: { default: "Seleccionar todas" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-multiselect-${We()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), u = oe(null), g = oe(null), m = oe(!1), p = oe(0), h = oe(""), b = C(() => a.options.filter((z) => !z.disabled)), v = C(() => {
      if (!a.searchable) return b.value;
      const z = h.value.trim().toLowerCase();
      return z ? b.value.filter(
        (le) => le.label.toLowerCase().includes(z)
      ) : b.value;
    }), y = C(() => new Set(a.modelValue ?? [])), w = C(
      () => b.value.filter((z) => y.value.has(z.value)).length
    ), _ = C(
      () => b.value.length > 0 && w.value === b.value.length
    ), k = C(
      () => w.value > 0 && !_.value
    ), $ = C(
      () => k.value ? "mixed" : _.value
    ), S = C(
      () => a.options.filter((z) => y.value.has(z.value))
    ), D = C(() => {
      const z = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", le = S.value.length;
      return le === 0 ? z : `${z}, ${le} seleccionada${le === 1 ? "" : "s"}`;
    });
    function P(z) {
      return `${String(z.value)}-${z.label}`;
    }
    function V(z) {
      return y.value.has(z.value);
    }
    function W(z, le) {
      const ce = V(z), ve = p.value === le;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ce ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ve ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M(z) {
      const le = [...a.modelValue ?? []], ce = le.indexOf(z.value);
      ce >= 0 ? le.splice(ce, 1) : le.push(z.value), n("update:modelValue", le);
    }
    function R() {
      const z = new Set(b.value.map((ce) => ce.value)), le = (a.modelValue ?? []).filter(
        (ce) => !z.has(ce)
      );
      n(
        "update:modelValue",
        _.value ? le : [...le, ...b.value.map((ce) => ce.value)]
      );
    }
    function T() {
      const z = v.value;
      if (z.length === 0) {
        p.value = 0;
        return;
      }
      const le = y.value, ce = z.findIndex((ve) => le.has(ve.value));
      p.value = ce >= 0 ? ce : 0;
    }
    function j() {
      if (a.searchable) {
        u.value?.focus();
        return;
      }
      if (a.showSelectAll) {
        g.value?.focus();
        return;
      }
      c.value?.focus();
    }
    function H() {
      h.value = "", T(), Ke(() => j());
    }
    function Q() {
      m.value = !1, h.value = "";
    }
    function re() {
      if (!a.disabled) {
        if (m.value) {
          Q();
          return;
        }
        m.value = !0, H();
      }
    }
    function de(z) {
      z.stopPropagation(), !a.disabled && re();
    }
    function q(z) {
      if (!m.value) return;
      const le = r.value;
      le && !le.contains(z.target) && Q();
    }
    function ae(z) {
      a.disabled || (z.key === "ArrowDown" || z.key === "Enter" || z.key === " ") && (z.preventDefault(), m.value || (m.value = !0, H()));
    }
    function L(z) {
      const le = v.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (z.key === "ArrowDown") {
        if (z.preventDefault(), a.showSelectAll) {
          g.value?.focus();
          return;
        }
        if (le.length === 0) return;
        p.value = 0, c.value?.focus();
        return;
      }
      if (z.key === "ArrowUp") {
        if (z.preventDefault(), le.length === 0) return;
        p.value = le.length - 1, c.value?.focus();
        return;
      }
      if (z.key === "Enter") {
        z.preventDefault();
        const ce = le[p.value];
        ce && M(ce);
      }
    }
    function K(z) {
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (z.key === "ArrowDown" && v.value.length > 0) {
        z.preventDefault(), p.value = 0, c.value?.focus();
        return;
      }
      z.key === "ArrowUp" && a.searchable && (z.preventDefault(), u.value?.focus());
    }
    function Y(z) {
      const le = v.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (le.length !== 0) {
        if (z.key === "ArrowDown") {
          z.preventDefault(), p.value = Math.min(p.value + 1, le.length - 1);
          return;
        }
        if (z.key === "ArrowUp") {
          if (z.preventDefault(), p.value === 0 && a.showSelectAll) {
            g.value?.focus();
            return;
          }
          if (p.value === 0 && a.searchable) {
            u.value?.focus();
            return;
          }
          p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (z.key === "Enter" || z.key === " ") {
          z.preventDefault();
          const ce = le[p.value];
          ce && M(ce);
        }
      }
    }
    return Te(h, () => {
      p.value = 0;
    }), Je(() => {
      document.addEventListener("click", q);
    }), lt(() => {
      document.removeEventListener("click", q);
    }), (z, le) => (f(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      d("div", b4, [
        z.$slots.icon ? (f(), x("span", v4, [
          ke(z.$slots, "icon")
        ])) : O("", !0),
        e.label ? (f(), x("label", {
          key: 1,
          id: s,
          class: Z(B(ct))
        }, A(e.label), 3)) : O("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          B(et),
          "flex items-start justify-between gap-2 text-left",
          m.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : D.value,
        onClick: de,
        onKeydown: ae
      }, [
        d("div", x4, [
          S.value.length === 0 ? (f(), x("span", k4, A(e.placeholder), 1)) : (f(), x("div", _4, [
            (f(!0), x(he, null, pe(S.value, (ce) => (f(), x("span", {
              key: P(ce),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", w4, A(ce.label), 1)
            ]))), 128))
          ]))
        ]),
        N(B(aa), {
          class: Z(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", m.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, y4),
      Xe(d("div", C4, [
        e.searchable ? (f(), x("div", $4, [
          d("div", S4, [
            d("span", M4, [
              N(B(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": le[0] || (le[0] = (ce) => h.value = ce),
              type: "search",
              class: Z([B(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: le[1] || (le[1] = Be(() => {
              }, ["stop"])),
              onKeydown: Be(L, ["stop"])
            }, null, 42, D4), [
              [Rt, h.value]
            ])
          ])
        ])) : O("", !0),
        e.showSelectAll ? (f(), x("button", {
          key: 1,
          ref_key: "selectAllRef",
          ref: g,
          type: "button",
          role: "checkbox",
          "aria-checked": $.value,
          disabled: b.value.length === 0,
          class: "flex w-full items-center gap-2 border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--kiut-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:text-slate-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5",
          onClick: Be(R, ["stop"]),
          onKeydown: K
        }, [
          d("span", {
            class: Z([
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-400 transition-colors dark:border-slate-500",
              _.value || k.value ? "border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]" : ""
            ]),
            "aria-hidden": "true"
          }, [
            k.value ? (f(), ne(B(kb), {
              key: 0,
              class: "h-3 w-3"
            })) : _.value ? (f(), ne(B(Bn), {
              key: 1,
              class: "h-3 w-3"
            })) : O("", !0)
          ], 2),
          d("span", null, A(e.selectAllLabel), 1)
        ], 40, A4)) : O("", !0),
        d("ul", {
          id: l,
          ref_key: "listRef",
          ref: c,
          role: "listbox",
          tabindex: "-1",
          "aria-multiselectable": "true",
          class: "max-h-60 overflow-auto py-1",
          onKeydown: Be(Y, ["stop"])
        }, [
          v.value.length === 0 ? (f(), x("li", T4, A(e.noResultsText), 1)) : O("", !0),
          (f(!0), x(he, null, pe(v.value, (ce, ve) => (f(), x("li", {
            key: P(ce),
            role: "option",
            "aria-selected": V(ce),
            class: Z(W(ce, ve)),
            onClick: Be((U) => M(ce), ["stop"]),
            onMouseenter: (U) => p.value = ve
          }, [
            d("span", L4, [
              V(ce) ? (f(), ne(B(Bn), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : O("", !0)
            ]),
            d("span", R4, A(ce.label), 1)
          ], 42, B4))), 128))
        ], 544)
      ], 512), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), I4 = { class: "font-sans" }, E4 = ["for"], F4 = { class: "flex gap-2" }, O4 = { class: "w-[7.5rem] shrink-0" }, V4 = { class: "min-w-0 flex-1" }, z4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], N4 = ["id"], j4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-phone-${We()}`, s = C(() => a.id ?? `${o}-num`), i = C(() => `${s.value}-err`), l = C({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), r = C({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, u) => (f(), x("div", I4, [
      e.label ? (f(), x("label", {
        key: 0,
        for: s.value,
        class: Z(B(ct))
      }, A(e.label), 11, E4)) : O("", !0),
      d("div", F4, [
        d("div", O4, [
          N(Kt, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (g) => l.value = g),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", V4, [
          Xe(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (g) => r.value = g),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Z([B(et), e.invalid ? B(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, z4), [
            [Rt, r.value]
          ])
        ])
      ]),
      e.errorText ? (f(), x("p", {
        key: 1,
        id: i.value,
        class: Z(B(At)),
        role: "alert"
      }, A(e.errorText), 11, N4)) : O("", !0)
    ]));
  }
}), H4 = ["role", "aria-label"], W4 = { class: "flex flex-wrap gap-2" }, K4 = ["aria-checked", "role", "onClick"], U4 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, Y4 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, q4 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, X4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = C(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
    function s(r) {
      return a.multiple ? o.value.includes(r.value) : a.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(r) {
      if (a.multiple) {
        const c = Array.isArray(a.modelValue) ? [...a.modelValue] : [], u = c.indexOf(r.value);
        u >= 0 ? c.splice(u, 1) : c.push(r.value), n("update:modelValue", c);
        return;
      }
      n("update:modelValue", r.value);
    }
    return (r, c) => (f(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", W4, [
        (f(!0), x(he, null, pe(e.items, (u) => (f(), x("button", {
          key: u.value,
          type: "button",
          class: Z(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (g) => l(u)
        }, [
          d("span", U4, [
            s(u) ? (f(), x("span", Y4)) : O("", !0)
          ]),
          u.dotColor ? (f(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Ce({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          d("span", q4, A(u.label), 1)
        ], 10, K4))), 128))
      ])
    ], 8, H4));
  }
}), G4 = ["aria-label"], Z4 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Q4 = { class: "truncate px-3 py-2 text-sm font-medium" }, J4 = /* @__PURE__ */ fe({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${We()}`, s = (b) => `${o}-seg-${b}`, i = oe([]);
    function l(b, v) {
      b instanceof HTMLButtonElement ? i.value[v] = b : i.value[v] = null;
    }
    function r(b) {
      return b.value === a.modelValue;
    }
    function c(b) {
      const v = r(b), y = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return b.disabled ? `${y} cursor-not-allowed opacity-40` : v ? `${y} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${y} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(b) {
      b.disabled || b.value !== a.modelValue && n("update:modelValue", b.value);
    }
    function g(b, v, y) {
      u(b), Ke(() => i.value[v]?.focus());
    }
    const m = C(
      () => a.items.map((b, v) => b.disabled ? -1 : v).filter((b) => b >= 0)
    );
    function p(b, v) {
      const y = a.items.length;
      if (y === 0) return 0;
      let w = b;
      for (let _ = 0; _ < y; _++)
        if (w = (w + v + y) % y, !a.items[w]?.disabled) return w;
      return b;
    }
    function h(b, v) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const y = p(v, 1), w = a.items[y];
        w && u(w), Ke(() => i.value[y]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const y = p(v, -1), w = a.items[y];
        w && u(w), Ke(() => i.value[y]?.focus());
      } else if (b.key === "Home") {
        b.preventDefault();
        const y = m.value[0];
        if (y !== void 0) {
          const w = a.items[y];
          w && u(w), Ke(() => i.value[y]?.focus());
        }
      } else if (b.key === "End") {
        b.preventDefault();
        const y = m.value[m.value.length - 1];
        if (y !== void 0) {
          const w = a.items[y];
          w && u(w), Ke(() => i.value[y]?.focus());
        }
      }
    }
    return (b, v) => (f(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (f(!0), x(he, null, pe(e.items, (y, w) => (f(), x("button", {
        id: s(y.value),
        key: y.value,
        ref_for: !0,
        ref: (_) => l(_, w),
        type: "button",
        role: "tab",
        "aria-selected": r(y),
        "aria-disabled": y.disabled === !0,
        tabindex: r(y) ? 0 : -1,
        class: Z(c(y)),
        onClick: (_) => g(y, w),
        onKeydown: (_) => h(_, w)
      }, [
        d("span", Q4, A(y.label), 1)
      ], 42, Z4))), 128))
    ], 8, G4));
  }
}), eS = ["aria-expanded", "aria-labelledby", "aria-label"], tS = ["onKeydown"], aS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, nS = { class: "mb-4 flex items-center justify-between gap-2" }, oS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, sS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, iS = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, lS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, rS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, cS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, dS = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, uS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, hS = ["disabled", "onClick"], fS = "rounded-lg text-[#61616b]", gS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", mS = "opacity-30", pS = "bg-[#6b35e9] font-medium text-white", bS = "bg-[#895af6] font-semibold text-white", vS = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-drp-${We()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), u = oe(_t(/* @__PURE__ */ new Date())), g = C(() => !!(a.modelValue.start && a.modelValue.end)), m = C(() => {
      const M = _t(u.value);
      return [M, Ma(M, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), h = C(() => {
      const M = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${M}` : `left-0 right-auto ${M}`;
    }), b = C(
      () => `${Nt(m.value[0])} – ${Nt(m.value[1])}`
    ), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], y = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const M = at(a.modelValue.start), R = at(a.modelValue.end);
      return `${Ln(M)} – ${Ln(R)}`;
    });
    function w(M, R) {
      return M.getMonth() === R.getMonth() && M.getFullYear() === R.getFullYear();
    }
    function _(M) {
      const R = Ve(M);
      if (a.minDate) {
        const T = Ve(at(a.minDate));
        if (jt(R, T)) return !0;
      }
      if (a.maxDate) {
        const T = Ve(at(a.maxDate));
        if (jt(T, R)) return !0;
      }
      return !1;
    }
    function k(M, R, T) {
      const j = bt(M, R), H = bt(M, T);
      if (j && H) return "rounded-lg";
      const Q = j || M.getDay() === 0, re = H || M.getDay() === 6;
      return Q && re ? "rounded-lg" : Q ? "rounded-l-lg" : re ? "rounded-r-lg" : "rounded-none";
    }
    function $(M, R) {
      const T = w(R, M), j = _(R), H = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, Q = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, re = Ve(R);
      if (j)
        return fS;
      let de = gS;
      if (H && Q && Nl(re, H) && jl(re, Q)) {
        const ae = bt(re, H), L = bt(re, Q);
        de = `${k(re, H, Q)} ${ae || L ? bS : pS}`;
      }
      return T || (de = `${de} ${mS}`), de;
    }
    function S(M) {
      if (_(M)) return;
      const R = Ve(M);
      if (!c.value) {
        c.value = new Date(R), n("update:modelValue", { start: nt(R), end: nt(R) });
        return;
      }
      let j = Ve(c.value), H = new Date(R);
      jt(H, j) && ([j, H] = [H, j]), n("update:modelValue", { start: nt(j), end: nt(H) }), c.value = null, r.value = !1;
    }
    function D(M) {
      u.value = Ma(u.value, M);
    }
    function P() {
      r.value = !1;
    }
    function V(M) {
      if (M?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = _t(at(a.modelValue.start));
          } catch {
          }
        Ke(() => l.value?.focus());
      }
    }
    function W(M) {
      if (!r.value) return;
      const R = i.value;
      R && !R.contains(M.target) && (r.value = !1);
    }
    return Te(r, (M) => {
      M && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", W);
    }), lt(() => {
      document.removeEventListener("click", W);
    }), (M, R) => (f(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (f(), x("label", {
        key: 0,
        id: s,
        class: Z(B(ct))
      }, A(e.label), 3)) : O("", !0),
      d("button", {
        type: "button",
        class: Z([
          B(et),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onFocus: V,
        onClick: V
      }, [
        N(B(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            g.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(y.value), 3)
      ], 42, eS),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Z([
          h.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(P, ["stop"]), ["escape"])
      }, [
        d("div", aS, [
          d("div", nS, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: R[0] || (R[0] = (T) => D(-1))
            }, [
              N(B(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", oS, [
              d("span", sS, A(b.value), 1),
              d("div", iS, [
                d("span", lS, A(B(Nt)(m.value[0])), 1),
                d("span", rS, A(B(Nt)(m.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: R[1] || (R[1] = (T) => D(1))
            }, [
              N(B(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", cS, [
            (f(!0), x(he, null, pe(m.value, (T) => (f(), x("div", {
              key: `${T.getFullYear()}-${T.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", dS, [
                (f(), x(he, null, pe(v, (j) => d("span", { key: j }, A(j), 1)), 64))
              ]),
              d("div", uS, [
                (f(!0), x(he, null, pe(B(Hl)(T), (j) => (f(), x("button", {
                  key: B(nt)(j),
                  type: "button",
                  disabled: _(j),
                  class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(T, j)]),
                  onClick: (H) => S(j)
                }, A(j.getDate()), 11, hS))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, tS), [
        [Ht, r.value]
      ])
    ], 512));
  }
}), yS = ["aria-expanded", "aria-labelledby", "aria-label"], xS = ["aria-label", "onKeydown"], kS = { class: "flex flex-col sm:flex-row" }, _S = ["aria-label"], wS = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, CS = { class: "flex flex-col gap-0.5" }, $S = ["onClick"], SS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, MS = { class: "mb-4 flex items-center justify-between gap-2" }, DS = ["aria-label"], AS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, TS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, BS = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, LS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, RS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, PS = ["aria-label"], IS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, ES = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, FS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, OS = ["disabled", "onClick"], VS = "rounded-lg text-[#61616b]", zS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", NS = "opacity-30", jS = "bg-[#6b35e9] font-medium text-white", HS = "bg-[#895af6] font-semibold text-white", WS = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-dpp-${We()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), u = oe(_t(/* @__PURE__ */ new Date())), g = C(() => !!(a.modelValue.start && a.modelValue.end)), m = C(() => {
      const ae = _t(u.value);
      return [ae, Ma(ae, 1)];
    }), p = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), h = C(() => a.ariaLabel ?? p.value), b = C(() => Ol(a.locale)), v = C(() => PC(a.locale)), y = C(() => LC(a.locale)), w = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), k = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const ae = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${ae}` : `left-0 right-auto ${ae}`;
    }), D = C(
      () => `${Nt(m.value[0], a.locale)} – ${Nt(m.value[1], a.locale)}`
    ), P = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return p.value;
      const ae = at(a.modelValue.start), L = at(a.modelValue.end);
      return `${Ln(ae, a.locale)} – ${Ln(L, a.locale)}`;
    });
    function V(ae, L) {
      return ae.getMonth() === L.getMonth() && ae.getFullYear() === L.getFullYear();
    }
    function W(ae) {
      const L = Ve(ae);
      if (a.minDate) {
        const K = Ve(at(a.minDate));
        if (jt(L, K)) return !0;
      }
      if (a.maxDate) {
        const K = Ve(at(a.maxDate));
        if (jt(K, L)) return !0;
      }
      return !1;
    }
    function M(ae, L, K) {
      const Y = bt(ae, L), z = bt(ae, K);
      if (Y && z) return "rounded-lg";
      const le = Y || ae.getDay() === 0, ce = z || ae.getDay() === 6;
      return le && ce ? "rounded-lg" : le ? "rounded-l-lg" : ce ? "rounded-r-lg" : "rounded-none";
    }
    function R(ae) {
      const L = FC(
        a.modelValue,
        ae,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), K = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return L ? `${K} font-medium` : K;
    }
    function T(ae, L) {
      const K = V(L, ae), Y = W(L), z = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, le = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, ce = Ve(L);
      if (Y)
        return VS;
      let ve = zS;
      if (z && le && Nl(ce, z) && jl(ce, le)) {
        const ie = bt(ce, z), ue = bt(ce, le);
        ve = `${M(ce, z, le)} ${ie || ue ? HS : jS}`;
      }
      return K || (ve = `${ve} ${NS}`), ve;
    }
    function j(ae) {
      const L = zl(Vl(ae), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: nt(L.start),
        end: nt(L.end)
      }), u.value = _t(L.start), c.value = null, r.value = !1;
    }
    function H(ae) {
      if (W(ae)) return;
      const L = Ve(ae);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: nt(L), end: nt(L) });
        return;
      }
      let Y = Ve(c.value), z = new Date(L);
      jt(z, Y) && ([Y, z] = [z, Y]), n("update:modelValue", { start: nt(Y), end: nt(z) }), c.value = null, r.value = !1;
    }
    function Q(ae) {
      u.value = Ma(u.value, ae);
    }
    function re() {
      r.value = !1;
    }
    function de(ae) {
      if (ae.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, a.modelValue.start)
        try {
          u.value = _t(at(a.modelValue.start));
        } catch {
        }
      Ke(() => l.value?.focus());
    }
    function q(ae) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(ae.target) && (r.value = !1);
    }
    return Te(r, (ae) => {
      ae && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", q);
    }), lt(() => {
      document.removeEventListener("click", q);
    }), (ae, L) => (f(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (f(), x("label", {
        key: 0,
        id: s,
        class: Z(B(ct))
      }, A(e.label), 3)) : O("", !0),
      d("button", {
        type: "button",
        class: Z([
          B(et),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : h.value,
        onClick: de
      }, [
        N(B(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            g.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(P.value), 3)
      ], 10, yS),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: Z([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(re, ["stop"]), ["escape"])
      }, [
        d("div", kS, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": w.value
          }, [
            d("p", wS, A(v.value), 1),
            d("ul", CS, [
              (f(!0), x(he, null, pe(b.value, (K) => (f(), x("li", {
                key: K.id
              }, [
                d("button", {
                  type: "button",
                  class: Z(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", R(K.id)]),
                  onClick: (Y) => j(K.id)
                }, A(K.label), 11, $S)
              ]))), 128))
            ])
          ], 8, _S),
          d("div", SS, [
            d("div", MS, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: L[0] || (L[0] = (K) => Q(-1))
              }, [
                N(B(Io), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, DS),
              d("div", AS, [
                d("span", TS, A(D.value), 1),
                d("div", BS, [
                  d("span", LS, A(B(Nt)(m.value[0], e.locale)), 1),
                  d("span", RS, A(B(Nt)(m.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": k.value,
                onClick: L[1] || (L[1] = (K) => Q(1))
              }, [
                N(B(Eo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, PS)
            ]),
            d("div", IS, [
              (f(!0), x(he, null, pe(m.value, (K) => (f(), x("div", {
                key: `${K.getFullYear()}-${K.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", ES, [
                  (f(!0), x(he, null, pe(y.value, (Y) => (f(), x("span", { key: Y }, A(Y), 1))), 128))
                ]),
                d("div", FS, [
                  (f(!0), x(he, null, pe(B(Hl)(K), (Y) => (f(), x("button", {
                    key: B(nt)(Y),
                    type: "button",
                    disabled: W(Y),
                    class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", T(K, Y)]),
                    onClick: (z) => H(Y)
                  }, A(Y.getDate()), 11, OS))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, xS), [
        [Ht, r.value]
      ])
    ], 512));
  }
}), KS = { class: "kiut-translation-count-badge__content" }, US = { class: "kiut-translation-count-badge__title" }, YS = { class: "kiut-translation-count-badge__pills" }, qS = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, xn = 8, xa = 12, XS = /* @__PURE__ */ fe({
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
    }), s = oe(null), i = oe(null), l = C(() => {
      const p = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${p} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${p} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${p} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), r = C(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function u() {
      const p = s.value, h = i.value;
      if (!p || !h) return;
      const b = p.getBoundingClientRect(), v = h.getBoundingClientRect(), y = b.top - xa, w = window.innerHeight - b.bottom - xa, _ = y >= v.height + xn, k = w >= v.height + xn;
      let $ = "top";
      _ ? $ = "top" : k ? $ = "bottom" : $ = w >= y ? "bottom" : "top", n.value = $;
      let S = $ === "top" ? b.top - v.height - xn : b.bottom + xn;
      S = Math.max(
        xa,
        Math.min(S, window.innerHeight - v.height - xa)
      );
      let D = b.left + b.width / 2 - v.width / 2;
      D = Math.max(
        xa,
        Math.min(D, window.innerWidth - v.width - xa)
      ), o.value = {
        top: `${S}px`,
        left: `${D}px`
      };
    }
    async function g() {
      if (!t.items.length) return;
      a.value = !0, await Ke();
      const p = i.value;
      p && (p.style.visibility = "hidden", u(), p.style.visibility = "visible");
    }
    function m() {
      a.value && c();
    }
    return window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), lt(() => {
      window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    }), (p, h) => (f(), x(he, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: Z([l.value, e.pulse && "animate-pulse"]),
        onMouseenter: g,
        onMouseleave: c,
        onFocus: g,
        onBlur: c
      }, A(e.label), 35),
      (f(), ne(Jt, { to: "body" }, [
        a.value && e.items.length ? (f(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: i,
          role: "tooltip",
          class: Z(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: Ce({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: g,
          onMouseleave: c
        }, [
          d("div", KS, [
            d("span", US, A(e.tooltipTitle), 1),
            d("div", YS, [
              (f(!0), x(he, null, pe(e.items, (b) => (f(), x("span", {
                key: b.id,
                class: Z(r.value)
              }, [
                Ae(A(b.label) + " ", 1),
                b.note ? (f(), x("span", qS, " (" + A(b.note) + ") ", 1)) : O("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : O("", !0)
      ]))
    ], 64));
  }
}), GS = ["disabled", "aria-expanded", "aria-label"], ZS = { class: "min-w-0 flex-1 truncate" }, QS = ["aria-selected", "onClick", "onMouseenter"], JS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, e3 = { class: "min-w-0 flex-1" }, t3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-tag-select-${We()}`}-listbox`, i = oe(null), l = oe(null), r = oe(null), c = oe(null), u = oe(!1), g = oe(0), m = oe({}), p = C(() => a.options.filter((Q) => !Q.disabled)), h = C(
      () => a.options.find((Q) => Q.value === a.modelValue) ?? null
    ), b = C(() => h.value?.color ?? "neutral"), v = C(
      () => _l(b.value, a.outlined)
    ), y = C(() => h.value ? h.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : p.value[0]?.label ?? "Seleccionar…"), w = C(
      () => a.ariaLabel ?? `Estado: ${y.value}`
    );
    function _() {
      const Q = l.value;
      if (!Q) return;
      const re = Q.getBoundingClientRect();
      m.value = {
        top: `${re.bottom + 4}px`,
        left: `${re.left}px`,
        minWidth: `${re.width}px`
      };
    }
    function k(Q) {
      return `${String(Q.value)}-${Q.label}`;
    }
    function $(Q) {
      return a.modelValue === Q.value;
    }
    function S(Q, re) {
      const de = $(Q), q = g.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        de ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !de && q ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function D() {
      g.value = Math.max(
        0,
        p.value.findIndex((Q) => Q.value === a.modelValue)
      );
    }
    function P() {
      _(), D(), Ke(() => c.value?.focus());
    }
    function V() {
      u.value = !1;
    }
    function W(Q) {
      n("update:modelValue", Q.value), V();
    }
    function M() {
      if (!a.disabled) {
        if (u.value) {
          V();
          return;
        }
        u.value = !0, P();
      }
    }
    function R(Q) {
      Q.stopPropagation(), !a.disabled && M();
    }
    function T(Q) {
      if (!u.value) return;
      const re = Q.target, de = i.value, q = r.value;
      de && !de.contains(re) && (!q || !q.contains(re)) && V();
    }
    function j(Q) {
      a.disabled || (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), u.value || (u.value = !0, P()));
    }
    function H(Q) {
      const re = p.value;
      if (Q.key === "Escape") {
        Q.preventDefault(), V(), l.value?.focus();
        return;
      }
      if (re.length !== 0) {
        if (Q.key === "ArrowDown") {
          Q.preventDefault(), g.value = Math.min(g.value + 1, re.length - 1);
          return;
        }
        if (Q.key === "ArrowUp") {
          Q.preventDefault(), g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (Q.key === "Enter") {
          Q.preventDefault();
          const de = re[g.value];
          de && W(de);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", T);
    }), lt(() => {
      document.removeEventListener("click", T);
    }), (Q, re) => (f(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: l,
        type: "button",
        disabled: e.disabled,
        class: Z([
          B(kl),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          v.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": w.value,
        onClick: R,
        onKeydown: j
      }, [
        d("span", ZS, A(y.value), 1),
        N(B(aa), {
          class: Z(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, GS),
      (f(), ne(Jt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: r,
          style: Ce(m.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          d("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Be(H, ["stop"])
          }, [
            (f(!0), x(he, null, pe(p.value, (de, q) => (f(), x("li", {
              key: k(de),
              role: "option",
              "aria-selected": $(de),
              class: Z(S(de, q)),
              onClick: Be((ae) => W(de), ["stop"]),
              onMouseenter: (ae) => g.value = q
            }, [
              d("span", JS, [
                $(de) ? (f(), ne(B(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : O("", !0)
              ]),
              d("span", e3, A(de.label), 1)
            ], 42, QS))), 128))
          ], 544)
        ], 4), [
          [Ht, u.value]
        ])
      ]))
    ], 512));
  }
}), a3 = ["aria-label"], n3 = { class: "flex flex-col gap-1" }, o3 = { class: "flex flex-row gap-3 items-center" }, s3 = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, i3 = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, l3 = /* @__PURE__ */ fe({
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
    const t = Ja(), a = e, n = {
      warning: Gw,
      info: Zw,
      success: Xw,
      feature: Jw,
      danger: e5
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
    }, s = C(() => o[a.variant]), i = C(() => n[a.variant]);
    return (l, r) => (f(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: Z([
        s.value.container,
        B(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      d("div", {
        class: Z([
          s.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        d("span", {
          class: Z([
            s.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          ke(l.$slots, "icon", {}, () => [
            (f(), ne(ft(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", n3, [
        d("h1", {
          class: Z([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: Z([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", o3, [
          a.date_start ? (f(), x("div", s3, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                N(B(bi))
              ])
            ], 2),
            a.subtitle_date_start ? (f(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : O("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : O("", !0),
          a.date_final ? (f(), x("div", i3, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                N(B(bi))
              ])
            ], 2),
            a.subtitle_date_final ? (f(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : O("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : O("", !0)
        ])
      ])
    ], 10, a3));
  }
}), r3 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, c3 = ["id"], d3 = { class: "min-w-0 flex-1 space-y-1" }, u3 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, h3 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, f3 = {
  key: 0,
  class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2"
}, g3 = /* @__PURE__ */ fe({
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
    headerBorder: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    showFooter: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, n = C(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${We()}`}-title`, l = oe(null);
    function r() {
      a.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function u(g) {
      if (a.modelValue && g.key === "Escape") {
        if (a.loading) return;
        g.preventDefault(), r();
      }
    }
    return Te(
      () => a.modelValue,
      (g) => {
        g && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", u);
    }), lt(() => {
      document.removeEventListener("keydown", u);
    }), (g, m) => (f(), ne(Jt, { to: "body" }, [
      N(gt, { name: "kiut-modal" }, {
        default: F(() => [
          e.modelValue ? (f(), x("div", r3, [
            d("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            d("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: Ce(n.value),
              onClick: m[0] || (m[0] = Be(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: Z(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", d3, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (f(), x("p", u3, A(e.subtitle), 1)) : O("", !0)
                ]),
                N(Mt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: F(() => [
                    N(B(co), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              d("div", h3, [
                ke(g.$slots, "default", {}, void 0, !0)
              ]),
              e.showFooter ? (f(), x("footer", f3, [
                N(Mt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: F(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                N(Mt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: F(() => [
                    Ae(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])) : O("", !0)
            ], 12, c3)
          ])) : O("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), m3 = /* @__PURE__ */ be(g3, [["__scopeId", "data-v-1ab330ef"]]), p3 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, b3 = {
  key: 0,
  class: ""
}, v3 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, y3 = { class: "flex min-w-0 flex-1 items-center" }, x3 = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, k3 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, _3 = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, w3 = /* @__PURE__ */ fe({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = ho(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (f(), x("section", p3, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (f(), x("header", b3, [
        n.$slots.description ? (f(), x("div", v3, [
          ke(n.$slots, "description")
        ])) : O("", !0),
        n.$slots.tabs ? (f(), x("div", {
          key: 1,
          class: Z(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", y3, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (f(), x("div", x3, [
            ke(n.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (f(), x("div", {
          key: 2,
          class: Z([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (f(), x("div", k3, [
            ke(n.$slots, "filters")
          ])) : O("", !0),
          n.$slots.actions ? (f(), x("div", _3, [
            ke(n.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0)
      ])) : O("", !0),
      n.$slots.content || n.$slots.default ? (f(), x("div", {
        key: 1,
        class: Z({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : O("", !0)
    ]));
  }
}), C3 = { class: "flex flex-1 min-h-0" }, $3 = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, S3 = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, M3 = ["aria-current", "data-has-active", "title", "onClick"], D3 = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, A3 = { class: "px-4 py-4 shrink-0" }, T3 = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, B3 = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, L3 = ["data-nav-id", "aria-current", "onClick"], R3 = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, P3 = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, I3 = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, E3 = ["data-nav-id", "aria-current", "onClick"], F3 = { class: "truncate text-[15px]" }, O3 = ["aria-current", "data-has-active", "onClick"], V3 = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, z3 = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, N3 = /* @__PURE__ */ fe({
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
    const a = oe(!1), n = e, o = t, s = Ja(), { class: i, ...l } = s, r = oe(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < n.mobileBreakpoint);
    }
    Je(() => {
      c(), window.addEventListener("resize", c);
    }), lt(() => {
      window.removeEventListener("resize", c);
    });
    const u = C(() => {
      const y = n.sections.find((w) => w.id === n.selectedSectionId);
      return y?.items?.length ? y : null;
    });
    function g(y) {
      return n.activePath ? n.activePath === y.path || n.activePath.startsWith(y.path + "/") : !1;
    }
    function m(y) {
      return y.items?.length ? y.items.some(g) : !n.activePath || !y.path ? !1 : n.activePath === y.path || n.activePath.startsWith(y.path + "/");
    }
    function p(y) {
      if (!y.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: y,
          item: { id: y.id, label: y.label, path: y.path }
        });
        return;
      }
      const w = n.selectedSectionId === y.id ? null : y.id;
      o("update:selectedSectionId", w);
    }
    function h(y, w) {
      o("navigate", { section: y, item: w });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function v(y, w) {
      h(y, w), b();
    }
    return (y, w) => r.value ? (f(), x("div", yt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      N(gt, { name: "ksn-overlay" }, {
        default: F(() => [
          u.value ? (f(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : O("", !0)
        ]),
        _: 1
      }),
      N(gt, { name: "ksn-sheet" }, {
        default: F(() => [
          u.value ? (f(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Ce({ paddingBottom: n.mobileBarHeight })
          }, [
            w[3] || (w[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", R3, [
              d("p", P3, A(u.value.label), 1),
              d("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
              }, [...w[2] || (w[2] = [
                d("svg", {
                  class: "w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round"
                }, [
                  d("path", { d: "M18 6L6 18M6 6l12 12" })
                ], -1)
              ])])
            ]),
            d("nav", I3, [
              (f(!0), x(he, null, pe(u.value.items, (_) => (f(), x("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": g(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (k) => v(u.value, _)
              }, [
                _.icon ? (f(), ne(ft(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : O("", !0),
                d("span", F3, A(_.label), 1)
              ], 8, E3))), 128))
            ])
          ], 4)) : O("", !0)
        ]),
        _: 1
      }),
      d("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Ce({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (f(!0), x(he, null, pe(e.sections, (_) => (f(), x("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": m(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (k) => p(_)
        }, [
          e.selectedSectionId === _.id || m(_) ? (f(), x("span", V3)) : O("", !0),
          _.icon ? (f(), ne(ft(_.icon), {
            key: 1,
            class: "shrink-0",
            style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          d("span", z3, A(_.label), 1)
        ], 8, O3))), 128))
      ], 4)
    ], 16)) : (f(), x("aside", yt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      d("div", C3, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Ce({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: w[0] || (w[0] = (_) => a.value = !0),
          onMouseleave: w[1] || (w[1] = (_) => a.value = !1)
        }, [
          y.$slots.logo ? (f(), x("div", $3, [
            ke(y.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : O("", !0),
          d("nav", S3, [
            (f(!0), x(he, null, pe(e.sections, (_) => (f(), x("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": m(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (k) => p(_)
            }, [
              _.icon ? (f(), ne(ft(_.icon), {
                key: 0,
                class: "shrink-0",
                style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : O("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Ce({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, M3))), 128))
          ]),
          y.$slots.footer ? (f(), x("div", D3, [
            ke(y.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : O("", !0)
        ], 36),
        N(gt, { name: "ksn-sub" }, {
          default: F(() => [
            u.value ? (f(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Ce({ width: e.secondaryWidth })
            }, [
              d("div", A3, [
                d("p", T3, A(u.value.label), 1)
              ]),
              d("nav", B3, [
                (f(!0), x(he, null, pe(u.value.items, (_) => (f(), x("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": g(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (k) => h(u.value, _)
                }, [
                  _.icon ? (f(), ne(ft(_.icon), {
                    key: 0,
                    style: Ce({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : O("", !0),
                  d("span", {
                    class: "truncate",
                    style: Ce({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, L3))), 128))
              ])
            ], 4)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), j3 = /* @__PURE__ */ be(N3, [["__scopeId", "data-v-e0ccb96c"]]), J3 = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", mt), e.component("KiutPieChart", Fn), e.component("KiutBoxplotChart", Nf), e.component("KiutCandlestickChart", Dg), e.component("KiutHistogramChart", vl), e.component("KiutSankeyChart", na), e.component("KiutAgentsPerDay", $p), e.component("KiutBookingManager", o0), e.component("KiutCheckin", y0), e.component("KiutCheckinContainer", q0), e.component("KiutCheckinMetrics", wl), e.component("KiutCheckinSegments", Cl), e.component("KiutDisruption", hb), e.component("KiutFAQ", xb), e.component("KiutMessagesPerAgent", $l), e.component("KiutRecordLocator", hv), e.component("KiutSalesByChannel", Sl), e.component("KiutSeller", Ml), e.component("KiutSellerContainer", Gv), e.component("KiutTopAgents", ny), e.component("KiutPaymentMethod", Cy), e.component("KiutAgentHumanConversations", i1), e.component("KiutChannelMetrics", Dl), e.component("KiutConversationVolume", y1), e.component("KiutTriageCombinations", R1), e.component("KiutSelectLanguage", V1), e.component("KiutGuardrails", X1), e.component("KiutDisruptionNotifier", mx), e.component("KiutTotalConversationsCard", px), e.component("KiutCsatP95Card", bx), e.component("KiutCsatPulseCard", vx), e.component("KiutCSATContainer", Ux), e.component("KiutAiGeneratedRevenueCard", Yx), e.component("KiutAiGeneratedChart", ak), e.component("KiutTransactionsChart", uk), e.component("KiutCostCard", fk), e.component("KiutHumanEscalations", kk), e.component("KiutHumanEscalationsCard", _k), e.component("KiutAvgResolutionTime", Pk), e.component("KiutAvgResolutionTimeCard", zk), e.component("KiutCheckinCR", Nk), e.component("KiutSellerCR", jk), e.component("KiutBookingManagerCR", Hk), e.component("KiutNpsDailyMetrics", Tl), e.component("KiutNpsMetrics", Bl), e.component("KiutNpsOverviewMetrics", Al), e.component("KiutAWSCost", Zk), e.component("KiutCostUsage", l_), e.component("KiutTokenUsage", b_), e.component("KiutConversationCount", M_), e.component("KiutTopAgentsAnalysis", V_), e.component("KiutTopAgentsPie", q_), e.component("KiutDailyCostTrends", n2), e.component("KiutModelUsage", b2), e.component("KiutMessageRoles", S2), e.component("KiutCostPerConversations", O2), e.component("Tabs", Ll), e.component("Table", tw), e.component("TableVersions", qw), e.component("Filters", L5), e.component("InputText", Fl), e.component("InputPassword", U5), e.component("InputTextarea", Z5), e.component("InputFile", bC), e.component("ImageUploadCircle", CC), e.component("InputDateTime", s$), e.component("InputTime", f$), e.component("InputRange", M$), e.component("InputNumber", L$), e.component("InputColorPicker", N$), e.component("EmojiPicker", s4), e.component("Select", Kt), e.component("LanguageSelect", i4), e.component("LanguagePicker", p4), e.component("MultiSelect", P4), e.component("Toggle", El), e.component("InputPhone", j4), e.component("SelectablePills", X4), e.component("SegmentedControl", J4), e.component("DateRangePicker", vS), e.component("DatePickerPresets", WS), e.component("Tag", Ge), e.component("TagSelect", t3), e.component("TranslationCountBadge", XS), e.component("Button", Mt), e.component("Banner", l3), e.component("Modal", m3), e.component("Section", w3), e.component("KiutAppShellNavigation", j3);
  }
};
export {
  Zk as AWSCost,
  i1 as AgentHumanConversations,
  $p as AgentsPerDay,
  ak as AiGeneratedChart,
  Yx as AiGeneratedRevenueCard,
  j3 as AppShellNavigation,
  Pk as AvgResolutionTime,
  zk as AvgResolutionTimeCard,
  l3 as Banner,
  o0 as BookingManager,
  Hk as BookingManagerCR,
  Nf as BoxplotChart,
  Mt as Button,
  Ux as CSATContainer,
  Dg as CandlestickChart,
  Dl as ChannelMetrics,
  $t as ChartBar,
  mt as ChartLine,
  y0 as Checkin,
  Nk as CheckinCR,
  q0 as CheckinContainer,
  wl as CheckinMetrics,
  Cl as CheckinSegments,
  M_ as ConversationCount,
  y1 as ConversationVolume,
  fk as CostCard,
  O2 as CostPerConversations,
  l_ as CostUsage,
  bx as CsatP95Card,
  vx as CsatPulseCard,
  Wl as DEFAULT_CATEGORY_LABELS,
  Kl as DEFAULT_EMOJI_CATALOG,
  Mw as DEFAULT_TABLE_VERSIONS_LABELS,
  n2 as DailyCostTrends,
  WS as DatePickerPresets,
  vS as DateRangePicker,
  hb as Disruption,
  mx as DisruptionNotifier,
  Dw as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  s4 as EmojiPicker,
  xb as FAQ,
  L5 as Filters,
  X1 as Guardrails,
  vl as HistogramChart,
  kk as HumanEscalations,
  _k as HumanEscalationsCard,
  CC as ImageUploadCircle,
  N$ as InputColorPicker,
  s$ as InputDateTime,
  bC as InputFile,
  L$ as InputNumber,
  U5 as InputPassword,
  j4 as InputPhone,
  M$ as InputRange,
  Fl as InputText,
  Z5 as InputTextarea,
  f$ as InputTime,
  J3 as KiutUIPlugin,
  p4 as LanguagePicker,
  i4 as LanguageSelect,
  S2 as MessageRoles,
  $l as MessagesPerAgent,
  m3 as Modal,
  b2 as ModelUsage,
  P4 as MultiSelect,
  Tl as NpsDailyMetrics,
  Bl as NpsMetrics,
  Al as NpsOverviewMetrics,
  Cy as PaymentMethod,
  Fn as PieChart,
  Z3 as RESOURCE_TABLE_VERSIONS_COLUMNS,
  hv as RecordLocator,
  Sl as SalesByChannel,
  na as SankeyChart,
  w3 as Section,
  J4 as SegmentedControl,
  Kt as Select,
  V1 as SelectLanguage,
  X4 as SelectablePills,
  Ml as Seller,
  jk as SellerCR,
  Gv as SellerContainer,
  tw as Table,
  qw as TableVersions,
  Ll as Tabs,
  Ge as Tag,
  t3 as TagSelect,
  El as Toggle,
  b_ as TokenUsage,
  ny as TopAgents,
  V_ as TopAgentsAnalysis,
  q_ as TopAgentsPie,
  px as TotalConversationsCard,
  uk as TransactionsChart,
  XS as TranslationCountBadge,
  R1 as TriageCombinations,
  K$ as appendEmojiToDraft,
  Q3 as buildDefaultCategories,
  W$ as extractEmojis,
  H$ as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
